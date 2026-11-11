#!/usr/bin/env node
"use strict";

function egcd(a, b) {
  if (b === 0n) return [a, 1n, 0n];
  const [g, x, y] = egcd(b, a % b);
  return [g, y, x - (a / b) * y];
}

function inverse(a, m) {
  const [g, x] = egcd(a, m);
  if (g !== 1n) throw new Error("nonunit");
  return (x % m + m) % m;
}

const maxR = Number(process.argv[2] || 30);
let profiles = 0n;
let prefixWindowIntersections = 0n;
let actualWindowHits = 0n;
let firstIntersection = null;

for (let r = 3; r <= maxR; ++r) {
  const P = 3n ** BigInt(r);
  const N = (P - 1n).toString(2).length;
  const e = N - r;
  const M = 1n << BigInt(N);
  const modulus = 2n * M;
  const B = Array.from({length: r + 1}, (_, i) =>
    Math.floor(i * N / r));
  const eligible = [];
  for (let i = 0; i < r - 1; ++i) {
    if (B[i + 1] - B[i] === 2) eligible.push(i);
  }

  const fullWord = Array(r - 1).fill(1).concat(e + 1);
  let fullC = 0n;
  let A = 0;
  for (const a of fullWord) {
    fullC = 3n * fullC + (1n << BigInt(A));
    A += a;
  }
  const invP = inverse(P, modulus);
  let fullRho = ((M - fullC) * invP) % modulus;
  fullRho = (fullRho + modulus) % modulus;

  function recurse(index, unselected, C, rho) {
    if (index < 0) {
      if (unselected.length === 0) return;
      ++profiles;
      return;
    }
    recurse(index - 1, unselected, C, rho);

    const j = eligible[index];
    const n = j + 1;
    const Uold = e - unselected.length - 1;
    if (Uold < 1) return;
    const powerModulus = 1n << BigInt(N + 1 - n);
    const v = inverse((3n ** BigInt(n)) % powerModulus, powerModulus);
    const R = (1n << BigInt(n)) * v;
    const startRaw = (M + R) / 2n;
    const start = startRaw % M;
    const windowLength = Uold >= 2 ? 1n << BigInt(Uold - 2) : 0n;

    const nextPosition = unselected.length === 0 ? r - 1 :
      unselected[unselected.length - 1];
    const valuation = nextPosition === r - 1 ? r : nextPosition + 1;
    const classModulus = 1n << BigInt(valuation + 1);
    const classResidue = (1n << BigInt(valuation)) - 1n;
    if (windowLength > 0n) {
      let delta = (classResidue - start) % classModulus;
      if (delta < 0n) delta += classModulus;
      const intersects = delta < windowLength ||
        (start + windowLength > M &&
          ((classResidue - (start - M)) % classModulus + classModulus) %
            classModulus < start + windowLength - M);
      if (intersects) {
        ++prefixWindowIntersections;
        if (firstIntersection === null) {
          firstIntersection = {r, N, e, j, n, Uold,
            nextPosition, valuation, start: start.toString(),
            windowLength: windowLength.toString(), delta: delta.toString(),
            unselected: unselected.slice().reverse()};
        }
      }
      const rhoModM = rho % M;
      let actualDelta = rhoModM - start;
      if (actualDelta < 0n) actualDelta += M;
      if (actualDelta < windowLength) ++actualWindowHits;
    }

    const T = (1n << BigInt(n)) * 3n ** BigInt(r - n);
    const nextC = 2n * C - P + T;
    let nextRho = (2n * rho + 1n - M - R) % modulus;
    if (nextRho < 0n) nextRho += modulus;
    recurse(index - 1, unselected.concat(j), nextC, nextRho);
  }

  recurse(eligible.length - 1, [], fullC, fullRho);
  console.log(JSON.stringify({r, profiles: profiles.toString(),
    prefixWindowIntersections: prefixWindowIntersections.toString(),
    actualWindowHits: actualWindowHits.toString(), firstIntersection}));
}

