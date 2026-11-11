#!/usr/bin/env node
"use strict";

// Diagnostic for a one-step induction of Q+2 >= 2^U.  It enumerates the
// no-SSS cylinders in the lower dyadic band and records their endpoint state
// immediately before every height-increment step.

function bitLength(n) { return n.toString(2).length; }
function eOfR(r) { return bitLength(3n ** BigInt(r) - 1n) - r; }

const maxDepth = Number(process.argv[2] || 35);
const finalE = eOfR(maxDepth + 1);
let states = [{q:1n,z:1n,M:1n,A:1n,V:0,run:0,path:""}];

for (let n = 0; n < maxDepth; ++n) {
  const r = n + 1;
  const e = eOfR(r);
  const nextE = eOfR(r + 1);
  const increment = nextE - e;
  const critical = [];
  const band = [];
  for (const x of states) {
    const U = e - 1 - x.V;
    if (U < 1) continue;
    const low = 1n << BigInt(U);
    if (x.q + 2n >= low && x.q + 2n < 2n * low) {
      band.push({q:x.q.toString(),z:x.z.toString(),U,V:x.V,
        run:x.run,zmod8:Number(x.z&7n),path:x.path});
    }
  }
  if (increment === 1) {
    for (const x of states) {
      const U = e - 1 - x.V;
      if (U < 0) continue;
      const low = 1n << BigInt(Math.max(U, 0));
      if (x.q + 2n >= low && x.q + 2n < 2n * low) {
        critical.push({q:x.q.toString(),z:x.z.toString(),U,V:x.V,
          run:x.run,zmod8:Number(x.z & 7n),path:x.path});
      }
    }
  }
  if (critical.length) {
    critical.sort((a,b) => BigInt(a.q) < BigInt(b.q) ? -1 : 1);
    console.log(JSON.stringify({n,r,e,nextE,criticalCount:critical.length,
      critical:critical.slice(0,30)}));
  }
  if (band.length) {
    band.sort((a,b)=>BigInt(a.q)<BigInt(b.q)?-1:1);
    console.log(JSON.stringify({BAND:true,n,r,e,count:band.length,rows:band.slice(0,30)}));
  }
  const q14 = states.filter(x => x.q === 14n);
  if (q14.length) console.log(JSON.stringify({n,r,e,q14:q14.slice(0,5).map(x=>({z:x.z.toString(),V:x.V,run:x.run,path:x.path}))}));

  const next = [];
  for (const x of states) {
    const jo = x.z & 1n;
    const io = x.z + jo * x.A;
    next.push({q:x.q + jo*x.M,z:3n*io/2n,M:2n*x.M,A:3n*x.A,
      V:x.V,run:0,path:x.path+"O"});
    if (x.run < 2) {
      let js=0n; while (((x.z+js*x.A)&3n)!==1n) ++js;
      const is=x.z+js*x.A;
      next.push({q:x.q+js*x.M,z:(3n*is+1n)/4n,M:4n*x.M,A:3n*x.A,
        V:x.V+1,run:x.run+1,path:x.path+"S"});
    }
  }
  // Only a state in or below the next lower band can ever threaten the next
  // induction step because q is monotone under further lifts.
  states = next.filter(x => {
    const U = finalE - 1 - x.V;
    if (U < 0) return true;
    return x.q + 2n < (1n << BigInt(U + 1));
  });
}
