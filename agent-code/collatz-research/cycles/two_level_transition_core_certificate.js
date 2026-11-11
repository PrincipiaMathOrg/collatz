#!/usr/bin/env node
"use strict";

// Exact regression certificate for cycle_two_level_transition_core.md.
// The all-depth factor-complexity and cylinder arguments remain symbolic
// proofs in the report; this file checks their finite combinatorial and
// integer boundary arithmetic.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function bitLength(n) {
  return n.toString(2).length;
}

function gcd(a, b) {
  while (b !== 0) [a, b] = [b, a % b];
  return Math.abs(a);
}

function mod(a, m) {
  const value = a % m;
  return value < 0n ? value + m : value;
}

function inverse(a, m) {
  let oldR = mod(a, m);
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

function valuation2(n) {
  let value = n < 0n ? -n : n;
  let exponent = 0;
  while (value !== 0n && value % 2n === 0n) {
    value /= 2n;
    ++exponent;
  }
  return exponent;
}

function stateEnvelopeConstants() {
  // P7.2 gives x < 305 r^14.3.  For r >= 2, the two exact integer
  // envelopes used in the report follow after replacing r^14.3 by r^15.
  const r = 2n;
  assert(3n * 610n * r ** 15n + 4n * r <
    3n * 612n * r ** 15n, "general state envelope failed");
  assert(3n * 610n * r ** 15n + 2n * r <
    3n * 611n * r ** 15n, "binary state envelope failed");
}

function exactFourSupportCutoff() {
  const r = 10000n;
  const H = 611n * r ** 15n;
  assert(2n ** (r - 25n) > H ** 18n,
    "four-support cutoff base failed");
  assert(2n * r ** 270n > (r + 1n) ** 270n,
    "four-support cutoff propagation failed");
}

function runDecompositionRegression(maxR) {
  let profiles = 0;
  for (let r = 2; r <= maxR; ++r) {
    const limit = 1 << (r - 1);
    for (let tail = 0; tail < limit; ++tail) {
      const level = Array(r).fill(0);
      for (let i = 1; i < r; ++i) {
        level[i] = (tail >> (i - 1)) & 1;
      }
      let T = 0;
      for (let i = 0; i < r; ++i) {
        if (level[i] !== level[(i + 1) % r]) ++T;
      }
      if (T === 0) continue;
      ++profiles;
      assert(T % 2 === 0, "binary cyclic transition parity failed");

      const lengths = [0];
      const heights = [level[0]];
      let current = level[0];
      for (let i = 0; i < r; ++i) {
        const next = level[(i + 1) % r];
        if (next === current) {
          ++lengths[lengths.length - 1];
        } else {
          current = next;
          lengths.push(0);
          heights.push(current);
        }
      }
      assert(lengths.length === T + 1,
        "linear run count failed");
      assert(lengths.reduce((a, b) => a + b, 0) === r - T,
        "internal edge count failed");
      assert(heights[0] === 0 && heights[heights.length - 1] === 0,
        "endpoint run height failed");
      assert(heights.reduce((a, b) => a + b, 0) === T / 2,
        "height-one run count failed");
      const E = lengths.reduce((a, b) => a + Math.floor(b / 2), 0);
      assert(2 * E >= r - 2 * T - 1,
        "floor-sum lower bound failed");
    }
  }
  return profiles;
}

function generalHeightRunRegression(maxR) {
  let profiles = 0;

  function inspect(level, r) {
    let T = 0;
    for (let i = 0; i < r; ++i) {
      assert(level[i + 1] - level[i] <= 1,
        "upward height jump failed");
      if (level[i + 1] !== level[i]) ++T;
    }
    if (T === 0) return;
    ++profiles;

    const lengths = [0];
    const heights = [level[0]];
    for (let i = 0; i < r; ++i) {
      if (level[i + 1] === level[i]) {
        ++lengths[lengths.length - 1];
      } else {
        lengths.push(0);
        heights.push(level[i + 1]);
      }
    }
    assert(lengths.length === T + 1,
      "general linear run count failed");
    assert(lengths.reduce((a, b) => a + b, 0) === r - T,
      "general internal edge count failed");
    assert(heights[0] === 0 && heights[heights.length - 1] === 0,
      "general endpoint run height failed");
    assert(2 * heights.reduce((a, b) => a + b, 0) <= T * (T - 1),
      "general run-level sum failed");
    const E = lengths.reduce((a, b) => a + Math.floor(b / 2), 0);
    assert(2 * E >= r - 2 * T - 1,
      "general floor-sum lower bound failed");
  }

  for (let r = 2; r <= maxR; ++r) {
    const level = [0];
    function extend(index) {
      if (index === r) {
        if (0 - level[index - 1] <= 1) {
          level.push(0);
          inspect(level, r);
          level.pop();
        }
        return;
      }
      // Strict records give height >= -1, while successive upward jumps
      // are at most one.  The upper endpoint index is itself an exact bound.
      for (let next = -1; next <= level[index - 1] + 1; ++next) {
        level.push(next);
        extend(index + 1);
        level.pop();
      }
    }
    extend(1);
  }
  return profiles;
}

function mechanicalComplexityRegression(maxDenominator) {
  let slopes = 0;
  let factorTests = 0;
  for (let q = 2; q <= maxDenominator; ++q) {
    for (let p = 1; p < q; ++p) {
      if (gcd(p, q) !== 1) continue;
      const word = Array(q);
      for (let i = 0; i < q; ++i) {
        word[i] = 1 + Math.floor((i + 1) * p / q) -
          Math.floor(i * p / q);
        assert(word[i] === 1 || word[i] === 2,
          "mechanical alphabet failed");
      }
      ++slopes;
      for (let L = 0; L < q; ++L) {
        const factors = new Set();
        for (let start = 0; start < q; ++start) {
          let key = "";
          for (let j = 0; j < L; ++j) {
            key += word[(start + j) % q];
          }
          factors.add(key);
        }
        assert(factors.size <= L + 1,
          `mechanical complexity failed at p/q=${p}/${q}, L=${L}`);
        ++factorTests;
      }
    }
  }
  return {slopes, factorTests};
}

function cylinderModulusRegression(maxLength) {
  let words = 0;

  function inspect(word) {
    let C = 0n;
    let Q = 0;
    for (const exponent of word) {
      C = 3n * C + (1n << BigInt(Q));
      Q += exponent;
    }
    const modulus = 1n << BigInt(Q + 1);
    const target = mod((1n << BigInt(Q)) - C, modulus);
    const residue = mod(inverse(3n ** BigInt(word.length), modulus) *
      target, modulus);
    assert(residue % 2n === 1n, "cylinder residue is not odd");

    for (const seed of [residue, residue + modulus]) {
      let state = seed;
      for (const exponent of word) {
        const next = 3n * state + 1n;
        assert(valuation2(next) === exponent,
          "exact cylinder valuation failed");
        state = next >> BigInt(exponent);
        assert(state % 2n === 1n, "cylinder endpoint is not odd");
      }
    }
    ++words;
  }

  for (let length = 0; length <= maxLength; ++length) {
    const word = [];
    function extend() {
      if (word.length === length) {
        inspect(word);
        return;
      }
      for (const exponent of [1, 2]) {
        word.push(exponent);
        extend();
        word.pop();
      }
    }
    extend();
  }
  return words;
}

stateEnvelopeConstants();
exactFourSupportCutoff();
const runProfiles = runDecompositionRegression(16);
const generalProfiles = generalHeightRunRegression(9);
const mechanical = mechanicalComplexityRegression(50);
const cylinderWords = cylinderModulusRegression(8);
console.log("cutoff_base_r=10000");
console.log("general_state_envelope_constant=612");
console.log("binary_state_envelope_constant=611");
console.log("four_support_cutoff_base=true");
console.log("four_support_cutoff_propagation=true");
console.log(`binary_run_profiles=${runProfiles}`);
console.log("binary_run_decomposition=true");
console.log(`general_height_profiles=${generalProfiles}`);
console.log("general_run_level_sum=true");
console.log(`mechanical_slopes=${mechanical.slopes}`);
console.log(`mechanical_factor_tests=${mechanical.factorTests}`);
console.log("rational_mechanical_complexity=true");
console.log(`cylinder_words=${cylinderWords}`);
console.log("exact_cylinder_modulus=true");
console.log("two_level_transition_core_certificate_passed=true");
