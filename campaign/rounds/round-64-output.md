model: GPT-5.6 Pro (Chat mode)
round: 64 -- approach 59, A coercive Koopman eigenfunction
front: proof
sent: 2026-08-16T05:20Z
worked: 67m 42s

---

# 59. A coercive Koopman eigenfunction

The proposed certificate would indeed prove the Collatz conjecture. After pursuing the construction, however, I did **not** obtain a non-circular coercive function satisfying the required inequality. The main finding is sharper than a generic failure: an unrestricted coercive Koopman subeigenfunction is **exactly equivalent** to Collatz, and the natural finite-state, monotone, \(2\)-adically continuous, and bounded-memory candidates can be ruled out rigorously.

What remains is a specific full-prefix carry inequality. I will formulate it precisely below and show that it would complete the proof.

## 1. The exact Koopman certificate

Use the shortcut Collatz map

\[
T(n)=
\begin{cases}
n/2,&n\equiv0\pmod 2,\\[1mm]
(3n+1)/2,&n\equiv1\pmod 2.
\end{cases}
\]

Let

\[
A=\{1,2\},
\]

the terminal \(2\)-cycle, and let the Koopman operator be

\[
Kf=f\circ T.
\]

Existing functional-analytic work already gives several exact reformulations of Collatz: the forward composition operator has been studied on \(\ell^p\) spaces, polynomial fixed points encode cycles, eigenvalue-\(1\) eigenspaces can encode the number of Collatz components, and related \(C^*\)-algebraic irreducibility conditions are equivalent to orbit connectivity. citeturn277877view0turn277877view1turn405887view0turn194517view2 Generic operator dynamics is not enough by itself: for example, hypercyclicity properties of an associated operator can hold independently of whether Collatz is true. citeturn277877view2

The missing ingredient is precisely properness on the ordinary integers.

### Theorem 1 — Coercive Koopman criterion

The following assertions are equivalent.

1. Every positive integer eventually enters \(A\).

2. There is a finite-valued coercive function

   \[
   F:\mathbb N\longrightarrow\mathbb R,
   \qquad
   F(n)\longrightarrow+\infty
   \quad(n\to\infty),
   \]

   and a constant \(\delta>0\) such that

   \[
   F(Tn)\le F(n)-\delta
   \qquad(n\notin A).
   \tag{1.1}
   \]

3. There are a coercive \(F\), constants \(\delta>0\), \(B\ge1\), and a selector

   \[
   r(n)\in\{1,\ldots,B\}
   \]

   such that, whenever the orbit has not already entered \(A\),

   \[
   F\bigl(T^{r(n)}n\bigr)\le F(n)-\delta.
   \tag{1.2}
   \]

#### Proof

Suppose first that (3) holds. Because \(F(n)\to+\infty\), the function \(F\) is bounded below on \(\mathbb N\): outside a finite set it is, say, positive, and it has a minimum on the remaining finite set.

Assume an orbit of \(n\) never enters \(A\). Define selected times recursively by

\[
t_0=0,\qquad
t_{j+1}=t_j+r\bigl(T^{t_j}n\bigr).
\]

Repeated application of (1.2) gives

\[
F(T^{t_j}n)\le F(n)-j\delta.
\]

The right side tends to \(-\infty\), contradicting the global lower bound for \(F\). Thus every orbit enters \(A\), proving (1).

Clearly (2) implies (3), with \(B=1\).

Finally, assume (1), and define the hitting time

\[
\tau_A(n)=\min\{k\ge0:T^k(n)\in A\}.
\]

Then

\[
\tau_A(Tn)=\tau_A(n)-1
\qquad(n\notin A),
\]

so \(F=\tau_A\) satisfies (1.1) with \(\delta=1\).

It remains to check coercivity. At every shortcut step,

\[
T(x)\ge \frac{x}{2}.
\]

Consequently,

\[
T^k(n)\ge\frac{n}{2^k}.
\]

If \(T^k(n)\in A\), then \(T^k(n)\le2\), and hence

