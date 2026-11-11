# Full binary--ternary boundary winding for cycle words

**Date:** 26 August 2026  
**Target:** `OPEN-CYCLE-INT-01`  
**Mode:** CALCULATE, followed by an exact algebraic reduction  
**Status:** the boundary-winding identities below are proved; strict positive winding remains open and is now known to be equivalent to First-Crossing Descent, hence to Terras's Coefficient Stopping Time conjecture

## 1. Setup

Let

\[
a=(a_0,\ldots,a_{r-1}),
\qquad
A_i:=\sum_{j<i}a_j,
\qquad
A:=A_r,
\]

be a positive valuation word. Put

\[
M:=2^A,
\qquad
R:=3^r,
\qquad
D:=M-R,
\qquad
C:=\sum_{j=0}^{r-1}3^{r-1-j}2^{A_j}.
\]

We work in the one-strip range \(R<M<2R\). For the least-state
rotation of a hypothetical nontrivial cycle, the existing cycle reduction
also gives

\[
a_0=1,
\qquad
2^{A-A_i}>3^{r-i}\quad(0<i<r),
\qquad
A=\lceil r\log_2 3\rceil.
\]

We call the middle inequalities the strict-record inequalities. The cycle
integrality gate is

\[
D\nmid C.
\]

Define the full dyadic boundary representative

\[
\rho:=[-CR^{-1}]_M,
\qquad 0\leq \rho<M,
\]

and the full ternary boundary representative

\[
t:=[CM^{-1}]_R,
\qquad 0\leq t<R.
\]

Finally, define the endpoint of the canonical dyadic lift by

\[
Z:=\frac{R\rho+C}{M}.
\]

The congruence defining \(\rho\) makes \(Z\) an integer. The first lemma
identifies it with the ternary representative without discarding any
modulus.

## 2. The canonical endpoint is the ternary boundary point

**Lemma 2.1.** For every positive valuation word,

\[
0<Z<R
\qquad\text{and}\qquad
Z=t.
\]

**Proof.** Expand the accelerated word into its ordinary shortcut parity
word of length \(A\). Its ones occur at positions
\(A_0,A_1,\ldots,A_{r-1}\). The corresponding parity cylinder is one
residue class modulo \(M\), and its representative in \([0,M)\) is
precisely \(\rho\). Let \(x_j\) be the ordinary shortcut trajectory from
\(x_0=\rho\), and let \(s_j\) be the number of odd shortcut steps among
the first \(j\) steps. Thus \(s_0=0\), \(s_A=r\), and \(x_A=Z\).

Set

\[
G_j:=3^{s_j}2^{A-j},
\qquad
m_j:=G_j-x_j.
\]

Since \(0<\rho<M\), we have \(m_0=M-\rho>0\). At an even shortcut step,

\[
m_{j+1}=\frac{m_j}{2},
\]

while at an odd shortcut step,

\[
m_{j+1}=\frac{3m_j-1}{2}.
\]

Both recurrences preserve positivity on their actual integral parity
class. Hence

\[
R-Z=G_A-x_A=m_A>0.
\]

The trajectory is positive, so \(Z>0\). Moreover,

\[
MZ=R\rho+C
\]

gives \(Z\equiv CM^{-1}\pmod R\). The bounds \(0<Z<R\) now imply
\(Z=t\). \(\square\)

The quantities \(m_j\) form an exact positive \(3m-1\) shadow of the
ordinary shortcut segment. In particular, the equality \(Z=t\) is not a
numerical coincidence and does not require the strict-record hypothesis.

## 3. The boundary-winding identity

Let

\[
g:=\gcd(C,D),
\qquad
q:=\frac{D}{g},
\qquad
n:=\frac{C}{g}.
\]

Thus \(\gcd(n,q)=1\), and \(q\) is the reduced denominator of the rational
cycle defined by the word.

**Theorem 3.1 (full boundary winding).** The integer

\[
\kappa:=\frac{q\rho-n}{M}
\]

is well defined and satisfies

\[
\rho-Z=g\kappa.
\]

If \(q>1\), then

\[
\kappa M\equiv-n\pmod q,
\qquad
\gcd(\kappa,q)=1,
\]

and consequently

\[
\gcd(\rho-Z,D)=g.
\]

**Proof.** Since \(D=M-R\), the endpoint identity gives

\[
C-D\rho
=C-(M-R)\rho
=M(Z-\rho).
\]

After division by \(g\), this becomes

\[
q\rho-n=M\frac{\rho-Z}{g}.
\]

It proves both the integrality of \(\kappa\) and the identity
\(\rho-Z=g\kappa\). Reducing \(q\rho-n=M\kappa\) modulo \(q\) yields
\(M\kappa\equiv-n\pmod q\). The number \(q\) is odd, so \(M\) is a unit
modulo \(q\). Since \(n\) is also a unit modulo \(q\), so is \(\kappa\).
Therefore

