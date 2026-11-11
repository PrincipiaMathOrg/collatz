# The Christoffel integrality gate

**Mode:** SOLVE.  We isolate the exact denominator of the Christoffel
extremizer, and then separate the base determinant from the remaining
cyclotomic cofactor when the shortcut length and odd count have a common
divisor.

**Status:** Every Christoffel parity word is excluded from a nontrivial
integer cycle.  A primitive strict-record rational countermodel shows that
the common-divisor reduction does not force periodicity of the word and does
not remove the complementary cofactor.  Thus the full cycle-integrality gate
remains open for non-Christoffel words.

## Updating proof skeleton

1. **PROVED:** when \(2^N>3^r\) and \(\gcd(N,r)=1\), every parity carry has an
   exact one-variable representation modulo \(D=2^N-3^r\), obtained from a
   Bezout base \(z\) satisfying \(z^r=2\) and \(z^N=3\).
2. **PROVED:** the Christoffel carry is a unit modulo \(D\).  In fact it
   satisfies one explicit unit congruence.
3. **PROVED:** for arbitrary \(g=\gcd(N,r)\), the reduced denominator of
   the Christoffel word is exactly
   \[
   2^{N/g}-3^{r/g}.
   \]
   Hence a Christoffel word lifts to an integer cycle only when it is
   \((10)^g\), which is the trivial cycle.
4. **PROVED:** coprime one-strip strict-record words are dyadic deformations
   of the Christoffel geometric sum.  Integer lifting is one explicit modular
   zero-sum condition on the deformation levels.
5. **PROVED:** if \(g>1\), one-strip strict records give a base-factor
   congruence on \(g\) consecutive blocks.  For \(g=2\), integer lifting is equivalent to
   two signed carry congruences, one modulo \(2^{N/2}-3^{r/2}\) and the other
   modulo \(2^{N/2}+3^{r/2}\).
6. **PROVED, COUNTERMODEL:** the primitive word
   \((1,2,1,2,1,3)\) satisfies the strict records and the base-factor
   congruence with \(\gcd(N,r)=2\), but misses exactly the complementary
   factor \(59\).  Thus neither primitivity nor the base factor proves
   \(\gcd(N,r)=1\).
7. **CERTIFIED NO-GO:** the first Farey mediant surviving the current period
   argument also survives the exact Christoffel extremal test.  Therefore the
   Christoffel bound does not improve the period barrier by itself.
8. **REMAINING:** exclude the modular zero sum for every non-Christoffel
   strict-record word, or exclude the complementary cyclotomic factors in
   the common-divisor case.

## 1. Binary carry notation

Let \(d\) be a binary shortcut word of length \(N\) with \(r\) ones, and
assume that \(2^N>3^r\).  Write

\[
0\le n_0<n_1<\cdots<n_{r-1}<N
\]

for the positions of its ones, indexed from zero.  Its carry and determinant
are

\[
C(d):=\sum_{j=0}^{r-1}2^{n_j}3^{r-1-j},\qquad
D:=2^N-3^r.                                           \tag{1.1}
\]

For an accelerated word \(a=(a_0,\ldots,a_{r-1})\), we have \(N=\sum a_i\)
and \(n_j=A_j:=\sum_{i<j}a_i\).  Thus (1.1) is the same carry used in the
cycle ledger.

## 2. A Bezout-base spectral form

We first assume that \(\gcd(N,r)=1\).  Choose \(u,v\in\mathbf Z\) such that

\[
ur+vN=1,
\]

and define the unit

\[
z:=2^u3^v\pmod D.                                     \tag{2.1}
\]

Negative exponents in (2.1) denote modular inverses.  Since \(D\) is
coprime to \(6\), these inverses exist.  The defining relation for \(D\)
gives

\[
z^r\equiv2\pmod D,\qquad z^N\equiv3\pmod D.           \tag{2.2}
\]

Put

\[
\kappa_j:=jN-rn_j.
\]

Substitution of (2.2) in (1.1) gives the exact congruence

