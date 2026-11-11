#!/usr/bin/env node
"use strict";

// Exact regressions for the arbitrary-corner packet normal form and the
// one-bit dyadic lift which records terminal valuation exactness.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function bitLength(n) {
  assert(n > 0n, "bit length requires a positive integer");
  return n.toString(2).length;
}

function mod(a, m) {
  const value = a % m;
  return value < 0n ? value + m : value;
}

function inverse(a, m) {
  let oldR = a;
  let r = m;
  let oldS = 1n;
  let s = 0n;
  while (r !== 0n) {
    const q = oldR / r;
    [oldR, r] = [r, oldR - q * r];
    [oldS, s] = [s, oldS - q * s];
  }
  assert(oldR === 1n, "inverse does not exist");
  return mod(oldS, m);
}

function analyticCutoff(corners) {
  assert(corners >= 2, "the packet cutoff starts with two corners");
  const n = 1n << BigInt(corners - 1);
  const power = 15n * (2n * n - 1n);
  const constant = 307n ** (n - 1n) * 154n ** n;

  function reversedAt(s) {
    const ss = BigInt(s);
    const left = 1n << (ss + n - 2n);
    const right = constant * ss ** power;
    return left > right;
  }

  function propagatesAt(s) {
    const ss = BigInt(s);
    return 2n * ss ** power > (ss + 1n) ** power;
  }

  let low = Math.max(2, Number(2n * power));
  let high = low;
  while (!(reversedAt(high) && propagatesAt(high))) high *= 2;
  while (low < high) {
    const middle = Math.floor((low + high) / 2);
    if (reversedAt(middle) && propagatesAt(middle)) high = middle;
    else low = middle + 1;
  }
  while (low > 2 && reversedAt(low - 1) && propagatesAt(low - 1)) --low;
  assert(reversedAt(low) && propagatesAt(low), "cutoff certification failed");
  return {corners, cutoff: low, n: n.toString(), polynomialPower: power.toString()};
}

const expectedCutoffs = new Map([[2, 415], [3, 1115], [4, 2672], [5, 6071]]);
const cutoffs = [];
for (let corners = 2; corners <= 5; ++corners) {
  const row = analyticCutoff(corners);
  assert(row.cutoff === expectedCutoffs.get(corners),
    `corner cutoff changed at c=${corners}`);
  cutoffs.push(row);
}

let q2Weights = 0;
let profiles = 0;
let carryRegressions = 0;
let liftedCellRegressions = 0;
let exactnessChanges = 0;
let firstExactnessChange = null;

