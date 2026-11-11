# The two-support defect gate at terminal complement \(b=1\)

**Date:** 17 August 2026  
**Mode:** SOLVE  
**Status:** every anchored \(b=1\) profile whose deformation support has
exactly two positions is excluded at every depth. This includes every
strict target and the equality target. For an arbitrary support, the first
and last defects lie in explicit logarithmic boundary layers. More
generally, the number of defective positions in any surviving profile must
grow at least on the order of \(s/\log s\).

## 1. Setup and statement

Put

\[
\alpha:=\log _2 3,
\qquad
B_i:=\lfloor i\alpha\rfloor,
\qquad
N:=\lceil s\alpha\rceil,
\]

and suppose that

\[
N-\lceil(s-1)\alpha\rceil=1.
\tag{1}
\]

As usual, write

\[
M:=2^N,
\qquad
P:=3^s,
\qquad
D:=M-P,
\qquad
e:=N-s.
\tag{2}
\]

At terminal complement \(b=1\), an anchored profile has

\[
0=A_0<A_1<\cdots<A_{s-1}=N-2,
\qquad
A_i\leq B_i.
\tag{3}
\]

Define

\[
h_i:=B_i-A_i,
\qquad
\mathcal D(A):=\{i:h_i>0\}.
\tag{4}
\]

We call \(\mathcal D(A)\) the **deformation support**. A support defect is
one index in this set, independently of its height \(h_i\). This
distinction is necessary because one support position can have height
greater than one.

The carry is

\[
C(A):=\sum_{i=0}^{s-1}3^{s-1-i}2^{A_i}.
\tag{5}
\]

We prove the following theorem.

**Theorem 1.** Suppose that \(|\mathcal D(A)|=2\). There are no positive
odd integers \(n\) and integers

\[
0\leq d\leq\left\lceil\frac{e-1}{2}\right\rceil
\tag{6}
\]

such that

\[
Pn+C(A)=M(n+d).
\tag{7}
\]

Thus the equality target \(d=0\) and every strict no-wrap target are
excluded at all depths in the two-support sector.

## 2. Realized proper paths and uniform height

We begin by recording why a solution of (7) gives the ordinary path needed
by the factor argument. Put

\[
C_t:=\sum_{i=0}^{t-1}3^{t-1-i}2^{A_i},
\qquad
F_t:=3^tn+C_t.
\tag{8}
\]

Splitting the full numerator gives

\[
F_s=3^{s-t}F_t+
\sum_{i=t}^{s-1}3^{s-1-i}2^{A_i}.
\]

Reduction modulo \(2^{A_t}\) shows that \(2^{A_t}\mid F_t\). Define

\[
x_t:=\frac{F_t}{2^{A_t}}.
\tag{9}
\]

After division by \(2^{A_t}\), reduction modulo two gives

\[
3^{s-t}x_t+3^{s-1-t}\equiv0\pmod2.
\]

Thus \(x_t\) is a positive odd integer for every
\(0\leq t\leq s-1\). Moreover,

\[
x_{t+1}=\frac{3x_t+1}{2^{A_{t+1}-A_t}},
\qquad
v_2(3x_t+1)=A_{t+1}-A_t
\tag{10}
\]

for \(0\leq t\leq s-2\). Thus every proper exponent is realized exactly,
not merely formally.

Every target in (6), including equality, satisfies the first-crossing
height estimate

\[
n<153s^{14.3}.
\tag{11}
\]

Indeed, put \(R:=M/P\). Dividing (7) by \(P\) gives

\[
\frac{C(A)}P=(R-1)n+Rd.
\]

The prefix barrier gives \(C(A)/P\leq s/3\), while the established
absolute linear-form estimate gives

\[
R-1>\log R>e^{-6.125581}s^{-13.3}.
\]

Since \(d\geq0\), equation (11) follows. Note that no strictness assumption
on \(d\) was used.

At a maximal position \(A_t=B_t\), we have

\[
C_t\leq t3^{t-1},
\qquad
2^{B_t}>\frac{3^t}{2}.
\]

Consequently,

