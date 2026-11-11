# Two mixed-boundary anchor cells for three isolated shifts

**Mode:** SOLVE.  We treat two of the mixed-boundary families left outside
the uniform \((0,L,L)\) cell.

**Status:** Two additional anchor cells are excluded uniformly above the
established period barrier.  The first contains every triple with
\(c_3-c_2\ge L+2\), including the residual example
\((r;c_1,c_2,c_3)=(503;1,3,265)\).  The second is a neighborhood of the
three anchor points \((L,L,B)\).  These cells do not cover all three
isolated configurations.

## Updating proof skeleton

1. **PROVED:** any anchored polynomial of degree less than \(M\) and
   coefficient \(\ell^1\)-norm at most \(K\) has resultant less than
   \((9K)^M\) against \(8X^M-9\).
2. **PROVED:** the \((0,0,B)\) anchor has \(K\le19\).  It excludes the
   entire gap cell \(c_3-c_2\ge L+2\).
3. **PROVED:** the \((L,L,B)\) anchor has \(K\le64\).  It excludes every
   triple satisfying the explicit degree condition in (4.5).
4. **CERTIFIED REGRESSION:** at \(r=503\), the two cells contain
   \(98{,}770\) and \(614{,}125\) isolated residue triples, respectively.
5. **REMAINING:** combine these cells with the \((0,L,L)\) theorem and
   prove a covering statement for the residue triples not yet captured.

## 1. Setup

We retain

\[
N=\lceil r\log_2 3\rceil,\qquad
D=2^N-3^r,\qquad
B=N-r,
\]

and

\[
L:=r-B,\qquad M:=B-L.
\]

The specific Bezout root satisfies

\[
3z^L=4,\qquad 8z^M=9\pmod D.                       \tag{1.1}
\]

We use the established estimates

\[
r\ge72{,}057{,}431{,}991,\qquad
M<\frac{171}{1000}r,                               \tag{1.2}
\]

and

\[
D>3^r e^{-6.125581}r^{-13.3}.                       \tag{1.3}
\]

For three shifted residues \(1\le c_1<c_2<c_3<B\), the exact gate is

\[
(z-1)(z^{-c_1}+z^{-c_2}+z^{-c_3})=z\pmod D.        \tag{1.4}
\]

## 2. A short-degree norm lemma

Let \(P\in\mathbf Z[X]\) be nonzero, let

\[
m:=\deg P<M,
\qquad
\|P\|_1:=\sum_j |[X^j]P|\le K,
\]

and suppose that \(P(z)=0\pmod D\).  Put

\[
f(X):=8X^M-9,
\qquad
\rho:=\left(\frac98\right)^{1/M}.
\]

The binomial \(f\) is irreducible over \(\mathbf Q\), since the nonzero
valuation pair of \(9/8\) is \((2,-3)\).  Thus
\(\operatorname{Res}(f,P)\ne0\).  Parseval and the
arithmetic-geometric mean inequality give

\[
\begin{aligned}
|\operatorname{Res}(f,P)|
&=8^m\prod_{f(\alpha)=0}|P(\alpha)|\\
&\le 8^m
\left(\sum_j |[X^j]P|^2\rho^{2j}\right)^{M/2}\\
&<8^M\left(\frac{81}{64}K^2\right)^{M/2}
=(9K)^M.                                           \tag{2.1}
\end{aligned}
\]

The exact integer comparisons

\[
171^{171}125^{1000}<374^{1000},
\qquad
576^{171}125^{1000}<374^{1000}                    \tag{2.2}
\]

show that the right side of (2.1) is less than
\((374/125)^r\) for \(K=19\) and for \(K=64\).
The period barrier gives

\[
\left(\frac{374}{125}\right)^r
=3^r\left(\frac{374}{375}\right)^r<D.             \tag{2.3}
\]

On the other hand, (1.1) and \(P(z)=0\) imply that \(D\) divides the
resultant.  This is a contradiction.  We will apply this lemma twice.

## 3. The \((0,0,B)\) cell

Use the anchors

\[
12z^{-c_1}=12z^{-c_1},\qquad
12z^{-c_2}=12z^{-c_2},\qquad
12z^{-c_3}=8z^{B-c_3}.
\]

After division by the unit \(4\) and multiplication by \(z^{c_2}\),
equation (1.4) becomes

\[
P_{00B}(z)=0\pmod D,                                \tag{3.1}
\]

where

\[
P_{00B}(X):=(X-1)(3X^x+3+2X^y)-3X^{c_2+1},        \tag{3.2}
\]

\[
x:=c_2-c_1,
\qquad
y:=c_2+B-c_3.                                      \tag{3.3}
\]

We have \(0<x<y\) and \(y\ge c_2+1\).  Consequently,

\[
\deg P_{00B}=y+1,
\qquad
\|P_{00B}\|_1\le19.                               \tag{3.4}
\]

The degree condition \(y+1<M\) is equivalent to

\[
c_3-c_2\ge L+2.                                    \tag{3.5}
\]

The short-degree lemma with \(K=19\) now proves

\[
\boxed{
c_3-c_2\ge L+2
\quad\Longrightarrow\quad
\text{the three-shift gate cannot hold modulo }D.
}                                                   \tag{3.6}
\]

For the diagnostic residual triple

\[
r=503,\quad B=295,\quad L=208,\quad M=87,
\quad(c_1,c_2,c_3)=(1,3,265),
\]

we obtain \(x=2\), \(y=33\), and \(\deg P_{00B}=34<M\).

## 4. The \((L,L,B)\) cell

The three anchored coefficients are now \(9,9,8\).  Put

\[
h:=\max(0,c_2-L),                                  \tag{4.1}
\]

and

\[
a:=h+L-c_1,\qquad
b:=h+L-c_2,\qquad
c:=h+B-c_3.                                        \tag{4.2}
\]

Then \(a>b\ge0\) and \(c\ge h+1\).  Multiplication of (1.4) by
\(12z^h\) gives

\[
P_{LLB}(z)=0\pmod D,                                \tag{4.3}
\]

where

\[
P_{LLB}(X):=(X-1)(9X^a+9X^b+8X^c)-12X^{h+1}.       \tag{4.4}
\]

In particular,

\[
\deg P_{LLB}=1+\max(a,c),
\qquad
\|P_{LLB}\|_1\le64.                               \tag{4.5}
\]

The short-degree lemma with \(K=64\) proves

\[
\boxed{
1+\max\{h+L-c_1,\ h+B-c_3\}<M
\quad\Longrightarrow\quad
\text{the three-shift gate cannot hold modulo }D.
}                                                   \tag{4.6}
\]

For example, at \(r=503\), the triple \((200,205,290)\) has
\(h=0\), \(a=8\), \(c=5\), and \(\deg P_{LLB}=9<M\).

## Conclusion

The two mixed-boundary families above reduce to polynomials of degree less
than the second Euclidean remainder \(M\).  Their coefficient norms are
small enough that the elementary \(M\)-resultant is already below the
determinant.  This removes the large-second-gap family completely and a
second neighborhood centered at \((L,L,B)\).  The remaining task is a
finite covering problem among the anchor cells, not a proof of all
three-isolated configurations.

