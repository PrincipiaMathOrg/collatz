#!/usr/bin/env node
"use strict";

/*
Translate the carry of the weight-eight four-corner board while keeping its
three nonterminal corner increments fixed.  This locates the support of the
highest Boolean derivative and contrasts it with the genuine anchored carry.
Translated points are method countermodels, not Collatz profiles.
*/

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function mod(a, m) {
  const value = a % m;
  return value < 0n ? value + m : value;
}

function inverse(a, m) {
  let oldR = a;
  let r = m;
  let oldS = 1n;
  let s = 0n;
  while (r !== 0n) {
    const q = oldR / r;
    [oldR, r] = [r, oldR - q * r];
    [oldS, s] = [s, oldS - q * s];
  }
  assert(oldR === 1n, "inverse does not exist");
  return mod(oldS, m);
}

const weight = 8;
const P = 3n ** 8n;
const M = 8192n;
const D = M - P;
const inverseP = inverse(P, M);
const inverseM = inverse(M, D);
const anchoredCarry = 13349n;
const cornerWeights = [972n, 864n, 768n];
const cornerScales = [
  {t: 2, b: 5},
  {t: 5, b: 3},
  {t: 8, b: 1}
];
const totalRemoved = cornerWeights.reduce((x, y) => x + y, 0n);

function color(C) {
  const rho = mod(-C * inverseP, M);
  const tau = mod(C * inverseM, D);
  const numerator = D * rho + M * tau - C;
  assert(numerator % (M * D) === 0n, "nonintegral color");
  const E = numerator / (M * D);
  assert(E === 0n || E === 1n, "color escaped {0,1}");
  return E;
}

function mobius(C) {
  let value = 0n;
  let punctured = color(C) === 0n;
  for (let mask = 0; mask < 8; ++mask) {
    let removed = 0n;
    let bits = 0;
    for (let j = 0; j < 3; ++j) {
      if ((mask & (1 << j)) === 0) continue;
      removed += cornerWeights[j];
      ++bits;
    }
    const E = color(C - removed);
    value += ((3 - bits) & 1) === 0 ? E : -E;
    if (mask !== 0 && E !== 1n) punctured = false;
  }
  return {value, punctured};
}

function printableMobius(C) {
  const row = mobius(C);
  return {value: row.value.toString(), punctured: row.punctured};
}

function lucasParity(C) {
  const W = cornerScales.reduce((sum, row) =>
    sum + (1n << BigInt(row.t)), 0n);
  const K = M - W;
  let parity = 0;
  for (let v = 0n; v * D <= C; ++v) {
    function visit(j, shift) {
      if (j === cornerScales.length) {
        const n = C - v * D - shift;
        if (n >= 0n && (n & (K - 1n)) === 0n) parity ^= 1;
        return;
      }
      const row = cornerScales[j];
      const scale = 1n << BigInt(row.t);
      const limit = 3 ** row.b;
      for (let digit = 0; digit < limit; ++digit) {
        visit(j + 1, shift + scale * BigInt(digit));
      }
    }
    visit(0, 0n);
  }
  return parity;
}

const upper = BigInt(weight) * M / 3n;
const runs = [];
const histogram = new Map();
const nonzeroCarries = [];
let current = null;
let puncturedCount = 0;
let oddCount = 0;
for (let C = totalRemoved + 1n; C < upper; C += 2n) {
  const row = mobius(C);
  const key = row.value.toString();
  histogram.set(key, (histogram.get(key) || 0) + 1);
  if ((row.value & 1n) !== 0n) ++oddCount;
  if (row.value !== 0n) {
    nonzeroCarries.push({carry: C.toString(), value: row.value.toString(),
      punctured: row.punctured});
  }
  if (row.punctured) ++puncturedCount;
  if (current === null || current.value !== key ||
      current.punctured !== row.punctured) {
    current = {start: C.toString(), end: C.toString(), value: key,
      punctured: row.punctured};
    runs.push(current);
  } else {
    current.end = C.toString();
  }
}


for (const C of [anchoredCarry, 13085n, 8155n]) {
  const expected = mobius(C).value === 0n ? 0 : 1;
  assert(lucasParity(C) === expected,
    `Lucas parity normal form failed at C=${C}`);
}

console.log(JSON.stringify({
  probe: "translation support of the weight-eight top Boolean derivative",
  weight,
  M: M.toString(),
  D: D.toString(),
  cornerWeights: cornerWeights.map(String),
  anchoredCarry: anchoredCarry.toString(),
  anchored: printableMobius(anchoredCarry),
  virtualCarry13085: printableMobius(13085n),
  virtualCarry8155: printableMobius(8155n),
  lucasParity: {
    anchoredCarry: lucasParity(anchoredCarry),
    virtualCarry13085: lucasParity(13085n),
    virtualCarry8155: lucasParity(8155n)
  },
  scannedOddCarries: Number((upper - totalRemoved) / 2n),
  oddCount,
  puncturedCount,
  histogram: [...histogram.entries()].sort((a, b) => Number(a[0]) - Number(b[0])),
  nonzeroCarries,
  runCount: runs.length,
  firstRuns: runs.slice(0, 80),
  warning: "translated carries only except for anchoredCarry"
}, null, 2));
