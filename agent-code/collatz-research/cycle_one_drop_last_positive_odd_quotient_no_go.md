# The last-positive odd-quotient conjugacy and its sharp no-go

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** We divide the last positive multicut defect by its exact power of
(2). The resulting odd integer is not a cycle state, a Collatz ancestor, a
shorter fixed-point numerator, or a return displacement. It is the centered
carry numerator of a (q=1) affine tail which starts at the dyadic point
(-1/2). In the one-drop candidate slope range, this quotient is at least
(11), and the bound is sharp at every large depth. A primitive strict-least
rational family attains (11), lies below the critical polynomial gate, and
has denominator larger than one. Thus the normalization does not produce a
smaller positive nonconvergent seed. Any continuation must use denominator
one to exclude the tail word itself.

## 1. The exact quotient

We use the notation of the multicut centered-residue theorem. Put

\[
D:=2^N-3^r,
\qquad
e:=N-r,
\qquad
N-U=r+V+1.
\tag{1}
\]

Let (H_*) be the last positive cut, and write

\[
E_*:=E_{H_*}>0.
\tag{2}
\]

Let (T:=T_{H_*}), let (k) be the number of spikes through time (T),
and put (L:=r-T). Write the remaining spikes as

\[
t_{k+j}=T+\sigma_j,
\qquad
1\leq \sigma_1<\cdots<\sigma_w<L.
\tag{3}
\]

The suffix factorization is

\[
E_*=2^{T+k}\varepsilon_L,
\tag{4}
\]

where

\[
\varepsilon_L
:=\sum_{j=1}^{w}2^{\sigma_j+j}3^{L-\sigma_j}
-2^{L+w+1}.
\tag{5}
\]

The first remaining spike is the unique term of least (2)-adic
valuation. Therefore,

\[
\lambda:=v_2(E_*)
=t_{k+1}+k+1
=T+k+\sigma_1+1.
\tag{6}
\]

We define the last-positive odd quotient by

\[
\boxed{
W_*:=\frac{E_*}{2^\lambda}
=\frac{\varepsilon_L}{2^{\sigma_1+1}}.}
\tag{7}
\]

It is a positive odd integer. Moreover, (3\nmid W_*), since
(v_3(E_*)=0).

## 2. The exact (q=1) tail conjugacy

Put

\[
d_s:=\frac{\varepsilon_s}{2^{s+j_s}},
\tag{8}
\]

where (j_s) counts the remaining spikes through suffix time (s). The
two defect maps are

\[
O(d):=\frac32d+1,
\qquad
S(d):=\frac34d+\frac12.
\tag{9}
\]

Initial ordinary sites fix (d=-2), and the first remaining spike sends
(-2) to (-1). We now discard this first spike and retain the tail after
it. Put

\[
m:=L-\sigma_1=r-t_{k+1}.
\tag{10}
\]

The tail has (m) letters, contains (w-1) spikes, and has total exponent

\[
A:=m+w-1.
\tag{11}
\]

Write its exponents as (a_1,\ldots,a_m\in\{1,2\}), and put

\[
A_s:=\sum_{i=1}^{s}a_i,
\qquad
C_0:=0,
\qquad
C_{s+1}:=3C_s+2^{A_s}.
\tag{12}
\]

Thus the ordinary (q=1) affine map of the tail is

\[
\Phi_s(y)=\frac{3^sy+C_s}{2^{A_s}}.
\tag{13}
\]

**Proposition 1.** With the substitution

\[
y:=\frac d2,
\tag{14}
\]

both defect maps become

\[
2^ay'=3y+1,
\qquad
a\in\{1,2\}.
\tag{15}
\]

The tail starts at (y_0=-1/2), and

\[
\boxed{
y_m=\frac{W_*}{2^{A+1}},
\qquad
W_*=2C_m-3^m.}
\tag{16}
\]

Equivalently, if

