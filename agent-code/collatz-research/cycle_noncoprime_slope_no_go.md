# The noncoprime base factor is a block-state telescoping identity

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** reduction modulo \(2^{N/g}-3^{r/g}\) does not force a shorter
cycle, equal block weights, or repetition.  Under denominator one, the
base-factor congruence is an exact telescoping identity among integer
block-boundary states.  The implication
\(q=1\Longrightarrow\gcd(N,r)=1\) remains open.

## 1. Block notation without an equal-weight assumption

Let

\[
g:=\gcd(N,r)>1,\qquad N=gN_0,\qquad r=gr_0,
\]

and put

\[
X:=2^{N_0},\qquad Y:=3^{r_0},\qquad
E:=X-Y,\qquad D:=X^g-Y^g=EH.
\tag{1}
\]

We split the accelerated word into \(g\) consecutive blocks, each
containing \(r_0\) odd steps.  Let \(A_m\) be the total shortcut exponent
before block \(m\), and define

\[
n_m:=A_{m+1}-A_m,\qquad
h_m:=mN_0-A_m
\qquad(0\leq m\leq g).
\tag{2}
\]

Thus

\[
n_m=N_0+h_m-h_{m+1},\qquad h_0=h_g=0.
\tag{3}
\]

The block weights \(n_m\) are not assumed to equal \(N_0\).

Suppose that the word is one-strip and rotated to a strict record.  If
\(\lambda:=N-r\log_2 3\in(0,1)\), then the strict suffix inequality at the
start of block \(m\) gives

\[
h_m>-\frac{g-m}{g}\lambda>-1.
\]

Since \(h_m\) is an integer,

\[
\boxed{h_m\geq0\qquad(0\leq m<g).}
\tag{4}
\]

Let \(K_m\) be the local carry of block \(m\), and let \(x_m\) be the
cycle state at its initial vertex.  The exact block equation is

\[
2^{n_m}x_{m+1}=Yx_m+K_m,
\qquad x_g=x_0.
\tag{5}
\]

This equation is valid for the canonical rational cycle of any word, as
well as for an integer cycle.

## 2. Exact telescoping

Put

\[
h:=\max_m h_m,\qquad
W_m:=2^{h-h_m}x_m,\qquad
B_m:=2^{h-h_m}K_m.
\tag{6}
\]

Using \((3)\) in \((5)\), we obtain

\[
\boxed{B_m=XW_{m+1}-YW_m.}
\tag{7}
\]

Summing cyclically gives

\[
\boxed{
\sum_{m=0}^{g-1}B_m
=E\sum_{m=0}^{g-1}W_m.}
\tag{8}
\]

On the other hand, grouping the full carry by blocks gives

\[
2^hC
=\sum_{m=0}^{g-1}X^mY^{g-1-m}B_m.
\tag{9}
\]

Substitution of \((7)\) in \((9)\) telescopes again:

\[
\boxed{
2^hC=(X^g-Y^g)W_0=DW_0.}
\tag{10}
\]

Since \(X\), \(Y\), and \(2\) are units modulo \(E\), equations
\((8)\)-\((9)\) give the exact interpretation

\[
\boxed{
E\mid C
\quad\Longleftrightarrow\quad
E\mid\sum_mB_m
\quad\Longleftrightarrow\quad
\sum_mW_m\in\mathbf Z.}
\tag{11}
\]

For a denominator-one cycle, every \(x_m\), \(W_m\), and \(B_m\) is an
integer.  Hence the reduction modulo \(E\) in \((11)\) is automatic.  It
does not assert that two \(W_m\) are equal, that two \(x_m\) are equal, or
that any \(n_m\) equals \(N_0\).

In other words, the base factor records the sum of a cyclic discrete
derivative.  It does not produce a shorter autonomous return map.  Such a
map would require additional equalities among the individual block data,
not merely the sum in \((8)\).

## 3. The two-block case

Suppose \(g=2\), and put \(d:=h_1\).  Then

\[
n_0=N_0-d,\qquad n_1=N_0+d,
\]

and

\[
W_0=2^dx_0,\qquad W_1=x_1,\qquad
B_0=2^dK_0,\qquad B_1=K_1.
\]

Equation \((7)\) gives both factor identities:

\[
\boxed{
2^dK_0+K_1=(X-Y)(2^dx_0+x_1),}
\tag{12}
\]

