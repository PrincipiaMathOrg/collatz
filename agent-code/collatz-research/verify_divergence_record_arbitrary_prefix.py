#!/usr/bin/env python3
"""Exact certificate for divergence_record_arbitrary_prefix_rigidity.tex.

Only Python integer arithmetic and fractions are used.  The finite residue
reduction checked here is proved in the TeX file; this program verifies the
remaining finite tables and their asserted maxima.
"""

from fractions import Fraction
from itertools import product


ATOMS = {
    "A": (1,),
    "B": (1, 2),
    "C": (1, 1, 1, 3),
    "D": (1, 1, 2, 2),
}


def mass(word):
    return sum(word)


def carry(word):
    length = len(word)
    prefix = 0
    value = 0
    for index, exponent in enumerate(word):
        value += 3 ** (length - index - 1) * 2**prefix
        prefix += exponent
    return value


def shifted_carry(word):
    return carry(word) + 2 ** mass(word) - 3 ** len(word)


def compositions(length, total, prefix=()):
    if length == 1:
        yield prefix + (total,)
        return
    for first in range(1, total - length + 2):
        yield from compositions(length - 1, total - first, prefix + (first,))


def lattice_admissible(defect, offset):
    """Necessary parity lattice for z = 2^defect x + offset, x,z odd."""
    if defect < 0:
        return (
            offset.denominator == 2 ** (-defect)
            and offset.numerator % 2 == 1
        )
    if defect == 0:
        return offset.denominator == 1 and offset.numerator % 2 == 0
    return offset.denominator == 1 and offset.numerator % 2 == 1


def transition(right_defect, right_offset, atom_name, alternative_word):
    atom = ATOMS[atom_name]
    length = len(atom)
    left_defect = right_defect + mass(alternative_word) - mass(atom)
    left_offset = (
        Fraction(2) ** left_defect * carry(atom)
        + Fraction(2) ** mass(alternative_word) * right_offset
        - carry(alternative_word)
    ) / 3**length
    return left_defect, left_offset


def normalized_carry(word):
    return Fraction(carry(word), 2 ** mass(word))


# (case, atom, right defect, right offset, expected maximum R=C(v)/2^B(v),
#  maximizing word).  None means that no lattice-admissible transition exists.
EXCEPTIONAL_CASES = (
    ("B(-1)", "B", -1, Fraction(-1, 2), None, None),
    ("B(0)", "B", 0, Fraction(0), Fraction(5, 8), (1, 2)),
    ("C(-1)", "C", -1, Fraction(-1, 2), Fraction(85, 512), (1, 2, 1, 5)),
    ("D(-1)", "D", -1, Fraction(-1, 2), None, None),
    ("C(0)", "C", 0, Fraction(0), Fraction(73, 32), (1, 1, 2, 1)),
    ("D(0)", "D", 0, Fraction(0), Fraction(73, 64), (1, 1, 2, 2)),
    ("C(1,-1)", "C", 1, Fraction(-1), None, None),
    ("D(1,-1)", "D", 1, Fraction(-1), Fraction(85, 256), (1, 2, 1, 4)),
)


def canonical_high_candidates(atom_name, right_defect, right_offset):
    """Candidates covering every transition with left defect at least three.

    For length l, suffix exponents are reduced modulo ord_{3^l}(2), with
    positive representatives.  For each of the two possible parities of the
    first exponent, the least first exponent giving left defect >= 3 is used.
    The TeX proof shows that these operations preserve admissibility and can
    only increase C(v)/2^B(v).
    """
    atom = ATOMS[atom_name]
    length = len(atom)
    period = {2: 6, 4: 54}[length]
    atom_mass = mass(atom)
    for suffix in product(range(1, period + 1), repeat=length - 1):
        suffix_mass = sum(suffix)
        for parity in (0, 1):
            first = max(1, 3 - right_defect + atom_mass - suffix_mass)
            if first % 2 != parity:
                first += 1
            word = (first,) + suffix
            left_defect, left_offset = transition(
                right_defect, right_offset, atom_name, word
            )
            assert left_defect >= 3
            if lattice_admissible(left_defect, left_offset):
                yield word, left_defect, left_offset


