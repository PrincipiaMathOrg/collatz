# FRONT-B3 (rewrite rank, r17/r31/r32) -- report

Agent: FRONT-B3. Date: 2026-08-16. Files: `source/rewrite11.py`, `source/frontB3_verify.py`,
`source/frontB3_search.py`, `source/frontB3_run.py`, `source/frontB3_exhaust.py`,
`source/frontB3_fa_structure.py`, `source/frontB3_table.py`; logs `logs/frontB3-*.log`,
`logs/nohup-{main,lfail,mixed}-*.out`; certificates `certificates/frontB3-{main,lfail,mixed}-*.json`.

## 0. The objects (exactly as the rounds state them)

Eleven-rule system (YAH; marked-carry paper s2; r17 s1; r31 s1; r32 s1) on canonical strings `/u.`,
`u` over `{f,t,0,1,2}`, value = start at 1 and apply `f(x)=2x, t(x)=2x+1, d(x)=3x+d` left to right:

    D:  f. -> .      t. -> 2.
    A:  f0 -> 0f   f1 -> 0t   f2 -> 1f   t0 -> 1t   t1 -> 2f   t2 -> 2t
    B:  /0 -> /t   /1 -> /ff  /2 -> /ft

A, B preserve the value; each D-step is one shortcut step T. Marked-carry Thm 2.1: `Psi = w^2 q + w I + b`
orients the ten rules R0 = all but `t. -> 2.`; Prop 2.2: R0-normalising after one `t. -> 2.` from the
binary string of odd n gives the binary string of `U_+(n)`, with `v_2(3n+1)-1` erasures `f. -> .`,
schedule-independently.

Round 17, the two carry transducers (its eq. (1)-(2)):

    E(eps)=eps, O(eps)=2,  E(0u)=0E(u), E(1u)=0O(u), E(2u)=1E(u), O(0u)=1O(u), O(1u)=2E(u), O(2u)=2O(u)

(long division by 2 in base 3, carry c in {0,1}: output floor((3c+d)/2), new carry (3c+d) mod 2, terminal carry
1 appends the digit 2; E = carry 0 = processing `f u .`, O = carry 1 = processing `t u .` by A u D only).
The pure ternary return map (r17 eq. (3)) and value (4):

    R(0u) = O(u),  R(1u) = E(E(u)),  R(2u) = E(O(u)),  R(eps) = eps;   N(w) = 3^|w| + [w]_3.

r17 Prop 1: `N(R w) = T(N w)` if `w = 0u`, `T^2(N w)` if `w = 1u, 2u`. Thm 2: Collatz <=> every ternary word
reaches eps under R. Thm 3 / carry-profile lemma (r17 eq. (6) = (18)): any `rho : {0,1,2}^* -> alpha`
(ordinal), `rho(eps) = 0`, with the THREE uniform inequalities

    rho(O(u)) < rho(0u),     rho(E(E(u))) < rho(1u),     rho(E(O(u))) < rho(2u)     for every u,

proves Collatz, and `rho^(C) = w^2 rho(Pi(C)) + w p(C) + I(C)` (r17 eq. (8)) lifts it to every canonical
A/D/B step of the mixed system.

Round 31's refuted classes (do not retry): (i) Prop 1: total context-cancellable (context-monotone) word
orders, even relative ones (`t > 2 >= ft` gives `t > ft > f^2 t > ...`); (ii) Thm 2: direct scalar polynomial
interpretations `P_s in N[x]` composed along the string, weakly orienting all rules => all `P_s = x`, no rule
strict (kills scalar polynomial reduction pairs); (iii) Thm 3: labelled polynomials `P_r(m)`, `r = v_2(n+1)`,
on the two-counter system `(m,r) -> (3m, r-1)`, `(2^s q - 1, 0) -> (q, s-1)`: all degrees equal and
`9^d <= 8^d`; same for commutative Hahn series with leading term `a_r m^d`. Round 32 4.1-4.3 and r17 s7 add:
fixed digit precedence, alternating block-length ranks, positive-slope scalar affine interpretations,
length-leading, commutative digit counts, additive bigram potentials. r31 s6 explicitly leaves matrix
interpretations (= weighted automata) and semantic-labelled dependency-pair orders open. That is the class
searched here.

## 1. B3a -- implementation and verification (logs/frontB3-a-verify.log, 0 violations)

