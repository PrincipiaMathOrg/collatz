# Charge transfer and integer rounding of the dual-tail companion

**Date:** 26 August 2026  
**Target:** `OPEN-HSCI-01`  
**Mode:** CALCULATE, followed by SOLVE on the exact centered and rounded recurrences  
**Status:** the charge-transfer and nonpositive-defect localization theorems are proved; two proposed shell transfers are refuted

## 1. Setup

We retain the normalized hypothetical divergent ray from
`divergence_dual_tail_companion.md`:

\[
x_{j+1}:=\frac{3x_j+1}{2^{a_j}},
\qquad
q_j:=\frac{3^j}{2^{A_j}},
\qquad
x_j+e_j=q_j\mathcal K,
\]

where

\[
2^{a_j}e_{j+1}=3e_j-1,
\qquad
q_j\longrightarrow\infty,
\qquad
\frac{e_j}{q_j}\longrightarrow0,
\qquad
\sum_{j=0}^{\infty}\frac1{e_j}=\infty.
\tag{1.1}
\]

The purpose of this note is to identify the exact part of the real
companion that can be transferred to integer arithmetic.

## 2. The companion floor

We begin with a global lower bound which is stronger than the pointwise
estimate (e_j>1/3).

**Theorem 2.1 (companion floor).** We have

\[
\boxed{e_j\geq1\qquad(j\geq0).}
\tag{2.1}
\]

If (e_j=1) at one index, then (a_t=1) and (e_t=1) for every
(t\geq j). Consequently, on a paired positive integer ray we have

\[
\boxed{e_j>1\qquad(j\geq0).}
\tag{2.2}
\]

**Proof.** Let (eta:=\inf_j e_j). Since (a_j\geq1), the backward
recurrence gives

\[
e_j=\frac{1+2^{a_j}e_{j+1}}3
\geq\frac{1+2\eta}3.
\]

Taking the infimum gives (eta\geq(1+2\eta)/3), and hence
(eta\geq1).

If (e_j=1), then

\[
2^{a_j}e_{j+1}=2.
\]

By (2.1), this forces (a_j=1) and (e_{j+1}=1). Induction gives the
first conclusion. On the integer side, an infinite exponent-one tail would
give

\[
x_{j+L}+1=\left(\frac32\right)^L(x_j+1).
\]

Thus (2^L\mid x_j+1) for every (L), which is impossible for a fixed
positive integer (x_j). This proves (2.2). \(square\)

## 3. Centered charge transfer

Define

\[
X_j:=x_j+1,
\qquad
E_j:=e_j-1,
\qquad
c(a):=2^a-2.
\tag{3.1}
\]

The two affine constants become one nonnegative charge.

**Theorem 3.1 (centered companion).** For every (j\geq0),

\[
\boxed{
2^{a_j}X_{j+1}=3X_j+c(a_j),
\qquad
2^{a_j}E_{j+1}=3E_j-c(a_j).}
\tag{3.2}
\]

In particular, exponent one is the unique charge-free letter. Moreover,

\[
\boxed{
\frac{E_j}{q_j}
=\sum_{t=j}^{\infty}\frac{c(a_t)}{3q_t}.}
\tag{3.3}
\]

The ratio (E_j/X_j) is nonincreasing, and it decreases strictly whenever
(a_j>1).

**Proof.** Equations (3.2) follow by adding and subtracting (1) in the
two recurrences. Since (q_{j+1}=3q_j/2^{a_j}), we obtain

\[
\frac{E_{j+1}}{q_{j+1}}
=\frac{E_j}{q_j}-\frac{c(a_j)}{3q_j}.
\]

Now (E_j/q_j=e_j/q_j-1/q_j\to0), so telescoping proves (3.3).
Finally,

\[
\frac{E_{j+1}}{X_{j+1}}
=\frac{3E_j-c(a_j)}{3X_j+c(a_j)}
\leq\frac{E_j}{X_j}.
\]

The inequality is strict when (c(a_j)>0). \(square\)

In other words, every nonunit exponent transfers a positive charge from
the real companion to the integer orbit. Formula (3.3) says that the
complete future charge schedule is already stored in the present
companion excess.

## 4. The ceiling cocycle

Define

\[
m_j:=\lceil e_j\rceil,
\qquad
\theta_j:=m_j-e_j\in[0,1),
\qquad
N_j:=x_j+m_j=\lceil q_j\mathcal K\rceil.
\tag{4.1}
\]

We also define the integer rounding defect

\[
d_j:=2^{a_j}m_{j+1}-3m_j+1
=2^{a_j}N_{j+1}-3N_j.
\tag{4.2}
\]

**Theorem 4.1 (nonpositive-defect localization).** The defects satisfy

\[
\boxed{
d_j=2^{a_j}\theta_{j+1}-3\theta_j,
\qquad
-2\leq d_j\leq2^{a_j}-1.}
\tag{4.3}
\]

Moreover,

