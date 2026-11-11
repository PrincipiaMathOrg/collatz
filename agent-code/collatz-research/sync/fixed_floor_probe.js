"use strict";

// Exploratory accelerated scan for a rational coefficient floor p/q.
// Usage: node fixed_floor_probe.js p q cap [stepCap]

function v2(n){let a=0;while((n&1n)===0n){n>>=1n;a++;}return a;}
function classify(seed,p,q,cap){
  let m=BigInt(seed),p2=1n,p3=1n;const seen=new Set(),word=[];
  for(let k=0;k<=cap;k++){
    if(m===1n)return{status:"hit",steps:k,word};
    const key=m.toString();if(seen.has(key))return{status:"cycle",steps:k};seen.add(key);
    const z=3n*m-1n,a=v2(z);word.push(a);m=z>>BigInt(a);p2<<=BigInt(a);p3*=3n;
    if(BigInt(p)*p2>=BigInt(q)*p3)return{status:"fail",steps:k+1};
  }return{status:"cap",steps:cap};
}
const p=Number(process.argv[2]),q=Number(process.argv[3]),seedCap=Number(process.argv[4]);
const stepCap=Number(process.argv[5]||100000),counts={},hits=[];let longest={steps:-1,seed:-1,status:""};
for(let seed=1;seed<seedCap;seed+=2){const o=classify(seed,p,q,stepCap);counts[o.status]=(counts[o.status]||0)+1;
if(o.status==="hit")hits.push({seed,steps:o.steps,word:o.word});if(o.steps>longest.steps)longest={steps:o.steps,seed,status:o.status};}
console.log(JSON.stringify({floor:`${p}/${q}`,seedCap,stepCap,counts,hits,longest},null,2));
