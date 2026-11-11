#!/usr/bin/env node
"use strict";

// Exact verifier for the first all-degree counterexample to Q >= 2^U - 2.

const r=72;
const N=115;
const e=N-r;
const q=159902416n;
const expectedSpikes=[4,7,11,32,39,40,43,46,54,55,56,57,65,67];
let z=q;
const spikes=[];
let least=true;
const states=[z];
for(let d=r-1;d>=1;--d){
  if((z&1n)===0n)z=3n*z/2n;
  else if((z&3n)===1n){z=(3n*z+1n)/4n;spikes.push(d);}
  else throw new Error(`inadmissible state at degree ${d}: ${z}`);
  if(z<=q)least=false;
  states.push(z);
}
spikes.sort((a,b)=>a-b);
if(JSON.stringify(spikes)!==JSON.stringify(expectedSpikes))throw new Error("spike mismatch");
const V=spikes.length;
const U=e-1-V;
const strengthened=(1n<<BigInt(U))-2n;
const direct=1n<<BigInt(U-1);
const coefficientNumerator=3n**BigInt(r-1);
const coefficientDenominator=1n<<BigInt(r-1+V);
const max=states.reduce((a,b)=>a>b?a:b);
console.log(JSON.stringify({r,N,e,q:q.toString(),U,V,spikes,least,
  endpoint:z.toString(),max:max.toString(),
  strengthened:strengthened.toString(),
  violatesStrengthened:q<strengthened,
  direct:direct.toString(),satisfiesDirect:q>direct,
  coefficientNumerator:coefficientNumerator.toString(),
  coefficientDenominator:coefficientDenominator.toString(),
  coefficientFails:q*coefficientDenominator<=coefficientNumerator,
  endpointTimesQ2Denominator:(z).toString(),
  qSquared:(q*q).toString()},null,2));
