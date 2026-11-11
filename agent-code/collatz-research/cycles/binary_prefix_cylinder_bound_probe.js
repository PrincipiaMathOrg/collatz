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
  const modulus = 1n << BigInt(A + 1);
  const target = (1n << BigInt(A)) - C;
  let rho = (target * inv(3n ** BigInt(word.length), modulus)) % modulus;
  if (rho <= 0n) rho += modulus;
  return {rho, A};
}

const maxLength = Number(process.argv[2] || 22);
let checked = 0;
let firstFailure = null;
let bestSlack = null;

for (let length = 1; length <= maxLength; ++length) {
  const total = 1 << length;
  for (let mask = 0; mask < total; ++mask) {
    const word = [];
    let twos = 0;
    for (let i = 0; i < length; ++i) {
      const a = 1 + ((mask >>> i) & 1);
      word.push(a);
      if (a === 2) ++twos;
    }
    const {rho} = cylinder(word);
    const score = length + 1 - 2 * twos;
    if (score > 0) {
      const bound = (1n << BigInt(score)) - 1n;
      const slack = rho - bound;
      if (slack < 0n && firstFailure === null) {
        firstFailure = {length, twos, word: word.join(","), rho: rho.toString(), bound: bound.toString()};
      }
      if (bestSlack === null || slack < bestSlack.slack) {
        bestSlack = {slack, length, twos, word: word.join(","), rho, bound};
      }
    }
    ++checked;
  }
}

console.log(JSON.stringify({
  maxLength,
  checked,
  firstFailure,
  bestSlack: bestSlack && {
    slack: bestSlack.slack.toString(),
    length: bestSlack.length,
    twos: bestSlack.twos,
    word: bestSlack.word,
    rho: bestSlack.rho.toString(),
    bound: bestSlack.bound.toString()
  }
}, null, 2));
