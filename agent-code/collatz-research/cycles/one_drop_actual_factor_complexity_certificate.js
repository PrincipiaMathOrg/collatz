#!/usr/bin/env node
"use strict";

// Exact audit for the actual-factor complexity lemma.  All unbounded
// arithmetic is represented by BigInt.

function pow2(k) { return 1n << BigInt(k); }
function pow3(k) { return 3n ** BigInt(k); }
function floorDiv(a, b) { return a / b; }

function inverseMod(a, modulus) {
  let oldR = ((a % modulus) + modulus) % modulus;
  let r = modulus;
  let oldS = 1n;
  let s = 0n;
  while (r !== 0n) {
    const q = oldR / r;
    [oldR, r] = [r, oldR - q * r];
    [oldS, s] = [s, oldS - q * s];
  }
  if (oldR !== 1n) throw new Error("inverse does not exist");
  return ((oldS % modulus) + modulus) % modulus;
}

function v2(n) {
  let value = 0;
  while (n % 2n === 0n) {
    n /= 2n;
    ++value;
  }
  return value;
}

function parameters(r) {
  const P = pow3(r);
  const N = P.toString(2).length;
  const B = [];
  for (let j = 0; j <= r; ++j) B.push(Math.floor(j * N / r));
  const mechanical = [];
  const eligible = [];
  for (let j = 0; j < r; ++j) {
    const letter = B[j + 1] - B[j];
    mechanical.push(letter);
    if (j < r - 1 && letter === 2) eligible.push(j);
  }
  if (mechanical[r - 1] !== 2) throw new Error("terminal baseline letter");
  if (eligible.length !== N - r - 1) throw new Error("eligible count");
  return {N, B, mechanical, eligible};
}

function cyclicFactor(word, start, length) {
  const factor = [];
  for (let k = 0; k < length; ++k) {
    factor.push(word[(start + k) % word.length]);
  }
  return factor;
}

function factorKey(factor) { return factor.join(","); }

function auditDifferenceLemma(factor) {
  const L = factor.length;
  let E = 0;
  let carry = 0n;
  for (let i = 0; i < L; ++i) {
    carry = 3n * carry + pow2(E);
    E += factor[i];
  }
  const modulus = pow2(E + 1);
  const rawResidue = (pow2(E) - carry) *
    inverseMod(pow3(L), modulus);
  const residue = ((rawResidue % modulus) + modulus) % modulus;
  const y0 = residue === 0n ? modulus : residue;
  const y1 = y0 + modulus;

  function iterate(y) {
    let z = y;
    for (const exponent of factor) {
      const numerator = 3n * z + 1n;
      if (v2(numerator) !== exponent) throw new Error("factor valuation");
      z = numerator / pow2(exponent);
    }
    return z;
  }

  if (y0 % 2n !== 1n || y1 % 2n !== 1n) {
    throw new Error("odd factor starts");
  }
  const z0 = iterate(y0);
  const z1 = iterate(y1);
  if (y1 - y0 !== pow2(E + 1)) throw new Error("start difference");
  if (z1 - z0 !== 2n * pow3(L)) throw new Error("endpoint difference");
}

const maxR = Number(process.argv[2] || 20);
let profiles = 0n;
let factorRows = 0n;
let differenceAudits = 0n;
let maximumTerminalTypes = 0;
let minimumComplexitySlack = null;
let minimumMeanCostSlack = null;
const auditedWords = new Set();

