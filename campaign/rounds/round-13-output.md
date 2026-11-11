model: GPT-5 Pro
round: 13 -- approach 8, Thermodynamic formalism with an arithmetic integrality potential
front: proof
sent: 2026-08-13T18:31:27Z
worked: 38m 57s

---

# Outcome

Carrying this program through does **not** presently yield a valid proof of the Collatz conjecture. It yields something quite sharp instead:

> **No-go theorem.** On the ordinary countable shift of Collatz valuation words, no continuous or summable-variation “integrality potential” can distinguish valuation sequences coming from positive integers from general \(2\)-adic valuation sequences. Moreover, uniqueness of an equilibrium or ground state among invariant probability measures cannot by itself exclude a divergent integer orbit.

The obstruction is exact, not merely technical. The thermodynamic approach can be repaired only by adding a genuinely nonlocal arithmetic lifting condition. The required lifting statement is precisely the unresolved prefix–suffix synchronization theorem already isolated by the affine-compression program.

Below is the full derivation.

---

## 1. Exact symbolic coding

Use the accelerated map on positive odd integers,

\[
U(x)=\frac{3x+1}{2^{\nu _2(3x+1)}}.
\]

Let

\[
a_j=\nu _2(3x_j+1),\qquad x_{j+1}=U(x_j),
\]

so that every orbit gives a valuation sequence

\[
a=(a_0,a_1,\ldots)\in \Sigma:=\mathbb N_{\ge 1}^{\mathbb N}.
\]

For a finite word

\[
w=(a_0,\ldots,a_{n-1}),
\]

put

\[
A_0=0,\qquad A_j=\sum_{i=0}^{j-1}a_i
\]

and

\[
C_0=0,\qquad C_{j+1}=3C_j+2^{A_j}.
\]

Then

\[
C_n=\sum_{j=0}^{n-1}3^{n-1-j}2^{A_j},
\]

and the exact affine identity is

\[
2^{A_n}U^n(x)=3^n x+C_n. \tag{1}
\]

The constants also satisfy

\[
C_{uv}=3^{|v|}C_u+2^{A(u)}C_v. \tag{2}
\]

These are the basic algebraic identities behind every proposed potential. fileciteturn0file7L245-L296

The first crucial arithmetic fact is:

> **Finite realization theorem.** Every finite word \(w\in\mathbb N_{\ge1}^{n}\) is realized as the first \(n\) accelerated valuations of infinitely many positive odd integers.

More precisely, \(w\) determines one odd residue class modulo \(2^{A_n+1}\). It also determines one endpoint class modulo \(3^n\), and every positive odd endpoint in that class has a positive integral inverse ancestor along \(w\). fileciteturn2file1L239-L274

Thus the symbolic system of finite valuation words is the **full countable shift**. Arithmetic positivity does not remove any finite word.

The trivial Collatz cycle is represented by

\[
2^\infty=(2,2,2,\ldots),
\]

because \(U(1)=1\) and \(\nu _2(4)=2\).

---

## 2. The archimedean pressure can be computed exactly

Define the one-step archimedean drift

\[
d(a)=\log 3-a\log 2.
\]

Then

\[
S_nd(w)=n\log 3-A_n\log 2
       =\log \frac{3^n}{2^{A_n}}. \tag{3}
\]

I use the convention that pressure maximizes the potential; a nonnegative “penalty” is therefore subtracted. Reversing all signs gives the energy-minimizing convention.

For the pure drift potential \(t d\), the \(n\)-step partition function is

\[
\begin{aligned}
Z_n(t)
&=\sum_{a_0,\ldots,a_{n-1}\ge1}
  \exp\left(tn\log3-t\log2\sum_{j=0}^{n-1}a_j\right)\\
&=\left(3^t\sum_{a\ge1}2^{-ta}\right)^n\\
&=\left(\frac{3^t}{2^t-1}\right)^n,
\end{aligned}
\]

provided \(t>0\). Hence the Gurevič pressure is

\[
\boxed{
P_{\rm drift}(t)=t\log3-\log(2^t-1).
} \tag{4}
\]

