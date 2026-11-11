# The binary-height dense core at terminal complement \(b=1\)

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** the binary-height branch is reduced to an exact transition-dense
low-residue problem, but it is not excluded. Every target either contains a
nontrivial positive cycle, or its proper path is simple and satisfies a
finite-prefix entropy inequality. In the latter case the height-transition
density has positive lower limit. Binary alternation and the mechanical
entry constraint sharpen the carry loss to more than \(T/18\). An explicit
dense family satisfies every local, entropy, and scalar carry constraint,
and an exact member exhibits cancellation modulo a proper factor of the full
determinant. Thus a new full-determinant argument is necessary.

## 1. Setup

Put

\[
\alpha:=\log_2 3,
\qquad
\beta:=\alpha-1,
\qquad
B_i:=\lfloor i\alpha\rfloor,
\qquad
N:=\lceil s\alpha\rceil,
\]

and suppose that

\[
N-\lceil(s-1)\alpha\rceil=1.
\tag{1}
\]

Write

\[
M:=2^N,
\qquad
P:=3^s,
\qquad
D:=M-P,
\qquad
H_s:=307s^{15}.
\tag{2}
\]

We consider an anchored profile

\[
0=A_0<A_1<\cdots<A_{s-1}=N-2,
\qquad
A_i\leq B_i,
\tag{3}
\]

whose height path is binary:

\[
h_i:=B_i-A_i\in\{0,1\}.
\tag{4}
\]

Equation (1) gives \(h_0=h_{s-1}=0\). We retain the target equation

\[
Pn+C(A)=M(n+d),
\qquad
0\leq d\leq\left\lceil\frac{N-s-1}{2}\right\rceil,
\tag{5}
\]

where \(n\) is positive and odd. Every proper exponent is realized exactly,
and the established state estimate gives

\[
x_i<2^{h_i}H_s\leq2H_s
\qquad(0\leq i\leq s-1).
\tag{6}
\]

Define

\[
g_i:=B_{i+1}-B_i\in\{1,2\},
\qquad
a_i:=A_{i+1}-A_i=g_i+h_i-h_{i+1},
\tag{7}
\]

and put

\[
T:=\#\{0\leq i\leq s-2:h_{i+1}\neq h_i\},
\qquad
k:=\#\{0\leq i<s:h_i=1\}.
\tag{8}
\]

## 2. The positive-cycle alternative

The equality target already belongs to the positive-cycle branch. Indeed,
if \(d=0\), then (5) gives \(x_s=n\), while every proper state is strictly
larger than \(n\). Thus the target is a positive cycle with least state
\(n\).

Suppose next that \(d>0\). If two proper states satisfy \(x_i=x_j\), with
\(0\leq i<j\leq s-1\), determinism makes the intervening nonempty exact
accelerated word return from \(x_i\) to itself. This is again a nontrivial
positive cycle. Consequently, in the absence of a positive cycle, every
target has \(d>0\) and pairwise distinct proper states.

This distinction is logically necessary. Excluding the case \(d=0\) is
itself a positive-cycle exclusion, rather than a scalar carry estimate.

## 3. Finite-prefix transition entropy

Assume that the proper states are pairwise distinct. Define

\[
L:=\left\lceil\log_2(2H_s)\right\rceil-1,
\qquad
q:=s-L.
\tag{9}
\]

Suppose that \(q>0\). There are \(q\) proper valuation factors of length
\(L\), beginning at the indices \(0,1,\ldots,q-1\).

**Theorem 1.** Either \(T/q>1/2\), or

\[
\boxed{
\log_2 q
\leq
\log_2\bigl(2(L+1)\bigr)
+Lh_2\left(\frac Tq\right),}
\tag{10}
\]

where

\[
h_2(p):=-p\log_2p-(1-p)\log_2(1-p).
\]

**Proof.** Suppose that two length-\(L\) valuation factors agree, and let
\(Q\) be their common exponent sum. The exact odd-cylinder congruence makes
their starting states congruent modulo \(2^{Q+1}\). Since every exponent is
positive, \(Q\geq L\). On the other hand, (6) and (9) give

\[
0<|x_i-x_j|<2H_s\leq2^{L+1}\leq2^{Q+1},
\]

which is impossible. Thus the \(q\) factors are distinct.

Choose the starting index \(J\) uniformly. The mechanical factor
\((g_J,\ldots,g_{J+L-1})\) takes at most \(L+1\) values. It, the initial
height \(h_J\), and the \(L\) transition indicators determine the valuation
factor by (7). Each global transition is counted in at most \(L\) windows.
Therefore the average transition probability over the \(L\) coordinates is
at most \(T/q\). If \(T/q\leq1/2\), entropy subadditivity, concavity, and
monotonicity of \(h_2\) give (10). The other case is the first alternative.
\(\square\)

