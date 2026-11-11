"use strict";

// Exact certificate for the q=4 FCD shell cutoff.
//
// For n=2^a, this computes
//
//   sum_{ell=a}^{1000}
//     min(H_ell(n), B_ell+ell)/(3*2^ell)
//
// exactly, then adds the proved universal tail
//
//   2000/(21*2^30) + 1002/(3*2^1000).
//
// It compares the result with the rigorous lower truncation
//
//   log(4/3) > 2 sum_{j=0}^{19} 1/((2j+1)7^(2j+1)).

const MAX_SHELL = 1000;
const LOG_TERMS = 20;

function minBig(a, b) {
  return a < b ? a : b;
}

function gcd(a, b) {
  while (b !== 0n) {
    const r = a % b;
    a = b;
    b = r;
  }
  return a;
}

function addRational(aNum, aDen, bNum, bDen) {
  const g = gcd(aDen, bDen);
  const left = bDen / g;
  const right = aDen / g;
  let num = aNum * left + bNum * right;
  let den = aDen * left;
  const h = gcd(num, den);
  num /= h;
  den /= h;
  return [num, den];
}

function decimal(num, den, digits) {
  const whole = num / den;
  let rem = num % den;
  let frac = "";
  for (let i = 0; i < digits; i++) {
    rem *= 10n;
    frac += String(rem / den);
    rem %= den;
  }
  return String(whole) + "." + frac;
}

const pow2 = [1n];
const pow3 = [1n];
for (let i = 1; i <= MAX_SHELL; i++) {
  pow2.push(pow2[i - 1] * 2n);
  pow3.push(pow3[i - 1] * 3n);
}

// Pascal rows and the exact universal shell quantities B_ell.
const rows = [[1n]];
const B = [1n];
for (let ell = 1; ell <= MAX_SHELL; ell++) {
  const prev = rows[ell - 1];
  const row = new Array(ell + 1).fill(0n);
  row[0] = 1n;
  row[ell] = 1n;
  for (let o = 1; o < ell; o++) {
    row[o] = prev[o - 1] + prev[o];
  }
  rows.push(row);

  let high = pow2[ell] - 1n;
  let low = 1n;
  let best = high + low;
  for (let t = 0; t <= ell; t++) {
    const candidate = high + low;
    if (candidate < best) {
      best = candidate;
    }
    if (t < ell) {
      high -= row[t + 1];
      low += pow3[t + 1];
    }
  }
  B.push(best);
}

function endpointCapacity(n, p) {
  const nPlusOne = n + 1n;
  const lower = p > nPlusOne ? p : nPlusOne;
  const upper = 2n * p;
  return upper > lower ? upper - lower : 0n;
}

function cyclicEndpointCapacity(n, p) {
  const lower = p > n ? p : n;
  const upper = 2n * p;
  return upper > lower ? upper - lower : 0n;
}

function H(ell, n) {
  const shellOddCount = pow2[ell - 1];
  const row = rows[ell - 1];
  let capacity = BigInt(ell);
  for (let o = 1; o <= ell; o++) {
    const localWords = row[o - 1];
    const endpoints = endpointCapacity(n, pow3[o]);
    capacity += minBig(localWords, endpoints);
    if (capacity >= shellOddCount) {
      return shellOddCount;
    }
  }
  return capacity;
}

function cyclicH(ell, n) {
  const shellOddCount = pow2[ell - 1];
  const row = rows[ell - 1];
  let capacity = 0n;
  for (let o = 1; o <= ell; o++) {
    const localWords = row[o - 1];
    const endpoints = cyclicEndpointCapacity(n, pow3[o]);
    capacity += minBig(localWords, endpoints);
    if (capacity >= shellOddCount) {
      return shellOddCount;
    }
  }
  return capacity;
}

// A strict upper bound for M(2^a), represented over 21*2^1000.
const upperCache = new Map();
function upperAtExponent(a) {
  if (upperCache.has(a)) {
    return upperCache.get(a);
  }
  const n = pow2[a];
  let finiteNumerator = 0n; // denominator 3*2^1000
  for (let ell = a; ell <= MAX_SHELL; ell++) {
    const tailored = H(ell, n);
    const universal = B[ell] + BigInt(ell);
    const count = minBig(tailored, universal);
    finiteNumerator += count * pow2[MAX_SHELL - ell];
  }

  // Tail:
  //   B-part < 2000/(21*2^30),
  //   ell-part = 1002/(3*2^1000).
  const denominator = 21n * pow2[MAX_SHELL];
  const numerator =
    7n * (finiteNumerator + 1002n) +
    2000n * pow2[MAX_SHELL - 30];
  const result = [numerator, denominator, finiteNumerator];
  upperCache.set(a, result);
  return result;
}

