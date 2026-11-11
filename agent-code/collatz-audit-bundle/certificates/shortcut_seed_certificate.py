#!/usr/bin/env python3
"""Independent shortcut-map certificate for the target-one finite scan.

The map is

    S_-(x) = x/2                 if x is even,
             (3x-1)/2           if x is odd.

Starting from every odd seed 1 <= m < CAP, the program follows exact Python
integers.  At every return to an odd value it checks the accelerated barrier
2^A < 3^r, where A is the shortcut time and r the number of odd inputs.
The run stops at the first hit of 1, a repeated state, or barrier failure.
"""

from __future__ import annotations

import argparse
from collections import Counter


def classify(seed: int, step_cap: int) -> tuple[str, int, int]:
    x = seed
    seen: set[int] = set()
    odd_steps = 0
    time = 0
    largest = x

    for _ in range(step_cap):
        if x == 1:
            return "hit_1", time, largest
        if x in seen:
            return "cycle", time, largest
        seen.add(x)

        was_odd = x & 1
        if was_odd:
            x = (3 * x - 1) // 2
            odd_steps += 1
        else:
            x //= 2
        time += 1
        largest = max(largest, x)

        # An accelerated checkpoint is precisely a shortcut time at which the
        # new state is odd.  The strict barrier is checked only there.
        if x & 1:
            if (1 << time) >= 3**odd_steps:
                return "barrier_failure", time, largest

    return "step_cap", time, largest


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--cap", type=int, default=200_000)
    parser.add_argument("--step-cap", type=int, default=100_000)
    args = parser.parse_args()
    if args.cap <= 1 or args.step_cap <= 0:
        raise SystemExit("invalid cap")

    counts: Counter[str] = Counter()
    hits: list[tuple[int, int]] = []
    longest = (-1, -1)
    largest_seen = 0

    for seed in range(1, args.cap, 2):
        status, steps, largest = classify(seed, args.step_cap)
        counts[status] += 1
        largest_seen = max(largest_seen, largest)
        if status == "hit_1":
            hits.append((seed, steps))
        if steps > longest[0]:
            longest = (steps, seed)

    print(f"cap={args.cap}")
    print(f"status_counts={dict(sorted(counts.items()))}")
    print(f"terminal_hits={hits}")
    print(f"longest_resolution_steps={longest[0]}")
    print(f"longest_resolution_seed={longest[1]}")
    print(f"largest_value_seen={largest_seen}")

    expected = {"barrier_failure": 99_997, "cycle": 2, "hit_1": 1}
    if dict(counts) != expected:
        raise AssertionError(f"status mismatch: {dict(counts)} != {expected}")
    if hits != [(1, 0)]:
        raise AssertionError(f"unexpected terminal hits: {hits}")
    if longest != (132, 149_345):
        raise AssertionError(f"unexpected longest resolution: {longest}")
    if "step_cap" in counts:
        raise AssertionError("unresolved seed")
    print("certificate_passed=True")


if __name__ == "__main__":
    main()
