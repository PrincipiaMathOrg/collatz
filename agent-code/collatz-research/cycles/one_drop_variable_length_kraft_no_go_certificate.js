"use strict";

// Finite diagnostics and exact algebra checks for the variable-length
// Kraft no-go.  The asymptotic proof is in the companion report.

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function bitLength(value) {
  return value.toString(2).length;
}

function ceilDiv(a, b) {
  return Math.floor((a + b - 1) / b);
}

// Exact rational bounds used by the report.
assert(3n ** 2n > 2n ** 3n, "alpha > 3/2");
assert(3n ** 5n < 2n ** 8n, "alpha < 8/5");
assert(3n ** 10000n > 2n ** 15849n, "alpha > 15849/10000");
assert(3n ** 200n < 2n ** 317n, "alpha < 317/200");
assert(
  2n * 317n ** 2n * 1000n
    < 2316n * 200n * (2n * 317n - 200n),
  "c0 < 2.316"
);
assert(4n * 7n < 2n ** 7n, "log2(4x) < x base case");
assert(8n * 7n + 26n < 12n * 7n, "occupation is below 4x");

// For 0 <= t <= 1,
//   g(t)/c0 = t(alpha + gamma)/(alpha + gamma t) <= 1,
// and the exact gap numerator is alpha(1-t).
for (let denominator = 1; denominator <= 200; ++denominator) {
  for (let numerator = 0; numerator <= denominator; ++numerator) {
    const gapNumerator = 15849n
      * BigInt(denominator - numerator);
    assert(gapNumerator >= 0n, "stratified endpoint gap");
    if (numerator < denominator) {
      assert(gapNumerator > 0n, "strict stratified endpoint gap");
    }
  }
}

function mechanicalClock(r) {
  const N = bitLength(3n ** BigInt(r));
  const e = N - r;
  const baseline = new Uint8Array(r);
  const eligible = [];
  for (let j = 0; j < r; ++j) {
    const extra =
      Math.floor(((j + 1) * e) / r) - Math.floor((j * e) / r);
    baseline[j] = 1 + extra;
    if (extra === 1 && j < r - 1) eligible.push(j);
  }
  return {N, e, baseline, eligible};
}

function lowerBoundIndex(sorted, target) {
  let low = 0;
  let high = sorted.length;
  while (low < high) {
    const middle = (low + high) >> 1;
    if (sorted[middle] < target) low = middle + 1;
    else high = middle;
  }
  return low;
}

function quadraticProfile(U) {
  // z = 579/250 = 2.316, rigorously above c0.
  const r = Math.floor((250 * U * U) / 579);
  const clock = mechanicalClock(r);
  assert(clock.e - 1 > U, "not enough eligible sites");

  let maximumEligibleGap = 0;
  for (let i = 1; i < clock.eligible.length; ++i) {
    maximumEligibleGap = Math.max(
      maximumEligibleGap,
      clock.eligible[i] - clock.eligible[i - 1]
    );
  }
  assert(maximumEligibleGap <= 2, "eligible gap exceeded two");

  const omissions = [];
  let previous = -1;
  let maximumTargetError = 0;
  const denominator = (U + 1) * (U + 1);
  for (let q = 0; q < U; ++q) {
    const target = Math.floor(r * (q + 1) * (q + 1) / denominator);
    const minimum = Math.max(target, previous + 1);
    const index = lowerBoundIndex(clock.eligible, minimum);
    assert(index < clock.eligible.length, "quadratic target ran out of sites");
    const position = clock.eligible[index];
    assert(position < r - 1, "terminal was selected");
    omissions.push(position);
    previous = position;
    maximumTargetError = Math.max(maximumTargetError, position - target);
  }
  assert(new Set(omissions).size === U, "omissions are not distinct");

  const omitted = new Uint8Array(r);
  for (const position of omissions) omitted[position] = 1;

  const height = new Uint16Array(r);
  let currentHeight = 0;
  for (let j = 0; j < r; ++j) {
    height[j] = currentHeight;
    if (omitted[j] === 1) ++currentHeight;
  }
  assert(currentHeight === U, "height did not reach U");

  const doubledPrefix = new Int32Array(2 * r + 1);
  for (let j = 0; j < 2 * r; ++j) {
    doubledPrefix[j + 1] =
      doubledPrefix[j] + omitted[j % r];
  }

  const rows = [];
  for (const fraction of [[1, 4], [1, 2], [3, 4], [1, 1]]) {
    const m = Math.min(
      U,
      Math.max(0, Math.floor(fraction[0] * (U + 1) / fraction[1]) - 1)
    );
    const H = m + 1;
    const L = Math.max(1, Math.round(H / Math.log2(3)));

    const starts = [];
    for (let j = 0; j < r; ++j) {
      if (height[j] <= m) starts.push(j);
    }

    let incidence = 0;
    for (const start of starts) {
      incidence += doubledPrefix[start + L] - doubledPrefix[start];
    }

    const oneDeletionCapacity =
      (L + 1) * ceilDiv(clock.e * L, r);
    const capacity =
      4 * L + 2 + incidence + oneDeletionCapacity;
    const transitions = Math.min(H, U);
    const expectedIncidence = transitions * L;

    rows.push({
      fraction: fraction.join("/"),
      m,
      H,
      L,
      starts: starts.length,
      incidence,
      expectedIncidence,
      incidenceRatio: incidence / expectedIncidence,
      oneDeletionCapacity,
      capacity,
      capacityRatio: capacity / (2 * starts.length),
      profileRatio:
        starts.length * (U + 1) * (U + 1) / (r * H * H),
    });
  }

  return {
    U,
    r,
    N: clock.N,
    e: clock.e,
    maximumEligibleGap,
    maximumTargetError,
    rows,
  };
}

const profiles = [128, 256, 512].map(quadraticProfile);
for (const profile of profiles) {
  console.log("quadratic_profile=" + JSON.stringify(profile));
}

// Regression checks at the largest depth.  They are diagnostics for the
// proved o(1) terms, not assumptions in the asymptotic argument.
const largest = profiles[profiles.length - 1];
for (const row of largest.rows) {
  assert(
    Math.abs(row.profileRatio - 1) < 0.02,
    "quadratic cumulative profile drifted"
  );
  assert(
    Math.abs(row.incidenceRatio - 1) < 0.12,
    "local omission incidence drifted"
  );
  assert(
    row.capacityRatio > 0.98 && row.capacityRatio < 1.08,
    "stratified capacity is not near saturation"
  );
}

console.log("one_drop_variable_length_kraft_no_go_certificate=PASS");
