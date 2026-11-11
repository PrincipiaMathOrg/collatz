# The full-cycle quotient inside the binary deformation resultant

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** exact quotient theorem and precise no-go.  When the reduced
cycle denominator is \(q\), the deformation resultant quotient is the norm
of an explicit algebraic integer built from all numerator states:

\[
\left|\operatorname{Norm}(\Omega)\right|
=q^r\frac{|R|}{D}.
\]

Thus \(q=1\) sharpens \(D\mid R\) to
\(|R|/D=|\operatorname{Norm}(\Omega)|\).  The least state controls the
positive real conjugate of \(\Omega\) within absolute constants, but not
the other \(r-1\) conjugates.  The audited state envelope consequently
gives only an exponential bound, not a polynomial bound for \(|R|/D\).
An exact scalable rational family shows that a polynomial scalar bound is
false before imposing \(q=1\) and leastness.  No nontrivial \(q=1\)
counterexample is claimed.

## 1. Algebraic determinant element

Retain the coprime binary one-strip setup

\[
N=\lceil r\log_2 3\rceil,\qquad D=2^N-3^r,\qquad
\gcd(N,r)=1.
\]

Let \(\theta\) be a root of

\[
F(X)=X^r-2
\]

and work in \(\mathcal O=\mathbf Z[\theta]\).  Put

\[
\delta:=\theta^N-3=2\theta^{N-r}-3.
\tag{1}
\]

Since multiplication by \(N\) permutes the \(r\)-th roots of unity,

\[
\boxed{|\operatorname{Norm}(\delta)|=2^N-3^r=D.}
\tag{2}
\]

More precisely,
\(\operatorname{Norm}(\delta)=(-1)^{r+1}D\).

There is also an exact cofactor:

\[
\delta\Delta=D,\qquad
\Delta=\sum_{\ell=0}^{r-1}3^\ell\theta^{N(r-1-\ell)}.
\tag{3}
\]

Equation (3) is just the factorization of
\((\theta^N)^r-3^r=2^N-3^r\).
In particular,

\[
\mathcal O/(\delta)
=\mathbf Z[z]/(z^r-2,z^N-3)
\tag{3a}
\]

is precisely the simultaneous quotient requested in the deformation
argument.  Its additive order is \(D\).  When \(q=1\), equation (10) below
says that \(H\) vanishes in this quotient and records its exact quotient by
the determinant element \(\delta\).

Write

\[
B_j=\left\lfloor\frac{jN}{r}\right\rfloor,\qquad
A_j=B_j-m_j,\qquad
\kappa_j=jN-rA_j=c_j+rm_j,\qquad c_j=[jN]_r.
\tag{4}
\]

Assume \(m_j\in\{0,1\}\), let

\[
\mathcal C=\{c_j:m_j=1\},\qquad c_*=\max\mathcal C,
\]

and define the endpoint polynomial

\[
H(X)=(X-1)\sum_{c\in\mathcal C}X^{c_*-c}-X^{c_*+1}.
\tag{5}
\]

The nonempty-support assumption is harmless here: the Christoffel case is
already excluded separately.

## 2. Exact lift of the endpoint polynomial

Put

\[
W_\theta:=\sum_{j=0}^{r-1}\theta^{-\kappa_j}.
\tag{6}
\]

Because the \(c_j\) permute \(0,\ldots,r-1\),

\[
\sum_{j=0}^{r-1}\theta^{-c_j}
=\sum_{c=0}^{r-1}\theta^{-c}
=\frac{\theta}{2(\theta-1)}.
\]

The binary decomposition
\(W_\theta=\sum_c\theta^{-c}
-\frac12\sum_{c\in\mathcal C}\theta^{-c}\) therefore gives the exact
identity

\[
\boxed{H(\theta)=-2\theta^{c_*}(\theta-1)W_\theta.}
\tag{7}
\]

This is an identity in \(\mathbf Q(\theta)\), not merely a congruence
modulo \(D\).

Let the exact rational cycle states be

\[
x_j=\frac{n_j}{q},
\]

with their common reduced denominator \(q\).  Equivalently,
\(q=D/\gcd(C,D)\), so \(q=1\) is exactly the global condition \(D\mid C\).
The accelerated recurrence is

\[
2^{a_j}x_{j+1}=3x_j+1.
\tag{8}
\]

Set \(v_j=\theta^{-\kappa_j}\).  Since

\[
v_{j+1}=\theta^{ra_j-N}v_j,
\]

equation (8) gives

\[
\theta^N x_{j+1}v_{j+1}=(3x_j+1)v_j.
\]

Summing cyclically yields

\[
\boxed{
W_\theta=\delta\sum_{j=0}^{r-1}x_j\theta^{-\kappa_j}.}
\tag{9}
\]

Combining (7) and (9), define

\[
\boxed{
\Omega:=
q\,\frac{H(\theta)}{\delta}
=-2\theta^{c_*}(\theta-1)
\sum_{j=0}^{r-1}n_j\theta^{-\kappa_j}.}
\tag{10}
\]

The displayed Laurent expression is in fact in \(\mathcal O\).  Indeed,
the \(j\)-th contribution is

