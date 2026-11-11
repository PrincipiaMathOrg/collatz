#!/usr/bin/env node
"use strict";

// Exact finite audit for the ramp-plus-one-drop family in
// q2_dense_corner_flux_no_go.md.  These are anchored first-crossing
// profiles, not target or FCD-failure examples.

const crypto = require("crypto");

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function mod(a, m) {
  a %= m;
  return a < 0n ? a + m : a;
}

function inverse(a, m) {
  let t = 0n, nextT = 1n, r = m, nextR = mod(a, m);
  while (nextR !== 0n) {
    const q = r / nextR;
    [t, nextT] = [nextT, t - q * nextT];
    [r, nextR] = [nextR, r - q * nextR];
  }
  assert(r === 1n, "inverse does not exist");
  return mod(t, m);
}

function floorDiv(a, b) {
  assert(b > 0n, "positive divisor required");
  let q = a / b;
  if (a % b < 0n) --q;
  return q;
}

function ceilDiv(a, b) {
  return -floorDiv(-a, b);
}

function bitLength(n) {
  assert(n > 0n, "positive integer required");
  return n.toString(2).length;
}

function coordinates(C, M, P, D) {
  const rho = mod(-C * inverse(P, M), M);
  const tau = mod(C * inverse(M, D), D);
  const numerator = D * rho + M * tau - C;
  assert(numerator % (M * D) === 0n, "nonintegral FCD branch");
  const E = numerator / (M * D);
  assert(E === 0n || E === 1n, "FCD branch escaped {0,1}");
  return {rho, tau, E};
}

const maximumWeight = Number(process.argv[2] || 2000);
assert(Number.isInteger(maximumWeight) && maximumWeight >= 4,
  "maximum weight must be an integer at least four");

let P = 1n;
let previousP = 1n;
const ceilings = [0];
let q2Weights = 0;
let denseWeights = 0;
let actualFailures = 0;
let firstQ2 = null;
let firstDense = null;
let lastRecord = null;
let maximumTransitions = 0;
let minimumCornerCount = Number.POSITIVE_INFINITY;
const branchPairs = new Map();
const digest = crypto.createHash("sha256");

