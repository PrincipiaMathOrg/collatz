# Numerical-semigroup gaps and the Möbius charge of a (q=2) failure

**Date:** 27 August 2026  
**Mode:** CALCULATE, followed by THEORIZE  
**Status:** We identify the FCD color with the gap indicator of a
two-generator numerical semigroup. We then identify the complete corner
derivative with the lattice Möbius transform of this gap indicator. A
terminal-preserving minimal failure would carry the universal Möbius charge
(-1), or equivalently one specified coefficient of a rational generating
function would equal (1). This is an exact all-depth reduction, not a proof
that the charge is impossible.

## 1. The FCD color is a semigroup-gap indicator

Fix a (q_s=2) weight and put

\[
M:=2^N,
\qquad
P:=3^s,
\qquad
D:=M-P.
\tag{1}
\]

We have \(\gcd(M,D)=1\). Let \(I\) be an anchored Ferrers ideal, with
carry

\[
C(I):=P-2^s+\sum_{c\in I}\Delta_c,
\qquad
\Delta_{(i,r)}:=2^{i+r-1}3^{s-1-i}.
\tag{2}
\]

Define

\[
\rho:=[CD^{-1}]_M,
\qquad
\tau:=[CM^{-1}]_D,
\qquad
E(I):=\frac{D\rho+M\tau-C}{MD}\in\{0,1\}.
\tag{3}
\]

The branch \(E(I)=1\) is the FCD branch. We now give a different
interpretation of this bit. Put

\[
\mathcal S_{M,D}:=\{uM+vD:u,v\in\mathbf N_0\},
\tag{4}
\]

and let

\[
p_{M,D}(n):=#\{(u,v)\in\mathbf N_0^2:uM+vD=n\}.
\tag{5}
\]

