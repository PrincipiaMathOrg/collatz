#!/usr/bin/env python3
"""Discover local inverse-word rewrites on the record-atom language.

This is a finite discovery probe, not a theorem.  For every concatenation
of the record atoms A=1, B=12, C=1113, D=1122 through a prescribed raw
depth, it computes the least dyadic representative and its endpoint.  It
then searches the exact reverse tree for a smaller positive predecessor.

When a witness is found, the longest common terminal exponent suffix is
removed from the original and alternative words.  The remaining pair is a
candidate local affine rewrite.  Repeated signatures are the useful output:
they can be checked symbolically on an entire cylinder rather than merely
at the sampled canonical representative.
"""

from argparse import ArgumentParser
from collections import Counter, defaultdict
from fractions import Fraction


ATOMS = {
    "A": (1,),
    "B": (1, 2),
    "C": (1, 1, 1, 3),
    "D": (1, 1, 2, 2),
}


def carry(word: tuple[int, ...]) -> int:
    depth = len(word)
    prefix_mass = 0
    value = 0
    for index, exponent in enumerate(word):
        value += 3 ** (depth - index - 1) * 2**prefix_mass
        prefix_mass += exponent
    return value


def canonical_seed_and_endpoint(word: tuple[int, ...]) -> tuple[int, int]:
    depth = len(word)
    mass = sum(word)
    value = carry(word)
    modulus = 2 ** (mass + 1)
    seed = (2**mass - value) * pow(3**depth, -1, modulus) % modulus
    assert seed > 0 and seed % 2 == 1
    endpoint_numerator = 3**depth * seed + value
    assert endpoint_numerator % 2**mass == 0
    endpoint = endpoint_numerator // 2**mass
    assert endpoint > 0 and endpoint % 2 == 1
    return seed, endpoint


def reverse_exponents(target: int):
    if target % 3 == 0:
        return
    exponent = 1 if target % 3 == 2 else 2
    while True:
        predecessor = ((1 << exponent) * target - 1) // 3
        yield exponent, predecessor
        exponent += 2


def smaller_predecessor(
    endpoint: int, seed: int, maximum_depth: int
) -> tuple[int, int, tuple[int, ...]] | None:
    """Return the first exact smaller predecessor and its forward word."""
    states: dict[int, tuple[int, ...]] = {endpoint: ()}
    for depth in range(1, maximum_depth + 1):
        remaining = maximum_depth - depth
        numerator = 3**remaining * (seed + 1)
        denominator = 2**remaining
        largest_live_state = (numerator - 1) // denominator - 1
        next_states: dict[int, tuple[int, ...]] = {}

        for target, suffix in states.items():
            for exponent, predecessor in reverse_exponents(target):
                if predecessor > largest_live_state:
                    break
                if predecessor <= 0:
                    continue
                word = (exponent,) + suffix
                if predecessor < seed:
                    return depth, predecessor, word
                if predecessor % 3 != 0 and predecessor not in next_states:
                    next_states[predecessor] = word

        states = next_states
        if not states:
            break
    return None


def common_suffix_length(left: tuple[int, ...], right: tuple[int, ...]) -> int:
    length = 0
    while (
        length < len(left)
        and length < len(right)
        and left[-length - 1] == right[-length - 1]
    ):
        length += 1
    return length


def word_text(word: tuple[int, ...]) -> str:
    return "".join(map(str, word)) or "epsilon"


def shifted_carry(word: tuple[int, ...]) -> int:
    return carry(word) + 2 ** sum(word) - 3 ** len(word)


def affine_rewrite(
    source: tuple[int, ...], alternative: tuple[int, ...]
) -> tuple[Fraction, Fraction]:
    """Return Z = slope * X + intercept in shifted coordinates."""
    source_scale = Fraction(3 ** len(source), 2 ** sum(source))
    source_offset = Fraction(shifted_carry(source), 2 ** sum(source))
    alternative_scale = Fraction(
        3 ** len(alternative), 2 ** sum(alternative)
    )
    alternative_offset = Fraction(
        shifted_carry(alternative), 2 ** sum(alternative)
    )
    return (
        source_scale / alternative_scale,
        (source_offset - alternative_offset) / alternative_scale,
    )


def atom_words(maximum_raw_depth: int):
    def visit(names: tuple[str, ...], word: tuple[int, ...]):
        if word:
            yield names, word
        for name, atom in ATOMS.items():
            extended = word + atom
            if len(extended) <= maximum_raw_depth:
                yield from visit(names + (name,), extended)

    yield from visit((), ())


