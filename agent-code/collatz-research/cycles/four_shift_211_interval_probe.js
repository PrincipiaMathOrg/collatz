#!/usr/bin/env node
"use strict";

/*
 * Exact rational interval probe for the four-shift run type 2+1+1:
 *
 *   (z-1)(A z^-c + 3 z^-e + 3 z^-f) = 3z,
 *
 * where A=5 and c<L, or A=7 and c>=L.  We order the three run-start
 * residues, try every possible rank of c, and fold at 8X^M-9 using the
 * exact anchors 0,M,L,B.  A second terminal test clears the largest
 * residue and reduces all four bases through M,E,F.  Its l1 bound is
 * insensitive to folded aliases.
 */

function assert(ok,message){if(!ok)throw new Error(message);}
function bgcd(a,b){a=a<0n?-a:a;b=b<0n?-b:b;while(b)[a,b]=[b,a%b];return a;}
function R(n,d=1n){if(d<0n){n=-n;d=-d;}const g=bgcd(n,d);return{n:n/g,d:d/g};}
const ZERO=R(0n),ONE=R(1n),TWO=R(2n);
function add(a,b){return R(a.n*b.d+b.n*a.d,a.d*b.d);}
function sub(a,b){return R(a.n*b.d-b.n*a.d,a.d*b.d);}
function mul(a,b){return R(a.n*b.n,a.d*b.d);}
function div(a,b){return R(a.n*b.d,a.d*b.n);}
function cmp(a,b){const z=a.n*b.d-b.n*a.d;return z<0n?-1:z>0n?1:0;}
function rmin(...a){return a.reduce((x,y)=>cmp(x,y)<=0?x:y);}
function rmax(...a){return a.reduce((x,y)=>cmp(x,y)>=0?x:y);}
function midpoint(a,b){return R(a.n*b.d+b.n*a.d,2n*a.d*b.d);}
function floorR(a){return a.n>=0n?a.n/a.d:-((-a.n+a.d-1n)/a.d);}
function ceilR(a){return-floorR(R(-a.n,a.d));}
function width(i){return sub(i[1],i[0]);}
function addI(a,b){return[add(a[0],b[0]),add(a[1],b[1])];}
function subI(a,b){return[sub(a[0],b[1]),sub(a[1],b[0])];}
function containsInteger(i){return ceilR(i[0])<=floorR(i[1]);}
function show(a){return a.n+"/"+a.d;}

const maxDepth=Number(process.argv[2]||35);
const requestedSector=process.argv[3]||"all";
const mode=process.argv[4]||"exact";
const coordinateMode=process.argv[5]||"gaps";
const fastMode=mode==="fast"||mode==="noalias";
const noAlias=mode==="noalias";
const periodBarrier=72057431991n;
assert(periodBarrier>60000000000n,"1/M endpoint failed");
assert(19n**26n>periodBarrier*7n**26n,"logarithmic endpoint failed");
assert(periodBarrier>375n*371n,"determinant endpoint failed");

// Tight all-depth interval for ell=L/M at the audited period barrier.
const ELL0=R(5698301721657743n,2333003475953681n);
const ELL1=R(46153n,18896n),EPS=R(1n,10000000000n);
const YMAX=R(7n,2n),GRID=100n;
const FIVE=R(5n);

// q/M = 0,1,ell,ell+1 and 36/z^q = 36,32,27,24.
const anchorCoeff=[36n,32n,27n,24n];
const patterns=[];
for(let a=0;a<=3;++a)for(let b=a;b<=3;++b)for(let c=b;c<=3;++c)
  patterns.push([a,b,c]);
function anchorI(q,ell){
  if(q===0)return[ZERO,ZERO];
  if(q===1)return[ONE,ONE];
  if(q===2)return ell;
  return[add(ell[0],ONE),add(ell[1],ONE)];
}

