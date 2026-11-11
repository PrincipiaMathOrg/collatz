model: GPT-5 Pro
round: 16 -- approach 11, Arithmetic Conley index at infinity
front: proof
sent: 2026-08-13T18:41:28Z
worked: 45m 43s

---

# Arithmetic Conley index at infinity: a rigorous completion of the framework

I do **not** obtain a valid proof of the Collatz conjecture from this approach. The reason is more specific than “the problem is open”: the proposed argument contains a false implication.

On the natural end compactification of the Collatz graph, **every end is fixed by the Collatz map**, including ends formed entirely by backward-doubling branches whose forward trajectories converge to the trivial cycle. Therefore, an invariant boundary end does not certify a divergent trajectory.

There is, however, a repaired construction. It gives an arithmetic Conley module whose:

- free Laurent-polynomial part corresponds exactly to divergent Collatz components;
- torsion part corresponds exactly to nontrivial cycles;
- vanishing is equivalent to the full Collatz conjecture.

This completes the topological formulation, but the required vanishing theorem remains precisely the unresolved arithmetic content.

---

## 1. The locally finite Collatz graph

Use the shortcut Collatz map

\[
T(n)=
\begin{cases}
n/2,&n\equiv 0\pmod 2,\\[2mm]
(3n+1)/2,&n\equiv 1\pmod 2.
\end{cases}
\]

This merely suppresses one forced division by \(2\) after every odd step. The trivial cycle is

\[
1\longmapsto 2\longmapsto 1.
\]

The conjecture is equivalent to every positive integer eventually entering \(\{1,2\}\). This shortcut formulation is standard in the \(3x+1\) literature. citeturn215080view4

For every \(m\geq 1\),

\[
T^{-1}(m)
=
\{2m\}
\cup
\begin{cases}
\left\{\dfrac{2m-1}{3}\right\},&m\equiv2\pmod3,\\[3mm]
\varnothing,&m\not\equiv2\pmod3.
\end{cases}
\]

Thus every vertex has one outgoing edge and at most two incoming edges.

Let \(G\) be the directed \(1\)-complex with one vertex for every \(n\geq1\) and one directed edge

\[
e_n:n\longrightarrow T(n)
\]

for every \(n\). We retain parallel edges, so that the two directed edges \(1\to2\) and \(2\to1\) form the trivial topological cycle.

The underlying undirected graph is locally finite.

Define a cellular map \(F:G\to G\) by

\[
F(n)=T(n),\qquad F(e_n)=e_{T(n)}.
\]

Because every vertex and edge has finitely many preimages, \(F\) is proper. Proper maps of locally finite graphs extend continuously to their Freudenthal end compactifications. citeturn215080view0turn215080view1

Write

\[
\widehat G=G\sqcup\Omega(G)
\]

for the end compactification.

---

## 2. The end action is completely degenerate

### Theorem 1 — Collatz fixes every Freudenthal end

For every end \(\omega\in\Omega(G)\),

\[
\widehat F(\omega)=\omega.
\]

### Proof

Represent \(\omega\) by a proper vertex ray

\[
R=(v_0,v_1,v_2,\ldots).
\]

Let \(S\subset V(G)\) be any finite vertex set. Since every point has finitely many preimages,

\[
T^{-1}(S)
\]

is finite. Since \(R\) is proper, for all sufficiently large \(j\),

\[
v_j\notin S\cup T^{-1}(S).
\]

Hence both

\[
v_j\notin S,
\qquad
T(v_j)\notin S.
\]

But \(v_j\) and \(T(v_j)\) are joined by the edge \(e_{v_j}\). Therefore they lie in the same connected component of \(G-S\).

Consequently, for every finite cut \(S\), the tails of \(R\) and \(F(R)\) select the same component of \(G-S\). They represent the same end. Thus

\[
\widehat F(\omega)=\omega.
\]

\(\square\)

This can also be summarized by saying that \(F\) moves every vertex graph-distance one, so it cannot change a Freudenthal direction at infinity.

