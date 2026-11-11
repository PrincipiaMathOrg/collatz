# Continuation report: exact macrosemantics, reverse-tree compression, and the synchronization barrier

**Prepared:** 14 August 2026  
**Status:** rigorous continuation of `collatz_paper_comparative_audit.md`; no full proof of the Collatz conjecture is claimed.

## Executive update

The main comparison has become sharper.

- Yolcu–Aaronson–Heule (YAH) had already proved termination of every one-rule-deleted subsystem of their eleven-rule rewrite system. In particular, removing the exceptional odd rule was already covered by a one-dimensional matrix certificate. The original paper leaves **relative termination of that rule in the complete system**, equivalently Collatz itself.
- The supplied ordinal manuscript gives a valid, elementary rank below \(\omega^3\) for the other ten rules and a valid arithmetic theory of terminal/barrier exponent words. Its value is transparency and new arithmetic structure, not a previously unknown deletion-termination result.
- The ten-rule subsystem is not merely terminating: on canonical strings it has a unique normal form, namely the binary numeral for the odd part of the represented integer. Therefore one exceptional rewrite followed by complete ten-rule normalization is exactly one accelerated odd Collatz step, independent of normalization order.
- This makes the bridge to the original approach exact. It also shows the limit of that bridge: the quotient macrograph is the accelerated Collatz graph itself. Removing syntactic nondeterminism does not create a descent theorem.
- A new seed-compression argument replaces exponential word enumeration by a linear deterministic scan. An exact run now proves that the only terminal/barrier word of every length \(r\le 10^{10}\) is the trivial word \(1^r\). This is a derived-language bound, not a verification of all ordinary Collatz seeds up to \(10^{10}\), and it remains finite.
- Arbitrary-target terminal duality is exact, but it exposes a negative-cycle obstruction. For example, the positive \(U_-\)-cycle \(5\to7\to5\) makes \((1,2)^N\) a nontrivial barrier word terminal at target \(5\) for every \(N\). Varying the target cannot by itself solve synchronization.
- A strong rigidity theorem now quantifies the synchronization failure: two target-terminal prefixes on one barrier ray, at lengths \(r\) and \(r+\ell\), force the intervening word to be a negative-map cycle whenever \(\ell=o(2^r)\) (with an explicit inequality). Thus ordinary compactness or reasonably dense recurrence collapses into periodic negative shadows rather than producing the needed nonperiodic certificate.

The work has therefore advanced both positive and negative knowledge. The all-depth terminal-tree theorem is supported enormously farther, and the rewrite/arithmetic bridge is now exact. At the same time, the missing synchronization theorem is more clearly seen to require **rate-matched, nonperiodic recurrence**, not generic \(3\)-adic compactness.

## 1. Result comparison after the continuation

| Issue | Original YAH paper | Supplied ordinal manuscript | Continuation result | What is still missing |
| --- | --- | --- | --- | --- |
| Eleven-rule encoding | Constructs it and proves strong normalization equivalent to Collatz | Reuses it | Exact quotient semantics proved | No descent on the quotient graph |
| Ten-rule deletion | Already certified terminating | Gives \(\Psi<\omega^3\) | Unique canonical normal form and confluence | Nothing for this subsystem |
| Exceptional rule | Identifies relative termination as sufficient | Sole rule not oriented by \(\Psi\) | Consecutive exceptional phases carry the exact accelerated valuation word under arbitrary schedules | A well-founded macro-rank or equivalent termination certificate |
| Terminal duality | Not developed | Target \(1\), structural theory, search through 24 | Arbitrary targets, exact two-ended cylinder, reverse search through 78, seed certificate through \(10^{10}\) | All-depth target-1 exclusion |
| Link to positive orbits | Simulation theorem, but no terminal language | Explicitly left open | Every exponent word is reachable; terminal words are exactly special endpoint cylinders | Force one hypothetical counterexample orbit into suitable cylinders |
| Synchronization | Not present | Acknowledged gap | Record-time dichotomy, finite countermodels, and subexponential-gap rigidity | Rate-matched nonperiodic recurrence |
| Cycles | Not excluded | Not excluded | Positive and negative cycle languages cleanly separated | Exclude nontrivial positive \(U_+\)-cycles |

