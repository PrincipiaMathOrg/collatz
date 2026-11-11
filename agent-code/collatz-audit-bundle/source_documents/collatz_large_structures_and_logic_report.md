# Large structures, first-return matrices, and logical strength

**Prepared:** 14 August 2026  
**Status:** rigorous continuation report; no proof of the Collatz conjecture is claimed.

## 1. Verdict

No full proof was found. The new finite computations and equivalent matrix formulations cannot be promoted to universal termination.

The main advance is a sharper all-depth target. For a negative-map exponent word, a small first-return defect is controlled by one upper-triangular integer matrix and one word-dependent congruence. Under the manuscript's proper-prefix barriers, exact enumeration through length \(24\) found no small-defect residue among \(408{,}434{,}811\) cumulative prefix leaves. A related charged-phase inequality was checked for every admissible quotient state through \(10^9\). Both remain finite evidence.

Even proving the new residue conjecture would close only the manuscript's terminal/barrier subproblem. This route still needs:

1. all-depth target-\(1\) terminal/barrier exclusion;
2. nonperiodic synchronization with a hypothetical positive divergent orbit;
3. separate exclusion of nontrivial positive Collatz cycles.

The rewrite system's exact quotient macrograph is the accelerated Collatz graph, so a direct global rank would bypass those three obligations.

## 2. Exact triangular matrix reduction

For each positive exponent \(a\), define

\[
N_a=\begin{pmatrix}3&1\\0&2^a\end{pmatrix}.
\]

For \(w=(a_0,\ldots,a_{r-1})\),

\[
M_w=N_{a_{r-1}}\cdots N_{a_0}
   =\begin{pmatrix}P&C\\0&Q\end{pmatrix},
\quad
P=3^r,\quad Q=2^A,\quad A=\sum_{i<r}a_i.
\]

The negative accelerated recurrence \(3m_i-1=2^{a_i}m_{i+1}\) composes to

\[
Pm_0=Qm_r+C. \tag{2.1}
\]

Put \(D=Q-P\) and \(L=C+Q-P\). Appending exponent \(a\) gives

\[
L'=3L+(2^a-2)Q, \tag{2.2}
\]

so every nonunit exponent contributes one positive activation group.

If \(m_r=y=m_0-\Delta\), with positive odd endpoints, then

\[
D(y-1)=P\Delta-L. \tag{2.3}
\]

Because \(y-1\) and \(\Delta\) are even and \(\gcd(P,2D)=1\),

\[
P\Delta\equiv L\pmod{2|D|}. \tag{2.4}
\]

A first return necessarily has

\[
2^{A_k}<3^k\qquad(1\le k<r), \tag{2.5}
\]

and a nonunit last exponent.

### Barrier-residue conjecture

