#!/usr/bin/env node
"use strict";

// Exact certificate for the consecutive-three-shift theorem, together with
// a finite audit of every exactly-three deformation through maxR.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function gcd(a, b) {
  if (a < 0n) a = -a;
  if (b < 0n) b = -b;
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

function extendedGcd(a, b) {
  let oldR = a, r = b;
  let oldS = 1n, s = 0n;
  let oldT = 0n, t = 1n;
  while (r !== 0n) {
    const q = oldR / r;
    [oldR, r] = [r, oldR - q * r];
    [oldS, s] = [s, oldS - q * s];
    [oldT, t] = [t, oldT - q * t];
  }
  return {g:oldR, x:oldS, y:oldT};
}

function mod(a, n) {
  const value = a % n;
  return value < 0n ? value + n : value;
}

function powMod(base, exponent, modulus) {
  let a = mod(base, modulus);
  let e = exponent;
  let answer = 1n;
  while (e > 0n) {
    if (e & 1n) answer = answer * a % modulus;
    a = a * a % modulus;
    e >>= 1n;
  }
  return answer;
}

function inverseMod(a, modulus) {
  const eg = extendedGcd(mod(a, modulus), modulus);
  assert(eg.g === 1n, "modular inverse does not exist");
  return mod(eg.x, modulus);
}

function powModSigned(base, exponent, modulus) {
  if (exponent >= 0n) return powMod(base, exponent, modulus);
  return powMod(inverseMod(base, modulus), -exponent, modulus);
}

function determinantBareiss(A0) {
  const A = A0.map(row => row.slice());
  const n = A.length;
  if (n === 0) return 1n;
  let sign = 1n;
  let previous = 1n;
  for (let k = 0; k < n - 1; ++k) {
    if (A[k][k] === 0n) {
      let p = k + 1;
      while (p < n && A[p][k] === 0n) ++p;
      if (p === n) return 0n;
      [A[k], A[p]] = [A[p], A[k]];
      sign = -sign;
    }
    const pivot = A[k][k];
    for (let i = k + 1; i < n; ++i) {
      for (let j = k + 1; j < n; ++j) {
        const value = A[i][j] * pivot - A[i][k] * A[k][j];
        if (value % previous !== 0n) throw new Error("Bareiss division failed");
        A[i][j] = value / previous;
      }
    }
    previous = pivot;
  }
  const value = sign * A[n - 1][n - 1];
  return value < 0n ? -value : value;
}

function resultant(a0, b0) {
  const a = a0.slice();
  const b = b0.slice();
  while (a.length > 1 && a[a.length - 1] === 0n) a.pop();
  while (b.length > 1 && b[b.length - 1] === 0n) b.pop();
  const m = a.length - 1;
  const n = b.length - 1;
  const ad = a.slice().reverse();
  const bd = b.slice().reverse();
  const S = Array.from({length: m + n}, () => Array(m + n).fill(0n));
  for (let row = 0; row < n; ++row) {
    for (let j = 0; j <= m; ++j) S[row][row + j] = ad[j];
  }
  for (let row = 0; row < m; ++row) {
    for (let j = 0; j <= n; ++j) S[n + row][row + j] = bd[j];
  }
  return determinantBareiss(S);
}

function affineData(word) {
  let C = 0n;
  let A = 0n;
  for (const a of word) {
    C = 3n * C + (1n << A);
    A += BigInt(a);
  }
  return {C, A};
}

function runType(T) {
  const gaps = [T[1] - T[0], T[2] - T[1]];
  if (gaps[0] === 1 && gaps[1] === 1) return "3";
  if (gaps[0] === 1 || gaps[1] === 1) return "2+1";
  return "1+1+1";
}

function polynomialXRMinusTwo(r) {
  const f = Array(r + 1).fill(0n);
  f[0] = -2n;
  f[r] = 1n;
  return f;
}

function subsetPolynomial(r, residues) {
  const d = Math.max(...residues);
  const h = Array(r + 1).fill(0n);
  for (const c of residues) {
    h[d - c + 1] += 1n;
    h[d - c] -= 1n;
  }
  h[d + 1] -= 1n;
  if (h[r] !== 0n) {
    h[0] += 2n * h[r];
    h[r] = 0n;
  }
  return h;
}

function exactRationalStates(word, C, D) {
  const common = gcd(C, D);
  const q = D / common;
  let p = C / common;
  const states = [];
  for (const a of word) {
    states.push(p);
    const numerator = 3n * p + q;
    const divisor = 1n << BigInt(a);
    if (numerator % divisor !== 0n || numerator % (2n * divisor) === 0n) {
      throw new Error("inexact rational valuation");
    }
    p = numerator / divisor;
  }
  if (p !== states[0]) throw new Error("rational orbit does not close");
  return {q, states};
}

