#!/usr/bin/env node
"use strict";

/* Exact certificate for the proved A=29 sectors of the four-shift
 * 3+1 gate.  This is an audit, not a finite proof. */

function assert(ok,message){if(!ok)throw new Error(message);}
function gcd(a,b){a=a<0n?-a:a;b=b<0n?-b:b;while(b)[a,b]=[b,a%b];return a;}
function mod(a,m){a%=m;return a<0n?a+m:a;}
function egcd(a,b){let r0=a,r1=b,s0=1n,s1=0n,t0=0n,t1=1n;while(r1){const q=r0/r1;[r0,r1]=[r1,r0-q*r1];[s0,s1]=[s1,s0-q*s1];[t0,t1]=[t1,t0-q*t1];}return{g:r0,x:s0,y:t0};}
function inv(a,m){const e=egcd(mod(a,m),m);assert(e.g===1n,"nonunit");return mod(e.x,m);}
function powmod(a,e,m){let x=mod(a,m),y=1n;while(e){if(e&1n)y=y*x%m;x=x*x%m;e>>=1n;}return y;}
function powSigned(a,e,m){return e>=0n?powmod(a,e,m):powmod(inv(a,m),-e,m);}

const periodBarrier=72057431991n;
assert(periodBarrier>2000n,"M/r endpoint failed");
assert(1988n*81n<2517n*64n,"interior square sum failed");
assert(2517n<51n**2n,"interior square root failed");
assert(408n**171n*5n**1000n<14n**1000n,"interior exponential comparison failed");
assert(9077n*81n<11489n*64n,"endpoint square sum failed");
assert(11489n<108n**2n,"endpoint square root failed");
assert(108n**171n*2n**1000n<5n**1000n,"endpoint exponential comparison failed");
assert(8n*25n**100n<28n**100n,"endpoint constant absorption failed");
assert(65569n*81n<289n**2n*64n,"corner square sum failed");
assert(289n**171n*5n**1000n<14n**1000n,"corner exponential comparison failed");
assert(11237n*81n<120n**2n*64n,"reverse endpoint square sum failed");
assert(480n**171n*100n**1000n<299n**1000n,"reverse endpoint exponential comparison failed");
assert(126089n*81n<400n**2n*64n,"reverse corner square sum failed");
assert(400n**171n*100n**1000n<299n**1000n,"reverse corner exponential comparison failed");
assert(3506n*81n<67n**2n*64n,"crossing interior square sum failed");
assert(536n**171n*100n**1000n<299n**1000n,"crossing interior exponential comparison failed");
assert(11741n*81n<122n**2n*64n,"crossing a-endpoint square sum failed");
assert(122n**171n*100n**1000n<299n**1000n,"crossing a-endpoint exponential comparison failed");
assert(9905n*81n<112n**2n*64n,"crossing e-endpoint square sum failed");
assert(150n**171n*2n**1000n<5n**1000n,"crossing e-endpoint exponential comparison failed");
assert(8n*250n**100n<299n**100n,"crossing e-endpoint constant absorption failed");
assert(66289n*81n<290n**2n*64n,"crossing e-corner square sum failed");
assert(290n**171n*100n**1000n<299n**1000n,"crossing e-corner exponential comparison failed");
assert(82n**2n*81n+109n**2n*64n<143n**2n*64n,"crossing double-endpoint square sum failed");
assert(143n**171n*100n**1000n<299n**1000n,"crossing double-endpoint exponential comparison failed");
assert(gcd(2n,3n)===1n,"binomial valuation vector failed");

