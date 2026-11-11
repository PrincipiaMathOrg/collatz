#!/usr/bin/env node
"use strict";

/* Floating diagnostic on path-admissible 3+1 deformations. */
function gcd(a,b){while(b)[a,b]=[b,a%b];return Math.abs(a);}
const kappa=[12,9,8],patterns=[];for(let a=0;a<3;a++)for(let b=0;b<3;b++)patterns.push([a,b]);
function score(ell,c,e,A,p){
  const anchors=p.map(q=>q===0?0:q===1?ell:ell+1),t=[anchors[0]-c,anchors[1]-e];
  const lo=Math.min(0,...t),hi=Math.max(0,...t),span=hi-lo+1e-10;if(span>=2)return Infinity;
  const Q=Math.floor(span),delta=span-Q,raw=[A*kappa[p[0]],9*kappa[p[1]]];
  const g=gcd(gcd(108,raw[0]),raw[1]),co=raw.map(x=>x/g),f=108/g;
  let U=0;for(let i=0;i<2;i++){const x=t[i]-lo;for(const o of [0,1e-10]){const a=Q===0?co[i]:(x+o<1?8:9)*co[i];U+=a*a;}}
  const x=-lo,a=Q===0?f:(x+1e-10<1?8:9)*f;U+=a*a;
  return (delta*Math.log(8)+.5*Math.log(81*U/64))/(2*ell+1);
}
function runType(T){const z=[];let n=1;for(let i=1;i<T.length;i++){if(T[i]===T[i-1]+1)n++;else{z.push(n);n=1;}}z.push(n);return z.sort((a,b)=>b-a).join("+");}
function vpInt(x,p){x=Math.abs(x);let v=0;while(x&&x%p===0){x/=p;v++;}return v;}
function scoreL23(r,B,L,M,c,e){
  const s=c+B-e,t=c+B+1;
  const raw=[[B+1,1],[B,-1],[L+1,1],[L,-1],[1,1],[0,-1],[s+1,1],[s,-1],[t,-1]];
  const Q=Math.max(...raw.map(([j])=>Math.floor(j/L))),map=new Map();
  for(const [j,a] of raw){const q=Math.floor(j/L),u=j-q*L,v=a*4**q*3**(Q-q);map.set(u,(map.get(u)||0)+v);}
  for(const [j,a] of [...map])if(a===0)map.delete(j);
  let g=0;for(const a of map.values())g=gcd(g,a);for(const [j,a] of map)map.set(j,a/g);
  const deg=Math.max(...map.keys()),rho=(4/3)**(1/L);let U=0,V2=Infinity,V3=Infinity;
  for(const [j,a] of map){U+=a*a*rho**(2*j);V2=Math.min(V2,L*vpInt(a,2)+2*j);V3=Math.min(V3,L*vpInt(a,3)+deg-j);}
  return (deg*Math.log(3)+L/2*Math.log(U)-V2*Math.log(2)-V3*Math.log(3))/r;
}
const maxR=Number(process.argv[2]||500),minR=Number(process.argv[3]||100),target=Math.log(2.999);let count=0,close=0,worst={margin:Infinity},l23count=0,l23close=0,l23worst={margin:Infinity};const bins={};
for(let r=minR;r<=maxR;r++){
  const N=Math.ceil(Math.log2(3)*r-1e-12);if(gcd(N,r)!==1)continue;
  const B=N-r,L=r-B,M=B-L;if(M<=0)continue;const ell=L/M;
  for(let s=1;s+2<r;s++)for(let isolated=1;isolated<r;isolated++){
    if(isolated>=s&&isolated<=s+2||isolated===s-1||isolated===s+3)continue;
    const T=[s,s+1,s+2,isolated].sort((a,b)=>a-b);
    const levels=Array(r).fill(0);for(const t of T)levels[t]=1;
    const pos=levels.map((m,q)=>Math.floor(q*N/r)-m);let valid=pos[0]===0&&pos[r-1]<N;
    for(let q=1;q<r;q++)if(pos[q]<=pos[q-1])valid=false;if(!valid)continue;
    const c=s*N%r,e=isolated*N%r,g1=Math.floor((s+1)*N/r)-Math.floor(s*N/r),g2=Math.floor((s+2)*N/r)-Math.floor((s+1)*N/r);
    const A=g1===1&&g2===2?23:g1===2&&g2===1?29:0;if(!A)throw Error("bad triple");
    let best=Infinity,label="";for(const p of patterns){const v=score(ell,c/M,e/M,A,p);if(v<best){best=v;label=p.join("");}}
    const margin=target-best,key=`A${A}_${c<e?"ce":"ec"}`;bins[key]=(bins[key]||0)+1;count++;if(margin>0)close++;
    if(margin<worst.margin)worst={margin,r,N,T,c,e,A,label,best,ell};
    if(A===23&&e<c){const ls=scoreL23(r,B,L,M,c,e),lm=target-ls;l23count++;if(lm>0)l23close++;if(lm<l23worst.margin)l23worst={margin:lm,r,N,T,c,e,score:ls};}
  }
}
console.log(`max_r=${maxR} count=${count} close=${close} fraction=${close/count}`);
console.log("bins="+JSON.stringify(bins));console.log("worst="+JSON.stringify(worst));
console.log(`L23_count=${l23count} close=${l23close} fraction=${l23close/l23count} worst=${JSON.stringify(l23worst)}`);
