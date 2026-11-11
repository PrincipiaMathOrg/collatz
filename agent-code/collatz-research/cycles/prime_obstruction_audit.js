"use strict";

// Exact audit of a proposed single-prime obstruction.  The denominator-five
// rational cycle has a common prime p=14303 which is primitive for the full
// exponent rectangle, yet its prefix multipliers form a distinct nonzero
// zero-sum cycle modulo p and its states satisfy the ordinary +1 recurrence.

function mod(a, m) {
  const r = a % m;
  return r < 0n ? r + m : r;
}

function powmod(a, n, m) {
  let x = 1n;
  while (n > 0n) {
    if (n & 1n) x = x * a % m;
    a = a * a % m;
    n >>= 1n;
  }
  return x;
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

function inv(a, m) {
  const [g, x] = egcd(mod(a, m), m);
  if (g !== 1n) throw new Error("nonunit");
  return mod(x, m);
}

function gcd(a, b) {
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

function isPrime(n) {
  if (n < 2n) return false;
  for (let d = 2n; d * d <= n; ++d) if (n % d === 0n) return false;
  return true;
}

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

const a = [1,1,1,1,1,2,1,1,2,1,2,3,2,1,1,1,5];
const numerators = [187,283,427,643,967,1453,1091,1639,2461,1847,2773,
  2081,781,587,883,1327,1993].map(BigInt);
const r = a.length;
const A = a.reduce((x, y) => x + y, 0);
const M = 1n << BigInt(A), P = 3n ** BigInt(r), D = M - P;
let C = 0n, prefixA = 0;
const prefixMultipliersReal = [];
for (let i = 0; i < r; ++i) {
  prefixMultipliersReal.push([1n << BigInt(prefixA), 3n ** BigInt(i)]);
  C += (1n << BigInt(prefixA)) * (3n ** BigInt(r - i - 1));
  prefixA += a[i];
}

assert(A === 27 && r === 17, "totals");
assert(D === 5077565n && C === 189900931n, "D or C");
assert(D === 5n * 71n * 14303n, "factorization of D");
assert(gcd(D, C) === 71n * 14303n, "common divisor");
for (let i = 1; i < r; ++i) {
  const [two, three] = prefixMultipliersReal[i];
  assert(two < three, "strict prefix record");
}
assert(M > P, "terminal crossing");

const p = 14303n, order = 7151n;
assert(isPrime(p) && isPrime(order) && p - 1n === 2n * order, "primality");
assert(powmod(2n, order, p) === 1n && powmod(3n, order, p) === 1n,
  "orders do not divide 7151");
assert(2n !== 1n && 3n !== 1n, "trivial order");

// 3=2^5470 mod p.  Since the order is prime, 2^u=3^v iff
// u=5470v mod 7151.  Only (u,v)=(27,17) occurs in the full rectangle.
const discreteLog = 5470n;
assert(powmod(2n, discreteLog, p) === 3n, "discrete logarithm");
const rectangleRelations = [];
for (let b = 1; b <= r; ++b) {
  const exponent = Number(BigInt(b) * discreteLog % order);
  if (exponent >= 1 && exponent <= A) rectangleRelations.push([exponent, b]);
}
assert(JSON.stringify(rectangleRelations) === JSON.stringify([[27,17]]),
  "not rectangle-primitive");

let z = 1n;
const zValues = [];
for (const exponent of a) {
  zValues.push(z);
  z = z * powmod(2n, BigInt(exponent), p) % p * inv(3n, p) % p;
}
assert(z === 1n, "prefix multiplier walk does not close");
assert(new Set(zValues.map(String)).size === r, "prefix multipliers collide");
assert(zValues.every(v => v !== 0n), "zero prefix multiplier");
assert(zValues.reduce((x, y) => x + y, 0n) % p === 0n,
  "prefix multipliers are not zero-sum");

const inv5 = inv(5n, p);
const states = numerators.map(n => n * inv5 % p);
assert(new Set(states.map(String)).size === r && states.every(x => x !== 0n),
  "state residues are not distinct and nonzero");
for (let i = 0; i < r; ++i) {
  const lhs = powmod(2n, BigInt(a[i]), p) * states[(i + 1) % r];
  const rhs = 3n * states[i] + 1n;
  assert(mod(lhs - rhs, p) === 0n, "ordinary affine recurrence");
}

console.log(JSON.stringify({
  status: "single-prime obstruction refuted by q=5 regression",
  A, r, M: String(M), P: String(P), D: String(D), C: String(C),
  commonPrime: String(p), order: String(order), discreteLog: String(discreteLog),
  rectangleRelations,
  prefixMultipliers: zValues.map(String),
  prefixSumModP: String(zValues.reduce((x, y) => x + y, 0n) % p),
  stateResidues: states.map(String)
}, null, 2));
