"use strict";

// Exact searches for the proposed negative-map supercritical-segment lemma.
// A word bit is 1 for x -> (3x-1)/2 and 0 for x -> x/2.

function egcd(a, b) {
  let oldR = a, r = b, oldS = 1n, s = 0n;
  while (r !== 0n) {
    const q = oldR / r;
    [oldR, r] = [r, oldR - q * r];
    [oldS, s] = [s, oldS - q * s];
  }
  return [oldR, oldS];
}

function invMod(a, m) {
  const [g, x] = egcd(a, m);
  if (g !== 1n) throw new Error("not invertible");
  return ((x % m) + m) % m;
}

function data(word) {
  let M = 1n, P = 1n, C = 0n, s = 0;
  let prefixSupercritical = true;
  for (const b of word) {
    if (b === 1) {
      C = 3n * C + M;
      P *= 3n;
      ++s;
    }
    M *= 2n;
    if (P < M) prefixSupercritical = false;
  }
  const rho = (C * invMod(P, M)) % M;
  const y = (P * rho - C) / M;
  return {M, P, C, s, rho, y, prefixSupercritical};
}

function bits(x, k) {
  const a = [];
  for (let i = 0; i < k; ++i) {
    const b = Number(x & 1n);
    a.push(b);
    x = b ? (3n * x - 1n) / 2n : x / 2n;
  }
  return a;
}

let rngState = 0x4d595df4d0f33173n;
function rand64() {
  rngState ^= rngState >> 12n;
  rngState ^= rngState << 25n;
  rngState ^= rngState >> 27n;
  rngState &= (1n << 64n) - 1n;
  return (rngState * 2685821657736338717n) & ((1n << 64n) - 1n);
}

function randomWord(k, pNumerator, pDenominator, forcePrefix) {
  const w = [1];
  let P = 3n, M = 2n;
  for (let i = 1; i < k; ++i) {
    let b = Number(rand64() % BigInt(pDenominator)) < pNumerator ? 1 : 0;
    if (forcePrefix && b === 0 && P < 2n * M) b = 1;
    w.push(b);
    if (b) P *= 3n;
    M *= 2n;
  }
  // Raise the final density by flipping random zeroes, if required.
  while (P < M) {
    const j = 1 + Number(rand64() % BigInt(k - 1));
    if (w[j] === 0) {
      w[j] = 1;
      P *= 3n;
    }
  }
  return w;
}

function reportCounterexample(label, word, d) {
  console.log(JSON.stringify({
    label,
    word: word.join(""),
    k: word.length,
    s: d.s,
    M: d.M.toString(),
    P: d.P.toString(),
    C: d.C.toString(),
    rho: d.rho.toString(),
    y: d.y.toString(),
    prefixSupercritical: d.prefixSupercritical
  }));
}

function directSmall(limit, maxK) {
  for (let m = 1n; m <= BigInt(limit); m += 2n) {
    let x = m, P = 1n, M = 1n;
    for (let k = 1; k <= maxK; ++k) {
      const b = x & 1n;
      if (b) P *= 3n;
      M *= 2n;
      x = b ? (3n * x - 1n) / 2n : x / 2n;
      if (P >= M && x < m) {
        reportCounterexample("direct", bits(m, k), data(bits(m, k)));
        return false;
      }
    }
  }
  return true;
}

function randomSearch(samples, maxK, forcePrefix) {
  let bestNum = null, bestDen = null, best = null;
  for (let q = 0; q < samples; ++q) {
    const k = 2 + Number(rand64() % BigInt(maxK - 1));
    // Bias closely around the critical density, but include denser words.
    const pn = 620 + Number(rand64() % 101n);
    const w = randomWord(k, pn, 1000, forcePrefix);
    const d = data(w);
    if (d.P >= d.M && d.y < d.rho) {
      reportCounterexample(forcePrefix ? "random-prefix" : "random", w, d);
      return false;
    }
    // Track the smallest exact endpoint/start ratio below/above one.
    if (best === null || d.y * bestDen < bestNum * d.rho) {
      bestNum = d.y;
      bestDen = d.rho;
      best = {w, d};
    }
  }
  console.log(JSON.stringify({
    label: forcePrefix ? "random-prefix-best" : "random-best",
    samples,
    maxK,
    ratioNumerator: bestNum.toString(),
    ratioDenominator: bestDen.toString(),
    word: best.w.join(""),
    k: best.w.length,
    s: best.d.s,
    prefixSupercritical: best.d.prefixSupercritical
  }));
  return true;
}

