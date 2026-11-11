# Exactly three lower Christoffel shifts

**Mode:** SOLVE.  We attack the next coprime two-level gate,
\(|T|=3\), after the one-shift and two-shift exclusions.

**Status:** A block of three consecutive shifted indices is excluded
completely.  The proof uses three successive Euclidean power relations of
the specific Bezout root.  The remaining run types are \(2+1\) and
\(1+1+1\).  An exact finite audit through \(r=30\) finds no
full-determinant carry, but a primitive denominator-\(233\) rational
countermodel shows that a three-shift congruence can vanish modulo a proper
factor.

## Updating proof skeleton

1. **PROVED:** exactly three shifted indices have run type \(3\), \(2+1\),
   or \(1+1+1\).
2. **PROVED:** a run of three has only the internal Christoffel-gap patterns
   \(12\) and \(21\).
3. **PROVED:** the two patterns give the exact trinomials
   \[
   9z^{c+1}=23(z-1)
   \quad\hbox{and}\quad
   9z^{c+1}=29(z-1),
   \]
   respectively.
4. **PROVED:** neither trinomial can hold modulo \(D\).  Resultants against
   the Euclidean binomials at exponents \(M,E,F\) are nonzero and smaller
   than \(D\).
5. **PROVED, COUNTERMODEL:** the primitive strict-record word
   \((1,1,2,1,3,1,1,3)\) has three isolated shifts and carry gcd \(7\) with
   \(D=1631\).
6. **CERTIFIED FINITE AUDIT:** through \(r=30\), all \(3744\) admissible
   exactly-three patterns have \(D\nmid C\).
7. **REMAINING:** exclude the \(2+1\) and \(1+1+1\) run types.

## 1. Setup and the Euclidean power ladder

Retain the notation and hypotheses of the lower two-level branch in the
two-level report.  Thus the candidate is a nontrivial least-state,
strict-record denominator-one candidate with deformation levels in
\(\{0,1\}\); the shifted set is \(T=\{j:m_j=1\}\), and here
\(|T|=3\).  Assume also the coprime case

\[
N=\lceil r\log_2 3\rceil,\qquad
D=2^N-3^r,\qquad
B=N-r,
\]

with \(\gcd(N,r)=1\).  The specific Bezout unit satisfies

\[
z^r=2,\qquad 2z^B=3\pmod D.                           \tag{1.1}
\]

Define the next three positive Euclidean remainders

\[
\begin{aligned}
L&:=r-B=2r-N,\\
M&:=B-L=2N-3r,\\
E&:=L-2M=8r-5N,\\
F&:=M-2E=12N-19r.
\end{aligned}                                         \tag{1.2}
\]

The established period barrier is

\[
r\ge72{,}057{,}431{,}991>3^{16}.                     \tag{1.3}
\]

The rational bounds

\[
\frac{19}{12}<\log_2 3<\frac{317}{200}
\]

follow from \(2^{19}<3^{12}\) and \(3^{200}<2^{317}\).  Together with
(1.3), they imply

\[
0<F,\qquad 0<E,\qquad
M>\frac r6,\qquad
E>\frac{3r}{40}-5,\qquad
F>\frac r{53},
\qquad
M<\frac{171r}{1000},\qquad
F<\frac{21r}{1000},\qquad
E<\frac r{12}.                                       \tag{1.4}
\]

Two further exact comparisons will organize the later case split:

\[
M<3E,\qquad E<4F.                                    \tag{1.5}
\]

For the first, use \(N<317r/200+1\) in
\(3E-M=27r-17N\).  For the second, use
\(2^{84}<3^{53}\), hence \(N/r>\log_2 3>84/53\), in
\(4F-E=53N-84r\).

In particular, \(M,E,F>128\).  Bernoulli's inequality then puts the square
of each root radius used below below \(64/63\).

Equations (1.1) now give

\[
\boxed{
3z^L=4,\qquad
8z^M=9,\qquad
243z^E=256,\qquad
2^{19}z^F=3^{12}
\pmod D.
}                                                       \tag{1.6}
\]

These are not auxiliary roots.  They are identities for the same specific
Bezout root \(z\).

