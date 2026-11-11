# The four-transition dense core at terminal complement \(b=1\)

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** the complete \(T=4\) height-transition sector is excluded at
every depth. There are exactly three run-level sequences,
\(0,1,0,1,0\), \(0,1,2,1,0\), and \(0,1,2,3,0\). Their level-sensitive
mechanical return bounds give analytic starts \(1708\), \(1712\), and
\(1717\), respectively. An exact meet-in-the-middle residue certificate
excludes every smaller strict or equality target without enumerating raw
profiles. Thus every surviving \(q=2,b=1\) dense-core target has at least
five height transitions.

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

The target \(d=0\) is the equality target. The targets with
\(1\leq d\leq d_{\max}\) are strict. Define

\[
T(A):=\#\{0\leq i\leq s-2:h_{i+1}\neq h_i\}.
\tag{6}
\]

We prove the following theorem.

**Theorem 1.** There is no anchored \(q=2,b=1\) profile with \(T(A)=4\)
which satisfies (5). This includes every strict target and the equality
target at every weight.

## 2. Exact realization and the mechanical return bound

We first record why every positive target gives the exact path required by
the return argument. Put

\[
C_t:=\sum_{i=0}^{t-1}3^{t-1-i}2^{A_i},
\qquad
x_t:=\frac{3^tn+C_t}{2^{A_t}}.
\tag{7}
\]

Splitting the full numerator in (5) at \(t\), then reducing modulo
\(2^{A_t}\), shows that \(x_t\) is an integer. Reducing once more modulo
two shows that \(x_t\) is odd. Consequently,

\[
x_{t+1}=\frac{3x_t+1}{2^{A_{t+1}-A_t}},
\qquad
v_2(3x_t+1)=A_{t+1}-A_t
\tag{8}
\]

for every \(0\leq t\leq s-2\). This argument only uses the divisibility
in (5), so it includes \(d=0\).

Every target also satisfies the established seed estimate

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
x_t<2^h\left(2n+\frac{2t}{3}\right)<2^hH_s.
\tag{11}
\]

There is no fixed-state exception in this estimate. Indeed,
\(B_1=1\), so anchoring forces \(A_1=1\). Exact realization then gives
\(n\neq1\), since \(v_2(3\cdot1+1)=2\). Also, \(B_t<t\alpha\) gives
\(x_t>n\) for every \(t\geq1\). Thus none of the states used below is
the fixed point \(1\).

We use the following level-sensitive return bound.

**Lemma 2.** If a constant-height run at level \(h\) contains \(m\)
internal exponent edges, then

\[
\boxed{2^{\lfloor m/2\rfloor}<2^hH_s.}
\tag{12}
\]

We recall the fixed-point step in the proof, since it is important here.
The Sturmian collision argument selects two equal mechanical factors. If
their starting states were equal, the intervening return word would
repeat, and its square would remain inside the constant-height run. Its
binary reduction is circularly balanced, so a cyclic conjugate is a power
of a primitive Christoffel word. A contracting affine return has no
positive fixed point. For an expanding return, Christoffel integrality
excludes an integral fixed point except for a power of the one-letter word
\((2)\), whose fixed state is \(1\).

This conclusion does not assume that the return word is primitive. If
\(F(x)=ax+b\), then

\[
F^g(x)-x=(1+a+\cdots+a^{g-1})(F(x)-x).
\tag{13}
\]

Therefore, a fixed point of an imprimitive power is already a fixed point
of the primitive map. Cyclic conjugacy merely changes the chosen starting
state on the same odd cycle. The state \(1\) was excluded above. The two
selected states are therefore distinct, and the odd dyadic cylinder
estimate proves (12), exactly as in the three-transition argument.

## 3. Complete classification of \(T=4\)

Put

\[
g_i:=B_{i+1}-B_i\in\{1,2\}.
\tag{14}
\]

Strict increase in (3) gives

