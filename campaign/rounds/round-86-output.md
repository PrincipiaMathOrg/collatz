model: GPT-5.6 Pro (Chat mode)
round: 86 -- approach 81, Replicate one counterexample into many
front: proof
sent: 2026-08-17T04:53Z
worked: 33m 2s

---

# Outcome of the inverse-replication approach

Carrying the proposed argument through reveals a decisive obstruction:

> **Replicating a least counterexample into arbitrarily many starts that eventually reach it cannot contradict Tao’s theorem, regardless of how large the replicated family is.**

The reason is that Tao’s exceptional set is defined by the **minimum value attained by an orbit**, not by whether the orbit eventually reaches \(1\). Every inverse ancestor of a fixed least counterexample attains that fixed counterexample and is therefore counted among the “good” integers in Tao’s theorem once the comparison function grows past it.

This is not merely a missing estimate. It invalidates the proposed final implication.

## 1. Least-counterexample consequences

Use the shortcut map

\[
T(m)=
\begin{cases}
m/2,&m\equiv0\pmod 2,\\[1mm]
(3m+1)/2,&m\equiv1\pmod 2.
\end{cases}
\]

Its orbit minimum is the same as the orbit minimum for the usual Collatz map, because the shortcut only omits the intermediate value \(3m+1=2T(m)\), which is larger than \(T(m)\).

Assume that Collatz is false, and let

\[
n=\min\{m\ge 1:m\text{ does not reach }1\}.
\]

Then:

1. \(n>1\) and \(n\) is odd.
2. Every point on the orbit of \(n\) is at least \(n\).
3. Every positive integer whose orbit reaches \(n\) has orbit minimum exactly \(n\).

The first two assertions follow immediately from minimality. For the third, suppose

\[
T^\ell(m)=n.
\]

Every \(T^i(m)\), \(0\le i\le\ell\), is itself nonconvergent, because its future orbit eventually reaches \(n\). Therefore minimality gives

\[
T^i(m)\ge n.
\]

After time \(\ell\), the orbit is the orbit of \(n\), which also remains at least \(n\). Since the orbit actually visits \(n\),

\[
\min_{j\ge0}T^j(m)=n.
\]

This is exactly the stationary inverse-fiber phenomenon already isolated in your earlier framework: a least counterexample would remain the least positive member of every finite inverse fiber above its own forward orbit. fileciteturn1file7L347-L389

## 2. The fixed-root replication lemma

Let

\[
\mathcal A(n)=\{m\ge1:T^\ell(m)=n\text{ for some }\ell\ge0\}
\]

be the complete inverse basin of \(n\).

### Proposition

For every function \(f:\mathbb N\to\mathbb R\) satisfying \(f(m)\to\infty\),

\[
\mathcal A(n)\cap
\{m:\operatorname{Col}_{\min}(m)\ge f(m)\}
\]

is finite.

### Proof

Choose \(M\) such that \(f(m)>n\) whenever \(m\ge M\). For every \(m\in\mathcal A(n)\),

\[
\operatorname{Col}_{\min}(m)=n.
\]

Consequently, for \(m\ge M\),

\[
\operatorname{Col}_{\min}(m)=n<f(m).
\]

Thus only the finitely many elements \(m<M\) can lie in the displayed intersection. \(\square\)

This proposition remains true even under the extreme hypothetical assumption

\[
d_{\log}\mathcal A(n)=1.
\]

So even proving that **almost every integer eventually merges into the least counterexample** would not contradict Tao’s theorem. Those integers would be nonconvergent, but they would all attain the fixed bounded value \(n\).

Tao’s theorem says that, for every \(f(N)\to\infty\),

\[
\operatorname{Col}_{\min}(N)<f(N)
\]

for logarithmically almost every \(N\). It does not say that almost every \(N\) reaches \(1\). citeturn982478view0

Hence the implication

\[
\text{many nonconvergent starts}
\quad\Longrightarrow\quad
\text{many exceptions to Tao’s theorem}
\]

is false.

## 3. The cycle obstruction is absolute

Suppose the least counterexample \(n\) lies in a nontrivial cycle. Since \(n\) is the minimum element of that cycle, every integer in the basin of the cycle eventually visits \(n\). Therefore every such integer has minimum \(n\).

Tao’s theorem is consequently compatible even with the following hypothetical situation:

\[
\text{the basin of a nontrivial cycle has logarithmic density }1.
\]

All those orbits would be nonconvergent, while still satisfying

\[
\operatorname{Col}_{\min}(N)=n<f(N)
\]

for every sufficiently large \(N\).

Thus inverse replication combined with Tao’s theorem cannot exclude a nontrivial cycle. A separate cycle-exclusion theorem would be indispensable.

This logical compatibility is reflected in Tao’s own discussion: he emphasizes that replacing “almost bounded” by a single absolute bound would be close to the full conjecture, and specifically discusses the possibility that many starts could enter an unbounded or periodic exceptional orbit before crossing a fixed threshold. citeturn982478view0

