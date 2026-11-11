"use strict";

// Exact accelerated certificate for the deficit-four finite-language theorem.

function v2(n) {
  let a = 0;
  while ((n & 1n) === 0n) {
    n >>= 1n;
    a += 1;
  }
  return a;
}

function classify(seed, p, q, stepCap) {
  let m = BigInt(seed);
  let pow2 = 1n;
  let pow3 = 1n;
  const seen = new Set();
  const word = [];

  for (let k = 0; k <= stepCap; k += 1) {
    if (m === 1n) return { status: "hit_1", steps: k, word };
    const key = m.toString();
    if (seen.has(key)) return { status: "cycle", steps: k };
    seen.add(key);

    const z = 3n * m - 1n;
    const a = v2(z);
    word.push(a);
    m = z >> BigInt(a);
    pow2 <<= BigInt(a);
    pow3 *= 3n;
    if (BigInt(p) * pow2 >= BigInt(q) * pow3) {
      return { status: "coefficient_floor_failure", steps: k + 1 };
    }
  }
  return { status: "step_cap", steps: stepCap };
}

function runCase(test) {
  const counts = {};
  const hits = [];
  let longest = { steps: -1, seed: -1, status: "" };

  for (let seed = 1; seed < test.seedCap; seed += 2) {
    const out = classify(seed, test.p, 81, 100000);
    counts[out.status] = (counts[out.status] || 0) + 1;
    if (out.status === "hit_1") hits.push([seed, out.steps, out.word]);
    if (out.steps > longest.steps) {
      longest = { steps: out.steps, seed, status: out.status };
    }
  }

  const actual = JSON.stringify({ counts, hits, longest });
  const expected = JSON.stringify(test.expected);
  if (actual !== expected || counts.step_cap) {
    throw new Error(`${test.name}: certificate mismatch\nactual=${actual}\nexpected=${expected}`);
  }
  console.log(JSON.stringify({
    case: test.name,
    floor: `${test.p}/81`,
    seed_cap: test.seedCap,
    counts,
    hits,
    longest,
    certificate_passed: true
  }));
}

runCase({
  name: "A4",
  p: 16,
  seedCap: 896807,
  expected: {
    counts: { hit_1: 2, cycle: 20, coefficient_floor_failure: 448381 },
    hits: [[1, 0, []], [3, 1, [3]]],
    longest: { steps: 139, seed: 482817, status: "coefficient_floor_failure" }
  }
});

runCase({
  name: "A5",
  p: 32,
  seedCap: 448404,
  expected: {
    counts: { hit_1: 1, coefficient_floor_failure: 224188, cycle: 13 },
    hits: [[1, 0, []]],
    longest: { steps: 128, seed: 361365, status: "coefficient_floor_failure" }
  }
});

runCase({
  name: "A6",
  p: 64,
  seedCap: 224202,
  expected: {
    counts: { hit_1: 1, coefficient_floor_failure: 112097, cycle: 3 },
    hits: [[1, 0, []]],
    longest: { steps: 93, seed: 199577, status: "coefficient_floor_failure" }
  }
});
