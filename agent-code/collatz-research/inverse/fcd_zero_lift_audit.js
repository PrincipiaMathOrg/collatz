#!/usr/bin/env node
"use strict";

// Exact finite audit for the zero-lift row branches. This checks fixed
// regressions and enumerates a finite length box. It is not an all-weight
// proof of First-Crossing Descent.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function mod(a, m) {
  const r = a % m;
  return r < 0n ? r + m : r;
}

function inverse(a, m) {
  let t = 0n, nt = 1n, r = m, nr = mod(a, m);
  while (nr !== 0n) {
    const q = r / nr;
    [t, nt] = [nt, t - q * nt];
    [r, nr] = [nr, r - q * nr];
  }
  assert(r === 1n, "inverse does not exist");
  return mod(t, m);
}

function parameters(s) {
  const P = 3n ** BigInt(s);
  let M = 1n, k = 0;
  while (M < P) {
    M <<= 1n;
    ++k;
  }
  return {s, k, M, P, D: M - P};
}

function carry(positions) {
  const s = positions.length;
  let C = 0n;
  for (let i = 0; i < s; ++i) {
    C += (1n << BigInt(positions[i])) * 3n ** BigInt(s - 1 - i);
  }
  return C;
}

function data(positions) {
  const x = parameters(positions.length);
  const C = carry(positions);
  const rho = mod(-C * inverse(x.P, x.M), x.M);
  const numerator = x.P * rho + C;
  assert(numerator % x.M === 0n, "nonintegral endpoint");
  const Z = numerator / x.M;
  const gap = rho - Z;
  const margin = x.M * gap;
  assert(margin === x.D * rho - C, "margin identity failed");
  const tau = mod(C * inverse(x.M, x.D), x.D);
  const d = Z - rho;
  assert(d === tau || d === tau - x.D, "two-lift relation failed");
  return {...x, C, rho, Z, gap, margin, tau, d};
}

function positionsOf(word) {
  const positions = [];
  for (let j = 0; j < word.length; ++j) if (word[j] === "1") positions.push(j);
  return positions;
}

function wordOf(positions, k) {
  const bits = new Array(k).fill("0");
  for (const A of positions) bits[A] = "1";
  return bits.join("");
}

function primitiveFirstCrossing(word) {
  let p2 = 1n, p3 = 1n;
  for (let j = 0; j < word.length; ++j) {
    if (p3 < p2) return false;
    p2 <<= 1n;
    if (word[j] === "1") p3 *= 3n;
  }
  return p3 < p2;
}

function row(positions, requirePrimitive = true) {
  assert(positions.length >= 2, "row needs weight at least two");
  const upper = data(positions);
  const lower = data(positions.slice(0, -1));
  const word = wordOf(positions, upper.k);
  if (requirePrimitive) assert(primitiveFirstCrossing(word), "word is not primitive");
  const m = lower.M;
  const q = upper.M / m;
  assert(q === 2n || q === 4n, "row multiplier escaped {2,4}");
  const A = positions[positions.length - 1];
  const u = 1n << BigInt(A);
  const H = mod(u * inverse(upper.P, m), m);
  const r0 = mod(lower.rho - H, m);
  const hNumerator = upper.P * r0 + upper.C;
  assert(hNumerator % m === 0n, "old-modulus quotient is not integral");
  const h = hNumerator / m;
  const lambda = (upper.rho - r0) / m;
  assert(0n <= lambda && lambda < q, "lift digit escaped its range");
  const wrapped = H > lower.rho;
  const VNumerator = upper.D * H + u;
  assert(VNumerator % m === 0n, "threshold is not integral");
  const V = VNumerator / m;
  const score = q * r0 - h;
  assert(upper.margin === m * (score + lambda * upper.D),
    "row-score identity failed");
  const b = lower.k - A;
  assert(b >= 1, "last one is not in a terminal zero");
  const t = mod(inverse(upper.P, 1n << BigInt(b)), 1n << BigInt(b));
  assert(H === (1n << BigInt(A)) * t, "terminal valuation of H failed");
  return {word, positions, upper, lower, q, A, b, u, H, r0, h,
    lambda, wrapped, V, score, t};
}

function serial(x) {
  return {
    word: x.word, s: x.upper.s, k: x.upper.k, q: x.q.toString(), A: x.A,
    b: x.b, lambda: x.lambda.toString(), wrapped: x.wrapped,
    lowerRho: x.lower.rho.toString(), lowerZ: x.lower.Z.toString(),
    H: x.H.toString(), t: x.t.toString(), V: x.V.toString(),
    score: x.score.toString(), rho: x.upper.rho.toString(),
    Z: x.upper.Z.toString(), gap: x.upper.gap.toString()
  };
}

function scanRows(maxLength) {
  let primitive = 0, zeroLift = 0;
  const closest = new Map();

  function record(positions) {
    ++primitive;
    if (positions.length < 2) return;
    const x = row(positions);
    assert(x.lower.gap >= 0n && x.upper.gap > 0n,
      `finite FCD regression failed at ${x.word}`);
    if (x.lambda !== 0n) return;
    ++zeroLift;
    const key = `q${x.q}-${x.wrapped ? "wrap" : "nowrap"}`;
    const old = closest.get(key);
    if (old === undefined || x.score < old.score ||
        (x.score === old.score && x.upper.k < old.upper.k)) closest.set(key, x);
  }

  function dfs(length, p2, p3, positions) {
    if (length >= maxLength) return;
    const nextP2 = p2 << 1n;
    if (p3 < nextP2) record(positions);
    else dfs(length + 1, nextP2, p3, positions);
    dfs(length + 1, nextP2, p3 * 3n, positions.concat(length));
  }

  dfs(0, 1n, 1n, []);
  return {maxLength, primitive, zeroLift,
    closest: Object.fromEntries([...closest].map(([key, value]) =>
      [key, serial(value)]))};
}

