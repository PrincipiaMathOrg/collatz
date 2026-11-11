"use strict";

// Exact small-integer companion to probe_sync.py for environments without Python.

function vp(n, p) {
  if (!(n > 0)) throw new Error("vp domain");
  let e = 0;
  while (n % p === 0) { e += 1; n /= p; }
  return e;
}

function uplus(x) {
  const z = 3 * x + 1;
  const a = vp(z, 2);
  return [z / 2 ** a, a];
}

function follow(x, steps) {
  const xs = [x], aa = [];
  for (let i = 0; i < steps; ++i) {
    const [next, a] = uplus(x);
    aa.push(a); xs.push(next); x = next;
  }
  return [xs, aa];
}

function wordCarry(word) {
  let A = 0, C = 0;
  for (const a of word) { C = 3 * C + 2 ** A; A += a; }
  return [A, C];
}

function* barrierWords(maxDepth, prefix = [], A = 0, p3 = 1) {
  const k = prefix.length + 1, p3next = 3 * p3;
  for (let a = 1; 2 ** (A + a) < p3next; ++a) {
    const word = [...prefix, a];
    yield word;
    if (k < maxDepth) yield* barrierWords(maxDepth, word, A + a, p3next);
  }
}

function egcd(a, b) {
  if (b === 0) return [a, 1, 0];
  const [g, x, y] = egcd(b, a % b);
  return [g, y, x - Math.floor(a / b) * y];
}

function modInv(a, m) {
  const [g, x] = egcd(a, m);
  if (g !== 1) throw new Error("not invertible");
  return ((x % m) + m) % m;
}

function canonicalSeed(word) {
  const [A, C] = wordCarry(word), mod = 2 ** (A + 1);
  const rhs = ((2 ** A - C) % mod + mod) % mod;
  const p3 = 3 ** word.length;
  const n = (rhs * modInv(p3 % mod, mod)) % mod;
  if (!(n > 0 && n % 2 === 1)) throw new Error("bad cylinder seed");
  return n;
}

function probeNearTerminal(maxDepth = 16) {
  console.log("NEAR_TERMINAL");
  const best = new Map(), gapOne = [];
  for (const w of barrierWords(maxDepth)) {
    const r = w.length, [A, C] = wordCarry(w), val = vp(C + 2 ** A, 3);
    if (!w.every(a => a === 1)) {
      if (!best.has(r) || val > best.get(r).val) best.set(r, {val, w, A, C});
      if (val === r - 1) {
        const seed = canonicalSeed(w), [xs, aa] = follow(seed, r);
        if (aa.join() !== w.join() || vp(xs.at(-1) + 1, 3) !== val) throw new Error("witness check");
        gapOne.push({w, seed, endpoint: xs.at(-1), val});
      }
    }
  }
  for (const r of [...best.keys()].sort((a,b)=>a-b)) {
    const z = best.get(r);
    console.log(`depth=${r} max_v3=${z.val} gap=${r-z.val} word=(${z.w}) A=${z.A} D=${z.C+2**z.A}`);
  }
  console.log("first_gap_one_witnesses");
  for (const z of gapOne.slice(0,20)) console.log(JSON.stringify(z));
  console.log(`gap_one_count=${gapOne.length}`);
}

function probeAllOneMinimality(maxR = 9, maxT = 100) {
  console.log("ALL_ONE_MINIMALITY");
  let checked = 0;
  for (let r = 1; r <= maxR; ++r) for (let t = 2; t <= maxT; t += 2) {
    const x = 2 ** r * t - 1, endpoint = 3 ** r * t - 1;
    const [xs, aa] = follow(x, r);
    if (!aa.every(a=>a===1) || xs.at(-1)!==endpoint) throw new Error("all-one identity");
    for (let z = 1; z < x; z += 2) {
      const [zs] = follow(z, r);
      if (zs.at(-1) === endpoint) {
        console.log(`COUNTEREXAMPLE all-one not minimal r=${r} t=${t} actual=${x} smaller=${z} endpoint=${endpoint}`);
        return;
      }
    }
    checked += 1;
  }
  console.log(`no_counterexample checked_cases=${checked}`);
}

function greedyInverse(y) {
  if (y % 3 === 2) return (2*y-1)/3;
  if (y % 3 === 1) return (4*y-1)/3;
  return null;
}

function probeGeneralGreedy(maxEndpoint = 5000, maxR = 8) {
  console.log("GENERAL_GREEDY");
  for (let endpoint = 1; endpoint <= maxEndpoint; endpoint += 2) {
    if (endpoint % 3 === 0) continue;
    let y = endpoint;
    for (let r = 1; r <= maxR; ++r) {
      y = greedyInverse(y);
      if (y === null || y <= 0 || y % 2 === 0) break;
      for (let z = 1; z < y; z += 2) {
        const [zs] = follow(z, r);
        if (zs.at(-1) === endpoint) {
          console.log(`COUNTEREXAMPLE greedy not minimal endpoint=${endpoint} r=${r} greedy=${y} smaller=${z}`);
          return;
        }
      }
    }
  }
  console.log(`no_counterexample endpoint_cap=${maxEndpoint} depth_cap=${maxR}`);
}

function probeEndpointValuation(seedCap = 20000, stepCap = 300) {
  console.log("ENDPOINT_VALUATION");
  for (let seed = 3; seed < seedCap; seed += 2) {
    const [xs, aa] = follow(seed, stepCap);
    for (let j = 0; j < stepCap; ++j) {
      let A = 0, trailing = 0;
      for (let r = 1; r <= Math.min(30, stepCap-j); ++r) {
        const a = aa[j+r-1]; A += a;
        if (2 ** A >= 3 ** r) break;
        trailing = a === 1 ? trailing + 1 : 0;
        const b = vp(xs[j+r]+1, 3);
        if (b > trailing && b > 0) {
          console.log(`COUNTEREXAMPLE v3<=trailing-ones seed=${seed} j=${j} r=${r} word=(${aa.slice(j,j+r)}) endpoint=${xs[j+r]} v3=${b} trailing=${trailing}`);
          return;
        }
      }
    }
  }
  console.log("no_counterexample (unexpected)");
}

probeNearTerminal();
probeAllOneMinimality();
probeGeneralGreedy();
probeEndpointValuation();
