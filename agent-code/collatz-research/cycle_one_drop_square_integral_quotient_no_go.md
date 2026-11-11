# The square-scale integral quotient and its cyclic no-go

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** We prove that the integral coordinate obstruction for the
positive endpoint quotient is cyclic of order \(D=2^N-3^r\). Thus every
prime obstruction in the quotient coordinates is the original
denominator obstruction. We also prove that the reset-coordinate
recurrence is affinely conjugate to the state recurrence, and that
primitive positive integral clearings occur in strict-least rational
square countermodels. The only new size consequence is an exact
last-reset \(3\)-adic bound. It does not prove the square inequality.

## 1. Setup

Put

\[
 N:=\lceil r\log _2 3\rceil,
 \qquad d:=N-r,
 \qquad D:=2^N-3^r,
\tag{1}
\]

and assume that \(\gcd(N,r)=1\). Let \(\theta^r=2\), put

\[
 \mathcal O:=\mathbf Z[\theta],
 \qquad \delta:=\theta^N-3=2\theta^d-3,
\tag{2}
\]

and retain the one-drop notation

\[
 B_j:=\left\lfloor\frac{jN}{r}\right\rfloor,
 \qquad g_j:=B_{j+1}-B_j,
 \qquad c_j:=[jN]_r.
\tag{3}
\]

Choose a nonempty set \(S\) of preterminal two-gaps. We write

\[
 U:=|S|,
 \qquad m_j:=\#\{i\in S:i<j\},
\tag{4}
\]

and

\[
 J:=\{j<r-1:g_j=2\}\setminus S.
\tag{5}
\]

Finally, let \(A:=2^{U+1}\) and

\[
 K_U(X):=3(A-1)+
 \sum_{j\in J}2^{U+1-m_j}X^{r-c_j}.
\tag{6}
\]

The endpoint quotient is the unique element

\[
 \Xi:=\frac{K_U(\theta)}{\delta}\in\mathcal O\otimes\mathbf Q.
\tag{7}
\]

## 2. The quotient obstruction is cyclic

The purpose of this section is to identify every integral obstruction in
(7), including all prime-power obstructions.

**Theorem 1.** There is an isomorphism of additive groups

\[
 \boxed{\mathcal O/\delta\mathcal O\cong\mathbf Z/D\mathbf Z.}
\tag{8}
\]

In particular, the Smith normal form of multiplication by \(\delta\) on
the canonical basis of \(\mathcal O\) is

\[
 \boxed{\operatorname{diag}(1,\ldots,1,D).}
\tag{9}
\]

**Proof.** Choose integers \(a,b\) such that

\[
 aN+br=1.
\tag{10}
\]

The integer \(D\) is coprime to \(6\). Thus negative powers of \(2\) and
\(3\) are defined modulo \(D\), and we may put

\[
 t:=3^a2^b\pmod D.
\tag{11}
\]

Since \(3^r\equiv2^N\pmod D\), equation (10) gives

\[
 t^r\equiv2^{aN+br}=2\pmod D
\tag{12}
\]

and

\[
 t^N\equiv3^{aN+br}=3\pmod D.
\tag{13}
\]

Consequently, evaluation at \(t\) induces a surjection

\[
 \mathcal O/\delta\mathcal O\longrightarrow\mathbf Z/D\mathbf Z.
\tag{14}
\]

The conjugates of \(\theta^N\) are the \(r\) roots of
\(X^r-2^N\), since \(\gcd(N,r)=1\). Therefore,

\[
 |\operatorname{Norm}(\delta)|=2^N-3^r=D.
\tag{15}
\]

The group on the left side of (14) also has order \(D\). Hence (14) is
an isomorphism. The conclusion about the Smith normal form follows.
\(\square\)

Let \(C\) be the accelerated carry of the one-drop word, and write the
initial rational odd state in lowest terms as

\[
 x_0=\frac CD=\frac{n_0}{h}.
\tag{16}
\]

Thus

\[
 h=\frac{D}{\gcd(C,D)}.
\tag{17}
\]

**Corollary 2.** The additive order of \([K_U(\theta)]\) in
\(\mathcal O/\delta\mathcal O\) is exactly \(h\). Equivalently, if
\(t\) is given by (11), then

\[
 \boxed{
 h=\frac{D}{\gcd(D,K_U(t))}
   =\frac{D}{\gcd(D,C)}.}
\tag{18}
\]

In particular,

\[
 \boxed{
 \Xi\in\mathcal O
 \quad\Longleftrightarrow\quad
 K_U(t)\equiv0\pmod D
 \quad\Longleftrightarrow\quad
 D\mid C.}
\tag{19}
\]

**Proof.** The positive coefficient formula gives

\[
 (h\Xi)_0=An_0+h
\tag{20}
\]

