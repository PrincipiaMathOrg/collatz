"use strict";

// Exact finite probes for the Collatz proof ledger.  All arithmetic that can
// grow with an orbit or word is BigInt.  Output is evidence, not a theorem.

function shortcut(x) {
  return x % 2n === 0n ? x / 2n : (3n * x + 1n) / 2n;
}

function wordData(bits) {
  let carry = 0n;
  let weight = 0;
  for (let j = 0; j < bits.length; j += 1) {
    if (bits[j] === 1) {
      carry = 3n * carry + (1n << BigInt(j));
      weight += 1;
    }
  }
  return { q: 1n << BigInt(bits.length), p: 3n ** BigInt(weight), carry, weight };
}

function egcd(a, b) {
  let oldR = a;
  let r = b;
  let oldS = 1n;
  let s = 0n;
  while (r !== 0n) {
    const quotient = oldR / r;
    [oldR, r] = [r, oldR - quotient * r];
    [oldS, s] = [s, oldS - quotient * s];
  }
  return [oldR, oldS];
}

function mod(a, m) {
  const out = a % m;
  return out >= 0n ? out : out + m;
}

function modInverse(a, m) {
  const [g, s] = egcd(mod(a, m), m);
  if (g !== 1n) throw new Error("noninvertible");
  return mod(s, m);
}

function canonicalSeed(bits) {
  const { q, p, carry } = wordData(bits);
  return mod(-carry * modInverse(p, q), q);
}

function positiveRepresentative(bits) {
  const q = 1n << BigInt(bits.length);
  const rho = canonicalSeed(bits);
  return rho === 0n ? q : rho;
}

function trajectory(seed, k) {
  const out = [seed];
  for (let i = 0; i < k; i += 1) out.push(shortcut(out[out.length - 1]));
  return out;
}

function parityWord(seed, k) {
  const bits = [];
  let x = seed;
  for (let i = 0; i < k; i += 1) {
    bits.push(Number(x & 1n));
    x = shortcut(x);
  }
  return bits;
}

function sameBits(a, b) {
  return a.length === b.length && a.every((value, i) => value === b[i]);
}

function bitsText(bits) {
  return bits.join("");
}

function* primitiveFirstCrossings(maxK) {
  function* visit(bits, p, q) {
    if (bits.length >= maxK) return;
    for (const bit of [0, 1]) {
      const p2 = p * (bit ? 3n : 1n);
      const q2 = q * 2n;
      const word = bits.concat(bit);
      if (p2 < q2) yield word;
      else yield* visit(word, p2, q2);
    }
  }
  yield* visit([], 1n, 1n);
}

function bump(object, key) {
  object[key] = (object[key] || 0) + 1;
}

function parseOption(name, fallback) {
  const i = process.argv.indexOf(name);
  return i >= 0 ? Number(process.argv[i + 1]) : fallback;
}

function probeCrossing() {
  const maxK = parseOption("--max-k", 22);
  const witnessCap = parseOption("--witness-cap", 20);
  const counts = {};
  const byLength = {};
  const witnesses = { nondescending: [], strictParadox: [], minimumStrictParadox: [] };

  for (const bits of primitiveFirstCrossings(maxK)) {
    if (bits.length === 0 || bits[0] === 0) continue;
    const seed = positiveRepresentative(bits);
    const orbit = trajectory(seed, bits.length);
    if (!sameBits(parityWord(seed, bits.length), bits)) throw new Error("cylinder mismatch");
    const endpoint = orbit[orbit.length - 1];
    const minimum = orbit.reduce((a, b) => (a < b ? a : b));
    bump(counts, "words");
    bump(byLength, String(bits.length));
    const row = { word: bitsText(bits), seed: seed.toString(), endpoint: endpoint.toString(), minimum: minimum.toString() };
    if (endpoint >= seed) {
      bump(counts, "nondescending");
      if (witnesses.nondescending.length < witnessCap) witnesses.nondescending.push(row);
    }
    if (endpoint > seed) {
      bump(counts, "strictParadox");
      if (witnesses.strictParadox.length < witnessCap) witnesses.strictParadox.push(row);
      if (minimum === seed) {
        bump(counts, "minimumStrictParadox");
        if (witnesses.minimumStrictParadox.length < witnessCap) witnesses.minimumStrictParadox.push(row);
      }
    }
  }
  console.log(JSON.stringify({ firstCrossingMaxK: maxK, counts, byLength, witnesses }, null, 2));
}

