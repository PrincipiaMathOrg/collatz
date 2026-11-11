#!/usr/bin/env node
"use strict";

// Exhaustive falsification scan for reduction from the full determinant to
// its base factor on strict-record one-strip words.  Finite evidence only.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function gcd(a, b) {
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

function gcdNumber(a, b) {
  while (b !== 0) [a, b] = [b, a % b];
  return Math.abs(a);
}

function bitLength(n) {
  return n.toString(2).length;
}

function v2(n) {
  let e = 0;
  while (n !== 0n && (n & 1n) === 0n) {
    n >>= 1n;
    ++e;
  }
  return e;
}

function properPower(word) {
  for (let d = 1; d < word.length; ++d) {
    if (word.length % d !== 0) continue;
    let same = true;
    for (let i = d; i < word.length; ++i) {
      if (word[i] !== word[i % d]) {
        same = false;
        break;
      }
    }
    if (same) return true;
  }
  return false;
}

const maximumR = Number(process.argv[2] || 20);
assert(Number.isInteger(maximumR) && maximumR >= 2,
  "maximum r must be an integer at least two");

const totals = {
  words: 0,
  primitiveWords: 0,
  baseFactorHits: 0,
  primitiveBaseFactorHits: 0,
  fullFactorHits: 0,
  primitiveFullFactorHits: 0,
  unequalBlockWeightHits: 0,
  primitiveNonrepeatedBaseHits: 0,
  primitiveSimpleBaseHits: 0,
  g2BaseHits: 0,
  g2AbsDifferenceAtLeastComplement: 0
};
let firstPrimitiveBaseHit = null;
let firstNontrivialPrimitiveBaseHit = null;
let firstLargeG2Difference = null;
let largestG = 0;
const rows = [];

