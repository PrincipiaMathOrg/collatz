model: GPT-5.6 Pro (Chat mode)
round: 71 -- approach 66, Exclude peripheral spectrum of a weighted Collatz shift
front: proof
sent: 2026-08-16T12:23Z
worked: 54m 36s

---

# Verdict

I do **not** obtain a full proof. The weighted-shift detector can be constructed rigorously, but the proposed final step—proving a strict spectral-radius gap after removing only the trivial cycle—is false for the natural classes of weights. In fact, unit-circle approximate eigenvectors arise from completely terminating Collatz trajectories.

This is not merely the familiar observation that an operator reformulation may be equivalent to Collatz. It is a concrete no-go theorem for the approximate-spectrum strategy. The strongest repair I found replaces peripheral approximate spectrum by the **multiplicity of an actual eigenvalue**; that gives an exact and unusually simple spectral characterization, but proving the eigenvalue is simple remains precisely the missing component-connectivity theorem.

Operator formulations already in the literature associate cycles and hypothetical divergent trajectories with special fixed points, while noting that unrelated fixed points may also occur. Mori’s operator-algebra formulation makes the conjecture equivalent to the absence of nontrivial reducing subspaces. citeturn864506view0turn864506view2

---

## 1. The weighted Collatz shift

Use the shortcut map

\[
T(n)=
\begin{cases}
n/2,&n\ \text{even},\\[2mm]
(3n+1)/2,&n\ \text{odd}.
\end{cases}
\]

Its trivial cycle is \(1\leftrightarrow2\).

On \(H=\ell ^2(\mathbb N)\), let

\[
S_we_n=w(n)e_{T(n)} .
\]

Since every \(m\) has at most two preimages,

\[
\|S_w\|^2
=
\sup_{m\ge1}\sum_{T(n)=m}|w(n)|^2,
\]

so any bounded weight defines a bounded operator.

Take

\[
\ell(n)=\log(n+e),
\qquad
w(n)=\frac{\ell(T(n))}{\ell(n)}.
\tag{1}
\]

This is a positive bounded weight satisfying

\[
w(n)\longrightarrow1
\qquad (n\to\infty).
\tag{2}
\]

It is also a multiplicative coboundary:

\[
\prod_{j=0}^{k-1}w(T^j n)
=
\frac{\ell(T^k n)}{\ell(n)}.
\tag{3}
\]

This is the natural balance between exact cycle normalization and asymptotic unit weights.

---

## 2. Cycles give exact unit-modulus eigenvalues

Suppose

\[
n_0\longmapsto n_1\longmapsto\cdots
\longmapsto n_{p-1}\longmapsto n_0
\]

is a cycle. By telescoping,

\[
\prod_{j=0}^{p-1}w(n_j)=1.
\tag{4}
\]

The span of \(e_{n_0},\dots,e_{n_{p-1}}\) is invariant under \(S_w\), and the restriction is a cyclic weighted permutation. Its characteristic equation is

\[
\lambda^p=\prod_{j=0}^{p-1}w(n_j)=1.
\]

Consequently every \(p\)-th root of unity is an eigenvalue of that restriction. In particular, any nontrivial Collatz cycle creates unit-modulus point spectrum.

So the cycle-detection half of the proposal works exactly.

---

## 3. A divergent orbit gives unit-circle Weyl sequences

Suppose \(n_j=T^j(n_0)\) is nonperiodic and does not reach the trivial cycle. Then the \(n_j\) are distinct. Since they are distinct positive integers,

\[
n_j\longrightarrow\infty.
\]

By (2),

\[
w(n_j)\longrightarrow1.
\]

Fix \(|\lambda|=1\). For integers \(r,L\ge1\), define

\[
v_{r,L}
=
\frac1{\sqrt L}
\sum_{j=0}^{L-1}\lambda^{-j}e_{n_{r+j}}.
\]

A direct calculation gives

\[
\begin{aligned}
\|(S_w-\lambda I)v_{r,L}\|^2
={}&
\frac1L
+\frac{|w(n_{r+L-1})|^2}{L}\\
&+
\frac1L\sum_{j=0}^{L-2}|w(n_{r+j})-1|^2 .
\end{aligned}
\tag{5}
\]

Choose \(r=r(L)\) so far along the orbit that

\[
|w(n_j)-1|\le \frac1L
\qquad(j\ge r).
\]

Then (5) tends to zero as \(L\to\infty\). Thus

