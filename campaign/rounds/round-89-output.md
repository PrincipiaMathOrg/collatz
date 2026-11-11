model: GPT-5.6 Pro (Chat mode)
round: 89 -- approach 84, Benford rigidity for every infinite orbit
front: proof
sent: 2026-08-17T08:22Z
worked: 54m 50s

---

# Benford rigidity for Collatz orbits: what the approach actually proves

Carrying this strategy through does **not** produce a full proof of the Collatz conjecture. It produces a strong pointwise theorem that appears at first to be the desired first step:

> **Every non-eventually-periodic positive Collatz orbit is automatically strongly Benford in base \(2\) along its odd iterates.**

The difficulty is structural rather than merely technical. The affine carry terms do not conflict with this Benford law. They become a vanishing perturbation of an irrational rotation and therefore **cause** the Benford behavior. Moreover, arbitrarily long exact positive-integer Collatz segments can simultaneously have:

- exact valuation and affine-carry compatibility;
- multiplicative coefficient at least \(1\) at every prefix;
- all odd iterates above the starting value;
- asymptotically perfect binary Benford statistics.

Thus the proposed second implication—“Benford rigidity plus carries contradicts sustained growth”—fails in its natural finite-prefix and logarithmic forms. The missing theorem is instead a statement about the **least significant bits** of every orbit, specifically a three-bit distribution inequality modulo \(8\). I prove below that this would exclude every divergent orbit, but a separate cycle-exclusion theorem would still be required.

The distinction is consistent with the established literature. Lagarias and Soundararajan prove a finite-horizon, almost-every-seed Benford theorem, with an exceptional set depending on the horizon; Kontorovich and Miller obtain a double-limit result for normalized ratios rather than a pointwise theorem for one actual orbit. citeturn544839view1turn544839view3 Tao’s almost-all theorem similarly concerns logarithmic-density almost all starting values, not every individual orbit. citeturn188849search0

---

## 1. Accelerated odd dynamics

Let

\[
U(n)=\frac{3n+1}{2^{v_2(3n+1)}}
\]

be the accelerated Collatz map on the positive odd integers. Given an odd starting value \(n_0\), write

\[
n_{j+1}=U(n_j),\qquad
a_j=v_2(3n_j+1),
\]

and define

\[
A_j=\sum_{i=0}^{j-1}a_i,
\qquad A_0=0.
\]

Let

\[
\alpha=\log_2 3.
\]

The exact logarithmic recurrence is

\[
\log_2 n_{j+1}
=
\log_2 n_j+\alpha-a_j+\delta_j,
\tag{1}
\]

where

\[
\delta_j
=
\log_2\left(1+\frac1{3n_j}\right)>0.
\tag{2}
\]

Suppose that the orbit is not eventually periodic. Since \(U\) is deterministic, the values \(n_j\) are then all distinct. A sequence of distinct positive integers eventually leaves every finite set, and therefore

\[
n_j\longrightarrow\infty.
\tag{3}
\]

Consequently,

\[
\delta_j\longrightarrow0.
\tag{4}
\]

The integer \(a_j\) disappears after reducing (1) modulo \(1\). If

\[
\theta_j=\{\log_2 n_j\}\in\mathbb R/\mathbb Z,
\]

then

\[
\theta_{j+1}
=
\theta_j+\alpha+\delta_j
\pmod 1.
\tag{5}
\]

Thus the binary logarithmic phase of every hypothetical divergent orbit is an asymptotic irrational rotation.

---

## 2. Orbitwise binary Benford theorem

### Theorem 1

Let \((n_j)_{j\ge0}\) be a non-eventually-periodic orbit of \(U\) in the positive odd integers. Then

\[
\{\log_2 n_j\}_{j\ge0}
\]

is uniformly distributed modulo \(1\).

Equivalently, for every \(1\le s<2\),

\[
\lim_{N\to\infty}
\frac1N
\#\left\{
0\le j<N:
2^{\{\log_2n_j\}}<s
\right\}
=
\log_2s.
\tag{6}
\]

Hence the odd iterates satisfy the strong Benford law in base \(2\).

### Proof

We first use an elementary ratio lemma.

#### Lemma

Suppose \(|z_j|=1\) and

\[
\frac{z_{j+1}}{z_j}\longrightarrow\lambda,
\qquad |\lambda|=1,
\qquad \lambda\ne1.
\]

Then

