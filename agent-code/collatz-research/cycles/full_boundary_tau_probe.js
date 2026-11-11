#!/usr/bin/env node
"use strict";

// Exact exhaustive probe for the residue inequality
//
//     3 tau >= r,
//     tau = C (2^A)^{-1} mod (2^A-3^r).
//
// The search uses the anchored strict-record one-strip hypotheses from the
// cycle reduction.  It deliberately omits unrelated trajectory diagnostics
// so that the complete range through r=20 can be checked quickly.

const maximumR = Number(process.argv[2] || 20);
const looseMaximumR = Number(process.argv[3] || 12);
const alpha = Math.log2(3);

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function mod(a, m) {
  a %= m;
  return a < 0n ? a + m : a;
}

function egcd(a, b) {
  if (b === 0n) return {g: a, x: 1n, y: 0n};
  const z = egcd(b, a % b);
  return {g: z.g, x: z.y, y: z.x - (a / b) * z.y};
}

function inverseMod(a, m) {
  const z = egcd(mod(a, m), m);
  if (z.g !== 1n) throw new Error("nonunit modular inverse");
  return mod(z.x, m);
}

function isProperPower(word) {
  for (let d = 1; d < word.length; ++d) {
    if (word.length % d !== 0) continue;
    let equal = true;
    for (let j = d; j < word.length; ++j) {
      if (word[j] !== word[j % d]) {
        equal = false;
        break;
      }
    }
    if (equal) return true;
  }
  return false;
}

const rows = [];
let firstFailure = null;
let firstLooseFailure = null;
let deepestLooseFailure = null;
let firstTerminalStrongFailure = null;
let firstSuffixDepthResidueFailure = null;
let minimumSuffixDepthResidueMargin = null;
let minimumSuffixDepthResidueWitness = null;
const terminalStrongRows = [];

