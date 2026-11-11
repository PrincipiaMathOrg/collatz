# The dense defect core at terminal complement \(b=1\)

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** scalar carry loss and support additivity do not exclude the dense
core. An explicit family has \(s-3\) defective positions but only two
changed exponent edges, and its remaining normalized carry is still linear
in \(s\). The correct complexity parameter is the number of height
transitions. Every surviving target has an explicit
\(\Omega(\sqrt{s})\) transition lower bound. The complete two-transition
sector, which consists of one height-one plateau and includes profiles of
linear support, is excluded at every depth. The remaining branch has at
least three transitions and, asymptotically, unbounded transition
complexity.

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

Define its height path and support by

\[
h_i:=B_i-A_i,
\qquad
\mathcal D(A):=\{i:h_i>0\}.
\tag{4}
\]

We retain the target equation

\[
Pn+C(A)=M(n+d),
\qquad
0\leq d\leq\left\lceil\frac{e-1}{2}\right\rceil,
\tag{5}
\]

where \(n\) is positive and odd. Every such target realizes all proper
valuation exponents exactly and satisfies

\[
n<153s^{14.3}.
\tag{6}
\]

Put

\[
H_s:=307s^{15}.
\tag{7}
\]

## 2. The sharp scalar carry estimate and its limitation

Let \(C_0\) be the maximal carry corresponding to \(A_i=B_i\), and put

\[
\theta_i:=\{i\alpha\},
\qquad
u_i:=\frac{2^{B_i}3^{s-1-i}}P
=\frac13\,2^{-\theta_i}.
\tag{8}
\]

For a general profile, its normalized carry loss is

\[
\frac{C_0-C(A)}P
=\sum_{i\in\mathcal D(A)}u_i(1-2^{-h_i}).
\tag{9}
\]

Since \(1/6<u_i\leq1/3\), every support defect contributes more than
\(1/12\). Thus, if \(r:=|\mathcal D(A)|\), then

\[
\frac{C_0-C(A)}P>\frac r{12}.
\tag{10}
\]

We can sharpen the upper bound for \(C_0\) by pairing adjacent cells. Put
\(f(x):=2^{-x}\). Since \(\theta_{i+1}=\{\theta_i+\beta\}\), the identities

\[
2^{-\beta}=\frac23,
\qquad
2^{\beta-1}=\frac34
\]

give

\[
f(x)+f(\{x+\beta\})\leq\frac74
\qquad(0\leq x<1).
\tag{11}
\]

Indeed, the two branches \(x<1-\beta\) and \(x\geq1-\beta\) have maxima
\(5/3\) and \(7/4\), respectively. Pairing the cells in (8) gives

\[
\frac{C_0}P\leq\frac{7s+1}{24}.
\tag{12}
\]

A twelve-cell block gives a substantially sharper global constant. Define

\[
S_{12}(x):=
\sum_{k=0}^{11}2^{-\{x+k\beta\}}.
\]

The number \(\beta\) is irrational, since a rational relation would make a
positive power of three a power of two. Thus the only distinct cut points
of this function are \(x_j:=\{-j\beta\}\), with \(0\leq j<12\). Between
consecutive cut points every summand is multiplied by the same decreasing
factor, so the maximum occurs at a right-hand cut value. Exact evaluation
gives

\[
2^{-\{(k-j)\beta\}}
=2^{\lfloor(k-j)\beta\rfloor}
\left(\frac23\right)^{k-j},
\]

which is rational for every \(j,k\). Summing the twelve values at each cut
gives

\[
\max_{0\leq j<12}S_{12}(x_j)
=\frac{2349463}{262144}<9.
\tag{12a}
\]

Partitioning the maximal carry into blocks of twelve, with at most eleven
unpaired cells, therefore gives

\[
\boxed{
\frac{C_0}P<\frac s4+\frac{11}{12}.}
\tag{12b}
\]

The strict sign in (12b) also covers \(s<12\). For \(s<11\), the crude
remainder bound \(C_0/P\leq s/3\) is already strictly smaller than its
right-hand side. For \(s=11\), every remainder term except the cell
\(i=0\) is strictly smaller than \(1/3\). If there is a complete
twelve-cell block, strictness follows directly from (12a).

