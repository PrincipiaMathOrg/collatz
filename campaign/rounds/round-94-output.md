model: GPT-5.6 Pro (Chat mode)
round: 94 -- approach 89, Conditional abc-assisted cycle bounds
front: proof
sent: 2026-08-17T16:14Z
worked: 42m 46s

---

# Conditional \(abc\)-assisted bounds for Collatz cycles

Carrying this approach through rigorously does **not** produce a full proof of the Collatz conjecture from the ordinary \(abc\) conjecture. It does, however, give a clean conditional structure theorem:

> **Assuming \(abc\), the power gap \(2^A-3^k\) attached to any sufficiently large Collatz cycle must be almost squarefree on a logarithmic scale. The same radical-richness condition holds for every reduced affine prefix and every decomposition of the cycle carry into two partial sums.**

Consequently, \(abc\) conditionally eliminates broad families of cycles for which the power gap is a perfect power, is composed of unusually small primes, or contains a fixed positive proportion of repeated prime factors. What it does **not** control is the decisive word-dependent divisibility
\[
2^A-3^k\mid C_w.
\]
That is the exact remaining arithmetic obstruction.

The affine divisibility formulation is classical and appears explicitly in work of Kaneda and in Tao’s discussion of Collatz cycle equations. The strongest peer-reviewed local-minimum result currently available is Hercher’s exclusion of cycles with at most \(91\) local minima, while published exhaustive verification covers every starting value below \(2^{71}\). citeturn456156view0turn629473view3turn112389view1turn961402search3

---

## 1. Exact odd-cycle equations

Work with the accelerated map on positive odd integers
\[
U(x)=\frac{3x+1}{2^{\nu_2(3x+1)}}.
\]

Suppose that
\[
x_0,x_1,\ldots,x_{k-1},x_k=x_0
\]
is a positive odd cycle. Define
\[
a_i=\nu_2(3x_i+1)\ge 1,
\qquad
A_r=\sum_{i=0}^{r-1}a_i,
\qquad
A=A_k.
\]
Thus
\[
2^{a_i}x_{i+1}=3x_i+1.
\]

Define the affine carries
\[
C_0=0,
\qquad
C_{r+1}=3C_r+2^{A_r}.
\]
Equivalently,
\[
C_r=\sum_{t=0}^{r-1}3^{r-1-t}2^{A_t}.
\]

### Lemma 1: prefix identity

For every \(0\le r\le k\),
\[
\boxed{2^{A_r}x_r=3^r x_0+C_r.}
\]

### Proof

The identity is immediate for \(r=0\). Assuming it for \(r\),
\[
\begin{aligned}
2^{A_{r+1}}x_{r+1}
 &=2^{A_r}(3x_r+1)\\
 &=3(2^{A_r}x_r)+2^{A_r}\\
 &=3(3^r x_0+C_r)+2^{A_r}\\
 &=3^{r+1}x_0+C_{r+1}.
\end{aligned}
\]
This proves the induction. \(\square\)

At \(r=k\), because \(x_k=x_0\),
\[
(2^A-3^k)x_0=C_k.
\]
Set
\[
\boxed{D=2^A-3^k.}
\]
Then the exact cycle equation is
\[
\boxed{Dx_0=C_k.} \tag{1}
\]

Multiplication of the individual recurrence relations around the cycle gives
\[
2^A
 =3^k\prod_{i=0}^{k-1}\left(1+\frac1{3x_i}\right).
\]
Every factor in the product is greater than \(1\), so
\[
D=2^A-3^k>0.
\]

Thus a valuation word
\[
w=(a_0,\ldots,a_{k-1})
\]
can represent a cycle only if
\[
\boxed{D_w\mid C_w,} \tag{2}
\]
where
\[
D_w=2^{A}-3^k,
\qquad
C_w=\sum_{t=0}^{k-1}3^{k-1-t}2^{A_t}.
\]

