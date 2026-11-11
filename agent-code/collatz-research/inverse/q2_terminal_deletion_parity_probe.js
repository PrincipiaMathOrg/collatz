#!/usr/bin/env node
"use strict";

// Audit whether deleting a nonterminal Ferrers corner preserves exactness
// of the terminal valuation.  Odd canonical endpoints mean that the final
// accelerated exponent is exact; even endpoints mean it was truncated.

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

const maximumWeight = Number(process.argv[2] || 18);
assert(Number.isInteger(maximumWeight) && maximumWeight >= 3,
  "usage: q2_terminal_deletion_parity_probe.js MAX_WEIGHT");

let profiles = 0;
let oddTopEndpoints = 0;
let testedDeletions = 0;
let parityChanges = 0;
let firstParityChange = null;

for (let weight = 3; weight <= maximumWeight; ++weight) {
  const P = 3n ** BigInt(weight);
  const N = bitLength(P);
  if (N - bitLength(P / 3n) !== 1) continue;
  const M = 1n << BigInt(N);
  const D = M - P;
  const inverseP = inverse(P, M);
  const inverseM = inverse(M, D);
  const maxima = Array(weight).fill(0);
  for (let i = 1; i < weight; ++i) {
    maxima[i] = bitLength(3n ** BigInt(i)) - 1 - i;
  }
  const delays = Array(weight).fill(0);

  function delta(i, r) {
    return (1n << BigInt(i + r - 1)) *
      3n ** BigInt(weight - 1 - i);
  }

  function carry() {
    let C = P - (1n << BigInt(weight));
    for (let i = 1; i < weight; ++i) {
      for (let r = 1; r <= delays[i]; ++r) C += delta(i, r);
    }
    return C;
  }

  function point(C) {
    const rho = mod(-C * inverseP, M);
    const numerator = P * rho + C;
    assert(numerator % M === 0n, "nonintegral endpoint");
    const tau = mod(C * inverseM, D);
    const colorNumerator = D * rho + M * tau - C;
    assert(colorNumerator % (M * D) === 0n, "nonintegral color");
    return {
      rho,
      tau,
      E: colorNumerator / (M * D),
      endpoint: numerator / M
    };
  }

  function visit(i, previous) {
    if (firstParityChange !== null) return;
    if (i === weight - 1) {
      delays[i] = maxima[i];
      if (delays[i] < previous) return;
      ++profiles;
      const C = carry();
      const top = point(C);
      if ((top.endpoint & 1n) === 0n) return;
      ++oddTopEndpoints;
      for (let j = 1; j < weight - 1; ++j) {
        if (delays[j] <= delays[j - 1]) continue;
        ++testedDeletions;
        const removed = delta(j, delays[j]);
        const L = mod(removed * inverseP, M);
        const V = (D * L + removed) / M;
        const a = (top.rho + L) / M;
        const child = point(C - removed);
        if ((child.endpoint & 1n) !== 0n) continue;
        ++parityChanges;
        firstParityChange = {
          weight,
          N,
          delays: delays.slice(),
          corner: [j, delays[j]],
          topStart: top.rho.toString(),
          topTau: top.tau.toString(),
          topColor: top.E.toString(),
          topEndpoint: top.endpoint.toString(),
          childStart: child.rho.toString(),
          childTau: child.tau.toString(),
          childColor: child.E.toString(),
          childEndpoint: child.endpoint.toString(),
          L: L.toString(),
          V: V.toString(),
          dyadicWrap: a.toString(),
          endpointParityIncrement: ((V + a) & 1n).toString()
        };
        return;
      }
      return;
    }
    for (let value = previous; value <= maxima[i]; ++value) {
      delays[i] = value;
      visit(i + 1, value);
      if (firstParityChange !== null) return;
    }
  }

  visit(1, 0);
  if (firstParityChange !== null) break;
}

if (maximumWeight === 18) {
  assert(profiles === 7, "terminal-parity profile count changed");
  assert(oddTopEndpoints === 1,
    "terminal-parity odd-top count changed");
  assert(testedDeletions === 1,
    "terminal-parity deletion count changed");
  assert(parityChanges === 1,
    "terminal-parity counterexample disappeared");
  assert(firstParityChange !== null &&
    firstParityChange.weight === 8 &&
    firstParityChange.topStart === "3903" &&
    firstParityChange.topEndpoint === "3127" &&
    firstParityChange.childStart === "191" &&
    firstParityChange.childEndpoint === "154",
    "terminal-parity witness changed");
}

console.log(JSON.stringify({
  probe: "terminal exactness under nonterminal corner deletion",
  maximumWeight,
  profiles,
  oddTopEndpoints,
  testedDeletions,
  parityChanges,
  firstParityChange,
  warning: "a parity change refutes endpoint-oddness preservation only"
}, null, 2));
