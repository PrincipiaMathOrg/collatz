# All-height block renormalization has one cyclic modulus

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** Partitioning a one-drop orbit at every height level avoids the
local equal-factor rank-two matrix, but it does not create a second global
modulus. For an arbitrary cyclic partition into \(k\) blocks, the complete
integer block system has Smith normal form
\[
\operatorname {diag}(1,\ldots,1,2^N-3^r).
\]
Thus its cokernel is cyclic. The unique torsion coordinate is exactly the
original denominator class \(C\bmod D\), where \(D:=2^N-3^r\). Scaling
different height levels by powers of two, or phase-renormalizing by powers
of two and three, does not change this conclusion.

This gives a sharp no-go for obtaining \(Q\geq U^{271/10}\) from a new
height-block modulus. The all-height system preserves the one useful
\(D\)-class, but every apparent additional block congruence is a unit
multiple of that class.

## 1. The arbitrary cyclic block system

Let a cyclic accelerated word be partitioned at
\[
0=\tau_0<\tau_1<\cdots<\tau_k=r.
\tag{1}
\]
The partition is arbitrary. In particular, the \(\tau_i\) may be the first
passage times through every one-drop height level.

For block \(i\), put
\[
\ell_i:=\tau_{i+1}-\tau_i,
\qquad
E_i:=\sum_{\tau_i\leq j<\tau_{i+1}}a_j,
\qquad
p_i:=3^{\ell_i},
\qquad
q_i:=2^{E_i},
\tag{2}
\]
where the final index is interpreted cyclically. Let \(c_i\) be the exact
affine carry of that block. If \(x_i\) is its initial odd state, then
\[
\boxed{q_ix_{i+1}-p_ix_i=c_i}
\qquad (i\bmod k).
\tag{3}
\]

The carries compose by
\[
c_{i,j+1}=p_jc_{i,j}+q_{i,j}c_j,
\tag{4}
\]
where \(q_{i,j}\) is the accumulated power of two before block \(j\).
Consequently,
\[
\prod_{i=0}^{k-1}q_i=2^N,
\qquad
\prod_{i=0}^{k-1}p_i=3^r.
\tag{5}
\]

Let \(A\) be the cyclic bidiagonal coefficient matrix of (3):
\[
A:=
\begin{pmatrix}
-p_0&q_0&0&\cdots&0\\
0&-p_1&q_1&\ddots&\vdots\\
\vdots&\ddots&\ddots&\ddots&0\\
0&\cdots&0&-p_{k-2}&q_{k-2}\\
q_{k-1}&0&\cdots&0&-p_{k-1}
\end{pmatrix}.
\tag{6}
\]

The complete all-height problem is the single lattice equation
\[
A\mathbf x=\mathbf c.
\tag{7}
\]

## 2. Exact Smith form

**Theorem 1.** For every cyclic block partition with \(k\geq1\),
\[
\boxed{
\operatorname {SNF}(A)
=\operatorname {diag}(1,\ldots,1,D),
\qquad
D:=2^N-3^r.}
\tag{8}
\]

In particular,
\[
\operatorname {coker}(A)\simeq\mathbb Z/D\mathbb Z.
\tag{9}
\]

**Proof.** For \(k=1\), the matrix is \((q_0-p_0)=(D)\). Suppose
\(k\geq2\). Only two permutations contribute to the determinant in (6).
The identity permutation uses every \(-p_i\), while the cyclic permutation
uses every \(q_i\). Hence
\[
\det A=(-1)^{k-1}
\left(\prod_iq_i-\prod_ip_i\right)
=(-1)^{k-1}D.
\tag{10}
\]

Delete the last row and first column. The resulting triangular minor has
determinant
\[
\prod_{i=0}^{k-2}q_i,
\tag{11}
\]
a power of two. Delete instead the last row and last column. The resulting
triangular minor has determinant
\[
(-1)^{k-1}\prod_{i=0}^{k-2}p_i,
\tag{12}
\]
a power of three. The greatest common divisor of all
\((k-1)\)-rowed minors therefore divides both a power of two and a power of
three, so it equals one.

If \(d_1\mid\cdots\mid d_k\) are the Smith invariant factors, their first
\(k-1\) factors have product equal to this determinantal divisor. Thus
\[
d_1=\cdots=d_{k-1}=1.
\]
Equation (10) then gives \(d_k=D\). \(\square\)

