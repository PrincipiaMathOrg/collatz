"use strict";

// Exact constant audit for cycle_one_drop_critical_polynomial_gate.md.
// Every comparison is an integer comparison.

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function fraction(numerator, denominator = 1n) {
  return { numerator, denominator };
}

function add(a, b) {
  return fraction(
    a.numerator * b.denominator + b.numerator * a.denominator,
    a.denominator * b.denominator
  );
}

function multiply(a, b) {
  return fraction(
    a.numerator * b.numerator,
    a.denominator * b.denominator
  );
}

function lessThan(a, b) {
  return a.numerator * b.denominator < b.numerator * a.denominator;
}

const r0 = 72057431991n;

// Mechanical slope and period-barrier bounds.
assert(3n ** 12n > 2n ** 19n, "log_2(3)>19/12 failed");
assert(r0 > 612n, "r0 must exceed 612");
assert(r0 ** 10n < 2n ** 361n, "period logarithm bound failed");
assert(r0 < 268436n ** 2n, "period square-root bound failed");

// If Q >= U^(271/10), then the refined quotient bound
// Q < 6200 log_2(r) r^(133/10) gives
//
// U^2/r < [(6200 log_2(r))^20/r^5]^(1/271).
//
// The expression in brackets decreases with r. At r0, use
// log_2(r0)<361/10, so 6200 log_2(r0)<223820. This proves
// U^2 < (313/200)r.
assert(
  223820n ** 20n * 200n ** 271n <
    313n ** 271n * r0 ** 5n,
  "critical exponent comparison failed"
);

// The convenient square-root consequence
// sqrt(313/200)<251/200.
assert(
  313n * 200n < 251n ** 2n,
  "square-root coefficient comparison failed"
);

// The factor r-3U-5 is positive before beta is replaced by 19/12.
// At the base point use U<(251/200)sqrt(r) and sqrt(r0)<268436.
assert(
  200n * r0 > 753n * 268436n + 1000n,
  "transition slope factor positivity failed"
);

// In the enhanced transition inequality use
// alpha>19/12, U<(251/200)sqrt(r), sqrt(r0)<268436, and
// log_2(612r^15)<16log_2(r)<2888/5 at r0.
const alphaLower = fraction(19n, 12n);
const uCoefficient = fraction(251n, 200n);
const sqrtUpper = fraction(268436n);
const logEnvelope = fraction(2888n, 5n);

const threeAlphaPlusOne = add(
  multiply(fraction(3n), alphaLower),
  fraction(1n)
);

let transitionRemainder = multiply(
  multiply(threeAlphaPlusOne, uCoefficient),
  sqrtUpper
);
transitionRemainder = add(
  transitionRemainder,
  multiply(fraction(5n), alphaLower)
);
transitionRemainder = add(
  transitionRemainder,
  multiply(
    fraction(2n),
    multiply(
      add(multiply(uCoefficient, sqrtUpper), fraction(2n)),
      logEnvelope
    )
  )
);

// 19/12-313/200=11/600.
assert(
  lessThan(transitionRemainder, fraction(11n * r0, 600n)),
  "enhanced transition remainder comparison failed"
);

console.log("mechanical_slope_check=PASS");
console.log("period_log_check=PASS");
console.log("period_sqrt_check=PASS");
console.log("critical_exponent_check=PASS");
console.log("transition_slope_factor_check=PASS");
console.log("enhanced_transition_remainder_check=PASS");
console.log("critical_polynomial_gate_certificate=PASS");
