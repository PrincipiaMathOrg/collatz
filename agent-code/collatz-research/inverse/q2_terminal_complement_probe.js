"use strict";

// Targeted probe for the proposed terminal-complement inequality.
// It examines only the unique maximal prefix-barrier profile
// A_i=floor(i log_2 3).  At every q_s=2 weight this profile has b=e-r=1.

function assert(ok, message) {
  if (!ok) throw new Error(message);
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

function digits(n) {
  return n.toString(2).length;
}

function fixed(value, scale) {
  const whole = value / scale;
  const part = ((value % scale) * 1000000n) / scale;
  return whole.toString() + "." + part.toString().padStart(6, "0");
}

const maxS = Number(process.argv[2] || 1000);
assert(Number.isInteger(maxS) && maxS >= 2, "invalid maximum weight");

let P = 1n;
let C = 0n;
let previousK = 0;
let q2Weights = 0;
let bOneZeroLift = 0;
let bOneNoWrap = 0;
let bOneNoWrapDescents = 0;
const witnesses = [];

for (let s = 1; s <= maxS; ++s) {
  const A = digits(P) - 1;
  C = 3n * C + (1n << BigInt(A));
  P *= 3n;

  const k = digits(P);
  const q2 = k - previousK === 1;
  if (q2 && s >= 2) {
    ++q2Weights;
    const e = k - s;
    const r = A - (s - 1);
    const b = e - r;
    assert(b === 1, `maximal profile lost b=1 at s=${s}`);

    const M = 1n << BigInt(k);
    const m = M >> 1n;
    const u = M >> 2n;
    const G = u;
    const n = mod(-C * inverse(P, M), M);
    const ZNumerator = P * n + C;
    assert(ZNumerator % M === 0n, `endpoint is not integral at s=${s}`);
    const Z = ZNumerator / M;

    if (n < m) {
      ++bOneZeroLift;
      if (n < G) {
        ++bOneNoWrap;
        if (Z < n) {
          ++bOneNoWrapDescents;
          witnesses.push({s, k, e, r, n, Z, G, gap: n - Z});
        }
      }
    }
  }
  previousK = k;
}

assert(witnesses.length > 0, "no b=1 no-wrap descent witness found");

const selected = [];
for (const target of [15, 25, 37, 39, 51, 54, 61, 78, 85, 99]) {
  const witness = witnesses.find(item => item.s === target);
  assert(witness !== undefined, `fixed witness s=${target} disappeared`);
  selected.push(witness);
}

if (maxS >= 1000) {
  assert(
    witnesses[witnesses.length - 1].s === 998,
    "weight-1000 terminal witness regression changed"
  );
}

const last = witnesses[witnesses.length - 1];
console.log(`max_s=${maxS}`);
console.log(`q2_weights=${q2Weights}`);
console.log(`b1_zero_lift=${bOneZeroLift}`);
console.log(`b1_no_wrap=${bOneNoWrap}`);
console.log(`b1_no_wrap_descents=${bOneNoWrapDescents}`);
for (const item of selected) {
  console.log(
    `fixed s=${item.s} k=${item.k} e=${item.e} r=${item.r} b=1 ` +
    `n=${item.n} Z=${item.Z} G=${item.G} gap=${item.gap} ` +
    `n_over_G=${fixed(item.n, item.G)}`
  );
}
console.log(
  `last s=${last.s} k=${last.k} e=${last.e} r=${last.r} b=1 ` +
  `n_bits=${digits(last.n)} Z_bits=${digits(last.Z)} ` +
  `G_bits=${digits(last.G)} gap_bits=${digits(last.gap)} ` +
  `n_over_G=${fixed(last.n, last.G)}`
);
