'use strict';

/*
 * Exact arithmetic certificate for cycle_isolated_anchor_cell.md.
 *
 * The finite scan is only a regression test for the alias classification.
 * The theorem itself is uniform and is proved in the accompanying report.
 */

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function gcd(a, b) {
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

function add(map, exponent, coefficient) {
  map.set(exponent, (map.get(exponent) || 0n) + coefficient);
  if (map.get(exponent) === 0n) map.delete(exponent);
}

function q0LLPolynomial(c1, c2, c3, L) {
  const h = Math.max(c1, c3 - L);
  const bases = [
    [h - c1, 4n],
    [h + L - c2, 3n],
    [h + L - c3, 3n],
  ];
  const P = new Map();
  for (const [e, k] of bases) {
    add(P, e, -k);
    add(P, e + 1, k);
  }
  add(P, h + 1, -4n);
  return { P, h };
}

function oneMFold(P, M) {
  const m = Math.max(...P.keys());
  const Q = Math.floor(m / M);
  const d = m - Q * M;
  const W = new Map();
  for (const [e, coefficient] of P) {
    const q = Math.floor(e / M);
    const s = e - q * M;
    add(W, s, coefficient * 9n ** BigInt(q) * 8n ** BigInt(Q - q));
  }
  let energy = 0n;
  for (const coefficient of W.values()) energy += coefficient * coefficient;
  return { W, m, Q, d, energy };
}

function signature(W) {
  return [...W.values()]
    .map(Number)
    .sort((a, b) => a - b)
    .join(',');
}

const highEnergySignatures = new Set([
  '-95,-27,27,59',
  '-87,-32,32,51',
  '-63,-59,27,59',
  '-83,-32,32,51',
  '-59,-59,27,59',
  '-60,-59,24,59',
]);

// The two rational root-radius estimates used in the upper strip.
assert(81n ** 3n * 5n ** 4n < 64n ** 3n * 6n ** 4n,
  '(81/64)^(3/4) < 6/5 failed');
assert(13964n * 81n < 17674n * 64n,
  'low-strip weighted energy bound failed');
assert(11000n * 81n < 14325n * 64n,
  'upper-strip low-energy bound failed');

// Each row is [low coefficient at 0, low coefficient at 1,
//               high coefficient at u, high coefficient at u+1],
// where u is either d-1 or d.
const exceptionalRows = [
  [95n, 59n, 27n, 27n],
  [32n, 32n, 87n, 51n],
  [59n, 59n, 63n, 27n],
  [32n, 32n, 83n, 51n],
  [59n, 59n, 59n, 27n],
  [60n, 24n, 59n, 59n],
];

for (const [a0, a1, b0, b1] of exceptionalRows) {
  // x <= 64/63, x^u < 6/5, and x^(u+1) < (6/5)(64/63).
  // Clear the common denominator 315 = 5*63.
  const numerator =
    315n * a0 * a0 +
    320n * a1 * a1 +
    378n * b0 * b0 +
    384n * b1 * b1;
  assert(numerator < 14325n * 315n,
    `exceptional weighted row failed: ${[a0, a1, b0, b1]}`);
}

// Exact exponential comparisons. They imply a uniform base below 374/125.
const lowStripComparison =
  (8n ** 73n * 17674n ** 50n) ** 171n * 125n ** 100000n <
  374n ** 100000n;
const upperStripComparison =
  (8n ** 3n * 14325n ** 2n) ** 171n * 125n ** 4000n <
  374n ** 4000n;
const degreeZeroComparison =
  (64n * 137n) ** 171n * 125n ** 2000n <
  374n ** 2000n;
assert(lowStripComparison, 'low-strip exponential comparison failed');
assert(upperStripComparison, 'upper-strip exponential comparison failed');
assert(degreeZeroComparison, 'Q=0 exponential comparison failed');

// The period-barrier endpoint has log(r) < 26 because e > 19/7.
const periodBarrier = 72057431991n;
assert(19n ** 26n > periodBarrier * 7n ** 26n,
  'period endpoint logarithm comparison failed');
assert(periodBarrier > 375n * 371n,
  'period endpoint determinant comparison failed');

// The central direct-norm cell.
assert(periodBarrier > 3000000n, 'central-cell radius threshold failed');
assert(397n ** 3n > 4n * 250n ** 3n, 'cube root of 4 bound failed');
assert(283n ** 2n > 2n * 200n ** 2n, 'square root of 2 bound failed');
assert(63n ** 3n > 2n * 50n ** 3n, 'cube root of 2 bound failed');

const centralADen = 250n * 1000000n;
const centralANum = 397n * 1000001n;
const centralBDen = 40n * 1000000n;
const centralBNum = 147n * 2000001n;
const centralLeftNum = centralANum * centralBDen + centralBNum * centralADen;
const centralLeftDen = centralADen * centralBDen;
assert(centralLeftNum * 125n ** 2n < centralLeftDen * 374n ** 2n,
  'central direct-norm comparison failed');

// Regression scan. It checks the structural energy lemma and the exceptional
// signature list on every isolated triple at r=151. No floating point enters.
const r = 151;
const N = 240; // ceil(151 log_2(3))
const B = N - r;
const L = r - B;
const M = B - L;
assert([B, L, M].join(',') === '89,62,27', 'regression parameters changed');

let isolatedTriples = 0;
let anchorCellTriples = 0;
let q0LLQ1Triples = 0;
let upperStripTriples = 0;
let maxUnweightedEnergy = 0n;
let highEnergyRows = 0;

for (let c1 = 1; c1 < B; c1++) {
  for (let c2 = c1 + 1; c2 < B; c2++) {
    for (let c3 = c2 + 1; c3 < B; c3++) {
      if (c2 - c1 === L || c3 - c2 === L || c3 - c1 === L) continue;
      isolatedTriples++;
      const { P } = q0LLPolynomial(c1, c2, c3, L);
      const folded = oneMFold(P, M);
      if (4 * folded.m < 7 * M) anchorCellTriples++;
      if (folded.Q !== 1 || 4 * folded.d >= 3 * M) continue;
      q0LLQ1Triples++;
      assert(folded.energy <= 13964n,
        `unweighted energy exceeded at ${c1},${c2},${c3}`);
      if (folded.energy > maxUnweightedEnergy) maxUnweightedEnergy = folded.energy;
      if (100 * folded.d > 73 * M) {
        upperStripTriples++;
        if (folded.energy > 11000n) {
          highEnergyRows++;
          assert(highEnergySignatures.has(signature(folded.W)),
            `missing exceptional signature at ${c1},${c2},${c3}`);
          const support = [...folded.W.keys()].sort((a, b) => a - b);
          const leftLocation =
            support.length === 4 &&
            support[0] === 0 && support[1] === 1 &&
            support[2] === folded.d - 1 && support[3] === folded.d;
          const rightLocation =
            support.length === 4 &&
            support[0] === 0 && support[1] === 1 &&
            support[2] === folded.d && support[3] === folded.d + 1;
          assert(leftLocation || rightLocation,
            `missing exceptional location at ${c1},${c2},${c3}`);
        }
      }
    }
  }
}

assert(maxUnweightedEnergy === 13964n, 'sharp energy value was not attained');
assert(anchorCellTriples === 54825, 'anchor-cell regression count changed');

console.log(`isolated_triples_r151=${isolatedTriples}`);
console.log(`q0LL_anchor_cell_4m_lt_7M=${anchorCellTriples}`);
console.log(`q0LL_Q1_d_lt_3M_over_4=${q0LLQ1Triples}`);
console.log(`upper_strip_triples=${upperStripTriples}`);
console.log(`upper_strip_high_energy_occurrences=${highEnergyRows}`);
console.log(`exceptional_signature_count=${highEnergySignatures.size}`);
console.log(`sharp_unweighted_energy=${maxUnweightedEnergy}`);
console.log(`low_strip_base_lt_374_over_125=${lowStripComparison}`);
console.log(`upper_strip_base_lt_374_over_125=${upperStripComparison}`);
console.log(`degree_zero_base_lt_374_over_125=${degreeZeroComparison}`);
console.log('central_direct_norm_base_lt_374_over_125=true');
console.log('isolated_anchor_cell_certificate_passed=true');
