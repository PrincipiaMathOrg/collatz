model: GPT-5 Pro
round: 23 -- approach 18, A Kolmogorov-complexity contradiction
front: proof
sent: 2026-08-13T18:47:51Z
worked: 35m 56s

---

# Verdict

The proposed Kolmogorov-complexity mechanism does **not** yield a proof of Collatz. Its central pointwise implication,

\[
\text{positive drift}+\text{finite }2\text{-adic/}3\text{-adic compatibility}
\quad\Longrightarrow\quad
K(\text{valuation prefix})\ge c j,
\]

is false.

In fact, there is an exact **complexity-conservation theorem**:

> For a length-\(j\) accelerated Collatz valuation word \(w\), the word and its least positive realizing seed \(R(w)\) have the same Kolmogorov complexity up to \(O(1)\), conditional on \(j\).

Consequently, for every fixed integer seed \(n\),

\[
K\bigl(w_j(n)\mid j\bigr)=O_n(1),
\]

whether its orbit terminates, cycles, or hypothetically diverges.

More decisively, the explicit positive seeds

\[
N_j=2^{j+1}-1
\]

have a strictly growing \(j\)-step orbit, valuation word \(1^j\), and maximal terminal \(3\)-adic compatibility, while

\[
K(1^j\mid j)=O(1).
\]

Thus even the strongest natural finite-prefix version of the proposed lower bound is disproved.

What follows is the complete derivation and the exact replacement target.

---

## 1. Accelerated valuation words

Work with the accelerated map on positive odd integers,

\[
U(x)=\frac{3x+1}{2^{\nu_2(3x+1)}}.
\]

Let

\[
x_0=n,\qquad x_{i+1}=U(x_i),
\]

and define

\[
a_i=\nu_2(3x_i+1)\ge 1,
\qquad
A_j=\sum_{i=0}^{j-1}a_i.
\]

The length-\(j\) valuation word is

\[
w_j(n)=(a_0,\ldots,a_{j-1}).
\]

Finite parity vectors and accelerated valuation vectors have exact symbolic-dynamical descriptions: each finite parity vector occurs in one residue class modulo the relevant power of \(2\), while accelerated valuation vectors are parametrized by compositions of their total valuation. citeturn654930view0turn654930view1

Define \(C_0=0\) and

\[
C_{j+1}=3C_j+2^{A_j}.
\]

Then induction gives the exact affine identity

\[
\boxed{2^{A_j}x_j=3^j n+C_j}
\tag{1}
\]

with

\[
C_j=\sum_{i=0}^{j-1}3^{j-1-i}2^{A_i}.
\tag{2}
\]

Indeed, if (1) holds at \(j\), then

\[
\begin{aligned}
2^{A_{j+1}}x_{j+1}
&=2^{A_j+a_j}\frac{3x_j+1}{2^{a_j}}\\
&=3\cdot2^{A_j}x_j+2^{A_j}\\
&=3^{j+1}n+3C_j+2^{A_j}.
\end{aligned}
\]

---

## 2. A valuation word is equivalent to one binary seed residue

Fix a word

\[
w=(a_0,\ldots,a_{j-1}),\qquad A=A_j.
\]

Since its endpoint \(x_j\) must be odd, (1) implies

\[
3^j n+C_j\equiv 2^A\pmod{2^{A+1}}.
\]

Because \(3^j\) is invertible modulo \(2^{A+1}\), this determines one odd residue:

\[
\boxed{
n\equiv
3^{-j}(2^A-C_j)
\pmod{2^{A+1}}.
}
\tag{3}
\]

Conversely, this residue class realizes exactly the word \(w\). This follows either from the standard symbolic-dynamics theorem or directly by reducing (3) at each intermediate cumulative valuation \(A_i\).

Let

\[
R(w)\in\{1,3,\ldots,2^{A+1}-1\}
\]

be the least positive representative of (3).

Thus:

* from \(w\), one can compute \(R(w)\);
* from \((R(w),j)\), one can iterate \(U\) for \(j\) steps and recover \(w\).

