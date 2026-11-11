model: GPT-5.6 Pro (Chat mode)
round: 82 -- approach 77, Uniform inverse-tree coverage
front: proof
sent: 2026-08-17T00:29Z
worked: 48m 32s

---

# Outcome

I did **not** obtain a valid proof of the Collatz conjecture. The investigation does, however, give a decisive resolution of approach 77:

> **Unqualified inverse-tree coverage is already known, and it holds separately in every connected component of the Collatz graph. Therefore it cannot prove that the component containing \(1\) is the only component.**

Moreover, a uniform height bound strong enough to turn residue coverage into membership of the \(1\)-tree is impossible by known upper bounds on inverse-tree growth. The viable replacement is necessarily **pathwise and order-sensitive** rather than uniform over all residue classes.

The details follow.

---

## 1. The inverse-tree coverage problem

Use the shortcut Collatz map

\[
T(n)=
\begin{cases}
n/2,&n\equiv0\pmod 2,\\[1mm]
(3n+1)/2,&n\equiv1\pmod 2.
\end{cases}
\]

Let

\[
\mathcal B_1
=
\{n\geq1:T^h(n)=1\text{ for some }h\geq0\}
\]

be the positive component, or basin, containing \(1\). For \(y\in\mathcal B_1\), write

\[
\tau(y)=\min\{h\geq0:T^h(y)=1\}.
\]

For \(k\geq1\) and \(0\leq r<2^k\), define the first inverse-tree coverage height

\[
D_k(r)
=
\min\{\tau(y):y\in\mathcal B_1,\ y\equiv r\pmod{2^k}\}.
\tag{1}
\]

Approach 77 begins by asking whether \(D_k(r)\) is finite for every \(k,r\), and then asks for a sufficiently strong uniform upper bound on these quantities.

---

## 2. Raw residue coverage is already a theorem

Monks, Monks, Monks, and Monks recall that **every arithmetic progression is a sufficient set**: every positive integer merges with some member of any prescribed positive arithmetic progression. They also prove a quantitative backtracing result. If

\[
d=2^n3^m b,\qquad \gcd(b,6)=1,
\]

then a backtracing path into any prescribed residue class modulo \(d\) can be found with the number of odd inverse branches bounded in terms of \(d\), independently of the starting node. For \(d=2^k\), their displayed bound on the number of odd inverse branches is at most \(k+1\). Their “length” counts odd inverse branches, however, rather than the total number of graph edges; the intervening doubling runs are separate coordinates of the backtracing vector. citeturn716828view0turn871669view0

This has a stronger consequence than is usually emphasized.

### Theorem 1 — every component is congruence-dense

Let \(C\) be any connected component of the positive Collatz graph. For every \(d\geq1\) and every residue \(a\bmod d\),

\[
C\cap\{a+dj:j\geq0\}\ne\varnothing.
\tag{2}
\]

### Proof

Fix \(x\in C\). Since the progression \(a+d\mathbb N\) is sufficient, there is some \(y\in a+d\mathbb N\) which merges with \(x\). Two positive integers merge precisely when they belong to the same undirected component of the Collatz graph. Hence \(y\in C\). ∎

Taking \(C=\mathcal B_1\) proves

\[
D_k(r)<\infty
\qquad
\text{for every }k,r.
\tag{3}
\]

Since there are finitely many classes modulo \(2^k\), the maximum

\[
D(k)=\max_{0\leq r<2^k}D_k(r)
\tag{4}
\]

is finite for every fixed \(k\).

But Theorem 1 also applies to **every hypothetical divergent or cyclic component**. Thus every bad component would meet every residue class as well. Several pairwise disjoint components can all be dense in the \(2\)-adic and profinite topologies.

Consequently,

\[
\boxed{
\text{residue-class coverage does not distinguish the \(1\)-component.}
}
\]

This is the first fatal obstruction to the proposed argument.

---

## 3. Why arbitrarily fine coverage does not identify an integer

Fix a positive integer \(n\). From (3), for every sufficiently large \(k\) there is some \(y_k\in\mathcal B_1\) satisfying

\[
y_k\equiv n\pmod{2^k}.
\]

Since \(0<n<2^k\), this means

\[
y_k=n+q_k2^k
\qquad
(q_k\geq0).
\tag{5}
\]

If \(n\in\mathcal B_1\), one may eventually choose \(q_k=0\). But if \(n\) were a counterexample, raw coverage would merely provide

\[
q_k\geq1
\qquad\text{for every }k.
\tag{6}
\]

