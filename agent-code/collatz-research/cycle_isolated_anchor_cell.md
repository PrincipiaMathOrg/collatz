# One uniform anchor cell for three isolated shifts

**Mode:** SOLVE.  We isolate one of the finite Euclidean anchor cells in the
three-isolated-shift problem and prove it uniformly above the established
period barrier.

**Status:** The anchor cell \((0,L,L)\) is excluded whenever its shifted
polynomial has degree less than \(7M/4\).  A complementary direct norm
excludes the central residue box
\[
c_1\ge L/5,\qquad c_2\ge2L/5,\qquad c_3<4L/5.
\]
Both statements are uniform, not period enumerations.  The remaining anchor
cells have not yet been assembled into a complete covering theorem.

## Updating proof skeleton

1. **PROVED:** the three-isolated gate admits three exact anchors
   \(0,L,B\), with respective integer coefficients \(12,9,8\).
2. **PROVED:** in the anchor cell \((0,L,L)\), division by the unit \(3\)
   gives a seven-term polynomial with coefficient magnitudes
   \(4,3,3,4\).
3. **PROVED:** reduction against \(8X^M-9\) has an exact norm identity.  It
   does not require a conjectural Sylvester-content estimate.
4. **PROVED:** if the shifted degree \(m\) satisfies \(m<M\), then the
   resultant is nonzero and smaller than \(D\).
5. **PROVED:** if \(M\le m<7M/4\), the same conclusion follows from a sharp
   alias-energy bound.  The maximum unweighted folded energy is \(13964\).
6. **PROVED:** the original seven-coefficient resultant excludes the central
   box \(c_1\ge L/5\), \(c_2\ge2L/5\), \(c_3<4L/5\).
7. **PROVED, QUALITATIVE THRESHOLD:** for a general shifted set \(T\), the
   unit-circle coefficient energy is at most \(2|T|+1\).  Thus three shifts
   have the strict base \(\sqrt 7<3\), while four shifts already reach the
   determinant base \(3\).
8. **REMAINING:** prove that every three-isolated configuration lies in this
   cell or in one of the other finitely many anchor cells with an analogous
   norm bound.  This report alone does not exclude all three-shift words.

## 1. Setup

We retain the hypotheses of the exactly-three report.  In particular,

\[
N=\lceil r\log_2 3\rceil,\qquad
D=2^N-3^r,\qquad
B=N-r,
\]

\[
L:=r-B,\qquad M:=B-L,
\]

and the specific Bezout root satisfies

\[
3z^L=4,\qquad 8z^M=9\pmod D.                       \tag{1.1}
\]

We also use the established estimates

\[
r\ge 72{,}057{,}431{,}991,\qquad
M>\frac r6,\qquad M<\frac{171}{1000}r,              \tag{1.2}
\]

and

\[
D>3^r e^{-6.125581}r^{-13.3}.                       \tag{1.3}
\]

Let

\[
1\le c_1<c_2<c_3<B
\]

be the run-start residues of three isolated shifts.  Isolation says

\[
|c_i-c_j|\ne L\qquad(i\ne j),                       \tag{1.4}
\]

because adding one shift index adds \(B\equiv-L\pmod r\) to its residue.
The exact subset gate is

\[
(z-1)(z^{-c_1}+z^{-c_2}+z^{-c_3})=z\pmod D.        \tag{1.5}
\]

## 2. The anchor polynomial

The identities in (1.1) give

\[
z^{-c}=z^{-c},\qquad
z^{-c}=\frac34z^{L-c},\qquad
z^{-c}=\frac23z^{B-c}.                              \tag{2.1}
\]

These are the \(0,L,B\) anchors.  After multiplication by \(12\), their
coefficients are \(12,9,8\), respectively.

We now choose the anchor pattern \((0,L,L)\).  Put

\[
h:=\max(c_1,c_3-L)
\]

and define

\[
a:=h-c_1,\qquad b:=h+L-c_2,\qquad c:=h+L-c_3.       \tag{2.2}
\]

Then

\[
a,c\ge0,\qquad \min(a,c)=0,\qquad b>c.             \tag{2.3}
\]

Multiplying (1.5) by \(4z^h\) gives

\[
P(z)=0\pmod D,                                      \tag{2.4}
\]

where

\[
P(X):=(X-1)(4X^a+3X^b+3X^c)-4X^{h+1}.              \tag{2.5}
\]

The factor \(3\) removed in passing from the coefficients \(12,9,9,12\)
to (2.5) is a unit modulo \(D\).  By (1.4), the three bases \(a,b,c\) are
distinct.  Consequently, the only same-sign collision before reduction is
between the final coefficient \(-4\) and at most one of the two coefficients
\(-3\).  In particular,

