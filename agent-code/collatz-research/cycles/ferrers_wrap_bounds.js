#!/usr/bin/env node
"use strict";

// Exact audit of the Ferrers-wrap size approach in P17.
// All decisions use BigInt arithmetic.  The output is evidence for the
// proved reductions recorded in cycle_exclusion.md, not an all-period
// cycle certificate.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function gcd(a, b) {
  if (a < 0n) a = -a;
  if (b < 0n) b = -b;
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

function ceilLog2Pow3(r) {
  const P = 3n ** BigInt(r);
  let M = 1n, A = 0;
  while (M < P) {
    M *= 2n;
    ++A;
  }
  return {A, M, P};
}

function affine(word) {
  let C = 0n, A = 0n;
  for (const a of word) {
    C = 3n * C + (1n << A);
    A += BigInt(a);
  }
  const P = 3n ** BigInt(word.length);
  const M = 1n << A;
  return {C, A, P, M, D: M - P};
}

function rotate(word, i) {
  const r = word.length;
  i = ((i % r) + r) % r;
  return word.slice(i).concat(word.slice(0, i));
}

function prefixExponents(word) {
  const out = [0n];
  let A = 0n;
  for (const a of word) {
    A += BigInt(a);
    out.push(A);
  }
  return out;
}

function isPrimitive(word) {
  const r = word.length;
  for (let d = 1; d * 2 <= r; ++d) {
    if (r % d !== 0) continue;
    let same = true;
    for (let i = d; i < r; ++i) {
      if (word[i] !== word[i % d]) {
        same = false;
        break;
      }
    }
    if (same) return false;
  }
  return true;
}

function isStrictRecord(word) {
  const r = word.length;
  const exponents = prefixExponents(word);
  const A = exponents[r];
  for (let i = 0; i < r; ++i) {
    if ((1n << (A - exponents[i])) <= 3n ** BigInt(r - i)) return false;
  }
  return true;
}

function isOneStrip(word) {
  const x = affine(word);
  const target = ceilLog2Pow3(word.length);
  return x.A === BigInt(target.A);
}

function ferrers(word, i) {
  assert(word[i] === 1, "Ferrers rotation must begin at a unit letter");
  const u = rotate(word, i);
  const v = rotate(word, i + 1);
  const E = prefixExponents(u);
  let sum = 0n, cellCount = 0, support = 0;
  for (let j = 1; j < word.length; ++j) {
    const height = u[j] - 1;
    if (height > 0) ++support;
    for (let h = 0; h < height; ++h) {
      sum += 3n ** BigInt(word.length - 1 - j) *
        (1n << (E[j] + BigInt(h)));
      ++cellCount;
    }
  }
  const Cu = affine(u).C;
  const Cv = affine(v).C;
  assert(sum === Cv - Cu, "Ferrers cell expansion");
  return {sum, cellCount, support, Cu, Cv};
}

function recordEnvelopePrefixes(r, A) {
  const out = new Array(r + 1);
  out[0] = 0n;
  out[1] = 1n;
  for (let j = 2; j < r; ++j) {
    const tail = ceilLog2Pow3(r - j).A;
    out[j] = BigInt(A - tail);
  }
  out[r] = BigInt(A);
  return out;
}

function wordFromPrefixes(E) {
  const out = [];
  for (let i = 0; i + 1 < E.length; ++i) {
    out.push(Number(E[i + 1] - E[i]));
  }
  return out;
}

