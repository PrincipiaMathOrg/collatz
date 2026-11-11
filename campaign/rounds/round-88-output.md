model: GPT-5.6 Pro (Chat mode)
round: 88 -- approach 83, Deterministic renewal discrepancy
front: proof
sent: 2026-08-17T06:31Z
worked: 92m 26s

---

# 83. Deterministic renewal discrepancy

## Audit conclusion

The proposed route yields several exact theorems, but it does **not** presently produce a valid full proof of Collatz.

The central obstruction is unusually precise:

> For the natural renewal discrepancy  
> \[
> D_j:=2j-\sum_{i<j}v_2(3n_i+1),
> \]
> a seed-dependent bounded-discrepancy theorem for every orbit is **equivalent to the Collatz conjecture**.

A bound uniform in the starting integer is false. What can be proved unconditionally is:

1. the discrepancy is automatically bounded on one side;
2. any orbit avoiding \(1\) must have discrepancy growing at least linearly;
3. any hypothetical divergent orbit must escape below the critical line \(A_j=j\log_2 3\) so strongly that the associated exponential defects are summable;
4. this reduces the remaining problem to an exact binary carry-synchronization statement.

Thus the renewal approach narrows the conjecture substantially, but the missing carry theorem cannot be obtained from renewal large deviations alone.

---

## 1. Accelerated dynamics and the renewal discrepancy

Let

\[
U(n)=\frac{3n+1}{2^{a(n)}},
\qquad
a(n):=v_2(3n+1),
\]

on positive odd integers. Given an odd initial value \(n\), write

\[
n_0=n,\qquad n_{j+1}=U(n_j),
\]

and define

\[
a_j:=a(n_j),\qquad
A_j:=\sum_{i=0}^{j-1}a_i.
\]

Thus \(A_j\) is the shortcut time at which the \(j\)-th accelerated renewal occurs.

For a random odd input, the standard probabilistic model treats the \(a_i\) as independent geometric random variables with

\[
\Pr(a_i=r)=2^{-r},\qquad r\geq 1,
\]

and hence

\[
\mathbb E a_i=2,\qquad \operatorname{Var}(a_i)=2.
\]

This is the natural reason to define the centered renewal discrepancy

\[
D_j:=2j-A_j. \tag{83.1}
\]

Tao’s probabilistic treatment uses precisely this geometric valuation model and associated renewal processes, but its conclusions concern random or almost-all starting values rather than one prescribed orbit. citeturn852708view2turn607222view2turn607222view3

Put

\[
\alpha:=\log_2 3=1.584962500721156\ldots,
\]

\[
\delta:=2-\alpha=\log_2\frac43
 =0.415037499278844\ldots,
\]

and

\[
\gamma:=\log_2\frac65
 =0.263034405833794\ldots.
\]

The critical defect will be

\[
R_j:=\alpha j-A_j. \tag{83.2}
\]

The two discrepancies are related by

\[
D_j=\delta j+R_j. \tag{83.3}
\]

---

## 2. An exact deterministic discrepancy identity

Define

\[
Y_j:=\frac{n_j}{2^{D_j}}
      =2^{A_j-2j}n_j. \tag{83.4}
\]

Then \(Y_j\) has an exact one-step evolution.

### Theorem 83.1 — Exact renewal Lyapunov identity

For every accelerated odd orbit,

\[
Y_{j+1}
=
Y_j\left(\frac34+\frac{1}{4n_j}\right). \tag{83.5}
\]

Equivalently,

\[
Y_j-Y_{j+1}
=
\frac{n_j-1}{4\,2^{D_j}}. \tag{83.6}
\]

Consequently \(Y_j\) is nonincreasing, and it decreases strictly whenever \(n_j>1\).

#### Proof

Since

\[
D_{j+1}=D_j+2-a_j
\]

and

\[
n_{j+1}=\frac{3n_j+1}{2^{a_j}},
\]

we obtain

\[
\begin{aligned}
Y_{j+1}
&=\frac{n_{j+1}}{2^{D_{j+1}}}\\
&=\frac{(3n_j+1)/2^{a_j}}
        {2^{D_j+2-a_j}}\\
&=\frac{3n_j+1}{4\,2^{D_j}}\\
&=Y_j\frac{3n_j+1}{4n_j}.
\end{aligned}
\]