Its equilibrium state is the Bernoulli measure with geometric symbol law

\[
\boxed{
p_t(a)=(2^t-1)2^{-ta}.
} \tag{5}
\]

As \(t\to\infty\),

\[
p_t(1)\longrightarrow1,
\]

so the zero-temperature limit for maximizing archimedean drift is

\[
\delta_{1^\infty},
\]

not \(\delta_{2^\infty}\). The sequence \(1^\infty\) represents the negative \(2\)-adic fixed point \(-1\), since

\[
\frac{3(-1)+1}{2}=-1.
\]

If instead one minimizes \(d\), there is no minimizing symbol: \(d(a)\to-\infty\) as \(a\to\infty\). Thus the archimedean term by itself selects either the wrong boundary point or no ground state at all.

There is also a drift-neutral positive-entropy equilibrium. Writing

\[
\alpha=\log_2 3,
\]

we have

\[
P'_{\rm drift}(t)
=
\log3-\frac{\log2}{1-2^{-t}}.
\]

At the unique \(t=t_*\) satisfying

\[
2^{-t_*}=1-\frac1\alpha,
\]

the equilibrium state has

\[
\int a_0\,d\mu_{t_*}=\alpha,
\qquad
\int d(a_0)\,d\mu_{t_*}=0.
\]

So even at exactly critical average drift, the full shift has a nontrivial equilibrium with positive entropy. The drift condition alone leaves exponentially many candidate words.

Countable-alphabet zero-temperature results normally require hypotheses such as finite pressure, bounded or summable variation, summability or coercivity. Escape of mass is a separate issue handled by pressure at infinity. citeturn934661view0turn934661view1turn934661view2

---

## 3. The natural “integrality cost” is only a cylinder-density cost

Because a word \(w\) determines one odd residue class modulo \(2^{A_n+1}\), its conditional \(2\)-adic Haar probability among odd integers is

\[
\mathbb P([w])=2^{-A_n}. \tag{6}
\]

The natural information or integrality cost is therefore

\[
-\log \mathbb P([w])=A_n\log2.
\]

Adding this cost gives the finite-volume partition sum

\[
\begin{aligned}
Z_n^{\rm Haar}(t)
&=
\sum_{|w|=n}
e^{tS_nd(w)}2^{-A_n(w)}\\
&=
\left(
3^t\sum_{a\ge1}2^{-(t+1)a}
\right)^n\\
&=
\left(
\frac{3^t}{2^{t+1}-1}
\right)^n.
\end{aligned}
\]

Thus

\[
\boxed{
P_{\rm Haar}(t)
=t\log3-\log(2^{t+1}-1).
} \tag{7}
\]

In particular,

\[
P_{\rm Haar}(0)=0,
\qquad
P_{\rm Haar}(1)=0.
\]

At \(t=0\), the equilibrium law is

\[
p(a)=2^{-a},
\]

with

\[
\mathbb E[a]=2,\qquad
\mathbb E[d(a)]=\log3-2\log2=\log\frac34<0.
\]

This recovers the familiar stochastic contraction heuristic. But it does not distinguish genuine positive integers from generic \(2\)-adic points: it assigns a density to every cylinder, and every cylinder is arithmetically realizable.

---

## 4. No continuous arithmetic-integrality potential exists

Here is the decisive obstruction.

### Theorem 1 — Density obstruction

Let

\[
\mathcal P
=
\{a(x):x\text{ is a positive odd integer}\}
\subseteq\Sigma
\]

be the set of infinite valuation sequences of positive integers. Then \(\mathcal P\) is dense in \(\Sigma\).

Consequently, if

\[
I:\Sigma\longrightarrow[0,\infty]
\]

is lower semicontinuous and satisfies

\[
I(a(x))=0
\qquad
\text{for every positive odd integer }x,
\]

then

\[
\boxed{I\equiv0.}
\]

#### Proof

Every nonempty open set in the product topology contains a cylinder

\[
[w]=\{a\in\Sigma:(a_0,\ldots,a_{n-1})=w\}.
\]

Every finite word \(w\) is realized by a positive odd integer. Therefore

