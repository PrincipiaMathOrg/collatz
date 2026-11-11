#!/usr/bin/env python3
"""Exact regression for the two-sided carry-position identities."""

from __future__ import annotations

from fractions import Fraction
from itertools import combinations


def weak_compositions(total: int, length: int):
    for bars in combinations(range(total + length - 1), length - 1):
        previous = -1
        parts = []
        for bar in bars + (total + length - 1,):
            parts.append(bar - previous - 1)
            previous = bar
        yield tuple(parts)


def carry(word: tuple[int, ...]) -> int:
    length = len(word)
    prefix_mass = 0
    value = 0
    for index, exponent in enumerate(word):
        value += 3 ** (length - index - 1) * 2**prefix_mass
        prefix_mass += exponent
    return value


def shifted_carry(word: tuple[int, ...]) -> int:
    return carry(word) + 2 ** sum(word) - 3 ** len(word)


def main(maximum_length: int = 9, maximum_excess: int = 10) -> None:
    cases = 0
    squeeze_checks = 0

    for length in range(1, maximum_length + 1):
        for excess in range(maximum_excess + 1):
            minimum = 2**length * (2**excess - 1)
            maximum = 2 * 3 ** (length - 1) * (2**excess - 1)

            for parts in weak_compositions(excess, length):
                word = tuple(part + 1 for part in parts)
                value = shifted_carry(word)
                prefixes = []
                running = 0
                for part in parts:
                    running += part
                    prefixes.append(running)

                early_slack = Fraction(value - minimum, 3**length)
                late_slack = Fraction(maximum - value, 3**length)
                predicted_early = sum(
                    (
                        Fraction(1, 3)
                        * Fraction(2, 3) ** k
                        * (2 ** prefixes[k - 1] - 1)
                    )
                    for k in range(1, length)
                )
                predicted_late = sum(
                    (
                        Fraction(1, 3)
                        * Fraction(2, 3) ** k
                        * (2**excess - 2 ** prefixes[k - 1])
                    )
                    for k in range(1, length)
                )
                assert early_slack == predicted_early
                assert late_slack == predicted_late

                for k in range(1, length):
                    prefix_excess = prefixes[k - 1]
                    late_floor = (
                        Fraction(2, 3)
                        * (1 - Fraction(2, 3) ** k)
                        * (2**excess - 2**prefix_excess)
                    )
                    early_floor = (
                        Fraction(2, 3) ** k
                        * (1 - Fraction(2, 3) ** (length - k))
                        * (2**prefix_excess - 1)
                    )
                    assert late_slack >= late_floor
                    assert early_slack >= early_floor
                    squeeze_checks += 1
                cases += 1

    print(f"composition_cases_checked={cases}")
    print(f"position_squeezes_checked={squeeze_checks}")
    print("CARRY-POSITION CERTIFICATE PASSED")


if __name__ == "__main__":
    main()
