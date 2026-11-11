model: GPT-5 Pro
round: 7 -- approach 2, Furstenberg-style (x2, x3) measure rigidity
front: proof
sent: 2026-08-13T17:28Z
worked: 84m 1s
finished: 2026-08-13T18:50:50Z (sent + worked)

---

# Result of the attempt

Carrying the Furstenberg program through produces a rigorous reduction, but **not a proof of Collatz**. The decisive failure is precise:

1. A divergent orbit does generate a probability measure on a compact adelic state space.
2. That measure is invariant under **one variable-time skew transformation**
   \[
   (a,z)\longmapsto \bigl(\sigma a,\alpha_3\alpha_2^{-a_0}z\bigr),
   \]
   not under multiplication by \(2\) and multiplication by \(3\) separately.
3. Thickening the orbit enough to obtain genuine \((\times2,\times3)\)-invariance makes the Collatz orbit a zero-density boundary and loses the carry constraint.
4. Keeping the ordinary positive-integer lift or absolute height avoids that loss, but then all empirical mass escapes to infinity.
5. The proposed implication “zero entropy \(\Rightarrow\) algebraic or eventually periodic” is false for the ambient skew system and is stronger than presently available \(\times2,\times3\) rigidity. The positive-entropy theorem of Rudolph–Johnson and its solenoid extensions require genuine higher-rank invariance; the unresolved part of Furstenberg’s measure problem is essentially the zero-entropy case. citeturn578358view3turn475872view0

What follows is the maximal rigorous theorem supplied by the approach, followed by the exact additional statements that would turn it into a proof.

---

## 1. Exact orbit identities

Use the accelerated map on positive odd integers:
\[
x_{j+1}=U(x_j)=\frac{3x_j+1}{2^{a_j}},
\qquad
a_j=v_2(3x_j+1)\geq 1.
\]

Suppose first that this orbit is divergent. Since a deterministic orbit cannot revisit a value without becoming periodic, the \(x_j\) are distinct. A sequence of distinct positive integers has only finitely many terms below any fixed bound, so
\[
x_j\longrightarrow \infty.
\]

Put
\[
A_0=0,\qquad A_j=\sum_{i=0}^{j-1}a_i.
\]
Iterating the affine recurrence gives
\[
2^{A_j}x_j=3^jx_0+C_j,
\]
where
\[
C_j=\sum_{k=0}^{j-1}3^{j-1-k}2^{A_k},
\qquad
C_{j+1}=3C_j+2^{A_j}.
\]

Taking logarithms at one step gives
\[
\log x_{j+1}-\log x_j
 =\log3-a_j\log2+
 \log\left(1+\frac1{3x_j}\right).
\]
Consequently,
\[
\log x_N
=
\log x_0+N\log3-A_N\log2+E_N,
\]
where
\[
E_N=\sum_{j=0}^{N-1}\log\left(1+\frac1{3x_j}\right).
\]

Because \(x_j\to\infty\),
\[
\frac{E_N}{N}\longrightarrow0.
\]
Since \(\log x_N\geq0\), we obtain the fundamental drift bound
\[
\boxed{\displaystyle
\limsup_{N\to\infty}\frac{A_N}{N}
\leq \mu_*:=\log_2 3
=1.5849625007\ldots .}
\tag{1}
\]

Thus every divergent accelerated orbit must have an average valuation no greater than \(\log_2 3\).

In the unaccelerated shortcut map, each symbol \(a_j\) expands to the parity block
\[
1\,0^{a_j-1}.
\]
Hence a stationary valuation process with mean \(m\leq\mu_*\) has odd-step frequency
\[
\frac1m\geq\frac1{\log_2 3}
=\frac{\log2}{\log3}
=0.63092975\ldots>\frac12.
\tag{2}
\]

This is already exactly incompatible with Haar measure for the binary shift. The missing problem is to justify why an orbit-derived measure should be Haar.

---

## 2. A probability measure really can be constructed

Let
\[
\Sigma=\mathbb N_{\geq1}^{\mathbb N}
\]
and let
\[
a=(a_0,a_1,\ldots)
\]
be the valuation sequence of the hypothetical divergent orbit. Consider
\[
\nu_N=\frac1N\sum_{j=0}^{N-1}\delta_{\sigma^ja}.
\]

