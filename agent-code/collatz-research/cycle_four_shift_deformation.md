# Four lower Christoffel shifts

**Mode:** SOLVE.  We attack the exact four-shift threshold in the coprime
two-level strict-record branch.

**Status:** The consecutive run-\(4\) sector is excluded completely.  The
proof uses the next Euclidean remainder

\[
G:=E-3F=65r-41N,
\qquad
3^{41}z^G=2^{65}\pmod D.
\]

The remaining run types are \(3+1\), \(2+2\), \(2+1+1\), and
\(1+1+1+1\).  The uncompressed four-monomial gate has coefficient energy
exactly \(9\), so the support-independent norm has no margin at this
threshold.

## Updating proof skeleton

1. **PROVED:** exactly four shifted indices have run type
   \(4\), \(3+1\), \(2+2\), \(2+1+1\), or \(1+1+1+1\).
2. **PROVED:** a run of four has only the internal Christoffel-gap words
   \(121\), \(122\), and \(212\).
3. **PROVED:** these three words give the exact trinomials
   
   \[
   27z^{c+1}=A(z-1),
   \qquad
   A=85,101,119,
   \]
   
   respectively.
4. **PROVED:** every such trinomial is impossible modulo the full
   determinant.  The \(F\)-resultant closes quotient branches \(0,1,2\).
   Quotient branch \(3\) has residual exponent below \(G\), where a
   \(3\)-adic Sylvester-content gain closes the remaining cases.
5. **PROVED, COUNTERMODEL:** a primitive strict-record run-\(4\) word at
   \((r,N)=(17,27)\) has carry gcd \(5\) with \(D\).  Thus the compressed
   congruence can vanish modulo a proper determinant factor.
6. **CERTIFIED FINITE AUDIT:** through \(r=30\), all \(13{,}086\)
   path-admissible exactly-four deformations have \(D\nmid C\).
7. **REMAINING:** exclude the four multi-run types listed in item 1.

## 1. The four-shift polynomial and the run ledger

Retain

\[
N=\lceil r\log_2 3\rceil,
\qquad
D=2^N-3^r,
\qquad
B=N-r,
\qquad
\gcd(N,r)=1.
\]

The specific Bezout unit satisfies

\[
z^r=2,
\qquad
2z^B=3\pmod D.
\]

Let \(T\) be the set of four indices at deformation level \(1\), and put

\[
c_j:=[jN]_r,
\qquad
c_*:=\max_{j\in T}c_j.
\]

The exact subset gate is

\[
(z-1)\sum_{j\in T}z^{-c_j}=z\pmod D.                 \tag{1.1}
\]

After clearing the negative exponents, we obtain

\[
\boxed{
H_T(X):=(X-1)\sum_{j\in T}X^{c_*-c_j}-X^{c_*+1},
\qquad
H_T(z)=0\pmod D.
}                                                     \tag{1.2}
\]

If \(c_*+1=r\), we reduce the last monomial by \(X^r=2\).  Before
aliases or cancellations, (1.2) has four positive derivative terms, four
negative derivative terms, and one final negative term.  Its coefficient
energy is therefore

\[
4+4+1=9.                                             \tag{1.3}
\]

In other words, the baseline root norm is \(\sqrt9=3\), exactly the
determinant base.  This explains why the isolated-three interval proof does
not extend formally to four shifts.

Partitioning four ordered indices into maximal consecutive blocks gives
exactly

\[
4,\qquad 3+1,\qquad 2+2,\qquad 2+1+1,\qquad
1+1+1+1.                                             \tag{1.4}
\]

For later use, the compression ledger for a single run is

\[
\begin{array}{c|c|c}
\text{run length}&\text{internal gap word}&
\text{coefficient of }z^{-c}\\
\hline
1&\varnothing&1\\
2&1,2&5/3,\ 7/3\\
3&12,21&23/9,\ 29/9\\
4&121,122,212&85/27,\ 101/27,\ 119/27.
\end{array}                                          \tag{1.5}
\]

Indeed, moving across an internal gap of one multiplies the inverse
spectral monomial by \(2/3\), while moving across a gap of two multiplies it
by \(4/3\).  For example,

\[
1+\frac23+\frac89+\frac{16}{27}=\frac{85}{27}.
\]

The other two entries follow in the same way.

Thus the five run types have the following exact grouped gates.  In every
row, \(c,e,f,g\) denote the corresponding run-start residues.

