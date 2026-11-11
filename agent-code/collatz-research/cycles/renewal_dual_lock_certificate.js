#!/usr/bin/env node
"use strict";

// Exact certificate for the dual ternary locking theorem and the r=37
// anchored suffix countershadow.  The finite generic audit checks algebraic
// identities only.  It is not an all-depth exclusion certificate.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function pow2(k) {
  return 1n << BigInt(k);
}

function pow3(k) {
  return 3n ** BigInt(k);
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

function bitLength(n) {
  return n.toString(2).length;
}

function valuation2(n) {
  assert(n > 0n, "valuation input must be positive");
  let v = 0;
  while ((n & 1n) === 0n) {
    n >>= 1n;
    ++v;
  }
  return v;
}

function parameters(r) {
  const N = bitLength(pow3(r) - 1n);
  const e = N - r;
  const b = [0];
  for (let t = 1; t <= r; ++t) {
    b.push(Math.floor(e * t / r) - Math.floor(e * (t - 1) / r));
  }
  assert(b[r] === 1, `terminal clock bit failed at r=${r}`);
  return {r, N, e, b};
}

function carry(exponents) {
  let A = 0;
  let C = 0n;
  for (const a of exponents) {
    C = 3n * C + pow2(A);
    A += a;
  }
  return {A, C, k: exponents.length};
}

function dualResidue(exponents) {
  const row = carry(exponents);
  const modulus = pow3(row.k);
  const R = mod(row.C * inverse(mod(pow2(row.A), modulus), modulus), modulus);
  return {...row, modulus, R};
}

function genericIdentityAudit(maxR) {
  let words = 0;
  for (let r = 3; r <= maxR; ++r) {
    const {N, e, b} = parameters(r);
    const n = r - 1;

    function visit(t, word, V) {
      if (t === n + 1) {
        const U = e - 1 - V;
        if (U < 1) return;
        ++words;
        let L = 0;
        let tau = null;
        for (let s = 1; s <= n; ++s) {
          L += word[s - 1];
          if (tau === null && L >= U) tau = s;
        }
        assert(tau !== null, `missing tau at r=${r}`);
        const Ltau = word.slice(0, tau).reduce((x, y) => x + y, 0);
        const d = Ltau - U;
        assert(d === 0 || d === 1, `overshoot failed at r=${r}`);
        const suffix = word.slice(tau).concat([U + 2]);
        const dual = dualResidue(suffix);
        assert(dual.k === r - tau, `suffix length failed at r=${r}`);
        assert(dual.A === N - Ltau, `suffix exponent failed at r=${r}`);
        assert(dual.modulus > pow2(U), `modulus dominance failed at r=${r}`);
        assert(mod(pow2(dual.A) * dual.R - dual.C, dual.modulus) === 0n,
          `dual congruence failed at r=${r}`);

        const prefix = carry(word.slice(0, tau));
        const full = carry(word.concat([U + 2]));
        assert(full.C === pow3(dual.k) * prefix.C + pow2(Ltau) * dual.C,
          `carry split failed at r=${r}`);
        assert(full.A === N, `full exponent failed at r=${r}`);

        // Cross-multiplied form of the middle-defect identity (24).
        const x = 5n;
        const lhsNumerator = pow2(dual.A) * x - dual.C;
        const rhsNumerator = pow3(tau) * x + prefix.C;
        const splitNumerator =
          pow2(Ltau) * lhsNumerator - pow3(dual.k) * rhsNumerator;
        const fullNumerator = (pow2(N) - pow3(r)) * x - full.C;
        assert(splitNumerator === fullNumerator,
          `middle defect failed at r=${r}`);
        return;
      }

      word.push(1);
      visit(t + 1, word, V);
      word.pop();
      if (b[t] === 1) {
        word.push(2);
        visit(t + 1, word, V + 1);
        word.pop();
      }
    }

    visit(1, [], 0);
  }
  return {maxR, words};
}

function countershadowAudit() {
  const r = 37;
  const {N, e, b} = parameters(r);
  const U = 19;
  const tau = 19;
  const spikeTimes = [26, 32];
  const selected = new Set(spikeTimes);
  const internal = Array.from({length: r - 1}, (_, i) =>
    selected.has(i + 1) ? 2 : 1);
  const V = internal.filter(a => a === 2).length;
  assert(N === 59 && e === 22 && V === 2 && U === e - 1 - V,
    "countershadow parameters failed");
  for (const t of spikeTimes) {
    assert(b[t] === 1, `countershadow spike is ineligible at t=${t}`);
  }
  const Ltau = internal.slice(0, tau).reduce((x, y) => x + y, 0);
  assert(Ltau === U, "countershadow stabilization index failed");
  const suffix = internal.slice(tau);
  assert(suffix.join("") === "11111121111121111",
    "countershadow suffix word failed");

  const exponents = suffix.concat([U + 2]);
  const dual = dualResidue(exponents);
  const x = 185699n;
  const q = (x + 1n) / 2n;
  const Y = 527019647n;
  assert(dual.A === 40 && dual.k === 18, "countershadow A or k failed");
  assert(dual.C === 413028041n, "countershadow carry failed");
  assert(dual.modulus === 387420489n, "countershadow modulus failed");
  assert(dual.R === x, "countershadow residue failed");
  assert(pow2(40) * x - dual.C === pow3(18) * Y,
    "countershadow locking identity failed");
  assert(x < pow2(U) && (x & 3n) === 3n && q < pow2(U - 1),
    "countershadow low interval or parity failed");

  // Reverse every prescribed exponent, then run forward again.  This
  // checks all intermediate integrality conditions and exact valuations.
  let y = x;
  const reverseStates = [y];
  for (let i = exponents.length - 1; i >= 0; --i) {
    const numerator = pow2(exponents[i]) * y - 1n;
    assert(numerator % 3n === 0n,
      `countershadow inverse divisibility failed at i=${i}`);
    y = numerator / 3n;
    assert((y & 1n) === 1n, `countershadow inverse parity failed at i=${i}`);
    reverseStates.push(y);
  }
  assert(y === Y, "countershadow middle state failed");

  y = Y;
  const forwardStates = [y];
  for (let i = 0; i < exponents.length; ++i) {
    const numerator = 3n * y + 1n;
    assert(valuation2(numerator) === exponents[i],
      `countershadow exact exponent failed at i=${i}`);
    y = numerator / pow2(exponents[i]);
    forwardStates.push(y);
  }
  assert(y === x, "countershadow return failed");
  assert(forwardStates.slice(0, -1).every(state => state > x),
    "countershadow strict leastness failed");

  // The corresponding z-coordinate prefix exits at its second branch.
  let z = q;
  assert((z & 1n) === 0n && b[1] === 0, "countershadow first branch failed");
  z = 3n * z / 2n;
  assert(z === 139275n && z % 4n === 3n && b[2] === 1,
    "countershadow prefix exit failed");
  assert(q % pow2(tau) !== 0n,
    "countershadow unexpectedly realizes the ordinary prefix");

  return {r, N, e, U, V, tau, k: dual.k, A: dual.A,
    C: dual.C.toString(), modulus: dual.modulus.toString(),
    R: dual.R.toString(), q: q.toString(), Y: Y.toString(),
    minProperSuffixState: forwardStates.slice(0, -1)
      .reduce((a, state) => state < a ? state : a).toString(),
    prefixExitState: z.toString()};
}

const identities = genericIdentityAudit(18);
const countershadow = countershadowAudit();
console.log(`identity audit: ${JSON.stringify(identities)}`);
console.log(`r=37 countershadow: ${JSON.stringify(countershadow)}`);
console.log("status: PASS");
console.log("scope: exact identities and explicit suffix countershadow; no all-depth exclusion");

