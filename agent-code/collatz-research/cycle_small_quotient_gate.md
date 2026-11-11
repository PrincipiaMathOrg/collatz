# The small-quotient transition gate for one-strip cycles

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** an exponential lower bound for the rational fixed point
\(C/D\) is false, even in the binary transition-dense class. The exact
denominator-one datum instead identifies \(C/D\) with one standard
\(3x+1\) cylinder representative. This cylinder alignment is the sharp
remaining gate. Exact scans support, but do not prove, an exponential lower
bound for that representative.

## 1. Setup

Let

\[
N:=\lceil r\log_2 3\rceil,
\qquad
P:=3^r,
\qquad
M:=2^N,
\qquad
D:=M-P.
\tag{1}
\]

For a positive accelerated word \(w=(a_0,\ldots,a_{r-1})\), put

\[
A_j:=\sum_{i<j}a_i,
\qquad
C:=\sum_{j=0}^{r-1}3^{r-1-j}2^{A_j}.
\tag{2}
\]

We retain primitivity, the one-strip condition, and the strict suffix
records. Write the reduced rational fixed point as

\[
\frac CD=\frac nq,
\qquad
G:=\gcd(C,D),
\qquad
n:=\frac CG,
\qquad
q:=\frac DG.
\tag{3}
\]

The denominator-one case is \(q=1\), in which case the least cycle state is

\[
x=\frac CD\in\mathbf Z_{>0}.
\tag{4}
\]

The linear-form estimate gives

\[
x<305r^{14.3}.
\tag{5}
\]

In the binary-height branch, the transition entropy theorem gives
\(T>r/193\) above the established period barrier. We test whether transition
complexity can force an opposing exponential lower bound.

## 2. A transition-dense binary rational family

Put

\[
B_j:=\left\lfloor\frac{jN}{r}\right\rfloor,
\qquad
g_j:=B_{j+1}-B_j\in\{1,2\},
\qquad
e:=N-r.
\tag{6}
\]

Let

\[
E_r:=\{1\leq j\leq r-1:g_{j-1}=2\}
=\{v_1<v_2<\cdots<v_{e-1}\}.
\tag{7}
\]

The cardinality follows from

\[
B_{r-1}=N-2.
\]

Define a binary height path by

\[
m_{v_1}=m_{v_3}=m_{v_5}=\cdots=1,
\qquad
m_j=0\quad\text{otherwise},
\tag{8}
\]

with \(m_0=m_r=0\), and define

\[
A_j:=B_j-m_j,
\qquad
a_j:=g_j+m_j-m_{j+1}.
\tag{9}
\]

The selected vertices are pairwise nonadjacent. Every rise crosses a gap
\(g_j=2\), so its exponent is one, while every other exponent in (9) is
positive. Thus (8) is an admissible binary profile. Its support and
transition count are

\[
k=\left\lceil\frac{e-1}{2}\right\rceil,
\qquad
\boxed{T=2k\geq e-1.}
\tag{10}
\]

If \(\alpha:=\log_2 3\) and \(\delta:=N-r\alpha\), then, for \(j<r\),

\[
B_j
\leq\frac{jN}{r}
=j\alpha+\frac{j\delta}{r}
<j\alpha+\delta
=N-(r-j)\alpha.
\]

Therefore every profile in (8) satisfies all strict suffix records. If \(r\)
is prime, then \(\gcd(N,r)=1\). A proper power would force its repetition
number to divide both \(N\) and \(r\), so the word is primitive. There are
therefore infinitely many primitive members.

Put

\[
R:=\frac{2^N}{3^r},
\qquad
\omega_j:=2^{B_j-j\alpha},
\qquad
W:=\sum_{j=0}^{r-1}\omega_j2^{-m_j}.
\tag{11}
\]

The exact global fixed-point identity is

\[
\boxed{\frac CD=\frac{W}{3(R-1)}.}
\tag{12}
\]

Since \(1/2<\omega_j<2\) and \(m_j\in\{0,1\}\), we have

\[
\frac r4<W<2r.
\tag{13}
\]

The lower bound

\[
\log R>e^{-6.125581}r^{-13.3}
\]

and \(R-1>\log R\) consequently give

\[
\boxed{
0<\frac CD<\frac23e^{6.125581}r^{14.3}<305r^{14.3}.}
\tag{14}
\]

On the other hand,

\[
\frac Tr\longrightarrow\log_2 3-1>0.
\tag{15}
\]

Every positive word with \(D>0\) gives an exact positive rational
\(3n+q\) cycle after reduction by \(G\). Hence (8) is an infinite family of
primitive exact rational cycles at prime lengths.

**Theorem 1, rational fixed-point no-go.** Fix \(c>0\) and \(K\geq0\).
No inequality of the form

\[
\frac CD\geq\frac{2^{cT}}{r^K}
\tag{16}
\]

follows from primitivity, positivity, exact rational valuations, the
one-strip condition, strict records, and binary transition complexity.

**Proof.** Along the prime members of (8), equations (10) and (15) make the
right side of (16) exponential in \(r\), while (14) makes its left side
polynomial. \(\square\)

The same family refutes an exponential lower bound in the shifted support,
since \(k\) is linear in \(r\). Thus transition or support complexity does
not make the real quotient \(C/D\) large.

## 3. Exact cylinder alignment

The preceding theorem does not refute an argument which uses \(q=1\). We
now identify exactly what that condition adds.