### A fixed end with no divergence

Consider the ray

\[
R_2=(1,2,4,8,16,\ldots).
\]

It determines an end \(\omega_2\). Yet

\[
T(2^k)=2^{k-1}\qquad(k\geq1),
\]

so all of these vertices flow toward the trivial cycle rather than toward infinity.

Nevertheless,

\[
\widehat F(\omega_2)=\omega_2.
\]

Thus the implication

\[
\text{“fixed or invariant end”}
\quad\Longrightarrow\quad
\text{“divergent Collatz orbit”}
\]

is false.

A divergent orbit does produce an end: if an orbit is nonperiodic and avoids \(\{1,2\}\), then it eventually leaves every finite set. Otherwise some bounded set would be visited infinitely often, forcing a repeated integer and hence periodicity. But the converse fails dramatically because ordinary inverse-tree ends are also fixed.

---

## 3. Why the ordinary Conley-index argument cannot work

The Conley index is defined for an **isolated invariant set**. For a discrete map, one uses an index pair and the induced index map, considered up to shift equivalence. citeturn955530view0turn955530view1turn955530view2

There are three separate obstructions here.

### 3.1 The boundary is already invariant

Since \(F\) fixes \(\Omega(G)\) pointwise,

\[
\Omega(G)\subseteq \operatorname{Inv}(N)
\]

for every end neighborhood \(N\) containing the boundary. This holds whether Collatz is true or false.

So the boundary invariant set can never be empty.

### 3.2 Isolation is equivalent to the desired conclusion

Suppose one chooses a neighborhood of infinity obtained by removing a finite neighborhood of the trivial cycle. For its maximal invariant set to contain only boundary points, one must prove that no ordinary vertex admits a complete trajectory outside the trivial component.

But every \(n\) has the predecessor \(2n\), since

\[
T(2n)=n.
\]

Therefore any forward trajectory avoiding \(\{1,2\}\) can be extended backward indefinitely:

\[
\cdots\longmapsto 8n\longmapsto4n\longmapsto2n
\longmapsto n\longmapsto T(n)\longmapsto\cdots.
\]

Consequently, proving that the end neighborhood has no ordinary invariant points is already equivalent to proving that every orbit reaches the trivial cycle.

The desired isolation property is not a preliminary topological lemma. It is Collatz itself.

### 3.3 A trivial Conley index does not imply emptiness

The general Ważewski implication is only

\[
h(S)\neq 0\quad\Longrightarrow\quad S\neq\varnothing.
\]

Its converse is false: a nonempty isolated invariant set can have the same trivial index as the empty set. Modern expositions give explicit examples of this phenomenon. citeturn215080view3

Therefore the proposed step

\[
\text{“the index at infinity is trivial”}
\quad\Longrightarrow\quad
\text{“there is no divergent orbit”}
\]

does not follow from ordinary Conley theory.

Conley-index-at-infinity methods do successfully study trajectories connecting finite invariant sets to compactified infinity, but they require appropriate isolation or isolated-complement hypotheses; those hypotheses are exactly where the arithmetic difficulty enters here. citeturn215080view2

---

# 4. A repaired arithmetic compactification

The correct construction should distinguish:

1. the **formal point at infinity**, which always exists;
2. ordinary integers that support complete trajectories outside the trivial basin.

Let

\[
X=\mathbb N_{>0}\cup\{\infty\}
\]

be the one-point compactification of the discrete positive integers. Thus neighborhoods of \(\infty\) are sets with finite complement.

Because every finite set has finite preimage under \(T\), the map \(T\) extends continuously to

\[
\overline T:X\to X,
\qquad
\overline T(\infty)=\infty.
\]

Set

\[
N=X\setminus\{1\}
 =\{\infty,2,3,4,\ldots\},
\qquad
L=\{2\}.
\]

Then

\[
N\setminus L
=
\{\infty,3,4,5,\ldots\}
\]

is clopen.

