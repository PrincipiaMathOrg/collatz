"use strict";

// Exploratory and certificate-oriented audit for the three-isolated-shift
// resultant against 3 X^L - 4.  All logarithmic bounds are computed from
// the exact Fourier coefficient square sum after reduction modulo X^L=4/3.

function gcd(a, b) {
  while (b !== 0) [a, b] = [b, a % b];
  return Math.abs(a);
}

function add(map, e, a) {
  map.set(e, (map.get(e) || 0) + a);
  if (map.get(e) === 0) map.delete(e);
}

function intGcd(a,b){a=Math.abs(Math.round(a));b=Math.abs(Math.round(b));while(b)[a,b]=[b,a%b];return a;}
function unitContent(p) {
  let g=0;
  for(const a of p.values())g=intGcd(g,a);
  let u=1;
  while(g%2===0){u*=2;g/=2;}
  while(g%3===0){u*=3;g/=3;}
  return u;
}
function unitPrimitive(p) {
  const u=unitContent(p);
  if(u===1)return p;
  const q=new Map();for(const[e,a]of p)q.set(e,a/u);return q;
}

function hCoefficients(c1, c2, c3) {
  const a = c3 - c1;
  const b = c3 - c2;
  const h = new Map();
  add(h, a + 1, 1);
  add(h, a, -1);
  add(h, b + 1, 1);
  add(h, b, -1);
  add(h, 1, 1);
  add(h, 0, -1);
  add(h, c3 + 1, -1);
  return h;
}

function reducedBound(r, N, c1, c2, c3) {
  const L = 2 * r - N;
  const h = hCoefficients(c1, c2, c3);
  const top = Math.max(...h.keys());
  const rho2 = Math.exp(2 * Math.log(4 / 3) / L);
  if (top < L) {
    let Q = 0;
    for (const [e, a] of h) Q += a * a * Math.pow(rho2, e);
    return {logBound: top * Math.log(3) + L * Math.log(Q) / 2,
      Q, d: top, top, reduced: false};
  }
  const p = new Map();
  let rawReducedTerms = 0;
  for (const [e, a] of h) {
    ++rawReducedTerms;
    if (e < L) add(p, e, 3 * a);
    else add(p, e - L, 4 * a);
  }
  const d = top - L;
  let Q = 0;
  for (const [e, a] of p) Q += a * a * Math.pow(rho2, e);
  return {logBound: d * Math.log(3) + L * Math.log(Q) / 2,
    Q, d, top, reduced: true, p, aliasCount: rawReducedTerms-p.size};
}

function rBound(r, c1, c2, c3) {
  const h = hCoefficients(c1,c2,c3);
  const rho2 = Math.exp(2 * Math.log(2) / r);
  let Q = 0;
  for (const [e,a] of h) Q += a*a*Math.pow(rho2,e);
  return {logBound: r*Math.log(Q)/2,Q,top:Math.max(...h.keys()),rNorm:true};
}

function binomialBound(h, q, A, B, label) {
  if (q <= 0) return null;
  h=unitPrimitive(h);
  const m = Math.max(...h.keys());
  const Qwrap = Math.floor(m/q);
  const d = m-Qwrap*q;
  const w = new Map();
  for (const [e,a] of h) {
    const k = Math.floor(e/q), s=e-k*q;
    add(w,s,a*Math.pow(B,k)*Math.pow(A,Qwrap-k));
  }
  const foldContent=unitContent(w);
  const wp=unitPrimitive(w);
  w.clear(); for(const[e,a]of wp)w.set(e,a);
  if (w.size === 0) return {logBound:-Infinity,Q:0,d,label,zero:true,w};
  const rho2=Math.exp(2*Math.log(B/A)/q);
  let square=0;
  for(const [s,a] of w) square+=a*a*Math.pow(rho2,s);
  let badContent=1, tmpContent=foldContent;
  for(const prime of [2,3]){
    let pp=1;while(tmpContent%prime===0){pp*=prime;tmpContent/=prime;}
    if(A%prime===0)badContent*=pp;
  }
  square*=badContent*badContent;
  return {logBound:d*Math.log(A)+q*Math.log(square)/2,Q:square,d,
    top:m,label,w,wraps:Qwrap,foldContent,badContent};
}

