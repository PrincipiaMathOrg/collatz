# The complete four-corner sector of the strict \(q=2\) gate

**Date:** 26 August 2026  
**Mode:** SOLVE  
**Status:** complete for the sector stated below. Every anchored
\(q_s=2,b=1\) strict or equality target has at least five removable
Ferrers corners. We classify the complete four-corner family, obtain an
all-depth analytic cutoff from four exponent-one cylinders, and exclude
the finite remainder with exact dyadic-prefix and reduced-residue
certificates.

## 1. Setup

Put

\[
\alpha:=\log_2 3,
\qquad
k_i:=\lceil i\alpha\rceil,
\qquad
B_i:=\lfloor i\alpha\rfloor=k_i-1
\quad(i\geq1).
\tag{1}
\]

Let \(s\geq4\) satisfy

\[
k_s-k_{s-1}=1.
\tag{2}
\]

Write

\[
N:=k_s,
\qquad
e:=N-s,
\qquad
M:=2^N,
\qquad
P:=3^s,
\qquad
D:=M-P.
\tag{3}
\]

An anchored \(b=1\) profile has positions

\[
0=A_0<A_1<\cdots<A_{s-1}=N-2,
\qquad
A_i\leq B_i.
\tag{4}
\]

Define its delay path and mechanical ceiling by

\[
d_i:=A_i-i,
\qquad
m_i:=B_i-i.
\tag{5}
\]

Then \((d_i)\) is nondecreasing, \(d_i\leq m_i\), and

\[
d_0=0,
\qquad
d_{s-1}=m_{s-1}=e-1.
\tag{6}
\]

Its removable Ferrers corners are exactly the strict increases of
\((d_i)\). At a \(q_s=2\) weight, the predecessor identity gives

\[
k_{s-1}-k_{s-2}=2,
\qquad
m_{s-2}=e-2.
\tag{7}
\]

Thus the terminal delay \(e-1\) first becomes available at the last
vertex.

## 2. Complete classification

Suppose that the delay path has exactly four strict increases. The last
increase occurs at \(s-1\). Consequently, there are unique integers

\[
1\leq J<K<L\leq s-2,
\qquad
1\leq a<b<c,
\tag{8}
\]

with

\[
a\leq m_J,
\qquad
b\leq m_K,
\qquad
c\leq m_L,
\tag{9}
\]

such that

\[
d_i=
\begin{cases}
0,&0\leq i<J,\\
a,&J\leq i<K,\\
b,&K\leq i<L,\\
c,&L\leq i\leq s-2,\\
e-1,&i=s-1.
\end{cases}
\tag{10}
\]

Conversely, every sextuple satisfying (8)-(9) gives a strictly anchored
four-corner path. Thus (10) is a necessary and sufficient normal form.
Its accelerated exponent word is

\[
\boxed{
(1^{J-1},a+1,1^{K-J-1},b-a+1,
1^{L-K-1},c-b+1,1^{s-L-2},e-c,2).}
\tag{11}
\]

All empty exponent-one runs are allowed. Since
\(c\leq m_L\leq m_{s-2}=e-2\), the penultimate exponent \(e-c\) is at
least two.

## 3. The exact carry

For \(1\leq i<s\), put

\[
X_i:=2^i3^{s-i}.
\tag{12}
\]

Summing the five constant-delay blocks in (10) gives

\[
\boxed{
\begin{aligned}
C(J,a,K,b,L,c)
={}&P+(2^a-1)X_J+(2^b-2^a)X_K\\
&+(2^c-2^b)X_L-3\cdot2^{s+c-1}+\frac M4.
\end{aligned}}
\tag{13}
\]

The low-weight certificate compares (13) with the original cell-by-cell
carry on every four-corner path through weight twelve.

## 4. Four exponent-one cylinders

Every positive strict or equality target realizes each proper valuation
exponent exactly. We use the established bounds

\[
n<153s^{14.3},
\qquad
x_i<2^{h_i}H_s,
\qquad
H_s:=307s^{15},
\tag{14}
\]

where

\[
h_i:=m_i-d_i.
\tag{15}
\]

If \(R\) consecutive accelerated exponents are one, beginning at an odd
state \(x\), then

