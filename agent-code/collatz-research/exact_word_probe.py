"""Exact finite probes for the Collatz proof ledger.

The program only tests sharply stated finite claims.  Every computation uses
Python integers.  A reported pattern is evidence, not a theorem.
"""

from __future__ import annotations

import argparse
from collections import Counter
from dataclasses import dataclass
from typing import Iterable, Iterator


def shortcut(x: int) -> int:
    return x // 2 if x % 2 == 0 else (3 * x + 1) // 2


def word_data(bits: tuple[int, ...]) -> tuple[int, int, int]:
    """Return (Q, P, C) with Q*T^k(x) = P*x+C."""
    carry = 0
    weight = 0
    for j, bit in enumerate(bits):
        if bit:
            carry = 3 * carry + (1 << j)
            weight += 1
    return 1 << len(bits), 3**weight, carry


def canonical_seed(bits: tuple[int, ...]) -> int:
    q, p, carry = word_data(bits)
    return (-carry * pow(p, -1, q)) % q


def positive_representative(bits: tuple[int, ...]) -> int:
    q, _, _ = word_data(bits)
    rho = canonical_seed(bits)
    return rho if rho else q


def trajectory(seed: int, k: int) -> list[int]:
    out = [seed]
    for _ in range(k):
        out.append(shortcut(out[-1]))
    return out


def parity_word(seed: int, k: int) -> tuple[int, ...]:
    out: list[int] = []
    x = seed
    for _ in range(k):
        out.append(x & 1)
        x = shortcut(x)
    return tuple(out)


def primitive_first_crossings(max_k: int) -> Iterator[tuple[int, ...]]:
    """Words with P_j >= Q_j for j<k and P_k<Q_k."""

    def visit(bits: tuple[int, ...], p: int, q: int) -> Iterator[tuple[int, ...]]:
        if len(bits) >= max_k:
            return
        for bit in (0, 1):
            p2 = p * (3 if bit else 1)
            q2 = q * 2
            w = bits + (bit,)
            if p2 < q2:
                yield w
            else:
                yield from visit(w, p2, q2)

    yield from visit((), 1, 1)


@dataclass(frozen=True)
class CrossingWitness:
    bits: tuple[int, ...]
    seed: int
    endpoint: int
    minimum: int


def probe_first_crossing(max_k: int, witness_cap: int) -> None:
    counts: Counter[str] = Counter()
    witnesses: dict[str, list[CrossingWitness]] = {
        "nondescending": [],
        "strict_paradox": [],
        "minimum_strict_paradox": [],
    }
    by_length: Counter[int] = Counter()

    for bits in primitive_first_crossings(max_k):
        if not bits or bits[0] == 0:
            continue
        seed = positive_representative(bits)
        orbit = trajectory(seed, len(bits))
        assert parity_word(seed, len(bits)) == bits
        endpoint = orbit[-1]
        counts["words"] += 1
        by_length[len(bits)] += 1
        if endpoint >= seed:
            counts["nondescending"] += 1
            if len(witnesses["nondescending"]) < witness_cap:
                witnesses["nondescending"].append(
                    CrossingWitness(bits, seed, endpoint, min(orbit))
                )
        if endpoint > seed:
            counts["strict_paradox"] += 1
            if len(witnesses["strict_paradox"]) < witness_cap:
                witnesses["strict_paradox"].append(
                    CrossingWitness(bits, seed, endpoint, min(orbit))
                )
            if min(orbit) == seed:
                counts["minimum_strict_paradox"] += 1
                if len(witnesses["minimum_strict_paradox"]) < witness_cap:
                    witnesses["minimum_strict_paradox"].append(
                        CrossingWitness(bits, seed, endpoint, seed)
                    )

    print(f"first_crossing_max_k={max_k}")
    print(f"counts={dict(counts)}")
    print(f"by_length={dict(sorted(by_length.items()))}")
    for kind, items in witnesses.items():
        print(f"{kind}_witnesses=")
        for item in items:
            print(
                "  word={} seed={} endpoint={} minimum={}".format(
                    "".join(map(str, item.bits)),
                    item.seed,
                    item.endpoint,
                    item.minimum,
                )
            )


