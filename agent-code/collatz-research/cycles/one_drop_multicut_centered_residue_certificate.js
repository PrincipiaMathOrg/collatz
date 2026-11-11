#!/usr/bin/env node
"use strict";

// Exact audit for the multicut centered-residue transport theorem.  The
// companion note proves the unbounded analytic estimates.  This checker
// verifies the integer identities, monotonicity, transition structure, and
// exact 2-adic and 3-adic valuations on every one-drop profile through the
// requested depth.

function abs(a) { return a < 0n ? -a : a; }
function pow2(k) { return 1n << BigInt(k); }
function pow3(k) { return 3n ** BigInt(k); }
function bitLength(n) { return n.toString(2).length; }
function valuation(n, p) {
  n = abs(n);
  if (n === 0n) throw new Error("valuation of zero");
  let value = 0;
  while (n % p === 0n) {
    n /= p;
    ++value;
  }
  return value;
}
function mod(n, d) {
  const value = n % d;
  return value < 0n ? value + d : value;
}
function acceleratedOdd(n) {
  let value = 3n * n + 1n;
  while (value % 2n === 0n) value /= 2n;
  return value;
}

function checkTerminalQuotientWitnesses() {
  // No suffix spike: 55 -> 83 -> 125 -> 47, while the stripped
  // quotient is y=7 and the associated odd integer 13 reaches 1.
  {
    const L = 3;
    const U = 1;
    const y = 7n;
    const x = 47n;
    if (pow3(L) * y !== pow2(U + 1) * x + 1n) {
      throw new Error("no-spike quotient equation");
    }
    let Z = pow2(L - 1) * y;
    const Q = (x + 1n) / 2n;
    for (let j = 0; j < L - 1; ++j) {
      if (Z < Q || Z % 2n !== 0n) {
        throw new Error("no-spike state interpretation");
      }
      Z = 3n * Z / 2n;
    }
    if (Z < Q || 3n * Z - 1n !== pow2(U + 1) * x) {
      throw new Error("no-spike terminal closure");
    }
    let seed = 2n * y - 1n;
    for (let j = 0; j < 8 && seed !== 1n; ++j) {
      if (seed === x) throw new Error("unexpected quotient coalescence");
      seed = acceleratedOdd(seed);
    }
    if (seed !== 1n) throw new Error("quotient witness orbit");
  }

  // Sole final suffix spike: 7 -> 11 -> 17 -> 13 -> 5, while y=1.
  {
    const L = 4;
    const U = 1;
    const y = 1n;
    const x = 5n;
    if (pow3(L) * y !== pow2(U + 3) * x + 1n) {
      throw new Error("last-spike quotient equation");
    }
    let Z = pow2(L - 2) * y;
    const Q = (x + 1n) / 2n;
    for (let j = 0; j < L - 2; ++j) {
      if (Z < Q || Z % 2n !== 0n) {
        throw new Error("last-spike state interpretation");
      }
      Z = 3n * Z / 2n;
    }
    if ((3n * Z + 1n) % 4n !== 0n) {
      throw new Error("last-spike branch integrality");
    }
    Z = (3n * Z + 1n) / 4n;
    if (Z < Q || 3n * Z - 1n !== pow2(U + 1) * x) {
      throw new Error("last-spike terminal closure");
    }
    if (acceleratedOdd(2n * y - 1n) !== 1n) {
      throw new Error("last-spike quotient witness orbit");
    }
  }
  return 2;
}

const terminalQuotientDynamicWitnesses = checkTerminalQuotientWitnesses();

// Exact base-point inequalities used in the analytic transition theorem.
const U0 = 408126n;
if (!(638n ** 2n < U0 && U0 < pow2(19))) {
  throw new Error("base-point square and dyadic bounds");
}
if (!(U0 ** 20n < pow2(373))) {
  throw new Error("base-point logarithm bound");
}
// 3 + (271/10)(373/20) < (4/5)638.
if (!(101683n * 5n < 4n * 638n * 200n)) {
  throw new Error("state-height square-root bound");
}
// (271/10)(373/20) + 1 < (4/5)638.
if (!(101283n * 5n < 4n * 638n * 200n)) {
  throw new Error("critical-cut square-root bound");
}
if (!(96n * 5n < 4n * 125n
    && 114n < 5n * 25n
    && 33n < 7n * 5n)) {
  throw new Error("transition compression constants");
}
if (!(3n * 638n ** 2n > 75n * 638n + 80n)) {
  throw new Error("transition base-point comparison");
}
// (64/9)((8/5)s+1)+16 < 12s at s=638.
if (!(64n * (8n * 638n + 5n) + 16n * 45n
    < 12n * 638n * 45n)) {
  throw new Error("deep-cut tail constant");
}

const maxR = Number(process.argv[2] || 20);
if (!Number.isInteger(maxR) || maxR < 3) throw new Error("bad maxR");

