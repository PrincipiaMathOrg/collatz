model: GPT-5.6 Pro (Chat mode)
round: 90 -- approach 85, Rigorous renormalization of stopping-time distributions
front: proof
sent: 2026-08-17T09:31Z
worked: 31m 48s

---

# Result of the renormalization program

Carrying this approach through produces an exact renormalization theorem and a complete fixed-point analysis. It does **not**, however, produce a proof of the Collatz conjecture. The proposed final implication,

\[
\text{attraction of stopping-time distributions}
\quad\Longrightarrow\quad
\text{absence of exceptional integer orbits},
\]

is false. The renormalized distribution is insensitive to any exceptional set of natural density zero, including a singleton. The derivation below identifies precisely where this loss of information occurs and gives the stronger, atomic renormalization statement that would complete the proof.

---

## 1. Reduction to finite stopping time

Use the shortcut Collatz map

\[
T(n)=
\begin{cases}
n/2,&n\equiv0\pmod 2,\\[2mm]
(3n+1)/2,&n\equiv1\pmod 2.
\end{cases}
\]

For \(n>1\), define its first stopping time by

\[
\sigma(n)=\inf\{k\geq 1:T^k(n)<n\},
\]

with \(\sigma(n)=\infty\) when no such \(k\) exists.

### Proposition 1

The Collatz conjecture is equivalent to

\[
\sigma(n)<\infty\qquad\text{for every }n>1.
\]

### Proof

If every positive integer reaches \(1\), then every \(n>1\) eventually has an iterate below \(n\).

Conversely, suppose every \(n>1\) has finite stopping time. Apply strong induction. Given \(n>1\), some iterate \(T^{\sigma(n)}(n)\) is a positive integer strictly smaller than \(n\), so by the induction hypothesis it reaches \(1\). Therefore \(n\) reaches \(1\). ∎

Thus a counterexample exists exactly when the decreasing sequence of survivor sets

\[
E_k:=\{n>1:\sigma(n)>k\}
\]

has nonempty intersection.

---

## 2. Exact affine formula and parity coding

Set

\[
\varepsilon_j(n):=T^j(n)\pmod 2,
\qquad
S_j(n):=\sum_{i=0}^{j-1}\varepsilon_i(n).
\]

Repeated substitution gives the exact identity

\[
2^jT^j(n)=3^{S_j(n)}n+C_j(n),
\tag{2.1}
\]

where

\[
C_j(n)=
\sum_{i=0}^{j-1}
\varepsilon_i(n)\,2^i\,3^{S_j(n)-S_{i+1}(n)}
\geq0.
\tag{2.2}
\]

The carry satisfies

\[
C_{j+1}
=
3^{\varepsilon_j}C_j+\varepsilon_j2^j,
\qquad C_0=0.
\tag{2.3}
\]

A length-\(k\) parity word

\[
(\varepsilon_0,\ldots,\varepsilon_{k-1})\in\{0,1\}^k
\]

determines exactly one residue class modulo \(2^k\).

Indeed, suppose the first \(j\) bits determine \(n\bmod 2^j\). The two lifts modulo \(2^{j+1}\) differ by \(2^j\). As long as their first \(i\le j\) parity bits agree, (2.1) gives

\[
T^i(n+2^j)-T^i(n)=3^{S_i}2^{j-i}.
\]

For \(i<j\) this difference is even, so the first \(j\) parity bits agree. At \(i=j\) the difference is odd, so the two lifts have opposite next parity bits. Exactly one lift realizes either prescribed continuation.

Consequently, when integers are sampled uniformly from a complete set of residues modulo \(2^k\), the first \(k\) parity bits are exactly independent fair bits. This is the finite-level parity mechanism underlying the coefficient-stopping results of Terras and the later stochastic models of Kontorovich–Lagarias. citeturn778136view2turn778136view3turn686548view0

---

## 3. Coefficient stopping and the exact density law

Define the coefficient stopping time

\[
\kappa(n)
:=
\inf\{j\geq1:3^{S_j(n)}<2^j\}.
\]

From (2.1) and \(C_j\geq0\),

\[
T^j(n)<n
\quad\Longrightarrow\quad
3^{S_j(n)}<2^j.
\]

Hence

\[
\kappa(n)\leq \sigma(n).
\tag{3.1}
\]

