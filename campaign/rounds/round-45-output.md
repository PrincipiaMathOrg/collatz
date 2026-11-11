model: GPT-5.6 Pro (Chat mode)
round: 45 -- approach 40, Mahler-function transcendence of parity series
front: proof
sent: 2026-08-15T05:31Z
worked: 65m 55s

---
# Result of the Mahler-function approach

Carrying the proposal through produces a sharp analytic classification of Collatz orbits, but it does **not** furnish a full proof. The missing implication is:

\[
\text{“the seed is a positive integer”}
\quad\Longrightarrow\quad
\text{“its parity/carry series satisfies a finite Mahler equation.”}
\]

That implication does not follow from the Collatz recursion. In fact, in the precise formulation below, it is equivalent to excluding divergent orbits. A second, independent obstruction remains because a hypothetical nontrivial cycle would give a perfectly rational—and hence Mahler—series.

The current literature still treats Collatz as unproved; for example, a February 2026 verification paper explicitly describes a proof as out of reach with current methods. citeturn924229view4

What follows is the strongest rigorous theorem yielded by the proposed approach.

---

## 1. Two orbit series

Use the shortcut Collatz map

\[
T(x)=
\begin{cases}
x/2,&x\equiv0\pmod2,\\[2mm]
(3x+1)/2,&x\equiv1\pmod2.
\end{cases}
\]

For a fixed \(n\geq1\), write

\[
x_j=T^j(n),\qquad
\varepsilon_j=x_j\bmod2\in\{0,1\},\qquad
s_j=\sum_{i=0}^{j-1}\varepsilon_i ,
\]

where \(s_0=0\). Then

\[
2x_{j+1}=3^{\varepsilon_j}x_j+\varepsilon_j.
\tag{1}
\]

The ordinary parity series is

\[
F_n(z)=\sum_{j\geq0}\varepsilon_jz^j.
\tag{2}
\]

The more useful carry-weighted series is

\[
G_n(z)=\sum_{j\geq0}
\frac{\varepsilon_j}{3^{s_{j+1}}}z^j.
\tag{3}
\]

If \(d_m\) is the position of the \((m+1)\)-st odd term, then

\[
G_n(z)=\sum_{m\geq0}\frac{z^{d_m}}{3^{m+1}}.
\tag{4}
\]

Thus its support is the parity word, while its nonzero coefficients successively equal

\[
\frac13,\frac1{3^2},\frac1{3^3},\ldots.
\]

### Exact inverse identity

Define

\[
h_k=\frac{2^kx_k}{3^{s_k}}.
\]

Equation (1) gives

\[
h_{j+1}
=h_j+\varepsilon_j\frac{2^j}{3^{s_{j+1}}},
\]

and hence

\[
\boxed{
\frac{2^kx_k}{3^{s_k}}
=
n+\sum_{j=0}^{k-1}
\varepsilon_j\frac{2^j}{3^{s_{j+1}}}.
}
\tag{5}
\]

In \(\mathbb Q_2\), the left side tends to \(0\), because its 2-adic valuation is at least \(k\). Therefore

\[
\boxed{
G_n(2)=-n\qquad\text{in }\mathbb Q_2.
}
\tag{6}
\]

This is the standard inverse parity transform: every infinite binary word is the parity sequence of exactly one 2-adic seed, and finite words determine one residue class modulo the corresponding power of \(2\). citeturn788726view1turn788726view3

The analogous unweighted identity is

\[
F_n(2)=Q(n):=\sum_{j\geq0}\varepsilon_j2^j
\qquad\text{in }\mathbb Z_2.
\tag{7}
\]

---

## 2. The functional equations are shift equations

The parity series satisfies

\[
\boxed{
F_n(z)=\varepsilon_0+zF_{T(n)}(z).
}
\tag{8}
\]

For the weighted series,

\[
\boxed{
G_n(z)
=
\frac{\varepsilon_0}{3}
+
z\,3^{-\varepsilon_0}G_{T(n)}(z).
}
\tag{9}
\]

