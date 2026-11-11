#!/usr/bin/env node
"use strict";

// Exact count probe for the complete four-corner q_s=2, b=1 sector.
// It uses the central corner (K,b) to factor every cylinder-admissible
// profile into a left pair (J,a) and a right pair (L,c).  No target
// residues are evaluated here.

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

const analyticStart = Number(process.argv[2] || 2672);
const seedPrefixPrune = process.argv.includes("--seed-prefix");
const finiteMaximum = analyticStart - 1;
const analyticConstant = 307n ** 7n * 154n ** 8n / 64n;
assert(analyticConstant === 1270440766196347358781302338474732n,
  "four-corner analytic constant changed");
assert((1n << BigInt(analyticStart)) >
  analyticConstant * BigInt(analyticStart) ** 225n,
"four-corner analytic base failed");
assert((1n << BigInt(finiteMaximum)) <=
  analyticConstant * BigInt(finiteMaximum) ** 225n,
"four-corner analytic split changed");
assert(2n * BigInt(analyticStart) ** 225n >
  BigInt(analyticStart + 1) ** 225n,
"four-corner analytic propagation failed");

const powers3 = [1n];
const ceilings = [0];
for (let i = 1; i <= finiteMaximum; ++i) {
  powers3.push(powers3[i - 1] * 3n);
  ceilings.push(bitLength(powers3[i]));
}

// The first two constant-delay blocks determine one fixed 2-adic seed
// residue for each first corner (J,a).  We compute inverses at a precision
// safely above every prefix modulus in the finite audit.
const inversePrecision = 4096;
const inverseModulus = 1n << BigInt(inversePrecision);
const inverse3Power = [];
if (seedPrefixPrune) {
  for (let J = 1; J <= 256; ++J) {
    inverse3Power[J] = inverse(powers3[J], inverseModulus);
  }
}

function seedPrefixKCap(J, a, rawKCap, seedBound) {
  if (!seedPrefixPrune) return rawKCap;
  const maximumBits = rawKCap - 1 + a;
  assert(maximumBits < inversePrecision,
    "seed-prefix inverse precision exhausted");
  const coefficient = ((1n << BigInt(a)) - 1n) << BigInt(J);
  const fullResidue = BigInt.asUintN(maximumBits,
    -1n - coefficient * inverse3Power[J]);
  const firstBits = J + a;
  const firstResidue = BigInt.asUintN(firstBits, fullResidue);
  if (firstResidue >= seedBound) return J;
  if (fullResidue < seedBound) return rawKCap;

  // Truncations of one 2-adic integer are nondecreasing.  Find the largest
  // prefix modulus q for which the least residue remains below the target
  // seed envelope.  At row K-1, q=K-1+a.
  let lo = firstBits;
  let hi = maximumBits;
  while (lo + 1 < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (BigInt.asUintN(mid, fullResidue) < seedBound) lo = mid;
    else hi = mid;
  }
  return lo - a + 1;
}

let q2Weights = 0;
let cylinderProfiles = 0n;
let centralBatches = 0n;
let centralLeftRecords = 0n;
let centralRightRecords = 0n;
let fixedBRightRecords = 0n;
let fixedKLeftRecords = 0n;
let lastNonzeroRow = null;
let maximumRow = null;
let maximumRecordRow = null;
let regressionWeights = 0;
let regressionProfiles = 0;

