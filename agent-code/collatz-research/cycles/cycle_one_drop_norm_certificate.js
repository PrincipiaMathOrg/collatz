#!/usr/bin/env node
"use strict";

// Exact regression certificate for the one-drop endpoint quotient.
// All arithmetic below is BigInt arithmetic in Z[theta], theta^r = 2.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function abs(a) {
  return a < 0n ? -a : a;
}

function gcd(a, b) {
  while (b !== 0n) [a, b] = [b, a % b];
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

function bitLength(n) {
  return n.toString(2).length;
}

function carryOf(word) {
  let C = 0n;
  let A = 0;
  for (const exponent of word) {
    C = 3n * C + (1n << BigInt(A));
    A += exponent;
  }
  return {C, A};
}

function isPrimitive(word) {
  for (let period = 1; period < word.length; ++period) {
    if (word.length % period !== 0) continue;
    if (word.every((value, j) => value === word[j % period])) return false;
  }
  return true;
}

function isStrictRecord(word, N) {
  let prefix = 0;
  const r = word.length;
  for (let j = 0; j < r; ++j) {
    if ((1n << BigInt(N - prefix)) <= pow(3n, r - j)) return false;
    prefix += word[j];
  }
  return prefix === N;
}

function zero(r) {
  return Array(r).fill(0n);
}

function multiply(a, b) {
  const r = a.length;
  assert(b.length === r, "ring degree mismatch");
  const product = zero(r);
  for (let i = 0; i < r; ++i) {
    if (a[i] === 0n) continue;
    for (let j = 0; j < r; ++j) {
      if (b[j] === 0n) continue;
      let exponent = i + j;
      let coefficient = a[i] * b[j];
      if (exponent >= r) {
        exponent -= r;
        coefficient *= 2n;
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
  return a.length === b.length &&
    a.every((value, index) => value === b[index]);
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

function norm(a) {
  const r = a.length;
  const matrix = Array.from({length: r}, () => zero(r));
  for (let column = 0; column < r; ++column) {
    for (let exponent = 0; exponent < r; ++exponent) {
      let target = exponent + column;
      let coefficient = a[exponent];
      if (target >= r) {
        target -= r;
        coefficient *= 2n;
      }
      matrix[target][column] += coefficient;
    }
  }
  return determinantBareiss(matrix);
}

function oneDropProfile(r, selectedArray) {
  const P = pow(3n, r);
  const N = bitLength(P - 1n);
  const M = 1n << BigInt(N);
  const D = M - P;
  assert(gcd(BigInt(N), BigInt(r)) === 1n, "N and r are not coprime");

  const Bprefix = Array.from({length: r + 1}, (_, j) =>
    Math.floor(j * N / r));
  const gaps = Array.from({length: r}, (_, j) =>
    Bprefix[j + 1] - Bprefix[j]);
  assert(gaps.every(gap => gap === 1 || gap === 2),
    "the mechanical word is not binary");
  assert(gaps[r - 1] === 2, "the terminal mechanical gap is not two");

  const eligible = [];
  for (let j = 0; j < r - 1; ++j) {
    if (gaps[j] === 2) eligible.push(j);
  }
  const selected = new Set(selectedArray);
  assert(selected.size === selectedArray.length, "repeated selected index");
  for (const j of selected) {
    assert(eligible.includes(j), "a selected rise is not a preterminal two-gap");
  }
  const U = selected.size;
  assert(U > 0, "the profile has no upward transition");

  const heights = [];
  let height = 0;
  for (let j = 0; j < r; ++j) {
    heights.push(height);
    if (selected.has(j)) ++height;
  }
  assert(heights[0] === 0 && heights[r - 1] === U,
    "wrong one-drop height endpoints");
  for (let j = 0; j < r - 1; ++j) {
    assert(heights[j + 1] - heights[j] === (selected.has(j) ? 1 : 0),
      "wrong preterminal height increment");
  }

  const word = [];
  for (let j = 0; j < r - 1; ++j) {
    word.push(gaps[j] + heights[j] - heights[j + 1]);
  }
  word.push(gaps[r - 1] + heights[r - 1]);
  assert(word.every(exponent => exponent >= 1), "nonpositive word letter");
  assert(word[r - 1] === U + 2, "wrong terminal discharge");
  assert(word.reduce((sum, exponent) => sum + exponent, 0) === N,
    "the total exponent changed");
  assert(isPrimitive(word), "the one-drop word is not primitive");
  assert(isStrictRecord(word, N), "the one-drop word is not strict-record");

  const J = eligible.filter(j => !selected.has(j));
  const residues = Array.from({length: r}, (_, j) => (j * N) % r);
  assert(new Set(residues).size === r, "residues do not permute the basis");

  const carry = carryOf(word);
  assert(carry.A === N, "wrong carry exponent");
  const common = gcd(carry.C, D);
  const q = D / common;
  const states = [];
  let numerator = carry.C / common;
  for (let j = 0; j < r; ++j) {
    states.push(numerator);
    const next = 3n * numerator + q;
    const divisor = 1n << BigInt(word[j]);
    assert(next % divisor === 0n, "the rational state recurrence is not exact");
    numerator = next / divisor;
  }
  assert(numerator === states[0], "the rational orbit did not close");
  assert(states.slice(1).every(value => value > states[0]),
    "the displayed rational state is not strict least");

  const A = 1n << BigInt(U + 1);
  const K = zero(r);
  K[0] = 3n * (A - 1n);
  for (const j of J) {
    const exponent = r - residues[j];
    K[exponent] = 1n << BigInt(U + 1 - heights[j]);
  }

  // q Xi has the positive canonical coefficients from the theorem.
  const XiQ = zero(r);
  XiQ[0] = A * states[0] + q;
  for (let j = 1; j < r; ++j) {
    const exponent = r - residues[j];
    XiQ[exponent] =
      (1n << BigInt(U - heights[j])) * (states[j] + q);
  }
  assert(XiQ.every(value => value > 0n),
    "a canonical quotient coefficient is not positive");

  const delta = zero(r);
  delta[0] = -3n;
  delta[N - r] = 2n;
  assert(equal(multiply(delta, XiQ), scalarMultiply(K, q)),
    "delta times qXi is not qK");

  // Coordinate form of (2 T_{N-r} - 3 I) XiQ = q K.
  const d = N - r;
  for (let exponent = 0; exponent < r; ++exponent) {
    const predecessor = exponent >= d ? exponent - d : exponent - d + r;
    const shiftWeight = exponent >= d ? 2n : 4n;
    assert(shiftWeight * XiQ[predecessor] - 3n * XiQ[exponent] ===
      q * K[exponent], "coordinate recurrence failed");
  }

  // Exact product identity, with x_j = states[j] / q.
  let productNumerator = A * states[0] + q + q * (A - 1n);
  let productDenominator = A * states[0] + q;
  for (const j of J) {
    productNumerator *= 3n * (states[j] + q) + 2n * q;
    productDenominator *= 3n * (states[j] + q);
  }
  assert(productNumerator * P === productDenominator * M,
    "the exact coordinate product identity failed");

  return {r, N, P, M, D, U, J, heights, word, q, states, K, XiQ, delta};
}

// This all-selected profile has r-1 consecutive zero-support coordinates.
// It is a primitive, coprime, strict-least rational one-drop orbit, but q>1.
const witness = oneDropProfile(8, [1, 3, 4, 6]);
assert(witness.word.join(",") === "1,1,1,1,1,1,1,6", "wrong witness word");
assert(witness.U === 4 && witness.J.length === 0, "wrong witness support");
assert(witness.D === 1631n && witness.q === 1631n, "wrong witness denominator");
assert(witness.states.join(",") ===
  "6305,10273,16225,25153,38545,58633,88765,133963",
  "wrong witness state vector");
assert(witness.K.join(",") === "93,0,0,0,0,0,0,0", "wrong witness K");
assert(witness.XiQ.join(",") ===
  "203391,214272,180792,190464,160704,135594,142848,120528",
  "wrong witness quotient vector");
assert(witness.states[0] < witness.q * (1n << BigInt(witness.U)),
  "the rational witness does not have x < 2^U");

const signedNormDelta = norm(witness.delta);
const signedNormK = norm(witness.K);
const signedNormXiQ = norm(witness.XiQ);
assert(abs(signedNormDelta) === witness.D, "wrong determinant norm");
assert(abs(signedNormXiQ) * witness.D ===
  pow(witness.q, witness.r) * abs(signedNormK), "wrong norm quotient identity");
assert(signedNormDelta < 0n && signedNormK > 0n && signedNormXiQ < 0n,
  "wrong signed norms for the rational witness");
assert(abs(signedNormXiQ) % 2n === 1n, "the quotient norm is not odd");

// A mixed profile checks every sparse term in addition to the endpoint term.
const mixed = oneDropProfile(8, [1, 4]);
assert(mixed.word.join(",") === "1,1,1,2,1,1,2,4", "wrong mixed word");
assert(mixed.J.join(",") === "3,6", "wrong mixed exceptional set");

console.log("witness_r=" + witness.r);
console.log("witness_N=" + witness.N);
console.log("witness_U=" + witness.U);
console.log("witness_q=" + witness.q);
console.log("witness_x=" + witness.states[0] + "/" + witness.q);
console.log("witness_word=" + witness.word.join(","));
console.log("witness_K=" + witness.K.join(","));
console.log("witness_qXi=" + witness.XiQ.join(","));
console.log("witness_norm_signs=-,+,-");
console.log("witness_zero_support_coordinates=" +
  witness.K.filter(value => value === 0n).length);
console.log("witness_x_lt_2_pow_U=true");
console.log("mixed_word=" + mixed.word.join(","));
console.log("mixed_J=" + mixed.J.join(","));
console.log("all_quotient_coefficients_positive=true");
console.log("coordinate_product_identity=true");
console.log("cycle_one_drop_norm_certificate_passed=true");
