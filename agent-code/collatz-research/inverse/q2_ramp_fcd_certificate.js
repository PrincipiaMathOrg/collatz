#!/usr/bin/env node
"use strict";

// Exact finite certificate for the ramp-plus-one-drop q=2 family
//
//     a=(1^(s-2),e,2),     e=ceil(s log_2 3)-s.
//
// It checks the canonical seed and endpoint formulae, distinguishes the
// length-N parity-cylinder representative from its exact accelerated lift,
// verifies the two small exceptions directly, and proves the exact finite
// base of the determinant inequality.  The infinite tail uses the audited
// linear-form input D/P>1/(459*s^14); the exact arithmetic needed to turn
// that input into the tail bound is checked below.

const crypto = require("crypto");

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function mod(a, m) {
  a %= m;
  return a < 0n ? a + m : a;
}

function inverse(a, m) {
  let t = 0n;
  let nextT = 1n;
  let r = m;
  let nextR = mod(a, m);
  while (nextR !== 0n) {
    const q = r / nextR;
    [t, nextT] = [nextT, t - q * nextT];
    [r, nextR] = [nextR, r - q * nextR];
  }
  assert(r === 1n, "inverse does not exist");
  return mod(t, m);
}

function bitLength(n) {
  assert(n > 0n, "bit length requires a positive integer");
  return n.toString(2).length;
}

function valuationTwo(n) {
  assert(n > 0n, "valuation requires a positive integer");
  let v = 0;
  while ((n & 1n) === 0n) {
    n >>= 1n;
    ++v;
  }
  return v;
}

function acceleratedStep(x, exponent) {
  const numerator = 3n * x + 1n;
  assert(valuationTwo(numerator) === exponent,
    `wrong exact exponent ${exponent}`);
  return numerator >> BigInt(exponent);
}

