# STATE - Collatz certificate search (live map)

NEXT ACTION: wave 1 may launch. (gate passed 34/34; rerun: cd source && PYTHONIOENCODING=utf-8 python test_core.py)

## SETTLED (from the campaign; cite round)
- Affine identity `2^{A_j} U^j n = 3^j n + C_j`; unique realizing odd class mod `2^{A_j+1}` (r55 P1, r61 T1).
- `R_{j+1} = R_j + t_j 2^{A_j+1}`; positive-integer locus = eventual vanishing of `t_j` (r55 T3, r63 s9).
- Canonical `(r_2, r_3)` exist, `r_2 < 2^{A+1}`, eventually equal `(n, U^j n)` (r50 P4).
- (AC)+(CYC) => Collatz (r50). Round 63 Prop 2: first-crossing rescued words `F_k = O(k^{15.3})`.
- r67 Thm 9.1: Collatz <=> exists `pi > 0` in `l^1`, `P pi <= pi`. r69 Thm 4: `nu(N) <= c log_2 N + C`
  with `c < 1.7095` => Collatz; Thm 5: `limsup nu/log_2 N >= 1`.

## NO-GO (certificate shapes proved impossible; see SKILL.md C1-C13)
- fixed-window/finite-table (r28,r33); additive site-wise (r11,28,29,35,38,47,48); SOS finite-state (r29);
  context-free/cancellable/polynomial orders (r31); monotone height + bounded correction, 2-adically
  continuous potentials (r64); fixed-weight adelic {oo,2,3} heights (r51); drift/entropy/spectral-gap
  of averaged operators (r48,49,57,59,62,63); anything blind to exact carry `C_j` (r64 s7).

- FRONT B2 (r67 F1 explicit pi), all EXACT (rational Farkas/Gordan certificates; files certificates/pi_farkas_*.json,
  proofs logs/frontB2-proof.log, checker source/frontB2_proofcheck.py, LP+certifier source/frontB2_pi_lp.py):
  * Thm A: NO pi(n) = n^{-s} h(sigma(n)) with sigma finite-valued (K states), any s >= 0, any table h > 0:
    the shadow chain 2^K-1 -> 3^K-1 gives K+1 strictly increasing pi-values on K states; certificate = rows
    n_{j+1}..n_k with y = 1 (telescoping), all m <= 3^K - 1.  Covers (i) n mod M [single row m = 3M-1],
    (ii) parity words + mod 3^b [single row m = 3^{b+1} 2^L - 1; note parity_word(n,L) <-> n mod 2^L is a
    bijection so (ii) = (i) with M = 2^L 3^b, confirmed by identical N_fail], (iii) capped-v2 automata
    [single row m = 3 2^{K1+1} - 1].
  * Thm B/B': NO pi = n^{-s} g(v2(n+1)) or n^{-s} g(v2(n+1), v2(3n+1)) for ANY (unbounded) g, s >= 0:
    rows {3, 5, 8} with y = 1 (r64 s6 cascade N_m = 2^{m+1}-2 made exact).  Explicit q^{v2(n+1)} dies at
    m = 2^L - 1, L = min{L >= 2 : q^L < 2^{-s}} (certificates/pi_farkas_v2exp_qpow.json).
  * Measured minimal N_fail(M,s) (LP, exact both sides: rational table feasible at N_fail-1, rational Farkas
    dual at N_fail): N_fail(M,0) = M/2 + O(1) (proved >= floor(M/2)+1, Thm D), N_fail(M,3/4) ~ 0.9M,
    N_fail(M, s>=1) ~ 1.0-1.1 M, for M in {2..2048}; certificates use ~M/2 rows (mostly y=1 along T-orbits
    of the wrapped seeds).  Every LP-feasible table below N_fail dies on the battery at F-A (2^m - 1).

## FROM ANTON'S MARKED-CARRY PAPER (C:\Users\anton\Downloads\collatz_marked_carry_paper.pdf)
- Cor 3.4 all-ones diamond: a barrier + 1-terminal prefix of length r, excess B = A - r, shadow start m,
  realization n = 2^A s - m, gives ancestor z = 2^r s - 1 < n reaching the same endpoint. Thm 11.1: if EVERY
  non-descending orbit has such a prefix then Collatz (quantifier covers cycles; hypothesis is strong).