These measures are tight, despite the countable alphabet.

Indeed, (1) implies that for some finite \(K\),
\[
A_n\leq Kn\qquad(n\geq1).
\]
At coordinate \(r\),
\[
\begin{aligned}
\nu_N\{b:b_r>M_r\}
&\leq
\frac1{NM_r}\sum_{j=0}^{N-1}a_{j+r}\\
&\leq
\frac{A_{N+r}}{NM_r}
\leq
\frac{K(N+r)}{NM_r}
\leq
\frac{K(1+r)}{M_r}.
\end{aligned}
\]
Choose \(M_r\) so rapidly increasing that
\[
\sum_{r\geq0}\frac{K(1+r)}{M_r}<\varepsilon.
\]
Then
\[
\prod_{r\geq0}\{1,\ldots,M_r\}
\]
is compact in \(\Sigma\) and has \(\nu_N\)-measure at least \(1-\varepsilon\), uniformly in \(N\).

Therefore a subsequence converges to a shift-invariant probability \(\nu\). Moreover, truncating \(a_0\) and passing to the limit gives
\[
\boxed{\displaystyle
\int a_0\,d\nu\leq\mu_* .}
\tag{3}
\]

There may be loss of first moment through rare extremely large valuations, so equality is not justified. The inequality is all that is needed below.

---

## 3. Exact adelic linearization

Introduce the \(S\)-adic solenoid
\[
X_6=
\frac{\mathbb R\times\mathbb Q_2\times\mathbb Q_3}
{\Delta(\mathbb Z[1/6])}.
\]
Let \(\alpha_2,\alpha_3\) denote multiplication by \(2\) and \(3\), respectively. These are commuting automorphisms of \(X_6\).

Set
\[
c_j=\frac{C_j}{2^{A_j}}.
\]
Then
\[
c_{j+1}=\frac{3c_j+1}{2^{a_j}}.
\]

Define
\[
z_j=[(c_j,x_j,x_j)]\in X_6.
\]
Because the vector
\[
\left(2^{-a_j},2^{-a_j},2^{-a_j}\right)
\]
belongs to the diagonal copy of \(\mathbb Z[1/6]\), we have the exact identity
\[
\boxed{\displaystyle
z_{j+1}=\alpha_3\alpha_2^{-a_j}z_j.}
\tag{4}
\]

Furthermore, subtracting the diagonal element \(x_j\) gives
\[
\begin{aligned}
z_j
&=[(c_j-x_j,0,0)]\\
&=
\left[
\left(
-x_0\frac{3^j}{2^{A_j}},0,0
\right)
\right].
\end{aligned}
\tag{5}
\]
Thus
\[
z_j=\alpha_3^j\alpha_2^{-A_j}z_0.
\]

Now put
\[
F(a,z)=\bigl(\sigma a,\alpha_3\alpha_2^{-a_0}z\bigr).
\]
The empirical measures
\[
\eta_N=\frac1N\sum_{j=0}^{N-1}
\delta_{(\sigma^ja,z_j)}
\]
have weakly convergent subsequences because the symbolic marginals are tight and \(X_6\) is compact. Every limit \(\eta\) satisfies
\[
F_*\eta=\eta,
\]
since
\[
\int\phi\circ F\,d\eta_N-\int\phi\,d\eta_N
=
\frac{\phi(\sigma^Na,z_N)-\phi(a,z_0)}N
\longrightarrow0.
\]

So the mass-escape problem can indeed be overcome after adelic compactification.

But what has been obtained is invariance under **one skew map \(F\)**, not under the full action generated separately by \(\alpha_2\) and \(\alpha_3\).

---

## 4. A genuine recurrence theorem for logarithmic height

Absolute height escapes, but logarithmic height modulo one has a remarkably rigid limit.

Let
\[
\theta_j=\{\log_2x_j\},
\qquad
\alpha=\log_2 3.
\]
Then
\[
\theta_{j+1}
=
\theta_j+\alpha+\varepsilon_j
\pmod1,
\]
where
\[
\varepsilon_j=
\log_2\left(1+\frac1{3x_j}\right)
\longrightarrow0.
\]