// Enumerate every coefficient-prefix-supercritical word.  The canonical
// representative and endpoint lift without any modular inversion: extending
// a length-k cylinder rho (mod M) to rho+tM changes its time-k endpoint by
// tP, and exactly one t in {0,1} realizes the requested next parity.
function exhaustivePrefix(maxK) {
  let layer = [{word: "", M: 1n, P: 1n, rho: 0n, y: 0n, s: 0}];
  for (let k = 1; k <= maxK; ++k) {
    const next = [];
    let minGap = null, minWord = null, zeroes = 0;
    let minZeroSafety = null, minZeroSafetyWord = null;
    for (const a of layer) {
      for (let b = 0; b <= 1; ++b) {
        const P2 = b ? 3n * a.P : a.P;
        const M2 = 2n * a.M;
        if (P2 < M2) continue;
        const t = Number(a.y & 1n) ^ b;
        const rho = a.rho + BigInt(t) * a.M;
        const z = a.y + BigInt(t) * a.P;
        const y = b ? (3n * z - 1n) / 2n : z / 2n;
        const q = {word: a.word + String(b), M: M2, P: P2,
                   rho, y, s: a.s + b};
        if (rho > 0n && y < rho) {
          reportCounterexample("exhaustive-prefix", [...q.word].map(Number),
            data([...q.word].map(Number)));
          return false;
        }
        if (rho > 0n) {
          const gap = y - rho;
          if (gap === 0n) ++zeroes;
          else if (minGap === null || gap < minGap) {
            minGap = gap;
            minWord = q.word;
          }
        }
        next.push(q);
        if (P2 >= 2n * M2) {
          const safety = (y & 1n) === 0n
            ? y - 2n * rho
            : y + P2 - 2n * rho - 2n * M2;
          if (minZeroSafety === null || safety < minZeroSafety) {
            minZeroSafety = safety; minZeroSafetyWord = q.word;
          }
          if (safety < 0n) {
            console.log(JSON.stringify({label: "zero-safety-failure", word:q.word,
              safety:safety.toString(),rho:rho.toString(),y:y.toString(),
              P:P2.toString(),M:M2.toString()}));
            return false;
          }
        }
      }
    }
    layer = next;
    console.log(JSON.stringify({depth: k, count: layer.length, zeroes,
      minPositiveGap: minGap === null ? null : minGap.toString(), minWord,
      minZeroSafety: minZeroSafety === null ? null : minZeroSafety.toString(),
      minZeroSafetyWord}));
  }
  return true;
}

function mechanicalSearch(maxK) {
  let w = [];
  let M = 1n, P = 1n;
  let lastS = 0;
  let closest = null;
  for (let k = 1; k <= maxK; ++k) {
    M *= 2n;
    let s = lastS;
    while (3n ** BigInt(s) < M) ++s;
    const b = s - lastS;
    if (b !== 0 && b !== 1) throw new Error("bad mechanical jump");
    w.push(b);
    if (b) P *= 3n;
    lastS = s;
    const d = data(w);
    if (d.y < d.rho) {
      reportCounterexample("mechanical", w, d);
      return false;
    }
    const gap = d.y - d.rho;
    if (closest === null || gap < closest.gap) closest = {k, gap, d, word: w.join("")};
    if (k <= 20 || k % 1000 === 0) {
      console.log(JSON.stringify({k, s, gap: gap.toString(), rho: d.rho.toString()}));
    }
  }
  console.log(JSON.stringify({label: "mechanical-closest", k: closest.k,
    gap: closest.gap.toString(), word: closest.word}));
  return true;
}

