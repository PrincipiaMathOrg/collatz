#!/usr/bin/env node
"use strict";

// Heuristic counterexample search for the named no-SSS strengthening:
//   q + 2 >= 2^(floor(gamma*(t+1)) - V_t).
// This is not a certificate.  It keeps the cylinders with smallest q*2^V.

const maxDepth = Number(process.argv[2] || 300);
const beamWidth = Number(process.argv[3] || 50000);

function bitLength(n) {
  return n === 0n ? 0 : n.toString(2).length;
}

function scoreKey(node) {
  const x = node.q << BigInt(node.spikes);
  const bits = bitLength(x);
  const shift = Math.max(0, bits - 53);
  return [bits, Number(x >> BigInt(shift)) / 2 ** Math.min(53, bits)];
}

function compareNodes(a, b) {
  if (a.scoreBits !== b.scoreBits) return a.scoreBits - b.scoreBits;
  if (a.scoreMantissa !== b.scoreMantissa) {
    return a.scoreMantissa - b.scoreMantissa;
  }
  if (a.spikes !== b.spikes) return a.spikes - b.spikes;
  return a.q < b.q ? -1 : a.q > b.q ? 1 : 0;
}

let states = [{q: 1n, z: 1n, modulus: 1n, spikes: 0, run: 0,
  path: ""}];
let A = 1n;

for (let t = 1; t <= maxDepth; ++t) {
  const next = [];
  for (const node of states) {
    // Ordinary lift: A is odd, so exactly one of j=0,1 makes the state even.
    const jo = Number(node.z & 1n);
    const zo = node.z + BigInt(jo) * A;
    const qo = node.q + BigInt(jo) * node.modulus;
    next.push({q: qo, z: 3n * zo / 2n, modulus: 2n * node.modulus,
      spikes: node.spikes, run: 0, path: node.path + "O"});

    if (node.run < 2) {
      // Spike lift: exactly one j=0,1,2,3 gives z+A*j == 1 (mod 4).
      let js = 0;
      while (((node.z + BigInt(js) * A) & 3n) !== 1n) ++js;
      const zs = node.z + BigInt(js) * A;
      const qs = node.q + BigInt(js) * node.modulus;
      next.push({q: qs, z: (3n * zs + 1n) / 4n,
        modulus: 4n * node.modulus, spikes: node.spikes + 1,
        run: node.run + 1, path: node.path + "S"});
    }
  }
  A *= 3n;

  const r = t + 1;
  const e = bitLength(3n ** BigInt(r) - 1n) - r;
  let violation = null;
  let closest = null;
  for (const node of next) {
    const U = e - 1 - node.spikes;
    if (U < 1) continue;
    const boundary = (1n << BigInt(U)) - 2n;
    const gap = node.q - boundary;
    if (closest === null || gap < closest.gap) {
      closest = {q: node.q, z: node.z, U, V: node.spikes, gap,
        path: node.path};
    }
    if (gap < 0n) {
      violation = closest;
      break;
    }
  }
  if (violation !== null) {
    console.log(JSON.stringify({t, violation}, (_, value) =>
      typeof value === "bigint" ? value.toString() : value));
    process.exit(1);
  }

  for (const node of next) {
    const [scoreBits, scoreMantissa] = scoreKey(node);
    node.scoreBits = scoreBits;
    node.scoreMantissa = scoreMantissa;
  }
  next.sort(compareNodes);
  states = next.slice(0, beamWidth);
  if (t <= 25 || t % 25 === 0) {
    console.log(JSON.stringify({t, candidates: next.length,
      retained: states.length,
      closest: closest === null ? null : {
        q: closest.q.toString(), U: closest.U, V: closest.V,
        gap: closest.gap.toString(), path: closest.path,
      }}));
  }
}
