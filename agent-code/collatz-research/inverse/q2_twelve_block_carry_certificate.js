#!/usr/bin/env node
"use strict";

// Exact certificate for the uniform twelve-cell maximal-carry bound
//   sum_{k=0}^{11} 2^{-frac(x+k*beta)} < 9,
// where beta=log_2(3/2).  Between its twelve cut points the sum is strictly
// decreasing, so it is enough to evaluate the right-hand value at each cut.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function gcd(a, b) {
  if (a < 0n) a = -a;
  if (b < 0n) b = -b;
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

function add(x, y) {
  const numerator = x.n * y.d + y.n * x.d;
  const denominator = x.d * y.d;
  const divisor = gcd(numerator, denominator);
  return {n: numerator / divisor, d: denominator / divisor};
}

function floorPositiveBeta(m) {
  assert(Number.isInteger(m) && m >= 0, "invalid beta multiple");
  const power3 = 3n ** BigInt(m);
  return power3.toString(2).length - 1 - m;
}

// Exact rational value of 2^{-frac(m*beta)} for an integer m.
function phaseTerm(m) {
  if (m >= 0) {
    const floor = floorPositiveBeta(m);
    return {
      n: 2n ** BigInt(floor + m),
      d: 3n ** BigInt(m)
    };
  }
  const positive = -m;
  // beta is irrational, so floor(-positive*beta)=-floor(positive*beta)-1.
  const floor = -floorPositiveBeta(positive) - 1;
  return {
    n: 3n ** BigInt(positive),
    d: 2n ** BigInt(positive - floor)
  };
}

const values = [];
let maximum = null;
let maximumCut = -1;
for (let j = 0; j < 12; ++j) {
  let sum = {n: 0n, d: 1n};
  for (let k = 0; k < 12; ++k) {
    sum = add(sum, phaseTerm(k - j));
  }
  values.push(sum);
  assert(sum.n < 9n * sum.d, `twelve-block bound failed at cut ${j}`);
  if (maximum === null || sum.n * maximum.d > maximum.n * sum.d) {
    maximum = sum;
    maximumCut = j;
  }
}

assert(maximumCut === 11, "maximum cut changed");
assert(maximum.n === 2349463n && maximum.d === 262144n,
  "exact maximum changed");

console.log("cut_values=" + values.map(value =>
  `${value.n}/${value.d}`).join(","));
console.log(`maximum_cut=${maximumCut}`);
console.log(`maximum_value=${maximum.n}/${maximum.d}`);
console.log("maximum_less_than_9=true");
console.log("twelve_block_maximal_carry_bound=true");
