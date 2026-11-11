model: GPT-5.6 Pro (Chat mode)
round: 62 -- approach 57, 2-adic Haar-wavelet diagonalization
front: proof
sent: 2026-08-16T02:38Z
worked: 32m 54s

---

## Outcome

Carrying out the proposed diagonalization does **not** produce a proof of Collatz. It produces something nearly as definitive about this route: a no-go theorem.

The natural \(2\)-adic transfer operator already has a clean spectral gap on regular Haar-wavelet spaces. However, ordinary positive integers cannot be isolated as a nonzero closed subspace of those spaces. On the function side they are Haar-null; on the distribution side, every natural Haar completion containing their point masses also contains point masses at **all** \(2\)-adic integers, including \(2\)-adic Collatz cycles of every period. Consequently, the desired “integer-only spectral gap” cannot exist in a genuinely \(2\)-adic Haar topology.

The argument is exact.

---

# 1. The exact \(2\)-adic normal form

Use the shortcut map

\[
T(x)=
\begin{cases}
x/2,&x\equiv0\pmod2,\\[1mm]
(3x+1)/2,&x\equiv1\pmod2,
\end{cases}
\qquad x\in\mathbb Z_2.
\]

Let

\[
\varepsilon_j(x)=T^j(x)\pmod2
\]

and define the parity map

\[
Q(x)=\sum_{j\geq0}\varepsilon_j(x)2^j.
\]

The map \(Q:\mathbb Z_2\to\mathbb Z_2\) is a bijective \(2\)-adic isometry and satisfies

\[
Q\circ T=S\circ Q,
\]

where \(S\) deletes the least significant binary digit:

\[
S(y)=
\begin{cases}
y/2,&y\text{ even},\\
(y-1)/2,&y\text{ odd}.
\end{cases}
\]

Thus

\[
T=Q^{-1}SQ.
\]

Moreover, every finite binary parity word is realized by an entire residue class modulo the appropriate power of \(2\), and hence by positive integers. citeturn848610view0turn885607view1

Let \(\mu\) be normalized Haar measure on \(\mathbb Z_2\). For a finite binary word \(w=(w_0,\ldots,w_{m-1})\), write

\[
[w]=\{x\in\mathbb Z_2:x_j=w_j,\ 0\leq j<m\}.
\]

Define the normalized Haar wavelet

\[
h_w
=
2^{m/2}
\left(
\mathbf 1_{[w0]}-\mathbf 1_{[w1]}
\right).
\]

Then

\[
\{1\}\cup\{h_w:w\text{ finite}\}
\]

is an orthonormal basis of \(L^2(\mathbb Z_2,\mu)\). Define the Collatz-adapted wavelets

\[
\Psi_w=h_w\circ Q.
\]

Because \(Q\) is an isometry, each \(\Psi_w\) is itself a Haar wavelet on a \(2\)-adic ball, possibly with its sign reversed.

Let the Koopman operator be

\[
\mathcal U f=f\circ T.
\]

Its adjoint, the transfer operator, is

\[
(\mathcal Lf)(y)
=
\frac12 f(2y)
+
\frac12 f\!\left(\frac{2y-1}{3}\right).
\tag{1}
\]

Both inverse expressions in (1) make sense for every \(y\in\mathbb Z_2\), since \(3\) is a unit in \(\mathbb Z_2\).

## Theorem 1: exact Haar action

If \(aw\) denotes the word obtained by prefixing the low-order bit \(a\in\{0,1\}\), then

\[
\boxed{
\mathcal U\Psi_w
=
\frac{\Psi_{0w}+\Psi_{1w}}{\sqrt2}
}
\tag{2}
\]

and

\[
\boxed{
\mathcal L\Psi_{aw}
=
\frac{\Psi_w}{\sqrt2}.
}
\tag{3}
\]

For the root wavelet,

\[
\mathcal L\Psi_{\varnothing}=0,
\]

and, of course,

\[
\mathcal U1=\mathcal L1=1.
\]

### Proof

It suffices to work with \(S\) and the ordinary wavelets. Since \(S\) deletes the first bit,

\[
S^{-1}[wb]=[0wb]\cup[1wb].
\]

Therefore

