# The three-transition dense core at terminal complement \(b=1\)

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** the complete \(T=3\) height-transition sector is excluded at
every depth. Every such anchored path has the exact run-level sequence
\(0,1,2,0\). The four constant-height return bounds give the analytic
cutoff \(s=1325\), and an exact finite residue certificate excludes every
smaller strict or equality target. The remaining dense core has at least
four height transitions.

## 1. Setup and statement

Put

\[
\alpha:=\log_2 3,
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
e:=N-s.
\tag{2}
\]

An anchored \(b=1\) profile is

\[
0=A_0<A_1<\cdots<A_{s-1}=N-2,
\qquad
A_i\leq B_i.
\tag{3}
\]

Its height path and carry are

\[
h_i:=B_i-A_i,
\qquad
C(A):=\sum_{i=0}^{s-1}3^{s-1-i}2^{A_i}.
\tag{4}
\]

We retain the target equation

\[
Pn+C(A)=M(n+d),
\qquad
n>0\text{ odd},
\qquad
0\leq d\leq d_{\max}:=
\left\lceil\frac{e-1}{2}\right\rceil.
\tag{5}
\]

The value \(d=0\) is the equality target. We call the targets with
\(1\leq d\leq d_{\max}\) strict.

Define

\[
T(A):=\#\{0\leq i\leq s-2:h_{i+1}\neq h_i\}.
\tag{6}
\]

We prove the following theorem.

**Theorem 1.** There is no anchored \(q=2,b=1\) profile with \(T(A)=3\)
which satisfies (5). This includes every strict target and the equality
target at every weight.

## 2. Exact realization and the state bound

We first recall why a target gives the ordinary exact path needed by the
mechanical return argument. Put

\[
C_t:=\sum_{i=0}^{t-1}3^{t-1-i}2^{A_i},
\qquad
x_t:=\frac{3^tn+C_t}{2^{A_t}}.
\tag{7}
\]

Splitting the full numerator at \(t\), then reducing modulo \(2^{A_t}\),
shows that \(x_t\) is an integer. Reduction modulo two after this division
shows that \(x_t\) is odd. Consequently,

\[
x_{t+1}=\frac{3x_t+1}{2^{A_{t+1}-A_t}},
\qquad
v_2(3x_t+1)=A_{t+1}-A_t
\tag{8}
\]

for every \(0\leq t\leq s-2\). Thus every proper exponent is realized
exactly, including when \(d=0\).

Every target in (5) satisfies the established seed estimate

\[
n<153s^{14.3}.
\tag{9}
\]

Put

\[
H_s:=307s^{15}.
\tag{10}
\]

At a vertex of height \(h\), the usual prefix estimate gives

\[
x_t
<2^h\left(2n+\frac{2t}{3}\right)
<2^hH_s.
\tag{11}
\]

There is no fixed-state exception hidden in (11). We have \(B_1=1\), and
strict anchoring forces the first realized exponent to be one. Hence
\(n\neq1\), since \(v_2(3\cdot1+1)=2\). Also \(B_t<t\alpha\) gives
\(x_t>n\) for \(t\geq1\). Therefore, every vertex used below differs from
the fixed point \(1\).

We use the level-sensitive constant-height return bound from the dense-core
report. If a constant-height run at level \(h\) contains \(m\) internal
exponent edges, then

\[
\boxed{2^{\lfloor m/2\rfloor}<2^hH_s.}
\tag{12}
\]

For clarity, the cycle step in this result does not assume that the return
word is primitive. If two selected states were equal, the intervening word
would repeat, and its square would lie in the balanced mechanical run. Its
binary reduction is circularly balanced, so a cyclic conjugate is a power
of a primitive Christoffel word. A positive affine fixed point requires the
total power of two to exceed the corresponding power of three. In that
case, Christoffel integrality excludes an integer fixed point except for a
power of the one-letter word \((2)\), whose state is \(1\). Moreover, if
\(F(x)=ax+b\), then

