#!/usr/bin/env node
"use strict";

// Exact research probe for the square-root cylinder barrier
//
//     q^2 >= 2^D.
//
// It compares four classes:
//   (1) complete anchored rational Beatty leaves, D=U;
//   (2) partial paths under the fixed lower Sturmian clock,
//       D=floor(gamma(t+1))-V;
//   (3) arbitrary partial paths with no factor SSS, with the same D.
//   (4) unrestricted partial paths, used only to test whether no-SSS is
//       visible at the finite cutoff.
//
// All clock floors and all comparisons use BigInt arithmetic.

function bitLength(n) {
  return n.toString(2).length;
}

const maxAnchoredR = Number(process.argv[2] || 45);
const maxLowerT = Number(process.argv[3] || 45);
const maxRun2T = Number(process.argv[4] || 35);
const maxUnrestrictedT = Number(process.argv[5] || 40);
const powerLimit = Math.max(maxAnchoredR, maxLowerT + 1, maxRun2T + 1,
  maxUnrestrictedT + 1);
if (![maxAnchoredR, maxLowerT, maxRun2T, maxUnrestrictedT]
    .every(Number.isInteger)) {
  throw new Error("integer cutoffs required");
}

const powers3 = [1n];
for (let t = 1; t <= powerLimit; ++t) powers3.push(powers3[t - 1] * 3n);

function floorGamma(t) {
  return bitLength(powers3[t]) - 1 - t;
}

function ratioLess(a, b) {
  if (b === null) return true;
  if (a.exp >= b.exp) {
    return a.num < (b.num << BigInt(a.exp - b.exp));
  }
  return (a.num << BigInt(b.exp - a.exp)) < b.num;
}

function ratioEqual(a, b) {
  if (b === null) return false;
  if (a.exp >= b.exp) {
    return a.num === (b.num << BigInt(a.exp - b.exp));
  }
  return (a.num << BigInt(b.exp - a.exp)) === b.num;
}

function belowBarrier(q, D) {
  if (D <= 0) return false;
  return q * q < (1n << BigInt(D));
}

function equalBarrier(q, D) {
  if (D < 0) return false;
  return q * q === (1n << BigInt(D));
}

function row(t, q, z, V, D, path, extra = {}) {
  return {t, q: q.toString(), z: z.toString(), V, D,
    square: (q * q).toString(), path: path.join(""), ...extra};
}

function children(t, q, z, modulus, power3, V, spikeAllowed, spikeRun) {
  const out = [];
  {
    const j = Number(z & 1n);
    const input = z + BigInt(j) * power3;
    out.push({symbol: "O", q: q + BigInt(j) * modulus,
      z: 3n * input / 2n, modulus: modulus << 1n,
      power3: power3 * 3n, V, spikeRun: 0});
  }
  if (spikeAllowed) {
    const j = Number(((1n - (z & 3n)) * (power3 & 3n)) & 3n);
    const input = z + BigInt(j) * power3;
    if ((input & 3n) !== 1n) throw new Error("spike lift failure");
    out.push({symbol: "S", q: q + BigInt(j) * modulus,
      z: (3n * input + 1n) / 4n, modulus: modulus << 2n,
      power3: power3 * 3n, V: V + 1, spikeRun: spikeRun + 1});
  }
  out.sort((a, b) => a.q < b.q ? -1 : a.q > b.q ? 1 : 0);
  return out;
}

function anchoredAudit(maxR) {
  let nodes = 0;
  let leaves = 0;
  let bestLeaf = null;
  let bestPartial = null;
  let firstFailure = null;
  let firstEquality = null;
  let firstFactorTwoFailure = null;
  let firstFactorTwoEquality = null;

  for (let r = 3; r <= maxR; ++r) {
    const e = floorGamma(r) + 1;
    const n = r - 1;
    const bits = [0];
    const cumulative = [0];
    let old = 0;
    for (let t = 1; t <= n; ++t) {
      const now = Number((BigInt(e) * BigInt(t)) / BigInt(r));
      bits.push(now - old);
      cumulative.push(now);
      old = now;
    }

    function visit(t, q, z, modulus, power3, V, path) {
      ++nodes;
      const H = cumulative[t] - V;
      if (H >= 1) {
        const candidate = {num: q * q, exp: H,
          datum: row(t, q, z, V, H, path, {r, e, kind: "partial"})};
        if (ratioLess(candidate, bestPartial)) bestPartial = candidate;
        if (firstFailure === null && belowBarrier(q, H)) {
          firstFailure = candidate.datum;
        }
        if (firstFactorTwoFailure === null && q * q < (2n << BigInt(H))) {
          firstFactorTwoFailure = candidate.datum;
        }
        if (firstFactorTwoEquality === null && q * q === (2n << BigInt(H))) {
          firstFactorTwoEquality = candidate.datum;
        }
      }
      if (t === n) {
        const U = e - 1 - V;
        if (U < 1) return;
        ++leaves;
        const candidate = {num: q * q, exp: U,
          datum: row(t, q, z, V, U, path, {r, e, U, kind: "leaf"})};
        if (ratioLess(candidate, bestLeaf)) bestLeaf = candidate;
        if (firstFailure === null && belowBarrier(q, U)) {
          firstFailure = candidate.datum;
        }
        if (firstEquality === null && equalBarrier(q, U)) {
          firstEquality = candidate.datum;
        }
        if (firstFactorTwoFailure === null && q * q < (2n << BigInt(U))) {
          firstFactorTwoFailure = candidate.datum;
        }
        if (firstFactorTwoEquality === null && q * q === (2n << BigInt(U))) {
          firstFactorTwoEquality = candidate.datum;
        }
        return;
      }

      // Every descendant has q' >= q and both its partial H and its leaf U
      // are at most e-1-V.  Once this common lower ratio bound cannot
      // improve either recorded minimum, the whole subtree is irrelevant.
      const bound = {num: q * q, exp: e - 1 - V};
      if (bestLeaf !== null && bestPartial !== null &&
          !ratioLess(bound, bestLeaf) && !ratioLess(bound, bestPartial)) {
        return;
      }
      for (const child of children(t, q, z, modulus, power3, V,
          bits[t + 1] === 1, 0)) {
        path.push(child.symbol);
        visit(t + 1, child.q, child.z, child.modulus, child.power3,
          child.V, path);
        path.pop();
      }
    }

    visit(0, 1n, 1n, 1n, 1n, 0, []);
  }
  return {maxR, nodes, visitedLeaves: leaves,
    bestLeaf: bestLeaf && bestLeaf.datum,
    bestPartial: bestPartial && bestPartial.datum,
    firstEquality, firstFailure, firstFactorTwoEquality,
    firstFactorTwoFailure};
}

