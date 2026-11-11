model: GPT-5.6 Pro (gpt-5-6-pro)
round: 101
approach: 96 -- Distributed inverse-tree enumeration
front: proof
sent: 2026-08-18T00:48:23Z
worked: Worked for 70m 34s
sha256: 6a3a858420ca3fe2d5de3dd1b1098903e840a05e4024145da7a4334ba23b85fb
chars: 20081

---# Outcome

I did **not** obtain a valid full proof of the Collatz conjecture from distributed inverse-tree enumeration. A claim of completion would be false.

The approach nevertheless yields a fairly sharp resolution:

1. **Raw congruence coverage of the inverse tree of \(1\) is already known, but it is component-blind.**
2. There is an exact **trajectory-sensitive depth criterion** that turns inverse-tree coverage into a proof.
3. A counting theorem shows that this criterion cannot hold uniformly over all residue classes, or even over all near-critical parity classes.
4. On the strongly sufficient class \(2\bmod 9\), the entire first-return relation has an exact regular grammar and closed affine formulas.
5. Persistent finite survivors include arbitrarily long shadows of negative \(2\)-adic periodic points.
6. The remaining gap is exactly **ordinary-integer synchronization for an aperiodic nested sequence of inverse cylinders**, together with positive-cycle exclusion.

As of August 17, 2026, the literature still treats both nontrivial cycles and divergent positive orbits as unresolved. Recent algorithms verify only finite ranges \(n<2^N\), and the published distributed verification reaches \(2^{71}\). citeturn134721view0turn356164view2turn134721view3

---

## 1. The inverse tree and the first obstruction

Use the shortcut map

\[
T(n)=
\begin{cases}
n/2,&n\equiv0\pmod 2,\\[1mm]
(3n+1)/2,&n\equiv1\pmod 2.
\end{cases}
\]

Let

\[
\mathcal B_1=\{n\ge1:T^h(n)=1\text{ for some }h\ge0\}
\]

be the positive inverse basin of \(1\), and put

\[
\tau(n)=\min\{h:T^h(n)=1\}
\qquad(n\in\mathcal B_1).
\]

The inverse branches of \(T\) are

\[
m\longmapsto 2m
\]

and, when \(m\equiv2\pmod 3\),

\[
m\longmapsto \frac{2m-1}{3}.
\]

### Theorem 1 — every component meets every congruence class

Let \(C\) be any connected component of the positive Collatz graph. For every modulus \(M\ge1\) and every residue \(r\bmod M\),

\[
C\cap\{n:n\equiv r\pmod M\}\ne\varnothing.
\]

### Proof

Every arithmetic progression is a sufficient set: every positive integer merges with some member of that progression. Choose \(x\in C\) and the progression \(r+M\mathbb N\). There is a \(y\equiv r\pmod M\) which merges with \(x\). Merging is equivalent to belonging to the same undirected component, so \(y\in C\). ∎

The sufficiency theorem and the stronger fact that every positive orbit meets \(2\bmod9\) are due to Monks, Monks, Monks, and Monks. citeturn134721view0

In particular,

\[
\mathcal B_1\cap(r+M\mathbb N)\ne\varnothing
\]

for every \(M,r\). Thus the inverse tree of \(1\) eventually covers every residue class.

But exactly the same assertion would hold in a hypothetical divergent or cyclic component. Therefore

\[
\boxed{\text{congruence coverage alone cannot distinguish the \(1\)-component.}}
\]

This remains true if one tracks finitely many congruences simultaneously, since they combine into a single congruence by the Chinese remainder theorem.

---

## 2. The order-sensitive repair

For \(k\ge1\) and \(0\le r<2^k\), define the first inverse-tree coverage depth

\[
D_k(r)=
\min\{\tau(y):y\in\mathcal B_1,\ y\equiv r\pmod{2^k}\}.
\]

Theorem 1 implies that \(D_k(r)<\infty\).

For \(n\ge1\), let

\[
\varepsilon_j(n)=T^j(n)\pmod2,
\qquad
s_k(n)=\sum_{j=0}^{k-1}\varepsilon_j(n).
\]

Thus \(s_k(n)\) is the number of odd shortcut steps among the first \(k\) iterates.