This is (83.5). Subtracting it from \(Y_j=n_j/2^{D_j}\) gives (83.6). ∎

Taking logarithms gives the exact coboundary formula

\[
A_j-2j
=
\log_2\frac{n}{n_j}
+
\sum_{i=0}^{j-1}
\log_2\left(\frac{3+1/n_i}{4}\right). \tag{83.7}
\]

Equivalently,

\[
D_j
=
\log_2\frac{n_j}{n}
+
\sum_{i=0}^{j-1}
\lambda(n_i), \tag{83.8}
\]

where

\[
\lambda(x):=\log_2\left(\frac{4}{3+1/x}\right). \tag{83.9}
\]

For every odd \(x>1\), one has \(x\geq3\), and therefore

\[
\lambda(x)\geq\lambda(3)
=\log_2\frac65
=\gamma. \tag{83.10}
\]

### Corollary 83.2 — The easy half of bounded discrepancy

For every positive odd \(n\) and every \(j\geq0\),

\[
A_j-2j\leq\log_2 n. \tag{83.11}
\]

In particular,

\[
A_j-2j\leq\lfloor\log_2 n\rfloor.
\]

#### Proof

By Theorem 83.1,

\[
Y_j=2^{A_j-2j}n_j\leq Y_0=n.
\]

Since \(n_j\geq1\),

\[
2^{A_j-2j}\leq n.
\]

Taking logarithms proves the claim. ∎

Thus the accumulated valuations can never exceed their random-model mean \(2j\) by more than a seed-dependent constant. The entire difficulty is the other direction: bounding \(2j-A_j\).

---

## 3. Bounded renewal discrepancy is equivalent to Collatz

### Theorem 83.3 — Exact discrepancy criterion

The following statements are equivalent.

1. Every positive integer reaches \(1\).
2. For every positive odd \(n\), there exists a constant \(C(n)\) such that
   \[
   2j-A_j\leq C(n)\qquad(j\geq0). \tag{83.12}
   \]
3. For every positive odd \(n\), there is a finite \(C(n)\) such that
   \[
   2j-A_j\leq C(n)
   \]
   for infinitely many \(j\).
4. Every positive odd orbit satisfies
   \[
   |A_j-2j|=O_n(1). \tag{83.13}
   \]

#### Proof

Suppose first that the Collatz conjecture holds. Then for every odd \(n\), there is a \(J\) such that \(n_J=1\). Since

\[
U(1)=1,\qquad v_2(3\cdot1+1)=2,
\]

we have \(a_j=2\) for every \(j\geq J\). Therefore \(D_j=2j-A_j\) is constant for \(j\geq J\), and hence bounded. Corollary 83.2 supplies the opposite bound, proving (4).

Clearly (4) implies (2), and (2) implies (3).

Now suppose (3) holds, but the orbit of some odd \(n\) never reaches \(1\). Then \(n_i\geq3\) for every \(i\). Formula (83.8) and (83.10) give

\[
D_j
\geq
\log_2\frac{n_j}{n}+\gamma j
\geq
\gamma j-\log_2\frac n3. \tag{83.14}
\]

Thus \(D_j\to+\infty\), contradicting (3). Hence every odd orbit reaches \(1\), and every even starting integer reaches an odd integer after finitely many halvings. ∎

For a globally least counterexample \(n\), every \(n_j\geq n\), so the sharper estimate

\[
D_j\geq\gamma j \tag{83.15}
\]

would hold for every \(j\).

This shows that the dichotomy is not marginal:

- a convergent orbit has bounded discrepancy;
- an orbit avoiding \(1\) has discrepancy growing at least at the explicit linear rate
  \[
  \gamma=\log_2(6/5).
  \]

There is no intermediate behavior.

### Quantitative consequence

Suppose, for one starting value \(n\), that

\[
D_j\leq C
\]

for every \(j\). While \(n_j>1\), equation (83.6) gives

\[
Y_j-Y_{j+1}
=
\frac{n_j-1}{4\,2^{D_j}}
\geq
\frac{2}{4\,2^C}
=
2^{-C-1}.
\]

Because \(Y_0=n\) and \(Y_j>0\), the number of accelerated nontrivial steps is less than

\[
2^{C+1}n. \tag{83.16}
\]