\[
[w]\cap\mathcal P\ne\varnothing,
\]

so \(\mathcal P\) is dense.

Suppose \(I(a)>0\). Choose \(c\) with \(0<c<I(a)\). Lower semicontinuity implies that

\[
\{b:I(b)>c\}
\]

is an open neighborhood of \(a\). It must intersect the dense set \(\mathcal P\), contradicting \(I=0\) on \(\mathcal P\). Hence \(I\equiv0\). ∎

This applies in particular to continuous, Hölder, Walters and summable-variation potentials.

It also gives an even simpler finite-horizon conclusion:

> Any finite-word penalty which is zero precisely when the word is realizable by a positive integer is identically zero, because every finite valuation word is realizable.

So “integrality” cannot mean finite realizability.

### What integrality actually means

For an infinite word, let \(R_n\) be the least nonnegative representative of its seed residue class modulo \(2^{A_n+1}\). Then

\[
R_{n+1}\equiv R_n\pmod{2^{A_n+1}}
\]

and \(R_n\) is nondecreasing.

The infinite word represents a nonnegative ordinary integer precisely when

\[
\boxed{
R_n\text{ is eventually constant}.
} \tag{8}
\]

This is the exact ordinary-integrality criterion. fileciteturn2file1L386-L406

But eventual stabilization is a discontinuous tail property. Every cylinder contains both:

* sequences whose \(R_n\) eventually stabilize at a positive integer;
* sequences whose \(R_n\) continue changing forever and represent nonintegral \(2\)-adic points.

The exact indicator

\[
I_\infty(a)=
\begin{cases}
0,&R_n\text{ is eventually constant},\\
1,&\text{otherwise},
\end{cases}
\]

is therefore nowhere compatible with the usual regularity assumptions of Ruelle–Perron–Frobenius or zero-temperature theory.

This is the first place where the proposed proof fails.

---

## 5. The carry term is local, but descent is not

The terminal \(3\)-adic information is exceptionally well behaved.

If \(w=u\tau\) and \(\tau\) has length \(r\), then every endpoint \(X\) obtained along \(w\) satisfies

\[
X\equiv 2^{-A(\tau)}C_\tau\pmod{3^r}.
\]

Consequently,

\[
\boxed{
\nu _3(X+1)\ge r
\iff
3^r\mid C_\tau+2^{A(\tau)}.
} \tag{9}
\]

Thus the depth-\(r\) endpoint carry is determined entirely by the final \(r\) valuations. fileciteturn0file7L269-L296

This suggests a local carry potential. The problem appears when one asks whether a compatible inverse branch gives an actual smaller positive ancestor.

Suppose a word is split as

\[
w=u\tau,
\]

where

\[
|u|=d,\quad A(u)=P,
\qquad
|\tau|=k,\quad A(\tau)=T.
\]

Let \(R\) be the least positive realization, let

\[
Z=U^d(R),
\]

and compare \(\tau\) with another length-\(k\) word \(b\) of exponent sum \(B\). Put

\[
c=T-B.
\]

The terminal compatible fibre is

\[
\mathcal F(\tau,B)
=
\left\{
b:
|b|=k,\ A(b)=B,\
C_b\equiv2^{-c}C_\tau\pmod{3^k}
\right\}. \tag{10}
\]

For \(b\in\mathcal F(\tau,B)\), define the terminal carry centre

\[
h(\tau,b)
=
\frac{C_\tau-2^cC_b}{3^k}. \tag{11}
\]

If \(Y\) is the competing ancestor, then

\[
Z+h(\tau,b)=2^cY.
\]

Define the prefix surplus

\[
\Sigma(u,\tau,c)=Z-2^cR. \tag{12}
\]

Subtracting gives the exact comparison

\[
\boxed{
Y-R=
\frac{\Sigma(u,\tau,c)+h(\tau,b)}{2^c}.
} \tag{13}
\]

The \(3\)-adic compatibility and \(h\) are terminal. The sign determining whether \(Y<R\) contains the full-prefix term \(\Sigma\). This is the precise local–global obstruction. fileciteturn2file0L32-L120

