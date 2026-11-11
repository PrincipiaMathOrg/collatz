#!/usr/bin/env node
"use strict";

// Exact finite regression for the one-cell {0,1} deformation theorem.

function identity(n) {
  return Array.from({length: n}, (_, i) =>
    Array.from({length: n}, (_, j) => i === j ? 1n : 0n));
}

function multiply(A, B) {
  const n = A.length;
  const C = Array.from({length: n}, () => Array(n).fill(0n));
  for (let i = 0; i < n; ++i) {
    for (let k = 0; k < n; ++k) {
      if (A[i][k] === 0n) continue;
      for (let j = 0; j < n; ++j) C[i][j] += A[i][k] * B[k][j];
    }
  }
  return C;
}

function power(A, e) {
  let X = A, Y = identity(A.length);
  while (e > 0) {
    if (e & 1) Y = multiply(Y, X);
    X = multiply(X, X);
    e >>= 1;
  }
  return Y;
}

function determinantBareiss(A0) {
  const A = A0.map(row => row.slice());
  const n = A.length;
  if (n === 0) return 1n;
  let sign = 1n, previous = 1n;
  for (let k = 0; k < n - 1; ++k) {
    if (A[k][k] === 0n) {
      let pivot = k + 1;
      while (pivot < n && A[pivot][k] === 0n) ++pivot;
      if (pivot === n) return 0n;
      [A[k], A[pivot]] = [A[pivot], A[k]];
      sign = -sign;
    }
    const pivot = A[k][k];
    for (let i = k + 1; i < n; ++i) {
      for (let j = k + 1; j < n; ++j) {
        const numerator = A[i][j] * pivot - A[i][k] * A[k][j];
        if (numerator % previous !== 0n) throw new Error("Bareiss division failed");
        A[i][j] = numerator / previous;
      }
    }
    previous = pivot;
  }
  return sign * A[n - 1][n - 1];
}

function resultant(r, k) {
  if (k === 1) return 1n;
  const Z = Array.from({length: r}, () => Array(r).fill(0n));
  for (let j = 0; j < r - 1; ++j) Z[j + 1][j] = 1n;
  Z[0][r - 1] = 2n;
  const Zk = power(Z, k);
  const I = identity(r);
  const G = Array.from({length: r}, (_, i) =>
    Array.from({length: r}, (_, j) => Zk[i][j] - Z[i][j] + I[i][j]));
  let d = determinantBareiss(G);
  return d < 0n ? -d : d;
}

const maxR = Number(process.argv[2] || 40);
let resultantsChecked = 0;
let finiteSizeChecks = 0;
for (let r = 2; r <= maxR; ++r) {
  const N = Math.ceil(Math.log2(3) * r - 1e-12);
  const B = N - r;
  const D = (1n << BigInt(N)) - 3n ** BigInt(r);
  for (let k = 1; k <= B; ++k) {
    const R = resultant(r, k);
    if (R === 0n) throw new Error("unexpected zero resultant");
    if (k >= 2 && k < r) {
      const hadamardSquare =
        3n ** BigInt(r - k - 1) * 6n ** BigInt(k + 1);
      if (R * R > hadamardSquare) {
        throw new Error("Hadamard bound failed at r=" + r + ",k=" + k);
      }
    }
    if (r >= 6) {
      if (R >= D) throw new Error("finite size check failed");
      ++finiteSizeChecks;
    }
    ++resultantsChecked;
  }
}

if (resultant(8, 2) !== 7n) {
  throw new Error("singleton proper-factor resultant regression failed");
}
const periodBarrier = 72057431991n;
if (periodBarrier <= 3n ** 16n) {
  throw new Error("coarse analytic threshold check failed");
}

console.log("resultants_checked=" + resultantsChecked);
console.log("finite_size_checks=" + finiteSizeChecks);
console.log("singleton_r8_k2_resultant=7");
console.log("period_barrier_gt_3_pow_16=true");
console.log("singleton_resultant_certificate_passed=true");
