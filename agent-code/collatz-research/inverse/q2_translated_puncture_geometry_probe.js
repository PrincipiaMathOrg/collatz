#!/usr/bin/env node
"use strict";

/*
Search genuine q_s=2 corner geometries for a simple translated punctured
cube.  If

  sum L_c < M,  sum V_c <= D,

then a sufficiently small odd rho with rho + sum L_c < M makes
C*=rho D a representable top while every nonempty corner deletion is a
gap.  This refutes any anchor-free degree-drop theorem at that dimension.
The translated carry is not the carry of the Ferrers ideal.
*/

const maxWeight = Number(process.argv[2] || 20);

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function bitLength(n) {
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

let q2Rows = 0;
let profiles = 0;
let simplePunctures = 0;
let largestDimension = 0;
const byDimension = new Map();
const firstByDimension = new Map();

for (let weight = 3; weight <= maxWeight; ++weight) {
  const P = 3n ** BigInt(weight);
  const N = bitLength(P);
  if (N - bitLength(P / 3n) !== 1) continue;
  ++q2Rows;
  const M = 1n << BigInt(N);
  const D = M - P;
  const inverseP = inverse(P, M);
  const maxima = Array(weight).fill(0);
  for (let i = 1; i < weight; ++i) {
    maxima[i] = bitLength(3n ** BigInt(i)) - 1 - i;
  }
  const delays = Array(weight).fill(0);

  function delta(i, level) {
    return (1n << BigInt(i + level - 1)) *
      3n ** BigInt(weight - 1 - i);
  }

  function inspect() {
    ++profiles;
    const corners = [];
    for (let i = 1; i < weight - 1; ++i) {
      if (delays[i] <= delays[i - 1]) continue;
      const value = delta(i, delays[i]);
      const L = mod(value * inverseP, M);
      const numerator = D * L + value;
      assert(numerator % M === 0n, "nonintegral corner lift");
      corners.push({row: i, level: delays[i], value, L,
        V: numerator / M});
    }
    const dimension = corners.length;
    if (dimension === 0) return;
    const totalL = corners.reduce((sum, corner) => sum + corner.L, 0n);
    const totalV = corners.reduce((sum, corner) => sum + corner.V, 0n);
    const totalDelta = corners.reduce((sum, corner) => sum + corner.value, 0n);
    if (totalL >= M || totalV > D) return;
    let rho = totalDelta / D + 1n;
    if ((rho & 1n) === 0n) ++rho;
    if (rho + totalL >= M) return;
    ++simplePunctures;
    largestDimension = Math.max(largestDimension, dimension);
    byDimension.set(dimension, (byDimension.get(dimension) || 0) + 1);
    if (!firstByDimension.has(dimension)) {
      firstByDimension.set(dimension, {
        weight,
        delays: delays.slice(),
        M: M.toString(),
        D: D.toString(),
        rho: rho.toString(),
        translatedCarry: (rho * D).toString(),
        totalDelta: totalDelta.toString(),
        totalL: totalL.toString(),
        totalV: totalV.toString(),
        corners: corners.map(corner => ({
          row: corner.row,
          level: corner.level,
          value: corner.value.toString(),
          L: corner.L.toString(),
          V: corner.V.toString()
        }))
      });
    }
  }

  function visit(i, previous) {
    if (i === weight - 1) {
      delays[i] = maxima[i];
      if (delays[i] >= previous) inspect();
      return;
    }
    for (let value = previous; value <= maxima[i]; ++value) {
      delays[i] = value;
      visit(i + 1, value);
    }
  }

  delays[0] = 0;
  visit(1, 0);
}

console.log(JSON.stringify({
  probe: "simple translated punctures on genuine q2 corner geometries",
  maxWeight,
  q2Rows,
  profiles,
  simplePunctures,
  largestDimension,
  byDimension: [...byDimension.entries()].sort((a, b) => a[0] - b[0]),
  firstByDimension: [...firstByDimension.entries()].sort((a, b) => a[0] - b[0]),
  warning: "all displayed punctures use translated, non-anchored carries"
}, null, 2));