// F/M=5-2 ell and E/M=ell-2.  Each descriptor [q,a,b] denotes
// qM+aE+bF.  The ranges below contain the canonical Euclidean divisions
// of every exponent in [0,B].
const fDescriptors=[];
for(let q=0;q<=5;++q)for(let a=0;a<=2;++a)for(let b=0;b<=3;++b)
  fDescriptors.push([q,a,b]);
function linearImage(c,s,ell){
  const x0=add(R(BigInt(c)),mul(R(BigInt(s)),ell[0]));
  const x1=add(R(BigInt(c)),mul(R(BigInt(s)),ell[1]));
  return cmp(x0,x1)<=0?[x0,x1]:[x1,x0];
}
function fAnchorI(desc,ell){
  const[q,a,b]=desc;
  return linearImage(q-2*a+5*b,a-2*b,ell);
}
function fWidthI(ell){return[sub(FIVE,mul(TWO,ell[1])),sub(FIVE,mul(TWO,ell[0]))];}
function intersectsCanonical(i,upper){
  return cmp(i[1],ZERO)>=0&&cmp(i[0],upper[1])<=0;
}
function fCandidates(x,ell){
  const e=[sub(ell[0],TWO),sub(ell[1],TWO)],f=fWidthI(ell),out=[];
  for(const desc of fDescriptors){
    const[q,a,b]=desc;
    const h=subI(x,[R(BigInt(q)),R(BigInt(q))]);
    if(!intersectsCanonical(h,[ZERO,ONE]))continue;
    const ae=[mul(R(BigInt(a)),e[0]),mul(R(BigInt(a)),e[1])];
    const u=subI(h,ae);
    if(!intersectsCanonical(u,e))continue;
    const bf=[mul(R(BigInt(b)),f[0]),mul(R(BigInt(b)),f[1])];
    const w=subI(u,bf);
    if(intersectsCanonical(w,f))out.push(desc);
  }
  return out;
}
function fFixedCandidates(x,ell){
  const e=[sub(ell[0],TWO),sub(ell[1],TWO)],f=fWidthI(ell),out=[];
  for(const desc of fDescriptors){
    const[q,a,b]=desc;
    const h=subI(x,[R(BigInt(q)),R(BigInt(q))]);
    if(cmp(h[0],ZERO)<0||cmp(h[1],ONE)>=0)continue;
    const ae=[mul(R(BigInt(a)),e[0]),mul(R(BigInt(a)),e[1])];
    const u=subI(h,ae);
    if(cmp(u[0],ZERO)<0||cmp(u[1],e[0])>=0)continue;
    const bf=[mul(R(BigInt(b)),f[0]),mul(R(BigInt(b)),f[1])];
    const w=subI(u,bf);
    if(cmp(w[0],ZERO)>=0&&cmp(w[1],f[0])<0)out.push(desc);
  }
  return out;
}
function bpow(a,n){return a**BigInt(n);}
function lcm(a,b){return a/bgcd(a,b)*b;}
function fScale(desc){
  const[q,a,b]=desc;
  return R(bpow(9n,q)*bpow(256n,a)*bpow(3n,12*b),
    bpow(8n,q)*bpow(243n,a)*bpow(2n,19*b));
}
const F_RHS=299n**1000n;
const F_SCALE=100n**1000n;
const THREE12=3n**12n;
const F_ENERGY_RHS=63n**21n*299n**2000n;
const F_ENERGY_SCALE=100n**2000n;
const fAdmissibleCache=new Map();
const fUngroupedCache=new Map();
const hCoefficientCache=new Map();
function fCoefficientCertificate(A,special,d0,d1,df){
  const key=A+":"+special+":"+d0.join("")+":"+d1.join("")+":"+df.join("");
  if(fAdmissibleCache.has(key))return fAdmissibleCache.get(key);
  const base=[3n,3n,3n];base[special]=A;
  const scales=[fScale(d0),fScale(d1),ONE,fScale(df)];
  let commonDen=1n;for(const x of scales)commonDen=lcm(commonDen,x.d);
  const raw=[
    base[0]*scales[0].n*(commonDen/scales[0].d),
    base[1]*scales[1].n*(commonDen/scales[1].d),
    base[2]*commonDen,
    3n*scales[3].n*(commonDen/scales[3].d)
  ];
  let g=0n;for(const x of raw)g=bgcd(g,x);
  let unitPart=g;while(unitPart%2n===0n)unitPart/=2n;
  while(unitPart%3n===0n)unitPart/=3n;
  assert(unitPart===1n,"F-rung removed nonunit content");
  const co=raw.map(x=>x/g);
  const l1=2n*(co[0]+co[1]+co[2])+co[3];
  const K=THREE12*l1;
  const ok=K**21n*F_SCALE<F_RHS;
  const ans={desc:[d0,d1,[0,0,0],df],coeff:co,l1,K,triangleOk:ok};
  fAdmissibleCache.set(key,ans);return ans;
}

