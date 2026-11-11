#!/usr/bin/env node
"use strict";

// Exact falsification and boundary audit for the rational-mechanical
// terminal-height cylinder inequality.  This is not an all-depth proof.

function assert(ok, message) {
  if (!ok) throw new Error(message);
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

function bitLength(n) {
  return n.toString(2).length;
}

function cylinder(word) {
  let C = 0n;
  let A = 0;
  for (const a of word) {
    C = 3n * C + (1n << BigInt(A));
    A += a;
  }
  const P = 3n ** BigInt(word.length);
  const M = 1n << BigInt(A);
  const Q = 2n * M;
  const rho = mod((M - C) * inverse(P, Q), Q);
  assert(rho > 0n && (rho & 1n) === 1n, "bad cylinder representative");
  const z = (P * rho + C) / M;
  assert((z & 1n) === 1n, "endpoint is not odd");
  let tau = mod(C * inverse(M % P, P), P);
  if (tau === 0n) tau = P;
  const t = (M * tau - C) / P;
  assert(t >= 0n, "negative dual lift");
  assert((tau & 1n) === 0n ? rho === t + M : rho === t,
    "binary/ternary dual lift mismatch");
  return {rho, z, C, tau, t, P, M};
}

function scan(r) {
  const P = 3n ** BigInt(r);
  const N = bitLength(P);
  const B = Array.from({length: r + 1}, (_, i) => Math.floor(i * N / r));
  assert(B[r] === N && N - B[r - 1] === 2, "terminal baseline gap");

  let leaves = 0;
  let positiveHeight = 0;
  let firstFailure = null;
  let firstRise = null;
  let firstTernaryFailure = null;
  let firstScalarFailure = null;
  let best = null;
  const bestByHeight = new Map();
  const word = [];

  function visit(j, A, C) {
    if (j === r - 1) {
      const terminal = N - A;
      if (terminal < 1) return;
      word.push(terminal);
      ++leaves;
      const h = B[r - 1] - A;
      assert(terminal === h + 2, "terminal-height identity");
      const result = cylinder(word);
      if (h >= 1) {
        ++positiveHeight;
        const power = 1n << BigInt(h);
        if (best === null || result.rho * best.power < best.rho * power) {
          best = {h, rho: result.rho, z: result.z, power, word: word.join(",")};
        }
        const oldHeight = bestByHeight.get(h);
        if (oldHeight === undefined || result.rho < oldHeight.rho) {
          bestByHeight.set(h, {rho: result.rho, z: result.z, word: word.join(",")});
        }
        if (result.rho <= power && firstFailure === null) {
          firstFailure = {h, rho: result.rho, z: result.z, word: word.join(",")};
        }
        if (result.z >= result.rho && firstRise === null) {
          firstRise = {h, rho: result.rho, z: result.z, word: word.join(",")};
        }
        if (result.tau <= power && firstTernaryFailure === null) {
          firstTernaryFailure = {h, tau: result.tau, t: result.t,
            word: word.join(",")};
        }
        const D = result.M - result.P;
        if (result.C >= D * power && firstScalarFailure === null) {
          firstScalarFailure = {h, C: result.C, D, word: word.join(",")};
        }
      }
      word.pop();
      return;
    }

    for (let nextA = A + 1; nextA <= B[j + 1]; ++nextA) {
      const a = nextA - A;
      word.push(a);
      visit(j + 1, nextA, 3n * C + (1n << BigInt(A)));
      word.pop();
    }
  }

  visit(0, 0, 0n);
  return {
    r, N, leaves, positiveHeight,
    firstFailure: firstFailure && {...firstFailure, rho: firstFailure.rho.toString(), z: firstFailure.z.toString()},
    firstRise: firstRise && {...firstRise, rho: firstRise.rho.toString(), z: firstRise.z.toString()},
    firstTernaryFailure: firstTernaryFailure && {
      ...firstTernaryFailure,
      tau: firstTernaryFailure.tau.toString(),
      t: firstTernaryFailure.t.toString(),
    },
    firstScalarFailure: firstScalarFailure && {
      ...firstScalarFailure,
      C: firstScalarFailure.C.toString(),
      D: firstScalarFailure.D.toString(),
    },
    best: best && {
      h: best.h,
      rho: best.rho.toString(),
      z: best.z.toString(),
      power: best.power.toString(),
      ratioFloorX1e6: (best.rho * 1000000n / best.power).toString(),
      word: best.word,
    },
    bestByHeight: Array.from(bestByHeight.entries()).map(([h, x]) => ({
      h,
      rho: x.rho.toString(),
      z: x.z.toString(),
      word: x.word,
    })),
  };
}

const maxR = Number(process.argv[2] || 18);
const rows = [];
let firstFailure = null;
let firstRise = null;
for (let r = 2; r <= maxR; ++r) {
  const row = scan(r);
  rows.push(row);
  if (firstFailure === null && row.firstFailure !== null) firstFailure = row;
  if (firstRise === null && row.firstRise !== null) firstRise = row;
}

// The two advertised meanings of "strict" are not equivalent.
const suffixRecordRegression = {
  r: 11,
  N: 18,
  A1: 2,
  actualSuffixStrict: (1n << 16n) > 3n ** 10n,
  mechanicalBallot: 2 <= Math.floor(18 / 11),
};
assert(suffixRecordRegression.actualSuffixStrict, "suffix regression failed");
assert(!suffixRecordRegression.mechanicalBallot, "classes unexpectedly agree");

console.log(JSON.stringify({
  maxR,
  hypothesis: "A_i <= floor(i*N/r) for 0 <= i < r",
  firstFailure,
  firstRise,
  suffixRecordRegression,
  rows,
}, null, 2));