def verify_exceptional_table():
    observed = {}
    for case, atom_name, right_defect, right_offset, expected, maximizer in EXCEPTIONAL_CASES:
        best = None
        best_word = None
        hits = 0
        atom = ATOMS[atom_name]
        atom_mass = mass(atom)

        # All low left defects have fixed total mass, hence finitely many words.
        for left_defect in range(-1, 3):
            total = left_defect - right_defect + atom_mass
            if total < len(atom):
                continue
            for word in compositions(len(atom), total):
                defect, offset = transition(
                    right_defect, right_offset, atom_name, word
                )
                assert defect == left_defect
                if not lattice_admissible(defect, offset):
                    continue
                hits += 1
                ratio = normalized_carry(word)
                if best is None or ratio > best:
                    best = ratio
                    best_word = word

        for word, defect, offset in canonical_high_candidates(
            atom_name, right_defect, right_offset
        ):
            assert defect >= 3 and lattice_admissible(defect, offset)
            hits += 1
            ratio = normalized_carry(word)
            if best is None or ratio > best:
                best = ratio
                best_word = word

        assert best == expected, (case, best, expected)
        assert best_word == maximizer, (case, best_word, maximizer)
        observed[case] = (hits, best, best_word)
    return observed


def verify_no_drop_below_minus_one():
    """Check the finite cases not covered by the raw mass lower bound."""
    right_states = [(-1, Fraction(-1, 2))]
    right_states += [(0, Fraction(value)) for value in (0, 2, 4)]
    for right_defect, right_offset in right_states:
        for atom_name, atom in ATOMS.items():
            minimum_left = right_defect + len(atom) - mass(atom)
            for left_defect in range(minimum_left, -1):
                total = left_defect - right_defect + mass(atom)
                if total < len(atom):
                    continue
                for word in compositions(len(atom), total):
                    defect, offset = transition(
                        right_defect, right_offset, atom_name, word
                    )
                    assert defect == left_defect
                    assert not lattice_admissible(defect, offset), (
                        right_defect,
                        right_offset,
                        atom_name,
                        word,
                        defect,
                        offset,
                    )


def verify_half_preimages():
    """Enumerate every band state that can enter (-1,-1/2) in one atom."""
    expected = {
        ((-1, Fraction(-1, 2)), "A", (1,)),
        ((0, Fraction(0)), "C", (1, 1, 2, 1)),
    }
    found = set()
    target = (-1, Fraction(-1, 2))
    for right_defect in (-1, 0, 1):
        if right_defect == -1:
            offsets = (Fraction(-1, 2),)
        elif right_defect == 0:
            offsets = tuple(Fraction(value) for value in (0, 2, 4))
        else:
            offsets = tuple(Fraction(value) for value in (-1, 1, 3, 5, 7, 9))
        for right_offset in offsets:
            for atom_name, atom in ATOMS.items():
                total = target[0] - right_defect + mass(atom)
                if total < len(atom):
                    continue
                for word in compositions(len(atom), total):
                    if transition(
                        right_defect, right_offset, atom_name, word
                    ) == target:
                        found.add(((right_defect, right_offset), atom_name, word))
    assert found == expected, (found, expected)
    return found


def verify_atom_constants():
    expected = {
        "A": (1, 1, 1, 0),
        "B": (2, 3, 5, 4),
        "C": (4, 6, 65, 48),
        "D": (4, 6, 73, 56),
    }
    for name, word in ATOMS.items():
        got = (len(word), mass(word), carry(word), shifted_carry(word))
        assert got == expected[name], (name, got, expected[name])

    # These are the exact inequalities used in the induction D(W)<4*3^|W|.
    for name, word in ATOMS.items():
        assert shifted_carry(word) + 4 * 2 ** mass(word) <= 4 * 3 ** len(word)
    assert shifted_carry(ATOMS["B"]) + 4 * 2 ** mass(ATOMS["B"]) == 4 * 3 ** len(ATOMS["B"])


def verify_generic_bounds():
    # The upper-strip numerators 5*2^b+C(P) are at most 5*3^l.
    for name, word in ATOMS.items():
        assert 5 * 2 ** mass(word) + carry(word) <= 5 * 3 ** len(word)

    max_ratio = {1: Fraction(1, 2), 2: Fraction(5, 4), 4: Fraction(65, 16)}
    generic_minimum_defect = {"A": -1, "B": 1, "C": 2, "D": 2}
    for name, word in ATOMS.items():
        delta = generic_minimum_defect[name]
        lower = (
            -Fraction(2 ** mass(word), 3 ** len(word))
            + Fraction(carry(word), 3 ** len(word))
            - Fraction(2 ** (mass(word) - delta), 3 ** len(word))
            * max_ratio[len(word)]
        )
        assert lower >= -1, (name, lower)


def main():
    verify_atom_constants()
    verify_generic_bounds()
    table = verify_exceptional_table()
    verify_no_drop_below_minus_one()
    preimages = verify_half_preimages()
    for case, (hits, ratio, word) in table.items():
        print(f"{case}: hits={hits}, max={ratio}, word={word}")
    print("half-state preimages:")
    for entry in sorted(preimages, key=str):
        print(entry)
    print("ARBITRARY-PREFIX DISTORTION CERTIFICATE PASSED")


if __name__ == "__main__":
    main()