The fairest high-level assessment remains: the manuscript adds a transparent phase rank and a genuinely new terminal-carry theory, but it does not yet move the original rewrite system across its exact residual target—relative termination of the exceptional rule.

## 2. Exact macrosemantics of the rewrite approach

Let \(E:\mathtt{t.}\to\mathtt{2.}\) be the exceptional odd rule and let \(R_0\) be the other ten rules.

### 2.1 Canonical confluence of \(R_0\)

For a canonical string \(s\) representing \(n\), every maximal \(R_0\)-reduction ends at

\[
\mathsf B(\operatorname{odd}(n)),
\]

the unique pure-binary representation of the odd part of \(n\).

Termination is supplied by the manuscript's rank

\[
\Psi(s)=\omega^2 q(s)+\omega I(s)+b(s)<\omega^3.
\]

To identify the normal form, observe that an \(R_0\)-normal canonical string cannot contain a ternary digit: the leftmost such digit either triggers a boundary conversion or has a binary digit to its left and triggers a commutation. A pure-binary normal form cannot end in binary zero, because the erasure rule would apply. It therefore represents an odd integer. Value preservation by the auxiliary rules and exact division by two at erasures force that odd integer to be \(\operatorname{odd}(n)\). Uniqueness of binary representation then gives confluence on canonical strings.

### 2.2 The functional macrorelation

For odd \(n>1\), define a normalized macrostep by

\[
\mathsf B(n)\xrightarrow{E}s\xrightarrow{R_0^*}\mathsf B(m),
\]

where the last phase is maximal. It is normalization-order-independent and

\[
m=U_+(n)=\frac{3n+1}{2^{v_2(3n+1)}}.
\]

If \(a=v_2(3n+1)\), the phase contains one exceptional step and exactly \(a-1\) terminal-zero erasures.

More strongly, complete normalization between exceptional occurrences is unnecessary. In any arbitrary rewrite schedule, if \(k_i\) zero erasures occur between consecutive exceptional steps, then

\[
a_i=1+k_i=v_2(3n_i+1),
\qquad n_{i+1}=U_+(n_i).
\]

Thus every infinite full rewrite derivation projects to an infinite accelerated odd Collatz orbit, and every such orbit lifts to a normalized macroderivation. This closes the manuscript's representational bridge, but it also proves that the missing macro-descent is exactly the original number-theoretic difficulty.

### 2.3 Exact ordinal lift—and why larger ordinals are not enough

If one had any semantic rank \(H\) on positive odd integers satisfying

\[
H(U_+(n))<H(n)\quad(n>1),
\]

then every rewrite rule would be oriented by

\[
\widehat\Psi(s)
=\omega^3 H(\operatorname{odd}(\operatorname{Val}(s)))+\Psi(s).
\]

The ten auxiliary rules preserve the leading semantic component and decrease \(\Psi\); the exceptional rule decreases \(H\), which dominates the lower \(\omega^3\) block. Conversely, if Collatz is true, accelerated hitting time itself is a natural-valued \(H\). Hence an *extensional* rank below \(\omega^4\) already suffices. The hard problem is a finitely described, provably decreasing \(H\), not access to a taller ordinal notation system.

## 3. Exact terminal cylinders and their reachability meaning

For an exponent word \(w=(a_0,\ldots,a_{r-1})\), put

\[
A_k=\sum_{i<k}a_i,
\qquad C_0=0,
\qquad C_{k+1}=3C_k+2^{A_k}.
\]

Every positive exponent word is realized by one odd residue class modulo \(2^{A_r+1}\). Thus rewrite reachability imposes no finite-word restriction. Terminality is the additional endpoint condition

\[
3^r\mid C_r+2^{A_r},
\]

equivalently, the forward endpoint is \(-1\pmod{3^r}\).

If the same word is an exact negative-map trajectory

\[
3m_k-1=2^{a_k}m_{k+1},\qquad m_r=1,
\]

then every positive forward realization is parametrized by a sufficiently large even \(L\):

\[
n_k=2^{A_r-A_k}3^kL-m_k,
\qquad
3(n_k+m_k)=2^{a_k}(n_{k+1}+m_{k+1}).
\]

The endpoints are

\[
n_0=2^{A_r}L-m_0,
\qquad n_r=3^rL-1.
\]

