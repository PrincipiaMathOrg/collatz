#!/usr/bin/env node
"use strict";

/* Diagnostic coefficient ledger for the 3+1 gate after decomposing both
 * positive exponents through M,E,F.  It deliberately over-enumerates
 * Euclidean digits; no finite scan over periods is involved.
 */

function bgcd(a,b){a=a<0n?-a:a;b=b<0n?-b:b;while(b)[a,b]=[b,a%b];return a;}
function pow(p,n){return BigInt(p)**BigInt(n);}

const digits=[];
for(let q=0;q<=3;q++)for(let a=0;a<=2;a++)for(let b=0;b<=3;b++){
  if(q===3&&a!==0)continue;
  if(a===2&&b!==0)continue;
  // z^k = 2^v2 3^v3 z^w.
  digits.push({q,a,b,v2:-3*q+8*a-19*b,v3:2*q-5*a+12*b});
}

function primitive(A,d1,d2){
  const terms=[
    {base:2*A,v2:d1.v2,v3:d1.v3},
    {base:18,v2:d2.v2,v3:d2.v3},
    {base:27,v2:0,v3:0},
  ];
  const min2=Math.min(...terms.map(t=>t.v2));
  const min3=Math.min(...terms.map(t=>t.v3));
  const vals=terms.map(t=>BigInt(t.base)*pow(2,t.v2-min2)*pow(3,t.v3-min3));
  const g=vals.reduce(bgcd);return vals.map(x=>x/g);
}
function vp(x,p){let n=0;const P=BigInt(p);while(x%P===0n){x/=P;n++;}return n;}
function lnBigInt(x){
  const h=x.toString(16),take=Math.min(13,h.length);
  const lead=parseInt(h.slice(0,take),16);
  return Math.log(lead)+(h.length-take)*4*Math.log(2);
}

function mPrimitive(A,q1,q2){
  const Q=Math.max(q1,q2),vals=[
    2n*BigInt(A)*3n**BigInt(2*q1)*2n**BigInt(3*(Q-q1)),
    18n*3n**BigInt(2*q2)*2n**BigInt(3*(Q-q2)),
    27n*2n**BigInt(3*Q),
  ],g=vals.reduce(bgcd);return vals.map(x=>x/g);
}

for(const A of [23,29]){
  let total=0,close=0,worst=-Infinity,worstData=null;
  const qRuns=A===23?[1,2,3]:[0];
  for(const q1 of qRuns)for(const q2 of [0,1,2,3]){
    total++;const [C,Q,R]=mPrimitive(A,q1,q2),S=2n*C+2n*Q+R;
    const vals={c2:vp(C,2),c3:vp(C,3),q2:vp(Q,2),q3:vp(Q,3),r2:vp(R,2),r3:vp(R,3)};
    let local=-Infinity;
    for(const x of [0,1])for(const y of [0,1]){
      const m=Math.max(x,y);
      const V2=Math.min(vals.c2+3*(m-x),vals.q2+3*(m-y),vals.r2+3*m);
      const V3=Math.min(vals.c3+2*x,vals.q3+2*y,vals.r3);
      const score=3*m*Math.log(2)+lnBigInt(S)+Math.log(9/8)-V2*Math.log(2)-V3*Math.log(3);
      local=Math.max(local,score);
    }
    if(local<1000/171*Math.log(2.99))close++;
    if(local>worst){worst=local;worstData={q1,q2,C:C.toString(),Q:Q.toString(),R:R.toString(),vals};}
  }
  console.log(`M_GRID_A=${A} pairs=${total} close=${close} worst_score=${worst} threshold=${1000/171*Math.log(2.99)} worst=${JSON.stringify(worstData)}`);
}
if(process.argv.includes("m-only"))process.exit(0);

for(const A of [23,29]){
  let total=0,close=0,fail=0,maxBits=0;const failures=[];
  for(const x of digits)for(const y of digits){
    if(A===23&&x.q===0)continue;
    if(A===29&&x.q!==0)continue;
    total++;const [C,Q,R]=primitive(A,x,y);
    const K=2n**20n*(C+Q+R);
    // Exact F/r<21/1000 target K^(21/1000)<299/100.
    const ok=K**21n*100n**1000n<299n**1000n;
    const bits=K.toString(2).length;maxBits=Math.max(maxBits,bits);
    if(ok)close++;else{
      fail++;
      if(failures.length<30)failures.push({x,y,C:C.toString(),Q:Q.toString(),R:R.toString(),bits});
    }
  }
  console.log(`A=${A} digits=${digits.length} pairs=${total} F_close=${close} F_fail=${fail} max_K_bits=${maxBits}`);
  for(const f of failures)console.log(JSON.stringify(f));
}

