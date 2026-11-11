#!/usr/bin/env python3
"""Exact certificate for divergence_inverse_entropy_barrier.md.

The integer comparisons, composition counts, endpoint residues, and small
coverage table are verified using Python integers.  Decimal arithmetic is
used only to print approximations after the exact inequalities have passed.
"""

from collections import Counter
from decimal import Decimal, getcontext
from math import comb, floor, log2


def weak_compositions(length, total, prefix=()):
    if length == 1:
        yield prefix + (total,)
        return
    for first in range(total + 1):
        yield from weak_compositions(
            length - 1, total - first, prefix + (first,)
        )


def target_residue(excess_vector):
    """Return 2^{-B} C(E) modulo 3^h for E_i=1+c_i."""
    depth = len(excess_vector)
    modulus = 3**depth
    prefix_mass = 0
    carry = 0
    for index, excess in enumerate(excess_vector):
        exponent = 1 + excess
        carry += (
            3 ** (depth - index - 1)
            * pow(2, prefix_mass, modulus)
        )
        prefix_mass += exponent
    carry %= modulus
    return carry * pow(pow(2, prefix_mass, modulus), -1, modulus) % modulus


def verify_exact_entropy_inequalities():
    # rho=log_2(3)-1 < 117/200.
    assert 3**200 < 2**317

    # H(117/200) < 3 after raising to the power 200.
    assert 317**317 < 3**200 * 200**200 * 117**117

    # The coarser fixed-window slope 3/5 also lies above rho, while its
    # composition entropy remains below log(3).
    assert 3**5 < 2**8
    assert 8**8 < 3**8 * 5**5


def verify_composition_identity(maximum_depth=13):
    rho = log2(1.5)
    rows = []
    for depth in range(1, maximum_depth + 1):
        cutoff = floor(rho * depth)
        counts = Counter()
        enumerated = 0
        for total in range(cutoff + 1):
            expected_layer = comb(depth + total - 1, total)
            layer_count = 0
            for vector in weak_compositions(depth, total):
                residue = target_residue(vector)
                assert residue % 3 != 0
                counts[residue] += 1
                enumerated += 1
                layer_count += 1
            assert layer_count == expected_layer

        expected_total = comb(depth + cutoff, cutoff)
        assert enumerated == expected_total
        unit_classes = 2 * 3 ** (depth - 1)
        rows.append(
            {
                "depth": depth,
                "cutoff": cutoff,
                "words": enumerated,
                "classes": len(counts),
                "unit_classes": unit_classes,
                "maximum_fiber": max(counts.values()),
            }
        )
    return rows


def decimal_constants():
    getcontext().prec = 60
    s_sharp = Decimal(117) / Decimal(200)
    lambda_sharp = (1 + s_sharp) ** (1 + s_sharp) / s_sharp**s_sharp
    s_window = Decimal(3) / Decimal(5)
    lambda_window = (1 + s_window) ** (1 + s_window) / s_window**s_window
    return lambda_sharp, lambda_window


def main():
    verify_exact_entropy_inequalities()
    rows = verify_composition_identity()
    lambda_sharp, lambda_window = decimal_constants()

    print(f"lambda_117_over_200={lambda_sharp}")
    print(f"lambda_3_over_5={lambda_window}")
    print("depth cutoff words classes coverage maximum_fiber")
    for row in rows:
        coverage = Decimal(row["classes"]) / Decimal(row["unit_classes"])
        print(
            f'{row["depth"]} {row["cutoff"]} {row["words"]} '
            f'{row["classes"]} {coverage:.12f} {row["maximum_fiber"]}'
        )
    print("INVERSE-ENTROPY BARRIER CERTIFICATE PASSED")


if __name__ == "__main__":
    main()
