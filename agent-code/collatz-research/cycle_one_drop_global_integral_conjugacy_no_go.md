# Global integral conjugacy and the single denominator class

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** exact global theorem and exact determinant, trace, and norm no-go.
The full one-drop monodromy is integrally diagonalizable exactly when the
common denominator is one.  Its eigenlattice index is

\[
 \frac{D}{\gcd(D,K)},
\]

so it does couple all prime powers of \(D\), but it is precisely the
original cyclic quotient class.  Ordinary determinants and traces do not
see the omission set.  The endpoint norm can be divisible by the whole
of \(D\) even when the original class is a unit.  Thus none of these
global invariants supplies a second factor of \(D\).

## 1. The integral monodromy

Let \(a=(a_0,\ldots,a_{r-1})\) be any positive exponent word of total
weight \(N\).  Put

\[
 A_i:=\begin{pmatrix}3&1\\0&2^{a_i}\end{pmatrix},
 \qquad
 B:=A_{r-1}\cdots A_0.
\tag{1}
\]

If

\[
 C:=\sum_{i=0}^{r-1}3^{r-1-i}2^{a_0+\cdots+a_{i-1}},
\tag{2}
\]

then direct multiplication gives

\[
 \boxed{
 B=\begin{pmatrix}3^r&C\\0&2^N\end{pmatrix}.}
\tag{3}
\]

Write

\[
 D:=2^N-3^r,
 \qquad g:=\gcd(C,D),
 \qquad h:=\frac Dg.
\tag{4}
\]

The primitive eigenvector for the eigenvalue \(3^r\) is \((1,0)^t\).
The primitive eigenvector for the eigenvalue \(2^N\) is

\[
 v=\left(\frac Cg,\frac Dg\right)^t.
\tag{5}
\]

Consequently, the two primitive eigendirections span a sublattice of
\(\mathbf Z^2\) of exact index

\[
 \boxed{
 [\mathbf Z^2:\mathbf Z(1,0)^t+\mathbf Zv]=h.}
\tag{6}
\]

The rational fixed point of the affine cycle is \(x=C/D\), whose reduced
denominator is also \(h\).  We have therefore proved the following global
form of the denominator-one condition.

**Theorem 1.** The following statements are equivalent.

1. The cycle fixed point is an integer.
2. \(D\mid C\).
3. The two primitive eigendirections of \(B\) span \(\mathbf Z^2\).
4. The matrix \(B\) is conjugate over \(\operatorname{GL}_2(\mathbf Z)\)
   to \(\operatorname{diag}(3^r,2^N)\).

Indeed, if \(x=C/D\) is an integer, then

\[
 U:=\begin{pmatrix}1&x\\0&1\end{pmatrix}
 \quad\hbox{satisfies}\quad
 BU=U\operatorname{diag}(3^r,2^N).
\tag{7}
\]

Conversely, an integral diagonalizing basis must consist of primitive
vectors in the two rational eigendirections.  Its determinant therefore
has absolute value equal to the index in (6), so it is unimodular only
when \(h=1\).

For the one-drop bottom numerator \(K\), the exact identity \(2K=C+D\)
and the oddness of \(D\) give

\[
 \gcd(C,D)=\gcd(K,D).
\tag{8}
\]

Thus (6) is exactly the reduced denominator already measured in the
omission-coordinate search.

## 2. Why determinant and trace are blind

The characteristic polynomial of (3) is

\[
 (T-3^r)(T-2^N).
\tag{9}
\]

In particular,

\[
 \operatorname{tr}(B^k)=3^{rk}+2^{Nk},
 \qquad
 \det B=3^r2^N,
\tag{10}
\]

for every positive integer \(k\).  These quantities depend only on
\((r,N)\), not on the word or the omission set.

There is an equivalent transition-matrix statement.  Let \(L\) be the
weighted cyclic shift whose edge weights are \(2^{a_i}\).  Then

\[
 L^r=2^NI,
 \qquad
 \boxed{
 \det(TI-(L-3I))=(T+3)^r-2^N.}
\tag{11}
\]

Thus every coefficient of the characteristic polynomial, and hence every
ordinary trace or determinant obtained from the transition operator, is
independent of the one-drop profile.

Integral conjugacy sees one additional datum.  For

\[
 U_t:=\begin{pmatrix}1&t\\0&1\end{pmatrix},
\]

we have

\[
 U_t^{-1}BU_t
 =\begin{pmatrix}3^r&C-Dt\\0&2^N\end{pmatrix}.
\tag{12}
\]

Hence the off-diagonal extension class is

