model: GPT-5.6 Pro (Chat mode)
round: 48 -- approach 43, A topological-entropy gap
front: proof
sent: 2026-08-15T08:29Z
worked: 47m 54s

---

# Result

Carrying the proposed construction through reveals an exact obstruction: **approach 43 cannot be completed as stated**, because the two objects called \(X_{\mathrm{int}}\) and \(X_{\mathrm{crit}}\) cannot simultaneously be subshifts with the claimed entropy properties.

This is not merely the familiar warning that “entropy does not imply emptiness.” More specifically:

\[
\boxed{\text{integer realizability has the full finite language,}}
\]

and

\[
\boxed{\text{asymptotic nonnegative drift also has the full finite language.}}
\]

Closing either set to obtain compactness therefore produces the full shift and destroys the entropy gap. Keeping the entropy gap requires a nonclosed, anchored condition, for which compactness cannot promote finite realizations to a positive-integer realization.

Current literature continues to describe the pointwise Collatz conjecture and the exclusion of nontrivial cycles as unresolved; Tao’s current revision proves an almost-all result rather than a pointwise one. citeturn161280view0turn161280view6

What follows is a rigorous no-go theorem for the formulation, followed by the strongest viable repair.

---

## 1. Shortcut and valuation codings

Use the shortcut map

\[
T(n)=
\begin{cases}
n/2,&n\equiv0\pmod2,\\[2mm]
(3n+1)/2,&n\equiv1\pmod2.
\end{cases}
\]

Write

\[
\varepsilon_k(n)=T^k(n)\pmod2,\qquad
s_m(n)=\sum_{k=0}^{m-1}\varepsilon_k(n).
\]

The multiplicative coefficient after \(m\) shortcut steps is

\[
q_m(n)=\frac{3^{s_m(n)}}{2^m},
\]

and its logarithmic drift is

\[
\Phi_m(n)=s_m(n)\log 3-m\log 2.
\]

For the accelerated odd map

\[
U(x)=\frac{3x+1}{2^{a(x)}},
\qquad
a(x)=v_2(3x+1),
\]

a valuation word \(w=(a_0,\ldots ,a_{j-1})\) corresponds to the shortcut parity block

\[
1\,0^{a_0-1}\,1\,0^{a_1-1}\cdots
1\,0^{a_{j-1}-1}\,1.
\]

The final \(1\) ensures that every listed valuation is exact.

---

# 2. Integer realizability imposes no finite-word restriction

## Proposition 1

Every finite binary word occurs as the initial parity word of infinitely many positive integers.

### Proof

For every \(m\), the parity-vector map

\[
n\bmod 2^m
   \longmapsto
   \bigl(\varepsilon_0(n),\ldots,\varepsilon_{m-1}(n)\bigr)
\]

is a bijection from \(\mathbb Z/2^m\mathbb Z\) to \(\{0,1\}^m\). Consequently, a prescribed parity word determines exactly one residue class modulo \(2^m\), and that class contains infinitely many positive integers. This is the classical Terras–Everett finite parity correspondence. citeturn161280view1turn161280view5

The same conclusion holds for valuation words. If

\[
A_j=a_0+\cdots+a_{j-1},
\]

then the parity block displayed above has length \(A_j+1\). It therefore determines one residue class modulo \(2^{A_j+1}\), every positive representative of which realizes precisely the valuation word \(w\). ∎

Hence, if

\[
X_{\mathrm{int}}
 =\{(a_0(n),a_1(n),\ldots):n\text{ a positive odd integer}\},
\]

then

\[
\mathcal L(X_{\mathrm{int}})
   =\bigcup_{j\geq0}\mathbb N_{\geq1}^{\,j}.
\]

In words:

\[
\boxed{\mathcal L(X_{\mathrm{int}})\text{ is the full valuation language.}}
\]

The set \(X_{\mathrm{int}}\) is countable and shift-invariant, but it is not closed. Its closure is the full shift on the valuation alphabet. Equivalently, in the parity representation, the positive-integer parity sequences form a dense subset of the full binary shift. The extension to \(\mathbb Z_2\) makes this exact: every infinite binary sequence is the parity sequence of exactly one \(2\)-adic integer, and the parity map is a \(2\)-adic isometric conjugacy with the binary shift. citeturn161280view2turn161280view4

