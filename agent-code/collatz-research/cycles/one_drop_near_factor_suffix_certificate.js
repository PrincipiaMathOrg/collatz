"use strict";

/*
 * Exact certificate for cycle_one_drop_near_factor_resultant_no_go.md.
 *
 * Everything below uses BigInt.  No floating-point comparison enters any
 * assertion.
 */

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function pow(base, exponent) {
  return base ** BigInt(exponent);
}

function valuationSum(word) {
  return word.reduce((sum, letter) => sum + letter, 0);
}

function carry(word) {
  let answer = 0n;
  let prefix = 0;
  const length = word.length;
  for (let i = 0; i < length; ++i) {
    answer += pow(3n, length - 1 - i) * pow(2n, prefix);
    prefix += word[i];
  }
  return answer;
}

function concatenateCarry(left, right) {
  return pow(3n, right.length) * carry(left)
       + pow(2n, valuationSum(left)) * carry(right);
}

function prefixSums(word) {
  const answer = [];
  let sum = 0;
  for (const letter of word) {
    answer.push(sum);
    sum += letter;
  }
  return answer;
}

function prefixDifferenceExpansion(left, right) {
  assert(left.length === right.length, "prefix expansion length mismatch");
  const leftPrefix = prefixSums(left);
  const rightPrefix = prefixSums(right);
  let answer = 0n;
  for (let i = 0; i < left.length; ++i) {
    answer += pow(3n, left.length - 1 - i)
            * (pow(2n, leftPrefix[i]) - pow(2n, rightPrefix[i]));
  }
  return answer;
}

function orderTwo(number) {
  assert(number > 0n, "orderTwo expects a positive integer");
  let value = number;
  let answer = 0;
  while ((value & 1n) === 0n) {
    value >>= 1n;
    ++answer;
  }
  return answer;
}

// Phi determines exactly the first length - 1 letters.
function decodeVisiblePrefix(phi, length) {
  const answer = [];
  let current = phi;
  let remaining = length;
  while (remaining > 1) {
    const firstTerm = pow(3n, remaining - 1);
    const difference = current - firstTerm;
    assert(difference > 0n, "decoder difference must be positive");
    const firstLetter = orderTwo(difference);
    answer.push(firstLetter);
    current = difference / pow(2n, firstLetter);
    --remaining;
  }
  assert(current === 1n, "decoder must end at the one-letter carry");
  return answer;
}

function binaryWords(length) {
  const answer = [];
  const count = 1 << length;
  for (let mask = 0; mask < count; ++mask) {
    const word = [];
    for (let i = 0; i < length; ++i) {
      word.push(((mask >> i) & 1) === 0 ? 1 : 2);
    }
    answer.push(word);
  }
  return answer;
}

function hamming(left, right) {
  assert(left.length === right.length, "Hamming length mismatch");
  let answer = 0;
  for (let i = 0; i < left.length; ++i) {
    if (left[i] !== right[i]) {
      ++answer;
    }
  }
  return answer;
}

function sameArray(left, right) {
  return left.length === right.length
      && left.every((value, index) => value === right[index]);
}

function cyclicFactor(word, start, length) {
  const answer = [];
  for (let i = 0; i < length; ++i) {
    answer.push(word[(start + i) % word.length]);
  }
  return answer;
}

function containsCyclicIndex(start, length, index, modulus) {
  for (let i = 0; i < length; ++i) {
    if ((start + i) % modulus === index) {
      return true;
    }
  }
  return false;
}

function nonzeroPrefixDebtCount(left, right) {
  const leftPrefix = prefixSums(left);
  const rightPrefix = prefixSums(right);
  let answer = 0;
  for (let i = 0; i < left.length; ++i) {
    if (leftPrefix[i] !== rightPrefix[i]) {
      ++answer;
    }
  }
  return answer;
}

let concatenationChecks = 0;
for (let leftLength = 1; leftLength <= 5; ++leftLength) {
  for (let rightLength = 1; rightLength <= 5; ++rightLength) {
    for (const left of binaryWords(leftLength)) {
      for (const right of binaryWords(rightLength)) {
        assert(
          carry(left.concat(right)) === concatenateCarry(left, right),
          "concatenation identity failed"
        );
        ++concatenationChecks;
      }
    }
  }
}

const pairChecks = {2: 0, 3: 0, 4: 0};
let decoderChecks = 0;
for (let length = 1; length <= 10; ++length) {
  const words = binaryWords(length);
  const carries = words.map(carry);
  const upperBound = pow(4n, length) - pow(3n, length);

  for (let index = 0; index < words.length; ++index) {
    const word = words[index];
    const phi = carries[index];
    assert(phi > 0n && phi <= upperBound, "binary carry bound failed");
    assert(
      sameArray(decodeVisiblePrefix(phi, length), word.slice(0, -1)),
      "visible-prefix decoder failed"
    );
    ++decoderChecks;
  }

  for (let first = 0; first < words.length; ++first) {
    for (let second = first + 1; second < words.length; ++second) {
      const distance = hamming(words[first], words[second]);
      if (distance < 2 || distance > 4) {
        continue;
      }
      const difference = carries[first] - carries[second];
      assert(difference !== 0n, "distance at least two must change the carry");
      const absolute = difference < 0n ? -difference : difference;
      assert(absolute < pow(4n, length), "local difference size bound failed");
      const firstTotal = valuationSum(words[first]);
      const secondTotal = valuationSum(words[second]);
      const aligned =
        pow(2n, secondTotal) * carries[first]
        - pow(2n, firstTotal) * carries[second];
      const alignedAbsolute = aligned < 0n ? -aligned : aligned;
      assert(aligned !== 0n, "distinct words have zero aligned carry");
      assert(
        alignedAbsolute < pow(16n, length),
        "aligned local difference size bound failed"
      );
      assert(
        difference === prefixDifferenceExpansion(words[first], words[second]),
        "prefix-debt expansion failed"
      );
      ++pairChecks[distance];
    }
  }
}

