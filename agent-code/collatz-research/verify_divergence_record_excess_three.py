#!/usr/bin/env python3
"""Exact certificate for the excess-three inverse decoder classification.

For a fixed positive odd terminal state r, an accelerated inverse word
E=(e_1,...,e_h) has excess sum(e_i)-h.  This program compares four explicit
valuation families for excess three against an independent exhaustive reverse
search.  Only Python integer arithmetic is used.
"""

from __future__ import annotations

from collections import Counter
from dataclasses import dataclass


def v3(value: int) -> int:
    assert value > 0
    valuation = 0
    while value % 3 == 0:
        value //= 3
        valuation += 1
    return valuation


def accelerated_step(value: int) -> tuple[int, int]:
    numerator = 3 * value + 1
    exponent = (numerator & -numerator).bit_length() - 1
    return numerator >> exponent, exponent


def reverse_step(terminal: int, exponent: int) -> int | None:
    numerator = (1 << exponent) * terminal - 1
    if numerator % 3:
        return None
    predecessor = numerator // 3
    if predecessor <= 0 or predecessor % 2 == 0:
        return None
    return predecessor


@dataclass(frozen=True)
class Branch:
    family: str
    word: tuple[int, ...]
    start: int


def check_branch(branch: Branch, terminal: int) -> None:
    state = branch.start
    assert sum(branch.word) - len(branch.word) == 3
    for expected_exponent in branch.word:
        state, exponent = accelerated_step(state)
        assert exponent == expected_exponent, (branch, expected_exponent, exponent)
    assert state == terminal, (branch, terminal, state)


def predicted_branches(terminal: int) -> set[Branch]:
    """Return the four valuation families predicted by the theorem."""
    shifted = terminal + 1
    b0 = v3(shifted)
    s0 = shifted // 3**b0
    branches: set[Branch] = set()

    # Family I: one exponent four, forced at the first even-parity junction.
    q4 = (1 << (b0 + 3)) * s0 - 7
    c4 = v3(q4)
    for j in range(1, c4 + 1):
        numerator = (1 << j) * q4
        denominator = 3**j
        assert numerator % denominator == 0
        start_shifted = numerator // denominator
        branches.add(Branch("one-four", (1,) * (j - 1) + (4,) + (1,) * b0, start_shifted - 1))

    # Family IIa: an exponent three inside the initial one-run, followed by
    # the forced exponent two at the next junction.
    for k in range(b0):
        m = (1 << (k + 2)) * 3 ** (b0 - k - 1) * s0 - 1
        c = v3(m)
        unit = m // 3**c
        p = (1 << (c + 2)) * unit - 1
        d = v3(p)
        for j in range(1, d + 1):
            numerator = (1 << j) * p
            denominator = 3**j
            assert numerator % denominator == 0
            start_shifted = numerator // denominator
            word = (1,) * (j - 1) + (2,) + (1,) * c + (3,) + (1,) * k
            branches.add(Branch("three-then-two", word, start_shifted - 1))

    # The minimal first junction has an exponent-two inverse exactly when
    # N1 is divisible by three.
    n1 = (1 << (b0 + 1)) * s0 - 1
    b1 = v3(n1)
    if b1 >= 1:
        s1 = n1 // 3**b1

        # Family IIb: first take the forced exponent two, then branch with an
        # exponent three inside the following one-run.
        for k in range(b1 - 1):
            m = (1 << (k + 3)) * 3 ** (b1 - k - 2) * s1 - 1
            c = v3(m)
            for ell in range(c + 1):
                numerator = 2 * (1 << ell) * m
                denominator = 3**ell
                assert numerator % denominator == 0
                start_shifted = numerator // denominator
                word = (1,) * ell + (3,) + (1,) * k + (2,) + (1,) * b0
                branches.add(Branch("two-then-three", word, start_shifted - 1))

        # Family III: three successive exponent-two junctions.
        n2 = (1 << (b1 + 1)) * s1 - 1
        b2 = v3(n2)
        if b2 >= 1:
            s2 = n2 // 3**b2
            n3 = (1 << (b2 + 1)) * s2 - 1
            b3 = v3(n3)
            for j in range(1, b3 + 1):
                numerator = (1 << j) * n3
                denominator = 3**j
                assert numerator % denominator == 0
                start_shifted = numerator // denominator
                word = (
                    (1,) * (j - 1)
                    + (2,)
                    + (1,) * (b2 - 1)
                    + (2,)
                    + (1,) * (b1 - 1)
                    + (2,)
                    + (1,) * b0
                )
                branches.add(Branch("three-twos", word, start_shifted - 1))

    for branch in branches:
        check_branch(branch, terminal)
    return branches


def exhaustive_branches(terminal: int, target_excess: int = 3) -> set[tuple[tuple[int, ...], int]]:
    """Exhaust all reverse words with the specified total excess.

    At a state congruent to 2 modulo 3, inverse exponents are odd and their
    excess costs are even.  At a state congruent to 1 modulo 3, inverse
    exponents are even and their excess costs are odd.  A zero-cost exponent
    one strictly lowers v_3(x+1), so this recursion is finite.
    """
    found: set[tuple[tuple[int, ...], int]] = set()

    def visit(state: int, remaining: int, reverse_word: tuple[int, ...]) -> None:
        residue = state % 3
        if residue == 0:
            return
        first_exponent = 1 if residue == 2 else 2
        exponent = first_exponent
        while exponent - 1 <= remaining:
            predecessor = reverse_step(state, exponent)
            assert predecessor is not None
            cost = exponent - 1
            next_word = reverse_word + (exponent,)
            next_remaining = remaining - cost
            if next_remaining == 0:
                found.add((tuple(reversed(next_word)), predecessor))
            visit(predecessor, next_remaining, next_word)
            exponent += 2

    visit(terminal, target_excess, ())
    return found


def verify_terminal(terminal: int) -> Counter[str]:
    predicted = predicted_branches(terminal)
    predicted_pairs = {(branch.word, branch.start) for branch in predicted}
    exhaustive = exhaustive_branches(terminal)
    assert predicted_pairs == exhaustive, (
        terminal,
        sorted(exhaustive - predicted_pairs),
        sorted(predicted_pairs - exhaustive),
    )
    return Counter(branch.family for branch in predicted)


def main() -> None:
    totals: Counter[str] = Counter()
    maximum_depth = (0, None)
    maximum_count = (0, None)
    for terminal in range(1, 100_002, 2):
        counts = verify_terminal(terminal)
        totals.update(counts)
        branches = predicted_branches(terminal)
        if branches:
            depth = max(len(branch.word) for branch in branches)
            if depth > maximum_depth[0]:
                maximum_depth = (depth, terminal)
            if len(branches) > maximum_count[0]:
                maximum_count = (len(branches), terminal)

    print("terminals_checked=50001")
    print(f"family_counts={dict(sorted(totals.items()))}")
    print(f"maximum_depth={maximum_depth}")
    print(f"maximum_branch_count={maximum_count}")
    print("EXCESS-THREE DECODER CERTIFICATE PASSED")


if __name__ == "__main__":
    main()
