#!/usr/bin/env node
"use strict";

// Test the parity-centered filter criterion for terminal-preserving
// minimal q_s=2 FCD failures.  If epsilon_c=V_c mod 2 and
// v_c=V_c-epsilon_c*D, then every nonempty removable cell filter R in a
// minimal failure must satisfy sum_{c in R} v_c>tau>=0.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function bitLength(n) {
  assert(n>0n, "bit length requires a positive integer");
  return n.toString(2).length;
}

function mod(a, m) {
  const value=a%m;
  return value<0n ? value+m : value;
}

function inverse(a, m) {
  let oldR=a;
  let r=m;
  let oldS=1n;
  let s=0n;
  while (r!==0n) {
    const q=oldR/r;
    [oldR,r]=[r,oldR-q*r];
    [oldS,s]=[s,oldS-q*s];
  }
  assert(oldR===1n, "inverse does not exist");
  return mod(oldS,m);
}

const maximumWeight=Number(process.argv[2] || 20);
assert(Number.isInteger(maximumWeight) && maximumWeight>=5,
  "usage: q2_centered_filter_probe.js MAX_WEIGHT");

const powers3=[1n];
for (let i=1;i<=maximumWeight;++i) powers3.push(3n*powers3[i-1]);

let q2Weights=0;
let anchoredProfiles=0;
let fourNonterminalCornerProfiles=0;
let evenTopCornerProfiles=0;
let positiveMinimumFilterProfiles=0;
let zeroMinimumFilterProfiles=0;
let negativeMinimumFilterProfiles=0;
let maximumPositiveCornerCount=0;
const positiveCornerHistogram={};
let maximumPositiveMinimum=null;
const firstPositiveProfiles=[];
const firstNonpositiveWitnesses=[];

for (let weight=5;weight<=maximumWeight;++weight) {
  const P=powers3[weight];
  const previousP=powers3[weight-1];
  const N=bitLength(P);
  if (N-bitLength(previousP)!==1) continue;
  ++q2Weights;

  const M=1n<<BigInt(N);
  const D=M-P;
  const inverseP=inverse(P,M);
  const mechanical=Array(weight).fill(0);
  for (let i=1;i<weight;++i) {
    mechanical[i]=bitLength(powers3[i])-1-i;
  }

  const thresholds=Array.from({length:weight},()=>[]);
  for (let i=1;i<weight-1;++i) {
    for (let r=1;r<=mechanical[i];++r) {
      const delta=(1n<<BigInt(i+r-1))*powers3[weight-1-i];
      const L=mod(delta*inverseP,M);
      const numerator=D*L+delta;
      assert(numerator%M===0n, "nonintegral threshold");
      const V=numerator/M;
      assert(0n<V && V<D, "threshold escaped reduced interval");
      const epsilon=V&1n;
      thresholds[i][r]={L,V,epsilon,centered:V-epsilon*D};
    }
  }

  const delays=Array(weight).fill(0);

  function minimumNonemptyFilter() {
    // A state records the least centered removed mass after processing the
    // current row, indexed by its retained height and by whether any cell
    // has been removed.
    let states=new Map();
    states.set("0,0",{mass:0n,path:[0],changed:false});

    for (let i=1;i<weight-1;++i) {
      const suffix=Array(delays[i]+1).fill(0n);
      let running=0n;
      for (let r=delays[i];r>=1;--r) {
        running+=thresholds[i][r].centered;
        suffix[r-1]=running;
      }

      const next=new Map();
      for (const state of states.values()) {
        const previous=state.path[state.path.length-1];
        for (let retained=previous;retained<=delays[i];++retained) {
          const changed=state.changed || retained<delays[i];
          const mass=state.mass+suffix[retained];
          const key=retained+","+(changed ? 1 : 0);
          const incumbent=next.get(key);
          if (incumbent===undefined || mass<incumbent.mass) {
            next.set(key,{
              mass,
              changed,
              path:state.path.concat([retained])
            });
          }
        }
      }
      states=next;
    }

    let best=null;
    for (const state of states.values()) {
      if (!state.changed) continue;
      if (best===null || state.mass<best.mass) best=state;
    }
    assert(best!==null, "profile has no proper terminal-preserving subideal");
    return best;
  }

  function visit(i, previousDelay) {
    if (i===weight-1) {
      delays[i]=mechanical[i];
      if (delays[i]<previousDelay) return;
      ++anchoredProfiles;

      const corners=[];
      for (let j=1;j<weight-1;++j) {
        if (delays[j]>delays[j-1]) {
          corners.push({i:j,r:delays[j],data:thresholds[j][delays[j]]});
        }
      }
      if (corners.length<4) return;
      ++fourNonterminalCornerProfiles;
      if (corners.some(corner=>corner.data.epsilon!==0n)) return;
      ++evenTopCornerProfiles;

      const minimum=minimumNonemptyFilter();
      if (minimum.mass>0n) {
        ++positiveMinimumFilterProfiles;
        maximumPositiveCornerCount=Math.max(maximumPositiveCornerCount,
          corners.length);
        positiveCornerHistogram[corners.length]=
          (positiveCornerHistogram[corners.length] || 0)+1;
        if (maximumPositiveMinimum===null ||
            minimum.mass>maximumPositiveMinimum.mass) {
          maximumPositiveMinimum={
            weight,
            delays:delays.slice(),
            mass:minimum.mass
          };
        }
        if (firstPositiveProfiles.length<12) {
          firstPositiveProfiles.push({
            weight,
            delays:delays.slice(),
            nonterminalCorners:corners.length,
            minimumFilterMass:minimum.mass.toString(),
            minimizingRetainedDelays:minimum.path.concat([
              mechanical[weight-1]
            ])
          });
        }
      } else {
        if (minimum.mass===0n) ++zeroMinimumFilterProfiles;
        else ++negativeMinimumFilterProfiles;
        if (firstNonpositiveWitnesses.length<12) {
          firstNonpositiveWitnesses.push({
            weight,
            delays:delays.slice(),
            minimumFilterMass:minimum.mass.toString(),
            minimizingRetainedDelays:minimum.path.concat([
              mechanical[weight-1]
            ])
          });
        }
      }
      return;
    }

    for (let value=previousDelay;value<=mechanical[i];++value) {
      delays[i]=value;
      visit(i+1,value);
    }
  }

  delays[0]=0;
  visit(1,0);
}

