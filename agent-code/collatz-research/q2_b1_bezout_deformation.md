# The inhomogeneous Bezout deformation at terminal complement \(b=1\)

**Date:** 17 August 2026  
**Mode:** SOLVE  
**Status:** the exact Bezout-root deformation polynomial is derived. The
pure Christoffel profile is excluded at all depths, including common-divisor
slopes. The existing Christoffel and two-level norm methods do not exclude a
nonempty deformation: the strict target introduces a coefficient
\(6d-1\geq5\), which destroys the determinant-size margin even for one
shift. The general \(b=1\) strict branch remains open.

## 1. Outcome

Let

\[
N:=\lceil s\log_2 3\rceil,
\qquad
e:=N-s,
\qquad
D:=2^N-3^s.
\]

In the terminal-complement branch \(b=1\), the last one is at \(N-2\), the
terminal delay is \(e-1\), and every strict target satisfies

\[
1\leq d\leq\left\lceil\frac{e-1}{2}\right\rceil.
\tag{1}
\]

We prove the following statements.

1. At a coprime slope \(\gcd(N,s)=1\), every anchored profile is an exact
   nonnegative dyadic deformation of the lower Christoffel profile.
2. The target divisibility \(D\mid C-3^sd\) is equivalent to one explicit
   Bezout-root equation and one explicit integer resultant.
3. The undeformed Christoffel profile cannot satisfy the strict target at
   any depth.
4. For a nonempty two-level deformation, the coefficient-energy argument
   is already too large when \(d=1\). Thus the cycle two-level proof does
   not extend uniformly to this inhomogeneous gate.

The fourth statement is a method-level obstruction. It is not a theorem
that no different resultant argument can succeed.

## 2. Exact deformation coordinates

Put

\[
\alpha:=\log_2 3
\]

and let

\[
0=A_0<A_1<\cdots<A_{s-1}=N-2
\]

be the one positions. Assume first that \(\gcd(N,s)=1\). Define

\[
c_i:=[iN]_s,
\qquad
m_i:=\left\lfloor\frac{iN}{s}\right\rfloor-A_i.
\tag{2}
\]

The prefix barrier \(A_i\leq\lfloor i\alpha\rfloor\) gives

\[
m_i\geq
\varepsilon_i:=
\left\lfloor\frac{iN}{s}\right\rfloor
-\lfloor i\alpha\rfloor
\in\{0,1\}.
\tag{3}
\]

Moreover,

\[
m_0=m_{s-1}=0.
\tag{4}
\]

The terminal identity follows from

\[
\left\lfloor\frac{(s-1)N}{s}\right\rfloor=N-2.
\]

If

\[
a_i^{\rm chr}:=
\left\lfloor\frac{(i+1)N}{s}\right\rfloor
-\left\lfloor\frac{iN}{s}\right\rfloor
\in\{1,2\},
\]

then strict increase of the positions is exactly the path constraint

\[
m_{i+1}-m_i\leq a_i^{\rm chr}-1.
\tag{5}
\]

Thus an anchored \(b=1\) word is a Christoffel path shifted to the left by
nonnegative levels \(m_i\), with upward moves permitted only across a
Christoffel gap of two.

The undeformed profile \(m_i=0\) is only an algebraic base point. It is
prefix-valid precisely when every \(\varepsilon_i\) in \((3)\) vanishes.
The actual maximal prefix-barrier profile is

\[
A_i=\lfloor i\alpha\rfloor,
\qquad
m_i=\varepsilon_i.
\]

It is a structured two-level deformation, and all its accelerated
exponents lie in \(\{1,2\}\). The certificate finds only eight prefix-valid
pure Christoffel profiles below its cutoff. Thus Section 6 excludes the
algebraic base family, not the typical maximal valid profile.

## 3. The inhomogeneous Bezout-root gate

Choose integers \(u,v\) satisfying

\[
us+vN=1
\]

and define the unit

\[
z:=2^u3^v\pmod D.
\]

Then

\[
z^s\equiv2,
\qquad
z^N\equiv3
\pmod D.
\tag{6}
\]

Put

\[
\kappa_i:=iN-sA_i=c_i+sm_i.
\]

The anchored carry has the exact spectral form

\[
C\equiv
z^{N(s-1)}
\sum_{i=0}^{s-1}z^{-c_i}2^{-m_i}
\pmod D.
\tag{7}
\]

Since

\[
3^s\equiv3z^{N(s-1)}\pmod D,
\]

the strict target gate becomes

\[
\boxed{
D\mid C-3^sd
\quad\Longleftrightarrow\quad
\sum_{i=0}^{s-1}z^{-c_i}2^{-m_i}
\equiv3d\pmod D.}
\tag{8}
\]

This is the cycle-integrality deformation equation with one inhomogeneous
term.

