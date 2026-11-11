"use strict";

// Shortcut-step implementation of deficit_three_scan.js; no v_2 extraction.

function classify(seed,p,q,shortcutCap){
  let x=BigInt(seed),p2=1n,p3=1n,acceleratedSteps=0;const seen=new Set(),word=[];
  let currentExponent=0;
  for(let shortcutSteps=0;shortcutSteps<=shortcutCap;shortcutSteps++){
    if(x===1n)return{status:"hit_1",shortcutSteps,acceleratedSteps,word};
    const key=x.toString();if(seen.has(key))return{status:"cycle",shortcutSteps,acceleratedSteps};seen.add(key);
    if(shortcutSteps===shortcutCap)break;
    if((x&1n)===1n){x=(3n*x-1n)>>1n;p2<<=1n;p3*=3n;acceleratedSteps++;currentExponent=1;}
    else{x>>=1n;p2<<=1n;currentExponent++;}
    if((x&1n)===1n){word.push(currentExponent);currentExponent=0;
      if(BigInt(p)*p2>=BigInt(q)*p3)return{status:"coefficient_floor_failure",
        shortcutSteps:shortcutSteps+1,acceleratedSteps};}
  }return{status:"step_cap",shortcutSteps:shortcutCap,acceleratedSteps};
}
function runCase(name,p,q,seedCap,shortcutCap){
  const counts={},hits=[];let longest={shortcutSteps:-1,acceleratedSteps:-1,seed:-1,status:""};
  for(let seed=1;seed<seedCap;seed+=2){const o=classify(seed,p,q,shortcutCap);
    counts[o.status]=(counts[o.status]||0)+1;
    if(o.status==="hit_1")hits.push([seed,o.acceleratedSteps,o.shortcutSteps,o.word]);
    if(o.shortcutSteps>longest.shortcutSteps)longest={shortcutSteps:o.shortcutSteps,
      acceleratedSteps:o.acceleratedSteps,seed,status:o.status};}
  console.log(`case=${name} floor=${p}/${q} cap=${seedCap} shortcut_cap=${shortcutCap}`);
  console.log(`counts=${JSON.stringify(counts)}`);console.log(`hits=${JSON.stringify(hits)}`);
  console.log(`longest=${JSON.stringify(longest)}`);console.log(`certificate_passed=${!counts.step_cap}`);
}
runCase("prefix_1_1_1",8,27,597872,200000);
runCase("prefix_A4",16,27,298936,200000);