Thus the natural \(X_{\mathrm{int}}\) is **not a subshift** in the standard sense, while its subshift closure is the full shift.

---

# 3. Long-term criticality is also not a subshift

Put

\[
\rho=\frac{\log 2}{\log 3}
      =0.630929753571\ldots .
\]

A natural shortcut definition of nonnegative long-term drift is

\[
X_{\mathrm{crit}}
 =
 \left\{\varepsilon\in\{0,1\}^{\mathbb N}:
 \liminf_{m\to\infty}
 \frac{s_m\log3-m\log2}{m}\geq0
 \right\}.
\]

Equivalently,

\[
\liminf_{m\to\infty}\frac{s_m}{m}\geq\rho.
\]

## Proposition 2

Every finite binary word occurs in an element of \(X_{\mathrm{crit}}\).

### Proof

Given any finite word \(u\), append \(1^\infty\). The contribution of \(u\) disappears in the limiting average, and the resulting sequence has limiting drift

\[
\log3-\log2=\log(3/2)>0.
\]

Therefore every cylinder intersects \(X_{\mathrm{crit}}\). ∎

Thus

\[
\mathcal L(X_{\mathrm{crit}})=\{0,1\}^{<\infty}.
\]

Moreover \(X_{\mathrm{crit}}\) is not closed. For example,

\[
0^r1^\infty\in X_{\mathrm{crit}}
\]

for every finite \(r\), but

\[
0^r1^\infty\longrightarrow 0^\infty,
\]

and \(0^\infty\) has drift \(-\log2\).

The valuation version has the same problem. Set

\[
\alpha=\log_2 3=1.584962500721\ldots .
\]

A long-term critical valuation sequence might be defined by

\[
\limsup_{j\to\infty}\frac{A_j}{j}\leq\alpha.
\]

But every finite valuation word can be extended by \(1^\infty\), whose limiting valuation average is \(1<\alpha\). Hence this set is again dense, nonclosed, and has the full finite language.

Therefore

\[
\boxed{
\overline{X_{\mathrm{int}}}
 =
\overline{X_{\mathrm{crit}}}
 =
\text{the full shift}.
}
\]

In particular, the finite-word intersection does not shrink at all:

\[
\mathcal L(X_{\mathrm{int}})
 \cap
\mathcal L(X_{\mathrm{crit}})
 =
\text{the full language}.
\]

---

# 4. Where the numerical entropy gap really occurs

There is nevertheless a genuine numerical gap. It applies to words satisfying a drift constraint **at their endpoint**, not to the language of an asymptotic-drift subshift.

Define

\[
\mathcal C_m=
\left\{
u\in\{0,1\}^m:
|u|_1\log3-m\log2\geq0
\right\}.
\]

Then

\[
|\mathcal C_m|
 =
\sum_{s=\lceil \rho m\rceil}^{m}\binom ms.
\]

Stirling’s formula gives

\[
|\mathcal C_m|
 =
\exp\bigl(mH(\rho)+O(\log m)\bigr),
\]

where

\[
H(p)=-p\log p-(1-p)\log(1-p).
\]

Numerically,

\[
H(\rho)=0.658458995327\ldots
\]

or, in bits,

\[
\frac{H(\rho)}{\log2}
 =0.949955527188\ldots .
\]

Thus the entropy deficit is

\[
g=\log2-H(\rho)
  =0.034688185232\ldots
\]

nats per shortcut step, or

\[
\frac g{\log2}
 =0.050044472812\ldots
\]

bits per shortcut step. Equivalently,

\[
\frac{|\mathcal C_m|}{2^m}
 =
\exp(-gm+O(\log m))
 \approx 0.9659065532^m
\]

up to polynomial factors.

This is a real exponential scarcity. But the **absolute** number of critical words is

\[
|\mathcal C_m|\approx 1.9318131065^m,
\]

which still grows exponentially. It is not an extinction estimate.

For accelerated valuation words, the endpoint-critical count is similarly explicit:

\[
\begin{aligned}
M_j
&=
\#\left\{(a_0,\ldots,a_{j-1})\in\mathbb N_{\geq1}^j:
\sum_i a_i\leq \lfloor\alpha j\rfloor\right\}\\
&=
\sum_{A=j}^{\lfloor\alpha j\rfloor}
   \binom{A-1}{j-1}\\
