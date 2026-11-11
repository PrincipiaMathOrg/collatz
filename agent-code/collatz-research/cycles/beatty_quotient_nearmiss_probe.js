#!/usr/bin/env node
"use strict";

function v2(n) {
  let v = 0;
  while (n > 0n && (n & 1n) === 0n) {
    ++v;
    n >>= 1n;
  }
  return v;
}

const maxR = Number(process.argv[2] || 32);
let global = null;

for (let r = 3; r <= maxR; ++r) {
  const N = (3n ** BigInt(r) - 1n).toString(2).length;
  const e = N - r;
  const K = new Set();
  for (let l = 1; l < e; ++l) K.add(Math.floor(l * r / e));
  const limit = 1n << BigInt(e - 1);
  let valid = 0;
  let best = null;

  for (let q = 1n; q < limit; ++q) {
    let z = q;
    let spikes = 0;
    let ok = true;
    const spikeDegrees = [];
    for (let d = r - 1; d >= 1; --d) {
      if ((z & 1n) === 0n) {
        z = 3n * z / 2n;
      } else if ((z & 3n) === 1n && K.has(d)) {
        spikeDegrees.push(d);
        ++spikes;
        z = (3n * z + 1n) / 4n;
      } else {
        ok = false;
        break;
      }
    }
    if (!ok) continue;
    ++valid;
    const U = e - 1 - spikes;
    const w = v2(3n * z - 1n);
    const deficit = U + 1 - w;
    const row = {r,N,e,q,z0:z,spikes,U,w,deficit,spikeDegrees};
    if (best === null || deficit < best.deficit ||
        (deficit === best.deficit && q < best.q)) best = row;
  }
  if (best !== null && (global === null || best.deficit < global.deficit ||
      (best.deficit === global.deficit && best.q < global.q))) global = best;
  console.log(JSON.stringify({r,N,e,valid,best}, (_,x) =>
    typeof x === "bigint" ? x.toString() : x));
}

console.log("global=" + JSON.stringify(global, (_,x) =>
  typeof x === "bigint" ? x.toString() : x, 2));
