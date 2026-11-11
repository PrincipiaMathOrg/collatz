# The complete three-corner sector of the strict \(q=2\) gate

**Date:** 26 August 2026  
**Mode:** SOLVE  
**Status:** complete for the sector stated below. Every anchored
\(q_s=2,b=1\) strict or equality target has at least four removable
Ferrers corners. We classify the complete three-corner family, obtain an
all-depth analytic cutoff from three exact exponent-one cylinders, and
exclude the remaining finite range by an exact meet-in-the-middle residue
certificate.

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

Let \(s\geq3\) satisfy

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

Define the delay path and its mechanical ceiling by

\[
d_i:=A_i-i,
\qquad
m_i:=B_i-i.
\tag{5}
\]

The path \((d_i)\) is nondecreasing, \(d_i\leq m_i\), and

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

Therefore, the terminal delay \(e-1\) is unavailable before the last
vertex.

## 2. Complete classification

Suppose that the delay path has exactly three strict increases. The last
increase occurs at \(s-1\). Consequently, there are unique integers

\[
1\leq J<K\leq s-2,
\qquad
1\leq a<b,
\qquad
a\leq m_J,
\qquad
b\leq m_K,
\tag{8}
\]

such that

\[
d_i=
\begin{cases}
0,&0\leq i<J,\\
a,&J\leq i<K,\\
b,&K\leq i\leq s-2,\\
e-1,&i=s-1.
\end{cases}
\tag{9}
\]

Conversely, every parameter quadruple satisfying (8) gives a strictly
anchored delay path with three corners. Thus (9) is a necessary and
sufficient normal form. Its accelerated exponent word is

\[
\boxed{
(1^{J-1},a+1,1^{K-J-1},b-a+1,1^{s-K-2},e-b,2).}
\tag{10}
\]

The endpoint cases \(K=J+1\) and \(K=s-2\) are included. Note also that
\(a=m_J\) is allowed. The second level may become available after row
\(J\), so replacing \(a\leq m_J\) by \(a<m_J\) would omit valid formal
profiles.

## 3. The exact carry

For \(1\leq i<s\), put

\[
X_i:=2^i3^{s-i}.
\tag{11}
\]

Summing the four constant-delay blocks in (9) gives the carry

\[
\boxed{
\begin{aligned}
C(J,a,K,b)
={}&P+(2^a-1)X_J+(2^b-2^a)X_K\\
&-3\cdot2^{s+b-1}+\frac M4.
\end{aligned}}
\tag{12}
\]

This formula includes the terminal exponent \(A_{s-1}=N-2\). The
certificate compares (12) with the cell-by-cell carry on every
three-corner path through weight twelve.

## 4. Three exponent-one cylinders

Every positive strict or equality target realizes each proper valuation
exponent exactly. We retain the established estimates

\[
n<153s^{14.3},
\qquad
x_i<2^{h_i}H_s,
\qquad
H_s:=307s^{15},
\tag{13}
\]

where

\[
h_i:=m_i-d_i.
\tag{14}
\]

If \(L\) consecutive accelerated exponents are one, beginning at an odd
state \(x\), then

\[
2^{L+1}\mid x+1.
\tag{15}
\]

Indeed, after \(L\) such steps we have

\[
x_L+1=\frac{3^L(x+1)}{2^L},
\]

and both endpoint states are odd.

Applying (15) to the three constant-delay blocks in (9) gives

\[
\boxed{2^J<154s^{15},}
\tag{16}
\]

\[
\boxed{2^{K-J}\leq2^{m_J-a}H_s,}
\tag{17}
\]

and

\[
\boxed{2^{s-1-K}\leq2^{m_K-b}H_s.}
\tag{18}
\]

Put \(G_s:=154s^{15}\). Since \(m_i\leq i-1\), equations
(16)-(18) imply

\[
2^K\leq\frac{H_s}{2}(2^J)^2
\]

and

\[
2^{s-1}\leq\frac{H_s}{2}(2^K)^2.
\]

Therefore, every three-corner target satisfies

\[
2^s<\frac{H_s^3G_s^4}{4}
=4{,}068{,}534{,}644{,}364{,}652\,s^{105}.
\tag{19}
\]

Exact integer arithmetic gives

\[
2^{1115}>
4{,}068{,}534{,}644{,}364{,}652\cdot1115^{105},
\tag{20}
\]

while the reverse weak inequality holds at \(1114\). It also gives

\[
2\cdot1115^{105}>1116^{105}.
\tag{21}
\]

Since \(((s+1)/s)^{105}\) decreases with \(s\), equation (21) propagates
the reverse of (19). Thus no three-corner target exists for
\(s\geq1115\).

## 5. Exact finite pruning

For \(s\leq1114\), equations (16)-(18) are equivalent to the integer
conditions

\[
J\leq\left\lfloor\log_2(G_s-1)\right\rfloor,
\tag{22}
\]

