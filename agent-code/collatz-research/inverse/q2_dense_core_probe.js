#!/usr/bin/env node
"use strict";

// Diagnostic for dense b=1 deformation cores.  The primary family is one
// height-one plateau h_i=1 on J <= i <= K.  Such a plateau can have linear
// support while changing only two exponent edges.

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

function gcd(a, b) {
  if (a < 0n) a = -a;
  if (b < 0n) b = -b;
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

function serial(value) {
  if (value === null) return null;
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [
    key,
    typeof item === "bigint" ? item.toString() : item
  ]));
}

const maxS = Number(process.argv[2] || 1000);
assert(Number.isInteger(maxS) && maxS >= 3, "invalid maximum weight");

let P = 1n;
let previousN = 0;
let C0 = 0n;
const B = [0];
const powers3 = [1n];
let q2Weights = 0;
let plateauProfiles = 0;
let denseProfiles = 0;
let strictFormalHits = 0;
let equalityFormalHits = 0;
let positiveOddHits = 0;
let firstFormal = null;
let firstPositive = null;
let firstDenseProperFactor = null;
let densest = null;

for (let s = 1; s <= maxS; ++s) {
  const nextB = bitLength(P) - 1;
  if (s - 1 >= B.length) B.push(nextB);
  C0 = 3n * C0 + (1n << BigInt(nextB));
  P *= 3n;
  powers3.push(P);
  const N = bitLength(P);
  const increment = N - previousN;
  previousN = N;
  if (increment !== 1 || s < 3) continue;
  ++q2Weights;

  const e = N - s;
  const terminalDelay = e - 1;
  const dMax = BigInt(Math.floor((terminalDelay + 1) / 2));
  const M = 1n << BigInt(N);
  const D = M - P;
  const invM = inverse(M, D);
  const tau0 = mod(C0 * invM, D);

  const prefixLoss = Array(s).fill(0n);
  for (let i = 1; i <= s - 2; ++i) {
    const loss = (1n << BigInt(B[i] - 1)) * powers3[s - 1 - i];
    prefixLoss[i] = prefixLoss[i - 1] + loss;
  }

  for (let J = 1; J <= s - 2; ++J) {
    if (B[J] - B[J - 1] !== 2) continue;
    for (let K = J; K <= s - 2; ++K) {
      ++plateauProfiles;
      const support = K - J + 1;
      if (support * 2 >= s) ++denseProfiles;
      const loss = prefixLoss[K] - (J >= 2 ? prefixLoss[J - 1] : 0n);
      let tau = tau0 - mod(loss * invM, D);
      if (tau < 0n) tau += D;
      const equality = tau === 0n;
      const strict = tau >= 1n && tau <= dMax;
      if (equality) ++equalityFormalHits;
      if (strict) ++strictFormalHits;

      const C = C0 - loss;
      if (firstDenseProperFactor === null && support * 2 >= s) {
        for (let trialD = 0n; trialD <= dMax; ++trialD) {
          const factor = gcd(D, C - M * trialD);
          if (factor > 1n && factor < D) {
            firstDenseProperFactor = {
              s, N, J, K, support, d: trialD, factor, D, C
            };
            break;
          }
        }
      }
      if (densest === null || support > densest.support ||
          (support === densest.support && s > densest.s)) {
        densest = {s, N, J, K, support, C, C0, P, D};
      }

      if (!equality && !strict) continue;
      const d = tau;
      const numerator = C - M * d;
      assert(numerator % D === 0n, "formal target did not divide");
      const n = numerator / D;
      if (firstFormal === null) {
        firstFormal = {s, N, J, K, support, d, dMax, n, C, D};
      }
      if (n > 0n && (n & 1n) === 1n) {
        ++positiveOddHits;
        if (firstPositive === null) {
          firstPositive = {s, N, J, K, support, d, dMax, n, C, D};
        }
      }
    }
  }
}

console.log(JSON.stringify({
  maxS,
  q2Weights,
  plateauProfiles,
  denseProfiles,
  strictFormalHits,
  equalityFormalHits,
  positiveOddHits,
  firstFormal: serial(firstFormal),
  firstPositive: serial(firstPositive),
  firstDenseProperFactor: serial(firstDenseProperFactor),
  densest: serial(densest)
}, null, 2));