Divisibility is not by itself sufficient: \(x_0=C_w/D_w\) must be a positive odd integer, and all the stated \(a_i\) must be the exact valuations encountered along the resulting orbit. But (2) is the central global arithmetic requirement.

---

## 2. The \(abc\) hypothesis

Write
\[
\operatorname{rad}(n)=\prod_{p\mid n}p.
\]

We assume the usual quantitative \(abc\) conjecture:

> For every \(\varepsilon>0\), there is a constant \(K_\varepsilon>0\) such that whenever
> \[
> a+b=c,\qquad \gcd(a,b)=1,
> \]
> one has
> \[
> c\le K_\varepsilon
> \operatorname{rad}(abc)^{1+\varepsilon}.
> \tag{ABC}
> \]

This is the standard form used in the direct \(abc\)-Collatz literature. citeturn739949view0

For convenience define
\[
\kappa_\varepsilon
  =\frac{1}{6K_\varepsilon^{1/(1+\varepsilon)}}.
\]

---

# 3. Global power-gap theorem

## Theorem 2: \(abc\)-radical saturation of the cycle gap

Assume \(abc\). For every positive Collatz cycle,
\[
\boxed{
\operatorname{rad}(D)
\ge
\kappa_\varepsilon\,2^{A/(1+\varepsilon)}
}
\tag{3}
\]
for every \(\varepsilon>0\).

Consequently,
\[
\boxed{
D\ge
\kappa_\varepsilon\,2^{A/(1+\varepsilon)}.
}
\tag{4}
\]

### Proof

The gap equation is
\[
3^k+D=2^A.
\]
Because \(2^A\) is even and \(3^k\) is odd, \(D\) is odd. Moreover,
\[
D\equiv 2^A\not\equiv0\pmod 3.
\]
Hence
\[
\gcd(3^k,D)=1
\]
and the three numbers \(3^k,D,2^A\) are pairwise coprime.

Their radical is
\[
\operatorname{rad}(3^kD2^A)
 =6\operatorname{rad}(D).
\]
Applying \(abc\),
\[
2^A
 \le
K_\varepsilon
\bigl(6\operatorname{rad}(D)\bigr)^{1+\varepsilon}.
\]
Taking \((1+\varepsilon)\)-th roots gives
\[
\operatorname{rad}(D)
\ge
\frac{2^{A/(1+\varepsilon)}}
     {6K_\varepsilon^{1/(1+\varepsilon)}}
=
\kappa_\varepsilon 2^{A/(1+\varepsilon)}.
\]
Since \(\operatorname{rad}(D)\le D\), (4) follows. \(\square\)

---

## Corollary 3: logarithmic squarefreeness

Consider any sequence of hypothetical cycles for which \(A\to\infty\). Under \(abc\),
\[
\boxed{
\frac{\log D}{A\log2}\longrightarrow1,
\qquad
\frac{\log\operatorname{rad}(D)}{A\log2}\longrightarrow1.
}
\tag{5}
\]

Therefore
\[
\boxed{
\log\frac{D}{\operatorname{rad}(D)}=o(A),
}
\tag{6}
\]
or equivalently,
\[
\boxed{
\frac{D}{\operatorname{rad}(D)}=D^{o(1)}.
}
\tag{7}
\]

### Proof

The upper bounds
\[
\operatorname{rad}(D)\le D<2^A
\]
give limsup at most \(1\).

For every fixed \(\varepsilon>0\), Theorem 2 gives
\[
\frac{\log\operatorname{rad}(D)}{A\log2}
\ge
\frac1{1+\varepsilon}
+\frac{\log\kappa_\varepsilon}{A\log2}.
\]
Letting \(A\to\infty\) gives a lower limit at least \(1/(1+\varepsilon)\). Since \(\varepsilon\) is arbitrary, the lower limit is at least \(1\). This proves (5), and subtraction gives (6) and (7). \(\square\)

