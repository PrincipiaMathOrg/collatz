'use strict';

function v2(n) {
  let a = 0;
  while ((n & 1n) === 0n) { n >>= 1n; a++; }
  return a;
}

function U(n) {
  const z = 3n * n + 1n;
  return z >> BigInt(v2(z));
}

// Parse a consecutive chain of blocks b_r = 1^(r-1) 2 from a boundary.
function parseChain(n, blockCap = 1000, stepCap = 100000) {
  const start = n;
  const blocks = [];
  const rows = [];
  let steps = 0;
  for (let b = 0; b < blockCap && steps < stepCap; b++) {
    const boundary = n;
    let r = 1;
    while (steps < stepCap) {
      const a = v2(3n * n + 1n);
      if (a === 1) {
        n = U(n); r++; steps++;
        continue;
      }
      if (a !== 2 || r < 2) {
        return {start, blocks, rows, stopExponent: a, stopState: n, steps};
      }
      n = U(n); steps++;
      const u = (boundary + 1n) >> BigInt(r);
      const sRaw = v2(3n ** 0n); // harmless placeholder to keep row fields stable
      rows.push({r, boundary, u, endpoint: n,
                 endpointMod3: Number(n % 3n),
                 nextRun: v2(n + 1n), sRaw});
      blocks.push(r);
      break;
    }
  }
  return {start, blocks, rows, stopExponent: null, stopState: n, steps};
}

function directTransition(r, u) {
  const z = 3n ** BigInt(r) * u + 1n;
  const s = v2(z) - 1;
  const up = z >> BigInt(s + 1);
  return {s, up};
}

const limit = Number(process.argv[2] || 2000000);
let best = null;
const hist = new Map();
for (let k = 0; k < limit; k++) {
  const n = BigInt(2 * k + 1);
  const c = parseChain(n, 100, 10000);
  const len = c.blocks.length;
  hist.set(len, (hist.get(len) || 0) + 1);
  if (!best || len > best.blocks.length) best = c;
}

console.log(`odd_seeds_scanned=${limit}`);
console.log(`hist=${JSON.stringify(Object.fromEntries([...hist].sort((a,b)=>a[0]-b[0])))}`);
console.log(`best_seed=${best.start} block_count=${best.blocks.length} blocks=${best.blocks.join(',')}`);
console.log(`stop_state=${best.stopState} stop_exponent=${best.stopExponent} steps=${best.steps}`);
for (const row of best.rows) {
  const tr = directTransition(row.r, row.u);
  console.log(`r=${row.r} x=${row.boundary} u=${row.u} xnext=${row.endpoint} ` +
              `xmod3=${row.endpointMod3} v2(xnext+1)=${row.nextRun} ` +
              `transition_s=${tr.s} up=${tr.up}`);
}
