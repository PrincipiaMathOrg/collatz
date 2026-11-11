#!/usr/bin/env node
"use strict";

/*
 * Exact outward-rounded normalized-simplex cover prototype.
 *
 * A floating-point call is used only to propose rational upper bounds for
 * 2^(2p/grid).  Every proposal is then verified by a BigInt power
 * comparison.  All box-closing decisions use Rational BigInt arithmetic.
 */

function assert(ok,message){if(!ok)throw new Error(message);}
function gcdBig(a,b){a=a<0n?-a:a;b=b<0n?-b:b;while(b)[a,b]=[b,a%b];return a;}
class Rat{
  constructor(n,d=1n){
    if(d<0n){n=-n;d=-d;} const g=gcdBig(n,d);this.n=n/g;this.d=d/g;
  }
  add(x){return new Rat(this.n*x.d+x.n*this.d,this.d*x.d);}
  sub(x){return new Rat(this.n*x.d-x.n*this.d,this.d*x.d);}
  mul(x){return new Rat(this.n*x.n,this.d*x.d);}
  div(x){return new Rat(this.n*x.d,this.d*x.n);}
  cmp(x){const z=this.n*x.d-x.n*this.d;return z<0n?-1:z>0n?1:0;}
  toNumber(){return Number(this.n)/Number(this.d);}
  toString(){return `${this.n}/${this.d}`;}
}
const R=(n,d=1n)=>new Rat(BigInt(n),BigInt(d));
const rmin=72057431991n;
const grid=Number(process.argv[2]||100);
const caseArg=process.argv.find(x=>x.startsWith("--case="));
const caseIndices=caseArg?caseArg.slice(7).split(",").map(Number):null;
if(caseIndices)assert(caseIndices.length===3&&caseIndices.every(Number.isInteger),"bad --case");
const scale=1000000000n;
const zero=R(0),one=R(1);
const eps=R(1,10000000000n); // 1/r < 10^(-10)
const radial=R(1000000001n,1000000000n); // 2^(2/r) < 1+10^(-9)
const bMin=R(31,53),bMax=R(585000001n,1000000000n);
const lMin=one.sub(bMax),lMax=R(22,53);
const mMin=R(9,53),mMax=R(170000002n,1000000000n);
const target2=R(374n**2n,125n**2n);

assert(rmin>10000000000n,"epsilon bound unavailable");
// Bernoulli: (1+10^-9)^(r/2) > 1+r/(2*10^9) > 2.
assert(rmin>2000000000n,"radial Bernoulli bound unavailable");
assert(bMin.cmp(bMax)<0&&lMin.cmp(lMax)<0&&mMin.cmp(mMax)<0,
  "bad Euclidean parameter intervals");

function maxRat(xs){return xs.reduce((a,b)=>a.cmp(b)>=0?a:b);}
function minRat(xs){return xs.reduce((a,b)=>a.cmp(b)<=0?a:b);}

// Exact logarithm brackets.  For 1 <= y < 2, write
// log(y)=2 sum_{j>=0} t^(2j+1)/(2j+1), t=(y-1)/(y+1).
// The omitted positive tail is bounded geometrically.  Range reduction by
// powers of two keeps t <= 1/3.  These brackets are used only in linear
// inequalities after all exponent intervals have been rounded outwards.
function logUnitBounds(y,terms=18){
  assert(y.cmp(one)>=0&&y.cmp(R(2))<0,"log unit range");
  const t=y.sub(one).div(y.add(one)),t2=t.mul(t);
  let p=t,s=zero;
  for(let j=0;j<terms;j++){
    s=s.add(p.div(R(2*j+1)));
    p=p.mul(t2);
  }
  const lower=s.mul(R(2));
  const tail=p.mul(R(2)).div(R(2*terms+1).mul(one.sub(t2)));
  return{lower,upper:lower.add(tail)};
}
// logUnitBounds excludes the right endpoint 2, so compute log 2 directly
// with t=1/3 and the same positive-tail estimate.
function logTwoBounds(terms=18){
  const t=R(1,3),t2=t.mul(t);let p=t,s=zero;
  for(let j=0;j<terms;j++){s=s.add(p.div(R(2*j+1)));p=p.mul(t2);}
  const lower=s.mul(R(2));
  return{lower,upper:lower.add(p.mul(R(2)).div(R(2*terms+1).mul(one.sub(t2))))};
}
const ln2=logTwoBounds();
function logBounds(x){
  assert(x.cmp(one)>=0,"positive log range");
  let pow=one,k=0;
  while(x.cmp(pow.mul(R(2)))>=0){pow=pow.mul(R(2));k++;}
  const y=x.div(pow),u=logUnitBounds(y);
  return{lower:ln2.lower.mul(R(k)).add(u.lower),
    upper:ln2.upper.mul(R(k)).add(u.upper)};
}
const logScale=1000000000000n;
function roundedLogBounds(x){
  const b=logBounds(x);
  const lower=R((b.lower.n*logScale)/b.lower.d,logScale);
  const upper=R((b.upper.n*logScale+b.upper.d-1n)/b.upper.d,logScale);
  assert(lower.cmp(b.lower)<=0&&upper.cmp(b.upper)>=0,"log rounding failed");
  return{lower,upper};
}
const ln8=roundedLogBounds(R(8)),ln9=roundedLogBounds(R(9));
const lnNineEighths=roundedLogBounds(R(9,8));
const lnTarget=roundedLogBounds(R(374,125));

