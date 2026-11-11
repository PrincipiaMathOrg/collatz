#!/usr/bin/env node
"use strict";

// Exact certificate for the singleton first-defect theorem at terminal
// complement b=1.  It checks every formal strict and equality residue below
// the analytic cutoff.  A formal residue need not be a realized positive
// orbit, so the finite check is stronger than the required path check.

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
  return n.toString(2).length;
}

function finiteResidues(maxS) {
  let P = 1n;
  let previousN = 0;
  let C0 = 0n;
  const B = [0];
  const powers3 = [1n];
  let q2Weights = 0;
  let eligibleSingletons = 0;
  let strictFormalHits = 0;
  let equalityFormalHits = 0;

  for (let s = 1; s <= maxS; ++s) {
    const nextB = bitLength(P) - 1;
    if (s - 1 >= B.length) B.push(nextB);
    C0 = 3n * C0 + (1n << BigInt(nextB));
    P *= 3n;
    powers3.push(P);
    const N = bitLength(P);
    const increment = N - previousN;
    previousN = N;
    if (increment !== 1 || s < 3) continue;

    const e = N - s;
    const terminalDelay = e - 1;
    assert(terminalDelay >= 1,
      "q=2 singleton range unexpectedly has empty terminal delay");
    ++q2Weights;
    assert(B[s - 1] === N - 2, "b=1 endpoint identity failed");

    const M = 1n << BigInt(N);
    const D = M - P;
    const invM = inverse(M, D);
    const dMax = BigInt(Math.floor((terminalDelay + 1) / 2));
    assert(dMax < D, "target interval is not shorter than determinant");

    for (let J = 1; J <= s - 2; ++J) {
      // Lowering B_J by one is path-valid exactly across a preceding gap 2.
      if (B[J] - B[J - 1] !== 2) continue;
      assert(B[J] - 1 > B[J - 1] && B[J] - 1 < B[J + 1],
        "singleton transposition is not strictly anchored");
      ++eligibleSingletons;
      const E = (1n << BigInt(B[J] - 1)) * powers3[s - 1 - J];
      const C = C0 - E;
      const tau = mod(C * invM, D);
      if (tau === 0n) ++equalityFormalHits;
      if (tau >= 1n && tau <= dMax) ++strictFormalHits;
    }
  }

  assert(equalityFormalHits === 0, "singleton equality residue hit");
  assert(strictFormalHits === 0, "singleton strict residue hit");
  assert(q2Weights === 2088, "q=2 weight coverage changed");
  assert(eligibleSingletons === 3070699,
    "eligible singleton coverage changed");
  return {q2Weights, eligibleSingletons, strictFormalHits,
    equalityFormalHits};
}

function analyticCutoff() {
  const start = 5032n;
  const constant = 96n * 307n ** 2n * 461n ** 24n;

  // These are the two rational estimates used to eliminate J.
  assert(4n ** 3n > 2n * 3n ** 3n,
    "2 < (4/3)^3 failed");
  assert(4n ** 6n < 6n * 3n ** 6n,
    "(4/3)^6 < 6 failed");

  assert(2n ** start > constant * start ** 390n,
    "analytic cutoff base failed");
  assert(2n ** (start - 1n) <= constant * (start - 1n) ** 390n,
    "analytic cutoff split changed");
  assert(2n * start ** 390n > (start + 1n) ** 390n,
    "analytic cutoff propagation failed");
  return {start, constant};
}

function main() {
  const cutoff = analyticCutoff();
  const finite = finiteResidues(Number(cutoff.start - 1n));
  console.log(`finite_max_s=${cutoff.start - 1n}`);
  console.log(`finite_q2_weights=${finite.q2Weights}`);
  console.log(`eligible_singleton_profiles=${finite.eligibleSingletons}`);
  console.log(`strict_formal_hits=${finite.strictFormalHits}`);
  console.log(`equality_formal_hits=${finite.equalityFormalHits}`);
  console.log(`analytic_start=${cutoff.start}`);
  console.log(`analytic_base=true`);
  console.log(`analytic_propagation=true`);
  console.log(`singleton_first_defect_excluded_all_depth=true`);
}

main();