function probeCycles() {
  const maxK = parseOption("--max-k", 19);
  const witnessCap = parseOption("--witness-cap", 30);
  const counts = {};
  const cycleWitnesses = [];
  const primitivePresentations = [];

  for (let k = 1; k <= maxK; k += 1) {
    const limit = 2 ** k;
    for (let mask = 0; mask < limit; mask += 1) {
      const bits = Array.from({ length: k }, (_, j) => (mask >> j) & 1);
      const { q, p, carry, weight } = wordData(bits);
      if (q <= p) continue;
      const denominator = q - p;
      if (carry === 0n || carry % denominator !== 0n) continue;
      const seed = carry / denominator;
      if (seed <= 0n || !sameBits(parityWord(seed, k), bits)) continue;
      if (trajectory(seed, k).at(-1) !== seed) continue;
      bump(counts, "cycleWords");
      let period = k;
      for (let j = 1; j <= k; j += 1) {
        if (trajectory(seed, j).at(-1) === seed) {
          period = j;
          break;
        }
      }
      const row = { k, word: bitsText(bits), seed: seed.toString(), weight, period };
      if (cycleWitnesses.length < witnessCap) cycleWitnesses.push(row);
      if (period === k) {
        bump(counts, "primitivePresentations");
        if (primitivePresentations.length < witnessCap) primitivePresentations.push(row);
      }
    }
  }
  console.log(JSON.stringify({ cycleWordMaxK: maxK, counts, cycleWitnesses, primitivePresentations }, null, 2));
}

function probeSeedFirstCrossing() {
  const seedCap = parseOption("--seed-cap", 100001);
  const stepCap = parseOption("--step-cap", 1000);
  const witnessCap = parseOption("--witness-cap", 30);
  const counts = {};
  const witnesses = [];
  let earliest = null;
  for (let seedNumber = 1; seedNumber <= seedCap; seedNumber += 2) {
    const seed = BigInt(seedNumber);
    let x = seed;
    let p = 1n;
    let q = 1n;
    let minimum = seed;
    const bits = [];
    let crossed = false;
    for (let k = 1; k <= stepCap; k += 1) {
      const bit = Number(x & 1n);
      bits.push(bit);
      if (bit) p *= 3n;
      q *= 2n;
      x = shortcut(x);
      if (x < minimum) minimum = x;
      if (p < q) {
        crossed = true;
        bump(counts, "crossed");
        if (x >= seed) {
          bump(counts, "nondescendingAtFirstCrossing");
          if (x > seed) bump(counts, "strictParadox");
          if (minimum === seed) bump(counts, "leastPointStrictParadox");
          const row = {
            seed: seedNumber,
            k,
            endpoint: x.toString(),
            minimum: minimum.toString(),
            weight: bits.reduce((a, b) => a + b, 0),
            word: bitsText(bits),
          };
          if (witnesses.length < witnessCap) witnesses.push(row);
          if (earliest === null || k < earliest.k || (k === earliest.k && seedNumber < earliest.seed)) earliest = row;
        }
        break;
      }
    }
    if (!crossed) bump(counts, "noCrossingWithinCap");
  }
  console.log(JSON.stringify({ seedCap, stepCap, counts, earliest, witnesses }, null, 2));
}

function popcount(mask) {
  let count = 0;
  while (mask) {
    mask &= mask - 1;
    count += 1;
  }
  return count;
}

function isPrimitiveCrossing(bits) {
  let p = 1n;
  let q = 1n;
  for (let i = 0; i < bits.length; i += 1) {
    if (bits[i]) p *= 3n;
    q *= 2n;
    if (i + 1 < bits.length && p < q) return false;
  }
  return p < q;
}

function probeEqualSlope() {
  const maxK = parseOption("--max-k", 20);
  const witnessCap = parseOption("--witness-cap", 30);
  const summary = [];
  const noSavingWitnesses = [];

  for (let k = 1; k <= maxK; k += 1) {
    const primitive = [];
    let crossingWeight = null;
    for (const bits of primitiveFirstCrossings(k)) {
      if (bits.length !== k || bits[0] === 0) continue;
      crossingWeight = bits.reduce((a, b) => a + b, 0);
      primitive.push(bits);
    }
    if (primitive.length === 0) continue;
    const p = 3n ** BigInt(crossingWeight);
    const groups = new Map();
    const limit = 2 ** k;
    for (let mask = 0; mask < limit; mask += 1) {
      if (popcount(mask) !== crossingWeight) continue;
      const bits = Array.from({ length: k }, (_, j) => (mask >> j) & 1);
      const carry = wordData(bits).carry;
      const key = (carry % p).toString();
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(carry);
    }
    for (const values of groups.values()) values.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));

    const counts = { primitive: primitive.length, descends: 0, hasSaving: 0, neither: 0 };
    for (const bits of primitive) {
      const { carry } = wordData(bits);
      const seed = positiveRepresentative(bits);
      const endpoint = trajectory(seed, k).at(-1);
      if (endpoint < seed) counts.descends += 1;
      const values = groups.get((carry % p).toString());
      let saving = null;
      for (const other of values) {
        if (other <= carry) continue;
        const d = (other - carry) / p;
        if (d < seed) {
          saving = d;
          break;
        }
      }
      if (saving !== null) counts.hasSaving += 1;
      if (endpoint >= seed && saving === null) {
        counts.neither += 1;
        if (noSavingWitnesses.length < witnessCap) {
          noSavingWitnesses.push({
            k,
            word: bitsText(bits),
            seed: seed.toString(),
            endpoint: endpoint.toString(),
            carry: carry.toString(),
          });
        }
      }
    }
    summary.push({ k, weight: crossingWeight, ...counts, residueGroups: groups.size });
  }
  console.log(JSON.stringify({ maxK, summary, noSavingWitnesses }, null, 2));
}

