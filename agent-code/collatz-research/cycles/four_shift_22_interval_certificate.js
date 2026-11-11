#!/usr/bin/env node
"use strict";

/*
 * Exact rational interval certificate for the two-run four-shift gates
 *
 *   (z-1)(A z^-c + A' z^-e) = 3z,
 *
 * with (A,A') equal to (5,5), (5,7), or (7,7).  The run-start
 * restrictions are e<L, c<L<=e, and L<=c, respectively.  We fold at
 * 8X^M-9 and allow the four exact anchors 0,M,L,B.  All interval
 * arithmetic and all acceptance comparisons are exact.
 */

function assert(ok,message){if(!ok)throw new Error(message);}
function bgcd(a,b){a=a<0n?-a:a;b=b<0n?-b:b;while(b)[a,b]=[b,a%b];return a;}
function R(n,d=1n){if(d<0n){n=-n;d=-d;}const g=bgcd(n,d);return{n:n/g,d:d/g};}
const ZERO=R(0n),ONE=R(1n),TWO=R(2n);
function add(a,b){return R(a.n*b.d+b.n*a.d,a.d*b.d);}
function sub(a,b){return R(a.n*b.d-b.n*a.d,a.d*b.d);}
function mul(a,b){return R(a.n*b.n,a.d*b.d);}
function div(a,b){return R(a.n*b.d,a.d*b.n);}
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
function show(a){return a.n+"/"+a.d;}

const maxDepth=35;
const periodBarrier=72057431991n;
assert(periodBarrier>60000000000n,"1/M endpoint failed");
assert(19n**26n>periodBarrier*7n**26n,"logarithmic endpoint failed");
assert(periodBarrier>375n*371n,"determinant endpoint failed");

// 176251/111202 < log_2(3) < 301994/190537.  Since
// N/r lies between log_2(3) and log_2(3)+1/r, these bounds and the period
// barrier give the following exact interval for ell=(2-N/r)/(2N/r-3).
assert(2n**176251n<3n**111202n,"lower logarithm convergent failed");
assert(3n**190537n<2n**301994n,"upper logarithm convergent failed");
const XLO=R(176251n,111202n);
const XHI=add(R(301994n,190537n),R(1n,periodBarrier));
const MRLO=sub(mul(TWO,XLO),R(3n));
const MRHI=sub(mul(TWO,XHI),R(3n));
const FRLO=sub(mul(R(12n),XLO),R(19n));
const FRHI=sub(mul(R(12n),XHI),R(19n));
assert(cmp(MRLO,R(1n,6n))>0,"M/r lower endpoint failed");
assert(cmp(MRHI,R(171n,1000n))<0,"M/r upper endpoint failed");
assert(cmp(FRLO,ZERO)>0,"F/r positivity endpoint failed");
assert(cmp(FRHI,R(21n,1000n))<0,"F/r upper endpoint failed");
function ellOf(x){return div(sub(TWO,x),sub(mul(TWO,x),R(3n)));}
const ELL0=ellOf(XHI),ELL1=ellOf(XLO),EPS=R(1n,10000000000n);
assert(cmp(ELL0,ELL1)<0,"empty tight ell interval");
assert(cmp(add(ELL1,ONE),R(7n,2n))<0,"normalized gap box is too small");
assert(ELL0.n===5698301721657743n&&ELL0.d===2333003475953681n&&
  ELL1.n===46153n&&ELL1.d===18896n,"tight ell endpoints changed");
const YMAX=R(7n,2n),GRID=100n;

// q/M = 0,1,ell,ell+1 and K/z^q for K=36.
const anchorCoeff=[36n,32n,27n,24n];
const patterns=[];
for(let a=0;a<=3;++a)for(let b=a;b<=3;++b)patterns.push([a,b]);
function anchorI(q,ell){
  if(q===0)return[ZERO,ZERO];
  if(q===1)return[ONE,ONE];
  if(q===2)return ell;
  return[add(ell[0],ONE),add(ell[1],ONE)];
}

const RHS=64n**17100n*374n**200000n;
const LEFT_CONSTANT=125n**200000n;
const admissibleCache=new Map();
function admissible(U,A){
  const key=U+","+A;
  if(admissibleCache.has(key))return admissibleCache.get(key);
  const left=8n**(342n*A)*(81n*U)**17100n*LEFT_CONSTANT;
  const ok=left<RHS;admissibleCache.set(key,ok);return ok;
}

