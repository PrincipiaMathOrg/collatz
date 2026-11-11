#!/usr/bin/env node
"use strict";

// Exact audit for the last-positive centered-residue quotient theorem.
// The companion note proves the all-depth statements.  This checker verifies
// the suffix conjugacies on every anchored profile through maxR and verifies
// the sharp denominator-blind family through familyMaxR.

function abs(a) { return a < 0n ? -a : a; }
function pow2(k) { return 1n << BigInt(k); }
function pow3(k) { return 3n ** BigInt(k); }
function bitLength(n) { return n.toString(2).length; }
function valuation(n, p) {
  n = abs(n);
  if (n === 0n) throw new Error("valuation of zero");
  let value = 0;
  while (n % p === 0n) {
    n /= p;
    ++value;
  }
  return value;
}
function gcd(a, b) {
  a = abs(a);
  b = abs(b);
  while (b !== 0n) {
    const next = a % b;
    a = b;
    b = next;
  }
  return a;
}
function acceleratedOdd(n) {
  let value = 3n * n + 1n;
  while (value % 2n === 0n) value /= 2n;
  return value;
}

const maxR = Number(process.argv[2] || 28);
const familyMaxR = Number(process.argv[3] || 512);
if (!Number.isInteger(maxR) || maxR < 3 || maxR > 30) {
  throw new Error("bad maxR");
}
if (!Number.isInteger(familyMaxR) || familyMaxR < 128) {
  throw new Error("bad familyMaxR");
}

let profiles = 0n;
let profilesWithPositiveCut = 0n;
let normalizedQuotientChecks = 0n;
let qOneConjugacyChecks = 0n;
let bottomConjugacyChecks = 0n;
let fixedPointSeparationChecks = 0n;
let candidateSlopeChecks = 0n;
let sharpCandidateQuotients = 0n;
let minimumCandidateQuotient = null;
let minimumCandidateWitness = null;