So \(w\leftrightarrow R(w)\) is a computably reversible coding, conditional on its length.

This is stronger than saying the binary seed “determines” the word. It says the seed residue and word contain essentially **the same algorithmic information**.

---

## 3. The genuine drift restriction

Set

\[
\alpha=\log_2 3.
\]

At one accelerated step,

\[
x_{i+1}
=x_i\,2^{\alpha-a_i}
\left(1+\frac1{3x_i}\right),
\]

so

\[
\log_2x_{i+1}-\log_2x_i
=
\alpha-a_i+
\log_2\left(1+\frac1{3x_i}\right).
\]

Summing,

\[
\boxed{
\log_2x_j-\log_2n
=
\alpha j-A_j+E_j,
}
\tag{4}
\]

where

\[
E_j=\sum_{i=0}^{j-1}
\log_2\left(1+\frac1{3x_i}\right)>0.
\]

If an orbit is unbounded and nonperiodic, then \(x_i\to\infty\): otherwise it would visit a finite set infinitely often, hence repeat a state and become periodic. Therefore

\[
\frac{E_j}{j}\longrightarrow0.
\]

Since \(x_j\ge1\), (4) gives

\[
\boxed{
\limsup_{j\to\infty}\frac{A_j}{j}
\le\log_2 3.
}
\tag{5}
\]

So the rigorous version of “deficient powers of two” is correct. A divergent orbit must live in the lower large-deviation tail of the valuation sum.

But (5) is not a complexity lower bound.

---

## 4. What the entropy calculation actually proves

For a random odd starting value, the finite valuation vector has the exact cylinder density

\[
\Pr(a_0=k_0,\ldots,a_{j-1}=k_{j-1})
=
2^{-\sum k_i}.
\]

Equivalently, the \(a_i\) have the same finite-dimensional distribution as independent geometric variables with

\[
\Pr(a_i=k)=2^{-k},
\qquad
\mathbb E[a_i]=2.
\]

This is an exact initial-orbit density theorem, not merely a heuristic. citeturn654930view2

Let

\[
D_j=
\left\{
w\in\mathbb Z_{\ge1}^j:
A(w)\le\lfloor\alpha j\rfloor
\right\}.
\]

The number of compositions of \(m\) into \(j\) positive parts is

\[
\binom{m-1}{j-1}.
\]

Hence the hockey-stick identity gives

\[
|D_j|
=
\sum_{m=j}^{\lfloor\alpha j\rfloor}
\binom{m-1}{j-1}
=
\binom{\lfloor\alpha j\rfloor}{j}.
\]

By Stirling’s formula,

\[
\log_2|D_j|
=
h_*j+O(\log j),
\tag{6}
\]

where

\[
h_*=
\alpha H_2(1/\alpha)
=
1.5056438879\ldots
\]

and \(H_2\) is binary entropy.

The natural probability of the low-drift event is

\[
\Pr(D_j)
=
2^{-Ij+O(\log j)},
\tag{7}
\]

where

\[
I=\alpha-h_*
=
0.0793186128\ldots.
\]

This says:

* low-drift prefixes are exponentially rare among random seeds;
* most words in \(D_j\) have complexity approximately \(h_*j\);
* every word in \(D_j\) can be described by its index in \(D_j\), using at most \(h_*j+O(\log j)\) bits.

It does **not** say that every member of \(D_j\) has large complexity. A small effective set may contain extremely simple exceptional elements. Incompressibility arguments prove statements about most elements, not every element.

---

## 5. Exact complexity-conservation theorem

Fix a universal prefix-free machine and let \(K\) denote prefix Kolmogorov complexity.

### Theorem 1

There is a universal constant \(c\) such that, for every length-\(j\) valuation word \(w\),

\[
\boxed{
\left|
K(w\mid j)-K(R(w)\mid j)
\right|\le c.
}
\tag{8}
\]

### Proof

Given \(w\), an algorithm:

1. computes \(A(w)\);
2. computes \(C_w\) from the recurrence;
3. computes \(3^{-j}\pmod{2^{A+1}}\);
4. outputs the least representative in (3).

Therefore