Thus repeated prime powers can account for only an \(o(1)\) proportion of the logarithmic size of \(D\).

---

# 4. Broad cycle families conditionally eliminated

## Corollary 4: fixed radical defect

Assume \(abc\). Fix \(\theta<1\). There are only finitely many cycle parameter pairs \((A,k)\) satisfying
\[
\boxed{\operatorname{rad}(2^A-3^k)\le(2^A-3^k)^\theta.}
\tag{8}
\]

Consequently, there are only finitely many Collatz cycles whose gap satisfies (8).

### Proof

Choose \(\varepsilon>0\) sufficiently small that
\[
\frac1{1+\varepsilon}>\theta.
\]
If (8) holds, Theorem 2 and \(D<2^A\) give
\[
\kappa_\varepsilon2^{A/(1+\varepsilon)}
\le
\operatorname{rad}(D)
\le
D^\theta
<
2^{\theta A}.
\]
Hence
\[
2^{A(1/(1+\varepsilon)-\theta)}
<
\kappa_\varepsilon^{-1}.
\]
The exponent in parentheses is positive, so \(A\) is bounded.

Since \(1\le k\le A\), only finitely many pairs \((A,k)\) remain. For each such pair there are only finitely many compositions
\[
A=a_0+\cdots+a_{k-1},\qquad a_i\ge1.
\]
Thus only finitely many valuation words and cycles remain. \(\square\)

This gives several concrete conditional exclusions.

### Perfect-power gaps

If
\[
D=z^q,\qquad q\ge2,
\]
then
\[
\operatorname{rad}(D)=\operatorname{rad}(z)\le z=D^{1/q}.
\]
Taking \(\theta=1/q<1\) shows:

\[
\boxed{\text{Under \(abc\), only finitely many cycles can have \(D\) a perfect power.}}
\]

### Gaps with substantial repeated-prime mass

For any fixed \(\eta>0\), only finitely many cycles can satisfy
\[
\frac{D}{\operatorname{rad}(D)}\ge D^\eta.
\]
Indeed, this inequality is equivalent to
\[
\operatorname{rad}(D)\le D^{1-\eta}.
\]

### Smooth gaps

Let \(P^+(D)\) denote the largest prime factor of \(D\). If
\[
P^+(D)=o(A)
\]
along a family, then the elementary Chebyshev estimate gives
\[
\log\operatorname{rad}(D)
\le
\sum_{p\le P^+(D)}\log p
=
O(P^+(D))
=
o(A),
\]
contradicting (5). Therefore:

\[
\boxed{
\text{An infinite family of \(abc\)-compatible cycles cannot have }
P^+(D)=o(A).
}
\]

So a hypothetical large cycle must have a power gap containing prime divisors on a scale at least linear in \(A\), and its repeated-prime portion must be subexponential in \(A\).

---

# 5. Bound for the minimum cycle element

Let
\[
M=\min_{0\le i<k}x_i.
\]
Set
\[
\Lambda=A\log2-k\log3>0.
\]
The product identity gives
\[
\Lambda
 =
\sum_{i=0}^{k-1}
\log\left(1+\frac1{3x_i}\right)
\le
\sum_{i=0}^{k-1}\frac1{3x_i}
\le
\frac{k}{3M}.
\tag{9}
\]

On the other hand,
\[
\frac{D}{2^A}
 =
1-\frac{3^k}{2^A}
 =
1-e^{-\Lambda}
\le
\Lambda.
\tag{10}
\]
Combining (9) and (10),
\[
M\le \frac{k2^A}{3D}.
\tag{11}
\]

Using Theorem 2:

## Corollary 5

Assume \(abc\). Every Collatz cycle satisfies
\[
\boxed{
M\le
\frac{k}{3\kappa_\varepsilon}
2^{A\varepsilon/(1+\varepsilon)}
}
\tag{12}
\]
for every \(\varepsilon>0\).