Let \(\rho_w\) be the least positive residue modulo \(2^{N+1}\) satisfying

\[
\boxed{3^r\rho_w+C\equiv2^N\pmod {2^{N+1}}.}
\tag{17}
\]

This is the canonical odd \(3x+1\) cylinder representative of \(w\).

**Lemma 2, denominator multiplier.** With the reduced fixed point in (3),

\[
\boxed{n\equiv q\rho_w\pmod {2^{N+1}}.}
\tag{18}
\]

**Proof.** The identity \(Dn=qC\) gives

\[
3^rn+qC=2^Nn.
\]

Both \(n\) and \(q\) are odd. Thus, modulo \(2^{N+1}\),

\[
3^rn+qC\equiv2^N,
\qquad
q2^N\equiv2^N.
\]

Multiplying (17) by \(q\) now gives the same congruence for \(q\rho_w\).
Since \(3^r\) is a unit, (18) follows. \(\square\)

For a hypothetical denominator-one cycle, \(q=1\) and \(n=x\). The period
barrier is larger than \(200\), and the established inequality

\[
2^r>1830r^{15}
\]

therefore gives

\[
0<x<305r^{14.3}<2^{N+1}.
\]

Equation (18) consequently becomes the integer identity

\[
\boxed{q=1\quad\Longrightarrow\quad x=\rho_w.}
\tag{19}

\]

This is the sharp small-quotient datum. For \(q>1\), the multiplier in
(18) can wrap around the full cylinder modulus. For \(q=1\), no multiplier
or wrap remains.

## 4. An exact denominator audit

The family

\[
w_r=(1^{r-1},e+1)
\tag{20}
\]

gives a useful audit outside the binary-height subclass. It is primitive,
strict-record, one-strip, and has

\[
T=e,
\qquad
C=3^r-2^r,
\qquad
\frac CD<305r^{14.3}.
\tag{21}
\]

Let \(G:=\gcd(C,D)\). Since

\[
C+D=2^r(2^e-1)
\]

and \(G\) is odd, we have \(G\mid2^e-1\). Therefore its reduced denominator
satisfies

\[
\boxed{
q=\frac DG
>\frac{e^{-6.125581}}2\frac{2^r}{r^{13.3}}.}
\tag{22}

\]

Thus a transition-dense rational word can have a polynomial fixed point
while its missing cylinder multiplier is exponentially large. Equation
(22) quantifies why a real estimate for \(C/D\) cannot approximate the
denominator-one gate.

## 5. Exact scan and the remaining lemma

The accompanying certificate exhausts every binary height path satisfying
the strict-record and positivity constraints for

\[
3\leq r\leq20.
\]

It checks \(84{,}504\) profiles, of which \(84{,}332\) are primitive. It
finds no denominator-one word. For every nonconstant profile in this finite
range, it also finds

\[
\rho_w>2^T.
\tag{23}

\]

Equation (23) is finite evidence only. The same scan actively finds small
rational fixed points. For example,

\[
w=(1,1,2,1,2,1,2,2,1,2,1,2,1,2,2,1,2,1,2,3)
\tag{24}

\]

has

\[
r=20,
\qquad
N=32,
\qquad
T=6,
\]

and

\[
\begin{aligned}
D&=808182895,\\
C&=11591504489,\\
\gcd(C,D)&=1,\\
\rho_w&=2809238183.
\end{aligned}
\tag{25}

\]

Hence

\[
\frac CD<2^T<\rho_w.
\tag{26}

\]

This single exact word displays the whole obstruction. The rational fixed
point is small, the ordinary cylinder representative is large, and the
denominator multiplier in (18) separates them.

An admissible carry move changes \(C\) by a unit times a power of two. By
(17), the corresponding cylinder move is

\[
\rho_{w'}-\rho_w
\equiv-3^{-r}(C'-C)pmod {2^{N+1}}.
\tag{27}

\]

This move can wrap through zero, so neither carry order nor height order
makes \(\rho_w\) monotone. Transition entropy counts distinct factors, but
does not locate their representatives in the ordered interval
\([1,2^{N+1})\).

The only viable exponential statement left by this audit is a genuinely
arithmetic lemma of the following form:

\[
\boxed{
q=1\text{ and the strict-record hypotheses}
\quad\Longrightarrow\quad
\rho_w\geq\frac{2^{cT}}{r^K}}
\tag{28}

\]

for some absolute \(c>0\) and \(K\). By (19), such a lemma would contradict
(5) together with \(T>r/193\), and would therefore exclude the binary cycle
branch. No proof of (28) is obtained here.

## 6. Proof ledger

The following statements are proved.

1. Transition density and support density do not force exponential growth
   of the rational fixed point \(C/D\), even for primitive binary profiles.
2. The reduced numerator and the ordinary cylinder representative satisfy
   the exact multiplier congruence (18).
3. Denominator one and the P7 bound identify the cycle state with the least
   ordinary cylinder representative, as in (19).
4. A concrete rational family has an exponentially large missing
   denominator, as in (22).
5. Exact enumeration through \(r=20\) finds no counterexample to
   \(\rho_w>2^T\), but this is not an all-depth theorem.

The proposed exponential lower bound for \(C/D\) is therefore false. The
remaining problem is not Archimedean. It is to use the full divisibility
\(D\mid C\), equivalently \(q=1\), to prevent the modular wrapping in
(18) and (27).

The exact checker is
[`cycles/small_quotient_transition_gate.js`](cycles/small_quotient_transition_gate.js).
