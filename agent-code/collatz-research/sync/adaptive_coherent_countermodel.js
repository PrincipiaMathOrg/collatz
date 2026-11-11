"use strict";

// Construct a non-stabilizing nested chain of positive parity-cylinder representatives.
// Each appended block is w_r=1^(r-1)2, hence is a strict barrier and has endpoint
// v_3(x+1)=0.  The next r is chosen so the current representative does not already
// realize that extension, forcing the next compatible representative to acquire a
// nonzero higher binary lift.

function egcd(a,b){if(b===0n)return[a,1n,0n];const[g,x,y]=egcd(b,a%b);return[g,y,x-(a/b)*y];}
function invMod(a,m){const[g,x]=egcd(a,m);if(g!==1n)throw Error("inverse");return((x%m)+m)%m;}
function vp(n,p){let e=0;while(n%p===0n){e++;n/=p;}return e;}
function canonical(word){
  let A=0,C=0n,p3=1n;
  for(const a of word){C=3n*C+(1n<<BigInt(A));A+=a;p3*=3n;}
  const mod=1n<<BigInt(A+1);
  const rhs=(((1n<<BigInt(A))-C)%mod+mod)%mod;
  return{n:(rhs*invMod(p3%mod,mod))%mod,A,C,mod};
}
function uplus(x){const z=3n*x+1n,a=vp(z,2n);return[z>>BigInt(a),a];}
function followWord(seed,word){let x=seed;for(const expected of word){const[next,a]=uplus(x);
  if(a!==expected)return{matches:false,x,a,expected};x=next;}return{matches:true,x};}
function badBlock(r){return[...Array(r-1).fill(1),2];}

const stages=Number(process.argv[2]||12);
let word=[],previous=null,lastR=1;
for(let stage=1;stage<=stages;stage++){
  let r=Math.max(lastR+1,stage+1);
  if(previous!==null){
    const boundary=followWord(previous.n,word);
    if(!boundary.matches)throw Error("previous representative lost its prefix");
    while(followWord(boundary.x,badBlock(r)).matches)r++;
  }
  word.push(...badBlock(r));
  const current=canonical(word);
  const compatible=previous===null||current.n%previous.mod===previous.n;
  const changed=previous===null||current.n!==previous.n;
  if(!compatible||!changed)throw Error("adaptive lift did not change compatibly");
  const check=followWord(current.n,word);
  if(!check.matches)throw Error("canonical representative failed");

  // Re-follow by blocks and verify each bad endpoint has v_3(x+1)=0.
  let x=current.n,pos=0,allBad=true;
  const blockLengths=[];
  let cursor=0;
  // Recover block lengths from the terminal 2 markers.
  while(cursor<word.length){let len=0;do{len++;}while(word[cursor+len-1]!==2);blockLengths.push(len);cursor+=len;}
  for(const len of blockLengths){for(let i=0;i<len;i++)x=uplus(x)[0];if(vp(x+1n,3n)!==0)allBad=false;pos+=len;}
  console.log(JSON.stringify({stage,r,totalSteps:word.length,A:current.A,
    seed:current.n.toString(),modulus:current.mod.toString(),compatible,changed,allBad}));
  previous=current;lastR=r;
}