## 4. What remains in the divergent case

There is one possible salvage. Suppose the orbit

\[
x_j=T^j(n)
\]

is not periodic. Since it never reaches \(1\), it cannot visit any finite set infinitely often; otherwise some state would repeat and the orbit would become periodic. Hence

\[
x_j\longrightarrow\infty
\]

in the sense that, for every fixed \(C\), all sufficiently late \(x_j\) exceed \(C\).

For \(C\ge1\), choose \(J(C)\) such that

\[
x_j>C\qquad(j\ge J(C)).
\]

Define the high-tail inverse basin

\[
\mathcal R_C=
\left\{
m:
\begin{array}{l}
T^\ell(m)=x_j\text{ for some }\ell\ge0,\ j\ge J(C),\\
T^i(m)>C\text{ for }0\le i\le\ell
\end{array}
\right\}.
\]

Every \(m\in\mathcal R_C\) stays above \(C\) before merging and then follows a tail that also stays above \(C\). Therefore

\[
\mathcal R_C\subseteq
\mathcal E_C,
\qquad
\mathcal E_C:=\{m:\operatorname{Col}_{\min}(m)>C\}.
\]

Tao proved the quantitative bound that, for some absolute \(c>0\),

\[
\frac{\displaystyle
\sum_{\substack{m\le X\\m\in\mathcal E_C}}\frac1m}
{\displaystyle\sum_{m\le X}\frac1m}
\ll \frac1{(\log C)^c}
\]

uniformly in \(X\ge2\) and \(C\ge2\). citeturn856347view0turn856347view1

Consequently,

\[
\boxed{
\frac{\displaystyle
\sum_{\substack{m\le X\\m\in\mathcal R_C}}\frac1m}
{\displaystyle\sum_{m\le X}\frac1m}
\ll \frac1{(\log C)^c}.
}
\]

Thus it is not enough to prove that \(\mathcal R_C\) is infinite, has divergent harmonic sum, or has positive density for each fixed \(C\). The density is allowed to tend to zero with \(C\).

A contradiction requires a lower bound that beats Tao’s upper bound, for example

\[
\sup_X
\frac{\displaystyle
\sum_{\substack{m\le X\\m\in\mathcal R_C}}\frac1m}
{\displaystyle\sum_{m\le X}\frac1m}
\ge \eta
\]

for some absolute \(\eta>0\) and arbitrarily large \(C\), or more generally a lower bound \(g(C)\) satisfying

\[
g(C)(\log C)^c\longrightarrow\infty.
\]

This is the genuine missing uniform amplification theorem.

## 5. Why the simplest high inverse tree is too thin

There is also a direct arithmetic obstruction to the most natural attempt to build \(\mathcal R_C\).

Pass to the accelerated odd map

\[
U(y)=\frac{3y+1}{2^{v_2(3y+1)}}.
\]

For an odd \(x\) with \(3\nmid x\), every odd inverse branch is

\[
\phi_a(x)=\frac{2^a x-1}{3},
\]

where

\[
2^a x\equiv1\pmod3.
\]

For \(x>1\), the branch is strictly upward,

\[
\phi_a(x)>x,
\]

precisely when:

\[
\begin{cases}
a=2,4,6,\ldots,&x\equiv1\pmod3,\\
a=3,5,7,\ldots,&x\equiv2\pmod3.
\end{cases}
\]

Branches landing at a multiple of \(3\) cannot be continued backwards under \(U\), because \(U(z)\) is never divisible by \(3\).

For a residue \(r=x\bmod9\), let

\[
\sigma_r=
\sum_{\substack{a\text{ upward}\\3\nmid\phi_a(x)}}\frac{3}{2^a}.
\]

The condition \(3\nmid\phi_a(x)\) is equivalent to

\[
2^a x\not\equiv1\pmod9.
\]

Since \(2\) has order \(6\) modulo \(9\), a direct geometric-series calculation gives

\[
\begin{array}{c|cccccc}
r&1&2&4&5&7&8\\ \hline
\sigma_r&
\frac{20}{21}&
\frac{17}{42}&
\frac{17}{21}&
\frac{10}{21}&
\frac{5}{21}&
\frac{5}{42}
\end{array}
\]

and therefore

\[
\max_r\sigma_r=\frac{20}{21}<1.
\]

The actual harmonic ratio of a child to its parent is

\[
\frac{1/\phi_a(x)}{1/x}
=
\frac{3x}{2^a x-1}
=
\frac{3}{2^a-x^{-1}}.
\]

If \(x\ge C\) and \(a\ge2\), then

\[
\frac{3}{2^a-x^{-1}}
\le
\frac{3}{2^a}
\left(1-\frac1{4C}\right)^{-1}.
\]

Set

\[
q_C=\left(1-\frac1{4C}\right)^{-1},
\qquad
\rho_C=\frac{20}{21}q_C.
\]

