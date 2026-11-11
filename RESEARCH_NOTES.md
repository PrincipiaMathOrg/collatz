# Collatz conjecture: research notes

These notes collect the Collatz work done by Anton's AI agents on Principia in July and August 2026. **The Collatz conjecture is not proved, and nothing here claims it is.**

The campaign worked through a ranked list of 100 attack strategies. Each of the first 97 was run to a recorded verdict, and none proves or disproves the conjecture. What the campaign did produce:

- one side question settled: an accumulation point that López and Stoll had left open (it bears on neither half of Collatz);
- one conditional theorem: two explicit statements that together imply Collatz;
- a set of impossibility results that rule out most of the usual certificate shapes;
- exact computations, chiefly the residence lengths $\ell_k$ of an $81/64$ subsystem through $k = 24$.

Each claim below is tagged **proved**, **conditional**, **computational**, **heuristic**, **refuted** or **open**.

## The problem

Let $T(n) = n/2$ for even $n$ and $T(n) = 3n+1$ for odd $n$. The conjecture says that every positive integer reaches $1$.

The notes mostly use two variants. The **shortcut map** is $T(n) = n/2$ or $(3n+1)/2$. The **accelerated map** on odd $n$ is $U(n) = (3n+1)/2^{v_2(3n+1)}$.

An orbit of $U$ is recorded by its **valuation word** $w = (a_1, \dots, a_j)$, with $A_j = a_1 + \dots + a_j$. Everything rests on the affine identity

$$2^{A_j}\, U^j(n) = 3^j n + C_j, \qquad C_j = \sum_{i<j} 3^{\,j-1-i}\, 2^{A_i} \quad (A_0 = 0).$$

The quantity $C_j$ is the **carry**. Four consequences are used throughout:

- **Descent.** $U^j(n) < n$ exactly when $C_j < (2^{A_j} - 3^j)\,n$. A coefficient $3^j/2^{A_j}$ below $1$ is necessary for descent but not sufficient.
- **Cycles.** A cycle with word $w$ satisfies $(2^{A} - 3^{|w|})\,n = C_w$. So a nontrivial cycle needs $2^{A(w)} - 3^{|w|}$ to divide $C_w$, with $A/|w|$ just above $\log_2 3 = 1.58496\ldots$
- **Realization.** Every finite word is realized by exactly one odd class modulo $2^{A_j+1}$. This is the parity-vector bijection of Terras (1976). Every finite pattern occurs; the question is whether one fixed integer can follow a bad pattern forever.
- **Conjugacy.** Over $\mathbb{Z}_2$, the parity map conjugates $T$ to the shift (Bernstein–Lagarias 1996), with inverse $\Phi(2^{d_0} + 2^{d_1} + \cdots) = -\sum_{i} 2^{d_i}/3^{i+1}$.

The conjecture splits into two independent halves:

- **(D) no divergent orbit.** Over the rationals with odd denominator this is the *periodicity conjecture*.
- **(C) no nontrivial cycle.**

**Known (literature).**

- Every $n < 2^{71}$ reaches $1$ (Barina 2025).
- Almost all orbits attain almost bounded values (Tao 2019).
- A nontrivial cycle has more than $1.375 \times 10^{11}$ odd elements (Hercher 2023).

## How the campaign was organized

The work came in three passes.

1. **Exploratory pass (July).** An exact cycle sieve, extensions of two published computations, and an open accumulation-point question of López and Stoll.
2. **Zero-trace branch (August, rounds 1–4).** An attack on the finite conjecture isolated in the affine compression paper (see Papers and artifacts).
3. **Approach campaign (rounds 6–102).** The ranked list of 100 programs runs from moonshots (adelic renormalization, measure rigidity, operator algebras) down to plain computation. Each program got one self-contained round asking for a full proof or disproof by that method alone. A separate reading then recorded what the round proved, refuted and left open. Approaches 1–97 have verdicts; 98–100 have none. The problem page summarizes the first 68 (rounds 6–73).

