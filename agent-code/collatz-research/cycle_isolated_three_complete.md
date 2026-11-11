# Complete exclusion of the three-isolated sector

**Mode:** SOLVE.  We close the full three-isolated integrality gate by a
finite exact interval cover over ten anchored Euclidean reductions.

**Status:** Under the established coprime denominator-one two-level
hypotheses, no three distinct residues in \([0,B)\) satisfy the
three-monomial gate.  This excludes three isolated shifted sites and,
after ungrouping the pair coefficient, every \(2+1\) sector with internal
gap two.  The cover is uniform for every period above the proven period
barrier.  The last gap-one \(2+1\) sector is closed separately in
[cycle_two_plus_one_complete.md](cycle_two_plus_one_complete.md).  Neither
report is a proof of the Collatz conjecture.

## Updating proof skeleton

1. **PROVED:** every monotone choice of anchors in \(\{0,L,B\}\) gives an
   exact integer polynomial vanishing at the specific Bezout root.
2. **PROVED:** whenever the anchored span is less than \(2M\), its full
   \(M\)-folded resultant admits the sign-separated alias bound (4.8).
   No folded content is removed.
3. **PROVED:** the folded polynomial is nonzero, uniformly over all ten
   anchor patterns.
4. **EXACT FINITE COVER:** \(3576\) rational boxes cover the full
   normalized gap simplex.  Every box selects an anchor pattern whose
   resultant is strictly less than \((374/125)^r\).
5. **PROVED:** the three-monomial gate has no solution at three distinct
   residues in \([0,B)\).  In particular, the three-isolated sector is
   empty.
6. **PROVED:** every \(2+1\) sector with internal gap two reduces to the
   same three-monomial gate and is empty.
7. **CLOSED IN THE COMPANION REPORT:** internal gap one with the isolated
   residue above the pair residue.  Consequently the suite now excludes
   every exactly-three run type.

## 1. Setup and theorem

The inherited hypotheses are that the candidate is nontrivial,
least-state, strict-record, and denominator one, its deformation levels
lie in \(\{0,1\}\), exactly three levels equal one, and
\(\gcd(N,r)=1\).  Retain

\[
N=\lceil r\log_2 3\rceil,
\qquad
D=2^N-3^r,
\qquad
B=N-r,
\]

and the Euclidean dimensions

\[
L=r-B,
\qquad
M=B-L.
\]

The specific Bezout root satisfies

\[
2z^B=3,
\qquad
3z^L=4,
\qquad
8z^M=9
\pmod D.                                           \tag{1.1}
\]

We use the previously proved estimates

\[
r\ge R:=72{,}057{,}431{,}991,
\qquad
\frac16<\frac Mr<\frac{171}{1000},                \tag{1.2}
\]

and

\[
D>3^r e^{-6.125581}r^{-13.3}.                     \tag{1.3}
\]

For three isolated shifts there are distinct integers

\[
1\le c_1<c_2<c_3<B
\]

for which the exact gate is

\[
(z-1)(z^{-c_1}+z^{-c_2}+z^{-c_3})=z\pmod D.       \tag{1.4}
\]

We prove the slightly stronger statement below.  Allowing the lower
endpoint \(c_1=0\) will be useful for the gap-two corollary.

\[
\boxed{
\begin{gathered}
\text{No three distinct integers }0\le c_1<c_2<c_3<B\\
\text{satisfy the three-monomial gate (1.4).}
\end{gathered}}
                                                               \tag{1.5}
\]

The isolation inequalities are not used after (1.4) has been obtained.

## 2. The ten monotone anchor polynomials

Put

\[
q_0:=0,
\qquad q_1:=L,
\qquad q_2:=B,
\]

and

\[
\kappa_0:=12,
\qquad \kappa_1:=9,
\qquad \kappa_2:=8.
\]

Equation (1.1) gives the three exact representations

\[
12z^{-c}=\kappa_j z^{q_j-c}\pmod D,
\qquad j\in\{0,1,2\}.                              \tag{2.1}
\]

Choose a monotone anchor word

\[
\boldsymbol a=(a_1,a_2,a_3),
\qquad 0\le a_1\le a_2\le a_3\le2.                \tag{2.2}
\]

There are exactly ten such words.  Set

\[
t_i:=q_{a_i}-c_i,
\qquad
h:=-\min(0,t_1,t_2,t_3),                           \tag{2.3}
\]

and

\[
g:=\gcd(12,\kappa_{a_1},\kappa_{a_2},\kappa_{a_3}).
                                                               \tag{2.4}
\]

