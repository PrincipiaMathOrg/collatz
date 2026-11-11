#!/usr/bin/env node
"use strict";

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function abs(a) {
  return a < 0n ? -a : a;
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

function determinantBareiss(matrix) {
  const A = matrix.map(row => row.slice());
  const n = A.length;
  let sign = 1n;
  let previous = 1n;
  for (let k = 0; k < n - 1; ++k) {
    if (A[k][k] === 0n) {
      let pivotRow = k + 1;
      while (pivotRow < n && A[pivotRow][k] === 0n) ++pivotRow;
      if (pivotRow === n) return 0n;
      [A[k], A[pivotRow]] = [A[pivotRow], A[k]];
      sign = -sign;
    }
    const pivot = A[k][k];
    for (let i = k + 1; i < n; ++i) {
      for (let j = k + 1; j < n; ++j) {
        const numerator = A[i][j] * pivot - A[i][k] * A[k][j];
        assert(numerator % previous === 0n, "Bareiss division failed");
        A[i][j] = numerator / previous;
      }
    }
    previous = pivot;
  }
  return sign * A[n - 1][n - 1];
}

const r = 59;
const N = 94;
const support = [
  2, 6, 8, 9, 11, 14, 17, 19, 20, 22, 23, 24,
  26, 27, 31, 32, 34, 37, 41, 43, 49, 54, 55, 57
];
const supportSet = new Set(support);
const cStar = Math.max(...support);

function zero() {
  return Array(r).fill(0n);
}

// Canonical arithmetic in Z[theta], with theta^r = 2.
function addLaurentTerm(a, coefficient, exponent) {
  while (exponent < 0) {
    assert(coefficient % 2n === 0n, "negative power did not have its clearing factor");
    coefficient /= 2n;
    exponent += r;
  }
  while (exponent >= r) {
    coefficient *= 2n;
    exponent -= r;
  }
  a[exponent] += coefficient;
}

function multiply(a, b) {
  const product = zero();
  for (let i = 0; i < r; ++i) {
    if (a[i] === 0n) continue;
    for (let j = 0; j < r; ++j) {
      if (b[j] === 0n) continue;
      let coefficient = a[i] * b[j];
      let exponent = i + j;
      if (exponent >= r) {
        coefficient *= 2n;
        exponent -= r;
      }
      product[exponent] += coefficient;
    }
  }
  return product;
}

function scalarMultiply(a, scalar) {
  return a.map(value => scalar * value);
}

function equal(a, b) {
  return a.every((value, index) => value === b[index]);
}

function multiplicationMatrix(a) {
  const M = Array.from({length: r}, () => Array(r).fill(0n));
  for (let column = 0; column < r; ++column) {
    for (let exponent = 0; exponent < r; ++exponent) {
      let target = exponent + column;
      let coefficient = a[exponent];
      if (target >= r) {
        target -= r;
        coefficient *= 2n;
      }
      M[target][column] += coefficient;
    }
  }
  return M;
}

function norm(a) {
  return determinantBareiss(multiplicationMatrix(a));
}

function normForDegree(a) {
  const degree = a.length;
  const M = Array.from({length: degree}, () => Array(degree).fill(0n));
  for (let column = 0; column < degree; ++column) {
    for (let exponent = 0; exponent < degree; ++exponent) {
      let target = exponent + column;
      let coefficient = a[exponent];
      if (target >= degree) {
        target -= degree;
        coefficient *= 2n;
      }
      M[target][column] += coefficient;
    }
  }
  return determinantBareiss(M);
}

function carryOf(word) {
  let C = 0n;
  let A = 0;
  for (const a of word) {
    C = 3n * C + (1n << BigInt(A));
    A += a;
  }
  return {C, A};
}

function isPrimitive(word) {
  for (let period = 1; period < word.length; ++period) {
    if (word.length % period !== 0) continue;
    if (word.every((a, j) => a === word[j % period])) return false;
  }
  return true;
}

function isStrictRecord(word) {
  const total = word.reduce((sum, a) => sum + a, 0);
  let prefix = 0;
  for (let j = 1; j < word.length; ++j) {
    prefix += word[j - 1];
    if ((1n << BigInt(total - prefix)) <= pow(3n, word.length - j)) return false;
  }
  return true;
}

function isStrictLeastRational(word, C, D) {
  let state = C;
  for (let j = 0; j < word.length; ++j) {
    const numerator = 3n * state + D;
    const divisor = 1n << BigInt(word[j]);
    if (numerator % divisor !== 0n) return false;
    state = numerator / divisor;
    if (j + 1 < word.length && state <= C) return false;
  }
  return state === C;
}

const Bprefix = Array.from({length: r + 1}, (_, j) => Math.floor(j * N / r));
const residues = Array.from({length: r}, (_, j) => (j * N) % r);
const heights = residues.map(c => supportSet.has(c) ? 1 : 0);
const word = Array.from({length: r}, (_, j) =>
  Bprefix[j + 1] - Bprefix[j] + heights[j] - heights[(j + 1) % r]);
assert(word.every(a => a >= 1), "the witness is not a positive accelerated word");
assert(word.reduce((sum, a) => sum + a, 0) === N, "wrong exponent sum");

const D = (1n << BigInt(N)) - pow(3n, r);
const stateNumerators = [];
let stateNumerator = 189239112907578841335971743427n;
for (let j = 0; j < r; ++j) {
  stateNumerators.push(stateNumerator);
  const numerator = 3n * stateNumerator + D;
  const divisor = 1n << BigInt(word[j]);
  assert(numerator % divisor === 0n, "state recurrence was not exact");
  stateNumerator = numerator / divisor;
}
assert(stateNumerator === stateNumerators[0], "the rational orbit did not close");

const H = zero();
for (const c of support) {
  H[cStar - c] -= 1n;
  H[cStar + 1 - c] += 1n;
}
H[cStar + 1] -= 1n;
assert(H[0] === -1n, "wrong endpoint polynomial");

const delta = zero();
delta[0] = -3n;
delta[N - r] = 2n;

// The geometric cofactor proves delta * Delta = D inside Z[theta].
const Delta = zero();
for (let ell = 0; ell < r; ++ell) {
  addLaurentTerm(Delta, pow(3n, ell), N * (r - 1 - ell));
}
const scalarD = zero();
scalarD[0] = D;
assert(equal(multiply(delta, Delta), scalarD), "delta cofactor identity failed");

// Formula (11) constructs Omega from all numerator states.  Here q=D.
const Omega = zero();
for (let j = 0; j < r; ++j) {
  const m = heights[j];
  const c = residues[j];
  const coefficient = -(1n << BigInt(1 - m)) * stateNumerators[j];
  addLaurentTerm(Omega, coefficient, cStar + 1 - c);
  addLaurentTerm(Omega, -coefficient, cStar - c);
}

const qH = scalarMultiply(H, D);
assert(equal(multiply(delta, Omega), qH), "delta * Omega != q * H");

const expectedR = 23281735951464258499426253587550606011986727n;
const signedNormDelta = norm(delta);
const signedNormH = norm(H);
const signedNormOmega = norm(Omega);
const normDelta = abs(signedNormDelta);
const normH = abs(signedNormH);
const normOmega = abs(signedNormOmega);
assert(normDelta === D, "Norm(delta) != D");
assert(normH === expectedR, "Norm(H) != resultant");
assert(normOmega * D === pow(D, r) * expectedR,
  "Norm(Omega) != q^r * resultant / D");

// A floating-point sanity check of the wide, rigorous real-conjugate bounds.
const rho = Math.pow(2, 1 / r);
const lambda = Math.log(Number((1n << BigInt(N))) / Number(pow(3n, r)));
const J = Math.expm1(lambda) / Math.expm1(lambda / r);
let weighted = 0;
let unweighted = 0;
for (let j = 0; j < r; ++j) {
  const t = Math.pow(2, Bprefix[j] - heights[j]) / Math.pow(3, j);
  unweighted += t;
  weighted += t * Math.exp(-j * lambda / r);
}
const eta = weighted / unweighted;
const n0 = Number(stateNumerators[0]);
const realOmega = 2 * n0 * Math.pow(rho, cStar) * (rho - 1) * J * eta;
assert(realOmega > 2 * n0 / 3 && realOmega < 8 * n0,
  "positive conjugate escaped its absolute bounds");

// The local closure C = 0 (mod p) does not determine the quotient residue.
const localWord1 = [1, 2, 1, 1, 3];
const localWord2 = [1, 1, 1, 3, 2];
const localD = (1n << 8n) - pow(3n, 5);
const local1 = carryOf(localWord1);
const local2 = carryOf(localWord2);
assert(localD === 13n && local1.C === 287n && local2.C === 259n,
  "wrong local carry data");
assert(local1.A === 8 && local2.A === 8 &&
  isPrimitive(localWord1) && isPrimitive(localWord2) &&
  isStrictRecord(localWord1) && isStrictRecord(localWord2),
  "local words missed a primitive strict-record condition");
assert(isStrictLeastRational(localWord1, local1.C, localD) &&
  isStrictLeastRational(localWord2, local2.C, localD),
  "local rational anchors were not strict least");
const localH1 = [-1n, 1n, 0n, -1n, 0n];
const localH2 = [-3n, 1n, 0n, -1n, 1n];
const localR1 = normForDegree(localH1);
const localR2 = normForDegree(localH2);
assert(localR1 === -37n && localR2 === -53n, "wrong local resultants");
assert(local1.C % 7n === 0n && local2.C % 7n === 0n && localD % 7n === 6n,
  "wrong local closure residues");
assert(((localR1 % 7n + 7n) % 7n) * 6n % 7n === 2n &&
  ((localR2 % 7n + 7n) % 7n) * 6n % 7n === 4n,
  "local quotient residues did not separate");

const R0 = 4708365355653563911081866377359552639044012876572741956888992577677170101967645821582276774074740448260858568939770910008307867657574825679517635063n;
const quotientFloor = R0 / pow(3n, 256);
assert(quotientFloor === 33871072407016426308205564n,
  "wrong scalable exponential base");

console.log("r=" + r);
console.log("N=" + N);
console.log("reduced_denominator_q=" + D);
console.log("norm_delta=" + normDelta);
console.log("norm_H=" + normH);
console.log("norm_signs=" + [signedNormDelta < 0n ? -1 : 1,
  signedNormH < 0n ? -1 : 1, signedNormOmega < 0n ? -1 : 1].join(","));
console.log("norm_Omega_digits=" + normOmega.toString().length);
console.log("delta_times_Omega_equals_qH=true");
console.log("norm_Omega_equals_q_pow_r_R_over_D=true");
console.log("positive_conjugate_over_n0=" + (realOmega / n0).toPrecision(16));
console.log("local_q_residues_mod_7=2,4");
console.log("scalable_R0_over_3_pow_256_floor=" + quotientFloor);
console.log("binary_resultant_quotient_certificate_passed=true");