\[
A_{i+1}-A_i=g_i-(h_{i+1}-h_i)>0.
\tag{15}
\]

Thus every upward height jump has size at most one. Downward jumps can
have arbitrary positive size. Also, \(h_0=h_{s-1}=0\).

Suppose that \(T(A)=4\), and let the five run levels be
\(0,\lambda_1,\lambda_2,\lambda_3,0\). The first transition must rise,
so \(\lambda_1=1\). Since adjacent run levels differ,
\(\lambda_2\in\{0,2\}\).

If \(\lambda_2=0\), then the next transition must rise to one. This gives

\[
(0,1,0,1,0).
\tag{16}
\]

If \(\lambda_2=2\), then \(\lambda_3\neq0,2\). A rise can only reach
three, while a fall can only end at the remaining positive level one.
This gives

\[
(0,1,2,1,0)
\qquad\text{or}\qquad
(0,1,2,3,0).
\tag{17}
\]

There are no other cases.

More precisely, there are unique indices

\[
1\leq J<L<R\leq K\leq s-2
\tag{18}
\]

at which the five runs begin and end. For the first shape, the height path
is one on \([J,L-1]\cup[R,K]\) and zero elsewhere. Its exact anchoring
conditions are

\[
\boxed{g_{J-1}=g_{R-1}=2.}
\tag{19}
\]

For the second shape, the heights on the three nonzero runs are one, two,
and one. Its exact anchoring conditions are

\[
\boxed{g_{J-1}=g_{L-1}=2.}
\tag{20}
\]

For the third shape, the heights on the three nonzero runs are one, two,
and three. Its exact anchoring conditions are

\[
\boxed{g_{J-1}=g_{L-1}=g_{R-1}=2.}
\tag{21}
\]

Indeed, every displayed rise has size one, so (15) is positive precisely
when the corresponding mechanical gap is two. Constant-height edges have
increment \(g_i>0\), while every downward transition has increment larger
than \(g_i\). Thus (18) together with (19), (20), or (21) is both
necessary and sufficient.

In particular, adjacent transitions are included. The cases \(L=J+1\),
\(R=L+1\), \(K=R\), and \(K=s-2\) are not exceptional. They correspond
to constant-height runs with zero internal edges.

## 4. Exact carry and residue representations

Let \(C_0\) be the carry of the maximal profile \(A_i=B_i\). Define

\[
E_i:=2^{B_i-1}3^{s-1-i},
\qquad
F_i:=2^{B_i-2}3^{s-1-i},
\qquad
G_i:=2^{B_i-3}3^{s-1-i},
\tag{22}
\]

whenever the displayed exponent is nonnegative, and put

\[
U_t:=\sum_{i=1}^tE_i,
\qquad
V_t:=\sum_{i=2}^tF_i,
\qquad
W_t:=\sum_{i=2}^tG_i.
\tag{23}
\]

An empty sum is zero. A cell of height one loses \(E_i\), a cell of
height two loses \(E_i+F_i\), and a cell of height three loses
\(E_i+F_i+G_i\). Hence the three exact carry formulas are

\[
\boxed{
C_{01010}=C_0+U_{J-1}-U_{L-1}+U_{R-1}-U_K,}
\tag{24}
\]

\[
\boxed{
C_{01210}=C_0+U_{J-1}-U_K+V_{L-1}-V_{R-1},}
\tag{25}
\]

and

\[
\boxed{
C_{01230}=C_0+U_{J-1}-U_K+V_{L-1}-V_K+W_{R-1}-W_K.}
\tag{26}
\]

Let \([z]_D\) denote the least residue modulo \(D\), and put

\[
\tau_0:=[C_0M^{-1}]_D,
\qquad
u_t:=[U_tM^{-1}]_D,
\qquad
v_t:=[V_tM^{-1}]_D,
\qquad
w_t:=[W_tM^{-1}]_D.
\tag{27}
\]

Equations (24)-(26) give the corresponding target residues

