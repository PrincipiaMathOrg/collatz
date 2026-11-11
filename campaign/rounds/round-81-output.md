model: GPT-5.6 Pro (Chat mode)
round: 81 -- approach 76, Strongly sufficient arithmetic progressions
front: proof
sent: 2026-08-16T23:32Z
worked: 47m 46s

---

# Outcome

I did **not** obtain a valid full proof. More decisively, the proposed implication

> finite strongly sufficient congruence set + uniform descent from every visit  
> \(\Longrightarrow\) Collatz

is false under its natural interpretation.

In fact, there is a general finite-state obstruction: **every finite union of arithmetic progressions capable of meeting the coprime-to-\(3\) part of an orbit has expanding first-return branches, and arbitrarily long positive-integer trajectories can shadow those branches without descending at any return to the set.**

Thus approach 76 cannot work through a local or bounded return-descent certificate. Below is the exact theorem, its proof, and the narrow replacement statement that really would prove Collatz.

---

## 1. Definitions and the known sufficient sets

Use the shortcut Collatz map

\[
T(n)=
\begin{cases}
B(n):=n/2,&n\text{ even},\\[2mm]
R(n):=(3n+1)/2,&n\text{ odd}.
\end{cases}
\]

The strongly sufficient-set literature distinguishes:

- **forward sufficient:** every divergent orbit meets \(S\);
- **cycle sufficient:** every nontrivial positive cycle meets \(S\);
- **backward sufficient:** an additional condition concerning infinite back-tracing paths;
- **strongly sufficient:** all three.

For the ordinary Collatz conjecture, only forward and cycle sufficiency are needed; backward sufficiency is extra. Monks et al. prove that every positive orbit meets \(2\bmod 9\), hence \(2\bmod 9\) is strongly sufficient, and they give a graph criterion producing many other examples. citeturn459658view0turn459658view3

They also prove that

\[
S_{27}=\{n:n\equiv20\pmod{27}\}
\]

is both forward and cycle sufficient. citeturn895506view1

So the first half of approach 76 is already available: there are very small finite congruence sets meeting both possible types of counterexample.

The problem is the proposed descent step.

---

## 2. The exact induction statement that would be sufficient

Here is the correct formulation.

### Proposition 1 — return-descent criterion

Let \(S\subseteq\mathbb N\) be forward sufficient and cycle sufficient. Suppose that for every \(x\in S\), at least one of the following holds:

\[
T^j(x)=1
\quad\text{for some }j\geq 0,
\]

or

\[
T^j(x)\in S
\quad\text{and}\quad
T^j(x)<x
\quad\text{for some }j\geq1.
\tag{RD}
\]

Then the Collatz conjecture holds.

### Proof

Suppose Collatz is false. There is then either a divergent orbit or a nontrivial cycle. By forward or cycle sufficiency, it contains an element of \(S\).

Consequently, the set

\[
\mathcal B_S
 =
 \{x\in S:\text{the orbit of }x\text{ does not reach }1\}
\]

is nonempty. Let \(x\) be its least element.

Condition (RD) cannot give \(T^j(x)=1\), since \(x\) is bad. It therefore gives some

\[
y=T^j(x)\in S,\qquad y<x.
\]

But the orbit of \(y\) is a tail of the orbit of \(x\), so \(y\) also does not reach \(1\). Thus \(y\in\mathcal B_S\), contradicting the minimality of \(x\). ∎

Therefore, for any forward-and-cycle sufficient \(S\),

\[
\boxed{\text{Collatz is equivalent to eventual descent to a smaller member of }S.}
\]

The essential phrase is **smaller member of \(S\)**. Merely descending below the current value somewhere outside \(S\) is not enough.

---

## 3. Why ordinary “descent whenever visited” is insufficient

Take

\[
S_{\mathrm{even}}=\{n:n\equiv0\pmod2\}.
\]

The literature lists \(0\bmod2\) as strongly sufficient. citeturn895506view0

This is also elementary. A positive orbit cannot remain odd forever: if

\[
n_{j+1}=R(n_j)
\]

for all \(j\), then

\[
n_j+1=\frac{3^j(n_0+1)}{2^j}.
\]

Integrality for every \(j\) would force \(2^j\mid n_0+1\) for every \(j\), which is impossible. Hence every infinite positive orbit visits an even number.

But every \(x\in S_{\mathrm{even}}\) has the strongest possible uniform descent:

\[
T(x)=\frac{x}{2}<x.
\]

If “strongly sufficient plus uniform descent” were enough, these two trivial observations would already prove Collatz.

The issue is visible in

\[
6\longmapsto3\longmapsto5\longmapsto8.
\]