for (let weight = 3; weight <= 12; ++weight) {
  const P = 3n ** BigInt(weight);
  const N = bitLength(P);
  if (N - bitLength(P / 3n) !== 1) continue;
  ++q2Weights;
  const M = 1n << BigInt(N);
  const twiceM = 2n * M;
  const D = M - P;
  const inverseP = inverse(P, M);
  const liftedInverseP = inverse(P, twiceM);
  const maxima = Array(weight).fill(0);
  for (let i = 1; i < weight; ++i) {
    maxima[i] = bitLength(3n ** BigInt(i)) - 1 - i;
  }
  const delays = Array(weight).fill(0);

  function delta(i, r) {
    return (1n << BigInt(i + r - 1)) *
      3n ** BigInt(weight - 1 - i);
  }

  function directCarry() {
    let C = P - (1n << BigInt(weight));
    for (let i = 1; i < weight; ++i) {
      for (let r = 1; r <= delays[i]; ++r) C += delta(i, r);
    }
    return C;
  }

  function packetCarry() {
    const jumpRows = [];
    const jumpLevels = [];
    for (let i = 1; i < weight - 1; ++i) {
      if (delays[i] > delays[i - 1]) {
        jumpRows.push(i);
        jumpLevels.push(delays[i]);
      }
    }
    let C = P;
    let previousLevel = 0;
    for (let j = 0; j < jumpRows.length; ++j) {
      const row = jumpRows[j];
      const level = jumpLevels[j];
      const X = (1n << BigInt(row)) * 3n ** BigInt(weight - row);
      C += ((1n << BigInt(level)) - (1n << BigInt(previousLevel))) * X;
      previousLevel = level;
    }
    C -= 3n * (1n << BigInt(weight + previousLevel - 1));
    C += M / 4n;
    return C;
  }

  function point(C) {
    const rho = mod(-C * inverseP, M);
    const liftedRho = mod(-C * liftedInverseP, twiceM);
    assert(liftedRho === rho || liftedRho === rho + M,
      "lifted residue did not project to the canonical start");
    const endpointNumerator = P * rho + C;
    assert(endpointNumerator % M === 0n, "nonintegral endpoint");
    const endpoint = endpointNumerator / M;
    const exactness = liftedRho === rho + M ? 1n : 0n;
    assert(exactness === (endpoint & 1n), "lift bit is not endpoint parity");
    return {rho, liftedRho, endpoint, exactness};
  }

  function visit(i, previous) {
    if (i === weight - 1) {
      delays[i] = maxima[i];
      if (delays[i] < previous) return;
      ++profiles;
      const C = directCarry();
      assert(packetCarry() === C, "packet carry formula failed");
      ++carryRegressions;
      const top = point(C);

      for (let row = 1; row < weight - 1; ++row) {
        if (delays[row] <= delays[row - 1]) continue;
        const removed = delta(row, delays[row]);
        const L = mod(removed * inverseP, M);
        const VNumerator = D * L + removed;
        assert(VNumerator % M === 0n, "nonintegral reduced threshold");
        const V = VNumerator / M;
        const liftedL = mod(removed * liftedInverseP, twiceM);
        assert((L & 1n) === 0n, "nonterminal threshold is not even");
        assert(liftedL === L + (V & 1n) * M,
          "lifted threshold bit is not V parity");

        const child = point(C - removed);
        assert(child.liftedRho === mod(top.liftedRho + liftedL, twiceM),
          "lifted corner translation failed");
        const dyadicWrap = (top.rho + L) / M;
        const predicted = top.exactness ^ ((V + dyadicWrap) & 1n);
        assert(child.exactness === predicted,
          "endpoint exactness update failed");
        ++liftedCellRegressions;
        if (child.exactness !== top.exactness) {
          ++exactnessChanges;
          if (firstExactnessChange === null) {
            firstExactnessChange = {
              weight,
              delays: delays.slice(),
              corner: [row, delays[row]],
              topStart: top.rho.toString(),
              topEndpoint: top.endpoint.toString(),
              childStart: child.rho.toString(),
              childEndpoint: child.endpoint.toString(),
              L: L.toString(),
              V: V.toString(),
              dyadicWrap: dyadicWrap.toString()
            };
          }
        }
      }
      return;
    }

    for (let value = previous; value <= maxima[i]; ++value) {
      delays[i] = value;
      visit(i + 1, value);
    }
  }

  delays[0] = 0;
  visit(1, 0);
}

assert(firstExactnessChange !== null, "no terminal-exactness change found");
assert(firstExactnessChange.weight === 8, "first exactness regression moved");
assert(firstExactnessChange.topStart === "3903", "top regression start changed");
assert(firstExactnessChange.topEndpoint === "3127", "top regression endpoint changed");
assert(firstExactnessChange.childStart === "191", "child regression start changed");
assert(firstExactnessChange.childEndpoint === "154", "child regression endpoint changed");

console.log(JSON.stringify({
  probe: "arbitrary-corner packet and exactness-lifted q2 container",
  cutoffs,
  q2Weights,
  profiles,
  carryRegressions,
  liftedCellRegressions,
  exactnessChanges,
  firstExactnessChange,
  warning: "fixed corner count is finite; the unrestricted corner count remains open"
}, null, 2));
