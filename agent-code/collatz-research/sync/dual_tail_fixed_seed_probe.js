"use strict";

// Scan ordinary odd seeds for long strict-barrier prefixes, then test the
// finite dual-tail stabilization potential on the longest exact orbits.
// This is a discovery probe, not an all-depth certificate.

function parseOption(name, fallback) {
  const index = process.argv.indexOf(name);
  if (index < 0) return fallback;
  if (index + 1 >= process.argv.length) throw new Error(`missing ${name}`);
  return Number(process.argv[index + 1]);
}

function v2(value) {
  let a = 0;
  while ((value & 1n) === 0n) {
    value >>= 1n;
    ++a;
  }
  return a;
}

function log2BigInt(value) {
  const bits = value.toString(2).length;
  const shift = Math.max(0, bits - 53);
  return Math.log2(Number(value >> BigInt(shift))) + shift;
}

function dualMass(word) {
  let e = 1;
  let mass = 0;
  for (let j = word.length - 1; j >= 0; --j) {
    e = (1 + 2 ** word[j] * e) / 3;
    mass += 1 / e;
  }
  return {mass, start: e};
}

function defectProfile(word) {
  const numerators = new Array(word.length + 1);
  const denominators = new Array(word.length + 1);
  numerators[word.length] = 1n;
  denominators[word.length] = 1n;
  for (let j = word.length - 1; j >= 0; --j) {
    numerators[j] = denominators[j + 1] +
      (1n << BigInt(word[j])) * numerators[j + 1];
    denominators[j] = 3n * denominators[j + 1];
  }
  const floors = numerators.map((n, j) => n / denominators[j]);
  const ceilings = numerators.map((n, j) =>
    (n + denominators[j] - 1n) / denominators[j]);
  const byDefect = new Map();
  let nonpositiveMass = 0;
  let exactMass = 0;
  let longestExactRun = 0;
  let exactRun = 0;
  const floorByDefect = new Map();
  let floorExactMass = 0;
  let eitherExactMass = 0;
  let anyEdgeMass = 0;
  let edgeLayers = 0;
  let longestLayeredPath = 0;
  let pathLengths = new Map();
  pathLengths.set(floors[0].toString(), 1);
  pathLengths.set(ceilings[0].toString(), 1);
  for (let j = 0; j < word.length; ++j) {
    const defectBig = (1n << BigInt(word[j])) * ceilings[j + 1] -
      3n * ceilings[j] + 1n;
    const defect = Number(defectBig);
    const e = Number(numerators[j]) / Number(denominators[j]);
    const reciprocal = 1 / e;
    const old = byDefect.get(defect) || {count: 0, mass: 0};
    old.count += 1;
    old.mass += reciprocal;
    byDefect.set(defect, old);
    if (defect <= 0) nonpositiveMass += reciprocal;
    if (defect === 0) {
      exactMass += reciprocal;
      ++exactRun;
      longestExactRun = Math.max(longestExactRun, exactRun);
    } else {
      exactRun = 0;
    }

    const floorDefectBig = (1n << BigInt(word[j])) * floors[j + 1] -
      3n * floors[j] + 1n;
    const floorDefect = Number(floorDefectBig);
    const floorOld = floorByDefect.get(floorDefect) || {count: 0, mass: 0};
    floorOld.count += 1;
    floorOld.mass += reciprocal;
    floorByDefect.set(floorDefect, floorOld);
    if (floorDefect === 0) floorExactMass += reciprocal;
    if (floorDefect === 0 || defect === 0) eitherExactMass += reciprocal;

    const currentValues = [...new Set([floors[j].toString(), ceilings[j].toString()])]
      .map(BigInt);
    const nextValues = [...new Set([floors[j + 1].toString(), ceilings[j + 1].toString()])]
      .map(BigInt);
    const nextPathLengths = new Map();
    let layerHasEdge = false;
    for (const current of currentValues) {
      const priorLength = pathLengths.get(current.toString()) || 1;
      for (const next of nextValues) {
        if ((1n << BigInt(word[j])) * next !== 3n * current - 1n) continue;
        layerHasEdge = true;
        const key = next.toString();
        const length = priorLength + 1;
        nextPathLengths.set(key, Math.max(nextPathLengths.get(key) || 1, length));
        longestLayeredPath = Math.max(longestLayeredPath, length - 1);
      }
    }
    if (layerHasEdge) {
      ++edgeLayers;
      anyEdgeMass += reciprocal;
    }
    for (const next of nextValues) {
      const key = next.toString();
      if (!nextPathLengths.has(key)) nextPathLengths.set(key, 1);
    }
    pathLengths = nextPathLengths;
  }
  return {
    nonpositiveMass,
    exactMass,
    floorExactMass,
    eitherExactMass,
    anyEdgeMass,
    edgeLayers,
    longestLayeredPath,
    longestExactRun,
    byDefect: Object.fromEntries([...byDefect.entries()].sort((a,b) => a[0]-b[0])),
    floorByDefect: Object.fromEntries([...floorByDefect.entries()].sort((a,b) => a[0]-b[0])),
  };
}