\[
\begin{array}{c|c}
\text{run type}&\text{grouped gate}\\
\hline
4&(z-1)Az^{-c}=27z,\quad A\in\{85,101,119\}\\
3+1&(z-1)(Az^{-c}+9z^{-e})=9z,\quad A\in\{23,29\}\\
2+2&(z-1)(Az^{-c}+A'z^{-e})=3z,\quad A,A'\in\{5,7\}\\
2+1+1&(z-1)(Az^{-c}+3z^{-e}+3z^{-f})=3z,
       \quad A\in\{5,7\}\\
1+1+1+1&(z-1)(z^{-c}+z^{-e}+z^{-f}+z^{-g})=z.
\end{array}                                          \tag{1.6}
\]

Every run-start residue lies in \([1,B-1]\).  For a run of two, its
coefficient is \(5\) when its internal gap is one and \(7\) when its
internal gap is two.  The run of three has coefficient \(23\) for the word
\(12\) and \(29\) for the word \(21\).  Since multiplication by \(N\)
permutes the residue classes modulo \(r\), distinct run starts have distinct
residues.  Clearing the largest negative exponent in any row of (1.6)
gives its exact integer subset polynomial.

## 2. The three run-\(4\) words

Let the shifted indices be \(s,s+1,s+2,s+3\), and put

\[
c:=[sN]_r,
\qquad
L:=r-B.
\]

Since the first shift begins a run, its preceding Christoffel gap is two.
Thus

\[
1\le c<B.                                            \tag{2.1}
\]

At a residue \(x\), the next internal gap is one when \(x<L\), and it is
two when \(x\ge L\).  In the first case the next residue is \(x+B\); in the
second case it is \(x-L\).  Applying this transition three times gives

\[
\begin{array}{c|c|c}
\text{residue range}&\text{gap word}&A\\
\hline
1\le c<L-M&121&85\\
L-M\le c<L&122&101\\
L\le c<B&212&119,
\end{array}                                          \tag{2.2}
\]

where \(M:=B-L\).  By (1.5), equation (1.1) becomes

\[
\boxed{
27z^k-Az+A=0\pmod D,
\qquad
k:=c+1,
\qquad
2\le k\le B.
}                                                     \tag{2.3}
\]

We now exclude all three values of \(A\) uniformly.

## 3. One further Euclidean rung

Recall the three remainders used in the exactly-three analysis,

\[
M:=2N-3r,
\qquad
E:=8r-5N,
\qquad
F:=12N-19r.
\]

Define

\[
G:=E-3F=65r-41N.                                    \tag{3.1}
\]

The specific root satisfies the ladder

\[
\boxed{
8z^M=9,
\qquad
243z^E=256,
\qquad
2^{19}z^F=3^{12},
\qquad
3^{41}z^G=2^{65}
}\pmod D.                                            \tag{3.2}
\]

The last identity follows by dividing the \(E\)-identity by the cube of
the \(F\)-identity.  The valuation vectors \((12,-19)\) and
\((-41,65)\) are primitive, so the corresponding \(F\)- and \(G\)-binomials
are irreducible over \(\mathbf Q\).

The rational estimates already used in the cycle ledger give

\[
B=3M+E,
\qquad
M<3E,
\qquad
E<4F.                                                \tag{3.3}
\]

Moreover, \(2^{84}<3^{53}\) gives

\[
G<\frac r{53},                                       \tag{3.4}
\]

while \(3^{200}<2^{317}\) gives

\[
G>\frac{3r}{200}-41.                                \tag{3.5}
\]

The preceding Euclidean-ladder estimates also give

\[
\frac r{53}<F<\frac{21r}{1000}.                     \tag{3.6}
\]

Thus \(F,G>128\) above the established period barrier.

Use (3.3) to write uniquely

\[
\begin{aligned}
k&=qM+h,       &&q\in\{0,1,2,3\},&0\le h<M,\\
h&=aE+u,       &&a\in\{0,1,2\},&0\le u<E,\\
u&=bF+w,       &&b\in\{0,1,2,3\},&0\le w<F.
\end{aligned}                                       \tag{3.7}
\]

If \(b=3\), then \(w<G\) by (3.1).

Applying the first three relations in (3.2) to (2.3) gives

\[
C_{\rm raw}z^w-Q_{\rm raw}z+Q_{\rm raw}=0\pmod D,  \tag{3.8}
\]

where

\[
\begin{aligned}
C_{\rm raw}&:=3^{3+2q+12b}2^{8a},\\
Q_{\rm raw}&:=A2^{3q+19b}3^{5a}.
\end{aligned}                                       \tag{3.9}
\]

Put

\[
g:=\gcd(C_{\rm raw},Q_{\rm raw}),
\qquad
C:=\frac{C_{\rm raw}}g,
\qquad
Q:=\frac{Q_{\rm raw}}g.                            \tag{3.10}
\]

Every prime divisor of \(g\) is \(2\) or \(3\).  Since \(\gcd(D,6)=1\),
we may divide (3.8) by \(g\).

## 4. The quotient branches \(b=0,1,2\)

Assume first that \(b\le2\), and put

\[
R:=\operatorname{Res}
\left(2^{19}X^F-3^{12},CX^w-QX+Q\right).            \tag{4.1}
\]

The second polynomial has degree less than \(F\) and is nonzero.  The
irreducibility in Section 3 therefore gives \(R\ne0\).  Both polynomials
vanish at \(z\pmod D\), so

\[
D\mid R.                                             \tag{4.2}
\]

Parseval on the roots of the \(F\)-binomial, followed by the
arithmetic-geometric mean inequality, gives the uniform labeled-term bound

\[
0<|R|<\left(2^{20}(C+Q)\right)^F.                   \tag{4.3}
\]

This also covers \(w=0,1\), where terms merge.  In those two cases, direct
collection of the coefficients still puts the weighted coefficient-square
sum below \(4(C+Q)^2\).  The root-radius comparisons used in (4.3) reduce
to \(3^{24}<2^{39}\) and \(F>128\).

There are

\[
3\cdot4\cdot3\cdot3=108
\]

coefficient branches.  The exact certificate verifies for every one of
them that, with \(K:=2^{20}(C+Q)\),

\[
K^{21}100^{1000}<299^{1000}.                        \tag{4.4}
\]

Since \(F<21r/1000\), equations (4.3) and (4.4) give

\[
0<|R|<\left(\frac{299}{100}\right)^r.               \tag{4.5}
\]

## 5. The quotient branch \(b=3\)

Suppose now that \(b=3\).  Then \(0\le w<G\), and we use

\[
R_G:=\operatorname{Res}
\left(3^{41}X^G-2^{65},CX^w-QX+Q\right).            \tag{5.1}
\]

As before, \(R_G\ne0\) and \(D\mid R_G\).  From (3.9) and (3.10),

\[
v_3(C)=39+2q-5a,
\qquad
3\nmid Q.                                            \tag{5.2}
\]

Put

\[
s:=\min(41,v_3(C)).                                  \tag{5.3}
\]

Here \(29\le s\le41\).

We use the following elementary Sylvester-content observation.  If
\(m\mid A_0,C_0\), then

\[
m^{w-1}\mid
\operatorname{Res}
\left(A_0X^n-B_0,C_0X^w-Q_0X+Q_0\right)             \tag{5.4}
\]

for \(1\le w<n\).  Indeed, form the Sylvester matrix with its coefficient
columns ordered by descending degree.  Every entry in each of the first
\(w-1\) columns is either \(0\), \(A_0\), or \(C_0\).  We may therefore
factor \(m\) from each of these columns, which proves (5.4).  Note that
coprimality with \(B_0Q_0\) is not needed for this divisibility statement.

Apply (5.4) with \(m=3^s\).  With the exponent interpreted as zero when
\(w=0\), the nonzero integer

\[
S_G:=\frac{R_G}{3^{s\max(w-1,0)}}                   \tag{5.5}
\]

is integral.  In the present application, (5.2) also gives
\(\gcd(3^s,2^{65}Q)=1\).  Since \(3\nmid D\), the extracted power of \(3\)
may be removed without losing the full-determinant divisibility:

\[
D\mid S_G.                                           \tag{5.6}
\]

There are no missing endpoint cases.  If \(w=0\), then the second
polynomial in (5.1) is \(-QX+(C+Q)\), which has degree one.  If \(w=1\),
it is \((C-Q)X+Q\), which has degree at most one.  In both cases we make
no content division, and the leading-coefficient factor in the resultant
is at most \(3^{41}\).

Let

\[
\rho:=\left(\frac{2^{65}}{3^{41}}\right)^{1/G}.
\]

Since \(w<G\), the exact comparison

\[
\rho^{2w}
<\frac{2^{130}}{3^{82}}
<\frac{65}{63}
<2
\]

and \(G>128\) bound all radial weights occurring below.  For \(w\ge2\),
the root-product formula and (5.5) give

\[
|S_G|
=3^s3^{(41-s)w}
\prod_{\alpha^G=2^{65}/3^{41}}
|C\alpha^w-Q\alpha+Q|.
\]

Parseval and the arithmetic-geometric mean inequality put the product
below \([2(C+Q)]^G\).  Since \(w<G\), the same conclusion holds for the
two degree-one endpoints described above, and we obtain

\[
0<|S_G|<3^sK_G^G,
\qquad
K_G:=3^{41-s}2(C+Q).                                \tag{5.7}
\]

The certificate checks all \(36\) branches and verifies

\[
K_G5^{53}<14^{53}.                                  \tag{5.8}
\]

Using \(G<r/53\), we obtain

\[
0<|S_G|<3^{41}\left(\frac{14}{5}\right)^r
<\left(\frac{299}{100}\right)^r.                   \tag{5.9}
\]

The final comparison follows from the exact integer inequality

\[
299^{1000}>3^{41}280^{1000}
\]

and \(r>1000\).

## 6. Comparison with the determinant

The established logarithmic-form estimate is

\[
D>3^r e^{-6.125581}r^{-13.3}.                       \tag{6.1}
\]

Since

\[
\log\frac{300}{299}>\frac1{300},
\]

the period barrier gives

\[
\frac r{300}>6.125581+13.3\log r.                  \tag{6.2}
\]

For an exact endpoint check, use

\[
\left(\frac{19}{7}\right)^{26}
>72{,}057{,}431{,}991,
\qquad
72{,}057{,}431{,}991>300\cdot352.                   \tag{6.3}
\]

Here \(19/7<e\), so \(\log r<26\) at the left endpoint.  Moreover,

\[
6.125581+13.3\cdot26<352.
\]

The difference between the two sides of (6.2) is increasing for
\(r>3990\).  Equations (6.1) and (6.2) therefore give

\[
\left(\frac{299}{100}\right)^r<D.                  \tag{6.4}
\]

Equations (4.2), (4.5), and (6.4) are contradictory in the branches
\(b\le2\).  Equations (5.6), (5.9), and (6.4) are contradictory in the
branch \(b=3\).  We have proved

\[
\boxed{
\begin{gathered}
\text{No coprime denominator-one two-level candidate has exactly four}\\
\text{shifted indices in one consecutive run.}
\end{gathered}
}                                                     \tag{6.5}
\]

## 7. Proper-factor countermodel

The primitive strict-record word

\[
(1,2,1,1,1,2,2,2,2,1,2,2,1,2,1,2,2)
\]

has

\[
r=17,
\qquad
N=27,
\qquad
T=\{4,5,6,7\}.
\]

Its exact arithmetic data are

\[
D=5{,}077{,}565,
\qquad
C=484{,}824{,}815,
\qquad
\gcd(D,C)=5.                                        \tag{7.1}
\]

The corresponding rational cycle has denominator \(1{,}015{,}513\) and
numerator states

\[
\begin{split}
(&96{,}964{,}963,145{,}955{,}201,109{,}720{,}279,
165{,}088{,}175,248{,}140{,}019,\\
&372{,}717{,}785,279{,}792{,}217,210{,}098{,}041,
157{,}827{,}409,118{,}624{,}435,\\
&178{,}444{,}409,134{,}087{,}185,100{,}819{,}267,
151{,}736{,}657,114{,}056{,}371,\\
&171{,}592{,}313,128{,}948{,}113).
\end{split}                                         \tag{7.2}
\]

All valuations are exact, and the first state is least.  Thus even the
run-\(4\) trinomial may vanish modulo a proper factor of \(D\).  Full-modulus
control is essential.

## 8. Certificate and finite ledger

The exact certificate
[cycles/four_shift_run_certificate.js](cycles/four_shift_run_certificate.js)
checks all \(108\) \(F\)-branches, all \(36\) \(G\)-branches, every integer
comparison above, the power ladder, the three compressed normal forms, and
every path-admissible four-shift deformation through \(r=30\).

Its finite ledger is

\[
\begin{array}{c|r|r}
\text{run type}&\text{admissible}&\text{proper carry factors}\\
\hline
4&115&10\\
3+1&1148&63\\
2+2&523&24\\
2+1+1&5765&281\\
1+1+1+1&5535&228.
\end{array}                                          \tag{8.1}
\]

No finite case has \(D\mid C\).  The run-\(4\) internal words occur with
counts

\[
121:31,
\qquad
122:42,
\qquad
212:42.
\]

The terminal line is

    four_shift_run_certificate_passed=true

The certificate verifies the finite branch arithmetic, the exact integer
comparisons, and the bounded deformation audit.  The general Sylvester
column factorization, binomial irreducibility, Parseval estimate, and
determinant lower-bound argument are proved above; they are not replaced by
finite sampling.

## Conclusion

Four isolated shifts reach the exact norm barrier, but run compression
creates a trinomial whose exponent can be followed through the Euclidean
ladder.  The first three rungs close every branch except the terminal
\(F\)-quotient \(3\).  That quotient is not an obstruction: it forces the
residual exponent below \(G=E-3F\), where a \(3\)-adic content gain closes
the entire consecutive run-\(4\) sector.  The remaining four-shift problem
is exactly the union of the four multi-run types in (1.4).
