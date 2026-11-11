# Transition complexity in one-strip cycle deformations

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** Every primitive nontrivial integer cycle in the one-strip class
has \(\Omega(\sqrt r)\) height transitions.  In the two-level branch with
heights in \(\{0,1\}\), the stronger bound \(\Omega(r/\log r)\) holds.
Consequently the shifted support in that branch also has size
\(\Omega(r/\log r)\).  In particular, no such cycle has a fixed finite
number of shifted sites.  This excludes the complete exactly-four branch at
once, including all run types.  It does not exclude the transition-dense
two-level branch or the general transition-dense branch.

## Updating proof skeleton

1. **PROVED:** strict suffix records give \(m_j\geq-1\), and every cycle
   state is smaller than \(2^{m_j}H_r\), where \(H_r:=612r^{15}\).
2. **PROVED:** a constant-height run with \(u\) internal edges satisfies
   \(2^{\lfloor u/2\rfloor}<2^mH_r\).
3. **PROVED:** if \(T\) is the cyclic height-transition count, then

   \[
   2^{r-2T-1}<2^{T(T-1)} H_r^{2T+2}.
   \]

4. **PROVED:** therefore \(T=\Omega(\sqrt r)\) for every one-strip
   deformation.
5. **PROVED:** in the binary branch, the state envelope sharpens to
   \(H_r^{(2)}:=611r^{15}\), and

   \[
   2^{r-2T-1}<2^T (H_r^{(2)})^{2T+2}.
   \]

6. **PROVED:** exactly \(k\) shifted sites give \(T\leq2k\), so
   \(k=\Omega(r/\log r)\).  In particular \(k=4\) is impossible.
7. **REMAINING:** exclude the transition-dense branches.

## 1. Cycle input and deformation coordinates

Assume that a primitive nontrivial positive accelerated cycle has
accelerated period \(r\), total exponent

\[
N=\lceil r\log_2 3\rceil,
\qquad
D:=2^N-3^r,
\tag{1}
\]

and least state \(x\).  We retain positivity, primitivity, strict least-state
records, and the denominator-one hypothesis.  These are the established
one-strip cycle hypotheses.  The exactly-four application also retains
\(\gcd(N,r)=1\), although the transition argument below does not require
coprimality.  The linear-form estimate imported and audited
in `cycle_exclusion.md`, equation (P7.2), gives

\[
x<305r^{14.3}.
\tag{2}
\]

Put

\[
B_j:=\left\lfloor\frac{jN}{r}\right\rfloor
\qquad(0\leq j\leq r).
\tag{3}
\]

Write the actual exponent prefixes as

\[
A_j=B_j-m_j,
\qquad
m_j\in\mathbf Z,
\qquad
m_0=m_r=0.
\tag{4}
\]

The strict suffix record gives

\[
A_j<N-(r-j)\log_2 3
<\frac{jN}{r}+1
\qquad(0\leq j<r).
\]

Since \(A_j\) is an integer, this proves (5) for \(j<r\).  The endpoint
value \(m_r=0\) is exact, so

\[
m_j\geq-1.
\tag{5}
\]

Thus the accelerated exponent on edge \(j\) is

\[
a_j=A_{j+1}-A_j
=B_{j+1}-B_j+m_j-m_{j+1}.
\tag{6}
\]

Define the cyclic transition count

\[
T:=\#\{0\leq j<r:m_{j+1}\neq m_j\}.
\tag{7}
\]

The Christoffel case is \(T=0\), already excluded by the exact
Christoffel-integrality theorem except for the trivial cycle at \(1\).
We henceforth have \(T>0\).

Put \(g_j:=B_{j+1}-B_j\).  Since \(1<N/r<2\), we have
\(g_j\in\{1,2\}\).  Positivity of \(a_j\) in (6) therefore gives the
one-sided transition constraint

\[
m_{j+1}-m_j\leq g_j-1\leq1.
\tag{8}
\]

## 2. Polynomial state envelopes

Let \(x_j\) be the cycle state at odd time \(j\), and let \(C_j\) be the
carry of the first \(j\) accelerated letters.  Then

\[
x_j
=2^{m_j}\frac{3^jx+C_j}{2^{B_j}}.
\tag{9}
\]

Since \(B_j>jN/r-1>j\log_2 3-1\),

\[
\frac{3^j}{2^{B_j}}<2.
\tag{10}
\]

Moreover, (5) gives \(A_i\leq B_i+1\).  Every summand of the normalized
prefix carry therefore obeys

\[
\frac{3^{j-1-i}2^{A_i}}{2^{B_j}}
\leq
\frac{3^{j-1-i}2^{B_i+1}}{2^{B_j}}
<\frac43
\left(\frac{3}{2^{N/r}}\right)^{j-i}
<\frac43.
\tag{11}
\]

