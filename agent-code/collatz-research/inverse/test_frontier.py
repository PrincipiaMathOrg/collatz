"""Exact experiments for inverse-fiber, FCD, and inverse-carry claims.

All arithmetic is integral.  This script is deliberately a falsifier: it
searches for the first literal counterexample to proposed finite statements
and cross-checks the finite min-plus formula against breadth-first inversion.
"""

from __future__ import annotations

from dataclasses import dataclass
from itertools import product


def shortcut(x: int) -> int:
    return x // 2 if x % 2 == 0 else (3 * x + 1) // 2


def v2(x: int) -> int:
    assert x > 0
    return (x & -x).bit_length() - 1


def accelerated(x: int) -> int:
    assert x > 0 and x % 2 == 1
    y = 3 * x + 1
    return y >> v2(y)


def first_crossing(n: int, cap: int = 100_000):
    """Return (k, endpoint, odd_count) at the first q_k < 1, if seen."""
    x = n
    odd_count = 0
    pow3 = 1
    pow2 = 1
    for k in range(1, cap + 1):
        if x % 2:
            odd_count += 1
            pow3 *= 3
        pow2 *= 2
        x = shortcut(x)
        if pow3 < pow2:
            return k, x, odd_count
    return None


def inverse_carry_bits(parities: list[int]):
    """Return (rho_k,z_k,b_k,s_k) using the intrinsic exact recursion."""
    rho = 0
    z = 0
    s = 0
    rows = []
    for k, eps in enumerate(parities):
        b = (z + eps) & 1
        s_next = s + eps
        numerator = (3**eps) * z + eps + b * 3**s_next
        assert numerator % 2 == 0
        z = numerator // 2
        rho += b * (1 << k)
        s = s_next
        assert 0 <= z < 3**s
        rows.append((rho, z, b, s))
    return rows


def parity_prefix(n: int, k: int) -> list[int]:
    out = []
    x = n
    for _ in range(k):
        out.append(x & 1)
        x = shortcut(x)
    return out


def carry(word: tuple[int, ...]) -> tuple[int, int]:
    c = 0
    a_total = 0
    for a in word:
        c = 3 * c + (1 << a_total)
        a_total += a
    return a_total, c


def endpoint(n: int, r: int) -> int:
    x = n
    for _ in range(r):
        x = accelerated(x)
    return x


def exponent_cap(n: int, i: int) -> int:
    """floor(log2(3*2^i*n+1)), valid for a_i of any ancestor <= n."""
    return (3 * (1 << i) * n + 1).bit_length() - 1


def inverse_fiber_formula(n: int, r: int):
    """Finite affine-envelope formula, returning (minimum, witnesses)."""
    x = endpoint(n, r)
    best = n
    witnesses = []
    ranges = [range(1, exponent_cap(n, i) + 1) for i in range(r)]
    for word in product(*ranges):
        a_total, c = carry(word)
        numerator = (1 << a_total) * x - c
        if numerator <= 0 or numerator % (3**r):
            continue
        z = numerator // (3**r)
        if z > n or z % 2 == 0:
            continue
        # Full divisibility should force a positive exact inverse lift.
        y = z
        exact = True
        for a in word:
            q = 3 * y + 1
            if v2(q) != a:
                exact = False
                break
            y = q >> a
        assert exact and y == x
        if z < best:
            best = z
            witnesses = [word]
        elif z == best:
            witnesses.append(word)
    return best, witnesses


def inverse_fiber_bfs(n: int, r: int):
    """Independent backward enumeration, clipped by the proved orbit bounds."""
    level = {endpoint(n, r)}
    for j in range(1, r + 1):
        next_level = set()
        state_cap = (1 << (r - j)) * n
        for y in level:
            a = 1 if y % 3 == 2 else 2
            while True:
                z_num = (1 << a) * y - 1
                assert z_num % 3 == 0
                z = z_num // 3
                if z > state_cap:
                    break
                assert z > 0 and z % 2 == 1 and accelerated(z) == y
                next_level.add(z)
                a += 2
        level = next_level
    assert level
    return min(level), level


def search_fcd(limit: int):
    for n in range(2, limit + 1):
        hit = first_crossing(n)
        if hit is not None:
            k, x, s = hit
            if x >= n:
                return n, k, x, s
    return None


def verify_formula(limit: int, max_depth: int):
    for n in range(1, limit + 1, 2):
        for r in range(max_depth + 1):
            formula, _ = inverse_fiber_formula(n, r)
            bfs, _ = inverse_fiber_bfs(n, r)
            assert formula == bfs, (n, r, formula, bfs)


def verify_eventual_zero(limit: int, extra: int = 12):
    for n in range(limit + 1):
        bits = inverse_carry_bits(parity_prefix(n, n.bit_length() + extra))
        recovered = bits[-1][0] if bits else 0
        assert recovered == n, (n, recovered)
        assert all(row[2] == 0 for row in bits[n.bit_length() :])


if __name__ == "__main__":
    print("first_FCD_counterexample", search_fcd(2_000_000))
    verify_formula(limit=99, max_depth=4)
    print("inverse_fiber_formula_crosscheck", "passed")
    verify_eventual_zero(limit=10_000)
    print("inverse_carry_finite_support_crosscheck", "passed")
