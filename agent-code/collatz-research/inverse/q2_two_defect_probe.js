#!/usr/bin/env node
"use strict";

// Exact diagnostic for b=1 profiles whose deformation support has exactly
// two positions.  It includes the height-two second cell which can occur
// when the two support positions are adjacent.

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

function bitLength(n) {
  return n.toString(2).length;
}

const maxS = Number(process.argv[2] || 1000);
assert(Number.isInteger(maxS) && maxS >= 3, "invalid maximum weight");

let P = 1n;
let previousN = 0;
let C0 = 0n;
const B = [0];
const powers3 = [1n];
let q2Weights = 0;
let profiles = 0;
let heightTwoProfiles = 0;
let formalStrictHits = 0;
let formalEqualityHits = 0;
let positiveEndpointHits = 0;
let realizedPositiveOddHits = 0;
let firstFormal = null;
let firstRealized = null;

for (let s = 1; s <= maxS; ++s) {
  const nextB = bitLength(P) - 1;
  if (s - 1 >= B.length) B.push(nextB);
  C0 = 3n * C0 + (1n << BigInt(nextB));
  P *= 3n;
  powers3.push(P);
  const N = bitLength(P);
  const increment = N - previousN;
  previousN = N;
  if (increment !== 1 || s < 3) continue;

  const e = N - s;
  const terminalDelay = e - 1;
  assert(terminalDelay >= 1, "unexpected empty b=1 delay range");
  assert(B[s - 1] === N - 2, "b=1 endpoint identity failed");
  ++q2Weights;

  const M = 1n << BigInt(N);
  const D = M - P;
  const invM = inverse(M, D);
  const tau0 = mod(C0 * invM, D);
  const dMax = BigInt(Math.floor((terminalDelay + 1) / 2));
  assert(dMax < D, "target interval is not shorter than determinant");

  const unit = Array(s).fill(null);
  for (let i = 1; i <= s - 2; ++i) {
    const decrement = (1n << BigInt(B[i] - 1)) * powers3[s - 1 - i];
    unit[i] = {
      decrement,
      residue: mod(decrement * invM, D)
    };
  }

  function test(J, K, hK) {
    ++profiles;
    let decrementK = unit[K].decrement;
    let residueK = unit[K].residue;
    if (hK === 2) {
      ++heightTwoProfiles;
      decrementK += (1n << BigInt(B[K] - 2)) * powers3[s - 1 - K];
      residueK = mod(decrementK * invM, D);
    }
    let tau = tau0 - unit[J].residue - residueK;
    if (tau < 0n) tau += D;
    if (tau < 0n) tau += D;
    const equality = tau === 0n;
    const strict = tau >= 1n && tau <= dMax;
    if (equality) ++formalEqualityHits;
    if (strict) ++formalStrictHits;
    if (!equality && !strict) return;

    const d = tau;
    const C = C0 - unit[J].decrement - decrementK;
    const numeratorZ = C - P * d;
    assert(numeratorZ % D === 0n, "formal target did not divide");
    const Z = numeratorZ / D;
    const n = Z - d;
    if (Z > 0n) ++positiveEndpointHits;
    if (n > 0n && (n & 1n) === 1n) {
      ++realizedPositiveOddHits;
      if (firstRealized === null) {
        firstRealized = {s, N, J, K, hK, d, dMax, n, Z, D, C};
      }
    }
    if (firstFormal === null) {
      firstFormal = {s, N, J, K, hK, d, dMax, n, Z, D, C};
    }
  }

  for (let J = 1; J <= s - 3; ++J) {
    // The first support cell is forced to have height one and is possible
    // precisely across a preceding maximal gap of two.
    if (B[J] - B[J - 1] !== 2) continue;

    // Adjacent support.  Its second height can be one or the gap B_K-B_J.
    const adjacentK = J + 1;
    const adjacentGap = B[adjacentK] - B[J];
    for (let hK = 1; hK <= adjacentGap; ++hK) {
      test(J, adjacentK, hK);
    }

    // A nonadjacent support cell is isolated on the left, so it too is a
    // unit transposition across a preceding gap of two.
    for (let K = J + 2; K <= s - 2; ++K) {
      if (B[K] - B[K - 1] !== 2) continue;
      test(J, K, 1);
    }
  }
}

function serial(value) {
  if (value === null) return null;
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [
    key,
    typeof item === "bigint" ? item.toString() : item
  ]));
}

console.log(JSON.stringify({
  maxS,
  q2Weights,
  profiles,
  heightTwoProfiles,
  formalStrictHits,
  formalEqualityHits,
  positiveEndpointHits,
  realizedPositiveOddHits,
  firstFormal: serial(firstFormal),
  firstRealized: serial(firstRealized)
}, null, 2));
