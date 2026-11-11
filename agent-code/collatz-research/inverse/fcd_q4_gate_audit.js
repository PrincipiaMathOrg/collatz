#!/usr/bin/env node
"use strict";

// Exact and interval-arithmetic audit for the q=4 FCD row gate.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function chooseRow(n) {
  const row = new Array(n + 1).fill(0n);
  row[0] = 1n;
  for (let k = 1; k <= n; ++k) {
    row[k] = row[k - 1] * BigInt(n - k + 1) / BigInt(k);
  }
  return row;
}

function universalB(ell) {
  const row = chooseRow(ell);
  const tails = new Array(ell + 2).fill(0n);
  for (let o = ell; o >= 0; --o) tails[o] = tails[o + 1] + row[o];
  let powers = 0n;
  let p3 = 1n;
  let best = null;
  for (let t = 0; t <= ell; ++t) {
    powers += p3;
    p3 *= 3n;
    const value = tails[t + 1] + powers;
    if (best === null || value < best) best = value;
  }
  return best;
}

function endpointCapacity(n, p) {
  const lower = p > n ? p : n + 1n;
  const value = 2n * p - lower;
  return value > 0n ? value : 0n;
}

function minimumH(ell, n) {
  if (ell === 0) return 0n;
  const row = chooseRow(ell - 1);
  let value = BigInt(ell);
  let p3 = 3n;
  for (let o = 1; o <= ell; ++o) {
    const capacity = endpointCapacity(n, p3);
    value += row[o - 1] < capacity ? row[o - 1] : capacity;
    p3 *= 3n;
  }
  const shellOdds = 1n << BigInt(ell - 1);
  return value < shellOdds ? value : shellOdds;
}

function minimumHAtHorizon(ell, n, t) {
  assert(1 <= t && t <= ell, "bad lookahead horizon");
  const row = chooseRow(t - 1);
  const scale = 1n << BigInt(ell - t);
  let value = BigInt(t);
  let p3 = 3n;
  for (let o = 1; o <= t; ++o) {
    const sourceCapacity = scale * row[o - 1];
    const endpoint = endpointCapacity(n, scale * p3);
    value += sourceCapacity < endpoint ? sourceCapacity : endpoint;
    p3 *= 3n;
  }
  const shellOdds = 1n << BigInt(ell - 1);
  return value < shellOdds ? value : shellOdds;
}

function optimizedH(ell, n) {
  if (ell === 0) return {value: 0n, t: 0};
  let best = null, bestT = 0;
  for (let t = 1; t <= ell; ++t) {
    const value = minimumHAtHorizon(ell, n, t);
    if (best === null || value < best) { best = value; bestT = t; }
  }
  return {value: best, t: bestT};
}

function asNumberRatio(a, b) {
  // All values used by the certificate below have fewer than 1024 bits.
  return Number(a) / Number(b);
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
  assert(r === 1n, "nonunit inverse");
  return mod(t, m);
}

function crossingParameters(s) {
  const P = 3n ** BigInt(s);
  let M = 1n, k = 0;
  while (M < P) { M <<= 1n; ++k; }
  return {s, P, M, D: M - P, k};
}

function wordCarry(positions) {
  const s = positions.length;
  let C = 0n;
  for (let i = 0; i < s; ++i) {
    C += (1n << BigInt(positions[i])) * 3n ** BigInt(s - 1 - i);
  }
  return C;
}

function rowData(positions) {
  const x = crossingParameters(positions.length);
  const C = wordCarry(positions);
  const rho = mod(-C * inverse(x.P, x.M), x.M);
  const Z = (x.P * rho + C) / x.M;
  return {...x, C, rho, Z, gap: rho - Z};
}

function projectionChain(word) {
  const positions = [];
  for (let j = 0; j < word.length; ++j) if (word[j] === "1") positions.push(j);
  const out = [];
  for (let s = positions.length; s >= 2; --s) {
    const upper = rowData(positions.slice(0, s));
    const lower = rowData(positions.slice(0, s - 1));
    const q = upper.M / lower.M;
    const lambda = upper.rho / lower.M;
    out.push({s, q: q.toString(), A: positions[s - 1],
      lambda: lambda.toString(), rho: upper.rho.toString(),
      Z: upper.Z.toString(), gap: upper.gap.toString()});
  }
  return out;
}