Thus an effective discrepancy bound would immediately give an effective stopping-time bound.

---

## 4. No starting-value-independent bound is possible

The stronger assertion

\[
|A_j-2j|\leq C
\]

with one absolute \(C\) for all starting integers is false.

### Proposition 83.4 — Arbitrarily large finite discrepancy

For every \(r\geq1\), let

\[
n=2^{r+1}-1.
\]

Then

\[
a_0=a_1=\cdots=a_{r-1}=1.
\]

Consequently,

\[
A_r=r,\qquad D_r=r. \tag{83.17}
\]

#### Proof

We claim inductively that

\[
n_i=3^i2^{r+1-i}-1
\qquad(0\leq i\leq r).
\]

This is true for \(i=0\). For \(i<r\),

\[
3n_i+1
=
3^{i+1}2^{r+1-i}-2
=
2\left(3^{i+1}2^{r-i}-1\right).
\]

The quantity in parentheses is odd, so \(v_2(3n_i+1)=1\), and

\[
n_{i+1}=3^{i+1}2^{r-i}-1.
\]

Therefore the first \(r\) valuations are all \(1\), proving (83.17). ∎

In particular, any seed-dependent discrepancy bound must sometimes satisfy

\[
C(n)\geq \log_2(n+1)-1.
\]

So even under Collatz, no absolute bounded-discrepancy constant exists.

---

## 5. Every finite renewal history is realizable

A second obstruction to a purely combinatorial discrepancy argument is that every finite positive valuation word occurs.

### Proposition 83.5 — Exact finite-word realizability

Let

\[
w=(a_0,\ldots,a_{r-1}),
\qquad a_i\geq1,
\]

and put

\[
A_r=\sum_{i<r}a_i.
\]

There is exactly one odd residue class modulo

\[
2^{A_r+1}
\]

whose accelerated orbit begins with the valuation word \(w\).

#### Proof

Proceed by induction on \(r\). The empty word is realized by the unique odd class modulo \(2\).

Suppose a prefix of length \(r\), total exponent \(A\), is represented by one class modulo \(2^{A+1}\). Choose a representative \(n_0\), and let

\[
x=U^r(n_0).
\]

Every lift of the same prefix has the form

\[
n_t=n_0+t2^{A+1}.
\]

By the affine trajectory identity, its endpoint after \(r\) accelerated steps is

\[
U^r(n_t)=x+2\cdot3^rt.
\]

To append the valuation \(a\), we require

\[
v_2\!\left(3(x+2\cdot3^rt)+1\right)=a.
\]

Writing

\[
m=\frac{3x+1}{2},
\]

this becomes

\[
v_2\left(m+3^{r+1}t\right)=a-1,
\]

or equivalently

\[
m+3^{r+1}t
\equiv 2^{a-1}\pmod{2^a}.
\]

Since \(3^{r+1}\) is odd, this congruence has exactly one solution \(t\bmod 2^a\). Hence there is exactly one new residue class modulo

\[
2^{A+1}2^a=2^{A+a+1}.
\]

The induction is complete. ∎

This agrees with the standard parity-vector correspondence: finite symbolic admissibility imposes no exclusion, and only stabilization of one infinite sequence at a fixed ordinary integer can matter. citeturn880956view0

Consequently:

> No finite list of forbidden valuation blocks, and no estimate applying independently at each depth while changing the seed, can prove the desired discrepancy theorem.

The proof must use the fact that all prefixes come from **one fixed starting integer**.

---

## 6. Why random renewal large deviations do not give bounded discrepancy

In the independent geometric model,

\[
A_j-2j=\sum_{i<j}(a_i-2)
\]

is a centered random walk of variance \(2j\). Its typical fluctuations have order \(\sqrt j\), and its discrepancy is almost surely unbounded. Thus even the random model itself does not satisfy an \(O(1)\) discrepancy theorem.

The critical coefficient line is

\[
A_j=\alpha j,\qquad \alpha=\log_2 3.
\]

Since \(\alpha<2\), the event \(A_j\leq\alpha j\) is a negative large deviation. Cramér’s theorem gives the rate

\[
\Pr(A_j\leq\alpha j)
=
\exp\bigl(-I(\alpha)j+o(j)\bigr),
\]

where

\[
I(x)
=
(x-1)\log\!\left(\frac{2(x-1)}x\right)
+\log\frac2x
\]