Define

\[
S=\operatorname{Inv}(N\setminus L,\overline T),
\]

where \(\operatorname{Inv}\) consists of points lying on a complete solution

\[
\gamma:\mathbb Z\to N\setminus L,
\qquad
\gamma(j+1)=\overline T(\gamma(j)).
\]

---

## Theorem 2 — Exact invariant-set reformulation

One has

\[
S
=
\{\infty\}
\cup
\left\{
n\geq3:
T^j(n)\notin\{1,2\}\text{ for every }j\geq0
\right\}.
\]

Consequently,

\[
\boxed{
\text{Collatz conjecture}
\iff
S=\{\infty\}.
}
\]

### Proof

The constant trajectory at \(\infty\) shows that \(\infty\in S\).

Suppose \(n\geq3\) and its forward orbit avoids \(\{1,2\}\). Define a complete trajectory by

\[
\gamma(j)=T^j(n)\qquad(j\geq0)
\]

and

\[
\gamma(-k)=2^k n\qquad(k\geq1).
\]

Since \(T(2m)=m\),

\[
T(\gamma(-k))=\gamma(-k+1).
\]

All negative-time entries are at least \(6\), and all nonnegative-time entries avoid \(\{1,2\}\). Thus \(\gamma(\mathbb Z)\subset N\setminus L\), so \(n\in S\).

Conversely, if \(n\in S\), its complete trajectory lies in \(N\setminus L\), so its forward orbit never enters \(1\) or \(2\).

The equivalence follows.

\(\square\)

Unlike the Freudenthal construction, this compactification has only one formal point at infinity. The nontrivial invariant information is carried by the ordinary points of \(S\).

---

# 5. The index pair and its degree-zero index map

The pair \((N,L)\) is an index pair for \(S\):

\[
\operatorname{Inv}(\overline{N\setminus L},\overline T)
=S
\subseteq
\operatorname{int}(N\setminus L).
\]

The corresponding quotient map

\[
T_{(N,L)}:N/L\longrightarrow N/L
\]

sends a point to the basepoint whenever it leaves \(N\setminus L\).

The space \(X\) is totally disconnected. Every singular simplex of positive dimension has singleton image, so the only nonzero relative homology is in degree zero. With rational coefficients,

\[
V:=H_0(N,L;\mathbb Q)
=
\mathbb Q e_\infty
\oplus
\bigoplus_{n\geq3}\mathbb Q e_n.
\]

The induced index map \(A:V\to V\) is

\[
A e_\infty=e_\infty
\]

and, for \(n\geq3\),

\[
A e_n=
\begin{cases}
e_{T(n)},&T(n)\geq3,\\[1mm]
0,&T(n)=2.
\end{cases}
\]

The only \(n\geq3\) satisfying \(T(n)=2\) is \(n=4\), so

\[
A e_4=0.
\]

Let

\[
W=\bigoplus_{n\geq3}\mathbb Q e_n,
\qquad
A_0=A|_W.
\]

The map \(A_0\) is surjective: for every \(m\geq3\),

\[
A_0 e_{2m}=e_m.
\]

Define the generalized kernel

\[
\operatorname{gker}(A_0)
=
\bigcup_{j\geq1}\ker A_0^j.
\]

Because \(A_0\) is surjective, its Leray reduction—the stable automorphic part of the homological Conley index—is

\[
\mathcal C_{\mathrm{arith}}
:=
W/\operatorname{gker}(A_0),
\]

with the automorphism induced by \(A_0\). Applying a Leray functor to the homological index map is standard in discrete Conley theory. citeturn955530view2

---

## Theorem 3 — Exact arithmetic Conley criterion

For every \(n\geq3\),

\[
e_n\in\operatorname{gker}(A_0)
\iff
n\text{ eventually enters }\{1,2\}.
\]

Consequently,

\[
\boxed{
\text{Collatz conjecture}
\iff
\mathcal C_{\mathrm{arith}}=0.
}
\]