\[
W_s:=2C_s-3^s,
\tag{17}
\]

then

\[
W_0=-1,
\qquad
\boxed{W_{s+1}=3W_s+2^{A_s+1}},
\qquad
W_m=W_*.
\tag{18}
\]

**Proof.** Equation (15) follows by substituting (d=2y) in (9). Equation
(13), evaluated at (-1/2), gives

\[
\Phi_m(-1/2)
=\frac{2C_m-3^m}{2^{A+1}}.
\]

On the other hand, (7), (8), and (11) give

\[
d_L=\frac{W_*}{2^A}.
\]

Since (y_m=d_L/2), equation (16) follows. Equation (18) follows directly
from (12) and (17). \(\square\)

There is a second useful conjugacy. Put

\[
Z:=\frac{d+2}{4}=\frac{y+1}{2}.
\tag{19}
\]

Then

\[
O:Z\longmapsto\frac{3Z}{2},
\qquad
S:Z\longmapsto\frac{3Z+1}{4}.
\tag{20}
\]

These are exactly the bottom-normalized one-drop maps. The trajectory starts
at (Z_0=1/4), rather than at a positive integer, and ends at

\[
\boxed{
Z_m=\frac12+\frac{W_*}{2^{A+2}}.}
\tag{21}
\]

Thus (W_*) is the centered carry numerator of the zero-input tail. This is
the precise dynamic meaning of the normalized defect.

## 3. Why none of the descent interpretations applies

The conjugacy in Proposition 1 is a (q=1) conjugacy, but it does not enter
the integer Collatz lattice. At every intermediate time,

\[
y_s=\frac{W_s}{2^{A_s+1}}.
\tag{22}
\]

Equation (18) shows inductively that every (W_s) is odd. Hence the
denominator in (22) is exact, and (y_s\notin\mathbb Z). The same statement
holds in the bottom coordinate, since

\[
Z_s=\frac{2^{A_s+1}+W_s}{2^{A_s+2}}
\tag{23}
\]

also has odd numerator. Consequently, the auxiliary tail contains no integer
state. In particular, (W_*) is only the numerator obtained after clearing a
varying dyadic denominator. It is not an actual state or ancestor of the
original cycle.

The tail fixed point is

\[
y_{\mathrm{fix}}
=\frac{C_m}{2^A-3^m}.
\tag{24}
\]

Its fixed-point numerator is (C_m), before reduction, whereas

\[
W_*=2C_m-3^m.
\tag{25}
\]

The return displacement of the starting point is

\[
\Phi_m(-1/2)-(-1/2)
=\frac{W_*+2^A}{2^{A+1}}
=\frac{2C_m+(2^A-3^m)}{2^{A+1}}.
\tag{26}
\]

Thus (W_*) is neither the shorter fixed-point numerator nor the return
displacement numerator.

Denominator one also does not transfer to this tail. At the cut, the exact
global identity is

\[
F_{H_*}+E_*=4K.
\tag{27}
\]

If (K=QD), then, since (D) is odd,

\[
W_*\equiv-2^{-\lambda}F_{H_*}\pmod D.
\tag{28}
\]

This is the original cut congruence after multiplication by a unit. It does
not say (D\mid W_*), and it gives no denominator-one condition for the
shorter denominator (2^A-3^m). Leastness concerns the actual integer cycle
states. It cannot be applied to either nonintegral trajectory in (22) or
(23).

## 4. The sharp quotient floor in the candidate slope range

Put

\[
\theta:=\frac er,
\tag{29}
\]

and assume

\[
\frac12<\theta<\frac23.
\tag{30}
\]

This is the relevant one-drop slope range. The mechanical clock is

\[
B_t:=\left\lfloor\frac{et}{r}\right\rfloor.
\tag{31}
\]

For (j\geq1), we have

\[
B_{r-j}=e-\lceil j\theta\rceil.
\tag{32}
\]

Since