function sharpBounds(r) {
  assert(r >= 3, "bounds require r>=3");
  const {A, M, P} = ceilLog2Pow3(r);
  const D = M - P, B = A - r;
  assert(B >= 2, "two-support bounds require at least two excess units");

  // The least possible carry with a_0=1 and at least two nonunit letters
  // is attained by (1^(r-2),2,B).
  const lowerWord = new Array(r - 2).fill(1).concat([2, B]);
  const Cmin2 = P - (1n << BigInt(r - 1));
  assert(affine(lowerWord).C === Cmin2, "sharp lower carry");

  // Across all unit rotations, the largest carry with two nonunit letters
  // is attained by (1,B,2,1^(r-3)).  This is a rotation of the strict-record
  // word (1^(r-2),B,2).
  const upperRotation = [1, B, 2].concat(new Array(r - 3).fill(1));
  const upperStrictWord = new Array(r - 2).fill(1).concat([B, 2]);
  const T = 4n * 3n ** BigInt(r - 2) - (1n << BigInt(r));
  const CmaxCyclic2 = 5n * 3n ** BigInt(r - 2) +
    (1n << BigInt(B)) * T -
    3n ** BigInt(r - 3) * (1n << BigInt(B + 1));
  assert(affine(upperRotation).C === CmaxCyclic2, "sharp cyclic upper carry");
  assert(isStrictRecord(lowerWord) && isStrictRecord(upperStrictWord),
    "sharp extremizers must be strict record");
  assert(isOneStrip(lowerWord) && isOneStrip(upperStrictWord),
    "sharp extremizers must be one strip");
  assert(rotate(upperStrictWord, r - 3).join(",") === upperRotation.join(","),
    "cyclic upper extremizer rotation");

  // At the distinguished strict-record rotation, A_j is bounded by the
  // reversed mechanical envelope.  Setting every bound to equality gives
  // the exact maximum compatible with a_0=1.
  const envelope = recordEnvelopePrefixes(r, A);
  const upperRecordWord = wordFromPrefixes(envelope);
  assert(upperRecordWord[0] === 1 && isStrictRecord(upperRecordWord),
    "record envelope word");
  assert(isPrimitive(lowerWord) && isPrimitive(upperStrictWord),
    `cyclic sharp extremizers must be primitive r=${r}`);
  let CmaxRecord = 0n;
  for (let j = 0; j < r; ++j) {
    CmaxRecord += 3n ** BigInt(r - 1 - j) * (1n << envelope[j]);
  }
  assert(affine(upperRecordWord).C === CmaxRecord, "sharp record upper carry");

  // If the mechanical maximizer is imprimitive, all its letters are 1 or 2:
  // only the exceptional first increment can be 3, and a power would repeat
  // it.  Its last two letters are always 2,2.  Replacing that final pair by
  // 1,3 lowers A_{r-1} by one, costs exactly M/8, and creates a unique 3.
  // The resulting strict-record word is therefore primitive.
  let CprimitiveWitness = CmaxRecord;
  let upperRecordPrimitiveWitness = upperRecordWord;
  let primitiveWitnessLoss = 0n;
  if (!isPrimitive(upperRecordWord)) {
    assert(upperRecordWord.every(a => a <= 2) &&
      upperRecordWord[r - 2] === 2 && upperRecordWord[r - 1] === 2,
      "imprimitive mechanical word alphabet");
    const primitiveEnvelope = envelope.slice();
    primitiveEnvelope[r - 1] -= 1n;
    upperRecordPrimitiveWitness = wordFromPrefixes(primitiveEnvelope);
    primitiveWitnessLoss = M / 8n;
    CprimitiveWitness = CmaxRecord - primitiveWitnessLoss;
    assert(upperRecordPrimitiveWitness.filter(a => a === 3).length === 1 &&
      isPrimitive(upperRecordPrimitiveWitness) &&
      isStrictRecord(upperRecordPrimitiveWitness), "primitive corrected witness");
    assert(affine(upperRecordPrimitiveWitness).C === CprimitiveWitness,
      "primitive witness carry correction");
  }

  const L2 = (D + Cmin2) / 2n;
  const Urecord = (D + CmaxRecord) / 2n;
  const UprimitiveWitness = (D + CprimitiveWitness) / 2n;
  const Ucyclic2 = (D + CmaxCyclic2) / 2n;
  assert(ferrers(lowerWord, 0).sum === L2, "lower Ferrers equality");
  assert(ferrers(upperRecordWord, 0).sum === Urecord,
    "record upper Ferrers equality");
  assert(ferrers(upperStrictWord, r - 3).sum === Ucyclic2,
    "cyclic upper Ferrers equality");

  return {
    r, A, B, M, P, D, Cmin2, CmaxRecord, CmaxCyclic2,
    CprimitiveWitness, primitiveWitnessLoss,
    L2, Urecord, UprimitiveWitness, Ucyclic2,
    lowerWord, upperRecordWord, upperRecordPrimitiveWitness, upperStrictWord,
  };
}

