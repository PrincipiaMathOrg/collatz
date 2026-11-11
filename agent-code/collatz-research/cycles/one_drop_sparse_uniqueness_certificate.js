#!/usr/bin/env node
"use strict";

// Exact certificate for the carry and bottom-sparse valuation decoders.
// Every arithmetic datum which can grow with r is a BigInt.

function bitLength(n) { return n.toString(2).length; }

function v2(n) {
  if (n <= 0n) throw new Error("v2 requires a positive integer");
  let v = 0;
  while ((n & 1n) === 0n) {
    n >>= 1n;
    ++v;
  }
  return v;
}

function carry(word) {
  let C = 0n;
  let A = 0;
  const prefix = [0];
  for (let i = 0; i < word.length; ++i) {
    C += (3n ** BigInt(word.length - 1 - i)) << BigInt(A);
    A += word[i];
    prefix.push(A);
  }
  return {C, N: A, prefix};
}

function decodeCarry(C, r) {
  let R = C;
  let A = 0;
  const word = [];
  const remainders = [R];
  const prefix = [A];
  for (let i = 0; i < r; ++i) {
    const term = (3n ** BigInt(r - 1 - i)) << BigInt(A);
    if (R < term) throw new Error("negative carry remainder");
    R -= term;
    remainders.push(R);
    if (i + 1 < r) {
      if (R === 0n) throw new Error("premature zero carry remainder");
      const nextA = v2(R);
      if (nextA <= A) throw new Error("nonpositive decoded exponent");
      word.push(nextA - A);
      A = nextA;
      prefix.push(A);
    }
  }
  if (R !== 0n) throw new Error("terminal carry remainder");
  return {word, remainders, prefix};
}

function sparseJ(r, times) {
  let J = 0n;
  for (let k = 0; k < times.length; ++k) {
    const t = times[k];
    J += (3n ** BigInt(r - 1 - t)) <<
      BigInt(t + (k + 1) - 2);
  }
  return J;
}

function decodeJ(J, r) {
  let R = J;
  const times = [];
  let k = 1;
  while (R !== 0n) {
    const t = v2(R) - k + 2;
    if (t < 1 || t >= r ||
        (times.length > 0 && t <= times[times.length - 1])) {
      throw new Error("invalid sparse time");
    }
    const term = (3n ** BigInt(r - 1 - t)) <<
      BigInt(t + k - 2);
    if (R < term) throw new Error("negative sparse remainder");
    R -= term;
    times.push(t);
    ++k;
  }
  return times;
}

function wordFromTimes(r, U, times) {
  const spike = new Set(times);
  const word = [];
  for (let t = 1; t < r; ++t) word.push(spike.has(t) ? 2 : 1);
  word.push(U + 2);
  return word;
}

function statesFromCarryRotations(word, D) {
  const out = [];
  let w = word.slice();
  for (let i = 0; i < word.length; ++i) {
    const {C} = carry(w);
    if (C % D !== 0n) return null;
    out.push(C / D);
    w = w.slice(1).concat(w[0]);
  }
  return out;
}

const maxR = Number(process.argv[2] || 30);
let profiles = 0n;
let carryDecodes = 0n;
let sparseDecodes = 0n;
let distinctK = 0n;
let collision = null;
let closedFormRows = 0n;

function auditClosedForm(word) {
  const r = word.length;
  const datum = carry(word);
  const D = (1n << BigInt(datum.N)) - 3n ** BigInt(r);
  const states = statesFromCarryRotations(word, D);
  if (states === null) return false;
  const decoded = decodeCarry(datum.C, r);
  const x = states[0];
  for (let i = 0; i < r; ++i) {
    const Ai = datum.prefix[i];
    const bracket = (1n << BigInt(datum.N - Ai)) * x -
      (3n ** BigInt(r - i)) * states[i];
    const expected = (1n << BigInt(Ai)) * bracket;
    if (decoded.remainders[i] !== expected) {
      throw new Error("closed-form remainder identity");
    }
  }
  ++closedFormRows;
  return true;
}

for (let r = 3; r <= maxR; ++r) {
  // The repeated exponent-two word is the trivial integer cycle.  It
  // exercises the denominator-one remainder identity at every audited r.
  if (!auditClosedForm(Array(r).fill(2))) {
    throw new Error("trivial closed-form audit did not close");
  }

  const P = 3n ** BigInt(r);
  const N = bitLength(P - 1n);
  const e = N - r;
  const D = (1n << BigInt(N)) - P;
  const eligible = [];
  for (let t = 1; t < r; ++t) {
    if (Math.floor(e * t / r) - Math.floor(e * (t - 1) / r) === 1) {
      eligible.push(t);
    }
  }
  if (eligible.length >= 31) throw new Error("mask cutoff");
  const seen = new Map();
  for (let mask = 0; mask < 2 ** eligible.length; ++mask) {
    const times = [];
    for (let j = 0; j < eligible.length; ++j) {
      if ((mask & 2 ** j) !== 0) times.push(eligible[j]);
    }
    const V = times.length;
    const U = e - 1 - V;
    const word = wordFromTimes(r, U, times);
    const datum = carry(word);
    if (datum.N !== N) throw new Error("total weight mismatch");
    const decoded = decodeCarry(datum.C, r);
    decoded.word.push(N - decoded.prefix[decoded.prefix.length - 1]);
    if (decoded.word.join(",") !== word.join(",")) {
      throw new Error("carry decoder mismatch");
    }
    ++carryDecodes;

    const J = sparseJ(r, times);
    const decodedTimes = decodeJ(J, r);
    if (decodedTimes.join(",") !== times.join(",")) {
      throw new Error("sparse decoder mismatch");
    }
    ++sparseDecodes;

    const A = r - 1 + V;
    const K = (1n << BigInt(N - 1)) - (1n << BigInt(A)) + 3n * J;
    if (2n * K !== datum.C + D) throw new Error("bottom bridge");
    const key = K.toString();
    if (seen.has(key)) {
      collision = {r, first: seen.get(key), second: word.join(","), key};
      throw new Error("bottom numerator collision");
    }
    seen.set(key, word.join(","));
    ++distinctK;
    ++profiles;

    // If a denominator-one row ever occurs, audit the closed-form decoder
    // remainder identity as well.  The only row in this finite language is
    // expected to be absent, but the branch is part of the frozen checker.
    if (K % D === 0n) {
      const q = K / D;
      const states = statesFromCarryRotations(word, D);
      if (states === null || states[0] !== 2n * q - 1n) {
        throw new Error("denominator-one rotation reconstruction");
      }
      if (!auditClosedForm(word)) throw new Error("closed-form audit");
    }
  }
}

console.log(JSON.stringify({
  maxR,
  profiles: profiles.toString(),
  carryDecodes: carryDecodes.toString(),
  sparseDecodes: sparseDecodes.toString(),
  distinctK: distinctK.toString(),
  closedFormRows: closedFormRows.toString(),
  collision,
  status: "PASS"
}));
