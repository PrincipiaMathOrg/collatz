#!/usr/bin/env node
"use strict";

/*
Exact structure probe for OPEN-CYCLE-WIND-01.

This enumerates anchored strict-record one-strip words and tests candidate
inequalities that could strengthen the positive-winding certificate.  The
output is finite evidence only.  A failed candidate is reported with its
first exact witness so that it cannot be used silently in a proof.
*/

const maxR = Number(process.argv[2] || 14);
const alpha = Math.log2(3);

function abs(a) { return a < 0n ? -a : a; }
function mod(a, m) { a %= m; return a < 0n ? a + m : a; }
function gcd(a, b) {
  a = abs(a); b = abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}
function egcd(a, b) {
  if (!b) return {g: a, x: 1n, y: 0n};
  const z = egcd(b, a % b);
  return {g: z.g, x: z.y, y: z.x - (a / b) * z.y};
}
function inv(a, m) {
  const z = egcd(mod(a, m), m);
  if (z.g !== 1n) throw new Error("nonunit");
  return mod(z.x, m);
}

function carryFromPositions(pos, r, powers3) {
  let C = 0n;
  for (let i = 0; i < r; ++i) {
    C += powers3[r - 1 - i] * (1n << BigInt(pos[i]));
  }
  return C;
}

function isProperPower(word) {
  for (let d = 1; d < word.length; ++d) {
    if (word.length % d) continue;
    let same = true;
    for (let i = d; i < word.length; ++i) {
      if (word[i] !== word[i % d]) { same = false; break; }
    }
    if (same) return true;
  }
  return false;
}

function wordFromPositions(pos, A) {
  const word = [];
  for (let i = 0; i + 1 < pos.length; ++i) word.push(pos[i + 1] - pos[i]);
  word.push(A - pos[pos.length - 1]);
  return word;
}

function firstStore(slot, witness) {
  return slot === null ? witness : slot;
}

const global = {
  terminalMinimumFailure: null,
  terminalWeakMinimumFailure: null,
  prefixAboveStartFailure: null,
  suffixGapBoundFailure: null,
  deltaAtLeastLastDetFailure: null,
  deltaAtLeastGFailure: null,
  kappaUpperFailure: null,
  oneThirdResidueFailure: null,
  shadowModTauCollision: null,
  shadowModTwoTauCollision: null,
  shadowModThreeTauCollision: null,
  shadowModTauMultiplicityFour: null,
  shadowStartMinimumFailure: null,
  strictCarryResidueCollision: null,
  normalizedNumeratorAtLeastM: null,
  normalizedNumeratorAtLeastMPlusQ: null,
  normalizedNumeratorAtLeastMPlusThreeQ: null,
  nonpositive: null
};

