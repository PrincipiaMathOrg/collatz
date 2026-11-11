#!/usr/bin/env node
"use strict";

// Diagnostic: test the coefficient-excursion bound against cyclic shifts of
// the rational Beatty mask.  A failure distinguishes an anchored endpoint
// theorem from a purely balanced/Sturmian-factor theorem.

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

const maxR = Number(process.argv[2] || 35);
const strengthened = process.argv.includes("--strengthened");

for (let r = 3; r <= maxR; ++r) {
  const P = 3n ** BigInt(r);
  const N = bitLength(P - 1n);
  const e = N - r;
  const base = new Set(Array.from({length: e - 1}, (_, i) =>
    Math.floor((i + 1) * r / e)));
  const coefficientNumerator = 3n ** BigInt(r - 1);
  let first = null;

  for (let shift = 0; shift < r - 1 && first === null; ++shift) {
    const K = new Set();
    for (const d of base) K.add(1 + ((d - 1 + shift) % (r - 1)));

    function leastPositive(residue, L) {
      return residue === 0n ? (1n << BigInt(L)) : residue;
    }

    function visit(d, A, B, L, residue, spikes, spikeDegrees) {
      if (first !== null) return;
      const q0 = leastPositive(residue, L);
      if (strengthened) {
        const omissions = e - 1 - spikes;
        if (omissions >= 1 && q0 >= (1n << BigInt(omissions)) - 2n) return;
      } else if ((q0 << BigInt(r - 1 + spikes)) > coefficientNumerator) {
        return;
      }
      if (d === 0) {
        const U = e - 1 - spikes;
        if (U < 1) return;
        if (strengthened && q0 >= (1n << BigInt(U)) - 2n) return;
        first = {
          r,
          N,
          e,
          shift,
          q: q0.toString(),
          U,
          V: spikes,
          spikes: spikeDegrees.slice().sort((a, b) => a - b),
        };
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

      if (K.has(d) && spikes < e - 2) {
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
  }

  console.log(JSON.stringify({r, N, e, shiftedViolation: first}));
  if (first !== null) break;
}
