#!/usr/bin/env node
"use strict";

/*
Exact fixed-point/logarithm certificate for the 72,057,431,991 odd-step
barrier in ../cycle_exclusion.md.  No floating-point value is used in a
proof comparison.
*/

const DIGITS = 120n;
const SCALE = 10n ** DIGITS;
const TERMS = 700;
const MINIMUM = 1n << 71n;

function ceilDiv(a, b) {
  if (a < 0n || b <= 0n) throw new Error("bad ceilDiv input");
  return (a + b - 1n) / b;
}

/*
log((den+num)/(den-num)) = 2 sum_{j>=0} z^(2j+1)/(2j+1), z=num/den.
Return rigorous integer bounds lo/SCALE <= log <= hi/SCALE.
*/
function atanhLogInterval(num0, den0) {
  const num = BigInt(num0);
  const den = BigInt(den0);
  let numPow = num;
  let denPow = den;
  const numSq = num * num;
  const denSq = den * den;
  let lo = 0n;
  for (let j = 0; j <= TERMS; ++j) {
    lo += (2n * SCALE * numPow) / (BigInt(2 * j + 1) * denPow);
    numPow *= numSq;
    denPow *= denSq;
  }

  // Upper bound the omitted geometric tail after exponent 2*TERMS+1.
  const exponent = BigInt(2 * TERMS + 3);
  const tailNumerator =
    2n * SCALE * num ** exponent * denSq;
  const tailDenominator =
    exponent * den ** exponent * (denSq - numSq);
  const tailCeiling = ceilDiv(tailNumerator, tailDenominator);

  // There are TERMS+1 downward-rounded summands.
  const hi = lo + BigInt(TERMS + 1) + tailCeiling;
  return {lo, hi};
}

// ln 2: z=(2-1)/(2+1)=1/3.  ln 3: z=(3-1)/(3+1)=1/2.
const ln2 = atanhLogInterval(1, 3);
const ln3 = atanhLogInterval(1, 2);

// Consecutive convergents bracketing alpha=ln(3)/ln(2).
const upperP = 10439860591n;
const upperQ = 6586818670n;
const lowerP = 103768467013n;
const lowerQ = 65470613321n;

if (upperP * lowerQ - lowerP * upperQ !== 1n) {
  throw new Error("Farey-neighbor determinant is not one");
}

// Rigorous intervals for p ln2 - q ln3.
const upperGapLo = upperP * ln2.lo - upperQ * ln3.hi;
const upperGapHi = upperP * ln2.hi - upperQ * ln3.lo;
const lowerGapLo = lowerP * ln2.lo - lowerQ * ln3.hi;
const lowerGapHi = lowerP * ln2.hi - lowerQ * ln3.lo;

if (!(upperGapLo > 0n && lowerGapHi < 0n)) {
  throw new Error("the claimed convergents do not bracket log_2(3)");
}

/*
Verify
  upperP/upperQ - log_2(3) > 2/(3*2^71).
The left side is (upperP ln2-upperQ ln3)/(upperQ ln2).
*/
const upperGapExceedsCycleWindow =
  3n * MINIMUM * upperGapLo > 2n * upperQ * ln2.hi;
if (!upperGapExceedsCycleWindow) {
  throw new Error("upper convergent lies inside the cycle window");
}

const denominatorBarrier = upperQ + lowerQ;
const numeratorMediant = upperP + lowerP;

// The determinant-one mediant is the first reduced rational allowed by the
// Farey argument.  Certify that even the sharper length-100 mechanical carry
// bound from mechanical_carry_block.js does not exclude it.
const mediantGapLo = numeratorMediant * ln2.lo - denominatorBarrier * ln3.hi;
const mediantGapHi = numeratorMediant * ln2.hi - denominatorBarrier * ln3.lo;
if (!(mediantGapLo > 0n)) {
  throw new Error("the first Farey mediant is not above log_2(3)");
}

/*
For r >= q=denominatorBarrier, the length-100 block bound gives

  theta/r < (2/(3M))(729/1000 + 99/q).

Show rigorously that the mediant gap is smaller.  We upper-bound its
numerator by mediantGapHi and lower-bound ln(2) by ln2.lo.
*/
const mediantInsideRefinedWindow =
  1500n * MINIMUM * mediantGapHi <
  (729n * denominatorBarrier + 99000n) * ln2.lo;
if (!mediantInsideRefinedWindow) {
  throw new Error("the mediant should survive the refined carry window");
}

function scientificFromScaled(n) {
  let sign = "";
  if (n < 0n) { sign = "-"; n = -n; }
  const s = n.toString();
  const exponent = s.length - 1 - Number(DIGITS);
  return `${sign}${s[0]}.${s.slice(1, 19)}e${exponent}`;
}

console.log(`minimum=${MINIMUM}`);
console.log(`upper_convergent=${upperP}/${upperQ}`);
console.log(`lower_convergent=${lowerP}/${lowerQ}`);
console.log(`farey_determinant=${upperP * lowerQ - lowerP * upperQ}`);
console.log(`upper_log_gap_lower=${scientificFromScaled(upperGapLo)}`);
console.log(`lower_log_gap_upper=${scientificFromScaled(lowerGapHi)}`);
console.log(`cycle_window=2/(3*${MINIMUM})`);
console.log(`upper_gap_exceeds_cycle_window=${upperGapExceedsCycleWindow}`);
console.log(`first_farey_denominator=${denominatorBarrier}`);
console.log(`first_farey_numerator=${numeratorMediant}`);
console.log("mediant_log_gap_upper=" + scientificFromScaled(mediantGapHi));
console.log("mediant_inside_refined_carry_window=" + mediantInsideRefinedWindow);
console.log("continued_fraction_barrier_passed=true");
