#!/usr/bin/env node
"use strict";

function assert(ok, msg) { if (!ok) throw new Error(msg); }
function abs(x) { return x < 0n ? -x : x; }
function gcd(a, b) { a = abs(a); b = abs(b); while (b) [a, b] = [b, a % b]; return a; }
function pow(a, n) { let z = 1n; while (n) { if (n & 1) z *= a; a *= a; n >>= 1; } return z; }

function determinantBareiss(A0) {
  const A = A0.map(row => row.slice());
  const n = A.length;
  let sign = 1n, previous = 1n;
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

function polyMulMod(a, b, monic) {
  const d = monic.length - 1;
  const out = Array(a.length + b.length - 1).fill(0n);
  for (let i = 0; i < a.length; ++i)
    for (let j = 0; j < b.length; ++j) out[i + j] += a[i] * b[j];
  for (let e = out.length - 1; e >= d; --e) {
    const q = out[e];
    for (let j = 0; j < d; ++j) out[e - d + j] -= q * monic[j];
  }
  const ans = Array(d).fill(0n);
  for (let i = 0; i < Math.min(d, out.length); ++i) ans[i] = out[i];
  return ans;
}

function xPowerMod(n, monic) {
  const d = monic.length - 1;
  let ans = Array(d).fill(0n), x = Array(d).fill(0n);
  ans[0] = 1n; x[1] = 1n;
  while (n) {
    if (n & 1) ans = polyMulMod(ans, x, monic);
    n >>= 1;
    if (n) x = polyMulMod(x, x, monic);
  }
  return ans;
}

function binomialResultant(r, H) {
  const d = H.length - 1;
  const sign = H[d];
  assert(sign === 1n || sign === -1n, "endpoint polynomial not monic up to sign");
  const G = sign === 1n ? H.slice() : H.map(x => -x);
  let column = xPowerMod(r, G);
  column[0] -= 2n;
  const M = Array.from({length: d}, () => Array(d).fill(0n));
  for (let j = 0; j < d; ++j) {
    for (let i = 0; i < d; ++i) M[i][j] = column[i];
    column = polyMulMod(column, [0n, 1n], G);
  }
  return abs(determinantBareiss(M));
}

function endpointPolynomial(cSet) {
  const cStar = Math.max(...cSet);
  const H = Array(cStar + 2).fill(0n);
  for (const c of cSet) {
    const e = cStar - c;
    H[e] -= 1n;
    H[e + 1] += 1n;
  }
  H[cStar + 1] -= 1n;
  return H;
}

function ordinaryRuns(cSet) {
  const a = [...cSet].sort((x, y) => x - y);
  let runs = 0, previous = -2;
  for (const c of a) { if (c !== previous + 1) ++runs; previous = c; }
  return runs;
}

function affineData(word) {
  let C = 0n, A = 0;
  for (const a of word) { C = 3n * C + (1n << BigInt(A)); A += a; }
  return {C, A};
}

function isPrimitive(word) {
  for (let d = 1; d < word.length; ++d) {
    if (word.length % d) continue;
    if (word.every((x, i) => x === word[i % d])) return false;
  }
  return true;
}

const r = 59, N = 94;
const support = [2,6,8,9,11,14,17,19,20,22,23,24,26,27,31,32,34,37,41,43,49,54,55,57];
const supportSet = new Set(support);
const Bprefix = Array.from({length: r + 1}, (_, j) => Math.floor(j * N / r));
const residues = Array.from({length: r}, (_, j) => (j * N) % r);
const heights = residues.map(c => supportSet.has(c) ? 1 : 0);
const word = Array.from({length: r}, (_, j) =>
  Bprefix[j + 1] - Bprefix[j] + heights[j] - heights[(j + 1) % r]);
let transitions = 0, badEntries = 0;
for (let j = 0; j < r; ++j) {
  if (heights[j] !== heights[(j + 1) % r]) ++transitions;
  const g = Bprefix[j + 1] - Bprefix[j];
  if (heights[j] === 0 && heights[(j + 1) % r] === 1 && g !== 2) ++badEntries;
}
assert(heights[0] === 0 && heights.every(x => x === 0 || x === 1), "not binary");
assert(word.every(a => a >= 1), "nonpositive accelerated letter");
assert(badEntries === 0, "a 0->1 entry missed a gap two");
assert(transitions === 24 && support.length === 24, "wrong dense statistics");
assert(isPrimitive(word), "word is not primitive");

let prefix = 0;
for (let j = 1; j < r; ++j) {
  prefix += word[j - 1];
  assert((1n << BigInt(N - prefix)) > pow(3n, r - j), "strict suffix record failed");
}
const {C, A} = affineData(word);
const D = (1n << BigInt(N)) - pow(3n, r);
assert(A === N && D === 5676654536827349893621176517n, "wrong N or D");
assert(C === 189239112907578841335971743427n, "wrong carry");
assert(gcd(C, D) === 1n && C > 33n * D && C < 34n * D, "wrong rational state");

let stateNumerator = C;
for (let j = 0; j < r; ++j) {
  const numerator = 3n * stateNumerator + D;
  const divisor = 1n << BigInt(word[j]);
  assert(numerator % divisor === 0n, "rational valuation not exact");
  stateNumerator = numerator / divisor;
  if (j + 1 < r) assert(stateNumerator > C, "index zero not strict least");
}
assert(stateNumerator === C, "rational cycle did not close");

const H = endpointPolynomial(support);
assert(H[0] === -1n, "wrong endpoint constant");
const energy = H.reduce((s, x) => s + x * x, 0n);
assert(ordinaryRuns(support) === 17 && energy === 35n, "wrong endpoint energy");
const R = binomialResultant(r, H);
const expectedR = 23281735951464258499426253587550606011986727n;
assert(R === expectedR && R > D, "wrong least-witness resultant");
assert(R % 2n === 1n && R % 3n === 1n && gcd(R, D) === 1n,
  "least-witness content check failed");

let rotatedCarry = C;
for (let j = 0; j < r; ++j) {
  const numerator = 3n * rotatedCarry + D;
  const divisor = 1n << BigInt(word[j]);
  assert(numerator % divisor === 0n, "rotation identity failed");
  rotatedCarry = numerator / divisor;
  assert(gcd(rotatedCarry, D) === 1n, "rotation changed denominator");
}
assert(rotatedCarry === C, "rotation carries did not close");

const baseSupport = [2,5,7,8,9,11,13,14,15,18,19,20,21,22,23,25,27,29,30,31,37,40,42,43,44,48,49,53,56,57,58];
const H0 = endpointPolynomial(baseSupport);
assert(ordinaryRuns(baseSupport) === 15, "wrong base run count");
assert(H0.reduce((s, x) => s + x * x, 0n) === 31n, "wrong base energy");
const R0 = binomialResultant(256, H0);
const expectedR0 = 4708365355653563911081866377359552639044012876572741956888992577677170101967645821582276774074740448260858568939770910008307867657574825679517635063n;
assert(R0 === expectedR0, "wrong scalable resultant");
assert(R0 > pow(3n, 256) && R0 % 2n === 1n && R0 % 3n === 2n,
  "scalable content/size check failed");

function ceilDiv(a, b) { return (a + b - 1n) / b; }
function logInterval(m0, terms, scale) {
  const m = BigInt(m0), m2 = m * m;
  let lower = 0n, upper = 0n, mPower = m;
  for (let k = 0; k < terms; ++k) {
    const den = BigInt(2 * k + 1) * mPower;
    lower += 2n * scale / den;
    upper += ceilDiv(2n * scale, den);
    mPower *= m2;
  }
  const tailDen = BigInt(2 * terms + 1) * pow(m, 2 * terms - 1) * (m2 - 1n);
  upper += ceilDiv(2n * scale, tailDen);
  return [lower, upper];
}
const decimalScale = pow(10n, 100);
const [l2Lower, l2Upper] = logInterval(3, 400, decimalScale);
const [l3Lower, l3Upper] = logInterval(2, 400, decimalScale);
const largeM = 1n << 30n;
const largeR = 256n * largeM;
const largeN = 435671174783n;
assert(largeR === 274877906944n && largeR > 72057431991n, "wrong large period");
assert(largeR * l3Lower >= (largeN - 1n) * l2Upper, "large N lower bound failed");
assert(largeR * l3Upper < largeN * l2Lower, "large N upper bound failed");
assert(gcd(largeN, largeR) === 1n, "large slope not coprime");
const largeL = 2n * largeR - largeN;
assert(59n * largeM - 1n < largeL, "scaled support not in low arc");
assert(31n * largeM * 256n === 31n * largeR, "support density failed");
assert(62n * largeM * 128n === 31n * largeR, "transition density failed");

console.log("least_witness_r=59");
console.log("least_witness_N=94");
console.log("least_witness_k=24");
console.log("least_witness_T=24");
console.log("least_witness_reduced_denominator=" + D);
console.log("least_witness_endpoint_energy=" + energy);
console.log("least_witness_resultant=" + R);
console.log("least_witness_resultant_coprime_to_6D=true");
console.log("all_rotation_carry_gcds_equal_one=true");
console.log("scalable_base_energy=31");
console.log("scalable_base_resultant=" + R0);
console.log("scalable_base_resultant_gt_3_pow_256=true");
console.log("scalable_base_resultant_coprime_to_6=true");
console.log("above_barrier_scale_r=" + largeR);
console.log("above_barrier_scale_N=" + largeN);
console.log("above_barrier_scale_path_only=true");
console.log("binary_dense_integrality_no_go_certificate_passed=true");
