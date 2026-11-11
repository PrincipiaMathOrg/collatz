#!/usr/bin/env node
"use strict";

/*
Construct a high-dimensional translated punctured corner cube on a genuine
q_s=2 Ferrers geometry.  This is a method countermodel, not an anchored
Collatz carry.

We find a chain of nonterminal corner cells minimizing sum V by dynamic
programming in the product order (row,level).  If

  sum V < D  and  rho + sum L < M,

with odd rho D greater than the total removed weight, then C*=rho D is a
representable top and every nonempty deletion is a numerical-semigroup gap.
The proof covers all 2^dimension-1 deletions without enumerating them.
*/

const weight = Number(process.argv[2] || 1000);
const targetDimension = Number(process.argv[3] || 39);
const filterFactor = Number(process.argv[4] || 4);

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function bitLength(n) {
  assert(n > 0n, "bit length requires positive input");
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

function better(a, b) {
  if (a === null) return b;
  if (b === null) return a;
  if (a.costV !== b.costV) return a.costV < b.costV ? a : b;
  if (a.totalL !== b.totalL) return a.totalL < b.totalL ? a : b;
  return a.totalDelta <= b.totalDelta ? a : b;
}

class FenwickMinimum {
  constructor(size) {
    this.size = size;
    this.tree = Array(size + 1).fill(null);
  }

  update(index, value) {
    for (let i = index; i <= this.size; i += i & -i) {
      this.tree[i] = better(this.tree[i], value);
    }
  }

  query(index) {
    let result = null;
    for (let i = index; i > 0; i -= i & -i) {
      result = better(result, this.tree[i]);
    }
    return result;
  }
}

assert(weight >= 3, "weight must be at least three");
assert(targetDimension >= 1, "dimension must be positive");
assert(filterFactor >= 1, "filter factor must be positive");

const P = 3n ** BigInt(weight);
const N = bitLength(P);
assert(N - bitLength(P / 3n) === 1, "chosen weight is not a q_s=2 row");
const M = 1n << BigInt(N);
const D = M - P;
const inverseP = inverse(P, M);
const maxima = Array(weight).fill(0);
for (let i = 1; i < weight; ++i) {
  maxima[i] = bitLength(3n ** BigInt(i)) - 1 - i;
}
const terminalLevel = maxima[weight - 1];
assert(maxima[weight - 2] === terminalLevel - 1,
  "q2 terminal cap regression failed");

const trees = Array.from({length: targetDimension + 1},
  () => new FenwickMinimum(terminalLevel + 1));
let scannedCells = 0;
let retainedCells = 0;
let createdStates = 0;

let rowDelta = 2n * 3n ** BigInt(weight - 2);
for (let row = 1; row < weight - 1; ++row) {
  if (row > 1) rowDelta = (2n * rowDelta) / 3n;
  let value = rowDelta;
  let L = mod(value * inverseP, M);
  const pending = [];
  for (let level = 1; level <= maxima[row]; ++level) {
    if (level > 1) {
      value *= 2n;
      L = (2n * L) % M;
    }
    ++scannedCells;
    const numerator = D * L + value;
    assert(numerator % M === 0n, "nonintegral cell lift");
    const V = numerator / M;
    if (V * BigInt(targetDimension) >= BigInt(filterFactor) * D) continue;
    ++retainedCells;
    const maximumLength = Math.min(targetDimension, row, level);
    for (let length = 1; length <= maximumLength; ++length) {
      let previous = null;
      if (length > 1) {
        previous = trees[length - 1].query(level - 1);
        if (previous === null) continue;
      }
      const node = {
        row,
        level,
        value,
        L,
        V,
        length,
        costV: V + (previous === null ? 0n : previous.costV),
        totalL: L + (previous === null ? 0n : previous.totalL),
        totalDelta: value + (previous === null ? 0n : previous.totalDelta),
        previous
      };
      pending.push(node);
      ++createdStates;
    }
  }
  for (const node of pending) trees[node.length].update(node.level, node);
}

const best = trees[targetDimension].query(terminalLevel);
assert(best !== null, "no chain reached the target dimension under the filter");
const corners = [];
for (let node = best; node !== null; node = node.previous) corners.push(node);
corners.reverse();
assert(corners.length === targetDimension, "reconstructed chain has wrong length");

let rho = best.totalDelta / D + 1n;
if ((rho & 1n) === 0n) ++rho;
const translatedCarry = rho * D;
const allProperGap = best.costV < D && rho + best.totalL < M &&
  translatedCarry > best.totalDelta;

assert(best.costV * M === D * best.totalL + best.totalDelta,
  "summed lift identity failed");
assert(allProperGap,
  "best chain does not certify a simple punctured translation; increase weight or filter");

for (let j = 1; j < corners.length; ++j) {
  assert(corners[j - 1].row < corners[j].row,
    "corner rows are not strictly increasing");
  assert(corners[j - 1].level < corners[j].level,
    "corner levels are not strictly increasing");
}

const delays = Array(weight).fill(0);
let cornerIndex = 0;
let currentLevel = 0;
for (let row = 1; row < weight - 1; ++row) {
  if (cornerIndex < corners.length && corners[cornerIndex].row === row) {
    currentLevel = corners[cornerIndex].level;
    ++cornerIndex;
  }
  delays[row] = currentLevel;
  assert(delays[row] <= maxima[row], "constructed profile violates the ballot cap");
}
delays[weight - 1] = terminalLevel;

console.log(JSON.stringify({
  probe: "high-dimensional translated punctured q2 corner cube",
  weight,
  targetDimension,
  filterFactor,
  N,
  terminalLevel,
  scannedCells,
  retainedCells,
  createdStates,
  M: M.toString(),
  D: D.toString(),
  totalV: best.costV.toString(),
  totalL: best.totalL.toString(),
  totalDelta: best.totalDelta.toString(),
  rho: rho.toString(),
  translatedCarry: translatedCarry.toString(),
  inequalities: {
    totalVLessThanD: best.costV < D,
    rhoPlusTotalLLessThanM: rho + best.totalL < M,
    carryGreaterThanAllRemovals: translatedCarry > best.totalDelta
  },
  delays,
  corners: corners.map(corner => ({
    row: corner.row,
    level: corner.level,
    value: corner.value.toString(),
    L: corner.L.toString(),
    V: corner.V.toString()
  })),
  conclusion: "top color 0; every one of the 2^dimension-1 proper corner vertices has color 1",
  warning: "the carry is translated and is not the anchored carry of the displayed profile"
}, null, 2));