const longLength = 64;
const longFamilies = {};

{
  const right = Array(longLength).fill(1);
  right[longLength - 1] = 2;
  const left = right.slice();
  left[0] = 2;
  left[longLength - 1] = 1;
  assert(hamming(left, right) === 2, "distance-two family mismatch");
  assert(
    nonzeroPrefixDebtCount(left, right) === longLength - 1,
    "distance-two support is not long"
  );
  assert(
    carry(left) - carry(right) === prefixDifferenceExpansion(left, right),
    "distance-two long expansion failed"
  );
  longFamilies[2] = nonzeroPrefixDebtCount(left, right);
}

{
  const right = Array(longLength).fill(1);
  right[longLength - 1] = 2;
  const left = right.slice();
  left[0] = 2;
  left[1] = 2;
  left[longLength - 1] = 1;
  assert(hamming(left, right) === 3, "distance-three family mismatch");
  assert(
    nonzeroPrefixDebtCount(left, right) === longLength - 1,
    "distance-three support is not long"
  );
  assert(
    carry(left) - carry(right) === prefixDifferenceExpansion(left, right),
    "distance-three long expansion failed"
  );
  longFamilies[3] = nonzeroPrefixDebtCount(left, right);
}

{
  const right = Array(longLength).fill(1);
  right[longLength - 2] = 2;
  right[longLength - 1] = 2;
  const left = right.slice();
  left[0] = 2;
  left[1] = 2;
  left[longLength - 2] = 1;
  left[longLength - 1] = 1;
  assert(hamming(left, right) === 4, "distance-four family mismatch");
  assert(
    nonzeroPrefixDebtCount(left, right) === longLength - 1,
    "distance-four support is not long"
  );
  assert(
    carry(left) - carry(right) === prefixDifferenceExpansion(left, right),
    "distance-four long expansion failed"
  );
  longFamilies[4] = nonzeroPrefixDebtCount(left, right);
}

let suffixPairChecks = 0;
let fullDifferenceChecks = 0;
for (let length = 4; length <= 9; ++length) {
  const terminalIndex = length - 1;
  const bodyCount = 1 << (length - 1);
  for (let mask = 0; mask < bodyCount; ++mask) {
    const fullWord = [];
    for (let i = 0; i < length - 1; ++i) {
      fullWord.push(((mask >> i) & 1) === 0 ? 1 : 2);
    }
    fullWord.push(5);

    for (let localLength = 1; localLength < length; ++localLength) {
      const complementLength = length - localLength;
      const starts = [];
      for (let start = 0; start < length; ++start) {
        if (!containsCyclicIndex(
          start, localLength, terminalIndex, length
        )) {
          starts.push(start);
        }
      }

      const records = starts.map((start) => {
        const local = cyclicFactor(fullWord, start, localLength);
        const suffix = cyclicFactor(
          fullWord, start + localLength, complementLength
        );
        const rotation = local.concat(suffix);
        const suffixTerm = pow(2n, valuationSum(local)) * carry(suffix);
        assert(
          carry(rotation)
            === pow(3n, complementLength) * carry(local) + suffixTerm,
          "full rotation concatenation failed"
        );
        return {start, local, suffix, rotation, suffixTerm};
      });

      for (let first = 0; first < records.length; ++first) {
        for (let second = first + 1; second < records.length; ++second) {
          const one = records[first];
          const two = records[second];
          assert(
            carry(one.suffix) !== carry(two.suffix),
            "distinct terminal positions have equal complement carries"
          );
          assert(
            one.suffixTerm !== two.suffixTerm,
            "distinct nonterminal starts cancelled their suffix terms"
          );

          const localDifference = carry(one.local) - carry(two.local);
          const suffixDifference = one.suffixTerm - two.suffixTerm;
          const fullDifference = carry(one.rotation) - carry(two.rotation);
          assert(
            fullDifference
              === pow(3n, complementLength) * localDifference
                 + suffixDifference,
            "full difference identity failed"
          );

          const oneTotal = valuationSum(one.local);
          const twoTotal = valuationSum(two.local);
          const alignedLocal =
            pow(2n, twoTotal) * carry(one.local)
            - pow(2n, oneTotal) * carry(two.local);
          const alignedFull =
            pow(2n, twoTotal) * carry(one.rotation)
            - pow(2n, oneTotal) * carry(two.rotation);
          const alignedSuffix =
            pow(2n, oneTotal + twoTotal)
            * (carry(one.suffix) - carry(two.suffix));
          assert(
            alignedFull
              === pow(3n, complementLength) * alignedLocal
                 + alignedSuffix,
            "aligned full difference identity failed"
          );
          ++suffixPairChecks;
          ++fullDifferenceChecks;
        }
      }
    }
  }
}

console.log(JSON.stringify({
  concatenationChecks,
  decoderChecks,
  pairChecks,
  longLength,
  longFamilies,
  suffixPairChecks,
  fullDifferenceChecks
}, null, 2));
console.log("one_drop_near_factor_suffix_certificate=PASS");