function transform(h,q,A,B) {
  const m=Math.max(...h.keys()), Qwrap=Math.floor(m/q);
  const w=new Map();
  for(const [e,a] of h) {
    const k=Math.floor(e/q),s=e-k*q;
    add(w,s,a*Math.pow(B,k)*Math.pow(A,Qwrap-k));
  }
  return w;
}

function anchoredPolynomial(c1,c2,c3,L,Bdim,anchors) {
  const cs=[c1,c2,c3];
  const p=new Map();
  const kval=q=>q===0?12:(q===L?9:8);
  for(let i=0;i<3;++i) {
    const e=anchors[i]-cs[i], k=kval(anchors[i]);
    add(p,e+1,k); add(p,e,-k);
  }
  add(p,1,-12);
  const min=Math.min(...p.keys());
  if(min<0) {
    const shifted=new Map();
    for(const[e,a]of p)add(shifted,e-min,a);
    return shifted;
  }
  return p;
}

function shiftPolynomial(p,t){const q=new Map();for(const[e,a]of p)q.set(e+t,a);return q;}

function allBounds(r,N,c1,c2,c3) {
  const h=hCoefficients(c1,c2,c3);
  const L=2*r-N, M=2*N-3*r, E=8*r-5*N, F=12*N-19*r;
  const hL=transform(h,L,3,4);
  const hLM=M>0?transform(hL,M,8,9):null;
  const bounds=[rBound(r,c1,c2,c3),
    binomialBound(h,L,3,4,"L"),
    binomialBound(h,M,8,9,"M"),
    binomialBound(h,E,243,256,"E"),
    binomialBound(h,F,2**19,3**12,"F"),
    binomialBound(hL,M,8,9,"L->M"),
    binomialBound(hL,E,243,256,"L->E"),
    binomialBound(hL,F,2**19,3**12,"L->F"),
    hLM?binomialBound(hLM,E,243,256,"L->M->E"):null,
    hLM?binomialBound(hLM,F,2**19,3**12,"L->M->F"):null
  ].filter(b=>b&&!b.zero);
  if(M>0) {
    const anchors=[0,L,N-r];
    for(const q1 of anchors)for(const q2 of anchors)for(const q3 of anchors){
      const p=anchoredPolynomial(c1,c2,c3,L,N-r,[q1,q2,q3]);
      const qlabel=`${q1===0?"0":q1===L?"L":"B"},${q2===0?"0":q2===L?"L":"B"},${q3===0?"0":q3===L?"L":"B"}`;
      const shifts=new Set([0]);
      for(const e of p.keys())shifts.add((M-(e%M))%M);
      for(const t of shifts){
        const b=binomialBound(shiftPolynomial(p,t),M,8,9,`anchor(${qlabel})+${t}->M`);
        if(b&&!b.zero)bounds.push(b);
      }
    }
  }
  return bounds;
}

function isolated(T) {
  return T[1] > T[0] + 1 && T[2] > T[1] + 1;
}

function validDeformation(T, r, N) {
  const mark = new Set(T);
  const positions = Array.from({length: r}, (_, q) =>
    Math.floor(q * N / r) - (mark.has(q) ? 1 : 0));
  if (positions[0] !== 0 || positions[r - 1] >= N) return false;
  for (let q = 1; q < r; ++q) if (positions[q] <= positions[q - 1]) return false;
  return true;
}