for (let r = 2; r <= maximumR; ++r) {
  const P = 3n ** BigInt(r);
  const N = bitLength(P);
  const slopeGcd = gcdNumber(N, r);
  if (slopeGcd === 1) continue;

  const N0 = N / slopeGcd;
  const r0 = r / slopeGcd;
  const X = 1n << BigInt(N0);
  const Y = 3n ** BigInt(r0);
  const E = X - Y;
  const D = (1n << BigInt(N)) - P;
  const H = D / E;
  assert(E > 0n && D === E * H,
    "factorization failed at r=" + r);
  largestG = Math.max(largestG, slopeGcd);

  const powers3 = Array(r + 1);
  powers3[0] = 1n;
  for (let i = 1; i <= r; ++i) powers3[i] = 3n * powers3[i - 1];

  const row = {
    r, N, slopeGcd, N0, r0,
    E: E.toString(), H: H.toString(),
    words: 0, primitiveWords: 0,
    baseFactorHits: 0, primitiveBaseFactorHits: 0,
    fullFactorHits: 0
  };
  const word = Array(r).fill(0);

  function visit(position, prefix, carry) {
    if (position === r) {
      if (prefix !== N) return;
      ++totals.words;
      ++row.words;
      const isPower = properPower(word);
      if (!isPower) {
        ++totals.primitiveWords;
        ++row.primitiveWords;
      }

      const baseHit = carry % E === 0n;
      const fullHit = carry % D === 0n;
      if (baseHit) {
        ++totals.baseFactorHits;
        ++row.baseFactorHits;
        if (!isPower) {
          ++totals.primitiveBaseFactorHits;
          ++row.primitiveBaseFactorHits;
        }
      }
      if (fullHit) {
        ++totals.fullFactorHits;
        ++row.fullFactorHits;
        if (!isPower) ++totals.primitiveFullFactorHits;
      }
      if (!baseHit) return;

      const blockWeights = [];
      const blockCarries = [];
      let localWeight = 0;
      let localCarry = 0n;
      for (let i = 0; i < r; ++i) {
        if (i % r0 === 0) {
          localWeight = 0;
          localCarry = 0n;
        }
        localCarry = 3n * localCarry + (1n << BigInt(localWeight));
        localWeight += word[i];
        if (i % r0 === r0 - 1) {
          blockWeights.push(localWeight);
          blockCarries.push(localCarry);
        }
      }
      if (blockWeights.some(function(weight) { return weight !== N0; })) {
        ++totals.unequalBlockWeightHits;
      }

      const common = gcd(D, carry);
      const denominator = D / common;
      let numerator = carry / common;
      const boundaryStates = [numerator];
      const allStates = [numerator];
      for (let i = 0; i < r; ++i) {
        const next = 3n * numerator + denominator;
        assert(v2(next) === word[i],
          "valuation failure at r=" + r + ", word=" + word.join("."));
        numerator = next >> BigInt(word[i]);
        if (i + 1 < r) allStates.push(numerator);
        if ((i + 1) % r0 === 0 && i + 1 < r) {
          boundaryStates.push(numerator);
        }
      }
      assert(numerator === boundaryStates[0],
        "rational cycle failed to close at r=" + r);
      const repeatedBoundary =
        new Set(boundaryStates.map(String)).size !== boundaryStates.length;
      const repeatedState =
        new Set(allStates.map(String)).size !== allStates.length;
      if (!isPower && !repeatedBoundary) {
        ++totals.primitiveNonrepeatedBaseHits;
      }
      if (!isPower && !repeatedState) ++totals.primitiveSimpleBaseHits;

      const heights = [0];
      let blockPrefix = 0;
      for (let m = 0; m < slopeGcd; ++m) {
        blockPrefix += blockWeights[m];
        heights.push((m + 1) * N0 - blockPrefix);
      }
      assert(heights[heights.length - 1] === 0 &&
        heights.slice(0, -1).every(function(height) { return height >= 0; }),
        "strict-record block height failed at r=" + r);
      const maximumHeight = Math.max.apply(null, heights);
      const scaledStateNumerators = boundaryStates.map(function(state, m) {
        return state << BigInt(maximumHeight - heights[m]);
      });
      const scaledCarries = blockCarries.map(function(blockCarry, m) {
        return blockCarry << BigInt(maximumHeight - heights[m]);
      });
      let scaledCarrySum = 0n;
      let scaledStateSum = 0n;
      let weightedCarry = 0n;
      for (let m = 0; m < slopeGcd; ++m) {
        const next = (m + 1) % slopeGcd;
        assert(denominator * scaledCarries[m] ===
          X * scaledStateNumerators[next] - Y * scaledStateNumerators[m],
          "normalized block identity failed at r=" + r);
        scaledCarrySum += scaledCarries[m];
        scaledStateSum += scaledStateNumerators[m];
        weightedCarry += X ** BigInt(m) *
          Y ** BigInt(slopeGcd - 1 - m) * scaledCarries[m];
      }
      assert(denominator * scaledCarrySum === E * scaledStateSum,
        "base-factor telescoping failed at r=" + r);
      assert(scaledCarrySum % E === 0n,
        "base-factor divisibility failed after telescoping at r=" + r);
      assert(weightedCarry ===
        (1n << BigInt(maximumHeight)) * carry,
        "grouped full carry failed at r=" + r);

      if (!isPower && firstPrimitiveBaseHit === null) {
        firstPrimitiveBaseHit = {
          word: word.join("."),
          r, N, slopeGcd, N0, r0,
          E: E.toString(), H: H.toString(), D: D.toString(),
          carry: carry.toString(), denominator: denominator.toString(),
          blockWeights,
          blockCarries: blockCarries.map(String),
          boundaryNumerators: boundaryStates.map(String),
          allNumerators: allStates.map(String),
          repeatedBoundary,
          repeatedState
        };
      }
      if (E > 1n && !isPower && firstNontrivialPrimitiveBaseHit === null) {
        firstNontrivialPrimitiveBaseHit = {
          word: word.join("."),
          r, N, slopeGcd, N0, r0,
          E: E.toString(), H: H.toString(), D: D.toString(),
          carry: carry.toString(), denominator: denominator.toString(),
          blockWeights,
          blockCarries: blockCarries.map(String),
          boundaryNumerators: boundaryStates.map(String),
          allNumerators: allStates.map(String),
          repeatedBoundary,
          repeatedState
        };
      }

      if (slopeGcd === 2) {
        ++totals.g2BaseHits;
        const deficit = N0 - blockWeights[0];
        assert(deficit >= 0,
          "negative midpoint deficit at r=" + r);
        const plus = (1n << BigInt(deficit)) * blockCarries[0] +
          blockCarries[1];
        const minus = (1n << BigInt(deficit)) * blockCarries[0] -
          blockCarries[1];
        const complement = X + Y;
        assert(plus % E === 0n,
          "base-factor gate failed at r=" + r);
        assert(fullHit === (minus % complement === 0n),
          "complementary-factor gate failed at r=" + r);
        const absoluteMinus = minus < 0n ? -minus : minus;
        if (absoluteMinus >= complement) {
          ++totals.g2AbsDifferenceAtLeastComplement;
          if (firstLargeG2Difference === null) {
            firstLargeG2Difference = {
              word: word.join("."),
              r, N, N0, r0, deficit,
              E: E.toString(),
              complement: complement.toString(),
              plus: plus.toString(),
              minus: minus.toString(),
              absoluteMinus: absoluteMinus.toString(),
              baseHit,
              fullHit
            };
          }
        }
      }
      return;
    }

    const remaining = r - position - 1;
    const largest = N - prefix - remaining;
    for (let exponent = 1; exponent <= largest; ++exponent) {
      const nextPrefix = prefix + exponent;
      if (position < r - 1 &&
          (1n << BigInt(N - nextPrefix)) <= powers3[r - position - 1]) {
        continue;
      }
      word[position] = exponent;
      visit(position + 1, nextPrefix,
        3n * carry + (1n << BigInt(prefix)));
    }
  }

  // A nontrivial least-state cycle has first exponent one.
  word[0] = 1;
  if ((1n << BigInt(N - 1)) > powers3[r - 1]) {
    visit(1, 1, 1n);
  }
  rows.push(row);
}

// The one-strip repetition of the fixed point is retained as a regression.
const trivial = [2, 2];
let trivialCarry = 0n;
let trivialPrefix = 0;
for (const exponent of trivial) {
  trivialCarry = 3n * trivialCarry + (1n << BigInt(trivialPrefix));
  trivialPrefix += exponent;
}
assert(trivialCarry === (1n << 4n) - 3n ** 2n,
  "trivial q=1 regression failed");

console.log(JSON.stringify({
  certificate: "noncoprime slope exhaustive falsification scan",
  maximumR,
  rows,
  totals: Object.assign({largestG}, totals),
  firstPrimitiveBaseHit,
  firstNontrivialPrimitiveBaseHit,
  firstLargeG2Difference
}, null, 2));
