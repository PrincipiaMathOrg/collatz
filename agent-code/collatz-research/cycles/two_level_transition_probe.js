#!/usr/bin/env node
"use strict";

// Diagnostic only. Enumerate every single height-one plateau in the
// coprime two-level cycle model. A plateau may have arbitrary support but
// has exactly two height transitions. All arithmetic decisions are BigInt.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function gcd(a, b) {
  if (a < 0n) a = -a;
  if (b < 0n) b = -b;
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

function bitLength(n) {
  return n.toString(2).length;
}

function properPeriod(word) {
  const r = word.length;
  for (let p = 1; p < r; ++p) {
    if (r % p !== 0) continue;
    let ok = true;
    for (let i = p; i < r; ++i) {
      if (word[i] !== word[i % p]) {
        ok = false;
        break;
      }
    }
    if (ok) return p;
  }
  return r;
}

function carryOf(word) {
  let carry = 0n;
  let prefix = 0n;
  for (const a of word) {
    carry = 3n * carry + (1n << prefix);
    prefix += BigInt(a);
  }
  return {carry, total: prefix};
}

const maxR = Number(process.argv[2] || 80);
let periods = 0;
let plateaux = 0;
let primitive = 0;
let full = 0;
let properFactor = 0;
let best = null;
const supportRows = new Map();

let power3 = 1n;
for (let r = 1; r <= maxR; ++r) {
  power3 *= 3n;
  const N = bitLength(power3 - 1n);
  if (gcd(BigInt(N), BigInt(r)) !== 1n) continue;
  ++periods;
  const M = 1n << BigInt(N);
  const D = M - power3;
  const B = Array(r + 1);
  for (let i = 0; i <= r; ++i) {
    B[i] = Math.floor(i * N / r);
  }
  assert(B[r] === N, `terminal prefix failed at r=${r}`);
  const base = Array(r);
  for (let i = 0; i < r; ++i) base[i] = B[i + 1] - B[i];

  for (let J = 1; J <= r - 1; ++J) {
    if (base[J - 1] < 2) continue;
    for (let K = J; K <= r - 1; ++K) {
      ++plateaux;
      const word = base.slice();
      --word[J - 1];
      ++word[K];
      assert(word.every(a => a >= 1), `nonpositive exponent at r=${r}`);
      const data = carryOf(word);
      assert(data.total === BigInt(N), `weight changed at r=${r}`);
      const period = properPeriod(word);
      if (period === r) ++primitive;
      const common = gcd(D, data.carry);
      const q = D / common;
      if (common === D) ++full;
      if (common > 1n && common < D) ++properFactor;
      const support = K - J + 1;
      const row = supportRows.get(support) || {count: 0, minQ: null,
        witness: null};
      ++row.count;
      if (row.minQ === null || q < row.minQ) {
        row.minQ = q;
        row.witness = `${r},${N},${J},${K},${common}`;
      }
      supportRows.set(support, row);
      if (best === null || q < best.q) {
        best = {r, N, J, K, support, period, D, carry: data.carry,
          common, q, word: word.join(",")};
      }
    }
  }
}

console.log(`max_r=${maxR}`);
console.log(`coprime_periods=${periods}`);
console.log(`single_plateaux=${plateaux}`);
console.log(`primitive_plateaux=${primitive}`);
console.log(`proper_factor_plateaux=${properFactor}`);
console.log(`full_determinant_hits=${full}`);
if (best !== null) {
  for (const [key, value] of Object.entries(best)) {
    console.log(`best_${key}=${value}`);
  }
}
const selected = [...supportRows].filter(([k]) =>
  k <= 10 || k === Math.max(...supportRows.keys()));
for (const [support, row] of selected) {
  console.log(`support_${support}_count=${row.count}_min_q=${row.minQ}` +
    `_witness_r_N_J_K_g=${row.witness}`);
}
console.log("two_level_transition_probe_passed=true");
