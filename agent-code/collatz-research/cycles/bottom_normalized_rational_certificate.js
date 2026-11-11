"use strict";

// Exact certificate for the growing-V rational countermodels in
// cycle_one_drop_bottom_normalized_carry_gate.md.
//
// The script uses BigInt throughout.  It verifies the mechanical phase,
// the carry formula, exact bottom closure, strict leastness at every proper
// state, and failure of Q > 2^(U-1).  The trajectories are rational and are
// not claimed to satisfy the integer block-domain congruences.

function pow(base, exponent) {
  return base ** BigInt(exponent);
}

function ceilLog2Integer(n) {
  let k = 0;
  let p = 1n;
  while (p < n) {
    p <<= 1n;
    k += 1;
  }
  return k;
}

function ceilingLog2ThreePower(r) {
  const target = pow(3n, r);
  let n = r;
  let p = 1n << BigInt(n);
  while (p <= target) {
    p <<= 1n;
    n += 1;
  }
  return n;
}

function checkRow(r) {
  const N = ceilingLog2ThreePower(r);
  const e = N - r;
  const V = ceilLog2Integer(BigInt(r) * BigInt(r));
  const U = e - 1 - V;
  if (U < 2) return null;

  // delta_r >= 1/2 is equivalent to 3^(2r) <= 2^(2N-1).
  const separatedPhase = pow(3n, 2 * r) <= (1n << BigInt(2 * N - 1));
  if (!separatedPhase) return null;

  const oneSites = [];
  let previousFloor = 0;
  for (let i = 1; i < r; i += 1) {
    const currentFloor = Math.floor((e * i) / r);
    if (currentFloor - previousFloor === 1) oneSites.push(i);
    previousFloor = currentFloor;
  }
  if (oneSites.length !== e - 1) {
    throw new Error(`clock count mismatch at r=${r}`);
  }
  if (V > oneSites.length) return null;

  const selected = new Set(oneSites.slice(oneSites.length - V));
  const spikeTimes = [];
  let spikeNumber = 0;
  let J = 0n;
  for (let i = 1; i < r; i += 1) {
    if (!selected.has(i)) continue;
    const s = i - 1;
    spikeNumber += 1;
    spikeTimes.push(s);
    J += pow(3n, r - 2 - s) * (1n << BigInt(s + spikeNumber - 1));
  }
  if (spikeNumber !== V) {
    throw new Error(`spike count mismatch at r=${r}`);
  }

  const L = r - 1 + V;
  const modulusGap = (1n << BigInt(N)) - pow(3n, r);
  const carry = 3n * J + (1n << BigInt(N - 1)) - (1n << BigInt(L));
  if (carry <= 0n || modulusGap <= 0n) {
    throw new Error(`nonpositive rational fixed point at r=${r}`);
  }

  // Q = carry / modulusGap.  Keep the unreduced fraction so that every
  // subsequent identity remains visibly integral.
  const qNumerator = carry;
  const qDenominator = modulusGap;

  const targetFails =
    qNumerator < qDenominator * (1n << BigInt(U - 1));
  if (!targetFails) return null;
  const squareTargetFails =
    qNumerator * qNumerator <
    qDenominator * qDenominator * (1n << BigInt(U));
  if (!squareTargetFails) {
    throw new Error(`square target does not fail at r=${r}`);
  }

  let zNumerator = qNumerator;
  let zDenominator = qDenominator;
  for (let i = 1; i < r; i += 1) {
    if (selected.has(i)) {
      zNumerator = 3n * zNumerator + zDenominator;
      zDenominator *= 4n;
    } else {
      zNumerator *= 3n;
      zDenominator *= 2n;
    }
    if (zNumerator * qDenominator <= qNumerator * zDenominator) {
      throw new Error(`strict leastness fails at r=${r}, site=${i}`);
    }
  }

  const affineNumerator =
    pow(3n, r - 1) * qNumerator + J * qDenominator;
  const affineDenominator =
    (1n << BigInt(L)) * qDenominator;
  if (zNumerator * affineDenominator !== affineNumerator * zDenominator) {
    throw new Error(`affine carry identity fails at r=${r}`);
  }

  const bottomLeftNumerator = 3n * zNumerator - zDenominator;
  const bottomRightNumerator =
    (1n << BigInt(U + 1)) * (2n * qNumerator - qDenominator);
  if (
    bottomLeftNumerator * qDenominator !==
    bottomRightNumerator * zDenominator
  ) {
    throw new Error(`bottom closure fails at r=${r}`);
  }

  const firstSpike = spikeTimes[0];
  let reducedJ = J;
  let valuationTwo = 0;
  while ((reducedJ & 1n) === 0n) {
    reducedJ >>= 1n;
    valuationTwo += 1;
  }
  if (valuationTwo !== firstSpike) {
    throw new Error(`first-spike valuation fails at r=${r}`);
  }
  let reducedJThree = J;
  let valuationThree = 0;
  while (reducedJThree % 3n === 0n) {
    reducedJThree /= 3n;
    valuationThree += 1;
  }
  const lastSpike = spikeTimes[spikeTimes.length - 1];
  if (valuationThree !== r - 2 - lastSpike) {
    throw new Error(`last-spike valuation fails at r=${r}`);
  }

  return {
    r,
    N,
    e,
    U,
    V,
    firstSpike,
    lastSpike,
    carryDigits: qNumerator.toString().length,
    gapDigits: qDenominator.toString().length,
  };
}

const rows = [];
for (let r = 64; r <= 1024; r += 1) {
  const row = checkRow(r);
  if (row !== null) rows.push(row);
}

if (rows.length === 0) {
  throw new Error("no certified rational rows found");
}

const first = rows[0];
const last = rows[rows.length - 1];
console.log(`certified rows: ${rows.length}`);
console.log(`first: ${JSON.stringify(first)}`);
console.log(`last: ${JSON.stringify(last)}`);
console.log("all checks exact: phase, carry, bottom closure, strict leastness, linear and square target failure");
console.log("scope: rational affine countermodels only; integer block domains are not asserted");