for (let r = 3; r <= maxR; ++r) {
  const threeR = pow3(r);
  const N = bitLength(threeR);
  const e = N - r;
  const B = [0];
  const eligible = [];
  for (let t = 1; t <= r; ++t) {
    B.push(Math.floor(e * t / r));
    if (t < r && B[t] - B[t - 1] === 1) eligible.push(t);
  }
  if (eligible.length !== e - 1) throw new Error(`clock count r=${r}`);
  if (eligible.length >= 31) throw new Error("mask cutoff");

  const masks = 2 ** eligible.length;
  for (let mask = 0; mask < masks; ++mask) {
    const spikes = [];
    for (let i = 0; i < eligible.length; ++i) {
      if ((mask & 2 ** i) !== 0) spikes.push(eligible[i]);
    }
    const V = spikes.length;
    const U = e - 1 - V;
    if (U < 1) continue;
    ++profiles;

    const spikeSet = new Set(spikes);
    const height = [0];
    let usedSpikes = 0;
    for (let t = 1; t < r; ++t) {
      if (spikeSet.has(t)) ++usedSpikes;
      height.push(B[t] - usedSpikes);
    }
    if (height[r - 1] !== U) throw new Error("terminal height");

    let lastPositive = null;
    for (let H = 1; H <= U + 1; ++H) {
      const T = H === U + 1
        ? r
        : height.findIndex(value => value === H);
      if (T < 0) throw new Error("missing height");

      let lateInteger = 0n;
      const late = [];
      for (let i = 0; i < V; ++i) {
        const t = spikes[i];
        const k = i + 1;
        if (height[t - 1] >= H) {
          lateInteger += pow2(t + k) * pow3(r - t);
          late.push({ t, k });
        }
      }
      const E = lateInteger - pow2(N - U);
      if (E === 0n) throw new Error("vanishing centered defect");
      if (E > 0n) lastPositive = { H, T, E, late };
      if (lastPositive !== null && H > lastPositive.H && E > 0n) {
        throw new Error("nonmonotone sign chain");
      }
    }

    if (lastPositive === null) continue;
    ++profilesWithPositiveCut;

    const first = lastPositive.late[0];
    const lambda = first.t + first.k;
    if (valuation(lastPositive.E, 2n) !== lambda) {
      throw new Error("last-positive valuation");
    }
    const W = lastPositive.E / pow2(lambda);
    if (W <= 0n || W % 2n === 0n || W % 3n === 0n) {
      throw new Error("odd quotient units");
    }
    if (lastPositive.E !== pow2(lambda) * W) {
      throw new Error("normalized defect reconstruction");
    }
    ++normalizedQuotientChecks;

    // After the first remaining spike, d=-1 and y=d/2=-1/2.
    // The residual word acts by 2^a y'=3y+1.  Its affine carry is C.
    const m = r - first.t;
    let A = 0;
    let C = 0n;
    let recurrenceW = -1n;
    let yNumerator = -1n;
    let yDenominatorExponent = 1;
    let zNumerator = 1n;
    let zDenominatorExponent = 2;
    let laterSpikes = 0;
    for (let s = first.t + 1; s <= r; ++s) {
      const isSpike = spikeSet.has(s);
      const a = isSpike ? 2 : 1;
      if (isSpike) ++laterSpikes;

      C = 3n * C + pow2(A);
      recurrenceW = 3n * recurrenceW + pow2(A + 1);
      yNumerator = 3n * yNumerator + pow2(yDenominatorExponent);
      yDenominatorExponent += a;

      if (isSpike) {
        zNumerator = 3n * zNumerator + pow2(zDenominatorExponent);
        zDenominatorExponent += 2;
      } else {
        zNumerator = 3n * zNumerator;
        zDenominatorExponent += 1;
      }
      A += a;

      if (yNumerator !== recurrenceW
          || yDenominatorExponent !== A + 1
          || yNumerator % 2n === 0n
          || zNumerator % 2n === 0n) {
        throw new Error("nonintegral dyadic conjugate");
      }
    }
    if (laterSpikes !== lastPositive.late.length - 1
        || A !== m + laterSpikes) {
      throw new Error("tail exponent count");
    }
    if (recurrenceW !== W
        || yNumerator !== W
        || W !== 2n * C - pow3(m)) {
      throw new Error("q=1 centered-carry conjugacy");
    }
    if (zDenominatorExponent !== A + 2
        || zNumerator !== pow2(A + 1) + W) {
      throw new Error("bottom-coordinate conjugacy");
    }
    ++qOneConjugacyChecks;
    ++bottomConjugacyChecks;

    // The tail fixed point has numerator C and denominator 2^A-3^m.
    // The return displacement of -1/2 has odd numerator W+2^A.
    const fixedDenominator = pow2(A) - pow3(m);
    if (fixedDenominator === 0n
        || W + pow2(A) !== 2n * C + fixedDenominator
        || (W + pow2(A)) % 2n === 0n) {
      throw new Error("fixed-point or displacement identification");
    }
    ++fixedPointSeparationChecks;

    // In the one-drop candidate slope range, r-2 is not eligible.  A
    // positive defect therefore leaves at least three maps after its first
    // remaining spike.  The exact recurrence forces W >= 11.
    if (2 * e > r && 3 * e < 2 * r) {
      if (eligible.includes(r - 2) || first.t > r - 3 || m < 3) {
        throw new Error("candidate terminal clock geometry");
      }
      if (W < 11n) throw new Error("candidate quotient floor");
      if (W === 11n) ++sharpCandidateQuotients;
      if (minimumCandidateQuotient === null || W < minimumCandidateQuotient) {
        minimumCandidateQuotient = W;
        minimumCandidateWitness = {
          r, N, e, U,
          H: lastPositive.H,
          spikes: spikes.join(","),
          W: W.toString()
        };
      }
      ++candidateSlopeChecks;
    }
  }
}

// The sharp all-depth rational family keeps only t=r-3.  We audit a long
// exact interval.  The note proves the same formulas for every r >= 128.
let familyRows = 0n;
let familyLowGateChecks = 0n;
let familyHighRiseChecks = 0n;
let familyNonintegralChecks = 0n;
let familyLeastnessChecks = 0n;
let firstFamilyRow = null;
let lastFamilyRow = null;