The converse need not hold because the positive carry \(C_j\) may temporarily rescue an orbit after its multiplicative coefficient has fallen below \(1\). Crucially, at every fixed horizon this discrepancy affects only finitely many integers.

### Lemma 2

For every fixed \(k\),

\[
\{n:\sigma(n)>k\}
\mathbin{\triangle}
\{n:\kappa(n)>k\}
\]

is finite.

### Proof

The inclusion

\[
\{\kappa>k\}\subseteq\{\sigma>k\}
\]

follows from \(C_j\geq0\).

Now fix a length-\(k\) parity word \(w\) for which coefficient stopping occurs by time \(k\), and let \(j\leq k\) be the first index satisfying \(3^{S_j}<2^j\). An integer \(n\) realizing \(w\) can nevertheless satisfy \(T^j(n)\geq n\) only if

\[
3^{S_j}n+C_j\geq2^jn,
\]

and hence

\[
n\leq \frac{C_j}{2^j-3^{S_j}}.
\tag{3.2}
\]

For the fixed word \(w\), the right-hand side is a fixed finite number. There are only \(2^k\) parity words, so only finitely many rescued integers occur. ∎

It follows that the natural density

\[
d_k:=
\lim_{N\to\infty}
\frac1N
\#\{n\leq N:\sigma(n)>k\}
\]

exists and equals the coefficient-survival probability

\[
d_k
=
2^{-k}
\#\left\{
\varepsilon\in\{0,1\}^k:
3^{S_j(\varepsilon)}\geq2^j
\text{ for }1\leq j\leq k
\right\}.
\tag{3.3}
\]

Thus the finite-horizon stopping-time law is not merely heuristic: its density is exactly the survival law of a random walk.

---

## 4. The renormalization operator

Put

\[
a=\log\frac32,
\qquad
b=\log2.
\]

For a parity sequence define

\[
Y_j
=
S_j\log3-j\log2.
\]

Then

\[
Y_{j+1}-Y_j=
\begin{cases}
a,&\varepsilon_j=1,\\
-b,&\varepsilon_j=0.
\end{cases}
\]

Coefficient survival through time \(k\) is precisely

\[
Y_j\geq0\qquad(1\leq j\leq k).
\]

Let \(\mathcal M_+([0,\infty))\) denote the finite positive measures on \([0,\infty)\). Define the killed renormalization operator

\[
\begin{aligned}
(\mathcal K\mu)(B)
={}&
\frac12
\int_{[b,\infty)}
\mathbf 1_B(x-b)\,d\mu(x)\\
&+
\frac12
\int_{[0,\infty)}
\mathbf 1_B(x+a)\,d\mu(x).
\end{aligned}
\tag{4.1}
\]

The first term is the even step; mass in \([0,b)\) is killed. The second is the odd step.

Set

\[
\nu_0=\delta_0,
\qquad
\nu_k=\mathcal K^k\delta_0.
\]

Then

\[
\nu_k(B)
=
\mathbb P\left(
Y_k\in B,\ 
Y_j\geq0\text{ for }1\leq j\leq k
\right),
\tag{4.2}
\]

and therefore

\[
\boxed{\quad d_k=\|\mathcal K^k\delta_0\|.\quad}
\tag{4.3}
\]

The density of the event \(\sigma(n)=k+1\) is correspondingly

\[
d_k-d_{k+1}
=
\frac12\nu_k([0,b)).
\tag{4.4}
\]

Equations (4.1)–(4.4) are the desired exact renormalization of the finite stopping-time distribution.

---

## 5. Its attracting behavior

The mean increment is

\[
\frac12a-\frac12b
=
\frac12\log\frac34<0.
\tag{5.1}
\]

By the strong law of large numbers,

\[
\frac{Y_k}{k}
\longrightarrow
\frac12\log\frac34<0
\quad\text{almost surely}.
\]

Hence a random parity path cannot remain in \([0,\infty)\) forever, except on a set of probability zero. Consequently,

\[
\boxed{\quad d_k=\|\mathcal K^k\delta_0\|\longrightarrow0.\quad}
\tag{5.2}
\]

This proves that the set

\[
E_\infty:=\{n>1:\sigma(n)=\infty\}
\]

has natural density zero: for every \(k\),

\[
E_\infty\subseteq E_k,
\]

so

\[
\overline d(E_\infty)\leq d_k,
\]

and then \(k\to\infty\) gives \(\overline d(E_\infty)=0\).