The binomials in (1.6) are irreducible over \(\mathbf Q\).  For example,
\(X^M-9/8\), \(X^E-256/243\), and
\(X^F-3^{12}/2^{19}\) satisfy the rational-binomial irreducibility
criterion because the pairs of nonzero valuations are
\((-3,2)\), \((8,-5)\), and \((12,-19)\), each with gcd \(1\).

## 2. Why only the gap patterns \(12\) and \(21\) occur

Let the three shifted indices be \(s,s+1,s+2\), and put

\[
c=[sN]_r.
\]

The first shift starts a run, so the preceding Christoffel gap is two and

\[
1\le c<B.                                             \tag{2.1}
\]

Adding one index adds \(B\) to the residue modulo \(r\).  The next
Christoffel gap is one exactly when the current residue is below

\[
L=r-B.
\]

Since \(B<2L\), a residue below \(L\) moves to \(c+B>L\), forcing the
following gap to be two.  A residue at least \(L\) wraps to \(c-L<L\),
forcing the following gap to be one.  Thus the only internal patterns are

\[
12\quad\hbox{and}\quad21.                             \tag{2.2}
\]

Along an internal gap of one, the next inverse spectral monomial is
\(2/3\) times the preceding one.  Along a gap of two, it is \(4/3\) times
the preceding one.  Therefore the three-term subset sums are

\[
\begin{array}{c|c}
\text{pattern}&\displaystyle\sum_{j\in T}z^{-c_j}\\[4pt]
\hline
12&\displaystyle
z^{-c}\left(1+\frac23+\frac89\right)
=\frac{23}{9}z^{-c},\\[8pt]
21&\displaystyle
z^{-c}\left(1+\frac43+\frac89\right)
=\frac{29}{9}z^{-c}.
\end{array}                                           \tag{2.3}
\]

The exact subset gate

\[
(z-1)\sum_{j\in T}z^{-c_j}=z\pmod D
\]

becomes

\[
\boxed{
\begin{aligned}
12:&\quad 9z^{c+1}-23z+23=0,\\
21:&\quad 9z^{c+1}-29z+29=0
\end{aligned}
\pmod D.
}                                                       \tag{2.4}
\]

## 3. Exclusion of the pattern \(21\)

Here \(L\le c<B\).  Put

\[
h:=c-L+1,\qquad 1\le h\le M.
\]

Using \(3z^L=4\), the second line of (2.4) reduces to

\[
12z^h-29z+29=0\pmod D.                                \tag{3.1}
\]

If \(h<M\), (1.6) and (3.1) imply

\[
D\mid R_h:=
\operatorname{Res}(8X^M-9,12X^h-29X+29).             \tag{3.2}
\]

The resultant is nonzero by the irreducibility in Section 1.  Let

\[
\tau=(9/8)^{1/M}.
\]

Parseval on the roots \(\tau\zeta\) of \(8X^M-9\), followed by the
arithmetic-geometric mean inequality, gives

\[
|R_h|^{2/M}
\le
8^{2h/M}
\left(144\tau^{2h}+841\tau^2+841\right).
                                                               \tag{3.3}
\]

Since
\(\tau^{2h}<(9/8)^2\) and \(\tau^2<64/63\),

\[
0<|R_h|<347^M.                                       \tag{3.5}
\]

If \(h=M\), equation (3.1) and \(8z^M=9\) instead give
\(58z=85\).  The corresponding linear resultant is bounded by

\[
0<
\left|\operatorname{Res}(8X^M-9,58X-85)\right|
<8\cdot104^M.                                        \tag{3.6}
\]

The exact certificate

\[
347^{171}4^{1000}<11^{1000}
\]

and (1.4) imply that both (3.5) and (3.6) are smaller than
\(8(11/4)^r\).

## 4. Exclusion of the pattern \(12\)

Here \(1\le c<L\).  Put

\[
k:=c+1,\qquad 2\le k\le L.
\]

The first line of (2.4) is

\[
9z^k-23z+23=0\pmod D.                                \tag{4.1}
\]

### 4.1 The range \(k<M\) and the endpoint \(k=M\)

For \(k<M\), take the resultant of (4.1) with \(8X^M-9\).  As in Section 3,

\[
0<
\left|\operatorname{Res}(8X^M-9,9X^k-23X+23)\right|
<274^M.                                               \tag{4.2}
\]

