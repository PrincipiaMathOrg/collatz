# Why near factors do not yet give a resultant code bound

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** A Hamming-\(k\) comparison of two proper factors does not
produce a nonzero multiple of \(D=2^N-3^r\). The local affine extraction
uses up the one factor of \(D\) supplied by denominator one. For full
cyclic rotations, divisibility by \(D\) returns, but Hamming distance
\(k\) controls only the number of changes in the prefix-height
difference, not the size of its support. Already Hamming distance two can
produce \(r-O(1)\) shifted prefix indices. Therefore none of the frozen
support-\(\leq4\) resultant exclusions applies.

There is a limited positive statement. Exact-factor separation implies
an elementary minimum Hamming distance at lengths which are multiples of
the collision length. This is a common-subfactor argument, not a new
modular constraint, and it does not improve the high-rise capacity bound.

## 1. Local affine comparison

For a valuation word

\[
w=(a_0,\ldots,a_{L-1}),
\]

put

\[
A_i(w):=\sum_{j<i}a_j,\qquad
A(w):=A_L(w),
\]

and define its affine carry

\[
c(w):=
\sum_{i=0}^{L-1}3^{L-1-i}2^{A_i(w)}.
\tag{1}
\]

Every exact realization of \(w\) satisfies

\[
2^{A(w)}y_L=3^Ly+c(w).
\tag{2}
\]

Let \(v\) be another length-\(L\) factor, and abbreviate
\(A:=A(w)\), \(B:=A(v)\). Multiplying the two affine identities to align
their endpoint coefficients gives

\[
\begin{aligned}
2^{A+B}(y_L-z_L)
={}&3^L(2^By-2^Az)+R(w,v),\\
R(w,v):={}&2^Bc(w)-2^Ac(v).
\end{aligned}
\tag{3}
\]

The Hamming distance between \(w\) and \(v\) may make \(R(w,v)\) sparse
after block compression. Equation (3), however, contains no divisibility
by the full-cycle determinant.

## 2. Denominator one is consumed exactly once

Let \(\mathcal C_s\) denote the full carry of the cyclic rotation
beginning at \(s\). Under denominator one,

\[
\mathcal C_s=Dx_s.
\tag{4}
\]

If \(w\) is the length-\(L\) factor beginning at \(s\), multiplication of
(2) by \(D\) gives

\[
2^{A(w)}\mathcal C_{s+L}
-3^L\mathcal C_s
=D\,c(w).
\tag{5}
\]

Both terms on the left are already divisible by \(D\). Reducing (5)
modulo \(D\) therefore gives \(0=0\), not \(D\mid c(w)\). Comparing two
factors gives

\[
\begin{aligned}
&2^{A+B}
(\mathcal C_{s+L}-\mathcal C_{t+L})\\
&\quad
-3^L(2^B\mathcal C_s-2^A\mathcal C_t)
=D\,R(w,v).
\end{aligned}
\tag{6}
\]

Again, every term on the left contains the known single factor \(D\).
After cancellation, (6) is exactly the local identity (3). To deduce
\(D\mid R(w,v)\), one would need a new divisibility by \(D^2\), or an
independent equality among the four state quotients in (6). Hamming
closeness supplies neither.

This obstruction is exact. The natural local integer \(R(w,v)\) can be
nonzero and smaller than \(D\) without being divisible by \(D\), even
when \(w\) and \(v\) occur in the same one-drop factor language and both
are exact odd Collatz cylinders. The checker finds:

| Hamming distance | \((r,N,U,L)\) | \(w\) | \(v\) | \(R(w,v)\) | \(D\) |
|---:|---:|:---:|:---:|---:|---:|
| 1 | \((5,8,1,2)\) | \(21\) | \(11\) | \(-12\) | \(13\) |
| 2 | \((6,10,1,2)\) | \(12\) | \(21\) | \(-16\) | \(295\) |
| 3 | \((6,10,1,3)\) | \(121\) | \(212\) | \(272\) | \(295\) |
| 4 | \((7,12,1,4)\) | \(1221\) | \(2112\) | \(-128\) | \(1909\) |

These rows are not denominator-one cycle counterexamples. They certify
the sharper algebraic point: local exactness plus a small Hamming
distance does not place the aligned carry difference in
\(D\mathbf Z\). The missing input in (6) is precisely a second global
divisibility.

## 3. Full rotations have the opposite obstruction

At \(L=r\), the two factors are full cyclic rotations and have the same
total exponent \(N\). Now denominator one does give

\[
c(w)-c(v)=D(x_s-x_t).
\tag{7}
\]

Thus the difference is a nonzero multiple of \(D\), but it is
automatically at least \(D\) in absolute value. More importantly, small
letter Hamming distance does not give small deformation support.

