#!/usr/bin/env node
"use strict";

// Exact audit for the fixed-seed return-mass collapse theorem.  We enumerate
// ordinary accelerated Collatz orbits, select returned stabilized prefixes,
// and verify the full state transport, the transported ternary decoder
// profile, nested lift divisibility, and reciprocal-mass factorization.

function abs(n) { return n < 0n ? -n : n; }
function gcd(a, b) {
  a = abs(a);
  b = abs(b);
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}
function pow2(k) { return 1n << BigInt(k); }
function pow3(k) { return 3n ** BigInt(k); }
function valuation(n, p) {
  if (n === 0n) throw new Error("valuation of zero");
  let value = 0;
  while (n % p === 0n) {
    n /= p;
    ++value;
  }
  return value;
}
function fraction(n, d = 1n) {
  if (d <= 0n) throw new Error("bad denominator");
  const g = gcd(n, d);
  return { n: n / g, d: d / g };
}
function add(x, y) {
  return fraction(x.n * y.d + y.n * x.d, x.d * y.d);
}
function sub(x, y) {
  return fraction(x.n * y.d - y.n * x.d, x.d * y.d);
}
function mul(x, y) {
  return fraction(x.n * y.n, x.d * y.d);
}
function div(x, y) {
  if (y.n <= 0n) throw new Error("bad divisor");
  return fraction(x.n * y.d, x.d * y.n);
}
function leq(x, y) { return x.n * y.d <= y.n * x.d; }
function eq(x, y) { return x.n === y.n && x.d === y.d; }

const maxSeed = Number(process.argv[2] || 100000);
const maxSteps = Number(process.argv[3] || 150);
const maxLength = Number(process.argv[4] || 18);
if (!Number.isInteger(maxSeed) || maxSeed < 3
    || !Number.isInteger(maxSteps) || maxSteps < 2
    || !Number.isInteger(maxLength) || maxLength < 1) {
  throw new Error("bad arguments");
}

let seeds = 0n;
let returnedPrefixes = 0n;
let stateTransportChecks = 0n;
let decoderTransportChecks = 0n;
let cofactorTransportChecks = 0n;
let cofactorLadderChecks = 0n;
let reciprocalFactorChecks = 0n;
let blockMassChecks = 0n;
let blockProductChecks = 0n;
let stationaryChargeChecks = 0n;
let endpointChargeChecks = 0n;
let nestedLiftChecks = 0n;
let crossDepthBridgeChecks = 0n;
let allCutQuotientChecks = 0n;
let surplusLiftChecks = 0n;
let barrierGapBounds = 0n;
let allDepthFamilyChecks = 0n;
let selectedDepthFamilies = 0n;
let firstReturnWitness = null;
let firstNestedWitness = null;
let firstCrossDepthWitness = null;

