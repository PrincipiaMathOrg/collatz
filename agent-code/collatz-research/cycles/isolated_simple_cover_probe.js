#!/usr/bin/env node
"use strict";

// Diagnostic cover using only the r-norm, all short M-degree anchors, and
// the proved (0,L,L) cell.  This is a probe, not a theorem certificate.

function gcd(a,b){while(b)[a,b]=[b,a%b];return Math.abs(a);}
function add(p,e,a){p.set(e,(p.get(e)||0)+a);if(!p.get(e))p.delete(e);}
function hCoefficients(c1,c2,c3){
  const a=c3-c1,b=c3-c2,h=new Map();
  for(const[e,v]of[[a+1,1],[a,-1],[b+1,1],[b,-1],[1,1],[0,-1],[c3+1,-1]])add(h,e,v);
  return h;
}
function rNormLog(r,c1,c2,c3){
  const h=hCoefficients(c1,c2,c3),rho2=Math.exp(2*Math.log(2)/r);
  let q=0;for(const[e,a]of h)q+=a*a*Math.pow(rho2,e);
  return r*Math.log(q)/2;
}
function label(q,L,B){return q===0?"0":q===L?"L":"B";}

const r=Number(process.argv[2]||151);
const N=Math.ceil(Math.log2(3)*r-1e-12),B=N-r,L=r-B,M=B-L;
const anchors=[0,L,B],k=q=>q===0?12:q===L?9:8;
const target=r*Math.log(374/125);
let total=0,rClosed=0,shortClosed=0,q0LLClosed=0,uncovered=0,first=null;

for(let c1=1;c1<B;c1++)for(let c2=c1+1;c2<B;c2++)for(let c3=c2+1;c3<B;c3++){
  if([c2-c1,c3-c2,c3-c1].includes(L))continue;
  total++;
  if(rNormLog(r,c1,c2,c3)<target){rClosed++;continue;}
  let short=null;
  for(const q1 of anchors)for(const q2 of anchors)for(const q3 of anchors){
    const es=[q1-c1,q2-c2,q3-c3];
    const width=Math.max(...es.map(x=>x+1),1)-Math.min(...es,1);
    if(width>=M)continue;
    const g=gcd(gcd(gcd(k(q1),k(q2)),k(q3)),12);
    const K=(2*(k(q1)+k(q2)+k(q3))+12)/g;
    if(M*Math.log(9*K)<target){short=[q1,q2,q3,width,K];break;}
  }
  if(short){shortClosed++;continue;}
  const h=Math.max(c1,c3-L),b=h+L-c2,m=Math.max(h,b)+1;
  if(4*m<7*M){q0LLClosed++;continue;}
  uncovered++;
  if(!first)first={c1,c2,c3,h,b,m};
}

console.log(JSON.stringify({r,N,B,L,M,total,rClosed,shortClosed,q0LLClosed,uncovered,first}));
