#!/usr/bin/env node
"use strict";

// Show that top exactness, together with the complete proper-subideal FCD
// coloring, still does not determine the absolute anchor.  The translated
// carries below are method countermodels, not Collatz counterexamples.

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

const weight = 8;
const P = 3n ** BigInt(weight);
const N = P.toString(2).length;
const M = 1n << BigInt(N);
const D = M - P;
const inverseP = inverse(P, M);
const inverseM = inverse(M, D);
const top = [0, 0, 1, 1, 2, 2, 3, 4];

function delta(i, r) {
  return (1n << BigInt(i + r - 1)) *
    3n ** BigInt(weight - 1 - i);
}

function carry(path) {
  let C = P - (1n << BigInt(weight));
  for (let i = 1; i < weight; ++i) {
    for (let r = 1; r <= path[i]; ++r) C += delta(i, r);
  }
  return C;
}

function coordinates(C) {
  const rho = mod(-C * inverseP, M);
  const tau = mod(C * inverseM, D);
  const numerator = D * rho + M * tau - C;
  assert(numerator % (M * D) === 0n, "nonintegral color");
  const E = numerator / (M * D);
  assert(E === 0n || E === 1n, "color escaped {0,1}");
  const endpointNumerator = P * rho + C;
  assert(endpointNumerator % M === 0n, "nonintegral endpoint");
  return {rho, tau, E, endpoint: endpointNumerator / M};
}

const anchoredTop = carry(top);
assert(anchoredTop === 13349n, "anchored top changed");
const delays = Array(weight).fill(0);
const removedCarries = [];

function visit(i, previous) {
  if (i === weight - 1) {
    delays[i] = top[i];
    if (delays[i] < previous) return;
    removedCarries.push(anchoredTop - carry(delays));
    return;
  }
  for (let value = previous; value <= top[i]; ++value) {
    delays[i] = value;
    visit(i + 1, value);
  }
}

delays[0] = 0;
visit(1, 0);
assert(removedCarries.length === 30,
  "terminal-preserving subideal count changed");

const hits = [];
for (let rho = 1n; rho < M; rho += 2n) {
  for (let tau = 0n; tau < D; tau += 2n) {
    const virtualTop = D * rho + M * tau;
    if (3n * virtualTop >= BigInt(weight) * M) break;
    const topPoint = coordinates(virtualTop);
    assert(topPoint.rho === rho && topPoint.tau === tau &&
      topPoint.E === 0n, "virtual top coordinates changed");
    assert((topPoint.endpoint & 1n) === 1n,
      "odd top start and even displacement did not give an odd endpoint");

    let isolated = true;
    for (const removed of removedCarries) {
      if (removed === 0n) continue;
      const childCarry = virtualTop - removed;
      if (childCarry <= 0n || coordinates(childCarry).E !== 1n) {
        isolated = false;
        break;
      }
    }
    if (!isolated) continue;
    hits.push({
      rho: rho.toString(),
      tau: tau.toString(),
      endpoint: topPoint.endpoint.toString(),
      virtualCarry: virtualTop.toString(),
      anchorOffset: (virtualTop - anchoredTop).toString()
    });
  }
}

assert(hits.length === 7,
  `top-exact isolated translation count changed: ${hits.length}`);
assert(hits.every(hit => hit.anchorOffset !== "0"),
  "an anchored top-exact failure appeared");

console.log(JSON.stringify({
  probe: "top-exact isolated failures on a translated full subideal lattice",
  weight,
  top,
  anchoredTop: anchoredTop.toString(),
  profileCount: removedCarries.length,
  translatedHitCount: hits.length,
  hits,
  conclusion: "the absolute anchor is independent of lifted exactness and full-lattice color data",
  warning: "translated carries only; no hit is an anchored Collatz profile"
}, null, 2));
