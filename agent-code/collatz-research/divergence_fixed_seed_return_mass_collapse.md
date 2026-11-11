# Fixed-seed return mass collapse

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** We obtain an all-depth collapse theorem for the proposed
binary-ternary and reciprocal-mass coupling.  On one fixed ordinary ray, a
returned stabilized prefix transports its complete truncated ternary decoder
profile, its reciprocal mass, and its normalized product through the same
single positive lift integer.  For one returned prefix at each increasing
depth, all resulting reciprocal and product charges are automatically
geometrically summable.  Thus this direct global coupling does not prove
HSCI.  A successful argument must add a cross-depth restriction on the
prime-to-three cofactors, on the return words, or on the lift integers.
Retaining the complete gap word gives such an exact restriction and closes
the recurrent-prefix subcase in which both gap surplus and prior-lift growth
are sublinear in the promoted depth.  The surviving case must pay linearly
through at least one of those quantities.  On a periodic orbit the same
identity reduces exactly to the original cycle integrality equation and
gives no general cycle contradiction.

## 1. Fixed-ray setup

Let

\[
x_{j+1}:=\frac{3x_j+1}{2^{a_j}},\qquad
A_j:=\sum_{i<j}a_i,\qquad
q_j:=\frac{3^j}{2^{A_j}}
\tag{1.1}
\]

be the normalized accelerated orbit of one fixed positive odd seed \(x_0=n\).
We work under the audited divergent-ray normalization:

\[
x_j\geq n,\qquad q_j>1\ (j\geq1),\qquad q_j\longrightarrow\infty,
\tag{1.2}
\]

the states are distinct, and

\[
r_j:=\frac1{q_j},\qquad
R:=\sum_{j=0}^{\infty}r_j<\infty.
\tag{1.3}
\]

Put

\[
h_j:=\frac{x_j}{q_j}=x_jr_j.
\tag{1.4}
\]

The affine recursion gives

\[
h_{j+1}=h_j+\frac{r_j}{3},
\qquad
h_j=n+\frac13\sum_{i<j}r_i.
\tag{1.5}
\]

Consequently

\[
\mathcal K:=\sup_jh_j=n+\frac R3<\infty.
\tag{1.6}
\]

Fix a prefix length \(L\), and write

\[
B:=A_L.
\tag{1.7}
\]

Since every \(a_j\geq1\), we have \(B\geq L\).  Once
\(2^{B+1}>n\), the least positive representative of the dyadic cylinder of
the prefix \((a_0,\ldots,a_{L-1})\) is exactly \(n\).

Suppose that this prefix returns at a positive shift \(d\):

\[
a_{d+i}=a_i\qquad(0\leq i<L).
\tag{1.8}
\]

Exact cylinder lifting and (1.2) give a unique integer \(u\geq1\) such that

\[
x_d=n+2^{B+1}u.
\tag{1.9}
\]

This is the fixed-seed input.  The seed \(n\) and the stationary constant
\(\mathcal K\) do not change with \(L\).

## 2. The complete returned-prefix transport

### Theorem 1. Full state and decoder transport

Under (1.1) to (1.9), for every \(0\leq i\leq L\),

\[
\boxed{
x_{d+i}-x_i
=2^{B-A_i+1}3^iu.}
\tag{2.1}
\]

In particular,

\[
\boxed{
\min\{v_3(x_{d+i}+1),i\}
=\min\{v_3(x_i+1),i\}.}
\tag{2.2}
\]

If

\[
b_i:=v_3(x_i+1)<i,
\tag{2.3}
\]

then the valuations in (2.2) are equal without truncation, and their
prime-to-three cofactors satisfy

\[
\boxed{
\frac{x_{d+i}+1}{3^{b_i}}
=\frac{x_i+1}{3^{b_i}}
+2^{B-A_i+1}3^{i-b_i}u.}
\tag{2.4}
\]

At the terminal point, (2.1) becomes

