"use strict";

// Exact arithmetic audit for
// cycle_one_drop_all_height_ordered_residue_no_go.md.

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function gcd(a, b) {
  let x = a < 0n ? -a : a;
  let y = b < 0n ? -b : b;
  while (y !== 0n) {
    const remainder = x % y;
    x = y;
    y = remainder;
  }
  return x;
}

function extendedGcd(a, b) {
  if (b === 0n) {
    return { gcd: a, x: 1n, y: 0n };
  }
  const next = extendedGcd(b, a % b);
  return {
    gcd: next.gcd,
    x: next.y,
    y: next.x - (a / b) * next.y,
  };
}

function inverseMod(value, modulus) {
  const result = extendedGcd(value, modulus);
  assert(result.gcd === 1n, "modular inverse does not exist");
  return ((result.x % modulus) + modulus) % modulus;
}

function powMod(base, exponent, modulus) {
  let answer = 1n;
  let b = base % modulus;
  let e = exponent;
  while (e > 0n) {
    if ((e & 1n) === 1n) {
      answer = (answer * b) % modulus;
    }
    b = (b * b) % modulus;
    e >>= 1n;
  }
  return answer;
}

// In half-state coordinates, false is O and true is S.
function halfStatePrefixes(word) {
  const rows = [{ length: 0, exponent: 0, carry: 0n, residue: 0n }];
  let exponent = 0;
  let carry = 0n;
  for (let index = 0; index < word.length; index += 1) {
    if (word[index]) {
      carry = 3n * carry + (2n ** BigInt(exponent));
      exponent += 2;
    } else {
      carry = 3n * carry;
      exponent += 1;
    }
    const modulus = 2n ** BigInt(exponent);
    const inverse = inverseMod(
      powMod(3n, BigInt(index + 1), modulus),
      modulus,
    );
    const residue = (((-carry * inverse) % modulus) + modulus) % modulus;
    rows.push({
      length: index + 1,
      exponent,
      carry,
      residue,
    });
  }
  return rows;
}

function decodeBinaryWord(code, length) {
  const word = [];
  for (let index = 0; index < length; index += 1) {
    word.push(((code >> index) & 1) === 1);
  }
  return word;
}

function oddCarry(exponents) {
  let exponent = 0;
  let carry = 0n;
  for (const value of exponents) {
    carry = 3n * carry + (2n ** BigInt(exponent));
    exponent += value;
  }
  return { exponent, carry };
}

function oddCylinderRepresentative(exponents) {
  const data = oddCarry(exponents);
  const modulus = 2n ** BigInt(data.exponent + 1);
  const inverse = inverseMod(
    powMod(3n, BigInt(exponents.length), modulus),
    modulus,
  );
  const residue =
    (((2n ** BigInt(data.exponent) - data.carry) * inverse) % modulus +
      modulus) %
    modulus;
  return { ...data, modulus, residue };
}

let halfStateWords = 0;
let nestingChecks = 0;
let digitChecks = 0;
let stabilizationChecks = 0;

for (let length = 1; length <= 12; length += 1) {
  for (let code = 0; code < 2 ** length; code += 1) {
    const rows = halfStatePrefixes(decodeBinaryWord(code, length));
    const final = rows[rows.length - 1];
    for (let index = 0; index + 1 < rows.length; index += 1) {
      const current = rows[index];
      const next = rows[index + 1];
      const modulus = 2n ** BigInt(current.exponent);
      const nextModulus = 2n ** BigInt(next.exponent);
      assert(
        next.residue % modulus === current.residue,
        "nested half-state residue failed",
      );
      const digit =
        (next.residue - current.residue) / modulus;
      assert(digit >= 0n, "ordered residue decreased");
      assert(
        digit < nextModulus / modulus,
        "ordered residue digit is outside its range",
      );
      nestingChecks += 1;
      digitChecks += 1;
    }
    if (final.residue > 0n) {
      for (const row of rows) {
        const modulus = 2n ** BigInt(row.exponent);
        if (modulus > final.residue) {
          assert(
            row.residue === final.residue,
            "least representative did not stabilize",
          );
          stabilizationChecks += 1;
        }
      }
    }
    halfStateWords += 1;
  }
}

let oddWordChecks = 0;
for (let length = 1; length <= 6; length += 1) {
  const wordCount = 3 ** length;
  for (let code = 0; code < wordCount; code += 1) {
    let value = code;
    const exponents = [];
    for (let index = 0; index < length; index += 1) {
      exponents.push(1 + (value % 3));
      value = Math.floor(value / 3);
    }
    const full = oddCylinderRepresentative(exponents);
    const D =
      2n ** BigInt(full.exponent) - 3n ** BigInt(exponents.length);
    if (D <= 0n) {
      continue;
    }
    const common = gcd(D, full.carry);
    const numerator = full.carry / common;
    const denominator = D / common;
    assert(
      (denominator * full.residue - numerator) % full.modulus === 0n,
      "denominator multiplier identity failed",
    );

    for (let prefixLength = 0; prefixLength <= length; prefixLength += 1) {
      const prefix = oddCylinderRepresentative(
        exponents.slice(0, prefixLength),
      );
      assert(
        full.residue % prefix.modulus === prefix.residue,
        "odd-cylinder truncation failed",
      );
    }
    oddWordChecks += 1;
  }
}

const shadow = oddCylinderRepresentative([1, 3]);
assert(shadow.exponent === 4, "(1,3) exponent failed");
assert(shadow.carry === 5n, "(1,3) carry failed");
assert(shadow.modulus === 32n, "(1,3) modulus failed");
assert(shadow.residue === 19n, "(1,3) representative failed");
assert(7n * shadow.residue % 32n === 5n, "(1,3) multiplier failed");

console.log("halfStateWords=" + halfStateWords);
console.log("nestingChecks=" + nestingChecks);
console.log("digitChecks=" + digitChecks);
console.log("stabilizationChecks=" + stabilizationChecks);
console.log("oddWordChecks=" + oddWordChecks);
console.log("rationalShadow=5/7->11/7,canonicalRepresentative=19");
console.log("status=PASS");