\[
x_t<2n+\frac{2t}{3}<307s^{15}.
\tag{12}
\]

We put

\[
H_s:=307s^{15}.
\tag{13}
\]

For \(t\geq1\), the strict inequality \(B_t<t\alpha\) also gives
\(x_t>n\). Finally, \(B_1=1\), so strict anchoring forces \(A_1=1\).
Thus \(x_0=n\neq1\), since the state \(1\) has exact first exponent two.
Hence every state used in a maximal mechanical interval is different from
the trivial fixed point.

## 3. The mechanical-interval lemma

Put

\[
\beta:=\alpha-1.
\]

Whenever both endpoints \(i,i+1\) are outside \(\mathcal D(A)\), the
proper exponent is

\[
A_{i+1}-A_i
=1+\lfloor(i+1)\beta\rfloor-\lfloor i\beta\rfloor.
\tag{14}
\]

Thus every interval of consecutive unaffected exponent edges is a factor
of the irrational lower-mechanical word of slope \(\beta\), under the
coding \(0\mapsto1\), \(1\mapsto2\).

We use the following consequence of Sturmian complexity and the ordinary
dyadic cylinder lattice.

**Lemma 2.** Let an exact positive Collatz path contain \(m\) consecutive
exponents of the form (14), and suppose that every state at their vertices
is less than \(H_s\) and is not the fixed point \(1\). Then

\[
\boxed{2^{\lfloor m/2\rfloor}<H_s.}
\tag{15}
\]

**Proof.** The assertion is immediate for \(m<4\), so suppose that
\(m\geq4\). Put

\[
L:=\left\lfloor\frac{m-2}{2}\right\rfloor.
\tag{16}
\]

Consider the \(L+2\) length-\(L\) factors beginning at offsets
\(0,1,\ldots,L+1\). A Sturmian word has at most \(L+1\) factors of length
\(L\), so two selected factors agree. Let their starting states be
\(x_j,x_k\), with \(j<k\).

Suppose first that \(x_j=x_k\). Determinism makes the intervening
valuation word repeat. Since

\[
2L+2\leq m,
\tag{17}
\]

two complete copies of this return word lie in the mechanical interval.
A word whose square is a factor of a balanced mechanical word is circularly
balanced. After subtracting one from every exponent, a cyclic conjugate is
a power of a primitive rational lower-mechanical word. Under the coding
\(0\mapsto1\), \(1\mapsto2\), this is a power of an accelerated
Christoffel word. If the return has \(q\) letters and \(p\) letters equal
to two, balance gives

\[
p\in\{\lfloor q\beta\rfloor,\lceil q\beta\rceil\}.
\]

In the only case which can have a positive fixed point,
\(2^{q+p}>3^q\), we therefore have \(p=\lceil q\beta\rceil\) and
\(q+p=\lceil q\alpha\rceil\). The same conclusion holds after reducing an
imprimitive power, since division by its power exponent leaves a positive
discrepancy smaller than one. Hence the primitive word is exactly a cycle
Christoffel word covered by the integrality theorem.

For completeness, if its primitive affine map is \(F(x)=ax+b\), then

\[
F^g(x)-x=(1+a+\cdots+a^{g-1})(F(x)-x).
\]

Here \(a>0\) and \(a\neq1\), so a fixed point of the power is already a
fixed point of the primitive Christoffel map. In the complementary case
\(2^{q+p}\leq3^q\), the fixed-point equation is impossible for a positive
state. In the expanding case above, the Christoffel integrality theorem
excludes an integer fixed point. The one-letter word
\((2)\) gives only the fixed point \(1\), which was excluded in the
hypotheses. Thus \(x_j\neq x_k\).

Let \(Q\) be the total exponent of the common factor. The exact dyadic
cylinder formula gives

\[
2^{Q+1}\mid x_k-x_j.
\tag{18}
\]

Since \(Q\geq L\), positivity and the height bound give

\[
2^{L+1}\leq|x_k-x_j|<H_s.
\]

Finally, \(L+1=\lfloor m/2\rfloor\). This proves (15). \(\square\)

