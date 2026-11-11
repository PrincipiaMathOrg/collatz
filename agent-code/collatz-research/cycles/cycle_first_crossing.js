#!/usr/bin/env node
"use strict";

// Exact audit for the cycle-specific first-crossing/complement split.
// This is a falsification harness.  It does not certify any infinite range.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function gcd(a, b) {
  if (a < 0n) a = -a;
  if (b < 0n) b = -b;
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

function mod(a, m) {
  const r = a % m;
  return r < 0n ? r + m : r;
}

function egcd(a, b) {
  let r0 = a, r1 = b, x0 = 1n, x1 = 0n;
  while (r1 !== 0n) {
    const q = r0 / r1;
    [r0, r1] = [r1, r0 - q * r1];
    [x0, x1] = [x1, x0 - q * x1];
  }
  return [r0, x0];
}

function inverse(a, m) {
  const [g, x] = egcd(mod(a, m), m);
  assert(g === 1n, "inverse must exist");
  return mod(x, m);
}

function ceilLog2Pow3(r) {
  const P = 3n ** BigInt(r);
  let M = 1n, A = 0;
  while (M < P) {
    M *= 2n;
    ++A;
  }
  return {A, M, P};
}

function isPrimitive(word) {
  const r = word.length;
  for (let d = 1; 2 * d <= r; ++d) {
    if (r % d !== 0) continue;
    let same = true;
    for (let i = d; i < r; ++i) {
      if (word[i] !== word[i % d]) {
        same = false;
        break;
      }
    }
    if (same) return false;
  }
  return true;
}

function prefixExponents(word) {
  const out = [0];
  for (const a of word) out.push(out[out.length - 1] + a);
  return out;
}

function isStrictRecord(word) {
  const r = word.length;
  const exponents = prefixExponents(word);
  const A = exponents[r];
  for (let i = 0; i < r; ++i) {
    if ((1n << BigInt(A - exponents[i])) <= 3n ** BigInt(r - i)) {
      return false;
    }
  }
  return true;
}

function expand(word) {
  let bits = "";
  for (const a of word) bits += "1" + "0".repeat(a - 1);
  return bits;
}

function affineBits(bits) {
  let M = 1n, P = 1n, C = 0n, weight = 0;
  for (const bit of bits) {
    if (bit === "1") {
      C = 3n * C + M;
      P *= 3n;
      ++weight;
    }
    M *= 2n;
  }
  return {M, P, C, D: M - P, weight, length: bits.length};
}

function firstCrossing(bits) {
  let M = 1n, P = 1n, weight = 0;
  for (let k = 1; k <= bits.length; ++k) {
    if (bits[k - 1] === "1") {
      P *= 3n;
      ++weight;
    }
    M *= 2n;
    if (M > P) return {k, weight};
  }
  throw new Error("one-strip word has no crossing");
}

function rationalOrbit(word, numerator, denominator) {
  let x = numerator, least = numerator;
  for (const a of word) {
    let y = 3n * x + denominator, actual = 0;
    while ((y & 1n) === 0n) {
      y /= 2n;
      ++actual;
    }
    assert(actual === a, "exact rational valuation");
    x = y;
    if (x < least) least = x;
  }
  assert(x === numerator, "rational orbit closes");
  return {least, startsLeast: least === numerator};
}

function analyze(word) {
  const bits = expand(word);
  const whole = affineBits(bits);
  assert(whole.D > 0n, "whole determinant");
  const g = gcd(whole.C, whole.D);
  const denominator = whole.D / g;
  const numerator = whole.C / g;
  const orbit = rationalOrbit(word, numerator, denominator);
  const crossing = firstCrossing(bits);
  const uBits = bits.slice(0, crossing.k);
  const vBits = bits.slice(crossing.k);
  const u = affineBits(uBits);
  const v = affineBits(vBits);
  assert(u.D > 0n, "first block determinant");

  // Cramer's rule for the two block equations.  These are rational until
  // the whole denominator is one.
  const tNumerator = v.D * u.C - u.D * v.C;
  assert(tNumerator * denominator % whole.D === 0n,
    "displacement denominator consistency");
  const tReducedNumerator = tNumerator / g;
  assert(tReducedNumerator * whole.D === tNumerator * denominator,
    "displacement reduction");

  const proper = vBits.length > 0;
  let prefixResidue = u.D === 1n ? 0n :
    mod(u.C * inverse(u.M, u.D), u.D);
  let complementResidue = null;
  if (proper) {
    assert(v.D > 0n, "complement determinant must be positive");
    assert(u.M * v.M === whole.M && u.P * v.P === whole.P,
      "coefficient factorization");
    assert(u.C * v.P + u.M * v.C === whole.C,
      "carry composition");
    assert(u.length === ceilLog2Pow3(u.weight).A,
      "first block is one-strip");
    assert(v.length === ceilLog2Pow3(v.weight).A,
      "complement is one-strip");
    if (v.D === 1n) {
      complementResidue = 0n;
    } else {
      complementResidue = mod(-v.C * inverse(v.P, v.D), v.D);
    }
  }

  const tInteger = tReducedNumerator % denominator === 0n;
  const t = tInteger ? tReducedNumerator / denominator : null;
  if (denominator === 1n) {
    assert(tInteger, "integer cycle has integer displacement");
    assert(u.C === u.D * numerator + u.M * t, "first block equation");
    if (proper) {
      assert(v.C === v.D * numerator - v.P * t,
        "complement block equation");
      assert(mod(t, v.D) === complementResidue,
        "complement residue equation");
    }
  }

  return {
    word: word.join("."),
    primitive: isPrimitive(word),
    startsLeast: orbit.startsLeast,
    denominator,
    numerator,
    bits,
    crossingK: crossing.k,
    crossingWeight: crossing.weight,
    proper,
    complementWeight: v.weight,
    Du: u.D,
    Dv: v.D,
    tReducedNumerator,
    tDenominator: denominator,
    tInteger,
    t,
    complementResidue,
    prefixResidue,
    uC: u.C,
    uM: u.M,
  };
}