Combining (9), (10), and (12b), every strict target satisfies the global
density-versus-carry estimate

\[
\boxed{
d<\frac{C(A)}P
<\frac{3s+11-r}{12}.}
\tag{13}
\]

The first inequality uses \(C(A)/P=(M/P-1)n+(M/P)d\) and \(M/P>1\).
Equation (13) removes a linear top band of target values, but it does not
exclude small \(d\), and it gives no contradiction when \(d=0\).

Combining (13) with the established support bound

\[
r>
\frac{s-2-2\log_2H_s}{3+2\log_2H_s}
\]

gives the explicit strict-target restriction

\[
d<\frac s4+\frac{11}{12}
-\frac{s-2-2\log_2H_s}
{12(3+2\log_2H_s)}
\tag{13a}
\]

whenever the second numerator is positive. This gains order
\(s/\log s\) over the scalar maximal-carry bound, but a linear interval of
small targets remains.

There is an exact countermodel to any stronger conclusion based only on
the number of support cells. At every \(b=1\) weight \(s\geq4\), put

\[
h_i:=
\begin{cases}
1,&2\leq i\leq s-2,\\
0,&i=0,1,s-1.
\end{cases}
\tag{14}
\]

This profile is anchored because \(B_2-B_1=2\). Its support has size
\(s-3\), while

\[
\frac{C(A)}P
\geq\sum_{i=2}^{s-2}\frac{u_i}{2}
>\frac{s-3}{12}.
\tag{15}
\]

Thus linearly many defects leave linearly large positive carry. Dense
support alone cannot close the target equation.

## 3. Height transitions and constant-level mechanical runs

Define the transition count

\[
T(A):=#\{0\leq i\leq s-2:h_{i+1}\neq h_i\}.
\tag{16}
\]

The support countermodel (14) has \(T(A)=2\). This explains why counting
support cells as independent exponent damage is incorrect. Whenever
\(h_i=h_{i+1}=h\), we have

\[
A_{i+1}-A_i=B_{i+1}-B_i
=1+\lfloor(i+1)\beta\rfloor-\lfloor i\beta\rfloor.
\tag{17}
\]

In other words, the valuation word is exactly mechanical inside every
constant-height run, including a long defective plateau.

At a vertex of height \(h\), the realized state satisfies

\[
\begin{aligned}
x_t
&=\frac{3^tn+C_t}{2^{B_t-h}}\\
&<2^h\left(2n+\frac{2t}{3}\right)
<2^hH_s.
\end{aligned}
\tag{18}
\]

For \(t\geq1\), the inequality \(B_t<t\alpha\) gives \(x_t>n\). Also
\(B_1=1\), so strict anchoring forces \(A_1=1\). Exact realization then
excludes \(n=1\), since \(v_2(3\cdot1+1)=2\). Hence every vertex,
including the initial vertex, differs from the fixed point \(1\).

The Sturmian collision and dyadic cylinder argument from the two-support
gate now gives the following level-sensitive form.

**Lemma 1.** If a constant-height run at level \(h\) contains \(m\)
internal exponent edges, then

\[
\boxed{2^{\lfloor m/2\rfloor}<2^hH_s.}
\tag{19}
\]

For completeness, (19) is immediate when \(m<4\). Otherwise put
\(L:=\lfloor(m-2)/2\rfloor\). Among the \(L+2\) length-\(L\) factors
starting at offsets \(0,1,\ldots,L+1\), two agree because a Sturmian word
has only \(L+1\) factors of length \(L\). If their starting states were
equal, determinism would repeat the intervening return word. If the two
starts are \(r_1<r_2\), the doubled word ends at offset
\(2r_2-r_1\leq2L+2\leq m\), so its square lies entirely in the mechanical
run. Its binary reduction is circularly balanced and hence a cyclic
conjugate of a power of a primitive Christoffel word. A contracting return
has no positive fixed point, while Christoffel integrality leaves only the
expanding word \((2)^g\), whose fixed state is \(1\). Both alternatives are
impossible here. The starting states are therefore distinct. If \(Q\) is
the exponent sum of their common factor, the exact odd dyadic cylinder
formula gives \(2^{Q+1}\mid x_k-x_j\). Since \(Q\geq L\), positivity and
(18) imply