When the numerator is positive, (10) can be inverted on \([0,1/2]\):

\[
\boxed{
\frac Tq\geq
h_2^{-1}\left(
\frac{\log_2q-\log_2(2(L+1))}{L}
\right),}
\tag{11}
\]

unless \(T/q>1/2\), which is stronger. Since

\[
L=15\log_2s+O(1),
\qquad
q=s-O(\log s),
\]

every unbounded sequence of simple binary targets satisfies

\[
\boxed{
\liminf_{s\to\infty}\frac Ts
\geq c_{15}:=h_2^{-1}(1/15)
=0.0079202929\ldots.}
\tag{12}
\]

There is also a completely explicit large-depth version.

**Corollary 2.** If \(s\geq2^{42}\), then every simple binary target
satisfies

\[
\boxed{T>\frac q{193}>\frac s{386}.}
\tag{13}
\]

**Proof.** Put \(x:=\log_2s\). Since \(614<2^{10}\), we have

\[
L<15x+10,
\qquad
L+1<15x+11.
\]

For \(x\geq42\), the first inequality gives \(q>s/2\). If
\(T/q\leq1/193\), then (10) and the established exact bound

\[
h_2(1/193)<\frac{117}{2500}
\]

would give

\[
x-1<
\log_2\bigl(2(15x+11)\bigr)
+\frac{117}{2500}(15x+10).
\tag{14}
\]

At \(x=42\), the right side is smaller than

\[
11+\frac{117}{2500}\,640
=40.952<41.
\]

The left side minus the right side in (14) is strictly increasing for
\(x\geq42\), since \(\log 2>2/3\) gives derivative larger than

\[
1-\frac{351}{500}-\frac{45}{2(15\cdot42+11)}>0.
\]

This contradiction proves \(T>q/193\), and \(q>s/2\) gives (13).
\(\square\)

## 4. Binary alternation and the sharpened carry loss

The transitions alternate between rises and falls, so \(T\) is even. Put
\(R:=T/2\), the number of height-one runs. Every such run contains at least
one shifted site, and hence

\[
T=2R\leq2k.
\tag{15}
\]

There is additional information at the first cell of each run. A rise from
height zero to height one has

\[
a_i=g_i-1>0,
\]

so necessarily

\[
\boxed{g_i=2,\qquad a_i=1.}
\tag{16}
\]

Write \(\theta_i:=\{i\alpha\}\) and

\[
u_i:=\frac{2^{B_i}3^{s-1-i}}P
=\frac13,2^{-\theta_i}.
\tag{17}
\]

If the run begins at the vertex \(i+1\), then \(g_i=2\) implies

\[
0\leq\theta_{i+1}<\beta.
\]

Thus its entry cell has

\[
u_{i+1}>\frac13,2^{-\beta}=\frac29.
\]

A binary shifted cell loses \(u_i/2\) from the normalized maximal carry.
Every entry cell therefore loses more than \(1/9\), while every other
shifted cell loses more than \(1/12\). We obtain the exact structural
estimate

\[
\boxed{
\frac{C_0-C(A)}P
>\frac{k}{12}+\frac{T}{72}
\geq\frac{T}{18}.}
\tag{18}
\]

The twelve-cell maximal-carry bound gives

\[
\frac{C_0}{P}<\frac s4+\frac{11}{12}.
\tag{19}
\]

Since (5) is equivalent to \(C(A)=Dn+Md\), every target, including
\(d=0\), satisfies \(d<C(A)/P\). Combining (18) and (19) gives

\[
\boxed{
d<\frac{C(A)}P
<\frac s4+\frac{11}{12}-\frac{T}{18}.}
\tag{20}
\]

In particular, (12) gives the asymptotic restriction

\[
\limsup\frac ds
\leq\frac14-\frac{c_{15}}{18}
=0.2495599837\ldots,
\tag{21}
\]

along any unbounded sequence of simple targets. The explicit bound (13)
gives

\[
d<\frac s4+\frac{11}{12}-\frac{s}{6948}
\qquad(s\geq2^{42}).
\tag{22}
\]

These inequalities remove a linear upper band of strict targets, but they
do not contradict a small positive \(d\). They give no contradiction for
\(d=0\).

## 5. The exact residue and the run-sum no-go

The target interval is shorter than \(D\). Thus (5) gives the exact least
residue

\[
\boxed{
\tau(A):=[C(A)M^{-1}]_D=d.}
\tag{23}
\]

In particular,

\[
\boxed{d=0\quad\Longleftrightarrow\quad D\mid C(A).}
\tag{24}
\]

Equations (20) and (23) isolate the remaining problem precisely. The carry
must be small enough in the real coordinate and simultaneously occupy a
short interval in the complete determinant coordinate.