Since \(D\) is coprime to \(6\), it is coprime to \(g\).  Multiplying
(1.4) by \(12z^h\), using (2.1), and dividing by \(g\) gives

\[
P_{\boldsymbol a}(z)=0\pmod D,                    \tag{2.5}
\]

where

\[
P_{\boldsymbol a}(X)
:=\frac1g\left\{
(X-1)\sum_{i=1}^3\kappa_{a_i}X^{h+t_i}
-12X^{h+1}
\right\}.                                         \tag{2.6}
\]

All exponents in (2.6) are nonnegative.  Moreover,

\[
P_{\boldsymbol a}(1)=-\frac{12}{g}\ne0.           \tag{2.7}
\]

Define the nominal degree

\[
m^\sharp
:=\max(0,t_1,t_2,t_3)-\min(0,t_1,t_2,t_3)+1.       \tag{2.8}
\]

Then

\[
\deg P_{\boldsymbol a}\le m^\sharp.               \tag{2.9}
\]

We retain the nominal degree because cancellation of a top coefficient
can only improve the resultant bound.

## 3. Normalized gap coordinates

Introduce the four endpoint gaps

\[
d_0:=c_1,
\quad
d_1:=c_2-c_1,
\quad
d_2:=c_3-c_2,
\quad
d_3:=B-c_3.                                       \tag{3.1}
\]

Here \(d_0\ge0\), while \(d_1,d_2,d_3>0\), and

\[
d_0+d_1+d_2+d_3=B.                                \tag{3.2}
\]

Normalize by \(M\):

\[
y_i:=\frac{d_i}{M},
\qquad
\ell:=\frac LM,
\qquad
\eta:=\frac1M.                                    \tag{3.3}
\]

The identities \(B=L+M\) and \(r=2L+M\), together with (1.2), give

\[
\frac{829}{342}<\ell<\frac52,
\qquad
0<\eta<\frac1{10^{10}},                            \tag{3.4}
\]

and

\[
y_0\ge0,\qquad y_1,y_2,y_3>0,
\qquad
y_0+y_1+y_2+y_3=\ell+1<\frac72.                   \tag{3.5}
\]

Thus the full parameter region is contained in

\[
\mathcal B_0
:=\left[\frac{829}{342},\frac52\right]
\times\left[0,\frac72\right]^3,                   \tag{3.6}
\]

where the displayed three gap intervals correspond to
\(y_0,y_1,y_2\).  A box is empty if its lower gap sum is larger than its
upper value of \(\ell+1\).

For a fixed anchor word, the normalized errors \(t_i/M\) are affine
functions of \(\ell,y_0,y_1,y_2\).  In particular, rational interval
arithmetic gives rigorous lower and upper bounds for

\[
s:=\frac{m^\sharp-1}{M}
=\max\left(0,\frac{t_1}{M},\frac{t_2}{M},\frac{t_3}{M}\right)
-\min\left(0,\frac{t_1}{M},\frac{t_2}{M},\frac{t_3}{M}\right).  \tag{3.7}
\]

The exact cover will select an anchor word for which

\[
s+\eta<2.                                          \tag{3.8}
\]

Consequently, if

\[
m^\sharp=QM+d,
\qquad 0\le d<M,                                   \tag{3.9}
\]

then \(Q\in\{0,1\}\).

## 4. Full folding and the alias bound

Let

\[
F(X):=8X^M-9,
\qquad
\rho:=\left(\frac98\right)^{1/M}.                  \tag{4.1}
\]

For \(P=P_{\boldsymbol a}\), define the full folded polynomial

\[
W(X):=8^Q P(X)\pmod{F(X)},
\qquad \deg W<M.                                   \tag{4.2}
\]

Thus a labeled term \(uX^{jM+v}\), with \(0\le v<M\), contributes

\[
u\,9^j8^{Q-j}X^v                                   \tag{4.3}
\]

to \(W\).  We make no content division after (4.2).

The seven labeled terms of \(P\) consist of three positive derivative
terms, three negative derivative terms, and the negative final term.
For each residue \(v\), let \(A_v^+\) and \(A_v^-\) be the sums of the
absolute folded amplitudes of the positive and negative labeled terms at
that residue.  The actual coefficient \(w_v\) satisfies

\[
w_v^2=(A_v^+-A_v^-)^2
\le (A_v^+)^2+(A_v^-)^2.                           \tag{4.4}
\]

This is the reason that possible aliases may be treated separately by
sign.  If \(\alpha_j\) are upper bounds for the seven folded amplitudes,
put

