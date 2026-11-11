#!/usr/bin/env node
"use strict";

// Exact exploratory statistics for primitive coefficient first crossings.
// This is a falsification harness, not an all-depth certificate.

const maxK = Number(process.argv[2] || 28);

function mod(a, m) {
  const r = a % m;
  return r < 0n ? r + m : r;
}

function inverseOddModPowerOfTwo(a, bits) {
  const m = 1n << BigInt(bits);
  let x = 1n;
  let precision = 1;
  while (precision < bits) {
    const nextPrecision = Math.min(2 * precision, bits);
    const mask = (1n << BigInt(nextPrecision)) - 1n;
    x = (x * (2n - a * x)) & mask;
    precision = nextPrecision;
  }
  return mod(x, m);
}

function gcd(a, b) {
  if (a < 0n) a = -a;
  if (b < 0n) b = -b;
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

function data(bits) {
  let C = 0n;
  let s = 0;
  for (let j = 0; j < bits.length; ++j) {
    if (bits[j] === 1) {
      C = 3n * C + (1n << BigInt(j));
      ++s;
    }
  }
  const Q = 1n << BigInt(bits.length);
  const P = 3n ** BigInt(s);
  const rho = mod(-C * inverseOddModPowerOfTwo(P, bits.length), Q);
  const Z = (P * rho + C) / Q;
  return {C, s, Q, P, D: Q - P, rho, Z};
}

function* primitiveCrossings(limit) {
  function* visit(bits, p, q) {
    if (bits.length >= limit) return;
    for (const bit of [0, 1]) {
      const p2 = bit ? 3n * p : p;
      const q2 = 2n * q;
      const w = bits.concat(bit);
      if (p2 < q2) yield w;
      else yield* visit(w, p2, q2);
    }
  }
  yield* visit([], 1n, 1n);
}

const rows = new Map();
for (const bits of primitiveCrossings(maxK)) {
  if (bits[0] !== 1) continue;
  const d = data(bits);
  const gap = d.rho - d.Z;
  const row = rows.get(bits.length) || {
    count: 0,
    minGap: null,
    minRho: null,
    maxFixedNumerator: 0n,
    maxFixedRho: 0n,
    maxFixedGap: 0n,
    minReducedDenominator: null,
    minReducedWord: "",
    denominatorOneCount: 0,
    minGapWord: "",
    minRhoWord: "",
    maxFixedWord: ""
  };
  ++row.count;
  if (row.minGap === null || gap < row.minGap) {
    row.minGap = gap;
    row.minGapWord = bits.join("");
  }
  if (row.minRho === null || d.rho < row.minRho) {
    row.minRho = d.rho;
    row.minRhoWord = bits.join("");
  }
  // Fixed point is C/D.  Compare at a fixed length using the common D.
  if (d.C > row.maxFixedNumerator) {
    row.maxFixedNumerator = d.C;
    row.maxFixedRho = d.rho;
    row.maxFixedGap = gap;
    row.maxFixedWord = bits.join("");
  }
  const reducedDenominator = d.D / gcd(d.D, d.C);
  if (reducedDenominator === 1n) ++row.denominatorOneCount;
  if (row.minReducedDenominator === null ||
      reducedDenominator < row.minReducedDenominator) {
    row.minReducedDenominator = reducedDenominator;
    row.minReducedWord = bits.join("");
  }
  rows.set(bits.length, row);
}

console.log("k,count,D,minGap,minGapWord,minRho,minRhoWord,maxFixedNumerator,maxFixedRho,maxFixedGap,maxFixedWord,minReducedDenominator,minReducedWord,denominatorOneCount");
for (const [k, row] of rows) {
  const d = data(row.maxFixedWord.split("").map(Number));
  console.log([
    k,
    row.count,
    d.D,
    row.minGap,
    row.minGapWord,
    row.minRho,
    row.minRhoWord,
    row.maxFixedNumerator,
    row.maxFixedRho,
    row.maxFixedGap,
    row.maxFixedWord,
    row.minReducedDenominator,
    row.minReducedWord,
    row.denominatorOneCount
  ].join(","));
}
