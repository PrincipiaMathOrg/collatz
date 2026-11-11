#!/usr/bin/env node
"use strict";

// Exact exploratory audit of the complete two-corner sector in the
// anchored q=2, b=1 First-Crossing Descent gate.  This is a falsification
// probe, not an all-depth certificate.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function mod(a, m) {
  a %= m;
  return a < 0n ? a + m : a;
}

function inverse(a, m) {
  let oldR = a, r = m, oldS = 1n, s = 0n;
  while (r !== 0n) {
    const q = oldR / r;
    [oldR, r] = [r, oldR - q * r];
    [oldS, s] = [s, oldS - q * s];
  }
  assert(oldR === 1n, "inverse does not exist");
  return mod(oldS, m);
}

function bitLength(n) {
  return n.toString(2).length;
}

function serial(record) {
  if (record === null) return null;
  return Object.fromEntries(Object.entries(record).map(([key, value]) =>
    [key, typeof value === "bigint" ? value.toString() : value]));
}

const maximumWeight = Number(process.argv[2] || 250);
assert(Number.isInteger(maximumWeight) && maximumWeight >= 8,
  "maximum weight must be an integer at least eight");

let P = 1n;
const powers3 = [1n];
const ceilings = [0];
let q2Weights = 0;
let profiles = 0;
let fcdFailures = 0;
let tauBoundFailures = 0;
let targetResidues = 0;
let firstFcdFailure = null;
let firstTauBoundFailure = null;
let firstTargetResidue = null;
let minimumGap = null;
let minimumGapProfile = null;
let minimumTauMargin = null;
let minimumTauProfile = null;
let minimumScaledU = null;
let minimumScaledUProfile = null;
let quarterBoundFailures = 0;
let firstQuarterBoundFailure = null;
const rows = [];

for (let s = 1; s <= maximumWeight; ++s) {
  P *= 3n;
  powers3.push(P);
  ceilings[s] = bitLength(P);
  if (s < 3 || ceilings[s] - ceilings[s - 1] !== 1) continue;
  ++q2Weights;

  const N = ceilings[s];
  const M = 1n << BigInt(N);
  const D = M - P;
  const e = N - s;
  const terminalDelay = e - 1;
  const dMax = BigInt(Math.ceil(terminalDelay / 2));
  const inverseP = inverse(P, M);
  const inverseM = inverse(M, D);
  assert(ceilings[s - 1] - ceilings[s - 2] === 2,
    `q=2 predecessor failed at s=${s}`);

  let rowProfiles = 0;
  let rowMinimumGap = null;
  let rowMinimumTau = null;
  let rowMinimumParameters = null;

  for (let J = 1; J <= s - 2; ++J) {
    const B = ceilings[J] - 1;
    const mJ = B - J;
    for (let a = 1; a <= Math.min(mJ, terminalDelay - 1); ++a) {
      ++profiles;
      ++rowProfiles;

      // Carry of positions i for i<J, i+a for J<=i<=s-2, and N-2
      // at the endpoint.  The formula is independently checked by a
      // direct sum in the small regression range.
      const twoJ = 1n << BigInt(J);
      const twoA = 1n << BigInt(a);
      const C = P + (twoA - 1n) * twoJ * powers3[s - J]
        - 3n * (1n << BigInt(s + a - 1)) + M / 4n;

      if (s <= 20) {
        let direct = 0n;
        for (let i = 0; i < s; ++i) {
          const A = i < J ? i : (i < s - 1 ? i + a : N - 2);
          direct += (1n << BigInt(A)) * powers3[s - 1 - i];
        }
        assert(C === direct,
          `two-corner carry formula failed at s=${s}, J=${J}, a=${a}`);
      }

      const rho = mod(-C * inverseP, M);
      const endpointNumerator = P * rho + C;
      assert(endpointNumerator % M === 0n,
        `nonintegral endpoint at s=${s}, J=${J}, a=${a}`);
      const Z = endpointNumerator / M;
      const gap = rho - Z;
      const tau = mod(C * inverseM, D);
      const tauMargin = 3n * tau - BigInt(s);
      const uModulus = 1n << BigInt(s + e - J + 1);
      assert((rho + 1n) % (1n << BigInt(J - 1)) === 0n,
        `initial run cylinder failed at s=${s}, J=${J}, a=${a}`);
      const u = (rho + 1n) >> BigInt(J - 1);
      assert(0n < u && u < uModulus,
        `reduced cylinder parameter escaped range at s=${s}, J=${J}, a=${a}`);
      if (4n * u < uModulus) {
        ++quarterBoundFailures;
        if (firstQuarterBoundFailure === null) {
          firstQuarterBoundFailure = {s, N, e, J, a, u, uModulus, rho, Z,
            gap, tau};
        }
      }
      assert(tau === mod(Z - rho, D),
        `tau displacement identity failed at s=${s}, J=${J}, a=${a}`);

      if (gap <= 0n) {
        ++fcdFailures;
        if (firstFcdFailure === null) {
          firstFcdFailure = {s, N, e, J, a, C, D, rho, Z, gap, tau};
        }
      }
      if (tauMargin < 0n) {
        ++tauBoundFailures;
        if (firstTauBoundFailure === null) {
          firstTauBoundFailure = {s, N, e, J, a, C, D, rho, Z, gap, tau,
            tauMargin};
        }
      }
      if (tau <= dMax) {
        ++targetResidues;
        if (firstTargetResidue === null) {
          firstTargetResidue = {s, N, e, J, a, C, D, rho, Z, gap, tau,
            dMax};
        }
      }

      if (minimumGap === null || gap < minimumGap) {
        minimumGap = gap;
        minimumGapProfile = {s, N, e, J, a, rho, Z, gap, tau};
      }
      if (minimumTauMargin === null || tauMargin < minimumTauMargin) {
        minimumTauMargin = tauMargin;
        minimumTauProfile = {s, N, e, J, a, rho, Z, gap, tau, tauMargin};
      }
      const scaledU = (u << 64n) / uModulus;
      if (minimumScaledU === null || scaledU < minimumScaledU) {
        minimumScaledU = scaledU;
        minimumScaledUProfile = {s, N, e, J, a, u, uModulus, scaledU,
          rho, Z, gap, tau};
      }
      if (rowMinimumGap === null || gap < rowMinimumGap) {
        rowMinimumGap = gap;
      }
      if (rowMinimumTau === null || tau < rowMinimumTau) {
        rowMinimumTau = tau;
        rowMinimumParameters = {J, a};
      }
    }
  }

  rows.push({
    s, N, e, profiles: rowProfiles,
    minimumGap: rowMinimumGap === null ? null : rowMinimumGap.toString(),
    minimumTau: rowMinimumTau === null ? null : rowMinimumTau.toString(),
    minimumTauParameters: rowMinimumParameters
  });
}

console.log(JSON.stringify({
  probe: "complete q=2 b=1 two-corner sector",
  maximumWeight,
  q2Weights,
  profiles,
  fcdFailures,
  tauBoundFailures,
  targetResidues,
  quarterBoundFailures,
  firstFcdFailure: serial(firstFcdFailure),
  firstTauBoundFailure: serial(firstTauBoundFailure),
  firstTargetResidue: serial(firstTargetResidue),
  firstQuarterBoundFailure: serial(firstQuarterBoundFailure),
  minimumGapProfile: serial(minimumGapProfile),
  minimumTauProfile: serial(minimumTauProfile),
  minimumScaledUProfile: serial(minimumScaledUProfile),
  rows: rows.slice(-12),
  warning: "finite falsification evidence only"
}, null, 2));
