#!/usr/bin/env node
"use strict";

// Exact regression for the monotone-rotation/Ferrers-wrap form of the
// denominator-one gate.  This does not certify cycle exclusion.

function gcd(a, b) {
  if (a < 0n) a = -a;
  if (b < 0n) b = -b;
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

function affine(word) {
  let C = 0n, A = 0n;
  for (const a of word) {
    C = 3n * C + (1n << A);
    A += BigInt(a);
  }
  const P = 3n ** BigInt(word.length);
  const Q = 1n << A;
  return {C, A, P, Q, D: Q - P};
}

function rotate(word, i) {
  return word.slice(i).concat(word.slice(0, i));
}

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function prefixExponents(word) {
  const out = [0n];
  let A = 0n;
  for (const a of word) {
    A += BigInt(a);
    out.push(A);
  }
  return out;
}

function auditWord(label, word, expectedQ) {
  const base = affine(word);
  assert(base.D > 0n, `${label}: D must be positive`);
  const g = gcd(base.D, base.C);
  const q = base.D / g;
  assert(q === expectedQ, `${label}: denominator mismatch`);

  let unitLetters = 0;
  const wraps = [];
  for (let i = 0; i < word.length; ++i) {
    if (word[i] !== 1) continue;
    ++unitLetters;
    const u = rotate(word, i);
    const v = rotate(word, i + 1);
    const du = affine(u), dv = affine(v);
    assert(du.D === base.D && dv.D === base.D, `${label}: rotation D`);
    assert(gcd(du.D, du.C) === g && gcd(dv.D, dv.C) === g,
      `${label}: rotation gcd`);

    const Au = prefixExponents(u), Av = prefixExponents(v);
    let cells = 0n, support = 0, cellCount = 0;
    for (let j = 1; j < word.length; ++j) {
      const height = u[j] - 1;
      assert(Av[j] - Au[j] === BigInt(height),
        `${label}: coordinate-height identity`);
      if (height > 0) ++support;
      for (let h = 0; h < height; ++h) {
        cells += 3n ** BigInt(word.length - 1 - j) *
          (1n << (Au[j] + BigInt(h)));
        ++cellCount;
      }
    }

    const S = dv.C - du.C;
    const p = du.C / g;
    assert(S === cells, `${label}: Ferrers cell sum`);
    assert(2n * S === g * (p + q), `${label}: rotation recurrence`);
    assert(gcd(S, base.D) === g, `${label}: exact wrap gcd`);
    assert((S % base.D === 0n) === (q === 1n),
      `${label}: q=1 iff full-modulus wrap`);
    wraps.push({rotation: i, support, cellCount,
      numerator: p.toString(), cellSum: S.toString(),
      gcdWithD: gcd(S, base.D).toString(),
      fullWrap: S % base.D === 0n});
  }

  const AminusR = Number(base.A) - word.length;
  assert(unitLetters >= word.length - AminusR,
    `${label}: unit-letter count lower bound`);

  return {
    label,
    r: word.length,
    A: Number(base.A),
    D: base.D.toString(),
    C: base.C.toString(),
    g: g.toString(),
    q: q.toString(),
    unitLetters,
    guaranteedUnitLetters: word.length - AminusR,
    wraps
  };
}

const denominatorFiveWord = [
  1,1,1,1,1,2,1,1,2,1,2,3,2,1,1,1,5
];
const q5 = auditWord("primitive-q5", denominatorFiveWord, 5n);
assert(q5.unitLetters === 11, "q5 unit-letter regression");
assert(q5.wraps.every(w => !w.fullWrap && w.gcdWithD === "1015513"),
  "q5 must miss exactly its denominator factor in every monotone wrap");

// The nonprimitive trivial cycle has no a_i=1 rotation, so the monotone
// gate is deliberately inapplicable.  It remains the mandatory q=1
// regression for the affine formulas themselves.
const trivial = [];
for (let r = 1; r <= 20; ++r) {
  trivial.push(2);
  const d = affine(trivial);
  assert(d.D > 0n && d.C === d.D, `trivial cycle at r=${r}`);
  assert(d.D / gcd(d.D, d.C) === 1n, `trivial q=1 at r=${r}`);
}

// A smaller positive rational example exercises the same exact gcd law.
const q13 = auditWord("q13", [1,2,1,2,2], 13n);

console.log(JSON.stringify({
  theoremChecked:
    "for every a_i=1 rotation, gcd(C_{i+1}-C_i,D)=gcd(C_i,D)",
  denominatorOneEquivalent:
    "D divides the positive Ferrers cell sum iff q=1",
  q5,
  q13,
  trivialCycleRotationsPassed: true
}, null, 2));
