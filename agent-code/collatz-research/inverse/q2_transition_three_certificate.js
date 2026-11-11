#!/usr/bin/env node
"use strict";

// Exact certificate for the all-depth exclusion of the T=3 height-transition
// sector at q=2, b=1.  Every such path has run levels 0,1,2,0.  The analytic
// return bound reduces the finite residue audit to four bounded mechanical
// runs.  A sorted predecessor query checks all allowed final transition
// positions without a cubic residue loop.

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
  assert(n > 0n, "bit length requires a positive integer");
  return n.toString(2).length;
}

function analyticCutoff() {
  // The four run levels are 0,1,2,0.  Squaring the product of their
  // level-sensitive return bounds gives
  //   2^s < 2^14 * 307^8 * s^120.
  const start = 1325n;
  const constant = 2n ** 14n * 307n ** 8n;
  assert(2n ** start > constant * start ** 120n,
    "analytic cutoff base failed");
  assert(2n ** (start - 1n) <= constant * (start - 1n) ** 120n,
    "analytic cutoff split changed");
  assert(2n * start ** 120n > (start + 1n) ** 120n,
    "analytic cutoff propagation failed");
  return {start, constant};
}

function maximumRunEdges(level, weight) {
  // This is the exact largest m satisfying
  //   2^floor(m/2) < 2^level * 307 * weight^15.
  const bound = (1n << BigInt(level)) * 307n * BigInt(weight) ** 15n;
  const largestExponent = bitLength(bound - 1n) - 1;
  const result = 2 * largestExponent + 1;
  assert((1n << BigInt(Math.floor(result / 2))) < bound,
    "included run edge violates return bound");
  assert((1n << BigInt(Math.floor((result + 1) / 2))) >= bound,
    "run edge maximum is not sharp");
  return result;
}

function transitionRegression(maxWeight) {
  let power = 1n;
  const B = [0];
  for (let i = 1; i < maxWeight; ++i) {
    power *= 3n;
    B.push(bitLength(power) - 1);
  }

  let bruteProfiles = 0;
  let classifiedProfiles = 0;

  for (let weight = 4; weight <= maxWeight; ++weight) {
    const brute = new Set();
    const height = [0];

    function inspect() {
      let transitions = 0;
      for (let i = 0; i <= weight - 2; ++i) {
        if (height[i + 1] !== height[i]) ++transitions;
      }
      if (transitions !== 3) return;

      let J = 1;
      while (J <= weight - 2 && height[J] === 0) ++J;
      let L = J;
      while (L <= weight - 2 && height[L] === 1) ++L;
      let K = L;
      while (K <= weight - 2 && height[K] === 2) ++K;
      --K;

      assert(2 <= J && J < L && L <= K && K <= weight - 2,
        `bad T=3 transition indices at weight ${weight}`);
      for (let i = 0; i < J; ++i) {
        assert(height[i] === 0, `bad initial level at weight ${weight}`);
      }
      for (let i = J; i < L; ++i) {
        assert(height[i] === 1, `bad height-one run at weight ${weight}`);
      }
      for (let i = L; i <= K; ++i) {
        assert(height[i] === 2, `bad height-two run at weight ${weight}`);
      }
      for (let i = K + 1; i <= weight - 1; ++i) {
        assert(height[i] === 0, `bad final level at weight ${weight}`);
      }
      brute.add(`${J},${L},${K}`);
    }

    function extend(i) {
      if (i === weight - 2) {
        const gap = B[weight - 1] - B[weight - 2];
        if (height[i] + gap - 1 >= 0) {
          height.push(0);
          inspect();
          height.pop();
        }
        return;
      }
      const gap = B[i + 1] - B[i];
      const maximum = height[i] + gap - 1;
      for (let next = 0; next <= maximum; ++next) {
        height.push(next);
        extend(i + 1);
        height.pop();
      }
    }

    extend(0);

    const classified = new Set();
    for (let J = 2; J <= weight - 3; ++J) {
      if (B[J] - B[J - 1] !== 2) continue;
      for (let L = J + 1; L <= weight - 2; ++L) {
        if (B[L] - B[L - 1] !== 2) continue;
        for (let K = L; K <= weight - 2; ++K) {
          classified.add(`${J},${L},${K}`);
        }
      }
    }

    assert(brute.size === classified.size,
      `T=3 classification count mismatch at weight ${weight}`);
    for (const key of brute) {
      assert(classified.has(key),
        `T=3 classification omission at weight ${weight}: ${key}`);
    }
    bruteProfiles += brute.size;
    classifiedProfiles += classified.size;

    let directC0 = 0n;
    for (let i = 0; i <= weight - 1; ++i) {
      directC0 += (1n << BigInt(B[i])) *
        3n ** BigInt(weight - 1 - i);
    }
    for (const key of classified) {
      const [J, L, K] = key.split(",").map(Number);
      let directC = 0n;
      let directLoss = 0n;
      for (let i = 0; i <= weight - 1; ++i) {
        const h = i >= J && i < L ? 1 : i >= L && i <= K ? 2 : 0;
        directC += (1n << BigInt(B[i] - h)) *
          3n ** BigInt(weight - 1 - i);
        if (h >= 1) {
          directLoss += (1n << BigInt(B[i] - 1)) *
            3n ** BigInt(weight - 1 - i);
        }
        if (h >= 2) {
          directLoss += (1n << BigInt(B[i] - 2)) *
            3n ** BigInt(weight - 1 - i);
        }
      }
      assert(directC === directC0 - directLoss,
        `T=3 carry mismatch at weight ${weight}: ${key}`);
    }
  }

  assert(bruteProfiles === classifiedProfiles,
    "aggregate transition regression mismatch");
  return {weights: maxWeight - 3, profiles: classifiedProfiles};
}

