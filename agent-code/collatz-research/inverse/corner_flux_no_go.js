#!/usr/bin/env node
"use strict";

// Exact certificate for the complete-corner Boolean-cube no-go in
// corner_flux_solve.md.  This is a local countermodel, not an FCD
// counterexample: the virtual carry deliberately differs from the anchored
// carry of the displayed Ferrers ideal.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function mod(a, m) {
  a %= m;
  return a < 0n ? a + m : a;
}

function inverse(a, m) {
  let t = 0n, nextT = 1n, r = m, nextR = mod(a, m);
  while (nextR !== 0n) {
    const q = r / nextR;
    [t, nextT] = [nextT, t - q * nextT];
    [r, nextR] = [nextR, r - q * nextR];
  }
  assert(r === 1n, "inverse does not exist");
  return mod(t, m);
}

function floorDiv(a, b) {
  let q = a / b;
  if (a % b < 0n) --q;
  return q;
}

function ceilDiv(a, b) {
  return -floorDiv(-a, b);
}

const s = 8;
const k = 13;
const M = 1n << BigInt(k);
const P = 3n ** BigInt(s);
const D = M - P;
const PInverse = inverse(P, M);
const delays = [0, 0, 1, 1, 2, 2, 3, 4];
const topWord = "1101101101010";

function carry(word) {
  let C = 0n;
  for (let j = 0; j < word.length; ++j) {
    if (word[j] === "1") C = 3n * C + (1n << BigInt(j));
  }
  return C;
}

function delayData(word) {
  const out = [];
  let ones = 0;
  for (let j = 0; j < word.length; ++j) {
    if (word[j] !== "1") continue;
    out.push(j - ones);
    ++ones;
  }
  return out;
}

function primitiveFirstCrossing(word) {
  let p2 = 1n, p3 = 1n;
  for (let j = 0; j < word.length; ++j) {
    if (p3 < p2) return false;
    p2 <<= 1n;
    if (word[j] === "1") p3 *= 3n;
  }
  return p3 < p2;
}

function coordinates(C) {
  const rho = mod(-C * PInverse, M);
  const tau = mod(C * inverse(M, D), D);
  const numerator = D * rho + M * tau - C;
  assert(numerator % (M * D) === 0n, "nonintegral branch");
  const E = numerator / (M * D);
  assert(E === 0n || E === 1n, "branch escaped {0,1}");
  return {rho, tau, E};
}

function cell(i, r) {
  const delta = (1n << BigInt(i + r - 1)) *
    3n ** BigInt(s - 1 - i);
  const L = mod(delta * PInverse, M);
  const numerator = D * L + delta;
  assert(numerator % M === 0n, "nonintegral V");
  return {i, r, delta, L, V: numerator / M};
}

const corners = [];
assert(primitiveFirstCrossing(topWord), "word is not primitive first crossing");
assert(delayData(topWord).join() === delays.join(), "word/delay mismatch");
let previous = 0;
for (let i = 0; i < delays.length; ++i) {
  if (delays[i] > previous) corners.push(cell(i, delays[i]));
  previous = delays[i];
}
assert(corners.length === 4, "expected the complete four-corner boundary");

const expected = [
  [2, 1, 972n, 2124n, 423n],
  [4, 2, 864n, 1888n, 376n],
  [6, 3, 768n, 768n, 153n],
  [7, 4, 1024n, 1024n, 204n]
];
for (let j = 0; j < expected.length; ++j) {
  const c = corners[j], e = expected[j];
  assert(c.i === e[0] && c.r === e[1] && c.delta === e[2] &&
    c.L === e[3] && c.V === e[4], `corner ${j} changed`);
}

// Both ordinary threshold orders agree.
const byL = corners.slice().sort((a, b) => a.L < b.L ? -1 : 1);
const byV = corners.slice().sort((a, b) => a.V < b.V ? -1 : 1);
assert(byL.map(c => c.i).join() === byV.map(c => c.i).join(),
  "threshold orders diverged");

const virtualC = 13085n;
const virtual = coordinates(virtualC);
assert(virtual.rho === 3n && virtual.tau === 1n && virtual.E === 0n,
  "virtual top changed");

const subsets = [];
for (let mask = 1; mask < (1 << corners.length); ++mask) {
  let delta = 0n, L = 0n, V = 0n;
  const chosen = [];
  for (let j = 0; j < corners.length; ++j) {
    if ((mask & (1 << j)) === 0) continue;
    delta += corners[j].delta;
    L += corners[j].L;
    V += corners[j].V;
    chosen.push(`(${corners[j].i},${corners[j].r})`);
  }
  const binaryWraps = floorDiv(virtual.rho + L, M);
  const reducedWraps = ceilDiv(V - virtual.tau, D);
  const below = coordinates(virtualC - delta);
  assert(binaryWraps === 0n && reducedWraps === 1n,
    `unexpected wrap distribution at mask ${mask}`);
  assert(reducedWraps - binaryWraps === 1n && below.E === 1n,
    `O12 failed at mask ${mask}`);
  subsets.push({
    mask: mask.toString(2).padStart(corners.length, "0"),
    chosen: chosen.join(" "),
    delta: delta.toString(),
    L: L.toString(),
    V: V.toString(),
    binaryWraps: binaryWraps.toString(),
    reducedWraps: reducedWraps.toString(),
    belowE: below.E.toString()
  });
}

const anchoredC = carry(topWord);
let anchoredFromCells = P - (1n << BigInt(s));
for (let i = 0; i < delays.length; ++i) {
  for (let r = 1; r <= delays[i]; ++r) anchoredFromCells += cell(i, r).delta;
}
assert(anchoredC === 13349n && anchoredFromCells === anchoredC,
  "anchored carry changed");
const anchored = coordinates(anchoredC);
assert(anchored.rho === 3067n && anchored.tau === 1022n && anchored.E === 1n,
  "anchored top changed");
assert(anchoredC - virtualC === 264n, "anchor offset changed");

// Mandatory half-residue regression: no argument certified here may use
// tau >= ceil(s/2).
const halfWord =
  "1111101010111111111101101010100010100111011000";
const halfS = [...halfWord].filter(x => x === "1").length;
const halfM = 1n << BigInt(halfWord.length);
const halfP = 3n ** BigInt(halfS);
const halfD = halfM - halfP;
const halfTau = mod(carry(halfWord) * inverse(halfM, halfD), halfD);
assert(halfS === 29 && halfTau === 14n && 2n * halfTau < BigInt(halfS),
  "half-residue regression changed");

console.log(JSON.stringify({
  certificate: "complete removable-corner flux no-go",
  parameters: {s, k, M: M.toString(), P: P.toString(), D: D.toString()},
  ideal: {word: topWord, delays},
  corners: corners.map(c => ({
    i: c.i, r: c.r, delta: c.delta.toString(),
    L: c.L.toString(), V: c.V.toString()
  })),
  virtualTop: {
    C: virtualC.toString(), rho: virtual.rho.toString(),
    tau: virtual.tau.toString(), E: virtual.E.toString(),
    allNonemptySubsetsSatisfyO12: true,
    subsets
  },
  anchoredTop: {
    C: anchoredC.toString(), rho: anchored.rho.toString(),
    tau: anchored.tau.toString(), E: anchored.E.toString(),
    offsetFromVirtual: (anchoredC - virtualC).toString()
  },
  regressions: {halfResidue: {s: halfS, tau: halfTau.toString()}}
}, null, 2));
