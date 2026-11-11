# The complete one-corner sector of the strict (q=2) gate

**Date:** 26 August 2026  
**Mode:** SOLVE  
**Status:** complete for the sector stated below. Every anchored
(q_s=2,b=1) profile with one removable Ferrers corner is the
ramp-plus-one-drop profile. The existing all-depth ramp theorem therefore
excludes every strict and equality target in the complete one-corner
sector. Any surviving target has at least two removable corners.

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

Let (s\geq3) be a (q_s=2) weight, so that

\[
k_s-k_{s-1}=1.
\tag{2}
\]

Write

\[
N:=k_s,
\qquad
e:=N-s.
\tag{3}
\]

An anchored (b=1) profile has one positions

\[
0=A_0<A_1<\cdots<A_{s-1}=N-2,
\qquad
A_i\leq B_i.
\tag{4}
\]

Define the delay path and its mechanical ceiling by

\[
d_i:=A_i-i,
\qquad
m_i:=B_i-i.
\tag{5}
\]

Because every difference (A_i-A_{i-1}) is positive, (d_i) is
nondecreasing. Moreover,

\[
d_0=0,
\qquad
d_{s-1}=m_{s-1}=e-1.
\tag{6}
\]

The removable Ferrers corners are exactly the indices at which (d_i)
strictly increases. Thus a one-corner profile is exactly a delay path with
one strict increase.

## 2. The predecessor of a (q_s=2) row

We first isolate the terminal mechanical fact.

**Lemma 1.** If (q_s=2), then

\[
\boxed{k_{s-1}-k_{s-2}=2.}
\tag{7}
\]

**Proof.** Every ceiling increment is one or two. If the increment in
((7)) were one, then ((2)) would give

\[
k_s-k_{s-2}=2.
\]

On the other hand, for every real (x),

\[
\lceil x+2\alpha\rceil-\lceil x\rceil\geq3,
\]

because (3<2\alpha<4). Taking (x=(s-2)\alpha) gives a contradiction.
Thus the preceding increment is two. \(\square\)

It follows immediately that

\[
m_{s-2}
=B_{s-2}-(s-2)
=k_s-s-2
=e-2.
\tag{8}
\]

Since (m_i) is nondecreasing, equations ((6)) and ((8)) show that the
terminal delay (e-1) is unavailable at every vertex before (s-1).

## 3. Classification and descent

**Theorem 2.** Every anchored (q_s=2,b=1) one-corner profile is

\[
\boxed{
A_i=i\quad(0\leq i\leq s-2),
\qquad
A_{s-1}=N-2.}
\tag{9}
\]

Equivalently, its accelerated exponent word is

\[
\boxed{a=(1^{s-2},e,2).}
\tag{10}
\]

**Proof.** A nondecreasing integer path which starts at zero, ends at
(e-1), and has exactly one strict increase must jump directly from zero
to (e-1). By ((8)), the inequality (d_i\leq m_i) forbids this jump
before (i=s-1). Hence (d_i=0) for (i\leq s-2) and
(d_{s-1}=e-1). Equations ((9)) and ((10)) follow. \(\square\)

The profile in ((9)) is exactly the ramp-plus-one-drop family already
treated in `q2_ramp_fcd_complete.md`. If (M:=2^N), (P:=3^s),
(D:=M-P), and (ho,Z) are its canonical start and endpoint, that
theorem proves

\[
\rho>Z
\tag{11}
\]

at every (q_s=2) weight. Its proof uses the exact identity

\[
2^{e+2}(\rho-Z)=Du-(5\cdot2^e-6),
\tag{12}
\]

followed by a finite exact check and an audited determinant estimate for
the infinite tail.

Combining Theorem 2 with ((11)) gives the promised sector theorem.

**Corollary 3.** No strict or equality (q_s=2,b=1) target has exactly
one removable Ferrers corner. Consequently, every hypothetical target in
this branch satisfies

\[
\boxed{|K(I)|\geq2.}
\tag{13}
\]

This conclusion is independent of the height-transition count. The unique
one-corner profile has (T=e-1=\Theta(s)), so the classification closes
the precise obstruction which showed that many height transitions need
not create many corners.

## 4. Exact audit and scope

The checker
[`inverse/q2_one_corner_complete_certificate.js`](inverse/q2_one_corner_complete_certificate.js)
reconstructs every (q_s=2) row through a requested weight, verifies the
predecessor (q_{s-1}=4) identity, reconstructs the unique one-corner
delay path, and independently checks its canonical FCD sign. Through
weight (2000), its exact output includes

~~~text
q2Weights=830
classifiedProfiles=830
nonRampProfiles=0
canonicalFailures=0
maximumTransitions=1169
~~~

The finite canonical check is a regression only. The classification is
the symbolic argument in Sections 2 and 3, while the all-depth descent is
the theorem and certificate in `q2_ramp_fcd_complete.md`.

The result does not prove the full corner-flux condition. Two corners give
four distinct dyadic subset sums, but the anchored interior carry may still
realize the complete punctured-cube coloring. The remaining problem is to
use the target residue to control profiles with at least two corners, not
to infer corner density from transition density.
