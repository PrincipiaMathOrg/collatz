#!/usr/bin/env node
"use strict";

// Exact all-depth certificate for terminal delay r=3 in the q_s=2,
// zero-lift, no-wrap strict-FCD gate.  The analytic part reduces every
// candidate to s<5000.  The finite part uses a one-dimensional meet-in-the-
// middle lookup for the two free delay cuts, with exact BigInt arithmetic.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function pow2(n) {
  return 1n << BigInt(n);
}

function pow3(n) {
  return 3n ** BigInt(n);
}

function mod(a, m) {
  a %= m;
  return a < 0n ? a + m : a;
}

// Constants in the gap cascade.  See q2_nowrap_strict.md for the termwise
// inequalities from which they arise.
const J0 = 7n * 459n;                         // 3^j < J0*s^14
const A0 = 1970181n;                          // 2^g < A0*s^28
const H0 = 459n * 2n * J0 * A0 * A0;          // 2^h < H0*s^84
const T0 = 459n * 5n * J0 * A0 * A0 * H0 * H0;
const K0 = J0 * A0 * H0 * T0;                // 2^s < K0*s^378
const finiteLimit = 5000;

assert(J0 === 3213n, "J0 changed");
assert(A0 === 1970181n, "A0 changed");
assert(H0 === 11448950027906443374n, "H0 changed");
assert(pow2(finiteLimit) > K0 * BigInt(finiteLimit) ** 378n,
  "r=3 support cutoff seed failed");
assert(2n * BigInt(finiteLimit) ** 378n >
  BigInt(finiteLimit + 1) ** 378n,
  "r=3 support cutoff propagation failed");

// Independent algebra regression for the three cut remainders.  These
// identities are checked even though the finite search later finds no F
// divisible by D, so the large-range proof is not vacuously untested.
function auditCutRemainders(s, j, j2, j3, d) {
  const P = pow3(s);
  const k = P.toString(2).length;
  const e = k - s;
  const D = pow2(k) - P;
  const g = j2 - j, h = j3 - j2, t = s - j3;
  const F = pow3(s - j) + pow2(g + 1) * pow3(s - j2) +
    pow2(g + h + 2) * pow3(t) - pow2(s + 3 - j) -
    BigInt(d - 1) * pow2(s + e - j);
  const A = pow2(e + s - g - 1) + pow3(s - g) +
    pow2(h + 1) * pow3(j + t) - pow2(h + t + 2) * pow3(j) -
    BigInt(d - 1) * pow2(e + h + t - 1) * pow3(j);
  const B = pow2(e + s - h - g - 2) * pow3(g) +
    pow2(e + s - h - 1) + pow3(s - h) -
    pow2(t + 1) * pow3(j + g) -
    BigInt(d - 1) * pow2(e + t - 2) * pow3(j + g);
  const J = j + g + h;
  const C = pow2(e + j - 3) * pow3(g + h) +
    pow2(e + j + g - 2) * pow3(h) + pow2(e + J - 1) -
    pow3(J) - BigInt(d - 1) * pow2(e - 3) * pow3(J);
  assert(mod(pow2(g + 1) * A - pow3(j) * F, D) === 0n,
    "first cut remainder identity failed");
  assert(mod(pow2(g + h + 2) * B - pow3(j + g) * F, D) === 0n,
    "second cut remainder identity failed");
  assert(mod(pow2(g + h + t + 3) * C - pow3(J) * F, D) === 0n,
    "terminal cut remainder identity failed");
  assert((A & 1n) !== 0n && (B & 1n) !== 0n && (C & 1n) !== 0n,
    "cut remainder lost its unique odd term");
}

auditCutRemainders(17, 2, 4, 6, 1);
auditCutRemainders(17, 2, 4, 6, 2);

// Adversarial boundary audit.  It includes coincident cuts j1=j2,
// j2=j3, and j1=j2=j3 whenever the level barriers permit them, as well
// as the terminal boundary j3=s-1.  Thus the parity argument is tested
// where g=0, h=0, or t=1, not only at an interior sample.
function auditRemainderGrid(maxS) {
  let P = 1n;
  let previousK = 0;
  const result = {
    profiles: 0,
    identities: 0,
    gZero: 0,
    hZero: 0,
    tOne: 0,
    allCutsEqual: 0
  };
  for (let s = 1; s <= maxS; ++s) {
    P *= 3n;
    const k = P.toString(2).length;
    const q = k - previousK;
    previousK = k;
    const e = k - s;
    if (q !== 1 || e < 4) continue;
    for (let j = 2; j < s; ++j) {
      if (pow2(j + 1) >= pow3(j)) continue;
      for (let j2 = Math.max(j, 4); j2 < s; ++j2) {
        for (let j3 = Math.max(j2, 6); j3 < s; ++j3) {
          ++result.profiles;
          if (j2 === j) ++result.gZero;
          if (j3 === j2) ++result.hZero;
          if (j3 === s - 1) ++result.tOne;
          if (j === j2 && j2 === j3) ++result.allCutsEqual;
          for (let d = 1; d <= 2; ++d) {
            auditCutRemainders(s, j, j2, j3, d);
            result.identities += 3;
          }
        }
      }
    }
  }
  assert(result.profiles > 0, "remainder boundary grid is empty");
  assert(result.gZero > 0 && result.hZero > 0 && result.tOne > 0,
    "remainder boundary grid missed an equality boundary");
  // All three cuts can coincide once the third-level barrier j>=6 is met.
  assert(result.allCutsEqual > 0,
    "remainder boundary grid missed the triple coincident cut");
  return result;
}

