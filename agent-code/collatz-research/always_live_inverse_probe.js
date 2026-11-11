"use strict";

const assert = require("assert");

function pow(base, exponent) {
  let out = 1n;
  for (let i = 0; i < exponent; i++) out *= base;
  return out;
}

function valuation2(x) {
  let exponent = 0;
  while ((x & 1n) === 0n) {
    x >>= 1n;
    exponent++;
  }
  return exponent;
}

function alwaysLiveStep(x) {
  assert(x > 0n && (x & 1n) === 1n && x % 3n !== 0n);
  const residue = Number(x % 9n);
  let exponent;
  let repaired;

  switch (residue) {
    case 2:
    case 8:
      exponent = 1;
      repaired = false;
      break;
    case 1:
    case 4:
      exponent = 2;
      repaired = false;
      break;
    case 5:
      exponent = 3;
      repaired = true;
      break;
    case 7:
      exponent = 4;
      repaired = true;
      break;
    default:
      throw new Error("unexpected unit residue " + residue);
  }

  const y = ((1n << BigInt(exponent)) * x - 1n) / 3n;
  assert(y > 0n && (y & 1n) === 1n && y % 3n !== 0n);
  assert.strictEqual(valuation2(3n * y + 1n), exponent);
  assert.strictEqual((3n * y + 1n) >> BigInt(exponent), x);

  const baseExponent = residue % 3 === 2 ? 1 : 2;
  assert.strictEqual(exponent, baseExponent + (repaired ? 2 : 0));
  return { y, exponent, baseExponent, repaired, residue };
}

function itinerary(x, depth) {
  const exponents = [];
  const residues = [];
  let exponentSum = 0;
  let baseTwoCount = 0;
  let repairCount = 0;
  const start = x;

  for (let step = 0; step < depth; step++) {
    const next = alwaysLiveStep(x);
    residues.push(next.residue);
    exponents.push(next.exponent);
    exponentSum += next.exponent;
    if (next.baseExponent === 2) baseTwoCount++;
    if (next.repaired) repairCount++;
    x = next.y;

    const lhs = pow(3n, step + 1) * x;
    const rhs = pow(2n, exponentSum) * start;
    assert(lhs < rhs);
  }

  assert.strictEqual(exponentSum, depth + baseTwoCount + 2 * repairCount);
  return {
    end: x,
    exponents,
    residues,
    exponentSum,
    baseTwoCount,
    repairCount,
  };
}

function residueTable() {
  const expected = new Map([
    [1, [2, false]],
    [2, [1, false]],
    [4, [2, false]],
    [5, [3, true]],
    [7, [4, true]],
    [8, [1, false]],
  ]);

  for (const [residue, [exponent, repaired]] of expected) {
    const oddRepresentative = residue % 2 === 0 ? residue + 9 : residue;
    const result = alwaysLiveStep(BigInt(oddRepresentative));
    assert.strictEqual(result.exponent, exponent);
    assert.strictEqual(result.repaired, repaired);
  }
  return expected;
}

function cylinderAudit(maxDepth) {
  const rows = [];
  for (let depth = 1; depth <= maxDepth; depth++) {
    const modulus = 2n * pow(3n, depth + 1);
    let classes = 0;
    let totalRepairs = 0;
    let totalBaseTwos = 0;
    const words = new Set();

    for (let residue = 1n; residue < modulus; residue += 2n) {
      if (residue % 3n === 0n) continue;
      const first = itinerary(residue, depth);
      const second = itinerary(residue + modulus, depth);
      assert.deepStrictEqual(second.exponents, first.exponents);
      assert.deepStrictEqual(second.residues, first.residues);
      classes++;
      totalRepairs += first.repairCount;
      totalBaseTwos += first.baseTwoCount;
      words.add(first.exponents.join(""));
    }

    assert.strictEqual(classes, 2 * 3 ** depth);
    assert.strictEqual(words.size, 4 * 3 ** (depth - 1));
    assert.strictEqual(totalRepairs, (classes * depth) / 3);
    assert.strictEqual(
      totalBaseTwos,
      (classes * (4 * depth - 1)) / 6,
    );
    rows.push({
      depth,
      classes,
      words: words.size,
      meanBaseTwos: totalBaseTwos / (classes * depth),
      meanRepairs: totalRepairs / (classes * depth),
    });
  }
  return rows;
}

function movingNoRepairAudit(maxM) {
  const rows = [];
  for (let m = 1; m <= maxM; m++) {
    const depth = 2 * m;
    const endpoint = 2n * pow(9n, m) - 1n;
    const expectedSeed = pow(2n, depth + 1) - 1n;
    const run = itinerary(endpoint, depth);

    assert(run.exponents.every((value) => value === 1));
    assert.strictEqual(run.repairCount, 0);
    assert.strictEqual(run.baseTwoCount, 0);
    assert.strictEqual(run.end, expectedSeed);
    rows.push({
      m,
      endpoint: endpoint.toString(),
      depth,
      end: run.end.toString(),
      score: depth * (Math.log2(3) - 1),
    });
  }
  return rows;
}

function fixedSeedAudit(seeds, depth) {
  return seeds.map((seed) => {
    const run = itinerary(BigInt(seed), depth);
    const alpha = Math.log2(3);
    const score = alpha * depth - run.exponentSum;
    const sizeCeiling = Math.log2(seed / Number(run.end));
    assert(score < sizeCeiling + 1e-12);
    return {
      seed,
      depth,
      endDigits: run.end.toString().length,
      exponentSum: run.exponentSum,
      baseTwoCount: run.baseTwoCount,
      repairCount: run.repairCount,
      score,
      sizeCeiling,
    };
  });
}

const table = residueTable();
const cylinders = cylinderAudit(7);
const moving = movingNoRepairAudit(10);
const fixed = fixedSeedAudit([1, 5, 7, 11, 13, 17, 19, 25, 31], 120);

console.log("ALWAYS-LIVE RESIDUE TABLE");
for (const [residue, [exponent, repaired]] of table) {
  console.log(
    "x mod 9 = " + residue + ": exponent=" + exponent +
      ", repaired=" + repaired,
  );
}

console.log("\nRESIDUE CYLINDER AUDIT");
for (const row of cylinders) {
  console.log(
    "depth=" + row.depth + " classes=" + row.classes +
      " words=" + row.words +
      " mean_base2=" + row.meanBaseTwos.toFixed(6) +
      " mean_repair=" + row.meanRepairs.toFixed(6),
  );
}

console.log("\nMOVING NO-REPAIR CYLINDERS");
for (const row of moving) {
  console.log(
    "m=" + row.m + " depth=" + row.depth +
      " endpoint=" + row.endpoint + " end=" + row.end +
      " score=" + row.score.toFixed(6),
  );
}

console.log("\nFIXED-SEED SCORE AUDIT");
for (const row of fixed) {
  console.log(
    "seed=" + row.seed + " depth=" + row.depth +
      " end_digits=" + row.endDigits + " E=" + row.exponentSum +
      " base2=" + row.baseTwoCount + " repairs=" + row.repairCount +
      " score=" + row.score.toFixed(6) +
      " ceiling=" + row.sizeCeiling.toFixed(6),
  );
}

console.log("\nAll exact residue, liveness, valuation, cylinder, and score checks passed.");
