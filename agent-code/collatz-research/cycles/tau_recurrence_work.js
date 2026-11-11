#!/usr/bin/env node
"use strict";

function mod(a, m) {
  const z = a % m;
  return z < 0n ? z + m : z;
}

function inv(a, m) {
  let oldR = a, r = m, oldS = 1n, s = 0n;
  while (r !== 0n) {
    const q = oldR / r;
    [oldR, r] = [r, oldR - q * r];
    [oldS, s] = [s, oldS - q * s];
  }
  if (oldR !== 1n) throw new Error("nonunit");
  return mod(oldS, m);
}

function getData(word) {
  let C = 0n, s = 0;
  for (let j = 0; j < word.length; ++j) {
    if (word[j] === "1") {
      C = 3n * C + (1n << BigInt(j));
      ++s;
    }
  }
  const M = 1n << BigInt(word.length);
  const P = 3n ** BigInt(s);
  const D = M - P;
  const tau = D === 1n ? 0n : mod(C * inv(M, D), D);
  return { word, k: word.length, s, M, P, D, C, tau };
}

function isPrimitive(word) {
  let p = 1n, m = 1n;
  for (let j = 0; j < word.length; ++j) {
    if (word[j] === "1") p *= 3n;
    m *= 2n;
    if (j + 1 < word.length && p < m) return false;
  }
  return p < m;
}

function shadow(word) {
  const d = getData(word);
  // rho is the least positive residue solving P*rho+C == 0 (mod M).
  const rho = mod(-d.C * inv(d.P, d.M), d.M);
  let m = d.M - rho;
  const states = [];
  let evenSum = 0n, oddSum = 0n;
  for (const bit of word) {
    states.push(m);
    if (bit === "1") {
      oddSum += m;
      m = (3n * m - 1n) / 2n;
    } else {
      evenSum += m;
      m /= 2n;
    }
  }
  return {rho, m0: states[0], mk: m, gap: states[0] - m,
    evenSum, oddSum, signed: evenSum - oddSum, states};
}

function adjacentData(word, t) {
  if (word.slice(t, t + 2) !== "10") throw new Error("not 10");
  const moved = word.slice(0, t) + "01" + word.slice(t + 2);
  const d = getData(word), e = getData(moved);
  const a = [...word.slice(0, t)].filter(x => x === "1").length;
  const b = [...word.slice(t + 2)].filter(x => x === "1").length;
  const Delta = (1n << BigInt(t)) * 3n ** BigInt(b);
  const L = mod(Delta * inv(d.P, d.M), d.M);
  const V = (d.D * L + Delta) / d.M;
  const x = shadow(word), y = shadow(moved);
  const chi = x.rho < L ? 1n : 0n;
  return {word, moved, t, a, b, Delta, L, V, chi,
    tau: d.tau, tauMoved: e.tau, gap: x.gap, gapMoved: y.gap,
    predictedGapMoved: x.gap + V - chi * d.D};
}

const exponents = [1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 2, 3, 2, 1, 1, 1, 5];
const rationalWord = exponents.map(a => "1" + "0".repeat(a - 1)).join("");
console.log({ ...getData(rationalWord), primitive: isPrimitive(rationalWord) });
const halfBoundCounterexample = "1111101010111111111101101010100010100111011000";
console.log("half-bound counterexample", {
  ...getData(halfBoundCounterexample),
  primitive: isPrimitive(halfBoundCounterexample),
  shadow: shadow(halfBoundCounterexample)
});
function acceleratedExponents(word) {
  const a = [];
  for (let j = 0; j < word.length;) {
    if (word[j] !== "1") throw new Error("block does not start at one");
    let h = 1;
    while (j + h < word.length && word[j + h] === "0") ++h;
    a.push(h);
    j += h;
  }
  return a;
}
console.log("half-bound accelerated", acceleratedExponents(halfBoundCounterexample));
{
  const sh = shadow(halfBoundCounterexample);
  const odds = sh.states.filter((_, j) => halfBoundCounterexample[j] === "1");
  for (const modulus of [sh.gap, 2n * sh.gap, 2n * sh.gap + 1n, 3n * sh.gap]) {
    const residues = odds.map(x => mod(x, modulus).toString());
    console.log("half-bound odd residues", modulus.toString(), new Set(residues).size, residues);
  }
}