This is the precise bridge sought between the arithmetic word theory and genuine rewrite macrosegments. It shows that terminal/barrier words label infinite arithmetic cylinders of **uniform rising excursions**. It does not show that one fixed hypothetical counterexample orbit ever enters those cylinders.

## 4. Seed compression and the finite exclusion through \(10^{10}\)

Assume a nontrivial terminal/barrier word exists and choose one of globally minimal length \(r\). Let \(m_0\) be its initial \(U_-\) value and put

\[
B=A_r-r,\qquad \beta=\log_2 3-1.
\]

The manuscript's activation estimate and first-exponent theorem give

\[
0<m_0-1<\frac B2<\frac{\beta r}{2},
\qquad m_0\equiv1\pmod4.
\]

The exact integer inequality \(3^{306}<2^{485}\) proves

\[
\beta<\frac{179}{306}.
\]

Therefore a counterexample of length \(r\le R\) must begin at a deterministic seed satisfying

\[
612(m_0-1)<179R,
\qquad m_0\equiv1\pmod4.
\]

This reduces a bounded word problem with exponentially many syntactic words to \(O(R)\) exact deterministic \(U_-\)-orbits.

The checker follows each such seed for at most \(R\) steps. It rejects only when one of the following has happened:

1. the rational certificate \(306A_k\ge485k\) proves that the true prefix barrier \(A_k<k\log_2 3\) has failed;
2. a state repeats, making a later first hit of \(1\) impossible by determinism;
3. the path reaches \(1\) but violates already-proved necessary conditions for a globally shortest candidate;
4. the path has not hit \(1\) by step \(R\), so it cannot represent a candidate of length at most \(R\).

Arithmetic overflow is separately fatal to the certificate and is reported. The run at \(R=10^{10}\) produced:

```text
candidate seeds       731,209,150
barrier failures      731,209,148
cycles                2  (seeds 5 and 17)
cap survivors         0
overflows             0
reaches 1             0
necessary hits        0
maximum resolution    258 steps (seed 706,557,957)
largest value         64 bits (seed 2,672,464,025)
```

The bound derivation, endpoint count, code logic, and complete run were independently audited and the output was reproduced exactly.

Consequently:

> **Finite exclusion theorem.** For every \(1\le r\le10^{10}\), the only word satisfying all strict prefix barriers and target-1 terminal divisibility is \(1^r\).

The proof is conditional only on the manuscript's audited minimal-word lemmas and the transparent exact computation. It is not an all-depth proof, and its cutoff is a word length rather than an ordinary starting-value range.

## 5. An all-depth reverse-excursion reformulation

For a shortest candidate, reverse the trajectory from its terminal \(1\). With \(\alpha=\log_2 3\), define

\[
M_t=m_{r-t},
\qquad E_t=(A_r-A_{r-t})-\alpha t.
\]

Then

\[
M_{t+1}=\frac{2^{b_{t+1}}M_t+1}{3},
\qquad E_{t+1}=E_t+b_{t+1}-\alpha,
\]

with exponent parity forced by \(M_t\bmod3\). The all-depth terminal-tree theorem is equivalent to showing that no exact path from \((M_0,E_0)=(1,0)\) can remain in the positive excursion region

\[
E_t>0
\]

and then hit the narrow target strip

\[
0<E_t<\beta,
\qquad M_t\equiv1\pmod3.
\]

An exact normalized cocycle is

\[
Z_t=M_t2^{-E_t}
=1+\frac13\sum_{j=1}^t2^{-E_j}.
\]

At a target hit this yields \(M_t<(t+3)/2\). The reformulation is useful because it replaces words by a positive excursion with an arithmetic target. It also explains why a fixed-modulus automaton is incomplete: \(g\) consecutive reverse unit steps occur exactly when \(3^g\mid M-1\), so unbounded \(3\)-adic precision is intrinsic.

## 6. What arbitrary targets reveal about synchronization

For a fixed positive odd target \(y\), terminality generalizes exactly:

\[
3^r\mid C_r+2^{A_r}y
\quad\Longleftrightarrow\quad
w\text{ is an exact }U_-\text{ trajectory ending at }y.
\]

