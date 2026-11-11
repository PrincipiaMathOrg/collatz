#!/usr/bin/env node
"use strict";

/* Floating diagnostic only.  Samples the normalized four-residue simplex
 * and evaluates the no-alias full M-fold bound at each point. */

function gcd(a,b){while(b)[a,b]=[b,a%b];return Math.abs(a);}
const kappa=[36,32,27,24];
const patterns=[];
for(let a=0;a<4;a++)for(let b=a;b<4;b++)
  for(let c=b;c<4;c++)for(let d=c;d<4;d++)patterns.push([a,b,c,d]);
const target=Math.log(374/125);

function score(ell,c,pattern){
  const anchors=pattern.map(q=>q===0?0:q===1?1:q===2?ell:ell+1);
  const t=anchors.map((x,i)=>x-c[i]);
  const lo=Math.min(0,...t),hi=Math.max(0,...t),span=hi-lo+1e-12;
  if(span>=2)return Infinity;
  const Q=Math.floor(span),delta=span-Q;
  let g=36;for(const q of pattern)g=gcd(g,kappa[q]);
  const coeff=pattern.map(q=>kappa[q]/g),f=36/g;
  let U=0;
  for(let i=0;i<4;i++){
    const p=t[i]-lo;
    const neg=Q===0?coeff[i]:(p<1?8:9)*coeff[i];
    const pos=Q===0?coeff[i]:(p+1e-12<1?8:9)*coeff[i];
    U+=neg*neg+pos*pos;
  }
  const fp=-lo;
  const fa=Q===0?f:(fp+1e-12<1?8:9)*f;U+=fa*fa;
  const mu=1/(2*ell+1);
  return mu*(delta*Math.log(8)+0.5*Math.log(81*U/64));
}

const denominator=Number(process.argv[2]||24);
const ellSteps=Number(process.argv[3]||9);
let total=0,closed=0,worst={margin:Infinity};
const failures=[];
const histogram=Array(10).fill(0);
for(let h=0;h<ellSteps;h++){
  const ell=5698301721657743/2333003475953681+
    (46153/18896-5698301721657743/2333003475953681)*(h+0.5)/ellSteps;
  const B=ell+1;
  for(let a=1;a<denominator-3;a++)for(let b=a+1;b<denominator-2;b++)
    for(let c=b+1;c<denominator-1;c++)for(let d=c+1;d<denominator;d++){
      const x=[a,b,c,d].map(v=>B*v/denominator);
      let best=Infinity,label="";
      for(const p of patterns){const z=score(ell,x,p);if(z<best){best=z;label=p.join("");}}
      const margin=target-best;total++;if(margin>0)closed++;
      else if(failures.length<40)failures.push({margin,ell,x,label,best});
      const bin=Math.max(0,Math.min(9,Math.floor((margin+0.5)*10)));
      histogram[bin]++;
      if(margin<worst.margin)worst={margin,ell,x,label,best};
    }
}
console.log(`denominator=${denominator}`);
console.log(`ell_steps=${ellSteps}`);
console.log(`sampled=${total}`);
console.log(`point_bound_closed=${closed}`);
console.log(`closed_fraction=${closed/total}`);
console.log(`worst_margin=${worst.margin}`);
console.log(`worst_ell=${worst.ell}`);
console.log(`worst_c=${worst.x.join(",")}`);
console.log(`worst_anchor=${worst.label}`);
console.log(`worst_log_bound=${worst.best}`);
console.log(`target_log=${target}`);
console.log(`histogram=${histogram.join(",")}`);
for(const [i,f] of failures.entries())console.log(
  `failure_${i}=margin:${f.margin} ell:${f.ell} c:${f.x.join(",")} anchor:${f.label}`);
