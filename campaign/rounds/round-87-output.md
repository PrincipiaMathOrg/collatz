model: GPT-5.6 Pro (Chat mode)
round: 87 -- approach 82, Uniform large deviations for realizable paths
front: proof
sent: 2026-08-17T05:44Z
worked: 38m 26s

---

# Outcome

The proposed approach yields a **sharp, exact, residue-uniform large-deviation theorem**, but it does **not** yield a full proof of the Collatz conjecture. The intended final upgrade—from “an exponentially small proportion of paths are bad” to “no individual positive integer follows a bad path”—is invalid.

The obstruction is definitive:

1. Every finite binary parity word is realized by a positive integer.
2. More strongly, after conditioning on **any** initial residue class, every possible future parity word occurs exactly once among the appropriate residue-class refinements.
3. Thus “realizable finite paths” are not a thinner subset of random paths; they are the full binary shift.
4. An exponentially small nested family of cylinders may contain a single infinite path.
5. The additional affine carry can keep an orbit above its starting value even after its multiplicative coefficient has become contracting.

As of the July 6, 2026 revision of Tao’s work, the strongest theorem remains an almost-all almost-boundedness result rather than a pointwise theorem. The paper also explains why average descent cannot simply be iterated: the transported values may concentrate in a thin exceptional set. citeturn529440view1

What follows proves the strongest valid theorem supplied by approach 82 and then proves precisely why it cannot close Collatz by itself.

---

## 1. The shortcut map and its affine formula

Use the shortcut Collatz map

\[
T(n)=
\begin{cases}
n/2,&n\equiv0\pmod 2,\\[1mm]
(3n+1)/2,&n\equiv1\pmod 2.
\end{cases}
\]

For \(j\geq0\), put

\[
\varepsilon_j(n)=T^j(n)\pmod 2,
\qquad
s_j(n)=\sum_{i=0}^{j-1}\varepsilon_i(n).
\]

For a prescribed parity word

\[
w=(\varepsilon_0,\ldots,\varepsilon_{k-1})\in\{0,1\}^k,
\]

define \(c_0=0\) and recursively

\[
c_{j+1}=3^{\varepsilon_j}c_j+\varepsilon_j2^j.
\]

A direct induction gives

\[
\boxed{
T^j(n)=\frac{3^{s_j}n+c_j}{2^j}.
}
\tag{1}
\]

The multiplicative coefficient over the first \(j\) steps is therefore

\[
q_j(w)=\frac{3^{s_j}}{2^j}.
\]

Its logarithm is

\[
L_j(w)=s_j\log 3-j\log 2.
\tag{2}
\]

For a uniformly random binary word, the expected one-step logarithmic increment is

\[
\frac12\log3-\log2
=
-\log\frac{2}{\sqrt3}.
\]

Thus the mean drift is negative, with

\[
\delta_0=\log\frac{2}{\sqrt3}
       =0.1438410362\ldots.
\tag{3}
\]

---

# 2. Every finite parity word is realizable

The following theorem gives considerably more than mere realizability.

## Theorem 1: Exact conditional parity uniformity

Let \(m,k\geq0\), and let \(r\) be any residue class modulo \(2^m\). Among the \(2^k\) residue classes

\[
n\pmod {2^{m+k}}
\qquad\text{with}\qquad
n\equiv r\pmod {2^m},
\]

the future block

\[
\bigl(\varepsilon_m(n),\ldots,\varepsilon_{m+k-1}(n)\bigr)
\]

takes every value in \(\{0,1\}^k\) exactly once.

Consequently, conditional on any initial residue class modulo \(2^m\), the next \(k\) parity bits are exactly independent fair Bernoulli variables when the \(2^k\) residue-class extensions are sampled uniformly.

### Proof

First observe that the first \(\ell\) parity bits depend only on \(n\bmod 2^\ell\). Indeed, if

\[
x\equiv y\pmod {2^\ell},
\]

then \(x\) and \(y\) have the same parity. After applying the appropriate common branch of \(T\), their images are congruent modulo \(2^{\ell-1}\). Repeating proves the assertion.

We now prove by induction that every word of length \(\ell\) is realized by exactly one residue class modulo \(2^\ell\).

For \(\ell=1\), the two words \(0\) and \(1\) correspond to the even and odd residue classes.

