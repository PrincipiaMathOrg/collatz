#!/usr/bin/env node
"use strict";

// Exact certificate for the q=2, b=1, T=4 height-transition sector.
//
// There are three run-level shapes:
//   01010, 01210, 01230.
// For each shape we split the five run lengths as
//   (m0,m1) | m2 | (m3,m4).
// The middle length is recovered from the weight.  Thus the finite search
// enumerates only quadratic half-profiles.  Exact dyadic residue buckets
// answer the circular target query without sorting or enumerating the
// quartic collection of raw profiles.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function mod(a, m) {
  const value = a % m;
  return value < 0n ? value + m : value;
}

function inverse(a, m) {
  let oldR = a;
  let r = m;
  let oldS = 1n;
  let s = 0n;
  while (r !== 0n) {
    const q = oldR / r;
    [oldR, r] = [r, oldR - q * r];
    [oldS, s] = [s, oldS - q * s];
  }
  assert(oldR === 1n, "inverse does not exist");
  return mod(oldS, m);
}

function bitLength(n) {
  assert(n > 0n, "bit length requires a positive integer");
  return n.toString(2).length;
}

const SHAPES = [
  {
    name: "01010",
    levels: [0, 1, 0, 1, 0],
    levelSum: 2,
    analyticStart: 1708,
    analyticPower: 14,
    leftKind: "twoPlateau",
    rightKind: "twoPlateau",
    leftSecondRise: false,
    rightRise: true
  },
  {
    name: "01210",
    levels: [0, 1, 2, 1, 0],
    levelSum: 4,
    analyticStart: 1712,
    analyticPower: 18,
    leftKind: "mountain",
    rightKind: "downMountain",
    leftSecondRise: true,
    rightRise: false
  },
  {
    name: "01230",
    levels: [0, 1, 2, 3, 0],
    levelSum: 6,
    analyticStart: 1717,
    analyticPower: 22,
    leftKind: "mountain",
    rightKind: "upMountain",
    leftSecondRise: true,
    rightRise: true
  }
];

function analyticCutoffs() {
  for (const shape of SHAPES) {
    assert(shape.analyticPower === 10 + 2 * shape.levelSum,
      `analytic power mismatch for ${shape.name}`);
    const start = BigInt(shape.analyticStart);
    const constant = 2n ** BigInt(shape.analyticPower) * 307n ** 10n;
    assert(2n ** start > constant * start ** 150n,
      `analytic cutoff base failed for ${shape.name}`);
    assert(2n ** (start - 1n) <=
      constant * (start - 1n) ** 150n,
    `analytic cutoff split changed for ${shape.name}`);
    assert(2n * start ** 150n > (start + 1n) ** 150n,
      `analytic cutoff propagation failed for ${shape.name}`);
  }
}

function maximumRunEdges(level, weight) {
  // Exact largest m satisfying
  //   2^floor(m/2) < 2^level * 307 * weight^15.
  const bound = (1n << BigInt(level)) * 307n * BigInt(weight) ** 15n;
  const largestExponent = bitLength(bound - 1n) - 1;
  const result = 2 * largestExponent + 1;
  assert((1n << BigInt(Math.floor(result / 2))) < bound,
    "included run edge violates return bound");
  assert((1n << BigInt(Math.floor((result + 1) / 2))) >= bound,
    "run edge maximum is not sharp");
  return result;
}

function shapeFromLevels(levels) {
  const name = levels.join("");
  return SHAPES.find(shape => shape.name === name) || null;
}