Thus

\[
G_n(z)=
\begin{cases}
zG_{T(n)}(z),&n\text{ even},\\[2mm]
\dfrac13+\dfrac z3G_{T(n)}(z),&n\text{ odd}.
\end{cases}
\]

After \(k\) steps,

\[
\boxed{
G_n(z)
=
\sum_{j=0}^{k-1}
\frac{\varepsilon_j}{3^{s_{j+1}}}z^j
+
z^k3^{-s_k}G_{x_k}(z).
}
\tag{10}
\]

This is not a Mahler equation. A \(q\)-Mahler equation relates one fixed function at dilated arguments,

\[
A_0(z)f(z)+A_1(z)f(z^q)+\cdots+A_d(z)f(z^{q^d})=0.
\tag{11}
\]

Equations (8)–(10) instead relate \(F_n\) or \(G_n\) to a new tail function belonging to the next state of the orbit.

---

# 3. The analytic rigidity theorem

Let \(R_n\) denote the complex radius of convergence of \(G_n\).

## Theorem

For every positive integer \(n\), the following conditions are equivalent:

\[
\begin{aligned}
&\text{the orbit of }n\text{ is eventually periodic};\\
&F_n(z)\text{ is rational};\\
&G_n(z)\text{ is rational};\\
&G_n(z)\text{ is algebraic over }\mathbb C(z);\\
&G_n(z)\text{ is D-finite};\\
&G_n(z)\text{ is }q\text{-Mahler for at least one }q\geq2;\\
&R_n<2.
\end{aligned}
\tag{12}
\]

In the Mahler condition, “at least one \(q\)” can equivalently be replaced by “every \(q\geq2\).”

Moreover:

\[
\boxed{
R_n=
\begin{cases}
\sqrt3,
&\text{if the orbit reaches }1,\\[1mm]
\text{a number in }(\sqrt3,2),
&\text{if it reaches a nontrivial positive cycle},\\[1mm]
\text{a number in }[2,3],
&\text{if the orbit is nonperiodic}.
\end{cases}}
\tag{13}
\]

Consequently,

\[
\boxed{
n\text{ satisfies Collatz}
\quad\Longleftrightarrow\quad
R_n=\sqrt3.
}
\tag{14}
\]

### Proof

#### Eventual periodicity and \(F_n\)

If the orbit is eventually periodic, then its parity sequence is eventually periodic, so \(F_n\) is a polynomial plus a periodic geometric tail and is rational.

Conversely, suppose \(F_n\) is rational. Its coefficient sequence satisfies a constant-coefficient linear recurrence from some point onward. Since every coefficient belongs to the finite set \(\{0,1\}\), the finite recurrence-state vector must eventually repeat. Hence \((\varepsilon_j)\) is eventually periodic.

If the parity tail has period \(p\), then \(x_N\) and \(x_{N+p}\) have the same infinite parity sequence. The 2-adic parity transform is injective, so \(x_N=x_{N+p}\). Thus the orbit itself is eventually periodic.

#### Eventual periodicity implies rationality of \(G_n\)

Suppose the eventual parity period has length \(p\) and contains \(r\) ones. Then, sufficiently far along the sequence,

\[
\varepsilon_{j+p}=\varepsilon_j,
\qquad
s_{j+p+1}=s_{j+1}+r,
\]

so the coefficients \(a_j=[z^j]G_n\) satisfy

\[
a_{j+p}=3^{-r}a_j.
\tag{15}
\]

Therefore the tail of \(G_n\) has denominator

\[
1-\frac{z^p}{3^r},
\]

and \(G_n\) is rational.

Conversely, if \(G_n\) is rational, its coefficients satisfy a linear recurrence. By the Skolem–Mahler–Lech theorem, their zero set is, up to finitely many exceptions, a finite union of arithmetic progressions. citeturn268785search1 Since

\[
[z^j]G_n=0\quad\Longleftrightarrow\quad\varepsilon_j=0,
\]

