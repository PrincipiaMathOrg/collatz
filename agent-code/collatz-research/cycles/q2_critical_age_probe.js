#!/usr/bin/env node
"use strict";

/*
Finite probe for the Reid-age spectrum of the cyclic critical group attached
to a q_s=2 ballot word.  The left kernel of the cyclic toppling matrix modulo
D gives weights w_i in Z/DZ.  Denominator one is equivalent to

  sum_i w_i = 0 mod D,

and then every age(k)=sum_i [k w_i]_D / D is integral.  We record whether a
canonical multiplier or the full small-modulus spectrum produces an age
strictly between 1 and 2.  This is exploratory finite evidence only.
*/

const maxWeight = Number(process.argv[2] || 16);
const fullScanLimit = BigInt(process.argv[3] || 100000);

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
let ageOneCanonical = 0;
let canonicalBelowTwo = 0;
let canonicalAtLeastTwo = 0;
let fullScans = 0;
let fullMinimumBelowTwo = 0;
let fullMinimumAtLeastTwo = 0;
let gorensteinProfiles = 0;
const firstCanonicalAtLeastTwo = [];
const firstFullMinimumAtLeastTwo = [];
const smallestCanonicalExcess = [];

for (let weight = 3; weight <= maxWeight; ++weight) {
  const P = 3n ** BigInt(weight);
  const N = bitLength(P);
  if (N - bitLength(P / 3n) !== 1) continue;
  ++q2Rows;
  const M = 1n << BigInt(N);
  const D = M - P;
  const inverseThree = inverse(3n, D);
  const maxima = Array(weight).fill(0);
  for (let i = 1; i < weight; ++i) {
    maxima[i] = bitLength(3n ** BigInt(i)) - 1 - i;
  }
  const delays = Array(weight).fill(0);

  function inspect() {
    ++profiles;
    const exponents = [];
    for (let i = 0; i < weight - 1; ++i) {
      exponents.push(1 + delays[i + 1] - delays[i]);
    }
    exponents.push(N - (weight - 1 + delays[weight - 1]));
    assert(exponents.reduce((sum, value) => sum + value, 0) === N,
      "exponent total changed");

    const weights = [1n];
    for (let j = 0; j < weight - 1; ++j) {
      const diagonal = 1n << BigInt(exponents[(j + weight - 1) % weight]);
      weights.push(mod(diagonal * weights[j] * inverseThree, D));
    }
    assert(weights.every(value => value > 0n), "zero critical weight");

    function ageNumerator(k) {
      return weights.reduce((sum, value) => sum + mod(k * value, D), 0n);
    }

    const canonical = ageNumerator(1n);
    if (canonical % D === 0n) ++gorensteinProfiles;
    if (canonical === D) ++ageOneCanonical;
    if (canonical < 2n * D) ++canonicalBelowTwo;
    else {
      ++canonicalAtLeastTwo;
      if (firstCanonicalAtLeastTwo.length < 20) {
        firstCanonicalAtLeastTwo.push({
          weight,
          delays: delays.slice(),
          exponents,
          D: D.toString(),
          ageNumerator: canonical.toString(),
          ageFloor: (canonical / D).toString()
        });
      }
    }

    if (canonical > D) {
      smallestCanonicalExcess.push({
        numerator: canonical,
        denominator: D,
        weight,
        delays: delays.slice(),
        exponents
      });
      smallestCanonicalExcess.sort((a, b) => {
        const left = (a.numerator - a.denominator) * b.denominator;
        const right = (b.numerator - b.denominator) * a.denominator;
        return left < right ? -1 : left > right ? 1 : 0;
      });
      if (smallestCanonicalExcess.length > 12) smallestCanonicalExcess.pop();
    }

    if (D > fullScanLimit) return;
    ++fullScans;
    let minimum = null;
    let minimizingK = 0n;
    for (let k = 1n; k < D; ++k) {
      const value = ageNumerator(k);
      if (minimum === null || value < minimum) {
        minimum = value;
        minimizingK = k;
      }
    }
    assert(minimum !== null, "empty age spectrum");
    if (minimum < 2n * D) ++fullMinimumBelowTwo;
    else {
      ++fullMinimumAtLeastTwo;
      if (firstFullMinimumAtLeastTwo.length < 20) {
        firstFullMinimumAtLeastTwo.push({
          weight,
          delays: delays.slice(),
          exponents,
          D: D.toString(),
          minimumNumerator: minimum.toString(),
          minimizingK: minimizingK.toString()
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
  probe: "Reid ages of q2 cyclic critical-group actions",
  maxWeight,
  fullScanLimit: fullScanLimit.toString(),
  q2Rows,
  profiles,
  gorensteinProfiles,
  ageOneCanonical,
  canonicalBelowTwo,
  canonicalAtLeastTwo,
  fullScans,
  fullMinimumBelowTwo,
  fullMinimumAtLeastTwo,
  firstCanonicalAtLeastTwo,
  firstFullMinimumAtLeastTwo,
  smallestCanonicalExcess: smallestCanonicalExcess.map(row => ({
    weight: row.weight,
    delays: row.delays,
    exponents: row.exponents,
    numerator: row.numerator.toString(),
    denominator: row.denominator.toString()
  })),
  warning: "finite exploratory evidence only"
}, null, 2));
