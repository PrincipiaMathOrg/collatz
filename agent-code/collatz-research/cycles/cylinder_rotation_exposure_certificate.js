#!/usr/bin/env node
"use strict";

// Exact regressions for ../cycle_cylinder_rotation_exposure.md.
// The finite binary scan audits the identities.  The all-depth theorem is
// the algebraic argument in the report, not the enumeration.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function gcd(a, b) {
  if (a < 0n) a = -a;
  if (b < 0n) b = -b;
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

function mod(a, m) {
  const x = a % m;
  return x < 0n ? x + m : x;
}

function inverse(a, m) {
  let r0 = a, r1 = m, s0 = 1n, s1 = 0n;
  while (r1 !== 0n) {
    const q = r0 / r1;
    [r0, r1] = [r1, r0 - q * r1];
    [s0, s1] = [s1, s0 - q * s1];
  }
  assert(r0 === 1n, "inverse does not exist");
  return mod(s0, m);
}

function bitLength(n) {
  return n.toString(2).length;
}

function rotate(word, i) {
  return word.slice(i).concat(word.slice(0, i));
}

function affine(word) {
  let C = 0n, A = 0;
  for (const a of word) {
    C = 3n * C + (1n << BigInt(A));
    A += a;
  }
  return {C, A};
}

function strictRecord(word) {
  const {A} = affine(word);
  let prefix = 0;
  for (let j = 0; j < word.length - 1; ++j) {
    prefix += word[j];
    if ((1n << BigInt(A - prefix)) <=
        3n ** BigInt(word.length - j - 1)) return false;
  }
  return true;
}

function isPrimitive(word) {
  for (let d = 1; d < word.length; ++d) {
    if (word.length % d !== 0) continue;
    let same = true;
    for (let j = d; j < word.length; ++j) {
      if (word[j] !== word[j % d]) {
        same = false;
        break;
      }
    }
    if (same) return false;
  }
  return true;
}

function auditWord(word) {
  const r = word.length;
  const data0 = affine(word);
  const N = data0.A;
  const P = 3n ** BigInt(r);
  const M = 1n << BigInt(N);
  const Q = 2n * M;
  const D = M - P;
  assert(D > 0n, "positive determinant required");
  const pInverse = inverse(P, Q);
  const G = gcd(data0.C, D);
  const q = D / G;
  const rows = [];

  for (let i = 0; i < r; ++i) {
    const rotated = rotate(word, i);
    const {C, A} = affine(rotated);
    assert(A === N, "rotation exponent mismatch");
    assert(gcd(C, D) === G, "rotation gcd changed");
    const n = C / G;
    const rho = mod((M - C) * pInverse, Q);
    assert(rho > 0n && (rho & 1n) === 1n, "bad cylinder representative");
    assert(mod(n - q * rho, Q) === 0n,
      "denominator multiplier congruence failed");
    const difference = n - q * rho;
    assert(difference % Q === 0n, "nonintegral multiplier lift");
    rows.push({a: rotated[0], C, n, rho, k: difference / Q});
  }

  let exposures = 0;
  for (let i = 0; i < r; ++i) {
    const row = rows[i];
    const next = rows[(i + 1) % r];
    const twoA = 1n << BigInt(row.a);
    assert(twoA * next.n === 3n * row.n + q,
      "reduced rational recurrence failed");
    const numerator = twoA * next.rho - 3n * row.rho - 1n;
    assert(numerator % Q === 0n, "exposure is not integral");
    const s = numerator / Q;
    assert(3n * row.k - twoA * next.k === q * s,
      "lift recurrence failed");
    row.s = s;
    if (s !== 0n) {
      ++exposures;
      if (s > 0n) {
        assert(next.rho >= (2n * M) / twoA,
          "positive exposure missed the macroscopic bound");
      } else {
        assert(3n * row.rho >= 2n * M + twoA - 1n,
          "negative exposure missed the macroscopic bound");
      }
    }
  }

  if (q > 1n) assert(exposures > 0, "q>1 word has no exposure");
  if (exposures === 0) {
    assert(data0.C % D === 0n, "zero exposure did not give q=1");
    assert(q === 1n, "zero exposure retained a denominator");
  }
  return {r, N, M, D, G, q, rows, exposures};
}

let profiles = 0;
let rotations = 0;
let nonzeroExposures = 0;
let denominatorOne = 0;

for (let r = 3; r <= 18; ++r) {
  const P = 3n ** BigInt(r);
  const N = bitLength(P);
  const B = Array.from({length: r + 1}, (_, j) =>
    Math.floor(j * N / r));
  const heights = [0];
  const word = [];

  function visit(j, height) {
    if (j === r) {
      if (height !== 0) return;
      assert(strictRecord(word), "binary profile lost strictness");
      const audit = auditWord(word);
      ++profiles;
      rotations += r;
      nonzeroExposures += audit.exposures;
      if (audit.q === 1n) ++denominatorOne;
      return;
    }
    const gap = B[j + 1] - B[j];
    for (const next of [0, 1]) {
      const a = gap + height - next;
      if (a <= 0) continue;
      heights.push(next);
      word.push(a);
      visit(j + 1, next);
      word.pop();
      heights.pop();
    }
  }
  visit(0, 0);
}

// The smallest strict binary witness has a tiny representative at its
// least rational rotation, but its next rotation is exposed macroscopically.
const witnessWord = [1, 1, 2, 3];
const witness = auditWord(witnessWord);
assert(strictRecord(witnessWord) && isPrimitive(witnessWord),
  "witness geometry failed");
assert(witness.N === 7 && witness.D === 47n && witness.G === 1n &&
  witness.q === 47n, "witness denominator failed");
assert(witness.rows.map(x => x.C).join(",") === "73,133,223,179",
  "witness carries changed");
assert(witness.rows.map(x => x.rho).join(",") === "7,139,81,189",
  "witness cylinders changed");
assert(witness.rows.map(x => x.s).join(",") === "1,-1,2,-2",
  "witness exposures changed");

// Repetitions of the trivial integer cycle exercise the zero-exposure side.
let trivialChecks = 0;
for (let r = 1; r <= 24; ++r) {
  const audit = auditWord(Array(r).fill(2));
  assert(audit.q === 1n && audit.exposures === 0,
    "trivial q=1 regression failed");
  assert(audit.rows.every(x => x.n === 1n && x.rho === 1n && x.k === 0n),
    "trivial cylinder equality failed");
  ++trivialChecks;
}

console.log(`binary_profiles_checked=${profiles}`);
console.log(`cyclic_rotations_checked=${rotations}`);
console.log(`nonzero_exposures_checked=${nonzeroExposures}`);
console.log(`binary_denominator_one_profiles=${denominatorOne}`);
console.log(`witness_word=${witnessWord.join(".")}`);
console.log(`witness_q=${witness.q}`);
console.log(`witness_rhos=${witness.rows.map(x => x.rho).join(",")}`);
console.log(`witness_exposures=${witness.rows.map(x => x.s).join(",")}`);
console.log(`trivial_zero_exposure_checks=${trivialChecks}`);
console.log("cylinder_rotation_exposure_verified=true");