## 4. First and last defect localization

We now allow an arbitrary nonempty deformation support. Let

\[
J:=\min\mathcal D(A),
\qquad
K:=\max\mathcal D(A).
\tag{19}
\]

The first \(J-1\) exponent edges are mechanical, while the final
\(s-K-2\) exponent edges are mechanical. Lemma 2 therefore gives

\[
2^{\lfloor(J-1)/2\rfloor}<H_s,
\qquad
2^{\lfloor(s-K-2)/2\rfloor}<H_s.
\tag{20}
\]

In particular,

\[
\boxed{
J<2\log_2 H_s+2,
\qquad
s-K<2\log_2 H_s+3.}
\tag{21}
\]

The second inequality is the requested last-defect theorem. It applies to
an arbitrary height \(h_K\) and to an arbitrary earlier deformation. The
first inequality also sharpens the previously established logarithmic
departure bound. Every surviving support therefore starts and ends in
explicit logarithmic boundary layers.

## 5. Exact carry decomposition and height-two adjacency

Let \(C_0\) be the carry of the maximal profile \(A_i=B_i\). For a defect
of height \(h\), define its exact carry decrement by

\[
\Delta_i(h):=
\left(2^{B_i}-2^{B_i-h}\right)3^{s-1-i}
=\sum_{q=1}^{h}2^{B_i-q}3^{s-1-i}.
\tag{22}
\]

The first defect is forced to have height one. Indeed, strict anchoring and
maximality at \(J-1\) give

\[
h_J=1,
\qquad
B_J-B_{J-1}=2.
\tag{23}
\]

Thus

\[
E_J:=\Delta_J(1)=2^{B_J-1}3^{s-1-J}.
\tag{24}
\]

For arbitrary later damage, the exact first-defect identity is

\[
C(A)=C_0-E_J-R_J,
\qquad
R_J:=\sum_{\substack{i>J\\h_i>0}}\Delta_i(h_i).
\tag{25}
\]

Suppose now that \(\mathcal D(A)=\{J,K\}\). If \(K\geq J+2\), then the
position \(K-1\) is maximal. Therefore,

\[
h_K=1,
\qquad
B_K-B_{K-1}=2.
\tag{26}
\]

If \(K=J+1\), put \(g_K:=B_K-B_J\in\{1,2\}\). Strict anchoring gives

\[
1\leq h_K\leq g_K.
\tag{27}
\]

Hence a height-two second defect occurs precisely as an allowed adjacent
case with \(g_K=2\). No other multiple-height case belongs to the
two-support sector. Equations (25)-(27) give the exhaustive formula

\[
\boxed{C(A)=C_0-E_J-\Delta_K(h_K).}
\tag{28}
\]

## 6. Analytic exclusion above weight 947

There are \(s-1\) proper exponent edges. Each support defect can damage
only the edge entering it and the edge leaving it. Two support positions
therefore damage at most four edges. The remaining mechanical edges form
at most three consecutive intervals. Let their lengths, padded by zeros if
necessary, be \(m_1,m_2,m_3\). Then

\[
m_1+m_2+m_3\geq s-5.
\tag{29}
\]

Lemma 2 gives

\[
2^{\lfloor m_i/2\rfloor}<H_s
\qquad(1\leq i\leq3).
\tag{30}
\]

Put \(E:=\sum_i\lfloor m_i/2\rfloor\). From (29),

\[
E\geq\frac{m_1+m_2+m_3-3}{2}
\geq\frac{s-8}{2}.
\tag{31}
\]

Multiplying (30) and then squaring gives

\[
2^{s-8}\leq2^{2E}<H_s^6.
\]

Consequently, every two-support target would satisfy

\[
\boxed{2^s<256\cdot307^6s^{90}.}
\tag{32}
\]

Exact integer arithmetic gives

\[
2^{948}>256\cdot307^6\cdot948^{90}
\tag{33}
\]

and

\[
2\cdot948^{90}>949^{90}.
\tag{34}
\]