There is an exact run decomposition, but it does not telescope
multiplicatively. If the height-one runs are \([J_r,K_r]\), then

\[
C(A)=C_0-\sum_r L_{J_r,K_r},
\tag{25}
\]

where

\[
\boxed{
L_{J,K}
=2^{B_J-1}3^{s-1-K}
\sum_{i=J}^{K}3^{K-i}2^{B_i-B_J}.}
\tag{26}
\]

The inner sum is the exact carry of the mechanical run. The outer powers of
two and three are units modulo \(D\). Nevertheless, the target condition is
the additive congruence

\[
C_0-Md-\sum_rL_{J_r,K_r}\equiv0\pmod D.
\tag{27}
\]

Thus a nonvanishing resultant for each individual run does not control the
sum. Endpoint factorization alone supplies no sign or complete-determinant
divisibility theorem.

## 6. An exact dense obstruction family

We now construct profiles showing that transition density and scalar carry
cannot close the branch. For every weight satisfying (1), let

\[
E_s:=\{1\leq i\leq s-2:g_{i-1}=2\}
=\{e_1<e_2<\cdots<e_U\}.
\]

Set

\[
h_{e_1}=h_{e_3}=h_{e_5}=\cdots=1,
\qquad
h_i=0\quad\text{otherwise}.
\tag{28}
\]

The selected vertices are pairwise nonadjacent, since
\(e_{j+2}\geq e_j+2\). Hence every one is an isolated height-one run. Its
entry crosses a gap of two, so (16) holds and (28) is an anchored binary
profile. Moreover,

\[
U=B_{s-2}-(s-2),
\qquad
k=\left\lceil\frac U2\right\rceil,
\qquad
T=2k,
\]

and therefore

\[
\boxed{\frac Ts\longrightarrow\beta=\log_2 3-1>\frac12.}
\tag{29}
\]

Every carry cell in this family contributes more than \(1/12\), even after
the binary shift. Consequently,

\[
\boxed{\frac{C(A)}P>\frac s{12}.}
\tag{30}
\]

Thus this family lies in the high-transition alternative of Theorem 1 and
retains linear positive carry. If one of these profiles is a target, the
only remaining test is the complete low residue (23). This is an exact
obstruction to closing the branch by entropy, entry counting, or scalar
carry alone. It is not asserted that every member is a target.

There is also exact proper-factor cancellation in this family. At

\[
s=150,
\qquad
N=238,
\qquad
T=86,
\qquad
d=0,
\]

the construction in (28) gives

\[
\begin{aligned}
D={}&71723281159469109471123592734032984770397873829181765715217145021406695,\\
C(A)={}&11223413602694402415397674168974525261357442348308247832762587904890149905.
\end{aligned}
\tag{31}
\]

Exact arithmetic gives

\[
\boxed{
\gcd(D,C(A))=5,
\qquad
\frac D5
=14344656231893821894224718546806596954079574765836353143043429004281339.}
\tag{32}
\]

The full determinant does not divide the carry. Thus (31) is not an
equality target. It proves instead that a transition-dense sum of isolated
run contributions can cancel exactly modulo a proper determinant factor.
Any resultant closure must control every prime-power component of \(D\)
simultaneously.

## 7. Uniform dichotomy and proof ledger

Every binary-height \(q=2,b=1\) target satisfies exactly one of the
following alternatives.

1. The target contains a nontrivial positive cycle. This always occurs when
   \(d=0\), and it occurs for \(d>0\) whenever the proper path is not simple.
2. We have \(d>0\), the proper path is simple, the finite-prefix entropy
   inequality (10) holds, the binary carry inequality (20) holds, and the
   exact low-residue equation is (23). In particular, (12), (13), (21), and
   (22) hold at the stated depths.

The following statements are proved.

1. Finite-prefix factor distinctness converts the polynomial state envelope
   into the exact entropy inequality (10).
2. Every unbounded simple binary target sequence has positive linear
   transition density, with the explicit constants in (12) and (13).
3. Binary alternation and mechanical gap-two entry improve the normalized
   carry loss from \(T/24\) to \(T/18\).
4. Equality is retained exactly as the residue \(\tau=0\), and is precisely
   the positive-cycle alternative.
5. The dense family (28) satisfies every local and scalar constraint, while
   (31)-(32) exhibit exact proper-factor cancellation.

The binary-height branch is therefore not excluded. The remaining theorem
would have to rule out (23) at the complete determinant in the
transition-dense simple branch, while also excluding the positive-cycle
alternative. No fixed-transition enumeration is used here.

The accompanying exact arithmetic checker is
[`inverse/q2_binary_height_dense_certificate.js`](inverse/q2_binary_height_dense_certificate.js).
