"use strict";

// Enumerate binary shortcut words with subcritical final coefficient and
// measure how close a canonical non-descent can come to the first-crossing
// ballot cone.  Classification and affine arithmetic are exact BigInt;
// logarithms are used only to rank the amount of prefix-barrier violation.

function mod(a, m) {
  const r = a % m;
  return r < 0n ? r + m : r;
}

function inv(a, m) {
  let oldR = m, r = mod(a, m), oldS = 0n, s = 1n;
  while (r !== 0n) {
    const q = oldR / r;
    [oldR, r] = [r, oldR - q * r];
    [oldS, s] = [s, oldS - q * s];
  }
  if (oldR !== 1n) throw new Error("nonunit");
  return mod(oldS, m);
}

function inspect(k, mask) {
  let ones = 0;
  let C = 0n;
  let p3 = 1n;
  let p2 = 1n;
  let minHeight = Infinity;
  let badPrefixes = 0;
  let firstBad = 0;
  let word = "";
  for (let j = 0; j < k; ++j) {
    const bit = ((mask >>> j) & 1) !== 0;
    word += bit ? "1" : "0";
    if (bit) {
      C = 3n * C + (1n << BigInt(j));
      ++ones;
      p3 *= 3n;
    }
    p2 *= 2n;
    if (j + 1 < k) {
      const height = ones * Math.log(3) - (j + 1) * Math.log(2);
      if (height < minHeight) minHeight = height;
      if (p3 < p2) {
        ++badPrefixes;
        if (firstBad === 0) firstBad = j + 1;
      }
    }
  }
  if (p3 >= p2) return null;
  const M = 1n << BigInt(k);
  const P = p3;
  const D = M - P;
  const rho = mod(-C * inv(P, M), M);
  const Z = (P * rho + C) / M;
  if (Z < rho) return null;
  return { k, ones, word, C, D, rho, Z, minHeight, badPrefixes, firstBad };
}

function isPrimitiveFirstCrossing(word) {
  let p3 = 1n;
  let p2 = 1n;
  for (let j = 0; j < word.length; ++j) {
    if (word[j] === "1") p3 *= 3n;
    p2 *= 2n;
    if (j + 1 < word.length && p3 < p2) return false;
  }
  return p3 < p2;
}

function firstCrossingRotations(word) {
  const rotations = [];
  for (let cut = 0; cut < word.length; ++cut) {
    const rotated = word.slice(cut) + word.slice(0, cut);
    if (isPrimitiveFirstCrossing(rotated)) rotations.push(rotated);
  }
  return rotations;
}

function main() {
  const maxK = Number(process.argv[2] || 25);
  let failures = 0;
  let nontrivialFailures = 0;
  let closest = null;
  let fewestBad = Infinity;
  const examples = [];
  const byK = [];
  for (let k = 2; k <= maxK; ++k) {
    let local = 0;
    const limit = 2 ** k;
    for (let mask = 1; mask < limit; mask += 2) {
      // A first crossing, and every closest relaxation of it, ends in zero.
      if (((mask >>> (k - 1)) & 1) !== 0) continue;
      const hit = inspect(k, mask);
      if (hit === null) continue;
      ++failures;
      ++local;
      if (hit.rho <= 1n) continue;
      ++nontrivialFailures;
      if (hit.badPrefixes < fewestBad) fewestBad = hit.badPrefixes;
      if (closest === null || hit.minHeight > closest.minHeight ||
          (hit.minHeight === closest.minHeight && hit.k < closest.k)) {
        closest = hit;
      }
      if (examples.length < 20) examples.push(hit);
    }
    byK.push(`${k}:${local}`);
  }
  console.log(`maxK=${maxK} failures=${failures} nontrivialFailures=${nontrivialFailures} fewestBadPrefixes=${fewestBad}`);
  console.log(`failuresByLength=${byK.join(",")}`);
  if (closest !== null) {
    const rotations = firstCrossingRotations(closest.word);
    console.log("closest=" + JSON.stringify({
      k: closest.k,
      s: closest.ones,
      word: closest.word,
      minHeight: closest.minHeight,
      badPrefixes: closest.badPrefixes,
      firstBad: closest.firstBad,
      rho: closest.rho.toString(),
      Z: closest.Z.toString(),
      D: closest.D.toString(),
      C: closest.C.toString(),
      firstCrossingRotations: rotations
    }));

    // This exact regression is the point of the scan.  The sole nontrivial
    // closest word through depth 25 misses the ballot cone only at prefix 10,
    // whose multiplier is exactly 3/4.  Its unique first-crossing rotation
    // descends, so the example does not challenge FCD itself.
    if (maxK >= 8) {
      if (closest.word !== "10111010" || closest.rho !== 9n ||
          closest.Z !== 10n || closest.C !== 373n || closest.D !== 13n ||
          closest.badPrefixes !== 1 || closest.firstBad !== 2) {
        throw new Error("near-barrier regression changed");
      }
      if (rotations.length !== 1 || rotations[0] !== "11101010") {
        throw new Error("first-crossing rotation regression changed");
      }
    }
  }
  for (const hit of examples) {
    console.log(`example k=${hit.k} s=${hit.ones} word=${hit.word} bad=${hit.badPrefixes} minHeight=${hit.minHeight} rho=${hit.rho} Z=${hit.Z}`);
  }
}

main();