const maxR = Number(process.argv[2] || 30);
const counts = {"1+1+1":0, "2+1":0, "3":0};
const largeCounts = {"1+1+1":0, "2+1":0, "3":0};
const fullResultantCounts = {"1+1+1":0, "2+1":0, "3":0};
const properCounts = {"1+1+1":0, "2+1":0, "3":0};
let fullCarry = 0;
let smallestProper = null;
let smallestFullResultant = null;
let run3Patterns = new Map();

for (let r = 4; r <= maxR; ++r) {
  const N = Math.ceil(Math.log2(3) * r - 1e-12);
  if (gcd(BigInt(N), BigInt(r)) !== 1n) continue;
  const D = (1n << BigInt(N)) - 3n ** BigInt(r);
  const fr = polynomialXRMinusTwo(r);
  const eg = extendedGcd(BigInt(r), BigInt(N));
  assert(eg.g === 1n, "bad coprime pair");
  const z = mod(powModSigned(2n, eg.x, D) * powModSigned(3n, eg.y, D), D);
  assert(powMod(z, BigInt(r), D) === 2n % D, "z^r identity failed");
  assert(powMod(z, BigInt(N), D) === 3n % D, "z^N identity failed");
  const B = N - r;
  const L = r - B;
  const M = B - L;
  const E = L - 2 * M;
  const F = M - 2 * E;
  if (L > 0 && M > 0 && E > 0 && F > 0) {
    assert(mod(3n * powMod(z, BigInt(L), D), D) === 4n % D,
      "L power identity failed");
    assert(mod(8n * powMod(z, BigInt(M), D), D) === 9n % D,
      "M power identity failed");
    assert(mod(243n * powMod(z, BigInt(E), D), D) === 256n % D,
      "E power identity failed at r=" + r + ",N=" + N);
    assert(mod((2n ** 19n) * powMod(z, BigInt(F), D), D) ===
      (3n ** 12n) % D, "F power identity failed");
  }
  for (let i = 1; i < r; ++i) for (let j = i + 1; j < r; ++j) {
    for (let k = j + 1; k < r; ++k) {
      const T = [i,j,k];
      const levels = Array(r).fill(0);
      for (const t of T) levels[t] = 1;
      const positions = levels.map((m, q) => Math.floor(q * N / r) - m);
      let valid = positions[0] === 0 && positions[r - 1] < N;
      for (let q = 1; q < r; ++q) if (positions[q] <= positions[q - 1]) valid = false;
      if (!valid) continue;

      const type = runType(T);
      ++counts[type];
      const residues = T.map(t => (t * N) % r);
      const H = subsetPolynomial(r, residues);
      const R = resultant(fr, H);
      if (R >= D) {
        ++largeCounts[type];
      }
      if (R % D === 0n) {
        ++fullResultantCounts[type];
        const record = {r,N,T,residues,D,R,type};
        if (smallestFullResultant === null || r < smallestFullResultant.r) {
          smallestFullResultant = record;
        }
      }

      const word = [];
      for (let q = 0; q < r - 1; ++q) word.push(positions[q + 1] - positions[q]);
      word.push(N - positions[r - 1]);
      const data = affineData(word);
      const common = gcd(D, data.C);
      if (common === D) ++fullCarry;
      if (common > 1n && common < D) {
        ++properCounts[type];
        const rational = exactRationalStates(word, data.C, D);
        const record = {r,N,T,residues,D,R,C:data.C,common,type,word,rational};
        if (smallestProper === null || r < smallestProper.r ||
            (r === smallestProper.r && D / common < smallestProper.D / smallestProper.common)) {
          smallestProper = record;
        }
      }

      if (type === "3") {
        const gaps = [
          Math.floor((i + 1) * N / r) - Math.floor(i * N / r),
          Math.floor((i + 2) * N / r) - Math.floor((i + 1) * N / r)
        ].join("");
        assert(gaps === "12" || gaps === "21", "forbidden run-3 gap pattern");
        run3Patterns.set(gaps, (run3Patterns.get(gaps) || 0) + 1);
        const c = residues[0];
        const A = gaps === "12" ? 23n : 29n;
        let subsetGate = mod(-z, D);
        for (const residue of residues) {
          subsetGate = mod(subsetGate +
            mod(z - 1n, D) * inverseMod(powMod(z, BigInt(residue), D), D), D);
        }
        const normal = mod(9n * powMod(z, BigInt(c + 1), D) - A * z + A, D);
        assert(mod(normal + 9n * powMod(z, BigInt(c), D) * subsetGate, D) === 0n,
          "run-3 normal form failed");
      }
    }
  }
}