&=
\binom{\lfloor\alpha j\rfloor}{j}.
\end{aligned}
\]

Consequently,

\[
M_j
 =
\exp\left(
j\left[
\alpha\log\alpha-(\alpha-1)\log(\alpha-1)
\right]+O(\log j)
\right),
\]

with exponential base

\[
2.8395137305\ldots .
\]

Since

\[
\frac{2.8395137305\ldots}{3}
 =0.9465045768\ldots ,
\]

there is a gap relative to the \(3^j\) endpoint residue space. But Proposition 1 says that **every one of these critical finite words is realized by positive integers**. Thus intersecting with finite integer realizability removes nothing.

There are therefore only two interpretations:

1. “Critical word” means extendable to a sequence with nonnegative asymptotic drift. Then every finite word is critical and the entropy is full.

2. “Critical word” means its own endpoint drift is nonnegative. Then there is an entropy gap, but these words are not the language of a subshift.

Indeed, a word \(0^r1^M\) can have positive total drift for large \(M\), while containing the arbitrarily noncritical subword \(0^r\). A subshift language must be closed under taking subwords.

---

# 5. The explicit compactness failure: the \(2\)-adic ghost \(-1\)

The obstruction is visible in one elementary family.

For \(m\geq1\), let

\[
n_m=2^m-1.
\]

Then for \(0\leq k\leq m\),

\[
T^k(n_m)=3^k2^{m-k}-1.
\]

This follows immediately by induction:

\[
T\!\left(3^k2^{m-k}-1\right)
 =
\frac{3(3^k2^{m-k}-1)+1}{2}
 =
3^{k+1}2^{m-k-1}-1.
\]

Thus \(n_m\) has parity prefix \(1^m\), and

\[
T^m(n_m)=3^m-1.
\]

So every finite prefix of the maximally growing path

\[
1^\infty
\]

is realized by a positive integer. Nevertheless,

\[
2^m-1\longrightarrow -1
\qquad\text{in }\mathbb Z_2,
\]

and the infinite all-ones parity sequence belongs to the \(2\)-adic integer \(-1\), not to a positive integer. This correspondence is also obtained directly from the inverse parity transform. citeturn161280view2turn161280view3

This is exactly what compactness does to the proposed argument:

\[
\text{positive finite realizations}
\quad\stackrel{\text{compactness}}{\longrightarrow}\quad
\text{\(2\)-adic realization},
\]

not

\[
\text{positive finite realizations}
\quad\longrightarrow\quad
\text{one positive integer realizing every prefix}.
\]

For an infinite parity path \(u\), let \(r_m(u)\in[0,2^m)\) be its unique realizing residue modulo \(2^m\). The corresponding \(2\)-adic point is an ordinary nonnegative integer precisely when \(r_m(u)\) is eventually constant. For \(1^\infty\),

\[
r_m=2^m-1,
\]

so the residues never stabilize.

Hence the missing property is not compactness but

\[
\boxed{\text{eventual stabilization of the canonical binary residue.}}
\]

Entropy controls the number of possible residues. It does not control whether one nested residue sequence eventually stabilizes.

---

# 6. Natural heredity conflicts with criticality

Suppose \(n\) has a nonconvergent orbit. Then \(2n\) also has a nonconvergent orbit, because

\[
T(2n)=n.
\]

At the symbolic level,

\[
\varepsilon(2n)=0\,\varepsilon(n).
\]

Therefore any naturally backward-hereditary bad set contains

\[
0^k\varepsilon(n)
\qquad(k\geq0).
\]

If this set is closed, it must also contain the limit

\[
0^\infty.
\]

But \(0^\infty\) has drift \(-\log2\). Thus:

## Proposition 3

There is no nonempty closed set of parity sequences that is simultaneously

- backward-hereditary under the guaranteed even inverse branch, and
- contained in the uniformly nonnegative-drift set.

A still more general topological observation makes the conflict clear.

## Prefix-replacement lemma

Let \(K\subseteq\{0,1\}^{\mathbb N}\) be nonempty and closed. Suppose that whenever \(x\in K\), replacing any finite prefix of \(x\) by an arbitrary finite binary word leaves the resulting sequence in \(K\). Then

