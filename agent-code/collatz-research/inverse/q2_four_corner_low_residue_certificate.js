#!/usr/bin/env node
"use strict";

// Exact fixed-b meet-in-the-middle certificate for all four-corner
// q_s=2, b=1 rows up to a chosen low-weight cutoff.  It evaluates the
// complete reduced-modulus strict/equality target interval after all four
// necessary exponent-one cylinder bounds.

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

function addBucket(buckets, key, record) {
  const old = buckets.get(key);
  if (old === undefined) {
    buckets.set(key, record);
  } else if (old.records !== undefined) {
    old.records.push(record);
  } else {
    buckets.set(key, {records: [old, record]});
  }
}

function visitBucketValue(value, visitor) {
  if (value === undefined) return;
  if (value.records !== undefined) {
    for (const record of value.records) visitor(record);
  } else {
    visitor(value);
  }
}

function circularBucketVisit(buckets, endpoint, width, modulus,
  shiftBig, visitor) {
  const keys = [];
  function includeKey(key) {
    for (const old of keys) if (old === key) return;
    keys.push(key);
  }
  function includeInterval(lo, hi) {
    const first = lo >> shiftBig;
    const last = hi >> shiftBig;
    assert(last - first <= 1n, "target interval crosses too many buckets");
    includeKey(first);
    if (last !== first) includeKey(last);
  }
  if (endpoint >= width) {
    includeInterval(endpoint - width, endpoint);
  } else {
    includeInterval(0n, endpoint);
    includeInterval(modulus - (width - endpoint), modulus - 1n);
  }
  for (const key of keys) visitBucketValue(buckets.get(key), visitor);
}

function firstGreater(values, threshold, lo, hi) {
  let left = lo;
  let right = hi + 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (values[mid] > threshold) right = mid;
    else left = mid + 1;
  }
  return left;
}

const finiteMaximum = Number(process.argv[2] || 73);
assert(Number.isInteger(finiteMaximum) && finiteMaximum >= 4,
  "usage: q2_four_corner_low_residue_certificate.js MAX_WEIGHT");

const powers3 = [1n];
const ceilings = [0];
for (let i = 1; i <= finiteMaximum; ++i) {
  powers3.push(powers3[i - 1] * 3n);
  ceilings.push(bitLength(powers3[i]));
}

let q2Weights = 0;
let cylinderProfiles = 0n;
let fixedBRightRecords = 0n;
let leftQueries = 0n;
let bucketCandidateChecks = 0n;
let cylinderCompatibleCandidates = 0n;
let strictFormalHits = 0n;
let equalityFormalHits = 0n;
let positiveOddHits = 0n;
let carryRegressionProfiles = 0;
let terminalSplitRegressionProfiles = 0;
const firstFormalHits = [];

