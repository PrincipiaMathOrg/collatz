# Complete corner flux: exact reduction and a sharp local no-go

**Date:** 17 August 2026  
**Mode:** SOLVE  
**Question:** Can the complete Boolean-cube condition (O12), together with
the genuine multiplicative corner weights and removable-corner geometry,
exclude an inclusion-minimal anchored Ferrers-ideal failure?

## 1. Outcome

Not by a boundary-only argument.  There is an exact four-corner virtual
failure on one genuine ballot-board ideal for which

1. the four cells are the complete removable-corner set;
2. their weights are the actual values
   \(2^{i+r-1}3^{s-1-i}\);
3. the \(L\)- and \(V\)-threshold orders agree;
4. (O12) holds for all \(2^4-1=15\) nonempty corner subsets; and
5. every proper vertex of the complete corner cube has FCD color \(1\),
   while the virtual top has color \(0\).

Thus sorted thresholds, initial or final segments, floor/ceiling distribution
functions, and complementary subsets do not force a contradiction, even
when applied to the complete removable boundary rather than to one square.

This is not an FCD counterexample.  The virtual top carry is \(13085\), while
the anchored valuation of the displayed ideal is \(13349\).  The offset
\(264\) is exactly the datum which defeats the local countermodel.  Hence the
all-weight anchored FCD gate remains open.

## 2. The floor/ceiling condition is an exact margin condition

Assume that \(I\) is a failure, so

\[
D\rho+M\tau=C.
\tag{1}
\]

For a nonempty subset \(S\) of removable corners, set

\[
x_S:=\frac{\rho+L_S}{M},
\qquad
y_S:=\frac{V_S-\tau}{D}.
\]

The cell identity \(MV_S=DL_S+\Delta_S\) and (1) give

\[
x_S-y_S=\frac{C-\Delta_S}{MD}.
\tag{2}
\]

The right side is strictly between \(0\) and \(1\).  Positivity follows
because \(C-\Delta_S\) is the carry of the proper subideal \(I\setminus S\).
For the upper bound, every first-crossing carry is less than \(sM/3\), while
the audited determinant bound gives \(D>s/3\), and hence
\(C-\Delta_S<MD\).

Consequently

\[
\left\lceil y_S\right\rceil-\left\lfloor x_S\right\rfloor=1
\]

if and only if \(x_S\) and \(y_S\) lie in the same open unit interval.  In
residue form this is

\[
\boxed{
D[\rho+L_S]_M>C-\Delta_S.}
\tag{3}
\]

Indeed, writing \(a_S=\lfloor x_S\rfloor\), condition (2) says that the
fractional part of \(x_S\) must exceed
\((C-\Delta_S)/(MD)\); multiplication by \(MD\) gives (3).

But \([\rho+L_S]_M\) is exactly the canonical binary residue of
\(I\setminus S\), and \(C-\Delta_S\) is its carry.  Thus (3) is exactly the
ordinary FCD margin for that proper subideal.  The complete Boolean-cube
condition retains every proper-vertex margin, but it does not average or
majorize them into a new inequality.

## 3. A complete four-corner countermodel to every boundary-only lemma

Take

\[
s=8,\qquad k=13,\qquad
M=8192,\qquad P=6561,\qquad D=1631.
\]

Consider the genuine ballot-board ideal with delay vector

\[
d=(0,0,1,1,2,2,3,4),
\]

corresponding to the primitive first-crossing word

\[
1101101101010.
\]

Its complete removable-corner set is

\[
K=\{(2,1),(4,2),(6,3),(7,4)\}.
\]

Exact modular evaluation gives

\[
\begin{array}{c|r|r|r}
c&\Delta_c&L_c&V_c\\ \hline
(2,1)&972&2124&423\\
(4,2)&864&1888&376\\
(6,3)&768&768&153\\
(7,4)&1024&1024&204
\end{array}
\tag{4}
\]

The sorted orders coincide:

\[
(6,3)<(7,4)<(4,2)<(2,1)
\]

in both the \(L\)- and \(V\)-coordinates.

Now use the virtual top carry

\[
C_*=13085.
\]

Its canonical coordinates are

\[
(\rho_*,\tau_*,E_*)=(3,1,0).
\tag{5}
\]

For every nonempty \(S\subseteq K\), (4) gives

\[
0<\rho_*+L_S
\le 3+2124+1888+768+1024
=5807<8192,
\]

and

\[
0<V_S-\tau_*
\le423+376+153+204-1
=1155<1631.
\]

Therefore, simultaneously for all fifteen nonempty subsets,

