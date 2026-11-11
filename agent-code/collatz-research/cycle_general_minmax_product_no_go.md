# A direct minimum-maximum-product audit for arbitrary cycles

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** We audit the full cycle branch without imposing one-drop
geometry. The minimum and maximum give four exact local valuation
constraints, and denominator one gives a sharp coprime-\(6\) packing lemma:
if \(m\) and \(M\) are the least and greatest states of a primitive cycle of
length \(r\), then \(M\geq m+3r-4\). Combining this with the product identity
gives an exact reciprocal-packing bound. The bound is genuine but does not
close the cycle branch. Its direction weakens the product lower bound, and
its upper bound recovers only the existing polynomial state scale.

Every remaining argument based only on order, extrema, additive
telescoping, or the real product identity is reproduced exactly by known
positive rational \(3x+q\) cycles. Thus a universal cycle exclusion still
has to use the full lattice condition \(D\mid C\), not merely the fact that
the rational fixed point is positive, primitive, strict least, or
one-strip.

## 1. Universal extrema identities

Let

\[
2^{a_i}x_{i+1}=3x_i+1,
\qquad
0\leq i<r,
\tag{1}
\]

be a primitive nontrivial positive integer cycle, with indices taken
cyclically. Put

\[
A:=\sum_{i=0}^{r-1}a_i,
\qquad
m:=\min_i x_i,
\qquad
M:=\max_i x_i.
\tag{2}
\]

Every branch from a state larger than one rises exactly when \(a_i=1\) and
falls exactly when \(a_i\geq2\). Consequently, if \(x_j=m\), then

\[
a_j=1,
\qquad
a_{j-1}\geq2.
\tag{3}
\]

If \(x_k=M\), then

\[
a_{k-1}=1,
\qquad
a_k\geq2.
\tag{4}
\]

These four constraints are sharp. They say that a minimum is entered by a
drop and left by a rise, while a maximum is entered by a rise and left by a
drop.

Summing (1) around the cycle gives a second exact identity:

\[
\boxed{
\sum_{i=0}^{r-1}
\left(2^{a_{i-1}}-3\right)x_i=r.}
\tag{5}
\]

The coefficients in (5) have both signs. An exponent-one predecessor
contributes \(-x_i\), while every larger predecessor exponent contributes a
positive multiple of \(x_i\). The local order in (3) and (4) is therefore
already built into the cancellation in (5). There is no uniform sign to
exploit.

## 2. Product identity and the integer packing lemma

Multiplication of (1) gives

\[
\frac{2^A}{3^r}
=\prod_{i=0}^{r-1}
\left(1+\frac{1}{3x_i}\right).
\tag{6}
\]

Put

\[
\Lambda:=A\log2-r\log3.
\tag{7}
\]

Then

\[
\boxed{
\Lambda
=\sum_{i=0}^{r-1}
\log\left(1+\frac{1}{3x_i}\right).}
\tag{8}
\]

The extrema alone give

\[
r\log\left(1+\frac{1}{3M}\right)
\leq\Lambda
\leq
r\log\left(1+\frac{1}{3m}\right).
\tag{9}
\]

There is one simple input which is genuinely specific to integer states.
Reducing (1) modulo \(3\) gives

\[
2^{a_i}x_{i+1}\equiv1\pmod3.
\tag{10}
\]

Thus every cycle state is odd and coprime to \(3\). In particular, all
states lie in the two residue classes \(1,5\pmod6\).

Sort the states:

\[
m=y_0<y_1<\cdots<y_{r-1}=M.
\tag{11}
\]

The allowed coprime-\(6\) lattice gives

\[
y_j\geq m+3j-1
\qquad
(1\leq j<r).
\tag{12}
\]

This is sharp when \(m\equiv5\pmod6\) and \(j\) is odd.

**Proposition 1.** Every primitive nontrivial positive integer cycle
satisfies

\[
\boxed{M\geq m+3r-4.}
\tag{13}
\]

Moreover,

\[
\boxed{
\Lambda
\leq
\frac{1}{3m}
+\frac{1}{3(m+2)}
+\frac19
\log\left(\frac{m+3r-4}{m+2}\right).}
\tag{14}
\]

**Proof.** Equation (13) is (12) with \(j=r-1\). Since the summand in (8)
is decreasing, (12) and \(\log(1+u)\leq u\) give

