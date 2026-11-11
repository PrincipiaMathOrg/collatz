"use strict";

// Exact regression for the fixed-seed return lattice.
// If two accelerated valuation factors of length L and total exponent B agree,
// their starting odd states differ by a multiple of 2^(B+1), while their
// endpoints differ by a multiple of 2*3^L.  The affine differences satisfy
//
//   2^B (x_{k+L}-x_{j+L}) = 3^L (x_k-x_j).
//
// For an injective orbit, U^d(x)+1 <= (3/2)^d(x+1) then gives the exact
// return obstruction
//
//   2^(B+d+1) < 3^d (x_j+1),  d=k-j.

function v2(n) {
  let a = 0;
  while ((n & 1n) === 0n) {
    n >>= 1n;
    ++a;
  }
  return a;
}

function acceleratedOrbit(seed, steps) {
  const states = [seed];
  const valuations = [];
  const first = new Map([[seed.toString(), 0]]);
  let x = seed;
  for (let i = 0; i < steps; ++i) {
    const numerator = 3n * x + 1n;
    const a = v2(numerator);
    x = numerator >> BigInt(a);
    valuations.push(a);
    states.push(x);
    const key = x.toString();
    if (first.has(key)) return {states, valuations, cycleAt: i + 1};
    first.set(key, i + 1);
  }
  return {states, valuations, cycleAt: null};
}

function wordKey(a, j, length) {
  return a.slice(j, j + length).join(",");
}

let compared = 0;
let injectiveCompared = 0;
let largestB = 0;
let tightestNumerator = null;
let tightestRow = null;

for (let seed = 1n; seed <= 19999n; seed += 2n) {
  const data = acceleratedOrbit(seed, 90);
  const usable = data.cycleAt === null ? data.valuations.length : data.cycleAt;
  for (let length = 1; length <= 12 && 2 * length <= usable; ++length) {
    const seen = new Map();
    for (let k = 0; k + length <= usable; ++k) {
      const key = wordKey(data.valuations, k, length);
      if (!seen.has(key)) {
        seen.set(key, k);
        continue;
      }
      const j = seen.get(key);
      const d = k - j;
      let B = 0;
      for (let t = 0; t < length; ++t) B += data.valuations[j + t];
      if (B > largestB) largestB = B;

      const startDifference = data.states[k] - data.states[j];
      const endDifference = data.states[k + length] - data.states[j + length];
      const twoB = 1n << BigInt(B);
      const startModulus = 2n * twoB;
      const threeL = 3n ** BigInt(length);

      if (startDifference % startModulus !== 0n)
        throw new Error("dyadic cylinder failure");
      if (twoB * endDifference !== threeL * startDifference)
        throw new Error("affine difference failure");
      if (endDifference % (2n * threeL) !== 0n)
        throw new Error("ternary endpoint failure");
      ++compared;

      if (data.states[j] === data.states[k]) continue;
      ++injectiveCompared;
      const lhs = 1n << BigInt(B + d + 1);
      const rhs = (3n ** BigInt(d)) * (data.states[j] + 1n);
      if (lhs >= rhs) throw new Error("return-growth obstruction failure");
      const numerator = rhs - lhs;
      if (tightestNumerator === null || numerator < tightestNumerator) {
        tightestNumerator = numerator;
        tightestRow = {seed, j, k, d, length, B, lhs, rhs, numerator};
      }
    }
  }
}

console.log(`compared_equal_factors=${compared}`);
console.log(`injective_equal_factors=${injectiveCompared}`);
console.log(`largest_total_exponent=${largestB}`);
console.log("tightest=" + Object.entries(tightestRow)
  .map(([key, value]) => `${key}=${value}`).join(" "));
console.log("certificate_passed=true");
