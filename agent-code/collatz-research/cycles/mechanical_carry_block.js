#!/usr/bin/env node
"use strict";

/*
Exact certificate for the length-100 mechanical-word carry bound in
../cycle_exclusion.md.

Let beta=log_2(3/2), f(t)=2^(t-1), and

  F_m(t)=sum_{j=0}^{m-1} f({t+j beta}).

Between its discontinuities F_m is strictly increasing.  Its left limits
at the discontinuities are rational because 2^beta=3/2.  We enumerate and
compare all of those rational left limits using BigInt.
*/

const BLOCK = 100;

function gcd(a, b) {
  if (a < 0n) a = -a;
  if (b < 0n) b = -b;
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

function reduced(num, den) {
  if (den <= 0n) throw new Error("nonpositive denominator");
  const g = gcd(num, den);
  return {num: num / g, den: den / g};
}

function add(x, y) {
  return reduced(x.num * y.den + y.num * x.den, x.den * y.den);
}

function greater(x, y) {
  return x.num * y.den > y.num * x.den;
}

/*
Return floor(d log_2(3/2)) using the exact comparison
  2^(d+n) < 3^d < 2^(d+n+1).
The inequalities are strict because 2 and 3 are multiplicatively
independent.
*/
function floorBeta(d) {
  if (!Number.isInteger(d) || d <= 0) throw new Error("d must be positive");
  const power3 = 3n ** BigInt(d);
  let n = 0;
  while ((1n << BigInt(d + n + 1)) <= power3) ++n;
  if (!((1n << BigInt(d + n)) < power3 &&
        power3 < (1n << BigInt(d + n + 1)))) {
    throw new Error("floor-beta bracket failed at d=" + d);
  }
  return n;
}

/*
The left-limit term associated to displacement d from the discontinuous
summand:

 d=0: 1;
 d>0: 2^({d beta}-1)=3^d/2^(d+floor(d beta)+1);
 d<0: 2^({d beta}-1)=2^(e+floor(e beta))/3^e, e=-d.
*/
function leftLimitTerm(d) {
  if (d === 0) return {num: 1n, den: 1n};
  if (d > 0) {
    const n = floorBeta(d);
    return reduced(3n ** BigInt(d), 1n << BigInt(d + n + 1));
  }
  const e = -d;
  const n = floorBeta(e);
  return reduced(1n << BigInt(e + n), 3n ** BigInt(e));
}

let maximum = null;
let maximizingDiscontinuity = -1;

for (let h = 0; h < BLOCK; ++h) {
  let value = {num: 0n, den: 1n};
  for (let j = 0; j < BLOCK; ++j) {
    value = add(value, leftLimitTerm(j - h));
  }
  if (maximum === null || greater(value, maximum)) {
    maximum = value;
    maximizingDiscontinuity = h;
  }
}

if (maximum === null) throw new Error("no block maximum");

// A convenient coarser rational used in the written theorem.
const coarse = {num: 729n, den: 10n}; // 72.9 per block
if (!greater(coarse, maximum)) {
  throw new Error("the certified block maximum is not below 72.9");
}

function decimal(x, places) {
  const scale = 10n ** BigInt(places);
  const q = x.num * scale / x.den;
  const s = q.toString().padStart(places + 1, "0");
  return s.slice(0, -places) + "." + s.slice(-places);
}

console.log("block_length=" + BLOCK);
console.log("maximizing_discontinuity=" + maximizingDiscontinuity);
console.log("exact_block_supremum=" + maximum.num + "/" + maximum.den);
console.log("block_supremum_decimal_lower=" + decimal(maximum, 18));
console.log("certified_block_supremum_lt_72_9=true");
console.log("mechanical_carry_block_passed=true");
