#!/usr/bin/env node
"use strict";

// Exact fixed-b meet-in-the-middle certificate for the terminal dyadic
// seed residue of one four-corner q_s=2, b=1 row.  A target seed n satisfies
// n < (153^10*s^143)^(1/10).  The certificate queries that complete integer
// interval modulo 2^(N-2), before the final displacement condition.

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

function circularBucketKeys(endpoint, width, modulus, shiftBig) {
  const keys = [];
  function includeKey(key) {
    for (const old of keys) if (old === key) return;
    keys.push(key);
  }
  function includeInterval(lo, hi) {
    const first = lo >> shiftBig;
    const last = hi >> shiftBig;
    assert(last - first <= 1n, "seed interval crosses too many buckets");
    includeKey(first);
    if (last !== first) includeKey(last);
  }
  if (endpoint >= width) {
    includeInterval(endpoint - width, endpoint);
  } else {
    includeInterval(0n, endpoint);
    includeInterval(modulus - (width - endpoint), modulus - 1n);
  }
  return keys;
}

function residueBelow(value, bits, bound) {
  return BigInt.asUintN(bits, value) < bound;
}

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
  "usage: q2_four_corner_terminal_seed_row_certificate.js WEIGHT");

const powers3 = [1n];
const ceilings = [0];
for (let i = 1; i <= weight; ++i) {
  powers3.push(powers3[i - 1] * 3n);
  ceilings.push(bitLength(powers3[i]));
}
assert(ceilings[weight] - ceilings[weight - 1] === 1,
  `weight ${weight} is not q_s=2`);

const N = ceilings[weight];
const e = N - weight;
const P = powers3[weight];
const M = 1n << BigInt(N);
const D = M - P;
const inverseMReduced = inverse(M, D);
const dMax = BigInt(Math.ceil((e - 1) / 2));
const seedModulus = 1n << BigInt(N - 2);
const H = 307n * BigInt(weight) ** 15n;
const seedBound = ceilTenthRoot(153n ** 10n * BigInt(weight) ** 143n);
const seedWidth = seedBound - 1n;
assert(seedBound < seedModulus, "seed interval is not proper");
const shiftBig = BigInt(bitLength(seedWidth));
const projectionBits = Number(process.argv[3] || 48);
assert(Number.isInteger(projectionBits) && projectionBits >= 1 &&
  projectionBits <= 52, "projection bits must lie in [1,52]");
assert(N - 2 - Number(shiftBig) >= projectionBits,
  "full bucket key is shorter than its projection");
const projectionModulus = 1n << (shiftBig + BigInt(projectionBits));
const inverse3Full = powers3.map(value => inverse(value, seedModulus));
const inverse3Projection = powers3.map(value =>
  inverse(value, projectionModulus));
const logH = bitLength(H) - 1;
// Since 2^J divides n+1 and n<B_s, the sharp condition is 2^J<=B_s.
// Using B_s-1 would miss the endpoint if B_s were itself a power of two.
const maxFirstCorner = bitLength(seedBound) - 1;
const jCap = Math.min(weight - 4, maxFirstCorner);

const m = Array(weight).fill(0);
const v = Array(weight).fill(0);
for (let i = 1; i <= weight - 2; ++i) {
  m[i] = ceilings[i] - 1 - i;
  v[i] = m[i] - Math.max(0, weight - 1 - i - logH);
}

const firstRecords = [];
let maximumCentralLevel = 0;
for (let J = 1; J <= jCap; ++J) {
  for (let a = 1; a <= m[J]; ++a) {
    const coefficientA = ((1n << BigInt(a)) - 1n) << BigInt(J);
    const r1Full = -1n - coefficientA * inverse3Full[J];
    const r1Projection = mod(
      -1n - coefficientA * inverse3Projection[J], projectionModulus);
    const rawKCap = Math.min(weight - 3,
      J + m[J] - a + logH);
    if (rawKCap <= J) continue;
    const kCap = maximumTruncationParameter(
      r1Full, a - 1, J, rawKCap - 1, seedBound) + 1;
    if (kCap <= J) continue;
    maximumCentralLevel = Math.max(maximumCentralLevel, m[kCap]);
    firstRecords.push({J, a, kCap, r1Full, r1Projection});
  }
}