Therefore a bounded-range carry potential can detect:

* whether an alternative inverse branch is integral;
* the associated terminal carry;
* its asymptotic exponent saving.

It cannot, without a new theorem, determine whether that branch is positive and smaller for the **particular ordinary integer** represented by the entire prefix.

The explicit length-\(42\) strict-barrier word with optimal descent cutoff \(814\) makes this nonlocality quantitative: every proposed competitor with cutoff at most \(813\) fails, while one works at \(814\). fileciteturn1file4L580-L645

There is an additional boundary obstruction. The periodic word

\[
(1,1,2)^\infty
\]

is retained by the Bellman optimization at every finite depth, but represents

\[
-\frac{19}{11}
\]

rather than a positive integer. fileciteturn2file1L407-L418

So even an infinite word with zero local Bellman/carry defect need not be an ordinary positive point.

---

## 6. Exact periodic ground states

Let \(w\) be a word of length \(m\), total exponent \(A\), and affine constant \(C_w\). If \(w^\infty\) represents a periodic point \(x\), then (1) gives

\[
2^A x=3^m x+C_w.
\]

Hence

\[
\boxed{
x=\frac{C_w}{2^A-3^m}.
} \tag{14}
\]

A positive Collatz cycle exists exactly when:

\[
2^A>3^m,
\]

\[
2^A-3^m\mid C_w,
\]

the quotient is a positive odd integer, and the valuations are exact.

The trivial word \(w=(2)\) gives

\[
x=\frac1{4-3}=1.
\]

The spurious periodic word \(w=(1,1,2)\) has \(A=4\), \(m=3\), and \(C_w=19\), giving

\[
x=\frac{19}{16-27}=-\frac{19}{11}.
\]

One can certainly define a periodic arithmetic penalty \(J(w)\) which is zero exactly when all the conditions following (14) hold. But then proving that the only zero-penalty periodic word is \(2^m\) is **exactly the nontrivial-cycle part of the Collatz conjecture**. Thermodynamic formalism has not simplified that arithmetic classification; it has merely renamed it as uniqueness of a periodic ground state.

---

## 7. Ground-state uniqueness does not exclude divergence

There is a second, logically separate problem.

### Theorem 2 — Invariant measures see cycles, not wandering orbits

For a deterministic map on a countable discrete state space, every invariant probability measure is supported on periodic orbits.

#### Proof

By Poincaré recurrence, almost every point with respect to an invariant probability is recurrent. In a discrete space, recurrence means that the orbit returns exactly to the starting point, hence the point is periodic. ∎

Therefore, on the actual positive-integer Collatz system, classifying invariant probability measures can classify cycles. It cannot detect a divergent orbit, because a divergent orbit is wandering and supports no invariant probability measure.

The logical gap is visible in the elementary map

\[
F(0)=0,\qquad F(n)=n+1\quad(n\ge1).
\]

Its only invariant probability is \(\delta_0\), but every orbit beginning at \(n\ge1\) diverges. Thus

\[
\text{unique invariant ground state}
\centernot\Longrightarrow
\text{every orbit reaches it}. \tag{15}
\]

This remains true regardless of how convincingly the ground state is characterized.

---

## 8. What a divergent Collatz orbit would produce symbolically

A divergent Collatz orbit does nevertheless produce a useful statistical object.

### Theorem 3 — Critical invariant blueprint

Suppose \(x_0,x_1,\ldots\) is a divergent accelerated Collatz orbit, and let \(a_j\) be its valuation sequence. Then there exists a shift-invariant probability measure \(\nu\) on \(\Sigma\), obtained as a subsequential cylinder limit of the empirical measures

\[
\nu_N=\frac1N\sum_{j=0}^{N-1}\delta_{\sigma^j a},
\]

such that

\[
\boxed{
\int a_0\,d\nu\le\log_2 3.
} \tag{16}
\]

Equivalently,

\[
\boxed{
\int d(a_0)\,d\nu\ge0.
} \tag{17}
\]

#### Proof

The exact recurrence gives

