#!/usr/bin/env node
"use strict";

// Floating diagnostic only. Estimate the exact X^r-2 resultant norm for
// every single-plateau spectral polynomial at coprime slopes. No numerical
// result is used as a certificate.

function gcd(a, b) {
  while (b !== 0) [a, b] = [b, a % b];
  return Math.abs(a);
}

function add(map, exponent, coefficient) {
  map.set(exponent, (map.get(exponent) || 0) + coefficient);
  if (map.get(exponent) === 0) map.delete(exponent);
}

function polynomial(r, N, J, K) {
  const residues = [];
  for (let j = J; j <= K; ++j) residues.push((j * N) % r);
  const top = Math.max(...residues);
  const terms = new Map();
  for (const c of residues) {
    add(terms, top - c + 1, 1);
    add(terms, top - c, -1);
  }
  add(terms, top + 1, -1);
  return terms;
}

function logResultant(r, terms) {
  const radius = 2 ** (1 / r);
  let total = 0;
  for (let t = 0; t < r; ++t) {
    const theta = 2 * Math.PI * t / r;
    let re = 0;
    let im = 0;
    for (const [j, c] of terms) {
      const amp = c * radius ** j;
      re += amp * Math.cos(theta * j);
      im += amp * Math.sin(theta * j);
    }
    const abs = Math.hypot(re, im);
    if (abs === 0) return -Infinity;
    total += Math.log(abs);
  }
  return total;
}

const maxR = Number(process.argv[2] || 100);
let count = 0;
let worst = null;
const bySupport = new Map();
for (let r = 3; r <= maxR; ++r) {
  const N = Math.ceil(Math.log2(3) * r - 1e-12);
  if (gcd(N, r) !== 1) continue;
  const gaps = Array(r);
  for (let i = 0; i < r; ++i) {
    gaps[i] = Math.floor((i + 1) * N / r) - Math.floor(i * N / r);
  }
  for (let J = 1; J < r; ++J) {
    if (gaps[J - 1] !== 2) continue;
    for (let K = J; K < r; ++K) {
      ++count;
      const terms = polynomial(r, N, J, K);
      const value = logResultant(r, terms) / r;
      const margin = Math.log(3) - value;
      const support = K - J + 1;
      const row = bySupport.get(support);
      if (row === undefined || value > row.value) {
        bySupport.set(support, {value, r, N, J, K, terms: terms.size});
      }
      if (worst === null || value > worst.value) {
        worst = {value, margin, r, N, J, K, support, terms: terms.size};
      }
    }
  }
}

console.log(`max_r=${maxR}`);
console.log(`plateaux=${count}`);
console.log(`worst=${JSON.stringify(worst)}`);
for (const [support, row] of [...bySupport].filter(([s]) =>
  s <= 12 || s === Math.max(...bySupport.keys()))) {
  console.log(`support_${support}=${JSON.stringify(row)}`);
}
console.log("single_plateau_resultant_probe_complete=true");
