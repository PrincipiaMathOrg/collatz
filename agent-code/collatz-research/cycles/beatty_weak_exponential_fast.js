#!/usr/bin/env node
"use strict";

// Exact branch-and-bound search for an anchored one-drop path violating
//
//     Q^2 >= 2^U.
//
// Here Q is the least positive input residue determined by the reverse
// {1,2}-valuation prefix, V is the number of retained Beatty spike sites,
// and U=e-1-V.  The optional --all flag allows spikes at every degree;
// --run2 permits them everywhere but forbids three consecutive spikes.
// This is a finite diagnostic, not an all-depth proof.

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

const maxR = Number(process.argv[2] || 120);
const minR = Number(process.argv[3] || 3);
const broadSpikes = process.argv.includes("--all") ||
  process.argv.includes("--run2");
const maxSpikeRunTwo = process.argv.includes("--run2");
const factorArg = process.argv.find(x => x.startsWith("--factor="));
const searchFactor = factorArg === undefined ? 1n :
  BigInt(factorArg.slice("--factor=".length));
if (searchFactor < 1n) throw new Error("factor must be a positive integer");

let globalClosest = null;

function isCloser(q, U, current) {
  if (current === null) return true;
  // Compare q^2 / 2^U without floating point.
  const lhs = q * q * (1n << BigInt(current.U));
  const rhs = current.q * current.q * (1n << BigInt(U));
  return lhs < rhs;
}

for (let r = minR; r <= maxR; ++r) {
  const P = 3n ** BigInt(r);
  const N = bitLength(P - 1n);
  const e = N - r;
  const eligible = new Set(Array.from({length: e - 1}, (_, i) =>
    Math.floor((i + 1) * r / e)));
  let nodes = 0;
  let leaves = 0;
  let violation = null;
  let closest = null;
  let frontierClosest = null;

  function leastPositive(residue, L) {
    return residue === 0n ? (1n << BigInt(L)) : residue;
  }

  function canStillCompete(residue, L, spikes) {
    const Umax = e - 1 - spikes;
    if (Umax < 1) return false;
    const q = leastPositive(residue, L);
    return q * q < searchFactor * (1n << BigInt(Umax));
  }

  function visit(d, A, B, L, residue, spikes, spikeDegrees, spikeRun) {
    ++nodes;
    if (violation !== null) return;
    if (!canStillCompete(residue, L, spikes)) {
      const Umax = e - 1 - spikes;
      if (Umax >= 1) {
        const q = leastPositive(residue, L);
        const row = {r, N, e, q, U: Umax, V: spikes, remaining: d,
          spikes: spikeDegrees.slice().sort((a, b) => a - b)};
        if (isCloser(q, Umax, frontierClosest)) frontierClosest = row;
      }
      return;
    }

    if (d === 0) {
      ++leaves;
      const q = leastPositive(residue, L);
      const U = e - 1 - spikes;
      if (U < 1) return;
      const row = {r, N, e, q, U, V: spikes,
        spikes: spikeDegrees.slice().sort((a, b) => a - b)};
      if (isCloser(q, U, closest)) closest = row;
      if (q * q < (1n << BigInt(U))) violation = row;
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

    if ((broadSpikes || eligible.has(d)) && spikes < e - 2 &&
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
  const rowClosest = closest === null ? frontierClosest :
    (frontierClosest === null || isCloser(closest.q, closest.U,
      frontierClosest) ? closest : frontierClosest);
  if (rowClosest !== null && isCloser(rowClosest.q, rowClosest.U,
    globalClosest)) {
    globalClosest = rowClosest;
  }
  const printable = row => row === null ? null : ({...row,
    q: row.q.toString(), qSquared: (row.q * row.q).toString(),
    denominator: (1n << BigInt(row.U)).toString()});
  console.log(JSON.stringify({r, N, e, nodes, leaves,
    closest: printable(closest), frontierClosest: printable(frontierClosest),
    violation: printable(violation)}));
  if (violation !== null) {
    process.exitCode = 1;
    break;
  }
}

if (globalClosest !== null) {
  console.log(JSON.stringify({globalClosest: {
    ...globalClosest,
    q: globalClosest.q.toString(),
    qSquared: (globalClosest.q * globalClosest.q).toString(),
    denominator: (1n << BigInt(globalClosest.U)).toString()
  }}));
}
