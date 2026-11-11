#!/usr/bin/env node
"use strict";

// Exact finite certificate for the maximal-barrier b=1 Sturmian argument.
// The all-depth inputs proved in the accompanying note are:
//   (i) the continued-fraction best-approximation lemma;
//   (ii) Rhin's |S log 2 - N log 3| lower bound.
// This script checks the finite residue base, the required continued-
// fraction cylinder, and every integer endpoint inequality.

function assert(ok, message) {
  if (!ok) throw new Error(message);
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

function bitLength(n) {
  return n.toString(2).length;
}

// The sign of p/q-(log_2 3-1), certified without floating point.
function gammaSign(p, q) {
  const dyadic = 1n << (p + q);
  const ternary = 3n ** q;
  return dyadic < ternary ? -1 : 1;
}

function certifyContinuedFractionCylinder() {
  // gamma=[0;1,1,2,2,3,1,5,2,23,2,2,1,1,55,...].
  const digits = [0n, 1n, 1n, 2n, 2n, 3n, 1n, 5n,
    2n, 23n, 2n, 2n, 1n, 1n, 55n];
  let pMinus2 = 0n;
  let pMinus1 = 1n;
  let qMinus2 = 1n;
  let qMinus1 = 0n;
  const convergents = [];
  for (let index = 0; index < digits.length; ++index) {
    const a = digits[index];
    const p = a * pMinus1 + pMinus2;
    const q = a * qMinus1 + qMinus2;
    convergents.push({index, p, q});
    pMinus2 = pMinus1;
    pMinus1 = p;
    qMinus2 = qMinus1;
    qMinus1 = q;
  }

  const expected = new Map([
    [8, [389n, 665n]],
    [10, [18641n, 31867n]],
    [12, [65049n, 111202n]],
    [14, [6195184n, 10590737n]]
  ]);
  for (const [index, pair] of expected) {
    const item = convergents[index];
    assert(item.p === pair[0] && item.q === pair[1],
      `continued-fraction recurrence failed at index ${index}`);
    assert(gammaSign(item.p, item.q) === -1,
      `expected lower convergent failed at index ${index}`);
  }

  // The cylinder with the displayed prefix has endpoints p_14/q_14 and
  // (p_14+p_13)/(q_14+q_13).  Exact opposite signs certify the prefix.
  const current = convergents[14];
  const previous = convergents[13];
  const mediantP = current.p + previous.p;
  const mediantQ = current.q + previous.q;
  assert(gammaSign(current.p, current.q) === -1,
    "left continued-fraction cylinder endpoint failed");
  assert(gammaSign(mediantP, mediantQ) === 1,
    "right continued-fraction cylinder endpoint failed");
  return {convergents, mediantP, mediantQ};
}

function certifyFiniteResidues(maxS) {
  let P = 1n;
  let C = 0n;
  let previousN = 0;
  let q2Weights = 0;
  let equalityHits = 0;
  let strictTargetHits = 0;
  for (let s = 1; s <= maxS; ++s) {
    const A = bitLength(P) - 1;
    C = 3n * C + (1n << BigInt(A));
    P *= 3n;
    const N = bitLength(P);
    const increment = N - previousN;
    previousN = N;
    if (increment !== 1 || s < 2) continue;
    const terminalDelay = N - s - 1;
    if (terminalDelay < 1) continue;
    ++q2Weights;
    const dMax = BigInt(Math.floor((terminalDelay + 1) / 2));
    const M = 1n << BigInt(N);
    const D = M - P;
    const tau = mod(C * inverse(M, D), D);
    if (tau === 0n) ++equalityHits;
    if (tau >= 1n && tau <= dMax) ++strictTargetHits;
  }
  assert(equalityHits === 0, "finite epsilon equality hit");
  assert(strictTargetHits === 0, "finite epsilon target hit");
  return {q2Weights, equalityHits, strictTargetHits};
}

function certifyEndpointInequalities() {
  const firstBase = 665n;
  const firstEnd = 63735n;
  assert(4n ** firstBase >
    3n ** firstBase * 461n * firstEnd ** 15n,
  "q=665 bridge inequality failed");

  const secondBase = 31867n;
  const secondEnd = 2n * 10590737n + 1n;
  assert(4n ** secondBase >
    3n ** secondBase * 461n * secondEnd ** 15n,
  "q=31867 bridge inequality failed");

  const tailBase = 200000n;
  const tailRight = 3n ** tailBase * 461n * 3n ** 15n *
    459n ** 225n * tailBase ** 2940n;
  assert(4n ** tailBase > tailRight,
    "tail base inequality failed");
  assert(4n * tailBase ** 2940n >
    3n * (tailBase + 1n) ** 2940n,
  "tail monotonicity ratio failed");
  return {firstBase, firstEnd, secondBase, secondEnd, tailBase};
}

function main() {
  const cf = certifyContinuedFractionCylinder();
  const finite = certifyFiniteResidues(1331);
  const endpoints = certifyEndpointInequalities();
  console.log(`finite_max_s=1331`);
  console.log(`finite_q2_weights=${finite.q2Weights}`);
  console.log(`finite_equality_hits=${finite.equalityHits}`);
  console.log(`finite_strict_target_hits=${finite.strictTargetHits}`);
  console.log(`lower_convergent_bases=665,31867,111202,10590737`);
  console.log(`cf_right_endpoint=${cf.mediantP}/${cf.mediantQ}`);
  console.log(`q665_bridge_end=${endpoints.firstEnd}`);
  console.log(`q31867_bridge_end=${endpoints.secondEnd}`);
  console.log(`tail_monotone_from_q=${endpoints.tailBase}`);
  console.log(`maximal_epsilon_b1_excluded_all_depth=true`);
}

main();