The visit \(6\in S_{\mathrm{even}}\) is followed by a descent to \(3<6\), but the next visit to \(S_{\mathrm{even}}\) is \(8>6\).

A hypothetical bad orbit could similarly have successively larger visits to \(S\), while each visit is followed by a temporary descent outside \(S\). Strong sufficiency does not say that \(S\) contains the global minimum of the orbit.

So the original proposed inference is logically invalid even with a one-step, factor-\(1/2\) descent.

---

# 4. A general obstruction to return descent

The natural repair is to ask that the **next return to \(S\)** be smaller. Unfortunately, that repair is impossible for every finite congruence set.

## Theorem 2 — expanding-return obstruction

Let \(S\) be a finite union of arithmetic progressions. Suppose \(S\) contains at least one congruence class represented by integers coprime to \(3\). Then:

1. there are infinitely many \(x\in S\) whose first subsequent return to \(S\) occurs at a value larger than \(x\);
2. for every \(N\geq1\), there is an \(x\in S\) such that none of the first \(N\) subsequent visits of its orbit to \(S\) is below \(x\).

In particular, no such \(S\) has uniform first-return descent, and no fixed number of returns can guarantee descent.

Every finite collection of congruence classes can be rewritten using one common modulus \(M\), so it suffices to prove this for a periodic set modulo \(M\).

---

## 4.1 The exact finite-state graph

Write

\[
M=2^a d,\qquad d\text{ odd}.
\]

For an integer \(n\), let

\[
\epsilon_j(n)=T^j(n)\pmod2.
\]

The first \(a\) parity bits

\[
Q_a(n)=
\bigl(\epsilon_0(n),\ldots,\epsilon_{a-1}(n)\bigr)
\]

are determined by \(n\bmod2^a\), and conversely every binary word of length \(a\) corresponds to exactly one class modulo \(2^a\).

After an orbit has become coprime to \(3\), represent its congruence state by

\[
\bigl(u_0u_1\cdots u_{a-1},\,r\bmod d\bigr),
\]

where \(u_0\cdots u_{a-1}=Q_a(n)\). When \(3\mid d\), restrict \(r\) to residues not divisible by \(3\).

There are two possible successor states:

\[
(u_0u_1\cdots u_{a-1},r)
\longrightarrow
(u_1\cdots u_{a-1}c,T_{u_0}(r)),
\qquad c\in\{0,1\},
\tag{1}
\]

where \(T_0=B\) and \(T_1=R\).

This graph is exact: a path of length \(L\) fixes \(a+L\) parity bits and one residue modulo \(d\). By the Chinese remainder theorem, it is realized by an entire arithmetic progression modulo

\[
2^{a+L}d.
\tag{2}
\]

Thus every finite path has infinitely many positive-integer realizations.

---

## 4.2 Strong connectivity

The relevant residue graph is strongly connected.

When \(3\nmid d\), \(B\) and \(R\) are permutations modulo \(d\), and the group they generate acts transitively. Since the generators have finite order, their inverses can be replaced by positive powers, so directed reachability is also transitive. citeturn459658view1turn459658view2

When

\[
d=3^k b,\qquad \gcd(b,6)=1,
\]

the graph facts in Monks et al. give:

- modulo \(3^k\), the black map \(B\) cycles through all residues coprime to \(3\);
- the red map \(R\) forms a rooted tree ending at \(-1\), with a red loop at \(-1\);
- in particular, \(R^k\) sends every admissible residue modulo \(3^k\) to \(-1\). citeturn344040view0turn344040view1

Modulo \(b\), the \(B,R\) semigroup is transitive. Given any CRT pair modulo \(3^k b\), one may:

1. apply \(R^k\) to reset its \(3^k\)-coordinate to \(-1\);
2. use a word in \(B,R\) to adjust its \(b\)-coordinate;
3. apply \(R^k\) again to reset the \(3^k\)-coordinate without losing the chosen \(b\)-target.

A similar construction, followed by a suitable power of \(B\), reaches any desired target pair. Hence the pruned residue graph modulo every odd \(d\) is strongly connected.

Finally, the parity-window graph (1) is strongly connected as well. From a window \(u\), first consume the fixed bits of \(u\); choose a residue-control word \(z\) reaching the desired residue; then append the desired target window \(v\). The applied branch word is \(uz\), while the final stored window is \(v\).

---

## 4.3 The expanding loop at \(-1\)

Consider the distinguished state

\[
p=(1^a,-1\bmod d).
\]

It has a red self-loop, because

\[
R(-1)=\frac{3(-1)+1}{2}=-1.
\]

Let \(A\) be the set of states corresponding to \(S\).

If \(p\in A\), this red loop itself is an expanding first return.