Let \(f\) be continuous on \(\mathbb T=\mathbb R/\mathbb Z\). Then
\[
\begin{aligned}
\frac1N\sum_{j<N}
\bigl(f(\theta_j+\alpha)-f(\theta_j)\bigr)
&=
\frac1N\sum_{j<N}
\bigl(f(\theta_j+\alpha)-f(\theta_{j+1})\bigr)\\
&\quad+
\frac{f(\theta_N)-f(\theta_0)}N.
\end{aligned}
\]
The first term tends to zero by uniform continuity and \(\varepsilon_j\to0\); the second tends to zero trivially.

Every empirical limit is therefore invariant under rotation by \(\alpha\). Since \(\log_2 3\) is irrational, this rotation is uniquely ergodic. Hence
\[
\boxed{\displaystyle
\frac1N\sum_{j=0}^{N-1}
\delta_{\{\log_2x_j\}}
\ \Longrightarrow\ m_{\mathbb T}.}
\tag{6}
\]

Thus every hypothetical divergent accelerated Collatz orbit is equidistributed in base-\(2\) logarithmic phase.

This completely resolves recurrence after quotienting height by powers of \(2\), but it does not control absolute height and therefore does not force two nearly equal adelic states to be the same positive integer.

---

## 5. A sharp entropy ceiling

Let \(\nu\) be an ergodic component of an orbit-derived invariant measure satisfying
\[
m:=\int a_0\,d\nu\leq\mu_*.
\]

For any stationary process on the positive integers,
\[
h_\nu(\sigma)\leq H_\nu(a_0).
\]
Among probability distributions on \(\{1,2,\ldots\}\) with mean \(m\), the one-symbol entropy is maximized by the geometric law
\[
q_k=\frac1m\left(1-\frac1m\right)^{k-1}.
\]
This follows immediately by comparing an arbitrary distribution with \(q\) through nonnegativity of relative entropy.

Therefore
\[
H_\nu(a_0)
\leq
H_{\max}(m)
=
m\log m-(m-1)\log(m-1).
\]
Since \(m\leq\mu_*\),
\[
\boxed{\displaystyle
h_\nu(\sigma)
\leq
h_*:=1.0436328159\ldots
<\log3=1.0986122887\ldots .}
\tag{7}
\]

There is a strict entropy gap
\[
\log3-h_*=0.0549794728\ldots .
\]

After expanding each \(a_j\) into the binary block \(10^{a_j-1}\), Abramov’s tower formula gives binary entropy
\[
h_{\rm bin}=\frac{h_\nu(\sigma)}m.
\]
Optimizing over \(1\leq m\leq\mu_*\) gives
\[
\boxed{\displaystyle
h_{\rm bin}\leq0.6584589953\ldots
<\log2=0.6931471806\ldots .}
\tag{8}
\]

So an orbit-derived low-mean component cannot possibly be Haar either in ternary time or in binary shortcut time—**provided its symbolic entropy transfers to the corresponding algebraic action**.

That transfer is precisely what is missing.

---

## 6. Why Rudolph–Johnson does not apply

The relevant rigidity theorem says, roughly, that a genuinely jointly \(\times2\)- and \(\times3\)-invariant ergodic probability on the circle having positive entropy must be Lebesgue. Higher-rank solenoid versions similarly require a genuine algebraic \(\mathbb Z^d\)-action and then yield a Haar-versus-zero-entropy dichotomy. citeturn578358view3turn475872view0

Our measure satisfies only
\[
F_*\eta=\eta,
\qquad
F(a,z)=
\bigl(\sigma a,\alpha_3\alpha_2^{-a_0}z\bigr).
\]

Disintegrate
\[
\eta=\int\eta_a\,d\nu(a).
\]
Invariance gives
\[
\eta_{\sigma a}
=
(\alpha_3\alpha_2^{-a_0})_*\eta_a
\quad\text{for almost every }a.
\]
It does **not** give
\[
(\alpha_2)_*\bar\eta=\bar\eta
\quad\text{or}\quad
(\alpha_3)_*\bar\eta=\bar\eta,
\]
where
\[
\bar\eta=\int\eta_a\,d\nu(a).
\]