\[
\frac1N\sum_{j=0}^{N-1}z_j\longrightarrow0.
\]

Indeed, put \(r_j=z_{j+1}/z_j\) and \(S_N=\sum_{j<N}z_j\). We have

\[
\sum_{j=0}^{N-1}(\lambda-r_j)z_j
=
\lambda S_N-\sum_{j=0}^{N-1}z_{j+1}
=
(\lambda-1)S_N+z_0-z_N.
\]

Therefore

\[
(\lambda-1)S_N
=
z_N-z_0+
\sum_{j=0}^{N-1}(\lambda-r_j)z_j.
\]

After division by \(N\), the endpoint term tends to zero and

\[
\frac1N\sum_{j<N}|\lambda-r_j|\longrightarrow0
\]

by Cesàro convergence. Since \(\lambda\ne1\), it follows that \(S_N/N\to0\).

Now fix a nonzero integer \(h\), and set

\[
z_j=e^{2\pi i h\theta_j}.
\]

By (5),

\[
\frac{z_{j+1}}{z_j}
=
e^{2\pi i h(\alpha+\delta_j)}
\longrightarrow
e^{2\pi i h\alpha}.
\]

The limit is not \(1\), because \(\alpha=\log_2 3\) is irrational: if \(h\alpha\) were an integer, then an integral power of \(3\) would equal an integral power of \(2\).

The lemma therefore gives

\[
\frac1N\sum_{j=0}^{N-1}e^{2\pi i h\theta_j}
\longrightarrow0
\]

for every nonzero \(h\in\mathbb Z\). Weyl’s criterion now implies that \((\theta_j)\) is uniformly distributed modulo \(1\). ∎

### Interpretation

This is not merely approximate Benford behavior for most seeds. It is a pointwise statement for **every** hypothetical nonperiodic positive orbit.

But it already indicates the central problem with the proposed strategy: Benford behavior is not an exceptional randomness property that a divergent orbit would have difficulty satisfying. It is an automatic consequence of the recurrence.

---

## 3. The orbit is rigid, not mixing

The preceding proof gives more than marginal equidistribution.

### Theorem 2: finite-lag rigidity

For every fixed \(r\ge0\) and every continuous function
\(F:(\mathbb R/\mathbb Z)^{r+1}\to\mathbb C\),

\[
\begin{aligned}
\lim_{N\to\infty}\frac1N
\sum_{j=0}^{N-1}
F(\theta_j,\theta_{j+1},\ldots,\theta_{j+r})
=
\int_0^1
F(x,x+\alpha,\ldots,x+r\alpha)\,dx.
\end{aligned}
\tag{7}
\]

All additions inside \(F\) are understood modulo \(1\).

### Proof

For fixed \(t\),

\[
\theta_{j+t}
=
\theta_j+t\alpha+
\sum_{s=0}^{t-1}\delta_{j+s}
\pmod1.
\]

By (4), the last sum tends to zero as \(j\to\infty\). Uniform continuity of \(F\) therefore reduces the left side of (7) to the average of

\[
x\longmapsto F(x,x+\alpha,\ldots,x+r\alpha)
\]

evaluated at \(x=\theta_j\). The result follows from Theorem 1. ∎

Thus consecutive binary significands are not asymptotically independent. Their limiting joining is supported on the one-dimensional irrational-rotation curve

\[
(x,x+\alpha,\ldots,x+r\alpha).
\]

This is a rigid dynamical law. Treating Benford behavior as a proxy for independent random digits would therefore be invalid.

---

## 4. A quantitative discrepancy bound for every orbit

The qualitative theorem can be made effective.

Let

\[
D_N=
\sup_{0\le u<v\le1}
\left|
\frac1N\#\{0\le j<N:\theta_j\in[u,v)\}-(v-u)
\right|.
\]

For \(h\ge1\), put

\[
S_N(h)=\sum_{j=0}^{N-1}e^{2\pi i h\theta_j},
\qquad
\lambda_h=e^{2\pi i h\alpha}.
\]

The ratio-lemma identity gives

\[
|S_N(h)|
\le
\frac{
2+\sum_{j<N}
|\lambda_h-e^{2\pi i h(\alpha+\delta_j)}|
}{
|\lambda_h-1|
}.
\]

Since

\[
\delta_j
\le
\frac1{3(\log 2)n_j},
\]

we obtain