const sectors={
  "55":{A:5n,C:5n},
  "57":{A:5n,C:7n},
  "77":{A:7n,C:7n}
};

// In the near-M 5/5 cell, borrowing 8z^M=9 on the appropriate side and
// reducing the main exponent through M,E,F always gives the same primitive
// coefficient triple.  The displayed comparison is the squared F-resultant
// bound with the worst equality alias.
const ladderC=45n*2n**30n;
const ladderQ=5n*2n**33n;
const ladderH=3n**22n;
const ladderU=2n*(ladderC+ladderQ)**2n+ladderH**2n;
assert(9n*256n*3n**24n*2n**33n===
  8n*243n*2n**38n*3n**21n,"M-E-F power multiplier failed");
assert(bgcd(bgcd(45n*2n**33n,40n*2n**33n),24n*3n**21n)===8n,
  "near-M primitive content changed");
assert(ladderC===45n*2n**33n/8n&&ladderQ===40n*2n**33n/8n&&
  ladderH===24n*3n**21n/8n,"near-M primitive coefficients changed");
const ELOW=sub(ELL0,TWO),EUP=sub(ELL1,TWO);
const FLOW=sub(R(5n),mul(TWO,ELL1));
assert(cmp(add(R(3n,4n),R(1n,100n),EPS),ONE)<0,
  "near-M main exponent leaves its M-band");
assert(cmp(R(7n,10n),EUP)>0&&
  cmp(add(R(3n,4n),R(1n,100n),EPS),mul(TWO,ELOW))<0,
  "near-M E-quotient is not uniformly one");
assert(cmp(add(R(7n,10n),sub(mul(R(3n),ELL0),R(8n))),ZERO)>0&&
  cmp(sub(add(R(7n,10n),sub(mul(R(3n),ELL0),R(8n))),R(1n,100n)),ZERO)>0,
  "near-M F-residue does not clear d+1");
assert(cmp(add(R(1n,100n),EPS),FLOW)<0&&
  cmp(add(add(add(R(3n,4n),R(1n,100n)),EPS),
    sub(mul(R(5n),ELL1),R(13n))),ZERO)<0,
  "near-M F-residue leaves the second F-band");
assert(3n**24n*63n<2n**38n*65n,"F radial comparison failed");
assert((2n**38n*65n*ladderU)**21n*100n**2000n<
  63n**21n*299n**2000n,"near-M F-resultant comparison failed");

function feasible(box,name){
  const c=box.y[0], e=addI(box.y[0],box.y[1]);
  // Positive gaps and e<B are relaxed to closed inequalities in the cover.
  if(cmp(add(c[0],box.y[1][0]),add(box.ell[1],ONE))>0)return false;
  if(name==="55")return cmp(e[0],box.ell[1])<0;
  if(name==="57")return cmp(c[0],box.ell[1])<0&&cmp(e[1],box.ell[0])>=0;
  return cmp(c[1],box.ell[0])>=0;
}

function patternCertificate(box,name,pattern){
  const data=sectors[name];
  const cumulative=[box.y[0],addI(box.y[0],box.y[1])];
  const t=pattern.map((q,i)=>subI(anchorI(q,box.ell),cumulative[i]));
  const lo=[rmin(ZERO,...t.map(v=>v[0])),rmin(ZERO,...t.map(v=>v[1]))];
  const hi=[rmax(ZERO,...t.map(v=>v[0])),rmax(ZERO,...t.map(v=>v[1]))];
  const span=[sub(hi[0],lo[1]),sub(hi[1],lo[0])];
  if(cmp(add(span[1],EPS),TWO)>=0)return null;

  const raw1=data.A*anchorCoeff[pattern[0]];
  const raw2=data.C*anchorCoeff[pattern[1]];
  const g=bgcd(bgcd(108n,raw1),raw2);
  let unitPart=g;
  while(unitPart%2n===0n)unitPart/=2n;
  while(unitPart%3n===0n)unitPart/=3n;
  assert(unitPart===1n,"removed nonunit content");
  const coeff=[raw1/g,raw2/g],finalCoeff=108n/g;
  const possibleQ=[];
  if(cmp(span[0],ONE)<0)possibleQ.push(0);
  if(cmp(add(span[1],EPS),ONE)>=0)possibleQ.push(1);
  assert(possibleQ.length>0,"empty quotient alternative");

  const witnesses=[];
  for(const Q of possibleQ){
    let delta=Q===0?add(span[1],EPS):sub(add(span[1],EPS),ONE);
    if(cmp(delta,ZERO)<0)delta=ZERO;
    const Aceil=ceilR(mul(R(GRID),delta));
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
    if(!admissible(U,Aceil))return null;
    witnesses.push({Q,A:Aceil,U});
  }
  return{pattern:pattern.join(""),witnesses};
}