Even stationarity for a random walk does not follow, because the fiber measure \(\eta_a\) may be correlated arbitrarily with the symbol \(a_0\).

There is a decisive counterexample to any abstract entropy-transfer claim. Let \(\nu\) be any shift-invariant positive-entropy measure and let \(0\in X_6\) be the identity. Then
\[
\eta=\nu\times\delta_0
\]
is \(F\)-invariant, since every \(\alpha_3\alpha_2^{-k}\) fixes \(0\). The skew system has positive entropy, but all of it lies in the symbolic base; the algebraic fiber is atomic and has zero entropy.

Therefore:

\[
\boxed{\text{Positive entropy of the valuation process does not imply positive entropy for }\alpha_2\text{ or }\alpha_3.}
\]

This is not a minor missing estimate. It is a rank-production problem.

---

## 7. Thickening the orbit produces rank two—but erases Collatz

There is a natural way to obtain a genuinely \(\mathbb Z^2\)-invariant measure.

Define the lattice regions
\[
\mathcal F_N
=
\{(-m,j):0\leq j<N,\ 0\leq m\leq A_j\}
\subset\mathbb Z^2.
\]
Because \(a_j\geq1\), we have \(A_j\geq j\), and hence
\[
|\mathcal F_N|
=
\sum_{j<N}(A_j+1)
\geq\frac{N(N+1)}2.
\]
The boundary under horizontal translation has size \(O(N)\). The boundary under vertical translation is controlled by
\[
\sum_{j<N}|A_{j+1}-A_j|
=
A_N
=
O(N).
\]
Thus \((\mathcal F_N)\) is a Følner sequence in \(\mathbb Z^2\).

Consequently, weak limits of
\[
\lambda_N
=
\frac1{|\mathcal F_N|}
\sum_{(-m,j)\in\mathcal F_N}
\delta_{\alpha_2^{-m}\alpha_3^jz_0}
\]
are genuinely invariant under both \(\alpha_2\) and \(\alpha_3\).

But the actual Collatz points occur only on the graph
\[
m=A_j.
\]
There are \(N\) such boundary points, while
\[
|\mathcal F_N|\asymp N^2.
\]
Hence their relative mass is
\[
\frac{N}{|\mathcal F_N|}\longrightarrow0.
\]

The exact carry relation is therefore lost in the rank-two limit. The two desiderata are incompatible under this averaging:

- average along the graph: retain Collatz, obtain only one skew action;
- average over a Følner region: obtain rank two, lose Collatz on a zero-density boundary.

A fixed-width strip retains the boundary with positive density but is not Følner. A width tending to infinity becomes approximately invariant, but the boundary proportion tends to zero. Weighting the strip differently gives the same probability-versus-boundary tradeoff.

This is the geometric heart of the obstruction.

---

## 8. Compactification also erases the positive lift

Equation (5) shows that in the solenoid
\[
z_j=
\left[
\left(-x_0\frac{3^j}{2^{A_j}},0,0\right)
\right].
\]
The affine \(+1\) term has become a diagonal lattice translation and disappeared from the quotient.

Keeping \(x_j\in\mathbb Z_3\) directly preserves the carry identities, but then the update is symbol-dependent and affine:
\[
x_{j+1}=\frac{3x_j+1}{2^{a_j}}.
\]
Passing to the solenoid makes the update algebraic and commuting, but forgets which representative is the actual positive integer.

This cannot be repaired merely by adding compact residue coordinates. Positive integers are dense in
\[
\mathbb Z_2\times\mathbb Z_3\times\mathbb T
\]
under
\[
n\longmapsto
\bigl(n,n,\{\log_2n\}\bigr).
\]
Indeed, fix a residue class modulo \(M=2^r3^s\) and a nonempty logarithmic-phase interval \(I\). At sufficiently large scales, the multiplicative interval corresponding to \(I\) has ordinary length greater than \(M\), so it contains an integer in the prescribed residue class.

