#!/usr/bin/env node
"use strict";

// Test the exactness-only part of packet contraction.  A packet merge
// lowers one constant-delay block to its preceding level and hence removes
// one nonterminal corner while retaining the terminal row.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function bitLength(n) {
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

const maximumWeight = Number(process.argv[2] || 20);
assert(Number.isInteger(maximumWeight) && maximumWeight >= 8,
  "usage: q2_lifted_packet_contraction_probe.js MAX_WEIGHT");

let profiles = 0;
let exactFiveCornerTops = 0;
let singletonExactTops = 0;
let packetExactTops = 0;
let isolatedPacketTops = 0;
let firstNoExactSingleton = null;
let firstNoExactPacket = null;

for (let weight = 8; weight <= maximumWeight; ++weight) {
  const P = 3n ** BigInt(weight);
  const N = bitLength(P);
  if (N - bitLength(P / 3n) !== 1) continue;
  const M = 1n << BigInt(N);
  const inverseP = inverse(P, M);
  const maxima = Array(weight).fill(0);
  for (let i = 1; i < weight; ++i) {
    maxima[i] = bitLength(3n ** BigInt(i)) - 1 - i;
  }
  const delays = Array(weight).fill(0);

  function delta(i, r) {
    return (1n << BigInt(i + r - 1)) *
      3n ** BigInt(weight - 1 - i);
  }

  function carry(path) {
    let C = P - (1n << BigInt(weight));
    for (let i = 1; i < weight; ++i) {
      for (let r = 1; r <= path[i]; ++r) C += delta(i, r);
    }
    return C;
  }

  function endpoint(C) {
    const rho = mod(-C * inverseP, M);
    const numerator = P * rho + C;
    assert(numerator % M === 0n, "nonintegral endpoint");
    return {rho, endpoint: numerator / M};
  }

  function visit(i, previous) {
    if (i === weight - 1) {
      delays[i] = maxima[i];
      if (delays[i] < previous) return;
      ++profiles;
      const jumps = [];
      for (let row = 1; row < weight; ++row) {
        if (delays[row] > delays[row - 1]) jumps.push(row);
      }
      if (jumps.length < 5) return;
      const topC = carry(delays);
      const top = endpoint(topC);
      if ((top.endpoint & 1n) === 0n) return;
      ++exactFiveCornerTops;

      let exactSingleton = false;
      for (const row of jumps) {
        if (row === weight - 1) continue;
        const child = endpoint(topC - delta(row, delays[row]));
        if ((child.endpoint & 1n) !== 0n) {
          exactSingleton = true;
          break;
        }
      }
      if (exactSingleton) {
        ++singletonExactTops;
      } else if (firstNoExactSingleton === null) {
        firstNoExactSingleton = {
          weight,
          delays: delays.slice(),
          start: top.rho.toString(),
          endpoint: top.endpoint.toString(),
          jumps
        };
      }

      let exactPacket = false;
      for (let index = 0; index + 1 < jumps.length; ++index) {
        const row = jumps[index];
        const nextRow = jumps[index + 1];
        const previousLevel = delays[row - 1];
        const childDelays = delays.slice();
        for (let j = row; j < nextRow; ++j) childDelays[j] = previousLevel;
        const child = endpoint(carry(childDelays));
        if ((child.endpoint & 1n) !== 0n) {
          exactPacket = true;
          break;
        }
      }
      if (exactPacket) {
        ++packetExactTops;
      } else {
        ++isolatedPacketTops;
        if (firstNoExactPacket === null) {
          firstNoExactPacket = {
            weight,
            delays: delays.slice(),
            start: top.rho.toString(),
            endpoint: top.endpoint.toString(),
            jumps
          };
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

if (maximumWeight === 20) {
  assert(profiles === 2029912, "profile count changed");
  assert(exactFiveCornerTops === 994774,
    "exact five-corner top count changed");
  assert(singletonExactTops === 974770,
    "singleton exactness count changed");
  assert(packetExactTops === 972935,
    "packet exactness count changed");
  assert(isolatedPacketTops === 21839,
    "isolated packet count changed");
  assert(firstNoExactSingleton !== null &&
    firstNoExactSingleton.weight === 10 &&
    firstNoExactSingleton.start === "60231" &&
    firstNoExactSingleton.endpoint === "54271",
  "first singleton-exactness witness changed");
  assert(firstNoExactPacket !== null &&
    firstNoExactPacket.weight === 13 &&
    firstNoExactPacket.start === "1604351" &&
    firstNoExactPacket.endpoint === "1219681",
  "first packet-exactness witness changed");
}

console.log(JSON.stringify({
  probe: "exactness under q2 packet contraction",
  maximumWeight,
  profiles,
  exactFiveCornerTops,
  singletonExactTops,
  packetExactTops,
  isolatedPacketTops,
  firstNoExactSingleton,
  firstNoExactPacket,
  warning: "exactness only; FCD color is not asserted"
}, null, 2));
