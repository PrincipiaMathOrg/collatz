#!/usr/bin/env python3
"""Exact regression for the sharp shifted-carry rearrangement theorem."""

from __future__ import annotations

from itertools import combinations


def weak_compositions(total: int, length: int):
    """Yield all length-part weak compositions of total."""
    for bars in combinations(range(total + length - 1), length - 1):
        previous = -1
        parts = []
        for bar in bars + (total + length - 1,):
            parts.append(bar - previous - 1)
            previous = bar
        yield tuple(parts)


def carry(word: tuple[int, ...]) -> int:
    length = len(word)
    prefix = 0
    value = 0
    for index, exponent in enumerate(word):
        value += 3 ** (length - index - 1) * 2**prefix
        prefix += exponent
    return value


def shifted_carry(word: tuple[int, ...]) -> int:
    return carry(word) + 2 ** sum(word) - 3 ** len(word)


def verify_adjacent_exchange() -> None:
    for left_length in range(5):
        for right_length in range(5):
            left = (1, 2, 3, 1)[:left_length]
            right = (2, 1, 4, 1)[:right_length]
            for first in range(2, 9):
                for second in range(1, 9):
                    original = left + (first, second) + right
                    shifted = left + (first - 1, second + 1) + right
                    expected_drop = (
                        2 ** sum(left)
                        * 3**right_length
                        * 2 ** (first - 1)
                    )
                    assert shifted_carry(original) - shifted_carry(shifted) == expected_drop


def verify_extrema(max_length: int = 10, max_excess: int = 12) -> int:
    cases = 0
    for length in range(1, max_length + 1):
        for excess in range(max_excess + 1):
            observed = []
            words = []
            for parts in weak_compositions(excess, length):
                word = tuple(part + 1 for part in parts)
                words.append(word)
                observed.append(shifted_carry(word))
                cases += 1

            predicted_minimum = 2**length * (2**excess - 1)
            predicted_maximum = 2 * 3 ** (length - 1) * (2**excess - 1)
            assert min(observed) == predicted_minimum
            assert max(observed) == predicted_maximum

            minimum_words = {word for word, value in zip(words, observed) if value == predicted_minimum}
            maximum_words = {word for word, value in zip(words, observed) if value == predicted_maximum}
            if excess == 0 or length == 1:
                only_word = ((excess + 1,) if length == 1 else (1,) * length)
                assert minimum_words == {only_word}
                assert maximum_words == {only_word}
            else:
                assert minimum_words == {(1,) * (length - 1) + (excess + 1,)}
                assert maximum_words == {(excess + 1,) + (1,) * (length - 1)}
    return cases


def main() -> None:
    verify_adjacent_exchange()
    cases = verify_extrema()
    print(f"composition_cases_checked={cases}")
    print("SHARP PREFIX CARRY CERTIFICATE PASSED")


if __name__ == "__main__":
    main()
