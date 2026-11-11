#!/usr/bin/env node
"use strict";

// Exact certificate for the row-lift identities and counterexamples in
// fcd_row_lift.md.  It checks fixed examples only; it is not an all-depth FCD
// scan.  The symbolic tail of the strengthened determinant bound uses the
// already-audited logarithmic-form input quoted in the report.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function mod(a, m) {
  a %= m;
  return a < 0n ? a + m : a;
}

function inverse(a, m) {
  let t = 0n, nextT = 1n, r = m, nextR = mod(a, m);
  while (nextR !== 0n) {
    const q = r / nextR;
    [t, nextT] = [nextT, t - q * nextT];
    [r, nextR] = [nextR, r - q * nextR];
  }
  assert(r === 1n, "inverse does not exist");
  return mod(t, m);
}

function parameters(s) {
  const P = 3n ** BigInt(s);
  let M = 1n, k = 0;
  while (M < P) {
    M <<= 1n;
    ++k;
  }
  return {s, k, M, P, D: M - P};
}

function carry(word) {
  let C = 0n;
  for (let j = 0; j < word.length; ++j) {
    if (word[j] === "1") C = 3n * C + (1n << BigInt(j));
  }
  return C;
}

function onePositions(word) {
  const out = [];
  for (let j = 0; j < word.length; ++j) {
    if (word[j] === "1") out.push(j);
  }
  return out;
}

function primitiveFirstCrossing(word) {
  let p2 = 1n, p3 = 1n;
  for (let j = 0; j < word.length; ++j) {
    if (p3 < p2) return false;
    p2 <<= 1n;
    if (word[j] === "1") p3 *= 3n;
  }
  return p3 < p2;
}

function data(word, requirePrimitive = true) {
  const positions = onePositions(word);
  const x = parameters(positions.length);
  assert(word.length === x.k, "word is not at its weight crossing length");
  if (requirePrimitive) {
    assert(primitiveFirstCrossing(word), "word is not primitive first crossing");
  }
  const C = carry(word);
  const rho = mod(-C * inverse(x.P, x.M), x.M);
  const numerator = x.P * rho + C;
  assert(numerator % x.M === 0n, "endpoint is not integral");
  const Z = numerator / x.M;
  const gap = rho - Z;
  const margin = x.D * rho - C;
  assert(margin === x.M * gap, "margin identity failed");
  return {...x, word, positions, C, rho, Z, gap, margin};
}

function project(upper, requirePrimitive = true) {
  const positions = upper.positions.slice(0, -1);
  const lowerParameters = parameters(upper.s - 1);
  const bits = new Array(lowerParameters.k).fill("0");
  for (const A of positions) {
    assert(A < bits.length, "projected one escaped the old modulus");
    bits[A] = "1";
  }
  return data(bits.join(""), requirePrimitive);
}

function rowLift(upperWord, requirePrimitive = true) {
  const upper = data(upperWord, requirePrimitive);
  assert(upper.s >= 2, "row lift needs positive projected weight");
  const lower = project(upper, requirePrimitive);
  const m = lower.M;
  const q = upper.M / m;
  assert(q === 2n || q === 4n, "dyadic lift is not two- or four-fold");
  const A = upper.positions[upper.positions.length - 1];
  const u = 1n << BigInt(A);
  assert(A > lower.positions[lower.positions.length - 1] && A < lower.k,
    "last one is not a terminal zero of the projected word");
  assert(upper.C === 3n * lower.C + u, "carry recursion failed");
  assert(upper.P === 3n * lower.P, "weight recursion failed");

  const r0 = mod(-upper.C * inverse(upper.P, m), m);
  const hNumerator = upper.P * r0 + upper.C;
  assert(hNumerator % m === 0n, "old-modulus quotient is not integral");
  const h = hNumerator / m;
  const lambda = (upper.rho - r0) / m;
  assert(0n <= lambda && lambda < q && r0 + lambda * m === upper.rho,
    "canonical residue is not the claimed lift");
  assert(mod(h + upper.P * lambda, q) === 0n,
    "high dyadic lift congruence failed");
  assert(lambda === mod(-h * inverse(upper.P, q), q),
    "explicit lift selector failed");

  const reconstructedZ = (h + upper.P * lambda) / q;
  const rowScore = q * r0 - h + lambda * upper.D;
  assert(reconstructedZ === upper.Z, "endpoint lift failed");
  assert(m * rowScore === upper.margin, "row margin formula failed");

  const H = mod(u * inverse(upper.P, m), m);
  assert(r0 === mod(lower.rho - H, m), "old-residue threshold update failed");
  const ellNumerator = upper.P * (r0 - lower.rho) + u;
  assert(ellNumerator % m === 0n, "projection wrap is not integral");
  const ell = ellNumerator / m;
  assert(h === 3n * lower.Z + ell, "projected endpoint formula failed");

  const wrapped = H > lower.rho;
  const wrap = wrapped ? 1n : 0n;
  assert(r0 === lower.rho - H + wrap * m,
    "binary threshold wrap formula failed");
  const VNumerator = upper.D * H + u;
  assert(VNumerator % m === 0n, "row threshold is not integral");
  const V = VNumerator / m;
  assert(0n < V && V < upper.D, "row threshold escaped (0,D)");
  const projectedBias = q * lower.rho - 3n * lower.Z;
  assert(rowScore === projectedBias - V + (wrap + lambda) * upper.D,
    "wrapped row-score decomposition failed");

  return {
    upper, lower, q, A, u, r0, h, lambda, rowScore, H, ell,
    wrapped, V, projectedBias
  };
}

