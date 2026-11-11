"use strict";

// Exact certificate for the terminal-defect form of the one-drop
// bottom-normalized carry gate.  All arithmetic is BigInt.  The final
// search is finite evidence only and is not an all-depth proof.

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function pow2(exponent) {
  return 1n << BigInt(exponent);
}

function pow3(exponent) {
  return 3n ** BigInt(exponent);
}

function parameters(r) {
  const threePower = pow3(r);
  let N = 0;
  let twoPower = 1n;
  while (twoPower < threePower) {
    twoPower <<= 1n;
    N += 1;
  }
  // Equality cannot occur, but this assertion makes the convention exact.
  assert(twoPower !== threePower, `unexpected power equality at r=${r}`);
  const e = N - r;
  const b = [0];
  for (let t = 1; t <= r; t += 1) {
    b.push(Math.floor((e * t) / r) - Math.floor((e * (t - 1)) / r));
  }
  assert(b[r] === 1, `terminal clock bit is not one at r=${r}`);
  assert(b.slice(1, r).reduce((x, y) => x + y, 0) === e - 1,
    `internal clock count mismatch at r=${r}`);
  return {r, N, e, b};
}

function wordData(r, spikeTimes, q) {
  const {N, e, b} = parameters(r);
  const L = r - 1;
  const V = spikeTimes.length;
  const U = e - 1 - V;
  const A = L + V;
  const M = pow2(A);
  assert(A === N - U - 2, `A=N-U-2 failed at r=${r}`);
  const selected = new Set(spikeTimes);
  assert(selected.size === V, `duplicate spike at r=${r}`);

  let z = q;
  const states = [z];
  let k = 0;
  let J = 0n;
  for (let t = 1; t <= L; t += 1) {
    if (selected.has(t)) {
      assert(b[t] === 1, `spike outside the anchored clock at r=${r}, t=${t}`);
      assert(z % 4n === 1n, `invalid spike domain at r=${r}, t=${t}`);
      k += 1;
      J += pow3(L - t) * pow2(t + k - 2);
      z = (3n * z + 1n) / 4n;
    } else {
      assert(z % 2n === 0n, `invalid ordinary domain at r=${r}, t=${t}`);
      z = (3n * z) / 2n;
    }
    states.push(z);
  }
  assert(k === V, `spike count mismatch at r=${r}`);

  const D = pow2(N) - pow3(r);
  const K = pow2(N - 1) - M + 3n * J;
  const defect = pow2(U + 1) * (2n * q - 1n) - (3n * z - 1n);

  // Affine endpoint and normalized-carry identities.
  assert(M * z === pow3(L) * q + J,
    `affine endpoint identity failed at r=${r}`);
  assert(pow2(N - 2) * z === pow2(U) * (pow3(L) * q + J),
    `normalized endpoint identity failed at r=${r}`);

  // The normalized carry equation at its rational fixed point Q=K/D.
  // This is (38) after multiplication by 3^r D.
  let scaledC = 0n;
  k = 0;
  for (const t of spikeTimes) {
    k += 1;
    scaledC += pow2(t + k) * pow3(r - t);
  }
  assert(4n * K ===
    pow2(N + 1) - pow2(N - U) + scaledC,
  `bottom-normalized carry equation failed at r=${r}`);

  // Terminal defect, global divisibility, and coprime equivalence.
  assert(D * q - K === M * defect,
    `terminal defect identity failed at r=${r}`);
  assert(D % 2n === 1n, `D is not odd at r=${r}`);
  assert((K % D === 0n) === (defect % D === 0n),
    `D|K iff D|defect failed at r=${r}`);

  // Translation by one complete dyadic cylinder.
  const shiftedQ = q + 3n * M;
  let shiftedZ = shiftedQ;
  for (let t = 1; t <= L; t += 1) {
    shiftedZ = selected.has(t)
      ? (3n * shiftedZ + 1n) / 4n
      : (3n * shiftedZ) / 2n;
  }
  const shiftedDefect =
    pow2(U + 1) * (2n * shiftedQ - 1n) - (3n * shiftedZ - 1n);
  assert(shiftedDefect === defect + 3n * D,
    `cylinder translation failed at r=${r}`);

  return {r, N, e, L, U, V, A, M, D, K, J, q, z, states, defect};
}