for (const w of ["11100", "11011100", rationalWord]) {
  const rotations = [];
  for (let j = 0; j < w.length; ++j) {
    const z = w.slice(j) + w.slice(0, j);
    rotations.push({j, tau: getData(z).tau.toString(), primitive: isPrimitive(z)});
  }
  console.log("rotations", w, rotations);
}
for (const w of ["11100", "11010", "1110100", "1101100", "11011100", rationalWord]) {
  console.log("shadow", w, shadow(w));
}
console.log("adjacent", adjacentData("11100", 2));
console.log("adjacent", adjacentData("1110100", 2));

function floorLog2OfPow3(s) {
  let p = 3n ** BigInt(s), q = 1n, j = 0;
  while ((q << 1n) <= p) { q <<= 1n; ++j; }
  return j;
}

console.log("s k packedTau deadlineTau packed deadline");
for (let s = 2; s <= 30; ++s) {
  const k = floorLog2OfPow3(s) + 1;
  const packed = "1".repeat(s) + "0".repeat(k - s);
  let deadline = "";
  const occupied = new Set();
  for (let i = 0; i < s; ++i) occupied.add(floorLog2OfPow3(i));
  for (let j = 0; j < k; ++j) deadline += occupied.has(j) ? "1" : "0";
  const a = getData(packed), b = getData(deadline);
  console.log(s, k, a.tau.toString(), b.tau.toString(), packed, deadline);
}

function firstCoefficientCrossing(n0, maxSteps = 100000) {
  let n = n0, p = 1n, m = 1n, word = "", s = 0;
  for (let k = 1; k <= maxSteps; ++k) {
    if ((n & 1n) === 1n) {
      word += "1";
      n = (3n * n + 1n) >> 1n;
      p *= 3n;
      ++s;
    } else {
      word += "0";
      n >>= 1n;
    }
    m <<= 1n;
    if (p < m) return { n0, n, k, s, word, delta: n - n0, data: getData(word) };
  }
  throw new Error("crossing limit");
}

function firstCoefficientCrossingShadow(m0, maxSteps = 100000) {
  let m = m0, p = 1n, q = 1n, word = "", s = 0, minProper = m0;
  for (let k = 1; k <= maxSteps; ++k) {
    if ((m & 1n) === 1n) {
      word += "1";
      m = (3n * m - 1n) >> 1n;
      p *= 3n;
      ++s;
    } else {
      word += "0";
      m >>= 1n;
    }
    q <<= 1n;
    if (p < q) return {m0, mk: m, gap: m0 - m, k, s, word, minProper};
    if (m < minProper) minProper = m;
  }
  return null;
}