the parity sequence is eventually periodic.

#### Algebraic and D-finite rigidity

Every algebraic power series is D-finite. Conversely, the coefficients of \(G_n\) lie in

\[
\{0\}\cup\{3^{-m}:m\geq1\},
\]

which is contained in the finitely generated multiplicative group
\(\langle 1/3\rangle\), together with zero. A theorem extending work of Bézivin states that a D-finite power series in characteristic zero whose coefficients lie in a finitely generated multiplicative group, together with zero, must be rational. citeturn924229view1

Hence

\[
G_n\text{ algebraic}
\Longleftrightarrow
G_n\text{ D-finite}
\Longleftrightarrow
G_n\text{ rational}.
\tag{16}
\]

#### The radius in the nonperiodic case

Assume the orbit is not eventually periodic. It cannot visit a bounded set infinitely often, since some state would repeat. Hence

\[
x_j\longrightarrow\infty.
\tag{17}
\]

Taking logarithms in (1) gives

\[
\log x_k-\log n
=
s_k\log3-k\log2+
\sum_{\substack{0\leq j<k\\\varepsilon_j=1}}
\log\left(1+\frac1{3x_j}\right).
\tag{18}
\]

Because \(x_j\to\infty\), the summands in the final sum tend to zero, so that sum is \(o(k)\). Since \(\log x_k\geq0\),

\[
\liminf_{k\to\infty}\frac{s_k}{k}
\geq
\frac{\log2}{\log3}.
\tag{19}
\]

For every nonzero coefficient of \(G_n\),

\[
\left|
\frac{\varepsilon_j}{3^{s_{j+1}}}
\right|^{1/j}
=
3^{-s_{j+1}/j}.
\]

Equation (19) therefore gives

\[
\limsup_{j\to\infty}|[z^j]G_n|^{1/j}
\leq\frac12,
\]

and hence

\[
R_n\geq2.
\tag{20}
\]

There are infinitely many odd terms in a positive orbit: an eventually all-even positive integer would have to be divisible by arbitrarily high powers of \(2\). Also \(s_{j+1}\leq j+1\), so along the nonzero coefficients

\[
|[z^j]G_n|^{1/j}
\geq3^{-(j+1)/j}.
\]

Thus

\[
R_n\leq3.
\tag{21}
\]

This proves \(R_n\in[2,3]\) for every nonperiodic positive orbit.

#### The radius in the periodic case

If the cycle has period \(p\) and \(r\) odd entries, equation (15) gives

\[
R_n=3^{r/p}.
\tag{22}
\]

For a point \(x\) on the cycle, equation (5) over one period gives

\[
\frac{2^px}{3^r}
=
x+
\sum_{j=0}^{p-1}
\varepsilon_j\frac{2^j}{3^{s_{j+1}}}
>x.
\]

Hence

\[
3^r<2^p,
\qquad
\frac rp<\frac{\log2}{\log3},
\qquad
R_n<2.
\tag{23}
\]

For the trivial cycle \(1\leftrightarrow2\), \(p=2,r=1\), so

\[
R_n=3^{1/2}=\sqrt3.
\]

Now consider a nontrivial positive cycle. Every member is greater than \(1\). At an odd step,

\[
\frac{x_{j+1}}{x_j}
=
\frac{3x_j+1}{2x_j}
<2,
\]

whereas an even step has ratio \(1/2\). Multiplying these ratios around the cycle gives

\[
1
<
2^r\left(\frac12\right)^{p-r}
=
2^{2r-p}.
\]

Therefore

\[
r>\frac p2.
\tag{24}
\]

Combining (23) and (24),

\[
\frac12<\frac rp<\frac{\log2}{\log3},
\]

and consequently

\[
\sqrt3<R_n<2.
\tag{25}
\]

This proves the three-way radius classification (13).

#### Mahler rigidity

Every rational function is \(q\)-Mahler for every \(q\geq2\).