\[
2\ge\frac{n}{2^k},
\qquad
k\ge\log_2\frac n2.
\]

Therefore

\[
\tau_A(n)\ge\log_2\frac n2\longrightarrow+\infty.
\]

Thus \(\tau_A\) is coercive. ∎

Hence

\[
\boxed{
\text{Collatz}
\quad\Longleftrightarrow\quad
\text{a finite coercive strict Koopman superharmonic function exists}.
}
\tag{1.3}
\]

This equivalence explains both the attraction and the danger of the approach: proving existence abstractly is not enough, because the unrestricted solution may simply be the unknown stopping-time function.

## 2. The eigenfunction and weighted-contraction formulations

Suppose that a selector \(r(n)\) has been fixed and write

\[
R(n)=T^{r(n)}n.
\]

If

\[
F(Rn)\le F(n)-\delta,
\]

then for any \(\alpha>0\), the positive proper weight

\[
w(n)=e^{\alpha F(n)}
\]

satisfies

\[
w(Rn)\le \rho\,w(n),
\qquad
\rho=e^{-\alpha\delta}<1.
\tag{2.1}
\]

Thus \(w\) is a strict Koopman **subeigenfunction**. If equality held in (2.1), it would be a genuine eigenfunction.

On the weighted supremum space

\[
\|g\|_w
=
\sup_{n\notin A}\frac{|g(n)|}{w(n)},
\]

with functions killed when the orbit enters \(A\), one obtains

\[
\|K_Rg\|_w
\le
\rho\|g\|_w.
\tag{2.2}
\]

This is the exact spectral-gap statement one would want: the induced Koopman operator is a strict contraction in a coercive lattice weight.

There is also a Poisson formulation. Let \(K_A\) denote the Koopman operator killed upon entering \(A\). Then

\[
\tau_A=1+K_A\tau_A
\tag{2.3}
\]

on \(\mathbb N\setminus A\), formally giving

\[
\tau_A
=
(I-K_A)^{-1}\mathbf 1
=
\sum_{j\ge0}K_A^j\mathbf 1.
\tag{2.4}
\]

Pointwise, the \(j\)-th summand is \(1\) exactly when the orbit survives outside \(A\) for at least \(j\) steps. Hence the series is finite exactly on terminating orbits.

Moreover, any function satisfying (1.1) necessarily dominates the stopping time:

\[
F(n)
\ge
F(T^{\tau_A(n)}n)+\delta\tau_A(n),
\]

and therefore

\[
\tau_A(n)
\le
\frac{F(n)-\min_{a\in A}F(a)}{\delta}.
\tag{2.5}
\]

So a constructive coercive Koopman function is not merely qualitative: it contains a pointwise upper bound on all stopping times.

## 3. A canonical—but circular—max-plus construction

The shape of a possible function can be described exactly.

Write

\[
F(n)=\log n+E(n).
\]

The one-step inequality becomes

\[
E(Tn)-E(n)
\le
-\delta-\log\frac{Tn}{n}.
\tag{3.1}
\]

Thus \(E\) must store enough “future credit” to pay for every expanding part of the orbit.

For \(\delta>0\), define formally

\[
E_\delta(n)
=
\sup_{k\in H(n)}
\left(
\log\frac{T^k(n)}{n}
+\delta k
\right),
\tag{3.2}
\]

where

\[
H(n)=
\begin{cases}
\{0,\ldots,\tau_A(n)\},&\tau_A(n)<\infty,\\
\mathbb N_0,&\tau_A(n)=\infty.
\end{cases}
\]

If the orbit never enters \(A\), then \(T^k(n)\ge1\), so

\[
\log\frac{T^k(n)}n+\delta k
\ge
-\log n+\delta k\longrightarrow+\infty.
\]

Thus

\[
E_\delta(n)<\infty
\quad\Longleftrightarrow\quad
\tau_A(n)<\infty.
\tag{3.3}
\]

When finite, the envelope satisfies the Bellman identity