Suppose a word \(w\) of length \(\ell\) corresponds to the unique class

\[
n\equiv r_w\pmod {2^\ell}.
\]

Its two lifts modulo \(2^{\ell+1}\) are

\[
r_w
\quad\text{and}\quad
r_w+2^\ell.
\]

They have the same first \(\ell\) parity bits. By the affine formula (1),

\[
T^\ell(r_w+2^\ell)-T^\ell(r_w)
=
3^{s_\ell(w)}.
\]

The right-hand side is odd. Hence the two \(\ell\)-th iterates have opposite parity. One lift realizes \(w0\), and the other realizes \(w1\). This proves the induction.

Now fix \(r\bmod2^m\). It has one fixed parity prefix of length \(m\). Concatenating that prefix with any word \(u\in\{0,1\}^k\) gives a word of length \(m+k\), and hence one residue class modulo \(2^{m+k}\). Its reduction modulo \(2^m\) must be \(r\), by uniqueness of the length-\(m\) prefix class.

Therefore the map from the \(2^k\) extensions of \(r\) to the \(2^k\) future words is bijective. ∎

This theorem is the finite-level form of the classical \(2\)-adic parity conjugacy: the finite parity encoding is a permutation modulo \(2^k\). citeturn369209search2

### Crucial consequence

There is no finite-horizon arithmetic thinning of parity words:

\[
\boxed{\text{finite realizable parity words}=\{0,1\}^k.}
\]

This remains true after conditioning on every possible initial residue.

Thus the proposed “subset of realizable words” is, at every finite depth, the entire random-word space.

---

# 3. The exact uniform large-deviation theorem

For a future block beginning at time \(m\), define

\[
S_{m,k}(n)
=
\sum_{i=m}^{m+k-1}\varepsilon_i(n)
\]

and

\[
L_{m,k}(n)
=
S_{m,k}(n)\log3-k\log2.
\tag{4}
\]

The corresponding multiplicative coefficient is

\[
\exp L_{m,k}(n)
=
\frac{3^{S_{m,k}(n)}}{2^k}.
\]

Fix \(0\leq\eta<\delta_0\), and set

\[
\alpha_\eta
=
\frac{\log2-\eta}{\log3}.
\tag{5}
\]

Because \(\eta<\delta_0\), one has \(\alpha_\eta>1/2\).

Let

\[
D(\alpha\Vert\tfrac12)
=
\alpha\log(2\alpha)
+
(1-\alpha)\log\bigl(2(1-\alpha)\bigr)
\tag{6}
\]

be the binary relative entropy.

## Theorem 2: Uniform realizable-path large deviations

For every \(m,k\geq0\), every residue \(r\bmod2^m\), and every \(0\leq\eta<\delta_0\),

\[
\begin{aligned}
&2^{-k}
\#\Bigl\{
n\bmod2^{m+k}:
n\equiv r\pmod{2^m},\
L_{m,k}(n)\geq-\eta k
\Bigr\}\\
&\hspace{35mm}
=
\mathbb P\!\left(
\operatorname{Bin}(k,\tfrac12)
\geq\alpha_\eta k
\right)\\
&\hspace{35mm}
\leq
\exp\!\left(
-kD(\alpha_\eta\Vert\tfrac12)
\right).
\end{aligned}
\tag{7}
\]

Every constant in (7) is independent of \(m\), \(r\), and the preceding orbit segment.

### Proof

By Theorem 1, the future parity block is uniformly distributed over \(\{0,1\}^k\). Hence \(S_{m,k}\) has exactly the binomial distribution \(\operatorname{Bin}(k,1/2)\).

The inequality

\[
L_{m,k}\geq-\eta k
\]

is equivalent to

\[
S_{m,k}\log3-k\log2\geq-\eta k,
\]

or

\[
S_{m,k}\geq\alpha_\eta k.
\]

The usual exponential-moment argument gives

\[
\mathbb P\!\left(
\operatorname{Bin}(k,\tfrac12)\geq\alpha k
\right)
\leq
e^{-kD(\alpha\Vert1/2)}
\]

for \(\alpha>1/2\), proving (7). ∎

## The critical noncontraction rate

At \(\eta=0\),

\[
\alpha_0=\frac{\log2}{\log3}
         =0.6309297536\ldots,
\]

