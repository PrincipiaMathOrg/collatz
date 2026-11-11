model: GPT-5.6 Pro (Chat mode)
round: 50 -- approach 45, Arithmetic fractal intersection
front: proof
sent: 2026-08-15T15:16Z
worked: 69m 30s

---

# Outcome

Carrying the arithmetic-fractal program through does **not** produce a valid proof of the Collatz conjecture. Instead, it reveals a structural obstruction:

> Ordinary Hausdorff dimension is incapable of distinguishing an empty triple intersection from one containing a single positive-integer counterexample.

The relevant dimensions can be computed sharply, and the carry coding can be made exact. But the required conclusion reduces to a new **finite-height adelic transversality theorem**, not to a standard fractal-intersection theorem. That theorem remains unproved, and positive cycles require a separate divisibility argument.

This is consistent with the current status of Collatz as an open problem as of August 15, 2026. citeturn737387search4turn285695search4

What follows is the complete rigorous analysis, including the strongest corrected reduction I can obtain.

---

# 1. The critical-drift parity fractal

Use the shortcut Collatz map

\[
T(n)=
\begin{cases}
n/2,&n\equiv0\pmod2,\\[2mm]
(3n+1)/2,&n\equiv1\pmod2.
\end{cases}
\]

For \(n\in\mathbb N\), write

\[
\epsilon_j(n)=T^j(n)\pmod 2,\qquad
S_k(n)=\sum_{j=0}^{k-1}\epsilon_j(n).
\]

Let

\[
\alpha=\log_3 2=\frac{\log 2}{\log 3}
       =0.630929753571\ldots .
\]

The formal multiplicative part of \(k\) shortcut steps is

\[
\frac{3^{S_k}}{2^k}.
\]

Thus the critical odd-step frequency is \(\alpha\).

Equip \(\{0,1\}^{\mathbb N}\cong\mathbb Z_2\) with the binary ultrametric