Conversely, suppose \(G_n\) is \(q\)-Mahler. We have just shown that every positive-orbit \(G_n\) has radius strictly greater than \(1\). A theorem of Bell, Coons and Rowland states that a nonrational \(q\)-Mahler function has the unit circle as a natural boundary. citeturn924229view0 But \(G_n\) is holomorphic in a disk larger than the unit disk. Therefore it cannot be a nonrational Mahler function, and so it is rational.

This completes the proof of the theorem. ∎

---

## 4. What happens to the direct parity series

For a nonperiodic positive orbit, \(F_n\) has infinitely many coefficients equal to \(1\), so its radius is exactly \(1\). It is not rational, because its coefficient sequence is not eventually periodic.

The Pólya–Carlson theorem now gives

\[
\boxed{
\text{if the orbit is nonperiodic, then }|z|=1
\text{ is a natural boundary for }F_n.
}
\tag{26}
\]

The theorem states that an integer-coefficient power series of radius \(1\) is rational or has the unit circle as a natural boundary. citeturn268785search0 Thus a divergent counterexample would indeed force \(F_n\) to be transcendental and non-D-finite.

This establishes the “highly transcendental” half of the proposed strategy.

It does **not** produce a contradiction. Nonrational Mahler series with natural boundaries exist. The elementary example

\[
L(z)=\sum_{m\geq0}z^{2^m}
\]

satisfies the genuine Mahler equation

\[
L(z)=z+L(z^2),
\]

yet is nonrational and has the unit circle as a natural boundary.

More importantly, a nontrivial-cycle counterexample would have an eventually periodic parity sequence, so both \(F_n\) and \(G_n\) would be rational. A transcendence argument cannot exclude that kind of counterexample.

---

# 5. An exact generating-function formulation of Collatz

The two members of the trivial cycle have weighted series

\[
G_1(z)
=
\frac13+\frac{z^2}{3^2}+\frac{z^4}{3^3}+\cdots
=
\frac1{3-z^2},
\tag{27}
\]

and

\[
G_2(z)=\frac z{3-z^2}.
\tag{28}
\]

Therefore:

## Exact criterion

For every \(n\geq1\),

\[
\boxed{
n\text{ reaches }1
\quad\Longleftrightarrow\quad
(3-z^2)G_n(z)\in\mathbb Q[z].
}
\tag{29}
\]

### Proof

If \(x_N\in\{1,2\}\), equation (10) expresses \(G_n\) as a polynomial plus a rational multiple of either \(z^NG_1\) or \(z^NG_2\). Multiplication by \(3-z^2\) therefore gives a polynomial.

Conversely, suppose \((3-z^2)G_n\) is a polynomial. Writing \(a_j=[z^j]G_n\), we have, for all sufficiently large \(j\),

\[
3a_j=a_{j-2}.
\tag{30}
\]

Hence

\[
a_j=0\quad\Longleftrightarrow\quad a_{j-2}=0,
\]

so the parity support is eventually periodic with period \(2\).

It cannot be eventually \(00\,00\,00\cdots\), since a positive integer cannot remain even forever. It also cannot be eventually \(11\,11\,11\cdots\): in that case

\[
\frac{a_j}{a_{j-2}}
=
3^{-(s_{j+1}-s_{j-1})}
=
\frac1{9},
\]

contradicting (30), which requires the ratio \(1/3\).

Thus the tail must alternate:

\[
10\,10\,10\cdots
\quad\text{or}\quad
01\,01\,01\cdots.
\]

The unique positive 2-adic states with those parity tails are \(1\) and \(2\). Equivalently, if the alternating tail begins at an odd \(x\), then

\[
T^2(x)=\frac{3x+1}{4}=x,
\]

so \(x=1\); if it begins at an even \(x\), then

\[
T^2(x)=\frac{3x+2}{4}=x,
\]

so \(x=2\). Therefore the orbit reaches the trivial cycle. ∎

There is a corresponding unweighted criterion:

