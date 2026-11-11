"use strict";

// Exact certificate probe for the 3/2-relaxed target-one language.
// Candidate condition after deleting the forced initial 1 from a strict barrier word:
//     2^A_k < (3/2) 3^k, i.e. 2^(A_k+1) < 3^(k+1).

function v2Big(n) {
  let a = 0;
  while ((n & 1n) === 0n) { n >>= 1n; a += 1; }
  return a;
}

function classify(seedNumber, stepCap) {
  let m = BigInt(seedNumber), pow2 = 1n, pow3 = 1n;
  const seen = new Set();
  for (let k = 0; k <= stepCap; ++k) {
    if (m === 1n) return {status: "hit_1", steps: k};
    const key = m.toString();
    if (seen.has(key)) return {status: "cycle", steps: k};
    seen.add(key);
    const z = 3n*m - 1n, a = v2Big(z);
    m = z >> BigInt(a);
    pow2 <<= BigInt(a);
    pow3 *= 3n;
    // strict 2^A < (3/2)*3^k
    if (2n*pow2 >= 3n*pow3) return {status: "relaxed_barrier_failure", steps: k+1};
  }
  return {status: "step_cap", steps: stepCap};
}

const cap = Number(process.argv[2] || 265721);
const stepCap = Number(process.argv[3] || 100000);
const counts = new Map();
const hits = [];
let longest = {steps: -1, seed: -1, status: ""};
for (let seed = 1; seed < cap; seed += 2) {
  const out = classify(seed, stepCap);
  counts.set(out.status, (counts.get(out.status)||0)+1);
  if (out.status === "hit_1") hits.push([seed, out.steps]);
  if (out.steps > longest.steps) longest = {steps: out.steps, seed, status: out.status};
}
console.log(`cap=${cap} step_cap=${stepCap}`);
console.log(`counts=${JSON.stringify(Object.fromEntries(counts))}`);
console.log(`hits=${JSON.stringify(hits)}`);
console.log(`longest=${JSON.stringify(longest)}`);
console.log(`certificate_passed=${!counts.has("step_cap")}`);
