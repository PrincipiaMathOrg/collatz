#!/usr/bin/env node
"use strict";

/*
Exact exploratory probe for the highest Boolean derivative of the q_s=2
corner cube.  For an anchored delay ideal I and its nonterminal removable
corners K, we compute

  mu_E(I) = sum_{S subset K} (-1)^(|K|-|S|) E(I \ S).

A terminal-preserving minimal FCD failure would have E(I)=0 and
E(I\S)=1 for every nonempty S, hence mu_E(I)=(-1)^(|K|+1).
The program also separates the two wrap functions in the exact flux formula.
The output is finite evidence only.
*/

const maxWeight = Number(process.argv[2] || 20);
const maxCubeDimension = Number(process.argv[3] || 20);

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function bitLength(n) {
  assert(n > 0n, "bit length requires a positive integer");
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

function popcount(x) {
  let count = 0;
  while (x !== 0) {
    x &= x - 1;
    ++count;
  }
  return count;
}

function addHistogram(map, key) {
  map.set(key, (map.get(key) || 0) + 1);
}

const byDimension = new Map();
const mobiusHistogram = new Map();
const dyadicHistogram = new Map();
const reducedHistogram = new Map();
let q2Rows = 0;
let profiles = 0;
let cubes = 0;
let cubeVertices = 0;
let skippedLargeCubes = 0;
let anchoredTopFailures = 0;
let puncturedFailureCubes = 0;
let targetMobiusHits = 0;
let oddMobius = 0;
let zeroMobius = 0;
const firstOddByDimension = new Map();
const firstTargetByDimension = new Map();

for (let weight = 3; weight <= maxWeight; ++weight) {
  const P = 3n ** BigInt(weight);
  const N = bitLength(P);
  if (N - bitLength(P / 3n) !== 1) continue;
  ++q2Rows;
  const M = 1n << BigInt(N);
  const D = M - P;
  const inverseP = inverse(P, M);
  const inverseM = inverse(M, D);
  const maxima = Array(weight).fill(0);
  for (let i = 1; i < weight; ++i) {
    maxima[i] = bitLength(3n ** BigInt(i)) - 1 - i;
  }
  const delays = Array(weight).fill(0);

  function delta(i, level) {
    return (1n << BigInt(i + level - 1)) *
      3n ** BigInt(weight - 1 - i);
  }

  function carry() {
    let C = P - (1n << BigInt(weight));
    for (let i = 1; i < weight; ++i) {
      for (let level = 1; level <= delays[i]; ++level) {
        C += delta(i, level);
      }
    }
    return C;
  }

  function coordinates(C) {
    const rho = mod(-C * inverseP, M);
    const tau = mod(C * inverseM, D);
    const numerator = D * rho + M * tau - C;
    assert(numerator % (M * D) === 0n, "nonintegral FCD color");
    const E = numerator / (M * D);
    assert(E === 0n || E === 1n, "FCD color escaped {0,1}");
    assert(C < M * D, "carry escaped the unique two-coin range");
    const residual = C - D * rho;
    assert(residual % M === 0n, "Apéry residual is not a multiple of M");
    const denumerant = residual >= 0n ? 1n : 0n;
    if (denumerant === 1n) {
      assert(residual / M === tau,
        "two-coin representation disagrees with CRT coordinates");
    }
    assert(E === 1n - denumerant,
      "FCD color is not the complement of the two-coin denumerant");
    return {rho, tau, E, denumerant};
  }

  function inspectProfile() {
    ++profiles;
    const C = carry();
    const top = coordinates(C);
    if (top.E === 0n) ++anchoredTopFailures;
    const corners = [];
    for (let i = 1; i < weight - 1; ++i) {
      if (delays[i] > delays[i - 1]) {
        const value = delta(i, delays[i]);
        const L = mod(value * inverseP, M);
        const numerator = D * L + value;
        assert(numerator % M === 0n, "nonintegral reduced threshold");
        const V = numerator / M;
        corners.push({row: i, level: delays[i], value, L, V});
      }
    }
    const dimension = corners.length;
    addHistogram(byDimension, String(dimension));
    if (dimension === 0) return;
    if (dimension > maxCubeDimension || dimension >= 31) {
      ++skippedLargeCubes;
      return;
    }

    ++cubes;
    const vertexCount = 1 << dimension;
    cubeVertices += vertexCount;
    let muE = 0n;
    let muP = 0n;
    let muA = 0n;
    let muB = 0n;
    let punctured = top.E === 0n;
    for (let mask = 0; mask < vertexCount; ++mask) {
      let removed = 0n;
      let L = 0n;
      let V = 0n;
      for (let j = 0; j < dimension; ++j) {
        if ((mask & (1 << j)) === 0) continue;
        removed += corners[j].value;
        L += corners[j].L;
        V += corners[j].V;
      }
      const child = coordinates(C - removed);
      const A = (top.rho + L) / M;
      const B = (() => {
        const numerator = V - top.tau;
        if (numerator >= 0n) return (numerator + D - 1n) / D;
        return -((-numerator) / D);
      })();
      assert(child.E === top.E + B - A, "flux identity failed");
      const sign = ((dimension - popcount(mask)) & 1) === 0 ? 1n : -1n;
      muE += sign * child.E;
      muP += sign * child.denumerant;
      muA += sign * A;
      muB += sign * B;
      if (mask !== 0 && child.E !== 1n) punctured = false;
    }
    assert(muE === muB - muA, "Mobius flux identity failed");
    assert(muE === -muP, "denumerant Mobius identity failed");

    const target = (dimension & 1) === 0 ? -1n : 1n;
    if (muE === 0n) ++zeroMobius;
    if ((muE & 1n) !== 0n) {
      ++oddMobius;
      if (!firstOddByDimension.has(dimension)) {
        firstOddByDimension.set(dimension, {
          weight,
          delays: delays.slice(),
          topColor: top.E.toString(),
          muE: muE.toString(),
          muA: muA.toString(),
          muB: muB.toString()
        });
      }
    }
    if (muE === target) {
      ++targetMobiusHits;
      if (!firstTargetByDimension.has(dimension)) {
        firstTargetByDimension.set(dimension, {
          weight,
          delays: delays.slice(),
          topColor: top.E.toString(),
          muE: muE.toString(),
          muA: muA.toString(),
          muB: muB.toString(),
          punctured
        });
      }
    }
    if (punctured) ++puncturedFailureCubes;
    addHistogram(mobiusHistogram, `${dimension}:${muE}`);
    addHistogram(dyadicHistogram, `${dimension}:${muA}`);
    addHistogram(reducedHistogram, `${dimension}:${muB}`);
  }

  function visit(i, previous) {
    if (i === weight - 1) {
      delays[i] = maxima[i];
      if (delays[i] < previous) return;
      inspectProfile();
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

function sortedEntries(map, numericKey = false) {
  return [...map.entries()].sort((a, b) => {
    if (numericKey) return Number(a[0]) - Number(b[0]);
    const [ad, av] = a[0].split(":").map(Number);
    const [bd, bv] = b[0].split(":").map(Number);
    return ad - bd || av - bv;
  });
}

console.log(JSON.stringify({
  probe: "highest Boolean derivative of anchored q2 corner cubes",
  maxWeight,
  maxCubeDimension,
  q2Rows,
  profiles,
  cubes,
  cubeVertices,
  skippedLargeCubes,
  anchoredTopFailures,
  puncturedFailureCubes,
  targetMobiusHits,
  oddMobius,
  zeroMobius,
  byDimension: sortedEntries(byDimension, true),
  mobiusHistogram: sortedEntries(mobiusHistogram),
  dyadicHistogram: sortedEntries(dyadicHistogram),
  reducedHistogram: sortedEntries(reducedHistogram),
  firstOddByDimension: [...firstOddByDimension.entries()],
  firstTargetByDimension: [...firstTargetByDimension.entries()],
  warning: "finite evidence only"
}, null, 2));
