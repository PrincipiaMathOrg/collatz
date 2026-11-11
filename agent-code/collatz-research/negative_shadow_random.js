#!/usr/bin/env node
"use strict";

// Random falsification harness for the sufficient FCD shadow inequality
//   3 (m_0 - m_k) >= s,
// where k is the first shortcut time with 3^s < 2^k for the 3m-1 map.
// Only canonical starts m_0 < 2^k are relevant to the reduced residue tau.

const trials = Number(process.argv[2] || 200000);
const bits = Number(process.argv[3] || 160);
let rng = BigInt(process.argv[4] || 0x6d2b79f5);

function next32() {
  rng ^= rng << 13n;
  rng ^= rng >> 17n;
  rng ^= rng << 5n;
  rng &= 0xffffffffn;
  return rng;
}

function randomOdd(bitCount) {
  let x = 0n;
  for (let used = 0; used < bitCount; used += 32) x = (x << 32n) | next32();
  const excess = Math.ceil(bitCount / 32) * 32 - bitCount;
  if (excess > 0) x >>= BigInt(excess);
  x |= 1n;
  x |= 1n << BigInt(bitCount - 1);
  return x;
}

function firstCrossing(m0, cap = 20000) {
  let m = m0;
  let P = 1n;
  let M = 1n;
  let s = 0;
  let word = "";
  for (let k = 1; k <= cap; ++k) {
    if ((m & 1n) === 1n) {
      word += "1";
      m = (3n * m - 1n) >> 1n;
      P *= 3n;
      ++s;
    } else {
      word += "0";
      m >>= 1n;
    }
    M <<= 1n;
    if (P < M) return {m0, mk: m, gap: m0 - m, k, s, M, word};
  }
  return null;
}

let best = null;
let canonical = 0;
let nonCrossing = 0;
for (let t = 0; t < trials; ++t) {
  const width = 2 + Number(next32() % BigInt(bits - 1));
  const m0 = randomOdd(width);
  const z = firstCrossing(m0);
  if (z === null) {
    ++nonCrossing;
    continue;
  }
  if (z.m0 >= z.M) continue;
  ++canonical;
  if (z.s <= 1) continue;
  if (best === null || z.gap * BigInt(best.s) < best.gap * BigInt(z.s)) best = z;
  if (3n * z.gap < BigInt(z.s)) {
    console.log(JSON.stringify({status: "COUNTEREXAMPLE", trial: t, ...z},
      (_, v) => typeof v === "bigint" ? v.toString() : v, 2));
    process.exit(1);
  }
}

console.log(JSON.stringify({status: "no counterexample", trials, bits, canonical, nonCrossing, best},
  (_, v) => typeof v === "bigint" ? v.toString() : v, 2));
