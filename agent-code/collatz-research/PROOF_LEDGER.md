# Collatz proof ledger

Updated: 2026-08-17, initial dependency audit.

## 0. Conventions

For an odd positive integer (x), let

\[
U(x):=\frac{3x+1}{2^{v_2(3x+1)}}.
\]

For a valuation word (a=(a_0,\ldots,a_{r-1})), put

\[
A_k:=\sum_{i<k}a_i,
\qquad
C_0:=0,
\qquad
C_{k+1}:=3C_k+2^{A_k},
\qquad
q_k:=\frac{3^k}{2^{A_k}}.
\]

An actual positive block satisfies

\[
2^{A_k}x_k=3^kx_0+C_k.
\]

A relative block is a strict barrier block when (q_k>1) for every nonempty prefix. It is target-(1) terminal when (3^r\mid C_r+2^{A_r}), equivalently (3^r\mid x_r+1) for an actual positive block.

## 1. Proof standard

`PROVED` means that every quantifier and sign condition has a complete argument from stated hypotheses. `CERTIFIED` means that the symbolic reduction is proved and the remaining finite proposition is checked by exact reproducible computation. `CONDITIONAL` means that a named unproved statement is present. `REFUTED` requires an explicit counterexample. Numerical evidence is never promoted to a lemma.

## 2. Established spine

| ID | Status | Statement | Role |
|---|---|---|---|
| E1 | PROVED | Positive and negative affine word identities, including concatenation of carries. | Exact symbolic calculus. |
| E2 | PROVED | (3^r\mid C_r+2^{A_r}y) reconstructs an exact positive (3x-1) trajectory ending at odd (y>0). | Turns terminal congruences into ordinary trajectories. |
| E3 | PROVED | Equal-time translation for the negative shortcut map and shell sparsity (N_k\le \min(2^k,B_k+k)). | Uniform counting of simple negative paths. |
| E4 | CERTIFIED | Every finite positive simple negative shortcut path has reciprocal mass (<10.789). | Uses an exact 1001-row certificate and a proved analytic tail. |
| E5 | PROVED modulo E4 | Every simple target-(y) negative barrier path starts below (3^{11}y). | Removes the word-length quantifier for fixed targets. |
| E6 | CERTIFIED | Every positive target-(1) terminal strict barrier word is (1^r). | The paper's all-depth theorem. |
| E7 | PROVED | Collatz is equivalent to stationary inverse-fiber extinction: for every odd (n>1), some (M_r(n)<n). | Exact one-statement global reformulation. |
| E8 | PROVED, source audit in progress | A divergent orbit can be shifted to a global coefficient minimum, after which every nonempty prefix is a strict barrier and (q_k\to\infty). | Supplies barrier blocks of every length. |
| E9 | PROVED modulo E4 | Fixed-deficit reduction. If a strict barrier word \(w=uv\) has \(|u|=d\) and \(3^{|v|}\mid C(w)+2^{A(w)}\), then \(v\) is target-\(1\) terminal and every prefix of \(v\) has coefficient \(q_k(v)>2^{A(u)}/3^d\). Its first-hit negative seed is below \(3^{11}3^d/2^{A(u)}\). | For each fixed \(d\), the near-terminal language is a finite union of a finite stem followed by \(1^*\). |
| E10 | CERTIFIED | Deficit-two classification: if \(r\ge2\), \(w\) is a strict barrier word, and \(3^{r-2}\mid C(w)+2^{A(w)}\), then \(w=1^r\) or \(w=(1,2,1^{r-2})\). | Uses exact coefficient-floor scans at \(4/9\) and \(8/9\); the second family is sharp since its terminal expression is \(13\cdot3^{r-2}\). |

## 3. Target statements

| ID | Status | Statement |
|---|---|---|
| G0 | OPEN | Every positive integer reaches (1). |
| GD | OPEN | No nonperiodic positive orbit diverges. |
| GC | OPEN | No nontrivial positive periodic orbit exists. |

Either `GD + GC` proves G0, or a proof of B1 below proves G0 directly.

## 4. Architecture A, terminal synchronization

| ID | Status | Statement |
|---|---|---|
| A1 | PROVED modulo the cited orbit-sparsity input | Every divergent orbit has arbitrarily long strict barrier blocks, in fact one shifted tail is barrier at all depths. |
| A2 | OPEN | Along a globally least divergent orbit, some barrier block of length \(r\) ends with \(v_3(x+1)\ge r-2\) and is outside the two E10 families. The original target \(v_3(x+1)\ge r\) is stronger than necessary. |
| A3 | OPEN | If all rate-matched target-(1) barrier suffixes are all ones, then the orbit has a smaller coalescing ancestor, is periodic, or reaches the trivial basin. |
| A4 | OPEN | Uniform positive-cycle exclusion. |

E6 contradicts A2 directly. A weaker synchronization result can suffice if it is paired with A3. Barrier abundance without the terminal congruence is not enough.

## 5. Architecture B, inverse fibers

For

\[
M_r(n):=\min\{z>0:z\text{ odd and }U^r(z)=U^r(n)\},
\]

the minima satisfy (M_{r+1}(n)\le M_r(n)\le n).

