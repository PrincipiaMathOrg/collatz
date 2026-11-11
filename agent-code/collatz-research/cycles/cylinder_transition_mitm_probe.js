#!/usr/bin/env node
"use strict";

// Meet-in-the-middle falsification search for rho > 2^T in the binary
// height branch.  It is exploratory and is not an all-depth certificate.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function bitLength(n) {
  return n.toString(2).length;
}

function mod(a, m) {
  const x = a % m;
  return x < 0n ? x + m : x;
}

function inverse(a, m) {
  let r0 = a, r1 = m, s0 = 1n, s1 = 0n;
  while (r1 !== 0n) {
    const q = r0 / r1;
    [r0, r1] = [r1, r0 - q * r1];
    [s0, s1] = [s1, s0 - q * s1];
  }
  assert(r0 === 1n, "inverse does not exist");
  return mod(s0, m);
}

function lowerBound(values, target) {
  let lo = 0, hi = values.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (values[mid].sum < target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

const r = Number(process.argv[2] || 40);
const split = Number(process.argv[3] || Math.floor(r / 2));
const P = 3n ** BigInt(r);
const N = bitLength(P);
const M = 1n << BigInt(N);
const Q = 2n * M;
const B = Array.from({length: r + 1}, (_, j) => Math.floor(j * N / r));
const g = Array.from({length: r}, (_, j) => B[j + 1] - B[j]);

let C0 = 0n;
let A = 0;
for (let j = 0; j < r; ++j) {
  C0 = 3n * C0 + (1n << BigInt(A));
  A += g[j];
}
assert(A === N, "mechanical total");
const pInverse = inverse(P, Q);
const rho0 = mod((M - C0) * pInverse, Q);
const inverse3 = inverse(3n, Q);
let inverse3Power = inverse3;
const weight = Array(r).fill(0n);
for (let j = 0; j < r; ++j) {
  if (j > 0) inverse3Power = inverse3Power * inverse3 % Q;
  if (j > 0) {
    weight[j] = ((1n << BigInt(B[j] - 1)) * inverse3Power) % Q;
  }
}

function newGroups() {
  return [Array.from({length: r + 1}, () => []),
    Array.from({length: r + 1}, () => [])];
}

const left = newGroups();
function enumerateLeft(j, height, sum, transitions, bits) {
  if (j === split) {
    left[height][transitions].push({sum, bits});
    return;
  }
  for (const next of [0, 1]) {
    if (g[j] + height - next <= 0) continue;
    const nextJ = j + 1;
    enumerateLeft(nextJ, next,
      mod(sum + (next === 1 ? weight[nextJ] : 0n), Q),
      transitions + Number(next !== height), bits | (BigInt(next) << BigInt(nextJ - 1)));
  }
}
enumerateLeft(0, 0, 0n, 0, 0n);

const right = newGroups();
function enumerateRight(startHeight) {
  function visit(j, height, sum, transitions, bits) {
    if (j === r) {
      if (height === 0) right[startHeight][transitions].push({sum, bits});
      return;
    }
    for (const next of [0, 1]) {
      if (g[j] + height - next <= 0) continue;
      const nextJ = j + 1;
      visit(nextJ, next,
        mod(sum + (nextJ < r && next === 1 ? weight[nextJ] : 0n), Q),
        transitions + Number(next !== height),
        bits | (nextJ < r ? BigInt(next) << BigInt(nextJ - split - 1) : 0n));
    }
  }
  visit(split, startHeight, 0n, 0, 0n);
}
enumerateRight(0);
enumerateRight(1);

let best = null;
let minimum = null;
let pairs = 0;
for (const boundary of [0, 1]) {
  for (let tLeft = 0; tLeft <= r; ++tLeft) {
    const xs = left[boundary][tLeft];
    if (xs.length === 0) continue;
    for (let tRight = 0; tRight <= r; ++tRight) {
      const ys = right[boundary][tRight];
      const T = tLeft + tRight;
      if (T === 0 || ys.length === 0) continue;
      ++pairs;
      ys.sort((a, b) => a.sum < b.sum ? -1 : a.sum > b.sum ? 1 : 0);
      for (const x of xs) {
        const target = mod(-rho0 - x.sum, Q);
        const index = lowerBound(ys, target);
        for (const index0 of [index, 0]) {
          if (index0 >= ys.length) continue;
          const y = ys[index0];
          const rho = mod(rho0 + x.sum + y.sum, Q);
          if (rho === 0n) continue;
          if (minimum === null || rho < minimum.rho) {
            minimum = {rho, T, boundary, leftBits: x.bits, rightBits: y.bits};
          }
          if (best === null || rho * best.power < best.rho * (1n << BigInt(T))) {
            best = {rho, power: 1n << BigInt(T), T, boundary,
              leftBits: x.bits, rightBits: y.bits};
          }
          if (rho <= (1n << BigInt(T))) {
            console.log(JSON.stringify({violation: true, r, N, split, T,
              rho: rho.toString(), power: (1n << BigInt(T)).toString(),
              boundary, leftBits: x.bits.toString(), rightBits: y.bits.toString()}));
            process.exit(0);
          }
        }
      }
    }
  }
}

function reconstruct(entry) {
  const heights = Array(r + 1).fill(0);
  for (let j = 1; j <= split; ++j) {
    heights[j] = Number((entry.leftBits >> BigInt(j - 1)) & 1n);
  }
  for (let j = split + 1; j < r; ++j) {
    heights[j] = Number(
      (entry.rightBits >> BigInt(j - split - 1)) & 1n);
  }
  const word = [];
  let transitions = 0, exponent = 0, carry = 0n;
  for (let j = 0; j < r; ++j) {
    const a = g[j] + heights[j] - heights[j + 1];
    assert(a > 0, "reconstructed profile lost positivity");
    carry = 3n * carry + (1n << BigInt(exponent));
    exponent += a;
    transitions += Number(heights[j] !== heights[j + 1]);
    word.push(a);
  }
  const rho = mod((M - carry) * pInverse, Q);
  assert(exponent === N, "reconstructed exponent mismatch");
  assert(transitions === entry.T, "reconstructed transition mismatch");
  assert(rho === entry.rho, "reconstructed cylinder mismatch");
  return {heights: heights.join(""), word: word.join(".")};
}

const bestProfile = reconstruct(best);
const minimumProfile = reconstruct(minimum);
const expectedBest = new Map([
  [28, {rho: 93429831n, power: 4194304n, T: 22}],
  [40, {rho: 71064112859n, power: 16777216n, T: 24}],
  [44, {rho: 242714122287n, power: 67108864n, T: 26}],
  [48, {rho: 8884362916175n, power: 1073741824n, T: 30}],
  [50, {rho: 1146434089639n, power: 16777216n, T: 24}],
]);
if (expectedBest.has(r)) {
  const expected = expectedBest.get(r);
  assert(best.rho === expected.rho && best.power === expected.power &&
    best.T === expected.T, "known MITM row changed");
}

const leftCount = left.flat(2).length;
const rightCount = right.flat(2).length;
console.log(JSON.stringify({violation: false, r, N, split, leftCount,
  rightCount, nonemptyGroupPairs: pairs,
  minimum: {...minimum, rho: minimum.rho.toString(),
    leftBits: minimum.leftBits.toString(), rightBits: minimum.rightBits.toString(),
    ...minimumProfile},
  best: {...best, rho: best.rho.toString(), power: best.power.toString(),
    leftBits: best.leftBits.toString(), rightBits: best.rightBits.toString(),
    ...bestProfile},
  knownRowRegression: expectedBest.has(r)}, null, 2));