Key claims were re-derived in exact arithmetic and counterexamples were re-run; claims not re-checked are flagged in the round digest.

## Results

### Proved

**1. López–Stoll Example 6 (proved, computer-assisted).** López and Stoll (2021) read $\Phi$ as a real series $\Phi_{\mathbb{R}}(v)$ and iterate along the branches that $v$ prescribes. If that forced trajectory has an accumulation point, then $\Phi_{\mathbb{R}}(v) \notin \mathbb{Q}_{\text{odd}}$. For their Example 6, a word of exactly critical density $\log 2/\log 3$, they could not decide whether one exists. The paper *Accumulation points for the Collatz conjugacy map in $\mathbb{R}$* proves that it does: $\zeta = \Phi_{\mathbb{R}}(v) = -2.29230550\ldots$ is an accumulation point of its own forced trajectory.

The proof has four steps:

- reduce to an undamped sum, at a geometric cost of at most $36\,\rho^{n+1}$ with $\rho = (2/3)^{\gamma/6}$ and $\gamma = \log 2/\log(3/2)$;
- write that sum as a function on the 2-torus, sampled at Weyl-equidistributed points;
- use the identity $3^{\log 2/\log 3} = 2$, which makes every discontinuity an upward jump. Crossing a phase multiplies one term by exactly $2/3$. A function with only upward jumps cannot skip $\zeta$ on its way down;
- check two straddle inequalities in exact rational interval arithmetic.

The paper also proves a recurrence criterion for the surrounding family of words: an accumulation point exists if and only if $\liminf R_n < \infty$ for an explicit scalar $R_n$.

Scope:

- The result bears on **neither half** of Collatz.
- López–Stoll's Example 7 has the same density and provably no accumulation point, so the method is not universal.
- The real value $\Phi_{\mathbb{R}}(v)$ and the 2-adic value $\Phi(v)$ are not shown to agree.
- The paper has not been refereed.

**2. Zero-trace graph (proved in rounds 1–4; not refereed).** The compression paper reduces one recurrent piece of the problem to the partial map on $\mathbb{Z}_{\ge 0}$:

- $F(x) = 81x/64$ if $x \equiv 0$;
- $F(x) = (81x+1)/64$ if $x \equiv 15$;
- $F(x) = (81x-1)/64$ if $x \equiv 49 \pmod{64}$;
- $F$ is undefined otherwise.

Let $S_k$ be the set of $x \in [0, 64^k)$ whose first $k$ steps are defined. Let $\ell_k$ be the longest path of nonzero points in the graph $x \mapsto F(x)$ on $S_k$. The rounds prove:

- **Structure.** Every in- and out-degree is at most one, there is no nonzero cycle, and the bound $\ell_k \le \lfloor (k+1)/3 \rfloor$ is equivalent to a scalar inequality.
- **Averages.** The count $3^{k-3L}$ is the *exact average* of a carry spectrum over all $81^L$ phases. The problem, however, lives at the single pinned phase $c = 0$.
- **Dependence.** The backward difference set has support $5^L$ and additive energy $19^L$, not the $9^L$ that independence would give.
- **Renormalization.** The step $(k,L) \to (k+3, L+1)$ is exact, and a fraction approaching $0.260472\ldots$ of critical blocks synchronizes.
- **First wrap.** Half of the first-wrap exclusion holds: the positive low-carry case.
- **Explicit counterexamples:**
  - Global carry injectivity fails, by a threefold collision at $(4,2)$.
  - The zero fibre is not an induction state, because of carry $257792$.
  - The unconditional one-block mask exclusion fails at $(1,3)$.
  - Uniform local-code spacing fails, by a unit gap at phase $2087$.

**3. Canonical representatives (proved, round 50).** Take a word $w$ of length $k$ and total $A$. Let $r_3$ be the odd number in $[1, 2\cdot 3^k)$ with $2^A r_3 \equiv C_w \pmod{3^k}$, and set $r_2 = (2^A r_3 - C_w)/3^k$. Then:

- $r_2$ is a positive odd integer below $2^{A+1}$ that realizes $w$, with endpoint $r_3$;
- along any orbit, $(r_2, r_3)$ is eventually the actual seed and endpoint.

This was checked on all 81 words of length 4.

**4. Other unconditional theorems from the rounds.** Each was proved in its round, and the supporting identities were re-checked.

- **Pointwise Benford (round 89).** Every non-eventually-periodic positive orbit is strongly Benford in base 2.
- **Monotone renewal height (round 88).** Along any accelerated orbit, $2^{A_j - 2j} U^j(n)$ never increases, so $A_j - 2j \le \log_2 n$.
- **Christoffel words (round 92).** Let $p, q$ be coprime with $q \log_2 3 < p < 2q$. Then $\gcd\big(\sum_{r<q} 3^{q-1-r} 2^{\lfloor pr/q \rfloor},\ 2^p - 3^q\big) = 1$, so no nontrivial Christoffel word is a cycle. This was checked for all 3,239 pairs with $q \le 160$. Round 93 shows the statement does not extend to all primitive words: one has $\gcd = 5$ with $2^{10} - 3^6 = 295$.
- **Periodic factorization (round 52).** $C_{v^m} = C_v\, Q_m$ with $Q_m = (2^{Bm} - 3^{rm})/(2^B - 3^r)$. So periodic near-cycles collapse to exact cycles, and an eventually periodic orbit is a genuine cycle.
- **Cycle maximum (round 68).** The maximum $K > 2$ of a positive cycle satisfies $K \equiv 8 \pmod{18}$.
- **Autoconjugacy (round 77).** With the 2-adic autoconjugacy $\Omega$, $q_k(x)\,q_k(\Omega x) = (3/4)^k$, where $q_k(x) = 3^{s_k}/2^k$ is the shortcut-map coefficient after $k$ steps ($s_k$ odd steps). If $x > 0$ and $\Omega(x)$ is an integer, then $\{x, \Omega x\} = \{1,2\}$.

**5. A correction (proved, verified).** The rigidity paper claims that $\mathbb{Z}[X]/(X^m - 2, X^K - 3)$ is cyclic of order $2^K - 3^m$ when $d = \gcd(K,m) > 1$. That is false. The order is $|2^{K/d} - 3^{m/d}|^d$, and at $(K,m) = (6,2)$ the quotient is the field with 25 elements. This was confirmed by Smith normal form on 84 pairs.

### The conditional theorem

**Round 50 (proved implication; both hypotheses open).** Let $\beta = \log_2 3$ and define

$$S_k(\eta) = \{\, w : A(w) \le (\beta + \eta)k,\ \ r_2(w) \le e^{\eta k},\ \ r_3(w) \le (3/2)^k e^{\eta k} \,\}.$$

- **(AC), small-corner extinction.** For some $\eta > 0$, no infinite valuation sequence has all its long prefixes in $S_k(\eta)$.
- **(CYC), cycle divisibility.** $2^{A(w)} - 3^{|w|}$ does not divide $C_w$, except for repetitions of the word $(2)$.

**Then (AC) and (CYC) together imply Collatz.**

The two hypotheses are independent: cycles have $A/k > \beta$, on the opposite side of the threshold. Under an independent model, the survival margin of (AC) is $\log 6 - g(\beta) = 0.748$, about 13.6 times the seed-only margin $0.0550$. That gap is **heuristic** evidence: Collatz uses one fixed, correlated translation $2^A r_3 = 3^k r_2 + C_w$, not a random one.

**Other implications proved in the rounds** (hypotheses open):

- A list-decoding bound on barrier words implies Collatz, covering both halves (round 42).
- Let $\nu(N)$ be the nilpotency index of the residual Collatz graph truncated at height $N$. If $\nu(N) \le c\log_2 N + C$ with $c < 1/\log_2(3/2) = 1.7095$, Collatz follows (round 69). The same round proves $\limsup \nu(N)/\log_2 N \ge 1$, so the usable window is $1 \le c < 1.7095$.
- The zero-trace bound $\ell_k \le \lfloor (k+1)/3 \rfloor$ for all $k$ implies that the $81/64$ subsystem has no infinite orbit. That settles only the subsystem.
- Under abc, a radical gap condition leaves only finitely many cycles (round 94).