| ID | Status | Statement |
|---|---|---|
| B1 | OPEN, equivalent to G0 by E7 | No odd (n>1) satisfies (M_r(n)=n) for every (r\ge0). |
| B2 | PROVED | Equal-slope carry return: a compatible word (v) with (C(v)=C(w)+d3^s), (1\le d<n), gives the smaller coalescing ancestor (n-d). |
| B3 | OPEN | Every stationary positive ray has such a finite equal-slope carry return, or an analogous unequal-slope descent with positive score. |

## 6. Architecture C, first crossing and inverse carry

For a shortcut parity word, let (s_k) be its odd count, (ho_k) its canonical dyadic representative, (b_k\in\{0,1\}) the new binary lift bit, and (e_k:=s_k-\lceil k\log_3 2\rceil).

| ID | Status | Statement |
|---|---|---|
| C1 | PROVED | An infinite parity sequence is the parity sequence of a nonnegative ordinary integer exactly when (b_k=0) eventually. |
| C2 | PROVED modulo orbit sparsity | A divergent orbit in normalized barrier coordinates has (e_k\to\infty) and (b_k=0) eventually. |
| C3 | OPEN | A sharp First-Crossing Descent statement, expressed as a negative local-global score or a smaller coalescing ancestor. |
| C4 | OPEN | High-Surplus Carry Innovation: the particular orbit-generated recursion cannot have both (e_k\to\infty) and (b_k=0) eventually without producing descent. |

The bare assertion that (e_k\to\infty) and (b_k=0) eventually are incompatible would itself exclude divergent ordinary orbits and therefore needs orbit-specific arithmetic content. It must not be treated as a purely symbolic lemma.

## 7. Audited obstructions

| ID | Status | Claim that fails or is insufficient | Exact reason |
|---|---|---|---|
| R1 | REFUTED | Arbitrary fixed-target barrier exclusion. | The negative cycle (5\leftrightarrow7) produces ((1,2)^N), target (5), at every depth. |
| R2 | REFUTED as a completion route | Pump a positive cycle repeatedly into target (1). | For a cycle point (x), (w^N1^L) is target-(1) terminal exactly when (3^{sN}\mid x+1), so only finitely many (N) work. |
| R3 | INSUFFICIENT | Finite automata or arbitrary (2)-adic compactness. | Every finite parity word occurs; the eventually zero ordinary-integer lift is nonlocal. |
| R4 | INSUFFICIENT | Random-word drift or entropy. | The needed statement is pointwise on one exceptional ordinary integer. |
| R5 | REFUTED in the earlier project | Unconditional carry or exponent ordering under word transpositions. | Binary modular winding can reverse the real carry order. Explicit witnesses are to be retained in the agent reports. |
| R6 | REFUTED | Replace all prefix barriers by the final inequality \(2^{A_r}<3^r\). | The negative path \(3\xrightarrow{3}1\), followed by three or more unit steps, gives nontrivial target-\(1\) words whose final coefficient is expanding. |
| R7 | INSUFFICIENT | Seek arbitrarily long bounded-deficit target hits from one fixed normalized start. | For every positive path, \(U^r(z)+1\le(3/2)^r(z+1)\). If \(3^{r-d}\mid U^r(z)+1\), then \(z+1\ge2^{r+1}/3^d\). Thus fixed-start bounded-deficit hits have bounded length. Synchronization must move the block start. |

## 8. Immediate proof obligations

1. Force the weakened E10 synchronization event at a moving block start, with the start large enough to satisfy the necessary growth bound but with a word outside the two classified families.
2. Derive an executable exact formula for (M_r(n)) over compatible valuation or parity words, including positivity and exactness.
3. Determine whether first-crossing descent is true. If false, classify the minimal counterexamples and identify the extra hypothesis supplied by stationary rays.
4. Seek a uniform invariant for positive cycles that is not merely a finite local-minimum bound.
5. Test every candidate lemma against trivial-cycle rotations, negative-shadow cycles, arbitrary realizable finite words, and long prefixes of ordinary positive seeds.

## 9. Exact exploratory results

These rows are not promoted to theorems unless a proof or exhaustive certificate is stated.

| Probe | Exact finite result | Interpretation |
|---|---|---|
| Primitive first coefficient crossings | Among 502,523 primitive words of shortcut length at most 28, the only nondescending least representative was the trivial word \(10\) at seed \(1\). | Supports First-Crossing Descent, but this is Terras's global coefficient-stopping assertion and remains unproved. |
| Positive shortcut cycle equations | Through length 19, all 18 cycle-word presentations were repetitions or rotations of the \(1\leftrightarrow2\) cycle. | Sanity check only. |
| Terminal synchronization | For odd seeds through 2001, 150 accelerated steps, and suffix lengths through 24, all 24,329 target-\(1\) barrier suffixes were all ones. | Independent finite check of E6 on sampled ordinary paths. |
| Deficit three | Exact coefficient-floor scans show seeds \(1\) and \(3\) at floor \(8/27\), and only seed \(1\) at floor \(16/27\). | Suggests the four templates \(1^r\), \(1121^*\), \(121^*\), and \(11131^*\) for the next layer; a polished certificate is not yet in the proof spine. |

## 10. Current residual debt

No implication from E1 to E8 presently proves GD or GC. The full proof is reduced exactly to either:

\[
\text{A2/A3 plus A4},
\]

or

\[
\text{B1},
\]

or a proved pair C3 and C4 with a complete reduction to B1. All three routes must preserve the ordinary binary lift and the terminal ternary carry simultaneously.