The proof uses every block at once and is independent of the number of
height levels. It is not a finite-window or renewal argument.

## 3. The surviving class is the full carry

Eliminating \(x_1,\ldots,x_{k-1}\) from (3) gives
\[
Dx_0=C_{\rm blk},
\tag{13}
\]
where
\[
\boxed{
C_{\rm blk}
:=
\sum_{i=0}^{k-1}
\left(\prod_{j=i+1}^{k-1}p_j\right)
\left(\prod_{j=0}^{i-1}q_j\right)c_i.}
\tag{14}
\]

Equation (14) is exactly the affine carry of the concatenated full word.
Therefore the unique cokernel condition in Theorem 1 is
\[
\boxed{D\mid C_{\rm blk}.}
\tag{15}
\]

There is no loss of the useful denominator-one datum. Rather, there is no
second datum beside it.

This remains explicit at every cyclic starting block. Let \(C_i\) be the
full carry numerator for the rotation beginning at block \(i\). Equation
(3) gives
\[
\boxed{q_iC_{i+1}=p_iC_i+c_iD.}
\tag{16}
\]
Since \(D\) is coprime to six, \(p_i\) and \(q_i\) are units modulo \(D\).
Thus
\[
[C_{i+1}]=q_i^{-1}p_i[C_i]
\quad\text{in }\mathbb Z/D\mathbb Z.
\tag{17}
\]
Every block boundary carries a unit multiple of one class. In particular,
\[
D\mid C_i\quad\Longleftrightarrow\quad D\mid C_j
\tag{18}
\]
for all \(i,j\), and all the classes have the same additive order
\[
h=\frac{D}{\gcd(D,C_i)}.
\tag{19}
\]
This \(h\) is the reduced rational orbit denominator.

## 4. Height normalization cannot change the odd torsion

Suppose that the boundary at \(\tau_i\) lies at height \(m_i\), and put
\[
u_i:=2^{-m_i}x_i.
\tag{20}
\]
The normalized variables lie in the lattice
\[
\mathcal L_{\mathbf m}
:=\bigoplus_{i=0}^{k-1}2^{-m_i}\mathbb Z.
\tag{21}
\]
The map
\[
\mathcal L_{\mathbf m}\longrightarrow\mathbb Z^k,
\qquad
(u_i)_i\longmapsto(2^{m_i}u_i)_i
\tag{22}
\]
is a lattice isomorphism. Under it, the normalized block equations become
exactly (7). Hence their cokernel is still (9).

There is an invariant formulation. Work over
\[
R:=\mathbb Z[1/6].
\tag{23}
\]
Every height or mechanical-phase renormalization multiplies rows and
columns by powers of two and three, which are units in \(R\). Therefore all
such normalized block matrices are equivalent over \(R\), and
\[
\operatorname {coker}_R(A)\simeq R/DR.
\tag{24}
\]
Since \(\gcd(D,6)=1\), this is the same cyclic \(D\)-torsion seen in (9).
Clearing the normalization denominators can introduce powers of two or
three, but those record the chosen local lattices. They are not new global
orbit moduli.

Thus varying the blocks avoids the literal rank-two occurrence matrix from
equal-factor packing, but the global replacement is just as rigid:
proper determinantal divisors are one, and the sole full determinant is
\(D\).

## 5. Determinants and products

Theorem 1 also rules out a determinant or Vandermonde recovery of a second
modulus from the linear block equations.

Every proper determinantal divisor of \(A\) is one. Hence no integer
greater than one divides all minors of any fixed order below \(k\). At full
order, every elimination returns
\[
|\det A|=D.
\tag{25}
\]
Products of block determinants may reproduce powers of \(D\), or artificial
powers of two and three introduced by normalization, but cannot produce an
independent modulus coprime to the first \(D\)-class.

Equivalently, the all-height state vector has one obstruction in the cyclic
module (9). Any collection of block-boundary congruences obtained by linear
transport is a collection of unit multiples of that obstruction, as in
(17). Taking a product over all \(U\) levels multiplies copies of the same
class. It does not turn them into independent congruences.

## 6. Rational denominator shadows

