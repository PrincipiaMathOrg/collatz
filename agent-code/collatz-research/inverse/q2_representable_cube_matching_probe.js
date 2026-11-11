#!/usr/bin/env node
"use strict";

/*
Exploratory topology probe for the anchored q_s=2 corner cube.

For each anchored delay profile, let A be the set of subsets S of the
nonterminal removable corners for which C-Delta_S is representable by
<M,D>.  We test increasingly global cancellation mechanisms:

  1. A has a cone coordinate (membership is invariant under one toggle);
  2. the induced cube graph on A has a parity-reversing perfect matching;
  3. the same holds component by component.

The probe is exact finite evidence only.  It is deliberately separate from
the certified corner eliminations.
*/

const maxWeight = Number(process.argv[2] || 16);
const maxDimension = Number(process.argv[3] || 12);

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function bitLength(n) {
  assert(n > 0n, "bit length requires positive input");
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

function popcount(mask) {
  let count = 0;
  while (mask !== 0) {
    mask &= mask - 1;
    ++count;
  }
  return count;
}

function perfectCubeMatching(active, dimension) {
  const even = [];
  let oddCount = 0;
  for (let mask = 0; mask < active.length; ++mask) {
    if (!active[mask]) continue;
    if ((popcount(mask) & 1) === 0) even.push(mask);
    else ++oddCount;
  }
  if (even.length !== oddCount) return null;

  const mate = new Int32Array(active.length);
  mate.fill(-1);

  function augment(mask, seen) {
    for (let j = 0; j < dimension; ++j) {
      const neighbor = mask ^ (1 << j);
      if (!active[neighbor] || seen[neighbor]) continue;
      seen[neighbor] = 1;
      if (mate[neighbor] === -1 || augment(mate[neighbor], seen)) {
        mate[neighbor] = mask;
        return true;
      }
    }
    return false;
  }

  for (const mask of even) {
    const seen = new Uint8Array(active.length);
    if (!augment(mask, seen)) return null;
  }
  return mate;
}

function componentStatistics(active, dimension) {
  const seen = new Uint8Array(active.length);
  const result = [];
  for (let start = 0; start < active.length; ++start) {
    if (!active[start] || seen[start]) continue;
    const queue = [start];
    seen[start] = 1;
    let head = 0;
    let even = 0;
    let odd = 0;
    while (head < queue.length) {
      const mask = queue[head++];
      if ((popcount(mask) & 1) === 0) ++even;
      else ++odd;
      for (let j = 0; j < dimension; ++j) {
        const neighbor = mask ^ (1 << j);
        if (!active[neighbor] || seen[neighbor]) continue;
        seen[neighbor] = 1;
        queue.push(neighbor);
      }
    }
    result.push({size: queue.length, even, odd});
  }
  return result;
}

let q2Rows = 0;
let profiles = 0;
let evaluated = 0;
let empty = 0;
let cone = 0;
let noCone = 0;
let perfectMatched = 0;
let noPerfectMatching = 0;
let disconnected = 0;
let componentImbalance = 0;
let nonzeroEuler = 0;
let simpleTranslatedPunctures = 0;
let largestSimpleTranslatedDimension = 0;
const firstNoCone = [];
const firstNoPerfectMatching = [];
const firstComponentImbalance = [];
const firstSimpleTranslatedPunctures = [];

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

  function carry() {
    let C = P - (1n << BigInt(weight));
    for (let i = 1; i < weight; ++i) {
      for (let level = 1; level <= delays[i]; ++level) {
        C += delta(i, level);
      }
    }
    return C;
  }

  function isRepresentable(C) {
    const rho = mod(-C * inverseP, M);
    return C - rho * D >= 0n;
  }

  function inspect() {
    ++profiles;
    const corners = [];
    for (let i = 1; i < weight - 1; ++i) {
      if (delays[i] > delays[i - 1]) {
        const value = delta(i, delays[i]);
        const L = mod(value * inverseP, M);
        const VNumerator = D * L + value;
        assert(VNumerator % M === 0n, "nonintegral corner lift");
        corners.push({row: i, level: delays[i], value,
          L, V: VNumerator / M});
      }
    }
    const dimension = corners.length;
    if (dimension === 0 || dimension > maxDimension || dimension >= 31) return;
    ++evaluated;

    const totalL = corners.reduce((sum, corner) => sum + corner.L, 0n);
    const totalV = corners.reduce((sum, corner) => sum + corner.V, 0n);
    const totalDelta = corners.reduce((sum, corner) => sum + corner.value, 0n);
    if (totalL < M && totalV <= D) {
      let rho = totalDelta / D + 1n;
      if ((rho & 1n) === 0n) ++rho;
      if (rho + totalL < M) {
        const translatedC = rho * D;
        assert(translatedC > totalDelta,
          "simple translated puncture did not clear all removals");
        ++simpleTranslatedPunctures;
        largestSimpleTranslatedDimension = Math.max(
          largestSimpleTranslatedDimension, dimension);
        if (firstSimpleTranslatedPunctures.length < 20) {
          firstSimpleTranslatedPunctures.push({
            weight,
            dimension,
            delays: delays.slice(),
            rho: rho.toString(),
            carry: translatedC.toString(),
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
    }

    const C = carry();
    const vertexCount = 1 << dimension;
    const active = new Uint8Array(vertexCount);
    let activeCount = 0;
    let euler = 0;
    for (let mask = 0; mask < vertexCount; ++mask) {
      let removed = 0n;
      for (let j = 0; j < dimension; ++j) {
        if ((mask & (1 << j)) !== 0) removed += corners[j].value;
      }
      if (!isRepresentable(C - removed)) continue;
      active[mask] = 1;
      ++activeCount;
      euler += (popcount(mask) & 1) === 0 ? 1 : -1;
    }
    if (activeCount === 0) {
      ++empty;
      return;
    }
    if (euler !== 0) ++nonzeroEuler;

    const coneCoordinates = [];
    for (let j = 0; j < dimension; ++j) {
      let free = true;
      for (let mask = 0; mask < vertexCount; ++mask) {
        if ((mask & (1 << j)) !== 0) continue;
        if (active[mask] !== active[mask | (1 << j)]) {
          free = false;
          break;
        }
      }
      if (free) coneCoordinates.push(j);
    }
    if (coneCoordinates.length !== 0) ++cone;
    else {
      ++noCone;
      if (firstNoCone.length < 12) {
        firstNoCone.push({
          weight,
          delays: delays.slice(),
          corners,
          activeCount,
          activeMasks: [...active.keys()].filter(mask => active[mask])
        });
      }
    }

    const matching = perfectCubeMatching(active, dimension);
    if (matching !== null) ++perfectMatched;
    else {
      ++noPerfectMatching;
      if (firstNoPerfectMatching.length < 12) {
        firstNoPerfectMatching.push({
          weight,
          delays: delays.slice(),
          corners,
          activeCount,
          euler,
          activeMasks: [...active.keys()].filter(mask => active[mask])
        });
      }
    }

    const components = componentStatistics(active, dimension);
    if (components.length > 1) ++disconnected;
    if (components.some(component => component.even !== component.odd)) {
      ++componentImbalance;
      if (firstComponentImbalance.length < 12) {
        firstComponentImbalance.push({
          weight,
          delays: delays.slice(),
          activeCount,
          components
        });
      }
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
  probe: "cube matching for representable anchored corner subsets",
  maxWeight,
  maxDimension,
  q2Rows,
  profiles,
  evaluated,
  empty,
  cone,
  noCone,
  perfectMatched,
  noPerfectMatching,
  disconnected,
  componentImbalance,
  nonzeroEuler,
  simpleTranslatedPunctures,
  largestSimpleTranslatedDimension,
  firstNoCone,
  firstNoPerfectMatching,
  firstComponentImbalance,
  firstSimpleTranslatedPunctures,
  warning: "finite exploratory evidence only"
}, null, 2));
