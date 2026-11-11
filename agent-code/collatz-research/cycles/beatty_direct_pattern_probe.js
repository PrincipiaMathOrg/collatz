#!/usr/bin/env node
"use strict";

// Diagnostic for the candidate strengthening Q >= 2^U - 2.
// This is finite evidence only.  It enumerates all subthreshold terminal
// quotients and retains the exact Beatty-restricted reverse trajectories.

const maxR = Number(process.argv[2] || 40);
let globalGap = null;
let globalRatio = null;
let globalCoefficientGap = null;

for (let r = 3; r <= maxR; ++r) {
  const N = (3n ** BigInt(r) - 1n).toString(2).length;
  const e = N - r;
  const K = new Set();
  for (let ell = 1; ell < e; ++ell) {
    K.add(Math.floor(ell * r / e));
  }

  const limit = 1n << BigInt(e - 1);
  let rowGap = null;
  let rowRatio = null;
  let rowCoefficientGap = null;
  let exactPaths = 0;

  for (let q = 1n; q < limit; ++q) {
    let z = q;
    let V = 0;
    let exact = true;
    const spikes = [];

    for (let d = r - 1; d >= 1; --d) {
      if ((z & 1n) === 0n) {
        z = 3n * z / 2n;
      } else if ((z & 3n) === 1n && K.has(d)) {
        z = (3n * z + 1n) / 4n;
        ++V;
        spikes.push(d);
      } else {
        exact = false;
        break;
      }
    }
    if (!exact) continue;
    const U = e - 1 - V;
    if (U < 1) continue;
    ++exactPaths;

    const target = (1n << BigInt(U)) - 2n;
    const gap = q - target;
    const datum = {r, N, e, q, U, V, gap,
      spikes: spikes.slice().sort((a, b) => a - b)};
    if (rowGap === null || gap < rowGap.gap) rowGap = datum;
    if (rowRatio === null || q * rowRatio.denominator <
        rowRatio.numerator * (1n << BigInt(U - 1))) {
      rowRatio = {...datum, numerator: q,
        denominator: 1n << BigInt(U - 1)};
    }
    const liftWeight = r - 1 + V;
    const coefficientGap = q * (1n << BigInt(liftWeight)) -
      3n ** BigInt(r - 1);
    const coefficientDatum = {...datum, coefficientGap, liftWeight};
    if (rowCoefficientGap === null ||
        coefficientGap < rowCoefficientGap.coefficientGap) {
      rowCoefficientGap = coefficientDatum;
    }
  }

  if (rowGap !== null && (globalGap === null || rowGap.gap < globalGap.gap)) {
    globalGap = rowGap;
  }
  if (rowRatio !== null && (globalRatio === null ||
      rowRatio.numerator * globalRatio.denominator <
        globalRatio.numerator * rowRatio.denominator)) {
    globalRatio = rowRatio;
  }
  if (rowCoefficientGap !== null && (globalCoefficientGap === null ||
      rowCoefficientGap.coefficientGap <
        globalCoefficientGap.coefficientGap)) {
    globalCoefficientGap = rowCoefficientGap;
  }
  console.log(JSON.stringify({r, N, e, exactPaths, rowGap, rowRatio,
    rowCoefficientGap},
    (_, value) => typeof value === "bigint" ? value.toString() : value));
}

console.log("globalGap=" + JSON.stringify(globalGap, (_, value) =>
  typeof value === "bigint" ? value.toString() : value, 2));
console.log("globalRatio=" + JSON.stringify(globalRatio, (_, value) =>
  typeof value === "bigint" ? value.toString() : value, 2));
console.log("globalCoefficientGap=" + JSON.stringify(globalCoefficientGap,
  (_, value) => typeof value === "bigint" ? value.toString() : value, 2));