function transitionRegression(maxWeight) {
  let power = 1n;
  const B = [0];
  for (let i = 1; i < maxWeight; ++i) {
    power *= 3n;
    B.push(bitLength(power) - 1);
  }

  const totals = Object.fromEntries(SHAPES.map(shape => [shape.name, 0]));

  for (let weight = 5; weight <= maxWeight; ++weight) {
    const brute = new Set();
    const height = [0];

    function inspect() {
      const levels = [height[0]];
      const starts = [0];
      for (let i = 1; i < weight; ++i) {
        if (height[i] !== height[i - 1]) {
          levels.push(height[i]);
          starts.push(i);
        }
      }
      if (levels.length !== 5) return;
      const shape = shapeFromLevels(levels);
      assert(shape !== null,
        `unclassified T=4 levels ${levels.join(",")} at weight ${weight}`);
      const J = starts[1];
      const L = starts[2];
      const R = starts[3];
      const K = starts[4] - 1;
      brute.add(`${shape.name}:${J},${L},${R},${K}`);
    }

    function extend(i) {
      if (i === weight - 2) {
        const gap = B[weight - 1] - B[weight - 2];
        if (height[i] + gap - 1 >= 0) {
          height.push(0);
          inspect();
          height.pop();
        }
        return;
      }
      const gap = B[i + 1] - B[i];
      const maximum = height[i] + gap - 1;
      for (let next = 0; next <= maximum; ++next) {
        height.push(next);
        extend(i + 1);
        height.pop();
      }
    }

    extend(0);

    const classified = new Set();
    for (const shape of SHAPES) {
      for (let J = 1; J <= weight - 4; ++J) {
        if (B[J] - B[J - 1] !== 2) continue;
        for (let L = J + 1; L <= weight - 3; ++L) {
          if (shape.leftSecondRise && B[L] - B[L - 1] !== 2) {
            continue;
          }
          for (let R = L + 1; R <= weight - 2; ++R) {
            if (shape.rightRise && B[R] - B[R - 1] !== 2) continue;
            for (let K = R; K <= weight - 2; ++K) {
              classified.add(`${shape.name}:${J},${L},${R},${K}`);
            }
          }
        }
      }
    }

    assert(brute.size === classified.size,
      `T=4 classification count mismatch at weight ${weight}`);
    for (const key of brute) {
      assert(classified.has(key),
        `T=4 classification omission at weight ${weight}: ${key}`);
    }

    const gapTwo = Array(weight).fill(false);
    for (let i = 1; i < weight; ++i) {
      gapTwo[i] = B[i] - B[i - 1] === 2;
    }
    for (const shape of SHAPES) {
      let directShapeCount = 0n;
      for (const key of classified) {
        if (key.startsWith(`${shape.name}:`)) ++directShapeCount;
      }
      assert(completeProfileCount(shape, weight, gapTwo) ===
        directShapeCount,
      `compressed profile count mismatch for ${shape.name} at ${weight}`);
    }

    let C0 = 0n;
    const U = Array(weight).fill(0n);
    const V = Array(weight).fill(0n);
    const W = Array(weight).fill(0n);
    for (let i = 0; i < weight; ++i) {
      const cell = (1n << BigInt(B[i])) *
        3n ** BigInt(weight - 1 - i);
      C0 += cell;
      if (i > 0) U[i] = U[i - 1];
      if (i > 0) V[i] = V[i - 1];
      if (i > 0) W[i] = W[i - 1];
      if (B[i] >= 1) U[i] += cell >> 1n;
      if (B[i] >= 2) V[i] += cell >> 2n;
      if (B[i] >= 3) W[i] += cell >> 3n;
    }

    for (const key of classified) {
      const [shapeName, indices] = key.split(":");
      const [J, L, R, K] = indices.split(",").map(Number);
      let directCarry = 0n;
      for (let i = 0; i < weight; ++i) {
        let h = 0;
        if (shapeName === "01010") {
          h = (J <= i && i < L) || (R <= i && i <= K) ? 1 : 0;
        } else if (shapeName === "01210") {
          h = J <= i && i < L ? 1 :
            L <= i && i < R ? 2 : R <= i && i <= K ? 1 : 0;
        } else {
          h = J <= i && i < L ? 1 :
            L <= i && i < R ? 2 : R <= i && i <= K ? 3 : 0;
        }
        directCarry += (1n << BigInt(B[i] - h)) *
          3n ** BigInt(weight - 1 - i);
      }

      let formulaCarry;
      if (shapeName === "01010") {
        formulaCarry = C0 + U[J - 1] - U[L - 1] +
          U[R - 1] - U[K];
      } else if (shapeName === "01210") {
        formulaCarry = C0 + U[J - 1] - U[K] +
          V[L - 1] - V[R - 1];
      } else {
        formulaCarry = C0 + U[J - 1] - U[K] +
          V[L - 1] - V[K] + W[R - 1] - W[K];
      }
      assert(directCarry === formulaCarry,
        `T=4 carry mismatch at weight ${weight}: ${key}`);
      ++totals[shapeName];
    }
  }

  return totals;
}

