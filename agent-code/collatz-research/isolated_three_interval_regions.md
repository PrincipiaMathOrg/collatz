# Exact normalized regions for three isolated shifts

**Mode:** SOLVE.  We begin an exact interval cover of the normalized residue
simplex.  The purpose of this note is to replace period-by-period evidence
with regions whose inequalities are uniform in \(r\).

**Status:** We prove a central \(X^r-2\) norm region, the union of all
27 short-degree anchor regions, and a generic folded estimate with a
rigorous endpoint nonvanishing test.  An exact rational interval certificate
closes most, but not all, of the normalized simplex.  A stable positive-volume
residual cell is recorded explicitly.

## Updating proof skeleton

1. **PROVED:** the central region in (2.1) is excluded by a rational
   coefficient-energy bound strictly below \((374/125)^2\).
2. **PROVED:** every anchor pattern in \(\{0,L,B\}^3\) has primitive
   coefficient \(\ell^1\)-norm at most \(70\).
3. **PROVED:** for each of the 27 patterns, support width less than \(M\)
   excludes the corresponding candidate uniformly.
4. **PROVED:** a support-independent folded estimate applies to every one
   of the 27 anchors whenever a constant or leading endpoint certifies
   nonvanishing.
5. **CERTIFIED:** a grid-100 rational interval cover closes 34,283 of
   35,990 real simplex boxes.  This is a continuum cover, not a period
   sample.
6. **CERTIFIED RESIDUAL:** 1,707 boxes remain.  A width-\(1/100\) residual
   box and all eight of its width-\(1/200\) children survive, so refinement
   alone does not complete this family of estimates.
7. **REMAINING:** sharpen folded coefficient geometry in the residual cell,
   or pass to the next Euclidean remainders \(E,F\).

## 1. Setup

Retain

\[
N=\lceil r\log_2 3\rceil,\quad
D=2^N-3^r,\quad B=N-r,\quad L=r-B,\quad M=B-L.
\]

The specific root satisfies

\[
z^r=2,\qquad 3z^L=4,\qquad 8z^M=9\pmod D.          \tag{1.1}
\]

We use

\[
r\ge72{,}057{,}431{,}991,qquad
D>3^r e^{-6.125581}r^{-13.3}.                       \tag{1.2}
\]

The established comparison

\[
\left(\frac{374}{125}\right)^r<D                  \tag{1.3}
\]

will be used throughout.

## 2. A central normalized region

Put

\[
a:=c_3-c_1,\qquad b:=c_3-c_2,
\]

and assume

\[
\boxed{
100a\le23r,\qquad
100b\le13r,\qquad
100c_3\le33r.
}                                                   \tag{2.1}
\]

The cleared subset polynomial is

\[
H(X):=(X-1)(X^a+X^b+1)-X^{c_3+1}.                 \tag{2.2}
\]

The positive derivative exponents are distinct, as are the negative
derivative exponents.  Every overlap between these two groups has opposite
sign, and therefore only decreases the weighted coefficient energy.  Let
\(\eta:=2^{1/r}\).  Since \(r>128\), Bernoulli's inequality gives

\[
\eta^2<\frac{64}{63}.                              \tag{2.3}
\]

At the roots \(\eta\zeta\) of \(X^r-2\), Parseval gives the upper bound

\[
\begin{aligned}
Q
&\le(1+\eta^2)(1+\eta^{2a}+\eta^{2b})
   +\eta^{2(c_3+1)}\\
&<\frac{64}{63}
\left(2+2\cdot2^{23/50}+2\cdot2^{13/50}+2^{33/50}\right).  \tag{2.4}
\end{aligned}
\]

The exact rational estimates

\[
2^{23/50}<\frac{69}{50},\qquad
2^{13/50}<\frac65,\qquad
2^{33/50}<\frac85                              \tag{2.5}
\]

give

\[
Q<\frac{64\cdot438}{63\cdot50}
<\left(\frac{374}{125}\right)^2.                  \tag{2.6}
\]

The polynomial \(X^r-2\) is Eisenstein at \(2\), and
\(\deg H<r\), so the resultant is nonzero.  The arithmetic-geometric mean
inequality now gives

\[
0<|\operatorname{Res}(X^r-2,H)|
\le Q^{r/2}<\left(\frac{374}{125}\right)^r<D.      \tag{2.7}
\]