and integral values for every other coefficient. Hence
\(hK_U(\theta)\in\delta\mathcal O\). On the other hand, the zeroth
coefficient of \(\Xi\) is

\[
 \xi_0=\frac{An_0+h}{h}.
\tag{21}
\]

Since \(h\) is odd and \(\gcd(n_0,h)=1\), the fraction in (21) has
denominator exactly \(h\). No smaller positive multiple of \(\Xi\) is
integral. Thus \([K_U(\theta)]\) has order \(h\). Equation (18) now
follows from Theorem 1 and (17). \(\square\)

Thus there is only one global integral obstruction. For every prime power
\(p^v\mid D\), the corresponding local condition is the projection of
the single congruence in (19) modulo \(p^v\). The coordinate lattice has
no second Smith factor on which an independent prime obstruction could
live.

## 3. The reset coordinates are the state coordinates

We next show that the local coordinate recurrence contains no second
dynamical law. Let

\[
 x_j=\frac{n_j}{h}
\tag{22}
\]

be the reduced rational orbit attached to the word. Thus

\[
 2^{a_j}n_{j+1}=3n_j+h.
\tag{23}
\]

Define \(e_0:=0\), and for \(1\leq j<r\), define

\[
 e_j:=r-c_j.
\tag{24}
\]

The positive integral clearing \(\Xi_h:=h\Xi\) has coordinates

\[
 \eta_0=An_0+h,
 \qquad
 \eta_{e_j}=2^{U-m_j}(n_j+h)
 \quad(1\leq j<r).
\tag{25}
\]

Put \(\eta_{e_r}:=\eta_0\). In the cyclic order (24), the equation

\[
 \delta\Xi_h=hK_U(\theta)
\tag{26}
\]

is

\[
 \omega_j\eta_{e_{j+1}}-3\eta_{e_j}=h k_j,
 \qquad 0\leq j<r,
\tag{27}
\]

where

\[
 \omega_0:=4,
 \qquad
 \omega_j:=2^{g_j}\ (1\leq j<r-1),
 \qquad
 \omega_{r-1}:=2,
\tag{28}
\]

and

\[
 k_j:=
 \begin{cases}
 3(A-1),&j=0,\\[3pt]
 2^{U+1-m_j},&j\in J,\\[3pt]
 0,&\text{otherwise}.
 \end{cases}
\tag{29}
\]

**Theorem 3.** After the substitution (25), the \(j\)-th equation in
(27) is exactly the \(j\)-th state equation in (23). More precisely:

1. the equation at \(j=0\) is \(2n_1=3n_0+h\);
2. a one-gap or a selected two-gap gives
   \(2n_{j+1}=3n_j+h\);
3. an unselected two-gap \(j\in J\) gives
   \(4n_{j+1}=3n_j+h\);
4. the terminal equation gives
   \(2^{U+2}n_0=3n_{r-1}+h\).

**Proof.** At \(j=0\), subtracting the right side of (27) from the left
side and using \(A=2^{U+1}\) gives

\[
 A(2n_1-3n_0-h).
\tag{30}
\]

At a one-gap, the common factor in (25) is unchanged, so the same
difference is

\[
 2^{U-m_j}(2n_{j+1}-3n_j-h).
\tag{31}
\]

At a selected two-gap, the factor in (25) is divided by two and
\(\omega_j=4\), which again gives (31). At an unselected two-gap, the
factor is unchanged and the reset term in (29) gives

\[
 2^{U-m_j}(4n_{j+1}-3n_j-h).
\tag{32}
\]

Finally, the terminal equation is

\[
 2(An_0+h)-3(n_{r-1}+h)=0,
\tag{33}
\]

which is the fourth displayed equation. The conclusion follows.
\(\square\)

In other words, unrolling any string of zero coordinates in (27) gives
the corresponding string of ordinary state equations. Unrolling across a
reset gives the corresponding exponent-two state equation. Closing the
coordinate cycle gives the original carry identity. This is an affine
diagonal conjugacy, not an additional recurrence.

## 4. Primitivity does not separate the rational models

If \(J\neq\varnothing\), the coefficient content of \(K_U\) is one: its
constant coefficient is odd and one of its other coefficients is a power
of two.

**Proposition 4.** Suppose that \(J\neq\varnothing\) and that
\(n_0/h\) is reduced. Then the cleared coefficient vector \(\Xi_h=h\Xi\)
in (25) is primitive.

**Proof.** Let \(c\) divide every coefficient of \(\Xi_h\). Equation (26)
shows that \(c\) divides every coefficient of \(hK_U\). Since
\(K_U\) has content one, we have \(c\mid h\). Equation (25) now gives

\[
 c\mid An_0.
\tag{34}
\]

The integer \(h\) is odd and \(\gcd(n_0,h)=1\), while \(A\) is a power
of two. Therefore \(c=1\). \(\square\)

There is a small exact rational square countermodel in the coprime
setting. Take

