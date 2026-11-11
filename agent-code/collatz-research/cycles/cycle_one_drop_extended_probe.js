#!/usr/bin/env node
"use strict";

// Exact extended probe for one-terminal-drop rational-mechanical words.
// The recursion compresses every interval between eligible upward steps into
// one affine carry update.  This permits searches beyond the original r=30
// range without changing the mathematical family.

const crypto = require("crypto");

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function bitLength(n) {
  return n.toString(2).length;
}

function mod(a, m) {
  a %= m;
  return a < 0n ? a + m : a;
}

function extendedGcd(a, b) {
  if (b === 0n) return [a, 1n, 0n];
  const [g, x, y] = extendedGcd(b, a % b);
  return [g, y, x - (a / b) * y];
}

function inverseMod(a, m) {
  const [g, x] = extendedGcd(a, m);
  assert(g === 1n, "modular inverse does not exist");
  return mod(x, m);
}

function gcd(a, b) {
  while (b !== 0n) [a, b] = [b, a % b];
  return a < 0n ? -a : a;
}

function carryOf(word) {
  let C = 0n;
  let A = 0;
  for (const exponent of word) {
    C = 3n * C + (1n << BigInt(A));
    A += exponent;
  }
  return {C, A};
}

function strictSuffixRecord(word, N) {
  let A = 0;
  const r = word.length;
  for (let i = 0; i < r; ++i) {
    if ((1n << BigInt(N - A)) <= 3n ** BigInt(r - i)) return false;
    A += word[i];
  }
  return A === N;
}

function isPrimitive(word) {
  const r = word.length;
  for (let p = 1; p < r; ++p) {
    if (r % p !== 0) continue;
    let same = true;
    for (let i = p; i < r; ++i) {
      if (word[i] !== word[i % p]) {
        same = false;
        break;
      }
    }
    if (same) return false;
  }
  return true;
}

function reconstructWord(base, eligible, mask, U) {
  const word = base.slice();
  for (let j = 0; j < eligible.length; ++j) {
    if (Math.floor(mask / 2 ** j) % 2 === 1) --word[eligible[j]];
  }
  word[word.length - 1] += U;
  return word;
}

function affineSegment(B, first, last) {
  let multiplier = 1n;
  let additive = 0n;
  for (let i = first; i <= last; ++i) {
    multiplier *= 3n;
    additive = 3n * additive + (1n << BigInt(B[i]));
  }
  return {multiplier, additive};
}

const maxR = Number(process.argv[2] || 42);
assert(Number.isInteger(maxR) && maxR >= 3 && maxR <= 48,
  "maximum r must lie between 3 and 48");

let totalLeaves = 0n;
let denominatorOneHits = 0n;
let primitiveDenominatorOneHits = 0n;
let q1PowerViolations = 0n;
let rhoPowerViolations = 0n;
let firstQ1PowerViolation = null;
let firstRhoPowerViolation = null;
let leastRatio = null;
let leastRatioWitness = null;
const rows = [];
const digest = crypto.createHash("sha256");