Thus “is the same ordinary positive integer at all places” is not a closed condition in the compact state space.

If absolute height is retained in a noncompact state space, then \(x_j\to\infty\), so every compact set receives asymptotically zero empirical mass. This is the original mass escape.

Tao’s probabilistic treatment similarly uses families of approximately transported measures rather than extracting a single useful invariant Collatz probability; this reflects the same basic noncompactness issue. citeturn578358view0

---

## 9. The positive-entropy branch would close conditionally

The positive-entropy idea itself is sound once one assumes a rank-production theorem.

### Conditional rank-production hypothesis

Suppose an ergodic orbit-derived component \(\nu\) with
\[
m=\int a_0\,d\nu\leq\log_2 3
\]
and
\[
h_\nu(\sigma)>0
\]
produces a jointly \((\times2,\times3)\)-invariant ergodic circle measure whose \(\times2\)-coding is the binary suspension
\[
a_j\longmapsto 1\,0^{a_j-1}.
\]

The suspension has:

\[
\text{frequency of }1=\frac1m
\geq\frac1{\log_2 3}
> \frac12,
\]
and
\[
h_{\times2}=\frac{h_\nu(\sigma)}m>0.
\]

Rudolph–Johnson would force this measure to be Lebesgue. But Lebesgue measure under \(\times2\) has independent fair binary digits, so its \(1\)-frequency is exactly \(1/2\). Equivalently, its return-time law to the odd cylinder is
\[
\Pr(a=k)=2^{-k},
\qquad
\mathbb E a=2.
\]

Both conclusions contradict
\[
m\leq\log_2 3<2.
\]

Therefore:

\[
\boxed{\text{A positive-entropy low-mean component is impossible if rank production and coding transfer hold.}}
\]

Once the missing rank-production statement is supplied, this branch is essentially complete.

---

## 10. The zero-entropy branch does not imply periodicity

For the skew system itself, zero entropy certainly does not force periodicity.

Choose an aperiodic zero-entropy shift measure \(\nu\) on symbols \(1,2\), for example a Sturmian process with the frequency of \(2\) chosen below
\[
\log_2 3-1.
\]
Then
\[
\int a_0\,d\nu\leq\log_2 3,
\]
and
\[
\nu\times\delta_0
\]
is an aperiodic, zero-entropy, \(F\)-invariant probability.

Moreover, the exact \(2\)-adic Collatz map is topologically and measurably conjugate to the binary shift through its parity coding. Thus arbitrary aperiodic zero-entropy parity patterns are perfectly legitimate \(2\)-adic Collatz patterns, even though they need not come from ordinary positive integers. citeturn475872view2turn475872view3

So local binary admissibility and zero entropy do not imply eventual periodicity.

At the level of genuine \(\times2,\times3\)-invariant measures, the general zero-entropy classification is also the unresolved part of Furstenberg’s measure problem: positive entropy is rigid, while a complete classification of zero-entropy invariant measures is not available. citeturn578358view3

Therefore the proposed zero-entropy step would require a new **Collatz-specific zero-entropy rigidity theorem**, not merely an application of existing Furstenberg theory.

---

## 11. Exact height-sensitive recurrence that would suffice

There is nevertheless a clean way that symbolic recurrence could become an ordinary-integer repetition.

Suppose times \(p<q\) have matching centered valuation blocks of radius \(r\).

Let
\[
A^+_{p,r}
=
\sum_{i=p}^{p+r-1}a_i.
\]

The matching future blocks imply
\[
x_p\equiv x_q\pmod{2^{A^+_{p,r}}}.
\tag{9}
\]
This follows from
\[
2^{A^+_{p,r}}x_{p+r}
=
3^rx_p+C_w,
\]
because \(3\) is invertible modulo \(2^{A^+_{p,r}}\).

The matching past blocks imply
\[
x_p\equiv x_q\pmod{3^r}.
\tag{10}
\]
Indeed, for the preceding word \(v\),
\[
2^{A(v)}x_p
=
3^rx_{p-r}+C_v,
\]
so
\[
x_p\equiv 2^{-A(v)}C_v\pmod{3^r}.
\]
This is the full residue version underlying terminal-suffix locality.