If a positive \(U_+\)-block \(Y_0\to\cdots\to Y_r=X\) and a positive \(U_-\)-block \(m_0\to\cdots\to m_r=y\) share the word, then for one positive even integer \(s\),

\[
Y_k+m_k=3^k2^{A_r-A_k}s,
\]

and in particular

\[
Y_0+m_0=2^{A_r}s,
\qquad X+y=3^rs.
\]

This generalization is exact, but three new theorems show why it is not a shortcut to a proof.

### 6.1 Periodic negative shadows

Every positive \(U_-\)-cycle has total exponent \(A<r\log_2 3\). After a cyclic rotation at a maximal drift, every prefix of every repetition satisfies the strict barrier. The repeated word is terminal at the chosen cycle point.

The smallest example is

\[
5\xrightarrow{1}7\xrightarrow{2}5.
\]

Thus \((1,2)^N\) is barrier and target-5 terminal at every length \(2N\). Another cycle begins at \(17\) and has word \((1,1,1,2,1,1,4)\). Consequently, a target-general exclusion theorem is false unless it explicitly removes periodic negative-shadow languages. The all-ones target-1 family is only the trivial member of this broader phenomenon.

The same example produces positive finite countermodels to any local inference from a long barrier block to target-1 terminality. For every \(N\), the seed

\[
Y_N=2^{3N+1}-5
\]

has exact first \(2N\) exponents \((1,2)^N\), satisfies every prefix barrier, and ends at

\[
X_N=2\cdot3^{2N}-5,
\qquad v_3(X_N+1)=0.
\]

The seed changes with \(N\), so this is not a single divergent positive orbit. It is nevertheless a decisive refutation of every argument based only on an isolated long positive block, the barrier inequalities, and a largeness threshold.

### 6.2 Record-time extraction gives only half of synchronization

For one infinite exponent sequence define

\[
H_n=A_n-n\log_2 3,
\qquad q_n=\frac{3^n}{2^{A_n}}.
\]

A length-\(r\) block beginning at \(j\) has every prefix barrier exactly when

\[
H_{j+k}<H_j\qquad(1\le k\le r).
\]

If \(H_n\) is unbounded below, arbitrarily long barrier blocks occur. If some barrier length \(r\) never occurs on a positive orbit, then the exact affine recurrence instead gives

\[
Y_n<(3/2)^r\left(Y_0+\frac n3\right).
\]

Hence a hypothetical unbounded orbit has a rigorous dichotomy:

1. it contains barrier blocks of arbitrary length; or
2. it is a critical escape of at most linear size, with uniformly bounded multiplicative ratios \(q_n/q_i\).

Neither alternative supplies the endpoint congruence. The second alternative is itself not currently excluded.

### 6.3 Terminal recurrence is too rigid at ordinary rates

Suppose one barrier ray has a target-\(y\) terminal prefix of length \(r\) and another of length \(r+\ell\). If

\[
\frac{\ell}{3\,2^r}+\frac{y}{2^r}+\frac{y}{3^r}<1,
\]

then the intervening \(\ell\)-word is an exact positive \(U_-\)-cycle from \(y\) back to \(y\).

The proof combines the two terminal divisibilities into

\[
3^{r+\ell}\mid D_v(y)-3^\ell y
\]

for the intervening word \(v\), while the prefix barriers bound the absolute value of the right-hand side below \(3^{r+\ell}\). It must therefore vanish exactly.

For fixed \(y\), any nonperiodic pair of terminal prefix lengths must have gaps on the order of at least \(2^r\). For \(y=1\), consecutive sufficiently deep terminal prefixes force the next exponent to be \(1\), and subexponentially spaced terminal recurrence eventually becomes all ones. This is much stronger than saying that naïve \(3\)-adic compactness is inadequate: it shows that recurrence at the most natural rates produces precisely the periodic escape that a proof must avoid.

## 7. A precise conditional completion theorem

The current approach would become a full proof if the following three independent assertions were established.

1. **Positive-cycle exclusion.** The accelerated positive map \(U_+\) has no periodic orbit other than \(1\).
2. **All-depth targeted exclusion.** For target \(1\), every sufficiently long terminal/barrier word is all ones. More generally, for finitely many chosen targets, every sufficiently long targeted word lies in a classified periodic negative-shadow language.
3. **Nonperiodic synchronization.** Every unbounded positive orbit contains arbitrarily long blocks satisfying both the prefix barrier and one of those terminal congruences, and the blocks are outside the classified periodic languages.

