# Completion of the exactly-three two-level sector

**Mode:** SOLVE.  We apply the exact anchor-cover method to the last
\(2+1\) residue order.

**Status:** The gap-one \(2+1\) sector with \(e>c\) is excluded uniformly
above the established period barrier.  Together with the run-three
theorem, the earlier \(e<c\) theorem, the gap-two reduction, and the
three-monomial interval cover, this excludes every exactly-three shifted
configuration in the coprime denominator-one two-level branch.  It does
not exclude configurations with four or more shifts.

## Updating proof skeleton

1. **PROVED:** the last gate is
   \((z-1)(5z^{-c}+3z^{-e})=3z\), with
   \(0<c<e<B\) and \(c<L\).
2. **PROVED:** six monotone two-point anchor words give exact primitive
   polynomials at the Bezout root.
3. **PROVED:** the full \(M\)-folded resultant is nonzero and satisfies the
   sign-separated alias bound (4.4).  No folded content is removed.
4. **EXACT FINITE COVER:** \(139\) rational boxes cover the complete
   normalized two-gap region, with no residual box.
5. **PROVED:** the gap-one \(e>c\) gate is impossible.
6. **PROVED, BY EXHAUSTION OF RUN TYPES:** no coprime denominator-one
   two-level candidate has exactly three shifted sites.
7. **REMAINING:** the cycle argument still needs a mechanism for four or
   more shifted sites.

## 1. The last \(2+1\) gate

The inherited hypotheses are that the candidate is nontrivial,
least-state, strict-record, and denominator one, its deformation levels
lie in \(\{0,1\}\), exactly three levels equal one, and
\(\gcd(N,r)=1\).

Retain

\[
N=\lceil r\log_2 3\rceil,\qquad
D=2^N-3^r,\qquad
B=N-r,
\]

and

\[
L=r-B,\qquad M=B-L.
\]

The specific Bezout root satisfies

\[
2z^B=3,\qquad 3z^L=4,\qquad 8z^M=9\pmod D.         \tag{1.1}
\]

We use

\[
r\ge R:=72{,}057{,}431{,}991,
\qquad
\frac16<\frac Mr<\frac{171}{1000},                \tag{1.2}
\]

and

\[
D>3^r e^{-6.125581}r^{-13.3}.                     \tag{1.3}
\]

For an adjacent pair of internal Christoffel gap one, let \(c\) be the
pair's run-start residue and let \(e\) be the isolated run-start residue.
The only order not covered by the preceding \(2+1\) report is

\[
0<c<e<B,\qquad c<L.                                \tag{1.4}
\]

Its exact gate is

\[
(z-1)(5z^{-c}+3z^{-e})=3z\pmod D.                 \tag{1.5}
\]

We will prove that (1.5) has no solution under (1.1) to (1.4).

## 2. Anchored primitive polynomials

As before, put

\[
(q_0,q_1,q_2):=(0,L,B),
\qquad
(\kappa_0,\kappa_1,\kappa_2):=(12,9,8).
\]

Thus

\[
12z^{-u}=\kappa_jz^{q_j-u}\pmod D.                 \tag{2.1}
\]

Choose one of the six monotone words

\[
\boldsymbol a=(a,b),\qquad 0\le a\le b\le2.        \tag{2.2}
\]

Define

\[
t_1:=q_a-c,\qquad t_2:=q_b-e,
\qquad h:=-\min(0,t_1,t_2),                        \tag{2.3}
\]

and

\[
g:=\gcd(36,5\kappa_a,3\kappa_b).                  \tag{2.4}
\]

The integer \(g\) is supported on \(2\) and \(3\), while \(D\) is coprime
to \(6\).  Multiplying (1.5) by \(12z^h\) and dividing by \(g\) gives

\[
P_{\boldsymbol a}(z)=0\pmod D,                    \tag{2.5}
\]

where

\[
P_{\boldsymbol a}(X)
:=\frac1g\left\{
(X-1)\left(5\kappa_aX^{h+t_1}
+3\kappa_bX^{h+t_2}\right)
-36X^{h+1}
\right\}.                                         \tag{2.6}
\]

In particular,

\[
P_{\boldsymbol a}(1)=-\frac{36}{g}\ne0.           \tag{2.7}
\]