\[
\gcd(\rho-Z,D)
=g\gcd(\kappa,q)
=g.
\]

This proves the theorem. \(\square\)

The theorem uses both full moduli simultaneously. It is therefore a
\(q=1\)-sensitive reformulation, unlike the rotation, prime-projection, and
Smith-normal-form tests that collapse to the single class \(C\bmod D\).

## 4. Exact relation to the cycle-integrality gate

The equality \(\kappa=0\) is equivalent to

\[
\rho=Z
\qquad\Longleftrightarrow\qquad
C=D\rho.
\]

Thus a boundary collision is exactly an integral fixed point at the
canonical dyadic lift. The implication from collision to \(D\mid C\) is
unconditional.

Conversely, \(D\mid C\) gives an integer fixed point \(x=C/D\), but in
general it could be a higher lift of \(\rho\). For the audited cycle
regime this ambiguity disappears: the existing linear-form estimate gives

\[
x<305r^{14.3}<2^r\leq M.
\]

Hence \(x=\rho\), and in that regime

\[
D\mid C
\quad\Longleftrightarrow\quad
q=1
\quad\Longleftrightarrow\quad
\kappa=0.
\]

This is an exact reformulation of `OPEN-CYCLE-INT-01`, not a proof of it.

## 5. Strict positive boundary winding

The computations suggest the following stronger statement.

**Conjecture 5.1 (strict positive boundary winding).** Let \(a\) be a
nontrivial primitive word satisfying

\[
a_0=1,
\qquad
A=\lceil r\log_2 3\rceil,
\qquad
2^{A-A_i}>3^{r-i}\quad(0<i<r).
\]

Then

\[
\boxed{\kappa>0,}
\]

or equivalently

\[
\boxed{\rho>Z.}
\]

This conjecture is strictly stronger than noncollision. Its proof would
close the cycle-integrality gate and therefore exclude every nontrivial
positive cycle after the existing reduction. It does not address divergent
orbits.

The strict-record hypothesis is genuine. Among anchored one-strip words
without strict records,

\[
(1,1,2,3,1)
\]

has \(\rho=7\) and \(Z=t=8\). This is the familiar paradoxical shortcut
block from \(7\) to \(8\), and it has negative boundary winding.

## 6. Negative winding produces a minimum-start paradox

For each cyclic rotation, let \(p_i/q\) be the corresponding state of the
reduced rational \(3x+q\) cycle. Thus

\[
2^{a_i}p_{i+1}=3p_i+q.
\]

The strict-record rotation is characterized by

\[
p_i>p_0\quad(0<i<r).
\]

Let \(y_i\) be the odd states of the canonical integer shortcut segment
from \(y_0=\rho\) to \(y_r=Z\).

**Proposition 6.1.** Suppose \(p_0\) is the strict minimum among the
rational rotations. If \(\kappa<0\), then

\[
\rho=y_0<y_i\quad(0<i\leq r),
\qquad
Z>\rho.
\]

Hence the canonical segment is paradoxical and begins at its strict
minimum.

**Proof.** Put \(x:=p_0/q\). Negative winding gives

\[
x-\rho=-\frac{M\kappa}{q}>0.
\]

The rational cycle and the canonical integer segment follow the same
affine branches. Therefore, at the \(i\)-th odd boundary,

\[
\frac{p_i}{q}-y_i
=\frac{3^i}{2^{A_i}}(x-\rho).
\]

If \(3^i\leq2^{A_i}\), strict rational minimality gives

\[
y_i
=\frac{p_i}{q}-\frac{3^i}{2^{A_i}}(x-\rho)
>x-(x-\rho)
=\rho.
\]

If \(3^i>2^{A_i}\), the positive affine prefix carry \(C_i\) gives

\[
y_i-\rho
=\frac{(3^i-2^{A_i})\rho+C_i}{2^{A_i}}
>0.
\]

Finally, \(\kappa<0\) is itself equivalent to \(Z>\rho\). \(\square\)

Rozier and Terracol call a coefficient-contractive segment with endpoint
at least its start paradoxical. One equivalent form of Terras's
coefficient-stopping-time conjecture says that the first term of a
paradoxical segment is never its smallest term. Proposition 6.1 shows that
negative winding at a strict rational minimum would violate exactly this
formulation. This bridge explains the observed sign, but it does not prove
it. The converse reduction below shows that the all-depth statements are in
fact equivalent.

The converse reduction is proved in
[`cycle_full_boundary_winding_attack_2026-08-26.md`](cycle_full_boundary_winding_attack_2026-08-26.md).
Every nonpositive strict winding, cut at its first coefficient crossing,
produces a canonical First-Crossing Descent counterexample. Conversely,
every nontrivial coefficient first-crossing word compresses to a primitive
word satisfying the hypotheses of Conjecture 5.1. Hence the two all-depth
statements are equivalent.

