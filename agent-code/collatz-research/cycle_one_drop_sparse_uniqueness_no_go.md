# Sparse uniqueness is exact but does not separate denominator one

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** We prove exact valuation decoders for both the sparse one-drop
numerator and the full Collatz carry.  They establish injectivity, but under
the equality \(D Q=K\) the full decoder is exactly the cyclic state
recurrence.  Thus positive sparse uniqueness supplies no independent
contradiction.

## 1. Indexing and the bottom bridge

Let

\[
N:=\lceil r\log _2 3\rceil,
\qquad e:=N-r,
\qquad D:=2^N-3^r.
\]

Write the one-based spike times as

\[
1\leq t_1<\cdots<t_V\leq r-1,
\qquad
t_k\in\left\{t:1\leq t<r,\ 
\left\lfloor\frac{et}{r}\right\rfloor-
\left\lfloor\frac{e(t-1)}{r}\right\rfloor=1\right\}.
\]

The complementary height is \(U:=e-1-V\).  Put

\[
A:=r-1+V=N-U-2,
\qquad M:=2^A,
\]

and define

\[
J:=\sum_{k=1}^V3^{r-1-t_k}2^{t_k+k-2},
\qquad
K:=2^{N-1}-M+3J.
\tag{1}
\]

The corresponding exponent word \(a_0,\ldots,a_{r-1}\) has
\(a_{t-1}=2\) at the spike times, \(a_i=1\) at the other preterminal
sites, and \(a_{r-1}=U+2\).  If

\[
A_i:=\sum_{j<i}a_j,
\qquad
C:=\sum_{i=0}^{r-1}3^{r-1-i}2^{A_i},
\tag{2}
\]

then direct collection of the unit background and the spike increments
gives the exact bridge

\[
\boxed{2K=C+D.}
\tag{3}
\]

Consequently,

\[
DQ=K
\quad\Longleftrightarrow\quad
C=D(2Q-1).
\tag{4}
\]

## 2. The sparse numerator is uniquely decodable

**Proposition 1.** The integer \(J\), together with \(r\), uniquely
determines \(V\) and the ordered spike times.

**Proof.** Put \(J_0:=J\).  If \(J_{k-1}>0\), the first surviving term
in (1) has strictly smaller dyadic valuation than every later term.  Hence

\[
t_k=v_2(J_{k-1})-k+2.
\tag{5}
\]

Subtract that term:

\[
J_k:=J_{k-1}-3^{r-1-t_k}2^{t_k+k-2}.
\tag{6}
\]

Repeating (5) and (6) terminates exactly when \(J_k=0\).  This recovers
the complete ordered support and proves uniqueness. \(\square\)

This theorem does not use Beatty eligibility.  In particular, there are
no collisions among positive sparse expansions of this form.

## 3. The full carry is also uniquely decodable

**Theorem 2.** Fix the length \(r\).  Among words with positive integer
exponents, the map \((a_0,\ldots,a_{r-1})\mapsto C\) in (2) is injective.

**Proof.** Put \(R_0:=C\) and \(A_0:=0\).  Once \(A_i\) is known, define

\[
R_{i+1}:=R_i-3^{r-1-i}2^{A_i}.
\tag{7}
\]

The remaining terms in (2) have dyadic valuations
\(A_{i+1}<A_{i+2}<\cdots\).  Their first odd coefficient is a power of
three.  Therefore, for \(i<r-1\),

\[
A_{i+1}=v_2(R_{i+1}).
\tag{8}
\]

Equations (7) and (8) recover every prefix sum and hence every exponent.
The final check is \(R_r=0\). \(\square\)

## 4. Denominator one makes the decoder tautological

Assume (4), put \(x:=2Q-1\), and let \(x_i\) be the cyclic odd states:

\[
2^{a_i}x_{i+1}=3x_i+1,
\qquad x_r=x_0=x.
\tag{9}
\]

The remainders in (7) then admit the exact closed form

\[
\boxed{
R_i=2^{A_i}
\left(2^{N-A_i}x-3^{r-i}x_i\right).}
\tag{10}
\]

Indeed, (10) holds at \(i=0\) by \(C=Dx\).  Subtracting the next carry
term and using (9) gives the formula at \(i+1\).  At the terminal index it
reduces to

\[
R_r=2^N(x-x_r)=0.
\]

Moreover, the valuation step (8) is simply

\[
a_i=v_2(3x_i+1).
\]

Thus the full carry decoder does not furnish a second representation of
the same positive integer.  It merely reconstructs the hypothetical
cycle from its initial state.  The identity

\[
QD=Q2^N-Q3^r
\]

is signed, so it cannot be compared with (1) or (2) by positive-expansion
uniqueness.  Any contradiction would require an additional restriction on
the absolute residue \(K\bmod D\), not injectivity of the sparse support.

## 5. Exact certificate

The checker
[one_drop_sparse_uniqueness_certificate.js](cycles/one_drop_sparse_uniqueness_certificate.js)
audits the two decoders, the bridge (3), and all anchored profiles through
\(r=30\).  It also checks (10) on denominator-one cyclic words.  The run

    node cycles/one_drop_sparse_uniqueness_certificate.js 30

returns

    {"maxR":30,"profiles":"383922","carryDecodes":"383922","sparseDecodes":"383922","distinctK":"383922","closedFormRows":"28","collision":null,"status":"PASS"}

## Conclusion

Positive sparse uniqueness is completely true, even without the Beatty
restriction.  Its strongest natural extension, injectivity of the full
carry, is also true.  Under denominator one, however, that extension is
equivalent term by term to the original Collatz return.  Therefore this
route cannot prove nonvanishing of \(K\bmod D\) without a new global
arithmetic input.
