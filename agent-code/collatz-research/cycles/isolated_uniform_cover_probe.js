#!/usr/bin/env node
"use strict";

// Exploratory normalized cover.  Every test implemented below is a safe
// upper bound, but this file is not itself a theorem certificate.

const r = Number(process.argv[2] || 503);
const step = Number(process.argv[3] || 1);
const anchorOnly = process.argv.includes("--anchor-only");
const N = Math.ceil(r * Math.log2(3) - 1e-12);
const B = N - r;
const L = r - B;
const M = B - L;
const C = 374 / 125;
const target = Math.log(C);
const mu = M / r;
const rootWeight = 81 / 64;
const anchors = [0, L, B];
const kval = q => q === 0 ? 12 : q === L ? 9 : 8;

function gcd(a, b) {
  while (b) [a, b] = [b, a % b];
  return Math.abs(a);
}

function directLog(c1, c2, c3) {
  const x = Math.exp(2 * Math.log(2) / r);
  const energy = Math.pow(x, c3 + 1) +
    (1 + x) * (Math.pow(x, c3 - c1) + Math.pow(x, c3 - c2) + 1);
  return 0.5 * Math.log(energy);
}

function anchorBound(c1, c2, c3, qs) {
  const cs = [c1, c2, c3];
  const ts = qs.map((q, i) => q - cs[i]);
  const lo = Math.min(0, ...ts);
  const hi = Math.max(0, ...ts);
  const m = hi - lo + 1;
  if (m >= 2 * M) return null;
  const Q = m >= M ? 1 : 0;
  const d = m - Q * M;
  let g = 12;
  for (const q of qs) g = gcd(g, kval(q));
  const terms = [];
  for (let i = 0; i < 3; ++i) {
    const e = ts[i] - lo;
    const a = kval(qs[i]) / g;
    terms.push([e + 1, a], [e, -a]);
  }
  terms.push([1 - lo, -12 / g]);
  const folded = new Map();
  for (const [e, a] of terms) {
    const j = Math.floor(e / M);
    const s = e - j * M;
    const amplitude = a * Math.pow(9, j) * Math.pow(8, Q - j);
    const key = `${s},${Math.sign(amplitude)}`;
    folded.set(key, (folded.get(key) || 0) + Math.abs(amplitude));
  }
  let unweightedEnergy = 0;
  for (const amplitude of folded.values()) unweightedEnergy += amplitude * amplitude;
  const energy = rootWeight * unweightedEnergy;
  const log = mu * ((d / M) * Math.log(8) + 0.5 * Math.log(energy));
  return { log, m, Q, d, label: qs.map(q => q === 0 ? "0" : q === L ? "L" : "B").join("") };
}

let total = 0;
let direct = 0;
let anchored = 0;
let uncovered = 0;
let first = null;
let worst = null;
const winners = new Map();
const residualBins = new Map();

for (let c1 = 1; c1 < B; c1 += step) {
  for (let c2 = c1 + 1; c2 < B; c2 += step) {
    for (let c3 = c2 + 1; c3 < B; c3 += step) {
      if (c2 - c1 === L || c3 - c2 === L || c3 - c1 === L) continue;
      ++total;
      let best = anchorOnly ? Infinity : directLog(c1, c2, c3);
      let label = "r";
      if (best < target) {
        ++direct;
        continue;
      }
      for (const q1 of anchors) for (const q2 of anchors) for (const q3 of anchors) {
        const b = anchorBound(c1, c2, c3, [q1, q2, q3]);
        if (b && b.log < best) {
          best = b.log;
          label = b.label;
        }
      }
      if (best < target) {
        ++anchored;
        winners.set(label, (winners.get(label) || 0) + 1);
      } else {
        ++uncovered;
        const item = {c1,c2,c3,x1:c1/r,x2:c2/r,x3:c3/r,best,label,margin:target-best};
        if (!first) first = item;
        if (!worst || best < worst.best) worst = item;
        const key = [Math.floor(10*c1/r),Math.floor(10*c2/r),Math.floor(10*c3/r)].join("");
        residualBins.set(key,(residualBins.get(key)||0)+1);
      }
    }
  }
}

console.log(JSON.stringify({r,N,B,L,M,step,anchorOnly,total,direct,anchored,uncovered,first,worst,
  winners:Object.fromEntries([...winners].sort((a,b)=>b[1]-a[1])),
  residualBins:Object.fromEntries([...residualBins].sort((a,b)=>b[1]-a[1]).slice(0,30))},null,2));
