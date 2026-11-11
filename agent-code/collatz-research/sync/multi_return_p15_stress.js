"use strict";

// Finite P15 stress test for the multi-return lattice.  The suffix contains
// three occurrences of v=(2,1), separated by distinct return blocks:
//
//   2,1,3 | 2,1,4 | 2,1,2.
//
// The first two gap words differ, so the three equally spaced occurrences do
// not form a power of one common length-three block.  P15 embeds the complete
// suffix after ordinary cylinder stabilization in a strict-barrier prefix.

function v2(n) {
  let a = 0;
  while ((n & 1n) === 0n) {
    n >>= 1n;
    ++a;
  }
  return a;
}

function v3(n) {
  let a = 0;
  while (n % 3n === 0n) {
    n /= 3n;
    ++a;
  }
  return a;
}

function cylinder(word) {
  let n = 1n, y = 1n, A = 0, pow3 = 1n;
  for (const a of word) {
    const oldModulus = 1n << BigInt(A + 1);
    let found = false;
    for (let lift = 0n; lift < (1n << BigInt(a)); ++lift) {
      const candidateState = y + 2n * pow3 * lift;
      const numerator = 3n * candidateState + 1n;
      if (v2(numerator) !== a) continue;
      n += oldModulus * lift;
      y = numerator >> BigInt(a);
      A += a;
      pow3 *= 3n;
      found = true;
      break;
    }
    if (!found) throw new Error("cylinder lift not found");
  }
  return {rho: n, endpoint: y, A};
}

function affineData(word) {
  let exponent = 0;
  let carry = 0n;
  for (const a of word) {
    carry = 3n * carry + (1n << BigInt(exponent));
    exponent += a;
  }
  return {exponent, carry};
}

function discreteLog3(target, modulus, order) {
  let value = 1n;
  for (let r = 0; r < order; ++r) {
    if (value === target) return r;
    value = 3n * value % modulus;
  }
  throw new Error("target is not in <3>");
}

const suffix = [2, 1, 3, 2, 1, 4, 2, 1, 2];
const marker = [2, 1];
const markerPositions = [0, 3, 6];
const suffixCylinder = cylinder(suffix);
const B = suffixCylinder.A;
const modulus = 1n << BigInt(B + 2);
const target = (2n * suffixCylinder.rho + 1n) % modulus;
const order = 1 << B;
let r = discreteLog3(target, modulus, order);
if (r < 3) r += order;
if ((r & 1) === 0) throw new Error("P15 exponent class is not odd");

function suffixBarrierAt(rValue, prefixLength) {
  let prefixA = 0;
  for (let i = 0; i < prefixLength; ++i) prefixA += suffix[i];
  return (1n << BigInt(rValue + 1 + prefixA)) <
    3n ** BigInt(rValue + prefixLength);
}

while (!((1n << BigInt(r + 1)) < 3n ** BigInt(r)) ||
       suffix.some((_, i) => !suffixBarrierAt(r, i + 1))) {
  r += order;
}

const seed = (1n << BigInt(r)) - 1n;
let x = (3n ** BigInt(r) - 1n) / 2n;
const suffixStates = [x];
let prefixA = 0;
for (let i = 0; i < suffix.length; ++i) {
  const numerator = 3n * x + 1n;
  const actual = v2(numerator);
  if (actual !== suffix[i]) throw new Error(`valuation mismatch at ${i}`);
  x = numerator >> BigInt(actual);
  suffixStates.push(x);
  prefixA += actual;
  if (!suffixBarrierAt(r, i + 1)) throw new Error(`barrier failure at ${i}`);
}
if (v3(x + 1n) !== 0) throw new Error("terminal decoder is not zero");

