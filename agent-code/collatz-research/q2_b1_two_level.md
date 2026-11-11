# The nonempty two-level gate at terminal complement \(b=1\)

**Date:** 17 August 2026  
**Mode:** SOLVE  
**Status:** the singleton, two-shift, and mandatory maximal-barrier equations
are explicit. Neither positivity nor the available seed bound forces
\(d=\lfloor C/P\rfloor\). The second Bezout relation determines \(d\) as a
low modular residue but does not eliminate it. Proper-factor witnesses show
that full-determinant control remains essential. No nonempty two-level
sector is excluded all-depth in this note.

## 1. Setup

Retain the coprime notation from the Bezout-deformation report:

\[
N=\lceil s\log_2 3\rceil,
\qquad
D=2^N-3^s,
\qquad
z^s=2,
\qquad
z^N=3
\pmod D.
\]

For levels \(m_i\in\{0,1\}\), let

\[
T:=\{i:m_i=1\},
\qquad
c_i:=[iN]_s.
\]

The exact strict target equation is

\[
\boxed{
(z-1)\sum_{i\in T}z^{-c_i}
+6d(z-1)-z=0
\pmod D.}
\tag{1}
\]

The target range is

\[
1\leq d\leq\left\lceil\frac{N-s-1}{2}\right\rceil.
\tag{2}
\]

## 2. The exact floor split

If a full target exists, put

\[
Z:=\frac{C-3^sd}{D}=n+d>0.
\]

Then

\[
\frac C{3^s}
=d+\frac D{3^s}Z.
\tag{3}
\]

Let

\[
q:=\left\lfloor\frac C{3^s}\right\rfloor,
\qquad
\lambda:=q-d.
\]

Equation \((3)\) gives the exact equivalence

\[
\boxed{
\lambda\leq\frac D{3^s}Z<\lambda+1,
\qquad
d=q\Longleftrightarrow Z<\frac{3^s}{D}.}
\tag{4}
\]

Thus substituting the real floor for \(d\) requires a new endpoint bound,
not only the sign \(C>3^sd\). The current estimates give

\[
Z<153s^{14.3}+s
\]

but do not give \(Z<3^s/D\). The general carry estimate gives only
\(\lambda<s/3-d\), which permits linearly many floor levels.

There is an exact structured warning against using positivity alone. At

\[
(s,N)=(8,13),
\qquad
T=\{5\},
\]

the prefix-valid \(b=1\) profile has

\[
C=13349,
\qquad
3^s=6561,
\qquad
\left\lfloor\frac C{3^s}\right\rfloor=2.
\tag{5}
\]

The choice \(d=1\) satisfies \(C>3^sd\) but lies strictly below the floor.
It is not a full determinant target. It proves that the floor step cannot
be inferred before divisibility and the missing endpoint estimate are used.

## 3. Singleton and two-shift normal forms

For a singleton shifted residue \(c\), equation \((1)\) is

\[
\boxed{
H_{c,d}(z)=0,
\qquad
H_{c,d}(X):=
(6d-1)X^{c+1}-6dX^c+X-1.}
\tag{6}
\]

Equivalently, since \(6z^c(z-1)\) is a unit modulo \(D\),

\[
\boxed{
d\equiv
\frac{z^{c+1}-z+1}{6z^c(z-1)}
\pmod D.}
\tag{7}
\]

For two shifted residues \(c_1<c_2\), put

\[
S(X):=X^{c_2-c_1}+1.
\]

Then

\[
\boxed{
(X-1)S(X)
+\left(6d(X-1)-X\right)X^{c_2}=0
\quad\text{at }X=z.}
\tag{8}
\]

The second specific-root relation is

\[
2z^{N-s}=3,
\qquad
3z^{2s-N}=4
\pmod D.
\tag{9}
\]

It can shorten the exponents in \((6)\) or \((8)\), but it does not give an
independent equation for \(d\). Equation \((7)\) already shows the exact
logical state: each deformation determines one residue class for \(d\)
modulo \(D\). The missing theorem is that this residue never lies in the
short interval \((2)\).

The inhomogeneous coefficient also removes the content gains used in the
cycle resultants. For example,

\[
H_{c,d}(X)\equiv-X^{c+1}+X-1\pmod3.
\tag{10}
\]

Its leading coefficient is a unit modulo three. Resultants against a
binomial whose leading coefficient is divisible by three therefore have no
uniform high power of three to divide away. This is the arithmetic form of
the coefficient-energy obstruction.

