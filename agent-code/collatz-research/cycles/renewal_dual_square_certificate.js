#!/usr/bin/env node
"use strict";

// Default finite certificate for the square-scale dual ternary gate.
// The worker contains exact BigInt assertions for the r <= 80 audit.
// This wrapper deliberately supplies no cutoff arguments, so the worker's
// frozen regression counts are active.

const {spawnSync} = require("child_process");
const path = require("path");

const worker = path.join(__dirname, "renewal_dual_square_suffix_probe.js");
const run = spawnSync(process.execPath, [worker], {
  encoding: "utf8",
  maxBuffer: 16 * 1024 * 1024,
});

if (run.stdout) process.stdout.write(run.stdout);
if (run.stderr) process.stderr.write(run.stderr);
if (run.error) throw run.error;
if (run.status !== 0) {
  throw new Error(`square suffix worker failed with status ${run.status}`);
}