\[
|[X^j]P|\le7.                                       \tag{2.6}
\]

Let

\[
m:=\deg P=\max(h,b)+1.                              \tag{2.7}
\]

The theorem in this report excludes the range

\[
\boxed{4m<7M.}                                      \tag{2.8}
\]

## 3. An exact binomial norm identity

We record the identity used below.  Let

\[
f(X):=AX^q-C,\qquad \gcd(A,C)=1,
\]

and let \(Q(X)\in\mathbf Z[X]\) have degree

\[
\deg Q=sq+d,\qquad 0\le d<q.
\]

Define the integer polynomial \(W\), of degree less than \(q\), by replacing
each \(X^{jq+u}\) in \(A^sQ\) by

\[
C^jA^{s-j}X^u.                                      \tag{3.1}
\]

If \(\alpha\) runs through the roots of \(f\), then

\[
W(\alpha)=A^sQ(\alpha).
\]

Since \(f\) has leading coefficient \(A\), we obtain the exact identity

\[
\boxed{
|\operatorname{Res}(f,Q)|
=A^d\prod_{f(\alpha)=0}|W(\alpha)|.
}                                                    \tag{3.2}
\]

Put \(\rho:=(C/A)^{1/q}\).  Parseval and the
arithmetic-geometric mean inequality now give

\[
|\operatorname{Res}(f,Q)|
\le A^d
\left(\sum_{u=0}^{q-1}|[X^u]W|^2\rho^{2u}\right)^{q/2}.
                                                               \tag{3.3}
\]

We apply this with

\[
A=8,\qquad C=9,\qquad q=M.                          \tag{3.4}
\]

The binomial \(8X^M-9\) is irreducible over \(\mathbf Q\), by the rational
binomial criterion applied to the valuation pair \((-3,2)\).

## 4. The range \(m<M\)

Suppose first that \(m<M\).  The coefficient-square sum of \(P\) is at most

\[
2(4^2+3^2+3^2)+4^2+2\cdot4\cdot3=108.              \tag{4.1}
\]

The last term allows the only possible same-sign collision.  Since

\[
\rho^{2M}=\left(\frac98\right)^2=\frac{81}{64},
\]

the weighted energy in (3.3) is less than

\[
108\cdot\frac{81}{64}<137.                          \tag{4.2}
\]

Therefore

\[
0<|\operatorname{Res}(8X^M-9,P)|
<(8\sqrt{137})^M.                                   \tag{4.3}
\]

The resultant is nonzero because \(\deg P<M\).  The certificate verifies the
exact integer inequality

\[
(64\cdot137)^{171}125^{2000}<374^{2000}.            \tag{4.4}
\]

Together with \(M<171r/1000\), this gives

\[
0<|\operatorname{Res}(8X^M-9,P)|
<\left(\frac{374}{125}\right)^r.                    \tag{4.5}
\]

## 5. The range \(M\le m<7M/4\)

Write

\[
m=M+d,\qquad 0\le d<\frac{3M}{4}.                  \tag{5.1}
\]

Let

\[
W:=8P\pmod {8X^M-9},\qquad \deg W<M.               \tag{5.2}
\]

Thus a coefficient below degree \(M\) is multiplied by \(8\), while a
coefficient above degree \(M\) is folded down and multiplied by \(9\).

We first bound the unweighted energy.  The positive derivative coefficients
have magnitudes \(4,3,3\), and the negative coefficients have magnitudes
\(4,4,3,3\), except that one \(4\) and one \(3\) may merge to give the
negative list \(4,7,3\).  Since \(m<2M\), every folded alias joins exponents
which differ by exactly \(M\).  Among the three derivative bases there is
at most one such pair.

If the coefficient \(7\) occurs and aliases with the coefficient \(4\),
there are two orientations.  They give

\[
\begin{aligned}
(8\cdot4+9\cdot7)^2+(9\cdot3)^2
&=9754,\\
(8\cdot7+9\cdot4)^2+(9\cdot3)^2
&=9193.
\end{aligned}                                       \tag{5.3}
\]

The corresponding positive aliases contribute at most \(4210\) and \(4329\),
respectively.  Every other pairing is smaller.  Hence

\[
\boxed{
\sum_{u=0}^{M-1}|[X^u]W|^2\le13964.
}                                                    \tag{5.4}
\]

This value is sharp for the coefficient geometry.

Put \(x:=\rho^2\).  We have

\[
x^M=\frac{81}{64},\qquad x<\frac{64}{63},           \tag{5.5}
\]

where the second inequality follows from \(M>128\) and Bernoulli's
inequality.

### 5.1 The lower \(d\)-strip

If

\[
d\le\frac{73M}{100},
\]

then (5.4) and (5.5) give