and

\[
I(\alpha)
=
0.054979472810817\ldots.
\]

This proves exponential rarity in the random model. It does not prove impossibility for one exceptional stationary arithmetic ray. Tao’s theorem similarly establishes an almost-all result in logarithmic density, not an every-starting-value theorem. citeturn794155search14

The distinction is decisive:

\[
\text{exponentially few possible prefixes}
\quad\not\Longrightarrow\quad
\text{no infinite fixed-seed path}.
\]

Proposition 83.5 makes the obstruction exact: each individual finite prefix, however atypical, is still realized by positive integers.

---

## 7. A deterministic theorem for hypothetical divergent orbits

Although bounded mean-two discrepancy is equivalent to Collatz, a strong deterministic statement can be proved at the **critical** renewal line.

Define

\[
H_j:=\frac{2^{A_j}n_j}{3^j}. \tag{83.18}
\]

The affine recurrence gives

\[
H_{j+1}
=
H_j+\frac{2^{A_j}}{3^{j+1}}
=
H_j\left(1+\frac1{3n_j}\right), \tag{83.19}
\]

and hence

\[
H_j
=
n+\sum_{i=0}^{j-1}\frac{2^{A_i}}{3^{i+1}}. \tag{83.20}
\]

Garcia and Tal proved a uniform sublinear interval-counting estimate for any infinite nonperiodic generalized Collatz trajectory. In the present setting, their estimate implies that for some constants \(K,\eta>0\),

\[
\#\bigl(\mathcal O\cap [x,x+X)\bigr)
\leq
KX^{1-\eta}\log(2X), \tag{83.21}
\]

uniformly in \(x,X\geq1\), where \(\mathcal O\) is the set of values on the orbit. citeturn698857view0

### Lemma 83.6 — Reciprocal summability

If an accelerated odd orbit is infinite and nonperiodic, then

\[
\sum_{j=0}^{\infty}\frac1{n_j}<\infty. \tag{83.22}
\]

#### Proof

A nonperiodic orbit has no repeated value, because a repeated value would make the subsequent orbit periodic.

Partition the positive integers into dyadic intervals

\[
[2^m,2^{m+1}).
\]

By (83.21), the number of orbit values in the \(m\)-th interval is at most

\[
O\!\left(2^{(1-\eta)m}(m+1)\right).
\]

Their total reciprocal contribution is therefore at most

\[
O\!\left((m+1)2^{-\eta m}\right).
\]

The sum of these bounds over \(m\geq0\) converges. ∎

### Theorem 83.7 — Summable critical escape

Let \(n_j\) be a hypothetical divergent accelerated odd orbit. Then

\[
\boxed{\displaystyle
\sum_{j=0}^{\infty}
2^{-(\alpha j-A_j)}
<\infty.} \tag{83.23}
\]

In particular,

\[
R_j=\alpha j-A_j\longrightarrow+\infty. \tag{83.24}
\]

Equivalently,

\[
A_j-\alpha j\longrightarrow-\infty, \tag{83.25}
\]

and

\[
D_j
=
\delta j+R_j
=
\delta j+\omega(1). \tag{83.26}
\]

#### Proof

By (83.19),

\[
H_j
=
n\prod_{i=0}^{j-1}
\left(1+\frac1{3n_i}\right).
\]

Using \(\log(1+t)\leq t\) and Lemma 83.6,

\[
H_j
\leq
n\exp\left(\frac13\sum_{i=0}^{\infty}\frac1{n_i}\right).
\]

Thus \(H_j\) increases to a finite limit \(H\).

Now

\[
\frac{2^{A_j}}{3^j}
=
2^{-(\alpha j-A_j)}
=
\frac{H_j}{n_j}.
\]

Therefore

\[
\sum_{j=0}^{\infty}2^{-R_j}
=
\sum_{j=0}^{\infty}\frac{H_j}{n_j}
\leq
H\sum_{j=0}^{\infty}\frac1{n_j}
<\infty.
\]

Since the summands are positive, they tend to zero, so \(R_j\to+\infty\). Formula (83.26) follows from \(D_j=\delta j+R_j\). ∎