function bucketParameters(width) {
  let bucketSize = 1n;
  let shift = 0;
  while (bucketSize <= width) {
    bucketSize <<= 1n;
    ++shift;
  }
  return {bucketSize, shift, shiftBig: BigInt(shift)};
}

function addBucket(buckets, key, record) {
  const old = buckets.get(key);
  if (old === undefined) {
    buckets.set(key, record);
  } else if (old.records !== undefined) {
    old.records.push(record);
  } else {
    buckets.set(key, {records: [old, record]});
  }
}

function visitBucketValue(value, visitor) {
  if (value === undefined) return;
  if (value.records !== undefined) {
    for (const record of value.records) visitor(record);
  } else {
    visitor(value);
  }
}

function circularBucketVisit(buckets, endpoint, width, modulus,
  shiftBig, visitor) {
  assert(0n <= endpoint && endpoint < modulus, "bad circular endpoint");
  assert(0n <= width && width < modulus, "bad circular width");

  const keys = [];
  function includeKey(key) {
    for (const old of keys) if (old === key) return;
    keys.push(key);
  }
  function includeInterval(lo, hi) {
    assert(0n <= lo && lo <= hi && hi < modulus,
      "bad linear circular-query interval");
    const first = lo >> shiftBig;
    const last = hi >> shiftBig;
    assert(last - first <= 1n,
      "dyadic bucket is not wider than the target interval");
    includeKey(first);
    if (last !== first) includeKey(last);
  }

  if (endpoint >= width) {
    includeInterval(endpoint - width, endpoint);
  } else {
    includeInterval(0n, endpoint);
    includeInterval(modulus - (width - endpoint), modulus - 1n);
  }
  for (const key of keys) visitBucketValue(buckets.get(key), visitor);
}

function circularBucketRegression() {
  let cases = 0;
  for (let modulusNumber = 2; modulusNumber <= 57; ++modulusNumber) {
    const modulus = BigInt(modulusNumber);
    for (let widthNumber = 0; widthNumber < modulusNumber; ++widthNumber) {
      const width = BigInt(widthNumber);
      const {shiftBig} = bucketParameters(width);
      const records = [];
      const buckets = new Map();
      for (let residueNumber = 0; residueNumber < modulusNumber;
        ++residueNumber) {
        if ((residueNumber * residueNumber + 3 * residueNumber +
          5 * widthNumber) % 13 >= 6) continue;
        const record = {residue: BigInt(residueNumber), id: residueNumber};
        records.push(record);
        addBucket(buckets, record.residue >> shiftBig, record);
      }
      for (let endpointNumber = 0; endpointNumber < modulusNumber;
        ++endpointNumber) {
        const endpoint = BigInt(endpointNumber);
        const fast = [];
        circularBucketVisit(buckets, endpoint, width, modulus, shiftBig,
          record => {
            if (mod(endpoint - record.residue, modulus) <= width) {
              fast.push(record.id);
            }
          });
        fast.sort((a, b) => a - b);
        const brute = records.filter(record =>
          mod(endpoint - record.residue, modulus) <= width)
          .map(record => record.id).sort((a, b) => a - b);
        assert(fast.join(",") === brute.join(","),
          `circular bucket mismatch modulo ${modulusNumber}`);
        ++cases;
      }
    }
  }
  return cases;
}