\[
\tau_{01010}
:=[\tau_0+u_{J-1}-u_{L-1}+u_{R-1}-u_K]_D,
\tag{28}
\]

\[
\tau_{01210}
:=[\tau_0+u_{J-1}-u_K+v_{L-1}-v_{R-1}]_D,
\tag{29}
\]

and

\[
\tau_{01230}
:=[\tau_0+u_{J-1}-u_K+v_{L-1}-v_K+w_{R-1}-w_K]_D.
\tag{30}
\]

Indeed, (5) is equivalent to

\[
C(A)-Md=Dn.
\tag{31}
\]

Thus every target satisfies \(d\equiv C(A)M^{-1}\pmod D\). The
certificate checks \(d_{\max}<D\) at every weight. Consequently,
\(\tau=0\) is exactly the equality residue, while
\(1\leq\tau\leq d_{\max}\) is exactly the strict formal residue interval.

## 5. Shape-sensitive analytic cutoffs

Define the five internal run lengths by

\[
\begin{aligned}
m_0&:=J-1, & m_1&:=L-J-1, & m_2&:=R-L-1,\\
m_3&:=K-R, & m_4&:=s-K-2.
\end{aligned}
\tag{32}
\]

They are nonnegative and satisfy

\[
m_0+m_1+m_2+m_3+m_4=s-5.
\tag{33}
\]

If the run levels are \(\lambda_0,\ldots,\lambda_4\), Lemma 2 gives

\[
2^{\lfloor m_j/2\rfloor}<2^{\lambda_j}H_s
\qquad(0\leq j\leq4).
\tag{34}
\]

Put \(E:=\sum_j\lfloor m_j/2\rfloor\) and
\(\Lambda:=\sum_j\lambda_j\). Equations (33)-(34) give

\[
2^E<2^\Lambda H_s^5,
\qquad
2E\geq s-10.
\tag{35}
\]

After squaring, every target of the given shape must satisfy

\[
\boxed{2^s<2^{10+2\Lambda}\,307^{10}s^{150}.}
\tag{36}
\]

The three values of \(\Lambda\) and the resulting exact cutoffs are as
follows.

| Run levels | \(\Lambda\) | Necessary inequality | Analytic start |
|---|---:|---:|---:|
| \(0,1,0,1,0\) | \(2\) | \(2^s<2^{14}307^{10}s^{150}\) | \(1708\) |
| \(0,1,2,1,0\) | \(4\) | \(2^s<2^{18}307^{10}s^{150}\) | \(1712\) |
| \(0,1,2,3,0\) | \(6\) | \(2^s<2^{22}307^{10}s^{150}\) | \(1717\) |

For each row, exact integer arithmetic verifies that the reverse strict
inequality holds at the analytic start, while the necessary inequality
still holds weakly one weight earlier. It also verifies

\[
2s_0^{150}>(s_0+1)^{150}
\tag{37}
\]

at the stated start \(s_0\). Since \(((s+1)/s)^{150}\) decreases with
\(s\), the reverse of (36) propagates to every larger weight.

For the finite audit, we retain each bound in (34) separately. Define

\[
R_h(s):=
2\left\lfloor\log_2(2^hH_s-1)\right\rfloor+1.
\tag{38}
\]

Since \(2^hH_s\) is an integer, (34) is exactly equivalent to

\[
m_j\leq R_{\lambda_j}(s).
\tag{39}
\]

Every profile removed by (39) contradicts a proved necessary condition
for being a target.

## 6. Exact meet-in-the-middle compression

Put

\[
p:=m_0+m_1,
\qquad
q:=m_3+m_4.
\tag{40}
\]

Then

\[
m_2=s-5-p-q,
\tag{41}
\]

and the transition indices are recovered exactly from

\[
J-1=m_0,
\quad
L-1=p+1,
\quad
R-1=s-q-3,
\quad
K=s-m_4-2.
\tag{42}
\]

