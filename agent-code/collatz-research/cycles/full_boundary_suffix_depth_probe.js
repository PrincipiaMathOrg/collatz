#!/usr/bin/env node
"use strict";

// Exact loose-composition probe for the terminal suffix-depth residue
// candidate 3*tau > ell.  It records the sharp minimum separately at each
// observed suffix depth so that a proposed induction can be tested against
// its equality patterns.

const maximumR = Number(process.argv[2] || 16);
const alpha = Math.log2(3);

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

const records = new Map();
let compositionCount = 0;

for (let r = 2; r <= maximumR; ++r) {
  const A = Math.ceil(r * alpha - 1e-12);
  const M = 1n << BigInt(A);
  const R = 3n ** BigInt(r);
  const D = M - R;
  const inverseM = inverse(M, D);
  const powers3 = [1n];
  for (let k = 1; k <= r; ++k) powers3.push(powers3[k - 1] * 3n);
  const word = [];

  function visit(i, exponent, carry) {
    if (i === r) {
      if (exponent !== A) return;
      ++compositionCount;
      const tau = mod(carry * inverseM, D);
      let suffixExponent = 0;
      let ell = 0;
      for (let k = 1; k < r; ++k) {
        suffixExponent += word[r - k];
        if ((1n << BigInt(suffixExponent)) <= powers3[k]) break;
        ell = k;
      }
      const margin = 3n * tau - BigInt(ell);
      const previous = records.get(ell);
      if (previous === undefined || tau < previous.tau ||
          (tau === previous.tau && margin < previous.margin)) {
        records.set(ell, {
          ell,
          tau,
          margin,
          r,
          A,
          word: word.join(".")
        });
      }
      return;
    }

    const remaining = r - i - 1;
    const largest = A - exponent - remaining;
    for (let a = 1; a <= largest; ++a) {
      if (i === 0 && a !== 1) continue;
      word.push(a);
      visit(i + 1, exponent + a,
        3n * carry + (1n << BigInt(exponent)));
      word.pop();
    }
  }

  visit(0, 0, 0n);
}

const minima = [...records.values()].sort((a, b) => a.ell - b.ell);
assert(minima.every(entry => entry.margin > 0n),
  "suffix-depth residue candidate failed");

console.log(JSON.stringify({
  probe: "minimum reduced residue at each strict terminal suffix depth",
  maximumR,
  compositionCount,
  minima: minima.map(entry => ({
    ell: entry.ell,
    tau: entry.tau.toString(),
    margin: entry.margin.toString(),
    r: entry.r,
    A: entry.A,
    word: entry.word
  })),
  warning: "finite exhaustive evidence only"
}, null, 2));
