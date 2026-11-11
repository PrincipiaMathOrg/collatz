"use strict";

// Independent exact-constant audit for
// cycle_one_drop_critical_polynomial_gate.md.
//
// This supplements the theorem's regression check by certifying the
// constants used before the final transition comparison. Every numerical
// assertion below is an integer or exact-rational comparison.

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function gcd(a, b) {
  if (a < 0n) a = -a;
  if (b < 0n) b = -b;
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

class Fraction {
  constructor(n, d = 1n) {
    assert(d !== 0n, "zero denominator");
    if (d < 0n) {
      n = -n;
      d = -d;
    }
    const g = gcd(n, d);
    this.n = n / g;
    this.d = d / g;
  }

  add(other) {
    return new Fraction(
      this.n * other.d + other.n * this.d,
      this.d * other.d
    );
  }

  sub(other) {
    return new Fraction(
      this.n * other.d - other.n * this.d,
      this.d * other.d
    );
  }

  mul(other) {
    return new Fraction(this.n * other.n, this.d * other.d);
  }

  div(other) {
    return new Fraction(this.n * other.d, this.d * other.n);
  }

  lt(other) {
    return this.n * other.d < other.n * this.d;
  }
}

function certifyExpUpper() {
  // Taylor through degree 50. From degree 51 onward, successive terms
  // have ratio at most x/52, so a geometric tail is a rigorous upper bound.
  const x = new Fraction(6125581n, 1000000n);
  let term = new Fraction(1n);
  let sum = new Fraction(1n);
  for (let k = 1n; k <= 50n; ++k) {
    term = term.mul(x).div(new Fraction(k));
    sum = sum.add(term);
  }
  const term51 = term.mul(x).div(new Fraction(51n));
  const ratio = x.div(new Fraction(52n));
  const upper = sum.add(term51.div(new Fraction(1n).sub(ratio)));
  assert(upper.lt(new Fraction(459n)), "exp(6.125581) < 459 failed");
}

const r0 = 72057431991n;

certifyExpUpper();

// Slope, logarithm, and state-envelope constants.
assert(3n ** 2n > 2n ** 3n, "log_2(3) > 3/2 failed");
assert(3n ** 12n > 2n ** 19n, "log_2(3) > 19/12 failed");
assert(r0 > 2n ** 36n, "log_2(r0) > 36 failed");
assert(r0 ** 10n < 2n ** 361n, "log_2(r0) < 361/10 failed");
assert(r0 < 268436n ** 2n, "sqrt(r0) < 268436 failed");

// P7 gives 4x < 1220 r^(143/10). The next comparison proves
// 1220 < r^(7/10), hence h=log_2(4x) < 15 log_2(r), at and above r0.
assert(1220n ** 10n < r0 ** 7n, "h < 15 log_2(r) failed at r0");

// From beta>3/2 and h<15X,
//   O < (8/3)(h+1)+6 < 40X+26/3,
// and therefore
//   x < (460/9)(120X+26) r^(133/10).
// Both sides are affine in X, and the positive margin increases with X,
// so it is enough to check X=36.
assert(
  460n * (120n * 36n + 26n) < 9n * 6200n * 36n,
  "6200 occupation constant failed"
);

// Gate Q >= U^(271/10): after eliminating Q and squaring,
// (U^2/r)^271 < (6200X)^20/r^5. At r0, X<361/10.
assert(
  223820n ** 20n * 200n ** 271n <
    313n ** 271n * r0 ** 5n,
  "U^2 < (313/200)r failed"
);
assert(313n * 200n < 251n ** 2n, "square-root weakening failed");

// This sign is needed when beta is replaced by its lower bound 19/12 in
// the refined-transition inequality. It follows from
// U<(251/200)sqrt(r) at the base point and then monotonically.
assert(
  200n * r0 > 753n * 268436n + 1000n,
  "r-3U-5 positivity check failed"
);

// Exact base-point form of the refined-transition remainder comparison.
// We use h<16X, U<(251/200)sqrt(r), sqrt(r0)<268436, and X<361/10.
// Multiplication by 12000 clears every denominator.
const remainderNumerator =
  12000n * 3n * 19n * 251n * 268436n / (12n * 200n) +
  12000n * 251n * 268436n / 200n +
  12000n * 5n * 19n / 12n +
  12000n * 2n * (251n * 268436n + 400n) * 2888n /
    (200n * 5n);
assert(
  remainderNumerator * 600n < 12000n * 11n * r0,
  "refined-transition base comparison failed"
);

// Sharp clean decimal: 27.0 is not enough for this uniform argument.
// Since X>36, its induced upper expression for (U^2/r)^135 is already
// larger than (19/12)^135 at r0. Thus 27.0 cannot even force the leading
// inequality needed by the transition theorem, whereas 27.1 passes above.
assert(
  (6200n * 36n) ** 10n * 12n ** 135n >
    19n ** 135n * r0 ** 2n,
  "27.0 diagnostic unexpectedly closed"
);

console.log("exp_upper_check=PASS");
console.log("state_envelope_log_check=PASS");
console.log("occupation_6200_check=PASS");
console.log("gate_271_over_10_check=PASS");
console.log("refined_transition_check=PASS");
console.log("one_decimal_sharpness_check=PASS");
console.log("critical_polynomial_gate_independent_audit=PASS");