### Computations

All computations use exact integers, exact rationals or outward-rounded intervals.

**Residence lengths (computational).** Rows $k \le 19$ come from an independent traversal and agree with round 1. Rows 20–24 come from two meet-in-the-middle deciders, and every lower bound has a witness confirmed by direct iteration.

| $k$ | 1–3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20–24 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| $\ell_k$ | 0 | 1 | 2 | 1 | 2 | 2 | 3 | 3 | 4 | 3 | 4 | 4 | 5 | 5 | 6 | 6 | 6 | 7 |

The bound $\lfloor (k+1)/3 \rfloor$ is never exceeded. It is not sharp: at $k = 23, 24$ it is 8 while $\ell_k = 7$. A later run gives $\ell_{25} = 8$; the branch map still lists that row as undecided.

The **heuristic** law $N(k,L) \approx 3^{k-3L}$, for the number of points with a path of length at least $L$, called both slack depths and the return to 8 at $k = 25$. Its mean over phases says nothing about the pinned phase, so it does not refute the bound.

**Cycle frontier (computational, certified).** An exact sieve over all one-sided semiconvergents of $\log_2 3$ was run at the verification limit $2^{71}$. With $K_0 = 72{,}057{,}431{,}991$, the only admissible pairs (odd elements, halvings) with $K \le 4K_0$ are:

- $(72{,}057{,}431{,}991,\ 114{,}208{,}327{,}604)$;
- $(137{,}528{,}045{,}312,\ 217{,}976{,}794{,}617)$.

The second sits exactly at Hercher's $1.375\times 10^{11}$, so that bound is the sharpest possible at $2^{71}$. At $2^{72}$ the elementary argument would reach it without computer assistance.

Small cycles:

- None with at most 8 odd elements (reproduced).
- Claims for up to 20 and up to 34 odd elements were not reproduced.

**Paradoxical orbits (computational).** Call $n$ paradoxical if some $x_j > n$ even though the coefficient has already dropped below $1$. Rozier and Terracol (2026) found 550 such $n$, all at most 4614, and showed that Collatz follows if there are only finitely many.

- Their count was reproduced exactly.
- Extending the search to odd $n < 2\times 10^8$ finds nothing new; the largest odd example is 4613.
- Every $(j, q)$ that occurs ($46/29$, $65/41$, $27/17$, $73/46$, $8/5$) approximates $\log_2 3$ from above.

**Other runs.**

- The coefficient stopping time equals the stopping time for all odd $n < 3\times 10^6$. This is evidence; the conjecture itself is open.
- López–Stoll's complexity table $D(n)$ was extended from $n = 8$ to $n = 12$ for all six slopes. All have full complexity, which supports, but does not prove, their Sturmian conjecture.
- Every $1 < n < 2^{37}$ breaks the all-prefix coefficient barrier by step 547, and the most extreme word is statistically ordinary once conditioned on its length and barrier.

## What does not work, and why

**Witness families.** These recur through the impossibility proofs:

- $2^m - 1$, which rises for $m$ steps toward the 2-adic point $-1$, and its even predecessors $2^{m+1} - 2$;
- shadow blocks with word $(A, 1^{k-1}, 2, C)$, which grow without bound while agreeing modulo any fixed $2^B$ and $3^R$;
- the $(1,2)^\infty$ ray toward $-5$;
- the pseudo-cycle $(1^{12}, 9)$ at $x = 1586131/502829$, which is integral at every prime below $502829$;
- the $3x-1$ control: it has the cycle $5 \to 7 \to 5$, and negating the affine term is a 3-adic isometry, so any frequency, entropy or dimension argument cannot tell $3x+1$ from $3x-1$.

**Proved no-go results.**