function completeProfileCount(shape, weight, gapTwo) {
  const totalInternal = weight - 5;
  const left = Array(totalInternal + 1).fill(0);
  const right = Array(totalInternal + 1).fill(0);
  let risingPrefix = 0;
  for (let p = 0; p <= totalInternal; ++p) {
    if (gapTwo[p + 1]) ++risingPrefix;
    left[p] = shape.leftSecondRise && !gapTwo[p + 2] ? 0 : risingPrefix;
  }
  for (let q = 0; q <= totalInternal; ++q) {
    const R = weight - q - 2;
    right[q] = shape.rightRise && !gapTwo[R] ? 0 : q + 1;
  }
  const prefixRight = [];
  let running = 0n;
  for (let q = 0; q <= totalInternal; ++q) {
    running += BigInt(right[q]);
    prefixRight[q] = running;
  }
  let count = 0n;
  for (let p = 0; p <= totalInternal; ++p) {
    if (left[p] !== 0) {
      count += BigInt(left[p]) * prefixRight[totalInternal - p];
    }
  }
  return count;
}

function buildLeftRecords(shape, weight, totalInternal, runMax, gapTwo,
  U, V, modulus) {
  const records = [];
  const counts = Array(totalInternal + 1).fill(0);
  const m0Max = Math.min(runMax[0], totalInternal);
  for (let m0 = 0; m0 <= m0Max; ++m0) {
    const J = m0 + 1;
    if (!gapTwo[J]) continue;
    const m1Max = Math.min(runMax[1], totalInternal - m0);
    for (let m1 = 0; m1 <= m1Max; ++m1) {
      const p = m0 + m1;
      const L = p + 2;
      if (shape.leftSecondRise && !gapTwo[L]) continue;
      const residue = shape.leftKind === "twoPlateau" ?
        mod(U[m0] - U[p + 1], modulus) :
        mod(U[m0] + V[p + 1], modulus);
      records.push({p, residue, m0, m1});
      ++counts[p];
    }
  }
  return {records, counts};
}

function buildRightRecords(shape, weight, totalInternal, runMax, gapTwo,
  U, V, W, modulus) {
  const records = [];
  const counts = Array(totalInternal + 1).fill(0);
  const m3Max = Math.min(runMax[3], totalInternal);
  for (let m3 = 0; m3 <= m3Max; ++m3) {
    const m4Max = Math.min(runMax[4], totalInternal - m3);
    for (let m4 = 0; m4 <= m4Max; ++m4) {
      const q = m3 + m4;
      const R = weight - q - 2;
      if (shape.rightRise && !gapTwo[R]) continue;
      const K = weight - m4 - 2;
      let residue;
      if (shape.rightKind === "twoPlateau") {
        residue = mod(U[K] - U[R - 1], modulus);
      } else if (shape.rightKind === "downMountain") {
        residue = mod(U[K] + V[R - 1], modulus);
      } else {
        residue = mod(U[K] + V[K] + W[K] - W[R - 1], modulus);
      }
      records.push({q, residue, m3, m4});
      ++counts[q];
    }
  }
  return {records, counts};
}

function returnAdmissibleCount(leftCounts, rightCounts, totalInternal,
  middleMaximum) {
  const prefix = [];
  let running = 0n;
  for (let q = 0; q < rightCounts.length; ++q) {
    running += BigInt(rightCounts[q]);
    prefix[q] = running;
  }
  function rangeSum(lo, hi) {
    if (lo > hi || hi < 0 || lo >= rightCounts.length) return 0n;
    lo = Math.max(lo, 0);
    hi = Math.min(hi, rightCounts.length - 1);
    return prefix[hi] - (lo === 0 ? 0n : prefix[lo - 1]);
  }
  let result = 0n;
  for (let p = 0; p < leftCounts.length; ++p) {
    if (leftCounts[p] === 0) continue;
    const qLo = totalInternal - middleMaximum - p;
    const qHi = totalInternal - p;
    result += BigInt(leftCounts[p]) * rangeSum(qLo, qHi);
  }
  return result;
}