\[
F^g(x)-x=(1+a+\cdots+a^{g-1})(F(x)-x),
\tag{13}
\]

so a fixed point of an imprimitive power is already a fixed point of the
primitive map. Cyclic conjugacy also causes no loss, since the cycle can be
started at either selected odd state. The state \(1\) was excluded above.
Thus (12) applies to every one of the runs used here.

## 3. Complete classification of \(T=3\)

Put

\[
g_i:=B_{i+1}-B_i\in\{1,2\}.
\tag{14}
\]

Equation (3) gives the exact increment identity

\[
A_{i+1}-A_i=g_i-(h_{i+1}-h_i).
\tag{15}
\]

In particular, every upward height jump has size at most one. Also,
\(h_0=h_{s-1}=0\).

Suppose that \(T(A)=3\). The first nonzero run must have level one. Let
the four run levels be \(0,1,\lambda,0\). The middle transition changes
the level, so \(\lambda\neq1\). We also have \(\lambda\neq0\), since the
last change would then not be a transition. Since the transition out of
level one can rise by at most one, we obtain \(\lambda=2\).

Therefore, there are unique indices

\[
2\leq J<L\leq K\leq s-2
\tag{16}
\]

such that

\[
h_i=
\begin{cases}
0,&0\leq i<J,\\
1,&J\leq i<L,\\
2,&L\leq i\leq K,\\
0,&K+1\leq i\leq s-1.
\end{cases}
\tag{17}
\]

The two upward steps in (17) are strictly anchored precisely when

\[
\boxed{B_J-B_{J-1}=2,
\qquad
B_L-B_{L-1}=2.}
\tag{18}
\]

Indeed, (15) gives increment \(g_i-1\) at each rise, which is positive
precisely when \(g_i=2\). On constant-height edges the increment is
\(g_i>0\), while at the final drop by two it is \(g_i+2>0\). Thus
(16)-(18) are both necessary and sufficient. In particular, the case
\(L=J+1\), the case \(K=L\), and the endpoint drop \(K=s-2\) are all
included. Also, \(J\geq2\) and \(L\geq3\) ensure that the displayed heights
do not exceed \(B_i\). There is no omitted parity or endpoint shape.

This also shows that \(T=3\) is not combinatorially impossible. Its unique
shape is a height-one plateau followed by a height-two plateau, followed by
one drop directly to height zero.

## 4. Exact carry and residue forms

Let \(C_0\) be the carry of the maximal profile \(A_i=B_i\). For the
indices occurring in (17), define

\[
E_i:=2^{B_i-1}3^{s-1-i},
\qquad
F_i:=2^{B_i-2}3^{s-1-i}.
\tag{19}
\]

A height-one cell loses \(E_i\), while a height-two cell loses
\(E_i+F_i\). Hence the complete carry is

\[
\boxed{
C(J,L,K)=C_0-
\sum_{i=J}^K E_i-
\sum_{i=L}^K F_i.}
\tag{20}
\]

Put

\[
U_t:=\sum_{i=1}^tE_i,
\qquad
V_t:=\sum_{i=2}^tF_i,
\tag{21}
\]

with an empty sum equal to zero. Equation (20) becomes

\[
C(J,L,K)=C_0-U_K+U_{J-1}-V_K+V_{L-1}.
\tag{22}
\]

Let \([z]_D\) denote the least residue modulo \(D\), and put

\[
\tau_0:=[C_0M^{-1}]_D,
\qquad
u_t:=[U_tM^{-1}]_D,
\qquad
v_t:=[V_tM^{-1}]_D.
\tag{23}
\]

The exact target residue is therefore

\[
\boxed{
\tau(J,L,K):=
[\tau_0+u_{J-1}+v_{L-1}-u_K-v_K]_D.}
\tag{24}
\]

Since (5) is equivalent to

\[
C(J,L,K)-Md=Dn,
\tag{25}
\]

every target must satisfy

\[
d\equiv\tau(J,L,K)\pmod D.
\tag{26}
\]

