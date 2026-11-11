"use strict";

// Exact-integer regression for the least-seed sibling obstruction.

function v2(n) {
  let a = 0;
  while ((n & 1n) === 0n) {
    n >>= 1n;
    a++;
  }
  return a;
}

function v3(n) {
  let b = 0;
  while (n % 3n === 0n) {
    n /= 3n;
    b++;
  }
  return b;
}

function step(x, q = 1n) {
  const a = v2(3n * x + q);
  return { a, next: (3n * x + q) >> BigInt(a) };
}

function lowerSiblings(x, a, q = 1n) {
  const ans = [];
  let y = x;
  for (let m = 1; 2 * m < a; m++) {
    if ((y - q) % 4n !== 0n) throw new Error("nonintegral sibling");
    y = (y - q) / 4n;
    const s = step(y, q);
    if (s.a !== a - 2 * m) throw new Error("wrong sibling valuation");
    ans.push({ m, exponent: s.a, seed: y, endpoint: s.next });
  }
  return ans;
}

function minimalPredecessor(x) {
  if (x % 3n === 0n) return null;
  const e = x % 3n === 2n ? 1 : 2;
  return ((1n << BigInt(e)) * x - 1n) / 3n;
}

function auditOrbit(seed, cap) {
  let x = BigInt(seed);
  const n = x;
  let A = 0;
  let pow3 = 1n;
  let firstDrop = null;
  let firstBarrierFailure = null;
  let firstSiblingBelow = null;
  let firstSiblingEqual = null;
  let maxDecoder = v3(x + 1n);
  const seen = new Map();
  let status = "cap";
  let steps = 0;

  for (let j = 0; j < cap; j++) {
    if (x === 1n) {
      status = "hit_1";
      steps = j;
      break;
    }
    const key = x.toString();
    if (seen.has(key)) {
      status = `repeat_from_${seen.get(key)}`;
      steps = j;
      break;
    }
    seen.set(key, j);
    const { a, next } = step(x);
    for (const s of lowerSiblings(x, a)) {
      if (s.endpoint !== next) throw new Error("sibling endpoint mismatch");
      if (s.seed < n && firstSiblingBelow === null) {
        firstSiblingBelow = { j, x, a, m: s.m, y: s.seed, endpoint: next };
      }
      if (s.seed === n && firstSiblingEqual === null) {
        firstSiblingEqual = { j, x, a, m: s.m, y: s.seed, endpoint: next };
      }
    }
    A += a;
    pow3 *= 3n;
    if (firstBarrierFailure === null && (1n << BigInt(A)) >= pow3) {
      firstBarrierFailure = j + 1;
    }
    x = next;
    maxDecoder = Math.max(maxDecoder, v3(x + 1n));
    if (x < n && firstDrop === null) firstDrop = { depth: j + 1, value: x };
    steps = j + 1;
  }
  return { seed: n, status, steps, firstDrop, firstBarrierFailure,
           firstSiblingBelow, firstSiblingEqual, maxDecoder };
}

function auditQ5() {
  const q = 5n;
  const cycle = [187n, 283n, 427n, 643n, 967n, 1453n, 1091n, 1639n,
                 2461n, 1847n, 2773n, 2081n, 781n, 587n, 883n, 1327n,
                 1993n];
  const word = [1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 2, 3, 2, 1, 1, 1, 5];
  for (let j = 0; j < cycle.length; j++) {
    const s = step(cycle[j], q);
    if (s.a !== word[j] || s.next !== cycle[(j + 1) % cycle.length]) {
      throw new Error("q=5 cycle regression failed");
    }
  }
  const last = lowerSiblings(1993n, 5, q);
  const twiceLowered = last.find(s => s.m === 2);
  if (twiceLowered.seed !== 123n || twiceLowered.endpoint !== 187n) {
    throw new Error("q=5 sibling regression failed");
  }
  const entry = step(123n, q);
  if (entry.a !== 1 || entry.next !== 187n) throw new Error("q=5 entry failed");
  for (let j = 0; j < cycle.length; j++) {
    for (const s of lowerSiblings(cycle[j], word[j], q)) {
      if (s.seed < 123n) throw new Error("q=5 basin leastness failed");
    }
  }
  return {
    cycleMinimum: 187n,
    violatingSibling: twiceLowered.seed,
    basinMinimum: 123n,
    equalityEndpoint: twiceLowered.endpoint,
    equalitySource: 1993n,
    equalityExponent: 5
  };
}

function auditCountermodel(K) {
  const n = (1n << BigInt(3 * K + 1)) - 5n;
  let x = n;
  let A = 0;
  let pow3 = 1n;
  let afterResetDecoderMax = 0;
  const path = [n];
  for (let t = 0; t < 2 * K; t++) {
    const expected = t % 2 === 0 ? 1 : 2;
    const s = step(x);
    if (s.a !== expected) throw new Error(`countermodel word failed at K=${K}, t=${t}`);
    if (lowerSiblings(x, s.a).length !== 0) throw new Error("unexpected sibling");
    A += s.a;
    pow3 *= 3n;
    if ((1n << BigInt(A)) >= pow3) throw new Error("barrier failed");
    x = s.next;
    path.push(x);
    if (x < n) throw new Error("prefix minimum failed");
    // h_t=x_t 2^{A_t}/3^t is strictly below n+5 throughout the block.
    if (x * (1n << BigInt(A)) >= (n + 5n) * pow3) {
      throw new Error("height envelope failed");
    }
    if (t + 1 >= 2) afterResetDecoderMax = Math.max(afterResetDecoderMax, v3(x + 1n));
  }
  if (afterResetDecoderMax > 1) throw new Error("decoder bound failed");
  let back = path[path.length - 1];
  for (let t = path.length - 2; t >= 0; t--) {
    back = minimalPredecessor(back);
    if (back !== path[t]) throw new Error("minimal inverse chain failed");
  }
  if (K % 2 === 0 && (n % 3n !== 0n || minimalPredecessor(n) !== null)) {
    throw new Error("minimal inverse chain did not stop at seed");
  }
  return {
    K,
    seed: n,
    length: 2 * K,
    word: "(1,2)^K",
    heightUpperBound: n + 5n,
    heightRatioUpper: `${n + 5n}/${n}`,
    reciprocalMassUpper: `${2 * K + 1}/${n}`,
    afterFirstResetDecoderMax: afterResetDecoderMax,
    minimalInverseChainStopsAtSeed: K % 2 === 0
  };
}

function stringify(value) {
  return JSON.stringify(value, (_, x) => typeof x === "bigint" ? x.toString() : x);
}

console.log("known_orbits");
for (const n of [27n, 1126015n, 150015n]) console.log(stringify(auditOrbit(n, 10000)));
console.log("q5_regression");
console.log(stringify(auditQ5()));
console.log("finite_countermodels");
for (const K of [2, 4, 8, 16, 32, 64]) console.log(stringify(auditCountermodel(K)));
console.log("certificate_passed=true");