\[
K(R(w)\mid j)\le K(w\mid j)+O(1).
\]

Conversely, given \(R(w)\) and \(j\), an algorithm iterates \(U\) exactly \(j\) times and records the valuations. Since \(R(w)\) realizes \(w\), the output is \(w\). Hence

\[
K(w\mid j)\le K(R(w)\mid j)+O(1).
\]

Combining the inequalities proves (8). ∎

### Corollary 2

For every fixed positive odd integer \(n\),

\[
K(w_j(n)\mid n,j)=O(1)
\tag{9}
\]

and

\[
K(w_j(n)\mid j)\le K(n\mid j)+O(1).
\tag{10}
\]

Moreover, because \(A_j\ge j\), eventually

\[
2^{A_j+1}>n.
\]

At that point \(n\) itself is already the least positive representative of its residue class, so

\[
R(w_j(n))=n.
\]

Thus, for all sufficiently large \(j\),

\[
\boxed{
K(w_j(n)\mid j)=K(n\mid j)+O(1).
}
\tag{11}
\]

Unconditionally,

\[
\boxed{
K(w_j(n))
\le
K(n)+K(j)+O(1)
=
O_n(\log j).
}
\tag{12}
\]

This applies to **every** fixed integer orbit. In particular, a hypothetical divergent integer orbit would still have a valuation prefix of complexity only \(O(\log j)\), or \(O(1)\) when \(j\) is supplied.

So integrality compatibility does not merely make a counterexample word compressible. It makes every fixed integer orbit word compressible.

---

## 6. The \(3\)-adic state does not add independent information

Let \(v\) be the last \(r\) entries of a length-\(j\) word. Suppose the associated \(r\)-step segment starts at \(Y\) and ends at \(X\). Its affine identity is

\[
2^{A(v)}X=3^rY+C_v.
\]

Reducing modulo \(3^r\),

\[
\boxed{
X\equiv 2^{-A(v)}C_v\pmod{3^r}.
}
\tag{13}
\]

Consequently,

\[
\boxed{
3^r\mid X+1
\quad\Longleftrightarrow\quad
3^r\mid C_v+2^{A(v)}.
}
\tag{14}
\]

Thus the endpoint residue modulo \(3^r\) is a computable function of the terminal valuation suffix. It is not an independent random string that must be specified in addition to the word.

In complexity notation,

\[
K(X\bmod3^r\mid v,r)=O(1).
\]

More generally,

\[
K\bigl(w,R(w),X\bmod3^r\mid j,r\bigr)
=
K(w\mid j,r)+O(1).
\]

The combined \(2\)-adic and \(3\)-adic state is another computable representation of the same data. It supplies arithmetic restrictions, but not an automatic algorithmic-information contradiction.

---

## 7. Explicit low-complexity positive-drift shadows

The following family directly disproves the desired finite-prefix lower bound.

### Theorem 3

For every \(j\ge1\), let

\[
N_j=2^{j+1}-1.
\]

Then for \(0\le t\le j\),

\[
\boxed{
U^t(N_j)=3^t2^{j+1-t}-1.
}
\tag{15}
\]

In particular:

1. the first \(j\) valuations are all equal to \(1\);
2. the orbit is strictly increasing for those \(j\) steps;
3. its multiplicative drift is exponentially positive;
4. the endpoint has maximal \(3\)-adic compatibility;
5. the word and seed have \(O(1)\) complexity conditional on \(j\).

### Proof

Suppose

\[
x_t=3^t2^{j+1-t}-1.
\]

For \(t<j\),

\[
\begin{aligned}
3x_t+1
&=3^{t+1}2^{j+1-t}-2\\
&=2\left(3^{t+1}2^{j-t}-1\right).
\end{aligned}
\]

The expression in parentheses is odd, so

\[
\nu_2(3x_t+1)=1
\]

and

\[
x_{t+1}=3^{t+1}2^{j-t}-1.
\]

This proves (15).

Moreover,

\[
x_{t+1}-x_t
=
3^t2^{j-t}>0,
\]

so the whole block stays above its starting value.

The valuation word is