\[
\begin{aligned}
h_w(Sx)
&=
2^{m/2}
\left(
\mathbf1_{[0w0]}+\mathbf1_{[1w0]}
-\mathbf1_{[0w1]}-\mathbf1_{[1w1]}
\right)\\
&=
\frac{h_{0w}(x)+h_{1w}(x)}{\sqrt2}.
\end{aligned}
\]

This proves (2) after conjugation by \(Q\). Taking adjoints gives (3). ∎

This is the complete wavelet normal form. The operator is not unitarily diagonalizable: on the mean-zero space it is a unilateral-shift-type isometry, and \(\mathcal L\) is its backward shift.

In particular,

\[
\rho\!\left(\mathcal U\bigm|_{L^2_0}\right)
=
\rho\!\left(\mathcal L\bigm|_{L^2_0}\right)
=1.
\tag{4}
\]

So there is no \(L^2\) spectral gap.

---

# 2. There is a genuine gap on regular observables

For \(\alpha>0\), define the Haar–Sobolev norm

\[
\|f\|_{\mathcal H^\alpha}^2
=
\left|\int f\,d\mu\right|^2
+
\sum_w
2^{2\alpha |w|}
\left|\langle f,\Psi_w\rangle\right|^2.
\tag{5}
\]

Write

\[
f=\sum_w c_w\Psi_w
\]

with zero mean. By (3), the coefficient of \(\Psi_w\) in \(\mathcal Lf\) is

\[
d_w=\frac{c_{0w}+c_{1w}}{\sqrt2}.
\]

Hence

\[
|d_w|^2
\leq |c_{0w}|^2+|c_{1w}|^2,
\]

and therefore

\[
\begin{aligned}
\|\mathcal Lf\|_{\mathcal H^\alpha}^2
&\leq
\sum_{m\geq0}
2^{2\alpha m}
\sum_{|w|=m}
\left(|c_{0w}|^2+|c_{1w}|^2\right)\\
&=
2^{-2\alpha}
\sum_{m\geq0}
2^{2\alpha(m+1)}
\sum_{\substack{|v|=m+1}}|c_v|^2\\
&\leq
2^{-2\alpha}\|f\|_{\mathcal H^\alpha}^2.
\end{aligned}
\]

Thus

\[
\boxed{
\|\mathcal Lf\|_{\mathcal H^\alpha}
\leq
2^{-\alpha}\|f\|_{\mathcal H^\alpha}
\qquad
\left(\int f\,d\mu=0\right).
}
\tag{6}
\]

The constant is sharp: applying \(\mathcal L^r\) to \(\mathcal U^r\Psi_w\) gives \(\Psi_w\), while

\[
\|\mathcal U^r\Psi_w\|_{\mathcal H^\alpha}
=
2^{\alpha r}\|\Psi_w\|_{\mathcal H^\alpha}.
\]

Consequently,

\[
\boxed{
\rho\!\left(\mathcal L\bigm|_{\mathcal H^\alpha_0}\right)
=2^{-\alpha}<1.
}
\tag{7}
\]

So the hoped-for spectral gap is not difficult to find. It is already exact.

The problem is that \(\mathcal L\) averages the two \(2\)-adic inverse branches. It describes mixing of regular densities and observables. It does not describe one positive integer following its single forward orbit.

---

# 3. The finite-binary-support subspace does not exist on the function side

The set

\[
\mathbb N_0=\{0,1,2,\ldots\}\subset\mathbb Z_2
\]

is countable, Haar-null, and dense.

Therefore:

\[
\{f\in L^2(\mathbb Z_2):\operatorname{supp}f\subseteq\mathbb N_0\}
=\{0\}.
\tag{8}
\]

For continuous functions the situation is equally rigid. Since both \(\mathbb N_0\) and its complement are dense, a continuous function supported on \(\mathbb N_0\) must vanish identically.

Alternatively, restricting continuous functions to \(\mathbb N_0\) does not produce a smaller function space: because \(\mathbb N_0\) is dense, the restriction map is injective. Any continuous operator identity proved on all positive integers automatically extends to all of \(\mathbb Z_2\).

Thus regular Haar spaces cannot isolate ordinary integers.

---

# 4. The distribution side contains every \(2\)-adic ghost