## 4. Proper-factor witnesses

The following examples satisfy the prefix barriers and the \(b=1\)
two-level path constraints. They are not full targets.

For the singleton

\[
s=17,
\qquad
N=27,
\qquad
T=\{4\},
\qquad
c=6,
\qquad
d=3,
\]

we have

\[
D=5077565,
\qquad
C=531434159,
\qquad
\gcd(D,C-3^sd)=5.
\tag{11}
\]

The polynomial is

\[
17X^7-18X^6+X-1.
\]

For the two-shift profile

\[
s=8,
\qquad
N=13,
\qquad
T=\{5,6\},
\qquad
\{c_1,c_2\}=\{1,6\},
\qquad
d=1,
\]

we have

\[
D=1631,
\qquad
C=12581,
\qquad
\gcd(D,C-3^sd)=7.
\tag{12}
\]

Here the polynomial is

\[
5X^7-5X^6-X^5+X-1.
\]

Thus both sparse sectors can vanish at the specific Bezout root modulo a
proper factor of \(D\). Irreducibility and nonvanishing of the resultant are
not enough. The full determinant must be compared.

## 5. The mandatory maximal-barrier deformation

Put

\[
\alpha:=\log_2 3,
\qquad
\delta:=N-\alpha s.
\]

The maximal valid profile is

\[
A_i=\lfloor i\alpha\rfloor,
\qquad
m_i=\varepsilon_i:=
\left\lfloor\frac{iN}{s}\right\rfloor
-\lfloor i\alpha\rfloor.
\tag{13}
\]

It is exactly the \(b=1\) profile whose accelerated exponents all lie in
\(\{1,2\}\). Its shifted set has the additional arithmetic description

\[
\boxed{
i\in T_\varepsilon
\quad\Longleftrightarrow\quad
c_i<i\delta.}
\tag{14}
\]

Indeed,

\[
iN-s\lfloor i\alpha\rfloor
=i\delta+s\{i\alpha\}
=c_i+s\varepsilon_i.
\]

In particular, every shifted residue satisfies

\[
1\leq c_i<s\delta.
\tag{15}
\]

The real carry also has the exact Beatty form

\[
\boxed{
\frac C{3^s}
=\frac13\sum_{i=0}^{s-1}2^{-\{i\alpha\}}.}
\tag{16}
\]

Equations \((1)\), \((14)\), and \((16)\) are the sharp current target for
the maximal profile. If the endpoint inequality in \((4)\) could be proved,
then \(d\) would be the explicit floor of \((16)\). No such all-depth
endpoint bound or equivalent low-residue theorem is presently known.

The targeted maximal-profile probe finds no strict target residue through
weight \(5000\). The all-\(\{1,2\}\) diagnostic finds positive canonical
gaps through weight \(27\). These are diagnostics only and are not used as
a substitute for a uniform theorem.

## 6. Proof ledger

The following items are closed.

1. The floor split is exactly \((4)\).
2. Positivity alone does not force the floor, as shown by \((5)\).
3. The singleton and two-shift gates are \((6)\)-\((8)\).
4. The second Bezout relation does not eliminate \(d\); it leaves the low
   residue problem \((7)\).
5. Proper determinant factors occur in both sparse sectors.
6. The mandatory maximal profile has the structured residue set \((14)\)
   and Beatty carry \((16)\).

The following items remain open.

1. Prove \(Z<3^s/D\), or control the integer \(\lambda\) in \((4)\), for
   singleton and two-shift targets.
2. Prove that the residue in \((7)\) exceeds the interval \((2)\).
3. Exclude the structured mandatory set \(T_\varepsilon\).
4. Exclude general nonempty two-level paths.

## 7. Assessment

The floor idea identifies a useful conditional reduction but does not yet
remove \(d\). The exact obstruction is an endpoint-scale inequality, not a
missing algebraic manipulation of the Bezout root. The mandatory profile
does have substantially more structure than an arbitrary shifted set, but
its Beatty residue condition has not yet yielded a determinant bound. The
two-level branch therefore remains a low-residue problem coupled to a
mechanical-word path.

The targeted diagnostics are
[`inverse/q2_b1_two_level_probe.js`](inverse/q2_b1_two_level_probe.js) and
[`inverse/q2_b1_epsilon_probe.js`](inverse/q2_b1_epsilon_probe.js).