function containsZero(i){return cmp(i[0],ZERO)<=0&&cmp(i[1],ZERO)>=0;}
function fResidualI(x,desc,ell){return subI(x,fAnchorI(desc,ell));}
function fEnergyCertificate(coeff,residual){
  const n=coeff.length-1,H=coeff[n];
  let U=H*H;
  for(let i=0;i<n;++i)U+=2n*coeff[i]*coeff[i];
  for(let i=0;i<n;++i)for(let j=i+1;j<n;++j)
    if(containsZero(subI(residual[i],residual[j])))U+=4n*coeff[i]*coeff[j];
  for(let i=0;i<n;++i){
    const d=[sub(sub(residual[i][0],residual[n][1]),EPS),
      sub(residual[i][1],residual[n][0])];
    if(containsZero(d))U+=2n*coeff[i]*H;
  }
  const K=2n**38n*65n*U;
  return K**21n*F_ENERGY_SCALE<F_ENERGY_RHS?{U,K}:null;
}

function fCertificate(box,A,special){
  const p=positions(box);
  const x0=box.x?box.x[0]:subI(p[2],p[0]);
  const x1=box.x?box.x[1]:subI(p[2],p[1]);
  const xF=box.x?box.x[2]:p[2];
  const c0=fCandidates(x0,box.ell),c1=fCandidates(x1,box.ell),
    cf=fCandidates(xF,box.ell);
  if(c0.length*c1.length*cf.length>2000)return null;
  let witness=null,allGood=c0.length>0&&c1.length>0&&cf.length>0;
  outerGrouped:
  for(const d0 of c0)for(const d1 of c1)for(const df of cf){
    const cert=fCoefficientCertificate(A,special,d0,d1,df);
    if(!cert.triangleOk){allGood=false;break outerGrouped;}
    witness=cert;
  }
  if(allGood)return witness;
  const z0=fFixedCandidates(x0,box.ell),z1=fFixedCandidates(x1,box.ell),
    zf=fFixedCandidates(xF,box.ell);
  for(const d0 of z0)for(const d1 of z1)for(const df of zf){
    const cert=fCoefficientCertificate(A,special,d0,d1,df);
    const residual=[fResidualI(x0,d0,box.ell),fResidualI(x1,d1,box.ell),
      [ZERO,ZERO],fResidualI(xF,df,box.ell)];
    const f=fWidthI(box.ell);
    if(residual.every(x=>cmp(add(x[1],EPS),f[0])<0)){
      const energy=fEnergyCertificate(cert.coeff,residual);
      if(energy)return{...cert,...energy,energyOk:true};
    }
  }
  return null;
}