\[
2^{L+1}\leq |x_k-x_j|<2^hH_s.
\]

Finally \(L+1=\lfloor m/2\rfloor\), which proves (19). This argument uses
only proper realized exponents and is unchanged when the endpoint target
has \(d=0\).

## 4. A transition lower bound for every survivor

Let the \(T+1\) constant-height runs have levels

\[
\lambda_0,\lambda_1,\ldots,\lambda_T
\]

and internal edge lengths \(m_0,m_1,\ldots,m_T\). Since
\(h_0=h_{s-1}=0\), we have

\[
\lambda_0=\lambda_T=0.
\tag{20}
\]

There are \(s-1\) proper exponent edges, of which exactly \(T\) cross
between height runs. Hence

\[
\sum_{j=0}^T m_j=s-1-T.
\tag{21}
\]

Multiplying (19) over all runs gives

\[
2^E<2^{\sum_j\lambda_j}H_s^{T+1},
\qquad
E:=\sum_{j=0}^T\left\lfloor\frac{m_j}{2}\right\rfloor.
\tag{22}
\]

Equation (21) gives

\[
E\geq\frac{s-2T-2}{2}.
\tag{23}
\]

The anchoring condition also controls the run levels. Put
\(g_i:=B_{i+1}-B_i\in\{1,2\}\). Strict increase in (3) gives

\[
h_{i+1}-h_i\leq g_i-1\leq1.
\tag{24}
\]

Thus every upward transition has size one. In particular,
\(\lambda_j\leq j\), and (20) gives

\[
\sum_{j=0}^T\lambda_j
\leq1+2+\cdots+(T-1)
=\frac{T(T-1)}2.
\tag{25}
\]

Squaring (22), then using (23)-(25), proves the main transition theorem.

**Theorem 2.** Every \(q=2,b=1\) strict or equality target satisfies

\[
\boxed{
2^{s-2T-2}
<2^{T(T-1)}H_s^{2T+2}.}
\tag{26}
\]

Equivalently, with \(L_s:=\log_2H_s\),

\[
\boxed{
s<T^2+(2L_s+1)T+2L_s+2.}
\tag{27}
\]

When \(s>2L_s+2\), this gives the explicit lower bound

\[
\boxed{
T>
\frac{-(2L_s+1)+
\sqrt{(2L_s+1)^2+4(s-2L_s-2)}}2.}
\tag{28}
\]

In particular, \(T=\Omega(\sqrt{s})\). This is independent of the earlier
support bound \(r=\Omega(s/\log s)\): a survivor must be dense both in
defective positions and in changes of deformation height.

## 5. Complete exclusion of the two-transition sector

A nonzero anchored height path must have at least two transitions. If
\(T=2\), the first transition leaves height zero and therefore has size
one by (24). There is no further transition until the final return to zero.
Thus the complete sector has the form

\[
h_i=
\begin{cases}
1,&J\leq i\leq K,\\
0,&\text{otherwise},
\end{cases}
\qquad
B_J-B_{J-1}=2,
\tag{29}
\]

where \(1\leq J\leq K\leq s-2\). These are exactly the one-plateau
profiles. Their support \(K-J+1\) is unrestricted and may be linear in
\(s\). In particular, no multiple-height defect is hidden in this
classification: reaching height two would require a second upward
transition before the return to zero.

For \(T=2\), the three run levels are \(0,1,0\). Before the general level
bound (25) is applied, equations (22)-(23) give

\[
2^{s-6}<4H_s^6.
\]

Consequently, every one-plateau target would satisfy

\[
\boxed{2^s<256\cdot307^6s^{90}.}
\tag{30}
\]

Exact integer arithmetic gives the reverse strict inequality at \(s=948\),
together with the propagation inequality

\[
2\cdot948^{90}>949^{90}.
\tag{31}
\]

Both comparisons are made without floating point. Since
\(((s+1)/s)^{90}\) decreases with \(s\), (31) propagates the reverse of
(30) from \(948\) to every larger weight. Therefore, no one-plateau target
exists for \(s\geq948\).

