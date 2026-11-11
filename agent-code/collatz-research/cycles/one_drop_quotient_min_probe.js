#!/usr/bin/env node
"use strict";

function mod(a, m) {
  const z = a % m;
  return z < 0n ? z + m : z;
}

function egcd(a, b) {
  if (b === 0n) return [a, 1n, 0n];
  const [g, x, y] = egcd(b, a % b);
  return [g, y, x - (a / b) * y];
}

function inverse(a, m) {
  const [g, x] = egcd(mod(a, m), m);
  if (g !== 1n) throw new Error("nonunit");
  return mod(x, m);
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

const maxR = Number(process.argv[2] || 28);
let globalBest = null;
let residueBelowHalf = 0n;
let residueBelowBound = 0n;
let firstResidueBelowHalf = null;

for (let r = 3; r <= maxR; ++r) {
  const P = 3n ** BigInt(r);
  const N = (P - 1n).toString(2).length;
  const e = N - r;
  const M = 1n << BigInt(N);
  const B = Array.from({length: r + 1}, (_, i) => Math.floor(i * N / r));
  const base = Array.from({length: r}, (_, i) => B[i + 1] - B[i]);
  const eligible = [];
  for (let i = 0; i < r - 1; ++i) {
    if (base[i] === 2) eligible.push(i);
  }
  const invM = inverse(M, P);
  let best = null;
  for (let mask = 1; mask < 2 ** eligible.length; ++mask) {
    const selected = new Set();
    const word = base.slice();
    let U = 0;
    for (let bit = 0; bit < eligible.length; ++bit) {
      if ((mask & 2 ** bit) !== 0) {
        selected.add(eligible[bit]);
        --word[eligible[bit]];
        ++U;
      }
    }
    word[r - 1] += U;
    const {C, A} = carry(word);
    if (A !== N) throw new Error("weight");
    const tau = mod(C * invM, P);
    const t = (M * tau - C) / P;
    const bound = (1n << BigInt(e)) - 1n;
    const residue = t % (1n << BigInt(e));
    if (residue < (1n << BigInt(e - 1))) {
      ++residueBelowHalf;
      if (firstResidueBelowHalf === null) {
        firstResidueBelowHalf = {r,e,U,t,residue,word:word.join(",")};
      }
    }
    if (residue < bound) ++residueBelowBound;
    if (best === null || lessRatio(t, bound, best.t, best.bound)) {
      const J = eligible.filter(j => !selected.has(j));
      const k = J.slice().reverse().map(j => r - 1 - j);
      const spike = new Map();
      for (let m = 0; m < k.length; ++m) {
        spike.set(k[m], 1n << BigInt(k.length - 1 - m));
      }
      const qs = [];
      let q = ((1n << BigInt(e)) * tau + (1n << BigInt(J.length))) / 3n;
      qs.push(q);
      for (let degree = 1; degree < r; ++degree) {
        q = (2n * q - (spike.get(degree) || 0n)) / 3n;
        qs.push(q);
      }
      if (2n * q !== t + 1n) throw new Error("terminal quotient");
      best = {r, N, e, U, V: J.length, J, k, tau, t, bound,
        word: word.join(","), tBinary: t.toString(2),
        q: qs.map(x => x.toString())};
    }
  }
  if (globalBest === null || lessRatio(best.t, best.bound,
      globalBest.t, globalBest.bound)) globalBest = best;
  console.log(JSON.stringify(best, (_, x) => typeof x === "bigint" ? x.toString() : x));
}

console.log("global=" + JSON.stringify(globalBest,
  (_, x) => typeof x === "bigint" ? x.toString() : x, 2));
console.log(JSON.stringify({residueBelowHalf,residueBelowBound,
  firstResidueBelowHalf},(_,x)=>typeof x === "bigint"?x.toString():x,2));