One might instead represent an ordinary integer \(n\) by the point mass \(\delta_n\). This also fails in every natural diagonal Haar completion.

Consider a general radial Haar-distribution norm

\[
\|\nu\|_{\omega}^2
=
|\langle\nu,1\rangle|^2
+
\sum_{m\geq0}\omega_m
\sum_{|w|=m}
|\langle\nu,\Psi_w\rangle|^2,
\tag{9}
\]

where \(\omega_m>0\).

## Theorem 2: Haar-completion dichotomy

Exactly one of the following happens:

1. If
   \[
   \sum_{m\geq0}\omega_m2^m=\infty,
   \]
   then no point mass \(\delta_x\), including no positive-integer point mass, belongs to the space.

2. If
   \[
   \sum_{m\geq0}\omega_m2^m<\infty,
   \]
   then every \(\delta_x\), for every \(x\in\mathbb Z_2\), belongs to the space; all have the same norm; and
   \[
   x\longmapsto\delta_x
   \]
   is continuous in the \(2\)-adic topology.

### Proof

At each level \(m\), exactly one wavelet \(\Psi_w\) is nonzero at \(x\), and its absolute value is \(2^{m/2}\). Thus

\[
\boxed{
\|\delta_x\|_\omega^2
=
1+\sum_{m\geq0}\omega_m2^m,
}
\tag{10}
\]

independently of \(x\).

Now suppose \(x\equiv y\pmod{2^J}\). Since \(Q\) is an isometry, \(Q(x)\) and \(Q(y)\) also agree in their first \(J\) bits. Therefore the wavelet coefficients of \(\delta_x\) and \(\delta_y\) agree through level \(J-1\), and

\[
\|\delta_x-\delta_y\|_\omega^2
\leq
4\sum_{m\geq J}\omega_m2^m.
\tag{11}
\]

If the series in (10) converges, the right side of (11) tends to zero. ∎

For the negative Haar–Sobolev space \(\mathcal H^{-\alpha}\), one has

\[
\omega_m=2^{-2\alpha m}.
\]

Point masses belong precisely when \(\alpha>\frac12\), and then

\[
\|\delta_x\|_{\mathcal H^{-\alpha}}^2
=
1+\sum_{m\geq0}2^{(1-2\alpha)m}.
\tag{12}
\]

Now let

\[
\mathcal A_+
=
\overline{\operatorname{span}\{\delta_n:n\geq1\}}.
\]

For every \(x\in\mathbb Z_2\), choose positive integers \(n_J\equiv x\pmod{2^J}\). Then \(n_J\to x\) \(2\)-adically, so Theorem 2 gives

\[
\delta_{n_J}\longrightarrow\delta_x.
\]

Hence

\[
\boxed{
\delta_x\in\mathcal A_+
\quad\text{for every }x\in\mathbb Z_2.
}
\tag{13}
\]

The completion of the positive-integer atoms therefore contains every \(2\)-adic ghost orbit.

Every periodic binary sequence is the parity sequence of a unique \(2\)-adic integer, so the \(2\)-adic Collatz map has cycles of every period. citeturn885607view0

If

\[
x_0\longmapsto x_1\longmapsto\cdots
\longmapsto x_{p-1}\longmapsto x_0
\]

is such a cycle and \(\zeta=e^{2\pi i/p}\), then the forward pushforward operator satisfies

\[
T_*
\left(
\sum_{j=0}^{p-1}\zeta^{-\ell j}\delta_{x_j}
\right)
=
\zeta^\ell
\left(
\sum_{j=0}^{p-1}\zeta^{-\ell j}\delta_{x_j}
\right).
\tag{14}
\]

Thus every root of unity occurs in the point spectrum of the completed atomic operator.

Therefore:

\[
\boxed{
\text{No finite-dimensional projection can leave spectral radius }<1.
}
\tag{15}
\]

Removing all \(2\)-adic periodic modes does not help: periodic binary sequences are dense, so their point masses are dense among all point masses. The resulting closed quotient would remove the entire atomic closure.

This is the central obstruction to the proposal.

---

# 5. Explicit positive-integer quasimodes

The ghost fixed point \(-1\) is already enough to see the failure concretely.

Let

\[
n_m=2^m-1.
\]

