#!/usr/bin/env node
"use strict";

/*
Exploratory exact audit for the two-level Bezout-base deformation gate.
All divisibility and record comparisons use BigInt.  The enumeration is a
falsification harness, not an all-depth proof.
*/

const maxR = Number(process.argv[2] || 17);
const alpha = Math.log2(3);

function gcd(a, b) {
  while (b !== 0n) [a, b] = [b, a % b];
  return a < 0n ? -a : a;
}

function affineData(word) {
  let carry = 0n, A = 0n;
  for (const a of word) {
    carry = 3n * carry + (1n << A);
    A += BigInt(a);
  }
  return {carry, A};
}

function isProperPower(word) {
  for (let d = 1; d < word.length; ++d) {
    if (word.length % d !== 0) continue;
    let ok = true;
    for (let i = d; i < word.length; ++i) {
      if (word[i] !== word[i % d]) { ok = false; break; }
    }
    if (ok) return true;
  }
  return false;
}

function levels(word, N) {
  let prefix = 0;
  const ans = [];
  for (let j = 0; j < word.length; ++j) {
    ans.push(Math.floor(j * N / word.length) - prefix);
    prefix += word[j];
  }
  return ans;
}

function isStrictRecord(word, N) {
  let prefix = 0n;
  for (let i = 0; i < word.length - 1; ++i) {
    prefix += BigInt(word[i]);
    if ((1n << (BigInt(N) - prefix)) <=
        3n ** BigInt(word.length - i - 1)) return false;
  }
  return true;
}

const rows = [];
let bestProperFactor = null;

for (let r = 2; r <= maxR; ++r) {
  const N = Math.ceil(alpha * r - 1e-12);
  if (gcd(BigInt(N), BigInt(r)) !== 1n) continue;
  const D = (1n << BigInt(N)) - 3n ** BigInt(r);
  let strictPrimitive = 0;
  let zeroOne = 0;
  let minusOneZero = 0;
  let properFactor = 0;
  let full = 0;

  function visit(i, sum, word) {
    if (i === r) {
      if (sum !== N || !isStrictRecord(word, N) || isProperPower(word)) return;
      ++strictPrimitive;
      const ms = levels(word, N);
      const distinct = [...new Set(ms)].sort((a, b) => a - b);
      const isZeroOne = distinct.every(x => x === 0 || x === 1);
      const isMinusOneZero = distinct.every(x => x === -1 || x === 0);
      if (!isZeroOne && !isMinusOneZero) return;
      if (isZeroOne) ++zeroOne;
      if (isMinusOneZero) ++minusOneZero;

      const {carry} = affineData(word);
      const common = gcd(D, carry);
      if (common === D) ++full;
      if (common > 1n && common < D) {
        ++properFactor;
        const denominator = D / common;
        if (bestProperFactor === null || denominator < bestProperFactor.denominator) {
          bestProperFactor = {
            word: word.slice(), N, r, D, carry, common, denominator,
            levels: ms.slice(), kind: isZeroOne ? "01" : "-10"
          };
        }
      }
      return;
    }

    const remaining = r - i - 1;
    const largest = N - sum - remaining;
    for (let a = 1; a <= largest; ++a) {
      const next = sum + a;
      if (i < r - 1 &&
          (1n << BigInt(N - next)) <= 3n ** BigInt(r - i - 1)) continue;
      word.push(a);
      visit(i + 1, next, word);
      word.pop();
    }
  }

  visit(0, 0, []);
  rows.push({r, N, strictPrimitive, zeroOne, minusOneZero, properFactor, full});
}

console.log("r,N,strict_primitive,levels_01,levels_minus10,proper_factor,full_D");
for (const row of rows) {
  console.log([
    row.r, row.N, row.strictPrimitive, row.zeroOne, row.minusOneZero,
    row.properFactor, row.full
  ].join(","));
}
if (bestProperFactor) {
  console.log("best_word=" + bestProperFactor.word.join("."));
  console.log("best_N=" + bestProperFactor.N);
  console.log("best_r=" + bestProperFactor.r);
  console.log("best_levels=" + bestProperFactor.levels.join(","));
  console.log("best_kind=" + bestProperFactor.kind);
  console.log("best_D=" + bestProperFactor.D);
  console.log("best_carry=" + bestProperFactor.carry);
  console.log("best_common_factor=" + bestProperFactor.common);
  console.log("best_reduced_denominator=" + bestProperFactor.denominator);
}
// A singleton level-1 deformation can vanish modulo a proper factor even
// though the resultant theorem prevents vanishing modulo all of D.
const singletonWord = [1, 2, 1, 2, 1, 2, 2, 2];
const singletonData = affineData(singletonWord);
const singletonD = (1n << singletonData.A) - 3n ** 8n;
const singletonCommon = gcd(singletonD, singletonData.carry);
const singletonDenominator = singletonD / singletonCommon;
const singletonLevels = levels(singletonWord, 13);
let singletonNumerator = singletonData.carry / singletonCommon;
const singletonStates = [singletonNumerator];
for (const a of singletonWord) {
  const value = 3n * singletonNumerator + singletonDenominator;
  if (value % (1n << BigInt(a)) !== 0n ||
      value % (1n << BigInt(a + 1)) === 0n) {
    throw new Error("singleton countermodel valuation failed");
  }
  singletonNumerator = value >> BigInt(a);
  singletonStates.push(singletonNumerator);
}
if (singletonData.A !== 13n || singletonD !== 1631n ||
    singletonData.carry !== 13349n || singletonCommon !== 7n ||
    singletonDenominator !== 233n || isProperPower(singletonWord) ||
    !isStrictRecord(singletonWord, 13) ||
    singletonLevels.join(",") !== "0,0,0,0,0,1,0,0" ||
    singletonNumerator !== singletonStates[0] ||
    singletonStates.slice(0, -1).some(x => x < singletonStates[0])) {
  throw new Error("singleton proper-factor countermodel failed");
}
console.log("singleton_countermodel_word=" + singletonWord.join("."));
console.log("singleton_countermodel_levels=" + singletonLevels.join(","));
console.log("singleton_countermodel_D=" + singletonD);
console.log("singleton_countermodel_carry=" + singletonData.carry);
console.log("singleton_countermodel_common_factor=" + singletonCommon);
console.log("singleton_countermodel_reduced_denominator=" + singletonDenominator);
console.log("singleton_countermodel_states=" + singletonStates.slice(0, -1).join(",") + "/233");
console.log("two_level_deformation_audit_passed=true");
