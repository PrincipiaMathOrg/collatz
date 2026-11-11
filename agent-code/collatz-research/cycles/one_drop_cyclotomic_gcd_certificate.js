#!/usr/bin/env node
"use strict";

const assert = require("node:assert/strict");

function gcd(a, b) {
  while (b !== 0n) [a, b] = [b, a % b];
  return a < 0n ? -a : a;
}

function isPrime(n) {
  if (n < 2n) return false;
  if (n % 2n === 0n) return n === 2n;
  for (let p = 3n; p * p <= n; p += 2n) {
    if (n % p === 0n) return false;
  }
  return true;
}

function bitLength(n) {
  assert(n > 0n);
  return n.toString(2).length;
}

function mod(a, m) {
  const r = a % m;
  return r < 0n ? r + m : r;
}

function extendedGcd(a, b) {
  let oldR = a;
  let r = b;
  let oldS = 1n;
  let s = 0n;
  while (r !== 0n) {
    const q = oldR / r;
    [oldR, r] = [r, oldR - q * r];
    [oldS, s] = [s, oldS - q * s];
  }
  return {g: oldR, x: oldS};
}

function inverseMod(a, m) {
  const {g, x} = extendedGcd(mod(a, m), m);
  assert.equal(g, 1n);
  return mod(x, m);
}

function powMod(a, n, m) {
  let x = mod(a, m);
  let y = 1n;
  let e = BigInt(n);
  while (e > 0n) {
    if (e & 1n) y = y * x % m;
    x = x * x % m;
    e >>= 1n;
  }
  return y;
}

function carry(word) {
  let C = 0n;
  let A = 0;
  for (const a of word) {
    C = 3n * C + (1n << BigInt(A));
    A += a;
  }
  return {C, A};
}

function rotationCarries(word) {
  const out = [];
  for (let i = 0; i < word.length; ++i) {
    const rotated = word.slice(i).concat(word.slice(0, i));
    out.push(carry(rotated).C);
  }
  return out;
}

function clockData(r) {
  const P = 3n ** BigInt(r);
  const N = bitLength(P - 1n);
  const D = (1n << BigInt(N)) - P;
  const B = Array.from({length: r + 1}, (_, i) =>
    Math.floor(i * N / r));
  const base = Array.from({length: r}, (_, i) => B[i + 1] - B[i]);
  const eligible = [];
  for (let i = 0; i < r - 1; ++i) {
    if (base[i] === 2) eligible.push(i);
  }
  return {r, P, N, D, B, base, eligible};
}

function profile(clock, selected) {
  const selectedSet = new Set(selected);
  assert.equal(selectedSet.size, selected.length);
  for (const i of selected) assert(clock.eligible.includes(i));

  const word = clock.base.slice();
  for (const i of selected) --word[i];
  word[clock.r - 1] += selected.length;

  const {C, A} = carry(word);
  assert.equal(A, clock.N);
  const K = (C + clock.D) / 2n;
  assert.equal(2n * K, C + clock.D);

  // Audit the bottom-normalized formula independently.  The unselected
  // mechanical two-sites are the spike sites, with t_k = j_k + 1.
  const spikes = clock.eligible.filter(i => !selectedSet.has(i));
  const V = spikes.length;
  const M = 1n << BigInt(clock.r - 1 + V);
  let J = 0n;
  for (let index = 0; index < spikes.length; ++index) {
    const j = spikes[index];
    J += (3n ** BigInt(clock.r - 2 - j)) << BigInt(j + index);
  }
  const bottomK = (1n << BigInt(clock.N - 1)) - M + 3n * J;
  assert.equal(K, bottomK);

  const rotations = rotationCarries(word);
  assert.equal(rotations[0], C);
  for (let i = 0; i < rotations.length; ++i) {
    const next = rotations[(i + 1) % rotations.length];
    assert.equal((1n << BigInt(word[i])) * next,
        3n * rotations[i] + clock.D);
  }
  const strictLeast = rotations.slice(1).every(x => x > C);
  const minGap = rotations.slice(1)
      .map(x => x - C)
      .reduce((a, b) => a < b ? a : b);

  const G = gcd(C, clock.D);
  assert.equal(G, gcd(K, clock.D));
  for (const rotation of rotations) {
    assert.equal(gcd(rotation, clock.D), G);
    assert.equal((rotation + clock.D) % 2n, 0n);
    const rotationK = (rotation + clock.D) / 2n;
    assert.equal(gcd(rotationK, clock.D), G);
  }
  assert.equal(rotations.reduce((a, b) => gcd(a, b)), G);

  return {
    selected, word, C, K, G, denominator: clock.D / G,
    strictLeast, minGap, spikes, J, M
  };
}