\[
|S_N(h)|
\ll
\frac{1+h\sum_{j<N}n_j^{-1}}
{\|h\alpha\|}.
\tag{8}
\]

The \(n_j\) are distinct positive odd integers, so

\[
\sum_{j<N}\frac1{n_j}
\le
\sum_{k=1}^{N}\frac1{2k-1}
\ll\log(2N).
\tag{9}
\]

A linear-forms estimate of Rhin quoted in the Benford literature gives, for the fixed number \(\alpha=\log_2 3\),

\[
\|h\alpha\|\gg h^{-7.616}.
\tag{10}
\]

The underlying estimate concerns nonzero linear forms in \(\log2\) and \(\log3\). citeturn485888view0

Combining (8)–(10),

\[
|S_N(h)|
\ll
h^{8.616}\log(2N).
\tag{11}
\]

The Erdős–Turán inequality consequently yields

\[
D_N
\ll
\frac1H+
\frac{\log(2N)}N H^{8.616}.
\]

Taking

\[
H\asymp
\left(\frac{N}{\log(2N)}\right)^{1/9.616}
\]

gives

\[
\boxed{
D_N
\ll
\left(\frac{\log(2N)}{N}\right)^{1/9.616}
}.
\tag{12}
\]

So the proposed “bounded-discrepancy theorem for every orbit” can indeed be proved in a quantitative form, at least for the binary significands of the accelerated odd orbit.

It still does not force descent.

---

## 5. Exact affine carries reinforce the Benford law

Define integers \(C_j\) by

\[
2^{A_j}n_j=3^jn_0+C_j.
\tag{13}
\]

Then

\[
C_0=0,
\qquad
C_{j+1}=3C_j+2^{A_j}.
\tag{14}
\]

Let

\[
q_j=\frac{3^j}{2^{A_j}}
\]

and

\[
H_j=\frac{2^{A_j}n_j}{3^j}
=n_0+\frac{C_j}{3^j}.
\]

From (14),

\[
H_{j+1}
=
H_j+\frac{2^{A_j}}{3^{j+1}}
=
H_j+\frac1{3q_j}.
\tag{15}
\]

Since \(n_j=q_jH_j\),

\[
\frac{H_{j+1}}{H_j}
=
1+\frac1{3n_j}.
\]

Therefore

\[
\log_2H_{j+1}-\log_2H_j
=
\log_2\left(1+\frac1{3n_j}\right)
=
\delta_j.
\tag{16}
\]

The binary logarithmic phase can now be written as

\[
\begin{aligned}
\log_2n_j
&=
j\log_23-A_j+\log_2H_j,\\
\theta_j
&=
\{j\alpha+\log_2H_j\}.
\end{aligned}
\tag{17}
\]

Equation (16) says precisely that the carry factor \(H_j\) has asymptotically vanishing logarithmic increments. Thus the exact affine carries do not disturb the irrational rotation \(j\alpha\); they provide its slowly varying phase correction.

In the particularly strong growth regime where \(q_j\) grows quickly enough that

\[
\sum_j\frac1{q_j}<\infty,
\]

equation (15) gives \(H_j\to H_\infty\in(0,\infty)\), and then

\[
\theta_j
=
\{j\alpha+\log_2H_\infty+o(1)\}.
\tag{18}
\]

This is the canonical form of a Benford sequence. Sustained coefficient growth and Benford behavior are therefore naturally compatible.

---

## 6. Why Benford frequencies do not determine drift

Summing (1) gives the exact drift identity

\[
\log_2n_N-\log_2n_0
=
N\alpha-A_N+\sum_{j=0}^{N-1}\delta_j.
\tag{19}
\]

Since \(\delta_j\to0\),

\[
\frac{\log_2n_N}{N}
=
\alpha-\frac{A_N}{N}+o(1).
\tag{20}
\]

Thus excluding a nonperiodic orbit requires proving that its mean valuation satisfies

\[
\liminf_{N\to\infty}\frac{A_N}{N}>\alpha.
\tag{21}
\]

Ordinary Benford behavior controls the most significant binary digits of \(n_j\). The valuation \(a_j=v_2(3n_j+1)\) is controlled by the least significant binary digits.

The separation becomes especially transparent at the level of binary length. Put

\[
L_j=\lfloor\log_2n_j\rfloor
\]

and define

\[
b_j=\left\lfloor\theta_j+\alpha+\delta_j\right\rfloor\in\{1,2\}.
\]