function fUngroupedCoefficientCertificate(d0,d1,df){
  const key=d0.join("")+":"+d1.join("")+":"+df.join("");
  if(fUngroupedCache.has(key))return fUngroupedCache.get(key);
  const desc=[[3,1,0],[0,0,0],d0,d1,df];
  const scales=desc.map(fScale);
  let commonDen=1n;for(const x of scales)commonDen=lcm(commonDen,x.d);
  const raw=scales.map(x=>x.n*(commonDen/x.d));
  let g=0n;for(const x of raw)g=bgcd(g,x);
  let unitPart=g;while(unitPart%2n===0n)unitPart/=2n;
  while(unitPart%3n===0n)unitPart/=3n;
  assert(unitPart===1n,"ungrouped F-rung removed nonunit content");
  const co=raw.map(x=>x/g);
  const l1=2n*(co[0]+co[1]+co[2]+co[3])+co[4];
  const K=THREE12*l1;
  const ok=K**21n*F_SCALE<F_RHS;
  const ans={desc,coeff:co,l1,K,triangleOk:ok};
  fUngroupedCache.set(key,ans);return ans;
}

function fUngroupedCertificate(box,A,special){
  if(A!==5n)return null;
  const p=positions(box),B=[add(box.ell[0],ONE),add(box.ell[1],ONE)];
  const g=addI(p[special],B),other=[];
  for(let i=0;i<3;++i)if(i!==special)other.push(i);
  const x0=subI(g,p[other[0]]),x1=subI(g,p[other[1]]),xF=g;
  const c0=fCandidates(x0,box.ell),c1=fCandidates(x1,box.ell),
    cf=fCandidates(xF,box.ell);
  if(c0.length*c1.length*cf.length>2000)return null;
  let witness=null,allGood=c0.length>0&&c1.length>0&&cf.length>0;
  outerUngrouped:
  for(const d0 of c0)for(const d1 of c1)for(const df of cf){
    const cert=fUngroupedCoefficientCertificate(d0,d1,df);
    if(!cert.triangleOk){allGood=false;break outerUngrouped;}
    witness=cert;
  }
  if(allGood)return witness;
  const z0=fFixedCandidates(x0,box.ell),z1=fFixedCandidates(x1,box.ell),
    zf=fFixedCandidates(xF,box.ell);
  for(const d0 of z0)for(const d1 of z1)for(const df of zf){
    const cert=fUngroupedCoefficientCertificate(d0,d1,df);
    const dB=[3,1,0],dZ=[0,0,0];
    const residual=[fResidualI(B,dB,box.ell),[ZERO,ZERO],
      fResidualI(x0,d0,box.ell),fResidualI(x1,d1,box.ell),
      fResidualI(xF,df,box.ell)];
    const f=fWidthI(box.ell);
    if(residual.every(x=>cmp(add(x[1],EPS),f[0])<0)){
      const energy=fEnergyCertificate(cert.coeff,residual);
      if(energy)return{...cert,...energy,energyOk:true};
    }
  }
  return null;
}

// H=F-G=53N-84r, with G/M=7 ell-17 and H/M=22-9 ell.
const hDescriptors=[];
for(let q=0;q<=3;++q)for(let a=0;a<=2;++a)for(let b=0;b<=3;++b)
  for(let c=0;c<=1;++c)for(let d=0;d<=5;++d)hDescriptors.push([q,a,b,c,d]);
function hWidthI(ell){return[sub(R(22n),mul(R(9n),ell[1])),
  sub(R(22n),mul(R(9n),ell[0]))];}