if (maximumWeight===20) {
  assert(q2Weights===7, "centered-filter q2 weight count changed");
  assert(anchoredProfiles===2029915,
    "centered-filter anchored profile count changed");
  assert(fourNonterminalCornerProfiles===1988998,
    "centered-filter four-corner profile count changed");
  assert(evenTopCornerProfiles===51978,
    "centered-filter even-corner profile count changed");
  assert(positiveMinimumFilterProfiles===395,
    "centered-filter positive minimum count changed");
  assert(zeroMinimumFilterProfiles===0,
    "centered-filter zero minimum count changed");
  assert(negativeMinimumFilterProfiles===51583,
    "centered-filter negative minimum count changed");
  assert(maximumPositiveCornerCount===7,
    "centered-filter positive corner maximum changed");
  assert(positiveCornerHistogram[4]===185 &&
    positiveCornerHistogram[5]===166 &&
    positiveCornerHistogram[6]===41 &&
    positiveCornerHistogram[7]===3,
    "centered-filter corner histogram changed");
}

console.log(JSON.stringify({
  probe:"parity-centered removable-filter mass",
  maximumWeight,
  q2Weights,
  anchoredProfiles,
  fourNonterminalCornerProfiles,
  evenTopCornerProfiles,
  positiveMinimumFilterProfiles,
  zeroMinimumFilterProfiles,
  negativeMinimumFilterProfiles,
  maximumPositiveCornerCount,
  positiveCornerHistogram,
  maximumPositiveMinimum:maximumPositiveMinimum===null ? null : {
    weight:maximumPositiveMinimum.weight,
    delays:maximumPositiveMinimum.delays,
    mass:maximumPositiveMinimum.mass.toString()
  },
  firstPositiveProfiles,
  firstNonpositiveWitnesses,
  warning:"formal board/filter criterion only; no target residue is asserted"
},null,2));
