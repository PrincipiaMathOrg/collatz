model: GPT-5.6 Pro (Chat mode)
round: 80 -- approach 75, Finite residue-class descent induction
front: proof
sent: 2026-08-16T23:06Z
worked: 19m 28s

---

# Verdict

The requested modulus \(M\) does **not** exist. In fact, the obstruction is stronger:

> No finite partition of the positive integers—not even an arbitrary one—can assign uniformly bounded Collatz descent times to all of its parts.

Thus approach 75, in its stated bounded-horizon form, cannot produce a proof of Collatz. This is not merely a remaining computational difficulty; the proposed certificate is mathematically impossible.

I use the shortcut map from our previous work,

\[
T(x)=
\begin{cases}
x/2,&x\equiv0\pmod 2,\\[1mm]
(3x+1)/2,&x\equiv1\pmod 2.
\end{cases}
\]

The conclusion is unchanged for the unshortened \(3x+1\) map.

---

## 1. The all-odd shadowing lemma

### Lemma 1

Let \(L\geq1\), \(q\geq1\), and

\[
x=2^Lq-1.
\]

Then for every \(0\leq j\leq L\),

\[
\boxed{\quad T^j(x)=3^j2^{L-j}q-1.\quad}
\]

In particular, whenever \(1\leq j\leq L\),

\[
T^j(x)>x.
\]

### Proof

The formula is clear for \(j=0\). Suppose that \(0\leq j<L\) and

\[
T^j(x)=3^j2^{L-j}q-1.
\]

Because \(L-j\geq1\), the number \(3^j2^{L-j}q-1\) is odd. Therefore the odd branch applies:

\[
\begin{aligned}
T^{j+1}(x)
&=\frac{3\left(3^j2^{L-j}q-1\right)+1}{2}\\
&=\frac{3^{j+1}2^{L-j}q-2}{2}\\
&=3^{j+1}2^{L-j-1}q-1.
\end{aligned}
\]

This proves the formula by induction.

For \(1\leq j\leq L\),

\[
\begin{aligned}
T^j(x)-x
&=\left(3^j2^{L-j}q-1\right)-\left(2^Lq-1\right)\\
&=2^{L-j}q\left(3^j-2^j\right)>0.
\end{aligned}
\]

So none of the first \(L\) iterates lies below \(x\). ∎

For example,

\[
31\longmapsto47\longmapsto71\longmapsto107
\longmapsto161\longmapsto242,
\]

which is the case \(31=2^5-1\). The lemma supplies arbitrarily long versions of this phenomenon.

An equivalent useful identity is

\[
\boxed{\quad T^j(x)+1=\left(\frac32\right)^j(x+1),
\qquad 0\leq j\leq L.\quad}
\]

At the end of the all-odd block,

\[
x+1=2^Lq,
\qquad
T^L(x)+1=3^Lq.
\]

This exact \(2^L\)-to-\(3^L\) transport is the arithmetic obstruction.

---

## 2. Unbounded ordinary stopping times

Define the stopping time

\[
\sigma(x)=\inf\{j\geq1:T^j(x)<x\},
\]

with \(\sigma(x)=\infty\) when no such \(j\) exists.

Lemma 1 immediately gives

\[
\boxed{\quad \sigma(2^Lq-1)>L.\quad}
\]

Consequently,

\[
\sup_{x\geq2}\sigma(x)=\infty
\]

unconditionally, regardless of whether Collatz itself is true.

More quantitatively, for every fixed \(K\), every sufficiently large integer in the progression

\[
x\equiv-1\pmod{2^K}
\]

has no descent during its first \(K\) steps. That progression has natural density \(2^{-K}\).

---

## 3. Nonexistence of the proposed modulus

### Theorem 2: no finite residue-class descent table

There do not exist an integer \(M\geq1\) and positive integers

\[
k_0,k_1,\ldots,k_{M-1}
\]

such that

\[
T^{k_r}(Mn+r)<Mn+r
\]

for every residue \(r\bmod M\) and every admissible \(n\), provided the admissible pairs cover all sufficiently large positive integers.

The assertion remains false even under the weaker requirement that, for each residue \(r\), every representative may choose its own time

\[
1\leq j\leq k_r.
\]

### Proof

