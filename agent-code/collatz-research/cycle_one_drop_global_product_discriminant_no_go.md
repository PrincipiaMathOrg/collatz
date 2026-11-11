# The global product and discriminant no-go

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** We prove a sharp method-level no-go. The exact state product
has no useful archimedean consequence beyond its sharp majorization
relaxation, and that relaxation permits a fixed least state on an infinite
high-rise family. Simultaneous \(2\)- and \(3\)-adic spacing is exactly the
existing centered-factor separation. Multiplying all pair separations into
a Vandermonde or discriminant cannot improve the strongest single pair.
An exact strict-least rational profile at

\[
(r,N,U)=(2881,4567,120)
\]

has full factor complexity at length \(77\), and every resulting pair bound
is smaller than \(U^{27}\). Thus sorting, majorization, discriminants, and
simultaneous pair spacing do not close the denominator-one gate. This does
not exclude a new arithmetic use of the exact product equality.

## 1. The exact product

Let \(x_0,\ldots,x_{r-1}\) be the distinct odd states of a primitive
integer cycle, and put

\[
2^{a_j}x_{j+1}=3x_j+1,
\qquad
N:=\sum_{j=0}^{r-1}a_j,
\qquad
R:=\frac{2^N}{3^r}.
\tag{1}
\]

Multiplying (1) over the cycle gives

\[
\boxed{
R=\prod_{j=0}^{r-1}
\left(1+\frac1{3x_j}\right).}
\tag{2}
\]

For a reduced rational cycle, write \(x_j=n_j/q\), where \(q\) is odd
and

\[
2^{a_j}n_{j+1}=3n_j+q.
\tag{3}
\]

The corresponding identity is

\[
\boxed{
R=\prod_{j=0}^{r-1}
\left(1+\frac q{3n_j}\right).}
\tag{4}
\]

Thus (2) is the product of the state recurrences. It is an exact global
identity, but it is not an independent closure equation.

In the one-drop normalization, let \(x:=x_0\) and let \(m_j\) be the
omission height. The global state envelope is

\[
x_j<4x2^{m_j}.
\tag{5}
\]

Equation (5) also holds after clearing a rational denominator:

\[
n_j<4n_02^{m_j}.
\tag{6}
\]

## 2. Sharp product majorization

We first determine the strongest conclusion obtained from (2),
distinctness, oddness, and the individual envelopes (5).

Fix an odd integer \(X\), designate one state to equal \(X\), and remove
its height from the list. Sort the remaining caps

\[
4X2^{m_j}
\]

in decreasing order, and call them \(c_1\geq\cdots\geq c_{r-1}\). Define

\[
z_1:=c_1-1,
\qquad
z_k:=\min(c_k-1,z_{k-1}-2)
\quad(2\leq k<r).
\tag{7}
\]

All \(c_k\) are even, so the \(z_k\) are odd. If \(z_{r-1}>X\), then the
sharp product lower bound is

\[
\boxed{
\prod_{j=0}^{r-1}\left(1+\frac1{3x_j}\right)
\geq
\left(1+\frac1{3X}\right)
\prod_{k=1}^{r-1}\left(1+\frac1{3z_k}\right).}
\tag{8}
\]

Indeed, sort the remaining states in decreasing order. The \(k\)-th state
is at most \(c_k-1\), and distinct odd states differ by at least two.
Induction therefore bounds it by \(z_k\). Since

\[
t\longmapsto1+\frac1{3t}
\]

is decreasing, (8) follows. Conversely, the greedy values in (7) can be
matched to the sorted caps. Hence (8) is the exact extremum for these
inputs. There is no stronger sorting or majorization inequality hidden in
them.

There is also the simpler consequence

\[
R>
\prod_{j=0}^{r-1}
\left(1+\frac1{12x2^{m_j}}\right),
\tag{9}
\]

and therefore

\[
x>\frac{\sum_j2^{-m_j}}{12(R-1)}.
\tag{10}
\]

The next construction shows that even the sharp form (8) has no growing
lower bound in the high-rise region.

## 3. A fixed-state high-rise extremizer

Put

\[
\alpha:=\log _2 3,
\qquad
N:=\lceil\alpha r\rceil,
\qquad
\delta_r:=N-\alpha r.
\tag{11}
\]

