#!/usr/bin/env node
"use strict";

/*
 * Exact certificate for the consecutive four-shift theorem.
 *
 * The proof reduces
 *
 *   27 z^k - A z + A = 0,  A in {85,101,119},
 *
 * through the M, E, F, and G Euclidean power relations.  This script
 * checks every coefficient branch and every integer comparison in the
 * resultant bounds.  It also performs a finite exact audit of all
 * admissible four-shift deformations through the requested period.
 */

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function gcd(a, b) {
  if (a < 0n) a = -a;
  if (b < 0n) b = -b;
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

function v3(a) {
  let v = 0;
  while (a % 3n === 0n) {
    a /= 3n;
    ++v;
  }
  return v;
}

function mod(a, m) {
  a %= m;
  return a < 0n ? a + m : a;
}

function extendedGcd(a, b) {
  let oldR = a, r = b;
  let oldS = 1n, s = 0n;
  let oldT = 0n, t = 1n;
  while (r !== 0n) {
    const q = oldR / r;
    [oldR, r] = [r, oldR - q * r];
    [oldS, s] = [s, oldS - q * s];
    [oldT, t] = [t, oldT - q * t];
  }
  return {g: oldR, x: oldS, y: oldT};
}

function inverseMod(a, m) {
  const e = extendedGcd(mod(a, m), m);
  assert(e.g === 1n, "nonunit in inverseMod");
  return mod(e.x, m);
}

function powMod(a, e, m) {
  let x = mod(a, m), y = 1n;
  while (e > 0n) {
    if (e & 1n) y = y * x % m;
    x = x * x % m;
    e >>= 1n;
  }
  return y;
}

function powModSigned(a, e, m) {
  if (e >= 0n) return powMod(a, e, m);
  return powMod(inverseMod(a, m), -e, m);
}

function affineData(word) {
  let C = 0n;
  let A = 0n;
  for (const a of word) {
    C = 3n * C + (1n << A);
    A += BigInt(a);
  }
  return {C, A};
}

function exactRationalStates(word, C, D) {
  const common = gcd(C, D);
  const denominator = D / common;
  let p = C / common;
  const states = [];
  for (const a of word) {
    states.push(p);
    const numerator = 3n * p + denominator;
    const divisor = 1n << BigInt(a);
    assert(numerator % divisor === 0n, "valuation does not divide");
    assert(numerator % (2n * divisor) !== 0n, "valuation is not exact");
    p = numerator / divisor;
  }
  assert(p === states[0], "rational orbit does not close");
  return {denominator, states};
}

function isProperPower(word) {
  for (let d = 1; d < word.length; ++d) {
    if (word.length % d !== 0) continue;
    let ok = true;
    for (let i = d; i < word.length; ++i) {
      if (word[i] !== word[i % d]) {
        ok = false;
        break;
      }
    }
    if (ok) return true;
  }
  return false;
}

function isStrictRecord(word, N) {
  let prefix = 0n;
  for (let i = 0; i < word.length - 1; ++i) {
    prefix += BigInt(word[i]);
    if ((1n << (BigInt(N) - prefix)) <=
        3n ** BigInt(word.length - i - 1)) return false;
  }
  return true;
}

function runType(T) {
  const lengths = [];
  let length = 1;
  for (let i = 1; i < T.length; ++i) {
    if (T[i] === T[i - 1] + 1) {
      ++length;
    } else {
      lengths.push(length);
      length = 1;
    }
  }
  lengths.push(length);
  lengths.sort((a, b) => b - a);
  return lengths.join("+");
}

const AVALUES = [85n, 101n, 119n];

// F-level coefficient ledger.  The quotient letters in the note are q,a,b.
let fComparisons = 0;
let gComparisons = 0;
let minimumGContent = 1000;
let maximumGContent = 0;

for (const A of AVALUES) {
  for (let q = 0; q <= 3; ++q) {
    for (let a = 0; a <= 2; ++a) {
      for (let b = 0; b <= 3; ++b) {
        const rawC =
          3n ** BigInt(3 + 2 * q + 12 * b) * 2n ** BigInt(8 * a);
        const rawQ =
          A * 2n ** BigInt(3 * q + 19 * b) * 3n ** BigInt(5 * a);
        const content = gcd(rawC, rawQ);
        const C = rawC / content;
        const Q = rawQ / content;

        // The removed content contains only 2 and 3, hence is a unit modulo D.
        let unitPart = content;
        while (unitPart % 2n === 0n) unitPart /= 2n;
        while (unitPart % 3n === 0n) unitPart /= 3n;
        assert(unitPart === 1n, "nonunit branch content");

        if (b <= 2) {
          const K = 2n ** 20n * (C + Q);
          assert(K ** 21n * 100n ** 1000n < 299n ** 1000n,
            `F comparison failed for A=${A},q=${q},a=${a},b=${b}`);
          ++fComparisons;
        } else {
          assert(Q % 3n !== 0n, "G-level linear coefficient is not a 3-unit");
          const s = Math.min(41, v3(C));
          assert(s >= 29, "unexpectedly small G-level content");
          minimumGContent = Math.min(minimumGContent, s);
          maximumGContent = Math.max(maximumGContent, s);
          const K = 3n ** BigInt(41 - s) * 2n * (C + Q);
          assert(K * 5n ** 53n < 14n ** 53n,
            `G comparison failed for A=${A},q=${q},a=${a}`);
          ++gComparisons;
        }
      }
    }
  }
}

assert(fComparisons === 108, "wrong number of F-level comparisons");
assert(gComparisons === 36, "wrong number of G-level comparisons");
assert(minimumGContent === 29 && maximumGContent === 41,
  "wrong G-level content range");

// Radius, Euclidean, and final determinant comparisons.
assert(3n ** 24n < 2n ** 39n, "F root-radius comparison failed");
assert(63n * 2n ** 130n < 65n * 3n ** 82n,
  "G root-radius comparison failed");
assert(299n ** 1000n > 280n ** 1000n * 3n ** 41n,
  "G leading constant absorption failed");
assert(gcd(12n, 19n) === 1n, "F binomial valuation vector is not primitive");
assert(gcd(65n, 41n) === 1n, "G binomial valuation vector is not primitive");
assert(2n ** 84n < 3n ** 53n, "G/r upper bound failed");
assert(3n ** 200n < 2n ** 317n, "G/r lower bound failed");

const periodBarrier = 72057431991n;
assert(periodBarrier > 3n ** 16n, "period barrier check failed");
assert(periodBarrier > 300n * 352n, "determinant endpoint check failed");
assert(periodBarrier > 3990n, "determinant monotonicity endpoint failed");
assert(19n ** 26n > periodBarrier * 7n ** 26n,
  "logarithmic endpoint check failed");
assert(3n * periodBarrier > 200n * (128n + 41n),
  "G positivity endpoint failed");

// Sample the exact same-root ladder independently of the deformation audit.
// Small periods do not always have G>0, so this loop is kept separate.
let ladderSamples = 0;
for (let r = 5; r <= 500; ++r) {
  const N = Math.ceil(Math.log2(3) * r - 1e-12);
  assert((1n << BigInt(N - 1)) < 3n ** BigInt(r) &&
         3n ** BigInt(r) < (1n << BigInt(N)),
    "sample ceiling selection failed");
  if (gcd(BigInt(N), BigInt(r)) !== 1n) continue;
  const B = N - r;
  const L = r - B;
  const M = B - L;
  const E = L - 2 * M;
  const F = M - 2 * E;
  const G = E - 3 * F;
  if (G <= 0) continue;
  const D = (1n << BigInt(N)) - 3n ** BigInt(r);
  const eg = extendedGcd(BigInt(r), BigInt(N));
  const z = mod(powModSigned(2n, eg.x, D) * powModSigned(3n, eg.y, D), D);
  assert(mod(8n * powMod(z, BigInt(M), D), D) === 9n % D,
    "sample M power identity failed");
  assert(mod(243n * powMod(z, BigInt(E), D), D) === 256n % D,
    "sample E power identity failed");
  assert(mod(2n ** 19n * powMod(z, BigInt(F), D), D) === 3n ** 12n % D,
    "sample F power identity failed");
  assert(mod(3n ** 41n * powMod(z, BigInt(G), D), D) === 2n ** 65n % D,
    "sample G power identity failed");
  ++ladderSamples;
}
assert(ladderSamples > 0, "the finite power-ladder audit was empty");

const maxR = Number(process.argv[2] || 30);
const counts = {"4":0, "3+1":0, "2+2":0, "2+1+1":0, "1+1+1+1":0};
const properCounts = {"4":0, "3+1":0, "2+2":0, "2+1+1":0, "1+1+1+1":0};
const run4Patterns = new Map();
let fullCarry = 0;
let smallestProper = null;
const smallestProperByType = {};

for (let r = 5; r <= maxR; ++r) {
  const N = Math.ceil(Math.log2(3) * r - 1e-12);
  assert((1n << BigInt(N - 1)) < 3n ** BigInt(r) &&
         3n ** BigInt(r) < (1n << BigInt(N)),
    "finite-audit ceiling selection failed");
  if (gcd(BigInt(N), BigInt(r)) !== 1n) continue;
  const D = (1n << BigInt(N)) - 3n ** BigInt(r);
  const eg = extendedGcd(BigInt(r), BigInt(N));
  assert(eg.g === 1n, "bad coprime pair");
  const z = mod(powModSigned(2n, eg.x, D) * powModSigned(3n, eg.y, D), D);
  assert(powMod(z, BigInt(r), D) === 2n % D, "z^r identity failed");
  assert(powMod(z, BigInt(N), D) === 3n % D, "z^N identity failed");

  const B = N - r;
  const L = r - B;
  const M = B - L;
  const E = L - 2 * M;
  const F = M - 2 * E;
  const G = E - 3 * F;
  if (G > 0) {
    assert(B === 3 * M + E, "wrong B decomposition");
    assert(B < 4 * M, "M quotient bound failed");
    assert(M < 3 * E, "M/E quotient bound failed");
    assert(E < 4 * F, "E/F quotient bound failed");
    assert(mod(3n * powMod(z, BigInt(L), D), D) === 4n % D,
      "L power identity failed");
    assert(mod(8n * powMod(z, BigInt(M), D), D) === 9n % D,
      "M power identity failed");
    assert(mod(243n * powMod(z, BigInt(E), D), D) === 256n % D,
      "E power identity failed");
    assert(mod(2n ** 19n * powMod(z, BigInt(F), D), D) === 3n ** 12n % D,
      "F power identity failed");
    assert(mod(3n ** 41n * powMod(z, BigInt(G), D), D) === 2n ** 65n % D,
      "G power identity failed");
  }

  for (let i = 1; i < r; ++i) for (let j = i + 1; j < r; ++j) {
    for (let k = j + 1; k < r; ++k) for (let l = k + 1; l < r; ++l) {
      const T = [i,j,k,l];
      const levels = Array(r).fill(0);
      for (const t of T) levels[t] = 1;
      const positions = levels.map((m, q) => Math.floor(q * N / r) - m);
      let valid = positions[0] === 0 && positions[r - 1] < N;
      for (let q = 1; q < r; ++q) {
        if (positions[q] <= positions[q - 1]) valid = false;
      }
      if (!valid) continue;

      const type = runType(T);
      assert(Object.hasOwn(counts, type), "unclassified four-shift run type");
      ++counts[type];

      const word = [];
      for (let q = 0; q < r - 1; ++q) {
        word.push(positions[q + 1] - positions[q]);
      }
      word.push(N - positions[r - 1]);
      const data = affineData(word);
      assert(data.A === BigInt(N), "wrong shortcut length");
      const common = gcd(D, data.C);
      if (common === D) ++fullCarry;
      if (common > 1n && common < D) {
        ++properCounts[type];
        if (isStrictRecord(word, N) && !isProperPower(word)) {
          const rational = exactRationalStates(word, data.C, D);
          if (rational.states.every(x => x >= rational.states[0])) {
            const record = {r,N,T,D,C:data.C,common,type,word,rational};
            const oldType = smallestProperByType[type];
            if (oldType === undefined || r < oldType.r ||
                (r === oldType.r && D / common < oldType.D / oldType.common)) {
              smallestProperByType[type] = record;
            }
            if (smallestProper === null || r < smallestProper.r ||
                (r === smallestProper.r &&
                 D / common < smallestProper.D / smallestProper.common)) {
              smallestProper = record;
            }
          }
        }
      }

      if (type === "4") {
        const gaps = [];
        for (let q = 0; q < 3; ++q) {
          gaps.push(Math.floor((i + q + 1) * N / r) -
            Math.floor((i + q) * N / r));
        }
        const pattern = gaps.join("");
        assert(pattern === "121" || pattern === "122" || pattern === "212",
          "forbidden run-4 internal pattern");
        run4Patterns.set(pattern, (run4Patterns.get(pattern) || 0) + 1);

        const c = i * N % r;
        assert(1 <= c && c < B, "run start residue is outside (0,B)");
        let A;
        if (pattern === "121") {
          A = 85n;
          assert(c < L - M, "wrong 121 residue interval");
        } else if (pattern === "122") {
          A = 101n;
          assert(L - M <= c && c < L, "wrong 122 residue interval");
        } else {
          A = 119n;
          assert(L <= c && c < B, "wrong 212 residue interval");
        }

        let subsetGate = mod(-z, D);
        for (const t of T) {
          const residue = t * N % r;
          subsetGate = mod(subsetGate + mod(z - 1n, D) *
            inverseMod(powMod(z, BigInt(residue), D), D), D);
        }
        const normal = mod(27n * powMod(z, BigInt(c + 1), D) - A * z + A, D);
        assert(mod(normal + 27n * powMod(z, BigInt(c), D) * subsetGate, D) === 0n,
          "run-4 compressed normal form failed");
      }
    }
  }
}

assert(fullCarry === 0, "a finite full-determinant carry was found");
assert(smallestProper !== null, "missing four-shift proper-factor countermodel");
if (maxR === 30) {
  const expectedCounts = {
    "4":115, "3+1":1148, "2+2":523,
    "2+1+1":5765, "1+1+1+1":5535
  };
  const expectedProper = {
    "4":10, "3+1":63, "2+2":24,
    "2+1+1":281, "1+1+1+1":228
  };
  for (const type of Object.keys(expectedCounts)) {
    assert(counts[type] === expectedCounts[type],
      "four-shift run count changed for " + type);
    assert(properCounts[type] === expectedProper[type],
      "four-shift proper-factor count changed for " + type);
  }
  assert(run4Patterns.get("121") === 31 &&
         run4Patterns.get("122") === 42 &&
         run4Patterns.get("212") === 42,
    "run-4 internal-pattern counts changed");
  assert(smallestProper.r === 8 && smallestProper.N === 13 &&
         smallestProper.D === 1631n && smallestProper.common === 7n,
    "smallest proper-factor record changed");
  const run4Countermodel = smallestProperByType["4"];
  assert(run4Countermodel !== undefined, "missing run-4 countermodel");
  assert(run4Countermodel.r === 17 && run4Countermodel.N === 27 &&
         run4Countermodel.T.join(".") === "4.5.6.7" &&
         run4Countermodel.D === 5077565n &&
         run4Countermodel.C === 484824815n &&
         run4Countermodel.common === 5n &&
         run4Countermodel.rational.denominator === 1015513n,
    "run-4 countermodel changed");
}

console.log("max_r=" + maxR);
for (const type of ["4","3+1","2+2","2+1+1","1+1+1+1"]) {
  console.log("type_" + type + "=" + counts[type] + ":" + properCounts[type]);
}
console.log("run4_internal_patterns=" +
  [...run4Patterns].sort().map(([k,v]) => k + ":" + v).join(","));
console.log("F_exact_comparisons=" + fComparisons);
console.log("G_exact_comparisons=" + gComparisons);
console.log("G_content_range=" + minimumGContent + ":" + maximumGContent);
console.log("power_ladder_samples=" + ladderSamples);
console.log("full_carry_cases=" + fullCarry);
console.log("smallest_proper=" + [
  smallestProper.r, smallestProper.N, smallestProper.T.join("."),
  smallestProper.D, smallestProper.C, smallestProper.common,
  smallestProper.D / smallestProper.common, smallestProper.type,
  smallestProper.word.join(".")
].join(":"));
console.log("smallest_proper_states=" +
  smallestProper.rational.states.join(",") + "/" +
  smallestProper.rational.denominator);
for (const type of Object.keys(smallestProperByType).sort()) {
  const e = smallestProperByType[type];
  console.log("smallest_proper_type_" + type + "=" + [
    e.r, e.N, e.T.join("."), e.D, e.C, e.common,
    e.D / e.common, e.word.join(".")
  ].join(":"));
  console.log("smallest_proper_type_" + type + "_states=" +
    e.rational.states.join(",") + "/" + e.rational.denominator);
}
console.log("four_shift_run_certificate_passed=true");
