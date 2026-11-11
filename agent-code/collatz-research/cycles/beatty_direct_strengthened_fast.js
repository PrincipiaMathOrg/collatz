#!/usr/bin/env node
"use strict";

// Exact branch-and-bound test of the candidate strengthening
// Q >= 2^U - 2.  This is finite evidence only.

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

const maxR = Number(process.argv[2] || 100);
const minR = Number(process.argv[3] || 3);
const broadSpikes = process.argv.includes("--all");
const maxSpikeRunTwo = process.argv.includes("--run2");

for (let r = minR; r <= maxR; ++r) {
  const P = 3n ** BigInt(r);
  const N = bitLength(P - 1n);
  const e = N - r;
  const K = new Set(Array.from({length: e - 1}, (_, i) =>
    Math.floor((i + 1) * r / e)));
  let nodes = 0;
  let leaves = 0;
  let violation = null;
  let equality = null;

  function leastPositive(residue, L) {
    return residue === 0n ? (1n << BigInt(L)) : residue;
  }

  function canReachBoundary(residue, L, spikes) {
    const Umax = e - 1 - spikes;
    if (Umax < 1) return false;
    const largestBoundary = (1n << BigInt(Umax)) - 2n;
    return leastPositive(residue, L) <= largestBoundary;
  }

  function visit(d, A, B, L, residue, spikes, spikeDegrees, spikeRun) {
    ++nodes;
    if (violation !== null) return;
    if (!canReachBoundary(residue, L, spikes)) return;
    if (d === 0) {
      ++leaves;
      const q = leastPositive(residue, L);
      const U = e - 1 - spikes;
      const boundary = (1n << BigInt(U)) - 2n;
      const row = {r, N, e, q: q.toString(), U, V: spikes,
        boundary: boundary.toString(),
        spikes: spikeDegrees.slice().sort((a, b) => a - b)};
      if (q < boundary) violation = row;
      if (q === boundary && equality === null) equality = row;
      return;
    }

    {
      const nextA = 3n * A;
      const nextB = 3n * B;
      const nextL = L + 1;
      const nextResidue = extendResidue(nextA, nextB, L, residue, 1);
      visit(d - 1, nextA, nextB, nextL, nextResidue, spikes,
        spikeDegrees, 0);
    }

    if ((broadSpikes || K.has(d)) && spikes < e - 2 &&
        (!maxSpikeRunTwo || spikeRun < 2)) {
      const nextA = 3n * A;
      const nextB = 3n * B + (1n << BigInt(L));
      const nextL = L + 2;
      const nextResidue = extendResidue(nextA, nextB, L, residue, 2);
      spikeDegrees.push(d);
      visit(d - 1, nextA, nextB, nextL, nextResidue, spikes + 1,
        spikeDegrees, spikeRun + 1);
      spikeDegrees.pop();
    }
  }

  visit(r - 1, 1n, 0n, 0, 0n, 0, [], 0);
  console.log(JSON.stringify({r, N, e, nodes, leaves, equality, violation}));
  if (violation !== null) {
    process.exitCode = 1;
    break;
  }
}
