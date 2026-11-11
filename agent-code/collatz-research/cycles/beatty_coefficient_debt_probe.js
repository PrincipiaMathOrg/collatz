#!/usr/bin/env node
"use strict";

// Diagnostic only.  At every anchored Beatty residue-tree node, test
// whether the current least positive representative q has fallen below the
// current linear coefficient 3^t/2^(t+V).  Record how long such a debt can
// persist before a dyadic lift or a spike restores the strict inequality.

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

const maxR = Number(process.argv[2] || 35);
const minR = Number(process.argv[3] || 3);

for (let r = minR; r <= maxR; ++r) {
  const N = bitLength(3n ** BigInt(r) - 1n);
  const e = N - r;
  const K = new Set(Array.from({length: e - 1}, (_, i) =>
    Math.floor((i + 1) * r / e)));
  let nodes = 0;
  let maxStreak = null;
  let maxTotalDebt = null;
  let unsafeLeaf = null;
  let unsafeNonrootNodes = 0;
  const firstUnsafe = [];

  function leastPositive(residue, L) {
    return residue === 0n ? (1n << BigInt(L)) : residue;
  }

  function visit(d, A, B, L, residue, spikes, streak, totalDebt, path) {
    ++nodes;
    const t = r - 1 - d;
    const q = leastPositive(residue, L);
    const coefficientNumerator = 3n ** BigInt(t);
    const scaledQ = q << BigInt(t + spikes);
    const unsafe = scaledQ <= coefficientNumerator;
    const nextStreak = unsafe ? streak + 1 : 0;
    const nextTotalDebt = totalDebt + (unsafe ? 1 : 0);
    const datum = {
      r, N, e, d, t, L, q: q.toString(), spikes,
      streak: nextStreak, totalDebt: nextTotalDebt,
      path: path.slice(),
    };
    if (maxStreak === null || nextStreak > maxStreak.streak) {
      maxStreak = datum;
    }
    if (maxTotalDebt === null || nextTotalDebt > maxTotalDebt.totalDebt) {
      maxTotalDebt = datum;
    }
    if (unsafe && t > 0) {
      ++unsafeNonrootNodes;
      if (firstUnsafe.length < 8) firstUnsafe.push(datum);
    }
    if (d === 0) {
      const U = e - 1 - spikes;
      if (U >= 1 && unsafe && unsafeLeaf === null) unsafeLeaf = {...datum, U};
      return;
    }

    {
      const nextA = 3n * A;
      const nextB = 3n * B;
      const nextL = L + 1;
      const nextResidue = extendResidue(nextA, nextB, L, residue, 1);
      path.push(K.has(d) ? "O*" : "O");
      visit(d - 1, nextA, nextB, nextL, nextResidue, spikes,
        nextStreak, nextTotalDebt, path);
      path.pop();
    }

    if (K.has(d)) {
      const nextA = 3n * A;
      const nextB = 3n * B + (1n << BigInt(L));
      const nextL = L + 2;
      const nextResidue = extendResidue(nextA, nextB, L, residue, 2);
      path.push("S");
      visit(d - 1, nextA, nextB, nextL, nextResidue, spikes + 1,
        nextStreak, nextTotalDebt, path);
      path.pop();
    }
  }

  visit(r - 1, 1n, 0n, 0, 0n, 0, 0, 0, []);
  console.log(JSON.stringify({r, N, e, nodes, unsafeNonrootNodes,
    firstUnsafe, maxStreak, maxTotalDebt, unsafeLeaf}));
  if (unsafeLeaf !== null) process.exitCode = 1;
}
