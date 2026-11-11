#!/usr/bin/env node
"use strict";

// Exact audit for the terminal boundary-coupling collapse.  We verify the
// first/last layer factorization, the two stripped-state identities, and the
// denominator-cleared open-block transport on all anchored profiles through
// maxR.  We also verify an infinite-family sample of genuine q=1 integer
// suffix shadows with Q=3.

function abs(a) { return a < 0n ? -a : a; }
function pow2(k) { return 1n << BigInt(k); }
function pow3(k) { return 3n ** BigInt(k); }
function bitLength(n) { return n.toString(2).length; }
function gcd(a, b) {
  a = abs(a);
  b = abs(b);
  while (b !== 0n) {
    const next = a % b;
    a = b;
    b = next;
  }
  return a;
}

const maxR = Number(process.argv[2] || 28);
const shadowRowsRequested = Number(process.argv[3] || 101);
if (!Number.isInteger(maxR) || maxR < 3 || maxR > 30) {
  throw new Error("bad maxR");
}
if (!Number.isInteger(shadowRowsRequested) || shadowRowsRequested < 1) {
  throw new Error("bad shadow row count");
}

let profiles = 0n;
let denominatorOneProfiles = 0n;
let positiveTransitions = 0n;
let terminalBoundaryTransitions = 0n;
let nonboundaryTransitions = 0n;
let noSuffixSpikeCases = 0n;
let lastSuffixSpikeCases = 0n;
let layerFactorChecks = 0n;
let prefixStateChecks = 0n;
let globalCutChecks = 0n;
let strippedStateChecks = 0n;
let openBlockCouplingChecks = 0n;
let termwiseCrossingChecks = 0n;
let orderedResidueChecks = 0n;
let terminalUnitDigitChecks = 0n;
let unitLayerCofactors = 0n;
const boundaryGapCounts = new Map();
let firstNonboundaryWitness = null;