\[
\boxed{
x_{d+L}=x_L+2u3^L.}
\tag{2.5}
\]

**Proof.** The affine map determined by the first \(i\) exponents has
linear part \(3^i/2^{A_i}\).  The block beginning at \(d\) has the same
first \(i\) exponents.  Therefore

\[
x_{d+i}-x_i
=\frac{3^i}{2^{A_i}}(x_d-n)
=2^{B-A_i+1}3^iu,
\]

which proves (2.1).  The right side is divisible by \(3^i\), so
\(x_{d+i}+1\) and \(x_i+1\) agree modulo \(3^i\).  This proves (2.2).
If (2.3) holds, adding a multiple of \(3^i\) cannot change the exact
valuation \(b_i\).  Division of (2.1) by \(3^{b_i}\) gives (2.4).
Taking \(i=L\) gives (2.5). \(\square\)

The terminal decoder is therefore not a second coordinate independent of
the dyadic return.  More strongly, the entire truncated decoder profile
inside the returned prefix is a projection of the same affine lift \(u\).
When \(b_i<i\), equation (2.4) shows exactly what remains uncontrolled:
the prime-to-three cofactor moves along an affine progression indexed by
\(u\).

## 3. Exact reciprocal mass and product collapse

For \(L\geq1\), define the reciprocal mass of the initial prefix by

\[
R_L:=\sum_{i=0}^{L-1}r_i.
\tag{3.1}
\]

### Theorem 2. Returned-block factorization

Under the hypotheses of Theorem 1, for \(0\leq i\leq L\),

\[
\boxed{
r_{d+i}=r_dr_i.}
\tag{3.2}
\]

Consequently,

\[
\boxed{
\sum_{i=0}^{L-1}r_{d+i}=r_dR_L,}
\tag{3.3}
\]

\[
\boxed{
h_{d+L}-h_d=\frac{r_dR_L}{3},}
\tag{3.4}
\]

and the complete normalized product across the returned block is

\[
\boxed{
\prod_{i=0}^{L-1}\left(1+\frac1{3x_{d+i}}\right)
=\frac{h_{d+L}}{h_d}
=1+\frac{R_L}{3x_d}
=1+\frac{R_L}{3(n+2^{B+1}u)}.}
\tag{3.5}
\]

Moreover,

\[
\boxed{
r_d\leq\frac{\mathcal K}{2^{B+1}u},
\qquad
r_{d+L}\leq\frac{\mathcal K}{2u3^L}.}
\tag{3.6}
\]

Thus

\[
0<\log\frac{h_{d+L}}{h_d}
\leq\frac{R_L}{3\cdot2^{B+1}u}.
\tag{3.7}
\]

**Proof.** Equation (1.8) gives

\[
A_{d+i}=A_d+A_i.
\]

Hence

\[
r_{d+i}
=\frac{2^{A_d+A_i}}{3^{d+i}}
=r_dr_i,
\]

which proves (3.2) and (3.3).  Summing (1.5) from \(d\) to \(d+L\)
proves (3.4).  Since \(h_d=x_dr_d\), division of (3.4) by \(h_d\)
gives the middle expression in (3.5).  The stepwise form follows from

\[
\frac{h_{j+1}}{h_j}=1+\frac1{3x_j}.
\]

Finally, \(h_d=x_dr_d\leq\mathcal K\) and
\(x_d=n+2^{B+1}u>2^{B+1}u\), which gives the first bound in (3.6).
Multiplying it by

\[
r_L=\frac{2^B}{3^L}
\]

and using (3.2) gives the second.  Equation (3.7) follows from
\(\log(1+z)\leq z\). \(\square\)

For comparison, the product across the canonical prefix is

\[
\frac{h_L}{n}=1+\frac{R_L}{3n}.
\tag{3.8}
\]

The returned copy does not reproduce this full growth.  Its normalized
growth is divided by the lifted start \(n+2^{B+1}u\).  Thus deeper
stabilized returns become cheaper in precisely the scalar quantity that a
global product argument would try to accumulate.

