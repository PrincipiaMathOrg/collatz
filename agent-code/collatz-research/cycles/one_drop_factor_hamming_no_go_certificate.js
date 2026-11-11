#!/usr/bin/env node
"use strict";

// Exact audit for the near-factor no-go.  It finds genuine nonterminal
// factors of one-drop words at Hamming distances 1,2,3,4, realizes each
// factor by an odd Collatz cylinder, and verifies that the natural aligned
// local carry difference is a nonzero integer smaller than D but is not
// divisible by D.

function pow2(k) { return 1n << BigInt(k); }
function pow3(k) { return 3n ** BigInt(k); }
function abs(n) { return n < 0n ? -n : n; }

function inverseMod(a, modulus) {
  let oldR = ((a % modulus) + modulus) % modulus;
  let r = modulus;
  let oldS = 1n;
  let s = 0n;
  while (r !== 0n) {
    const q = oldR / r;
    [oldR, r] = [r, oldR - q * r];
    [oldS, s] = [s, oldS - q * s];
  }
  if (oldR !== 1n) throw new Error("inverse");
  return ((oldS % modulus) + modulus) % modulus;
}

function v2(n) {
  let value = 0;
  while (n % 2n === 0n) {
    n /= 2n;
    ++value;
  }
  return value;
}

function factorData(word) {
  let exponent = 0;
  let carry = 0n;
  for (const letter of word) {
    carry = 3n * carry + pow2(exponent);
    exponent += letter;
  }
  return { exponent, carry };
}

function exactCylinderStart(word) {
  const datum = factorData(word);
  const modulus = pow2(datum.exponent + 1);
  const raw = (pow2(datum.exponent) - datum.carry) *
    inverseMod(pow3(word.length), modulus);
  const residue = ((raw % modulus) + modulus) % modulus;
  return residue === 0n ? modulus : residue;
}

function iterate(start, word) {
  let state = start;
  for (const letter of word) {
    const numerator = 3n * state + 1n;
    if (v2(numerator) !== letter) throw new Error("valuation mismatch");
    state = numerator / pow2(letter);
  }
  return state;
}

function parameters(r) {
  const power = pow3(r);
  const N = power.toString(2).length;
  const baseline = [];
  const eligible = [];
  for (let j = 0; j < r; ++j) {
    const letter =
      Math.floor((j + 1) * N / r) - Math.floor(j * N / r);
    baseline.push(letter);
    if (j < r - 1 && letter === 2) eligible.push(j);
  }
  return { N, baseline, eligible };
}

function hamming(left, right) {
  let distance = 0;
  for (let j = 0; j < left.length; ++j) {
    if (left[j] !== right[j]) ++distance;
  }
  return distance;
}

function key(word) { return word.join(","); }

const examples = new Map();

for (let r = 5; r <= 22 && examples.size < 4; ++r) {
  const datum = parameters(r);
  if (datum.eligible.length >= 31) throw new Error("mask cutoff");
  const D = pow2(datum.N) - pow3(r);
  const masks = 2 ** datum.eligible.length;
  for (let mask = 1; mask < masks && examples.size < 4; ++mask) {
    const omissions = [];
    for (let j = 0; j < datum.eligible.length; ++j) {
      if ((mask & 2 ** j) !== 0) omissions.push(datum.eligible[j]);
    }
    const word = datum.baseline.slice();
    for (const position of omissions) word[position] = 1;
    word[r - 1] = omissions.length + 2;

    for (let L = 2; L <= Math.min(10, r - 1); ++L) {
      const factors = new Map();
      for (let start = 0; start + L <= r - 1; ++start) {
        const factor = word.slice(start, start + L);
        factors.set(key(factor), factor);
      }
      const list = [...factors.values()];
      for (let i = 0; i < list.length; ++i) {
        for (let j = i + 1; j < list.length; ++j) {
          const distance = hamming(list[i], list[j]);
          if (distance < 1 || distance > 4 || examples.has(distance)) {
            continue;
          }
          const left = factorData(list[i]);
          const right = factorData(list[j]);
          const localSparse =
            pow2(right.exponent) * left.carry -
            pow2(left.exponent) * right.carry;
          if (localSparse === 0n || abs(localSparse) >= D ||
              localSparse % D === 0n) {
            continue;
          }

          const y = exactCylinderStart(list[i]);
          const z = exactCylinderStart(list[j]);
          const yEnd = iterate(y, list[i]);
          const zEnd = iterate(z, list[j]);
          const affineLeft =
            pow2(left.exponent + right.exponent) * (yEnd - zEnd);
          const affineRight =
            pow3(L) *
              (pow2(right.exponent) * y -
               pow2(left.exponent) * z) +
            localSparse;
          if (affineLeft !== affineRight) throw new Error("affine identity");

          examples.set(distance, {
            r,
            N: datum.N,
            U: omissions.length,
            L,
            left: key(list[i]),
            right: key(list[j]),
            localSparse: localSparse.toString(),
            D: D.toString(),
            leftStart: y.toString(),
            rightStart: z.toString(),
          });
        }
      }
    }
  }
}

for (let distance = 1; distance <= 4; ++distance) {
  if (!examples.has(distance)) {
    throw new Error("missing Hamming distance " + distance);
  }
}

// Two opposite unit letter changes can have arbitrarily long prefix-height
// support.  This is the support seen by the frozen deformation resultants.
const supportLength = 37;
const fullLength = 64;
const left = new Array(fullLength).fill(1);
const right = left.slice();
left[3] = 2;
right[3] = 1;
left[3 + supportLength] = 1;
right[3 + supportLength] = 2;
if (hamming(left, right) !== 2) throw new Error("full Hamming example");
let leftPrefix = 0;
let rightPrefix = 0;
let nonzeroPrefixSupport = 0;
for (let i = 0; i < fullLength; ++i) {
  if (leftPrefix !== rightPrefix) ++nonzeroPrefixSupport;
  leftPrefix += left[i];
  rightPrefix += right[i];
}
if (leftPrefix !== rightPrefix) throw new Error("unequal full sums");
if (nonzeroPrefixSupport !== supportLength) {
  throw new Error("prefix support length");
}

// The maximal one-drop profile itself has the same phenomenon: all
// preterminal letters are one and the unique terminal letter is e+1.
const oneDropR = 64;
const oneDropN = pow3(oneDropR).toString(2).length;
const oneDropTerminal = oneDropN - oneDropR + 1;
const oneDropWord = new Array(oneDropR).fill(1);
oneDropWord[oneDropR - 1] = oneDropTerminal;
const rotation = 31;
const rotatedWord = Array.from({length: oneDropR}, (unused, i) =>
  oneDropWord[(i + rotation) % oneDropR]);
if (hamming(oneDropWord, rotatedWord) !== 2) {
  throw new Error("one-drop rotation Hamming distance");
}
let originalPrefix = 0;
let rotatedPrefix = 0;
let oneDropPrefixSupport = 0;
for (let i = 0; i < oneDropR; ++i) {
  if (originalPrefix !== rotatedPrefix) ++oneDropPrefixSupport;
  originalPrefix += oneDropWord[i];
  rotatedPrefix += rotatedWord[i];
}
if (oneDropPrefixSupport !== rotation) {
  throw new Error("one-drop rotation prefix support");
}

console.log(JSON.stringify({
  examples: Object.fromEntries(examples),
  hammingTwoPrefixSupport: nonzeroPrefixSupport,
  oneDropRotationPrefixSupport: oneDropPrefixSupport,
  status: "PASS",
}));
