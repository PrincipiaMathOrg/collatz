# The full-cylinder rotation-exposure theorem

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** We prove an all-depth full-modulus dichotomy. If the reduced
denominator is larger than one, then at least one cyclic rotation has a
nonzero exposure and a macroscopic cylinder representative. In the binary
height branch, that representative is at least $2^{N-2}$. Conversely, in
the cycle size range, denominator one is equivalent to the vanishing of
every exposure. This does not prove a lower bound for the representative at
the strict-record rotation.

## 1. Rotated carries and cylinders

Let

\[
w=(a_0,\ldots,a_{r-1}),
\qquad
N:=\sum_{i=0}^{r-1}a_i,
\qquad
P:=3^r,
\qquad
M:=2^N,
\qquad
D:=M-P>0.
\tag{1}
\]

For $i\in\mathbf Z/r\mathbf Z$, let $C_i$ be the carry of the rotation

\[
w_i=(a_i,a_{i+1},\ldots,a_{i+r-1}).
\]

The carry rotation identity is

\[
\boxed{2^{a_i}C_{i+1}=3C_i+D.}
\tag{2}
\]

Since $D$ is coprime to $6$, equation (2) shows that

\[
G:=\gcd(C_i,D)
\]

does not depend on $i$. Put

\[
n_i:=\frac{C_i}{G},
\qquad
q:=\frac{D}{G}.
\tag{3}
\]

Then $\gcd(n_i,q)=1$, and (2) becomes the exact rational recurrence

\[
\boxed{2^{a_i}n_{i+1}=3n_i+q.}
\tag{4}
\]

Let $\rho_i$ be the least positive representative modulo $2M$ satisfying

\[
\boxed{P\rho_i+C_i\equiv M\pmod {2M}.}
\tag{5}
\]

Thus $\rho_i$ is the ordinary $3x+1$ cylinder representative of the
rotated word $w_i$. The denominator multiplier congruence gives

\[
\boxed{n_i\equiv q\rho_i\pmod {2M}.}
\tag{6}
\]

Indeed, $Dn_i=qC_i$, and hence

\[
Pn_i+qC_i=Mn_i\equiv M\pmod {2M},
\]

because $n_i$ is odd. Multiplying (5) by the odd number $q$ gives the same
congruence, and $P$ is a unit modulo $2M$. This proves (6).

We now define the multiplier lifts

\[
k_i:=\frac{n_i-q\rho_i}{2M}\in\mathbf Z.
\tag{7}
\]

## 2. The exposure identity

Substitution of (7) into (4) gives

\[
q\bigl(2^{a_i}\rho_{i+1}-3\rho_i-1\bigr)
=2M\bigl(3k_i-2^{a_i}k_{i+1}\bigr).
\tag{8}
\]

Since $\gcd(q,2M)=1$, there is an integer $s_i$ such that

\[
\boxed{
\begin{aligned}
2^{a_i}\rho_{i+1}-3\rho_i-1&=2Ms_i,\\
3k_i-2^{a_i}k_{i+1}&=qs_i.
\end{aligned}}
\tag{9}
\]

We call $s_i$ the cylinder exposure at edge $i$. It records exactly the
full-modulus wrap which prevents the canonical representatives of two
successive rotations from following one ordinary Collatz step.

**Theorem 1, rotation-exposure dichotomy.** The following statements hold.

1. If $q>1$, then $s_i\neq0$ for at least one $i$.
2. If $s_i>0$, then

   \[
   \rho_{i+1}\geq 2^{N+1-a_i}.
   \tag{10}
   \]

3. If $s_i<0$, then

   \[
   \rho_i\geq
   \frac{2^{N+1}+2^{a_i}-1}{3}.
   \tag{11}
   \]

4. Suppose that $q=1$ and $0<n_i<2M$ for every $i$. Then every $s_i=0$,
   and $\rho_i=n_i$ for every $i$.

**Proof.** Suppose first that every $s_i=0$. The first equation in (9) then
gives an exact ordinary recurrence around the full word. Composing its $r$
equations gives

\[
M\rho_0=P\rho_0+C_0.
\]

Therefore $D\rho_0=C_0$, so $D\mid C_0$ and $q=1$. This proves the first
statement.

If $s_i\geq1$, equation (9) gives

\[
2^{a_i}\rho_{i+1}
=3\rho_i+1+2Ms_i
\geq2M,
\]

which proves (10). If $s_i\leq-1$, the same equation gives

\[
3\rho_i+1
=2^{a_i}\rho_{i+1}+2M|s_i|
\geq2^{a_i}+2M.
\]

This proves (11).

Finally, suppose that $q=1$ and $0<n_i<2M$. Both $n_i$ and $\rho_i$ are
the least positive members of the congruence class in (6), so
$n_i=\rho_i$. Thus $k_i=0$, and the second equation in (9) gives $s_i=0$.
The conclusion follows. $\square$

