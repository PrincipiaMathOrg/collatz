#!/usr/bin/env node
"use strict";

/* INVALID / RETAINED ONLY AS A NEGATIVE DIAGNOSTIC.
 *
 * This early H=F-G=53N-84r ledger omits the additional quotient digit that
 * appears when a G-reduced exponent is reduced once more modulo H.  Its
 * apparent all-branch success is therefore not a certificate and MUST NOT be
 * cited.  The transition/factor-complexity argument supersedes this probe.
 */

function gcd(a,b){a=a<0n?-a:a;b=b<0n?-b:b;while(b)[a,b]=[b,a%b];return a;}
function pow(a,n){return BigInt(a)**BigInt(n);}
function descriptor(q,a,b,c){return{q,a,b,c,v2:-3*q+8*a-19*b+65*c,
  v3:2*q-5*a+12*b-41*c};}
const desc=[];
for(let q=0;q<=3;q++)for(let a=0;a<=2;a++)for(let b=0;b<=3;b++)for(let c=0;c<=1;c++)
  desc.push(descriptor(q,a,b,c));
const zero=descriptor(0,0,0,0);

const RHS=299n**1000n, SCALE=100n**1000n, THREE53=3n**53n;
function coefficient(A,special,d0,d1,df){
  const base=[3n,3n,3n];base[special]=BigInt(A);
  const dd=[d0,d1,zero,df];
  const ev=dd.map((d,i)=>({e2:d.v2,e3:d.v3+(i<3&&base[i]===3n||i===3?1:0),
    unit:i<3&&base[i]!==3n?base[i]:1n}));
  const m2=Math.min(...ev.map(x=>x.e2)),m3=Math.min(...ev.map(x=>x.e3));
  const co=ev.map(x=>x.unit*pow(2,x.e2-m2)*pow(3,x.e3-m3));
  const L=2n*(co[0]+co[1]+co[2])+co[3],K=THREE53*L;
  return{ok:K**4n*SCALE<RHS,L,K,co};
}

for(const A of[5,7])for(let special=0;special<3;special++){
  let total=0,bad=0,worst={L:0n};
  for(const d0 of desc)for(const d1 of desc)for(const df of desc){
    const z=coefficient(A,special,d0,d1,df);total++;
    if(!z.ok)bad++;
    if(z.L>worst.L)worst={L:z.L,d0,d1,df,co:z.co};
  }
  console.log("A="+A+" special="+special+" total="+total+" bad="+bad+
    " worstL="+worst.L+" worst="+JSON.stringify(worst,(k,v)=>typeof v==="bigint"?v.toString():v));
}
