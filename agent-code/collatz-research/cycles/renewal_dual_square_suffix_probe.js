#!/usr/bin/env node
"use strict";

// Diagnostic search for suffix countershadows at the square-root scale.
// For a proposed return x=2q-1 and bottom exponent U+2, every preceding
// exponent in {1,2} is forced by the current residue modulo 3.  This makes
// it cheaper to enumerate small q than to enumerate all suffix words.
// Finite output is evidence only.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function bitLength(n) {
  return n.toString(2).length;
}

function valuation2(n) {
  let v = 0;
  while ((n & 1n) === 0n) {
    n >>= 1n;
    ++v;
  }
  return v;
}

function floorSqrt(n) {
  if (n < 2n) return n;
  let x = 1n << BigInt(Math.ceil(bitLength(n) / 2));
  for (;;) {
    const y = (x + n / x) >> 1n;
    if (y >= x) return x;
    x = y;
  }
}

const maxR = Number(process.argv[2] || 80);
const maxRows = Number(process.argv[3] || 20);
const qCap = process.argv[4] === undefined ? null : BigInt(process.argv[4]);
const unrestrictedSuffix = process.argv[5] === "unrestricted";
let parameterRows = 0;
let qTests = 0;
let exactSuffixes = 0;
let strictSuffixes = 0;
let firstSpikeLocked = 0;
const rows = [];

for (let r = 3; r <= maxR; ++r) {
  const N = bitLength(3n ** BigInt(r) - 1n);
  const e = N - r;
  const n = r - 1;
  const b = [0];
  const eligiblePrefix = [0];
  for (let t = 1; t <= n; ++t) {
    b.push(Math.floor(e * t / r) - Math.floor(e * (t - 1) / r));
    eligiblePrefix.push(eligiblePrefix[t - 1] + b[t]);
  }

  for (let U = 1; U <= e - 1; ++U) {
    const V = e - 1 - U;
    const m = Math.ceil(U / 2);
    let qMax = floorSqrt((1n << BigInt(U)) - 1n);
    if (qCap !== null && qMax > qCap) qMax = qCap;

    ++parameterRows;
    const targetA = N - 2 - U - m;
    for (let q = 2n; q <= qMax; q += 2n) {
      ++qTests;
      const x = 2n * q - 1n;
      let currentNumerator = (1n << BigInt(U + 2)) * x - 1n;
      if (currentNumerator % 3n !== 0n) continue;
      let current = currentNumerator / 3n;
      let spikes = 0;
      let exponentSum = 0;
      let strict = current > x;
      const wordReverse = [];

      // At a qualifying split the internal suffix exponent is targetA-d,
      // with d in {0,1}.  Since the sum grows strictly, there are at most
      // two candidate split points for each forced inverse path.
      for (let t = n; t >= 2; --t) {
        const residue = current % 3n;
        let a;
        if (residue === 2n) a = 1;
        else if (residue === 1n) a = 2;
        else break;
        if (a === 2 && !unrestrictedSuffix && b[t] !== 1) break;
        if (a === 2) ++spikes;
        exponentSum += a;
        wordReverse.push(a);
        const numerator = (1n << BigInt(a)) * current - 1n;
        assert(numerator % 3n === 0n, "forced inverse was not integral");
        current = numerator / 3n;
        if (current <= x) strict = false;

        const tau = t - 1;
        if (tau > m) continue;
        const d = targetA - exponentSum;
        if (d !== 0 && d !== 1) {
          if (d < 0) break;
          continue;
        }
        const Vpre = V - spikes;
        const Vsuf = spikes;
        if (Vpre !== m + d - tau) continue;
        if (Vpre < 0 || Vpre > eligiblePrefix[tau]) continue;
        if (d === 1 && (b[tau] !== 1 || Vpre < 1)) continue;
        ++exactSuffixes;
        if (!strict) continue;
        ++strictSuffixes;

        const firstSpike = 1 + valuation2(q);
        let lockFeasible = firstSpike <= tau && b[firstSpike] === 1;
        if (lockFeasible) {
          const eligibleAfterFirst = eligiblePrefix[tau] - eligiblePrefix[firstSpike];
          lockFeasible = Vpre >= 1 && Vpre - 1 <= eligibleAfterFirst;
        }
        // If d=1, minimality of tau forces a_tau=2.  Thus tau is a spike.
        // When the first spike is earlier, the prefix must contain at least
        // these two distinct spikes.  The capacity test above then places
        // all remaining spikes among the eligible sites between them.
        if (lockFeasible && d === 1) {
          if (firstSpike === tau) lockFeasible = Vpre === 1;
          else lockFeasible = Vpre >= 2;
        }
        if (lockFeasible) ++firstSpikeLocked;

        if (rows.length < maxRows) {
          rows.push({r, N, e, U, V, m, tau, d, Vpre, Vsuf,
            q: q.toString(), x: x.toString(), firstSpike,
            lockFeasible, Y: current.toString(),
            suffixWord: wordReverse.slice().reverse().join("")});
        }
      }
    }
  }
}

if (maxR === 80 && qCap === null && !unrestrictedSuffix) {
  assert(parameterRows === 1855, "default parameter-row regression");
  assert(qTests === 87149756, "default q-test regression");
  assert(exactSuffixes === 0, "default exact-suffix regression");
  assert(strictSuffixes === 0, "default strict-suffix regression");
  assert(firstSpikeLocked === 0, "default first-spike regression");
}

console.log(JSON.stringify({maxR, qCap: qCap === null ? null : qCap.toString(),
  unrestrictedSuffix, parameterRows, qTests, exactSuffixes,
  strictSuffixes, firstSpikeLocked, rows}, null, 2));
console.log("status: PASS");
console.log("scope: finite forced-inverse suffix audit only; no all-depth exclusion");
