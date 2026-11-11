'use strict';

function v2(n) {
  let a = 0;
  while ((n & 1n) === 0n) { n >>= 1n; a++; }
  return a;
}

function wordData(word) {
  let C = 0n, A = 0;
  for (const a of word) {
    C = 3n * C + (1n << BigInt(A));
    A += a;
  }
  return {s: word.length, A, C, P: 3n ** BigInt(word.length), Q: 1n << BigInt(A)};
}

function equalBlocks(a, start, s, K) {
  for (let k = 1; k < K; k++) {
    for (let i = 0; i < s; i++) {
      if (a[start + i] !== a[start + k * s + i]) return false;
    }
  }
  return true;
}

function strictBarrier(word) {
  let A = 0, P = 1n;
  for (const a of word) {
    A += a; P *= 3n;
    if ((1n << BigInt(A)) >= P) return false;
  }
  return true;
}

const oddSeeds = Number(process.argv[2] || 200000);
const steps = Number(process.argv[3] || 96);
let checkedPowers = 0, checkedStrict = 0, cycles = 0;
let maxOriginSquare = null, closest = null;

for (let ii = 0; ii < oddSeeds; ii++) {
  const seed = BigInt(2 * ii + 1);
  const states = [seed], exps = [];
  let x = seed;
  for (let t = 0; t < steps; t++) {
    let z = 3n * x + 1n;
    const a = v2(z);
    x = z >> BigInt(a);
    exps.push(a); states.push(x);
  }

  for (let j = 0; j <= 24; j++) {
    for (let s = 1; s <= 18 && j + 2 * s <= steps; s++) {
      if (!equalBlocks(exps, j, s, 2)) continue;
      let K = 2;
      while (j + (K + 1) * s <= steps && equalBlocks(exps, j, s, K + 1)) K++;
      const wd = wordData(exps.slice(j, j + s));
      const y = states[j];
      const lambda = (wd.Q - wd.P) * y - wd.C;
      const qPow = wd.Q ** BigInt(K);
      if (lambda === 0n) {
        cycles++;
        if (states[j + s] !== y) throw new Error('zero affine form without return');
        continue;
      }
      if (lambda % qPow !== 0n) throw new Error('block-power divisibility failure');
      const lhs = 2n ** BigInt(K * s);
      const rhs = (2n * y + 1n) * (3n ** BigInt(s));
      if (lhs > rhs) throw new Error('universal power bound failure');
      checkedPowers++;

      const isStrict = strictBarrier(exps.slice(j, j + s));
      if (isStrict) {
        const strictRhs = (3n ** BigInt(s)) * (3n * y + BigInt(s));
        if (3n * lhs > strictRhs) throw new Error('strict power bound failure');
        checkedStrict++;
      }
      const logSlack = Math.log2(Number(2n * y + 1n)) + s * Math.log2(3) - K * s;
      if (!closest || logSlack < closest.logSlack) {
        closest = {seed:seed.toString(), j, s, K, y:y.toString(),
                   word:exps.slice(j,j+s).join(','), logSlack, isStrict};
      }
      if (j === 0 && (!maxOriginSquare || s > maxOriginSquare.s)) {
        maxOriginSquare = {seed:seed.toString(), s, K,
                           word:exps.slice(0,s).join(',')};
      }
    }
  }
}

console.log(`odd_seeds=${oddSeeds} steps=${steps}`);
console.log(`checked_noncycle_powers=${checkedPowers} checked_strict=${checkedStrict} cycle_cases=${cycles}`);
console.log(`max_origin_square=${JSON.stringify(maxOriginSquare)}`);
console.log(`closest_universal_bound=${JSON.stringify(closest)}`);
console.log('certificate_passed=true');
