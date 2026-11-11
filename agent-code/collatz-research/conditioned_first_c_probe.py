#!/usr/bin/env python3
"""Measure variable-depth descent before the first record atom C.

For every R in {A,B,D}^d, the source word R C is placed at its least
ordinary dyadic representative.  We search the exact inverse tree of its
endpoint through L+H accelerated steps and record the first smaller positive
predecessor.  In the stabilized-spine reduction, a hypothetical least
unbounded seed is eventually exactly this least representative, so these are
the relevant conditioned fibers.

This is a finite discovery probe.  It measures whether adding inverse-depth
lag makes the first-C survivor language subcritical; it does not turn a
finite horizon into an all-depth theorem.
"""

from argparse import ArgumentParser
from collections import Counter, defaultdict
from itertools import product

from rewrite_discovery_probe import (
    ATOMS,
    canonical_seed_and_endpoint,
    smaller_predecessor,
    word_text,
)


PREFIX_ATOMS = ("A", "B", "D")


def main():
    parser = ArgumentParser()
    parser.add_argument("--min-atoms", type=int, default=0)
    parser.add_argument("--max-atoms", type=int, default=7)
    parser.add_argument("--extra-depth", type=int, default=20)
    parser.add_argument("--samples", type=int, default=16)
    args = parser.parse_args()

    for atom_depth in range(args.min_atoms, args.max_atoms + 1):
        counts = Counter()
        offsets = Counter()
        survivor_suffixes = defaultdict(Counter)
        survivors = []
        witnesses = []

        for names in product(PREFIX_ATOMS, repeat=atom_depth):
            source_names = names + ("C",)
            source = tuple(
                exponent
                for name in source_names
                for exponent in ATOMS[name]
            )
            seed, endpoint = canonical_seed_and_endpoint(source)
            result = smaller_predecessor(
                endpoint, seed, len(source) + args.extra_depth
            )
            counts["total"] += 1

            if result is None:
                counts["survivor"] += 1
                if len(survivors) < args.samples:
                    survivors.append(("".join(source_names), seed, endpoint))
                for width in range(1, min(6, len(names)) + 1):
                    survivor_suffixes[width]["".join(names[-width:])] += 1
                continue

            depth, predecessor, alternative = result
            counts["witness"] += 1
            offsets[depth - len(source)] += 1
            if len(witnesses) < args.samples:
                witnesses.append(
                    (
                        "".join(source_names),
                        seed,
                        predecessor,
                        depth - len(source),
                        word_text(alternative),
                    )
                )

        print(
            f"atom_depth={atom_depth} total={counts['total']} "
            f"witness={counts['witness']} survivor={counts['survivor']} "
            f"survivor_fraction={counts['survivor'] / counts['total']:.12f}"
        )
        print("  depth_offsets=" + repr(dict(sorted(offsets.items()))))
        if witnesses:
            print("  witness_samples=" + repr(witnesses))
        if survivors:
            print("  survivor_samples=" + repr(survivors))
        for width in range(1, 7):
            if survivor_suffixes[width]:
                print(
                    f"  survivor_suffix_width_{width}="
                    + repr(survivor_suffixes[width].most_common(15))
                )

    print("CONDITIONED FIRST-C PROBE COMPLETE")


if __name__ == "__main__":
    main()
