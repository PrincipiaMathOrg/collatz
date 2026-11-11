#!/usr/bin/env node
"use strict";

// Exact accelerated search for a counterexample to
//     q=z_{r-1}<2^(e-1),  v2(3*z_0-1)>=U+1.
//
// After a high-degree prefix, write every still possible terminal value as
//     q=q0+t*2^L,
// and the corresponding current value as
//     x=x0+t*A.
// Here A is odd.  A no-spike step fixes one bit of t; a spike step fixes two.
// Once L>=e-1, q is pinned, so the remaining R-trajectory is simulated
// deterministically instead of extending a symbolic affine expression.

function bitLength(n) { return n.toString(2).length; }

function v2(n) {
  if (n === 0n) return Infinity;
  let v = 0;
  while ((n & 1n) === 0n) { n >>= 1n; ++v; }
  return v;
}

const maxR = Number(process.argv[2] || 120);
const minR = Number(process.argv[3] || 3);
const verbose = process.argv.includes("--verbose");

for (let r = minR; r <= maxR; ++r) {
  const N = bitLength(3n ** BigInt(r) - 1n);
  const e = N - r;
  const H = e - 1;
  const limit = 1n << BigInt(H);
  const eligible = new Uint8Array(r);
  for (let i = 1; i < e; ++i) eligible[Math.floor(i * r / e)] = 1;

  let symbolicNodes = 0;
  let pinnedTrajectories = 0;
  let completeTrajectories = 0;
  let counterexample = null;
  let bestGap = null;

  function finishPinned(d, q, x, spikes, spikeDegrees) {
    ++pinnedTrajectories;
    // A pinned suffix is simulated off-tree; keep its diagnostics local so
    // sibling symbolic branches do not see degrees appended here.
    const completedSpikes = verbose ? spikeDegrees.slice() : spikeDegrees;
    for (let degree = d; degree >= 1; --degree) {
      if ((x & 1n) === 0n) {
        x = 3n * x / 2n;
      } else if ((x & 3n) === 1n && eligible[degree]) {
        x = (3n * x + 1n) / 4n;
        ++spikes;
        if (verbose) completedSpikes.push(degree);
      } else {
        return;
      }
    }
    ++completeTrajectories;
    const U = H - spikes;
    if (U < 1) return;
    const valuation = v2(3n * x - 1n);
    const gap = valuation - U;
    if (bestGap === null || gap > bestGap.gap ||
        (gap === bestGap.gap && q < BigInt(bestGap.q))) {
      bestGap = {q:q.toString(),z0:x.toString(),U,V:spikes,
        valuation,gap};
      if (verbose) bestGap.spikes = completedSpikes.slice().sort((a,b)=>a-b);
    }
    if (valuation < U + 1) return;
    const tau = (3n * x - 1n) >> BigInt(U + 1);
    if (tau <= 0n) return;
    counterexample = {r,N,e,q:q.toString(),s:(2n*q).toString(),
      z0:x.toString(),U,V:spikes,valuation,tau:tau.toString()};
    if (verbose) counterexample.spikes = completedSpikes.slice().sort((a,b)=>a-b);
  }

  // State invariant:
  // q=q0+t*2^L and current x=x0+t*A for t>=0, with A odd.
  function visit(d, q0, x0, A, L, spikes, spikeDegrees) {
    ++symbolicNodes;
    if (counterexample !== null) return;

    if (L >= H) {
      // q0 is the unique nonnegative representative modulo 2^L.  The only
      // positive representative below 2^H is q0 itself.
      if (q0 === 0n || q0 >= limit) return;
      finishPinned(d, q0, x0, spikes, spikeDegrees);
      return;
    }
    if (d === 0) {
      // This can occur only at tiny r. Enumerate the remaining q lifts exactly.
      const modulus = 1n << BigInt(L);
      for (let q = q0 === 0n ? modulus : q0; q < limit; q += modulus) {
        const t = (q - q0) / modulus;
        finishPinned(0, q, x0 + t * A, spikes,
          verbose ? spikeDegrees.slice() : spikeDegrees);
        if (counterexample !== null) return;
      }
      return;
    }

    const modulus = 1n << BigInt(L);

    // No spike: choose the unique j in {0,1} for which x0+j*A is even.
    {
      const j = x0 & 1n; // A is odd.
      const nextQ = q0 + j * modulus;
      const nextX = 3n * (x0 + j * A) / 2n;
      const nextL = L + 1;
      const nextModulus = modulus << 1n;
      const leastPositive = nextQ === 0n ? nextModulus : nextQ;
      if (leastPositive < limit) {
        visit(d - 1, nextQ, nextX, 3n * A, nextL, spikes, spikeDegrees);
      }
    }

    // Spike: choose the unique j in {0,1,2,3} for which x0+j*A == 1 mod 4.
    if (eligible[d]) {
      let j = 0n;
      while (((x0 + j * A) & 3n) !== 1n) ++j;
      const nextQ = q0 + j * modulus;
      const nextX = (3n * (x0 + j * A) + 1n) / 4n;
      const nextL = L + 2;
      const nextModulus = modulus << 2n;
      const leastPositive = nextQ === 0n ? nextModulus : nextQ;
      if (leastPositive < limit) {
        if (verbose) spikeDegrees.push(d);
        visit(d - 1, nextQ, nextX, 3n * A, nextL, spikes + 1,
          spikeDegrees);
        if (verbose) spikeDegrees.pop();
      }
    }
  }

  const started = Date.now();
  visit(r - 1, 0n, 0n, 1n, 0, 0, []);
  const milliseconds = Date.now() - started;
  console.log(JSON.stringify({r,N,e,symbolicNodes,pinnedTrajectories,
    completeTrajectories,bestGap,counterexample,milliseconds}));
  if (counterexample !== null) {
    process.exitCode = 1;
    break;
  }
}