\[
a_S=\left\lfloor\frac{\rho_*+L_S}{M}\right\rfloor=0,
\qquad
b_S=\left\lceil\frac{V_S-\tau_*}{D}\right\rceil=1.
\]

Hence \(b_S-a_S=1\) for every \(S\ne\varnothing\).  By the exact flux
identity, all fifteen proper vertices have color \(1\), while (5) gives
color \(0\) at the top.  This verifies the full punctured four-cube, not
merely the old two-dimensional face with increments \(768\) and \(1024\).

In particular, taking initial segments, final segments, or complementary
pairs cannot add a contradiction: all of them are already among these
fifteen subsets, and the two wrap distribution functions are identically
\(0\) and \(1\), respectively, away from the empty subset.

The subsequent audit in
[`cycle_boundary_anchored_lattice_attack_2026-08-26.md`](cycle_boundary_anchored_lattice_attack_2026-08-26.md)
strengthens this no-go. Applying the same translation \(C\mapsto C-264\)
to every terminal-preserving subideal below the displayed top gives exactly
30 vertices. The top is the unique vertex of color \(0\), while all 29
proper subideals have color \(1\). Thus even complete subideal minimality,
not only the exposed Boolean cube, is compatible with the virtual failure.
The exact checker is
[`inverse/q2_full_subideal_virtual_probe.js`](inverse/q2_full_subideal_virtual_probe.js).

## 4. Exactly where anchoring enters

The ideal above has front carry

\[
C_{\mathrm{front}}=3^8-2^8=6305.
\]

Summing all thirteen cells of the ideal gives

\[
C(I)=C_{\mathrm{front}}+
\sum_{c\in I}2^{i(c)+r(c)-1}3^{7-i(c)}
=13349.
\tag{6}
\]

This agrees with the direct carry of \(1101101101010\).  Its canonical
coordinates are

\[
(\rho(I),\tau(I),E(I))=(3067,1022,1).
\tag{7}
\]

Thus

\[
C(I)-C_*=264.
\]

Equations (6)--(7) are the only point at which the countermodel fails.  The
board, ideal, complete removable boundary, multiplicative cell weights,
threshold order, every subset floor/ceiling identity, and every complementary
subset comparison are all genuine.  What is not genuine is the translation
of the CRT state relative to the anchored interior sum.

This also sharpens the interpretation of the old virtual-square regression:
that square is a face of a complete four-corner punctured cube satisfying all
of (O12).

## 5. What the result rules out

The following proposed combinatorial lemma is false.

> For the complete removable boundary of a ballot-board ideal, genuine
> multiplicative cell weights, compatible threshold order, and the
> all-subset wrap equations alone forbid a punctured Boolean cube whose top
> has color \(0\) and whose other vertices have color \(1\).

The countermodel in Section 3 satisfies every hypothesis and violates the
conclusion.  It also rules out any proof of that lemma obtained by checking
only sorted initial/final segments, comparing the two wrap distribution
functions, or pairing complementary subsets.

It does **not** refute the anchored statement obtained by adding (6).  That
anchored statement is the unresolved FCD gate itself.

## 6. Irreducible remaining gate

An all-weight proof must use the noncorner cells in the anchored sum, not only
the complete boundary data.  One exact formulation is:

\[
\boxed{
E(I)=0\ \Longrightarrow\
\text{there exists a nonempty }S\subseteq K(I)\text{ with }
D[\rho(I)+L_S]_M\le C(I)-\Delta_S.}
\tag{8}
\]

The right side says that at least one proper corner-subideal is also a
failure.  Iterating (8) would descend to the front ideal, which is known to
be FCD, and therefore prove all-weight FCD.  Conversely, a minimal anchored
failure violates (8) for every nonempty \(S\), so proving (8) is not a weaker
problem in disguise.

The exact certificate is
[`inverse/corner_flux_no_go.js`](inverse/corner_flux_no_go.js).  It checks
the board geometry, all four \((\Delta,L,V)\) triples, threshold order, all
fifteen instances of (O12), the anchored carry and its offset, and the
weight-\(29\), \(\tau=14\) half-residue regression.  No finite scan is used
as evidence for an all-depth claim.

## 7. What was learned

The complete Boolean cube is genuinely stronger than a single-vertex
margin, but it is still local boundary information.  Even on a real Ferrers
shape it admits the full minimal-failure coloring.  The unique surviving
distinction is the anchored contribution of the interior cells.  The next
mode should therefore remain SOLVE, focused on an inequality or congruence
linking that interior sum to at least one corner-subideal margin in (8);
further threshold sorting or subset-wrap bookkeeping cannot supply it.