for (let r = 2; r <= maximumR; ++r) {
  const A = Math.ceil(r * alpha - 1e-12);
  const M = 1n << BigInt(A);
  const R = 3n ** BigInt(r);
  const D = M - R;
  const inverseM = inverseMod(M, D);
  const suffixPowers3 = Array(r + 1).fill(1n);
  for (let j = 1; j <= r; ++j) suffixPowers3[j] = suffixPowers3[j - 1] * 3n;

  let words = 0;
  let primitive = 0;
  let minimumMargin = null;
  let minimumTau = null;
  let minimumWord = null;
  const word = [];

  function visit(i, exponent, carry) {
    if (i === r) {
      if (exponent !== A) return;
      ++words;
      const properPower = isProperPower(word);
      if (!properPower) ++primitive;
      const tau = mod(carry * inverseM, D);
      const margin = 3n * tau - BigInt(r);
      if (minimumMargin === null || margin < minimumMargin) {
        minimumMargin = margin;
        minimumTau = tau;
        minimumWord = word.join(".");
      }
      if (margin < 0n && firstFailure === null) {
        firstFailure = {
          r,
          A,
          D: D.toString(),
          C: carry.toString(),
          tau: tau.toString(),
          margin: margin.toString(),
          properPower,
          word: word.join("."),
        };
      }
      return;
    }

    const remaining = r - i - 1;
    const largest = A - exponent - remaining;
    for (let a = 1; a <= largest; ++a) {
      if (i === 0 && a !== 1) continue;
      const nextExponent = exponent + a;
      if (i < r - 1 &&
          (1n << BigInt(A - nextExponent)) <= suffixPowers3[r - i - 1]) {
        continue;
      }
      word.push(a);
      visit(i + 1, nextExponent, 3n * carry + (1n << BigInt(exponent)));
      word.pop();
    }
  }

  visit(0, 0, 0n);

  if (r <= looseMaximumR) {
    let looseWords = 0;
    let terminalStrongWords = 0;
    let terminalStrongMinimumTau = null;
    let terminalStrongMinimumWord = null;
    function visitLoose(i, exponent, carry) {
      if (i === r) {
        if (exponent !== A) return;
        ++looseWords;
        const tau = mod(carry * inverseM, D);
        const margin = 3n * tau - BigInt(r);
        let suffixExponent = 0;
        let suffixDepth = 0;
        for (let s = 1; s < r; ++s) {
          suffixExponent += word[r - s];
          if ((1n << BigInt(suffixExponent)) <= suffixPowers3[s]) break;
          suffixDepth = s;
        }
        const suffixMargin = 3n * tau - BigInt(suffixDepth);
        if (minimumSuffixDepthResidueMargin === null ||
            suffixMargin < minimumSuffixDepthResidueMargin) {
          minimumSuffixDepthResidueMargin = suffixMargin;
          minimumSuffixDepthResidueWitness = {
            r, A, tau: tau.toString(), suffixDepth,
            suffixMargin: suffixMargin.toString(), word: word.join(".")
          };
        }
        if (suffixMargin <= 0n && firstSuffixDepthResidueFailure === null) {
          firstSuffixDepthResidueFailure = {
            r, A, tau: tau.toString(), suffixDepth,
            suffixMargin: suffixMargin.toString(), word: word.join(".")
          };
        }
        if (word[r - 1] >= 2) {
          ++terminalStrongWords;
          if (terminalStrongMinimumTau === null || tau < terminalStrongMinimumTau) {
            terminalStrongMinimumTau = tau;
            terminalStrongMinimumWord = word.join(".");
          }
          if (margin < 0n && firstTerminalStrongFailure === null) {
            firstTerminalStrongFailure = {
              r,
              A,
              tau: tau.toString(),
              margin: margin.toString(),
              word: word.join("."),
            };
          }
        }
        if (margin < 0n && firstLooseFailure === null) {
          firstLooseFailure = {
            r,
            A,
            D: D.toString(),
            C: carry.toString(),
            tau: tau.toString(),
            margin: margin.toString(),
            word: word.join("."),
          };
        }
        if (margin < 0n) {
          if (deepestLooseFailure === null ||
              suffixDepth > deepestLooseFailure.suffixDepth) {
            deepestLooseFailure = {
              r,
              A,
              tau: tau.toString(),
              margin: margin.toString(),
              suffixDepth,
              word: word.join("."),
            };
          }
        }
        return;
      }
      const remaining = r - i - 1;
      const largest = A - exponent - remaining;
      for (let a = 1; a <= largest; ++a) {
        if (i === 0 && a !== 1) continue;
        word.push(a);
        visitLoose(i + 1, exponent + a,
          3n * carry + (1n << BigInt(exponent)));
        word.pop();
      }
    }
    visitLoose(0, 0, 0n);
    if (r === 20) {
      assert(looseWords === 86493225,
        "r=20 loose composition count changed");
      assert(terminalStrongWords === 34597290,
        "r=20 terminal-strong count changed");
      assert(firstSuffixDepthResidueFailure === null,
        "suffix-depth residue failure appeared through r=20");
      assert(minimumSuffixDepthResidueMargin === 3n,
        "suffix-depth residue margin changed through r=20");
    }
    terminalStrongRows.push({
      r,
      A,
      looseWords,
      words: terminalStrongWords,
      minimumTau: terminalStrongMinimumTau === null ? null : terminalStrongMinimumTau.toString(),
      minimumWord: terminalStrongMinimumWord,
    });
  }
  rows.push({
    r,
    A,
    D: D.toString(),
    words,
    primitive,
    minimumTau: minimumTau === null ? null : minimumTau.toString(),
    minimumMargin: minimumMargin === null ? null : minimumMargin.toString(),
    minimumWord,
  });
}

// The first terminal-only failure is a mandatory regression.  It proves
// that the last strict suffix, or even the last six strict suffixes, cannot
// replace the complete strict-record hypothesis.  Its exact winding is
// nevertheless positive, so it refutes only the sufficient one-third bound.
if (looseMaximumR >= 17) {
  assert(firstTerminalStrongFailure !== null,
    "terminal-only one-third regression disappeared");
  assert(firstTerminalStrongFailure.r === 17 &&
    firstTerminalStrongFailure.tau === "4" &&
    firstTerminalStrongFailure.margin === "-5" &&
    firstTerminalStrongFailure.word ===
      "1.2.2.1.1.1.2.1.1.4.1.1.1.2.1.1.4",
    "terminal-only one-third regression changed");
  assert(deepestLooseFailure !== null &&
    deepestLooseFailure.suffixDepth >= 6,
    "terminal-only suffix-depth audit weakened");
}

console.log(JSON.stringify({
  target: "OPEN-CYCLE-INT-01",
  candidate: "3 tau >= r for every anchored strict-record one-strip word",
  rows,
  firstFailure,
  firstLooseFailure,
  deepestLooseFailure,
  terminalStrongRows,
  firstTerminalStrongFailure,
  firstSuffixDepthResidueFailure,
  minimumSuffixDepthResidueMargin:
    minimumSuffixDepthResidueMargin === null ? null :
      minimumSuffixDepthResidueMargin.toString(),
  minimumSuffixDepthResidueWitness,
  warning: "finite exhaustive evidence only",
}, null, 2));
