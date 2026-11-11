#!/usr/bin/env node
"use strict";

/*
Exact falsification harness for the full binary/ternary boundary-collision
form of the cycle-integrality gate.

For a least-rotation strict-record word a of length r and total exponent A,
put D=2^A-3^r and let C be its carry.  Define

  b = -C 3^{-r} (mod 2^A),   0 <= b < 2^A,
  t =  C 2^{-A} (mod 3^r),   0 <= t < 3^r.

If D divides C and the integer fixed point is below 2^A, then b=t is that
state.  Conversely, b=t forces C=D b directly from the affine endpoint
identity.  Thus collision is exactly the q=1 gate in the audited cycle
regime, where the polynomial state bound is far below 2^A.  The script looks for additional
sign, adjacency, or gap structure; finite output is not a proof.
*/

const maxR = Number(process.argv[2] || 17);
const maxAllR = Number(process.argv[3] || 14);
const alpha = Math.log2(3);

function abs(n) { return n < 0n ? -n : n; }

function gcd(a, b) {
  a = abs(a); b = abs(b);
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

function mod(a, m) {
  a %= m;
  return a < 0n ? a + m : a;
}

function extendedGcd(a, b) {
  if (b === 0n) return {g: a, x: 1n, y: 0n};
  const z = extendedGcd(b, a % b);
  return {g: z.g, x: z.y, y: z.x - (a / b) * z.y};
}

function inverseMod(a, m) {
  const z = extendedGcd(mod(a, m), m);
  if (z.g !== 1n) throw new Error("nonunit modular inverse");
  return mod(z.x, m);
}

function isProperPower(word) {
  for (let d = 1; d < word.length; ++d) {
    if (word.length % d !== 0) continue;
    let same = true;
    for (let i = d; i < word.length; ++i) {
      if (word[i] !== word[i % d]) { same = false; break; }
    }
    if (same) return true;
  }
  return false;
}

const modulusCache = new Map();
function modulusData(r, A) {
  const key = `${r}:${A}`;
  let out = modulusCache.get(key);
  if (out) return out;
  const R = 3n ** BigInt(r), M = 1n << BigInt(A), D = M - R;
  out = {R, M, D, invR: inverseMod(R, M), invM: inverseMod(M, R)};
  modulusCache.set(key, out);
  return out;
}

function data(word) {
  let C = 0n, A = 0n;
  for (const a of word) {
    C = 3n * C + (1n << A);
    A += BigInt(a);
  }
  const {R, M, D, invR, invM} = modulusData(word.length, Number(A));
  const g = gcd(C, D);
  const q = D / g;
  const p = C / g;
  const b = mod(-C * invR, M);
  const t = mod(C * invM, R);
  const z = (R * b + C) / M;
  if ((R * b + C) % M !== 0n || z < 0n || z >= 2n * R) {
    throw new Error("canonical endpoint range failure");
  }
  if ((D * b - C) % M !== 0n || (D * t - C) % R !== 0n) {
    throw new Error("boundary congruence failure");
  }
  if (!(0n < C && C * 2n < M * R)) {
    throw new Error("carry product bound failure");
  }
  const collision = b === t;
  const canonicalIntegral = C % D === 0n && C / D === b;
  if (collision !== canonicalIntegral || (collision && q !== 1n)) {
    throw new Error("canonical collision/integrality failure");
  }
  const k2 = (q * b - p) / M;
  const k3 = (q * t - p) / R;
  if (q * (b - t) !== k2 * M - k3 * R) {
    throw new Error("boundary index identity failure");
  }
  return {A, C, R, M, D, g, q, p, b, t, z, k2, k3, collision};
}

function updateNear(best, word, d) {
  const gap = abs(d.b - d.t);
  if (best === null || gap < best.gap ||
      (gap === best.gap && d.q < best.q)) {
    return {
      gap, q: d.q, b: d.b, t: d.t, k2: d.k2, k3: d.k3,
      word: word.join(".")
    };
  }
  return best;
}

const rows = [];
let globalNear = null;

for (let r = 2; r <= maxR; ++r) {
  const A = Math.ceil(alpha * r - 1e-12);
  const bigA = BigInt(A);
  const R = 3n ** BigInt(r);
  const M = 1n << bigA;
  const D = M - R;
  let strict = 0, primitive = 0, negative = 0, positive = 0, collision = 0;
  let numeratorGeM = 0, numeratorLtM = 0, firstNumeratorGeM = null;
  let k2Less = 0, k2Equal = 0, k2Greater = 0;
  let minK2 = null, minK3 = null, maxK2 = null, maxK3 = null;
  let minKWord = null, minKQ = null, minKGap = null;
  let minQ = D, minQWord = null, near = null;
  const indexPairs = new Set();

  function visit(i, sum, word) {
    if (i === r) {
      if (sum !== A || word[0] !== 1) return;
      ++strict;
      if (isProperPower(word)) return;
      ++primitive;
      const d = data(word);
      if (d.q < minQ) { minQ = d.q; minQWord = word.join("."); }
      if (d.b < d.t) ++negative;
      else if (d.b > d.t) ++positive;
      else ++collision;
      if (d.p >= d.M) {
        ++numeratorGeM;
        if (firstNumeratorGeM === null) firstNumeratorGeM = {
          word: word.join("."), p: d.p.toString(), M: d.M.toString(),
          q: d.q.toString(), k: d.k2.toString()
        };
      } else ++numeratorLtM;
      if (d.k2 < d.k3) ++k2Less;
      else if (d.k2 > d.k3) ++k2Greater;
      else ++k2Equal;
      if (minK2 === null || d.k2 < minK2) {
        minK2 = d.k2; minKWord = word.join("."); minKQ = d.q;
        minKGap = d.b-d.t;
      }
      if (minK3 === null || d.k3 < minK3) minK3 = d.k3;
      if (maxK2 === null || d.k2 > maxK2) maxK2 = d.k2;
      if (maxK3 === null || d.k3 > maxK3) maxK3 = d.k3;
      indexPairs.add(`${d.k2}:${d.k3}`);
      near = updateNear(near, word, d);
      globalNear = updateNear(globalNear, word, d);
      return;
    }

    const remaining = r - i - 1;
    const largest = A - sum - remaining;
    for (let a = 1; a <= largest; ++a) {
      if (i === 0 && a !== 1) continue;
      const next = sum + a;
      if (i < r - 1 &&
          (1n << BigInt(A - next)) <= 3n ** BigInt(r - i - 1)) {
        continue;
      }
      word.push(a);
      visit(i + 1, next, word);
      word.pop();
    }
  }

  visit(0, 0, []);

  let allAnchored = null;
  if (r <= maxAllR) {
    let allCount=0,allNegative=0,allPositive=0,allCollision=0,firstNegative=null,negativeWitnesses=[],endpointWraps=0,negativeOddEndpoint=0,outsideDeterminantBand=0,firstOutsideDeterminantBand=null;
    function visitAll(i,sum,word){
      if(i===r){
        if(sum!==A||word[0]!==1)return;
        ++allCount;
        const d=data(word);
        const fullGap=d.b-d.t;
        if(fullGap<=-d.D||fullGap>=d.D){
          ++outsideDeterminantBand;
          if(firstOutsideDeterminantBand===null)firstOutsideDeterminantBand={word:word.join("."),gap:fullGap.toString(),D:d.D.toString()};
        }
        if(d.z!==d.t)++endpointWraps;
        if(d.b<d.t){++allNegative;if((d.t&1n)===1n)++negativeOddEndpoint;const witness={word:word.join("."),b:d.b.toString(),t:d.t.toString()};if(firstNegative===null)firstNegative=witness;if(negativeWitnesses.length<10)negativeWitnesses.push(witness);}
        else if(d.b>d.t)++allPositive; else ++allCollision;
        return;
      }
      const remaining=r-i-1,largest=A-sum-remaining;
      for(let a=1;a<=largest;++a){
        if(i===0&&a!==1)continue;
        word.push(a);visitAll(i+1,sum+a,word);word.pop();
      }
    }
    visitAll(0,0,[]);
    allAnchored={count:allCount,negative:allNegative,negativeOddEndpoint,positive:allPositive,collision:allCollision,endpointWraps,outsideDeterminantBand,firstOutsideDeterminantBand,firstNegative,negativeWitnesses};
  }
  rows.push({
    r, A, D: D.toString(), strict, primitive, negative, positive, collision,
    numeratorLtM, numeratorGeM, firstNumeratorGeM,
    k2Less, k2Equal, k2Greater,
    k2Range: minK2 === null ? null : [minK2.toString(), maxK2.toString()],
    k3Range: minK3 === null ? null : [minK3.toString(), maxK3.toString()],
    minKWitness: minK2 === null ? null : {k:minK2.toString(),q:minKQ.toString(),gap:minKGap.toString(),word:minKWord},
    minQ: minQ.toString(), minQWord,
    boundaryIndexPairs: indexPairs.size,
    allAnchored,
    nearest: near && {
      gap: near.gap.toString(), q: near.q.toString(), word: near.word,
      b: near.b.toString(), t: near.t.toString(),
      k2: near.k2.toString(), k3: near.k3.toString()
    }
  });
}

// Mandatory equality regression: every power of the trivial accelerated
// cycle has b=t=1 and q=1, although it is excluded by the primitive/a0=1
// search above.
for (let r = 1; r <= maxR; ++r) {
  const d = data(Array(r).fill(2));
  if (!d.collision || d.q !== 1n || d.b !== 1n || d.t !== 1n) {
    throw new Error(`trivial collision regression failed at r=${r}`);
  }
}

console.log(JSON.stringify({
  target: "OPEN-CYCLE-INT-01",
  theoremChecked: "full boundary collision iff C=D times the canonical start; this is q=1 in the audited cycle range",
  rows,
  globalNearestNontrivial: globalNear && {
    gap: globalNear.gap.toString(), q: globalNear.q.toString(),
    word: globalNear.word, b: globalNear.b.toString(),
    t: globalNear.t.toString(), k2: globalNear.k2.toString(),
    k3: globalNear.k3.toString()
  },
  warning: "finite falsification data only"
}, null, 2));