\[
-2^{1-m_j}n_j
\left(\theta^{c_*+1-c_j}-\theta^{c_*-c_j}\right).
\tag{11}
\]

If \(c_j\le c_*\), both exponents are nonnegative.  If \(c_j>c_*\), then
\(m_j=0\), and every negative power lies strictly above \(-r\); the factor
two in (11) is removed using
\(2\theta^{-d}=\theta^{r-d}\).  Thus all canonical coefficients are
integers.

Taking norms in (10), and writing

\[
R:=\operatorname{Res}(X^r-2,H),
\]

proves the main theorem:

\[
\boxed{
\left|\operatorname{Norm}(\Omega)\right|
=q^r\frac{|R|}{D}.}
\tag{12}
\]

In particular, for a denominator-one cycle,

\[
\boxed{
\frac{|R|}{D}=|\operatorname{Norm}(\Omega)|
\in\mathbf Z_{>0}.}
\tag{13}
\]

This is the exact information discarded by the earlier use of only
\(D\mid R\).

We can now make the dependence on the full-cycle quotient explicit.  Let

\[
C_0:=0,\qquad C_{j+1}:=3C_j+2^{A_j},
\]

so that \(C_r=C\) and

\[
2^{A_j}x_j=3^jx+C_j.
\]

Put

\[
P:=-2\theta^{c_*}(\theta-1),\qquad
U:=\sum_{j=0}^{r-1}3^j\theta^{-jN},\qquad
V:=\sum_{j=0}^{r-1}C_j\theta^{-jN}.
\tag{13a}
\]

Since \(\theta^{-\kappa_j}=2^{A_j}\theta^{-jN}\), we obtain

\[
\boxed{\Omega=P(xU+V)\qquad(q=1).}
\tag{13b}
\]

The two summands satisfy

\[
\delta U=D\theta^{-N(r-1)},\qquad
\delta V=W_\theta-C\theta^{-N(r-1)}.
\tag{13c}
\]

Thus (13c) recovers \(\delta(xU+V)=W_\theta\) exactly when
\(C=Dx\).  In other words, define the signed norm quotient by

\[
Q_s:=\frac{\operatorname{Norm}(H)}{\operatorname{Norm}(\delta)},
\qquad |Q_s|=\frac{|R|}{D}.
\]

Then \(Q_s\) is the value at \(x\) of the degree-\(r\) rational norm form

\[
\operatorname{Norm}(P(XU+V)).
\tag{13d}
\]

This is an exact dependence on \(x\), but it is not a scalar dependence.
The coefficients other than the leading coefficient retain the full vector
\((C_1,\ldots,C_{r-1})\).  Even the magnitude of the leading coefficient is

\[
\left|\operatorname{Norm}(PU)\right|
=2^{r+c_*}\left(\frac{D}{2^N}\right)^{r-1}.
\tag{13e}
\]

Consequently, writing \(\Pi:=PU\) and \(\Omega_0:=PV\), the only immediate
scalar congruence is the word-dependent relation

\[
Q_s=\operatorname{Norm}(\Omega)
\equiv\operatorname{Norm}(\Omega_0)\pmod{x}.
\tag{13f}
\]

Here we use the signed norm quotient, and the congruence is taken in
\(\mathbf Z[1/2]/x\mathbf Z[1/2]\), which is legitimate because every
integer cycle state is odd.  The right side depends on every prefix carry,
so (13f) is not a residue determined by \(x\) and \(r\) alone.

## 3. What the least state controls

Let

\[
\rho=2^{1/r},\qquad
\lambda=\log\left(\frac{2^N}{3^r}\right)\in(0,\log2),
\qquad n_0=qx_0.
\]

Put

\[
t_j=\frac{2^{A_j}}{3^j},\qquad
\eta=
\frac{\sum_jt_je^{-j\lambda/r}}{\sum_jt_j},\qquad
J_r=\frac{e^\lambda-1}{e^{\lambda/r}-1}.
\]

The exact occupation identity is

\[
\sum_jt_j=3x_0(e^\lambda-1),
\]

while
\(\rho^{-\kappa_j}=t_je^{-j\lambda/r}\).  Evaluation of (10) at the
positive real root gives

\[
\boxed{
|\Omega(\rho)|
=2n_0\rho^{c_*}(\rho-1)J_r\eta.}
\tag{14}
\]

Here

\[
e^{-\lambda}<\eta\le1,\qquad
r\le J_r<2r,\qquad
\frac{2}{3r}<\rho-1\le\frac1r,\qquad
1\le\rho^{c_*}<2.
\]

Consequently

\[
\boxed{
\frac{2n_0}{3}<|\Omega(\rho)|<8n_0.}
\tag{15}
\]

For \(q=1\), the distinguished conjugate is therefore comparable to the
least integer state \(x=x_0\).

This is only one conjugate.  At any other conjugate
\(\theta_\ell=\rho\zeta_\ell\), equation (10) gives

\[
|\Omega(\theta_\ell)|
<12\sum_j n_j
\le12r\max_j n_j.
\tag{16}
\]

For \(q=1\), the audited binary state envelope gives

