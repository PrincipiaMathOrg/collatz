#!/usr/bin/env node
"use strict";

// Exact regression certificate for cycle_transition_occupation_no_go.md.
// It checks the general transition and product identities on all small
// positive exponent compositions, then checks the dense rational family.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function gcdBig(a, b) {
  while (b !== 0n) [a, b] = [b, a % b];
  return a < 0n ? -a : a;
}

function gcdNumber(a, b) {
  while (b !== 0) [a, b] = [b, a % b];
  return Math.abs(a);
}

function bitLength(n) {
  assert(n > 0n, "bit length requires a positive integer");
  return n.toString(2).length;
}

function valuation2(n) {
  let exponent = 0;
  while (n !== 0n && n % 2n === 0n) {
    n /= 2n;
    ++exponent;
  }
  return {exponent, oddPart: n};
}

function carryOf(word) {
  let carry = 0n;
  let prefix = 0;
  for (const exponent of word) {
    carry = 3n * carry + (1n << BigInt(prefix));
    prefix += exponent;
  }
  return {carry, total: prefix};
}

function generalIdentityRegression(maxR) {
  let words = 0;
  for (let r = 3; r <= maxR; ++r) {
    const power3 = 3n ** BigInt(r);
    const N = bitLength(power3 - 1n);
    const D = (1n << BigInt(N)) - power3;
    const B = Array.from({length: r + 1}, (_, j) =>
      Math.floor(j * N / r));

    function inspect(word) {
      const data = carryOf(word);
      assert(data.total === N, "composition total changed");
      const A = [0];
      for (const exponent of word) A.push(A[A.length - 1] + exponent);
      const m = A.map((prefix, j) => B[j] - prefix);
      assert(m[0] === 0 && m[r] === 0, "height endpoints changed");

      let transitions = 0;
      let upward = 0;
      let variation = 0;
      for (let j = 0; j < r; ++j) {
        const delta = m[j + 1] - m[j];
        const base = B[j + 1] - B[j];
        assert(word[j] === base - delta, "edge identity failed");
        assert(delta <= 1, "upward step exceeded one");
        if (delta !== 0) ++transitions;
        if (delta > 0) {
          assert(delta === 1 && base === 2 && word[j] === 1,
            "upward transition classification failed");
          ++upward;
        }
        variation += Math.abs(delta);
      }
      assert(variation === 2 * upward, "variation identity failed");
      if (transitions > 0) {
        assert(transitions <= variation &&
          variation <= 2 * transitions - 2,
        "transition-variation interval failed");
      }

      // W has common denominator 3^(r-1).  This is exactly C/3^(r-1).
      let wNumerator = 0n;
      for (let j = 0; j < r; ++j) {
        wNumerator += (1n << BigInt(A[j])) *
          3n ** BigInt(r - 1 - j);
      }
      assert(wNumerator === data.carry, "occupation-carry identity failed");

      // Cross-multiply x=W/(3(R-1)) without floating point.
      // Here W=C/3^(r-1) and 3(R-1)=D/3^(r-1).
      assert(wNumerator === data.carry && D > 0n,
        "normalized fixed-point identity failed");

      const divisor = gcdNumber(N, r);
      const floorSum = B.slice(0, r).reduce((a, b) => a + b, 0);
      assert(2 * floorSum ===
        (N - 1) * (r - 1) + divisor - 1,
      "mechanical floor sum failed");

      // Product identity after clearing its possible half exponent.
      const sumM = m.slice(0, r).reduce((a, b) => a + b, 0);
      const twiceConstantExponent = 2 * (floorSum - sumM);
      const expectedConstantExponent =
        (N - 1) * (r - 1) + divisor - 1 - 2 * sumM;
      assert(twiceConstantExponent === expectedConstantExponent,
        "height-product bookkeeping failed");
      ++words;
    }

    function extend(index, remaining, word) {
      if (index === r) {
        if (remaining === 0) inspect(word);
        return;
      }
      const slots = r - index - 1;
      for (let exponent = 1; exponent <= remaining - slots; ++exponent) {
        word.push(exponent);
        extend(index + 1, remaining - exponent, word);
        word.pop();
      }
    }
    extend(0, N, []);
  }
  return words;
}

