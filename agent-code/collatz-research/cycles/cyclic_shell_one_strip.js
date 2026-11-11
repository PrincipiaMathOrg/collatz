#!/usr/bin/env node
"use strict";

/*
Exact certificate for the cyclic-shell mass bound used in
../cycle_exclusion.md.

All proof comparisons in this file use BigInt.  Decimal displays are
diagnostic only.  The certificate assumes that every odd member of a
hypothetical nontrivial accelerated cycle is at least 2^71.
*/

const K0 = 71;
const KMAX = 1000;
const KTAIL = KMAX + 1;
const SCALE = 10n ** 18n;
const MINIMUM = 1n << 71n;

function ceilDiv(a, b) {
  if (a < 0n || b <= 0n) throw new Error("ceilDiv expects a >= 0, b > 0");
  return (a + b - 1n) / b;
}

// Count integers n in [lo,hi) with n == 1 or 5 (mod 6).
function countOddNotDivisibleBy3(lo, hi) {
  if (hi <= lo) return 0n;
  let ans = 0n;
  for (const residue of [1n, 5n]) {
    const offset = ((residue - lo) % 6n + 6n) % 6n;
    const first = lo + offset;
    if (first < hi) ans += (hi - 1n - first) / 6n + 1n;
  }
  return ans;
}

/*
For p=3^o, count all z in [0,p) for which y=z+p can be a shortcut-cycle
state when every accelerated odd state is >= M.  Write y=2^t v uniquely;
then v is odd, 3 does not divide v, and v >= M.
*/
function endpointCapacity(p, M) {
  let ans = 0n;
  let twoPow = 1n;
  while (twoPow * M < 2n * p) {
    let lo = ceilDiv(p, twoPow);
    const hi = ceilDiv(2n * p, twoPow);
    if (lo < M) lo = M;
    ans += countOddNotDivisibleBy3(lo, hi);
    twoPow *= 2n;
  }
  return ans;
}

function oddPart(n) {
  while (n % 2n === 0n) n /= 2n;
  return n;
}

// Exhaustive off-by-one regression for the endpoint-capacity formula.
for (let smallM = 1n; smallM <= 25n; ++smallM) {
  let p = 1n;
  for (let o = 1; o <= 8; ++o) {
    p *= 3n;
    let brute = 0n;
    for (let z = 0n; z < p; ++z) {
      const v = oddPart(z + p);
      if (v >= smallM && v % 3n !== 0n) ++brute;
    }
    const formula = endpointCapacity(p, smallM);
    if (brute !== formula) {
      throw new Error(`endpoint capacity regression failed at M=${smallM}, o=${o}`);
    }
  }
}

function minBig(a, b) {
  return a < b ? a : b;
}

// Upward round num/den after multiplication by SCALE.
function scaledCeiling(num, den) {
  if (num < 0n || den <= 0n) throw new Error("bad rational");
  return ceilDiv(SCALE * num, den);
}

// Precompute 3^o and the exact endpoint capacities.
const pow3 = [1n];
const capacity = [0n];
for (let o = 1; o <= KMAX; ++o) {
  pow3.push(pow3[o - 1] * 3n);
  const cap = endpointCapacity(pow3[o], MINIMUM);
  // Crude bound used in the analytic tail: at most the nonzero residues mod 3.
  if (cap > 2n * 3n ** BigInt(o - 1)) {
    throw new Error(`endpoint capacity bound failed at o=${o}`);
  }
  capacity.push(cap);
}

let pascal = [];
let scaledPrefixUpper = 0n;
let maximumPackingNumerator = 0n;
let maximumPackingDenominator = 1n;
let firstN = null;
let lastN = null;

