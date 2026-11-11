#!/usr/bin/env node
"use strict";

/*
Exact small-start audit for OPEN-CYCLE-WIND-01.

For a strict-record one-strip word of odd depth r, put

  M=2^ceil(r log_2 3),  R=3^r,  D=M-R.

The carry bound C<rM/3 shows that nonpositive winding would force its
canonical start rho to satisfy 3D rho<rM.  Instead of enumerating all
strict-record words, this script enumerates every possible odd rho below
that exact threshold and follows its actual accelerated trajectory.  A
candidate at depth r uses exact valuations through the first r-1 odd
steps and may truncate the final even run so that its total length is
ceil(r log_2 3).  The strict-record inequalities and endpoint comparison
are then checked exactly.

Finite output is not an all-depth proof.
*/

const maxR = Number(process.argv[2] || 2000);
if (!Number.isSafeInteger(maxR) || maxR < 2) {
  throw new Error("maxR must be a safe integer at least 2");
}

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function valuation2(n) {
  if (n <= 0n) throw new Error("valuation2 expects a positive integer");
  let v = 0;
  while ((n & 1n) === 0n) {
    n >>= 1n;
    ++v;
  }
  return v;
}

function pow2(e) {
  if (!Number.isSafeInteger(e) || e < 0) throw new Error("invalid dyadic exponent");
  return 1n << BigInt(e);
}

// Build ceil(r log_2 3), its powers, and the exact forced-start ceiling
// without floating-point logarithms.
const info = Array(maxR + 1);
const pow3 = Array(maxR + 1);
pow3[0] = 1n;
let R = 1n, M = 1n, A = 0;
let globalStartCeiling = 0n, ceilingDepth = 0;
for (let r = 1; r <= maxR; ++r) {
  R *= 3n;
  pow3[r] = R;
  while (M <= R) { M <<= 1n; ++A; }
  const D = M - R;
  const startCeiling = (BigInt(r) * M - 1n) / (3n * D);
  info[r] = {A, M, R, D, startCeiling};
  if (startCeiling > globalStartCeiling) {
    globalStartCeiling = startCeiling;
    ceilingDepth = r;
  }
}

function ratioGreater(Ai, i, Aj, j) {
  // 2^Ai/3^i > 2^Aj/3^j.
  return pow2(Ai) * pow3[j] > pow2(Aj) * pow3[i];
}

function fullRatioStrictlyExceedsPrefix(fullA, r, prefixA, i) {
  return pow2(fullA) * pow3[i] > pow2(prefixA) * pow3[r];
}

let seedsTested = 0;
let seedsWithA0One = 0;
let oddSteps = 0;
let candidateDepths = 0;
let strictDepths = 0;
let belowThresholdStrictDepths = 0;
const belowThresholdWitnesses = [];
let firstFailure = null;
let nearest = null;
let longestNoDescent = null;

