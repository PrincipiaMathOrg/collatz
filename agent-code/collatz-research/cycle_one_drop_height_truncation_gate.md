# The height-truncated full-carry gate

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** We combine denominator one, exact factor separation, and the
bottom-normalized carry. A cut at omission height \(H\) leaves a prefix of
length \(O(H(H+\log Q))\), while the remaining carry is
\(O((H+\log Q)2^{-H})\). Under failure of the critical polynomial gate,
the choice

\[
M:=\left\lceil\frac{271}{10}\log _2U\right\rceil
\]

therefore produces a nonzero rational approximation to
\(2^N/3^r\), determined by fewer than

\[
\frac65M^2+8M+12
\]

initial branches and having error \(O(M2^{-M}/Q)\). This is an exact
short-prefix reduction of the full carry. Denominator one further
identifies the cross-difference as the unique centered residue of an
explicit short-prefix integer modulo

\[
D:=2^N-3^r.
\]

At the critical cut this nonzero residue has absolute value less than
\(9D/100\). This is a genuine global consequence of the full carry, but
it is also a sharp obstruction to the hoped-for divisibility argument:
the error is not a multiple of \(D\). Ordinary rational spacing and a
generic linear-forms estimate remain too weak to prove the polynomial
lower bound.

## 1. The normalized carry

Put

\[
\alpha:=\log _2 3,
\qquad
\gamma:=\alpha-1,
\qquad
N:=\lceil\alpha r\rceil,
\qquad
e:=N-r,
\qquad
R:=\frac{2^N}{3^r}.
\tag{1}
\]

We use the reverse one-drop clock

\[
B_t:=\left\lfloor\frac{et}{r}\right\rfloor,
\qquad 0\leq t\leq r.
\tag{2}
\]

Let \(t_1<\cdots<t_V<r\) be the spike times. If \(V_t\) is the number of
spikes through time \(t\), the omission height is

\[
H_t:=B_t-V_t.
\tag{3}
\]

Thus \(H_{r-1}=U\). Let \(x=2Q-1\) be the least odd cycle state and put

\[
h:=\log _2(4x),
\qquad
\beta:=\frac Nr.
\tag{4}
\]

The exact bottom-normalized carry identity is

\[
\boxed{
4Q(R-1)=R(2-2^{-U})+C,}
\qquad
C:=\sum_{k=1}^{V}2^k\left(\frac23\right)^{t_k}.
\tag{5}
\]

The purpose of this note is to cut the sum in (5) by height rather than
by time.

## 2. A factor bound for the low-height prefix

For \(1\leq H\leq U\), let \(T_H\) be the number of state indices before
the path first reaches height \(H\). Define

\[
L_H:=
\left\lfloor\frac{H+h-1}{\alpha}\right\rfloor+1.
\tag{6}
\]

**Proposition 1.** We have

\[
\boxed{
T_H\leq
2L_H+\frac{HL_H}{2}
+\frac{L_H+1}{2}
\left\lceil\frac{eL_H}{r}\right\rceil .}
\tag{7}
\]

**Proof.** Consider the length-\(L_H\) factors which start before the first
height-\(H\) state and end no later than that state. There are
\(T_H-L_H+1\) such occurrences when \(T_H\geq L_H\).

Suppose that two occurrences are equal. Their endpoint states are odd and
distinct. Exact endpoint separation therefore makes their difference a
nonzero multiple of \(2\cdot3^{L_H}\). On the other hand, both endpoints
have height at most \(H\), so the cycle-specific state envelope gives

\[
|x_s-x_t|<4x2^H=2^{h+H}.
\tag{8}
\]

Equation (6) gives

\[
\alpha L_H+1>h+H,
\]

which contradicts (8). Hence all these occurrences are distinct.

There are at most \(L_H+1\) zero-omission factor types. The number of
one-omission encodings is at most

\[
E_{L_H}:=(L_H+1)
\left\lceil\frac{eL_H}{r}\right\rceil .
\tag{9}
\]

