#!/usr/bin/env node
"use strict";

// Exact certificate for the all-depth exclusion of b=1 profiles whose
// deformation support has exactly two positions.  The finite part checks
// the complete formal target congruence, including d=0.  The analytic part
// checks the mechanical-interval cutoff and its monotone propagation.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function mod(a, m) {
  const value = a % m;
  return value < 0n ? value + m : value;
}

function inverse(a, m) {
  let oldR = a;
  let r = m;
  let oldS = 1n;
  let s = 0n;
  while (r !== 0n) {
    const q = oldR / r;
    [oldR, r] = [r, oldR - q * r];
    [oldS, s] = [s, oldS - q * s];
  }
  assert(oldR === 1n, "inverse does not exist");
  return mod(oldS, m);
}

function bitLength(n) {
  return n.toString(2).length;
}

function anchoringRegression(maxS) {
  let power = 1n;
  const B = [0];
  for (let i = 1; i < maxS; ++i) {
    power *= 3n;
    B.push(bitLength(power) - 1);
  }

  for (let s = 3; s <= maxS; ++s) {
    const brute = new Set();
    for (let J = 1; J <= s - 3; ++J) {
      for (let K = J + 1; K <= s - 2; ++K) {
        for (let hJ = 1; hJ <= B[J]; ++hJ) {
          for (let hK = 1; hK <= B[K]; ++hK) {
            let previous = 0;
            let valid = true;
            for (let i = 1; i <= s - 1; ++i) {
              let value = B[i];
              if (i === J) value -= hJ;
              if (i === K) value -= hK;
              if (value <= previous) {
                valid = false;
                break;
              }
              previous = value;
            }
            if (valid) brute.add(`${J},${K},${hJ},${hK}`);
          }
        }
      }
    }

    const classified = new Set();
    for (let J = 1; J <= s - 3; ++J) {
      if (B[J] - B[J - 1] !== 2) continue;
      const adjacentK = J + 1;
      const gap = B[adjacentK] - B[J];
      for (let hK = 1; hK <= gap; ++hK) {
        classified.add(`${J},${adjacentK},1,${hK}`);
      }
      for (let K = J + 2; K <= s - 2; ++K) {
        if (B[K] - B[K - 1] === 2) {
          classified.add(`${J},${K},1,1`);
        }
      }
    }

    assert(brute.size === classified.size,
      `anchoring count mismatch at s=${s}`);
    for (const key of brute) {
      assert(classified.has(key), `anchoring omission at s=${s}: ${key}`);
    }

    let directC0 = 0n;
    for (let i = 0; i <= s - 1; ++i) {
      directC0 += (1n << BigInt(B[i])) * 3n ** BigInt(s - 1 - i);
    }
    for (const key of classified) {
      const [J, K, hJ, hK] = key.split(",").map(Number);
      let directC = 0n;
      for (let i = 0; i <= s - 1; ++i) {
        let height = 0;
        if (i === J) height = hJ;
        if (i === K) height = hK;
        directC += (1n << BigInt(B[i] - height)) *
          3n ** BigInt(s - 1 - i);
      }
      const decrementJ = (1n << BigInt(B[J] - 1)) *
        3n ** BigInt(s - 1 - J);
      const decrementK = ((1n << BigInt(B[K])) -
        (1n << BigInt(B[K] - hK))) * 3n ** BigInt(s - 1 - K);
      assert(directC === directC0 - decrementJ - decrementK,
        `carry decomposition mismatch at s=${s}: ${key}`);
    }
  }
}

function analyticCutoff() {
  const start = 948n;
  const constant = 256n * 307n ** 6n;

  // A two-support target would imply
  // 2^s < 256 * 307^6 * s^90.
  assert(2n ** start > constant * start ** 90n,
    "analytic cutoff base failed");
  assert(2n ** (start - 1n) <= constant * (start - 1n) ** 90n,
    "analytic cutoff split changed");

  // The quotient 2*s^90/(s+1)^90 increases to two, so this base
  // inequality propagates the strict reverse inequality.
  assert(2n * start ** 90n > (start + 1n) ** 90n,
    "analytic cutoff propagation failed");
  return {start, constant};
}