let rightRecords = 0;
let leftQueries = 0;
let occupiedBucketHits = 0;
const firstOccupiedQueries = [];
const occupiedQueries = [];

const terminalUnit = mod((1n << BigInt(weight - 1)) *
  inverse3Projection[weight - 1], projectionModulus);

for (let b = 2; b <= maximumCentralLevel; ++b) {
  const bucketKeys = new Set();
  for (let L = 3; L <= weight - 2; ++L) {
    const cMax = v[L];
    if (cMax <= b) continue;
    const lUnit = mod((1n << BigInt(L)) *
      inverse3Projection[L], projectionModulus);
    const constant = mod((1n << BigInt(b)) * lUnit,
      projectionModulus);
    const slope = mod(terminalUnit - lUnit, projectionModulus);
    let cTerm = mod(slope << BigInt(b + 1), projectionModulus);
    for (let c = b + 1; c <= cMax; ++c) {
      const terminalRight = mod(constant + cTerm, projectionModulus);
      const residue = mod(-terminalRight, projectionModulus);
      bucketKeys.add(Number(residue >> shiftBig));
      ++rightRecords;
      cTerm <<= 1n;
      if (cTerm >= projectionModulus) cTerm -= projectionModulus;
    }
  }

  for (const first of firstRecords) {
    if (first.a >= b) continue;
    for (let K = first.J + 1; K <= first.kCap; ++K) {
      if (b > m[K]) continue;
      const jumpToK = (1n << BigInt(K + first.a)) * inverse3Full[K];
      const rAtK = first.r1Full + jumpToK;
      if (!residueBelow(rAtK, K + b, seedBound)) continue;

      const coefficientB = ((1n << BigInt(b)) -
        (1n << BigInt(first.a))) << BigInt(K);
      const endpoint = mod(first.r1Projection -
        coefficientB * inverse3Projection[K], projectionModulus);
      ++leftQueries;
      for (const key of circularBucketKeys(endpoint, seedWidth,
        projectionModulus, shiftBig)) {
        const projectedKey = Number(key);
        if (!bucketKeys.has(projectedKey)) continue;
        ++occupiedBucketHits;
        occupiedQueries.push({
          J: first.J, a: first.a, K, b,
          r1Full: first.r1Full,
          projectedKey
        });
        if (firstOccupiedQueries.length < 12) {
          firstOccupiedQueries.push({
            J: first.J, a: first.a, K, b, key: projectedKey
          });
        }
      }
    }
  }
}

// Refine only occupied projected keys using the complete modulus and full
// right records.  This converts projection collisions and coarse-bucket
// collisions into an exact list of small terminal seed residues.
let exactRecordChecks = 0;
let exactSmallTerminalSeeds = 0;
let exactCylinderCandidates = 0;
let reducedResidueChecks = 0;
let strictFormalHits = 0;
let equalityFormalHits = 0;
const firstExactCandidates = [];
const terminalUnitFull = mod((1n << BigInt(weight - 1)) *
  inverse3Full[weight - 1], seedModulus);