\[
2^{R+1}\mid x+1.
\tag{16}
\]

Indeed, after those steps,

\[
x_R+1=\frac{3^R(x+1)}{2^R},
\]

and both endpoint states are odd. Applying (16) to the four constant-delay
blocks in (10) gives

\[
\boxed{2^J<154s^{15},}
\tag{17}
\]

\[
\boxed{2^{K-J}\leq2^{m_J-a}H_s,}
\tag{18}
\]

\[
\boxed{2^{L-K}\leq2^{m_K-b}H_s,}
\tag{19}
\]

and

\[
\boxed{2^{s-1-L}\leq2^{m_L-c}H_s.}
\tag{20}
\]

Put \(G_s:=154s^{15}\). Since \(m_i\leq i-1\), equations (18)-(20)
give the convenient weak recurrences

\[
2^K\leq\frac{H_s}{2}(2^J)^2,
\qquad
2^L\leq\frac{H_s}{2}(2^K)^2,
\qquad
2^{s-1}\leq\frac{H_s}{2}(2^L)^2.
\tag{21}
\]

Combining (17) and (21), every four-corner target satisfies

\[
\boxed{
2^s<\frac{H_s^7G_s^8}{64}
=C_4s^{225},}
\tag{22}
\]

where

\[
C_4:=\frac{307^7\,154^8}{64}
=1{,}270{,}440{,}766{,}196{,}347{,}358{,}781{,}302{,}338{,}474{,}732.
\tag{23}
\]

## 5. Analytic cutoff

Exact integer arithmetic gives

\[
2^{2672}>C_4\,2672^{225},
\tag{24}
\]

while the reverse weak inequality holds at \(2671\). It also gives

\[
2\cdot2672^{225}>2673^{225}.
\tag{25}
\]

The ratio \(((s+1)/s)^{225}\) decreases with \(s\), so (25) propagates
the reverse of (22). No four-corner strict or equality target has

\[
s\geq2672.
\tag{26}
\]

## 6. The exact dyadic seed condition

The polynomial seed estimate in (14) is implemented without floating
point arithmetic. Put

\[
B_s:=\left\lceil(153^{10}s^{143})^{1/10}\right\rceil.
\tag{27}
\]

Since \(n\) is an integer, (14) is equivalent to the necessary bound

\[
n<B_s.
\tag{28}
\]

Let

\[
S:=2^{N-2}.
\tag{29}
\]

The first \(s-1\) proper exponents determine the starting seed modulo
\(S\). For the normal form (10), define

\[
r_1:=-1-(2^a-1)2^J3^{-J},
\tag{30}
\]

\[
r_2:=r_1-(2^b-2^a)2^K3^{-K},
\tag{31}
\]

where all inverses are taken in the relevant power-of-two modulus. The
terminal half is

\[
T_{b,L,c}:=2^{L+b}3^{-L}
+2^c\left(2^{s-1}3^{-(s-1)}-2^L3^{-L}\right).
\tag{32}
\]

The exact seed residue is therefore

\[
\boxed{n\equiv r_2+T_{b,L,c}\pmod S.}
\tag{33}
\]

The certificate checks (33) independently against the original prefix
carry

\[
U:=\sum_{i=0}^{s-2}2^{i+d_i}3^{s-2-i},
\qquad
n\equiv-U3^{-(s-1)}\pmod S.
\tag{34}
\]

The first-level residue (30) has monotone truncations modulo increasing
powers of two. A target with \(n<B_s\) must keep each of these truncations
below \(B_s\). Applying this necessary prefix condition together with all
four cylinder inequalities leaves

\[
3{,}784{,}549{,}223{,}083
\tag{35}
\]

formal profiles below the analytic cutoff. The last nonempty row is

\[
s=759,
\tag{36}
\]

where exactly one profile remains. Consequently, the prefix and cylinder
conditions alone exclude every \(q_s=2\) row from \(760\) through
\(2671\).

## 7. Projected terminal-seed meet-in-the-middle

It remains to test the rows through \(759\). For a fixed central level
\(b\), equation (33) separates into a left record \((J,a,K,b)\) and a
right record \((b,L,c)\).

Put

\[
g:=\operatorname{bitlength}(B_s-1),
\qquad
Q:=2^g>B_s-1.
\tag{37}
\]

