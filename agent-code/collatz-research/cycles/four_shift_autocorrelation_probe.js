#!/usr/bin/env node
"use strict";

/* Exact small-support diagnostic for the autocorrelation energy of
 * H_T=(X-1) sum X^(c*-c)-X^(c*+1), |T|=4. */

const maxC=Number(process.argv[2]||80);
let count=0,min=null,minByMass=new Map();
for(let a=1;a<=maxC-3;a++)for(let b=a+1;b<=maxC-2;b++)
for(let c=b+1;c<=maxC-1;c++)for(let d=c+1;d<=maxC;d++){
  const coeff=new Map();
  const add=(e,v)=>coeff.set(e,(coeff.get(e)||0)+v);
  for(const x of [a,b,c,d]){const e=d-x;add(e+1,1);add(e,-1);}
  add(d+1,-1);
  for(const [e,v] of [...coeff])if(v===0)coeff.delete(e);
  const exponents=[...coeff.keys()].sort((x,y)=>x-y);
  const mass=exponents.reduce((s,e)=>s+coeff.get(e)**2,0);
  let corrEnergy=0,maxCorr=0;
  for(let k=1;k<=d+1;k++){
    let r=0;for(const e of exponents)if(coeff.has(e+k))r+=coeff.get(e)*coeff.get(e+k);
    corrEnergy+=2*r*r;maxCorr=Math.max(maxCorr,Math.abs(r));
  }
  const record={a,b,c,d,mass,corrEnergy,maxCorr,support:exponents.length,
    coeff:[...coeff].sort((x,y)=>x[0]-y[0])};
  if(min===null||corrEnergy<min.corrEnergy)min=record;
  const old=minByMass.get(mass);if(!old||corrEnergy<old.corrEnergy)minByMass.set(mass,record);
  count++;
}
console.log(`max_c=${maxC}`);
console.log(`sets=${count}`);
console.log(`global_min=${JSON.stringify(min)}`);
for(const [mass,r] of [...minByMass].sort((x,y)=>x[0]-y[0]))
  console.log(`mass_${mass}=${JSON.stringify(r)}`);

