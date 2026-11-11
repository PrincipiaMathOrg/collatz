"use strict";

// Exact regression certificate for q2_binary_height_dense.md.
// This constructs one profile only. It does not enumerate a transition sector.

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function bitLength(n) {
  return n.toString(2).length;
}

function gcd(a, b) {
  if (a < 0n) a = -a;
  if (b < 0n) b = -b;
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

function inverseMod(a, modulus) {
  let oldR = a;
  let r = modulus;
  let oldS = 1n;
  let s = 0n;
  while (r !== 0n) {
    const q = oldR / r;
    [oldR, r] = [r, oldR - q * r];
    [oldS, s] = [s, oldS - q * s];
  }
  assert(oldR === 1n, "inverse does not exist");
  return ((oldS % modulus) + modulus) % modulus;
}

const s = 150;
const powersOfThree = [1n];
for (let i = 1; i <= s; i += 1) {
  powersOfThree.push(3n * powersOfThree[i - 1]);
}

const B = powersOfThree.map((value) => bitLength(value) - 1);
const N = bitLength(powersOfThree[s]);
const previousCeiling = bitLength(powersOfThree[s - 1]);
const M = 1n << BigInt(N);
const P = powersOfThree[s];
const D = M - P;

assert(N === 238, "unexpected N");
assert(N - previousCeiling === 1, "not a q=2 row");
assert(B[s - 1] === N - 2, "not terminal complement b=1");

const entryVertices = [];
for (let i = 1; i <= s - 2; i += 1) {
  if (B[i] - B[i - 1] === 2) entryVertices.push(i);
}

const selected = entryVertices.filter((_, index) => index % 2 === 0);
const selectedSet = new Set(selected);
const h = Array.from({ length: s }, (_, i) => (selectedSet.has(i) ? 1 : 0));

assert(entryVertices.length === B[s - 2] - (s - 2), "entry count mismatch");
assert(entryVertices.length === 86, "unexpected entry count");
assert(selected.length === 43, "unexpected support size");
assert(h[0] === 0 && h[s - 1] === 0, "endpoint height mismatch");

let transitions = 0;
for (let i = 0; i < s - 1; i += 1) {
  const g = B[i + 1] - B[i];
  const a = g + h[i] - h[i + 1];
  assert(a > 0, "profile is not strictly anchored");
  if (h[i] !== h[i + 1]) transitions += 1;
  if (h[i] === 0 && h[i + 1] === 1) {
    assert(g === 2 && a === 1, "invalid binary entry");
  }
}
assert(transitions === 86, "unexpected transition count");

let C0 = 0n;
let C = 0n;
for (let i = 0; i < s; i += 1) {
  const common = powersOfThree[s - 1 - i];
  C0 += common * (1n << BigInt(B[i]));
  C += common * (1n << BigInt(B[i] - h[i]));
}

const expectedD = BigInt(
  "71723281159469109471123592734032984770397873829181765715217145021406695",
);
const expectedC = BigInt(
  "11223413602694402415397674168974525261357442348308247832762587904890149905",
);

assert(D === expectedD, "determinant regression failed");
assert(C === expectedC, "carry regression failed");
assert(gcd(D, C) === 5n, "proper-factor cancellation regression failed");
assert(D / 5n === BigInt(
  "14344656231893821894224718546806596954079574765836353143043429004281339",
), "determinant cofactor regression failed");
assert(C % D !== 0n, "the obstruction must not be a full equality target");

// Exact scalar inequalities from the report.
assert(12n * C0 < BigInt(3 * s + 11) * P, "twelve-block bound failed");
assert(18n * (C0 - C) > BigInt(transitions) * P, "T/18 loss failed");
assert(12n * C > BigInt(s) * P, "linear remaining carry failed");

const H = 307n * BigInt(s) ** 15n;
const L = bitLength(2n * H) - 1;
const q = s - L;
assert(L === 117 && q === 33, "finite-prefix length regression failed");
assert(transitions > q / 2, "profile should lie in the high-transition alternative");

const tau = (C * inverseMod(M % D, D)) % D;
assert(tau !== 0n, "proper-factor witness unexpectedly has equality residue");

console.log(`s=${s}`);
console.log(`N=${N}`);
console.log(`support=${selected.length}`);
console.log(`transitions=${transitions}`);
console.log(`L=${L}`);
console.log(`q=${q}`);
console.log(`D=${D}`);
console.log(`C=${C}`);
console.log(`gcd_D_C=${gcd(D, C)}`);
console.log(`tau=${tau}`);
console.log("binary_dense_obstruction_verified=true");