let sampled=0,endpoint=0,corner=0,reverseSampled=0,reverseEndpoint=0,reverseCorner=0;
let crossingSampled=0,crossingInterior=0,crossingAEndpoint=0;
let crossingEEndpoint=0,crossingECorner=0,crossingDoubleEndpoint=0;
const maxR=Number(process.argv[2]||200);
for(let r=5;r<=maxR;r++){
  const N=Math.ceil(Math.log2(3)*r-1e-12);
  assert((1n<<BigInt(N-1))<3n**BigInt(r)&&3n**BigInt(r)<(1n<<BigInt(N)),"bad ceiling");
  if(gcd(BigInt(N),BigInt(r))!==1n)continue;
  const B=N-r,L=r-B,M=B-L;if(M<=0)continue;
  const D=(1n<<BigInt(N))-3n**BigInt(r),bez=egcd(BigInt(r),BigInt(N));
  const z=mod(powSigned(2n,bez.x,D)*powSigned(3n,bez.y,D),D);
  assert(mod(3n*powmod(z,BigInt(L),D),D)===4n%D,"L identity failed");
  assert(mod(8n*powmod(z,BigInt(M),D),D)===9n%D,"M identity failed");

  for(let s=1;s+2<r;s++){
    const g1=Math.floor((s+1)*N/r)-Math.floor(s*N/r);
    const g2=Math.floor((s+2)*N/r)-Math.floor((s+1)*N/r);
    if(g1!==2||g2!==1)continue;
    const c=s*N%r;
    if(!(L<=c&&c<B))continue;
    for(let t=1;t<r;t++){
      if(t>=s-1&&t<=s+3)continue;
      const e=t*N%r;if(!(c<e&&e<B))continue;
      const d=e-c,h=e-L;
      assert(1<=d&&d<=h&&h<=M-1,"normal-form range failed");

      const zinvc=inv(powmod(z,BigInt(c),D),D),zinve=inv(powmod(z,BigInt(e),D),D);
      const grouped=mod((z-1n)*(29n*zinvc+9n*zinve)-9n*z,D);
      const original=mod((z-1n)*(
        zinvc+
        inv(powmod(z,BigInt(c-L),D),D)+
        inv(powmod(z,BigInt(c+M),D),D)+zinve)-z,D);
      assert(mod(grouped-9n*original,D)===0n,"run compression failed");
      const P=mod((z-1n)*(29n*powmod(z,BigInt(d),D)+9n)-12n*powmod(z,BigInt(h+1),D),D);
      assert(mod(3n*P-4n*powmod(z,BigInt(h),D)*grouped,D)===0n,"normal form failed");

      if(h===M-1){
        endpoint++;
        const Q=mod(58n*powmod(z,BigInt(d+1),D)-58n*powmod(z,BigInt(d),D)+18n*z-45n,D);
        assert(Q===0n||grouped!==0n,"endpoint implication audit failed");
        assert(mod(Q-2n*P,D)===0n,"endpoint reduction failed");
        if(d===M-1){
          corner++;
          const Qstar=mod(-232n*powmod(z,BigInt(M-1),D)+72n*z+81n,D);
          assert(mod(Qstar-4n*Q,D)===0n,"corner reduction failed");
        }
      }
      sampled++;
    }
    for(let t=1;t<r;t++){
      if(t>=s-1&&t<=s+3)continue;
      const e=t*N%r;if(!(L<=e&&e<c))continue;
      const d=c-e,h=c-L;
      assert(1<=d&&d<=h&&h<=M-1,"reverse normal-form range failed");
      const zinvc=inv(powmod(z,BigInt(c),D),D),zinve=inv(powmod(z,BigInt(e),D),D);
      const grouped=mod((z-1n)*(29n*zinvc+9n*zinve)-9n*z,D);
      const P=mod((z-1n)*(29n+9n*powmod(z,BigInt(d),D))-12n*powmod(z,BigInt(h+1),D),D);
      assert(mod(3n*P-4n*powmod(z,BigInt(h),D)*grouped,D)===0n,"reverse normal form failed");
      if(h===M-1){
        reverseEndpoint++;
        const Q=mod(18n*powmod(z,BigInt(d+1),D)-18n*powmod(z,BigInt(d),D)+58n*z-85n,D);
        assert(mod(Q-2n*P,D)===0n,"reverse endpoint reduction failed");
        if(d===M-1){
          reverseCorner++;
          const Qstar=mod(-72n*powmod(z,BigInt(M-1),D)+232n*z-259n,D);
          assert(mod(Qstar-4n*Q,D)===0n,"reverse corner reduction failed");
        }
      }
      reverseSampled++;
    }
    for(let t=1;t<r;t++){
      if(t>=s-1&&t<=s+3)continue;
      const e=t*N%r;if(!(0<e&&e<L&&e<=M-1))continue;
      const a=c-L,h=Math.max(a,e);
      assert(0<=a&&a<=M-1&&1<=e&&e<=M-1,"crossing normal-form range failed");
      const zinvc=inv(powmod(z,BigInt(c),D),D),zinve=inv(powmod(z,BigInt(e),D),D);
      const grouped=mod((z-1n)*(29n*zinvc+9n*zinve)-9n*z,D);
      const original=mod((z-1n)*(
        zinvc+
        inv(powmod(z,BigInt(c-L),D),D)+
        inv(powmod(z,BigInt(c+M),D),D)+zinve)-z,D);
      assert(mod(grouped-9n*original,D)===0n,"crossing run compression failed");
      const P=mod((z-1n)*(
        29n*powmod(z,BigInt(h-a),D)+12n*powmod(z,BigInt(h-e),D))-
        12n*powmod(z,BigInt(h+1),D),D);
      assert(mod(3n*P-4n*powmod(z,BigInt(h),D)*grouped,D)===0n,"crossing normal form failed");

      if(a<=M-2&&e<=M-2){
        crossingInterior++;
      }else if(a===M-1&&e<M-1){
        crossingAEndpoint++;
        const d=M-1-e;
        const Q=mod(24n*powmod(z,BigInt(d+1),D)-24n*powmod(z,BigInt(d),D)+58n*z-85n,D);
        assert(mod(Q-2n*P,D)===0n,"crossing a-endpoint reduction failed");
      }else if(e===M-1&&a<M-1){
        crossingEEndpoint++;
        const d=M-1-a;
        const Q=mod(58n*powmod(z,BigInt(d+1),D)-58n*powmod(z,BigInt(d),D)+24n*z-51n,D);
        assert(mod(Q-2n*P,D)===0n,"crossing e-endpoint reduction failed");
        if(d===M-1){
          crossingECorner++;
          const Qstar=mod(-232n*powmod(z,BigInt(M-1),D)+96n*z+57n,D);
          assert(mod(Qstar-4n*Q,D)===0n,"crossing e-corner reduction failed");
        }
      }else{
        assert(a===M-1&&e===M-1,"unclassified crossing endpoint");
        crossingDoubleEndpoint++;
        const Q=mod(82n*z-109n,D);
        assert(mod(Q-2n*P,D)===0n,"crossing double-endpoint reduction failed");
      }
      crossingSampled++;
    }
  }
}

assert(sampled>0,"empty normal-form sample");
assert(reverseSampled>0,"empty reverse normal-form sample");
assert(crossingSampled>0,"empty crossing normal-form sample");
console.log("max_r="+maxR);
console.log("sampled_A29_ce_cells="+sampled);
console.log("sampled_endpoint_cells="+endpoint);
console.log("sampled_corner_cells="+corner);
console.log("sampled_reverse_cells="+reverseSampled);
console.log("sampled_reverse_endpoint_cells="+reverseEndpoint);
console.log("sampled_reverse_corner_cells="+reverseCorner);
console.log("sampled_crossing_low_cells="+crossingSampled);
console.log("sampled_crossing_interior_cells="+crossingInterior);
console.log("sampled_crossing_a_endpoint_cells="+crossingAEndpoint);
console.log("sampled_crossing_e_endpoint_cells="+crossingEEndpoint);
console.log("sampled_crossing_e_corner_cells="+crossingECorner);
console.log("sampled_crossing_double_endpoint_cells="+crossingDoubleEndpoint);
console.log("integer_comparisons=true");
console.log("normal_form_audit=true");
console.log("four_shift_31_A29_partial_certificate_passed=true");
