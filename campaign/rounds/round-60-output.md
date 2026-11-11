model: GPT-5.6 Pro (Chat mode)
round: 60 -- approach 55, Sum-product growth modulo 3^r
front: proof
sent: 2026-08-16T02:41Z
worked: 45m 26s

---

# Result of the sum–product attack

I do **not** obtain a valid full proof of the Collatz conjecture from Approach 55. The obstruction is now precise: the proposed principle

> “a critical survivor set must expand modulo \(3^r\)”

is false without a substantial extra hypothesis. The carry dynamics are \(3\)-adically **contracting**, and a hypothetical obstruction initially supplies a single nested, graph-like ray—not the large, multiscale nonconcentrated family required by sum–product theorems.

What follows is the rigorous reduction, several exact new lemmas, an explicit failure of naive residue injectivity, and the exact amplification theorem that would be needed to repair the approach.

---

## 1. Exact carry dynamics

For a valuation word

\[
w=(a_0,\ldots ,a_{r-1}),\qquad a_i\ge 1,
\]

write

\[
A_k=\sum_{i<k}a_i,\qquad Q_k=2^{A_k},
\]

and define

\[
C_0=0,\qquad C_{k+1}=3C_k+Q_k.
\]

The standard affine identity is

\[
2^{A_r}U^r(n)=3^rn+C_r.
\]

For concatenated words \(w=uv\),

\[
C_{uv}=3^{|v|}C_u+2^{A(u)}C_v.
\]

These identities, including the exact terminal-suffix locality theorem, have already been proved in the existing framework. fileciteturn8file0L100-L137 fileciteturn8file0L204-L235

Set

\[
B_k=C_k+Q_k.
\]

Then

\[
\boxed{
B_{k+1}=3B_k+(2^{a_k}-2)Q_k,
\qquad
Q_{k+1}=2^{a_k}Q_k.
}
\tag{1}
\]

The target-one terminal condition is simply

\[
\boxed{3^r\mid B_r.}
\tag{2}
\]

The strict prefix barrier is

\[
\boxed{Q_k<3^k\qquad(1\le k\le r).}
\tag{3}
\]

For a shortest nontrivial word satisfying (2)–(3), the existing minimality argument gives a strict terminal record,

\[
A_i-i\log_2 3<A_r-r\log_2 3<0\qquad(i<r),
\]

as well as

\[
A_r=\lfloor r\log_2 3\rfloor,
\qquad a_0=1,\qquad a_{r-1}>1.
\tag{4}
\]

The corresponding \(3x-1\) trajectory has endpoint \(1\), and if

\[
m_0=\frac{B_r}{3^r}=1+\Delta,
\qquad
h=\#\{i:a_i>1\},
\]

then the activation identity gives

\[
\boxed{0<\Delta<h.}
\tag{5}
\]

These minimal-word and activation statements have been independently audited. fileciteturn7file0L14-L61

Thus the terminal problem is equivalent to proving that the arithmetic divisibility in (2) cannot occur for a nontrivial strict-record word.

---

## 2. The favorable entropy gap

Put

\[
\alpha=\log_2 3,\qquad \beta=\alpha-1=\log_2(3/2).
\]

Writing \(b_i=a_i-1\ge0\), the barrier implies

\[
\sum_{i<r}b_i\le \lfloor\beta r\rfloor.
\]

Therefore the number \(N_r\) of barrier words is at most

\[
N_r
\le
\binom{r+\lfloor\beta r\rfloor}{r}.
\]

By Stirling’s formula,

\[
N_r\le r^{O(1)}\lambda^r,
\]

where

\[
\lambda=
\frac{\alpha^\alpha}{\beta^\beta}
=
2.839513730497\ldots <3.
\tag{6}
\]

Consequently,

\[
\frac{N_r}{3^r}
\le
r^{O(1)}
\left(\frac{2.839514}{3}\right)^r.
\tag{7}
\]

So an equidistributed residue map would have exponentially fewer than one word per residue on average. This is the genuine reason the approach initially looks promising.

But average scarcity is not zero-fibre rigidity: an exceptional structured residue can contain one word forever. The all-ones word is exactly such an exception.

---

## 3. Terminality is nested, not independent