\[
 \boxed{[C]=[2K]\in\mathbf Z/D\mathbf Z.}
\tag{13}
\]

The monodromy splits over \(\mathbf Z\) precisely when this one class is
zero.  For a factorization \(D=\prod p^{\nu_p}\), the eigenlattice index
is

\[
 h=\prod_{p\mid D}p^{\max(0,\nu_p-v_p(C))}.
\tag{14}
\]

Thus the global index does impose every prime-power condition at once,
but it only takes their product.  It does not create an interaction
between distinct prime powers or a second copy of \(D\).  This explains
the \(r=30\) obstruction: local splitting for different profiles at the
individual factors does not imply that one profile has zero extension
class in (13).

## 3. The endpoint trace recovers the same class

Assume now \(\gcd(N,r)=1\), let \(\theta^r=2\), and use the one-drop
endpoint elements

\[
 \delta=\theta^N-3,
 \qquad
 \Xi=\frac{K_U(\theta)}{\delta}.
\tag{15}
\]

Put \(A:=2^{U+1}\).  The exact quotient-coordinate formula is valid over
\(\mathbf Q\), whether or not the common denominator is one.  Its
constant coefficient is

\[
 \xi_0=Ax+1
 =\frac{2AK-(A-1)D}{D}.
\tag{16}
\]

Since \(\operatorname{Tr}(\theta^j)=0\) for \(1\leq j<r\), we obtain

\[
 \boxed{
 \operatorname{Tr}(\Xi)
 =r\frac{2AK-(A-1)D}{D}.}
\tag{17}
\]

The normalized trace \(r^{-1}\operatorname{Tr}(\Xi)=\xi_0\) is an
integer exactly when \(D\mid K\), because \(D\) is odd.  Therefore the
normalized trace is not a new condition.  It is a direct extraction of
the original quotient coordinate.  Ordinary trace integrality is weaker
when \(\gcd(r,D)>1\), as (17) also makes explicit.

## 4. Full norm divisibility is still insufficient

The norm loses the distinguished prime ideal above each rational prime.
This failure already occurs in a small strict one-drop profile.

Take the zero-based set of selected preterminal sites

\[
 (r,N,U)=(8,13,3),
 \qquad
 S=\{1,4,6\}.
\tag{18}
\]

The mechanical gaps give the exponent word

\[
 a=(1,1,1,2,1,1,1,5).
\tag{19}
\]

Here

\[
 D=1631=7\cdot233,
 \qquad
 C=7345,
 \qquad
 K=4488,
 \qquad
 \gcd(D,K)=1.
\tag{20}
\]

Thus the original class is a unit modulo \(D\).  On the other hand, the
endpoint polynomial is simply

\[
 K_U(X)=45+8X.
\tag{21}
\]

Its norm from \(\mathbf Q(\theta)\), with \(\theta^8=2\), is

\[
\begin{aligned}
 \operatorname{Norm}(45+8\theta)
 &=45^8-2\cdot8^8\\
 &=16{,}815{,}091{,}836{,}193\\
 &=1631\cdot10{,}309{,}682{,}303.
\end{aligned}
\tag{22}
\]

Therefore

\[
 D\mid\operatorname{Res}(X^8-2,K_U(X))
 \quad\hbox{but}\quad
 D\nmid K.
\tag{23}
\]

The reason is structural.  The norm is allowed to acquire a factor
\(p\mid D\) from any conjugate prime ideal over \(p\).  The cyclic
quotient condition selects one particular prime ideal, equivalently one
particular root \(g\) modulo \(p^{\nu_p}\).  Multiplying over all
conjugates forgets that selection.  Equation (22) shows that even
divisibility by the whole rational integer \(D\) does not repair this
loss.

## Conclusion

The eigenlattice formulation is a genuine global integer theorem.  It
couples every prime power of \(D\) and identifies denominator one with an
integral splitting of the full cycle monodromy.  Its exact obstruction is,
however, the same single class \([K]\in\mathbf Z/D\mathbf Z\) already
present in the cyclotomic and omission-coordinate formulations.

Determinants and traces are either profile-blind or recover that class by
coordinate extraction.  A full norm divisibility can be a false positive
even when \([K]\) is a unit.  Consequently, these constructions cannot
produce the second independent \(D\)-factor needed for an all-depth
exclusion.  A successful global continuation must control the
distinguished residue simultaneously at all prime powers, rather than
aggregate conjugate prime ideals through a norm.

The exact regression is
[`cycles/one_drop_global_integral_conjugacy_certificate.js`](cycles/one_drop_global_integral_conjugacy_certificate.js).