Since \((1+1/s)^{90}\) decreases with \(s\), equation (34) propagates
the reverse strict inequality in (32). Therefore, no target exists for
\(s\geq948\).

## 7. Exact finite certificate

It remains to check \(s\leq947\). The certificate constructs

\[
B_i=\lfloor i\log_2 3\rfloor
\]

exactly as one less than the bit length of \(3^i\). It enumerates the
complete anchoring classification (23), (26), and (27). For each profile,
it computes the least residue

\[
\tau(A):=[C(A)M^{-1}]_D.
\tag{35}
\]

Equation (7) requires

\[
d\equiv\tau(A)\pmod D.
\tag{36}
\]

The interval in (6) is shorter than \(D\), so (36) decides all strict and
equality targets at once. This is stronger than checking only positive
realized endpoints. The exact output is

~~~text
finite_max_s=947
finite_q2_weights=393
anchored_two_support_profiles=20063657
adjacent_profiles=139712
separated_profiles=19923945
height_two_profiles=31342
strict_formal_hits=0
equality_formal_hits=0
analytic_start=948
anchoring_regression=true
analytic_base=true
analytic_propagation=true
two_support_profiles_excluded_all_depth=true
~~~

The checker is
[`inverse/q2_two_defect_certificate.js`](inverse/q2_two_defect_certificate.js).
The diagnostic
[`inverse/q2_two_defect_probe.js`](inverse/q2_two_defect_probe.js)
separately computes endpoint positivity and positive odd starts whenever a
formal residue is encountered.

## 8. The residual after two-support exclusion

For an arbitrary support with first defect \(J\) and last defect \(K\),
split (25) as

\[
R_J=\Delta_K(h_K)+U_{J,K},
\tag{37}
\]

where

\[
\boxed{
U_{J,K}:=
\sum_{\substack{J<i<K\\h_i>0}}\Delta_i(h_i)}
\tag{38}
\]

is the **interior defect-core residual**. Theorem 1 says that
\(U_{J,K}=0\) is impossible for a target. Thus every surviving profile has
at least three support defects and satisfies

\[
C(A)=C_0-E_J-\Delta_K(h_K)-U_{J,K},
\qquad
U_{J,K}>0.
\tag{39}
\]

There is also a quantitative restriction on this residual. Let
\(r:=|\mathcal D(A)|\). Removing the at most \(2r\) damaged edges leaves
at most \(r+1\) mechanical intervals whose total length is at least
\(s-1-2r\). Applying Lemma 2 to all of them gives

\[
\boxed{
2^{s-3r-2}<H_s^{2r+2}.}
\tag{40}
\]

Equivalently,

\[
\boxed{
r>
\frac{s-2-2\log_2 H_s}{3+2\log_2 H_s}}
\tag{41}
\]

whenever the numerator is positive. In particular, the support of a
surviving \(b=1\) target has size \(\Omega(s/\log s)\). The remaining
branch is therefore not merely the three-support case at large depth. It is
the growing interior defect-core sector described by (38), coupled to the
short target residue (36).

## 9. Proof ledger

The following items are closed.

1. Every formal endpoint solution realizes all proper valuations exactly.
2. Every maximal-profile state used in the proof is less than
   \(H_s=307s^{15}\) and is not the fixed point \(1\).
3. Every undamaged mechanical interval of length \(m\) satisfies the exact
   return-lattice bound (15).
4. The first and last defects obey the explicit logarithmic localizations
   (21), for arbitrary support and arbitrary defect heights.
5. The exhaustive two-support anchoring classification includes the
   adjacent height-two case.
6. Mechanical interval multiplication excludes every \(s\geq948\).
7. Exact residue evaluation excludes every \(s\leq947\), including
   equality.
8. Every survivor has a nonzero interior defect-core residual and
   \(\Omega(s/\log s)\) support.

The following items remain open.

1. Exclude the growing-support interior residual \(U_{J,K}\) in (38).
2. Convert the support-density bound (41) into a contradiction with the
   short residue interval in (36).
3. No conclusion about every divergent orbit or every nontrivial cycle
   follows from Theorem 1 alone.