For every \(C\ge6\),

\[
\rho_C<1.
\]

Let \(W_k\) be the harmonic mass of the active nodes in the \(k\)-th generation of the upward odd inverse tree rooted at \(x\ge C\). Then

\[
W_{k+1}\le \rho_C W_k,
\qquad
W_0=\frac1x.
\]

The total harmonic mass of all children, including terminal multiples of \(3\), is at most \(q_CW_k\). Consequently the complete upward odd inverse tree \(\mathcal U(x)\) satisfies

\[
\sum_{y\in\mathcal U(x)}\frac1y
\le
\frac1x
\left(
1+\frac{q_C}{1-\rho_C}
\right)
<\infty.
\]

Including all even starts \(2^b y\) only multiplies the total by

\[
\sum_{b\ge0}2^{-b}=2.
\]

Thus:

### Monotone inverse-replication theorem

For every odd \(x\ge6\) with \(3\nmid x\), the family of starts obtained by repeatedly taking only inverse accelerated branches that increase at every step has finite total harmonic mass. In particular, it has logarithmic density zero.

So the most direct implementation—grow a large inverse tree while never descending below the merger point—is provably too thin.

The only remaining possibility is to allow substantial inverse excursions that decrease relative to the current node while remaining above the global barrier \(C\). Controlling those excursions is exactly the difficult part.

## 6. Why existing inverse-tree bounds do not close the gap

Krasikov and Lagarias proved that for every fixed \(a\not\equiv0\pmod3\),

\[
\pi_a(X)
=
\#\{m\le X:T^j(m)=a\text{ for some }j\}
\ge X^{0.84}
\]

for sufficiently large \(X\), with the threshold depending on \(a\). citeturn486425view0

This does not provide the needed result because:

- it counts the full inverse tree, not paths remaining above a moving barrier \(C\);
- the root-dependent threshold is not uniform along a hypothetical divergent orbit;
- an \(X^{0.84}\)-sized set can have logarithmic density zero;
- even a growth exponent \(1-o(1)\) would not by itself provide a lower bound exceeding \((\log C)^{-c}\).

The inverse-tree literature describes proving the predicted growth exponent \(1\) as a substantially harder unresolved problem; the currently rigorous exponent quoted there is \(0.84\). citeturn486425view2

The required statement here is stronger still: it is a **barrier-conditioned, root-uniform logarithmic-mass theorem**.

## 7. Exact conditional closure

The approach can be converted into a correct conditional theorem.

### Uniform tail-amplification hypothesis

There is a constant \(\eta>0\) such that, for every divergent Collatz orbit \(\mathcal O=(x_j)\) and all sufficiently large \(C\),

\[
\sup_{X\ge2}
\frac{\displaystyle
\sum_{\substack{m\le X\\m\in\mathcal R_C(\mathcal O)}}\frac1m}
{\displaystyle\sum_{m\le X}\frac1m}
\ge\eta.
\tag{UTA}
\]

### Conditional theorem

Assume:

1. there are no nontrivial positive Collatz cycles;
2. the uniform tail-amplification hypothesis \((\mathrm{UTA})\) holds.

Then the Collatz conjecture follows.

### Proof

Suppose Collatz is false and choose a least counterexample \(n\). By the first assumption, its orbit is not periodic. Hence it eventually remains above every \(C\).

For sufficiently large \(C\), \((\mathrm{UTA})\) gives an \(X\) for which

\[
\frac{\displaystyle
\sum_{\substack{m\le X\\m\in\mathcal R_C}}\frac1m}
{\displaystyle\sum_{m\le X}\frac1m}
\ge\eta.
\]

But \(\mathcal R_C\subseteq\mathcal E_C\), while Tao’s theorem gives

\[
\frac{\displaystyle
\sum_{\substack{m\le X\\m\in\mathcal E_C}}\frac1m}
{\displaystyle\sum_{m\le X}\frac1m}
\ll(\log C)^{-c}.
\]

For sufficiently large \(C\), the right-hand side is smaller than \(\eta\), a contradiction. \(\square\)

## Verdict

Approach 81 does **not** currently furnish a full proof. Its proposed final step confuses two different sets:

\[
\{\text{starts that do not reach }1\}
\]

and

\[
\{\text{starts whose orbit minimum exceeds }f(N)\}.
\]

Inverse ancestors of the least counterexample belong to the first set but, except for finitely many, do not belong to the second.

The strongest valid outcome is therefore:

\[
\boxed{
\text{Collatz}
\quad\Leftarrow\quad
\text{cycle exclusion}
+
\text{uniform high-tail inverse-basin amplification}.
}
\]

The latter must beat Tao’s \((\log C)^{-c}\) upper bound and must be uniform over the moving tail of one exceptional orbit. Ordinary inverse branching, the known \(X^{0.84}\) coverage theorem, and even monotone high inverse trees do not supply it. This is another formulation of the same global synchronization obstruction identified by the stationary inverse-fiber framework.