function certify(box,name){
  for(const pattern of patterns){
    const cert=patternCertificate(box,name,pattern);
    if(cert)return cert;
  }
  if(name==="55"&&
      cmp(box.y[0][0],R(7n,10n))>=0&&cmp(box.y[0][1],R(3n,4n))<=0&&
      cmp(box.y[1][0],R(99n,100n))>=0&&cmp(box.y[1][1],R(101n,100n))<=0){
    return{pattern:"F-near-M",witnesses:[]};
  }
  return null;
}

function run(name){
  const stack=[{ell:[ELL0,ELL1],y:[[ZERO,YMAX],[ZERO,YMAX]],depth:0}];
  const residual=[];let visited=0,discarded=0,certified=0,deepest=0;
  const labels=new Map();
  while(stack.length){
    const box=stack.pop();visited++;deepest=Math.max(deepest,box.depth);
    if(!feasible(box,name)){discarded++;continue;}
    const cert=certify(box,name);
    if(cert){certified++;labels.set(cert.pattern,(labels.get(cert.pattern)||0)+1);continue;}
    if(box.depth>=maxDepth){residual.push(box);continue;}
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
  }
  assert(residual.length===0,"uncovered interval boxes in sector "+name);
  assert(visited===2*(discarded+certified)-1,"binary partition identity failed in "+name);
  const expected={
    "55":{visited:301,discarded:9,certified:142,depth:19,
      labels:{"00":80,"02":29,"22":22,"F-near-M":11}},
    "57":{visited:203,discarded:22,certified:80,depth:14,
      labels:{"02":17,"03":4,"13":25,"22":34}},
    "77":{visited:27,discarded:9,certified:5,depth:8,
      labels:{"22":5}}
  }[name];
  assert(visited===expected.visited&&discarded===expected.discarded&&
    certified===expected.certified&&deepest===expected.depth,
    "cover regression counts changed in sector "+name);
  assert(labels.size===Object.keys(expected.labels).length,
    "anchor-label count changed in sector "+name);
  for(const [label,count] of Object.entries(expected.labels))
    assert(labels.get(label)===count,"anchor regression changed: "+name+":"+label);

  console.log("sector="+name);
  console.log("visited="+visited+" discarded="+discarded+" certified="+certified+
    " residual="+residual.length+" depth="+deepest);
  console.log("anchors="+[...labels].sort().map(([k,v])=>k+":"+v).join(","));
  if(residual.length){
    for(const key of ["ell","y0","y1"]){
      const ints=residual.map(b=>key==="ell"?b.ell:b.y[key==="y0"?0:1]);
      console.log("residual_hull_"+key+"="+show(rmin(...ints.map(i=>i[0])))+".."+
        show(rmax(...ints.map(i=>i[1]))));
    }
  }
  for(const box of residual.slice(0,8)){
    console.log("residual_box ell="+box.ell.map(show).join("..")+
      " y0="+box.y[0].map(show).join("..")+" y1="+box.y[1].map(show).join(".."));
  }
  return{visited,discarded,certified,deepest};
}

let totalVisited=0,totalDiscarded=0,totalCertified=0;
for(const name of Object.keys(sectors)){
  const result=run(name);
  totalVisited+=result.visited;
  totalDiscarded+=result.discarded;
  totalCertified+=result.certified;
}
assert(totalVisited===531&&totalDiscarded===40&&totalCertified===227,
  "total cover regression counts changed");
console.log("total_interval_nodes="+totalVisited);
console.log("total_boxes_discarded="+totalDiscarded);
console.log("total_boxes_certified="+totalCertified);
console.log("logarithm_convergent_checks=true");
console.log("near_M_F_resultant_check=true");
console.log("folded_content_divisions=0");
console.log("four_shift_22_interval_certificate_passed=true");
