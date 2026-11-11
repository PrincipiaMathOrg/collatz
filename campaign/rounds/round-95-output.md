model: GPT-5.6 Pro (gpt-5-6-pro)
round: 95
approach: 90 -- Verification through 2^75 or 2^77
front: disproof
sent: 2026-08-17T18:16:58Z
worked: 62m (3731s, finished 2026-08-17T19:19:08Z)

---
# Outcome

**No disproof of the Collatz conjecture was obtained.** The recursive-suffix computation found no counterexample, and the proposed (2^{75}) or (2^{77}) campaign was not executed in this environment.

This is not merely cautious wording. A successful verification through (2^N) establishes the finite statement

[
V_N:\qquad
\forall,3\le n<2^N\ \exists k\ge1\quad T^k(n)<n,
]

where

[
T(n)=
\begin{cases}
n/2,&n\equiv0\pmod 2,[2mm]
(3n+1)/2,&n\equiv1\pmod 2.
\end{cases}
]

Strong induction then proves convergence for every (n<2^N). But (V_N) is compatible both with the full Collatz conjecture and with a least counterexample greater than or equal to (2^N). Thus a clean (2^{75}) or (2^{77}) run would be a major **finite verification**, not a disproof.

A computational disproof would require one of two outputs:

1. an exact nontrivial cycle, replayable entirely with integer arithmetic; or
2. a mathematical certificate proving that a particular orbit never enters the trivial cycle.

A timeout, an arithmetic cutoff, or an unusually large excursion is only an unresolved case. The implementation therefore never labels such an event a counterexample.

The peer-reviewed verification record I could confirm remains Barina’s result through (2^{71}). Angeltveit’s 2026 paper presents (2^{75}) as a modest future target and (2^{77}) as potentially achievable with resources comparable to the (2^{71}) computation; it does not report either run as completed. ([Springer][1])

## What was completed

I produced an independent deterministic C++20 implementation of the 2026 recursive-suffix method, rather than simply adapting the public CUDA source. It includes:

* least-significant-bit recursive traversal;
* the exact affine lifting identity
  [
  T^k(n_0+a2^k)=T^k(n_0)+3^{f_k(n_0)}a;
  ]
* the descent, path-merging, odd-even-even, and mod-(9) preimage sieves;
* the (B)-step look-ahead bitvectors indexed using (3^{-f}\pmod{2^B});
* exact arbitrary-precision continuation;
* exact cycle detection;
* a distinct unresolved status;
* deterministic SHA-256 event certificates;
* exhaustive small-(N) auditing of every pruned cylinder;
* deterministic fixed-depth and adaptive shard generation;
* fail-closed manifest splitting and certificate merging.

The principal completed checks are:

| Check                                             |                                                                                             Result |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------: |
| Recursive audit below (2^{20})                    |              257,601 rejected candidates or cylinder extensions replayed directly; no unsafe prune |
| Independent brute force below (2^{20})            |                                                                   No cycle and no unresolved value |
| Full scalar reference verification below (2^{32}) | 4,629,755 final continuations and 206,747,016 continuation steps; no cycle and no unresolved value |
| Published survivor count at (N=35)                |                                                                                 Exactly 31,109,345 |
| Published survivor count at (N=36)                |                                                                                 Exactly 56,414,851 |
| Published survivor count at (N=37)                |                                                                                Exactly 106,551,583 |
| Published small decomposition                     |                                                                               Exactly 1,168 shards |
| Published large decomposition                     |                                                                             Exactly 278,699 shards |
| Proposed (N=75) campaign                          |                                                       Manifests generated, but shards not executed |

The audit also found and corrected a subtle implementation discrepancy. Initially the independent program produced (31,261,175) survivors at (N=35), exceeding the published number by (151,830). The missing operation was the **endpoint form of the odd-even-even sieve**: a pattern can begin before the (B)-step look-ahead window and finish inside it. Adding that boundary condition rejected exactly (151,830) candidates and recovered the published count