This recovers the density-one finite-stopping theorem in renormalization form. It is also exactly the point at which the argument ceases to control individual integers.

---

## 6. Fixed points of the killed operator

### Proposition 3

The only finite measure satisfying

\[
\mathcal K\mu=\mu
\]

is \(\mu=0\).

### Proof

For each finite \(x\geq0\), let \(\tau_x\) be the killing time for the random walk started at \(x\). Negative drift gives

\[
\mathbb P_x(\tau_x>k)\longrightarrow0.
\]

If \(\mathcal K\mu=\mu\), then for every \(k\),

\[
\|\mu\|
=
\|\mathcal K^k\mu\|
=
\int_{[0,\infty)}
\mathbb P_x(\tau_x>k)\,d\mu(x).
\]

Dominated convergence makes the right-hand side tend to \(0\). Hence \(\|\mu\|=0\). ∎

One can make the operator Markov by adjoining two absorbing states:

- \(\dagger\), representing an orbit that has crossed below the stopping barrier;
- \(\infty\), representing an escape component.

Every finite starting height reaches \(\dagger\) almost surely. Therefore the stationary probability measures of the compactified operator are exactly

\[
q\delta_\dagger+(1-q)\delta_\infty,
\qquad 0\leq q\leq1.
\tag{6.1}
\]

Thus the fixed-point classification does **not** show that an escape component is incompatible with the attracting stopped component. It explicitly permits every mixture of the two.

More importantly, a single exceptional symbolic path need not contribute any positive mass at all. For example, the all-odd path satisfies

\[
Y_k=k\log(3/2)>0
\]

for every \(k\), but it has Bernoulli probability zero. The distribution converges exactly as before.

In the \(2\)-adic formulation, parity coding conjugates the Collatz dynamics to a shift, so infinite symbolic survivor paths certainly exist; the arithmetic question is whether any such path is the parity encoding of a positive ordinary integer rather than merely a \(2\)-adic integer. citeturn848682search1turn848682search4

---

## 7. A carry-aware affine renormalization

The same obstruction persists after replacing the coefficient walk by the standard random affine model for the accelerated odd map

\[
U(n)=\frac{3n+1}{2^{v_2(3n+1)}}.
\]

For a uniformly sampled odd residue, finite valuation blocks have the law

\[
\mathbb P(A=a)=2^{-a},
\qquad a=1,2,\ldots.
\tag{7.1}
\]

Define the affine renormalization operator on probability laws on \([0,\infty]\) by

\[
\mathcal P\mu
=
\sum_{a\geq1}
2^{-a}
\left(x\mapsto\frac{3x+1}{2^a}\right)_\#\mu,
\tag{7.2}
\]

where \(\infty\) maps to \(\infty\).

This corresponds to

\[
X_{j+1}=M_{j+1}X_j+Q_{j+1},
\qquad
M_j=\frac3{2^{A_j}},
\quad
Q_j=\frac1{2^{A_j}}.
\tag{7.3}
\]

Finite valuation blocks are modeled exactly by independent geometric variables in the relevant residue-class or \(2\)-adic sampling. The unresolved issue is uniform control when one follows a single ordinary integer through indefinitely many blocks. This distinction between finite random-looking blocks and exceptional deterministic trajectories is also central in Tao’s analysis. citeturn686548view1

### Theorem 4: fixed-point classification

There is a unique stationary probability law \(\pi\) supported on \([0,\infty)\). It is the law of the perpetuity

\[
X_\infty
=
\sum_{j=1}^{\infty}
\frac{3^{j-1}}{2^{A_1+\cdots+A_j}}.
\tag{7.4}
\]

All stationary probability laws on \([0,\infty]\) are exactly

\[
\boxed{\quad
(1-p)\pi+p\delta_\infty,
\qquad 0\leq p\leq1.
\quad}
\tag{7.5}
\]

### Proof

Since \(\mathbb E A=2\), the strong law gives

\[
\frac{A_1+\cdots+A_j}{j}\longrightarrow2.
\]

The logarithm of the \(j\)-th summand in (7.4), divided by \(j\), tends to

\[
\log3-2\log2=\log\frac34<0.
\]

Thus the series converges almost surely. Splitting off its first term shows