The terminating integers \(y_k\) would converge \(2\)-adically to \(n\),

\[
y_k\longrightarrow n\quad\text{in }\mathbb Z_2,
\]

without ever equalling \(n\). This is entirely possible because the basin need not be closed in the \(2\)-adic topology.

This is the same finite-to-infinite synchronization obstruction found in the stationary inverse-fiber formulation: every finite cylinder has terminating representatives, while one fixed ordinary positive integer might remain outside the basin at every depth. fileciteturn0file2L142-L148

To make coverage useful, one must prove \(q_k=0\), not merely prove that \(q_k\) exists.

---

## 4. The exact height threshold that forces \(q_k=0\)

There is an exact quantitative criterion.

For \(n\geq1\), define

\[
\varepsilon_j(n)=T^j(n)\pmod2,
\qquad
s_k(n)=\sum_{j=0}^{k-1}\varepsilon_j(n).
\tag{7}
\]

Thus \(s_k(n)\) is the number of odd iterates among the first \(k\) steps.

### Lemma 2 — affine separation inside a binary cylinder

Suppose

\[
y=n+q2^k,
\qquad q\geq0.
\]

Then \(n\) and \(y\) have the same first \(k\) parity bits and

\[
T^k(y)-T^k(n)=3^{s_k(n)}q.
\tag{8}
\]

### Proof

Congruence modulo \(2^k\) determines the first \(k\) parity bits. On the corresponding parity cylinder there is an integer \(C\), depending only on those bits, such that

\[
T^k(x)=\frac{3^{s_k(n)}x+C}{2^k}.
\]

Subtracting the formulas for \(x=y\) and \(x=n\) gives

\[
T^k(y)-T^k(n)
=
\frac{3^{s_k(n)}(y-n)}{2^k}
=
3^{s_k(n)}q.
\]

∎

We also need a basic size estimate.

### Lemma 3 — size versus inverse height

If \(\tau(z)=h\), then

\[
z\leq2^h.
\tag{9}
\]

### Proof

A positive inverse step from \(x\) is either

\[
2x
\]

or, when admissible,

\[
\frac{2x-1}{3}<2x.
\]

Starting at \(1\), every inverse step increases the value by at most a factor of \(2\). ∎

Combining the lemmas gives the central quantitative result.

### Theorem 4 — shallow coverage forces the actual representative

Let \(0<n<2^k\), and suppose that \(y\in\mathcal B_1\) satisfies

\[
y\equiv n\pmod{2^k}.
\]

If \(y\ne n\), then

\[
\boxed{
\tau(y)>k+s_k(n)\log_2 3.
}
\tag{10}
\]

Consequently, if

\[
\tau(y)\leq k+s_k(n)\log_2 3,
\tag{11}
\]

then necessarily \(y=n\), and hence \(n\in\mathcal B_1\).

### Proof

Write \(y=n+q2^k\). If \(y\ne n\), then \(q\geq1\). Put \(h=\tau(y)\).

Since \(y\geq2^k\), Lemma 3 gives \(h\geq k\). After the common first \(k\) steps, \(T^k(y)\) reaches \(1\) in \(h-k\) further steps, so Lemma 3 gives

\[
T^k(y)\leq2^{h-k}.
\tag{12}
\]

On the other hand, Lemma 2 gives

\[
T^k(y)
=
T^k(n)+3^{s_k(n)}q
>
3^{s_k(n)}.
\tag{13}
\]

Therefore

\[
2^{h-k}>3^{s_k(n)},
\]

which is equivalent to (10). ∎

This theorem identifies exactly what “controlled height” would have to mean. A merely finite or computable bound is insufficient. The inverse-tree witness must fall below the **trajectory-dependent forcing boundary**

\[
k+s_k(n)\log_2 3.
\tag{14}
\]

---

## 5. An exact inverse-coverage reformulation of Collatz

The preceding theorem gives a complete conditional proof.

### Theorem 5 — trajectory-sensitive inverse coverage

The Collatz conjecture is equivalent to the following assertion:

> For every \(n\geq1\), there exist \(k\) with \(2^k>n\) and \(y\in\mathcal B_1\) such that
> \[
> y\equiv n\pmod{2^k}
> \]
> and
> \[
> \tau(y)\leq k+s_k(n)\log_2 3.
> \tag{UIC\({}^\sharp\)}
> \]

### Proof

If Collatz holds, take \(y=n\) and choose

\[
k\geq\max\{\tau(n),\lceil\log_2(n+1)\rceil\}.
\]

Then

\[
\tau(y)=\tau(n)\leq k
\leq k+s_k(n)\log_2 3.
\]