function finiteResidues(maxS) {
  let P = 1n;
  let previousN = 0;
  let C0 = 0n;
  const B = [0];
  const powers3 = [1n];
  let q2Weights = 0;
  let profiles = 0;
  let adjacentProfiles = 0;
  let separatedProfiles = 0;
  let heightTwoProfiles = 0;
  let strictFormalHits = 0;
  let equalityFormalHits = 0;

  for (let s = 1; s <= maxS; ++s) {
    const nextB = bitLength(P) - 1;
    if (s - 1 >= B.length) B.push(nextB);
    C0 = 3n * C0 + (1n << BigInt(nextB));
    P *= 3n;
    powers3.push(P);
    const N = bitLength(P);
    const increment = N - previousN;
    previousN = N;
    if (increment !== 1 || s < 3) continue;

    const e = N - s;
    const terminalDelay = e - 1;
    assert(terminalDelay >= 1, "unexpected empty b=1 delay range");
    assert(B[s - 1] === N - 2, "b=1 endpoint identity failed");
    ++q2Weights;

    const M = 1n << BigInt(N);
    const D = M - P;
    const invM = inverse(M, D);
    const tau0 = mod(C0 * invM, D);
    const dMax = BigInt(Math.floor((terminalDelay + 1) / 2));
    assert(dMax < D, "target interval is not shorter than determinant");

    const unit = Array(s).fill(null);
    for (let i = 1; i <= s - 2; ++i) {
      const decrement = (1n << BigInt(B[i] - 1)) *
        powers3[s - 1 - i];
      unit[i] = {
        decrement,
        residue: mod(decrement * invM, D)
      };
    }

    function test(J, K, hK, adjacent) {
      ++profiles;
      if (adjacent) ++adjacentProfiles;
      else ++separatedProfiles;

      let residueK = unit[K].residue;
      if (hK === 2) {
        ++heightTwoProfiles;
        const decrementK = unit[K].decrement +
          (1n << BigInt(B[K] - 2)) * powers3[s - 1 - K];
        residueK = mod(decrementK * invM, D);
      }

      let tau = tau0 - unit[J].residue - residueK;
      if (tau < 0n) tau += D;
      if (tau < 0n) tau += D;
      assert(tau >= 0n && tau < D, "residue normalization failed");
      if (tau === 0n) ++equalityFormalHits;
      if (tau >= 1n && tau <= dMax) ++strictFormalHits;
    }

    for (let J = 1; J <= s - 3; ++J) {
      // The first support cell has height one and requires a preceding
      // maximal gap of two.
      if (B[J] - B[J - 1] !== 2) continue;

      const K = J + 1;
      const gap = B[K] - B[J];
      assert(gap === 1 || gap === 2, "nonbinary maximal gap");
      for (let hK = 1; hK <= gap; ++hK) {
        test(J, K, hK, true);
      }

      // Once one maximal position separates the support cells, the second
      // cell is isolated on the left and is again a unit transposition.
      for (let separatedK = J + 2; separatedK <= s - 2;
          ++separatedK) {
        if (B[separatedK] - B[separatedK - 1] !== 2) continue;
        test(J, separatedK, 1, false);
      }
    }
  }

  assert(q2Weights === 393, "q=2 weight coverage changed");
  assert(profiles === 20063657, "two-support profile coverage changed");
  assert(heightTwoProfiles === 31342,
    "height-two profile coverage changed");
  assert(strictFormalHits === 0, "strict formal target hit");
  assert(equalityFormalHits === 0, "equality formal target hit");

  return {q2Weights, profiles, adjacentProfiles, separatedProfiles,
    heightTwoProfiles, strictFormalHits, equalityFormalHits};
}

function main() {
  anchoringRegression(25);
  const cutoff = analyticCutoff();
  const finite = finiteResidues(Number(cutoff.start - 1n));
  console.log(`finite_max_s=${cutoff.start - 1n}`);
  console.log(`finite_q2_weights=${finite.q2Weights}`);
  console.log(`anchored_two_support_profiles=${finite.profiles}`);
  console.log(`adjacent_profiles=${finite.adjacentProfiles}`);
  console.log(`separated_profiles=${finite.separatedProfiles}`);
  console.log(`height_two_profiles=${finite.heightTwoProfiles}`);
  console.log(`strict_formal_hits=${finite.strictFormalHits}`);
  console.log(`equality_formal_hits=${finite.equalityFormalHits}`);
  console.log(`analytic_start=${cutoff.start}`);
  console.log("anchoring_regression=true");
  console.log("analytic_base=true");
  console.log("analytic_propagation=true");
  console.log("two_support_profiles_excluded_all_depth=true");
}

main();
