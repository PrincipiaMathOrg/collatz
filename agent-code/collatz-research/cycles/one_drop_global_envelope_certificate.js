#!/usr/bin/env node
"use strict";

// Exact audit for the global denominator-one envelope and for the
// critical-scale rational and endpoint shadows.  Growing arithmetic is
// represented by BigInt throughout.

function pow2(k) { return 1n << BigInt(k); }
function pow3(k) { return 3n ** BigInt(k); }

function gcd(a, b) {
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

function valuation(n, p) {
  if (n === 0n) throw new Error("valuation of zero");
  let v = 0;
  while (n % p === 0n) {
    n /= p;
    ++v;
  }
  return v;
}

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
  if (oldR !== 1n) throw new Error("inverse does not exist");
  return ((oldS % modulus) + modulus) % modulus;
}

function parameters(r) {
  const P = pow3(r);
  const N = P.toString(2).length;
  const e = N - r;
  const D = pow2(N) - P;
  const oneSites = [];
  for (let t = 1; t < r; ++t) {
    if (Math.floor(e * t / r) - Math.floor(e * (t - 1) / r) === 1) {
      oneSites.push(t);
    }
  }
  if (oneSites.length !== e - 1) throw new Error("one-site count");
  return {P, N, e, D, oneSites};
}

function integerSqrt(n) {
  let lo = 0;
  let hi = 1;
  while (hi * hi <= n) hi *= 2;
  while (lo + 1 < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (mid * mid <= n) lo = mid;
    else hi = mid;
  }
  return lo;
}

function bottomNumerator(r, datum, spikes) {
  let J = 0n;
  for (let k = 0; k < spikes.length; ++k) {
    const t = spikes[k];
    J += pow3(r - 1 - t) * pow2(t + (k + 1) - 2);
  }
  const V = spikes.length;
  const U = datum.e - 1 - V;
  const M = pow2(r - 1 + V);
  const K = pow2(datum.N - 1) - M + 3n * J;
  return {J, K, U, V, M};
}

function criticalRationalRow(r, pattern) {
  const datum = parameters(r);
  const U = integerSqrt(datum.N - 1);
  if (datum.oneSites.length <= 2 * U + 1) return null;

  let spikes;
  if (pattern === "clustered") {
    // Retain the first internal one-site, omit the next U, and retain all
    // remaining internal one-sites.
    spikes = [datum.oneSites[0], ...datum.oneSites.slice(U + 1)];
  } else if (pattern === "dispersed") {
    // Omit one-sites of ordinals 2,4,...,2U.  Thus there is one retained
    // spike at every height 0,...,U, and all later one-sites are retained.
    spikes = datum.oneSites.filter((unused, i) =>
      !(i < 2 * U && i % 2 === 1));
  } else {
    throw new Error("unknown critical pattern");
  }
  const bottom = bottomNumerator(r, datum, spikes);
  if (bottom.U !== U) throw new Error("critical omission count");
  if (spikes[0] !== 2) throw new Error("first one-site is not two");
  const lastGap = r - spikes[spikes.length - 1];
  if (lastGap < 1 || lastGap > 2) throw new Error("last gap");

  // The chosen phase condition is 2^(2N) >= 2*3^(2r), namely delta>=1/2.
  if (pow2(2 * datum.N) < 2n * datum.P * datum.P) return null;
  const qBound = pattern === "clustered" ? 4n : 6n;
  if (!(bottom.K > 0n && bottom.K < qBound * datum.D)) {
    throw new Error("bounded rational Q");
  }

  const spikeSet = new Set(spikes);
  let z = bottom.K;
  let strict = true;
  let ordinaryRun = 0;
  let maxOrdinaryRun = 0;
  for (let t = 1; t < r; ++t) {
    if (spikeSet.has(t)) {
      ordinaryRun = 0;
      const numerator = 3n * z + datum.D;
      if (numerator % 4n !== 0n) throw new Error("rational spike domain");
      z = numerator / 4n;
    } else {
      ++ordinaryRun;
      maxOrdinaryRun = Math.max(maxOrdinaryRun, ordinaryRun);
      if (z % 2n !== 0n) throw new Error("rational ordinary domain");
      z = 3n * z / 2n;
    }
    if (z <= bottom.K) strict = false;
  }
  if (!strict) throw new Error("strict leastness");
  if (3n * z - datum.D !==
      pow2(U + 1) * (2n * bottom.K - datum.D)) {
    throw new Error("bottom closure");
  }

  const common = gcd(bottom.K, datum.D);
  const p = bottom.K / common;
  const hDen = datum.D / common;
  if (valuation(p, 2n) !== 1) throw new Error("first cleared valuation");
  const terminal = pow2(U + 1) * (2n * p - hDen) + hDen;
  if (valuation(terminal, 3n) !== lastGap) {
    throw new Error("last cleared valuation");
  }

  // This exact power comparison is the inequality
  // alpha(r-3U-5)-U(U+1)<-2U-4.
  const leftExponent = r - 3 * U - 5;
  const rightExponent = U * U - U - 4;
  if (leftExponent <= 0 || rightExponent <= 0 ||
      !(pow3(leftExponent) < pow2(rightExponent))) {
    throw new Error("critical transition surplus");
  }

  // An integer endpoint shadow with the same first and last exact
  // valuations.  Solve x=3 mod 8 and
  // 2^(U+1)x+1=3^lastGap mod 3^(lastGap+1).
  const mod3 = pow3(lastGap + 1);
  const a = pow2(U + 1) % mod3;
  const target3 = ((pow3(lastGap) - 1n) * inverseMod(a, mod3)) % mod3;
  let xShadow = target3;
  while (xShadow % 8n !== 3n) xShadow += mod3;
  const qShadow = (xShadow + 1n) / 2n;
  if (qShadow >= 4n * mod3 || valuation(qShadow, 2n) !== 1) {
    throw new Error("first endpoint shadow");
  }
  const tShadow = pow2(U + 1) * (2n * qShadow - 1n) + 1n;
  if (valuation(tShadow, 3n) !== lastGap) {
    throw new Error("last endpoint shadow");
  }

  return {
    r,
    N: datum.N,
    U,
    V: bottom.V,
    firstSpike: spikes[0],
    lastGap,
    qNumeratorBits: p.toString(2).length,
    denominatorBits: hDen.toString(2).length,
    qLessThan: qBound.toString(),
    maxOrdinaryRun,
    endpointShadowQ: qShadow.toString(),
    surplusLessThanMinus2UPlus4: true
  };
}

