"use strict";

// Diagnostic for the fixed-start power lemma in the maximal lower
// mechanical q=2 profile.  The continued-fraction coefficients below are
// used only to measure the candidates; the eventual proof is uniform in the
// directive sequence.

const partialQuotients = [
  1, 1, 2, 2, 3, 1, 5, 2, 23, 2, 2, 1, 1, 55, 1, 4, 2, 1, 114,
];

const q = [1]; // q_0
const p = [0]; // p_0
let qMinusOne = 0;
let pMinusOne = 1;
for (let index = 0; index < partialQuotients.length; ++index) {
  const next = partialQuotients[index] * q[q.length - 1] + qMinusOne;
  const nextP = partialQuotients[index] * p[p.length - 1] + pMinusOne;
  qMinusOne = q[q.length - 1];
  pMinusOne = p[p.length - 1];
  q.push(next);
  p.push(nextP);
}

function candidate(m) {
  let n = 1;
  while (n + 1 < q.length && q[n + 1] <= m) ++n;
  if (!(q[n] <= m && m < q[n + 1])) {
    throw new Error(`m=${m} lies outside the retained convergent range`);
  }

  const copies = Math.floor(m / q[n]);
  if (copies >= 2) {
    return { n, baseIndex: n, d: q[n], K: copies, kind: "top-run" };
  }

  const aN = partialQuotients[n - 1];
  if (aN >= 2) {
    return {
      n,
      baseIndex: n - 1,
      d: q[n - 1],
      K: aN,
      kind: "inside-current",
    };
  }

  const aPrevious = partialQuotients[n - 2];
  if (aPrevious >= 2) {
    return {
      n,
      baseIndex: n - 2,
      d: q[n - 2],
      K: aPrevious,
      kind: "inside-previous",
    };
  }

  return {
    n,
    baseIndex: n - 2,
    d: q[n - 2],
    K: 2,
    kind: "standard-overlap-square",
  };
}

const maxM = Number(process.argv[2] || 10_000_000);
if (!Number.isSafeInteger(maxM) || maxM < 20 || maxM > 10_000_000) {
  throw new Error("maxM must lie between 20 and 10000000");
}

// Certify the retained continued-fraction prefix exactly.  The comparison
// p/q < log_2(3/2) is equivalent to 2^(p+q) < 3^q.  The cylinder for a
// finite continued-fraction prefix has endpoints p_n/q_n and
// (p_n+p_(n-1))/(q_n+q_(n-1)).
let upperIndex = 1;
while (q[upperIndex] <= maxM) ++upperIndex;
function sideOfBeta(numerator, denominator) {
  const threePower = 3n ** BigInt(denominator);
  const twoPower = 1n << BigInt(numerator + denominator);
  return threePower > twoPower ? -1 : 1; // -1 means p/q is below beta
}
const convergentSide = sideOfBeta(p[upperIndex], q[upperIndex]);
const cylinderNumerator = p[upperIndex] + p[upperIndex - 1];
const cylinderDenominator = q[upperIndex] + q[upperIndex - 1];
const cylinderSide = sideOfBeta(cylinderNumerator, cylinderDenominator);
if (convergentSide === cylinderSide) {
  throw new Error("retained CF cylinder does not contain log_2(3/2)");
}

const standardWords = ["0", "1"];
for (let index = 2; index <= upperIndex; ++index) {
  standardWords[index] =
    standardWords[index - 1].repeat(partialQuotients[index - 1]) +
    standardWords[index - 2];
  if (standardWords[index].length !== q[index]) {
    throw new Error(`standard-word length failed at index ${index}`);
  }
}
const characteristicPrefix = standardWords[upperIndex];

let worstCoverage = null;
let worstScore = null;
let worstLateScore = null;
const byKind = new Map();
const samples = [];
const verifiedPowers = new Set();
const logThreeHalves = Math.log(3 / 2);

for (let m = 20; m <= maxM; ++m) {
  const item = candidate(m);
  const length = item.K * item.d;
  if (!(item.K >= 2 && length <= m && 4 * length > m)) {
    throw new Error(`candidate invariant failed at m=${m}`);
  }
  const powerKey = `${item.baseIndex}:${item.K}`;
  if (!verifiedPowers.has(powerKey)) {
    const base = standardWords[item.baseIndex];
    if (!characteristicPrefix.startsWith(base.repeat(item.K))) {
      throw new Error(`standard power failed for ${powerKey}`);
    }
    verifiedPowers.add(powerKey);
  }
  const coverage = length / m;
  // The occurrence starts at valuation position j=1.  Subtracting the
  // crude one-step growth cost gives the requested arithmetic score.
  const score = item.d * (item.K * Math.log(2) - Math.log(3)) - logThreeHalves;
  const normalizedScore = score / m;
  const row = { m, length, coverage, score, normalizedScore, ...item };
  if (worstCoverage === null || length * worstCoverage.m < worstCoverage.length * m) {
    worstCoverage = row;
  }
  if (worstScore === null || normalizedScore < worstScore.normalizedScore) {
    worstScore = row;
  }
  if (m >= Math.floor(maxM / 2) &&
      (worstLateScore === null || normalizedScore < worstLateScore.normalizedScore)) {
    worstLateScore = row;
  }
  const old = byKind.get(item.kind);
  if (old === undefined || normalizedScore < old.normalizedScore) {
    byKind.set(item.kind, row);
  }

  if (m === q[item.n] || m === 2 * q[item.n] - 1 ||
      m === q[item.n + 1] - 1) {
    if (samples.length < 200) samples.push(row);
  }
}

console.log(`max_m=${maxM}`);
console.log(`fixed_start=1`);
console.log(`verified_standard_powers=${verifiedPowers.size}`);
console.log(`certified_cf_cylinder=${p[upperIndex]}/${q[upperIndex]},${cylinderNumerator}/${cylinderDenominator}`);
console.log(`denominators=${q.join(",")}`);
console.log(`worst_coverage_exact=${worstCoverage.length}/${worstCoverage.m}`);
console.log(`worst_coverage=${JSON.stringify(worstCoverage)}`);
console.log(`worst_score=${JSON.stringify(worstScore)}`);
console.log(`worst_late_score=${JSON.stringify(worstLateScore)}`);
for (const [kind, row] of byKind) {
  console.log(`kind=${kind} worst=${JSON.stringify(row)}`);
}
for (const row of samples.slice(-24)) {
  console.log(`boundary=${JSON.stringify(row)}`);
}