for (let weight = 4; weight <= finiteMaximum; ++weight) {
  if (ceilings[weight] - ceilings[weight - 1] !== 1) continue;
  ++q2Weights;
  const N = ceilings[weight];
  const e = N - weight;
  const P = powers3[weight];
  const M = 1n << BigInt(N);
  const D = M - P;
  const invM = inverse(M, D);
  const dMax = BigInt(Math.ceil((e - 1) / 2));
  assert(dMax < D, `target interval too wide at weight ${weight}`);
  const shiftBig = BigInt(bitLength(dMax));
  const tauConstant = mod((P + M / 4n) * invM, D);

  const H = 307n * BigInt(weight) ** 15n;
  const G = 154n * BigInt(weight) ** 15n;
  const logH = bitLength(H) - 1;
  const maxFirstCorner = bitLength(G - 1n) - 1;
  const jCap = Math.min(weight - 4, maxFirstCorner);
  const m = Array(weight).fill(0);
  const v = Array(weight).fill(0);
  const prefixV = Array(weight).fill(0);
  const scaledX = Array(weight).fill(0n);
  for (let i = 1; i <= weight - 2; ++i) {
    m[i] = ceilings[i] - 1 - i;
    v[i] = m[i] - Math.max(0, weight - 1 - i - logH);
    prefixV[i] = prefixV[i - 1] + v[i];
    const X = (1n << BigInt(i)) * powers3[weight - i];
    scaledX[i] = mod(X * invM, D);
  }

  const maximumLevel = m[weight - 2];
  for (let b = 2; b <= maximumLevel; ++b) {
    const buckets = new Map();
    for (let L = 3; L <= weight - 2; ++L) {
      const cMax = v[L];
      if (cMax <= b) continue;
      const terminalBase = mod(3n *
        (1n << BigInt(weight - 1)) * invM, D);
      const lUnit = scaledX[L];
      const constant = mod((1n << BigInt(b)) * lUnit, D);
      const slope = mod(terminalBase - lUnit, D);
      let cTerm = mod(slope << BigInt(b + 1), D);
      for (let c = b + 1; c <= cMax; ++c) {
        // rightResidue = -R*M^{-1}, where
        // R=(2^c-2^b)X_L-3*2^(weight+c-1).
        const residue = mod(constant + cTerm, D);
        addBucket(buckets, residue >> shiftBig, {L, c, residue});
        ++fixedBRightRecords;
        cTerm <<= 1n;
        if (cTerm >= D) cTerm -= D;
      }
    }

    for (let J = 1; J <= jCap; ++J) {
      for (let a = 1; a < b && a <= m[J]; ++a) {
        const kCap = Math.min(weight - 3,
          J + m[J] - a + logH);
        const leftJ = mod(((1n << BigInt(a)) - 1n) *
          scaledX[J], D);
        for (let K = J + 1; K <= kCap; ++K) {
          if (b > m[K]) continue;
          const leftK = mod(((1n << BigInt(b)) -
            (1n << BigInt(a))) * scaledX[K], D);
          const endpoint = mod(tauConstant + leftJ + leftK, D);
          ++leftQueries;

          const lCap = Math.min(weight - 2,
            K + m[K] - b + logH);
          if (lCap > K) {
            const lStart = firstGreater(v, b, K + 1, lCap);
            if (lStart <= lCap) {
              const compatible = prefixV[lCap] - prefixV[lStart - 1]
                - b * (lCap - lStart + 1);
              cylinderProfiles += BigInt(compatible);
            }
          }

          circularBucketVisit(buckets, endpoint, dMax, D, shiftBig,
            record => {
              ++bucketCandidateChecks;
              const d = mod(endpoint - record.residue, D);
              if (d > dMax) return;
              if (record.L <= K) return;
              if (record.L - K > m[K] - b + logH) return;
              ++cylinderCompatibleCandidates;
              if (d === 0n) ++equalityFormalHits;
              else ++strictFormalHits;

              const XJ = (1n << BigInt(J)) *
                powers3[weight - J];
              const XK = (1n << BigInt(K)) *
                powers3[weight - K];
              const XL = (1n << BigInt(record.L)) *
                powers3[weight - record.L];
              const carry = P
                + ((1n << BigInt(a)) - 1n) * XJ
                + ((1n << BigInt(b)) -
                  (1n << BigInt(a))) * XK
                + ((1n << BigInt(record.c)) -
                  (1n << BigInt(b))) * XL
                - 3n * (1n << BigInt(weight + record.c - 1))
                + M / 4n;
              assert(mod(carry * invM, D) === d,
                `four-corner carry split failed at weight ${weight}`);
              const numerator = carry - M * d;
              assert(numerator % D === 0n,
                "reported formal target is not integral");
              const seed = numerator / D;
              if (seed > 0n) {
                assert((seed & 1n) === 1n,
                  "positive formal target seed is not odd");
                ++positiveOddHits;
              }
              if (firstFormalHits.length < 12) {
                firstFormalHits.push({
                  weight, J, a, K, b, L: record.L, c: record.c,
                  d: d.toString(), seed: seed.toString()
                });
              }
            });
        }
      }
    }
  }

  // Direct cell-by-cell carry regression on the complete tiny boards.
  if (weight <= 12) {
    for (let J = 1; J <= weight - 4; ++J) {
      for (let a = 1; a <= m[J]; ++a) {
        for (let K = J + 1; K <= weight - 3; ++K) {
          for (let b = a + 1; b <= m[K]; ++b) {
            for (let L = K + 1; L <= weight - 2; ++L) {
              for (let c = b + 1; c <= m[L]; ++c) {
                let direct = 0n;
                for (let i = 0; i < weight; ++i) {
                  const delay = i < J ? 0 : i < K ? a :
                    i < L ? b : i < weight - 1 ? c : e - 1;
                  direct += (1n << BigInt(i + delay)) *
                    powers3[weight - 1 - i];
                }
                const XJ = (1n << BigInt(J)) *
                  powers3[weight - J];
                const XK = (1n << BigInt(K)) *
                  powers3[weight - K];
                const XL = (1n << BigInt(L)) * powers3[weight - L];
                const formula = P
                  + ((1n << BigInt(a)) - 1n) * XJ
                  + ((1n << BigInt(b)) - (1n << BigInt(a))) * XK
                  + ((1n << BigInt(c)) - (1n << BigInt(b))) * XL
                  - 3n * (1n << BigInt(weight + c - 1)) + M / 4n;
                assert(direct === formula,
                  `direct carry regression failed at weight ${weight}`);
                ++carryRegressionProfiles;

                // Independently compare the terminal-seed split used by
                // the high-row certificate with the direct prefix carry.
                const seedModulus = 1n << BigInt(N - 2);
                const inv3 = index => inverse(powers3[index], seedModulus);
                let prefixCarry = 0n;
                for (let i = 0; i <= weight - 2; ++i) {
                  const delay = i < J ? 0 : i < K ? a :
                    i < L ? b : c;
                  prefixCarry += (1n << BigInt(i + delay)) *
                    powers3[weight - 2 - i];
                }
                const directSeed = mod(-prefixCarry * inv3(weight - 1),
                  seedModulus);
                const r1 = mod(-1n - (((1n << BigInt(a)) - 1n) <<
                  BigInt(J)) * inv3(J), seedModulus);
                const coefficientB = ((1n << BigInt(b)) -
                  (1n << BigInt(a))) << BigInt(K);
                const endpoint = mod(r1 - coefficientB * inv3(K),
                  seedModulus);
                const lUnit = mod((1n << BigInt(L)) * inv3(L),
                  seedModulus);
                const terminalUnit = mod((1n << BigInt(weight - 1)) *
                  inv3(weight - 1), seedModulus);
                const terminalRight = mod((1n << BigInt(b)) * lUnit +
                  (1n << BigInt(c)) *
                  (terminalUnit - lUnit), seedModulus);
                const splitSeed = mod(endpoint + terminalRight,
                  seedModulus);
                assert(splitSeed === directSeed,
                  `terminal seed split regression failed at weight ${weight}`);
                ++terminalSplitRegressionProfiles;
              }
            }
          }
        }
      }
    }
  }
}

