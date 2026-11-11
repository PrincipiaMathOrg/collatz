"use strict";

// Exact arithmetic audit for the constants and local integer shadows in
// cycle_one_drop_terminal_3adic_lock_no_go.md. The external p-adic
// logarithm theorem itself is not re-proved here.

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function powMod(base, exponent, modulus) {
  let b = ((base % modulus) + modulus) % modulus;
  let e = exponent;
  let answer = 1n;
  while (e > 0n) {
    if ((e & 1n) === 1n) {
      answer = (answer * b) % modulus;
    }
    b = (b * b) % modulus;
    e >>= 1n;
  }
  return answer;
}

function valuation(number, prime) {
  let n = number;
  let value = 0;
  while (n % prime === 0n) {
    n /= prime;
    value += 1;
  }
  return value;
}

function acceleratedOddStep(x) {
  let value = 3n * x + 1n;
  let exponent = 0;
  while ((value & 1n) === 0n) {
    value >>= 1n;
    exponent += 1;
  }
  return { next: value, exponent };
}

function gcd(a, b) {
  let x = a < 0n ? -a : a;
  let y = b < 0n ? -b : b;
  while (y !== 0n) {
    const remainder = x % y;
    x = y;
    y = remainder;
  }
  return x;
}

function fraction(numerator, denominator) {
  assert(denominator !== 0n, "zero fraction denominator");
  let n = numerator;
  let d = denominator;
  if (d < 0n) {
    n = -n;
    d = -d;
  }
  const common = gcd(n, d);
  return { n: n / common, d: d / common };
}

function add(left, right) {
  return fraction(
    left.n * right.d + right.n * left.d,
    left.d * right.d,
  );
}

function multiply(left, right) {
  return fraction(left.n * right.n, left.d * right.d);
}

function divide(left, right) {
  return fraction(left.n * right.d, left.d * right.n);
}

function compare(left, right) {
  const difference = left.n * right.d - right.n * left.d;
  return difference < 0n ? -1 : difference > 0n ? 1 : 0;
}

// For 0 < z < 1,
// 2 sum_{k=0}^m z^(2k+1)/(2k+1)
//   < log((1+z)/(1-z))
//   < partial sum + 2 z^(2m+3)/((2m+3)(1-z^2)).
function logarithmBounds(zNumerator, zDenominator, m) {
  let lower = fraction(0n, 1n);
  for (let k = 0; k <= m; k += 1) {
    const power = BigInt(2 * k + 1);
    const term = fraction(
      2n * (zNumerator ** power),
      BigInt(2 * k + 1) * (zDenominator ** power),
    );
    lower = add(lower, term);
  }
  const tailPower = BigInt(2 * m + 3);
  const zPower = fraction(
    zNumerator ** tailPower,
    zDenominator ** tailPower,
  );
  const oneMinusZSquared = fraction(
    zDenominator ** 2n - zNumerator ** 2n,
    zDenominator ** 2n,
  );
  const tail = divide(
    multiply(fraction(2n, BigInt(2 * m + 3)), zPower),
    oneMinusZSquared,
  );
  return { lower, upper: add(lower, tail) };
}

const yuRationalCoefficient =
  1312n * 1892n * 1892n * 2n * 6n * 3n;
assert(
  yuRationalCoefficient === 169074690048n,
  "Yu coefficient multiplication failed",
);

// K * 27.2 < 4.599e12, checked after clearing the denominator 5.
assert(
  yuRationalCoefficient * 136n < 4599000000000n * 5n,
  "suffix-length decimal bound failed",
);

// (3/5) * K * 27.2 < 2.76e12, checked after clearing 25.
assert(
  yuRationalCoefficient * 408n < 2760000000000n * 25n,
  "height-tail decimal bound failed",
);

// Exact rational certificates for the logarithm intervals used at U=10^16.
const log2Lower = logarithmBounds(1n, 3n, 2).lower;
const log2Upper = logarithmBounds(1n, 3n, 3).upper;
const log3Upper = logarithmBounds(1n, 2n, 1).upper;
const logFiveFourthsUpper = logarithmBounds(1n, 9n, 1).upper;
const log10Upper = add(
  multiply(fraction(3n, 1n), log2Upper),
  logFiveFourthsUpper,
);
assert(
  compare(log2Lower, fraction(693n, 1000n)) > 0,
  "log(2) > 0.693 certificate failed",
);
assert(
  compare(log3Upper, fraction(11n, 10n)) <= 0,
  "log(3) < 1.1 certificate failed",
);
assert(
  compare(log10Upper, fraction(2303n, 1000n)) < 0,
  "log(10) < 2.303 certificate failed",
);

