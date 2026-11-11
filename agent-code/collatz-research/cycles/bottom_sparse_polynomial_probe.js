"use strict";

// Necessary-condition probe for the sparse-polynomial form of the
// one-drop denominator-one gate.  It deliberately forgets all middle
// branch congruences.  A surviving row is therefore a shadow, not a cycle.

function pow2(n) { return 1n << BigInt(n); }
function pow3(n) { return 3n ** BigInt(n); }

function mod(a, m) { return (a % m + m) % m; }

function extendedGcd(a, b) {
  if (b === 0) return {g: Math.abs(a), x: a < 0 ? -1 : 1, y: 0};
  const row = extendedGcd(b, a % b);
  return {g: row.g, x: row.y, y: row.x - Math.trunc(a / b) * row.y};
}

function modPowSigned(base, exponent, modulus) {
  let b = mod(base, modulus);
  let n = BigInt(exponent);
  if (n < 0n) {
    b = inverseMod(b, modulus);
    n = -n;
  }
  let answer = 1n;
  while (n > 0n) {
    if (n & 1n) answer = answer * b % modulus;
    b = b * b % modulus;
    n >>= 1n;
  }
  return answer;
}

function parameters(r) {
  const p3 = pow3(r);
  let N = 0;
  let p2 = 1n;
  while (p2 < p3) { p2 <<= 1n; N += 1; }
  const e = N - r;
  const oneSites = [];
  for (let t = 1; t < r; t += 1) {
    if (Math.floor(e * t / r) - Math.floor(e * (t - 1) / r) === 1) {
      oneSites.push(t);
    }
  }
  return {N, e, oneSites};
}

function inverseMod(a, modulus) {
  let oldR = a % modulus;
  let r = modulus;
  let oldS = 1n;
  let s = 0n;
  while (r !== 0n) {
    const q = oldR / r;
    [oldR, r] = [r, oldR - q * r];
    [oldS, s] = [s, oldS - q * s];
  }
  if (oldR !== 1n) throw new Error("noninvertible residue");
  return (oldS % modulus + modulus) % modulus;
}

function v3(n) {
  let v = 0;
  while (n % 3n === 0n) { n /= 3n; v += 1; }
  return v;
}

function firstShadow(maxR) {
  for (let r = 3; r <= maxR; r += 1) {
    const {e, oneSites} = parameters(r);
    for (let V = 1; V <= e - 2; V += 1) {
      const U = e - 1 - V;
      const limit = pow2(U - 1);
      for (let i = 0; i < oneSites.length; i += 1) {
        const tFirst = oneSites[i];
        if (pow2(tFirst - 1) > limit) continue;
        for (let j = i; j < oneSites.length; j += 1) {
          const tLast = oneSites[j];
          const available = j - i + 1;
          if (V === 1 && j !== i) continue;
          if (V > 1 && (j === i || available < V)) continue;
          const h = r - tLast;
          const modulus = pow3(h);
          const numerator = (pow2(U + 1) - 1n) % modulus;
          const denominator = pow2(U + 1 + tFirst) % modulus;
          let a0 = numerator * inverseMod(denominator, modulus) % modulus;
          if (a0 === 0n) a0 = modulus;
          const maxA = limit / pow2(tFirst - 1);
          for (let a = a0; a <= maxA; a += modulus) {
            if (a % 2n === 0n) continue;
            const q = pow2(tFirst - 1) * a;
            const T = pow2(U + 1) * (2n * q - 1n) + 1n;
            if (v3(T) !== h) continue;
            return {r, e, U, V, tFirst, tLast, h,
              q: q.toString(), limit: limit.toString(), T: T.toString()};
          }
        }
      }
    }
  }
  return null;
}

function firstDivisibilityShadow(maxR) {
  for (let r = 3; r <= maxR; r += 1) {
    const {N, e, oneSites} = parameters(r);
    const D = pow2(N) - pow3(r);
    let answer = null;

    function visit(index, selected) {
      if (answer !== null) return;
      if (index === oneSites.length) {
        const V = selected.length;
        const U = e - 1 - V;
        if (U < 1) return;
        const A = r - 1 + V;
        let J = 0n;
        for (let k = 0; k < V; k += 1) {
          const t = selected[k];
          J += pow3(r - 1 - t) * pow2(t + (k + 1) - 2);
        }
        const K = pow2(N - 1) - pow2(A) + 3n * J;
        if (K <= 0n || K % D !== 0n) return;
        const q = K / D;
        const limit = pow2(U - 1);
        if (q > limit) return;
        answer = {r, N, e, U, V, q: q.toString(),
          limit: limit.toString(), spikes: selected.slice(),
          D: D.toString(), K: K.toString()};
        return;
      }
      visit(index + 1, selected);
      selected.push(oneSites[index]);
      visit(index + 1, selected);
      selected.pop();
    }

    visit(0, []);
    if (answer !== null) return answer;
  }
  return null;
}

function resultantAudit(maxR) {
  let subsets = 0;
  let coprimeSubsets = 0;
  for (let r = 3; r <= maxR; r += 1) {
    const {N, e, oneSites} = parameters(r);
    const D = pow2(N) - pow3(r);
    const bezout = extendedGcd(r, N);
    let g = null;
    if (bezout.g === 1) {
      g = modPowSigned(2n, BigInt(bezout.x), D) *
        modPowSigned(3n, BigInt(bezout.y), D) % D;
      if (modPowSigned(g, BigInt(r), D) !== 2n % D ||
          modPowSigned(g, BigInt(N), D) !== 3n % D) {
        throw new Error(`resultant generator failed at r=${r}`);
      }
    }

    function visit(index, selected) {
      if (index < oneSites.length) {
        visit(index + 1, selected);
        selected.push(oneSites[index]);
        visit(index + 1, selected);
        selected.pop();
        return;
      }
      subsets += 1;
      if (g === null) return;
      coprimeSubsets += 1;
      const V = selected.length;
      const U = e - 1 - V;
      const A = r - 1 + V;
      let J = 0n;
      let P = modPowSigned(g, BigInt(r * (U + 1)), D);
      for (let k = 1; k <= V; k += 1) {
        const t = selected[k - 1];
        J += pow3(r - 1 - t) * pow2(t + k - 2);
        P = mod(P + modPowSigned(g,
          BigInt(r * (U + k) - e * t), D), D);
      }
      P = mod(P - 1n, D);
      const K = pow2(N - 1) - pow2(A) + 3n * J;
      const unit = modPowSigned(g, BigInt(r * (U + 2) - N * r), D);
      if (P !== mod(K * unit, D)) {
        throw new Error(`Laurent resultant identity failed at r=${r}`);
      }
    }
    visit(0, []);
  }
  return {maxR, subsets, coprimeSubsets};
}

const maxR = Number(process.argv[2] || 200);
const divisibilityMaxR = Number(process.argv[3] || 32);
const resultant = resultantAudit(18);
console.log(JSON.stringify({
  maxR,
  firstEndpointShadow: firstShadow(maxR),
  divisibilityMaxR,
  firstDivisibilityShadow: firstDivisibilityShadow(divisibilityMaxR),
  resultantAudit: resultant,
}));
console.log("scope: algebraic shadows only; the dyadic cylinder and strict leastness are not asserted");