There are infinitely many \(r\) for which \(\delta_r\geq1/2\). Along this
subsequence, let \(U\) be the least integer satisfying

\[
5U^2\geq12r.
\tag{12}
\]

Thus

\[
\frac{U^2}{r}\geq\frac{12}{5}
>2.3153852110\ldots,
\tag{13}
\]

so this family lies strictly above the surviving actual-factor boundary.

For all sufficiently large \(r\), omit the eligible mechanical two-sites
of ordinals

\[
2,4,\ldots,2U.
\tag{14}
\]

The eligible sites have gaps one or two. Consequently, every height
\(h<U\) contains at most four starts. All remaining starts have height
\(U\). This is an exact one-drop profile. Its rational fixed point is
strictly least: the first two branches increase, while after the first
omission the homogeneous prefix coefficient is larger than
\(2^{m_j-1}\geq1\).

We now construct a set of distinct odd integers which satisfies every
individual envelope with least element

\[
X:=9.
\tag{15}
\]

At height zero, use \(9\) and as many of \(31,33,35\) as are required.
At each height \(1\leq h<U\), use the required number of the four largest
odd integers below \(36\cdot2^h\). At height \(U\), use the required
number of largest odd integers below \(36\cdot2^U\). These choices are
pairwise disjoint. Moreover, the height-\(U\) values exceed
\(18\cdot2^U\), because

\[
r\leq\frac{5U^2}{12}<9\cdot2^U.
\tag{16}
\]

For \(U\geq10\), the reciprocal sum is bounded by

\[
\begin{aligned}
\sum_j\frac1{x_j}
&<\frac19+\frac3{31}
+\sum_{h\geq1}\frac4{29\cdot2^h}
+\frac{r}{18\cdot2^U}\\
&<\frac19+\frac3{31}+\frac4{29}+\frac1{400}
<\frac38.
\end{aligned}
\tag{17}
\]

It follows that

\[
\log\prod_j\left(1+\frac1{3x_j}\right)
<\frac13\sum_j\frac1{x_j}<\frac18.
\tag{18}
\]

Since \(\log2>1/2\), equations (11) and (18) give

\[
\boxed{
\prod_j\left(1+\frac1{3x_j}\right)
<\sqrt2\leq R.}
\tag{19}
\]

Thus the sharp majorization lower bound is compatible with \(x=9\), and
hence \(Q=(x+1)/2=5\), at arbitrarily large high-rise parameters. The
integers constructed here are an extremal packing witness, not a Collatz
orbit. Equation (19) proves that an archimedean product comparison cannot
force equality to fail. A successful use of (2) would have to exploit its
exact multiplicative arithmetic, not sorting or reciprocal mass.

## 4. Simultaneous \(2\)- and \(3\)-adic spacing

We now retain the exact rational recurrence (3). For distinct starts
\(i,j\), let \(F_{ij}\) be the length of the common forward valuation
factor, let

\[
S_{ij}:=a_i+\cdots+a_{i+F_{ij}-1},
\tag{20}
\]

and let \(B_{ij}\) be the length of the common backward valuation factor.
Then

\[
\boxed{
2^{S_{ij}+1}3^{B_{ij}}\mid n_i-n_j.}
\tag{21}
\]

To prove the dyadic part, iterate the common forward factor and subtract:

\[
2^{S_{ij}}(n_{i+F_{ij}}-n_{j+F_{ij}})
=3^{F_{ij}}(n_i-n_j).
\tag{22}
\]

The endpoint numerators are odd, so their difference is even. This gives
\(2^{S_{ij}+1}\mid n_i-n_j\). Iterating the common backward factor and
subtracting gives

\[
2^A(n_i-n_j)=3^{B_{ij}}
(n_{i-B_{ij}}-n_{j-B_{ij}}).
\tag{23}
\]

Therefore, \(3^{B_{ij}}\mid n_i-n_j\), proving (21).

The common additive term \(qC\) cancels in both subtractions. Therefore
(21) is completely insensitive to whether \(q=1\).

Equation (6) and (21) give the individual pair bound

\[
\boxed{
4n_0>
\frac{2^{S_{ij}+1}3^{B_{ij}}}
{2^{\max(m_i,m_j)}}.}
\tag{24}
\]