Thus, along any sequence of cycles with \(A\to\infty\),
\[
\boxed{M=2^{o(A)}.} \tag{13}
\]

This is a genuine conditional restriction, but it is not competitive with the strongest existing separation estimates for \(2^A\) and \(3^k\). Indeed, Theorem 2 gives only
\[
\Lambda
\ge
\frac{D}{2^A}
\ge
\kappa_\varepsilon
2^{-A\varepsilon/(1+\varepsilon)},
\tag{14}
\]
for each fixed \(\varepsilon\). Linear forms in logarithms for the fixed algebraic numbers \(2\) and \(3\) give polynomial, rather than exponentially small, lower bounds for the nonzero form \(A\log2-k\log3\). Hence the ordinary \(abc\) estimate is weaker than the Baker-type input already used in cycle work. citeturn629473view3turn653183view1

One cannot choose \(\varepsilon=\varepsilon(A)\to0\) in (14), because ordinary \(abc\) provides no uniform control over the dependence of \(K_\varepsilon\) on \(\varepsilon\).

---

# 6. \(abc\) applied to every affine prefix

The preceding argument used only \(A\) and \(k\). We now retain the partial carries and endpoints.

First note two elementary coprimality facts.

Every cycle element is coprime to \(3\), since
\[
2^{a_i}x_{i+1}=3x_i+1\equiv1\pmod3.
\]
Also, for \(r\ge1\), \(C_r\) is odd and not divisible by \(3\). Indeed,
\[
C_r
 =
3^{r-1}
+\sum_{t=1}^{r-1}3^{r-1-t}2^{A_t}
\]
is odd, and its final summand gives
\[
C_r\equiv2^{A_{r-1}}\not\equiv0\pmod3.
\]

For a fixed prefix length \(r\), let
\[
g_r=\gcd(x_0,x_r),
\qquad
u_r=\frac{x_0}{g_r},
\qquad
v_r=\frac{x_r}{g_r},
\qquad
c_r=\frac{C_r}{g_r}.
\]

From
\[
2^{A_r}x_r=3^r x_0+C_r
\]
one has
\[
\gcd(x_0,C_r)=\gcd(x_0,x_r)=g_r
\]
and, because \(3\nmid x_r\),
\[
\gcd(x_r,C_r)
 =
\gcd(x_r,3^r x_0)
 =
g_r.
\]
Therefore \(u_r,v_r,c_r\) are pairwise coprime.

Dividing the prefix equation by \(g_r\) gives the primitive relation
\[
\boxed{
3^r u_r+c_r=2^{A_r}v_r.
}
\tag{15}
\]

## Theorem 6: prefix radical theorem

Assume \(abc\). For every cycle, every rotation of the cycle, and every \(1\le r\le k\),
\[
\boxed{
\operatorname{rad}(u_rv_rc_r)
\ge
\kappa_\varepsilon
\bigl(2^{A_r}v_r\bigr)^{1/(1+\varepsilon)}.
}
\tag{16}
\]

### Proof

The three terms in (15) are pairwise coprime. Since \(u_r,v_r,c_r\) are odd and coprime to \(3\),
\[
\operatorname{rad}
\bigl(
3^ru_r\,
c_r\,
2^{A_r}v_r
\bigr)
=
6\operatorname{rad}(u_rv_rc_r).
\]
Applying \(abc\) to (15),
\[
2^{A_r}v_r
\le
K_\varepsilon
\bigl(
6\operatorname{rad}(u_rv_rc_r)
\bigr)^{1+\varepsilon}.
\]
Rearrangement gives (16). \(\square\)

At \(r=k\),
\[
g_k=x_0,\qquad u_k=v_k=1,\qquad c_k=D,
\]
so Theorem 6 specializes exactly to Theorem 2.