function hAnchorI(desc,ell){
  const[q,a,b,c,d]=desc;
  return linearImage(q-2*a+5*b-17*c+22*d,a-2*b+7*c-9*d,ell);
}
function hFixedCandidates(x,ell){
  const e=[sub(ell[0],TWO),sub(ell[1],TWO)],f=fWidthI(ell);
  const gg=[sub(mul(R(7n),ell[0]),R(17n)),sub(mul(R(7n),ell[1]),R(17n))];
  const hh=hWidthI(ell),out=[];
  function inside(v,u){return cmp(v[0],ZERO)>=0&&cmp(v[1],u[0])<0;}
  // The midpoint branch usually identifies the sole useful anchor.  We
  // verify it on the full box before accepting it.
  const xm=midpoint(x[0],x[1]),lm=midpoint(ell[0],ell[1]);
  const em=sub(lm,TWO),fm=sub(FIVE,mul(TWO,lm));
  const gm=sub(mul(R(7n),lm),R(17n)),hm=sub(R(22n),mul(R(9n),lm));
  const q0=Number(floorR(xm));let rem=sub(xm,R(BigInt(q0)));
  const a0=Number(floorR(div(rem,em)));rem=sub(rem,mul(R(BigInt(a0)),em));
  const b0=Number(floorR(div(rem,fm)));rem=sub(rem,mul(R(BigInt(b0)),fm));
  const c0=Number(floorR(div(rem,gm)));rem=sub(rem,mul(R(BigInt(c0)),gm));
  const d0=Number(floorR(div(rem,hm))),midDesc=[q0,a0,b0,c0,d0];
  if(q0>=0&&q0<=3&&a0>=0&&a0<=2&&b0>=0&&b0<=3&&c0>=0&&c0<=1&&d0>=0&&d0<=5){
    const t=subI(x,hAnchorI(midDesc,ell));
    if(inside(t,hh))return[midDesc];
  }
  return out;
  /* The code below is a slower exhaustive cross-check retained for audit.
  for(let q=0;q<=3;++q){
    const r0=subI(x,[R(BigInt(q)),R(BigInt(q))]);if(!inside(r0,[ONE,ONE]))continue;
    for(let a=0;a<=2;++a){
      const r1=subI(r0,[mul(R(BigInt(a)),e[0]),mul(R(BigInt(a)),e[1])]);
      if(!inside(r1,e))continue;
      for(let b=0;b<=3;++b){
        const r2=subI(r1,[mul(R(BigInt(b)),f[0]),mul(R(BigInt(b)),f[1])]);
        if(!inside(r2,f))continue;
        for(let c=0;c<=1;++c){
          const r3=subI(r2,[mul(R(BigInt(c)),gg[0]),mul(R(BigInt(c)),gg[1])]);
          if(!inside(r3,gg))continue;
          for(let d=0;d<=5;++d){
            const r4=subI(r3,[mul(R(BigInt(d)),hh[0]),mul(R(BigInt(d)),hh[1])]);
            if(inside(r4,hh))out.push([q,a,b,c,d]);
          }
        }
      }
    }
  }
  */
  return out;
}
function smoothScale(v2,v3){
  let n=1n,d=1n;
  if(v2>=0)n*=bpow(2n,v2);else d*=bpow(2n,-v2);
  if(v3>=0)n*=bpow(3n,v3);else d*=bpow(3n,-v3);
  return R(n,d);
}
function hScale(desc){
  const[q,a,b,c,d]=desc;
  return smoothScale(-3*q+8*a-19*b+65*c-84*d,
    2*q-5*a+12*b-41*c+53*d);
}
const H_RHS=299n**1000n,H_SCALE=100n**1000n,THREE53=3n**53n;
function hCoefficientCertificate(A,special,d0,d1,df){
  const key=A+":"+special+":"+d0.join(",")+":"+d1.join(",")+":"+df.join(",");
  if(hCoefficientCache.has(key))return hCoefficientCache.get(key);
  const base=[3n,3n,3n];base[special]=A;
  const scales=[hScale(d0),hScale(d1),ONE,hScale(df)];
  let commonDen=1n;for(const x of scales)commonDen=lcm(commonDen,x.d);
  const raw=[base[0]*scales[0].n*(commonDen/scales[0].d),
    base[1]*scales[1].n*(commonDen/scales[1].d),base[2]*commonDen,
    3n*scales[3].n*(commonDen/scales[3].d)];
  let g=0n;for(const x of raw)g=bgcd(g,x);
  let unitPart=g;while(unitPart%2n===0n)unitPart/=2n;
  while(unitPart%3n===0n)unitPart/=3n;
  assert(unitPart===1n,"H-rung removed nonunit content");
  const co=raw.map(x=>x/g),l1=2n*(co[0]+co[1]+co[2])+co[3];
  const K=THREE53*l1,ok=K**4n*H_SCALE<H_RHS;
  const ans=ok?{desc:[d0,d1,[0,0,0,0,0],df],coeff:co,l1,K}:null;
  hCoefficientCache.set(key,ans);return ans;
}
function hCertificate(box,A,special){
  const p=positions(box),x0=box.x?box.x[0]:subI(p[2],p[0]),
    x1=box.x?box.x[1]:subI(p[2],p[1]),xF=box.x?box.x[2]:p[2];
  const c0=hFixedCandidates(x0,box.ell),c1=hFixedCandidates(x1,box.ell),
    cf=hFixedCandidates(xF,box.ell);
  for(const d0 of c0)for(const d1 of c1)for(const df of cf){
    const cert=hCoefficientCertificate(A,special,d0,d1,df);
    if(cert)return cert;
  }
  return null;
}

