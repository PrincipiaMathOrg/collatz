#!/usr/bin/env node
"use strict";

// Exact audit for the local 10/110 zero-lift renewal ledger.
// This is a certificate for the displayed finite congruence tables, not for
// the all-depth strengthened Beatty inequality.

function branch(z, symbol, clockBit) {
  if (symbol === "O") {
    if ((z & 1n) !== 0n) return null;
    return 3n * z / 2n;
  }
  if (symbol !== "S" || clockBit !== 1) return null;
  if ((z & 3n) !== 1n) return null;
  return (3n * z + 1n) / 4n;
}

function runBlock(x, clock, pattern) {
  let z = x;
  for (let i = 0; i < clock.length; ++i) {
    z = branch(z, pattern[i], Number(clock[i]));
    if (z === null) return null;
  }
  return z;
}

const cases = [
  {clock: "10", pattern: "SO", modulus: 8n, residue: 5n,
    numerator: x => 9n * x + 3n, denominator: 8n},
  {clock: "10", pattern: "OO", modulus: 4n, residue: 0n,
    numerator: x => 9n * x, denominator: 4n},
  {clock: "110", pattern: "SSO", modulus: 32n, residue: 17n,
    numerator: x => 27n * x + 21n, denominator: 32n},
  {clock: "110", pattern: "SOO", modulus: 16n, residue: 5n,
    numerator: x => 27n * x + 9n, denominator: 16n},
  {clock: "110", pattern: "OSO", modulus: 16n, residue: 14n,
    numerator: x => 27n * x + 6n, denominator: 16n},
  {clock: "110", pattern: "OOO", modulus: 8n, residue: 0n,
    numerator: x => 27n * x, denominator: 8n},
];

for (const row of cases) {
  const valid = [];
  for (let x = 0n; x < 32n; ++x) {
    const got = runBlock(x, row.clock, row.pattern);
    const expectedDomain = x % row.modulus === row.residue;
    if ((got !== null) !== expectedDomain) {
      throw new Error(`domain mismatch for ${row.clock}/${row.pattern} at ${x}`);
    }
    if (got !== null) {
      const numerator = row.numerator(x);
      if (numerator % row.denominator !== 0n ||
          got !== numerator / row.denominator) {
        throw new Error(`map mismatch for ${row.clock}/${row.pattern} at ${x}`);
      }
      valid.push(Number(x));
    }
  }
  console.log(JSON.stringify({clock: row.clock, pattern: row.pattern,
    modulus: Number(row.modulus), residue: Number(row.residue), validMod32: valid}));
}

function anchoredBit(r, e, t) {
  return Math.floor(e * t / r) - Math.floor(e * (t - 1) / r);
}

function auditQ14(r) {
  const gamma = Math.log2(3 / 2);
  const e = Math.ceil(gamma * r);
  let z = 14n;
  let spikes = 0;
  let omissions = 0;
  let word = "";
  let clock = "";
  for (let t = 1; t <= 16; ++t) {
    const b = anchoredBit(r, e, t);
    clock += String(b);
    if ((z & 1n) === 0n) {
      word += "O";
      if (b === 1) ++omissions;
      z = 3n * z / 2n;
    } else if ((z & 3n) === 1n && b === 1) {
      word += "S";
      ++spikes;
      z = (3n * z + 1n) / 4n;
    } else {
      throw new Error(`q=14 exits too early for r=${r}, t=${t}`);
    }
  }
  const nextClock = anchoredBit(r, e, 17);
  if (z !== 297n || nextClock !== 0 || (z & 1n) !== 1n || omissions !== 5) {
    throw new Error(`q=14 shadow mismatch for r=${r}`);
  }
  const L = 16 + spikes;
  if (L !== 21) throw new Error(`unexpected q=14 modulus exponent for r=${r}`);
  const liftedQ = 14n + (1n << BigInt(L));
  const liftedEndpoint = z + 3n ** 16n;
  if ((liftedEndpoint & 1n) !== 0n) {
    throw new Error(`q=14 ordinary lift is not even for r=${r}`);
  }
  return {r, e, clock, word, endpoint: z.toString(), omissions, spikes, L,
    nextClock, liftedQ: liftedQ.toString(),
    liftedEndpoint: liftedEndpoint.toString()};
}

console.log(JSON.stringify(auditQ14(19)));
console.log(JSON.stringify(auditQ14(24)));
console.log(JSON.stringify({status: "PASS"}));
