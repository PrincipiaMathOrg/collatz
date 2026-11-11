#!/usr/bin/env node
"use strict";

// Exploratory audit for the ordered one-drop insertion window.  It asks how
// much of the old word's exact parity prefix is needed to exclude the bad
// predecessor interval.  This is not an all-depth certificate.

function assert(ok, message) { if (!ok) throw new Error(message); }
function mod(a, m) { const z = a % m; return z < 0n ? z + m : z; }
function egcd(a, b) {
  if (b === 0n) return [a, 1n, 0n];
  const [g, x, y] = egcd(b, a % b);
  return [g, y, x - (a / b) * y];
}
function inverse(a, m) {
  const [g, x] = egcd(a, m);
  assert(g === 1n, "inverse");
  return mod(x, m);
}
function bitLength(n) { return n.toString(2).length; }
function carry(word) {
  let C = 0n, A = 0;
  for (const a of word) { C = 3n * C + (1n << BigInt(A)); A += a; }
  return {C, A};
}
function cylinder(word) {
  const {C, A} = carry(word);
  const Q = 1n << BigInt(A + 1);
  return mod(((1n << BigInt(A)) - C) *
    inverse(3n ** BigInt(word.length), Q), Q);
}

const maxR = Number(process.argv[2] || 24);
let insertions = 0, bad = 0, fullOnly = 0;
let worst = null;
const depthHistogram = new Map();

for (let r = 3; r <= maxR; ++r) {
  const P = 3n ** BigInt(r), N = bitLength(P), M = 1n << BigInt(N);
  const B = Array.from({length:r + 1}, (_, i) => Math.floor(i * N / r));
  const base = Array.from({length:r}, (_, i) => B[i + 1] - B[i]);
  const eligible = [];
  for (let i = 0; i < r - 1; ++i) if (base[i] === 2) eligible.push(i);

  for (let mask = 0; mask < 2 ** eligible.length; ++mask) {
    const target = eligible.filter((_, q) => (mask & 2 ** q) !== 0)
      .sort((a, b) => b - a);
    const word = Array(r - 1).fill(1).concat([N - r + 1]);
    let oldU = N - r - 1;
    for (const j of target) {
      if (oldU >= 2) {
        ++insertions;
        const n = j + 1;
        const v = inverse(3n ** BigInt(n), 1n << BigInt(N + 1 - n));
        const R = (1n << BigInt(n)) * v;
        const start = mod((M + R) / 2n, M);
        const window = 1n << BigInt(oldU - 2);
        let prefix = [], excludedAt = null, exponent = 0;
        for (let length = 1; length <= r; ++length) {
          prefix.push(word[length - 1]);
          exponent += word[length - 1];
          const Qp = 1n << BigInt(exponent + 1);
          if (Qp <= window) continue;
          const residue = cylinder(prefix);
          const delta = mod(residue - start, Qp);
          if (delta >= window) {
            excludedAt = {length, exponent, residue, delta, Qp};
            break;
          }
        }
        if (excludedAt === null) {
          ++bad;
          console.log(JSON.stringify({counterexample:true,r,j,oldU,
            word:word.join(","),start:start.toString(),window:window.toString()}));
          process.exit(1);
        }
        if (excludedAt.length === r) ++fullOnly;
        const key = String(excludedAt.length - (j + 1));
        depthHistogram.set(key, (depthHistogram.get(key) || 0) + 1);
        const score = excludedAt.length / r;
        if (worst === null || score > worst.score) {
          worst = {score,r,j,oldU,length:excludedAt.length,
            exponent:excludedAt.exponent,residue:excludedAt.residue,
            delta:excludedAt.delta,Qp:excludedAt.Qp,start,window,
            word:word.join(",")};
        }
      }
      word[j] = 2;
      --word[r - 1];
      --oldU;
    }
  }
}

console.log(JSON.stringify({maxR,insertions,bad,fullOnly,
  depthHistogram:Object.fromEntries(Array.from(depthHistogram.entries())
    .sort((a,b)=>Number(a[0])-Number(b[0]))),worst},
  (_, x) => typeof x === "bigint" ? x.toString() : x, 2));
