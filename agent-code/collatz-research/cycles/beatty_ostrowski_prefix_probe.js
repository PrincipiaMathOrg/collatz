#!/usr/bin/env node
"use strict";

// Exact finite probe for the lower irrational mechanical clock
//   c_t = floor(gamma t) - floor(gamma (t-1)), gamma=log_2(3/2).
// We avoid floating point: c_t=1 iff 3^t 2^{-t} crosses a power of two,
// equivalently floor(log_2(3^t))-t increases.  The search asks whether the
// least positive dyadic cylinder representative q can fall below its
// homogeneous coefficient 3^t/2^(t+V).

function bitLength(n) {
  return n.toString(2).length;
}

const maxT = Number(process.argv[2] || 80);
const maxR = Number(process.argv[3] || 256);
if (!Number.isInteger(maxT) || maxT < 1) throw new Error("bad maxT");
if (!Number.isInteger(maxR) || maxR < 17) throw new Error("bad maxR");

const powers3 = [1n];
const clock = [0];
// The built-in q=14 and token-pair audits use anchored rows through r=24
// and search rows through r=32, independently of the requested horizon.
const clockLimit = Math.max(maxT, maxR, 32);
const powerLimit = Math.max(2 * maxT + 8, clockLimit);
for (let t = 1; t <= powerLimit; ++t) {
  powers3.push(powers3[t - 1] * 3n);
  if (t > clockLimit) continue;
  const a = bitLength(powers3[t]) - 1 - t;
  const b = bitLength(powers3[t - 1]) - 1 - (t - 1);
  clock.push(a - b);
  if (clock[t] !== 0 && clock[t] !== 1) throw new Error("clock bit failure");
}

function floorGamma(t) {
  return bitLength(powers3[t]) - 1 - t;
}

function anchoredData(r) {
  const e = floorGamma(r) + 1;
  const bits = [0];
  const token = [0];
  let previousB = 0;
  for (let t = 1; t <= r; ++t) {
    const B = Math.floor(e * t / r);
    const b = B - previousB;
    const h = B - floorGamma(t);
    if (h !== 0 && h !== 1) throw new Error(`token range failure r=${r},t=${t}`);
    if (b !== clock[t] + h - token[t - 1]) {
      throw new Error(`token identity failure r=${r},t=${t}`);
    }
    bits.push(b);
    token.push(h);
    previousB = B;
  }
  return {e, bits, token};
}

let tokenRows = 0;
for (let r = 3; r <= maxR; ++r) {
  anchoredData(r);
  ++tokenRows;
}

function q14ShadowAudit() {
  let z = 14n;
  let V = 0;
  let word = "";
  const spikes = [];
  for (let t = 1; t <= 16; ++t) {
    if ((z & 1n) === 0n) {
      word += "O";
      z = 3n * z / 2n;
    } else if ((z & 3n) === 1n) {
      word += "S";
      spikes.push(t);
      ++V;
      z = (3n * z + 1n) / 4n;
    } else {
      throw new Error(`q=14 intrinsic exit at t=${t}`);
    }
  }
  if (z !== 297n || V !== 5 || spikes.join(",") !== "2,7,8,10,13") {
    throw new Error("q=14 path mismatch");
  }
  if (clock[8] !== 0) throw new Error("q=14 does not use a surplus site");
  const compatible = [];
  const finiteRows = [];
  for (let r = 17; r <= 24; ++r) {
    const data = anchoredData(r);
    const firstMissing = spikes.find(t => data.bits[t] !== 1) || null;
    if (firstMissing === null) compatible.push(r);
    finiteRows.push({r, e: data.e, firstMissing, b17: data.bits[17]});
  }
  if (compatible.join(",") !== "19,24") {
    throw new Error(`q=14 compatibility mismatch: ${compatible}`);
  }
  // gamma < 117/200, exactly because 3^200 < 2^317.  Hence for r >= 25,
  // e/r < 117/200 + 1/r <= 5/8, whereas a spike at t=8 requires e/r >= 5/8.
  if (!(3n ** 200n < 2n ** 317n)) throw new Error("rational bound failure");
  if (!(3n ** 7n > 2n ** 11n)) throw new Error("lower rational bound failure");
  for (const r of compatible) {
    const data = anchoredData(r);
    if (data.bits[17] !== 0) throw new Error(`q=14 deletion mismatch r=${r}`);
  }
  const L = 16 + V;
  const liftedQ = 14n + (1n << BigInt(L));
  if (!(14n * (1n << BigInt(L)) < powers3[16])) {
    throw new Error("q=14 coefficient debt mismatch");
  }
  return {word, spikes, endpoint: z.toString(), V, L,
    compatible, finiteRows,
    nextBits: compatible.map(r => anchoredData(r).bits[17]),
    liftedQ: liftedQ.toString()};
}

