#!/usr/bin/env node
"use strict";

// Exact regression certificate for the normalized one-drop resultant.
// All unbounded arithmetic is BigInt arithmetic.

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function abs(x) { return x < 0n ? -x : x; }

function gcd(a, b) {
  a = abs(a);
  b = abs(b);
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

function pow2(n) { return 1n << BigInt(n); }
function pow3(n) { return 3n ** BigInt(n); }

function mod(a, modulus) {
  const answer = a % modulus;
  return answer < 0n ? answer + modulus : answer;
}

function extendedGcd(a, b) {
  let oldR = a;
  let r = b;
  let oldS = 1n;
  let s = 0n;
  let oldT = 0n;
  let t = 1n;
  while (r !== 0n) {
    const quotient = oldR / r;
    [oldR, r] = [r, oldR - quotient * r];
    [oldS, s] = [s, oldS - quotient * s];
    [oldT, t] = [t, oldT - quotient * t];
  }
  return {gcd: oldR, x: oldS, y: oldT};
}

function inverseMod(a, modulus) {
  const row = extendedGcd(mod(a, modulus), modulus);
  assert(abs(row.gcd) === 1n, "modular inverse");
  return mod(row.x, modulus);
}

function powerMod(base, exponent, modulus) {
  if (exponent < 0n) {
    return powerMod(inverseMod(base, modulus), -exponent, modulus);
  }
  let answer = 1n;
  base = mod(base, modulus);
  while (exponent > 0n) {
    if ((exponent & 1n) === 1n) answer = answer * base % modulus;
    base = base * base % modulus;
    exponent >>= 1n;
  }
  return answer;
}

function v2(n) {
  n = abs(n);
  assert(n !== 0n, "v2(0)");
  let answer = 0;
  while ((n & 1n) === 0n) {
    n >>= 1n;
    ++answer;
  }
  return answer;
}

function parameters(r) {
  const N = pow3(r).toString(2).length;
  const e = N - r;
  const B = [];
  for (let j = 0; j <= r; ++j) B.push(Math.floor(j * N / r));
  const eligible = [];
  for (let j = 0; j < r - 1; ++j) {
    if (B[j + 1] - B[j] === 2) eligible.push(j);
  }
  assert(B[r] === N, "mechanical total");
  assert(B[r] - B[r - 1] === 2, "terminal mechanical letter");
  assert(eligible.length === e - 1, "eligible count");
  return {r, N, e, B, eligible};
}

function profile(data, selected) {
  const selectedSet = new Set(selected);
  const {r, N, B} = data;
  const U = selected.length;
  const m = [];
  let height = 0;
  for (let j = 0; j < r; ++j) {
    m.push(height);
    if (selectedSet.has(j)) ++height;
  }
  assert(height === U, "height total");

  const word = [];
  for (let j = 0; j < r - 1; ++j) {
    word.push(B[j + 1] - B[j] - (selectedSet.has(j) ? 1 : 0));
  }
  word.push(U + 2);
  assert(word.reduce((a, b) => a + b, 0) === N, "word total");

  let carry = 0n;
  let prefix = 0;
  for (const letter of word) {
    carry = 3n * carry + pow2(prefix);
    prefix += letter;
  }

  const kappa = [];
  const exponents = [];
  for (let j = 0; j < r; ++j) {
    const c = (j * N) % r;
    const k = c + r * m[j];
    kappa.push(k);
    exponents.push(r * (U + 1) - k);
  }
  return {U, m, word, carry, kappa, exponents};
}

// Multiplication matrix determinant in Z[theta], theta^r=2.
function determinantBareiss(matrix) {
  const A = matrix.map(row => row.slice());
  const n = A.length;
  let sign = 1n;
  let previous = 1n;
  for (let k = 0; k < n - 1; ++k) {
    if (A[k][k] === 0n) {
      let pivot = k + 1;
      while (pivot < n && A[pivot][k] === 0n) ++pivot;
      if (pivot === n) return 0n;
      [A[k], A[pivot]] = [A[pivot], A[k]];
      sign = -sign;
    }
    const pivot = A[k][k];
    for (let i = k + 1; i < n; ++i) {
      for (let j = k + 1; j < n; ++j) {
        const numerator = A[i][j] * pivot - A[i][k] * A[k][j];
        assert(numerator % previous === 0n, "Bareiss exact division");
        A[i][j] = numerator / previous;
      }
    }
    previous = pivot;
  }
  return sign * A[n - 1][n - 1];
}

function normFromCanonical(coefficients) {
  const r = coefficients.length;
  const matrix = Array.from({length: r}, () => Array(r).fill(0n));
  for (let column = 0; column < r; ++column) {
    for (let exponent = 0; exponent < r; ++exponent) {
      let target = exponent + column;
      let coefficient = coefficients[exponent];
      if (target >= r) {
        target -= r;
        coefficient *= 2n;
      }
      matrix[target][column] += coefficient;
    }
  }
  return determinantBareiss(matrix);
}

function multiplyCanonical(a, b) {
  const r = a.length;
  assert(b.length === r, "ring degree");
  const product = Array(r).fill(0n);
  for (let i = 0; i < r; ++i) {
    for (let j = 0; j < r; ++j) {
      let exponent = i + j;
      let coefficient = a[i] * b[j];
      if (exponent >= r) {
        exponent -= r;
        coefficient *= 2n;
      }
      product[exponent] += coefficient;
    }
  }
  return product;
}

function multiplicationMatrix(coefficients) {
  const r = coefficients.length;
  const matrix = Array.from({length: r}, () => Array(r).fill(0n));
  for (let column = 0; column < r; ++column) {
    for (let exponent = 0; exponent < r; ++exponent) {
      let target = exponent + column;
      let coefficient = coefficients[exponent];
      if (target >= r) {
        target -= r;
        coefficient *= 2n;
      }
      matrix[target][column] += coefficient;
    }
  }
  return matrix;
}

function cofactorGcd(matrix) {
  const n = matrix.length;
  let answer = 0n;
  for (let omittedRow = 0; omittedRow < n; ++omittedRow) {
    for (let omittedColumn = 0; omittedColumn < n; ++omittedColumn) {
      const minor = [];
      for (let row = 0; row < n; ++row) {
        if (row === omittedRow) continue;
        const values = [];
        for (let column = 0; column < n; ++column) {
          if (column !== omittedColumn) values.push(matrix[row][column]);
        }
        minor.push(values);
      }
      answer = gcd(answer, determinantBareiss(minor));
      if (answer === 1n) return answer;
    }
  }
  return answer;
}

function canonicalFromExponents(r, exponents) {
  const coefficients = Array(r).fill(0n);
  for (const exponent of exponents) {
    const residue = exponent % r;
    const quotient = (exponent - residue) / r;
    coefficients[residue] += pow2(quotient);
  }
  return coefficients;
}

function canonicalWeighted(r, exponents, weights) {
  assert(exponents.length === weights.length, "weighted exponent length");
  const coefficients = Array(r).fill(0n);
  for (let j = 0; j < exponents.length; ++j) {
    const exponent = exponents[j];
    const residue = exponent % r;
    const quotient = (exponent - residue) / r;
    coefficients[residue] += weights[j] * pow2(quotient);
  }
  return coefficients;
}

function evaluateMod(coefficients, value, modulus) {
  let answer = 0n;
  for (let j = coefficients.length - 1; j >= 0; --j) {
    answer = (answer * value + coefficients[j]) % modulus;
  }
  return mod(answer, modulus);
}

const maxR = Number(process.argv[2] || 18);
let profiles = 0;
let coprimeProfiles = 0;
let nonCoprimeShadows = 0;
let firstShadow = null;
let minimumOddResultant = null;
let minimumOddRow = null;
const minimumOddByU = new Map();
let nonPrimitivePolynomials = 0;
let firstNonPrimitive = null;
let smithRows = 0;

for (let r = 3; r <= maxR; ++r) {
  const data = parameters(r);
  const divisor = gcd(BigInt(r), BigInt(data.N));
  const delta = Array(r).fill(0n);
  delta[0] = -3n;
  delta[data.e] = 2n;
  const deltaMatrix = multiplicationMatrix(delta);
  const deltaNorm = determinantBareiss(deltaMatrix);
  const dNumber = Number(divisor);
  const b = abs(pow2(data.N / dNumber) - pow3(r / dNumber));
  assert(abs(deltaNorm) === b ** divisor, "delta norm formula");
  if (divisor === 1n) {
    assert(cofactorGcd(deltaMatrix) === 1n, "cyclic delta Smith form");
    ++smithRows;
  }
  assert(data.eligible.length < 31, "mask range");
  const masks = 2 ** data.eligible.length;
  for (let mask = 1; mask < masks; ++mask) {
    const selected = [];
    for (let i = 0; i < data.eligible.length; ++i) {
      if ((mask & 2 ** i) !== 0) selected.push(data.eligible[i]);
    }
    const row = profile(data, selected);
    ++profiles;
    const coefficients = canonicalFromExponents(r, row.exponents);
    const resultant = normFromCanonical(coefficients);
    const thetaValuation = coefficients.reduce((best, coefficient, s) => {
      if (coefficient === 0n) return best;
      const value = s + r * v2(coefficient);
      return best === null || value < best ? value : best;
    }, null);
    assert(thetaValuation !== null, "nonzero normalized polynomial");
    assert(v2(resultant) === thetaValuation,
      "general exact resultant v2");
    const polynomialContent = coefficients.reduce((g, x) => gcd(g, x), 0n);
    if (polynomialContent !== 1n) {
      ++nonPrimitivePolynomials;
      if (firstNonPrimitive === null) {
        firstNonPrimitive = {r, N: data.N, U: row.U, selected,
          content: polynomialContent.toString(), coefficients: coefficients.map(String)};
      }
    }

    if (divisor === 1n) {
      ++coprimeProfiles;
      const lambda = Math.min(...row.exponents);
      assert(new Set(row.exponents).size === r, "coprime exponent collision");
      assert(v2(resultant) === lambda, "exact resultant v2");
      assert(coefficients.reduce((g, x) => gcd(g, x), 0n) === 1n,
        "primitive normalized polynomial");
      const oddResultant = abs(resultant) >> BigInt(lambda);
      assert((oddResultant & 1n) === 1n, "odd normalized resultant");
      if (minimumOddResultant === null || oddResultant < minimumOddResultant) {
        minimumOddResultant = oddResultant;
        minimumOddRow = {r, N: data.N, U: row.U, selected, lambda,
          oddResultant: oddResultant.toString()};
      }
      const priorByU = minimumOddByU.get(row.U);
      if (priorByU === undefined || oddResultant < priorByU.value) {
        minimumOddByU.set(row.U, {value: oddResultant, r, N: data.N,
          lambda, selected});
      }
      const D = pow2(data.N) - pow3(r);
      const bezout = extendedGcd(BigInt(r), BigInt(data.N));
      assert(bezout.gcd === 1n, "coprime Bezout");
      const g = powerMod(2n, bezout.x, D) *
        powerMod(3n, bezout.y, D) % D;
      assert(powerMod(g, BigInt(r), D) === 2n % D, "g^r=2");
      assert(powerMod(g, BigInt(data.N), D) === 3n % D, "g^N=3");
      const left = powerMod(g, BigInt(data.N * (r - 1)), D) *
        evaluateMod(coefficients, g, D) % D;
      const right = pow2(row.U + 1) * row.carry % D;
      assert(left === right, "carry class in the cyclic delta quotient");
    } else {
      const D = pow2(data.N) - pow3(r);
      // A single delta component sees precisely the characteristic b.
      const deltaShadow = row.carry % b === 0n;
      if (deltaShadow && row.carry % D !== 0n) {
        ++nonCoprimeShadows;
        if (firstShadow === null) {
          firstShadow = {
            r,
            N: data.N,
            d: dNumber,
            U: row.U,
            selected,
            carry: row.carry.toString(),
            b: b.toString(),
            D: D.toString(),
            word: row.word
          };
        }
      }
    }
  }
}

// Direct noncoprime shadow: theta^6=2 and delta=2 theta^4-3.
// It proves that a single delta component does not encode D when d>1.
{
  const P = [12n, 0n, 6n, 0n, 5n, 0n];
  const delta = [-3n, 0n, 0n, 0n, 2n, 0n];
  const quotient = [52n, 0n, 42n, 0n, 33n, 0n];
  assert(multiplyCanonical(delta, quotient).every((x, j) => x === P[j]),
    "noncoprime integral delta quotient");
  assert(925n % 5n === 0n && 925n % 295n !== 0n,
    "noncoprime denominator shadow");
}

// Coprime high-rise rational no-go at (r,N,e,U)=(11,18,7,6).
// This is the full-selection word (1^10,8).
let fullSelectionRow;
{
  const r = 11;
  const N = 18;
  const e = 7;
  const U = 6;
  const C = pow3(r) - pow2(r);
  const D = pow2(N) - pow3(r);
  const common = gcd(C, D);
  const q = D / common;
  const initialNumerator = C / common;
  const word = [...Array(r - 1).fill(1), e + 1];
  const numerators = [initialNumerator];
  let current = initialNumerator;
  for (const letter of word) {
    const branchNumerator = 3n * current + q;
    assert(v2(branchNumerator) === letter, "full-selection branch valuation");
    current = branchNumerator / pow2(letter);
    numerators.push(current);
  }
  assert(current === initialNumerator, "full-selection closure");
  assert(numerators.slice(1, r).every(x => x > initialNumerator),
    "full-selection strict leastness");

  const exponents = Array.from({length: r}, (_, j) => e * (r - j));
  const P = canonicalFromExponents(r, exponents);
  const delta = Array(r).fill(0n);
  delta[0] = -3n;
  delta[e] = 2n;
  const PhiQ = canonicalWeighted(r, exponents, numerators.slice(0, r));
  const qP = P.map(x => q * x);
  assert(multiplyCanonical(delta, PhiQ).every((x, j) => x === qP[j]),
    "cleared rational quotient identity");

  const shiftedExponents = exponents.map(x => x - e);
  const PsiQ = canonicalWeighted(r, shiftedExponents, numerators.slice(0, r));
  const thetaE = Array(r).fill(0n);
  thetaE[e] = 1n;
  assert(multiplyCanonical(thetaE, PsiQ).every((x, j) => x === PhiQ[j]),
    "primitive theta shift");
  assert(PsiQ.reduce((g, x) => gcd(g, x), 0n) === 1n,
    "primitive cleared quotient");

  const oddResultant = (pow2(e) - 1n) ** BigInt(r - 1);
  assert(abs(normFromCanonical(P)) === pow2(e) * oddResultant,
    "full-selection resultant formula");
  assert(abs(normFromCanonical(PsiQ)) === q ** BigInt(r) * oddResultant / D,
    "full-selection quotient norm formula");
  assert((initialNumerator + q) < 4n * q,
    "full-selection Q<2");
  assert((initialNumerator + q) > 2n * q,
    "full-selection Q>1");
  assert(BigInt(U * U) * 1000000n > 2315385n * BigInt(r),
    "full-selection high-rise stratum");
  fullSelectionRow = {
    r,
    N,
    U,
    C: C.toString(),
    D: D.toString(),
    q: q.toString(),
    Q: `${(initialNumerator + q).toString()}/${(2n * q).toString()}`,
    lambda: e,
    oddResultant: oddResultant.toString(),
    quotientContent: "1"
  };
}

console.log(JSON.stringify({
  maxR,
  profiles,
  coprimeProfiles,
  smithRows,
  nonCoprimeShadows,
  firstShadow,
  nonPrimitivePolynomials,
  firstNonPrimitive,
  minimumOddRow,
  minimumOddByU: [...minimumOddByU.entries()].map(([U, datum]) => ({
    U,
    r: datum.r,
    N: datum.N,
    lambda: datum.lambda,
    selected: datum.selected,
    oddResultant: datum.value.toString()
  })),
  fullSelectionRow,
  status: "PASS"
}));
