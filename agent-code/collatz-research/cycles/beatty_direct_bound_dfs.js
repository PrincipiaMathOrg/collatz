#!/usr/bin/env node
"use strict";

// Exact residue-tree diagnostic for the q=1-specific lower bound
// Q > 2^(U-1), where Q=(x+1)/2.  A reverse trajectory records V spikes
// and hence U=e-1-V.  The search is deliberately broader than the cycle
// problem: it does not impose the bottom closure equation or leastness.

function bitLength(n) {
  return n.toString(2).length;
}

function extendResidue(A, B, L, residue, extra) {
  const oldModulus = 1n << BigInt(L);
  const newModulus = oldModulus << BigInt(extra);
  for (let j = 0n; j < (1n << BigInt(extra)); ++j) {
    const candidate = residue + j * oldModulus;
    if ((A * candidate + B) % newModulus === 0n) return candidate;
  }
  throw new Error("odd affine coefficient did not have a unique lift");
}

const maxR = Number(process.argv[2] || 80);
const minR = Number(process.argv[3] || 3);

for (let r = minR; r <= maxR; ++r) {
  const P = 3n ** BigInt(r);
  const N = bitLength(P - 1n);
  const e = N - r;
  const universalLimit = 1n << BigInt(e - 1);
  const K = new Set(Array.from({length: e - 1}, (_, i) =>
    Math.floor((i + 1) * r / e)));

  let nodes = 0;
  let leaves = 0;
  let violation = null;
  let minRatio = null;

  function visit(d, A, B, L, residue, spikes) {
    ++nodes;
    if (violation !== null) return;
    if (d === 0) {
      ++leaves;
      const modulus = 1n << BigInt(L);
      const q = residue === 0n ? modulus : residue;
      const V = spikes.length;
      const U = e - 1 - V;
      if (U < 1) return;
      const directLimit = 1n << BigInt(U - 1);
      const row = {r, N, e, q: q.toString(), U, V,
        denominator: directLimit.toString(),
        spikes: spikes.slice().sort((a, b) => a - b)};
      if (minRatio === null ||
          q * BigInt(minRatio.denominator) <
            BigInt(minRatio.q) * directLimit) {
        minRatio = row;
      }
      if (q <= directLimit) violation = row;
      return;
    }

    {
      const nextA = 3n * A;
      const nextB = 3n * B;
      const nextL = L + 1;
      const nextResidue = extendResidue(nextA, nextB, L, residue, 1);
      const nextModulus = 1n << BigInt(nextL);
      const leastPositive = nextResidue === 0n ? nextModulus : nextResidue;
      if (leastPositive < universalLimit) {
        visit(d - 1, nextA, nextB, nextL, nextResidue, spikes);
      }
    }

    if (K.has(d)) {
      const nextA = 3n * A;
      const nextB = 3n * B + (1n << BigInt(L));
      const nextL = L + 2;
      const nextResidue = extendResidue(nextA, nextB, L, residue, 2);
      const nextModulus = 1n << BigInt(nextL);
      const leastPositive = nextResidue === 0n ? nextModulus : nextResidue;
      if (leastPositive < universalLimit) {
        spikes.push(d);
        visit(d - 1, nextA, nextB, nextL, nextResidue, spikes);
        spikes.pop();
      }
    }
  }

  visit(r - 1, 1n, 0n, 0, 0n, []);
  console.log(JSON.stringify({r, N, e, nodes, leaves, minRatio, violation}));
  if (violation !== null) {
    process.exitCode = 1;
    break;
  }
}
