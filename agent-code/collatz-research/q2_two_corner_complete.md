# The complete two-corner sector of the strict \(q=2\) gate

**Date:** 26 August 2026  
**Mode:** SOLVE  
**Status:** complete for the sector stated below. Every anchored
\(q_s=2,b=1\) strict or equality target has at least three removable
Ferrers corners. The proof classifies the complete two-corner family,
excludes weights \(s\geq415\) analytically, and checks every smaller profile
by exact integer arithmetic.

## 1. Setup

Put

\[
\alpha:=\log_2 3,
\qquad
k_i:=\lceil i\alpha\rceil,
\qquad
B_i:=\lfloor i\alpha\rfloor=k_i-1
\quad(i\geq1).
\tag{1}
\]

Let \(s\geq3\) satisfy

\[
k_s-k_{s-1}=1.
\tag{2}
\]

Write

\[
N:=k_s,
\qquad
e:=N-s,
\qquad
M:=2^N,
\qquad
P:=3^s,
\qquad
D:=M-P.
\tag{3}
\]

An anchored \(b=1\) profile has positions

\[
0=A_0<A_1<\cdots<A_{s-1}=N-2,
\qquad
A_i\leq B_i.
\tag{4}
\]

Define

\[
d_i:=A_i-i,
\qquad
m_i:=B_i-i.
\tag{5}
\]

The delay path \(d_i\) is nondecreasing, \(d_i\leq m_i\), and

\[
d_0=0,
\qquad
d_{s-1}=m_{s-1}=e-1.
\tag{6}
\]

Its removable Ferrers corners are exactly the strict increases of \(d_i\).
The one-corner theorem gives the preliminary conclusion

\[
|K(I)|\geq2
\tag{7}
\]

for every hypothetical target.

## 2. Complete classification of two corners

At a \(q_s=2\) weight, the preceding ceiling increment is two. Consequently,

\[
k_{s-1}-k_{s-2}=2,
\qquad
m_{s-2}=e-2.
\tag{8}
\]

In particular, the terminal delay \(e-1\) is unavailable before the last
vertex.

Suppose now that \(d_i\) has exactly two strict increases. The last one must
occur at \(s-1\) and must reach \(e-1\). Before it, there is one index
\(J\) and one level \(a\) such that

\[
\boxed{
d_i=
\begin{cases}
0,&0\leq i<J,\\
a,&J\leq i\leq s-2,\\
e-1,&i=s-1,
\end{cases}}
\tag{9}
\]

where

\[
1\leq J\leq s-2,
\qquad
1\leq a\leq m_J.
\tag{10}
\]

Conversely, every pair in \((10)\) gives an anchored delay path with exactly
two corners. Thus \((9)\) is necessary and sufficient.

The corresponding exponent word is

\[
\boxed{
(1^{J-1},a+1,1^{s-J-2},e-a,2).}
\tag{11}
\]

The runs with exponent one are allowed to be empty. Since
\(a\leq m_J\leq m_{s-2}=e-2\), the penultimate exponent \(e-a\) is at
least two.

The exact carry is

\[
\boxed{
C(J,a)
=P+(2^a-1)2^J3^{s-J}
-3\cdot2^{s+a-1}
+\frac M4.}
\tag{12}
\]

This follows by summing the positions \(i\) for \(i<J\), the positions
\(i+a\) for \(J\leq i\leq s-2\), and the terminal position \(N-2\).

## 3. The exponent-one cylinder lemma

We use one elementary divisibility twice.

**Lemma 1.** Suppose a positive odd state \(x\) begins \(L\) consecutive
accelerated steps of exponent one, with the state after those steps again
odd. Then

\[
\boxed{2^{L+1}\mid x+1.}
\tag{13}
\]

**Proof.** Iterating \(y\mapsto(3y+1)/2\) gives

\[
x_L+1=\frac{3^L(x+1)}{2^L}.
\]

The left side is even and \(3^L\) is odd, which proves \((13)\).
\(\square\)

Assume that the profile in \((9)\) is a strict or equality target with
positive odd start \(n\). Every proper valuation is then realized exactly.
The established target estimate gives

