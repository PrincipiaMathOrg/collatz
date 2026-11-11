"use strict";

// Exact finite audit of the square-root-rise rational family from
// cycle_one_drop_critical_polynomial_gate.md.

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function bitLength(n) {
  return n.toString(2).length;
}

function gcd(a, b) {
  while (b !== 0n) {
    const t = a % b;
    a = b;
    b = t;
  }
  return a;
}

function v2(n) {
  let ans = 0;
  while ((n & 1n) === 0n) {
    n >>= 1n;
    ans += 1;
  }
  return ans;
}

function makeRow(r) {
  const rBig = BigInt(r);
  const threeR = 3n ** rBig;
  const N = bitLength(threeR);
  const e = N - r;
  let U = Math.ceil((4 * Math.sqrt(r)) / 3);
  while (9 * U * U < 16 * r) {
    U += 1;
  }
  while (U > 0 && 9 * (U - 1) * (U - 1) >= 16 * r) {
    U -= 1;
  }

  const oneTimes = [];
  let previous = 0;
  for (let t = 1; t < r; t += 1) {
    const current = Math.floor((e * t) / r);
    if (current !== previous) {
      assert(current === previous + 1, "clock jump exceeded one");
      oneTimes.push(t);
    }
    previous = current;
  }
  assert(oneTimes.length === e - 1, "internal clock count failed");
  assert(oneTimes[0] === 2, "first one-site was not two");
  assert(U + 1 < oneTimes.length, "row is too short");

  // Spike the first one-site, omit the next U one-sites, and spike every
  // remaining one-site.
  const spikeTimes = [oneTimes[0], ...oneTimes.slice(U + 1)];
  const spikeSet = new Set(spikeTimes);
  const V = spikeTimes.length;
  assert(V === e - 1 - U, "spike count failed");

  let J = 0n;
  for (let j = 0; j < V; j += 1) {
    const t = spikeTimes[j];
    J +=
      3n ** BigInt(r - 1 - t) *
      2n ** BigInt(t + j - 1);
  }

  const L = r - 1 + V;
  assert(L === N - U - 2, "modulus exponent failed");
  const D = 2n ** BigInt(N) - threeR;
  const K = 3n * J + 2n ** BigInt(N - 1) - 2n ** BigInt(L);
  const common = gcd(K, D);
  const p0 = K / common;
  const d = D / common;
  assert((d & 1n) === 1n && d > 1n, "reduced denominator failed");
  assert(d < p0 && p0 < 2n * d, "Q was not in (1,2)");

  let p = p0;
  let strict = true;
  const valuationWord = [];
  for (let t = 1; t < r; t += 1) {
    if (spikeSet.has(t)) {
      const numerator = 3n * p + d;
      assert(numerator % 4n === 0n, "spike domain failed");
      p = numerator / 4n;
      valuationWord.push(2);
    } else {
      assert(p % 2n === 0n, "ordinary domain failed");
      p = (3n * p) / 2n;
      valuationWord.push(1);
    }
    if (!(p > p0)) {
      strict = false;
    }
  }
  assert(strict, "strict leastness failed");
  assert(
    3n * p - d === 2n ** BigInt(U + 1) * (2n * p0 - d),
    "bottom closure failed"
  );

  // The first spike is followed by ordinary branches until the second
  // spike. The numerator after that spike carries the corresponding
  // unbounded dyadic reset.
  const secondSpike = spikeTimes[1];
  const expectedReset = secondSpike - 3;
  let pAfterFirstSpike = p0;
  pAfterFirstSpike = (3n * pAfterFirstSpike) / 2n;
  pAfterFirstSpike = (3n * pAfterFirstSpike + d) / 4n;
  assert(
    v2(pAfterFirstSpike) === expectedReset,
    "first reset valuation failed"
  );

  return {
    r,
    N,
    U,
    V,
    secondSpike,
    reset: expectedReset,
    denominatorDigits: d.toString().length,
  };
}

let rows = 0;
let last = null;
for (let r = 80; r <= 512; r += 1) {
  const rBig = BigInt(r);
  const N = bitLength(3n ** rBig);

  // delta=N-r log_2(3) >= 3/4 iff 2^(4N) >= 8*3^(4r).
  if (2n ** BigInt(4 * N) < 8n * 3n ** BigInt(4 * r)) {
    continue;
  }
  last = makeRow(r);
  rows += 1;
}

assert(rows > 100, "too few separated-phase rows");
assert(last !== null, "no row was checked");

console.log("sqrt_r_rational_rows=" + rows);
console.log("last_row=" + JSON.stringify(last));
console.log("sqrt_r_rational_no_go_certificate=PASS");
