# Terminal-preserving minimalization of the \(q=2\) flux cube

**Date:** 26 August 2026  
**Mode:** SOLVE  
**Status:** the logarithmic corner bound survives a minimal-failure
reduction once the terminal row is held fixed. Every hypothetical
\(q_s=2,b=1\) failure contains a terminal-preserving minimal failure whose
nonterminal corners satisfy the complete all-subset flux identity. The
resulting cube has more than

\[
\frac{s-1}{2\log_2(307s^{15})}
\]

vertices. The remaining gate is an anchored noncancellation theorem on
this growing cube.

## 1. Anchored ideals and the FCD color

Fix a \(q_s=2\) weight and put

\[
N:=\lceil s\log_2 3\rceil,
\qquad
M:=2^N,
\qquad
P:=3^s,
\qquad
D:=M-P,
\qquad
e:=N-s.
\tag{1}
\]

An anchored \(b=1\) profile has nondecreasing delays

\[
0=d_0\leq d_1\leq\cdots\leq d_{s-1}=e-1,
\qquad
d_i\leq m_i:=\lfloor i\log_2 3\rfloor-i.
\tag{2}
\]

Its Ferrers ideal is

\[
I(d):=\{(i,r):1\leq i<s,\ 1\leq r\leq d_i\}.
\tag{3}
\]

For a cell \(c=(i,r)\), put

\[
\Delta_c:=2^{i+r-1}3^{s-1-i}.
\tag{4}
\]

The anchored carry is

\[
C(I)=P-2^s+\sum_{c\in I}\Delta_c.
\tag{5}
\]

Define the canonical coordinates

\[
\rho:=[CD^{-1}]_M,
\qquad
\tau:=[CM^{-1}]_D,
\tag{6}
\]

and the branch color

\[
E(I):=\frac{D\rho+M\tau-C}{MD}\in\{0,1\}.
\tag{7}
\]

The FCD branch is \(E(I)=1\); a failure has \(E(I)=0\).

The removable corners are

\[
K(I):=\{(i,d_i):d_i>d_{i-1}\}.
\tag{8}
\]

At a \(q_s=2\) weight,

\[
m_{s-2}=e-2<m_{s-1}=e-1.
\tag{9}
\]

Thus every anchored \(b=1\) ideal has the terminal corner

\[
c_*:=(s-1,e-1).
\tag{10}
\]

## 2. Exact corner-subset update

For each cell \(c\), define

\[
L_c:=[\Delta_cP^{-1}]_M,
\qquad
V_c:=\frac{DL_c+\Delta_c}{M}.
\tag{11}
\]

For a corner subset \(S\), write

\[
L_S:=\sum_{c\in S}L_c,
\qquad
V_S:=\sum_{c\in S}V_c.
\tag{12}
\]

Removing \(S\) preserves the order-ideal property, and the exact coordinate
updates give

\[
\boxed{
E(I\setminus S)
=E(I)
+\left\lceil\frac{V_S-\tau}{D}\right\rceil
-\left\lfloor\frac{\rho+L_S}{M}\right\rfloor.}
\tag{13}
\]

This identity is purely algebraic and does not require minimality.

## 3. Terminal-preserving minimal failure

Assume that at least one anchored \(q_s=2,b=1\) failure exists at weight
\(s\). Among all such failures, choose \(I\) inclusion-minimal while
requiring the complete terminal row

\[
d_{s-1}=e-1
\tag{14}
\]

to remain fixed.

This finite partially ordered set has a minimal element. It need not be
globally minimal among every ideal of the ballot board. That stronger
minimalization could remove \(c_*\) and leave the \(b=1\) class.

Put

\[
K^\circ(I):=K(I)\setminus\{c_*\}.
\tag{15}
\]

If \(\varnothing\neq S\subseteq K^\circ(I)\), then \(I\setminus S\) is a
proper anchored ideal and still has terminal row \((14)\). Minimality
therefore gives

\[
E(I\setminus S)=1.
\tag{16}
\]

Since \(E(I)=0\), equation \((13)\) proves the terminal-preserving flux
theorem.

**Theorem 1.** For every nonempty subset
\(S\subseteq K^\circ(I)\),

\[
\boxed{
\left\lceil\frac{V_S-\tau}{D}\right\rceil
-\left\lfloor\frac{\rho+L_S}{M}\right\rfloor
=1.}
\tag{17}
\]

Thus the complete Boolean cube on the nonterminal corners, not merely its
singletons, is synchronized between the dyadic and reduced wrap
coordinates.

## 4. The cube is growing

The terminal-preserving minimal failure is itself an anchored
\(q_s=2,b=1\) target. The logarithmic corner theorem therefore applies:
if \(c:=|K(I)|\), then

\[
2^c>
\frac{s-1}{\log_2(307s^{15})}.
\tag{18}
\]

Since \(c_*\) is one corner,

\[
\boxed{
2^{|K^\circ(I)|}
=2^{c-1}
>
\frac{s-1}{2\log_2(307s^{15})}.}
\tag{19}
\]

Moreover, all dyadic subset sums \(L_S\) are distinct modulo \(M\). The
two-adic valuations of the corner thresholds are strictly increasing:

\[
v_2(L_{(i,d_i)})=A_i-1.
\tag{20}
\]

For two distinct subsets, the least-valuation term in their symmetric
difference occurs once, so their sums cannot agree modulo \(M\).

Consequently, Theorem 1 supplies a growing collection of distinct exact
wrap constraints, all inside the original \(b=1\) target class.

## 5. What remains

This result repairs the minimalization loss identified by the dense
corner-flux audit. The earlier global choice could delete the terminal row,
while the present choice retains it and loses only the terminal corner
direction from the cube.

The estimate \((19)\) is still polynomial rather than exponential in
\(s\). The modulus \(M\) is exponential, so distinctness alone gives no
contradiction. Nor do threshold ordering and zero curl exclude a punctured
cube coloring.

The exact remaining task is now to exclude an anchored \(q_s=2,b=1\)
ideal with \(E(I)=0\) for which every nonempty subset of a set
\(K^\circ\) satisfying \((19)\) obeys the flux identity \((17)\).

A successful theorem must use the anchored carry \((5)\), or an equivalent
relation among its interior cells. The present result does not prove FCD,
exclude every cycle, or address divergence.

The later complete-lattice audit in
[`cycle_boundary_anchored_lattice_attack_2026-08-26.md`](cycle_boundary_anchored_lattice_attack_2026-08-26.md)
shows that this qualification cannot be weakened. The four-corner virtual
translation has color \(1\) at all 29 proper terminal-preserving subideals
and color \(0\) only at the top. Thus replacing the corner cube by the
entire proper subideal interval still does not remove the need for the
absolute anchored carry.
