#!/usr/bin/env node
"use strict";

// Exact certificate for the two level-1 deformation theorem.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function gcd(a, b) {
  if (a < 0n) a = -a;
  if (b < 0n) b = -b;
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

function determinantBareiss(A0) {
  const A = A0.map(row => row.slice());
  const n = A.length;
  if (n === 0) return 1n;
  let sign = 1n;
  let previous = 1n;
  for (let k = 0; k < n - 1; ++k) {
    if (A[k][k] === 0n) {
      let p = k + 1;
      while (p < n && A[p][k] === 0n) ++p;
      if (p === n) return 0n;
      [A[k], A[p]] = [A[p], A[k]];
      sign = -sign;
    }
    const pivot = A[k][k];
    for (let i = k + 1; i < n; ++i) {
      for (let j = k + 1; j < n; ++j) {
        const value = A[i][j] * pivot - A[i][k] * A[k][j];
        assert(value % previous === 0n, "Bareiss division failed");
        A[i][j] = value / previous;
      }
    }
    previous = pivot;
  }
  return sign * A[n - 1][n - 1];
}

// Coefficients are ascending by exponent.
function resultant(a0, b0) {
  let a = a0.slice();
  let b = b0.slice();
  while (a.length > 1 && a[a.length - 1] === 0n) a.pop();
  while (b.length > 1 && b[b.length - 1] === 0n) b.pop();
  const m = a.length - 1;
  const n = b.length - 1;
  const ad = a.slice().reverse();
  const bd = b.slice().reverse();
  const S = Array.from({length: m + n}, () => Array(m + n).fill(0n));
  for (let row = 0; row < n; ++row) {
    for (let j = 0; j <= m; ++j) S[row][row + j] = ad[j];
  }
  for (let row = 0; row < m; ++row) {
    for (let j = 0; j <= n; ++j) S[n + row][row + j] = bd[j];
  }
  const value = determinantBareiss(S);
  return value < 0n ? -value : value;
}

function affineData(word) {
  let C = 0n;
  let A = 0n;
  for (const a of word) {
    C = 3n * C + (1n << A);
    A += BigInt(a);
  }
  return {C, A};
}

function exactRationalStates(word, C, D) {
  const common = gcd(C, D);
  const q = D / common;
  let p = C / common;
  const states = [];
  for (const a of word) {
    states.push(p);
    const numerator = 3n * p + q;
    const divisor = 1n << BigInt(a);
    assert(numerator % divisor === 0n, "valuation does not divide");
    assert(numerator % (2n * divisor) !== 0n, "valuation is not exact");
    p = numerator / divisor;
  }
  assert(p === states[0], "rational orbit does not close");
  return {q, common, states};
}

function polynomialXRMinusTwo(r) {
  const f = Array(r + 1).fill(0n);
  f[0] = -2n;
  f[r] = 1n;
  return f;
}

function originalTwoResiduePolynomial(r, c0, d0) {
  const c = Math.min(c0, d0);
  const d = Math.max(c0, d0);
  const a = d - c;
  const h = Array(r + 1).fill(0n);
  h[d + 1] -= 1n;
  h[a + 1] += 1n;
  h[a] -= 1n;
  h[1] += 1n;
  h[0] -= 1n;
  // Reduce the only possible degree-r term by X^r=2.
  if (h[r] !== 0n) {
    h[0] += 2n * h[r];
    h[r] = 0n;
  }
  return h;
}

const maxR = Number(process.argv[2] || 30);
let pairs = 0;
let easyPairs = 0;
let hardPairs = 0;
let zeroOriginalResultants = 0;
let originalResultantsAtLeastD = 0;
let properCarryFactors = 0;
let fullCarryFactors = 0;
let hardContentChecks = 0;
let endpointChecks = 0;
let hardReducedDivisible = 0;
let endpointDivisible = 0;
let easyResultantsAtLeastD = 0;

let obstructionR8 = null;
let countermodelR11 = null;

