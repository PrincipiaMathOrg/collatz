#!/usr/bin/env node
"use strict";

// Diagnostic for the denominator-one refinement of the Beatty quotient
// trajectory.  Besides exact Beatty eligibility, retain only trajectories
// for which the terminal state q is the strict least state, namely z_d > q at
// every reverse degree.  This is a finite probe, not an all-depth proof.

function v2(n) {
  let value = 0;
  while (n > 0n && (n & 1n) === 0n) {
    ++value;
    n >>= 1n;
  }
  return value;
}

const maxR = Number(process.argv[2] || 34);
let globalBest = null;
let globalDirectRatio = null;

for (let r = 3; r <= maxR; ++r) {
  const N = (3n ** BigInt(r) - 1n).toString(2).length;
  const e = N - r;
  const limit = 1n << BigInt(e - 1);
  const K = new Set();
  for (let ell = 1; ell < e; ++ell) {
    K.add(Math.floor(ell * r / e));
  }

  let exactPaths = 0;
  let leastPaths = 0;
  let directRangePaths = 0;
  let directRangeLeastPaths = 0;
  let bottomCandidates = 0;
  let best = null;
  let minDirectRatio = null;

  for (let q = 1n; q < limit; ++q) {
    let z = q;
    let least = true;
    const spikes = [];
    let exact = true;

    for (let d = r - 1; d >= 1; --d) {
      if ((z & 1n) === 0n) {
        z = 3n * z / 2n;
      } else if ((z & 3n) === 1n && K.has(d)) {
        z = (3n * z + 1n) / 4n;
        spikes.push(d);
      } else {
        exact = false;
        break;
      }
      if (z <= q) least = false;
    }

    if (!exact) continue;
    ++exactPaths;
    const V = spikes.length;
    const U = e - 1 - V;
    if (U < 1) continue;
    const directLimit = 1n << BigInt(U - 1);
    const ratioRow = {r, N, e, q, U, V, numerator: q,
      denominator: directLimit, least,
      spikes: spikes.slice().sort((a, b) => a - b)};
    if (minDirectRatio === null ||
        q * minDirectRatio.denominator <
          minDirectRatio.numerator * directLimit) {
      minDirectRatio = ratioRow;
    }
    if (q <= directLimit) {
      ++directRangePaths;
      if (least) ++directRangeLeastPaths;
    }
    if (!least) continue;
    ++leastPaths;
    const valuation = v2(3n * z - 1n);
    const gap = valuation - U;
    const row = {r, N, e, q, z0: z, U, V, valuation, gap,
      spikes: spikes.slice().sort((a, b) => a - b)};
    if (best === null || gap > best.gap ||
        (gap === best.gap && q < best.q)) {
      best = row;
    }
    if (valuation >= U + 1) ++bottomCandidates;
  }

  if (best !== null && (globalBest === null || best.gap > globalBest.gap ||
      (best.gap === globalBest.gap && best.q < globalBest.q))) {
    globalBest = best;
  }
  if (minDirectRatio !== null && (globalDirectRatio === null ||
      minDirectRatio.numerator * globalDirectRatio.denominator <
        globalDirectRatio.numerator * minDirectRatio.denominator)) {
    globalDirectRatio = minDirectRatio;
  }

  console.log(JSON.stringify({r, N, e, exactPaths, leastPaths,
    directRangePaths, directRangeLeastPaths, bottomCandidates, best}, (_, value) =>
      typeof value === "bigint" ? value.toString() : value));
}

console.log("global=" + JSON.stringify(globalBest, (_, value) =>
  typeof value === "bigint" ? value.toString() : value, 2));
console.log("globalDirectRatio=" + JSON.stringify(globalDirectRatio, (_, value) =>
  typeof value === "bigint" ? value.toString() : value, 2));
