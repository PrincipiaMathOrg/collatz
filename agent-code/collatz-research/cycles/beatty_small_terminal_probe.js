#!/usr/bin/env node
"use strict";

// Search terminal quotient candidates q=s/2 below the conjectured threshold.
// The backward normalized synthetic recurrence determines its spike set:
//   even x -> 3x/2 (no spike), x == 1 mod 4 -> (3x+1)/4 (spike).

function bitLength(n) { return n.toString(2).length; }

const maxR = Number(process.argv[2] || 32);
for (let r = 3; r <= maxR; ++r) {
  const N = bitLength(3n ** BigInt(r) - 1n);
  const e = N - r;
  const K = new Set(Array.from({length: e - 1}, (_, i) =>
    Math.floor((i + 1) * r / e)));
  const limit = 1n << BigInt(e - 1);
  let admissibleDynamics = 0;
  let subsetBeatty = 0;
  let bottomCongruence = 0;
  let closest = null;
  const beattyRows = [];
  for (let q = 1n; q < limit; ++q) {
    let x = q;
    const spikes = [];
    let valid = true;
    let offBeatty = 0;
    for (let d = r - 1; d >= 1; --d) {
      if ((x & 1n) === 0n) {
        x = 3n * x / 2n;
      } else if ((x & 3n) === 1n) {
        spikes.push(d);
        if (!K.has(d)) ++offBeatty;
        x = (3n * x + 1n) / 4n;
      } else {
        valid = false;
        break;
      }
    }
    if (!valid) continue;
    ++admissibleDynamics;
    const row = {q: q.toString(), spikes: spikes.slice().sort((a,b)=>a-b),
      offBeatty, z0: x.toString()};
    if (closest === null || offBeatty < closest.offBeatty) closest = row;
    if (offBeatty !== 0) continue;
    ++subsetBeatty;
    const V = spikes.length;
    const U = e - 1 - V;
    let bottomValuation = 0;
    let bottomNumerator = 3n * x - 1n;
    while (bottomNumerator !== 0n && (bottomNumerator & 1n) === 0n) {
      ++bottomValuation;
      bottomNumerator >>= 1n;
    }
    beattyRows.push({...row, U, bottomValuation});
    if (U < 1) continue;
    const modulus = 1n << BigInt(U + 1);
    if ((3n * x - 1n) % modulus !== 0n) continue;
    const tau = (3n * x - 1n) / modulus;
    if (tau <= 0n) continue;
    ++bottomCongruence;
    row.U = U;
    row.tau = tau.toString();
    console.log(JSON.stringify({r, N, e, COUNTEREXAMPLE: row}));
    process.exitCode = 1;
    break;
  }
  console.log(JSON.stringify({r, N, e, candidates: Number(limit - 1n),
    admissibleDynamics, subsetBeatty, bottomCongruence, closest, beattyRows}));
  if (process.exitCode) break;
}
