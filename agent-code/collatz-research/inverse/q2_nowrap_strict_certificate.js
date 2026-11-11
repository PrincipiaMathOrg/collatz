#!/usr/bin/env node
"use strict";

// Exact certificate for the terminal-delay r=1 and r=2 subcases of a
// hypothetical q_s=2, zero-lift, no-wrap strict FCD failure.  This is not a
// certificate for arbitrary terminal delay.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function pow2(n) {
  assert(Number.isInteger(n) && n >= 0, "invalid power of two");
  return 1n << BigInt(n);
}

function pow3(n) {
  assert(Number.isInteger(n) && n >= 0, "invalid power of three");
  return 3n ** BigInt(n);
}

function parameters(s) {
  const P = pow3(s);
  const k = P.toString(2).length;
  const M = pow2(k);
  return {s, k, e: k - s, P, M, D: M - P};
}

function isQ2(s) {
  return parameters(s).k - parameters(s - 1).k === 1;
}

// The audited linear-form estimate in the main research ledger implies the
// deliberately weakened exact bound D > P/(459*s^14), for s >= 1.
function checkDeterminantLowerBoundForm(x) {
  // This function records only the integer comparison used after the external
  // analytic estimate has been invoked; it does not re-prove that estimate.
  return 459n * BigInt(x.s) ** 14n * x.D > x.P;
}

const counts = {
  q2WeightsR1Finite: 0,
  r1FiniteCandidates: 0,
  r1DivisibilityHits: 0,
  q2WeightsR2Finite: 0,
  r2FirstCutCandidates: 0,
  r2FiniteCandidates: 0,
  r2DivisibilityHits: 0,
  q2WeightsR3Probe: 0,
  r3ProbeCandidatesD1: 0,
  r3ProbeCandidatesD2: 0,
  r3ProbeHitsD1: 0,
  r3ProbeHitsD2: 0
};

// r=1: d=1 and, with t=s-j,
//   D*a = 3^t - 2^(t+1).
// The first-crossing barrier requires j>=2; positivity requires t>=4.
const r1FiniteLimit = 250;
for (let s = 3; s < r1FiniteLimit; ++s) {
  if (!isQ2(s)) continue;
  ++counts.q2WeightsR1Finite;
  const {D} = parameters(s);
  for (let j = 2; j <= s - 4; ++j) {
    const t = s - j;
    const B = pow3(t) - pow2(t + 1);
    assert(B > 0n, "r=1 positivity range failed");
    ++counts.r1FiniteCandidates;
    if (B % D === 0n) {
      ++counts.r1DivisibilityHits;
      throw new Error(`r=1 divisibility hit s=${s} j=${j}`);
    }
  }
}

// For s>=250, the two necessary nonzero divisibilities give the sufficient
// contradiction 2^s > (7*459^2/3)*s^28.  The coefficient is integral.
const r1Constant = 7n * 459n * 459n / 3n;
assert(7n * 459n * 459n % 3n === 0n, "r=1 constant not integral");
assert(pow2(r1FiniteLimit) >
  r1Constant * BigInt(r1FiniteLimit) ** 28n,
  "r=1 large-range seed inequality failed");
assert(2n * BigInt(r1FiniteLimit) ** 28n >
  BigInt(r1FiniteLimit + 1) ** 28n,
  "r=1 propagation ratio failed");

// r=2: d=1.  Put j=j_1, J=j_2, h=J-j, t=s-J.  Dividing the
// endpoint equation by 2^j gives
//   D*a = F = 3^(s-j)+2^(h+1)3^t-2^(s-j+2).
// A candidate must have D|F and F>0.  The exact finite loop retains all
// barrier-compatible j,J below the analytic cutoff.  The cheap bound
// F<3^(s-j+1) is used only to skip impossible first cuts.
const r2FiniteLimit = 1200;
for (let s = 4; s < r2FiniteLimit; ++s) {
  if (!isQ2(s)) continue;
  const x = parameters(s);
  if (x.e < 3) continue; // b=e-r >= 1 for r=2.
  ++counts.q2WeightsR2Finite;
  for (let j = 2; j < s; ++j) {
    if (pow2(j + 1) >= pow3(j)) continue;
    if (x.D >= pow3(s - j + 1)) continue;
    ++counts.r2FirstCutCandidates;
    for (let J = Math.max(j, 4); J < s; ++J) {
      if (pow2(J + 2) >= pow3(J)) continue;
      const h = J - j;
      const t = s - J;
      const F = pow3(s - j) + pow2(h + 1) * pow3(t) -
        pow2(s - j + 2);
      ++counts.r2FiniteCandidates;
      if (F <= 0n || F % x.D !== 0n) continue;

      // These are the two complementary eliminated remainders.  If F were a
      // genuine hit, both must vanish modulo D.  Recording them here makes a
      // false positive impossible even if the first filter is later changed.
      const H = pow2(x.e + j - 2) * (pow3(h) + pow2(h + 1)) - pow3(J);
      const q = t + j;
      const G = pow3(q) - pow2(t + 1) * pow3(j) +
        pow2(x.e + q - 1);
      assert(H % x.D === 0n, "r=2 H elimination mismatch");
      assert(G % x.D === 0n, "r=2 G elimination mismatch");
      ++counts.r2DivisibilityHits;
      throw new Error(`r=2 divisibility hit s=${s} j=${j} J=${J}`);
    }
  }
}

