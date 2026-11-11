#!/usr/bin/env node
"use strict";

/* Exact arithmetic certificate for the all-depth A=29 crossing theorem.
 * The period loop is only a normal-form audit.  The theorem is certified
 * by the finite coefficient ledger and the exact exponential comparisons. */

function assert(ok,message){if(!ok)throw new Error(message);}
function gcd(a,b){a=a<0n?-a:a;b=b<0n?-b:b;while(b)[a,b]=[b,a%b];return a;}
function mod(a,m){a%=m;return a<0n?a+m:a;}
function egcd(a,b){let r0=a,r1=b,s0=1n,s1=0n,t0=0n,t1=1n;while(r1){const q=r0/r1;[r0,r1]=[r1,r0-q*r1];[s0,s1]=[s1,s0-q*s1];[t0,t1]=[t1,t0-q*t1];}return{g:r0,x:s0,y:t0};}
function inv(a,m){const e=egcd(mod(a,m),m);assert(e.g===1n,"nonunit");return mod(e.x,m);}
function powmod(a,e,m){let x=mod(a,m),y=1n;while(e){if(e&1n)y=y*x%m;x=x*x%m;e>>=1n;}return y;}
function powSigned(a,e,m){return e>=0n?powmod(a,e,m):powmod(inv(a,m),-e,m);}
function vp(a,p){let n=0,P=BigInt(p);a=a<0n?-a:a;while(a%P===0n){a/=P;n++;}return n;}
function signEnergy(A,B,C){return (A+B)**2n+(A+B+C)**2n;}
function fCloses(U,label){
  assert((3n**24n*U)**21n*100n**2000n<299n**2000n,label+" F comparison failed");
}

/* Euclidean-ratio and determinant-scale comparisons. */
assert(2n**1981n<3n**1250n,"E/r rational bound failed");
assert(2n**130n*63n<3n**82n*65n,"G root-radius bound failed");
assert(3n**5n<7n**3n,"3^(5/3) bound failed");
assert(424n**171n*100n**1000n<299n**1000n,"low-d interior comparison failed");
assert(2204n*81n<53n**2n*64n,"low-d interior energy failed");
assert(104849n*81n<365n**2n*64n,"low-d endpoint energy failed");
assert(365n**171n*100n**1000n<299n**1000n,"low-d endpoint comparison failed");

/* One uniform E-resultant envelope. */
const eTriples=[
  [232n,81n,96n],
  [232n,81n,108n],
  [87n,32n,36n],
  [2349n,864n,1024n],
  [1856n,729n,864n],
  [696n,256n,324n]
];
let maxEU=0n;
for(const [A,B,C] of eTriples){
  const U=signEnergy(A,B,C);if(U>maxEU)maxEU=U;
}
assert(maxEU===28275538n,"unexpected E energy maximum");
assert(256n**2n*maxEU<1400000n**2n,"E envelope failed");
assert(1400000n**19n*100n**250n<299n**250n,"E exponential comparison failed");

/* The shifted q_a=1,q_u=2 boundary polynomial. */
const shiftedU=(475136n+186624n)**2n+(475136n+177147n+209952n)**2n;
assert(shiftedU===1181375492825n,"shifted E energy changed");
assert(56n**2n*shiftedU<251000n**2n*243n**2n,"shifted E envelope failed");
assert(251000n**19n*100n**250n<299n**250n,"shifted E exponential comparison failed");

/* The q_a=1,q_u=0 coefficient ledger. */
function pqCoefficients(p,q){
  const raw=[
    {v2:3,v3:0,odd:29n},
    {v2:-19*q,v3:4+12*q,odd:1n},
    {v2:13-19*p,v3:-4+12*p,odd:1n}
  ];
  const m2=Math.min(...raw.map(x=>x.v2)),m3=Math.min(...raw.map(x=>x.v3));
  return raw.map(x=>x.odd*2n**BigInt(x.v2-m2)*3n**BigInt(x.v3-m3));
}
let fBranches=0;
let maxLedgerU=0n;
for(let p=0;p<=3;p++)for(let q=0;q<=p;q++){
  if(p===3&&q===3)continue;
  const [A,B,C]=pqCoefficients(p,q),U=signEnergy(A,B,C);
  if(U>maxLedgerU)maxLedgerU=U;
  fCloses(U,`p=${p},q=${q}`);fBranches++;
}
assert(fBranches===9,"wrong F branch count");
assert(3n**24n*maxLedgerU<10n**44n,"uniform F-ledger envelope failed");
assert(10n**462n*100n**1000n<299n**1000n,"uniform F-ledger exponential comparison failed");