For example, the negative word \((1,1,2,3,1)\) has rational numerator
\(347\) over denominator \(13\). It is not the least rational rotation.
The least rotation is \((1,1,1,2,3)\), with numerator \(227\) and positive
winding \(\kappa=8\).

There is also a useful unconditional size restriction on a hypothetical
negative winding.

**Proposition 6.2.** Under the hypotheses of Proposition 6.1, write
\(\kappa=-h<0\). Then

\[
1\leq h<\frac r3.
\]

**Proof.** The rational cycle product is

\[
\frac MR
=\prod_{i=0}^{r-1}\left(1+\frac{q}{3p_i}\right).
\]

Since \(p_0\) is the strict minimum,

\[
\left(\frac MR\right)^{1/r}
<1+\frac{q}{3p_0}.
\]

Negative winding gives \(p_0=q\rho+hM>hM\), while \(q\leq D\). If
\(\Lambda:=\log(M/R)\), then

\[
h
<\frac{D}{3M(e^{\Lambda/r}-1)}
=\frac{1-e^{-\Lambda}}{3(e^{\Lambda/r}-1)}
<\frac r3.
\]

The last inequality uses \(1-e^{-\Lambda}<\Lambda\) and
\(e^{\Lambda/r}-1>\Lambda/r\). \(\square\)

This reduces a negative winding to a small integer lift index. It does not
exclude one, and it gives no contradiction at the boundary \(\kappa=0\).

## 7. Exact falsification audit

The exhaustive program

```text
node agent-code/collatz-research/cycles/full_boundary_collision_probe.js 20 1
```

enumerates every primitive anchored strict-record word through \(r=20\).
It checks the full-modulus identities above and compares \(\rho\) with
\(Z=t\). The search contains \(16,781,703\) primitive strict-record words.
It finds

\[
\#\{\rho<Z\}=0,
\qquad
\#\{\rho=Z\}=0.
\]

At the last three lengths the primitive counts are

\[
1,428,895\quad(r=18),
\qquad
6,458,554\quad(r=19),
\qquad
8,199,379\quad(r=20).
\]

The smallest observed winding index is \(\kappa=1\). At \(r=17\), one
such denominator-five word is

\[
(1,1,1,1,1,2,1,1,2,1,2,3,2,1,1,1,5),
\]

for which \(q=5\) and \(\rho-Z=g=1,015,513\). The globally nearest
nontrivial boundary pair through \(r=17\) is the word \((1,2,2)\), with

\[
q=5,
\qquad
\rho=11,
\qquad
Z=10,
\qquad
\kappa=1.
\]

The deterministic randomized program

```text
node agent-code/collatz-research/cycles/full_boundary_collision_random.js 2000
```

tests 2,000 independently generated strict-record words at each of

\[
r=18,20,25,30,40,50,75,100,150,250,500.
\]

All 22,000 strict-record samples have positive winding. The separate
exhaustive anchored scan supplies the negative \(r=5\) regressions above;
the high-length loose random samples in this program happened to remain
positive and are not claimed as evidence for a loose-word sign law.

These are finite falsification results only. They are evidence for
Conjecture 5.1, not an all-depth proof.

## 8. Next exact gate

The next task is to prove that strict suffix records force \(\kappa>0\).
One promising local coordinate is an admissible unit move of a carry digit.
If \(C' = C+u\), define

\[
L:=[uR^{-1}]_M,
\qquad
K:=\frac{RL-u}{M},
\qquad
V:=L-K=\frac{DL+u}{M}.
\]

If \(\chi:=\mathbf 1_{\rho<L}\), then positivity of both canonical
shortcut segments synchronizes the boundary wraps:

\[
\chi=\mathbf 1_{Z<K}.
\]

Consequently

\[
\rho'=\rho-L+\chi M,
\qquad
Z'=Z-K+\chi R,
\]

and, with \(\delta:=\rho-Z\),

\[
\boxed{\delta'=\delta-V+\chi D.}
\]

Thus ordinary monotonicity is false. Exact enumeration through \(r=15\)
finds both increasing and decreasing edges. Among 602,873 audited edges,
none crosses zero. If \(0<\delta<D\), the desired local propagation law is

\[
\chi=\mathbf 1_{\delta<V},
\]

because it makes \(\delta'\) the nonzero reduced residue of
\(\delta-V\pmod D\). Proving this wrap law on the strict-record lattice,
or finding its first counterexample, is the next localized task. The loose
word \((1,1,2,3,1)\) is the mandatory regression for any proposed proof.

No sign theorem is claimed here. The proved advance is the full-modulus
boundary-winding identity and the localization of denominator one to the
single equality \(\kappa=0\).