These are ordinary positive integers with finite binary expansions, and

\[
n_m\longrightarrow-1
\qquad\text{in }\mathbb Z_2.
\]

For \(0\leq j\leq m\),

\[
\boxed{
T^j(n_m)=3^j2^{m-j}-1.
}
\tag{16}
\]

Indeed, as long as the iterate is odd,

\[
T(x)+1=\frac32(x+1),
\]

and \(n_m+1=2^m\).

Thus \(n_m\) shadows the \(2\)-adic fixed point \(-1\) for \(m\) steps while growing by

\[
\frac{T^m(n_m)}{n_m}
=
\frac{3^m-1}{2^m-1}
\sim
\left(\frac32\right)^m.
\tag{17}
\]

Every finite Haar truncation regards \(n_m\) as indistinguishable from \(-1\) once \(m\) exceeds the truncation depth. This is not a rare pathology: every finite parity word, including arbitrarily long repetitions of any supercritical periodic word, is realized by positive integers.

---

# 6. No regular Haar-modulated Lyapunov weight can repair the gap

A natural repair would weight a point mass by an archimedean factor times a \(2\)-adically regular correction:

\[
W(n)=n^\beta e^{u(n)},
\tag{18}
\]

where \(u\in C(\mathbb Z_2)\).

A spectral gap for the forward integer operator would require, for some fixed block length \(r\),

\[
W(T^r n)\leq \rho W(n),
\qquad \rho<1,
\tag{19}
\]

whenever the orbit has not reached \(\{1,2\}\).

## Theorem 3: no continuous Haar correction

For every \(\beta\in\mathbb R\), every continuous \(u:\mathbb Z_2\to\mathbb R\), and every fixed \(r\geq1\),

\[
\boxed{
\sup_n\frac{W(T^r n)}{W(n)}\geq1,
}
\tag{20}
\]

even when the supremum is restricted to positive integers whose first \(r\) iterates avoid \(\{1,2\}\).

### Proof

Take \(n_m=2^m-1\), with \(m>r\). By (16),

\[
T^r(n_m)=3^r2^{m-r}-1.
\]

Both \(n_m\) and \(T^r(n_m)\) tend \(2\)-adically to \(-1\), so

\[
u(T^r n_m)-u(n_m)\longrightarrow0.
\]

In the real metric,

\[
\frac{T^r(n_m)}{n_m}\longrightarrow\left(\frac32\right)^r.
\]

Hence

\[
\lim_{m\to\infty}
\frac{W(T^r n_m)}{W(n_m)}
=
\left(\frac32\right)^{\beta r}.
\tag{21}
\]

Now take

\[
m_k=3\cdot2^k.
\]

For \(k>r\),

\[
T^r(m_k)=3\cdot2^{k-r}.
\]

Both points tend \(2\)-adically to \(0\), and therefore

\[
\lim_{k\to\infty}
\frac{W(T^r m_k)}{W(m_k)}
=
2^{-\beta r}.
\tag{22}
\]

If \(\beta>0\), the limit in (21) exceeds \(1\). If \(\beta<0\), the limit in (22) exceeds \(1\). If \(\beta=0\), both limits equal \(1\). ∎

So a power of the archimedean height multiplied by any bounded or continuous Haar-wavelet potential cannot produce the desired contraction.

A successful weight would have to be violently discontinuous in the \(2\)-adic topology, with singular behavior near ghost periodic orbits. That removes precisely the regularity needed for Haar spectral theory.

---

# 7. A spectral gap on the atomic integer space is equivalent to a stopping-time certificate

Let

\[
C=\{1,2\}
\]

and define the killed forward operator on basis vectors indexed by \(\mathbb N_+\setminus C\):

\[
\mathsf F e_n=
\begin{cases}
e_{T(n)},&T(n)\notin C,\\
0,&T(n)\in C.
\end{cases}
\tag{23}
\]

On unweighted \(\ell^1\),

\[
\|\mathsf F^k\|=1
\qquad\text{for every }k.
\tag{24}
\]

Indeed, \(\|\mathsf F^k\|\leq1\), while

\[
n=3\cdot2^k
\]

satisfies

\[
T^k(n)=3
\]

without hitting \(C\), so equality holds.

