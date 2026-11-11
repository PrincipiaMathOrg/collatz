# The singleton first-defect gate at terminal complement \(b=1\)

**Date:** 17 August 2026  
**Mode:** SOLVE  
**Status:** every profile at Hamming distance one from the maximal
prefix-barrier profile is excluded at every depth. This includes strict
targets and the equality target. The exact first-defect perturbation is also
derived for an arbitrary later tail. The remaining branch has at least two
defective carry cells.

## 1. Statement

Put

\[
\alpha:=\log _2 3,
\qquad
B_i:=\lfloor i\alpha\rfloor,
\qquad
N:=\lceil s\alpha\rceil,
\]

and suppose that the row multiplier is two,

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
\]

At terminal complement \(b=1\), an anchored profile has

\[
0=A_0<A_1<\cdots<A_{s-1}=N-2,
\qquad
A_i\leq B_i.
\tag{2}
\]

Its carry is

\[
C(A):=\sum_{i=0}^{s-1}3^{s-1-i}2^{A_i}.
\tag{3}
\]

We call the profile a **singleton first defect** if there is an index
\(J\), with \(1\leq J\leq s-2\), such that

\[
A_J=B_J-1,
\qquad
A_i=B_i\quad(i\neq J).
\tag{4}
\]

We prove the following theorem.

**Theorem 1.** No singleton first-defect profile has positive odd integers
\(n\) and an integer

\[
0\leq d\leq\left\lceil\frac{e-1}{2}\right\rceil
\tag{5}
\]

such that

\[
Pn+C(A)=M(n+d).
\tag{6}
\]

Thus the equality target \(d=0\) and every strict no-wrap target are
excluded at all depths in this sector.

## 2. The exact first-defect perturbation

We begin with an arbitrary profile in (2). Define its deformation heights
by

\[
h_i:=B_i-A_i\geq0.
\tag{7}
\]

Equation (1) gives \(B_{s-1}=N-2\), so

\[
h_0=h_{s-1}=0.
\tag{8}
\]

Let \(J\) be the first index for which \(h_J>0\). Since the positions in
(2) are strictly increasing,

\[
h_J-h_{J-1}
\leq B_J-B_{J-1}-1.
\tag{9}
\]

The right side belongs to \(\{0,1\}\), while \(h_{J-1}=0\). Consequently,

\[
\boxed{h_J=1,
\qquad B_J-B_{J-1}=2.}
\tag{10}
\]

In other words, the first defect is always one left transposition across a
maximal gap of two. This conclusion does not assume that the later profile
is a singleton.

Let \(C_0\) be the carry of the maximal profile \(A_i=B_i\), and put

\[
E_J:=2^{B_J-1}3^{s-1-J}.
\tag{11}
\]

For the arbitrary later tail, define

\[
R_J:=
\sum_{i=J+1}^{s-1}
\left(2^{B_i}-2^{B_i-h_i}\right)3^{s-1-i}.
\tag{12}
\]

Direct subtraction in (3) gives the exact carry identity

\[
\boxed{C(A)=C_0-E_J-R_J.}
\tag{13}
\]

The term \(E_J\) is the forced first-defect cell, while \(R_J\geq0\) is
the post-defect tail residual. The singleton sector is exactly \(R_J=0\).

We also record both residue coordinates. For an integer \(x\), let
\([x]_m\) denote its least nonnegative residue modulo \(m\), and define

\[
\rho_0:=[C_0D^{-1}]_M,
\qquad
\tau_0:=[C_0M^{-1}]_D,
\tag{14}
\]

\[
L_J:=[E_JP^{-1}]_M,
\qquad
V_J:=[E_JM^{-1}]_D,
\qquad
W_J:=[R_JM^{-1}]_D.
\tag{15}
\]

Since \(D\equiv-P\pmod M\), equation (13) gives

\[
\boxed{
[C(A)D^{-1}]_M=[\rho_0+L_J+R_JP^{-1}]_M.}
\tag{16}
\]

The reduced-modulus coordinate is

\[
\boxed{
[C(A)M^{-1}]_D=[\tau_0-V_J-W_J]_D.}
\tag{17}
\]

In particular, the singleton update is the paired transposition

\[
\rho_J=[\rho_0+L_J]_M,
\qquad
\tau_J=[\tau_0-V_J]_D.
\tag{18}
\]

This is the exact residue perturbation requested by the first-defect gate.
It also identifies the next residual precisely: a nonsingleton profile has
the additional nonzero term \(W_J\).

## 3. Formal congruences and realized paths

Equation (6) is equivalent to

\[
C(A)-Pd=D(n+d)
\tag{19}
\]

and therefore implies the formal congruence

\[
\boxed{d\equiv[C(A)M^{-1}]_D\pmod D.}
\tag{20}
\]

