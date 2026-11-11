# The one-drop sparse resultant gate

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** We reformulate denominator one as the vanishing of a sparse
Beatty Laurent polynomial in a finite resultant ring. The formulation is
exact when \(\gcd(r,N)=1\), and the usual cyclotomic splitting is required
otherwise. The associated integer-root polynomial has a positive
quotient, but this positivity is automatic and gives no contradiction.
Its content and its \(2\)-adic and \(3\)-adic Newton polygons are also
exactly compatible with the required root. Thus the elementary
size-content route does not close the one-drop gate. No all-depth proof is
claimed.

## 1. A sparse polynomial with root \(3\)

We retain the notation

\[
N:=r+e,
\qquad
D:=2^N-3^r,
\qquad
L:=r-1.
\tag{1}
\]

Let

\[
1\leq t_1<\cdots<t_V\leq L
\]

be the one-based spike times, put \(U:=e-1-V\), and define

\[
A:=L+V=N-U-2,
\qquad
M:=2^A.
\tag{2}
\]

The affine numerator and the bottom numerator are

\[
J:=\sum_{k=1}^{V}2^{t_k+k-2}3^{L-t_k},
\qquad
K:=2^{N-1}-M+3J.
\tag{3}
\]

Exact denominator one is the divisibility \(D\mid K\). If
\(q:=K/D\) is integral, then bottom closure is equivalent to

\[
Dq=K.
\tag{4}
\]

Put

\[
T:=2^{U+1}(2q-1)+1.
\tag{5}
\]

Since \(N-1-A=U+1\), equation (4) can be rearranged as

\[
q3^r+
\sum_{k=1}^{V}2^{t_k+k-2}3^{r-t_k}
=MT.
\tag{6}
\]

Consequently, the polynomial

\[
F_{q,S}(X):=
qX^r+
\sum_{k=1}^{V}2^{t_k+k-2}X^{r-t_k}-MT
\tag{7}
\]

satisfies \(F_{q,S}(3)=0\). Equation (6) gives the more informative
factorization

\[
\frac{F_{q,S}(X)}{X-3}
=q\sum_{j=0}^{r-1}3^jX^{r-1-j}
+\sum_{k=1}^{V}2^{t_k+k-2}
  \sum_{j=0}^{r-t_k-1}3^jX^{r-t_k-1-j}.
\tag{8}
\]

Every coefficient on the right side of (8) is positive. This does not
contradict the root \(3\). Rather, it is an automatic consequence of the
one-negative-constant form of (7). The same positive factorization holds
over \(\mathbf Q\) for the rational fixed point \(Q=K/D\), so positivity
does not detect denominator one.

## 2. Content and endpoint Newton polygons

Suppose that \(V\geq1\) and that the integral fixed point lies in the
designated dyadic cylinder. The first-spike valuation gives

\[
v_2(q)=t_1-1.
\tag{9}
\]

The first spike coefficient in (7) is \(2^{t_1-1}\), every later spike
coefficient has larger \(2\)-adic valuation, and \(T\) is odd. Therefore,

\[
\operatorname{cont}(F_{q,S})=2^{t_1-1}.
\tag{10}
\]

After division by this content, the leading coefficient and the first
spike coefficient are odd. All later spike coefficients and the constant
coefficient have positive \(2\)-adic valuation. Thus the rightmost edge of
the \(2\)-adic Newton polygon is horizontal, from degree \(r-t_1\) to
degree \(r\). It is fully compatible with the root \(3\), whose
\(2\)-adic valuation is zero.

The last spike gives the analogous statement at \(3\). Immediately after
a spike, the state is nonzero modulo \(3\). Each of the remaining
\(L-t_V\) ordinary branches introduces one factor of \(3\). Since bottom
closure gives \(T=3z_L\), we obtain

\[
v_3(T)=r-t_V.
\tag{11}
\]

Put \(h:=r-t_V\). The lowest nonconstant term of (7) has degree \(h\)
and \(3\)-adic valuation zero, while the constant coefficient has
valuation \(h\). There are no terms of degrees \(1,\ldots,h-1\).
Consequently, the leftmost \(3\)-adic Newton edge joins \((0,h)\) to
\((h,0)\) and has slope \(-1\). It is again exactly compatible with the
root \(3\), whose \(3\)-adic valuation is one.

We have therefore obtained no content or Newton-polygon contradiction.
These local objects record the first and last cylinder lifts, respectively.
They do not see the intervening lifts.

## 3. The resultant ring

The global binomial gap itself is a resultant when the exponents are
coprime. In general, if \(d:=\gcd(r,N)\), then