\[
\sum_{u=0}^{M-1}|[X^u]W|^2x^u
<13964\cdot\frac{81}{64}<17674.                     \tag{5.6}
\]

Equations (3.3) and (5.6) yield

\[
|\operatorname{Res}(8X^M-9,P)|
<8^{73M/100}17674^{M/2}.                             \tag{5.7}
\]

The exact comparison

\[
(8^{73}17674^{50})^{171}125^{100000}
<374^{100000}                                       \tag{5.8}
\]

puts (5.7) below \((374/125)^r\).

### 5.2 The upper \(d\)-strip

It remains to consider

\[
\frac{73M}{100}<d<\frac{3M}{4}.                     \tag{5.9}
\]

Here

\[
x^d<\left(\frac{81}{64}\right)^{3/4}<\frac65.      \tag{5.10}
\]

We now use the location of the aliases, rather than only their unweighted
energy.  The relations \(\min(a,c)=0\), \(m=M+d\), and (5.9) imply the
following finite alternative.  Either the unweighted energy is at most
\(11000\), or the nonzero coefficients of \(W\), up to signs which do not
affect the estimate, occur at \(0,1,u,u+1\), where
\(u\in\{d-1,d\}\), in one of the following rows:

\[
\begin{array}{c|rrrr|r}
&0&1&u&u+1&\sum w_s^2\\
\hline
1&95&59&27&27&13964\\
2&32&32&87&51&12218\\
3&59&59&63&27&11660\\
4&32&32&83&51&11538\\
5&59&59&59&27&11172\\
6&60&24&59&59&11138.
\end{array}                                         \tag{5.11}
\]

For completeness, this table is obtained by checking whether the final
coefficient \(-4\) meets a \(3\)-base, which of \(a,c\) equals zero, and
which unique pair of derivative bases differs by \(M\).  These are binary
choices, and no value of \(r\) enters the check.  If none of these choices
produces a row in (5.11), the energy is at most \(11000\).

The low-energy alternative is bounded by

\[
11000\cdot\frac{81}{64}<14325.                      \tag{5.12}
\]

For each row of (5.11), equations (5.5) and (5.10) give

\[
w_0^2+\frac{64}{63}w_1^2
+\frac65w_u^2
+\frac65\frac{64}{63}w_{u+1}^2<14325.             \tag{5.13}
\]

The six rational comparisons in (5.13) are checked individually by the
certificate.  Thus the weighted energy is always less than \(14325\) in
the upper strip.  It follows that

\[
|\operatorname{Res}(8X^M-9,P)|
<8^{3M/4}14325^{M/2}.                                \tag{5.14}
\]

The exact comparison

\[
(8^3\,14325^2)^{171}125^{4000}<374^{4000}           \tag{5.15}
\]

again puts this below \((374/125)^r\).

## 6. Nonvanishing and comparison with \(D\)

We still have to check that the resultant used above is nonzero.  In the
range \(m<M\), this follows directly from irreducibility.  In the range
\(M\le m<2M\), write

\[
P(X)=P_0(X)+X^MP_1(X),\qquad \deg P_0,\deg P_1<M.
\]

If the folded polynomial vanished, then

\[
8P_0+9P_1=0.
\]

Every coefficient of \(P_0\) would be divisible by \(9\).  This is
impossible by (2.6), unless \(P_0=P_1=0\), whereas \(P(1)=-4\).  Therefore
the resultant is nonzero.

Equations (1.1) and (2.4) show that \(D\) divides this resultant.  On the
other hand, every case above gives

\[
0<|\operatorname{Res}(8X^M-9,P)|
<\left(\frac{374}{125}\right)^r
=3^r\left(\frac{374}{375}\right)^r.                 \tag{6.1}
\]

Since

\[
\log\frac{375}{374}>\frac1{375},
\]

the period barrier gives

\[
\frac r{375}>6.125581+13.3\log r.                  \tag{6.2}
\]

Indeed, the left side minus \(7+14\log r\) is increasing for \(r>5250\),
and at the endpoint in (1.2) we may use \(\log r<26\).  Equations
(1.3), (6.1), and (6.2) give

\[
0<|\operatorname{Res}(8X^M-9,P)|<D,
\]

which contradicts divisibility by \(D\).  We have proved

\[
\boxed{
\begin{gathered}
\text{No three-isolated denominator-one candidate lies in the anchor cell}\\
(0,L,L)\text{ when }4\max(h,b)+4<7M,\text{ equivalently }4m<7M.
\end{gathered}
}                                                    \tag{6.3}
\]

Here \(h,a,b,c,m\) are defined in (2.2) and (2.7).  In a regression audit
at \(r=151\), this one cell contains \(54{,}825\) of the \(107{,}500\)
admissible isolated triples.  This count is diagnostic and is not used in
the proof.

