#!/usr/bin/env node
"use strict";

/*
Combinatorial probe for the endpoint-coefficient duality.

For a coprime binary deformation m_j in {0,1}, write c_j=[jN]_r and let
C={c_j:m_j=1}, c_*=max C.  The endpoint polynomial is

  H=(X-1) sum_{c in C} X^(c_*-c) - X^(c_*+1).

Because X-1 is a unit in Z[X]/(X^r-2), multiplying -H by its inverse
produces a positive digit vector d_k in {1,2}.  Put b_k=v_2(d_k).  If the
full determinant divides H, the integral quotient coefficients v_k obey

  2^g v_old = 3 v_new + d_new.

Since d_new divides v_new by parity, x_k=v_k/d_k obeys an ordinary
accelerated 3x+1 recurrence with exponents

  a^dual_j = g_j + b_[je]_r - b_[(j+1)e]_r.

This program asks the purely combinatorial question: does the map from m to
b preserve positivity/strict record, and does it decrease support, runs, or
transitions?  It does not assume determinant divisibility.
*/

const maxR = Number(process.argv[2] || 22);

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function gcd(a, b) {
  while (b !== 0) [a, b] = [b, a % b];
  return Math.abs(a);
}

function gcdBig(a, b) {
  if (a < 0n) a = -a;
  if (b < 0n) b = -b;
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

function bitLength(x) { return x.toString(2).length; }

function strictSuffixRecord(word, N) {
  const r = word.length;
  let prefix = 0;
  for (let i = 0; i < r; ++i) {
    if ((1n << BigInt(N - prefix)) <= 3n ** BigInt(r - i)) return false;
    prefix += word[i];
  }
  return prefix === N;
}

function properPeriod(word) {
  const r = word.length;
  for (let d = 1; d < r; ++d) {
    if (r % d !== 0) continue;
    let same = true;
    for (let i = d; i < r; ++i) {
      if (word[i] !== word[i % d]) {
        same = false;
        break;
      }
    }
    if (same) return d;
  }
  return r;
}

function carry(word) {
  let C = 0n;
  let A = 0n;
  for (const a of word) {
    C = 3n * C + (1n << A);
    A += BigInt(a);
  }
  return {C, A};
}

function rotatedCarries(word, D) {
  const values = [];
  let C = carry(word).C;
  for (const a of word) {
    values.push(C);
    const numerator = 3n * C + D;
    const divisor = 1n << BigInt(a);
    assert(numerator % divisor === 0n, "carry rotation lost integrality");
    C = numerator / divisor;
  }
  assert(C === values[0], "carry rotations did not close");
  return values;
}

function complexity(bits) {
  let support = 0;
  let runs = 0;
  let transitions = 0;
  for (let i = 0; i < bits.length; ++i) {
    if (bits[i]) ++support;
    if (bits[i] && !bits[(i + bits.length - 1) % bits.length]) ++runs;
    if (bits[i] !== bits[(i + 1) % bits.length]) ++transitions;
  }
  return {support, runs, transitions};
}

function endpointDual(timeBits, r, N) {
  const e = N - r;
  const support = [];
  for (let j = 0; j < r; ++j) {
    if (timeBits[j]) support.push((j * e) % r);
  }
  if (support.length === 0 || support.includes(0)) return null;
  support.sort((a, b) => a - b);
  const cStar = support[support.length - 1];
  const selected = new Set(support);
  const S = Array(r).fill(0);
  for (const c of support) S[cStar - c] = 1;

  const coefficientBits = Array(r).fill(0);
  const digits = Array(r).fill(1);
  const terminal = cStar + 1;
  for (let k = 0; k < terminal; ++k) {
    digits[k] = 2 - S[k];
    coefficientBits[k] = digits[k] === 2 ? 1 : 0;
  }
  // For c_*=r-1, reducing -X^r gives a coefficient -3 rather than -1.
  // The positive-unit transform still has the same formula above; verify it
  // directly by cyclic multiplication below in future refinements.

  const dualTimeBits = Array(r).fill(0);
  const baseline = [];
  const dualWord = [];
  for (let j = 0; j < r; ++j) {
    const k = (j * e) % r;
    const nextK = ((j + 1) * e) % r;
    dualTimeBits[j] = coefficientBits[k];
    const g = Math.floor((j + 1) * N / r) - Math.floor(j * N / r);
    baseline.push(g);
    dualWord.push(g + coefficientBits[k] - coefficientBits[nextK]);
  }
  const positive = dualWord.every(a => a > 0);
  const strict = positive && strictSuffixRecord(dualWord, N);
  return {
    support,
    cStar,
    S,
    digits,
    coefficientBits,
    dualTimeBits,
    dualWord,
    arithmeticWord: dualWord.slice().reverse(),
    positive,
    strict,
    primitive: positive && properPeriod(dualWord) === r,
    originalComplexity: complexity(timeBits),
    dualComplexity: complexity(dualTimeBits)
  };
}

function canonicalBinaryRotation(word, N) {
  const r = word.length;
  const B = [];
  for (let j = 0; j <= r; ++j) B.push(Math.floor(j * N / r));
  const matches = [];
  for (let shift = 0; shift < r; ++shift) {
    const rotation = word.slice(shift).concat(word.slice(0, shift));
    if (!strictSuffixRecord(rotation, N)) continue;
    const bits = Array(r + 1).fill(0);
    let prefix = 0;
    let binary = true;
    for (let j = 1; j <= r; ++j) {
      prefix += rotation[j - 1];
      bits[j] = B[j] - prefix;
      if (bits[j] !== 0 && bits[j] !== 1) binary = false;
    }
    if (prefix !== N || bits[r] !== 0) binary = false;
    if (binary) matches.push({shift, word: rotation, bits: bits.slice(0, r)});
  }
  return matches;
}

let profiles = 0;
let primitiveProfiles = 0;
let dualPositive = 0;
let dualStrict = 0;
let dualPrimitive = 0;
let supportDecreases = 0;
let runDecreases = 0;
let transitionDecreases = 0;
let allThreeDecrease = 0;
let involutionCandidates = 0;
let fixedProfiles = 0;
let denominatorMismatches = 0;
let denominatorDrops = 0;
let denominatorRises = 0;
const denominatorExamples = [];
let arithmeticDualHasBinaryAnchor = 0;
let arithmeticDualUniqueBinaryAnchor = 0;
let arithmeticDualReturnsOriginal = 0;
const arithmeticDualFailures = [];
const firstFailures = [];
const firstNonDescents = [];
const rows = [];

for (let r = 3; r <= maxR; ++r) {
  const P = 3n ** BigInt(r);
  const N = bitLength(P);
  const e = N - r;
  if (gcd(e, r) !== 1) continue;
  const B = [];
  for (let j = 0; j <= r; ++j) B.push(Math.floor(j * N / r));
  const heights = Array(r + 1).fill(0);
  let rowProfiles = 0;
  let rowDualPositive = 0;
  let rowMaximumPairMinimumCarry = 0n;
  let rowMaximumPairMinimumWitness = null;
  let rowNonfixedPairs = 0;
  let rowCarryDifferenceBelowD = 0;
  let rowMaximumCarryDifference = 0n;
  let rowCrossCyclePairs = 0;
  let rowCrossDistanceBelowD = 0;
  let rowCrossDistanceZero = 0;
  let rowMaximumMinimumCrossDistance = 0n;

  function visit(j) {
    if (j === r) {
      if (heights[r] !== 0) return;
      const word = [];
      for (let i = 0; i < r; ++i) {
        const a = B[i + 1] - B[i] + heights[i] - heights[i + 1];
        if (a <= 0) return;
        word.push(a);
      }
      if (!strictSuffixRecord(word, N)) return;
      const bits = heights.slice(0, r);
      if (bits.every(x => x === 0)) return;
      ++profiles;
      ++rowProfiles;
      const primitive = properPeriod(word) === r;
      if (primitive) ++primitiveProfiles;
      const dual = endpointDual(bits, r, N);
      assert(dual !== null, "nonconstant profile lost its endpoint support");
      if (dual.positive) {
        ++dualPositive;
        ++rowDualPositive;
      } else if (firstFailures.length < 12) {
        firstFailures.push({
          r, N, original: word.join("."),
          bits: bits.join(""), support: dual.support.join("."),
          cStar: dual.cStar, dualBits: dual.dualTimeBits.join(""),
          dualWord: dual.dualWord.join(".")
        });
      }
      if (dual.strict) ++dualStrict;
      if (dual.primitive) ++dualPrimitive;
      const arithmeticAnchors = canonicalBinaryRotation(dual.arithmeticWord, N);
      if (arithmeticAnchors.length > 0) ++arithmeticDualHasBinaryAnchor;
      if (arithmeticAnchors.length === 1) {
        ++arithmeticDualUniqueBinaryAnchor;
        const second = endpointDual(arithmeticAnchors[0].bits, r, N);
        if (second !== null) {
          const secondAnchors = canonicalBinaryRotation(second.arithmeticWord, N);
          if (secondAnchors.some(row => row.bits.join("") === bits.join(""))) {
            ++arithmeticDualReturnsOriginal;
          }
        }
      } else if (arithmeticDualFailures.length < 12) {
        arithmeticDualFailures.push({
          r, N, original: word.join("."),
          arithmeticDual: dual.arithmeticWord.join("."),
          binaryAnchorCount: arithmeticAnchors.length
        });
      }
      if (dual.dualTimeBits.join("") === bits.join("")) ++fixedProfiles;
      const D = (1n << BigInt(N)) - P;
      const originalCarry = carry(word);
      const dualCarry = carry(dual.dualWord);
      assert(originalCarry.A === BigInt(N) && dualCarry.A === BigInt(N),
        "duality changed the total exponent");
      const originalQ = D / gcdBig(D, originalCarry.C);
      const dualQ = D / gcdBig(D, dualCarry.C);
      const pairMinimumCarry = originalCarry.C < dualCarry.C ?
        originalCarry.C : dualCarry.C;
      if (pairMinimumCarry > rowMaximumPairMinimumCarry) {
        rowMaximumPairMinimumCarry = pairMinimumCarry;
        rowMaximumPairMinimumWitness = {
          original: word.join("."), dual: dual.dualWord.join("."),
          originalCarry: originalCarry.C.toString(),
          dualCarry: dualCarry.C.toString()
        };
      }
      const carryDifference = originalCarry.C >= dualCarry.C ?
        originalCarry.C - dualCarry.C : dualCarry.C - originalCarry.C;
      if (carryDifference !== 0n) {
        ++rowNonfixedPairs;
        if (carryDifference < D) ++rowCarryDifferenceBelowD;
        if (carryDifference > rowMaximumCarryDifference) {
          rowMaximumCarryDifference = carryDifference;
        }
      }
      if (originalQ !== dualQ) {
        ++denominatorMismatches;
        if (dualQ < originalQ) ++denominatorDrops;
        else ++denominatorRises;
        if (denominatorExamples.length < 12) {
          denominatorExamples.push({
            r, N, originalQ: originalQ.toString(), dualQ: dualQ.toString(),
            original: word.join("."), dual: dual.dualWord.join(".")
          });
        }
      }
      const arithmeticCarry = carry(dual.arithmeticWord);
      const arithmeticQ = D / gcdBig(D, arithmeticCarry.C);
      if (originalQ === 1n) {
        assert(arithmeticQ === 1n,
          "denominator-one duality failed in a finite profile");
      }
      const arithmeticRotationShift = (() => {
        const doubled = word.concat(word);
        for (let shift = 0; shift < r; ++shift) {
          let same = true;
          for (let j = 0; j < r; ++j) {
            if (doubled[shift + j] !== dual.arithmeticWord[j]) {
              same = false;
              break;
            }
          }
          if (same) return shift;
        }
        return null;
      })();
      let expectedRotationShift = null;
      for (let j = 0; j < r; ++j) {
        if ((j * (N - r)) % r === dual.cStar) {
          expectedRotationShift = j;
          break;
        }
      }
      assert(expectedRotationShift !== null,
        "maximum support has no time index");
      assert(arithmeticRotationShift === expectedRotationShift,
        `arithmetic dual rotation shift failed at r=${r}`);
      const sameCyclicWord = arithmeticRotationShift !== null;
      if (!sameCyclicWord) {
        ++rowCrossCyclePairs;
        const left = rotatedCarries(word, D);
        const right = rotatedCarries(dual.arithmeticWord, D);
        let minimum = null;
        for (const x of left) {
          for (const y of right) {
            const difference = x >= y ? x - y : y - x;
            if (minimum === null || difference < minimum) minimum = difference;
          }
        }
        assert(minimum !== null, "cross-cycle distance was not computed");
        if (minimum === 0n) ++rowCrossDistanceZero;
        else if (minimum < D) ++rowCrossDistanceBelowD;
        if (minimum > rowMaximumMinimumCrossDistance) {
          rowMaximumMinimumCrossDistance = minimum;
        }
      }
      const oc = dual.originalComplexity;
      const dc = dual.dualComplexity;
      const sd = dc.support < oc.support;
      const rd = dc.runs < oc.runs;
      const td = dc.transitions < oc.transitions;
      supportDecreases += Number(sd);
      runDecreases += Number(rd);
      transitionDecreases += Number(td);
      allThreeDecrease += Number(sd && rd && td);
      if (dual.positive && !sd && !rd && !td && firstNonDescents.length < 12) {
        firstNonDescents.push({
          r, N, original: word.join("."), bits: bits.join(""),
          dualWord: dual.dualWord.join("."),
          dualBits: dual.dualTimeBits.join(""),
          originalComplexity: oc, dualComplexity: dc
        });
      }
      if (dual.positive) {
        const twice = endpointDual(dual.dualTimeBits, r, N);
        if (twice !== null && twice.positive &&
            twice.dualTimeBits.join("") === bits.join("")) {
          ++involutionCandidates;
        }
      }
      return;
    }

    for (const next of [0, 1]) {
      const a = B[j + 1] - B[j] + heights[j] - next;
      if (a <= 0) continue;
      heights[j + 1] = next;
      visit(j + 1);
    }
    heights[j + 1] = 0;
  }

  heights[0] = 0;
  visit(0);
  const rowD = (1n << BigInt(N)) - P;
  rows.push({
    r, N, e, profiles: rowProfiles, dualPositive: rowDualPositive,
    maximumPairMinimumStateFloor:
      (rowMaximumPairMinimumCarry / rowD).toString(),
    maximumPairMinimumStateRatio:
      Number(rowMaximumPairMinimumCarry) / Number(rowD),
    maximumPairMinimumWitness: rowMaximumPairMinimumWitness,
    nonfixedPairs: rowNonfixedPairs,
    carryDifferenceBelowD: rowCarryDifferenceBelowD,
    maximumCarryDifferenceOverD:
      Number(rowMaximumCarryDifference) / Number(rowD),
    crossCyclePairs: rowCrossCyclePairs,
    crossDistanceBelowD: rowCrossDistanceBelowD,
    crossDistanceZero: rowCrossDistanceZero,
    maximumMinimumCrossDistanceOverD:
      Number(rowMaximumMinimumCrossDistance) / Number(rowD)
  });
}

console.log(JSON.stringify({
  target: "endpoint coefficient duality",
  maxR,
  profiles,
  primitiveProfiles,
  dualPositive,
  dualStrict,
  dualPrimitive,
  supportDecreases,
  runDecreases,
  transitionDecreases,
  allThreeDecrease,
  involutionCandidates,
  fixedProfiles,
  denominatorMismatches,
  denominatorDrops,
  denominatorRises,
  denominatorExamples,
  arithmeticDualHasBinaryAnchor,
  arithmeticDualUniqueBinaryAnchor,
  arithmeticDualReturnsOriginal,
  arithmeticDualFailures,
  firstFailures,
  firstNonDescents,
  rows,
  warning: "finite combinatorial evidence only"
}, null, 2));