By the Chinese remainder theorem,
\[
\boxed{\displaystyle
x_p\equiv x_q
\pmod{2^{A^+_{p,r}}3^r}.}
\tag{11}
\]

Consequently, if one could also prove
\[
\max(x_p,x_q)
<
2^{A^+_{p,r}}3^r,
\tag{12}
\]
then (11) would force
\[
x_p=x_q,
\]
contradicting divergence.

This isolates the missing zero-entropy statement:

> **Height-sensitive recurrence:** a zero-entropy orbit-derived process must contain centered-block recurrences whose associated two-ended modulus exceeds the actual heights at both occurrences.

Ordinary Poincaré recurrence does not imply (12). Neither does zero entropy. Zero entropy controls the number or return times of symbolic blocks only subexponentially, whereas the height at the return time can still be exponentially large in that return time.

Thus the exact two-ended congruence is available; the required comparison with escaped height is not.

---

## 12. The cycle branch

Even after divergent trajectories are excluded, a full Collatz proof must rule out nontrivial positive cycles.

Suppose a period has valuation word
\[
b_0,\ldots,b_{L-1},
\]
and put
\[
B=\sum_{i=0}^{L-1}b_i,
\qquad
B_k=\sum_{i=0}^{k-1}b_i.
\]
Iterating around the period yields
\[
2^Bx
=
3^Lx+
\sum_{k=0}^{L-1}3^{L-1-k}2^{B_k}.
\]
Hence every positive cycle must satisfy
\[
\boxed{\displaystyle
x=
\frac{
\sum_{k=0}^{L-1}3^{L-1-k}2^{B_k}
}{
2^B-3^L
}.}
\tag{13}
\]

Positivity requires
\[
2^B>3^L.
\]

For
\[
L=1,\qquad b_0=2,
\]
formula (13) gives \(x=1\), the trivial accelerated cycle.

But neither Furstenberg rigidity nor the entropy argument proves that (13) has no other positive odd integral solutions. An atomic outcome of a rigidity theorem is not automatically forbidden: multiplication by \(2\) and \(3\) has many finite rational orbits. One must still show that no such algebraic orbit has a faithful lift satisfying the Collatz carry equation and positivity.

So the phrase “reducing to a forbidden cycle equation” hides an additional theorem: the equation has been reduced to, but not forbidden by, the measure argument.

---

# Exact conditional completion theorem

The Furstenberg program would prove Collatz if the following three statements were established.

### Rank production

Every positive-entropy, orbit-derived, low-mean skew component admits a genuine jointly \((\times2,\times3)\)-invariant algebraic factor carrying the binary suspension entropy and digit frequencies.

This branch would then be contradicted by Rudolph–Johnson and (2).

### Zero-entropy nonescape

Every zero-entropy, orbit-derived, low-mean component has centered-block returns satisfying the height inequality (12).

This branch would then be contradicted by the exact congruence (11).

### Positive cycle exclusion

Equation (13) has no positive odd integral solution except
\[
L=1,\quad b_0=2,\quad x=1.
\]

Given these three statements, a counterexample can be neither divergent nor periodic, and the Collatz conjecture follows.

---

# Final status

The approach successfully yields:

- a compact orbit-derived invariant probability;
- exact skew dynamics on an adelic solenoid;
- the drift bound \(\int a_0\leq\log_2 3\);
- a strict entropy ceiling;
- equidistribution of logarithmic height modulo powers of \(2\);
- a complete Haar contradiction conditional on rank production;
- an exact two-ended recurrence criterion conditional on nonescape.

It does **not** presently yield:

- separate \(\times2\)- and \(\times3\)-invariance while retaining the carry boundary;
- transfer of symbolic entropy to an algebraic generator;
- zero-entropy periodicity or height-sensitive recurrence;
- exclusion of all nontrivial positive cycle equations.

The central new target is therefore not ordinary recurrence. It is a **boundary-rigidity theorem** that converts the variable-time skew orbit into higher-rank algebraic invariance without averaging away the positive-integer lift. Existing Furstenberg rigidity begins only after that conversion; it does not perform it.