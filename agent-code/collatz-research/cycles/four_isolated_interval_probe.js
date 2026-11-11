#!/usr/bin/env node
"use strict";

/*
 * Exact-rational diagnostic for the four-isolated homogeneous gate
 *
 *   (z-1) sum_{i=1}^4 z^{-c_i} = z,
 *   0 <= c_1 < c_2 < c_3 < c_4 < B.
 *
 * It deliberately reuses the content-unreduced M-fold estimate which
 * proves the three-isolated theorem.  A residual box is evidence only
 * that this particular norm test does not close there.
 */

function assert(ok,message){if(!ok)throw new Error(message);}
function bgcd(a,b){a=a<0n?-a:a;b=b<0n?-b:b;while(b)[a,b]=[b,a%b];return a;}
function R(n,d=1n){if(d<0n){n=-n;d=-d;}const g=bgcd(n,d);return{n:n/g,d:d/g};}
const ZERO=R(0n),ONE=R(1n),TWO=R(2n);
function add(a,b){return R(a.n*b.d+b.n*a.d,a.d*b.d);}
function sub(a,b){return R(a.n*b.d-b.n*a.d,a.d*b.d);}
function mul(a,b){return R(a.n*b.n,a.d*b.d);}
function cmp(a,b){const z=a.n*b.d-b.n*a.d;return z<0n?-1:z>0n?1:0;}
function rmin(...a){return a.reduce((x,y)=>cmp(x,y)<=0?x:y);}
function rmax(...a){return a.reduce((x,y)=>cmp(x,y)>=0?x:y);}
function midpoint(a,b){return R(a.n*b.d+b.n*a.d,2n*a.d*b.d);}
function floorR(a){return a.n>=0n?a.n/a.d:-((-a.n+a.d-1n)/a.d);}
function ceilR(a){return-floorR(R(-a.n,a.d));}
function width(i){return sub(i[1],i[0]);}
function addI(a,b){return[add(a[0],b[0]),add(a[1],b[1])];}
function subI(a,b){return[sub(a[0],b[1]),sub(a[1],b[0])];}
function containsInteger(i){return ceilR(i[0])<=floorR(i[1]);}
function show(a){return `${a.n}/${a.d}`;}

const ELL0=R(5698301721657743n,2333003475953681n);
const ELL1=R(46153n,18896n),EPS=R(1n,10000000000n);
const YMAX=R(7n,2n),GRID=100n,MAX_DEPTH=Number(process.argv[2]||28);
const mode=process.argv[3]||"exact";
const fastMode=mode==="fast"||mode==="noalias";
const noAlias=mode==="noalias";
const kval=[36n,32n,27n,24n];
const patterns=[];
for(let a=0;a<=3;++a)for(let b=a;b<=3;++b)
  for(let c=b;c<=3;++c)for(let d=c;d<=3;++d)patterns.push([a,b,c,d]);
function anchorI(q,ell){return q===0?[ZERO,ZERO]:q===1?[ONE,ONE]:q===2?ell:
  [add(ell[0],ONE),add(ell[1],ONE)];}

const LEFT_CONSTANT=125n**200000n;
const admissibleCache=new Map();
function admissible(U,A,J){
  const key=U+","+A+","+J;if(admissibleCache.has(key))return admissibleCache.get(key);
  let ok;
  if(fastMode){
    ok=342*Number(A)*Math.log(8)+17100*Math.log(Number(U))+
      171*Number(J)*Math.log(81)+200000*Math.log(125)<
      171*Number(J)*Math.log(64)+200000*Math.log(374);
  }else{
    const left=8n**(342n*A)*U**17100n*81n**(171n*J)*LEFT_CONSTANT;
    const right=64n**(171n*J)*374n**200000n;
    ok=left<right;
  }
  admissibleCache.set(key,ok);return ok;
}

function feasible(box){
  const lower=box.y.reduce((s,v)=>add(s,v[0]),ZERO);
  return cmp(lower,add(box.ell[1],ONE))<=0;
}

