#!/usr/bin/env node
"use strict";

// Diagnostic for the proposed cycle small-quotient gate.
// Enumerates strict-record, one-strip accelerated words of small odd length
// and compares transition complexity with both the reduced rational numerator
// and the least positive dyadic cylinder representative.  This is a pattern
// finder, not a certificate for an all-depth statement.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function gcd(a, b) {
  if (a < 0n) a = -a;
  if (b < 0n) b = -b;
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

function bitLength(n) {
  assert(n > 0n, "bitLength requires positivity");
  return n.toString(2).length;
}

function extendedGcd(a, b) {
  if (b === 0n) return [a, 1n, 0n];
  const [g, x, y] = extendedGcd(b, a % b);
  return [g, y, x - (a / b) * y];
}

function inverseMod(a, modulus) {
  const [g, x] = extendedGcd(a, modulus);
  assert(g === 1n, "inverse does not exist");
  return ((x % modulus) + modulus) % modulus;
}

function carryOf(word) {
  let C = 0n;
  let A = 0;
  for (const exponent of word) {
    C = 3n * C + (1n << BigInt(A));
    A += exponent;
  }
  return {C, A};
}

function isPrimitive(word) {
  const r = word.length;
  for (let p = 1; p < r; ++p) {
    if (r % p !== 0) continue;
    let equal = true;
    for (let i = p; i < r; ++i) {
      if (word[i] !== word[i % p]) {
        equal = false;
        break;
      }
    }
    if (equal) return false;
  }
  return true;
}

function strictSuffixRecord(word, N) {
  const r = word.length;
  let A = 0;
  for (let i = 0; i < r; ++i) {
    if ((1n << BigInt(N - A)) <= 3n ** BigInt(r - i)) return false;
    A += word[i];
  }
  return A === N;
}

function transitionData(word, N) {
  const r = word.length;
  let A = 0;
  let previous = 0;
  let transitions = 0;
  let maxHeight = 0;
  let minHeight = 0;
  let downwardTransitions = 0;
  let downwardVariation = 0;
  for (let i = 0; i < r; ++i) {
    A += word[i];
    const height = Math.floor((i + 1) * N / r) - A;
    if (height !== previous) ++transitions;
    if (height < previous) {
      ++downwardTransitions;
      downwardVariation += previous - height;
    }
    if (height > maxHeight) maxHeight = height;
    if (height < minHeight) minHeight = height;
    previous = height;
  }
  assert(previous === 0, "height endpoint changed");
  return {transitions, maxHeight, minHeight, downwardTransitions,
    downwardVariation};
}

function oddRotations(word) {
  const rotations = [];
  for (let shift = 0; shift < word.length; ++shift) {
    rotations.push(word.slice(shift).concat(word.slice(0, shift)));
  }
  return rotations;
}

const maxR = Number(process.argv[2] || 28);
let inspected = 0;
let strictWords = 0;
let fullHits = 0;
let bestRho = null;
let bestNumerator = null;
let bestAllRotations = null;
const bestByDownwardTransitions = new Map();

function updateBest(current, candidate, key) {
  if (current === null || candidate[key] < current[key] ||
      (candidate[key] === current[key] &&
       candidate.transitions > current.transitions)) return candidate;
  return current;
}

