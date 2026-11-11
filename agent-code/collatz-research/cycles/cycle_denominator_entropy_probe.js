#!/usr/bin/env node
"use strict";

/*
Falsification harness for a denominator--complexity principle.

For every primitive anchored strict-record one-strip word through maxR, this
program computes the reduced denominator

    q = (2^A - 3^r) / gcd(2^A - 3^r, C),

and compares it with three genuinely different complexity measures:

  * drops:       the number of accelerated exponents a_i > 1;
  * dropRuns:    the number of cyclic runs of such exponents;
  * transitions: changes in the Christoffel-deformation height path.

The point is diagnostic.  Any proposed theorem saying that arithmetic
denominator must grow with geometric complexity has to survive the smallest
denominators printed here.  Finite survival is evidence only, never a proof.
*/

const maxR = Number(process.argv[2] || 18);
const smallQCutoff = BigInt(process.argv[3] || 1000);
const alpha = Math.log2(3);

function abs(x) { return x < 0n ? -x : x; }
function gcd(a, b) {
  a = abs(a);
  b = abs(b);
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

function isProperPower(word) {
  const r = word.length;
  for (let d = 1; d < r; ++d) {
    if (r % d !== 0) continue;
    let same = true;
    for (let i = d; i < r; ++i) {
      if (word[i] !== word[i % d]) {
        same = false;
        break;
      }
    }
    if (same) return true;
  }
  return false;
}

function wordFromPositions(pos, A) {
  const word = [];
  for (let i = 0; i + 1 < pos.length; ++i) {
    word.push(pos[i + 1] - pos[i]);
  }
  word.push(A - pos[pos.length - 1]);
  return word;
}

function carryFromPositions(pos, powers3) {
  const r = pos.length;
  let C = 0n;
  for (let i = 0; i < r; ++i) {
    C += powers3[r - 1 - i] * (1n << BigInt(pos[i]));
  }
  return C;
}

function complexity(word, positions, A) {
  const r = word.length;
  const isDrop = word.map(a => a > 1);
  let drops = 0;
  let dropRuns = 0;
  for (let i = 0; i < r; ++i) {
    if (!isDrop[i]) continue;
    ++drops;
    if (!isDrop[(i + r - 1) % r]) ++dropRuns;
  }

  let transitions = 0;
  let previousHeight = 0;
  let maxHeight = 0;
  let minHeight = 0;
  for (let i = 1; i <= r; ++i) {
    const prefix = i === r ? A : positions[i];
    const height = Math.floor(i * A / r) - prefix;
    if (height !== previousHeight) ++transitions;
    if (height > maxHeight) maxHeight = height;
    if (height < minHeight) minHeight = height;
    previousHeight = height;
  }
  if (previousHeight !== 0) throw new Error("height path did not close");
  return {drops, dropRuns, transitions, minHeight, maxHeight};
}

function updateMinimum(map, key, row) {
  const old = map.get(key);
  if (old === undefined || row.q < old.q ||
      (row.q === old.q && row.r > old.r)) {
    map.set(key, row);
  }
}

function updateSmallQ(map, row) {
  if (row.q > smallQCutoff) return;
  const key = row.q.toString();
  const old = map.get(key);
  if (old === undefined || row.transitions > old.transitions ||
      (row.transitions === old.transitions && row.drops > old.drops) ||
      (row.transitions === old.transitions && row.drops === old.drops &&
       row.r > old.r)) {
    map.set(key, row);
  }
}

const minByDrops = new Map();
const minByDropRuns = new Map();
const minByTransitions = new Map();
const maxComplexityBySmallQ = new Map();
const rowCounts = [];
let totalPrimitive = 0;
let denominatorOneHits = 0;

for (let r = 2; r <= maxR; ++r) {
  const A = Math.ceil(r * alpha - 1e-12);
  const M = 1n << BigInt(A);
  const powers3 = [1n];
  for (let i = 1; i <= r; ++i) powers3.push(3n * powers3[i - 1]);
  const D = M - powers3[r];
  const bound = Array(r).fill(0);
  for (let i = 1; i < r; ++i) {
    bound[i] = A - Math.ceil((r - i) * alpha - 1e-12);
  }

  const pos = Array(r).fill(0);
  pos[0] = 0;
  if (r > 1) pos[1] = 1;
  let primitive = 0;

  function visit(i) {
    if (i === r) {
      const word = wordFromPositions(pos, A);
      if (isProperPower(word)) return;
      ++primitive;
      ++totalPrimitive;
      const C = carryFromPositions(pos, powers3);
      const g = gcd(C, D);
      const q = D / g;
      if (q === 1n) ++denominatorOneHits;
      const cx = complexity(word, pos, A);
      const row = {
        r,
        A,
        q,
        gcd: g,
        drops: cx.drops,
        dropRuns: cx.dropRuns,
        transitions: cx.transitions,
        minHeight: cx.minHeight,
        maxHeight: cx.maxHeight,
        word: word.join(".")
      };
      updateMinimum(minByDrops, cx.drops, row);
      updateMinimum(minByDropRuns, cx.dropRuns, row);
      updateMinimum(minByTransitions, cx.transitions, row);
      updateSmallQ(maxComplexityBySmallQ, row);
      return;
    }

    const lo = pos[i - 1] + 1;
    const hi = bound[i];
    for (let v = lo; v <= hi; ++v) {
      pos[i] = v;
      visit(i + 1);
    }
  }

  if (r === 2) {
    for (let v = 1; v <= bound[1]; ++v) {
      pos[1] = v;
      visit(2);
    }
  } else {
    visit(2);
  }
  rowCounts.push({r, A, primitive});
}

function serializeRow(row) {
  return {
    ...row,
    q: row.q.toString(),
    gcd: row.gcd.toString()
  };
}

function serializeMap(map, numericKeys) {
  const entries = [...map.entries()];
  entries.sort((a, b) => numericKeys ? Number(a[0]) - Number(b[0]) :
    (BigInt(a[0]) < BigInt(b[0]) ? -1 : 1));
  return Object.fromEntries(entries.map(([key, row]) =>
    [String(key), serializeRow(row)]));
}

console.log(JSON.stringify({
  target: "denominator-complexity falsification",
  maxR,
  smallQCutoff: smallQCutoff.toString(),
  totalPrimitive,
  denominatorOneHits,
  rowCounts,
  minimumDenominatorByDrops: serializeMap(minByDrops, true),
  minimumDenominatorByDropRuns: serializeMap(minByDropRuns, true),
  minimumDenominatorByTransitions: serializeMap(minByTransitions, true),
  maximumComplexityBySmallDenominator: serializeMap(maxComplexityBySmallQ, false),
  warning: "finite evidence only"
}, null, 2));
