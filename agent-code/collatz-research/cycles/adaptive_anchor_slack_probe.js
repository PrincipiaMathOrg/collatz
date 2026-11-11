#!/usr/bin/env node
"use strict";

/* Diagnostic for a support-independent anchor mesh.
 *
 * For N=ceil(r log_2 3), B=N-r, insert the residues
 *   0, B, 2B, ... (mod r).
 * If G_m is the largest cyclic gap among the first m residues, record
 *   sigma_m = r/G_m-(m-1).
 * A direct common-scale resultant could absorb a support factor k only if
 * sigma_m > log_3(C k).  This script tests whether max sigma grows at the
 * required logarithmic rate.  It is a diagnostic, not a certificate.
 */

function gcd(a,b){while(b)[a,b]=[b,a%b];return Math.abs(a);}
class BIT{
  constructor(n){this.n=n;this.a=new Int32Array(n+1);}
  add(i,v){for(i++;i<=this.n;i+=i&-i)this.a[i]+=v;}
  sum(i){let s=0;for(i++;i>0;i-=i&-i)s+=this.a[i];return s;}
  kth(k){let i=0,bit=1;while((bit<<1)<=this.n)bit<<=1;
    for(;bit;bit>>=1){const j=i+bit;if(j<=this.n&&this.a[j]<k){i=j;k-=this.a[j];}}
    return i;
  }
}
class MaxHeap{
  constructor(){this.a=[];}
  push(x){const a=this.a;let i=a.length;a.push(x);while(i){const p=(i-1)>>1;if(a[p]>=x)break;a[i]=a[p];i=p;}a[i]=x;}
  pop(){const a=this.a,top=a[0],x=a.pop();if(a.length){let i=0;while(true){let c=2*i+1;if(c>=a.length)break;if(c+1<a.length&&a[c+1]>a[c])c++;if(a[c]<=x)break;a[i]=a[c];i=c;}a[i]=x;}return top;}
  top(){return this.a[0];}
}
function probe(r){
  const alpha=Math.log2(3),N=Math.ceil(alpha*r-1e-12),B=N-r;
  if(gcd(N,r)!==1)return null;
  const bit=new BIT(r),heap=new MaxHeap(),cnt=new Map();
  const addGap=g=>{cnt.set(g,(cnt.get(g)||0)+1);heap.push(g);};
  const delGap=g=>cnt.set(g,(cnt.get(g)||0)-1);
  const maxGap=()=>{while((cnt.get(heap.top())||0)<=0)heap.pop();return heap.top();};
  let n=1,x=0;bit.add(0,1);addGap(r);
  let best={sigma:1,n:1,G:r};
  for(let j=1;j<r;j++){
    x=(x+B)%r;
    const before=bit.sum(x-1),atOrBefore=bit.sum(x),pred=before?bit.kth(before):bit.kth(n);
    const succ=atOrBefore<n?bit.kth(atOrBefore+1):bit.kth(1);
    const old=(succ-pred+r)%r||r,g1=(x-pred+r)%r,g2=(succ-x+r)%r;
    delGap(old);addGap(g1);addGap(g2);bit.add(x,1);n++;
    const G=maxGap(),sigma=r/G-(n-1);
    if(sigma>best.sigma)best={sigma,n,G};
  }
  return{r,N,B,best,log3r:Math.log(r)/Math.log(3),margin:best.sigma-Math.log(r)/Math.log(3)};
}

const args=process.argv.slice(2).map(Number);
const rs=args.length?args:[101,211,503,1009,2003,5003,10007,20011,50021,100003,200003];
for(const r of rs){const p=probe(r);console.log(p?JSON.stringify(p):JSON.stringify({r,skipped:"gcd"}));}
