"use strict";

// Exact finite certificate for the transition-dense stabilization no-go.
//
// We concatenate the two P28 codewords along successively larger binary
// de Bruijn words.  At each stage one of two final driver bits is chosen so
// that the canonical dyadic representative changes.  Thus the finite words
// retain strict barriers, bounded decoder depth, positive linear surplus,
// and high factor complexity, while their compatible representatives do not
// stabilize.

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

function totalExponent(word) {
  return word.reduce((sum, a) => sum + a, 0);
}

function encode(driver, codes) {
  const word = [];
  for (const bit of driver) word.push(...codes[bit]);
  return word;
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

function floorAlphaTimes(t) {
  // For the tested lengths, floor(t log_2 3) is certified by comparing
  // 3^t with adjacent powers of 2, so no floating-point decision is used.
  const power3 = 3n ** BigInt(t);
  let b = Math.floor(t * Math.log2(3));
  while ((1n << BigInt(b + 1)) <= power3) ++b;
  while ((1n << BigInt(b)) > power3) --b;
  return b;
}

function transitionData(word) {
  let exponent = 0;
  let oldHeight = 0;
  let transitions = 0;
  let minimumHeight = 0;
  let maximumDecoder = 0;
  let decoder = null;
  for (let j = 0; j < word.length; ++j) {
    const a = word[j];
    exponent += a;
    const height = floorAlphaTimes(j + 1) - exponent;
    if (height !== oldHeight) ++transitions;
    minimumHeight = Math.min(minimumHeight, height);
    oldHeight = height;

    if (a === 2) decoder = 0;
    else if (a === 1 && decoder !== null) ++decoder;
    if (decoder !== null) maximumDecoder = Math.max(maximumDecoder, decoder);
  }
  return {
    exponent,
    height: oldHeight,
    transitions,
    minimumHeight,
    maximumDecoder,
  };
}

const code0 = [2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2];
const code1 = [2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 2];
const codes = [code0, code1];
const buffer = [1, 2, 1, 2, 1, 2];
const maximumOrder = 6;

for (const code of codes) {
  if (code.length !== 12 || totalExponent(code) !== 19)
    throw new Error("code length or exponent mismatch");
  if (code[0] !== 2 || code[code.length - 1] !== 2)
    throw new Error("code boundary reset failure");
  for (let j = 1; j < code.length; ++j) {
    if (code[j - 1] === 1 && code[j] === 1)
      throw new Error("adjacent exponent-one letters");
  }
}
if (!(3n ** 12n > 2n ** 19n))
  throw new Error("code surplus is not positive");

let prefix = buffer.slice();
let driver = [];
let previous = cylinder(prefix);
const stageRows = [];

for (let order = 1; order <= maximumOrder; ++order) {
  const debruijn = deBruijnBinary(order);
  if (factorCount(debruijn, order) !== (1 << order))
    throw new Error("de Bruijn factor failure");

  const common = encode(debruijn, codes);
  const candidate0 = prefix.concat(common, code0);
  const candidate1 = prefix.concat(common, code1);
  const cylinder0 = cylinder(candidate0);
  const cylinder1 = cylinder(candidate1);
  if (cylinder0.rho === cylinder1.rho)
    throw new Error("distinct equal-weight cylinders collided");

  let selectedBit;
  let selectedWord;
  let selectedCylinder;
  if (cylinder0.rho !== previous.rho) {
    selectedBit = 0;
    selectedWord = candidate0;
    selectedCylinder = cylinder0;
  } else {
    selectedBit = 1;
    selectedWord = candidate1;
    selectedCylinder = cylinder1;
  }

  const oldModulus = 1n << BigInt(previous.exponent + 1);
  if ((selectedCylinder.rho - previous.rho) % oldModulus !== 0n)
    throw new Error("cylinder compatibility failure");
  if (!(selectedCylinder.rho > previous.rho))
    throw new Error("representative did not increase");

  driver.push(...debruijn, selectedBit);
  prefix = selectedWord;
  previous = selectedCylinder;

  const data = transitionData(prefix);
  if (data.minimumHeight < 0)
    throw new Error("strict barrier failure");
  if (data.maximumDecoder > 1)
    throw new Error("decoder-depth failure");

  const encodedDriver = encode(driver, codes);
  if (factorCount(encodedDriver, 12 * order) < (1 << order))
    throw new Error("accelerated factor-complexity failure");
  const shortcut = shortcutWord(encodedDriver);
  if (factorCount(shortcut, 19 * order) < (1 << order))
    throw new Error("shortcut factor-complexity failure");

  stageRows.push({
    order,
    selectedBit,
    driverLength: driver.length,
    wordLength: prefix.length,
    exponent: data.exponent,
    height: data.height,
    transitions: data.transitions,
    rhoBits: selectedCylinder.rho.toString(2).length,
  });
}

for (const row of stageRows) {
  console.log(
    `order=${row.order} selected=${row.selectedBit} ` +
      `driver_length=${row.driverLength} word_length=${row.wordLength} ` +
      `exponent=${row.exponent} height=${row.height} ` +
      `transitions=${row.transitions} rho_bits=${row.rhoBits}`
  );
}
console.log("representatives_strictly_increase=true");
console.log("strict_barrier=true maximum_decoder_depth_after_first_reset=1");
console.log("accelerated_and_shortcut_debruijn_factors=true");
console.log("certificate_passed=true");