If \(p\notin A\), strong connectivity supplies:

- a path from \(A\) to \(p\);
- a path from \(p\) back to \(A\).

Trim the first path after its last visit to \(A\), and trim the second at its first visit to \(A\). Insert \(L\) red loops at \(p\). The resulting path starts in \(A\), ends in \(A\), and has no internal \(A\)-state. It is therefore a first-return path to \(S\).

Let the fixed parts of the path have length \(\ell_0\) and contain \(q_0\) red edges. After inserting the loops, its affine multiplicative coefficient is

\[
\lambda_L
 =
 \frac{3^{q_0+L}}{2^{\ell_0+L}}
 =
 \frac{3^{q_0}}{2^{\ell_0}}
 \left(\frac32\right)^L.
\]

Thus

\[
\lambda_L\longrightarrow\infty.
\]

For sufficiently large \(L\),

\[
\lambda_L>1.
\]

Every branch word \(w\) has an affine formula

\[
T_w(n)=\frac{3^{q(w)}n+C_w}{2^{|w|}},
\qquad C_w\geq0.
\tag{3}
\]

Consequently, every positive integer realizing the constructed word satisfies

\[
T_w(n)>n.
\]

By the finite-path lifting property (2), infinitely many positive integers realize it. Choosing a sufficiently large representative also guarantees that the finite path does not pass through \(1\).

This proves the first assertion of Theorem 2.

---

## 4.4 Arbitrarily many returns without descent

Form the induced first-return graph on \(A\). It is strongly connected: any path between two \(A\)-vertices can be split at its intermediate \(A\)-visits into first-return paths.

The expanding first-return edge constructed above can have arbitrarily large coefficient. Choose a fixed first-return path from its endpoint back to its starting vertex. There are only finitely many cumulative multiplicative coefficients along that return path, all positive. By inserting sufficiently many red loops at \(p\), the initial expansion can be made large enough that every subsequent \(A\)-visit around the resulting closed return cycle remains above the value at the beginning of the cycle.

Repeat that finite return cycle \(N\) times. The entire repeated path is still finite, so it lifts to infinitely many positive integers.

Hence, for every \(N\), some positive orbit has at least \(N\) visits to \(S\) without reaching a smaller member of \(S\). ∎

---

# 5. Exact obstruction for \(2\bmod9\)

The general theorem has an especially simple explicit form for the canonical strongly sufficient progression

\[
S_9=\{n:n\equiv2\pmod9\}.
\]

Modulo \(9\),

\[
R(2)=8,\qquad R(8)=8,\qquad B(8)=4,\qquad R(4)=2.
\]

Therefore, for every \(m\geq1\), the word

\[
W_m=R^mBR
\]

gives a first-return path

\[
2\longrightarrow8\longrightarrow\cdots
\longrightarrow8\longrightarrow4\longrightarrow2
\pmod9.
\]

Its affine map is

\[
F_m(x)
=
T^{m+2}(x)
=
\frac{3^{m+1}(x+1)-2^m}{2^{m+2}}.
\tag{4}
\]

Hence

\[
F_m(x)-x
=
\frac{
\bigl(3^{m+1}-2^{m+2}\bigr)x
+
\bigl(3^{m+1}-2^m\bigr)
}{2^{m+2}}.
\]

For every \(m\geq1\),

\[
3^{m+1}>2^{m+2},
\]

so

\[
F_m(x)>x
\]

for every positive \(x\) realizing the word.

For \(m=1\),

\[
W_1=RBR,\qquad F_1(x)=\frac{9x+7}{8}.
\]

Examples include

\[
65\longmapsto98\longmapsto49\longmapsto74,
\]

and both \(65\) and \(74\) are \(2\bmod9\).

More strongly, define

\[
x_N=9\cdot8^N-7.
\]

For \(j=0,\ldots,N\), let

\[
x_{N,j}=9^{j+1}8^{N-j}-7.
\]

Then

\[
x_{N,0}=x_N,
\]

and

\[
F_1(x_{N,j})=x_{N,j+1}.
\]

Indeed,

\[
F_1(x)+7=\frac98(x+7).
\]

Every \(x_{N,j}\) satisfies

\[
x_{N,j}\equiv-7\equiv2\pmod9,
\]

and

\[
x_{N,j+1}-x_{N,j}
=
9^{j+1}8^{N-j-1}>0.
\]

Thus the orbit of \(x_N\) has \(N\) successive, strictly increasing returns to the strongly sufficient class \(2\bmod9\).

For example,

\[
569\longmapsto_{RBR}641\longmapsto_{RBR}722,
\]

and

\[
4601\longmapsto_{RBR}5177
\longmapsto_{RBR}5825
\longmapsto_{RBR}6554.
\]