for (let seed = 3n; seed <= globalStartCeiling; seed += 2n) {
  ++seedsTested;
  const firstNumerator = 3n * seed + 1n;
  const firstValuation = valuation2(firstNumerator);
  if (firstValuation !== 1) continue;
  ++seedsWithA0One;

  let current = firstNumerator >> 1n;
  let prefixA = 1;
  let maxPrefixA = 1;
  let maxPrefixIndex = 1;
  const valuations = [1];
  let reachedDepth = 1;
  let dropped = current < seed;

  for (let r = 2; r <= maxR && !dropped; ++r) {
    reachedDepth = r;
    ++oddSteps;
    if ((current & 1n) !== 1n) throw new Error("accelerated boundary is not odd");

    const numerator = 3n * current + 1n;
    const exactLast = valuation2(numerator);
    const {A: fullA, M: fullM, R: fullR, D, startCeiling} = info[r];
    const truncatedLast = fullA - prefixA;

    if (1 <= truncatedLast && truncatedLast <= exactLast) {
      ++candidateDepths;
      const strict = fullRatioStrictlyExceedsPrefix(
        fullA, r, maxPrefixA, maxPrefixIndex
      );
      if (strict) {
        ++strictDepths;
        const endpoint = numerator >> BigInt(truncatedLast);
        const belowThreshold = seed <= startCeiling;
        if (belowThreshold) {
          ++belowThresholdStrictDepths;
          if (belowThresholdWitnesses.length < 100) {
            const displacement = endpoint - seed;
            const tau = displacement < 0n ? D + displacement : displacement;
            belowThresholdWitnesses.push({
              r,
              seed: seed.toString(),
              endpoint: endpoint.toString(),
              displacement: displacement.toString(),
              tau: tau.toString(),
              D: D.toString(),
              startCeiling: startCeiling.toString(),
              word: valuations.concat([truncatedLast]).join(".")
            });
          }
        }

        const startMargin = 3n * D * seed - BigInt(r) * fullM;
        if (nearest === null || startMargin < nearest.startMargin) {
          nearest = {
            r,
            seed: seed.toString(),
            endpoint: endpoint.toString(),
            startCeiling: startCeiling.toString(),
            startMargin,
            word: valuations.concat([truncatedLast]).join(".")
          };
        }

        if (belowThreshold && endpoint >= seed && firstFailure === null) {
          // Recheck every suffix record independently.  This is redundant
          // with the maintained maximum, but keeps a failure self-auditing.
          let position = 0;
          let exactStrict = true;
          const word = valuations.concat([truncatedLast]);
          for (let i = 1; i < r; ++i) {
            position += word[i - 1];
            if (pow2(fullA - position) <= pow3[r - i]) {
              exactStrict = false;
              break;
            }
          }
          if (!exactStrict) throw new Error("maintained strict-record maximum disagrees");
          firstFailure = {
            r,
            seed: seed.toString(),
            endpoint: endpoint.toString(),
            A: fullA,
            M: fullM.toString(),
            R: fullR.toString(),
            D: D.toString(),
            startCeiling: startCeiling.toString(),
            word: word.join(".")
          };
          break;
        }
      }
    }

    current = numerator >> BigInt(exactLast);
    prefixA += exactLast;
    valuations.push(exactLast);
    if (ratioGreater(prefixA, r, maxPrefixA, maxPrefixIndex)) {
      maxPrefixA = prefixA;
      maxPrefixIndex = r;
    }
    dropped = current < seed;
  }

  if (longestNoDescent === null || reachedDepth > longestNoDescent.depth) {
    longestNoDescent = {
      seed: seed.toString(),
      depth: reachedDepth,
      terminalOddState: current.toString(),
      dropped
    };
  }
  if (firstFailure !== null) break;
}

if (nearest !== null) nearest.startMargin = nearest.startMargin.toString();

// Freeze the deepest completed run as a reproducible regression.  These
// assertions do not extend the finite range.  They ensure that later edits
// cannot silently weaken the exact enumeration reported in the attack note.
if (maxR === 15601) {
  assert(globalStartCeiling === 285820186n, "deep ceiling changed");
  assert(ceilingDepth === 15601, "deep ceiling depth changed");
  assert(seedsTested === 142910092, "deep seed count changed");
  assert(seedsWithA0One === 71455046, "deep a0 count changed");
  assert(oddSteps === 356216187, "deep odd-step count changed");
  assert(candidateDepths === 71455046, "deep candidate count changed");
  assert(strictDepths === 71455046, "deep strict count changed");
  assert(belowThresholdStrictDepths === 4, "deep threshold count changed");
  assert(firstFailure === null, "deep winding failure appeared");
  const frozenPairs = belowThresholdWitnesses.map(
    x => `${x.r}:${x.seed}:${x.endpoint}`
  ).join(",");
  assert(
    frozenPairs === "37:27:23,35:31:23,34:47:46,34:63:61",
    "deep threshold witnesses changed"
  );
  assert(
    longestNoDescent !== null &&
    longestNoDescent.seed === "217740015" &&
    longestNoDescent.depth === 249 &&
    longestNoDescent.terminalOddState === "171507217" &&
    longestNoDescent.dropped,
    "deep longest excursion changed"
  );
}

console.log(JSON.stringify({
  target: "OPEN-CYCLE-WIND-01",
  maxR,
  globalStartCeiling: globalStartCeiling.toString(),
  ceilingDepth,
  seedsTested,
  seedsWithA0One,
  oddSteps,
  candidateDepths,
  strictDepths,
  belowThresholdStrictDepths,
  belowThresholdWitnesses,
  nearest,
  longestNoDescent,
  firstFailure,
  theoremChecked: "no strict-record one-strip canonical seed with 3D*rho<rM has endpoint at least rho",
  warning: "finite small-start audit only"
}, null, 2));