## 6. Exact finite certificate

The remaining weights \(s\leq947\) are decided by exact residue
evaluation. For the profile in (29), the carry decrement is

\[
L_{J,K}:=
\sum_{i=J}^K2^{B_i-1}3^{s-1-i},
\qquad
C(A)=C_0-L_{J,K}.
\tag{32}
\]

The certificate computes

\[
\tau(A):=[C(A)M^{-1}]_D
\tag{33}
\]

using exact integer arithmetic. At weight \(s\), it obtains \(B_i\) from
the bit length of \(3^i\), tests (1) exactly, checks
\(B_{s-1}=N-2\), and enumerates every pair

\[
1\leq J\leq K\leq s-2
\quad\text{with}\quad
B_J-B_{J-1}=2.
\]

These conditions are necessary and sufficient for (29) to be a strictly
anchored profile. The target interval has length less than \(D\), so
\(\tau(A)=0\) is exactly the equality case and
\(1\leq\tau(A)\leq\lceil(e-1)/2\rceil\) is exactly the complete strict
formal target interval. Thus zero formal hits already excludes positive
realized hits. The checker also independently brute-enumerates all
anchored height paths through weight twelve and confirms that every path
with two transitions occurs in (29), and it directly recomputes the carry
on those regression cases. Its exact output is

~~~text
finite_max_s=947
finite_q2_weights=393
one_plateau_profiles=34283711
support_at_least_half_profiles=8547821
strict_formal_hits=0
equality_formal_hits=0
analytic_start=948
transition_regression=true
analytic_base=true
analytic_propagation=true
one_plateau_profiles_excluded_all_depth=true
~~~

The checker is
[`inverse/q2_one_plateau_certificate.js`](inverse/q2_one_plateau_certificate.js).
The twelve-cell carry bound is checked independently by
[`inverse/q2_twelve_block_carry_certificate.js`](inverse/q2_twelve_block_carry_certificate.js).
The diagnostic
[`inverse/q2_dense_core_probe.js`](inverse/q2_dense_core_probe.js)
separately scans plateau support density, endpoint positivity, and proper
determinant factors.

## 7. A dense proper-factor cancellation

Dense deformation does not make modular contributions independent. At

\[
s=8,
\qquad
N=13,
\qquad
A=(0,1,2,3,5,6,9,11),
\qquad
d=1,
\tag{34}
\]

the height path is one on \(2\leq i\leq5\) and zero elsewhere. Thus its
support has size four, exactly half the weight. Direct evaluation gives

\[
P=6561,
\qquad
M=8192,
\qquad
D=1631=7\cdot233,
\qquad
C(A)=10289.
\]

Although this is not a full target,

\[
C(A)-Pd=3728=16\cdot233,
\qquad
C(A)-Md=2097=9\cdot233.
\tag{35}
\]

Thus the dense plateau cancels exactly modulo the large proper factor
\(233\) and misses only the complementary factor \(7\). Any modular
closure must control every prime-power component of \(D\), not merely find
one large common factor or invoke random cancellation among defect cells.

## 8. Proof ledger

The following items are closed.

1. The exact global carry estimate is (13). It removes high targets but
   cannot exclude small \(d\) or equality.
2. The family (14) proves that linear support does not exhaust the carry.
3. Constant-height defective runs retain the exact mechanical valuation
   word and satisfy the level-sensitive return bound (19).
4. Every survivor obeys the transition inequalities (26)-(28).
5. The complete \(T=2\) sector is one height-one plateau.
6. The analytic argument excludes every one-plateau profile for
   \(s\geq948\), and the exact certificate excludes every smaller profile,
   including equality.
7. The proper-factor witness (34)-(35) refutes naive modular independence.

The following items remain open.

1. Exclude the transition-dense residual \(T\geq3\), with the quantitative
   lower bound (28).
2. Strengthen (13) so that its carry loss interacts with transition count,
   rather than support count alone.
3. Control the complete determinant in the presence of the proper-factor
   cancellation (35).
4. No conclusion about every \(q=2\) profile, every divergent orbit, or
   every nontrivial cycle follows from the one-plateau theorem alone.