/* The terminal p=q=3 G-cell. */
const gA=29n*2n**60n,gB=3n**40n,gC=2n**13n*3n**32n;
const gU=2n*(gA+gB)**2n+gC**2n;
assert(3n**18n*65n*gU*100n**106n<63n*299n**106n,"terminal G comparison failed");

/* F-resultants produced by the upper-a top shift. */
const fTriples=[
  [169128n,65536n,78732n],
  [169128n*8n,3n**12n,78732n*8n]
];
for(const [A,B,C] of fTriples)fCloses(signEnergy(A,B,C),"upper-a triple");

/* The w=0 shifted endpoint, including f=F. */
const endpointU=169128n**2n+(169128n+13196n)**2n+65536n**2n;
fCloses(endpointU,"w=0 endpoint");
const linX=169128n*3n**12n-13196n*2n**19n;
const linC=-169128n*3n**12n-65536n*2n**19n;
fCloses(linX**2n+linC**2n,"w=0,f=F endpoint");
const upperFMax=[
  ...fTriples.map(x=>signEnergy(...x)),endpointU,linX**2n+linC**2n
].reduce((a,b)=>a>b?a:b);
assert(3n**24n*upperFMax<10n**34n,"uniform upper-a F envelope failed");
assert(10n**357n*100n**1000n<299n**1000n,"uniform upper-a F exponential comparison failed");

/* Formal endpoint reductions modulo the relevant binomials. */
assert(24n===3n*8n&&27n===3n*9n,"M endpoint identity failed");
assert(475136n===1856n*256n,"shifted coefficient failed");
assert(177147n===729n*243n,"shifted E-1 coefficient failed");
assert(209952n===864n*243n,"shifted residual coefficient failed");
assert(186624n===729n*256n,"shifted constant failed");

