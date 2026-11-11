#!/usr/bin/env node
"use strict";

// Adversarial regression for the located high-energy rows in the (0,L,L)
// upper strip.  This checks locations as well as coefficient signatures.

function add(p,e,a){p.set(e,(p.get(e)||0n)+a);if(p.get(e)===0n)p.delete(e);}
function q0LL(c1,c2,c3,L){
  const h=Math.max(c1,c3-L),a=h-c1,b=h+L-c2,c=h+L-c3;
  const P=new Map();
  for(const[e,k]of[[a,4n],[b,3n],[c,3n]]){add(P,e+1,k);add(P,e,-k);}
  add(P,h+1,-4n);return P;
}
function fold(P,M){
  const m=Math.max(...P.keys()),Q=Math.floor(m/M),d=m-Q*M,W=new Map();
  for(const[e,a]of P){const q=Math.floor(e/M),s=e-q*M;add(W,s,a*9n**BigInt(q)*8n**BigInt(Q-q));}
  let U=0n;for(const a of W.values())U+=a*a;return{m,Q,d,W,U};
}
const signatures=new Set([
  "-95,-27,27,59","-87,-32,32,51","-63,-59,27,59",
  "-83,-32,32,51","-59,-59,27,59","-60,-59,24,59"]);
function signature(W){return[...W.values()].map(Number).sort((a,b)=>a-b).join(",");}

const dimensions=[[101,60,41,19],[151,89,62,27],[251,147,104,43],[503,295,208,87]];
let occurrences=0;
for(const[r,B,L,M]of dimensions){
  let local=0;
  for(let c1=1;c1<B;c1++)for(let c2=c1+1;c2<B;c2++)for(let c3=c2+1;c3<B;c3++){
    if([c2-c1,c3-c2,c3-c1].includes(L))continue;
    const F=fold(q0LL(c1,c2,c3,L),M);
    if(F.Q!==1||4*F.d>=3*M||100*F.d<=73*M||F.U<=11000n)continue;
    const sig=signature(F.W);
    if(!signatures.has(sig))throw new Error(`new signature r${r} ${c1},${c2},${c3}: ${sig}`);
    const support=[...F.W.keys()].sort((a,b)=>a-b);
    const expectedA=[0,1,F.d-1,F.d].filter((x,i,a)=>i===0||x!==a[i-1]);
    const expectedB=[0,1,F.d,F.d+1].filter((x,i,a)=>i===0||x!==a[i-1]);
    if(support.join(",")!==expectedA.join(",")&&support.join(",")!==expectedB.join(","))
      throw new Error(`bad support r${r} ${c1},${c2},${c3}: d=${F.d}; ${support}`);
    local++;occurrences++;
  }
  console.log(`r${r}_located_high_energy_occurrences=${local}`);
}
console.log(`located_high_energy_occurrences_total=${occurrences}`);
console.log(`exceptional_signature_count=${signatures.size}`);
console.log("q0ll_upper_table_adversarial_passed=true");