\[
w_j=1^j,
\qquad
A_j=j.
\]

Since \(j<\alpha j\), the main multiplicative factor is

\[
\frac{3^j}{2^j}
=
\left(\frac32\right)^j.
\]

At the endpoint,

\[
U^j(N_j)=2\cdot3^j-1,
\]

so

\[
\boxed{
\nu_3\bigl(U^j(N_j)+1\bigr)=j.
}
\tag{16}
\]

For the word \(1^r\),

\[
C_{1^r}
=
3^r-2^r,
\]

and hence

\[
C_{1^r}+2^r=3^r,
\]

which is exactly the strongest possible instance of (14).

Finally, programs of constant size, given \(j\), output \(1^j\) and \(2^{j+1}-1\). Therefore

\[
K(1^j\mid j)=O(1),
\qquad
K(N_j\mid j)=O(1).
\]

∎

This family simultaneously has:

\[
\begin{array}{c}
\text{positive integer realizability},\\
\text{strict growth throughout the block},\\
A_j/j=1<\log_2 3,\\
\text{maximal terminal }3\text{-adic divisibility},\\
\text{constant conditional complexity}.
\end{array}
\]

Therefore none of those finite properties can imply an unbounded Kolmogorov-complexity lower bound.

---

## 8. What the all-ones family is really shadowing

The residues

\[
N_j=2^{j+1}-1
\]

satisfy

\[
N_j\equiv-1\pmod{2^{j+1}}.
\]

Thus

\[
N_j\longrightarrow-1
\qquad\text{in }\mathbb Z_2.
\]

And \(-1\) is an exact fixed point:

\[
U(-1)=\frac{-3+1}{2}=-1.
\]

For an infinite valuation word \(w=(a_0,a_1,\ldots)\), with \(A_0=0\), the associated \(2\)-adic seed is formally

\[
\boxed{
z(w)
=
-\sum_{i=0}^{\infty}
\frac{2^{A_i}}{3^{i+1}}
\in\mathbb Z_2.
}
\tag{17}
\]

For \(w=1^\infty\),

\[
z(w)
=
-\sum_{i=0}^{\infty}\frac{2^i}{3^{i+1}}
=-1.
\]

This is the geometric reason for Theorem 3: arbitrarily large positive integers can shadow the negative \(2\)-adic fixed point for arbitrarily long finite times.

The full \(2\)-adic Collatz extension is conjugate to a shift, but the ordinary integers form a countable Haar-null subset of \(\mathbb Z_2\). Hence measure-theoretic or randomness conclusions on generic \(2\)-adic points do not determine what happens on ordinary integer seeds. citeturn988994view0turn988994view1

The missing distinction is therefore not:

\[
\text{simple versus complex}.
\]

It is:

\[
\text{a positive Archimedean integer}
\quad\text{versus}\quad
\text{a negative or nonintegral }2\text{-adic point}.
\]

Both can have algorithmic dimension zero.

---

## 9. Resource-bounded complexity does not repair the argument

One might replace ordinary \(K\) by polynomial-time complexity, logical depth, online complexity, or monotone complexity. The same obstruction remains.

For \(x\ge1\),

\[
U(x)
\le\frac{3x+1}{2}
\le2x.
\]

Therefore

\[
x_i\le2^i n,
\]

so the bit length of the first \(j\) iterates is

\[
O(j+\log n).
\]

Exact iteration for \(j\) steps, including valuation extraction, takes polynomial time in \(j+\log n\). Hence a fixed program with \(n\) hardcoded outputs \(w_j(n)\) efficiently.

Thus:

* polynomial-time Kolmogorov complexity stays small;
* an online program can stream the valuation sequence;
* monotone complexity is bounded by a program encoding \(n\);
* logical depth cannot arise from expensive simulation, because direct simulation is efficient.

Finite-state complexity is different: a computable sequence can be finite-state incompressible. But then the other direction fails—positive drift certainly does not force finite-state complexity, since \(1^\infty\) is periodic.

---

## 10. Martin-Löf randomness gives only an almost-everywhere statement

