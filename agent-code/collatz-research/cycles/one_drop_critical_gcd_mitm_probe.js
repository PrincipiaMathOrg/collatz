#!/usr/bin/env node
"use strict";

// Exact meet-in-the-middle probe for the high-rise one-drop denominator.
//
// The input subset consists of the U omitted eligible one-sites.  If the
// eligible one-sites are t_1<...<t_n and
//
//   w_i = 2^(t_i+i-2) 3^(r-t_i),
//   P_i = w_1+...+w_i,
//   b_i = P_(i-1)-w_i,
//
// then, for omissions s_1<...<s_U,
//
//   2^U K = 2^(N-2)(2^(U+1)-1)+P_n
//           + sum_(m=1)^U 2^(U-m)b_(s_m).
//
// This removes the linear-size spike set from the search.  All arithmetic
// below is exact BigInt arithmetic.

const assert = require("node:assert/strict");

function mod(a, m) {
  const z = a % m;
  return z < 0n ? z + m : z;
}

function gcd(a, b) {
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

function inverse(a, m) {
  let oldR = mod(a, m);
  let r = m;
  let oldS = 1n;
  let s = 0n;
  while (r !== 0n) {
    const q = oldR / r;
    [oldR, r] = [r, oldR - q * r];
    [oldS, s] = [s, oldS - q * s];
  }
  assert.equal(oldR, 1n);
  return mod(oldS, m);
}

function bitLength(x) {
  assert(x > 0n);
  return x.toString(2).length;
}

function log2Big(x) {
  assert(x > 0n);
  const bits = bitLength(x);
  const shift = Math.max(0, bits - 53);
  const head = Number(x >> BigInt(shift));
  return Math.log2(head) + shift;
}

function chooseBig(n, k) {
  if (k < 0 || k > n) return 0n;
  k = Math.min(k, n - k);
  let z = 1n;
  for (let i = 1; i <= k; ++i) {
    z = z * BigInt(n - k + i) / BigInt(i);
  }
  return z;
}

function clockData(r) {
  const P = 3n ** BigInt(r);
  const N = bitLength(P - 1n);
  const e = N - r;
  const D = (1n << BigInt(N)) - P;
  const sites = [];
  for (let t = 1; t < r; ++t) {
    if (Math.floor(e * t / r) - Math.floor(e * (t - 1) / r) === 1) {
      sites.push(t);
    }
  }
  assert.equal(sites.length, e - 1);

  const w = [];
  const b = [];
  let prefix = 0n;
  for (let i = 0; i < sites.length; ++i) {
    const t = sites[i];
    assert(t >= 2);
    const wi = (3n ** BigInt(r - t)) << BigInt(t + (i + 1) - 2);
    w.push(wi);
    b.push(prefix - wi);
    prefix += wi;
  }
  return {r, P, N, e, D, sites, w, b, fullSpikeSum: prefix};
}

function directBottomK(clock, omissions) {
  const omitted = new Set(omissions);
  const spikes = [];
  for (let i = 0; i < clock.sites.length; ++i) {
    if (!omitted.has(i)) spikes.push(clock.sites[i]);
  }
  let J = 0n;
  for (let k = 0; k < spikes.length; ++k) {
    const t = spikes[k];
    J += (3n ** BigInt(clock.r - 1 - t)) << BigInt(t + (k + 1) - 2);
  }
  const V = spikes.length;
  return (1n << BigInt(clock.N - 1)) -
    (1n << BigInt(clock.r - 1 + V)) + 3n * J;
}

function normalizedConstant(clock, U) {
  return ((1n << BigInt(clock.N - 2)) *
      ((1n << BigInt(U + 1)) - 1n)) + clock.fullSpikeSum;
}

function normalizedK(clock, omissions) {
  const U = omissions.length;
  let z = normalizedConstant(clock, U);
  for (let m = 0; m < U; ++m) {
    z += clock.b[omissions[m]] << BigInt(U - 1 - m);
  }
  const twoU = 1n << BigInt(U);
  assert.equal(z % twoU, 0n);
  return z / twoU;
}

function enumerateWeighted(values, start, length, take, topExponent) {
  if (take < 0 || take > length) return [];
  const out = [];
  function visit(next, chosen, sum, mask) {
    if (chosen === take) {
      out.push({sum, mask});
      return;
    }
    const need = take - chosen;
    const last = start + length - need;
    for (let i = next; i <= last; ++i) {
      const exponent = topExponent - chosen;
      visit(i + 1, chosen + 1,
        sum + (values[i] << BigInt(exponent)),
        mask | (1n << BigInt(i - start)));
    }
  }
  visit(start, 0, 0n, 0n);
  return out;
}

function decodeMask(mask, start, length) {
  const out = [];
  for (let i = 0; i < length; ++i) {
    if ((mask & (1n << BigInt(i))) !== 0n) out.push(start + i);
  }
  return out;
}

function lowerBound(rows, target) {
  let lo = 0;
  let hi = rows.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (rows[mid].res < target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

function structuralData(clock, omissions) {
  const omitted = new Set(omissions);
  let decisionTransitions = 0;
  for (let i = 1; i < clock.sites.length; ++i) {
    if (omitted.has(i) !== omitted.has(i - 1)) ++decisionTransitions;
  }
  const times = omissions.map(i => clock.sites[i]);
  const boundaries = [0, ...times, clock.r];
  const runLengths = [];
  for (let i = 1; i < boundaries.length; ++i) {
    runLengths.push(boundaries[i] - boundaries[i - 1]);
  }
  const factorDepths = runLengths.map(n => Math.max(0, Math.floor((n - 2) / 2)));
  return {
    omissionOrdinals: omissions.map(i => i + 1),
    omissionTimes: times,
    decisionTransitions,
    maxHeightBlock: Math.max(...runLengths),
    repeatedFactorDepth: Math.max(...factorDepths),
    totalFactorDepth: factorDepths.reduce((a, z) => a + z, 0)
  };
}

function auditNormalization() {
  for (let r = 3; r <= 22; ++r) {
    const clock = clockData(r);
    const n = clock.sites.length;
    assert(n < 31);
    for (let mask = 0; mask < 2 ** n; ++mask) {
      const omissions = [];
      for (let i = 0; i < n; ++i) {
        if ((mask & 2 ** i) !== 0) omissions.push(i);
      }
      assert.equal(normalizedK(clock, omissions), directBottomK(clock, omissions));
    }
  }
}

function nearestForU(clock, U) {
  const n = clock.sites.length;
  assert(U >= 1 && U <= n);
  const leftLength = Math.floor(n / 2);
  const rightStart = leftLength;
  const rightLength = n - leftLength;
  const constant = normalizedConstant(clock, U);
  const twoU = 1n << BigInt(U);
  const invTwoU = inverse(twoU, clock.D);
  const constantResidue = mod(constant * invTwoU, clock.D);
  let best = null;
  let exactHits = 0n;
  let examinedPartials = 0n;

  const minLeft = Math.max(0, U - rightLength);
  const maxLeft = Math.min(U, leftLength);
  for (let uLeft = minLeft; uLeft <= maxLeft; ++uLeft) {
    const uRight = U - uLeft;
    const left = enumerateWeighted(clock.b, 0, leftLength, uLeft, U - 1);
    const right = enumerateWeighted(clock.b, rightStart, rightLength,
      uRight, uRight - 1);
    examinedPartials += BigInt(left.length + right.length);
    const rightRows = right.map(row => ({
      res: mod(row.sum * invTwoU, clock.D),
      sum: row.sum,
      mask: row.mask
    }));
    rightRows.sort((a, b) => a.res < b.res ? -1 : a.res > b.res ? 1 : 0);

    for (const l of left) {
      const leftResidue = mod(l.sum * invTwoU, clock.D);
      const target = mod(-constantResidue - leftResidue, clock.D);
      const at = lowerBound(rightRows, target);
      const candidates = new Set([
        at % rightRows.length,
        (at + 1) % rightRows.length,
        (at + rightRows.length - 1) % rightRows.length
      ]);
      for (const index of candidates) {
        const rr = rightRows[index];
        const residue = mod(constantResidue + leftResidue + rr.res, clock.D);
        const distance = residue <= clock.D - residue ? residue : clock.D - residue;
        if (distance === 0n) ++exactHits;
        if (best === null || distance < best.distance) {
          const omissions = decodeMask(l.mask, 0, leftLength)
            .concat(decodeMask(rr.mask, rightStart, rightLength));
          const numerator = constant + l.sum + rr.sum;
          assert.equal(numerator % twoU, 0n);
          const K = numerator / twoU;
          assert.equal(mod(K, clock.D), residue);
          const rem = mod(K, clock.D);
          const nearestQ = rem <= clock.D - rem ? K / clock.D : K / clock.D + 1n;
          best = {
            distance,
            signedDefect: K - nearestQ * clock.D,
            nearestQ,
            K,
            gcd: gcd(K, clock.D),
            reducedDenominator: clock.D / gcd(K, clock.D),
            omissions,
            ...structuralData(clock, omissions)
          };
        }
      }
    }
  }

  assert(best !== null);
  assert.equal(best.K, directBottomK(clock, best.omissions));
  return {
    r: clock.r,
    N: clock.N,
    eligible: n,
    U,
    V: n - U,
    profiles: chooseBig(n, U),
    examinedPartials,
    exactHitsSeenByNearestSearch: exactHits,
    minDistance: best.distance,
    spacingEntropyExcessBits: best.distance === 0n ? null :
      log2Big(best.distance) + log2Big(chooseBig(n, U)) - log2Big(clock.D),
    distanceBits: best.distance === 0n ? 0 : bitLength(best.distance),
    nearestQ: best.nearestQ,
    qBits: best.nearestQ === 0n ? 0 : bitLength(best.nearestQ),
    signedDefect: best.signedDefect,
    gcdAtNearest: best.gcd,
    denominatorAtNearest: best.reducedDenominator,
    omissionOrdinals: best.omissionOrdinals,
    omissionTimes: best.omissionTimes,
    decisionTransitions: best.decisionTransitions,
    maxHeightBlock: best.maxHeightBlock,
    repeatedFactorDepth: best.repeatedFactorDepth,
    totalFactorDepth: best.totalFactorDepth
  };
}

function floorDiv(a, b) {
  assert(b > 0n);
  let q = a / b;
  if (a < 0n && a % b !== 0n) --q;
  return q;
}

function intervalLatticeDistance(lo, hi, modulus) {
  assert(lo <= hi && modulus > 0n);
  const q = floorDiv(lo + modulus - 1n, modulus);
  const upper = q * modulus;
  if (upper <= hi) return 0n;
  const lower = (q - 1n) * modulus;
  return (lo - lower) <= (upper - hi) ? lo - lower : upper - hi;
}

function latticeDfsForU(clock, U, nodeLimit = 100000000) {
  const n = clock.sites.length;
  assert(U >= 1 && U <= n);
  for (let i = 1; i < n; ++i) {
    assert(clock.b[i - 1] < clock.b[i], `b monotonicity i=${i}`);
  }

  // minSuffix[start][k] is the least k-term ordered suffix contribution,
  // whose coefficients are 2^(k-1),...,1.  Monotonicity of b makes the
  // maximum the same table entry beginning at n-k.
  const minSuffix = Array.from({length: n + 1}, () => Array(U + 1).fill(null));
  for (let start = 0; start <= n; ++start) minSuffix[start][0] = 0n;
  for (let k = 1; k <= U; ++k) {
    for (let start = n - k; start >= 0; --start) {
      minSuffix[start][k] = (clock.b[start] << BigInt(k - 1)) +
        minSuffix[start + 1][k - 1];
    }
  }

  const constant = normalizedConstant(clock, U);
  const twoU = 1n << BigInt(U);
  const lattice = twoU * clock.D;
  let nodes = 0;
  let leaves = 0;
  let prunedByInterval = 0;
  let best = null;
  let exact = null;

  function bounds(start, k, partial) {
    assert(start + k <= n);
    const lo = constant + partial + minSuffix[start][k];
    const hi = constant + partial + minSuffix[n - k][k];
    assert(lo <= hi);
    return {lo, hi};
  }

  function visit(start, k, partial, omissions) {
    if (++nodes > nodeLimit) throw new Error(`DFS node limit ${nodeLimit}`);
    const parentBounds = bounds(start, k, partial);
    const parentLower = intervalLatticeDistance(
      parentBounds.lo, parentBounds.hi, lattice);
    if (best !== null && parentLower >= best.normalizedDistance) {
      ++prunedByInterval;
      return;
    }
    if (k === 0) {
      ++leaves;
      const L = constant + partial;
      assert.equal(L % twoU, 0n);
      const K = L / twoU;
      const q0 = floorDiv(L, lattice);
      const d0 = L - q0 * lattice;
      const d1 = (q0 + 1n) * lattice - L;
      const q = d0 <= d1 ? q0 : q0 + 1n;
      const normalizedDistance = d0 <= d1 ? d0 : d1;
      if (best === null || normalizedDistance < best.normalizedDistance) {
        best = {normalizedDistance, K, q, omissions: omissions.slice()};
        if (normalizedDistance === 0n) exact = best;
      }
      return;
    }

    const lastChoice = n - k;
    const children = [];
    for (let i = start; i <= lastChoice; ++i) {
      const childPartial = partial + (clock.b[i] << BigInt(k - 1));
      const childBounds = bounds(i + 1, k - 1, childPartial);
      const lower = intervalLatticeDistance(childBounds.lo, childBounds.hi, lattice);
      if (best === null || lower < best.normalizedDistance) {
        children.push({i, childPartial, lower});
      } else {
        ++prunedByInterval;
      }
    }
    children.sort((a, b) => a.lower < b.lower ? -1 : a.lower > b.lower ? 1 : 0);
    for (const child of children) {
      omissions.push(child.i);
      visit(child.i + 1, k - 1, child.childPartial, omissions);
      omissions.pop();
      if (exact !== null) return;
    }
  }

  visit(0, U, 0n, []);
  assert(best !== null);
  const distance = best.normalizedDistance / twoU;
  assert.equal(best.normalizedDistance % twoU, 0n);
  assert.equal(best.K, directBottomK(clock, best.omissions));
  return {
    r: clock.r,
    N: clock.N,
    eligible: n,
    U,
    V: n - U,
    profiles: chooseBig(n, U),
    nodes,
    leaves,
    prunedByInterval,
    exactHit: exact !== null,
    minDistance: distance,
    spacingEntropyExcessBits: distance === 0n ? null :
      log2Big(distance) + log2Big(chooseBig(n, U)) - log2Big(clock.D),
    signedDefect: best.K - best.q * clock.D,
    nearestQ: best.q,
    gcdAtNearest: gcd(best.K, clock.D),
    denominatorAtNearest: clock.D / gcd(best.K, clock.D),
    ...structuralData(clock, best.omissions)
  };
}

function bruteGcdForU(clock, U) {
  const n = clock.sites.length;
  assert(U >= 1 && U <= n);
  const constant = normalizedConstant(clock, U);
  const twoU = 1n << BigInt(U);
  let profiles = 0n;
  let exactHits = 0n;
  let maxGcd = 0n;
  let maxGcdWitness = null;
  let minDistance = null;
  let minDistanceWitness = null;
  let minK = null;
  let maxK = null;
  const byTransitions = new Map();

  function visit(next, chosen, partial, omissions) {
    if (chosen === U) {
      ++profiles;
      const L = constant + partial;
      assert.equal(L % twoU, 0n);
      const K = L / twoU;
      const g = gcd(K, clock.D);
      const rem = mod(K, clock.D);
      const distance = rem <= clock.D - rem ? rem : clock.D - rem;
      const q = rem <= clock.D - rem ? K / clock.D : K / clock.D + 1n;
      if (distance === 0n) ++exactHits;
      if (minK === null || K < minK) minK = K;
      if (maxK === null || K > maxK) maxK = K;
      if (g > maxGcd) {
        maxGcd = g;
        maxGcdWitness = {K, omissions: omissions.slice()};
      }
      if (minDistance === null || distance < minDistance) {
        minDistance = distance;
        minDistanceWitness = {K, q, omissions: omissions.slice()};
      }
      const structure = structuralData(clock, omissions);
      const t = structure.decisionTransitions;
      const prior = byTransitions.get(t);
      if (prior === undefined) {
        byTransitions.set(t, {profiles: 1n, maxGcd: g, minDistance: distance});
      } else {
        ++prior.profiles;
        if (g > prior.maxGcd) prior.maxGcd = g;
        if (distance < prior.minDistance) prior.minDistance = distance;
      }
      return;
    }
    const need = U - chosen;
    const last = n - need;
    for (let i = next; i <= last; ++i) {
      omissions.push(i);
      visit(i + 1, chosen + 1,
        partial + (clock.b[i] << BigInt(U - 1 - chosen)), omissions);
      omissions.pop();
    }
  }

  visit(0, 0, 0n, []);
  assert.equal(profiles, chooseBig(n, U));
  assert(maxGcdWitness !== null && minDistanceWitness !== null);
  const maxStructure = structuralData(clock, maxGcdWitness.omissions);
  const distanceStructure = structuralData(clock, minDistanceWitness.omissions);
  return {
    r: clock.r,
    N: clock.N,
    eligible: n,
    U,
    V: n - U,
    profiles,
    exactHits,
    maxGcd,
    minReducedDenominator: clock.D / maxGcd,
    reducedDenominatorBits: log2Big(clock.D / maxGcd),
    maxGcdK: maxGcdWitness.K,
    maxGcdWitness: maxStructure,
    minDistance,
    spacingEntropyExcessBits: minDistance === 0n ? null :
      log2Big(minDistance) + log2Big(profiles) - log2Big(clock.D),
    nearestQ: minDistanceWitness.q,
    minDistanceWitness: distanceStructure,
    minKFloorQ: minK / clock.D,
    maxKCeilQ: (maxK + clock.D - 1n) / clock.D,
    byDecisionTransitions: Object.fromEntries([...byTransitions.entries()]
      .sort((a, b) => a[0] - b[0]).map(([key, value]) => [key, value]))
  };
}

auditNormalization();

const crossClock = clockData(18);
const crossU = 7;
const crossMitm = nearestForU(crossClock, crossU);
const crossDfs = latticeDfsForU(crossClock, crossU);
const crossBrute = bruteGcdForU(crossClock, crossU);
assert.equal(crossMitm.minDistance, crossDfs.minDistance);
assert.equal(crossMitm.minDistance, crossBrute.minDistance);
assert.equal(crossBrute.exactHits === 0n, crossMitm.minDistance !== 0n);

const rawArgs = process.argv.slice(2);
const dfsAt = rawArgs.indexOf("--dfs");
const dfsMode = dfsAt !== -1;
if (dfsMode) rawArgs.splice(dfsAt, 1);
const gcdAt = rawArgs.indexOf("--gcd");
const gcdMode = gcdAt !== -1;
if (gcdMode) rawArgs.splice(gcdAt, 1);
const oneAt = rawArgs.indexOf("--one");
const oneStratum = oneAt !== -1;
if (oneStratum) rawArgs.splice(oneAt, 1);
const compactAt = rawArgs.indexOf("--compact");
const compact = compactAt !== -1;
if (compact) rawArgs.splice(compactAt, 1);
assert(!(dfsMode && gcdMode));
const ratioAt = rawArgs.findIndex(x => x.startsWith("--ratio="));
const riseRatio = ratioAt === -1 ? 2.315 :
  Number(rawArgs[ratioAt].slice("--ratio=".length));
if (ratioAt !== -1) rawArgs.splice(ratioAt, 1);
assert(Number.isFinite(riseRatio) && riseRatio > 0);
const requested = rawArgs.map(Number);
const rValues = requested.length > 0 ? requested : [30, 36, 42, 48, 54, 60, 66, 72];
const rows = [];
for (const r of rValues) {
  assert(Number.isInteger(r) && r >= 3);
  const clock = clockData(r);
  const critical = Math.ceil(Math.sqrt(riseRatio * r));
  for (const U of [...new Set((dfsMode || oneStratum) ?
    [critical] : [critical, critical + 1])]) {
    if (U > clock.sites.length) continue;
    const row = gcdMode ? bruteGcdForU(clock, U) :
      dfsMode ? latticeDfsForU(clock, U) : nearestForU(clock, U);
    rows.push(row);
    const printed = compact && row.byDecisionTransitions !== undefined ?
      {...row, byDecisionTransitions: undefined} : row;
    console.log(JSON.stringify(printed,
      (_, value) => typeof value === "bigint" ? value.toString() : value));
  }
}

console.log(JSON.stringify({
  theorem: "exact omission normalization and high-rise MITM/gcd audit",
  mode: gcdMode ? "exhaustive fixed-U gcd" :
    dfsMode ? "monotone lattice DFS" : "meet in the middle",
  riseRatio,
  normalizationAuditThroughR: 22,
  crossMethodAudit: {
    r: crossClock.r,
    U: crossU,
    profiles: crossBrute.profiles,
    minDistance: crossBrute.minDistance,
    exactHits: crossBrute.exactHits
  },
  rows: rows.length,
  denominatorOneHits: rows.filter(row => gcdMode ? row.exactHits !== 0n :
    row.minDistance === 0n).length,
  status: "PASS"
}, (_, value) => typeof value === "bigint" ? value.toString() : value, 2));
