#!/usr/bin/env node
"use strict";

/* Deterministic high-length falsification probe for the conjectural sign
   b>t of the full binary/ternary boundary representatives of every
   nontrivial least-rotation strict-record word. */

const samplesPerLength = Number(process.argv[2] || 2000);
const lengths = (process.argv[3] || "18,20,25,30,40,50,75,100,150,250,500")
  .split(",").map(Number);
const alpha = Math.log2(3);

function abs(n) { return n < 0n ? -n : n; }
function gcd(a, b) { a=abs(a); b=abs(b); while (b) [a,b]=[b,a%b]; return a; }
function mod(a, m) { a%=m; return a<0n?a+m:a; }
function egcd(a,b) { if(!b)return {g:a,x:1n,y:0n}; const z=egcd(b,a%b); return {g:z.g,x:z.y,y:z.x-(a/b)*z.y}; }
function inv(a,m) { const z=egcd(mod(a,m),m); if(z.g!==1n)throw new Error("nonunit"); return mod(z.x,m); }

let rngState = 0x9e3779b97f4a7c15n;
function random64() {
  rngState ^= rngState >> 12n;
  rngState ^= rngState << 25n;
  rngState ^= rngState >> 27n;
  rngState &= (1n << 64n) - 1n;
  return (rngState * 0x2545f4914f6cdd1dn) & ((1n << 64n) - 1n);
}
function randomInt(lo, hi) {
  if (hi < lo) throw new Error(`empty random interval ${lo},${hi}`);
  return lo + Number(random64() % BigInt(hi-lo+1));
}

function sampleWord(r,A) {
  const prefix=[0,1];
  for(let i=2;i<r;++i){
    const P=A-Math.ceil((r-i)*alpha-1e-12);
    prefix[i]=randomInt(prefix[i-1]+1,P);
  }
  const w=[];
  for(let i=0;i<r-1;++i)w.push(prefix[i+1]-prefix[i]);
  w.push(A-prefix[r-1]);
  return w;
}

function sampleLooseWord(r,A) {
  const w=Array(r).fill(1);
  for(let e=0;e<A-r;++e)w[randomInt(1,r-1)]++;
  return w;
}

function carry(word){let C=0n,A=0n;for(const a of word){C=3n*C+(1n<<A);A+=BigInt(a);}return C;}

const rows=[];
let firstFailure=null;
for(const r of lengths){
  const A=Math.ceil(r*alpha-1e-12), M=1n<<BigInt(A), R=3n**BigInt(r), D=M-R;
  const invR=inv(R,M),invM=inv(M,R);
  let positive=0,negative=0,collision=0,minGap=null,minWord=null,minQ=null;
  let loosePositive=0,looseNegative=0,looseCollision=0,firstLooseFailure=null;
  for(let s=0;s<samplesPerLength;++s){
    const word=sampleWord(r,A),C=carry(word);
    const b=mod(-C*invR,M),t=mod(C*invM,R),gap=b-t;
    const q=D/gcd(D,C);
    if(gap>0n)++positive; else if(gap<0n)++negative; else ++collision;
    if(minGap===null||abs(gap)<minGap){minGap=abs(gap);minWord=word.join(".");minQ=q;}
    if(gap<=0n&&firstFailure===null){firstFailure={r,A,word:word.join("."),b:b.toString(),t:t.toString(),q:q.toString()};}

    const loose=sampleLooseWord(r,A),looseC=carry(loose);
    const looseB=mod(-looseC*invR,M),looseT=mod(looseC*invM,R);
    if(looseB>looseT)++loosePositive;
    else if(looseB<looseT)++looseNegative;
    else ++looseCollision;
    if(looseB<=looseT&&firstLooseFailure===null){
      firstLooseFailure={word:loose.join("."),b:looseB.toString(),t:looseT.toString()};
    }
  }
  rows.push({r,A,samples:samplesPerLength,positive,negative,collision,
    loosePositive,looseNegative,looseCollision,firstLooseFailure,
    minAbsGap:minGap.toString(),nearestQ:minQ.toString(),nearestWord:minWord});
}
console.log(JSON.stringify({target:"OPEN-CYCLE-INT-01",conjecture:"b>t for every nontrivial strict-record least rotation",rows,firstFailure,warning:"random finite falsification only"},null,2));