## 4. Increasing depths are automatically thin

Let

\[
L_1<L_2<\cdots
\tag{4.1}
\]

be any increasing family of stabilized prefix lengths, and choose one
return time \(d_m\) for each \(L_m\).  Write

\[
B_m:=A_{L_m},\qquad
x_{d_m}=n+2^{B_m+1}u_m,\qquad u_m\geq1.
\tag{4.2}
\]

### Theorem 3. All-depth geometric bounds

Every family (4.1) to (4.2) satisfies

\[
\boxed{
\sum_m r_{d_m}
\leq\mathcal K\sum_m2^{-B_m-1}
\leq\frac{\mathcal K}{2},}
\tag{4.3}
\]

\[
\boxed{
\sum_m r_{d_m+L_m}
\leq\frac{\mathcal K}{2}\sum_m3^{-L_m}
\leq\frac{\mathcal K}{4},}
\tag{4.4}
\]

and

\[
\boxed{
\sum_m
\log\frac{h_{d_m+L_m}}{h_{d_m}}
\leq\frac R3\sum_m2^{-B_m-1}
\leq\frac R6.}
\tag{4.5}
\]

The formal sum of the returned-block height increments also satisfies

\[
\boxed{
\sum_m(h_{d_m+L_m}-h_{d_m})
\leq\frac{\mathcal KR}{6}.}
\tag{4.6}
\]

These estimates remain true if some selected blocks overlap.

**Proof.** Apply (3.6) and (3.7), use \(u_m\geq1\) and
\(R_{L_m}\leq R\), and note that

\[
B_m\geq L_m.
\]

Since the positive integers \(L_m\) are distinct,

\[
\sum_m2^{-B_m-1}
\leq\sum_{L=1}^{\infty}2^{-L-1}
=\frac12,
\qquad
\sum_m3^{-L_m}
\leq\sum_{L=1}^{\infty}3^{-L}
=\frac12.
\]

Equations (4.3) to (4.5) follow.  Equation (3.4), followed by the
same estimate, proves (4.6). \(\square\)

This is the key all-depth conclusion.  The reciprocal-mass convergence
required on a normalized divergent ray is not in tension with returned
stabilized prefixes at every increasing depth.  The returns are forced to
occupy a geometrically summable part of the reciprocal mass.  Their complete
normalized products are geometrically summable as well.

## 5. Nested returns and harmonic thinness

There are two possible ways to compare different depths.  Both collapse to
the same dyadic lift.

First suppose that two stabilized prefixes of lengths \(L<L'\) return at
the same start \(d\).  Put \(B:=A_L\) and \(B':=A_{L'}\).  Their lift
integers satisfy

\[
\boxed{
u_L=2^{B'-B}u_{L'}.}
\tag{5.1}
\]

Indeed, both sides represent the same fixed difference:

\[
x_d-n=2^{B+1}u_L=2^{B'+1}u_{L'}.
\]

In particular, a fixed positive return start cannot support stabilized
prefix returns at unbounded depths.  Otherwise \(x_d-n\) would be divisible
by arbitrarily high powers of two.  Hence an all-depth family necessarily
moves to unbounded return times.

Now fix one shorter stabilized prefix length \(L_0\), with
\(B_0:=A_{L_0}\).  Every deeper returned prefix in (4.1) is also an
occurrence of this shorter prefix.  Its lift in the \(L_0\) cylinder is

\[
U_m:=\frac{x_{d_m}-n}{2^{B_0+1}}
=2^{B_m-B_0}u_m.
\tag{5.2}
\]

Therefore

\[
\boxed{
\sum_m\frac1{1+U_m}
\leq\sum_m2^{B_0-B_m}
<\infty.}
\tag{5.3}
\]

Thus the known harmonic-thinness law for occurrences of one fixed factor
does not obstruct all-depth prefix returns.  Deeper stabilization forces
exactly the exponential lift growth needed to satisfy it.