\[
\boxed{
C(d)\equiv z^{N(r-1)}\sum_{j=0}^{r-1}z^{-\kappa_j}\pmod D.
}                                                       \tag{2.3}
\]

In particular,

\[
\boxed{
D\mid C(d)\quad\Longleftrightarrow\quad
\sum_{j=0}^{r-1}z^{-\kappa_j}\equiv0\pmod D.
}                                                       \tag{2.4}
\]

This is a one-variable form of the exact denominator-one gate.  It is not a scalar
estimate: the full prefix discrepancy sequence occurs in the exponents.

## 3. Exact denominator of the Christoffel word

Let \(c_{N,r}\) be the lower Christoffel word whose one positions are

\[
n_j=\left\lfloor\frac{jN}{r}\right\rfloor,\qquad
0\le j<r.                                             \tag{3.1}
\]

Suppose first that \(\gcd(N,r)=1\).  Then

\[
\kappa_j=jN-r\left\lfloor\frac{jN}{r}\right\rfloor
=[jN]_r,
\]

so the values \(\kappa_j\) are a permutation of \(0,\ldots,r-1\).  Equation
(2.3) becomes

\[
C(c_{N,r})\equiv
z^{N(r-1)}\sum_{k=0}^{r-1}z^{-k}\pmod D.              \tag{3.2}
\]

Moreover, \(z-1\) is a unit modulo \(D\).  Indeed, a prime dividing both
\(D\) and \(z-1\) would give \(1\equiv z^r\equiv2\) modulo that prime.
Using \(z^r\equiv2\), the geometric sum in (3.2) satisfies

\[
2(z-1)\sum_{k=0}^{r-1}z^{-k}\equiv z\pmod D.
\]

Consequently,

\[
\boxed{
2(z-1)C(c_{N,r})\equiv z^{N(r-1)+1}\pmod D,\qquad
\gcd(C(c_{N,r}),D)=1.
}                                                       \tag{3.3}
\]

We now remove the coprimality hypothesis.  Write

\[
g:=\gcd(N,r),\qquad N=gp,\qquad r=gq,\qquad
X:=2^p,\quad Y:=3^q.
\]

The position formula (3.1) shows that

\[
c_{N,r}=c_{p,q}^{\,g}.                                \tag{3.4}
\]

The concatenation identity therefore gives

\[
\begin{aligned}
C(c_{N,r})&=H\,C(c_{p,q}),\\
D&=H(X-Y),\\
H&:=\sum_{m=0}^{g-1}X^mY^{g-1-m}
=\frac{X^g-Y^g}{X-Y}.                                \tag{3.5}
\end{aligned}
\]

Since \(\gcd(p,q)=1\), equation (3.3) applies to the base word.  We obtain

\[
\boxed{
\gcd(D,C(c_{N,r}))=H,\qquad
\frac{D}{\gcd(D,C(c_{N,r}))}=2^p-3^q.
}                                                       \tag{3.6}
\]

Thus the reduced denominator of every Christoffel word is known exactly.
It equals one only if \(2^p-3^q=1\).  If \(p\ge3\), this equation would give
\(3^q\equiv7\pmod8\), which is impossible.  The remaining positive case is
\((p,q)=(2,1)\).  Therefore

\[
\boxed{
\text{A Christoffel parity word has reduced denominator one}
\text{ if and only if it is }(10)^g.
}                                                       \tag{3.7}
\]

In accelerated notation this is the word \((2)^g\), and it gives only the
fixed point \(1\).  In particular, the entire Christoffel extremal family is
excluded from a nontrivial integer cycle.

## 4. Strict records as dyadic Christoffel deformations

Return to \(\gcd(N,r)=1\), and suppose that the accelerated word is a
one-strip candidate rotated to a strict least-state record.  Put

\[
\theta:=N-r\log_2 3\in(0,1).
\]

The strict suffix inequality at the \(j\)-th odd input gives

\[
N-n_j>(r-j)\log_2 3.
\]

