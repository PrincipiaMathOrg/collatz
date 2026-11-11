# Dense height transitions do not produce a dense Ferrers boundary

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** the proposed uniform bridge to the complete corner-flux condition
fails.  There are anchored \(q=2,b=1\) profiles with
\(T=\Theta(s)\) and exactly one removable Ferrers corner.  Thus the bound
\(T\geq5\), or even \(T=\Omega(\sqrt{s})\), does not produce more than the
singleton instance of \((O12)\).

## 1. Exact translation

Put

\[
B_i:=\lfloor i\log_2 3\rfloor,
\qquad
m_i:=B_i-i,
\qquad
d_i:=A_i-i.
\]

The height path is the complementary row length

\[
\boxed{h_i=m_i-d_i.} \tag{1}
\]

For \(1\leq i<s\), define

\[
\varepsilon_i:=m_i-m_{i-1}
=B_i-B_{i-1}-1\in\{0,1\}.
\]

Then

\[
\boxed{
d_i-d_{i-1}
=\varepsilon_i-(h_i-h_{i-1})
=A_i-A_{i-1}-1.} \tag{2}
\]

Consequently, row \(i\) supplies a removable corner precisely when the
quantity in \((2)\) is positive.  If \(U\) and \(R\) denote the numbers of
upward and downward height transitions, respectively, and

\[
Z:=\#\{i:h_i=h_{i-1},\ \varepsilon_i=1\},
\]

then

\[
\boxed{T=U+R,\qquad |K(I)|=R+Z.} \tag{3}
\]

Indeed, every upward transition has size one and has
\(\varepsilon_i=1\), so it creates no corner.  Every downward transition
creates exactly one corner, independently of its size.  A constant-height
edge creates a corner precisely when the mechanical ceiling rises.

For a corner \(c_i=(i,d_i)\), equations \((O3)\) and \((O5)\) become

\[
\boxed{
t(c_i)=A_i-1,
\qquad
\Delta_{c_i}=2^{A_i-1}3^{s-1-i},} \tag{4}
\]

\[
\boxed{
L_{c_i}=[2^{A_i-1}3^{-i-1}]_{2^N},
\qquad
V_{c_i}=\frac{D L_{c_i}+\Delta_{c_i}}{2^N}.} \tag{5}
\]

Thus downward-transition count is the correct transition-forced boundary
parameter.  However, \((3)\) gives no growing lower bound for it.  Since every
upward jump has size one but a downward jump may have arbitrary size, one
downward jump can discharge all previous rises.

## 2. An all-depth ramp-plus-one-drop family

Let \(s\) be any \(q=2\) weight, and put

\[
N:=\lceil s\log_2 3\rceil,
\qquad M:=2^N,
\qquad P:=3^s,
\qquad D:=M-P,
\qquad e:=N-s.
\]

The \(q=2\) condition is

\[
N-\lceil(s-1)\log_2 3\rceil=1,
\]

so \(B_{s-1}=N-2\).  Define

\[
h_i:=
\begin{cases}
m_i,&0\leq i\leq s-2,\\
0,&i=s-1.
\end{cases} \tag{6}
\]

Equivalently,

\[
A_i=i\quad(0\leq i\leq s-2),
\qquad
A_{s-1}=N-2. \tag{7}
\]

This is an anchored \(b=1\) first-crossing profile.  Its transition count
and complete removable-corner set are

\[
\boxed{
T=m_{s-2}+1
=\lfloor(s-2)(\log_2 3-1)\rfloor+1,
\qquad
K(I)=\{(s-1,e-1)\}.} \tag{8}
\]

In particular, \(T=\Theta(s)\) while \(|K(I)|=1\).  All ceiling rises before
the endpoint are upward height transitions, hence they add no cells to the
ideal.  The final drop adds the only nonzero row and the only removable
corner.

The sole corner has the exact data

\[
t=N-3,
\qquad
\Delta=\frac M8. \tag{9}
\]

If \(u:=[P^{-1}]_8\), then \(u=1\) for even \(s\) and \(u=3\) for odd
\(s\), and

\[
\boxed{
L=\frac{uM}{8},
\qquad
V=\frac{uD+1}{8}.} \tag{10}
\]

The actual anchored carry, including all noncorner cells in the final row,
is

\[
\boxed{
C(I)=P-2^s+\sum_{r=1}^{e-1}2^{s+r-2}
=P+\frac M4-3\cdot2^{s-1}.} \tag{11}
\]

If this ideal were an inclusion-minimal failure, its complete all-subset
condition would have only one instance, namely

\[
\rho<M-L,
\qquad
\tau<V. \tag{12}
\]

Thus the dense-transition theorem supplies no simultaneous subset flux at
all for this family.  The family is not asserted to satisfy the target
equation, and it is not an FCD counterexample.  It refutes the proposed
deduction from high \(T\) to many instances of \((O12)\).

## 3. What the 2-adic separation does and does not give

There is a clean separation statement for an arbitrary removable boundary.
If the corners are ordered by row, then their values \(A_i-1\) are strictly
increasing, and \((5)\) gives

\[
v_2(L_{c_i})=A_i-1. \tag{13}
\]

For two distinct corner subsets \(S,S'\), the term of least valuation in
their symmetric difference occurs once.  Therefore

\[
\boxed{
v_2(L_S-L_{S'})
=\min_{c_i\in S\mathbin\triangle S'}(A_i-1)<N.} \tag{14}
\]

In particular, all \(2^{|K(I)|}\) subset sums are distinct modulo \(M\).
This fact is useful only after a lower bound for \(|K(I)|\) is known.  The
ramp family has one subset direction, so \((14)\) is vacuous there.  Even a
large value of \(T\) cannot be inserted into the subset count because \((3)\),
not \(T=U+R\), controls the number of boundary directions.

The ordinary threshold ordering \((O6)\) has the same limitation.  It compares
the corners which exist, but it cannot turn an upward height transition into
a corner.  Moreover, the four-corner virtual model in
`corner_flux_solve.md` already shows that threshold ordering and all subset
identities can coexist with the complete punctured-cube coloring when the
anchored interior sum is omitted.

## 4. The second loss under minimalization

There is a separate obstruction to applying \((O12)\).  The transition theorem
holds for the original \(q=2,b=1\) target, while \((O12)\) holds for an
inclusion-minimal failure.  Passing to a globally minimal failing subideal
need not preserve \(b=1\): removing a cell from the terminal row makes
\(h_{s-1}>0\).  It also need not preserve the transition lower bound.

Thus a uniform bridge requires a new theorem of one of the following forms.

1. The anchored target congruence forces \(R+Z\) to grow, and this growth
   survives descent to a minimal failure.
2. The noncorner cells in the anchored sum \((11)\) force one proper
   corner-subideal to fail, without first converting transitions into
   corners.

Neither conclusion follows from the present transition estimate, 2-adic
subset separation, threshold ordering, or the complete flux identity.
The irreducible missing datum is the interaction of the target residue with
the anchored interior cells.

## 5. Exact audit

The checker
[`inverse/q2_dense_corner_flux_certificate.js`](inverse/q2_dense_corner_flux_certificate.js)
reconstructs the complete height and delay paths, verifies \((8)\), checks
\((9)\)-\((11)\), and checks the exact singleton flux identity at every \(q=2\)
weight through a requested bound.  Its default bound is \(s\leq2000\).
This finite audit checks the formulas only.  It is not used as evidence for
the all-depth no-go, which follows directly from \((1)\)-\((11)\).