for (let s = 4; s <= finiteMaximum; ++s) {
  if (ceilings[s] - ceilings[s - 1] !== 1) continue;
  ++q2Weights;
  assert(ceilings[s - 1] - ceilings[s - 2] === 2,
    `q_s=2 predecessor failed at s=${s}`);

  const H = 307n * BigInt(s) ** 15n;
  const G = 154n * BigInt(s) ** 15n;
  const exactSeedBound = seedPrefixPrune ?
    ceilTenthRoot(153n ** 10n * BigInt(s) ** 143n) : G;
  const logH = bitLength(H) - 1;
  const maxFirstCorner = bitLength(G - 1n) - 1;
  const jCap = Math.min(s - 4, maxFirstCorner);
  if (jCap < 1) continue;

  const m = new Array(s - 1).fill(0);
  const v = new Array(s - 1).fill(0);
  const prefixV = new Array(s - 1).fill(0);
  for (let i = 1; i <= s - 2; ++i) {
    m[i] = ceilings[i] - 1 - i;
    const terminalPenalty = Math.max(0, s - 1 - i - logH);
    v[i] = m[i] - terminalPenalty;
    prefixV[i] = prefixV[i - 1] + v[i];
  }
  if (m[jCap] < 1) continue;

  const kCap = Math.min(s - 3,
    jCap + m[jCap] - 1 + logH);
  if (kCap <= jCap) continue;
  const maximumLevel = m[kCap];
  const difference = Array.from({length: kCap + 2},
    () => new Int32Array(maximumLevel + 2));

  // A first corner (J,a) contributes to every central row K in its exact
  // second-cylinder interval.  Difference arrays retain the level a.
  for (let J = 1; J <= jCap; ++J) {
    const mJ = m[J];
    for (let a = 1; a <= mJ; ++a) {
      const kLo = J + 1;
      const rawKHi = Math.min(kCap, J + mJ - a + logH);
      const kHi = seedPrefixKCap(J, a, rawKHi, exactSeedBound);
      if (kLo > kHi) continue;
      ++difference[kLo][a];
      --difference[kHi + 1][a];
    }
  }

  const activeFirstLevels = new Int32Array(maximumLevel + 2);
  const fixedBIntervals = Array.from({length: maximumLevel + 2},
    () => new Int32Array(s));
  let rowProfiles = 0;
  let rowLeft = 0;
  let rowRight = 0;
  let rowBatches = 0;
  let rowFixedKLeft = 0;

  for (let K = 2; K <= kCap; ++K) {
    for (let a = 1; a < activeFirstLevels.length; ++a) {
      activeFirstLevels[a] += difference[K][a];
    }
    let distinctLeftAtK = 0;
    for (let a = 1; a < activeFirstLevels.length; ++a) {
      distinctLeftAtK += activeFirstLevels[a];
    }
    rowFixedKLeft += distinctLeftAtK;
    let leftCount = 0;
    for (let b = 2; b <= m[K]; ++b) {
      leftCount += activeFirstLevels[b - 1];
      if (leftCount === 0) continue;

      const lCap = Math.min(s - 2, K + m[K] - b + logH);
      if (lCap <= K) continue;
      const lStart = firstGreater(v, b, K + 1, lCap);
      if (lStart > lCap) continue;
      const rightCount = prefixV[lCap] - prefixV[lStart - 1]
        - b * (lCap - lStart + 1);
      if (rightCount <= 0) continue;

      const pairCount = leftCount * rightCount;
      assert(Number.isSafeInteger(pairCount),
        `unsafe four-corner row contribution at s=${s},K=${K},b=${b}`);
      rowProfiles += pairCount;
      rowLeft += leftCount;
      rowRight += rightCount;
      ++rowBatches;

      // At fixed b, the same right record (L,c) can be shared by every
      // compatible central row K.  Mark the union of its L intervals.
      ++fixedBIntervals[b][K + 1];
      --fixedBIntervals[b][lCap + 1];
    }
  }

  let rowFixedBRight = 0;
  for (let b = 2; b < fixedBIntervals.length; ++b) {
    let active = 0;
    for (let L = 1; L <= s - 2; ++L) {
      active += fixedBIntervals[b][L];
      if (active > 0 && v[L] > b) rowFixedBRight += v[L] - b;
    }
  }

  assert(Number.isSafeInteger(rowProfiles) &&
    Number.isSafeInteger(rowLeft) && Number.isSafeInteger(rowRight),
  `unsafe four-corner row count at s=${s}`);

  // Directly enumerate the small rows and compare the complete four-corner
  // cylinder count with the central-factor count above.
  if (s <= 40) {
    ++regressionWeights;
    let direct = 0;
    for (let J = 1; J <= s - 4; ++J) {
      for (let a = 1; a <= m[J]; ++a) {
        for (let K = J + 1; K <= s - 3; ++K) {
          if (K - J > m[J] - a + logH) continue;
          if (K > seedPrefixKCap(J, a,
            Math.min(kCap, J + m[J] - a + logH), exactSeedBound)) continue;
          for (let b = a + 1; b <= m[K]; ++b) {
            for (let L = K + 1; L <= s - 2; ++L) {
              if (L - K > m[K] - b + logH) continue;
              for (let c = b + 1; c <= m[L]; ++c) {
                if (J > maxFirstCorner) continue;
                if (s - 1 - L > m[L] - c + logH) continue;
                ++direct;
              }
            }
          }
        }
      }
    }
    assert(direct === rowProfiles,
      `four-corner central count failed at s=${s}`);
    regressionProfiles += direct;
  }

  cylinderProfiles += BigInt(rowProfiles);
  centralLeftRecords += BigInt(rowLeft);
  centralRightRecords += BigInt(rowRight);
  fixedBRightRecords += BigInt(rowFixedBRight);
  fixedKLeftRecords += BigInt(rowFixedKLeft);
  centralBatches += BigInt(rowBatches);
  if (rowProfiles > 0) {
    lastNonzeroRow = {s, profiles: rowProfiles.toString()};
  }
  if (maximumRow === null ||
      BigInt(rowProfiles) > BigInt(maximumRow.profiles)) {
    maximumRow = {s, profiles: rowProfiles.toString()};
  }
  const rowRecords = rowLeft + rowRight;
  if (maximumRecordRow === null ||
      BigInt(rowRecords) > BigInt(maximumRecordRow.records)) {
    maximumRecordRow = {
      s,
      left: rowLeft.toString(),
      right: rowRight.toString(),
      records: rowRecords.toString(),
      batches: rowBatches.toString()
    };
  }
}

