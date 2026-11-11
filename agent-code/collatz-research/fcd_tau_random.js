#!/usr/bin/env node
"use strict";

// Randomized falsification harness for the reduced FCD residue inequality.
// A primitive coefficient-first-crossing word with s one-bits has
// k = ceil(s log_2 3), begins with a one, ends with a zero, and the j-th
// one-bit (one-indexed) may occur at any position i_j satisfying
// i_1 = 0 and i_j <= floor((j-1) log_2 3).

const trials = Number(process.argv[2] || 100000);
const maxS = Number(process.argv[3] || 300);
let state = BigInt(process.argv[4] || 0x5eed1234);

function rnd32() {
  state ^= state << 13n;
  state ^= state >> 17n;
  state ^= state << 5n;
  state &= 0xffffffffn;
  return Number(state);
}

function egcd(a, b) {
  let oldR = a, r = b;
  let oldS = 1n, s = 0n;
  while (r !== 0n) {
    const q = oldR / r;
    [oldR, r] = [r, oldR - q * r];
    [oldS, s] = [s, oldS - q * s];
  }
  return [oldR, oldS];
}

function mod(a, m) {
  const z = a % m;
  return z < 0n ? z + m : z;
}

function inverse(a, m) {
  const [g, x] = egcd(a, m);
  if (g !== 1n) throw new Error("nonunit");
  return mod(x, m);
}

// deadline[j] = floor(j log_2 3), calculated with exact integers.
const deadline = new Array(maxS + 1);
let p3 = 1n;
let p2 = 1n;
let exponent2 = 0;
deadline[0] = 0;
for (let j = 1; j <= maxS; ++j) {
  p3 *= 3n;
  while ((p2 << 1n) <= p3) {
    p2 <<= 1n;
    ++exponent2;
  }
  deadline[j] = exponent2;
}

const cache = new Map();
function totals(s) {
  if (cache.has(s)) return cache.get(s);
  const k = deadline[s] + 1;
  const M = 1n << BigInt(k);
  const P = 3n ** BigInt(s);
  const D = M - P;
  const invM = inverse(M % D, D);
  const value = {k, M, P, D, invM};
  cache.set(s, value);
  return value;
}

let bestNum = null;
let bestDen = 1n;
let best = null;
let leastMargin = null;
let leastMarginWitness = null;
for (let trial = 0; trial < trials; ++trial) {
  const s = 2 + (rnd32() % (maxS - 1));
  const positions = [0];
  let position = 0;
  let C = 1n;
  for (let j = 2; j <= s; ++j) {
    const lo = position + 1;
    const hi = deadline[j - 1];
    const span = hi - lo + 1;
    // Mix uniform choices with deadline-heavy choices, since extremizers often
    // place late one-bits near their coefficient barrier.
    const raw = rnd32();
    if ((raw & 3) === 0) position = hi;
    else if ((raw & 3) === 1) position = lo;
    else position = lo + (raw % span);
    positions.push(position);
    C = 3n * C + (1n << BigInt(position));
  }
  const {k, M, D, invM} = totals(s);
  const tau = mod(C * invM, D);
  const margin = M * tau - C;
  if (bestNum === null || tau * bestDen < bestNum * BigInt(s)) {
    bestNum = tau;
    bestDen = BigInt(s);
    best = {trial, s, k, tau, D, C, positions: positions.slice()};
  }
  if (3n * tau < BigInt(s)) {
    console.log(JSON.stringify({status: "COUNTEREXAMPLE", ...best}, (_, v) =>
      typeof v === "bigint" ? v.toString() : v));
    process.exit(1);
  }
  if (margin <= 0n) {
    console.log(JSON.stringify({
      status: "FCD_COUNTEREXAMPLE",
      trial, s, k, tau, D, C, margin, positions
    }, (_, v) => typeof v === "bigint" ? v.toString() : v, 2));
    process.exit(2);
  }
  if (leastMargin === null || margin < leastMargin) {
    leastMargin = margin;
    leastMarginWitness = {trial, s, k, tau, D, C, margin,
      positions: positions.slice()};
  }
}

console.log(JSON.stringify({
  status: "no counterexample",
  trials,
  maxS,
  seed: state.toString(),
  bestTauRatio: best,
  leastFcdMargin: leastMarginWitness
}, (_, v) => typeof v === "bigint" ? v.toString() : v, 2));
