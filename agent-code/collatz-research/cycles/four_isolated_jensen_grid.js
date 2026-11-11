#!/usr/bin/env node
"use strict";

/* Floating diagnostic only.  Sample the four-residue simplex and evaluate
 * the actual M-folded polynomial at a large simulated M.  Besides the
 * ordinary Parseval bound, apply the global quadratic majorant
 *
 * log y <= log(mu)+(y-mu)/mu-c(mu,K)(y-mu)^2,
 * c=(K-1-log K)/(mu^2(K-1)^2), 0<y<=K mu.
 *
 * This tests whether spectral variance can supply a uniform gap. */

function gcd(a,b){while(b)[a,b]=[b,a%b];return Math.abs(a);}
const kval=[36,32,27,24],patterns=[];
for(let a=0;a<4;a++)for(let b=a;b<4;b++)
for(let c=b;c<4;c++)for(let d=c;d<4;d++)patterns.push([a,b,c,d]);
const target=Math.log(374/125),SIM_M=Number(process.argv[4]||100000);
const maxD=Number(process.argv[5]||1);

function evaluate(ell,cn,pattern){
  const M=SIM_M,L=Math.round(ell*M),B=L+M;
  const c=cn.map(x=>Math.round(x*M));
  const anchors=pattern.map(q=>q===0?0:q===1?M:q===2?L:B);
  const t=anchors.map((q,i)=>q-c[i]);
  const h=-Math.min(0,...t);
  let g=36;for(const q of pattern)g=gcd(g,kval[q]);
  const raw=[];
  for(let i=0;i<4;i++){
    raw.push([h+t[i]+1,kval[pattern[i]]/g]);
    raw.push([h+t[i],-kval[pattern[i]]/g]);
  }
  raw.push([h+1,-36/g]);
  const degree=Math.max(...raw.map(x=>x[0])),Q=Math.floor(degree/M),d=degree-Q*M;
  if(Q<0||Q>1)return null;
  if(d/M>maxD)return null;
  const coeff=new Map();
  for(const[e,a]of raw){
    const j=Math.floor(e/M),v=e-j*M;
    const w=a*9**j*8**(Q-j);
    coeff.set(v,(coeff.get(v)||0)+w);
  }
  for(const[v,a]of[...coeff])if(a===0)coeff.delete(v);
  if(coeff.size===0)return null;
  const rho=(9/8)**(1/M);
  const terms=[...coeff].map(([v,a])=>[v,a*rho**v]);
  let mu=0,l1=0;
  let sum=0;
  for(const[,a]of terms){mu+=a*a;l1+=Math.abs(a);sum+=a;}
  const corr=new Map();
  for(const[v,a]of terms)for(const[w,b]of terms){
    const k=(w-v+M)%M;corr.set(k,(corr.get(k)||0)+a*b);
  }
  let variance=0;
  for(const[k,a]of corr)if(k!==0)variance+=a*a;
  const ymax=l1*l1,K=ymax/mu;
  const curvature=Math.abs(K-1)<1e-14?1/(2*mu*mu):
    (K-1-Math.log(K))/(mu*mu*(K-1)*(K-1));
  const scale=1/(2*ell+1);
  const pairCount=Math.max(1,terms.length*(terms.length-1));
  const varianceLB=(sum*sum-mu)**2/pairCount;
  const plain=scale*((d/M)*Math.log(8)+.5*Math.log(mu));
  const corrected=scale*((d/M)*Math.log(8)+.5*(Math.log(mu)-curvature*variance));
  const sumCorrected=scale*((d/M)*Math.log(8)+.5*(Math.log(mu)-curvature*varianceLB));
  const coarse=scale*((d/M)*Math.log(8)+.5*Math.log(mu)-variance/(4*ymax*ymax));
  return{corrected,sumCorrected,plain,coarse,margin:target-corrected,
    sumMargin:target-sumCorrected,label:pattern.join(""),mu,variance,varianceLB,
    sum,ymax,curvature,support:coeff.size,Q,d:d/M};
}

const denominator=Number(process.argv[2]||24),ellSteps=Number(process.argv[3]||5);
let total=0,closed=0,sumClosed=0,worst=null,worstSum=null,worstPlain=null;
for(let h=0;h<ellSteps;h++){
  const ell=5698301721657743/2333003475953681+
    (46153/18896-5698301721657743/2333003475953681)*(h+.5)/ellSteps;
  const B=ell+1;
  for(let a=0;a<denominator-3;a++)for(let b=a+1;b<denominator-2;b++)
  for(let c=b+1;c<denominator-1;c++)for(let d=c+1;d<=denominator;d++){
    const x=[a,b,c,d].map(v=>B*v/denominator);
    let best=null,bestSum=null;
    for(const p of patterns){
      const e=evaluate(ell,x,p);
      if(e&&(!best||e.corrected<best.corrected))best=e;
      if(e&&(!bestSum||e.sumCorrected<bestSum.sumCorrected))bestSum=e;
    }
    if(!best)continue;
    total++;if(best.margin>0)closed++;
    if(bestSum.sumMargin>0)sumClosed++;
    if(!worst||best.margin<worst.best.margin)worst={ell,x,best};
    if(!worstSum||bestSum.sumMargin<worstSum.best.sumMargin)worstSum={ell,x,best:bestSum};
    if(!worstPlain||best.plain<worstPlain.best.plain)worstPlain={ell,x,best};
  }
}
console.log(`denominator=${denominator}`);
console.log(`ell_steps=${ellSteps}`);
console.log(`sim_M=${SIM_M}`);
console.log(`max_d_fraction=${maxD}`);
console.log(`sampled=${total}`);
console.log(`closed=${closed}`);
console.log(`sum_bound_closed=${sumClosed}`);
console.log(`target=${target}`);
console.log(`worst=${JSON.stringify(worst)}`);
console.log(`worst_sum_bound=${JSON.stringify(worstSum)}`);
console.log(`smallest_plain=${JSON.stringify(worstPlain)}`);