// The same certified upper bound for an arbitrary n between 2^108 and
// 2^109. A common denominator is 21*n*2^1000.
function upperAtStart(n) {
  const a = n.toString(2).length - 1;
  let numerator = 0n;
  const denominator = 21n * n * pow2[MAX_SHELL];
  for (let ell = a; ell <= MAX_SHELL; ell++) {
    const tailored = H(ell, n);
    const universal = B[ell] + BigInt(ell);
    const count = minBig(tailored, universal);
    const shellFloor = n > pow2[ell] ? n : pow2[ell];
    const multiplier =
      (7n * n * pow2[MAX_SHELL]) / shellFloor;
    numerator += count * multiplier;
  }
  numerator += 2000n * n * pow2[MAX_SHELL - 30];
  numerator += 7n * 1002n * n;
  return [numerator, denominator];
}

// Cyclic analogue: no terminal ell-position loss, so the tailored count is
// cyclicH and the universal count is B_ell. The analytic tail has no
// sum ell/(3*2^ell) term.
const cyclicUpperCache = new Map();
function cyclicUpperAtExponent(a) {
  if (cyclicUpperCache.has(a)) {
    return cyclicUpperCache.get(a);
  }
  const n = pow2[a];
  let finiteNumerator = 0n; // denominator 3*2^1000
  for (let ell = a; ell <= MAX_SHELL; ell++) {
    const tailored = cyclicH(ell, n);
    const count = minBig(tailored, B[ell]);
    finiteNumerator += count * pow2[MAX_SHELL - ell];
  }

  const denominator = 21n * pow2[MAX_SHELL];
  const numerator =
    7n * finiteNumerator + 2000n * pow2[MAX_SHELL - 30];
  const result = [numerator, denominator, finiteNumerator];
  cyclicUpperCache.set(a, result);
  return result;
}

// Lower bound for log(4/3) from the positive atanh series at z=1/7.
let logNum = 0n;
let logDen = 1n;
for (let j = 0; j < LOG_TERMS; j++) {
  const termNum = 2n;
  const termDen = BigInt(2 * j + 1) * 7n ** BigInt(2 * j + 1);
  [logNum, logDen] = addRational(logNum, logDen, termNum, termDen);
}

// The omitted positive tail is less than
//
//   2*7^(-(2K+1))/((2K+1)*(1-1/49)).
//
// This gives a rational upper bound when a sharpness comparison is needed.
const logTailNum = 98n;
const logTailDen =
  BigInt(2 * LOG_TERMS + 1) *
  48n *
  7n ** BigInt(2 * LOG_TERMS + 1);
const logUpper = addRational(logNum, logDen, logTailNum, logTailDen);
const logUpperNum = logUpper[0];
const logUpperDen = logUpper[1];

function isCertified(a) {
  const upper = upperAtExponent(a);
  return upper[0] * logDen < logNum * upper[1];
}

function isCyclicCertified(a) {
  const upper = cyclicUpperAtExponent(a);
  return upper[0] * logDen < logNum * upper[1];
}

let low = 1;
let high = MAX_SHELL;
if (!isCertified(high)) {
  throw new Error("The cutoff exceeds the certified finite-shell range.");
}
while (low < high) {
  const mid = Math.floor((low + high) / 2);
  if (isCertified(mid)) {
    high = mid;
  } else {
    low = mid + 1;
  }
}

const first = low;
const firstUpper = upperAtExponent(first);
const previousUpper = upperAtExponent(first - 1);
const firstNum = firstUpper[0];
const firstDen = firstUpper[1];
const previousNum = previousUpper[0];
const previousDen = previousUpper[1];
const previousFiniteNum = previousUpper[2];
const finiteDen = 3n * pow2[MAX_SHELL];

if (!(previousNum * logDen >= logNum * previousDen)) {
  throw new Error("The reported exponent is not the first certified one.");
}
if (!(previousFiniteNum * logUpperDen > logUpperNum * finiteDen)) {
  throw new Error("The previous dyadic shell was not proved sharp.");
}

