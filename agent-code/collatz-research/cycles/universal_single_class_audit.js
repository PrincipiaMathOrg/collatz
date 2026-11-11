#!/usr/bin/env node
"use strict";

// Exact regression for cycle_universal_word_independent_obstruction_audit.md.
// This script certifies identities and finite witnesses.  It does not certify
// cycle exclusion.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function abs(a) { return a < 0n ? -a : a; }

function gcd(a, b) {
  a = abs(a); b = abs(b);
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

function egcd(a, b) {
  if (b === 0n) return [a, 1n, 0n];
  const [g, x, y] = egcd(b, a % b);
  return [g, y, x - (a / b) * y];
}

function mod(a, m) {
  const x = a % m;
  return x < 0n ? x + m : x;
}

function invMod(a, m) {
  const [g, x] = egcd(mod(a, m), m);
  assert(g === 1n, "inverse does not exist");
  return mod(x, m);
}

function powMod(a, e, m) {
  let x = mod(a, m), y = 1n;
  while (e > 0n) {
    if (e & 1n) y = y * x % m;
    x = x * x % m;
    e >>= 1n;
  }
  return y;
}

function pow(base, exponent) {
  return BigInt(base) ** BigInt(exponent);
}

function isPrimeSmall(n) {
  if (n < 2n) return false;
  for (let d = 2n; d * d <= n; ++d) {
    if (n % d === 0n) return false;
  }
  return true;
}

function v2(n) {
  assert(n > 0n, "v2 expects a positive integer");
  let v = 0;
  while ((n & 1n) === 0n) { n >>= 1n; ++v; }
  return v;
}

function affine(word) {
  let C = 0n, N = 0;
  for (const a of word) {
    C = 3n * C + (1n << BigInt(N));
    N += a;
  }
  const D = (1n << BigInt(N)) - 3n ** BigInt(word.length);
  return {C, N, D};
}

function rotate(word, i) {
  i %= word.length;
  return word.slice(i).concat(word.slice(0, i));
}

function properPower(word) {
  for (let d = 1; d < word.length; ++d) {
    if (word.length % d !== 0) continue;
    let ok = true;
    for (let i = d; i < word.length; ++i) {
      if (word[i] !== word[i % d]) { ok = false; break; }
    }
    if (ok) return true;
  }
  return false;
}

function bareissDet(matrix) {
  const n = matrix.length;
  if (n === 1) return matrix[0][0];
  const a = matrix.map(row => row.slice());
  let sign = 1n, previous = 1n;
  for (let k = 0; k < n - 1; ++k) {
    let pivot = k;
    while (pivot < n && a[pivot][k] === 0n) ++pivot;
    if (pivot === n) return 0n;
    if (pivot !== k) {
      [a[pivot], a[k]] = [a[k], a[pivot]];
      sign = -sign;
    }
    const p = a[k][k];
    for (let i = k + 1; i < n; ++i) {
      for (let j = k + 1; j < n; ++j) {
        const numerator = a[i][j] * p - a[i][k] * a[k][j];
        assert(numerator % previous === 0n, "Bareiss exact division");
        a[i][j] = numerator / previous;
      }
    }
    previous = p;
  }
  return sign * a[n - 1][n - 1];
}

function cycleMatrix(word) {
  const r = word.length;
  if (r === 1) return [[(1n << BigInt(word[0])) - 3n]];
  const m = Array.from({length: r}, () => Array(r).fill(0n));
  for (let i = 0; i < r; ++i) {
    m[i][i] = -3n;
    m[i][(i + 1) % r] = 1n << BigInt(word[i]);
  }
  return m;
}

function auditWord(word) {
  const base = affine(word);
  if (base.D <= 0n) return false;
  const r = word.length;
  const carries = word.map((_, i) => affine(rotate(word, i)).C);

  for (let i = 0; i < r; ++i) {
    assert((1n << BigInt(word[i])) * carries[(i + 1) % r] ===
      3n * carries[i] + base.D, "rotation identity");
  }

  const g = gcd(base.D, carries[0]);
  const q = base.D / g;
  const p = carries.map(C => C / g);
  for (let i = 0; i < r; ++i) {
    assert(gcd(base.D, carries[i]) === g, "rotation gcd");
    assert(gcd(p[i], q) === 1n, "reduced numerator");
    const rhs = 3n * p[i] + q;
    assert((1n << BigInt(word[i])) * p[(i + 1) % r] === rhs,
      "reduced recurrence");
    assert(v2(rhs) === word[i], "exact reduced valuation");
  }

  let sum = 0n, lhsProduct = 1n, rhsProduct = 1n;
  for (let i = 0; i < r; ++i) {
    const previous = (i + r - 1) % r;
    sum += ((1n << BigInt(word[previous])) - 3n) * p[i];
    lhsProduct *= 3n * p[i] + q;
    rhsProduct *= p[i];
  }
  rhsProduct <<= BigInt(base.N);
  assert(sum === BigInt(r) * q, "global sum identity");
  assert(lhsProduct === rhsProduct, "global product identity");

  const determinant = bareissDet(cycleMatrix(word));
  const expected = (r % 2 === 1 ? 1n : -1n) * base.D;
  assert(determinant === expected, "cyclic determinant");
  if (r >= 2) {
    const diagonalMinor = 3n ** BigInt(r - 1);
    const offDiagonalMinor = 1n << BigInt(base.N - word[0]);
    assert(gcd(diagonalMinor, offDiagonalMinor) === 1n,
      "coprime Smith minors");
  }

  if (!properPower(word)) {
    let least = 0;
    for (let i = 1; i < r; ++i) {
      if (carries[i] < carries[least]) least = i;
    }
    assert(carries.filter(C => C === carries[least]).length === 1,
      "primitive rational states must be distinct");
    const w = rotate(word, least);
    let prefix = 0;
    for (let j = 1; j < r; ++j) {
      prefix += w[j - 1];
      assert((1n << BigInt(base.N - prefix)) >
        3n ** BigInt(r - j), "least-rotation strict suffix record");
    }
  }
  return true;
}

let positiveWords = 0;
function enumerate(length, maxLetter, prefix = []) {
  if (prefix.length === length) {
    if (auditWord(prefix)) ++positiveWords;
    return;
  }
  for (let a = 1; a <= maxLetter; ++a) enumerate(length, maxLetter, prefix.concat(a));
}

for (let r = 1; r <= 7; ++r) enumerate(r, 3);

// Denominator-five primitive, strict-record, large-order prime regression.
const q5word = [1,1,1,1,1,2,1,1,2,1,2,3,2,1,1,1,5];
assert(auditWord(q5word), "q5 universal word audit");
const q5base = affine(q5word);
const q5carries = q5word.map((_, i) => affine(rotate(q5word, i)).C);
const q5g = gcd(q5base.D, q5carries[0]);
const q5q = q5base.D / q5g;
const q5p = q5carries.map(C => C / q5g);
assert(q5base.N === 27 && q5base.D === 5077565n, "q5 D");
assert(q5base.D === 5n * 71n * 14303n, "q5 factorization");
assert(q5carries[0] === 189900931n, "q5 carry");
assert(q5g === 1015513n && q5q === 5n, "q5 reduced denominator");
assert(q5p[0] === 187n && q5p.every(x => x >= q5p[0]), "q5 least state");
assert(q5p.reduce((x, y) => x > y ? x : y) - q5p[0] === 2586n,
  "q5 numerator range");

const prime = 14303n;
assert(q5base.D % prime === 0n && q5carries[0] % prime === 0n,
  "q5 common prime");
assert(powMod(2n, 7151n, prime) === 1n && powMod(3n, 7151n, prime) === 1n,
  "q5 large orders divide 7151");
assert(isPrimeSmall(7151n), "7151 is prime");
assert(powMod(2n, 1n, prime) !== 1n && powMod(3n, 1n, prime) !== 1n,
  "q5 orders are not one");

let A = 0n, inv3power = 1n;
const inv3 = invMod(3n, prime), prefixResidues = [];
for (let i = 0; i < q5word.length; ++i) {
  prefixResidues.push(powMod(2n, A, prime) * inv3power % prime);
  A += BigInt(q5word[i]);
  inv3power = inv3power * inv3 % prime;
}
assert(new Set(prefixResidues.map(String)).size === 17, "distinct prefix residues");
assert(prefixResidues.reduce((s, z) => (s + z) % prime, 0n) === 0n,
  "prefix zero sum");

let rectangleRelations = [];
for (let b = 1n; b <= 17n; ++b) {
  for (let a = 1n; a <= 27n; ++a) {
    if (powMod(2n, a, prime) === powMod(3n, b, prime)) {
      rectangleRelations.push(`${a},${b}`);
    }
  }
}
assert(rectangleRelations.length === 1 && rectangleRelations[0] === "27,17",
  "unique exponent-rectangle relation");

// Jacobi-symbol audit.  These identities are local and do not require a
// periodic orbit, so checking ordinary shortcut edges gives a broad exact
// regression without assuming a nontrivial cycle exists.
function jacobi(a0, n0) {
  let a = mod(a0, n0), n = n0, result = 1;
  assert(n > 0n && (n & 1n) === 1n, "Jacobi odd positive denominator");
  while (a !== 0n) {
    while ((a & 1n) === 0n) {
      a >>= 1n;
      const n8 = Number(n % 8n);
      if (n8 === 3 || n8 === 5) result = -result;
    }
    [a, n] = [n, a];
    if (a % 4n === 3n && n % 4n === 3n) result = -result;
    a %= n;
  }
  return n === 1n ? result : 0;
}

let jacobiEdges = 0;
for (let x = 1n; x <= 20001n; x += 2n) {
  const t = 3n * x + 1n;
  const a = v2(t);
  const y = t >> BigInt(a);
  assert(gcd(x, y) === 1n && y % 3n !== 0n, "edge coprimality");
  const forward = jacobi(y, x);
  const backward = jacobi(x, y);
  const two = jacobi(2n, x) ** a;
  const minusThree = jacobi(-3n, y);
  assert(forward === two, "forward Jacobi identity");
  assert(backward === minusThree, "backward Jacobi identity");
  const epsilonX = x % 4n === 3n ? 1 : 0;
  const epsilonY = y % 4n === 3n ? 1 : 0;
  const reciprocitySign = epsilonX && epsilonY ? -1 : 1;
  assert(forward * backward === reciprocitySign, "quadratic reciprocity");
  assert(epsilonX === (a === 1 ? 1 : 0), "valuation versus residue mod 4");
  assert(minusThree === (a % 2 === 0 ? 1 : -1), "mod-3 character collapse");
  assert(two * minusThree === reciprocitySign, "edgewise Jacobi collapse");
  ++jacobiEdges;
}

console.log(`positive_words_checked=${positiveWords}`);
console.log("rotation_ideal_and_reduced_recurrence_passed=true");
console.log("cyclic_smith_minor_certificate_passed=true");
console.log("least_rotation_strict_record_passed=true");
console.log("global_sum_and_product_identities_passed=true");
console.log(`q5_D=${q5base.D}`);
console.log(`q5_g=${q5g}`);
console.log(`q5_q=${q5q}`);
console.log(`q5_prime=${prime}`);
console.log("q5_orders_2_3=7151,7151");
console.log("q5_prefix_zero_sum_passed=true");
console.log(`jacobi_edges_checked=${jacobiEdges}`);
console.log("edgewise_jacobi_collapse_passed=true");
console.log("universal_single_class_audit_passed=true");