Only the first \(H\) omissions can occur in the factors under
consideration, and each belongs to at most \(L_H\) occurrences. The
total omission incidence is therefore at most \(HL_H\). Separating the
zero-cost and one-cost types, and charging every remaining type at least
two omissions, gives

\[
T_H-L_H+1
\leq L_H+1+\frac{HL_H}{2}+\frac{E_{L_H}}2.
\]

This is (7). The case \(T_H<L_H\) is immediate. \(\square\)

This argument uses actual factor separation, not only the transition
count. In particular, the prefix is short because every factor is
realized by an integer cycle state.

## 3. Exponential suppression above the cut

Split

\[
C=C_{<H}+C_{\geq H},
\tag{10}
\]

according to whether the pre-spike height is smaller than \(H\). The
homogeneous coefficient before the spike at time \(t_k\) is

\[
G_{t_k-1}
:=\frac{3^{t_k-1}}{2^{t_k+k-2}}
=2^{H_{t_k-1}+\rho_{t_k-1}},
\tag{11}
\]

where

\[
\rho_s:=\gamma s-B_s.
\]

Since \(e/r=\gamma+\delta/r\) for some \(0<\delta<1\), we have
\(-1<\rho_s<1\). The contribution of this spike to \(C\) is

\[
2^k\left(\frac23\right)^{t_k}
=\frac4{3G_{t_k-1}}
<\frac83\,2^{-H_{t_k-1}}.
\tag{12}
\]

Let \(n_m\) be the number of state indices in the height-\(m\) block. The
frozen repeated-factor theorem gives

\[
n_m<\frac2\beta(m+h)+3.
\tag{13}
\]

Equations (12) and (13), together with the two geometric-series
identities, now give

\[
\boxed{
0\leq C_{\geq H}
<\left(
\frac{32}{3\beta}(H+h+1)+16
\right)2^{-H}.}
\tag{14}
\]

Indeed,

\[
\sum_{m\geq H}2^{-m}=2^{1-H},
\qquad
\sum_{m\geq H}m2^{-m}=(2H+2)2^{-H}.
\]

All spikes contributing to \(C_{<H}\) occur among the first \(T_H\)
branches. Consequently, there is an integer \(A_H\geq0\) such that

\[
\boxed{C_{<H}=\frac{A_H}{3^{T_H}}.}
\tag{15}
\]

The denominator in (15) need not be reduced.

## 4. The short rational approximation

Define

\[
\widehat R_H
:=\frac{4Q+C_{<H}}{4Q-2}.
\tag{16}
\]

Substitution in (5) gives the exact defect identity

\[
\boxed{
(4Q-2)(R-\widehat R_H)
=C_{\geq H}-R2^{-U}.}
\tag{17}
\]

In particular,

\[
\boxed{
0<|R-\widehat R_H|
<\frac{
\left(\dfrac{32}{3\beta}(H+h+1)+16\right)2^{-H}
+2^{1-U}}
{4Q-2}.}
\tag{18}
\]

It remains to justify the strict lower inequality. If
\(R=\widehat R_H\), equation (17) gives

\[
C_{\geq H}=R2^{-U}.
\]

After multiplication by \(3^r\), this becomes

\[
\sum_{k:\,H_{t_k-1}\geq H}
2^{t_k+k}3^{r-t_k}=2^{N-U}.
\tag{19}
\]

Every term on the left side is divisible by \(3\), since \(t_k<r\),
whereas the right side is not. This proves the claim.

Equation (15) also gives

\[
\widehat R_H
=\frac{4Q3^{T_H}+A_H}{(4Q-2)3^{T_H}}.
\tag{20}
\]

Since (5) implies \(0\leq C_{<H}<4Q\), the ordinary height of the
rational number in (20) is smaller than

\[
8Q3^{T_H}.
\tag{21}
\]

Thus the approximation is determined by the low-height prefix alone.

## 5. The failed polynomial gate

Suppose now that

\[
Q<U^{271/10},
\qquad
M:=\left\lceil\frac{271}{10}\log _2U\right\rceil .
\tag{22}
\]