for (let r = 128; r <= familyMaxR; ++r) {
  const threeR = pow3(r);
  const N = bitLength(threeR);
  const e = N - r;
  if (!(2 * e > r && 3 * e < 2 * r)) {
    throw new Error(`family slope r=${r}`);
  }
  const B = [0];
  const eligible = new Set();
  for (let t = 1; t <= r; ++t) {
    B.push(Math.floor(e * t / r));
    if (t < r && B[t] - B[t - 1] === 1) eligible.add(t);
  }
  if (!eligible.has(r - 3) || eligible.has(r - 2)
      || !eligible.has(r - 1)) {
    throw new Error(`family eligibility r=${r}`);
  }

  const U = e - 2;
  const HStar = U - 1;
  const lambda = r - 2;
  const lateTerm = 27n * pow2(r - 2);
  const terminalPower = pow2(N - U);
  const E = lateTerm - terminalPower;
  if (B[r - 4] !== HStar
      || B[r - 3] - 1 !== HStar
      || B[r - 2] - 1 !== HStar
      || B[r - 1] - 1 !== U
      || N - U !== r + 2
      || E !== 11n * pow2(lambda)
      || E / pow2(valuation(E, 2n)) !== 11n) {
    throw new Error(`family centered quotient r=${r}`);
  }

  const D = pow2(N) - threeR;
  const K = pow2(N - 1) + 11n * pow2(r - 4);
  const compactFactor = pow2(e + 3) + 11n;
  if (K !== pow2(r - 4) * compactFactor) {
    throw new Error(`family fixed numerator r=${r}`);
  }
  const commonDivisor = gcd(K, D);
  const q = D / commonDivisor;
  if (q <= 1n || K % D === 0n || D <= compactFactor) {
    throw new Error(`family denominator r=${r}`);
  }
  ++familyNonintegralChecks;

  // The exact rational least state is Q=K/D.  We transport its numerator in
  // the bottom coordinate.  Every internal state is strictly above K/D,
  // while the terminal large drop returns exactly to K/D.
  let stateNumerator = K;
  let exponentSum = 0;
  for (let i = 0; i < r; ++i) {
    const a = i === r - 1 ? e : (i === r - 4 ? 2 : 1);
    exponentSum += a;
    const branchNumerator = 3n * stateNumerator
      + (pow2(a - 1) - 1n) * D;
    if (branchNumerator % pow2(a) !== 0n) {
      throw new Error(`family rational branch r=${r} i=${i}`);
    }
    stateNumerator = branchNumerator / pow2(a);
    if (i < r - 1 && stateNumerator <= K) {
      throw new Error(`family strict leastness r=${r} i=${i}`);
    }
  }
  if (exponentSum !== N || stateNumerator !== K) {
    throw new Error(`family closure r=${r}`);
  }
  ++familyLeastnessChecks;

  // The family lies below the failed Q < U^(271/10) gate and in the
  // high-rise range.  The tenth power clears the fractional exponent.
  if (!(K ** 10n < D ** 10n * BigInt(U) ** 271n)) {
    throw new Error(`family low-Q gate r=${r}`);
  }
  if (!(10n * BigInt(U) ** 2n > 23n * BigInt(r))) {
    throw new Error(`family high-rise r=${r}`);
  }
  ++familyLowGateChecks;
  ++familyHighRiseChecks;

  const row = {
    r, N, e, U,
    spike: r - 3,
    HStar,
    W: "11",
    reducedDenominatorBits: bitLength(q)
  };
  if (firstFamilyRow === null) firstFamilyRow = row;
  lastFamilyRow = row;
  ++familyRows;
}

// Exact leastness counterexample: W can be smaller than the least rational
// cycle coordinate, so order alone cannot turn W into a cycle state.
const orderWitness = (() => {
  const r = 41;
  const N = bitLength(pow3(r));
  const e = N - r;
  const U = e - 2;
  const D = pow2(N) - pow3(r);
  const K = pow2(N - 1) + 11n * pow2(r - 4);
  if (!(K > 11n * D) || gcd(K, D) !== 1n) {
    throw new Error("strict-least order witness");
  }
  return {
    r, N, e, U,
    K: K.toString(),
    D: D.toString(),
    floorQ: (K / D).toString(),
    W: "11"
  };
})();

const quotientOrbit = [11n];
while (quotientOrbit[quotientOrbit.length - 1] !== 1n) {
  if (quotientOrbit.length > 10) throw new Error("quotient orbit length");
  quotientOrbit.push(acceleratedOdd(quotientOrbit[quotientOrbit.length - 1]));
}
if (quotientOrbit.map(String).join(",") !== "11,17,13,5,1") {
  throw new Error("quotient orbit");
}

console.log(JSON.stringify({
  theorem: "one-drop last-positive odd quotient no-go",
  maxR,
  profiles: profiles.toString(),
  profilesWithPositiveCut: profilesWithPositiveCut.toString(),
  normalizedQuotientChecks: normalizedQuotientChecks.toString(),
  qOneConjugacyChecks: qOneConjugacyChecks.toString(),
  bottomConjugacyChecks: bottomConjugacyChecks.toString(),
  fixedPointSeparationChecks: fixedPointSeparationChecks.toString(),
  candidateSlopeChecks: candidateSlopeChecks.toString(),
  sharpCandidateQuotients: sharpCandidateQuotients.toString(),
  minimumCandidateQuotient: minimumCandidateQuotient === null
    ? null : minimumCandidateQuotient.toString(),
  minimumCandidateWitness,
  familyRange: [128, familyMaxR],
  familyRows: familyRows.toString(),
  familyLowGateChecks: familyLowGateChecks.toString(),
  familyHighRiseChecks: familyHighRiseChecks.toString(),
  familyNonintegralChecks: familyNonintegralChecks.toString(),
  familyLeastnessChecks: familyLeastnessChecks.toString(),
  firstFamilyRow,
  lastFamilyRow,
  orderWitness,
  quotientOrbit: quotientOrbit.map(String),
  status: "PASS"
}, null, 2));
