#!/usr/bin/env node
"use strict";

/* Diagnostic for reducing the cleared 2+1+1 gate through M,E,F.
 * This is intentionally pointwise and floating in the exponent variables.
 */

const alpha=Math.log2(3), mr=2*alpha-3, er=8-5*alpha, fr=12*alpha-19;
const e=er/mr, f=fr/mr;
const gr=65-41*alpha,hr=53*alpha-84,g=gr/mr,h=hr/mr;

function dec(x){
  let q=Math.floor(x+1e-10); let u=x-q;
  let a=Math.floor(u/e+1e-10); u-=a*e;
  let b=Math.floor(u/f+1e-10); u-=b*f;
  return {q,a,b,w:u/f,
    v2:-3*q+8*a-19*b,
    v3:2*q-5*a+12*b};
}
function analyze(p,A,special){
  const co=[3,3,3];co[special]=A;
  const bases=[p[2]-p[0],p[2]-p[1],0,p[2]];
  const ds=bases.map(dec);
  const terms=[];
  for(let i=0;i<3;i++){
    terms.push({sgn:1,c:co[i],v2:ds[i].v2,v3:ds[i].v3,w:ds[i].w+1});
    terms.push({sgn:-1,c:co[i],v2:ds[i].v2,v3:ds[i].v3,w:ds[i].w});
  }
  terms.push({sgn:-1,c:3,v2:ds[3].v2,v3:ds[3].v3,w:ds[3].w+1});
  let min2=Math.min(...terms.map(t=>t.v2)),min3=Math.min(...terms.map(t=>t.v3));
  for(const t of terms){t.v2-=min2;t.v3-=min3;t.log=Math.log(t.c)+t.v2*Math.log(2)+t.v3*Math.log(3);}
  const maxLog=Math.max(...terms.map(t=>t.log));
  const U=terms.reduce((s,t)=>s+Math.exp(2*(t.log-maxLog)),0);
  const logK=38*Math.log(2)+Math.log(65/63)+Math.log(U)+2*maxLog;
  const base=Math.exp(21*logK/2000);
  const logL=maxLog+Math.log(terms.reduce((s,t)=>s+Math.exp(t.log-maxLog),0));
  const triangleBase=Math.exp(21*(12*Math.log(3)+logL)/1000);
  return {e,f,bases,ds,spread2:Math.max(...terms.map(t=>t.v2)),spread3:Math.max(...terms.map(t=>t.v3)),base,triangleBase};
}
function analyzeUngrouped(p,special){
  const c=p[special],g=c+(e+3),other=p.filter((_,i)=>i!==special);
  const bases=[e+3,0,g-other[0],g-other[1],g];
  const ds=bases.map(dec),terms=[];
  for(let i=0;i<4;i++){
    terms.push({sgn:1,c:1,v2:ds[i].v2,v3:ds[i].v3,w:ds[i].w+1});
    terms.push({sgn:-1,c:1,v2:ds[i].v2,v3:ds[i].v3,w:ds[i].w});
  }
  terms.push({sgn:-1,c:1,v2:ds[4].v2,v3:ds[4].v3,w:ds[4].w+1});
  let min2=Math.min(...terms.map(t=>t.v2)),min3=Math.min(...terms.map(t=>t.v3));
  for(const t of terms){t.v2-=min2;t.v3-=min3;t.log=t.v2*Math.log(2)+t.v3*Math.log(3);}
  const maxLog=Math.max(...terms.map(t=>t.log));
  const logL=maxLog+Math.log(terms.reduce((s,t)=>s+Math.exp(t.log-maxLog),0));
  return {bases,ds,triangleBase:Math.exp(21*(12*Math.log(3)+logL)/1000)};
}
function analyzeAtE(bases,co,rhs){
  const ds=bases.map(x=>{const q=Math.floor(x+1e-10),a=Math.floor((x-q)/e+1e-10);
    return{q,a,w:(x-q-a*e)/e,v2:-3*q+8*a,v3:2*q-5*a};});
  const terms=[];
  for(let i=0;i<co.length;i++){
    terms.push({c:co[i],v2:ds[i].v2,v3:ds[i].v3});
    terms.push({c:co[i],v2:ds[i].v2,v3:ds[i].v3});
  }
  const d=ds[ds.length-1];terms.push({c:rhs,v2:d.v2,v3:d.v3});
  let m2=Math.min(...terms.map(x=>x.v2)),m3=Math.min(...terms.map(x=>x.v3));
  const logs=terms.map(x=>Math.log(x.c)+(x.v2-m2)*Math.log(2)+(x.v3-m3)*Math.log(3));
  let mx=Math.max(...logs),logL=mx+Math.log(logs.reduce((s,x)=>s+Math.exp(x-mx),0));
  return{ds,triangleBase:Math.exp(er*(8*Math.log(2)+logL))};
}
function analyzeAtH(bases,co,rhs){
  const ds=bases.map(x=>{let q=Math.floor(x+1e-10),u=x-q;
    let a=Math.floor(u/e+1e-10);u-=a*e;
    let b=Math.floor(u/f+1e-10);u-=b*f;
    let c=Math.floor(u/g+1e-10);u-=c*g;
    let d=Math.floor(u/h+1e-10);u-=d*h;
    return{q,a,b,c,d,w:u/h,v2:-3*q+8*a-19*b+65*c-84*d,
      v3:2*q-5*a+12*b-41*c+53*d};});
  const terms=[];
  for(let i=0;i<co.length;i++){
    terms.push({c:co[i],v2:ds[i].v2,v3:ds[i].v3});
    terms.push({c:co[i],v2:ds[i].v2,v3:ds[i].v3});
  }
  const d=ds[ds.length-1];terms.push({c:rhs,v2:d.v2,v3:d.v3});
  let m2=Math.min(...terms.map(x=>x.v2)),m3=Math.min(...terms.map(x=>x.v3));
  const logs=terms.map(x=>Math.log(x.c)+(x.v2-m2)*Math.log(2)+(x.v3-m3)*Math.log(3));
  let mx=Math.max(...logs),logL=mx+Math.log(logs.reduce((s,x)=>s+Math.exp(x-mx),0));
  return{ds,triangleBase:Math.exp(hr*(53*Math.log(3)+logL))};
}