A bounded orbit avoiding \(1\) would contradict (1); an unbounded orbit would contradict (2) through (3). The manuscript advances item 2 finitely, now through \(10^{10}\), but proves none of these three assertions at all depths. Record extraction proves only the barrier half of item 3 and leaves the critical linear-escape case.

This decomposition is important for evaluating future claims. A proof of terminal-tree exclusion alone is not a Collatz proof. A recurrence argument that produces only all-ones or negative-cycle shadows is also insufficient. A barrier argument does not exclude positive cycles because a full positive cycle satisfies the opposite total inequality \(2^A>3^r\).

## 8. The undecidability analogy, stated at the right logical level

The authors' observation is useful, but “Collatz is only one input” needs a quantifier correction. The ordinary conjecture fixes one transition rule but quantifies over **all positive starting values**. Generalized undecidability results usually vary a program, a piecewise-affine map, a rewriting system, or another parameter as part of the input and then ask about one or more seeds. Thus Collatz is one fixed *program instance*, not one finite execution instance.

Undecidability of the family means there is no uniform algorithm deciding every member. It does not prevent a proof for a distinguished fixed member. Fixed instances inside undecidable families are commonly resolved in one of four ways:

1. a finite trace proves that a particular program halts;
2. a recurrent state or invariant set proves that a particular program does not halt;
3. a machine-checked finite certificate covers all cases of that fixed instance;
4. a special algebraic structure supplies an invariant unavailable uniformly over the family.

The Busy Beaver \(S(5)\) project is a particularly close methodological precedent: the general problem is uncomputable, yet one fixed finite frontier was resolved by a large portfolio of machine classifications, specialized deciders, and independently checkable proof artifacts. The analogy supports a **Collatz-specific certificate portfolio**. It does not imply that brute force over longer trajectories will eventually become a proof.

There is also an important asymmetry. A single halting-machine instance has a finite execution trace. Collatz asks for termination from infinitely many seeds, so a successful certificate must compress that infinite family. Plausible compression mechanisms include:

- a finite covering of residue cylinders, each with certified descent;
- a well-founded ranking function on a symbolic quotient;
- a finite union of well-founded transition invariants covering the transitive closure;
- a well-quasi-order that turns infinitely many reverse states into a finite basis;
- a minimal-counterexample theorem reducing all cases to a finite obstruction set;
- a proof-producing search whose generated certificate is checked by a small independent kernel.

This is exactly how the undecidability meditation should guide the present program: look for a nonuniform structural certificate for this fixed eleven-rule system. The new \(\Psi\) is already one such certificate for the representational subsystem. The missing certificate must cover exceptional macrosteps uniformly over infinitely many numerical states.

## 9. Twelve updated directions, with concrete proof obligations

### Direction 1 — Prove a counted reverse-tree bound

Let \(D(m)\) count exponents greater than one before a terminating \(U_-\)-orbit first reaches \(1\). A globally shortest terminal/barrier candidate satisfies \(m_0-1<d=D(m_0)\). Therefore any universal bound

\[
D(m)\le m-1
\]

on terminating paths would immediately prove all-depth exclusion. Computation suggests the stronger \(2D(m)\le m-1\), but this is presently only a conjectural target. Ordinary induction on \(m\) fails because a barrier-compatible macrosegment can increase the state. A proof would need amortized credit, a reverse-tree injection, or a symbolic valuation invariant.

An exact stress test classified all 50,000,000 odd seeds below \(10^8\): 16,341,560 reach \(1\), 33,658,440 enter a detected non-1 cycle, and none is unresolved or violates \(2D(m)\le m-1\). Equality occurs only at \(3\to1\). Empirically, every tested trajectory with \(D(m)\ge2\) even satisfies \(7D(m)\le m-1\), with equality at \(15\to11\to1\); this sharpening is not proved.

Writing \(z=(m-1)/2\) gives the exact integer map

\[
G(z)=
\begin{cases}
3z/2,&z\text{ even},\\
(\operatorname{odd}(3z+1)-1)/2,&z\text{ odd}.
\end{cases}
\]

