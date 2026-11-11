#!/usr/bin/env node
"use strict";

// Direct initial-value scan for the fixed lower-Sturmian coefficient gate.
// This is a diagnostic complement to beatty_ostrowski_prefix_probe.js: each
// positive q is followed along its intrinsic partial Collatz path, and the
// path is stopped as soon as a spike lies outside the lower clock or the
// state is 3 modulo 4.  A row is reported if
//
//        q 2^(t+V_t) <= 3^t.
//
// In that range q is automatically the least positive representative of
// the length-t cylinder, so a reported row is a genuine counterexample to
// the lower-Sturmian coefficient assertion.

const maxQ = Number(process.argv[2] || 1000000);
const maxT = Number(process.argv[3] || 512);
if (!Number.isSafeInteger(maxQ) || maxQ < 1) throw new Error("bad maxQ");
if (!Number.isSafeInteger(maxT) || maxT < 1) throw new Error("bad maxT");

function bitLength(n) { return n.toString(2).length; }

const powers3 = [1n];
const clock = [0];
for (let t = 1; t <= maxT; ++t) {
  powers3.push(3n * powers3[t - 1]);
  const now = bitLength(powers3[t]) - 1 - t;
  const before = bitLength(powers3[t - 1]) - 1 - (t - 1);
  clock.push(now - before);
}

let longest = {length: 0, q: 0, endpoint: "0", V: 0, reason: ""};
let counterexample = null;
let totalSteps = 0n;
let closest = null;

for (let qNumber = 1; qNumber <= maxQ && counterexample === null; ++qNumber) {
  const q = BigInt(qNumber);
  let z = q;
  let V = 0;
  let reason = "horizon";
  let t = 0;

  for (t = 1; t <= maxT; ++t) {
    if ((z & 1n) === 0n) {
      z = 3n * z / 2n;
    } else if ((z & 3n) === 1n) {
      if (clock[t] === 0) {
        reason = "spike-outside-clock";
        --t;
        break;
      }
      z = (3n * z + 1n) / 4n;
      ++V;
    } else {
      reason = "valuation-at-least-three";
      --t;
      break;
    }
    ++totalSteps;

    const L = t + V;
    const scaled = q * (1n << BigInt(L));
    const gap = scaled - powers3[t];
    if (gap > 0n) {
      const relative = Number(gap * 1000000000000n / powers3[t]);
      if (closest === null || relative < closest.relative) {
        closest = {
          relative,
          q: qNumber,
          t,
          V,
          L,
          gap: gap.toString(),
          denominator: powers3[t].toString(),
          endpoint: z.toString()
        };
      }
    }
    if (scaled <= powers3[t]) {
      counterexample = {
        q: qNumber,
        t,
        V,
        L,
        endpoint: z.toString(),
        clockPrefix: clock.slice(1, t + 1).join("")
      };
      break;
    }
  }

  const survived = Math.min(t, maxT);
  if (survived > longest.length) {
    longest = {
      length: survived,
      q: qNumber,
      endpoint: z.toString(),
      V,
      reason
    };
  }
}

console.log(JSON.stringify({
  theorem: "direct-q lower-Sturmian coefficient diagnostic",
  maxQ,
  maxT,
  totalSteps: totalSteps.toString(),
  longest,
  closest,
  counterexample,
  status: counterexample === null ? "NO_COUNTEREXAMPLE_IN_RANGE" : "COUNTEREXAMPLE"
}, null, 2));

if (counterexample !== null) process.exitCode = 1;