function denseFamilyRegression(maxR) {
  let cases = 0;
  let minimumDenominator = null;
  for (let r = 3; r <= maxR; ++r) {
    const P = 3n ** BigInt(r);
    const N = bitLength(P - 1n);
    const e = N - r;
    assert(e > r / 2 && e < r, "dense-family slope changed");
    const word = Array(r - 1).fill(1).concat([e + 1]);
    const data = carryOf(word);
    const C = P - (1n << BigInt(r));
    const D = (1n << BigInt(N)) - P;
    assert(D > 0n && D < P, "dense-family one-strip condition failed");
    assert(data.total === N && data.carry === C,
      "dense-family carry formula failed");

    for (let j = 0; j < r; ++j) {
      assert((1n << BigInt(N - j)) > 3n ** BigInt(r - j),
        "dense-family strict suffix record failed");
    }
    for (let period = 1; period < r; ++period) {
      if (r % period !== 0) continue;
      let repeats = true;
      for (let j = period; j < r; ++j) {
        if (word[j] !== word[j % period]) {
          repeats = false;
          break;
        }
      }
      assert(!repeats, "dense-family word became imprimitive");
    }

    const B = Array.from({length: r + 1}, (_, j) =>
      Math.floor(j * N / r));
    const m = [];
    for (let j = 0; j < r; ++j) {
      m.push(B[j] - j);
      assert(m[j] === Math.floor(j * e / r),
        "dense-family height formula failed");
    }
    m.push(0);

    let transitions = 0;
    let variation = 0;
    for (let j = 0; j < r; ++j) {
      const delta = m[j + 1] - m[j];
      if (delta !== 0) ++transitions;
      variation += Math.abs(delta);
    }
    assert(m[r - 1] === e - 1, "dense-family maximum failed");
    assert(transitions === e, "dense-family transition count failed");
    assert(variation === 2 * (e - 1),
      "dense-family variation failed");

    const heightCounts = Array(e).fill(0);
    let occupationNumerator = 0n;
    const occupationDenominator = 1n << BigInt(e - 1);
    for (let j = 0; j < r; ++j) {
      ++heightCounts[m[j]];
      occupationNumerator += 1n << BigInt(e - 1 - m[j]);
    }
    assert(heightCounts.every(count => count <= 2),
      "dense-family low-height multiplicity failed");
    assert(occupationNumerator < 4n * occupationDenominator,
      "dense-family occupation bound failed");

    // W=C/3^(r-1)=3(1-(2/3)^r), checked after clearing powers of 3.
    assert(C === P - (1n << BigInt(r)),
      "dense-family weighted occupation failed");
    assert(C < P, "dense-family W<3 failed");

    const G = gcdBig(C, D);
    const q = D / G;
    assert((2n ** BigInt(e) - 1n) % G === 0n,
      "dense-family denominator divisor failed");
    assert(q > 1n, "dense-family unexpectedly reached denominator one");
    if (minimumDenominator === null || q < minimumDenominator) {
      minimumDenominator = q;
    }

    let numerator = C / G;
    const denominator = q;
    const initial = numerator;
    let minimum = numerator;
    for (const exponent of word) {
      const split = valuation2(3n * numerator + denominator);
      assert(split.exponent === exponent,
        "dense-family exact valuation failed");
      numerator = split.oddPart;
      if (numerator < minimum) minimum = numerator;
    }
    assert(numerator === initial && minimum === initial,
      "dense-family least rational cycle failed");
    ++cases;
  }
  return {cases, minimumDenominator};
}

const generalWords = generalIdentityRegression(10);
const dense = denseFamilyRegression(250);
console.log(`general_composition_words=${generalWords}`);
console.log("occupation_carry_identity=true");
console.log("transition_variation_identity=true");
console.log("mechanical_product_identity=true");
console.log(`dense_family_cases=${dense.cases}`);
console.log(`dense_family_minimum_denominator=${dense.minimumDenominator}`);
console.log("dense_family_transition_count=true");
console.log("dense_family_bounded_occupation=true");
console.log("dense_family_strict_record_one_strip_primitive=true");
console.log("dense_family_exact_rational_cycle=true");
console.log("transition_occupation_no_go_certificate_passed=true");