let profiles = 0n;
let cuts = 0n;
let layers = 0n;
let nonemptyLayers = 0n;
let plateaus = 0n;
let positiveToNegativeTransitions = 0n;
let profilesStartingNegative = 0n;
let denominatorOneProfiles = 0n;
let v2DefectChecks = 0n;
let v3DefectChecks = 0n;
let v2LayerChecks = 0n;
let v3LayerChecks = 0n;
let transportChecks = 0n;
let invariantChecks = 0n;
let terminalDivisibilityShadowChecks = 0n;
let positiveDefectFloorChecks = 0n;
let sharpPositiveDefectFloors = 0n;
let firstTransitionWitness = null;
let firstPlateauWitness = null;

for (let r = 3; r <= maxR; ++r) {
  const threeR = pow3(r);
  const N = bitLength(threeR);
  const e = N - r;
  const twoN = pow2(N);
  const D = twoN - threeR;
  const B = [0];
  const eligible = [];
  for (let t = 1; t <= r; ++t) {
    B.push(Math.floor(e * t / r));
    if (t < r && B[t] - B[t - 1] === 1) eligible.push(t);
  }
  if (eligible.length !== e - 1) throw new Error(`clock count r=${r}`);
  if (eligible.length >= 31) throw new Error("mask cutoff");

  const masks = 2 ** eligible.length;
  for (let mask = 0; mask < masks; ++mask) {
    const spikes = [];
    for (let i = 0; i < eligible.length; ++i) {
      if ((mask & 2 ** i) !== 0) spikes.push(eligible[i]);
    }
    const V = spikes.length;
    const U = e - 1 - V;
    if (U < 1) continue;
    ++profiles;

    const spikeRank = new Map();
    const spikeSet = new Set(spikes);
    for (let i = 0; i < V; ++i) spikeRank.set(spikes[i], i + 1);

    let J = 0n;
    let fullCarryInteger = 0n;
    for (let i = 0; i < V; ++i) {
      const t = spikes[i];
      const k = i + 1;
      J += pow3(r - 1 - t) * pow2(t + k - 2);
      fullCarryInteger += pow2(t + k) * pow3(r - t);
    }
    const exponentA = r - 1 + V;
    if (exponentA !== N - U - 2) throw new Error("exponent balance");
    const K = pow2(N - 1) - pow2(exponentA) + 3n * J;
    const denominatorOne = K % D === 0n;
    if (denominatorOne) ++denominatorOneProfiles;

    const height = [0];
    let usedSpikes = 0;
    for (let t = 1; t < r; ++t) {
      if (spikeSet.has(t)) ++usedSpikes;
      height.push(B[t] - usedSpikes);
    }
    if (height[r - 1] !== U) throw new Error("terminal height");

    const records = [];
    for (let H = 1; H <= U + 1; ++H) {
      ++cuts;
      const terminalCut = H === U + 1;
      const T = terminalCut
        ? r
        : height.findIndex(value => value === H);
      if (T < 0) throw new Error("missing height");

      let earlyIntegerAtR = 0n;
      let lateInteger = 0n;
      const late = [];
      for (let i = 0; i < V; ++i) {
        const t = spikes[i];
        const k = i + 1;
        const term = pow2(t + k) * pow3(r - t);
        const preHeight = height[t - 1];
        if (preHeight < H) {
          earlyIntegerAtR += term;
        } else {
          lateInteger += term;
          late.push({ t, k, preHeight });
        }
      }

      const scale = pow3(r - T);
      if (earlyIntegerAtR % scale !== 0n) {
        throw new Error("short-prefix denominator");
      }
      const AH = earlyIntegerAtR / scale;
      const E = lateInteger - pow2(N - U);
      const F = pow2(N + 1) + AH * scale;
      if (E === 0n || E % 3n === 0n) {
        throw new Error("defect nonvanishing");
      }
      ++v3DefectChecks;

      const expectedV2E = late.length === 0
        ? N - U
        : late[0].t + late[0].k;
      if (valuation(E, 2n) !== expectedV2E) {
        throw new Error("defect 2-adic valuation");
      }
      ++v2DefectChecks;
      if (E > 0n) {
        const sharpFloor = pow2(N - U - 3);
        if (E < sharpFloor) {
          throw new Error("positive suffix defect floor");
        }
        if (E === sharpFloor) ++sharpPositiveDefectFloors;
        ++positiveDefectFloorChecks;
      }

      if (F + E !== 4n * K) throw new Error("cut invariant");
      if (mod(F + E, D) !== mod(4n * K, D)) {
        throw new Error("single global residue class");
      }
      if (((F + E) % D === 0n) !== denominatorOne) {
        throw new Error("denominator-one equivalence");
      }
      ++invariantChecks;
      records.push({ H, T, AH, E, F, late });
    }

    if (records[records.length - 1].E !== -pow2(N - U)) {
      throw new Error("terminal defect");
    }

    let transitionCount = 0;
    for (let i = 0; i < U; ++i) {
      ++layers;
      const current = records[i];
      const next = records[i + 1];
      const H = i + 1;
      const layer = [];
      let Delta = 0n;
      for (let j = 0; j < V; ++j) {
        const t = spikes[j];
        const k = j + 1;
        if (height[t - 1] === H) {
          layer.push({ t, k });
          Delta += pow2(t + k) * pow3(r - t);
        }
      }
      if (current.E - next.E !== Delta
          || next.F - current.F !== Delta) {
        throw new Error("multicut transport");
      }
      if (current.F + current.E !== next.F + next.E) {
        throw new Error("transport invariant");
      }
      ++transportChecks;

      if (layer.length === 0) {
        ++plateaus;
        if (Delta !== 0n || current.E !== next.E) {
          throw new Error("empty-layer plateau");
        }
        if (firstPlateauWitness === null) {
          firstPlateauWitness = { r, N, U, H, spikes: spikes.join(",") };
        }
      } else {
        ++nonemptyLayers;
        const first = layer[0];
        const last = layer[layer.length - 1];
        if (valuation(Delta, 2n) !== first.t + first.k) {
          throw new Error("layer 2-adic valuation");
        }
        if (valuation(Delta, 3n) !== r - last.t) {
          throw new Error("layer 3-adic valuation");
        }
        ++v2LayerChecks;
        ++v3LayerChecks;
      }

      if (current.E > 0n && next.E < 0n) {
        ++transitionCount;
        ++positiveToNegativeTransitions;
        if (layer.length === 0) throw new Error("empty crossing layer");
        const remaining = next.late;
        const allowedNegativeSuffix = remaining.length === 0
          || (remaining.length === 1 && remaining[0].t === r - 1);
        if (!allowedNegativeSuffix) {
          throw new Error("negative suffix classification at transition");
        }
        const expectedNegative = remaining.length === 0
          ? -pow2(N - U)
          : -pow2(N - U - 2);
        if (next.E !== expectedNegative) {
          throw new Error("negative transition value");
        }
        // For a rational profile the denominator-cleared terminal number is
        // divisible by the suffix power of 3.  Under denominator one,
        // 2K-D=D(2Q-1), and D is a 3-adic unit, so this becomes the terminal
        // divisibility stated in the companion theorem.
        const terminalShift = remaining.length === 0 ? 1 : 3;
        const terminalShadow = D
          + pow2(U + terminalShift) * (2n * K - D);
        if (terminalShadow % pow3(r - next.T) !== 0n) {
          throw new Error("terminal divisibility shadow");
        }
        ++terminalDivisibilityShadowChecks;
        if (firstTransitionWitness === null) {
          firstTransitionWitness = {
            r, N, U, H,
            spikes: spikes.join(","),
            layer: layer.map(item => item.t).join(","),
            EBefore: current.E.toString(),
            EAfter: next.E.toString()
          };
        }
      }
      if (current.E < 0n && next.E > 0n) {
        throw new Error("monotonicity violation");
      }
    }

    if (records[0].E < 0n) {
      ++profilesStartingNegative;
      if (transitionCount !== 0) throw new Error("negative-start transition");
    } else if (transitionCount !== 1) {
      throw new Error("missing unique sign transition");
    }

    let telescoped = records[0].E;
    for (let i = 0; i < U; ++i) {
      telescoped -= records[i + 1].F - records[i].F;
    }
    if (telescoped !== records[records.length - 1].E) {
      throw new Error("full telescoping chain");
    }
  }
}

console.log(JSON.stringify({
  theorem: "one-drop multicut centered-residue transport",
  maxR,
  profiles: profiles.toString(),
  cuts: cuts.toString(),
  layers: layers.toString(),
  nonemptyLayers: nonemptyLayers.toString(),
  plateaus: plateaus.toString(),
  positiveToNegativeTransitions: positiveToNegativeTransitions.toString(),
  profilesStartingNegative: profilesStartingNegative.toString(),
  denominatorOneProfiles: denominatorOneProfiles.toString(),
  v2DefectChecks: v2DefectChecks.toString(),
  v3DefectChecks: v3DefectChecks.toString(),
  v2LayerChecks: v2LayerChecks.toString(),
  v3LayerChecks: v3LayerChecks.toString(),
  transportChecks: transportChecks.toString(),
  invariantChecks: invariantChecks.toString(),
  terminalDivisibilityShadowChecks:
    terminalDivisibilityShadowChecks.toString(),
  positiveDefectFloorChecks: positiveDefectFloorChecks.toString(),
  sharpPositiveDefectFloors: sharpPositiveDefectFloors.toString(),
  terminalQuotientDynamicWitnesses,
  firstTransitionWitness,
  firstPlateauWitness,
  status: "PASS"
}, null, 2));
