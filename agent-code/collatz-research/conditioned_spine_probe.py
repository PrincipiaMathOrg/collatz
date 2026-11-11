#!/usr/bin/env python3
"""Conditioned low-excess and record-atom diagnostics.

This is a discovery probe, not an all-depth certificate.  It asks three
exact finite questions.

1. After conditioning on a target residue already represented by one
   low-excess word, how many prefix-persistent canonical representations
   remain?
2. How many finite record-atom words pass the same canonicality test?
3. How many record-atom words have no smaller positive predecessor through
   a bounded amount of additional inverse depth?

All orbit, carry, residue, and inverse-tree calculations use Python integers.
"""

from collections import Counter
from math import comb, floor, log2


ATOMS = {
    "A": (1,),
    "B": (1, 2),
    "C": (1, 1, 1, 3),
    "D": (1, 1, 2, 2),
}

RHO = log2(1.5)
MAXIMUM_RAW_DEPTH = 14
EXTRA_INVERSE_DEPTH = 8


def weak_compositions(length, total, prefix=()):
    if length == 1:
        yield prefix + (total,)
        return
    for first in range(total + 1):
        yield from weak_compositions(
            length - 1, total - first, prefix + (first,)
        )


def carry(word):
    depth = len(word)
    prefix_mass = 0
    value = 0
    for index, exponent in enumerate(word):
        value += 3 ** (depth - index - 1) * 2**prefix_mass
        prefix_mass += exponent
    return value


def word_target_data(excess_vector):
    word = tuple(1 + value for value in excess_vector)
    depth = len(word)
    mass = sum(word)
    modulus = 3**depth
    value = carry(word)
    residue = (
        (value % modulus)
        * pow(pow(2, mass, modulus), -1, modulus)
        % modulus
    )
    assert residue % 3 != 0
    return residue, mass, value


def canonical_tables(maximum_depth):
    """Choose minimum excess, then maximum carry, in each target fiber."""
    tables = [None]
    class_counts = [0]
    word_counts = [0]
    maximum_fibers = [0]
    for depth in range(1, maximum_depth + 1):
        cutoff = floor(RHO * depth)
        fibers = {}
        count = 0
        for total in range(cutoff + 1):
            for vector in weak_compositions(depth, total):
                residue, _, value = word_target_data(vector)
                fibers.setdefault(residue, []).append((total, value, vector))
                count += 1

        table = {}
        for residue, rows in fibers.items():
            # A smaller mass wins asymptotically.  At equal mass, a larger
            # carry gives the smaller inverse start.
            table[residue] = min(rows, key=lambda row: (row[0], -row[1]))[2]

        assert count == comb(depth + cutoff, cutoff)
        tables.append(table)
        class_counts.append(len(fibers))
        word_counts.append(count)
        maximum_fibers.append(max(len(rows) for rows in fibers.values()))
    return tables, word_counts, class_counts, maximum_fibers


def persistent_canonical_counts(tables, maximum_depth):
    survivors = [()]
    counts = []
    for depth in range(1, maximum_depth + 1):
        next_survivors = []
        cutoff = floor(RHO * depth)
        for prefix in survivors:
            remaining = cutoff - sum(prefix)
            for final_excess in range(remaining + 1):
                vector = prefix + (final_excess,)
                residue, _, _ = word_target_data(vector)
                if tables[depth].get(residue) == vector:
                    next_survivors.append(vector)
        survivors = next_survivors
        counts.append(len(survivors))
    return counts


def canonical_seed_and_endpoint(word):
    depth = len(word)
    mass = sum(word)
    value = carry(word)
    modulus = 2 ** (mass + 1)
    seed = (
        (2**mass - value)
        * pow(3**depth, -1, modulus)
        % modulus
    )
    if seed == 0:
        seed = modulus
    endpoint_numerator = 3**depth * seed + value
    assert endpoint_numerator % 2**mass == 0
    endpoint = endpoint_numerator // 2**mass
    assert seed > 0 and seed % 2 == 1
    assert endpoint > 0 and endpoint % 2 == 1
    return seed, endpoint


def prefix_persistent_canonical(word, tables):
    excess = tuple(exponent - 1 for exponent in word)
    for depth in range(1, len(word) + 1):
        prefix = excess[:depth]
        residue, _, _ = word_target_data(prefix)
        if tables[depth].get(residue) != prefix:
            return False
    return True