function enumerate(maxR) {
  const totals = {
    words: 0,
    primitive: 0,
    startsLeast: 0,
    proper: 0,
    leastProper: 0,
    leastProperIntegerT: 0,
    primitiveLeastProperIntegerT: 0,
    leastProperPositiveIntegerT: 0,
    leastProperSmallNonnegativeIntegerT: 0,
    leastProperComplementCompatible: 0,
    primitiveLeastProperComplementCompatible: 0,
    q1: 0,
  };
  const byR = [];
  const examples = [];

  for (let r = 3; r <= maxR; ++r) {
    const A = ceilLog2Pow3(r).A;
    const row = {r, words: 0, primitive: 0, startsLeast: 0, proper: 0,
      leastProper: 0, leastProperIntegerT: 0,
      leastProperSmallNonnegativeIntegerT: 0, q1: 0};
    row.primitiveLeastProperIntegerT = 0;
    row.leastProperPositiveIntegerT = 0;
    row.leastProperComplementCompatible = 0;
    row.primitiveLeastProperComplementCompatible = 0;
    const word = [1];

    function visit(index, used) {
      if (index === r - 1) {
        const last = A - used;
        if (last < 1) return;
        word.push(last);
        if (isStrictRecord(word)) {
          const x = analyze(word);
          ++row.words;
          if (x.primitive) ++row.primitive;
          if (x.startsLeast) ++row.startsLeast;
          if (x.proper) ++row.proper;
          if (x.startsLeast && x.proper) {
            ++row.leastProper;
            if (x.tInteger) {
              ++row.leastProperIntegerT;
              if (x.primitive) ++row.primitiveLeastProperIntegerT;
              if (x.t > 0n) ++row.leastProperPositiveIntegerT;
            }
            if (x.tInteger && x.t >= 0n && 3n * x.t < BigInt(x.crossingWeight)) {
              ++row.leastProperSmallNonnegativeIntegerT;
              if (examples.length < 20) examples.push(x);
            }
            if (x.prefixResidue >= 1n &&
                3n * x.prefixResidue < BigInt(x.crossingWeight) &&
                x.uC > x.uM * x.prefixResidue &&
                mod(x.prefixResidue, x.Dv) === x.complementResidue) {
              ++row.leastProperComplementCompatible;
              if (x.primitive) ++row.primitiveLeastProperComplementCompatible;
              if (examples.length < 20) examples.push(x);
            }
          }
          if (x.denominator === 1n) ++row.q1;
        }
        word.pop();
        return;
      }

      const after = r - index - 1;
      const largest = A - used - after;
      for (let a = 1; a <= largest; ++a) {
        const next = used + a;
        if ((1n << BigInt(A - next)) <= 3n ** BigInt(r - index - 1)) {
          continue;
        }
        word.push(a);
        visit(index + 1, next);
        word.pop();
      }
    }

    visit(1, 1);
    for (const key of Object.keys(totals)) totals[key] += row[key];
    byR.push(row);
  }
  return {maxR, totals, byR, examples};
}

function jsonValue(_key, value) {
  return typeof value === "bigint" ? value.toString() : value;
}

const q5Word = [1,1,1,1,1,2,1,1,2,1,2,3,2,1,1,1,5];
const q5 = analyze(q5Word);
assert(q5.denominator === 5n && q5.numerator === 187n && q5.startsLeast,
  "q=5 regression");
assert(!q5.proper && q5.crossingK === q5.bits.length,
  "q=5 first crossing is the full word");

function complementBound(maxWeight) {
  let best = null;
  const ratios = [];
  for (let h = 1; h <= maxWeight; ++h) {
    const {M, P} = ceilLog2Pow3(h);
    const D = M - P;
    ratios.push({h, D, P});
    if (best === null || D * best.P < best.D * P) best = {h, D, P};
  }
  const leastOddAboveVerifiedBound = (1n << 71n) + 1n;
  const numerator = best.D * (3n * leastOddAboveVerifiedBound - BigInt(maxWeight));
  return {
    statement: "if complement weight h<=H, then r>(D_h/3^h)(3n-h)",
    H: maxWeight,
    ratios,
    minimumRatio: `${best.D}/${best.P}`,
    minimumAt: best.h,
    periodLowerBound: numerator / best.P + 1n,
  };
}

const output = {
  exactGate:
    "t=(D_v C_u-D_u C_v)/(2^A-3^r), n=(P_v C_u+M_u C_v)/(2^A-3^r)",
  complementCongruence:
    "t mod D_v == -C_v P_v^(-1) mod D_v; least-residue equality needs t<D_v",
  complementBound: complementBound(12),
  q5,
  exhaustive: enumerate(Number(process.argv[2] || 12)),
};

console.log(JSON.stringify(output, jsonValue, 2));
