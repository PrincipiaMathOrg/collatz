#!/usr/bin/env node
"use strict";

// Exact certificate refuting the proposed strengthening 2*tau >= s.

const word = "1111101010111111111101101010100010100111011000";

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function mod(a, m) {
  const z = a % m;
  return z < 0n ? z + m : z;
}

function inverse(a, m) {
  let oldR = a, r = m, oldS = 1n, s = 0n;
  while (r !== 0n) {
    const q = oldR / r;
    [oldR, r] = [r, oldR - q * r];
    [oldS, s] = [s, oldS - q * s];
  }
  assert(oldR === 1n, "inverse does not exist");
  return mod(oldS, m);
}

let prefixM = 1n;
let prefixP = 1n;
let C = 0n;
let s = 0;
for (let j = 0; j < word.length; ++j) {
  if (word[j] === "1") {
    C = 3n * C + (1n << BigInt(j));
    prefixP *= 3n;
    ++s;
  }
  prefixM *= 2n;
  if (j + 1 < word.length) {
    assert(prefixM <= prefixP, `early coefficient crossing at ${j + 1}`);
  }
}

const k = word.length;
const M = 1n << BigInt(k);
const P = 3n ** BigInt(s);
const D = M - P;
assert(D > 0n, "final coefficient did not cross");
assert(prefixM === M && prefixP === P, "prefix totals disagree");

const tau = mod(C * inverse(M, D), D);
const rho = mod(-C * inverse(P, M), M);
const Z = (P * rho + C) / M;
assert((P * rho + C) % M === 0n, "rho is not an inverse-fiber residue");

let m = M - rho;
const m0 = m;
let evenSum = 0n;
let oddSum = 0n;
const states = [];
for (let j = 0; j < k; ++j) {
  states.push(m);
  const parity = Number(m & 1n);
  assert(parity === Number(word[j]), `shadow parity mismatch at ${j}`);
  if (parity === 1) {
    oddSum += m;
    m = (3n * m - 1n) / 2n;
  } else {
    evenSum += m;
    m /= 2n;
  }
}
const mk = m;
const gap = m0 - mk;

assert(mk === P - Z, "paired endpoint identity failed");
assert(gap === D + Z - rho, "gap identity failed");
assert(gap === tau && gap < D, "this is not the descent lift");
assert(evenSum - oddSum === 2n * gap - BigInt(s), "sum identity failed");
assert(2n * tau < BigInt(s), "word does not refute the half-bound");
assert(3n * tau >= BigInt(s), "word unexpectedly refutes the one-third bound");

console.log(JSON.stringify({
  status: "certified counterexample to 2*tau >= s",
  word, k, s,
  M: M.toString(), P: P.toString(), D: D.toString(), C: C.toString(),
  tau: tau.toString(), rho: rho.toString(), Z: Z.toString(),
  m0: m0.toString(), mk: mk.toString(), gap: gap.toString(),
  evenSum: evenSum.toString(), oddSum: oddSum.toString(),
  signedSum: (evenSum - oddSum).toString(),
  states: states.map(String)
}, null, 2));