There is an exact polynomial form. Put

\[
h:=\max_i m_i
\]

and let \(i(q)\) be the unique index satisfying \(c_{i(q)}=q\). Define

\[
\begin{aligned}
\Phi_{\mathbf m,d}(X)
:={}&(1-3d)2^hX^{s-1}\\
&+\sum_{q=1}^{s-1}
2^{h-m_{i(q)}}X^{s-1-q}.
\end{aligned}
\tag{9}
\]

Multiplication of \((8)\) by \(2^hz^{s-1}\) gives

\[
\boxed{\Phi_{\mathbf m,d}(z)\equiv0\pmod D.}
\tag{10}
\]

The polynomial in \((9)\) is nonzero and has degree less than \(s\). Since
\(X^s-2\) is Eisenstein at two,

\[
\boxed{
0\neq
\operatorname{Res}
\left(X^s-2,\Phi_{\mathbf m,d}\right)
\equiv0\pmod D.}
\tag{11}
\]

Equation \((11)\) is the exact all-depth polynomial obstruction for every
coprime \(b=1\) profile.

## 4. Why the direct energy argument fails

Let

\[
\eta:=2^{1/s}.
\]

Parseval on the roots \(\eta\zeta\), where \(\zeta^s=1\), gives the exact
coefficient energy

\[
\begin{aligned}
Q={}&(3d-1)^2 2^{2h}\eta^{2(s-1)}\\
&+\sum_{q=1}^{s-1}
2^{2(h-m_{i(q)})}\eta^{2(s-1-q)}.
\end{aligned}
\tag{12}
\]

Every coefficient in the sum is a positive integer, and \(d\geq1\).
Therefore

\[
\boxed{Q\geq s+3.}
\tag{13}
\]

The standard arithmetic-geometric mean bound is

\[
\left|
\operatorname{Res}
\left(X^s-2,\Phi_{\mathbf m,d}\right)
\right|
\leq Q^{s/2}.
\tag{14}
\]

For \(s\geq7\), the right side furnished by \((14)\) is already larger
than \(3^s>D\). Thus the direct \(X^s-2\) energy method cannot prove that
the nonzero resultant in \((11)\) is smaller than \(D\).

## 5. The two-level compression and its obstruction

Suppose that all levels lie in \(\{0,1\}\), and put

\[
T:=\{i:m_i=1\}.
\]

Since the residues \(c_i\) permute \(0,\ldots,s-1\), their full geometric
sum is

\[
G:=\sum_{i=0}^{s-1}z^{-c_i}
\equiv\frac{z}{2(z-1)}\pmod D.
\tag{15}
\]

Equation \((8)\) is consequently equivalent to

\[
\boxed{
(z-1)\sum_{i\in T}z^{-c_i}
+6d(z-1)-z\equiv0\pmod D.}
\tag{16}
\]

For nonempty \(T\), put \(c_*:=\max_{i\in T}c_i\), and define

\[
S_T(X):=\sum_{i\in T}X^{c_*-c_i}.
\]

The cleared two-level polynomial is

\[
\boxed{
H_{T,d}(X):=
(X-1)S_T(X)
+\left(6d(X-1)-X\right)X^{c_*}.}
\tag{17}
\]

The residue zero belongs only to \(i=0\), while \(m_0=0\). Hence no term
of \(S_T\) comes from residue zero.

If \(c_*\leq s-2\), the coefficient of \(X^{c_*+1}\) is the isolated
integer

\[
6d-1\geq5.
\tag{18}
\]

Hence the weighted coefficient energy of \(H_{T,d}\) is at least \(25\).
If \(c_*=s-1\), reduction modulo \(X^s-2\) leaves constant coefficient

\[
2(6d-1)-1=12d-3\geq9,
\tag{19}
\]

so the energy is at least \(81\). In either case, the sub-three norm margin
from the homogeneous cycle reports is lost before the geometry of \(T\) is
used.

The failure is present even for one shifted index. If its residue is \(c\),
then \((17)\) is

\[
\boxed{
H_{c,d}(X)=
(6d-1)X^{c+1}-6dX^c+X-1.}
\tag{20}
\]

The cycle singleton polynomial had coefficients of absolute value one and
a norm base below three. The inhomogeneous polynomial \((20)\) has an
isolated coefficient at least five. Shorter Euclidean resultants do not
give a uniform replacement under the present bounds, because \(d\) may
grow linearly with \(s\). A fixed-rung norm then contains a factor of the
form \((K d)^{\theta s}\), which cannot be compared with \(D\asymp3^s\)
uniformly in \(d\).

This identifies the precise break in the existing two-level method. It does
not rule out an argument which uses arithmetic information about \(d\)
beyond its size.

## 6. Complete exclusion of the pure Christoffel profile