The function in (5) is the denumerant of the two-coin numerical semigroup
\(\mathcal S_{M,D}\). Fourier-Dedekind sums arise naturally in this
denumerant, as explained from the lattice-point viewpoint by Beck and
Robins in [their survey](https://arxiv.org/abs/math/0112076) and in the
convolution framework of
[Tsukerman](https://arxiv.org/abs/1307.5542).

**Theorem 1.** Suppose \(0<C<MD\). Then

\[
\boxed{E(I)=1-p_{M,D}(C).}
\tag{6}
\]

In particular,

\[
\boxed{
E(I)=0
\quad\Longleftrightarrow\quad
C\in\mathcal S_{M,D}.}
\tag{7}
\]

**Proof.** Two distinct representations of an integer by \(M\) and \(D\)
differ by an integral multiple of \((D,-M)\). Therefore an integer below
\(MD\) has at most one representation in \(\mathbf N_0^2\).

If \(E(I)=0\), equation (3) gives

\[
C=\tau M+\rho D,
\]

so \(p_{M,D}(C)=1\). If \(E(I)=1\), then

\[
D\rho+M\tau=C+MD.
\]

Any representation of \(C\) would have coefficients congruent to
\((\tau,\rho)\) modulo \((D,M)\). Since \(0<C<MD\), its coefficients
would have to equal \((\tau,\rho)\), which gives \(C+MD\), not \(C\).
Thus \(p_{M,D}(C)=0\). This proves (6). \(\square\)

For first-crossing carries, the established bounds give
\(C<sM/3\) and \(D>s/3\), and hence \(C<MD\). Thus Theorem 1 applies
throughout the FCD target range.

## 2. The corner cube is the lattice Möbius transform

Fix the terminal row and let \(\mathcal J(I)\) denote the finite lattice of
terminal-preserving subideals of \(I\). Let

\[
K^\circ(I)
\]

be the nonterminal removable corners of \(I\). For a function \(F\) on
this lattice, define its top Möbius transform by

\[
\mathfrak m_F(I)
:=
\sum_{J\subseteq I}\mu_{\mathcal J(I)}(J,I)F(J).
\tag{8}
\]

For an order-ideal lattice, the interval Möbius function vanishes unless
\(I\setminus J\) is an antichain. In that case it equals
\((-1)^{|I\setminus J|}\). Moreover, an antichain which can be removed
from the top ideal is a subset of its maximal elements. Consequently,

\[
\boxed{
\mathfrak m_F(I)
=
\sum_{S\subseteq K^\circ(I)}
(-1)^{|S|}F(I\setminus S).}
\tag{9}
\]

Thus the complete corner cube is not merely analogous to a lattice
derivative. It is exactly the lattice Möbius transform at the top ideal.

Suppose now that \(I\) is a terminal-preserving minimal failure. Then

\[
E(I)=0,
\qquad
E(I\setminus S)=1
\quad
(\varnothing\ne S\subseteq K^\circ(I)).
\tag{10}
\]

Since the alternating sum over a nonempty Boolean cube is zero, equations
(9) and (10) give the universal charge

\[
\boxed{\mathfrak m_E(I)=-1.}
\tag{11}
\]

Note that the right side does not depend on the number of corners.

## 3. One rational generating-function coefficient

The denumerant has the generating function

\[
\sum_{n\geq0}p_{M,D}(n)z^n
=
\frac1{(1-z^M)(1-z^D)}.
\tag{12}
\]

For \(S\subseteq K^\circ(I)\), put

\[
\Delta_S:=\sum_{c\in S}\Delta_c.
\]

Since \(C(I\setminus S)=C(I)-\Delta_S\), equations (6), (9), and
(12) give

\[
\begin{aligned}
\mathfrak m_E(I)
&=-\sum_{S\subseteq K^\circ(I)}
(-1)^{|S|}p_{M,D}(C-\Delta_S)\\
&=-[z^C]
\frac{\prod_{c\in K^\circ(I)}(1-z^{\Delta_c})}
{(1-z^M)(1-z^D)}.
\end{aligned}
\tag{13}
\]

Combining (11) and (13), we obtain the following exact necessary
condition.

**Theorem 2.** Every terminal-preserving minimal \(q_s=2,b=1\) failure
satisfies

\[
\boxed{
[z^{C(I)}]
\frac{\prod_{c\in K^\circ(I)}(1-z^{\Delta_c})}
{(1-z^M)(1-z^D)}=1.}
\tag{14}
\]

In other words, the unique semigroup representation at the top survives
the complete alternating corner difference with coefficient one.

Equation (14) retains the absolute anchor in its coefficient index
\(C(I)\). Translating the carry changes this index while leaving the corner
factors fixed. This is exactly why translated punctured cubes do not refute
an anchored coefficient theorem.

## 4. Fourier-Dedekind form

We can also write the charge as a pair of finite Fourier sums. For
\(q\geq2\), put

\[
R_q(x):=[x]_q,
\qquad
\zeta_q:=e^{2\pi i/q}.
\]

If \(h_1,\ldots,h_m\in\mathbf Z\) and \(m\geq1\), discrete Fourier
inversion gives

\[
\boxed{
\sum_{S\subseteq[m]}(-1)^{|S|}
R_q\left(x+\sum_{i\in S}h_i\right)
=-
\sum_{k=1}^{q-1}
\frac{\zeta_q^{kx}\prod_{i=1}^m(1-\zeta_q^{kh_i})}
{1-\zeta_q^{-k}}.}
\tag{15}
\]

For a corner \(c\), define

\[
L_c:=[\Delta_cP^{-1}]_M,
\qquad
MV_c=DL_c+\Delta_c.
\tag{16}
\]

When \(|K^\circ(I)|\geq2\), the affine carry term disappears under the
Möbius transform. Therefore,

\[
\boxed{
\mathfrak m_E(I)
=\frac1M
\sum_{S}(-1)^{|S|}R_M(\rho+L_S)
+\frac1D
\sum_{S}(-1)^{|S|}R_D(\tau-V_S).}
\tag{17}
\]

Equations (15) and (17) identify the failure charge with two coupled
multivariate Fourier-Dedekind sums. The coupling

\[
MV_c-DL_c=\Delta_c
\tag{18}
\]

is the arithmetic datum absent from an arbitrary Boolean threshold model.

## 5. The characteristic-two gate

For cycle exclusion, it is enough to rule out the odd coefficient in
(14). Reducing the generating function modulo two gives

\[
\boxed{
[z^{C(I)}]
\frac{\prod_{c\in K^\circ(I)}(1+z^{\Delta_c})}
{(1+z^M)(1+z^D)}=1
\quad\text{in }\mathbf F_2}
\tag{19}
\]

for every minimal failure. The corner factors have additional Frobenius
structure. Namely,

\[
M=2^N,
\qquad
1+z^M=(1+z)^M,
\tag{20}
\]

and, for \(c=(i,r)\),

\[
\Delta_c=2^{i+r-1}3^{s-1-i},
\qquad
1+z^{\Delta_c}
=\left(1+z^{3^{s-1-i}}\right)^{2^{i+r-1}}.
\tag{21}
\]

The exponents \(i+r-1\) are strictly increasing along the removable
corners. Thus (19) is a parity question with distinct Frobenius scales,
not an unstructured subset-sum congruence.

There is an exact Lucas-theoretic normal form for this parity. Enumerate
the nonterminal corners as \(c_j=(i_j,r_j)\), and put

\[
t_j:=i_j+r_j-1,
\qquad
b_j:=s-1-i_j,
\qquad
W:=\sum_j2^{t_j},
\qquad
K:=M-W.
\tag{22}
\]

The numbers \(t_j\) are distinct and smaller than \(N\), so
\(0<W<M\). In \(\mathbf F_2[[z]]\), define

\[
Q_b(z):=1+z+\cdots+z^{3^b-1}.
\]

Equations (20) and (21) give

\[
\frac{\prod_j(1+z^{\Delta_{c_j}})}
{(1+z^M)(1+z^D)}
=
\frac{\prod_jQ_{b_j}(z)^{2^{t_j}}}
{(1+z)^K(1+z^D)}.
\tag{23}
\]

The coefficient of \(z^n\) in \((1+z)^{-K}\) is
\(\binom{K+n-1}{n}\). Lucas's theorem shows that this coefficient is odd
exactly when

\[
n\mathbin{\&}(K-1)=0,
\tag{24}
\]

where \(\&\) denotes bitwise intersection. Consequently, the parity in
(19) equals

\[
\boxed{
\sum_{v=0}^{\lfloor C/D\rfloor}
\ \sum_{0\leq j_\ell<3^{b_\ell}}
\mathbf 1_{\{n\geq0,\ n\mathbin{\&}(K-1)=0\}}
\pmod2,}
\tag{25}
\]

where

\[
n:=C-vD-\sum_\ell2^{t_\ell}j_\ell.
\tag{26}
\]

Since \(M-1\) has \(N\) consecutive binary ones and \(W\) has a one
exactly at each corner position, we have

\[
K-1=M-1-W.
\]

Thus (24) says that the low \(N\) binary digits of \(n\) may be nonzero
only at the corner positions \(t_j\). Equivalently,

\[
n\pmod M\in
\left\{\sum_{j\in T}2^{t_j}:T\subseteq[m]\right\}.
\]

The proposed parity theorem can therefore be viewed as a no-carry theorem
for a bounded mixed \(3\)-adic digit box trying to land in the Boolean
coordinate subspace selected by the Ferrers corners. This normal form uses
the complete corner set at once.

The ternary box itself factors digit by digit:

\[
Q_b(z)
=\prod_{k=0}^{b-1}
\left(1+z^{3^k}+z^{2\cdot3^k}\right).
\tag{27}
\]

Therefore,

\[
\boxed{
Q_{b_j}(z)^{2^{t_j}}
=\prod_{k=0}^{b_j-1}
\left(1+z^{2^{t_j}3^k}+z^{2^{t_j+1}3^k}\right)}
\quad\text{in }\mathbf F_2[z].
\tag{28}
\]

The corner pairs \((t_j,b_j)\) have strictly increasing first coordinate
and strictly decreasing second coordinate. Hence (28) places ternary digit
columns along an antichain boundary. The parity gate is the intersection of
this Ferrers-shaped mixed-radix digit box with the Boolean binary subspace
from (24). This is the natural point at which rational-base tiles or a
sign-reversing digit involution could enter.

The following statement would close the complete residual \(q_s=2\)
branch.

**Anchored Möbius parity target.** For every anchored
\(q_s=2,b=1\) strict or equality target with at least four nonterminal
corners, the coefficient in (19) is even.

Indeed, terminal-preserving minimalization supplies at least four
nonterminal corners because the complete one- through four-corner sectors
are already excluded. Theorem 2 would make the same coefficient equal to
one, which is a contradiction.

For a hypothetical nontrivial cycle at the established period barrier,
the sharp growth theorem supplies at least thirty-nine nonterminal corners.
Thus the cycle case enters (19) with many distinct Frobenius scales.

## 6. Exact finite evidence and the translated ceiling

The checker
[q2_boolean_mobius_probe.js](inverse/q2_boolean_mobius_probe.js)
enumerates every anchored profile at every \(q_s=2\) row through
\(s=20\). It checks Theorem 1 at every corner-cube vertex and verifies
(13) through the exact equality between the color and denumerant Möbius
transforms. The totals are

\[
\begin{array}{c|r}
\text{anchored profiles}&2{,}029{,}916\\
\text{nontrivial corner cubes}&2{,}029{,}908\\
\text{cube vertices}&211{,}157{,}316\\
\text{largest nonterminal cube dimension}&10\\
\text{nonzero anchored top charges}&0.
\end{array}
\tag{29}
\]

The deterministic large-row probe
[q2_boolean_mobius_random_probe.js](inverse/q2_boolean_mobius_random_probe.js)
tests 8,300 anchored profiles at the 415 \(q_s=2\) rows through
\(s=1000\), with complete corner cubes through dimension fourteen. It
also finds no nonzero charge. These are finite falsification results only.

The translated checker
[q2_boolean_mobius_translation_probe.js](inverse/q2_boolean_mobius_translation_probe.js)
keeps the three nonterminal corner weights of the weight-eight board fixed
and scans 9,620 admissible odd carry translations. It finds 85 nonzero
charges and 12 punctured cubes. In particular, the translated carries

\[
C_*=8{,}155
\qquad\text{and}\qquad
C_*=13{,}085
\]

both give coefficient one, while the genuine anchored carry

\[
C(I)=13{,}349
\]

gives coefficient zero. Therefore no theorem based only on the corner
factors in (14) can work. The coefficient index supplied by the anchored
interior sum is essential.

This ceiling persists at the corner dimension relevant to the present
cycle barrier. The checker
[q2_translated_high_dimension_puncture.js](inverse/q2_translated_high_dimension_puncture.js)
uses exact dynamic programming on the product order of the cells at
(s=1000). It selects thirty-nine genuine nonterminal corners for which

\[
\sum_cV_c<D.
\]

It then takes the translated carry (C_*=5D) and verifies

\[
5+\sum_cL_c<M,
\qquad
C_*>\sum_c\Delta_c.
\]

The translated top is representable. For every nonempty subset (S) of
the thirty-nine corners, the preceding inequalities give

\[
\left\lceil\frac{V_S}{D}\right\rceil=1,
\qquad
\left\lfloor\frac{5+L_S}{M}\right\rfloor=0.
\]

Hence all (2^{39}-1) proper vertices have color one. This proves that
neither high dimension nor the distinct Frobenius scales can force the
parity cancellation without the anchored coefficient index.

## 7. What has changed

The remaining \(q_s=2\) problem is no longer only a collection of floor and
ceiling inequalities. It is an anchored coefficient problem in a
two-generator numerical semigroup:

\[
\boxed{
\text{exclude the coefficient }1\text{ in (14), or only its oddness in
(19), for the Ferrers anchor }C(I).}
\]

This formulation admits tools which were not visible in the local flux
coordinates: numerical-semigroup Apéry theory, vector partition functions,
Fourier-Dedekind reciprocity, characteristic-two Frobenius factorization,
and lattice Möbius inversion. We have not proved the anchored parity target.
Consequently, the one- through four-corner exclusions remain the complete
proved direct corner eliminations, while (14) supplies a new all-corner
attack rather than an additional certified corner count.