The cyclic module description passes the required rational-shadow test.
For any word, equations (3) have the unique rational solution
\[
x_i=\frac{C_i}{D}.
\tag{26}
\]
All block identities, all height normalizations, and the complete cyclic
closure hold whether or not \(h=1\). Multiplication by the common reduced
denominator \(h\) gives primitive integer numerator recurrences
\[
q_iP_{i+1}=p_iP_i+c_ih.
\tag{27}
\]
Thus integral cleared states do not distinguish denominator one either.

A transparent strict-least example is the primitive word \((1,3)\), split
into its two single-branch blocks. Here
\[
A=
\begin{pmatrix}-3&2\\8&-3\end{pmatrix},
\qquad
D=2^4-3^2=7,
\qquad
\operatorname {SNF}(A)=\operatorname {diag}(1,7).
\tag{28}
\]
The carries are \(c_0=c_1=1\), and
\[
(x_0,x_1)=\left(\frac57,\frac{11}7\right)
\tag{29}
\]
is an exact positive rational cycle with strict least state \(x_0\). Its
full carry is \(5\), so it represents a nonzero class of order seven.
Every two-block identity is exact, while denominator one fails.

More importantly, the known anchored one-drop rational families have
unbounded \(U\), exact bottom closure, strict leastness, bounded least
state, and all height-block identities. Their only missing property is
again that the class (15) is zero. Therefore no archimedean inequality
deduced from the all-height transfers, even after retaining every level,
can imply
\[
Q\geq U^{271/10}
\tag{30}
\]
without using new information about the single class
\([C_{\rm blk}]\in\mathbb Z/D\mathbb Z\).

## 7. Consequence for the one-drop gate

All-height block renormalization does not prove the target polynomial lower
bound. Its exact output is
\[
\text{one cyclic \(D\)-class}
\quad+\quad
\text{local dyadic and ternary lattice data}.
\tag{31}
\]
The local lattice data occur in rational denominator shadows on the wrong
side of (30). The global class is exactly the denominator-one congruence
already present before the height decomposition.

A successful continuation must therefore prove a noncancellation or size
theorem for the representative of this one class. Examples include a
lower bound for the centered residue at a height cut, or a nonlinear
restriction coupling the class to leastness. Repartitioning the path,
renormalizing every height level, taking more minors, or multiplying the
resulting congruences cannot supply such a theorem.

If such a new theorem did establish (30), the existing complementary
critical-polynomial gate would exclude the complete one-drop positive-cycle
sector. It would not close the general cycle-integrality obstruction for
multi-drop words, and it would not affect the separate divergent-orbit
gate.

## 8. Exact audit

The checker
[one_drop_all_height_block_snf_certificate.js](cycles/one_drop_all_height_block_snf_certificate.js)
uses integer and rational arithmetic. For every exponent word of length at
most six with positive \(D\), and every partition of each such word, it
verifies the cyclic determinant (10), the pure dyadic and ternary minors
(11) and (12), the carry composition (14), and invariance of the reduced
rational denominator under rotation. It audits
\[
\texttt{words=968},
\qquad
\texttt{partitions=25016},
\qquad
\texttt{determinantChecks=25016},
\]
\[
\texttt{smithMinorChecks=24048},
\qquad
\texttt{carryChecks=25016},
\qquad
\texttt{denominatorChecks=5361}.
\]
It also verifies the strict-least shadow (29), and returns
\(\texttt{status=PASS}\). The finite audit checks the formulas; Theorem 1
is the all-depth proof.

The frozen SHA-256 digest of the certificate source is
\[
\texttt{6c5694c62e777aed57cce678ce962ff935e81574eb947d344960a414e1841b9c}.
\]

## Conclusion

The all-height construction has a precise algebraic shadow. The local
cross-height rank-two collapse is replaced globally by a cyclic Smith-form
collapse:
\[
\operatorname {coker}(A)\simeq\mathbb Z/(2^N-3^r)\mathbb Z.
\]
This preserves, but does not strengthen, denominator one. There is exactly
one global modulus for an arbitrary number of height blocks, and every
rotated or normalized version is the same class up to a unit. Consequently,
height-block renormalization alone cannot deliver the polynomial
least-state bound required to close the high-rise one-drop gate.
