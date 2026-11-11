"use strict";

// Exact-word probe for a possible direct HSCI inequality.
//
// For a strict accelerated valuation word w, rho(w) is the least positive
// odd representative of its ordinary 3x+1 cylinder.  Set e_L=1 and run the
// paired 3x-1 recurrence backwards,
//
//     e_j = (1 + 2^{a_j} e_{j+1}) / 3.
//
// The script tests
//
//     sum_{j<L} 1/e_j <= log_2(rho(w)+1).
//
// Floating point is used only to discover or refute the inequality.  Every
// cylinder, barrier decision, and reported word is computed exactly.

function parseOption(name, fallback) {
  const index = process.argv.indexOf(name);
  if (index < 0) return fallback;
  if (index + 1 >= process.argv.length) throw new Error(`missing ${name}`);
  return Number(process.argv[index + 1]);
}

function valuation2(value) {
  let a = 0;
  while ((value & 1n) === 0n) {
    value >>= 1n;
    ++a;
  }
  return a;
}

function extendCylinder(state, a) {
  const oldModulus = 1n << BigInt(state.exponent + 1);
  const liftLimit = 1n << BigInt(a);
  for (let lift = 0n; lift < liftLimit; ++lift) {
    const endpoint = state.endpoint + 2n * state.power3 * lift;
    const numerator = 3n * endpoint + 1n;
    if (valuation2(numerator) !== a) continue;
    return {
      rho: state.rho + oldModulus * lift,
      endpoint: numerator >> BigInt(a),
      exponent: state.exponent + a,
      power3: state.power3 * 3n,
    };
  }
  throw new Error("cylinder extension not found");
}

function log2BigInt(value) {
  if (value <= 0n) throw new Error("logarithm of nonpositive integer");
  const bits = value.toString(2).length;
  const shift = Math.max(0, bits - 53);
  const top = Number(value >> BigInt(shift));
  return Math.log2(top) + shift;
}

function dualMass(word) {
  let e = 1;
  let mass = 0;
  let minimum = 1;
  for (let j = word.length - 1; j >= 0; --j) {
    e = (1 + 2 ** word[j] * e) / 3;
    minimum = Math.min(minimum, e);
    mass += 1 / e;
  }
  return {mass, start: e, minimum};
}

const maximumLength = parseOption("--max-length", 16);
const showViolations = process.argv.includes("--show-violations");
const tolerance = 1e-12;
const power3 = [1n];
for (let j = 1; j <= maximumLength; ++j) power3.push(power3.at(-1) * 3n);

const counts = new Array(maximumLength + 1).fill(0);
const maxima = new Array(maximumLength + 1).fill(null);
let violations = 0;
let closest = null;

function record(word, state) {
  const L = word.length;
  const dual = dualMass(word);
  const logarithm = log2BigInt(state.rho + 1n);
  const slack = logarithm - dual.mass;
  const ratio = dual.mass / logarithm;
  ++counts[L];
  const row = {
    length: L,
    word: word.join(","),
    exponent: state.exponent,
    rho: state.rho.toString(),
    mass: dual.mass,
    logarithm,
    slack,
    ratio,
    dualStart: dual.start,
    dualMinimum: dual.minimum,
  };
  if (maxima[L] === null || ratio > maxima[L].ratio) maxima[L] = row;
  if (closest === null || slack < closest.slack) closest = row;
  if (slack < -tolerance) {
    ++violations;
    if (showViolations) console.log(`violation=${JSON.stringify(row)}`);
  }
}

function dfs(word, state) {
  const L = word.length;
  if (L > 0) record(word, state);
  if (L === maximumLength) return;

  // A strict prefix of new length k has 2^A < 3^k.  Hence only finitely
  // many positive exponents can extend the current node.
  const nextLength = L + 1;
  for (let a = 1; ; ++a) {
    const nextExponent = state.exponent + a;
    if ((1n << BigInt(nextExponent)) >= power3[nextLength]) break;
    const nextState = extendCylinder(state, a);
    word.push(a);
    dfs(word, nextState);
    word.pop();
  }
}

dfs([], {rho: 1n, endpoint: 1n, exponent: 0, power3: 1n});

for (let L = 1; L <= maximumLength; ++L) {
  const row = maxima[L];
  console.log(
    `length=${L} words=${counts[L]} max_ratio=${row.ratio.toFixed(12)} ` +
      `slack=${row.slack.toFixed(12)} rho=${row.rho} word=${row.word}`
  );
}
console.log(`closest=${JSON.stringify(closest)}`);
console.log(`violations=${violations}`);
console.log("probe_complete=true");