const RHS=64n**17100n*374n**200000n;
const LEFT_CONSTANT=125n**200000n;
const admissibleCache=new Map();
function admissible(U,A){
  const key=U+","+A;
  if(admissibleCache.has(key))return admissibleCache.get(key);
  let ok;
  if(fastMode){
    ok=342*Number(A)*Math.log(8)+17100*Math.log(81*Number(U))+
      200000*Math.log(125)<17100*Math.log(64)+200000*Math.log(374);
  }else{
    const left=8n**(342n*A)*(81n*U)**17100n*LEFT_CONSTANT;
    ok=left<RHS;
  }
  admissibleCache.set(key,ok);return ok;
}

function cumulative(box){
  const p0=box.y[0];
  const p1=addI(p0,box.y[1]);
  return[p0,p1,addI(p1,box.y[2])];
}
function positions(box){
  if(!box.x)return cumulative(box);
  return[subI(box.x[2],box.x[0]),subI(box.x[2],box.x[1]),box.x[2]];
}

function feasible(box,A,special){
  if(box.x){
    if(cmp(box.x[1][0],box.x[0][1])>=0)return false;
    if(cmp(box.x[0][0],box.x[2][1])>=0)return false;
    if(cmp(box.x[2][0],add(box.ell[1],ONE))>=0)return false;
  }
  const p=positions(box);
  if(cmp(p[0][1],ZERO)<=0||cmp(p[1][1],ZERO)<=0)return false;
  if(cmp(p[2][0],add(box.ell[1],ONE))>0)return false;
  if(A===5n)return cmp(p[special][0],box.ell[1])<0;
  return cmp(p[special][1],box.ell[0])>=0;
}

