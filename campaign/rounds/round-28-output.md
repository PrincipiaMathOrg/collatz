model: GPT-5 Pro
round: 28 -- approach 23, A pointwise Bellman function
front: proof
sent: 2026-08-13T18:49:28Z
worked: 27m 28s

---

# Verdict

Under the standing shortcut convention

\[
T(n)=
\begin{cases}
n/2,&n\equiv0\pmod 2,\\[2mm]
(3n+1)/2,&n\equiv1\pmod 2,
\end{cases}
\]

the proposed Bellman certificate **cannot exist**. There is an explicit obstruction for every possible modulus \(M\), every possible table \(\phi\), and every finite horizon \(K\).

Thus this investigation does not produce a proof of Collatz. It produces something definitive in the other direction:

> **Approach 23 is impossible in its stated finite-table, bounded-horizon form.**

The shortcut normalization above is the standard one used in much of the \(3x+1\) literature. citeturn967972search0

---

## 1. Why the proposed certificate would have proved Collatz

Define

\[
V(n)=\log n+\phi(n\bmod M),
\]

where \(\phi:\mathbb Z/M\mathbb Z\to\mathbb R\). Suppose there were a rule

\[
1\le k(n)\le K
\]

such that

\[
V\bigl(T^{k(n)}n\bigr)<V(n)
\qquad\text{for every }n>1.
\tag{1}
\]

This really would be a complete proof.

### Certificate lemma

Assume (1). Then every positive integer reaches \(1\).

### Proof

Start with \(n_0>1\). As long as the orbit has not reached \(1\), define

\[
n_{i+1}=T^{k(n_i)}(n_i).
\]

Then

\[
V(n_{i+1})<V(n_i),
\]

so \(V(n_i)\) is strictly decreasing.

Let

\[
\phi_{\min}=\min_{r\in\mathbb Z/M\mathbb Z}\phi(r).
\]

Because

\[
\log n_i
=
V(n_i)-\phi(n_i\bmod M)
\le V(n_0)-\phi_{\min},
\]

we obtain

\[
n_i\le \exp\!\bigl(V(n_0)-\phi_{\min}\bigr).
\]

Therefore every \(n_i\) lies in a fixed finite set of positive integers. But a strictly decreasing sequence of values of the fixed function \(V\) cannot visit infinitely many points in a finite set. Hence the process must terminate. Since the descent condition is assumed at every \(n>1\), termination can occur only when the original Collatz orbit has reached \(1\). ∎

So the logic of the Bellman idea is sound. The problem is that the required certificate is structurally impossible.

---

# 2. The universal obstruction

Define the finite-horizon Bellman operator

\[
\mathcal B_KV(n)=\min_{1\le j\le K}V(T^j n).
\]

The desired assertion is

\[
\mathcal B_KV(n)<V(n)
\qquad(n>1).
\tag{2}
\]

The following theorem rules it out.

## Theorem: all-odd cylinder obstruction

Let \(M,K\ge1\), and let

\[
\phi:\mathbb Z/M\mathbb Z\to\mathbb R
\]

be arbitrary. Set

\[
V(n)=\log n+\phi(n\bmod M).
\]

Then there exists \(N>1\) such that

\[
V(T^jN)>V(N)
\qquad\text{for every }1\le j\le K.
\tag{3}
\]

In particular,

\[
\mathcal B_KV(N)>V(N).
\]

### Proof

Take

\[
N=2^{K+1}M-1.
\tag{4}
\]

We claim that for every \(0\le j\le K\),

\[
T^jN=3^j2^{K+1-j}M-1.
\tag{5}
\]

This is immediate for \(j=0\). Suppose it holds for some \(j<K\). Since

\[
3^j2^{K+1-j}M
\]

is even, \(T^jN\) is odd. Therefore

\[
\begin{aligned}
T^{j+1}N
&=\frac{3\left(3^j2^{K+1-j}M-1\right)+1}{2}\\
&=3^{j+1}2^{K-j}M-1,
\end{aligned}
\]

which proves (5) by induction.

