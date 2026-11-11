#!/usr/bin/env node
"use strict";

// Parallel orchestrator for the exact one-row terminal-seed certificates
// in the four-corner q_s=2, b=1 sector.

const {spawn} = require("child_process");
const path = require("path");

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function bitLength(n) {
  return n.toString(2).length;
}

function ceilTenthRoot(n) {
  let lo = 0n;
  let hi = 1n << BigInt(Math.ceil(bitLength(n) / 10));
  while (hi ** 10n < n) hi <<= 1n;
  while (lo + 1n < hi) {
    const mid = (lo + hi) >> 1n;
    if (mid ** 10n < n) lo = mid;
    else hi = mid;
  }
  return hi;
}

const minimumWeight = Number(process.argv[2] || 75);
const maximumWeight = Number(process.argv[3] || 759);
const concurrency = Number(process.argv[4] || 4);
assert(Number.isInteger(minimumWeight) && Number.isInteger(maximumWeight) &&
  minimumWeight <= maximumWeight, "bad weight range");
assert(Number.isInteger(concurrency) && concurrency >= 1,
  "bad concurrency");

const powers3 = [1n];
const ceilings = [0];
for (let s = 1; s <= maximumWeight; ++s) {
  powers3.push(powers3[s - 1] * 3n);
  ceilings.push(bitLength(powers3[s]));
}

const jobs = [];
for (let s = minimumWeight; s <= maximumWeight; ++s) {
  if (ceilings[s] - ceilings[s - 1] !== 1) continue;
  const seedBound = ceilTenthRoot(153n ** 10n * BigInt(s) ** 143n);
  const keyBits = ceilings[s] - 2 - bitLength(seedBound - 1n);
  assert(keyBits >= 1, `terminal bucket key is empty at weight ${s}`);
  jobs.push({s, projectionBits: Math.min(48, keyBits)});
}

const rowScript = path.join(__dirname,
  "q2_four_corner_terminal_seed_row_certificate.js");
const results = [];
let nextJob = 0;
let active = 0;
let completed = 0;

function runJob(job) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath,
      [rowScript, String(job.s), String(job.projectionBits)], {
        windowsHide: true,
        stdio: ["ignore", "pipe", "pipe"]
      });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", chunk => { stdout += chunk; });
    child.stderr.on("data", chunk => { stderr += chunk; });
    child.on("error", reject);
    child.on("close", code => {
      if (code !== 0) {
        reject(new Error(`row ${job.s} failed with code ${code}: ${stderr}`));
        return;
      }
      try {
        const parsed = JSON.parse(stdout);
        assert(parsed.weight === job.s,
          `row output mismatch at weight ${job.s}`);
        resolve(parsed);
      } catch (error) {
        reject(new Error(`row ${job.s} emitted invalid JSON: ${error.message}`));
      }
    });
  });
}

const allDone = new Promise((resolve, reject) => {
  function launch() {
    while (active < concurrency && nextJob < jobs.length) {
      const job = jobs[nextJob++];
      ++active;
      runJob(job).then(result => {
        results.push(result);
        --active;
        ++completed;
        if (completed % 25 === 0 || completed === jobs.length) {
          process.stderr.write(
            `four-corner terminal rows ${completed}/${jobs.length}\n`);
        }
        if (completed === jobs.length) resolve();
        else launch();
      }).catch(reject);
    }
  }
  launch();
});

allDone.then(() => {
  results.sort((a, b) => a.weight - b.weight);
  const sum = field => results.reduce((total, row) =>
    total + BigInt(row[field]), 0n);
  const badRows = results.filter(row =>
    BigInt(row.strictFormalHits) !== 0n ||
    BigInt(row.equalityFormalHits) !== 0n);
  assert(badRows.length === 0,
    `four-corner target found in rows ${badRows.map(row => row.weight)}`);

  const rowsWithOccupiedBuckets = results
    .filter(row => row.occupiedBucketHits > 0)
    .map(row => row.weight);
  const rowsWithSmallSeeds = results
    .filter(row => row.exactCylinderCandidates > 0)
    .map(row => row.weight);
  const totals = {
    rightRecords: sum("rightRecords"),
    leftQueries: sum("leftQueries"),
    occupiedBucketHits: sum("occupiedBucketHits"),
    exactRecordChecks: sum("exactRecordChecks"),
    exactSmallTerminalSeeds: sum("exactSmallTerminalSeeds"),
    exactCylinderCandidates: sum("exactCylinderCandidates"),
    reducedResidueChecks: sum("reducedResidueChecks"),
    strictFormalHits: sum("strictFormalHits"),
    equalityFormalHits: sum("equalityFormalHits")
  };

  // Freeze the complete production range.  These totals make accidental
  // changes to the projection, cylinder bounds, or residue test visible.
  if (minimumWeight === 75 && maximumWeight === 759) {
    assert(results.length === 285, "high-row q2 weight count changed");
    assert(totals.rightRecords === 753417326n,
      "high-row right-record count changed");
    assert(totals.leftQueries === 736636966n,
      "high-row left-query count changed");
    assert(totals.occupiedBucketHits === 582n,
      "high-row projected-hit count changed");
    assert(totals.exactRecordChecks === 387542n,
      "high-row exact-refinement count changed");
    assert(totals.exactSmallTerminalSeeds === 238n,
      "high-row small-seed count changed");
    assert(totals.exactCylinderCandidates === 130n,
      "high-row cylinder-candidate count changed");
    assert(totals.reducedResidueChecks === 130n,
      "high-row reduced-residue count changed");
    assert(JSON.stringify(rowsWithOccupiedBuckets) ===
      JSON.stringify([75, 78, 80, 82]),
    "high-row occupied-bucket rows changed");
    assert(JSON.stringify(rowsWithSmallSeeds) ===
      JSON.stringify([75, 78, 80]),
    "high-row small-seed rows changed");
  }

  console.log(JSON.stringify({
    certificate: "complete high-row four-corner terminal-seed audit",
    minimumWeight,
    maximumWeight,
    concurrency,
    q2Weights: results.length,
    rightRecords: totals.rightRecords.toString(),
    leftQueries: totals.leftQueries.toString(),
    occupiedBucketHits: totals.occupiedBucketHits.toString(),
    exactRecordChecks: totals.exactRecordChecks.toString(),
    exactSmallTerminalSeeds: totals.exactSmallTerminalSeeds.toString(),
    exactCylinderCandidates: totals.exactCylinderCandidates.toString(),
    reducedResidueChecks: totals.reducedResidueChecks.toString(),
    strictFormalHits: totals.strictFormalHits.toString(),
    equalityFormalHits: totals.equalityFormalHits.toString(),
    rowsWithOccupiedBuckets,
    rowsWithSmallSeeds,
    theorem:
      `no four-corner strict or equality target at q_s=2 weights ${minimumWeight}..${maximumWeight}`
  }, null, 2));
}).catch(error => {
  process.stderr.write(`${error.stack || error.message}\n`);
  process.exitCode = 1;
});
