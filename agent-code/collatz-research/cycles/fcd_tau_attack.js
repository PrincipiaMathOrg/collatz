"use strict";

// Exact search for the cumulative-wrap residue in first-crossing shortcut words.
// A word eps[0..k-1] is first crossing when
//   2^j <= 3^{s_j} for every j<k, but 3^s < 2^k.
// Its affine carry is C and tau is the least residue C*3^{-s} modulo D.

function mod(a, m) {
  const r = a % m;
  return r < 0n ? r + m : r;
}

function egcd(a, b) {
  let oldR = a, r = b, oldS = 1n, s = 0n;
  while (r !== 0n) {
    const q = oldR / r;
    [oldR, r] = [r, oldR - q * r];
    [oldS, s] = [s, oldS - q * s];
  }
  return [oldR, oldS];
}

function inv(a, m) {
  const [g, x] = egcd(mod(a, m), m);
  if (g !== 1n) throw new Error("nonunit");
  return mod(x, m);
}

function gcd(a, b) {
  if (a < 0n) a = -a;
  if (b < 0n) b = -b;
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

function carry(word) {
  let C = 0n;
  for (let j = 0; j < word.length; ++j) {
    if (word[j] === "1") C = 3n * C + (1n << BigInt(j));
  }
  return C;
}

function data(word) {
  const k = word.length;
  let s = 0;
  for (const b of word) s += b === "1" ? 1 : 0;
  const M = 1n << BigInt(k), P = 3n ** BigInt(s), D = M - P;
  if (D <= 0n) throw new Error("not a crossing");
  const C = carry(word);
  const tau = D === 1n ? 0n : mod(C * inv(P, D), D);
  const rho = mod(-C * inv(P, M), M);
  const Z = (P * rho + C) / M;
  const d = Z - rho;
  if (D !== 1n && mod(d, D) !== tau) throw new Error("residue identity");
  // The all-depth proof uses the imported two-logarithm estimate. Every
  // finite word inspected here also verifies the needed gap directly.
  if (s > 0 && 3n * D <= BigInt(s)) throw new Error("D <= s/3");
  if (!(d === tau || d === tau - D)) throw new Error("two-lift identity");
  const h = gcd(D, C), q = D / h, n = C / h;
  const r = q === 1n ? 0n : mod(n * inv(M, q), q);
  const K = (M * tau - C) / D;
  if (tau !== h * r || K !== (M * r - n) / q) {
    throw new Error("reduced-denominator identity");
  }
  if ((K > 0n) !== (d < 0n)) throw new Error("exact-margin sign");
  return {word, k, s, M, P, D, C, tau, rho, Z, d, h, q, n, r, K};
}

function isFirstCrossing(word) {
  let P = 1n, M = 1n;
  for (let j = 0; j < word.length; ++j) {
    if (word[j] === "1") P *= 3n;
    M *= 2n;
    if (j + 1 < word.length && P < M) return false;
  }
  return P < M;
}

function isPower(word) {
  for (let p = 1; p * 2 <= word.length; ++p) {
    if (word.length % p !== 0) continue;
    if (word === word.slice(0, p).repeat(word.length / p)) return true;
  }
  return false;
}

function trajectory(x, word) {
  const xs = [x];
  for (const b of word) {
    if (b === "1") {
      if ((x & 1n) !== 1n) throw new Error("odd parity mismatch");
      x = (3n * x + 1n) / 2n;
    } else {
      if ((x & 1n) !== 0n) throw new Error("even parity mismatch");
      x /= 2n;
    }
    xs.push(x);
  }
  return xs;
}

function shadowData(x) {
  let m = x.M - x.rho, E = 0n, O = 0n;
  const states = [m];
  for (const b of x.word) {
    if (b === "1") {
      if ((m & 1n) !== 1n) throw new Error("shadow odd parity");
      O += m;
      m = (3n * m - 1n) / 2n;
    } else {
      if ((m & 1n) !== 0n) throw new Error("shadow even parity");
      E += m;
      m /= 2n;
    }
    if (m <= 0n) throw new Error("nonpositive shadow");
    states.push(m);
  }
  const G = states[0] - m;
  if (m !== x.P - x.Z || G !== x.D + x.d) throw new Error("shadow endpoint");
  if (2n * G !== E - O + BigInt(x.s)) throw new Error("shadow mass identity");
  let Hsum = 0n, i = 0;
  for (let j = 0; j < x.k; ++j) {
    if (x.word[j] !== "1") continue;
    const H = x.M - (1n << BigInt(j)) * (3n ** BigInt(x.s - i));
    if (H < x.D) throw new Error("terminal deficit below D");
    if (states[j] <= m) throw new Error("shadow endpoint not strict minimum");
    Hsum += H;
    ++i;
  }
  if (x.M * (3n * G - BigInt(x.s)) !== 3n * x.D * states[0] - Hsum) {
    throw new Error("one-third area identity");
  }
  return {states, E, O, G, Hsum};
}

function residueTerms(x) {
  const terms = [];
  let i = 0;
  const pinv = x.D === 1n ? 0n : inv(x.P, x.D);
  for (let j = 0; j < x.k; ++j) {
    if (x.word[j] !== "1") continue;
    const raw = (1n << BigInt(j)) * (3n ** BigInt(x.s - i - 1));
    const r = x.D === 1n ? 0n : mod(raw * pinv, x.D);
    terms.push({i, j, raw, r});
    ++i;
  }
  const R = terms.reduce((a, t) => a + t.r, 0n);
  return {terms, R, W: x.D === 1n ? 0n : (R - x.tau) / x.D};
}

const maxK = Number(process.argv[2] || 28);
const stats = new Map();
let total = 0;
let halfFailures = 0;
let thirdFailures = 0;
let nonDescent = 0;
let firstBad = null;
const equality = [];

function record(word) {
  const x = data(word);
  ++total;
  if (3n * x.tau < BigInt(x.s)) ++thirdFailures;
  if (2n * x.tau < BigInt(x.s)) ++halfFailures;
  if (x.d >= 0n) ++nonDescent;
  if ((3n * x.tau < BigInt(x.s) || 2n * x.tau < BigInt(x.s)) && !firstBad) firstBad = x;
  if (2n * x.tau === BigInt(x.s) || x.tau === BigInt(Math.ceil(x.s / 2))) equality.push(x);

  const old = stats.get(x.k);
  if (!old || x.tau < old.tau) stats.set(x.k, x);

  // The canonical residue really realizes the word, including boundary cases.
  const xs = trajectory(x.rho, word);
  if (xs[xs.length - 1] !== x.Z) throw new Error("trajectory endpoint");
  for (let j = 1; j < xs.length - 1; ++j) {
    if (xs[j] <= x.rho) throw new Error("proper excursion not strict");
  }
  shadowData(x);
}

function dfs(word, s, P, M) {
  if (word.length >= maxK) return;
  const M2 = M * 2n;
  if (P < M2) record(word + "0");
  else dfs(word + "0", s, P, M2);
  dfs(word + "1", s + 1, P * 3n, M2);
}

dfs("", 0, 1n, 1n);

console.log(`maxK=${maxK} total=${total} thirdFailures=${thirdFailures} halfFailures=${halfFailures} nonDescent=${nonDescent}`);
console.log("k s count/min not tracked tau d rho word primitive");
for (const [k, x] of [...stats].sort((a, b) => a[0] - b[0])) {
  console.log(`${k} ${x.s} ${x.tau} ${x.d} ${x.rho} ${x.word} ${!isPower(x.word)}`);
}
console.log("half-ceiling equality/minimum candidates:");
for (const x of equality.slice(0, 40)) console.log(`${x.k} ${x.s} tau=${x.tau} d=${x.d} rho=${x.rho} ${x.word}`);
if (firstBad) console.log("FIRST_BAD", firstBad);

// Fixed regression words. The accelerated q=5 example is expanded into binary
// shortcut time; its least-state rotation is first crossing.
const q5Accelerated = [1,1,1,1,1,2,1,1,2,1,2,3,2,1,1,1,5];
const q5Binary = q5Accelerated.map(a => "1" + "0".repeat(a - 1)).join("");
const halfCounterexample = "1111101010111111111101101010100010100111011000";
const regressions = ["0", "10", "10".repeat(2), q5Binary, halfCounterexample];
console.log("regressions:");
for (const w of regressions) {
  if (isFirstCrossing(w)) {
    const x = data(w);
    shadowData(x);
    console.log(`${w} first=1 k=${x.k} s=${x.s} D=${x.D} C=${x.C} tau=${x.tau} d=${x.d}`);
  } else {
    console.log(`${w} first=0 (expected for a power/nonleast rotation)`);
  }
}


for (const w of process.argv.slice(3)) {
  console.log(`detail ${w} first=${isFirstCrossing(w)}`);
  if (!isFirstCrossing(w)) continue;
  const x = data(w), rt = residueTerms(x);
  shadowData(x);
  console.log(`k=${x.k} s=${x.s} M=${x.M} P=${x.P} D=${x.D} C=${x.C} tau=${x.tau} rho=${x.rho} Z=${x.Z} d=${x.d}`);
  console.log(`R=${rt.R} W=${rt.W}`);
  console.log(rt.terms.map(t => `i${t.i}@${t.j}:r=${t.r}`).join(" "));
  console.log("trajectory", trajectory(x.rho, w).map(String).join(","));
}
