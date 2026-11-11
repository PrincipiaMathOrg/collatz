#!/usr/bin/env node
"use strict";

// Exact branch-and-bound test of the Beatty coefficient-excursion bound
//
//                 Q * 2^(r-1+V) > 3^(r-1).
//
// Here Q is the least positive terminal residue of a complete reverse path
// and V is its number of spike branches.  At a partial node, both the least
// positive residue and V can only increase.  Hence a node is permanently safe
// as soon as residue * 2^(r-1+spikes) exceeds 3^(r-1).

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

for (let r = minR; r <= maxR; ++r) {
  const P = 3n ** BigInt(r);
  const N = bitLength(P - 1n);
  const e = N - r;
  const K = new Set(Array.from({length: e - 1}, (_, i) =>
    Math.floor((i + 1) * r / e)));
  const coefficientNumerator = 3n ** BigInt(r - 1);
  let nodes = 0;
  let leaves = 0;
  let violation = null;
  let closest = null;

  function leastPositive(residue, L) {
    return residue === 0n ? (1n << BigInt(L)) : residue;
  }

  function canStillViolate(residue, L, spikes) {
    if (spikes > e - 2) return false;
    const q = leastPositive(residue, L);
    return (q << BigInt(r - 1 + spikes)) <= coefficientNumerator;
  }

  function visit(d, A, B, L, residue, spikes, spikeDegrees) {
    ++nodes;
    if (violation !== null) return;
    if (!canStillViolate(residue, L, spikes)) return;
    if (d === 0) {
      ++leaves;
      const q = leastPositive(residue, L);
      const U = e - 1 - spikes;
      if (U < 1) return;
      const scaledQ = q << BigInt(r - 1 + spikes);
      const gap = scaledQ - coefficientNumerator;
      const row = {r, N, e, q: q.toString(), U, V: spikes,
        gap: gap.toString(),
        spikes: spikeDegrees.slice().sort((a, b) => a - b)};
      if (closest === null || gap < BigInt(closest.gap)) closest = row;
      if (gap <= 0n) violation = row;
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
  console.log(JSON.stringify({r, N, e, nodes, leaves, closest, violation}));
  if (violation !== null) {
    process.exitCode = 1;
    break;
  }
}
