"use strict";

// Independent shortcut-step certificate.  It never extracts a 2-adic valuation.

function classify(seed, p, q, shortcutCap) {
  let x = BigInt(seed);
  let pow2 = 1n;
  let pow3 = 1n;
  let acceleratedSteps = 0;
  let currentExponent = 0;
  const seen = new Set();
  const word = [];

  for (let shortcutSteps = 0; shortcutSteps <= shortcutCap; shortcutSteps += 1) {
    if (x === 1n) {
      return { status: "hit_1", shortcutSteps, acceleratedSteps, word };
    }
    const key = x.toString();
    if (seen.has(key)) {
      return { status: "cycle", shortcutSteps, acceleratedSteps };
    }
    seen.add(key);
    if (shortcutSteps === shortcutCap) break;

    if ((x & 1n) === 1n) {
      x = (3n * x - 1n) >> 1n;
      pow2 <<= 1n;
      pow3 *= 3n;
      acceleratedSteps += 1;
      currentExponent = 1;
    } else {
      x >>= 1n;
      pow2 <<= 1n;
      currentExponent += 1;
    }

    if ((x & 1n) === 1n) {
      word.push(currentExponent);
      currentExponent = 0;
      if (BigInt(p) * pow2 >= BigInt(q) * pow3) {
        return {
          status: "coefficient_floor_failure",
          shortcutSteps: shortcutSteps + 1,
          acceleratedSteps
        };
      }
    }
  }
  return { status: "step_cap", shortcutSteps: shortcutCap, acceleratedSteps };
}

function runCase(test) {
  const counts = {};
  const hits = [];
  let longest = {
    shortcutSteps: -1,
    acceleratedSteps: -1,
    seed: -1,
    status: ""
  };

  for (let seed = 1; seed < test.seedCap; seed += 2) {
    const out = classify(seed, test.p, 81, 200000);
    counts[out.status] = (counts[out.status] || 0) + 1;
    if (out.status === "hit_1") {
      hits.push([seed, out.acceleratedSteps, out.shortcutSteps, out.word]);
    }
    if (out.shortcutSteps > longest.shortcutSteps) {
      longest = {
        shortcutSteps: out.shortcutSteps,
        acceleratedSteps: out.acceleratedSteps,
        seed,
        status: out.status
      };
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
    hits: [[1, 0, 0, []], [3, 1, 3, [3]]],
    longest: {
      shortcutSteps: 224,
      acceleratedSteps: 139,
      seed: 482817,
      status: "coefficient_floor_failure"
    }
  }
});

runCase({
  name: "A5",
  p: 32,
  seedCap: 448404,
  expected: {
    counts: { hit_1: 1, coefficient_floor_failure: 224188, cycle: 13 },
    hits: [[1, 0, 0, []]],
    longest: {
      shortcutSteps: 207,
      acceleratedSteps: 128,
      seed: 361365,
      status: "coefficient_floor_failure"
    }
  }
});

runCase({
  name: "A6",
  p: 64,
  seedCap: 224202,
  expected: {
    counts: { hit_1: 1, coefficient_floor_failure: 112097, cycle: 3 },
    hits: [[1, 0, 0, []]],
    longest: {
      shortcutSteps: 149,
      acceleratedSteps: 93,
      seed: 199577,
      status: "coefficient_floor_failure"
    }
  }
});
