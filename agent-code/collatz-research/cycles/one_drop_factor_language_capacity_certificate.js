"use strict";

// Exact finite audit for cycle_one_drop_factor_language_capacity.md.
// The finite rows use the actual rational clock slope
//   e/r = (ceil(r log_2 3)-r)/r,
// with N=ceil(r log_2 3) computed as bitLength(3^r).

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function bitLength(n) {
  return n.toString(2).length;
}

function gcd(a, b) {
  while (b !== 0) [a, b] = [b, a % b];
  return a;
}

function popcount(n) {
  let count = 0;
  while (n !== 0n) {
    n &= n - 1n;
    ++count;
  }
  return count;
}

// Exact rational bracket for the limiting exclusion constant
// c_0=2 alpha^2/(2 alpha-1). We use
//   15849/10000 < alpha < 317/200.
assert(3n ** 10000n > 2n ** 15849n, "alpha lower bound failed");
assert(3n ** 200n < 2n ** 317n, "alpha upper bound failed");
assert(3n ** 2n > 2n ** 3n, "alpha > 3/2 failed");
assert(3n ** 5n < 2n ** 8n, "alpha < 8/5 failed");
assert(
  2n * 15849n ** 2n * 1000n >
    2315n * 10000n * (2n * 15849n - 10000n),
  "c_0 > 2.315 failed"
);
assert(
  2n * 317n ** 2n * 1000n <
    2316n * 200n * (2n * 317n - 200n),
  "c_0 < 2.316 failed"
);

const periodBarrier = 72057431991n;
assert(
  periodBarrier ** 10n < 2n ** 361n,
  "period logarithm bound failed"
);
assert(3610n < periodBarrier, "log_2(r) < r/100 base check failed");
assert(
  871n * periodBarrier + 4500n < 1500n * periodBarrier,
  "L_* < r terminal-length check failed"
);

function criticalClock(L) {
  const alpha = Math.log2(3);
  let r = Math.round(alpha * L * L);
  let N;
  let e;
  while (true) {
    N = bitLength(3n ** BigInt(r));
    e = N - r;
    if (gcd(e, r) === 1) break;
    ++r;
  }

  const bits = new Uint8Array(r);
  const eligible = [];
  for (let j = 0; j < r; ++j) {
    bits[j] =
      Math.floor(((j + 1) * e) / r) - Math.floor((j * e) / r);
    // The final two-site becomes the unique terminal exponent U+2 and is
    // not an internal omission site.
    if (bits[j] === 1 && j !== r - 1) eligible.push(j);
  }
  return { L, r, N, e, bits, eligible };
}

function cyclicFactorSet(bits, L) {
  const r = bits.length;
  const mask = (1n << BigInt(L)) - 1n;
  let word = 0n;
  for (let j = 0; j < L; ++j) {
    word = (word << 1n) | BigInt(bits[j]);
  }

  const factors = new Set([word]);
  for (let s = 1; s < r; ++s) {
    word =
      ((word << 1n) & mask) | BigInt(bits[(s + L - 1) % r]);
    factors.add(word);
  }
  return factors;
}

function downwardRow(L) {
  const clock = criticalClock(L);
  const base = cyclicFactorSet(clock.bits, L);
  assert(base.size === L + 1, "base factor complexity was not L+1");

  const lowerWeight = Math.floor((clock.e * L) / clock.r);
  const upperWeight = Math.ceil((clock.e * L) / clock.r);
  let encodings = 0;
  const shadow = new Set();
  const union = new Set(base);

  for (const word of base) {
    const weight = popcount(word);
    assert(
      weight === lowerWeight || weight === upperWeight,
      "mechanical balance failed"
    );
    encodings += weight;

    let remaining = word;
    while (remaining !== 0n) {
      const bit = remaining & -remaining;
      const image = word ^ bit;
      shadow.add(image);
      union.add(image);
      remaining ^= bit;
    }
  }

  // The proved asymptotic shadow bounds.
  assert(
    union.size >= encodings - 3 * L - 1,
    "downward-union lower bound failed"
  );
  assert(
    union.size <= encodings + L + 1,
    "downward-union upper bound failed"
  );

  return {
    L,
    r: clock.r,
    e: clock.e,
    base: base.size,
    encodings,
    shadow: shadow.size,
    union: union.size,
    unionMinusEncodings: union.size - encodings,
  };
}

let randomState = 0x4f1bbcdc;
function randomUnit() {
  randomState = (1664525 * randomState + 1013904223) >>> 0;
  return randomState / 2 ** 32;
}

function randomDefects(clock, U) {
  const pool = clock.eligible.slice();
  const defects = new Set();
  for (let j = 0; j < U; ++j) {
    const k = j + Math.floor(randomUnit() * (pool.length - j));
    [pool[j], pool[k]] = [pool[k], pool[j]];
    defects.add(pool[j]);
  }
  return defects;
}

function actualSymbols(clock, defects, U) {
  const actual = new Uint16Array(clock.r);
  for (let j = 0; j < clock.r; ++j) {
    actual[j] = 1 + clock.bits[j];
  }
  for (const position of defects) actual[position] = 1;
  actual[clock.r - 1] = U + 2;
  return actual;
}