for (let s = 1; s <= maximumWeight; ++s) {
  previousP = P;
  P *= 3n;
  ceilings[s] = bitLength(P);
  if (s < 4) continue;

  // Since 3^j is never a power of two, bitLength(3^j) is
  // ceil(j log_2 3).  Thus this is the exact q_s=2 test.
  const N = ceilings[s];
  const previousCeiling = ceilings[s - 1];
  if (N - previousCeiling !== 1) continue;
  ++q2Weights;

  const M = 1n << BigInt(N);
  const D = M - P;
  const e = N - s;
  const BPrevious = previousCeiling - 1;
  assert(BPrevious === N - 2, `b=1 endpoint failed at s=${s}`);
  assert(e >= 2, `empty terminal delay at s=${s}`);

  // Ramp-plus-one-drop height path:
  // h_i=m_i=B_i-i for i<s-1 and h_{s-1}=0.  Equivalently,
  // d_i=0 for i<s-1 and d_{s-1}=e-1.
  const powerBeforePrevious = previousP / 3n;
  const BTwoBack = bitLength(powerBeforePrevious) - 1;
  const mTwoBack = BTwoBack - (s - 2);
  const transitions = mTwoBack + 1;
  const cornerCount = 1;
  assert(mTwoBack >= 1, `short ramp at s=${s}`);

  // Reconstruct the complete height and delay paths from the definitions.
  // This independently checks both counts, including every plateau edge.
  let previousHeight = 0;
  let previousDelay = 0;
  let directTransitions = 0;
  let directCorners = 0;
  let upwardTransitions = 0;
  let downwardTransitions = 0;
  for (let i = 1; i < s; ++i) {
    const B = ceilings[i] - 1;
    const m = B - i;
    const height = i === s - 1 ? 0 : m;
    const delay = m - height;
    assert(height >= 0 && delay >= previousDelay,
      `invalid anchored path at s=${s}, i=${i}`);
    if (height !== previousHeight) {
      ++directTransitions;
      if (height > previousHeight) {
        ++upwardTransitions;
        assert(height === previousHeight + 1 && delay === previousDelay,
          `upward transition created a corner at s=${s}, i=${i}`);
      } else {
        ++downwardTransitions;
      }
    }
    if (delay > previousDelay) ++directCorners;
    previousHeight = height;
    previousDelay = delay;
  }
  assert(directTransitions === transitions,
    `transition formula failed at s=${s}`);
  assert(directCorners === cornerCount && downwardTransitions === 1 &&
    upwardTransitions === transitions - 1,
    `corner classification failed at s=${s}`);
  assert(previousDelay === e - 1,
    `terminal delay failed at s=${s}`);

  // The sole removable corner is c=(s-1,e-1).  Its exponent is N-3.
  const delta = 1n << BigInt(N - 3);
  assert(delta === M / 8n, `corner weight failed at s=${s}`);
  const PInverse = inverse(P, M);
  const u = mod(PInverse, 8n);
  assert(u === 1n || u === 3n, `unexpected inverse modulo eight at s=${s}`);
  const L = mod(delta * PInverse, M);
  const V = (D * L + delta) / M;
  assert(L === delta * u, `singleton L formula failed at s=${s}`);
  assert(V === (D * u + 1n) / 8n, `singleton V formula failed at s=${s}`);
  assert(0n < L && L < M && 0n < V && V < D,
    `threshold range failed at s=${s}`);

  // Directly summing the front carry and all e-1 cells of the final row
  // gives this anchored carry.
  const CFront = P - (1n << BigInt(s));
  const finalRow = (1n << BigInt(N - 2)) -
    (1n << BigInt(s - 1));
  const C = CFront + finalRow;
  assert(C === P + M / 4n - 3n * (1n << BigInt(s - 1)),
    `anchored carry formula failed at s=${s}`);

  const top = coordinates(C, M, P, D);
  const below = coordinates(C - delta, M, P, D);
  const binaryWraps = floorDiv(top.rho + L, M);
  const reducedWraps = ceilDiv(V - top.tau, D);
  assert(below.E === top.E + reducedWraps - binaryWraps,
    `singleton flux identity failed at s=${s}`);

  if (top.E === 0n) ++actualFailures;
  if (transitions >= 5) {
    ++denseWeights;
    if (firstDense === null) firstDense = s;
  }
  if (firstQ2 === null) firstQ2 = s;
  maximumTransitions = Math.max(maximumTransitions, transitions);
  minimumCornerCount = Math.min(minimumCornerCount, cornerCount);
  const pair = `${top.E.toString()}${below.E.toString()}`;
  branchPairs.set(pair, (branchPairs.get(pair) || 0) + 1);

  const record = [
    s, N, e, mTwoBack, transitions, cornerCount,
    delta.toString(), L.toString(), V.toString(),
    C.toString(), top.rho.toString(), top.tau.toString(),
    top.E.toString(), below.E.toString(),
    binaryWraps.toString(), reducedWraps.toString()
  ].join("|");
  digest.update(record + "\n");
  lastRecord = {s, N, e, transitions, upwardTransitions,
    downwardTransitions, cornerCount, inverseModuloEight: u.toString(),
    topE: top.E.toString(), belowE: below.E.toString()};
}

assert(q2Weights > 0, "no q=2 weights audited");
assert(denseWeights > 0, "no T>=5 examples audited");
assert(minimumCornerCount === 1, "corner minimum changed");
assert(actualFailures === 0,
  "an actual anchored FCD failure appeared in the audited family");

console.log(JSON.stringify({
  certificate: "q=2 b=1 dense-transition corner-flux no-go",
  maximumWeight,
  q2Weights,
  denseWeights,
  firstQ2,
  firstDense,
  maximumTransitions,
  minimumCornerCount,
  actualFailures,
  branchPairs: Object.fromEntries([...branchPairs.entries()].sort()),
  lastRecord,
  recordSha256: digest.digest("hex")
}, null, 2));
