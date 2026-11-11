# The one-drop endpoint norm and its positive quotient

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** exact positive-coefficient theorem and exact method-level no-go.
The special endpoint quotient has strictly positive canonical coefficients,
but its coordinate recurrence is the original state recurrence in disguise.
It does not by itself prove canonical descent or (x>2^U).  A primitive,
coprime, strict-least rational one-drop orbit has (x<2^U), a positive
quotient, and (r-1) zero-support coordinates.  Its denominator is not one,
so it is not a counterexample to the desired (q=1) statement.

## 1. The special endpoint polynomial

Put

\[
 N=\lceil r\log _2 3\rceil,\qquad d=N-r,\qquad
 D=2^N-3^r,
\]

and assume \(\gcd(N,r)=1\).  Let

\[
 B_j=\left\lfloor\frac{jN}{r}\right\rfloor,
 \qquad g_j=B_{j+1}-B_j\in\{1,2\}.
\]

Choose a set \(S\) of preterminal two-gaps, put \(U:=|S|\), and let

\[
 m_j:=\#\{i\in S:i<j\}.
\]

Thus \(m_j\) is nondecreasing through the preterminal indices, rises by one
at every member of \(S\), and drops from \(U\) to zero at the terminal edge.
The resulting one-drop word has

\[
 a_j=g_j+m_j-m_{j+1}\quad (j<r-1),
 \qquad a_{r-1}=U+2.
\]

Let

\[
 J:=\{j<r-1:g_j=2\}\setminus S,
 \qquad c_j:=[jN]_r,
\]

and define

\[
 \boxed{
 K_U(X):=3(2^{U+1}-1)
 +\sum_{j\in J}2^{U+1-m_j}X^{r-c_j}.}
 \tag{1}
\]

This is the exact sparse endpoint polynomial for the one-drop family.

## 2. Exact quotient theorem

Let \(\theta^r=2\), work in \(\mathcal O=\mathbf Z[\theta]\), and put

\[
 \delta:=\theta^N-3=2\theta^d-3,
 \qquad \kappa_j:=c_j+rm_j,
 \qquad v_j:=\theta^{-\kappa_j}.
\]

Write \(A:=2^{U+1}\) and \(W:=\sum_jv_j\).  The identity

\[
 \theta^d v_{j+1}=2^{a_j-1}v_j
\]

gives

\[
 2(\theta^d-1)W=\sum_j(2^{a_j}-2)v_j.
\]

Only the indices in \(J\) and the terminal index survive.  Since
\(c_{r-1}=r-d\), \(m_{r-1}=U\), and hence
\(Av_{r-1}=\theta^d\), we obtain the exact identity

\[
 \boxed{
 K_U(\theta)=A(1+\delta)W-(A-1)\delta.}
 \tag{2}
\]

Now let \(x_j=n_j/q\) be the reduced rational cycle attached to the word,
and put \(S_x:=\sum_jx_jv_j\).  The accelerated recurrence gives

\[
 \delta S_x=W.
 \tag{3}
\]

Consequently

\[
 K_U(\theta)=\delta\Xi,
 \qquad
 \Xi=A(1+\delta)S_x-(A-1).
 \tag{4}
\]

There is a stronger form of (4).  Reindexing the state recurrence gives

\[
 (\theta^d-1)S_x
 =\frac12\sum_{j=0}^{r-1}(x_j+1)v_j.
\]

Since \(1+\delta=2(\theta^d-1)\), we have

\[
 \boxed{
 \Xi=A\sum_{j=0}^{r-1}(x_j+1)v_j-(A-1).}
 \tag{5}
\]

The residues \(c_j\) permute \(0,\ldots,r-1\).  Reducing the negative
powers with \(2\theta^{-c}=\theta^{r-c}\) gives every canonical coefficient:

\[
 \boxed{
 \xi_0=Ax_0+1,
 \qquad
 \xi_{r-c_j}=2^{U-m_j}(x_j+1)\quad(1\le j<r).}
 \tag{6}
\]

In particular, all coefficients are strictly positive.  For a reduced
rational orbit it is useful to clear the common denominator.  If
\(\Xi_q:=q\Xi\), then

\[
 \boxed{
 (\Xi_q)_0=An_0+q,
 \qquad
 (\Xi_q)_{r-c_j}=2^{U-m_j}(n_j+q)>0.}
 \tag{7}
\]

Thus \(\Xi_q\in\mathcal O\) and

