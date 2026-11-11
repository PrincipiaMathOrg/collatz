#!/usr/bin/env node
"use strict";

// Test the proposed node invariant R >= 2^u - 2, where R is the least
// positive terminal quotient in the current dyadic cylinder and u is the
// number of processed eligible positions on which the ordinary branch was
// chosen.  This is finite evidence only.

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
  throw new Error("unique lift failure");
}

const maxR = Number(process.argv[2] || 80);
const minR = Number(process.argv[3] || 3);

for (let r = minR; r <= maxR; ++r) {
  const P = 3n ** BigInt(r);
  const N = bitLength(P - 1n);
  const e = N - r;
  const K = new Set(Array.from({length: e - 1}, (_, i) =>
    Math.floor((i + 1) * r / e)));
  let nodes = 0;
  let firstFailure = null;
  let minimumSlack = null;

  function leastPositive(residue, L) {
    return residue === 0n ? (1n << BigInt(L)) : residue;
  }

  function visit(d, A, B, L, residue, omissions, path) {
    ++nodes;
    const least = leastPositive(residue, L);
    const target = (1n << BigInt(omissions)) - 2n;
    const slack = least - target;
    const datum = {r, N, e, d, L, omissions, least: least.toString(),
      target: target.toString(), slack: slack.toString(), path: path.slice()};
    if (minimumSlack === null || slack < minimumSlack.slackValue) {
      minimumSlack = {...datum, slackValue: slack};
    }
    if (slack < 0n) {
      firstFailure = datum;
      return;
    }
    if (d === 0) return;

    {
      const eligible = K.has(d);
      const nextA = 3n * A;
      const nextB = 3n * B;
      const nextL = L + 1;
      const nextResidue = extendResidue(nextA, nextB, L, residue, 1);
      path.push(eligible ? "O*" : "O");
      visit(d - 1, nextA, nextB, nextL, nextResidue,
        omissions + (eligible ? 1 : 0), path);
      path.pop();
      if (firstFailure !== null) return;
    }

    if (K.has(d)) {
      const nextA = 3n * A;
      const nextB = 3n * B + (1n << BigInt(L));
      const nextL = L + 2;
      const nextResidue = extendResidue(nextA, nextB, L, residue, 2);
      path.push("S");
      visit(d - 1, nextA, nextB, nextL, nextResidue, omissions, path);
      path.pop();
    }
  }

  visit(r - 1, 1n, 0n, 0, 0n, 0, []);
  if (minimumSlack !== null) delete minimumSlack.slackValue;
  console.log(JSON.stringify({r, N, e, nodes, minimumSlack, firstFailure}));
  if (firstFailure !== null) {
    process.exitCode = 1;
    break;
  }
}
