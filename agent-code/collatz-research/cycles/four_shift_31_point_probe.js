#!/usr/bin/env node
"use strict";

/* Floating diagnostic for the no-alias M-fold bound in the 3+1 gate. */
function gcd(a,b){while(b)[a,b]=[b,a%b];return Math.abs(a);}
const kappa=[12,9,8],patterns=[];
for(let a=0;a<3;a++)for(let b=0;b<3;b++)patterns.push([a,b]);
function score(ell,c,e,A,pattern){
  const r=[c,e],anchors=pattern.map(q=>q===0?0:q===1?ell:ell+1);
  const t=anchors.map((x,i)=>x-r[i]),lo=Math.min(0,...t),hi=Math.max(0,...t);
  const span=hi-lo;if(span>=2)return Infinity;
  const Q=Math.floor(span+1e-12),delta=span-Q;
  const raw=[A*kappa[pattern[0]],9*kappa[pattern[1]]];
  const g=gcd(gcd(108,raw[0]),raw[1]),co=[raw[0]/g,raw[1]/g],f=108/g;
  let U=0;
  for(let i=0;i<2;i++){
    const p=t[i]-lo;
    for(const off of [0,1e-12]){const amp=Q===0?co[i]:(p+off<1?8:9)*co[i];U+=amp*amp;}
  }
  const p=-lo,fa=Q===0?f:(p+1e-12<1?8:9)*f;U+=fa*fa;
  const mu=1/(2*ell+1);
  return mu*(delta*Math.log(8)+0.5*Math.log(81*U/64));
}
const den=Number(process.argv[2]||100),ellSteps=Number(process.argv[3]||9);
for(const A of [23,29])for(const order of ["ce","ec"]){
  let total=0,closed=0,worst={margin:Infinity};const target=Math.log(2.999);
  for(let h=0;h<ellSteps;h++){
    const ell=829/342+(2.5-829/342)*(h+.5)/ellSteps,B=ell+1;
    for(let i=1;i<den;i++)for(let j=1;j<den;j++){
      const c=B*i/den,e=B*j/den;if(c===e)continue;
      if((order==="ce")!==(c<e))continue;
      if(A===23&&!(c<ell)||A===29&&!(c>=ell))continue;
      let best=Infinity,label="";for(const p of patterns){const s=score(ell,c,e,A,p);if(s<best){best=s;label=p.join("");}}
      const margin=target-best;total++;if(margin>0)closed++;if(margin<worst.margin)worst={margin,ell,c,e,label,best};
    }
  }
  console.log(`A=${A} order=${order} total=${total} closed=${closed} fraction=${closed/total} worst=${JSON.stringify(worst)}`);
}