## 7. A central direct-norm cell

We now return to the original seven-coefficient polynomial.  Put

\[
H(X):=(X-1)
\left(X^{c_3-c_1}+X^{c_3-c_2}+1\right)-X^{c_3+1}.
                                                               \tag{7.1}
\]

Equation (1.5) gives \(H(z)=0\pmod D\), and hence

\[
D\mid\operatorname{Res}(X^r-2,H).                   \tag{7.2}
\]

The resultant is nonzero because \(X^r-2\) is irreducible and
\(\deg H=c_3+1<B+1<r\).  Put

\[
\sigma:=2^{1/r},\qquad x:=\sigma^2.
\]

Fourier orthogonality gives the location-sensitive estimate

\[
\begin{split}
|\operatorname{Res}(X^r-2,H)|^{2/r}
&\le x^{c_3+1}\\
&\quad +(1+x)
\left(x^{c_3-c_1}+x^{c_3-c_2}+1\right).
\end{split}                                          \tag{7.3}
\]

Any collision among the seven displayed monomials has opposite signs and
therefore only decreases the right side.

Assume now that

\[
c_1\ge\frac L5,\qquad
c_2\ge\frac{2L}{5},\qquad
c_3<\frac{4L}{5}.                                   \tag{7.4}
\]

Since \(L<5r/12\), these inequalities give

\[
\frac{2(c_3+1)}r<\frac23+\frac2r,\qquad
\frac{2(c_3-c_1)}r<\frac12,\qquad
\frac{2(c_3-c_2)}r<\frac13.                         \tag{7.5}
\]

The period barrier is larger than \(3{,}000{,}000\).  Bernoulli's inequality
therefore gives

\[
x<\frac{1{,}000{,}001}{1{,}000{,}000}.              \tag{7.6}
\]

We also have the exact rational bounds

\[
2^{2/3}<\frac{397}{250},\qquad
2^{1/2}<\frac{283}{200},\qquad
2^{1/3}<\frac{63}{50}.                              \tag{7.7}
\]

Substitution in (7.3) gives

\[
\begin{split}
|\operatorname{Res}(X^r-2,H)|^{2/r}
&<
\frac{397}{250}\frac{1{,}000{,}001}{1{,}000{,}000}\\
&\quad+
\frac{2{,}000{,}001}{1{,}000{,}000}
\left(\frac{283}{200}+\frac{63}{50}+1\right)\\
&<
\left(\frac{374}{125}\right)^2.
\end{split}                                          \tag{7.8}
\]

The last comparison is exact and is included in the certificate.  We
conclude, as in Section 6, that

\[
0<|\operatorname{Res}(X^r-2,H)|
<\left(\frac{374}{125}\right)^r<D,
\]

contradicting (7.2).  Therefore

\[
\boxed{
\text{No three-isolated denominator-one candidate satisfies (7.4).}
}                                                     \tag{7.9}
\]

This box contains the central configuration
\((c_1,c_2,c_3)\approx(L/4,L/2,3L/4)\), which is the worst configuration for
the elementary anchor-span covering.

## 8. Why the argument stops at four shifts

For a nonempty shifted set \(T\), put

\[
H_T(X):=(X-1)\sum_{c\in T}X^{c_*-c}-X^{c_*+1},
\qquad c_*:=\max T.                                 \tag{8.1}
\]

The positive exponents in the first term are distinct, as are the negative
exponents.  Every overlap between the two families has opposite sign and
cancels.  The final exponent \(c_*+1\) is new.  Therefore

\[
\boxed{\|H_T\|_2^2\le2|T|+1.}                       \tag{8.2}
\]

For \(|T|=3\), equation (8.2) gives the strict unit-circle base
\(\sqrt7<3\).  For \(|T|=4\), it gives only \(\sqrt9=3\).  In other words,
the sparse norm has no margin before the root radius is moved outside the
unit circle.  This is the precise reason that the finite three-shift anchor
analysis does not automatically extend to arbitrary shifted sets.

## 9. Certificate and remaining cells

The script
[cycles/isolated_anchor_cell_certificate.js](cycles/isolated_anchor_cell_certificate.js)
checks every exact integer comparison in Sections 4 to 6, all six rows of
(5.11), and a regression scan of the alias classification at \(r=151\).
Its terminal line is

    isolated_anchor_cell_certificate_passed=true

The theorem is uniform in \(r\) above the barrier.  The remaining task is a
finite geometric covering statement: one must select among the other anchor
patterns in \(\{0,L,B\}^3\) and prove an analogue of (2.8) or a sharper norm
bound in each residual cell.  No assertion about those cells is made here.