const thresholdU = 10000000000000000n;
const suffixDecimalCoefficient = 4599000000000n;
const upperLogUScaled = 16n * 2303n;

// At U=10^16:
// 4.599e12 log(U)^2 < 0.63 U < log_3(2) U.
assert(
  suffixDecimalCoefficient * (upperLogUScaled ** 2n) * 100n <
    63n * thresholdU * 1000000n,
  "3^L < 2^U threshold audit failed",
);

// Also 2.76e12 log(U)^2 < 3U/8 at U=10^16.
assert(
  2760000000000n * (upperLogUScaled ** 2n) * 8n <
    3n * thresholdU * 1000000n,
  "H_c > 0.625 U - 1 threshold audit failed",
);

let noSpikeResidues = 0;
for (const residue of [0n, 2n]) {
  const numeratorMod9 = (5n * powMod(2n, residue, 9n) + 1n) % 9n;
  assert(
    numeratorMod9 === 3n || numeratorMod9 === 6n,
    "no-spike residue is not exactly 3-divisible",
  );
  noSpikeResidues += 1;
}

let lastSpikeResidues = 0;
for (const residue of [10n, 16n]) {
  const numeratorMod27 = (5n * powMod(2n, residue, 27n) + 1n) % 27n;
  assert(
    numeratorMod27 === 9n || numeratorMod27 === 18n,
    "last-spike residue is not exactly 9-divisible",
  );
  lastSpikeResidues += 1;
}

// One exact representative of the L=1 no-spike shadow.
const noSpikeA = 6n;
const noSpikeNumerator = 5n * (2n ** noSpikeA) + 1n;
assert(valuation(noSpikeNumerator, 3n) === 1, "L=1 valuation failed");
const noSpikeY = noSpikeNumerator / 3n;
const noSpikeState = 2n * noSpikeY - 1n;
const noSpikeStep = acceleratedOddStep(noSpikeState);
assert(noSpikeStep.next === 5n, "L=1 shadow does not land at 5");
assert(
  noSpikeStep.exponent === Number(noSpikeA + 1n),
  "L=1 terminal exponent failed",
);

// One exact representative of the L=2 last-spike shadow.
const lastSpikeA = 10n;
const lastSpikeNumerator = 5n * (2n ** lastSpikeA) + 1n;
assert(valuation(lastSpikeNumerator, 3n) === 2, "L=2 valuation failed");
const lastSpikeY = lastSpikeNumerator / 9n;
assert(lastSpikeY % 4n === 1n, "L=2 quotient is not 1 mod 4");
const lastSpikeState = 2n * lastSpikeY - 1n;
const lastSpikeFirst = acceleratedOddStep(lastSpikeState);
const lastSpikeSecond = acceleratedOddStep(lastSpikeFirst.next);
assert(lastSpikeFirst.exponent === 2, "last spike does not have exponent 2");
assert(lastSpikeSecond.next === 5n, "L=2 shadow does not land at 5");
assert(
  lastSpikeSecond.exponent === Number(lastSpikeA - 1n),
  "L=2 terminal exponent failed",
);

console.log("yuRationalCoefficient=" + yuRationalCoefficient);
console.log("suffixLengthCoefficient<4599000000000");
console.log("heightTailCoefficient<2760000000000");
console.log("log2>0.693");
console.log("log3<1.1");
console.log("log10<2.303");
console.log("thresholdU=10000000000000000");
console.log("atThreshold:3^L<2^U");
console.log("atThreshold:H_c>0.625U-1");
console.log("noSpikeResidueClasses=" + noSpikeResidues);
console.log("lastSpikeResidueClasses=" + lastSpikeResidues);
console.log("noSpikeWitness=" + noSpikeState + "->5");
console.log(
  "lastSpikeWitness=" + lastSpikeState + "->" + lastSpikeFirst.next + "->5",
);
console.log("status=PASS");