This contradicts divisibility by \(D\).  Thus the whole region (2.1) is
excluded.  In particular, it contains a neighborhood of the geometric
point \((c_1,c_2,c_3)=(L/4,L/2,3L/4)\).

## 3. All short-degree anchor regions

For \(q\in\{0,L,B\}\), define

\[
k(q):=
\begin{cases}
12,&q=0,\\
9,&q=L,\\
8,&q=B.
\end{cases}                                        \tag{3.1}
\]

Choose \(\mathbf q=(q_1,q_2,q_3)\in\{0,L,B\}^3\), and put

\[
e_i:=q_i-c_i.
\]

The anchored gate is

\[
(z-1)\sum_{i=1}^3 k(q_i)z^{e_i}-12z=0\pmod D.     \tag{3.2}
\]

Let

\[
u:=\min(e_1,e_2,e_3,1),\qquad
v:=\max(e_1+1,e_2+1,e_3+1,1),                     \tag{3.3}
\]

and divide (3.2) by the unit monomial \(z^u\).  The resulting polynomial
has degree at most

\[
w_{\mathbf q}:=v-u.                                \tag{3.4}
\]

Let

\[
g_{\mathbf q}:=\gcd(12,k(q_1),k(q_2),k(q_3)).      \tag{3.5}
\]

Division by \(g_{\mathbf q}\) is valid modulo \(D\), since
\(\gcd(D,6)=1\).  The primitive polynomial has

\[
\|P_{\mathbf q}\|_1
\le K_{\mathbf q}:=
\frac{2\sum_i k(q_i)+12}{g_{\mathbf q}}\le70.     \tag{3.6}
\]

Suppose that

\[
\boxed{w_{\mathbf q}<M}                            \tag{3.7}
\]

for at least one anchor pattern.  The short-degree norm lemma gives

\[
0<|\operatorname{Res}(8X^M-9,P_{\mathbf q})|
<(9K_{\mathbf q})^M\le630^M.                       \tag{3.8}
\]

To compare this with (1.3), use
\(\log_2 3<317/200\).  Since \(N<317r/200+1\),

\[
100M<17r+200.                                      \tag{3.9}
\]

The three exact integer inequalities

\[
100\cdot374^{100}>
101\cdot630^{17}125^{100},
\quad
101^{100}>2\cdot100^{100},
\quad
2^{10}>630                                         \tag{3.10}
\]

and \(r>200{,}000\) imply

\[
630^M<\left(\frac{374}{125}\right)^r.             \tag{3.11}
\]

Therefore every cell (3.7) is excluded.  Conditions (3.3) and (3.7) are
maxima and minima of affine functions in \((c_1,c_2,c_3,L,B,M)\).  Thus
their 27-cell union is directly suitable for exact rational interval
arithmetic.

## 4. A generic folded estimate for all 27 anchors

Fix an anchor pattern and divide its polynomial by the unit content
\(g_{\mathbf q}\) in (3.5).  Write its degree as

\[
m=sM+d,\qquad 0\le d<M.
\]

Reduction against \(8X^M-9\) sends a coefficient in the \(j\)-th strip to
a coefficient multiplied by \(9^j8^{s-j}\).  Since \(9>8\), the folded
polynomial \(W\) satisfies

\[
\|W\|_1\le K_{\mathbf q}9^s.                       \tag{4.1}
\]

Put \(\rho=(9/8)^{1/M}\).  The exact binomial norm identity and
\(\rho^{2M}=81/64\) give

\[
\begin{aligned}
|\operatorname{Res}(8X^M-9,P_{\mathbf q})|
&\le 8^d
 \left(\sum_{u=0}^{M-1}|[X^u]W|^2\rho^{2u}\right)^{M/2}\\
&<8^d\left(\frac{81}{64}K_{\mathbf q}^2 9^{2s}\right)^{M/2}. \tag{4.2}
\end{aligned}
\]

No content of \(W\) is divided out in (4.2).  This point matters because a
factor 2 in the folded content need not be removable from a resultant whose
first leading coefficient is 8.

