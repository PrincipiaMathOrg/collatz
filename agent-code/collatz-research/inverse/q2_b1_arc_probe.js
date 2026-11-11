"use strict";

// Targeted test of the cyclic-index arc compression for the b=1
// singleton and two-shift polynomials.  For each named sparse polynomial
// it seeks a monomial shift whose exact integer representative E satisfies
// 0 < |E| < D.  Such a representative would exclude a full determinant
// target.  This is a diagnostic for the nonvanishing/size lemmas, not an
// enumeration proof.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function abs(n) {
  return n < 0n ? -n : n;
}

function gcd(a, b) {
  while (b !== 0) [a, b] = [b, a % b];
  return a;
}

function inverse(a, m) {
  let oldR = a;
  let r = m;
  let oldS = 1;
  let s = 0;
  while (r !== 0) {
    const q = Math.floor(oldR / r);
    [oldR, r] = [r, oldR - q * r];
    [oldS, s] = [s, oldS - q * s];
  }
  assert(oldR === 1, "inverse does not exist");
  return ((oldS % m) + m) % m;
}

function validResidues(residues, s, N) {
  const h = inverse(N % s, s);
  const positions = [];
  for (let i = 0; i < s; ++i) positions.push(Math.floor(i * N / s));
  for (const c of residues) {
    const index = (h * c) % s;
    if (index === 0 || index === s - 1) return false;
    --positions[index];
  }
  if (positions[0] !== 0 || positions[s - 1] !== N - 2) return false;
  let power3 = 1n;
  for (let i = 0; i < s; ++i) {
    if (i > 0 && positions[i] <= positions[i - 1]) return false;
    if ((1n << BigInt(positions[i])) > power3) return false;
    power3 *= 3n;
  }
  return true;
}

function addTerm(map, exponent, coefficient) {
  if (coefficient === 0n) return;
  map.set(exponent, (map.get(exponent) || 0n) + coefficient);
  if (map.get(exponent) === 0n) map.delete(exponent);
}

function singleton(c, d) {
  const terms = new Map();
  addTerm(terms, c + 1, BigInt(6 * d - 1));
  addTerm(terms, c, BigInt(-6 * d));
  addTerm(terms, 1, 1n);
  addTerm(terms, 0, -1n);
  return terms;
}

function twoShift(c1, c2, d) {
  const delta = c2 - c1;
  const terms = new Map();
  addTerm(terms, delta + 1, 1n);
  addTerm(terms, delta, -1n);
  addTerm(terms, 1, 1n);
  addTerm(terms, 0, -1n);
  addTerm(terms, c2 + 1, BigInt(6 * d - 1));
  addTerm(terms, c2, BigInt(-6 * d));
  return terms;
}

function reduceTerms(terms, s) {
  const reduced = new Map();
  for (const [q, coefficient] of terms) {
    const wraps = Math.floor(q / s);
    const r = q - wraps * s;
    addTerm(reduced, r, coefficient * (1n << BigInt(wraps)));
  }
  return reduced;
}

function compressedRepresentatives(terms, s, N) {
  const h = inverse(N % s, s);
  const points = [];
  for (const [q, coefficient] of terms) {
    assert(q >= 0 && q < s, "support exponent was not reduced modulo s");
    points.push({q, coefficient, canonicalJ: (h * q) % s});
  }
  points.sort((a, b) => a.canonicalJ - b.canonicalJ);
  const results = [];
  for (let cut = 0; cut < points.length; ++cut) {
    const first = points[(cut + 1) % points.length];
    const last = points[cut];
    const Jmin = first.canonicalJ;
    const qmin = first.q;
    const data = [];
    let Kmax = 0;
    let Jmax = Jmin;
    for (const point of points) {
      let J = point.canonicalJ;
      if (J < Jmin) J += s;
      const relativeJ = J - Jmin;
      const numerator = N * relativeJ - (point.q - qmin);
      assert(numerator % s === 0, "nonintegral lifted lattice coordinate");
      const K = numerator / s;
      assert(K >= 0, "lattice quotient lost monotonicity");
      data.push({q: point.q, coefficient: point.coefficient, J: relativeJ, K});
      if (K > Kmax) Kmax = K;
      if (relativeJ > Jmax - Jmin) Jmax = Jmin + relativeJ;
    }
    let E = 0n;
    for (const item of data) {
      E += item.coefficient * 3n ** BigInt(item.J) *
        (1n << BigInt(Kmax - item.K));
    }
    const nextJ = first.canonicalJ + (first.canonicalJ <= last.canonicalJ ? s : 0);
    const gap = nextJ - last.canonicalJ;
    results.push({cut, gap, width: Jmax - Jmin, E, data});
  }
  results.sort((a, b) => a.width - b.width || Number(abs(a.E) - abs(b.E)));
  return results;
}

