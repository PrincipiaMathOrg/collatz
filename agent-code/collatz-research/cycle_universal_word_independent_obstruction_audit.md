# Universal cycle equation: the single integral class and the surviving nonlinear gap

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** sharp audit, no universal exclusion. Positivity, the least rotation,
all rotated carries, prime-order tests, and every integral linear conjugacy
considered below do not produce an obstruction beyond the single class
\(C\bmod D\). The only elementary word-independent datum which survives this
collapse is the absolute order and spacing of the integer states. No global
diameter or endpoint theorem strong enough to exploit that spacing is presently
available.

## 1. The canonical rational orbit already has the full positive geometry

Let

\[
a=(a_0,\ldots,a_{r-1}),\qquad a_i\geq1,\qquad
N=\sum_i a_i,
\]

and suppose

\[
D:=2^N-3^r>0.
\tag{1}
\]

For the rotation beginning at \(a_i\), put

\[
C_i:=\sum_{j=0}^{r-1}3^{r-1-j}2^{A_{i,j}},
\qquad
A_{i,j}:=\sum_{t=0}^{j-1}a_{i+t},
\tag{2}
\]

where all indices are cyclic and \(A_{i,0}=0\). Direct rotation of the
affine composition gives

\[
\boxed{2^{a_i}C_{i+1}=3C_i+D.}
\tag{3}
\]

Consequently every word with \(D>0\), before any divisibility assumption,
has the exact positive rational orbit

\[
y_i:=\frac{C_i}{D}>0,
\qquad
2^{a_i}y_{i+1}=3y_i+1.
\tag{4}
\]

Put

\[
g:=\gcd(D,C_0),\qquad q:=\frac Dg,\qquad p_i:=\frac{C_i}{g}.
\tag{5}
\]

Equation (3) shows that \(g=\gcd(D,C_i)\) at every rotation. Thus

\[
\boxed{2^{a_i}p_{i+1}=3p_i+q,\qquad \gcd(p_i,q)=1.}
\tag{6}
\]

All the numbers in (6) are odd, so

\[
v_2(3p_i+q)=a_i.
\tag{7}
\]

Thus the rational shadow retains the exact local valuations, not merely the
composed affine equation.

If the word is primitive, then the \(y_i\) are distinct. Indeed, equality of
two states in (6) makes the next exponent uniquely equal to
\(v_2(3p_i+q)\), and determinism then makes the intervening word a period.
After rotating to the least \(y_i\), every proper return suffix gives

\[
2^{N-A_{0,j}}y_0
=3^{r-j}y_j+K_j
>3^{r-j}y_0,
\]

and hence

\[
\boxed{2^{N-A_{0,j}}>3^{r-j}\qquad(0<j<r).}
\tag{8}
\]

These are exactly the strict suffix records. Positivity, primitivity,
leastness, and the strict records are therefore properties of the canonical
rational orbit. None of them sees whether \(q=1\).

This is not merely a small-state objection. At the first Farey mediant left
by the current period argument,

\[
(N,r)=(114208327604,72057431991),
\tag{9}
\]

the lower Christoffel word is primitive and strict-record. Its carry is a
unit modulo \(D\), so its reduced denominator is the maximal value \(q=D\),
while its least rational state satisfies the rigorously audited bound

\[
y_{\min}>3143983941657595495964>2^{71}.
\tag{10}
\]

Thus even the currently known global lower bound for the least state, at an
actual surviving slope, does not turn the positive or extremal geometry into
an integrality test. The exact audit is in
[`cycle_christoffel_integrality.md`](cycle_christoffel_integrality.md) and
[`cycles/christoffel_q1_audit.js`](cycles/christoffel_q1_audit.js).

## 2. All rotations generate exactly one ideal

Both \(2\) and \(3\) are units modulo \(D\). Reducing (3) modulo \(D\)
therefore gives

\[
C_{i+1}\equiv 3\,2^{-a_i}C_i\pmod D.
\tag{11}
\]

Every multiplier in (11) is a unit. It follows at once that

\[
\boxed{(D,C_0,C_1,\ldots,C_{r-1})=(D,C_0)=g.}
\tag{12}
\]

More precisely, if \(\ell^e\Vert D\), then

\[
\boxed{
\min\{e,v_\ell(C_i)\}
=\min\{e,v_\ell(C_0)\}
\quad\text{for every }i.}
\tag{13}
\]

Hence all rotated divisibilities are equivalent, prime power by prime power:

\[
D\mid C_0
\quad\Longleftrightarrow\quad
D\mid C_i\text{ for one }i
\quad\Longleftrightarrow\quad
D\mid C_i\text{ for every }i.
\tag{14}
\]

Taking more rotations does not provide independent congruences. It merely
transports the same class by units.

## 3. The full integral state system has cyclic cokernel

Write (4) simultaneously as

\[
M(a)y={\bf1},
\tag{15}
\]