\[
\boxed{
\frac{m_L}{q_L}
=m_0\prod_{j=0}^{L-1}
\left(1-\frac{1-d_j}{3m_j}\right),}
\tag{4.4}
\]

and the reciprocal mass on nonpositive defects diverges:

\[
\boxed{
\sum_{\substack{j\geq0\\d_j\leq0}}\frac1{m_j}=\infty.}
\tag{4.5}
\]

Since (e_j\leq m_j<e_j+1\leq2e_j), (4.5) localizes a divergent portion
of the original companion mass to the three defects
(d_j\in\{-2,-1,0\}).

**Proof.** Subtract the exact recurrence for (e_j) from (4.2) to obtain
the first identity in (4.3). The stated range follows from
(0\leq\theta_j<1). Rewriting (4.2) gives

\[
m_{j+1}=\frac{3m_j}{2^{a_j}}
\left(1-\frac{1-d_j}{3m_j}\right).
\]

Division by (q_{j+1}=3q_j/2^{a_j}) and telescoping prove (4.4).
We have (m_L/q_L\to0).

Suppose towards a contradiction that the sum in (4.5) converges. For
(d_j\leq0), put

\[
u_j:=\frac{1-d_j}{3m_j}.
\]

Every factor in (4.4) is positive. Since (d_j\geq-2), we have
(u_j\leq1/m_j). Apart from finitely many indices with (m_j=1),
(u_j\leq1/2), and therefore

\[
-\log(1-u_j)\leq2u_j\leq\frac2{m_j}.
\]

Thus the total negative logarithmic contribution from (d_j\leq0) is
finite. Every factor with (d_j\geq1) is at least one. The product in
(4.4) is consequently bounded away from zero, contradicting
(m_L/q_L\to0). This proves (4.5). \(square\)

The case (d_j=0) is an exact integer (3x-1) edge. The new obstruction
is precise: defects (-1) and (-2), together with breaks between exact
edges, prevent us from applying the existing integer shell theorem to one
coherent trajectory.

## 5. Finite stabilization potential

For a finite strict word (w=(a_0,\ldots,a_{L-1})), let
(ho(w)) be its least positive ordinary dyadic representative. Define
the minimal finite companion by

\[
e_L^{(w)}:=1,
\qquad
e_j^{(w)}:=\frac{1+2^{a_j}e_{j+1}^{(w)}}3,
\tag{5.1}
\]

and put

\[
\mathcal S(w):=\sum_{j=0}^{L-1}\frac1{e_j^{(w)}}.
\tag{5.2}
\]

If one could prove any universal bound

\[
\mathcal S(w)\leq F(\rho(w))
\tag{5.3}
\]

with (F(n)<\infty) for every fixed (n), then HSCI would follow. Indeed,
on a stabilized ordinary ray we would have (ho(w_L)=n) for every large
(L), while (e_j^{(w_L)}\leq e_j). Hence

\[
\mathcal S(w_L)
\geq\sum_{j<L}\frac1{e_j}
\longrightarrow\infty.
\]

This is a genuine sufficient gate. It is not proved here.

## 6. Exact probes and regressions

The exact-word probe
`sync/dual_tail_stabilization_probe.js` enumerates every strict word through
length (20). There are (13{,}472{,}296) words at length (20). The
coefficient-one guess

\[
\mathcal S(w)\leq\log_2(\rho(w)+1)
\]

already fails at length (6) for the prefix
((1,2,1,1,1,1)) of seed (27).

A second guess,

\[
\mathcal S(w)\leq3\log(\rho(w)+1),
\tag{6.1}
\]

survives the exhaustive length-(20) scan but is false. The exact orbit of
seed (27) has a strict prefix of length (32) for which

\[
\mathcal S(w)=14.6875597789\ldots,
\qquad
3\log(28)=9.9966135305\ldots.
\]

Thus a simple logarithmic Lyapunov estimate with this constant does not
close (5.3).

The fixed-seed probe
`sync/dual_tail_fixed_seed_probe.js` scanned the ten million odd seeds at
most (20{,}000{,}000). The longest strict prefix found has length (180).
These data are diagnostic only.

Finally, we formed a width-two layered graph whose vertices at time (j)
are (lfloor e_j^{(w)}\rfloor) and
(lceil e_j^{(w)}\rceil). An edge is present when two consecutive
vertices satisfy the exact integer (3x-1) recurrence. For the 87-step
high-mass prefix from seed (270271), 50 layers admit an exact edge, but
the longest coherent path has only five edges. Local floor-or-ceiling
exactness therefore does not force a long integer shadow.

## 7. Exact remaining question

The new theorem reduces the rounding route to the following statement.

> Use the paired positive integer orbit to prove a summable shell bound for
> the indices (d_j\in\{-2,-1,0\}), without replacing them by independent
> local integer shadows.

By (4.5), such a bound contradicts every normalized divergent ray. The
proof must control coherence across rounding defects. The width-two graph
regression shows that local edge density alone is insufficient.