\[
\Lambda
\leq
\frac{1}{3m}
+\frac13\sum_{j=1}^{r-1}\frac{1}{m+3j-1}.
\]

The summand is decreasing, so

\[
\sum_{j=1}^{r-1}\frac{1}{m+3j-1}
\leq
\frac{1}{m+2}
+\frac13
\log\left(\frac{m+3r-4}{m+2}\right).
\]

This proves (14). \(\square\)

Proposition 1 is the strongest direct conclusion of the elementary
minimum-maximum-product audit.

## 3. Why the packing lemma does not squeeze the cycle

The lower product bound in (9) becomes weaker when \(M\) increases. Equation
(13) is a lower bound for \(M\), so the two inequalities point in the same
direction rather than toward a contradiction.

The upper packing bound (14) is also insufficient. In the range \(m\gg r\),
its leading term is

\[
\Lambda\leq\frac{r}{3m}
+O\left(\frac{r^2}{m^2}\right).
\tag{15}
\]

Combining (15) with a lower bound of order
\(r^{-133/10}\) for the nonzero two-logarithm form gives only

\[
m=O\left(r^{143/10}\right).
\tag{16}
\]

This is the same exponent as the existing cycle state bound. It is fully
compatible with the audited lower bound \(m>2^{71}\) and the period lower
bound. If \(m\) is not much larger than \(r\), equation (14) is weaker still.

There is no elementary upper bound for \(M/m\). A cycle may have a long run
of exponent-one rises followed by one large drop. Without denominator one,
this geometry occurs at arbitrary depth, as Section 5 records.

Thus integer spacing improves the constant-density packing from the odd
lattice to the coprime-\(6\) lattice, but it does not change the decisive
exponent or produce a two-sided interval for \(M\).

## 4. Why additive order does not give descent

Equation (5) can also be written as equality between the total rise and the
total drop around the cycle. Each rise from \(x_i\) has size

\[
x_{i+1}-x_i=\frac{x_i+1}{2},
\qquad
a_i=1,
\tag{17}
\]

while a drop has size

\[
x_i-x_{i+1}
=\frac{(2^{a_i}-3)x_i-1}{2^{a_i}},
\qquad
a_i\geq2.
\tag{18}
\]

The total of (17) equals the total of (18). Minimum and maximum order only
identify where the signs change. The exponents at the drops remain
unbounded, so neither side uniformly dominates the other.

A smaller off-cycle predecessor is not a descent contradiction. Such a
predecessor is preperiodic into the same cycle and need not be a cycle
state. Even if it is smaller than \(m\), it does not violate the definition
of \(m\). To exclude the cycle, a descent argument must produce either a
smaller state on a closed cycle or an infinite descending chain of positive
ancestors. Extrema alone provide neither.

The same issue persists if one chooses the least positive seed which does
not reach \(1\). That seed may lie in a preperiodic tail entering the cycle,
so it need not coincide with the least cycle state.

## 5. Rational cycles reproduce every ordered-field argument

Let a word define a reduced positive rational cycle

\[
2^{a_i}p_{i+1}=3p_i+q,
\qquad
\gcd(p_i,q)=1.
\tag{19}
\]

The rational states

\[
\xi_i:=\frac{p_i}{q}
\tag{20}
\]

satisfy the original affine equation

\[
2^{a_i}\xi_{i+1}=3\xi_i+1.
\tag{21}
\]

Therefore, every statement in Sections 1 and 4, and the real product
identity in Section 2, holds without change. More explicitly,

\[
\frac{2^A}{3^r}
=\prod_i\left(1+\frac{q}{3p_i}\right)
=\prod_i\left(1+\frac{1}{3\xi_i}\right),
\tag{22}
\]

and

\[
\sum_i
\left(2^{a_{i-1}}-3\right)p_i
=qr.
\tag{23}
\]

The standard primitive denominator-five regression is

\[
a=(1,1,1,1,1,2,1,1,2,1,2,3,2,1,1,1,5).
\tag{24}
\]

It has

\[
r=17,
\qquad
A=27=\lceil17\log_2 3\rceil,
\qquad
D=5{,}077{,}565,
\tag{25}
\]

and

\[
\gcd(C,D)=1{,}015{,}513,
\qquad
q=5.
\tag{26}
\]