for (let r = 3; r <= maxR; ++r) {
  const threeR = pow3(r);
  const N = bitLength(threeR);
  const e = N - r;
  const D = pow2(N) - threeR;
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

    const spikeSet = new Set(spikes);
    let J = 0n;
    for (let i = 0; i < V; ++i) {
      const t = spikes[i];
      const k = i + 1;
      J += pow3(r - 1 - t) * pow2(t + k - 2);
    }
    const K = pow2(N - 1) - pow2(r - 1 + V) + 3n * J;
    if (K % D === 0n) ++denominatorOneProfiles;

    // Numerators of the rational bottom-normalized cycle states over the
    // common denominator D.
    const stateNumerators = [K];
    for (let i = 0; i < r; ++i) {
      const a = i === r - 1
        ? U + 2
        : (spikeSet.has(i + 1) ? 2 : 1);
      const branchNumerator = 3n * stateNumerators[i]
        + (pow2(a - 1) - 1n) * D;
      if (branchNumerator % pow2(a) !== 0n) {
        throw new Error("rational branch integrality");
      }
      stateNumerators.push(branchNumerator / pow2(a));
    }
    if (stateNumerators[r] !== K) throw new Error("rational closure");

    const height = [0];
    let usedSpikes = 0;
    for (let t = 1; t < r; ++t) {
      if (spikeSet.has(t)) ++usedSpikes;
      height.push(B[t] - usedSpikes);
    }
    if (height[r - 1] !== U) throw new Error("terminal height");

    const records = [];
    for (let H = 1; H <= U + 1; ++H) {
      const T = H === U + 1
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
        if (height[t - 1] < H) {
          earlyIntegerAtR += term;
        } else {
          lateInteger += term;
          late.push({ t, k });
        }
      }
      const scale = pow3(r - T);
      if (earlyIntegerAtR % scale !== 0n) {
        throw new Error("early carry scale");
      }
      records.push({
        H,
        T,
        A: earlyIntegerAtR / scale,
        E: lateInteger - pow2(N - U),
        late
      });
    }

    let transitionIndex = -1;
    for (let i = 0; i < U; ++i) {
      if (records[i].E > 0n && records[i + 1].E < 0n) {
        transitionIndex = i;
      }
    }
    if (transitionIndex < 0) continue;
    ++positiveTransitions;

    const star = records[transitionIndex];
    const terminal = records[transitionIndex + 1];
    if (terminal.H === U + 1) {
      ++terminalBoundaryTransitions;
      continue;
    }
    ++nonboundaryTransitions;

    const layer = [];
    let Delta = 0n;
    for (let i = 0; i < V; ++i) {
      const t = spikes[i];
      const k = i + 1;
      if (height[t - 1] === star.H) {
        layer.push({ t, k });
        Delta += pow2(t + k) * pow3(r - t);
      }
    }
    if (layer.length === 0 || Delta !== star.E - terminal.E) {
      throw new Error("transition layer");
    }

    const first = layer[0];
    const last = layer[layer.length - 1];
    const lambda = first.t + first.k;
    const nu = r - last.t;
    let G = 0n;
    for (const item of layer) {
      G += pow2(item.t + item.k - lambda)
        * pow3(last.t - item.t);
    }
    if (Delta !== pow2(lambda) * pow3(nu) * G
        || gcd(G, 6n) !== 1n) {
      throw new Error("layer endpoint factorization");
    }
    if (G === 1n) ++unitLayerCofactors;
    ++layerFactorChecks;

    let c;
    if (terminal.late.length === 0) {
      c = 1;
      ++noSuffixSpikeCases;
    } else if (terminal.late.length === 1
        && terminal.late[0].t === r - 1) {
      c = 3;
      ++lastSuffixSpikeCases;
    } else {
      throw new Error("negative suffix classification");
    }
    const mu = N - U - (c - 1);
    if (terminal.E !== -pow2(mu) || mu <= lambda) {
      throw new Error("terminal power");
    }
    const s = mu - lambda;
    const W = star.E / pow2(lambda);
    if (star.E !== pow2(lambda) * W
        || W !== pow3(nu) * G - pow2(s)
        || W <= 0n || W % 2n === 0n) {
      throw new Error("last-positive normal form");
    }

    const LStar = r - star.T;
    const L = r - terminal.T;
    const d = terminal.T - star.T;
    const sigma = first.t - star.T;
    const tau = terminal.T - last.t;
    if (2 * e > r) {
      if (sigma < 1 || sigma > 2 || tau < 1 || tau > 2) {
        throw new Error("mechanical boundary gap");
      }
      const key = `${sigma},${tau}`;
      boundaryGapCounts.set(key, (boundaryGapCounts.get(key) || 0n) + 1n);
    }
    if (nu !== L + tau || LStar !== L + d) {
      throw new Error("endpoint lengths");
    }

    const kStar = first.k - 1;
    const kTerminal = c === 1 ? V : V - 1;
    const PStarNumerator = D * star.A + 4n * K * pow3(star.T);
    const PTerminalNumerator = D * terminal.A
      + 4n * K * pow3(terminal.T);
    if (PStarNumerator
          !== pow2(star.T + kStar + 2) * stateNumerators[star.T]
        || PTerminalNumerator
          !== pow2(terminal.T + kTerminal + 2)
            * stateNumerators[terminal.T]) {
      throw new Error("prefix state identity");
    }
    ++prefixStateChecks;

    // Denominator-cleared form of
    // 2^(N+1)(2Q-1)-E_H = 3^(r-T_H)(A_H+4Q3^T_H).
    const commonNumerator = pow2(N + 1) * (2n * K - D);
    if (commonNumerator - D * star.E
          !== pow3(LStar) * PStarNumerator
        || commonNumerator - D * terminal.E
          !== pow3(L) * PTerminalNumerator) {
      throw new Error("global cut identity");
    }
    ++globalCutChecks;

    const terminalStrip = L - (c + 1) / 2;
    if (terminalStrip < 0
        || stateNumerators[star.T] % pow2(sigma - 1) !== 0n
        || stateNumerators[terminal.T] % pow2(terminalStrip) !== 0n) {
      throw new Error("state stripping");
    }
    const zNumerator = stateNumerators[star.T] / pow2(sigma - 1);
    const yNumerator = stateNumerators[terminal.T] / pow2(terminalStrip);
    if (PStarNumerator !== pow2(lambda) * zNumerator
        || PTerminalNumerator !== pow2(mu) * yNumerator) {
      throw new Error("stripped prefix state");
    }
    ++strippedStateChecks;

    // Over denominator D, this is
    // 2^s y = 3^d z + 3^tau G.  The entire terminal factor 3^L
    // has canceled, leaving only tau in {1,2} in the candidate range.
    if (pow2(s) * yNumerator
        !== pow3(d) * zNumerator + pow3(tau) * G * D) {
      throw new Error("open-block boundary coupling");
    }
    ++openBlockCouplingChecks;

    // Refine the transition layer term by term.  The first term which makes
    // the residual negative must be the last layer spike.  Its pre-crossing
    // gap has a profile-independent two-term normal form.
    let residual = star.E;
    let crossingPosition = -1;
    let crossingGap = null;
    for (let j = 0; j < layer.length; ++j) {
      const item = layer[j];
      const term = pow2(item.t + item.k) * pow3(r - item.t);
      const nextResidual = residual - term;
      if (residual > 0n && nextResidual < 0n && crossingPosition < 0) {
        crossingPosition = j;
        crossingGap = residual;
      }
      residual = nextResidual;
    }
    if (crossingPosition !== layer.length - 1
        || residual !== terminal.E) {
      throw new Error("termwise crossing location");
    }
    const lastTerm = pow2(last.t + last.k) * pow3(nu);
    const lambdaLast = last.t + last.k;
    const sLast = mu - lambdaLast;
    const expectedSLast = nu + (c === 1 ? 1 : 0);
    if (sLast !== expectedSLast
        || crossingGap !== lastTerm + terminal.E
        || crossingGap
          !== pow2(lambdaLast) * (pow3(nu) - pow2(sLast))) {
      throw new Error("termwise gap normal form");
    }
    ++termwiseCrossingChecks;

    let precedingLayerCarry = 0n;
    for (let j = 0; j + 1 < layer.length; ++j) {
      precedingLayerCarry += pow2(layer[j].t + layer[j].k)
        * pow3(r - layer[j].t);
    }
    const FStar = pow2(N + 1) + star.A * pow3(LStar);
    const FPre = FStar + precedingLayerCarry;
    if (4n * K - FPre !== crossingGap
        || (FPre - pow2(N + 1)) % pow3(nu + 1) !== 0n) {
      throw new Error("ordered top residue");
    }
    ++orderedResidueChecks;

    // The apparent extra ternary digit is exactly the local decoder after
    // the last spike.  Here yNumerator/D is the terminal stripped state.
    const xNumerator = 2n * K - D;
    const terminalYFull = pow2(U + c) * xNumerator + D;
    if (terminalYFull % pow3(L) !== 0n
        || terminalYFull / pow3(L) !== yNumerator) {
      throw new Error("terminal stripped rational");
    }
    if ((pow2(sLast) * yNumerator - pow3(tau) * D)
          % pow3(tau + 1) !== 0n
        || yNumerator % pow3(tau) !== 0n
        || yNumerator % pow3(tau + 1) === 0n) {
      throw new Error("terminal unit digit");
    }
    const yUnit = yNumerator / pow3(tau);
    const localStripExponent = tau + L - (c + 1) / 2;
    if ((sLast - localStripExponent) % 2 !== 0
        || (pow2(localStripExponent) * yUnit - D) % 3n !== 0n) {
      throw new Error("last-spike local decoder");
    }
    ++terminalUnitDigitChecks;

    if (firstNonboundaryWitness === null) {
      firstNonboundaryWitness = {
        r, N, e, U,
        HStar: star.H,
        spikes: spikes.join(","),
        c, L, d, sigma, tau, s,
        G: G.toString(),
        W: W.toString()
      };
    }
  }
}

