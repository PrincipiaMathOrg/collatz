#!/usr/bin/env node
"use strict";

// Exact full-modulus audit for strict-record one-strip one-drop words.
// Every arithmetic quantity is a BigInt.  The default exhaustive cutoff is
// deliberately modest enough for a quick independent rerun.

const crypto = require("crypto");

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function mod(a, m) {
  const z = a % m;
  return z < 0n ? z + m : z;
}

function egcd(a, b) {
  if (b === 0n) return [a, 1n, 0n];
  const [g, x, y] = egcd(b, a % b);
  return [g, y, x - (a / b) * y];
}

function inverse(a, m) {
  const [g, x] = egcd(mod(a, m), m);
  assert(g === 1n, `nonunit ${a} modulo ${m}`);
  return mod(x, m);
}

function bitLength(n) {
  return n.toString(2).length;
}

function v3(n) {
  let v = 0;
  while (n % 3n === 0n) {
    n /= 3n;
    ++v;
  }
  return v;
}

function carry(word) {
  let C = 0n;
  let A = 0;
  for (const a of word) {
    C = 3n * C + (1n << BigInt(A));
    A += a;
  }
  return {C, A};
}

function lessRatio(aNum, aDen, bNum, bDen) {
  return aNum * bDen < bNum * aDen;
}

const maxR = Number(process.argv[2] || 28);
assert(Number.isInteger(maxR) && maxR >= 3, "maxR must be an integer at least 3");

let totalWords = 0;
let totalEdges = 0;
let q1 = 0;
let tauBelowMechanical = 0;
let tauAtMostPower = 0;
let rhoAtMostPower = 0;
let rhoBelowStrong = 0;
let tBelowMechanical = 0;
const tauWrapCounts = [0, 0, 0];
let minTauPower = null;
let minRhoPower = null;
let minTauMechanical = null;
let worstScaledBinaryEdge = null;
const rows = [];

