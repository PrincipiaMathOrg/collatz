#!/usr/bin/env python3
"""Exact finite test of the companion Bellman inequality.

For a strict accelerated Collatz word ``w=(a_0,...,a_{L-1})``, let
``rho(w)`` be its least positive odd dyadic representative.  With terminal
condition ``e_L=1``, define

    e_j = (1 + 2**a_j * e_{j+1}) / 3,
    S(w) = sum(1 / e_j).

The candidate inequality is ``S(w) <= rho(w)``.  Since every ``e_j >= 1``,
it is automatic when ``rho(w) >= L``.  Consequently, to certify every word
of length at most ``H``, it suffices to follow the ordinary orbits of the odd
seeds below ``H`` and check only prefixes longer than their seed.  Those
prefixes already have the seed itself as their least dyadic representative.

All nontrivial comparisons use ``fractions.Fraction``.  The orbit and strict
barrier tests use integers only.
"""

from argparse import ArgumentParser
from fractions import Fraction


def valuation_two(value: int) -> int:
    return (value & -value).bit_length() - 1


def strict_word(seed: int, depth_cap: int) -> tuple[int, ...]:
    value = seed
    word: list[int] = []
    power_two = 1
    power_three = 1
    for _ in range(depth_cap):
        numerator = 3 * value + 1
        exponent = valuation_two(numerator)
        power_two <<= exponent
        power_three *= 3
        if power_two >= power_three:
            break
        word.append(exponent)
        value = numerator >> exponent
    return tuple(word)


def companion_mass(word: tuple[int, ...]) -> tuple[Fraction, Fraction]:
    companion = Fraction(1)
    mass = Fraction(0)
    for exponent in reversed(word):
        companion = (1 + (1 << exponent) * companion) / 3
        mass += 1 / companion
    return mass, companion


def certify(depth_cap: int) -> dict[str, object]:
    best_ratio = Fraction(0)
    best_row: dict[str, object] | None = None
    nontrivial_prefixes = 0
    nontrivial_seeds = 0
    nontrivial_seed_rows: list[tuple[int, int]] = []
    maximum_strict_length = 0
    maximum_length_seed = 1

    for seed in range(1, depth_cap, 2):
        word = strict_word(seed, depth_cap)
        length = len(word)
        if length > maximum_strict_length:
            maximum_strict_length = length
            maximum_length_seed = seed
        if length <= seed:
            continue

        nontrivial_seeds += 1
        nontrivial_seed_rows.append((seed, length))
        for prefix_length in range(seed + 1, length + 1):
            prefix = word[:prefix_length]
            mass, companion_start = companion_mass(prefix)
            nontrivial_prefixes += 1
            ratio = mass / seed
            if ratio > best_ratio:
                best_ratio = ratio
                best_row = {
                    "seed": seed,
                    "length": prefix_length,
                    "mass": mass,
                    "companion_start": companion_start,
                    "word": prefix,
                }
            if mass > seed:
                raise AssertionError(
                    "Bellman representative bound failed: "
                    f"seed={seed}, length={prefix_length}, "
                    f"mass={mass}, word={prefix}"
                )

    return {
        "depth_cap": depth_cap,
        "nontrivial_seeds": nontrivial_seeds,
        "nontrivial_prefixes": nontrivial_prefixes,
        "nontrivial_seed_rows": nontrivial_seed_rows,
        "maximum_strict_length": maximum_strict_length,
        "maximum_length_seed": maximum_length_seed,
        "best_ratio": best_ratio,
        "best_row": best_row,
    }


def main() -> None:
    parser = ArgumentParser()
    parser.add_argument("--depth", type=int, default=100_000)
    args = parser.parse_args()
    if args.depth < 1:
        raise ValueError("depth must be positive")

    result = certify(args.depth)
    row = result["best_row"]
    print(f'depth_cap={result["depth_cap"]}')
    print(f'nontrivial_seeds={result["nontrivial_seeds"]}')
    print(f'nontrivial_prefixes={result["nontrivial_prefixes"]}')
    print(
        "nontrivial_seed_rows="
        + ",".join(
            f"{seed}:{length}"
            for seed, length in result["nontrivial_seed_rows"]
        )
    )
    print(f'maximum_strict_length={result["maximum_strict_length"]}')
    print(f'maximum_length_seed={result["maximum_length_seed"]}')
    if row is not None:
        mass = row["mass"]
        start = row["companion_start"]
        ratio = result["best_ratio"]
        print(f'best_seed={row["seed"]}')
        print(f'best_length={row["length"]}')
        print(f'best_mass={mass.numerator}/{mass.denominator}')
        print(f'best_mass_decimal={float(mass):.15f}')
        print(f'best_ratio={ratio.numerator}/{ratio.denominator}')
        print(f'best_ratio_decimal={float(ratio):.15f}')
        print(f'best_companion_start={start.numerator}/{start.denominator}')
        print(f'best_word={",".join(map(str, row["word"]))}')
    print("BELLMAN REPRESENTATIVE FINITE CERTIFICATE PASSED")


if __name__ == "__main__":
    main()
