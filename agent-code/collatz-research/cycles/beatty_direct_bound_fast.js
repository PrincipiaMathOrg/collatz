#!/usr/bin/env node
"use strict";

// Branch-and-bound search for a violation of Q > 2^(U-1).  If a partial
// path already contains s spikes, every descendant has V >= s and hence
// any violating Q is at most 2^(e-2-s).  This gives an exact monotone prune.

function bitLength(n) {
  return n.toString(2).length;
}

function extendResidue(A, B, L, residue, extra) {
  const oldModulus = 1n << BigInt(L);
  const newModulus = oldModulus << BigInt(extra);
  for (let j = 0n; j < (1n << BigInt(extra)); ++j) {
    const candidate = residue + j * oldModulus;
    if ((A * candidate + B) % newModulus === 0n) return candidate;
  }
  throw new Error("unique lift failure");
}

const maxR = Number(process.argv[2] || 200);
const minR = Number(process.argv[3] || 3);
const broadSpikes = process.argv.includes("--all");

for (let r = minR; r <= maxR; ++r) {
  const P = 3n ** BigInt(r);
  const N = bitLength(P - 1n);
  const e = N - r;
  const K = new Set(Array.from({length: e - 1}, (_, i) =>
    Math.floor((i + 1) * r / e)));
  let nodes = 0;
  let leaves = 0;
  let violation = null;

  function canStillViolate(residue, L, spikes) {
    if (spikes > e - 2) return false;
    const modulus = 1n << BigInt(L);
    const leastPositive = residue === 0n ? modulus : residue;
    const largestPossibleLimit = 1n << BigInt(e - 2 - spikes);
    return leastPositive <= largestPossibleLimit;
  }

  function visit(d, A, B, L, residue, spikes, spikeDegrees) {
    ++nodes;
    if (violation !== null) return;
    if (!canStillViolate(residue, L, spikes)) return;
    if (d === 0) {
      ++leaves;
      const modulus = 1n << BigInt(L);
      const q = residue === 0n ? modulus : residue;
      const V = spikes;
      const U = e - 1 - V;
      const directLimit = 1n << BigInt(U - 1);
      if (q <= directLimit) {
        violation = {r, N, e, q: q.toString(), U, V,
          directLimit: directLimit.toString(),
          spikes: spikeDegrees.slice().sort((a, b) => a - b)};
      }
      return;
    }

    {
      const nextA = 3n * A;
      const nextB = 3n * B;
      const nextL = L + 1;
      const nextResidue = extendResidue(nextA, nextB, L, residue, 1);
      visit(d - 1, nextA, nextB, nextL, nextResidue, spikes,
        spikeDegrees);
    }

    if ((broadSpikes || K.has(d)) && spikes < e - 2) {
      const nextA = 3n * A;
      const nextB = 3n * B + (1n << BigInt(L));
      const nextL = L + 2;
      const nextResidue = extendResidue(nextA, nextB, L, residue, 2);
      spikeDegrees.push(d);
      visit(d - 1, nextA, nextB, nextL, nextResidue, spikes + 1,
        spikeDegrees);
      spikeDegrees.pop();
    }
  }

  visit(r - 1, 1n, 0n, 0, 0n, 0, []);
  console.log(JSON.stringify({r, N, e, nodes, leaves, violation}));
  if (violation !== null) {
    process.exitCode = 1;
    break;
  }
}
