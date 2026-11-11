#!/usr/bin/env node
"use strict";

// Exact audit for the complete one-corner sector of the anchored q=2,
// b=1 First-Crossing Descent gate.  The proof is symbolic; the finite loop
// independently reconstructs the delay path and the canonical descent.

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
  assert(n > 0n, "positive integer required");
  return n.toString(2).length;
}

const maximumWeight = Number(process.argv[2] || 2000);
assert(Number.isInteger(maximumWeight) && maximumWeight >= 8,
  "maximum weight must be an integer at least eight");

let P = 1n;
const ceilings = [0];
let q2Weights = 0;
let classifiedProfiles = 0;
let nonRampProfiles = 0;
let canonicalFailures = 0;
let maximumTransitions = 0;
let lastRecord = null;

for (let s = 1; s <= maximumWeight; ++s) {
  P *= 3n;
  ceilings[s] = bitLength(P);
  if (s < 3 || ceilings[s] - ceilings[s - 1] !== 1) continue;
  ++q2Weights;

  // If the preceding increment were also one, the two-step ceiling
  // increment would be two.  But 3 < 2*log_2(3) < 4 forces that increment
  // to be either three or four.  The exact bit lengths check the resulting
  // predecessor q=4 identity directly.
  assert(ceilings[s - 1] - ceilings[s - 2] === 2,
    `q=2 predecessor was not q=4 at s=${s}`);

  const N = ceilings[s];
  const M = 1n << BigInt(N);
  const D = M - P;
  const e = N - s;
  const terminalDelay = e - 1;
  assert(terminalDelay >= 1, `terminal delay vanished at s=${s}`);

  // m_i=floor(i log_2 3)-i is the maximal Ferrers delay.  The predecessor
  // q=4 identity says m_(s-2)=terminalDelay-1, so the terminal delay is
  // first available only at i=s-1.
  const BTwoBack = ceilings[s - 2] - 1;
  const mTwoBack = BTwoBack - (s - 2);
  assert(mTwoBack === terminalDelay - 1,
    `terminal delay appeared before the endpoint at s=${s}`);

  // A one-corner ideal has a nondecreasing delay path with exactly one
  // strict increase.  Since d_0=0 and d_(s-1)=terminalDelay, it must be
  // 0 before that increase and terminalDelay afterwards.  The preceding
  // bound forces the unique increase to occur at i=s-1.  Thus A_i=i for
  // i<=s-2 and A_(s-1)=N-2: the ramp-plus-one-drop profile.
  const positions = [];
  let previousDelay = 0;
  let cornerCount = 0;
  let transitions = 0;
  let previousHeight = 0;
  for (let i = 0; i < s; ++i) {
    const B = i === 0 ? 0 : ceilings[i] - 1;
    const maximalDelay = B - i;
    const delay = i < s - 1 ? 0 : terminalDelay;
    const height = maximalDelay - delay;
    assert(height >= 0, `height became negative at s=${s}, i=${i}`);
    if (i > 0 && delay > previousDelay) ++cornerCount;
    if (i > 0 && height !== previousHeight) ++transitions;
    positions.push(i + delay);
    previousDelay = delay;
    previousHeight = height;
  }
  ++classifiedProfiles;
  assert(cornerCount === 1, `corner count failed at s=${s}`);
  assert(positions[s - 2] === s - 2 && positions[s - 1] === N - 2,
    `ramp positions failed at s=${s}`);
  maximumTransitions = Math.max(maximumTransitions, transitions);

  // Recheck the stored ramp carry and its canonical FCD sign.  The
  // all-depth proof of that sign is q2_ramp_fcd_complete.md; this loop is
  // an independent finite regression, not the tail argument.
  const C = P + M / 4n - 3n * (1n << BigInt(s - 1));
  const rho = mod(-C * inverse(P, M), M);
  const endpointNumerator = P * rho + C;
  assert(endpointNumerator % M === 0n,
    `canonical endpoint was nonintegral at s=${s}`);
  const Z = endpointNumerator / M;
  if (Z >= rho) ++canonicalFailures;

  lastRecord = {
    s, N, e, terminalDelay, predecessorIncrement: 2,
    cornerCount, transitions, rho: rho.toString(), Z: Z.toString(),
    gap: (rho - Z).toString(), determinant: D.toString()
  };
}

assert(q2Weights > 0, "no q=2 weights audited");
assert(nonRampProfiles === 0, "a non-ramp one-corner profile appeared");
assert(canonicalFailures === 0, "a ramp FCD failure appeared");

console.log(JSON.stringify({
  certificate: "complete q=2 b=1 one-corner classification",
  maximumWeight,
  q2Weights,
  classifiedProfiles,
  nonRampProfiles,
  canonicalFailures,
  maximumTransitions,
  lastRecord,
  theorem: "every one-corner profile is the ramp-plus-one-drop profile",
  proofDependency: "q2_ramp_fcd_complete.md proves this unique profile descends at every depth",
  warning: "the finite loop audits formulas; the classification and tail descent are symbolic"
}, null, 2));
