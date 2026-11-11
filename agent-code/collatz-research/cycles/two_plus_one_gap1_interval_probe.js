#!/usr/bin/env node
"use strict";

// Floating interval probe for the last exactly-three sector:
// (z-1)(5z^-c+3z^-e)=3z, 0<c<e<B, c<L.

const ell0=829/342,ell1=5/2,eps=1e-10,target=Math.log(374/125);
const rootWeight=81/64,maxDepth=Number(process.argv[2]||44);
const minWidth=Number(process.argv[3]||5e-5),deltaGrid=Number(process.argv[4]||100);
const patterns=[];for(let a=0;a<=2;++a)for(let b=a;b<=2;++b)patterns.push([a,b]);
const k=[12,9,8];
function gcd(a,b){while(b)[a,b]=[b,a%b];return Math.abs(a);}
function addI(a,b){return[a[0]+b[0],a[1]+b[1]];}
function subI(a,b){return[a[0]-b[1],a[1]-b[0]];}
function anchorI(q,l){return q===0?[0,0]:q===1?l:[l[0]+1,l[1]+1];}
function containsInteger(i){return Math.ceil(i[0]-2e-13)<=Math.floor(i[1]+2e-13);}
function feasible(B){
  const lo=B.y[0][0]+B.y[1][0];
  return lo<=B.ell[1]+1&&B.y[0][0]<B.ell[1];
}
function bound(B,p){
  const cum=[B.y[0],addI(B.y[0],B.y[1])];
  const t=p.map((q,i)=>subI(anchorI(q,B.ell),cum[i]));
  const lo=[Math.min(0,...t.map(v=>v[0])),Math.min(0,...t.map(v=>v[1]))];
  const hi=[Math.max(0,...t.map(v=>v[0])),Math.max(0,...t.map(v=>v[1]))];
  const span=[hi[0]-lo[1],hi[1]-lo[0]];
  if(span[1]+eps>=2)return null;
  let g=gcd(gcd(36,5*k[p[0]]),3*k[p[1]]);
  const coeff=[5*k[p[0]]/g,3*k[p[1]]/g],f=36/g;
  const qs=[];if(span[0]<1)qs.push(0);if(span[1]+eps>=1)qs.push(1);
  let worst=-Infinity,data=[];
  for(const Q of qs){
    const delta=Math.max(0,span[1]+eps-Q);
    const rounded=Math.ceil((delta-1e-14)*deltaGrid)/deltaGrid;
    const terms=[];
    for(let i=0;i<2;++i){
      const base=[t[i][0]-lo[1],t[i][1]-lo[0]];
      terms.push({raw:t[i],pos:[base[0],base[1]+eps],a:coeff[i],sign:1});
      terms.push({raw:t[i],pos:base,a:coeff[i],sign:-1});
    }
    terms.push({final:true,pos:[-lo[1],eps-lo[0]],a:f,sign:-1});
    const amp=terms.map(v=>Q===0?v.a:(v.pos[1]<1?8*v.a:9*v.a));
    let U=amp.reduce((s,a)=>s+a*a,0);
    for(let i=0;i<terms.length;++i)for(let j=i+1;j<terms.length;++j){
      if(terms[i].sign!==terms[j].sign)continue;
      const diff=terms[j].final?[terms[i].raw[0]-eps,terms[i].raw[1]]:subI(terms[i].raw,terms[j].raw);
      if(containsInteger(diff))U+=2*amp[i]*amp[j];
    }
    const log=(171/1000)*(rounded*Math.log(8)+.5*Math.log(rootWeight*U));
    worst=Math.max(worst,log);data.push({Q,delta,rounded,U,log});
  }
  return{log:worst,p:p.join(""),data,span};
}
function certify(B){for(const p of patterns){const x=bound(B,p);if(x&&x.log<target-2e-12)return x;}return null;}
const stack=[{ell:[ell0,ell1],y:[[0,3.5],[0,3.5]],depth:0}],residual=[];
let visited=0,discarded=0,certified=0,maxStack=1,maxDepthSeen=0;
const labels=new Map();
while(stack.length){
  const B=stack.pop();visited++;maxDepthSeen=Math.max(maxDepthSeen,B.depth);
  if(!feasible(B)){discarded++;continue;}
  const cert=certify(B);
  if(cert){certified++;labels.set(cert.p,(labels.get(cert.p)||0)+1);continue;}
  const dims=[...B.y.map((v,i)=>({kind:"y",i,w:v[1]-v[0]})),{kind:"ell",i:0,w:4*(B.ell[1]-B.ell[0])}].sort((a,b)=>b.w-a.w);
  const d=dims[0];if(B.depth>=maxDepth||d.w<minWidth){residual.push(B);continue;}
  if(d.kind==="ell"){
    const m=(B.ell[0]+B.ell[1])/2;
    stack.push({...B,ell:[B.ell[0],m],depth:B.depth+1},{...B,ell:[m,B.ell[1]],depth:B.depth+1});
  }else{
    const old=B.y[d.i],m=(old[0]+old[1])/2;
    for(const v of [[old[0],m],[m,old[1]]]){const y=B.y.map(x=>[...x]);y[d.i]=v;stack.push({...B,y,depth:B.depth+1});}
  }
  maxStack=Math.max(maxStack,stack.length);
}
console.log(JSON.stringify({ell0,ell1,eps,maxDepth,minWidth,deltaGrid,visited,discarded,certified,
  maxDepthSeen,maxStack,residual:residual.length,labels:Object.fromEntries([...labels].sort()),
  firstResidual:residual[0]||null},null,2));
