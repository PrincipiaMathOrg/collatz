#!/usr/bin/env node
"use strict";

/* Exact-rational continuum cover for the NONALIAS part of the four-isolated
 * gate.  Coordinates are c_i/M directly, which avoids cumulative interval
 * inflation.  This does not cover the exact alias hyperplanes and is not,
 * by itself, a theorem for the full gate. */

function assert(ok,m){if(!ok)throw new Error(m);}
function gcd(a,b){a=a<0n?-a:a;b=b<0n?-b:b;while(b)[a,b]=[b,a%b];return a;}
function R(n,d=1n){if(d<0n){n=-n;d=-d;}const g=gcd(n,d);return{n:n/g,d:d/g};}
const Z=R(0n),O=R(1n),T=R(2n);
function add(a,b){return R(a.n*b.d+b.n*a.d,a.d*b.d);}
function sub(a,b){return R(a.n*b.d-b.n*a.d,a.d*b.d);}
function mul(a,b){return R(a.n*b.n,a.d*b.d);}
function cmp(a,b){const x=a.n*b.d-b.n*a.d;return x<0n?-1:x>0n?1:0;}
function mn(...x){return x.reduce((a,b)=>cmp(a,b)<=0?a:b);}
function mx(...x){return x.reduce((a,b)=>cmp(a,b)>=0?a:b);}
function mid(a,b){return R(a.n*b.d+b.n*a.d,2n*a.d*b.d);}
function floor(a){return a.n>=0n?a.n/a.d:-((-a.n+a.d-1n)/a.d);}
function ceil(a){return-floor(R(-a.n,a.d));}
function width(i){return sub(i[1],i[0]);}
function show(a){return `${a.n}/${a.d}`;}

const E0=R(5698301721657743n,2333003475953681n),E1=R(46153n,18896n);
const EPS=R(1n,10000000000n),Y=R(7n,2n),GRID=BigInt(process.argv[4]||100);
const maxDepth=Number(process.argv[2]||36),fast=process.argv[3]==="fast",k=[36n,32n,27n,24n],patterns=[];
for(let a=0;a<4;a++)for(let b=a;b<4;b++)for(let c=b;c<4;c++)for(let d=c;d<4;d++)patterns.push([a,b,c,d]);
function anchor(q,e){return q===0?[Z,Z]:q===1?[O,O]:q===2?e:[add(e[0],O),add(e[1],O)];}
const cache=new Map(),SCALE=2n*GRID*1000n,LEFT=125n**SCALE;
function admissible(U,A,J,C=0){
  const key=`${U},${A},${J},${C}`;if(cache.has(key))return cache.get(key);
  const ok=fast?
    .16993*(Number(A)/Number(GRID)*Math.log(8)+.5*Math.log(Number(U))+.5*Number(J)/Number(GRID)*Math.log(81/64))*Number(SCALE)+Number(SCALE)*Math.log(125)<
      Number(SCALE)*Math.log(374)+Number(C)/1e9*Number(SCALE)/6:
    8n**(340n*A)*U**(170n*GRID)*81n**(170n*J)*LEFT<64n**(170n*J)*374n**SCALE;
  cache.set(key,ok);return ok;
}
function feasible(b){
  if(cmp(b.c[3][0],add(b.e[1],O))>0)return false;
  for(let i=0;i<3;i++)if(cmp(b.c[i][0],b.c[i+1][1])>0)return false;
  return true;
}
function cert(b,p){
  const t=p.map((q,i)=>{const a=anchor(q,b.e);return[sub(a[0],b.c[i][1]),sub(a[1],b.c[i][0])];});
  const lo=[mn(Z,...t.map(x=>x[0])),mn(Z,...t.map(x=>x[1]))];
  const hi=[mx(Z,...t.map(x=>x[0])),mx(Z,...t.map(x=>x[1]))];
  const span=[sub(hi[0],lo[1]),sub(hi[1],lo[0])];
  if(cmp(add(span[1],EPS),T)>=0)return false;
  let g=36n;for(const q of p)g=gcd(g,k[q]);
  const coeff=p.map(q=>k[q]/g),f=36n/g,qs=[];
  if(cmp(span[0],O)<0)qs.push(0);
  if(cmp(add(span[1],EPS),O)>=0)qs.push(1);
  for(const Q of qs){
    let delta=Q===0?add(span[1],EPS):sub(add(span[1],EPS),O);if(cmp(delta,Z)<0)delta=Z;
    const A=ceil(mul(R(GRID),delta));
    const pos=[];let U=0n,rad=Z,l1=0n,lowerMu=0n;
    for(let i=0;i<4;i++){
      const base=[sub(t[i][0],lo[1]),sub(t[i][1],lo[0])];
      for(const plus of [false,true]){
        const v=plus?[base[0],add(base[1],EPS)]:base;pos.push(v);
        const amp=Q===0?coeff[i]:(cmp(v[1],O)<0?8n*coeff[i]:9n*coeff[i]);U+=amp*amp;l1+=amp;
        const lowAmp=Q===0?coeff[i]:8n*coeff[i];lowerMu+=lowAmp*lowAmp;
        const rr=Q===0?mn(O,v[1]):cmp(v[1],O)<0?v[1]:cmp(v[0],O)>=0?sub(v[1],O):O;
        rad=mx(rad,rr);
      }
    }
    const fv=[sub(Z,lo[1]),sub(EPS,lo[0])];
    const fa=Q===0?f:(cmp(fv[1],O)<0?8n*f:9n*f);U+=fa*fa;l1+=fa;
    const lowFa=Q===0?f:8n*f;lowerMu+=lowFa*lowFa;
    const fr=Q===0?mn(O,fv[1]):cmp(fv[1],O)<0?fv[1]:cmp(fv[0],O)>=0?sub(fv[1],O):O;
    rad=mx(rad,fr);
    const J=ceil(mul(R(GRID),rad));assert(J>=0n&&J<=GRID,"radial bin");
    let C=0;
    if(fast){
      const qfac=Q===0?1:8;
      const sUpper=qfac*(36/Number(g))*(81/64)+1e-8;
      const gap=Number(lowerMu)-sUpper*sUpper;
      const ymax=((9/8)*Number(l1))**2;
      const corr=gap>0?gap*gap/(288*ymax*ymax):0;
      C=Math.max(0,Math.floor(corr*1e9));
    }
    if(!admissible(U,A,J,C))return false;
  }
  return true;
}
function certify(b){for(const p of patterns)if(cert(b,p))return p.join("");return null;}

