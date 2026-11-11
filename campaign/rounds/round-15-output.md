model: GPT-5 Pro
round: 15 -- approach 10, A canonical height on a parity orbifold
front: proof
sent: 2026-08-13T18:41:12Z
worked: 41m 4s

---

I do not obtain a valid proof of Collatz from this approach. Formalizing it reveals something fairly decisive: **the desired canonical-height package is internally incompatible with the known backward tree of the trivial Collatz cycle**.

This is not merely the observation that Collatz is open. There are rigorous no-go theorems below showing that a Northcott height with the proposed scaling cannot exist on a finite parity orbifold. The construction does, however, identify a more precise adelic gluing problem that could replace the canonical-height idea.

## 1. The parity orbifold can be constructed exactly

Use the shortcut Collatz map

\[
T(n)=
\begin{cases}
n/2,&n\equiv0\pmod 2,\\[2mm]
(3n+1)/2,&n\equiv1\pmod 2.
\end{cases}
\]

This is equivalent to the usual formulation.

Introduce two copies of the affine line,

\[
X_0\sqcup X_1,
\]

where a point \((u,e)\) represents

\[
n=2u+e,\qquad e\in\{0,1\}.
\]

Then

\[
T(2u+e)=3^e u+2e.
\]

Write the output as \(2v+e'\). The lifted transition relation is therefore

\[
C_{e,e'}:\qquad 2v+e'=3^e u+2e,
\]

or

\[
v=f_{e,e'}(u)
   =\frac{3^e u+2e-e'}{2}.
\tag{1}
\]

For an integral \(u\), exactly one value of \(e'\) makes \(v\) integral:

\[
e'\equiv u\pmod2.
\tag{2}
\]

Thus Collatz is the unique path through the correspondence satisfying the local integrality condition at \(2\).

Over \(\mathbf Q\), however, all four maps \(f_{e,e'}\) exist. Moreover, for every fixed pair \((e,e')\), the genuine integral Collatz transitions with

\[
u\equiv e'\pmod 2
\]

form an infinite subset of the line \(C_{e,e'}\), and are therefore Zariski dense in that line.

Consequently:

> **The Zariski closure of the integral Collatz transition relation contains all four branches \(C_{e,e'}\).**

The condition selecting the actual Collatz branch is not algebraic over \(\mathbf Q\). It is a \(2\)-adic integrality condition. Passing from Collatz to its algebraic closure necessarily adds the nonintegral branches and their “ghost” paths.

This is consistent with the classical parity-vector picture: every binary word of length \(k\) is realized by exactly one residue class modulo \(2^k\), and every infinite binary word corresponds to one \(2\)-adic integer. citeturn811209view0

## 2. The correspondence has polarization factor \(1\), not \(>1\)

A Call–Silverman canonical height starts with a divisor class \(L\) satisfying

\[
f^*L\sim \alpha L,\qquad \alpha>1.
\]

For a polarized correspondence, Ingram uses the analogous relation

\[
y^*L\sim \alpha x^*L,\qquad \alpha>1,
\]

and constructs a path-space height satisfying exact scaling

\[
\widehat h(\sigma P)=\alpha \widehat h(P),
\qquad
\widehat h(P)=h_L(\pi P)+O(1).
\]

The hypothesis \(\alpha>1\) is essential in both constructions. citeturn811209view2turn114498view0

Now compactify the two parity components to

\[
X=X_0\sqcup X_1,\qquad X_e\simeq\mathbf P^1.
\]

Let \(L\) be ample. Then

\[
L|_{X_e}\simeq \mathcal O_{\mathbf P^1}(d_e),
\qquad d_e>0.
\]

Each component \(C_{e,e'}\) in (1) is the graph of a degree-one Möbius transformation. Hence on \(C_{e,e'}\),

\[
\deg(x^*L)=d_e,
\qquad
\deg(y^*L)=d_{e'}.
\]

If the correspondence were polarized by \(\alpha\), we would have

\[
d_{e'}=\alpha d_e
\tag{3}
\]

for every \(e,e'\).

Taking the self-branch \(e=e'=0\) gives

\[
d_0=\alpha d_0.
\]

Since \(d_0>0\),

\[
\boxed{\alpha=1.}
\]

The branch \(1\to1\) gives the same conclusion.

Thus:

> **Proposition 1.** The parity correspondence admits no ample polarization of weight \(\alpha>1\).

Refining the label to finitely many parity digits does not help. Every branch is still generically degree one. If positive divisor weights satisfy \(d_t=\alpha d_s\) along every transition, multiplying around any directed cycle gives

\[
d_s=\alpha^m d_s,
\]

and therefore \(\alpha=1\).

Using a divisor of degree zero to evade this argument destroys ampleness and hence destroys the Northcott property.

## 3. A stronger Northcott obstruction

The preceding obstruction uses algebraic geometry. There is also an elementary argument that rules out the proposed height even on the positive integers themselves.

### Theorem 2: Northcott versus the powers-of-two chain

There is no function

\[
H:\mathbf N_{>0}\longrightarrow\mathbf R
\]

with both of the following properties:

1. For every \(B\), the set
   \[
   \{n:H(n)\le B\}
   \]
   is finite.

2. For some fixed \(\lambda>1\) and \(C<\infty\),
   \[
   |H(Tn)-\lambda H(n)|\le C
   \tag{4}
   \]
   for every \(n\).

#### Proof

Since

\[
T(2^k)=2^{k-1},
\]

inequality (4) implies

\[
\lambda H(2^k)\le H(2^{k-1})+C.
\]

Iterating,

\[
H(2^k)
\le
\lambda^{-k}H(1)
+
C\sum_{j=1}^{k}\lambda^{-j}.
\]

Therefore

\[
H(2^k)
\le
\lambda^{-k}H(1)
+
\frac{C}{\lambda-1}
\]

for every \(k\). All the infinitely many points \(2^k\) lie in one bounded-height sublevel set, contradicting property 1. ∎

This applies directly to Northcott finiteness because all the points \(2^k\) are rational and have algebraic degree one.

The contradiction is even sharper for an exact canonical relation.

### Corollary 3

Suppose

\[
\widehat h(Tn)=\lambda\widehat h(n)
\tag{5}
\]

exactly and \(\widehat h\) has Northcott finiteness. Then no such height exists for any \(\lambda>0\).

Indeed, the cycle \(1\leftrightarrow2\) gives

\[
\widehat h(2)=\lambda\widehat h(1),
\qquad
\widehat h(1)=\lambda\widehat h(2).
\]

If \(\lambda\ne1\), then both cycle heights are zero. Equation (5) then gives

\[
\widehat h(2^k)=0
\]

for all \(k\). If \(\lambda=1\), all the values \(\widehat h(2^k)\) are equal. Either way, Northcott fails.

This exposes a fundamental mismatch:

> A canonical height that vanishes on the trivial cycle must also vanish on every point in its backward basin.

That basin is already known to be infinite, independently of the Collatz conjecture. It contains every power of two. Therefore the “trivial cycle is the only height-zero integral orbit” principle cannot be implemented by a Northcott height on starting points.

One could quotient all points in the trivial basin into a single orbit-class, but constructing a separated arithmetic quotient with only one positive basin component is essentially the Collatz conjecture itself.

## 4. Setting \(\lambda=1\) makes the relation noncoercive

Geometry forces \(\lambda=1\). For a degree-one affine map, a Weil height automatically satisfies

\[
h(f(x))=h(x)+O(1).
\]

So

\[
\widehat h(Tx)=\widehat h(x)+O(1)
\]

contains no termination information: the bounded error can accumulate linearly for arbitrarily many steps.

There are explicit arbitrarily long upward segments. Put

\[
N_k=2^k-1.
\]

For \(0\le j\le k\),

\[
T^j(N_k)=3^j2^{k-j}-1.
\tag{6}
\]

For \(j<k\), this number is odd, so the first \(k\) transitions all use the odd branch. Consequently,

\[
\log T^k(N_k)-\log N_k
=
\log(3^k-1)-\log(2^k-1)
=
k\log\frac32+o(1).
\tag{7}
\]

Hence no height satisfying

\[
\widehat h(n)=c\log n+O(1),
\qquad c>0,
\]

can be invariant, or uniformly descending, along every Collatz segment.

This also shows why merely adding bounded continuous \(2\)-adic and \(3\)-adic corrections cannot work: the correction changes by \(O(1)\) between the beginning and end of (6), while the archimedean height changes by order \(k\).

## 5. The three local slopes cancel exactly

For a branch of parity \(e\), the affine multiplier is

\[
a_e=\frac{3^e}{2}.
\]

Its logarithmic sizes at the three relevant places are

\[
\begin{array}{c|ccc}
e & \infty & 2 & 3\\ \hline
0 & -\log 2 & \log 2 & 0\\[1mm]
1 & \log 3-\log 2 & \log 2 & -\log 3.
\end{array}
\tag{8}
\]

Each row sums to zero.

For a parity word \(\varepsilon_0,\ldots,\varepsilon_{k-1}\), let

\[
s_k=\varepsilon_0+\cdots+\varepsilon_{k-1}.
\]

The multiplier of the composed affine map is

\[
A_k=\frac{3^{s_k}}{2^k}.
\]

Its three logarithmic local contributions are

\[
\begin{aligned}
\log|A_k|_\infty&=s_k\log3-k\log2,\\
\log|A_k|_2&=k\log2,\\
\log|A_k|_3&=-s_k\log3.
\end{aligned}
\tag{9}
\]

Therefore

\[
\log|A_k|_\infty+
\log|A_k|_2+
\log|A_k|_3=0.
\tag{10}
\]

This is exactly the product formula for \(3^{s_k}/2^k\).

So the product formula does not produce a contradiction. It says that:

- archimedean expansion on odd-heavy words,
- \(2\)-adic expansion from division by two,
- and \(3\)-adic contraction from multiplication by three

are an exactly neutral cocycle.

The affine translation—the \(+1\) and its accumulated carries—is the only possible source of an arithmetic gap. A divisor eigenclass sees the degree-one multiplier and therefore misses precisely the hard part of Collatz.

The long odd segment (6) displays the cancellation particularly clearly:

\[
T^j(N_k)+1=3^j2^{k-j}.
\]

Thus

\[
v_2\!\left(T^j(N_k)+1\right)=k-j,
\qquad
v_3\!\left(T^j(N_k)+1\right)=j.
\]

The archimedean growth is exactly a transfer of local order from \(2\) to \(3\). In particular,

\[
\log(n+1)-v_2(n+1)\log2-v_3(n+1)\log3
\tag{11}
\]

vanishes at every point of this entire segment. More generally, (11) vanishes for every

\[
n=2^a3^b-1,
\]

so such a three-place \(S\)-height has an infinite zero set and cannot have Northcott finiteness.

## 6. The pathwise “canonical center” that actually exists

There is nevertheless a natural pathwise object.

Let \(\varepsilon_j=T^j(n)\bmod2\), and again write

\[
s_k=\sum_{j=0}^{k-1}\varepsilon_j.
\]

Define

\[
R_k
=
\sum_{j=0}^{k-1}
\varepsilon_j
\frac{2^j}{3^{s_{j+1}}}.
\tag{12}
\]

A direct induction gives the exact affine iterate formula

\[
T^k(n)
=
\frac{3^{s_k}}{2^k}\bigl(n+R_k\bigr).
\tag{13}
\]

Since \(T^k(n)\) is integral,

\[
n+R_k
=
\frac{2^kT^k(n)}{3^{s_k}},
\]

and therefore

\[
v_2(n+R_k)\ge k.
\tag{14}
\]

Consequently,

\[
\boxed{R_k\longrightarrow -n\quad\text{in }\mathbf Q_2.}
\tag{15}
\]

This is the classical inverse parity transform in pathwise form. citeturn811209view0

At the real place, however, every term of \(R_k\) is nonnegative. Hence, whenever the series converges in \(\mathbf R\),

\[
R_k\longrightarrow R_\infty\ge0.
\tag{16}
\]

Thus the same rational sequence may converge to

\[
-n<0\quad\text{in }\mathbf Q_2
\]

and to

\[
R_\infty\ge0\quad\text{in }\mathbf R.
\]

There is no contradiction: rational numbers can converge to different limits in different completions when their global heights go to infinity.

And here the global heights necessarily do go to infinity. Write

\[
R_k=\frac{C_k}{3^{s_k}}.
\]

If at least one odd step has occurred, the contribution from the last odd index shows

\[
3\nmid C_k.
\]

Hence the denominator \(3^{s_k}\) is already reduced, and

\[
h(R_k)\ge s_k\log3.
\tag{17}
\]

An infinite positive orbit has infinitely many odd terms, so these center heights are unbounded. Northcott therefore gives no compactness.

There is also no direct \(3\)-adic limit. For \(k<\ell\), if the parity block from \(k\) to \(\ell-1\) contains an odd step, then

\[
R_\ell-R_k
=
\sum_{j=k}^{\ell-1}
\varepsilon_j\frac{2^j}{3^{s_{j+1}}}.
\]

Let \(j_*\) be the last odd index in this interval. After putting this over denominator \(3^{s_\ell}\), the term indexed by \(j_*\) is congruent to \(2^{j_*}\not\equiv0\pmod3\), while all earlier terms are divisible by \(3\). Therefore

\[
v_3(R_\ell-R_k)=-s_\ell.
\tag{18}
\]

So the naive centers are maximally separated at \(3\). A useful \(3\)-adic cancellation can only come from comparing **different compatible ancestors with matching terminal suffixes**, not successive truncations of one path.

That is exactly where your terminal-suffix locality and competing-ancestor framework become relevant.

## 7. What a viable replacement theorem would have to prove

The canonical point-height should be replaced by a two-ended adelic rigidity statement.

A suitable normalized difference \(q\) between two compatible affine centers should have no prime denominators outside \(2\) and \(3\). Suppose one could force

\[
v_2(q)\ge A,
\qquad
v_3(q)\ge B,
\tag{19}
\]

from seed and terminal compatibility, while archimedean control gave

\[
0<|q|_\infty<2^A3^B.
\tag{20}
\]

Then \(q\) would be an integer divisible by \(2^A3^B\) but smaller in absolute value than \(2^A3^B\), which is impossible. Equivalently, the product formula would give

\[
|q|_\infty |q|_2 |q|_3<1
\]

while every other local factor is at most \(1\).

This suggests the precise replacement target:

> **Adelic synchronization lemma.**  
> Every hypothetical nonterminating positive orbit produces two distinct compatible finite ancestor states whose normalized affine-center difference satisfies (19) and (20).

With enough state information, equality \(q=0\) would identify two complete affine states, yielding a repeated block and hence a cycle. A divergent orbit would therefore be impossible.

But establishing that synchronization lemma is the unresolved mathematical content. Finite parity information alone cannot supply it because every finite parity word occurs. The \(2\)-adic seed condition alone cannot supply it because it permits the full binary shift. Successive centers cannot supply it because of the exact \(3\)-adic separation (18). One needs a genuine theorem coupling:

\[
\text{archimedean near-criticality}
\quad+\quad
\text{\(2\)-adic seed agreement}
\quad+\quad
\text{\(3\)-adic terminal-suffix agreement}.
\]

## Conclusion

The parity-orbifold construction is valid and illuminating, but it proves a **no-go result** for the proposed canonical height:

\[
\boxed{
\begin{array}{l}
\text{The algebraic correspondence has polarization factor }1;\\
\text{a Northcott quasi-height with }\lambda>1\text{ is ruled out by }2^k\to1;\\
\text{an exact height vanishing on the cycle vanishes on an infinite basin;}\\
\text{the }\infty,2,3\text{ derivative contributions cancel by the product formula.}
\end{array}}
\]

Therefore a full Collatz proof does not follow from a Call–Silverman/Ingram-style canonical height on a finite parity orbifold. The viable residue of the idea is not a canonical point-height but an **adelic gluing or synchronization theorem for affine carry centers**. That theorem would be a genuine new route to Collatz, but the needed simultaneous \(2\)-adic, \(3\)-adic, and archimedean recurrence has not been established here.