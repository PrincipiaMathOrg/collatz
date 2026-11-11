#!/usr/bin/env node
"use strict";

// Diagnostic enumeration of strict-record one-strip words whose rational
// mechanical height path has one downward transition after cyclic rotation.
// Such a word is obtained by selecting arbitrary upward steps among the
// preterminal mechanical 2-steps and discharging their total at the last edge.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function gcd(a, b) {
  while (b !== 0n) [a, b] = [b, a % b];
  return a < 0n ? -a : a;
}

function bitLength(n) {
  return n.toString(2).length;
}

function extendedGcd(a, b) {
  if (b === 0n) return [a, 1n, 0n];
  const [g, x, y] = extendedGcd(b, a % b);
  return [g, y, x - (a / b) * y];
}

function inverseMod(a, modulus) {
  const [g, x] = extendedGcd(a, modulus);
  assert(g === 1n, "modular inverse does not exist");
  return ((x % modulus) + modulus) % modulus;
}

function carryOf(word) {
  let C = 0n;
  let A = 0;
  for (const exponent of word) {
    C = 3n * C + (1n << BigInt(A));
    A += exponent;
  }
  return {C, A};
}

function strictSuffixRecord(word, N) {
  let A = 0;
  const r = word.length;
  for (let i = 0; i < r; ++i) {
    if ((1n << BigInt(N - A)) <= 3n ** BigInt(r - i)) return false;
    A += word[i];
  }
  return A === N;
}

function isPrimitive(word) {
  const r = word.length;
  for (let p = 1; p < r; ++p) {
    if (r % p !== 0) continue;
    let same = true;
    for (let i = p; i < r; ++i) {
      if (word[i] !== word[i % p]) {
        same = false;
        break;
      }
    }
    if (same) return false;
  }
  return true;
}

const maxR = Number(process.argv[2] || 32);
let periods = 0;
let subsets = 0;
let strict = 0;
let primitive = 0;
let full = 0;
let canonicalDescents = 0;
let canonicalEqualities = 0;
let canonicalRises = 0;
let leastCanonicalGap = null;
let leastIntegerMargin = null;
let binaryWrapsFromBase = 0;
let rhoPowerViolations = 0;
let leastRhoPowerRatio = null;
let best = null;
const bestByUpward = new Map();
const minMarginByUpward = new Map();
const carryRangeByUpward = new Map();

for (let r = 3; r <= maxR; ++r) {
  const P = 3n ** BigInt(r);
  const N = bitLength(P - 1n);
  const M = 1n << BigInt(N);
  const cylinderModulus = 1n << BigInt(N + 1);
  const D = M - P;
  const inverseP = inverseMod(P % cylinderModulus, cylinderModulus);
  const B = Array.from({length: r + 1}, (_, i) =>
    Math.floor(i * N / r));
  const base = Array.from({length: r}, (_, i) => B[i + 1] - B[i]);
  const baseCarry = carryOf(base).C;
  const baseRho0 = (((M - baseCarry) * inverseP) % cylinderModulus +
    cylinderModulus) % cylinderModulus;
  const baseRho = baseRho0 === 0n ? cylinderModulus : baseRho0;
  const eligible = [];
  for (let i = 0; i < r - 1; ++i) {
    if (base[i] === 2) eligible.push(i);
  }
  assert(eligible.length < 31, "diagnostic mask exceeds Number range");
  ++periods;
  const maskLimit = 2 ** eligible.length;
  for (let mask = 1; mask < maskLimit; ++mask) {
    ++subsets;
    const word = base.slice();
    let upward = 0;
    for (let bit = 0; bit < eligible.length; ++bit) {
      if ((mask & (2 ** bit)) === 0) continue;
      --word[eligible[bit]];
      ++upward;
    }
    word[r - 1] += upward;
    assert(word.every(value => value >= 1), "nonpositive exponent");
    if (!strictSuffixRecord(word, N)) continue;
    ++strict;
    if (!isPrimitive(word)) continue;
    ++primitive;
    const data = carryOf(word);
    assert(data.A === N, "total exponent changed");
    const common = gcd(D, data.C);
    const q = D / common;
    if (q === 1n) ++full;
    const numerator = data.C / common;
    const rangeKey = `${r}:${upward}`;
    const oldRange = carryRangeByUpward.get(rangeKey);
    if (oldRange === undefined) {
      carryRangeByUpward.set(rangeKey,
        {min: data.C, max: data.C, D, r, upward});
    } else {
      if (data.C < oldRange.min) oldRange.min = data.C;
      if (data.C > oldRange.max) oldRange.max = data.C;
    }
    const rho0 = (((M - data.C) * inverseP) % cylinderModulus +
      cylinderModulus) % cylinderModulus;
    const rho = rho0 === 0n ? cylinderModulus : rho0;
    if (rho < baseRho) ++binaryWrapsFromBase;
    const upwardPower = 1n << BigInt(upward);
    if (rho <= upwardPower) ++rhoPowerViolations;
    const scaledRho = (rho * 1000000n) / upwardPower;
    if (leastRhoPowerRatio === null ||
        scaledRho < leastRhoPowerRatio.scaledRho) {
      leastRhoPowerRatio = {r, upward, rho, scaledRho,
        word: word.join(",")};
    }
    const endpointNumerator = P * rho + data.C;
    assert(endpointNumerator % M === 0n,
      "canonical endpoint lost integrality");
    const endpoint = endpointNumerator / M;
    const gap = rho - endpoint;
    const integerMarginNumerator = D * rho - data.C;
    assert(integerMarginNumerator % M === 0n,
      "integer margin lost integrality");
    const integerMargin = integerMarginNumerator / M;
    assert(integerMargin === gap, "gap and integer margin disagree");
    if (leastIntegerMargin === null || integerMargin < leastIntegerMargin.margin) {
      leastIntegerMargin = {r, N, upward, margin: integerMargin, rho,
        endpoint, word: word.join(",")};
    }
    const oldMargin = minMarginByUpward.get(upward);
    if (oldMargin === undefined || integerMargin < oldMargin.margin) {
      minMarginByUpward.set(upward, {r, margin: integerMargin, rho,
        endpoint, word: word.join(",")});
    }
    if (gap > 0n) ++canonicalDescents;
    else if (gap === 0n) ++canonicalEqualities;
    else ++canonicalRises;
    if (leastCanonicalGap === null || gap < leastCanonicalGap.gap) {
      leastCanonicalGap = {r, N, upward, gap, rho, endpoint,
        word: word.join(",")};
    }
    const candidate = {r, N, upward, q, common, numerator, D,
      rho, endpoint, gap, word: word.join(",")};
    if (best === null || q < best.q ||
        (q === best.q && numerator < best.numerator)) best = candidate;
    const old = bestByUpward.get(upward);
    if (old === undefined || q < old.q ||
        (q === old.q && numerator < old.numerator)) {
      bestByUpward.set(upward, candidate);
    }
  }
}