1. **No fixed-window certificate (round 28).** $V(n) = \log n + \varphi(n \bmod M)$ with bounded horizon fails for every $M$, every $\varphi$ and every horizon; the family $2^L - 1$ refutes it. The mechanism is the identity $v_2(T^t y - T^t x) = v_2(y-x) - t$ (round 33).
2. **No additive or edge-separable potential.** There are six independent proofs (rounds 11, 28, 29, 35, 38, 47). In base 6, for example, the bulk update is a permutation, so a site-additive potential that never increases is constant.
3. **No polynomial Lyapunov function** with finitely many residue states and bounded blocks, sum-of-squares included (round 29).
4. **No monotone height plus bounded correction, and no 2-adically continuous potential (round 64).** Penalizing the $-1$ shadow only moves the obstruction to $2^{m+1} - 2$. A coercive decreasing function exists if and only if Collatz holds.
5. **No fixed-weight adelic height at $\{\infty, 2, 3\}$ (round 51).** Shadow blocks gain without bound at $\infty$ while staying bounded at $2$ and $3$; the compensation sits at primes $p \ge 5$.
6. **Drift, entropy, dimension and spectral invariants cannot see the carry.** Descent needs $C_j < (2^{A_j} - 3^j)n$, and there are segments with coefficient below $1$ that still end above their start (rounds 40, 64, 87).
7. **Averaged operators see nothing pointwise (rounds 57, 63).** The two out-edges of $x \bmod M$ are the distinct integers $x$ and $x + M$. The exact survivor operator has spectral radius $1$ whether or not Collatz holds.
8. **Finite data cannot separate.** Every finite parity word has a *terminating* realization (round 71). Compactness, entropy and Schmidt-game arguments therefore produce 2-adic or rational ghosts, never integers (rounds 48, 49, 62).
9. **Reduction orders.** No context-free, cancellable or polynomial reduction order works for the binary–ternary rewriting system (round 31). An ordinal below $\omega^3$ handles 10 of its 11 rules; the odd step resists (round 32).
10. **Zeta functions and determinants cannot see escape (rounds 67, 68, 72).** They detect cycles only.

**The common failure.** Symbolic, metric, Diophantine and geometric methods all work at every finite depth. They all fail at the step from "every depth is realizable" to "one fixed positive integer realizes every depth".

In round 55's form, the least realizer satisfies $r_{j+1} = r_j + t_j 2^{A_j+1}$ with $t_j \in \{0, 1\}$, and the question is whether the digits $t_j$ eventually vanish. By the end, 35 of the 83 recorded round assessments had hit this seam, and 39 had restated the problem in another form.

**Refuted in the July pass.**

- The ballot condition $3^{q_t} \ge 2^t$ can fail along a cycle written from its minimum. The word $1110010101111000$ closes a rational cycle at $65275/45853$ and violates the condition at $t = 9$. Use $2^A = \prod_i (3 + 1/x_i)$ instead. None of the 550 paradoxical prefixes is a ballot word either.
- Independence heuristics predict infinitely many paradoxical starters, against 550 observed. Large carries and small 2-adic representatives are strongly anti-correlated.

**Rediscoveries.** The "dual shadow" sequence is the Bernstein–Lagarias conjugacy evaluated on suffixes. The constant $1 - H_2(\log_3 2) = 0.0500$ bits per step, derived in many rounds, is the classical entropy deficit of critical words.

## Map of approaches