const q14 = q14ShadowAudit();

function findPairedTokenSurvivor(searchMaxR) {
  for (let r = 3; r <= searchMaxR; ++r) {
    const data = anchoredData(r);
    let answer = null;

    function visit(t, q, z, modulus, power3, tokenUsed, path) {
      if (answer !== null || t === r - 1) return;
      const next = t + 1;
      const entry = data.bits[next] === 1 && clock[next] === 0;
      const deletion = data.bits[next] === 0 && clock[next] === 1;

      // Ordinary child.
      {
        const j = Number(z & 1n);
        if (deletion && tokenUsed && j === 0) {
          answer = {r, t: next, q: q.toString(), z: z.toString(),
            path: path.join("") + "O"};
          return;
        }
        const input = z + BigInt(j) * power3;
        path.push("O");
        visit(next, q + BigInt(j) * modulus, 3n * input / 2n,
          modulus << 1n, power3 * 3n,
          deletion || entry ? false : tokenUsed, path);
        path.pop();
      }

      if (data.bits[next] === 1) {
        const j = Number(((1n - (z & 3n)) * (power3 & 3n)) & 3n);
        const input = z + BigInt(j) * power3;
        path.push("S");
        visit(next, q + BigInt(j) * modulus, (3n * input + 1n) / 4n,
          modulus << 2n, power3 * 3n, entry ? true : tokenUsed, path);
        path.pop();
      }
    }

    visit(0, 1n, 1n, 1n, 1n, false, []);
    if (answer !== null) return answer;
  }
  return null;
}

const pairedTokenSurvivor = findPairedTokenSurvivor(32);
if (pairedTokenSurvivor === null) throw new Error("missing token-pair countermodel");

let nodes = 0;
let firstDebt = null;
let firstReserveFailure = null;

function v2(n) {
  let k = 0;
  while (n > 0n && (n & 1n) === 0n) {
    ++k;
    n >>= 1n;
  }
  return k;
}

function visit(t, q, z, modulus, V, path) {
  ++nodes;
  const L = t + V;
  const k = v2(z);
  if (t > 0 && t + k <= maxT && firstReserveFailure === null &&
      q * (1n << BigInt(L + k)) <= powers3[t + k]) {
    firstReserveFailure = {t, q: q.toString(), V, L, z: z.toString(), k,
      path: path.join("")};
  }
  if (t > 0 && q * (1n << BigInt(L)) <= powers3[t]) {
    firstDebt = {t, q: q.toString(), V, L, z: z.toString(),
      path: path.join("")};
    return;
  }
  if (t === maxT) return;

  // Even after choosing only ordinary zero lifts, the scaled ratio can
  // decrease by at most (2/3) per remaining branch.  If it is still safe at
  // maxT, every descendant is safe.
  const remaining = maxT - t;
  if (q * (1n << BigInt(L + remaining)) > powers3[maxT]) return;

  const power3 = powers3[t];

  // Ordinary child: choose the unique lift j in {0,1} making the input even.
  {
    const j = Number(z & 1n);
    const input = z + BigInt(j) * power3;
    path.push("O");
    visit(t + 1, q + BigInt(j) * modulus, 3n * input / 2n,
      modulus << 1n, V, path);
    path.pop();
    if (firstDebt !== null) return;
  }

  if (clock[t + 1] === 1) {
    // Spike child: unique j in {0,1,2,3} making the input 1 mod 4.
    let j = Number(((1n - (z & 3n)) * (power3 & 3n)) & 3n);
    const input = z + BigInt(j) * power3;
    if ((input & 3n) !== 1n) throw new Error("spike lift failure");
    path.push("S");
    visit(t + 1, q + BigInt(j) * modulus, (3n * input + 1n) / 4n,
      modulus << 2n, V + 1, path);
    path.pop();
  }
}

visit(0, 1n, 1n, 1n, 0, []);
console.log(JSON.stringify({maxT, nodes, clock: clock.slice(1, maxT + 1).join(""),
  maxR, tokenRows, q14, firstDebt,
  pairedTokenSurvivor,
  firstReserveFailureWithinHorizon: firstReserveFailure,
  status: firstDebt === null ? "NO_DEBT_IN_RANGE" : "DEBT_FOUND"}));
if (firstDebt !== null) process.exitCode = 1;