const markerCylinder = cylinder(marker);
const startModulus = 1n << BigInt(markerCylinder.A + 1);
const endModulus = 2n * 3n ** BigInt(marker.length);
const lifts = markerPositions.map(position => {
  const start = suffixStates[position];
  const endpoint = suffixStates[position + marker.length];
  if ((start - markerCylinder.rho) % startModulus !== 0n)
    throw new Error("marker start lattice failure");
  const lift = (start - markerCylinder.rho) / startModulus;
  if (endpoint !== markerCylinder.endpoint + endModulus * lift)
    throw new Error("marker endpoint lattice failure");
  return {position, start, endpoint, lift};
});

const x0 = lifts[0].start, y0 = lifts[0].endpoint;
const determinant =
  (lifts[1].start - x0) * (lifts[2].endpoint - y0) -
  (lifts[2].start - x0) * (lifts[1].endpoint - y0);
if (determinant !== 0n) throw new Error("multi-return determinant failure");
if (suffix.slice(0, 3).join(",") === suffix.slice(3, 6).join(","))
  throw new Error("stress word accidentally forms a repeated gap block");

const gapRows = [];
for (let i = 0; i + 1 < lifts.length; ++i) {
  const gap = suffix.slice(lifts[i].position, lifts[i + 1].position);
  const {exponent, carry} = affineData(gap);
  const d = gap.length;
  const hNumerator =
    (3n ** BigInt(d) - (1n << BigInt(exponent))) * markerCylinder.rho + carry;
  if (hNumerator % startModulus !== 0n)
    throw new Error("gap inhomogeneity is not integral");
  const h = hNumerator / startModulus;
  const lhs =
    (1n << BigInt(exponent)) * lifts[i + 1].lift -
    3n ** BigInt(d) * lifts[i].lift;
  if (lhs !== h) throw new Error("gap lift recurrence failure");
  gapRows.push({gap, d, exponent, h});
}
const combinedLhs =
  (1n << BigInt(gapRows[0].exponent + gapRows[1].exponent)) * lifts[2].lift -
  3n ** BigInt(gapRows[0].d + gapRows[1].d) * lifts[0].lift;
const combinedRhs =
  (1n << BigInt(gapRows[0].exponent)) * gapRows[1].h +
  3n ** BigInt(gapRows[1].d) * gapRows[0].h;
if (combinedLhs !== combinedRhs)
  throw new Error("combined gap recurrence failure");

console.log(`suffix=${suffix.join(",")}`);
console.log(`suffix_total_exponent=${B} p15_r=${r} seed_bits=${r}`);
console.log(`marker=${marker.join(",")} marker_A=${markerCylinder.A}`);
console.log(
  `marker_rho=${markerCylinder.rho} marker_endpoint=${markerCylinder.endpoint}` +
  ` start_modulus=${startModulus} endpoint_modulus=${endModulus}`
);
const checkModulus = 1000000007n;
function bitLength(n) {
  if (n < 0n) n = -n;
  return n === 0n ? 0 : n.toString(2).length;
}
for (const row of lifts) {
  console.log(
    `occurrence=${row.position}` +
    ` lift_bits=${bitLength(row.lift)}` +
    ` lift_mod_1000000007=${row.lift % checkModulus}` +
    ` start_bits=${bitLength(row.start)}` +
    ` endpoint_bits=${bitLength(row.endpoint)}`
  );
}
for (let i = 1; i < lifts.length; ++i) {
  const difference = lifts[i].lift - lifts[i - 1].lift;
  console.log(
    `lift_difference_${i - 1}_${i}_bits=${bitLength(difference)}` +
    ` lift_difference_mod_1000000007=${difference % checkModulus}` +
    ` v2=${v2(difference)} v3=${v3(difference)}`
  );
}
for (let i = 0; i < gapRows.length; ++i) {
  const row = gapRows[i];
  console.log(
    `gap_${i}=${row.gap.join(",")} d=${row.d} E=${row.exponent}` +
    ` h=${row.h}`
  );
}
console.log(`determinant=${determinant}`);
console.log("gap_recurrences=true combined_recurrence=true");
console.log(`terminal_v3=${v3(x + 1n)}`);
console.log("distinct_gap_blocks=true");
console.log("certificate_passed=true");
