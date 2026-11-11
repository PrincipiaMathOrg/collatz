# The anchored-lattice and paired-shadow gate for boundary winding

**Date:** 26 August 2026  
**Target:** `OPEN-CYCLE-WIND-01`  
**Mode:** SOLVE  
**Status:** strict positive boundary winding is not proved. We strengthen
the boundary-only no-go from one exposed Boolean cube to the complete
terminal-preserving subideal lattice, and we isolate the exact absolute
quantity which survives that no-go.

## 1. Boundary data

Let

\[
a=(a_0,\ldots,a_{r-1}),
\qquad
A_i:=\sum_{j<i}a_j,
\qquad
A:=A_r,
\]

and put

\[
M:=2^A,
\qquad
R:=3^r,
\qquad
D:=M-R,
\qquad
C:=\sum_{j=0}^{r-1}3^{r-1-j}2^{A_j}.
\tag{1}
\]

The canonical start and endpoint are

\[
\rho:=[-CR^{-1}]_M,
\qquad
Z:=\frac{R\rho+C}{M}=[CM^{-1}]_R.
\tag{2}
\]

Write

\[
d:=Z-\rho,
\qquad
\tau:=[CM^{-1}]_D.
\tag{3}
\]

Under the strict one-strip hypotheses, the two-lift theorem gives

\[
d\in\{\tau-D,\tau\}.
\tag{4}
\]

Thus strict positive boundary winding is the assertion that the first lift
in (4) always occurs.

## 2. The paired shadow gives an absolute loss

Let \(y_i\) be the canonical accelerated states, with
\(y_0=\rho\) and \(y_r=Z\), and define

\[
H_i:=3^i2^{A-A_i},
\qquad
m_i:=H_i-y_i.
\tag{5}
\]

The original and shadow recurrences are

\[
2^{a_i}y_{i+1}=3y_i+1,
\qquad
2^{a_i}m_{i+1}=3m_i-1.
\tag{6}
\]

The shadow endpoints are

\[
m_0=M-\rho,
\qquad
m_r=R-Z.
\tag{7}
\]

Consequently its absolute loss

\[
T:=m_0-m_r
\tag{8}
\]

satisfies

\[
\boxed{T=D+d.}
\tag{9}
\]

Combining (4) and (9) yields the exact trichotomy

\[
\boxed{
T=
\begin{cases}
\tau,&\rho>Z,\\
D,&\rho=Z,\\
D+\tau,&\rho<Z.
\end{cases}}
\tag{10}
\]

In particular,

\[
\boxed{\rho>Z\quad\Longleftrightarrow\quad T<D.}
\tag{11}
\]

This comparison uses the absolute endpoints of the paired shadow. It is
not invariant under a free translation of the carry.

There is also an exact signed-defect identity. Equation (6) gives

\[
3(m_i-m_{i+1})=(2^{a_i}-3)m_{i+1}+1.
\]

Summing over the word proves

\[
\boxed{
3T-r=\sum_{i=0}^{r-1}(2^{a_i}-3)m_{i+1}.}
\tag{12}
\]

Therefore strict positive winding is equivalently the single absolute
inequality

\[
\boxed{
\sum_{i=0}^{r-1}(2^{a_i}-3)m_{i+1}<3D-r.}
\tag{13}
\]

The coefficients in (13) are negative exactly at exponent-one steps. This
form retains the complete anchored shadow and exposes the required
noncancellation between the exponent-one runs and the valuation jumps.

For completeness, put

\[
q_i:=\frac{3^{r-i}}{2^{A-A_i}}.
\tag{14}
\]

Strict suffix records give \(0<q_i<1\) for \(i<r\), while \(q_r=1\).
The normalized shadow \(w_i:=q_i m_i\) satisfies

\[
w_i-w_{i+1}=\frac{q_i}{3}.
\tag{15}
\]

Hence

\[
T=\frac{D}{M}m_0+\frac13\sum_{i=0}^{r-1}q_i
<D+\frac r3.
\tag{16}
\]

Equation (16) recovers the two possible losses in (10), but it does not
decide which side of \(D\) contains \(T\). The missing estimate is exactly
the strict inequality in (11), not a positivity estimate for the normalized
shadow.

## 3. The complete subideal lattice still admits a virtual isolated failure

We now strengthen the local no-go in `corner_flux_solve.md`. Take

\[
s=8,
\qquad
M=8192,
\qquad
P=6561,
\qquad
D=1631,
\tag{17}
\]

and the anchored delay vector

\[
d=(0,0,1,1,2,2,3,4).
\tag{18}
\]

Its anchored carry is

\[
C(I)=13349.
\tag{19}
\]

As in the earlier boundary countermodel, translate every anchored carry by
the fixed amount

\[
\eta:=-264.
\tag{20}
\]

The translated top carry is

\[
C_*(I)=C(I)+\eta=13085
=D\cdot3+M\cdot1,
\tag{21}
\]

so its coordinates are \((\rho,\tau,E)=(3,1,0)\).

Let \(J\) range over every anchored subideal of (18) which retains the
terminal row \(d_7=4\). There are exactly 30 such subideals. For each one,
put

\[
C_*(J):=C(J)+\eta.
\tag{22}
\]

**Theorem 1.** The translated top in (21) is the unique failure in the
complete terminal-preserving interval:

\[
\boxed{
E(C_*(I))=0,
\qquad
E(C_*(J))=1\quad(J\subsetneq I).}
\tag{23}
\]

**Proof.** A terminal-preserving subideal has a nondecreasing delay vector

\[
0=d_0\leq d_1\leq\cdots\leq d_6\leq d_7=4
\]

with coordinatewise upper bound (18). Direct nested enumeration gives 30
vectors. For each vector we evaluate its exact anchored carry from