\[
d_2(\epsilon,\epsilon')=2^{-m},
\]

where \(m\) is the first position at which the sequences differ. Define

\[
\mathcal C_\alpha
=
\left\{
\epsilon\in\{0,1\}^{\mathbb N}:
\liminf_{k\to\infty}\frac{S_k(\epsilon)}k\ge\alpha
\right\}.
\]

## Theorem 1

\[
\boxed{
\dim_H\mathcal C_\alpha
=
H_2(\alpha)
}
\]

where

\[
H_2(p)=-p\log_2p-(1-p)\log_2(1-p).
\]

Numerically,

\[
\boxed{
\dim_H\mathcal C_\alpha
=
0.949955527188\ldots
}
\]

### Proof: upper bound

Fix \(\delta>0\). For all sufficiently large \(k\), any sequence in \(\mathcal C_\alpha\) belongs to a length-\(k\) cylinder whose word has at least \((\alpha-\delta)k\) ones.

The number of such words is

\[
N_k(\delta)
=
\sum_{j\ge(\alpha-\delta)k}\binom{k}{j}.
\]

Since \(\alpha-\delta>1/2\) for sufficiently small \(\delta\),

\[
N_k(\delta)
=
2^{\,k(H_2(\alpha-\delta)+o(1))}.
\]

Each cylinder has diameter \(2^{-k}\). Hence for every

\[
s>H_2(\alpha-\delta),
\]

the total \(s\)-dimensional cost is

\[
N_k(\delta)2^{-ks}
=
2^{-k(s-H_2(\alpha-\delta)+o(1))}
\longrightarrow0.
\]

Therefore

\[
\dim_H\mathcal C_\alpha
\le H_2(\alpha-\delta).
\]

Letting \(\delta\downarrow0\) gives

\[
\dim_H\mathcal C_\alpha\le H_2(\alpha).
\]

### Proof: lower bound

Put the Bernoulli measure \(\mu_\alpha\) on binary sequences, with

\[
\mu_\alpha(\epsilon_j=1)=\alpha.
\]

By the strong law,

\[
\frac{S_k}{k}\longrightarrow\alpha
\]

for \(\mu_\alpha\)-almost every sequence, so \(\mu_\alpha(\mathcal C_\alpha)=1\).

For a typical sequence,

\[
-\frac1k\log_2\mu_\alpha([\epsilon_0\ldots\epsilon_{k-1}])
\longrightarrow H_2(\alpha).
\]

Thus \(\mu_\alpha\) has exact local dimension \(H_2(\alpha)\), and the mass-distribution principle gives

\[
\dim_H\mathcal C_\alpha\ge H_2(\alpha).
\]

This proves the theorem. ∎

---

## Why a divergent orbit lies in this set

For an actual positive orbit \(x_j=T^j(n)\),

\[
\frac{x_{j+1}}{x_j}
=
\begin{cases}
1/2,&\epsilon_j=0,\\[1mm]
\frac32\left(1+\frac{1}{3x_j}\right),&\epsilon_j=1.
\end{cases}
\]

Consequently,

\[
\log x_k-\log n
=
S_k\log3-k\log2
+
\sum_{\substack{0\le j<k\\\epsilon_j=1}}
\log\left(1+\frac1{3x_j}\right).
\tag{1}
\]

If a positive orbit is nonperiodic but does not tend to infinity, it visits some finite set infinitely often; one integer then repeats, forcing periodicity. Therefore every nonperiodic counterexample necessarily satisfies

\[
x_k\longrightarrow\infty.
\]

In that case,

\[
\frac1k
\sum_{\substack{j<k\\\epsilon_j=1}}
\log\left(1+\frac1{3x_j}\right)
\longrightarrow0
\]

by Cesàro convergence. Dividing (1) by \(k\) and using
\(\liminf \log x_k/k\ge0\), we obtain

\[
\liminf_{k\to\infty}\frac{S_k}{k}\ge\frac{\log2}{\log3}=\alpha.
\]

Thus:

\[
\boxed{
\text{Every divergent positive Collatz orbit has parity sequence in }
\mathcal C_\alpha.
}
\tag{2}
\]

This argument does **not** include positive cycles. Indeed, over a positive cycle of length \(k\) with \(s\) odd steps, (1) gives

\[
0=s\log3-k\log2+\text{a strictly positive term},
\]

so

\[
\frac{s}{k}<\alpha.
\tag{3}
\]

The critical-drift fractal detects divergent orbits, not nontrivial cycles.

---

# 2. Accelerated valuation words

It is more natural to express the 3-adic carries using the odd-to-odd Syracuse map

\[
U(x)=\frac{3x+1}{2^{a(x)}},
\qquad
a(x)=v_2(3x+1),
\]

defined on positive odd integers.

For an orbit

\[
x_{j+1}=U(x_j),
\]

write

\[
a_j=v_2(3x_j+1),\qquad
A_k=a_0+\cdots+a_{k-1}.
\]

Then

\[
2^{A_k}x_k=3^k x_0+C_k,
\tag{4}
\]

where

\[
C_k
=
\sum_{j=0}^{k-1}3^{k-1-j}2^{A_j},
\qquad A_0=0.
\tag{5}
\]

Taking logarithms step by step gives

\[
\log x_k-\log x_0
=
k\log3-A_k\log2
+
\sum_{j=0}^{k-1}
\log\left(1+\frac1{3x_j}\right).
\tag{6}
\]

Set

\[
\beta=\log_2 3=\frac1\alpha
=1.584962500721\ldots .
\]

For a divergent orbit, the last average in (6) tends to zero and therefore

\[
\boxed{
\limsup_{k\to\infty}\frac{A_k}{k}\le\beta.
}
\tag{7}
\]

Define the critical valuation set

\[
\mathcal E_\beta
=
\left\{
(a_0,a_1,\ldots)\in\mathbb N_{\ge1}^{\mathbb N}:
\limsup_{k\to\infty}\frac{A_k}{k}\le\beta
\right\}.
\]

Equip valuation sequences with the metric

\[
d_3(a,b)=3^{-m},
\]

where \(m\) is their first differing coordinate. This is the correct scale for the 3-adic carry code below.

---

## Theorem 2

\[
\boxed{
\dim_H\mathcal E_\beta
=
\frac{g(\beta)}{\log3}
=
H_2(\alpha)
=
0.949955527188\ldots
}
\]

where

\[
g(\lambda)
=
\lambda\log\lambda-(\lambda-1)\log(\lambda-1).
\]

### Proof: counting compositions

The number of positive integer words

\[
(a_0,\ldots,a_{k-1})
\]

with total \(A_k=A\) is

\[
\binom{A-1}{k-1}.
\]

Therefore the number with \(A_k\le m\) is

\[
\sum_{A=k}^{m}\binom{A-1}{k-1}
=
\binom{m}{k}.
\tag{8}
\]

For \(m=\lfloor\lambda k\rfloor\), Stirling's formula gives

\[
\frac1k\log\binom{\lambda k}{k}
\longrightarrow
g(\lambda).
\tag{9}
\]

Covering \(\mathcal E_\beta\) by cylinders with total at most
\((\beta+\delta)k\) gives

\[
\dim_H\mathcal E_\beta
\le
\frac{g(\beta)}{\log3}.
\]

For the lower bound, use the geometric distribution

\[
\mathbb P(a_j=m)
=
\alpha(1-\alpha)^{m-1}.
\tag{10}
\]

Its mean is \(1/\alpha=\beta\), and its entropy is

\[
-\sum_{m\ge1}\alpha(1-\alpha)^{m-1}
\log\!\left(\alpha(1-\alpha)^{m-1}\right)
=
g(\beta).
\]

The strong law places almost every such sequence in \(\mathcal E_\beta\), while the cylinder local dimension is \(g(\beta)/\log3\). This establishes the lower bound.

Finally,

\[
\frac{g(\beta)}{\log3}
=
\frac{H(\alpha)}{\log2}
=
H_2(\alpha),
\]

where \(H\) denotes natural-log binary entropy. ∎

---

# 3. The exact 3-adic carry fractal

For \(a=(a_0,a_1,\ldots)\), define

\[
\Psi(a)
=
\sum_{r=0}^{\infty}
3^r2^{-(a_0+\cdots+a_r)}
\in\mathbb Z_3.
\tag{11}
\]

It satisfies the self-similar recursion

\[
\boxed{
\Psi(a)
=
2^{-a_0}\bigl(1+3\Psi(\sigma a)\bigr).
}
\tag{12}
\]

This is the same 3-adic random-series structure that occurs in Tao's Syracuse random variables and their fine-scale mixing theory. Tao's estimates concern the unconditioned geometric valuation law; the critical lower-tail constraint \(A_k/k\le\beta\) is substantially thinner. citeturn285695search1turn285695search7

Define

\[
\mathcal K_\beta=\Psi(\mathcal E_\beta)\subset\mathbb Z_3.
\]

This is a natural candidate for the “3-adic carry-compatible” fractal.

---

## Theorem 3

\[
\boxed{
\frac{\log2}{\log3}
\le
\dim_H\mathcal K_\beta
\le
H_2(\alpha).
}
\]

Equivalently,

\[
\boxed{
0.630929753571\ldots
\le
\dim_H\mathcal K_\beta
\le
0.949955527188\ldots .
}
\]

### Upper bound

If two valuation sequences agree in their first \(m\) entries, the corresponding sums (11) differ by a multiple of \(3^m\). Thus

\[
|\Psi(a)-\Psi(b)|_3\le3^{-m}=d_3(a,b).
\]

Hence \(\Psi\) is \(1\)-Lipschitz, so

\[
\dim_H\mathcal K_\beta
\le
\dim_H\mathcal E_\beta
=
H_2(\alpha).
\]

### Lower bound

Restrict to valuation digits \(a_j\in\{1,2\}\). If two such sequences first differ at position \(m\), then after removing the common prefix the difference between their two first-level branches is

\[
\frac12(1+3u)-\frac14(1+3v)
=
\frac14+3z,
\]

which is a 3-adic unit. Therefore their images under \(\Psi\) differ by exactly \(3^{-m}\): the coding is isometric on \(\{1,2\}^{\mathbb N}\).

Under the fair Bernoulli measure on \(\{1,2\}\),

\[
\frac{A_k}{k}\longrightarrow\frac32<\beta.
\]

Hence almost every such sequence belongs to \(\mathcal E_\beta\). Its image has dimension

\[
\frac{\log2}{\log3}.
\]

This proves the lower bound. ∎

The precise value of \(\dim_H\mathcal K_\beta\) is not needed for the main obstruction. It is already large enough that \(\mathcal K_\beta\) cannot be regarded as a negligible carry set.

---

# 4. The positive integers under parity conjugacy

Define the parity conjugacy

\[
Q(x)
=
\sum_{j=0}^{\infty}
\bigl(T^j(x)\bmod2\bigr)2^j,
\qquad x\in\mathbb Z_2.
\tag{13}
\]

The map \(Q:\mathbb Z_2\to\mathbb Z_2\) is a bijective isometry conjugating the shortcut Collatz map to the binary shift. In particular, each finite parity word corresponds to one residue class modulo \(2^k\). citeturn737387search3

Let

\[
\mathcal P=Q(\mathbb N)\subset\mathbb Z_2.
\]

Then:

\[
\boxed{\dim_H\mathcal P=0}
\]

because \(\mathcal P\) is countable.

But \(\mathcal P\) is also dense. Indeed, every binary cylinder contains \(Q(n)\) for infinitely many positive integers \(n\). Consequently,

\[
\boxed{
\underline{\dim}_{B}\mathcal P
=
\overline{\dim}_{B}\mathcal P
=
1.
}
\]

At level \(k\), all \(2^k\) binary cylinders meet \(\mathcal P\).

Thus \(\mathcal P\) simultaneously has

\[
\text{Hausdorff dimension }0
\quad\text{and}\quad
\text{full box dimension }1.
\tag{14}
\]

This discrepancy is central.

---

## The natural adelic graph is also dense

Since the critical future lies in \(\mathbb Z_2\) and the carry information lies in \(\mathbb Z_3\), the literal “triple intersection” is not initially defined in one space.

A natural common ambient space is

\[
\mathbb Z_2\times\mathbb Z_3,
\]

using the positive-integer graph

\[
\mathcal D_+
=
\{(Q(n),n):n\in\mathbb N\}.
\tag{15}
\]

This set is countable, so

\[
\dim_H\mathcal D_+=0.
\]

Nevertheless it is dense in \(\mathbb Z_2\times\mathbb Z_3\). To see this, prescribe

\[
Q(n)\equiv q\pmod{2^k},
\qquad
n\equiv y\pmod{3^r}.
\]

The first condition is equivalent, through the isometry \(Q\), to one residue condition

\[
n\equiv c_q\pmod{2^k}.
\]

The Chinese remainder theorem combines this with the prescribed residue modulo \(3^r\), producing a positive integer \(n\).

Therefore every product cylinder meets \(\mathcal D_+\).

With the standard maximum product metric, it has full box dimension:

\[
\boxed{
\dim_H\mathcal D_+=0,
\qquad
\dim_B\mathcal D_+=2.
}
\tag{16}
\]

---

# 5. Why Hausdorff transversality cannot prove emptiness

The proposed strategy now encounters four separate obstructions.

## Obstruction 1: dimension zero does not mean empty

Any intersection with \(\mathcal P\) or \(\mathcal D_+\) is countable. Hence

\[
\dim_H\bigl((\mathcal C_\alpha\times\mathcal K_\beta)
\cap\mathcal D_+\bigr)=0
\]

whether the intersection is empty, contains one divergent counterexample, or contains infinitely many counterexamples.

Adding or deleting one point leaves every Hausdorff dimension unchanged.

Thus a conclusion of the form

\[
\dim_H(\text{triple intersection})=0
\]

contains no information relevant to Collatz.

---

## Obstruction 2: generic translations are irrelevant

A Marstrand-type theorem may imply that for almost every translation \(t\),

\[
(\mathcal C_\alpha\times\mathcal K_\beta)
\cap(\mathcal D_++t)=\varnothing.
\]

But Collatz corresponds to one fixed arithmetic placement, namely \(t=0\).

A generic theorem is allowed to have a measure-zero exceptional set of translations. The arithmetic placement can lie in precisely that exceptional set.

Indeed, \(\mathcal D_+\) meets every finite product cylinder, so no argument based only on finite-scale topological separation can rule out \(t=0\).

---

## Obstruction 3: the two main fractals are not dimensionally transverse

We have

\[
\dim_H\mathcal C_\alpha
=
0.949955527188\ldots
\]

and

\[
\dim_H\mathcal K_\beta
\ge
0.630929753571\ldots .
\]

Thus

\[
\dim_H\mathcal C_\alpha
+
\dim_H\mathcal K_\beta
>
1.5808.
\]

If one artificially identified the two local coordinates in a one-dimensional ambient space, the usual heuristic would predict a large intersection, not emptiness.

Even using the upper estimate

\[
\dim_H\mathcal K_\beta\le0.949955527188\ldots,
\]

the critical and carry sets are individually very large.

---

## Obstruction 4: dimensions do not see the sign of the affine term

Consider the accelerated \(3x-1\) map

\[
U_-(x)=\frac{3x-1}{2^{v_2(3x-1)}}.
\]

It has the positive cycle

\[
5\longmapsto7\longmapsto5,
\]

because

\[
\frac{3\cdot5-1}{2}=7,
\qquad
\frac{3\cdot7-1}{4}=5.
\]

Its valuation word is \((1,2)\), whose mean is

\[
\frac{1+2}{2}=\frac32<\beta.
\]

Replacing \(+1\) by \(-1\) merely changes the signs of the affine carry translations. Multiplication by \(-1\) is a 3-adic isometry, so all the Hausdorff-dimension calculations above remain unchanged.

Therefore any argument depending only on:

- contraction ratios,
- valuation frequencies,
- local entropy,
- 2-adic or 3-adic Hausdorff dimension,

would give the same conclusion for \(3x+1\) and \(3x-1\), even though the latter has this nontrivial positive cycle.

The missing information is the joint **Archimedean sign and height** of the same integer representative.

---

# 6. Exact terminal-suffix carry locality

The 3-adic carry relation nevertheless gives a useful exact theorem.

Let

\[
v=(a_{k-r},\ldots,a_{k-1})
\]

be the final \(r\) valuations of a length-\(k\) orbit segment. Put

\[
B(v)=a_{k-r}+\cdots+a_{k-1}.
\]

Let \(C_v\) be the affine constant for this block, so that

\[
2^{B(v)}x_k
=
3^r x_{k-r}+C_v.
\tag{17}
\]

Reducing modulo \(3^r\),

\[
x_k
\equiv
2^{-B(v)}C_v
\pmod{3^r}.
\tag{18}
\]

Expanding \(C_v\) gives

\[
\boxed{
x_k
\equiv
\sum_{t=0}^{r-1}
3^t
2^{-(a_{k-1}+\cdots+a_{k-1-t})}
\pmod{3^r}.
}
\tag{19}
\]

Hence \(x_k\bmod3^r\) depends only on the last \(r\) valuation exponents.

In particular,

\[
\boxed{
3^r\mid x_k+1
\iff
3^r\mid C_v+2^{B(v)}.
}
\tag{20}
\]

This is precisely the finite terminal-suffix locality statement underlying the proposed carry fractal.

---

# 7. The orientation obstruction

Equation (19) has an important directional feature.

At time \(k\), the endpoint residue is coded by the reversed word

\[
(a_{k-1},a_{k-2},\ldots,a_0).
\]

At time \(k+1\), the relevant word is

\[
(a_k,a_{k-1},\ldots,a_0).
\]

The new digit is **prepended**, not appended. Consequently these words do not form nested prefixes in the coding (11). There is generally no single point

\[
\Psi(a_0,a_1,\ldots)
\]

whose successive 3-adic truncations are the actual endpoint residues.

This invalidates the naive static interpretation in which one divergent orbit automatically produces one point of \(\mathcal K_\beta\).

The forward estimate

\[
A_k\le(\beta+o(1))k
\]

controls the total of the first \(k\) exponents. It does not imply that all reversed subprefixes satisfy the same barrier.

---

## A partial repair using record minima

Define

\[
D_k=A_k-\beta k.
\]

Suppose \(k\) is a record-minimum time:

\[
D_k\le D_j
\qquad(0\le j\le k).
\]

Then for every \(1\le r\le k\),

\[
D_k\le D_{k-r},
\]

and hence

\[
A_k-A_{k-r}\le\beta r.
\tag{21}
\]

Thus the entire reversed valuation word at time \(k\) satisfies the prefix barrier

\[
a_{k-1}+\cdots+a_{k-r}\le\beta r
\qquad(1\le r\le k).
\tag{22}
\]

Moreover, from (17),

\[
x_k
=
\frac{3^r}{2^{A_k-A_{k-r}}}x_{k-r}
+
\frac{C_v}{2^{A_k-A_{k-r}}}
>
x_{k-r},
\]

because (21) implies

\[
3^r\ge2^{A_k-A_{k-r}}.
\]

Therefore every record-minimum time for \(D_k\) is a record-maximum time for \(x_k\).

This is a genuine synchronization between Archimedean growth and reversed 3-adic carry words.

However, a divergent orbit need not have infinitely many record minima of \(D_k\): it is logically possible that \(D_k\) is eventually bounded below while the positive correction sum in (6) diverges slowly. So this does not close the argument.

---

# 8. Canonical finite-height representatives

The correct replacement for ordinary fractal transversality is obtained by retaining the actual Archimedean representatives of each symbolic cylinder.

Let

\[
w=(a_0,\ldots,a_{k-1})
\]

be any positive valuation word, with total \(A=A_k\) and affine constant \(C_w\).

Define \(r_3(w)\) to be the unique odd integer satisfying

\[
1\le r_3(w)<2\cdot3^k
\]

and

\[
2^A r_3(w)\equiv C_w\pmod{3^k}.
\tag{23}
\]

Now define

\[
r_2(w)
=
\frac{2^A r_3(w)-C_w}{3^k}.
\tag{24}
\]

## Proposition 4

For every valuation word \(w\):

1. \(r_2(w)\) is a positive odd integer;
2. \(r_2(w)<2^{A+1}\);
3. \(r_2(w)\) realizes exactly the valuation word \(w\);
4. its endpoint after those \(k\) odd steps is \(r_3(w)\);
5. all positive realizations of \(w\) are exactly

\[
x_0=r_2(w)+t2^{A+1},
\qquad
x_k=r_3(w)+t(2\cdot3^k),
\qquad t\ge0.
\tag{25}
\]

### Proof

The congruence (23) makes (24) integral.

Backward recursion from \(r_3(w)\),

\[
y_i=\frac{2^{a_i}y_{i+1}-1}{3},
\]

is integral at every stage because the full congruence modulo \(3^k\) implies the corresponding suffix congruence modulo \(3^{k-i}\). Each \(y_i\) is positive and odd. Thus \(y_0=r_2(w)\) realizes \(w\).

To prove the upper bound, replace \(r_3(w)\) by

\[
r_3(w)-2\cdot3^k<0.
\]

The corresponding initial representative is \(r_2(w)-2^{A+1}\). From the affine identity,

\[
3^k\bigl(r_2(w)-2^{A+1}\bigr)
=
2^A\bigl(r_3(w)-2\cdot3^k\bigr)-C_w<0.
\]

Hence

\[
r_2(w)<2^{A+1}.
\]

Adding \(2\cdot3^k\) to an admissible endpoint adds \(2^{A+1}\) to the initial value, giving (25). ∎

---

## Consequence for one fixed counterexample

Suppose \(n\) is an actual odd seed and \(w_k\) is its first \(k\) valuation exponents.

Since \(A_k\ge k\), for all sufficiently large \(k\),

\[
n<2^{A_k+1}.
\]

The seed \(n\) is then already the least positive representative in its word cylinder, so

\[
\boxed{
r_2(w_k)=n,\qquad r_3(w_k)=x_k.
}
\tag{26}
\]

Thus the canonical coordinates are eventually not artificial: they are exactly the seed and the endpoint of the orbit.

---

# 9. The small adelic corner forced by a counterexample

For every odd Syracuse step,

\[
x_{j+1}
=
\frac{3x_j+1}{2^{a_j}}
\le
\frac{3x_j+1}{2}.
\]

Hence

\[
x_{j+1}+1\le\frac32(x_j+1),
\]

and therefore

\[
x_k+1\le
\left(\frac32\right)^k(n+1).
\tag{27}
\]

Let \(\eta>0\). A divergent counterexample would satisfy, for all sufficiently large \(k\),

\[
A_k\le(\beta+\eta)k,
\tag{28}
\]

\[
r_2(w_k)=n\le e^{\eta k},
\tag{29}
\]

and, by (27),

\[
r_3(w_k)=x_k
\le
\left(\frac32\right)^ke^{\eta k}.
\tag{30}
\]

Define the level-\(k\) small-corner set

\[
\mathscr S_k(\eta)
=
\left\{
\begin{array}{l}
w\in\mathbb N_{\ge1}^k:\\[1mm]
A(w)\le(\beta+\eta)k,\\
r_2(w)\le e^{\eta k},\\
r_3(w)\le(3/2)^ke^{\eta k}
\end{array}
\right\}.
\tag{31}
\]

Then:

\[
\boxed{
\text{Every divergent counterexample supplies a nested word }
w_k\in\mathscr S_k(\eta)
\text{ for every sufficiently large }k.
}
\tag{32}
\]

This is the rigorous finite-height formulation of arithmetic transversality.

---

# 10. The exact missing theorem

The required result is not a Hausdorff-dimension theorem. It is the following deterministic statement.

## Adelic small-corner extinction theorem

There exists \(\eta>0\) such that no infinite valuation sequence has all sufficiently long prefixes in \(\mathscr S_k(\eta)\).

A stronger version would assert

\[
\boxed{
\mathscr S_k(\eta)=\varnothing
\quad\text{for all sufficiently large }k.
}
\tag{AC}
\]

Either version would exclude divergent positive orbits.

The crucial content is the simultaneous smallness of:

\[
r_2(w)\quad\text{inside a range of size }2^{A(w)}
\]

and

\[
r_3(w)\quad\text{inside a range of size }3^k.
\]

Ordinary dimensions discard both canonical heights.

---

# 11. Why the conjectured transversality is heuristically strong

For total valuation

\[
A\sim\lambda k,
\]

the number of words is approximately

\[
\exp(g(\lambda)k).
\]

If the canonical representatives behaved as independent uniform points in their natural ranges, the probability that

\[
r_2(w)\le e^{\eta k}
\]

would be approximately

\[
\frac{e^{\eta k}}{2^A},
\]

while the probability that

\[
r_3(w)\le(3/2)^ke^{\eta k}
\]

would be approximately

\[
\frac{(3/2)^ke^{\eta k}}{3^k}
=
2^{-k}e^{\eta k}.
\]

The expected number of survivors with \(A\sim\lambda k\) would therefore have exponential rate

\[
g(\lambda)-\lambda\log2-\log2+2\eta.
\tag{33}
\]

At the critical endpoint \(\lambda=\beta\),

\[
\beta\log2=\log3,
\]

so the rate at \(\eta=0\) is

\[
g(\beta)-\log6.
\]

Numerically,

\[
g(\beta)=1.043632815857\ldots ,
\]

and

\[
\boxed{
\log6-g(\beta)
=
0.748126653371\ldots>0.
}
\tag{34}
\]

Thus the independent model predicts exponentially fast extinction.

By comparison, using the initial coordinate alone gives only

\[
\log3-g(\beta)
=
0.054979472811\ldots .
\]

The endpoint condition supplies a much larger entropy gap.

---

## A rigorous generic version

One can make this heuristic into a theorem after independently Haar-translating the two canonical coordinates at every scale.

For each \(k,A\), randomly translate the \(r_2\)-coordinates in the cyclic group of odd residues modulo \(2^{A+1}\), and independently translate the \(r_3\)-coordinates among odd residues modulo \(2\cdot3^k\).

The expected number of translated words satisfying the three inequalities in (31) is bounded by

\[
\sum_{A\le(\beta+\eta)k}
\binom{A-1}{k-1}
O\!\left(\frac{e^{\eta k}}{2^A}\right)
O\!\left(2^{-k}e^{\eta k}\right).
\tag{35}
\]

For sufficiently small fixed \(\eta>0\), (34) implies that this is \(O(e^{-ck})\) for some \(c>0\). The sum over \(k\) converges, so Borel–Cantelli gives eventual extinction almost surely.

Therefore:

\[
\boxed{
\text{The desired small-corner extinction holds for generic independent
translations.}
}
\]

But the Collatz system uses the fixed, correlated, zero translation. The affine identity

\[
2^A r_3(w)=3^k r_2(w)+C_w
\]

couples the two coordinates exactly. Proving that this deterministic correlation still behaves transversely is the whole missing problem.

---

# 12. Cycles remain a separate obstruction

Even a proof of \((AC)\) would only exclude divergent orbits.

A positive odd cycle with valuation word \(w\) satisfies

\[
x_k=x_0=n.
\]

Using (4),

\[
2^A n=3^k n+C_w,
\]

so

\[
\boxed{
(2^A-3^k)n=C_w.
}
\tag{36}
\]

Since \(C_w>0\),

\[
2^A>3^k,
\qquad
\frac Ak>\beta.
\]

Thus cycle words lie on the opposite side of the drift threshold and are invisible to \(\mathcal E_\beta\).

To finish Collatz after proving adelic small-corner extinction, one would additionally need:

## Cycle divisibility theorem

For every positive valuation word \(w\), except repetitions of the trivial word \((2)\),

\[
\boxed{
2^{A(w)}-3^{|w|}
\nmid C_w.
}
\tag{CYC}
\]

For \(w=(2)\),

\[
A=2,\qquad C_w=1,
\qquad
2^2-3=1,
\]

which yields the fixed odd orbit \(1\mapsto1\).

No Hausdorff-dimension argument proves \((CYC)\), because it is an exact divisibility assertion about a single finite word.

---

# 13. Precise conditional reduction

Combining the analysis gives a clean theorem.

## Conditional theorem

Assume:

1. the adelic small-corner extinction theorem \((AC)\);
2. the cycle divisibility theorem \((CYC)\).

Then every positive integer reaches \(1\) under Collatz iteration.

### Proof

Suppose a positive orbit never reaches \(1\).

If it is eventually periodic, it gives a nontrivial positive valuation cycle, contradicting \((CYC)\).

Otherwise it cannot visit any bounded set infinitely often, since repetition of an integer would force periodicity. Hence it tends to infinity. Equations (28)–(30) then produce an infinite nested sequence

\[
w_k\in\mathscr S_k(\eta)
\]

for all sufficiently large \(k\), contradicting \((AC)\).

Therefore every positive orbit reaches \(1\). ∎

---

# Final assessment

The arithmetic-fractal approach yields three sharp facts:

\[
\boxed{
\dim_H\mathcal C_\alpha
=
H_2(\log_3 2)
=
0.949955527188\ldots
}
\]

\[
\boxed{
0.630929753571\ldots
\le
\dim_H\mathcal K_\beta
\le
0.949955527188\ldots
}
\]

and

\[
\boxed{
\dim_HQ(\mathbb N)=0,
\qquad
\dim_BQ(\mathbb N)=1.
}
\]

These estimates do **not** imply empty intersection. The image of the positive integers is countable but dense, and Hausdorff dimension cannot detect whether one exceptional arithmetic point survives.

The valid replacement is not ordinary fractal transversality but the deterministic statement that the canonical pair

\[
\bigl(r_2(w),r_3(w)\bigr)
\]

cannot repeatedly enter the exponentially small Archimedean corner

\[
r_2\le e^{\eta k},
\qquad
r_3\le(3/2)^ke^{\eta k},
\qquad
A\le(\beta+\eta)k.
\]

There is a strong entropy margin of

\[
\log6-g(\beta)=0.748126653371\ldots,
\]

and generic randomized translations satisfy the required extinction. What is missing is a deterministic anti-concentration or discrepancy theorem for the exact affine carries \(C_w\). Positive cycles additionally require the independent divisibility theorem \((CYC)\).

Accordingly, this route has been reduced to two explicit arithmetic statements, but it has not produced a verified full proof of the Collatz conjecture.