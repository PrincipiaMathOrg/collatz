#!/usr/bin/env node
"use strict";

// Test the first parity-correct translated corner-cube shape from the small
// search against its complete terminal-preserving subideal lattice.

function assert(ok, message) {
  if (!ok) throw new Error(message);
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

const weight = 15;
const N = 24;
const M = 1n << BigInt(N);
const P = 3n ** BigInt(weight);
const D = M - P;
const inverseP = inverse(P, M);
const inverseM = inverse(M, D);
const top = [0, 0, 0, 0, 0, 0, 3, 4, 4, 4, 4, 4, 5, 7, 8];

function delta(i, r) {
  return (1n << BigInt(i + r - 1)) *
    3n ** BigInt(weight - 1 - i);
}

function anchoredCarry(delays) {
  let C = P - (1n << BigInt(weight));
  for (let i = 1; i < weight; ++i) {
    for (let r = 1; r <= delays[i]; ++r) C += delta(i, r);
  }
  return C;
}

function coordinates(C) {
  const rho = mod(-C * inverseP, M);
  const tau = mod(C * inverseM, D);
  const numerator = D * rho + M * tau - C;
  assert(numerator % (M * D) === 0n, "nonintegral color");
  const endpointNumerator = P * rho + C;
  assert(endpointNumerator % M === 0n, "nonintegral endpoint");
  return {
    rho,
    tau,
    E: numerator / (M * D),
    endpoint: endpointNumerator / M
  };
}

const anchoredTop = anchoredCarry(top);
assert(anchoredTop === 36635563n, "anchored top changed");
const delays = Array(weight).fill(0);
const profiles = [];

function visit(i, previous) {
  if (i === weight - 1) {
    delays[i] = top[i];
    if (delays[i] < previous) return;
    const anchored = anchoredCarry(delays);
    profiles.push({
      removedCarry: anchoredTop - anchored,
      proper: delays.some((value, index) => value !== top[index])
    });
    return;
  }
  for (let value = previous; value <= top[i]; ++value) {
    delays[i] = value;
    visit(i + 1, value);
  }
}

delays[0] = 0;
visit(1, 0);

const corners = [];
for (let i = 1; i < weight - 1; ++i) {
  if (top[i] <= top[i - 1]) continue;
  const cellDelta = delta(i, top[i]);
  const L = mod(cellDelta * inverseP, M);
  const V = (D * L + cellDelta) / M;
  assert((V & 1n) === 0n, "corner V threshold is not even");
  corners.push({L, V});
}
const totalL = corners.reduce((sum, corner) => sum + corner.L, 0n);
const totalV = corners.reduce((sum, corner) => sum + corner.V, 0n);
const minimumV = corners.reduce((value, corner) =>
  corner.V < value ? corner.V : value, corners[0].V);

let candidatePairs = 0;
let completeLatticePairs = 0;
let colorFailures = 0;
let parityFailures = 0;
let positivityFailures = 0;
const firstCompleteLatticePairs = [];
const rhoMaximum = (BigInt(weight) * M - 1n) / (3n * D);

for (let rho = 1n; rho <= rhoMaximum && rho + totalL < M; rho += 2n) {
  for (let tau = 0n; tau < minimumV; tau += 2n) {
    if (totalV > D + tau) continue;
    const virtualTop = D * rho + M * tau;
    if (3n * virtualTop >= BigInt(weight) * M) continue;
    ++candidatePairs;

    let good = true;
    let reason = "";
    for (const profile of profiles) {
      const C = virtualTop - profile.removedCarry;
      if (C <= 0n) {
        good = false;
        reason = "positivity";
        break;
      }
      const point = coordinates(C);
      if ((point.rho & 1n) === 0n || (point.endpoint & 1n) === 0n) {
        good = false;
        reason = "parity";
        break;
      }
      if (profile.proper ? point.E !== 1n : point.E !== 0n) {
        good = false;
        reason = "color";
        break;
      }
    }
    if (!good) {
      if (reason === "positivity") ++positivityFailures;
      if (reason === "parity") ++parityFailures;
      if (reason === "color") ++colorFailures;
      continue;
    }
    ++completeLatticePairs;
    if (firstCompleteLatticePairs.length < 12) {
      firstCompleteLatticePairs.push({
        rho: rho.toString(),
        tau: tau.toString(),
        virtualTop: virtualTop.toString(),
        offset: (virtualTop - anchoredTop).toString()
      });
    }
  }
}

assert(profiles.length === 2108, "s=15 full-lattice profile count changed");
assert(candidatePairs === 30, "s=15 parity candidate count changed");
assert(positivityFailures === 4, "s=15 positivity rejection count changed");
assert(parityFailures === 26, "s=15 parity rejection count changed");
assert(colorFailures === 0, "s=15 color rejection count changed");
assert(completeLatticePairs === 0,
  "a parity-correct s=15 full-lattice model survived");

console.log(JSON.stringify({
  probe: "parity-correct complete terminal-preserving lattice at s=15",
  weight,
  top,
  profileCount: profiles.length,
  anchoredTop: anchoredTop.toString(),
  cornerCount: corners.length,
  totalL: totalL.toString(),
  totalV: totalV.toString(),
  minimumV: minimumV.toString(),
  candidatePairs,
  positivityFailures,
  parityFailures,
  colorFailures,
  completeLatticePairs,
  firstCompleteLatticePairs,
  warning: "translated models only; a surviving model is not an FCD counterexample"
}, null, 2));