for (let seedNumber = 3; seedNumber <= maxSeed; seedNumber += 2) {
  const n = BigInt(seedNumber);
  ++seeds;
  const states = [n];
  const exponents = [];
  const cumulative = [0];
  const seen = new Set([n.toString()]);

  for (let t = 0; t < maxSteps + maxLength; ++t) {
    const numerator = 3n * states[states.length - 1] + 1n;
    const a = valuation(numerator, 2n);
    const next = numerator / pow2(a);
    exponents.push(a);
    cumulative.push(cumulative[cumulative.length - 1] + a);
    states.push(next);
    const key = next.toString();
    if (seen.has(key)) break;
    seen.add(key);
  }

  const usableSteps = Math.min(maxSteps, exponents.length - maxLength);
  if (usableSteps < 1) continue;

  // A finite exact upper bound for h_t=x_t/q_t on the audited window.
  let K = fraction(states[0]);
  for (let t = 1; t <= usableSteps + maxLength; ++t) {
    const h = fraction(states[t] * pow2(cumulative[t]), pow3(t));
    if (!leq(h, K)) K = h;
  }

  // The normalized prime-to-three cofactor is a monotone rational
  // ladder.  Its reduced denominator is exactly the decoder deficit.
  for (let t = 0; t < usableSteps + maxLength; ++t) {
    const b = valuation(states[t] + 1n, 3n);
    const G = fraction((states[t] + 1n) * pow2(cumulative[t]),
      pow3(t));
    const expectedDenominator = b < t ? pow3(t - b) : 1n;
    if (G.d !== expectedDenominator) {
      throw new Error("cofactor ladder reduced denominator");
    }
    const Gnext = fraction((states[t + 1] + 1n)
      * pow2(cumulative[t + 1]), pow3(t + 1));
    const expectedIncrement = fraction(
      (pow2(exponents[t]) - 2n) * pow2(cumulative[t]),
      pow3(t + 1));
    if (!eq(sub(Gnext, G), expectedIncrement)
        || !leq(G, Gnext)) {
      throw new Error("cofactor ladder increment");
    }
    ++cofactorLadderChecks;
  }

  const returnsByStart = new Map();
  const selectedLengths = [];
  const selectedReturns = [];
  const lengthLimit = Math.min(maxLength, exponents.length);
  let strictBarrier = true;
  for (let L = 1; L <= lengthLimit; ++L) {
    const B = cumulative[L];
    strictBarrier = strictBarrier && pow2(B) < pow3(L);
    if (!strictBarrier || !(n < pow2(B + 1))) continue;

    let selectedAtLength = false;
    for (let d = 1; d <= usableSteps; ++d) {
      if (d + L > exponents.length) break;
      let same = true;
      for (let i = 0; i < L; ++i) {
        if (exponents[d + i] !== exponents[i]) {
          same = false;
          break;
        }
      }
      if (!same || states[d] <= n) continue;

      const M = pow2(B + 1);
      const startDifference = states[d] - n;
      if (startDifference % M !== 0n) {
        throw new Error("stabilized start lattice");
      }
      const u = startDifference / M;
      if (u < 1n) throw new Error("nonpositive return lift");
      ++returnedPrefixes;
      if (!selectedAtLength) {
        selectedLengths.push(L);
        selectedReturns.push({ L, d, B, u });
        selectedAtLength = true;
      }

      const record = { L, B, u };
      if (!returnsByStart.has(d)) returnsByStart.set(d, []);
      returnsByStart.get(d).push(record);

      for (let i = 0; i <= L; ++i) {
        const Ai = cumulative[i];
        const expectedDifference =
          pow2(B - Ai + 1) * pow3(i) * u;
        if (states[d + i] - states[i] !== expectedDifference) {
          throw new Error("full prefix state transport");
        }
        ++stateTransportChecks;

        const b0 = valuation(states[i] + 1n, 3n);
        const b1 = valuation(states[d + i] + 1n, 3n);
        if (Math.min(b0, i) !== Math.min(b1, i)) {
          throw new Error("truncated decoder transport");
        }
        ++decoderTransportChecks;
        if (b0 < i) {
          if (b1 !== b0) throw new Error("exact decoder transport");
          const c0 = (states[i] + 1n) / pow3(b0);
          const c1 = (states[d + i] + 1n) / pow3(b0);
          const expectedCofactorDifference =
            pow2(B - Ai + 1) * pow3(i - b0) * u;
          if (c1 - c0 !== expectedCofactorDifference) {
            throw new Error("cofactor transport");
          }
          ++cofactorTransportChecks;
        }

        // If the return begins after this cut, the complete intervening
        // return word recovers the same lift quotient as the transported
        // endpoint cofactor.
        if (d >= i) {
          const gapLength = d - i;
          const gapWeight = cumulative[d] - cumulative[i];
          const gapCarry = pow2(gapWeight) * states[d]
            - pow3(gapLength) * states[i];
          const gapNumerator = pow3(gapLength) * states[i]
            - pow2(gapWeight) * n + gapCarry;
          const gapDenominator = pow2(gapWeight + B + 1);
          if (gapNumerator % gapDenominator !== 0n
              || gapNumerator / gapDenominator !== u) {
            throw new Error("all-cut return-word quotient");
          }
          ++allCutQuotientChecks;
        }
      }

      // The returned block has exactly the same reciprocal-mass profile,
      // scaled by the reciprocal coefficient at its start.
      const rd = fraction(pow2(cumulative[d]), pow3(d));
      let canonicalBlockMass = fraction(0n);
      let returnedBlockMass = fraction(0n);
      for (let i = 0; i < L; ++i) {
        const ri = fraction(pow2(cumulative[i]), pow3(i));
        const rdi = fraction(pow2(cumulative[d + i]), pow3(d + i));
        if (!eq(rdi, mul(rd, ri))) {
          throw new Error("reciprocal factorization");
        }
        ++reciprocalFactorChecks;
        canonicalBlockMass = add(canonicalBlockMass, ri);
        returnedBlockMass = add(returnedBlockMass, rdi);
      }
      if (!eq(returnedBlockMass, mul(rd, canonicalBlockMass))) {
        throw new Error("block reciprocal mass");
      }
      ++blockMassChecks;

      // The whole multiplicative product over the returned block collapses
      // to one scalar denominator at its start:
      // h_{d+L}/h_d = 1 + R_L/(3 x_d).
      const endpointReciprocal =
        fraction(pow2(cumulative[d + L]), pow3(d + L));
      const hStart = mul(fraction(states[d]), rd);
      const hEnd = mul(fraction(states[d + L]), endpointReciprocal);
      if (!eq(sub(hEnd, hStart),
        fraction(returnedBlockMass.n, 3n * returnedBlockMass.d))) {
        throw new Error("block height increment");
      }
      const blockProduct = div(hEnd, hStart);
      const expectedProduct = add(fraction(1n),
        fraction(canonicalBlockMass.n,
          3n * states[d] * canonicalBlockMass.d));
      if (!eq(blockProduct, expectedProduct)) {
        throw new Error("block product collapse");
      }
      const liftOnlyProductBound = add(fraction(1n),
        fraction(canonicalBlockMass.n,
          3n * M * u * canonicalBlockMass.d));
      if (!leq(blockProduct, liftOnlyProductBound)) {
        throw new Error("block product lift bound");
      }
      ++blockProductChecks;

      // On the finite window K dominates the exact stationary heights.
      if (!leq(rd, fraction(K.n, K.d * M * u))) {
        throw new Error("stationary start charge");
      }
      ++stationaryChargeChecks;
      if (!leq(endpointReciprocal,
        fraction(K.n, K.d * 2n * u * pow3(L)))) {
        throw new Error("stationary endpoint charge");
      }
      ++endpointChargeChecks;

      if (firstReturnWitness === null) {
        firstReturnWitness = {
          seed: seedNumber,
          L,
          d,
          B,
          u: u.toString(),
          start: states[d].toString(),
          endpoint: states[d + L].toString()
        };
      }
    }
  }

  if (selectedLengths.length >= 2) ++selectedDepthFamilies;

  for (const [d, records] of returnsByStart.entries()) {
    records.sort((x, y) => x.L - y.L);
    for (let j = 0; j < records.length; ++j) {
      for (let k = j + 1; k < records.length; ++k) {
        const shorter = records[j];
        const longer = records[k];
        const expected =
          pow2(longer.B - shorter.B) * longer.u;
        if (shorter.u !== expected) {
          throw new Error("nested stabilized lift");
        }
        ++nestedLiftChecks;
        if (firstNestedWitness === null) {
          firstNestedWitness = {
            seed: seedNumber,
            d,
            shortLength: shorter.L,
            longLength: longer.L,
            shortLift: shorter.u.toString(),
            longLift: longer.u.toString()
          };
        }
      }
    }
  }

  // First returns at two increasing stabilized depths give a conjugate-gap
  // bridge.  The same gap inhomogeneity is integral after dyadic
  // normalization at the starts and ternary normalization at the endpoints.
  selectedReturns.sort((x, y) => x.L - y.L);
  for (let j = 0; j < selectedReturns.length; ++j) {
    for (let k = j + 1; k < selectedReturns.length; ++k) {
      const shorter = selectedReturns[j];
      const longer = selectedReturns[k];
      if (longer.d < shorter.d) {
        throw new Error("first-return monotonicity");
      }
      if (longer.d === shorter.d) continue;

      const delta = longer.d - shorter.d;
      const E = cumulative[longer.d] - cumulative[shorter.d];
      const shortModulus = pow2(shorter.B + 1);
      const promotedLift = pow2(longer.B - shorter.B) * longer.u;
      if (states[longer.d] - n !== shortModulus * promotedLift) {
        throw new Error("cross-depth promoted lift");
      }

      const gapCarry = pow2(E) * states[longer.d]
        - pow3(delta) * states[shorter.d];
      const startNumerator = (pow3(delta) - pow2(E)) * n + gapCarry;
      if (startNumerator % shortModulus !== 0n) {
        throw new Error("cross-depth start normalization");
      }
      const H = startNumerator / shortModulus;
      const expectedH = pow2(E) * promotedLift
        - pow3(delta) * shorter.u;
      if (H !== expectedH) throw new Error("cross-depth lift recurrence");

      const endpointGapCarry = pow2(E) * states[longer.d + shorter.L]
        - pow3(delta) * states[shorter.d + shorter.L];
      const endpointModulus = 2n * pow3(shorter.L);
      const endpointNumerator = (pow3(delta) - pow2(E))
        * states[shorter.L] + endpointGapCarry;
      if (endpointNumerator % endpointModulus !== 0n
          || endpointNumerator / endpointModulus !== H) {
        throw new Error("conjugate-gap endpoint normalization");
      }

      const dyadicTarget = H + pow3(delta) * shorter.u;
      if (valuation(dyadicTarget, 2n)
          !== E + longer.B - shorter.B + valuation(longer.u, 2n)) {
        throw new Error("cross-depth exact dyadic order");
      }
      const h3 = H === 0n ? delta : Math.min(valuation(H, 3n), delta);
      const u3 = Math.min(valuation(longer.u, 3n), delta);
      if (h3 !== u3) throw new Error("cross-depth truncated ternary order");

      // Exact surplus-lift conservation across the two return scales.
      const shortModulusRatio = fraction(n, shortModulus);
      const conservationLeft = add(fraction(promotedLift),
        shortModulusRatio);
      const gapCoefficient = fraction(pow3(delta), pow2(E));
      const hAtFirst = fraction(states[shorter.d]
        * pow2(cumulative[shorter.d]), pow3(shorter.d));
      const hAtSecond = fraction(states[longer.d]
        * pow2(cumulative[longer.d]), pow3(longer.d));
      const conservationRight = mul(mul(gapCoefficient,
        add(fraction(shorter.u), shortModulusRatio)),
        div(hAtSecond, hAtFirst));
      if (!eq(conservationLeft, conservationRight)) {
        throw new Error("cross-depth surplus-lift conservation");
      }
      ++surplusLiftChecks;

      // If the complete gap begins at a relative coefficient record, its
      // normalized carry mass is at most delta.  This gives the sharp
      // quantitative H bounds used in the conditional exclusion theorem.
      let relativeBarrier = true;
      for (let s = 1; s <= delta; ++s) {
        const relativeWeight = cumulative[shorter.d + s]
          - cumulative[shorter.d];
        if (pow2(relativeWeight) > pow3(s)) {
          relativeBarrier = false;
          break;
        }
      }
      if (relativeBarrier) {
        if (H <= 0n) throw new Error("barrier-gap positive H");
        const scaledUpperLeft = 3n * shortModulus * H;
        const scaledUpperRight = pow3(delta)
          * (3n * n + BigInt(delta));
        if (scaledUpperLeft > scaledUpperRight) {
          throw new Error("barrier-gap H envelope");
        }
        const exactDyadicFloor = pow2(E + longer.B - shorter.B
          + valuation(longer.u, 2n));
        if (exactDyadicFloor > dyadicTarget) {
          throw new Error("barrier-gap dyadic floor");
        }
        ++barrierGapBounds;
      }

      const b = valuation(states[shorter.L] + 1n, 3n);
      if (b < shorter.L) {
        const firstCofactor =
          (states[shorter.d + shorter.L] + 1n) / pow3(b);
        const secondCofactor =
          (states[longer.d + shorter.L] + 1n) / pow3(b);
        const expectedCofactorGap = 2n * pow3(shorter.L - b)
          * (promotedLift - shorter.u);
        if (secondCofactor - firstCofactor !== expectedCofactorGap) {
          throw new Error("cross-depth endpoint cofactor gap");
        }
      }
      ++crossDepthBridgeChecks;
      if (firstCrossDepthWitness === null) {
        firstCrossDepthWitness = {
          seed: seedNumber,
          shortLength: shorter.L,
          longLength: longer.L,
          firstStart: shorter.d,
          secondStart: longer.d,
          delta,
          gapWeight: E,
          shortLift: shorter.u.toString(),
          longLift: longer.u.toString(),
          promotedLift: promotedLift.toString(),
          H: H.toString(),
          startGapCarry: gapCarry.toString(),
          endpointGapCarry: endpointGapCarry.toString()
        };
      }
    }
  }

  // Any one-return-per-depth selection has geometrically summable charges.
  let dyadicCharge = fraction(0n);
  let coarseCharge = fraction(0n);
  let actualStartCharge = fraction(0n);
  let actualEndpointCharge = fraction(0n);
  for (const L of selectedLengths) {
    const B = cumulative[L];
    dyadicCharge = add(dyadicCharge, fraction(1n, pow2(B + 1)));
    coarseCharge = add(coarseCharge, fraction(1n, pow2(L + 1)));
  }
  if (!leq(dyadicCharge, coarseCharge)
      || !leq(coarseCharge, fraction(1n, 2n))) {
    throw new Error("geometric all-depth charge");
  }
  for (const record of selectedReturns) {
    actualStartCharge = add(actualStartCharge,
      fraction(pow2(cumulative[record.d]), pow3(record.d)));
    actualEndpointCharge = add(actualEndpointCharge,
      fraction(pow2(cumulative[record.d + record.L]),
        pow3(record.d + record.L)));
  }
  if (!leq(actualStartCharge, mul(K, coarseCharge))) {
    throw new Error("actual all-depth start charge");
  }
  if (!leq(actualEndpointCharge, mul(K, fraction(1n, 4n)))) {
    throw new Error("actual all-depth endpoint charge");
  }
  if (selectedReturns.length > 0) ++allDepthFamilyChecks;
}