function partialAudit(kind, maxT, minD = 1) {
  let nodes = 0;
  let best = null;
  let firstFailure = null;
  let firstEquality = null;
  let firstFactorTwoFailure = null;
  let firstFactorTwoEquality = null;

  function visit(t, q, z, modulus, power3, V, spikeRun, path) {
    ++nodes;
    const D = floorGamma(t + 1) - V;
    if (D >= minD) {
      const candidate = {num: q * q, exp: D,
        datum: row(t, q, z, V, D, path, {kind})};
      if (ratioLess(candidate, best)) best = candidate;
      if (firstFailure === null && belowBarrier(q, D)) {
        firstFailure = candidate.datum;
      }
      if (firstEquality === null && equalBarrier(q, D)) {
        firstEquality = candidate.datum;
      }
      if (firstFactorTwoFailure === null && q * q < (2n << BigInt(D))) {
        firstFactorTwoFailure = candidate.datum;
      }
      if (firstFactorTwoEquality === null && q * q === (2n << BigInt(D))) {
        firstFactorTwoEquality = candidate.datum;
      }
    }
    if (t === maxT || firstFailure !== null) return;

    // For every descendant s <= maxT, q' >= q and
    // D_s <= floor(gamma(maxT+1))-V.  This is an exact lower bound for all
    // descendant ratios.
    const bound = {num: q * q, exp: floorGamma(maxT + 1) - V};
    if (best !== null && !ratioLess(bound, best)) return;

    const spikeAllowed = kind === "lower"
      ? floorGamma(t + 1) - floorGamma(t) === 1
      : kind === "run2" ? spikeRun < 2 : true;
    for (const child of children(t, q, z, modulus, power3, V,
        spikeAllowed, spikeRun)) {
      path.push(child.symbol);
      visit(t + 1, child.q, child.z, child.modulus, child.power3,
        child.V, child.spikeRun, path);
      path.pop();
      if (firstFailure !== null) return;
    }
  }

  visit(0, 1n, 1n, 1n, 1n, 0, 0, []);
  return {kind, maxT, minD, nodes, best: best && best.datum,
    firstEquality, firstFailure, firstFactorTwoEquality,
    firstFactorTwoFailure};
}

const anchored = anchoredAudit(maxAnchoredR);
const lower = partialAudit("lower", maxLowerT);
const lowerNontrivial = partialAudit("lower", maxLowerT, 2);
const run2 = partialAudit("run2", maxRun2T);
const run2Nontrivial = partialAudit("run2", maxRun2T, 2);
const unrestricted = partialAudit("unrestricted", maxUnrestrictedT);
console.log(JSON.stringify({anchored, lower, lowerNontrivial, run2,
  run2Nontrivial, unrestricted,
  factorTwoStatus: anchored.firstFactorTwoFailure ||
      lower.firstFactorTwoFailure || run2.firstFactorTwoFailure ||
      unrestricted.firstFactorTwoFailure
    ? "FACTOR_TWO_FAILURE_FOUND" : "NO_FACTOR_TWO_FAILURE_IN_RANGE",
  status:
  anchored.firstFailure || lower.firstFailure || run2.firstFailure ||
      lowerNontrivial.firstFailure || run2Nontrivial.firstFailure ||
      unrestricted.firstFailure
    ? "FAILURE_FOUND" : "NO_FAILURE_IN_RANGE"}));
if (anchored.firstFailure || lower.firstFailure || run2.firstFailure ||
    lowerNontrivial.firstFailure || run2Nontrivial.firstFailure ||
    unrestricted.firstFailure) {
  process.exitCode = 1;
}