def smaller_predecessor_within(endpoint, seed, maximum_depth):
    """Find a smaller predecessor through at most maximum_depth steps.

    At a reverse state x with r steps left, every continuation z satisfies

        z+1 >= (2/3)^r (x+1).

    This gives the exact integer pruning bound used below.
    """
    states = {endpoint}
    for depth in range(1, maximum_depth + 1):
        remaining = maximum_depth - depth
        numerator = 3**remaining * (seed + 1)
        denominator = 2**remaining
        largest_live_state = (numerator - 1) // denominator - 1
        next_states = set()

        for target in states:
            if target % 3 == 0:
                continue
            exponent = 1 if target % 3 == 2 else 2
            while True:
                predecessor = (2**exponent * target - 1) // 3
                if predecessor > largest_live_state:
                    break
                if predecessor > 0:
                    if predecessor < seed:
                        return depth, predecessor
                    if predecessor % 3 != 0:
                        next_states.add(predecessor)
                exponent += 2

        states = next_states
        if not states:
            break
    return None


def record_atom_diagnostics(tables, maximum_raw_depth, extra_depth):
    totals = Counter()
    canonical = Counter()
    bounded_inverse_survivors = Counter()
    best_stable_run = 0
    best_stable_rows = []

    def visit(names, word, seeds, inverse_survival):
        nonlocal best_stable_run, best_stable_rows

        if word:
            raw_depth = len(word)
            seed, endpoint = canonical_seed_and_endpoint(word)
            totals[raw_depth] += 1

            if prefix_persistent_canonical(word, tables):
                canonical[raw_depth] += 1

            witness = smaller_predecessor_within(
                endpoint, seed, raw_depth + extra_depth
            )
            survives = witness is None
            if survives:
                bounded_inverse_survivors[raw_depth] += 1

                stable_run = 1
                while (
                    stable_run < len(seeds) + 1
                    and seeds[-stable_run] == seed
                    and inverse_survival[-stable_run]
                ):
                    stable_run += 1

                row = ("".join(names), seed, stable_run, raw_depth)
                if stable_run > best_stable_run:
                    best_stable_run = stable_run
                    best_stable_rows = [row]
                elif stable_run == best_stable_run:
                    best_stable_rows.append(row)

            seeds = seeds + [seed]
            inverse_survival = inverse_survival + [survives]

        for name, atom in ATOMS.items():
            extended = word + atom
            if len(extended) <= maximum_raw_depth:
                visit(names + (name,), extended, seeds, inverse_survival)

    visit((), (), [], [])
    return {
        "totals": totals,
        "canonical": canonical,
        "bounded_inverse_survivors": bounded_inverse_survivors,
        "best_stable_run": best_stable_run,
        "best_stable_rows": best_stable_rows,
    }


def main():
    tables, words, classes, maximum_fibers = canonical_tables(
        MAXIMUM_RAW_DEPTH
    )
    persistent = persistent_canonical_counts(tables, MAXIMUM_RAW_DEPTH)
    atoms = record_atom_diagnostics(
        tables, MAXIMUM_RAW_DEPTH, EXTRA_INVERSE_DEPTH
    )

    print(
        "depth critical_words residue_classes maximum_fiber "
        "persistent_canonical_spines"
    )
    for depth in range(1, MAXIMUM_RAW_DEPTH + 1):
        print(
            depth,
            words[depth],
            classes[depth],
            maximum_fibers[depth],
            persistent[depth - 1],
        )

    print(
        "raw_depth record_words canonical_record_words "
        "bounded_inverse_survivors"
    )
    for depth in sorted(atoms["totals"]):
        print(
            depth,
            atoms["totals"][depth],
            atoms["canonical"][depth],
            atoms["bounded_inverse_survivors"][depth],
        )

    print(f'best_stable_surviving_run={atoms["best_stable_run"]}')
    for row in atoms["best_stable_rows"]:
        print(
            f"stable_row word={row[0]} seed={row[1]} "
            f"atom_run={row[2]} raw_depth={row[3]}"
        )
    print("CONDITIONED-SPINE PROBE COMPLETE")


if __name__ == "__main__":
    main()