const samples=[
  {name:"5r0",A:5,s:0,p:[1.06,2.24,3.26]},
  {name:"5r1",A:5,s:1,p:[1.02,1.63,3.18]},
  {name:"5r0-close",A:5,s:0,p:[1.34,1.395,3.20]},
  {name:"7r2",A:7,s:2,p:[1.78,2.88,3.45]}
];
for(const x of samples){
  console.log(x.name,JSON.stringify(analyze(x.p,x.A,x.s),null,2));
  const co=[3,3,3];co[x.s]=x.A;
  console.log(x.name+" E",JSON.stringify(analyzeAtE([x.p[2]-x.p[0],x.p[2]-x.p[1],0,x.p[2]],co,3),null,2));
  console.log(x.name+" H",JSON.stringify(analyzeAtH([x.p[2]-x.p[0],x.p[2]-x.p[1],0,x.p[2]],co,3),null,2));
}
for(const x of samples.filter(x=>x.A===5))console.log(x.name+" ungrouped",JSON.stringify(analyzeUngrouped(x.p,x.s),null,2));

function gcd(a,b){while(b)[a,b]=[b,a%b];return a<0n?-a:a;}
function bp(a,n){return BigInt(a)**BigInt(n);}
function rat(desc){const[q,a,b]=desc;return{
  n:bp(9,q)*bp(256,a)*bp(3,12*b),d:bp(8,q)*bp(243,a)*bp(2,19*b)};}
function lcm(a,b){return a/gcd(a,b)*b;}
function exactBase(A,s,ds){
  const rr=[rat(ds[0]),rat(ds[1]),{n:1n,d:1n},rat(ds[2])];
  let den=1n;for(const x of rr)den=lcm(den,x.d);
  const co=[3n,3n,3n];co[s]=BigInt(A);
  const raw=[co[0]*rr[0].n*(den/rr[0].d),co[1]*rr[1].n*(den/rr[1].d),
    co[2]*den,3n*rr[3].n*(den/rr[3].d)];
  let g=0n;for(const x of raw)g=gcd(g,x);
  const cc=raw.map(x=>x/g),L=2n*(cc[0]+cc[1]+cc[2])+cc[3];
  return Math.exp(21*(12*Math.log(3)+Math.log(Number(L)))/1000);
}
function aval(d){return d[0]+d[1]*e+d[2]*f;}
const desc=[];for(let q=0;q<=3;q++)for(let a=0;a<=2;a++)for(let b=0;b<=3;b++)desc.push([q,a,b]);
if(process.argv[2]==="branches")for(const A of[5,7])for(let s=0;s<3;s++){
  let feasible=0,bad=0,worst={base:0};
  for(const d0 of desc)for(const d1 of desc)for(const dF of desc){
    const a0=aval(d0),a1=aval(d1),aF=aval(dF);
    let hit=false;
    for(let i=0;i<=4&&!hit;i++)for(let j=0;j<=4&&!hit;j++)for(let k=0;k<=4&&!hit;k++){
      const x0=a0+f*(i+.25)/5,x1=a1+f*(j+.25)/5,xF=aF+f*(k+.25)/5;
      if(!(0<x1&&x1<x0&&x0<xF&&xF<e+3))continue;
      const p=[xF-x0,xF-x1,xF];
      if(A===5?!(p[s]<e+2):!(p[s]>=e+2))continue;
      hit=true;
    }
    if(!hit)continue;feasible++;
    const base=exactBase(A,s,[d0,d1,dF]);
    if(base>=2.99)bad++;
    if(base>worst.base)worst={base,d0,d1,dF};
  }
  console.log("branches A="+A+" s="+s+" feasible="+feasible+" bad="+bad+" worst="+JSON.stringify(worst));
}
if(process.argv[2]==="hgrid"){
  const nn=Number(process.argv[3]||45),B=e+3;
  for(const A of[5,7])for(let s=0;s<3;s++){
    let count=0,bad=0,worst={base:0};
    for(let i=1;i<nn-2;i++)for(let j=i+1;j<nn-1;j++)for(let k=j+1;k<nn;k++){
      const p=[B*i/nn,B*j/nn,B*k/nn];
      if(A===5?!(p[s]<e+2):!(p[s]>=e+2))continue;
      const co=[3,3,3];co[s]=A;
      const z=analyzeAtH([p[2]-p[0],p[2]-p[1],0,p[2]],co,3),base=z.triangleBase;
      count++;if(base>=2.99)bad++;
      if(base>worst.base)worst={base,p,ds:z.ds};
    }
    console.log("hgrid A="+A+" s="+s+" count="+count+" bad="+bad+" worst="+JSON.stringify(worst));
  }
}