// Genuine q=1 local integer shadows.  For U=39 mod 54, the exact suffix
// (2,1,1,U+2) runs from z through three larger states to Q=3.  It realizes
// L=1, sigma=1, tau=2, s=4, G=1, and W=11.
let shadowRows = 0n;
let firstShadow = null;
let lastShadow = null;
for (let n = 0; n < shadowRowsRequested; ++n) {
  const U = 39 + 54 * n;
  const e = U + 2;
  const Q = 3n;
  const terminalNumerator = 5n * pow2(U + 1) + 1n;
  const startNumerator = 5n * pow2(U + 5) - 11n;
  if (terminalNumerator % 3n !== 0n || startNumerator % 81n !== 0n) {
    throw new Error("shadow congruence");
  }
  const y = terminalNumerator / 3n;
  const z = startNumerator / 81n;
  let state = z;
  const states = [state];
  for (const a of [2, 1, 1, e]) {
    const branchNumerator = 3n * state + pow2(a - 1) - 1n;
    if (branchNumerator % pow2(a) !== 0n) {
      throw new Error("shadow exact branch");
    }
    state = branchNumerator / pow2(a);
    states.push(state);
  }
  if (state !== Q || states[3] !== y
      || states.slice(0, 4).some(value => value <= Q)
      || 16n * y !== 27n * z + 9n
      || 11n !== 27n - 16n) {
    throw new Error("shadow transport or leastness");
  }
  const row = {
    U,
    exponents: `2,1,1,${e}`,
    Q: Q.toString(),
    zBits: bitLength(z),
    yBits: bitLength(y),
    W: "11"
  };
  if (firstShadow === null) firstShadow = row;
  lastShadow = row;
  ++shadowRows;
}