The interval in (5) is shorter than \(D\), so the least residue in (20)
decides every formal target at once. A formal target is not automatically a
realized positive orbit. Positivity also requires

\[
n=\frac{C(A)-Md}{D}>0.
\tag{21}
\]

Our finite certificate below excludes the formal congruence itself.

We now record the bridge needed for the large-depth argument. Suppose that
positive odd \(n\) and an integer \(d\) satisfy (6). For
\(0\leq t\leq s\), put

\[
C_t:=\sum_{i=0}^{t-1}3^{t-1-i}2^{A_i},
\qquad
F_t:=3^tn+C_t.
\]

For \(0\leq t\leq s-1\), splitting the full numerator at the index
\(t\) gives

\[
F_s
=3^{s-t}F_t+
\sum_{i=t}^{s-1}3^{s-1-i}2^{A_i}.
\]

Since \(2^N\mid F_s\), reduction modulo \(2^{A_t}\) first shows that
\(2^{A_t}\mid F_t\). Write \(x_t:=F_t/2^{A_t}\). Since the positions
\(A_i\) are strictly increasing, reduction modulo \(2^{A_t+1}\) leaves
only the first term and the summand with \(i=t\). Therefore,

\[
3^{s-t}x_t+3^{s-1-t}\equiv0\pmod2,
\]

so \(x_t\) is odd. Finally, for \(0\leq t\leq s-2\),

\[
x_{t+1}
=\frac{3x_t+1}{2^{A_{t+1}-A_t}}
\]

and \(x_{t+1}\) is odd. Thus every proper exponent
\(A_{t+1}-A_t\) is the exact valuation of the corresponding positive
Collatz step. The endpoint \(x_s=n+d\) may be even, but no later argument
uses the exactness of the terminal exponent \(N-A_{s-1}\).

Moreover, \(A_t\leq B_t<t\alpha\) for \(1\leq t\leq s-1\). Hence

\[
x_t=\frac{3^t}{2^{A_t}}n+\frac{C_t}{2^{A_t}}>n.
\]

In particular, every proper state used below is an exact odd state and is
strictly larger than the positive start. This closes the distinction
between a formal profile and the realized proper path needed in the proof.

## 4. The undamaged Sturmian tail

Assume now that the defect is a singleton. Let

\[
a_i:=A_{i+1}-A_i\quad(0\leq i\leq s-2),
\qquad
a_{s-1}:=N-A_{s-1}=2.
\tag{22}
\]

The defect changes only the two adjacent exponents

\[
a_{J-1}=B_J-B_{J-1}-1=1,
\qquad
a_J=B_{J+1}-B_J+1.
\tag{23}
\]

For every \(i\geq J+1\), with \(i\leq s-2\), we have

\[
a_i=B_{i+1}-B_i.
\tag{24}
\]

Put \(\beta:=\alpha-1\). Then

\[
B_{i+1}-B_i
=1+\lfloor(i+1)\beta\rfloor-\lfloor i\beta\rfloor.
\tag{25}
\]

Thus the \(m:=s-J-2\) exponents beginning at the odd state \(x_{J+1}\)
form a factor of the irrational lower-mechanical word of slope \(\beta\),
under the coding \(0\mapsto1\), \(1\mapsto2\).

We use two elementary properties of this word. Its factors of length
\(L\) occupy at most \(L+1\) classes, and it is balanced. Indeed, the
length-\(L\) factors are determined by the position of the rotation phase
among the \(L+1\) cut points, while the number of ones in a factor beginning
at \(t\) is

\[
\lfloor(t+L)\beta\rfloor-\lfloor t\beta\rfloor
\in\{\lfloor L\beta\rfloor,\lceil L\beta\rceil\}.
\tag{26}
\]

We will also need a uniform height estimate along the undamaged tail. For
every \(J+1\leq t\leq s-1\), we have \(A_t=B_t\). The prefix-state formula
and the prefix barrier give

\[
\begin{aligned}
x_t
&=\frac{3^tn+C_t}{2^{B_t}},\\
C_t
&=\sum_{i=0}^{t-1}3^{t-1-i}2^{A_i}
\leq t3^{t-1}.
\end{aligned}
\tag{27}
\]

Since \(2^{B_t}>3^t/2\), it follows that

\[
\boxed{x_t<2n+\frac{2t}{3}.}
\tag{28}
\]

Every target in (5), including equality, satisfies the established height
bound

\[
n<153s^{14.3}.
\tag{29}
\]

Consequently every state used below satisfies

\[
\boxed{x_t<307s^{15}.}
\tag{30}
\]

## 5. The cycle loophole closes inside a Sturmian square

The dyadic return lattice separates two distinct states which realize the
same valuation factor. We first prove that the states selected below cannot
coincide.

