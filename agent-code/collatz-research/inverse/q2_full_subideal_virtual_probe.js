#!/usr/bin/env node
"use strict";

// Test the complete terminal-preserving subideal lattice beneath the
// four-corner virtual top from corner_flux_no_go.js.  This is a diagnostic
// for strengthening the first-layer Boolean-cube obstruction.

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
const virtualTop = 13085n;

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

function color(C) {
  const rho = mod(-C * inverseP, M);
  const tau = mod(C * inverseM, D);
  const numerator = D * rho + M * tau - C;
  assert(numerator % (M * D) === 0n, "nonintegral color");
  const E = numerator / (M * D);
  assert(E === 0n || E === 1n, "color escaped {0,1}");
  return {rho, tau, E};
}

const anchoredTop = anchoredCarry(top);
assert(anchoredTop === 13349n, "anchored top changed");
const offset = virtualTop - anchoredTop;
const delays = Array(s).fill(0);
const profiles = [];

function visit(i, previous) {
  if (i === s - 1) {
    delays[i] = top[i];
    if (delays[i] < previous) return;
    const anchored = anchoredCarry(delays);
    const virtual = anchored + offset;
    profiles.push({
      delays: delays.slice(),
      anchored,
      virtual,
      coordinates: color(virtual)
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

const failures = profiles.filter(entry => entry.coordinates.E === 0n);
const properFailures = failures.filter(entry =>
  entry.delays.some((value, i) => value !== top[i]));

assert(profiles.length === 30, "terminal-preserving subideal count changed");
assert(failures.length === 1, "virtual failure count changed");
assert(properFailures.length === 0,
  "the virtual top is no longer an isolated full-lattice failure");
assert(failures[0].virtual === virtualTop,
  "the unique virtual failure is not the prescribed top");

console.log(JSON.stringify({
  probe: "complete terminal-preserving subideal lattice below the virtual four-corner top",
  top,
  anchoredTop: anchoredTop.toString(),
  virtualTop: virtualTop.toString(),
  offset: offset.toString(),
  profileCount: profiles.length,
  failureCount: failures.length,
  properFailureCount: properFailures.length,
  failures: failures.map(entry => ({
    delays: entry.delays,
    virtualCarry: entry.virtual.toString(),
    rho: entry.coordinates.rho.toString(),
    tau: entry.coordinates.tau.toString()
  }))
}, null, 2));
