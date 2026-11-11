#!/usr/bin/env node
"use strict";

/*
Regression certificate for the exact deficit-coordinate move formula and
the denominator-specific paired shortcut shadow.

All arithmetic is BigInt.  The theorem itself is symbolic; this file checks
the q=5 primitive countermodel and the trivial cycle words requested in the
research ledger.
*/

function gcd(a, b) {
  if (a < 0n) a = -a;
  if (b < 0n) b = -b;
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

function mod(a, m) {
  a %= m;
  return a < 0n ? a + m : a;
}

function extendedGcd(a, b) {
  if (b === 0n) return {g: a, x: 1n, y: 0n};
  const next = extendedGcd(b, a % b);
  return {g: next.g, x: next.y, y: next.x - (a / b) * next.y};
}

function inverseMod(a, m) {
  const result = extendedGcd(mod(a, m), m);
  if (result.g !== 1n) throw new Error("noninvertible modular element");
  return mod(result.x, m);
}

function affineData(word) {
  let carry = 0n;
  let A = 0n;
  for (const a of word) {
    carry = 3n * carry + (1n << A);
    A += BigInt(a);
  }
  const D = (1n << A) - 3n ** BigInt(word.length);
  return {carry, A, D};
}

function isProperPower(word) {
  for (let d = 1; d < word.length; ++d) {
    if (word.length % d !== 0) continue;
    let periodic = true;
    for (let i = d; i < word.length; ++i) {
      if (word[i] !== word[i % d]) {
        periodic = false;
        break;
      }
    }
    if (periodic) return true;
  }
  return false;
}

function isStrictRecord(word) {
  const data = affineData(word);
  let prefix = 0n;
  for (let i = 0; i < word.length - 1; ++i) {
    prefix += BigInt(word[i]);
    if ((1n << (data.A - prefix)) <=
        3n ** BigInt(word.length - i - 1)) return false;
  }
  return true;
}

function rotateToLeastRationalState(word) {
  const data = affineData(word);
  if (data.D <= 0n) throw new Error("positive affine denominator required");
  const g = gcd(data.D, data.carry);
  const q = data.D / g;
  let numerator = data.carry / g;
  let least = numerator;
  let leastIndex = 0;
  const states = [numerator];
  for (let i = 0; i < word.length; ++i) {
    const value = 3n * numerator + q;
    const divisor = 1n << BigInt(word[i]);
    if (value % divisor !== 0n || (value / divisor) % 2n === 0n) {
      throw new Error("inexact rational valuation");
    }
    numerator = value / divisor;
    if (i + 1 < word.length) states.push(numerator);
    if (numerator < least) {
      least = numerator;
      leastIndex = (i + 1) % word.length;
    }
  }
  if (numerator !== states[0]) throw new Error("rational cycle did not close");
  return {
    word: word.slice(leastIndex).concat(word.slice(0, leastIndex)),
    q,
    leastNumerator: least
  };
}

/*
Increase the internal prefix A_i by one.  In word coordinates this sends
  (a_{i-1},a_i) to (a_{i-1}+1,a_i-1).
It is admissible when a_i>=2.
*/
function raiseInternalPrefix(word, i) {
  if (!(1 <= i && i < word.length && word[i] >= 2)) return null;
  const moved = word.slice();
  moved[i - 1] += 1;
  moved[i] -= 1;
  return moved;
}

function verifyMove(word, i) {
  const moved = raiseInternalPrefix(word, i);
  if (moved === null) return false;
  const before = affineData(word);
  const after = affineData(moved);
  if (before.A !== after.A || before.D !== after.D) {
    throw new Error("move changed total affine data");
  }
  let prefix = 0n;
  for (let j = 0; j < i; ++j) prefix += BigInt(word[j]);
  const unit =
    3n ** BigInt(word.length - 1 - i) * (1n << prefix);
  if (after.carry - before.carry !== unit) {
    throw new Error("elementary carry increment formula failed");
  }
  const oldCommon = gcd(before.D, before.carry);
  if (gcd(oldCommon, after.carry) !== 1n) {
    throw new Error("old common divisor survived a unit move");
  }
  return true;
}

function shortcutBits(word) {
  const bits = [];
  for (const a of word) {
    bits.push(1);
    for (let j = 1; j < a; ++j) bits.push(0);
  }
  return bits;
}

function boundaryRepresentatives(word, L, k) {
  const full = affineData(word);
  if (!(1 <= L && BigInt(L) <= full.A && 1 <= k && k <= word.length)) {
    throw new Error("bad boundary lengths");
  }

  let h = 0;
  let prefixExponent = 0;
  while (prefixExponent < L) {
    prefixExponent += word[h];
    ++h;
  }
  const prefix = affineData(word.slice(0, h));
  const mod2 = 1n << BigInt(L);
  const binary =
    mod(-prefix.carry * inverseMod(3n ** BigInt(h), mod2), mod2);

  const suffixWord = word.slice(word.length - k);
  const suffix = affineData(suffixWord);
  const mod3 = 3n ** BigInt(k);
  const ternary =
    mod(suffix.carry * inverseMod(1n << suffix.A, mod3), mod3);
  return {binary, ternary};
}

function verifyLocalBlocks(word0, expectedQ) {
  const least = rotateToLeastRationalState(word0);
  const word = least.word;
  if (least.q !== expectedQ) throw new Error("local-block denominator mismatch");
  let u = least.leastNumerator;
  let position = 0;
  let blocks = 0;

  while (position < word.length) {
    let ell = 1;
    while (position + ell - 1 < word.length &&
           word[position + ell - 1] === 1) {
      ++ell;
    }
    const finalIndex = position + ell - 1;
    if (finalIndex >= word.length || word[finalIndex] < 2) {
      throw new Error("local-block parse failed");
    }
    const c = word[finalIndex] - 1;

    let twoValuation = 0;
    let temp = u + expectedQ;
    while (temp % 2n === 0n) {
      temp /= 2n;
      ++twoValuation;
    }
    if (twoValuation !== ell) throw new Error("ell=v2(u+q) failed");

    let next = u;
    for (let j = position; j <= finalIndex; ++j) {
      next = (3n * next + expectedQ) / (1n << BigInt(word[j]));
    }
    const lhs = 3n ** BigInt(ell) * (u + expectedQ);
    const rhs =
      (1n << BigInt(ell)) *
      (expectedQ + (1n << BigInt(c)) * next);
    if (lhs !== rhs) throw new Error("generalized local-block equation failed");

    u = next;
    position = finalIndex + 1;
    ++blocks;
  }
  if (u !== least.leastNumerator) throw new Error("local blocks did not close");
  return blocks;
}

function verifyPairedShadow(word0, expectedQ) {
  const least = rotateToLeastRationalState(word0);
  const word = least.word;
  if (least.q !== expectedQ) throw new Error("unexpected reduced denominator");

  const data = affineData(word);
  const bits = shortcutBits(word);
  const A = Number(data.A);
  if (bits.length !== A) throw new Error("shortcut length mismatch");

  let numerator = least.leastNumerator;
  let oddCount = 0;
  let gap = expectedQ * (1n << data.A);
  let shadow = gap - numerator;
  if (shadow <= 0n) throw new Error("paired shadow did not start positive");
  const shadowStart = shadow;
  const seen = new Set();

  for (let j = 0; j < bits.length; ++j) {
    const key = shadow.toString();
    if (seen.has(key)) throw new Error("paired shadow repeated before endpoint");
    seen.add(key);

    if (bits[j] === 1) {
      if (numerator % 2n !== 1n || shadow % 2n !== 1n) {
        throw new Error("odd paired parity failed");
      }
      numerator = (3n * numerator + expectedQ) / 2n;
      shadow = (3n * shadow - expectedQ) / 2n;
      ++oddCount;
    } else {
      if (numerator % 2n !== 0n || shadow % 2n !== 0n) {
        throw new Error("even paired parity failed");
      }
      numerator /= 2n;
      shadow /= 2n;
    }

    gap = expectedQ *
      3n ** BigInt(oddCount) *
      (1n << BigInt(bits.length - j - 1));
    if (shadow !== gap - numerator || shadow <= 0n) {
      throw new Error("equal-time paired identity failed");
    }
  }

  if (numerator !== least.leastNumerator) {
    throw new Error("positive shortcut cycle did not close");
  }
  const expectedEnd =
    expectedQ * 3n ** BigInt(word.length) - least.leastNumerator;
  if (shadow !== expectedEnd || shadowStart - shadow !== expectedQ * data.D) {
    throw new Error("paired endpoint identity failed");
  }
  for (const earlier of seen) {
    if (BigInt(earlier) <= shadow) {
      throw new Error("paired endpoint is not the strict least state");
    }
  }

  return {
    q: expectedQ,
    word,
    numerator: least.leastNumerator,
    shadowStart,
    shadowEnd: shadow,
    endpointGap: shadowStart - shadow
  };
}

// Trivial cycle regressions.  They are not all in the one-strip regime,
// but the move and paired-shadow identities are independent of that regime.
let trivialMoves = 0;
for (let r = 1; r <= 20; ++r) {
  const word = Array(r).fill(2);
  const data = affineData(word);
  if (data.carry !== data.D) throw new Error("trivial q=1 cycle failed");
  for (let i = 1; i < r; ++i) {
    if (verifyMove(word, i)) ++trivialMoves;
  }
  const shadow = verifyPairedShadow(word, 1n);
  if (shadow.numerator !== 1n) throw new Error("trivial least state changed");
  if (verifyLocalBlocks(word, 1n) !== r) {
    throw new Error("trivial local-block regression failed");
  }
  const boundary = boundaryRepresentatives(word, 1, 1);
  if (boundary.binary !== 1n || boundary.ternary !== 1n) {
    throw new Error("trivial boundary representative failed");
  }
}

const denominatorFiveWord = [
  1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 2, 3, 2, 1, 1, 1, 5
];
const q5Data = affineData(denominatorFiveWord);
const q5Common = gcd(q5Data.D, q5Data.carry);
if (q5Data.D / q5Common !== 5n) throw new Error("q=5 regression failed");
let q5Moves = 0;
for (let i = 1; i < denominatorFiveWord.length; ++i) {
  if (verifyMove(denominatorFiveWord, i)) ++q5Moves;
}
const q5Shadow = verifyPairedShadow(denominatorFiveWord, 5n);
const q5Blocks = verifyLocalBlocks(denominatorFiveWord, 5n);
const q5Boundary = boundaryRepresentatives(denominatorFiveWord, 8, 4);
if (q5Boundary.binary === q5Boundary.ternary) {
  throw new Error("q=5 word unexpectedly passed the q=1 boundary collision");
}

// Regression against the false strengthening that a primitive strict-record
// one-strip word cannot share a divisor of D with a proper block carry.
const blockFactorWord = [1, 1, 1, 1, 1, 5];
const blockFactorData = affineData(blockFactorWord);
const blockFactorPrefix = affineData([1, 1]);
if (blockFactorData.D !== 295n || blockFactorData.carry !== 665n ||
    gcd(blockFactorData.D, blockFactorData.carry) !== 5n ||
    blockFactorPrefix.carry !== 5n ||
    isProperPower(blockFactorWord) || !isStrictRecord(blockFactorWord) ||
    !(3n ** 6n < 2n ** 10n && 2n ** 10n < 2n * 3n ** 6n)) {
  throw new Error("proper-block common-factor countermodel failed");
}

// Coarse exact arithmetic behind the q=1 shadow positivity theorem:
// for r>=200, 1830 r^14.3 < 1830 r^15 < 2^r.  The base case is checked
// below.  Also 2 r^15 > (r+1)^15 at r=200, and its left/right ratio
// increases with r.
if (!(1830n * 200n ** 15n < 2n ** 200n &&
      2n * 200n ** 15n > 201n ** 15n)) {
  throw new Error("polynomial-versus-dyadic base certificate failed");
}

console.log("trivial_words_checked=20");
console.log("trivial_admissible_unit_moves_checked=" + trivialMoves);
console.log("q5_admissible_unit_moves_checked=" + q5Moves);
console.log("q5_generalized_shadow_map=3m-5");
console.log("q5_shadow_start=" + q5Shadow.shadowStart);
console.log("q5_shadow_end=" + q5Shadow.shadowEnd);
console.log("q5_shadow_endpoint_gap=" + q5Shadow.endpointGap);
console.log("q5_local_minimum_blocks_checked=" + q5Blocks);
console.log("q5_fake_binary_representative_mod_256=" + q5Boundary.binary);
console.log("q5_fake_ternary_representative_mod_81=" + q5Boundary.ternary);
console.log("proper_block_factor_countermodel=1.1.1.1.1.5");
console.log("proper_block_shared_prime=5");
console.log("polynomial_lt_dyadic_for_r_ge_200=true");
console.log("deficit_move_and_shadow_regressions_passed=true");