This is stronger than merely saying that the critical surplus tends to infinity: its reciprocal exponential is summable. The earlier stationary-fibre framework isolated the qualitative condition that a divergent barrier orbit must have surplus tending to infinity while the fixed-seed carry bits eventually vanish. fileciteturn3file0L29-L35

### Corollary 83.8 — Bounded critical discrepancy is impossible on a divergent orbit

No divergent positive orbit can satisfy

\[
|A_j-\alpha j|=O(1).
\]

In particular, a critical Sturmian or Christoffel ray satisfying

\[
A_j=\lfloor\alpha j+\phi\rfloor
\]

cannot be the valuation sequence of a divergent positive integer.

Indeed, such a sequence has bounded \(R_j\), whereas (83.23) requires \(R_j\to+\infty\).

### Corollary 83.9 — Quantitative occupancy of the critical strip

Let

\[
S(n):=\sum_{j=0}^{\infty}2^{-R_j}<\infty.
\]

Then for every \(L\geq0\),

\[
\#\{j:R_j\leq L\}
\leq
2^L S(n). \tag{83.27}
\]

Thus a divergent orbit visits every fixed-width critical strip only finitely often.

---

## 8. Renewal formulation in shortcut time

Consider the full shortcut map

\[
T(x)=
\begin{cases}
x/2,&x\ \text{even},\\[1mm]
(3x+1)/2,&x\ \text{odd}.
\end{cases}
\]

Let

\[
x_{k+1}=T(x_k),\qquad
\varepsilon_k=x_k\bmod2,
\]

and

\[
s_k:=\sum_{i=0}^{k-1}\varepsilon_i.
\]

Thus \(s_k\) is the number of odd activations before time \(k\). Put

\[
\theta:=\log_3 2
=0.630929753571457\ldots
\]

and define the renewal surplus

\[
e_k:=s_k-\theta k. \tag{83.28}
\]

The multiplicative coefficient is

\[
q_k:=\frac{3^{s_k}}{2^k}=3^{e_k}. \tag{83.29}
\]

The same proof as Theorem 83.7 gives:

### Theorem 83.10 — Summable shortcut-renewal escape

For a hypothetical divergent positive orbit,

\[
\boxed{\displaystyle
\sum_{k=0}^{\infty}3^{-e_k}<\infty.} \tag{83.30}
\]

Consequently,

\[
e_k\longrightarrow+\infty. \tag{83.31}
\]

At the accelerated renewal times \(k=A_j\), one has \(s_{A_j}=j\), and

\[
3^{-e_{A_j}}
=
\frac{2^{A_j}}{3^j}
=
2^{-R_j}.
\]

Thus (83.23) is precisely the accelerated subsequence of (83.30).

This is the strongest deterministic renewal conclusion supplied by the present approach:

> A divergent orbit cannot merely stay above the critical odd-activation density. Its surplus must escape every bounded strip, with summable exponential return weight.

---

## 9. The exact remaining carry problem

Every binary parity word of length \(k\) determines one residue class modulo \(2^k\). Let

\[
0\leq \rho_k<2^k
\]

be the least representative of the residue class determined by the first \(k\) parity bits. Compatibility of successive prefixes gives

\[
\rho_{k+1}=\rho_k+b_k2^k,
\qquad b_k\in\{0,1\}. \tag{83.32}
\]

The bits \(b_k\) are the high binary lift or inverse-carry bits.

If the parity sequence is generated by one fixed positive integer \(n\), then whenever \(2^k>n\),

\[
\rho_k=n.
\]

Therefore

\[
b_k=0
\qquad\text{for all sufficiently large }k. \tag{83.33}
\]

On the other hand, Theorem 83.10 shows that a divergent orbit must satisfy

\[
\sum_{k=0}^{\infty}3^{-e_k}<\infty. \tag{83.34}
\]

Hence the divergent part of Collatz would be settled by the following statement.

### Missing Lemma 83.11 — Summable-renewal carry innovation

Every infinite admissible parity ray satisfying

\[
\sum_{k=0}^{\infty}3^{-e_k}<\infty
\]

has infinitely many indices \(k\) for which

\[
b_k=1. \tag{83.35}
\]

Indeed, (83.35) contradicts the eventual vanishing (83.33) forced by a fixed positive ordinary seed.

This formulation is sharper than the earlier proposed “high-surplus carry innovation” statement, because summability in (83.34) is strictly stronger than merely \(e_k\to+\infty\). Nevertheless, Lemma 83.11 is still unproved.

