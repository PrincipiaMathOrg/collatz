#!/usr/bin/env node
"use strict";

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
  const M = 1n << BigInt(N);
  const D = M - P;
  const B = Array.from({length: r + 1}, (_, i) => Math.floor(i * N / r));
  const base = Array.from({length: r}, (_, i) => B[i + 1] - B[i]);
  const eligible = [];
  for (let i = 0; i < r - 1; ++i) if (base[i] === 2) eligible.push(i);
  if (eligible.length >= 31) continue;
  const rows = new Map();
  for (let mask = 1; mask < 2 ** eligible.length; ++mask) {
    const word = base.slice();
    let U = 0;
    for (let bit = 0; bit < eligible.length; ++bit) {
      if ((mask & 2 ** bit) !== 0) {
        --word[eligible[bit]];
        ++U;
      }
    }
    word[r - 1] += U;
    const C = carry(word);
    const old = rows.get(U);
    if (!old) rows.set(U, {min: C, max: C});
    else {
      if (C < old.min) old.min = C;
      if (C > old.max) old.max = C;
    }
  }
  const summary = [...rows].map(([U, x]) => ({
    U,
    floorMin: (x.min / D).toString(),
    floorMax: (x.max / D).toString(),
    widthFloor: ((x.max - x.min) / D).toString(),
    minNumerator: (x.min % D).toString(),
    maxNumerator: (x.max % D).toString()
  }));
  console.log(JSON.stringify({r, N, summary}));
}
