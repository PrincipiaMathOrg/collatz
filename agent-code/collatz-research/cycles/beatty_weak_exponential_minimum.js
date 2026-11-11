#!/usr/bin/env node
"use strict";

// Exact branch-and-bound minimization of Q^2 / 2^U over complete reverse
// {1,2}-valuation cylinders.  By default spike degrees are the anchored
// Beatty sites.  Use --all for arbitrary spike sites or --run2 for arbitrary
// sites with no three consecutive spikes.  This is a finite diagnostic.

function bitLength(n) {
  return n.toString(2).length;
}

function extendResidue(A, B, L, residue, extra) {
  const modulus = 1n << BigInt(L);
  const newModulus = modulus << BigInt(extra);
  for (let j = 0n; j < (1n << BigInt(extra)); ++j) {
    const candidate = residue + j * modulus;
    if ((A * candidate + B) % newModulus === 0n) return candidate;
  }
  throw new Error("unique lift failure");
}

function lessFraction(aNum, aPow, bNum, bPow) {
  return aNum * (1n << BigInt(bPow)) <
    bNum * (1n << BigInt(aPow));
}

const maxR = Number(process.argv[2] || 60);
const minR = Number(process.argv[3] || 3);
const broad = process.argv.includes("--all") || process.argv.includes("--run2");
const run2 = process.argv.includes("--run2");

let globalBest = null;

for (let r = minR; r <= maxR; ++r) {
  const N = bitLength(3n ** BigInt(r) - 1n);
  const e = N - r;
  const eligible = new Set(Array.from({length: e - 1}, (_, i) =>
    Math.floor((i + 1) * r / e)));
  let nodes = 0;
  let leaves = 0;
  let pruned = 0;
  let best = null;

  function leastPositive(residue, L) {
    return residue === 0n ? (1n << BigInt(L)) : residue;
  }

  function cannotImprove(q, Umax) {
    if (best === null || Umax < 1) return Umax < 1;
    return !lessFraction(q * q, Umax, best.q * best.q, best.U);
  }

  function visit(d, A, B, L, residue, spikes, degrees, spikeRun) {
    ++nodes;
    const Umax = e - 1 - spikes;
    const q = leastPositive(residue, L);
    if (cannotImprove(q, Umax)) {
      ++pruned;
      return;
    }

    if (d === 0) {
      ++leaves;
      const row = {r, N, e, q, U: Umax, V: spikes,
        spikes: degrees.slice().sort((a, b) => a - b)};
      if (best === null || lessFraction(q * q, Umax,
        best.q * best.q, best.U)) best = row;
      return;
    }

    const branches = [];
    {
      const nextA = 3n * A;
      const nextB = 3n * B;
      const nextL = L + 1;
      const nextResidue = extendResidue(nextA, nextB, L, residue, 1);
      branches.push({kind: 1, q: leastPositive(nextResidue, nextL),
        A: nextA, B: nextB, L: nextL, residue: nextResidue});
    }
    if ((broad || eligible.has(d)) && spikes < e - 2 &&
        (!run2 || spikeRun < 2)) {
      const nextA = 3n * A;
      const nextB = 3n * B + (1n << BigInt(L));
      const nextL = L + 2;
      const nextResidue = extendResidue(nextA, nextB, L, residue, 2);
      branches.push({kind: 2, q: leastPositive(nextResidue, nextL),
        A: nextA, B: nextB, L: nextL, residue: nextResidue});
    }
    branches.sort((x, y) => x.q < y.q ? -1 : x.q > y.q ? 1 : 0);
    for (const branch of branches) {
      if (branch.kind === 2) degrees.push(d);
      visit(d - 1, branch.A, branch.B, branch.L, branch.residue,
        spikes + (branch.kind === 2 ? 1 : 0), degrees,
        branch.kind === 2 ? spikeRun + 1 : 0);
      if (branch.kind === 2) degrees.pop();
    }
  }

  visit(r - 1, 1n, 0n, 0, 0n, 0, [], 0);
  if (best !== null && (globalBest === null || lessFraction(best.q * best.q,
    best.U, globalBest.q * globalBest.q, globalBest.U))) globalBest = best;
  const printable = best === null ? null : ({...best, q: best.q.toString(),
    qSquared: (best.q * best.q).toString(),
    denominator: (1n << BigInt(best.U)).toString()});
  console.log(JSON.stringify({r, N, e, nodes, leaves, pruned, best: printable}));
}

if (globalBest !== null) {
  console.log(JSON.stringify({globalBest: {...globalBest,
    q: globalBest.q.toString(),
    qSquared: (globalBest.q * globalBest.q).toString(),
    denominator: (1n << BigInt(globalBest.U)).toString()}}));
}