Conversely, suppose \(\mathrm{UIC}^{\sharp}\) holds. For a given \(n\), its witness \(y\) satisfies the hypotheses of Theorem 4. Hence \(y=n\), so \(n\in\mathcal B_1\). ∎

Thus there really is a complete inverse-tree proof architecture, but the required statement is not ordinary residue coverage. It is a **synchronized residue-and-height theorem along the parity prefix of one fixed integer**.

---

## 6. Why uniform all-class coverage cannot reach the forcing boundary

One might try to prove the stronger uniform statement

\[
D_k(r)\leq ck
\qquad
\text{for every }r\bmod2^k.
\tag{15}
\]

Known inverse-tree growth already puts a lower bound on \(c\).

Applegate and Lagarias proved that, for a fixed root \(a\not\equiv0\pmod3\), the number \(N_h(a)\) of \(h\)-step preimages satisfies, for sufficiently large \(h\),

\[
N_h(a)\leq1.359^h.
\tag{16}
\]

They also obtained the corresponding lower bound \(1.302^h\). citeturn951324search12

The number of basin nodes of height at most \(H\) is therefore

\[
O(1.359^H).
\]

To cover all \(2^k\) residue classes modulo \(2^k\), at least \(2^k\) distinct nodes are required. Consequently,

\[
2^k\ll1.359^{D(k)},
\]

and hence

\[
\boxed{
D(k)
\geq
\left(\frac{\log 2}{\log 1.359}-o(1)\right)k
=
(2.25965\ldots-o(1))k.
}
\tag{17}
\]

In particular, all of the following are impossible:

\[
D(k)\leq k+O(1),
\qquad
D(k)\leq(2-\delta)k,
\qquad
D(k)\leq2k+O(1).
\tag{18}
\]

So the most straightforward uniform height theorem cannot hold, even assuming Collatz.

---

## 7. The obstruction persists for near-critical parity words

The previous count used all \(2^k\) residue classes. Perhaps one could cover only the classes whose parity prefixes are capable of noncontraction.

That also fails as a blanket statement.

Let

\[
L=\log_2 3,
\qquad
\alpha=\frac1L=\log_3 2=0.630929\ldots
\]

and choose

\[
s_k=\left\lceil\alpha k\right\rceil.
\]

There are exactly

\[
\binom{k}{s_k}
=
2^{H_2(\alpha)k+o(k)}
\tag{19}
\]

parity words of length \(k\) and weight \(s_k\), where

\[
H_2(\alpha)
=
-\alpha\log_2\alpha-(1-\alpha)\log_2(1-\alpha)
=
0.949955\ldots
\tag{20}
\]

is the binary entropy.

For these words,

\[
3^{s_k}\geq2^k,
\]

so they lie precisely at the noncontracting multiplicative threshold. Their forcing height from Theorem 4 is

\[
k+s_k\log_2 3
=
2k+O(1).
\tag{21}
\]

But the number of \(1\)-tree nodes available through depth \(2k+O(1)\) is at most

\[
1.359^{2k+O(1)}
=
2^{(2\log_2 1.359)k+O(1)}
=
2^{0.885090\ldots k+O(1)}.
\tag{22}
\]

Since

\[
0.885090\ldots<0.949955\ldots,
\]

there are exponentially fewer shallow tree nodes than near-critical parity cylinders.

Therefore:

### Theorem 6 — near-critical blanket coverage is impossible

For all sufficiently large \(k\), some residue class whose first \(k\) parity bits contain approximately \(\log_3 2\cdot k\) odd steps has no \(1\)-tree representative satisfying the forcing-height bound (11).

Thus inverse-branch counting cannot prove Collatz by covering every dangerous finite parity prefix. It would have to exploit the fact that the prefixes belong to **one nested, eventually-zero binary seed**, rather than treat the prefixes independently.

---

## 8. The critical \(2k\) scale for a least counterexample

Suppose \(n\) were the least counterexample. Then

\[
T^j(n)\geq n
\qquad(j\geq0),
\tag{23}
\]

because an iterate below \(n\) would terminate by minimality.

At an odd iterate \(x\geq n\),

\[
\frac{T(x)}x
=
\frac{3+1/x}{2}
\leq
\frac{3+1/n}{2},
\]

while an even step has ratio \(1/2\). Therefore

\[
1
\leq
\frac{T^k(n)}n
\leq
\frac{(3+1/n)^{s_k(n)}}{2^k}.
\]

It follows that

