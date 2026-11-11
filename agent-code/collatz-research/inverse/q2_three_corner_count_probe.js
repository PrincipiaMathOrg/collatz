#!/usr/bin/env node
"use strict";

// Exact parameter-count probe for the complete three-corner q=2, b=1
// sector after all three necessary exponent-one cylinder bounds.  It does
// not evaluate target residues.

function bitLength(n) {
  return n.toString(2).length;
}

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

// For a nondecreasing integer sequence values[K], return
//   sum_{K >= lower} max(values[K] - a, 0)
// over 1 <= K <= s-2.  The suffix table makes each query logarithmic,
// replacing the former explicit K loop.
function excessSuffix(values, suffix, a, lower, s) {
  let lo = Math.max(1, lower);
  let hi = s - 1; // exclusive sentinel after K=s-2
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (values[mid] > a) hi = mid;
    else lo = mid + 1;
  }
  if (lo >= s - 1) return 0;
  return suffix[lo] - a * (s - 1 - lo);
}

const finiteMaximum = Number(process.argv[2] || 1114);
let P = 1n;
const ceilings = [0];
let q2Weights = 0;
let rawProfiles = 0n;
let cylinderProfiles = 0n;
let maximumRowProfiles = 0n;
let maximumRow = null;
let lastNonzeroRow = null;
let countRegressionWeights = 0;
let countRegressionProfiles = 0;
let classificationRegressionWeights = 0;
let classificationRegressionProfiles = 0;
let mitmLeftRecords = 0n;
let mitmRightRecords = 0n;
let maximumMitmRightRow = null;
const lastRows = [];

