#!/usr/bin/env node
"use strict";

// Longest chain of nonterminal q_s=2 Ferrers corners whose reduced
// thresholds V_c are all even.  A terminal-preserving minimal FCD failure
// can use only such corners, because endpoint parity and the singleton
// flux identity force V_c even at every nonterminal removable corner.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function bitLength(n) {
  assert(n > 0n, "bit length requires a positive integer");
  return n.toString(2).length;
}

function mod(a, m) {
  const value = a % m;
  return value < 0n ? value + m : value;
}

function inverse(a, m) {
  let oldR = a;
  let r = m;
  let oldS = 1n;
  let s = 0n;
  while (r !== 0n) {
    const q = oldR / r;
    [oldR, r] = [r, oldR - q * r];
    [oldS, s] = [s, oldS - q * s];
  }
  assert(oldR === 1n, "inverse does not exist");
  return mod(oldS, m);
}

const maximumWeight = Number(process.argv[2] || 256);
const singleWeight = process.argv.includes("--single");
const summaryOnly = process.argv.includes("--summary");
assert(Number.isInteger(maximumWeight) && maximumWeight >= 3,
  "usage: q2_even_corner_chain_probe.js MAX_WEIGHT [--single]");

const powers3 = [1n];
const ceilings = [0];
for (let i = 1; i <= maximumWeight; ++i) {
  powers3.push(3n * powers3[i - 1]);
  ceilings.push(bitLength(powers3[i]));
}

function directParityRegression(weight, N, i, d, predicted) {
  if (weight > 32 || i > 16) return;
  const M = 1n << BigInt(N);
  const P = powers3[weight];
  const D = M - P;
  const delta = (1n << BigInt(i + d - 1)) * powers3[weight - 1 - i];
  const L = mod(delta * inverse(P, M), M);
  const numerator = D * L + delta;
  assert(numerator % M === 0n, "nonintegral direct threshold");
  const parity = Number((numerator / M) & 1n);
  assert(parity === predicted,
    `threshold parity formula failed at s=${weight},i=${i},d=${d}`);
}

function analyze(weight) {
  const N = ceilings[weight];
  if (N - ceilings[weight - 1] !== 1) return null;
  assert(ceilings[weight - 1] - ceilings[weight - 2] === 2,
    `q_s=2 predecessor identity failed at s=${weight}`);

  // One precision contains every bit of every inverse 3^{-(i+1)} used
  // below.  Reducing a 2-adic inverse from this modulus preserves all
  // lower bits.
  const precision = N + 2;
  const modulus = 1n << BigInt(precision);
  const inverse3 = inverse(3n, modulus);
  const inversePowers3 = [1n];
  for (let i = 1; i <= weight; ++i) {
    inversePowers3.push(mod(inversePowers3[i - 1] * inverse3, modulus));
  }

  const terminalLevel = N - weight - 1;
  const maximumLevel = terminalLevel - 1;
  assert(maximumLevel >= 0, `negative q_s=2 terminal level at s=${weight}`);

  // Fenwick tree for prefix maxima in the delay level.  Nodes are stored
  // separately so that a maximizing corner chain can be reconstructed.
  const fenwickLength = maximumLevel + 2;
  const treeLength = new Int32Array(fenwickLength + 1);
  const treeNode = new Int32Array(fenwickLength + 1);
  treeNode.fill(-1);
  const nodes = [];

  function query(levelExclusive) {
    let index = levelExclusive;
    let bestLength = 0;
    let bestNode = -1;
    while (index > 0) {
      if (treeLength[index] > bestLength) {
        bestLength = treeLength[index];
        bestNode = treeNode[index];
      }
      index -= index & -index;
    }
    return {length: bestLength, node: bestNode};
  }

  function update(level, length, node) {
    let index = level;
    while (index < treeLength.length) {
      if (length > treeLength[index]) {
        treeLength[index] = length;
        treeNode[index] = node;
      }
      index += index & -index;
    }
  }

  let evenCells = 0;
  let totalCells = 0;
  let thresholdTies = 0;
  let firstThresholdTie = null;
  const thresholdOwner = new Map();
  let bestLength = 0;
  let bestNode = -1;

  for (let i = 1; i <= weight - 2; ++i) {
    const m = ceilings[i] - 1 - i;
    const rowMaximum = Math.min(m, maximumLevel);
    const pending = [];
    for (let d = 1; d <= rowMaximum; ++d) {
      ++totalCells;
      const suffixExponent = N - i - d;
      const inverseBit = suffixExponent + 1;
      const lambda = BigInt.asUintN(inverseBit, inversePowers3[i + 1]);
      const parity = Number((inversePowers3[i + 1] >>
        BigInt(inverseBit)) & 1n);
      directParityRegression(weight, N, i, d, parity);
      const t = i + d - 1;
      const quotient = (powers3[i + 1] * lambda - 1n) >>
        BigInt(inverseBit);
      const V = (lambda << BigInt(t)) -
        powers3[weight - 1 - i] * quotient;
      assert(0n < V && V < (1n << BigInt(N)) - powers3[weight],
        `threshold escaped its reduced interval at s=${weight},i=${i},d=${d}`);
      assert(Number(V & 1n) === parity,
        `threshold parity reconstruction failed at s=${weight},i=${i},d=${d}`);
      const thresholdKey = V.toString();
      const owner = thresholdOwner.get(thresholdKey);
      if (owner === undefined) {
        thresholdOwner.set(thresholdKey, [i, d]);
      } else {
        ++thresholdTies;
        if (firstThresholdTie === null) {
          firstThresholdTie = {V: thresholdKey, first: owner, second: [i, d]};
        }
      }
      if (parity !== 0) continue;
      ++evenCells;
      const previous = query(d - 1);
      const node = nodes.length;
      nodes.push({i, d, parent: previous.node});
      pending.push({d, length: previous.length + 1, node});
      if (previous.length + 1 > bestLength) {
        bestLength = previous.length + 1;
        bestNode = node;
      }
    }
    // Do not allow two corners from the same row to feed one another.
    for (const entry of pending) update(entry.d, entry.length, entry.node);
  }

  const chain = [];
  for (let node = bestNode; node >= 0; node = nodes[node].parent) {
    chain.push([nodes[node].i, nodes[node].d]);
  }
  chain.reverse();
  assert(chain.length === bestLength, "corner chain reconstruction failed");

  return {
    weight,
    N,
    terminalLevel,
    totalCells,
    evenCells,
    thresholdTies,
    firstThresholdTie,
    maximumEvenNonterminalCorners: bestLength,
    maximumEvenTotalCorners: bestLength + 1,
    witness: summaryOnly ? undefined : chain
  };
}

const rows = [];
const start = singleWeight ? maximumWeight : 3;
for (let weight = start; weight <= maximumWeight; ++weight) {
  const row = analyze(weight);
  if (row !== null) rows.push(row);
}

console.log(JSON.stringify({
  probe: "longest all-even q_s=2 corner chain",
  maximumWeight,
  singleWeight,
  summaryOnly,
  q2Weights: rows.length,
  maximumChain: rows.reduce((maximum, row) =>
    Math.max(maximum, row.maximumEvenNonterminalCorners), 0),
  rows,
  warning: "formal corner geometry only; no target residue is asserted"
}, null, 2));