function firstCoefficientCrossing(n, maxSteps = 1000000) {
  let x = n, p2 = 1n, p3 = 1n, s = 0, j = 0;
  let simple = true;
  const seen = new Set();
  while (j < maxSteps) {
    const key = x.toString();
    if (seen.has(key)) simple = false;
    seen.add(key);
    if ((x & 1n) === 1n) {
      x = (3n * x + 1n) >> 1n;
      p3 *= 3n;
      ++s;
    } else {
      x >>= 1n;
    }
    p2 <<= 1n;
    ++j;
    if (p2 > p3) {
      const lower = crossingParameters(s - 1);
      const upper = crossingParameters(s);
      assert(j === upper.k, "crossing time differs from k_s");
      return {n, endpoint: x, s, j, q: upper.M / lower.M,
        gap: n - x, simple};
    }
  }
  throw new Error(`crossing step cap reached at n=${n}`);
}

function scanSeeds(limit) {
  const records = [];
  let q4TinyCount = 0;
  let anyTinyCount = 0;
  const anyTiny = [];
  let bestGap = null;
  let bestRatio = null;
  for (let n = 1; n <= limit; n += 2) {
    const x = firstCoefficientCrossing(BigInt(n));
    if (x.s > n) {
      ++anyTinyCount;
      if (anyTiny.length < 30) anyTiny.push(x);
    }
    if (x.q === 4n && x.s > n) {
      ++q4TinyCount;
      if (bestGap === null || x.gap < bestGap.gap) bestGap = x;
      const ratio = Number(x.endpoint) / n;
      if (bestRatio === null || ratio > bestRatio.ratio) bestRatio = {...x, ratio};
      if (records.length < 30) records.push(x);
      assert(x.gap > 0n, `genuine q=4 failure at seed ${n}`);
    }
  }
  const clean = x => x && Object.fromEntries(Object.entries(x).map(([k,v]) =>
    [k, typeof v === "bigint" ? v.toString() : v]));
  return {limit, anyTinyCount, anyTiny: anyTiny.map(clean),
    q4TinyCount, first: records.map(clean),
    bestGap: clean(bestGap), bestRatio: clean(bestRatio)};
}

function classifyRow(positions) {
  assert(positions.length >= 2, "row needs weight at least two");
  const upper = rowData(positions);
  const lower = rowData(positions.slice(0, -1));
  const q = upper.M / lower.M;
  const lambda = upper.rho / lower.M;
  const A = positions[positions.length - 1];
  const u = 1n << BigInt(A);
  const H = mod(u * inverse(upper.P, lower.M), lower.M);
  const wrapped = H > lower.rho;
  const r0 = mod(lower.rho - H, lower.M);
  const h = (upper.P * r0 + upper.C) / lower.M;
  const score = q * r0 - h;
  const V = (upper.D * H + u) / lower.M;
  assert(r0 === mod(upper.rho, lower.M), "row residue mismatch");
  assert(lambda === (upper.rho - r0) / lower.M, "row lift mismatch");
  return {upper, lower, q, lambda, A, H, wrapped, r0, h, score, V,
    positions: positions.slice()};
}

function scanPrimitiveRows(maxLength) {
  const branches = new Map();
  const parityWitnesses = new Map();
  let primitive = 0, zeroLift = 0;
  function record(positions) {
    ++primitive;
    if (positions.length < 2) return;
    const x = classifyRow(positions);
    assert(x.lower.gap >= 0n && x.upper.gap > 0n,
      `finite FCD regression failed at s=${x.upper.s}`);
    if (x.lambda !== 0n) return;
    ++zeroLift;
    const key = `q${x.q}-${x.wrapped ? "wrap" : "nowrap"}`;
    const old = branches.get(key);
    if (old === undefined || x.score < old.score ||
        (x.score === old.score && x.upper.k < old.upper.k)) branches.set(key, x);
    const parityKey = `${key}-gap${mod(x.upper.gap, 2n)}`;
    if (!parityWitnesses.has(parityKey)) parityWitnesses.set(parityKey, x);
  }
  function dfs(length, p2, p3, positions) {
    if (length >= maxLength) return;
    const nextP2 = p2 << 1n;
    if (p3 < nextP2) record(positions);
    else dfs(length + 1, nextP2, p3, positions);
    dfs(length + 1, nextP2, p3 * 3n, positions.concat(length));
  }
  dfs(0, 1n, 1n, []);
  const clean = x => ({q: x.q.toString(), wrapped: x.wrapped,
    s: x.upper.s, k: x.upper.k, A: x.A,
    word: Array.from({length: x.upper.k}, (_,j) =>
      x.positions.includes(j) ? "1" : "0").join(""),
    lowerRho: x.lower.rho.toString(), lowerZ: x.lower.Z.toString(),
    H: x.H.toString(), V: x.V.toString(), score: x.score.toString(),
    rho: x.upper.rho.toString(), Z: x.upper.Z.toString(),
    gap: x.upper.gap.toString()});
  return {maxLength, primitive, zeroLift,
    closest: Object.fromEntries([...branches].map(([k,v]) => [k, clean(v)])),
    parityWitnesses: Object.fromEntries([...parityWitnesses].map(([k,v]) => [k, clean(v)]))};
}

