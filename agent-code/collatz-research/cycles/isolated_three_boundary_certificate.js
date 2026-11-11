#!/usr/bin/env node
"use strict";

// Exact certificate for the two short-degree mixed-boundary anchor cells.

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

function add(p, e, a) {
  p.set(e, (p.get(e) || 0n) + a);
  if (p.get(e) === 0n) p.delete(e);
}

function degree(p) {
  return Math.max(...p.keys());
}

function l1(p) {
  let answer = 0n;
  for (const a of p.values()) answer += a < 0n ? -a : a;
  return answer;
}

function q00B(c1, c2, c3, B) {
  const x = c2 - c1;
  const y = c2 + B - c3;
  const p = new Map();
  for (const [e, a] of [[x, 3n], [0, 3n], [y, 2n]]) {
    add(p, e + 1, a);
    add(p, e, -a);
  }
  add(p, c2 + 1, -3n);
  return {p, x, y};
}

function qLLB(c1, c2, c3, B, L) {
  const h = Math.max(0, c2 - L);
  const a = h + L - c1;
  const b = h + L - c2;
  const c = h + B - c3;
  const p = new Map();
  for (const [e, coefficient] of [[a, 9n], [b, 9n], [c, 8n]]) {
    add(p, e + 1, coefficient);
    add(p, e, -coefficient);
  }
  add(p, h + 1, -12n);
  return {p, h, a, b, c};
}

assert(171n ** 171n * 125n ** 1000n < 374n ** 1000n,
  "K=19 exponential comparison failed");
assert(576n ** 171n * 125n ** 1000n < 374n ** 1000n,
  "K=64 exponential comparison failed");

const r = 503;
const B = 295;
const L = 208;
const M = 87;
assert(B === L + M, "bad Euclidean dimensions");

const first = q00B(1, 3, 265, B);
assert(first.x === 2 && first.y === 33, "bad diagnostic exponents");
assert(degree(first.p) === 34 && degree(first.p) < M,
  "bad diagnostic q00B degree");
assert(l1(first.p) <= 19n, "q00B l1 bound failed");

const second = qLLB(200, 205, 290, B, L);
assert(second.h === 0 && second.a === 8 && second.c === 5,
  "bad diagnostic qLLB exponents");
assert(degree(second.p) === 9 && degree(second.p) < M,
  "bad diagnostic qLLB degree");
assert(l1(second.p) <= 64n, "qLLB l1 bound failed");

let isolated = 0;
let q00BCount = 0;
let qLLBCount = 0;
let overlap = 0;

for (let c1 = 1; c1 < B; ++c1) {
  for (let c2 = c1 + 1; c2 < B; ++c2) {
    for (let c3 = c2 + 1; c3 < B; ++c3) {
      if (c2 - c1 === L || c3 - c2 === L || c3 - c1 === L) continue;
      ++isolated;

      const A = q00B(c1, c2, c3, B);
      const inA = degree(A.p) < M;
      assert((c3 - c2 >= L + 2) === inA,
        `q00B condition mismatch at ${c1},${c2},${c3}`);
      if (inA) {
        ++q00BCount;
        assert(l1(A.p) <= 19n, "q00B l1 regression failed");
      }

      const C = qLLB(c1, c2, c3, B, L);
      const inC = degree(C.p) < M;
      if (inC) {
        ++qLLBCount;
        assert(l1(C.p) <= 64n, "qLLB l1 regression failed");
      }
      if (inA && inC) ++overlap;
    }
  }
}

assert(isolated === 4167132, "isolated triple count changed");
assert(q00BCount === 98770, "q00B cell count changed");
assert(qLLBCount === 614125, "qLLB cell count changed");
assert(overlap === 0, "unexpected regression-cell overlap");

console.log(`isolated_triples_r503=${isolated}`);
console.log(`q00B_short_degree_triples=${q00BCount}`);
console.log(`qLLB_short_degree_triples=${qLLBCount}`);
console.log("K19_base_lt_374_over_125=true");
console.log("K64_base_lt_374_over_125=true");
console.log("isolated_three_boundary_certificate_passed=true");
