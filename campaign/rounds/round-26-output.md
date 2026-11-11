model: GPT-5 Pro
round: 26 -- approach 21, Additive-combinatorial inverse theorem for growth words
front: proof
sent: 2026-08-13T18:48:55Z
worked: 42m 20s

---

# Verdict

Pushing this approach rigorously does **not** produce a full proof of Collatz. The obstruction is mathematical, not merely that the conjecture is famous:

> The proposed implication  
> \[
> \text{many low-drift prefixes}
> \Longrightarrow
> \text{additive structure}
> \Longrightarrow
> \text{repeated valuation block}
> \]
> is false as stated.

In fact, one can construct a valuation word of **maximal factor complexity** for which **every prefix** satisfies the critical growth inequality, and every finite prefix is exactly realizable by a positive Collatz seed. There is also a known theorem of Dubickas showing that a genuinely divergent Collatz parity word must have factor complexity at least  
\[
\frac{\log 2}{\log(3/2)}\,r
 =1.709511291\ldots\,r,
\]
which points away from the simplest “low complexity forces periodicity” strategy. citeturn132506view1turn132506view3

There is nevertheless a substantial theorem obtainable from the idea: **an odd Collatz orbit cannot remain in a bounded-width critical drift corridor forever**. The proof uses exactly the desired ingredients—composition counting, repeated words, and simultaneous \(2\)-adic/\(3\)-adic locality.

Tao’s published theorem remains an almost-all statement rather than a pointwise theorem about every exceptional seed, and current combinatorics-on-words work still obtains restrictions on possible Collatz cycles rather than eliminating all of them. citeturn474876search2turn474876search3

---

# 1. Exact valuation-word calculus

Work with the odd-to-odd Syracuse map

\[
S(x)=\frac{3x+1}{2^{v_2(3x+1)}},
\qquad x\in 2\mathbb Z+1.
\]

Let

\[
x_{j+1}=S(x_j),\qquad
a_j=v_2(3x_j+1)\geq 1,
\qquad
A_t=\sum_{j=0}^{t-1}a_j.
\]

Put

\[
\alpha=\log_2 3=1.5849625007\ldots .
\]

For a block

\[
w=(b_0,\ldots,b_{r-1}),
\]

write

\[
B_i=\sum_{k=0}^{i-1}b_k,\qquad B=B_r,
\]

and define its affine carry

\[
C_w=\sum_{i=0}^{r-1}3^{r-1-i}2^{B_i}.
\]

Whenever an orbit follows the block \(w\),

\[
\boxed{\,2^B x_{s+r}=3^r x_s+C_w.\,} \tag{1}
\]

This identity contains both local congruence mechanisms needed below.

## Block-collision lemma

Suppose the same length-\(r\) valuation block \(w\) occurs starting at two times \(s<t\). Then

\[
\boxed{x_s\equiv x_t\pmod{2^{B+1}}} \tag{2}
\]

and

\[
\boxed{x_{s+r}\equiv x_{t+r}\pmod{3^r}.} \tag{3}
\]

### Proof

Subtract the two instances of (1):

\[
2^B(x_{s+r}-x_{t+r})
   =3^r(x_s-x_t).
\]

The two endpoints \(x_{s+r},x_{t+r}\) are odd, so their difference is even. Thus the left side is divisible by \(2^{B+1}\). Since \(3^r\) is odd,

\[
2^{B+1}\mid x_s-x_t.
\]

Similarly, reducing modulo \(3^r\), and using that \(2^B\) is invertible modulo \(3^r\), gives

\[
x_{s+r}\equiv x_{t+r}\pmod{3^r}.
\]

This proves both claims. ∎

Equation (3) is the full-residue form of terminal-suffix locality:

\[
x_{s+r}\equiv 2^{-B}C_w\pmod{3^r}.
\]

Thus the last \(r\) valuations determine the entire endpoint residue modulo \(3^r\), not merely whether \(3^r\mid x_{s+r}+1\).

---

# 2. Every finite valuation word is realizable

A serious difficulty is that finite integral realizability places essentially no restriction on the word.

## Finite realization lemma