Suppose such data exist, and let

\[
K=\max_{0\leq r<M}k_r.
\]

Choose \(L>K\) and choose \(q\) sufficiently large that

\[
x=2^Lq-1
\]

is among the integers covered by the proposed residue certificate.

Let \(r=x\bmod M\), so that \(x=Mn+r\) for the corresponding admissible \(n\). The certificate asserts that there is a time \(j\leq k_r\leq K<L\) such that

\[
T^j(x)<x.
\]

But Lemma 1 gives

\[
T^j(x)>x
\qquad
(1\leq j\leq L).
\]

This is a contradiction. ∎

Because \(q\) may be arbitrarily large, none of the following changes repairs the argument:

- allowing finitely many exceptional representatives in each residue class;
- requiring the inequality only for all sufficiently large \(n\);
- assigning finitely many candidate times to each residue;
- letting the descent time vary with \(n\), provided it remains bounded on each residue class;
- replacing the residue classes by any other finite cover of the positive integers.

Indeed, for any finite cover with finite horizon bounds, take the maximum horizon \(K\) and use \(2^{K+1}q-1\).

### Stronger corollary

There is no finite collection of sets \(A_1,\ldots,A_s\) covering all positive integers and finite bounds \(K_1,\ldots,K_s\) such that every \(x\in A_i\) has some

\[
1\leq j\leq K_i
\]

with \(T^j(x)<x\).

Thus the obstruction is not specific to residue classes. It rules out every **finite bounded-horizon direct-descent certificate**.

---

## 4. The conclusion is independent of the map convention

For the unshortened Collatz map

\[
C(x)=
\begin{cases}
x/2,&x\text{ even},\\
3x+1,&x\text{ odd},
\end{cases}
\]

put again \(x=2^Lq-1\). Direct induction gives

\[
C^{2j}(x)=3^j2^{L-j}q-1
\qquad (0\leq j\leq L),
\]

and

\[
C^{2j+1}(x)=3^{j+1}2^{L-j}q-2
\qquad (0\leq j<L).
\]

All these values, except the initial \(j=0\) value, exceed \(x\). Hence the unshortened map has no descent during its first \(2L\) steps. Its stopping times are therefore also unbounded, and the same finite-modulus contradiction applies.

For the accelerated odd-to-odd map, the same family produces arbitrarily long strings of valuation \(1\). This exact observation already appeared in our operator audit:

\[
U^j(2^m-1)=3^j2^{m-j}-1
\]

through an arbitrarily long initial segment. fileciteturn2file2L81-L91

---

## 5. What strong induction actually requires

The underlying induction idea is correct.

### Proposition 3

The Collatz conjecture is equivalent to

\[
\forall x>1\;\exists k\geq1
\quad T^k(x)<x.
\]

### Proof

If Collatz holds, the orbit of \(x>1\) eventually reaches \(1<x\).

Conversely, suppose every \(x>1\) has an iterate below itself. Use strong induction on \(x\). The result is trivial for \(x=1\). Given \(x>1\), choose \(k\) with

\[
y=T^k(x)<x.
\]

By the induction hypothesis, \(y\) reaches \(1\). Hence \(x\) reaches \(y\) and then reaches \(1\). ∎

The proposed finite table tries to replace the pointwise statement

\[
\forall x\;\exists k=k(x)
\]

by the uniform statement

\[
\exists K\;\forall x\;\exists k\leq K.
\]

The first is equivalent to Collatz. The second is false.

---

## 6. The exact survivor formulation

Define

\[
S_K=
\left\{
x>1:
T^j(x)\geq x
\text{ for every }1\leq j\leq K
\right\}.
\]

Lemma 1 shows

\[
\{\,2^Kq-1:q\geq1\,\}\subseteq S_K.
\]

Therefore

\[
\boxed{\quad S_K\neq\varnothing
\quad\text{for every finite }K.\quad}
\]

Indeed, every \(S_K\) is infinite.

On the other hand, Proposition 3 gives the exact reformulation

\[
\boxed{\quad
\text{Collatz}
\quad\Longleftrightarrow\quad
\bigcap_{K\geq1}S_K=\varnothing.
\quad}
\]

Thus a proof must establish **pointwise extinction without finite-level extinction**:

\[
S_K\neq\varnothing\quad\text{for every }K,
\qquad
\text{but no fixed positive integer belongs to every }S_K.
\]

This is the precise synchronization difficulty. A finite modulus would force \(S_K=\varnothing\) for one finite \(K\), which is impossible.

---

## 7. The \(2\)-adic reason the finite table fails

The nested congruence classes

\[
x\equiv-1\pmod{2},
\quad
x\equiv-1\pmod{2^2},
\quad
x\equiv-1\pmod{2^3},
\quad\ldots
\]

encode longer and longer all-odd parity prefixes.

Every finite cylinder contains positive integers, but their infinite intersection contains no positive ordinary integer. Its \(2\)-adic intersection is the point

\[
x=-1\in\mathbb Z_2,
\]

and \(-1\) is a fixed point of the \(2\)-adic shortcut map:

\[
T(-1)=\frac{3(-1)+1}{2}=-1.
\]

Thus positive integers can shadow a nonpositive \(2\)-adic orbit for arbitrarily long finite times. A fixed modulus sees only a finite shadow and cannot distinguish it from the infinite \(2\)-adic ray.

This is exactly the all-ones obstruction already isolated in our earlier notes:

\[
n_0=2^rL-1,
\qquad
n_r=3^rL-1.
\]

Those notes identified these cylinders as the reason arbitrarily long terminal blocks remain forward-realizable. fileciteturn2file3L119-L124

Recent residue-class work reaches the same boundary from another direction: it obtains exact finite-order periodic coverage by residue classes, but explicitly states that such finite structures do not prove universal coefficient stopping time or universal classical stopping time. citeturn335252view0turn916733view2

---

## 8. The viable replacement: finite control with an unbounded rank

A finite proof is not ruled out. What is ruled out is a finite **acyclic table of bounded direct descents in the ordinary magnitude**.

The corrected version is:

### Approach \(75'\): finite-state ranked descent

Construct finitely many exact arithmetic modes together with:

1. exact coverage of every positive integer;
2. exact closure under bounded Collatz blocks;
3. an unbounded, well-founded rank
   \[
   R(x,s)\in W
   \]
   for a well-order \(W\);
4. strict rank descent after each certified block unless the state is already in the known basin of \(1\).

If every nonterminal block satisfies

\[
R\!\left(T^{\ell(x)}(x),s'\right)
<
R(x,s),
\qquad
1\leq\ell(x)\leq K,
\]

then an infinite orbit would produce an infinite descending sequence in \(W\), which is impossible. The total stopping time may nevertheless be unbounded because the initial rank \(R(x,s)\) may grow with \(x\).

The all-odd obstruction shows that this rank must contain an unbounded component. Locally, the natural counter is visible immediately: for odd \(x\),

\[
T(x)+1=\frac{3(x+1)}2,
\]

and hence

\[
\boxed{\quad
v_2(T(x)+1)=v_2(x+1)-1.
\quad}
\]

So a cyclic state representing repeated odd steps can be justified by the decreasing counter \(v_2(x+1)\), even though the numerical value \(x\) increases. The unresolved problem is to combine this local counter with the resets produced by even steps and with the growing \(3\)-adic carry information into one global well-founded rank.

Our certificate audit already identified the required ingredients as finite presentation, exact coverage, exact transition closure, strict well-founded progress, and terminal soundness. fileciteturn3file0L13-L18 The marked-carry work likewise records fixed-modulus automata and bounded-horizon contraction as inadequate, pointing instead to a component-specific carry theorem or a finite-input min-plus envelope. fileciteturn2file0L17-L23

---

## Final status of approach 75

The proposed statement

\[
\exists M\;\forall r\bmod M\;\exists k_r<\infty\;
\forall n,\quad
T^{k_r}(Mn+r)<Mn+r
\]

is false.

The exact replacement target is

\[
\forall x>1\;\exists K(x)
\quad
T^{K(x)}(x)<x,
\]

proved through a **finite rule schema with an unbounded rank or counter**, rather than through a finite bounded-horizon residue table.

Accordingly, approach 75 should be reclassified as:

\[
\boxed{
\textbf{Ruled out as stated; viable only as finite-control,
unbounded-rank descent.}
}
\]