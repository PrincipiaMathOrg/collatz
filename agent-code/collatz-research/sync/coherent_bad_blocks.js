"use strict";

// Build the coherent valuation word W_K = w_2 w_3 ... w_(K+1), where
// w_r = 1^(r-1) 2.  Every block is a strict barrier and its endpoint has v_3(x+1)=0.
// The canonical seeds below are compatible modulo the preceding powers of two.

function egcd(a,b){if(b===0n)return[a,1n,0n];const[g,x,y]=egcd(b,a%b);return[g,y,x-(a/b)*y];}
function invMod(a,m){const[g,x]=egcd(a,m);if(g!==1n)throw Error("inverse");return((x%m)+m)%m;}
function pow(base,exp){let z=1n;for(let i=0;i<exp;i++)z*=base;return z;}
function vp(n,p){let e=0;while(n%p===0n){e++;n/=p;}return e;}
function canonical(word){
  let A=0,C=0n,p3=1n;
  for(const a of word){C=3n*C+(1n<<BigInt(A));A+=a;p3*=3n;}
  const mod=1n<<BigInt(A+1);
  const rhs=(((1n<<BigInt(A))-C)%mod+mod)%mod;
  const n=(rhs*invMod(p3%mod,mod))%mod;
  return{n,A,C,mod};
}
function uplus(x){const z=3n*x+1n,a=vp(z,2n);return[z>>BigInt(a),a];}

let word=[],previous=null,totalSteps=0;
const maxBlocks=Number(process.argv[2]||14);
for(let block=1;block<=maxBlocks;block++){
  const r=block+1;
  for(let i=0;i<r-1;i++)word.push(1);
  word.push(2);totalSteps+=r;
  const c=canonical(word);
  const compatible=previous===null || c.n%previous.mod===previous.n;
  if(!compatible)console.log(JSON.stringify({compatibilityFailure:true,
    residue:(c.n%previous.mod).toString(),expected:previous.n.toString(),
    previousModulus:previous.mod.toString()}));
  let x=c.n,pos=0,allWords=true,allBad=true;
  for(let b=1;b<=block;b++){
    const rb=b+1;
    for(let i=0;i<rb;i++){
      const[next,a]=uplus(x);x=next;
      const expected=i===rb-1?2:1;
      if(a!==expected)allWords=false;
    }
    if(vp(x+1n,3n)!==0)allBad=false;
    pos+=rb;
  }
  const bitLength=c.n.toString(2).length;
  console.log(JSON.stringify({block,r,totalSteps,A:c.A,seed:c.n.toString(),
    modulus:c.mod.toString(),bitLength,topGap:c.A+1-bitLength,compatible,allWords,allBad}));
  previous=c;
}