if (maxR === 30) {
  assert(counts["1+1+1"] === 2381, "unexpected isolated-run count");
  assert(counts["2+1"] === 1234, "unexpected two-plus-one count");
  assert(counts["3"] === 129, "unexpected run-3 count");
  assert(largeCounts["1+1+1"] === 4, "unexpected isolated large-resultant count");
  assert(largeCounts["2+1"] === 312, "unexpected two-plus-one large-resultant count");
  assert(largeCounts["3"] === 33, "unexpected run-3 large-resultant count");
  assert(properCounts["1+1+1"] === 128, "unexpected isolated proper-factor count");
  assert(properCounts["2+1"] === 68, "unexpected two-plus-one proper-factor count");
  assert(properCounts["3"] === 9, "unexpected run-3 proper-factor count");
  assert(run3Patterns.get("12") === 87 && run3Patterns.get("21") === 42,
    "unexpected run-3 gap counts");
}
assert(fullCarry === 0, "a finite full-determinant carry was found");
assert(Object.values(fullResultantCounts).every(x => x === 0),
  "a finite original resultant passed full D");

assert(smallestProper !== null, "missing proper-factor countermodel");
assert(smallestProper.r === 8 && smallestProper.N === 13,
  "wrong smallest countermodel dimensions");
assert(smallestProper.T.join(".") === "2.4.7", "wrong countermodel shifts");
assert(smallestProper.D === 1631n && smallestProper.C === 11641n,
  "wrong countermodel determinant or carry");
assert(smallestProper.common === 7n && smallestProper.rational.q === 233n,
  "wrong countermodel gcd or denominator");
assert(smallestProper.R === 217n, "wrong countermodel resultant");
assert(smallestProper.rational.states[0] === 1663n,
  "wrong countermodel first state");
assert(smallestProper.rational.states.every(x => x >= 1663n),
  "countermodel first state is not least");

// Rational logarithm and Euclidean-ladder certificates.
assert(2n ** 19n < 3n ** 12n, "19/12 lower bound failed");
assert(3n ** 200n < 2n ** 317n, "317/200 upper bound failed");
assert(2n ** 84n < 3n ** 53n, "84/53 lower bound failed");

// Archimedean norm comparisons.
assert(274n ** 171n * 3n ** 1000n < 8n ** 1000n,
  "274^(171/1000)<8/3 failed");
assert(347n ** 171n * 4n ** 1000n < 11n ** 1000n,
  "347^(171/1000)<11/4 failed");
assert(324n ** 171n * 5n ** 1000n < 14n ** 1000n,
  "324^(171/1000)<14/5 failed");
assert(67000n * 3n ** 12n < 8n ** 12n,
  "67000^(1/12)<8/3 failed");
assert(202000n * 5n ** 12n < 14n ** 12n,
  "202000^(1/12)<14/5 failed");
assert(982n * 5n ** 12n < 14n ** 12n,
  "982^(1/12)<14/5 failed");

const fRows = [];
for (let q = 0; q <= 3; ++q) {
  let A, B;
  if (q === 0) {
    A = 2n ** 13n;
    B = 23n * 3n ** 6n;
  } else {
    A = 3n ** BigInt(12 * q - 6);
    B = 23n * 2n ** BigInt(19 * q - 13);
  }
  const K = 2n ** 20n * (A + B);
  assert(K ** 21n * 5n ** 1000n < 14n ** 1000n,
    "F-level q=" + q + " norm bound failed");
  fRows.push([q,A,B,K]);
}
const A3 = 2n ** 21n;
const B3 = 23n * 3n ** 11n;
const K3 = 2n ** 20n * (A3 + B3);
assert(K3 ** 21n * 5n ** 1000n < 14n ** 1000n,
  "F-level q=3 top-interval norm bound failed");
assert(42n ** 21n * 3n ** 1000n < 8n ** 1000n,
  "F-level q=3 endpoint linear norm bound failed");
assert(72057431991n > 3n ** 16n, "period barrier certificate failed");

console.log("max_r=" + maxR);
for (const type of ["1+1+1","2+1","3"]) {
  console.log("type_" + type + "=" + [counts[type],largeCounts[type],fullResultantCounts[type],properCounts[type]].join(":"));
}
console.log("full_carry_cases=" + fullCarry);
console.log("run3_internal_patterns=" + [...run3Patterns].map(([k,v]) => k + ":" + v).join(","));
if (smallestProper) {
  console.log("smallest_proper=" + [smallestProper.r,smallestProper.N,smallestProper.T.join("."),
    smallestProper.residues.join("."),smallestProper.D,smallestProper.R,smallestProper.C,
    smallestProper.common,smallestProper.D/smallestProper.common,smallestProper.type,
    smallestProper.word.join(".")].join(":"));
  console.log("smallest_proper_states=" + smallestProper.rational.states.join(",") + "/" + smallestProper.rational.q);
}
console.log("run3_power_ladder_certificate_passed=true");