\[
\boxed{
n\text{ reaches }1
\quad\Longleftrightarrow\quad
(1-z^2)F_n(z)\in\mathbb Z[z].
}
\tag{31}
\]

These are exact reformulations, not proofs that the displayed polynomial conditions always hold.

---

# 6. Why the recursion does not supply a Mahler equation

## 6.1 Finite closure is equivalent to periodicity

Equations (8) and (9) produce the tail family

\[
F_n,F_{x_1},F_{x_2},\ldots
\]

or

\[
G_n,G_{x_1},G_{x_2},\ldots.
\]

If two tail functions coincide, their parity supports coincide. The inverse parity transform is injective, so the corresponding states coincide. Therefore

\[
\{G_{x_j}:j\geq0\}\text{ is finite}
\quad\Longleftrightarrow\quad
(x_j)\text{ is eventually periodic}.
\tag{32}
\]

Thus eliminating the tail functions to obtain a finite functional system works precisely when the orbit already repeats.

## 6.2 No universal Mahler equation can come from local recursion

Fix \(q\geq2\). Suppose polynomials independent of the seed satisfied

\[
\sum_{i=0}^d A_i(z)F_n(z^{q^i})=B(z)
\tag{33}
\]

for every positive integer \(n\).

Every finite binary word is the initial parity word of some positive integer—indeed, of one residue class modulo the appropriate power of \(2\). citeturn788726view1 The coefficient of \(z^M\) in (33) depends on only finitely many parity bits. Consequently, (33) would have to hold for every infinite binary sequence.

Taking the all-zero sequence gives \(B=0\). Taking the sequence with a single \(1\) at position \(r\) gives

\[
\sum_{i=0}^d A_i(z)z^{rq^i}=0
\tag{34}
\]

for every \(r\). For sufficiently large \(r\), the polynomial supports of the terms in (34) are disjoint. Hence every \(A_i\) is zero.

The same argument applies to \(G_n\), since a word containing a single \(1\) at position \(r\) gives \(G(z)=z^r/3\).

Therefore no fixed, nontrivial, finite Mahler equation can be derived solely from the local Collatz rules and hold uniformly for all seeds.

---

# 7. There is a genuine Mahler function—but in the wrong variable

Let

\[
Q(x)=\sum_{j\geq0}\varepsilon_j(x)2^j
\]

be the parity-coordinate map, and let

\[
\Phi=Q^{-1}.
\]

The inverse map satisfies

\[
\Phi(2m)=2\Phi(m),
\qquad
\Phi(2m+1)=\frac{2\Phi(m)-1}{3}.
\tag{35}
\]

These are established functional equations for the 2-adic conjugacy. citeturn788726view3

For ordinary nonnegative integers \(m\), put

\[
b_m=\Phi(m),
\qquad
B(z)=\sum_{m\geq0}b_mz^m.
\]

Splitting the sum into even and odd indices gives

\[
\begin{aligned}
B(z)
&=
\sum_{m\geq0}2b_mz^{2m}
+
\sum_{m\geq0}\frac{2b_m-1}{3}z^{2m+1}\\
&=
\boxed{
\frac{2(3+z)}3B(z^2)
-\frac{z}{3(1-z^2)}.
}
\tag{36}
\end{aligned}
\]

This is a genuine inhomogeneous 2-Mahler equation.

Unfortunately, a Collatz seed is not obtained by evaluating \(B\) at a fixed algebraic argument.

Let

\[
q_k=\sum_{j=0}^{k-1}\varepsilon_j2^j,
\]

the integer represented by the first \(k\) parity bits. Then

\[
b_{q_k}
=
-\sum_{j=0}^{k-1}
\varepsilon_j\frac{2^j}{3^{s_{j+1}}},
\]

so (5) becomes

\[
\boxed{
n-b_{q_k}
=
\frac{2^kx_k}{3^{s_k}}.
}
\tag{37}
\]

Thus

\[
b_{q_k}\longrightarrow n
\qquad\text{2-adically}.
\tag{38}
\]