This simultaneous spacing is not a new constraint. The two rotations
share one centered factor of length \(B_{ij}+F_{ij}\). Moving (21) through
the common forward factor shows that the endpoint difference is divisible
by

\[
2\cdot3^{B_{ij}+F_{ij}},
\tag{25}
\]

which is exactly the existing equal-factor endpoint separation.

## 5. The discriminant is an average of pair bounds

Put

\[
\mathcal V:=\prod_{0\leq i<j<r}|n_i-n_j|,
\qquad
C:=\binom r2,
\tag{26}
\]

and define

\[
M_{ij}:=
\frac{2^{S_{ij}+1}3^{B_{ij}}}
{2^{\max(m_i,m_j)}}.
\tag{27}
\]

Multiplying (21) and the state envelopes gives

\[
\prod_{i<j}2^{S_{ij}+1}3^{B_{ij}}\mid\mathcal V,
\qquad
\mathcal V<(4n_0)^C
\prod_{i<j}2^{\max(m_i,m_j)}.
\tag{28}
\]

Consequently,

\[
4n_0>
\left(\prod_{i<j}M_{ij}\right)^{1/C}.
\tag{29}
\]

But

\[
\boxed{
\left(\prod_{i<j}M_{ij}\right)^{1/C}
\leq\max_{i<j}M_{ij}.}
\tag{30}
\]

The right side of (30) is already one of the pair bounds (24). Therefore
the Vandermonde estimate is never stronger than the best single centered
factor. Squaring (28) to form the discriminant changes nothing.

This is an exact collapse theorem. It is not merely an asymptotic failure
or a weak choice of an upper bound.

## 6. A full-complexity rational extremizer

The companion certificate freezes the exact row

\[
r=2881,
\qquad
N=4567,
\qquad
U=120,
\qquad
\frac{U^2}{r}=4.99826449\ldots.
\tag{31}
\]

It chooses \(120\) eligible omissions and verifies that the actual cyclic
valuation word has

\[
\boxed{p_a(77)=2881.}
\tag{32}
\]

The corresponding rational orbit is primitive and strictly least at the
displayed anchor. Its reduced denominator has \(4566\) binary digits.

Equation (32) means that two distinct rotations cannot share a centered
factor of length \(77\). Hence

\[
B_{ij}+F_{ij}\leq76.
\tag{33}
\]

A common factor cannot contain the unique terminal letter, so every one
of its letters is at most two. Therefore,

\[
\begin{aligned}
M_{ij}
&\leq2^{2F_{ij}+1}3^{B_{ij}}\\
&<2^{2(F_{ij}+B_{ij})+1}
\leq2^{153}
<4\cdot120^{27}.
\end{aligned}
\tag{34}
\]

Thus every individual simultaneous pair bound, and by (30) every
discriminant bound, remains below the critical polynomial target. The
large rational denominator supplies the actual numerator scale. This is
the precise sense in which the spacing calculation is denominator blind.

## 7. Exact audit

The checker
[one_drop_global_product_discriminant_no_go_certificate.js](cycles/one_drop_global_product_discriminant_no_go_certificate.js)
performs the following exact tests.

1. It exhausts all \(7072\) nonempty one-drop profiles through \(r=20\).
2. On \(1{,}101{,}437\) pairs, it verifies (4), (6), (21), and both
   inequalities in (28).
3. It checks four high-rise product-majorization witnesses with \(x=9\).
4. It reconstructs the row (31) deterministically, verifies (32), strict
   leastness, the \(4566\)-bit reduced denominator, and the final exact
   power comparison in (34).

The default run returns status `PASS`.

## Conclusion

The global product is useful as an exact normalization identity, but the
present proposed uses of it collapse sharply.

1. Its complete sorting and majorization relaxation permits a fixed least
   state on an infinite family above the high-rise boundary.
2. Simultaneous \(2\)- and \(3\)-adic pair spacing is the existing
   centered-factor separation, with the rational denominator cancelled.
3. A Vandermonde or discriminant only averages those pair bounds and can
   never improve their maximum.
4. Exact high-rise words already exist for which all such pair bounds are
   below \(U^{27}\).

Accordingly, these directions do not strengthen the current factor gate.
The surviving possibility is an arithmetic use of the exact equality in
(2) which detects the additive constant \(1\), equivalently \(q=1\),
before subtraction removes it.
