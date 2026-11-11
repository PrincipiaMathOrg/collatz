#!/usr/bin/env node
"use strict";

// Exact certificate for the complete three-corner sector of the anchored
// q_s=2, b=1 First-Crossing Descent gate.  Necessary exponent-one
// cylinder inequalities give a finite search.  For each intermediate
// level a, the target residue splits as (J,a) | (K,b), and exact dyadic
// buckets query the complete displacement interval without enumerating
// the billions of compatible pairs.

function assert(ok, message) {
  if (!ok) throw new Error(message);
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

function bitLength(n) {
  assert(n > 0n, "bit length requires a positive integer");
  return n.toString(2).length;
}

function bucketParameters(width) {
  let bucketSize = 1n;
  let shift = 0;
  while (bucketSize <= width) {
    bucketSize <<= 1n;
    ++shift;
  }
  return {bucketSize, shiftBig: BigInt(shift)};
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
  assert(0n <= endpoint && endpoint < modulus, "bad circular endpoint");
  assert(0n <= width && width < modulus, "bad circular width");

  const keys = [];
  function includeKey(key) {
    for (const old of keys) if (old === key) return;
    keys.push(key);
  }
  function includeInterval(lo, hi) {
    assert(0n <= lo && lo <= hi && hi < modulus,
      "bad linear circular-query interval");
    const first = lo >> shiftBig;
    const last = hi >> shiftBig;
    assert(last - first <= 1n,
      "dyadic bucket is not wider than the target interval");
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

function circularBucketRegression() {
  let cases = 0;
  for (let modulusNumber = 2; modulusNumber <= 57; ++modulusNumber) {
    const modulus = BigInt(modulusNumber);
    for (let widthNumber = 0; widthNumber < modulusNumber; ++widthNumber) {
      const width = BigInt(widthNumber);
      const {shiftBig} = bucketParameters(width);
      const buckets = new Map();
      for (let residueNumber = 0; residueNumber < modulusNumber;
        ++residueNumber) {
        const record = {residue: BigInt(residueNumber)};
        addBucket(buckets, record.residue >> shiftBig, record);
      }
      for (let endpointNumber = 0; endpointNumber < modulusNumber;
        ++endpointNumber) {
        const endpoint = BigInt(endpointNumber);
        const found = [];
        circularBucketVisit(buckets, endpoint, width, modulus, shiftBig,
          record => {
            if (mod(endpoint - record.residue, modulus) <= width) {
              found.push(Number(record.residue));
            }
          });
        const expected = [];
        for (let residueNumber = 0; residueNumber < modulusNumber;
          ++residueNumber) {
          if (mod(endpoint - BigInt(residueNumber), modulus) <= width) {
            expected.push(residueNumber);
          }
        }
        found.sort((a, b) => a - b);
        assert(found.length === expected.length &&
          found.every((value, i) => value === expected[i]),
        `circular bucket mismatch modulo ${modulusNumber}`);
        ++cases;
      }
    }
  }
  return cases;
}

// For a nondecreasing integer sequence values[K], return
// sum_{K>=lower} max(values[K]-a,0), over K<=s-2.
function excessSuffix(values, suffix, a, lower, s) {
  let lo = Math.max(1, lower);
  let hi = s - 1;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (values[mid] > a) hi = mid;
    else lo = mid + 1;
  }
  if (lo >= s - 1) return 0;
  return suffix[lo] - a * (s - 1 - lo);
}

function directCarry(s, N, powers3, J, a, K, b) {
  let carry = 0n;
  for (let i = 0; i < s; ++i) {
    const delay = i < J ? 0 : i < K ? a :
      i < s - 1 ? b : N - s - 1;
    carry += (1n << BigInt(i + delay)) * powers3[s - 1 - i];
  }
  return carry;
}

function formulaCarry(s, N, powers3, J, a, K, b) {
  const P = powers3[s];
  const M = 1n << BigInt(N);
  const XJ = (1n << BigInt(J)) * powers3[s - J];
  const XK = (1n << BigInt(K)) * powers3[s - K];
  return P
    + ((1n << BigInt(a)) - 1n) * XJ
    + ((1n << BigInt(b)) - (1n << BigInt(a))) * XK
    - 3n * (1n << BigInt(s + b - 1))
    + M / 4n;
}

function classificationRegression(maxWeight, powers3, ceilings) {
  let weights = 0;
  let profiles = 0;
  for (let s = 3; s <= maxWeight; ++s) {
    if (ceilings[s] - ceilings[s - 1] !== 1) continue;
    ++weights;
    const N = ceilings[s];
    const terminalDelay = N - s - 1;
    const parameters = new Set();
    for (let J = 1; J <= s - 3; ++J) {
      const mJ = ceilings[J] - 1 - J;
      for (let a = 1; a <= mJ; ++a) {
        for (let K = J + 1; K <= s - 2; ++K) {
          const mK = ceilings[K] - 1 - K;
          for (let b = a + 1; b <= mK; ++b) {
            const key = `${J},${a},${K},${b}`;
            parameters.add(key);
            assert(formulaCarry(s, N, powers3, J, a, K, b) ===
              directCarry(s, N, powers3, J, a, K, b),
            `three-corner carry mismatch at s=${s}: ${key}`);
          }
        }
      }
    }

    const brute = new Set();
    const delay = Array(s).fill(0);
    delay[s - 1] = terminalDelay;
    function visit(i, previous) {
      if (i === s - 1) {
        const jumps = [];
        for (let j = 1; j < s; ++j) {
          if (delay[j] > delay[j - 1]) {
            jumps.push({row: j, level: delay[j]});
          }
        }
        if (jumps.length !== 3) return;
        assert(jumps[2].row === s - 1 &&
          jumps[2].level === terminalDelay,
        `bad terminal corner at s=${s}`);
        brute.add(`${jumps[0].row},${jumps[0].level},` +
          `${jumps[1].row},${jumps[1].level}`);
        return;
      }
      const mI = ceilings[i] - 1 - i;
      for (let value = previous; value <= mI; ++value) {
        delay[i] = value;
        visit(i + 1, value);
      }
    }
    visit(1, 0);
    assert(brute.size === parameters.size,
      `three-corner classification count failed at s=${s}`);
    for (const key of brute) {
      assert(parameters.has(key),
        `unclassified three-corner profile at s=${s}: ${key}`);
    }
    profiles += brute.size;
  }
  return {weights, profiles};
}

function analyticAudit() {
  const start = 1115n;
  const constant = 307n ** 3n * 154n ** 4n / 4n;
  assert(constant === 4068534644364652n,
    "three-corner analytic constant changed");
  assert((1n << start) > constant * start ** 105n,
    "three-corner analytic base failed");
  assert((1n << (start - 1n)) <=
    constant * (start - 1n) ** 105n,
  "three-corner analytic split changed");
  assert(2n * start ** 105n > (start + 1n) ** 105n,
    "three-corner analytic propagation failed");
  return {start: Number(start), constant};
}

function emptyStats() {
  return {
    q2Weights: 0,
    classifiedProfiles: 0n,
    cylinderProfiles: 0n,
    leftRecords: 0n,
    rightRecords: 0n,
    bucketQueries: 0n,
    bucketCandidateChecks: 0n,
    cylinderCompatibleCandidates: 0n,
    strictFormalHits: 0n,
    equalityFormalHits: 0n,
    positiveOddHits: 0n,
    countRegressionWeights: 0,
    countRegressionProfiles: 0,
    residueRegressionProfiles: 0,
    residueRegressionHits: 0,
    lastCylinderRow: null,
    firstFormalHit: null
  };
}

function finiteAudit(finiteMaximum, powers3, ceilings) {
  const stats = emptyStats();
  for (let s = 3; s <= finiteMaximum; ++s) {
    if (ceilings[s] - ceilings[s - 1] !== 1) continue;
    ++stats.q2Weights;
    assert(ceilings[s - 1] - ceilings[s - 2] === 2,
      `q_s=2 predecessor failed at s=${s}`);

    const N = ceilings[s];
    const e = N - s;
    const terminalDelay = e - 1;
    assert(ceilings[s - 2] - 1 - (s - 2) === terminalDelay - 1,
      `terminal delay appeared early at s=${s}`);
    const P = powers3[s];
    const M = 1n << BigInt(N);
    const D = M - P;
    const dMax = BigInt(Math.ceil(terminalDelay / 2));
    assert(dMax < D, `target interval too wide at s=${s}`);
    const invM = inverse(M, D);
    const tau0 = mod((P + M / 4n) * invM, D);
    const {shiftBig} = bucketParameters(dMax);

    const H = 307n * BigInt(s) ** 15n;
    const G = 154n * BigInt(s) ** 15n;
    const logH = bitLength(H) - 1;
    const maxFirstCorner = bitLength(G - 1n) - 1;
    const jCap = Math.min(s - 3, maxFirstCorner);

    const m = new Array(s - 1).fill(0);
    const v = new Array(s - 1).fill(0);
    const suffixM = new Array(s).fill(0);
    const suffixV = new Array(s).fill(0);
    for (let K = 1; K <= s - 2; ++K) {
      m[K] = ceilings[K] - 1 - K;
      const penalty = Math.max(0, s - 1 - K - logH);
      v[K] = m[K] - penalty;
    }
    for (let K = s - 2; K >= 1; --K) {
      suffixM[K] = suffixM[K + 1] + m[K];
      suffixV[K] = suffixV[K + 1] + v[K];
    }

    let rowClassified = 0;
    let rowCylinder = 0;
    let directRegressionHits = 0;
    for (let J = 1; J <= s - 3; ++J) {
      const mJ = m[J];
      for (let a = 1; a <= mJ; ++a) {
        rowClassified += excessSuffix(m, suffixM, a, J + 1, s);
        if (J <= maxFirstCorner) {
          const lastK = Math.min(s - 2, J + mJ - a + logH);
          rowCylinder +=
            excessSuffix(v, suffixV, a, J + 1, s)
            - excessSuffix(v, suffixV, a, lastK + 1, s);
        }
      }
    }
    assert(Number.isSafeInteger(rowClassified) &&
      Number.isSafeInteger(rowCylinder), `unsafe profile count at s=${s}`);
    stats.classifiedProfiles += BigInt(rowClassified);
    stats.cylinderProfiles += BigInt(rowCylinder);
    if (rowCylinder > 0) {
      stats.lastCylinderRow = {s, profiles: rowCylinder};
    }

    if (s <= 80) {
      ++stats.countRegressionWeights;
      let directClassified = 0;
      let directCylinder = 0;
      for (let J = 1; J <= s - 3; ++J) {
        const mJ = m[J];
        for (let a = 1; a <= mJ; ++a) {
          for (let K = J + 1; K <= s - 2; ++K) {
            for (let b = a + 1; b <= m[K]; ++b) {
              ++directClassified;
              if (J > maxFirstCorner) continue;
              if (K - J > mJ - a + logH) continue;
              if (s - 1 - K > m[K] - b + logH) continue;
              ++directCylinder;

              // This direct residue calculation is independent of the
              // bucket lookup.  It also audits the sign in the split
              // tau = endpoint - rightResidue.
              const C = formulaCarry(s, N, powers3, J, a, K, b);
              const directTau = mod(C * invM, D);
              const XJ = (1n << BigInt(J)) * powers3[s - J];
              const XK = (1n << BigInt(K)) * powers3[s - K];
              const left = ((1n << BigInt(a)) - 1n) * XJ;
              const right = ((1n << BigInt(b)) -
                (1n << BigInt(a))) * XK
                - 3n * (1n << BigInt(s + b - 1));
              const endpoint = mod(tau0 + left * invM, D);
              const rightResidue = mod(-right * invM, D);
              assert(mod(endpoint - rightResidue, D) === directTau,
                `residue split failed at s=${s},J=${J},a=${a},` +
                `K=${K},b=${b}`);
              ++stats.residueRegressionProfiles;
              if (directTau <= dMax) {
                ++directRegressionHits;
                ++stats.residueRegressionHits;
              }
            }
          }
        }
      }
      assert(directClassified === rowClassified,
        `classified count compression failed at s=${s}`);
      assert(directCylinder === rowCylinder,
        `cylinder count compression failed at s=${s}`);
      stats.countRegressionProfiles += directClassified;
    }

    if (jCap < 1 || rowCylinder === 0) continue;

    const terminalScaled = mod(
      (3n * (1n << BigInt(s - 1))) * invM, D);
    const scaledX = new Array(s - 1).fill(0n);
    const scaledY = new Array(s - 1).fill(0n);
    for (let i = 1; i <= s - 2; ++i) {
      const X = (1n << BigInt(i)) * powers3[s - i];
      scaledX[i] = mod(X * invM, D);
      scaledY[i] = mod(scaledX[i] - terminalScaled, D);
    }

    const maxA = m[jCap];
    let rowFormalHits = 0;
    for (let a = 1; a <= maxA; ++a) {
      let jMin = 1;
      while (jMin <= jCap && m[jMin] < a) ++jMin;
      if (jMin > jCap) continue;
      const kMin = jMin + 1;
      const kMax = Math.min(s - 2,
        jCap + m[jCap] - a + logH);
      if (kMin > kMax) continue;

      const buckets = new Map();
      for (let K = kMin; K <= kMax; ++K) {
        const maxB = v[K];
        if (maxB <= a) continue;
        const aX = mod(scaledX[K] << BigInt(a), D);
        let bY = mod(scaledY[K] << BigInt(a + 1), D);
        for (let b = a + 1; b <= maxB; ++b) {
          const residue = mod(aX - bY, D);
          addBucket(buckets, residue >> shiftBig, {K, b, residue});
          ++stats.rightRecords;
          bY <<= 1n;
          if (bY >= D) bY -= D;
        }
      }

      for (let J = jMin; J <= jCap; ++J) {
        if (m[J] < a) continue;
        ++stats.leftRecords;
        ++stats.bucketQueries;
        const leftResidue = mod(
          (scaledX[J] << BigInt(a)) - scaledX[J], D);
        const endpoint = mod(tau0 + leftResidue, D);
        circularBucketVisit(buckets, endpoint, dMax, D, shiftBig,
          record => {
            ++stats.bucketCandidateChecks;
            const d = mod(endpoint - record.residue, D);
            if (d > dMax) return;
            if (record.K <= J) return;
            if (record.K - J > m[J] - a + logH) return;
            ++stats.cylinderCompatibleCandidates;
            ++rowFormalHits;
            if (d === 0n) ++stats.equalityFormalHits;
            else ++stats.strictFormalHits;

            const C = formulaCarry(s, N, powers3,
              J, a, record.K, record.b);
            assert(mod(C * invM, D) === d,
              `reported residue does not match carry at s=${s}`);
            const numerator = C - M * d;
            assert(numerator % D === 0n,
              `reported formal target is not integral at s=${s}`);
            const n = numerator / D;
            if (n > 0n) {
              assert((n & 1n) === 1n,
                `positive formal target is not odd at s=${s}`);
              ++stats.positiveOddHits;
            }
            if (stats.firstFormalHit === null) {
              stats.firstFormalHit = {
                s, N, J, a, K: record.K, b: record.b,
                d: d.toString(), n: n.toString()
              };
            }
          });
      }
    }
    if (s <= 80) {
      assert(rowFormalHits === directRegressionHits,
        `MITM/direct residue count mismatch at s=${s}`);
    }
  }
  return stats;
}

const analytic = analyticAudit();
const finiteMaximum = analytic.start - 1;
const powers3 = [1n];
const ceilings = [0];
for (let i = 1; i <= finiteMaximum; ++i) {
  powers3.push(powers3[i - 1] * 3n);
  ceilings.push(bitLength(powers3[i]));
}
const circularRegressionCases = circularBucketRegression();
const classification = classificationRegression(12, powers3, ceilings);
const stats = finiteAudit(finiteMaximum, powers3, ceilings);

const expected = {
  q2Weights: 462,
  classifiedProfiles: 4021454334444n,
  cylinderProfiles: 4749737770n,
  leftRecords: 1527065n,
  rightRecords: 120702889n,
  countRegressionWeights: 33,
  countRegressionProfiles: 6933258,
  classificationWeights: 4,
  classificationProfiles: 80,
  circularRegressionCases: 63364
};
for (const field of ["q2Weights", "classifiedProfiles", "cylinderProfiles",
  "leftRecords", "rightRecords", "countRegressionWeights",
  "countRegressionProfiles"]) {
  assert(stats[field] === expected[field],
    `three-corner coverage changed at ${field}`);
}
assert(classification.weights === expected.classificationWeights,
  "three-corner classification weight coverage changed");
assert(classification.profiles === expected.classificationProfiles,
  "three-corner classification profile coverage changed");
assert(circularRegressionCases === expected.circularRegressionCases,
  "circular bucket regression coverage changed");
assert(stats.lastCylinderRow !== null &&
  stats.lastCylinderRow.s === 769 && stats.lastCylinderRow.profiles === 1,
"last cylinder-admissible row changed");
assert(stats.bucketQueries === stats.leftRecords,
  "not every left half was queried");
assert(stats.bucketCandidateChecks === 0n,
  "a three-corner dyadic residue bucket intersects the target interval");
assert(stats.cylinderCompatibleCandidates === 0n,
  "a cylinder-compatible three-corner target residue exists");
assert(stats.strictFormalHits === 0n,
  "a strict three-corner formal target exists");
assert(stats.equalityFormalHits === 0n,
  "a three-corner equality target exists");
assert(stats.positiveOddHits === 0n,
  "a positive odd three-corner target exists");
assert(stats.residueRegressionHits === 0,
  "a small-depth direct three-corner target residue exists");

console.log(JSON.stringify({
  certificate: "complete q_s=2 b=1 three-corner exclusion",
  finiteMaximum,
  analyticStart: analytic.start,
  analyticInequality:
    `2^s < ${analytic.constant}*s^105 for every target`,
  q2Weights: stats.q2Weights,
  classifiedProfiles: stats.classifiedProfiles.toString(),
  cylinderProfiles: stats.cylinderProfiles.toString(),
  mitmLeftRecords: stats.leftRecords.toString(),
  mitmRightRecords: stats.rightRecords.toString(),
  bucketQueries: stats.bucketQueries.toString(),
  bucketCandidateChecks: stats.bucketCandidateChecks.toString(),
  cylinderCompatibleCandidates:
    stats.cylinderCompatibleCandidates.toString(),
  strictFormalHits: stats.strictFormalHits.toString(),
  equalityFormalHits: stats.equalityFormalHits.toString(),
  positiveOddHits: stats.positiveOddHits.toString(),
  lastCylinderRow: stats.lastCylinderRow,
  countRegressionWeights: stats.countRegressionWeights,
  countRegressionProfiles: stats.countRegressionProfiles,
  residueRegressionProfiles: stats.residueRegressionProfiles,
  residueRegressionHits: stats.residueRegressionHits,
  classificationRegressionWeights: classification.weights,
  classificationRegressionProfiles: classification.profiles,
  circularBucketRegressionCases: circularRegressionCases,
  firstFormalHit: stats.firstFormalHit,
  theorem:
    "every hypothetical q_s=2 b=1 strict or equality target has at least four corners"
}, null, 2));
