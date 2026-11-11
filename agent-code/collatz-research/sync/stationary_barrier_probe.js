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

const oddSeeds = Number(process.argv[2] || 1000000);
const stepCap = Number(process.argv[3] || 10000);
let bestBarrier = null;
let bestZeroStable = null;
let bestCriticalZero = null;
let capCount = 0;

for (let i = 0; i < oddSeeds; i++) {
  const seed = BigInt(2 * i + 1);
  let x = seed, A = 0, pow3 = 1n, stabilizeAt = null;
  const word = [];
  let lastZeroStable = null;
  let lastBarrierState = null;
  let t;
  for (t = 1; t <= stepCap; t++) {
    let z = 3n * x + 1n;
    const a = v2(z);
    z >>= BigInt(a);
    x = z; A += a; pow3 *= 3n; word.push(a);
    if (!((1n << BigInt(A)) < pow3)) break;
    lastBarrierState = {t, A, endpoint: x};
    if (stabilizeAt === null && seed < (1n << BigInt(A + 1))) stabilizeAt = t;
    if (stabilizeAt !== null && v3(x + 1n) === 0) {
      // rho_t is already the seed at stabilizeAt; the subsequent
      // t-stabilizeAt extensions have zero innovation.
      lastZeroStable = {t, run: t - stabilizeAt, A, endpoint: x};
      const log2q = t * Math.log2(3) - A;
      if (!bestCriticalZero || log2q < bestCriticalZero.log2q) {
        bestCriticalZero = {seed, t, A, endpoint:x, stabilizeAt,
                            zeroRun:t-stabilizeAt, log2q};
      }
    }
  }
  if (t > stepCap) capCount++;
  const barrierLen = Math.min(t - 1, stepCap);
  if (!bestBarrier || barrierLen > bestBarrier.barrierLen) {
    bestBarrier = {seed, barrierLen, stabilizeAt,
                   A:lastBarrierState && lastBarrierState.A,
                   endpoint:lastBarrierState && lastBarrierState.endpoint,
                   word:word.slice(0,barrierLen)};
  }
  if (lastZeroStable && (!bestZeroStable || lastZeroStable.run > bestZeroStable.run)) {
    bestZeroStable = {seed, barrierLen, stabilizeAt, ...lastZeroStable,
                      word:word.slice(0,lastZeroStable.t)};
  }
}

function show(label, x) {
  console.log(label + '=' + JSON.stringify(x, (_k,v) => typeof v === 'bigint' ? v.toString() : v));
}
console.log(`odd_seeds_scanned=${oddSeeds} step_cap=${stepCap} cap_count=${capCount}`);
show('best_barrier', bestBarrier);
show('best_zero_stable', bestZeroStable);
show('best_critical_zero', bestCriticalZero);