The seed is therefore a limit of **coefficients of \(B\) sampled along a variable, parity-dependent sequence of indices**. Mahler’s method controls functional values such as \(B(\alpha)\) and finite-dimensional Mahler systems. It does not convert an arbitrary nested coefficient path

\[
q_0,q_1,q_2,\ldots
\]

into an algebraic-value problem. That coefficient path contains exactly the original Collatz parity information.

---

# 8. Using both dilations \(2\) and \(3\) does not close the argument

For a nonperiodic orbit, all \(x_j\) are distinct. Consider its orbit-set series

\[
A_n(z)=\sum_{j\geq0}z^{x_j}.
\]

Splitting the orbit states into even and odd ones yields

\[
\boxed{
2A_n(z^2)-A_n(z)-A_n(-z)
-zA_n(z^3)+zA_n(-z^3)
=
2z^{2n}.
}
\tag{39}
\]

This genuinely contains the two multiplicatively independent dilations \(z\mapsto z^2\) and \(z\mapsto z^3\).

However, it is one **mixed** equation, not separate 2-Mahler and 3-Mahler equations. The theorem of Adamczewski and Bell says that a power series which is separately \(2\)-Mahler and \(3\)-Mahler must be rational. citeturn924229view2 It does not apply to (39).

A simple counterexample demonstrates the distinction. Let

\[
H(z)=\sum_{a,b\geq0}z^{2^a3^b}.
\]

Then

\[
\boxed{
H(z)=z+H(z^2)+H(z^3)-H(z^6).
}
\tag{40}
\]

Its coefficients belong to \(\{0,1\}\), and it is nonrational because the infinite set of \(3\)-smooth exponents is not eventually periodic. Thus a mixed \(2/3\)-dilation identity can coexist with a nonrational series.

---

# 9. The exact stopping point

The Mahler-parity program proves the following complete conditional statement:

\[
\boxed{
\bigl[\text{for every }n,\ G_n
\text{ is }q\text{-Mahler}\bigr]
\iff
\bigl[\text{every positive Collatz orbit is eventually periodic}\bigr].
}
\tag{41}
\]

It also proves

\[
\boxed{
\text{Collatz}
\iff
\bigl[(3-z^2)G_n(z)\in\mathbb Q[z]
\text{ for every }n\geq1\bigr]
\iff
\bigl[R_n=\sqrt3
\text{ for every }n\geq1\bigr].
}
\tag{42}
\]

For a hypothetical divergent orbit:

\[
F_n\text{ has the unit circle as a natural boundary},
\]

while

\[
G_n\text{ has }R_n\geq2
\text{ and is transcendental, non-D-finite, and non-Mahler}.
\]

For a hypothetical nontrivial positive cycle:

\[
F_n,G_n\text{ are rational and Mahler},
\qquad
\sqrt3<R_n<2.
\]

So the proposed contradiction cannot cover both counterexample mechanisms:

1. **Divergence** would have to be excluded by proving a new Mahler or D-finite regularity theorem for \(G_n\). By (12), that theorem would already imply eventual periodicity.

2. **Nontrivial cycles** lie entirely inside the rational/Mahler class and require a separate pole- or denominator-exclusion argument.

Finally, because \(F_n(2)=Q(n)\) in \(\mathbb Z_2\), deriving rationality of \(F_n\) merely from \(n\in\mathbb Z_{>0}\) is precisely the assertion that \(Q(n)\) is a rational 2-adic number. This is the positive-integer part of Lagarias’ Periodicity Conjecture; full Collatz requires the stronger assertion that the eventual period is specifically the alternating \(1,0\) tail. These equivalences are explicitly recorded in the literature on the 2-adic parity conjugacy. citeturn788726view2turn788726view3

Therefore, the Mahler-function approach yields a rigorous and unusually clean analytic reformulation—especially the radius trichotomy (13)—but the hoped-for algebraicity implication is not supplied by the recursion. As stated, inserting it would be circular rather than a completed proof.