function directCarryAndAudit(shape, hit, context) {
  const {weight, B, powers3, C0, M, D} = context;
  const {m0, m1, m2, m3, m4, d} = hit;
  assert(m0 + m1 + m2 + m3 + m4 === weight - 5,
    "hit has inconsistent run lengths");
  const J = m0 + 1;
  const L = J + m1 + 1;
  const R = L + m2 + 1;
  const K = R + m3;
  assert(K === weight - m4 - 2, "hit endpoint mismatch");

  let carry = 0n;
  const heights = [];
  for (let i = 0; i < weight; ++i) {
    let h = 0;
    if (shape.name === "01010") {
      h = (J <= i && i < L) || (R <= i && i <= K) ? 1 : 0;
    } else if (shape.name === "01210") {
      h = J <= i && i < L ? 1 :
        L <= i && i < R ? 2 : R <= i && i <= K ? 1 : 0;
    } else {
      h = J <= i && i < L ? 1 :
        L <= i && i < R ? 2 : R <= i && i <= K ? 3 : 0;
    }
    heights.push(h);
    const exponent = B[i] - h;
    assert(exponent >= 0, "negative exponent in formal hit");
    if (i > 0) {
      assert(B[i - 1] - heights[i - 1] < exponent,
        "formal hit is not strictly anchored");
    }
    carry += (1n << BigInt(exponent)) * powers3[weight - 1 - i];
  }
  assert(carry > 0n && carry <= C0, "bad direct carry");
  const numerator = carry - M * d;
  assert(numerator % D === 0n, "reported formal hit is not integral");
  const n = numerator / D;
  assert(n % 2n !== 0n, "integral target seed is not odd");
  return {J, L, R, K, carry, n};
}

function emptyShapeStats() {
  return {
    q2Weights: 0,
    completeProfiles: 0n,
    returnAdmissibleProfiles: 0n,
    leftRecords: 0n,
    rightRecords: 0n,
    bucketQueries: 0n,
    bucketCandidateChecks: 0n,
    residueMiddleCompatiblePairs: 0n,
    strictFormalHits: 0n,
    equalityFormalHits: 0n,
    positiveOddHits: 0n,
    firstFormalHit: null
  };
}

