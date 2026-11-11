"use strict";

// Directly scans positive seeds for the shortcut 3m-1 map.  If the
// multiplicative coefficient first crosses below one after k steps and s odd
// inputs, its parity word is a primitive first-crossing word.  When the drop
// G=m_0-m_k is below D=2^k-3^s, the FCD residue is exactly tau=G.

const limit = Number(process.argv[2] || 1000000);
const stepLimit = Number(process.argv[3] || 10000);

function mod(a, m) {
  const r = a % m;
  return r < 0n ? r + m : r;
}

function egcd(a, b) {
  let r0 = a, r1 = b, x0 = 1n, x1 = 0n;
  while (r1 !== 0n) {
    const q = r0 / r1;
    [r0, r1] = [r1, r0 - q * r1];
    [x0, x1] = [x1, x0 - q * x1];
  }
  return [r0, x0];
}

function inv(a, m) {
  const [g, x] = egcd(mod(a, m), m);
  if (g !== 1n) throw new Error("inverse");
  return mod(x, m);
}

let crossed = 0, canonical = 0, noCross = 0, thirdFailures = 0, halfFailures = 0;
let bestMargin = null, best = null, maxK = 0, maxKRow = null;

for (let seed = 1; seed <= limit; ++seed) {
  let m = BigInt(seed), P = 1n, M = 1n, s = 0;
  let word = "", found = false;
  for (let k = 1; k <= stepLimit; ++k) {
    if ((m & 1n) === 1n) {
      word += "1";
      m = (3n * m - 1n) / 2n;
      P *= 3n;
      ++s;
    } else {
      word += "0";
      m /= 2n;
    }
    M *= 2n;
    if (P >= M) continue;

    found = true;
    ++crossed;
    const D = M - P, G = BigInt(seed) - m;
    if (G <= 0n) throw new Error("negative-map crossing did not descend");
    const tau = mod(G, D);
    // Reconstruct the carry independently from the binary word.
    let C = 0n, ss = 0;
    for (let j = 0; j < word.length; ++j) {
      if (word[j] === "1") {
        C = 3n * C + (1n << BigInt(j));
        ++ss;
      }
    }
    if (ss !== s || P * BigInt(seed) - C !== M * m) throw new Error("affine mismatch");
    const tau2 = D === 1n ? 0n : mod(C * inv(P, D), D);
    if (tau !== tau2) throw new Error("tau mismatch");

    // Each word is represented by its least positive 3m-1 cylinder seed.
    // A larger seed has the same word but is a lift by a multiple of M.
    if (BigInt(seed) >= M) break;
    if (word === "0" || word === "10") break;
    ++canonical;

    const margin = 3n * tau - BigInt(s);
    if (bestMargin === null || margin < bestMargin ||
        (margin === bestMargin && k > best.k)) {
      bestMargin = margin;
      best = {seed, end: m, k, s, D, G, tau, C, word};
    }
    if (margin < 0n) ++thirdFailures;
    if (2n * tau < BigInt(s)) ++halfFailures;
    if (k > maxK) {
      maxK = k;
      maxKRow = {seed, end: m, k, s, D, G, tau, C, word};
    }
    break;
  }
  if (!found) ++noCross;
}

function show(x) {
  if (!x) return "none";
  return Object.entries(x).map(([k, v]) => `${k}=${v}`).join(" ");
}

console.log(`limit=${limit} stepLimit=${stepLimit} crossed=${crossed} canonicalNonboundary=${canonical} noCross=${noCross} thirdFailures=${thirdFailures} halfFailures=${halfFailures}`);
console.log(`bestMargin=${bestMargin} ${show(best)}`);
console.log(`maxK=${maxK} ${show(maxKRow)}`);