The candidate range has \(M<U\). Moreover,

\[
h=\log _2(4x)<\log _2(8Q)<M+3.
\tag{23}
\]

Take \(H=M\). Since \(\alpha>3/2\), equation (6) gives

\[
L_M<\frac43M+3.
\tag{24}
\]

The exact inequality \(3^{100}<2^{159}\), together with the period
barrier, gives \(e/r<3/5\). Hence

\[
\left\lceil\frac{eL_M}{r}\right\rceil
<\frac35L_M+1.
\tag{25}
\]

Equations (7), (24), and (25) imply

\[
\boxed{
T_M<\frac65M^2+8M+12.}
\tag{26}
\]

Also, \(\beta>3/2\), so (18) becomes

\[
\boxed{
0<|R-\widehat R_M|
<\frac{(15M+45)2^{-M}+2^{1-U}}{4Q-2}.}
\tag{27}
\]

The rational \(\widehat R_M\) has height smaller than

\[
8Q3^{(6/5)M^2+8M+12}.
\tag{28}
\]

In other words, a failed polynomial gate forces one nonzero collision
between the mechanical phase \(2^N/3^r\) and a rational number generated
by \(O((\log U)^2)\) initial branches.

## 6. The denominator-one residue

Put

\[
D:=2^N-3^r.
\tag{29}
\]

The denominator-one hypothesis says that \(D\mid K\), or equivalently
that \(Q=K/D\) is an integer. For a cut \(H\), write

\[
A_H:=3^{T_H}C_{<H}
\]

as in (15), and define the signed late defect

\[
E_H:=3^rC_{\geq H}-2^{N-U}.
\tag{30}
\]

Multiplying (5) by \(3^r\) gives the exact integer identity

\[
\boxed{
2^{N+1}+A_H3^{r-T_H}+E_H=4QD.}
\tag{31}
\]

Every summand in \(3^rC_{\geq H}\) is divisible by \(3\). Consequently,

\[
E_H\equiv-2^{N-U}\not\equiv0\pmod3.
\tag{32}
\]

This recovers the nonvanishing in (18), now as an integer statement.
Denominator one adds the congruence

\[
E_H\equiv-
\left(2^{N+1}+A_H3^{r-T_H}\right)\pmod D.
\tag{33}
\]

At the critical cut, this is a much smaller residue than the elementary
bound suggests.

**Proposition 2.** Assume the failed gate (22), \(U\geq408126\), and the
high-rise inequality \(U^2/r\geq c_0\), where

\[
c_0:=\frac{2\alpha^2}{2\alpha-1}>\frac{23}{10}.
\]

The last rational inequality follows from
\(\alpha>19/12\), equivalently \(3^{12}>2^{19}\). Then

\[
\boxed{0<|E_M|<\frac9{100}D.}
\tag{34}
\]

In particular, \(E_M\) is the unique representative of the residue in
(33) lying in \((-D/2,D/2)\), and \(D\nmid E_M\).

**Proof.** The available Diophantine estimate is

\[
R-1>\frac1{459r^{133/10}}.
\tag{35}
\]

Equations (14), (23), and (30) therefore give

\[
\frac{|E_M|}{D}
<459r^{133/10}
\left((15M+45)2^{-M}+2^{1-U}\right).
\tag{36}
\]

The high-rise inequality gives \(r<10U^2/23\), while the definition of
\(M\) gives \(2^{-M}\leq U^{-271/10}\). Hence the first term on the
right side of (36) is smaller than

\[
\frac{459(15M+45)}{(23/10)^{133/10}\sqrt U}.
\tag{37}
\]

We have

\[
15M+45<\frac{813}{2}\log _2U+60.
\]

The last expression divided by \(\sqrt U\) is decreasing for
\(U\geq408126\). Since \(408126<2^{19}\) and \(408126>638^2\), (37) is
smaller than

\[
\frac{459\cdot15567}{2\cdot638}
\left(\frac{10}{23}\right)^{133/10}
<\frac{89}{1000}.
\tag{38}
\]