// Certified upper bounds for 2^(2p/grid).
const pow2Upper=[];
for(let p=0;p<=grid;p++){
  let numerator=BigInt(Math.ceil(Math.pow(2,2*p/grid)*Number(scale)))+1n;
  const rhs=2n**BigInt(2*p)*scale**BigInt(grid);
  while(numerator**BigInt(grid)<=rhs)numerator++;
  pow2Upper[p]=new Rat(numerator,scale);
  assert(numerator**BigInt(grid)>rhs,`power upper bound failed at p=${p}`);
}

function rNormUpper(i1,i2,i3){
  // a <= (i3+1-i1)/grid, b <= (i3+1-i2)/grid,
  // c3 <= (i3+1)/grid.
  const A=pow2Upper[i3+1-i1];
  const B=pow2Upper[i3+1-i2];
  const C=pow2Upper[i3+1];
  return one.add(radial).mul(one.add(A).add(B)).add(radial.mul(C));
}

const anchorKinds=["0","L","B"];
const anchorCoefficient={"0":12,"L":9,"B":8};
function anchorInterval(kind,lo,hi){
  if(kind==="0")return{lo:zero.sub(hi),hi:zero.sub(lo)};
  if(kind==="L")return{lo:lMin.sub(hi),hi:lMax.sub(lo)};
  // Every admissible c_i satisfies c_i<B, so B-c_i is positive.  Taking
  // max with zero is a domain constraint, not a sampling assumption.
  return{lo:maxRat([zero,bMin.sub(hi)]),hi:bMax.sub(lo)};
}

function coordinateIntervals(i1,i2,i3){
  const is=[i1,i2,i3];
  return{
    lows:is.map(i=>R(i,grid)),
    highs:is.map(i=>minRat([R(i+1,grid),bMax]))
  };
}

function gcdInt(a,b){while(b)[a,b]=[b,a%b];return Math.abs(a);}
const logKCache=new Map();
function primitiveAnchorData(qs){
  const ks=qs.map(q=>anchorCoefficient[q]);
  let g=12;for(const k of ks)g=gcdInt(g,k);
  const as=ks.map(k=>k/g),rhs=12/g;
  const K=(2*ks.reduce((a,b)=>a+b,0)+12)/g;
  if(!logKCache.has(K))logKCache.set(K,roundedLogBounds(R(K)));
  return{as,rhs,K,lnK:logKCache.get(K)};
}

function uniqueEndpointNonzero(es,data){
  // A unique lowest base has constant coefficient -a_i (or -rhs), so
  // divisibility by 8X^M-9 would force that coefficient to be divisible by 9.
  const lows=es.map((e,i)=>({lo:e.lo,hi:e.hi,a:data.as[i]}));
  lows.push({lo:zero,hi:eps,a:data.rhs});
  for(let i=0;i<lows.length;i++){
    if(lows.every((x,j)=>i===j||lows[i].hi.cmp(x.lo)<0)&&lows[i].a%9!==0)
      return true;
  }
  // A unique highest shifted base has leading coefficient a_i (or -rhs),
  // whereas divisibility would force the leading coefficient to be a
  // multiple of 8.
  const highs=es.map((e,i)=>({lo:e.lo,hi:e.hi.add(eps),a:data.as[i]}));
  highs.push({lo:zero,hi:eps,a:data.rhs});
  for(let i=0;i<highs.length;i++){
    if(highs.every((x,j)=>i===j||highs[i].lo.cmp(x.hi)>0)&&highs[i].a%8!==0)
      return true;
  }
  return false;
}