function auditBlockProjection(clock, p, factors) {
  const d = 6;
  const r0 = 5;
  const N0 = 8;
  const alpha = 1n << BigInt(N0);
  const beta = 3n ** BigInt(r0);
  const blockRows = [];
  let reconstructed = 0n;

  for (let j = 0; j < d; ++j) {
    let H = 0;
    for (const i of p.selected) if (i < j * r0) ++H;
    assert(j * N0 >= H);
    let R = 0n;
    for (let s = 0; s < r0; ++s) {
      let h = 0;
      for (const i of p.selected) {
        if (j * r0 <= i && i < j * r0 + s) ++h;
      }
      const mechanical = Math.floor(s * N0 / r0);
      assert(mechanical >= h);
      R += (3n ** BigInt(r0 - 1 - s)) << BigInt(mechanical - h);
    }
    const dyadic = 1n << BigInt(j * N0 - H);
    reconstructed += (beta ** BigInt(d - 1 - j)) * dyadic * R;
    blockRows.push({H, R});
  }
  assert.equal(reconstructed, p.C);

  for (const [m, Delta] of factors) {
    const zeta = alpha * inverseMod(beta, Delta) % Delta;
    assert.equal(powMod(zeta, m, Delta), 1n);
    const inverseTwo = inverseMod(2n, Delta);
    let projected = 0n;
    for (let j = 0; j < d; ++j) {
      const {H, R} = blockRows[j];
      projected += powMod(zeta, j, Delta) *
          powMod(inverseTwo, H, Delta) * (R % Delta);
      projected %= Delta;
    }
    let grouped = 0n;
    for (let c = 0; c < m; ++c) {
      let coefficient = 0n;
      for (let j = c; j < d; j += m) {
        const {H, R} = blockRows[j];
        coefficient += powMod(inverseTwo, H, Delta) * (R % Delta);
        coefficient %= Delta;
      }
      grouped += powMod(zeta, c, Delta) * coefficient;
      grouped %= Delta;
    }
    assert.equal(grouped, projected);
    const normalizedCarry = p.C % Delta *
        powMod(inverseMod(beta, Delta), d - 1, Delta) % Delta;
    assert.equal(projected, normalizedCarry);
    assert.equal(projected === 0n, p.C % Delta === 0n);
  }
}

const clock = clockData(30);
assert.equal(clock.N, 48);
assert.equal(clock.eligible.length, 17);

const a = 1n << 8n;
const b = 3n ** 5n;
assert.equal(a, 256n);
assert.equal(b, 243n);
const cyclotomic = {
  phi1: a - b,
  phi2: a + b,
  phi3: a * a + a * b + b * b,
  phi6: a * a - a * b + b * b
};
assert.deepEqual(cyclotomic, {
  phi1: 13n,
  phi2: 499n,
  phi3: 186793n,
  phi6: 62377n
});
const cyclotomicOrders = [
  [1, cyclotomic.phi1],
  [2, cyclotomic.phi2],
  [3, cyclotomic.phi3],
  [6, cyclotomic.phi6]
];
assert.equal(clock.D,
    cyclotomic.phi1 * cyclotomic.phi2 *
    cyclotomic.phi3 * cyclotomic.phi6);
assert.equal(cyclotomic.phi6, 7n ** 2n * 19n * 67n);
assert([7n, 13n, 19n, 67n, 499n, 186793n].every(isPrime));