The final strict inequality is rational: use
\((23/10)^{3/10}>5/4\), raise to the tenth power, and clear
denominators. For the terminal term in (36), monotonicity and
\(408126<2^{19}\) give

\[
459r^{133/10}2^{1-U}
<459U^{27}2^{1-U}<\frac1{1000}.
\tag{39}
\]

Equations (38) and (39) prove (34). Equation (32) proves that the residue
is nonzero. Since its absolute value is less than \(D/2\), it is the
unique centered representative and cannot be divisible by \(D\).
\(\square\)

Thus denominator one does use the full modulus. Its exact output is a
small nonzero residue, not a second vanishing congruence.

## 7. The exact prefix-cleared form

Let \(T:=T_M\) and \(A:=A_M\), and put

\[
P_M:=4Q3^T+A,
\qquad
S_M:=2\cdot3^T+A.
\tag{40}
\]

Using \(3^r=2^N-D\) in (31) gives

\[
\boxed{DP_M-2^NS_M=3^TE_M.}
\tag{41}
\]

This is the strongest direct elimination of \(3^r\) supplied by the
carry. Equivalently,

\[
\frac{2^N}{D}-\frac{P_M}{S_M}
=-\frac{3^TE_M}{DS_M}.
\tag{42}
\]

Both \(P_M\) and \(S_M\) have logarithmic height \(O(M^2)\), and
\(3\nmid E_M\) by (32). Thus the cross-difference in (41) has exact
3-adic valuation \(T\). The remaining factor \(E_M\), however, is a
suffix-dependent nonzero residue modulo \(D\). Proposition 2 proves
that it is not a \(D\)-multiple. Therefore (42) cannot cancel the global
denominator \(D\).

The same point is visible in the original approximation. Equations (17)
and (30) give the exact equality

\[
\left|R-\widehat R_M\right|
=\frac{|E_M|}{3^r(4Q-2)}
\geq\frac1{3^r(4Q-2)}.
\tag{43}
\]

Clearing the short denominator \(3^T\) contributes the same factor to
the cross-difference, so it cancels out of the spacing bound. The full
factor \(3^r\) remains.

## 8. Exact suffix dynamics and the sign

The centered residue has a closed recurrence which depends only on the
suffix after the cut. Let \(k\) be the number of spikes through time
\(T=T_M\), put

\[
L:=r-T,
\qquad
w:=V-k,
\]

and write the remaining spike times as

\[
t_{k+j}=T+\sigma_j,
\qquad
1\leq\sigma_1<\cdots<\sigma_w<L.
\tag{44}
\]

Since \(N-U=r+V+1\), equation (30) factors as

\[
\boxed{
E_M=2^{T+k}\varepsilon_L,}
\tag{45}
\]

where

\[
\varepsilon_L
:=\sum_{j=1}^{w}2^{\sigma_j+j}3^{L-\sigma_j}
-2^{L+w+1}.
\tag{46}
\]

For \(0\leq s\leq L\), let \(j_s\) count the \(\sigma_j\) not exceeding
\(s\). Starting from \(\varepsilon_0:=-2\), the exact forward recurrence
is

\[
\varepsilon_s
=3\varepsilon_{s-1}+
\begin{cases}
2^{s+j_s-1},&s=\sigma_{j_s},\\[3pt]
2^{s+j_s},&s\notin\{\sigma_1,\ldots,\sigma_w\}.
\end{cases}
\tag{47}
\]

The final site \(s=L\) is never a spike. On putting

\[
d_s:=\frac{\varepsilon_s}{2^{s+j_s}},
\]

equation (47) becomes the two-map system

\[
d_s=
\begin{cases}
\dfrac32d_{s-1}+1,&s\text{ is ordinary},\\[5pt]
\dfrac34d_{s-1}+\dfrac12,&s\text{ is a spike}.
\end{cases}
\tag{48}
\]

This gives a complete sign classification.

**Proposition 3.** We have