Then (1) gives

\[
L_{j+1}-L_j=b_j-a_j.
\tag{22}
\]

By binary Benford equidistribution,

\[
\frac1N\#\{j<N:b_j=2\}
\longrightarrow
\alpha-1=\log_2(3/2).
\]

Consequently,

\[
\frac1N\sum_{j<N}b_j\longrightarrow\alpha.
\tag{23}
\]

This is exactly the neutral multiplicative contribution. Benford’s law correctly predicts the average **upper-end binary carry** \(b_j\), but it says nothing about whether

\[
\frac1N\sum_{j<N}a_j
\]

is above or below \(\alpha\). The unresolved information is entirely at the low-bit end.

For a general base \(B\), the phase recurrence is

\[
\{\log_B n_{j+1}\}
=
\{
\log_Bn_j+\log_B3-a_j\log_B2+\delta_{j,B}
\}.
\tag{24}
\]

Base \(2\) is special because \(a_j\log_22=a_j\) vanishes modulo \(1\). In decimal or another unrelated base, proving pointwise Benford behavior would itself require substantial control of the valuation sequence. The strategy therefore faces a dichotomy:

- in base \(2\), orbitwise Benford is provable but loses the valuation information;
- in another base, the desired pointwise Benford theorem already contains much of the missing valuation problem.

---

## 7. Exact positive Collatz segments defeating a local contradiction

The failure is not merely philosophical. There is an explicit family of arbitrarily long exact positive-integer orbit segments that are simultaneously growing and asymptotically Benford.

### Theorem 3

For every \(K\ge1\), let

\[
N_K=2^{3K+1}-5.
\tag{25}
\]

The first \(2K\) accelerated valuations of \(N_K\) are

\[
(1,2,1,2,\ldots,1,2)=(1,2)^K.
\tag{26}
\]

More precisely, for \(0\le t\le K\),

\[
n_{2t}
=
2^{3(K-t)+1}9^t-5,
\tag{27}
\]

and for \(0\le t<K\),

\[
n_{2t+1}
=
3\cdot2^{3(K-t)}9^t-7.
\tag{28}
\]

Every iterate in this segment other than \(n_0\) is greater than \(n_0\), and its multiplicative coefficient satisfies

\[
q_j=\frac{3^j}{2^{A_j}}\ge1
\qquad (0\le j\le2K).
\tag{29}
\]

Furthermore, the binary logarithmic phases of the first \(2K\) odd iterates become uniformly distributed modulo \(1\) as \(K\to\infty\).

### Proof

Starting from (27),

\[
\begin{aligned}
3n_{2t}+1
&=
3\left(2^{3(K-t)+1}9^t-5\right)+1\\
&=
2\left(3\cdot2^{3(K-t)}9^t-7\right).
\end{aligned}
\]

The factor in parentheses is odd, so

\[
v_2(3n_{2t}+1)=1,
\]

and division by \(2\) gives (28).

Next,

\[
\begin{aligned}
3n_{2t+1}+1
&=
3\left(3\cdot2^{3(K-t)}9^t-7\right)+1\\
&=
2^{3(K-t)}9^{t+1}-20\\
&=
4\left(2^{3(K-t)-2}9^{t+1}-5\right).
\end{aligned}
\]

When \(t<K\), the expression in parentheses is odd. Hence

\[
v_2(3n_{2t+1}+1)=2,
\]

and its quotient is exactly

\[
2^{3(K-(t+1))+1}9^{t+1}-5=n_{2t+2}.
\]

This proves (26)–(28).

Since

\[
A_{2t}=3t,
\qquad
A_{2t+1}=3t+1,
\]

we have

\[
q_{2t}
=
\left(\frac98\right)^t,
\qquad
q_{2t+1}
=
\frac32\left(\frac98\right)^t.
\tag{30}
\]

Thus \(q_j\ge1\) at every prefix. The explicit formulas also show that all later values in the displayed segment exceed \(N_K\).

Now let

\[
\gamma=\log_2\left(\frac98\right)=2\alpha-3.
\]

It is irrational. From (27),

\[
n_{2t}+5
=
2^{3K+1}\left(\frac98\right)^t,
\]

so, uniformly for \(0\le t<K\),

\[
\{\log_2n_{2t}\}
=
\{t\gamma\}+O(2^{-3K})
\quad\text{on }\mathbb R/\mathbb Z.
\tag{31}
\]

