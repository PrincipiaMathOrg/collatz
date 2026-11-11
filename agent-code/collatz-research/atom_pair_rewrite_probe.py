#!/usr/bin/env python3
"""Search uniform shorter inverse rewrites for pairs of record atoms.

If a source word has length L and dyadic cylinder modulus 2^(A+1), its
endpoint changes by 2*3^L when the source is raised by one cylinder lift.
An alternative exact word of depth m <= L therefore changes its start by
an integer multiple of its own cylinder modulus.  Hence an exact rewrite
found at the least source representative extends to every positive lift.
The affine slope decides whether descent is then uniform.

The script is a discovery probe.  Its displayed identities are exact
rational calculations, but a mathematical note must still state and prove
the cylinder-lift argument.
"""

from fractions import Fraction

from rewrite_discovery_probe import (
    ATOMS,
    affine_rewrite,
    canonical_seed_and_endpoint,
    smaller_predecessor,
    word_text,
)


def main() -> None:
    for first_name, first in ATOMS.items():
        for second_name, second in ATOMS.items():
            source = first + second
            seed, endpoint = canonical_seed_and_endpoint(source)
            witness = smaller_predecessor(endpoint, seed, len(source))
            if witness is None:
                print(
                    f"pair={first_name}{second_name} source={word_text(source)} "
                    f"seed={seed} endpoint={endpoint} rewrite=none"
                )
                continue

            depth, predecessor, alternative = witness
            slope, intercept = affine_rewrite(source, alternative)
            assert depth <= len(source)
            assert slope < 1
            assert predecessor < seed
            source_modulus = 2 ** (sum(source) + 1)
            alternative_lift = (
                2 ** (sum(alternative) + 1)
                * 3 ** (len(source) - len(alternative))
            )
            assert Fraction(alternative_lift, source_modulus) == slope
            print(
                f"pair={first_name}{second_name} source={word_text(source)} "
                f"seed={seed} endpoint={endpoint} "
                f"rewrite={word_text(alternative)} depth={depth} "
                f"smaller={predecessor} "
                f"slope={slope.numerator}/{slope.denominator} "
                f"intercept={intercept.numerator}/{intercept.denominator} "
                f"source_lift={source_modulus} "
                f"alternative_lift={alternative_lift}"
            )
    print("ATOM-PAIR REWRITE PROBE COMPLETE")


if __name__ == "__main__":
    main()