For every word \(w=(b_0,\ldots,b_{r-1})\in\mathbb N_{\geq1}^r\), there is a unique odd residue class modulo \(2^{B+1}\) whose first \(r\) Syracuse valuations equal \(w\). In particular, some positive odd integer realizes \(w\).

Indeed, by (1), exact realization is equivalent to the final quotient being odd:

\[
3^r x+C_w\equiv 2^B\pmod{2^{B+1}}. \tag{4}
\]

Because \(3^r\) is invertible modulo \(2^{B+1}\), this determines one residue class for \(x\). An induction on the length of \(w\) verifies that (4) forces each intermediate valuation to equal the prescribed \(b_i\), not merely their total.

Consequently, **every finite positive composition is a genuine Collatz valuation prefix**.

For an infinite word, the compatible residue classes define a unique \(2\)-adic seed. Explicitly, the iterate identity gives

\[
x_0
 =
\frac{2^{A_t}x_t}{3^t}
 -
\sum_{k=0}^{t-1}\frac{2^{A_k}}{3^{k+1}},
\]

and hence in \(\mathbb Z_2\),

\[
\boxed{
x_0=-\sum_{k=0}^{\infty}\frac{2^{A_k}}{3^{k+1}}.
} \tag{5}
\]

The genuinely global Collatz restriction is that this \(2\)-adic number must be an **ordinary positive integer**. No finite prefix can detect that.

---

# 3. A direct counterexample to the proposed inverse theorem

Let

\[
p=\alpha-1=0.5849625007\ldots .
\]

We construct a binary word

\[
b_0b_1b_2\ldots,\qquad b_i\in\{0,1\},
\]

such that

\[
\sum_{i<t}b_i\leq pt\qquad\text{for every }t, \tag{6}
\]

but the word contains every finite binary word.

Enumerate all finite binary words as

\[
u_1,u_2,u_3,\ldots .
\]

Suppose a finite prefix has already been constructed, of length \(N\) and containing \(M\) ones. Its deficit below the line of slope \(p\) is

\[
D=pN-M\geq0.
\]

Before appending \(u_m\), insert enough zeros that

\[
D\geq
\max_{0\leq k\leq |u_m|}
\left(
\#_1(u_m[0,k))-pk
\right).
\]

Appending \(u_m\) then preserves (6) throughout every intermediate prefix. Repeating this procedure constructs the desired infinite word.

Now set

\[
a_i=1+b_i\in\{1,2\}.
\]

Then

\[
A_t=t+\sum_{i<t}b_i
   \leq (1+p)t
   =\alpha t
\]

for **every** \(t\).

Yet every word in \(\{1,2\}^r\) occurs as a factor. Therefore its factor complexity is maximal:

\[
\boxed{\mathcal P_a(r)=2^r.} \tag{7}
\]

Every finite prefix of this word is also an exactly realizable Collatz valuation prefix by the finite realization lemma.

Thus even the much stronger hypothesis

\[
A_t\leq t\log_2 3
\qquad\text{for every prefix }t
\]

does not imply approximate periodicity, low factor complexity, or a long repeated period.

The only thing missing from this constructed word is that its single compatible \(2\)-adic seed need not be a positive ordinary integer. That global condition is precisely where the Collatz problem re-enters.

---

# 4. Small doubling is automatic and therefore vacuous

Let

\[
\Sigma_N=\{A_0,A_1,\ldots,A_N\}.
\]

Because all \(a_i\geq1\), the \(A_i\) are strictly increasing, so

\[
|\Sigma_N|=N+1.
\]

If \(A_N\leq(\alpha+o(1))N\), then

\[
\Sigma_N+\Sigma_N
 \subseteq
 \{0,1,\ldots,2A_N\}.
\]

Hence

\[
|\Sigma_N+\Sigma_N|
 \leq 2A_N+1
 \leq (2\alpha+o(1))|\Sigma_N|,
\]

where

\[
2\alpha=3.169925001\ldots .
\]

Therefore every low-drift word already has bounded doubling among its scalar partial sums.

A Freiman-type conclusion would merely say that \(\Sigma_N\) is concentrated in an interval or rank-one generalized arithmetic progression. But this was known from the outset:

\[
\Sigma_N\subseteq[0,\alpha N+o(N)].
\]

The ordering information has been lost. The same small-doubling estimate holds for the maximally complex construction above.

The exponential ambiguity can be quantified. Knowing that a length-\(r\) block has total \(B\) leaves

\[
\binom{B-1}{r-1}
\]

possible ordered valuation blocks. At the critical value \(B\approx\alpha r\), this is exponentially large.

So an inverse theorem for the **set of partial sums** cannot recover a valuation block. One would need an inverse theorem for the ordered path

\[
t\longmapsto (t,A_t)
\]

together with its carry data.

---

# 5. The sharp complexity obstruction

Let \(\mathcal P_a(r)\) denote the number of distinct length-\(r\) factors in an infinite accelerated valuation word.

Define

\[
c_*=\frac{\log 2}{\log(3/2)}
   =1.709511291351\ldots .
\]

## Proposition

If an odd Syracuse orbit tends to infinity, then

\[
\boxed{
\liminf_{r\to\infty}\frac{\mathcal P_a(r)}r
\geq c_*.
} \tag{8}
\]

### Proof

First note that

\[
S(x)+1
 \leq \frac{3x+1}{2}+1
 =\frac32(x+1).
\]

Therefore

\[
x_j+1\leq
\left(\frac32\right)^j(x_0+1). \tag{9}
\]

Suppose, for some \(\varepsilon>0\), that infinitely many \(r\) satisfy

\[
\mathcal P_a(r)\leq(c_*-\varepsilon)r.
\]

Set

\[
N=\left\lfloor(c_*-\varepsilon)r\right\rfloor.
\]

Among the \(N+1\) blocks beginning at positions

\[
0,1,\ldots,N,
\]

two must be identical. Say they start at \(s<t\leq N\). Their total valuation \(B\) satisfies \(B\geq r\). By (2),

\[
2^{B+1}\mid x_t-x_s.
\]

Since the orbit is divergent rather than periodic, \(x_t\neq x_s\), so

\[
|x_t-x_s|\geq2^{B+1}\geq2^{r+1}. \tag{10}
\]

On the other hand, by (9),

\[
|x_t-x_s|
<
\left(\frac32\right)^t(x_0+1)
\leq
\left(\frac32\right)^{(c_*-\varepsilon)r}(x_0+1).
\]

Because

\[
\left(\frac32\right)^{c_*}=2,
\]

the last expression equals

\[
2^r
\left(\frac32\right)^{-\varepsilon r}(x_0+1)
<2^r
\]

for all sufficiently large \(r\), contradicting (10). ∎

Dubickas proved the corresponding theorem for the binary parity word of the shortcut Collatz map, with exactly the same constant \(c_*\). His proof also proceeds by converting repeated factors into divisibility by \(2^r\) and comparing that divisibility with the archimedean growth bound. citeturn132506view1turn132506view2turn132506view3

This constant is therefore not incidental. It is the exact collision threshold obtained from

\[
2^r
\quad\text{versus}\quad
\left(\frac32\right)^N.
\]

A divergent orbit is forced to have enough factor complexity to avoid precisely this elementary repetition argument.

---

# 6. A theorem that the proposed approach really does prove

Although low drift alone does not force periodicity, **uniformly critical drift** is impossible.

Define the critical discrepancy

\[
h_t=A_t-\alpha t.
\]

## Critical-corridor theorem

There is no positive odd Syracuse orbit for which

\[
\boxed{|h_t|\leq K\quad\text{for every }t} \tag{11}
\]

for some fixed \(K\).

The same conclusion holds if (11) is assumed only after some finite initial time.

### Step 1: Such an orbit grows at most linearly

From the affine iterate formula,

\[
x_t
 =
\frac{3^t}{2^{A_t}}x_0
 +
\sum_{k=0}^{t-1}
 3^{t-1-k}2^{A_k-A_t}.
\]

Since \(3=2^\alpha\), this becomes

\[
\boxed{
x_t
 =
2^{-h_t}x_0
 +
\frac13\sum_{k=0}^{t-1}2^{h_k-h_t}.
} \tag{12}
\]