### Lemma 2 — affine separation within a binary cylinder

Suppose

\[
y=n+q2^k,\qquad q\ge0.
\]

Then \(n\) and \(y\) have the same first \(k\) parity bits and

\[
\boxed{
T^k(y)=T^k(n)+3^{s_k(n)}q.
}
\tag{2.1}
\]

### Proof

On the parity cylinder determined by the first \(k\) bits, there is an integer \(C_k\) such that

\[
T^k(x)=\frac{3^{s_k(n)}x+C_k}{2^k}.
\]

Subtracting the formulas for \(x=y\) and \(x=n\) gives (2.1). ∎

### Lemma 3 — inverse depth bounds size

If \(z\in\mathcal B_1\) and \(\tau(z)=h\), then

\[
z\le2^h.
\tag{2.2}
\]

### Proof

A positive inverse step from \(m\) is either \(2m\) or \((2m-1)/3<2m\). Starting from \(1\), every inverse step increases the value by at most a factor of \(2\). ∎

Combining the two lemmas gives the exact forcing boundary.

### Theorem 4 — a shallow congruent witness must be the integer itself

Let \(0<n<2^k\), let \(y\in\mathcal B_1\), and suppose

\[
y\equiv n\pmod{2^k}.
\]

If \(y\ne n\) and \(h=\tau(y)\), then

\[
\boxed{
2^{h-k}\ge T^k(n)+3^{s_k(n)}.
}
\tag{2.3}
\]

Consequently, either of the following conditions forces \(y=n\):

\[
2^h<
2^k\bigl(T^k(n)+3^{s_k(n)}\bigr),
\tag{2.4}
\]

or, more simply,

\[
h\le k+s_k(n)\log_2 3.
\tag{2.5}
\]

### Proof

Write \(y=n+q2^k\). Since \(y\ne n\), one has \(q\ge1\). By Lemma 2,

\[
T^k(y)
=
T^k(n)+3^{s_k(n)}q
\ge T^k(n)+3^{s_k(n)}.
\]

Because \(y\ge2^k\), Lemma 3 gives \(h\ge k\). The number \(T^k(y)\) reaches \(1\) in \(h-k\) further steps, so Lemma 3 again gives

\[
T^k(y)\le2^{h-k}.
\]

This proves (2.3). Condition (2.4) contradicts (2.3). Moreover,

\[
T^k(n)+3^{s_k(n)}>3^{s_k(n)},
\]

so (2.3) implies

\[
h>k+s_k(n)\log_2 3,
\]

which proves (2.5). ∎

This gives an exact inverse-tree reformulation.

### Theorem 5 — trajectory-sensitive inverse coverage is equivalent to Collatz

The Collatz conjecture is equivalent to the following assertion:

> For every \(n\ge1\), there is a \(k\) with \(2^k>n\) such that
> \[
> D_k(n\bmod2^k)
> \le k+s_k(n)\log_2 3.
> \tag{\(\mathrm{TSIC}\)}
> \]

### Proof

Assume Collatz. Choose

\[
k\ge
\max\bigl\{\tau(n),\lceil\log_2(n+1)\rceil\bigr\}.
\]

The representative \(y=n\) belongs to \(\mathcal B_1\), so

\[
D_k(n\bmod2^k)\le\tau(n)\le k
\le k+s_k(n)\log_2 3.
\]

Conversely, assume \(\mathrm{TSIC}\). Let \(y\) be a witness realizing \(D_k(n\bmod2^k)\). Theorem 4 forces \(y=n\). Hence \(n\in\mathcal B_1\). ∎

Thus there really is a complete inverse-tree proof architecture. The missing statement is not ordinary modular coverage, but **coverage below a trajectory-dependent depth boundary**.

---

## 3. Why uniform shallow coverage is impossible

One might seek a bound

\[
D_k(r)\le ck
\qquad\text{for every }r\bmod2^k.
\]

Known inverse-tree growth rules this out for every \(c<2.2596\ldots\).

Applegate and Lagarias proved that, for a fixed root not divisible by \(3\), the number of exact depth-\(h\) preimages is at most

\[
1.359^h
\]