The prefix theorem conditionally eliminates any family possessing a prefix for which, for some fixed \(\theta<1\),
\[
\operatorname{rad}(u_rv_rc_r)
\le
\bigl(2^{A_r}v_r\bigr)^\theta
\]
while \(2^{A_r}v_r\to\infty\).

But the uncontrolled factors \(u_r\), \(v_r\), and \(c_r\) are precisely why this does not automatically yield a contradiction: all three can be nearly squarefree.

---

# 7. The partial-carry recurrence

The carry recursion itself gives a sequence of primitive \(abc\) equations:
\[
3C_r+2^{A_r}=C_{r+1}.
\tag{17}
\]
For \(r\ge1\),
\[
\gcd(C_r,2^{A_r})=1.
\]
Therefore:

## Corollary 7

Assume \(abc\). For every \(r\ge1\),
\[
\boxed{
\operatorname{rad}(C_rC_{r+1})
\ge
\kappa_\varepsilon
C_{r+1}^{1/(1+\varepsilon)}.
}
\tag{18}
\]

Thus two consecutive carries cannot simultaneously possess a fixed positive radical defect.

For example, for any \(\eta>0\), there are only finitely many instances with \(C_{r+1}\to\infty\) satisfying
\[
\operatorname{rad}(C_rC_{r+1})
\le C_{r+1}^{1-\eta}.
\]

Again, this is a necessary radical-richness condition, not a contradiction: consecutive carries are coprime,
\[
\gcd(C_r,C_{r+1})
 =
\gcd(C_r,2^{A_r})
 =
1,
\]
so they are particularly capable of acquiring new prime divisors.

---

# 8. Splitting the carry at an arbitrary cut

Fix \(1\le r<k\), and define the suffix carry
\[
S_r
 =
\sum_{t=r}^{k-1}
3^{k-1-t}2^{A_t-A_r}.
\]
Splitting the full sum at \(r\) gives
\[
\boxed{
C_k=3^{k-r}C_r+2^{A_r}S_r.
}
\tag{19}
\]

Both \(C_r\) and \(S_r\) are odd and coprime to \(3\). Put
\[
h_r=\gcd(C_r,S_r),
\qquad
P_r=\frac{C_r}{h_r},
\qquad
Q_r=\frac{S_r}{h_r},
\qquad
R_r=\frac{C_k}{h_r}.
\]
Then
\[
\boxed{
3^{k-r}P_r+2^{A_r}Q_r=R_r
}
\tag{20}
\]
is a primitive \(abc\) equation.

## Theorem 8: cut radical theorem

Assume \(abc\). Every cut of a Collatz cycle satisfies
\[
\boxed{
\operatorname{rad}(P_rQ_rR_r)
\ge
\kappa_\varepsilon
R_r^{1/(1+\varepsilon)}.
}
\tag{21}
\]

This is the precise result obtained by applying \(abc\) to the partial sums proposed in the approach.

It shows exactly what a successful partial-sum argument would have to establish independently: for at least one cut, the reduced prefix carry, reduced suffix carry, and reduced total carry would have to possess a uniform radical defect. No such defect follows merely from positivity, admissibility, or the affine recurrence.

In fact, partial-sum applications are formally weaker than the global application unless one obtains additional information. The global equation
\[
3^k+D=2^A
\]
has only the uncontrolled radical \(\operatorname{rad}(D)\). Equation (20) introduces the additional uncontrolled radicals of \(P_r\), \(Q_r\), and \(R_r\).

---

# 9. Why the word-dependent divisibility is invisible to ordinary \(abc\)

The global \(abc\) triple
\[
3^k+(2^A-3^k)=2^A
\]
depends only on the totals \(A\) and \(k\). It does not depend on the order of the valuations \(a_i\).

By contrast, the carry
\[
C_w
 =
\sum_{t=0}^{k-1}3^{k-1-t}2^{A_t}
\]
depends on every prefix sum \(A_t\). The cycle condition is
\[
D_w\mid C_w.
\]

A small example makes the distinction exact.