const remainderBoundaryAudit = auditRemainderGrid(32);

function lowerBound(values, target) {
  let lo = 0, hi = values.length;
  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (values[mid] < target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

const counts = {
  q2Weights: 0,
  q2WeightsWithR3: 0,
  firstCuts: 0,
  targetRows: 0,
  secondCutLookups: 0,
  modularPairs: 0,
  exactDivisibilityHits: 0,
  validNoWrapHits: 0
};
const firstHits = [];

let P = 1n;
let previousK = 0;
for (let s = 1; s < finiteLimit; ++s) {
  P *= 3n;
  const k = P.toString(2).length;
  const q = k - previousK;
  previousK = k;
  if (s < 6 || q !== 1) continue;
  ++counts.q2Weights;

  const e = k - s;
  if (e < 4) continue; // terminal zero count b=e-3 must be positive.
  ++counts.q2WeightsWithR3;
  const M = pow2(k);
  const D = M - P;

  // V_p=2^p*3^(s-p).  The two variable terms after multiplication by
  // 2^j are A_p=2V_p and B_p=4V_p.  This scaling removes j from both
  // lookup tables:
  //
  //   A_{j2}+B_{j3}
  //   == 2^(s+3)+M(d-1)-V_j (mod D).
  const VResidue = new Array(s);
  const AResidue = new Array(s);
  const BIndices = new Map();
  let V = P;
  for (let p = 0; p < s; ++p) {
    const vr = V % D;
    VResidue[p] = vr;
    AResidue[p] = (2n * vr) % D;
    if (p >= 6) {
      const key = (4n * vr) % D;
      const indices = BIndices.get(key);
      if (indices === undefined) BIndices.set(key, [p]);
      else indices.push(p);
    }
    if (p + 1 < s) {
      assert(V % 3n === 0n, "V recurrence lost ternary divisibility");
      V = (V / 3n) * 2n;
    }
  }

  const endpointBase = pow2(s + 3) % D;
  const mResidue = M % D;
  let tail3 = P / 9n; // 3^(s-j) at j=2.
  for (let j = 2; j < s; ++j) {
    assert(tail3 === pow3(s - j), "first-cut ternary recurrence failed");
    if (pow2(j + 1) >= pow3(j)) {
      tail3 /= 3n;
      continue;
    }
    // F is positive and strictly below 7*3^(s-j).
    if (D >= 7n * tail3) break;
    ++counts.firstCuts;

    for (let d = 1; d <= 2; ++d) {
      ++counts.targetRows;
      const target = mod(endpointBase + BigInt(d - 1) * mResidue -
        VResidue[j], D);
      for (let j2 = Math.max(j, 4); j2 < s; ++j2) {
        ++counts.secondCutLookups;
        const need = mod(target - AResidue[j2], D);
        const indices = BIndices.get(need);
        if (indices === undefined) continue;
        const at = lowerBound(indices, Math.max(j2, 6));
        if (at === indices.length) continue;
        for (let index = at; index < indices.length; ++index) {
          const j3 = indices[index];
          ++counts.modularPairs;

          const positive = pow3(s - j) +
            pow2(j2 - j + 1) * pow3(s - j2) +
            pow2(j3 - j + 2) * pow3(s - j3);
          const F = positive - pow2(s + 3 - j) -
            BigInt(d - 1) * pow2(s + e - j);
          assert(F % D === 0n, "MITM produced a false modular pair");
          ++counts.exactDivisibilityHits;
          if (F <= 0n) continue;
          const a = F / D;
          if ((a & 1n) === 0n) continue;
          const n = pow2(j) * a - 1n;
          const z = n + BigInt(d);

          // Exact no-wrap condition from the terminal inverse.
          const b = e - 3;
          const modulus = pow2(b);
          let tInv = 1n;
          // Newton iteration for P^{-1} modulo 2^b, initialized modulo 2.
          let bits = 1;
          while (bits < b) {
            const nextBits = Math.min(2 * bits, b);
            const nextModulus = pow2(nextBits);
            tInv = mod(tInv * (2n - P * tInv), nextModulus);
            bits = nextBits;
          }
          const G = pow2(s - 1 + 3) * (modulus - tInv);
          if (n >= 1n && n < G) ++counts.validNoWrapHits;
          if (firstHits.length < 8) {
            firstHits.push({
              s, k, e, j1: j, j2, j3, d,
              a: a.toString(), n: n.toString(), z: z.toString(),
              noWrap: n >= 1n && n < G
            });
          }
        }
      }
    }
    tail3 /= 3n;
  }
}

assert(counts.exactDivisibilityHits === 0,
  "r=3 finite divisibility exception requires inspection");
assert(counts.validNoWrapHits === 0,
  "r=3 strict no-wrap failure found");

console.log(JSON.stringify({
  certificate: "q2 no-wrap strict terminal delay r=3",
  determinantInput: "D/P > 1/(459*s^14), weakened from the audited linear-form estimate",
  gapConstants: {
    J0: J0.toString(), A0: A0.toString(), H0: H0.toString(),
    T0: T0.toString(), K0: K0.toString()
  },
  remainderBoundaryAudit,
  finiteLimit,
  counts,
  firstHits,
  conclusion: {
    r3StrictFailureExcludedAllDepth: true,
    arbitraryTerminalDelayExcluded: false
  }
}, null, 2));
