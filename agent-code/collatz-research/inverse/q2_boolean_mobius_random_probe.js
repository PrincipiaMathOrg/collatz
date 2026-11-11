#!/usr/bin/env node
"use strict";

/*
Deterministic large-row falsification probe for the proposed Boolean degree
drop of the anchored q_s=2 FCD color.  It samples valid nondecreasing delay
paths with a controlled number of internal jumps, then evaluates the full
nonterminal corner cube.  A nonzero highest Mobius coefficient refutes the
unrestricted degree-drop conjecture.  This is finite evidence only.
*/

const maxWeight = Number(process.argv[2] || 300);
const samplesPerRow = Number(process.argv[3] || 80);
const maxDimension = Number(process.argv[4] || 18);

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

function popcount(x) {
  let result = 0;
  while (x !== 0) {
    x &= x - 1;
    ++result;
  }
  return result;
}

let randomState = 0x9e3779b9;
function random32() {
  randomState ^= randomState << 13;
  randomState ^= randomState >>> 17;
  randomState ^= randomState << 5;
  return randomState >>> 0;
}

function randomInt(limit) {
  assert(limit > 0, "random limit must be positive");
  return random32() % limit;
}

let q2Rows = 0;
let sampledProfiles = 0;
let evaluatedCubes = 0;
let skippedCubes = 0;
let topFailures = 0;
let nonzeroMobius = 0;
let oddMobius = 0;
let puncturedFailures = 0;
const firstTopFailures = [];
const firstNonzero = [];

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

  function delta(i, level) {
    return (1n << BigInt(i + level - 1)) *
      3n ** BigInt(weight - 1 - i);
  }

  function coordinates(C) {
    const rho = mod(-C * inverseP, M);
    const tau = mod(C * inverseM, D);
    const numerator = D * rho + M * tau - C;
    assert(numerator % (M * D) === 0n, "nonintegral color");
    const E = numerator / (M * D);
    assert(E === 0n || E === 1n, "color escaped {0,1}");
    return {rho, tau, E};
  }

  for (let sample = 0; sample < samplesPerRow; ++sample) {
    const delays = Array(weight).fill(0);
    let current = 0;
    const desiredJumps = 2 + randomInt(Math.max(1, maxDimension - 1));
    let jumpsMade = 0;
    for (let i = 1; i < weight - 1; ++i) {
      const available = maxima[i] - current;
      const rowsLeft = weight - 1 - i;
      const jumpsLeft = desiredJumps - jumpsMade;
      const shouldJump = available > 0 && jumpsLeft > 0 &&
        randomInt(Math.max(1, rowsLeft)) < jumpsLeft;
      if (shouldJump) {
        const maximumIncrease = Math.min(available,
          maxima[weight - 1] - current);
        current += 1 + randomInt(maximumIncrease);
        ++jumpsMade;
      }
      delays[i] = current;
    }
    delays[weight - 1] = maxima[weight - 1];
    if (delays[weight - 2] > delays[weight - 1]) continue;
    ++sampledProfiles;

    let C = P;
    let previousLevel = 0;
    for (let i = 1; i < weight - 1; ++i) {
      if (delays[i] <= delays[i - 1]) continue;
      const X = (1n << BigInt(i)) * 3n ** BigInt(weight - i);
      C += ((1n << BigInt(delays[i])) -
        (1n << BigInt(previousLevel))) * X;
      previousLevel = delays[i];
    }
    C -= 3n * (1n << BigInt(weight + previousLevel - 1));
    C += M / 4n;
    const top = coordinates(C);
    if (top.E === 0n) {
      ++topFailures;
      if (firstTopFailures.length < 12) {
        firstTopFailures.push({weight, delays, desiredJumps});
      }
    }

    const corners = [];
    for (let i = 1; i < weight - 1; ++i) {
      if (delays[i] <= delays[i - 1]) continue;
      const value = delta(i, delays[i]);
      const L = mod(value * inverseP, M);
      const numerator = D * L + value;
      assert(numerator % M === 0n, "nonintegral threshold");
      corners.push({value, L, V: numerator / M});
    }
    const dimension = corners.length;
    if (dimension === 0 || dimension > maxDimension || dimension >= 31) {
      ++skippedCubes;
      continue;
    }
    ++evaluatedCubes;

    let mu = 0n;
    let punctured = top.E === 0n;
    const vertexCount = 1 << dimension;
    for (let mask = 0; mask < vertexCount; ++mask) {
      let removed = 0n;
      for (let j = 0; j < dimension; ++j) {
        if ((mask & (1 << j)) !== 0) removed += corners[j].value;
      }
      const childE = coordinates(C - removed).E;
      const sign = ((dimension - popcount(mask)) & 1) === 0 ? 1n : -1n;
      mu += sign * childE;
      if (mask !== 0 && childE !== 1n) punctured = false;
    }
    if (punctured) ++puncturedFailures;
    if (mu !== 0n) {
      ++nonzeroMobius;
      if ((mu & 1n) !== 0n) ++oddMobius;
      if (firstNonzero.length < 20) {
        firstNonzero.push({
          weight,
          dimension,
          topColor: top.E.toString(),
          mu: mu.toString(),
          delays
        });
      }
    }
  }
}

console.log(JSON.stringify({
  probe: "large-row random Boolean derivative falsification",
  maxWeight,
  samplesPerRow,
  maxDimension,
  q2Rows,
  sampledProfiles,
  evaluatedCubes,
  skippedCubes,
  topFailures,
  nonzeroMobius,
  oddMobius,
  puncturedFailures,
  firstTopFailures,
  firstNonzero,
  warning: "deterministic finite sample only"
}, null, 2));