function auditWord(label, word, expectedQ = null) {
  const base = affine(word);
  assert(base.D > 0n, `${label}: positive determinant`);
  const g = gcd(base.D, base.C), q = base.D / g;
  if (expectedQ !== null) assert(q === expectedQ, `${label}: expected q`);
  const r = word.length;
  const E = prefixExponents(word);
  const support = word.filter(a => a > 1).length;
  const units = word.filter(a => a === 1).length;
  const oneStrip = isOneStrip(word);
  const strict = isStrictRecord(word);
  const primitive = isPrimitive(word);
  let minS = null, maxS = null, fullWraps = 0;

  const bound = oneStrip && r >= 3 ? sharpBounds(r) : null;
  for (let i = 1; i < r; ++i) {
    const Ci = affine(rotate(word, i)).C;
    assert((1n << E[i]) * Ci > 3n ** BigInt(i) * base.C,
      `${label}: strict forward lower bound at ${i}`);
    assert(3n ** BigInt(r - i) * Ci <
      (1n << (base.A - E[i])) * base.C,
      `${label}: strict suffix upper bound at ${i}`);
  }
  for (let i = 0; i < r; ++i) {
    if (word[i] !== 1) continue;
    const f = ferrers(word, i);
    assert(f.cellCount === Number(base.A) - r, `${label}: cell count`);
    assert(f.support === support, `${label}: support count`);
    assert(2n * f.sum === f.Cu + base.D, `${label}: rotation recurrence`);
    assert(gcd(f.sum, base.D) === g, `${label}: exact wrap gcd`);
    assert((f.sum % base.D === 0n) === (q === 1n),
      `${label}: full wrap iff q=1`);
    if (f.sum % base.D === 0n) ++fullWraps;

    if (support >= 2 && bound) {
      assert(bound.L2 <= f.sum && f.sum <= bound.Ucyclic2,
        `${label}: sharp universal two-support bounds`);
    }
    if (i === 0 && strict && word[0] === 1 && bound) {
      assert(f.sum <= bound.Urecord, `${label}: sharp record upper bound`);
      if (support >= 2) assert(bound.L2 <= f.sum,
        `${label}: sharp record lower bound`);
    }

    if (minS === null || f.sum < minS) minS = f.sum;
    if (maxS === null || f.sum > maxS) maxS = f.sum;
  }

  const guaranteed = 2 * r - Number(base.A);
  if (units > 0) assert(units >= guaranteed, `${label}: unit count`);
  if (q === 1n) assert(fullWraps === units, `${label}: correlated full wraps`);

  return {
    label, r, A: Number(base.A), D: base.D.toString(), C: base.C.toString(),
    g: g.toString(), q: q.toString(), strict, oneStrip, primitive,
    support, units, guaranteed, fullWraps,
    minS: minS === null ? null : minS.toString(),
    maxS: maxS === null ? null : maxS.toString(),
  };
}

// The exact partial sum used for the all-r width theorem is
// sum_{j=2}^{12} 2^j(2^floor(j log_2(3/2))-1)/3^(j+1).
function widthCertificate() {
  const denominator = 3n ** 13n;
  let numerator = 0n;
  const floors = [];
  for (let j = 2; j <= 12; ++j) {
    let c = 0;
    while ((1n << BigInt(j + c + 1)) <= 3n ** BigInt(j)) ++c;
    floors.push(c);
    numerator += (1n << BigInt(j)) * ((1n << BigInt(c)) - 1n) *
      3n ** BigInt(12 - j);
  }
  assert(numerator === 3644236n && denominator === 1594323n,
    "partial sum value");
  assert(numerator > 2n * denominator, "partial sum exceeds two");

  // The excess above 2P dominates the two-support correction 2^(r-1)
  // at r=13 and thereafter, since the two sides then grow by 3 and 2.
  const excessNumerator = numerator - 2n * denominator;
  assert(excessNumerator === 455590n, "partial-sum excess");
  assert(excessNumerator * 3n ** 13n > denominator * 2n ** 12n,
    "r=13 propagation base");
  const primitiveExcessNumerator = 4n * excessNumerator - denominator;
  const primitiveExcessDenominator = 4n * denominator;
  assert(primitiveExcessNumerator === 228037n &&
    primitiveExcessDenominator === 6377292n,
    "primitive witness excess fraction");
  assert(primitiveExcessNumerator * 3n ** 13n >
    primitiveExcessDenominator * 2n ** 12n,
    "primitive witness r=13 propagation base");

  const small = [];
  const expectedGaps = [66n,70n,378n,6102n,19778n,87670n,310290n,1278478n];
  for (let r = 5; r <= 12; ++r) {
    const b = sharpBounds(r);
    const gap2 = b.CmaxRecord - b.Cmin2 - 2n * b.D;
    assert(gap2 === expectedGaps[r - 5] && gap2 >= 0n,
      `small width certificate r=${r}`);
    const firstMultiple = ((b.L2 + b.D - 1n) / b.D) * b.D;
    assert(firstMultiple <= b.UprimitiveWitness,
      `small primitive witness bracket r=${r}`);
    small.push({
      r,
      twiceWidthMinus2D: gap2.toString(),
      lower: b.L2.toString(),
      primitiveWitnessUpper: b.UprimitiveWitness.toString(),
      bracketedMultiple: firstMultiple.toString(),
    });
  }

  // An independent finite regression of the symbolic conclusion.
  for (let r = 5; r <= 200; ++r) {
    const b = sharpBounds(r);
    assert(b.Urecord - b.L2 >= b.D, `record interval width r=${r}`);
    const firstMultiple = ((b.L2 + b.D - 1n) / b.D) * b.D;
    assert(firstMultiple <= b.Urecord, `record interval contains D multiple r=${r}`);
    assert(firstMultiple <= b.UprimitiveWitness,
      `primitive-witness interval contains D multiple r=${r}`);
  }
  return {
    floors,
    partialSum: `${numerator}/${denominator}`,
    primitiveExcess: `${primitiveExcessNumerator}/${primitiveExcessDenominator}`,
    small,
    verifiedThrough: 200,
  };
}

