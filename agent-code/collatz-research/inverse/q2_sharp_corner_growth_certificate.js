#!/usr/bin/env node
"use strict";

// Exact/small-board regression for the sharp height recurrence behind the
// q_s=2 target corner-growth theorem.  The all-depth theorem is analytic;
// this program freezes the rational exponent check and independently
// enumerates the mechanical-board recurrence on small anchored profiles.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function bitLength(n) {
  return n.toString(2).length;
}

const alpha = Math.log2(3);
const beta = alpha - 1;
const gamma = Math.log(2) / Math.log(alpha);

// alpha < 317/200 and (317/200)^3 < 4 imply
// log_alpha(2) > 3/2.  Both comparisons are exact integers.
assert(3n ** 200n < 2n ** 317n,
  "the rational upper bound log_2(3)<317/200 failed");
assert(317n ** 3n < 4n * 200n ** 3n,
  "the rational proof of gamma>3/2 failed");
assert(gamma > 1.5 && gamma < 1.506,
  "the displayed corner exponent changed");

let q2Weights = 0;
let anchoredProfiles = 0;
let cornerTransitions = 0;
let maximumCorners = 0;

for (let s = 3; s <= 14; ++s) {
  const powers3 = 3n ** BigInt(s);
  const previous = 3n ** BigInt(s - 1);
  const N = bitLength(powers3);
  const previousN = bitLength(previous);
  if (N - previousN !== 1) continue;
  ++q2Weights;

  const m = Array(s).fill(0);
  for (let i = 1; i < s; ++i) {
    m[i] = bitLength(3n ** BigInt(i)) - 1 - i;
  }
  assert(m[s - 1] === N - s - 1,
    `terminal mechanical height changed at weight ${s}`);

  const delays = Array(s).fill(0);
  function visit(i, previousDelay) {
    if (i === s - 1) {
      delays[i] = m[i];
      if (delays[i] < previousDelay) return;
      ++anchoredProfiles;

      const corners = [];
      for (let j = 1; j < s; ++j) {
        if (delays[j] > delays[j - 1]) corners.push(j);
      }
      maximumCorners = Math.max(maximumCorners, corners.length);
      for (let index = 0; index + 1 < corners.length; ++index) {
        const J = corners[index];
        const nextJ = corners[index + 1];
        const gap = nextJ - J;
        const h = m[J] - delays[J];
        const nextH = m[nextJ] - delays[nextJ];
        assert(nextH < h + beta * gap,
          `sharp mechanical recurrence failed at s=${s},J=${J}`);
        ++cornerTransitions;
      }
      return;
    }

    for (let value = previousDelay; value <= m[i]; ++value) {
      delays[i] = value;
      visit(i + 1, value);
    }
  }
  delays[0] = 0;
  visit(1, 0);
}

assert(q2Weights === 5, "small-board q2 weight count changed");
assert(anchoredProfiles === 2859,
  `small-board anchored profile count changed: ${anchoredProfiles}`);
assert(cornerTransitions === 10216,
  `small-board corner-transition count changed: ${cornerTransitions}`);
assert(maximumCorners === 7,
  `small-board maximum corner count changed: ${maximumCorners}`);

function sharpBase(s) {
  const R = Math.log2(307 * s ** 15);
  const G = Math.log2(154 * s ** 15);
  return (s - 1 + R / beta) / (G + R / beta);
}

const sampleWeights = [1000, 10000, 1000000, 10000000000];
const samples = sampleWeights.map(s => {
  const base = sharpBase(s);
  return {
    weight: s,
    base,
    exactExponentVertexBound: base ** gamma,
    threeHalvesVertexBound: base ** 1.5
  };
});

console.log(JSON.stringify({
  certificate: "sharp q_s=2 height/corner recurrence regression",
  alpha,
  beta,
  gamma,
  rationalGammaLowerBound: "gamma>3/2 from 3^200<2^317 and 317^3<4*200^3",
  q2Weights,
  anchoredProfiles,
  cornerTransitions,
  maximumCorners,
  samples,
  warning: "small-board regression; the all-depth growth theorem is analytic"
}, null, 2));