/* Sampled normal-form audit. */
let lowD=0,lowDEnd=0,qOne=0,qOneUpperA=0,qOneLowerA=0,qTwo=0;
let eDirect=0,eReciprocal=0,fLedger=0,gTerminal=0,specialQ12=0;
let upperOneFold=0,upperTwoFold=0,upperFFold=0,upperZeroResidual=0,upperLinearEndpoint=0;
const maxR=Number(process.argv[2]||200);
for(let r=20;r<=maxR;r++){
  const N=Math.ceil(Math.log2(3)*r-1e-12);
  assert((1n<<BigInt(N-1))<3n**BigInt(r)&&3n**BigInt(r)<(1n<<BigInt(N)),"bad ceiling");
  if(gcd(BigInt(N),BigInt(r))!==1n)continue;
  const B=N-r,L=r-B,M=B-L,E=L-2*M,F=M-2*E,G=E-3*F;
  if(!(G>0&&F>0&&E>0))continue;
  const D=(1n<<BigInt(N))-3n**BigInt(r),bez=egcd(BigInt(r),BigInt(N));
  const z=mod(powSigned(2n,bez.x,D)*powSigned(3n,bez.y,D),D),beta=inv(z,D);
  assert(mod(3n*powmod(z,BigInt(L),D),D)===4n%D,"L identity failed");
  assert(mod(8n*powmod(z,BigInt(M),D),D)===9n%D,"M identity failed");
  assert(mod(243n*powmod(z,BigInt(E),D),D)===256n%D,"E identity failed");
  assert(mod(2n**19n*powmod(z,BigInt(F),D),D)===3n**12n%D,"F identity failed");
  assert(mod(3n**41n*powmod(z,BigInt(G),D),D)===2n**65n%D,"G identity failed");

  function diff(coef,x){return coef*(powmod(z,BigInt(x),D)-powmod(z,BigInt(x-1),D));}
  for(let s0=1;s0+2<r;s0++){
    const g1=Math.floor((s0+1)*N/r)-Math.floor(s0*N/r);
    const g2=Math.floor((s0+2)*N/r)-Math.floor((s0+1)*N/r);
    if(g1!==2||g2!==1)continue;
    const c=s0*N%r;if(!(L<=c&&c<B))continue;
    for(let t0=1;t0<r;t0++){
      if(t0>=s0-1&&t0<=s0+3)continue;
      const e=t0*N%r;if(!(M<=e&&e<L))continue;
      const a=c-L,d=c-e;
      const grouped=mod((z-1n)*(29n*inv(powmod(z,BigInt(c),D),D)+9n*inv(powmod(z,BigInt(e),D),D))-9n*z,D);
      const P=mod((z-1n)*(29n+9n*powmod(z,BigInt(d),D))-12n*powmod(z,BigInt(a+1),D),D);
      assert(mod(P-powmod(z,BigInt(c),D)*grouped,D)===0n,"L-anchor normal form failed");

      if(d<M){
        lowD++;
        if(d===M-1){
          lowDEnd++;
          const Q=mod(-72n*powmod(z,BigInt(M-1),D)-96n*powmod(z,BigInt(a+1),D)+232n*z-151n,D);
          assert(mod(Q-8n*P,D)===0n,"low-d endpoint failed");
        }
        continue;
      }
      if(d>=2*M){
        qTwo++;
        const v=d-2*M,f=M-a;
        const Q=mod(diff(1856n,f)+diff(729n,v+f)-864n,D);
        assert(mod(Q-powmod(z,BigInt(f-1),D)*64n*P,D)===0n,"q=2 top shift failed");
        continue;
      }

      qOne++;
      const u=d-M;
      const W=mod((z-1n)*(232n+81n*powmod(z,BigInt(u),D))-96n*powmod(z,BigInt(a+1),D),D);
      assert(mod(W-8n*P,D)===0n,"q=1 M-fold failed");
      if(a>=2*E){
        qOneUpperA++;
        const f=M-a,k=u+f;
        const Q=mod(diff(232n,f)+diff(81n,k)-108n,D);
        assert(mod(Q-powmod(z,BigInt(f-1),D)*W,D)===0n,"upper-a top shift failed");
        const q=Math.floor(k/E),w=k-q*E;
        assert(0<=q&&q<=2,"upper-a E quotient failed");
        if(q===1&&w>=1){
          upperOneFold++;
          const R=mod(diff(696n,f)+diff(256n,w)-324n,D);
          assert(mod(R-3n*Q,D)===0n,"upper-a one-E fold failed");
        }
        if(q===2&&w>=1){
          upperTwoFold++;
          const R=mod(diff(169128n,f)+diff(65536n,w)-78732n,D);
          assert(mod(R-729n*Q,D)===0n,"upper-a two-E fold failed");
          if(w>F){
            upperFFold++;
            const y=w-F,Rf=mod(diff(1353024n,f)+diff(531441n,y)-629856n,D);
            assert(mod(Rf-8n*R,D)===0n,"upper-a F fold failed");
          }
        }
        if(q===2&&w===0){
          upperZeroResidual++;
          const R=mod(diff(169128n,f+1)+65536n*(z-1n)-78732n*z,D);
          assert(mod(R-729n*z*Q,D)===0n,"upper-a zero-residual fold failed");
          if(f===F){
            upperLinearEndpoint++;
            const Rlin=mod(linX*z+linC,D);
            assert(mod(Rlin-2n**19n*R,D)===0n,"upper-a linear endpoint failed");
          }
        }
        continue;
      }

      qOneLowerA++;
      const qa=Math.floor(a/E),b=a-qa*E,qu=Math.floor(u/E),v=u-qu*E;
      assert((qa===0||qa===1)&&0<=qu&&qu<=2,"lower-a E digits failed");
      if(qa===0||(qa===1&&qu===1)){eDirect++;continue;}
      if(qa===1&&qu===0){
        if(b<u){
          eReciprocal++;
          const k=a-u;
          const R=mod(2349n*(powmod(beta,BigInt(b),D)-powmod(beta,BigInt(b+1),D))+
            864n*(powmod(beta,BigInt(k),D)-powmod(beta,BigInt(k+1),D))-1024n,D);
          const Wrev=mod(powmod(beta,BigInt(a+1),D)*W,D);
          assert(mod(24n*R-256n*Wrev,D)===0n,"reciprocal E fold failed");
        }else{
          const p=Math.floor(b/F),ss=b-p*F,q=Math.floor(u/F),tt=u-q*F;
          assert(q<=p,"F digit order failed");
          const coeff=pqCoefficients(p,q),R=mod(coeff[0]*(z-1n)+
            coeff[1]*(powmod(z,BigInt(tt+1),D)-powmod(z,BigInt(tt),D))-
            coeff[2]*powmod(z,BigInt(ss+1),D),D);
          const raw=[{v2:3,v3:0},{v2:-19*q,v3:4+12*q},{v2:13-19*p,v3:-4+12*p}];
          const m2=Math.min(...raw.map(x=>x.v2)),m3=Math.min(...raw.map(x=>x.v3));
          const scale=mod(powSigned(2n,BigInt(-m2),D)*powSigned(3n,BigInt(-m3),D),D);
          assert(mod(R-scale*W,D)===0n,"F ledger normal form failed");
          if(p===3&&q===3)gTerminal++;else fLedger++;
        }
        continue;
      }
      assert(qa===1&&qu===2&&v<=b,"missing q_a=1,q_u=2 cell");
      specialQ12++;
      const f=M-u,k=u-a,p=f+k;
      const R=mod(diff(1856n,p)+diff(729n,k)-864n,D);
      assert(mod(R-8n*powmod(z,BigInt(f+k-1),D)*W,D)===0n,"q_a=1,q_u=2 shift failed");
      if(p>E){
        const delta=b-v;
        const Q=mod(diff(475136n,f)-177147n*powmod(z,BigInt(E-1),D)-
          209952n*powmod(z,BigInt(delta),D)+186624n,D);
        assert(mod(Q-243n*powmod(z,BigInt(delta),D)*R,D)===0n,"shifted E boundary failed");
      }
    }
  }
}

