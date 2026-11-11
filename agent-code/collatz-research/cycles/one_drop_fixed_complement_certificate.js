#!/usr/bin/env node
"use strict";

const crypto = require("crypto");

function mod(a, m) {
  const z = a % m;
  return z < 0n ? z + m : z;
}

function bitLength(n) {
  return n.toString(2).length;
}

function mechanicalData(r) {
  const P = 3n ** BigInt(r);
  const N = bitLength(P);
  const M = 1n << BigInt(N);
  const D = M - P;
  const e = N - r;
  const eligible = [];
  const bigN = BigInt(N);
  const bigR = BigInt(r);
  for (let j = 0; j < r - 1; ++j) {
    const left = Number(BigInt(j) * bigN / bigR);
    const right = Number(BigInt(j + 1) * bigN / bigR);
    if (right - left === 2) eligible.push(j);
  }
  if (eligible.length !== e - 1) {
    throw new Error(`eligible count failed at r=${r}`);
  }
  return {P, N, M, D, e, eligible};
}

function scanV1(maxR) {
  let profiles = 0n;
  let nontrivialProfiles = 0n;
  const hits = [];
  const rowHash = crypto.createHash("sha256");

  for (let r = 2; r <= maxR; ++r) {
    const {P, D, e, eligible} = mechanicalData(r);
    const U = e - 2;
    let rowProfiles = 0;
    let rowHits = 0;
    const base = P - (1n << BigInt(r + 1));
    for (const j of eligible) {
      ++profiles;
      ++rowProfiles;
      if (U > 0) ++nontrivialProfiles;
      const C = base
        + (1n << BigInt(j + 1)) * (3n ** BigInt(r - j - 1));
      if (C <= 0n) throw new Error(`nonpositive carry at V=1,r=${r},j=${j}`);
      if (C % D === 0n) {
        const x = C / D;
        const endpoint2 = (x + 1n) % (1n << BigInt(j + 1)) === 0n;
        const endpoint3 =
          ((1n << BigInt(e - 1)) * x + 1n)
          % (3n ** BigInt(r - j - 1)) === 0n;
        if (!endpoint2 || !endpoint3) {
          throw new Error(`endpoint identity failed at V=1,r=${r},j=${j}`);
        }
        hits.push({r, j, U, x: x.toString(), nontrivial: U > 0});
        ++rowHits;
      }
    }
    rowHash.update(`${r}:${rowProfiles}:${rowHits}\n`);
  }
  return {
    maxR,
    profiles: profiles.toString(),
    nontrivialProfiles: nontrivialProfiles.toString(),
    hits,
    rowDigest: rowHash.digest("hex"),
  };
}

function scanV2(maxR) {
  let profiles = 0n;
  let nontrivialProfiles = 0n;
  const hits = [];
  const rowHash = crypto.createHash("sha256");

  for (let r = 2; r <= maxR; ++r) {
    const {P, D, e, eligible} = mechanicalData(r);
    if (eligible.length < 2) {
      rowHash.update(`${r}:0:0\n`);
      continue;
    }
    const U = e - 3;
    const baseResidue = mod(P - (1n << BigInt(r + 2)), D);
    const termResidues = eligible.map(j => mod(
      (1n << BigInt(j + 1)) * (3n ** BigInt(r - j - 1)), D));
    let rowProfiles = 0;
    let rowHits = 0;

    for (let a = 0; a < eligible.length - 1; ++a) {
      const j1 = eligible[a];
      const first = baseResidue + termResidues[a];
      for (let b = a + 1; b < eligible.length; ++b) {
        ++profiles;
        ++rowProfiles;
        if (U > 0) ++nontrivialProfiles;
        const residue = (first + 2n * termResidues[b]) % D;
        if (residue !== 0n) continue;

        const j2 = eligible[b];
        const C = P - (1n << BigInt(r + 2))
          + (1n << BigInt(j1 + 1)) * (3n ** BigInt(r - j1 - 1))
          + (1n << BigInt(j2 + 2)) * (3n ** BigInt(r - j2 - 1));
        if (C <= 0n || C % D !== 0n) {
          throw new Error(`residue/full carry mismatch at V=2,r=${r}`);
        }
        const x = C / D;
        const endpoint2 = (x + 1n) % (1n << BigInt(j1 + 1)) === 0n;
        const middle2 = (
          (3n ** BigInt(j1 + 1))
          * ((x + 1n) >> BigInt(j1 + 1))
          + 1n
        ) % (1n << BigInt(j2 - j1 + 1)) === 0n;
        const endpoint3 = (
          (1n << BigInt(e - 2)) * x + 1n
        ) % (3n ** BigInt(r - j2 - 1)) === 0n;
        if (!endpoint2 || !middle2 || !endpoint3) {
          throw new Error(`cut identity failed at V=2,r=${r},j1=${j1},j2=${j2}`);
        }
        hits.push({r, j1, j2, U, x: x.toString(), nontrivial: U > 0});
        ++rowHits;
      }
    }
    rowHash.update(`${r}:${rowProfiles}:${rowHits}\n`);
  }
  return {
    maxR,
    profiles: profiles.toString(),
    nontrivialProfiles: nontrivialProfiles.toString(),
    hits,
    rowDigest: rowHash.digest("hex"),
  };
}

// The analytic proof uses R=306*r^(143/10).  These are the exact
// tenth-power comparisons at the first excluded values.
const v1Base = (1n << BigInt(50 * 334))
  > 306n ** 130n * 334n ** 1859n;
const v2Base = (1n << BigInt(250 * 747))
  > 306n ** 1290n * 747n ** 18447n;
if (!v1Base || !v2Base) throw new Error("analytic base comparison failed");

const periodFloor = 72057431991n;
const periodForcesVAtLeast38 =
  periodFloor < (1n << 37n)
  && 306n < (1n << 9n)
  && 564n * 8n ** 38n < 3n * 5n ** 37n * (periodFloor - 38n);
if (!periodForcesVAtLeast38) {
  throw new Error("period/fixed-complement comparison failed");
}

const result = {
  analyticChecks: {
    log2ThreeBelowEightFifths: 3n ** 5n < 2n ** 8n,
    v1BaseR: 334,
    v1Base,
    v1Monotonicity: 1859 < 6 * 334 && 3n ** 6n < 2n ** 50n,
    v2BaseR: 747,
    v2Base,
    v2Monotonicity: 18447 < 25 * 747 && 3n ** 25n < 2n ** 250n,
    periodFloor: periodFloor.toString(),
    periodForcesVAtLeast38,
  },
  V1: scanV1(333),
  V2: scanV2(746),
};

console.log(JSON.stringify(result, null, 2));
