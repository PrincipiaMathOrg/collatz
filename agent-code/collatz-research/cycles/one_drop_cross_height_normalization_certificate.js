#!/usr/bin/env node
"use strict";

// Exact audit for the cross-height normalization no-go. All unbounded
// arithmetic is represented by BigInt.

const assert = require("node:assert/strict");

function pow2(k) { return 1n << BigInt(k); }
function pow3(k) { return 3n ** BigInt(k); }

function mod(a, m) {
  const z = a % m;
  return z < 0n ? z + m : z;
}

function gcdExtended(a, b) {
  let oldR = a;
  let r = b;
  let oldS = 1n;
  let s = 0n;
  while (r !== 0n) {
    const q = oldR / r;
    [oldR, r] = [r, oldR - q * r];
    [oldS, s] = [s, oldS - q * s];
  }
  return {gcd: oldR, coefficient: oldS};
}

function inverseMod(a, m) {
  const result = gcdExtended(mod(a, m), m);
  assert.equal(result.gcd, 1n);
  return mod(result.coefficient, m);
}

function valuation(n, p) {
  assert.notEqual(n, 0n);
  if (n < 0n) n = -n;
  let value = 0;
  while (n % p === 0n) {
    n /= p;
    ++value;
  }
  return value;
}

function determinant3(rows) {
  const [[a, b, c], [d, e, f], [g, h, i]] = rows;
  return a * (e * i - f * h)
    - b * (d * i - f * g)
    + c * (d * h - e * g);
}

function factorData(word) {
  let exponent = 0;
  let carry = 0n;
  for (const letter of word) {
    carry = 3n * carry + pow2(exponent);
    exponent += letter;
  }
  const length = word.length;
  const modulus = pow2(exponent + 1);
  const residue = mod(
    (pow2(exponent) - carry)
      * inverseMod(pow3(length), modulus),
    modulus
  );
  assert.equal(residue % 2n, 1n);
  return {length, exponent, carry, modulus, residue};
}

function iterate(word, start) {
  let state = start;
  for (const exponent of word) {
    const numerator = 3n * state + 1n;
    assert.equal(valuation(numerator, 2n), exponent);
    state = numerator / pow2(exponent);
    assert.equal(state % 2n, 1n);
  }
  return state;
}

function mechanicalFactors(r, length) {
  const N = pow3(r).toString(2).length;
  const prefix = [];
  for (let j = 0; j <= r; ++j) {
    prefix.push(Math.floor(j * N / r));
  }
  const clock = [];
  for (let j = 0; j < r; ++j) {
    clock.push(prefix[j + 1] - prefix[j]);
  }
  const factors = new Map();
  for (let start = 0; start < r; ++start) {
    const word = [];
    for (let k = 0; k < length; ++k) {
      word.push(clock[(start + k) % r]);
    }
    factors.set(word.join(","), word);
  }
  return {N, factors: [...factors.values()]};
}

function nearestCylinderPoint(target, residue, modulus) {
  const quotient = (target - residue + modulus / 2n) / modulus;
  return residue + quotient * modulus;
}

const maxR = Number(process.argv[2] || 24);
let factorRows = 0;
let heightRows = 0;
let determinantRows = 0;
let shadowRows = 0;