### Lemma 1 — Every suffix is terminal

Let \(w=uv\), with \(|u|=n\) and \(|v|=s\). Then

\[
B_{uv}=3^sC_u+2^{A(u)}B_v.
\tag{8}
\]

If \(3^{n+s}\mid B_{uv}\), reduction modulo \(3^s\) gives

\[
3^s\mid B_v.
\]

Thus:

\[
\boxed{\text{Every suffix of a terminal word is terminal at its own depth.}}
\tag{9}
\]

This is an important correction to the probabilistic picture. The \(r\) rescue conditions are not \(r\) roughly independent events. They form one triangular tower of exact divisibilities.

If

\[
B_v=3^s m_v,
\]

then (8) becomes

\[
B_{uv}
=
3^s\bigl(C_u+2^{A(u)}m_v\bigr).
\]

Hence

\[
\boxed{
3^{n+s}\mid B_{uv}
\iff
C_u+2^{A(u)}m_v\equiv0\pmod{3^n}.
}
\tag{10}
\]

Equation (10) is the exact point at which a sum–product projection enters:

\[
a+cb\equiv0\pmod{3^n},
\]

with

\[
a=C_u,\qquad c=2^{A(u)},\qquad b=m_v.
\]

This is the strongest clean formulation of Approach 55.

---

## 4. The rescue relation is a graph

Fix a prefix \(u\) of length \(r-1\), and append an exponent \(a\). From (1),

\[
B_{ua}=3C_u+Q_u(1+2^a).
\]

Terminality is equivalent to

\[
2^a
\equiv
-1-3C_uQ_u^{-1}
\pmod{3^r}.
\tag{11}
\]

Now \(2\) generates \((\mathbb Z/3^r\mathbb Z)^\times\), with

\[
\operatorname{ord}_{3^r}(2)=2\cdot3^{r-1}.
\]

Thus (11) determines **at most one** class

\[
a\pmod{2\cdot3^{r-1}}.
\]

The barrier permits only \(a=O(r)\), vastly shorter than the period \(2\cdot3^{r-1}\). Therefore:

\[
\boxed{
\text{For every admissible prefix, there is at most one admissible terminal extension.}
}
\tag{12}
\]

So the rescue set is not a thick subset of a residue ring. It is the graph of an extremely sparse function from prefixes to exponents.

That is almost the opposite of the hypothesis required for an ordinary sum–product argument.

---

## 5. The branch maps contract \(3\)-adically

Normalize by the unit \(Q_k\):

\[
z_k=B_kQ_k^{-1}\pmod{3^r}.
\]

Equation (1) becomes

\[
\boxed{
z_{k+1}
=
2^{-a_k}\bigl(3z_k+2^{a_k}-2\bigr).
}
\tag{13}
\]

For two states using the same branch \(a\),