for (let r = 3; r <= maxR; ++r) {
  const P = 3n ** BigInt(r);
  const N = bitLength(P - 1n);
  const M = 1n << BigInt(N);
  const D = M - P;
  const e = N - r;
  const twoM = 2n * M;
  const invM = inverse(M, P);
  const invD = inverse(D, twoM);
  const B = Array.from({length: r + 1}, (_, i) => Math.floor(i * N / r));
  const base = Array.from({length: r}, (_, i) => B[i + 1] - B[i]);
  const eligible = [];
  for (let i = 0; i < r - 1; ++i) if (base[i] === 2) eligible.push(i);
  assert(base[0] === 1 && base[r - 1] === 2, `mechanical endpoints r=${r}`);
  assert(eligible.length === e - 1, `eligible count r=${r}`);
  assert(eligible.length < 31, "Number-mask cutoff exceeded");

  let rowWords = 0;
  let rowMinTau = null;
  let rowMinRho = null;

  for (let mask = 1; mask < 2 ** eligible.length; ++mask) {
    ++totalWords;
    ++rowWords;
    const word = base.slice();
    const selected = new Set();
    let U = 0;
    for (let q = 0; q < eligible.length; ++q) {
      if ((mask & 2 ** q) !== 0) {
        selected.add(eligible[q]);
        --word[eligible[q]];
        ++U;
      }
    }
    word[r - 1] += U;
    const direct = carry(word);
    const C = direct.C;
    assert(direct.A === N, `exponent sum r=${r} mask=${mask}`);
    assert(word[r - 1] === U + 2, `terminal exponent r=${r} mask=${mask}`);

    const J = eligible.filter(j => !selected.has(j));
    const V = J.length;
    assert(U + V === e - 1, `U+V r=${r} mask=${mask}`);

    // Complement carry formula.
    let complementCarry = P - (1n << BigInt(r + V));
    for (let ell = 0; ell < V; ++ell) {
      const j = J[ell];
      complementCarry += (1n << BigInt(j + ell + 1)) *
        3n ** BigInt(r - j - 1);
    }
    assert(complementCarry === C, `complement carry r=${r} mask=${mask}`);

    // C=2^r F(3/2), F=(X-1)H, with positive nonincreasing H.
    const k = J.slice().reverse().map(j => r - 1 - j);
    for (let m = 1; m < k.length; ++m) {
      assert(k[m - 1] < k[m], `reversed order r=${r} mask=${mask}`);
    }
    const f = Array(r + 1).fill(0n);
    f[0] = -(1n << BigInt(V));
    f[r] = 1n;
    for (let m = 0; m < V; ++m) f[k[m]] += 1n << BigInt(V - 1 - m);
    let clearedEvaluation = 0n;
    for (let degree = 0; degree <= r; ++degree) {
      clearedEvaluation += f[degree] * 3n ** BigInt(degree) *
        (1n << BigInt(r - degree));
    }
    assert(clearedEvaluation === C, `F evaluation r=${r} mask=${mask}`);
    const h = Array(r).fill(1n);
    for (let degree = 0; degree < r; ++degree) {
      for (let m = 0; m < V; ++m) {
        if (degree < k[m]) h[degree] += 1n << BigInt(V - 1 - m);
      }
      assert(h[degree] > 0n, `H positivity r=${r} mask=${mask}`);
      if (degree > 0) assert(h[degree - 1] >= h[degree],
        `H monotonicity r=${r} mask=${mask}`);
    }
    assert(f[0] === -h[0] && f[r] === h[r - 1],
      `H endpoints r=${r} mask=${mask}`);
    for (let degree = 1; degree < r; ++degree) {
      assert(f[degree] === h[degree - 1] - h[degree],
        `F=(X-1)H r=${r} mask=${mask} degree=${degree}`);
    }

    // Dual ternary cylinder and the binary cylinder.
    const tau = mod(C * invM, P);
    assert(tau > 0n, `zero tau r=${r} mask=${mask}`);
    const tNumerator = M * tau - C;
    assert(tNumerator % P === 0n, `dual quotient r=${r} mask=${mask}`);
    const t = tNumerator / P;
    assert(t >= 0n && t < M, `dual quotient range r=${r} mask=${mask}`);
    const rho = mod(C * invD, twoM);
    assert(rho > 0n && (rho & 1n) === 1n, `binary rho r=${r} mask=${mask}`);
    assert(mod(P * rho + C - M, twoM) === 0n,
      `binary cylinder congruence r=${r} mask=${mask}`);
    const rhoFromDual = (tau & 1n) === 1n ? t : t + M;
    assert(rho === rhoFromDual, `dual/binary lift r=${r} mask=${mask}`);

    // Synthetic division with x=tau.  The top coefficient records t-tau.
    const A0 = (1n << BigInt(e)) * tau + (1n << BigInt(V));
    assert(A0 % 3n === 0n, `synthetic q0 r=${r} mask=${mask}`);
    let qCoefficient = A0 / 3n;
    assert(qCoefficient > 0n, `positive q0 r=${r} mask=${mask}`);
    let qScale = 1n << BigInt(V);
    assert(qCoefficient % qScale === 0n,
      `normalized q0 r=${r} mask=${mask}`);
    let zCoefficient = qCoefficient / qScale;
    assert(3n * zCoefficient === (1n << BigInt(U + 1)) * tau + 1n,
      `normalized q0 identity r=${r} mask=${mask}`);
    const spike = new Map();
    for (let m = 0; m < V; ++m) spike.set(k[m], 1n << BigInt(V - 1 - m));
    for (let degree = 1; degree < r; ++degree) {
      const b = spike.get(degree) || 0n;
      const numerator = 2n * qCoefficient - b;
      assert(numerator % 3n === 0n,
        `synthetic division r=${r} mask=${mask} degree=${degree}`);
      qCoefficient = numerator / 3n;
      assert(qCoefficient > 0n,
        `positive quotient r=${r} mask=${mask} degree=${degree}`);
      let zNumerator;
      if (b === 0n) {
        zNumerator = 2n * zCoefficient;
      } else {
        assert(b * 2n === qScale,
          `normalized spike scale r=${r} mask=${mask} degree=${degree}`);
        qScale /= 2n;
        zNumerator = 4n * zCoefficient - 1n;
      }
      assert(zNumerator % 3n === 0n,
        `normalized z recurrence r=${r} mask=${mask} degree=${degree}`);
      zCoefficient = zNumerator / 3n;
      assert(qCoefficient === qScale * zCoefficient && zCoefficient > 0n,
        `normalized q recurrence r=${r} mask=${mask} degree=${degree}`);
    }
    assert(qScale === 1n && zCoefficient === qCoefficient,
      `terminal q normalization r=${r} mask=${mask}`);
    assert(2n * qCoefficient === t + 1n,
      `synthetic terminal r=${r} mask=${mask}`);
    if (V > 0) {
      const a = (1n << BigInt(U + 1)) * tau + 1n;
      assert(v3(a) === k[0], `first ternary valuation r=${r} mask=${mask}`);
      assert((t + 1n) % (1n << BigInt(r - k[V - 1])) === 0n,
        `terminal binary divisibility r=${r} mask=${mask}`);
    } else {
      assert((t + 1n) % (1n << BigInt(r)) === 0n,
        `full-selection divisibility r=${r} mask=${mask}`);
    }

    // The empirical separation statements.  These counters distinguish the
    // finite certificate from the all-depth open lemma.
    const powerBound = 1n << BigInt(U);
    const mechanicalBound = P >> BigInt(r);
    const strongRhoBound = (1n << BigInt(r - U)) - 1n;
    const twoE = 1n << BigInt(e);
    if (tau < mechanicalBound) ++tauBelowMechanical;
    if (tau <= powerBound) ++tauAtMostPower;
    if (rho <= powerBound) ++rhoAtMostPower;
    if (rho < strongRhoBound) ++rhoBelowStrong;
    if (t < twoE - 1n) ++tBelowMechanical;
    if (C % D === 0n) {
      ++q1;
      const x = C / D;
      assert(x === tau && x === t, `q=1 cylinder identity r=${r} mask=${mask}`);
    }

    const witness = {r, U, V, tau, rho, t, word: word.join(",")};
    if (minTauPower === null || lessRatio(tau, powerBound,
        minTauPower.num, minTauPower.den)) {
      minTauPower = {num: tau, den: powerBound, ...witness};
    }
    if (minRhoPower === null || lessRatio(rho, powerBound,
        minRhoPower.num, minRhoPower.den)) {
      minRhoPower = {num: rho, den: powerBound, ...witness};
    }
    if (minTauMechanical === null || lessRatio(tau, mechanicalBound,
        minTauMechanical.num, minTauMechanical.den)) {
      minTauMechanical = {num: tau, den: mechanicalBound, ...witness};
    }
    if (rowMinTau === null || tau < rowMinTau) rowMinTau = tau;
    if (rowMinRho === null || rho < rowMinRho) rowMinRho = rho;

    // Unique canonical parent: remove the earliest original unselected site,
    // equivalently the largest reversed exponent k.  This audits every edge
    // in the ordered insertion tree exactly once.
    if (V > 0) {
      ++totalEdges;
      const j = J[0];
      const largestK = r - 1 - j;
      assert(largestK === k[V - 1], `largest k r=${r} mask=${mask}`);
      const parentWord = word.slice();
      parentWord[j] = 1;
      ++parentWord[r - 1];
      const parentData = carry(parentWord);
      const parentC = parentData.C;
      const T = (1n << BigInt(r - largestK)) * 3n ** BigInt(largestK);
      assert(C === 2n * parentC - P + T,
        `carry insertion r=${r} mask=${mask}`);

      const parentTau = mod(parentC * invM, P);
      const ternaryModulus = 3n ** BigInt(r - largestK);
      const u = inverse(1n << BigInt(e + largestK), ternaryModulus);
      const s = 3n ** BigInt(largestK) * u;
      assert(s > 0n && s < P, `ternary shift range r=${r} mask=${mask}`);
      const rawTau = 2n * parentTau + s;
      const tauWrap = Number(rawTau / P);
      assert(tauWrap >= 0 && tauWrap <= 2, `ternary wrap r=${r} mask=${mask}`);
      ++tauWrapCounts[tauWrap];
      assert(mod(rawTau, P) === tau, `ternary insertion r=${r} mask=${mask}`);

      const parentRho = mod(parentC * invD, twoM);
      const n = r - largestK;
      const binaryModulus = 1n << BigInt(N + 1 - n);
      const v = inverse(3n ** BigInt(n), binaryModulus);
      const R = (1n << BigInt(n)) * v;
      assert(mod(2n * parentRho + 1n - M - R, twoM) === rho,
        `binary insertion r=${r} mask=${mask}`);

      const intervalStart = mod((M + R) / 2n, M);
      const intervalLength = 1n << BigInt(U - 1);
      const intervalOffset = mod(parentRho % M - intervalStart, M);
      const inBadPreimage = intervalOffset < intervalLength;
      const isBadImage = rho <= powerBound;
      assert(inBadPreimage === isBadImage,
        `binary bad window r=${r} mask=${mask}`);

      if (worstScaledBinaryEdge === null ||
          lessRatio(2n * rho, parentRho, worstScaledBinaryEdge.num,
            worstScaledBinaryEdge.den)) {
        worstScaledBinaryEdge = {
          num: 2n * rho,
          den: parentRho,
          r,
          oldU: U + 1,
          newU: U,
          j,
          parentRho,
          rho,
          parentWord: parentWord.join(","),
          word: word.join(",")
        };
      }

      // Coefficient form of F_new=2F_parent-X^r+X^largestK.
      const parentF = Array(r + 1).fill(0n);
      parentF[0] = -(1n << BigInt(V - 1));
      parentF[r] = 1n;
      for (let m = 0; m < V - 1; ++m) {
        parentF[k[m]] += 1n << BigInt(V - 2 - m);
      }
      for (let degree = 0; degree <= r; ++degree) {
        let expected = 2n * parentF[degree];
        if (degree === r) --expected;
        if (degree === largestK) ++expected;
        assert(f[degree] === expected,
          `polynomial insertion r=${r} mask=${mask} degree=${degree}`);
      }
    }
  }

  const row = `r=${r} e=${e} words=${rowWords} minTau=${rowMinTau} minRho=${rowMinRho}`;
  rows.push(row);
  console.log(row);
}

