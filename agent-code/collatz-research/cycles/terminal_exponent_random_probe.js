#!/usr/bin/env node
"use strict";

function egcd(a, b) {
  if (b === 0n) return [a, 1n, 0n];
  const [g, x, y] = egcd(b, a % b);
  return [g, y, x - (a / b) * y];
}
function inv(a, m) {
  const x = egcd(a, m)[1];
  return ((x % m) + m) % m;
}
function cylinder(word) {
  let C = 0n, A = 0;
  for (const a of word) { C = 3n * C + (1n << BigInt(A)); A += a; }
  const M = 1n << BigInt(A), modulus = 2n * M;
  let rho = (((M - C) * inv(3n ** BigInt(word.length), modulus)) % modulus + modulus) % modulus;
  return rho === 0n ? modulus : rho;
}
function strict(word, N) {
  let A = 0;
  for (let i = 0; i < word.length; ++i) {
    if ((1n << BigInt(N - A)) <= 3n ** BigInt(word.length - i)) return false;
    A += word[i];
  }
  return A === N;
}
function randInt(n) { return Math.floor(Math.random() * n); }

const samples = Number(process.argv[2] || 200000);
const maxR = Number(process.argv[3] || 200);
let accepted = 0, firstFailure = null, minRatio = null;
for (let t = 0; t < samples; ++t) {
  const r = 3 + randInt(maxR - 2);
  const N = (3n ** BigInt(r) - 1n).toString(2).length;
  const cuts = [];
  for (let i = 0; i < r - 1; ++i) cuts.push(1 + randInt(N - 1));
  cuts.sort((a,b) => a-b);
  const uniq = [...new Set(cuts)];
  if (uniq.length !== r - 1) continue;
  const word = [];
  let prev = 0;
  for (const c of uniq) { word.push(c-prev); prev=c; }
  word.push(N-prev);
  if (!strict(word, N)) continue;
  const U = word[r-1]-2;
  if (U < 1) continue;
  ++accepted;
  const rho = cylinder(word), power = 1n << BigInt(U);
  if (rho <= power) { firstFailure={r,N,U,rho:rho.toString(),word:word.join(",")}; break; }
  if (minRatio === null || rho*minRatio.power < minRatio.rho*power) minRatio={rho,power,r,N,U,word};
}
console.log(JSON.stringify({samples,maxR,accepted,firstFailure,minRatio:minRatio&&{r:minRatio.r,N:minRatio.N,U:minRatio.U,rho:minRatio.rho.toString(),ratioFloorX1e6:(minRatio.rho*1000000n/minRatio.power).toString(),word:minRatio.word.join(",")}},null,2));