for (let r = 3; r <= maxR; ++r) {
  const N = Math.ceil(Math.log2(3) * r - 1e-12);
  if (gcd(BigInt(N), BigInt(r)) !== 1n) continue;
  const B = N - r;
  const L = r - B;
  const D = (1n << BigInt(N)) - 3n ** BigInt(r);
  const fr = polynomialXRMinusTwo(r);

  for (let s = 1; s < r; ++s) {
    for (let t = s + 1; t < r; ++t) {
      const levels = Array(r).fill(0);
      levels[s] = 1;
      levels[t] = 1;
      const positions = levels.map((m, j) => Math.floor(j * N / r) - m);
      let valid = positions[0] === 0 && positions[r - 1] < N;
      for (let j = 1; j < r; ++j) {
        if (positions[j] <= positions[j - 1]) valid = false;
      }
      if (!valid) continue;

      ++pairs;
      const word = [];
      for (let j = 0; j < r - 1; ++j) word.push(positions[j + 1] - positions[j]);
      word.push(N - positions[r - 1]);
      const data = affineData(word);
      assert(data.A === BigInt(N), "wrong shortcut length");
      const carryCommon = gcd(D, data.C);
      if (carryCommon === D) ++fullCarryFactors;
      if (carryCommon > 1n && carryCommon < D) ++properCarryFactors;

      const c = (s * N) % r;
      const d = (t * N) % r;
      const H = originalTwoResiduePolynomial(r, c, d);
      const RH = resultant(fr, H);
      if (RH === 0n) ++zeroOriginalResultants;
      if (RH >= D) ++originalResultantsAtLeastD;

      const adjacent = t === s + 1;
      const internalGap = adjacent
        ? Math.floor((s + 1) * N / r) - Math.floor(s * N / r)
        : null;
      const hard = adjacent && internalGap === 1;

      if (!hard) {
        ++easyPairs;
        assert(1 <= c && c < B, "first easy residue is not below B");
        assert(1 <= d && d < B, "second easy residue is not below B");
        assert(RH > 0n, "easy resultant vanished");
        if (RH >= D) ++easyResultantsAtLeastD;
      } else {
        ++hardPairs;
        assert(1 <= c && c < L, "hard residue is not below L");
        const k = c + 1;
        const fL = Array(L + 1).fill(0n);
        fL[0] = -4n;
        fL[L] = 3n;
        const f = Array(k + 1).fill(0n);
        f[0] = 5n;
        f[1] = -5n;
        f[k] = 3n;

        if (k < L) {
          const RL = resultant(fL, f);
          let reduced = RL;
          for (let e = 0; e < k - 1; ++e) {
            assert(reduced % 3n === 0n, "missing Sylvester 3-content");
            reduced /= 3n;
          }
          assert(RL > 0n, "hard specific-root resultant vanished");
          if (reduced % D === 0n) ++hardReducedDivisible;
          ++hardContentChecks;
        } else {
          const J = 3n * 9n ** BigInt(L) - 4n * 5n ** BigInt(L);
          assert(J > 0n, "endpoint integer is not positive");
          if (J % D === 0n) ++endpointDivisible;
          ++endpointChecks;
        }
      }

      if (r === 8 && N === 13 && s === 2 && t === 3) {
        const k = c + 1;
        const f = Array(k + 1).fill(0n);
        f[0] = 5n;
        f[1] = -5n;
        f[k] = 3n;
        obstructionR8 = {D, RH, specificR: resultant(fr, f), C:data.C, carryCommon};
      }

      if (r === 11 && N === 18 && s === 2 && t === 8) {
        countermodelR11 = {D, RH, C:data.C, carryCommon, word,
          rational: exactRationalStates(word, data.C, D)};
      }
    }
  }
}

assert(maxR !== 30 || pairs === 856, "unexpected default pair count");
assert(maxR !== 30 || easyPairs === 769, "unexpected default easy count");
assert(maxR !== 30 || hardPairs === 87, "unexpected default hard count");
assert(maxR !== 30 || originalResultantsAtLeastD === 20,
  "unexpected default large-resultant count");
assert(maxR !== 30 || properCarryFactors === 48,
  "unexpected default proper-factor count");
assert(zeroOriginalResultants === 0, "an original resultant vanished");
assert(fullCarryFactors === 0, "a finite full-determinant carry was found");

assert(obstructionR8 !== null, "missing r=8 obstruction");
assert(obstructionR8.D === 1631n, "wrong r=8 determinant");
assert(obstructionR8.RH === 1631n, "wrong r=8 original resultant");
assert(obstructionR8.specificR === 1308887n, "wrong r=8 specific resultant");
assert(obstructionR8.carryCommon === 1n, "r=8 obstruction is not spurious");

assert(countermodelR11 !== null, "missing r=11 countermodel");
assert(countermodelR11.D === 84997n, "wrong r=11 determinant");
assert(countermodelR11.C === 516835n, "wrong r=11 carry");
assert(countermodelR11.RH === 11n, "wrong r=11 resultant");
assert(countermodelR11.carryCommon === 11n, "wrong r=11 carry gcd");
assert(countermodelR11.rational.q === 7727n, "wrong r=11 denominator");
assert(countermodelR11.rational.states[0] === 46985n, "wrong r=11 first state");
assert(countermodelR11.rational.states.every(x => x >= 46985n),
  "r=11 first state is not least");

assert(2n ** 19n < 3n ** 12n, "log2(3)>19/12 certificate failed");
assert(3n ** 5n < 2n ** 8n, "log2(3)<8/5 certificate failed");
assert(67n ** 5n * 2n ** 24n < 5n ** 24n,
  "67^(5/24)<5/2 certificate failed");
assert(72057431991n > 3n ** 16n, "period barrier certificate failed");

console.log("valid_two_shift_pairs=" + pairs);
console.log("easy_residue_pairs=" + easyPairs);
console.log("hard_adjacent_pairs=" + hardPairs);
console.log("hard_content_checks=" + hardContentChecks);
console.log("hard_endpoint_checks=" + endpointChecks);
console.log("hard_reduced_divisible_small=" + hardReducedDivisible);
console.log("hard_endpoint_divisible_small=" + endpointDivisible);
console.log("easy_resultants_at_least_D_small=" + easyResultantsAtLeastD);
console.log("original_resultants_at_least_D=" + originalResultantsAtLeastD);
console.log("proper_factor_cases=" + properCarryFactors);
console.log("r8_original_resultant=" + obstructionR8.RH);
console.log("r8_specific_resultant=" + obstructionR8.specificR);
console.log("r11_proper_factor=" + countermodelR11.carryCommon);
console.log("two_shift_resultant_certificate_passed=true");