function criticalSampler(k, samples) {
  // Exact endpoint weight S = min{s:3^s >= 2^k}.  dp[j][s] is a
  // floating count of admissible completions; ratios remain reliable after
  // common rescaling because only sampling, never certification, uses them.
  let Mfinal = 1n << BigInt(k), pow3 = 1n, S = 0;
  while (pow3 < Mfinal) { pow3 *= 3n; ++S; }
  const alphaCeil = [];
  let p3 = 1n, p2 = 1n, ss = 0;
  alphaCeil[0] = 0;
  for (let j = 1; j <= k; ++j) {
    p2 *= 2n;
    while (p3 < p2) { p3 *= 3n; ++ss; }
    alphaCeil[j] = ss;
  }
  const dp = Array.from({length: k + 1}, () => new Float64Array(S + 2));
  dp[k][S] = 1;
  for (let j = k - 1; j >= 0; --j) {
    for (let s = 0; s <= S; ++s) {
      if (s < alphaCeil[j]) continue;
      let v = dp[j + 1][s] + dp[j + 1][s + 1];
      if (v > 1e250) v *= 1e-200;
      dp[j][s] = v;
    }
  }
  let best = null;
  for (let sample = 0; sample < samples; ++sample) {
    let s = 0, M = 1n, P = 1n, rho = 0n, y = 0n;
    let word = "";
    for (let j = 0; j < k; ++j) {
      const c0 = (s >= alphaCeil[j + 1]) ? dp[j + 1][s] : 0;
      const c1 = dp[j + 1][s + 1];
      const u = Number(rand64() >> 11n) / 9007199254740992;
      const b = u * (c0 + c1) >= c0 ? 1 : 0;
      const t = Number(y & 1n) ^ b;
      rho += BigInt(t) * M;
      const z = y + BigInt(t) * P;
      y = b ? (3n * z - 1n) / 2n : z / 2n;
      if (b) { P *= 3n; ++s; }
      M *= 2n;
      word += String(b);
    }
    const gap = y - rho;
    if (gap < 0n) {
      reportCounterexample("critical-sampler", [...word].map(Number), data([...word].map(Number)));
      return false;
    }
    if (best === null || gap * best.rho < best.gap * rho) best = {gap, rho, y, word};
  }
  console.log(JSON.stringify({label: "critical-sampler-best", k, S, samples,
    gap: best.gap.toString(), rho: best.rho.toString(), y: best.y.toString(),
    word: best.word}));
  return true;
}

function log2Big(x) {
  if (x <= 0n) return -Infinity;
  const h = x.toString(16);
  const take = Math.min(13, h.length);
  const top = parseInt(h.slice(0, take), 16);
  return 4 * (h.length - take) + Math.log2(top);
}

function beamPrefix(maxK, width) {
  let layer = [{word: "", M: 1n, P: 1n, rho: 0n, y: 0n}];
  for (let k = 1; k <= maxK; ++k) {
    const next = [];
    for (const a of layer) {
      for (let b = 0; b <= 1; ++b) {
        const P = b ? 3n * a.P : a.P;
        const M = 2n * a.M;
        if (P < M) continue;
        const t = Number(a.y & 1n) ^ b;
        const rho = a.rho + BigInt(t) * a.M;
        const z = a.y + BigInt(t) * a.P;
        const y = b ? (3n * z - 1n) / 2n : z / 2n;
        const word = a.word + String(b);
        if (rho > 0n && y < rho) {
          reportCounterexample("beam-prefix", [...word].map(Number), data([...word].map(Number)));
          return false;
        }
        // Retain close-to-descent states, with a mild preference for a small
        // coefficient buffer so the next legal zero remains adversarial.
        const score = rho === 0n ? 0 : log2Big(y) - log2Big(rho)
          + 0.001 * Math.max(0, log2Big(P) - log2Big(M));
        next.push({word, M, P, rho, y, score});
      }
    }
    next.sort((a, b) => a.score - b.score);
    layer = next.slice(0, width);
    if (k <= 20 || k % 25 === 0) {
      const a = layer[0];
      console.log(JSON.stringify({depth: k, retained: layer.length,
        score: a.score, gap: (a.y-a.rho).toString(), word: a.word}));
    }
  }
  return true;
}

