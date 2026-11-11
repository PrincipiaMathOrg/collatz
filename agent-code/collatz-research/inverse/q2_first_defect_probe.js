#!/usr/bin/env node
"use strict";

// Diagnostic for b=1 profiles at Hamming distance one from the maximal
// prefix-barrier profile A_i=floor(i log_2 3).  A singleton defect lowers
// one eligible position A_J by one.  This script distinguishes a low
// modular target residue from a realized positive endpoint.

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

function bitLength(n) {
  return n.toString(2).length;
}

const maxS = Number(process.argv[2] || 2000);
assert(Number.isInteger(maxS) && maxS >= 3, "invalid maximum weight");

let P = 1n;
let previousN = 0;
const B = [0];
let C0 = 0n;
let q2Weights = 0;
let singletonProfiles = 0;
let formalStrictHits = 0;
let formalEqualityHits = 0;
let positiveEndpointHits = 0;
let realizedHits = 0;
let smallestFormal = null;
let closestScaled = null;
let tau0BelowV = 0;
let tau0AtLeastV = 0;
let noWrapLow = 0;
let firstTau0AtLeastV = null;

for (let s = 1; s <= maxS; ++s) {
  const nextB = bitLength(P) - 1;
  if (s - 1 >= B.length) B.push(nextB);
  C0 = 3n * C0 + (1n << BigInt(nextB));
  P *= 3n;
  const N = bitLength(P);
  const increment = N - previousN;
  previousN = N;
  if (increment !== 1 || s < 3) continue;
  const e = N - s;
  const r = e - 1;
  if (r < 1) continue;
  ++q2Weights;
  assert(B[s - 1] === N - 2, "b=1 endpoint identity failed");

  const M = 1n << BigInt(N);
  const D = M - P;
  const invM = inverse(M, D);
  const tau0 = mod(C0 * invM, D);
  const dMax = BigInt(Math.floor((r + 1) / 2));

  for (let J = 1; J <= s - 2; ++J) {
    if (B[J] - B[J - 1] !== 2) continue;
    ++singletonProfiles;
    const E = (1n << BigInt(B[J] - 1)) *
      3n ** BigInt(s - 1 - J);
    const C = C0 - E;
    const V = mod(E * invM, D);
    const tau = mod(tau0 - V, D);
    if (tau0 < V) {
      ++tau0BelowV;
    } else {
      ++tau0AtLeastV;
      if (tau <= dMax) ++noWrapLow;
      if (firstTau0AtLeastV === null) {
        firstTau0AtLeastV = {s, N, J, tau0, V, tau, dMax, D};
      }
    }
    if (tau === 0n) ++formalEqualityHits;
    if (tau < 1n || tau > dMax) {
      const distance = tau <= dMax ? 0n : tau - dMax;
      const scale = BigInt(s) ** 16n;
      if (closestScaled === null ||
          distance * scale * closestScaled.D <
          closestScaled.distance * closestScaled.scale * D) {
        closestScaled = {s, J, tau, dMax, D, distance, scale};
      }
      continue;
    }
    ++formalStrictHits;
    const numeratorZ = C - P * tau;
    assert(numeratorZ % D === 0n, "formal congruence did not divide");
    const Z = numeratorZ / D;
    const n = Z - tau;
    if (Z > 0n) ++positiveEndpointHits;
    if (n > 0n) {
      ++realizedHits;
      assert((n & 1n) === 1n, "realized seed is not odd");
    }
    if (smallestFormal === null) {
      smallestFormal = {s, N, J, tau, dMax, Z, n, C, D};
    }
  }
}

function serial(value) {
  if (value === null) return null;
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [
    key,
    typeof item === "bigint" ? item.toString() : item
  ]));
}

console.log(JSON.stringify({
  maxS,
  q2Weights,
  singletonProfiles,
  formalStrictHits,
  formalEqualityHits,
  positiveEndpointHits,
  realizedHits,
  tau0BelowV,
  tau0AtLeastV,
  noWrapLow,
  smallestFormal: serial(smallestFormal),
  firstTau0AtLeastV: serial(firstTau0AtLeastV),
  closestScaled: serial(closestScaled)
}, null, 2));