\[
X_\infty
\overset d=
\frac{1+3X_\infty'}{2^{A_1}},
\]

where \(X_\infty'\) is an independent copy, proving stationarity.

For uniqueness, couple two recursions with the same valuation variables. Then

\[
X_k^x-X_k^y
=
\left(\prod_{j=1}^kM_j\right)(x-y).
\]

Since

\[
\frac1k\log\prod_{j=1}^kM_j
\longrightarrow
\log\frac34<0,
\]

the difference tends to zero almost surely. Hence any two finite stationary laws coincide.

Finally, \(\delta_\infty\) is stationary. If a stationary law \(\mu\) gives mass \(p\) to \(\infty\), its normalized restriction to the finite half-line is stationary and must equal \(\pi\). This yields (7.5). ∎

For \(0<\alpha<1\), the attraction can also be made quantitative because

\[
\mathbb E M^\alpha
=
\frac{3^\alpha}{2^{1+\alpha}-1}<1.
\tag{7.6}
\]

Indeed, with \(t=2^\alpha\) and \(r=\log_2 3\), convexity of \(t^r\) on \(1<t<2\) gives

\[
t^r<2t-1,
\]

which is precisely \(3^\alpha<2^{1+\alpha}-1\). Thus \(\mathcal P\) is contractive in the Wasserstein metric based on \(|x-y|^\alpha\), whenever the corresponding moments are finite.

The classification (7.5) directly contradicts the intended final step of Approach 85: the attracting finite distribution \(\pi\) and an escape component coexist perfectly well.

---

## 8. The distributional-blindness theorem

The fundamental obstruction is independent of the particular operator.

### Theorem 5

Let \(\mu_N\) be probability measures on \(\mathbb N\), let \(E\subseteq\mathbb N\) satisfy

\[
\mu_N(E)\longrightarrow0,
\]

and let \(f,g:\mathbb N\to S\) agree outside \(E\). Then

\[
\left\|f_\#\mu_N-g_\#\mu_N\right\|_{\mathrm{TV}}
\leq \mu_N(E)
\longrightarrow0.
\tag{8.1}
\]

### Proof

Couple the two pushforwards by sampling the same integer \(n\) from \(\mu_N\). The two outputs can differ only when \(n\in E\). The coupling inequality gives (8.1). ∎

Apply this with

\[
\mu_N=\frac1N\sum_{n=1}^N\delta_n
\]

and \(E=E_\infty\). We proved that \(\mu_N(E_\infty)\to0\). Therefore the limiting stopping-time distributions are unchanged if one:

- leaves every \(n\in E_\infty\) with stopping time \(\infty\); or
- arbitrarily assigns finite stopping times to every \(n\in E_\infty\).

The limiting distribution, every weak limit, every moment that is uniformly integrable, and every continuous renormalization of these limits are identical in the two cases.

In particular, they cannot distinguish

\[
E_\infty=\varnothing
\]

from

\[
E_\infty=\{n_0\}.
\]

This is the rigorous form of the sparse-exception obstruction. Tao explicitly notes that almost-all control cannot simply be iterated because the deterministic map may transport typical inputs into progressively thinner exceptional sets. citeturn686548view1

---

## 9. The exact full-support renormalization

To detect even one exceptional integer, the sampling law must assign positive mass to every integer.

Let

\[
w_n=2^{-n},
\qquad n\geq1.
\]

This is a full-support probability distribution on \(\mathbb N\). For a probability mass function \(p\), define the exact Perron–Frobenius operator

\[
(\mathcal Lp)(m)
=
p(2m)
+
\mathbf 1_{m\equiv2\pmod3}
p\left(\frac{2m-1}{3}\right).
\tag{9.1}
\]

The two terms are exactly the two possible positive preimages of \(m\) under \(T\).

Let

\[
C=\{1,2\},
\]

the trivial Collatz cycle. Define

\[
Z_k
=
\sum_{m\notin C}(\mathcal L^kw)(m)
=
\sum_{n\geq1}w_n
\mathbf 1_{\{T^k(n)\notin C\}}.
\tag{9.2}
\]

Because \(C\) is forward invariant, the indicators on the right decrease with \(k\). Therefore

\[
\lim_{k\to\infty}Z_k
=
\sum_{\substack{n\geq1\\T^j(n)\notin C\;\forall j}}
w_n.
\tag{9.3}
\]

Since every \(w_n\) is strictly positive,

\[
\boxed{\quad
\text{Collatz is true}
\iff
Z_k\longrightarrow0.
\quad}
\tag{9.4}
\]

This is a stopping-distribution criterion that really can detect a singleton counterexample.

For the probability-generating function

\[
P(z)=\sum_{n\geq1}p(n)z^n,
\]

the operator has the exact functional form

\[
\begin{aligned}
(\mathscr LP)(z)
={}&
\frac{P(\sqrt z)+P(-\sqrt z)}2\\
&+
\frac{\sqrt z}{2}
\left(
P(z^{3/2})-P(-z^{3/2})
\right).
\end{aligned}
\tag{9.5}
\]

Although fractional powers appear in the two pieces, they cancel to leave an ordinary power series:

\[
(\mathscr LP)(z)
=
\sum_{n\text{ even}}p(n)z^{n/2}
+
\sum_{n\text{ odd}}p(n)z^{(3n+1)/2}.
\]

Equation (9.5) is an exact renormalization retaining every atomic seed.

---

## 10. Fixed points of the exact atomic operator

Every invariant probability measure of a deterministic map on a countable state space is supported on periodic orbits. Indeed, Poincaré recurrence implies that almost every atom of positive measure must return to itself, hence must be periodic. On each finite cycle, invariance forces equal mass on all cycle points.

Thus the fixed points of \(\mathcal L\) are exactly the convex combinations of uniform probability measures on finite Collatz cycles.

This yields a clean division:

1. Proving that the only probability fixed point is the uniform measure on \(\{1,2\}\) is equivalent to excluding nontrivial cycles.

2. Proving \(Z_k\to0\) additionally excludes mass escaping to infinity.

The second assertion is not a consequence of fixed-point uniqueness. A sequence of probability measures may have no nontrivial stationary subsequential limit because its mass escapes through larger and larger integers.

Recent work on pushing full-support geometric distributions through Collatz-type maps studies precisely this stronger kind of information, but even conjectural near-uniformity modulo powers of \(2\) does not by itself supply the necessary deterministic second iteration or tightness estimate. citeturn190992view0turn484414view0

---

## 11. The exact missing theorem

The renormalization route would become a complete proof upon establishing any one of the following equivalent support-sensitive statements:

\[
\lim_{k\to\infty}
\sum_{m\notin\{1,2\}}(\mathcal L^kw)(m)=0
\tag{11.1}
\]

for one full-support probability \(w\);

or, in first-stopping language,

\[
\lim_{k\to\infty}
\sum_{n\geq2}2^{-n}
\mathbf 1_{\{\sigma(n)>k\}}=0;
\tag{11.2}
\]

or

\[
\min E_k\longrightarrow\infty.
\tag{11.3}
\]

The equivalence of (11.3) with Collatz follows because \(E_{k+1}\subseteq E_k\). Hence \(\min E_k\) is nondecreasing. If it remains bounded, it eventually stabilizes at an integer lying in every \(E_k\), giving infinite stopping time.

A quantitative renormalization theorem such as

\[
Z_{k+M}\leq qZ_k
\qquad(k\geq k_0)
\tag{11.4}
\]

for fixed \(M\) and \(q<1\) would immediately prove (11.1), and therefore Collatz. But (11.4) must concern the **atomic** iterates \(\mathcal L^kw\), not the diffuse natural-density law. The latter assigns mass \(1/N\) to each seed and loses every fixed exceptional integer as \(N\to\infty\).

---

# Conclusion

Approach 85 yields the rigorous chain

\[
\begin{aligned}
&\text{exact parity-residue renormalization}\\
&\Longrightarrow
\text{exact finite-horizon stopping densities}\\
&\Longrightarrow
d_k\to0\\
&\Longrightarrow
\text{the infinite-stopping set has density zero}.
\end{aligned}
\]

Its fixed-point theory can also be completely classified. Both the killed random-walk operator and the carry-aware affine operator permit an escape component to coexist with the attracting distribution. More decisively, any nonempty exceptional set of density zero is invisible to the limiting stopping-time distribution.

Therefore the proposed final step does not establish the Collatz conjecture. The exact unresolved bridge is not classification of the bulk fixed point, but **support-edge control**: proving that the smallest surviving atomic seed tends to infinity, or equivalently proving decay of a full-support weighted survivor mass such as (11.1). Any argument claiming completion from the attracting natural-density distribution alone necessarily makes the invalid inference

\[
\text{zero density}\quad\Longrightarrow\quad\text{empty set}.
\]