Every one of these iterates satisfies

\[
T^jN\equiv -1\pmod M.
\tag{6}
\]

Moreover, for \(1\le j\le K\),

\[
\begin{aligned}
T^jN-N
&=
\left(3^j2^{K+1-j}M-1\right)
-\left(2^{K+1}M-1\right)\\
&=
2^{K+1-j}M(3^j-2^j)\\
&>0.
\end{aligned}
\tag{7}
\]

Consequently, using (6),

\[
\begin{aligned}
V(T^jN)-V(N)
&=
\log\frac{T^jN}{N}
+\phi(-1\bmod M)-\phi(-1\bmod M)\\
&=
\log\frac{T^jN}{N}\\
&>0.
\end{aligned}
\]

This proves (3). ∎

---

## 3. A concrete example

Take \(M=12\) and \(K=4\). The theorem chooses

\[
N=2^5\cdot12-1=383.
\]

Its first four shortcut iterates are

\[
383\longmapsto575\longmapsto863\longmapsto1295\longmapsto1943.
\]

Every term is congruent to \(11\pmod{12}\), and every term is larger than \(383\).

Thus, regardless of the value assigned to the residue \(11\),

\[
\phi(11),
\]

the correction cancels at every candidate stopping point. Only the increasing \(\log n\) remains.

---

# 4. Strength of the obstruction

The theorem is stronger than merely saying that a particular linear program or table search failed.

It proves all of the following.

### The boundedness of \(\phi\) is irrelevant

The proof did not use boundedness. No real-valued function on the finite residue set works, no matter how large its oscillation is.

### The stopping rule may inspect the entire integer

The rule \(k(n)\) need not depend only on \(n\bmod M\). It may be an arbitrary function of the full integer \(n\). The witness \(N\) defeats it because **every** \(j\in\{1,\ldots,K\}\) fails.

### Increasing \(M\) does not help

For each new modulus \(M\), the construction simply chooses

\[
N=2^{K+1}M-1.
\]

### Increasing \(K\) does not help

For each new horizon \(K\), the witness has \(K\) consecutive growing odd steps.

### Replacing \(\log n\) by another increasing height does not help

The same proof gives the following generalization.

> For every strictly increasing function \(G:\mathbb N\to\mathbb R\), no function
> \[
> V(n)=G(n)+\phi(n\bmod M)
> \]
> admits a uniformly bounded descent time.

The only facts used are

\[
T^jN>N
\quad\text{and}\quad
T^jN\equiv N\pmod M.
\]

So \(G(T^jN)>G(N)\), while the finite correction remains unchanged.

---

# 5. The 2-adic explanation

The special residue class is not accidental. In the \(2\)-adic integers,

\[
T(-1)=\frac{3(-1)+1}{2}=-1.
\]

Thus \(-1\) is a \(2\)-adic fixed point whose branch has archimedean multiplier \(3/2>1\).

The positive integer

\[
N=2^{K+1}M-1
\]

is extremely close to \(-1\) \(2\)-adically. Its first \(K\) iterates shadow the fixed point:

\[
T^jN
=
3^j2^{K+1-j}M-1
\equiv-1
\pmod{2^{K+1-j}M}.
\]

At the same time, in the ordinary real metric, the orbit grows approximately by

\[
\left(\frac32\right)^j.
\]

This is a clean adelic conflict:

\[
\text{\(2\)-adically stationary}
\qquad\text{but}\qquad
\text{archimedeanly expanding}.
\]

Bernstein and Lagarias developed the standard \(2\)-adic framework in which the shortcut Collatz map is conjugate to the \(2\)-adic shift. citeturn957485search1

Any correction depending only on a fixed residue class sees the orbit as remaining in the same state. It cannot detect how deeply the integer lies inside the shrinking cylinder around \(-1\).

---

# 6. Translation into the accelerated valuation-word language

Consider the odd-only map

\[
U(x)=\frac{3x+1}{2^{\nu_2(3x+1)}}.
\]

For the witness above, the first \(K\) valuations are

