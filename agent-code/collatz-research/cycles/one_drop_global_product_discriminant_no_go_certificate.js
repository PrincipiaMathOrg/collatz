#!/usr/bin/env node
"use strict";

// Exact audit for the global product, the simultaneous 2- and 3-adic
// spacing of rational-cycle numerators, and the discriminant collapse.
// All unbounded arithmetic is represented by BigInt.

function pow2(k) { return 1n << BigInt(k); }
function pow3(k) { return 3n ** BigInt(k); }

function gcd(a, b) {
  if (a < 0n) a = -a;
  if (b < 0n) b = -b;
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

function parameters(r) {
  const P = pow3(r);
  const N = P.toString(2).length;
  const D = pow2(N) - P;
  const B = [];
  for (let j = 0; j <= r; ++j) B.push(Math.floor(j * N / r));
  const mechanical = [];
  const eligible = [];
  for (let j = 0; j < r; ++j) {
    const a = B[j + 1] - B[j];
    mechanical.push(a);
    if (j < r - 1 && a === 2) eligible.push(j);
  }
  if (mechanical[r - 1] !== 2) throw new Error("terminal mechanical letter");
  if (eligible.length !== N - r - 1) throw new Error("eligible count");
  return {r, N, D, P, B, mechanical, eligible};
}

function makeProfile(datum, omissions) {
  const omitted = new Set(omissions);
  const U = omissions.length;
  const word = datum.mechanical.slice();
  const heights = [];
  let h = 0;
  for (let j = 0; j < datum.r; ++j) {
    heights.push(h);
    if (j < datum.r - 1 && omitted.has(j)) {
      word[j] = 1;
      ++h;
    }
  }
  word[datum.r - 1] = U + 2;
  if (h !== U) throw new Error("height count");
  const total = word.reduce((a, b) => a + b, 0);
  if (total !== datum.N) throw new Error("word weight");
  return {U, word, heights};
}

function rationalNumeratorOrbit(datum, profile) {
  let prefix = 0;
  let carry = 0n;
  for (let j = 0; j < datum.r; ++j) {
    carry += pow3(datum.r - 1 - j) * pow2(prefix);
    prefix += profile.word[j];
  }
  if (prefix !== datum.N) throw new Error("carry weight");
  const common = gcd(carry, datum.D);
  const q = datum.D / common;
  const states = [carry / common];
  for (let j = 0; j < datum.r - 1; ++j) {
    const numerator = 3n * states[j] + q;
    const divisor = pow2(profile.word[j]);
    if (numerator % divisor !== 0n) throw new Error("branch divisibility");
    const next = numerator / divisor;
    if (next % 2n !== 1n) throw new Error("odd numerator state");
    states.push(next);
  }
  const terminalNumerator = 3n * states[datum.r - 1] + q;
  const terminalDivisor = pow2(profile.word[datum.r - 1]);
  if (terminalNumerator !== terminalDivisor * states[0]) {
    throw new Error("cycle closure");
  }
  return {carry, common, q, states};
}

function forwardLcp(word, i, j) {
  const r = word.length;
  let length = 0;
  let weight = 0;
  while (length < r && word[(i + length) % r] === word[(j + length) % r]) {
    weight += word[(i + length) % r];
    ++length;
  }
  if (length === r) throw new Error("equal cyclic rotations");
  return {length, weight};
}

function backwardLcp(word, i, j) {
  const r = word.length;
  let length = 0;
  while (length < r &&
         word[(i - 1 - length + 2 * r) % r] ===
         word[(j - 1 - length + 2 * r) % r]) {
    ++length;
  }
  if (length === r) throw new Error("equal reverse rotations");
  return length;
}

function auditProfile(datum, profile) {
  const orbit = rationalNumeratorOrbit(datum, profile);
  const {states, q} = orbit;
  const seen = new Set(states.map(String));
  if (seen.size !== datum.r) throw new Error("nonprimitive numerator orbit");

  // The rational product identity, cleared exactly.
  let productNumerator = 1n;
  let productStates = 1n;
  for (const n of states) {
    productNumerator *= 3n * n + q;
    productStates *= n;
  }
  if (productNumerator !== pow2(datum.N) * productStates) {
    throw new Error("global product identity");
  }

  // The denominator-one state envelope is homogeneous after clearing the
  // reduced odd denominator. It therefore holds for these numerator states.
  const n0 = states[0];
  for (let i = 0; i < datum.r; ++i) {
    if (!(states[i] < 4n * n0 * pow2(profile.heights[i]))) {
      throw new Error("homogeneous state envelope");
    }
  }

  let pairs = 0;
  let vandermonde = 1n;
  let spacingProduct = 1n;
  let heightProduct = 1n;
  let maximumPairRatioNumerator = 0n;
  let maximumPairRatioDenominator = 1n;
  for (let i = 0; i < datum.r; ++i) {
    for (let j = i + 1; j < datum.r; ++j) {
      ++pairs;
      const forward = forwardLcp(profile.word, i, j);
      const backward = backwardLcp(profile.word, i, j);
      const spacing = pow2(forward.weight + 1) * pow3(backward);
      const difference = states[i] > states[j]
        ? states[i] - states[j] : states[j] - states[i];
      if (difference % spacing !== 0n) {
        throw new Error("simultaneous 2-3 spacing");
      }
      const height = Math.max(profile.heights[i], profile.heights[j]);
      if (!(difference < 4n * n0 * pow2(height))) {
        throw new Error("pair envelope");
      }
      vandermonde *= difference;
      spacingProduct *= spacing;
      heightProduct *= pow2(height);

      // Compare spacing / 2^height without floating point. The maximum of
      // these pair ratios dominates their geometric mean, which is exactly
      // the lower bound obtained by multiplying into a discriminant.
      const ratioNumerator = spacing;
      const ratioDenominator = pow2(height);
      if (ratioNumerator * maximumPairRatioDenominator >
          maximumPairRatioNumerator * ratioDenominator) {
        maximumPairRatioNumerator = ratioNumerator;
        maximumPairRatioDenominator = ratioDenominator;
      }
    }
  }
  if (vandermonde % spacingProduct !== 0n) {
    throw new Error("Vandermonde spacing product");
  }
  if (!(vandermonde < (4n * n0) ** BigInt(pairs) * heightProduct)) {
    throw new Error("Vandermonde envelope product");
  }
  if (spacingProduct * maximumPairRatioDenominator ** BigInt(pairs) >
      heightProduct * maximumPairRatioNumerator ** BigInt(pairs)) {
    throw new Error("geometric mean exceeds maximum pair");
  }
  return {q, pairs};
}

function integerSqrt(n) {
  let lo = 0;
  let hi = 1;
  while (hi * hi <= n) hi *= 2;
  while (lo + 1 < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (mid * mid <= n) lo = mid;
    else hi = mid;
  }
  return lo;
}

function dispersedProfile(datum) {
  // Work strictly above the surviving actual-factor boundary. We take the
  // least U with U^2/r >= 12/5 > 2.315385...
  let U = integerSqrt(Math.floor((12 * datum.r + 4) / 5));
  while (5 * U * U < 12 * datum.r) ++U;
  while (U > 0 && 5 * (U - 1) * (U - 1) >= 12 * datum.r) --U;
  if (5 * U * U < 12 * datum.r) throw new Error("high-rise choice");
  if (2 * U > datum.eligible.length) return null;
  const omissions = [];
  for (let k = 1; k <= U; ++k) omissions.push(datum.eligible[2 * k - 1]);
  return makeProfile(datum, omissions);
}

function spreadProfile(datum) {
  // Retain the first eligible site, omit the second, and spread all later
  // omissions through the remaining eligible ranks. The first omission
  // makes every subsequent height positive, while the spreading prevents a
  // long constant-height plateau.
  let U = integerSqrt(Math.floor((12 * datum.r + 4) / 5));
  while (5 * U * U < 12 * datum.r) ++U;
  const E = datum.eligible.length;
  if (U < 2 || U >= E) return null;
  const ranks = [];
  for (let k = 0; k < U; ++k) {
    ranks.push(1 + Math.floor(k * (E - 2) / (U - 1)));
  }
  if (new Set(ranks).size !== U || ranks[0] !== 1 || ranks[U - 1] !== E - 1) {
    throw new Error("spread omission ranks");
  }
  return makeProfile(datum, ranks.map(rank => datum.eligible[rank]));
}

function lowerBoundIndex(values, target) {
  let low = 0;
  let high = values.length;
  while (low < high) {
    const middle = (low + high) >> 1;
    if (values[middle] < target) low = middle + 1;
    else high = middle;
  }
  return low;
}

function quadraticProfile(U) {
  const r = Math.floor(250 * U * U / 579);
  const datum = parameters(r);
  const omissions = [];
  let previous = -1;
  const denominator = (U + 1) * (U + 1);
  for (let k = 0; k < U; ++k) {
    const target = Math.floor(r * (k + 1) * (k + 1) / denominator);
    const index = lowerBoundIndex(datum.eligible, Math.max(target, previous + 1));
    if (index >= datum.eligible.length) throw new Error("quadratic target");
    const position = datum.eligible[index];
    omissions.push(position);
    previous = position;
  }
  if (new Set(omissions).size !== U) throw new Error("quadratic omissions");
  return {datum, profile: makeProfile(datum, omissions)};
}

function maximumPairSpacing(datum, profile) {
  const orbit = rationalNumeratorOrbit(datum, profile);
  if (!orbit.states.slice(1).every(n => n > orbit.states[0])) {
    throw new Error("spread profile is not strict least");
  }
  let bestNumerator = 0n;
  let bestDenominator = 1n;
  let maximumPlateau = 0;
  for (let h = 0; h <= profile.U; ++h) {
    maximumPlateau = Math.max(maximumPlateau,
      profile.heights.filter(value => value === h).length);
  }
  for (let i = 0; i < datum.r; ++i) {
    for (let j = i + 1; j < datum.r; ++j) {
      const forward = forwardLcp(profile.word, i, j);
      const backward = backwardLcp(profile.word, i, j);
      const numerator = pow2(forward.weight + 1) * pow3(backward);
      const denominator = pow2(Math.max(profile.heights[i], profile.heights[j]));
      if (numerator * bestDenominator > bestNumerator * denominator) {
        bestNumerator = numerator;
        bestDenominator = denominator;
      }
    }
  }
  // Every pairwise envelope gives 4*n_0 > spacing/2^height. Hence all
  // simultaneous pair bounds remain below U^27 on this row.
  const belowU27 = bestNumerator <
    4n * BigInt(profile.U) ** 27n * bestDenominator;
  const reduced = gcd(bestNumerator, bestDenominator);
  return {
    r: datum.r,
    N: datum.N,
    U: profile.U,
    maximumPlateau,
    denominatorBits: orbit.q.toString(2).length,
    maximumSpacingRatioNumerator: (bestNumerator / reduced).toString(),
    maximumSpacingRatioDenominator: (bestDenominator / reduced).toString(),
    everyPairBoundBelowU27: belowU27,
    strictLeastRationalOrbit: true
  };
}

let witnessRandomState = 0x93d765dd;
function witnessRandomUnit() {
  witnessRandomState =
    (1664525 * witnessRandomState + 1013904223) >>> 0;
  return witnessRandomState / 2 ** 32;
}

function randomOmissions(datum, U) {
  const pool = datum.eligible.slice();
  const result = [];
  for (let k = 0; k < U; ++k) {
    const j = k + Math.floor(witnessRandomUnit() * (pool.length - k));
    [pool[k], pool[j]] = [pool[j], pool[k]];
    result.push(pool[k]);
  }
  result.sort((a, b) => a - b);
  return result;
}

function factorCount(word, length) {
  const width = BigInt((BigInt(Math.max(...word))).toString(2).length);
  const mask = (1n << (width * BigInt(length))) - 1n;
  let factor = 0n;
  for (let k = 0; k < length; ++k) {
    factor = (factor << width) | BigInt(word[k]);
  }
  const factors = new Set([factor]);
  for (let start = 1; start < word.length; ++start) {
    factor = ((factor << width) & mask) |
      BigInt(word[(start + length - 1) % word.length]);
    factors.add(factor);
  }
  return factors.size;
}

function fullComplexityWitness() {
  const r = 2881;
  const U = 120;
  const length = 77;
  const datum = parameters(r);
  let omissions = null;
  let trials = 0;
  for (; trials < 2000; ++trials) {
    const candidate = randomOmissions(datum, U);
    const profile = makeProfile(datum, candidate);
    if (factorCount(profile.word, length) === r) {
      omissions = candidate;
      break;
    }
  }
  if (omissions === null) throw new Error("full-complexity witness not found");
  const profile = makeProfile(datum, omissions);
  const orbit = rationalNumeratorOrbit(datum, profile);
  const strictLeast = orbit.states.slice(1).every(n => n > orbit.states[0]);
  if (!strictLeast) throw new Error("full-complexity orbit is not strict least");

  // If all factors of length L are distinct, then the maximal common
  // centered block of two rotations has length at most L-1. Since every
  // preterminal letter is at most two, every simultaneous spacing ratio is
  // at most 2^(2L-1), before the favorable height divisor is used.
  if (!(pow2(2 * length - 1) <
        4n * BigInt(U) ** 27n)) {
    throw new Error("full-complexity spacing comparison");
  }
  if (5 * U * U <= 12 * r) {
    throw new Error("full-complexity row not above high-rise boundary");
  }
  return {
    r,
    N: datum.N,
    U,
    length,
    factors: factorCount(profile.word, length),
    randomTrials: trials + 1,
    omissionChecksum: omissions.reduce((a, b, i) =>
      (a + BigInt(i + 1) * BigInt(b + 1)) % 1000000007n, 0n).toString(),
    denominatorBits: orbit.q.toString(2).length,
    strictLeastRationalOrbit: strictLeast,
    everySimultaneousPairBoundBelowU27: true
  };
}

function greedyProductWitness(datum, profile) {
  // Fix the least value at 9. Assign every other state the largest unused
  // odd integer below its individual envelope. This is the greedy extremizer
  // for the decreasing product among assignments with the given caps.
  const x = 9n;
  const values = Array(datum.r).fill(null);
  values[0] = x;
  const used = new Set([x.toString()]);
  const order = [];
  for (let i = 1; i < datum.r; ++i) order.push(i);
  order.sort((i, j) => profile.heights[j] - profile.heights[i]);
  let previous = null;
  for (const i of order) {
    const cap = 4n * x * pow2(profile.heights[i]);
    let value = cap - 1n;
    if (previous !== null && value >= previous) value = previous - 2n;
    while (used.has(value.toString())) value -= 2n;
    if (!(value > x && value < cap && value % 2n === 1n)) {
      throw new Error("greedy assignment infeasible");
    }
    values[i] = value;
    used.add(value.toString());
    previous = value;
  }
  if (new Set(values.map(String)).size !== datum.r) {
    throw new Error("greedy values not distinct");
  }
  let left = 1n;
  let rightStates = 1n;
  for (let i = 0; i < datum.r; ++i) {
    if (!(values[i] >= x &&
          values[i] < 4n * x * pow2(profile.heights[i]))) {
      throw new Error("greedy witness envelope");
    }
    left *= 3n * values[i] + 1n;
    rightStates *= values[i];
  }
  // Product(1+1/(3y_i)) < 2^N/3^r after cancelling 3^r.
  if (!(left < pow2(datum.N) * rightStates)) {
    throw new Error("greedy product is not below R");
  }
  let maximumLowHeightOccupation = 0;
  for (let h = 0; h < profile.U; ++h) {
    maximumLowHeightOccupation = Math.max(maximumLowHeightOccupation,
      profile.heights.filter(value => value === h).length);
  }
  if (maximumLowHeightOccupation > 4) {
    throw new Error("dispersed low-height occupation");
  }
  return {
    r: datum.r,
    N: datum.N,
    U: profile.U,
    fiveUSquaredMinusTwelveR: 5 * profile.U * profile.U - 12 * datum.r,
    maximumLowHeightOccupation,
    leastWitnessState: x.toString(),
    productStrictlyBelowR: true
  };
}

const maxR = Number(process.argv[2] || 20);
let profiles = 0;
let pairs = 0;
let denominatorOneProfiles = 0;
let maximumDenominatorBits = 0;
for (let r = 3; r <= maxR; ++r) {
  const datum = parameters(r);
  if (datum.eligible.length >= 31) throw new Error("mask cutoff");
  const masks = 2 ** datum.eligible.length;
  for (let mask = 1; mask < masks; ++mask) {
    const omissions = [];
    for (let k = 0; k < datum.eligible.length; ++k) {
      if ((mask & 2 ** k) !== 0) omissions.push(datum.eligible[k]);
    }
    const profile = makeProfile(datum, omissions);
    const result = auditProfile(datum, profile);
    ++profiles;
    pairs += result.pairs;
    if (result.q === 1n) ++denominatorOneProfiles;
    maximumDenominatorBits = Math.max(maximumDenominatorBits,
      result.q.toString(2).length);
  }
}

// Freeze four exact high-rise product-majorization witnesses. The phase
// test 2^(2N) >= 2*3^(2r) is exactly N-r log_2(3) >= 1/2.
const relaxationRows = [];
for (let r = 64; relaxationRows.length < 4 && r <= 5000; ++r) {
  const datum = parameters(r);
  if (pow2(2 * datum.N) < 2n * datum.P * datum.P) continue;
  const profile = dispersedProfile(datum);
  if (profile === null) continue;
  const key = `${profile.U}`;
  if (relaxationRows.some(row => `${row.U}` === key)) continue;
  relaxationRows.push(greedyProductWitness(datum, profile));
}
if (relaxationRows.length !== 4) throw new Error("missing relaxation rows");

const fullComplexityRow = fullComplexityWitness();

console.log(JSON.stringify({
  exhaustiveThroughR: maxR,
  profiles,
  pairs,
  denominatorOneProfiles,
  maximumDenominatorBits,
  relaxationRows,
  fullComplexityRow,
  status: "PASS"
}));