for all sufficiently large \(h\). citeturn124063search12

Therefore the number of inverse-tree nodes through depth \(H\) is

\[
O(1.359^H).
\]

Covering all \(2^k\) residue classes requires at least \(2^k\) distinct nodes, so

\[
2^k\ll1.359^{D(k)},
\]

where \(D(k)=\max_rD_k(r)\). Hence

\[
\boxed{
D(k)\ge
\left(\frac{\log2}{\log1.359}-o(1)\right)k
=
(2.25965488\ldots-o(1))k.
}
\tag{3.1}
\]

There is an even more relevant obstruction near the critical Collatz drift.

Put

\[
\alpha=\log_3 2=0.6309297535\ldots
\]

and choose \(s=\lceil\alpha k\rceil\). There are

\[
\binom{k}{s}
=
2^{H_2(\alpha)k+o(k)}
=
2^{0.949955527\ldots\,k+o(k)}
\]

parity words of length \(k\) and weight \(s\). Parity words of length \(k\) are in bijection with residue classes modulo \(2^k\).

For these classes,

\[
k+s\log_2 3=2k+O(1).
\]

But the inverse tree through depth \(2k+O(1)\) contains at most

\[
1.359^{2k+O(1)}
=
2^{0.885090912\ldots\,k+O(1)}
\]

nodes. Since

\[
0.885090912\ldots<0.949955527\ldots,
\]

there are asymptotically too few shallow inverse-tree nodes to cover every near-critical parity class.

Therefore

\[
\boxed{
\text{\(\mathrm{TSIC}\) cannot be proved by a blanket all-class depth estimate.}
}
\]

It must be proved **along the nested residue classes of one fixed ordinary integer**.

---

## 4. Exact distributed enumeration

I independently enumerated all distinct positive preimages of \(1\) through shortcut depth \(50\). Breadth-first traversal makes the recorded depths minimal.

The computation found

\[
4{,}741{,}320
\]

distinct nodes.

For each \(k\), the table below gives:

- the maximum minimum coverage depth \(D(k)\);
- the number of classes satisfying the simpler forcing inequality
  \[
  D_k(r)\le k+s_k(r)\log_2 3.
  \]

\[
\begin{array}{c|c|c}
k&D(k)&\text{forcing classes}\\ \hline
1&1&2/2\\
2&5&4/4\\
3&11&7/8\\
4&13&11/16\\
5&26&17/32\\
6&30&27/64\\
7&31&44/128\\
8&34&69/256\\
9&41&106/512\\
10&43&160/1024
\end{array}
\]

Thus every class modulo \(2^{10}\) already has a representative in the \(1\)-tree, but only

\[
\frac{160}{1024}=15.625\%
\]

has a representative shallow enough for Theorem 4 to identify that representative with the integer encoded by the class.

This is a concrete manifestation of the difference between:

\[
\text{“the class intersects }\mathcal B_1\text{”}
\]

and

\[
\text{“the represented integer belongs to }\mathcal B_1\text{.”}
\]

---

## 5. Exact compression on the strongly sufficient class \(2\bmod9\)

Let

\[
S_9=\{x:x\equiv2\pmod9\}.
\]

Every positive orbit meets \(S_9\). citeturn134721view0

For \(x\in S_9\), let \(P(x)\) be its first positive return to \(S_9\). Write

\[
0=B,\qquad 1=R
\]

for the even and odd shortcut branches.

The relevant residue transitions modulo \(9\) are

\[
\begin{array}{c|cc}
r&B(r)&R(r)\\ \hline
2&1&8\\
1&5&2\\
5&7&8\\
7&8&2\\
8&4&8\\
4&2&2.
\end{array}
\]

Reading all paths from \(2\) back to \(2\) with no internal occurrence of \(2\) gives a complete first-return grammar.

### Theorem 6 — exact first-return language

Every first-return word is exactly one of

\[
01,\qquad 0001,
\tag{5.1}
\]

or

\[
0^{2j}1^m0e,
\qquad e\in\{0,1\},
\tag{5.2}
\]

with

\[
\begin{cases}
j=0,\quad m\ge1,\\
j=1,\quad m\ge1,\\
j=2,\quad m\ge0.
\end{cases}
\]