function probeInverseFibers() {
  const seedCap = parseOption("--seed-cap", 100001);
  const stepCap = parseOption("--step-cap", 100);
  const seeds = [];
  const states = [];
  const firstSaving = new Map();
  const records = [];
  for (let seed = 1; seed <= seedCap; seed += 2) {
    seeds.push(seed);
    states.push(BigInt(seed));
  }
  firstSaving.set(1, { depth: 0, witness: 1 });

  for (let depth = 1; depth <= stepCap; depth += 1) {
    const minima = new Map();
    for (let i = 0; i < states.length; i += 1) {
      states[i] = acceleratedStep(states[i])[0];
      const key = states[i].toString();
      const old = minima.get(key);
      if (old === undefined || seeds[i] < old) minima.set(key, seeds[i]);
    }
    for (let i = 0; i < states.length; i += 1) {
      const seed = seeds[i];
      if (firstSaving.has(seed)) continue;
      const witness = minima.get(states[i].toString());
      if (witness < seed) {
        firstSaving.set(seed, { depth, witness, endpoint: states[i].toString() });
        if (records.length === 0 || depth > records.at(-1).depth) {
          records.push({ seed, depth, witness, endpoint: states[i].toString() });
        }
      }
    }
  }

  const unresolved = seeds.filter((seed) => !firstSaving.has(seed));
  const depthCounts = {};
  for (const data of firstSaving.values()) bump(depthCounts, String(data.depth));
  const hardest = [...firstSaving.entries()]
    .map(([seed, data]) => ({ seed, ...data }))
    .sort((a, b) => b.depth - a.depth || b.seed - a.seed)
    .slice(0, 30);
  console.log(JSON.stringify({ seedCap, stepCap, resolved: firstSaving.size, unresolved: unresolved.slice(0, 100), unresolvedCount: unresolved.length, records, depthCounts, hardest }, null, 2));
}

function acceleratedStep(x) {
  let z = 3n * x + 1n;
  let a = 0;
  while (z % 2n === 0n) {
    z /= 2n;
    a += 1;
  }
  return [z, a];
}

function negativeAcceleratedStep(x) {
  let z = 3n * x - 1n;
  let a = 0;
  while (z % 2n === 0n) {
    z /= 2n;
    a += 1;
  }
  return [z, a];
}

function probeTerminalOnlyBarrier() {
  const seedCap = parseOption("--seed-cap", 200001);
  const stepCap = parseOption("--step-cap", 10000);
  const counts = {};
  const terminalBarrierHits = [];
  const otherHits = [];
  const survivors = [];
  for (let seedNumber = 1; seedNumber < seedCap; seedNumber += 2) {
    let x = BigInt(seedNumber);
    let pow2A = 1n;
    let pow3r = 1n;
    const seen = new Set();
    let done = false;
    for (let r = 0; r <= stepCap; r += 1) {
      if (x === 1n) {
        if (pow2A < pow3r) {
          bump(counts, "terminalBarrierHit");
          if (terminalBarrierHits.length < 100) terminalBarrierHits.push({ seed: seedNumber, r, pow2A: pow2A.toString(), pow3r: pow3r.toString() });
        } else {
          bump(counts, "hitOneWithoutTerminalBarrier");
          if (otherHits.length < 30) otherHits.push({ seed: seedNumber, r, pow2A: pow2A.toString(), pow3r: pow3r.toString() });
        }
        done = true;
        break;
      }
      const key = x.toString();
      if (seen.has(key)) {
        bump(counts, "cycle");
        done = true;
        break;
      }
      seen.add(key);
      const [next, a] = negativeAcceleratedStep(x);
      x = next;
      pow2A <<= BigInt(a);
      pow3r *= 3n;
    }
    if (!done) {
      bump(counts, "stepCap");
      if (survivors.length < 30) survivors.push({ seed: seedNumber, x: x.toString(), digits: x.toString().length });
    }
  }
  console.log(JSON.stringify({ seedCap, stepCap, counts, terminalBarrierHits, otherHits, survivors }, null, 2));
}