\[
\lceil2\theta\rceil=\lceil3\theta\rceil=2,
\tag{33}
\]

the site (t=r-2) is not eligible. A positive defect cannot have its first
remaining spike at (r-1), since that suffix is one of the two negative
classes. Therefore,

\[
t_{k+1}\leq r-3,
\qquad
m\geq3.
\tag{34}
\]

**Proposition 2.** In the slope range (30), every last-positive quotient
satisfies

\[
\boxed{W_*\geq11.}
\tag{35}
\]

Equality holds exactly when the first remaining spike is (t=r-3) and its
three-letter tail is (OOO).

**Proof.** From (18),

\[
W_0=-1,
\qquad
W_1=-1.
\]

If (a_1=1), then (W_2=1). If (a_1=2), then (W_2=5). In the first
case, (A_2\geq2), and therefore

\[
W_3\geq3+2^3=11.
\]

In the second case, (A_2\geq3), and (W_3\geq31). Once (W_s>0),
equation (18) makes the sequence strictly increasing. Since (m\geq3), this
proves (35). Equality requires (m=3) and (a_1=a_2=1). The final suffix
site is always ordinary, so the full tail is (OOO). \(\square\)

This improves the normalized constant from the unrestricted value (1) to
(11), but it still gives no quantity which grows with (U) or (Q).

## 5. A sharp denominator-one-blind family

We now show that the constant (11) persists at arbitrary depth while every
order and size condition used before denominator one remains valid.

For every (r\geq128), put

\[
N:=\lceil r\log _2 3\rceil,
\qquad
e:=N-r.
\tag{36}
\]

The inequalities (3^2>2^3) and (3^{100}<2^{159}) give

\[
\frac12<\frac er<\frac23.
\tag{37}
\]

Equation (32) shows that (r-3) and (r-1) are eligible, while (r-2)
is not. Retain only the spike

\[
t_1:=r-3
\tag{38}
\]

and omit every other eligible site. Then

\[
V=1,
\qquad
U=e-2,
\qquad
H_*=U-1.
\tag{39}
\]

At height (H_*),

\[
\begin{aligned}
E_*
&=2^{r-2}3^3-2^{N-U}\\
&=2^{r-2}(27-16)\\
&=11\cdot2^{r-2}.
\end{aligned}
\tag{40}
\]

The next cut has no remaining spike and is negative. Thus this is exactly the
last positive cut, and

\[
\boxed{W_*=11.}
\tag{41}
\]

The tail is (OOO), with

\[
m=A=3,
\qquad
C_m=19,
\qquad
2C_m-3^m=38-27=11.
\tag{42}
\]

The corresponding bottom-normalized exponent word is

\[
(1^{r-4},2,1,1,e).
\tag{43}
\]

Its fixed numerator and global denominator are

\[
K=2^{N-1}+11\cdot2^{r-4}
=2^{r-4}(2^{e+3}+11),
\qquad
D=2^N-3^r.
\tag{44}
\]

The rational cycle with least coordinate (Q:=K/D) is primitive and strict
least. Indeed, the first (r-4) ordinary maps multiply (Q) by (3/2). At
the spike, the new state is larger than

\[
\frac34\left(\frac32\right)^{r-4}Q>Q,
\tag{45}
\]

and the next two ordinary maps increase it again. The terminal map returns to
(Q). The unique exponent (e>2) makes the word primitive.

This family has denominator larger than one. If (D\mid K), then, since
(D) is odd, (44) would give

\[
D\mid2^{e+3}+11.
\tag{46}
\]

The available Diophantine gap estimate gives

\[
D>\frac{3^r}{459r^{133/10}}.
\tag{47}
\]

On the other hand, (e<59r/100+1). For (r\geq128),

\[
\frac{2^{3r/2}}{459r^{133/10}}
>2^{59r/100+5}
>2^{e+3}+11.
\tag{48}
\]