function finiteResidues(maxWeight) {
  const powers3 = [1n];
  const B = [0];
  for (let i = 1; i <= maxWeight; ++i) {
    powers3.push(powers3[i - 1] * 3n);
    B.push(bitLength(powers3[i]) - 1);
  }

  const stats = Object.fromEntries(
    SHAPES.map(shape => [shape.name, emptyShapeStats()]));
  let P = 1n;
  let previousN = 0;
  let C0 = 0n;

  for (let weight = 1; weight <= maxWeight; ++weight) {
    C0 = 3n * C0 + (1n << BigInt(B[weight - 1]));
    P *= 3n;
    assert(P === powers3[weight], "power recurrence changed");
    const N = bitLength(P);
    const increment = N - previousN;
    previousN = N;
    if (increment !== 1 || weight < 5) continue;

    assert(B[weight - 1] === N - 2,
      `b=1 endpoint identity failed at weight ${weight}`);
    const terminalDelay = N - weight - 1;
    assert(terminalDelay >= 1,
      `unexpected empty b=1 delay range at weight ${weight}`);
    const dMax = BigInt(Math.floor((terminalDelay + 1) / 2));
    const M = 1n << BigInt(N);
    const D = M - P;
    assert(dMax < D, `target interval too long at weight ${weight}`);
    const invM = inverse(M, D);
    const tau0 = mod(C0 * invM, D);
    const totalInternal = weight - 5;

    const gapTwo = Array(weight).fill(false);
    for (let i = 1; i < weight; ++i) {
      const gap = B[i] - B[i - 1];
      assert(gap === 1 || gap === 2, "nonbinary mechanical gap");
      gapTwo[i] = gap === 2;
    }

    const U = Array(weight).fill(0n);
    const V = Array(weight).fill(0n);
    const W = Array(weight).fill(0n);
    for (let i = 1; i <= weight - 2; ++i) {
      U[i] = U[i - 1];
      V[i] = V[i - 1];
      W[i] = W[i - 1];
      const cell = (1n << BigInt(B[i])) * powers3[weight - 1 - i];
      if (B[i] >= 1) U[i] = mod(U[i] + mod((cell >> 1n) * invM, D), D);
      if (B[i] >= 2) V[i] = mod(V[i] + mod((cell >> 2n) * invM, D), D);
      if (B[i] >= 3) W[i] = mod(W[i] + mod((cell >> 3n) * invM, D), D);
    }

    const runMaximum = [0, 1, 2, 3].map(level =>
      maximumRunEdges(level, weight));
    const {shiftBig} = bucketParameters(dMax);

    for (const shape of SHAPES) {
      if (weight >= shape.analyticStart) continue;
      const shapeStats = stats[shape.name];
      ++shapeStats.q2Weights;
      shapeStats.completeProfiles +=
        completeProfileCount(shape, weight, gapTwo);

      const runMax = shape.levels.map(level => runMaximum[level]);
      const left = buildLeftRecords(shape, weight, totalInternal, runMax,
        gapTwo, U, V, D);
      const right = buildRightRecords(shape, weight, totalInternal, runMax,
        gapTwo, U, V, W, D);
      shapeStats.leftRecords += BigInt(left.records.length);
      shapeStats.rightRecords += BigInt(right.records.length);
      shapeStats.returnAdmissibleProfiles += returnAdmissibleCount(
        left.counts, right.counts, totalInternal, runMax[2]);

      const buckets = new Map();
      for (const record of right.records) {
        addBucket(buckets, record.residue >> shiftBig, record);
      }

      for (const leftRecord of left.records) {
        ++shapeStats.bucketQueries;
        const endpoint = mod(tau0 + leftRecord.residue, D);
        circularBucketVisit(buckets, endpoint, dMax, D, shiftBig,
          rightRecord => {
            ++shapeStats.bucketCandidateChecks;
            const d = mod(endpoint - rightRecord.residue, D);
            if (d > dMax) return;
            const m2 = totalInternal - leftRecord.p - rightRecord.q;
            if (m2 < 0 || m2 > runMax[2]) return;
            ++shapeStats.residueMiddleCompatiblePairs;
            if (d === 0n) ++shapeStats.equalityFormalHits;
            else ++shapeStats.strictFormalHits;

            const audit = directCarryAndAudit(shape, {
              m0: leftRecord.m0,
              m1: leftRecord.m1,
              m2,
              m3: rightRecord.m3,
              m4: rightRecord.m4,
              d
            }, {weight, B, powers3, C0, M, D});
            if (audit.n > 0n) ++shapeStats.positiveOddHits;
            if (shapeStats.firstFormalHit === null) {
              shapeStats.firstFormalHit = {
                weight,
                N,
                J: audit.J,
                L: audit.L,
                R: audit.R,
                K: audit.K,
                d: d.toString(),
                n: audit.n.toString(),
                dMax: dMax.toString(),
                D: D.toString()
              };
            }
          });
      }
    }
  }

  return stats;
}