The geometric law implies that a Martin-Löf-random valuation sequence has average valuation \(2\), not at most \(\log_2 3\). Thus a divergent Collatz word would fail an effective law of large numbers.

But every fixed integer orbit word is computable. Therefore none is Martin-Löf random, including the terminating orbits. Randomness theory excludes generic \(2\)-adic seeds from having persistent positive drift; it does not exclude a particular computable exceptional seed.

This is exactly the same countable-exception gap encountered by ordinary ergodic theory.

---

## 11. Cycles are not covered by the drift argument

Suppose a positive accelerated cycle has word \(w\), period \(p\), and total valuation \(A\). Then (1) gives

\[
2^A n=3^p n+C_w,
\]

so

\[
\boxed{
(2^A-3^p)n=C_w>0.
}
\tag{18}
\]

Consequently,

\[
\frac Ap>\log_2 3.
\]

Thus a cycle has the opposite valuation inequality from a divergent orbit. Its infinite valuation word is periodic and therefore has

\[
K(w^{m}\mid m)=O(1).
\]

So even a successful complexity argument excluding low-valuation divergent trajectories would not by itself constitute a full Collatz proof; nontrivial cycles would still require exclusion.

---

## 12. The exact live replacement: Archimedean anti-shadowing

Define

\[
m_j=
\min\left\{
n>1:\ n\text{ odd and }U^i(n)\ge n
\text{ for }0\le i\le j
\right\},
\]

with \(m_j=\infty\) if the set is empty.

Then \(m_j\) is nondecreasing, and

\[
\boxed{
\text{Collatz is true}
\quad\Longleftrightarrow\quad
m_j\longrightarrow\infty.
}
\tag{19}
\]

### Proof

If Collatz is true, every fixed \(n>1\) eventually reaches \(1<n\). Therefore, for every bound \(B\), all \(n\le B\) eventually fall below themselves. Taking the maximum of those finitely many descent times shows that \(m_j>B\) for sufficiently large \(j\).

Conversely, suppose \(m_j\) does not tend to infinity. Since it is a nondecreasing sequence of integers, it is eventually bounded by some \(B\). A fixed \(n\le B\) then survives the inequality

\[
U^i(n)\ge n
\]

for arbitrarily large \(i\), and by nestedness for every \(i\). It can never reach \(1\), contradicting Collatz. ∎

In word language,

\[
m_j
=
\min\left\{
R(w)>1:
U^i(R(w))\ge R(w)
\text{ for }0\le i\le j
\right\}.
\]

A quantitative theorem such as

\[
m_j\ge F(j),
\qquad F(j)\longrightarrow\infty,
\tag{20}
\]

would prove Collatz.

The intended complexity argument would try to establish

\[
K(R(w)\mid j)\ge c j
\]

for every surviving word and infer

\[
R(w)\ge2^{cj-O(1)}.
\]

But Theorem 3 directly refutes that complexity lower bound: \(1^j\) is a surviving word and

\[
R(1^j)=2^{j+1}-1
\]

has constant complexity conditional on \(j\).

Its **value** is exponentially large, but its **description** is tiny. Kolmogorov complexity cannot substitute for the required numerical lower bound.

---

# Final status of approach 18

The branch should be recorded as:

> **DEAD in its stated form.**  
> Exact obstruction: the valuation prefix and its least realizing binary seed residue are computably reversible, so they have equal Kolmogorov complexity up to \(O(1)\). For a fixed integer seed, all prefixes have \(O(\log j)\) unconditional complexity. Moreover, \(N_j=2^{j+1}-1\) realizes the word \(1^j\), grows strictly throughout the block, and satisfies \(\nu_3(U^j(N_j)+1)=j\), while having \(O(1)\) conditional complexity. Hence positive drift plus finite \(2\)-adic and \(3\)-adic compatibility cannot force high complexity.

The surviving mathematical target is an **Archimedean anti-shadowing theorem** proving that the least positive residue of every long non-descending word must grow without bound. That is a genuine value-sensitive arithmetic statement; ordinary, time-bounded, online, and randomness-based Kolmogorov complexity do not establish it.