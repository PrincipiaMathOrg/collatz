# Weighted occupation in the transition-dense cycle core

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** The normalized carry is exactly a weighted reciprocal occupation
sum of the deformation-height path.  We derive its accompanying product and
variation identities.  These identities do not force bounded height, a
positive density of low-height sites, or an upper bound for the transition
count.  A primitive least exact rational cycle has linear transition count,
linear height, bounded occupation, and the same polynomial least-state bound.
Its reduced denominator is exponentially large.  Thus any further exclusion
of the transition-dense integer-cycle core must use the full denominator-one
congruence, not only its Archimedean shadow.

## Updating proof skeleton

1. **PROVED:** if
   \(W:=\sum_{j<r}2^{B_j-j\log_2 3}2^{-m_j}\), then

   \[
   \frac{C}{2^N}=\frac{W}{3R},
   \qquad
   x=\frac{W}{3(R-1)},
   \qquad
   R:=\frac{2^N}{3^r}.
   \]

2. **PROVED:** the height variation satisfies
   \(V=2U\), where \(U\) is the number of upward transitions.  Hence
   \(T\leq V\leq2T-2\) for every nonconstant cyclic height path.
3. **PROVED:** the product of the reciprocal coefficients is determined
   exactly by \(\sum_jm_j\), \(\gcd(N,r)\), and the ceiling defect.
4. **PROVED, NO-GO:** the words
   \((1^{r-1},N-r+1)\) give primitive least exact rational cycles with
   \(T=N-r\), \(\max m_j=N-r-1\), bounded weighted occupation, and at most
   two sites at each height.
5. **PROVED:** the reduced denominator of this family is at least
   \(\tfrac12e^{-6.125581}2^rr^{-13.3}\).  It is therefore exponentially
   far from denominator one at the established period scale.
6. **REMAINING:** use the full congruence \(D\mid C\), or an equivalent
   residue obstruction, against a height path with at least
   \(\Omega(\sqrt r)\) transitions.

## 1. Exact reciprocal occupation

Let a primitive positive accelerated cycle candidate have odd period \(r\),
total exponent

\[
N:=\lceil r\log_2 3\rceil,
\qquad
D:=2^N-3^r,
\qquad
x:=\frac CD,
\tag{1}
\]

where

\[
C:=\sum_{j=0}^{r-1}3^{r-1-j}2^{A_j},
\qquad
A_j:=\sum_{i<j}a_i.
\tag{2}
\]

Put

\[
\alpha:=\log_2 3,
\qquad
\delta:=N-r\alpha,
\qquad
R:=\frac{2^N}{3^r}=2^\delta,
\tag{3}
\]

and use the rational mechanical prefixes

\[
B_j:=\left\lfloor\frac{jN}{r}\right\rfloor,
\qquad
m_j:=B_j-A_j.
\tag{4}
\]

The strict suffix records give \(m_j\geq-1\), while
\(m_0=m_r=0\).  Define

\[
\omega_j:=2^{B_j-j\alpha},
\qquad
t_j:=\omega_j2^{-m_j}=\frac{2^{A_j}}{3^j},
\qquad
W:=\sum_{j=0}^{r-1}t_j.
\tag{5}
\]

We now normalize (2) by \(2^N\).  Term by term,

\[
\frac{3^{r-1-j}2^{A_j}}{2^N}
=\frac1{3R}\frac{2^{A_j}}{3^j}.
\]

Therefore

\[
\boxed{
\frac{C}{2^N}=\frac{W}{3R},
\qquad
\frac{D}{2^N}=\frac{R-1}{R},
\qquad
x=\frac{W}{3(R-1)}.}
\tag{6}
\]

In particular, denominator one is exactly the condition

\[
\boxed{\frac{W}{3(R-1)}\in\mathbf Z_{>0}.}
\tag{7}
\]

There is also a dynamical proof of (6).  Put

\[
q_j:=\frac{3^j}{2^{A_j}},
\qquad
Y_j:=\frac{x_j}{q_j}.
\]

The accelerated recurrence gives

\[
Y_{j+1}-Y_j=\frac1{3q_j}=\frac{t_j}{3}.
\tag{8}
\]

Since \(Y_0=x\) and \(Y_r=Rx\), summing (8) gives
\(W=3x(R-1)\).  In other words, the normalized carry is the total
increase of one monotone affine coordinate around the cycle.

