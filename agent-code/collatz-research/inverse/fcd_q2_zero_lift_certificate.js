"use strict";

function abs(x) {
  return x < 0n ? -x : x;
}

function gcd(a, b) {
  a = abs(a);
  b = abs(b);
  while (b !== 0n) {
    const r = a % b;
    a = b;
    b = r;
  }
  return a;
}

class Fraction {
  constructor(n, d = 1n) {
    if (d === 0n) throw new Error("zero denominator");
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

  decimal(digits) {
    const scale = 10n ** BigInt(digits);
    const q = this.n * scale / this.d;
    const raw = q.toString().padStart(digits + 1, "0");
    return raw.slice(0, -digits) + "." + raw.slice(-digits);
  }
}

function certifyExponentialConstant() {
  const x = new Fraction(6125581n, 1000000n);
  let term = new Fraction(1n);
  let sum = new Fraction(1n);

  for (let j = 1n; j <= 50n; j++) {
    term = term.mul(x).div(new Fraction(j));
    sum = sum.add(term);
  }

  const term51 = term.mul(x).div(new Fraction(51n));
  const ratio = x.div(new Fraction(52n));
  const tail = term51.div(new Fraction(1n).sub(ratio));
  const upper = sum.add(tail);

  if (!upper.lt(new Fraction(459n))) {
    throw new Error("failed to prove exp(6.125581) < 459");
  }

  return upper;
}

function ceilLog2BigInt(x) {
  if (x <= 1n) return 0;
  let k = 0;
  let p = 1n;
  while (p < x) {
    p <<= 1n;
    k++;
  }
  return k;
}

function mod(x, m) {
  x %= m;
  return x < 0n ? x + m : x;
}

function inverseMod(a, m) {
  let t = 0n;
  let nextT = 1n;
  let r = m;
  let nextR = mod(a, m);
  while (nextR !== 0n) {
    const q = r / nextR;
    [t, nextT] = [nextT, t - q * nextT];
    [r, nextR] = [nextR, r - q * nextR];
  }
  if (r !== 1n) throw new Error("modular inverse does not exist");
  return mod(t, m);
}

function rowMultipliers(limit) {
  const q = new Map();
  let power3 = 1n;
  let previousK = 0;

  for (let s = 1; s <= limit; s++) {
    power3 *= 3n;
    const k = ceilLog2BigInt(power3);
    q.set(s, 1 << (k - previousK));
    previousK = k;
  }
  return q;
}

function certifyIsolation(limit) {
  const q = rowMultipliers(limit);
  for (let s = 2; s <= limit; s++) {
    if (q.get(s) === 2 && q.get(s - 1) !== 4) {
      throw new Error(
        "q=2 isolation failed at finite sanity weight " + s
      );
    }
  }
  return q;
}

function certifyFiniteWrappedDeterminant(lo, hi) {
  let power3 = 1n;
  let power2 = 1n;
  let k = 0;
  let previousK = 0;
  let checked = 0;
  let closest = null;
  const exceptions = [];

  for (let s = 1; s <= hi; s++) {
    power3 *= 3n;
    while (power2 < power3) {
      power2 <<= 1n;
      k++;
    }

    const q = 1 << (k - previousK);
    if (s >= lo && q === 2) {
      const d = power2 - power3;
      const left = 3n * d * (1n << BigInt(s - 1));
      const right = BigInt(s) * power3;
      if (left <= right) {
        exceptions.push([s, d]);
        previousK = k;
        continue;
      }
      checked++;
      if (
        closest === null ||
        left * closest.right < closest.left * right
      ) {
        closest = { s: s, left: left, right: right };
      }
    }
    previousK = k;
  }

  return {
    checked: checked,
    closest: closest,
    exceptions: exceptions
  };
}

function certifySmallWrappedRows(s) {
  const p = 3n ** BigInt(s);
  const k = ceilLog2BigInt(p);
  const M = 1n << BigInt(k);
  const m = M >> 1n;
  const projectedP = p / 3n;
  const maximum = new Array(s);
  const positions = new Array(s);
  let power3 = 1n;
  let currentMaximum = 0;
  let words = 0;
  let wrappedZeroLifts = 0;
  let leastGap = null;

  for (let i = 0; i < s; i++) {
    while ((1n << BigInt(currentMaximum + 1)) <= power3) {
      currentMaximum++;
    }
    maximum[i] = currentMaximum;
    power3 *= 3n;
  }

  positions[0] = 0;

  function visit(rank, nextPosition) {
    if (rank === s) {
      words++;
      let carry = 0n;
      for (let i = 0; i < s; i++) {
        carry +=
          (1n << BigInt(positions[i])) *
          3n ** BigInt(s - 1 - i);
      }

      const n = mod(-carry * inverseMod(p, M), M);
      if (n >= m) return;

      const A = positions[s - 1];
      const u = 1n << BigInt(A);
      const projectedCarry = (carry - u) / 3n;
      const projectedSeed = mod(
        -projectedCarry * inverseMod(projectedP, m),
        m
      );
      const H = mod(u * inverseMod(p, m), m);
      if (H <= projectedSeed) return;

      wrappedZeroLifts++;
      const endpoint = (p * n + carry) / M;
      const gap = n - endpoint;
      if (gap <= 0n) {
        throw new Error(
          "small wrapped q=2 FCD failure at weight " + s
        );
      }
      if (leastGap === null || gap < leastGap) leastGap = gap;
      return;
    }

    let upper = maximum[rank];
    const positionsToLeave = s - rank - 1;
    upper = Math.min(upper, k - 1 - positionsToLeave);
    for (let position = nextPosition; position <= upper; position++) {
      positions[rank] = position;
      visit(rank + 1, position + 1);
    }
  }

  visit(1, 1);
  return {
    s: s,
    words: words,
    wrappedZeroLifts: wrappedZeroLifts,
    leastGap: leastGap
  };
}

function positionsOf(word) {
  const positions = [];
  for (let i = 0; i < word.length; i++) {
    if (word[i] === "1") positions.push(i);
  }
  return positions;
}

function carryOf(positions) {
  const s = positions.length;
  let carry = 0n;
  for (let i = 0; i < s; i++) {
    carry +=
      (1n << BigInt(positions[i])) *
      3n ** BigInt(s - 1 - i);
  }
  return carry;
}

function wordData(positions) {
  const s = positions.length;
  const P = 3n ** BigInt(s);
  const k = ceilLog2BigInt(P);
  const M = 1n << BigInt(k);
  const C = carryOf(positions);
  const rho = mod(-C * inverseMod(P, M), M);
  const Z = (P * rho + C) / M;
  return { s: s, k: k, P: P, M: M, C: C, rho: rho, Z: Z };
}

function rowData(positions) {
  const upper = wordData(positions);
  const lower = wordData(positions.slice(0, -1));
  const q = upper.M / lower.M;
  const A = positions[positions.length - 1];
  const u = 1n << BigInt(A);
  const H = mod(u * inverseMod(upper.P, lower.M), lower.M);
  const r0 = mod(lower.rho - H, lower.M);
  const lambda = (upper.rho - r0) / lower.M;
  return {
    upper: upper,
    lower: lower,
    q: q,
    lambda: lambda,
    wrapped: H > lower.rho
  };
}

function primitiveFirstCrossing(word) {
  let power2 = 1n;
  let power3 = 1n;
  for (let i = 0; i < word.length; i++) {
    if (power3 < power2) return false;
    power2 <<= 1n;
    if (word[i] === "1") power3 *= 3n;
  }
  return power3 < power2;
}

function certifySecondRowTypes() {
  const witnesses = [
    ["11111010110111011110100111011011111100111100010101000100",
      null, null],
    ["110110110101101101011010", 3n, true],
    ["110110110101101101101100", 3n, false],
    ["110110110101101110110010", 2n, false],
    ["110110110101101111000", 1n, true],
    ["110110110101111001111000", 1n, false],
    ["110110110101111011110000", 0n, true],
    ["110110110101111110010010", 2n, true],
    ["110110110111100111110000", 0n, false]
  ];

  // The first row is the separately audited q=4 regression and is skipped
  // here. The remaining eight rows realize every lower q=4 lift/wrap type
  // beneath a valid upper q=2 zero-lift no-wrap row.
  const types = [];
  for (let i = 1; i < witnesses.length; i++) {
    const word = witnesses[i][0];
    if (!primitiveFirstCrossing(word)) {
      throw new Error("second-row witness is not primitive");
    }
    const upperRow = rowData(positionsOf(word));
    const lowerRow = rowData(positionsOf(word).slice(0, -1));
    if (
      upperRow.q !== 2n ||
      upperRow.lambda !== 0n ||
      upperRow.wrapped ||
      upperRow.upper.rho <= upperRow.upper.Z ||
      lowerRow.q !== 4n ||
      lowerRow.lambda !== witnesses[i][1] ||
      lowerRow.wrapped !== witnesses[i][2]
    ) {
      throw new Error("second-row type witness mismatch");
    }
    types.push(
      "lambda" + lowerRow.lambda + ":" +
      (lowerRow.wrapped ? "wrap" : "nowrap")
    );
  }
  types.sort();
  return types;
}

function main() {
  const expUpper = certifyExponentialConstant();

  // The tenth powers remove the decimal exponent 14.3 exactly.
  const thresholdBaseLeft = 2n ** 1040n;
  const thresholdBaseRight = 153n ** 10n * 105n ** 143n;
  const propagationLeft = 106n ** 143n;
  const propagationRight = 2n ** 10n * 105n ** 143n;

  if (!(thresholdBaseLeft > thresholdBaseRight)) {
    throw new Error("weight-105 threshold base failed");
  }
  if (!(propagationLeft < propagationRight)) {
    throw new Error("weight-105 propagation inequality failed");
  }

  const q = certifyIsolation(1000);
  const finite = certifyFiniteWrappedDeterminant(2, 104);
  const exceptionText = finite.exceptions
    .map(function (item) { return item[0] + ":" + item[1]; })
    .join(",");
  if (exceptionText !== "3:5,5:13") {
    throw new Error("unexpected finite wrapped determinant exceptions");
  }
  const small3 = certifySmallWrappedRows(3);
  const small5 = certifySmallWrappedRows(5);
  const secondRowTypes = certifySecondRowTypes();
  if (
    small3.words !== 2 ||
    small3.wrappedZeroLifts !== 1 ||
    small3.leastGap !== 1n ||
    small5.words !== 7 ||
    small5.wrappedZeroLifts !== 4 ||
    small5.leastGap !== 1n
  ) {
    throw new Error("small wrapped-row regression mismatch");
  }

  console.log("exp_6.125581_upper=" + expUpper.decimal(18));
  console.log("exp_6.125581_below_459=true");
  console.log("polynomial_cutoff_base_weight=105");
  console.log("polynomial_cutoff_tenth_power_passed=true");
  console.log("finite_q2_successes_checked_2_to_104=" + finite.checked);
  console.log("finite_determinant_exceptions_s_and_D=" + exceptionText);
  console.log(
    "small_wrapped_rows=s3:" + small3.wrappedZeroLifts +
    ",s5:" + small5.wrappedZeroLifts + ",least_gap=1"
  );
  console.log("second_row_types=" + secondRowTypes.join(","));
  console.log("closest_finite_weight=" + finite.closest.s);
  console.log("closest_finite_left=" + finite.closest.left);
  console.log("closest_finite_right=" + finite.closest.right);
  console.log("wrapped_q2_failure_excluded_all_depth=true");
  console.log("q2_isolation_sanity_through_weight=1000");
  console.log("q2_zero_lift_certificate_passed=true");
}

main();
