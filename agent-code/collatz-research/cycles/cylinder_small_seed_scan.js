#!/usr/bin/env node
"use strict";

// Exploratory forward scan.  For each small odd ordinary seed, locate
// prefixes which are binary-height deformations of the rational mechanical
// word and test rho > 2^T directly.  This is a falsification harness only.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function v2(n) {
  let a = 0;
  while ((n & 1n) === 0n) {
    n >>= 1n;
    ++a;
  }
  return a;
}

function bitLength(n) {
  return n.toString(2).length;
}

const maxSeed = Number(process.argv[2] || 1000000);
const maxR = Number(process.argv[3] || 160);
const N = [0];
let p3 = 1n;
for (let r = 1; r <= maxR; ++r) {
  p3 *= 3n;
  N.push(bitLength(p3));
}

let candidates = 0;
let binary = 0;
let violations = 0;
let best = null;
let longest = null;

for (let seed = 1; seed <= maxSeed; seed += 2) {
  let x = BigInt(seed);
  const prefix = [0];
  const word = [];
  for (let r = 1; r <= maxR; ++r) {
    const y = 3n * x + 1n;
    const a = v2(y);
    x = y >> BigInt(a);
    word.push(a);
    prefix.push(prefix[r - 1] + a);
    if (r < 3 || prefix[r] !== N[r]) continue;
    ++candidates;
    let T = 0;
    let previous = 0;
    let ok = true;
    let heightString = "0";
    for (let j = 1; j <= r; ++j) {
      const B = Math.floor(j * N[r] / r);
      const height = B - prefix[j];
      if (height !== 0 && height !== 1) {
        ok = false;
        break;
      }
      T += Number(height !== previous);
      previous = height;
      heightString += height;
    }
    if (!ok || previous !== 0 || T === 0) continue;
    if (BigInt(seed) >= (1n << BigInt(N[r] + 1))) continue;
    ++binary;
    if (best === null || BigInt(seed) * best.power < best.seed * (1n << BigInt(T))) {
      best = {seed: BigInt(seed), power: 1n << BigInt(T), r, T,
        endpoint: x, word: word.join("."), heights: heightString};
    }
    if (longest === null || r > longest.r) {
      longest = {seed, r, T, endpoint: x.toString(), word: word.join("."),
        heights: heightString};
    }
    if (BigInt(seed) <= (1n << BigInt(T))) {
      ++violations;
      console.log(JSON.stringify({violation: true, seed, r, T,
        endpoint: x.toString(), word: word.join("."), heights: heightString}));
      process.exit(0);
    }
  }
}

console.log(JSON.stringify({maxSeed, maxR, candidates, binary, violations,
  best: best === null ? null : {...best, seed: best.seed.toString(),
    power: best.power.toString(), endpoint: best.endpoint.toString()},
  longest}, null, 2));
