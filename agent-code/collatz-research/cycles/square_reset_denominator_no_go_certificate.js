"use strict";

// Exact certificate for the denominator-parameter obstruction to a local
// square-reset inequality.  The row is an anchored mechanical one-drop word,
// but its reduced common denominator is greater than one.  All calculations
// use BigInt.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function pow2(k) {
  return 1n << BigInt(k);
}

function pow3(k) {
  return 3n ** BigInt(k);
}

function gcd(a, b) {
  if (a < 0n) a = -a;
  if (b < 0n) b = -b;
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

function valuation2(a) {
  assert(a > 0n, "valuation input must be positive");
  let v = 0;
  while ((a & 1n) === 0n) {
    a >>= 1n;
    v += 1;
  }
  return v;
}

function bitLength(a) {
  return a.toString(2).length;
}

const r = 67;
const threePower = pow3(r);
const N = bitLength(threePower - 1n);
const e = N - r;
const V = Math.ceil(2 * Math.log2(r));
const U = e - 1 - V;
assert(N === 107 && e === 40 && V === 13 && U === 26,
  "frozen parameter row changed");
assert(gcd(BigInt(N), BigInt(r)) === 1n, "gcd(N,r) must be one");

// The internal clock bit b_t is the excess of the mechanical gap over one.
const b = [0];
const oneSites = [];
for (let t = 1; t < r; t += 1) {
  const now = Math.floor((e * t) / r);
  const before = Math.floor((e * (t - 1)) / r);
  b.push(now - before);
  if (b[t] === 1) oneSites.push(t);
}
assert(oneSites.length === e - 1, "internal clock count mismatch");
const spikeSites = [oneSites[0], ...oneSites.slice(oneSites.length - V + 1)];
const spikeSet = new Set(spikeSites);
assert(spikeSites.length === V, "spike count mismatch");
assert(spikeSites[0] === 2 && spikeSites[1] === 47 &&
  spikeSites[spikeSites.length - 1] === 66,
"frozen reset placement changed");

// Accelerated odd-coordinate exponent word.  Every internal exponent two is
// at an anchored clock-one site, and the unique bottom exponent is U+2.
const word = [];
for (let t = 1; t < r; t += 1) word.push(spikeSet.has(t) ? 2 : 1);
word.push(U + 2);
assert(word.length === r, "word length mismatch");
assert(word.reduce((x, y) => x + y, 0) === N,
  "total exponent mismatch");

// Standard cyclic carry C and gap D.  The reduced rational fixed point is
// x_0=n_0/d in odd coordinates.
let C = 0n;
let prefixExponent = 0;
for (const a of word) {
  C = 3n * C + pow2(prefixExponent);
  prefixExponent += a;
}
const D = pow2(N) - threePower;
const common = gcd(C, D);
const n0 = C / common;
const denominator = D / common;
assert(denominator > 1n && (denominator & 1n) === 1n,
  "the obstruction must have a nontrivial odd denominator");
assert(gcd(n0, denominator) === 1n && (n0 & 1n) === 1n,
  "reduced odd-coordinate fraction failed");
assert(denominator === 69549813681315526305816084877541n,
  "frozen reduced denominator changed");

// Iterate the integer numerator cycle.  Exact valuations verify every local
// branch domain after the common odd denominator has been cleared.
const numerators = [n0];
let n = n0;
for (let i = 0; i < word.length; i += 1) {
  const numerator = 3n * n + denominator;
  assert(valuation2(numerator) === word[i],
    `exact exponent failed at i=${i}`);
  n = numerator / pow2(word[i]);
  assert((n & 1n) === 1n, `odd numerator failed at i=${i}`);
  numerators.push(n);
}
assert(n === n0, "rational numerator cycle did not close");
assert(numerators.slice(1, -1).every(x => x > n0),
  "strict leastness failed");

// In z=(x+1)/2 coordinates, write z_i=p_i/d.  The numerators p_i are
// ordinary integers and satisfy the generalized O and S reset maps.
const p = numerators.slice(0, -1).map(x => {
  assert(((x + denominator) & 1n) === 0n,
    "z-coordinate numerator is not integral");
  return (x + denominator) / 2n;
});
assert(p[0] === 101731746427729741711697618955782n,
  "frozen q-coordinate numerator changed");
assert(denominator < p[0] && p[0] < 2n * denominator,
  "the rational start must lie strictly between one and two");
for (let t = 1; t < r; t += 1) {
  const before = p[t - 1];
  const after = p[t];
  if (word[t - 1] === 1) {
    assert((before & 1n) === 0n && 2n * after === 3n * before,
      `generalized ordinary domain failed at t=${t}`);
  } else {
    assert((before & 1n) === 1n &&
      4n * after === 3n * before + denominator,
    `generalized reset domain failed at t=${t}`);
  }
}
assert(3n * p[r - 1] - denominator ===
  pow2(U + 1) * (2n * p[0] - denominator),
"integer numerator bottom closure failed");

// The rational q-coordinate start Q=p_0/d violates the square gate.
assert(p[0] * p[0] < pow2(U) * denominator * denominator,
  "square target does not fail");

// Construct the canonical integral quotient Xi_d from the numerator states.
// The notation follows cycle_one_drop_norm_gate.md.  Omissions are the
// clock-one sites not selected as spikes.
const omissionSet = new Set(oneSites.filter(t => !spikeSet.has(t)));
const A = pow2(U + 1);
const xi = Array(r).fill(0n);
xi[0] = A * n0 + denominator;
let omissionsBefore = 0;
for (let j = 1; j < r; j += 1) {
  if (omissionSet.has(j)) omissionsBefore += 1;
  const c = (j * N) % r;
  const index = r - c;
  assert(1 <= index && index < r && xi[index] === 0n,
    `coefficient permutation failed at j=${j}`);
  xi[index] = pow2(U - omissionsBefore) *
    (numerators[j] + denominator);
}
assert(xi.every(value => value > 0n), "quotient positivity failed");
const xiContent = xi.reduce((a, value) => gcd(a, value), 0n);
assert(xiContent === 1n, "the integral quotient must be primitive");

// Form K_U and verify (2 theta^e-3) Xi_d=d K_U in Z[theta]/(theta^r-2).
const directK = Array(r).fill(0n);
directK[0] = 3n * (A - 1n);
let zeroBasedOmissions = 0;
for (let j = 0; j < r - 1; j += 1) {
  const t = j + 1;
  if (spikeSet.has(t)) {
    const c = (j * N) % r;
    directK[r - c] = pow2(U + 1 - zeroBasedOmissions);
  } else if (b[t] === 1) {
    zeroBasedOmissions += 1;
  }
}
assert(zeroBasedOmissions === U, "omission count mismatch");

const deltaXi = Array(r).fill(0n);
for (let source = 0; source < r; source += 1) {
  deltaXi[source] -= 3n * xi[source];
  const shifted = source + e;
  if (shifted < r) deltaXi[shifted] += 2n * xi[source];
  else deltaXi[shifted - r] += 4n * xi[source];
}
for (let i = 0; i < r; i += 1) {
  assert(deltaXi[i] === denominator * directK[i],
    `integral quotient identity failed at coefficient i=${i}`);
}

const resetValuations = [];
for (const t of spikeSites) {
  resetValuations.push(valuation2(3n * p[t - 1] + denominator) - 2);
}
assert(resetValuations[0] === 44,
  "the long odd-endpoint reset valuation changed");

console.log(JSON.stringify({
  r,
  N,
  e,
  U,
  V,
  firstSpike: spikeSites[0],
  lastSpike: spikeSites[spikeSites.length - 1],
  denominator: denominator.toString(),
  denominatorDigits: denominator.toString().length,
  startNumerator: p[0].toString(),
  squareNumerator: (p[0] * p[0]).toString(),
  squareThresholdNumerator:
    (pow2(U) * denominator * denominator).toString(),
  quotientContent: xiContent.toString(),
  resetValuations,
  strictLeast: true,
  squareGateFails: true,
  denominatorOne: false,
}, null, 2));
console.log("status: PASS");
console.log("scope: exact denominator-parameter countermodel; no denominator-one counterexample is claimed");