\[
U:=\sum_j\alpha_j^2
+2\sum_{\substack{i<j\\
\text{same sign}\\
\text{alias possible}}}\alpha_i\alpha_j.           \tag{4.5}
\]

Then

\[
\sum_{v=0}^{M-1}w_v^2\le U.                        \tag{4.6}
\]

The phrase "alias possible" in (4.5) is checked without sampling.  Two
derivative terms of the same sign may alias only if the interval for
\((t_i-t_j)/M\) contains an integer.  A negative derivative term and the
negative final term may alias only if the interval for
\(t_i/M-\eta\) contains an integer.  The certificate includes the cross
term whenever the corresponding exact rational interval contains any
integer.  This may overcount incompatible aliases, which is harmless.

If \(Q=1\), a term whose shifted exponent is certainly below \(M\) has
folding factor \(8\).  Every other term is assigned the larger factor
\(9\).  If \(Q=0\), the factor is \(1\).  Hence every \(\alpha_j\) in
(4.5) is an integer and is a rigorous upper bound throughout its box.

At the \(M\) roots of \(F\), Parseval and the arithmetic-geometric mean
inequality give

\[
\begin{aligned}
|\operatorname{Res}(F,P)|
&\le 8^d
\left(\sum_{v=0}^{M-1}w_v^2\rho^{2v}\right)^{M/2}\\
&<8^d\left(\frac{81}{64}U\right)^{M/2}.            \tag{4.7}
\end{aligned}
\]

The first inequality remains valid if the actual degree of \(P\) is
smaller than \(m^\sharp\).  Indeed,
\(W(\alpha)=8^QP(\alpha)\) at every root of \(F\), while the leading
coefficient factor in the resultant is then at most \(8^d\).

For later reference, the complete bound is

\[
\boxed{
0<|\operatorname{Res}(8X^M-9,P)|
<8^d\left(\frac{81}{64}U\right)^{M/2}.
}                                                   \tag{4.8}
\]

Its nonvanishing is proved next.

## 5. Uniform nonvanishing

The binomial \(F=8X^M-9\) is irreducible over \(\mathbf Q\).  Indeed, the
valuation vector of \(9/8\) is primitive, so \(9/8\) is not a proper
\(p\)-th power for any prime \(p\mid M\).  The exceptional binomial clause
when \(4\mid M\) would require a negative element of
\(-4\mathbf Q^4\), and therefore cannot occur for the positive number
\(9/8\).

If \(Q=0\), then \(\deg P<M=\deg F\), and (2.7) shows that \(P\ne0\).
Thus the resultant is nonzero.

Suppose \(Q=1\), and write

\[
P(X)=P_0(X)+X^M P_1(X),
\qquad
\deg P_0,\deg P_1<M.                               \tag{5.1}
\]

Put

\[
f_0:=\frac{12}{g},
\qquad
s_i:=\frac{\kappa_{a_i}}{g}.                       \tag{5.2}
\]

If \(W=8P_0+9P_1\) vanished, evaluation at \(1\), together with
\(P(1)=-f_0\), would give

\[
P_1(1)=8f_0.                                       \tag{5.3}
\]

On the other hand, a derivative pair contributes zero to \(P_1(1)\)
unless it crosses the boundary between exponents \(M-1\) and \(M\).  A
crossing pair contributes \(s_i\), while the final term contributes either
\(0\) or \(-f_0\).  Therefore

\[
P_1(1)\le s_1+s_2+s_3\le3f_0<8f_0,                \tag{5.4}
\]

contradicting (5.3).  Hence \(W\ne0\), \(F\nmid P\), and irreducibility
again gives a nonzero resultant.  This proof does not use any folded gcd.

## 6. Exact rational interval cover

The script
[cycles/isolated_interval_cover_certificate.js](cycles/isolated_interval_cover_certificate.js)
implements the following deterministic cover.

1. Start with the rational box \(\mathcal B_0\) in (3.6).
2. Discard a box only when its lower value of \(y_0+y_1+y_2\) is larger
   than its upper value of \(\ell+1\).
3. Test the ten words in lexicographic order.  For each word, compute
   outward rational intervals for the four errors, their minimum, their
   maximum, and the span \(s\).
4. Retain every possible quotient \(Q\in\{0,1\}\).  Bound all folding
   bands and all possible same-sign aliases as in Section 4.
5. Put

   \[
   A:=\left\lceil100\frac dM\right\rceil.           \tag{6.1}
   \]

   The box passes this quotient branch only if the exact integer
   comparison

   \[
   8^{342A}(81U)^{17100}125^{200000}
   <64^{17100}374^{200000}                          \tag{6.2}
   \]

   holds.
