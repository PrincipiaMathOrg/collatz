'use strict';

function v2(n) {
  let a = 0;
  while ((n & 1n) === 0n) { n >>= 1n; a++; }
  return a;
}

function v3(n) {
  let a = 0;
  while (n % 3n === 0n) { n /= 3n; a++; }
  return a;
}

// Canonical least positive seed for an accelerated valuation word.
function rho(word) {
  let n = 1n, y = 1n, A = 0, pow3 = 1n;
  for (const a of word) {
    let found = false;
    const liftMod = 1n << BigInt(A + 1);
    for (let k = 0n; k < (1n << BigInt(a)); k++) {
      const yy = y + 2n * pow3 * k;
      const z = 3n * yy + 1n;
      if (v2(z) !== a) continue;
      n += liftMod * k;
      y = z >> BigInt(a);
      A += a;
      pow3 *= 3n;
      found = true;
      break;
    }
    if (!found) throw new Error('cylinder lift not found');
  }
  return {n, A};
}

function discreteLog3(target, modulus, order) {
  let p = 1n;
  for (let r = 0; r < order; r++) {
    if (p === target) return r;
    p = (3n * p) % modulus;
  }
  throw new Error('target is not a power of 3');
}

function verify(L) {
  const suffix = [2, ...Array(L).fill(1), 2];
  const cyl = rho(suffix);
  const B = cyl.A; // L+4
  const modulus = 1n << BigInt(B + 2);
  const target = (2n * cyl.n + 1n) % modulus;
  const order = 1 << B;
  const r0 = discreteLog3(target, modulus, order);
  let r = r0;
  if (r < 3) r += order;
  // Choose a solution large enough that the complete concatenation is a
  // strict barrier.  Adding the order preserves 3^r modulo 2^(B+2).
  while ((1n << BigInt(r + 1 + B)) >= 3n ** BigInt(r + suffix.length)) r += order;

  const seed = (1n << BigInt(r)) - 1n;
  const word = [...Array(r - 1).fill(1), 2, ...suffix];
  let x = seed, A = 0, pow3 = 1n;
  for (let t = 0; t < word.length; t++) {
    let z = 3n * x + 1n;
    const actual = v2(z);
    if (actual !== word[t]) throw new Error(`valuation mismatch L=${L} t=${t}`);
    z >>= BigInt(actual);
    x = z; A += actual; pow3 *= 3n;
    if (!((1n << BigInt(A)) < pow3)) throw new Error(`barrier failure L=${L} t=${t}`);
  }
  if (v3(x + 1n) !== 0) throw new Error(`terminal ternary hit L=${L}`);
  if (!(cyl.n % 4n === 1n && r % 2 === 1)) throw new Error('group class failure');
  return {
    L, suffix: suffix.join(','), B, rho: cyl.n.toString(), r0, r,
    wordLength: word.length, totalA: A,
    zeroInnovationBlocks: suffix.length + 1, zeroLiftBits: B + 2,
    seedBits: r, endpointDigits: x.toString().length, endpointV3: v3(x + 1n)
  };
}

const maxL = Number(process.argv[2] || 8);
for (let L = 1; L <= maxL; L++) console.log(JSON.stringify(verify(L)));
console.log('certificate_passed=true');
