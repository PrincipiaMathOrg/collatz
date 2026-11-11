#!/usr/bin/env node
"use strict";

// Test the exactness-only part of interval packet contraction.  For a
// consecutive block of nonterminal plateaux, flatten the whole block to
// the delay immediately preceding it.  This retains the terminal row and
// removes at least one corner.  The test is deliberately independent of
// FCD color.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function bitLength(n) {
  return n.toString(2).length;
}

function mod(a, m) {
  const value = a % m;
  return value < 0n ? value + m : value;
}

function inverse(a, m) {
  let oldR = a;
  let r = m;
  let oldS = 1n;
  let s = 0n;
  while (r !== 0n) {
    const q = oldR / r;
    [oldR, r] = [r, oldR - q * r];
    [oldS, s] = [s, oldS - q * s];
  }
  assert(oldR === 1n, "inverse does not exist");
  return mod(oldS, m);
}

const maximumWeight = Number(process.argv[2] || 18);
assert(Number.isInteger(maximumWeight) && maximumWeight >= 8,
  "usage: q2_lifted_block_contraction_probe.js MAX_WEIGHT");

let profiles = 0;
let exactFiveCornerTops = 0;
let exactBlockTops = 0;
let isolatedBlockTops = 0;
let intervalTests = 0;
let firstNoExactBlock = null;

for (let weight = 8; weight <= maximumWeight; ++weight) {
  const P = 3n ** BigInt(weight);
  const N = bitLength(P);
  if (N - bitLength(P / 3n) !== 1) continue;
  const M = 1n << BigInt(N);
  const modulus = 2n * M;
  const inverseP = inverse(P, modulus);
  const maxima = Array(weight).fill(0);
  for (let i = 1; i < weight; ++i) {
    maxima[i] = bitLength(3n ** BigInt(i)) - 1 - i;
  }
  const delays = Array(weight).fill(0);
  const powersThree = Array(weight + 1).fill(1n);
  for (let i = 1; i <= weight; ++i) powersThree[i] = 3n * powersThree[i - 1];

  function rowBand(i, low, high) {
    if (high <= low) return 0n;
    return (1n << BigInt(i + low)) *
      ((1n << BigInt(high - low)) - 1n) *
      powersThree[weight - 1 - i];
  }

  function carry(path) {
    let C = P - (1n << BigInt(weight));
    for (let i = 1; i < weight; ++i) C += rowBand(i, 0, path[i]);
    return C;
  }

  function exact(C) {
    const liftedStart = mod(-C * inverseP, modulus);
    return liftedStart >= M;
  }

  function visit(i, previous) {
    if (i === weight - 1) {
      delays[i] = maxima[i];
      if (delays[i] < previous) return;
      ++profiles;
      const jumps = [];
      for (let row = 1; row < weight; ++row) {
        if (delays[row] > delays[row - 1]) jumps.push(row);
      }
      if (jumps.length < 5) return;
      const topC = carry(delays);
      if (!exact(topC)) return;
      ++exactFiveCornerTops;

      let exactBlock = false;
      // The last jump is terminal.  Choose any nonempty consecutive block
      // of the preceding plateaux and flatten it to the level before the
      // block.  Accumulate the removed band as the right endpoint grows.
      for (let left = 0; left + 1 < jumps.length && !exactBlock; ++left) {
        const base = delays[jumps[left] - 1];
        let removed = 0n;
        for (let right = left; right + 1 < jumps.length; ++right) {
          const begin = jumps[right];
          const end = jumps[right + 1];
          for (let row = begin; row < end; ++row) {
            removed += rowBand(row, base, delays[row]);
          }
          ++intervalTests;
          if (exact(topC - removed)) {
            exactBlock = true;
            break;
          }
        }
      }

      if (exactBlock) {
        ++exactBlockTops;
      } else {
        ++isolatedBlockTops;
        if (firstNoExactBlock === null) {
          const liftedStart = mod(-topC * inverseP, modulus);
          const start = liftedStart - M;
          const endpoint = (P * start + topC) / M;
          firstNoExactBlock = {
            weight,
            delays: delays.slice(),
            start: start.toString(),
            endpoint: endpoint.toString(),
            jumps
          };
        }
      }
      return;
    }

    for (let value = previous; value <= maxima[i]; ++value) {
      delays[i] = value;
      visit(i + 1, value);
    }
  }

  delays[0] = 0;
  visit(1, 0);
}

if (maximumWeight === 18) {
  assert(profiles === 129442, "profile count changed");
  assert(exactFiveCornerTops === 58015,
    "exact five-corner top count changed");
  assert(exactBlockTops === 57996,
    "exact consecutive-block count changed");
  assert(isolatedBlockTops === 19,
    "isolated consecutive-block count changed");
  assert(intervalTests === 115598,
    "consecutive-block interval count changed");
  assert(firstNoExactBlock !== null &&
    firstNoExactBlock.weight === 15 &&
    firstNoExactBlock.start === "1934495" &&
    firstNoExactBlock.endpoint === "1654501",
  "first consecutive-block witness changed");
}

console.log(JSON.stringify({
  probe: "exactness under q2 consecutive-block contraction",
  maximumWeight,
  profiles,
  exactFiveCornerTops,
  exactBlockTops,
  isolatedBlockTops,
  intervalTests,
  firstNoExactBlock,
  warning: "exactness only; FCD color is not asserted"
}, null, 2));