const scanN = Number(process.argv[2] || 0);
if (scanN > 0) {
  let worst = null;
  for (let x = 1n; x <= BigInt(scanN); x += 2n) {
    const z = firstCoefficientCrossing(x);
    if (worst === null || z.delta > worst.delta) worst = z;
    if (z.delta >= 0n && x !== 1n) {
      console.log("FCD counterexample from orbit", z);
      break;
    }
  }
  console.log("worst first-crossing displacement", worst);

  const shadowEquality = [];
  const correctedHalfEquality = [];
  let firstCorrectedHalfFailure = null;
  let minExcess = null;
  let minThirdExcess = null;
  let minGapRatio = null;
  let firstThirdFailure = null;
  let firstEarlyShadowDescent = null;
  const thirdEquality = [];
  for (let m = 3n; m <= BigInt(scanN); m += 2n) {
    const z = firstCoefficientCrossingShadow(m);
    if (z === null) continue;
    const excess = 2n * z.gap - BigInt(z.s);
    const thirdExcess = 3n * z.gap - BigInt(z.s);
    if (z.minProper < z.m0 && firstEarlyShadowDescent === null)
      firstEarlyShadowDescent = {...z};
    if (minExcess === null || excess < minExcess.excess) minExcess = {...z, excess};
    if (excess === -1n) correctedHalfEquality.push({...z, excess});
    if (excess < -1n && firstCorrectedHalfFailure === null)
      firstCorrectedHalfFailure = {...z, excess};
    if (z.s > 1 && (minThirdExcess === null || thirdExcess < minThirdExcess.thirdExcess))
      minThirdExcess = {...z, thirdExcess};
    if (z.s > 1 && (minGapRatio === null || z.gap * BigInt(minGapRatio.s) < minGapRatio.gap * BigInt(z.s)))
      minGapRatio = {...z};
    if (thirdExcess < 0n && firstThirdFailure === null)
      firstThirdFailure = {...z, thirdExcess};
    if (z.s > 1 && thirdExcess === 3n) thirdEquality.push({...z, thirdExcess});
    if (excess === 0n || excess === 1n) shadowEquality.push({...z, excess});
  }
  console.log("shadow minimum excess", minExcess);
  console.log("shadow corrected-half equalities", correctedHalfEquality.slice(0, 100));
  console.log("shadow corrected-half first failure", firstCorrectedHalfFailure);
  console.log("shadow minimum third excess", minThirdExcess);
  console.log("shadow minimum gap ratio", minGapRatio);
  console.log("shadow first third failure", firstThirdFailure);
  console.log("shadow first early descent", firstEarlyShadowDescent);
  console.log("shadow third excess three", thirdEquality.slice(0, 100));
  console.log("shadow equality starts", shadowEquality.slice(0, 100));
}

const enumerateS = Number(process.argv[3] || 0);
if (enumerateS > 0) {
  const k = floorLog2OfPow3(enumerateS) + 1;
  const deadlines = Array.from({length: enumerateS}, (_, i) => floorLog2OfPow3(i));
  const positions = [0];
  const equality = [];
  let min = null;
  let maxVQuotient = -1n, maxVData = null;
  function visit(rank, last, C) {
    if (rank === enumerateS) {
      let w = Array(k).fill("0");
      for (const j of positions) w[j] = "1";
      const d = getData(w.join(""));
      if (min === null || d.tau < min.tau) min = d;
      if (d.tau === BigInt(Math.ceil(enumerateS / 2))) equality.push(d.word);
      for (let t = 0; t + 1 < d.word.length; ++t) {
        if (d.word.slice(t, t + 2) !== "10") continue;
        const moved = d.word.slice(0, t) + "01" + d.word.slice(t + 2);
        if (!isPrimitive(moved)) continue;
        const q = adjacentData(d.word, t);
        const quotient = q.V / d.D;
        if (quotient > maxVQuotient) {
          maxVQuotient = quotient;
          maxVData = Object.fromEntries(Object.entries(q).map(([x, y]) =>
            [x, typeof y === "bigint" ? y.toString() : y]));
        }
      }
      return;
    }
    for (let j = last + 1; j <= deadlines[rank]; ++j) {
      positions.push(j);
      visit(rank + 1, j, 3n * C + (1n << BigInt(j)));
      positions.pop();
    }
  }
  visit(1, 0, 1n);
  console.log("ENUMERATED " + JSON.stringify({s: enumerateS, k,
    minTau: min.tau.toString(), minWord: min.word,
    equalityCount: equality.length, equality,
    maxVQuotient: maxVQuotient.toString(), maxVData}));
}

console.log("negative-cycle-prefix family N,z,s,tau,g,m0,wordLength");
for (let N = 1; N <= 40; ++N) {
  let nine = 9n ** BigInt(N), eight = 8n ** BigInt(N);
  let z = 1;
  while (nine >= (eight << BigInt(z))) ++z;
  const w = "110".repeat(N) + "0".repeat(z);
  const d = getData(w), sh = shadow(w);
  console.log(N, z, d.s, d.tau.toString(), sh.gap.toString(), sh.m0.toString(), w.length);
}
