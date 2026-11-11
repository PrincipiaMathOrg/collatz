#!/usr/bin/env node
"use strict";

/*
Exact regression for ../cycle_christoffel_integrality.md.

The finite loop is not used to prove the all-depth theorem.  It checks its
closed formula, including the Bezout-base unit congruence.  The last section
uses rigorous fixed-point logarithm intervals to show that the first Farey
mediant from continued_fraction_barrier.js survives even the exact
Christoffel extremal test.
*/

function gcd(a, b) {
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

function extendedGcd(a, b) {
  let oldR = a, r = b;
  let oldS = 1n, s = 0n;
  let oldT = 0n, t = 1n;
  while (r !== 0n) {
    const q = oldR / r;
    [oldR, r] = [r, oldR - q * r];
    [oldS, s] = [s, oldS - q * s];
    [oldT, t] = [t, oldT - q * t];
  }
  return {g: oldR, x: oldS, y: oldT};
}

function mod(a, m) {
  const x = a % m;
  return x < 0n ? x + m : x;
}

function modInverse(a, m) {
  const e = extendedGcd(mod(a, m), m);
  if (e.g !== 1n) throw new Error("inverse does not exist");
  return mod(e.x, m);
}

function modPowUnsigned(a, e, m) {
  let x = mod(a, m);
  let y = 1n;
  while (e > 0n) {
    if (e & 1n) y = (y * x) % m;
    x = (x * x) % m;
    e >>= 1n;
  }
  return y;
}

function modPowSigned(a, e, m) {
  if (e >= 0n) return modPowUnsigned(a, e, m);
  return modPowUnsigned(modInverse(a, m), -e, m);
}

function christoffelCarry(N0, r0) {
  const N = BigInt(N0);
  const r = BigInt(r0);
  let C = 0n;
  for (let j = 0n; j < r; ++j) {
    const position = (j * N) / r;
    C += (1n << position) * 3n ** (r - 1n - j);
  }
  return C;
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

function isProperPower(word) {
  for (let d = 1; d < word.length; ++d) {
    if (word.length % d !== 0) continue;
    let ok = true;
    for (let i = d; i < word.length; ++i) {
      if (word[i] !== word[i % d]) { ok = false; break; }
    }
    if (ok) return true;
  }
  return false;
}

function isStrictRecord(word) {
  const {A} = affineData(word);
  let prefix = 0n;
  for (let i = 0; i < word.length - 1; ++i) {
    prefix += BigInt(word[i]);
    if ((1n << (A - prefix)) <= 3n ** BigInt(word.length - i - 1)) {
      return false;
    }
  }
  return true;
}

let testedPairs = 0;
for (let N = 2; N <= 44; ++N) {
  for (let r = 1; r < N; ++r) {
    const bigN = BigInt(N), bigR = BigInt(r);
    if ((1n << bigN) <= 3n ** bigR) continue;
    const g = gcd(bigN, bigR);
    const p = bigN / g, q = bigR / g;
    const D = (1n << bigN) - 3n ** bigR;
    const D0 = (1n << p) - 3n ** q;
    const H = D / D0;
    const C = christoffelCarry(bigN, bigR);
    const C0 = christoffelCarry(p, q);

    if (C !== H * C0) throw new Error(`repetition formula failed at ${N},${r}`);
    if (gcd(D0, C0) !== 1n) throw new Error(`base carry is not a unit at ${N},${r}`);
    if (gcd(D, C) !== H) throw new Error(`full gcd formula failed at ${N},${r}`);

    if (D0 > 1n) {
      const bezout = extendedGcd(q, p);
      if (bezout.g !== 1n || bezout.x * q + bezout.y * p !== 1n) {
        throw new Error("Bezout construction failed");
      }
      const z = mod(
        modPowSigned(2n, bezout.x, D0) * modPowSigned(3n, bezout.y, D0),
        D0
      );
      if (modPowUnsigned(z, q, D0) !== mod(2n, D0)) {
        throw new Error(`z^q != 2 at ${N},${r}`);
      }
      if (modPowUnsigned(z, p, D0) !== mod(3n, D0)) {
        throw new Error(`z^p != 3 at ${N},${r}`);
      }
      const lhs = mod(2n * (z - 1n) * mod(C0, D0), D0);
      const rhs = modPowUnsigned(z, p * (q - 1n) + 1n, D0);
      if (lhs !== rhs) throw new Error(`unit congruence failed at ${N},${r}`);
    }
    ++testedPairs;
  }
}

// Primitive strict-record g=2 countermodel.  It passes the base factor and
// fails exactly the complementary factor.
const word = [1, 2, 1, 2, 1, 3];
const data = affineData(word);
const rWord = BigInt(word.length);
const D = (1n << data.A) - 3n ** rWord;
const gWord = gcd(data.A, rWord);
const p = data.A / gWord;
const q = rWord / gWord;
const D0 = (1n << p) - 3n ** q;
const H = (1n << p) + 3n ** q;
const block0 = affineData(word.slice(0, 3));
const block1 = affineData(word.slice(3));
const deficit = p - block0.A;
const plusGate = (1n << deficit) * block0.carry + block1.carry;
const minusGate = (1n << deficit) * block0.carry - block1.carry;

if (data.A !== 10n || D !== 295n ||
    (1n << data.A) >= 2n * 3n ** rWord ||
    D0 !== 5n || H !== 59n ||
    data.carry !== 1085n || gcd(D, data.carry) !== D0 ||
    isProperPower(word) || !isStrictRecord(word) ||
    block0.carry !== 23n || block1.carry !== 29n || deficit !== 1n ||
    plusGate !== 75n || plusGate % D0 !== 0n ||
    minusGate !== 17n || minusGate % H === 0n) {
  throw new Error("primitive gcd-two countermodel regression failed");
}

let numerator = data.carry / D0;
const denominator = D / D0;
const states = [numerator];
for (const a of word) {
  const value = 3n * numerator + denominator;
  if (value % (1n << BigInt(a)) !== 0n ||
      value % (1n << BigInt(a + 1)) === 0n) {
    throw new Error("countermodel valuation failed");
  }
  numerator = value >> BigInt(a);
  states.push(numerator);
}
if (numerator !== states[0] || states.slice(0, -1).some(x => x < states[0])) {
  throw new Error("countermodel is not a least-start rational cycle");
}

// Rigorous logarithm intervals for the first Farey mediant.
const DIGITS = 120n;
const SCALE = 10n ** DIGITS;
const TERMS = 700;
const MINIMUM = 1n << 71n;

function ceilDiv(a, b) {
  return (a + b - 1n) / b;
}

function atanhLogInterval(num0, den0) {
  const num = BigInt(num0), den = BigInt(den0);
  let numPow = num, denPow = den, lo = 0n;
  const numSq = num * num, denSq = den * den;
  for (let j = 0; j <= TERMS; ++j) {
    lo += (2n * SCALE * numPow) / (BigInt(2 * j + 1) * denPow);
    numPow *= numSq;
    denPow *= denSq;
  }
  const exponent = BigInt(2 * TERMS + 3);
  const tail = ceilDiv(
    2n * SCALE * num ** exponent * denSq,
    exponent * den ** exponent * (denSq - numSq)
  );
  return {lo, hi: lo + BigInt(TERMS + 1) + tail};
}

const ln2 = atanhLogInterval(1, 3);
const ln3 = atanhLogInterval(1, 2);
const mediantP = 114208327604n;
const mediantQ = 72057431991n;
const lambdaLo = mediantP * ln2.lo - mediantQ * ln3.hi;
const lambdaHi = mediantP * ln2.hi - mediantQ * ln3.lo;
if (!(lambdaLo > 0n && lambdaHi < SCALE)) {
  throw new Error("bad mediant logarithm interval");
}

/*
For coprime P,Q, the fractional parts {jP/Q} permute k/Q.  Hence the
Christoffel quotient X satisfies

 X > Q(1-lambda)/(6 ln(2) lambda).

The following integer comparison uses upper endpoints for both logarithms
and proves that this lower bound still exceeds 2^71.
*/
const mediantChristoffelExceedsMinimum =
  mediantQ * (SCALE - lambdaHi) * SCALE >
  6n * MINIMUM * ln2.hi * lambdaHi;
if (!mediantChristoffelExceedsMinimum) {
  throw new Error("the first mediant should survive the Christoffel bound");
}
const mediantChristoffelLowerFloor =
  mediantQ * (SCALE - lambdaHi) * SCALE /
  (6n * ln2.hi * lambdaHi);

console.log(`christoffel_pairs_tested=${testedPairs}`);
console.log("christoffel_reduced_denominator_formula_passed=true");
console.log("bezout_unit_congruence_passed=true");
console.log(`gcd_two_countermodel_word=${word.join(".")}`);
console.log(`gcd_two_countermodel_D=${D}`);
console.log(`gcd_two_countermodel_base_factor=${D0}`);
console.log(`gcd_two_countermodel_missing_cofactor=${H}`);
console.log(`gcd_two_countermodel_carry=${data.carry}`);
console.log(`gcd_two_countermodel_states=${states.slice(0, -1).join(",")}/${denominator}`);
console.log(`half_split_plus_gate=${plusGate}`);
console.log(`half_split_minus_gate=${minusGate}`);
console.log(`first_mediant=${mediantP}/${mediantQ}`);
console.log(`mediant_christoffel_quotient_lower_floor=${mediantChristoffelLowerFloor}`);
console.log(`mediant_christoffel_quotient_gt_${MINIMUM}=${mediantChristoffelExceedsMinimum}`);
console.log("christoffel_q1_audit_passed=true");