\[
K-J\leq m_J-a+\lfloor\log_2H_s\rfloor,
\tag{23}
\]

and

\[
s-1-K\leq m_K-b+\lfloor\log_2H_s\rfloor.
\tag{24}
\]

The certificate counts the complete normal form (8) by exact suffix sums,
then independently checks the compressed count by direct enumeration
through weight eighty. There are

\[
4{,}021{,}454{,}334{,}444
\tag{25}
\]

classified profiles below the analytic cutoff. Exactly

\[
4{,}749{,}737{,}770
\tag{26}
\]

survive all three necessary cylinder conditions. The final nonempty row
is \(s=769\), where exactly one profile survives.

## 6. Exact residue compression

A strict or equality target satisfies

\[
Pn+C=M(n+d),
\qquad
n>0\text{ odd},
\qquad
0\leq d\leq d_{\max}:=
\left\lceil\frac{e-1}{2}\right\rceil.
\tag{27}
\]

Equivalently,

\[
C-Md=Dn.
\tag{28}
\]

Let \([z]_D\) denote the least residue modulo \(D\), and put

\[
\tau:=[CM^{-1}]_D.
\tag{29}
\]

The target interval is shorter than \(D\). Hence (27) requires

\[
0\leq\tau\leq d_{\max}.
\tag{30}
\]

For a fixed value of \(a\), split (12) as

\[
C=C_*+L_{J,a}+R_{K,b,a},
\tag{31}
\]

where

\[
C_*:=P+\frac M4,
\qquad
L_{J,a}:=(2^a-1)X_J,
\tag{32}
\]

and

\[
R_{K,b,a}:=(2^b-2^a)X_K-3\cdot2^{s+b-1}.
\tag{33}
\]

Define

\[
\tau_*:=[C_*M^{-1}]_D,
\qquad
\ell_{J,a}:=[L_{J,a}M^{-1}]_D,
\qquad
r_{K,b,a}:=[-R_{K,b,a}M^{-1}]_D.
\tag{34}
\]

Then

\[
\boxed{
\tau=[\tau_*+\ell_{J,a}-r_{K,b,a}]_D.}
\tag{35}
\]

For each fixed \(a\), the certificate stores every right-half residue
\(r_{K,b,a}\) which satisfies (24). It queries this collection once for
each left half \((J,a)\), then checks \(J<K\) and (23) on every returned
record.

The query itself is exact. Let \(Q\) be the least power of two greater
than \(d_{\max}\), and store a residue \(r\) under the integer key
\(\lfloor r/Q\rfloor\). If

\[
u:=[\tau_*+\ell_{J,a}]_D,
\]

then (30) is equivalent to

\[
r\in[u-d_{\max},u]\pmod D.
\tag{36}
\]

The circular interval in (36) is the union of at most two ordinary
intervals, and each ordinary interval meets at most two \(Q\)-buckets.
Thus at most four exact dictionary entries are inspected for each left
half. Every returned full residue is checked again modulo \(D\).

## 7. The certificate

The exact checker is
[`inverse/q2_three_corner_certificate.js`](inverse/q2_three_corner_certificate.js).
It records the following coverage:

~~~text
finite_maximum=1114
analytic_start=1115
q2_weights=462
classified_profiles=4021454334444
cylinder_profiles=4749737770
mitm_left_records=1527065
mitm_right_records=120702889
bucket_queries=1527065
bucket_candidate_checks=0
cylinder_compatible_candidates=0
strict_formal_hits=0
equality_formal_hits=0
positive_odd_hits=0
last_cylinder_row_s=769
last_cylinder_row_profiles=1
count_regression_weights=33
count_regression_profiles=6933258
residue_regression_profiles=6933258
residue_regression_hits=0
classification_regression_weights=4
classification_regression_profiles=80
circular_bucket_regression_cases=63364
~~~

The zero bucket-candidate count is stronger than a zero exact-hit count.
For every left half, none of the at most four coarse buckets covering the
complete target interval contains a right half.

The direct regression performs a separate cell-by-cell carry calculation,
checks the sign in (35), and scans every cylinder-admissible profile
through weight eighty. The circular query is independently compared with
brute force in \(63{,}364\) small-modulus cases.

## 8. Conclusion and scope

The analytic argument excludes \(s\geq1115\), while the exact residue
certificate excludes every smaller strict and equality target with three
corners. Combining this with the complete one-corner and two-corner
theorems proves the following result.

**Theorem 1.** Every hypothetical anchored \(q_s=2,b=1\) strict or
equality target satisfies

\[
\boxed{|K(I)|\geq4.}
\tag{37}
\]

In other words, a surviving target has at least three nonterminal corner
directions in addition to its forced terminal corner.

The result does not prove First-Crossing Descent, exclude every Collatz
cycle, or address divergent orbits. Its role is to close the complete
three-corner sector and strengthen the exact survivor geometry used by the
terminal-preserving flux argument.

