#!/usr/bin/env node
"use strict";

/* Exact rational interval probe for the exactly-four run type 3+1.
 * The four cases are A=23 or 29 and c<e or e<c in
 *   (z-1)(A z^-c + 9 z^-e)=9z.
 * This is a diagnostic until every region has zero residual boxes.
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
function containsNonzeroInteger(i){
  const lo=ceilR(i[0]),hi=floorR(i[1]);
  return lo<=hi&&(lo<0n||hi>0n);
}

const ELL0=R(829n,342n),ELL1=R(5n,2n),EPS=R(1n,10000000000n);
const YMAX=R(7n,2n),GRID=100n,kval=[12n,9n,8n];
const patterns=[];for(let a=0;a<=2;++a)for(let b=a;b<=2;++b)patterns.push([a,b]);
function anchorI(q,ell){return q===0?[ZERO,ZERO]:q===1?ell:[add(ell[0],ONE),add(ell[1],ONE)];}

const RHS=64n**17100n*374n**200000n;
const LEFT_CONSTANT=125n**200000n;
const admissibleCache=new Map();
function admissible(U,A,J){
  const key=U+","+A+","+J;if(admissibleCache.has(key))return admissibleCache.get(key);
  const ok=8n**(342n*A)*(81n*U)**17100n*LEFT_CONSTANT<RHS*9n**(342n*J);
  admissibleCache.set(key,ok);return ok;
}

// y0 is the lower residue and y1 is the tail from the upper residue to B.
function feasible(box,kind){
  const lowPlusTail=add(box.y[0][0],box.y[1][0]);
  if(cmp(lowPlusTail,add(box.ell[1],ONE))>=0)return false;
  const cIsLow=kind.order==="ce";
  const high=subI(addI(box.ell,[ONE,ONE]),box.y[1]);
  const c=cIsLow?box.y[0]:high;
  // A=23 requires c<L. A=29 requires c>=L. Keep boundary-overlap boxes.
  return kind.A===23 ? cmp(c[0],box.ell[1])<0 : cmp(c[1],box.ell[0])>=0;
}

function patternCertificate(box,pattern,kind){
  const residues=[box.y[0],subI(addI(box.ell,[ONE,ONE]),box.y[1])];
  const t=pattern.map((q,i)=>subI(anchorI(q,box.ell),residues[i]));
  const lo=[rmin(ZERO,...t.map(v=>v[0])),rmin(ZERO,...t.map(v=>v[1]))];
  const hi=[rmax(ZERO,...t.map(v=>v[0])),rmax(ZERO,...t.map(v=>v[1]))];
  const span=[sub(hi[0],lo[1]),sub(hi[1],lo[0])];
  if(cmp(add(span[1],EPS),TWO)>=0)return null;

  const lowerIsC=kind.order==="ce";
  const runIndex=lowerIsC?0:1;
  const baseCoeff=lowerIsC?[BigInt(kind.A),9n]:[9n,BigInt(kind.A)];
  const raw=baseCoeff.map((v,i)=>v*kval[pattern[i]]);
  const g=bgcd(bgcd(108n,raw[0]),raw[1]);
  const coeff=raw.map(v=>v/g),finalCoeff=108n/g;
  const possibleQ=[];
  if(cmp(span[0],ONE)<0)possibleQ.push(0);
  if(cmp(add(span[1],EPS),ONE)>=0)possibleQ.push(1);
  if(!possibleQ.length)return null;

  const witnesses=[];
  for(const Q of possibleQ){
    let delta=Q===0?add(span[1],EPS):sub(add(span[1],EPS),ONE);
    if(cmp(delta,ZERO)<0)delta=ZERO;
    const Agrid=ceilR(mul(R(GRID),delta));
    const terms=[];
    for(let i=0;i<2;++i){
      const base=[sub(t[i][0],lo[1]),sub(t[i][1],lo[0])];
      terms.push({raw:t[i],pos:[base[0],add(base[1],EPS)],a:coeff[i],sign:1,source:i});
      terms.push({raw:t[i],pos:base,a:coeff[i],sign:-1,source:i});
    }
    terms.push({final:true,pos:[sub(ZERO,lo[1]),sub(EPS,lo[0])],a:finalCoeff,sign:-1});
    const amplitudes=terms.map(term=>Q===0?term.a:
      (cmp(term.pos[1],ONE)<0?8n*term.a:9n*term.a));
    // Content forced before any possible merging.  A term whose interval
    // crosses the fold may receive either 8a or 9a, so only a is forced.
    const forced=terms.map(term=>{
      if(Q===0)return term.a;
      if(cmp(term.pos[1],ONE)<0)return 8n*term.a;
      if(cmp(term.pos[0],ONE)>=0)return 9n*term.a;
      return term.a;
    });
    let foldContent=forced.reduce(bgcd);
    let unitPart=foldContent;
    while(unitPart%2n===0n)unitPart/=2n;
    while(unitPart%3n===0n)unitPart/=3n;
    if(unitPart!==1n)foldContent=1n;
    let U=0n;for(const a of amplitudes)U+=a*a;
    for(let i=0;i<terms.length;++i)for(let j=i+1;j<terms.length;++j){
      if(terms[i].sign!==terms[j].sign)continue;
      const difference=terms[j].final?
        [sub(terms[i].raw[0],EPS),terms[i].raw[1]]:subI(terms[i].raw,terms[j].raw);
      let aliases=containsInteger(difference);
      if(aliases&&!terms[i].final&&!terms[j].final&&
          terms[i].source!==terms[j].source&&
          pattern[terms[i].source]===pattern[terms[j].source]){
        // Equal anchors make the zero alias equivalent to equality of the
        // two run-start residues, which is impossible.  Nonzero M-aliases
        // remain possible and are retained.
        aliases=containsNonzeroInteger(difference);
      }
      if(aliases)U+=2n*amplitudes[i]*amplitudes[j];
    }
    // If the run term uses the B-anchor, its coefficient is 8A, while
    // every coefficient below its base exponent is divisible by 9.
    // The M-binomial has constant coefficient -9, so the first
    // min(t_run,M) ascending Sylvester columns each contain a factor 9.
    let J=0n;
    if(process.argv[5]!=="noj"&&pattern[runIndex]===2){
      const runBase=sub(t[runIndex][0],lo[1]);
      const capped=cmp(runBase,ONE)<0?runBase:ONE;
      if(cmp(capped,ZERO)>0)J=floorR(mul(R(GRID),capped));
    }
    U/=foldContent*foldContent;
    if(!admissible(U,Agrid,J))return null;
    witnesses.push({Q,A:Agrid,U,J,foldContent});
  }
  return{pattern:pattern.join(""),witnesses};
}

function certify(box,kind){for(const p of patterns){const c=patternCertificate(box,p,kind);if(c)return c;}return null;}

const MAX_DEPTH=Number(process.argv[4]||24);
function run(kind){
  const stack=[{ell:[ELL0,ELL1],y:[[ZERO,YMAX],[ZERO,YMAX]],depth:0}];
  let visited=0,discarded=0,certified=0,maxDepth=0;const residual=[],labels=new Map();
  while(stack.length){
    const box=stack.pop();visited++;maxDepth=Math.max(maxDepth,box.depth);
    if(!feasible(box,kind)){discarded++;continue;}
    const cert=certify(box,kind);
    if(cert){certified++;labels.set(cert.pattern,(labels.get(cert.pattern)||0)+1);continue;}
    if(box.depth>=MAX_DEPTH){residual.push(box);continue;}
    const dims=box.y.map((v,i)=>({kind:"y",i,w:width(v)}));
    dims.push({kind:"ell",i:0,w:mul(R(4n),width(box.ell))});
    dims.sort((a,b)=>cmp(b.w,a.w));const split=dims[0];
    if(split.kind==="ell"){
      const mid=midpoint(box.ell[0],box.ell[1]);
      stack.push({...box,ell:[box.ell[0],mid],depth:box.depth+1},{...box,ell:[mid,box.ell[1]],depth:box.depth+1});
    }else{
      const old=box.y[split.i],mid=midpoint(old[0],old[1]);
      for(const next of [[old[0],mid],[mid,old[1]]]){const y=box.y.map(v=>v);y[split.i]=next;stack.push({...box,y,depth:box.depth+1});}
    }
  }
  console.log(`case_A${kind.A}_${kind.order}: visited=${visited} discarded=${discarded} certified=${certified} residual=${residual.length} depth=${maxDepth}`);
  console.log("labels="+[...labels].sort().map(x=>x.join(":")).join(","));
  if(residual.length){
    for(const box of residual.slice(0,8))console.log("residual="+JSON.stringify(box,(k,v)=>typeof v==="bigint"?v.toString():v));
  }
  return residual.length;
}

const selectedA=process.argv[2]?Number(process.argv[2]):null;
const selectedOrder=process.argv[3]||null;
let residual=0;
for(const A of [23,29])for(const order of ["ce","ec"]){
  if(selectedA!==null&&A!==selectedA)continue;
  if(selectedOrder!==null&&order!==selectedOrder)continue;
  residual+=run({A,order});
}
console.log("total_residual="+residual);