\[
z_{k+1}-z'_{k+1}
=
3\cdot2^{-a}(z_k-z'_k).
\]

Hence

\[
v_3(z_{k+1}-z'_{k+1})
=
v_3(z_k-z'_k)+1.
\tag{14}
\]

Each individual branch is therefore a strict \(3\)-adic contraction. Branching over many possible values of \(a\) may enlarge a union of images, but a single survivor ray becomes progressively **more concentrated**, not less.

This destroys a direct “iteration implies expansion” argument.

---

## 6. Two exact structured survivor rays

### The trivial ray

For \(w=1^r\),

\[
C_w=3^r-2^r,
\qquad
B_w=3^r.
\]

Thus \(1^r\) is terminal and satisfies the barrier at every depth.

### A nontrivial cycle ray

For the accelerated \(3x-1\) map

\[
U_-(m)=\frac{3m-1}{2^{v_2(3m-1)}},
\]

one has

\[
5\xrightarrow{\,a=1\,}7
\xrightarrow{\,a=2\,}5.
\]

Consequently, the infinite exponent ray

\[
(1,2,1,2,\ldots)
\]

is periodic. It also satisfies every prefix barrier:

\[
A_{2n}=3n<2n\log_2 3,
\]

and

\[
A_{2n+1}=3n+1<(2n+1)\log_2 3.
\]

Therefore a nontrivial barrier survivor can remain trapped in a two-state structured component forever. It does not have to expand.

The target-one condition excludes this particular cycle, but the example proves that any successful theorem must be **component-sensitive**. “Barrier plus persistence implies expansion” is false.

---

## 7. Naive residue injectivity is also false

Define

\[
\Phi_r(w)=B_w\bmod3^r.
\]

Computationally, \(\Phi_r\) appeared injective on all barrier words through depth \(18\). That pattern breaks at depth \(19\).

Consider

\[
w_1=(1^{15},2,3,1,3)
\]

and

\[
w_2=(1,2,1,2,1,2,1,2,1,2,2,2,1,1,2,2,1,1,3).
\]

Both satisfy

\[
A_k\le\lfloor k\log_2 3\rfloor
\qquad(1\le k\le19).
\]

Exact evaluation gives

\[
3^{19}=1\,162\,261\,467,
\]

\[
B(w_1)=1\,183\,691\,739,
\]

and

\[
B(w_2)=5\,832\,737\,607.
\]

Moreover,

\[
B(w_2)-B(w_1)
=
4\cdot3^{19}.
\]

Thus

\[
\boxed{
\Phi_{19}(w_1)=\Phi_{19}(w_2)=21\,430\,272.
}
\tag{15}
\]

Neither residue is zero, so this does not produce a terminal counterexample. It does prove that a simple “unique \(3\)-adic coding of barrier words” theorem is false.

The stronger zero-fibre statement

\[
\Phi_r^{-1}(0)=\{1^r\}
\tag{16}
\]

remains consistent with all computation. Exact reverse enumeration has verified (16) through \(r=78\); at depth \(78\), more than \(642\) million reverse states were checked. fileciteturn9file0L29-L53

---

## 8. Why available sum–product theorems do not apply directly

The current \(p\)-adic sum–product results are genuinely powerful, but their hypotheses are not supplied by one Collatz survivor.

Shen’s recent theorem proves expansion for sufficiently nonconcentrated subsets of \(\mathbb Z_p^\times\). Its ABC form controls projections

\[
a+cb
\]

when the \(b\)-set and coefficient set \(c\) have positive multiscale dimension and when one has a dense graph of pairs \((a,b)\). citeturn369625view0

The Collatz situation fails these hypotheses in three separate ways.

### 8.1 One bad word gives one incidence

At a cut \(w=uv\), equation (10) gives one pair

\[
(C_u,m_v)
\]

and one coefficient \(2^{A(u)}\). It does not produce a dense graph in \(A\times B\).

A theorem about large sets cannot exclude one exceptional edge unless that edge can first be **amplified** into many related edges.

### 8.2 The coefficient set has dimension zero

At all cuts of a length-\(r\) word, the possible coefficients are

\[
2^{A(u)},\qquad 0\le A(u)\le \alpha r.
\]

There are only \(O(r)\) of them.

At a modulus \(3^n\) with \(n\asymp r\), their normalized dimension is

\[
\frac{\log O(r)}{\log 3^n}
=
O\!\left(\frac{\log r}{r}\right)
\longrightarrow0.
\]

Shen’s ABC theorem requires a coefficient set with a fixed positive multiscale dimension. The Collatz coefficients are far too sparse at the full terminal scale.

One can lower the modulus to \(3^{O(\log r)}\), where \(O(r)\) coefficients become substantial. But that controls only \(O(\log r)\) ternary digits, not the required \(r\) digits.

This is not a technical distinction. There are strict-record words of length approximately \(3^q\) that imitate terminality through exactly \(q\) digits. Thus every bounded-depth or logarithmic-depth argument has explicit adversarial examples. fileciteturn7file1L118-L187

### 8.3 The full barrier set is still too small for large-set estimates

Finite-valuation-ring estimates such as Pham’s require sets whose cardinalities are very close to the size \(3^r\) of the ambient ring—for example, hypotheses of the form

\[
|A|\gg 3^{r-1/3}.
\]

The barrier language has only about

\[
2.8395^r=3^{0.94996\ldots r}
\]

elements before any terminal restrictions are imposed, so these large-set estimates do not apply. citeturn232272view1

---

## 9. The exact missing amplification theorem

The sum–product strategy could be repaired by proving the following genuinely new statement.

### Component-sensitive amplification lemma

There exist constants

\[
\kappa,\sigma,\eta>0
\]

such that any nontrivial strict-record terminal word \(w\) of length \(r\), whose reverse trajectory lies in the \(3x-1\) component rooted at \(1\), produces some scale

\[
n\ge\kappa r
\]

and sets

\[
A,B\subset\mathbb Z/3^n\mathbb Z,
\qquad
\Theta\subset(\mathbb Z/3^n\mathbb Z)^\times
\]

with the following properties:

1. \(B\) and \(\Theta\) are nonconcentrated at every \(3\)-adic scale and have size at least \(3^{\sigma n}\).

2. There is a dense graph \(G\subset A\times B\).

3. For every \(\theta\in\Theta\), the rescue projections

   \[
   \{a+\theta b:(a,b)\in G\}
   \]

   remain inside a set of size at most

   \[
   3^{\eta n}|A|,
   \]

   where \(\eta\) is smaller than the expansion exponent supplied by the \(p\)-adic ABC theorem.

4. Periodic rays and rays lying in non-\(1\) components are excluded from this amplification assertion.

### Conditional proof

Assume the lemma. Shen’s ABC theorem applied to \(A,B,\Theta,G\) produces some \(\theta\in\Theta\) for which

\[
|\{a+\theta b:(a,b)\in G\}|
\ge
3^{\chi n}|A|
\]

for a fixed \(\chi>\eta\).

But the rescue property gives the opposite estimate

\[
|\{a+\theta b:(a,b)\in G\}|
\le
3^{\eta n}|A|.
\]

This is a contradiction. Therefore no nontrivial strict-record terminal word exists.

That would establish the desired all-depth zero-fibre theorem

\[
\boxed{
3^r\mid C_w+2^{A(w)},\quad
2^{A_k}<3^k\ \forall k
\quad\Longrightarrow\quad
w=1^r.
}
\tag{17}
\]

The missing part is not the application of sum–product. It is the amplification lemma that turns **one nested Collatz ray** into a large nonconcentrated incidence configuration.

The examples above show that no unconditional version of that lemma can hold:

- \(1^\infty\) is a singleton terminal ray;
- \((1,2)^\infty\) is a nontrivial periodic barrier ray;
- the terminal extension is a graph with outdegree at most one;
- fixed-depth terminal mimicry persists to arbitrarily large word lengths;
- residue coding is not globally injective.

Component sensitivity is therefore indispensable.

---

## 10. Why even (17) would not yet be a full Collatz proof

Within the current framework, terminal exclusion is only one of three logically separate requirements. A complete argument must also:

1. exclude nontrivial positive \(3x+1\) cycles;

2. prove that every hypothetical unbounded orbit yields arbitrarily long **nontrivial, consecutive, aligned** terminal/barrier blocks;

3. apply the all-depth exclusion (17).

The existing audit explicitly identifies these three obligations and notes that the cycle word has the opposite full-word slope from the terminal barrier, so terminal exclusion by itself does not settle cycles. fileciteturn5file0L74-L96

The synchronization problem is also stated explicitly in the existing structural write-up: terminal locality is proved, but no theorem yet forces one positive integer on an infinite retained ray to supply the required aligned inverse path. fileciteturn8file0L48-L51

---

# Final assessment

Approach 55 produces a clean and valuable reduction:

\[
\boxed{
\text{terminal Collatz obstruction}
\quad\Longrightarrow\quad
C_u+2^{A(u)}m_v\equiv0\pmod{3^{|u|}},
}
\]

which is exactly an affine \(a+cb\) incidence over \(\mathbb Z/3^n\mathbb Z\).

But the proposed expansion step is not presently valid. A counterexample candidate is one nested, contracting, graph-like ray, while available sum–product theorems require large nonconcentrated sets and positive-dimensional coefficient families. Periodic \(3x-1\) rays demonstrate that this structured obstruction is real.

Therefore I cannot honestly state a full Collatz proof from this route. The exact new theorem needed is the **component-sensitive amplification lemma** above, followed by the still-separate cycle and synchronization theorems. Without those statements, invoking sum–product would replace the central Collatz difficulty with an unproved assumption rather than resolve it.