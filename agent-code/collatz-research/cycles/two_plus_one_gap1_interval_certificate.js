#!/usr/bin/env node
"use strict";

/*
 * Exact rational interval certificate for
 *   (z-1)(5 z^-c + 3 z^-e) = 3z,  0<c<e<B, c<L.
 * No floating-point arithmetic and no folded-content division are used.
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

const periodBarrier=72057431991n;
assert(periodBarrier>60000000000n,"1/M endpoint failed");
assert(19n**26n>periodBarrier*7n**26n,"logarithmic endpoint failed");
assert(periodBarrier>375n*371n,"determinant endpoint failed");

const ELL0=R(829n,342n),ELL1=R(5n,2n),EPS=R(1n,10000000000n);
const YMAX=R(7n,2n),GRID=100n;
const kval=[12n,9n,8n];
const patterns=[];for(let a=0;a<=2;++a)for(let b=a;b<=2;++b)patterns.push([a,b]);
function anchorI(q,ell){return q===0?[ZERO,ZERO]:q===1?ell:[add(ell[0],ONE),add(ell[1],ONE)];}

const RHS=64n**17100n*374n**200000n;
const LEFT_CONSTANT=125n**200000n;
const admissibleCache=new Map();
function admissible(U,A){
  const key=U+","+A;
  if(admissibleCache.has(key))return admissibleCache.get(key);
  const left=8n**(342n*A)*(81n*U)**17100n*LEFT_CONSTANT;
  const ok=left<RHS;admissibleCache.set(key,ok);return ok;
}

function feasible(box){
  const gapLower=add(box.y[0][0],box.y[1][0]);
  return cmp(gapLower,add(box.ell[1],ONE))<=0&&cmp(box.y[0][0],box.ell[1])<0;
}

function patternCertificate(box,pattern){
  const cumulative=[box.y[0],addI(box.y[0],box.y[1])];
  const t=pattern.map((q,i)=>subI(anchorI(q,box.ell),cumulative[i]));
  const lo=[rmin(ZERO,...t.map(v=>v[0])),rmin(ZERO,...t.map(v=>v[1]))];
  const hi=[rmax(ZERO,...t.map(v=>v[0])),rmax(ZERO,...t.map(v=>v[1]))];
  const span=[sub(hi[0],lo[1]),sub(hi[1],lo[0])];
  if(cmp(add(span[1],EPS),TWO)>=0)return null;

  const raw1=5n*kval[pattern[0]],raw2=3n*kval[pattern[1]];
  const g=bgcd(bgcd(36n,raw1),raw2);
  const coeff=[raw1/g,raw2/g],finalCoeff=36n/g;
  const possibleQ=[];
  if(cmp(span[0],ONE)<0)possibleQ.push(0);
  if(cmp(add(span[1],EPS),ONE)>=0)possibleQ.push(1);
  assert(possibleQ.length>0,"empty quotient alternative");

  const witnesses=[];
  for(const Q of possibleQ){
    let delta=Q===0?add(span[1],EPS):sub(add(span[1],EPS),ONE);
    if(cmp(delta,ZERO)<0)delta=ZERO;
    const A=ceilR(mul(R(GRID),delta));
    const terms=[];
    for(let i=0;i<2;++i){
      const base=[sub(t[i][0],lo[1]),sub(t[i][1],lo[0])];
      terms.push({raw:t[i],pos:[base[0],add(base[1],EPS)],a:coeff[i],sign:1});
      terms.push({raw:t[i],pos:base,a:coeff[i],sign:-1});
    }
    terms.push({final:true,pos:[sub(ZERO,lo[1]),sub(EPS,lo[0])],a:finalCoeff,sign:-1});
    const amplitudes=terms.map(term=>Q===0?term.a:
      (cmp(term.pos[1],ONE)<0?8n*term.a:9n*term.a));
    let U=0n;for(const a of amplitudes)U+=a*a;
    for(let i=0;i<terms.length;++i)for(let j=i+1;j<terms.length;++j){
      if(terms[i].sign!==terms[j].sign)continue;
      const difference=terms[j].final?
        [sub(terms[i].raw[0],EPS),terms[i].raw[1]]:
        subI(terms[i].raw,terms[j].raw);
      if(containsInteger(difference))U+=2n*amplitudes[i]*amplitudes[j];
    }
    if(!admissible(U,A))return null;
    witnesses.push({Q,A,U});
  }
  return{pattern:pattern.join(""),witnesses};
}

function certify(box){
  for(const pattern of patterns){const cert=patternCertificate(box,pattern);if(cert)return cert;}
  return null;
}

const stack=[{ell:[ELL0,ELL1],y:[[ZERO,YMAX],[ZERO,YMAX]],depth:0}];
const residual=[];let visited=0,discarded=0,certified=0,maxDepth=0,maxStack=1;
const labels=new Map(),witnessPairs=new Set();
while(stack.length){
  const box=stack.pop();visited++;maxDepth=Math.max(maxDepth,box.depth);
  if(!feasible(box)){discarded++;continue;}
  const cert=certify(box);
  if(cert){
    certified++;labels.set(cert.pattern,(labels.get(cert.pattern)||0)+1);
    for(const w of cert.witnesses)witnessPairs.add(w.U+","+w.A);
    continue;
  }
  if(box.depth>=50){residual.push(box);continue;}
  const dimensions=box.y.map((v,i)=>({kind:"y",i,w:width(v)}));
  dimensions.push({kind:"ell",i:0,w:mul(R(4n),width(box.ell))});
  dimensions.sort((a,b)=>cmp(b.w,a.w));
  const split=dimensions[0];
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

assert(residual.length===0,"uncovered interval boxes: "+residual.length);
assert(visited===2*(discarded+certified+residual.length)-1,"binary partition identity failed");
assert(visited===297,"interval-node regression count changed");
assert(discarded===10,"discarded-box regression count changed");
assert(certified===139,"certified-box regression count changed");
assert(maxDepth===16,"branch-depth regression count changed");
const expectedLabels=new Map([["00",51],["01",33],["02",12],["11",34],["12",9]]);
for(const[label,count]of expectedLabels)
  assert(labels.get(label)===count,"anchor-"+label+" regression count changed");
assert(!labels.has("22"),"unexpected anchor-22 boxes");

console.log("interval_nodes_visited="+visited);
console.log("interval_boxes_discarded="+discarded);
console.log("interval_boxes_certified="+certified);
console.log("maximum_branch_depth="+maxDepth);
console.log("maximum_stack_size="+maxStack);
console.log("binary_partition_identity=true");
console.log("exact_resultant_comparisons="+admissibleCache.size);
console.log("accepted_witness_pairs="+witnessPairs.size);
for(const[label,count]of[...labels].sort())console.log("anchor_"+label+"_boxes="+count);
console.log("folded_content_divisions=0");
console.log("determinant_endpoint_checks=true");
console.log("two_plus_one_gap1_interval_certificate_passed=true");