for (let r = 3; r <= maxR; ++r) {
  const P = 3n ** BigInt(r);
  const N = bitLength(P - 1n);
  const M = 1n << BigInt(N);
  const D = M - P;
  const cylinderModulus = 2n * M;
  const cylinderMask = cylinderModulus - 1n;
  const inverseP = inverseMod(P, cylinderModulus);
  const B = Array.from({length: r + 1}, (_, i) =>
    Math.floor(i * N / r));
  const base = Array.from({length: r}, (_, i) => B[i + 1] - B[i]);
  assert(base.every(a => a === 1 || a === 2),
    `base left the one-strip at r=${r}`);

  const eligible = [];
  for (let i = 0; i < r - 1; ++i) {
    if (base[i] === 2) eligible.push(i);
  }
  assert(eligible.length < 31, `mask range exceeded at r=${r}`);

  const segments = [];
  let first = 0;
  for (const position of eligible) {
    segments.push(affineSegment(B, first, position));
    first = position + 1;
  }
  const terminalSegment = affineSegment(B, first, r - 1);

  let leaves = 0n;
  let q1Hits = 0n;
  let violations = 0n;
  let rowLeast = null;
  let rowWitness = null;

  function inspect(K, U, mask) {
    K = terminalSegment.multiplier * K + terminalSegment.additive;
    const divisor = 1n << BigInt(U);
    assert(K % divisor === 0n, `normalized carry failed at r=${r}`);
    const C = K / divisor;
    ++leaves;
    ++totalLeaves;

    const rho0 = ((M - C) * inverseP) & cylinderMask;
    const rho = rho0 === 0n ? cylinderModulus : rho0;
    const power = divisor;
    if (rho <= power) {
      ++violations;
      ++rhoPowerViolations;
      if (firstRhoPowerViolation === null) {
        firstRhoPowerViolation = {r, N, mask, U,
          rho: rho.toString(), C: C.toString(), D: D.toString()};
      }
    }
    if (rowLeast === null || rho * rowLeast.power <
        rowLeast.rho * power) {
      rowLeast = {rho, power};
      rowWitness = {mask, U, C, rho};
    }
    if (leastRatio === null || rho * leastRatio.power <
        leastRatio.rho * power) {
      leastRatio = {rho, power};
      leastRatioWitness = {r, N, mask, U, C, D, rho};
    }

    if (C % D === 0n) {
      ++q1Hits;
      ++denominatorOneHits;
      const x = C / D;
      const word = reconstructWord(base, eligible, mask, U);
      assert(strictSuffixRecord(word, N), `q=1 word not strict at r=${r}`);
      assert(carryOf(word).C === C, `q=1 carry mismatch at r=${r}`);
      assert(mod(x - rho, cylinderModulus) === 0n,
        `q=1 cylinder lift mismatch at r=${r}`);
      if (isPrimitive(word)) {
        ++primitiveDenominatorOneHits;
        if (x <= power) {
          ++q1PowerViolations;
          if (firstQ1PowerViolation === null) {
            firstQ1PowerViolation = {r, N, U,
              x: x.toString(), rho: rho.toString(), C: C.toString(),
              D: D.toString(),
              word: word.join(",")};
          }
        }
      }
    }

    if (rho <= power || (rowWitness !== null && rowWitness.mask === mask)) {
      const word = reconstructWord(base, eligible, mask, U);
      assert(strictSuffixRecord(word, N), `witness not strict at r=${r}`);
      assert(carryOf(word).C === C, `witness carry mismatch at r=${r}`);
      const endpointNumerator = P * rho + C;
      assert(endpointNumerator % M === 0n,
        `witness endpoint not integral at r=${r}`);
      assert(((endpointNumerator / M) & 1n) === 1n,
        `witness endpoint not odd at r=${r}`);
    }
  }

  function visit(level, K, U, mask) {
    if (level === eligible.length) {
      if (U !== 0) inspect(K, U, mask);
      return;
    }
    const segment = segments[level];
    const next = segment.multiplier * K + segment.additive;
    visit(level + 1, next, U, mask);
    visit(level + 1, 2n * next, U + 1, mask + 2 ** level);
  }

  visit(0, 0n, 0, 0);
  const expectedLeaves = (1n << BigInt(eligible.length)) - 1n;
  assert(leaves === expectedLeaves, `leaf count failed at r=${r}`);

  const witnessWord = reconstructWord(base, eligible, rowWitness.mask,
    rowWitness.U);
  assert(isPrimitive(witnessWord), `least-ratio witness imprimitive at r=${r}`);
  const row = {
    r,
    N,
    eligible: eligible.length,
    leaves: leaves.toString(),
    q1Hits: q1Hits.toString(),
    leastRho: rowWitness.rho.toString(),
    leastU: rowWitness.U,
    leastRatioFloorX1e9:
      (rowWitness.rho * 1000000000n /
        (1n << BigInt(rowWitness.U))).toString(),
    leastWord: witnessWord.join(",")
  };
  rows.push(row);
  digest.update(Object.values(row).join("|") + "\n");
  console.log(`r=${r} eligible=${eligible.length} leaves=${leaves} ` +
    `q1=${q1Hits} min_U=${row.leastU} min_rho=${row.leastRho} ` +
    `min_ratio_x1e9=${row.leastRatioFloorX1e9} ` +
    `min_word=${row.leastWord}`);
}

const bestWord = reconstructWord(
  Array.from({length: leastRatioWitness.r}, (_, i) => {
    const B0 = Math.floor(i * leastRatioWitness.N / leastRatioWitness.r);
    const B1 = Math.floor((i + 1) * leastRatioWitness.N /
      leastRatioWitness.r);
    return B1 - B0;
  }),
  (() => {
    const answer = [];
    for (let i = 0; i < leastRatioWitness.r - 1; ++i) {
      const B0 = Math.floor(i * leastRatioWitness.N /
        leastRatioWitness.r);
      const B1 = Math.floor((i + 1) * leastRatioWitness.N /
        leastRatioWitness.r);
      if (B1 - B0 === 2) answer.push(i);
    }
    return answer;
  })(),
  leastRatioWitness.mask,
  leastRatioWitness.U
);

assert(gcd(leastRatioWitness.C, leastRatioWitness.D) > 0n,
  "final witness gcd check failed");
console.log(JSON.stringify({
  certificate: "extended one-terminal-drop cylinder probe",
  maxR,
  totalLeaves: totalLeaves.toString(),
  denominatorOneHits: denominatorOneHits.toString(),
  primitiveDenominatorOneHits: primitiveDenominatorOneHits.toString(),
  q1PowerViolations: q1PowerViolations.toString(),
  rhoPowerViolations: rhoPowerViolations.toString(),
  firstQ1PowerViolation,
  firstRhoPowerViolation,
  leastRatio: {
    r: leastRatioWitness.r,
    N: leastRatioWitness.N,
    U: leastRatioWitness.U,
    rho: leastRatioWitness.rho.toString(),
    power: leastRatio.power.toString(),
    ratioFloorX1e9:
      (leastRatio.rho * 1000000000n / leastRatio.power).toString(),
    word: bestWord.join(",")
  },
  rowSha256: digest.digest("hex")
}, null, 2));