const hdigits=[];
for(const d of digits){
  const tmax=d.b===3?5:6;
  for(let t=0;t<=tmax;t++)hdigits.push({...d,t,v2:d.v2-84*t,v3:d.v3+53*t});
}
for(const A of [23,29]){
  let total=0,close=0,fail=0,maxBits=0;const failures=[];
  for(const x of hdigits)for(const y of hdigits){
    if(A===23&&x.q===0)continue;
    if(A===29&&x.q!==0)continue;
    total++;const [C,Q,R]=primitive(A,x,y);
    const K=2n**85n*(C+Q+R);
    const ok=K*100n**306n<299n**306n;
    const bits=K.toString(2).length;maxBits=Math.max(maxBits,bits);
    if(ok)close++;else if(failures.length<20){fail++;failures.push({x,y,bits});}else fail++;
  }
  console.log(`H_A=${A} digits=${hdigits.length} pairs=${total} H_close=${close} H_fail=${fail} max_K_bits=${maxBits}`);
  for(const f of failures)console.log(JSON.stringify(f));
}

// Adelic H-resultant diagnostic.  The p-adic root valuation bounds are
// V_3/n >= min(v3(c_j)+53 j/n) and
// V_2/n >= min(v2(c_j)+84(m-j)/n).
for(const A of [23,29]){
  let total=0,close=0,fail=0;let worst=-Infinity,worstData=null;
  for(const x of hdigits)for(const y of hdigits){
    if(A===23&&x.q===0)continue;if(A===29&&x.q!==0)continue;
    const coarseX={...x,v2:x.v2+84*x.t,v3:x.v3-53*x.t};
    const coarseY={...y,v2:y.v2+84*y.t,v3:y.v3-53*y.t};
    const [FC,FQ,FR]=primitive(A,coarseX,coarseY);
    const KF=2n**20n*(FC+FQ+FR);
    if(KF**21n*100n**1000n<299n**1000n)continue;
    total++;const [C,Q,R]=primitive(A,x,y),S=C+Q+R;
    const vals={c2:vp(C,2),c3:vp(C,3),q2:vp(Q,2),q3:vp(Q,3),r2:vp(R,2),r3:vp(R,3)};
    let localWorst=-Infinity;
    const xub=(x.t===6||(x.b===3&&x.t===5))?0.5:1;
    const yub=(y.t===6||(y.b===3&&y.t===5))?0.5:1;
    for(const sx of [0,xub])for(const sy of [0,yub]){
      const m=Math.max(sx,sy);
      const V2=Math.min(vals.c2+84*(m-sx),vals.q2+84*(m-sy),vals.r2+84*m);
      const V3=Math.min(vals.c3+53*sx,vals.q3+53*sy,vals.r3);
      const score=84*m*Math.log(2)+Math.log(2)+lnBigInt(S)+(53*Math.log(3)-84*Math.log(2))-V2*Math.log(2)-V3*Math.log(3);
      localWorst=Math.max(localWorst,score);
    }
    if(localWorst<306*Math.log(2.99))close++;else fail++;
    if(localWorst>worst){worst=localWorst;worstData={x,y,C:C.toString(),Q:Q.toString(),R:R.toString(),vals};}
  }
  console.log(`FH_ADELIC_A=${A} F_failed_subpairs=${total} H_close=${close} H_fail=${fail} worst_score=${worst} threshold=${306*Math.log(2.99)}`);
  console.log("H_ADELIC_WORST="+JSON.stringify(worstData));
}

const idigits=[];
for(const d of hdigits){
  const special=d.t===6||(d.b===3&&d.t===5);
  const umax=special?0:2;
  for(let u=0;u<=umax;u++)idigits.push({...d,u,v2:d.v2+485*u,v3:d.v3-306*u});
}

for(const A of [23,29]){
  let total=0,close=0,fail=0,worst=-Infinity,worstData=null;
  for(const x of idigits)for(const y of idigits){
    if(A===23&&x.q===0)continue;if(A===29&&x.q!==0)continue;
    total++;const [C,Q,R]=primitive(A,x,y),S=C+Q+R;
    const vals={c2:vp(C,2),c3:vp(C,3),q2:vp(Q,2),q3:vp(Q,3),r2:vp(R,2),r3:vp(R,3)};
    let localWorst=-Infinity;
    // A quotient u=2 leaves a residual below J<I; using the full unit
    // interval is conservative here.
    for(const sx of [0,1])for(const sy of [0,1]){
      const m=Math.max(sx,sy);
      const V2=Math.min(vals.c2+485*sx,vals.q2+485*sy,vals.r2);
      const V3=Math.min(vals.c3+306*(m-sx),vals.q3+306*(m-sy),vals.r3+306*m);
      const score=306*m*Math.log(3)+Math.log(2)+lnBigInt(S)+(485*Math.log(2)-306*Math.log(3))-V2*Math.log(2)-V3*Math.log(3);
      localWorst=Math.max(localWorst,score);
    }
    if(localWorst<665*Math.log(2.99))close++;else fail++;
    if(localWorst>worst){worst=localWorst;worstData={x,y,C:C.toString(),Q:Q.toString(),R:R.toString(),vals};}
  }
  console.log(`I_ADELIC_A=${A} digits=${idigits.length} pairs=${total} close=${close} fail=${fail} worst_score=${worst} threshold=${665*Math.log(2.99)}`);
  console.log("I_ADELIC_WORST="+JSON.stringify(worstData));
}