\[
\boxed{
E_M<0
\quad\Longleftrightarrow\quad
w=0
\ \text{or}\ 
\bigl(w=1\text{ and }\sigma_1=L-1\bigr).}
\tag{49}
\]

In the two negative cases, respectively,

\[
E_M=-2^{N-U},
\qquad
E_M=-2^{N-U-2}.
\tag{50}
\]

In every other case, \(E_M>0\).

**Proof.** Initial ordinary sites leave \(d=-2\) fixed. The first spike
sends \(-2\) to \(-1\). If there is no second spike and \(m\) ordinary
sites remain, then

\[
d_L=-2+\left(\frac32\right)^m.
\]

This is negative exactly when \(m=1\), which means that the unique spike
is the last internal site. Before a second spike, we have \(d\geq-1\).
That spike gives \(d\geq-1/4\), and the mandatory final ordinary site
then gives a positive value. Any intervening map preserves positivity
once it is reached. This proves (49). Substitution in (45) and (46)
gives (50). \(\square\)

Thus anchored eligibility alone does not fix the sign. Both signs occur
among exact anchored profiles. Through \(r=20\), the audit finds
\(25038\) positive cuts and \(10599\) negative cuts. Denominator one
could exclude one of the two suffix classes only through the global
modulus condition; the suffix recurrence itself contains no such input.

For an actual candidate, factor separation does exclude the negative
classes.

**Proposition 4.** Under the hypotheses of Proposition 2, we have

\[
\boxed{0<E_M<\frac9{100}D.}
\tag{51}
\]

**Proof.** If \(E_M<0\), Proposition 3 shows that all but at most the
last internal letter after time \(T\) are equal to \(1\). The actual
valuation word therefore contains a run of at least

\[
r-T-2
\]

consecutive unit letters.

Put

\[
L_U:=\left\lfloor\frac{U+h-1}{\alpha}\right\rfloor+1.
\]

The endpoint-separation argument of Proposition 1, now using the global
height bound \(U\), shows that every cyclic factor of length \(L_U\) is
distinct. A run of \(L_U+1\) unit letters would contain two adjacent
copies of the all-unit factor of length \(L_U\). Hence every unit run has
length at most \(L_U\).

We have \(e/r<3/5\) and \(e\geq U+1\), so

\[
r>\frac53(U+1).
\]

Equations (23) and (26), together with \(\alpha>3/2\), give

\[
r-T-2-L_U
>U-\frac65M^2-\frac{26}{3}M-\frac{44}{3}.
\]

The right side is positive throughout \(U\geq408126\). To check this
uniformly, put

\[
y(U):=\frac{271}{10}\log _2U+1,
\]

so that \(M<y(U)\). The function

\[
U-\frac65y(U)^2-\frac{26}{3}y(U)-\frac{44}{3}
\]

is increasing on this range. At the left endpoint, \(y(408126)<516\),
and clearing denominators gives the positive lower numerator

\[
15\cdot408126-18\cdot516^2-130\cdot516-220
=1261982.
\]

Thus \(r-T-2>L_U\), contradicting the unit-run bound. Therefore
\(E_M>0\), and Proposition 2 supplies the upper bound in (51).
\(\square\)

In particular,

\[
\left\lfloor
\frac{2^{N+1}+A_M3^{r-T_M}}{D}
\right\rfloor=4Q-1.
\]

The centered-residue condition is one-sided, and its quotient is
congruent to \(3\) modulo \(4\).

## 9. Why rotation does not give a second congruence

Let \(a=(a_0,\ldots,a_{r-1})\) be the cyclic exponent word, and let
\(\Phi_i\) be the affine carry of the rotation beginning at \(a_i\). The
rotated cycle state is \(x_i=\Phi_i/D\). The branch equation gives

\[
\boxed{2^{a_i}\Phi_{i+1}=3\Phi_i+D.}
\tag{52}
\]

Since \(D\) is coprime to \(6\), equation (52) implies

\[
D\mid\Phi_i
\quad\Longleftrightarrow\quad
D\mid\Phi_{i+1}.
\tag{53}
\]