Let \(h(w)=\#\{i:a_i>1\}\). Under (2.5), the least positive even solution of (2.4) should satisfy

\[
\Delta\ge h(w). \tag{2.6}
\]

This is stronger than the actual first-return assertion because it uses only coefficient barriers, not intermediate height inequalities.

The barrier is essential: \((2,1,2,1,2)\) has \(h=3\) and least positive even residue \(2\), but fails (2.5) immediately.

The close barrier example

\[
57\xrightarrow{1}85\xrightarrow{1}127
\xrightarrow{2}95\xrightarrow{2}71\xrightarrow{2}53
\]

has \(h=3\), defect \(\Delta=4\), and

\[
P=243,\quad Q=256,\quad C=283,\quad L=296,\quad |D|=13.
\]

Here \(4\) is the least positive even solution of \(243\Delta\equiv296\pmod{26}\). Thus the stronger claim \(\Delta\ge2h\) is false.

For fixed \(\Delta\), let \(N_k=P_k\Delta-C_k\) and \(D_k=Q_k-P_k\). Appending \(a_k\) is the exact matrix update

\[
\begin{pmatrix}P_{k+1}\\D_{k+1}\\N_{k+1}\end{pmatrix}
=
\begin{pmatrix}
3&0&0\\
2^{a_k}-3&2^{a_k}&0\\
-1&-1&3
\end{pmatrix}
\begin{pmatrix}P_k\\D_k\\N_k\end{pmatrix}. \tag{2.7}
\]

This factors over two elementary integer matrices plus a two-state controller recording \(a_k=1\) versus \(a_k>1\). The alphabet is finite, but the determinant \(|2^{A_k}-3^k|\) is unbounded. Appending a letter changes the modulus nondivisibly, and least representatives wrap both ways; that is where the natural induction stalls.

## 3. Exact finite theorem through length 24

`first_return_word_search.cpp` enumerates every prefix satisfying (2.5), every positive even \(\Delta<h\), and every final nonunit exponent allowed by the exact sign-and-magnitude bound. A return endpoint must satisfy

\[
(Q-P)y=P\Delta-C. \tag{3.1}
\]

The sign of both sides and \(y\ge1\) bound the final exponent, so the enumeration is exhaustive.

```text
cumulative prefix leaves       408,434,811
sign-compatible candidates   3,623,175,986
magnitude-compatible          2,243,612,423
divisibility hits                         0
exact violations                          0
```

The \(r=24\) layer alone has \(257{,}978{,}502\) leaves. Hence (2.6) is proved for every word of length at most \(24\), with no seed-size bound. It is not proved for arbitrary length.

Audited hashes:

```text
0260b415a8056eb48dd3353c5bae029944633ae4e5eea3c813e903175837dd54  first_return_word_search.cpp
fa3b1e2e6ccc4ca25b29bf5095566ba17e4895fa2d35c2635752f45915d8426a  first_return_word_search_24.out
```

## 4. Bellman and charged-phase reductions

With \(z=(m-1)/2\),

\[
V(z)=
\begin{cases}
3z/2,&z\text{ even},\\
(\operatorname{odd}(3z+1)-1)/2,&z\text{ odd}.
\end{cases}
\]

Nonunit exponents occur exactly at odd \(z\)-states. If \(y<z\) is the first strict return and \(h\) counts those odd states, the sufficient Bellman inequality is

\[
h\le2(z-y). \tag{4.1}
\]

Decomposing a terminating orbit into successive descending records makes (4.1) telescope to

\[
D(m)\le m-1, \tag{4.2}
\]

where \(D(m)\) counts all nonunit exponents before \(1\). The manuscript proves that a globally shortest nontrivial terminal/barrier candidate would instead have \(m_0-1<D(m_0)\). Therefore (4.1) would close its all-depth terminal/barrier gap.

No violation was found for every \(z\le10^8\) apart from the two known cycle starts, or for \(10^7\) pseudorandom positive 63-bit starts. The closest sequential case was \(240\to233\), with \(h=12\) and twice-drop \(14\). This is evidence only.

### Quotienting all exponent-one phases

Define

\[
\pi(z)=z\left(\frac23\right)^{v_3(z)}.
\]

Every even step \(z\mapsto3z/2\) leaves \(\pi\) unchanged. From \(q=2^sv\), with \(v\) coprime to \(6\), the next charged state is uniquely \(3^sv\). Applying the odd branch and normalizing by \(\pi\) defines a deterministic charged map \(W\), one step per nonunit exponent.

The sufficient quotient inequality is

\[
W^t(q)<q\text{ first}\quad\Longrightarrow\quad
t\le2\bigl(q-W^t(q)\bigr). \tag{4.3}
\]

It was checked exactly for every \(q\le10^9\) with \(3\nmid q\):

```text
starts                  666,666,667
first returns           666,666,665
cycle-minimal starts              2
caps / overflows                  0
violations                        0
```

The sharpest case was \(28\to47\to35\to26\), with three charged steps and twice-drop \(4\). The longest resolved first return had \(89\) charged steps.

## 5. No-go results for simpler large structures

For every positive \(U_-\)-cycle word \(w\) and every \(N\), there is a positive seed that follows \(w^N\) exactly and then reaches \(1\). The construction chooses

\[
y=\frac{2^a+1}{3}
\]

in the cycle point's residue class modulo \(3^{rN}\), using that \(2\) is a primitive root modulo powers of \(3\), and lifts it through the repeated affine cycle.

Thus terminating trajectories can shadow an expanding negative cycle for arbitrarily many blocks. This rules out universal bounded-horizon ordinary-magnitude descent, monotone-size ranks, and abstractions that declare a recurrent negative-cycle component automatically nonterminating. It does not rule out a finite presentation carrying an unbounded symbolic phase or defect.

Let \(P_+\) be the infinite transition matrix of accelerated positive Collatz, with terminal row zero. Collatz is exactly equivalent to a function \(w\ge1\) satisfying

\[
P_+w\le\frac12w. \tag{5.1}
\]

If Collatz holds, \(w(n)=2^{h(n)}\) works, where \(h\) is hitting time. Conversely, (5.1) contradicts an infinite nonterminal orbit. Unrestricted \(w\) therefore stores the unknown answer; a proof needs a finite definition and exact verification.

On unweighted \(\ell^\infty\), the operator has spectral radius \(1\). For \(n_0=2^m-1\),

\[
U_+^j(n_0)=3^j2^{m-j}-1
\]

for \(j<m\), so \(\|P_+^k\|_\infty=1\) for every \(k\). A spectral proof needs a state-dependent weight or quotient.

## 6. Other structures assessed

| Structure | Exact gain | Remaining obstruction |
|---|---|---|
| Original natural/arctic matrices | Many one-rule-deletion certificates | The exceptional macrostep is Collatz |
| Manuscript \(\Psi<\omega^3\) | One rank for all ten auxiliary rules | No semantic \(U_+\)-descent |
| Guarded small matrices | Exact carry and first-exit formulations | Unbounded guards/determinants |
| Charged quotient \(W\) | Removes all unit runs | Expanding excursions and cycles |
| Infinite transition matrix | Exact subeigenvector equivalence | Unrestricted weight is tautological |
| \(81/64\) zero-trace graph | Path bound checked through depth \(16\) | Carry and input synchronization |
| Terminal \(3\)-adic locality | Exact suffix locality | Unbounded prefix height |
| Reverse Sturmian workload | Exact target-strip formulation | Fixed moduli lose unbounded \(v_3\) |
| Cyclic/Lyapunov graphs | Finite proof format | Missing global progress trace |
| Least/greatest fixed points | Exact accessibility formulas | Universal membership restates termination |

The \(81/64\) zero-trace computation was extended from depth \(12\) to \(16\). New longest path lengths are \(4,4,5,5\) at depths \(13,14,15,16\), with no nonzero cycles or degree violations. This strengthens that subsystem only.

## 7. Does deeper logic give the proof?

Collatz is naturally \(\Pi^0_2\):

\[
\forall n\,\exists k\,[U_+^k(n)=1].
\]

The barrier-residue conjecture and finite terminal charge bounds are naturally \(\Pi^0_1\): a false instance has a finite witness. Their low arithmetical complexity does not make them automatic.

| System | Contribution | Verdict |
|---|---|---|
| PA | Induction on words or enriched carries | Adequate for finite algebraic certificates; current invariant fails |
| \(\mathsf{WKL}_0\) | Tree compactness | No useful new \(\Pi^0_2\) strength here |
| \(\mathsf{ACA}_0\) | Orbit/basin sets | Arithmetically conservative over PA |
| Cyclic arithmetic | Finite proof graphs | Progress trace is the missing theorem |
| \(\mathsf{ATR}_0\) | Recursion on proved well-orders | Stronger, but no Collatz well-order is known |
| \(\mathsf{ID}_1\) | Nested inductive definitions | Naming accessibility does not prove coverage |
| ZFC | Strong effective foundation | No Collatz proof or independence result is known |
| True arithmetic/full semantics | Settles true arithmetic semantically | Not a complete effective proof method |
| \(\omega\)-rule | Combines all numeral instances | Nonuniform and hides totality |

Goodstein is the relevant analogy: every individual sequence has a finite hitting time, yet the uniform theorem uses transfinite descent unavailable in PA. Collatz could conceivably have a similar architecture, but no Collatz-specific ordinal assignment, bar, or inductive hierarchy is known.

If Collatz is true, its natural hitting-time rank \(H\) combines with the manuscript's \(\Psi<\omega^3\) to give

\[
\widehat\Psi(s)
=\omega^3H(\operatorname{odd}(\operatorname{Val}(s)))+\Psi(s)
<\omega^4.
\]

So greater ordinal height is not semantically necessary. A stronger system helps only if it proves a concrete carry order, rank, or subeigenvector.

## 8. Bottom line

The best next theorem is:

> Under all proper coefficient barriers, the least positive even return residue modulo \(|2^A-3^r|\) is at least the number of nonunit exponents.

It is finite-word, exact, matrix-based, and independently checkable. Proving it would finish the manuscript's all-depth terminal/barrier exclusion—not Collatz itself without synchronization and positive-cycle exclusion.

### Proved here

- triangular matrix and defect identities;
- Bellman conditional implication;
- exact charged quotient;
- terminating shadows of positive \(U_-\)-cycles;
- infinite subeigenvector equivalence and unweighted spectral radius \(1\);
- barrier-residue exclusion through length \(24\);
- zero-trace extension through depth \(16\).

### Unknown

- all-depth barrier-residue theorem;
- first-return charge inequality;
- \(D(m)\le m-1\) for every terminating negative-map path;
- nonperiodic synchronization;
- positive-cycle exclusion;
- finitely presented global rank/subeigenvector;
- Collatz provability or independence in PA, ZFC, or standard stronger theories.

## References

- E. Yolcu, S. Aaronson, and M. J. H. Heule, *An Automated Approach to the Collatz Conjecture*, arXiv:2105.14697; *Journal of Automated Reasoning* 67 (2023), Article 15.
- A. Shakov, *Ordinal Descent and Terminal Carry Duality in a Mixed-Base Collatz System*, supplied manuscript, August 2026.
- S. A. Kurtz and J. Simon, *The Undecidability of the Generalized Collatz Problem*.
- A. Das, *On the Logical Complexity of Cyclic Arithmetic*, 2020.
- A. Das and L. Melgaard, *Cyclic Proofs for Arithmetical Inductive Definitions*, 2023.
- S. G. Simpson, *Subsystems of Second Order Arithmetic*, 2nd ed., 2009.
- L. Kirby and J. Paris, *Accessible Independence Results for Peano Arithmetic*, 1982.