(i) every rule application preserves the value (A, B) or applies T (D): all 78125 strings of length <= 7 and
20000 random strings of length <= 40 (~360k rule applications). (ii) Prop 2.2 for all odd n <= 10^5 (leftmost
schedule) and rightmost/3 random schedules for n <= 3001: normal form = binary string of `U_+(n)`, f-erasures
= `v_2(3n+1) - 1`, schedule-independent. (iii) E, O equal the A u D processing of `fu.`, `tu.` for all
|u| <= 8; recursions (1); R = B-rule + processing with 1/2/2 T-steps; Prop 1 on all 70476 words with
N(w) <= 10^5; r17's transitions (12)-(15) and `2220 -> 11022 -> 002222`.

The deterministic map, stated explicitly: on `S = {n : leading base-3 digit 1} = U_q [3^q, 2 3^q)`,

    R_val(n) = T(n)      if 3^q <= n < 4 3^{q-1}   (second ternary digit 0),
    R_val(n) = T(T(n))   if 4 3^{q-1} <= n < 2 3^q,

and (new, verified n <= 10^6) R is exactly the FIRST-RETURN MAP of T to S: from n not in S, T(n) in S; from n
in S the skipped value (if any) is not in S. Hence the R-orbit of n is the T-orbit intersected with S, its odd
values are a subsequence of the U_+ orbit (checked n <= 10^5), and any T-orbit segment of the battery gives
R-instances by filtering to S. F-A in the R system: `N(2^m) = 2 3^m - 1 = T^m(2^{m+1}-1)`, `R(2^m) = 1^m`,
`R(1^m) = (01)^{floor(m/2)}`; the all-odd run itself is the pure-binary phase `/t^m. -> /2^m.` (m(m+1)/2 A u D
steps), i.e. it lives in the lifted rank's `w p + I` part, not in rho.

## 2. B3b -- the search (see table)

Rank family (r31-allowed): N-weighted automata / matrix interpretations of dimension d with coefficients
0..K, `rho(w) = alpha^T M_{l_1} ... M_{l_q} beta`, letters l_i = digit, or (digit, first-pass carry c_i)
[c_i = parity of the prefix value = the exact transducer carry entering position i in all three R-cases],
or (digit, both carries), and/or a separate automaton per label `r = min(v_2(N(w)+1), 3)` (path-dependent).
The scalar comparison is the most permissive way to compare a d-dimensional interpretation on closed words,
so UNSAT refutes every d-dimensional matrix interpretation with that bound (AProVE order included) and
argument filtering (identity matrices are in range). Method: CEGIS with CaDiCaL on a bit-blasted encoding
(z3 bit-blaster, small-bit coefficient variables), exact integer evaluation of every model on the pool.
Pools: level R: all R-instances on the R-orbits of n <= 10^4 (10275 pairs) + battery segments (F-A..F-K
filtered to S, 3801 pairs, words up to 459 digits, SMT pool capped at length 40) + F-A stopping segments of
2^L - 1 for L <= 30; level mixed: all one-step rewrites at every string visited under leftmost and rightmost
schedules from n <= 2000 plus F-A stopping runs L <= 30 (~2.4 10^5 pairs). L_fail mode: F-A stopping segments
alone, L increasing.

TABLE: see the end of this file (generated by frontB3_table.py).

Findings. Every level-R class in the grid that finished is UNSAT, and the refutation uses only words of
length <= 4 (typically <= 3): the classes die on the tiny words `0 -> 2 -> 1 -> eps`, `12 -> 02`, `20 -> 022`,
`011 -> 202`, `121 -> 0122`, ..., i.e. on the r17 obstructions and their length-3/4 relatives, NOT on the
2^L - 1 family for L growing with the dimension. L_fail measured on the F-A stopping segments alone is 2..5
for every finished class (`(d,K) = (1,*): 2-3, (2,1): 3, (2,2),(2,3): 5, (3,1): 4`): flat, no scaling law
with d. The refutations are exhaustively re-verified in exact integer arithmetic (numpy int64, all
configurations enumerated with pruning) for every class of size <= 2^33 that finished; the larger classes
are SAT-solver certified (CaDiCaL UNSAT; the small models found along the way were re-checked exactly).
Level mixed with the odd rule: UNSAT already on the 26 rewrites among strings of length <= 2 for every
(d <= 4, K <= 3) that finished; without the odd rule (sanity, R0 has matrix proofs by YAH) the same
pipeline FINDS ranks, e.g. d = 2, K = 2: alpha = (1,1), beta = (1,0), M_f = M_t = [[1,0],[1,1]],
M_0 = M_1 = M_2 = [[2,0],[2,1]], strictly decreasing on all 1.09 10^6 ten-rule rewrites from n <= 20000 and
the F-A runs L <= 40 (exact check) -- so the pipeline is not vacuous.