Similarly, from (28),

\[
n_{2t+1}+7
=
3\cdot2^{3K}\left(\frac98\right)^t,
\]

and hence

\[
\{\log_2n_{2t+1}\}
=
\{\alpha+t\gamma\}+O(2^{-3K}).
\tag{32}
\]

The sequences \(\{t\gamma\}\) and \(\{\alpha+t\gamma\}\) are uniformly distributed modulo \(1\). Therefore the interleaving of the two sequences in (31)–(32), with uniformly vanishing errors, has discrepancy tending to zero. ∎

For example, \(K=2\) gives

\[
123\longmapsto185\longmapsto139
\longmapsto209\longmapsto157,
\]

with valuations \(1,2,1,2\), and every displayed value exceeds \(123\).

### What terminates these segments?

For \(t<K\),

\[
n_{2t}\equiv3\pmod8,
\qquad
n_{2t+1}\equiv1\pmod8.
\tag{33}
\]

At the terminal point,

\[
n_{2K}=2\cdot9^K-5\equiv5\pmod8,
\]

so

\[
v_2(3n_{2K}+1)\ge3.
\]

A large valuation finally interrupts the growth pattern.

The starts \(N_K\) converge \(2\)-adically to \(-5\). Indeed,

\[
N_K\equiv-5\pmod{2^{3K+1}}.
\]

The infinite symbolic word \((1,2)^\infty\) is realized by the negative \(2\)-adic cycle

\[
-5\longmapsto-7\longmapsto-5.
\]

Over two symbolic steps, the affine recurrence is

\[
x\longmapsto\frac{9x+5}{8},
\]

and therefore

\[
x_{2t}+5=\left(\frac98\right)^t(x_0+5).
\tag{34}
\]

For a positive real \(x_0\), this grows and is Benford because \(\log_2(9/8)\) is irrational. Realizing it for arbitrarily many integer steps is possible through \(N_K\), but realizing it for all steps forces the \(2\)-adic start \(-5\), not a positive ordinary integer.

This is exactly the global real/\(2\)-adic synchronization obstruction. Benford statistics do not resolve it.

---

## 8. The precise three-bit theorem that would exclude divergence

The valuation has the exact expansion

\[
a(n)
=
\sum_{\ell=1}^{\infty}
\mathbf 1_{\{\,3n+1\equiv0\pmod{2^\ell}\,\}}.
\tag{35}
\]

For each \(\ell\), there is one odd residue

\[
r_\ell\equiv-3^{-1}\pmod{2^\ell}
\]

for which the corresponding indicator is \(1\). Hence

\[
\frac{A_N}{N}
=
\sum_{\ell=1}^{\infty}
\frac1N
\#\{0\le j<N:n_j\equiv r_\ell\pmod{2^\ell}\}.
\tag{36}
\]

The first three levels are especially simple:

\[
a(n)
\ge
1+
\mathbf 1_{\{n\equiv1\pmod4\}}
+
\mathbf 1_{\{n\equiv5\pmod8\}}.
\tag{37}
\]

For \(r\in\{1,3,5,7\}\), define

\[
p_r(N)=
\frac1N\#\{0\le j<N:n_j\equiv r\pmod8\}.
\]

Since \(n\equiv1\pmod4\) means \(n\equiv1\) or \(5\pmod8\), (37) gives

\[
\frac{A_N}{N}
\ge
1+p_1(N)+2p_5(N).
\tag{38}
\]

Let

\[
\beta=\log_2(3/2)=\alpha-1
=0.5849625007\ldots.
\]

### Three-bit orbit criterion

Suppose every non-eventually-periodic positive odd orbit satisfies

\[
\boxed{
\liminf_{N\to\infty}
\bigl(p_1(N)+2p_5(N)\bigr)
>
\log_2(3/2).
}
\tag{BR8}
\]

Then no non-eventually-periodic positive Collatz orbit exists.

### Proof

By (38), condition (BR8) gives some \(\varepsilon>0\) such that eventually

\[
\frac{A_N}{N}\ge\alpha+\varepsilon.
\]

On the other hand, (20) gives

\[
\frac{\log_2n_N}{N}
=
\alpha-\frac{A_N}{N}+o(1)
\le
-\varepsilon+o(1),
\]

which is negative for all sufficiently large \(N\). This is impossible because \(n_N\ge1\), so \(\log_2n_N\ge0\). ∎

