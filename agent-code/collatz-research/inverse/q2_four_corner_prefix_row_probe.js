#!/usr/bin/env node
"use strict";

// Exact row probe for four-corner q_s=2, b=1 profiles.  In addition to
// all four exponent-one cylinder inequalities, it enforces the polynomial
// target seed envelope at the first-corner block, the second jump, the
// second block, the third jump, and the terminal jump.  It does not test
// the final reduced-modulus displacement residue.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function bitLength(n) {
  assert(n > 0n, "bit length requires a positive integer");
  return n.toString(2).length;
}

function mod(a, m) {
  const value = a % m;
  return value < 0n ? value + m : value;
}

function inverse(a, m) {
  let oldR = a;
  let r = m;
  let oldS = 1n;
  let s = 0n;
  while (r !== 0n) {
    const q = oldR / r;
    [oldR, r] = [r, oldR - q * r];
    [oldS, s] = [s, oldS - q * s];
  }
  assert(oldR === 1n, "inverse does not exist");
  return mod(oldS, m);
}

function ceilTenthRoot(n) {
  let lo = 0n;
  let hi = 1n << BigInt(Math.ceil(bitLength(n) / 10));
  while (hi ** 10n < n) hi <<= 1n;
  while (lo + 1n < hi) {
    const mid = (lo + hi) >> 1n;
    if (mid ** 10n < n) lo = mid;
    else hi = mid;
  }
  return hi;
}

function residueBelow(value, bits, bound) {
  return BigInt.asUintN(bits, value) < bound;
}

// The residues value mod 2^q are nondecreasing in q.  Return the largest
// parameter z in [zLo,zHi] for which q=offset+z remains below bound.
function maximumTruncationParameter(value, offset, zLo, zHi, bound) {
  if (zLo > zHi) return zLo - 1;
  if (!residueBelow(value, offset + zLo, bound)) return zLo - 1;
  if (residueBelow(value, offset + zHi, bound)) return zHi;
  let lo = zLo;
  let hi = zHi;
  while (lo + 1 < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (residueBelow(value, offset + mid, bound)) lo = mid;
    else hi = mid;
  }
  return lo;
}

const weight = Number(process.argv[2] || 306);
assert(Number.isInteger(weight) && weight >= 4,
  "usage: q2_four_corner_prefix_row_probe.js WEIGHT");

const precision = Math.max(4096, 2 * weight + 256);
const precisionModulus = 1n << BigInt(precision);
const powers3 = [1n];
const ceilings = [0];
const inverse3 = [1n];
for (let i = 1; i <= weight; ++i) {
  powers3.push(powers3[i - 1] * 3n);
  ceilings.push(bitLength(powers3[i]));
  inverse3.push(inverse(powers3[i], precisionModulus));
}
assert(ceilings[weight] - ceilings[weight - 1] === 1,
  `weight ${weight} is not q_s=2`);

const N = ceilings[weight];
const e = N - weight;
const H = 307n * BigInt(weight) ** 15n;
const seedBound = ceilTenthRoot(153n ** 10n * BigInt(weight) ** 143n);
const logH = bitLength(H) - 1;
const maxFirstCorner = bitLength(seedBound) - 1;
const jCap = Math.min(weight - 4, maxFirstCorner);
const m = Array(weight).fill(0);
const v = Array(weight).fill(0);
for (let i = 1; i <= weight - 2; ++i) {
  m[i] = ceilings[i] - 1 - i;
  v[i] = m[i] - Math.max(0, weight - 1 - i - logH);
}

let firstCorners = 0;
let firstPrefixCorners = 0;
let secondRows = 0;
let secondJumpPairs = 0;
let secondBlockPairs = 0;
let thirdJumpProfiles = 0;
let terminalPrefixProfiles = 0;
const firstTerminalSurvivors = [];

for (let J = 1; J <= jCap; ++J) {
  for (let a = 1; a <= m[J]; ++a) {
    ++firstCorners;
    const coefficientA = ((1n << BigInt(a)) - 1n) << BigInt(J);
    const r1 = -1n - coefficientA * inverse3[J];

    const rawKCap = Math.min(weight - 3,
      J + m[J] - a + logH);
    if (rawKCap <= J) continue;
    const kCap = maximumTruncationParameter(
      r1, a - 1, J, rawKCap - 1, seedBound) + 1;
    if (kCap <= J) continue;
    ++firstPrefixCorners;

    for (let K = J + 1; K <= kCap; ++K) {
      ++secondRows;
      const jumpToK = (1n << BigInt(K + a)) * inverse3[K];
      const rAtK = r1 + jumpToK;
      const rawBMax = m[K];
      const bMax = maximumTruncationParameter(
        rAtK, K, a + 1, rawBMax, seedBound);
      if (bMax <= a) continue;

      for (let b = a + 1; b <= bMax; ++b) {
        ++secondJumpPairs;
        const coefficientB = ((1n << BigInt(b)) -
          (1n << BigInt(a))) << BigInt(K);
        const r2 = r1 - coefficientB * inverse3[K];

        const rawLCap = Math.min(weight - 2,
          K + m[K] - b + logH);
        if (rawLCap <= K) continue;
        const lCap = maximumTruncationParameter(
          r2, b - 1, K, rawLCap - 1, seedBound) + 1;
        if (lCap <= K) continue;

        for (let L = K + 1; L <= lCap; ++L) {
          ++secondBlockPairs;
          const jumpToL = (1n << BigInt(L + b)) * inverse3[L];
          const rAtL = r2 + jumpToL;
          const rawCMax = v[L];
          const cMax = maximumTruncationParameter(
            rAtL, L, b + 1, rawCMax, seedBound);
          if (cMax <= b) continue;

          for (let c = b + 1; c <= cMax; ++c) {
            ++thirdJumpProfiles;
            const coefficientC = ((1n << BigInt(c)) -
              (1n << BigInt(b))) << BigInt(L);
            const r3 = r2 - coefficientC * inverse3[L];

            // The last delay jump reaches e-1 at vertex s-1.  The fixed
            // block residue acquires the usual tail-restoration term.
            const terminalValue = r3
              + (1n << BigInt(weight - 1 + c)) * inverse3[weight - 1];
            if (!residueBelow(terminalValue, N - 2, seedBound)) continue;
            ++terminalPrefixProfiles;
            if (firstTerminalSurvivors.length < 12) {
              firstTerminalSurvivors.push({J, a, K, b, L, c,
                seedResidue: BigInt.asUintN(N - 2,
                  terminalValue).toString()});
            }
          }
        }
      }
    }
  }
}

console.log(JSON.stringify({
  probe: "four-corner exact dyadic prefix pruning at one q_s=2 row",
  weight,
  N,
  e,
  logH,
  seedBound: seedBound.toString(),
  firstCorners,
  firstPrefixCorners,
  secondRows,
  secondJumpPairs,
  secondBlockPairs,
  thirdJumpProfiles,
  terminalPrefixProfiles,
  firstTerminalSurvivors,
  warning: "necessary prefix conditions only; no reduced-modulus target test"
}, null, 2));
