#!/usr/bin/env node
"use strict";

// Exploratory audit of the exact full-prefix lift behind the ordered
// insertion window.  For a prescribed accelerated prefix, c_l is the least
// positive seed in its 2-adic cylinder.  The separation rho > 2^U is proved
// for that word as soon as c_l > 2^U.

function assert(ok, message) { if (!ok) throw new Error(message); }
function mod(a, m) { const z = a % m; return z < 0n ? z + m : z; }
function bitLength(n) { return n.toString(2).length; }
function egcd(a, b) {
  if (b === 0n) return [a, 1n, 0n];
  const [g, x, y] = egcd(b, a % b);
  return [g, y, x - (a / b) * y];
}
function inverse(a, m) {
  const [g, x] = egcd(a, m);
  assert(g === 1n, "inverse");
  return mod(x, m);
}
function valuation2(n) {
  assert(n > 0n, "positive valuation input");
  let v = 0;
  while ((n & 1n) === 0n) { n >>= 1n; ++v; }
  return v;
}

// Lift the least initial seed one exact accelerated letter at a time.
// State z is the endpoint produced by the current least representative c.
function firstFailure(word, threshold) {
  let c = 1n;
  let z = 1n;
  let A = 0;
  let pow3 = 1n;
  const trace = [];

  for (let ell = 0; ell < word.length; ++ell) {
    const a = word[ell];
    const modulusT = 1n << BigInt(a);
    const half = (3n * z + 1n) >> 1n;
    const rhs = mod((1n << BigInt(a - 1)) - half, modulusT);
    const coefficient = mod(3n * pow3, modulusT);
    const t = mod(rhs * inverse(coefficient, modulusT), modulusT);
    assert(t < modulusT, "unique lift digit");

    const oldQ = 1n << BigInt(A + 1);
    c += t * oldQ;
    const liftedState = z + 2n * pow3 * t;
    assert(valuation2(3n * liftedState + 1n) === a,
      "lift does not realize exact exponent");
    z = (3n * liftedState + 1n) >> BigInt(a);
    A += a;
    pow3 *= 3n;
    trace.push({ell:ell + 1, a, A, t, c, z});
    if (c > threshold) return {failure:ell + 1, c, A, trace};
  }
  return {failure:null, c, A, trace};
}

function runs(indices) {
  let ans = 0, previous = -2;
  for (const i of indices) {
    if (i !== previous + 1) ++ans;
    previous = i;
  }
  return ans;
}

const maxR = Number(process.argv[2] || 30);
const maxSparseV = Number(process.argv[3] || 4);
const rows = [];
const byV = new Map();
const byRuns = new Map();
let globalWorst = null;

function record(bucket, key, row) {
  const prior = bucket.get(key);
  if (prior === undefined || row.failureRatio > prior.failureRatio ||
      (row.failureRatio === prior.failureRatio && row.r > prior.r)) {
    bucket.set(key, row);
  }
}

for (let r = 3; r <= maxR; ++r) {
  const P = 3n ** BigInt(r);
  const N = bitLength(P);
  const B = Array.from({length:r + 1}, (_, i) => Math.floor(i * N / r));
  const base = Array.from({length:r}, (_, i) => B[i + 1] - B[i]);
  const eligible = [];
  for (let i = 0; i < r - 1; ++i) if (base[i] === 2) eligible.push(i);
  const E = eligible.length;
  assert(E === N - r - 1, "eligible count");

  let rowWorst = null;
  const totalMasks = 2 ** E;
  for (let mask = 0; mask < totalMasks; ++mask) {
    // Bits in J are unselected mechanical 2-gaps; U is selected count.
    const J = eligible.filter((_, q) => (mask & 2 ** q) !== 0);
    const V = J.length;
    const U = E - V;
    if (U === 0) continue;
    if (E > 22 && V > maxSparseV) continue;

    const word = Array(r - 1).fill(1);
    for (const j of J) word[j] = 2;
    word.push(U + 2);
    const result = firstFailure(word, 1n << BigInt(U));
    assert(result.failure !== null, "unseparated word in audited range");
    const before = result.failure === 1 ? {ell:0, A:0, c:1n} :
      result.trace[result.failure - 2];
    let stableAt = before.ell;
    while (stableAt > 1 && result.trace[stableAt - 2].c === before.c) --stableAt;
    const row = {r, N, E, U, V, runs:runs(J),
      failure:result.failure, failureRatio:result.failure / r,
      remaining:r - result.failure, witness:word.join(","),
      survivor:before.c.toString(), survivorExponent:before.A, stableAt,
      liftValue:result.c.toString(), liftExponent:result.A};
    if (rowWorst === null || row.failureRatio > rowWorst.failureRatio) {
      rowWorst = row;
    }
    if (globalWorst === null || row.failureRatio > globalWorst.failureRatio) {
      globalWorst = row;
    }
    record(byV, V, row);
    record(byRuns, row.runs, row);
  }
  rows.push(rowWorst);
}

console.log(JSON.stringify({maxR, maxSparseV, rows, globalWorst,
  worstByV:Object.fromEntries(Array.from(byV.entries()).sort((a,b)=>a[0]-b[0])),
  worstByRuns:Object.fromEntries(Array.from(byRuns.entries()).sort((a,b)=>a[0]-b[0]))},
  null, 2));
