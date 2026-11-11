"use strict";

// Targeted diagnostic for the mandatory epsilon-profile
// A_i=floor(i log_2 3).  It tests named lower bounds on the exact target
// residue tau=[C*2^{-N}]_{D}; it is not a proof by enumeration.

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

function decimalRatio(a, b) {
  return ((a * 1000000n) / b).toString().padStart(6, "0");
}

const maxS = Number(process.argv[2] || 2000);
assert(Number.isInteger(maxS) && maxS >= 2, "invalid maximum weight");

let P = 1n;
let C = 0n;
let previousN = 0;
let q2Weights = 0;
let targetHits = 0;
let halfBoundFailures = 0;
let thirdBoundFailures = 0;
let closest = null;
const scaledClosest = new Map([[1, null], [2, null], [4, null], [14, null]]);
const firstHalfFailures = [];

for (let s = 1; s <= maxS; ++s) {
  const A = bitLength(P) - 1;
  C = 3n * C + (1n << BigInt(A));
  P *= 3n;
  const N = bitLength(P);
  const q = N - previousN;
  previousN = N;
  if (q !== 1 || s < 2) continue;
  ++q2Weights;

  const e = N - s;
  const terminalDelay = e - 1;
  if (terminalDelay < 1) continue;
  const dMax = BigInt(Math.floor((terminalDelay + 1) / 2));
  const M = 1n << BigInt(N);
  const D = M - P;
  const tau = mod(C * inverse(M, D), D);

  if (tau >= 1n && tau <= dMax) ++targetHits;
  if (2n * tau <= D) {
    ++halfBoundFailures;
    if (firstHalfFailures.length < 12) {
      firstHalfFailures.push({s, N, e, tau, D});
    }
  }
  if (3n * tau <= D) ++thirdBoundFailures;
  if (closest === null || tau * closest.D < closest.tau * D) {
    closest = {s, N, e, tau, D, dMax};
  }
  for (const exponent of scaledClosest.keys()) {
    const scale = BigInt(s) ** BigInt(exponent);
    const old = scaledClosest.get(exponent);
    if (old === null || tau * scale * old.D < old.tau * old.scale * D) {
      scaledClosest.set(exponent, {s, N, e, tau, D, dMax, scale});
    }
  }
}

console.log(`max_s=${maxS}`);
console.log(`q2_weights=${q2Weights}`);
console.log(`strict_target_hits=${targetHits}`);
console.log(`tau_le_D_over_2=${halfBoundFailures}`);
console.log(`tau_le_D_over_3=${thirdBoundFailures}`);
for (const item of firstHalfFailures) {
  console.log(
    `half_failure s=${item.s} N=${item.N} e=${item.e} ` +
    `tau_over_D=0.${decimalRatio(item.tau, item.D)}`
  );
}
console.log(
  `minimum_ratio s=${closest.s} N=${closest.N} e=${closest.e} ` +
  `d_max=${closest.dMax} tau=${closest.tau} ` +
  `tau_over_D=0.${decimalRatio(closest.tau, closest.D)}`
);
for (const [exponent, item] of scaledClosest) {
  console.log(
    `minimum_scaled exponent=${exponent} s=${item.s} ` +
    `floor_tau_s_pow_over_D=${item.tau * item.scale / item.D}`
  );
}