where row \(i\) of \(M(a)\) has \(-3\) in column \(i\) and
\(2^{a_i}\) in column \(i+1\), cyclically. For \(r=1\), the only entry is
\(2^{a_0}-3=D\). For \(r\geq2\), the two cyclic determinant terms give

\[
\det M(a)=(-1)^{r-1}(2^N-3^r)=(-1)^{r-1}D.
\tag{16}
\]

There is an \((r-1)\)-minor equal up to sign to \(3^{r-1}\). Deleting row
\(k\) and column \(k+1\) gives another \((r-1)\)-minor equal up to sign to

\[
2^{N-a_k}.
\]

Their gcd is one. The determinantal-divisor characterization of Smith
normal form now proves

\[
\boxed{
\operatorname{SNF}M(a)=\operatorname{diag}(1,\ldots,1,D),
\qquad
\operatorname{coker}M(a)\simeq\mathbf Z/D\mathbf Z.}
\tag{17}
\]

The order of the particular right-hand-side class \([\mathbf1]\) is
exactly \(q\). Indeed, the unique rational solution of
\(M(a)z=t\mathbf1\) is \(z_i=t p_i/q\), and \(\gcd(p_i,q)=1\). It is
integral exactly when \(q\mid t\). Therefore

\[
\boxed{\operatorname{ord}_{\operatorname{coker}M(a)}[\mathbf1]=q.}
\tag{18}
\]

In particular, \(q=1\) says exactly that this single class vanishes. Any
unimodular integral conjugacy of the rotation equations preserves (17) and
(18). A determinant, a collection of minors, or a linear block
renormalization cannot manufacture a second integral obstruction.

This statement also explains why a cyclotomic splitting in a noncoprime
slope must be handled cautiously. Factors visible after extending or
changing coordinates do not become independent conditions on the original
integer state vector: over \(\mathbf Z\), its complete linear cokernel is
the single cyclic group (17).

## 4. Prime divisors and multiplicative order do not add information

For a prime power \(\ell^e\Vert D\), equation (11) gives a closed walk of
units multiplying the one residue \(C_0\bmod\ell^e\). The orders of \(2\)
and \(3\) control the multipliers of this walk, but (13) shows that they do
not control whether its initial residue vanishes. Selecting a prime power at
which vanishing fails is exactly selecting a prime-power component of the
original condition \(D\nmid C_0\).

The primitive strict-record word

\[
(1,1,1,1,1,2,1,1,2,1,2,3,2,1,1,1,5)
\tag{19}
\]

is a sharp regression. It has

\[
\begin{aligned}
r&=17,&N&=27,\\
D&=5077565=5\cdot71\cdot14303,\\
C_0&=189900931,&g&=71\cdot14303,&q&=5.
\end{aligned}
\tag{20}
\]

At \(\ell=14303\), both \(2\) and \(3\) have the prime order \(7151\).
The seventeen multiplicative prefix residues are distinct, close, and sum
to zero modulo \(14303\). Thus primitivity, leastness, positivity, exact
valuations, distinct prefixes, and large multiplicative order coexist with
complete cancellation at a common prime. The only missing component is the
factor \(5\). A bare prime-order theorem would have to find that missing
component, which is precisely the original denominator problem.

## 5. Global scalar and extremal identities are denominator-blind

Multiplying and summing (4) give

\[
\boxed{
\prod_{i=0}^{r-1}\left(1+\frac1{3y_i}\right)
=\frac{2^N}{3^r},}
\tag{21}
\]

and

\[
\boxed{
\sum_{i=0}^{r-1}(2^{a_{i-1}}-3)y_i=r.}
\tag{22}
\]

At the integral numerator level these are

\[
\prod_i(3p_i+q)=2^N\prod_i p_i,
\qquad
\sum_i(2^{a_{i-1}}-3)p_i=rq.
\tag{23}
\]

Since every \(p_i\) is coprime to \(q\), the reduced denominator of the
state product is exactly

\[
\operatorname{den}\!\left(\prod_i y_i\right)=q^r.
\tag{23a}
\]

Thus “the global state product is an integer” is equivalent to \(q=1\),
but only because it repeats the same denominator \(r\) times. It is not a
second obstruction, and (23) gives no independent bound on that product.

Equations (21) and (22) hold for the canonical rational orbit of every
word. Consequently AM-GM, reciprocal-mass, positivity, or a least/maximum
comparison which uses only these identities is insensitive to \(q\).
Equation (10) shows that this remains true in the full audited size range.

The same point applies to subtraction. The constant disappears from

\[
2^{a_i}p_{i+1}-2^{a_j}p_{j+1}=3(p_i-p_j).
\tag{24}
\]

Thus an argument based only on normalized differences, order type, or
extrema again sees the rational orbit \(y_i=p_i/q\), not its denominator.

