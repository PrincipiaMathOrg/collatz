# The fixed dual tail companion of a normalized divergent ray

**Date:** 26 August 2026  
**Target:** `OPEN-HSCI-01`  
**Mode:** THEORIZE, followed by SOLVE on the exact tail object  
**Status:** the synchronized companion and reciprocal-mass dichotomy are proved; the required shell extension remains open

## 1. Setup

Assume that one fixed positive odd seed \(n\) has a normalized accelerated
orbit

\[
x_{j+1}:=\frac{3x_j+1}{2^{a_j}},
\qquad
A_j:=\sum_{i<j}a_i,
\qquad
q_j:=\frac{3^j}{2^{A_j}},
\qquad
r_j:=\frac1{q_j}.
\]

We retain the exact divergent-ray conclusions

\[
q_j>1\quad(j\geq1),
\qquad
q_j\longrightarrow\infty,
\qquad
R:=\sum_{j=0}^{\infty}r_j<\infty.
\]

Put

\[
h_j:=\frac{x_j}{q_j}.
\]

The affine recursion gives

\[
h_{j+1}=h_j+\frac{r_j}{3},
\qquad
\mathcal K:=\lim_{j\to\infty}h_j
=n+\frac R3.
\]

The finite-prefix negative shadows in the earlier audit depend on the
chosen endpoint. The construction below instead produces one fixed
infinite companion from the stationary constant \(\mathcal K\).

## 2. The dual tail companion

Define

\[
e_j:=q_j(\mathcal K-h_j)
=\frac{q_j}{3}\sum_{t=j}^{\infty}r_t.
\tag{2.1}
\]

Every \(e_j\) is a positive real number.

**Theorem 2.1 (fixed synchronized companion).** For every \(j\geq0\),

\[
\boxed{x_j+e_j=q_j\mathcal K}
\tag{2.2}
\]

and

\[
\boxed{2^{a_j}e_{j+1}=3e_j-1.}
\tag{2.3}
\]

Thus the same valuation word drives the positive integer \(3x+1\) orbit
\((x_j)\) and a positive real \(3x-1\) orbit \((e_j)\).

**Proof.** Equation (2.2) follows immediately from
\(x_j=q_jh_j\). Moreover,

\[
\begin{aligned}
\mathcal K-h_{j+1}
&=\mathcal K-h_j-\frac1{3q_j}\\
&=\frac{3e_j-1}{3q_j}.
\end{aligned}
\]

Since \(q_{j+1}=3q_j/2^{a_j}\), multiplication by \(q_{j+1}\)
gives (2.3). \(\square\)

In particular,

\[
e_j>\frac13
\qquad(j\geq0).
\tag{2.4}
\]

The companion is fixed by the complete infinite ray. It is not a moving
finite-window construction and it uses the same seed \(n\) and stationary
constant \(\mathcal K\) at every depth.

## 3. Exact hazard telescoping

Let

\[
R_j:=\sum_{t=j}^{\infty}r_t.
\]

Equation (2.1) becomes

\[
e_j=\frac{R_j}{3r_j}.
\tag{3.1}
\]

Consequently

\[
\boxed{
\frac1{3e_j}=\frac{r_j}{R_j},
\qquad
1-\frac1{3e_j}=\frac{R_{j+1}}{R_j}.}
\tag{3.2}
\]

The reciprocal \(1/(3e_j)\) is exactly the discrete hazard of the tail
mass \(R_j\).

**Theorem 3.1 (opposite reciprocal masses).** The synchronized pair
satisfies

\[
\boxed{
\prod_{j=0}^{L-1}
\left(1-\frac1{3e_j}\right)
=\frac{R_L}{R_0}
=\frac{\mathcal K-h_L}{\mathcal K-n}}
\tag{3.3}
\]

and hence

\[
\boxed{\sum_{j=0}^{\infty}\frac1{e_j}=\infty.}
\tag{3.4}
\]

On the integer side,

\[
\boxed{
\prod_{j=0}^{L-1}
\left(1+\frac1{3x_j}\right)
=\frac{h_L}{n}}
\tag{3.5}
\]

and therefore

\[
\boxed{\sum_{j=0}^{\infty}\frac1{x_j}<\infty.}
\tag{3.6}
\]

**Proof.** Equation (3.3) telescopes directly from (3.2). Since
\(R_L\to0\), the product tends to zero. All of its factors lie strictly
between zero and one. If \(\sum_j1/e_j\) converged, then the standard
infinite-product criterion would make the product positive. This proves
(3.4).

For the other side, the accelerated recurrences give

\[
\frac{h_{j+1}}{h_j}=1+\frac1{3x_j},
\]

which proves (3.5). Its limit is \(\mathcal K/n<\infty\). Since
\(0<1/(3x_j)\leq1/3\), convergence of the positive logarithmic sum is
equivalent to convergence of \(\sum_j1/x_j\). This proves (3.6).
\(\square\)

The same result follows from the paired product identity

\[
\frac{e_L/e_0}{q_L}
=\prod_{j=0}^{L-1}\left(1-\frac1{3e_j}\right),
\]

but the hazard form (3.2) records the exact reason for divergence.

## 4. What the theorem adds

The existing audited shell theorem gives a uniform reciprocal-mass bound
for every finite positive simple **integer** \(3x-1\) shortcut path. If the
companion \((e_j)\) were an integer path to which that theorem applied,
(3.4) would be an immediate contradiction.

The companion need not be integral. This is not a cosmetic gap. The real
recurrence

\[
2^{a_j}e_{j+1}=3e_j-1
\]

can support behavior excluded by congruence and spacing arguments for
integer negative paths. Consequently the shell theorem cannot simply be
cited for \((e_j)\).

The exact new completion target is the following synchronized shell
statement.

> For a fixed positive integer \(3x+1\) orbit and a fixed positive real
> \(3x-1\) companion satisfying (2.2) and (2.3), prove a uniform upper
> bound on \(\sum_{j<L}1/e_j\), using the integrality and injectivity of
> the \(x_j\) side.

Such a theorem would contradict (3.4) and prove HSCI. It is not supplied by
the present identities. In particular, (2.2) alone gives only

\[
\frac1{x_j}+\frac1{e_j}
\geq\frac4{q_j\mathcal K},
\]

whose right side is summable and therefore has the wrong direction for an
upper bound.

## 5. Regressions and next step

Any proposed synchronized shell argument must pass the following tests.

1. The real fixed point \(e_j=1\) driven by the word \(1^\infty\) has
   infinite reciprocal mass. It is excluded only by the absence of a
   paired positive ordinary integer \(3x+1\) ray with the required strict
   normalization.
2. The near-critical symbolic countermodels in `padic_hsci.md` have
   positive tail companions and reproduce the hazard identity. Their
   finite ordinary realizations use moving seeds, so they do not satisfy
   the fixed pair (2.2) at all depths.
3. Rounding \(e_j\) destroys the exact negative recurrence by an error
   multiplied by \(2^{a_j}\). An integer-shell proof must control that
   accumulated error rather than assume robustness.

The next localized question is whether the fixed integral orbit forces a
nontrivial separation law for the fractional parts of the companion under
the paired recurrence. A positive answer could extend the shell bound from
integer negative paths to the synchronized real companions that arise from
HSCI. No such separation theorem is claimed here.
