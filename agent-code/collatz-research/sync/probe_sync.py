"""Exact small computations for divergent-orbit synchronization lemmas.

This script uses Python integers only.  It is exploratory: every printed witness is
independently checkable from the displayed word/states.
"""

from __future__ import annotations

from dataclasses import dataclass
from itertools import count


def v_p(n: int, p: int) -> int:
    assert n > 0
    e = 0
    while n % p == 0:
        e += 1
        n //= p
    return e


def uplus(x: int) -> tuple[int, int]:
    assert x > 0 and x % 2 == 1
    z = 3 * x + 1
    a = v_p(z, 2)
    return z >> a, a


def follow(x: int, steps: int) -> tuple[list[int], list[int]]:
    xs = [x]
    aa: list[int] = []
    for _ in range(steps):
        x, a = uplus(x)
        aa.append(a)
        xs.append(x)
    return xs, aa


def word_carry(word: tuple[int, ...]) -> tuple[int, int]:
    A = 0
    C = 0
    for a in word:
        C = 3 * C + (1 << A)
        A += a
    return A, C


def is_barrier(word: tuple[int, ...]) -> bool:
    A = 0
    p3 = 1
    for a in word:
        A += a
        p3 *= 3
        if (1 << A) >= p3:
            return False
    return True


def barrier_words(max_depth: int):
    """Yield all nonempty strict barrier words through max_depth."""

    def rec(prefix: tuple[int, ...], A: int, p3: int):
        k = len(prefix) + 1
        p3_next = p3 * 3
        # Exact small bound; stop at the first a violating 2^(A+a)<3^k.
        for a in count(1):
            A_next = A + a
            if (1 << A_next) >= p3_next:
                break
            w = prefix + (a,)
            yield w
            if k < max_depth:
                yield from rec(w, A_next, p3_next)

    yield from rec((), 0, 1)


def canonical_seed_for_word(word: tuple[int, ...]) -> int:
    """Least positive odd seed in the exact valuation cylinder of word."""
    A, C = word_carry(word)
    # Exact word iff 3^r*n+C is 2^A mod 2^(A+1).
    mod = 1 << (A + 1)
    rhs = ((1 << A) - C) % mod
    inv = pow(pow(3, len(word), mod), -1, mod)
    n = (rhs * inv) % mod
    assert n % 2 == 1
    return n if n else mod


def probe_near_terminal(max_depth: int = 16) -> None:
    print("NEAR_TERMINAL")
    best_by_depth: dict[int, tuple[int, tuple[int, ...], int, int]] = {}
    gap_one: list[tuple[tuple[int, ...], int, int, int]] = []
    for w in barrier_words(max_depth):
        r = len(w)
        A, C = word_carry(w)
        val = v_p(C + (1 << A), 3)
        if w != (1,) * r:
            old = best_by_depth.get(r)
            if old is None or val > old[0]:
                best_by_depth[r] = (val, w, A, C)
            if val == r - 1:
                seed = canonical_seed_for_word(w)
                xs, aa = follow(seed, r)
                assert tuple(aa) == w
                assert v_p(xs[-1] + 1, 3) == val
                gap_one.append((w, seed, xs[-1], val))
    for r in sorted(best_by_depth):
        val, w, A, C = best_by_depth[r]
        print(f"depth={r} max_v3={val} gap={r-val} word={w} A={A} D={C+(1<<A)}")
    print("first_gap_one_witnesses")
    for item in gap_one[:20]:
        print(item)
    print(f"gap_one_count={len(gap_one)}")


def all_one_state(r: int, t: int) -> tuple[int, int]:
    assert r >= 1 and t >= 2 and t % 2 == 0
    return (1 << r) * t - 1, pow(3, r) * t - 1


def probe_all_one_minimality(max_r: int = 9, max_t: int = 100) -> None:
    print("ALL_ONE_MINIMALITY")
    checked = 0
    for r in range(1, max_r + 1):
        for t in range(2, max_t + 1, 2):
            x, endpoint = all_one_state(r, t)
            xs, aa = follow(x, r)
            assert tuple(aa) == (1,) * r and xs[-1] == endpoint
            for z in range(1, x, 2):
                zs, _ = follow(z, r)
                if zs[-1] == endpoint:
                    print(
                        "COUNTEREXAMPLE all-one not minimal",
                        f"r={r} t={t} actual={x} smaller={z} endpoint={endpoint}",
                    )
                    return
            checked += 1
    print(f"no_counterexample checked_cases={checked}")


def greedy_inverse(y: int) -> int | None:
    residue = y % 3
    if residue == 2:
        return (2 * y - 1) // 3
    if residue == 1:
        return (4 * y - 1) // 3
    return None


def probe_general_greedy(max_endpoint: int = 5000, max_r: int = 8) -> None:
    """Find whether an everywhere-defined greedy inverse chain is depth-minimal."""
    print("GENERAL_GREEDY")
    for endpoint in range(1, max_endpoint + 1, 2):
        if endpoint % 3 == 0:
            continue
        y = endpoint
        greedy_starts: list[int] = []
        for r in range(1, max_r + 1):
            y = greedy_inverse(y)
            if y is None or y <= 0 or y % 2 == 0:
                break
            greedy_starts.append(y)
            for z in range(1, y, 2):
                zs, _ = follow(z, r)
                if zs[-1] == endpoint:
                    print(
                        "COUNTEREXAMPLE greedy not minimal",
                        f"endpoint={endpoint} r={r} greedy={y} smaller={z}",
                    )
                    return
    print(f"no_counterexample endpoint_cap={max_endpoint} depth_cap={max_r}")


def probe_endpoint_valuation(seed_cap: int = 20000, step_cap: int = 300) -> None:
    """Refute overly strong local relations between v3 and trailing ones."""
    print("ENDPOINT_VALUATION")
    for seed in range(3, seed_cap, 2):
        xs, aa = follow(seed, step_cap)
        # Check all blocks of modest length along the generated segment.
        for j in range(step_cap):
            A = 0
            trailing_ones = 0
            for r in range(1, min(30, step_cap - j) + 1):
                a = aa[j + r - 1]
                A += a
                if (1 << A) >= pow(3, r):
                    break
                if a == 1:
                    trailing_ones += 1
                else:
                    trailing_ones = 0
                b = v_p(xs[j + r] + 1, 3)
                if b > trailing_ones and b > 0:
                    w = tuple(aa[j : j + r])
                    print(
                        "COUNTEREXAMPLE v3<=trailing-ones",
                        f"seed={seed} j={j} r={r} word={w}",
                        f"endpoint={xs[j+r]} v3={b} trailing={trailing_ones}",
                    )
                    return
    print("no_counterexample (unexpected)")


if __name__ == "__main__":
    probe_near_terminal()
    probe_all_one_minimality()
    probe_general_greedy()
    probe_endpoint_valuation()