const seedCap = parseOption("--seed-cap", 2000000);
const stepCap = parseOption("--step-cap", 300);
const retain = parseOption("--retain", 2000);
const longest = [];
const histogram = new Map();

function retainRow(row) {
  longest.push(row);
  longest.sort((a, b) => b.word.length - a.word.length || a.seed - b.seed);
  if (longest.length > retain) longest.pop();
}

for (let seedNumber = 1; seedNumber <= seedCap; seedNumber += 2) {
  let x = BigInt(seedNumber);
  let pow2 = 1n;
  let pow3 = 1n;
  const word = [];
  for (let step = 0; step < stepCap; ++step) {
    if (x === 1n) break;
    const numerator = 3n * x + 1n;
    const a = v2(numerator);
    const nextPow2 = pow2 << BigInt(a);
    const nextPow3 = pow3 * 3n;
    if (nextPow2 >= nextPow3) break;
    word.push(a);
    x = numerator >> BigInt(a);
    pow2 = nextPow2;
    pow3 = nextPow3;
  }
  histogram.set(word.length, (histogram.get(word.length) || 0) + 1);
  if (longest.length < retain || word.length >= longest.at(-1).word.length)
    retainRow({seed: seedNumber, word});
}

let best = null;
let bestThreeLogRatio = null;
let threeLogViolations = 0;
for (const candidate of longest) {
  let exponent = 0;
  for (let L = 1; L <= candidate.word.length; ++L) {
    exponent += candidate.word[L - 1];
    const modulus = 1n << BigInt(exponent + 1);
    const residue = BigInt(candidate.seed) % modulus;
    if (residue === 0n) throw new Error("odd seed had zero dyadic residue");
    const dual = dualMass(candidate.word.slice(0, L));
    const logarithm = log2BigInt(residue + 1n);
    const excess = dual.mass - logarithm;
    const threeLog = 3 * Math.LN2 * logarithm;
    const threeLogRatio = dual.mass / threeLog;
    const row = {
      seed: candidate.seed,
      length: L,
      strictLength: candidate.word.length,
      exponent,
      residue: residue.toString(),
      mass: dual.mass,
      logarithm,
      excess,
      threeLog,
      threeLogRatio,
      dualStart: dual.start,
      word: candidate.word.slice(0, L).join(","),
    };
    if (best === null || row.excess > best.excess) best = row;
    if (bestThreeLogRatio === null ||
        row.threeLogRatio > bestThreeLogRatio.threeLogRatio)
      bestThreeLogRatio = row;
    if (row.threeLogRatio > 1 + 1e-12) ++threeLogViolations;
  }
}

const maximumLength = longest[0].word.length;
const maximumRows = longest.filter(row => row.word.length === maximumLength)
  .slice(0, 20)
  .map(row => ({seed: row.seed, length: row.word.length, word: row.word.join(",")}));

console.log(`odd_seeds_scanned=${Math.ceil(seedCap / 2)}`);
console.log(`maximum_strict_length=${maximumLength}`);
console.log(`maximum_rows=${JSON.stringify(maximumRows)}`);
console.log(`best_excess=${JSON.stringify(best)}`);
console.log(`best_three_log_ratio=${JSON.stringify(bestThreeLogRatio)}`);
console.log(`three_log_violations=${threeLogViolations}`);
console.log(`best_excess_defects=${JSON.stringify(defectProfile(best.word.split(",").map(Number)))}`);
console.log(`longest_seed_defects=${JSON.stringify(defectProfile(longest[0].word))}`);
console.log(`histogram=${JSON.stringify(Object.fromEntries([...histogram.entries()].sort((a,b) => a[0]-b[0])))}`);
console.log("probe_complete=true");