function printShapeStats(shape, stats) {
  const prefix = `shape_${shape.name}`;
  console.log(`${prefix}_finite_max_s=${shape.analyticStart - 1}`);
  console.log(`${prefix}_q2_weights=${stats.q2Weights}`);
  console.log(`${prefix}_complete_profiles=${stats.completeProfiles}`);
  console.log(`${prefix}_return_admissible_profiles=${
    stats.returnAdmissibleProfiles}`);
  console.log(`${prefix}_mitm_left_records=${stats.leftRecords}`);
  console.log(`${prefix}_mitm_right_records=${stats.rightRecords}`);
  console.log(`${prefix}_bucket_queries=${stats.bucketQueries}`);
  console.log(`${prefix}_bucket_candidate_checks=${
    stats.bucketCandidateChecks}`);
  console.log(`${prefix}_residue_middle_compatible_pairs=${
    stats.residueMiddleCompatiblePairs}`);
  console.log(`${prefix}_strict_formal_hits=${stats.strictFormalHits}`);
  console.log(`${prefix}_equality_formal_hits=${stats.equalityFormalHits}`);
  console.log(`${prefix}_positive_odd_hits=${stats.positiveOddHits}`);
  if (stats.firstFormalHit !== null) {
    console.log(`${prefix}_first_formal_hit=${
      JSON.stringify(stats.firstFormalHit)}`);
  }
}

function verifyExpectedStats(stats, regression, circularCases) {
  const expected = {
    "01010": {
      q2Weights: 707,
      completeProfiles: 17013451570278n,
      returnAdmissibleProfiles: 436643358626n,
      leftRecords: 33978234n,
      rightRecords: 34068922n
    },
    "01210": {
      q2Weights: 709,
      completeProfiles: 17237381973498n,
      returnAdmissibleProfiles: 442648405076n,
      leftRecords: 19932450n,
      rightRecords: 58492134n
    },
    "01230": {
      q2Weights: 711,
      completeProfiles: 10215679532005n,
      returnAdmissibleProfiles: 262470996608n,
      leftRecords: 20011650n,
      rightRecords: 34736620n
    }
  };
  for (const shape of SHAPES) {
    const actual = stats[shape.name];
    const wanted = expected[shape.name];
    for (const field of ["q2Weights", "completeProfiles",
      "returnAdmissibleProfiles", "leftRecords", "rightRecords"]) {
      assert(actual[field] === wanted[field],
        `${shape.name} coverage count changed at ${field}`);
    }
    assert(actual.bucketQueries === actual.leftRecords,
      `${shape.name} bucket query coverage changed`);
    assert(actual.bucketCandidateChecks === 0n,
      `${shape.name} dyadic residue buckets intersect`);
    assert(actual.residueMiddleCompatiblePairs === 0n,
      `${shape.name} formal target residue found`);
    assert(actual.strictFormalHits === 0n,
      `${shape.name} strict formal target found`);
    assert(actual.equalityFormalHits === 0n,
      `${shape.name} equality formal target found`);
    assert(actual.positiveOddHits === 0n,
      `${shape.name} positive odd target found`);
  }
  assert(regression["01010"] === 187,
    "01010 transition regression count changed");
  assert(regression["01210"] === 130,
    "01210 transition regression count changed");
  assert(regression["01230"] === 63,
    "01230 transition regression count changed");
  assert(circularCases === 63364,
    "circular bucket regression coverage changed");
}

function main() {
  analyticCutoffs();
  const regression = transitionRegression(12);
  const circularCases = circularBucketRegression();
  const maxWeight = Math.max(...SHAPES.map(shape =>
    shape.analyticStart - 1));
  const stats = finiteResidues(maxWeight);

  verifyExpectedStats(stats, regression, circularCases);

  for (const shape of SHAPES) printShapeStats(shape, stats[shape.name]);
  console.log(`regression_01010_profiles=${regression["01010"]}`);
  console.log(`regression_01210_profiles=${regression["01210"]}`);
  console.log(`regression_01230_profiles=${regression["01230"]}`);
  console.log(`circular_bucket_regression_cases=${circularCases}`);
  console.log("transition_regression=true");
  console.log("carry_regression=true");
  console.log("circular_bucket_regression=true");
  console.log("analytic_bases=true");
  console.log("analytic_propagations=true");

  let positiveHits = 0n;
  for (const shape of SHAPES) {
    positiveHits += stats[shape.name].positiveOddHits;
  }
  assert(positiveHits === 0n,
    "positive odd q=2, b=1, T=4 target found");
  console.log("transition_four_profiles_excluded_all_depth=true");
}

main();
