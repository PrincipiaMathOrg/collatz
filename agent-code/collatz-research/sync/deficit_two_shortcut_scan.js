"use strict";

// Shortcut-step implementation of deficit_two_scan.js.  No v_2 extraction is used.

function classify(seed, floorNumerator, floorDenominator, shortcutCap) {
  let x=BigInt(seed), pow2=1n, pow3=1n, acceleratedSteps=0;
  const seen=new Set();
  for(let shortcutSteps=0; shortcutSteps<=shortcutCap; ++shortcutSteps) {
    if(x===1n) return {status:"hit_1",shortcutSteps,acceleratedSteps};
    const key=x.toString();
    if(seen.has(key)) return {status:"cycle",shortcutSteps,acceleratedSteps};
    seen.add(key);
    if(shortcutSteps===shortcutCap) break;
    if((x&1n)===0n) { x>>=1n; pow2<<=1n; }
    else { x=(3n*x-1n)>>1n; pow2<<=1n; pow3*=3n; acceleratedSteps+=1; }
    if((x&1n)===1n && BigInt(floorNumerator)*pow2 >= BigInt(floorDenominator)*pow3) {
      return {status:"coefficient_floor_failure",shortcutSteps:shortcutSteps+1,acceleratedSteps};
    }
  }
  return {status:"step_cap",shortcutSteps:shortcutCap,acceleratedSteps};
}

function runCase(name,numerator,denominator,cap,shortcutCap){
  const counts=new Map(),hits=[];
  let longest={shortcutSteps:-1,acceleratedSteps:-1,seed:-1,status:""};
  for(let seed=1;seed<cap;seed+=2){
    const out=classify(seed,numerator,denominator,shortcutCap);
    counts.set(out.status,(counts.get(out.status)||0)+1);
    if(out.status==="hit_1")hits.push([seed,out.acceleratedSteps,out.shortcutSteps]);
    if(out.shortcutSteps>longest.shortcutSteps)longest={shortcutSteps:out.shortcutSteps,
      acceleratedSteps:out.acceleratedSteps,seed,status:out.status};
  }
  console.log(`case=${name} floor=${numerator}/${denominator} cap=${cap} shortcut_cap=${shortcutCap}`);
  console.log(`counts=${JSON.stringify(Object.fromEntries(counts))}`);
  console.log(`hits=${JSON.stringify(hits)}`);
  console.log(`longest=${JSON.stringify(longest)}`);
  console.log(`certificate_passed=${!counts.has("step_cap")}`);
}

runCase("prefix_1_1",4,9,398581,200000);
runCase("prefix_1_2",8,9,199291,200000);