Indeed, after squaring the geometric-mean bound, the base is less than

\[
64\left(\frac{6561}{64}
       +529\frac{64}{63}+529\right)<274^2.
\]

At \(k=M\), equations (4.1) and \(8z^M=9\) give \(184z=265\).  Hence

\[
0<
\left|\operatorname{Res}(8X^M-9,184X-265)\right|
<8\cdot324^M.                                        \tag{4.3}
\]

The exact comparisons

\[
274^{171}3^{1000}<8^{1000},
\qquad
324^{171}5^{1000}<14^{1000}
\]

put both (4.2) and (4.3) below \(8(14/5)^r\).

### 4.2 Reduction from \(M\) to \(E\)

Assume \(k>M\), and write

\[
h:=k-M,\qquad 1\le h\le M+E.
\]

Using \(8z^M=9\), equation (4.1) becomes

\[
81z^h-184z+184=0\pmod D.                             \tag{4.4}
\]

By \(M<3E\), write

\[
h=qE+u,\qquad q\in\{0,1,2,3\},\qquad 0\le u<E.       \tag{4.5}
\]

For \(q=0\), the exponent \(u=h\) is positive.  Taking the resultant of

\[
81X^u-184X+184
\]

with \(243X^E-256\) gives a nonzero integer of absolute value less than

\[
67000^E.                                              \tag{4.6}
\]

For \(q=1\), divide (4.4) by the unit factor forced by
\(243z^E=256\).  A unit-equivalent integer polynomial is

\[
256X^u-552X+552.                                     \tag{4.7}
\]

If \(u>0\), its resultant with \(243X^E-256\) is less than
\(202000^E\).  If \(u=0\), it is a linear resultant and is less than
\(243\cdot982^E\).  These follow from Parseval and

\[
\begin{aligned}
81^2\left(\frac{256}{243}\right)^2
184^2\left(1+\frac{64}{63}\right)&<275^2,\\
256^2\left(\frac{256}{243}\right)^2
552^2\left(1+\frac{64}{63}\right)&<829^2.
\end{aligned}                                        \tag{4.8}
\]

The exact integer comparisons

\[
67000\cdot3^{12}<8^{12},
\qquad
202000\cdot5^{12}<14^{12},
\qquad
982\cdot5^{12}<14^{12}
\]

and \(E<r/12\) put all these resultants below
\(243(14/5)^r\).

### 4.3 Reduction from \(E\) to \(F\)

For \(q=2\), equation (4.4) reduces to

\[
8192z^u-16767z+16767=0\pmod D.                        \tag{4.9}
\]

Since \(E<4F\), write

\[
u=q'F+w,\qquad q'\in\{0,1,2,3\},\qquad 0\le w<F.
\]

Using \(2^{19}z^F=3^{12}\) and removing powers of \(2\) and \(3\), which
are units modulo \(D\), gives