// Find the least ordinary start certified by this particular finite
// computation and analytic tail. This is a safe cutoff, not the exact
// crossing point of the infinite envelope.
let startLow = pow2[108];
let startHigh = pow2[109];
while (startLow < startHigh) {
  const mid = (startLow + startHigh) / 2n;
  const upper = upperAtStart(mid);
  if (upper[0] * logDen < logNum * upper[1]) {
    startHigh = mid;
  } else {
    startLow = mid + 1n;
  }
}
const firstCertifiedStart = startLow;
const firstStartUpper = upperAtStart(firstCertifiedStart);
const previousStartUpper = upperAtStart(firstCertifiedStart - 1n);
if (
  !(
    firstStartUpper[0] * logDen <
      logNum * firstStartUpper[1] &&
    previousStartUpper[0] * logDen >=
      logNum * previousStartUpper[1]
  )
) {
  throw new Error("The ordinary-start cutoff comparison failed.");
}

let cyclicLow = 1;
let cyclicHigh = MAX_SHELL;
if (!isCyclicCertified(cyclicHigh)) {
  throw new Error("The cyclic cutoff exceeds the certified shell range.");
}
while (cyclicLow < cyclicHigh) {
  const mid = Math.floor((cyclicLow + cyclicHigh) / 2);
  if (isCyclicCertified(mid)) {
    cyclicHigh = mid;
  } else {
    cyclicLow = mid + 1;
  }
}

const firstCyclic = cyclicLow;
const firstCyclicUpper = cyclicUpperAtExponent(firstCyclic);
const previousCyclicUpper = cyclicUpperAtExponent(firstCyclic - 1);
const barinaCyclicUpper = cyclicUpperAtExponent(71);
const barinaCyclicFiniteNum = barinaCyclicUpper[2];

if (
  !(
    barinaCyclicFiniteNum * logUpperDen >
    logUpperNum * finiteDen
  )
) {
  throw new Error("The cyclic 2^71 no-go comparison was not proved.");
}

console.log("max_exact_shell=" + MAX_SHELL);
console.log("log_lower_terms=" + LOG_TERMS);
console.log("log_4_over_3_lower=" + decimal(logNum, logDen, 24));
console.log(
  "log_4_over_3_upper=" + decimal(logUpperNum, logUpperDen, 24)
);
console.log("first_certified_dyadic_exponent=" + first);
console.log("N0=2^" + first);
console.log(
  "upper_at_2^" + first + "=" + decimal(firstNum, firstDen, 24)
);
console.log(
  "upper_at_2^" +
    (first - 1) +
    "=" +
    decimal(previousNum, previousDen, 24)
);
console.log(
  "certified_at_2^" +
    first +
    "=" +
    (firstNum * logDen < logNum * firstDen)
);
console.log(
  "same_upper_test_fails_at_2^" +
    (first - 1) +
    "=" +
    (previousNum * logDen >= logNum * previousDen)
);
console.log(
  "partial_mass_at_2^" +
    (first - 1) +
    "_exceeds_log_upper=" +
    (previousFiniteNum * logUpperDen > logUpperNum * finiteDen)
);
console.log("first_certified_start=" + firstCertifiedStart);
console.log(
  "first_certified_start_over_2^108=" +
    decimal(firstCertifiedStart, pow2[108], 24)
);
console.log(
  "ordinary_start_cutoff_passed=" +
    (firstStartUpper[0] * logDen < logNum * firstStartUpper[1])
);
console.log("first_cyclic_dyadic_exponent=" + firstCyclic);
console.log(
  "cyclic_upper_at_2^" +
    firstCyclic +
    "=" +
    decimal(firstCyclicUpper[0], firstCyclicUpper[1], 24)
);
console.log(
  "cyclic_upper_at_2^" +
    (firstCyclic - 1) +
    "=" +
    decimal(previousCyclicUpper[0], previousCyclicUpper[1], 24)
);
console.log(
  "cyclic_upper_at_2^71=" +
    decimal(barinaCyclicUpper[0], barinaCyclicUpper[1], 24)
);
console.log(
  "cyclic_exclusion_from_2^71=" +
    (barinaCyclicUpper[0] * logDen < logNum * barinaCyclicUpper[1])
);
console.log(
  "cyclic_partial_at_2^71_exceeds_log_upper=" +
    (barinaCyclicFiniteNum * logUpperDen > logUpperNum * finiteDen)
);
console.log("q4_shell_certificate_passed=true");