The audited target interval is shorter than \(D\), which the certificate
rechecks at every weight. Thus \(\tau=0\) is exactly the equality residue,
while \(1\leq\tau\leq d_{\max}\) is exactly the strict formal residue
interval. We do not filter these residues by positivity or oddness. This
makes a zero formal count stronger than a zero positive-odd count.

## 5. The analytic cutoff

The four runs in (17) have internal edge lengths

\[
m_0:=J-1,
\qquad
m_1:=L-J-1,
\qquad
m_2:=K-L,
\qquad
m_3:=s-K-2.
\tag{27}
\]

They satisfy

\[
m_0+m_1+m_2+m_3=s-4.
\tag{28}
\]

Applying (12) at levels \(0,1,2,0\) gives

\[
\begin{aligned}
2^{\lfloor m_0/2\rfloor}&<H_s,\\
2^{\lfloor m_1/2\rfloor}&<2H_s,\\
2^{\lfloor m_2/2\rfloor}&<4H_s,\\
2^{\lfloor m_3/2\rfloor}&<H_s.
\end{aligned}
\tag{29}
\]

Put \(E:=\sum_{j=0}^3\lfloor m_j/2\rfloor\). Equations (28)-(29) give

\[
2^E<8H_s^4,
\qquad
2E\geq s-8.
\tag{30}
\]

After squaring, every \(T=3\) target must therefore satisfy

\[
\boxed{
2^s<2^{14}H_s^8
=2^{14}\cdot307^8s^{120}.}
\tag{31}
\]

Exact integer arithmetic gives

\[
2^{1325}>2^{14}\cdot307^8\cdot1325^{120},
\tag{32}
\]

while the reverse weak inequality still holds at \(s=1324\). It also gives

\[
2\cdot1325^{120}>1326^{120}.
\tag{33}
\]

Since \(((s+1)/s)^{120}\) decreases with \(s\), equation (33) propagates
the reverse of (31) from \(1325\) to every larger weight. Hence no
\(T=3\) target exists for \(s\geq1325\).

## 6. Exact return pruning below the cutoff

We use all four inequalities in (29), not only their product. For
\(h\in\{0,1,2\}\), define

\[
R_h(s):=
2\left\lfloor\log_2(2^hH_s-1)\right\rfloor+1.
\tag{34}
\]

Since \(2^hH_s\) is an integer, (12) is exactly equivalent to

\[
m\leq R_h(s)
\tag{35}
\]

for a run at level \(h\). Thus every actual target below the cutoff must
satisfy

\[
m_0,m_3\leq R_0(s),
\qquad
m_1\leq R_1(s),
\qquad
m_2\leq R_2(s).
\tag{36}
\]

For fixed \(L\), equations (16), (18), and (36) give the exact finite
ranges

\[
\max(2,L-R_1(s)-1)
\leq J\leq
\min(L-1,R_0(s)+1),
\tag{37}
\]

subject to \(B_J-B_{J-1}=2\), and

\[
\max(L,s-R_0(s)-2)
\leq K\leq
\min(s-2,L+R_2(s)).
\tag{38}
\]

Profiles outside these ranges are not discarded computationally by
heuristic. Under the assumption that they are targets, they contradict the
proved return bound (12).

There is also an exact compression of the remaining residue search. For a
fixed \(L\), put

\[
a_J:=[\tau_0+u_{J-1}+v_{L-1}]_D,
\qquad
w_K:=[u_K+v_K]_D.
\tag{39}
\]

Equation (24) gives

\[
\tau(J,L,K)=[a_J-w_K]_D.
\tag{40}
\]

Consequently,

\[
0\leq\tau(J,L,K)\leq d_{\max}
\quad\Longleftrightarrow\quad
w_K\in[a_J-d_{\max},a_J]\pmod D.
\tag{41}
\]

The certificate sorts the exact BigInt values \(w_K\) in (38), then uses a
circular predecessor query for every \(J\) in (37). This is exactly
equivalent to testing every allowed \(K\). It is not a probabilistic hash,
a floating-point comparison, or a sample.

