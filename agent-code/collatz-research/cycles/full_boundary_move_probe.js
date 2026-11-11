#!/usr/bin/env node
"use strict";

/*
Exact edge audit for the strict-record prefix-position lattice.

For fixed (r,A), an internal unit move A_i -> A_i+1 changes the carry by
u=3^(r-1-i)2^A_i.  If

  L=[u R^-1]_M,             K=(R L-u)/M,
  V=L-K=(D L+u)/M,

then rho'=[rho-L]_M, Z'=Z-K+chi R, and

  delta'=delta-V+chi D,      chi=1_{rho<L}=1_{Z<K}.

This program tests the synchronized two-boundary wrap cocycle and looks
for a monotonicity or no-crossing law.
Finite output is not a proof.
*/

const maxR = Number(process.argv[2] || 15);
const alpha = Math.log2(3);

function mod(a,m){a%=m;return a<0n?a+m:a;}
function egcd(a,b){if(!b)return {g:a,x:1n,y:0n};const z=egcd(b,a%b);return {g:z.g,x:z.y,y:z.x-(a/b)*z.y};}
function inv(a,m){const z=egcd(mod(a,m),m);if(z.g!==1n)throw new Error("nonunit");return mod(z.x,m);}

function carryFromPositions(pos,r){
  let C=0n;
  for(let i=0;i<r;++i)C+=3n**BigInt(r-1-i)*(1n<<BigInt(pos[i]));
  return C;
}

function boundary(C,R,M,invR){
  const rho=mod(-C*invR,M);
  const Z=(R*rho+C)/M;
  if((R*rho+C)%M!==0n||!(0n<Z&&Z<R))throw new Error("boundary failure");
  return {rho,Z,delta:rho-Z};
}

const rows=[];
let globalFirstDecrease=null,globalLargestDrop=null;

for(let r=3;r<=maxR;++r){
  const A=Math.ceil(r*alpha-1e-12);
  const M=1n<<BigInt(A),R=3n**BigInt(r),D=M-R,invR=inv(R,M);
  const bound=Array(r).fill(0);
  for(let i=1;i<r;++i)bound[i]=A-Math.ceil((r-i)*alpha-1e-12);

  let vertices=0,edges=0,deltaIncrease=0,deltaEqual=0,deltaDecrease=0;
  let chi0=0,chi1=0;
  let signCross=0,deltaOutsideReduced=0,wrapLawFailures=0,minDelta=null,maxDelta=null,minMargin=null;
  let largestDrop=null,largestRise=null,firstDecrease=null;

  const pos=Array(r).fill(0); pos[0]=0; pos[1]=1;
  function visit(i){
    if(i===r){
      ++vertices;
      const C=carryFromPositions(pos,r),b=boundary(C,R,M,invR);
      if(b.delta<=0n)throw new Error(`nonpositive strict vertex r=${r} pos=${pos}`);
      if(b.delta>=D)++deltaOutsideReduced;
      if(minDelta===null||b.delta<minDelta)minDelta=b.delta;
      if(maxDelta===null||b.delta>maxDelta)maxDelta=b.delta;

      for(let j=2;j<r;++j){
        if(pos[j]+1>=pos[j+1]&&j+1<r)continue;
        if(pos[j]+1>bound[j])continue;
        const u=3n**BigInt(r-1-j)*(1n<<BigInt(pos[j]));
        const L=mod(u*invR,M);
        const kNumerator=R*L-u;
        if(kNumerator%M!==0n)throw new Error("K integrality failure");
        const K=kNumerator/M,V=L-K;
        if(!(0n<K&&K<R&&0n<V&&V<D))throw new Error("move range failure");
        const chi=b.rho<L?1:0;
        if(chi!==(b.Z<K?1:0))throw new Error("boundary wrap synchronization failure");
        if(chi!==(b.delta<V?1:0))++wrapLawFailures;
        const rho2=b.rho-L+BigInt(chi)*M;
        const Z2=b.Z-K+BigInt(chi)*R;
        const delta2=rho2-Z2;
        const pos2=pos.slice();pos2[j]++;
        const C2=C+u,b2=boundary(C2,R,M,invR);
        if(rho2!==b2.rho||Z2!==b2.Z||delta2!==b2.delta)
          throw new Error("edge cocycle failure");
        ++edges;
        if(chi===0)++chi0;else ++chi1;
        const change=delta2-b.delta;
        if(change>0n)++deltaIncrease;
        else if(change<0n){
          ++deltaDecrease;
          const witness={r,j,pos:pos.join("."),next:pos2.join("."),delta:b.delta.toString(),delta2:delta2.toString(),change:change.toString(),L:L.toString(),K:K.toString(),V:V.toString(),chi};
          if(firstDecrease===null)firstDecrease=witness;
          if(globalFirstDecrease===null)globalFirstDecrease=witness;
          if(largestDrop===null||change<BigInt(largestDrop.change))largestDrop=witness;
          if(globalLargestDrop===null||change<BigInt(globalLargestDrop.change))globalLargestDrop=witness;
        } else ++deltaEqual;
        if(largestRise===null||change>BigInt(largestRise.change))
          largestRise={r,j,pos:pos.join("."),change:change.toString(),chi};
        if(b.delta>0n&&delta2<=0n)++signCross;
        const margin=b.delta<delta2?b.delta:delta2;
        if(minMargin===null||margin<minMargin)minMargin=margin;
      }
      return;
    }
    const lo=pos[i-1]+1,hi=bound[i];
    for(let v=lo;v<=hi;++v){pos[i]=v;visit(i+1);}
  }
  visit(2);
  rows.push({r,A,vertices,edges,deltaIncrease,deltaEqual,deltaDecrease,signCross,deltaOutsideReduced,wrapLawFailures,
    wraps:{chi0,chi1},
    deltaRange:[minDelta.toString(),maxDelta.toString()],minEdgeMargin:minMargin&&minMargin.toString(),
    firstDecrease,largestDrop,largestRise});
}

console.log(JSON.stringify({target:"OPEN-CYCLE-WIND-01",rows,globalFirstDecrease,globalLargestDrop,
  warning:"finite edge audit only"},null,2));