const maxR = Number(process.argv[2] || 300);
const arbitrary = process.argv.includes("--arbitrary");
const minRArg = process.argv.find(x => x.startsWith("--min="));
const minR = minRArg ? Number(minRArg.slice(6)) : 5;
const caseArg=process.argv.find(x=>x.startsWith("--case="));
const stepArg=process.argv.find(x=>x.startsWith("--step="));
const gridStep=stepArg?Number(stepArg.slice(7)):1;
const c3minArg=process.argv.find(x=>x.startsWith("--c3min="));
const c3minFrac=c3minArg?Number(c3minArg.slice(8)):0;
const worstByWinner=new Map();
let worst = null;
const worstByAlias = new Map();
let count = 0;

for (let r = minR; r <= maxR; ++r) {
  const N = Math.ceil(Math.log2(3) * r - 1e-12);
  if (gcd(N, r) !== 1) continue;
  const B = N - r;
  if (arbitrary) {
    for (let c1 = 1; c1 < B; c1+=gridStep) {
      for (let c2 = c1 + 1; c2 < B; c2+=gridStep) {
        for (let c3 = c2 + 1; c3 < B; c3+=gridStep) {
          if(c3<c3minFrac*r)continue;
          const L = 2*r-N;
          if (c2-c1 === L || c3-c2 === L || c3-c1 === L) continue;
          const b = allBounds(r,N,c1,c2,c3).reduce((x,y)=>
            x.logBound<y.logBound?x:y);
          const margin = r * Math.log(3) - b.logBound;
          ++count;
          if (!worst || margin / r < worst.margin / worst.r)
            worst = {r,N,c1,c2,c3,margin,...b};
          const wk=b.label||"rNorm"; const ww=worstByWinner.get(wk);
          if(!ww||margin/r<ww.margin/ww.r)worstByWinner.set(wk,{r,N,c1,c2,c3,margin,...b});
          const ac = b.aliasCount || 0;
          const wa = worstByAlias.get(ac);
          if (!wa || margin/r < wa.margin/wa.r)
            worstByAlias.set(ac,{r,N,c1,c2,c3,margin,...b});
        }
      }
    }
  } else {
    const eligible = [];
    for (let q = 1; q < r; ++q) {
      const gap = Math.floor(q * N / r) - Math.floor((q - 1) * N / r);
      if (gap === 2) eligible.push(q);
    }
    for (let ii = 0; ii < eligible.length; ++ii)
      for (let jj = ii + 1; jj < eligible.length; ++jj)
        for (let kk = jj + 1; kk < eligible.length; ++kk) {
        const i = eligible[ii], j = eligible[jj], k = eligible[kk];
        const T = [i,j,k];
        if (!isolated(T)) continue;
        const residues = T.map(t => (t * N) % r).sort((a,b) => a-b);
        if (!(residues[0] >= 1 && residues[2] < B)) continue;
        const b = allBounds(r,N,...residues).reduce((x,y)=>
          x.logBound<y.logBound?x:y);
        const margin = r * Math.log(3) - b.logBound;
        ++count;
        if (!worst || margin / r < worst.margin / worst.r)
          worst = {r,N,T,residues,margin,...b};
        const ac = b.aliasCount || 0;
        const wa = worstByAlias.get(ac);
        if (!wa || margin/r < wa.margin/wa.r)
          worstByAlias.set(ac,{r,N,T,residues,margin,...b});
      }
  }
}

if(caseArg){
  const [rr,c1,c2,c3]=caseArg.slice(7).split(",").map(Number);
  const NN=Math.ceil(Math.log2(3)*rr-1e-12);
  console.log(JSON.stringify(allBounds(rr,NN,c1,c2,c3).sort((a,b)=>a.logBound-b.logBound),(k,v)=>v instanceof Map?Object.fromEntries(v):v,2));
}
console.log(JSON.stringify({minR,maxR,arbitrary,gridStep,c3minFrac,count,worst,worstByAlias,worstByWinner}, (k,v) =>
  v instanceof Map ? Object.fromEntries(v) : v, 2));