function generalAnchorDeficit(i1,i2,i3){
  const {lows,highs}=coordinateIntervals(i1,i2,i3);
  let best=null,bestLabel=null,bestS=null,nonzeroPatterns=0;
  for(const q1 of anchorKinds)for(const q2 of anchorKinds)for(const q3 of anchorKinds){
    const qs=[q1,q2,q3];
    const es=[anchorInterval(q1,lows[0],highs[0]),
      anchorInterval(q2,lows[1],highs[1]),anchorInterval(q3,lows[2],highs[2])];
    const data=primitiveAnchorData(qs);
    if(!uniqueEndpointNonzero(es,data))continue;
    nonzeroPatterns++;
    const u=minRat([zero,...es.map(e=>e.lo)]);
    const v=maxRat([eps,...es.map(e=>e.hi.add(eps))]);
    const width=v.sub(u);
    let sMax=0;
    while(mMin.mul(R(sMax+1)).cmp(width)<=0)sMax++;
    let worst=null,worstS=null;
    for(let s=0;s<=sMax;s++){
      let dUpper=width.sub(mMin.mul(R(s)));
      if(dUpper.cmp(mMax)>0)dUpper=mMax;
      if(dUpper.cmp(zero)<0)continue;
      // If m=sM+d, exact folding and ||P||_1<=K give
      // E <= (81/64)(K 9^s)^2.  No folded content is divided out.
      const bracket=data.lnK.upper.add(ln9.upper.mul(R(s))).add(lnNineEighths.upper);
      const bound=dUpper.mul(ln8.upper).add(mMax.mul(bracket));
      if(worst===null||bound.cmp(worst)>0){worst=bound;worstS=s;}
    }
    if(worst===null)continue;
    const deficit=worst.sub(lnTarget.lower);
    if(best===null||deficit.cmp(best)<0){
      best=deficit;bestLabel=q1+q2+q3;bestS=worstS;
    }
  }
  return{deficit:best,label:bestLabel,wraps:bestS,nonzeroPatterns};
}
function shortAnchorDeficit(i1,i2,i3){
  const {lows,highs}=coordinateIntervals(i1,i2,i3);
  let best=null,bestLabel=null;
  for(const q1 of anchorKinds)for(const q2 of anchorKinds)for(const q3 of anchorKinds){
    const es=[anchorInterval(q1,lows[0],highs[0]),
      anchorInterval(q2,lows[1],highs[1]),anchorInterval(q3,lows[2],highs[2])];
    const u=minRat([zero,...es.map(e=>e.lo)]);
    const v=maxRat([eps,...es.map(e=>e.hi.add(eps))]);
    const deficit=v.sub(u).sub(mMin);
    if(best===null||deficit.cmp(best)<0){best=deficit;bestLabel=q1+q2+q3;}
  }
  return{deficit:best,label:bestLabel};
}

function q0LLDeficit(i1,i2,i3){
  const {lows,highs}=coordinateIntervals(i1,i2,i3);
  const x1Hi=highs[0],x2Lo=lows[1],x3Hi=highs[2];
  const h=maxRat([x1Hi,x3Hi.sub(lMin)]);
  const b=h.add(lMax).sub(x2Lo);
  const m=maxRat([h,b]).add(eps);
  return m.mul(R(4)).sub(mMin.mul(R(7)));
}

let boxes=0,rClosed=0,shortClosed=0,q0LLClosed=0,generalAnchorClosed=0,residual=0;
let minRSlack=null,minShortSlack=null,minQ0LLSlack=null,minGeneralAnchorSlack=null;
const residualRows=[];
let hardestResidual=null;
const closestByMethod=new Map(),residualWinnerCounts=new Map();
const maxIndex=Math.ceil(bMax.toNumber()*grid)-1;

function rememberResidual(row){
  residualRows.push(row);
  residualRows.sort((a,b)=>a.score-b.score);
  if(residualRows.length>12)residualRows.pop();
}

