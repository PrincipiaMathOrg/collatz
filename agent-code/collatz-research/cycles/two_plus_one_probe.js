#!/usr/bin/env node
"use strict";

// Exact finite audit for the first closed 2+1 subcase:
// internal pair gap 1 and isolated run-start residue e <= pair residue c.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function gcd(a, b) {
  if (a < 0n) a = -a;
  if (b < 0n) b = -b;
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

function affineData(word) {
  let C = 0n;
  let A = 0n;
  for (const a of word) {
    C = 3n * C + (1n << A);
    A += BigInt(a);
  }
  return {C, A};
}

const maxR = Number(process.argv[2] || 30);
let total = 0;
let gap1 = 0;
let gap2 = 0;
let closed = 0;
let gap1Residual = 0;
let gap2Residual = 0;
let fullCarry = 0;
let closedProper = 0;
let residualProper = 0;
let smallestResidualProper = null;

for (let r = 4; r <= maxR; ++r) {
  const N = Math.ceil(Math.log2(3) * r - 1e-12);
  if (gcd(BigInt(N), BigInt(r)) !== 1n) continue;
  const D = (1n << BigInt(N)) - 3n ** BigInt(r);
  for (let i = 1; i < r; ++i) for (let j = i + 1; j < r; ++j) {
    for (let k = j + 1; k < r; ++k) {
      const T = [i,j,k];
      const leftPair = j === i + 1 && k !== j + 1;
      const rightPair = k === j + 1 && j !== i + 1;
      if (!leftPair && !rightPair) continue;
      const pairStart = leftPair ? i : j;
      const singleton = leftPair ? k : i;
      const levels = Array(r).fill(0);
      for (const t of T) levels[t] = 1;
      const positions = levels.map((m, q) => Math.floor(q * N / r) - m);
      let valid = positions[0] === 0 && positions[r - 1] < N;
      for (let q = 1; q < r; ++q) if (positions[q] <= positions[q - 1]) valid = false;
      if (!valid) continue;

      ++total;
      const internalGap =
        Math.floor((pairStart + 1) * N / r) - Math.floor(pairStart * N / r);
      const c = (pairStart * N) % r;
      const e = (singleton * N) % r;
      const isClosed = internalGap === 1 && e <= c;
      if (internalGap === 1) {
        ++gap1;
        if (isClosed) ++closed;
        else ++gap1Residual;
      } else {
        assert(internalGap === 2, "unexpected internal gap");
        ++gap2;
        ++gap2Residual;
      }

      const word = [];
      for (let q = 0; q < r - 1; ++q) word.push(positions[q + 1] - positions[q]);
      word.push(N - positions[r - 1]);
      const data = affineData(word);
      const common = gcd(D, data.C);
      if (common === D) ++fullCarry;
      if (common > 1n && common < D) {
        if (isClosed) ++closedProper;
        else {
          ++residualProper;
          const record = {r,N,T,pairStart,singleton,internalGap,c,e,D,C:data.C,common,word};
          if (smallestResidualProper === null || r < smallestResidualProper.r) {
            smallestResidualProper = record;
          }
        }
      }
    }
  }
}

if (maxR === 30) {
  assert(total === 1234, "unexpected total 2+1 count");
  assert(gap1 === 826 && gap2 === 408,
    "unexpected pair-gap split: " + gap1 + "," + gap2);
  assert(closed === 283, "unexpected closed-subcase count: " + closed);
  assert(gap1Residual === 543 && gap2Residual === 408,
    "unexpected residual split: " + gap1Residual + "," + gap2Residual);
}
assert(fullCarry === 0, "finite full carry found");
assert(99n ** 5n * 3n ** 24n < 8n ** 24n,
  "99^(5/24)<8/3 failed");
assert(139n ** 5n * 5n ** 24n < 14n ** 24n,
  "139^(5/24)<14/5 failed");
assert(72057431991n > 3n ** 16n, "period barrier certificate failed");

console.log("max_r=" + maxR);
console.log("two_plus_one_total=" + total);
console.log("internal_gap_1=" + gap1);
console.log("internal_gap_2=" + gap2);
console.log("closed_gap1_e_le_c=" + closed);
console.log("residual_gap1_e_gt_c=" + gap1Residual);
console.log("residual_gap2=" + gap2Residual);
console.log("closed_proper_factors=" + closedProper);
console.log("residual_proper_factors=" + residualProper);
if (smallestResidualProper) {
  const e = smallestResidualProper;
  console.log("smallest_residual_proper=" +
    [e.r,e.N,e.T.join("."),e.pairStart,e.singleton,e.internalGap,e.c,e.e,
      e.D,e.C,e.common,e.word.join(".")].join(":"));
}
console.log("two_plus_one_subcase_certificate_passed=true");