\[
x_{j+1}
=
\frac{3x_j+1}{2^{a_j}},
\]

and hence

\[
\log x_{j+1}-\log x_j
=
\log3-a_j\log2
+\log\left(1+\frac1{3x_j}\right).
\]

Summing from \(j=0\) to \(N-1\),

\[
A_N\log2
=
N\log3+\log x_0-\log x_N
+\sum_{j=0}^{N-1}
\log\left(1+\frac1{3x_j}\right). \tag{18}
\]

A nonperiodic integer orbit consists of distinct integers, so divergence implies \(x_j\to\infty\). Therefore

\[
\frac1N
\sum_{j=0}^{N-1}
\log\left(1+\frac1{3x_j}\right)
\longrightarrow0.
\]

Since \(-\log x_N\le0\), equation (18) gives

\[
\limsup_{N\to\infty}\frac{A_N}{N}
\le\log_2 3. \tag{19}
\]

For each fixed finite coordinate block, (19) gives tightness of its empirical distributions. A diagonal subsequence therefore converges on all cylinders to a probability measure \(\nu\). For every bounded cylinder function \(f\),

\[
\int f\circ\sigma\,d\nu_N-\int f\,d\nu_N
=
\frac{f(\sigma^Na)-f(a)}N\longrightarrow0,
\]

so \(\nu\) is shift-invariant.

Applying the convergence to the bounded truncations

\[
\min(a_0,M)
\]

and then letting \(M\to\infty\) gives (16). Equation (17) follows. ∎

This is very close to the “statistical blueprint” anticipated in the proposed approach.

But it does not solve the lifting problem. The limiting measure may be supported on symbolic or \(2\)-adic boundary sequences which are not codes of ordinary positive integers. Because positive-integer codes are dense but not closed, the property “comes from an ordinary integer” disappears under weak or cylinder limits.

Conversely, an abstract critical equilibrium state need not possess any generic point whose nested seed representatives eventually stabilize at one positive integer.

Thus the implications are only

\[
\text{divergent positive orbit}
\Longrightarrow
\text{critical invariant symbolic measure},
\]

but not

\[
\text{critical invariant symbolic measure}
\Longrightarrow
\text{divergent positive orbit}. \tag{20}
\]

The missing reverse implication is an arithmetic projective-lifting theorem.

---

## 9. The exact theorem that would complete the approach

Define the arithmetic ground-state set \(\mathcal A\) to consist of infinite valuation words which remain Bellman-optimal against all positive compatible inverse ancestors at every depth.

The desired theorem would be

\[
\boxed{
\mathcal A
\cap
\{a:R_n(a)\text{ is eventually a positive integer}\}
=
\{2^\infty\}.
} \tag{21}
\]

In the local–global notation, a usable form is:

> **Arithmetic synchronization theorem.**  
> Let \(a\) be an infinite valuation word whose seed representatives \(R_n\) eventually stabilize at a positive odd integer \(m>1\). Suppose \(m\) is no larger than every positive integer whose orbit coalesces with a later point of the orbit of \(m\). Then there exist a decomposition \(w=u\tau\), an exponent saving \(c\ge1\), and a compatible word \(b\in\mathcal F(\tau,A(\tau)-c)\) such that
> \[
> Z+h(\tau,b)>0
> \]
> and
> \[
> \Sigma(u,\tau,c)+h(\tau,b)<0.
> \tag{22}
> \]
> Consequently the corresponding inverse ancestor satisfies
> \[
> 0<Y<m.
> \]

### Why this proves Collatz

Assume Collatz is false and choose the least positive odd counterexample \(m\).

Its valuation word has seed representatives eventually equal to \(m\), because once

\[
2^{A_n+1}>m,
\]

the least representative of the seed class is \(m\) itself.

Every positive integer whose orbit coalesces with the orbit of \(m\) must be at least \(m\); otherwise that smaller integer would reach \(1\), forcing the orbit of \(m\) to reach \(1\) as well.

The synchronization theorem would produce a positive coalescing ancestor \(Y<m\), a contradiction. Therefore no least counterexample exists, and every positive integer reaches \(1\).