\[
\mathbb T\subseteq
\sigma_{\mathrm{ap}}
\left(S_w\big|_{\overline{\operatorname{span}}\{e_{n_j}\}}\right).
\tag{6}
\]

So the divergent-orbit detection half also works.

---

## 4. The exact exceptional-sector criterion

Let

\[
B=\{n:T^k(n)\in\{1,2\}\text{ for some }k\ge0\},
\qquad
E=\mathbb N\setminus B.
\]

The set \(E\) is completely invariant:

\[
n\in E \iff T(n)\in E.
\]

Hence \(H_E=\ell ^2(E)\) is reducing for \(S_w\).

If \(E\neq\varnothing\), then an orbit in \(E\) either repeats, producing a nontrivial cycle and a unit eigenvalue, or is injective and divergent, producing (6). Therefore

\[
E\neq\varnothing
\quad\Longrightarrow\quad
r(S_w|_{H_E})\ge1.
\tag{7}
\]

Conversely, if Collatz holds, then \(E=\varnothing\) and the exceptional restriction is the zero operator. We therefore have the exact equivalence

\[
\boxed{
\text{Collatz holds}
\iff
r(S_w|_{\ell ^2(E)})<1.
}
\tag{8}
\]

The problem is that \(E\) is already the unknown exceptional set. Proving that this reducing subspace is zero is precisely the conjecture. Thus (8) is an exact reformulation but not yet a proof.

One might try to avoid this by removing only the known cycle \(\{1,2\}\). That is where a genuine obstruction appears.

---

# 5. No-go theorem: terminating trajectories force unit-circle approximate spectrum

Let \(P\) be the projection onto

\[
\ell ^2(\mathbb N\setminus\{1,2\}),
\qquad
A=PS_wP.
\]

Even if every positive integer terminates, \(A\) has unit-circle approximate spectrum.

## 5.1 Long high-altitude even runs

The orbit beginning at \(2^{2L}\) has the segment

\[
2^{2L}\to2^{2L-1}\to\cdots\to2^L.
\]

This is a terminating orbit, and all \(L+1\) displayed values tend uniformly to infinity. Hence all corresponding weights in (1) tend uniformly to \(1\). Applying the construction in (5) gives, for every \(|\lambda|=1\),

\[
\|(A-\lambda I)v_L\|\longrightarrow0.
\]

Thus powers of two alone already prohibit a strict global gap.

A designer might try to repair this by assigning a genuinely contracting weight to every even edge. The odd branch produces the same obstruction.

## 5.2 Arbitrarily long terminating all-odd runs

For every \(L\ge1\), define

\[
q_L=\frac{2^{3^L}+1}{3^{L+1}},
\qquad
u_L=2q_L,
\qquad
N_L=2^Lu_L-1.
\tag{9}
\]

The lifting-the-exponent identity gives

\[
v_3(2^{3^L}+1)
=
v_3(2+1)+v_3(3^L)
=
L+1,
\]

so \(q_L\) is an odd positive integer and \(u_L\) is even.

For \(0\le j\le L\), put

\[
n_j=3^j2^{L-j}u_L-1.
\tag{10}
\]

Every \(n_j\) is odd, and for \(j<L\),

\[
T(n_j)
=
\frac{3n_j+1}{2}
=
3^{j+1}2^{L-j-1}u_L-1
=
n_{j+1}.
\]

The final odd step gives

\[
\begin{aligned}
T(n_L)
&=\frac{3^{L+1}u_L-2}{2}\\
&=3^{L+1}q_L-1\\
&=2^{3^L}.
\end{aligned}
\tag{11}
\]

After that, the orbit reaches \(1\) through \(3^L\) halvings.

Hence \(N_L\) has \(L+1\) consecutive odd shortcut steps, all at values tending uniformly to infinity, and then lands exactly on a power of two.

For example,

\[
3\to5\to8,
\]

and

\[
151\to227\to341\to512
\]

are the first two members.

Let \(M=L+1\) and define

\[
v_L=\frac1{\sqrt M}
\sum_{j=0}^{M-1}\lambda^{-j}e_{n_j}.
\]

Then

\[
\|(A-\lambda I)v_L\|^2
=
\frac{
1+|w(n_L)|^2+
\sum_{j=0}^{L-1}|w(n_j)-1|^2
}{L+1}.
\tag{12}
\]

Since \(\min_j n_j=N_L\to\infty\),

\[
\max_{0\le j\le L}|w(n_j)-1|\longrightarrow0.
\]