The obstruction can be displayed as an exact two-place identity. Iterating the shortcut map gives

\[
2^kx_k
=
3^{s_k}n+
\sum_{i=0}^{k-1}
\varepsilon_i2^i3^{s_k-s_{i+1}}.
\]

Dividing by \(3^{s_k}\), define

\[
\Xi_k
:=
\sum_{i=0}^{k-1}
\varepsilon_i\frac{2^i}{3^{s_{i+1}}}.
\]

Then

\[
n+\Xi_k=\frac{2^kx_k}{3^{s_k}}. \tag{83.36}
\]

For a divergent orbit, (83.30) implies that \(\Xi_k\) converges to a finite positive real number. In fact,

\[
\frac{2^i}{3^{s_{i+1}}}
=
\frac12\,3^{-e_{i+1}}
\]

whenever \(\varepsilon_i=1\).

But equation (83.36) also gives

\[
\Xi_k\longrightarrow -n
\qquad\text{in }\mathbb Q_2, \tag{83.37}
\]

because the right-hand side has \(2\)-adic valuation at least \(k\).

There is no contradiction between (83.36) and (83.37): a rational sequence may converge to unrelated limits in the real and \(2\)-adic completions. What is missing is an arithmetic rigidity theorem using the common parity labels to couple those two limits.

This is exactly the synchronization obstruction isolated in the earlier work: a successful invariant must retain simultaneously the stabilized left-end binary seed, the terminal arithmetic information, and the Archimedean order of competing positive ancestors. fileciteturn3file0L511-L562 The prior finite-input formulation similarly identifies eventual zero high-bit injection as the unresolved step needed to force a strict drop of the inverse-fibre minimum. fileciteturn2file5L261-L273

---

## 10. Periodic orbits

The summable-escape theorem concerns the divergent, nonperiodic branch. A nontrivial positive accelerated cycle would also violate bounded mean-two discrepancy.

Suppose a cycle has length \(r\), valuation sum \(A\), and odd values \(n_0,\ldots,n_{r-1}>1\). Multiplying

\[
2^{a_i}n_{i+1}=3n_i+1
\]

around the cycle gives

\[
2^A
=
\prod_{i=0}^{r-1}\left(3+\frac1{n_i}\right).
\]

Because \(n_i\geq3\),

\[
3^r<2^A\leq\left(\frac{10}{3}\right)^r<4^r.
\]

Thus

\[
\alpha r<A<2r,
\]

so over each repetition of the cycle the renewal debt increases by

\[
2r-A>0.
\]

Consequently \(D_j\to+\infty\) along every hypothetical nontrivial cycle as well.

Therefore the bounded-discrepancy theorem would exclude both cycles and divergence—but precisely because, by Theorem 83.3, it is already equivalent to the full conjecture.

---

## Final status

| Statement | Status |
|---|---|
| \(A_j-2j\leq\log_2 n\) for every orbit | **Proved** |
| An orbit avoiding \(1\) satisfies \(2j-A_j\geq\gamma j-O_n(1)\) | **Proved** |
| Seed-dependent bounded discrepancy \(|A_j-2j|=O_n(1)\) for every orbit | **Equivalent to Collatz** |
| One discrepancy constant uniform in all starting values | **False** |
| Every finite valuation history is realized by positive integers | **Proved** |
| A divergent orbit satisfies \(\sum_j2^{-(\alpha j-A_j)}<\infty\) | **Proved**, using the uniform orbit-counting theorem |
| A divergent shortcut orbit satisfies \(\sum_k3^{-e_k}<\infty\) | **Proved** |
| Summable renewal surplus forces infinitely many binary lift carries | **Unproved; exact remaining divergence lemma** |
| Full Collatz conjecture | **Not completed by this route** |

The decisive conclusion is therefore:

\[
\boxed{
\text{Bounded deterministic renewal discrepancy is not an intermediate lemma;}
\ \text{it is an exact reformulation of Collatz.}
}
\]

The genuinely narrower frontier is Lemma 83.11: prove that summable escape above the critical renewal density is incompatible with eventual stabilization of the binary seed. Any claimed completion of approach 83 must establish that cross-prime carry theorem, rather than replacing it with random large-deviation estimates.