If \(\theta_j:=\{jN/r\}\), then

\[
\log_2\omega_j=-\theta_j+\frac{j\delta}{r}.
\]

Consequently

\[
\frac12<\omega_j<2
\qquad(0\leq j<r).
\tag{9}
\]

Thus the exact quantity \(W\) is comparable to the unweighted occupation
sum

\[
\mathcal O:=\sum_{j=0}^{r-1}2^{-m_j}:
\qquad
\boxed{\frac12\mathcal O<W<2\mathcal O.}
\tag{10}
\]

## 2. Transition and variation identities

Put

\[
g_j:=B_{j+1}-B_j\in\{1,2\},
\qquad
\Delta_j:=m_{j+1}-m_j.
\]

The exact exponent relation is

\[
a_j=g_j-\Delta_j.
\tag{11}
\]

Since \(a_j\geq1\), every positive \(\Delta_j\) equals one.  Moreover,
an upward step can occur only when \(g_j=2\), in which case \(a_j=1\).
Let

\[
U:=\#\{j:\Delta_j=1\},
\qquad
V:=\sum_{j=0}^{r-1}|\Delta_j|,
\qquad
T:=\#\{j:\Delta_j\neq0\}.
\tag{12}
\]

Since \(m_r=m_0\), the total downward magnitude equals \(U\).  Hence

\[
\boxed{V=2U.}
\tag{13}
\]

If the path is nonconstant, it has at least one downward transition.  The
number of downward transitions is at most their total magnitude \(U\).
Therefore

\[
\boxed{T\leq V\leq2T-2.}
\tag{14}
\]

This identifies the role of a large downward jump.  It spends height which
must previously have been accumulated through the same number of unit upward
steps.  It does not, however, spend normalized carry in proportion to its
size.

## 3. Product and low-height ledgers

Let \(g:=\gcd(N,r)\).  The classical floor-sum identity gives

\[
\sum_{j=0}^{r-1}B_j
=\frac{(N-1)(r-1)+(g-1)}2.
\tag{15}
\]

Using \(N=r\alpha+\delta\) in the product of the quantities in (5), we
obtain

\[
\boxed{
\prod_{j=0}^{r-1}t_j
=2^{-\sum_jm_j-\frac{(1-\delta)(r-1)-(g-1)}2}.}
\tag{16}
\]

The arithmetic-geometric mean inequality now gives

\[
\boxed{
\sum_{j=0}^{r-1}m_j
\geq
r\log_2\left(\frac rW\right)
-\frac{(1-\delta)(r-1)-(g-1)}2.}
\tag{17}
\]

Thus bounded \(W\) forces a large average height.  It does not force the
height to be bounded.

For an integer \(H\geq0\), let

\[
L_H:=\#\{0\leq j<r:m_j\leq H\}.
\]

The bounds \(m_j\geq-1\) and (9) give

\[
W<4L_H+2^{-H}(r-L_H),
\qquad
W>2^{-H-1}L_H.
\]

Therefore

\[
\boxed{
\max\left(0,\frac{W-r2^{-H}}{4-2^{-H}}\right)
<L_H<2^{H+1}W.}
\tag{18}
\]

Equation (18) yields a positive density of low-height sites only when
\(W\) itself has linear size.  Neither denominator one nor the polynomial
bound \(x<305r^{14.3}\) presently supplies such a lower bound.

## 4. A dense exact rational counterfamily

We now show that the preceding limitation is genuine.  Let \(r\geq3\),
put

\[
e:=N-r,
\]

and consider the accelerated exponent word

\[
\boxed{a=(1^{r-1},e+1).}
\tag{19}
\]

Its total exponent is \(N\).  For \(0\leq j<r\), we have

\[
A_j=j,
\qquad
B_j=j+\left\lfloor\frac{je}{r}\right\rfloor,
\qquad
m_j=\left\lfloor\frac{je}{r}\right\rfloor,
\tag{20}
\]

while \(m_r=0\).  Since \(e/r>\log_2 3-1>1/2\), every fixed height occurs
at most twice.  In particular,

\[
\boxed{
\max_{j<r}m_j=e-1,
\qquad
L_H\leq2(H+1),
\qquad
\mathcal O<4.}
\tag{21}
\]

The internal path has exactly \(e-1\) unit rises, and its final edge drops
from \(e-1\) to zero.  Hence

