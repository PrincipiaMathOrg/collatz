#!/usr/bin/env node
"use strict";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const r0 = 72057431991n;
const U0 = 267883n;

const logarithm612 = 612n ** 50n < 2n ** 463n;
const logarithmR0 = r0 ** 10n < 2n ** 361n;
assert(logarithm612, "612 logarithm bound");
assert(logarithmR0, "period logarithm bound");

const scaledGap =
  25n * (r0 - 2n * U0 - 3n) -
  25n * U0 * (U0 + 1n) -
  (2n * U0 + 4n) * 13769n;
assert(scaledGap === 6149120n, "base gap");

const k = 15n * (2n * U0 + 4n);
assert(k === 8036550n, "propagation exponent");
assert(2n * k < r0, "monotone propagation bound");

console.log(JSON.stringify({
  periodBarrier: r0.toString(),
  excludedThroughU: U0.toString(),
  firstSurvivingU: (U0 + 1n).toString(),
  log612Bound: logarithm612,
  logPeriodBound: logarithmR0,
  scaledBaseGap: scaledGap.toString(),
  propagationExponent: k.toString(),
  propagationBound: true
}));
