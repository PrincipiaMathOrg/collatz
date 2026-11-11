"use strict";

// Exact audit of the dual-ternary formulation of first-crossing descent.
//
// A first-crossing shortcut word w has
//   M=2^k, P=3^s, D=M-P,
//   C=sum_i 2^{A_i}3^{s-1-i}.
// This program checks, using BigInt only, the identities proved in
// inverse_fiber.md, Section 4D.  In particular it does not use floating
// point arithmetic to decide either forbidden interval.

function mod(a, m) {
  if (m <= 0n) throw new Error("modulus must be positive");
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
  if (g !== 1n) throw new Error(`nonunit ${a} modulo ${m}`);
  return mod(x, m);
}

function gcd(a, b) {
  if (a < 0n) a = -a;
  if (b < 0n) b = -b;
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

function floorDiv(a, b) {
  if (b <= 0n) throw new Error("positive denominator required");
  let q = a / b;
  if (a < 0n && a % b !== 0n) --q;
  return q;
}

function carry(word) {
  let C = 0n;
  for (let j = 0; j < word.length; ++j) {
    if (word[j] === "1") C = 3n * C + (1n << BigInt(j));
  }
  return C;
}

function isFirstCrossing(word) {
  let M = 1n, P = 1n;
  for (let j = 0; j < word.length; ++j) {
    M *= 2n;
    if (word[j] === "1") P *= 3n;
    if (j + 1 < word.length && P < M) return false;
  }
  return P < M;
}

function analyze(word) {
  if (!isFirstCrossing(word)) throw new Error(`not first crossing: ${word}`);

  const positions = [];
  for (let j = 0; j < word.length; ++j) {
    if (word[j] === "1") positions.push(j);
  }
  const k = word.length, s = positions.length;
  if (s === 0) {
    // The word 0 has no ternary terms.  It is a separate FCD boundary.
    return {word, k, s, boundaryZero: true};
  }

  const M = 1n << BigInt(k);
  const P = 3n ** BigInt(s);
  const D = M - P;
  const C = carry(word);
  const tau = D === 1n ? 0n : mod(C * inv(M, D), D);
  const rho = mod(-C * inv(P, M), M);
  const endpointNumerator = P * rho + C;
  if (endpointNumerator % M !== 0n) throw new Error("endpoint is not integral");
  const Z = endpointNumerator / M;
  const d = Z - rho;
  if (C !== D * rho + M * d) throw new Error("binary lift identity");
  if (!(d === tau || d === tau - D)) throw new Error("two-lift identity");
  const terms = [];
  let R = 0n, N = 0n;

  for (let i = 0; i < s; ++i) {
    const A = positions[i];
    const tail3 = 3n ** BigInt(s - 1 - i);
    const t = (1n << BigInt(A)) * tail3;
    const r = D === 1n ? 0n : mod(t * inv(M, D), D);
    const hNumerator = M * r - t;
    if (hNumerator % D !== 0n) throw new Error("h is not integral");
    const h = hNumerator / D;
    const v = h - r;
    if (v % tail3 !== 0n) throw new Error("V is not integral");
    const V = v / tail3;
    const ternaryModulus = 3n ** BigInt(i + 1);
    const expected = mod(-(1n << BigInt(A)) * inv(M, ternaryModulus), ternaryModulus);

    // D=1 is genuinely exceptional: r=0 and V=-2^A.  For D>1,
    // the ballot inequality 2^A <= 3^i makes V the least positive residue.
    if (D > 1n) {
      if (!(0n < V && V < ternaryModulus)) throw new Error("V range");
      if (V !== expected) throw new Error("wrong ternary representative");
    }

    R += r;
    N += V * tail3; // N=P*X is an integer.
    terms.push({i, A, t, r, h, v, V, ternaryModulus, expected});
  }

  // sum r_i = S + D X, after multiplication by P.
  if (P * R !== C + D * N) throw new Error("sum identity");

  // W=floor(X+S/D)=floor(R/D), including D=1 and negative X.
  const W = floorDiv(D * N + C, P * D);
  if (W !== floorDiv(R, D)) throw new Error("floor identity");
  if (R !== tau + W * D) throw new Error("wrap identity");

  const marginNumerator = C + M * (N - P * W);
  if (marginNumerator % P !== 0n) throw new Error("dual margin not integral");
  const Kdual = marginNumerator / P;
  const K = (M * tau - C) / D;
  if (Kdual !== K) throw new Error("margin identity");

  // If u={X}=z/P, then failure K<=0 is exactly
  //   1-C/(PD) <= u <= 1-C/(PM).
  const z = mod(N, P);
  if (z === 0n) throw new Error("P divides PX, contradicting 3 not dividing C");
  const inXInterval =
    z * D >= P * D - C &&
    z * M <= P * M - C;
  if (inXInterval !== (K <= 0n)) throw new Error("X forbidden interval");

  // Y=P-z is the least positive residue [C D^{-1}]_P, and failure is
  // exactly C/M <= Y <= C/D.
  const Y = P - z;
  const expectedY = mod(C * inv(D, P), P);
  if (expectedY === 0n || Y !== expectedY) throw new Error("Y representative");
  if (mod(Z, P) !== Y) throw new Error("Y is not the ternary endpoint residue");
  const inYInterval = Y * M >= C && Y * D <= C;
  if (inYInterval !== inXInterval) throw new Error("Y forbidden interval");

  // The carry and denominator estimates used to keep both intervals
  // non-wrapping.  We verify them directly on every enumerated word.
  if (!(C < P * D)) throw new Error("S/D is not below one");
  if (!(0n < C && C < P * M)) throw new Error("S/M range");

  const g = gcd(D, C), q = D / g, p = C / g;
  if (d % g !== 0n) throw new Error("g does not divide d");
  if ((Z - Y) % P !== 0n) throw new Error("endpoint wrap is not integral");
  const delta = d / g;
  const n = (Z - Y) / P;
  if (n < 0n) throw new Error("negative endpoint wrap");
  const eNumerator = p - q * Y;
  if (eNumerator % P !== 0n) throw new Error("q-shadow is not integral");
  const e = eNumerator / P;
  if (e !== delta + q * n) throw new Error("q-shadow lift identity");
  if (rho !== Y - g * e + n * M) throw new Error("coordinate-line identity");

  // This is a second, reduced-coordinate description of the same closed
  // forbidden interval.
  const inShadowInterval = e >= 0n && Y >= g * e;
  if (inShadowInterval !== inYInterval) throw new Error("q-shadow interval");

  const nonDescent = d >= 0n;
  if (nonDescent !== (K <= 0n) || nonDescent !== inYInterval) {
    throw new Error("non-descent equivalence");
  }

  // Bi-canonical form.  The rational fixed point is x*=C/D.  Failure is
  // equivalent to 0<rho<=Z=Y<=x*<P.  If d>0, the middle inequalities are
  // strict.  If d=0, then rho=Z=Y=x* and q=1.
  const biCanonical =
    0n < rho && rho <= Z && Z === Y && Z * D <= C && C < P * D;
  if (biCanonical !== nonDescent) throw new Error("bi-canonical equivalence");
  if (nonDescent && d > 0n && !(rho < Z && Z * D < C)) {
    throw new Error("strict bi-canonical ordering");
  }
  if (q === 1n) {
    // Integrality is exact contact with the upper endpoint Y=C/D.
    if (Y * D !== C || K !== -C / D || d !== 0n || rho !== Z || Z !== Y ||
        e !== 0n || n !== 0n) {
      throw new Error("q=1 endpoint identity");
    }
  } else if (Y * D === C) {
    throw new Error("upper endpoint without q=1");
  }
  if (nonDescent && q > 1n) {
    if (!(1n <= e && e <= q - 1n && g * e < Y && n === 0n &&
          d === g * e && rho === Y - g * e && Z === Y)) {
      throw new Error("nonintegral failure normal form");
    }
  }

  return {
    word, k, s, M, P, D, C, tau, rho, Z, d, R, N, W, K, z, Y,
    g, q, p, delta, n, e,
    inXInterval, inYInterval, biCanonical, terms, boundaryZero: false,
  };
}

function format(x, label) {
  if (x.boundaryZero) return `${label}: word=0 (zero-weight boundary)`;
  const side = x.Y * x.M < x.C ? "below" :
    x.Y * x.D > x.C ? "above" :
    x.Y * x.D === x.C ? "upper-endpoint" : "interior";
  return [
    `${label}: word=${x.word}`,
    `k=${x.k} s=${x.s} D=${x.D} C=${x.C} g=${x.g} q=${x.q} p=${x.p}`,
    `tau=${x.tau} rho=${x.rho} Z=${x.Z} d=${x.d} W=${x.W} K=${x.K}`,
    `PX=${x.N} z=(PX mod P)=${x.z} Y=${x.Y} n=${x.n} delta=${x.delta} e=${x.e}`,
    `forbidden=${x.inYInterval ? 1 : 0} location=${side}`,
    `V=[${x.terms.map(t => t.V).join(",")}]`,
  ].join(" ");
}

const maxK = Number(process.argv[2] || 24);
if (!Number.isInteger(maxK) || maxK < 1) throw new Error("invalid maxK");

let total = 0, positiveWeight = 0, nontrivial = 0;
let failures = 0, q1 = 0, dOne = 0, leastResidueExceptions = 0;
let maxAbsDigitJump = 0n;
const q1Words = [];

function record(word) {
  const x = analyze(word);
  ++total;
  if (x.boundaryZero) return;
  ++positiveWeight;
  if (x.D === 1n) ++dOne;
  if (x.D === 1n && x.terms.some(t => t.V !== t.expected)) ++leastResidueExceptions;
  if (x.word !== "10") ++nontrivial;
  if (x.inYInterval) ++failures;
  if (x.q === 1n) {
    ++q1;
    q1Words.push(word);
  }

  // Regression against a tempting but false digit induction: the lift
  // (V_{i+1}-2^{A_{i+1}-A_i}V_i)/3^{i+1} is not a ternary digit.
  for (let i = 0; i + 1 < x.terms.length; ++i) {
    const a = x.terms[i + 1].A - x.terms[i].A;
    const jump = (x.terms[i + 1].V - (1n << BigInt(a)) * x.terms[i].V) /
      (3n ** BigInt(i + 1));
    const abs = jump < 0n ? -jump : jump;
    if (abs > maxAbsDigitJump) maxAbsDigitJump = abs;
  }
}

function dfs(word, P, M) {
  if (word.length >= maxK) return;
  const M2 = 2n * M;
  if (P < M2) record(word + "0");
  else dfs(word + "0", P, M2);
  dfs(word + "1", 3n * P, M2);
}

dfs("", 1n, 1n);

const q5Accelerated = [1,1,1,1,1,2,1,1,2,1,2,3,2,1,1,1,5];
const q5Binary = q5Accelerated.map(a => "1" + "0".repeat(a - 1)).join("");
const halfBoundWitness = "1111101010111111111101101010100010100111011000";

const boundary10 = analyze("10");
const smallestNonboundary = analyze("1100");
const q5Model = analyze(q5Binary);
const halfWitness = analyze(halfBoundWitness);

if (boundary10.q !== 1n || !boundary10.inYInterval ||
    boundary10.Y * boundary10.D !== boundary10.C || !boundary10.biCanonical) {
  throw new Error("boundary 10 regression");
}
if (boundary10.terms[0].V !== -1n || boundary10.terms[0].expected !== 2n) {
  throw new Error("D=1 representative regression");
}
const firstJump = (smallestNonboundary.terms[1].V -
  2n * smallestNonboundary.terms[0].V) / 3n;
if (firstJump !== -1n) throw new Error("naive ternary-digit regression");
if (q5Model.q !== 5n || q5Model.inYInterval || q5Model.K <= 0n ||
    q5Model.Y !== q5Model.Z || q5Model.Z * q5Model.D <= q5Model.C) {
  throw new Error("q=5 rational-cycle regression");
}
if (halfWitness.inYInterval || halfWitness.K <= 0n || halfWitness.tau !== 14n) {
  throw new Error("half-bound witness regression");
}

console.log(
  `maxK=${maxK} total=${total} positiveWeight=${positiveWeight} ` +
  `nontrivial=${nontrivial} forbidden=${failures} q1=${q1} D1=${dOne} ` +
  `leastResidueExceptions=${leastResidueExceptions}`
);
console.log(`q1Words=${q1Words.join(",")} maxAbsNaiveDigitJump=${maxAbsDigitJump}`);
console.log(format(boundary10, "boundary-10"));
console.log(format(smallestNonboundary, "naive-digit-regression"));
console.log(format(q5Model, "q=5-rational-cycle"));
console.log(format(halfWitness, "half-bound-witness"));

for (const word of process.argv.slice(3)) {
  console.log(format(analyze(word), "requested"));
}
