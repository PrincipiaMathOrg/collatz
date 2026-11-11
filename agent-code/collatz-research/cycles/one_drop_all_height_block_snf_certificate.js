"use strict";

// Exact audit of the arbitrary-block formulas in
// cycle_one_drop_all_height_block_snf_no_go.md. The proof in the report is
// all-depth; this checker tests the identities on every partition of every
// exponent word in the stated finite audit range.

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function abs(value) {
  return value < 0n ? -value : value;
}

function gcd(a, b) {
  let x = abs(a);
  let y = abs(b);
  while (y !== 0n) {
    const remainder = x % y;
    x = y;
    y = remainder;
  }
  return x;
}

function determinant(matrix) {
  const n = matrix.length;
  if (n === 0) {
    return 1n;
  }
  const a = matrix.map((row) => row.slice());
  let sign = 1n;
  let previousPivot = 1n;
  for (let column = 0; column < n - 1; column += 1) {
    let pivotRow = column;
    while (pivotRow < n && a[pivotRow][column] === 0n) {
      pivotRow += 1;
    }
    if (pivotRow === n) {
      return 0n;
    }
    if (pivotRow !== column) {
      const temporary = a[pivotRow];
      a[pivotRow] = a[column];
      a[column] = temporary;
      sign = -sign;
    }
    const pivot = a[column][column];
    for (let row = column + 1; row < n; row += 1) {
      for (let col = column + 1; col < n; col += 1) {
        a[row][col] =
          (a[row][col] * pivot - a[row][column] * a[column][col]) /
          previousPivot;
      }
    }
    previousPivot = pivot;
  }
  return sign * a[n - 1][n - 1];
}

function removeRowAndColumn(matrix, removedRow, removedColumn) {
  return matrix
    .filter((_, row) => row !== removedRow)
    .map((values) => values.filter((_, col) => col !== removedColumn));
}

function fraction(numerator, denominator) {
  assert(denominator !== 0n, "zero denominator");
  let n = numerator;
  let d = denominator;
  if (d < 0n) {
    n = -n;
    d = -d;
  }
  const common = gcd(n, d);
  return { n: n / common, d: d / common };
}

function add(left, right) {
  return fraction(
    left.n * right.d + right.n * left.d,
    left.d * right.d,
  );
}

function multiply(left, right) {
  return fraction(left.n * right.n, left.d * right.d);
}

function divide(left, right) {
  return fraction(left.n * right.d, left.d * right.n);
}

function blockData(exponents, start, end) {
  let exponentSum = 0;
  let carry = 0n;
  for (let index = start; index < end; index += 1) {
    carry = 3n * carry + (2n ** BigInt(exponentSum));
    exponentSum += exponents[index];
  }
  return {
    length: end - start,
    exponentSum,
    p: 3n ** BigInt(end - start),
    q: 2n ** BigInt(exponentSum),
    carry,
  };
}

function wordData(exponents) {
  return blockData(exponents, 0, exponents.length);
}

function blockMatrix(blocks) {
  const k = blocks.length;
  if (k === 1) {
    return [[blocks[0].q - blocks[0].p]];
  }
  const matrix = Array.from({ length: k }, () =>
    Array.from({ length: k }, () => 0n),
  );
  for (let index = 0; index < k; index += 1) {
    matrix[index][index] = -blocks[index].p;
    matrix[index][(index + 1) % k] = blocks[index].q;
  }
  return matrix;
}

function composedCarry(blocks) {
  let carry = 0n;
  let earlierQ = 1n;
  for (let index = 0; index < blocks.length; index += 1) {
    let laterP = 1n;
    for (let later = index + 1; later < blocks.length; later += 1) {
      laterP *= blocks[later].p;
    }
    carry += laterP * earlierQ * blocks[index].carry;
    earlierQ *= blocks[index].q;
  }
  return carry;
}

function decodeWord(code, length) {
  const exponents = [];
  let value = code;
  for (let index = 0; index < length; index += 1) {
    exponents.push(1 + (value % 3));
    value = Math.floor(value / 3);
  }
  return exponents;
}