Thus even the truth of Collatz would not produce an unweighted spectral gap: stopping times are necessarily unbounded.

For a weight \(W(n)>0\), let

\[
\|a\|_{\ell^1_W}=\sum_n W(n)|a_n|.
\]

Then exactly

\[
\boxed{
\|\mathsf F^k\|_{\ell^1_W}
=
\sup_{\substack{n\\T^j(n)\notin C,\ 1\leq j\leq k}}
\frac{W(T^k n)}{W(n)}.
}
\tag{25}
\]

Consequently, if \(W\) is bounded below and

\[
\rho(\mathsf F)<1,
\]

then every positive integer must reach \(C\). Repeated application of a contracting power would otherwise force \(W(T^{jk}n)\to0\), contradicting its positive lower bound.

Conversely, assuming Collatz, let \(\tau(n)\) be the hitting time of \(C\), fix \(0<\rho<1\), and define

\[
W(n)=\rho^{-\tau(n)}.
\tag{26}
\]

Then

\[
W(Tn)=\rho W(n)
\]

until the orbit is killed, and so

\[
\|\mathsf F\|_{\ell^1_W}\leq\rho.
\tag{27}
\]

Therefore:

\[
\boxed{
\begin{array}{c}
\text{Existence of a contracting atomic weight}\\
\text{is essentially equivalent to the Collatz conjecture itself.}
\end{array}
}
\tag{28}
\]

The Haar diagonalization does not construct this weight; Theorem 3 proves that the most natural Haar-regular candidates cannot do so.

---

# 8. Why the missing information is \(3\)-adic and archimedean

The second inverse branch in (1),

\[
y\longmapsto\frac{2y-1}{3},
\]

is legal for every \(y\in\mathbb Z_2\). But for ordinary integers it is an integer only when

\[
y\equiv2\pmod3.
\tag{29}
\]

This condition cannot be represented by a continuous \(2\)-adic multiplier. Every residue class modulo \(3\) is dense in \(\mathbb Z_2\): given any cylinder modulo \(2^k\) and any class modulo \(3\), the Chinese remainder theorem supplies a positive integer satisfying both conditions.

Thus pure \(2\)-adic Haar analysis necessarily treats many nonintegral inverse branches as legitimate. Likewise, positivity and the order relation \(m<n\) are invisible in the \(2\)-adic topology.

This matches the exact obstruction already isolated in the valuation-word framework. Terminal \(3\)-adic divisibility is controlled by a terminal suffix, but it requires information absent from the \(2\)-adic transfer operator. fileciteturn2file0L17-L28 The pointwise comparison between an original trajectory and a compatible competing ancestor then splits into a terminal \(3\)-adic term and a prefix-dependent archimedean surplus. fileciteturn2file0L155-L188

The remaining all-depth statement is precisely that these two pieces eventually synchronize for any positive integer represented by a stationary retained ray. fileciteturn2file0L252-L266 Haar diagonalization controls neither the terminal integrality selector nor the prefix surplus.

---

# Final verdict

Approach 57 cannot yield a full Collatz proof in its stated form.

The completed analysis proves:

\[
\boxed{
\begin{aligned}
&\text{The Collatz transfer operator has an exact Haar spectral gap}\\
&\text{on regular observables, but that gap is purely statistical.}
\end{aligned}
}
\]

And:

\[
\boxed{
\begin{aligned}
&\text{Every natural Haar completion that contains positive-integer atoms}\\
&\text{also contains all \(2\)-adic atoms and cycles of every period.}
\end{aligned}
}
\]

Therefore there is no nontrivial closed “ordinary positive integer” subspace on which the \(2\)-adic Haar gap could prove pointwise convergence.

A viable repaired operator would have to live on a genuinely mixed state space carrying simultaneously:

\[
\text{\(2\)-adic parity data}
\quad+\quad
\text{\(3\)-adic integrality/carry data}
\quad+\quad
\text{archimedean order or height}.
\]

It would also need a nonuniform local-nilpotence or synchronization theorem rather than an ordinary uniform spectral gap. That repaired target is exactly the all-depth synchronization problem already isolated by the terminal-locality and competing-ancestor machinery; the \(2\)-adic wavelet calculation does not close it.