Here \(D(m)\) is exactly the number of odd \(z\)-states before reaching \(0\). Odd states contract strictly, while even states make uncharged \(3/2\)-expansions. Hence a least counterexample must start even and sustain a genuine excursion above its initial value before returning below it. This localizes the obstruction to controlling the free expansion/charged contraction balance.

The bound is proved for trajectories with one nonunit exponent and for trajectories whose compressed nonunit blocks decrease monotonically. Several tempting extensions are false: compressed blocks can grow (for example \(53\to79\to59\)), individual activation groups can contribute less than \(2\), and bounded residue corrections to the linear budget cannot absorb the unbounded increase at a unit step. The promising certificate classes are therefore phase-dependent Bellman supersolutions, slack-and-carry induction, and a genuinely nonlocal base-3 carry lemma.

### Direction 2 — Prove target-strip avoidance in the reverse excursion

Use the exact \((M_t,E_t)\) formulation and prove that a positive excursion from \((1,0)\) never reaches

\[
0<E_t<\beta,qquad M_t\equiv1\pmod3.
\]

The cocycle \(M_t2^{-E_t}=1+\frac13\sum2^{-E_j}\) and Sturmian workload are exact starting points. This formulation may support an irrational-rotation argument, a Diophantine lower bound, or a well-quasi-order retaining \(v_3(M-1)\).

### Direction 3 — Build a symbolic reverse-tree finite basis

A fixed modulus cannot see arbitrarily long unit runs. Replace \(M\bmod3^q\) by a symbolic state such as