\[
\boxed{T=e,\qquad V=2(e-1).}
\tag{22}
\]

The family is one-strip by the definition of \(N\).  It also obeys every
strict suffix record, since for \(0\leq j<r\),

\[
N-A_j-(r-j)\alpha
=\delta+j(\alpha-1)>0.
\tag{22a}
\]

The weighted occupation is even simpler.  Equation (20) gives

\[
t_j=\frac{2^j}{3^j},
\]

so

\[
\boxed{
W=\sum_{j=0}^{r-1}\left(\frac23\right)^j
=3\left(1-\left(\frac23\right)^r\right)<3.}
\tag{23}
\]

The carry and fixed point are

\[
\boxed{
C=3^r-2^r,
\qquad
x=\frac{3^r-2^r}{2^N-3^r}.}
\tag{24}
\]

This is an exact positive rational cycle.  Indeed, put
\(G:=\gcd(C,D)\), \(p:=C/G\), and \(q:=D/G\).  Both \(p\) and \(q\) are
odd.  The usual odd-cylinder congruence shows that the numerator orbit

\[
p_{j+1}=\frac{3p_j+q}{2^{a_j}}
\]

realizes every exponent in (19) exactly.  Equivalently, the rational states
have the explicit form

\[
x_j=\left(\frac32\right)^j(x+1)-1
\qquad(0\leq j<r).
\tag{25}
\]

Thus \(x_j>x\) for every \(1\leq j<r\).  The fixed point in (24) is the
least state of a primitive exact rational cycle.  Primitivity follows
because (19) has exactly one letter different from one.

The same linear-form input used in the cycle proof gives

\[
\log R>e^{-6.125581}r^{-13.3}.
\]

Since \(C<3^r\) and \(R-1>\log R\), equation (24) gives

\[
x<e^{6.125581}r^{13.3}<305r^{14.3}
\qquad(r\geq3).
\tag{26}
\]

Therefore the family obeys the same polynomial Archimedean scale as a
denominator-one candidate.

## 5. The missing property is exponentially arithmetic

Retain the notation

\[
G:=\gcd(C,D),
\qquad
q:=\frac DG.
\]

From (24),

\[
C+D=2^N-2^r=2^r(2^e-1).
\]

Since \(G\) is odd, we have

\[
G\mid2^e-1.
\tag{27}
\]

Moreover,

\[
D>3^re^{-6.125581}r^{-13.3},
\qquad
2^e=R\left(\frac32\right)^r<2\left(\frac32\right)^r.
\]

Combining these inequalities with (27) gives

\[
\boxed{
q\geq\frac{D}{2^e-1}
>\frac{e^{-6.125581}}2\frac{2^r}{r^{13.3}}.}
\tag{28}
\]

At the established period barrier, the reduced denominator is therefore
exponentially large.  This family is not close to an integer cycle in the
denominator sense, even though every scalar height, transition, least-state,
and normalized-carry statistic has the proposed extreme behavior.

In particular, the family satisfies positivity, the one-strip condition,
all strict records, exact local \(3p+q\) valuations, primitivity, leastness,
and the P7 polynomial bound.  Precisely one datum fails: \(q\neq1\), or
equivalently \(D\nmid C\).  Equation (28) quantifies this failure.

The final edge in (19) is also a linear-size downward jump.  Its smaller
inverse siblings are positive, but they are not states on the same periodic
orbit.  Leastness alone cannot exclude them.  This supplies an explicit
test case against a local sibling argument which does not also transport the
global return congruence.

## 6. Consequence for the remaining cycle gate

Equations (6), (13), (16), and (18) are exact.  Nevertheless, the family
(19) proves all of the following no-go statements.

1. Bounded normalized carry does not imply bounded height.
2. Bounded normalized carry does not imply a positive density of low-height
   sites.
3. Bounded normalized carry does not give an upper bound for the transition
   count.
4. A linear-size downward jump is compatible with exact local valuations,
   strict leastness, primitivity, and the polynomial state bound.

The denominator-one condition is the only cycle hypothesis missing from
this family.  Consequently the transition lower bound cannot be opposed by
another Archimedean occupation estimate alone.  The remaining localized
problem is to combine a transition-dense height path with the exact residue

\[
\sum_{j=0}^{r-1}z^{-[jN]_r}2^{-m_j}\equiv0\pmod D.
\]

That congruence must supply the cancellation which the real identity (6)
does not see.