\[
A_{q'}z^w-B_{q'}z+B_{q'}=0\pmod D,                   \tag{4.10}
\]

where

\[
\begin{array}{c|c|c}
q'&A_{q'}&B_{q'}\\
\hline
0&2^{13}&23\cdot3^6\\
1&3^6&23\cdot2^6\\
2&3^{18}&23\cdot2^{25}\\
3&3^{30}&23\cdot2^{44}.
\end{array}                                           \tag{4.11}
\]

For each row, irreducibility of \(2^{19}X^F-3^{12}\) makes the resultant
nonzero.  A uniform root-norm bound is

\[
0<|R_{q'}|<
\left(2^{20}(A_{q'}+B_{q'})\right)^F.                 \tag{4.12}
\]

The certificate verifies, for all four rows,

\[
\left(2^{20}(A_{q'}+B_{q'})\right)^{21}5^{1000}
<14^{1000}.                                          \tag{4.13}
\]

Since \(F<21r/1000\), equations (4.12) and (4.13) put these resultants below
\((14/5)^r\).

For \(q=3\), equation (4.4) reduces directly to

\[
2^{21}z^u-23\cdot3^{11}z+23\cdot3^{11}=0\pmod D.     \tag{4.14}
\]

Here

\[
0\le u=h-3E\le M-2E=F.
\]

If \(u<F\), irreducibility makes the resultant with
\(2^{19}X^F-3^{12}\) nonzero as before.  At the endpoint \(u=F\),
subtracting four times that binomial from the polynomial in (4.14) leaves

\[
3^{11}(35-23X).
\]

Thus the resultant is nonzero there as well: a common complex root would
be rational, whereas \(2^{19}X^F-3^{12}\) is irreducible of degree
\(F>1\).  In both cases the same \(F\)-resultant estimate gives

\[
0<|R_3|<
\left(2^{20}(2^{21}+23\cdot3^{11})\right)^F
<\left(\frac{14}{5}\right)^r.                        \tag{4.15}
\]

## 5. Comparison with the determinant

Every resultant in Sections 3 and 4 is therefore a nonzero integer of
absolute value less than

\[
243\left(\frac{14}{5}\right)^r.                      \tag{5.1}
\]

The established logarithmic-form estimate is

\[
D>3^r e^{-6.125581}r^{-13.3}.                         \tag{5.2}
\]

Since \(\log(15/14)>1/15\), the period barrier (1.3) gives

\[
r\log(15/14)>
\log243+6.125581+13.3\log r.
\]

Thus the quantity in (5.1) is strictly smaller than \(D\).  This
contradicts divisibility by \(D\) in every case, and proves

\[
\boxed{
\begin{gathered}
\text{No such coprime denominator-one two-level candidate has its three}\\
\text{shifted indices in one consecutive run.}
\end{gathered}
}                                                       \tag{5.3}
\]

## 6. The two remaining run types

For a run of two with start residue \(c\), and an isolated shift with
run-start residue \(e\), the exact gate is

\[
(z-1)\left(Az^{-c}+3z^{-e}\right)=3z\pmod D,          \tag{6.1}
\]

where

\[
A=
\begin{cases}
5,&\text{the internal pair gap is }1,\\
7,&\text{the internal pair gap is }2.
\end{cases}
\]

Both \(c\) and \(e\) are landing residues of run starts and hence lie in
\([1,B-1]\).  Equation (6.1), together with the ladder (1.6), is the exact
\(2+1\) target.

For three isolated shifts, all three residues \(c_1,c_2,c_3\) lie in
\([1,B-1]\), and

\[
(z-1)\left(z^{-c_1}+z^{-c_2}+z^{-c_3}\right)=z
\pmod D.                                               \tag{6.2}
\]

After clearing the largest negative exponent, its polynomial has at most
seven nonzero coefficients, all equal to \(1\) or \(-1\).  Its
unit-circle \(L^2\) base is at most \(\sqrt7<3\), but the radial factor from
the roots of \(X^r-2\) is not yet controlled uniformly.  Thus (6.2), not the
single-run case, is the sharp remaining three-shift obstruction.

## 7. Proper-factor countermodel and certificate

The primitive strict-record word

\[
a=(1,1,2,1,3,1,1,3)
\]

has

\[
r=8,\qquad N=13,\qquad T=\{2,4,7\},
\]

with three isolated shifted indices.  Its exact data are

\[
D=1631,\qquad C=11641,\qquad \gcd(D,C)=7.             \tag{7.1}
\]

The corresponding rational cycle has denominator \(233\) and numerator
states

\[
(1663,2611,4033,3083,4741,1807,2827,4357).            \tag{7.2}
\]

All valuations are exact and the first state is least.

The exact certificate
[cycles/three_shift_probe.js](cycles/three_shift_probe.js) checks the
power-ladder identities, every integer comparison used in the resultant
bounds, the run-\(3\) normal forms, the rational countermodel, and every
admissible exactly-three deformation through \(r=30\).  Its finite totals
are

\[
\begin{array}{c|r|r}
\text{run type}&\text{admissible}&\text{proper carry factors}\\
\hline
1+1+1&2381&128\\
2+1&1234&68\\
3&129&9.
\end{array}
\]

No finite case has \(D\mid C\).

## Conclusion

The specific-root power ladder removes the entire consecutive three-shift
family.  The first two rungs \(L,M\) are not sufficient by themselves in
the middle exponent range; the next two Euclidean remainders \(E,F\) make
the determinant norm exponentially smaller than \(D\).  Exactly three
shifts are not yet excluded in full.  The remaining targets are the
two-run equation (6.1) and the three-isolated equation (6.2).