Hence the denominator-one congruences of all rotations form one cyclic
orbit of the same congruence. They are not independent conditions.

There is also only one bottom-normalized one-drop anchor. The word has
internal letters \(1\) and \(2\), and its unique terminal letter is
\(U+2>2\). A nontrivial rotation moves this letter into the interior and
does not preserve the monotone omission-height suffix used in (44).
Rotating until the large letter is terminal again returns to the original
anchor. Thus rotation neither reproduces the same centered residue with
a second short prefix nor supplies a second centered congruence for
\(E_M\).

## 10. Why generic approximation theorems do not finish

Equation (43) is exponentially smaller than the upper bound
\(O(M2^{-M}/Q)\) in (27). The exact congruence modulo \(3\) proves
nonvanishing and the full congruence modulo \(D\) locates the centered
residue, but neither supplies a polynomial lower bound for its absolute
value.

There is already a nonzero algebraic linear form of low auxiliary height,

\[
\Lambda_M
:=N\log2-r\log3-\log\widehat R_M.
\tag{54}
\]

Equation (28) gives \(h(\widehat R_M)=O(M^2)\). A generic
three-logarithm bound therefore has an exponent of order at least
\(M^2\log r\), whereas (27) gains only order \(M\) in its exponent.
Denominator one does not turn (44) into a two-logarithm form. If instead
one uses (42), the algebraic number \(D\) has logarithmic height of order
\(r\), which is worse.

The same tradeoff obstructs every direct choice of cut height. Raising
the cut improves the error like \(2^{-H}\), while the retained prefix
and the logarithmic height of its rational carry grow quadratically in
\(H\). A successful continuation must use special cancellation in the
centered residue \(E_M\), beyond rational spacing or a generic
linear-forms theorem.

## 11. Exact audit

The checker
[one_drop_height_truncation_certificate.js](cycles/one_drop_height_truncation_certificate.js)
uses rational integer arithmetic throughout. Through \(r=20\), it checks
all \(7072\) nontrivial omission profiles and all \(35637\) positive
height cuts. It verifies the bottom carry (5), the split (10), the short
denominator (15), the defect identity (17), the nonvanishing modulo
\(3\) in (19), and the rational version of the prefix-cleared identity
(41). It also verifies the suffix recurrence (47) and sign classification
(49) at every cut. Denominator one is exactly what makes \(P_M\) an
integer. There is no nontrivial denominator-one profile through \(r=20\),
so the finite audit does not use such a profile as an existence witness.
It returns

\[
\texttt{prefixClearedChecks=35637},
\qquad
\texttt{suffixRecurrenceChecks=35637},
\qquad
\texttt{status=PASS}.
\]

The frozen SHA-256 digest of the certificate source is

\[
\texttt{8c9c08071590a79f1c69eb4901df55130419f03c91c7cf6d1f01f7126c999450}.
\]

## Conclusion

The low-\(Q\) stabilization and the actual-factor theorem do combine into
new global information. They compress the full denominator-one equation
to a nonzero rational approximation generated by only
\(O((\log U)^2)\) initial branches, with polynomially small error. This is
substantially shorter than the period and retains the exact terminal
correction.

Denominator one upgrades this to a full-modulus statement: the late carry
minus one power of two is the unique centered residue of a short-prefix
integer modulo \(D\), and its size is less than \(9D/100\). This is one
strong congruence, not two independent congruences. In particular, the
error is provably not divisible by \(D\), so the global denominator cannot
be canceled by this route.

The suffix recurrence completely decides the sign. The residue is
negative only when there is no suffix spike, or when the sole suffix
spike is the last internal branch. Otherwise it is positive. Rotation
does not strengthen this statement: all rotated denominator-one
congruences are equivalent through (52), and only the original rotation
has the large drop in terminal position.

The remaining statement is a lower bound for the nonzero centered residue
\(E_M\), using more than its congruence class and its exact 3-adic
valuation. Equivalently, one needs a short-prefix, full-modulus
noncancellation theorem for the special numerator in (20).