## 7. Exact finite certificate

The certificate constructs \(B_i\) as one less than the bit length of
\(3^i\), tests (1) and the endpoint identity \(B_{s-1}=N-2\), verifies the
complete classification (16)-(18), and directly checks the carry formula
(20) on all anchored paths through weight twelve. It checks the circular
query independently on \(192031\) finite regression cases.

For every \(q=2\) weight through \(1324\), the certificate uses exact
integer arithmetic for \(C_0,M,D,M^{-1}\), the prefix residues in (23),
the sharp run maxima (34), and the circular interval (41). Its output is

~~~text
finite_max_s=1324
finite_q2_weights=548
classified_T3_profiles=18033915158
return_admissible_T3_profiles=1241473870
residue_pair_queries=8300712
candidate_K_entries=14255754
strict_formal_hits=0
equality_formal_hits=0
analytic_start=1325
regression_weights=9
regression_profiles=100
circular_query_regression_cases=192031
transition_regression=true
carry_regression=true
circular_query_regression=true
analytic_base=true
analytic_propagation=true
transition_three_profiles_excluded_all_depth=true
~~~

The checker is
[`inverse/q2_transition_three_certificate.js`](inverse/q2_transition_three_certificate.js).

The count \(18033915158\) is the complete anchored \(T=3\) sector below the
analytic cutoff. The count \(1241473870\) is the subset which survives all
four necessary return bounds. The residue stage finds no formal target in
that subset. Every positive odd target would belong to the subset by (12),
so this proves Theorem 1.

## 8. Endpoint, parity, and cycle audit

We record the logical dependencies separately.

1. **Anchoring.** Equations (16)-(18) are necessary and sufficient. The
   shortest height-one and height-two runs, and a final drop directly into
   the endpoint, are included.
2. **Equality.** The seed bound, exact realization, state bound, and return
   lemma use only \(d\geq0\). Thus \(d=0\) is not lost in the analytic
   pruning. It is also queried as the residue \(\tau=0\).
3. **Parity and positivity.** Positivity is used to infer an actual exact
   Collatz path and hence (12). After that necessary pruning, the residue
   certificate tests the larger formal interval without imposing
   positivity. Also, \(C(A)-Md\) and \(D\) are both odd, so every integral
   value of \(n\) in (25) is automatically odd. Thus no target can be lost
   through a parity filter.
4. **The fixed point.** The first exact exponent excludes \(n=1\), and all
   later states are larger than \(n\). The repeated-state branch in the
   Sturmian collision therefore cannot terminate at the fixed point \(1\).
5. **Imprimitive and cyclic returns.** Equation (13) handles powers, while
   cyclic conjugacy merely changes the chosen starting state on the same
   odd cycle. The Christoffel exception \((2)^g\) again gives only state
   \(1\).

Thus the analytic cutoff and the finite residue audit cover the same exact
target class, including every endpoint and equality case.

## 9. Consequences and proof ledger

The transition theorem from the dense-core report already gives, for every
fixed \(T\),

\[
2^{s-2T-2}<2^{T(T-1)}H_s^{2T+2}.
\tag{42}
\]

For fixed \(T\), the right side is polynomial in \(s\), so (42) gives an
effective finite analytic cutoff. The present report closes the complete
finite arithmetic sector for \(T=3\). It does not claim that the finite
sectors for every \(T\geq4\) have already been audited.

The following items are closed.

1. Every \(T=3\) anchored path has the exact shape (17), with the exact
   anchoring conditions (18).
2. The complete carry and target residue are (20) and (24).
3. The four mechanical runs give the sharp working inequality (31) and the
   analytic start \(s=1325\).
4. The exact finite certificate excludes all \(s\leq1324\), including
   strict and equality targets.
5. Therefore, every surviving \(q=2,b=1\) dense-core target has
   \(T(A)\geq4\), together with the growing lower bound already proved in
   the dense-core report.

The next localized sector is \(T=4\). Its run-level sequence is not unique,
so it requires a new shape classification before its finite residue form is
chosen.
