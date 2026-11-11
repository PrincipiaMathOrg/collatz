#!/usr/bin/env node
"use strict";

// Exact search for a valid n-step path of the partial map
// F(2k)=3k, F(4k+1)=3k+1 whose starting residue q satisfies
//     2q <= 3^n / 2^(n+V).
// Such a path is a necessary precursor to an excursion beyond 2q^2.

function extendResidue(A, B, L, residue, extra) {
  const oldModulus = 1n << BigInt(L);
  const choices = 1n << BigInt(extra);
  const newModulus = oldModulus * choices;
  for (let j = 0n; j < choices; ++j) {
    const candidate = residue + j * oldModulus;
    if ((A*candidate+B)%newModulus===0n) return candidate;
  }
  throw new Error("unique lift failure");
}

const maxN=Number(process.argv[2]||150);
const minN=Number(process.argv[3]||1);
for(let n=minN;n<=maxN;++n){
  const numerator=3n**BigInt(n);
  let nodes=0, leaves=0, violation=null;
  const least=(r,L)=>r===0n?(1n<<BigInt(L)):r;
  function visit(d,A,B,L,residue,V,path){
    ++nodes;
    const q=least(residue,L);
    if((q<<BigInt(n+V+1))>numerator)return;
    if(d===0){
      ++leaves;
      violation={n,q:q.toString(),V,path:path.slice()};
      return;
    }
    let nA=3n*A,nB=3n*B,nL=L+1;
    let nR=extendResidue(nA,nB,L,residue,1);
    path.push(1);visit(d-1,nA,nB,nL,nR,V,path);path.pop();
    if(violation)return;
    nA=3n*A;nB=3n*B+(1n<<BigInt(L));nL=L+2;
    nR=extendResidue(nA,nB,L,residue,2);
    path.push(2);visit(d-1,nA,nB,nL,nR,V+1,path);path.pop();
  }
  visit(n,1n,0n,0,0n,0,[]);
  console.log(JSON.stringify({n,nodes,leaves,violation}));
  if(violation){process.exitCode=1;break;}
}