\[
a_0=a_1=\cdots=a_{K-1}=1.
\]

Indeed, if

\[
x_j=3^j2^{K+1-j}M-1,
\]

then

\[
3x_j+1
=
2\left(3^{j+1}2^{K-j}M-1\right),
\]

and the expression in parentheses is odd for \(j<K\). Thus the valuation word is

\[
1^K.
\]

For this word,

\[
A_j=j
\]

and the affine carry is

\[
C_{1^j}=3^j-2^j.
\]

Hence

\[
C_{1^j}+2^{A_j}
=
(3^j-2^j)+2^j
=
3^j.
\tag{8}
\]

Therefore

\[
\nu_3\!\left(C_{1^j}+2^{A_j}\right)=j.
\tag{9}
\]

So the obstruction is not merely \(2\)-adically realizable. It has **maximal terminal \(3\)-adic compatibility** as well.

This connects directly to the terminal-suffix locality result: the all-ones word survives every finite \(2\)-adic seed test and every corresponding finite \(3\)-adic endpoint test. Its inverse limit is simply the nonpositive \(2\)-adic point \(-1\), rather than a fixed ordinary positive integer.

That distinction is crucial.

---

# 7. Why this does not disprove Collatz

The witnesses depend on the horizon:

\[
N_K=2^{K+1}M-1.
\]

There is not one fixed positive integer whose orbit follows the all-ones word forever. Rather,

\[
N_K\longrightarrow -1
\]

in the \(2\)-adic topology while

\[
N_K\longrightarrow+\infty
\]

in the ordinary topology.

Thus the theorem exhibits a sequence of longer and longer counterexample-like finite trajectories, not an infinite positive-integer counterexample.

This precisely identifies the quantifier error in the proposed strategy:

\[
\forall n\ \exists k(n)
\]

might still be true, but

\[
\exists K\ \forall n\ \exists k(n)\le K
\]

is false even after adding an arbitrary fixed periodic correction.

In fact, if \(\sigma_V(n)\) denotes the first time that

\[
V(T^j n)<V(n),
\]

then the theorem proves

\[
\sup_{\substack{n\equiv-1\pmod M\\n>1}}\sigma_V(n)=\infty.
\tag{10}
\]

For \(\phi=0\), this says that the ordinary stopping time below the starting value is unbounded even inside the single arithmetic progression

\[
n\equiv-1\pmod M.
\]

---

# 8. The obvious repair: track \(\nu_2(n+1)\)

A natural response is to replace the finite table by an unbounded counter:

\[
V(n)=\log n+g\!\left(\nu_2(n+1)\right)+\phi(n\bmod M).
\tag{11}
\]

This can see how deeply \(n\) shadows \(-1\). Along an odd step,

\[
T(n)+1=\frac{3(n+1)}2,
\]

so

\[
\nu_2(T(n)+1)=\nu_2(n+1)-1.
\]

Unfortunately, even this enlarged ansatz still cannot have a fixed descent horizon.

## Second no-go theorem

For arbitrary \(M\), arbitrary \(\phi\), arbitrary

\[
g:\mathbb Z_{\ge0}\to\mathbb R,
\]

and arbitrary finite \(K\), there is a positive integer \(n\) such that

\[
V(T^j n)\ge V(n)
\qquad(1\le j\le K)
\]

for the function (11).

### The expanding cycle

On the integers extended to negative values, the shortcut map has the cycle

\[
-10\longmapsto-5\longmapsto-7\longmapsto-10.
\tag{12}
\]

The parity pattern is

\[
0,1,1,
\]

and its multiplicative factor over one circuit is

\[
\frac12\cdot\frac32\cdot\frac32=\frac98>1.
\tag{13}
\]

The valuation pattern of \(x+1\) is

\[
\nu_2(-10+1)=0,\qquad
\nu_2(-5+1)=2,\qquad
\nu_2(-7+1)=1.
\tag{14}
\]

Let

\[
b_i=g\!\left(\nu_2(x_i+1)\right)+\phi(x_i\bmod M)
\]

for