const MAX_ELL = 600;
const Bs = [];
for (let ell = 0; ell <= MAX_ELL; ++ell) Bs.push(universalB(ell));

function envelopeUpper(n) {
  let ell0 = 0;
  while ((1n << BigInt(ell0 + 1)) <= n) ++ell0;
  let partial = 0;
  const firstTerms = [];
  for (let ell = ell0; ell <= MAX_ELL; ++ell) {
    const H = minimumH(ell, n);
    const universal = Bs[ell] + BigInt(ell);
    const cap = H < universal ? H : universal;
    const twoEll = 1n << BigInt(ell);
    const denominator = 3n * (n > twoEll ? n : twoEll);
    const term = asNumberRatio(cap, denominator);
    partial += term;
    if (ell < ell0 + 5) firstTerms.push({ell, term});
  }
  const x = Math.pow(2, -0.03);
  const tail = (5 / 6) * Math.pow(2, -0.03 * (MAX_ELL + 1)) /
      (1 - x) + (MAX_ELL + 2) / (3 * Math.pow(2, MAX_ELL));
  return {ell0, partial, tail, upper: partial + tail, firstTerms};
}

if (process.argv.includes("--explore")) {
  for (const n of [3n, 5n, 7n, 9n, 15n, 31n, 63n, 127n, 255n,
    511n, 1023n, 2047n, 4095n, 8191n, 16383n, 32767n, 65535n,
    1000000n, 1000000000n, 1n << 50n, 1n << 71n, 1n << 75n, 1n << 100n,
    1n << 125n, 1n << 150n, 1n << 175n, 1n << 200n]) {
    console.log(n.toString(), envelopeUpper(n));
  }
  const probe = 1n << 71n;
  console.log("probe-caps", Array.from({length: 30}, (_, j) => {
    const ell = 71 + j;
    const H = minimumH(ell, probe);
    const U = Bs[ell] + BigInt(ell);
    return {ell, H: H.toString(), U: U.toString(),
      ratioH: asNumberRatio(H, 1n << BigInt(ell)),
      ratioU: asNumberRatio(U, 1n << BigInt(ell)),
      selected: H < U ? "H" : "U"};
  }));
  console.log("probe-blocks", Array.from({length: 11}, (_, j) => {
    let value = 0;
    for (let ell = 71 + 20 * j; ell < 71 + 20 * (j + 1); ++ell) {
      const H = minimumH(ell, probe), U = Bs[ell] + BigInt(ell);
      const cap = H < U ? H : U;
      value += asNumberRatio(cap, 3n * (1n << BigInt(ell)));
    }
    return {from: 71 + 20*j, to: 90 + 20*j, value};
  }));
  console.log("near-chain", projectionChain(
    "11111010110111011110100111011011111100111100010101000100"));
  let optimizedMass = 0;
  const optimizedBlocks = [];
  for (let ell = 71; ell <= 300; ++ell) {
    const opt = optimizedH(ell, probe);
    const U = Bs[ell] + BigInt(ell);
    const cap = opt.value < U ? opt.value : U;
    const term = asNumberRatio(cap, 3n * (1n << BigInt(ell)));
    optimizedMass += term;
    if ((ell - 70) % 10 === 0) optimizedBlocks.push({ell,
      partial: optimizedMass, t: opt.t, selected: opt.value < U ? "H" : "U"});
  }
  console.log("optimized-horizon", {partialTo300: optimizedMass,
    optimizedBlocks});
}

if (process.argv.includes("--scan")) {
  const at = process.argv.indexOf("--scan");
  const limit = Number(process.argv[at + 1] || "100000");
  console.log("seed-scan", JSON.stringify(scanSeeds(limit), null, 2));
}

if (process.argv.includes("--rows")) {
  const at = process.argv.indexOf("--rows");
  const limit = Number(process.argv[at + 1] || "24");
  console.log("row-scan", JSON.stringify(scanPrimitiveRows(limit), null, 2));
}

console.log(JSON.stringify({
  certificate: "q=4 shell-envelope exploration",
  maxExactShell: MAX_ELL,
  logFourThirds: Math.log(4 / 3),
  samples: [31n, 127n, 1023n, 65535n, 1000000n].map(n => ({
    n: n.toString(), ...envelopeUpper(n)
  }))
}, null, 2));