There are no other first-return words.

This reduces the infinite first-return relation to three finite modes, one unbounded counter \(m\), and one terminal bit \(e\).

### Exact affine formula

For a branch \(0^{2j}1^m0e\), put

\[
q=\frac{x+4^j}{2^{m+2j}}.
\]

Branch validity makes \(q\) an odd positive integer. Direct iteration gives

\[
\boxed{
P(x)=\frac{3^{m+e}q-1}{4}
=
\frac{
3^{m+e}(x+4^j)-2^{m+2j}
}{
2^{m+2j+2}
}.
}
\tag{5.3}
\]

The two exceptional branches give

\[
P_{01}(x)=\frac{3x+2}{4},
\tag{5.4}
\]

and

\[
P_{0001}(x)=\frac{3x+8}{16}.
\tag{5.5}
\]

Reversing (5.3), all inverse first-return candidates above \(y\in S_9\) are

\[
\boxed{
x_{j,m,e}(y)
=
2^{m+2j}\frac{4y+1}{3^{m+e}}-4^j,
}
\tag{5.6}
\]

whenever

\[
3^{m+e}\mid 4y+1
\]

and the resulting integer satisfies the branch conditions.

This is an exact distributed inverse-return enumerator: workers can be indexed by \((j,m,e)\), and every returned candidate is checked by integer divisibility alone.

---

## 6. Exact expansion and contraction classification

Using

\[
x=2^{m+2j}q-4^j
\]

in (5.3) gives

\[
\boxed{
4\bigl(P(x)-x\bigr)
=
\bigl(3^{m+e}-2^{m+2j+2}\bigr)q
+
4^{j+1}-1.
}
\tag{6.1}
\]

For every valid \(x>2\),

\[
\boxed{
P(x)>x
\iff
3^{m+e}>2^{m+2j+2}.
}
\tag{6.2}
\]

The expanding parameter ranges are therefore

\[
\begin{array}{c|cc}
j&e=0&e=1\\ \hline
0&m\ge4&m\ge1\\
1&m\ge7&m\ge5\\
2&m\ge11&m\ge8.
\end{array}
\tag{6.3}
\]

The branches \(01\) and \(0001\) contract for \(x>2\).

For completeness, when the coefficient in (6.1) is negative, the constant term cannot reverse the sign:

- for \(j=0\), the negative coefficient has magnitude greater than \(3\);
- for \(j=1\), it has magnitude greater than \(15\), except at \((m,e)=(4,1)\), where \(x\equiv2\pmod9\) forces the odd parameter \(q\ge15\);
- for \(j=2\), the only edge cases are \(m=0\), where positivity forces \(q\ge3\).

This proves (6.2) without approximation.

An exhaustive scan of all

\[
1{,}864{,}135
\]

integers \(x\equiv2\pmod9\), \(x<2^{24}\), found:

\[
\begin{array}{lr}
\text{first-return grammar failures}&0,\\
\text{affine sign-classification failures}&0,\\
\text{largest number of returns before falling below }x&54,
\end{array}
\]

with the last record occurring at

\[
x=13{,}920{,}959.
\]

The finite scan supports the formulas but is not used to prove them.

---

## 7. The persistent family: negative \(2\)-adic shadows

The exact return word

\[
W=101
\]

has

\[
P_W(x)=\frac{9x+7}{8}.
\tag{7.1}
\]

Its affine fixed point is

\[
\xi=-7.
\]

For every \(N\ge1\), define

\[
x_N=9\cdot8^N-7.
\tag{7.2}
\]

Then

\[
x_N\equiv2\pmod9
\]

and \(x_N\) realizes \(W\) for \(N\) consecutive first returns. Indeed,

\[
P_W^t(x_N)+7
=
9^{t+1}8^{N-t},
\qquad 0\le t\le N.
\tag{7.3}
\]

In particular,

\[
P_W^t(x_N)>x_N
\qquad(1\le t\le N).
\]

Thus:

\[
\boxed{
\text{No fixed number of returns can guarantee descent on }2\bmod9.
}
\]

The nested congruences defining the \(x_N\) converge \(2\)-adically to