\[
C(J)=P-2^s+
\sum_{(i,u)\in J}2^{i+u-1}3^{s-1-i},
\]

then compute

\[
\rho=[-C_*(J)P^{-1}]_M,
\qquad
\tau=[C_*(J)M^{-1}]_D,
\]

and finally

\[
E=\frac{D\rho+M\tau-C_*(J)}{MD}.
\]

Every evaluation is integral and lies in \(\{0,1\}\). Exactly one value is
zero, at the vector (18), where (21) gives the result directly. The other
29 values are one. The exact enumeration and all count assertions are in
`inverse/q2_full_subideal_virtual_probe.js`. \(\square\)

Theorem 1 is stronger than the previous four-corner Boolean-cube no-go.
The virtual top is not only surrounded by descending exposed-corner
vertices. It is an isolated failure above the entire proper subideal
lattice.

## 4. Consequence for the proof strategy

Any argument which uses only

1. the order-ideal lattice below a top profile,
2. every carry difference between two vertices,
3. every binary and reduced wrap at those differences, and
4. the information that all proper vertices descend

is invariant under the common translation (22). Theorem 1 shows that this
information is compatible with an isolated top failure. Thus even complete
subideal minimality cannot prove strict positive winding without fixing the
absolute anchored carry.

The translation (20) is exactly what the true Collatz carry forbids. At the
genuine anchor \(\eta=0\), the top coordinates are

\[
(\rho,\tau,E)=(3067,1022,1).
\tag{24}
\]

The remaining theorem must therefore use one of the following equivalent
absolute data:

\[
C=P-2^s+\sum_{c\in I}\Delta_c,
\tag{25}
\]

the exact unshifted front term \(P-2^s\), or the paired-shadow loss \(T\)
in (8). Boundary differences, however numerous, do not retain this datum.

## 5. Exact remaining gate

For the original strict-record word, all reductions now leave

\[
\boxed{
a_0=1,
\quad
A=\lceil r\log_2 3\rceil,
\quad
2^{A-A_i}>3^{r-i} (0<i<r)
\quad\Longrightarrow\quad
m_0-m_r<D.}
\tag{26}
\]

Equivalently, we must prove (13). The full translated lattice cannot supply
this inequality. A successful continuation has to compare the absolute
front term with the signed shadow defects, or obtain an equivalent
noncancellation theorem for the anchored interior sum.

This note proves no cycle exclusion. It removes the complete-lattice
majorization route as a possible standalone proof and replaces it with the
sharper absolute shadow-loss gate (26).

## 6. The canonical signed shadow lift

The absolute sign can be placed in one integer without choosing a branch.
Define

\[
K:=\frac{M\tau-C}{D}.
\tag{27}
\]

This is an integer because \(C\equiv M\tau\pmod D\). Moreover,

\[
DK\equiv-C\pmod M,
\qquad
D\equiv-R\pmod M,
\]

so

\[
\boxed{K\equiv-\rho\pmod M.}
\tag{28}
\]

Starting from \(K_0:=K\), follow the signed recurrence

\[
2^{a_i}K_{i+1}=3K_i-1.
\tag{29}
\]

Congruence (28) and the canonical valuation cylinder show inductively that
every \(K_i\) is integral. The full affine recurrence is

\[
MK_r=RK-C.
\]

Using \(C=M\tau-DK\), we obtain the exact endpoint identity

\[
\boxed{K_r=K_0-\tau.}
\tag{30}
\]

The two-lift theorem now identifies the sign without any further modular
notation:

\[
\boxed{
K=
\begin{cases}
M-\rho=m_0,&\rho>Z,\\
-\rho,&\rho\leq Z.
\end{cases}}
\tag{31}
\]

Indeed, on the positive-winding branch
\(C=D\rho+M(\tau-D)\), while on the zero or negative branch
\(C=D\rho+M\tau\). Thus strict positive winding is exactly

\[
\boxed{K>0.}
\tag{32}
\]

If \(K>0\), recurrence (29) is the positive paired shadow. If \(K<0\),
then \(K_i=-y_i\) at every boundary. The forbidden branch is therefore
not merely analogous to a paradoxical Collatz segment. It is exactly that
segment after a sign change. At equality, (29) is the negative of an
integral Collatz cycle.

This formulation is useful as an audit rule. Any proposed proof which
constructs the integer (27) but assumes its positivity has already assumed
the remaining theorem.

## 7. Exact prefix-mass identities

Put

\[
t_i:=\frac{2^{A_i}}{3^i},
\qquad
S:=\sum_{i=0}^{r-1}t_i.
\tag{33}
\]

The normalized original path satisfies

\[
\frac{y_{i+1}}{H_{i+1}}
=\frac{y_i}{H_i}+\frac1{3H_i}.
\]

Since

\[
\frac{R}{H_i}=\frac RM t_i,
\]

summation gives the two exact endpoint forms

\[
\boxed{
\rho-Z
=\frac{D\rho}{M}-\frac{RS}{3M}
=\frac{DZ}{R}-\frac S3.}
\tag{34}
\]

For a coefficient first-crossing word, every proper prefix satisfies
\(2^{A_i}<3^i\), so \(S<r\). A hypothetical nonpositive first-crossing
segment would consequently satisfy the simultaneous localization

\[
\boxed{
0<\rho\leq Z<\frac{rR}{3D}.}
\tag{35}
\]

This improves the earlier crude factor \(rM/(3D)\) on the
first-crossing subclass. It does not prove the sign because the right side
remains unbounded along close rational approximations to \(\log_2 3\).
Equation (34) also shows that the exact target is

\[
\boxed{3D\rho>RS,}
\tag{36}
\]

or equivalently \(3DZ>RS\). This is the prefix-coefficient version of
(26), with the absolute carry still present.