assert(strictFormalHits === 0n,
  "strict low-weight four-corner target found");
assert(equalityFormalHits === 0n,
  "low-weight four-corner equality target found");

if (finiteMaximum === 73) {
  assert(q2Weights === 29, "low-weight q2 row count changed");
  assert(cylinderProfiles === 699213830n,
    "low-weight cylinder count changed");
  assert(fixedBRightRecords === 134788n,
    "low-weight right-record count changed");
  assert(leftQueries === 3975154n,
    "low-weight left-query count changed");
  assert(bucketCandidateChecks === 0n &&
    cylinderCompatibleCandidates === 0n,
  "low-weight residue intersection changed");
  assert(carryRegressionProfiles === 76 &&
    terminalSplitRegressionProfiles === 76,
  "low-weight direct regression changed");
}

console.log(JSON.stringify({
  certificate: "complete low-weight four-corner reduced residue exclusion",
  finiteMaximum,
  q2Weights,
  cylinderProfiles: cylinderProfiles.toString(),
  fixedBRightRecords: fixedBRightRecords.toString(),
  leftQueries: leftQueries.toString(),
  bucketCandidateChecks: bucketCandidateChecks.toString(),
  cylinderCompatibleCandidates: cylinderCompatibleCandidates.toString(),
  strictFormalHits: strictFormalHits.toString(),
  equalityFormalHits: equalityFormalHits.toString(),
  positiveOddHits: positiveOddHits.toString(),
  carryRegressionProfiles,
  firstFormalHits,
  terminalSplitRegressionProfiles,
  theorem: `no four-corner strict or equality target through weight ${finiteMaximum}`
}, null, 2));
