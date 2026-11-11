#!/usr/bin/env python3
"""Exact certificate for the seven uniform atom-pair rewrites."""

from fractions import Fraction


ATOMS = {
    "A": (1,),
    "B": (1, 2),
    "C": (1, 1, 1, 3),
    "D": (1, 1, 2, 2),
}

ROWS = {
    "AC": ((1, 1, 1, 1, 3), (1, 1, 2, 1), 223, 425, 167),
    "BC": ((1, 2, 1, 1, 1, 3), (1,), 411, 587, 391),
    "CA": ((1, 1, 1, 3, 1), (1, 1), 207, 395, 175),
    "CB": ((1, 1, 1, 3, 1, 2), (1, 1, 2), 463, 661, 391),
    "CC": ((1, 1, 1, 3, 1, 1, 1, 3), (1, 2, 1), 4815, 7715, 4571),
    "CD": ((1, 1, 1, 3, 1, 1, 2, 2), (1, 1, 1, 2, 2), 4303, 6895, 3631),
    "DC": ((1, 1, 2, 2, 1, 1, 1, 3), (1, 2, 1), 3399, 5447, 3227),
}


def valuation_two(value: int) -> int:
    return (value & -value).bit_length() - 1


def follow(seed: int, word: tuple[int, ...]) -> int:
    value = seed
    for expected in word:
        numerator = 3 * value + 1
        actual = valuation_two(numerator)
        assert actual == expected
        value = numerator >> expected
        assert value > 0 and value % 2 == 1
    return value


def carry(word: tuple[int, ...]) -> int:
    result = 0
    prefix_mass = 0
    depth = len(word)
    for index, exponent in enumerate(word):
        result += 3 ** (depth - index - 1) * 2**prefix_mass
        prefix_mass += exponent
    return result


def canonical_seed(word: tuple[int, ...]) -> int:
    depth = len(word)
    mass = sum(word)
    modulus = 2 ** (mass + 1)
    result = (
        (2**mass - carry(word))
        * pow(3**depth, -1, modulus)
        % modulus
    )
    assert result > 0 and result % 2 == 1
    return result


def shifted_affine(word: tuple[int, ...]) -> tuple[Fraction, Fraction]:
    depth = len(word)
    mass = sum(word)
    shifted = carry(word) + 2**mass - 3**depth
    return Fraction(3**depth, 2**mass), Fraction(shifted, 2**mass)


def main() -> None:
    expected_pairs = {
        left + right
        for left in ATOMS
        for right in ATOMS
        if "C" in (left, right)
    }
    assert set(ROWS) == expected_pairs

    for name, (source, alternative, x0, y0, z0) in ROWS.items():
        assert source == ATOMS[name[0]] + ATOMS[name[1]]
        assert canonical_seed(source) == x0
        assert follow(x0, source) == y0
        assert follow(z0, alternative) == y0
        assert 0 < z0 < x0
        assert len(alternative) < len(source)

        source_scale, source_offset = shifted_affine(source)
        alternative_scale, alternative_offset = shifted_affine(alternative)
        slope = source_scale / alternative_scale
        intercept = (source_offset - alternative_offset) / alternative_scale
        assert Fraction(z0 + 1) == slope * (x0 + 1) + intercept

        source_increment = 2 ** (sum(source) + 1)
        alternative_increment = (
            2 ** (sum(alternative) + 1)
            * 3 ** (len(source) - len(alternative))
        )
        assert Fraction(alternative_increment, source_increment) == slope
        assert alternative_increment < source_increment

        for lift in (0, 1, 2, 17):
            source_start = x0 + source_increment * lift
            alternative_start = z0 + alternative_increment * lift
            endpoint = y0 + 2 * 3 ** len(source) * lift
            assert follow(source_start, source) == endpoint
            assert follow(alternative_start, alternative) == endpoint
            assert alternative_start < source_start

        print(
            f"{name}: source={''.join(map(str, source))} "
            f"alternative={''.join(map(str, alternative))} "
            f"slope={slope.numerator}/{slope.denominator} "
            f"intercept={intercept.numerator}/{intercept.denominator} "
            f"increments={source_increment}>{alternative_increment}"
        )

    print("ATOM-PAIR REWRITE CERTIFICATE PASSED")


if __name__ == "__main__":
    main()
