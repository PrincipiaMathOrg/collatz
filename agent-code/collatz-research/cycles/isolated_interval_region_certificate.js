#!/usr/bin/env node
"use strict";

// Exact certificate for the central and 27 short-anchor interval regions.

function assert(ok,message){if(!ok)throw new Error(message);}
function gcd(a,b){while(b!==0)[a,b]=[b,a%b];return Math.abs(a);}

assert(2n**23n*50n**50n<69n**50n,"2^(23/50) bound failed");
assert(2n**13n*5n**50n<6n**50n,"2^(13/50) bound failed");
assert(2n**33n*5n**50n<8n**50n,"2^(33/50) bound failed");
assert(64n*438n*125n**2n<63n*50n*374n**2n,
  "central energy comparison failed");

assert(100n*374n**100n>101n*630n**17n*125n**100n,
  "K=70 base comparison failed");
assert(101n**100n>2n*100n**100n,"101/100 power comparison failed");
assert(2n**10n>630n,"fixed-factor comparison failed");

const kValues=[12,9,8];
let maxK=0;
for(const k1 of kValues)for(const k2 of kValues)for(const k3 of kValues){
  const g=gcd(gcd(gcd(12,k1),k2),k3);
  const K=(2*(k1+k2+k3)+12)/g;
  if(K>maxK)maxK=K;
}
assert(maxK===70,"anchor K maximum changed");

const r=503,N=798,B=295,L=208,M=87;
const anchors=[0,L,B];
const kval=q=>q===0?12:q===L?9:8;
let isolated=0,central=0,short=0,union=0;

function isCentral(c1,c2,c3){
  return 100*(c3-c1)<=23*r&&100*(c3-c2)<=13*r&&100*c3<=33*r;
}
function hasShortAnchor(c1,c2,c3){
  for(const q1 of anchors)for(const q2 of anchors)for(const q3 of anchors){
    const e1=q1-c1,e2=q2-c2,e3=q3-c3;
    const u=Math.min(e1,e2,e3,1);
    const v=Math.max(e1+1,e2+1,e3+1,1);
    if(v-u>=M)continue;
    const g=gcd(gcd(gcd(12,kval(q1)),kval(q2)),kval(q3));
    const K=(2*(kval(q1)+kval(q2)+kval(q3))+12)/g;
    assert(K<=70,"short-anchor K bound failed");
    return true;
  }
  return false;
}

for(let c1=1;c1<B;c1++)for(let c2=c1+1;c2<B;c2++)for(let c3=c2+1;c3<B;c3++){
  if([c2-c1,c3-c2,c3-c1].includes(L))continue;
  isolated++;
  const C=isCentral(c1,c2,c3),A=hasShortAnchor(c1,c2,c3);
  if(C)central++;
  if(A)short++;
  if(C||A)union++;
}

assert(isolated===4167132,"r=503 isolated-triple regression changed");
assert(central===493805,"r=503 central-region regression changed");
assert(short===2065075,"r=503 short-anchor regression changed");
assert(union===2448006,"r=503 union regression changed");

console.log(`isolated_triples_r503=${isolated}`);
console.log(`central_region_triples=${central}`);
console.log(`short_anchor_region_triples=${short}`);
console.log(`central_or_short_union=${union}`);
console.log(`max_primitive_anchor_l1=${maxK}`);
console.log("isolated_interval_region_certificate_passed=true");
