#!/usr/bin/env node
"use strict";

/* Floating diagnostic for a fourth-moment/Jensen correction to the full
 * M-fold bound.  It is not a certificate. */

function gcd(a,b){while(b)[a,b]=[b,a%b];return Math.abs(a);}
const kappa=[36,32,27,24],patterns=[];
for(let a=0;a<4;a++)for(let b=a;b<4;b++)
for(let c=b;c<4;c++)for(let d=c;d<4;d++)patterns.push([a,b,c,d]);
const target=Math.log(374/125),SIM_M=Number(process.argv[2]||100000);

function evaluate(ell,cn,pattern){
  const M=SIM_M,L=Math.round(ell*M),B=L+M;
  const c=cn.map(x=>Math.round(x*M));
  const anchors=pattern.map(q=>q===0?0:q===1?M:q===2?L:B);
  const t=anchors.map((q,i)=>q-c[i]);
  const h=-Math.min(0,...t);
  let g=36;for(const q of pattern)g=gcd(g,kappa[q]);
  const raw=[];
  for(let i=0;i<4;i++){
    raw.push([h+t[i]+1,kappa[pattern[i]]/g]);
    raw.push([h+t[i],-kappa[pattern[i]]/g]);
  }
  raw.push([h+1,-36/g]);
  const degree=Math.max(...raw.map(x=>x[0])),Q=Math.floor(degree/M),d=degree-Q*M;
  if(Q<0||Q>1)return null;
  const coeff=new Map();
  for(const [e,a] of raw){
    const j=Math.floor(e/M),v=e-j*M;
    const w=a*9**j*8**(Q-j);
    coeff.set(v,(coeff.get(v)||0)+w);
  }
  for(const[v,a]of[...coeff])if(a===0)coeff.delete(v);
  const rho=(9/8)**(1/M),terms=[...coeff].map(([v,a])=>[v,a*rho**v]);
  let mu=0,l1=0;for(const[,a]of terms){mu+=a*a;l1+=Math.abs(a);}
  const corr=new Map();
  for(const[v,a]of terms)for(const[w,b]of terms){
    const k=(w-v+M)%M;corr.set(k,(corr.get(k)||0)+a*b);
  }
  let variance=0;for(const[k,a]of corr)if(k!==0)variance+=a*a;
  const r1=corr.get(1)||0,rminus1=corr.get(M-1)||0;
  const upper=l1*l1,K=upper/mu;
  const curvature=Math.abs(K-1)<1e-12?0.5/(mu*mu):
    (K-1-Math.log(K))/(mu*mu*(K-1)*(K-1));
  const muRatio=1/(2*ell+1);
  const plain=muRatio*((d/M)*Math.log(8)+0.5*Math.log(mu));
  const corrected=muRatio*((d/M)*Math.log(8)+0.5*(Math.log(mu)-curvature*variance));
  return{plain,corrected,margin:target-corrected,mu,variance,r1,rminus1,upper,curvature,
    degree,Q,d,label:pattern.join(""),support:terms.length};
}

const samples=[
  [2.4424745960358445,[1.015625,1.57421875,2.1640625,3.09765625]],
  [2.4424745960358445,[0.9562429433432901,1.4343644150149353,2.008110181020909,2.9643531243641994]],
  [2.428200129954516,[0.9998917045700672,1.4284167208143816,1.856941737058696,2.9996751137102016]],
  [2.4366471734892787,[1.0023554256010396,1.4319363222871992,1.8615172189733593,3.007066276803119]],
  [2.4450942170240415,[0.28709118475200346,1.2919103313840157,1.8660927008880224,3.30154862464804]],
  [2.4535412605588043,[1.0072828676629846,1.4389755252328351,1.8706681828026859,3.0218486029889537]]
];
console.log(`sim_M=${SIM_M}`);console.log(`target_log=${target}`);
for(const[ell,c]of samples){
  let best=null;for(const p of patterns){const e=evaluate(ell,c,p);if(e&&(!best||e.corrected<best.corrected))best=e;}
  console.log(JSON.stringify({ell,c,best}));
}