// Regression showing that strictness and the positive step polynomial do not
// imply the mechanical lower bound.  The only failed one-drop hypothesis is
// that every preterminal 2-site must be mechanically eligible.
const counterR = 23;
const counterP = 3n ** 23n;
const counterN = bitLength(counterP - 1n);
const counterM = 1n << BigInt(counterN);
const counterB = Array.from({length: counterR}, (_, i) =>
  Math.floor(i * counterN / counterR));
const counterJ = new Set([2, 4, 6, 10, 15, 16, 18, 19, 21]);
const counterWord = Array.from({length: counterR - 1}, (_, i) =>
  counterJ.has(i) ? 2 : 1).concat([6]);
for (let i = 0; i < counterR; ++i) {
  let count = 0;
  for (const j of counterJ) if (j < i) ++count;
  assert(i + count <= counterB[i], `strict countermodel prefix i=${i}`);
}
const counterCarry = carry(counterWord);
assert(counterCarry.A === counterN && counterCarry.C === 188198344979n,
  "strict countermodel carry");
const counterTau = mod(counterCarry.C * inverse(counterM, counterP), counterP);
const counterT = (counterM * counterTau - counterCarry.C) / counterP;
assert(counterTau === 4675n && counterT === 6823n,
  "strict countermodel cylinders");
