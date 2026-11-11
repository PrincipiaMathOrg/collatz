#!/usr/bin/env node
"use strict";

// Diagnostic for the valuation-only version of the ordered insertion
// argument.  This is exploratory: it deliberately forgets every prefix bit
// after the first already-unselected site.

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

const maxR = Number(process.argv[2] || 24);
let insertions = 0;
let withPriorTwo = 0;
let valuationExcludes = 0;
let valuationSurvives = 0;
let firstSurvivor = null;

for (let r = 3; r <= maxR; ++r) {
  const P = 3n ** BigInt(r);
  const N = bitLength(P);
  const M = 1n << BigInt(N);
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
        const p = word.findIndex((a, i) => i < r - 1 && a === 2);
        if (p >= 0) {
          ++withPriorTwo;
          assert(p > j, "ordered insertion");
          const n = j + 1;
          const v = inverse(3n ** BigInt(n), 1n << BigInt(N + 1 - n));
          const R = (1n << BigInt(n)) * v;
          const start = mod((M + R) / 2n, M);
          const window = 1n << BigInt(oldU - 2);
          const period = 1n << BigInt(p + 2);
          const required = (1n << BigInt(p + 1)) - 1n;
          const delta = mod(required - start, period);
          if (delta >= window) {
            ++valuationExcludes;
          } else {
            ++valuationSurvives;
            if (firstSurvivor === null) {
              firstSurvivor = {r, N, j, p, oldU,
                word:word.join(","), start, window, period, required, delta};
            }
          }
        }
      }
      word[j] = 2;
      --word[r - 1];
      --oldU;
    }
  }
}

console.log(JSON.stringify({maxR, insertions, withPriorTwo,
  valuationExcludes, valuationSurvives, firstSurvivor},
  (_, x) => typeof x === "bigint" ? x.toString() : x, 2));