for (let r = 3; r <= maxR; ++r) {
  for (let length = 1; length <= r; ++length) {
    const mechanical = mechanicalFactors(r, length);
    for (const word of mechanical.factors) {
      const data = factorData(word);
      const {exponent: E, carry: c, modulus: M, residue: q} = data;
      const y = q;
      const yPrime = iterate(word, y);
      assert.equal(pow2(E) * yPrime, pow3(length) * y + c);

      const z = y + M;
      const zPrime = iterate(word, z);
      assert.equal(zPrime - yPrime, 2n * pow3(length));
      ++factorRows;

      for (let d = 1; d <= Math.min(E, 12); ++d) {
        const H = z - pow2(d) * y;
        const HPrime = zPrime - pow2(d) * yPrime;
        assert.equal(H % 2n === 0n, false);
        assert.equal(HPrime % 2n === 0n, false);
        assert.equal(
          pow2(E) * HPrime,
          pow3(length) * H + (1n - pow2(d)) * c
        );
        const carryValuation = valuation(pow2(d) - 1n, 3n);
        if (carryValuation < length) {
          assert.equal(valuation(HPrime, 3n), carryValuation);
        }
        ++heightRows;
      }

      const delta = pow2(E) - pow3(length);
      function phi(state) { return delta * state - c; }
      assert.equal(phi(y), pow2(E) * (y - yPrime));
      assert.equal(phi(yPrime), pow3(length) * (y - yPrime));
      assert.equal(phi(z), pow2(E) * (z - zPrime));
      assert.equal(phi(zPrime), pow3(length) * (z - zPrime));
      assert.equal(phi(y) * phi(zPrime) - phi(z) * phi(yPrime), 0n);

      const starts = [q, q + M, q + 2n * M];
      const endpoints = starts.map(start => iterate(word, start));
      const heights = [0, 1, 2];
      const leftRows = starts.map((start, index) => [
        pow2(heights[index]), start, endpoints[index]
      ]);
      const rightRows = starts.map((start, index) => [
        pow2(heights[index]), start, 1n
      ]);
      assert.equal(
        pow2(E) * determinant3(leftRows),
        c * determinant3(rightRows)
      );

      // Products of all pair minors lose the homogeneous 3^L factor.
      const collection = [];
      const collectionSize = Math.min(5, E + 1);
      for (let index = 0; index < collectionSize; ++index) {
        const start = q + BigInt(index) * M;
        collection.push({
          height: index,
          start,
          endpoint: iterate(word, start)
        });
      }
      let pairMinorProduct = 1n;
      let heightMinorProduct = 1n;
      let correctedMinorProduct = 1n;
      let bareEndpointProduct = 1n;
      let expectedThreeValuation = 0;
      let auditedBareProduct = true;
      let pairCount = 0;
      for (let i = 0; i < collection.length; ++i) {
        for (let j = i + 1; j < collection.length; ++j) {
          const first = collection[i];
          const second = collection[j];
          const pairMinor = first.start * second.endpoint
            - second.start * first.endpoint;
          const heightMinor = first.start - second.start;
          assert.equal(pow2(E) * pairMinor, c * heightMinor);
          pairMinorProduct *= pairMinor;
          heightMinorProduct *= heightMinor;
          correctedMinorProduct *= phi(first.start) * phi(second.endpoint)
            - phi(second.start) * phi(first.endpoint);

          const d = second.height - first.height;
          const endpointDefect = second.endpoint
            - pow2(d) * first.endpoint;
          bareEndpointProduct *= endpointDefect;
          const expected = valuation(pow2(d) - 1n, 3n);
          if (expected < length) {
            expectedThreeValuation += expected;
          } else {
            auditedBareProduct = false;
          }
          ++pairCount;
        }
      }
      assert.equal(
        pow2(E * pairCount) * pairMinorProduct,
        (c ** BigInt(pairCount)) * heightMinorProduct
      );
      assert.equal(correctedMinorProduct, 0n);
      if (auditedBareProduct) {
        assert.equal(bareEndpointProduct % 2n === 0n, false);
        assert.equal(
          valuation(bareEndpointProduct, 3n),
          expectedThreeValuation
        );
      }
      ++determinantRows;

      // Exact rational-mechanical estimates used in the shadow theorem.
      assert(pow3(length) < pow2(E + 1));
      assert(4n * pow3(length) > pow2(E));
      assert(3n * c < 2n * BigInt(length) * pow2(E));

      let largeStart = q;
      const lowerTarget = 24n * BigInt(length + 1);
      if (largeStart < lowerTarget) {
        const lifts = (lowerTarget - largeStart + M - 1n) / M;
        largeStart += lifts * M;
      }
      const largeEndpoint = iterate(word, largeStart);
      const scaledTarget = pow2(E) * largeStart;
      const highStart = nearestCylinderPoint(scaledTarget, q, M);
      assert(highStart > 0n);
      const highEndpoint = iterate(word, highStart);
      assert(
        (highStart - scaledTarget < 0n
          ? scaledTarget - highStart
          : highStart - scaledTarget) <= pow2(E)
      );
      const endpointDefect = highEndpoint - pow2(E) * largeEndpoint;
      const endpointAbsolute = endpointDefect < 0n
        ? -endpointDefect
        : endpointDefect;
      assert(
        3n * endpointAbsolute
          < pow2(E) * BigInt(6 + 2 * length)
      );

      // y/6 < each normalized quantity < 3y, checked after clearing.
      assert(6n * highStart > pow2(E) * largeStart);
      assert(highStart < 3n * pow2(E) * largeStart);
      assert(4n * largeEndpoint > largeStart);
      assert(largeEndpoint < 3n * largeStart);
      assert(6n * highEndpoint > pow2(E) * largeStart);
      assert(highEndpoint < 3n * pow2(E) * largeStart);
      ++shadowRows;
    }
  }
}

// The sharp mechanical example from the report.
const twelve = factorData([1, 2]);
assert.deepEqual(
  {
    length: twelve.length,
    exponent: twelve.exponent,
    carry: twelve.carry,
    modulus: twelve.modulus,
    residue: twelve.residue
  },
  {length: 2, exponent: 3, carry: 5n, modulus: 16n, residue: 11n}
);
assert.equal(iterate([1, 2], 11n), 13n);
assert.equal(iterate([1, 2], 43n), 49n);
assert.equal(43n - 4n * 11n, -1n);
assert.equal(49n - 4n * 13n, -3n);

const twentyOne = factorData([2, 1]);
assert.equal(twentyOne.exponent, 3);
assert.equal(twentyOne.carry, 7n);
assert.equal(twentyOne.carry - 4n * twelve.carry, -13n);

console.log(JSON.stringify({
  maxR,
  factorRows,
  heightRows,
  determinantRows,
  shadowRows,
  sharpExample: {
    word: "12",
    startDefect: "-1",
    endpointDefect: "-3"
  },
  status: "PASS"
}));