The certificate uses the following elementary nonvanishing test.  After the
Laurent polynomial is shifted to start in degree zero, a unique lowest base
has constant coefficient \(-a\).  If \(9\nmid a\), the polynomial cannot be
divisible by \(8X^M-9\).  Dually, a unique highest shifted base has leading
coefficient \(a\).  If \(8\nmid a\), divisibility is again impossible.  The
uniqueness comparisons are made with outward interval endpoints.

In normalized variables, put \(\mu=M/r\), \(\delta=d/r\), and let
\(\omega\) be an interval upper bound for \(m/r\).  From (4.2),

\[
\frac1r\log|\operatorname{Res}|
<\delta\log8+mu
 \left(\log K_{\mathbf q}+s\log9+\log\frac98\right). \tag{4.3}
\]

If \(\mu_-\le\mu\le\mu_+\), then, for every feasible strip number \(s\),

\[
0\le\delta\le\min(\mu_+,\omega-s\mu_-).           \tag{4.4}
\]

Checking (4.3) for all
\(0\le s\le\lfloor\omega/\mu_-\rfloor\) therefore closes a whole box.
The verifier brackets every logarithm by the positive series

\[
\log y=2\sum_{j\ge0}\frac{t^{2j+1}}{2j+1},
\qquad t=\frac{y-1}{y+1},                           \tag{4.5}
\]

after exact power-of-two range reduction.  It rounds the lower and upper
brackets outwards to denominator \(10^{12}\).  Thus floating point is not
used in any closing decision.

## 5. Exact interval cover and residual cell

Let a rational box prescribe intervals for \(c_i/r\).  The ceiling error
in \(N\) gives rational intervals of width at most \(1/r\) for
\(B/r,L/r,M/r\).  Above the period barrier, the verifier uses

\[
\frac{31}{53}<\frac Br<\frac{585000001}{10^9},
\quad
\frac{414999999}{10^9}<\frac Lr<\frac{22}{53},
\quad
\frac9{53}<\frac Mr<\frac{170000002}{10^9}.        \tag{5.1}
\]

It closes a box by one of four tests:

1. the direct \(X^r-2\) coefficient energy;
2. one of the 27 short-degree anchor conditions in (3.7);
3. the sharp \((0,L,L)\) theorem \(4m<7M\);
4. the generic all-anchor estimate (4.3).

On the grid of side \(1/100\), the exact sequential counts are

\[
\begin{array}{c|r}
\text{test}&\text{boxes first closed}\
\hline
X^r-2\text{ norm}&12{,}593\\
\text{short anchor}&11{,}457\\
(0,L,L)\text{ sharp fold}&6{,}276\\
\text{generic 27-anchor fold}&3{,}957\\
\text{residual}&1{,}707
\end{array}                                        \tag{5.2}
\]

The total is 35,990.  Every row represents a rational box of real normalized
coordinates, not a sampled value of \(r\).

There is a robust residual around

\[
\frac{c_1}{r}\simeq0.175,qquad
\frac{c_2}{r}\simeq0.275,qquad
\frac{c_3}{r}\simeq0.465.                          \tag{5.3}
\]

For example, the child box

\[
\boxed{
\frac{17}{100}\le x_1\le\frac7{40},\quad
\frac{27}{100}\le x_2\le\frac{11}{40},\quad
\frac{23}{50}\le x_3\le\frac{93}{200}}
                                                               \tag{5.4}
\]

fails all four tests with the following exact positive deficits:

\[
\begin{array}{c|c}
X^r-2\text{ energy}&
73061538965114519/125000000000000000\\
\text{short-anchor width}&
39900000053/530000000000\\
(0,L,L)\text{ linear test}&
12150000053/132500000000\\
\text{best generic log test }(0,0,L)&
18608132056771200893/265000000000000000000
\end{array}                                        \tag{5.5}
\]

All eight side-\(1/200\) children of the side-\(1/100\) parent box survive.
Thus this is a genuine positive-volume residual for the present inequalities,
not a single fold boundary produced by coarse meshing.

## Conclusion

The strict margin \(\sqrt7<3\) controls the central region, while short and
one-fold anchor norms control most of the boundary.  The exact cover now
shows both the strength and the limit of this mechanism.  It closes more
than 95 percent of the grid-100 continuum boxes, but a stable mixed interior
cell survives.  The next step must use sharper located alias geometry in
that cell, or a genuinely new reduction through \(E\) or \(F\); uniform
subdivision by itself cannot finish the proof.