\[
(v_3(M-1),\; M/3^{v_3(M-1)}\bmod 3^q,\;K_t,\;t\bmod q')
\]

and search for a monotone subsumption relation. The proof obligation is a genuine well-quasi-order plus compatibility of transitions—not merely experimental stabilization of a finite quotient.

### Direction 4 — Synthesize a bounded-block macro-rank

Instead of demanding one-step descent, find fixed \(K\) and a rank \(H\) such that every odd \(n>1\) has some \(1\le j\le K\) with

\[
H(U_+^j(n))<H(n).
\]

Exact residue cylinders can verify the intermediate exponent patterns. This is one of the cleanest ways to convert automated search into a uniform proof, but no finite \(K\) or candidate rank is presently known.

### Direction 5 — Use a disjunctive transition invariant

Cover the transitive closure of reachable macrosteps by a finite union of well-founded relations: ordinary size descent, valuation discharge, residue traps, terminal-shadow blocks, and perhaps separate cycle-breaking relations. Coverage of **all transitive pairs**, rather than one-step edges, is the crucial Podelski–Rybalchenko obligation.

### Direction 6 — Run proof-producing CEGAR/PDR on exact cylinders

Abstract macrosteps by exponent, selected \(2\)- and \(3\)-adic residues, drift/workload, and bounded carry data. Repeatedly refine recurrent abstract components using concrete counterexamples. A success must emit either a ranking certificate or a finite inductive invariant checked independently; disappearance of states at several tested moduli is only evidence.

### Direction 7 — Rule out the critical at-most-linear escape

The record-time theorem isolates a previously hidden alternative: an unbounded orbit with no arbitrary long barrier blocks must have at most linear growth and uniformly bounded \(q_n/q_i\). Proving that such an orbit cannot exist would guarantee arbitrary barrier blocks on every unbounded orbit. This still would not prove terminal synchronization, but it closes a necessary half-gap.

### Direction 8 — Seek rate-matched, nonperiodic synchronization

The target theorem must force

\[
v_3(X+y)\ge r
\]

for endpoints of length-\(r\) barrier blocks, at a rate tied to the block length. Ordinary compactness gives only fixed moduli; dense nested terminal prefixes force periodic negative shadows. A viable statement may need changing block starts, a carefully varying finite target family, or a two-ended invariant using \(Y_k+m_k\).

### Direction 9 — Classify and quotient periodic negative-shadow languages

Before using arbitrary targets, classify the relevant positive \(U_-\)-cycles and the barrier rotations of their words. Then formulate synchronization modulo those languages. This prevents the target extension from being refuted by \((1,2)^N\) and makes “nontrivial” mathematically precise.

### Direction 10 — Separate positive-cycle exclusion

A positive \(U_+\)-cycle has \(2^A>3^r\), so it is invisible to the full-word barrier program. Use the ordinary cycle equation, congruence restrictions, lower bounds, or a dedicated rewrite certificate. Do not fold this obligation into an argument designed only for unbounded divergence.

### Direction 11 — Search fixed-\(d\) Diophantine strata

Group the word at its \(d\) nonunit exponents. Exact divisibilities

\[
3^{g_j}\mid2^{c_j}x_j-1,
\qquad
2\cdot3^{g_d-1}\mid c_d
\]

make each fixed \(d\) a finite-dimensional exponential Diophantine problem. Eliminating every fixed \(d\) would not by itself give a uniform theorem, but it can reveal the missing monotone quantity and produce machine-checkable strata.

### Direction 12 — Treat the proof as a certificate portfolio

Combine simple ordinal cleanup, normalized macrosemantics, residue-cylinder descent, size-change relations, reverse-tree arithmetic, and a separate cycle certificate. The original paper already demonstrates that automated termination tools find different proofs for different rule deletions. The fixed-instance undecidability analogy suggests embracing that heterogeneity while insisting on a small independent checker for every computational component.

## 10. Research priority after these results

The work should now proceed in this order:

1. Attempt the counted reverse-tree inequality and target-strip avoidance; either would convert the \(10^{10}\) theorem into an all-depth theorem for the manuscript's special language.
2. In parallel, attack the critical linear-escape alternative and formulate a synchronization theorem that survives the explicit periodic-shadow counterexamples.
3. Build a proof-producing symbolic quotient retaining unbounded \(3\)-adic valuation rather than increasing a fixed modulus blindly.
4. Search bounded-block and disjunctive semantic ranks on the exact accelerated macrorelation.
5. Keep positive-cycle exclusion as a separate proof track.

Even success on step 1 would not finish Collatz without steps 2 and 5. Conversely, a direct semantic macro-rank from steps 3–4 could bypass terminal synchronization entirely and would lift automatically through \(\widehat\Psi\).

## 11. Bottom line

The approach is now better understood and significantly stronger as a partial program:

\[
\text{transparent ten-rule rank}
+\text{ exact quotient semantics}
+\text{ exact terminal cylinders}
+\text{ exclusion through }10^{10}.
\]

But the remaining logical chain is still

\[
\text{all-depth exclusion}
+\text{ nonperiodic synchronization}
+\text{ positive-cycle exclusion}.
\]

The most encouraging new fact is the seed compression: a globally minimal bad word would have to arise from a remarkably small, rigid deterministic \(U_-\) seed, and every such seed forced by lengths through \(10^{10}\) has now been eliminated exactly. The most sobering new fact is the synchronization rigidity: the obvious compactness and arbitrary-target moves naturally converge to negative periodic shadows, not to the nonperiodic target-1 words needed for contradiction.

This is meaningful progress, not a proof. It narrows the all-depth arithmetic problem to a clean reverse-excursion target and narrows the orbit bridge to a clearly stated rate-matched recurrence theorem.

## Primary references

- E. Yolcu, S. Aaronson, and M. J. H. Heule, *An Automated Approach to the Collatz Conjecture*, arXiv:2105.14697; *Journal of Automated Reasoning* 67 (2023), Article 15.
- A. Shakov, *Ordinal Descent and Terminal Carry Duality in a Mixed-Base Collatz System*, supplied manuscript (August 2026).
- J. C. Lagarias, *The 3x+1 Problem: An Overview*, arXiv:2111.02635.
- T. Tao, *Almost all orbits of the Collatz map attain almost bounded values*, arXiv:1909.03562.
- S. A. Kurtz and J. Simon, *The Undecidability of the Generalized Collatz Problem*.
- J. H. Conway, *FRACTRAN: A Simple Universal Programming Language for Arithmetic*.
- H. Zantema, *Termination of Term Rewriting by Semantic Labelling*.
- A. Podelski and A. Rybalchenko, *Transition Invariants*.
- C. S. Lee, N. D. Jones, and A. M. Ben-Amram, *The Size-Change Principle for Program Termination*.
- The bbchallenge Collaboration, *Turing machines deciders, part I* and *Determination of the fifth Busy Beaver value*.
