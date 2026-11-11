"use strict";

// Accelerated exact coefficient-floor scans for deficit three.
// Prefix 111 has A=3 and floor 8/27; prefixes 112,121 have A=4 and floor 16/27.

function v2(n){let a=0;while((n&1n)===0n){n>>=1n;a++;}return a;}
function classify(seed,p,q,stepCap){
  let m=BigInt(seed),p2=1n,p3=1n;const seen=new Set(),word=[];
  for(let k=0;k<=stepCap;k++){
    if(m===1n)return{status:"hit_1",steps:k,word};
    const key=m.toString();if(seen.has(key))return{status:"cycle",steps:k};seen.add(key);
    const z=3n*m-1n,a=v2(z);word.push(a);m=z>>BigInt(a);p2<<=BigInt(a);p3*=3n;
    if(BigInt(p)*p2>=BigInt(q)*p3)return{status:"coefficient_floor_failure",steps:k+1};
  }return{status:"step_cap",steps:stepCap};
}
function runCase(name,p,q,seedCap,stepCap){
  const counts={},hits=[];let longest={steps:-1,seed:-1,status:""};
  for(let seed=1;seed<seedCap;seed+=2){const o=classify(seed,p,q,stepCap);
    counts[o.status]=(counts[o.status]||0)+1;
    if(o.status==="hit_1")hits.push([seed,o.steps,o.word]);
    if(o.steps>longest.steps)longest={steps:o.steps,seed,status:o.status};}
  console.log(`case=${name} floor=${p}/${q} cap=${seedCap} step_cap=${stepCap}`);
  console.log(`counts=${JSON.stringify(counts)}`);console.log(`hits=${JSON.stringify(hits)}`);
  console.log(`longest=${JSON.stringify(longest)}`);console.log(`certificate_passed=${!counts.step_cap}`);
}
runCase("prefix_1_1_1",8,27,597872,100000);
runCase("prefix_A4",16,27,298936,100000);