\[
-7\in\mathbb Z_2,
\]

not to a positive ordinary integer.

This phenomenon is completely general.

### Theorem 7 — periodic expanding shadows are negative

Let a shortcut parity block \(W\) have length \(L\), contain \(S\) odd steps, and have affine map

\[
F_W(x)=\frac{3^Sx+C_W}{2^L},
\qquad C_W>0.
\]

Suppose

\[
3^S>2^L.
\]

Then the unique \(2\)-adic point with parity sequence \(W^\omega\) is

\[
\boxed{
\xi_W=-\frac{C_W}{3^S-2^L}<0.
}
\tag{7.4}
\]

If a positive integer \(x\) realizes \(W\) repeatedly \(r\) times, then

\[
x\equiv\xi_W\pmod{2^{rL}},
\tag{7.5}
\]

or equivalently,

\[
2^{rL}\mid
(3^S-2^L)x+C_W.
\tag{7.6}
\]

Hence

\[
r\le
\frac{
\log_2\bigl((3^S-2^L)x+C_W\bigr)
}{L}.
\tag{7.7}
\]

So no fixed positive integer can repeat an expanding block forever, although positive integers can shadow it for arbitrarily many finite repetitions.

This explains why naive finite-state pumping is unsound:

\[
\text{finite positive shadows}
\quad\longrightarrow\quad
\text{a negative \(2\)-adic limit},
\]

not necessarily an ordinary positive integer.

---

## 8. Relation to the all-depth negative-shadow theorem

The previous all-depth work proves the following unbounded-length statement.

For a positive valuation word \(a=(a_0,\ldots,a_{r-1})\), let

\[
A_k=\sum_{i<k}a_i,
\qquad
C_0=0,
\qquad
C_{k+1}=3C_k+2^{A_k}.
\]

Then

\[
3^r\mid C_r+2^{A_r},
\qquad
2^{A_k}<3^k\quad(1\le k\le r)
\]

forces

\[
a_0=\cdots=a_{r-1}=1.
\tag{8.1}
\]

Thus the all-ones word is the only strict-barrier valuation word satisfying the target-\(1\) terminal condition at any depth. The proof reconstructs an exact \(3x-1\) trajectory, establishes a uniform shell bound, reduces every length to a finite seed range, and completes that range by independent exact scans. fileciteturn19file1L13-L37 fileciteturn19file1L53-L69

This genuinely closes one infinite family of negative shadows.

It does **not** close distributed inverse-tree enumeration because a positive Collatz orbit is not known to produce, at linearly increasing depths, the synchronized terminal condition

\[
3^r\mid C_r+2^{A_r}
\]

for the same blocks that satisfy the coefficient barrier. That is the cross-prime synchronization problem. Periodic negative shadows also show that arbitrary target recurrence cannot replace target-\(1\) recurrence, while positive cycles lie on the opposite coefficient side. fileciteturn20file0L21-L35

The remaining family is therefore not merely “another long periodic word.” It is:

\[
\boxed{
\text{aperiodic switching among finite negative shadows,
while one fixed seed remains an ordinary positive integer.}
}
\]

---

## 9. What a valid distributed certificate would have to prove

The preceding results give a precise finite-certificate theorem.

### Theorem 8 — ordinary-spliceable inverse-tree certificate

Suppose a distributed computation produces a finite set \(Q\) of compressed inverse-tree states satisfying all of the following.

1. **Exact coverage.**  
   Every hypothetical positive orbit whose returns to \(S_9\) never fall below their initial value induces an infinite path in \(Q\).

2. **Exact transition closure.**  
   Every transition in \(Q\) represents all, and only, the corresponding integer affine branches.

3. **Ordinary-integer spliceability.**  
   Whenever the same state occurs at two cuts of a path, repeating the intervening block gives an actual positive-integer trajectory—not merely a locally valid \(2\)-adic trajectory.

4. **Loop exclusion.**  
   For every loop \(W\):
   - if \(3^{S(W)}>2^{L(W)}\), its fixed point is negative;
   - if \(3^{S(W)}<2^{L(W)}\), its positive fixed-point candidate is nonintegral, parity-invalid, or belongs to the trivial \(1\leftrightarrow2\) cycle.

