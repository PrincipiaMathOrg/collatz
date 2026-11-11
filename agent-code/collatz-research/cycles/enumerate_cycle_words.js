#!/usr/bin/env node
"use strict";

/*
Enumerate strict-record accelerated cycle words at small length.  This is a
falsification harness, not a proof by exhaustion.  It checks the affine
cycle equation, exact valuations, proper-power status, and the denominator
of the associated positive rational periodic point.
*/

const maxR = Number(process.argv[2] || 17);
const alpha = Math.log2(3);

function gcd(a, b) {
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

function affineData(word) {
  let carry = 0n;
  let A = 0n;
  for (const a of word) {
    carry = 3n * carry + (1n << A);
    A += BigInt(a);
  }
  return {carry, A};
}

function v2(n) {
  let a = 0;
  while (n !== 0n && n % 2n === 0n) {
    n /= 2n;
    ++a;
  }
  return [a, n];
}

function isProperPower(word) {
  const r = word.length;
  for (let d = 1; d < r; ++d) {
    if (r % d !== 0) continue;
    let ok = true;
    for (let i = d; i < r; ++i) {
      if (word[i] !== word[i % d]) { ok = false; break; }
    }
    if (ok) return true;
  }
  return false;
}

function isStrictRecord(word) {
  const {A} = affineData(word);
  const r = word.length;
  let prefix = 0n;
  for (let i = 0; i < r - 1; ++i) {
    prefix += BigInt(word[i]);
    if ((1n << (A - prefix)) <= 3n ** BigInt(r - i - 1)) return false;
  }
  return true;
}

function isOneStrip(word) {
  const {A} = affineData(word);
  const power3 = 3n ** BigInt(word.length);
  const power2 = 1n << A;
  return power3 < power2 && power2 < 2n * power3;
}

function exactIntegerCycle(word) {
  const {carry, A} = affineData(word);
  const D = (1n << A) - 3n ** BigInt(word.length);
  if (D <= 0n || carry % D !== 0n) return null;
  const x0 = carry / D;
  if (x0 <= 0n || x0 % 2n === 0n) return null;
  let x = x0;
  for (const a of word) {
    const [actual, next] = v2(3n * x + 1n);
    if (actual !== a) return null;
    x = next;
  }
  return x === x0 ? x0 : null;
}

function exactRationalCycle(word) {
  const {carry, A} = affineData(word);
  const D = (1n << A) - 3n ** BigInt(word.length);
  if (D <= 0n) return null;
  const g = gcd(carry, D);
  const denominator = D / g;
  let numerator = carry / g;
  const firstNumerator = numerator;
  let minimumNumerator = numerator;
  for (const a of word) {
    const [actual, next] = v2(3n * numerator + denominator);
    if (actual !== a) return null;
    numerator = next;
    if (numerator < minimumNumerator) minimumNumerator = numerator;
  }
  if (numerator !== firstNumerator || minimumNumerator <= 0n) return null;
  return {numerator: firstNumerator, denominator, minimumNumerator};
}

function cyclicRotations(word) {
  return word.map((_, i) => word.slice(i).concat(word.slice(0, i)));
}

console.log("r,A,D,strict_record_words,min_reduced_denominator,min_word,integer_cycles");

for (let r = 1; r <= maxR; ++r) {
  const A = Math.ceil(alpha * r - 1e-12);
  const bigA = BigInt(A);
  const D = (1n << bigA) - 3n ** BigInt(r);
  let count = 0;
  let minDenominator = D;
  let minWord = null;
  const cycles = [];

  function visit(i, sum, word) {
    if (i === r) {
      if (sum !== A) return;
      ++count;
      const {carry} = affineData(word);
      const reducedDenominator = D / gcd(D, carry);
      if (reducedDenominator < minDenominator) {
        minDenominator = reducedDenominator;
        minWord = word.slice();
      }
      const x = exactIntegerCycle(word);
      if (x !== null) cycles.push(`${word.join(".")}:${x}`);
      return;
    }

    const remainingLetters = r - i - 1;
    const largest = A - sum - remainingLetters;
    for (let a = 1; a <= largest; ++a) {
      const nextSum = sum + a;
      if (i < r - 1) {
        // eta_i < eta_r, written without logarithms.
        if ((1n << BigInt(A - nextSum)) <= 3n ** BigInt(r - i - 1)) continue;
      }
      word.push(a);
      visit(i + 1, nextSum, word);
      word.pop();
    }
  }

  visit(0, 0, []);
  console.log([
    r,
    A,
    D,
    count,
    minDenominator,
    minWord ? minWord.join(".") : "-",
    cycles.length ? cycles.join("|") : "-"
  ].join(","));
}

// Mandatory regression: every accelerated rotation/repetition of the
// trivial cycle is still the constant word 2^r and has state 1.
for (let r = 1; r <= Math.max(1, maxR); ++r) {
  const trivial = Array(r).fill(2);
  for (const rotation of cyclicRotations(trivial)) {
    const x = exactIntegerCycle(rotation);
    if (x !== 1n) throw new Error(`trivial-cycle regression failed at r=${r}`);
  }
}

// Explicit Archimedean countermodel: strict record, one strip, positive
// rational fixed point, but not an integer cycle.
const counterword = [1, 2, 1, 2, 2];
const counterdata = affineData(counterword);
const counterD = (1n << counterdata.A) - 3n ** 5n;
const countercycle = exactRationalCycle(counterword);
if (counterdata.carry !== 319n || counterD !== 13n ||
    !isStrictRecord(counterword) || !isOneStrip(counterword) ||
    countercycle === null || countercycle.denominator !== 13n ||
    countercycle.minimumNumerator !== 319n) {
  throw new Error("countermodel regression failed");
}
console.log("countermodel_word=1.2.1.2.2");
console.log("countermodel_fixed_point=319/13");
console.log("countermodel_refutes=C<3D_and_integrality_free_archimedean_exclusion");

// A primitive, positive, exact rational 3x+q cycle which also obeys the
// one-strip and strict-record conditions.  Its sole missing property is q=1.
// This is a sharp regression against any argument that silently replaces
// integer lifting by positivity plus exact local valuations.
const denominatorFiveWord = [
  1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 2, 3, 2, 1, 1, 1, 5
];
if (isProperPower(denominatorFiveWord)) {
  throw new Error("denominator-five countermodel unexpectedly a proper power");
}
if (!isStrictRecord(denominatorFiveWord) || !isOneStrip(denominatorFiveWord)) {
  throw new Error("denominator-five countermodel lost record or strip condition");
}
const denominatorFiveCycle = exactRationalCycle(denominatorFiveWord);
if (denominatorFiveCycle === null ||
    denominatorFiveCycle.numerator !== 187n ||
    denominatorFiveCycle.denominator !== 5n ||
    denominatorFiveCycle.minimumNumerator !== 187n) {
  throw new Error("denominator-five rational-cycle regression failed");
}
console.log(`primitive_rational_cycle_word=${denominatorFiveWord.join(".")}`);
console.log("primitive_rational_cycle_minimum=187/5");
console.log("primitive_rational_cycle_denominator=5");
console.log("primitive_rational_cycle_refutes=positivity_plus_exact_valuations_plus_one_strip_without_integer_lift");
console.log("trivial_cycle_rotations_passed=true");