for (let r = 3; r <= maxR; ++r) {
  const P = 3n ** BigInt(r);
  const N = bitLength(P - 1n);
  const extra = N - r;
  const M = 1n << BigInt(N);
  const cylinderModulus = 1n << BigInt(N + 1);
  const D = M - P;
  const inverse3r = inverseMod(P % cylinderModulus, cylinderModulus);
  const word = Array(r).fill(1);

  function enumerate(position, remaining) {
    if (position === r) {
      if (remaining !== 0) return;
      ++inspected;
      if (!strictSuffixRecord(word, N) || !isPrimitive(word)) return;
      ++strictWords;
      const {C, A} = carryOf(word);
      assert(A === N, "total exponent changed");
      const common = gcd(C, D);
      const q = D / common;
      const numerator = C / common;
      if (q === 1n) ++fullHits;
      const rho0 = (((M - C) * inverse3r) % cylinderModulus +
        cylinderModulus) % cylinderModulus;
      const rho = rho0 === 0n ? cylinderModulus : rho0;
      const td = transitionData(word, N);
      const divisor = 1n << BigInt(td.transitions);
      const rhoScaled = (rho * 1000000n) / divisor;
      const numeratorScaled = (numerator * 1000000n) / divisor;

      let maximumRotationRho = 0n;
      for (const rotation of oddRotations(word)) {
        const rotatedCarry = carryOf(rotation).C;
        const rotationRho0 = (((M - rotatedCarry) * inverse3r) %
          cylinderModulus + cylinderModulus) % cylinderModulus;
        const rotationRho = rotationRho0 === 0n ?
          cylinderModulus : rotationRho0;
        if (rotationRho > maximumRotationRho) maximumRotationRho = rotationRho;
      }
      const allRotationScaled =
        (maximumRotationRho * 1000000n) / divisor;
      const candidate = {r, N, transitions: td.transitions,
        maxHeight: td.maxHeight, minHeight: td.minHeight, rho,
        numerator, q, rhoScaled, numeratorScaled, maximumRotationRho,
        allRotationScaled, downwardTransitions: td.downwardTransitions,
        downwardVariation: td.downwardVariation, word: word.join(",")};
      bestRho = updateBest(bestRho, candidate, "rhoScaled");
      bestNumerator = updateBest(bestNumerator, candidate,
        "numeratorScaled");
      bestAllRotations = updateBest(bestAllRotations, candidate,
        "allRotationScaled");
      const oldDownward = bestByDownwardTransitions.get(
        td.downwardTransitions);
      if (oldDownward === undefined || q < oldDownward.q ||
          (q === oldDownward.q && numerator < oldDownward.numerator)) {
        bestByDownwardTransitions.set(td.downwardTransitions, candidate);
      }
      return;
    }
    const slots = r - position - 1;
    for (let extraHere = 0;
         extraHere <= remaining;
         ++extraHere) {
      if (remaining - extraHere < 0) break;
      word[position] = 1 + extraHere;
      enumerate(position + 1, remaining - extraHere);
    }
    word[position] = 1;
  }
  enumerate(0, extra);
}

function printBest(label, row) {
  if (row === null) return;
  console.log(`${label}_r=${row.r}`);
  console.log(`${label}_N=${row.N}`);
  console.log(`${label}_T=${row.transitions}`);
  console.log(`${label}_height_range=${row.minHeight},${row.maxHeight}`);
  console.log(`${label}_downward_transitions=${row.downwardTransitions}`);
  console.log(`${label}_downward_variation=${row.downwardVariation}`);
  console.log(`${label}_rho=${row.rho}`);
  console.log(`${label}_numerator=${row.numerator}`);
  console.log(`${label}_q=${row.q}`);
  console.log(`${label}_max_rotation_rho=${row.maximumRotationRho}`);
  console.log(`${label}_rho_per_2T_x1e6=${row.rhoScaled}`);
  console.log(`${label}_numerator_per_2T_x1e6=${row.numeratorScaled}`);
  console.log(`${label}_all_rotation_per_2T_x1e6=${row.allRotationScaled}`);
  console.log(`${label}_word=${row.word}`);
}

console.log(`max_r=${maxR}`);
console.log(`compositions_inspected=${inspected}`);
console.log(`primitive_strict_record_words=${strictWords}`);
console.log(`denominator_one_hits=${fullHits}`);
printBest("best_rho", bestRho);
printBest("best_numerator", bestNumerator);
printBest("best_all_rotations", bestAllRotations);
for (const downward of [...bestByDownwardTransitions.keys()].sort(
  (a, b) => a - b)) {
  printBest(`best_down_${downward}`,
    bestByDownwardTransitions.get(downward));
}
console.log("cycle_small_quotient_probe_completed=true");
