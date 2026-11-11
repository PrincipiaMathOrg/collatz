"use strict";

// Exact finite and cutoff certificate for the maximal lower-mechanical
// q=2 profile.  All arithmetic used for the residue gate and the two cutoff
// inequalities is BigInt arithmetic.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function mod(a, modulus) {
  const value = a % modulus;
  return value < 0n ? value + modulus : value;
}

function inverse(a, modulus) {
  let oldR = a;
  let r = modulus;
  let oldS = 1n;
  let s = 0n;
  while (r !== 0n) {
    const quotient = oldR / r;
    [oldR, r] = [r, oldR - quotient * r];
    [oldS, s] = [s, oldS - quotient * s];
  }
  assert(oldR === 1n, "modular inverse does not exist");
  return mod(oldS, modulus);
}

function bitLength(value) {
  return value.toString(2).length;
}

const finiteCutoff = 5000;
const analyticStart = BigInt(finiteCutoff + 1);

let powerOfThree = 1n;
let carry = 0n;
let previousCeiling = 0;
let q2Weights = 0;
let strictTargets = 0;
let equalityTargets = 0;
let testedTargets = 0n;

for (let weight = 1; weight <= finiteCutoff; ++weight) {
  // Before the update, powerOfThree=3^(weight-1), so this is exactly
  // floor((weight-1) log_2 3).
  const position = bitLength(powerOfThree) - 1;
  carry = 3n * carry + (1n << BigInt(position));
  powerOfThree *= 3n;

  // Since 3^weight is not a power of two, this is ceil(weight log_2 3).
  const ceiling = bitLength(powerOfThree);
  const rowIncrement = ceiling - previousCeiling;
  previousCeiling = ceiling;
  if (rowIncrement !== 1 || weight < 2) continue;
  ++q2Weights;

  const modulusPower = 1n << BigInt(ceiling);
  const determinant = modulusPower - powerOfThree;
  const target = mod(carry * inverse(modulusPower, determinant), determinant);
  if (target === 0n) ++equalityTargets;

  const terminalDelay = ceiling - weight - 1;
  if (terminalDelay < 1) continue;
  const maximumStrictTarget = BigInt(Math.floor((terminalDelay + 1) / 2));
  assert(maximumStrictTarget < determinant, "target interval wraps modulo D");

  if (target >= 1n && target <= maximumStrictTarget) ++strictTargets;
  testedTargets += maximumStrictTarget;
}

assert(q2Weights === 2075, "q=2 weight count changed");
assert(strictTargets === 0, "a strict maximal-profile target survives");
assert(equalityTargets === 0, "a maximal-profile equality target survives");

// The analytic comparison used in the proof is
//   (4/3)^((s-2)/8) > 461 s^15.
// Raising to the eighth power produces the first exact inequality below.
const cutoffBase =
  4n ** (analyticStart - 2n) >
  3n ** (analyticStart - 2n) * 461n ** 8n * analyticStart ** 120n;

// This verifies that the exponential-to-polynomial quotient increases from
// analyticStart onward.  Indeed, (1+1/s)^120 decreases with s.
const propagation =
  4n * analyticStart ** 120n >
  3n * (analyticStart + 1n) ** 120n;

assert(cutoffBase, "analytic base inequality failed");
assert(propagation, "analytic propagation inequality failed");

console.log(`finite_cutoff=${finiteCutoff}`);
console.log(`q2_weights=${q2Weights}`);
console.log(`tested_strict_targets=${testedTargets}`);
console.log(`strict_target_hits=${strictTargets}`);
console.log(`equality_target_hits=${equalityTargets}`);
console.log(`analytic_start=${analyticStart}`);
console.log(`cutoff_base=${cutoffBase}`);
console.log(`propagation=${propagation}`);
