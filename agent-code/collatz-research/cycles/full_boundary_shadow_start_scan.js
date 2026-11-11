#!/usr/bin/env node
"use strict";

// Direct falsification scan for the sufficient strict-boundary estimate
//
//     3*tau >= r.
//
// We start positive 3m-1 trajectories with first valuation one, stop at
// their first coefficient crossing, and truncate only the final even run.
// When the start lies below the crossing modulus, it is the canonical
// positive paired shadow of the complementary 3m+1 cylinder.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function bitLength(n) {
  assert(n > 0n, "bit length requires a positive integer");
  return n.toString(2).length;
}

function valuationTwo(n) {
  assert(n > 0n, "two-adic valuation requires a positive integer");
  let value = 0;
  while ((n & 1n) === 0n) {
    n >>= 1n;
    ++value;
  }
  return value;
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

const maximumStart = Number(process.argv[2] || 1000000);
const maximumDepth = Number(process.argv[3] || 512);
assert(Number.isSafeInteger(maximumStart) && maximumStart >= 5,
  "usage: full_boundary_shadow_start_scan.js MAX_START [MAX_DEPTH]");
assert(Number.isInteger(maximumDepth) && maximumDepth >= 2,
  "invalid maximum depth");

const powers3 = [1n];
const ceilings = [0];
for (let r = 1; r <= maximumDepth; ++r) {
  powers3.push(3n * powers3[r - 1]);
  ceilings.push(bitLength(powers3[r]));
}

let starts = 0;
let acceleratedSteps = 0;
let crossings = 0;
let canonicalCrossings = 0;
let depthExhausted = 0;
let minimumMargin = null;
let minimumWitness = null;
let minimumRatioNumerator = null;
let minimumRatioDenominator = null;
let minimumRatioWitness = null;
let firstFailure = null;
let maximumCrossingDepth = 0;

for (let rawStart = 5; rawStart <= maximumStart; rawStart += 4) {
  ++starts;
  const start = BigInt(rawStart);
  let state = start;
  let exponent = 0;
  const word = [];
  let crossed = false;

  for (let i = 0; i < maximumDepth; ++i) {
    const numerator = 3n * state - 1n;
    const actual = valuationTwo(numerator);
    ++acceleratedSteps;
    const r = i + 1;
    const required = ceilings[r];

    if (exponent + actual >= required) {
      const finalExponent = required - exponent;
      assert(finalExponent >= 1 && finalExponent <= actual,
        "invalid truncated crossing exponent");
      word.push(finalExponent);
      const endpoint = numerator >> BigInt(finalExponent);
      const M = 1n << BigInt(required);
      const R = powers3[r];
      const D = M - R;
      ++crossings;
      maximumCrossingDepth = Math.max(maximumCrossingDepth, r);

      if (start < M) {
        ++canonicalCrossings;
        const tau = start - endpoint;
        const margin = 3n * tau - BigInt(r);
        const positions = [];
        let position = 0;
        for (const a of word) {
          positions.push(position);
          position += a;
        }
        assert(position === required, "crossing exponent sum mismatch");
        assert(word[0] === 1, "first shadow valuation changed");
        for (let j = 1; j < r; ++j) {
          assert((1n << BigInt(required - positions[j])) > powers3[r - j],
            "strict suffix record failed");
        }

        const rho = M - start;
        const Z = R - endpoint;
        assert(rho > 0n && Z > 0n, "paired positive cylinder failed");
        let carry = 0n;
        for (let j = 0; j < r; ++j) {
          carry += powers3[r - 1 - j] *
            (1n << BigInt(positions[j]));
        }
        assert(rho === mod(-carry * inverse(R, M), M),
          "paired canonical start mismatch");
        assert((R * rho + carry) / M === Z,
          "paired canonical endpoint mismatch");
        const reducedTau = mod(carry * inverse(M, D), D);
        assert(tau === reducedTau, "positive shadow drop is not tau");
        assert(tau > 0n && tau < D, "positive shadow drop escaped range");

        if (minimumMargin === null || margin < minimumMargin) {
          minimumMargin = margin;
          minimumWitness = {
            start: rawStart,
            endpoint: endpoint.toString(),
            r,
            A: required,
            tau: tau.toString(),
            margin: margin.toString(),
            rho: rho.toString(),
            Z: Z.toString(),
            word: word.join(".")
          };
        }
        if (minimumRatioNumerator === null ||
            tau * minimumRatioDenominator <
              minimumRatioNumerator * BigInt(r)) {
          minimumRatioNumerator = tau;
          minimumRatioDenominator = BigInt(r);
          minimumRatioWitness = {
            start: rawStart,
            endpoint: endpoint.toString(),
            r,
            A: required,
            tau: tau.toString(),
            threeTauMinusR: margin.toString(),
            ratio: `${tau}/${r}`,
            rho: rho.toString(),
            Z: Z.toString(),
            word: word.join(".")
          };
        }
        if (margin < 0n && firstFailure === null) {
          firstFailure = minimumWitness;
        }
      }
      crossed = true;
      break;
    }

    word.push(actual);
    exponent += actual;
    state = numerator >> BigInt(actual);
  }

  if (!crossed) ++depthExhausted;
}

console.log(JSON.stringify({
  probe: "canonical positive 3m-1 first-crossing scan",
  maximumStart,
  maximumDepth,
  starts,
  acceleratedSteps,
  crossings,
  canonicalCrossings,
  depthExhausted,
  maximumCrossingDepth,
  minimumMargin: minimumMargin === null ? null : minimumMargin.toString(),
  minimumWitness,
  minimumTauOverR: minimumRatioNumerator === null ? null :
    `${minimumRatioNumerator}/${minimumRatioDenominator}`,
  minimumRatioWitness,
  firstFailure,
  warning: "finite direct trajectory scan only"
}, null, 2));