function lowerBound(sorted, target) {
  let lo = 0;
  let hi = sorted.length;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (sorted[mid].residue < target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

function findInClosedInterval(sorted, lo, hi) {
  if (lo > hi || sorted.length === 0) return null;
  const position = lowerBound(sorted, lo);
  if (position < sorted.length && sorted[position].residue <= hi) {
    return sorted[position];
  }
  return null;
}

function findCircularPredecessor(sorted, endpoint, width, modulus) {
  assert(0n <= endpoint && endpoint < modulus, "bad circular endpoint");
  assert(0n <= width && width < modulus, "bad circular width");
  const left = endpoint - width;
  if (left >= 0n) {
    return findInClosedInterval(sorted, left, endpoint);
  }
  return findInClosedInterval(sorted, 0n, endpoint) ||
    findInClosedInterval(sorted, modulus + left, modulus - 1n);
}

function circularQueryRegression() {
  let queries = 0;
  for (let modulusNumber = 2; modulusNumber <= 43; ++modulusNumber) {
    const modulus = BigInt(modulusNumber);
    for (let pattern = 0; pattern < 7; ++pattern) {
      const sorted = [];
      for (let residue = 0; residue < modulusNumber; ++residue) {
        if ((residue * residue + (pattern + 1) * residue + 3 * pattern) % 11 < 5) {
          sorted.push({residue: BigInt(residue), K: residue});
        }
      }
      for (let endpointNumber = 0;
        endpointNumber < modulusNumber; ++endpointNumber) {
        for (let widthNumber = 0; widthNumber < modulusNumber;
          ++widthNumber) {
          const endpoint = BigInt(endpointNumber);
          const width = BigInt(widthNumber);
          const fast = findCircularPredecessor(
            sorted, endpoint, width, modulus) !== null;
          const brute = sorted.some(item =>
            mod(endpoint - item.residue, modulus) <= width);
          assert(fast === brute,
            `circular query mismatch modulo ${modulusNumber}`);
          ++queries;
        }
      }
    }
  }
  return queries;
}

function finiteResidues(maxWeight) {
  const powers3 = [1n];
  const B = [0];
  for (let i = 1; i <= maxWeight; ++i) {
    powers3.push(powers3[i - 1] * 3n);
    B.push(bitLength(powers3[i]) - 1);
  }

  let P = 1n;
  let previousN = 0;
  let C0 = 0n;
  let q2Weights = 0;
  let classifiedProfiles = 0;
  let returnAdmissibleProfiles = 0;
  let residuePairQueries = 0;
  let candidateKEntries = 0;
  let strictFormalHits = 0;
  let equalityFormalHits = 0;
  let firstFormalHit = null;

  for (let weight = 1; weight <= maxWeight; ++weight) {
    const nextB = B[weight - 1];
    C0 = 3n * C0 + (1n << BigInt(nextB));
    P *= 3n;
    assert(P === powers3[weight], "power recurrence changed");
    const N = bitLength(P);
    const increment = N - previousN;
    previousN = N;
    if (increment !== 1 || weight < 4) continue;
    ++q2Weights;

    assert(B[weight - 1] === N - 2,
      `b=1 endpoint identity failed at weight ${weight}`);
    const terminalDelay = N - weight - 1;
    assert(terminalDelay >= 1,
      `unexpected empty b=1 delay range at weight ${weight}`);
    const dMax = BigInt(Math.floor((terminalDelay + 1) / 2));
    const M = 1n << BigInt(N);
    const D = M - P;
    assert(dMax < D, `target interval too long at weight ${weight}`);
    const invM = inverse(M, D);
    const tau0 = mod(C0 * invM, D);

    const prefixE = Array(weight).fill(0n);
    const prefixF = Array(weight).fill(0n);
    for (let i = 1; i <= weight - 2; ++i) {
      const E = (1n << BigInt(B[i] - 1)) * powers3[weight - 1 - i];
      prefixE[i] = mod(prefixE[i - 1] + mod(E * invM, D), D);
      let FResidue = 0n;
      if (i >= 2) {
        const F = (1n << BigInt(B[i] - 2)) * powers3[weight - 1 - i];
        FResidue = mod(F * invM, D);
      }
      prefixF[i] = mod(prefixF[i - 1] + FResidue, D);
    }

    const r0 = maximumRunEdges(0, weight);
    const r1 = maximumRunEdges(1, weight);
    const r2 = maximumRunEdges(2, weight);

    // Count the complete classified sector before using the return lemma.
    for (let J = 2; J <= weight - 3; ++J) {
      if (B[J] - B[J - 1] !== 2) continue;
      for (let L = J + 1; L <= weight - 2; ++L) {
        if (B[L] - B[L - 1] !== 2) continue;
        classifiedProfiles += weight - 1 - L;
      }
    }

    // For fixed L, the allowed K interval depends only on L.  Sort its
    // residues once.  Every admissible J then becomes one circular interval
    // query of width dMax, exactly equivalent to testing all those K.
    for (let L = 3; L <= weight - 2; ++L) {
      if (B[L] - B[L - 1] !== 2) continue;

      const kMin = Math.max(L, weight - r0 - 2);
      const kMax = Math.min(weight - 2, L + r2);
      if (kMin > kMax) continue;

      const jMin = Math.max(2, L - r1 - 1);
      const jMax = Math.min(L - 1, r0 + 1);
      if (jMin > jMax) continue;

      const admissibleJ = [];
      for (let J = jMin; J <= jMax; ++J) {
        if (B[J] - B[J - 1] === 2) admissibleJ.push(J);
      }
      if (admissibleJ.length === 0) continue;

      const candidates = [];
      for (let K = kMin; K <= kMax; ++K) {
        candidates.push({
          residue: mod(prefixE[K] + prefixF[K], D),
          K
        });
      }
      candidates.sort((a, b) => a.residue < b.residue ? -1 :
        a.residue > b.residue ? 1 : a.K - b.K);
      candidateKEntries += candidates.length;

      returnAdmissibleProfiles += admissibleJ.length * candidates.length;
      residuePairQueries += admissibleJ.length;

      for (const J of admissibleJ) {
        const endpoint = mod(tau0 + prefixE[J - 1] + prefixF[L - 1], D);
        const hit = findCircularPredecessor(candidates, endpoint, dMax, D);
        if (hit === null) continue;

        const tau = mod(endpoint - hit.residue, D);
        assert(tau <= dMax, "residue interval query returned a false hit");
        if (tau === 0n) ++equalityFormalHits;
        else ++strictFormalHits;
        if (firstFormalHit === null) {
          const lossResidue = mod(
            prefixE[hit.K] - prefixE[J - 1] +
            prefixF[hit.K] - prefixF[L - 1], D);
          firstFormalHit = {weight, N, J, L, K: hit.K,
            d: tau.toString(), dMax: dMax.toString(),
            tau0: tau0.toString(), lossResidue: lossResidue.toString(),
            D: D.toString()};
        }
      }
    }
  }

  assert(q2Weights === 548, "q=2 finite weight coverage changed");
  assert(classifiedProfiles === 18033915158,
    "complete T=3 profile coverage changed");
  assert(returnAdmissibleProfiles === 1241473870,
    "return-admissible T=3 profile coverage changed");
  assert(residuePairQueries === 8300712,
    "T=3 residue pair coverage changed");
  assert(candidateKEntries === 14255754,
    "T=3 final-run residue coverage changed");
  assert(strictFormalHits === 0, `strict formal T=3 target hit: ${
    JSON.stringify(firstFormalHit)}`);
  assert(equalityFormalHits === 0, `equality formal T=3 target hit: ${
    JSON.stringify(firstFormalHit)}`);

  return {q2Weights, classifiedProfiles, returnAdmissibleProfiles,
    residuePairQueries, candidateKEntries, strictFormalHits,
    equalityFormalHits};
}

function main() {
  const cutoff = analyticCutoff();
  const regression = transitionRegression(12);
  const circularQueries = circularQueryRegression();
  const finite = finiteResidues(Number(cutoff.start - 1n));
  console.log(`finite_max_s=${cutoff.start - 1n}`);
  console.log(`finite_q2_weights=${finite.q2Weights}`);
  console.log(`classified_T3_profiles=${finite.classifiedProfiles}`);
  console.log(`return_admissible_T3_profiles=${
    finite.returnAdmissibleProfiles}`);
  console.log(`residue_pair_queries=${finite.residuePairQueries}`);
  console.log(`candidate_K_entries=${finite.candidateKEntries}`);
  console.log(`strict_formal_hits=${finite.strictFormalHits}`);
  console.log(`equality_formal_hits=${finite.equalityFormalHits}`);
  console.log(`analytic_start=${cutoff.start}`);
  console.log(`regression_weights=${regression.weights}`);
  console.log(`regression_profiles=${regression.profiles}`);
  console.log(`circular_query_regression_cases=${circularQueries}`);
  console.log("transition_regression=true");
  console.log("carry_regression=true");
  console.log("circular_query_regression=true");
  console.log("analytic_base=true");
  console.log("analytic_propagation=true");
  console.log("transition_three_profiles_excluded_all_depth=true");
}

main();