const stack=[{e:[E0,E1],c:Array.from({length:4},()=>[Z,Y]),depth:0}];
let nodes=0,discard=0,done=0,deep=0,maxStack=1;const labels=new Map(),res=[];
while(stack.length){
  const b=stack.pop();nodes++;deep=Math.max(deep,b.depth);
  if(!feasible(b)){discard++;continue;}
  const label=certify(b);if(label){done++;labels.set(label,(labels.get(label)||0)+1);continue;}
  if(b.depth>=maxDepth){res.push(b);continue;}
  const dims=b.c.map((v,i)=>({t:"c",i,w:width(v)}));dims.push({t:"e",i:0,w:mul(R(4n),width(b.e))});
  dims.sort((x,y)=>cmp(y.w,x.w));const s=dims[0];
  if(s.t==="e"){
    const m=mid(b.e[0],b.e[1]);stack.push({...b,e:[b.e[0],m],depth:b.depth+1},{...b,e:[m,b.e[1]],depth:b.depth+1});
  }else{
    const old=b.c[s.i],m=mid(old[0],old[1]);
    for(const v of [[old[0],m],[m,old[1]]]){const c=b.c.map(x=>x);c[s.i]=v;stack.push({...b,c,depth:b.depth+1});}
  }
  maxStack=Math.max(maxStack,stack.length);
}
console.log(`depth_limit=${maxDepth}`);console.log(`nodes=${nodes}`);console.log(`discarded=${discard}`);
console.log(`certified=${done}`);console.log(`residual=${res.length}`);console.log(`maximum_depth=${deep}`);
console.log(`maximum_stack=${maxStack}`);console.log(`exact_comparisons=${cache.size}`);
console.log(`grid=${GRID}`);
console.log(`fast_floating_diagnostic=${fast}`);
for(const[x,n]of[...labels].sort())console.log(`anchor_${x}=${n}`);
for(let i=0;i<Math.min(12,res.length);i++)console.log(`residual_${i}=ell[${show(res[i].e[0])},${show(res[i].e[1])}] `+res[i].c.map((v,j)=>`c${j}[${show(v[0])},${show(v[1])}]`).join(" "));