assert(lowD>0&&qOne>0&&qTwo>0,"empty principal sample");
assert(qOneUpperA>0&&qOneLowerA>0,"empty q=1 split sample");
assert(eDirect>0&&eReciprocal>0&&fLedger>0&&gTerminal>0&&specialQ12>0,"empty lower-a sample");
console.log("max_r="+maxR);
console.log("sampled_low_d="+lowD);
console.log("sampled_low_d_endpoint="+lowDEnd);
console.log("sampled_q_one="+qOne);
console.log("sampled_q_one_upper_a="+qOneUpperA);
console.log("sampled_q_one_lower_a="+qOneLowerA);
console.log("sampled_q_two="+qTwo);
console.log("sampled_E_direct="+eDirect);
console.log("sampled_E_reciprocal="+eReciprocal);
console.log("sampled_F_ledger="+fLedger);
console.log("sampled_G_terminal="+gTerminal);
console.log("sampled_special_q12="+specialQ12);
console.log("sampled_upper_one_E_fold="+upperOneFold);
console.log("sampled_upper_two_E_fold="+upperTwoFold);
console.log("sampled_upper_F_fold="+upperFFold);
console.log("sampled_upper_zero_residual="+upperZeroResidual);
console.log("sampled_upper_linear_endpoint="+upperLinearEndpoint);
console.log("F_coefficient_branches="+fBranches);
console.log("integer_comparisons=true");
console.log("normal_form_audit=true");
console.log("four_shift_31_A29_crossing_complete_certificate_passed=true");
