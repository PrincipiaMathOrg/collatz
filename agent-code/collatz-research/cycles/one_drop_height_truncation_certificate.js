#!/usr/bin/env node
"use strict";

// Exact audit for the height-truncated full-carry identities.  The
// unbounded argument in the companion note is analytic; this checker
// verifies its indexing and all rational identities on every one-drop
// profile through a requested depth.

function abs(a) { return a < 0n ? -a : a; }
function gcd(a, b) {
  a = abs(a);
  b = abs(b);
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

class Fraction {
  constructor(n, d = 1n) {
    if (d === 0n) throw new Error("zero denominator");
    if (d < 0n) { n = -n; d = -d; }
    const g = gcd(n, d);
    this.n = n / g;
    this.d = d / g;
  }
  add(other) {
    return new Fraction(this.n * other.d + other.n * this.d,
      this.d * other.d);
  }
  sub(other) {
    return new Fraction(this.n * other.d - other.n * this.d,
      this.d * other.d);
  }
  mul(other) {
    return new Fraction(this.n * other.n, this.d * other.d);
  }
  div(other) {
    return new Fraction(this.n * other.d, this.d * other.n);
  }
  eq(other) { return this.n === other.n && this.d === other.d; }
}

function pow2(k) { return 1n << BigInt(k); }
function pow3(k) { return 3n ** BigInt(k); }
function bitLength(n) { return n.toString(2).length; }
function assertIntegerDivision(n, d, label) {
  if (n % d !== 0n) throw new Error(`${label}: nonintegral quotient`);
}

if (!(pow3(100) < pow2(159))) throw new Error("alpha upper bound");
if (!(pow3(12) > pow2(19))) throw new Error("alpha lower bound");

// Exact rational checks used in Proposition 2 of the companion note.
const U0 = 408126n;
if (!(638n ** 2n < U0 && U0 < pow2(19))) {
  throw new Error("base-point bounds");
}
if (!(23n ** 3n * 4n ** 10n > 10n ** 3n * 5n ** 10n)) {
  throw new Error("fractional-power bound");
}
const firstNumerator = 459n * 15567n * 4n * 10n ** 13n;
const firstDenominator = 2n * 638n * 5n * 23n ** 13n;
if (!(1000n * firstNumerator < 89n * firstDenominator)) {
  throw new Error("critical residue constant");
}
if (!(459000n < pow2(19) && U0 - 514n > 19n)) {
  throw new Error("terminal residue constant");
}
const runNumerator = 15n * U0 - 18n * 516n ** 2n
  - 130n * 516n - 220n;
if (!(runNumerator === 1261982n && 56n * 1248n < U0)) {
  throw new Error("unit-run cutoff constant");
}

const maxR = Number(process.argv[2] || 20);
if (!Number.isInteger(maxR) || maxR < 3) throw new Error("bad maxR");

let profiles = 0n;
let cuts = 0n;
let nonzeroDefects = 0n;
let denominatorOneProfiles = 0n;
let denominatorOneCuts = 0n;
let prefixClearedChecks = 0n;
let positiveSuffixDefects = 0n;
let negativeSuffixDefects = 0n;
let suffixRecurrenceChecks = 0n;
let firstPositiveWitness = null;
let firstNegativeWitness = null;

for (let r = 3; r <= maxR; ++r) {
  const threeR = pow3(r);
  const N = bitLength(threeR);
  const e = N - r;
  const twoN = pow2(N);
  const D = twoN - threeR;
  const eligible = [];
  const B = [0];
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

    let J = 0n;
    let C = new Fraction(0n);
    for (let k0 = 0; k0 < V; ++k0) {
      const t = spikes[k0];
      const k = k0 + 1;
      J += pow3(r - 1 - t) * pow2(t + k - 2);
      C = C.add(new Fraction(pow2(t + k), pow3(t)));
    }
    const A = r - 1 + V;
    if (A !== N - U - 2) throw new Error("exponent balance");
    const K = pow2(N - 1) - pow2(A) + 3n * J;
    const Q = new Fraction(K, D);
    const R = new Fraction(twoN, threeR);
    const denominatorOne = Q.d === 1n;
    if (denominatorOne) ++denominatorOneProfiles;

    const lhs = new Fraction(4n).mul(Q).mul(R.sub(new Fraction(1n)));
    const rhs = R.mul(new Fraction(2n).sub(new Fraction(1n, pow2(U))))
      .add(C);
    if (!lhs.eq(rhs)) throw new Error(`bottom carry r=${r},mask=${mask}`);

    const spikeSet = new Set(spikes);
    const spikeRank = new Map();
    for (let k0 = 0; k0 < V; ++k0) spikeRank.set(spikes[k0], k0 + 1);
    const height = [0];
    let usedSpikes = 0;
    for (let t = 1; t < r; ++t) {
      if (spikeSet.has(t)) ++usedSpikes;
      height.push(B[t] - usedSpikes);
    }
    if (height[r - 1] !== U) throw new Error("terminal height");

    for (let H = 1; H <= U; ++H) {
      ++cuts;
      const firstAtH = height.findIndex(value => value === H);
      if (firstAtH < 0) throw new Error("missing height");
      let early = new Fraction(0n);
      let late = new Fraction(0n);
      let lateInteger = 0n;
      for (const t of spikes) {
        const k = spikeRank.get(t);
        const term = new Fraction(pow2(t + k), pow3(t));
        const preHeight = height[t - 1];
        if (preHeight < H) {
          if (t > firstAtH) throw new Error("early-time cutoff");
          early = early.add(term);
        } else {
          late = late.add(term);
          lateInteger += pow2(t + k) * pow3(r - t);
        }
      }
      if (!early.add(late).eq(C)) throw new Error("carry split");
      const prefixPower = pow3(firstAtH);
      const earlyScaled = early.mul(new Fraction(prefixPower));
      if (earlyScaled.d !== 1n) {
        throw new Error("short prefix denominator");
      }

      const Rhat = new Fraction(4n).mul(Q).add(early)
        .div(new Fraction(4n).mul(Q).sub(new Fraction(2n)));
      const defectLeft = new Fraction(4n).mul(Q).sub(new Fraction(2n))
        .mul(R.sub(Rhat));
      const defectRight = late.sub(R.mul(new Fraction(1n, pow2(U))));
      if (!defectLeft.eq(defectRight)) throw new Error("defect identity");
      if (R.eq(Rhat)) throw new Error("vanishing approximation");
      const E = lateInteger - pow2(N - U);
      if (E % 3n === 0n) {
        throw new Error("mod-three nonvanishing");
      }

      // Remove the prefix scale and rebuild the defect solely from the
      // suffix.  The final local site is never a spike.
      const spikesUsed = spikes.filter(t => t <= firstAtH).length;
      const suffixLength = r - firstAtH;
      const lateSpikes = spikes.filter(t => t > firstAtH)
        .map(t => t - firstAtH);
      const lateSpikeSet = new Set(lateSpikes);
      const prefixScale = pow2(firstAtH + spikesUsed);
      assertIntegerDivision(E, prefixScale, "suffix scale");
      let suffixDefect = -2n;
      let suffixSpikeCount = 0;
      for (let s = 1; s <= suffixLength; ++s) {
        if (lateSpikeSet.has(s)) {
          ++suffixSpikeCount;
          suffixDefect = 3n * suffixDefect
            + pow2(s + suffixSpikeCount - 1);
        } else {
          suffixDefect = 3n * suffixDefect
            + pow2(s + suffixSpikeCount);
        }
      }
      if (prefixScale * suffixDefect !== E) {
        throw new Error("suffix recurrence");
      }
      const predictedNegative = lateSpikes.length === 0
        || (lateSpikes.length === 1
          && lateSpikes[0] === suffixLength - 1);
      if ((E < 0n) !== predictedNegative) {
        throw new Error("suffix sign classification");
      }
      const suffixWitness = {
        r, N, U, H, T: firstAtH,
        spikes: spikes.join(","),
        lateSpikes: lateSpikes.join(","),
        E: E.toString()
      };
      if (E < 0n) {
        ++negativeSuffixDefects;
        if (firstNegativeWitness === null) firstNegativeWitness = suffixWitness;
      } else {
        ++positiveSuffixDefects;
        if (firstPositiveWitness === null) firstPositiveWitness = suffixWitness;
      }
      ++suffixRecurrenceChecks;
      const AH = earlyScaled.n;
      const integerCarry = pow2(N + 1)
        + AH * pow3(r - firstAtH) + E;
      if (integerCarry !== 4n * K) {
        throw new Error("integer carry");
      }
      const Prational = new Fraction(4n).mul(Q)
        .mul(new Fraction(prefixPower)).add(new Fraction(AH));
      const S = 2n * prefixPower + AH;
      const clearedLeft = new Fraction(D).mul(Prational)
        .sub(new Fraction(twoN * S));
      if (!clearedLeft.eq(new Fraction(prefixPower * E))) {
        throw new Error("prefix-cleared rational identity");
      }
      ++prefixClearedChecks;
      if (denominatorOne) {
        ++denominatorOneCuts;
        if (integerCarry !== 4n * Q.n * D) {
          throw new Error("denominator-one integer carry");
        }
        const P = 4n * Q.n * prefixPower + AH;
        if (D * P - twoN * S !== prefixPower * E) {
          throw new Error("prefix-cleared identity");
        }
      }
      ++nonzeroDefects;
    }
  }
}

console.log(JSON.stringify({
  theorem: "height-truncated full-carry identity",
  maxR,
  profiles: profiles.toString(),
  cuts: cuts.toString(),
  nonzeroDefects: nonzeroDefects.toString(),
  denominatorOneProfiles: denominatorOneProfiles.toString(),
  denominatorOneCuts: denominatorOneCuts.toString(),
  prefixClearedChecks: prefixClearedChecks.toString(),
  suffixRecurrenceChecks: suffixRecurrenceChecks.toString(),
  positiveSuffixDefects: positiveSuffixDefects.toString(),
  negativeSuffixDefects: negativeSuffixDefects.toString(),
  firstPositiveWitness,
  firstNegativeWitness,
  status: "PASS"
}, null, 2));