// Rational arithmetic used only to certify exp(6.125581)<459 exactly.
function gcd(a, b) {
  if (a < 0n) a = -a;
  if (b < 0n) b = -b;
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

class Fraction {
  constructor(n, d = 1n) {
    assert(d !== 0n, "zero denominator");
    if (d < 0n) {
      n = -n;
      d = -d;
    }
    const g = gcd(n, d);
    this.n = n / g;
    this.d = d / g;
  }

  add(other) {
    return new Fraction(this.n * other.d + other.n * this.d,
      this.d * other.d);
  }

  sub(other) {
    return new Fraction(this.n * other.d - other.n * this.d,
      this.d * other.d);
  }

  mul(other) {
    return new Fraction(this.n * other.n, this.d * other.d);
  }

  div(other) {
    return new Fraction(this.n * other.d, this.d * other.n);
  }

  lt(other) {
    return this.n * other.d < other.n * this.d;
  }
}

function certifyExponentialConstant() {
  const x = new Fraction(6125581n, 1000000n);
  let term = new Fraction(1n);
  let sum = new Fraction(1n);
  for (let j = 1n; j <= 50n; ++j) {
    term = term.mul(x).div(new Fraction(j));
    sum = sum.add(term);
  }
  const term51 = term.mul(x).div(new Fraction(51n));
  const ratio = x.div(new Fraction(52n));
  const upper = sum.add(term51.div(new Fraction(1n).sub(ratio)));
  assert(upper.lt(new Fraction(459n)),
    "failed to certify exp(6.125581)<459");
  return upper;
}

const finiteLimit = 127;
const tailStart = 128;
const tailConstant = 4590n;
const digest = crypto.createHash("sha256");
let P = 1n;
let q2Weights = 0;
let determinantBaseWeights = 0;
let exactUpperLifts = 0;
let minimumGap = null;
let minimumGapWeight = null;
let minimumDeterminantExcess = null;
let minimumDeterminantExcessWeight = null;
const determinantExceptions = [];

for (let s = 1; s <= finiteLimit; ++s) {
  const previousP = P;
  P *= 3n;
  const N = bitLength(P);
  const previousN = bitLength(previousP);
  if (N - previousN !== 1) continue;
  if (s < 3) continue;

  ++q2Weights;
  const e = N - s;
  assert(e >= 2, `terminal exponent too small at s=${s}`);
  const M = 1n << BigInt(N);
  const D = M - P;
  const C = P + M / 4n - 3n * (1n << BigInt(s - 1));

  // Canonical length-N parity-cylinder representative, 0<=rho<M.
  const uModulus = 1n << BigInt(e + 2);
  const u = mod((6n - (1n << BigInt(e))) * inverse(P, uModulus),
    uModulus);
  assert(0n < u && u < uModulus, `bad canonical u at s=${s}`);
  const rho = (1n << BigInt(s - 2)) * u - 1n;
  assert(0n <= rho && rho < M, `bad canonical rho at s=${s}`);
  assert(mod(P * rho + C, M) === 0n,
    `canonical cylinder congruence failed at s=${s}`);
  const directRho = mod(-C * inverse(P, M), M);
  assert(rho === directRho, `canonical seed formula failed at s=${s}`);

  const endpointNumerator = P * u + (1n << BigInt(e)) - 6n;
  assert(endpointNumerator % uModulus === 0n,
    `endpoint integrality failed at s=${s}`);
  const Z = endpointNumerator / uModulus;
  assert(Z === (P * rho + C) / M,
    `endpoint formula failed at s=${s}`);

  // Unique lift modulo 2M realizing the final exponent exactly as 2.
  const exactModulus = 1n << BigInt(e + 3);
  const uExact = mod((6n + 3n * (1n << BigInt(e))) *
    inverse(P, exactModulus), exactModulus);
  assert(0n < uExact && uExact < exactModulus,
    `bad exact u at s=${s}`);
  assert(uExact === u || uExact === u + uModulus,
    `exact lift is not above canonical seed at s=${s}`);
  const rhoExact = (1n << BigInt(s - 2)) * uExact - 1n;
  assert(rhoExact === rho || rhoExact === rho + M,
    `exact seed lift failed at s=${s}`);
  if (rhoExact === rho + M) ++exactUpperLifts;

  let x = rhoExact;
  for (let j = 0; j < s - 2; ++j) x = acceleratedStep(x, 1);
  x = acceleratedStep(x, e);
  x = acceleratedStep(x, 2);
  const ZExact = (P * uExact + (1n << BigInt(e)) - 6n) /
    uModulus;
  assert(x === ZExact && (ZExact & 1n) === 1n,
    `exact accelerated endpoint failed at s=${s}`);
  assert(ZExact === Z || ZExact === Z + P,
    `exact endpoint lift failed at s=${s}`);

  // This is the identity which proves FCD once its numerator is negative.
  const threshold = 5n * (1n << BigInt(e)) - 6n;
  assert(uModulus * (Z - rho) === threshold - D * u,
    `gap identity failed at s=${s}`);
  const gap = rho - Z;
  assert(gap > 0n, `FCD failed at s=${s}`);
  if (minimumGap === null || gap < minimumGap) {
    minimumGap = gap;
    minimumGapWeight = s;
  }

  if (D <= threshold) {
    determinantExceptions.push({
      s, N, e, D: D.toString(), threshold: threshold.toString(),
      u: u.toString(), rho: rho.toString(), Z: Z.toString()
    });
    assert(s === 3 || s === 5,
      `unexpected determinant exception at s=${s}`);
  } else {
    ++determinantBaseWeights;
    assert(s >= 8, `unexpected early determinant success at s=${s}`);
    const excess = D - threshold;
    if (minimumDeterminantExcess === null ||
        excess < minimumDeterminantExcess) {
      minimumDeterminantExcess = excess;
      minimumDeterminantExcessWeight = s;
    }
  }

  digest.update([
    s, N, e, P, M, D, C, u, rho, Z, uExact, rhoExact, ZExact,
    threshold, gap
  ].join("|") + "\n");
}

assert(q2Weights > 0, "no q=2 weights in finite base");
assert(determinantExceptions.length === 2 &&
  determinantExceptions[0].s === 3 && determinantExceptions[1].s === 5,
  "small-exception list changed");

// Exact arithmetic for the analytic tail.  The audited linear-form estimate
// and the Taylor check give D/P>1/(459*s^14).  Also 2^e<2P/2^s.  Hence
// D>5*2^e follows from 2^s>4590*s^14.  The latter holds at 128 and propagates
// because 2*s^14>(s+1)^14 for every s>=128.
certifyExponentialConstant();
assert((1n << BigInt(tailStart)) >
  tailConstant * BigInt(tailStart) ** 14n,
  "tail base inequality failed");
assert(2n * BigInt(tailStart) ** 14n >
  BigInt(tailStart + 1) ** 14n,
  "tail monotonicity inequality failed");

console.log(JSON.stringify({
  certificate: "all-depth FCD for the q=2 ramp-plus-one-drop family",
  finiteLimit,
  tailStart,
  analyticInput: "D/P > exp(-6.125581)*s^(-13.3)",
  weakenedInput: "D/P > 1/(459*s^14)",
  exponentialConstantCertified: true,
  tailReduction: "2^s > 4590*s^14",
  q2Weights,
  determinantBaseWeights,
  determinantExceptions,
  exactUpperLifts,
  minimumGap: minimumGap.toString(),
  minimumGapWeight,
  minimumDeterminantExcess: minimumDeterminantExcess.toString(),
  minimumDeterminantExcessWeight,
  recordSha256: digest.digest("hex")
}, null, 2));