function serial(x) {
  return {
    lowerWord: x.lower.word,
    upperWord: x.upper.word,
    s: x.upper.s,
    q: x.q.toString(),
    A: x.A,
    lower: {
      C: x.lower.C.toString(), rho: x.lower.rho.toString(),
      Z: x.lower.Z.toString(), gap: x.lower.gap.toString(),
      margin: x.lower.margin.toString()
    },
    lift: {
      r0: x.r0.toString(), h: x.h.toString(),
      lambda: x.lambda.toString(), H: x.H.toString(),
      wrapped: x.wrapped, V: x.V.toString(),
      projectedBias: x.projectedBias.toString(),
      ell: x.ell.toString(), rowScore: x.rowScore.toString()
    },
    upper: {
      C: x.upper.C.toString(), rho: x.upper.rho.toString(),
      Z: x.upper.Z.toString(), gap: x.upper.gap.toString(),
      margin: x.upper.margin.toString()
    }
  };
}

// The same projected row realizes both q=2 lifts.
const q2Both = [rowLift("11100"), rowLift("11010")];
assert(q2Both[0].lower.word === "1100" &&
  q2Both[1].lower.word === "1100", "q=2 projections differ");
assert(q2Both.map(x => x.lambda.toString()).sort().join() === "0,1",
  "q=2 lift set changed");

// The same projected row realizes all four q=4 lifts.
const q4All = [
  rowLift("111111111001100000"),
  rowLift("111111111001010000"),
  rowLift("111111111001001000"),
  rowLift("111111111001000100")
];
assert(q4All.every(x => x.lower.word === "1111111110010000"),
  "q=4 projections differ");
assert(q4All.map(x => x.lambda.toString()).sort().join() === "0,1,2,3",
  "q=4 lift set changed");

// Genuine zero-lift extensions refuting monotonicity of both gap and margin.
const q2Decrease = rowLift("11011010");
assert(q2Decrease.q === 2n && q2Decrease.lambda === 0n &&
  q2Decrease.lower.gap === 21n && q2Decrease.upper.gap === 5n &&
  q2Decrease.lower.margin === 2688n &&
  q2Decrease.upper.margin === 1280n,
  "q=2 zero-lift decrease changed");
const q4Decrease = q4All.find(x => x.A === 14);
assert(q4Decrease && q4Decrease.lambda === 0n &&
  q4Decrease.lower.gap === 5219n && q4Decrease.upper.gap === 1161n &&
  q4Decrease.lower.margin === 342032384n &&
  q4Decrease.upper.margin === 304349184n,
  "q=4 zero-lift decrease changed");

// Sharp raw-recursion countermodel.  The projected row has positive FCD
// margin and every row-lift identity holds, but the extension has negative
// margin.  The omitted hypothesis is exactly the proper-prefix barrier: both
// words contain the forbidden initial prefix 10.
const almostBarrier = rowLift("10111010", false);
assert(!primitiveFirstCrossing(almostBarrier.lower.word) &&
  !primitiveFirstCrossing(almostBarrier.upper.word),
  "almost-barrier words became primitive");