function patternCertificate(box,A,special,pattern,ignoreAliases=false){
  const p=positions(box);
  const t=pattern.map((q,i)=>subI(anchorI(q,box.ell),p[i]));
  const lo=[rmin(ZERO,...t.map(v=>v[0])),rmin(ZERO,...t.map(v=>v[1]))];
  const hi=[rmax(ZERO,...t.map(v=>v[0])),rmax(ZERO,...t.map(v=>v[1]))];
  const span=[sub(hi[0],lo[1]),sub(hi[1],lo[0])];
  if(cmp(add(span[1],EPS),TWO)>=0)return null;

  const baseCoeff=[3n,3n,3n];baseCoeff[special]=A;
  const raw=pattern.map((q,i)=>baseCoeff[i]*anchorCoeff[q]);
  let g=108n;for(const x of raw)g=bgcd(g,x);
  let unitPart=g;
  while(unitPart%2n===0n)unitPart/=2n;
  while(unitPart%3n===0n)unitPart/=3n;
  assert(unitPart===1n,"removed nonunit content");
  const coeff=raw.map(x=>x/g),finalCoeff=108n/g;
  const possibleQ=[];
  if(cmp(span[0],ONE)<0)possibleQ.push(0);
  if(cmp(add(span[1],EPS),ONE)>=0)possibleQ.push(1);
  assert(possibleQ.length>0,"empty quotient alternative");

  const witnesses=[];
  for(const Q of possibleQ){
    let delta=Q===0?add(span[1],EPS):sub(add(span[1],EPS),ONE);
    if(cmp(delta,ZERO)<0)delta=ZERO;
    const Aceil=ceilR(mul(R(GRID),delta));
    const terms=[];
    for(let i=0;i<3;++i){
      const base=[sub(t[i][0],lo[1]),sub(t[i][1],lo[0])];
      terms.push({raw:t[i],pos:[base[0],add(base[1],EPS)],a:coeff[i],sign:1});
      terms.push({raw:t[i],pos:base,a:coeff[i],sign:-1});
    }
    terms.push({final:true,pos:[sub(ZERO,lo[1]),sub(EPS,lo[0])],
      a:finalCoeff,sign:-1});
    const amplitudes=terms.map(term=>Q===0?term.a:
      (cmp(term.pos[1],ONE)<0?8n*term.a:9n*term.a));
    let U=0n;for(const x of amplitudes)U+=x*x;
    if(!ignoreAliases)
      for(let i=0;i<terms.length;++i)for(let j=i+1;j<terms.length;++j){
        if(terms[i].sign!==terms[j].sign)continue;
        const difference=terms[j].final?
          [sub(terms[i].raw[0],EPS),terms[i].raw[1]]:
          subI(terms[i].raw,terms[j].raw);
        if(containsInteger(difference))U+=2n*amplitudes[i]*amplitudes[j];
      }
    if(!admissible(U,Aceil))return null;
    witnesses.push({Q,A:Aceil,U});
  }
  const aliases=[];
  for(let i=0;i<3;++i){
    for(let j=i+1;j<3;++j){
      const v=subI(t[i],t[j]);
      for(let k=ceilR(v[0]);k<=floorR(v[1]);++k)aliases.push(i+""+j+":"+k);
    }
    for(let k=ceilR(t[i][0]);k<=floorR(t[i][1]);++k)aliases.push(i+"F:"+k);
  }
  return{pattern:pattern.join(""),witnesses,aliases};
}

function certify(box,A,special){
  function rungCertificate(){
    const ucert=fUngroupedCertificate(box,A,special);
    if(ucert)return{kind:"FU",...ucert};
    const fcert=fCertificate(box,A,special);
    if(fcert)return{kind:"F",...fcert};
    const hcert=hCertificate(box,A,special);
    if(hcert)return{kind:"H",...hcert};
    return null;
  }
  if(box.depth>=23){
    const hcert=hCertificate(box,A,special);
    if(hcert)return{kind:"H",...hcert};
    return null;
  }
  if(box.depth>=18){const cert=rungCertificate();if(cert)return cert;}
  for(const pattern of patterns){
    const quick=patternCertificate(box,A,special,pattern,true);
    if(quick){
      if(noAlias)return{kind:"M",...quick};
      const cert=patternCertificate(box,A,special,pattern,false);
      if(cert)return{kind:"M",...cert};
    }
  }
  if(box.depth<18){const cert=rungCertificate();if(cert)return cert;}
  return null;
}

if(coordinateMode==="debug"){
  const test={ell:[ELL0,ELL1],depth:27,x:[
    [R(2499n,1024n),R(1253n,512n)],
    [R(1253n,1024n),R(315n,256n)],
    [R(3521n,1024n),R(441n,128n)]]};
  const pp=positions(test),xx=[subI(pp[2],pp[0]),subI(pp[2],pp[1]),pp[2]];
  console.log("debug_positions="+pp.map(z=>z.map(show).join("..")).join(" | "));
  console.log("debug_x="+xx.map(z=>z.map(show).join("..")).join(" | "));
  console.log("debug_h_candidates="+xx.map(z=>JSON.stringify(hFixedCandidates(z,test.ell))).join(" | "));
  console.log("debug_h_certificate="+JSON.stringify(hCertificate(test,5n,0),(k,v)=>typeof v==="bigint"?v.toString():v));
  process.exit(0);
}

