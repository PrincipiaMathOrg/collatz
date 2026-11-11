"use strict";

// Independent shortcut-step checker for the 3/2-relaxed target-one language.
// Unlike relaxed_barrier_scan.js, this code never extracts v_2(3m-1); it executes
// every division-by-two shortcut separately and checks the relaxed barrier whenever
// the next accelerated odd state has been reached.

function classify(seedNumber, shortcutCap) {
  let x = BigInt(seedNumber);
  let pow2 = 1n;
  let pow3 = 1n;
  let acceleratedSteps = 0;
  const seen = new Set();

  for (let shortcutSteps = 0; shortcutSteps <= shortcutCap; ++shortcutSteps) {
    if (x === 1n) {
      return {status: "hit_1", shortcutSteps, acceleratedSteps};
    }
    const key = x.toString();
    if (seen.has(key)) {
      return {status: "cycle", shortcutSteps, acceleratedSteps};
    }
    seen.add(key);
    if (shortcutSteps === shortcutCap) break;

    if ((x & 1n) === 0n) {
      x >>= 1n;
      pow2 <<= 1n;
    } else {
      x = (3n*x - 1n) >> 1n;
      pow2 <<= 1n;
      pow3 *= 3n;
      acceleratedSteps += 1;
    }

    // An accelerated step ends at the next odd state.  The exact relaxed condition is
    // 2^A < (3/2)3^k, equivalently 2*2^A < 3*3^k.
    if ((x & 1n) === 1n && 2n*pow2 >= 3n*pow3) {
      return {status: "relaxed_barrier_failure", shortcutSteps: shortcutSteps+1,
              acceleratedSteps};
    }
  }
  return {status: "step_cap", shortcutSteps: shortcutCap, acceleratedSteps};
}

const cap = Number(process.argv[2] || 265721);
const shortcutCap = Number(process.argv[3] || 200000);
const counts = new Map();
const hits = [];
let longest = {shortcutSteps: -1, acceleratedSteps: -1, seed: -1, status: ""};
for (let seed = 1; seed < cap; seed += 2) {
  const out = classify(seed, shortcutCap);
  counts.set(out.status, (counts.get(out.status)||0)+1);
  if (out.status === "hit_1") hits.push([seed, out.acceleratedSteps, out.shortcutSteps]);
  if (out.shortcutSteps > longest.shortcutSteps) {
    longest = {shortcutSteps: out.shortcutSteps, acceleratedSteps: out.acceleratedSteps,
               seed, status: out.status};
  }
}
console.log(`cap=${cap} shortcut_cap=${shortcutCap}`);
console.log(`counts=${JSON.stringify(Object.fromEntries(counts))}`);
console.log(`hits=${JSON.stringify(hits)}`);
console.log(`longest=${JSON.stringify(longest)}`);
console.log(`certificate_passed=${!counts.has("step_cap")}`);