\[
(x_0,x_1,x_2)=(-10,-5,-7).
\]

The limiting Bellman increments along the three edges are

\[
\begin{aligned}
d_0&=-\log2+b_1-b_0,\\
d_1&=\log(3/2)+b_2-b_1,\\
d_2&=\log(3/2)+b_0-b_2.
\end{aligned}
\]

Their sum is

\[
d_0+d_1+d_2
=
\log\frac98
>0.
\tag{15}
\]

For any finite cyclic sequence with positive total sum, there is a cyclic starting position for which all periodic partial sums are nonnegative: start immediately after a minimum of the cumulative sums.

Choose that phase \(x_i\). For sufficiently large \(L\), the positive integer

\[
n=x_i+2^LM
\]

shadows the cycle (12) for at least \(K\) steps. During those steps:

- the parity pattern is identical;
- the residues modulo \(M\) are identical;
- the valuations in (14) are identical;
- each even-step logarithmic increment is exactly \(-\log2\);
- each odd-step logarithmic increment is strictly greater than \(\log(3/2)\).

Consequently, the actual partial Bellman increments dominate the nonnegative periodic partial sums selected above. Hence no descent occurs during the first \(K\) steps.

So even the most obvious unbounded correction fixes the \(-1\) obstruction only to expose the next expanding \(2\)-adic cycle.

---

# 9. What a viable Bellman program would have to track

For a parity word \(w\) of length \(p\), containing \(s\) odd steps, write its affine iterate as

\[
2^pT^p(n)=3^s n+C_w.
\tag{16}
\]

If

\[
3^s>2^p,
\]

then the repeated word has positive archimedean drift. Its associated periodic \(2\)-adic point is

\[
x_w=-\frac{C_w}{3^s-2^p},
\tag{17}
\]

which is negative in the ordinary real ordering.

Define the cycle defect

\[
D_w(n)=(3^s-2^p)n+C_w.
\tag{18}
\]

Then

\[
D_w(n)=0
\]

is precisely the periodic-point equation. A large value of

\[
\nu_2(D_w(n))
\]

means that the positive integer \(n\) shadows the expanding periodic word for many steps.

Moreover, whenever the block \(w\) repeats,

\[
D_w(T^p n)
=
\frac{3^s}{2^p}D_w(n).
\tag{19}
\]

Thus each repetition consumes \(p\) units of \(2\)-adic shadow depth while producing archimedean growth \(\log(3^s/2^p)\).

This suggests the correct infinite-state Bellman mechanism:

> Penalize the remaining \(2\)-adic shadow depth near every expanding periodic parity word, and prove that a growing block either consumes this finite resource or violates an exact \(3\)-adic carry condition.

But this requires an envelope over infinitely many dangerous words \(w\), together with a proof that the resulting potential is well-defined, proper, and descending through overlaps between different words. A single fixed modulus, or even finitely many valuation counters, cannot encode it.

The automated-termination viewpoint is philosophically related: Yolcu, Aaronson, and Heule search for ranking interpretations of Collatz rewriting systems and identify representation-dependent limitations, while obtaining certificates only for weaker systems. citeturn791722search0 Tao’s theorem, by contrast, gives an almost-all descent result rather than a pointwise finite-state certificate. citeturn967972search1

---

# Final conclusion

The proposed statement

\[
\exists\,M,\phi,K\quad
\forall n>1\quad
\exists\,1\le k\le K:
\quad
V(T^kn)<V(n)
\]

with

\[
V(n)=\log n+\phi(n\bmod M)
\]

is false.

The explicit universal obstruction is

\[
N=2^{K+1}M-1,
\]

for which

\[
T^jN=3^j2^{K+1-j}M-1>N
\quad\text{and}\quad
T^jN\equiv N\pmod M
\]

for every \(1\le j\le K\).

Therefore no finite table search can complete a Collatz proof in this form. The viable successor is not a larger table: it must be a **hierarchical, unbounded, cycle-defect Bellman function** capable of distinguishing a fixed positive integer from arbitrarily long positive shadows of expanding \(2\)-adic periodic points.