function run(A,special){
  const name=String(A)+"r"+special;
  const initial={ell:[ELL0,ELL1],depth:0};
  if(coordinateMode==="x")initial.x=[[ZERO,YMAX],[ZERO,YMAX],[ZERO,YMAX]];
  else initial.y=[[ZERO,YMAX],[ZERO,YMAX],[ZERO,YMAX]];
  const stack=[initial];
  const residual=[];let visited=0,discarded=0,certified=0,deepest=0;
  const labels=new Map(),aliasLabels=new Map(),aliasClasses=new Map();let fCertified=0;
  while(stack.length){
    const box=stack.pop();visited++;deepest=Math.max(deepest,box.depth);
    if(!feasible(box,A,special)){discarded++;continue;}
    const cert=certify(box,A,special);
    if(cert){
      certified++;
      if(cert.kind==="F"||cert.kind==="FU"||cert.kind==="H")fCertified++;
      else{
        labels.set(cert.pattern,(labels.get(cert.pattern)||0)+1);
        for(const a of cert.aliases){
          aliasLabels.set(a,(aliasLabels.get(a)||0)+1);
          const key=cert.pattern+"@"+a;
          aliasClasses.set(key,(aliasClasses.get(key)||0)+1);
        }
      }
      continue;
    }
    if(box.depth>=maxDepth){residual.push(box);continue;}
    const coordinate=box.x||box.y;
    const dimensions=coordinate.map((v,i)=>({kind:box.x?"x":"y",i,w:width(v)}));
    dimensions.push({kind:"ell",i:0,w:mul(R(4n),width(box.ell))});
    dimensions.sort((a,b)=>cmp(b.w,a.w));
    const split=dimensions[0];
    if(split.kind==="ell"){
      const mid=midpoint(box.ell[0],box.ell[1]);
      stack.push({...box,ell:[box.ell[0],mid],depth:box.depth+1},
        {...box,ell:[mid,box.ell[1]],depth:box.depth+1});
    }else{
      const old=coordinate[split.i],mid=midpoint(old[0],old[1]);
      for(const next of [[old[0],mid],[mid,old[1]]]){
        const updated=coordinate.map(v=>v);updated[split.i]=next;
        stack.push({...box,[split.kind]:updated,depth:box.depth+1});
      }
    }
  }
  console.log("sector="+name);
  console.log("visited="+visited+" discarded="+discarded+" certified="+certified+
    " residual="+residual.length+" depth="+deepest);
  console.log("anchors="+[...labels].sort().map(([k,v])=>k+":"+v).join(","));
  console.log("F_rung_boxes="+fCertified);
  console.log("potential_aliases="+[...aliasLabels].sort().map(([k,v])=>k+":"+v).join(","));
  if(noAlias)console.log("alias_classes="+[...aliasClasses].sort().map(([k,v])=>k+":"+v).join(","));
  for(const box of residual.slice(0,8)){
    const coordinate=box.x||box.y,label=box.x?"x":"y";
    console.log("residual_box ell="+box.ell.map(show).join("..")+
      " "+label+"0="+coordinate[0].map(show).join("..")+
      " "+label+"1="+coordinate[1].map(show).join("..")+
      " "+label+"2="+coordinate[2].map(show).join(".."));
  }
  return residual.length;
}

let total=0;
for(const A of[5n,7n])for(let special=0;special<3;++special){
  const name=String(A)+"r"+special;
  if(requestedSector==="all"||requestedSector===name)total+=run(A,special);
}
console.log("exact_resultant_comparisons="+admissibleCache.size);
console.log("F_coefficient_comparisons="+fAdmissibleCache.size);
console.log("ungrouped_F_coefficient_comparisons="+fUngroupedCache.size);
console.log("H_coefficient_comparisons="+hCoefficientCache.size);
console.log("fast_floating_diagnostic="+fastMode);
console.log("same_sign_aliases_ignored="+noAlias);
console.log("coordinate_mode="+coordinateMode);
console.log("total_residual="+total);