Hence

\[
\kappa_j=jN-rn_j>-(r-j)\theta>-r.                    \tag{4.1}
\]

Let \(c_j:=[jN]_r\).  Since \(\kappa_j\equiv c_j\pmod r\), there is an
integer \(m_j\ge-1\) such that

\[
\kappa_j=c_j+m_jr.                                    \tag{4.2}
\]

The \(c_j\) again permute \(0,\ldots,r-1\), and \(z^r=2\).  Thus (2.4)
becomes

\[
\boxed{
\sum_{j=0}^{r-1}z^{-c_j}2^{-m_j}\equiv0\pmod D,\qquad
m_j\ge-1.
}                                                       \tag{4.3}
\]

For the Christoffel word every \(m_j=0\), and Section 3 proves that the sum
is a unit.  Therefore every nontrivial denominator-one candidate must be a
nonconstant dyadic deformation of that unit geometric sum.  The nearest-
neighbor constraints on \(a\) translate into corresponding path constraints
on the \(m_j\).  Proving that no such constrained deformation vanishes is a
precise version of the remaining coprime integrality gate.

## 5. The common-divisor block gate

Suppose that \(g=\gcd(N,r)>1\), with \(N=gp\), \(r=gq\), and use the notation
of Section 3.  Assume also the one-strip relation
\(N=\lceil r\log_2 3\rceil\).  Split the accelerated word after every \(q\)
odd inputs.  Let
\(E_m\) be the shortcut exponent before block \(m\), let \(K_m\) be its local
carry, and put

\[
h_m:=mp-E_m,\qquad 0\le m<g.
\]

The strict suffix record gives

\[
E_m<mp+(g-m)(p-q\log_2 3)<mp+1,
\]

and hence

\[
h_m\ge0.                                               \tag{5.1}
\]

Grouping the full carry by blocks and reducing modulo
\(D_0:=X-Y=2^p-3^q\), we obtain

\[
C\equiv X^{g-1}\sum_{m=0}^{g-1}2^{-h_m}K_m\pmod {D_0}.
\]

If \(h:=\max_m h_m\), every integer cycle must therefore satisfy

\[
\boxed{
D_0\mid\sum_{m=0}^{g-1}2^{h-h_m}K_m.
}                                                       \tag{5.2}
\]

For \(g=2\), write \(d:=p-E_1\ge0\), and let \(K_0,K_1\) be the two block
carries.  Now

\[
D=(X-Y)(X+Y),\qquad \gcd(X-Y,X+Y)=1.
\]

Multiplication of the carry by \(2^d\), followed by reduction modulo the two
factors, gives the exact equivalence

\[
\boxed{
D\mid C\quad\Longleftrightarrow\quad
\begin{cases}
X-Y\mid 2^dK_0+K_1,\\
X+Y\mid 2^dK_0-K_1.
\end{cases}
}                                                       \tag{5.3}
\]

Thus a proof that a primitive denominator-one cycle must have
\(\gcd(N,r)=1\) has a sharply identified missing step: it must rule out the
signed complementary-factor congruence, not merely the base determinant.

## 6. A primitive countermodel to the base-factor shortcut

Consider the accelerated word

\[
a=(1,2,1,2,1,3).
\]

It is primitive, strict-record, and one-strip, with

\[
r=6,\qquad N=10,\qquad \gcd(N,r)=2,\qquad
D=2^{10}-3^6=295=5\cdot59.
\]

Its two three-odd block carries and midpoint deficit are

\[
K_0=23,\qquad K_1=29,\qquad d=1.
\]

Therefore

\[
2K_0+K_1=75\equiv0\pmod5,\qquad
2K_0-K_1=17\not\equiv0\pmod {59}.                     \tag{6.1}
\]

The full carry is \(C=1085=5\cdot217\), so the reduced denominator is
exactly \(59\).  The exact rational cycle has numerator states

\[
\frac1{59}(217,355,281,451,353,559),                  \tag{6.2}
\]

