#!/usr/bin/env node
"use strict";

// Search the complete s=8 terminal-preserving subideal lattice for a
// translated isolated failure which also has the endpoint parities forced
// by genuine accelerated odd words.  This tests whether parity alone
// repairs the R110 absolute-anchor countermodel.

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

const s = 8;
const N = 13;
const M = 1n << BigInt(N);
const P = 3n ** BigInt(s);
const D = M - P;
const inverseP = inverse(P, M);
const inverseM = inverse(M, D);
const top = [0, 0, 1, 1, 2, 2, 3, 4];

function delta(i, r) {
  return (1n << BigInt(i + r - 1)) * 3n ** BigInt(s - 1 - i);
}

function anchoredCarry(delays) {
  let C = P - (1n << BigInt(s));
  for (let i = 0; i < delays.length; ++i) {
    for (let r = 1; r <= delays[i]; ++r) C += delta(i, r);
  }
  return C;
}

function coordinates(C) {
  const rho = mod(-C * inverseP, M);
  const tau = mod(C * inverseM, D);
  const numerator = D * rho + M * tau - C;
  assert(numerator % (M * D) === 0n, "nonintegral color");
  const E = numerator / (M * D);
  const endpointNumerator = P * rho + C;
  assert(endpointNumerator % M === 0n, "nonintegral endpoint");
  const endpoint = endpointNumerator / M;
  return {rho, tau, E, endpoint};
}

const anchoredTop = anchoredCarry(top);
const delays = Array(s).fill(0);
const profiles = [];

function visit(i, previous) {
  if (i === s - 1) {
    delays[i] = top[i];
    if (delays[i] < previous) return;
    const anchored = anchoredCarry(delays);
    profiles.push({
      delays: delays.slice(),
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
assert(profiles.length === 30, "full subideal count changed");

const corners = [];
for (let i = 1; i < s; ++i) {
  if (top[i] <= top[i - 1]) continue;
  const cellDelta = delta(i, top[i]);
  const L = mod(cellDelta * inverseP, M);
  const numerator = D * L + cellDelta;
  assert(numerator % M === 0n, "nonintegral corner threshold");
  corners.push({i, r: top[i], delta: cellDelta, L,
    V: numerator / M});
}

const nonterminalCorners = corners.filter(corner => corner.i < s - 1);
const totalL = nonterminalCorners.reduce((sum, corner) => sum + corner.L,
  0n);
const totalV = nonterminalCorners.reduce((sum, corner) => sum + corner.V,
  0n);
const minimumV = nonterminalCorners.reduce((value, corner) =>
  corner.V < value ? corner.V : value, nonterminalCorners[0].V);

let candidatePairs = 0;
let carryBoundPairs = 0;
let parityCompatiblePairs = 0;
let isolatedFailures = 0;
const firstIsolatedFailures = [];

for (let rho = 1n; rho + totalL < M; rho += 2n) {
  for (let tau = 0n; tau < minimumV; tau += 2n) {
    ++candidatePairs;
    if (totalV > D + tau) continue;
    ++parityCompatiblePairs;
    const virtualTop = D * rho + M * tau;
    if (3n * virtualTop >= BigInt(s) * M) continue;
    ++carryBoundPairs;

    let isolated = true;
    for (const profile of profiles) {
      const C = virtualTop - profile.removedCarry;
      if (C <= 0n) {
        isolated = false;
        break;
      }
      const point = coordinates(C);
      if ((point.rho & 1n) === 0n || (point.endpoint & 1n) === 0n) {
        isolated = false;
        break;
      }
      if (profile.proper ? point.E !== 1n : point.E !== 0n) {
        isolated = false;
        break;
      }
    }
    if (!isolated) continue;
    ++isolatedFailures;
    if (firstIsolatedFailures.length < 12) {
      firstIsolatedFailures.push({
        virtualTop: virtualTop.toString(),
        offset: (virtualTop - anchoredTop).toString(),
        rho: rho.toString(),
        tau: tau.toString()
      });
    }
  }
}

assert(candidatePairs === 131362, "s=8 parity pair count changed");
assert(parityCompatiblePairs === 131362,
  "s=8 parity-compatible pair count changed");
assert(carryBoundPairs === 9, "s=8 carry-bound pair count changed");
assert(isolatedFailures === 0,
  "a parity-correct s=8 full-lattice model survived");

console.log(JSON.stringify({
  probe: "parity-correct translated full-lattice failures",
  top,
  anchoredTop: anchoredTop.toString(),
  profileCount: profiles.length,
  nonterminalCorners: nonterminalCorners.map(corner => ({
    i: corner.i,
    r: corner.r,
    L: corner.L.toString(),
    V: corner.V.toString()
  })),
  totalL: totalL.toString(),
  totalV: totalV.toString(),
  minimumV: minimumV.toString(),
  candidatePairs,
  parityCompatiblePairs,
  carryBoundPairs,
  isolatedFailures,
  firstIsolatedFailures,
  warning: "translated models only; an isolated model is not an FCD counterexample"
}, null, 2));
