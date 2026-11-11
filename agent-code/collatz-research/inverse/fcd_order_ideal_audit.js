#!/usr/bin/env node
"use strict";

// Exact audit of the anchored order-ideal formulation of first-crossing
// descent.  This is a finite regression certificate, not an all-depth proof.

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
  assert(b > 0n, "positive divisor required");
  let q = a / b;
  if (a % b < 0n) --q;
  return q;
}

function ceilDiv(a, b) {
  return -floorDiv(-a, b);
}

function sign(a) {
  return a < 0n ? -1 : a > 0n ? 1 : 0;
}

function parameters(k, s) {
  const M = 1n << BigInt(k);
  const P = 3n ** BigInt(s);
  return {M, P, D: M - P};
}

function carry(word) {
  let C = 0n;
  for (let j = 0; j < word.length; ++j) {
    if (word[j] === "1") C = 3n * C + (1n << BigInt(j));
  }
  return C;
}

function coordinates(C, M, P, D) {
  assert(D > 1n, "nonboundary determinant required");
  const rho = mod(-C * inverse(P, M), M);
  const tau = mod(C * inverse(M, D), D);
  const Z = (P * rho + C) / M;
  const numerator = D * rho + M * tau - C;
  assert(numerator % (M * D) === 0n, "CRT lift is not integral");
  const E = numerator / (M * D);
  assert(E === 0n || E === 1n, "two-lift branch escaped {0,1}");
  return {rho, tau, Z, E};
}

function delayData(word) {
  const delays = [];
  let ones = 0;
  for (let j = 0; j < word.length; ++j) {
    if (word[j] !== "1") continue;
    delays.push(j - ones);
    ++ones;
  }
  return delays;
}

function cell(k, s, i, r, PInverse) {
  const {M, D} = parameters(k, s);
  const t = i + r - 1;
  const b = s - 1 - i;
  const delta = (1n << BigInt(t)) * 3n ** BigInt(b);
  const L = mod(delta * PInverse, M);
  const numerator = D * L + delta;
  assert(numerator % M === 0n, "V is not integral");
  const V = numerator / M;
  assert(0n < delta && delta < M, "cell increment escaped (0,M)");
  assert(0n < V && V < D, "cell threshold escaped (0,D)");
  return {i, r, t, b, delta, L, V, h: L - V};
}