Consequently,

\[
\|(A-\lambda I)v_L\|^2
=
\frac{2+o(1)}{L+1}+o(1)
\longrightarrow0.
\tag{13}
\]

Therefore

\[
\boxed{\mathbb T\subseteq\sigma_{\mathrm{ap}}(A)}
\tag{14}
\]

using vectors supported entirely on **provably terminating orbits**.

The supports can be chosen disjoint, so these are escaping singular sequences rather than an artifact of one fixed finite-dimensional block.

This invalidates the desired implication

\[
\text{unit-circle approximate spectrum}
\Longrightarrow
\text{counterexample orbit}.
\]

---

## 6. Every finite parity word occurs on a terminating orbit

The preceding examples are part of a general phenomenon.

### Finite-prefix extension lemma

Let

\[
\varepsilon=(\varepsilon_0,\dots,\varepsilon_{k-1})
\in\{0,1\}^k
\]

be any shortcut-Collatz parity word. There exists a positive integer \(n\) whose orbit has this parity prefix and subsequently reaches a power of two.

### Proof

The parity word determines one residue class

\[
n=a+2^kt.
\]

If \(s=\sum_j\varepsilon_j\), affine iteration gives

\[
T^k(a+2^kt)=b+3^st
\tag{15}
\]

for an integer \(b\).

If \(3\nmid b\), use that \(2\) generates the unit group modulo \(3^s\). Choose \(r\) such that

\[
2^r\equiv b\pmod{3^s}
\]

and sufficiently large that \(2^r\ge b\). Then

\[
t=\frac{2^r-b}{3^s}
\]

is a nonnegative integer, and the endpoint in (15) is \(2^r\).

If \(3\mid b\), first choose the parity of \(t\) so that \(b+3^st\) is odd and append one odd step. Its image is congruent to \(2\pmod3\), and the preceding argument applies with modulus \(3^{s+1}\). ∎

Thus every finite parity pattern— including every finite prefix of a hypothetical divergent trajectory—has a terminating realization.

This has a decisive spectral consequence:

> A bounded finite-memory or \(2\)-adically local weighting cannot distinguish an infinite positive-integer orbit from longer and longer terminating shadows merely through finite-block approximate eigenvectors.

The missing property is **nestedness for one fixed positive seed**. Ordinary operator norm and ordinary approximate spectrum take a supremum over a different seed at every block length, so they discard exactly that information.

---

# 7. A stronger exact detector using an actual eigenvalue

There is a simple weight for which every orbit-component produces an actual \(1\)-eigenvector.

Fix \(s>\tfrac12\), and define

\[
(K_sx)_n
=
\left(\frac{T(n)}{n}\right)^s x_{T(n)}.
\tag{16}
\]

This is bounded on \(\ell ^2(\mathbb N)\), since

\[
\begin{aligned}
\|K_sx\|^2
&=
\sum_m |x_m|^2
\sum_{T(n)=m}\left(\frac{m}{n}\right)^{2s},\\
\sum_{T(n)=m}\left(\frac{m}{n}\right)^{2s}
&\le
2^{-2s}+2^{2s}.
\end{aligned}
\]

Let \(C\) be any orbit-equivalence component of the Collatz graph, and set

\[
g_C(n)=n^{-s}\mathbf1_C(n).
\tag{17}
\]

Because \(s>\tfrac12\), \(g_C\in\ell ^2(\mathbb N)\). Moreover,

\[
(K_sg_C)_n
=
\left(\frac{T(n)}n\right)^s
T(n)^{-s}\mathbf1_C(T(n))
=
n^{-s}\mathbf1_C(n),
\]

so

\[
K_sg_C=g_C.
\tag{18}
\]

Conversely, if \(K_sx=x\), define

\[
y_n=n^sx_n.
\]

Equation (16) becomes

\[
y_n=y_{T(n)}.
\tag{19}
\]

Therefore \(y\) is constant on every orbit component. Hence

\[
\ker(I-K_s)
=
\left\{
\sum_C c_Cg_C:
\sum_C |c_C|^2
\sum_{n\in C}n^{-2s}<\infty
\right\}.
\tag{20}
\]

In particular, there is exactly one linearly independent \(1\)-eigenvector per Collatz component.

Since

\[
g(n)=n^{-s}
\]

is the sum of the component vectors, we obtain:

\[
\boxed{
\text{Collatz holds}
\iff
\ker(I-K_s)=\mathbb C\, (n^{-s})_{n\ge1}.
}
\tag{21}
\]