and

\[
\boxed{
I_0
=
D\!\left(
\frac{\log2}{\log3}\,\middle\Vert\,\frac12
\right)
=
0.03468818523201744\ldots.
}
\tag{8}
\]

Therefore, uniformly in every initial residue,

\[
\boxed{
\mathbb P\left(
\frac{3^{S_{m,k}}}{2^k}\geq1
\right)
\leq
e^{-I_0k}.
}
\tag{9}
\]

This exponential rate is sharp up to polynomial factors. Indeed, Stirling’s formula gives

\[
2^{-k}
\sum_{j\geq\lceil\alpha_0k\rceil}
\binom{k}{j}
=
\exp\bigl(-I_0k+O(\log k)\bigr).
\tag{10}
\]

Thus finite realizability cannot improve the exponential rate: the realizable words have exactly the same distribution as all random words.

---

## 4. Uniformity over ordinary integer intervals

The exact statement above samples residue-class extensions. It has an immediate ordinary-integer version.

Let \(N\) be uniformly distributed on

\[
\{1\leq n\leq X:n\equiv r\pmod {2^m}\}.
\]

Each refinement modulo \(2^{m+k}\) contains either the floor or the ceiling of its expected number of elements. Hence, uniformly in \(r\),

\[
d_{\mathrm{TV}}\left(
(\varepsilon_m(N),\ldots,\varepsilon_{m+k-1}(N)),
\operatorname{Bernoulli}(\tfrac12)^k
\right)
\ll
\min\left\{1,\frac{2^{m+k}}{X}\right\}.
\tag{11}
\]

Consequently,

\[
\mathbb P\bigl(L_{m,k}(N)\geq-\eta k\bigr)
\leq
e^{-D(\alpha_\eta\Vert1/2)k}
+
O\!\left(
\min\left\{1,\frac{2^{m+k}}{X}\right\}
\right).
\tag{12}
\]

This displays the exact entropy frontier:

\[
m+k\ll\log_2X
\]

leaves many representatives in every refined cylinder, whereas

\[
m+k\approx\log_2X
\]

leaves only one or a few integers. At that point the error term becomes \(O(1)\), because the conditional distribution has become atomic.

No improvement in Chernoff bounds can remove this atomic obstruction.

---

# 5. Odd-only Syracuse formulation

The same phenomenon appears for the accelerated odd map

\[
U(n)=\frac{3n+1}{2^{\nu_2(3n+1)}}.
\]

Put

\[
a_j(n)=\nu_2\bigl(3U^{j-1}(n)+1\bigr),
\qquad
A_k(n)=\sum_{j=1}^ka_j(n).
\]

The multiplicative coefficient after \(k\) odd steps is

\[
\frac{3^k}{2^{A_k}}.
\]

After conditioning on any finite valuation prefix, the unexplored valuation variables are exactly geometric under normalized \(2\)-adic Haar measure:

\[
\mathbb P(a_j=t)=2^{-t},
\qquad t=1,2,\ldots.
\]

This exact regeneration is the arithmetic basis of the geometric random model used in Tao’s argument. citeturn158955view2turn158955view3turn158955view4

For \(1<\beta<2\), Chernoff’s inequality gives

\[
\mathbb P(A_k\leq\beta k)
\leq e^{-J(\beta)k},
\tag{13}
\]

where

\[
J(\beta)
=
(\beta-1)
\log\frac{2(\beta-1)}{\beta}
+
\log\frac2\beta.
\tag{14}
\]

The noncontracting threshold is

\[
\beta_0=\log_2 3=1.5849625007\ldots,
\]

and

\[
J(\beta_0)=0.05497947281\ldots.
\tag{15}
\]

Thus both standard encodings give strong, exact, prefix-uniform large deviations. The problem is not proving the probabilistic estimate.

---

# 6. Why this does not apply to every individual integer

A large-deviation estimate is a statement about the **proportion** of elements in a sample space. A fixed positive integer is one atom, so its bad-event indicator is either \(0\) or \(1\).

A hypothetical pointwise estimate such as

\[
\mathbf 1_{\{L_{0,k}(n)\geq0\}}
\leq
Ce^{-ck}
\qquad
\text{for every }n,k
\tag{16}
\]

