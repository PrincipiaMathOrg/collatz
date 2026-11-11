#!/usr/bin/env python3
"""Exact certificate for the reciprocal-mass bound in the all-depth theorem.

The program computes, for 0 <= k <= K,

    B_k = min_t (sum_{o=t+1}^k binom(k,o) + sum_{o=0}^t 3^o)

and the upward-rounded 10^-15 grid sum

    S_K^+ = 10^-15 sum_k ceil(10^15 * min(2^k,B_k+k)/(3*2^k-1)).

For K=1000 it also checks the two integer inequalities used in the analytic
remainder estimate and proves, with exact rational arithmetic, that

    S_infinity < 10.789.

No floating-point arithmetic is used in a proof-relevant comparison.
"""

from __future__ import annotations

import argparse
import csv
import math
from fractions import Fraction
from pathlib import Path

SCALE = 10**15
DEFAULT_K = 1000


def ceil_fraction(x: Fraction) -> int:
    return (x.numerator + x.denominator - 1) // x.denominator


def shell_bound(k: int) -> tuple[int, int]:
    """Return (B_k, minimizing t), with all arithmetic exact."""
    binoms = [math.comb(k, o) for o in range(k + 1)]
    suffix = [0] * (k + 2)
    for o in range(k, -1, -1):
        suffix[o] = suffix[o + 1] + binoms[o]

    geometric = 0
    best: int | None = None
    best_t = 0
    pow3 = 1
    for t in range(k + 1):
        geometric += pow3
        pow3 *= 3
        candidate = suffix[t + 1] + geometric
        if best is None or candidate < best:
            best = candidate
            best_t = t
    assert best is not None
    return best, best_t


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--K", type=int, default=DEFAULT_K)
    parser.add_argument("--csv", type=Path, default=None)
    args = parser.parse_args()
    if args.K < 0:
        raise SystemExit("K must be nonnegative")

    rows: list[tuple[int, int, int, int, int]] = []
    scaled_sum = 0
    exact_partial = Fraction(0, 1)

    for k in range(args.K + 1):
        Bk, t = shell_bound(k)
        numerator = min(1 << k, Bk + k)
        denominator = 3 * (1 << k) - 1
        term = Fraction(numerator, denominator)
        rounded = ceil_fraction(term * SCALE)
        scaled_sum += rounded
        exact_partial += term
        rows.append((k, Bk, t, numerator, rounded))

    if args.csv is not None:
        args.csv.parent.mkdir(parents=True, exist_ok=True)
        with args.csv.open("w", newline="", encoding="utf-8") as handle:
            writer = csv.writer(handle)
            writer.writerow(["k", "B_k", "minimizing_t", "shell_numerator", "ceil_1e15_term"])
            writer.writerows(rows)

    print(f"K={args.K}")
    print(f"scaled_upward_sum={scaled_sum}")
    print(f"upward_sum_decimal={scaled_sum / SCALE:.15f}")
    print(f"exact_partial_numerator_bits={exact_partial.numerator.bit_length()}")
    print(f"exact_partial_denominator_bits={exact_partial.denominator.bit_length()}")

    if args.K == 1000:
        inequality_1 = 3**61 < 2**97
        inequality_2 = 100**100 < 2**97 * 61**61 * 39**39
        if not inequality_1 or not inequality_2:
            raise AssertionError("tail integer inequality failed")

        # For k >= 1001 and t=floor(61k/100), Chernoff plus a geometric
        # estimate gives B_k < (5/2) 2^(97k/100).  Grouping 100 successive
        # k-values yields the exact rational upper bound below.
        tail_geometric = Fraction(1000, 7 * 2**30)
        tail_linear = Fraction(1002, 2**1001)
        tail_upper = tail_geometric + tail_linear
        total_upper = Fraction(scaled_sum, SCALE) + tail_upper
        target = Fraction(10789, 1000)

        print(f"check_3pow61_lt_2pow97={inequality_1}")
        print(f"check_entropy_integer_inequality={inequality_2}")
        print(f"tail_upper_numerator={tail_upper.numerator}")
        print(f"tail_upper_denominator={tail_upper.denominator}")
        print(f"tail_upper_decimal={float(tail_upper):.15e}")
        print(f"certified_total_upper_decimal={float(total_upper):.15f}")
        print(f"certified_total_lt_10_789={total_upper < target}")

        expected = 10_788_901_977_820_654
        if scaled_sum != expected:
            raise AssertionError(
                f"scaled certificate mismatch: got {scaled_sum}, expected {expected}"
            )
        if not total_upper < target:
            raise AssertionError("reciprocal-mass total is not certified below 10.789")


if __name__ == "__main__":
    main()