Uniform distribution among the four odd residue classes modulo \(8\) would give

\[
p_1=p_5=\frac14,
\]

and hence

\[
p_1+2p_5=\frac34
>
\log_2(3/2).
\]

The resulting mean-valuation lower bound would be

\[
1+\frac14+\frac12
=
\frac74
>
\log_23.
\]

The margin is

\[
\frac74-\log_23
=
0.1650374992\ldots.
\]

Modulo \(4\) alone would yield only the lower bound \(3/2<\log_23\), so modulo \(8\) is the first Haar-uniform residue level that is strong enough.

The family from Theorem 3 explains the exact obstruction. On its long growing prefix,

\[
p_1\approx\frac12,
\qquad
p_5=0,
\]

so

\[
p_1+2p_5\approx\frac12
<
\log_2(3/2),
\]

even though its leading binary phases are asymptotically Benford. The missing rescue occurs only when the orbit finally enters the class \(5\bmod8\).

Thus a successful refinement of the Benford program would need an **adelic bridge theorem**, not an ordinary Benford theorem: it must connect the equidistributed most significant binary digits to the trailing residue classes governing \(v_2(3n+1)\).

A sufficient, stronger formulation would be joint equidistribution

\[
\left(
\{\log_2n_j\},\,n_j\bmod8
\right)
\]

with respect to Lebesgue measure times the uniform measure on the four odd classes. But even the much weaker inequality (BR8) would already suffice.

---

## 9. Periodic orbits remain a separate debt

Benford rigidity for nonperiodic orbits says nothing about a nontrivial finite cycle.

If \(n_m=n_0\) after \(m\) odd steps, then (13) gives

\[
(2^{A_m}-3^m)n_0=C_m>0,
\tag{39}
\]

and therefore

\[
A_m>m\log_23.
\tag{40}
\]

Equivalently, summing the logarithmic recurrence around the cycle gives

\[
A_m-m\alpha
=
\sum_{j=0}^{m-1}
\log_2\left(1+\frac1{3n_j}\right)>0.
\tag{41}
\]

There is no Benford contradiction: a periodic sequence is not required to be equidistributed, and its nonvanishing average carry correction exactly balances the multiplicative deficit.

Consequently, even a proof of (BR8) for every nonperiodic orbit would settle only the divergent-orbit part of Collatz. A full proof would additionally require exclusion of every nontrivial positive cycle.

Formally:

### Conditional Collatz theorem

Assume:

1. every non-eventually-periodic positive odd orbit satisfies (BR8);
2. there is no nontrivial positive cycle of the accelerated map \(U\).

Then every positive integer reaches \(1\).

Indeed, any nonconvergent orbit is either eventually periodic or nonperiodic. The first alternative is excluded by assumption 2 and the second by the three-bit criterion.

---

# Final assessment

The Benford program yields a genuine pointwise theorem:

\[
\boxed{
\text{Every hypothetical nonperiodic positive odd Collatz orbit is binary Benford.}
}
\]

It even yields the quantitative every-orbit discrepancy estimate

\[
D_N
\ll
\left(\frac{\log(2N)}N\right)^{1/9.616},
\]

together with complete finite-lag irrational-rotation rigidity.

But the intended contradiction does not occur. The exact affine carries satisfy

\[
\log_2H_{j+1}-\log_2H_j
=
\log_2\left(1+\frac1{3n_j}\right)\to0,
\]

so they make the orbit asymptotic to an irrational rotation. The explicit starts

\[
N_K=2^{3K+1}-5
\]

supply arbitrarily long exact positive-integer prefixes that are growing, carry-compatible, and increasingly Benford.

The rigorous endpoint of approach 84 is therefore:

\[
\boxed{
\text{ordinary Benford rigidity controls the top bits, while Collatz descent is decided by the bottom bits.}
}
\]

The narrow additional divergence theorem is the modulo-\(8\) inequality

\[
\liminf_N\bigl(p_1(N)+2p_5(N)\bigr)
>
\log_2(3/2).
\]

Proving that statement for every nonperiodic orbit would eliminate divergence. It is not a consequence of Benford’s law, and the family \((2^{3K+1}-5)\) demonstrates precisely how long an orbit can evade it. A separate theorem excluding nontrivial cycles is still necessary. Calling the present argument a full proof of Collatz would therefore be mathematically incorrect.