would force the event to be empty once \(Ce^{-ck}<1\). But it is never empty.

## Explicit arbitrarily long rising paths

For every \(k\geq1\), let

\[
n_k=2^k-1.
\]

Then, for \(0\leq j\leq k\),

\[
\boxed{
T^j(n_k)=3^j2^{k-j}-1.
}
\tag{17}
\]

For \(j<k\), this value is odd, so the first \(k\) parity bits are all \(1\). Moreover, for \(1\leq j\leq k\),

\[
T^j(n_k)-n_k
=
2^{k-j}(3^j-2^j)>0.
\tag{18}
\]

Thus \(n_k\) remains strictly above its starting value for at least \(k\) steps.

This is not a counterexample to Collatz: the starting integer changes with \(k\). It proves, however, that no horizon uniform in all starting integers can force descent.

---

## Exponentially small nested cylinders need not disappear

Let

\[
\mathcal C_k
=
\{x\in\mathbb Z_2:
\varepsilon_0(x)=\cdots=\varepsilon_{k-1}(x)=1\}.
\]

Then

\[
\mu_{\mathrm{Haar}}(\mathcal C_k)=2^{-k},
\]

and

\[
\mathcal C_{k+1}\subseteq\mathcal C_k.
\]

Their intersection is the \(2\)-adic integer \(-1\), since

\[
-1\equiv2^k-1\pmod {2^k}
\]

for every \(k\), and

\[
T(-1)=\frac{3(-1)+1}{2}=-1.
\]

Therefore

\[
\mu_{\mathrm{Haar}}(\mathcal C_k)\longrightarrow0
\]

exponentially, while

\[
\bigcap_{k\geq1}\mathcal C_k=\{-1\}\neq\varnothing.
\tag{19}
\]

This is the exact model for the logical problem. Large deviations can prove that the surviving cylinders have vanishing measure, but Collatz requires proving that no surviving nested cylinder has an **ordinary positive integer** as its intersection.

The large-deviation estimate has no mechanism for distinguishing the \(2\)-adic point \(-1\) from a hypothetical exceptional positive integer.

---

## The numerical size of the gap

At depth \(k\), the bound (9) permits as many as

\[
2^ke^{-I_0k}
=
\exp\bigl((\log2-I_0)k\bigr)
\]

noncontracting words. Numerically,

\[
2e^{-I_0}=1.9318131065\ldots.
\]

Thus the estimate still permits roughly

\[
1.9318^k
\]

bad words at depth \(k\).

In dimension language, their possible exponential dimension is

\[
1-\frac{I_0}{\log2}
=
0.9499555272\ldots.
\tag{20}
\]

The large-deviation result is strong as a density statement, but extremely far from an emptiness statement.

Indeed, to force a union of length-\(k\) cylinders to be empty solely from its measure, one would need an upper bound smaller than the measure \(2^{-k}\) of one cylinder. That would require an exponent greater than \(\log2\), whereas the sharp exponent here is only

\[
I_0=0.034688\ldots\ll\log2=0.693147\ldots.
\]

---

# 7. The affine carry creates a second obstruction

Even noncontraction of the multiplicative coefficient is not the same as failure to descend.

From (1),

\[
T^j(n)-n
=
\frac{
c_j-\bigl(2^j-3^{s_j}\bigr)n
}{2^j}.
\tag{21}
\]

When

\[
3^{s_j}\geq2^j,
\]

the multiplicative part alone is noncontracting.

But when

\[
3^{s_j}<2^j,
\]

the orbit may still satisfy \(T^j(n)\geq n\) if

\[
\boxed{
c_j\geq
\bigl(2^j-3^{s_j}\bigr)n.
}
\tag{22}
\]

Thus negative multiplicative drift does not itself force descent. The positive affine carry can rescue the endpoint.

For a fixed word \(w\) of length \(j\), let \(q=|w|_1\), and let \(r_w\) be its residue representative modulo \(2^j\). Every positive integer realizing \(w\) is of the form

\[
n=r_w+2^j\ell.
\]

The affine formula gives

\[
T^j(r_w+2^j\ell)
=
T^j(r_w)+3^q\ell.
\]

Hence

\[
\boxed{
T^j(n)-n
=
T^j(r_w)-r_w
-
(2^j-3^q)\ell.
}
\tag{23}
\]