Equations (5.1) and (5.2) also explain why different prefix depths do not
create independent congruences.  At one common start they are nested powers
of two.  At different starts their lift integers are unrelated by the
returned-prefix identities.  The ternary endpoint and internal decoder
profiles remain affine images of those same lifts by Theorem 1.

## 6. The stationary cofactor ladder

The prime-to-three cofactors do admit one exact global organization.  Put

\[
b_j:=v_3(x_j+1),\qquad
c_j:=\frac{x_j+1}{3^{b_j}},
\qquad
G_j:=\frac{x_j+1}{q_j}.
\tag{6.1}
\]

### Theorem 4. Monotone reduced-denominator ladder

For every \(j\geq0\),

\[
\boxed{
G_j=\frac{2^{A_j}c_j}{3^{j-b_j}}.}
\tag{6.2}
\]

In reduced form, the denominator of \(G_j\) is exactly

\[
\boxed{
3^{\max\{j-b_j,0\}}.}
\tag{6.3}
\]

Moreover,

\[
\boxed{
G_{j+1}-G_j
=\frac{2^{a_j}-2}{3q_j}\geq0,}
\tag{6.4}
\]

and

\[
\boxed{
G_j\uparrow\mathcal K,\qquad
\mathcal K-G_L
=\frac13\sum_{j=L}^{\infty}(2^{a_j}-2)r_j.}
\tag{6.5}
\]

Across a returned stabilized prefix, the complete cofactor ladder obeys

\[
\boxed{
G_{d+i}=h_d+r_d(G_i-n)
\qquad(0\leq i\leq L).}
\tag{6.6}
\]

**Proof.** Equation (6.2) follows from the definitions.  The integer
\(c_j\) is prime to three, so cancellation of the displayed power of three
is exact.  This proves (6.3).  Direct use of the accelerated recurrence
gives

\[
\begin{aligned}
G_{j+1}-G_j
&=\frac{3x_j+1+2^{a_j}}{3q_j}
  -\frac{x_j+1}{q_j}\\
&=\frac{2^{a_j}-2}{3q_j},
\end{aligned}
\]

which proves (6.4).  Since \(r_j\to0\), equations (1.4) and (1.6) give
\(G_j=h_j+r_j\to\mathcal K\).  Telescoping (6.4) proves (6.5).
Finally, multiply (2.1) by \(r_{d+i}=r_dr_i\).  Since

\[
2^{B-A_i+1}3^iu\cdot r_i=2^{B+1}u=x_d-n,
\]

we obtain

\[
G_{d+i}
=r_dG_i+r_d(x_d-n)
=h_d+r_d(G_i-n).
\]

This proves (6.6). \(\square\)

The ladder is genuinely global.  It uses one fixed limit
\(\mathcal K\), and a low decoder \(b_j\) appears as a large exact ternary
denominator in (6.3).  However, (6.6) shows that a returned copy is again an
affine contraction by \(r_d\).  Thus the ladder does not supply a cofactor
diameter bound.  Such a bound would have to control the tail error in
(6.5) relative to the exact denominator \(3^{j-b_j}\).

## 7. The cross-depth conjugate-gap bridge

We now retain the complete return words.  This identifies the exact datum
which is absent from the mass and product calculations.

Let a stabilized prefix \(w\) have length \(L\) and weight \(B\).  Suppose
that it occurs at two positive return times \(d<e\), with lifts

\[
x_d=n+2^{B+1}u,\qquad
x_e=n+2^{B+1}U.
\tag{7.1}
\]

Put

\[
\Delta:=e-d,\qquad E:=A_e-A_d.
\tag{7.2}
\]

