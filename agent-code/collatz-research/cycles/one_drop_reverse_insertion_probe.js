#!/usr/bin/env node
"use strict";

// Diagnostic only.  Insert complement sites in decreasing reverse-degree
// order, so the new site is smaller than every site already present.  Test
// whether the scaled full-cylinder representative is monotone in this order.

function egcd(a, b) {
  if (b === 0n) return [a, 1n, 0n];
  const [g, x, y] = egcd(b, a % b);
  return [g, y, x - (a / b) * y];
}

function invMod(a, m) {
  const [g, x] = egcd(((a % m) + m) % m, m);
  if (g !== 1n) throw new Error("nonunit");
  return ((x % m) + m) % m;
}

function carryFromComplement(r, N, reverseDegrees) {
  const V = reverseDegrees.length;
  let Cscaled = 3n ** BigInt(r) - (1n << BigInt(r + V));
  const ks = reverseDegrees.slice().sort((a, b) => a - b);
  for (let m = 0; m < V; ++m) {
    const k = ks[m];
    const j = r - 1 - k;
    Cscaled += (1n << BigInt(j + (V - m))) * 3n ** BigInt(k);
  }
  return Cscaled;
}

const maxR = Number(process.argv[2] || 28);
let edges = 0n;
let monotoneFailures = 0n;
let worst = null;

for (let r = 3; r <= maxR; ++r) {
  const P = 3n ** BigInt(r);
  const N = (P - 1n).toString(2).length;
  const e = N - r;
  const fullM = 1n << BigInt(N);
  const mod = 2n * fullM;
  const D = fullM - P;
  const invD = invMod(D, mod);
  const B = Array.from({length: r + 1}, (_, i) =>
    Math.floor(i * N / r));
  const reverseEligible = [];
  for (let j = 0; j < r - 1; ++j) {
    if (B[j + 1] - B[j] === 2) reverseEligible.push(r - 1 - j);
  }
  reverseEligible.sort((a, b) => b - a); // insertion order: largest to smallest
  if (reverseEligible.length >= 31) throw new Error("mask cutoff");

  const total = 1 << reverseEligible.length;
  let rowFailures = 0n;
  for (let mask = 1; mask < total; ++mask) {
    const selected = [];
    for (let i = 0; i < reverseEligible.length; ++i) {
      if ((mask & (1 << i)) !== 0) selected.push(reverseEligible[i]);
    }
    const childK = selected[selected.length - 1];
    const parent = selected.slice(0, -1);
    const Cp = carryFromComplement(r, N, parent);
    const Cc = carryFromComplement(r, N, selected);
    let rhoP = (Cp * invD) % mod;
    let rhoC = (Cc * invD) % mod;
    if (rhoP === 0n) rhoP = mod;
    if (rhoC === 0n) rhoC = mod;
    const parentU = e - 1 - parent.length;
    const childU = parentU - 1;
    ++edges;
    const diff = 2n * rhoC - rhoP;
    if (diff < 0n) {
      ++monotoneFailures;
      ++rowFailures;
      const datum = {r, N, e, childK, parentU, childU,
        rhoP: rhoP.toString(), rhoC: rhoC.toString(),
        diff: diff.toString(), selected};
      if (worst === null || diff < BigInt(worst.diff)) worst = datum;
    }
  }
  console.log(JSON.stringify({r, e, rowFailures: rowFailures.toString()}));
}

console.log(JSON.stringify({maxR, edges: edges.toString(),
  monotoneFailures: monotoneFailures.toString(), worst}, null, 2));
