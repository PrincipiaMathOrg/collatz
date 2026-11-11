#!/usr/bin/env node
"use strict";

/* Diagnostic coefficient audit for reducing the 5/5 gate through M,E,F. */

function gcd(a,b){a=a<0n?-a:a;b=b<0n?-b:b;while(b)[a,b]=[b,a%b];return a;}
function pow(a,e){return BigInt(a)**BigInt(e);}
function frac(n,d){const g=gcd(n,d);return[n/g,d/g];}
function lcm(a,b){return a/gcd(a,b)*b;}

const tuples=[];
for(let q=0;q<=2;++q)for(let a=0;a<=2;++a)for(let b=0;b<=3;++b){
  const [n,d]=frac(pow(3,2*q+12*b)*pow(2,8*a),
    pow(2,3*q+19*b)*pow(3,5*a));
  tuples.push({q,a,b,n,d});
}

let pass=0,fail=0,worst=null;
for(const x of tuples)for(const y of tuples){
  const den=lcm(x.d,y.d);
  const C=5n*x.n*(den/x.d);
  const Q=5n*den;
  const H=3n*y.n*(den/y.d);
  const g=gcd(gcd(C,Q),H);
  const c=C/g,q=Q/g,h=H/g;
  const sum=2n*c+2n*q+h;
  const K=(2n**20n)*sum;
  const ok=K**21n*100n**1000n<299n**1000n;
  if(ok)++pass;else{
    ++fail;
    if(worst===null||K>worst.K)worst={x,y,c,q,h,K};
  }
}
console.log("tuples="+tuples.length+" pairs="+(tuples.length**2));
console.log("F_l1_pass="+pass+" fail="+fail);
if(worst)console.log("worst="+JSON.stringify({
  x:[worst.x.q,worst.x.a,worst.x.b],y:[worst.y.q,worst.y.a,worst.y.b],
  c:String(worst.c),q:String(worst.q),h:String(worst.h),K:String(worst.K)
}));

for(const xt of [[0,2,0],[1,0,0]])for(const yt of [[1,1,2],[1,1,3]]){
  const x=tuples.find(t=>t.q===xt[0]&&t.a===xt[1]&&t.b===xt[2]);
  const y=tuples.find(t=>t.q===yt[0]&&t.a===yt[1]&&t.b===yt[2]);
  const den=lcm(x.d,y.d),C=5n*x.n*(den/x.d),Q=5n*den,H=3n*y.n*(den/y.d);
  const g=gcd(gcd(C,Q),H),c=C/g,q=Q/g,h=H/g;
  const K=2n**20n*(2n*c+2n*q+h);
  console.log("selected="+xt.join("")+":"+yt.join("")+" coeff="+[c,q,h]+" pass="+
    (K**21n*100n**1000n<299n**1000n));
}

function reduceExponent(x,dims,useG){
  let q=x/dims.M;x%=dims.M;
  let aa=x/dims.E;x%=dims.E;
  let b=x/dims.F;x%=dims.F;
  let n=pow(3,Number(2n*q+12n*b))*pow(2,Number(8n*aa));
  let d=pow(2,Number(3n*q+19n*b))*pow(3,Number(5n*aa));
  let t=0n;
  if(useG){t=x/dims.G;x%=dims.G;n*=pow(2,Number(65n*t));d*=pow(3,Number(41n*t));}
  [n,d]=frac(n,d);
  return{w:x,n,d,tuple:[q,aa,b,t]};
}

