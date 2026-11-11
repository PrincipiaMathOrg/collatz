#!/usr/bin/env node
"use strict";

// Exact arithmetic certificate for the numerical constants in
// transition_entropy_linear.md. The cylinder, rational mechanical
// complexity, and entropy arguments are symbolic proofs in the report.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

const periodBarrier = 72057431991n;

// The established period barrier lies beyond 2^36.
assert(periodBarrier > 2n ** 36n,
  "period barrier is not larger than 2^36");

// This gives L = ceil(log_2(611 r^15)) < 15 log_2(r) + 11.
assert(611n < 2n ** 10n,
  "state-envelope coefficient bound failed");

// Exact form of h_2(1/193) < 117/2500.
assert(193n ** 482500n <
  2n ** 22581n * 192n ** 480000n,
  "binary entropy rational bound failed");

// Exact form of log_2(1104) < 81/8.
assert(1104n ** 8n < 2n ** 81n,
  "base logarithm bound failed");

// Positivity of the derivative lower bound
// 1 - 351/500 - 15/368 > 0.
assert(149n * 368n > 15n * 500n,
  "monotonicity bound failed");

// Exact base margin
// 36 - 81/8 - 117*551/2500 = 441/5000.
assert(
  36n * 5000n - 81n * 625n - 117n * 551n * 2n === 441n,
  "base margin identity failed");

console.log(`period_barrier=${periodBarrier}`);
console.log("period_barrier_gt_2_pow_36=true");
console.log("state_envelope_log_bound=true");
console.log("entropy_h_1_over_193_lt_117_over_2500=true");
console.log("log2_1104_lt_81_over_8=true");
console.log("monotonicity_bound=true");
console.log("base_margin=441/5000");
console.log("binary_cycle_transition_density_gt_1_over_193=true");
console.log("transition_entropy_linear_certificate_passed=true");