### Proof

Until an orbit reaches \(2\), the operator simply follows that orbit:

\[
A_0^j e_n=e_{T^j(n)}.
\]

If \(T^j(n)=2\), the preceding value is \(4\), and the corresponding basis vector is killed:

\[
A_0 e_4=0.
\]

Thus an orbit entering the trivial cycle gives

\[
A_0^k e_n=0
\]

for some \(k\).

Conversely, a basis vector can be sent to zero only by arriving at \(4\), whose next Collatz value is \(2\). Hence

\[
A_0^k e_n=0
\]

implies that \(n\) reaches the trivial cycle.

If Collatz holds, every basis vector lies in the generalized kernel. Every vector of \(W\) has finite support, so a single sufficiently large power kills all its basis terms. Therefore

\[
\operatorname{gker}(A_0)=W.
\]

Conversely, if \(n\) is a counterexample, then

\[
A_0^j e_n=e_{T^j(n)}\neq0
\]

for every \(j\), so \(e_n\notin\operatorname{gker}(A_0)\). Its class in \(\mathcal C_{\mathrm{arith}}\) is nonzero.

\(\square\)

The full Leray-reduced index also contains the unavoidable formal fixed-point summand at infinity:

\[
L(V,A)
\cong
\mathbb Q e_\infty
\oplus
\mathcal C_{\mathrm{arith}}.
\]

Thus \(\mathcal C_{\mathrm{arith}}\) is precisely the index after removing the artificial point \(\infty\).

---

# 6. The index splits cycles from divergence

Let

\[
R=\mathbb Q[t,t^{-1}]
\]

and let \(t\) act on \(\mathcal C_{\mathrm{arith}}\) by the automorphism induced by \(A_0\):

\[
t[e_n]=[e_{T(n)}].
\]

Consider the equivalence relation on nonterminating integers

\[
n\sim m
\iff
T^a(n)=T^b(m)
\quad\text{for some }a,b\geq0.
\]

These equivalence classes are exactly the weak components of the nonterminating functional graph.

Every such component is of one of two types:

1. it contains a nontrivial directed cycle;
2. it contains no cycle, in which case every forward trajectory in it tends to infinity.

The second assertion follows because a nonperiodic orbit that visits a bounded set infinitely often must repeat an integer.

Let \(\mathscr C\) be the set of nontrivial cycle components, with \(p(C)\) denoting the cycle period, and let \(\mathscr D\) be the set of divergent components.

---

## Theorem 4 — Counterexample decomposition

There is an \(R\)-module decomposition

\[
\boxed{
\mathcal C_{\mathrm{arith}}
\cong
\bigoplus_{D\in\mathscr D}R
\;\oplus\;
\bigoplus_{C\in\mathscr C}
R/(t^{p(C)}-1).
}
\]

### Proof

If \(T(u)=T(v)\), then

\[
A_0(e_u-e_v)=0.
\]

Hence in the quotient,

\[
[e_u]=[e_v].
\]

More generally, if

\[
T^a(u)=T^b(v),
\]

then

\[
t^a[e_u]=t^b[e_v],
\]

and since \(t\) acts invertibly,

\[
[e_u]=t^{\,b-a}[e_v].
\]

Thus every component gives a cyclic \(R\)-module.

Suppose a component contains a cycle

\[
c,T(c),\ldots,T^{p-1}(c)
\]

of least period \(p\). Then

\[
t^p[e_c]=[e_c].
\]

There is no smaller relation, because the \(p\) cycle vertices are distinct. Hence that component contributes

\[
R/(t^p-1).
\]

Now suppose a component is nonperiodic. Choose \(d\) in the component. The vectors

\[
e_d,e_{T(d)},e_{T^2(d)},\ldots
\]

are all distinct. If a nonzero Laurent polynomial \(q(t)\) annihilated \([e_d]\), then after multiplying by a power of \(t\), one would have a nonzero finite linear combination of distinct forward-orbit basis vectors in the generalized kernel. Applying further powers of \(A_0\) merely shifts these distinct basis vectors forward and can never annihilate their combination. This is impossible.