**Lemma 2.** Let \(u\) be a nonempty word over \(\{1,2\}\). If \(u^2\) is
a factor of the mechanical word in (25), then \(u\) cannot be the valuation
word of a nontrivial positive integer cycle.

**Proof.** Replace every letter of \(u\) by \(u_i-1\), obtaining a binary
word \(w\) of length \(q\), with \(p\) ones. Every cyclic factor of \(w\)
of length at most \(q\) occurs in \(w^2\). Since \(w^2\) is a factor of
the balanced irrational mechanical word, any two cyclic factors of \(w\)
of the same length differ in their number of ones by at most one. Thus
\(w\) is circularly balanced.

The one-letter cases can be disposed of immediately. The word \((1)\) is
contracting and has no positive fixed point, while \((2)\) has the unique
fixed point \(1\). We may therefore suppose that \(q\geq2\). The cases
\(p=0\) and \(p=q\) similarly give a power of \((1)\) or \((2)\),
respectively. The first has no positive cycle, and the second gives only
the fixed point \(1\). It remains to consider \(0<p<q\).

Extend \(w\) periodically, let \(S(k)\) count the ones between a fixed
origin and \(k\), and put

\[
F(k):=qS(k)-pk.
\tag{31}
\]

We have \(F(k+q)=F(k)\). Choose \(k_0\) at which \(F\) is maximal over one
period. For every \(0\leq r\leq q\), the number \(T(r)\) of ones in the
length-\(r\) prefix from this cyclic start satisfies

\[
qT(r)-pr\leq0.
\tag{32}
\]

Indeed, the left side is \(F(k_0+r)-F(k_0)\). On the other hand, the average
number of ones in a length-\(r\) cyclic factor is \(rp/q\), since each one
is counted at exactly \(r\) of the \(q\) starts. Circular balance therefore
shows that every such count is either \(\lfloor rp/q\rfloor\) or
\(\lceil rp/q\rceil\). Combining this observation with (32), we obtain

\[
T(r)=\left\lfloor\frac{rp}{q}\right\rfloor.
\tag{33}
\]

Thus a cyclic conjugate of \(w\) is the rational lower-mechanical word of
slope \(p/q\). Under the map \(0\mapsto1\), \(1\mapsto2\), its shortcut
one positions are

\[
r+\left\lfloor\frac{rp}{q}\right\rfloor
=\left\lfloor\frac{r(q+p)}q\right\rfloor.
\tag{34}
\]

Put \(g:=\gcd(p,q)\), \(p=gp_0\), and \(q=gq_0\). The word in (33) is the
\(g\)-th power of the primitive rational lower-mechanical word of slope
\(p_0/q_0\). Indeed, its letter differences have period \(q_0\), since

\[
\left\lfloor\frac{(r+q_0)p}{q}\right\rfloor
=\left\lfloor\frac{rp}{q}\right\rfloor+p_0.
\]

The reduced word is primitive because \(\gcd(p_0,q_0)=1\). Consequently,
\(u\) is a cyclic conjugate of a power of a primitive accelerated
Christoffel word. This includes the imprimitive case, rather than silently
assuming \(\gcd(p,q)=1\).

A positive cycle would require \(2^{q+p}>3^q\). Under this necessary
inequality, the Christoffel integrality theorem applies at the reduced slope
and with the complete cyclotomic cofactor. It says that a Christoffel power
gives an integer cycle only when it is \((2)^g\), which was already treated
above and gives the fixed point \(1\). Cyclic conjugacy causes no loss here,
since an integer cycle may be started at any of its odd states. Thus no
nontrivial positive integer cycle is possible. \(\square\)

Every proper prefix state of a first-crossing path is strictly larger than
its positive start \(n\). Since the tail begins after at least one odd
step, none of its states can be the fixed point \(1\). Lemma 2 therefore
excludes equality between two tail states whenever the intervening cycle
word occurs twice within the mechanical tail.

## 6. Factor collision and the analytic cutoff

Let

\[
L:=\left\lfloor\frac{m-2}{2}\right\rfloor,
\qquad
m=s-J-2.
\tag{35}
\]

Suppose first that \(L\geq1\). Consider the \(L+2\) length-\(L\) factors
which begin at offsets \(0,1,\ldots,L+1\) in the mechanical tail. There are
at most \(L+1\) distinct factors, so two of them agree. Let their state
indices be \(j<k\), and put \(r:=k-j\). We have \(r\leq L+1\).

If \(x_j=x_k\), determinism makes the intervening valuation word periodic.
Moreover,

\[
2L+2\leq m
\tag{36}
\]

and the two selected starts both have offset at most \(L+1\). Hence two
complete copies of the intervening word lie inside the mechanical tail. To
check the boundary explicitly, write the two offsets as
\(0\leq r_1<r_2\leq L+1\), so that \(r=r_2-r_1\). The exclusive endpoint
of the doubled cycle word has tail offset