function cyclicSymbolFactorSet(symbols, L, width) {
  const r = symbols.length;
  const shift = BigInt(width);
  const mask = (1n << BigInt(width * L)) - 1n;
  let word = 0n;
  for (let j = 0; j < L; ++j) {
    word = (word << shift) | BigInt(symbols[j]);
  }

  const factors = new Set([word]);
  for (let s = 1; s < r; ++s) {
    word =
      ((word << shift) & mask) | BigInt(symbols[(s + L - 1) % r]);
    factors.add(word);
  }
  return factors;
}

function modifiedFactorCount(clock, defects, U) {
  const actual = actualSymbols(clock, defects, U);
  const width = bitLength(BigInt(U + 2));
  return cyclicSymbolFactorSet(actual, clock.L, width).size;
}

function factorCostAudit(clock, defects, U) {
  const { L, r } = clock;
  const actual = actualSymbols(clock, defects, U);
  const defectBits = new Uint8Array(r);
  for (const position of defects) {
    defectBits[position] = 1;
  }

  const width = bitLength(BigInt(U + 2));
  const shift = BigInt(width);
  const mask = (1n << BigInt(width * L)) - 1n;
  let word = 0n;
  let cost = 0;
  for (let j = 0; j < L; ++j) {
    word = (word << shift) | BigInt(actual[j]);
    cost += defectBits[j];
  }

  const minimumCost = new Map();
  const terminalFactors = new Set();
  if (L === r) {
    terminalFactors.add(word);
  } else {
    minimumCost.set(word, cost);
  }
  for (let s = 1; s < r; ++s) {
    word =
      ((word << shift) & mask) | BigInt(actual[(s + L - 1) % r]);
    cost -= defectBits[s - 1];
    cost += defectBits[(s + L - 1) % r];
    const containsTerminal = s + L > r - 1;
    if (containsTerminal) {
      terminalFactors.add(word);
    } else {
      const previous = minimumCost.get(word);
      if (previous === undefined || cost < previous) {
        minimumCost.set(word, cost);
      }
    }
  }

  let totalRepresentativeCost = 0;
  let zeroCost = 0;
  let oneCost = 0;
  for (const value of minimumCost.values()) {
    totalRepresentativeCost += value;
    if (value === 0) ++zeroCost;
    if (value === 1) ++oneCost;
  }
  return {
    factors: minimumCost.size + terminalFactors.size,
    nonterminalFactors: minimumCost.size,
    terminalFactors: terminalFactors.size,
    totalRepresentativeCost,
    zeroCost,
    oneCost,
  };
}

function greedyRow(L) {
  const clock = criticalClock(L);
  const U = Math.round(Math.sqrt(Math.log2(3) * clock.r));
  let bestDefects = null;
  let best = -1;

  for (let trial = 0; trial < 12; ++trial) {
    const defects = randomDefects(clock, U);
    const value = modifiedFactorCount(clock, defects, U);
    if (value > best) {
      best = value;
      bestDefects = defects;
    }
  }

  const currentDefects = new Set(bestDefects);
  const selected = [...currentDefects];
  let current = best;
  for (let iteration = 0; iteration < 800; ++iteration) {
    const selectedIndex = Math.floor(randomUnit() * selected.length);
    const oldPosition = selected[selectedIndex];
    const newPosition =
      clock.eligible[Math.floor(randomUnit() * clock.eligible.length)];
    if (currentDefects.has(newPosition)) continue;

    currentDefects.delete(oldPosition);
    currentDefects.add(newPosition);
    const value = modifiedFactorCount(clock, currentDefects, U);
    if (value >= current) {
      current = value;
      selected[selectedIndex] = newPosition;
      if (value > best) {
        best = value;
        bestDefects = new Set(currentDefects);
      }
    } else {
      currentDefects.delete(newPosition);
      currentDefects.add(oldPosition);
    }
  }

  const audit = factorCostAudit(clock, bestDefects, U);
  assert(audit.factors === best, "greedy factor recount failed");
  assert(audit.terminalFactors <= L, "terminal factor charge failed");
  assert(
    audit.totalRepresentativeCost <= U * L,
    "representative omission budget failed"
  );

  const base = cyclicFactorSet(clock.bits, L);
  let oneDeletionEncodings = 0;
  for (const word of base) oneDeletionEncodings += popcount(word);
  assert(audit.zeroCost <= L + 1, "zero-cost factor bound failed");
  assert(
    audit.oneCost <= oneDeletionEncodings,
    "one-cost factor bound failed"
  );
  assert(
    2 * audit.factors <=
      4 * L + 2 + U * L + oneDeletionEncodings,
    "deterministic factor-complexity bound failed"
  );

  return {
    L,
    r: clock.r,
    U,
    factors: best,
    ratioNumerator: best,
    ratioDenominator: clock.r,
    zeroCost: audit.zeroCost,
    oneCost: audit.oneCost,
    terminalFactors: audit.terminalFactors,
  };
}

const downwardRows = [50, 100, 200, 300, 400].map(downwardRow);
for (const row of downwardRows) {
  // These are regression facts, not assumptions in the proof.
  assert(row.union === row.encodings, "recorded exact union changed");
  console.log("downward_row=" + JSON.stringify(row));
}

const greedyRows = [20, 30, 40, 50].map(greedyRow);
for (const row of greedyRows) {
  console.log("greedy_row=" + JSON.stringify(row));
}

console.log("factor_language_capacity_certificate=PASS");