assert(counterTau < (counterP >> 23n) && counterT < (1n << 14n) - 1n,
  "strict countermodel lower-bound failures");
const counterBase = Array.from({length: counterR}, (_, i) =>
  Math.floor((i + 1) * counterN / counterR) - Math.floor(i * counterN / counterR));
assert([...counterJ].some(j => counterBase[j] !== 2),
  "countermodel must violate mechanical eligibility");

const rowDigest = crypto.createHash("sha256").update(rows.join("\n")).digest("hex");
function jsonValue(key, value) {
  return typeof value === "bigint" ? value.toString() : value;
}
console.log(JSON.stringify({
  maxR,
  totalWords,
  totalOrderedInsertionEdges: totalEdges,
  q1,
  tauBelowFloorThreeHalvesR: tauBelowMechanical,
  tauAtMostTwoU: tauAtMostPower,
  rhoAtMostTwoU: rhoAtMostPower,
  rhoBelowTwoRMinusUMinusOne: rhoBelowStrong,
  tBelowTwoEMinusOne: tBelowMechanical,
  tauWrapCounts,
  minTauOverTwoU: minTauPower,
  minRhoOverTwoU: minRhoPower,
  minTauOverFloorThreeHalvesR: minTauMechanical,
  worstScaledBinaryInsertion: worstScaledBinaryEdge,
  strictNonmechanicalCountermodel: {
    r: counterR,
    word: counterWord.join(","),
    C: counterCarry.C,
    tau: counterTau,
    floorThreeHalvesR: counterP >> 23n,
    t: counterT,
    twoEMinusOne: (1n << 14n) - 1n
  },
  rowDigest
}, jsonValue, 2));
