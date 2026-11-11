#!/usr/bin/env node
"use strict";

function factors(n) {
  const out = [];
  let p = 3n;
  while (p * p <= n) {
    if (n % p === 0n) {
      let e = 0;
      while (n % p === 0n) { n /= p; ++e; }
      out.push([p, e]);
    }
    p += 2n;
  }
  if (n > 1n) out.push([n, 1]);
  return out;
}

function carry(word) {
  let C = 0n;
  let A = 0;
  for (const a of word) {
    C = 3n * C + (1n << BigInt(A));
    A += a;
  }
  return C;
}

const maxR = Number(process.argv[2] || 28);
for (let r = 3; r <= maxR; ++r) {
  const P = 3n ** BigInt(r);
  const N = (P - 1n).toString(2).length;
  const D = (1n << BigInt(N)) - P;
  const B = Array.from({length: r + 1}, (_, i) => Math.floor(i * N / r));
  const base = Array.from({length: r}, (_, i) => B[i + 1] - B[i]);
  const eligible = [];
  for (let i = 0; i < r - 1; ++i) if (base[i] === 2) eligible.push(i);
  if (eligible.length >= 31) continue;
  const fs = factors(D);
  const hits = new Map(fs.map(([p]) => [p.toString(), 0]));
  let profiles = 0;
  for (let mask = 1; mask < 2 ** eligible.length; ++mask) {
    const word = base.slice();
    let U = 0;
    for (let bit = 0; bit < eligible.length; ++bit) if (mask & 2 ** bit) {
      --word[eligible[bit]];
      ++U;
    }
    word[r - 1] += U;
    const C = carry(word);
    ++profiles;
    for (const [p] of fs) if (C % p === 0n) {
      hits.set(p.toString(), hits.get(p.toString()) + 1);
    }
  }
  console.log(JSON.stringify({r,N,D:D.toString(),profiles,
    factors:fs.map(([p,e])=>({p:p.toString(),e,
      hits:hits.get(p.toString())}))}));
}