// Exact order audit modulo 81 for the shadow progression.
let residue = 1n;
let order = null;
for (let j = 1; j <= 54; ++j) {
  residue = residue * 2n % 81n;
  if (residue === 1n && order === null) order = j;
}
if (order !== 54 || 5n * pow2(44) % 81n !== 11n) {
  throw new Error("shadow residue period");
}

console.log(JSON.stringify({
  theorem: "one-drop terminal boundary-coupling collapse",
  maxR,
  profiles: profiles.toString(),
  denominatorOneProfiles: denominatorOneProfiles.toString(),
  positiveTransitions: positiveTransitions.toString(),
  terminalBoundaryTransitions: terminalBoundaryTransitions.toString(),
  nonboundaryTransitions: nonboundaryTransitions.toString(),
  noSuffixSpikeCases: noSuffixSpikeCases.toString(),
  lastSuffixSpikeCases: lastSuffixSpikeCases.toString(),
  layerFactorChecks: layerFactorChecks.toString(),
  prefixStateChecks: prefixStateChecks.toString(),
  globalCutChecks: globalCutChecks.toString(),
  strippedStateChecks: strippedStateChecks.toString(),
  openBlockCouplingChecks: openBlockCouplingChecks.toString(),
  termwiseCrossingChecks: termwiseCrossingChecks.toString(),
  orderedResidueChecks: orderedResidueChecks.toString(),
  terminalUnitDigitChecks: terminalUnitDigitChecks.toString(),
  unitLayerCofactors: unitLayerCofactors.toString(),
  boundaryGapCounts: Object.fromEntries(
    [...boundaryGapCounts].map(([key, value]) => [key, value.toString()])),
  firstNonboundaryWitness,
  shadowRows: shadowRows.toString(),
  firstShadow,
  lastShadow,
  shadowResidueOrder: order,
  status: "PASS"
}, null, 2));