\[
K=\{0,1\}^{\mathbb N}.
\]

### Proof

Fix \(x\in K\). For an arbitrary target \(z\), form

\[
z_0z_1\cdots z_{m-1}x.
\]

Every such sequence lies in \(K\), and as \(m\to\infty\) it converges to \(z\). Closedness gives \(z\in K\). ∎

Long-term drift is insensitive to finite prefixes. Therefore its natural heredity, combined with closedness, forces the full shift rather than extinction.

---

# 7. Divergent orbits really would be critical—but cycles would not

The drift condition is relevant to divergent nonperiodic trajectories.

Suppose a positive orbit is nonperiodic and nonconvergent. It must tend to infinity: otherwise it visits some finite interval infinitely often, and hence repeats an integer, producing a cycle.

For the shortcut map,

\[
\log T(x)-\log x=
\begin{cases}
-\log2,&x\text{ even},\\[1mm]
\log3-\log2+\log\left(1+\dfrac1{3x}\right),
 &x\text{ odd}.
\end{cases}
\]

Summing gives

\[
\log x_m-\log x_0
 =
s_m\log3-m\log2
 +
\sum_{\substack{k<m\\x_k\text{ odd}}}
 \log\left(1+\frac1{3x_k}\right).
\]

Since \(x_k\to\infty\), the final sum divided by \(m\) tends to zero. Because \(\log x_m/m\geq0\),

\[
\liminf_{m\to\infty}
\frac{s_m\log3-m\log2}{m}\geq0.
\]

Thus every divergent nonperiodic orbit would indeed produce an asymptotically critical parity sequence.

But a cycle behaves differently. For a period-\(m\) cycle with \(s\) odd steps, summing the same identity around the cycle gives

\[
0
 =
s\log3-m\log2
 +
\sum_{\substack{k<m\\x_k\text{ odd}}}
 \log\left(1+\frac1{3x_k}\right).
\]

The correction sum is strictly positive, so

\[
s\log3-m\log2<0.
\]

Therefore a multiplicative nonnegative-drift set excludes every positive cycle, including any hypothetical nontrivial one. Proving that no positive integer lies in \(X_{\mathrm{int}}\cap X_{\mathrm{crit}}\) would exclude divergence, but it would **not** exclude nontrivial cycles.

One can instead define drift using the actual height change, in which a cycle has zero drift. But actual height drift depends on the affine correction

\[
\log\left(1+\frac1{3x}\right),
\]

not on the valuation word alone. Such a system must carry archimedean height or affine-carry information and is no longer a valuation subshift.

---

# 8. The genuine averaged inverse-pressure gap

There is one strong entropy calculation that survives the audit and is likely the useful core of a repaired argument.

For a binary word \(u\) of length \(m\), with \(s=|u|_1\), the corresponding affine iterate has the form

\[
2^m y=3^s x+C_u.
\]

Reading \(u\) as an inverse word ending at \(y\),

\[
x=\frac{2^m y-C_u}{3^s}.
\]

For fixed \(u\), integrality of \(x\) requires \(y\) to belong to exactly one residue class modulo \(3^s\). Hence, when \(y\) is averaged uniformly modulo a sufficiently high power of \(3\), the probability that \(u\) is inverse-integral is exactly \(3^{-s}\).

Let \(N_m(y)\) count inverse-integral words with nonnegative drift. Ignoring positivity, which only enlarges the count,

\[
\mathbb E_y N_m(y)
 =
\sum_{s=\lceil\rho m\rceil}^{m}
 \binom ms3^{-s}.
\]

For \(s=pm\), the exponent is

\[
H(p)-p\log3.
\]

On \(p\geq\rho\), this is maximized at \(p=\rho\), and

\[
\rho\log3=\log2.
\]

Therefore

\[
\boxed{
\mathbb E_yN_m(y)
 =
\exp\bigl(-gm+O(\log m)\bigr)
}
\]

with

\[
g=\log2-H(\rho)
 =0.034688185232\ldots>0.
\]

So the averaged number of critical inverse words really does decay like

\[
0.9659065532^m
\]

up to polynomial factors.

Equivalently, the tilted averaged transfer factor is

\[
F(t)=2^{-t}\bigl(1+3^{t-1}\bigr).
\]

