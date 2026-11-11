"use strict";

// Searches ordinary shortcut orbits for the exact First-Crossing Descent
// statement.  This is much faster for finding a counterexample than
// enumerating all ballot words: a non-descent word has a small canonical
// positive representative rho, and its orbit supplies the word directly.

const limit = Number(process.argv[2] || 1000000);
const stepLimit = Number(process.argv[3] || 100000);

let crossed = 0, noCross = 0, nonDescent = 0, first = null;
let leastMargin = null, leastRow = null, longest = null;

for (let seed = 1; seed <= limit; ++seed) {
  let x = BigInt(seed), P = 1n, M = 1n, C = 0n, s = 0;
  let word = "", found = false;
  for (let k = 1; k <= stepLimit; ++k) {
    if ((x & 1n) === 1n) {
      word += "1";
      x = (3n * x + 1n) / 2n;
      C = 3n * C + M;
      P *= 3n;
      ++s;
    } else {
      word += "0";
      x /= 2n;
    }
    M *= 2n;
    if (P >= M) continue;

    found = true;
    ++crossed;
    const D = M - P, d = x - BigInt(seed);
    if (P * BigInt(seed) + C !== M * x) throw new Error("affine mismatch");
    const row = {seed, end: x, k, s, D, C, d, word};
    if (!longest || k > longest.k) longest = row;
    const margin = -d;
    if (leastMargin === null || margin < leastMargin) {
      leastMargin = margin;
      leastRow = row;
    }
    if (d >= 0n && word !== "0" && word !== "10") {
      ++nonDescent;
      if (!first) first = row;
    }
    break;
  }
  if (!found) ++noCross;
}

function show(x) {
  if (!x) return "none";
  return Object.entries(x).map(([k, v]) => `${k}=${v}`).join(" ");
}

console.log(`limit=${limit} stepLimit=${stepLimit} crossed=${crossed} noCross=${noCross} nonDescent=${nonDescent}`);
console.log(`leastMargin=${leastMargin} ${show(leastRow)}`);
console.log(`longest ${show(longest)}`);
console.log(`firstNonDescent ${show(first)}`);