for (let r = 3; r <= maxR; ++r) {
  const datum = parameters(r);
  if (datum.eligible.length >= 31) throw new Error("mask cutoff");
  const masks = 2 ** datum.eligible.length;
  for (let mask = 1; mask < masks; ++mask) {
    const omissions = [];
    for (let i = 0; i < datum.eligible.length; ++i) {
      if ((mask & 2 ** i) !== 0) omissions.push(datum.eligible[i]);
    }
    const omissionSet = new Set(omissions);
    const U = omissions.length;
    const word = datum.mechanical.slice();
    for (const j of omissions) word[j] = 1;
    word[r - 1] = U + 2;
    ++profiles;

    for (let L = 1; L < r; ++L) {
      const allTypes = new Set();
      const terminalTypes = new Set();
      const nonterminalTypes = new Set();
      const unaffectedBaselineTypes = new Set();
      const representativeCost = new Map();
      let affectedStarts = 0;
      let omissionIncidences = 0;

      for (let start = 0; start < r; ++start) {
        const actual = cyclicFactor(word, start, L);
        const key = factorKey(actual);
        allTypes.add(key);
        const containsTerminal = Array.from({length: L}, (unused, k) =>
          (start + k) % r).includes(r - 1);
        if (containsTerminal) {
          terminalTypes.add(key);
          continue;
        }

        nonterminalTypes.add(key);
        let cost = 0;
        for (let k = 0; k < L; ++k) {
          if (omissionSet.has(start + k)) {
            ++cost;
            ++omissionIncidences;
          }
        }
        const oldCost = representativeCost.get(key);
        if (oldCost === undefined || cost < oldCost) {
          representativeCost.set(key, cost);
        }
        if (cost > 0) {
          ++affectedStarts;
        } else {
          unaffectedBaselineTypes.add(factorKey(
            datum.mechanical.slice(start, start + L)));
        }
      }

      if (terminalTypes.size !== L) throw new Error("terminal factor count");
      if (unaffectedBaselineTypes.size > L + 1) {
        throw new Error("mechanical factor complexity");
      }
      if (affectedStarts > U * L || omissionIncidences > U * L) {
        throw new Error("omission incidence bound");
      }
      if (nonterminalTypes.size > L + 1 + U * L) {
        throw new Error("nonterminal complexity bound");
      }

      const baselineTypes = new Map();
      for (let start = 0; start < r; ++start) {
        const factor = cyclicFactor(datum.mechanical, start, L);
        baselineTypes.set(factorKey(factor), factor);
      }
      let oneDeletionEncodings = 0;
      for (const factor of baselineTypes.values()) {
        oneDeletionEncodings += factor.filter(value => value === 2).length;
      }
      let totalRepresentativeCost = 0;
      let zeroCostTypes = 0;
      let oneCostTypes = 0;
      for (const cost of representativeCost.values()) {
        totalRepresentativeCost += cost;
        if (cost === 0) ++zeroCostTypes;
        if (cost === 1) ++oneCostTypes;
      }
      if (totalRepresentativeCost > U * L) {
        throw new Error("representative omission budget");
      }
      if (zeroCostTypes > L + 1) throw new Error("zero-cost capacity");
      if (oneCostTypes > oneDeletionEncodings) {
        throw new Error("one-cost encoding capacity");
      }
      const twiceMeanCostBound =
        4 * L + 2 + U * L + oneDeletionEncodings;
      if (2 * allTypes.size > twiceMeanCostBound) {
        throw new Error("mean-cost cyclic complexity bound");
      }
      const meanCostSlack = twiceMeanCostBound - 2 * allTypes.size;
      if (minimumMeanCostSlack === null ||
          meanCostSlack < minimumMeanCostSlack) {
        minimumMeanCostSlack = meanCostSlack;
      }
      const complexityBound = (U + 2) * L + 1;
      if (allTypes.size > complexityBound) {
        throw new Error("cyclic complexity bound");
      }
      maximumTerminalTypes = Math.max(maximumTerminalTypes,
        terminalTypes.size);
      const slack = complexityBound - allTypes.size;
      if (minimumComplexitySlack === null || slack < minimumComplexitySlack) {
        minimumComplexitySlack = slack;
      }
      ++factorRows;

      for (const key of nonterminalTypes) {
        if (!auditedWords.has(key)) {
          auditedWords.add(key);
          auditDifferenceLemma(key.split(",").map(Number));
          ++differenceAudits;
        }
      }
    }
  }
}