Its minimum occurs at

\[
t_*
 =
1+\frac{\log(\rho/(1-\rho))}{\log3}
 =
1.4880771321\ldots ,
\]

and

\[
F(t_*)=e^{-g}=0.9659065532\ldots<1.
\]

This is the authentic topological-pressure gap.

It is, however, only an average over endpoints. It is not uniform. The family

\[
x_m=2^m-1,\qquad y_m=3^m-1
\]

provides an exceptional endpoint for the word \(1^m\) at every depth, and the \(3\)-adic limit is again \(-1\). A single orbit could in principle keep moving through exceptional endpoint classes even though those classes have exponentially shrinking density.

Thus Haar measure, entropy, Hausdorff dimension, or Borel–Cantelli arguments cannot exclude the exceptional positive-integer trajectory by themselves.

---

# 9. The exact theorem a repaired approach must establish

The appropriate replacement is not an ordinary entropy bound but a **uniform arithmetic negative-pressure certificate**.

## Weighted extinction lemma

Let \(\mathcal T_m\) be a finite set of arithmetic survivor states of depth \(m\), and let \(\Phi(v)\) be the accumulated logarithmic drift. Suppose that for some \(t,\delta>0\),

\[
Z_m=
\sum_{v\in\mathcal T_m} e^{t\Phi(v)}
 \leq C e^{-\delta m}.
\]

Suppose also that every hypothetical divergent orbit supplies states \(v_m\in\mathcal T_m\) with

\[
\liminf_{m\to\infty}\frac{\Phi(v_m)}m\geq0.
\]

Then no divergent orbit exists.

### Proof

Choose

\[
0<\eta<\frac{\delta}{t}.
\]

For all sufficiently large \(m\),

\[
\Phi(v_m)\geq-\eta m.
\]

The single term corresponding to \(v_m\) gives

\[
Z_m\geq e^{-t\eta m}.
\]

But

\[
e^{-t\eta m}>Ce^{-\delta m}
\]

for sufficiently large \(m\), a contradiction. ∎

A local block form would be even better. One would seek a positive state weight \(W\), a block length \(L\), and \(\theta<1\) such that

\[
\sum_{v\longrightarrow u\atop\text{\(L\)-step survivor}}
 e^{t(\Phi(u)-\Phi(v))}W(u)
 \leq
 \theta W(v)
\]

for every nonterminal state \(v\), while along any genuine positive-integer orbit

\[
\log W(v_m)=o(m).
\]

Iterating would give the required negative pressure.

The state cannot consist only of a valuation suffix. It must record enough information to control:

\[
\begin{array}{ll}
\text{\(2\)-adic side:}&
\text{whether canonical seed residues stabilize;}\\[1mm]
\text{\(3\)-adic side:}&
\text{endpoint congruences and exceptional proximity to }-1;\\[1mm]
\text{real side:}&
\text{height and affine carry, so that cycles and escape are distinguished.}
\end{array}
\]

The terminal-suffix locality theorem from the preceding work is valuable for making the \(3\)-adic component local. But the \(2\)-adic stabilization and archimedean nonescape conditions remain indispensable.

---

# Final verdict

The requested proof does not close, because the central proposed object has incompatible requirements:

\[
\boxed{
\begin{array}{c}
\text{keeping actual positive integers gives a dense, nonclosed set;}\\[1mm]
\text{closing it gives the full shift;}\\[1mm]
\text{keeping long-term drift gives a dense, nonclosed set;}\\[1mm]
\text{closing it also gives the full shift.}
\end{array}}
\]

The numerical entropy deficit

\[
0.0500444728\ldots\text{ bits per shortcut step}
\]

is genuine, but it is a large-deviation or averaged inverse-pressure gap—not an entropy gap for the intersection of two compact subshifts.

Compactness does not produce a positive-integer counterexample; it produces \(2\)-adic ghosts such as

\[
-1\longleftrightarrow1^\infty.
\]

Accordingly, a correct version of approach 43 must prove a **uniform weighted arithmetic-pressure inequality** that simultaneously controls binary residue stabilization, ternary endpoint carries, and real height. Establishing that inequality would indeed exclude divergent trajectories, but a separate component would still be required to exclude nontrivial cycles.