\[
 (r,N,U)=(4,7,1),
 \qquad S=\{1\},
 \qquad J=\{2\}.
\tag{35}
\]

The word is \((1,1,2,3)\), \(D=47\), and the strict-least rational orbit
has numerator states

\[
 (73,133,223,179)
\tag{36}
\]

over the common denominator \(47\). Its bottom-normalized initial value is

\[
 q=\frac{x_0+1}{2}=\frac{60}{47},
 \qquad q^2=\frac{3600}{2209}<2=2^U.
\tag{37}
\]

Here

\[
 K_U(\theta)=9+2\theta^2
\tag{38}
\]

and

\[
 \boxed{
 \Xi_h=339+360\theta+270\theta^2+226\theta^3,
 \qquad
 \delta\Xi_h=47K_U(\theta).}
\tag{39}
\]

All four coefficients in (39) are positive, and their gcd is one. Thus
positivity, integrality, and primitivity all coexist with a strict-least
rational failure of the square bound. The denominator is recorded only
by the scalar \(47\) on the right side of (39).

The all-selected rational example at \((r,N,U)=(8,13,4)\) has
\(J=\varnothing\), so its cleared vector has nontrivial content. Equation
(39) shows that this feature is special to the scalar-support example. As
soon as a genuine reset is present, primitivity does not distinguish a
rational clearing from a denominator-one quotient.

## 5. The exact last-reset bound

The coordinate recurrence does give one transparent lower bound. Suppose
that \(J\neq\varnothing\), put

\[
 j_*:=\max J,
 \qquad L:=r-1-j_*.
\tag{40}
\]

**Proposition 5.** For every reduced rational orbit,

\[
 \boxed{v_3(\eta_0)=L.}
\tag{41}
\]

In the denominator-one case, if \(q:=(n_0+1)/2\), then

\[
 \boxed{
 3^L\mathrel{\|}\bigl(2Aq-(A-1)\bigr)=\xi_0.}
\tag{42}
\]

**Proof.** Since \(h\mid D\) and \(3\nmid D\), we have \(3\nmid h\).
At the last reset, equation (27) gives

\[
 4\eta_{e_{j_*+1}}-3\eta_{e_{j_*}}
 =h2^{U+1-m_{j_*}}.
\tag{43}
\]

The right side is nonzero modulo \(3\), so
\(v_3(\eta_{e_{j_*+1}})=0\). Every remaining coordinate equation before
returning to \(e_0=0\) has zero right side. Its weight is a power of two,
so each such equation increases the \(3\)-adic valuation by exactly one.
There are \(L\) equations. This proves (41). Equation (42) follows from
\(h=1\), \(n_0=2q-1\), and (25). \(\square\)

Consequently, a denominator-one square failure

\[
 q^2<2^U
\tag{44}
\]

would satisfy

\[
 3^L\leq\xi_0
 =2Aq-(A-1)
 <2^{3U/2+2}.
\tag{45}
\]

Thus

\[
 \boxed{
 L\log _2 3<\frac{3U}{2}+2.}
\tag{46}
\]

This excludes a sufficiently long terminal zero run. If
\(J=\varnothing\), all \(r-1\) preterminal branches are ordinary. Their
integrality forces \(2^{r-1}\mid q\), and hence

\[
 q^2\geq2^{2r-2}\geq2^U.
\tag{47}
\]

Therefore every square failure must have a genuine reset, and its last
reset must satisfy (46).

The limitation of (42) is exact. Under the conjugacy in Theorem 3, it is
the ternary congruence obtained by following the state recurrence from the
last exponent-two step through the terminal return. It selects one residue
class for \(q\) modulo \(3^L\), but it does not show that the least member
of that class is large. The rational model (35) through (39) satisfies
the same valuation law, with \(L=1\) and \(v_3(339)=1\).

## Conclusion

The positive quotient coordinates contain one genuine arithmetic datum:
the normalized scalar in

\[
 \delta\Xi_h=hK_U(\theta).
\tag{48}
\]

Theorem 1 shows that this datum lives in one cyclic group of order \(D\).
Corollary 2 identifies its order with the reduced orbit denominator.
Theorem 3 shows that the reset-coordinate recurrence is exactly the state
recurrence after an affine diagonal change of variables. Proposition 4
shows that even primitive positive integral coefficient vectors occur in
rational square countermodels.

Thus neither coefficient signs, norm size, coefficient integrality after
clearing, nor primitivity supplies an independent square obstruction. To
use denominator one, one must prove that the class in (19) vanishes with
the normalized scalar \(h=1\), and then control the small representative
encoded by

\[
 \xi_0=2^{U+2}q-(2^{U+1}-1).
\tag{49}
\]

That is the original full-modulus and state-collision problem. The exact
last-reset estimate (46) is the only size consequence obtained here, and
it does not close the all-depth square gate.