const rows = [];
for (let r = 2; r <= maxR; ++r) {
  const A = Math.ceil(r * alpha - 1e-12);
  const M = 1n << BigInt(A), R = 3n ** BigInt(r), D = M - R;
  const powers3 = [1n];
  for (let j = 1; j <= r; ++j) powers3.push(3n * powers3[j - 1]);
  if (powers3[r] !== R) throw new Error("ternary power table mismatch");
  const invR = inv(R, M);
  const invMModD = inv(M, D);
  const bound = Array(r).fill(0);
  for (let i = 1; i < r; ++i) {
    bound[i] = A - Math.ceil((r - i) * alpha - 1e-12);
  }

  let words = 0, primitive = 0;
  let terminalMinimum = 0, prefixAboveStart = 0;
  let minDelta = null, minKappa = null, maxKappa = null;
  let minTau = null, minThreeTauMinusR = null, minTauWitness = null;
  let minRho = null, minRhoWitness = null;
  let minStartMarginNumerator = null, minStartMarginWitness = null;
  const firstExposureCounts = new Map();
  const carryResidues = new Map();
  let firstPositiveExposureWitness = null;
  let maxKappaOverQNumerator = 0n, maxKappaOverQDenominator = 1n;

  const pos = Array(r).fill(0);
  pos[0] = 0;
  if (r > 1) pos[1] = 1;

  function visit(i) {
    if (i === r) {
      ++words;
      const word = wordFromPositions(pos, A);
      if (isProperPower(word)) return;
      ++primitive;

      const C = carryFromPositions(pos, r, powers3);
      if (global.strictCarryResidueCollision === null) {
        const carryResidue = mod(C, D).toString();
        const prior = carryResidues.get(carryResidue);
        if (prior === undefined) {
          carryResidues.set(carryResidue, word.join("."));
        } else if (prior !== word.join(".")) {
          global.strictCarryResidueCollision = {
            r,
            A,
            D: D.toString(),
            residue: carryResidue,
            firstWord: prior,
            secondWord: word.join(".")
          };
        }
      }
      const rho = mod(-C * invR, M);
      const Z = (R * rho + C) / M;
      const delta = rho - Z;
      const g = gcd(C, D), q = D / g, p = C / g;
      const kappa = (q * rho - p) / M;
      const tau = mod(C * invMModD, D);
      if (tau % g !== 0n) throw new Error("tau is not divisible by gcd(C,D)");
      const reducedResidue = tau / g;
      const reducedLift = (M * reducedResidue - p) / q;
      if ((M * reducedResidue - p) % q !== 0n) {
        throw new Error("reduced lift is not integral");
      }
      if (delta < 0n && reducedLift !== -rho) {
        throw new Error("negative-winding reduced lift mismatch");
      }
      if (delta > 0n && reducedLift !== M - rho) {
        throw new Error("positive-winding reduced lift mismatch");
      }
      const witnessBase = {
        r, A, word: word.join("."), positions: pos.join("."),
        rho: rho.toString(), Z: Z.toString(), delta: delta.toString(),
        D: D.toString(), g: g.toString(), q: q.toString(),
        kappa: kappa.toString()
      };
      if (p >= M) {
        global.normalizedNumeratorAtLeastM = firstStore(
          global.normalizedNumeratorAtLeastM,
          {...witnessBase, C: C.toString(), p: p.toString()}
        );
      }
      if (p >= M + q) {
        global.normalizedNumeratorAtLeastMPlusQ = firstStore(
          global.normalizedNumeratorAtLeastMPlusQ,
          {...witnessBase, C: C.toString(), p: p.toString()}
        );
      }
      if (p >= M + 3n * q) {
        global.normalizedNumeratorAtLeastMPlusThreeQ = firstStore(
          global.normalizedNumeratorAtLeastMPlusThreeQ,
          {...witnessBase, C: C.toString(), p: p.toString()}
        );
      }
      // The next rotated full cylinder gives the first full-modulus
      // exposure.  Audit whether its sign alone controls winding.
      const rotatedPos = pos.slice(1).map(x => x - pos[1]);
      rotatedPos.push(A - pos[1]);
      const rotatedC = carryFromPositions(rotatedPos, r, powers3);
      const rotatedRho = mod(-rotatedC * invR, M);
      const firstExposure = (2n * rotatedRho - 3n * rho - 1n) / M;
      if ((2n * rotatedRho - 3n * rho - 1n) % M) {
        throw new Error("first exposure is not integral");
      }
      const exposureKey = firstExposure.toString();
      firstExposureCounts.set(exposureKey, (firstExposureCounts.get(exposureKey) || 0) + 1);
      if (firstExposure > 0n && firstPositiveExposureWitness === null) {
        firstPositiveExposureWitness = {...witnessBase, firstExposure: exposureKey,
          rotatedRho: rotatedRho.toString()};
      }

      if (delta <= 0n) global.nonpositive = firstStore(global.nonpositive, witnessBase);
      if (delta < g) global.deltaAtLeastGFailure = firstStore(global.deltaAtLeastGFailure, witnessBase);
      if (kappa >= q) global.kappaUpperFailure = firstStore(global.kappaUpperFailure, witnessBase);
      if (3n * tau < BigInt(r)) {
        global.oneThirdResidueFailure = firstStore(global.oneThirdResidueFailure,
          {...witnessBase, tau: tau.toString()});
      }
      if (minDelta === null || delta < minDelta) minDelta = delta;
      if (minRho === null || rho < minRho) {
        minRho = rho;
        minRhoWitness = witnessBase;
      }
      // The target follows from D*rho > r*M/3.  Record the exact
      // numerator 3*D*rho-r*M, which may be negative even though winding
      // is positive; this audits whether the crude carry envelope can close.
      const startMarginNumerator = 3n * D * rho - BigInt(r) * M;
      if (minStartMarginNumerator === null || startMarginNumerator < minStartMarginNumerator) {
        minStartMarginNumerator = startMarginNumerator;
        minStartMarginWitness = witnessBase;
      }
      if (minTau === null || tau < minTau) {
        minTau = tau;
        minTauWitness = witnessBase;
      }
      const threeTauMinusR = 3n * tau - BigInt(r);
      if (minThreeTauMinusR === null || threeTauMinusR < minThreeTauMinusR) {
        minThreeTauMinusR = threeTauMinusR;
      }
      if (minKappa === null || kappa < minKappa) minKappa = kappa;
      if (maxKappa === null || kappa > maxKappa) maxKappa = kappa;
      if (kappa * maxKappaOverQDenominator > maxKappaOverQNumerator * q) {
        maxKappaOverQNumerator = kappa;
        maxKappaOverQDenominator = q;
      }

      const y = [rho];
      for (let j = 0; j < r; ++j) {
        const numerator = 3n * y[j] + 1n;
        const divisor = 1n << BigInt(word[j]);
        if (numerator % divisor) throw new Error("accelerated integrality failure");
        y.push(numerator / divisor);
      }
      if (y[r] !== Z) throw new Error("endpoint mismatch");

      // Absolute paired-shadow identities.  These distinguish the true
      // anchored carry from a common translation of every lattice vertex.
      const shadow = [];
      for (let j = 0; j <= r; ++j) {
        const Hj = powers3[j] *
          (1n << BigInt(A - (j < r ? pos[j] : A)));
        shadow.push(Hj - y[j]);
      }
      const shadowLoss = shadow[0] - shadow[r];
      if (shadowLoss !== D - delta) {
        throw new Error("absolute shadow loss mismatch");
      }
      let signedShadowDefect = 0n;
      for (let j = 0; j < r; ++j) {
        signedShadowDefect +=
          ((1n << BigInt(word[j])) - 3n) * shadow[j + 1];
      }
      if (signedShadowDefect !== 3n * shadowLoss - BigInt(r)) {
        throw new Error("signed shadow defect identity failed");
      }
      if (3n * M * shadowLoss !== 3n * D * shadow[0] + 3n * C) {
        throw new Error("normalized shadow loss identity failed");
      }
      if (delta > 0n && shadowLoss !== tau) {
        throw new Error("positive-winding shadow lift mismatch");
      }
      if (delta === 0n && shadowLoss !== D) {
        throw new Error("zero-winding shadow lift mismatch");
      }
      if (delta < 0n && shadowLoss !== D + tau) {
        throw new Error("negative-winding shadow lift mismatch");
      }

      // Canonical signed-shadow lift.  Its sign is exactly the winding
      // branch, and its endpoint drops by tau under the 3m-1 recurrence.
      const signedNumerator = M * tau - C;
      if (signedNumerator % D !== 0n) {
        throw new Error("signed-shadow lift is not integral");
      }
      const signedStart = signedNumerator / D;
      if (mod(signedStart + rho, M) !== 0n) {
        throw new Error("signed-shadow dyadic class mismatch");
      }
      if (delta > 0n && signedStart !== M - rho) {
        throw new Error("positive signed-shadow lift mismatch");
      }
      if (delta <= 0n && signedStart !== -rho) {
        throw new Error("nonpositive signed-shadow lift mismatch");
      }
      const signedShadow = [signedStart];
      for (let j = 0; j < r; ++j) {
        const numerator = 3n * signedShadow[j] - 1n;
        const divisor = 1n << BigInt(word[j]);
        if (numerator % divisor !== 0n) {
          throw new Error("signed-shadow recurrence is not integral");
        }
        signedShadow.push(numerator / divisor);
      }
      if (signedShadow[r] !== signedStart - tau) {
        throw new Error("signed-shadow endpoint mismatch");
      }
      if (delta > 0n && signedShadow.some((value) => value <= 0n)) {
        throw new Error("positive signed shadow changed sign");
      }
      if (delta <= 0n && signedShadow.some((value) => value >= 0n)) {
        throw new Error("nonpositive signed shadow changed sign");
      }

      // Prefix-coefficient mass in integer scaling: R*S=3*C.  The two
      // endpoint forms of the exact sign margin are checked independently.
      let scaledPrefixMass = 0n;
      for (let j = 0; j < r; ++j) {
        scaledPrefixMass += powers3[r - j] *
          (1n << BigInt(pos[j]));
      }
      if (scaledPrefixMass !== 3n * C) {
        throw new Error("prefix-mass scaling mismatch");
      }
      if (3n * M * delta !== 3n * D * rho - scaledPrefixMass) {
        throw new Error("start prefix-mass identity mismatch");
      }
      if (3n * R * delta !== 3n * D * Z - scaledPrefixMass) {
        throw new Error("endpoint prefix-mass identity mismatch");
      }
      for (let j = 1; j < r; ++j) {
        if (shadow[j] <= shadow[0]) {
          global.shadowStartMinimumFailure = firstStore(
            global.shadowStartMinimumFailure,
            {...witnessBase, index: j, shadow: shadow.map(String)}
          );
          break;
        }
      }

      // On the positive-winding branch, tau=D-delta is the exact drop of
      // the paired 3m-1 path.  Distinct residues modulo c*tau would turn
      // the experimental r<=3*tau bound into a pigeonhole theorem.
      if (tau > 0n && delta > 0n) {
        if (shadow[0] - shadow[r] !== tau) throw new Error("shadow drop/tau mismatch");
        for (const [factor, key] of [[1n, "shadowModTauCollision"], [2n, "shadowModTwoTauCollision"], [3n, "shadowModThreeTauCollision"]]) {
          const modulus = factor * tau;
          const seen = new Map();
          for (let j = 0; j < r; ++j) {
            const residue = mod(shadow[j], modulus).toString();
            if (seen.has(residue)) {
              global[key] = firstStore(global[key], {
                ...witnessBase,
                tau: tau.toString(),
                factor: factor.toString(),
                firstIndex: seen.get(residue),
                secondIndex: j,
                residue,
                shadow: shadow.map(String)
              });
              break;
            }
            seen.set(residue, j);
          }
        }
        const multiplicities = new Map();
        for (let j = 0; j < r; ++j) {
          const residue = mod(shadow[j], tau).toString();
          const indices = multiplicities.get(residue) || [];
          indices.push(j);
          multiplicities.set(residue, indices);
          if (indices.length === 4) {
            global.shadowModTauMultiplicityFour = firstStore(
              global.shadowModTauMultiplicityFour,
              {...witnessBase, tau: tau.toString(), residue, indices: indices.slice(), shadow: shadow.map(String)}
            );
            break;
          }
        }
      }

      let terminalStrict = true, terminalWeak = true, prefixStrict = true;
      for (let j = 0; j < r; ++j) {
        if (!(y[j] > Z)) terminalStrict = false;
        if (!(y[j] >= Z)) terminalWeak = false;
      }
      for (let j = 1; j <= r; ++j) if (!(y[j] > rho)) prefixStrict = false;
      if (terminalStrict) ++terminalMinimum;
      else global.terminalMinimumFailure = firstStore(global.terminalMinimumFailure,
        {...witnessBase, trajectory: y.map(String)});
      if (!terminalWeak) global.terminalWeakMinimumFailure = firstStore(global.terminalWeakMinimumFailure,
        {...witnessBase, trajectory: y.map(String)});
      if (prefixStrict) ++prefixAboveStart;
      else global.prefixAboveStartFailure = firstStore(global.prefixAboveStartFailure,
        {...witnessBase, trajectory: y.map(String)});

      // Test whether the full gap dominates every normalized suffix
      // determinant.  This is deliberately strong and expected to falsify
      // quickly if it is not the missing induction invariant.
      for (let j = 1; j < r; ++j) {
        const suffixDet = (1n << BigInt(A - pos[j])) - powers3[r - j];
        if (delta < suffixDet) {
          global.suffixGapBoundFailure = firstStore(global.suffixGapBoundFailure,
            {...witnessBase, j, suffixDet: suffixDet.toString(), trajectory: y.map(String)});
          break;
        }
      }
      const lastDet = (1n << BigInt(word[r - 1])) - 3n;
      if (delta < lastDet) {
        global.deltaAtLeastLastDetFailure = firstStore(global.deltaAtLeastLastDetFailure,
          {...witnessBase, lastDet: lastDet.toString(), trajectory: y.map(String)});
      }
      return;
    }

    const lo = pos[i - 1] + 1, hi = bound[i];
    for (let v = lo; v <= hi; ++v) {
      pos[i] = v;
      visit(i + 1);
    }
  }

  if (r === 2) {
    const lo = 1, hi = bound[1];
    for (let v = lo; v <= hi; ++v) { pos[1] = v; visit(2); }
  } else {
    visit(2);
  }

  rows.push({
    r, A, D: D.toString(), words, primitive,
    terminalMinimum, prefixAboveStart,
    minDelta: minDelta === null ? null : minDelta.toString(),
    minRho: minRho === null ? null : minRho.toString(),
    minRhoWitness,
    minStartMarginNumerator: minStartMarginNumerator === null ? null : minStartMarginNumerator.toString(),
    minStartMarginWitness,
    minTau: minTau === null ? null : minTau.toString(),
    minThreeTauMinusR: minThreeTauMinusR === null ? null : minThreeTauMinusR.toString(),
    minTauWitness,
    kappaRange: minKappa === null ? null : [minKappa.toString(), maxKappa.toString()],
    maxKappaOverQ: `${maxKappaOverQNumerator}/${maxKappaOverQDenominator}`
    ,firstExposureCounts: Object.fromEntries([...firstExposureCounts.entries()].sort((a,b) => Number(BigInt(a[0])-BigInt(b[0]))))
    ,firstPositiveExposureWitness
  });
}

console.log(JSON.stringify({
  target: "OPEN-CYCLE-WIND-01",
  rows,
  candidates: global,
  warning: "finite candidate audit only"
}, null, 2));