\[
\left|\operatorname{Res}
 (X^r-2,X^N-3)\right|
=\left|2^{N/d}-3^{r/d}\right|^d.
\tag{12}
\]

In particular, suppose that \(d=1\). Choose integers \(u,v\) such that

\[
ur+vN=1,
\]

and define the unit

\[
g:=2^u3^v\pmod D.
\tag{13}
\]

The relation \(2^N\equiv3^r\pmod D\) gives

\[
g^r\equiv2,
\qquad
g^N\equiv3
\pmod D.
\tag{14}
\]

Equation (12) and (14) identify the finite resultant ring as

\[
\mathbf Z[X]/(X^r-2,X^N-3)
\simeq \mathbf Z/D\mathbf Z,
\tag{15}
\]

where the class of \(X\) maps to \(g\).

We now define the sparse Laurent polynomial

\[
P_S(X):=
X^{r(U+1)}+
\sum_{k=1}^{V}X^{r(U+k)-et_k}-1.
\tag{16}
\]

All its nonconstant coefficients equal one. Dividing (3) by \(3^r\),
then multiplying by \(g^{r(U+2)}\), gives

\[
P_S(g)\equiv
K g^{r(U+2)-Nr}pmod D.
\tag{17}
\]

The power of \(g\) is a unit. We have therefore proved the exact
equivalence

\[
\boxed{
D\mid K
\quad\Longleftrightarrow\quad
P_S(g)=0\text{ in }\mathbf Z/D\mathbf Z.
}
\tag{18}
\]

The Beatty phase is visible directly in the exponents. Let

\[
B_t:=\left\lfloor\frac{et}{r}\right\rfloor,
\qquad
H_{t_k}:=B_{t_k}-k,
\qquad
\varepsilon_k:=et_k-rB_{t_k}.
\tag{19}
\]

At a one site, \(0\leq\varepsilon_k<e\), and

\[
r(U+k)-et_k
=r(U-H_{t_k})-\varepsilon_k.
\tag{20}
\]

Thus (16) is a unit-coefficient encoding of the remaining omission debt
and the exact mechanical phase. This is cleaner than the original mixed
powers of \(2\) and \(3\), but it is not a smaller problem: the modular
vanishing in (18) is precisely the full denominator-one obstruction.

When \(d>1\), the resultant in (12) is not \(D\). The gap
\(D=2^N-3^r\) instead has the homogeneous cyclotomic factorization of
\(a^d-b^d\), with \(a:=2^{N/d}\) and \(b:=3^{r/d}\). Consequently, a
uniform resultant proof must also control every cyclotomic factor. The
single ring (15) does not cover that case.

## 4. A local algebraic shadow

The endpoint conditions already admit a small anchored shadow. For
\(r=12\), we have \((N,e)=(20,8)\). Take

\[
U=5,
\qquad
V=2,
\qquad
t_1=2,
\qquad
t_2=11,
\qquad
q=6.
\tag{21}
\]

Both spike times are one sites. Moreover,

\[
v_2(q)=1=t_1-1,
\]

and

\[
T=2^6(2\cdot6-1)+1=705=3\cdot235,
\qquad
v_3(T)=1=r-t_2.
\tag{22}
\]

Thus both endpoint Newton conditions are satisfied in the low range
\(q\leq2^{U-1}=16\). Nevertheless, the middle cylinder fails. The first
ordinary step sends \(6\) to \(9\), the spike at time \(2\) sends \(9\)
to \(7\), and the state \(7\equiv3\pmod4\) is inadmissible at time \(3\).
This example shows concretely that the endpoint algebra does not recover
the full lift sequence.

## 5. Exact audit and conclusion

The script
[cycles/bottom_sparse_polynomial_probe.js](cycles/bottom_sparse_polynomial_probe.js)
uses integer arithmetic throughout. It verifies (13) through (17) for
all 2,994 anchored subsets with \(3\leq r\leq18\), of which 2,026 have
\(\gcd(r,N)=1\). It finds the endpoint shadow (21) first in an exact scan
through \(r=300\). A separate exhaustive subset scan through \(r=32\)
finds no low solution of \(D\mid K\). The latter is only a consistency
check and proves no all-depth statement.

The sparse-polynomial reformulation therefore identifies, but does not
remove, the hard core. Real positivity is automatic, primitive content is
compatible, and the local Newton polygons reproduce the known endpoint
valuations. A genuinely new algebraic proof would have to separate the
unit-coefficient Beatty sum (16) from zero in the full finite resultant
ring, including the cyclotomic components when \(\gcd(r,N)>1\). No such
separation theorem is presently known.