Then the Collatz conjecture holds.

### Proof

Assume otherwise. Since every orbit meets \(S_9\), there is a least element \(x>2\) of \(S_9\) whose orbit does not reach \(1\).

Every later return \(P^t(x)\) is also nonterminating. Minimality therefore gives

\[
P^t(x)\ge x
\qquad(t\ge0).
\]

By exact coverage, this orbit induces an infinite path in the finite graph \(Q\). Some state repeats. Ordinary-integer spliceability permits the intervening loop \(W\) to be repeated indefinitely on a positive integer.

If

\[
3^{S(W)}>2^{L(W)},
\]

Theorem 7 says its fixed point is negative. If

\[
3^{S(W)}<2^{L(W)},
\]

loop exclusion says no nontrivial positive periodic trajectory exists. Equality is impossible because distinct positive powers of \(2\) and \(3\) cannot agree.

Every case is contradictory. ∎

The unresolved condition is **ordinary-integer spliceability**.

Equality of residues, carries modulo fixed powers, or finite automaton states does not imply this condition. It generally permits pumping only in \(\mathbb Z_2\), where points such as \(-7\) are legitimate.

A different valid architecture would replace pumping by a well-founded rank that strictly decreases after every certified block. The rank must have an unbounded component; the family (7.2) proves that no finite bounded-horizon rank can suffice.

---

## 10. The narrowest inverse-tree statement still missing

The most direct unified formulation uses accelerated odd inverse fibers.

Let

\[
U(n)=\frac{3n+1}{2^{\nu_2(3n+1)}}
\]

on positive odd integers, and define

\[
M_r(n)
=
\min\{y>0\text{ odd}:U^r(y)=U^r(n)\}.
\tag{10.1}
\]

Then

\[
M_{r+1}(n)\le M_r(n)\le n.
\]

Moreover:

\[
\boxed{
\text{Collatz}
\iff
\forall n>1\text{ odd}\ \exists r\ge1:\ M_r(n)<n.
}
\tag{10.2}
\]

Indeed, a smaller member of the same inverse fiber merges with \(n\); strong induction then proves termination. Conversely, if \(n\) reaches \(1\), a sufficiently deep fiber contains \(1<n\). This exact equivalence was isolated in the stationary inverse-fiber framework. fileciteturn19file3L258-L320

This is the correct form of “distributed inverse-tree coverage”:

- not merely one node in every residue class;
- not merely one node below a uniform depth;
- but a **smaller positive competitor in the inverse fiber above the actual endpoint of the same fixed integer**.

At every finite depth, all candidates in (10.1) can be enumerated and verified exactly. What has not been found is a recursively closed compression law proving that some depth always has

\[
M_r(n)<n.
\]

---

# Final assessment of Approach 96

Distributed inverse-tree enumeration does not currently give a full proof. It produces the following rigorous picture:

\[
\begin{array}{c}
\text{raw congruence coverage}\\
\Downarrow\\
\text{true but component-blind}
\end{array}
\]

\[
\begin{array}{c}
\text{trajectory-sensitive shallow coverage}\\
\Downarrow\\
\text{exactly equivalent to Collatz}
\end{array}
\]

\[
\begin{array}{c}
\text{finite congruence compression}\\
\Downarrow\\
\text{defeated by negative \(2\)-adic shadows}
\end{array}
\]

\[
\begin{array}{c}
\text{all-depth target-\(1\) exclusion}\\
\Downarrow\\
\text{closes one terminal family, but not synchronization}
\end{array}
\]

The exact outstanding statement is either

\[
\forall n\ge1\ \exists k:
D_k(n\bmod2^k)
\le k+s_k(n)\log_2 3,
\]

or, more efficiently,

\[
\forall n>1\text{ odd}\ \exists r:
M_r(n)<n.
\]

Both are complete proof targets. Neither has been established by the distributed enumeration, and the explicit \(-7\) shadow shows why a residue-only or bounded-return certificate cannot establish them.

[Download the exact inverse-tree and first-return audit bundle](sandbox:/mnt/data/collatz_inverse96_audit.zip)