#!/usr/bin/env node
"use strict";

/* Diagnostic only.  For A=23, try each Euclidean binomial directly after
 * reducing every exponent.  This locates cells needing a changed anchor. */

function gcd(a,b){a=a<0n?-a:a;b=b<0n?-b:b;while(b)[a,b]=[b,a%b];return a;}
function vp(a,p){a=a<0n?-a:a;const P=BigInt(p);let n=0;while(a&&a%P===0n){a/=P;n++;}return n;}
function lnBig(a){a=a<0n?-a:a;const h=a.toString(16),k=Math.min(13,h.length);return Math.log(parseInt(h.slice(0,k),16))+(h.length-k)*4*Math.log(2);}
function logAdd(x,y){if(x===-Infinity)return y;if(y===-Infinity)return x;const m=Math.max(x,y);return m+Math.log(Math.exp(x-m)+Math.exp(y-m));}

function candidate(terms,n,A2,A3,B2,B3,actual=false){
  const d2=B2-A2,d3=B3-A3,raw=[];let min2=Infinity,min3=Infinity;
  for(const [coef,k] of terms){const q=Math.floor(k/n),j=k-q*n,v2=vp(BigInt(coef),2)+d2*q,v3=vp(BigInt(coef),3)+d3*q,odd=BigInt(coef)/(2n**BigInt(vp(BigInt(coef),2))*3n**BigInt(vp(BigInt(coef),3)));raw.push({j,v2,v3,odd});min2=Math.min(min2,v2);min3=Math.min(min3,v3);}
  const map=new Map();
  for(const x of raw){const c=x.odd*2n**BigInt(x.v2-min2)*3n**BigInt(x.v3-min3);map.set(x.j,(map.get(x.j)||0n)+c);}
  for(const [j,c] of [...map])if(c===0n)map.delete(j);
  const m=Math.max(...map.keys()),lnRatio=(B2-A2)*Math.log(2)+(B3-A3)*Math.log(3);
  let lnU=-Infinity,V2=Infinity,V3=Infinity;
  for(const [j,c] of map){lnU=logAdd(lnU,2*lnBig(c)+2*j/n*lnRatio);V2=Math.min(V2,n*vp(c,2)+j*(B2-A2)+m*A2);V3=Math.min(V3,n*vp(c,3)+j*(B3-A3)+m*A3);}
  const bound=m*(A2*Math.log(2)+A3*Math.log(3))+n/2*lnU-V2*Math.log(2)-V3*Math.log(3);
  if(process.argv.includes('coarse')){
    let plain=-Infinity;for(const c of map.values())plain=logAdd(plain,2*lnBig(c));
    return n*((A2*Math.log(2)+A3*Math.log(3))+.5*(plain+Math.max(0,2*lnRatio)));
  }
  if(!actual)return bound;
  const radius=Math.exp(lnRatio/n);let product=0;
  for(let k=0;k<n;k++){
    const theta=2*Math.PI*k/n;let re=0,im=0;
    for(const [j,c] of map){const amp=Number(c)*radius**j;re+=amp*Math.cos(theta*j);im+=amp*Math.sin(theta*j);}
    product+=Math.log(Math.hypot(re,im));
  }
  return m*(A2*Math.log(2)+A3*Math.log(3))+product-V2*Math.log(2)-V3*Math.log(3);
}

const r=Number(process.argv[2]||1000),step=Number(process.argv[3]||1),N=Math.ceil(Math.log2(3)*r-1e-12);
const B=N-r,L=r-B,M=B-L,E=L-2*M,F=M-2*E,G=E-3*F,H=F-G,I=G-5*H;
const rungs=[['M',M,3,0,0,2],['E',E,0,5,8,0],['F',F,19,0,0,12],['G',G,0,41,65,0]];
if(process.argv.includes('deep')&&H>0)rungs.push(['H',H,84,0,0,53]);
if(process.argv.includes('deep')&&I>0)rungs.push(['I',I,0,306,485,0]);
console.log({r,N,B,L,M,E,F,G,H,I,step});
for(const order of ['ce','ec']){
  let total=0,closed=0;const fail=[],labels=new Map(),boxes=new Map();
  for(let c=1;c<L;c+=step)for(let e=1;e<B;e+=step){
    if(c===e||(order==='ce'?c>=e:e>=c))continue;
    const h=Math.max(c,e),d=Math.abs(c-e),terms=order==='ce'?[[23,d+1],[-23,d],[9,1],[-9,0],[-9,h+1]]:[[23,1],[-23,0],[9,d+1],[-9,d],[-9,h+1]];
    const K=h<L?L:B,scale=h<L?1:2,constant=h<L?-12:-27;
    const topTerms=order==='ce'?[[scale*23,K-c],[-scale*23,K-c-1],[scale*9,K-e],[-scale*9,K-e-1],[constant,0]]:[[scale*23,K-c],[-scale*23,K-c-1],[scale*9,K-e],[-scale*9,K-e-1],[constant,0]];
    const mixedTerms=order==='ce'?[[23,1],[-23,0],[6,B-d+1],[-6,B-d],[-9,c+1]]:[[23,L-d+1],[-23,L-d],[12,1],[-12,0],[-12,e+1]];
    total++;let best=Infinity,bestName='';
    for(const [name,n,a2,a3,b2,b3] of rungs){if(n<=0)continue;for(const [tag,T] of [['',terms],['t',topTerms],['x',mixedTerms]]){const z=candidate(T,n,a2,a3,b2,b3,process.argv.includes('actual'));if(z<best){best=z;bestName=name+tag;}}}
    if(best<r*Math.log(2.99)){closed++;labels.set(bestName,(labels.get(bestName)||0)+1);const b=boxes.get(bestName)||{c0:c,c1:c,e0:e,e1:e,d0:d,d1:d};b.c0=Math.min(b.c0,c);b.c1=Math.max(b.c1,c);b.e0=Math.min(b.e0,e);b.e1=Math.max(b.e1,e);b.d0=Math.min(b.d0,d);b.d1=Math.max(b.d1,d);boxes.set(bestName,b);}else if(fail.length<30)fail.push({c,e,h,d,best,bestName,margin:best-r*Math.log(2.99)});
  }
  console.log(`A23_${order} total=${total} closed=${closed} fail=${total-closed} labels=${JSON.stringify(Object.fromEntries(labels))}`);
  if(process.argv.includes('boxes'))console.log(JSON.stringify(Object.fromEntries(boxes)));
  for(const x of fail)console.log(x);
}