- Activation identity: Delta = (C_r + 2^{A_r} - 3^r)/3^r = sum_j 2^{B_{j-1}}(2^{c_j}-1)(2/3)^{s_j}, 0 < Delta < h
  (h = #exponents > 1). TARGET Conj 11.4: Delta >= h (marked carry capacity). 3Delta >= 4h is FALSE (47 -> 61,
  h=13, Delta=14). Verified Delta >= h computationally along all proper-barrier prefixes of seeds <= 10^9.
- Thm 7.3-7.5: proper-power and long fixed-exit periodic shadows satisfy the charge bound; residual case is
  primitive/aperiodic or growing exit debt (matches r63 "periodic rays eliminated").
- Thm 6.1 Smith obstruction: unmarked cyclic matrix leaves one scalar congruence (confirms C2/C6).
- Thm 8.2: shortest nontrivial 1-terminal barrier word has length > 10^10 (conditional on audited checker).
- Thm 11.3: Collatz <=> forall n>1 exists r: M_r(n) < n (min-plus envelope) -- an equivalence, C13.

## OPEN (this lab's targets)
- Front A: (AC) restricted to structured subclasses; exact small-corner enumeration; correlation test.
- Front B: adaptive-jump `b(n)` sweep; path-dependent rewrite rank; order-weighted survivor sums.
  B2 done (no-go); sharpest open B2 statement: an l^1 subeigenvector pi = n^{-s} g(state) needs an
  INFINITE state (Thm A) growing like (3/2)^{s j} along all-odd runs (Thm C) and richer than the run
  length v2(n+1) or (v2(n+1), v2(3n+1)) (Thm B/B'); smallest unexcluded class = one unbounded counter
  carrying exact carry / adaptive-block data (C7).  Also open: prove N_fail(M,s) <= (1+o(1)) M for s >= 1.

## SCOPE DECISION (2026-08-16)
Front A (small-corner enumeration) and Front B1 (adaptive-jump sweep) KILLED before completion: pure sweeps
cannot produce a certificate. Only certificate-producing fronts run: B2 (explicit pi, exact Farkas no-gos) and
B3 (rewrite rank). Any partial logs/frontA-* or logs/frontB1-* are unaudited fragments; do not cite them.

## LOG (agents append: date | agent | verdict | files)
- 2026-08-16 | gate | PASS 34/34 (items a-k + coordinator additions x1-x4, 29 s). One digest DISCREPANCY (RESULTS.md r51 entry, not the round): the list k=145,1009,...,5329 (period 864) is P=N mod 2^4 and 3^3; P=N mod 2^6 and 3^3 has period 3456 (k=145,3601,7057,10513). Exact facts: 142 first-crossing words k<=14 (141 without the k=1 even word), only live crossing = (1,0) seed 1 through depth 30; #B_k = #noncrossing words + 1 for k<=30 (#B_30 = 12771275); barrier words of length<=14: 81117, 1-terminal ones = only 1^r; 47->61 proper-barrier segment r=33, A=52, h=13, gain 14, not 1-terminal. | source/collatz_core.py, source/battery.py, source/test_core.py, logs/gate-core-tests.log
- 2026-08-16 | FRONT-B2 | NO-GO for all three finitely-presented pi families, exact Farkas certificates for every (M in {2..2048}, s in {0,3/4,1,3/2,2,3}), (L<=10,b<=1), (L<=8,b=2), (L<=6,b=3), v2 automata K1<=8,K2<=4; hand proofs Thm A/B/B'/C/D checked exactly (frontB2_proofcheck.py ALL PASS); growth law N_fail ~ c(s) M measured | source/frontB2_pi_lp.py, source/frontB2_run.py, source/frontB2_proofcheck.py, source/frontB2_summary.py, logs/frontB2-{mod,word,v2,proof,summary}.log, certificates/pi_farkas_*.json
