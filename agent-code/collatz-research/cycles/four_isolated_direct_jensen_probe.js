#!/usr/bin/env node
"use strict";

/* Floating diagnostic only.  Test a direct X^r-2 resultant bound for
 *
 *   H(X)=(X-1) sum_i X^(c4-ci)-X^(c4+1),  |T|=4,
 *
 * using the strong-concavity estimate
 *
 *   mean(log Y) <= log(mean Y) - Var(Y)/(2 max(Y)^2),
 *   Y=|H(rho zeta)|^2, rho=2^(1/r).
 *
 * All coordinates below are normalized by r.  This is not a certificate.
 */

const grid=Number(process.argv[2]||80);
const ell0=5698301721657743/2333003475953681;
const ell1=46153/18896;
const ellSamples=Number(process.argv[3]||3);
const target=Math.log(374/125);

function polynomial(es){
  const c=new Map();
  const add=(e,a)=>c.set(e,(c.get(e)||0)+a);
  for(const e of es){add(e+1,1);add(e,-1);}
  add(es[0]+1,-1);
  for(const[e,a]of[...c])if(a===0)c.delete(e);
  return [...c].sort((x,y)=>x[0]-y[0]);
}

function evaluate(x){
  // x are c_i/r.  Exponents are c4-ci, normalized by r.
  const scale=1000000;
  const ci=x.map(v=>Math.round(scale*v));
  const es=ci.map(v=>ci[3]-v);
  const p=polynomial(es);
  const weighted=p.map(([e,a])=>[e,a*2**(e/scale)]);
  let mu=0,l1=0;
  for(const[,a]of weighted){mu+=a*a;l1+=Math.abs(a);}
  const corr=new Map();
  for(const[e,a]of weighted)for(const[f,b]of weighted){
    const k=f-e;corr.set(k,(corr.get(k)||0)+a*b);
  }
  let variance=0;
  for(const[k,a]of corr)if(k!==0)variance+=a*a;
  const B=l1*l1;
  const logBound=.5*Math.log(mu)-variance/(4*B*B);
  return{logBound,margin:target-logBound,mu,variance,B,mass:p.reduce((s,x)=>s+x[1]*x[1],0),p};
}

let worst=null,count=0;
for(let le=0;le<ellSamples;le++){
  const ell=ellSamples===1?(ell0+ell1)/2:ell0+(ell1-ell0)*le/(ellSamples-1);
  const B=(ell+1)/(2*ell+1);
  for(let a=0;a<grid;a++)for(let b=a+1;b<grid;b++)
  for(let c=b+1;c<grid;c++)for(let d=c+1;d<=grid;d++){
    const x=[a,b,c,d].map(v=>B*v/grid);
    const e=evaluate(x);count++;
    if(!worst||e.margin<worst.e.margin)worst={ell,B,x,e};
  }
}
console.log(`grid=${grid}`);
console.log(`ell_samples=${ellSamples}`);
console.log(`points=${count}`);
console.log(`target_log=${target}`);
console.log(`worst=${JSON.stringify(worst)}`);
