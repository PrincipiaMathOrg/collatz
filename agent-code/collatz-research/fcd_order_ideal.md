# The anchored order-ideal form of the paired-wrap gate

## 1. Result

We do not obtain an all-depth proof of First-Crossing Descent, and we do not
obtain an ordinary counterexample.  We do obtain two exact statements which
use the anchored order-ideal structure.

First, the binary and reduced cell thresholds have the same ordinary order.
This rules out a threshold inversion as the source of a failure island.
Second, an inclusion-minimal failure must satisfy an all-subset boundary-flux
identity over its removable Ferrers corners.  The singleton cases are the
known inequalities \((X6)\), while every subset of at least two corners gives an
additional simultaneous wrap condition.

The second condition is genuinely stronger than the margin equation at one
vertex.  It retains the values of all boundary cells and the fact that every
proper subideal is on the FCD branch.  It is not equivalent to

\[
M\tau-C\leq 0.
\]

The virtual square \((X9)\) shows that neither threshold order nor zero curl closes
the argument.  In particular, the remaining step must distinguish the
anchored partial sums from arbitrary CRT carries.

## 2. The ballot board

Fix \(s\geq 2\), and put

\[
k:=\lceil s\log_2 3\rceil,
\qquad e:=k-s,
\qquad M:=2^k,
\qquad P:=3^s,
\qquad D:=M-P.
\]

Write the one positions of a primitive first-crossing word as

\[
0=A_0<A_1<\cdots<A_{s-1},
\]

and define its delays by

\[
d_i:=A_i-i.
\]

The prefix barrier is equivalent to

\[
0=d_0\leq d_1\leq\cdots\leq d_{s-1},
\qquad
d_i\leq m_i:=\lfloor i\log_2 3\rfloor-i.
\tag{O1}
\]

Thus the words of fixed \((k,s)\) are the order ideals in the finite board

\[
\mathcal B_s:=\{(i,r):1\leq i<s,\ 1\leq r\leq m_i\}.
\]

The ideal corresponding to \(d\) is

\[
I(d):=\{(i,r):1\leq r\leq d_i\}.
\tag{O2}
\]

Here inclusion is closed downward in \(r\) and to the right in \(i\).  The
front-loaded word \(1^s0^e\) is the empty ideal.

For a cell \(c=(i,r)\), put

\[
t(c):=i+r-1,
\qquad b(c):=s-1-i,
\qquad
\Delta_c:=2^{t(c)}3^{b(c)}.
\tag{O3}
\]

Moving the \(i\)-th one across the corresponding zero changes the carry by
exactly \(\Delta_c\).  Therefore the actual carry is not a free CRT parameter.
It is the anchored ideal valuation

\[
\boxed{
C(I)=C_{\mathrm{front}}+\sum_{c\in I}\Delta_c,
\qquad C_{\mathrm{front}}=P-2^s.}
\tag{O4}
\]

Indeed, summing each row gives

\[
C(I)=P-2^s+
\sum_{i=0}^{s-1}\sum_{r=1}^{d_i}
2^{i+r-1}3^{s-1-i}
=\sum_{i=0}^{s-1}2^{i+d_i}3^{s-1-i}.
\]

This is the original carry formula with \(A_i=i+d_i\).

## 3. Monotone coupling of cell thresholds

For a cell \(c\), define

\[
L_c:=[\Delta_cP^{-1}]_M,
\qquad
V_c:=\frac{DL_c+\Delta_c}{M}.
\tag{O5}
\]

The ballot bound gives

\[
0<\Delta_c\leq \frac P3<M,
\]

and the admissibility argument in \((F6)\) gives \(0<V_c<D\).