The nominal degree is

\[
m^\sharp
:=\max(0,t_1,t_2)-\min(0,t_1,t_2)+1,              \tag{2.8}
\]

and \(\deg P_{\boldsymbol a}\le m^\sharp\).

## 3. Normalized parameter region

Put

\[
d_0:=c,\qquad d_1:=e-c,\qquad d_2:=B-e,            \tag{3.1}
\]

and normalize by

\[
y_i:=\frac{d_i}{M},
\qquad
\ell:=\frac LM,
\qquad
\eta:=\frac1M.                                    \tag{3.2}
\]

Equations (1.2) and \(r=2L+M\) give

\[
\frac{829}{342}<\ell<\frac52,
\qquad
0<\eta<\frac1{10^{10}}.                            \tag{3.3}
\]

The residue conditions become

\[
y_0,y_1,y_2>0,\qquad
y_0+y_1+y_2=\ell+1,\qquad
y_0<\ell.                                         \tag{3.4}
\]

It is therefore enough to cover the feasible part of

\[
\left[\frac{829}{342},\frac52\right]
\times\left[0,\frac72\right]^2,                   \tag{3.5}
\]

where the last two coordinates are \(y_0,y_1\).

For a fixed word, \(t_1/M\) and \(t_2/M\) are affine rational functions
of these variables.  Let

\[
s:=\max\left(0,\frac{t_1}{M},\frac{t_2}{M}\right)
-\min\left(0,\frac{t_1}{M},\frac{t_2}{M}\right).   \tag{3.6}
\]

The exact cover always selects a word for which

\[
s+\eta<2.                                          \tag{3.7}
\]

Writing

\[
m^\sharp=QM+d,\qquad 0\le d<M,                    \tag{3.8}
\]

we therefore have \(Q\in\{0,1\}\).

## 4. Full fold, norm, and nonvanishing

Let

\[
F(X):=8X^M-9,
\qquad
W(X):=8^QP_{\boldsymbol a}(X)\pmod{F(X)}.           \tag{4.1}
\]

The polynomial \(P_{\boldsymbol a}\) has five labeled terms: two positive
derivative terms, two negative derivative terms, and one negative final
term.  A term folded from block \(j\) receives the factor
\(9^j8^{Q-j}\).

For each residue class, separate the positive and negative folded
amplitudes.  As in the three-monomial cover,

\[
(A^+-A^-)^2\le(A^+)^2+(A^-)^2.                    \tag{4.2}
\]

Let \(U\) be the sum of the five amplitude squares, together with twice
the product for every same-sign pair whose exact difference interval may
contain a multiple of \(M\).  Then

\[
\sum_v [X^v]W^2\le U.                              \tag{4.3}
\]

Parseval at the roots of \(F\), followed by the
arithmetic-geometric mean inequality, gives

\[
\boxed{
0<|\operatorname{Res}(F,P_{\boldsymbol a})|
<8^d\left(\frac{81}{64}U\right)^{M/2}.
}                                                   \tag{4.4}
\]

