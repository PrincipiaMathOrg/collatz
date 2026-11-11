#!/usr/bin/env node
"use strict";

/*
Probe explicit algebraic-unit transforms of the binary endpoint polynomial.

The unit (theta-1)^(-1) gives a positive {1,2}-digit vector but reconstructs
only a cyclic rotation of the original word.  For even r, theta+1 is also a
unit in Z[theta], theta^r=2, with inverse

  J=theta^(r-1)-theta^(r-2)+...+theta-1.

This program enumerates admissible binary profiles and measures the
coefficient alphabet/sign pattern of JH.  The sharp question is whether a
second unit yields a bounded, sign-coherent digit system which could create
an independent integral companion under q=1.
*/

const maxR = Number(process.argv[2] || 20);

function assert(ok, message) { if (!ok) throw new Error(message); }
function gcd(a, b) {
  while (b !== 0) [a, b] = [b, a % b];
  return Math.abs(a);
}
function bitLength(x) { return x.toString(2).length; }

function strictSuffixRecord(word, N) {
  const r = word.length;
  let prefix = 0;
  for (let i = 0; i < r; ++i) {
    if ((1n << BigInt(N - prefix)) <= 3n ** BigInt(r - i)) return false;
    prefix += word[i];
  }
  return prefix === N;
}

function ringMultiply(a, b) {
  const r = a.length;
  assert(b.length === r, "ring dimensions differ");
  const out = Array(r).fill(0n);
  for (let i = 0; i < r; ++i) {
    for (let j = 0; j < r; ++j) {
      const exponent = i + j;
      if (exponent < r) out[exponent] += a[i] * b[j];
      else out[exponent - r] += 2n * a[i] * b[j];
    }
  }
  return out;
}

function endpointPolynomial(bits, r, N) {
  const e = N - r;
  const support = [];
  for (let j = 0; j < r; ++j) {
    if (bits[j]) support.push((j * e) % r);
  }
  support.sort((a, b) => a - b);
  assert(support.length > 0 && support[0] > 0,
    "endpoint support is not anchored");
  const cStar = support[support.length - 1];
  const S = Array(r).fill(0n);
  for (const c of support) S[cStar - c] = 1n;
  const H = Array(r).fill(0n);
  for (let k = 0; k < r; ++k) {
    H[k] -= S[k];
    if (k + 1 < r) H[k + 1] += S[k];
    else H[0] += 2n * S[k];
  }
  const terminal = cStar + 1;
  if (terminal < r) H[terminal] -= 1n;
  else H[0] -= 2n;
  return {H, S, support, cStar};
}

let profiles = 0;
let signCoherent = 0;
let alternatingSignCoherent = 0;
let alternatingStrictlyPositive = 0;
let boundedByTwo = 0;
let boundedByFour = 0;
let maximumAbsoluteCoefficient = 0n;
let maximumAlphabetSize = 0;
const firstNoncoherent = [];
const firstAlternatingNoncoherent = [];
const rows = [];

for (let r = 4; r <= maxR; r += 2) {
  const P = 3n ** BigInt(r);
  const N = bitLength(P);
  const e = N - r;
  if (gcd(e, r) !== 1) continue;
  const B = [];
  for (let j = 0; j <= r; ++j) B.push(Math.floor(j * N / r));
  const inversePlus = Array.from({length: r}, (_, k) =>
    ((r - 1 - k) % 2 === 0 ? 1n : -1n));
  const plusCheck = Array(r).fill(0n);
  plusCheck[0] = 1n;
  plusCheck[1] = 1n;
  const unitProduct = ringMultiply(inversePlus, plusCheck);
  assert(unitProduct[0] === 1n && unitProduct.slice(1).every(x => x === 0n),
    "theta+1 inverse regression failed");

  const heights = Array(r + 1).fill(0);
  let rowProfiles = 0;
  let rowCoherent = 0;
  let rowMaximum = 0n;

  function visit(j) {
    if (j === r) {
      if (heights[r] !== 0) return;
      const word = [];
      for (let i = 0; i < r; ++i) {
        const a = B[i + 1] - B[i] + heights[i] - heights[i + 1];
        if (a <= 0) return;
        word.push(a);
      }
      if (!strictSuffixRecord(word, N)) return;
      const bits = heights.slice(0, r);
      if (bits.every(x => x === 0)) return;
      const endpoint = endpointPolynomial(bits, r, N);
      const transformed = ringMultiply(inversePlus, endpoint.H);
      ++profiles;
      ++rowProfiles;
      const allNonnegative = transformed.every(x => x >= 0n);
      const allNonpositive = transformed.every(x => x <= 0n);
      if (allNonnegative || allNonpositive) {
        ++signCoherent;
        ++rowCoherent;
      } else if (firstNoncoherent.length < 12) {
        firstNoncoherent.push({
          r, N, word: word.join("."), bits: bits.join(""),
          support: endpoint.support.join("."),
          transformed: transformed.join(".")
        });
      }
      const untwisted = transformed.map((x, k) => k % 2 === 0 ? x : -x);
      const alternatingNonnegative = untwisted.every(x => x >= 0n);
      const alternatingNonpositive = untwisted.every(x => x <= 0n);
      if (alternatingNonnegative || alternatingNonpositive) {
        ++alternatingSignCoherent;
      } else if (firstAlternatingNoncoherent.length < 12) {
        firstAlternatingNoncoherent.push({
          r, N, word: word.join("."), bits: bits.join(""),
          support: endpoint.support.join("."),
          transformed: transformed.join("."),
          untwisted: untwisted.join(".")
        });
      }
      if (untwisted.every(x => x > 0n) || untwisted.every(x => x < 0n)) {
        ++alternatingStrictlyPositive;
      }
      const rowAbs = transformed.reduce((m, x) => {
        const a = x < 0n ? -x : x;
        return a > m ? a : m;
      }, 0n);
      if (rowAbs <= 2n) ++boundedByTwo;
      if (rowAbs <= 4n) ++boundedByFour;
      if (rowAbs > rowMaximum) rowMaximum = rowAbs;
      if (rowAbs > maximumAbsoluteCoefficient) maximumAbsoluteCoefficient = rowAbs;
      const alphabet = new Set(transformed.map(String)).size;
      if (alphabet > maximumAlphabetSize) maximumAlphabetSize = alphabet;
      return;
    }
    for (const next of [0, 1]) {
      const a = B[j + 1] - B[j] + heights[j] - next;
      if (a <= 0) continue;
      heights[j + 1] = next;
      visit(j + 1);
    }
    heights[j + 1] = 0;
  }

  visit(0);
  rows.push({
    r, N, e, profiles: rowProfiles, signCoherent: rowCoherent,
    maximumAbsoluteCoefficient: rowMaximum.toString()
  });
}

console.log(JSON.stringify({
  target: "theta-plus-one unit companion",
  maxR,
  profiles,
  signCoherent,
  alternatingSignCoherent,
  alternatingStrictlyPositive,
  boundedByTwo,
  boundedByFour,
  maximumAbsoluteCoefficient: maximumAbsoluteCoefficient.toString(),
  maximumAlphabetSize,
  firstNoncoherent,
  firstAlternatingNoncoherent,
  rows,
  warning: "finite combinatorial evidence only"
}, null, 2));