def probe_cycle_words(max_k: int, witness_cap: int) -> None:
    cycles: list[tuple[int, str, int, int, int]] = []
    primitive: list[tuple[int, str, int, int, int]] = []
    counts: Counter[str] = Counter()
    for k in range(1, max_k + 1):
        for mask in range(1 << k):
            bits = tuple((mask >> j) & 1 for j in range(k))
            q, p, carry = word_data(bits)
            if q <= p:
                continue
            denominator = q - p
            if carry == 0 or carry % denominator:
                continue
            seed = carry // denominator
            if seed <= 0 or parity_word(seed, k) != bits:
                continue
            if trajectory(seed, k)[-1] != seed:
                continue
            counts["cycle_words"] += 1
            period = next(
                (j for j in range(1, k + 1) if trajectory(seed, j)[-1] == seed),
                k,
            )
            row = (k, "".join(map(str, bits)), seed, sum(bits), period)
            if len(cycles) < witness_cap:
                cycles.append(row)
            if period == k:
                counts["primitive_presentations"] += 1
                if len(primitive) < witness_cap:
                    primitive.append(row)
    print(f"cycle_word_max_k={max_k}")
    print(f"counts={dict(counts)}")
    print("cycle_witnesses=")
    for row in cycles:
        print(f"  k={row[0]} word={row[1]} seed={row[2]} weight={row[3]} period={row[4]}")
    print("primitive_presentations=")
    for row in primitive:
        print(f"  k={row[0]} word={row[1]} seed={row[2]} weight={row[3]} period={row[4]}")


def accelerated_step(x: int) -> tuple[int, int]:
    z = 3 * x + 1
    a = (z & -z).bit_length() - 1
    return z >> a, a


def valuation_orbit(seed: int, steps: int) -> tuple[list[int], list[int]]:
    states = [seed]
    vals: list[int] = []
    for _ in range(steps):
        nxt, a = accelerated_step(states[-1])
        vals.append(a)
        states.append(nxt)
    return states, vals


def probe_terminal_synchronization(seed_cap: int, steps: int, max_r: int) -> None:
    counts: Counter[str] = Counter()
    nontrivial: list[tuple[int, int, int, int, tuple[int, ...]]] = []
    all_ones: list[tuple[int, int, int, int]] = []
    best_ratio = (0.0, None)

    for seed in range(1, seed_cap + 1, 2):
        states, vals = valuation_orbit(seed, steps)
        for end in range(1, steps + 1):
            A = 0
            barrier = True
            for r in range(1, min(max_r, end) + 1):
                a = vals[end - r]
                # Rebuild the suffix in forward order below.  A direct reverse
                # update cannot test every relative prefix.
                word = tuple(vals[end - r : end])
                prefix_A = 0
                barrier = True
                for k, letter in enumerate(word, 1):
                    prefix_A += letter
                    if (1 << prefix_A) >= 3**k:
                        barrier = False
                        break
                if not barrier:
                    continue
                counts["barrier_suffixes"] += 1
                valuation = 0
                z = states[end] + 1
                while z % 3 == 0:
                    valuation += 1
                    z //= 3
                ratio = valuation / r
                if ratio > best_ratio[0]:
                    best_ratio = (ratio, (seed, end, r, valuation, word, states[end]))
                if valuation >= r:
                    counts["target_one"] += 1
                    if all(letter == 1 for letter in word):
                        counts["target_one_all_ones"] += 1
                        if len(all_ones) < 20:
                            all_ones.append((seed, end, r, states[end]))
                    else:
                        counts["target_one_nontrivial"] += 1
                        if len(nontrivial) < 20:
                            nontrivial.append((seed, end, r, states[end], word))

    print(
        f"sync_seed_cap={seed_cap} steps={steps} max_r={max_r}\n"
        f"counts={dict(counts)}\n"
        f"best_v3_over_r={best_ratio}\n"
        f"all_ones_examples={all_ones}\n"
        f"nontrivial_examples={nontrivial}"
    )


def main() -> None:
    parser = argparse.ArgumentParser()
    sub = parser.add_subparsers(dest="command", required=True)

    crossing = sub.add_parser("crossing")
    crossing.add_argument("--max-k", type=int, default=24)
    crossing.add_argument("--witness-cap", type=int, default=20)

    cycles = sub.add_parser("cycles")
    cycles.add_argument("--max-k", type=int, default=20)
    cycles.add_argument("--witness-cap", type=int, default=30)

    sync = sub.add_parser("sync")
    sync.add_argument("--seed-cap", type=int, default=2001)
    sync.add_argument("--steps", type=int, default=200)
    sync.add_argument("--max-r", type=int, default=30)

    args = parser.parse_args()
    if args.command == "crossing":
        probe_first_crossing(args.max_k, args.witness_cap)
    elif args.command == "cycles":
        probe_cycle_words(args.max_k, args.witness_cap)
    else:
        probe_terminal_synchronization(args.seed_cap, args.steps, args.max_r)


if __name__ == "__main__":
    main()
