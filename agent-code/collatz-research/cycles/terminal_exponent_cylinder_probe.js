#!/usr/bin/env node
"use strict";

function egcd(a, b) {
  if (b === 0n) return [a, 1n, 0n];
  const [g, x, y] = egcd(b, a % b);
  return [g, y, x - (a / b) * y];
}

function inv(a, m) {
  const [g, x] = egcd(a, m);
  if (g !== 1n) throw new Error("nonunit");
  return ((x % m) + m) % m;
}

function cylinder(word) {
  let C = 0n;
  let A = 0;
  for (const a of word) {
    C = 3n * C + (1n << BigInt(A));
    A += a;
  }
  const M = 1n << BigInt(A);
  const modulus = 2n * M;
  let rho = (((M - C) * inv(3n ** BigInt(word.length), modulus)) % modulus + modulus) % modulus;
  if (rho === 0n) rho = modulus;
  const Z = (3n ** BigInt(word.length) * rho + C) / M;
  const P = 3n ** BigInt(word.length);
  const Y = ((C * inv(M % P, P)) % P + P) % P;
  return {rho, Z, Y, P};
}

function enumerateCompositions(total, parts, prefix, visit) {
  if (parts === 1) {
    if (total >= 1) visit(prefix.concat(total));
    return;
  }
  for (let a = 1; a <= total - parts + 1; ++a) {
    enumerateCompositions(total - a, parts - 1, prefix.concat(a), visit);
  }
}

function strictRecord(word, N) {
  let A = 0;
  const r = word.length;
  for (let i = 0; i < r; ++i) {
    if ((1n << BigInt(N - A)) <= 3n ** BigInt(r - i)) return false;
    A += word[i];
  }
  return true;
}

const maxR = Number(process.argv[2] || 18);
let checked = 0;
let terminalLarge = 0;
let firstFailure = null;
let firstBinaryFailure = null;
let firstNonDescent = null;
let firstTernaryFailure = null;
const rows = [];

for (let r = 2; r <= maxR; ++r) {
  const N = (3n ** BigInt(r) - 1n).toString(2).length;
  let rowCount = 0;
  let rowBest = null;
  enumerateCompositions(N, r, [], word => {
    if (!strictRecord(word, N)) return;
    ++checked;
    const U = word[r - 1] - 2;
    if (U < 1) return;
    ++terminalLarge;
    ++rowCount;
    const {rho, Z, Y, P} = cylinder(word);
    const bound = 1n << BigInt(U);
    if (rowBest === null || rho * rowBest.power < rowBest.rho * bound) {
      rowBest = {rho, power: bound, U, Z, word: word.join(",")};
    }
    if (rho <= bound && firstFailure === null) {
      firstFailure = {r, N, U, rho: rho.toString(), word: word.join(",")};
    }
    if (word.slice(0, -1).every(a => a <= 2) && rho <= bound && firstBinaryFailure === null) {
      firstBinaryFailure = {r, N, U, rho: rho.toString(), word: word.join(",")};
    }
    if (Z >= rho && firstNonDescent === null) {
      firstNonDescent = {r, N, U, rho: rho.toString(), Z: Z.toString(), word: word.join(",")};
    }
    const ternaryFloor = P / (1n << BigInt(r));
    if (Y < ternaryFloor && firstTernaryFailure === null) {
      firstTernaryFailure = {r, N, U, Y: Y.toString(), threshold: ternaryFloor.toString(), word: word.join(",")};
    }
  });
  if (rowBest !== null) rows.push({r,N,count:rowCount,U:rowBest.U,rho:rowBest.rho.toString(),Z:rowBest.Z.toString(),ratioFloorX1e6:(rowBest.rho*1000000n/rowBest.power).toString(),word:rowBest.word});
}

console.log(JSON.stringify({maxR, checked, terminalLarge, firstFailure, firstBinaryFailure, firstNonDescent,firstTernaryFailure,rows}, null, 2));