if (seedPrefixPrune && analyticStart === 2672) {
  assert(q2Weights === 1107, "four-corner q2 weight count changed");
  assert(cylinderProfiles === 3784549223083n,
    "four-corner prefix-pruned profile count changed");
  assert(centralBatches === 929852n,
    "four-corner central-batch count changed");
  assert(centralLeftRecords === 831453867n,
    "four-corner central-left count changed");
  assert(centralRightRecords === 4717005291n,
    "four-corner central-right count changed");
  assert(fixedBRightRecords === 119030514n,
    "four-corner fixed-b right count changed");
  assert(fixedKLeftRecords === 241292258n,
    "four-corner fixed-K left count changed");
  assert(lastNonzeroRow !== null && lastNonzeroRow.s === 759 &&
    lastNonzeroRow.profiles === "1",
  "four-corner last surviving row changed");
  assert(maximumRow !== null && maximumRow.s === 292 &&
    maximumRow.profiles === "38176106428",
  "four-corner maximum profile row changed");
  assert(maximumRecordRow !== null && maximumRecordRow.s === 306 &&
    maximumRecordRow.left === "4498900" &&
    maximumRecordRow.right === "48934229" &&
    maximumRecordRow.records === "53433129",
  "four-corner maximum record row changed");
  assert(regressionWeights === 14 && regressionProfiles === 7124419,
    "four-corner direct count regression changed");
}

console.log(JSON.stringify({
  probe: seedPrefixPrune ?
    "q_s=2 b=1 four-corner count after exact first-prefix seed pruning" :
    "q_s=2 b=1 four-corner central-factor count",
  seedPrefixPrune,
  analyticStart,
  finiteMaximum,
  analyticConstant: analyticConstant.toString(),
  analyticPower: 225,
  q2Weights,
  cylinderProfiles: cylinderProfiles.toString(),
  centralBatches: centralBatches.toString(),
  centralLeftRecords: centralLeftRecords.toString(),
  centralRightRecords: centralRightRecords.toString(),
  totalCentralRecords:
    (centralLeftRecords + centralRightRecords).toString(),
  fixedBSplitLeftRecords: centralLeftRecords.toString(),
  fixedBSplitRightRecords: fixedBRightRecords.toString(),
  fixedBSplitTotalRecords:
    (centralLeftRecords + fixedBRightRecords).toString(),
  fixedKSplitLeftRecords: fixedKLeftRecords.toString(),
  fixedKSplitRightRecords: centralRightRecords.toString(),
  fixedKSplitTotalRecords:
    (fixedKLeftRecords + centralRightRecords).toString(),
  lastNonzeroRow,
  maximumRow,
  maximumRecordRow,
  regressionWeights,
  regressionProfiles,
  warning: "count only; no full target residues evaluated"
}, null, 2));
