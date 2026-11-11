#!/usr/bin/env node
"use strict";

// Exact regressions for cycle_small_quotient_gate.md.
// The finite scan is evidence for the cylinder inequality, not an
// all-depth certificate of it.

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function gcd(a, b) {
  if (a < 0n) a = -a;
  if (b < 0n) b = -b;
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

function bitLength(n) {
  return n.toString(2).length;
}

function inverseMod(a, modulus) {
  let oldR = a;
  let r = modulus;
  let oldS = 1n;
  let s = 0n;
  while (r !== 0n) {
    const q = oldR / r;
    [oldR, r] = [r, oldR - q * r];
    [oldS, s] = [s, oldS - q * s];
  }
  assert(oldR === 1n, "modular inverse does not exist");
  return ((oldS % modulus) + modulus) % modulus;
}

function isPrimitive(word) {
  for (let d = 1; d < word.length; d += 1) {
    if (word.length % d !== 0) continue;
    let power = true;
    for (let i = d; i < word.length; i += 1) {
      if (word[i] !== word[i % d]) {
        power = false;
        break;
      }
    }
    if (power) return false;
  }
  return true;
}

function affine(word) {
  let C = 0n;
  let A = 0n;
  for (const a of word) {
    C = 3n * C + (1n << A);
    A += BigInt(a);
  }
  return { C, A };
}

function strictRecord(word) {
  const { A } = affine(word);
  let prefix = 0n;
  for (let i = 0; i < word.length - 1; i += 1) {
    prefix += BigInt(word[i]);
    if ((1n << (A - prefix)) <= 3n ** BigInt(word.length - i - 1)) {
      return false;
    }
  }
  return true;
}

function cylinderRepresentative(C, P, N) {
  const modulus = 1n << BigInt(N + 1);
  const inverse = inverseMod(P, modulus);
  let rho = (((1n << BigInt(N)) - C) * inverse) % modulus;
  if (rho < 0n) rho += modulus;
  assert(rho > 0n && rho % 2n === 1n, "invalid odd cylinder residue");
  return rho;
}

let totalProfiles = 0;
let primitiveProfiles = 0;
let denominatorOneProfiles = 0;
let cylinderViolations = 0;
let smallRationalWitness = null;
const expectedWord = "1.1.2.1.2.1.2.2.1.2.1.2.1.2.2.1.2.1.2.3";

for (let r = 3; r <= 20; r += 1) {
  const powersOfThree = [1n];
  for (let i = 1; i <= r; i += 1) {
    powersOfThree.push(3n * powersOfThree[i - 1]);
  }
  const P = powersOfThree[r];
  const N = bitLength(P);
  const B = [];
  for (let j = 0; j <= r; j += 1) B.push(Math.floor((j * N) / r));
  const D = (1n << BigInt(N)) - P;
  const modulus = 1n << BigInt(N + 1);

  function visit(j, height, A, C, transitions, word, heights) {
    if (j === r) {
      if (height !== 0 || A !== N) return;
      totalProfiles += 1;
      const primitive = isPrimitive(word);
      if (primitive) primitiveProfiles += 1;

      assert(strictRecord(word), "generated profile lost strict record");
      const G = gcd(C, D);
      const n = C / G;
      const q = D / G;
      if (q === 1n) denominatorOneProfiles += 1;

      const rho = cylinderRepresentative(C, P, N);
      assert((n - q * rho) % modulus === 0n,
        "denominator multiplier congruence failed");

      if (transitions > 0 && rho <= (1n << BigInt(transitions))) {
        cylinderViolations += 1;
      }

      if (primitive && word.join(".") === expectedWord &&
          4 * transitions >= r && C < (1n << BigInt(transitions)) * D) {
        const candidate = {
          r,
          N,
          transitions,
          C,
          D,
          G,
          rho,
          word: word.join("."),
          heights: heights.join(""),
        };
        smallRationalWitness = candidate;
      }
      return;
    }

    const mechanicalGap = B[j + 1] - B[j];
    for (const nextHeight of [0, 1]) {
      const a = mechanicalGap + height - nextHeight;
      if (a <= 0) continue;
      const nextA = A + a;
      if (j + 1 < r &&
          (1n << BigInt(N - nextA)) <= powersOfThree[r - j - 1]) {
        continue;
      }
      visit(
        j + 1,
        nextHeight,
        nextA,
        3n * C + (1n << BigInt(A)),
        transitions + Number(nextHeight !== height),
        word.concat(a),
        heights.concat(nextHeight),
      );
    }
  }

  visit(0, 0, 0, 0n, 0, [], [0]);
}

assert(totalProfiles === 84504, "binary profile count regression failed");
assert(primitiveProfiles === 84332, "primitive profile count regression failed");
assert(denominatorOneProfiles === 0, "unexpected denominator-one profile");
assert(cylinderViolations === 0, "finite rho > 2^T evidence failed");
assert(smallRationalWitness !== null, "small rational witness missing");

assert(smallRationalWitness.r === 20, "unexpected witness length");
assert(smallRationalWitness.N === 32, "unexpected witness exponent");
assert(smallRationalWitness.transitions === 6, "unexpected witness transition count");
assert(smallRationalWitness.word === expectedWord, "unexpected witness word");
assert(smallRationalWitness.C === 11591504489n, "witness carry mismatch");
assert(smallRationalWitness.D === 808182895n, "witness determinant mismatch");
assert(smallRationalWitness.G === 1n, "witness gcd mismatch");
assert(smallRationalWitness.rho === 2809238183n, "witness rho mismatch");

// Exact construction checks for the isolated-spike binary family.
for (const r of [5, 11, 101]) {
  const P = 3n ** BigInt(r);
  const N = bitLength(P);
  const e = N - r;
  const B = [];
  for (let j = 0; j <= r; j += 1) B.push(Math.floor((j * N) / r));
  const entries = [];
  for (let j = 1; j <= r - 1; j += 1) {
    if (B[j] - B[j - 1] === 2) entries.push(j);
  }
  assert(entries.length === e - 1, "isolated-spike entry count failed");
  const chosen = new Set(entries.filter((_, index) => index % 2 === 0));
  const heights = Array.from({ length: r + 1 }, (_, j) =>
    chosen.has(j) ? 1 : 0);
  const word = [];
  let transitions = 0;
  for (let j = 0; j < r; j += 1) {
    const gap = B[j + 1] - B[j];
    const a = gap + heights[j] - heights[j + 1];
    assert(a > 0, "isolated-spike positivity failed");
    if (heights[j] === 0 && heights[j + 1] === 1) {
      assert(gap === 2 && a === 1, "isolated-spike entry failed");
    }
    transitions += Number(heights[j] !== heights[j + 1]);
    word.push(a);
  }
  assert(transitions === 2 * Math.ceil((e - 1) / 2),
    "isolated-spike transition count failed");
  assert(strictRecord(word), "isolated-spike strict record failed");
  assert(isPrimitive(word), "prime-length isolated-spike word is imprimitive");
}

// Exact algebraic denominator checks for the ramp family (1^(r-1), e+1).
for (const r of [5, 17, 101, 250]) {
  const P = 3n ** BigInt(r);
  const N = bitLength(P);
  const e = N - r;
  const M = 1n << BigInt(N);
  const D = M - P;
  const C = P - (1n << BigInt(r));
  const G = gcd(C, D);
  assert((2n ** BigInt(e) - 1n) % G === 0n,
    "ramp family gcd divisor failed");
  assert(D / G >= D / (2n ** BigInt(e) - 1n),
    "ramp family denominator lower bound failed");
}

console.log(`binary_profiles_checked=${totalProfiles}`);
console.log(`primitive_profiles_checked=${primitiveProfiles}`);
console.log(`denominator_one_profiles=${denominatorOneProfiles}`);
console.log(`rho_le_2_to_T_violations=${cylinderViolations}`);
console.log(`small_rational_word=${smallRationalWitness.word}`);
console.log(`small_rational_T=${smallRationalWitness.transitions}`);
console.log(`small_rational_C=${smallRationalWitness.C}`);
console.log(`small_rational_D=${smallRationalWitness.D}`);
console.log(`small_rational_rho=${smallRationalWitness.rho}`);
console.log("small_quotient_gate_verified=true");