// Exact constants in the explicit all-depth rise-barrier corollary.
const r0 = 72057431991n;
const u0 = 337418n;
if (!(r0 ** 10n < pow2(361))) throw new Error("r0^10<2^361");
if (!(1220n ** 50n < pow2(513))) throw new Error("1220^50<2^513");
if (!(pow3(665) > pow2(1054))) throw new Error("log2(3)>1054/665");
const barrierLeft = 105400n * (r0 - 3n * u0 - 5n);
const barrierRight = 66500n * u0 * (u0 + 1n) +
  35011585n * (2n * u0 + 4n);
const barrierGap = barrierLeft - barrierRight;
if (barrierGap !== 11686288400n) throw new Error("barrier gap");
if (!(429n * (2n * u0 + 4n) < 20n * r0)) {
  throw new Error("propagation derivative");
}

const requestedRows = Number(process.argv[2] || 4);
const rows = {clustered: [], dispersed: []};
const rowKeys = {clustered: new Set(), dispersed: new Set()};
for (let r = 64;
     (rows.clustered.length < requestedRows ||
      rows.dispersed.length < requestedRows) && r <= 5000;
     ++r) {
  for (const pattern of ["clustered", "dispersed"]) {
    if (rows[pattern].length >= requestedRows) continue;
    const row = criticalRationalRow(r, pattern);
    if (row !== null) {
      const key = `${row.U}:${row.lastGap}`;
      if (!rowKeys[pattern].has(key)) {
        rowKeys[pattern].add(key);
        rows[pattern].push(row);
      }
    }
  }
}
if (rows.clustered.length !== requestedRows ||
    rows.dispersed.length !== requestedRows) {
  throw new Error("not enough shadow rows");
}
for (const row of rows.dispersed) {
  if (row.maxOrdinaryRun > 3) throw new Error("dispersed run bound");
}

console.log(JSON.stringify({
  barrierExcludedThroughU: u0.toString(),
  barrierGap: barrierGap.toString(),
  criticalRationalRows: rows,
  status: "PASS"
}));
