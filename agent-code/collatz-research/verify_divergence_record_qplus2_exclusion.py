#!/usr/bin/env python3
"""Exact certificate for elimination of the q+2 suffix channel."""

from __future__ import annotations

from fractions import Fraction


ATOMS = {
    "B": (1, 2),
    "C": (1, 1, 1, 3),
    "D": (1, 1, 2, 2),
}


def carry(word: tuple[int, ...]) -> int:
    length = len(word)
    prefix_mass = 0
    value = 0
    for index, exponent in enumerate(word):
        value += 3 ** (length - index - 1) * 2**prefix_mass
        prefix_mass += exponent
    return value


def compositions(length: int, total: int, prefix: tuple[int, ...] = ()):
    """Yield all positive length-part compositions of total."""
    if length == 1:
        yield prefix + (total,)
        return
    for first in range(1, total - length + 2):
        yield from compositions(length - 1, total - first, prefix + (first,))


def strip_offsets(defect: int) -> tuple[Fraction, ...]:
    """All lattice points with -1 <= c/2^defect <= 5."""
    if defect == -1:
        return (Fraction(-1, 2),)
    if defect == 0:
        return tuple(Fraction(value) for value in (0, 2, 4))
    return tuple(
        Fraction(value)
        for value in range(-2**defect + 1, 5 * 2**defect + 1, 2)
    )


def main() -> None:
    cases = 0
    rows = 0

    for atom_name, atom in ATOMS.items():
        length = len(atom)
        atom_mass = sum(atom)
        atom_carry = carry(atom)
        atom_excess = atom_mass - length

        for right_defect in range(-1, atom_excess + 1):
            alternative_mass = atom_mass - right_defect
            rows += 1
            for right_offset in strip_offsets(right_defect):
                required_carry = (
                    atom_carry
                    + 2**alternative_mass * right_offset
                    - 2 * 3**length
                )
                for alternative_word in compositions(length, alternative_mass):
                    cases += 1
                    assert carry(alternative_word) != required_carry, (
                        atom_name,
                        right_defect,
                        right_offset,
                        alternative_word,
                    )

    assert rows == 11
    assert cases == 187
    print(f"transition_rows_checked={rows}")
    print(f"exact_transition_cases_checked={cases}")
    print("Q-PLUS-TWO SUFFIX EXCLUSION CERTIFICATE PASSED")


if __name__ == "__main__":
    main()
