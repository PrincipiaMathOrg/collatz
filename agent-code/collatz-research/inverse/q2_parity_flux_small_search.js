#!/usr/bin/env node
"use strict";

// Enumerate small q_s=2 anchored boards and test the parity-compressed
// terminal-preserving corner-cube conditions.  This distinguishes the
// proved parity lemma from the still-open absolute anchored-carry step.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function bitLength(n) {
  return n.toString(2).length;
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

const maximumWeight = Number(process.argv[2] || 16);
assert(Number.isInteger(maximumWeight) && maximumWeight >= 5,
  "usage: q2_parity_flux_small_search.js MAX_WEIGHT");

let q2Weights = 0;
let anchoredProfiles = 0;
let fourNonterminalCornerProfiles = 0;
let evenCornerProfiles = 0;
let anchoredFailures = 0;
let translatedCornerCubes = 0;
let subsetRegressions = 0;
const firstTranslatedCornerCubes = [];

for (let weight = 5; weight <= maximumWeight; ++weight) {
  const P = 3n ** BigInt(weight);
  const previousP = P / 3n;
  const N = bitLength(P);
  if (N - bitLength(previousP) !== 1) continue;
  ++q2Weights;
  const M = 1n << BigInt(N);
  const D = M - P;
  const inverseP = inverse(P, M);
  const inverseM = inverse(M, D);
  const m = Array(weight).fill(0);
  for (let i = 1; i < weight; ++i) {
    m[i] = bitLength(3n ** BigInt(i)) - 1 - i;
  }
  const delays = Array(weight).fill(0);

  function cellDelta(i, r) {
    return (1n << BigInt(i + r - 1)) *
      3n ** BigInt(weight - 1 - i);
  }

  function carry() {
    let C = P - (1n << BigInt(weight));
    for (let i = 1; i < weight; ++i) {
      for (let r = 1; r <= delays[i]; ++r) C += cellDelta(i, r);
    }
    return C;
  }

  function color(C) {
    const rho = mod(-C * inverseP, M);
    const tau = mod(C * inverseM, D);
    const numerator = D * rho + M * tau - C;
    assert(numerator % (M * D) === 0n, "nonintegral color");
    return {rho, tau, E: numerator / (M * D)};
  }

  function visit(i, previousDelay) {
    if (i === weight - 1) {
      delays[i] = m[i];
      if (delays[i] < previousDelay) return;
      ++anchoredProfiles;

      const corners = [];
      for (let j = 1; j < weight - 1; ++j) {
        if (delays[j] <= delays[j - 1]) continue;
        const delta = cellDelta(j, delays[j]);
        const L = mod(delta * inverseP, M);
        const numerator = D * L + delta;
        assert(numerator % M === 0n, "nonintegral V threshold");
        corners.push({j, r: delays[j], delta, L, V: numerator / M});
      }
      if (corners.length < 4) return;
      ++fourNonterminalCornerProfiles;

      const actual = color(carry());
      if (actual.E === 0n) ++anchoredFailures;
      if (corners.some(corner => (corner.V & 1n) !== 0n)) return;
      ++evenCornerProfiles;

      const totalL = corners.reduce((sum, corner) => sum + corner.L, 0n);
      const totalV = corners.reduce((sum, corner) => sum + corner.V, 0n);
      const minimumV = corners.reduce((value, corner) =>
        corner.V < value ? corner.V : value, corners[0].V);
      if (totalL >= M) return;
      const rhoMaximum = (BigInt(weight) * M - 1n) / (3n * D);

      for (let rho = 1n; rho <= rhoMaximum && rho + totalL < M;
          rho += 2n) {
        for (let tau = 0n; tau < minimumV; tau += 2n) {
          if (totalV > D + tau) continue;
          const C = D * rho + M * tau;
          if (3n * C >= BigInt(weight) * M) continue;
          ++translatedCornerCubes;

          if (firstTranslatedCornerCubes.length < 12) {
            // Independently evaluate every nonempty corner subset.
            const subsetCount = 1 << corners.length;
            for (let mask = 1; mask < subsetCount; ++mask) {
              let LS = 0n;
              let VS = 0n;
              for (let j = 0; j < corners.length; ++j) {
                if ((mask & (1 << j)) === 0) continue;
                LS += corners[j].L;
                VS += corners[j].V;
              }
              const a = (rho + LS) / M;
              const b = (VS - tau + D - 1n) / D;
              assert(a === 0n && b === 1n,
                "parity-compressed subset regression failed");
              ++subsetRegressions;
            }
            firstTranslatedCornerCubes.push({
              weight,
              delays: delays.slice(),
              rho: rho.toString(),
              tau: tau.toString(),
              virtualCarry: C.toString(),
              anchoredCarry: carry().toString(),
              cornerCount: corners.length,
              totalL: totalL.toString(),
              totalV: totalV.toString()
            });
          }
        }
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

assert(anchoredFailures === 0,
  "an actual small anchored FCD failure was found");
if (maximumWeight === 16) {
  assert(q2Weights === 5, "parity search q2 weight count changed");
  assert(anchoredProfiles === 20495,
    "parity search anchored profile count changed");
  assert(fourNonterminalCornerProfiles === 15705,
    "parity search four-corner profile count changed");
  assert(evenCornerProfiles === 853,
    "parity search even-threshold count changed");
  assert(translatedCornerCubes === 120,
    "parity search translated-cube count changed");
  assert(subsetRegressions === 180,
    "parity search subset regression count changed");
}

console.log(JSON.stringify({
  probe: "small parity-compressed terminal corner cubes",
  maximumWeight,
  q2Weights,
  anchoredProfiles,
  fourNonterminalCornerProfiles,
  evenCornerProfiles,
  anchoredFailures,
  translatedCornerCubes,
  subsetRegressions,
  firstTranslatedCornerCubes,
  warning: "translated corner cubes are method tests, not FCD counterexamples"
}, null, 2));