The first inequality follows at (r=128), and its logarithmic ratio is
increasing thereafter. Equations (47) and (48) give

\[
D>2^{e+3}+11,
\tag{49}
\]

which contradicts (46). Hence the reduced rational denominator is larger
than one.

The same family lies below the failed polynomial gate. Since (K<2^N),
(2^N/3^r<2), and (47) holds, we have

\[
Q<918r^{133/10}.
\tag{50}
\]

Also (U>r/4). For (r\geq128),

\[
918r^{133/10}
<\left(\frac r4\right)^{271/10}
<U^{271/10}.
\tag{51}
\]

Moreover, (U^2/r>r/16), so the family is in the high-rise range. It
satisfies primitivity, strict leastness, the candidate slope, high rise, and
the failed polynomial gate. Its only missing property is denominator one.
It is therefore an exact denominator-one-blind extremizer for the normalized
quotient attack.

Order alone fails even numerically. At (r=41), the same construction gives

\[
Q=
\frac{18446745585538039808}{420491770248316829}
>43>11=W_*.
\tag{52}
\]

Every rational cycle state is at least (Q), but the auxiliary quotient is
smaller. Thus no leastness inequality for (W_*) follows from the order
structure.

Finally, if we ignore the conjugacy and simply launch the accelerated odd
Collatz map from the integer (W_*=11), we obtain

\[
11\longmapsto17\longmapsto13\longmapsto5\longmapsto1.
\tag{53}
\]

The sharp quotient therefore supplies a convergent seed, not a smaller
positive nonconvergent seed.

## 6. Exact audit

The checker
[one_drop_last_positive_odd_quotient_no_go_certificate.js](cycles/one_drop_last_positive_odd_quotient_no_go_certificate.js)
uses integer arithmetic throughout. Through (r=28), it audits all
(187288) nontrivial one-drop profiles. Of these, (186868) have a positive
cut. At every last positive cut, it verifies the exact valuation (6), both
conjugacies (16) and (21), the fixed-point and displacement separation, and
the nonintegrality of every intermediate conjugate state. In the slope range
(30), it performs (186722) quotient-floor checks and finds (23390) sharp
instances with (W_*=11).

It also audits the sharp rational family for every (128\leq r\leq512). All
(385) rows are primitive, strict least, high rise, below the polynomial
gate, and have reduced denominator larger than one. The first and last rows
are

\[
(r,N,e,U)=(128,203,75,73),
\qquad
(512,812,300,298).
\tag{54}
\]

The checker returns

\[
\texttt{normalizedQuotientChecks=186868},
\qquad
\texttt{qOneConjugacyChecks=186868},
\qquad
\texttt{familyRows=385},
\qquad
\texttt{status=PASS}.
\tag{55}
\]

The frozen SHA-256 digest of the certificate source is

\[
\texttt{2ffe928bdeed346f63d4fe311e370f3b47bbc10fe40b89cebf4df38089e605c7}.
\tag{56}
\]

## Conclusion

The exact odd quotient at the last positive cut has a clean global meaning,
but not the one required for descent. It is

\[
W_*=2C_m-3^m,
\]

the centered carry numerator of a dyadic (q=1) tail from (-1/2). The
conjugated trajectory never enters the integer lattice. Its fixed-point
numerator is (C_m), and its return-displacement numerator is (W_*+2^A).
The original denominator-one condition supplies only the already known cut
congruence.

In the actual slope range, (W_*\geq11), sharply. The all-depth rational
family shows that (11) survives every structural constraint used before
denominator one, including strict leastness and the failed polynomial gate.
Therefore, dividing by the exact (2)-adic factor does not yield a smaller
nonconvergent seed or a growing lower bound for (Q). A successful next step
must be genuinely (q=1)-specific and must exclude the tail word (OOO), or
more generally restrict the centered carry (2C_m-3^m), by using the full
global modulus rather than leastness or local suffix dynamics.