Let

\[
A:=\max_i a_i.
\]

Theorem 1 has the immediate quantitative consequence

\[
\boxed{
q>1
\quad\Longrightarrow\quad
\max_i\rho_i\geq
\min\left\{2^{N+1-A},\frac{2^{N+1}+1}{3}\right\}.}
\tag{12}
\]

In the binary height branch, every letter belongs to $\{1,2,3\}$.
Therefore

\[
\boxed{
q>1
\quad\Longrightarrow\quad
\max_i\rho_i\geq2^{N-2}.}
\tag{13}
\]

No binary-height hypothesis is used in (1) through (12). It enters only in
the specialization $A\leq3$ which gives (13). In particular, (12) also
applies to a multilevel one-drop word, but its terminal letter
$a_{r-1}=U+2$ weakens the first term to $2^{N-U-1}$.

## 3. Equivalence on the cycle range

For a hypothetical denominator-one cycle in the audited one-strip range,
the state estimates give

\[
0<n_i<2M
\]

at every rotation. Thus Theorem 1 gives the exact equivalence

\[
\boxed{
q=1
\quad\Longleftrightarrow\quad
s_i=0\text{ for every }i
\quad\Longleftrightarrow\quad
2^{a_i}\rho_{i+1}=3\rho_i+1\text{ for every }i.}
\tag{14}
\]

This is stronger than the single congruence $x=\rho_0$. Denominator one
removes every cyclic wrap simultaneously. A rational countermodel with
$q>1$ must expose its missing denominator through a macroscopic rotated
cylinder, even when the representative at the strict-record rotation is
small.

## 4. A sharp small-cylinder witness

Consider

\[
w=(1,1,2,3).
\tag{15}
\]

It is primitive, strict-record, one-strip, and binary-height, with

\[
r=4,
\qquad
N=7,
\qquad
(m_0,\ldots,m_4)=(0,0,1,1,0).
\]

Its determinant and rotated carries are

\[
D=47,
\qquad
(C_0,C_1,C_2,C_3)=(73,133,223,179).
\]

Thus $G=1$ and $q=47$. The four full cylinder representatives and
exposures are

\[
(\rho_0,\rho_1,\rho_2,\rho_3)=(7,139,81,189),
\tag{16}
\]

and

\[
(s_0,s_1,s_2,s_3)=(1,-1,2,-2).
\tag{17}
\]

In particular, the strict-record representative is only $7$, but the very
next rotation crosses the full modulus and has representative $139$. This
example proves that smallness of one canonical representative cannot be
propagated through cyclic rotations unless the denominator-one datum is
used.

## 5. What the theorem does not prove

Equation (14) converts the denominator-one hypothesis into a simultaneous
no-exposure condition. It does not force the least state $\rho_0$ to be
large. Once every exposure vanishes, the sequence $(\rho_i)$ is exactly an
ordinary integer cycle, so a lower bound such as

\[
\rho_0\geq\frac{2^{cT}}{r^K}
\]

still requires a new global argument. Theorem 1 rules out a broad family
of countermodels to such an argument: a rational word may have a small
$\rho_0$, but it cannot imitate simultaneous small cylinders at all
rotations.

An exact meet-in-the-middle falsification probe checked every binary-height
profile at $r=28,40,44,48,50$, retaining the full modulus $2^{N+1}$. It
found no violation of $\rho_0>2^T$. This is finite evidence only. The
smallest ratio at $r=28$ is

\[
\frac{93429831}{2^{22}}>22,
\]

while the search at $r=50$ found no ratio below

\[
\frac{1146434089639}{2^{24}}>68332.
\]

The probe is
[cycles/cylinder_transition_mitm_probe.js](cycles/cylinder_transition_mitm_probe.js).

## 6. Exact certificate

The certificate
[cycles/cylinder_rotation_exposure_certificate.js](cycles/cylinder_rotation_exposure_certificate.js)
checks $26{,}184$ binary profiles and $436{,}900$ cyclic rotations through
$r=18$. It verifies (2), (4), (6), and (9), as well as the macroscopic
bounds (10) and (11). It also checks the witness (15) through (17) and
twenty-four repetitions of the trivial zero-exposure cycle.

The theorem itself is all-depth and follows from the displayed identities.
The enumeration is an exact regression, not a substitute for the proof.

## Conclusion

The full $2^{N+1}$-cylinder contains a rigid global signal which is absent
from low-bit arguments. A missing denominator cannot remain locally
hidden: it creates a macroscopic exposure at some cyclic rotation. The
surviving problem is narrower. One must show that a primitive strict-record
word cannot make every exposure vanish while all of its integer states
remain polynomially small.
