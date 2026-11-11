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

function extend(node, a) {
  const liftMod = 1n << BigInt(node.A + 1);
  const choices = 1 << a;
  for (let kk = 0; kk < choices; kk++) {
    const k = BigInt(kk);
    const intermediate = node.y + 2n * node.pow3 * k;
    const znum = 3n * intermediate + 1n;
    if (v2(znum) !== a) continue;
    const n = node.n + liftMod * k;
    const y = znum >> BigInt(a);
    return {
      t: node.t + 1,
      A: node.A + a,
      pow3: node.pow3 * 3n,
      n, y,
      zeroRun: k === 0n ? node.zeroRun + 1 : 0,
      totalZero: node.totalZero + (k === 0n ? 1 : 0),
      word: node.word.concat(a),
      lastK: k
    };
  }
  throw new Error(`no lift t=${node.t} A=${node.A} a=${a}`);
}

function strictBarrier(A, t) {
  return (1n << BigInt(A)) < 3n ** BigInt(t);
}

const maxDepth = Number(process.argv[2] || 16);
let frontier = [{t: 0, A: 0, pow3: 1n, n: 1n, y: 1n,
                 zeroRun: 0, totalZero: 0, word: [], lastK: 0n}];

for (let depth = 1; depth <= maxDepth; depth++) {
  const next = [];
  const byZeroRun = new Map();
  let minE = null;
  let maxDef = null;
  let maxZero = null;
  let maxTotalZero = null;
  for (const node of frontier) {
    for (let a = 1; strictBarrier(node.A + a, depth); a++) {
      const z = extend(node, a);
      const D = (1n << BigInt(z.A)) * (z.y + 1n) - z.pow3 * z.n;
      if (D <= 0n) throw new Error('nonpositive D');
      const e = v3(D);
      const deficit = depth - e;
      const row = byZeroRun.get(z.zeroRun);
      if (!row || e < row.minE || (e === row.minE && deficit > row.maxDef)) {
        byZeroRun.set(z.zeroRun, {
          count: (row && row.count) || 0,
          minE: e, maxDef: deficit,
          word: z.word.join(','), seed: z.n.toString(),
          D: D.toString(), y: z.y.toString(), lastK: z.lastK.toString()
        });
      }
      byZeroRun.get(z.zeroRun).count++;
      if (!minE || e < minE.e) minE = {e, word:z.word.join(','), seed:z.n.toString()};
      if (!maxDef || deficit > maxDef.deficit) maxDef = {deficit, e, word:z.word.join(','), seed:z.n.toString()};
      if (!maxZero || z.zeroRun > maxZero.zeroRun ||
          (z.zeroRun === maxZero.zeroRun && e < maxZero.e)) {
        maxZero = {zeroRun:z.zeroRun,e,deficit,word:z.word.join(','),seed:z.n.toString(),D:D.toString(),y:z.y.toString()};
      }
      if (!maxTotalZero || z.totalZero > maxTotalZero.totalZero ||
          (z.totalZero === maxTotalZero.totalZero && e < maxTotalZero.e)) {
        maxTotalZero = {totalZero:z.totalZero,e,deficit,word:z.word.join(','),seed:z.n.toString()};
      }
      next.push(z);
    }
  }
  frontier = next;
  console.log(`depth=${depth} barrier_words=${frontier.length} min_e=${minE.e} max_deficit=${maxDef.deficit}`);
  console.log(`  max_zero_tail=${JSON.stringify(maxZero)}`);
  console.log(`  max_total_zero=${JSON.stringify(maxTotalZero)}`);
  if (depth === maxDepth) {
    for (const [zr,row] of [...byZeroRun].sort((a,b)=>a[0]-b[0])) {
      console.log(`  zero_run=${zr} ${JSON.stringify(row)}`);
    }
  }
}