const maxS = Number(process.argv[2] || 160);
assert(Number.isInteger(maxS) && maxS >= 3, "invalid maximum weight");

let P = 1n;
let previousN = 0;
const counts = {
  weights: 0,
  singletonCases: 0,
  twoShiftCases: 0,
  twoShiftBoundaryCases: 0,
  twoShiftBoundaryBadEndpoints: 0,
  singletonZeroAtMinimumWidth: 0,
  twoShiftZeroAtMinimumWidth: 0,
  singletonNoSmallRepresentative: 0,
  twoShiftNoSmallRepresentative: 0
};
const witnesses = {
  singletonZero: null,
  twoShiftZero: null,
  singletonNoSmall: null,
  twoShiftNoSmall: null,
  singletonWorstWidth: null,
  twoShiftWorstWidth: null
};

function record(kind, s, N, D, profile, d, supportBound) {
  const terms = kind === "singleton"
    ? singleton(profile[0], d)
    : twoShift(profile[0], profile[1], d);
  const reps = compressedRepresentatives(reduceTerms(terms, s), s, N);
  const minimumWidth = reps[0].width;
  const minimum = reps.filter(item => item.width === minimumWidth);
  const zeroAtMinimum = minimum.every(item => item.E === 0n);
  const small = reps.find(item => item.E !== 0n && abs(item.E) < D);
  ++counts[`${kind}Cases`];
  if (kind === "twoShift" && profile[1] === s - 1) {
    ++counts.twoShiftBoundaryCases;
    if (witnesses.twoShiftBoundary === undefined) {
      witnesses.twoShiftBoundary = {
        s, N, profile, d,
        terms: [...reduceTerms(terms, s)].map(([q, a]) => [q, a.toString()])
      };
    }
    if (profile[0] > 1 && witnesses.twoShiftBoundaryNonunit === undefined) {
      witnesses.twoShiftBoundaryNonunit = {s, N, profile, d};
    }
    const c2 = profile[1];
    for (const rep of minimum) {
      const ordered = rep.data.slice().sort((a, b) => a.J - b.J);
      if (profile[0] > 1 && ordered[0].q === 0 &&
          ordered[ordered.length - 1].q === c2) {
        ++counts.twoShiftBoundaryBadEndpoints;
        if (witnesses.twoShiftBoundaryBadEndpoints === undefined) {
          witnesses.twoShiftBoundaryBadEndpoints = {
            s, N, profile, d, width: rep.width,
            ordered: ordered.map(item => ({q: item.q, J: item.J, coefficient: item.coefficient.toString()}))
          };
        }
      }
    }
  }
  if (zeroAtMinimum) {
    ++counts[`${kind}ZeroAtMinimumWidth`];
    if (witnesses[`${kind}Zero`] === null) {
      witnesses[`${kind}Zero`] = {s, N, profile, d, minimumWidth};
    }
  }
  if (small === undefined) {
    ++counts[`${kind}NoSmallRepresentative`];
    if (witnesses[`${kind}NoSmall`] === null) {
      witnesses[`${kind}NoSmall`] = {
        s, N, profile, d, D: D.toString(), minimumWidth,
        minimumAbsE: abs(reps[0].E).toString()
      };
    }
  }
  assert(minimumWidth * supportBound <= (supportBound - 1) * s,
    `${kind} arc bound failed`);
  const widthKey = `${kind}WorstWidth`;
  const old = witnesses[widthKey];
  if (old === null || minimumWidth * old.s > old.width * s) {
    witnesses[widthKey] = {s, N, profile, d, width: minimumWidth};
  }
}

for (let s = 1; s <= maxS; ++s) {
  P *= 3n;
  const N = P.toString(2).length;
  const increment = N - previousN;
  previousN = N;
  if (increment !== 1 || gcd(N, s) !== 1) continue;
  const r = N - s - 1;
  if (r < 1) continue;
  ++counts.weights;
  const dMax = Math.floor((r + 1) / 2);
  const D = (1n << BigInt(N)) - P;
  for (let c = 1; c < s; ++c) {
    if (!validResidues([c], s, N)) continue;
    for (let d = 1; d <= dMax; ++d) {
      record("singleton", s, N, D, [c], d, 4);
    }
  }
  for (let c1 = 1; c1 < s - 1; ++c1) {
    for (let c2 = c1 + 1; c2 < s; ++c2) {
      if (!validResidues([c1, c2], s, N)) continue;
      for (let d = 1; d <= dMax; ++d) {
        record("twoShift", s, N, D, [c1, c2], d, 6);
      }
    }
  }
}

console.log(JSON.stringify({maxS, counts, witnesses}, null, 2));