function q14Audit() {
  const row = wordData(16, [2, 7, 8, 10, 13], 14n);
  const expectedStates = [14n, 21n, 16n, 24n, 36n, 54n, 81n, 61n,
    46n, 69n, 52n, 78n, 117n, 88n, 132n, 198n];
  assert(row.U === 4 && row.V === 5, "Q=14 count mismatch");
  assert(row.states.length === expectedStates.length &&
    row.states.every((z, i) => z === expectedStates[i]),
  "Q=14 state list mismatch");
  assert(row.M === pow2(20), "Q=14 M mismatch");
  assert(row.D === 24062143n, "Q=14 D mismatch");
  assert(row.K === 52705906n, "Q=14 K mismatch");
  assert(row.defect === 271n, "Q=14 terminal defect mismatch");
  assert(row.states.slice(1).every((z) => z > row.q),
    "Q=14 strict leastness failed");
  assert(row.z % 2n === 0n && row.defect % 2n === 1n,
    "Q=14 parity warning failed");
  return row;
}

function allOmissionAudit() {
  const r = 8;
  const {N, e} = parameters(r);
  const L = r - 1;
  const V = 0;
  const U = e - 1;
  const M = pow2(L);
  const D = pow2(N) - pow3(r);
  const K = pow2(N - 1) - M;
  assert(N === 13 && e === 5 && U === 4, "all-omission parameters failed");
  assert(D === 1631n && K === 3968n, "all-omission D or K failed");

  // Q=K/D is kept as the unreduced exact fraction qNumerator/qDenominator.
  const qNumerator = K;
  const qDenominator = D;
  assert(qNumerator < 8n * qDenominator, "all-omission target failure lost");
  let zNumerator = qNumerator;
  let zDenominator = qDenominator;
  for (let t = 1; t <= L; t += 1) {
    zNumerator *= 3n;
    zDenominator *= 2n;
    assert(zNumerator * qDenominator > qNumerator * zDenominator,
      `all-omission strict leastness failed at t=${t}`);
  }
  assert((3n * zNumerator - zDenominator) * qDenominator ===
    pow2(U + 1) * (2n * qNumerator - qDenominator) * zDenominator,
  "all-omission bottom closure failed");
  return {r, N, e, U, V, D, K, qNumerator, qDenominator};
}

function extendResidue(A, B, ell, residue, extra) {
  const oldModulus = pow2(ell);
  const newModulus = pow2(ell + extra);
  for (let j = 0n; j < pow2(extra); j += 1n) {
    const candidate = residue + j * oldModulus;
    if ((A * candidate + B) % newModulus === 0n) return candidate;
  }
  throw new Error("unique dyadic lift failed");
}

function identityAudit(maxR) {
  let leaves = 0;
  for (let r = 3; r <= maxR; r += 1) {
    const {b} = parameters(r);
    const L = r - 1;

    function visit(t, A, B, ell, residue, spikeTimes) {
      if (t === L + 1) {
        const modulus = pow2(ell);
        const q = residue === 0n ? modulus : residue;
        wordData(r, spikeTimes, q);
        leaves += 1;
        return;
      }

      const ordinaryA = 3n * A;
      const ordinaryB = 3n * B;
      const ordinaryEll = ell + 1;
      const ordinaryResidue =
        extendResidue(ordinaryA, ordinaryB, ell, residue, 1);
      visit(t + 1, ordinaryA, ordinaryB, ordinaryEll,
        ordinaryResidue, spikeTimes);

      if (b[t] === 1) {
        const spikeA = 3n * A;
        const spikeB = 3n * B + pow2(ell);
        const spikeEll = ell + 2;
        const spikeResidue =
          extendResidue(spikeA, spikeB, ell, residue, 2);
        spikeTimes.push(t);
        visit(t + 1, spikeA, spikeB, spikeEll, spikeResidue, spikeTimes);
        spikeTimes.pop();
      }
    }

    visit(1, 1n, 0n, 0, 0n, []);
  }
  return {maxR, leaves};
}