const witnesses = [
  {
    name: "phi1",
    selected: [3, 4],
    divisor: cyclotomic.phi1,
    expectedGcd: 13n,
    expectedC: 639278380316797n,
    expectedMinGap: 127149700424604n
  },
  {
    name: "phi2",
    selected: [9],
    divisor: cyclotomic.phi2,
    expectedGcd: 499n,
    expectedC: 1204870545887261n,
    expectedMinGap: 32999723968640n
  },
  {
    name: "phi3",
    selected: [14],
    divisor: cyclotomic.phi3,
    expectedGcd: 186793n,
    expectedC: 1354859555967005n,
    expectedMinGap: 25383094550528n
  },
  {
    name: "phi6",
    selected: [9, 11, 16, 18, 19, 24],
    divisor: cyclotomic.phi6,
    expectedGcd: 810901n,
    expectedC: 729904608530461n,
    expectedMinGap: 57119087975040n
  }
].map(row => {
  const p = profile(clock, row.selected);
  assert.equal(p.C, row.expectedC);
  assert.equal(p.G, row.expectedGcd);
  assert.equal(p.minGap, row.expectedMinGap);
  assert.equal(p.C % row.divisor, 0n);
  assert.equal(p.K % row.divisor, 0n);
  assert(p.strictLeast);
  return {...row, ...p};
});

for (const p of witnesses) {
  auditBlockProjection(clock, p, cyclotomicOrders);
}

// Exhaust every nonempty anchored one-drop profile at this clock.
const primePowers = [49n, 13n, 19n, 67n, 499n, 186793n];
assert.equal(primePowers.reduce((a, b) => a * b), clock.D);
const cyclotomicFactors = cyclotomicOrders.map(([, factor]) => factor);
const primePowerHit = new Map(primePowers.map(p => [p, false]));
const cyclotomicHit = new Map(cyclotomicFactors.map(p => [p, false]));
let profiles = 0;
let denominatorOne = 0;
let maxGcd = 0n;
let maxGcdCount = 0;
let maxCyclotomicFactors = 0;

for (let mask = 1; mask < 2 ** clock.eligible.length; ++mask) {
  const word = clock.base.slice();
  let U = 0;
  for (let bit = 0; bit < clock.eligible.length; ++bit) {
    if ((mask & 2 ** bit) !== 0) {
      --word[clock.eligible[bit]];
      ++U;
    }
  }
  word[clock.r - 1] += U;
  const C = carry(word).C;
  const G = gcd(C, clock.D);
  ++profiles;
  if (G === clock.D) ++denominatorOne;
  if (G > maxGcd) {
    maxGcd = G;
    maxGcdCount = 1;
  } else if (G === maxGcd) {
    ++maxGcdCount;
  }
  for (const factor of primePowers) {
    if (C % factor === 0n) primePowerHit.set(factor, true);
  }
  let cyclotomicCount = 0;
  for (const factor of cyclotomicFactors) {
    if (C % factor === 0n) {
      cyclotomicHit.set(factor, true);
      ++cyclotomicCount;
    }
  }
  if (cyclotomicCount > maxCyclotomicFactors) {
    maxCyclotomicFactors = cyclotomicCount;
  }
}

assert.equal(profiles, 131071);
assert.equal(denominatorOne, 0);
assert.equal(maxGcd, 810901n);
assert.equal(clock.D / maxGcd, 93209707n);
assert.equal(maxGcdCount, 1);
assert([...primePowerHit.values()].every(Boolean));
assert([...cyclotomicHit.values()].every(Boolean));
assert.equal(maxCyclotomicFactors, 2);

const output = {
  theorem: "exact cyclotomic and gcd audit",
  r: clock.r,
  N: clock.N,
  D: clock.D,
  factorization: {
    cyclotomic,
    primePowers
  },
  witnesses: witnesses.map(p => ({
    name: p.name,
    selected: p.selected,
    word: p.word.join(","),
    C: p.C,
    K: p.K,
    gcd: p.G,
    denominator: p.denominator,
    minRotationGap: p.minGap
  })),
  exhaustive: {
    profiles,
    denominatorOne,
    maxGcd,
    minReducedDenominator: clock.D / maxGcd,
    maxGcdCount,
    maxCyclotomicFactors,
    everyPrimePowerHit: [...primePowerHit.values()].every(Boolean),
    everyCyclotomicFactorHit: [...cyclotomicHit.values()].every(Boolean)
  }
};

console.log(JSON.stringify(output,
    (_, value) => typeof value === "bigint" ? value.toString() : value,
    2));
