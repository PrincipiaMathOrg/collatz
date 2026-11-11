#!/usr/bin/env node
"use strict";

/* Exact rational, all-depth interval cover for the A=23 cells.  A zero
 * residual is a symbolic cover of the continuous residue domain, not a
 * scan over periods.  This remains diagnostic until independently audited. */

function assert(ok,msg){if(!ok)throw new Error(msg);}
function gcd(a,b){a=a<0n?-a:a;b=b<0n?-b:b;while(b)[a,b]=[b,a%b];return a;}
function R(n,d=1n){if(d<0n){n=-n;d=-d;}const g=gcd(n,d);return{n:n/g,d:d/g};}
const ZERO=R(0n),ONE=R(1n),EPS=R(1n,10000000000n),GRID=BigInt(process.argv[4]||1000);
function add(a,b){return R(a.n*b.d+b.n*a.d,a.d*b.d);}
function sub(a,b){return R(a.n*b.d-b.n*a.d,a.d*b.d);}
function mul(a,b){return R(a.n*b.n,a.d*b.d);}
function div(a,b){return R(a.n*b.d,a.d*b.n);}
function cmp(a,b){const z=a.n*b.d-b.n*a.d;return z<0n?-1:z>0n?1:0;}
function rmin(...x){return x.reduce((a,b)=>cmp(a,b)<=0?a:b);}
function rmax(...x){return x.reduce((a,b)=>cmp(a,b)>=0?a:b);}
function floorR(a){return a.n>=0n?a.n/a.d:-((-a.n+a.d-1n)/a.d);}
function ceilR(a){return-floorR(R(-a.n,a.d));}
function mid(a,b){return R(a.n*b.d+b.n*a.d,2n*a.d*b.d);}
function width(a){return sub(a[1],a[0]);}
function addI(a,b){return[add(a[0],b[0]),add(a[1],b[1])];}
function subI(a,b){return[sub(a[0],b[1]),sub(a[1],b[0])];}
function scaleI(a,k){return k>=0?[mul(a[0],R(BigInt(k))),mul(a[1],R(BigInt(k)))]:[mul(a[1],R(BigInt(k))),mul(a[0],R(BigInt(k)))];}
function clamp0(a){return[rmax(ZERO,a[0]),rmax(ZERO,a[1])];}
function vp(a,p){a=a<0n?-a:a;const P=BigInt(p);let n=0;while(a&&a%P===0n){a/=P;n++;}return n;}

const LAM=[R(829n,342n),R(5n,2n)];
const cache=new Map();
function exactClose(U,S,P2,P3,Rexp){
  const sg=ceilR(mul(S,R(GRID))),p2=ceilR(mul(P2,R(GRID))),p3=ceilR(mul(P3,R(GRID))),rg=floorR(mul(Rexp,R(GRID)));
  if(sg<0n||rg<=0n)return false;
  const key=[U,sg,p2,p3,rg].join(',');if(cache.has(key))return cache.get(key);
  let left=U**sg*100n**(2n*rg),right=299n**(2n*rg);
  if(p2>=0n)left*=2n**p2;else right*=2n**(-p2);
  if(p3>=0n)left*=3n**p3;else right*=3n**(-p3);
  const ok=left<right;cache.set(key,ok);return ok;
}

const rungs=[
  {name:'M',s:box=>[ONE,ONE],a2:3,a3:0,b2:0,b3:2},
  {name:'E',s:box=>subI(box.l,[R(2n),R(2n)]),a2:0,a3:5,b2:8,b3:0},
  {name:'F',s:box=>subI([R(5n),R(5n)],scaleI(box.l,2)),a2:19,a3:0,b2:0,b3:12}
];

function plus(a){return[a[0],add(a[1],EPS)];}
function minus(a){return[rmax(ZERO,sub(a[0],EPS)),a[1]];}
function affineLamMinus(box,x,k=0){return[sub(add(box.l[0],R(BigInt(k))),x[1]),sub(add(box.l[1],R(BigInt(k))),x[0])];}
function termsFor(box,order,anchor){
  const u=box.u,v=box.v,l=box.l;
  if(order==='ce'){
    const d=clamp0([sub(add(l[0],ONE),add(u[1],v[1])),sub(add(l[1],ONE),add(u[0],v[0]))]);
    const h=clamp0([sub(add(l[0],ONE),v[1]),sub(add(l[1],ONE),v[0])]);
    if(anchor==='o')return[[23,plus(d)],[-23,d],[9,[ZERO,EPS]],[-9,[ZERO,ZERO]],[-9,plus(h)]];
    if(anchor==='x'){
      const k=addI(u,v);return[[23,[ZERO,EPS]],[-23,[ZERO,ZERO]],[6,plus(k)],[-6,k],[-9,plus(u)]];
    }
    if(anchor==='t'){
      if(cmp(v[1],ONE)<=0){const a=affineLamMinus(box,u,1),b=v;return[[46,a],[-46,minus(a)],[18,b],[-18,minus(b)],[-27,[ZERO,ZERO]]];}
      if(cmp(v[0],ONE)>=0){const a=affineLamMinus(box,u,0),b=subI(v,[ONE,ONE]);return[[23,a],[-23,minus(a)],[9,b],[-9,minus(b)],[-12,[ZERO,ZERO]]];}
      return null;
    }
  }else{
    const d=clamp0([sub(l[0],add(u[1],v[1])),sub(l[1],add(u[0],v[0]))]);
    const h=clamp0([sub(l[0],v[1]),sub(l[1],v[0])]);
    if(anchor==='o')return[[23,[ZERO,EPS]],[-23,[ZERO,ZERO]],[9,plus(d)],[-9,d],[-9,plus(h)]];
    if(anchor==='x'){
      const k=addI(u,v);return[[23,plus(k)],[-23,k],[12,[ZERO,EPS]],[-12,[ZERO,ZERO]],[-12,plus(u)]];
    }
    if(anchor==='t'){
      const a=v,b=affineLamMinus(box,u,0);return[[23,a],[-23,minus(a)],[9,b],[-9,minus(b)],[-12,[ZERO,ZERO]]];
    }
  }
  return null;
}

