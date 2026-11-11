#!/usr/bin/env node
"use strict";

// Diagnostic enumeration of the hardest q=2, b=1 profiles whose
// accelerated exponents are all 1 or 2.  Every proper accelerated prefix
// is required to remain coefficient-supercritical, and the last exponent
// is 2.  This does not prove FCD; it locates the exact closest margins.

function mod(a, m) { const r = a % m; return r < 0n ? r + m : r; }
function inv(a, m) {
  let r0 = m, r1 = mod(a, m), s0 = 0n, s1 = 1n;
  while (r1) { const q = r0 / r1; [r0, r1] = [r1, r0 - q * r1];
    [s0, s1] = [s1, s0 - q * s1]; }
  if (r0 !== 1n) throw new Error("nonunit");
  return mod(s0, m);
}

function bitCount(x) { let n = 0; while (x) { x &= x - 1; n++; } return n; }

function scan(maxS) {
  const alpha = Math.log2(3);
  for (let s = 2; s <= maxS; s++) {
    const k = Math.ceil(alpha * s - 1e-12);
    const e = k - s;
    const kPrev = Math.ceil(alpha * (s - 1) - 1e-12);
    if (k - kPrev !== 1 || e < 1) continue; // q_s=2
    // Last exponent is 2, hence one of the e delayed bits is fixed.
    if (e - 1 > s - 1 || s - 1 >= 31) continue;
    const chooseMaskLimit = 1 << (s - 1);
    let profiles = 0, closest = null;
    const M = 1n << BigInt(k), P = 3n ** BigInt(s), D = M - P;
    for (let mask = 0; mask < chooseMaskLimit; mask++) {
      if (bitCount(mask) !== e - 1) continue;
      let A = 0, C = 0n, ok = true;
      for (let i = 0; i < s; i++) {
        C += (1n << BigInt(A)) * (3n ** BigInt(s - 1 - i));
        const a = i === s - 1 ? 2 : 1 + ((mask >>> i) & 1);
        A += a;
        if (i + 1 < s && (1n << BigInt(A)) >= 3n ** BigInt(i + 1)) {
          ok = false; break;
        }
      }
      if (!ok || A !== k) continue;
      profiles++;
      const rho = mod(-C * inv(P, M), M);
      const Z = (P * rho + C) / M;
      const gap = rho - Z;
      if (!closest || gap < closest.gap) {
        closest = { gap, rho, Z, mask, C };
      }
      if (gap <= 0n && rho > 1n) {
        console.log(JSON.stringify({ counterexample: true, s, k, e,
          rho: rho.toString(), Z: Z.toString(), gap: gap.toString(),
          mask: mask.toString(2) }));
        process.exitCode = 1;
        return;
      }
    }
    console.log(JSON.stringify({ s, k, e, profiles,
      closest: closest && { gap: closest.gap.toString(),
        rho: closest.rho.toString(), Z: closest.Z.toString(),
        mask: closest.mask.toString(2) } }));
  }
}

scan(Number(process.argv[2] || 28));

