#!/usr/bin/env node
"use strict";

function egcd(a, b) {
  if (b === 0n) return [a, 1n, 0n];
  const [g, x, y] = egcd(b, a % b);
  return [g, y, x - (a / b) * y];
}

function inverse(a, m) {
  const [g, x] = egcd(a, m);
  if (g !== 1n) throw new Error("nonunit");
  return (x % m + m) % m;
}

const maxR = Number(process.argv[2] || 36);
let count = 0n;
let first2U = null;
let first2UPlus1 = null;
let firstPrefix = null;
const firstCU = {2: null, 3: null, 4: null};

for (let r = 3; r <= maxR; ++r) {
  const P = 3n ** BigInt(r);
  const N = (P - 1n).toString(2).length;
  const M = 1n << BigInt(N);
  const fullModulus = 2n * M;
  const inverseP = inverse(P, fullModulus);
  const B = Array.from({length: r + 1}, (_, i) =>
    Math.floor(i * N / r));
  const base = Array.from({length: r}, (_, i) => B[i + 1] - B[i]);
  const eligible = [];
  for (let i = 0; i < r - 1; ++i) {
    if (base[i] === 2) eligible.push(i);
  }

  function visit(level, word, U) {
    if (level === eligible.length) {
      if (U === 0) return;
      const w = word.slice();
      w[r - 1] += U;
      let C = 0n;
      let A = 0;
      for (const a of w) {
        C = 3n * C + (1n << BigInt(A));
        A += a;
      }
      const rho0 = (((M - C) * inverseP) % fullModulus +
        fullModulus) % fullModulus;
      const rho = rho0 === 0n ? fullModulus : rho0;
      const threshold = 1n << BigInt(U);
      const k0 = Math.min(N + 1, 2 * U);
      const k1 = Math.min(N + 1, 2 * U + 1);
      const low0 = rho % (1n << BigInt(k0));
      const low1 = rho % (1n << BigInt(k1));
      for (const c of [2, 3, 4]) {
        const kc = Math.min(N + 1, c * U + 1);
        const lowc = rho % (1n << BigInt(kc));
        if (lowc <= threshold && firstCU[c] === null) {
          firstCU[c] = {r, N, U, rho: rho.toString(),
            low: lowc.toString(), bits: kc, word: w.join(",")};
        }
      }
      if (low0 <= threshold && first2U === null) {
        first2U = {r, N, U, rho: rho.toString(),
          low0: low0.toString(), word: w.join(",")};
      }
      if (low1 <= threshold && first2UPlus1 === null) {
        first2UPlus1 = {r, N, U, rho: rho.toString(),
          low1: low1.toString(), word: w.join(",")};
      }
      let prefixTotal = 0;
      let prefixLength = 0;
      while (prefixLength < r && prefixTotal < 2 * U + 1) {
        prefixTotal += w[prefixLength++];
      }
      const prefixModulusBits = Math.min(N + 1, prefixTotal + 1);
      const prefixLow = rho % (1n << BigInt(prefixModulusBits));
      if (prefixLow <= threshold && firstPrefix === null) {
        firstPrefix = {r, N, U, rho: rho.toString(),
          prefixLow: prefixLow.toString(), prefixLength,
          prefixTotal, word: w.join(",")};
      }
      ++count;
      return;
    }
    visit(level + 1, word, U);
    const i = eligible[level];
    const next = word.slice();
    --next[i];
    visit(level + 1, next, U + 1);
  }

  visit(0, base, 0);
  console.log(JSON.stringify({r, count: count.toString(), first2U,
    first2UPlus1, firstPrefix, firstCU}));
  if (firstCU[4] !== null) break;
}