\[
x_j<2^{m_j}\left(2x+\frac{2j}{3}\right)
\le4x+\frac{4r}{3}.
\tag{17}
\]

Using (15) for the real conjugate and (16)--(17) for the others gives only

\[
\boxed{
\frac{|R|}{D}
<8x\,[16r(3x+r)]^{r-1}.}
\tag{18}
\]

Thus the full-cycle quotient does enter the norm, but the known
\(x<305r^{14.3}\) estimate controls only one factor.  The other
\(r-1\) factors leave an exponential, indeed super-polynomial, upper
bound.  Equation (18) cannot contradict (13).

## 4. No scalar polynomial bound before \(q=1\)

The scaled family from the transition-content no-go makes the limitation
exact.  Its data are

\[
r=256m,\qquad H_m(X)=H_0(X^m),
\]

with

\[
\begin{split}
R_0:=|\operatorname{Res}(Y^{256}-2,H_0(Y))|
={}&4708365355653563911081866377359552639044012876572741956888992577677170101967645821582276774074740448260858568939770910008307867657574825679517635063
\end{split}
\]

and

\[
|\operatorname{Res}(X^{256m}-2,H_m)|=R_0^m,\qquad
\left\lfloor\frac{R_0}{3^{256}}\right\rfloor
=33871072407016426308205564.
\tag{19}
\]

At the infinitely many coprime power-of-two scales, these are exact
positive rational cycles with binary strict-record paths.  Their starting
states obey the same audited polynomial bound

\[
x_0<305r^{14.3},
\]

whereas

\[
\frac{|R_m|}{D_m}>
\left(\frac{R_0}{3^{256}}\right)^m.
\tag{20}
\]

Thus \(|R|/D\) grows exponentially while both \(r\) and \(x_0\) enter only
polynomially.  This family is not denominator one, and its displayed anchor
is not asserted to remain least at every scale.  Therefore it does not
refute a theorem using the full \(q=1\) and leastness hypotheses.  It proves
that neither a scalar \(x\)-bound nor the binary strict-record geometry can
produce such a theorem before the missing arithmetic datum is used.

An actual nontrivial counterexample to a polynomial bound conditioned on
\(q=1\) would itself supply a nontrivial positive integer Collatz cycle.
No such counterexample is claimed.

## 5. Divisibility and congruence assessment

The exact consequence of \(q=1\) is (13): the quotient is an algebraic
norm.  It is automatically odd, since both \(R\) and \(D\) are odd.
The state formula (10) uses all \(r\) states, not only \(x_0\); neither it
nor the multiplication equation

\[
(\theta^N-3)\Omega=H(\theta)
\tag{21}
\]

produces a divisibility by \(x_0\) or a congruence determined by \(x_0\).
Modulo three, for example, \(\delta\equiv2\theta^{N-r}\) is a monomial
unit, so the residue of the norm quotient is determined by the whole
endpoint polynomial.

There is a small exact local test of this obstruction.  At \((r,N)=(5,8)\)
we have \(D=13\).  The two supports

\[
\{2\},\qquad \{1,4\}
\]

give, respectively, the primitive positive strict-record words

\[
(1,2,1,1,3),\qquad(1,1,1,3,2).
\]

Both rational cycles are strict least at the displayed anchor.  Their
carries and signed endpoint resultants are

\[
(C,R)=(287,-37),\qquad(C,R)=(259,-53).
\]

Both carries vanish modulo seven and \(7\nmid D\).  Since \(r\) is odd,
\(Q_s=R/D\) in this example, but

\[
R D^{-1}\equiv2\pmod7,\qquad
R D^{-1}\equiv4\pmod7,
\tag{21a}
\]

respectively.  Thus even the local shadow of \(C=Dx\) does not determine
the quotient residue from the binary strict-record geometry.  Neither
example has \(D\mid C\), so (21a) is not presented as a denominator-one
counterexample.  It isolates exactly why a proof must use the global
divisibility \(D\mid C\), rather than merely reduce closure prime by prime.

Accordingly, the precise surviving question is not whether \(R/D\)
remembers \(x\): it does, through one conjugate of (10).  The missing step
is a \(q=1\)-specific control of the other conjugates, or an arithmetic
restriction on the algebraic integer \(\Omega\) stronger than
integrality and odd norm.

## Conclusion

Tracing the Bezout construction back to \(C=Dx\) produces a clean exact
answer:

\[
\frac{|R|}{D}
=\left|
\operatorname{Norm}\left(
-2\theta^{c_*}(\theta-1)
\sum_jx_j\theta^{-\kappa_j}
\right)\right|
\qquad(q=1).
\]

The positive embedding is between \(2x/3\) and \(8x\).  The current
polynomial state bound does not control the remaining embeddings strongly
enough, and exact rational families show why a scalar polynomial estimate
cannot precede the \(q=1\) arithmetic.  The next viable SOLVE target is
therefore the integral coefficient recurrence in (21), not another raw
coefficient-energy estimate.

Exact regression checks are in
[binary_resultant_quotient_certificate.js](cycles/binary_resultant_quotient_certificate.js).