Equivalently:

\[
\boxed{
\text{Collatz holds}
\iff
1\text{ is a simple eigenvalue of }K_s.
}
\tag{22}
\]

This detects both possible failure modes:

* a nontrivial cyclic component contributes another \(g_C\);
* a divergent component contributes another \(g_C\).

The original forward shift adjoint relation is

\[
K_s=S_s^*,
\qquad
S_se_n=\left(\frac{T(n)}n\right)^s e_{T(n)}.
\]

Thus this is genuinely a weighted-Collatz-shift statement.

But (19) exposes the remaining issue exactly: proving simplicity means proving that every component constant is the same, which means proving that the graph has only the component containing \(1\). No spectral estimate has yet supplied that arithmetic connection.

---

# 8. An anchored shift that removes transient spectral pollution

There is also a useful diagnostic that does not refer to the unknown set \(E\).

On

\[
\mathcal H=\ell ^2(\mathbb N\times\mathbb N_0),
\]

let

\[
q_{n,j}
=
\mathbf1_{\{T^i(n)\notin\{1,2\}\text{ for }0\le i\le j\}}.
\]

For \(\epsilon>0\), define

\[
U_\epsilon e_{n,j}
=
e^{-\epsilon n}q_{n,j+1}e_{n,j+1}.
\tag{23}
\]

Every coefficient is computable by a finite orbit calculation.

Let \(\tau(n)\) be the first hitting time of \(\{1,2\}\), possibly infinite, and define

\[
m_k=\min\{n:\tau(n)>k\}.
\]

Then \(U_\epsilon\) is a weighted partial shift with

\[
\|U_\epsilon^k\|
=
e^{-\epsilon k m_k}.
\tag{24}
\]

If Collatz holds, then \(m_k\to\infty\), so

\[
r(U_\epsilon)=0.
\tag{25}
\]

If Collatz fails and \(m_*=\min E\), then \(m_k=m_*\) for all sufficiently large \(k\), giving

\[
r(U_\epsilon)=e^{-\epsilon m_*}>0.
\tag{26}
\]

Therefore

\[
\boxed{
\text{Collatz holds}
\iff
r(U_\epsilon)=0
\iff
U_\epsilon\text{ is compact}.
}
\tag{27}
\]

If a least counterexample \(m_*\) exists, its value is encoded spectrally by

\[
m_*=-\frac1\epsilon\log r(U_\epsilon).
\tag{28}
\]

This construction suppresses approximate modes whose starting seeds escape to infinity. Its cost is that a counterexample produces radius \(e^{-\epsilon m_*}\), not radius \(1\); as \(\epsilon\downarrow0\), this radius tends to \(1\).

Again, (27) is an exact detector rather than a proof: establishing \(r(U_\epsilon)=0\) is equivalent to establishing \(m_k\to\infty\).

---

# 9. What a successful spectral argument would still need

The straightforward gap theorem is blocked for two separate reasons.

First, asymptotically unit weights produce Weyl sequences on high terminating paths. Second, every finite parity prefix has a terminating extension, so finite-block spectral data do not preserve a common starting seed.

A successful replacement would need a compactness theorem of the following form:

> Every normalized approximate unit eigenvector in the nontrivial sector has a subsequence whose mass remains anchored to one fixed positive starting seed, rather than escaping through seeds \(n_L\to\infty\) or converging only \(2\)-adically.

The explicit families above show that this is false in ordinary \(\ell ^2(\mathbb N)\). Obtaining it would require an additional nonlocal coordinate—most plausibly an anchored seed coordinate together with an archimedean/3-adic carry constraint—and a proof of nonescape of mass. That is substantially stronger than a routine weighted-shift estimate.

So the outcome of approach 66 is:

\[
\boxed{
\begin{array}{l}
\text{Cycle detector: successful.}\\
\text{Divergent-orbit Weyl detector: successful.}\\
\text{Global unit-circle gap: false for natural/local weights.}\\
\text{Exact repaired criterion: eigenvalue }1\text{ of }K_s
\text{ must be simple.}
\end{array}}
\]

The missing assertion

\[
\ker(I-K_s)=\mathbb C(n^{-s})
\]

is a clean spectral formulation, but I do not have a valid proof of it. Claiming that simplicity from positivity, Perron–Frobenius theory, or a spectral-radius bound would silently assume the irreducibility—or equivalently the Collatz connectivity—that must be proved.