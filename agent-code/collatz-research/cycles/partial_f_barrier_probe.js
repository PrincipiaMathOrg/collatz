#!/usr/bin/env node
"use strict";

const maxQ = Number(process.argv[2] || 10000000);
let bestEven = null;
let bestAll = null;
for (let q0n = 2; q0n <= maxQ; ++q0n) {
  const q0 = BigInt(q0n);
  const den = q0*q0;
  let z = q0;
  const seen = new Set();
  for (let n = 0; n < 10000; ++n) {
    const key=z.toString();
    if (seen.has(key)) break;
    seen.add(key);
    const row={q0:q0n,z,den,n};
    if (bestAll===null || z*bestAll.den>bestAll.z*den) bestAll=row;
    if ((z&1n)===0n && (bestEven===null || z*bestEven.den>bestEven.z*den)) bestEven=row;
    if ((z&1n)===0n) z=3n*z/2n;
    else if ((z&3n)===1n) z=(3n*z+1n)/4n;
    else break;
  }
}
const replacer=(_,v)=>typeof v==="bigint"?v.toString():v;
console.log("all="+JSON.stringify(bestAll,replacer));
console.log("even="+JSON.stringify(bestEven,replacer));