Take
\[
A=5,\qquad k=3.
\]
Then
\[
D=2^5-3^3=5,
\]
and the global equation is
\[
27+5=32,
\]
a perfectly ordinary \(abc\) triple.

The six compositions of \(5\) into three positive parts give the carries
\[
\begin{array}{c|c}
(a_0,a_1,a_2)&C_w\\ \hline
(1,1,3)&19\\
(1,2,2)&23\\
(1,3,1)&31\\
(2,1,2)&29\\
(2,2,1)&37\\
(3,1,1)&49.
\end{array}
\]
None is divisible by \(5\). Therefore no valuation word with \((A,k)=(5,3)\) gives a cycle, but the \(abc\) equation \(27+5=32\) has no way to detect this.

For
\[
A=4,\qquad k=2,
\]
one has
\[
D=16-9=7.
\]
The carries are
\[
5,\quad7,\quad11
\]
for the words
\[
(1,3),\quad(2,2),\quad(3,1),
\]
respectively. Only \((2,2)\) satisfies \(D\mid C_w\), and it gives \(x_0=1\), namely two traversals of the trivial odd fixed point.

More generally, the repeated word
\[
(2,2,\ldots,2)
\]
has
\[
A=2k,
\qquad
C_w=\sum_{t=0}^{k-1}3^{k-1-t}4^t
    =4^k-3^k
    =D_w,
\]
and always represents repeated traversal of \(x=1\). Thus there is an infinite family of exact closed-word equations fully compatible with \(abc\). Primitivity and the ordering of valuations must enter somewhere beyond the global power-gap equation.

---

# 10. The precise missing \(abc\)-assisted theorem

Define
\[
G_w=\gcd(D_w,C_w).
\]
For a genuine cycle,
\[
D_w\mid C_w,
\]
and therefore
\[
G_w=D_w.
\]

The natural missing statement is not another size estimate for \(D_w\), but a uniform estimate for the **common prime support** of \(D_w\) and \(C_w\).

## Radical gap–carry decorrelation hypothesis

There exist constants \(\delta>0\) and \(A_0\) such that every sufficiently long primitive, nontrivial admissible valuation word satisfies
\[
\boxed{
\operatorname{rad}\bigl(\gcd(D_w,C_w)\bigr)
\le
D_w^{1-\delta}.
}
\tag{RGD}
\]

This is weaker than demanding
\[
\gcd(D_w,C_w)<D_w,
\]
because it allows a large common divisor arising from high prime powers. It requires only that the *distinct* common primes fail to account for almost all of \(D_w\).

## Theorem 9: \(abc+\mathrm{RGD}\) gives a finite cycle theorem

Assume \(abc\) and \(\mathrm{RGD}\). Then only finitely many primitive nontrivial Collatz cycles exist.

### Proof

For a genuine cycle,
\[
G_w=D_w.
\]
Hence \(\mathrm{RGD}\) implies
\[
\operatorname{rad}(D_w)\le D_w^{1-\delta}<2^{(1-\delta)A}.
\]
Choose \(\varepsilon>0\) so that
\[
\frac1{1+\varepsilon}>1-\delta.
\]
By Theorem 2,
\[
\kappa_\varepsilon2^{A/(1+\varepsilon)}
\le
\operatorname{rad}(D_w)
<
2^{(1-\delta)A}.
\]
Thus
\[
2^{A(1/(1+\varepsilon)-(1-\delta))}
<
\kappa_\varepsilon^{-1}.
\]
The exponent is positive, so \(A\) is bounded. There are only finitely many corresponding valuation words. \(\square\)

An effective form of \(abc\), an effective version of \(\mathrm{RGD}\), and exhaustive checking of the resulting finite set would prove the cycle conjecture.