\[
n<153s^{14.3}.
\tag{14}
\]

The first exponent-one run in \((11)\) has length \(J-1\). Lemma 1 gives

\[
2^J\mid n+1,
\]

and hence

\[
\boxed{2^J<154s^{15}.}
\tag{15}
\]

Let \(x_J\) be the state after the exponent \(a+1\). Its deformation height
is

\[
h_J=m_J-a.
\]

The established state envelope gives

\[
x_J<2^{h_J}H_s,
\qquad
H_s:=307s^{15}.
\tag{16}
\]

The middle exponent-one run in \((11)\) has length \(s-J-2\). Applying
Lemma 1 at \(x_J\), then using integrality in \((16)\), gives

\[
2^{s-J-1}\mid x_J+1,
\qquad
2^{s-J-1}\leq2^{h_J}H_s.
\tag{17}
\]

Since

\[
h_J\leq m_J=\lfloor J(\alpha-1)\rfloor\leq J-1,
\]

equation \((17)\) implies

\[
\boxed{2^{s-2J}\leq307s^{15}.}
\tag{18}
\]

Squaring \((15)\) and multiplying by \((18)\) proves the uniform target
restriction

\[
\boxed{
2^s<307\cdot154^2s^{45}
=7{,}280{,}812s^{45}.}
\tag{19}
\]

## 4. Analytic cutoff

Exact integer arithmetic gives

\[
2^{415}>7{,}280{,}812\cdot415^{45}
\tag{20}
\]

and

\[
2\cdot415^{45}>416^{45}.
\tag{21}
\]

The ratio \((1+1/s)^{45}\) decreases with \(s\). Therefore \((21)\)
propagates the reverse of \((19)\) from \(s=415\) to every larger weight.
No two-corner strict or equality target has

\[
s\geq415.
\tag{22}
\]

## 5. Exact finite certificate

It remains to check \(s\leq414\). For every \(q_s=2\) weight in this
range, the certificate enumerates every pair \((J,a)\) in \((10)\),
evaluates \((12)\), and computes

\[
\rho=[-CP^{-1}]_M,
\qquad
Z=\frac{P\rho+C}{M},
\qquad
\tau=[CM^{-1}]_D.
\tag{23}
\]

It checks both the direct FCD sign and the stronger sufficient inequality

\[
3\tau\geq s.
\tag{24}
\]

It also tests the complete formal target interval

\[
\tau=0
\quad\text{or}\quad
1\leq\tau\leq
\left\lceil\frac{e-1}{2}\right\rceil.
\tag{25}
\]

The checker independently brute-enumerates all anchored delay paths through
weight twelve and confirms the classification \((9)\). It also compares
\((12)\) with direct cell-by-cell carry evaluation through weight twenty.
Its exact output is

~~~text
finiteMaximum=414
analyticStart=415
q2Weights=171
profiles=2816721
strictFormalHits=0
equalityFormalHits=0
fcdFailures=0
tauBoundFailures=0
classificationRegressionProfiles=28
carryRegressionProfiles=262
analyticBase=true
analyticPropagation=true
~~~

The certificate is
[inverse/q2_two_corner_certificate.js](inverse/q2_two_corner_certificate.js).
The separate
[inverse/q2_two_corner_probe.js](inverse/q2_two_corner_probe.js)
retains exploratory residue and cylinder-parameter diagnostics, but no
diagnostic statistic is used in the theorem.

## 6. Consequence and scope

The one-corner theorem excludes \(|K(I)|=1\), while Sections 2 through 5
exclude \(|K(I)|=2\). We obtain the new all-depth restriction

\[
\boxed{
\text{every hypothetical \(q_s=2,b=1\) target satisfies }
|K(I)|\geq3.}
\tag{26}
\]

This includes endpoint equality and therefore the positive-cycle
denominator-one case inside the branch.

The result does not prove First-Crossing Descent. Three corners already
permit eight distinct dyadic subset sums, and the exact all-subset flux
identity still requires an anchored interior-carry argument. The next
localized question is whether the cylinder proof can be made uniform in
the corner count, or whether the complete three-corner family admits a
similarly effective cutoff and finite residue certificate.