function firstCoefficientCrossing(n, stepCap = 1000000) {
  let x = n, p2 = 1n, p3 = 1n, s = 0, k = 0;
  const seen = new Set();
  let interiorSimple = true;
  while (k < stepCap) {
    const key = x.toString();
    if (seen.has(key)) interiorSimple = false;
    seen.add(key);
    if ((x & 1n) === 1n) {
      x = (3n * x + 1n) >> 1n;
      p3 *= 3n;
      ++s;
    } else {
      x >>= 1n;
    }
    p2 <<= 1n;
    ++k;
    if (p2 > p3) {
      const q = parameters(s).M / parameters(s - 1).M;
      return {n, endpoint: x, s, k, q, gap: n - x, interiorSimple};
    }
  }
  throw new Error(`step cap reached at n=${n}`);
}

function scanSeeds(limit) {
  const tiny = [];
  for (let n = 1; n <= limit; n += 2) {
    const x = firstCoefficientCrossing(BigInt(n));
    if (x.s > n) tiny.push(x);
    assert(x.gap > 0n || n === 1, `FCD failure at scanned seed ${n}`);
  }
  return {limit, tiny: tiny.map(x => ({n: x.n.toString(),
    endpoint: x.endpoint.toString(), s: x.s, k: x.k,
    q: x.q.toString(), gap: x.gap.toString(),
    interiorSimple: x.interiorSimple}))};
}

// Fixed witnesses. The q=2 no-wrap witness is the closest such branch in
// the exhaustive length-30 box. The almost-barrier word has score -2 and
// shows exactly where the proper-prefix condition is used.
const q2NoWrap = row(positionsOf("110110111111001111000101010"));
assert(q2NoWrap.q === 2n && q2NoWrap.lambda === 0n && !q2NoWrap.wrapped &&
  q2NoWrap.score === 14n && q2NoWrap.upper.rho === 251n &&
  q2NoWrap.upper.Z === 244n, "q=2 no-wrap witness changed");

const q4NoWrap = row(positionsOf("1110100"));
assert(q4NoWrap.q === 4n && q4NoWrap.lambda === 0n && !q4NoWrap.wrapped &&
  q4NoWrap.score === 8n, "q=4 no-wrap boundary witness changed");

const almost = row(positionsOf("10111010"), false);
assert(!primitiveFirstCrossing(almost.word) && almost.q === 2n &&
  almost.lambda === 0n && !almost.wrapped && almost.score === -2n &&
  almost.upper.rho === 9n && almost.upper.Z === 10n &&
  almost.upper.tau === 1n, "almost-barrier witness changed");

const q4Near = row(positionsOf(
  "11111010110111011110100111011011111100111100010101000100"));
assert(q4Near.q === 4n && q4Near.lambda === 0n && !q4Near.wrapped &&
  q4Near.A === 53 && q4Near.b === 1 && q4Near.H === (1n << 53n) &&
  q4Near.score === 32n && q4Near.upper.rho === 31n &&
  q4Near.upper.Z === 23n, "q=4 near-cancellation witness changed");

const maxLength = Number(process.argv[2] || "30");
const seedLimit = Number(process.argv[3] || "1000000");
assert(Number.isInteger(maxLength) && 4 <= maxLength && maxLength <= 30,
  "maxLength must lie in [4,30]");
assert(Number.isInteger(seedLimit) && 1 <= seedLimit && seedLimit <= 10000000,
  "seedLimit must lie in [1,10000000]");

const rowScan = scanRows(maxLength);
if (maxLength === 30) {
  assert(rowScan.primitive === 1166059 && rowScan.zeroLift === 384572,
    "length-30 enumeration count changed");
  assert(rowScan.closest["q2-wrap"].score === "2" &&
    rowScan.closest["q4-wrap"].score === "4" &&
    rowScan.closest["q4-nowrap"].score === "8" &&
    rowScan.closest["q2-nowrap"].score === "14",
    "zero-lift branch minima changed");
}

const seedScan = scanSeeds(seedLimit);
if (seedLimit === 1000000 || seedLimit === 10000000) {
  assert(JSON.stringify(seedScan.tiny.map(x => [x.n, x.endpoint, x.s, x.q])) ===
    JSON.stringify([["27", "23", 37, "2"], ["31", "23", 35, "4"]]),
    "small-seed first-crossing regression changed");
}

console.log(JSON.stringify({
  certificate: "FCD zero-lift branch audit",
  finiteOnly: true,
  witnesses: {
    q2NoWrap: serial(q2NoWrap),
    q4NoWrap: serial(q4NoWrap),
    q4RelativeNearCancellation: serial(q4Near),
    almostBarrierNonDescent: serial(almost)
  },
  rowScan,
  seedScan
}, null, 2));