\[
 \delta\Xi_q=qK_U(\theta).
 \tag{8}
\]

If \(R_U:=\operatorname{Res}(X^r-2,K_U)\), taking norms yields

\[
 \boxed{
 |\operatorname{Norm}(\Xi_q)|
 =q^r\frac{|R_U|}{D}.}
 \tag{9}
\]

For \(q=1\), this is the desired integral norm quotient.  Moreover,
\(\xi_0\) is odd and all other coefficients are even, so its norm is odd.
The number of rises \(U\) forces no additional two-content.

## 3. The coordinate recurrence closes tautologically

Let \(\Xi=\sum_{e=0}^{r-1}\xi_e\theta^e\).  Equation (8), with \(q=1\),
has the coordinate form

\[
 K_e=
 \begin{cases}
 2\xi_{e-d}-3\xi_e,&e\ge d,\\
 4\xi_{e-d+r}-3\xi_e,&e<d.
 \end{cases}
 \tag{10}
\]

At a zero-support coordinate this says

\[
 3\xi_e=2\xi_{e-d}
 \quad\hbox{or}\quad
 3\xi_e=4\xi_{e-d+r}.
 \tag{11}
\]

Under the indexing \(e=r-c_j\), equations (11) are exactly the unit-letter
identities

\[
 x_{j+1}+1=\frac32(x_j+1),
\]

with the factor \(2^{U-m_j}\) absorbing every selected height rise.  Hence
the zero runs do not create a second growth law.

Multiplying all \(r\) coordinate equations makes this precise.  The shift
weights contain \(r-d\) copies of two and \(d\) copies of four, whose
product is \(2^N\).  Cancelling the positive coefficient product gives

\[
 \boxed{
 \frac{2^N}{3^r}
 =\left(1+\frac{2^{U+1}-1}{2^{U+1}x_0+1}\right)
 \prod_{j\in J}
 \left(1+\frac{2}{3(x_j+1)}\right).}
 \tag{12}
\]

Equation (12) is exact, but it is the full-cycle closure identity written
in quotient coordinates.  It supplies neither the ordered cylinder lift
needed for canonical descent nor a new lower bound \(x_0>2^U\).

## 4. Exact rational obstruction

Take

\[
 (r,N,U)=(8,13,4),
 \qquad a=(1,1,1,1,1,1,1,6).
\]

This is a primitive strict-record one-strip word, \(\gcd(N,r)=1\), its
rational orbit is strict least at the displayed anchor, and all four
preterminal mechanical two-gaps are selected.  We have

\[
 D=q=1631,
 \qquad x_0=\frac{6305}{1631}<16=2^U,
\]

with numerator states

\[
 (6305,10273,16225,25153,38545,58633,88765,133963).
\]

Here

\[
 K_U=93
\]

has seven zero-support coordinates, while the canonical coefficient vector
of \(\Xi_q=qK_U(\theta)/\delta\) is

\[
 \boxed{
 (203391,214272,180792,190464,
 160704,135594,142848,120528).}
 \tag{13}
\]

Every entry is positive.  The signed norm signs are

\[
 \operatorname{sgn}\operatorname{Norm}(\delta)=-1,
 \quad
 \operatorname{sgn}\operatorname{Norm}(K_U)=+1,
 \quad
 \operatorname{sgn}\operatorname{Norm}(\Xi_q)=-1.
\]

Thus positivity and an \((r-1)\)-long zero-support run are compatible with
\(x_0<2^U\).  The large denominator supplies the necessary coefficient
size and local three-content.  This is an exact obstruction to any argument
that uses only signs, zero runs, or norm size before using \(q=1\).

It is not a counterexample to the target theorem because \(q=1631\), not
one.  An example satisfying all the same conditions with \(q=1\) would be
a nontrivial positive integer Collatz cycle.  No such example is claimed.

## Conclusion

The one-drop endpoint quotient is more rigid than a general deformation
quotient: all of its canonical coefficients are positive and are given by
(6).  This rigidity still does not force canonical descent or
\(x_0>2^U\).  The coordinate system reproduces the state recurrence and
its product reproduces closure.  A successful continuation must use the
denominator-one congruences at the nonzero reset coordinates, or the
ordered full-modulus cylinder lift.  Coefficient signs and norm magnitude
alone have been exhausted.

The exact regression is
[`cycles/cycle_one_drop_norm_certificate.js`](cycles/cycle_one_drop_norm_certificate.js).