Let \(g\) be the length-\(\Delta\) gap word from \(d\) to \(e\), and let
\(g'\) be the length-\(\Delta\) gap word from \(d+L\) to \(e+L\).
Both have weight \(E\), and the two descriptions of the intervening word
give the free-monoid identity

\[
\boxed{gw=wg'.}
\tag{7.3}
\]

Write their affine maps as

\[
F_g(X):=\frac{3^\Delta X+C(g)}{2^E},
\qquad
F_{g'}(X):=\frac{3^\Delta X+C(g')}{2^E}.
\tag{7.4}
\]

### Theorem 5. Simultaneous dyadic and ternary gap normalization

The integer

\[
H:=2^EU-3^\Delta u
\tag{7.5}
\]

has the two exact carry representations

\[
\boxed{
H
=\frac{(3^\Delta-2^E)n+C(g)}{2^{B+1}}
=\frac{(3^\Delta-2^E)x_L+C(g')}{2\cdot3^L}.}
\tag{7.6}
\]

Suppose, more specifically, that the occurrence at \(e\) is a return of a
deeper stabilized prefix of length \(M>L\), weight \(B_M\), and lift
\(v\).  Then

\[
U=2^{B_M-B}v
\tag{7.7}
\]

and hence

\[
\boxed{
H+3^\Delta u=2^{E+B_M-B}v.}
\tag{7.8}
\]

Consequently,

\[
\boxed{
v_2(H+3^\Delta u)
=E+B_M-B+v_2(v),}
\tag{7.9}
\]

and, with the convention \(v_3(0)=+\infty\),

\[
\boxed{
\min\{v_3(H),\Delta\}
=\min\{v_3(v),\Delta\}.}
\tag{7.10}
\]

If \(b_L:=v_3(x_L+1)<L\), define the endpoint cofactors

\[
c_{t,L}:=\frac{x_{t+L}+1}{3^{b_L}}
\qquad(t=d,e).
\tag{7.11}
\]

They satisfy the cross-depth separation law

\[
\boxed{
c_{e,L}-c_{d,L}
=2\cdot3^{L-b_L}
\left(2^{B_M-B}v-u\right).}
\tag{7.12}
\]

**Proof.** Apply the gap map \(g\) to \(x_d\) and substitute (7.1):

\[
2^E(n+2^{B+1}U)
=3^\Delta(n+2^{B+1}u)+C(g).
\]

Division by \(2^{B+1}\) gives the first representation in (7.6).
The endpoint transport (2.5) gives

\[
x_{d+L}=x_L+2u3^L,\qquad
x_{e+L}=x_L+2U3^L.
\]

Applying \(g'\) between these endpoints and dividing by \(2\cdot3^L\)
gives the second representation.  If the deeper prefix returns at \(e\),
its start lift is \(2^{B_M+1}v\).  Comparison with (7.1) proves (7.7),
and substitution in (7.5) proves (7.8).  Equations (7.9) and (7.10)
follow by taking exact and truncated valuations.  Finally, divide the
difference of the two transported endpoints by \(3^{b_L}\) and use
(7.7).  This proves (7.12). \(\square\)

There is an equivalent all-cut form which is useful for locating the exact
residual.  Suppose that a stabilized prefix of length \(M\), weight \(B_M\),
returns at \(e\geq M\), with

\[
x_e=n+2^{B_M+1}v.
\tag{7.13}
\]

For \(0\leq L\leq M\), let \(z_{L,e}\) be the complete word from time \(L\)
to time \(e\), of length \(e-L\) and weight \(A_e-A_L\).  Then

\[
\boxed{
v
=\frac{
3^{e-L}x_L-2^{A_e-A_L}n+C(z_{L,e})
}{
2^{A_e-A_L+B_M+1}
}
=\frac{x_{e+L}-x_L}
{2^{B_M-A_L+1}3^L}.}
\tag{7.14}
\]

If \(b_L<L\), this also gives

\[
\boxed{
v
=\frac{
(x_{e+L}+1)/3^{b_L}-(x_L+1)/3^{b_L}
}{
2^{B_M-A_L+1}3^{L-b_L}
}.}
\tag{7.15}
\]

Indeed, the first quotient in (7.14) is the affine transition from \(x_L\)
to \(x_e\), after (7.13) is substituted.  The second is (2.1) for the
length-\(M\) return at the internal cut \(L\).  Equation (7.15) follows by
dividing by the transported decoder.

Thus every cut of one returned prefix, every intervening return-word carry,
and every transported prime-to-three cofactor recovers exactly the same
integer \(v\).  This is the full cross-depth coherence supplied by ordinary
representative stabilization.  It is stronger than checking only the
terminal decoder, but it still has rank one.

The bridge (7.6) is a genuinely cross-depth return-word restriction.  The
same integer must be obtained from the complete gap word at the start,
normalized by \(2^{B+1}\), and from its conjugate gap word at the endpoint,
normalized by \(2\cdot3^L\).  A deeper prefix return further forces the
large exact dyadic order (7.9), while (7.10) records its remaining ternary
content.

The identity also marks the present boundary.  The conjugacy (7.3) makes
the two divisibilities in (7.6) telescope to the same \(H\).  Thus they are
not independent congruences.  The new uncontrolled datum is the complete
gap carry \(C(g)\), equivalently \(C(g')\).  A proof in the
recurrent-prefix subcase would follow from a uniform theorem excluding
(7.8) for an unbounded chain of first-return scales with low \(b_L\), or
from a bound placing the two cofactors in (7.12) at distance strictly less
than \(2\cdot3^{L-b_L}\).  No reciprocal-mass or normalized-product estimate
proved here controls either gap carry.

## 8. Quantitative cross-depth payment

The bridge has a useful quantitative consequence.  Retain the notation of
Theorem 5, and put

\[
\mathfrak M:=2^{B+1},\qquad
J:=B_M-B,\qquad
\Sigma:=\Delta\log_2 3-E
=\log_2\frac{q_e}{q_d}.
\tag{8.1}
\]

Thus \(J\) is the gain in stabilized prefix weight and \(\Sigma\) is the
coefficient surplus of the complete gap from \(d\) to \(e\).

### Theorem 6. Exact surplus-lift conservation

The two return scales satisfy

\[
\boxed{
2^Jv+\frac n{\mathfrak M}
=2^\Sigma
\left(u+\frac n{\mathfrak M}\right)
\frac{h_e}{h_d}.}
\tag{8.2}
\]

Consequently,

\[
\boxed{
J
\leq
\Sigma+\log_2\left(u+\frac n{\mathfrak M}\right)
+\log_2\frac{\mathcal K}{n}.}
\tag{8.3}
\]

Along any chain for which \(d\to\infty\) and \(B\to\infty\),

\[
\boxed{
J+\log_2v
=\Sigma+\log_2u+o(1).}
\tag{8.4}
\]

**Proof.** Since \(q_e/q_d=2^\Sigma\) and \(q_t=x_t/h_t\),

\[
2^\Sigma
=\frac{x_eh_d}{x_dh_e}.
\]

Substitute

\[
x_d=\mathfrak M\left(u+\frac n{\mathfrak M}\right),
\qquad
x_e=\mathfrak M\left(2^Jv+\frac n{\mathfrak M}\right).
\]

This gives (8.2).  Since \(v\geq1\), \(h_e\leq\mathcal K\), and
\(h_d\geq n\), equation (8.3) follows.  Finally,
\(h_d,h_e\to\mathcal K\), \(n/\mathfrak M\to0\), and \(u,v\geq1\).
Taking logarithms in (8.2) gives (8.4). \(\square\)

There is a sharper estimate when the gap begins at a coefficient
tail-record.  For \(0\leq i\leq\Delta\), let \(E_i\) be the weight of the
first \(i\) letters of \(g\), and assume

\[
\frac{3^i}{2^{E_i}}\geq1
\qquad(0\leq i\leq\Delta).
\tag{8.5}
\]

Put

\[
\mathcal R(g):=\sum_{i=0}^{\Delta-1}\frac{2^{E_i}}{3^i}.
\tag{8.6}
\]

The carry identity gives

\[
\frac{C(g)}{3^\Delta}=\frac{\mathcal R(g)}3.
\tag{8.7}
\]

Hence (7.6) becomes

\[
\boxed{
H
=\frac{3^\Delta}{\mathfrak M}
\left[
n\left(1-2^{-\Sigma}\right)
+\frac{\mathcal R(g)}3
\right].}
\tag{8.8}
\]

Under (8.5), we have \(0<2^{-\Sigma}\leq1\) and
\(\mathcal R(g)\leq\Delta\).  Therefore

\[
\boxed{
0<H\leq
\frac{3^\Delta}{\mathfrak M}
\left(n+\frac\Delta3\right).}
\tag{8.9}
\]

Combining (8.9) with (7.8) and (7.9) gives

\[
\boxed{
J+v_2(v)
\leq
\Sigma+
\log_2\left(
u+\frac{n+\Delta/3}{\mathfrak M}
\right).}
\tag{8.10}
\]

Similarly, if

\[
k:=\min\{v_3(v),\Delta\},
\]

then (7.10) and (8.9) give

\[
\boxed{
k
\leq
\Delta-(B+1)\log_3 2
+\log_3\left(n+\frac\Delta3\right).}
\tag{8.11}
\]

Equations (8.10) and (8.11) are the direct quantitative content of the
two-prime gap bridge.  Since every accelerated exponent is at least one,

\[
J=B_M-B\geq M-L.
\tag{8.12}
\]

We have therefore closed the following recurrent-prefix subcase.

### Corollary 7. Low-gap-surplus, low-lift exclusion

There is no unbounded chain of nested stabilized prefix returns with depth
jumps

\[
D_m:=M_m-L_m\longrightarrow\infty,
\]

and

\[
\Sigma_m+\log_2u_m=o(D_m).
\tag{8.13}
\]

**Proof.** Since \(u_m\geq1\) and \(B_m\to\infty\), equation (8.3) gives

\[
D_m
\leq\Sigma_m+\log_2u_m+O(1).
\]

Together with (8.13), this gives

\[
D_m\leq o(D_m),
\]

which is impossible. \(\square\)

The exact residual in the recurrent-prefix branch is now a dichotomy.
Every large promotion in prefix depth must be paid for by a comparable
coefficient surplus in the intervening return gap or by exponential growth
of the earlier lift.  Large \(v_2(v)\) costs additional room in (8.10), and
large \(v_3(v)\) costs additional gap length in (8.11).  Neither payment is
currently excluded on an arbitrary divergent ray.  In particular, the lift
alternative is fully compatible with the harmonic and reciprocal-mass
thinness proved in Sections 4 and 5.

## 9. Periodic specialization

The same identity does not produce a universal cycle contradiction.  Let
\(w\) be a positive accelerated cycle word of length \(r\), weight \(A\),
carry \(C(w)\), and cycle state \(n\).  Its affine fixed-point equation is

\[
(2^A-3^r)n=C(w).
\tag{9.1}
\]

In the notation of (7.6), the periodic return has zero lift and

\[
\boxed{
H
=\frac{(3^r-2^A)n+C(w)}{2^{B+1}}
=0.}
\tag{9.2}
\]

Thus the cross-depth carry identity specializes exactly to the original
cycle integrality equation.  It does not add a second congruence.

There is also a structural obstruction to importing the stationary
argument.  A positive cycle has

\[
\frac{3^r}{2^A}<1.
\]

Under repetition, the coefficients tend to zero, the reciprocal mass
diverges, and the normalized heights do not approach the finite stationary
constant used in (1.6).  The relative-barrier hypothesis (8.5) also fails
over a full period.  Accordingly, (8.9) to (8.11) have no periodic
counterpart.

The gap/carry bridge therefore does not span the cycle and divergence
obstructions.  On a divergent normalized ray it yields the payment law
(8.10).  On a cycle it collapses to (9.1), whose denominator-one
integrality remains the independent open gate.

## 10. Consequence for Binary-Ternary Stabilization

The fixed seed has been retained throughout.  The seed \(n\), the
representative stabilization threshold, and the stationary constant
\(\mathcal K\) are common to every depth.  Thus Theorems 1 to 6 do not use a
moving-seed countermodel or a bounded finite-window surrogate.

Nevertheless, the three proposed global quantities align rather than
compete:

1. Binary stabilization gives the lift \(2^{B+1}u\).
2. Ternary decoder transport is the congruence projection of the same lift
   under (2.1).
3. Reciprocal mass and the complete normalized product are reduced by the
   denominator \(n+2^{B+1}u\).

At increasing depths the third effect is automatically geometric.  The
global product therefore becomes more convergent when the stabilized lift
becomes stronger.  Reciprocal-mass thinness reaches the same conclusion
through (5.3).

This is a collapse theorem for the direct scalar strategy, not a
counterexample to HSCI and not a construction of a divergent Collatz orbit.
It leaves three genuinely new possibilities:

1. control the prime-to-three cofactors in (2.4) uniformly across different
   depths;
2. prove a restriction on the complete return words that couples the
   different lift integers \(u_m\);
3. derive a lower bound on returned-block product or mass that contradicts
   the exact upper bounds (4.3) to (4.6).

The existing cylinder, decoder, harmonic-mass, and product identities alone
provide none of these.  In particular, merely summing the contribution of
one stabilized return at every scale cannot close the divergence branch.

## 11. Exact regression

The retained exact certificate is

agent-code/collatz-research/sync/fixed_seed_return_mass_certificate.js.

It enumerates ordinary accelerated orbits and checks:

1. the stabilized start lattice and the full transport identity (2.1) at
   every internal position;
2. the truncated decoder identity (2.2) and the exact cofactor identity
   (2.4);
3. the reduced-denominator cofactor ladder (6.2) to (6.4);
4. reciprocal factorization, block mass, block height increment, and the
   product identity (3.5);
5. the stationary start and endpoint bounds (3.6);
6. nested lift divisibility (5.1);
7. the conjugate-gap bridge (7.6) to (7.12);
8. the all-cut quotient coherence (7.14) and (7.15);
9. the surplus-lift conservation law (8.2);
10. the tail-record gap bounds (8.9) to (8.11);
11. the all-depth geometric start and endpoint charges.

With odd seeds below \(100000\), \(150\) accelerated steps, and prefix
length at most \(18\), it reports:

\[
\begin{array}{c|r}
\text{quantity}&\text{count}\\ \hline
\text{returned stabilized prefixes}&33\\
\text{full state transports}&278\\
\text{decoder transports}&278\\
\text{cofactor transports}&182\\
\text{cofactor ladder checks}&1{,}836{,}119\\
\text{reciprocal factorizations}&245\\
\text{block mass checks}&33\\
\text{block product checks}&33\\
\text{nested lift checks}&23\\
\text{cross-depth bridge checks}&5\\
\text{all-cut quotient checks}&267\\
\text{surplus-lift checks}&5\\
\text{tail-record gap bounds}&5
\end{array}
\]

The first return witness is

\[
n=27,\quad L=3,\quad d=8,\quad B=4,\quad u=2,
\quad x_d=91,\quad x_{d+L}=155.
\]

The first nested witness has the same seed and return start, with lengths
\(3\) and \(4\), and lifts \(2\) and \(1\), respectively.  These finite
witnesses certify the identities only.  They are not candidates for
divergence.

The first cross-depth witness again has seed \(27\).  The prefix lengths are
\(3\) and \(5\), the return starts are \(8\) and \(11\), and

\[
\Delta=3,\qquad E=4,\qquad
u=2,\qquad v=1,\qquad U=4,\qquad H=10.
\]

Both the start gap and its endpoint conjugate have carry \(23\).  The
certificate verifies (7.6), (8.2), and the tail-record bound (8.9) exactly
on this witness.
