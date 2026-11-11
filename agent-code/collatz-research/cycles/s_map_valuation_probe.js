#!/usr/bin/env node
"use strict";

// Exact DFS for subthreshold S-map trajectories.  For each r, enumerate all
// q < 2^(e-1) whose spike positions are contained in the Beatty set, then
// record v2(3*z0-1) and the final low-degree spike signature.

function bitLength(n) { return n.toString(2).length; }

function valuation2(n) {
  if (n === 0n) return Infinity;
  let v = 0;
  while ((n & 1n) === 0n) { n >>= 1n; ++v; }
  return v;
}

function extendResidue(A, B, L, residue, extra) {
  const oldModulus = 1n << BigInt(L);
  const choices = 1n << BigInt(extra);
  const newModulus = oldModulus * choices;
  for (let j = 0n; j < choices; ++j) {
    const candidate = residue + j * oldModulus;
    if ((A * candidate + B) % newModulus === 0n) return candidate;
  }
  throw new Error("unique 2-adic lift failed");
}

const maxR = Number(process.argv[2] || 100);
const minR = Number(process.argv[3] || 3);
let globalMax = -1;
let globalDelta = -Infinity;

for (let r = minR; r <= maxR; ++r) {
  const N = bitLength(3n ** BigInt(r) - 1n);
  const e = N - r;
  const limit = 1n << BigInt(e - 1);
  const K = new Set(Array.from({length:e - 1}, (_, i) =>
    Math.floor((i + 1) * r / e)));
  let leaves = 0;
  let rowMax = -1;
  let rowDelta = -Infinity;
  let deltaWitness = null;
  const witnesses = [];

  function visit(d, A, B, L, residue, spikes) {
    if (d === 0) {
      if (residue === 0n) return;
      ++leaves;
      const divisor = 1n << BigInt(L);
      const numerator = A * residue + B;
      if (numerator % divisor !== 0n) throw new Error("bad leaf");
      const z0 = numerator / divisor;
      const v = valuation2(3n * z0 - 1n);
      const V = spikes.length;
      const U = e - 1 - V;
      const lowSpikes = spikes.filter(x => x <= 12).sort((a,b)=>a-b);
      const row = {r,e,q:residue.toString(),z0:z0.toString(),v,U,V,
        lowSpikes, allSpikes:spikes.slice().sort((a,b)=>a-b)};
      if (v > rowMax) { rowMax = v; witnesses.length = 0; witnesses.push(row); }
      else if (v === rowMax && witnesses.length < 5) witnesses.push(row);
      if (v - U > rowDelta) { rowDelta = v - U; deltaWitness = row; }
      return;
    }

    const noA = 3n * A;
    const noB = 3n * B;
    const noL = L + 1;
    const noResidue = extendResidue(noA, noB, L, residue, 1);
    const noModulus = 1n << BigInt(noL);
    const noLeast = noResidue === 0n ? noModulus : noResidue;
    if (noLeast < limit) visit(d - 1, noA, noB, noL, noResidue, spikes);

    if (K.has(d)) {
      const yesA = 3n * A;
      const yesB = 3n * B + (1n << BigInt(L));
      const yesL = L + 2;
      const yesResidue = extendResidue(yesA, yesB, L, residue, 2);
      const yesModulus = 1n << BigInt(yesL);
      const yesLeast = yesResidue === 0n ? yesModulus : yesResidue;
      if (yesLeast < limit) {
        spikes.push(d);
        visit(d - 1, yesA, yesB, yesL, yesResidue, spikes);
        spikes.pop();
      }
    }
  }

  visit(r - 1, 1n, 0n, 0, 0n, []);
  if (rowMax > globalMax || rowDelta > globalDelta || rowMax >= 4) {
    console.log(JSON.stringify({r,e,leaves,rowMax,rowDelta,witnesses,deltaWitness}));
  }
  if (rowMax > globalMax) globalMax = rowMax;
  if (rowDelta > globalDelta) globalDelta = rowDelta;
  if (rowDelta > 0) {
    console.error("RELATIVE_BOUND_COUNTEREXAMPLE");
    process.exitCode = 1;
    break;
  }
}

console.log(JSON.stringify({maxR,globalMax,globalDelta}));