function rationalCycleSearch(maxQ, maxP, cap) {
  const seenCycles = new Set();
  for (let qn = 1; qn <= maxQ; qn += 2) {
    const q = BigInt(qn);
    for (let pn = qn + 1; pn <= maxP; ++pn) {
      let p = BigInt(pn);
      if (p <= q) continue;
      const local = new Map(), orbit = [], bitsSeen = [];
      let positive = true;
      for (let j = 0; j < cap; ++j) {
        if (p <= 0n) { positive = false; break; }
        const key = p.toString();
        if (local.has(key)) {
          const start = local.get(key);
          const cyc = orbit.slice(start), wb = bitsSeen.slice(start);
          const minp = cyc.reduce((a,b)=>a<b?a:b);
          const id = q.toString()+":"+minp.toString()+":"+cyc.length;
          if (!seenCycles.has(id)) {
            seenCycles.add(id);
            // Test every rotation which is coefficient-prefix-supercritical.
            for (let h = 0; h < cyc.length; ++h) {
              const w = wb.slice(h).concat(wb.slice(0,h));
              let P=1n,M=1n, barrier=true;
              for (const b of w) { if(b)P*=3n; M*=2n; if(P<M)barrier=false; }
              if (!barrier) continue;
              const d=data(w), rationalNumerator=cyc[h];
              // Fixed point should agree with rationalNumerator/q after reduction.
              if (rationalNumerator * (d.P-d.M) !== q*d.C) continue;
              if (rationalNumerator > q*d.rho) {
                reportCounterexample("rational-cycle", w, d);
                console.log(JSON.stringify({q:q.toString(),p:rationalNumerator.toString(),
                  rationalFixedPoint:rationalNumerator.toString()+"/"+q.toString()}));
                return false;
              }
            }
          }
          break;
        }
        local.set(key, orbit.length);
        orbit.push(p);
        const b=Number(p&1n); bitsSeen.push(b);
        p=b?(3n*p-q)/2n:p/2n;
      }
      void positive;
    }
    if (qn % 101 === 1) console.log(JSON.stringify({q:qn,cycles:seenCycles.size}));
  }
  console.log(JSON.stringify({label:"rational-cycle-complete",maxQ,maxP,cap,
    cycles:seenCycles.size}));
  return true;
}

function extendState(a, b) {
  const P = b ? 3n*a.P : a.P, M = 2n*a.M;
  if (P < M) return null;
  const t = Number(a.y&1n)^b;
  const rho=a.rho+BigInt(t)*a.M, z=a.y+BigInt(t)*a.P;
  const y=b?(3n*z-1n)/2n:z/2n;
  return {P,M,rho,y,word:a.word+String(b)};
}

function cycleExitSearch(maxN, exitDepth) {
  let base={P:1n,M:1n,rho:0n,y:0n,word:""};
  for(let n=1;n<=maxN;++n){
    for(const b of [1,1,0]) base=extendState(base,b);
    let layer=[base];
    for(let d=1;d<=exitDepth;++d){
      const next=[];
      for(const a of layer) for(let b=0;b<=1;++b){
        const z=extendState(a,b); if(z===null)continue;
        if(z.y<z.rho){
          reportCounterexample("cycle-exit",[...z.word].map(Number),data([...z.word].map(Number)));
          console.log(JSON.stringify({laps:n,exitDepth:d})); return false;
        }
        next.push(z);
      }
      layer=next;
    }
    if(n<=10||n%25===0)console.log(JSON.stringify({laps:n,leaves:layer.length}));
  }
  return true;
}

const mode = process.argv[2] || "random";
if (mode === "direct") {
  console.log(JSON.stringify({ok: directSmall(Number(process.argv[3] || 100000), Number(process.argv[4] || 512))}));
} else if (mode === "exhaustive-prefix") {
  console.log(JSON.stringify({ok: exhaustivePrefix(Number(process.argv[3] || 24))}));
} else if (mode === "mechanical") {
  console.log(JSON.stringify({ok: mechanicalSearch(Number(process.argv[3] || 1000))}));
} else if (mode === "critical") {
  console.log(JSON.stringify({ok: criticalSampler(Number(process.argv[3] || 256),
    Number(process.argv[4] || 10000))}));
} else if (mode === "beam") {
  console.log(JSON.stringify({ok: beamPrefix(Number(process.argv[3] || 512),
    Number(process.argv[4] || 20000))}));
} else if (mode === "rational") {
  console.log(JSON.stringify({ok: rationalCycleSearch(Number(process.argv[3] || 101),
    Number(process.argv[4] || 10000), Number(process.argv[5] || 1000))}));
} else if (mode === "cycle-exit") {
  console.log(JSON.stringify({ok:cycleExitSearch(Number(process.argv[3]||100),
    Number(process.argv[4]||16))}));
} else {
  const samples = Number(process.argv[3] || 100000);
  const maxK = Number(process.argv[4] || 512);
  const forcePrefix = mode === "prefix";
  console.log(JSON.stringify({ok: randomSearch(samples, maxK, forcePrefix)}));
}
