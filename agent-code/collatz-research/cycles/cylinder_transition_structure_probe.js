#!/usr/bin/env node
"use strict";

// Exploratory exact scan for the binary-height cylinder gate.  This file is
// not a proof certificate.  It records extremizers for possible induction
// variables before an all-depth statement is formulated.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function bitLength(n) {
  return n.toString(2).length;
}

function mod(a, m) {
  const x = a % m;
  return x < 0n ? x + m : x;
}

function inverse(a, m) {
  let r0 = a, r1 = m, s0 = 1n, s1 = 0n;
  while (r1 !== 0n) {
    const q = r0 / r1;
    [r0, r1] = [r1, r0 - q * r1];
    [s0, s1] = [s1, s0 - q * s1];
  }
  assert(r0 === 1n, "inverse does not exist");
  return mod(s0, m);
}

function scan(r) {
  const P = 3n ** BigInt(r);
  const N = bitLength(P);
  const M = 1n << BigInt(N);
  const modulus = 2n * M;
  const pInverse = inverse(P, modulus);
  const B = Array.from({length: r + 1}, (_, j) =>
    Math.floor(j * N / r));
  const rows = new Map();
  let leaves = 0;
  let notLeast = 0;
  let endpointNotBelow = 0;

  function visit(j, height, A, C, T, heights, word) {
    if (j === r) {
      if (height !== 0 || A !== N || T === 0) return;
      ++leaves;
      const rho = mod((M - C) * pInverse, modulus);
      assert(rho > 0n && (rho & 1n) === 1n, "bad cylinder residue");
      let state = rho;
      let least = rho;
      for (const a of word) {
        state = (3n * state + 1n) >> BigInt(a);
        if (state < least) least = state;
      }
      if (least < rho) ++notLeast;
      if (state >= rho) ++endpointNotBelow;
      const old = rows.get(T);
      if (old === undefined || rho < old.rho) {
        rows.set(T, {
          rho,
          word: word.join("."),
          heights: heights.join(""),
          binary: rho.toString(2),
        });
      }
      return;
    }
    const g = B[j + 1] - B[j];
    for (const nextHeight of [0, 1]) {
      const a = g + height - nextHeight;
      if (a <= 0) continue;
      visit(j + 1, nextHeight, A + a,
        3n * C + (1n << BigInt(A)),
        T + Number(nextHeight !== height),
        heights.concat(nextHeight), word.concat(a));
    }
  }

  visit(0, 0, 0, 0n, 0, [0], []);
  return {r, N, leaves, notLeast, endpointNotBelow,
    rows: Array.from(rows.entries()).map(([T, x]) => ({T, ...x}))};
}

const maxR = Number(process.argv[2] || 26);
const minR = Number(process.argv[3] || 3);
for (let r = minR; r <= maxR; ++r) {
  const data = scan(r);
  const summary = data.rows.map(x =>
    `${x.T}:${x.rho}:${x.rho / (1n << BigInt(x.T))}`).join(" ");
  console.log(`r=${r} N=${data.N} leaves=${data.leaves} notLeast=${data.notLeast} endpointNotBelow=${data.endpointNotBelow} minima=${summary}`);
  for (const row of data.rows) {
    if (row.rho < (1n << BigInt(row.T + 5))) {
      console.log(`  T=${row.T} rho=${row.rho} bits=${row.binary} h=${row.heights} a=${row.word}`);
    }
  }
}