function probeNegativeCoefficientFloor() {
  const seedCap = parseOption("--seed-cap", 400001);
  const stepCap = parseOption("--step-cap", 100000);
  const floorNum = BigInt(parseOption("--num", 4));
  const floorDen = BigInt(parseOption("--den", 9));
  const counts = {};
  const hits = [];
  let longest = { steps: -1, seed: null };
  for (let seedNumber = 1; seedNumber < seedCap; seedNumber += 2) {
    let x = BigInt(seedNumber);
    let pow2A = 1n;
    let pow3r = 1n;
    const seen = new Set();
    let done = false;
    for (let r = 0; r <= stepCap; r += 1) {
      if (x === 1n) {
        bump(counts, "hitOne");
        if (hits.length < 100) hits.push({ seed: seedNumber, r });
        if (r > longest.steps) longest = { steps: r, seed: seedNumber };
        done = true;
        break;
      }
      const key = x.toString();
      if (seen.has(key)) {
        bump(counts, "cycle");
        if (r > longest.steps) longest = { steps: r, seed: seedNumber };
        done = true;
        break;
      }
      seen.add(key);
      const [next, a] = negativeAcceleratedStep(x);
      x = next;
      pow2A <<= BigInt(a);
      pow3r *= 3n;
      if (floorDen * pow3r <= floorNum * pow2A) {
        bump(counts, "floorFailure");
        if (r + 1 > longest.steps) longest = { steps: r + 1, seed: seedNumber };
        done = true;
        break;
      }
    }
    if (!done) bump(counts, "stepCap");
  }
  console.log(JSON.stringify({ seedCap, stepCap, floor: `${floorNum}/${floorDen}`, counts, hits, longest }, null, 2));
}

function valuationOrbit(seed, steps) {
  const states = [seed];
  const vals = [];
  for (let i = 0; i < steps; i += 1) {
    const [next, a] = acceleratedStep(states.at(-1));
    vals.push(a);
    states.push(next);
  }
  return [states, vals];
}

function v3(x) {
  let valuation = 0;
  while (x % 3n === 0n) {
    x /= 3n;
    valuation += 1;
  }
  return valuation;
}

function probeSynchronization() {
  const seedCap = parseOption("--seed-cap", 2001);
  const steps = parseOption("--steps", 150);
  const maxR = parseOption("--max-r", 24);
  const counts = {};
  const allOnesExamples = [];
  const nontrivialExamples = [];
  let best = { numerator: -1, denominator: 1, data: null };

  for (let seedNumber = 1; seedNumber <= seedCap; seedNumber += 2) {
    const seed = BigInt(seedNumber);
    const [states, vals] = valuationOrbit(seed, steps);
    for (let end = 1; end <= steps; end += 1) {
      for (let r = 1; r <= Math.min(maxR, end); r += 1) {
        const word = vals.slice(end - r, end);
        let prefixA = 0;
        let barrier = true;
        for (let k = 1; k <= word.length; k += 1) {
          prefixA += word[k - 1];
          if ((1n << BigInt(prefixA)) >= 3n ** BigInt(k)) {
            barrier = false;
            break;
          }
        }
        if (!barrier) continue;
        bump(counts, "barrierSuffixes");
        const valuation = v3(states[end] + 1n);
        if (valuation * best.denominator > best.numerator * r) {
          best = {
            numerator: valuation,
            denominator: r,
            data: { seed: seedNumber, end, r, valuation, word, endpoint: states[end].toString() },
          };
        }
        if (valuation >= r) {
          bump(counts, "targetOne");
          if (word.every((a) => a === 1)) {
            bump(counts, "targetOneAllOnes");
            if (allOnesExamples.length < 20) {
              allOnesExamples.push({ seed: seedNumber, end, r, endpoint: states[end].toString() });
            }
          } else {
            bump(counts, "targetOneNontrivial");
            if (nontrivialExamples.length < 20) {
              nontrivialExamples.push({ seed: seedNumber, end, r, endpoint: states[end].toString(), word });
            }
          }
        }
      }
    }
  }
  console.log(JSON.stringify({ seedCap, steps, maxR, counts, best, allOnesExamples, nontrivialExamples }, null, 2));
}

const command = process.argv[2];
if (command === "crossing") probeCrossing();
else if (command === "cycles") probeCycles();
else if (command === "seed-crossing") probeSeedFirstCrossing();
else if (command === "equal-slope") probeEqualSlope();
else if (command === "fiber") probeInverseFibers();
else if (command === "terminal-only") probeTerminalOnlyBarrier();
else if (command === "negative-floor") probeNegativeCoefficientFloor();
else if (command === "sync") probeSynchronization();
else throw new Error("usage: node exact_word_probe.js crossing|cycles|seed-crossing|equal-slope|fiber|terminal-only|negative-floor|sync [options]");
