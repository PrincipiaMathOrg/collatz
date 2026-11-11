"use strict";

// Targeted diagnostic for singleton and two-shift b=1 deformations.
// It tests whether positivity forces d=floor(C/P), and records proper
// determinant factors of C-Pd.  It is not an all-depth enumeration proof.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function gcd(a, b) {
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

function carry(positions) {
  const s = positions.length;
  let C = 0n;
  for (let i = 0; i < s; ++i) {
    C += (1n << BigInt(positions[i])) * 3n ** BigInt(s - 1 - i);
  }
  return C;
}

function valid(positions) {
  let power3 = 1n;
  for (let i = 0; i < positions.length; ++i) {
    if (i > 0 && positions[i] <= positions[i - 1]) return false;
    if ((1n << BigInt(positions[i])) > power3) return false;
    power3 *= 3n;
  }
  return true;
}

const maxS = Number(process.argv[2] || 80);
assert(Number.isInteger(maxS) && maxS >= 3, "invalid maximum weight");

let P = 1n;
let previousN = 0;
const counts = {
  singletonProfiles: 0,
  twoShiftProfiles: 0,
  positiveTargets: 0,
  positiveTargetsBelowFloor: 0,
  properFactorTargets: 0,
  fullDeterminantTargets: 0
};
const witnesses = {belowFloor: null, singletonFactor: null, twoShiftFactor: null};

for (let s = 1; s <= maxS; ++s) {
  P *= 3n;
  const N = P.toString(2).length;
  const q = N - previousN;
  previousN = N;
  if (q !== 1 || gcd(BigInt(N), BigInt(s)) !== 1n) continue;
  const e = N - s;
  const terminalDelay = e - 1;
  if (terminalDelay < 1) continue;
  const dMax = Math.floor((terminalDelay + 1) / 2);
  const M = 1n << BigInt(N);
  const D = M - P;
  const base = [];
  for (let i = 0; i < s; ++i) base.push(Math.floor(i * N / s));

  function inspect(T) {
    const positions = base.slice();
    for (const index of T) --positions[index];
    if (positions[0] !== 0 || positions[s - 1] !== N - 2) return;
    if (!valid(positions)) return;
    if (T.length === 1) ++counts.singletonProfiles;
    else ++counts.twoShiftProfiles;
    const C = carry(positions);
    const floorCarry = C / P;
    for (let d = 1; d <= dMax; ++d) {
      const target = BigInt(d);
      if (C <= P * target) continue;
      ++counts.positiveTargets;
      const floorGap = floorCarry - target;
      if (floorGap > 0n) {
        ++counts.positiveTargetsBelowFloor;
        if (witnesses.belowFloor === null) {
          witnesses.belowFloor = {s, N, T, d, floorCarry, C, P};
        }
      }
      const factor = gcd(D, C - P * target);
      if (factor === D) ++counts.fullDeterminantTargets;
      else if (factor > 1n) {
        ++counts.properFactorTargets;
        const key = T.length === 1 ? "singletonFactor" : "twoShiftFactor";
        if (witnesses[key] === null) {
          witnesses[key] = {s, N, T, d, factor, D, C, floorCarry};
        }
      }
    }
  }

  for (let i = 1; i < s - 1; ++i) inspect([i]);
  for (let i = 1; i < s - 2; ++i) {
    for (let j = i + 1; j < s - 1; ++j) inspect([i, j]);
  }
}

function serial(value) {
  if (value === null) return null;
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [
    key,
    typeof item === "bigint" ? item.toString() : item
  ]));
}

console.log(JSON.stringify({
  maxS,
  counts,
  witnesses: {
    belowFloor: serial(witnesses.belowFloor),
    singletonProperFactor: serial(witnesses.singletonFactor),
    twoShiftProperFactor: serial(witnesses.twoShiftFactor)
  }
}, null, 2));