Thus \([e_d]\) has no nonzero Laurent-polynomial annihilator, and the component contributes a free copy of \(R\).

Different components give a direct sum because their forward orbits never meet, so cancellation between components cannot occur.

\(\square\)

---

## 7. Exact detection of divergence and cycles

Let \(\mathbb Q(t)\) be the fraction field of \(R\). Tensoring kills all torsion summands:

\[
\mathcal C_{\mathrm{arith}}
\otimes_R\mathbb Q(t)
\cong
\bigoplus_{D\in\mathscr D}\mathbb Q(t).
\]

Therefore

\[
\boxed{
\text{There are no divergent Collatz trajectories}
\iff
\mathcal C_{\mathrm{arith}}
\otimes_R\mathbb Q(t)=0.
}
\]

Likewise,

\[
\operatorname{Tor}_R
\mathcal C_{\mathrm{arith}}
\cong
\bigoplus_{C\in\mathscr C}
R/(t^{p(C)}-1),
\]

and hence

\[
\boxed{
\text{There are no nontrivial Collatz cycles}
\iff
\operatorname{Tor}_R
\mathcal C_{\mathrm{arith}}=0.
}
\]

Finally,

\[
\boxed{
\text{Collatz conjecture}
\iff
\mathcal C_{\mathrm{arith}}=0.
}
\]

This realizes the intended dichotomy almost exactly:

- a nonzero **free** Conley class certifies a divergent component;
- a nonzero **torsion** Conley class certifies a cycle;
- the formal end \(\infty\) has been separated off as a canonical fixed-point summand.

---

# 8. Why this is not yet a proof

The remaining statement is

\[
\operatorname{gker}(A_0)=W,
\]

or equivalently,

\[
\forall v\in W\ \exists k\geq0:
A_0^k v=0.
\]

Applying this to a basis vector gives

\[
\forall n\geq3\ \exists k\geq0:
A_0^k e_n=0,
\]

which is exactly

\[
\forall n\geq3\ \exists k\geq0:
T^k(n)\in\{1,2\}.
\]

So the final “index computation” is not presently supplied by topology. It is the Collatz conjecture written as local nilpotence of an arithmetic index map.

The ordinary Freudenthal approach loses too much information because all ends are fixed. The repaired Laurent-module index keeps exactly the necessary information, but Conley theory by itself gives no reason for its vanishing.

A genuine completion would require an additional arithmetic theorem—for example, a finite-detection result constructing residue-and-height Conley modules \(\mathcal C_r\) such that

\[
\mathcal C_{\mathrm{arith}}
\hookrightarrow
\varprojlim_r\mathcal C_r,
\]

followed by a uniform arithmetic proof that the inverse limit is zero. Such a theorem would need to use the \(2\)-adic parity cylinder, the \(3\)-adic carry constraints, and archimedean drift simultaneously. That would turn this Conley formulation into a real proof mechanism rather than an exact reformulation.

## Final assessment

The proposed proof cannot be completed as stated:

\[
\text{invariant Freudenthal end}
\not\Rightarrow
\text{divergent orbit},
\]

and

\[
\text{trivial ordinary Conley index}
\not\Rightarrow
\text{empty invariant set}.
\]

The strongest correct result is the arithmetic Conley module

\[
\mathcal C_{\mathrm{arith}}
=
W/\operatorname{gker}(A_0),
\]

with the exact decomposition

\[
\mathcal C_{\mathrm{arith}}
\cong
\bigoplus_{\text{divergent components}}\mathbb Q[t,t^{-1}]
\oplus
\bigoplus_{\text{nontrivial cycles}}
\frac{\mathbb Q[t,t^{-1}]}{(t^p-1)}.
\]

That is a rigorous and complete topological certificate for every possible counterexample, but proving that this module vanishes still requires a new arithmetic argument.