This remains valid when cancellation lowers the actual degree.  If
\(\deg P=m'\le QM+d\), then
\(W(\alpha)=8^QP(\alpha)\) at every root of \(F\), and the leading
resultant factor is

\[
8^{m'-QM}\le8^d.                                   \tag{4.5}
\]

This includes the case \(m'<QM\), where the exponent on the left is
negative.  Thus the nominal degree in (3.8) is a safe upper degree.

No content is divided from \(W\).

We record the nonvanishing argument.  The binomial \(F\) is irreducible:
the valuation vector of \(9/8\) is primitive, and the exceptional clause
when \(4\mid M\) cannot occur for the positive number \(9/8\).  The case
\(Q=0\) follows from \(\deg P<M\) and (2.7).

For \(Q=1\), write

\[
P=P_0+X^MP_1,\qquad \deg P_0,\deg P_1<M,            \tag{4.6}
\]

and put \(f_0:=36/g\).  If \(W=8P_0+9P_1=0\), then (2.7) gives

\[
P_1(1)=8f_0.                                       \tag{4.7}
\]

Only derivative pairs crossing the block boundary can contribute
positively to \(P_1(1)\).  Their total is at most

\[
\frac{5\kappa_a+3\kappa_b}{g}
\le\frac{60+36}{g}
=\frac83f_0<8f_0,                                  \tag{4.8}
\]

contradicting (4.7).  Hence the resultant in (4.4) is nonzero.

## 5. Exact interval certificate

The script
[cycles/two_plus_one_gap1_interval_certificate.js](cycles/two_plus_one_gap1_interval_certificate.js)
uses the same rational covering rule as the three-monomial certificate.
For completeness, its acceptance test is as follows.

For each rational box and anchor word, it computes outward intervals for
the errors, their span, the possible quotients \(Q\), every folding band,
and every possible same-sign alias.  Put

\[
A:=\left\lceil100\frac dM\right\rceil.             \tag{5.1}
\]

Each possible quotient branch must satisfy

\[
8^{342A}(81U)^{17100}125^{200000}
<64^{17100}374^{200000}.                           \tag{5.2}
\]

This is exactly

\[
8^{171A/100000}
\left(\frac{81U}{64}\right)^{171/2000}
<\frac{374}{125}.                                  \tag{5.3}
\]

Together with \(M/r<171/1000\), equations (4.4) and (5.3) imply

\[
0<|\operatorname{Res}(F,P_{\boldsymbol a})|
<\left(\frac{374}{125}\right)^r.                   \tag{5.4}
\]

Every operation in the cover uses reduced BigInt rationals or exact
integer powers.  The deterministic output is

\[
\begin{array}{c|r}
\text{interval nodes visited}&297\\
\text{infeasible boxes discarded}&10\\
\text{boxes certified}&139\\
\text{maximum branch depth}&16\\
\text{residual boxes}&0.
\end{array}                                        \tag{5.5}
\]

The anchor counts are

\[
\begin{array}{c|rrrrr}
\text{word}&00&01&02&11&12\\
\hline
\text{boxes}&51&33&12&34&9.
\end{array}                                        \tag{5.6}
\]

The script asserts the full-binary partition identity

\[
297=2(10+139)-1                                    \tag{5.7}
\]

and every count in (5.5) and (5.6).  Its terminal line is

    two_plus_one_gap1_interval_certificate_passed=true

## 6. Contradiction and the exactly-three theorem

Equations (1.1) and (2.5) imply

\[
D\mid\operatorname{Res}(F,P_{\boldsymbol a}).      \tag{6.1}
\]

As in the three-monomial report,

\[
\left(\frac{374}{125}\right)^r
=3^r\left(\frac{374}{375}\right)^r<D              \tag{6.2}
\]

for every \(r\ge R\).  This follows from (1.3),
\(\log(375/374)>1/375\), and

\[
\frac r{375}>6.125581+13.3\log r.                 \tag{6.3}
\]

The certificate checks the endpoint by the exact inequalities

\[
\left(\frac{19}{7}\right)^{26}>R,
\qquad
R>375\cdot371.                                     \tag{6.4}
\]

Equations (5.4), (6.1), and (6.2) give a nonzero multiple of \(D\) whose
absolute value is less than \(D\), a contradiction.  We have proved

\[
\boxed{
\text{No gap-one \(2+1\) candidate satisfies \(0<c<e<B\).}
}                                                   \tag{6.5}
\]

We now combine the run-type results:

1. a single run of three is excluded by the run-three resultant theorem;
2. a \(2+1\) pattern of internal gap one with \(e<c\) is excluded by the
   preceding \(2+1\) addendum;
3. the complementary gap-one order \(e>c\) is excluded by (6.5);
4. both orders with internal gap two reduce to the three-monomial gate and
   are excluded by the exact three-monomial cover;
5. three isolated shifts are excluded by the same cover.

These are all run partitions of three.  Therefore

\[
\boxed{
\begin{gathered}
\text{No coprime denominator-one two-level candidate above the period}\\
\text{barrier has exactly three shifted sites.}
\end{gathered}
}                                                   \tag{6.6}
\]

## Conclusion

The exactly-three sector is closed.  The proof uses a full, content-
unreduced fold at the \(M\)-rung and two exact rational covers, rather than
a finite scan over periods.  The next cycle-integrality obstruction begins
at four shifted sites, where the elementary coefficient-energy base
reaches \(3\) and no longer leaves a determinant margin.
