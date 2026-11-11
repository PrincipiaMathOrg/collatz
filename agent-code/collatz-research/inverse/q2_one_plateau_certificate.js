#!/usr/bin/env node
"use strict";

// Exact certificate for the all-depth exclusion of a single height-one
// deformation plateau at q=2, b=1.  This family has two height transitions
// but can have support of linear size.

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

function analyticCutoff() {
  const start = 948n;
  const constant = 256n * 307n ** 6n;
  assert(2n ** start > constant * start ** 90n,
    "analytic cutoff base failed");
  assert(2n ** (start - 1n) <= constant * (start - 1n) ** 90n,
    "analytic cutoff split changed");
  assert(2n * start ** 90n > (start + 1n) ** 90n,
    "analytic cutoff propagation failed");
  return {start, constant};
}

function transitionRegression(maxS) {
  let power = 1n;
  const B = [0];
  for (let i = 1; i < maxS; ++i) {
    power *= 3n;
    B.push(bitLength(power) - 1);
  }

  for (let s = 3; s <= maxS; ++s) {
    const brute = new Set();
    const height = [0];

    function inspect() {
      let transitions = 0;
      for (let i = 0; i <= s - 2; ++i) {
        if (height[i + 1] !== height[i]) ++transitions;
      }
      if (transitions !== 2) return;
      let J = 1;
      while (J <= s - 2 && height[J] === 0) ++J;
      if (J > s - 2) return;
      let K = s - 2;
      while (K >= 1 && height[K] === 0) --K;
      for (let i = J; i <= K; ++i) {
        assert(height[i] === 1,
          `nonplateau two-transition path at s=${s}`);
      }
      brute.add(`${J},${K}`);
    }

    function extend(i) {
      if (i === s - 2) {
        const gap = B[s - 1] - B[s - 2];
        if (0 <= height[i] + gap - 1) {
          height.push(0);
          inspect();
          height.pop();
        }
        return;
      }
      const gap = B[i + 1] - B[i];
      const maximum = height[i] + gap - 1;
      for (let next = 0; next <= maximum; ++next) {
        height.push(next);
        extend(i + 1);
        height.pop();
      }
    }

    extend(0);

    const classified = new Set();
    for (let J = 1; J <= s - 2; ++J) {
      if (B[J] - B[J - 1] !== 2) continue;
      for (let K = J; K <= s - 2; ++K) {
        classified.add(`${J},${K}`);
      }
    }
    assert(brute.size === classified.size,
      `two-transition count mismatch at s=${s}`);
    for (const key of brute) {
      assert(classified.has(key),
        `two-transition classification omission at s=${s}: ${key}`);
    }

    let directC0 = 0n;
    for (let i = 0; i <= s - 1; ++i) {
      directC0 += (1n << BigInt(B[i])) * 3n ** BigInt(s - 1 - i);
    }
    for (const key of classified) {
      const [J, K] = key.split(",").map(Number);
      let directC = 0n;
      let directLoss = 0n;
      for (let i = 0; i <= s - 1; ++i) {
        const inside = i >= J && i <= K;
        directC += (1n << BigInt(B[i] - (inside ? 1 : 0))) *
          3n ** BigInt(s - 1 - i);
        if (inside) {
          directLoss += (1n << BigInt(B[i] - 1)) *
            3n ** BigInt(s - 1 - i);
        }
      }
      assert(directC === directC0 - directLoss,
        `plateau carry mismatch at s=${s}: ${key}`);
    }
  }
}

function finiteResidues(maxS) {
  let P = 1n;
  let previousN = 0;
  let C0 = 0n;
  const B = [0];
  const powers3 = [1n];
  let q2Weights = 0;
  let profiles = 0;
  let denseProfiles = 0;
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
    ++q2Weights;

    const terminalDelay = N - s - 1;
    assert(terminalDelay >= 1, "unexpected empty b=1 delay range");
    assert(B[s - 1] === N - 2, "b=1 endpoint identity failed");
    const dMax = BigInt(Math.floor((terminalDelay + 1) / 2));
    const M = 1n << BigInt(N);
    const D = M - P;
    assert(dMax < D, "target interval is not shorter than determinant");
    const invM = inverse(M, D);
    const tau0 = mod(C0 * invM, D);

    const prefixLoss = Array(s).fill(0n);
    const prefixResidue = Array(s).fill(0n);
    for (let i = 1; i <= s - 2; ++i) {
      const loss = (1n << BigInt(B[i] - 1)) * powers3[s - 1 - i];
      prefixLoss[i] = prefixLoss[i - 1] + loss;
      prefixResidue[i] = mod(prefixLoss[i] * invM, D);
    }

    for (let J = 1; J <= s - 2; ++J) {
      if (B[J] - B[J - 1] !== 2) continue;
      const leftResidue = J >= 2 ? prefixResidue[J - 1] : 0n;
      for (let K = J; K <= s - 2; ++K) {
        ++profiles;
        if (2 * (K - J + 1) >= s) ++denseProfiles;
        let lossResidue = prefixResidue[K] - leftResidue;
        if (lossResidue < 0n) lossResidue += D;
        let tau = tau0 - lossResidue;
        if (tau < 0n) tau += D;
        if (tau === 0n) ++equalityFormalHits;
        if (tau >= 1n && tau <= dMax) ++strictFormalHits;
      }
    }
  }

  assert(q2Weights === 393, "q=2 weight coverage changed");
  assert(profiles === 34283711, "one-plateau coverage changed");
  assert(denseProfiles === 8547821, "dense plateau coverage changed");
  assert(strictFormalHits === 0, "strict formal plateau target hit");
  assert(equalityFormalHits === 0, "equality formal plateau target hit");
  return {q2Weights, profiles, denseProfiles, strictFormalHits,
    equalityFormalHits};
}

function main() {
  transitionRegression(12);
  const cutoff = analyticCutoff();
  const finite = finiteResidues(Number(cutoff.start - 1n));
  console.log(`finite_max_s=${cutoff.start - 1n}`);
  console.log(`finite_q2_weights=${finite.q2Weights}`);
  console.log(`one_plateau_profiles=${finite.profiles}`);
  console.log(`support_at_least_half_profiles=${finite.denseProfiles}`);
  console.log(`strict_formal_hits=${finite.strictFormalHits}`);
  console.log(`equality_formal_hits=${finite.equalityFormalHits}`);
  console.log(`analytic_start=${cutoff.start}`);
  console.log("transition_regression=true");
  console.log("analytic_base=true");
  console.log("analytic_propagation=true");
  console.log("one_plateau_profiles_excluded_all_depth=true");
}

main();