and all six displayed valuations are exact.  Its first state is the least
state.  This example does not refute the possible theorem that a primitive
integer cycle has \(\gcd(N,r)=1\).  It proves that primitivity, strict
records, one-strip geometry, exact local valuations, and divisibility by the
base factor \(2^{N/g}-3^{r/g}\) are insufficient to establish that theorem.
The missing information is exactly the factor \(59=X+Y\).

## 7. Why the Christoffel extremal bound does not raise the period barrier

Fernandez and Ibanez prove that the Christoffel word maximizes the minimum
rotated carry for fixed \((N,r)\), and derive

\[
x_{\min}\le\frac1{2^{N/r}-3}.
\]

We use this result only as a targeted comparison with the existing cycle
barrier.  It is recorded in
[their paper](https://arxiv.org/html/2607.24844v1).

The first Farey mediant left open by the current exact argument is

\[
\frac Nr=\frac{114208327604}{72057431991}.
\]

It is not excluded even by the exact Christoffel carry.  To see this without
constructing integers having tens of billions of digits, put

\[
\lambda:=N\log2-r\log3>0.
\]

For coprime \(N,r\) with \(r>1\), the fractional parts \(\{jN/r\}\) permute
\(0,1/r,\ldots,(r-1)/r\).  Consequently

\[
\begin{aligned}
\frac{C(c_{N,r})}{3^r}
&=\frac13\sum_{j=0}^{r-1}
2^{-\{jN/r\}}e^{j\lambda/r}\\
&>\frac1{6(1-2^{-1/r})}.
\end{aligned}
\]

Since \(1-2^{-1/r}<(\log2)/r\) and
\(e^\lambda-1<\lambda/(1-\lambda)\), we obtain

\[
\frac{C(c_{N,r})}{2^N-3^r}
>\frac{r(1-\lambda)}{6(\log2)\lambda}.                \tag{7.1}
\]

Rigorous atanh-series intervals in the certificate give

\[
\frac{C(c_{N,r})}{2^N-3^r}
>3{,}143{,}983{,}941{,}657{,}595{,}495{,}964
>2^{71}.                                               \tag{7.2}
\]

Thus the extremal theorem sharpens the conceptual organization but does not
remove the first admissible rational slope.  No larger period lower bound
follows from it alone.

## 8. Exact certificate

The script
[cycles/christoffel_q1_audit.js](cycles/christoffel_q1_audit.js) checks the
closed denominator formula and Bezout congruence on \(602\) positive-slope
pairs through \(N=44\).  It also verifies (6.1), every exact valuation in
(6.2), and the rigorous logarithmic comparison (7.2).  Its terminal output
is

    christoffel_pairs_tested=602
    christoffel_reduced_denominator_formula_passed=true
    bezout_unit_congruence_passed=true
    gcd_two_countermodel_word=1.2.1.2.1.3
    gcd_two_countermodel_D=295
    gcd_two_countermodel_base_factor=5
    gcd_two_countermodel_missing_cofactor=59
    gcd_two_countermodel_carry=1085
    gcd_two_countermodel_states=217,355,281,451,353,559/59
    half_split_plus_gate=75
    half_split_minus_gate=17
    first_mediant=114208327604/72057431991
    mediant_christoffel_quotient_lower_floor=3143983941657595495964
    mediant_christoffel_quotient_gt_2361183241434822606848=true
    christoffel_q1_audit_passed=true

## Conclusion

The new exact theorem removes the unique extremal rotation class at every
slope: Christoffel words have maximal reduced denominator at coprime slope,
and their only integer repetitions are the trivial cycle.  For a general
strict-record word, (4.3) identifies the remaining coprime obstruction as a
constrained dyadic deformation of a unit geometric sum.  When
\(\gcd(N,r)>1\), equations (5.2) and (5.3) isolate the missing cyclotomic
cofactor.  Neither obstruction is yet excluded uniformly, so this report
does not prove that nontrivial cycles are absent.