\[
r_1+2r=2r_2-r_1\leq2L+2\leq m.
\tag{37}
\]

Thus its final state has global index at most \(s-1\), and every letter of
the square belongs to the undamaged exponent interval
\(J+1,\ldots,s-2\).
Lemma 2 excludes the resulting nontrivial cycle. Thus \(x_j\neq x_k\).

Let \(Q\) be the total exponent of the common length-\(L\) factor. The exact
dyadic cylinder theorem gives

\[
2^{Q+1}\mid x_k-x_j.
\tag{38}
\]

Since \(Q\geq L\), equations (30) and (38) give

\[
\boxed{2^{L+1}<307s^{15}.}
\tag{39}
\]

We now combine this with the maximal-prefix departure theorem. Every
surviving \(b=1\) profile satisfies

\[
J<8\log_{4/3}(461s^{15})+2.
\tag{40}
\]

From (35),

\[
L+1>\frac{s-J-4}{2}.
\]

Equation (39) consequently implies

\[
2^s<16\,2^J307^2s^{30}.
\tag{41}
\]

Since

\[
2<\left(\frac43\right)^3,
\qquad
\left(\frac43\right)^6<6,
\]

equation (40) gives

\[
2^J<6\cdot461^{24}s^{360}.
\tag{42}
\]

Combining (41) and (42), every large singleton target would have to satisfy

\[
\boxed{
2^s<96\cdot307^2\cdot461^{24}s^{390}.}
\tag{43}
\]

The exact certificate verifies the reverse strict inequality at \(s=5032\),

\[
2^{5032}>
96\cdot307^2\cdot461^{24}\cdot5032^{390},
\tag{44}
\]

as well as

\[
2\cdot5032^{390}>5033^{390}.
\tag{45}
\]

The ratio \((1+1/s)^{390}\) decreases with \(s\), so (44) propagates by
(45). For completeness, the assumption \(L\geq1\) is independent of the
factor-collision argument. The propagated form of (44), together with the
independent estimate (42), gives

\[
2^{s-6}
>\frac32\,307^2\,461^{24}s^{390}
>6\cdot461^{24}s^{360}
>2^J.
\]

Thus \(s>J+6\) and \(L\geq1\) throughout this range. Equations (43) and
(44) are contradictory for every \(s\geq5032\).

## 7. Exact finite certificate

It remains to check \(s\leq5031\). The certificate constructs

\[
B_i=\lfloor i\log_2 3\rfloor
\]

exactly as one less than the bit length of \(3^i\). It retains precisely
the indices \(J\) for which \(B_J-B_{J-1}=2\), subtracts the exact cell
\(E_J\) in (11), and computes the least target residue in (20). It checks
the complete interval (5), including \(d=0\). Its output is

~~~text
finite_max_s=5031
finite_q2_weights=2088
eligible_singleton_profiles=3070699
strict_formal_hits=0
equality_formal_hits=0
analytic_start=5032
analytic_base=true
analytic_propagation=true
singleton_first_defect_excluded_all_depth=true
~~~

The checker is
[`inverse/q2_first_defect_certificate.js`](inverse/q2_first_defect_certificate.js).
The diagnostic
[`inverse/q2_first_defect_probe.js`](inverse/q2_first_defect_probe.js)
separately records formal residues, endpoint positivity, and positive odd
starting seeds. Section 3 identifies the exact proper path forced by the
last condition.

## 8. Proof ledger

The following items are closed.

1. The first defect is necessarily a one-place left transposition at an
   index satisfying \(B_J-B_{J-1}=2\).
2. The exact arbitrary-tail carry perturbation is (13), with the first cell
   \(E_J\) and the named post-defect residual \(R_J\).
3. The binary and reduced-modulus residue perturbations are (16)-(18).
4. A formal target congruence is distinguished from positivity by
   (20)-(21), while the endpoint equation itself forces every proper profile
   exponent to be an exact odd Collatz valuation.
5. A singleton defect leaves an undamaged Sturmian valuation tail of length
   \(s-J-2\).
6. The only cycle word whose square can occur in this tail is a Christoffel
   word, and Christoffel integrality reduces it to the trivial fixed point.
7. Sturmian factor complexity and the dyadic cylinder lattice exclude every
   singleton target for \(s\geq5032\).
8. Exact residue evaluation excludes every smaller singleton target,
   including equality.

The following items remain open.

1. A profile with \(R_J>0\) may damage the later mechanical tail at further
   indices. The present factor-collision argument applies only after the last
   defect, and no all-depth bound for that last defect is known.
2. The next exact sector consists of profiles with at least two defective
   carry cells. Its residue gate is (17) with \(W_J\neq0\).
3. No conclusion about every \(q=2\) profile, every divergent orbit, or every
   nontrivial cycle follows from the singleton theorem alone.
