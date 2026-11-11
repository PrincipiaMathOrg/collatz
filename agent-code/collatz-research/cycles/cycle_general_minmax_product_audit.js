#!/usr/bin/env node
"use strict";

// Regression audit for the direct minimum/maximum/product attack on an
// arbitrary accelerated cycle.  It verifies the universal algebraic
// identities on the primitive q=5 model and on an all-depth long-rise
// rational family, together with the sharp coprime-six packing lemma which
// is the elementary input genuinely specific to integer states.

function abs(a) { return a < 0n ? -a : a; }
function pow2(k) { return 1n << BigInt(k); }
function pow3(k) { return 3n ** BigInt(k); }
function gcd(a, b) {
  a = abs(a);
  b = abs(b);
  while (b !== 0n) {
    const next = a % b;
    a = b;
    b = next;
  }
  return a;
}
function bitLength(n) { return n.toString(2).length; }
function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function auditWord(name, word) {
  const r = word.length;
  let A = 0;
  let C = 0n;
  for (const a of word) {
    C = 3n * C + pow2(A);
    A += a;
  }
  const D = pow2(A) - pow3(r);
  assert(D > 0n && C > 0n, `${name}: positive fixed point`);
  const g = gcd(C, D);
  const q = D / g;
  let p = C / g;
  const states = [p];
  for (const a of word) {
    const numerator = 3n * p + q;
    assert(numerator % pow2(a) === 0n, `${name}: exact branch`);
    p = numerator / pow2(a);
    states.push(p);
  }
  assert(p === states[0], `${name}: closure`);
  const cycleStates = states.slice(0, -1);
  assert(cycleStates.every(value => value > 0n && value % 2n === 1n),
    `${name}: positive odd numerators`);
  assert(new Set(cycleStates.map(String)).size === r,
    `${name}: primitive states`);

  let productLeft = 1n;
  let productRight = pow2(A);
  for (const value of cycleStates) {
    productLeft *= 3n * value + q;
    productRight *= value;
  }
  assert(productLeft === productRight, `${name}: exact product`);

  let additive = 0n;
  for (let i = 0; i < r; ++i) {
    const incoming = word[(i + r - 1) % r];
    additive += (pow2(incoming) - 3n) * cycleStates[i];
  }
  assert(additive === q * BigInt(r), `${name}: additive telescope`);

  let minIndex = 0;
  let maxIndex = 0;
  for (let i = 1; i < r; ++i) {
    if (cycleStates[i] < cycleStates[minIndex]) minIndex = i;
    if (cycleStates[i] > cycleStates[maxIndex]) maxIndex = i;
  }
  const minValue = cycleStates[minIndex];
  const maxValue = cycleStates[maxIndex];
  assert(minValue > q, `${name}: nontrivial minimum`);
  assert(word[minIndex] === 1, `${name}: minimum outgoing rise`);
  assert(word[(minIndex + r - 1) % r] >= 2,
    `${name}: minimum incoming drop`);
  assert(word[(maxIndex + r - 1) % r] === 1,
    `${name}: maximum incoming rise`);
  assert(word[maxIndex] >= 2, `${name}: maximum outgoing drop`);

  return {
    name,
    r,
    A,
    D,
    C,
    g,
    q,
    minNumerator: minValue,
    maxNumerator: maxValue,
    minIndex,
    maxIndex,
    states: cycleStates
  };
}

const q5Word = [
  1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 2, 3, 2, 1, 1, 1, 5
];
const q5 = auditWord("primitive-q5", q5Word);
assert(q5.q === 5n && q5.minNumerator === 187n
  && q5.maxNumerator === 2773n,
"q5 regression");
assert(q5.D === 5077565n && q5.g === 1015513n,
  "q5 denominator factor");

const q13 = auditWord("primitive-q13", [1, 2, 1, 2, 2]);
assert(q13.q === 13n && q13.minNumerator === 319n,
  "q13 regression");

// The long-rise word (1^(r-1), N-r+1) is a primitive strict-least rational
// one-strip cycle.  Its maximum/minimum ratio grows exponentially, while all
// minimum, maximum, product, and additive identities remain exact.
const longRiseRows = [];
for (const r of [32, 64, 128, 256]) {
  const N = bitLength(pow3(r));
  const word = Array(r - 1).fill(1);
  word.push(N - r + 1);
  const row = auditWord(`long-rise-r${r}`, word);
  assert(row.A === N && row.q > 1n && row.minIndex === 0
    && row.maxIndex === r - 1,
  `long-rise structure r=${r}`);
  // Exact closed form along the ordinary run in rational state coordinates.
  // q(x_i+1)=3^i(p_0+q)/2^i.
  assert(pow2(r - 1) * (row.maxNumerator + row.q)
      === pow3(r - 1) * (row.minNumerator + row.q),
    `long-rise ratio r=${r}`);
  longRiseRows.push({
    r,
    N,
    terminalExponent: word[r - 1],
    reducedDenominatorBits: bitLength(row.q),
    minimumBits: bitLength(row.minNumerator),
    maximumBits: bitLength(row.maxNumerator),
    integerRatioBits: bitLength(row.maxNumerator / row.minNumerator)
  });
}

// Sharp coprime-six packing.  If m is an odd 3-adic unit and u_j is the
// j-th allowed integer at or above m, then u_j >= m+3j-1 for j>=1.
// Equality occurs for m=5 mod 6 and odd j.
let packingChecks = 0n;
let sharpPackingChecks = 0n;
for (let m = 1; m <= 599; m += 2) {
  if (m % 3 === 0) continue;
  const allowed = [];
  let value = m;
  while (allowed.length < 200) {
    if (value % 2 === 1 && value % 3 !== 0) allowed.push(value);
    value += 1;
  }
  assert(allowed[0] === m, "packing anchor");
  for (let j = 1; j < allowed.length; ++j) {
    const lower = m + 3 * j - 1;
    assert(allowed[j] >= lower, `packing lower m=${m} j=${j}`);
    if (allowed[j] === lower) ++sharpPackingChecks;
    ++packingChecks;
  }
}

// The trivial q=1 cycle is retained as the mandatory exception.  Its local
// extrema are not strict, so it is intentionally excluded from auditWord.
{
  const word = [2];
  let C = 0n;
  let A = 0;
  for (const a of word) {
    C = 3n * C + pow2(A);
    A += a;
  }
  const D = pow2(A) - 3n;
  assert(C === D && C / D === 1n, "trivial q=1 cycle");
}

console.log(JSON.stringify({
  theorem: "general cycle minimum-maximum-product audit",
  q5: {
    r: q5.r,
    A: q5.A,
    D: q5.D.toString(),
    gcdCarryDeterminant: q5.g.toString(),
    q: q5.q.toString(),
    minNumerator: q5.minNumerator.toString(),
    maxNumerator: q5.maxNumerator.toString(),
    minState: `${q5.minNumerator}/${q5.q}`,
    maxState: `${q5.maxNumerator}/${q5.q}`
  },
  q13: {
    r: q13.r,
    A: q13.A,
    q: q13.q.toString(),
    minState: `${q13.minNumerator}/${q13.q}`,
    maxState: `${q13.maxNumerator}/${q13.q}`
  },
  longRiseRows,
  packingChecks: packingChecks.toString(),
  sharpPackingChecks: sharpPackingChecks.toString(),
  trivialQ1Exception: true,
  status: "PASS"
}, null, 2));