function signAudit(maxR) {
  let nodes = 0;
  let lowCylinders = 0;
  let strictLowCylinders = 0;
  let positive = 0;
  let zero = 0;
  let negative = 0;
  let firstNegative = null;

  for (let r = 3; r <= maxR; r += 1) {
    const {N, e, b} = parameters(r);
    const L = r - 1;

    function visit(t, A, B, ell, residue, spikes, spikeTimes) {
      nodes += 1;
      if (spikes > e - 2) return;
      const modulus = pow2(ell);
      const leastPositive = residue === 0n ? modulus : residue;
      const largestPossibleLimit = pow2(e - 2 - spikes);
      if (leastPositive > largestPossibleLimit) return;

      if (t === L + 1) {
        const U = e - 1 - spikes;
        const limit = pow2(U - 1);
        if (leastPositive > limit) return;
        lowCylinders += 1;
        const row = wordData(r, spikeTimes, leastPositive);
        const strictLeast = row.states.slice(1).every((z) => z > leastPositive);
        if (!strictLeast) return;
        strictLowCylinders += 1;
        if (row.defect > 0n) positive += 1;
        if (row.defect === 0n) zero += 1;
        if (row.defect < 0n) {
          negative += 1;
          if (firstNegative === null) {
            firstNegative = {
              r,
              q: leastPositive.toString(),
              U,
              spikes: spikeTimes.slice(),
              defect: row.defect.toString(),
            };
          }
        }
        return;
      }

      // Ordinary branch.
      {
        const nextA = 3n * A;
        const nextB = 3n * B;
        const nextEll = ell + 1;
        const nextResidue = extendResidue(nextA, nextB, ell, residue, 1);
        visit(t + 1, nextA, nextB, nextEll, nextResidue, spikes, spikeTimes);
      }

      // Spike branch at an anchored one site.
      if (b[t] === 1 && spikes < e - 1) {
        const nextA = 3n * A;
        const nextB = 3n * B + pow2(ell);
        const nextEll = ell + 2;
        const nextResidue = extendResidue(nextA, nextB, ell, residue, 2);
        spikeTimes.push(t);
        visit(t + 1, nextA, nextB, nextEll, nextResidue, spikes + 1, spikeTimes);
        spikeTimes.pop();
      }
    }

    visit(1, 1n, 0n, 0, 0n, 0, []);
  }

  return {maxR, nodes, lowCylinders, strictLowCylinders,
    positive, zero, negative, firstNegative};
}

const q14 = q14Audit();
const allOmission = allOmissionAudit();
const identities = identityAudit(18);
const maxR = Number(process.argv[2] || 84);
const sign = signAudit(maxR);

console.log(`Q14: ${JSON.stringify({
  r: q14.r,
  U: q14.U,
  V: q14.V,
  endpoint: q14.z.toString(),
  defect: q14.defect.toString(),
  M: q14.M.toString(),
  D: q14.D.toString(),
  K: q14.K.toString(),
})}`);
console.log(`all omission: ${JSON.stringify({
  r: allOmission.r,
  N: allOmission.N,
  U: allOmission.U,
  V: allOmission.V,
  Q: `${allOmission.qNumerator}/${allOmission.qDenominator}`,
  D: allOmission.D.toString(),
  K: allOmission.K.toString(),
})}`);
console.log(`identity audit: ${JSON.stringify(identities)}`);
console.log(`finite sign audit: ${JSON.stringify(sign)}`);
console.log("scope: exact identities and finite cylinder audit only; no all-depth proof");