Let \(A_i\) and \(B_i\) be the prefix sums of two full words. Suppose,
for example, that the words differ only at \(p<q\), with

\[
w_p=v_p+1,\qquad w_q=v_q-1.
\]

Then

\[
A_i-B_i=
\begin{cases}
1,&p<i\leq q,\\
0,&\text{otherwise}.
\end{cases}
\tag{8}
\]

Consequently,

\[
c(w)-c(v)
=
\sum_{i=p+1}^{q}
3^{r-1-i}2^{B_i}.
\tag{9}
\]

The two words have Hamming distance two, but the shifted prefix support
in (9) has size \(q-p\), which can be \(r-O(1)\). The frozen small-support
resultants count the indices for which \(A_i-B_i\neq0\). They do not count
the two endpoints at which this height changes. Thus (9) is a
long-interval deformation, not a support-two deformation.

This occurs inside the one-drop language itself. The maximal-rise word

\[
(1^{r-1},e+1),
\]

obtained by omitting every eligible preterminal two-site, has Hamming
distance two from each nontrivial cyclic rotation. Moving its terminal
letter through \(q\) positions makes the prefix-height difference nonzero
on all \(q\) intervening indices. This rational profile need not have
denominator one, but it proves that the proposed conversion from letter
Hamming support to deformation support is not a combinatorial identity.

The same issue persists for \(k\leq4\). The prefix-height difference is
piecewise constant with at most \(k\) change points, but its nonzero
intervals can have arbitrary total length and arbitrary heights. A
terminal-letter mismatch can make those heights as large as \(U+1\).
This lies outside both the binary support hypothesis and the fixed
coefficient lists of the frozen resultant theorems.

There is therefore a sharp dichotomy:

- for \(L<r\), the near-factor integer may be small, but it is not known
  to be divisible by \(D\);
- for \(L=r\), it is divisible by \(D\), but Hamming-\(k\) does not make
  it a small-support or a sub-\(D\) integer.

Taking \(L=r-O(1)\) only replaces the second obstruction by an
uncontrolled complementary carry. At the factor-capacity scale
\(L\asymp U\), that complement has length \(r-\Theta(U)\) and cannot be
discarded.

## 4. The Hamming separation which does follow

Put

\[
h:=\log _2(4x),
\qquad
\ell:=
\left\lfloor\frac{U+h-1}{\alpha}\right\rfloor+1.
\tag{10}
\]

The exact-factor theorem says that no two distinct cyclic starts have a
common valuation factor of length \(\ell\). Let two length-\(L\) factors
have Hamming distance \(d\). Their matching positions split into at most
\(d+1\) consecutive runs. Each run has length at most \(\ell-1\), and
hence

\[
L-d\leq(d+1)(\ell-1).
\]

Equivalently,

\[
\boxed{
d_H(w,v)\geq
\left\lceil\frac{L+1}{\ell}\right\rceil-1.}
\tag{11}
\]

For example, \(L\geq5\ell\) rules out Hamming distances at most four.
This conclusion uses only the already proved exact-factor collision on a
long matching subblock.

Equation (11) does not by itself yield a useful packing theorem. A
Hamming ball in the unconstrained binary language has an exponential
ambient space, while the mean-cost factor bound becomes weaker as \(L\)
increases. At \(L=5\ell\), its leading quadratic language-capacity term
is twenty-five times the corresponding term at \(\ell\). A constrained
ball count would need a new theorem showing that many nearby words remain
inside a common low-cost mechanical deletion layer. Hamming separation
alone does not provide that statement.

## 5. Exact audit

The script
[one_drop_factor_hamming_no_go_certificate.js](cycles/one_drop_factor_hamming_no_go_certificate.js)
uses integer arithmetic to:

- find the four displayed distances inside genuine one-drop
  nonterminal factor languages;
- construct an odd exact cylinder start for every displayed word;
- verify the aligned affine identity (3);
- verify \(0<|R(w,v)|<D\) and \(D\nmid R(w,v)\);
- verify that a Hamming-two pair can have 37 nonzero prefix-height
  indices in a word of length 64;
- verify on the maximal one-drop word of length 64 that a cyclic rotation
  of Hamming distance two has 31 nonzero prefix-height indices.

It returns \(\texttt{status=PASS}\).

## Conclusion

The proposed direct Hamming-ball upgrade does not connect to the frozen
small-support resultants. Proper factors lose the determinant
divisibility when the local affine identity is divided out, while full
rotations lose support sparsity when letter discrepancies are integrated
to prefix heights.

A viable code theorem would require genuinely new input, such as a
second-order \(D^2\) congruence, equality of the relevant endpoint state
quotients, or a bounded-transition resultant which controls arbitrarily
long constant-height intervals. None of these follows from
denominator one and Hamming distance \(k\leq4\).