\[
E_\delta(n)
=
\max\left\{
0,\,
\log\frac{Tn}{n}
+\delta+E_\delta(Tn)
\right\}.
\tag{3.4}
\]

Consequently,

\[
F_\delta(n)=\log n+E_\delta(n)
\]

obeys

\[
F_\delta(Tn)\le F_\delta(n)-\delta.
\tag{3.5}
\]

This is a genuine coercive max-plus Koopman construction—but its finiteness is equivalent to Collatz. The arithmetic problem is to replace the infinite future supremum (3.2) by a finite description involving carries, residues, or a finite recursive envelope.

## 4. A sharp no-go theorem for monotone heights

The most obvious possibility is that \(F\) is essentially a monotone function of ordinary magnitude. This is impossible even with bounded induced returns.

### Proposition 2 — All-odd shadow obstruction

Fix \(B\ge1\). No eventually nondecreasing function \(F:\mathbb N\to\mathbb R\) can satisfy

\[
\min_{1\le j\le B}F(T^jn)\le F(n)-\delta
\tag{4.1}
\]

for every sufficiently large \(n\), with any \(\delta>0\).

#### Proof

For \(m>B\), put

\[
n_m=2^m-1.
\]

Its first \(m\) iterates are odd, and induction gives

\[
T^j(n_m)
=
3^j2^{m-j}-1,
\qquad
0\le j\le m.
\tag{4.2}
\]

For \(1\le j\le B<m\),

\[
T^j(n_m)-n_m
=
2^m\left(\left(\frac32\right)^j-1\right)>0.
\]

For sufficiently large \(m\), eventual monotonicity therefore gives

\[
F(T^j n_m)\ge F(n_m)
\qquad(1\le j\le B),
\]

contradicting (4.1). ∎

Thus none of the following can work by itself:

\[
F(n)=\log n,\qquad
F(n)=n^\alpha,\qquad
F(n)=P(\log n),
\]

or any eventually increasing ordinary height.

The argument also rules out a monotone height plus a bounded finite-state correction. Indeed, suppose

\[
F(n)=G(n)+\phi(n),
\]

where \(G\) is eventually nondecreasing and \(|\phi|\le M\). Apply the bounded-return inequality repeatedly along the first \(m\) odd steps of \(n_m\). Before leaving that shadow, one obtains approximately \(m/B\) strict decreases, requiring a total drop of order

\[
\frac{\delta m}{B}.
\]

But \(G\) cannot decrease along the shadow, while \(\phi\) can contribute at most \(2M\) between the two endpoints. This is impossible for large \(m\).

So a successful \(F\) must assign an unbounded non-monotone “debt” to the integers \(2^m-1\).

## 5. No \(2\)-adically continuous potential can work

The same family gives a stronger obstruction.

In \(\mathbb Z_2\),

\[
2^m-1\longrightarrow-1.
\]

For every fixed \(j\),

\[
T^j(2^m-1)
=
3^j2^{m-j}-1
\longrightarrow-1
\qquad(m\to\infty).
\tag{5.1}
\]

### Proposition 3 — \(2\)-adic continuity obstruction

Suppose that \(F\) is the restriction to \(\mathbb N\) of a real-valued function continuous at \(-1\in\mathbb Z_2\). Then no constants \(B,\delta>0\) can satisfy the bounded-return descent condition.

#### Proof

For each \(m\), let \(r_m\in\{1,\ldots,B\}\) be a purported descending return. Passing to a subsequence, assume \(r_m=r\) is constant. Both

\[
2^m-1
\quad\text{and}\quad
T^r(2^m-1)
\]

converge \(2\)-adically to \(-1\). Continuity gives

\[
F(T^r(2^m-1))-F(2^m-1)\longrightarrow0,
\]

contradicting the uniform inequality

\[
F(T^r(2^m-1))-F(2^m-1)\le-\delta.
\]

∎

In fact, a continuous real-valued function on all of the compact space \(\mathbb Z_2\) is bounded, so its restriction cannot be coercive in the first place.

Therefore the desired function must combine:

- archimedean coercivity,
- strong \(2\)-adic singularities,
- and enough carry information to distinguish long finite shadows from genuine nonterminating \(2\)-adic trajectories.

This already excludes any fixed-modulus or bounded-suffix potential.

## 6. Why the most natural \(2\)-adic correction fails

The all-odd shadow suggests

\[
F_a(n)=\log n+a\nu_2(n+1).
\tag{6.1}
\]

For odd \(n\),

\[
Tn+1
=
\frac{3(n+1)}2,
\]

so

\[
\nu_2(Tn+1)=\nu_2(n+1)-1.
\]

Along an odd step,

\[
F_a(Tn)-F_a(n)
\approx
\log\frac32-a.
\]

Choosing

\[
a>\log\frac32
\]

would defeat arbitrarily long all-odd runs.

But now consider the even predecessors

\[
N_m=2(2^m-1)=2^{m+1}-2.
\]

They satisfy

\[
\nu_2(N_m+1)=0,
\qquad
TN_m=2^m-1.
\]

More generally, for \(0\le r<m\),

\[
T^{1+r}N_m
=
3^r2^{m-r}-1,
\]

and hence

\[
\nu_2(T^{1+r}N_m+1)=m-r.
\]

For every fixed \(B\) and every \(1+r\le B\),

\[
F_a(T^{1+r}N_m)-F_a(N_m)
=
a(m-r)+O_B(1)
\longrightarrow+\infty.
\]

Thus no bounded return can produce descent.

This phenomenon persists recursively: adding a penalty for being close to \(-1\) simply transfers the obstruction to the preimages of the \(-1\) shadow. Penalizing those preimages transfers it another level upstream. Completing the hierarchy requires an unbounded future-dependent defect—precisely the Bellman envelope (3.2).

The previous carry investigation reached the same structural conclusion by a different route: terminating positive trajectories can shadow expanding negative cycles for arbitrarily many blocks, ruling out universal ordinary-magnitude bounded-horizon descent, while an unrestricted positive subeigenvector merely stores the unknown hitting time. fileciteturn1file1L83-L99

## 7. Translation into accelerated valuation words

The exact arithmetic obstruction becomes clearer for the accelerated odd map

\[
U(n)=\frac{3n+1}{2^{\nu_2(3n+1)}}.
\]

For the orbit of an odd integer \(n\), let

\[
a_j=\nu_2(3U^j(n)+1),
\qquad
A_j=a_0+\cdots+a_{j-1}.
\]

There is an exact affine identity

\[
2^{A_j}U^j(n)=3^jn+C_j,
\tag{7.1}
\]

where

\[
C_0=0,
\qquad
C_{j+1}=3C_j+2^{A_j},
\tag{7.2}
\]

or equivalently,

\[
C_j
=
\sum_{i=0}^{j-1}3^{j-1-i}2^{A_i}.
\tag{7.3}
\]

Consequently,

\[
U^j(n)-n
=
\frac{
C_j-(2^{A_j}-3^j)n
}{2^{A_j}}.
\tag{7.4}
\]

The multiplicative coefficient becomes contractive when

\[
2^{A_j}>3^j.
\tag{7.5}
\]

But actual descent requires the stronger carry inequality

\[
C_j<(2^{A_j}-3^j)n.
\tag{7.6}
\]

Equation (7.6) is exactly what a coercive Koopman potential must detect. The logarithmic drift

\[
j\log 3-A_j\log2
\]

only sees (7.5); it does not see \(C_j\).

The terminal-carry work proves that certain \(3\)-adic compatibility conditions depend only on a terminal suffix, but the sign in (7.6) also contains a prefix-dependent archimedean surplus. Thus terminal locality cannot by itself supply a Lyapunov function. fileciteturn1file11L628-L640

## 8. The exact two lemmas that would complete the proof

The Koopman route can now be reduced to two concrete arithmetic statements.

### Lemma A — First-crossing descent

Let \(n>1\) be odd, and suppose \(j\) is the first index for which