function patternCertificate(box,pattern){
  const cumulative=[];let total=[ZERO,ZERO];
  for(const gap of box.y){total=addI(total,gap);cumulative.push(total);}
  const t=pattern.map((q,i)=>subI(anchorI(q,box.ell),cumulative[i]));
  const lo=[rmin(ZERO,...t.map(v=>v[0])),rmin(ZERO,...t.map(v=>v[1]))];
  const hi=[rmax(ZERO,...t.map(v=>v[0])),rmax(ZERO,...t.map(v=>v[1]))];
  const span=[sub(hi[0],lo[1]),sub(hi[1],lo[0])];
  if(cmp(add(span[1],EPS),TWO)>=0)return null;

  let g=36n;for(const q of pattern)g=bgcd(g,kval[q]);
  const coeff=pattern.map(q=>kval[q]/g),finalCoeff=36n/g;
  const possibleQ=[];
  if(cmp(span[0],ONE)<0)possibleQ.push(0);
  if(cmp(add(span[1],EPS),ONE)>=0)possibleQ.push(1);
  assert(possibleQ.length>0,"empty quotient alternative");

  for(const Q of possibleQ){
    let delta=Q===0?add(span[1],EPS):sub(add(span[1],EPS),ONE);
    if(cmp(delta,ZERO)<0)delta=ZERO;
    const A=ceilR(mul(R(GRID),delta));
    const terms=[];
    for(let i=0;i<4;++i){
      const base=[sub(t[i][0],lo[1]),sub(t[i][1],lo[0])];
      terms.push({raw:t[i],pos:[base[0],add(base[1],EPS)],a:coeff[i],sign:1});
      terms.push({raw:t[i],pos:base,a:coeff[i],sign:-1});
    }
    terms.push({final:true,pos:[sub(ZERO,lo[1]),sub(EPS,lo[0])],
      a:finalCoeff,sign:-1});
    const amplitudes=terms.map(term=>Q===0?term.a:
      (cmp(term.pos[1],ONE)<0?8n*term.a:9n*term.a));
    let radialUpper=ZERO;
    for(const term of terms){
      let upper;
      if(Q===0){
        upper=rmin(ONE,term.pos[1]);
      }else if(cmp(term.pos[1],ONE)<0){
        upper=term.pos[1];
      }else if(cmp(term.pos[0],ONE)>=0){
        upper=sub(term.pos[1],ONE);
      }else{
        upper=ONE;
      }
      radialUpper=rmax(radialUpper,upper);
    }
    const J=ceilR(mul(R(GRID),radialUpper));
    assert(0n<=J&&J<=100n,"folded radial bin escaped [0,100]");
    let U=0n;for(const a of amplitudes)U+=a*a;
    if(!noAlias)
      for(let i=0;i<terms.length;++i)for(let j=i+1;j<terms.length;++j){
        if(terms[i].sign!==terms[j].sign)continue;
        const difference=terms[j].final?
          [sub(terms[i].raw[0],EPS),terms[i].raw[1]]:
          subI(terms[i].raw,terms[j].raw);
        if(containsInteger(difference))U+=2n*amplitudes[i]*amplitudes[j];
      }
    if(!admissible(U,A,J))return null;
  }
  return pattern.join("");
}

function certify(box){for(const p of patterns)if(patternCertificate(box,p))return p.join("");return null;}

const stack=[{ell:[ELL0,ELL1],y:Array.from({length:4},()=>[ZERO,YMAX]),depth:0}];
let visited=0,discarded=0,certified=0,maxDepth=0,maxStack=1;
const labels=new Map(),residual=[];
while(stack.length){
  const box=stack.pop();visited++;maxDepth=Math.max(maxDepth,box.depth);
  if(!feasible(box)){discarded++;continue;}
  const label=certify(box);
  if(label){certified++;labels.set(label,(labels.get(label)||0)+1);continue;}
  if(box.depth>=MAX_DEPTH){residual.push(box);continue;}
  const dimensions=box.y.map((v,i)=>({kind:"y",i,w:width(v)}));
  dimensions.push({kind:"ell",i:0,w:mul(R(4n),width(box.ell))});
  dimensions.sort((a,b)=>cmp(b.w,a.w));const split=dimensions[0];
  if(split.kind==="ell"){
    const mid=midpoint(box.ell[0],box.ell[1]);
    stack.push({...box,ell:[box.ell[0],mid],depth:box.depth+1},
      {...box,ell:[mid,box.ell[1]],depth:box.depth+1});
  }else{
    const old=box.y[split.i],mid=midpoint(old[0],old[1]);
    for(const next of [[old[0],mid],[mid,old[1]]]){
      const y=box.y.map(v=>v);y[split.i]=next;
      stack.push({...box,y,depth:box.depth+1});
    }
  }
  maxStack=Math.max(maxStack,stack.length);
}

console.log(`max_depth_limit=${MAX_DEPTH}`);
console.log(`nodes=${visited}`);
console.log(`discarded=${discarded}`);
console.log(`certified=${certified}`);
console.log(`residual=${residual.length}`);
console.log(`maximum_depth=${maxDepth}`);
console.log(`maximum_stack=${maxStack}`);
console.log(`exact_resultant_comparisons=${admissibleCache.size}`);
console.log(`fast_floating_diagnostic=${fastMode}`);
console.log(`same_sign_aliases_ignored=${noAlias}`);
for(const[label,count]of[...labels].sort())console.log(`anchor_${label}=${count}`);
for(let i=0;i<Math.min(12,residual.length);++i){
  const b=residual[i];
  console.log(`residual_${i}=ell[${show(b.ell[0])},${show(b.ell[1])}] `+
    b.y.map((v,j)=>`y${j}[${show(v[0])},${show(v[1])}]`).join(" "));
}