console.log(JSON.stringify({
  theorem: "fixed-seed returned-prefix mass collapse",
  maxSeed,
  maxSteps,
  maxLength,
  seeds: seeds.toString(),
  returnedPrefixes: returnedPrefixes.toString(),
  stateTransportChecks: stateTransportChecks.toString(),
  decoderTransportChecks: decoderTransportChecks.toString(),
  cofactorTransportChecks: cofactorTransportChecks.toString(),
  cofactorLadderChecks: cofactorLadderChecks.toString(),
  reciprocalFactorChecks: reciprocalFactorChecks.toString(),
  blockMassChecks: blockMassChecks.toString(),
  blockProductChecks: blockProductChecks.toString(),
  stationaryChargeChecks: stationaryChargeChecks.toString(),
  endpointChargeChecks: endpointChargeChecks.toString(),
  nestedLiftChecks: nestedLiftChecks.toString(),
  crossDepthBridgeChecks: crossDepthBridgeChecks.toString(),
  allCutQuotientChecks: allCutQuotientChecks.toString(),
  surplusLiftChecks: surplusLiftChecks.toString(),
  barrierGapBounds: barrierGapBounds.toString(),
  allDepthFamilyChecks: allDepthFamilyChecks.toString(),
  selectedDepthFamilies: selectedDepthFamilies.toString(),
  firstReturnWitness,
  firstNestedWitness,
  firstCrossDepthWitness,
  status: "PASS"
}, null, 2));