for(let i1=0;i1<=maxIndex;i1++)for(let i2=i1;i2<=maxIndex;i2++)
  for(let i3=i2;i3<=maxIndex;i3++){
    if(caseIndices&&(i1!==caseIndices[0]||i2!==caseIndices[1]||i3!==caseIndices[2]))continue;
    // The box intersects x3 < b only if its lower endpoint is below bMax.
    if(R(i3,grid).cmp(bMax)>=0)continue;
    boxes++;
    const q=rNormUpper(i1,i2,i3),rSlack=target2.sub(q);
    if(rSlack.cmp(zero)>0){
      rClosed++;if(minRSlack===null||rSlack.cmp(minRSlack)<0)minRSlack=rSlack;continue;
    }
    const s=shortAnchorDeficit(i1,i2,i3);
    if(s.deficit.cmp(zero)<0){
      shortClosed++;const sl=zero.sub(s.deficit);
      if(minShortSlack===null||sl.cmp(minShortSlack)<0)minShortSlack=sl;continue;
    }
    const d=q0LLDeficit(i1,i2,i3);
    if(d.cmp(zero)<0){
      q0LLClosed++;const sl=zero.sub(d);
      if(minQ0LLSlack===null||sl.cmp(minQ0LLSlack)<0)minQ0LLSlack=sl;continue;
    }
    const ga=generalAnchorDeficit(i1,i2,i3);
    if(ga.deficit!==null&&ga.deficit.cmp(zero)<0){
      generalAnchorClosed++;const sl=zero.sub(ga.deficit);
      if(minGeneralAnchorSlack===null||sl.cmp(minGeneralAnchorSlack)<0)
        minGeneralAnchorSlack=sl;
      continue;
    }
    residual++;
    const rd=q.sub(target2).toNumber();
    const sd=s.deficit.toNumber();
    const qd=d.toNumber();
    const gad=ga.deficit===null?Infinity:ga.deficit.toNumber();
    const values={rNorm:rd,short:sd,q0LL:qd,generalAnchor:gad};
    const winner=Object.entries(values).reduce((x,y)=>x[1]<=y[1]?x:y)[0];
    residualWinnerCounts.set(winner,(residualWinnerCounts.get(winner)||0)+1);
    const {lows,highs}=coordinateIntervals(i1,i2,i3);
    const row={i1,i2,i3,box:lows.map((x,j)=>[x.toString(),highs[j].toString()]),
      score:Math.min(rd,sd,qd,gad),winner,rDeficit:rd,
      rDeficitExact:q.sub(target2).toString(),
      shortDeficit:sd,shortDeficitExact:s.deficit.toString(),
      shortAnchor:s.label,q0LLDeficit:qd,q0LLDeficitExact:d.toString(),
      generalAnchorDeficit:gad,
      generalAnchorDeficitExact:ga.deficit===null?"none":ga.deficit.toString(),
      generalAnchor:ga.label,generalAnchorWraps:ga.wraps,
      generalAnchorNonzeroPatterns:ga.nonzeroPatterns};
    rememberResidual(row);
    if(hardestResidual===null||row.score>hardestResidual.score)hardestResidual=row;
    for(const [method,value] of Object.entries(values)){
      const old=closestByMethod.get(method);
      if(!old||value<old.value)closestByMethod.set(method,{value,row});
    }
  }

assert(rClosed+shortClosed+q0LLClosed+generalAnchorClosed+residual===boxes,
  "box partition count failed");
if(!caseIndices&&grid===100){
  assert(boxes===35990&&rClosed===12593&&shortClosed===11457&&
    q0LLClosed===6276&&generalAnchorClosed===3957&&residual===1707,
  "grid-100 interval-cover regression changed");
}
if(!caseIndices&&grid===200){
  assert(boxes===280840&&rClosed===100491&&shortClosed===90634&&
    q0LLClosed===48828&&generalAnchorClosed===29313&&residual===11574,
  "grid-200 interval-cover regression changed");
}

console.log(`grid=${grid}`);
console.log(`simplex_boxes=${boxes}`);
console.log(`rnorm_closed_boxes=${rClosed}`);
console.log(`short_anchor_closed_boxes=${shortClosed}`);
console.log(`q0LL_closed_boxes=${q0LLClosed}`);
console.log(`general_anchor_closed_boxes=${generalAnchorClosed}`);
console.log(`residual_boxes=${residual}`);
console.log(`min_rnorm_slack=${minRSlack?minRSlack.toString():"none"}`);
console.log(`min_short_anchor_slack=${minShortSlack?minShortSlack.toString():"none"}`);
console.log(`min_q0LL_slack=${minQ0LLSlack?minQ0LLSlack.toString():"none"}`);
console.log(`min_general_anchor_slack=${minGeneralAnchorSlack?minGeneralAnchorSlack.toString():"none"}`);
console.log(`residual_winner_counts=${JSON.stringify(Object.fromEntries(residualWinnerCounts))}`);
if(hardestResidual)console.log("hardest_residual="+JSON.stringify(hardestResidual));
for(const [method,item] of closestByMethod)
  console.log(`closest_residual_${method}=`+JSON.stringify(item.row));
for(const row of residualRows)console.log("residual="+JSON.stringify(row));
console.log("isolated_normalized_box_cover_passed=true");