6. A word certifies a box only when every possible quotient branch passes.
   If no word passes, bisect the widest gap interval, treating the
   \(\ell\)-width with weight \(4\), and repeat.

There is no floating-point operation in this procedure.  All endpoints,
span bounds, band tests, alias tests, midpoint subdivisions, ceiling
operations, and comparisons in (6.2) use reduced BigInt rationals.

To see why (6.2) is the required comparison, note that

\[
\frac dM\le\frac A{100},
\qquad
\frac Mr<\frac{171}{1000}.                         \tag{6.3}
\]

Writing \(K=81U/64\), equation (6.2) is exactly

\[
8^{171A/100000}K^{171/2000}<\frac{374}{125}.        \tag{6.4}
\]

Equations (4.8), (6.3), and (6.4) imply

\[
0<|\operatorname{Res}(F,P)|
<\left(\frac{374}{125}\right)^r.                   \tag{6.5}
\]

The exact cover terminates with

\[
\begin{array}{c|r}
\text{interval nodes visited}&8417\\
\text{infeasible boxes discarded}&633\\
\text{boxes certified}&3576\\
\text{maximum branch depth}&27\\
\text{residual boxes}&0.
\end{array}                                        \tag{6.6}
\]

The script also verifies the full-binary partition identity

\[
8417=2(633+3576)-1,                                \tag{6.7}
\]

as well as every individual anchor-word count.  These assertions detect
any accidental change in the subdivision or acceptance logic.

Every one of the ten anchor words occurs in the resulting cover.  The
terminal line of the certificate is

    isolated_interval_cover_certificate_passed=true

## 7. Comparison with the determinant

Since \(F(z)=P(z)=0\pmod D\), the Sylvester identity gives

\[
D\mid\operatorname{Res}(F,P).                     \tag{7.1}
\]

It remains to compare (6.5) with \(D\).  We have

\[
\left(\frac{374}{125}\right)^r
=3^r\left(\frac{374}{375}\right)^r.                \tag{7.2}
\]

The elementary inequality

\[
\log\frac{375}{374}>\frac1{375}                    \tag{7.3}
\]

and the period barrier imply

\[
\frac r{375}>6.125581+13.3\log r.                 \tag{7.4}
\]

For an exact endpoint check, the certificate verifies

\[
\left(\frac{19}{7}\right)^{26}>R,
\qquad
R>375\cdot371.                                     \tag{7.5}
\]

Thus \(\log R<26\), inequality (7.4) holds at \(R\), and its left side
minus its right side is increasing for \(r>5250\).  Equations (1.3) and
(7.2) to (7.4) give

\[
0<|\operatorname{Res}(F,P)|<D,                    \tag{7.6}
\]

contradicting (7.1).  This proves (1.5).

## 8. The internal-gap-two \(2+1\) corollary

For a \(2+1\) pattern with internal gap two, the exact grouped gate is

\[
(z-1)(7z^{-c}+3z^{-e})=3z\pmod D,
\qquad L\le c<B,                                   \tag{8.1}
\]

where \(e\in[1,B-1]\) is the isolated run-start residue.  Equation (1.1)
gives

\[
7z^{-c}
=3z^{-c}+3z^{-(c-L)}.                              \tag{8.2}
\]

After substituting (8.2) into (8.1) and dividing by \(3\), we obtain

\[
(z-1)(z^{-(c-L)}+z^{-c}+z^{-e})=z\pmod D.          \tag{8.3}
\]

The pair residues \(c-L\) and \(c\) lie in \([0,B)\).  The isolated
residue also lies in this interval.  They are distinct because the three
shifted indices are distinct and, under \(\gcd(N,r)=1\), multiplication by
\(N\) permutes the residue classes modulo \(r\).  After sorting the three
residues, equation (8.3) is exactly the gate excluded by (1.5).  Hence

\[
\boxed{
\text{No coprime denominator-one two-level candidate has a \(2+1\)
pattern of internal gap two.}
}                                                   \tag{8.4}
\]

## Conclusion

The three-isolated sector and every internal-gap-two \(2+1\) sector are
now closed uniformly.  The decisive step is not a sampled period audit.
It is a finite exact cover of the continuous normalized gap simplex,
combined with a full, content-unreduced fold at the second Euclidean rung.
The companion report
[cycle_two_plus_one_complete.md](cycle_two_plus_one_complete.md) closes
the former last sector, internal gap one with \(e>c\).  Thus the combined
suite excludes every exactly-three run type.  Configurations with four or
more shifts remain outside this theorem.
