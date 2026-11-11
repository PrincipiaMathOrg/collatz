#!/usr/bin/env node
"use strict";

// Adaptive interval probe for an all-r anchor cover.  Interval operations
// are outward-padded doubles here; a successful run is diagnostic only.

const ell0 = 829 / 342;
const ell1 = 5 / 2;
const eps = 1e-10;
const target = Math.log(374 / 125);
const rootWeight = 81 / 64;
const maxDepth = Number(process.argv[2] || 42);
const minWidth = Number(process.argv[3] || 2e-5);
const deltaGrid = Number(process.argv[4] || 0);
const patterns = [];
for (let a = 0; a <= 2; ++a)
  for (let b = a; b <= 2; ++b)
    for (let c = b; c <= 2; ++c) patterns.push([a,b,c]);
const kval = [12,9,8];

function gcd(a,b){while(b)[a,b]=[b,a%b];return Math.abs(a);}
function addI(a,b){return [a[0]+b[0],a[1]+b[1]];}
function subI(a,b){return [a[0]-b[1],a[1]-b[0]];}

function anchorI(kind, ell) {
  if (kind === 0) return [0,0];
  if (kind === 1) return ell;
  return [ell[0]+1,ell[1]+1];
}

function containsInteger(interval) {
  const pad = 2e-13;
  return Math.ceil(interval[0]-pad) <= Math.floor(interval[1]+pad);
}

function feasible(box) {
  const lower = box.y.reduce((s,v)=>s+v[0],0);
  const upper = box.y.reduce((s,v)=>s+v[1],0);
  return lower <= box.ell[1]+1 && upper >= 0;
}

function patternBound(box, pattern) {
  const cumulative = [box.y[0], addI(box.y[0],box.y[1]),
    addI(addI(box.y[0],box.y[1]),box.y[2])];
  const t = pattern.map((q,i)=>subI(anchorI(q,box.ell),cumulative[i]));
  const lo = [Math.min(0,...t.map(v=>v[0])), Math.min(0,...t.map(v=>v[1]))];
  const hi = [Math.max(0,...t.map(v=>v[0])), Math.max(0,...t.map(v=>v[1]))];
  const span = [hi[0]-lo[1],hi[1]-lo[0]];
  if (span[1]+eps >= 2) return null;
  let g=12;for(const q of pattern)g=gcd(g,kval[q]);
  const coeff=pattern.map(q=>kval[q]/g), finalCoeff=12/g;
  const qs=[];
  if (span[0] < 1) qs.push(0);
  if (span[1]+eps >= 1) qs.push(1);
  let worst=-Infinity, witness=null;
  for(const Q of qs){
    const delta = Q===0 ? span[1]+eps : Math.max(0,span[1]+eps-1);
    const termIntervals=[];
    for(let i=0;i<3;++i){
      const base=[t[i][0]-lo[1],t[i][1]-lo[0]];
      termIntervals.push({raw:t[i],pos:[base[0],base[1]+eps],a:coeff[i],sign:1,derivative:true});
      termIntervals.push({raw:t[i],pos:base,a:coeff[i],sign:-1,derivative:false});
    }
    termIntervals.push({raw:[eps-lo[1],eps-lo[0]],pos:[eps-lo[1],eps-lo[0]],
      a:finalCoeff,sign:-1,final:true});
    const amps=[];
    for(const term of termIntervals){
      let scale=1;
      if(Q===1) scale=term.pos[1] < 1 ? 8 : 9;
      amps.push(term.a*scale);
    }
    let U=0;
    for(const a of amps)U+=a*a;
    for(let i=0;i<termIntervals.length;++i)for(let j=i+1;j<termIntervals.length;++j){
      if(termIntervals[i].sign!==termIntervals[j].sign)continue;
      let diff;
      if(termIntervals[i].final){
        diff=[eps-termIntervals[j].raw[1],eps-termIntervals[j].raw[0]];
      }else if(termIntervals[j].final){
        diff=[termIntervals[i].raw[0]-eps,termIntervals[i].raw[1]];
      }else{
        diff=subI(termIntervals[i].raw,termIntervals[j].raw);
      }
      if(containsInteger(diff))U+=2*amps[i]*amps[j];
    }
    const roundedDelta=deltaGrid ? Math.ceil((delta-1e-14)*deltaGrid)/deltaGrid : delta;
    const mu=deltaGrid ? 171/1000 : 1/(2*box.ell[0]+1);
    const log=mu*(roundedDelta*Math.log(8)+.5*Math.log(rootWeight*U));
    if(log>worst){worst=log;witness={Q,delta,U,span};}
  }
  return {log:worst,witness};
}

function certify(box) {
  let best=null;
  for(const p of patterns){
    const b=patternBound(box,p);
    if(b&&(!best||b.log<best.log))best={...b,p};
  }
  return best&&best.log<target-2e-12?best:null;
}

const initial={ell:[ell0,ell1],y:[[0,3.5],[0,3.5],[0,3.5]],depth:0};
const stack=[initial], leaves=[],residual=[];
let visited=0,discarded=0,maxStack=1;
const labels=new Map();
while(stack.length){
  const box=stack.pop();++visited;
  if(!feasible(box)){++discarded;continue;}
  const cert=certify(box);
  if(cert){
    leaves.push({box,cert});
    const key=cert.p.join("");labels.set(key,(labels.get(key)||0)+1);
    continue;
  }
  const dims=[...box.y.map((v,i)=>({kind:"y",i,w:v[1]-v[0]})),
    {kind:"ell",i:0,w:4*(box.ell[1]-box.ell[0])}].sort((a,b)=>b.w-a.w);
  const d=dims[0];
  if(box.depth>=maxDepth||d.w<minWidth){residual.push(box);continue;}
  const children=[];
  if(d.kind==="ell"){
    const mid=(box.ell[0]+box.ell[1])/2;
    children.push({...box,ell:[box.ell[0],mid],depth:box.depth+1},
      {...box,ell:[mid,box.ell[1]],depth:box.depth+1});
  }else{
    const mid=(box.y[d.i][0]+box.y[d.i][1])/2;
    for(const v of [[box.y[d.i][0],mid],[mid,box.y[d.i][1]]]){
      const y=box.y.map(x=>[...x]);y[d.i]=v;
      children.push({...box,y,depth:box.depth+1});
    }
  }
  stack.push(...children);maxStack=Math.max(maxStack,stack.length);
}

let worstResidual=null;
for(const box of residual){
  const center={ell:(box.ell[0]+box.ell[1])/2,
    y:box.y.map(v=>(v[0]+v[1])/2)};
  if(!worstResidual||box.depth>worstResidual.depth)worstResidual={...box,center};
}
console.log(JSON.stringify({ell0,ell1,eps,maxDepth,minWidth,deltaGrid,visited,discarded,
  certified:leaves.length,residual:residual.length,maxStack,
  labels:Object.fromEntries([...labels].sort((a,b)=>b[1]-a[1])),
  firstResidual:residual[0]||null,worstResidual},null,2));
