#!/usr/bin/env node
"use strict";

// Diagnostic for the only potentially dangerous extension in the proposed
// no-SSS prefix inequality
//
//   R + 2 >= 2^(floor(gamma (t+1)) - V).
//
// It records zero-lift ordinary extensions made when the characteristic
// clock rises.  This is finite evidence only.

const gamma = Math.log2(3 / 2);
const maxDepth = Number(process.argv[2] || 50);

function extendResidue(A, B, L, residue, extra) {
  const oldModulus = 1n << BigInt(L);
  const newModulus = oldModulus << BigInt(extra);
  for (let j = 0n; j < (1n << BigInt(extra)); ++j) {
    const candidate = residue + j * oldModulus;
    if ((A * candidate + B) % newModulus === 0n) return candidate;
  }
  throw new Error("unique lift failure");
}

function leastPositive(residue, L) {
  return residue === 0n ? (1n << BigInt(L)) : residue;
}

let nodes = 0;
let closest = [];
let violation = null;

function keep(row) {
  closest.push(row);
  closest.sort((x, y) => {
    const ax = BigInt(x.slack);
    const ay = BigInt(y.slack);
    return ax < ay ? -1 : ax > ay ? 1 : x.t - y.t;
  });
  closest = closest.slice(0, 30);
}

function visit(t, A, B, L, residue, spikes, spikeRun, path) {
  ++nodes;
  if (violation !== null || t === maxDepth) return;

  const oldLeast = leastPositive(residue, L);
  const maxFutureD = Math.floor(gamma * (maxDepth + 1)) - spikes;
  if (maxFutureD >= 0 &&
      oldLeast > (1n << BigInt(maxFutureD)) - 2n) return;
  const oldClock = Math.floor(gamma * (t + 1));

  // Ordinary extension.
  {
    const nextA = 3n * A;
    const nextB = 3n * B;
    const nextL = L + 1;
    const nextResidue = extendResidue(nextA, nextB, L, residue, 1);
    const nextLeast = leastPositive(nextResidue, nextL);
    const nextT = t + 1;
    const nextClock = Math.floor(gamma * (nextT + 1));
    const D = nextClock - spikes;
    const boundary = D >= 0 ? (1n << BigInt(D)) - 2n : -1n;
    const slack = nextLeast - boundary;
    if (nextClock === oldClock + 1 && nextLeast === oldLeast) {
      keep({t: nextT, D, q: nextLeast.toString(),
        slack: slack.toString(), path: path + "O"});
    }
    if (slack < 0n) {
      violation = {t: nextT, D, q: nextLeast.toString(),
        slack: slack.toString(), path: path + "O"};
      return;
    }
    visit(nextT, nextA, nextB, nextL, nextResidue, spikes, 0, path + "O");
  }

  // Spike extension, with no three consecutive spikes.
  if (spikeRun < 2) {
    const nextA = 3n * A;
    const nextB = 3n * B + (1n << BigInt(L));
    const nextL = L + 2;
    const nextResidue = extendResidue(nextA, nextB, L, residue, 2);
    const nextLeast = leastPositive(nextResidue, nextL);
    const nextT = t + 1;
    const D = Math.floor(gamma * (nextT + 1)) - (spikes + 1);
    const boundary = D >= 0 ? (1n << BigInt(D)) - 2n : -1n;
    const slack = nextLeast - boundary;
    if (slack < 0n) {
      violation = {t: nextT, D, q: nextLeast.toString(),
        slack: slack.toString(), path: path + "S"};
      return;
    }
    visit(nextT, nextA, nextB, nextL, nextResidue,
      spikes + 1, spikeRun + 1, path + "S");
  }
}

visit(0, 1n, 0n, 0, 0n, 0, 0, "");
console.log(JSON.stringify({maxDepth, nodes, closest, violation}, null, 2));
if (violation !== null) process.exitCode = 1;
