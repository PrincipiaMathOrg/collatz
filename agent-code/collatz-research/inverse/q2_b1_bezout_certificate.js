#!/usr/bin/env node
"use strict";

// Exact certificate for the pure-Christoffel subcase of the q=2,
// terminal-complement b=1 strict gate.  The all-depth argument is analytic;
// this script checks its cutoff and the finite range one profile per weight.

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

function powMod(base, exponent, modulus) {
  assert(exponent >= 0n, "negative exponent in powMod");
  let value = mod(base, modulus);
  let power = exponent;
  let result = 1n;
  while (power > 0n) {
    if ((power & 1n) !== 0n) result = (result * value) % modulus;
    value = (value * value) % modulus;
    power >>= 1n;
  }
  return result;
}

function signedPowMod(base, exponent, modulus) {
  if (exponent >= 0n) return powMod(base, exponent, modulus);
  return powMod(inverse(base, modulus), -exponent, modulus);
}

function gcd(a, b) {
  while (b !== 0n) [a, b] = [b, a % b];
  return a < 0n ? -a : a;
}

function balancedBezout(s, N) {
  // First find v=N^{-1} mod s, then choose its symmetric representative.
  let v = inverse(N, s);
  if (2n * v > s) v -= s;
  const numerator = 1n - v * N;
  assert(numerator % s === 0n, "Bezout numerator is not divisible by s");
  const u = numerator / s;
  assert(u * s + v * N === 1n, "balanced Bezout identity failed");
  assert(2n * (v < 0n ? -v : v) <= s,
    "balanced Bezout coefficient escaped the half interval");
  return {u, v};
}

function carry(positions) {
  const s = positions.length;
  let C = 0n;
  for (let i = 0; i < s; ++i) {
    C += (1n << BigInt(positions[i])) * 3n ** BigInt(s - 1 - i);
  }
  return C;
}

const cutoff = 250n;
const sizeConstant = 8262n * 8262n;
assert(3n ** cutoff > sizeConstant * cutoff ** 30n,
  "balanced-Bezout cutoff seed failed");
assert(3n * cutoff ** 30n > (cutoff + 1n) ** 30n,
  "balanced-Bezout cutoff propagation failed");

let P = 1n;
let previousN = 0;
const counts = {
  q2Weights: 0,
  coprimeSlopes: 0,
  noncoprimeSlopes: 0,
  christoffelTargets: 0,
  noncoprimeTargets: 0,
  validPrefixProfiles: 0,
  divisibilityHits: 0,
  spectralChecks: 0,
  balancedRemainderChecks: 0,
  cyclotomicFactorChecks: 0
};