for (let s = 1; s <= finiteMaximum; ++s) {
  P *= 3n;
  ceilings[s] = bitLength(P);
  if (s < 3 || ceilings[s] - ceilings[s - 1] !== 1) continue;
  ++q2Weights;

  const N = ceilings[s];
  const e = N - s;
  const terminalDelay = e - 1;
  const H = 307n * BigInt(s) ** 15n;
  const G = 154n * BigInt(s) ** 15n;
  const logH = bitLength(H) - 1;
  const maxFirstCorner = bitLength(G - 1n) - 1;
  let rowRaw = 0;
  let rowCylinder = 0;

  // Both sequences below are nondecreasing.  For the third cylinder we
  // subtract its remaining length beyond the logarithmic state allowance.
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

  for (let J = 1; J <= s - 3; ++J) {
    const mJ = ceilings[J] - 1 - J;
    for (let a = 1; a <= mJ; ++a) {
      rowRaw += excessSuffix(m, suffixM, a, J + 1, s);
      if (J <= maxFirstCorner) {
        // The second-cylinder bound is K-J <= m_J-a+logH.
        const lastK = Math.min(s - 2, J + mJ - a + logH);
        const full = excessSuffix(v, suffixV, a, J + 1, s);
        const tail = excessSuffix(v, suffixV, a, lastK + 1, s);
        rowCylinder += full - tail;
      }
    }
  }

  assert(Number.isSafeInteger(rowRaw) && Number.isSafeInteger(rowCylinder),
    `unsafe profile count at s=${s}`);

  // Count the records in the exact split (J,a) | (K,b), with a fixed
  // value of a on each query batch.  A right record is retained only if
  // at least one first corner can pair with it under the second cylinder.
  const jCap = Math.min(s - 3, maxFirstCorner);
  let rowMitmLeft = 0;
  let rowMitmRight = 0;
  if (jCap >= 1) {
    const maxA = m[jCap];
    for (let J = 1; J <= jCap; ++J) rowMitmLeft += m[J];
    for (let a = 1; a <= maxA; ++a) {
      let jMin = 1;
      while (jMin <= jCap && m[jMin] < a) ++jMin;
      if (jMin > jCap) continue;
      const kMin = jMin + 1;
      const kMax = Math.min(s - 2,
        jCap + m[jCap] - a + logH);
      if (kMin > kMax) continue;
      rowMitmRight +=
        excessSuffix(v, suffixV, a, kMin, s)
        - excessSuffix(v, suffixV, a, kMax + 1, s);
    }
  }
  assert(Number.isSafeInteger(rowMitmLeft) &&
    Number.isSafeInteger(rowMitmRight), `unsafe MITM count at s=${s}`);
  mitmLeftRecords += BigInt(rowMitmLeft);
  mitmRightRecords += BigInt(rowMitmRight);
  if (maximumMitmRightRow === null ||
      BigInt(rowMitmRight) > BigInt(maximumMitmRightRow.records)) {
    maximumMitmRightRow = {s, records: rowMitmRight.toString()};
  }

  // Independent direct-loop check of both compressed counts in a range
  // large enough to exercise all endpoints and all three inequalities.
  if (s <= 80) {
    ++countRegressionWeights;
    let directRaw = 0;
    let directCylinder = 0;
    for (let J = 1; J <= s - 3; ++J) {
      const mJ = ceilings[J] - 1 - J;
      for (let a = 1; a <= mJ; ++a) {
        for (let K = J + 1; K <= s - 2; ++K) {
          const mK = ceilings[K] - 1 - K;
          for (let b = a + 1; b <= mK; ++b) {
            ++directRaw;
            if (J > maxFirstCorner) continue;
            if (K - J > mJ - a + logH) continue;
            if (s - 1 - K > mK - b + logH) continue;
            ++directCylinder;
          }
        }
      }
    }
    assert(rowRaw === directRaw,
      `raw compressed count failed at s=${s}`);
    assert(rowCylinder === directCylinder,
      `cylinder compressed count failed at s=${s}`);
    countRegressionProfiles += directRaw;
  }

  // Independently enumerate the complete small ballot board and verify
  // that every delay path with three jumps has the (J,a,K,b) normal form.
  if (s <= 12) {
    ++classificationRegressionWeights;
    const parameterProfiles = new Set();
    for (let J = 1; J <= s - 3; ++J) {
      const mJ = ceilings[J] - 1 - J;
      for (let a = 1; a <= mJ; ++a) {
        for (let K = J + 1; K <= s - 2; ++K) {
          const mK = ceilings[K] - 1 - K;
          for (let b = a + 1; b <= mK; ++b) {
            parameterProfiles.add(`${J},${a},${K},${b}`);
          }
        }
      }
    }

    const bruteProfiles = new Set();
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
        const [first, second, terminal] = jumps;
        assert(terminal.row === s - 1 && terminal.level === terminalDelay,
          `bad terminal jump at s=${s}`);
        bruteProfiles.add(`${first.row},${first.level},${second.row},${second.level}`);
        return;
      }
      const mI = ceilings[i] - 1 - i;
      for (let value = previous; value <= mI; ++value) {
        delay[i] = value;
        visit(i + 1, value);
      }
    }
    visit(1, 0);
    assert(bruteProfiles.size === parameterProfiles.size,
      `three-corner classification count failed at s=${s}`);
    for (const key of bruteProfiles) {
      assert(parameterProfiles.has(key),
        `unclassified three-corner profile at s=${s}: ${key}`);
    }
    classificationRegressionProfiles += bruteProfiles.size;
  }

  const rowRawBig = BigInt(rowRaw);
  const rowCylinderBig = BigInt(rowCylinder);
  rawProfiles += rowRawBig;
  cylinderProfiles += rowCylinderBig;
  if (rowCylinderBig > maximumRowProfiles) {
    maximumRowProfiles = rowCylinderBig;
    maximumRow = {s, N, e, raw: rowRaw.toString(),
      cylinder: rowCylinder.toString()};
  }
  if (rowCylinder > 0) {
    lastNonzeroRow = {s, N, e, raw: rowRaw.toString(),
      cylinder: rowCylinder.toString()};
  }
  lastRows.push({s, raw: rowRaw.toString(), cylinder: rowCylinder.toString()});
  if (lastRows.length > 12) lastRows.shift();
}

console.log(JSON.stringify({
  probe: "q=2 b=1 three-corner cylinder-pruned parameter count",
  finiteMaximum,
  q2Weights,
  rawProfiles: rawProfiles.toString(),
  cylinderProfiles: cylinderProfiles.toString(),
  maximumRowProfiles: maximumRowProfiles.toString(),
  maximumRow,
  lastNonzeroRow,
  countRegressionWeights,
  countRegressionProfiles,
  classificationRegressionWeights,
  classificationRegressionProfiles,
  mitmLeftRecords: mitmLeftRecords.toString(),
  mitmRightRecords: mitmRightRecords.toString(),
  maximumMitmRightRow,
  lastRows,
  warning: "count only; no residue theorem"
}, null, 2));
