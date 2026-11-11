# The cycle equation as an anchored critical-group class

**Date:** 27 August 2026  
**Mode:** THEORIZE  
**Status:** We place the complete accelerated cycle equation in the
critical group of an irreducible nonsingular (M)-matrix. Denominator one
is exactly the vanishing of the all-ones class. The (q_s=2) ballot
condition supplies an explicit root-minimal burning script. This identifies
an anchor-sensitive global object, but the first proposed payoff is false:
the all-ones configuration need not be superstable. No cycle exclusion is
claimed.

## 1. The cyclic toppling matrix

Let

\[
a=(a_0,\ldots,a_{s-1}),
\qquad
A_i:=\sum_{j<i}a_j,
\qquad
N:=A_s,
\qquad
D:=2^N-3^s>0.
\tag{1}
\]

Indices below are cyclic modulo (s). Define the integral matrix (L_a)
by

\[
(L_ax)_i:=2^{a_{i-1}}x_i-3x_{i-1}.
\tag{2}
\]

The accelerated Collatz equations

\[
2^{a_i}x_{i+1}=3x_i+1
\tag{3}
\]

are precisely

\[
\boxed{L_ax=\mathbf1.}
\tag{4}
\]

Every off-diagonal entry of (L_a) is nonpositive. Every proper principal
minor is a product of diagonal entries, since a proper induced subgraph of
the directed cycle contains no cycle. The full determinant is

\[
\boxed{\det L_a=\prod_i2^{a_i}-3^s=D>0.}
\tag{5}
\]