| Approaches | Idea | Verdict | Key obstruction or result |
|---|---|---|---|
| 1, 10, 19, 46, 56, 69 | Track 2-adic seed, 3-adic endpoint and real height together | No-go, reductions | Fixed-weight heights fail on shadow blocks; the 3-adic side adds nothing; seed and endpoint cylinders are affine images, so no 2–3 decorrelation |
| 2, 8, 15, 20, 22, 34, 43 | Invariant measures, entropy, pressure, polymers | No-go | Compactness yields 2-adic ghosts; annealed bounds miss the pinned orbit |
| 3, 5, 7, 11, 16, 65, 70 | $q$-series, $C^*$-algebra, K-theory, Conley index, commutant, Gröbner bases | Restatements | Each target is equivalent to Collatz |
| 4, 29, 30, 40, 41, 42, 74 | Automata, Cobham, Mahler, tilings, cellular automata, base 6 | No-go, restatements | Dual automaticity means eventual periodicity, which cycles satisfy; no lasso theorem in two dimensions |
| 6, 23, 24, 59 | Lyapunov and Bellman certificates | Impossible in finite forms | Fixed-window, additive, polynomial, monotone and continuous potentials all ruled out |
| 12, 25, 26, 27, 28 | Termination orders, ordinals, abstraction refinement | Partial | Ordinal below $\omega^3$ for 10 of 11 rules; the order must be carry-sensitive |
| 9, 17, 47, 48, 49, 50 | Baker, Subspace, abc, o-minimality, tropical, lattices | Partial theorems | Periodic factorization; return bounds; the Subspace route misses the critical exponent by measured margins |
| 51–55, 57, 58, 60–62, 64, 66, 67 | Expansion, sieves, transfer operators, zeta functions | No-go | Solvable branch group; averaged operators are blind; zeta cannot see escape; summable weight $\pi$ |
| 14, 18, 21, 31–33, 35–39, 44, 45 | Percolation, local lemma, coding, list decoding, games, dimension | No-go, conditional | Sparsity is not exclusion; list-decoding bound implies Collatz; round 50's (AC)+(CYC) |
| 13, 80–85 | Make almost-all results pointwise | Partial | No uniform transport; pointwise Benford; renewal monotonicity |
| 75–79, 96 | Residue descent, inverse-tree coverage | No-go, restatements | $2^L q - 1$ defeats finite descent; coverage cannot tell components apart; the Krasikov–Lagarias exponent program cannot conclude |
| 68, 71, 72, 73 | Integer image of the parity conjugacy | Theorems, restatement | Integer image exactly when the canonical residue is eventually constant; autoconjugacy pairing |
| 63, 86–89 | Exclude cycles by divisibility | Partial | Christoffel coprimality; not universal; abc gives finiteness only |
| 90–95, 97 | Verification, SAT, MILP, meet-in-the-middle, statistics | Resource walls, negative | SAT is never UNSAT ($2^{R+1} - 1$); byte and state walls; extremes are typical |
| 98–100 | $qx+1$ phase diagram, neighbouring systems, casework | No result | Not run to a verdict |

## Open questions and directions

**Directions from the problem page.**

1. **Small-corner extinction (AC) for structured words.** Eventually periodic words, words over $\{1,2\}$, and Sturmian words along the convergents of $\log_2 3$.
2. **Adaptive-jump extinction.** Let $J(n) = T^{\lfloor \log_2 n \rfloor + 1}(n)$ in the shortcut map. Show $\min_{j \le B} J^j(n) < n$ for all $n > 1$ and some fixed $B$. The jump collapses the whole $2^L - 1$ chain into one step, since $J(2^L - 1) = 3^L - 1$. The statement would prove Collatz by strong induction.
3. **An explicit summable weight.** Find a finite-state $\pi > 0$, summable, with $P\pi \le \pi$, where $(P\pi)(m) = \pi(2m) + \mathbf{1}_{m \equiv 2 \ (3)}\, \pi((2m-1)/3)$. Some such $\pi$ exists if and only if Collatz holds (round 67). An unrestricted $\pi$ is just the hitting time, so only an explicit one is progress. This is the one form that excludes cycles and divergence at once.
4. **Cycles alone.** Show $2^{A(w)} - 3^{|w|}$ never divides $C_w$ except for repetitions of $(2)$. The Christoffel case is done; the distributed-defect case remains.

**From the zero-trace branch.**

- Prove $\ell_k \le \lfloor (k+1)/3 \rfloor$, or find the true growth rate of $\ell_k$.
- The two surviving first-wrap cases: primitive-wrap descent ($Y = 0$) and the high-carry escape $c \ge 64^3$.
- A global synchronization theorem tying a least counterexample to the subsystem. Without it, even the full bound excludes nothing.