let words = 0;
let partitions = 0;
let determinantChecks = 0;
let smithMinorChecks = 0;
let carryChecks = 0;
let denominatorChecks = 0;

for (let length = 2; length <= 6; length += 1) {
  const wordCount = 3 ** length;
  for (let code = 0; code < wordCount; code += 1) {
    const exponents = decodeWord(code, length);
    const full = wordData(exponents);
    const D = full.q - full.p;
    if (D <= 0n) {
      continue;
    }
    words += 1;

    const initial = fraction(full.carry, D);
    let state = initial;
    const denominatorGcd = gcd(D, full.carry);
    for (const exponent of exponents) {
      const next = divide(
        add(multiply(fraction(3n, 1n), state), fraction(1n, 1n)),
        fraction(2n ** BigInt(exponent), 1n),
      );
      const cleared = fraction(next.n * D, next.d);
      assert(cleared.d === 1n, "rotated carry is not integral");
      assert(
        gcd(D, cleared.n) === denominatorGcd,
        "reduced denominator changed under rotation",
      );
      state = next;
      denominatorChecks += 1;
    }
    assert(
      state.n === initial.n && state.d === initial.d,
      "rational word did not close",
    );

    const partitionCount = 2 ** (length - 1);
    for (let mask = 0; mask < partitionCount; mask += 1) {
      const boundaries = [0];
      for (let position = 1; position < length; position += 1) {
        if ((mask & (1 << (position - 1))) !== 0) {
          boundaries.push(position);
        }
      }
      boundaries.push(length);
      const blocks = [];
      for (let index = 0; index + 1 < boundaries.length; index += 1) {
        blocks.push(
          blockData(exponents, boundaries[index], boundaries[index + 1]),
        );
      }
      const matrix = blockMatrix(blocks);
      const expectedDeterminant =
        (blocks.length % 2 === 0 ? -1n : 1n) * D;
      assert(
        determinant(matrix) === expectedDeterminant,
        "cyclic determinant identity failed",
      );
      determinantChecks += 1;

      if (blocks.length >= 2) {
        const twoMinor = abs(
          determinant(
            removeRowAndColumn(matrix, blocks.length - 1, 0),
          ),
        );
        const threeMinor = abs(
          determinant(
            removeRowAndColumn(
              matrix,
              blocks.length - 1,
              blocks.length - 1,
            ),
          ),
        );
        let expectedTwo = 1n;
        let expectedThree = 1n;
        for (let index = 0; index < blocks.length - 1; index += 1) {
          expectedTwo *= blocks[index].q;
          expectedThree *= blocks[index].p;
        }
        assert(twoMinor === expectedTwo, "pure dyadic minor failed");
        assert(threeMinor === expectedThree, "pure ternary minor failed");
        assert(gcd(twoMinor, threeMinor) === 1n, "Smith gcd failed");
        smithMinorChecks += 1;
      }

      assert(
        composedCarry(blocks) === full.carry,
        "block carry composition failed",
      );
      carryChecks += 1;
      partitions += 1;
    }
  }
}

// The strict-least rational shadow (1,3).
const shadowExponents = [1, 3];
const shadow = wordData(shadowExponents);
assert(shadow.q - shadow.p === 7n, "shadow D failed");
assert(shadow.carry === 5n, "shadow carry failed");
const shadowFirst = fraction(5n, 7n);
const shadowSecond = divide(
  add(multiply(fraction(3n, 1n), shadowFirst), fraction(1n, 1n)),
  fraction(2n, 1n),
);
assert(
  shadowSecond.n === 11n && shadowSecond.d === 7n,
  "shadow intermediate state failed",
);
assert(
  shadowSecond.n * shadowFirst.d > shadowFirst.n * shadowSecond.d,
  "shadow is not strict least",
);

console.log("words=" + words);
console.log("partitions=" + partitions);
console.log("determinantChecks=" + determinantChecks);
console.log("smithMinorChecks=" + smithMinorChecks);
console.log("carryChecks=" + carryChecks);
console.log("denominatorChecks=" + denominatorChecks);
console.log("strictLeastShadow=5/7->11/7->5/7");
console.log("status=PASS");
