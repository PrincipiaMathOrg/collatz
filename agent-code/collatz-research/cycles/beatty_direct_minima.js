#!/usr/bin/env node
"use strict";

// Research diagnostic: enumerate exact Beatty-admissible reverse paths and
// record the least terminal residue at each omitted-site count U.

function bitLength(n) {
  return n.toString(2).length;
}

function extendResidue(A, B, L, residue, extra) {
  const oldModulus = 1n << BigInt(L);
  const choices = 1n << BigInt(extra);
  const newModulus = oldModulus * choices;
  for (let j = 0n; j < choices; ++j) {
    const candidate = residue + j * oldModulus;
    if ((A * candidate + B) % newModulus === 0n) return candidate;
  }
  throw new Error("unique lift failure");
}

const maxR = Number(process.argv[2] || 30);

for (let r = 3; r <= maxR; ++r) {
  const N = bitLength(3n ** BigInt(r) - 1n);
  const e = N - r;
  const K = new Set(Array.from({length: e - 1}, (_, i) =>
    Math.floor((i + 1) * r / e)));
  const minima = new Map();

  function visit(d, A, B, L, residue, spikes, spikeDegrees) {
    if (d === 0) {
      const modulus = 1n << BigInt(L);
      const q = residue === 0n ? modulus : residue;
      const U = e - 1 - spikes;
      if (U < 1) return;
      const old = minima.get(U);
      if (old === undefined || q < old.q) {
        minima.set(U, {q, spikes: spikeDegrees.slice().sort((a, b) => a-b)});
      }
      return;
    }

    {
      const nextA = 3n * A;
      const nextB = 3n * B;
      const nextL = L + 1;
      const nextResidue = extendResidue(nextA, nextB, L, residue, 1);
      visit(d - 1, nextA, nextB, nextL, nextResidue, spikes, spikeDegrees);
    }

    if (K.has(d)) {
      const nextA = 3n * A;
      const nextB = 3n * B + (1n << BigInt(L));
      const nextL = L + 2;
      const nextResidue = extendResidue(nextA, nextB, L, residue, 2);
      spikeDegrees.push(d);
      visit(d - 1, nextA, nextB, nextL, nextResidue, spikes + 1, spikeDegrees);
      spikeDegrees.pop();
    }
  }

  visit(r - 1, 1n, 0n, 0, 0n, 0, []);
  const rows = [...minima].sort((a, b) => a[0]-b[0]).map(([U, row]) => ({
    U,
    q: row.q.toString(),
    excess: Number(BigInt(bitLength(row.q) - 1) - BigInt(U - 1)),
    ratioNumerator: row.q.toString(),
    ratioDenominator: (1n << BigInt(U - 1)).toString(),
    spikes: row.spikes
  }));
  console.log(JSON.stringify({r, N, e, rows}));
}
