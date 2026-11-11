#!/usr/bin/env node
"use strict";

/*
Exact falsification probe for the integral coefficient recurrence

    (2 theta^(N-r) - 3) U(theta) = H(theta),   theta^r = 2.

In the coprime binary deformation model, H is an endpoint polynomial with
coefficients in {-1,0,1}.  If U=sum u_k theta^k has integral coefficients,
then, in the cyclic order k -> k+(N-r), its coefficients obey

    u_new = (w u_old - h_new)/3,    w in {2,4}.

Except for the endpoint which reduces X^r to 2, h_new is the unique balanced
ternary remainder of w u_old.  Thus ideal divisibility by the full determinant
becomes a periodic orbit problem for the two maps nearest(2u/3) and
nearest(4u/3).  The program enumerates every possible periodic coefficient
orbit inside a rigorous error bound and tests whether its forcing word is a
valid binary endpoint polynomial.  Finite output is evidence, not an
all-depth proof.
*/

const maxR = Number(process.argv[2] || 80);
const searchCap = BigInt(process.argv[3] || 5000000);

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function abs(x) { return x < 0n ? -x : x; }

function gcd(a, b) {
  a = abs(a);
  b = abs(b);
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

function bitLength(x) {
  assert(x > 0n, "bit length requires a positive integer");
  return x.toString(2).length;
}

function balancedRemainder(x) {
  const residue = Number(((x % 3n) + 3n) % 3n);
  if (residue === 0) return 0;
  if (residue === 1) return 1;
  return -1;
}

function isPrimitive(word) {
  const r = word.length;
  for (let d = 1; d < r; ++d) {
    if (r % d !== 0) continue;
    let repeats = true;
    for (let i = d; i < r; ++i) {
      if (word[i] !== word[i % d]) {
        repeats = false;
        break;
      }
    }
    if (repeats) return false;
  }
  return true;
}

function strictSuffixRecord(word, N) {
  const r = word.length;
  let prefix = 0;
  for (let i = 0; i < r; ++i) {
    if ((1n << BigInt(N - prefix)) <= 3n ** BigInt(r - i)) return false;
    prefix += word[i];
  }
  return prefix === N;
}

function multiplyDelta(u, e) {
  const r = u.length;
  const h = Array(r).fill(0n);
  for (let k = 0; k < r; ++k) {
    const predecessor = (k - e + r) % r;
    const weight = k >= e ? 2n : 4n;
    h[k] = weight * u[predecessor] - 3n * u[k];
  }
  return h;
}

function centeredOrbit(initial, r, e) {
  const u = Array(r).fill(null);
  const h = Array(r).fill(null);
  u[0] = initial;
  let oldIndex = 0;
  let value = initial;
  for (let step = 0; step < r; ++step) {
    const raw = oldIndex + e;
    const nextIndex = raw % r;
    const weight = raw < r ? 2n : 4n;
    const digit = balancedRemainder(weight * value);
    const next = (weight * value - BigInt(digit)) / 3n;
    h[nextIndex] = BigInt(digit);
    if (nextIndex !== 0) u[nextIndex] = next;
    value = next;
    oldIndex = nextIndex;
  }
  assert(oldIndex === 0, "coefficient order did not close");
  if (value !== initial) return null;
  assert(u.every(x => x !== null), "coefficient orbit left a gap");
  const check = multiplyDelta(u, e);
  assert(check.every((x, i) => x === h[i]),
    "coefficient multiplication regression failed");
  return {u, h};
}

function terminalWrapOrbit(initial, r, e) {
  // This is the c_*=r-1 endpoint.  Its unreduced terminal -X^r changes
  // h_0 from -1 to -3 after using X^r=2.  All other digits remain balanced.
  const u = Array(r).fill(null);
  const h = Array(r).fill(null);
  u[0] = initial;
  let oldIndex = 0;
  let value = initial;
  for (let step = 0; step < r; ++step) {
    const raw = oldIndex + e;
    const nextIndex = raw % r;
    const weight = raw < r ? 2n : 4n;
    let digit;
    if (nextIndex === 0) {
      digit = -3;
      if ((weight * value - BigInt(digit)) % 3n !== 0n) return null;
    } else {
      digit = balancedRemainder(weight * value);
    }
    const next = (weight * value - BigInt(digit)) / 3n;
    h[nextIndex] = BigInt(digit);
    if (nextIndex !== 0) u[nextIndex] = next;
    value = next;
    oldIndex = nextIndex;
  }
  if (value !== initial) return null;
  assert(u.every(x => x !== null), "wrapped coefficient orbit left a gap");
  const check = multiplyDelta(u, e);
  assert(check.every((x, i) => x === h[i]),
    "wrapped coefficient multiplication regression failed");
  return {u, h};
}

function endpointSupport(hReduced, wrapped) {
  const r = hReduced.length;
  let original;
  if (wrapped) {
    assert(hReduced[0] === -3n, "wrong reduced wrapped endpoint");
    original = [-1n].concat(hReduced.slice(1), [-1n]);
  } else {
    original = hReduced.slice();
  }

  if (original[0] !== -1n) return null;
  let prefix = 0n;
  for (const digit of original) {
    if (digit < -1n || digit > 1n) return null;
    prefix += digit;
    if (prefix !== 0n && prefix !== -1n) return null;
  }
  if (prefix !== -1n) return null;

  let lastNonzero = -1;
  for (let k = 0; k < original.length; ++k) {
    if (original[k] !== 0n) lastNonzero = k;
  }
  if (lastNonzero < 1 || original[lastNonzero] !== -1n) return null;
  const cStar = lastNonzero - 1;
  if (wrapped && cStar !== r - 1) return null;
  if (!wrapped && cStar >= r - 1) return null;

  const support = [];
  prefix = 0n;
  for (let d = 0; d <= cStar; ++d) {
    prefix += original[d];
    const s = -prefix;
    if (s === 1n) support.push(cStar - d);
    else if (s !== 0n) return null;
  }
  support.sort((a, b) => a - b);
  if (support.length === 0 || support[support.length - 1] !== cStar) {
    return null;
  }
  if (support[0] === 0) return null;
  return {cStar, support, original};
}

function deformationFromSupport(r, N, support) {
  const selected = new Set(support);
  const heights = Array(r).fill(0);
  for (let j = 0; j < r; ++j) {
    const c = (j * N) % r;
    heights[j] = selected.has(c) ? 1 : 0;
  }
  const word = [];
  for (let j = 0; j < r; ++j) {
    const baselineGap = Math.floor((j + 1) * N / r) -
      Math.floor(j * N / r);
    const a = baselineGap + heights[j] - heights[(j + 1) % r];
    if (a <= 0) return null;
    word.push(a);
  }
  if (!strictSuffixRecord(word, N)) return null;
  return {word, heights, primitive: isPrimitive(word)};
}

function errorBound(r, e, wrapped) {
  let index = 0;
  let bound = 0n;
  let power3 = 1n;
  for (let step = 0; step < r; ++step) {
    const raw = index + e;
    const next = raw % r;
    const weight = raw < r ? 2n : 4n;
    const digitBound = wrapped && next === 0 ? 3n : 1n;
    bound = weight * bound + digitBound * power3;
    power3 *= 3n;
    index = next;
  }
  assert(index === 0, "error-bound order did not close");
  return bound;
}

let rowsChecked = 0;
let coefficientSeedsChecked = 0n;
let centeredPeriodicOrbits = 0;
let wrappedPeriodicOrbits = 0;
let endpointShapes = 0;
let admissibleEndpointShapes = 0;
let primitiveCandidates = 0;
let cappedRows = 0;
const witnesses = [];
const endpointWitnesses = [];
const rowData = [];
const relaxedByDiscrepancy = new Map();

function updateRelaxed(orbit, r, N, e, initial) {
  if (orbit.h[0] !== -1n) return;
  let prefix = 0n;
  let minimum = 0n;
  let maximum = 0n;
  let nonzero = 0;
  let signChanges = 0;
  let previousSign = 0;
  for (const digit of orbit.h) {
    prefix += digit;
    if (prefix < minimum) minimum = prefix;
    if (prefix > maximum) maximum = prefix;
    if (digit !== 0n) {
      ++nonzero;
      const sign = digit > 0n ? 1 : -1;
      if (previousSign !== 0 && sign !== previousSign) ++signChanges;
      previousSign = sign;
    }
  }
  if (prefix !== -1n) return;
  const discrepancy = Number(maximum - minimum);
  const maxCoefficient = orbit.u.reduce((m, x) => {
    const a = x < 0n ? -x : x;
    return a > m ? a : m;
  }, 0n);
  const row = {
    r, N, e, initial: initial.toString(), discrepancy, nonzero, signChanges,
    maxCoefficient: maxCoefficient.toString(), forcing: orbit.h.join(".")
  };
  const old = relaxedByDiscrepancy.get(discrepancy);
  if (old === undefined || maxCoefficient < BigInt(old.maxCoefficient) ||
      (maxCoefficient === BigInt(old.maxCoefficient) && nonzero > old.nonzero)) {
    relaxedByDiscrepancy.set(discrepancy, row);
  }
}

for (let r = 3; r <= maxR; ++r) {
  const P = 3n ** BigInt(r);
  const N = bitLength(P);
  const e = N - r;
  if (gcd(BigInt(e), BigInt(r)) !== 1n) continue;
  ++rowsChecked;
  const D = (1n << BigInt(N)) - P;
  const centeredBound = errorBound(r, e, false) / D;
  const wrappedBound = errorBound(r, e, true) / D;
  const bound = centeredBound > wrappedBound ? centeredBound : wrappedBound;
  if (bound > searchCap) {
    ++cappedRows;
    rowData.push({r, N, e, D: D.toString(), bound: bound.toString(), capped: true});
    continue;
  }

  let rowCentered = 0;
  let rowWrapped = 0;
  let rowShapes = 0;
  const rowCenteredInitials = [];
  const rowWrappedInitials = [];
  for (let initial = -bound; initial <= bound; ++initial) {
    ++coefficientSeedsChecked;
    const centered = centeredOrbit(initial, r, e);
    if (centered !== null) {
      ++centeredPeriodicOrbits;
      ++rowCentered;
      rowCenteredInitials.push(initial);
      updateRelaxed(centered, r, N, e, initial);
      const endpoint = endpointSupport(centered.h, false);
      if (endpoint !== null) {
        ++endpointShapes;
        ++rowShapes;
        endpointWitnesses.push({
          r, N, e, wrapped: false, initial: initial.toString(),
          support: endpoint.support.join("."),
          coefficients: centered.u.join("."),
          forcing: centered.h.join(".")
        });
        const deformation = deformationFromSupport(r, N, endpoint.support);
        if (deformation !== null) {
          ++admissibleEndpointShapes;
          if (deformation.primitive) ++primitiveCandidates;
          witnesses.push({
            r, N, e, wrapped: false, initial: initial.toString(),
            support: endpoint.support.join("."),
            word: deformation.word.join("."),
            primitive: deformation.primitive,
            coefficients: centered.u.join("."),
            forcing: centered.h.join(".")
          });
        }
      }
    }

    const wrapped = terminalWrapOrbit(initial, r, e);
    if (wrapped !== null) {
      ++wrappedPeriodicOrbits;
      ++rowWrapped;
      rowWrappedInitials.push(initial);
      const endpoint = endpointSupport(wrapped.h, true);
      if (endpoint !== null) {
        ++endpointShapes;
        ++rowShapes;
        endpointWitnesses.push({
          r, N, e, wrapped: true, initial: initial.toString(),
          support: endpoint.support.join("."),
          coefficients: wrapped.u.join("."),
          forcing: wrapped.h.join(".")
        });
        const deformation = deformationFromSupport(r, N, endpoint.support);
        if (deformation !== null) {
          ++admissibleEndpointShapes;
          if (deformation.primitive) ++primitiveCandidates;
          witnesses.push({
            r, N, e, wrapped: true, initial: initial.toString(),
            support: endpoint.support.join("."),
            word: deformation.word.join("."),
            primitive: deformation.primitive,
            coefficients: wrapped.u.join("."),
            forcing: wrapped.h.join(".")
          });
        }
      }
    }
  }
  rowData.push({
    r, N, e, D: D.toString(), bound: bound.toString(), capped: false,
    centeredPeriodic: rowCentered, wrappedPeriodic: rowWrapped,
    endpointShapes: rowShapes,
    centeredInitialRange: rowCenteredInitials.length === 0 ? null :
      [rowCenteredInitials[0].toString(),
        rowCenteredInitials[rowCenteredInitials.length - 1].toString()],
    centeredInitialsContiguous: rowCenteredInitials.every((x, i) =>
      i === 0 || x === rowCenteredInitials[i - 1] + 1n),
    wrappedInitialRange: rowWrappedInitials.length === 0 ? null :
      [rowWrappedInitials[0].toString(),
        rowWrappedInitials[rowWrappedInitials.length - 1].toString()]
  });
}

console.log(JSON.stringify({
  target: "balanced coefficient recurrence",
  maxR,
  searchCap: searchCap.toString(),
  rowsChecked,
  cappedRows,
  coefficientSeedsChecked: coefficientSeedsChecked.toString(),
  centeredPeriodicOrbits,
  wrappedPeriodicOrbits,
  endpointShapes,
  admissibleEndpointShapes,
  primitiveCandidates,
  endpointWitnesses,
  relaxedByDiscrepancy: [...relaxedByDiscrepancy.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([discrepancy, row]) => ({discrepancy, ...row})),
  witnesses,
  rowData,
  warning: "finite evidence only"
}, null, 2));