## 6. Quadratic reciprocity gives no hidden global sign

There is a natural simple theorem to test which is genuinely specific to
the constant \(+1\). Suppose the \(y_i=x_i\) are integer cycle states.
Then \(3\nmid x_i\) and \(\gcd(x_i,x_{i+1})=1\). Jacobi symbols in the two
directions of one edge give

\[
\left(\frac{x_{i+1}}{x_i}\right)
=\left(\frac2{x_i}\right)^{a_i},
\qquad
\left(\frac{x_i}{x_{i+1}}\right)
=\left(\frac{-3}{x_{i+1}}\right).
\tag{25}
\]

Quadratic reciprocity therefore yields

\[
\left(\frac2{x_i}\right)^{a_i}
\left(\frac{-3}{x_{i+1}}\right)
=(-1)^{\epsilon_i\epsilon_{i+1}},
\qquad
\epsilon_i:=\frac{x_i-1}{2}\pmod2.
\tag{26}
\]

This looks global after multiplication around the cycle, but it collapses
edge by edge. Exact valuation gives

\[
\epsilon_i=1\quad\Longleftrightarrow\quad a_i=1,
\tag{27}
\]

while reduction of the preceding edge modulo \(3\) gives

\[
\left(\frac{-3}{x_{i+1}}\right)
=\left(\frac{x_{i+1}}3\right)=(-1)^{a_i}.
\tag{28}
\]

If \(a_i=2\), then \(x_i\equiv1\pmod8\). If \(a_i\geq3\), then
\(x_i\equiv5\pmod8\). If \(a_i=1\), the two possibilities
\(x_i\equiv3,7\pmod8\) say respectively that \(a_{i+1}>1\) or
\(a_{i+1}=1\). Substitution proves (26) identically. Hence the putative
reciprocity obstruction contains only the already forced local information
modulo \(3\), \(4\), and \(8\); multiplying it produces no new sign.

## 7. The one elementary survivor: absolute integer spacing

If \(q=1\) and the word is primitive, then the states are distinct positive
odd integers. Sorting them gives

\[
x_{(j+1)}-x_{(j)}\geq2,
\tag{29}
\]

or, equivalently,

\[
C_{(j+1)}-C_{(j)}\geq2D.
\tag{30}
\]

This is genuinely denominator-sensitive. It does not survive after
normalizing a denominator-\(q\) rational orbit. However, the divisibility
part of (30) still follows from the single rotation class (12). To obtain a
contradiction from (30), one needs an independent global compression such
as

\[
C_{\max}-C_{\min}<2(r-1)D,
\tag{31}
\]

or a stronger ordered analogue. None of (3), (8), (21), or (22) supplies
such a bound. The denominator-five regression (19) already has numerator
range

\[
2773-187=2586>2(r-1)=32,
\tag{32}
\]

so positivity, strict records, exact valuations, and leastness leave ample
archimedean room. More generally, concentration of the allowed shortcut
exponents gives exponentially large state ranges while preserving the
strict-record inequalities.

The other known genuinely \(q=1\)-sensitive global object is the paired
positive ordinary \(3m-1\) shadow. It produces a simple finite path whose
endpoints differ by \(D\), but the exact reciprocal identity for that path
is compatible by an exponential margin. A new endpoint-gap, path-packing,
or ordered-interlacing theorem would be required. This is nonlinear
information and is not contained in the cyclic cokernel.

## 8. Conclusion

The audit gives a precise division.

1. Positivity, the least rotation, strict records, scalar extremal
   identities, and normalized order are properties of the canonical
   rational orbit and are \(q\)-blind.
2. All rotations, all prime-power tests, determinants, and integral linear
   conjugacies reduce exactly to the one class \([\mathbf1]\) of order
   \(q\) in the cyclic cokernel \(\mathbf Z/D\mathbf Z\).
3. Quadratic reciprocity supplies no overlooked global sign; it reduces to
   the local residues already encoded by the exponents.
4. Absolute integer spacing and the paired \(3m-1\) path do remain genuinely
   \(q=1\)-sensitive, but no word-independent global compression theorem is
   presently available to close them.

Accordingly, none of the simple universal directions audited here excludes
all nontrivial positive cycles. A successful universal attack must add a
nonlinear theorem about the ordered integer representatives, or prove that
some specific prime-power component of \(D\) is absent from \(C\) by input
which is not merely unit transport of \(C\bmod D\).

## 9. Exact regression

The script
[`cycles/universal_single_class_audit.js`](cycles/universal_single_class_audit.js)
checks the rotation identity, invariant gcd, reduced recurrence, exact
valuations, cyclic determinant, the two coprime Smith minors, strict records
at the least primitive rotation, and the scalar identities on all positive
words in its finite test box. It separately checks the denominator-five
prime-order regression and the edgewise Jacobi collapse. The proofs above
are all-depth; the script is an exact regression, not a substitute for them.