Under \(|h_j|\leq K\),

\[
\boxed{
x_t\leq
2^Kx_0+\frac{2^{2K}}3\,t.
} \tag{13}
\]

Thus the orbit is at most linear in \(t\).

### Step 2: Count the possible critical blocks

Every length-\(r\) factor beginning at \(i\) has total

\[
A_{i+r}-A_i
 =\alpha r+h_{i+r}-h_i
 \leq\alpha r+2K.
\]

Let

\[
M_r=\left\lfloor\alpha r+2K\right\rfloor.
\]

The number of positive integer words of length \(r\) with total at most \(M_r\) is

\[
Q_r
 =
\sum_{B=r}^{M_r}\binom{B-1}{r-1}
 =
\binom{M_r}{r}. \tag{14}
\]

By Stirling’s formula,

\[
Q_r^{1/r}\longrightarrow
\kappa
 :=
\frac{\alpha^\alpha}
     {(\alpha-1)^{\alpha-1}}.
\]

Numerically,

\[
\boxed{
\kappa=2.83951373049\ldots<3.
} \tag{15}
\]

This strict entropy gap is the decisive point.

### Step 3: Force a repeated terminal block

Consider the \(Q_r+1\) blocks beginning at

\[
0,1,\ldots,Q_r.
\]

There are at most \(Q_r\) possible blocks by (14), so two are equal. Say they begin at \(i<j\).

By terminal locality,

\[
x_{i+r}\equiv x_{j+r}\pmod{3^r}. \tag{16}
\]

But by (13),

\[
x_{i+r},x_{j+r}
 \leq
2^Kx_0+
\frac{2^{2K}}3(Q_r+r).
\]

Because \(Q_r=(\kappa+o(1))^r\) and \(\kappa<3\), for all sufficiently large \(r\),

\[
0<x_{i+r},x_{j+r}<3^r.
\]

Together with (16), this forces

\[
x_{i+r}=x_{j+r}. \tag{17}
\]

Thus the orbit is eventually periodic.

### Step 4: A positive cycle cannot have bounded critical discrepancy

Suppose a positive odd cycle has length \(d\), total valuation \(D\), and begins at \(x\). Its cycle equation is

\[
2^D x=3^d x+C
\]

with \(C>0\). Hence

\[
(2^D-3^d)x=C>0,
\]

so

\[
2^D>3^d
\quad\Longrightarrow\quad
D-\alpha d>0. \tag{18}
\]

Every traversal of the cycle therefore increases \(h_t\) by the positive amount \(D-\alpha d\). Consequently \(h_t\) becomes unbounded above, contradicting (11).

This completes the proof of the critical-corridor theorem. ∎

---

# 7. A precise additive-combinatorial recurrence criterion

The bounded-corridor theorem can be weakened. Assume only

\[
h_t\leq K\qquad\text{for all }t,
\]

and define the near-critical return set

\[
E_K=\{t:h_t\geq-K\}.
\]

For \(t\in E_K\), formula (12) gives

\[
x_t\leq
2^Kx_0+\frac{2^{2K}}3\,t. \tag{19}
\]

If both \(t-r\) and \(t\) lie in \(E_K\), then the terminal block of length \(r\) ending at \(t\) has total at most

\[
\alpha r+2K.
\]

Hence there are at most

\[
Q_r=\binom{\lfloor\alpha r+2K\rfloor}{r}
\]

such blocks.

## Recurrence criterion

If there are \(N,r\) for which

\[
\left|
\left\{
t\in[r,N]:
t-r\in E_K,\ t\in E_K
\right\}
\right|
>Q_r \tag{20}
\]

and

\[
2^Kx_0+\frac{2^{2K}}3N<3^r, \tag{21}
\]

then the orbit is periodic.

Indeed, (20) forces two equal terminal \(r\)-blocks. Their endpoints are congruent modulo \(3^r\), while (19) and (21) place both endpoints strictly between \(0\) and \(3^r\). They are therefore equal.

Since

\[
Q_r=(\kappa+o(1))^r,\qquad \kappa<3,
\]

