#!/usr/bin/env python3
"""Exact certificate for the phase strip behind the Jacobsthal suffix bound."""

from __future__ import annotations

from fractions import Fraction
from itertools import product


TAILS = {
    "113": (1, 1, 3),
    "122": (1, 2, 2),
}


def mass(word: tuple[int, ...]) -> int:
    return sum(word)


def carry(word: tuple[int, ...]) -> int:
    length = len(word)
    prefix_mass = 0
    value = 0
    for index, exponent in enumerate(word):
        value += 3 ** (length - index - 1) * 2**prefix_mass
        prefix_mass += exponent
    return value


def compositions(length: int, total: int, prefix: tuple[int, ...] = ()):
    if length == 1:
        yield prefix + (total,)
        return
    for first in range(1, total - length + 2):
        yield from compositions(length - 1, total - first, prefix + (first,))


def lattice_admissible(defect: int, offset: Fraction) -> bool:
    if defect < 0:
        return (
            offset.denominator == 2 ** (-defect)
            and offset.numerator % 2 == 1
        )
    if defect == 0:
        return offset.denominator == 1 and offset.numerator % 2 == 0
    return offset.denominator == 1 and offset.numerator % 2 == 1


def transition(
    right_defect: int,
    right_offset: Fraction,
    actual_word: tuple[int, ...],
    alternative_word: tuple[int, ...],
) -> tuple[int, Fraction]:
    left_defect = right_defect + mass(alternative_word) - mass(actual_word)
    left_offset = (
        Fraction(2) ** left_defect * carry(actual_word)
        + Fraction(2) ** mass(alternative_word) * right_offset
        - carry(alternative_word)
    ) / 3 ** len(actual_word)
    return left_defect, left_offset


RIGHT_STATES = (
    (-1, Fraction(-1, 2)),
    (0, Fraction(0)),
    (0, Fraction(2)),
    (0, Fraction(4)),
    (1, Fraction(-1)),
    (1, Fraction(1)),
    (1, Fraction(3)),
    (1, Fraction(5)),
    (1, Fraction(7)),
    (1, Fraction(9)),
)


EXPECTED_MINIMA = {
    "113": (
        Fraction(-7, 8),
        Fraction(-1),
        Fraction(2),
        None,
        None,
        Fraction(9, 8),
        Fraction(19, 8),
        None,
        Fraction(4),
        Fraction(11, 2),
    ),
    "122": (
        None,
        Fraction(0),
        None,
        Fraction(21, 4),
        Fraction(1, 16),
        None,
        Fraction(81, 32),
        Fraction(241, 64),
        None,
        Fraction(11, 2),
    ),
}


def canonical_high_candidates(
    actual_word: tuple[int, ...],
    right_defect: int,
    right_offset: Fraction,
):
    """Cover all lattice transitions whose left defect is at least three."""
    period = 18  # ord_{27}(2)
    actual_mass = mass(actual_word)
    for suffix in product(range(1, period + 1), repeat=2):
        suffix_mass = sum(suffix)
        for parity in (0, 1):
            first = max(1, 3 - right_defect + actual_mass - suffix_mass)
            if first % 2 != parity:
                first += 1
            word = (first,) + suffix
            left_defect, left_offset = transition(
                right_defect, right_offset, actual_word, word
            )
            assert left_defect >= 3
            if lattice_admissible(left_defect, left_offset):
                yield word, left_defect, left_offset


def minimum_normalized_offset(
    actual_word: tuple[int, ...],
    right_defect: int,
    right_offset: Fraction,
) -> tuple[Fraction | None, int]:
    best = None
    cases = 0
    minimum_left = right_defect + len(actual_word) - mass(actual_word)

    for left_defect in range(minimum_left, 3):
        total = left_defect - right_defect + mass(actual_word)
        if total < len(actual_word):
            continue
        for word in compositions(len(actual_word), total):
            defect, offset = transition(
                right_defect, right_offset, actual_word, word
            )
            assert defect == left_defect
            cases += 1
            if not lattice_admissible(defect, offset):
                continue
            normalized = offset / Fraction(2) ** defect
            if best is None or normalized < best:
                best = normalized

    for _, defect, offset in canonical_high_candidates(
        actual_word, right_defect, right_offset
    ):
        cases += 1
        normalized = offset / Fraction(2) ** defect
        if best is None or normalized < best:
            best = normalized

    return best, cases


def verify_exceptional_phase_table() -> int:
    cases = 0
    for name, actual_word in TAILS.items():
        observed = []
        for right_defect, right_offset in RIGHT_STATES:
            minimum, checked = minimum_normalized_offset(
                actual_word, right_defect, right_offset
            )
            cases += checked
            observed.append(minimum)
        assert tuple(observed) == EXPECTED_MINIMA[name], (name, observed)
        assert all(value is None or value >= -1 for value in observed)
    return cases


def verify_jacobsthal_rounding(maximum_defect: int = 128) -> None:
    for defect in range(1, maximum_defect + 1):
        jacobsthal = (2**defect - (-1) ** defect) // 3
        assert jacobsthal % 2 == 1
        assert 3 * (-jacobsthal) >= -2**defect - 1
        assert 3 * (-jacobsthal - 2) < -2**defect - 1


def main() -> None:
    cases = verify_exceptional_phase_table()
    verify_jacobsthal_rounding()
    print(f"canonical_phase_cases_checked={cases}")
    print("PHASE-STRIP JACOBSTHAL CERTIFICATE PASSED")


if __name__ == "__main__":
    main()
