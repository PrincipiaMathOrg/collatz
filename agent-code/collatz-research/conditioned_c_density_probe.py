#!/usr/bin/env python3
"""Probe inverse-fiber survival as a function of record-atom C density.

All record-atom words of a fixed atom length are tested at their least
ordinary dyadic representative.  The exact reverse tree is searched through
a fixed number of additional accelerated levels, and outcomes are grouped by
the number of C atoms.  The purpose is to test whether repeated occurrences
of C reduce the conditioned survivor capacity even though a single-C prefix
language remains supercritical.

This is finite experimental evidence only.
"""

from argparse import ArgumentParser
from collections import Counter, defaultdict
from itertools import product

from rewrite_discovery_probe import (
    ATOMS,
    canonical_seed_and_endpoint,
    smaller_predecessor,
)


def main():
    parser = ArgumentParser()
    parser.add_argument("--atoms", type=int, default=6)
    parser.add_argument("--extra-depth", type=int, default=16)
    parser.add_argument("--samples", type=int, default=12)
    args = parser.parse_args()

    totals = Counter()
    offsets = defaultdict(Counter)
    survivor_samples = defaultdict(list)
    alphabet = tuple(ATOMS)

    for names in product(alphabet, repeat=args.atoms):
        word = tuple(exponent for name in names for exponent in ATOMS[name])
        seed, endpoint = canonical_seed_and_endpoint(word)
        c_count = names.count("C")
        result = smaller_predecessor(
            endpoint, seed, len(word) + args.extra_depth
        )
        totals[(c_count, "total")] += 1
        if result is None:
            totals[(c_count, "survivor")] += 1
            if len(survivor_samples[c_count]) < args.samples:
                survivor_samples[c_count].append(
                    ("".join(names), seed, endpoint)
                )
        else:
            depth, _, _ = result
            totals[(c_count, "witness")] += 1
            offsets[c_count][depth - len(word)] += 1

    for c_count in range(args.atoms + 1):
        total = totals[(c_count, "total")]
        survivor = totals[(c_count, "survivor")]
        if not total:
            continue
        print(
            f"C_count={c_count} total={total} "
            f"witness={totals[(c_count, 'witness')]} survivor={survivor} "
            f"survivor_fraction={survivor / total:.12f}"
        )
        print("  depth_offsets=" + repr(dict(sorted(offsets[c_count].items()))))
        if survivor_samples[c_count]:
            print("  survivor_samples=" + repr(survivor_samples[c_count]))

    print("CONDITIONED C-DENSITY PROBE COMPLETE")


if __name__ == "__main__":
    main()