The target interval \([0,B_s-1]\) meets at most two \(Q\)-buckets in
each nonwrapping piece. To make the large rows tractable, the certificate
first projects (33) modulo

\[
S_p:=2^{g+p},
\qquad
p:=\min\{48,N-2-g\}.
\tag{38}
\]

It stores the bucket keys of \([-T_{b,L,c}]_{S_p}\) and queries the
circular interval ending at \([r_2]_{S_p}\). A solution modulo \(S\)
must project to one of these keys. Therefore, an empty projected
intersection is a rigorous exclusion, not a probabilistic filter.

Every occupied projected key is regenerated at the full modulus \(S\).
Every resulting seed below \(B_s\) is checked against the two omitted
cylinder-order conditions and then against the complete reduced residue.
Specifically, a strict or equality target requires

\[
C-Md=Dn,
\qquad
0\leq d\leq d_{\max}:=
\left\lceil\frac{e-1}{2}\right\rceil,
\tag{39}
\]

or, equivalently,

\[
d=[CM^{-1}]_D\leq d_{\max}.
\tag{40}
\]

For every surviving candidate, the checker also verifies that the seed
obtained from (39) equals the dyadic seed in (33).

## 8. Exact coverage

Three exact programs partition the complete depth range.

The low-weight reduced-residue certificate covers every \(q_s=2\) row
through \(73\):

~~~text
q2_weights=29
cylinder_profiles=699213830
fixed_b_right_records=134788
left_queries=3975154
bucket_candidate_checks=0
strict_formal_hits=0
equality_formal_hits=0
carry_regression_profiles=76
terminal_split_regression_profiles=76
~~~

The high-row terminal-seed driver covers every \(q_s=2\) row from \(75\)
through \(759\). The omitted integer \(74\) is not a \(q_s=2\) weight.
Its frozen totals are

~~~text
q2_weights=285
right_records=753417326
left_queries=736636966
occupied_projected_bucket_hits=582
full_modulus_record_checks=387542
exact_small_terminal_seeds=238
exact_cylinder_candidates=130
reduced_residue_checks=130
strict_formal_hits=0
equality_formal_hits=0
rows_with_occupied_buckets=75,78,80,82
rows_with_small_seeds=75,78,80
~~~

Finally, the count certificate proves that no necessary profile remains in
rows \(760\) through \(2671\), and the analytic cutoff excludes every
row from \(2672\) onward. The principal checkers are

- [`inverse/q2_four_corner_low_residue_certificate.js`](inverse/q2_four_corner_low_residue_certificate.js),
- [`inverse/q2_four_corner_terminal_seed_row_certificate.js`](inverse/q2_four_corner_terminal_seed_row_certificate.js),
- [`inverse/q2_four_corner_terminal_seed_driver.js`](inverse/q2_four_corner_terminal_seed_driver.js), and
- [`inverse/q2_four_corner_count_probe.js`](inverse/q2_four_corner_count_probe.js).

They can be rerun with

~~~text
node inverse/q2_four_corner_low_residue_certificate.js 73
node inverse/q2_four_corner_terminal_seed_driver.js 75 759 4
node inverse/q2_four_corner_count_probe.js 2672 --seed-prefix
~~~

The production counts are frozen as assertions. The count compression is
also compared with direct enumeration on \(7{,}124{,}419\) small-board
profiles. The low certificate independently checks both the carry formula
and the terminal-seed split on every four-corner profile through weight
twelve.

## 9. Conclusion and scope

The exact certificates exclude every four-corner strict and equality
target below the analytic cutoff, while Sections 4-5 exclude every larger
weight. Combining this with the complete one-, two-, and three-corner
theorems proves the following result.

**Theorem 1.** Every hypothetical anchored \(q_s=2,b=1\) strict or
equality target satisfies

\[
\boxed{|K(I)|\geq5.}
\tag{41}
\]

Thus a surviving target has at least four nonterminal corner directions in
addition to its forced terminal corner.

The result does not prove First-Crossing Descent, exclude every Collatz
cycle, or address divergent orbits. It closes the complete four-corner
sector. The all-depth residual is still an anchored interior-carry
noncancellation theorem for a corner set whose size grows with \(s\).
