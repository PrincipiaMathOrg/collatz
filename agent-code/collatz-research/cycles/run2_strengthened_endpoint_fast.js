#!/usr/bin/env node
"use strict";

// Diagnostic search for a counterexample to
//
//     q + 2 >= 2^(floor(log_2(3/2) r) - V)
//
// among length r-1 paths of F(2k)=3k and F(4k+1)=3k+1 with no
// three consecutive spike branches.  Unlike the affine-residue checker,
// this version carries the endpoint belonging to the least positive lift.

function bitLength(n) {
  return n.toString(2).length;
}

const maxR = Number(process.argv[2] || 100);
const minR = Number(process.argv[3] || maxR);

for (let r = minR; r <= maxR; ++r) {
  const e = bitLength(3n ** BigInt(r) - 1n) - r;
  const n = r - 1;
  let nodes = 0;
  let violation = null;
  let equality = null;

  function boundary(V) {
    const U = e - 1 - V;
    return U >= 1 ? (1n << BigInt(U)) - 2n : -1n;
  }

  function visit(t, q, z, modulus, power3, V, spikeRun, path) {
    ++nodes;
    if (violation !== null || q > boundary(V)) return;
    if (t === n) {
      const U = e - 1 - V;
      const target = boundary(V);
      const row = {r, e, q: q.toString(), U, V,
        target: target.toString(), path: path.slice()};
      if (q < target) violation = row;
      else if (q === target && equality === null) equality = row;
      return;
    }

    const zmod2 = Number(z & 1n);
    const ordinaryJ = zmod2;
    const ordinaryQ = q + BigInt(ordinaryJ) * modulus;
    const ordinaryInput = z + BigInt(ordinaryJ) * power3;

    let spikeJ = -1;
    let spikeQ = 0n;
    let spikeInput = 0n;
    if (spikeRun < 2 && V < e - 2) {
      const zmod4 = Number(z & 3n);
      const pmod4 = Number(power3 & 3n);
      spikeJ = ((1 - zmod4) * pmod4) % 4;
      if (spikeJ < 0) spikeJ += 4;
      spikeQ = q + BigInt(spikeJ) * modulus;
      spikeInput = z + BigInt(spikeJ) * power3;
    }

    const doOrdinary = () => {
      path.push(1);
      visit(t + 1, ordinaryQ, 3n * ordinaryInput / 2n,
        modulus << 1n, power3 * 3n, V, 0, path);
      path.pop();
    };
    const doSpike = () => {
      path.push(2);
      visit(t + 1, spikeQ, (3n * spikeInput + 1n) / 4n,
        modulus << 2n, power3 * 3n, V + 1, spikeRun + 1, path);
      path.pop();
    };

    // Zero lifts are the only branches on which the dangerous q can remain
    // small, so inspect them first when searching for an exact obstruction.
    if (spikeJ === 0) doSpike();
    if (ordinaryJ === 0) doOrdinary();
    if (violation !== null) return;
    if (spikeJ > 0) doSpike();
    if (ordinaryJ > 0) doOrdinary();
  }

  visit(0, 1n, 1n, 1n, 1n, 0, 0, []);
  console.log(JSON.stringify({r, e, nodes, equality, violation}));
  if (violation !== null) {
    process.exitCode = 1;
    break;
  }
}