## 3. B3c -- hand proof status

Claim attempted: "no matrix interpretation of fixed dimension d over N orients the odd rule uniformly on the
all-odd runs." Exact structure of the all-odd family in the R system (logs/frontB3-c-FA-structure.log):
for s <= 7 there are blocks u_s with |u_s| = P_s in {2^s (s<=5), 128 (s=6), 512 (s=7)} such that
`R^s(2^m) = u_s^{floor(m/P_s)} y_{s, m mod P_s}` for all m <= 900 (u_0 = 2, u_1 = 11, u_2 = 0101,
u_3 = 20012001, u_4 = 0210111220220001, u_5 = 2200202212211120 1012021101100001). Hence along every residue
class the automaton value `rho(R^s 2^m)` is a linear recurrence sequence in j = floor(m/P_s) of order <= d,
and the F-A chain constraints compare linear recurrences of the SAME order and growth rate class:
`rho(2^m) > rho(1^m) > rho((01)^{m/2}) > ...`. Any rank must satisfy `rho(2^m) >= h(m)` (R-hitting time
of 2 3^m - 1; h(m)/m <= 9.75 for m <= 60, and h(m) >= 0.79 m trivially), which an automaton with a
Jordan block or spectral radius > 1 satisfies. So growth domination gives NO contradiction: the all-ones
runs do not refute bounded-dimension automata by themselves; the refutations that exist come from the
finite tiny-word systems. What is missing is precisely:

  Missing lemma (structural incompatibility). For every d there is a finite set F_d of pairs (w, R w) on
  which no N-weighted automaton of dimension d (any coefficients) is strictly decreasing.

Known: F_1 = the 12 pairs of length <= 2 (any K; r17's commutative-count argument), F_2 (K <= 3) and F_3
(K = 1) exist with words of length <= 4. Unknown: whether F_d exists for all d without a coefficient bound;
a trie automaton with d ~ number of words realises ANY finite order, so F_d must grow with d and a proof
needs an infinite family with an automaton-incompatible order (pumping), which the F-A block structure does
not supply because the R-orbit of 2^m never returns to a shorter member of the same family.

Comparison with r32 Thm 2: an automaton rank rho on canonical strings induces the pointwise integer rank
`r(n) = min_{s represents n} rho(s) <= rho(bin_string(n)) <= C n^kappa (log n)^d` with
`kappa = log_2 max(||M_f||, ||M_t||)`. So a matrix interpretation of ANY dimension would prove Collatz with a
polynomial total-stopping-time bound `tau_T(n) <= C n^kappa (log n)^d` (C11: stronger than Collatz), and
conversely no known no-go excludes it: the class is not killed by C1-C13, only by the finite computations
above.

## 4. B3d -- surviving class

Weakest carry-sensitive, path-dependent family not yet excluded: N-weighted automata / matrix
interpretations on the ternary words with letters (digit, transducer carry) [or (digit, both carries)] and
one automaton per label r = v_2(N(w)+1) capped, in dimension and coefficient range OUTSIDE the finished grid
(see table: the smallest open cells), plus the same with an unbounded r-dependence (infinitely many
automata, r31 s6's semantic labelling at unbounded precision) and the r31 s6 semantic size-change graphs.
Smallest concrete instance to check next: the first UNKNOWN cell of the table (d = 3, K = 3, letters
(digit, carry)) with the same 33-instance core -- and, independently of dimension, whether the finite
system F_2 (the 21 pairs of length <= 4 in `frontB3-main-R-d2-K3-plain.json`) is infeasible for d = 2 with
UNBOUNDED coefficients (a decidable polynomial system: 16 variables, degree <= 6).

## 5. Sharpest open statement

Does there exist d and an N-weighted automaton (alpha, M_0, M_1, M_2, beta) of dimension d with
`alpha^T M_{R(w)} beta < alpha^T M_w beta` for every nonempty ternary word w? Every such automaton proves
Collatz with tau_T(n) = O(n^kappa log^d n); none exists with d <= 2, K <= 3 or d = 3, K = 1 (exact), and none
of the F-A / carry-labelled / r-labelled variants in the grid; the finite obstruction sets have words of
length <= 4 only, and no infinite family is known that would exclude all d at once.
