#!/usr/bin/env node
"use strict";

// Diagnostic only.  For
//   H_T(X)=(X-1) sum_{c in T} X^(cStar-c)-X^(cStar+1),
// approximate the logarithmic Mahler measure by a midpoint trapezoid rule
// on the unit circle.  This tests whether the discrete-derivative structure
// might give a support-independent bound below 3.

function logMahler(cStar, subset, samples = 8192) {
  let total = 0;
  for (let k = 0; k < samples; k++) {
    const th = 2 * Math.PI * (k + 0.5) / samples;
    const zr = Math.cos(th), zi = Math.sin(th);
    let qr = 0, qi = 0;
    for (const c of subset) {
      const e = cStar - c;
      qr += Math.cos(e * th);
      qi += Math.sin(e * th);
    }
    // (z-1)Q-z^(cStar+1)
    const pr = (zr - 1) * qr - zi * qi - Math.cos((cStar + 1) * th);
    const pi = (zr - 1) * qi + zi * qr - Math.sin((cStar + 1) * th);
    total += 0.5 * Math.log(pr * pr + pi * pi);
  }
  return Math.exp(total / samples);
}

function exactSmall(maxDegree) {
  for (let cStar = 3; cStar <= maxDegree; cStar++) {
    let best = { m: 0, subset: null };
    const available = cStar - 1;
    for (let mask = 1; mask < (1 << available); mask++) {
      const subset = [];
      for (let c = 1; c < cStar; c++) {
        if ((mask >>> (c - 1)) & 1) subset.push(c);
      }
      const m = logMahler(cStar, subset, 4096);
      if (m > best.m) best = { m, subset };
    }
    console.log(JSON.stringify({ cStar, exhaustive: true, ...best }));
  }
}

function randomLarge(degrees, trials) {
  let seed = 0x9e3779b9;
  function rng() {
    seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5;
    return (seed >>> 0) / 0x100000000;
  }
  for (const cStar of degrees) {
    let best = { m: 0, subset: null };
    for (let t = 0; t < trials; t++) {
      const subset = [];
      const density = 0.05 + 0.9 * rng();
      for (let c = 1; c < cStar; c++) if (rng() < density) subset.push(c);
      if (subset.length === 0) subset.push(1 + Math.floor(rng() * (cStar - 1)));
      const m = logMahler(cStar, subset, 4096);
      if (m > best.m) best = { m, subset };
    }
    console.log(JSON.stringify({ cStar, exhaustive: false, trials, m: best.m,
      support: best.subset.length, subset: best.subset }));
  }
}

exactSmall(11);
randomLarge([20, 40, 80, 160], 300);

function gcd(a, b) { while (b) [a, b] = [b, a % b]; return Math.abs(a); }

// Enumerate a superset of the admissible two-level Christoffel deformations:
// m_0=0, m_j in {0,1}, and a 0->1 transition is allowed only across a
// Christoffel gap of two.  This is still diagnostic; it omits the full
// least-rotation test but never understates the local-path obstruction.
function admissibleSmall(maxR) {
  const alpha = Math.log2(3);
  for (let r = 3; r <= maxR; r++) {
    const N = Math.ceil(alpha * r - 1e-12);
    if (gcd(N, r) !== 1) continue;
    const base = Array.from({ length: r }, (_, j) => Math.floor(j * N / r));
    const residues = Array.from({ length: r }, (_, j) => (j * N) % r);
    let best = { m: 0, support: null, mask: 0 }, admissible = 0;
    for (let mask = 1; mask < (1 << (r - 1)); mask++) {
      let ok = true, prev = 0;
      const cs = [];
      for (let j = 1; j < r; j++) {
        const cur = (mask >>> (j - 1)) & 1;
        if (base[j] - base[j - 1] - (cur - prev) < 1) { ok = false; break; }
        if (cur) cs.push(residues[j]);
        prev = cur;
      }
      if (!ok) continue;
      admissible++;
      const cStar = Math.max(...cs);
      // H only depends on the set of distinct residues; coprimality makes
      // them distinct.
      const m = logMahler(cStar, cs, 4096);
      if (m > best.m) best = { m, support: cs, mask };
    }
    console.log(JSON.stringify({ r, N, admissibleChristoffelSuperset: admissible, ...best }));
  }
}

admissibleSmall(18);

function admissibleRandom(rs, trials) {
  const alpha = Math.log2(3);
  let seed = 0x243f6a88;
  function rng() { seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5;
    return (seed >>> 0) / 0x100000000; }
  for (const r of rs) {
    const N = Math.ceil(alpha * r - 1e-12);
    if (gcd(N, r) !== 1) continue;
    const base = Array.from({ length: r }, (_, j) => Math.floor(j * N / r));
    const residues = Array.from({ length: r }, (_, j) => (j * N) % r);
    let best = { m: 0, support: null };
    for (let t = 0; t < trials; t++) {
      let prev = 0;
      const cs = [];
      for (let j = 1; j < r; j++) {
        const gap = base[j] - base[j - 1];
        let cur;
        if (prev === 0 && gap === 1) cur = 0;
        else cur = rng() < 0.5 ? 1 : 0;
        if (cur) cs.push(residues[j]);
        prev = cur;
      }
      if (!cs.length) continue;
      const cStar = Math.max(...cs);
      const m = logMahler(cStar, cs, 4096);
      if (m > best.m) best = { m, support: cs };
    }
    console.log(JSON.stringify({ r, N, randomAdmissibleTrials: trials,
      m: best.m, supportSize: best.support && best.support.length,
      support: best.support }));
  }
}

admissibleRandom([29, 41, 59, 83, 127], 500);