def main() -> None:
    parser = ArgumentParser()
    parser.add_argument("--raw-depth", type=int, default=14)
    parser.add_argument("--extra-depth", type=int, default=8)
    parser.add_argument("--top", type=int, default=40)
    args = parser.parse_args()

    totals = Counter()
    signatures = Counter()
    signature_examples: dict[
        tuple[tuple[int, ...], tuple[int, ...]], tuple[object, ...]
    ] = {}
    survivor_prefixes = Counter()
    survivor_suffixes = Counter()
    depth_offsets = Counter()
    source_atom_outcomes = defaultdict(Counter)
    terminal_atom_outcomes = defaultdict(Counter)
    survivor_examples = defaultdict(list)

    for names, source_word in atom_words(args.raw_depth):
        raw_depth = len(source_word)
        seed, endpoint = canonical_seed_and_endpoint(source_word)
        witness = smaller_predecessor(
            endpoint, seed, raw_depth + args.extra_depth
        )
        totals["words"] += 1
        totals[f"words_depth_{raw_depth}"] += 1

        first_non_a = next((name for name in names if name != "A"), "A-only")
        if witness is None:
            totals["survivors"] += 1
            source_atom_outcomes[first_non_a]["survive"] += 1
            terminal_atom_outcomes[names[-1]]["survive"] += 1
            survivor_prefixes["".join(names[:3])] += 1
            survivor_suffixes["".join(names[-3:])] += 1
            if len(survivor_examples[names[-1]]) < 20:
                survivor_examples[names[-1]].append(
                    ("".join(names), seed, endpoint, word_text(source_word))
                )
            continue

        witness_depth, predecessor, alternative_word = witness
        totals["witnesses"] += 1
        source_atom_outcomes[first_non_a]["witness"] += 1
        terminal_atom_outcomes[names[-1]]["witness"] += 1
        depth_offsets[witness_depth - raw_depth] += 1
        suffix_length = common_suffix_length(source_word, alternative_word)
        if suffix_length:
            source_prefix = source_word[:-suffix_length]
            alternative_prefix = alternative_word[:-suffix_length]
        else:
            source_prefix = source_word
            alternative_prefix = alternative_word
        signature = (source_prefix, alternative_prefix)
        signatures[signature] += 1
        signature_examples.setdefault(
            signature,
            (
                "".join(names),
                seed,
                endpoint,
                predecessor,
                witness_depth,
                suffix_length,
                source_word,
                alternative_word,
            ),
        )

    print(f'raw_depth={args.raw_depth}')
    print(f'extra_depth={args.extra_depth}')
    print(f'total_words={totals["words"]}')
    print(f'witnesses={totals["witnesses"]}')
    print(f'survivors={totals["survivors"]}')
    print("depth_offsets=" + repr(dict(sorted(depth_offsets.items()))))
    print("first_non_A_outcomes")
    for atom, counts in sorted(source_atom_outcomes.items()):
        print(atom, dict(counts))
    print("terminal_atom_outcomes")
    for atom, counts in sorted(terminal_atom_outcomes.items()):
        print(atom, dict(counts))
    print("survivor_examples_by_terminal_atom")
    for atom, rows in sorted(survivor_examples.items()):
        print(atom, rows)

    print("top_rewrite_signatures")
    for signature, count in signatures.most_common(args.top):
        source_prefix, alternative_prefix = signature
        example = signature_examples[signature]
        slope, intercept = affine_rewrite(
            source_prefix, alternative_prefix
        )
        print(
            f"count={count} rewrite={word_text(source_prefix)}=>"
            f"{word_text(alternative_prefix)} "
            f"slope={slope.numerator}/{slope.denominator} "
            f"intercept={intercept.numerator}/{intercept.denominator} "
            f"example_atoms={example[0]} "
            f"seed={example[1]} endpoint={example[2]} smaller={example[3]} "
            f"alternative_depth={example[4]} common_suffix={example[5]} "
            f"source={word_text(example[6])} "
            f"alternative={word_text(example[7])}"
        )

    print("top_survivor_atom_prefixes")
    for prefix, count in survivor_prefixes.most_common(20):
        print(prefix or "epsilon", count)
    print("top_survivor_atom_suffixes")
    for suffix, count in survivor_suffixes.most_common(20):
        print(suffix or "epsilon", count)
    print("REWRITE DISCOVERY PROBE COMPLETE")


if __name__ == "__main__":
    main()
