"use strict";

// Exact finite stress test for any proposed implication
//
//   bounded ternary decoder + strict barrier + positive surplus
//     => low factor complexity.
//
// Two equal-length codewords over accelerated exponents encode a binary
// de Bruijn word.  Both codewords have length 12 and total exponent 19,
// have no adjacent exponent-one letters, and begin and end in exponent 2.
// A fixed (1,2)^3 buffer makes every prefix a strict barrier.  P15 can then
// embed [2, buffer, encoded word, 2] after cylinder stabilization.

function deBruijnBinary(order) {
  const a = new Array(2 * order + 1).fill(0);
  const cyclic = [];
  function db(t, p) {
    if (t > order) {
      if (order % p === 0) {
        for (let j = 1; j <= p; ++j) cyclic.push(a[j]);
      }
      return;
    }
    a[t] = a[t - p];
    db(t + 1, p);
    for (let j = a[t - p] + 1; j < 2; ++j) {
      a[t] = j;
      db(t + 1, t);
    }
  }
  db(1, 1);
  return cyclic.concat(cyclic.slice(0, order - 1));
}

function pow(base, exponent) {
  return base ** BigInt(exponent);
}

function totalExponent(word) {
  return word.reduce((sum, a) => sum + a, 0);
}

function shortcutWord(acceleratedWord) {
  const result = [];
  for (const a of acceleratedWord) {
    result.push(1);
    for (let j = 1; j < a; ++j) result.push(0);
  }
  return result;
}

function factorCount(word, length) {
  const factors = new Set();
  for (let i = 0; i + length <= word.length; ++i)
    factors.add(word.slice(i, i + length).join(""));
  return factors.size;
}

function cylinder(word) {
  let rho = 1n;
  let endpoint = 1n;
  let exponent = 0;
  let power3 = 1n;
  for (const a of word) {
    const oldModulus = 1n << BigInt(exponent + 1);
    let found = false;
    for (let lift = 0n; lift < (1n << BigInt(a)); ++lift) {
      const candidateEndpoint = endpoint + 2n * power3 * lift;
      const numerator = 3n * candidateEndpoint + 1n;
      let value = numerator;
      let valuation = 0;
      while ((value & 1n) === 0n) {
        value >>= 1n;
        ++valuation;
      }
      if (valuation !== a) continue;
      rho += oldModulus * lift;
      endpoint = numerator >> BigInt(a);
      exponent += a;
      power3 *= 3n;
      found = true;
      break;
    }
    if (!found) throw new Error("cylinder lift not found");
  }
  return {rho, endpoint, exponent};
}

const order = 10;
const code0 = [2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2];
const code1 = [2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 2];
const codes = [code0, code1];
const buffer = [1, 2, 1, 2, 1, 2];

for (const code of codes) {
  if (code.length !== 12 || totalExponent(code) !== 19)
    throw new Error("code length or weight mismatch");
  if (code[0] !== 2 || code[code.length - 1] !== 2)
    throw new Error("code boundary is not a decoder reset");
  for (let i = 1; i < code.length; ++i)
    if (code[i - 1] === 1 && code[i] === 1)
      throw new Error("adjacent exponent-one letters in code");
}
if (!(pow(3n, 12) > pow(2n, 19)))
  throw new Error("code has nonpositive surplus");

// Since each complete code multiplies q by 3^12/2^19 > 1, it suffices to
// check the buffer and one copy of each possible code prefix.
let prefixLength = 0;
let prefixExponent = 0;
for (const a of buffer) {
  ++prefixLength;
  prefixExponent += a;
  if (!(pow(3n, prefixLength) > pow(2n, prefixExponent)))
    throw new Error("buffer barrier failure");
}
for (const code of codes) {
  let length = prefixLength;
  let exponent = prefixExponent;
  for (const a of code) {
    ++length;
    exponent += a;
    if (!(pow(3n, length) > pow(2n, exponent)))
      throw new Error("universal code-prefix barrier failure");
  }
}

const driver = deBruijnBinary(order);
const driverFactors = factorCount(driver, order);
if (driverFactors !== (1 << order))
  throw new Error("de Bruijn factor certificate failure");

const encoded = [];
for (const bit of driver) encoded.push(...codes[bit]);
const core = buffer.concat(encoded);
const pAccelerated = factorCount(encoded, 12 * order);
const shortcutEncoded = shortcutWord(encoded);
const pShortcut = factorCount(shortcutEncoded, 19 * order);
if (pAccelerated < (1 << order) || pShortcut < (1 << order))
  throw new Error("encoded factor-complexity certificate failure");

// A leading exponent 2 makes the next decoder depth zero for every positive
// starting state.  Thereafter exponent 2 resets the decoder to zero and an
// isolated exponent 1 increments it to one.
const p15Suffix = [2].concat(core, [2]);
let decoderDepth = 0;
let maximumDecoderDepth = 0;
for (const a of p15Suffix) {
  if (a === 2) decoderDepth = 0;
  else if (a === 1) ++decoderDepth;
  else throw new Error("unexpected exponent in decoder certificate");
  maximumDecoderDepth = Math.max(maximumDecoderDepth, decoderDepth);
}
if (maximumDecoderDepth !== 1)
  throw new Error("decoder bound failure");

// The cylinder is not used to materialize the astronomically large P15 seed.
// It verifies exact finite realizability and the mod-8 hypothesis in P15.2.
const suffixCylinder = cylinder(p15Suffix);
if ((2n * suffixCylinder.rho + 1n) % 8n !== 3n)
  throw new Error("P15 residue-class hypothesis failure");

console.log(`debruijn_order=${order} driver_length=${driver.length}`);
console.log(`driver_factor_count=${driverFactors}`);
console.log("code_length=12 code_total_exponent=19 code_surplus_numerator=7153");
console.log(`buffer_length=${buffer.length} buffer_total_exponent=${totalExponent(buffer)}`);
console.log(`encoded_length=${encoded.length} encoded_total_exponent=${totalExponent(encoded)}`);
console.log(`accelerated_test_length=${12 * order} accelerated_factor_count=${pAccelerated}`);
console.log(`shortcut_length=${shortcutEncoded.length}`);
console.log(`shortcut_test_length=${19 * order} shortcut_factor_count=${pShortcut}`);
console.log(`maximum_decoder_depth_after_reset=${maximumDecoderDepth}`);
console.log(`p15_suffix_length=${p15Suffix.length} p15_suffix_exponent=${suffixCylinder.exponent}`);
console.log(`p15_rho_bits=${suffixCylinder.rho.toString(2).length}`);
console.log("universal_core_barrier=true p15_applicable=true certificate_passed=true");