for (let sNumber = 1; sNumber < Number(cutoff); ++sNumber) {
  P *= 3n;
  const NNumber = P.toString(2).length;
  const q = NNumber - previousN;
  previousN = NNumber;
  if (q !== 1 || sNumber < 2) continue;
  ++counts.q2Weights;

  const s = BigInt(sNumber);
  const N = BigInt(NNumber);
  const e = NNumber - sNumber;
  const terminalDelay = e - 1;
  if (terminalDelay < 1) continue;

  const slopeGcd = gcd(s, N);
  if (slopeGcd !== 1n) {
    ++counts.noncoprimeSlopes;
    const positions = [];
    for (let i = 0; i < sNumber; ++i) {
      positions.push(Math.floor(i * NNumber / sNumber));
    }
    const C = carry(positions);
    const M = 1n << N;
    const D = M - P;
    const p = N / slopeGcd;
    const qBase = s / slopeGcd;
    const X = 1n << p;
    const Y = 3n ** qBase;
    let H = 0n;
    for (let index = 0n; index < slopeGcd; ++index) {
      H += X ** index * Y ** (slopeGcd - 1n - index);
    }
    assert(D % H === 0n && C % H === 0n,
      "Christoffel cyclotomic factorization failed");
    assert(gcd(H, P) === 1n, "cyclotomic factor met the target power");
    const dMax = Math.floor((terminalDelay + 1) / 2);
    assert(H > BigInt(dMax), "cyclotomic factor did not exceed target range");
    for (let dNumber = 1; dNumber <= dMax; ++dNumber) {
      ++counts.noncoprimeTargets;
      ++counts.cyclotomicFactorChecks;
      assert(mod(C - P * BigInt(dNumber), D) !== 0n,
        "noncoprime Christoffel divisibility hit");
    }
    continue;
  }
  ++counts.coprimeSlopes;

  const positions = [];
  let prefixValid = true;
  let prefixPower3 = 1n;
  for (let i = 0; i < sNumber; ++i) {
    const position = Math.floor(i * NNumber / sNumber);
    positions.push(position);
    if ((1n << BigInt(position)) > prefixPower3) prefixValid = false;
    prefixPower3 *= 3n;
  }
  assert(positions[0] === 0 && positions[sNumber - 1] === NNumber - 2,
    "Christoffel endpoint lost b=1");
  if (prefixValid) ++counts.validPrefixProfiles;

  const M = 1n << N;
  const D = M - P;
  const C = carry(positions);
  const {u, v} = balancedBezout(s, N);
  const z = mod(signedPowMod(2n, u, D) * signedPowMod(3n, v, D), D);
  assert(powMod(z, s, D) === 2n % D, "z^s=2 failed");
  assert(powMod(z, N, D) === 3n % D, "z^N=3 failed");

  let geometric = 0n;
  for (let i = 0; i < sNumber; ++i) {
    const c = mod(BigInt(i) * N, s);
    geometric = mod(geometric + signedPowMod(z, -c, D), D);
  }
  assert(mod(2n * (z - 1n) * geometric - z, D) === 0n,
    "Christoffel geometric identity failed");
  const prefactor = powMod(z, N * (s - 1n), D);
  assert(mod(C - prefactor * geometric, D) === 0n,
    "carry spectral identity failed");

  const dMax = Math.floor((terminalDelay + 1) / 2);
  for (let dNumber = 1; dNumber <= dMax; ++dNumber) {
    ++counts.christoffelTargets;
    ++counts.spectralChecks;
    const d = BigInt(dNumber);
    const carryGate = mod(C - P * d, D);
    const spectralGate = mod(geometric - 3n * d, D);
    assert(carryGate === mod(prefactor * spectralGate, D),
      "inhomogeneous spectral gate failed");

    const linear = mod((6n * d - 1n) * z - 6n * d, D);
    assert(mod(2n * (z - 1n) * spectralGate + linear, D) === 0n,
      "linear Christoffel reduction failed");

    let remainder;
    let multiplier;
    if (v > 0n) {
      assert(u < 0n, "Bezout signs failed in the positive-v branch");
      remainder = (6n * d - 1n) * 3n ** v - 6n * d * (1n << (-u));
      multiplier = 1n << (-u);
    } else {
      assert(v < 0n && u > 0n,
        "Bezout signs failed in the negative-v branch");
      remainder = (6n * d - 1n) * (1n << u) - 6n * d * 3n ** (-v);
      multiplier = 3n ** (-v);
    }
    assert(remainder !== 0n, "balanced Bezout remainder vanished");
    assert(mod(remainder - multiplier * linear, D) === 0n,
      "balanced Bezout remainder identity failed");
    ++counts.balancedRemainderChecks;

    if (carryGate === 0n) ++counts.divisibilityHits;
  }
}

assert(counts.divisibilityHits === 0,
  "finite pure-Christoffel b=1 target requires inspection");

console.log(JSON.stringify({
  certificate: "q2 b=1 inhomogeneous Bezout deformation",
  analyticCutoff: Number(cutoff),
  sizeInequality: "3^(s/2) > 8262*s^15",
  counts,
  conclusion: {
    pureChristoffelCoprimeExcludedAllDepth: true,
    generalTwoLevelExcluded: false,
    arbitraryDeformationExcluded: false
  }
}, null, 2));