function wordData(word) {
  const k = word.length;
  const s = [...word].filter(x => x === "1").length;
  const {M, P, D} = parameters(k, s);
  const C = carry(word);
  const delays = delayData(word);
  const PInverse = inverse(P, M);
  const CFront = P - (1n << BigInt(s));
  let anchored = CFront;
  for (let i = 0; i < delays.length; ++i) {
    for (let r = 1; r <= delays[i]; ++r) {
      anchored += cell(k, s, i, r, PInverse).delta;
    }
  }
  assert(anchored === C, "anchored Ferrers evaluation failed");
  const out = {word, k, s, M, P, D, C, CFront, delays, PInverse};
  if (D > 1n) Object.assign(out, coordinates(C, M, P, D));
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

function moveRight(word, j) {
  return word.slice(0, j) + "01" + word.slice(j + 2);
}

const maxLength = Number(process.argv[2] || 21);
const maxCellWeight = Number(process.argv[3] || 40);
assert(Number.isInteger(maxLength) && maxLength >= 3, "invalid maxLength");
assert(Number.isInteger(maxCellWeight) && maxCellWeight >= 3,
  "invalid maxCellWeight");

const counts = {
  primitiveWords: 0,
  nonboundaryWords: 0,
  anchoredCells: 0,
  admissibleEdges: 0,
  matched00: 0,
  matched11: 0,
  mismatchedEdges: 0,
  cornerSubsets: 0,
  cornerFluxIdentities: 0,
  fcdFailures: 0,
  thresholdPairs: 0,
  thresholdTies: 0
};

function auditWord(word) {
  ++counts.primitiveWords;
  const x = wordData(word);
  if (x.D <= 1n) return;
  ++counts.nonboundaryWords;
  counts.anchoredCells += x.delays.reduce((a, b) => a + b, 0);

  if (x.E === 0n) ++counts.fcdFailures;

  // Every actual admissible edge has the paired update of F5--F10.
  for (let j = 0; j + 1 < word.length; ++j) {
    if (word.slice(j, j + 2) !== "10") continue;
    const afterWord = moveRight(word, j);
    if (!primitiveFirstCrossing(afterWord)) continue;
    const y = wordData(afterWord);
    const delta = y.C - x.C;
    const L = mod(delta * x.PInverse, x.M);
    const V = (x.D * L + delta) / x.M;
    const chi = x.rho < L ? 1n : 0n;
    const eta = x.tau + V >= x.D ? 1n : 0n;
    assert(y.rho === x.rho - L + chi * x.M, "rho edge update");
    assert(y.tau === x.tau + V - eta * x.D, "tau edge update");
    assert(y.E === x.E + chi - eta, "paired-wrap cocycle");
    ++counts.admissibleEdges;
    if (chi !== eta) ++counts.mismatchedEdges;
    else if (chi === 0n) ++counts.matched00;
    else ++counts.matched11;
  }

  // The removable cells are exactly the southeast boundary corners of I.
  const corners = [];
  let previous = 0;
  for (let i = 0; i < x.delays.length; ++i) {
    if (x.delays[i] > previous) {
      corners.push(cell(x.k, x.s, i, x.delays[i], x.PInverse));
    }
    previous = x.delays[i];
  }
  assert(corners.length < 31, "corner mask exceeds exact Number bit mask");

  // For S contained in the corner set, I\S remains an order ideal.  The
  // identity below is exact for every branch, not conditional on FCD.
  const subsetCount = 1 << corners.length;
  for (let mask = 1; mask < subsetCount; ++mask) {
    let deltaS = 0n, LS = 0n, VS = 0n;
    for (let j = 0; j < corners.length; ++j) {
      if ((mask & (1 << j)) === 0) continue;
      deltaS += corners[j].delta;
      LS += corners[j].L;
      VS += corners[j].V;
    }
    const below = coordinates(x.C - deltaS, x.M, x.P, x.D);
    const binaryWraps = floorDiv(x.rho + LS, x.M);
    const reducedWraps = ceilDiv(VS - x.tau, x.D);
    assert(below.E === x.E + reducedWraps - binaryWraps,
      "all-subset corner flux identity");
    ++counts.cornerSubsets;
    ++counts.cornerFluxIdentities;
  }
}

function dfs(word, p2, p3) {
  if (word.length >= maxLength) return;
  const nextP2 = p2 << 1n;
  if (p3 < nextP2) auditWord(word + "0");
  else dfs(word + "0", nextP2, p3);
  dfs(word + "1", nextP2, p3 * 3n);
}

dfs("", 1n, 1n);

// Audit the order-preserving coupling of the two cell thresholds without
// enumerating ideals.  The proof uses only 0 < Delta < M; this loop checks
// every pair of ballot-board cells at the requested fixed weights.
for (let s = 3; s <= maxCellWeight; ++s) {
  const k = Math.ceil(s * Math.log2(3));
  const {M, P} = parameters(k, s);
  const PInverse = inverse(P, M);
  const cells = [];
  for (let i = 1; i < s; ++i) {
    const cap = Math.floor(i * Math.log2(3)) - i;
    for (let r = 1; r <= cap; ++r) cells.push(cell(k, s, i, r, PInverse));
  }
  for (let i = 0; i < cells.length; ++i) {
    for (let j = i + 1; j < cells.length; ++j) {
      const signL = sign(cells[i].L - cells[j].L);
      const signV = sign(cells[i].V - cells[j].V);
      assert(signL === 0 || signV === 0 || signL === signV,
        "cell threshold order reversed");
      if (signL === 0 || signV === 0) ++counts.thresholdTies;
      ++counts.thresholdPairs;
    }
  }
}

// Mandatory regressions.
const halfWord =
  "1111101010111111111101101010100010100111011000";
const half = wordData(halfWord);
assert(primitiveFirstCrossing(halfWord), "half-bound word lost its barrier");
assert(half.s === 29 && half.tau === 14n && half.E === 1n,
  "half-bound regression");
assert(2n * half.tau < BigInt(half.s), "half-bound must fail");

const almostWord = "10111010";
const almost = wordData(almostWord);
assert(!primitiveFirstCrossing(almostWord), "almost-barrier became admissible");
assert(almost.D === 13n && almost.C === 373n &&
  almost.rho === 9n && almost.Z === 10n && almost.E === 0n,
  "almost-barrier regression");

const islandM = 8192n, islandD = 1631n, islandP = islandM - islandD;
const islandCarries = [11293n, 12061n, 12317n, 13085n];
const islandColors = islandCarries.map(C =>
  Number(coordinates(C, islandM, islandP, islandD).E));
assert(islandColors.join(",") === "1,1,1,0", "abstract island regression");

console.log(JSON.stringify({
  certificate: "anchored FCD order-ideal audit",
  maxLength,
  maxCellWeight,
  counts,
  regressions: {
    halfBound: {s: half.s, tau: half.tau.toString(), E: half.E.toString()},
    almostBarrier: {
      C: almost.C.toString(), rho: almost.rho.toString(),
      Z: almost.Z.toString(), E: almost.E.toString()
    },
    abstractIsland: islandColors
  }
}, null, 2));