\[
2^{A_j}>3^j.
\]

Then

\[
U^j(n)<n.
\tag{8.1}
\]

Equivalently, at every first coefficient crossing,

\[
C_j<(2^{A_j}-3^j)n.
\tag{8.2}
\]

For a fixed valuation or parity word, it is enough to prove this for the least positive integer realizing that word. Indeed, after the coefficient has become negative in (7.4), increasing \(n\) only strengthens descent.

Exact finite computation through shortcut depth \(31\) found only the trivial equality attached to the orbit of \(1\); every other first coefficient crossing was descending. A separate fixed-input search found all \(559\) compatible strict-slope records through the reported frontier to be descending. These are finite checks, not an all-depth proof. fileciteturn1file9L531-L566

### Lemma B — Critical-ray synchronization

Suppose a positive odd integer \(n\) has

\[
2^{A_j}\le3^j
\qquad\text{for every }j\ge1.
\tag{8.3}
\]

Then there are a smaller positive odd integer \(m<n\) and indices \(p,q\ge0\) such that

\[
U^p(m)=U^q(n).
\tag{8.4}
\]

A more local formulation is that some finite prefix of the valuation ray admits a compatible inverse path with larger slope and a smaller positive starting value. This is precisely the synchronization statement isolated by the terminal-carry analysis. Compatibility is terminal and \(3\)-adic, while the inequality \(m<n\) is controlled by the full prefix surplus. fileciteturn1file2L161-L175

### Conditional completion

Assume Lemmas A and B.

Suppose that a positive odd integer does not reach \(1\), and let \(n\) be the least such integer.

If a first coefficient crossing occurs, Lemma A gives

\[
U^j(n)<n.
\]

By minimality, \(U^j(n)\) reaches \(1\), so \(n\) also reaches \(1\), a contradiction.

Therefore no coefficient crossing occurs, and (8.3) holds for every \(j\). Lemma B then supplies \(m<n\) whose orbit merges with the orbit of \(n\). By minimality, \(m\) reaches \(1\). After the merging point, the orbit of \(n\) follows the same trajectory, so \(n\) reaches \(1\), again a contradiction.

Thus every positive odd integer reaches \(1\), and therefore every positive integer reaches \(1\).

Once that proof is established, Theorem 1 constructs the desired coercive Koopman function explicitly as

\[
F(n)=\tau_A(n).
\]

This conditional argument also excludes nontrivial positive cycles, since the least member of such a cycle would fall into one of the two cases above.

## 9. Verdict on the approach

The functional-analytic part closes completely:

\[
\boxed{
\text{Collatz}
\iff
(I-K_A)F\ge1
\text{ has a finite coercive solution}
}
\]

and exponentiating \(F\) produces a proper weighted Koopman subeigenfunction with spectral radius strictly below \(1\).

But this is not yet a proof of Collatz, because no finite arithmetic construction of \(F\) has been established. The obvious constructions fail for exact reasons:

- ordinary monotone heights fail on \(2^m-1\);
- finite residue corrections have bounded capacity;
- \(2\)-adically continuous observables cannot be coercive and cannot distinguish long shadows;
- the correction \(\nu_2(n+1)\) fails on immediate even predecessors;
- unrestricted Green functions, stopping times, and positive subeigenvectors encode the answer rather than prove it.

The viable object would have to be a **full-prefix, component-specific carry envelope**: a finite rule that compresses the future-excursion supremum (3.2), incorporates the exact affine carry \(C_j\), and proves either first-crossing descent or synchronization on every infinite critical ray. The marked-carry work likewise identifies a coloured component-specific carry theorem or finite-input min-plus envelope as the remaining all-depth requirement; bounded-horizon contraction and unmarked fixed-modulus constructions are insufficient. fileciteturn1file3L195-L210

Therefore, presenting the coercive Koopman criterion itself as a completed Collatz proof would be circular. The unresolved mathematical content is Lemma A together with Lemma B—or an equivalent theorem proving finiteness of the carry/Bellman envelope.