[
31,261,175-151,830=31,109,345.
]

That exact reconciliation is a valuable cross-check that the recursive state, pending finite-state flag, look-ahead masks, and high-bit decoding agree with the 2026 algorithm.

The final source and binary hashes are

[
\begin{aligned}
\operatorname{SHA256}(\text{source})
&=\mathtt{0db0f46f0a6d988e7689a7490254b349}\
&\quad\mathtt{a1095659cbf704917d450c086a7d467b},[1mm]
\operatorname{SHA256}(\text{binary})
&=\mathtt{8891806af70c82b89c9589d6c23c20fd}\
&\quad\mathtt{d55bdcf5363b6c6097cd8c83fe5be505}.
\end{aligned}
]

The (N=32) reference certificate is

[
\mathtt{095fa7be05cfec9ed367040f01eaa8c3ba4e8d3e23a923a3ace1185ff7187b9d}.
]

## Why the full (2^{75}) computation was not claimed

Angeltveit reports that (2^{60}) took 24.4 hours on an RTX 3060 and estimates that (2^{72}) would require roughly one to eight GPU-years, depending on hardware. A credible (2^{75}) or (2^{77}) result therefore requires a sustained distributed GPU campaign, complete coverage records, and independent replication—not a single local reference run. ([arXiv][2])

The public implementation computes a checksum and compares randomly sampled GPU work against the CPU implementation; the paper also notes that its Rust code contains no error checking. Those are useful engineering tests, but they are not by themselves a complete record-scale certificate. ([arXiv][2])

The supplied campaign protocol strengthens this by requiring:

* a canonical hashed shard manifest;
* exactly one valid result for every shard;
* no missing or duplicated shard identifier;
* deterministic per-shard counters and event digests;
* exact follow-up for every trajectory exceeding the fixed-width GPU cutoff;
* independent execution through another implementation or backend;
* failure on any unresolved case, overflow, malformed output, or checksum disagreement.

## What a successful (2^{75}) run would prove

The cutoff would be

[
2^{75}=37,778,931,862,957,161,709,568.
]

A completed and certified run would prove convergence for every positive starting value below this number. It would also imply that the least element of any nontrivial cycle is at least (2^{75}).

Combining that verification range with Hercher’s cycle machinery, Angeltveit reports that every hypothetical nontrivial cycle would then have length at least

[
2,302,268,119,908,
]

approximately a (6.5)-fold improvement over the cited preceding bound. It would still leave open both cycles lying entirely above the cutoff and divergent orbits beginning above it. ([arXiv][2])

## Deliverables

The report contains the correctness theorem, derivations of the recursive identity and sieves, validation tables, computation certificates, runtime discussion, pseudocode, and the exact logical conclusion.

* [Journal-style computational audit report](sandbox:/mnt/data/collatz90_disproof_attempt_report.pdf)
* [LaTeX source of the report](sandbox:/mnt/data/collatz90_disproof_attempt_report.tex)
* [Complete implementation, manifests, results, scripts, and certificates](sandbox:/mnt/data/collatz90_approach90_audit_package.zip)
* [Independent C++20 reference implementation](sandbox:/mnt/data/collatz90_reference.cpp)
* [Machine-readable validation summary](sandbox:/mnt/data/collatz90_validation_summary.json)

The mathematically correct result is therefore a **fully documented disproof attempt with a reproducible finite-verification framework**, but not a disproof: no nontrivial cycle was found, no divergent orbit was proved, and the (2^{75}) and (2^{77}) campaigns remain unexecuted.

[1]: https://link.springer.com/article/10.1007/s11227-025-07337-0 "Improved verification limit for the convergence of the Collatz conjecture | The Journal of Supercomputing | Springer Nature Link"
[2]: https://arxiv.org/abs/2602.10466 "An improved algorithm for checking the Collatz conjecture for all n < 2^N"