function pointAudit(rn,cn,an,useG){
  const r=BigInt(rn),N=BigInt(Math.ceil(rn*Math.log2(3)));
  const dims={M:2n*N-3n*r,E:8n*r-5n*N,F:12n*N-19n*r,G:65n*r-41n*N};
  const k=cn+an+1n;
  const source=[[5n,an+1n],[-5n,an],[5n,1n],[-5n,0n],[-3n,k]];
  const reduced=source.map(([coef,x])=>({coef,...reduceExponent(x,dims,useG)}));
  let den=1n;for(const x of reduced)den=lcm(den,x.d);
  let content=0n;for(const x of reduced)content=gcd(content,x.coef*x.n*(den/x.d));
  const collected=new Map();
  for(const x of reduced){
    const v=x.coef*x.n*(den/x.d)/content,key=String(x.w);
    collected.set(key,(collected.get(key)||0n)+v);
  }
  let U=0n;for(const v of collected.values())U+=v*v;
  const lead=useG?3n**82n:2n**38n;
  const rem=useG?dims.G:dims.F;
  const logBound=Number(rem)/Number(r)*0.5*(Math.log(Number(lead))+Math.log(65/63)+Math.log(Number(U)));
  return{dims,reduced,content,collected,U,base:Math.exp(logBound)};
}

function pointAuditBorrow(rn,cn,an,useG){
  const r=BigInt(rn),N=BigInt(Math.ceil(rn*Math.log2(3)));
  const dims={M:2n*N-3n*r,E:8n*r-5n*N,F:12n*N-19n*r,G:65n*r-41n*N};
  const d=dims.M-an,k=cn+dims.M+1n;
  const source=[[40n,d+1n],[-40n,d],[45n,1n],[-45n,0n],[-24n,k]];
  const reduced=source.map(([coef,x])=>({coef,...reduceExponent(x,dims,useG)}));
  let den=1n;for(const x of reduced)den=lcm(den,x.d);
  let content=0n;for(const x of reduced)content=gcd(content,x.coef*x.n*(den/x.d));
  const collected=new Map();
  for(const x of reduced){const v=x.coef*x.n*(den/x.d)/content,key=String(x.w);collected.set(key,(collected.get(key)||0n)+v);}
  let U=0n;for(const v of collected.values())U+=v*v;
  const lead=useG?3n**82n:2n**38n,rem=useG?dims.G:dims.F;
  const logBound=Number(rem)/Number(r)*0.5*(Math.log(Number(lead))+Math.log(65/63)+Math.log(Number(U)));
  return{dims,reduced,collected,U,base:Math.exp(logBound)};
}

const rn=1000000;
const Nn=Math.ceil(rn*Math.log2(3)),Mn=2*Nn-3*rn;
for(const offset of [-10000,-1000,0,1000,10000]){
  const c=BigInt(Math.floor(.8*Mn)),a=BigInt(Mn+offset);
  for(const useG of [false,true]){
    const p=pointAudit(rn,c,a,useG);
    console.log("point offset="+offset+" rung="+(useG?"G":"F")+" base="+p.base+
      " dims="+[p.dims.M,p.dims.E,p.dims.F,p.dims.G]+
      " tuples="+p.reduced.map(x=>x.tuple.join(".")).join("/")+
      " coeff="+[...p.collected].map(([w,v])=>w+":"+v).join(","));
  }
  if(offset<0)for(const useG of [false,true]){
    const p=pointAuditBorrow(rn,c,a,useG);
    console.log("borrow offset="+offset+" rung="+(useG?"G":"F")+" base="+p.base+
      " tuples="+p.reduced.map(x=>x.tuple.join(".")).join("/")+
      " coeff="+[...p.collected].map(([w,v])=>w+":"+v).join(","));
  }
}

let scanMax={base:0};let scanFail=0,scanCount=0;
const Ln=BigInt(rn)-BigInt(Nn-rn);
for(let ci=1;ci<40;++ci){
  const c=Ln*BigInt(ci)/40n;
  for(let ei=ci+1;ei<40;++ei){
    const e=Ln*BigInt(ei)/40n;
    if(e<=c)continue;
    const a=e-c;
    const p=a>=BigInt(Mn)?pointAudit(rn,c,a,false):pointAuditBorrow(rn,c,a,false);
    ++scanCount;
    if(p.base>=2.99)++scanFail;
    if(p.base>scanMax.base)scanMax={base:p.base,c,a,tuples:p.reduced.map(x=>x.tuple)};
  }
}
console.log("grid_count="+scanCount+" fail="+scanFail+" max="+scanMax.base+
  " c="+scanMax.c+" a="+scanMax.a+" tuples="+scanMax.tuples.map(x=>x.join(".")).join("/"));