The congruence that such a decorrelation theorem must analyze is explicit. For every prime \(p\mid D_w\),
\[
2^A\equiv3^k\pmod p,
\]
while \(p\mid C_w\) means
\[
\sum_{t=0}^{k-1}
3^{k-1-t}2^{A_t}
\equiv0\pmod p.
\tag{22}
\]
Thus a cycle requires every prime divisor of the global power gap to support the word-dependent zero-sum congruence (22). Ordinary \(abc\) controls the combined size of these primes, but not whether they simultaneously divide the carry.

This radical gap–carry correlation is the genuinely new arithmetic debt exposed by the approach.

---

# 11. Relation to previous \(abc\)-Collatz work

Rozier proves, conditional on \(abc\), an exponential lower bound for starting integers of certain finite shortcut trajectories containing exactly one even term. That succeeds because the restricted parity pattern reduces to a controlled three-term equation. Rozier also points out that general Collatz iterate formulas contain an unbounded number of summands and concludes that ordinary \(abc\) is unlikely by itself to settle the conjecture. citeturn456156view2turn456156view3

Kaneda previously formulated the cycle question as the divisibility of an affine carry by \(2^A-3^k\) and reports attempting an \(n\)-term generalization of \(abc\) without obtaining the required conclusion. citeturn456156view0turn456156view1

The present calculation identifies why those attempts stop:

\[
\boxed{
abc\text{ forces }D_w\text{ to be radical-rich, but a cycle requires }
D_w\mid C_w.
}
\]

There is no contradiction unless one also proves that the prime support of \(D_w\) cannot be almost entirely reproduced inside the sparse affine carry \(C_w\).

---

# 12. Why this still would not prove the full Collatz conjecture

Even a complete elimination of nontrivial cycles proves only the **cycle conjecture** or weak Collatz conjecture.

A Collatz counterexample could instead have an unbounded, nonperiodic orbit. Cycle equations do not apply to such an orbit. Hercher explicitly separates these two possible failure modes: a nontrivial cycle and an unbounded trajectory. citeturn112389view1

The prefix estimate (16) does not rule out divergence because a divergent orbit may continually produce new, nearly squarefree endpoints and carries. Ordinary \(abc\) is entirely compatible with that behavior.

A complete conditional proof along this route would therefore require:

\[
\begin{aligned}
&\text{(i) a radical gap–carry decorrelation theorem such as \(\mathrm{RGD}\),}\\
&\text{(ii) an effective finite exclusion of the remaining cycles,}\\
&\text{(iii) a separate theorem that every positive orbit is bounded.}
\end{aligned}
\]

Once (ii) establishes that the only cycle is the trivial one and (iii) establishes boundedness, every orbit takes values in a finite set, hence eventually repeats, hence enters the trivial cycle. That would prove Collatz.

---

# Final status

The ordinary \(abc\) conjecture yields the following rigorous conditional conclusions:

\[
\operatorname{rad}(2^A-3^k)
 \ge
\kappa_\varepsilon2^{A/(1+\varepsilon)},
\]
\[
\frac{2^A-3^k}
     {\operatorname{rad}(2^A-3^k)}
=
(2^A-3^k)^{o(1)},
\]
\[
\min_i x_i=2^{o(A)},
\]
and every reduced affine prefix, consecutive carry pair, and prefix–suffix cut must be similarly radical-rich.

It conditionally eliminates:

- perfect-power power gaps;
- gaps with a fixed positive repeated-prime proportion;
- gaps built only from primes \(o(A)\);
- prefixes or cuts with a uniform positive radical defect.

But it does **not** establish
\[
2^A-3^k\nmid C_w
\]
for every primitive nontrivial word. The narrowest missing arithmetic statement is a uniform radical decorrelation estimate between the power gap \(D_w\) and the affine carry \(C_w\). Even after that cycle problem is closed, a separate nonescape theorem is required for the full Collatz conjecture.

Accordingly, approach 89 produces a rigorous and reasonably sharp **conditional cycle-family exclusion theorem**, but not a complete proof of Collatz from standard \(abc\) alone.