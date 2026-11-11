# Transition complexity on a normalized divergent ray

**Date:** 18 August 2026  
**Mode:** THEORIZE  
**Status:** A fixed positive normalized divergent ray must change its
coefficient height at least \(\Omega(\sqrt s)\) times in its first \(s\)
accelerated steps.  If the coefficient height is uniformly bounded, the
lower bound sharpens to \(\Omega(s/\log s)\).  Thus no divergent ray can be
a bounded-transition perturbation of the characteristic mechanical word.
This is a structural exclusion, not a proof of convergence.

## 1. Setup

Let \(n\) be a fixed positive odd seed with injective accelerated orbit
\((x_j)_{j\geq0}\).  Write

\[
x_{j+1}=\frac{3x_j+1}{2^{a_j}},
\qquad
A_j:=\sum_{i<j}a_i,
\qquad
\alpha:=\log_2 3.
\tag{1}
\]

Assume the normalized strict-barrier condition

\[
A_j<j\alpha
\qquad(j\geq1).
\tag{2}
\]

Every normalized divergent counterexample has these properties.  Put

\[
B_j:=\lfloor j\alpha\rfloor,
\qquad
h_j:=B_j-A_j\geq0.
\tag{3}
\]

Then

\[
a_j=B_{j+1}-B_j+h_j-h_{j+1}.
\tag{4}
\]

Since \(a_j\geq1\) and \(B_{j+1}-B_j\in\{1,2\}\), every upward height
jump has size at most one:

\[
h_{j+1}-h_j\leq1.
\tag{5}
\]

For a prefix of length \(s\), define

\[
T_s:=\#\{0\leq j<s:h_{j+1}\neq h_j\}.
\tag{6}
\]

## 2. State envelope

Let

\[
C_j:=\sum_{i=0}^{j-1}3^{j-1-i}2^{A_i}.
\]

The affine identity gives

\[
x_j=2^{h_j}\frac{3^jn+C_j}{2^{B_j}}.
\tag{7}
\]

Since \(B_j>j\alpha-1\), we have \(3^j/2^{B_j}<2\).  Also
\(A_i\leq B_i\), and each normalized carry summand satisfies

\[
\frac{3^{j-1-i}2^{A_i}}{2^{B_j}}<\frac23.
\]

Therefore

\[
\boxed{
x_j<2^{h_j}K_s,
\qquad
K_s:=2n+\frac{2s}{3}
\quad(0\leq j\leq s).}
\tag{8}
\]

## 3. Constant-height runs

On every edge for which \(h_j=h_{j+1}\), equation (4) becomes

\[
a_j=B_{j+1}-B_j.
\tag{9}
\]

The right-hand side is the characteristic mechanical word.  It has exactly
\(L+1\) factors of length \(L\).  Suppose a constant-height run at level
\(h\) contains \(u\) internal edges.  For \(u\geq2\), put

\[
L:=\left\lfloor\frac{u-1}{2}\right\rfloor.
\]

The \(L+2\) factors beginning at offsets \(0,1,\ldots,L+1\) remain in the
run, so two are equal.  Their starting orbit states are distinct because
the orbit is injective.  If the common factor has exponent sum \(Q\), the
exact odd-cylinder congruence puts both starts in one residue class modulo
\(2^{Q+1}\).  Since \(Q\geq L\), equation (8) gives

\[
2^{L+1}<2^hK_s.
\]

The cases \(u=0,1\) are immediate.  Hence

\[
\boxed{
2^{\lfloor u/2\rfloor}<2^hK_s.}
\tag{10}
\]

## 4. Transition lower bound

The \(T_s\) transition edges split the first \(s\) edges into
\(T_s+1\) constant-height runs.  Let their internal lengths and levels be
\(u_0,\ldots,u_{T_s}\) and \(\lambda_0,\ldots,\lambda_{T_s}\).  Then

\[
\sum_j u_j=s-T_s.
\tag{11}
\]

We have \(\lambda_0=0\).  Equation (5) gives
\(\lambda_j\leq j\), and hence

\[
\sum_{j=0}^{T_s}\lambda_j
\leq\frac{T_s(T_s+1)}2.
\tag{12}
\]

Put \(E:=\sum_j\lfloor u_j/2\rfloor\).  Equation (11) gives

\[
E\geq\frac{s-2T_s-1}{2}.
\tag{13}
\]

Multiplying (10) over all runs, squaring, and applying (12)-(13), we obtain

\[
\boxed{
2^{s-2T_s-1}
<2^{T_s(T_s+1)}K_s^{2T_s+2}.}
\tag{14}
\]

Writing \(L_s:=\log_2K_s\), this implies

\[
s<
T_s^2+(2L_s+3)T_s+2L_s+1.
\tag{15}
\]

Therefore

\[
\boxed{
T_s>
\frac{-(2L_s+3)+
\sqrt{(2L_s+3)^2+4(s-2L_s-1)}}2.}
\tag{16}
\]

Since \(n\) is fixed and \(L_s=O(\log s)\), equation (16) gives

\[
T_s=\Omega(\sqrt s).
\tag{17}
\]

## 5. Bounded-height sharpening

Suppose in addition that

\[
0\leq h_j\leq H
\qquad(0\leq j\leq s).
\tag{18}
\]

Then \(\sum_j\lambda_j\leq H(T_s+1)\).  Repeating the preceding product
argument gives

\[
2^{s-2T_s-1}
<2^{2H(T_s+1)}K_s^{2T_s+2}.
\tag{19}
\]

Consequently

\[
\boxed{
T_s>
\frac{s-1-2H-2\log_2K_s}
{2+2H+2\log_2K_s}.}
\tag{20}
\]

For fixed \(H\), this is

\[
T_s=\Omega\left(\frac{s}{\log s}\right).
\tag{21}
\]

## 6. Proof ledger

The following statements are proved.

1. Every constant coefficient-height run is exactly mechanical and obeys
   the return-lattice bound (10).
2. Every fixed normalized divergent ray satisfies the transition lower
   bounds (14)-(17).
3. A bounded-height divergent ray satisfies the stronger bounds
   (19)-(21).

The following gate remains open.

1. A normalized divergent ray may have unbounded height and
   transition count at least of order \(\sqrt s\).
2. Neither (16) nor (20) by itself forces a decoder renewal, a lower orbit
   state, or convergence.

Thus the surviving divergent obstruction is again a dense-transition
object, in agreement with the independent first-crossing analysis.