function certificate(box,order,anchor,rung){
  const terms=termsFor(box,order,anchor);if(!terms)return null;
  const s=rung.s(box);if(cmp(s[0],ZERO)<=0)return null;
  const d2=rung.b2-rung.a2,d3=rung.b3-rung.a3,raw=[];let mn2=Infinity,mn3=Infinity;
  for(const [coef,pos] of terms){
    if(cmp(pos[0],ZERO)<0)return null;
    const q0=floorR(div(pos[0],s[1])),q1=floorR(div(pos[1],s[0]));
    if(q0!==q1||q0<0n||q0>100n)return null;
    const q=Number(q0),v2=vp(BigInt(coef),2)+d2*q,v3=vp(BigInt(coef),3)+d3*q;
    raw.push({coef:BigInt(coef),q,v2,v3,pos});mn2=Math.min(mn2,v2);mn3=Math.min(mn3,v3);
  }
  let posMass=0n,negMass=0n;const reduced=[];
  for(const x of raw){
    const odd=x.coef/(2n**BigInt(vp(x.coef,2))*3n**BigInt(vp(x.coef,3)));
    const c=odd*2n**BigInt(x.v2-mn2)*3n**BigInt(x.v3-mn3);
    if(c>0n)posMass+=c;else negMass-=c;
    const qs=scaleI(s,x.q),j=clamp0(subI(x.pos,qs));
    reduced.push({c,j,v2:vp(c,2),v3:vp(c,3)});
  }
  const U=posMass**2n+negMass**2n;
  function minLocal(p,delta){
    let ans=null;
    for(const x of reduced){
      const vpv=p===2?x.v2:x.v3;
      const sv=scaleI(s,vpv),dj=scaleI(x.j,delta),z=addI(sv,dj),lo=z[0];
      if(ans===null||cmp(lo,ans)<0)ans=lo;
    }
    return ans;
  }
  const p2=subI(scaleI(s,2*d2),scaleI([minLocal(2,d2),minLocal(2,d2)],2));
  const p3=subI(scaleI(s,2*d3),scaleI([minLocal(3,d3),minLocal(3,d3)],2));
  const rexp=addI(scaleI(box.l,2),[ONE,ONE]);
  if(!exactClose(U,s[1],p2[1],p3[1],rexp[0]))return null;
  return `${rung.name}${anchor}`;
}

function feasible(box,order){
  const sumlo=add(box.u[0],box.v[0]);
  return order==='ce'?cmp(sumlo,add(box.l[1],ONE))<0&&cmp(box.u[0],box.l[1])<0:cmp(sumlo,box.l[1])<0;
}

function run(order){
  const vmax=order==='ce'?R(7n,2n):R(5n,2n);
  const stack=[{l:LAM,u:[ZERO,R(5n,2n)],v:[ZERO,vmax],depth:0}],labels=new Map(),res=[];
  let visited=0,discarded=0,certified=0,maxDepth=0;
  const maxD=Number(process.argv[3]||28);
  while(stack.length){
    const box=stack.pop();visited++;maxDepth=Math.max(maxDepth,box.depth);
    if(!feasible(box,order)){discarded++;continue;}
    let cert=null;
    search: for(const a of ['o','x','t'])for(const rung of rungs){cert=certificate(box,order,a,rung);if(cert)break search;}
    if(cert){certified++;labels.set(cert,(labels.get(cert)||0)+1);continue;}
    if(box.depth>=maxD){res.push(box);continue;}
    const dims=[['l',width(box.l),4],['u',width(box.u),1],['v',width(box.v),1]].sort((a,b)=>cmp(mul(b[1],R(BigInt(b[2]))),mul(a[1],R(BigInt(a[2])))));
    const key=dims[0][0],z=box[key],m=mid(z[0],z[1]);
    stack.push({...box,[key]:[z[0],m],depth:box.depth+1},{...box,[key]:[m,z[1]],depth:box.depth+1});
  }
  console.log(`A23_${order} visited=${visited} discarded=${discarded} certified=${certified} residual=${res.length} depth=${maxDepth}`);
  console.log('labels='+[...labels].sort().map(x=>x.join(':')).join(','));
  for(const b of res.slice(0,10))console.log('residual='+JSON.stringify(b,(k,v)=>typeof v==='bigint'?v.toString():v));
  return res.length;
}

const which=process.argv[2]||'both';let residual=0;
if(which==='both'||which==='ce')residual+=run('ce');
if(which==='both'||which==='ec')residual+=run('ec');
console.log('total_residual='+residual);
console.log('cache_size='+cache.size);
