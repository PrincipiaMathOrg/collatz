#!/usr/bin/env node
"use strict";

const maxQ = Number(process.argv[2] || 1000000);
let best = null;
for (let q0 = 1; q0 <= maxQ; ++q0) {
  let q = BigInt(q0);
  let max = q;
  let n = 0;
  let v = 0;
  const seen = new Set();
  while (n < 100000) {
    const key = q.toString();
    if (seen.has(key)) break;
    seen.add(key);
    if ((q & 1n) === 0n) q = 3n*q/2n;
    else if ((q & 3n) === 1n) { q = (3n*q+1n)/4n; ++v; }
    else break;
    ++n;
    if (q > max) max = q;
  }
  const den = BigInt(q0)*BigInt(q0);
  if (best === null || max*best.den > best.max*den) {
    best = {q0, max, den, n, v, terminal:q};
  }
}
console.log(JSON.stringify(best, (_,v) => typeof v === "bigint" ? v.toString() : v));