Thus a left half \((m_0,m_1)\) and a right half \((m_3,m_4)\) determine
one raw profile, provided that (41) satisfies the middle run bound. The
anchoring conditions (19)-(21) are tested on the transition indices in
(42).

For each shape, write the target residue as

\[
\tau=[\tau_0+a-b]_D.
\tag{43}
\]

The exact half-residues are

\[
\begin{array}{c|c|c}
\text{shape}&a&b\\ \hline
01010&u_{m_0}-u_{p+1}&u_K-u_{R-1}\\
01210&u_{m_0}+v_{p+1}&u_K+v_{R-1}\\
01230&u_{m_0}+v_{p+1}&u_K+v_K+w_K-w_{R-1}.
\end{array}
\tag{44}
\]

For a fixed left half, put \(a_0:=[\tau_0+a]_D\). Equation (43) gives

\[
0\leq\tau\leq d_{\max}
\quad\Longleftrightarrow\quad
b\in[a_0-d_{\max},a_0]\pmod D.
\tag{45}
\]

The certificate answers (45) by an exact compressed circular query. It
chooses the least power of two \(Q>d_{\max}\) and stores every right
residue under the exact integer key \(\lfloor b/Q\rfloor\). Each circular
interval in (45) is the union of at most two ordinary intervals, and each
ordinary interval meets at most two \(Q\)-buckets. Thus every left half
requires at most four exact dictionary queries. Any returned record is
checked using the full BigInt residue and the middle length (41).

This is not a probabilistic hash, a modular filter, or a sample. The bucket
keys are exact quotients, and the final comparison is the exact circular
difference modulo \(D\). The method enumerates quadratic half-profiles,
not quartic raw profiles.

## 7. Exact finite certificate

The certificate constructs \(B_i\) as one less than the bit length of
\(3^i\). At every audited weight it checks (1), the endpoint identity
\(B_{s-1}=N-2\), the target-width inequality \(d_{\max}<D\), all five
return bounds, and the exact residues in (44).

It independently brute-enumerates every anchored height path through
weight twelve. This verifies the three-shape classification, including
all zero-length internal runs. It also compares (24)-(26) directly with
the cell-by-cell carry on \(380\) classified regression profiles. A
separate regression makes \(63364\) circular queries over small moduli and
compares every returned record with brute force.

The finite coverage is as follows. Each row ends one weight before its own
analytic start.

| Shape | Finite maximum | \(q=2\) weights | Complete profiles | Return-admissible profiles |
|---|---:|---:|---:|---:|
| \(01010\) | \(1707\) | \(707\) | \(17013451570278\) | \(436643358626\) |
| \(01210\) | \(1711\) | \(709\) | \(17237381973498\) | \(442648405076\) |
| \(01230\) | \(1716\) | \(711\) | \(10215679532005\) | \(262470996608\) |

In total, the compressed count covers

\[
44466513075781
\tag{46}
\]

classified profiles, of which

\[
1141762760310
\tag{47}
\]

survive every necessary mechanical run bound. The certificate constructs
\(73922334\) left half-records and \(127297676\) right half-records. It
does not pair them naively.

Its exact output is