Its least and greatest states are

\[
\frac{187}{5},
\qquad
\frac{2773}{5}.
\tag{27}
\]

The cycle is positive, primitive, strict least, and one-strip. It satisfies
the four extrema constraints, the exact additive identity, and the exact
product identity. Its sole missing property is \(q=1\).

There is also an all-depth adversarial family. Put

\[
N:=\lceil r\log_2 3\rceil
\tag{28}
\]

and take

\[
a^{(r)}
=(1^{r-1},N-r+1).
\tag{29}
\]

This word defines a positive primitive strict-least rational one-strip
cycle. If \(m_r\) and \(M_r\) are its least and greatest rational states,
then the exponent-one run gives

\[
\boxed{
\frac{M_r+1}{m_r+1}
=\left(\frac32\right)^{r-1}.}
\tag{30}
\]

Thus positivity, primitivity, exact extrema order, and the product identity
permit an exponential maximum-to-minimum ratio and only one rise-to-drop
transition. Any proposed simple maximum bound or minimum-count argument
must use denominator one at an essential step.

These examples establish an ordered-field barrier: an argument which uses
only (21), positivity, cyclic order, minima, maxima, addition,
multiplication, and the real product identity cannot distinguish \(q=1\)
from \(q>1\).

## 6. What the denominator-one equation still asks for

For a cyclic word, put

\[
D:=2^A-3^r
\tag{31}
\]

and let \(C\) be its affine carry at the least rotation. The rational fixed
point is

\[
\frac{C}{D}=\frac{p_0}{q},
\qquad
q=\frac{D}{\gcd(C,D)}.
\tag{32}
\]

Integer lifting is exactly

\[
\boxed{D\mid C.}
\tag{33}
\]

Every order and product identity divides (33) by \(D\) and works with the
real number \(C/D\). This loses the residue class which distinguishes
\(q=1\). A direct size argument cannot recover it. In a hypothetical
nontrivial integer cycle,

\[
C=mD,
\tag{34}
\]

and the audited state bound gives \(m>2^{71}\). Thus \(C\) is already more
than \(2^{71}\) determinant intervals above zero. There is no possibility
of proving \(0<C<D\).

To use (33), one must instead find an explicit centered representative of
\(C\bmod D\), or a second condition not equivalent to the same cyclic
class, and prove that representative is nonzero. Minimum, maximum, product,
and additive order do not supply such a representative.

## 7. Exact audit

The checker
[cycle_general_minmax_product_audit.js](cycles/cycle_general_minmax_product_audit.js)
verifies the exact recurrence, closure, extrema valuations, product
identity, and additive telescope for the denominator-five and
denominator-thirteen regressions. It also audits the long-rise family at

\[
r=32,64,128,256.
\tag{35}
\]

At \(r=256\), the maximum numerator has \(556\) bits, the minimum numerator
has \(406\) bits, and their integer ratio already has \(150\) bits.

The checker performs \(39800\) coprime-\(6\) packing checks and records
\(10000\) sharp instances of (12). It retains the trivial cycle
\((a,x)=(2,1)\) as the mandatory \(q=1\) exception. The output ends in

\[
\texttt{status=PASS}.
\tag{36}
\]

The frozen SHA-256 digest of the certificate source is

\[
\texttt{026702f1073ac16acd83fc67bf0dd0efeaf5c10fff39a2c2ca40af924e39c1b1}.
\tag{37}
\]

## Conclusion

The direct arbitrary-cycle audit produces one clean universal lemma:

\[
M\geq m+3r-4,
\]

together with the reciprocal-packing estimate (14). This is a genuine use
of integer state spacing, but it does not close the cycle branch. The
maximum bound points in the wrong direction, and the reciprocal bound
recovers only the existing polynomial scale.

Every simpler order, product, or descent route collapses more completely.
Positive rational cycles satisfy the same affine recurrence over the
ordered field, with the same minima, maxima, product, and telescoping
identities. The denominator-five cycle and the all-depth long-rise family
are exact adversarial models.

Therefore a universal exclusion of nontrivial positive cycles still requires
a genuinely arithmetic theorem about \(D\mid C\). It cannot follow from
minimum and maximum order, the product identity, cyclic rise-drop balance,
or a smaller preperiodic predecessor alone.