When \(3^q<2^j\), the larger representatives in the cylinder eventually descend, but its smallest representatives may still be rescued. A large-deviation theorem controls \(q\); it does not control simultaneously

\[
r_w,\qquad
c_j(w),\qquad
2^j-3^q,
\]

or the compatibility of these quantities along one nested sequence of words.

Segments for which the coefficient is contracting while the endpoint remains above the seed are often called **paradoxical**. Recent work formalizes precisely this phenomenon and shows that an infinite-stopping-time orbit would generate infinitely many such segments. citeturn899919view0

This is the carry-and-height synchronization gap.

---

# 8. Exact pointwise statement that would finish the proof

Define the stopping time below the starting value by

\[
\tau(n)
=
\inf\{j\geq1:T^j(n)<n\},
\]

with \(\tau(n)=\infty\) if no such \(j\) exists.

For \(k\geq1\), define

\[
M_k
=
\min\{n\geq2:\tau(n)>k\}.
\tag{24}
\]

The set is nonempty because \(2^k-1\) belongs to it.

## Theorem 3: Exact low-height survivor criterion

The Collatz conjecture is equivalent to

\[
\boxed{
M_k\longrightarrow\infty.
}
\tag{25}
\]

### Proof

Suppose first that Collatz holds. Then every \(n\geq2\) eventually reaches \(1<n\), so \(\tau(n)<\infty\).

Fix \(B\). The finite set

\[
\{2,3,\ldots,B\}
\]

has a finite maximum stopping time

\[
K_B=\max_{2\leq n\leq B}\tau(n).
\]

For \(k\geq K_B\), no \(n\leq B\) belongs to the set defining \(M_k\). Hence

\[
M_k>B.
\]

Since \(B\) was arbitrary, \(M_k\to\infty\).

Conversely, suppose \(M_k\to\infty\). Fix \(n\geq2\), and choose \(k\) such that \(M_k>n\). If \(\tau(n)>k\), then \(n\) would be one of the integers over which the minimum in (24) is taken, giving

\[
M_k\leq n,
\]

a contradiction. Therefore \(\tau(n)\leq k\), so some iterate of \(n\) is strictly smaller than \(n\).

Strong induction now proves that every positive integer reaches \(1\). Indeed, assume every integer below \(n\) reaches \(1\). Since an iterate of \(n\) is below \(n\), that iterate reaches \(1\), and consequently so does \(n\). ∎

This theorem identifies the exact missing upgrade. It is not enough to prove that survivor words are sparse. One must prove that their **least positive representatives escape to infinity**.

Equivalently, writing \(\mathcal W_k\) for the words whose least representatives satisfy all the affine inequalities

\[
T^j(r_w)\geq r_w,
\qquad 1\leq j\leq k,
\]

the required conclusion is

\[
\min_{w\in\mathcal W_k}r_w\longrightarrow\infty.
\tag{26}
\]

Large deviations control \(|\mathcal W_k|\) only indirectly, and in fact do not even control it without handling the affine rescue condition. They do not control the minimum in (26).

---

# 9. Final verdict on approach 82

The approach succeeds completely at its probabilistic stage:

\[
\boxed{
\text{future parity and valuation blocks regenerate exactly,
uniformly in every initial residue.}
}
\]

It gives sharp exponential bounds

\[
e^{-0.0346881852\,k}
\]

for noncontracting shortcut coefficients and

\[
e^{-0.0549794728\,k}
\]

for the analogous accelerated odd event.

But the proposed closure fails for three rigorous reasons:

1. **There is no finite realizability restriction.** Every finite word occurs, even after conditioning on any initial residue.
2. **Exponential measure decay does not imply an empty nested intersection.** One exceptional ray is compatible with every such density estimate.
3. **Negative coefficient drift does not imply actual descent.** The affine carry can rescue the endpoint, and the relevant property depends jointly on the word, its least residue representative, and the carry.

Therefore a full Collatz proof does not follow from uniform large deviations alone. The missing theorem must be a **support-level, low-height synchronization theorem** proving that no bounded positive representative can remain in the nested carry-and-drift survivor fibers. In the exact notation above, the narrow pointwise target is \(M_k\to\infty\), which is equivalent to Collatz itself.