Consequently

\[
\frac{C_j}{2^{B_j}}<\frac{4j}{3}.
\tag{12}
\]

Combining (2), (9), (10), and (12), and using \(j\leq r\), gives

\[
\boxed{
x_j<2^{m_j}\left(2x+\frac{4j}{3}\right)
<2^{m_j}H_r,
\qquad H_r:=612r^{15}.}
\tag{13}
\]

Indeed, \(2x<610r^{15}\) by (2), while \(4r/3<2r^{15}\).
This is the only Archimedean input needed for the general transition
bound.

In the binary branch \(m_i\in\{0,1\}\), we instead have \(A_i\leq B_i\).
The factor \(4/3\) in (11) returns to \(2/3\), and we obtain the sharper
envelope

\[
\boxed{
x_j<2^{m_j}\left(2x+\frac{2j}{3}\right)
<2^{m_j}H_r^{(2)},
\qquad H_r^{(2)}:=611r^{15}.}
\tag{14}
\]

## 3. Mechanical repetition inside a constant-height run

Suppose that \(m_j\) is constant, equal to \(m\), across \(u\) consecutive
nontransition edges.  Equation (6) reduces on those edges to

\[
a_j=B_{j+1}-B_j.
\tag{15}
\]

The right-hand side is a rational mechanical word.  Its length-\(L\)
factor is determined
by the position of \(\{jN/r\}\) relative to the \(L+1\) points

\[
\left\{-\frac{kN}{r}\right\}\pmod1,
\qquad 0\leq k\leq L.
\tag{16}
\]

Using the points as endpoints of half-open arcs accounts for the rational
boundary phases.  Coincident points only reduce the number of arcs.  Hence
the word has at most \(L+1\) distinct factors of length \(L\).  This is the
rational mechanical analogue of Sturmian factor complexity.

For \(u\geq2\), put

\[
L:=\left\lfloor\frac{u-1}{2}\right\rfloor.
\tag{17}
\]

The \(L+2\) factors beginning at offsets \(0,1,\ldots,L+1\) all remain in
the run because \(2L+1\leq u\).  Two factors are therefore equal.  Their
starting positions differ by less than \(r\), so primitivity makes the two
starting cycle states distinct.

Let \(Q\) be the exponent sum of the common factor.  Every positive odd
integer realizing that exact factor lies in one residue class modulo
\(2^{Q+1}\): if its endpoint is odd, then

\[
3^L y+C\equiv2^Q\pmod{2^{Q+1}},
\tag{18}
\]

and \(3^L\) is a unit modulo \(2^{Q+1}\).  Thus the two distinct starting
states differ by at least \(2^{Q+1}\).  Since every accelerated exponent
is positive, \(Q\geq L\).  Equation (13) bounds both starting states by
\(2^mH_r\), and hence

\[
2^{L+1}<2^mH_r.
\tag{19}
\]

For even \(u\), \(L+1=u/2\); for odd \(u\), it is larger than
\(\lfloor u/2\rfloor\).  The cases \(u=0,1\) are immediate.  We have proved
the run inequality

\[
\boxed{
2^{\lfloor u/2\rfloor}<2^mH_r.}
\tag{20}
\]

## 4. Multiplying the runs

Cut the linear interval of \(r\) cycle edges at its \(T\) transition
edges.  This gives \(T+1\) possibly empty constant-height runs with
internal lengths

\[
u_0,u_1,\ldots,u_T,
\qquad
\sum_{j=0}^T u_j=r-T.
\tag{21}
\]

Let \(\lambda_j\) be the height of the \(j\)-th run.  The first and last
runs have height zero.  The transition constraint (8) gives

\[
\lambda_0=\lambda_T=0,
\qquad
\lambda_j\leq j\quad(0\leq j<T).
\]

Therefore

\[
\sum_{j=0}^T\lambda_j
\leq\frac{T(T-1)}2.
\tag{22}
\]

Put

\[
E:=\sum_{j=0}^T\left\lfloor\frac{u_j}{2}\right\rfloor.
\]

Equation (21) gives

\[
E\geq\frac{r-2T-1}{2}.
\tag{23}
\]

Multiplying (20) over all runs, then squaring and applying (22)-(23), gives

\[
\boxed{
2^{r-2T-1}<2^{T(T-1)}H_r^{2T+2}.}
\tag{24}
\]

Writing \(L_r:=\log_2H_r\), equation (24) is equivalent to

\[
\boxed{
r<T^2+(2L_r+1)T+2L_r+1.}
\tag{25}
\]

Whenever \(r>2L_r+1\), this gives the explicit bound