there is a nonempty exponential window

\[
\log\kappa<\lambda<\log3.
\]

At the scale

\[
N\asymp e^{\lambda r},
\]

we have simultaneously

\[
Q_r=o(N)
\qquad\text{and}\qquad
N=o(3^r).
\]

Thus the genuinely useful inverse theorem would be:

> A hypothetical counterexample has linearly many pairs of near-critical return times separated by some \(r\), at a scale  
> \[
> e^{(\log\kappa+\varepsilon)r}
> \lesssim N
> \lesssim
> e^{(\log3-\varepsilon)r}.
> \]

That statement would immediately activate the recurrence criterion.

This is the correct additive-combinatorial target. It concerns the additive correlation

\[
E_K\cap(E_K+r),
\]

not merely small doubling of the partial-sum set.

---

# 8. Why a minimal counterexample does not automatically satisfy the corridor hypothesis

The exact logarithmic evolution is

\[
\log_2 x_t-\log_2 x_0
 =
\alpha t-A_t
 +
\sum_{j=0}^{t-1}
 \log_2\left(1+\frac1{3x_j}\right).
\]

Equivalently,

\[
\boxed{
h_t
 =
\log_2x_0-\log_2x_t
 +
E_t,
\qquad
E_t=
\sum_{j<t}
\log_2\left(1+\frac1{3x_j}\right).
} \tag{22}
\]

For a least counterexample, every later orbit value is at least \(x_0\), so

\[
h_t\leq E_t.
\]

But \(E_t\) need not be bounded. It is bounded if, for example,

\[
\sum_j\frac1{x_j}<\infty,
\]

but convergence of this reciprocal sum is not known for a hypothetical divergent orbit.

Therefore even obtaining a uniform upper bound

\[
h_t\leq K
\]

requires new information. A counterexample could instead have:

\[
h_t\longrightarrow-\infty,
\]

corresponding to genuine multiplicative growth; or it could have large negative excursions and only sparse returns to the critical line.

The maximally complex symbolic construction in Section 3 demonstrates that these possibilities cannot be excluded by prefix drift alone.

---

# 9. The separate cycle gap

Even if additive structure forced eventual periodicity, this would not automatically finish Collatz.

For every hypothetical positive odd cycle,

\[
(2^D-3^d)x=C_w,
\]

with

\[
D>\alpha d.
\]

Periodicity is therefore perfectly compatible with the formal affine identities. To get a contradiction, one needs one of the following stronger conclusions:

\[
D\leq\alpha d,
\]

which would make the left side nonpositive; or an arithmetic theorem proving

\[
2^D-3^d\nmid C_w
\]

for every nontrivial candidate word.

A generic repeated factor does not guarantee that the resulting period has low average valuation. Recent work identifying Christoffel or balanced words as extremizers gives restrictions on hypothetical cycles, but does not establish this universal nondivisibility. citeturn474876search3

---

# Final assessment

The proposed approach, as written, has three exact gaps:

1. **Drift does not force additive structure.**  
   There are maximally complex words with \(A_t\leq\alpha t\) for every \(t\), and every finite prefix is an exact Collatz prefix.

2. **Small doubling is too coarse.**  
   It is automatic for the partial sums and loses the ordering of the valuations.

3. **Periodicity alone does not rule out a nontrivial cycle.**  
   One must preserve a low-drift inequality for the actual period or prove a new carry-divisibility obstruction.

What the approach does yield is the rigorous theorem

\[
\boxed{
\sup_t|A_t-t\log_2 3|=\infty
\quad\text{for every positive odd Collatz orbit}.
}
\]

More quantitatively, the entropy gap

\[
2.839513730\ldots<3
\]

shows that a sufficiently recurrent near-critical word must produce two equal orbit states through terminal \(3\)-adic locality.

The viable completion of Approach 21 is therefore not a standard Freiman theorem. It would have to be an **arithmetic, ordered inverse theorem** proving logarithmic-scale recurrence of near-critical valuation blocks for the one special word whose \(2\)-adic seed is an ordinary positive integer. That is the precise theorem still missing; the raw growth-word statement is false.