**Proposition 1.**  If \(c\) and \(c'\) are two cells in
\(\mathcal B_s\), then

\[
\boxed{(L_c-L_{c'})(V_c-V_{c'})\geq 0.}
\tag{O6}
\]

In other words, the binary and reduced thresholds cannot occur in opposite
ordinary orders.

**Proof.**  Suppose towards a contradiction that \(L_c>L_{c'}\) and
\(V_c<V_{c'}\).  Subtracting the two equations

\[
MV_c=DL_c+\Delta_c
\]

gives

\[
\Delta_{c'}-\Delta_c
=D(L_c-L_{c'})+M(V_{c'}-V_c)\geq M.
\]

On the other hand, both cell weights lie strictly between \(0\) and \(M\),
so \(\Delta_{c'}-\Delta_c<M\).  This is a contradiction.  The opposite
inversion is excluded in the same way.  The conclusion follows.

Note that Proposition 1 is stronger than cover-by-cover monotonicity.  It
compares every pair of cells in the ballot board.  It does not say that the
thresholds are monotone in either geometric coordinate, since both threshold
orders can turn together.

## 4. The all-subset boundary flux

Let \(I\) be an ideal, with carry \(C=C(I)\), and write

\[
\rho=[CD^{-1}]_M,
\qquad
\tau=[CM^{-1}]_D,
\qquad
E(I):=\frac{D\rho+M\tau-C}{MD}\in\{0,1\}.
\tag{O7}
\]

As in \((F9)\), \(E(I)=1\) is exactly the FCD branch.  Let \(K(I)\) denote the
set of removable corners of \(I\).  In delay coordinates these are

\[
K(I)=\{(i,d_i):d_i>d_{i-1}\},
\qquad d_{-1}:=0.
\tag{O8}
\]

Every subset \(S\subseteq K(I)\) can be removed simultaneously, and
\(I\setminus S\) remains an order ideal.  Put

\[
L_S:=\sum_{c\in S}L_c,
\qquad
V_S:=\sum_{c\in S}V_c,
\qquad
\Delta_S:=\sum_{c\in S}\Delta_c.
\]

The coordinate updates after removing \(S\) are

\[
\rho_{I\setminus S}
=\rho+L_S-a_SM,
\qquad
a_S:=\left\lfloor\frac{\rho+L_S}{M}\right\rfloor,
\tag{O9}
\]

and

\[
\tau_{I\setminus S}
=\tau-V_S+b_SD,
\qquad
b_S:=\left\lceil\frac{V_S-\tau}{D}\right\rceil.
\tag{O10}
\]

Summing \(MV_c=DL_c+\Delta_c\) over \(S\), and substituting \((O9)\) and
\((O10)\) into \((O7)\), gives the exact identity

\[
\boxed{
E(I\setminus S)=E(I)+b_S-a_S.}
\tag{O11}
\]

We now impose minimality.

**Proposition 2.**  Suppose that \(I\) is an inclusion-minimal FCD failure.
Then, for every nonempty subset \(S\subseteq K(I)\),

\[
\boxed{
\left\lceil\frac{V_S-\tau}{D}\right\rceil
-\left\lfloor\frac{\rho+L_S}{M}\right\rfloor=1.}
\tag{O12}
\]

**Proof.**  We have \(E(I)=0\).  If \(S\) is nonempty, then
\(I\setminus S\subsetneq I\), so inclusion-minimality gives
\(E(I\setminus S)=1\).  Equation \((O12)\) now follows from \((O11)\).

For a singleton \(S=\{c\}\), the bounds \(0<L_c<M\) and \(0<V_c<D\)
reduce \((O12)\) to

\[
\rho<M-L_c,
\qquad
\tau<V_c.
\tag{O13}
\]

These are exactly \((X6)\).  For two corners \(c,c'\), we obtain the additional
paired alternative

\[
\rho+L_c+L_{c'}\geq M
\quad\Longleftrightarrow\quad
\tau+D<V_c+V_{c'}.
\tag{O14}
\]

The endpoint conventions in \((O14)\) follow directly from the floor and ceiling
in \((O12)\).  Higher-cardinality subsets retain every cumulative boundary wrap.
Thus \((O12)\) is a Boolean-cube synchronization condition on the complete corner
boundary of a minimal failure.

## 5. Why the condition does not close FCD

Proposition 1 prevents the two threshold lists from crossing in opposite
orders.  Nevertheless, the virtual square in \((X9)\) uses genuine ballot-board
increments and has colors \((1,1,1,0)\).  Its two threshold orders are already
compatible with Proposition 1.  Therefore monotone threshold coupling, square
commutativity, and zero curl do not exclude a failure island.

Proposition 2 uses more information than that square.  It requires \((O12)\) for
every subset of the actual removable-corner set, and it requires the vertex
carry to equal the anchored sum \((O4)\).  We do not currently have an inequality
or congruence which shows that these requirements are inconsistent at all
depths.  Replacing \(C(I)\) by an arbitrary carry would lose precisely the
remaining information.

There is also no useful one-variable \(q\)-binomial factorization of \((O4)\).
The cell weights satisfy

\[
\Delta_{i,r+1}=2\Delta_{i,r},
\qquad
\Delta_{i+1,r}=\frac23\Delta_{i,r},
\]

while the generating exponent is the sum of these integer weights.  Thus the
anchored carry enumerator is a two-directional principal specialization, not
the rank specialization which produces an ordinary Gaussian binomial.
This observation does not rule out a more refined multivariate recurrence.

## 6. Exact finite audit

The script
[`inverse/fcd_order_ideal_audit.js`](inverse/fcd_order_ideal_audit.js)
checks the following statements by exact `BigInt` arithmetic.

1. It enumerates every primitive first-crossing word through a chosen shortcut
   length and verifies \((O1)\)--\((O4)\).
2. It checks \((F5)\)--\((F10)\) on every admissible ideal edge in that range.
3. It verifies \((O11)\) for every nonempty subset of the removable corners of
   every enumerated ideal.
4. It checks \((O6)\) for every pair of cells at every fixed weight in a chosen
   range.
5. It retains the weight \(29\), \(\tau=14\) counterexample to the stronger
   half-residue bound, the almost-barrier non-descent \(10111010\), and the
   virtual \((1,1,1,0)\) square as mandatory regressions.

The certificate is finite evidence only.  In particular, finding no mismatch
in a finite box is not a proof of \(\eta=\chi\) at all depths.

## 7. Remaining gate

The exact unresolved question can now be stated without free cell increments.
Let \(I\) range over the ideals of the ballot board \((O1)\), evaluate its carry by
\((O4)\), and evaluate its two canonical residues by \((O7)\).  Prove that no ideal
with \(E(I)=0\) exists.  Equivalently, prove that no anchored ideal can be the
top vertex of a Boolean corner cube satisfying \((O12)\).

The strongest conclusion of this note is therefore a necessary condition, not
FCD itself.  Any successful minimal-failure argument must violate the complete
corner-subset synchronization \((O12)\), using the anchored valuation \((O4)\).
