#!/usr/bin/env node
"use strict";

// Exact regression for the global integral-conjugacy theorem and the
// endpoint-norm false positive.  All arithmetic is BigInt arithmetic.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function abs(a) {
  return a < 0n ? -a : a;
}

function gcd(a, b) {
  a = abs(a);
  b = abs(b);
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

function pow(a, n) {
  let z = 1n;
  while (n > 0) {
    if (n & 1) z *= a;
    a *= a;
    n >>= 1;
  }
  return z;
}

function bitLength(n) {
  return n.toString(2).length;
}

function multiply2(A, B) {
  return [
    [A[0][0] * B[0][0] + A[0][1] * B[1][0],
      A[0][0] * B[0][1] + A[0][1] * B[1][1]],
    [A[1][0] * B[0][0] + A[1][1] * B[1][0],
      A[1][0] * B[0][1] + A[1][1] * B[1][1]]
  ];
}

function matrixPower2(A, n) {
  let z = [[1n, 0n], [0n, 1n]];
  while (n > 0) {
    if (n & 1) z = multiply2(z, A);
    A = multiply2(A, A);
    n >>= 1;
  }
  return z;
}

function carryOf(word) {
  let C = 0n;
  let prefix = 0;
  for (const exponent of word) {
    C = 3n * C + (1n << BigInt(prefix));
    prefix += exponent;
  }
  return {C, N: prefix};
}

function monodromy(word) {
  let B = [[1n, 0n], [0n, 1n]];
  for (const exponent of word) {
    const A = [[3n, 1n], [0n, 1n << BigInt(exponent)]];
    B = multiply2(A, B);
  }
  return B;
}

function oneDrop(r, selectedArray) {
  const P = pow(3n, r);
  const N = bitLength(P - 1n);
  const D = (1n << BigInt(N)) - P;
  const Bprefix = Array.from({length: r + 1}, (_, j) =>
    Math.floor(j * N / r));
  const gaps = Array.from({length: r}, (_, j) =>
    Bprefix[j + 1] - Bprefix[j]);
  const eligible = [];
  for (let j = 0; j < r - 1; ++j) {
    if (gaps[j] === 2) eligible.push(j);
  }
  const selected = new Set(selectedArray);
  const U = selected.size;
  const heights = [];
  let height = 0;
  for (let j = 0; j < r; ++j) {
    heights.push(height);
    if (selected.has(j)) ++height;
  }
  const word = [];
  for (let j = 0; j < r - 1; ++j) {
    word.push(gaps[j] - (selected.has(j) ? 1 : 0));
  }
  word.push(U + 2);

  const {C, N: total} = carryOf(word);
  assert(total === N, "the one-drop word changed the total exponent");
  const K = (C + D) / 2n;
  const common = gcd(C, D);
  const denominator = D / common;

  const Aheight = 1n << BigInt(U + 1);
  const endpoint = Array(r).fill(0n);
  endpoint[0] = 3n * (Aheight - 1n);
  for (const j of eligible) {
    if (selected.has(j)) continue;
    const residue = (j * N) % r;
    endpoint[r - residue] =
      1n << BigInt(U + 1 - heights[j]);
  }
  return {r, N, P, D, gaps, eligible, U, heights, word, C, K,
    common, denominator, Aheight, endpoint};
}

// The exact norm false positive from the report.
const witness = oneDrop(8, [1, 4, 6]);
assert(witness.N === 13, "wrong witness N");
assert(witness.D === 1631n, "wrong witness D");
assert(witness.U === 3, "wrong witness U");
assert(witness.word.join(",") === "1,1,1,2,1,1,1,5",
  "wrong witness word");
assert(witness.C === 7345n, "wrong witness carry");
assert(witness.K === 4488n, "wrong witness bottom numerator");
assert(witness.common === 1n && witness.denominator === witness.D,
  "the witness class is not a unit");
assert(witness.endpoint.join(",") === "45,8,0,0,0,0,0,0",
  "wrong endpoint polynomial");

// The displayed anchor is strict least in the exact rational orbit.
let stateNumerator = witness.C;
const stateNumerators = [stateNumerator];
for (const exponent of witness.word) {
  const nextNumerator = 3n * stateNumerator + witness.D;
  const divisor = 1n << BigInt(exponent);
  assert(nextNumerator % divisor === 0n,
    "the rational state recurrence is not integral after clearing D");
  stateNumerator = nextNumerator / divisor;
  stateNumerators.push(stateNumerator);
}
assert(stateNumerators[stateNumerators.length - 1] === witness.C,
  "the rational witness did not close");
assert(stateNumerators.slice(1, -1).every(value => value > witness.C),
  "the rational witness is not strict least at the displayed anchor");

// Direct monodromy multiplication and its profile-blind characteristic data.
const monodromyWitness = monodromy(witness.word);
assert(monodromyWitness[0][0] === witness.P,
  "wrong first monodromy eigenvalue");
assert(monodromyWitness[0][1] === witness.C,
  "wrong monodromy carry");
assert(monodromyWitness[1][0] === 0n &&
  monodromyWitness[1][1] === (1n << BigInt(witness.N)),
  "wrong second monodromy eigenvalue");

for (let k = 1; k <= 12; ++k) {
  const power = matrixPower2(monodromyWitness, k);
  assert(power[0][0] + power[1][1] ===
    pow(3n, witness.r * k) + (1n << BigInt(witness.N * k)),
    "a power trace depends on the carry");
  assert(power[0][0] * power[1][1] ===
    pow(3n, witness.r * k) * (1n << BigInt(witness.N * k)),
    "a power determinant depends on the carry");
}

// The primitive eigenvectors have determinant equal to the reduced
// denominator.  For the witness they are (1,0) and (C,D).
const primitiveSecond = [
  witness.C / witness.common,
  witness.D / witness.common
];
const eigenlatticeIndex = abs(primitiveSecond[1]);
assert(eigenlatticeIndex === witness.denominator,
  "wrong primitive eigenlattice index");
assert(witness.D * primitiveSecond[0] ===
  witness.C * primitiveSecond[1], "wrong second eigendirection");

// Exact normalized-trace identity.  Xi has constant coefficient
// [2 A K - (A-1)D]/D.
const traceNumerator = BigInt(witness.r) *
  (2n * witness.Aheight * witness.K -
    (witness.Aheight - 1n) * witness.D);
assert(traceNumerator % witness.D !== 0n,
  "ordinary trace unexpectedly became integral in the witness");
assert(gcd(2n * witness.Aheight, witness.D) === 1n,
  "the normalized trace multiplier is not a unit modulo D");

// Norm(45+8 theta) for theta^8=2.
const endpointNorm = pow(45n, 8) - 2n * pow(8n, 8);
assert(endpointNorm === 16815091836193n, "wrong endpoint norm");
assert(endpointNorm % witness.D === 0n,
  "the endpoint norm is not divisible by D");
assert(endpointNorm / witness.D === 10309682303n,
  "wrong endpoint norm quotient");
assert(gcd(witness.K, witness.D) === 1n,
  "the norm example is not a false positive");

// A second profile with the same (r,N) verifies that trace and determinant
// remain fixed while the extension class changes.
const comparison = oneDrop(8, [1, 4]);
const monodromyComparison = monodromy(comparison.word);
assert(comparison.C !== witness.C, "the comparison class did not change");
assert(monodromyComparison[0][0] === monodromyWitness[0][0] &&
  monodromyComparison[1][1] === monodromyWitness[1][1],
  "fixed clock eigenvalues changed across profiles");
assert(monodromyComparison[0][0] + monodromyComparison[1][1] ===
  monodromyWitness[0][0] + monodromyWitness[1][1],
  "trace changed across profiles");
assert(monodromyComparison[0][0] * monodromyComparison[1][1] ===
  monodromyWitness[0][0] * monodromyWitness[1][1],
  "determinant changed across profiles");

console.log("witness_r=8");
console.log("witness_N=13");
console.log("witness_U=3");
console.log("witness_word=" + witness.word.join(","));
console.log("witness_D=" + witness.D);
console.log("witness_C=" + witness.C);
console.log("witness_K=" + witness.K);
console.log("witness_gcd_D_K=" + gcd(witness.D, witness.K));
console.log("witness_eigenlattice_index=" + eigenlatticeIndex);
console.log("endpoint_polynomial=45+8X");
console.log("endpoint_norm=" + endpointNorm);
console.log("endpoint_norm_over_D=" + endpointNorm / witness.D);
console.log("trace_and_determinant_profile_blind=true");
console.log("norm_full_D_false_positive=true");
console.log("one_drop_global_integral_conjugacy_certificate_passed=true");
