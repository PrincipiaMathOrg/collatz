#!/usr/bin/env node
"use strict";

// Exact certificate for the complete two-corner sector of the anchored
// q=2, b=1 First-Crossing Descent gate.

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

const finiteMaximum = 414;
const analyticStart = 415;
const analyticConstant = 7280812n; // 307*154^2

let P = 1n;
const powers3 = [1n];
const ceilings = [0];
let q2Weights = 0;
let profiles = 0;
let strictFormalHits = 0;
let equalityFormalHits = 0;
let fcdFailures = 0;
let tauBoundFailures = 0;
let classificationRegressionWeights = 0;
let classificationRegressionProfiles = 0;
let carryRegressionProfiles = 0;
let minimumGap = null;
let minimumGapProfile = null;
let minimumTauMargin = null;
let minimumTauProfile = null;

for (let s = 1; s <= finiteMaximum; ++s) {
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
  const mTwoBack = ceilings[s - 2] - 1 - (s - 2);
  assert(mTwoBack === terminalDelay - 1,
    `terminal delay appeared early at s=${s}`);

  const parameterProfiles = new Set();
  for (let J = 1; J <= s - 2; ++J) {
    const mJ = ceilings[J] - 1 - J;
    for (let a = 1; a <= mJ; ++a) {
      ++profiles;
      parameterProfiles.add(`${J},${a}`);

      // The complete two-corner delay path is 0 before J, a from J to
      // s-2, and terminalDelay at s-1.  Its carry has this closed form.
      const C = P
        + ((1n << BigInt(a)) - 1n)
          * (1n << BigInt(J)) * powers3[s - J]
        - 3n * (1n << BigInt(s + a - 1))
        + M / 4n;

      if (s <= 20) {
        let direct = 0n;
        for (let i = 0; i < s; ++i) {
          const A = i < J ? i : (i < s - 1 ? i + a : N - 2);
          direct += (1n << BigInt(A)) * powers3[s - 1 - i];
        }
        assert(C === direct,
          `carry formula failed at s=${s}, J=${J}, a=${a}`);
        ++carryRegressionProfiles;
      }

      const rho = mod(-C * inverseP, M);
      assert(rho > 0n && (rho & 1n) === 1n,
        `canonical seed failed at s=${s}, J=${J}, a=${a}`);
      const endpointNumerator = P * rho + C;
      assert(endpointNumerator % M === 0n,
        `endpoint integrality failed at s=${s}, J=${J}, a=${a}`);
      const Z = endpointNumerator / M;
      const gap = rho - Z;
      const tau = mod(C * inverseM, D);
      const tauMargin = 3n * tau - BigInt(s);
      assert(tau === mod(Z - rho, D),
        `displacement residue failed at s=${s}, J=${J}, a=${a}`);

      if (gap <= 0n) ++fcdFailures;
      if (tauMargin < 0n) ++tauBoundFailures;
      if (tau === 0n) ++equalityFormalHits;
      if (tau >= 1n && tau <= dMax) ++strictFormalHits;

      if (minimumGap === null || gap < minimumGap) {
        minimumGap = gap;
        minimumGapProfile = {s, J, a, gap: gap.toString()};
      }
      if (minimumTauMargin === null || tauMargin < minimumTauMargin) {
        minimumTauMargin = tauMargin;
        minimumTauProfile = {
          s, J, a, tau: tau.toString(), margin: tauMargin.toString()
        };
      }
    }
  }

  // Independently brute-enumerate all nondecreasing delay paths in the
  // small range and verify that every path with exactly two strict increases
  // occurs in the (J,a) parameterization above.
  if (s <= 12) {
    ++classificationRegressionWeights;
    const delay = Array(s).fill(0);
    delay[s - 1] = terminalDelay;

    function visit(i, previous) {
      if (i === s - 1) {
        let corners = 0;
        let first = null;
        for (let j = 1; j < s; ++j) {
          if (delay[j] > delay[j - 1]) {
            ++corners;
            if (first === null) first = {J: j, a: delay[j]};
          }
        }
        if (corners !== 2) return;
        ++classificationRegressionProfiles;
        assert(first !== null && parameterProfiles.has(`${first.J},${first.a}`),
          `unclassified two-corner path at s=${s}`);
        for (let j = 0; j < s; ++j) {
          const expected = j < first.J ? 0
            : (j < s - 1 ? first.a : terminalDelay);
          assert(delay[j] === expected,
            `two-corner normal form failed at s=${s}, i=${j}`);
        }
        return;
      }
      const mI = ceilings[i] - 1 - i;
      for (let value = previous; value <= mI; ++value) {
        delay[i] = value;
        visit(i + 1, value);
      }
    }

    visit(1, 0);
  }
}

// Exact all-depth cutoff.  Every two-corner target would satisfy
// 2^s < 307*154^2*s^45.  The reverse inequality starts at 415, and the
// ratio propagates because 2*415^45 > 416^45 and (1+1/s)^45 decreases.
const analyticBase = (1n << BigInt(analyticStart))
  > analyticConstant * BigInt(analyticStart) ** 45n;
const analyticPropagation = 2n * BigInt(analyticStart) ** 45n
  > BigInt(analyticStart + 1) ** 45n;

assert(analyticBase, "analytic base inequality failed");
assert(analyticPropagation, "analytic propagation inequality failed");
assert(q2Weights === 171, `q=2 weight count changed: ${q2Weights}`);
assert(profiles === 2816721, `profile count changed: ${profiles}`);
assert(fcdFailures === 0, "finite two-corner FCD failure found");
assert(tauBoundFailures === 0, "finite two-corner tau bound failed");
assert(strictFormalHits === 0, "finite strict formal target found");
assert(equalityFormalHits === 0, "finite equality formal target found");

console.log(JSON.stringify({
  certificate: "complete q=2 b=1 two-corner exclusion",
  finiteMaximum,
  analyticStart,
  analyticInequality: "2^s < 7280812*s^45 for every target",
  analyticBase,
  analyticPropagation,
  q2Weights,
  profiles,
  strictFormalHits,
  equalityFormalHits,
  fcdFailures,
  tauBoundFailures,
  classificationRegressionWeights,
  classificationRegressionProfiles,
  carryRegressionProfiles,
  minimumGapProfile,
  minimumTauProfile,
  theorem: "every hypothetical q=2 b=1 target has at least three removable corners"
}, null, 2));