The limiting symbolic pattern is explained by the negative integer

\[
-7\longmapsto_R-10\longmapsto_B-5\longmapsto_R-7.
\]

So the positive numbers \(x_N\) are arbitrarily long \(2\)-adic shadows of the negative cycle

\[
-7\to-10\to-5\to-7.
\]

Every finite amount of congruence information permits those shadows; only the requirement that **one fixed positive integer** sustain the pattern forever distinguishes a genuine counterexample from the negative or \(2\)-adic orbit.

---

# 6. The same obstruction for \(20\bmod27\)

The class \(20\bmod27\) is known to meet every divergent orbit and every nontrivial cycle. citeturn895506view1

Nevertheless, for every \(m\geq2\),

\[
R^mBR
\]

is a first-return word:

\[
20
\xrightarrow{R}17
\xrightarrow{R}26
\xrightarrow{R}\cdots\xrightarrow{R}26
\xrightarrow{B}13
\xrightarrow{R}20
\pmod{27}.
\]

Its affine formula is again (4), and its multiplicative coefficient is

\[
\frac{3^{m+1}}{2^{m+2}}>1.
\]

For example, with \(m=4\),

\[
47\to71\to107\to161\to242\to121\to182,
\]

where

\[
47\equiv182\equiv20\pmod{27},
\]

and there is no intermediate visit to \(20\bmod27\).

So even the progression specifically designed to hit both failure modes cannot possess first-return descent.

---

# 7. The narrow statement that really remains

Because every positive orbit visits \(2\bmod9\), the following statement is equivalent to Collatz:

## \(S_9\)-return descent lemma

For every positive \(x\equiv2\pmod9\), either its orbit reaches \(1\), or there exists \(k\geq1\) such that

\[
T^k(x)\equiv2\pmod9
\qquad\text{and}\qquad
T^k(x)<x.
\tag{5}
\]

The implication from (5) to Collatz is Proposition 1. The converse is immediate.

Theorem 2 and the explicit family \(x_N\) establish that:

- \(k\) cannot be bounded uniformly;
- the number of intervening returns cannot be bounded uniformly;
- descent cannot be proved from the first return;
- no fixed finite congruence automaton can force the descent;
- arbitrarily deep finite counterexample-like prefixes always exist.

Equivalently, let \(\mathcal W_{S_9}\) be the collection of first-return parity words to \(2\bmod9\). Each has an affine map

\[
F_w(x)=\frac{3^{q(w)}x+C_w}{2^{|w|}}.
\]

A counterexample would give one fixed positive integer \(x_0\) and an infinite concatenation

\[
x_{i+1}=F_{w_i}(x_i),
\qquad x_i\equiv2\pmod9,
\qquad x_i\geq x_0
\]

for every \(i\).

Every finite initial concatenation is compatible with some positive integer. What must be ruled out is simultaneous compatibility at **all** depths for one fixed positive integer.

That is precisely the ordinary-integer versus \(2\)-adic synchronization problem. The finite congruence graph sees the negative and \(2\)-adic shadow orbits but has no mechanism for recognizing eventual termination of an ordinary binary expansion.

Recent work on paradoxical Collatz segments reaches a related conclusion: an integer of infinite stopping time would generate infinitely many segments whose multiplicative coefficient predicts contraction but whose endpoint does not descend. It does not eliminate such segments, and therefore does not supply the missing synchronization theorem. citeturn459658view5

---

# Final assessment

Approach 76 yields a useful reduction, but not a proof:

\[
\boxed{\text{Strong sufficiency identifies where a bad orbit must go.}}
\]

What it does **not** provide is:

\[
\boxed{\text{control of the height at successive visits.}}
\]

The proposed local descent step is invalid, as shown already by the strongly sufficient set of even integers. Replacing it by first-return descent repairs the logic, but Theorem 2 shows that first-return or bounded-return descent is impossible for **every finite union of arithmetic progressions**. The explicit family

\[
x_N=9\cdot8^N-7
\]

shows this obstruction at arbitrary depth inside the canonical strongly sufficient class \(2\bmod9\).

A valid continuation of the idea would therefore need one of two genuinely stronger ingredients:

\[
\text{a proof that a sufficient set contains the global minimum of every bad orbit,}
\]

or

\[
\text{an unbounded, history-dependent rank that eventually decreases at }S\text{-returns.}
\]

Either ingredient must distinguish positive ordinary integers from the negative and \(2\)-adic shadow trajectories that satisfy every finite modular test. The exact remaining statement is the \(S_9\)-return descent lemma (5), which is equivalent to the full Collatz conjecture and cannot be reduced to a finite local congruence certificate.