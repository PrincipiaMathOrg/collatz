#!/usr/bin/env node
"use strict";

// Forward exact search for a square-root debt counterexample.  Each starting
// integer follows the deterministic partial map
//
//   O(2k) = 3k,    S(4k+1) = 3k+1,
//
// until it reaches 3 mod 4.  At time t, with V spike steps, the shifted debt
// is D=floor((t+1)log_2(3/2))-V.  A violation after the cylinder modulus has
// overtaken the input is an exact unrestricted reverse-cylinder violation.

const maxQ = Number(process.argv[2] || 1000000);
const maxT = Number(process.argv[3] || 300);
if (!Number.isInteger(maxQ) || maxQ < 1 ||
    !Number.isInteger(maxT) || maxT < 1) {
  throw new Error("positive integer cutoffs required");
}

function bitLength(n) {
  return n.toString(2).length;
}

const floorGamma = [0];
let power3 = 1n;
for (let t = 1; t <= maxT + 1; ++t) {
  power3 *= 3n;
  floorGamma[t] = bitLength(power3) - 1 - t;
}

let testedPrefixes = 0;
let longest = null;
let closest = null;
let closestRunTwo = null;
let closestStrict = null;
let firstFailure = null;
let firstFactorTwoFailure = null;

function better(row, old) {
  if (old === null) return true;
  // Compare q^2/2^D exactly.
  if (row.D >= old.D) {
    return row.qSquared < (old.qSquared << BigInt(row.D - old.D));
  }
  return (row.qSquared << BigInt(old.D - row.D)) < old.qSquared;
}

function printable(row) {
  if (row === null) return null;
  return {...row, q: row.q.toString(), z: row.z.toString(),
    qSquared: row.qSquared.toString(), threshold:
      (1n << BigInt(row.D)).toString()};
}

for (let qNumber = 1; qNumber <= maxQ; ++qNumber) {
  const q = BigInt(qNumber);
  const qSquared = q * q;
  let z = q;
  let V = 0;
  let L = 0;
  let spikeRun = 0;
  let runTwo = true;
  let strict = true;
  let word = "";

  for (let t = 1; t <= maxT; ++t) {
    let symbol;
    if ((z & 1n) === 0n) {
      symbol = "O";
      z = 3n * z / 2n;
      L += 1;
      spikeRun = 0;
    } else if ((z & 3n) === 1n) {
      symbol = "S";
      z = (3n * z + 1n) / 4n;
      V += 1;
      L += 2;
      spikeRun += 1;
      if (spikeRun >= 3) runTwo = false;
    } else {
      break;
    }
    word += symbol;
    if (z <= q) strict = false;
    ++testedPrefixes;

    const D = floorGamma[t + 1] - V;
    // The residue zero modulo 2^L has least positive representative 2^L,
    // so equality is a valid cylinder representative.
    if (D < 1 || q > (1n << BigInt(L))) continue;
    const row = {q, t, z, V, D, L, qSquared, runTwo, strict, word};
    if (longest === null || t > longest.t) longest = row;
    if (better(row, closest)) closest = row;
    if (runTwo && better(row, closestRunTwo)) closestRunTwo = row;
    if (strict && better(row, closestStrict)) closestStrict = row;
    const threshold = 1n << BigInt(D);
    if (firstFactorTwoFailure === null && qSquared < 2n * threshold) {
      firstFactorTwoFailure = row;
    }
    if (qSquared < threshold) {
      firstFailure = row;
      break;
    }
  }
  if (firstFailure !== null) break;
}

console.log(JSON.stringify({maxQ, maxT, testedPrefixes,
  longest: printable(longest), closest: printable(closest),
  closestRunTwo: printable(closestRunTwo),
  closestStrict: printable(closestStrict),
  firstFactorTwoFailure: printable(firstFactorTwoFailure),
  firstFailure: printable(firstFailure),
  status: firstFailure === null ? "NO_FAILURE_IN_RANGE" : "FAILURE_FOUND"}));
if (firstFailure !== null) process.exitCode = 1;
