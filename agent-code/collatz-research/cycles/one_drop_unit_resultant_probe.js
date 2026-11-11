#!/usr/bin/env node
"use strict";

// Diagnostic for the odd part of the exact unit-coefficient Laurent
// resultant in the one-drop gate.  This is finite evidence only.

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function abs(x) {
  return x < 0n ? -x : x;
}

function bitLength(x) {
  return x.toString(2).length;
}

function v2(x) {
  x = abs(x);
  let out = 0;
  while (x !== 0n && (x & 1n) === 0n) {
    x >>= 1n;
    out += 1;
  }
  return out;
}

function determinantBareiss(matrix) {
  const a = matrix.map((row) => row.slice());
  const n = a.length;
  if (n === 0) return 1n;
  let sign = 1n;
  let previous = 1n;
  for (let k = 0; k < n - 1; k += 1) {
    if (a[k][k] === 0n) {
      let pivotRow = k + 1;
      while (pivotRow < n && a[pivotRow][k] === 0n) pivotRow += 1;
      if (pivotRow === n) return 0n;
      [a[k], a[pivotRow]] = [a[pivotRow], a[k]];
      sign = -sign;
    }
    const pivot = a[k][k];
    for (let i = k + 1; i < n; i += 1) {
      for (let j = k + 1; j < n; j += 1) {
        const numerator = a[i][j] * pivot - a[i][k] * a[k][j];
        assert(numerator % previous === 0n, "Bareiss division");
        a[i][j] = numerator / previous;
      }
    }
    previous = pivot;
  }
  return sign * a[n - 1][n - 1];
}

// Norm of sum_{j=0}^{r-1} w[j] theta^j in Z[theta], theta^r=2.
function normTheta(w) {
  const r = w.length;
  const matrix = Array.from({length: r}, () => Array(r).fill(0n));
  for (let column = 0; column < r; column += 1) {
    for (let j = 0; j < r; j += 1) {
      const exponent = column + j;
      if (exponent < r) matrix[exponent][column] += w[j];
      else matrix[exponent - r][column] += 2n * w[j];
    }
  }
  return determinantBareiss(matrix);
}

function euclideanDivision(a, r) {
  let q = Math.floor(a / r);
  let rem = a - q * r;
  if (rem < 0) {
    q -= 1;
    rem += r;
  }
  assert(rem >= 0 && rem < r && a === q * r + rem, "Euclidean division");
  return {q, rem};
}

function profileResultant(r, e, spikeTimes) {
  const V = spikeTimes.length;
  const U = e - 1 - V;
  const terms = [{exponent: r * (U + 1), coefficient: 1n},
    {exponent: 0, coefficient: -1n}];
  for (let k = 1; k <= V; k += 1) {
    terms.push({
      exponent: r * (U + k) - e * spikeTimes[k - 1],
      coefficient: 1n,
    });
  }
  const divided = terms.map((term) => ({
    ...term, ...euclideanDivision(term.exponent, r),
  }));
  const minimumQ = Math.min(...divided.map((term) => term.q));
  const w = Array(r).fill(0n);
  for (const term of divided) {
    w[term.rem] += term.coefficient << BigInt(term.q - minimumQ);
  }
  const resultant = normTheta(w);
  if (resultant === 0n) return {U, V, resultant, odd: 0n, power2: null};
  const power2 = v2(resultant);
  return {U, V, resultant, odd: abs(resultant) >> BigInt(power2), power2};
}

const maxR = Number(process.argv[2] || 18);
let total = 0;
let above = 0;
let zero = 0;
let firstAbove = null;
let maximumRatio = null;

for (let r = 3; r <= maxR; r += 1) {
  const p = 3n ** BigInt(r);
  const N = bitLength(p - 1n);
  const e = N - r;
  const D = (1n << BigInt(N)) - p;
  const eligible = [];
  for (let t = 1; t < r; t += 1) {
    if (Math.floor(e * t / r) > Math.floor(e * (t - 1) / r)) {
      eligible.push(t);
    }
  }
  assert(eligible.length === e - 1, "eligible count");
  assert(eligible.length < 31, "mask is not Number-safe");
  let rowAbove = 0;
  let rowZero = 0;
  let rowMaximum = null;
  for (let mask = 0; mask < 2 ** eligible.length; mask += 1) {
    const spikeTimes = [];
    for (let j = 0; j < eligible.length; j += 1) {
      if ((mask & 2 ** j) !== 0) spikeTimes.push(eligible[j]);
    }
    const datum = profileResultant(r, e, spikeTimes);
    total += 1;
    if (datum.odd === 0n) {
      zero += 1;
      rowZero += 1;
      continue;
    }
    const ratio = {num: datum.odd, den: D, r, N, e,
      U: datum.U, V: datum.V, spikeTimes, power2: datum.power2};
    if (rowMaximum === null ||
        ratio.num * rowMaximum.den > rowMaximum.num * ratio.den) {
      rowMaximum = ratio;
    }
    if (maximumRatio === null ||
        ratio.num * maximumRatio.den > maximumRatio.num * ratio.den) {
      maximumRatio = ratio;
    }
    if (datum.odd >= D) {
      above += 1;
      rowAbove += 1;
      if (firstAbove === null) firstAbove = ratio;
    }
  }
  console.log(JSON.stringify({r, N, e, profiles: 2 ** eligible.length,
    rowAbove, rowZero, rowMaximum}, (_, x) =>
    typeof x === "bigint" ? x.toString() : x));
}

console.log(JSON.stringify({maxR, total, above, zero, firstAbove,
  maximumRatio}, (_, x) => typeof x === "bigint" ? x.toString() : x, 2));
