#!/usr/bin/env node
"use strict";

// Exact compressed search for the dual ternary residue attached to every
// possible stabilized suffix.  Prefix branch placements are compressed to
// their spike count; this is sufficient to decide whether tau can be the
// first prefix exponent reaching U.  The search tests the necessary low
// return conditions R < 2^U and R == 3 (mod 4).  Passing a finite range is
// evidence only.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function bitLength(n) {
  return n.toString(2).length;
}

function mod(a, m) {
  const z = a % m;
  return z < 0n ? z + m : z;
}

function egcd(a, b) {
  if (b === 0n) return [a, 1n, 0n];
  const [g, x, y] = egcd(b, a % b);
  return [g, y, x - (a / b) * y];
}

function inverse(a, m) {
  const [g, x] = egcd(a, m);
  assert(g === 1n, "inverse does not exist");
  return mod(x, m);
}

const maxR = Number(process.argv[2] || 50);
let suffixes = 0;
let lowResidues = 0;
let requiredClassResidues = 0;
let firstLow = null;
let firstRequiredClass = null;
const lowRows = [];
let maxLowVpre = null;

for (let r = 3; r <= maxR; ++r) {
  const N = bitLength(3n ** BigInt(r) - 1n);
  const e = N - r;
  const n = r - 1;
  const b = [0];
  const prefixEligible = [0];
  for (let t = 1; t <= n; ++t) {
    b.push(Math.floor(e * t / r) - Math.floor(e * (t - 1) / r));
    prefixEligible.push(prefixEligible[t - 1] + b[t]);
  }
  const pow3 = [1n];
  for (let k = 1; k <= r; ++k) pow3.push(3n * pow3[k - 1]);
  const inverseCache = new Map();

  for (let tau = 1; tau <= n; ++tau) {
    const m = n - tau;
    const Epre = prefixEligible[tau];
    const Esuf = prefixEligible[n] - Epre;
    const targets = new Set();

    // d=0: L_tau=U.  Then 2 V_pre=e-1-tau-V_suf.
    for (let Vpre = 0; Vpre <= Epre; ++Vpre) {
      const Vsuf = e - 1 - tau - 2 * Vpre;
      if (0 <= Vsuf && Vsuf <= Esuf) targets.add(Vsuf);
    }
    // d=1: L_tau=U+1, which requires a spike at time tau.
    if (b[tau] === 1) {
      for (let Vpre = 1; Vpre <= Epre; ++Vpre) {
        if (Vpre - 1 > Epre - 1) continue;
        const Vsuf = e - tau - 2 * Vpre;
        if (0 <= Vsuf && Vsuf <= Esuf) targets.add(Vsuf);
      }
    }
    if (targets.size === 0) continue;
    const minTarget = Math.min(...targets);
    const maxTarget = Math.max(...targets);

    function evaluate(Csuffix, Asuffix, Vsuf, word) {
      const possibilities = [];
      const num0 = e - 1 - tau - Vsuf;
      if (num0 >= 0 && num0 % 2 === 0) {
        const Vpre = num0 / 2;
        if (Vpre <= Epre) possibilities.push({d: 0, Vpre, U: tau + Vpre});
      }
      const num1 = e - tau - Vsuf;
      if (b[tau] === 1 && num1 >= 2 && num1 % 2 === 0) {
        const Vpre = num1 / 2;
        if (Vpre <= Epre) possibilities.push({d: 1, Vpre, U: tau + Vpre - 1});
      }

      for (const p of possibilities) {
        if (p.U < 1) continue;
        ++suffixes;
        const C = 3n * Csuffix + (1n << BigInt(Asuffix));
        const A = Asuffix + p.U + 2;
        const k = m + 1;
        const modulus = pow3[k];
        const cacheKey = `${k},${A}`;
        let inv = inverseCache.get(cacheKey);
        if (inv === undefined) {
          inv = inverse(mod(1n << BigInt(A), modulus), modulus);
          inverseCache.set(cacheKey, inv);
        }
        const R = mod(C * inv, modulus);
        const bound = 1n << BigInt(p.U);
        assert(modulus > bound, `modulus dominance failed at r=${r}`);
        if (R >= bound) continue;
        ++lowResidues;
        const row = {r, N, e, tau, m, d: p.d, U: p.U,
          Vpre: p.Vpre, Vsuf, word: word.join(""),
          R: R.toString(), bound: bound.toString(),
          modulus: modulus.toString(), mod4: Number(R & 3n)};
        if (firstLow === null) firstLow = row;
        if (lowRows.length < 100) lowRows.push(row);
        if (maxLowVpre === null || row.Vpre > maxLowVpre.Vpre) maxLowVpre = row;
        if ((R & 3n) === 3n) {
          ++requiredClassResidues;
          if (firstRequiredClass === null) firstRequiredClass = row;
        }
      }
    }

    function visit(t, chosen, C, A, word) {
      const remainingEligible = prefixEligible[n] - prefixEligible[t - 1];
      if (chosen > maxTarget || chosen + remainingEligible < minTarget) return;
      if (t === n + 1) {
        if (targets.has(chosen)) evaluate(C, A, chosen, word);
        return;
      }
      // Ordinary exponent one.
      word.push(1);
      visit(t + 1, chosen, 3n * C + (1n << BigInt(A)), A + 1, word);
      word.pop();
      // Spike exponent two, available only at a clock-one site.
      if (b[t] === 1) {
        word.push(2);
        visit(t + 1, chosen + 1, 3n * C + (1n << BigInt(A)), A + 2, word);
        word.pop();
      }
    }

    visit(tau + 1, 0, 0n, 0, []);
  }
}

console.log(JSON.stringify({maxR, suffixes, lowResidues,
  requiredClassResidues, firstLow, firstRequiredClass, maxLowVpre,
  lowRows}, null, 2));