assert(almostBarrier.lower.word === "1011100" &&
  almostBarrier.q === 2n && almostBarrier.A === 6 &&
  almostBarrier.lambda === 0n &&
  almostBarrier.lower.gap === 26n && almostBarrier.lower.margin === 3328n &&
  almostBarrier.upper.gap === -1n && almostBarrier.upper.margin === -256n,
  "almost-barrier row countermodel changed");

// Zero lift does not force the no-wrap branch.  This genuine q=2 extension
// is wrapped and has the smallest possible positive upper gap.
const wrappedQ2Boundary = rowLift("11010");
assert(wrappedQ2Boundary.lambda === 0n && wrappedQ2Boundary.wrapped &&
  wrappedQ2Boundary.H === 8n && wrappedQ2Boundary.lower.rho === 3n &&
  wrappedQ2Boundary.V === 3n && wrappedQ2Boundary.projectedBias === 0n &&
  wrappedQ2Boundary.rowScore === 2n && wrappedQ2Boundary.upper.gap === 1n,
  "wrapped q=2 boundary witness changed");

// For q=4, every wrapped zero lift is symbolically safe.  This fixed
// nonboundary example exercises that branch.
const wrappedQ4 = rowLift("110110110100");
assert(wrappedQ4.q === 4n && wrappedQ4.lambda === 0n && wrappedQ4.wrapped &&
  wrappedQ4.lower.gap > 0n && wrappedQ4.rowScore > 0n,
  "wrapped q=4 witness changed");

// Exact no-wrap q=4 tiny-seed near cancellation.  The projected positive
// bias exceeds V by only 32, leaving upper gap 8; here rho=31<s=35.
const q4NearCancellation = rowLift(
  "11111010110111011110100111011011111100111100010101000100");
assert(q4NearCancellation.q === 4n &&
  q4NearCancellation.lambda === 0n && !q4NearCancellation.wrapped &&
  q4NearCancellation.upper.s === 35 &&
  q4NearCancellation.lower.rho === 9007199254741023n &&
  q4NearCancellation.lower.Z === 8338590849833315n &&
  q4NearCancellation.H === 9007199254740992n &&
  q4NearCancellation.r0 === 31n && q4NearCancellation.h === 92n &&
  q4NearCancellation.V === 11013024469464115n &&
  q4NearCancellation.projectedBias === 11013024469464147n &&
  q4NearCancellation.rowScore === 32n &&
  q4NearCancellation.upper.rho === 31n &&
  q4NearCancellation.upper.Z === 23n &&
  q4NearCancellation.upper.gap === 8n,
  "q=4 near-cancellation witness changed");

// Exact finite base for D_s > q_s*s/3, 2 <= s <= 64.
const determinantBase = [];
for (let s = 2; s <= 64; ++s) {
  const x = parameters(s), y = parameters(s - 1);
  const q = x.M / y.M;
  assert(3n * x.D > q * BigInt(s), `determinant base failed at s=${s}`);
  determinantBase.push({s, q: q.toString(), D: x.D.toString()});
}

// Given the audited input D_s > 3^(s-7)/s^14 for s >= 63, these two
// integer inequalities prove D_s > 4s/3 at s=65 and propagate it.
assert(3n ** 59n > 4n * 65n ** 15n, "symbolic tail base failed");
assert(3n * 65n ** 15n > 66n ** 15n, "symbolic tail propagation failed");

console.log(JSON.stringify({
  certificate: "FCD row-lift dichotomy",
  exactIdentity:
    "rho=r0+lambda*m; q | h+P*lambda; margin=m*(q*r0-h+lambda*D)",
  q2BothLifts: q2Both.map(serial),
  q4AllLifts: q4All.map(serial),
  zeroLiftMonotonicityCounterexamples: {
    q2: serial(q2Decrease),
    q4: serial(q4Decrease)
  },
  rawRecursionCountermodel: {
    omittedHypothesis: "proper-prefix barrier",
    data: serial(almostBarrier)
  },
  zeroLiftWrapBranches: {
    wrappedQ2NearBoundary: serial(wrappedQ2Boundary),
    wrappedQ4SafeExample: serial(wrappedQ4),
    q4NoWrapNearCancellation: serial(q4NearCancellation)
  },
  determinantBound: {
    finiteBase: "3*D_s > q_s*s for 2 <= s <= 64",
    checkedRows: determinantBase.length,
    symbolicTailInput: "D_s > 3^(s-7)/s^14 for s >= 63",
    symbolicTailConclusion: "D_s > 4s/3 >= q_s*s/3 for s >= 65"
  }
}, null, 2));