for (const query of occupiedQueries) {
  const coefficientB = ((1n << BigInt(query.b)) -
    (1n << BigInt(query.a))) << BigInt(query.K);
  const endpointFull = mod(query.r1Full -
    coefficientB * inverse3Full[query.K], seedModulus);
  for (let L = 3; L <= weight - 2; ++L) {
    const cMax = v[L];
    if (cMax <= query.b) continue;
    const lUnitFull = mod((1n << BigInt(L)) *
      inverse3Full[L], seedModulus);
    const constantFull = mod((1n << BigInt(query.b)) * lUnitFull,
      seedModulus);
    const slopeFull = mod(terminalUnitFull - lUnitFull, seedModulus);
    let cTermFull = mod(slopeFull << BigInt(query.b + 1), seedModulus);
    for (let c = query.b + 1; c <= cMax; ++c) {
      const terminalRightFull = mod(constantFull + cTermFull,
        seedModulus);
      const rightResidueFull = mod(-terminalRightFull, seedModulus);
      ++exactRecordChecks;
      const seed = mod(endpointFull - rightResidueFull, seedModulus);
      if (seed < seedBound) {
        ++exactSmallTerminalSeeds;
        if (L > query.K &&
            L - query.K <= m[query.K] - query.b + logH) {
          ++exactCylinderCandidates;
          ++reducedResidueChecks;

          // Audit the terminal-prefix seed directly from its carry.
          let prefixCarry = 0n;
          for (let i = 0; i <= weight - 2; ++i) {
            const delay = i < query.J ? 0 : i < query.K ? query.a :
              i < L ? query.b : c;
            prefixCarry += (1n << BigInt(i + delay)) *
              powers3[weight - 2 - i];
          }
          const directSeed = mod(-prefixCarry *
            inverse3Full[weight - 1], seedModulus);
          assert(directSeed === seed,
            `terminal seed split failed at weight ${weight}`);

          const XJ = (1n << BigInt(query.J)) *
            powers3[weight - query.J];
          const XK = (1n << BigInt(query.K)) *
            powers3[weight - query.K];
          const XL = (1n << BigInt(L)) * powers3[weight - L];
          const carry = P
            + ((1n << BigInt(query.a)) - 1n) * XJ
            + ((1n << BigInt(query.b)) -
              (1n << BigInt(query.a))) * XK
            + ((1n << BigInt(c)) -
              (1n << BigInt(query.b))) * XL
            - 3n * (1n << BigInt(weight + c - 1))
            + M / 4n;
          const d = mod(carry * inverseMReduced, D);
          if (d <= dMax) {
            if (d === 0n) ++equalityFormalHits;
            else ++strictFormalHits;
            const numerator = carry - M * d;
            assert(numerator % D === 0n,
              "reported reduced target is not integral");
            const targetSeed = numerator / D;
            assert(targetSeed === seed,
              "dyadic and reduced target seeds disagree");
          }
          if (firstExactCandidates.length < 12) {
            firstExactCandidates.push({
              J: query.J, a: query.a, K: query.K, b: query.b,
              L, c, seed: seed.toString(), d: d.toString(),
              dMax: dMax.toString()
            });
          }
        }
      }
      cTermFull <<= 1n;
      if (cTermFull >= seedModulus) cTermFull -= seedModulus;
    }
  }
}

assert(strictFormalHits === 0,
  `strict four-corner target found at weight ${weight}`);
assert(equalityFormalHits === 0,
  `four-corner equality target found at weight ${weight}`);

console.log(JSON.stringify({
  certificate: "one-row four-corner terminal seed MITM",
  weight,
  N,
  e,
  seedBound: seedBound.toString(),
  projectionBits,
  projectionModulusBits: Number(shiftBig) + projectionBits,
  firstRecords: firstRecords.length,
  maximumCentralLevel,
  rightRecords,
  leftQueries,
  occupiedBucketHits,
  firstOccupiedQueries,
  exactRecordChecks,
  exactSmallTerminalSeeds,
  exactCylinderCandidates,
  reducedResidueChecks,
  strictFormalHits,
  equalityFormalHits,
  firstExactCandidates,
  outcome: exactCylinderCandidates === 0 ?
    "row excluded by terminal-seed buckets and exact sparse refinement" :
    "row excluded after exact terminal-seed and reduced-residue checks"
}, null, 2));
