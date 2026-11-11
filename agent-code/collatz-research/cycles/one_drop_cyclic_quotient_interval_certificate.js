"use strict";

// Frozen exact checks for cycle_one_drop_cyclic_quotient_interval_no_go.md.
// The finite audit is one explicitly defined profile at each depth. It is
// not an exploratory subset scan.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function pow2(k) {
  return 1n << BigInt(k);
}

function pow3(k) {
  return 3n ** BigInt(k);
}

function gcd(a, b) {
  if (a < 0n) a = -a;
  if (b < 0n) b = -b;
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

function valuation2(a) {
  assert(a > 0n, "valuation input must be positive");
  let answer = 0;
  while ((a & 1n) === 0n) {
    a >>= 1n;
    answer += 1;
  }
  return answer;
}

function bitLength(a) {
  return a.toString(2).length;
}

function buildRow(r, checkPrimitive) {
  const threePower = pow3(r);
  const N = bitLength(threePower - 1n);
  const e = N - r;
  const V = Math.ceil(2 * Math.log2(r));
  const U = e - 1 - V;
  assert(U >= 0, `family is not defined at r=${r}`);

  const oneSites = [];
  for (let t = 1; t < r; t += 1) {
    const now = Math.floor(e * t / r);
    const before = Math.floor(e * (t - 1) / r);
    if (now - before === 1) oneSites.push(t);
  }
  assert(oneSites.length === e - 1, `clock count failed at r=${r}`);
  assert(oneSites[0] === 2, `first one-site failed at r=${r}`);

  const spikeSites = [
    oneSites[0],
    ...oneSites.slice(oneSites.length - V + 1),
  ];
  assert(spikeSites.length === V && new Set(spikeSites).size === V,
    `spike placement failed at r=${r}`);
  const spikeSet = new Set(spikeSites);

  const word = [];
  for (let t = 1; t < r; t += 1) {
    word.push(spikeSet.has(t) ? 2 : 1);
  }
  word.push(U + 2);
  assert(word.reduce((x, y) => x + y, 0) === N,
    `total exponent failed at r=${r}`);

  let C = 0n;
  let prefix = 0;
  for (const a of word) {
    C = 3n * C + pow2(prefix);
    prefix += a;
  }
  const D = pow2(N) - threePower;
  assert(((C + D) & 1n) === 0n, `bottom parity failed at r=${r}`);
  const K = (C + D) / 2n;
  const common = gcd(C, D);
  const denominator = D / common;
  const n0 = C / common;
  assert(denominator === D / gcd(D, K),
    `gcd bridge failed at r=${r}`);

  const numerators = [n0];
  let n = n0;
  let strictLeast = true;
  for (const a of word) {
    const numerator = 3n * n + denominator;
    assert(valuation2(numerator) === a,
      `exact branch valuation failed at r=${r}`);
    n = numerator / pow2(a);
    if (n !== n0 && n <= n0) strictLeast = false;
    numerators.push(n);
  }
  assert(n === n0, `rational closure failed at r=${r}`);
  assert(strictLeast, `strict leastness failed at r=${r}`);

  let quotientContent = null;
  if (checkPrimitive) {
    assert(gcd(BigInt(N), BigInt(r)) === 1n,
      `coprime slope failed at r=${r}`);
    const omissionSet = new Set(
      oneSites.filter(t => !spikeSet.has(t))
    );
    let content = gcd(pow2(U + 1) * n0 + denominator, 0n);
    let omissionsBefore = 0;
    const occupied = new Set([0]);
    for (let j = 1; j < r; j += 1) {
      if (omissionSet.has(j)) omissionsBefore += 1;
      const residue = (j * N) % r;
      const index = r - residue;
      assert(1 <= index && index < r && !occupied.has(index),
        `quotient coefficient permutation failed at r=${r}, j=${j}`);
      occupied.add(index);
      const coefficient = pow2(U - omissionsBefore) *
        (numerators[j] + denominator);
      content = gcd(content, coefficient);
    }
    assert(occupied.size === r, `quotient support failed at r=${r}`);
    assert(content === 1n, `primitive quotient failed at r=${r}`);
    quotientContent = content;
  }

  return {
    r,
    N,
    e,
    U,
    V,
    firstSpike: spikeSites[0],
    secondSpike: spikeSites[1],
    lastSpike: spikeSites[spikeSites.length - 1],
    C,
    D,
    K,
    denominator,
    strictLeast,
    quotientContent,
  };
}

let finiteRows = 0;
for (let r = 14; r <= 146; r += 1) {
  const row = buildRow(r, false);
  assert(row.denominator > 1n,
    `unexpected denominator-one row at r=${r}`);
  finiteRows += 1;
}
assert(finiteRows === 133, "finite row count changed");

// This is the exact integer comparison used at the infinite cutoff.
assert(pow2(1470) > 22064n ** 10n * 147n ** 183n,
  "r=147 growth comparison failed");
assert(1024n * 147n ** 183n > 148n ** 183n,
  "monotonicity comparison failed");

const above = buildRow(317, true);
assert(above.N === 503 && above.e === 186 &&
  above.U === 168 && above.V === 17,
"r=317 parameters changed");
const aboveDefect = above.K - 2n * above.D;
assert(0n < aboveDefect && 100n * aboveDefect < above.D,
  "r=317 must lie just above two");

const below = buildRow(623, true);
assert(below.N === 988 && below.e === 365 &&
  below.U === 345 && below.V === 19,
"r=623 parameters changed");
const belowDefect = below.K - 2n * below.D;
assert(belowDefect < 0n && 100n * (-belowDefect) < below.D,
  "r=623 must lie just below two");

function summary(row, defect) {
  return {
    r: row.r,
    N: row.N,
    e: row.e,
    U: row.U,
    V: row.V,
    firstSpike: row.firstSpike,
    secondSpike: row.secondSpike,
    lastSpike: row.lastSpike,
    denominatorDigits: row.denominator.toString().length,
    signedPartsPerMillionFromTwo:
      Number(defect * 1000000n / row.D),
    quotientContent: row.quotientContent.toString(),
    strictLeast: row.strictLeast,
    denominatorOne: row.denominator === 1n,
  };
}

console.log(JSON.stringify({
  finiteAudit: {
    firstR: 14,
    lastR: 146,
    rows: finiteRows,
    denominatorOneHits: 0,
  },
  infiniteCutoff: 147,
  primitiveNearIntegerRows: [
    summary(above, aboveDefect),
    summary(below, belowDefect),
  ],
}, null, 2));
console.log("status: PASS");
console.log("scope: one frozen dense family; no full one-drop exclusion is claimed");