// Targeted r=3 probe.  The theorem below deliberately stops at r=2.  This
// finite calculation tests the first qualitative threshold: d may now be 2,
// and z=n+2 is congruent to 1 (rather than 0) modulo the initial 2^j block.
// For d in {1,2}, a necessary exact equation is
//
// D*a = sum_{ell=1}^3 2^(j_ell-j_1+ell-1) 3^(s-j_ell)
//       -2^(s+3-j_1)-2^(s+e-j_1)(d-1).
//
// The probe is finite evidence only and is not used by either theorem.
const r3ProbeLimit = 300;
const r3ProbeFirstHits = [];
for (let s = 6; s <= r3ProbeLimit; ++s) {
  if (!isQ2(s)) continue;
  const x = parameters(s);
  if (x.e < 4) continue; // b=e-r >= 1 for r=3.
  ++counts.q2WeightsR3Probe;
  for (let j = 2; j < s; ++j) {
    if (pow2(j + 1) >= pow3(j)) continue;
    // The positive part is strictly below 7*3^(s-j).
    if (x.D >= 7n * pow3(s - j)) continue;
    for (let j2 = Math.max(j, 4); j2 < s; ++j2) {
      if (pow2(j2 + 2) >= pow3(j2)) continue;
      for (let j3 = Math.max(j2, 6); j3 < s; ++j3) {
        if (pow2(j3 + 3) >= pow3(j3)) continue;
        const positive = pow3(s - j) +
          pow2(j2 - j + 1) * pow3(s - j2) +
          pow2(j3 - j + 2) * pow3(s - j3);
        for (let d = 1; d <= 2; ++d) {
          const F = positive - pow2(s + 3 - j) -
            pow2(s + x.e - j) * BigInt(d - 1);
          const keyCandidates = d === 1 ? "r3ProbeCandidatesD1" :
            "r3ProbeCandidatesD2";
          const keyHits = d === 1 ? "r3ProbeHitsD1" : "r3ProbeHitsD2";
          ++counts[keyCandidates];
          if (F <= 0n || F % x.D !== 0n) continue;
          ++counts[keyHits];
          if (r3ProbeFirstHits.length < 4) {
            r3ProbeFirstHits.push({
              s, j1: j, j2, j3, d,
              a: (F / x.D).toString()
            });
          }
        }
      }
    }
  }
}

// Large r=2 range.  From F<3^(s-j+1) and the determinant bound one gets
// 3^(j-1)<459*s^14.  The following five-residue/ten-residue base checks and
// propagation ratios prove j<=s/10 for every s>=1200.
for (let s = r2FiniteLimit; s < r2FiniteLimit + 10; ++s) {
  assert(pow3(Math.floor(s / 10)) >= 459n * BigInt(s) ** 14n,
    `r=2 j cutoff base failed at s=${s}`);
}
assert(3n * BigInt(r2FiniteLimit) ** 14n >
  BigInt(r2FiniteLimit + 10) ** 14n,
  "r=2 j cutoff propagation failed");

// If m=min(J,t+j), then m<=(s+j)/2<=11s/20.  Both complementary
// remainders have absolute value at most
//   U(m)=2^e*3^m + 2^(e+m) + 3^m.
// Using 2^e < (4/3)(3/2)^s, U(floor(11s/20)) is bounded by U_num/2^s
// below.  We verify 20 residue classes and propagate in jumps of 20.
function r2UpperNumerator(s) {
  const m = Math.floor(11 * s / 20);
  return 4n * pow3(s - 1 + m) +
    4n * pow3(s - 1) * pow2(m) +
    pow3(m) * pow2(s);
}

for (let s = r2FiniteLimit; s < r2FiniteLimit + 20; ++s) {
  const lhs = 459n * BigInt(s) ** 14n * r2UpperNumerator(s);
  const rhs = pow3(s) * pow2(s);
  assert(lhs < rhs, `r=2 large-range base failed at s=${s}`);
}

// In a fixed residue class modulo 20, floor(11s/20) rises by 11.  The
// fastest term in the upper numerator rises by 3^(20+11)=3^31, whereas the
// right side rises by 6^20.  This exact ratio also absorbs s^14.
assert(BigInt(r2FiniteLimit + 20) ** 14n * pow3(31) <
  BigInt(r2FiniteLimit) ** 14n * 6n ** 20n,
  "r=2 upper-bound propagation failed");

// Mandatory counterexample to a tempting but false shortcut: D need not
// exceed the r=1 numerator.  The argument really needs the second eliminated
// remainder, not a one-sided magnitude comparison.
{
  const s = 17, j = 2, t = s - j;
  const {D} = parameters(s);
  const B = pow3(t) - pow2(t + 1);
  assert(isQ2(s) && D < B && B % D !== 0n,
    "naive one-divisibility regression changed");
}

console.log(JSON.stringify({
  certificate: "q2 no-wrap strict terminal delays r=1,2",
  determinantInput: "D/P > 1/(459*s^14), weakened from the audited linear-form estimate",
  r1FiniteLimit,
  r1LargeConstant: r1Constant.toString(),
  r2FiniteLimit,
  r3ProbeLimit,
  counts,
  conclusions: {
    r1StrictFailureExcludedAllDepth: counts.r1DivisibilityHits === 0,
    r2StrictFailureExcludedAllDepth: counts.r2DivisibilityHits === 0,
    arbitraryTerminalDelayExcluded: false
  },
  r3Probe: {
    status: "finite necessary-divisibility probe only",
    firstHits: r3ProbeFirstHits,
    qualitativeThreshold: "for d=2, z=n+2=2^j*a+1 loses the 2^j endpoint factor"
  },
  regression: {
    falseClaim: "D always exceeds 3^(s-j)-2^(s-j+1)",
    counterexample: {s: 17, j: 2}
  }
}, null, 2));