We now set \(m_i=0\) for every \(i\). Equation \((16)\) with \(T\) empty
reduces to

\[
\boxed{(6d-1)z\equiv6d\pmod D.}
\tag{21}
\]

### 6.1 Coprime slopes

Choose the Bezout coefficient \(v\) in the balanced interval

\[
-\frac s2\leq v\leq\frac s2,
\qquad
us+vN=1.
\tag{22}
\]

The value \(v\) is nonzero. If \(v>0\), then \(u<0\), and \((21)\) gives

\[
D\mid
E_+:=(6d-1)3^v-6d2^{-u}.
\tag{23}
\]

If \(v<0\), then \(u>0\), and

\[
D\mid
E_-:=(6d-1)2^u-6d3^{-v}.
\tag{24}
\]

Neither integer can vanish. Indeed, \(6d-1\) is odd, is not divisible by
three, and is coprime to \(6d\). Equality in either \((23)\) or \((24)\)
would force \(6d-1=1\).

Write

\[
\delta:=N-\alpha s,
\qquad
0<\delta<1.
\]

If \(v>0\), then

\[
2^{-u}=3^v2^{(v\delta-1)/s}<2\cdot3^v.
\]

If \(v<0\), then

\[
2^u=3^{-v}2^{(1-v\delta)/s}<2\cdot3^{-v}.
\]

Since \(d<s\) and \(|v|\leq s/2\), both cases give

\[
0<|E_\pm|<18s3^{s/2}.
\tag{25}
\]

The audited determinant estimate gives

\[
D>\frac{3^s}{459s^{14}}.
\tag{26}
\]

For \(s\geq250\), the exact inequality

\[
3^{s/2}>8262s^{15}
\tag{27}
\]

makes the right side of \((25)\) smaller than \((26)\), contradicting
\((23)\) or \((24)\). Squaring \((27)\), its base case and propagation are

\[
3^{250}>8262^2\,250^{30},
\qquad
251^{30}<3\cdot250^{30}.
\tag{28}
\]

Exact evaluation below the cutoff checks one Christoffel profile at each
\(q_s=2\) weight and every target in \((1)\). Among \(103\) weights, there
are \(64\) coprime slopes and \(2357\) coprime targets, with no divisibility
hit.

### 6.2 Common-divisor slopes

Let

\[
g:=\gcd(N,s)>1,
\qquad
N=gp,
\qquad
s=gq,
\]

and put

\[
X:=2^p,
\qquad
Y:=3^q,
\qquad
J:=\frac{X^g-Y^g}{X-Y}.
\]

The Christoffel word is a \(g\)-fold repetition, so

\[
C=J C_0,
\qquad
D=J(X-Y).
\tag{29}
\]

Moreover, \(\gcd(J,3^s)=1\). Hence

\[
D\mid C-3^sd
\quad\Longrightarrow\quad
J\mid d.
\tag{30}
\]

Since \(p>q\),

\[
J\geq X^{g-1}
\geq2^{(q+1)(g-1)}
>\frac{qg}{2}=\frac s2.
\tag{31}
\]

Equation \((1)\) gives \(d\leq s/2\), contradicting \((30)\). Therefore

\[
\boxed{
\text{No pure Christoffel }b=1\text{ profile satisfies a strict target.}}
\tag{32}
\]

## 7. Proof ledger

The following items are closed.

1. The coprime \(b=1\) branch has the exact deformation congruence \((8)\).
2. Its exact general polynomial and resultant are \((9)\)-\((11)\).
3. The general coefficient-energy route fails quantitatively at \((13)\).
4. The two-level compression is \((16)\)-\((17)\).
5. A nonempty two-level target loses the sub-three norm margin even at
   \(d=1\).
6. The pure Christoffel profile is excluded at every coprime and
   common-divisor slope.

The following items remain open.

1. Exclude \((17)\) for a nonempty shifted set \(T\), using arithmetic
   information about \(d\) rather than a raw coefficient norm.
2. Exclude the multilevel polynomial \((9)\).
3. Develop the corresponding signed block-factor deformation when
   \(\gcd(N,s)>1\) and the word is not Christoffel.

## 8. Assessment

The algebraic Christoffel base family is removed, but the maximal valid
profile is usually the mandatory deformation \(m_i=\varepsilon_i\). The
strict endpoint changes the homogeneous subset
equation by \(6d(z-1)\), and that single term destroys the norm margin which
closed the one-shift and two-shift cycle cases. The surviving \(b=1\) branch
therefore exposes a harder inhomogeneous version of the same multi-shift
core. A successful continuation must control the low target residue \(d\)
jointly with the deformation path, rather than bounding the deformation
polynomial alone.

The accompanying exact arithmetic certificate is
[`inverse/q2_b1_bezout_certificate.js`](inverse/q2_b1_bezout_certificate.js).