\[
\boxed{
2^dK_0-K_1=(X+Y)(x_1-2^dx_0).}
\tag{13}
\]

Thus the complementary factor does not force \(x_1=x_0\).  Its quotient is
the scaled block-state gap \(x_1-2^dx_0\).  Even equality of the left side
to zero would give \(x_1=2^dx_0\), which is a repeated state only when
\(d=0\).

Equations \((12)\)-\((13)\) also rule out a simple size argument.  For an
integer cycle, the two quotients are ordinary integers and need not have
absolute value below one.  The finite scan below finds base-factor examples
with

\[
|2^dK_0-K_1|>X+Y.
\tag{14}
\]

## 4. Sharp countermodel to block repetition

Consider

\[
a=(1,1,1,1,1,5).
\tag{15}
\]

It is primitive, strict-record, and one-strip, with

\[
r=6,\qquad N=10,\qquad g=2,\qquad
N_0=5,\qquad r_0=3,
\]

\[
E=5,\qquad H=59,\qquad D=295,\qquad C=665.
\tag{16}
\]

Its two block weights and carries are

\[
(n_0,n_1)=(3,7),\qquad (K_0,K_1)=(19,19).
\tag{17}
\]

Therefore the blocks do not have weight \(N_0\).  Nevertheless,

\[
E\mid C,\qquad \gcd(C,D)=5.
\]

The associated exact positive rational cycle has denominator \(59\).  Its
numerator states are

\[
133,\quad229,\quad373,\quad589,\quad913,\quad1399,
\tag{18}
\]

and the two block-boundary numerators are \(133\) and \(589\).  Thus there is
no repeated state and no shorter cycle.  Indeed, \(d=2\), and equations
\((12)\)-\((13)\) read

\[
4K_0+K_1=95=5\cdot19,
\qquad
4K_0-K_1=57=59\left(\frac{589-4\cdot133}{59}\right).
\tag{19}
\]

This is not an integer-cycle counterexample.  It proves the sharper
negative statement that base-factor divisibility, primitivity, strict
records, one-strip geometry, positivity, and exact local valuations do not
force equal block weights, a repeated word, or a shorter rational cycle.
The missing condition is precisely divisibility by the complementary
cofactor \(H\).

There is also no universal bound of the form
\(|2^dK_0-K_1|<X+Y\).  The primitive strict-record word

\[
(1,1,1,1,1,1,2,2,2,4)
\tag{20}
\]

has \(E=13\), \(X+Y=499\), and

\[
2^dK_0+K_1=2119,\qquad
|2^dK_0-K_1|=1257>499.
\tag{21}
\]

It passes the base factor and fails the complementary factor.

## 5. Exact exhaustive scan

The script
[cycles/noncoprime_slope_scan.js](cycles/noncoprime_slope_scan.js)
enumerates every strict-record one-strip word with first exponent one at
the noncoprime slopes through a requested odd length.  It checks
primitivity, base-factor and full-factor divisibility, the actual block
weights, exact rational valuations, and repetition among block-boundary
states.

Through \(r=20\), it checks \(8{,}521{,}422\) primitive words.  The exact
counts are:

\[
\begin{array}{c|r}
\text{property}&\text{count}\\ \hline
\text{primitive base-factor hits}&637{,}111\\
\text{primitive base-factor hits with distinct block states}&637{,}111\\
\text{primitive base-factor hits with all cycle states distinct}&637{,}111\\
\text{all base-factor hits with unequal block weights}&636{,}855\\
\text{full-determinant hits with first exponent one}&0\\
g=2\text{ base hits with }|2^dK_0-K_1|\geq X+Y&106.
\end{array}
\tag{22}
\]

The zero full-determinant count is finite evidence only.  Repetitions of
the fixed-point word \((2)\), which have first exponent two, are retained
as a separate denominator-one regression.

## 6. Conclusion

Reduction modulo \(E=2^{N/g}-3^{r/g}\) does not shorten the cycle.  Under
\(q=1\), it becomes the automatic integer identity \((8)\).  The
individual block weights remain free subject to \((3)\), and primitivity
already requires the block-boundary states to remain distinct.

Therefore the present argument does not prove
\(q=1\Longrightarrow\gcd(N,r)=1\).  A successful proof must use at least
one complementary cyclotomic factor of

\[
H=\frac{X^g-Y^g}{X-Y},
\]

or introduce a new size or ordering theorem for the scaled block-state
gaps.  The base factor alone contains no such information.
