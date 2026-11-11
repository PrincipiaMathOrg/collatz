#!/usr/bin/env node
"use strict";

/*
 * Floating point diagnostic for the grouped 2+1+1 four-shift gate.
 * It samples the continuous normalized domain and optimizes the exact
 * anchors 0,M,L,B pointwise.  It is not a proof certificate.
 */

function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b)[a,b]=[b,a%b];return a;}
const anchors=[0,1,2,3],patterns=[];
for(const a of anchors)for(let b=a;b<=3;b++)for(let c=b;c<=3;c++)
  patterns.push([a,b,c]);
const kappa=[36,32,27,24];
function anchor(q,ell){return q===0?0:q===1?1:q===2?ell:ell+1;}

function score(ell,x,coeff,p){
  const t=p.map((q,i)=>anchor(q,ell)-x[i]);
  const lo=Math.min(0,...t),hi=Math.max(0,...t),span=hi-lo+1e-10;
  if(span>=2)return Infinity;
  const Q=Math.floor(span),delta=span-Q;
  const raw=coeff.map((a,i)=>a*kappa[p[i]]);
  let g=108;for(const a of raw)g=gcd(g,a);
  const co=raw.map(a=>a/g),f=108/g;
  const terms=[];
  for(let i=0;i<3;i++){
    const u=t[i]-lo;
    terms.push({u:u+1e-10,a:co[i]},{u:u,a:co[i]});
  }
  terms.push({u:-lo,a:f});
  let U=0;
  for(const term of terms){
    const a=Q===0?term.a:(term.u<1?8:9)*term.a;
    U+=a*a;
  }
  return(delta*Math.log(8)+.5*Math.log(81*U/64))/(2*ell+1);
}

const nEll=Number(process.argv[2]||80),grid=Number(process.argv[3]||36);
const target=Math.log(2.99);
for(const A of[5,7])for(let special=0;special<3;special++){
  let count=0,closed=0,worst={margin:Infinity};
  for(let ie=0;ie<=nEll;ie++){
    const ell=829/342+(5/2-829/342)*ie/nEll,B=ell+1;
    for(let i=1;i<grid-1;i++)for(let j=i+1;j<grid;j++)for(let k=j+1;k<=grid;k++){
      const x=[B*i/(grid+1),B*j/(grid+1),B*k/(grid+1)];
      if(A===5&&x[special]>=ell||A===7&&x[special]<ell)continue;
      const coeff=[3,3,3];coeff[special]=A;
      let best=Infinity,label="";
      for(const p of patterns){
        const v=score(ell,x,coeff,p);
        if(v<best){best=v;label=p.join("");}
      }
      const margin=target-best;count++;if(margin>0)closed++;
      if(margin<worst.margin)worst={margin:margin,ell:ell,x:x,label:label,best:best,A:A,special:special};
    }
  }
  console.log("A="+A+" special="+special+" count="+count+" closed="+closed+
    " fraction="+(closed/count)+" worst="+JSON.stringify(worst));
}

const actualMaxR=Number(process.argv[4]||0);
if(actualMaxR>0){
  const actual={},actualWorst={};
  function runType(T){
    const runs=[];let n=1;
    for(let i=1;i<T.length;i++){
      if(T[i]===T[i-1]+1)n++;else{runs.push(n);n=1;}
    }
    runs.push(n);return runs.sort((a,b)=>b-a).join("+");
  }
  for(let r=5;r<=actualMaxR;r++){
    const N=Math.ceil(Math.log2(3)*r-1e-12);
    if(gcd(N,r)!==1)continue;
    for(let i=1;i<r;i++)for(let j=i+1;j<r;j++)
      for(let k=j+1;k<r;k++)for(let l=k+1;l<r;l++){
        const T=[i,j,k,l];if(runType(T)!=="2+1+1")continue;
        const levels=Array(r).fill(0);for(const t of T)levels[t]=1;
        const pos=levels.map((m,q)=>Math.floor(q*N/r)-m);
        let valid=pos[0]===0&&pos[r-1]<N;
        for(let q=1;q<r;q++)if(pos[q]<=pos[q-1])valid=false;
        if(!valid)continue;
        let pair=-1;
        for(let q=0;q<3;q++)if(T[q+1]===T[q]+1)pair=T[q];
        if(pair<0)throw Error("missing pair");
        const gap=Math.floor((pair+1)*N/r)-Math.floor(pair*N/r);
        const A=gap===1?5:gap===2?7:0;if(!A)throw Error("bad pair gap");
        const starts=[pair,...T.filter(t=>t!==pair&&t!==pair+1)];
        const residues=starts.map(t=>({t:t,c:t*N%r})).sort((a,b)=>a.c-b.c);
        const special=residues.findIndex(x=>x.t===pair);
        const key=A+"r"+special;actual[key]=(actual[key]||0)+1;
        const B=N-r,L=r-B,M=B-L,ell=L/M;
        const x=residues.map(v=>v.c/M),coeff=[3,3,3];coeff[special]=A;
        let best=Infinity,label="";
        for(const p of patterns){const v=score(ell,x,coeff,p);if(v<best){best=v;label=p.join("");}}
        const margin=target-best;
        if(!actualWorst[key]||margin<actualWorst[key].margin)
          actualWorst[key]={margin:margin,r:r,N:N,T:T,residues:residues,A:A,
            special:special,label:label,best:best,ell:ell};
      }
  }
  console.log("actual_through_r="+actualMaxR+" counts="+JSON.stringify(actual));
  console.log("actual_worst="+JSON.stringify(actualWorst));
}