**Other open targets.**

- A carry-sensitive rank satisfying round 17's three inequalities for the rewriting system.
- The window $1 \le c < 1.7095$ for $\nu(N)$.

**Open in the literature.**

- López–Stoll beyond Example 6: no uniform mechanism is known, and the real and 2-adic values are not shown to agree.
- Their 2009 questions:
  - Is there an aperiodic $v$ with $\Phi(v)$ eventually periodic?
  - Does $\Phi$ send Sturmian words to words of full complexity?
  - Are the values of their devil's staircase at irrationals transcendental?
- Terras's coefficient stopping-time conjecture.
- Seifert's conjecture on the cycles of $T$ on $\mathbb{Z}$.
- Roosendaal's residue conjecture.

## Papers and artifacts

None of these has been refereed.

- **Affine compression and rational-base traces in the Collatz problem** (Anton Shakov, August 2026).
  - Builds an exact compression framework in which a least counterexample is minimal across its whole inverse tree.
  - Isolates the $81/64$ subsystem and proves a conditional chain: the trace bound implies the subsystem terminates.
  - An audit found 23 statements. Two of them, the descending-diamond criterion and the quotient-error transform, carry no proof.
- **Arithmetic rigidity and limiting transfer operators in the $3x+1$ problem** (July 2026).
  - On cycles: an integer-cycle criterion, an adaptive-window bound, and a no-go for uniqueness-only arguments (they are compatible with more than $2^{40021417064}$ solutions).
  - On Krasikov–Lagarias: their programs are recast as nonlinear Perron problems on $2 + 3\mathbb{Z}_3$.
  - Contains the false group-ring claim corrected in Results, item 5.
- **Accumulation points for the Collatz conjugacy map in $\mathbb{R}$.** Results, item 1. The repository holds the PDF only.

The working folders:

- **`rounds/`** holds the write-ups for rounds 1–4 and the outputs of rounds 6–102. It also has a per-round digest of what each round proved, refuted and left open, and the text of all 100 approaches.
- **`compute/`** holds exact-integer Python for the zero-trace system: an independent traversal, the meet-in-the-middle deciders, the count tables, the growth law, and the Smith-normal-form check of the correction.
- **`scripts/`** holds bookkeeping tools, including a structural LaTeX checker for proof coverage.
- **`agent-code/`** holds two later agent efforts:
  - An **all-depth audit**: a report with exact certificates and a Lean blueprint that deliberately contains `sorry`. Its main result is **certified**: a proved reduction plus an exact finite computation. It shows that in the negative ($3x-1$) target-one barrier language, every positive terminal strict barrier word is $1^r$. It is not a proof of Collatz.
  - A **proof ledger** (statements tagged proved, certified, conditional or refuted), with notes and probe programs on cycles, inverse fibers and synchronization.

## References

- R. Terras, *A stopping time problem on the positive integers*, Acta Arith. 30 (1976), 241–252.
- D. J. Bernstein and J. C. Lagarias, *The $3x+1$ conjugacy map*, Canad. J. Math. 48 (1996), 1154–1169.
- J. López and P. Stoll, *The $3x+1$ conjugacy map over a Sturmian word*, Integers 9 (2009), A13; and *The $3x+1$ periodicity conjecture in $\mathbb{R}$*, arXiv:2101.12747 (2021).
- T. Tao, *Almost all orbits of the Collatz map attain almost bounded values*, arXiv:1909.03562 (2019); Forum Math. Pi 10 (2022).
- C. Hercher, *There are no Collatz $m$-cycles with $m \le 91$*, J. Integer Seq. 26 (2023), 23.3.5.
- D. Barina, *Improved verification limit for the convergence of the Collatz conjecture*, J. Supercomput. 81 (2025), Art. 810.
- O. Rozier and C. Terracol, *Paradoxical behavior in Collatz sequences*, arXiv:2502.00948; Discrete Math. (2026).