\[
s_k(n)
\geq
k\frac{\log2}{\log(3+1/n)}.
\tag{24}
\]

Hence

\[
k+s_k(n)\log_2 3
\geq
\left(
1+
\frac{\log3}{\log(3+1/n)}
\right)k.
\tag{25}
\]

The coefficient on the right tends to \(2\) as \(n\to\infty\). Thus the most difficult hypothetical counterexamples live at a forcing scale close to

\[
2k.
\]

But uniform inverse-tree coverage of all classes cannot occur before approximately

\[
2.25965\,k.
\]

The numerical gap

\[
2.25965\ldots-2
\]

is not merely a weakness of current lower bounds. The entropy calculation above shows that the discrepancy already persists when one restricts to near-critical parity classes.

---

## 9. Exact finite coverage computation

I also generated the inverse tree exactly, collapsing the cycle \(\{1,2\}\) to depth \(0\). From a node \(x\), the positive inverse children are

\[
2x
\]

and, when \(x\equiv2\pmod3\),

\[
\frac{2x-1}{3}.
\]

The table records the first depth \(D(k)\) at which every class modulo \(2^k\) has appeared. The last two columns give one residue first completed at that depth and a corresponding tree node.

| \(k\) | \(D(k)\) | last-covered residue | witness |
|---:|---:|---:|---:|
| 5 | 25 | \(31\bmod32\) | \(30559\) |
| 6 | 29 | \(63\bmod64\) | \(54335\) |
| 7 | 30 | \(127\bmod128\) | \(36223\) |
| 8 | 33 | \(159\bmod256\) | \(9375\) |
| 9 | 40 | \(511\bmod512\) | \(1535\) |
| 10 | 42 | \(795\bmod1024\) | \(5042971\) |
| 11 | 51 | \(2047\bmod2048\) | \(350207\) |
| 12 | 54 | \(3711\bmod4096\) | \(106111\) |

For example,

\[
30559\equiv31\pmod{32}
\]

and reaches the trivial cycle after \(25\) shortcut steps. This certifies that the class \(31\bmod32\) intersects the \(1\)-tree. It says nothing by itself about the integer \(31\): the quotient in (5) is

\[
q=\frac{30559-31}{32}=954.
\]

This finite computation exhibits exactly the problem in the proposed proof: the inverse tree covers the cylinder through a high lift rather than by capturing its least positive representative.

---

## 10. The correct order-sensitive inverse-tree theorem

The more natural inverse-tree target is not coverage of the root component modulo \(2^k\). It is descent inside the inverse fiber of the **actual forward endpoint**.

For the accelerated odd map \(U\), define

\[
M_r(n)
=
\min\{y>0\text{ odd}:U^r(y)=U^r(n)\}.
\tag{26}
\]

Then Collatz is equivalent to

\[
\forall n>1\text{ odd}\quad
\exists r\geq1
\quad
M_r(n)<n.
\tag{27}
\]

Indeed, if a smaller odd \(y<n\) reaches the same endpoint as \(n\), strong induction shows that \(y\), the common endpoint, and then \(n\) all reach \(1\). Conversely, if \(n\) reaches \(1\), then \(1\) is eventually a smaller member of the same inverse fiber. This exact equivalence was established in the stationary inverse-fiber framework. fileciteturn0file3L192-L234

This criterion retains the indispensable Archimedean information

\[
y<n.
\]

Ordinary residue coverage discards precisely that information.

---

# Final classification of approach 77

| Proposed step | Status |
|---|---|
| Every residue class meets the \(1\)-tree | **True and already established** |
| A finite modulus-dependent coverage height exists | **True for each fixed modulus** |
| Coverage distinguishes the \(1\)-component | **False: every component has the same congruence-density property** |
| All classes can be covered below the height that forces the least representative | **False by inverse-tree growth and entropy counting** |
| One fixed positive integer’s nested classes eventually receive a forcing-height witness | **Equivalent to Collatz** |
| Every actual inverse fiber eventually contains a smaller positive ancestor | **Equivalent to Collatz** |

Thus approach 77, as stated, does not yield a full proof. The exact surviving target is

\[
\boxed{
\forall n\geq1\ \exists k>\log_2n:
D_k(n)\leq k+s_k(n)\log_2 3,
}
\]

or equivalently the stationary inverse-fiber descent condition (27).

The missing theorem must distinguish an ordinary positive integer from the terminating representatives in all of its finite \(2\)-adic cylinders. That is the same \(2\)-adic/Archimedean synchronization obstruction isolated in the preceding approaches, now expressed as an exact inverse-tree coverage boundary.