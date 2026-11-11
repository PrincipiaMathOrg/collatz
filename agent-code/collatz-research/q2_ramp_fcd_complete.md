# The \(q=2\) ramp-plus-one-drop family is FCD at every depth

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** complete for the formal family described below.  This does not
prove FCD for every \(q=2,b=1\) word.

## 1. Statement

Put

\[
\alpha=\log _2 3,\qquad
N=\lceil\alpha s\rceil,\qquad
P=3^s,\qquad M=2^N,\qquad D=M-P,\qquad e=N-s.
\tag{1}
\]

Assume that \(s\geq3\) is a \(q=2\) weight,

\[
N-\lceil (s-1)\alpha\rceil=1.
\tag{2}
\]

Consider the ramp-plus-one-drop profile

\[
A_i=i\quad(0\leq i\leq s-2),qquad A_{s-1}=N-2,
\tag{3}
\]

whose terminal accelerated description is

\[
a=(1^{s-2},e,2).
\tag{4}
\]

Its anchored carry is

\[
C=P+\frac M4-3\cdot2^{s-1}.
\tag{5}
\]

**Theorem.**  The canonical length-\(N\) seed \(\rho\in[0,M)\) and its
endpoint \(Z=(P\rho+C)/M\) satisfy

\[
\boxed{Z<\rho}
\tag{6}
\]

at every \(q=2\) weight for which the profile is defined.  In particular,
the anchored ramp family isolated by the corner-flux obstruction contains
no FCD failure.  The formal small boundary word at \(s=3\) also satisfies
strict descent.

## 2. Canonical seed and endpoint

For every \(q=2\) weight in this family, \(e\geq2\).  Define the least positive
residue

\[
u=\left[(6-2^e)P^{-1}\right]_{2^{e+2}},
\qquad 1\leq u<2^{e+2}.
\tag{7}
\]

The residue is nonzero: \(v_2(6-2^e)=1\) for \(e\geq2\).  The cylinder
congruence \(P\rho+C\equiv0\pmod M\), together with (5), gives

\[
P(\rho+1)
\equiv 2^{s-2}(6-2^e)\pmod {2^{s+e}}.
\tag{8}
\]

Since \(P\) is odd, division by \(2^{s-2}\) in (8) proves the exact formula

\[
\boxed{\rho=2^{s-2}u-1.}
\tag{9}
\]

Substitution into the affine endpoint identity gives

\[
\boxed{
Z=\frac{Pu+2^e-6}{2^{e+2}}.}
\tag{10}
\]

The integrality in (10) is precisely (7).

There is a minor endpoint convention worth making explicit.  The length-\(N\)
parity cylinder fixes \(\rho\) modulo \(M\), but it does not fix the parity at
time \(N\).  If the notation in (4) is required to mean that the final
valuation is exactly two, rather than at least two, take the unique

\[
\widehat u\in(0,2^{e+3})
\quad\text{such that}\quad
\boxed{P\widehat u\equiv6+3\cdot2^e\pmod {2^{e+3}}.}
\tag{11}
\]

Reducing (11) modulo \(2^{e+2}\) gives (7), because
\(3\cdot2^e\equiv-2^e\pmod {2^{e+2}}\).  Consequently

\[
\widehat u\in\{u,u+2^{e+2}\},qquad
\widehat\rho=2^{s-2}\widehat u-1\in\{\rho,\rho+M\}.
\tag{12}
\]

After the first \(s-2\) accelerated steps,

\[
x_{s-2}=3^{s-2}\widehat u-1.
\tag{13}
\]

Equation (11), divided by \(3\), says

\[
3^{s-1}\widehat u-2\equiv2^e\pmod {2^{e+3}}.
\tag{14}
\]

Thus the next quotient is \(1\pmod8\): the penultimate valuation is exactly
\(e\), the last valuation is exactly \(2\), and the endpoint is odd.  This
extra lift is useful for accelerated notation, but the FCD assertion itself
concerns the canonical representative (9).

## 3. The descent identity

Equations (9) and (10) telescope without an estimate:

\[
\begin{aligned}
2^{e+2}(Z-\rho)
&=Pu+2^e-6-2^{e+2}(2^{s-2}u-1)\\
&=Pu+5\cdot2^e-6-Mu\\
&=5\cdot2^e-6-Du.
\end{aligned}
\tag{15}
\]

Hence

\[
\boxed{
2^{e+2}(\rho-Z)=Du-(5\cdot2^e-6).}
\tag{16}
\]

In particular, because \(u\geq1\), the determinant inequality

\[
D>5\cdot2^e-6
\tag{17}
\]

implies strict FCD for the whole family, independently of the cylinder
congruence.

## 4. The determinant inequality at every depth

The exact finite check gives (17) at every \(q=2\) weight

\[
8\leq s\leq127.
\tag{18}
\]

Its least excess is

\[
D-(5\cdot2^e-6)=1477
\quad\text{at }s=8.
\tag{19}
\]

For the tail, use the audited logarithmic-form estimate in its weakened
rational form

\[
\frac DP>\frac1{459s^{14}}.
\tag{20}
\]

Here \(e^{6.125581}<459\) is certified by an exact Taylor remainder.  Since
\(M<2P\),

\[
5\cdot2^e=5\frac{M}{2^s}<\frac{10P}{2^s}.
\tag{21}
\]

Therefore (17) follows from

\[
2^s>4590s^{14}.
\tag{22}
\]

At \(s=128\), (22) reduces to \(2^{30}>4590\).  Moreover,
\(2s^{14}>(s+1)^{14}\) at \(s=128\), and the ratio
\((1+1/s)^{14}\) decreases with \(s\).  Thus (22) propagates to every
\(s\geq128\).  This proves (17) throughout the infinite tail.

Only the two small \(q=2\) weights precede (18).  Direct substitution in
(16) gives

\[
\begin{array}{c|c|c|c|c|c|c}
s&N&e&D&u&\rho&Z\\ \hline
3&5&2&5&6&11&10\\
5&8&3&13&10&79&76
\end{array}
\tag{23}
\]

Both descend strictly.  The first row is the formal short boundary profile;
the anchored ramp family used in the dense-corner construction starts with
the second row.  Combining (16)--(23) proves the theorem.

## 5. Certificate and scope

The exact checker
[`inverse/q2_ramp_fcd_certificate.js`](inverse/q2_ramp_fcd_certificate.js)

1. enumerates the \(52\) \(q=2\) weights through \(s=127\) by integer bit
   lengths;
2. reconstructs (7)--(10) from the carry and independently from the modular
   inverse defining the canonical seed;
3. constructs the exact lift (11), executes every accelerated step, and
   checks the valuations \((1^{s-2},e,2)\);
4. verifies the gap identity (15) and strict descent;
5. finds exactly the two determinant exceptions in (23); and
6. checks the exact Taylor and integer inequalities used in the infinite
   tail.

The result removes the sharp \(T=\Theta(s)\), one-corner obstruction itself.
It does not turn transition density into a general corner theorem, and it
does not exclude other \(q=2,b=1\) profiles.
