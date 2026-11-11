#!/usr/bin/env node
"use strict";

// Exact residue-tree search for a counterexample to s=t+1 >= 2^e.
// A node represents x=(A*q+B)/2^L after processing high degrees.
// The no-spike branch adds one binary congruence bit; a spike adds two.
// Residues whose least positive representative is already >=2^(e-1)
// can never return below the target interval and are pruned exactly.

function bitLength(n) { return n.toString(2).length; }

function extendResidue(A, B, L, residue, extra) {
  const oldModulus = 1n << BigInt(L);
  const newModulus = oldModulus << BigInt(extra);
  for (let j = 0n; j < (1n << BigInt(extra)); ++j) {
    const candidate = residue + j * oldModulus;
    if ((A * candidate + B) % newModulus === 0n) return candidate;
  }
  throw new Error("odd coefficient failed to give a unique lift");
}

const maxR = Number(process.argv[2] || 80);
const minR = Number(process.argv[3] || 3);
for (let r = minR; r <= maxR; ++r) {
  const P = 3n ** BigInt(r);
  const N = bitLength(P - 1n);
  const e = N - r;
  const limit = 1n << BigInt(e - 1);
  const K = new Set(Array.from({length: e - 1}, (_, i) =>
    Math.floor((i + 1) * r / e)));
  let nodes = 0;
  let leaves = 0;
  let counterexample = null;
  let maxValuationGap = null;

  function visit(d, A, B, L, residue, spikes) {
    ++nodes;
    if (counterexample !== null) return;
    if (d === 0) {
      if (residue === 0n) return;
      ++leaves;
      const q = residue;
      const numerator = A * q + B;
      const divisor = 1n << BigInt(L);
      if (numerator % divisor !== 0n) throw new Error("bad affine leaf");
      const z0 = numerator / divisor;
      const V = spikes.length;
      const U = e - 1 - V;
      if (U < 1) return;
      let valuation = 0;
      let valuationWork = 3n * z0 - 1n;
      while (valuationWork !== 0n && (valuationWork & 1n) === 0n) {
        ++valuation;
        valuationWork >>= 1n;
      }
      const valuationGap = valuation - U;
      const valuationRow = {q: q.toString(), U, V, valuation,
        valuationGap, z0: z0.toString(),
        spikes: spikes.slice().sort((a,b)=>a-b)};
      if (maxValuationGap === null ||
          valuationGap > maxValuationGap.valuationGap ||
          (valuationGap === maxValuationGap.valuationGap && q < BigInt(maxValuationGap.q))) {
        maxValuationGap = valuationRow;
      }
      const bottomModulus = 1n << BigInt(U + 1);
      if ((3n * z0 - 1n) % bottomModulus !== 0n) return;
      const tau = (3n * z0 - 1n) / bottomModulus;
      if (tau <= 0n) return;
      counterexample = {r, N, e, q: q.toString(), s: (2n*q).toString(),
        U, V, tau: tau.toString(), z0: z0.toString(),
        spikes: spikes.slice().sort((a,b)=>a-b)};
      return;
    }

    // No spike: x -> 3x/2.
    {
      const nextA = 3n * A;
      const nextB = 3n * B;
      const nextL = L + 1;
      const nextResidue = extendResidue(nextA, nextB, L, residue, 1);
      const nextModulus = 1n << BigInt(nextL);
      const leastPositive = nextResidue === 0n ? nextModulus : nextResidue;
      if (leastPositive < limit) {
        visit(d - 1, nextA, nextB, nextL, nextResidue, spikes);
      }
    }

    // Spike: x -> (3x+1)/4, allowed only at an exact Beatty degree.
    if (K.has(d)) {
      const nextA = 3n * A;
      const nextB = 3n * B + (1n << BigInt(L));
      const nextL = L + 2;
      const nextResidue = extendResidue(nextA, nextB, L, residue, 2);
      const nextModulus = 1n << BigInt(nextL);
      const leastPositive = nextResidue === 0n ? nextModulus : nextResidue;
      if (leastPositive < limit) {
        spikes.push(d);
        visit(d - 1, nextA, nextB, nextL, nextResidue, spikes);
        spikes.pop();
      }
    }
  }

  visit(r - 1, 1n, 0n, 0, 0n, []);
  console.log(JSON.stringify({r, N, e, nodes, leaves, maxValuationGap,
    counterexample}));
  if (counterexample !== null) {
    process.exitCode = 1;
    break;
  }
}
