"use strict";

// Accelerated exact scans for the two length-two strict barrier prefixes.
// u=(1,1): suffix floor 3^k/2^A > 4/9 and seed cap 398581.
// u=(1,2): suffix floor 3^k/2^A > 8/9 and seed cap 199291.

function v2(n) {
  let a = 0;
  while ((n & 1n) === 0n) { n >>= 1n; a += 1; }
  return a;
}

function classify(seed, floorNumerator, floorDenominator, stepCap) {
  let m = BigInt(seed), pow2 = 1n, pow3 = 1n;
  const seen = new Set();
  for (let k = 0; k <= stepCap; ++k) {
    if (m === 1n) return {status:"hit_1", steps:k};
    const key = m.toString();
    if (seen.has(key)) return {status:"cycle", steps:k};
    seen.add(key);
    const z = 3n*m-1n, a=v2(z);
    m = z >> BigInt(a);
    pow2 <<= BigInt(a); pow3 *= 3n;
    if (BigInt(floorNumerator)*pow2 >= BigInt(floorDenominator)*pow3) {
      return {status:"coefficient_floor_failure", steps:k+1};
    }
  }
  return {status:"step_cap", steps:stepCap};
}

function runCase(name, numerator, denominator, cap, stepCap) {
  const counts = new Map(), hits=[];
  let longest={steps:-1,seed:-1,status:""};
  for (let seed=1; seed<cap; seed+=2) {
    const out=classify(seed,numerator,denominator,stepCap);
    counts.set(out.status,(counts.get(out.status)||0)+1);
    if(out.status==="hit_1") hits.push([seed,out.steps]);
    if(out.steps>longest.steps) longest={steps:out.steps,seed,status:out.status};
  }
  console.log(`case=${name} floor=${numerator}/${denominator} cap=${cap} step_cap=${stepCap}`);
  console.log(`counts=${JSON.stringify(Object.fromEntries(counts))}`);
  console.log(`hits=${JSON.stringify(hits)}`);
  console.log(`longest=${JSON.stringify(longest)}`);
  console.log(`certificate_passed=${!counts.has("step_cap")}`);
}

runCase("prefix_1_1",4,9,398581,100000);
runCase("prefix_1_2",8,9,199291,100000);