That conditional proof is complete. The unresolved step is exactly the synchronization theorem.

The existing compression framework reaches the same frontier: a carry-synchronization theorem would handle one recurrent finite subsystem, but a separate global input-synchronization theorem is still needed to couple eventual positive \(2\)-adic stabilization to \(3\)-adic endpoint compressibility. fileciteturn2file2L888-L907

Thermodynamic terminology does not remove this step. Statement (21) is precisely “the only arithmetically liftable Aubry/ground state is \(2^\infty\).” Proving it is the substantive Collatz theorem.

---

## 10. Why a discontinuous zero-temperature potential does not fix the problem

One could define formally

\[
I_\infty(a)
=
\mathbf 1_{\{R_n\text{ does not eventually stabilize}\}}
\]

and

\[
K_\infty(a)
=
\mathbf 1_{\{a\text{ remains Bellman-geodesic forever}\}}.
\]

Then one could build an “energy”

\[
E(a)
=
-\limsup_{n\to\infty}\frac1nS_nd(a)
+\lambda I_\infty(a)
-\mu K_\infty(a).
\]

But this does not constitute a proof:

1. \(I_\infty\) and \(K_\infty\) are highly discontinuous tail functions.
2. Standard transfer-operator, pressure and zero-temperature theorems no longer apply.
3. Establishing that the only zero-energy arithmetically integral state is \(2^\infty\) is exactly statement (21).

In other words, one can always construct a formal potential whose ground-state classification is equivalent to Collatz. The difficulty is proving that classification from independently checkable local or spectral properties.

---

## 11. Audit of a recent thermodynamic-formalism claim

I also checked a very recent August 2026 preprint using closely related topological and equilibrium-state language. It claims that a broad class of maps

\[
g(n)=
\begin{cases}
g_0(n),&n\text{ odd},\\
n/2,&n\text{ even},
\end{cases}
\]

where \(g_0(n)\) may be **any even number**, has no divergent orbit. citeturn634631view0

That statement has an immediate counterexample:

\[
g(n)=
\begin{cases}
2(n+2),&n\text{ odd},\\
n/2,&n\text{ even}.
\end{cases}
\]

For odd \(n\),

\[
n\longmapsto2(n+2)\longmapsto n+2.
\]

Thus

\[
1\longmapsto6\longmapsto3\longmapsto10
\longmapsto5\longmapsto14\longmapsto7\longmapsto\cdots
\]

is divergent.

The precise gap occurs in the argument that, for the indicator of a forward-invariant orbit set \(A_k\), existence of an equilibrium state implies an equilibrium measure with positive mass on \(A_k\). It does not. If \(A_k\) is a wandering divergent orbit containing no cycle, every invariant probability may assign it mass zero; then the pressure of its indicator is zero and a cycle measure outside \(A_k\) can still be an equilibrium state. The paper asserts positive mass without establishing it, and its subsequent no-divergence lemma depends on that step. citeturn965186view2turn965186view1

So that preprint does not supply the missing divergence theorem.

---

# Final verdict

The proposed thermodynamic program produces three rigorous conclusions:

1. The archimedean pressure and its equilibrium states are explicitly computable, but their zero-temperature limit selects the spurious \(2\)-adic word \(1^\infty\), not the positive trivial cycle \(2^\infty\).

2. Any regular integrality potential vanishing on positive-integer codes is identically zero, because positive-integer valuation codes are dense in the full shift. Exact ordinary integrality is the discontinuous condition that the nested \(2\)-adic representatives eventually stabilize.

3. Terminal carry compatibility is local, but actual descent is governed by the nonlocal score
   \[
   \Sigma(u,\tau,c)+h(\tau,b).
   \]
   Excluding all positive stationary Bellman-geodesic rays other than \(2^\infty\) is the unresolved arithmetic synchronization theorem.

Therefore this route, **as stated**, does not complete a proof of Collatz. Its strongest valid outcome is a no-go theorem for ordinary continuous thermodynamic formalism and a precise identification of the theorem a nonstandard arithmetic thermodynamic theory would have to prove.