function enumerateSmall(maxR) {
  let words = 0, primitiveWords = 0, q1Hits = 0;
  const byR = [];
  for (let r = 3; r <= maxR; ++r) {
    const {A} = ceilLog2Pow3(r);
    let count = 0, primitive = 0, q1 = 0;
    const word = [1];
    function dfs(index, used) {
      if (index === r - 1) {
        const last = A - used;
        if (last < 1) return;
        word.push(last);
        if (isStrictRecord(word)) {
          ++count;
          const p = isPrimitive(word);
          if (p) ++primitive;
          const x = auditWord(`enum-r${r}`, word);
          if (x.q === "1") ++q1;
        }
        word.pop();
        return;
      }
      const lettersAfter = r - index - 1;
      const maxA = A - used - lettersAfter;
      for (let a = 1; a <= maxA; ++a) {
        const nextUsed = used + a;
        if ((1n << BigInt(A - nextUsed)) <= 3n ** BigInt(r - index - 1)) {
          continue;
        }
        word.push(a);
        dfs(index + 1, nextUsed);
        word.pop();
      }
    }
    dfs(1, 1);
    words += count;
    primitiveWords += primitive;
    q1Hits += q1;
    byR.push({r, count, primitive, q1});
  }
  return {maxR, words, primitiveWords, q1Hits, byR};
}

const q5Word = [1,1,1,1,1,2,1,1,2,1,2,3,2,1,1,1,5];
const regressions = [
  auditWord("q5", q5Word, 5n),
  auditWord("q13", [1,2,1,2,2], 13n),
  auditWord("single-support", [1,1,1,1,1,5], 59n),
];
assert(regressions[0].units === 11 && regressions[0].guaranteed === 7,
  "q5 unit regression");
assert(regressions[0].support === 6 && regressions[0].fullWraps === 0,
  "q5 support and full wraps");

for (let r = 1; r <= 20; ++r) {
  const word = new Array(r).fill(2);
  const x = affine(word);
  assert(x.C === x.D && x.D / gcd(x.D, x.C) === 1n,
    `trivial q=1 power r=${r}`);
  assert(word.filter(a => a === 1).length === 0 && 2 * r - Number(x.A) === 0,
    `trivial wrap count is vacuous r=${r}`);
}

const output = {
  provedIdentity:
    "at any unit index, one full-D Ferrers wrap iff q=1; all such wraps are correlated",
  sharpTwoSupportBounds:
    "(2^A-2^(r-1))/2 <= S_i <= (D+C_cyclic,max,2)/2",
  sharpRecordBounds:
    "(2^A-2^(r-1))/2 <= S_0 <= (D+C_record,max)/2",
  widthCertificate: widthCertificate(),
  regressions,
  trivialPowersThrough: 20,
  exhaustive: enumerateSmall(Number(process.argv[2] || 12)),
};

console.log(JSON.stringify(output, null, 2));