console.log(`max_r=${maxR}`);
console.log(`periods=${periods}`);
console.log(`nonempty_upward_subsets=${subsets}`);
console.log(`strict_words=${strict}`);
console.log(`primitive_strict_words=${primitive}`);
console.log(`denominator_one_hits=${full}`);
console.log(`canonical_descents=${canonicalDescents}`);
console.log(`canonical_equalities=${canonicalEqualities}`);
console.log(`canonical_rises=${canonicalRises}`);
console.log(`binary_wraps_from_christoffel_base=${binaryWrapsFromBase}`);
console.log(`rho_le_2_pow_upward=${rhoPowerViolations}`);
if (leastRhoPowerRatio !== null) {
  console.log(`least_rho_per_2U_x1e6=${leastRhoPowerRatio.scaledRho}`);
  console.log(`least_rho_per_2U_r=${leastRhoPowerRatio.r}`);
  console.log(`least_rho_per_2U_U=${leastRhoPowerRatio.upward}`);
  console.log(`least_rho_per_2U_rho=${leastRhoPowerRatio.rho}`);
  console.log(`least_rho_per_2U_word=${leastRhoPowerRatio.word}`);
}
if (leastCanonicalGap !== null) {
  console.log(`least_gap=${leastCanonicalGap.gap}`);
  console.log(`least_gap_r=${leastCanonicalGap.r}`);
  console.log(`least_gap_upward=${leastCanonicalGap.upward}`);
  console.log(`least_gap_rho=${leastCanonicalGap.rho}`);
  console.log(`least_gap_endpoint=${leastCanonicalGap.endpoint}`);
  console.log(`least_gap_word=${leastCanonicalGap.word}`);
}
if (leastIntegerMargin !== null) {
  console.log(`least_integer_margin=${leastIntegerMargin.margin}`);
}
if (best !== null) {
  console.log(`best_r=${best.r}`);
  console.log(`best_N=${best.N}`);
  console.log(`best_upward=${best.upward}`);
  console.log(`best_q=${best.q}`);
  console.log(`best_common=${best.common}`);
  console.log(`best_numerator=${best.numerator}`);
  console.log(`best_D=${best.D}`);
  console.log(`best_word=${best.word}`);
}
for (const upward of [...bestByUpward.keys()].sort((a, b) => a - b)) {
  const row = bestByUpward.get(upward);
  console.log(`up_${upward}=r:${row.r},N:${row.N},q:${row.q},` +
    `g:${row.common},p:${row.numerator}`);
}
for (const upward of [...minMarginByUpward.keys()].sort((a, b) => a - b)) {
  const row = minMarginByUpward.get(upward);
  console.log(`margin_up_${upward}=r:${row.r},gap:${row.margin},` +
    `rho:${row.rho},endpoint:${row.endpoint},word:${row.word}`);
}
for (const key of [...carryRangeByUpward.keys()].sort((a, b) => {
  const [ra, ua] = a.split(":").map(Number);
  const [rb, ub] = b.split(":").map(Number);
  return ra - rb || ua - ub;
})) {
  const row = carryRangeByUpward.get(key);
  console.log(`carry_range_r${row.r}_up_${row.upward}=width:${row.max-row.min},` +
    `D:${row.D},quotient:${(row.max-row.min)/row.D}`);
}
console.log("cycle_one_drop_probe_completed=true");
