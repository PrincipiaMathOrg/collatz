#!/usr/bin/env node
"use strict";

function gcd(a, b) {
  while (b !== 0n) [a, b] = [b, a % b];
  return a < 0n ? -a : a;
}

function carry(word) {
  let C = 0n;
  let A = 0;
  for (const a of word) {
    C = 3n * C + (1n << BigInt(A));
    A += a;
  }
  return {C, A};
}

function lessRatio(a, b, c, d) {
  return a * d < c * b;
}

const maxR = Number(process.argv[2] || 32);
let globalMinQ = null;
let globalMinQOverTwoU = null;
let qAtMostTwoU = 0n;
let profiles = 0n;

for (let r = 3; r <= maxR; ++r) {
  const P = 3n ** BigInt(r);
  const N = (P - 1n).toString(2).length;
  const M = 1n << BigInt(N);
  const D = M - P;
  const e = N - r;
  const B = Array.from({length: r + 1}, (_, i) => Math.floor(i * N / r));
  const base = Array.from({length: r}, (_, i) => B[i + 1] - B[i]);
  const eligible = [];
  for (let i = 0; i < r - 1; ++i) if (base[i] === 2) eligible.push(i);
  if (eligible.length >= 31) throw new Error("mask cutoff");
  let rowMin = null;
  let rowMinRatio = null;
  for (let mask = 1; mask < 2 ** eligible.length; ++mask) {
    ++profiles;
    const word = base.slice();
    let U = 0;
    for (let bit = 0; bit < eligible.length; ++bit) {
      if ((mask & 2 ** bit) !== 0) {
        --word[eligible[bit]];
        ++U;
      }
    }
    word[r - 1] += U;
    const {C, A} = carry(word);
    if (A !== N) throw new Error("weight");
    const g = gcd(C, D);
    const q = D / g;
    const twoU = 1n << BigInt(U);
    const witness = {r, e, U, q, g, D, C, word: word.join(",")};
    if (rowMin === null || q < rowMin.q) rowMin = witness;
    if (rowMinRatio === null || lessRatio(q, twoU,
        rowMinRatio.q, rowMinRatio.twoU)) rowMinRatio = {...witness, twoU};
    if (globalMinQ === null || q < globalMinQ.q) globalMinQ = witness;
    if (globalMinQOverTwoU === null || lessRatio(q, twoU,
        globalMinQOverTwoU.q, globalMinQOverTwoU.twoU)) {
      globalMinQOverTwoU = {...witness, twoU};
    }
    if (q <= twoU) ++qAtMostTwoU;
  }
  console.log(JSON.stringify({r,
    minQ:{q:rowMin.q.toString(),U:rowMin.U,word:rowMin.word},
    minQOverTwoU:{q:rowMinRatio.q.toString(),twoU:rowMinRatio.twoU.toString(),
      U:rowMinRatio.U,word:rowMinRatio.word}}));
}

console.log(JSON.stringify({maxR,profiles,qAtMostTwoU,globalMinQ,
  globalMinQOverTwoU},(_,x)=>typeof x === "bigint" ? x.toString() : x,2));