// Exact constants for the factor-complexity rise barrier.  The minimal
// collision length is floor((U+h-1)/alpha)+1.
const r0 = 72057431991n;
const r1 = r0 + 10000n;
const u0 = 408125n;
const alphaPower = 3n ** 1000000n;
if (!(alphaPower > pow2(1584962))) {
  throw new Error("alpha lower bound");
}
if (!(alphaPower < pow2(1584963))) {
  throw new Error("alpha upper bound");
}
if (!(1220n ** 1000n < pow2(10253))) {
  throw new Error("log2(1220) upper bound");
}
if (!(r0 ** 2000n < pow2(72137))) {
  throw new Error("log2(r0) upper bound");
}
const envelopeNumerator0 = 10520651n;
const envelopeNumerator1 = 10520671n;
const envelopeDenominator = 20000n;
const alphaLowerNumerator = 1584962n;
const alphaLowerDenominator = 1000000n;
const gammaUpperNumerator = 584963n;
const gammaUpperDenominator = 1000000n;

const collisionUpperAtBase = floorDiv(
  alphaLowerDenominator *
    ((u0 - 1n) * envelopeDenominator + envelopeNumerator0),
  alphaLowerNumerator * envelopeDenominator
) + 1n;
if (collisionUpperAtBase !== 257830n) {
  throw new Error("base collision length");
}

function discreteCapacityGap(r, U, L) {
  const denominator = gammaUpperDenominator * r;
  const upperCapacity =
    (U * L + 5n * L + 3n) * denominator +
    gammaUpperNumerator * L * (L + 1n) * r +
    gammaUpperDenominator * L * (L + 1n);
  return {
    numerator: 2n * r * denominator - upperCapacity,
    denominator,
  };
}

const baseGap = discreteCapacityGap(r0, u0, collisionUpperAtBase);
if (baseGap.numerator !== 26962017302734278048910n) {
  throw new Error("base discrete capacity gap");
}

// At r1 use the continuous upper length
// 1+(U-1+H1)/alphaLower.  Its normalized capacity then decreases.
const lambdaDenominator =
  alphaLowerNumerator * envelopeDenominator;
const lambdaNumerator =
  alphaLowerDenominator *
    ((u0 - 1n) * envelopeDenominator + envelopeNumerator1) +
  lambdaDenominator;
const continuousDenominator = lambdaDenominator * lambdaDenominator *
  gammaUpperDenominator * r1;
const continuousCapacityNumerator =
  u0 * lambdaNumerator * lambdaDenominator *
    gammaUpperDenominator * r1 +
  gammaUpperNumerator * lambdaNumerator *
    (lambdaNumerator + lambdaDenominator) * r1 +
  gammaUpperDenominator * lambdaNumerator *
    (lambdaNumerator + lambdaDenominator) +
  5n * lambdaNumerator * lambdaDenominator *
    gammaUpperDenominator * r1 +
  3n * lambdaDenominator * lambdaDenominator *
    gammaUpperDenominator * r1;
const continuousGap = 2n * r1 * continuousDenominator -
  continuousCapacityNumerator;
if (continuousGap !==
    459142264538367153378268421605158400000000n) {
  throw new Error("continuous propagation gap");
}

console.log(JSON.stringify({
  maxR,
  profiles: profiles.toString(),
  factorRows: factorRows.toString(),
  differenceAudits: differenceAudits.toString(),
  maximumTerminalTypes,
  minimumComplexitySlack,
  minimumMeanCostSlack,
  barrierExcludedThroughU: u0.toString(),
  baseCollisionLength: collisionUpperAtBase.toString(),
  baseCapacityGap: baseGap.numerator.toString(),
  continuousCapacityGap: continuousGap.toString(),
  status: "PASS"
}));