\[
\boxed{
T>
\frac{-(2L_r+1)+
\sqrt{(2L_r+1)^2+4(r-2L_r-1)}}2.}
\tag{26}
\]

In particular, \(T=\Omega(\sqrt r)\).  This conclusion uses no two-level
hypothesis.

## 5. The binary sharpening and shifted support

Suppose now that \(m_j\in\{0,1\}\).  The transition count is even, and
exactly \(T/2\) of the \(T+1\) linear runs have height one.  Use the sharper
state envelope \(H_r^{(2)}=611r^{15}\) from (14) in the proof of the run
inequality.  Multiplication over the runs gives

\[
\boxed{
2^{r-2T-1}<2^T(H_r^{(2)})^{2T+2}.}
\tag{27}
\]

Consequently

\[
\boxed{
T>
\frac{r-1-2\log_2H_r^{(2)}}
{3+2\log_2H_r^{(2)}}.}
\tag{28}
\]

Thus \(T=\Omega(r/\log r)\) in the binary branch.

If

\[
k:=\#\{0\leq j<r:m_j=1\},
\tag{29}
\]

then every height-one run contains at least one shifted site.  Hence

\[
T\leq2k.
\tag{30}
\]

Combining (28) and (30) gives

\[
\boxed{
k>
\frac{r-1-2\log_2(611r^{15})}
{2\bigl(3+2\log_2(611r^{15})\bigr)}.}
\tag{31}
\]

Thus no fixed-support two-level deformation can be an integer cycle.

For the exactly-four branch, \(k=4\) and \(T\leq8\).  Equation (27) would
imply

\[
2^{r-25}<(611r^{15})^{18}.
\tag{32}
\]

Exact integer arithmetic verifies the reverse inequality at \(r=10000\),
and also verifies

\[
2\cdot10000^{270}>10001^{270}.
\tag{33}
\]

The latter propagates the reverse of (32) to every larger integer \(r\),
since \((1+1/r)^{270}\) is decreasing.
The established cycle barrier

\[
r\geq72{,}057{,}431{,}991
\tag{34}
\]

therefore contradicts (32).  We conclude

\[
\boxed{
\begin{gathered}
\text{No primitive nontrivial denominator-one two-level cycle has}\\
\text{exactly four shifted sites, in any run configuration.}
\end{gathered}}
\tag{35}
\]

The same argument excludes every fixed value of \(k\), without a separate
resultant classification by run type.

## 6. Exact certificate and remaining gate

The script
[`cycles/two_level_transition_core_certificate.js`](cycles/two_level_transition_core_certificate.js)
checks the exact base and propagation inequalities in (32)-(33), the
general run identities and level sum in (21)-(23), the binary sharpening,
the exact cylinder modulus in (18), and the rational-mechanical
factor-complexity bound.  These finite checks are regressions for the
displayed proof; they do not replace its all-depth arguments.

The endpoint runs of internal length \(u=0\) or \(u=1\) are included in
(20).  The only quantity required to be nonzero is the difference of the
two colliding-factor start states, and primitivity makes that difference
nonzero.  No resultant is used, and no polynomial is divided by a content.
Thus the endpoint, resultant-nonvanishing, and content issues from the
fixed-support proof program do not arise here.

The theorem leaves two genuine infinite branches.

1. A two-level candidate may have transition count and shifted support of
   order at least \(r/\log r\).
2. A general deformation may have transition count at least of order
   \(\sqrt r\) while using heights outside \(\{0,1\}\).

Thus the fixed-support resultant program is complete in principle, but the
cycle integrality problem is not.  Its surviving content is a growing
transition-cancellation problem.

## 7. The superseded A=23 interval cover

The earlier script `cycles/four_shift_31_A23_interval_cover.js` is not a
dependency of this theorem.  Its slow behavior has two concrete causes.
First, it subdivides the broad historical interval
\([829/342,5/2]\) for \(L/M\), although the established period barrier and
the audited logarithmic convergents confine this ratio to an interval of
width less than \(3\cdot10^{-9}\).  The broad interval makes many Euclidean
quotients unstable on each box.  Second, `exactClose` constructs large
BigInt powers at a grid-scaled exponent tuple whose cache key changes on
most subdivisions.  Thus increasing the grid precision raises the cost of
nearly every certificate attempt.

There is also a mathematical, rather than merely computational, symptom.
With grid scale \(50\), the direct \(M,E,F\) cover has respectively
\(83,708,4996\) residual boxes at depths \(8,12,16\) in the \(c<e\)
order.  These are diagnostic counts only, but they show that the present
anchor ledger does not approach a short zero-residual certificate.  The
transition theorem bypasses that ledger and proves both A=23 residue orders
simultaneously.