for (let k = 1; k <= KMAX; ++k) {
  // pascal[j] = binomial(k-1,j).
  if (k === 1) {
    pascal = [1n];
  } else {
    const next = Array(k).fill(0n);
    for (let j = 0; j < pascal.length; ++j) {
      next[j] += pascal[j];
      next[j + 1] += pascal[j];
    }
    pascal = next;
  }

  if (k < K0) continue;

  let Nk = 0n;
  for (let o = 1; o <= k; ++o) {
    // An odd shell point has a length-k parity word beginning in 1.
    const wordCount = pascal[o - 1];
    Nk += minBig(wordCount, capacity[o]);
  }

  if (k === K0) firstN = Nk;
  if (k === KMAX) lastN = Nk;

  const shellFloor = 1n << BigInt(k);
  const n = Nk === 0n ? 0n : Nk - 1n;

  // Needed for log(1+t) <= t-t^2/2+t^3/3 with t=3(N-1)/2^k.
  if (3n * n > shellFloor) {
    throw new Error(`packing Taylor range failed at k=${k}`);
  }

  if (3n * n * maximumPackingDenominator >
      maximumPackingNumerator * shellFloor) {
    maximumPackingNumerator = 3n * n;
    maximumPackingDenominator = shellFloor;
  }

  if (Nk > 0n) {
    /*
    The j-th smallest eligible odd nonmultiple of 3 is at least 2^k+3j.
    Hence

      sum_{j<N} 1/(3(2^k+3j))
      <= N/(3a) - (N-1)^2/(2a^2) + (N-1)^3/a^3,

    where a=2^k.  Put this over the common denominator 6a^3.
    */
    const a = shellFloor;
    const numerator =
      2n * Nk * a * a - 3n * n * n * a + 6n * n * n * n;
    const denominator = 6n * a * a * a;
    if (numerator <= 0n) throw new Error(`nonpositive shell bound at k=${k}`);
    scaledPrefixUpper += scaledCeiling(numerator, denominator);
  }
}

/*
For k>=1001, t=floor(61k/100).  We have

  t >= (609/1000)(k-1).

Chernoff plus
  3^61 < 2^97,
  1000^1000 < 2^970 609^609 391^391
gives N_k < 2*2^(97k/100).  Grouping in blocks of 100 gives the tail
  sum N_k/(3*2^k) < 1600/(21*2^30).
*/
// Indeed, floor(61k/100) >= (61k-99)/100, and
// 10(61k-99) >= 609(k-1) is equivalent to k>=381.
if (!(KTAIL >= 381 &&
      10n * (61n * BigInt(KTAIL) - 99n) >=
      609n * BigInt(KTAIL - 1))) {
  throw new Error("rounding-aware tail threshold failed");
}
if (!(3n ** 61n < 2n ** 97n)) throw new Error("3^61 < 2^97 failed");
if (!(1000n ** 1000n <
      2n ** 970n * 609n ** 609n * 391n ** 391n)) {
  throw new Error("entropy integer inequality failed");
}

const tailNumerator = 1600n;
const tailDenominator = 21n * (1n << 30n);

// Exact proof target: prefix + tail < 0.685 < 0.69 < log(2).
const targetNumerator = 685n;
const targetDenominator = 1000n;
const lhsNumerator =
  scaledPrefixUpper * tailDenominator + SCALE * tailNumerator;
const lhsDenominator = SCALE * tailDenominator;
const below0685 =
  lhsNumerator * targetDenominator < targetNumerator * lhsDenominator;
if (!below0685) throw new Error("certified mass is not below 0.685");

// 56/81 = 2(1/3 + (1/3)^3/3) < log 2, and 0.69 < 56/81.
if (!(69n * 81n < 56n * 100n)) throw new Error("0.69 < 56/81 failed");

console.log(`K0=${K0}`);
console.log(`KMAX=${KMAX}`);
console.log(`minimum=${MINIMUM}`);
console.log(`first_shell_bound=${firstN}`);
console.log(`last_shell_bound=${lastN}`);
console.log(`scaled_prefix_upper=${scaledPrefixUpper}`);
console.log(`scale=${SCALE}`);
console.log(`tail_upper=${tailNumerator}/${tailDenominator}`);
console.log(`maximum_taylor_t=${maximumPackingNumerator}/${maximumPackingDenominator}`);
console.log(`certified_total_lt_0_685=${below0685}`);
console.log("tail_entropy_threshold=609/1000");
console.log("ln2_gt_56_over_81_gt_0_69=true");
console.log("one_strip_certificate_passed=true");