Thus every principal minor is positive, and (L_a) is an irreducible
nonsingular (M)-matrix. In particular, (L_a^{-1}) is entrywise positive.
This is the standard avalanche-finite setting of chip firing on
(M)-matrices; see
[Guzmán and Klivans](https://arxiv.org/abs/1403.1635).

## 2. Denominator one is a critical-group collision

Put

\[
K(a):=\mathbf Z^s/L_a\mathbf Z^s.
\tag{6}
\]

The group has order (D). It is in fact cyclic. One maximal minor is a
power of two, while another is (3^{s-1}). Their greatest common divisor
is one, so the first (s-1) Smith invariants are one.

Let

\[
[\mathbf1]_a\in K(a)
\tag{7}
\]

be the class of the all-ones configuration. Equation (4) gives the exact
equivalence

\[
\boxed{
[\mathbf1]_a=0
\quad\Longleftrightarrow\quad
L_a^{-1}\mathbf1\in\mathbf Z^s
\quad\Longleftrightarrow\quad
a\text{ is the valuation word of an integer cycle}.}
\tag{8}
\]

If the rational cycle has common reduced denominator (q), then

\[
\boxed{\operatorname{ord}_{K(a)}([\mathbf1]_a)=q.}
\tag{9}
\]

Indeed, the order of the class is the least positive integer (q) for
which (qL_a^{-1}\mathbf1) is integral. Cramer's rule identifies the
coordinates of (L_a^{-1}\mathbf1) with the rotated carries divided by
(D), so (9) is the usual reduced-denominator formula in a basis-free
form.

The class in (7) is also the sum of the coordinate classes in the cyclic
presentation of (K(a)). In toric language, it is the canonical
coordinate-divisor class. Consequently, denominator one is not merely a
small residue at one cut. It is the vanishing of one distinguished global
class attached to the complete cyclic word.

## 3. The (q_s=2) word supplies a burning script

Put (M:=2^N), and define

\[
h_i:=3^i2^{N-A_i}
=M\frac{3^i}{2^{A_i}}.
\tag{10}
\]

For (1\leq i<s), the two terms in row (i) cancel:

\[
2^{a_{i-1}}h_i=3h_{i-1}.
\tag{11}
\]

At the cyclic seam we obtain

\[
2^{a_{s-1}}h_0-3h_{s-1}
=2^{a_{s-1}}D.
\tag{12}
\]

Therefore,

\[
\boxed{L_ah=2^{a_{s-1}}D e_0.}
\tag{13}
\]

This is an explicit burning script supported at the distinguished root.
For a (q_s=2) ballot word,

\[
2^{A_i}<3^i
\qquad(0<i<s).
\tag{14}
\]

Equations (10) and (14) show that

\[
\boxed{h_0=M<h_i\qquad(0<i<s).}
\tag{15}
\]

Thus the first-crossing rotation is exactly the rotation for which the
canonical burning script has a strict minimum at its root. This is a
genuinely global reformulation of the ballot inequalities.

## 4. The first superstable proposal is false

A tempting route is to prove that (mathbf1) is (z)-superstable. Since
zero is the unique (z)-superstable representative of the zero class,
this would imply ([\mathbf1]_a\ne0).

The proposal fails already for

\[
a=(1,2,2),
\qquad
N=5,
\qquad
D=5.
\tag{16}
\]

This is a genuine (q_s=2) ballot word. Its matrix is

\[
L_a=
\begin{pmatrix}
4&0&-3\\
-3&2&0\\
0&-3&4
\end{pmatrix}.
\tag{17}
\]

But

\[
L_a\mathbf1=(1,-1,1)^T,
\qquad
\mathbf1-L_a\mathbf1=(0,2,0)^T\geq0.
\tag{18}
\]

Hence the all-ones configuration admits a nonzero multifiring and is not
(z)-superstable. Ordinary superstability cannot be the missing theorem.

There is nevertheless a canonical normal form. In the general
invertible-matrix chip-firing model of
[Guzmán and Klivans](https://arxiv.org/abs/1508.04262), the pairing
((L_a,I)) selects the integer points of the fundamental parallelepiped

\[
\mathcal P_a:=
\{L_a\theta:0\leq\theta_i<1\}.
\tag{19}
\]

If (x=L_a^{-1}\mathbf1), the representative of ([\mathbf1]_a) is

\[
\boxed{
r_a:=L_a\{x\}
=\mathbf1-L_a\lfloor x\rfloor.}
\tag{20}
\]

For (16), we have

\[
x=\frac15(23,37,29)^T,
\qquad
r_a=(0,-1,2)^T.
\tag{21}
\]

The representative is nonzero, but it is not confined to the ordinary
nonnegative sandpile cone. This explains why the more flexible
fundamental-parallelepiped or lattice-ideal model is required.

## 5. Relation to the anchored Möbius gate

The numerical-semigroup Möbius coefficient records a boundary shadow of
the same integrality problem. It sees the complete corner cube, but a
translation of the carry changes the critical-group class without changing
the corner directions.

The checker
[q2_translated_high_dimension_puncture.js](inverse/q2_translated_high_dimension_puncture.js)
makes this distinction exact. At (s=1000), it constructs a genuine
39-corner (q_s=2) Ferrers geometry and a translated carry (C_*=5D)
such that

\[
\sum_cV_c<D,
\qquad
5+\sum_cL_c<M,
\qquad
C_*>\sum_c\Delta_c.
\tag{22}
\]

The top is representable. For every nonempty corner subset (S), equation
(22) gives

\[
\left\lceil\frac{V_S}{D}\right\rceil=1,
\qquad
\left\lfloor\frac{5+L_S}{M}\right\rfloor=0.
\tag{23}
\]

Thus all (2^{39}-1) proper vertices are gaps. The corner count, all
Frobenius scales, and the complete Boolean cube are genuine. Only the
absolute anchor is false.

Consequently, no Fourier, parity, or high-dimensional cube theorem which
depends only on the corner directions can work, even at the 39-corner
scale forced by the current cycle barrier.

## 6. The sharpened target

The viable critical-group statement is

**Rooted critical-class target.** Let (a) be a primitive nontrivial
(q_s=2) ballot word. Then

\[
\boxed{[\mathbf1]_a\ne0\text{ in }K(a).}
\tag{24}
\]

Equation (24) is equivalent to cycle exclusion, so the reformulation is not
itself a proof. Its value is diagnostic. A successful invariant must use
both of the following pieces at once:

1. the root-minimal burning script (13) through (15), which remembers the
   first-crossing geometry;
2. the particular class ([\mathbf1]_a), or equivalently the normal form
   (r_a) in (20), which remembers the absolute anchor.

The next plausible tools are a Gröbner normal form for the cyclic lattice
ideal of (L_a), a reduced-divisor theorem adapted to the root-minimal
script, or an Abel-Jacobi pairing which evaluates ([\mathbf1]_a) in a
strict interval. The ordinary superstable cone, boundary-only Fourier
sums, and corner dimension have now been ruled out as sufficient inputs.