~~~text
shape_01010_finite_max_s=1707
shape_01010_q2_weights=707
shape_01010_complete_profiles=17013451570278
shape_01010_return_admissible_profiles=436643358626
shape_01010_mitm_left_records=33978234
shape_01010_mitm_right_records=34068922
shape_01010_bucket_queries=33978234
shape_01010_bucket_candidate_checks=0
shape_01010_residue_middle_compatible_pairs=0
shape_01010_strict_formal_hits=0
shape_01010_equality_formal_hits=0
shape_01010_positive_odd_hits=0
shape_01210_finite_max_s=1711
shape_01210_q2_weights=709
shape_01210_complete_profiles=17237381973498
shape_01210_return_admissible_profiles=442648405076
shape_01210_mitm_left_records=19932450
shape_01210_mitm_right_records=58492134
shape_01210_bucket_queries=19932450
shape_01210_bucket_candidate_checks=0
shape_01210_residue_middle_compatible_pairs=0
shape_01210_strict_formal_hits=0
shape_01210_equality_formal_hits=0
shape_01210_positive_odd_hits=0
shape_01230_finite_max_s=1716
shape_01230_q2_weights=711
shape_01230_complete_profiles=10215679532005
shape_01230_return_admissible_profiles=262470996608
shape_01230_mitm_left_records=20011650
shape_01230_mitm_right_records=34736620
shape_01230_bucket_queries=20011650
shape_01230_bucket_candidate_checks=0
shape_01230_residue_middle_compatible_pairs=0
shape_01230_strict_formal_hits=0
shape_01230_equality_formal_hits=0
shape_01230_positive_odd_hits=0
regression_01010_profiles=187
regression_01210_profiles=130
regression_01230_profiles=63
circular_bucket_regression_cases=63364
transition_regression=true
carry_regression=true
circular_bucket_regression=true
analytic_bases=true
analytic_propagations=true
transition_four_profiles_excluded_all_depth=true
~~~

The checker is
[`inverse/q2_transition_four_certificate.js`](inverse/q2_transition_four_certificate.js).

The zero bucket-candidate counts are stronger than zero exact hits. For
every left half, none of the at most four coarse buckets which cover the
complete target interval contains even one right half. Therefore, no
exact residue in (45) exists. This excludes the strict and equality
formal intervals before positivity is imposed.

## 8. Endpoint, parity, realization, and cycle audit

We record the logical dependencies separately.

1. **Complete shapes.** Equations (16)-(21) classify every nonnegative
   five-run sequence with endpoints zero and upward jumps of size at most
   one. Large downward jumps are included, in particular the final drop
   from height three in the \(01230\) shape.
2. **Shortest runs and endpoints.** Each \(m_j\) is allowed to be zero.
   Thus adjacent transitions, a one-vertex fourth run, and a final drop at
   \(K=s-2\) all occur in the finite search.
3. **Equality.** Exact realization, the state estimate, and Lemma 2 use
   only \(d\geq0\). The circular interval (45) is closed at both ends, so
   \(d=0\) is queried exactly. The certificate finds no equality residue.
4. **Parity and positivity.** The carry is odd because its \(i=0\) cell is
   odd and every later cell is even. Both \(M d\) and \(M\) are even,
   while \(D\) is odd. Therefore, every integral value of
   \((C(A)-Md)/D\) is automatically odd. The residue audit tests the
   larger formal interval without imposing positivity, and it finds no
   formal hit at all.
5. **Exact realization.** If a positive formal hit existed, (7)-(8) would
   realize every proper valuation exponent exactly. No sufficiency
   assumption is made when Lemma 2 is applied.
6. **The Christoffel loophole.** Equation (13) handles imprimitive powers,
   and cyclic conjugacy only changes the selected state on the same
   return. Christoffel integrality leaves only \((2)^g\), whose fixed
   state is \(1\). Anchoring and exact realization exclude that state.

Thus the analytic and finite parts cover the same target class, including
every endpoint, parity, equality, and fixed-point case.

## 9. Consequences and proof ledger

The following items are closed.

1. The complete \(T=4\) sector has exactly the three shapes (16)-(17).
2. Their necessary and sufficient anchoring conditions are
   (19)-(21).
3. Their exact carry and residue representations are (24)-(30).
4. The five level-sensitive mechanical runs give the three analytic
   cutoffs in the table following (36).
5. The exact meet-in-the-middle certificate excludes every smaller strict
   and equality target.
6. Therefore, every surviving \(q=2,b=1\) dense-core target satisfies
   \(T(A)\geq5\).

The next localized sector is \(T=5\). Its run-level classification has
more branches, but the half-profile representation (40)-(45) gives a
general template for its finite arithmetic audit.
