model: GPT-5.6 Pro (Chat mode)
round: 49 -- approach 44, Schmidt-game avoidance in Z_2
front: proof
sent: 2026-08-15T14:04:39Z
worked: 36m 58s

---

# Verdict

After formalizing the proposal, it does **not** produce a full proof of Collatz. Instead, it yields a fairly sharp no-go theorem for this route:

1. The natural nonnegative-drift set is winning for some fixed Schmidt parameters and losing for others; neither it nor its complement is Schmidt-winning in the usual uniform sense.
2. A winning strategy produces or avoids a **game outcome**. It does not prove a universal statement about the countable dense set of parity codes arising from positive integers.
3. Every positive cycle—including a hypothetical nontrivial one—has strictly **negative** asymptotic multiplicative drift. Thus the drift set detects divergent orbits but is completely blind to the cycle half of Collatz.

The useful outcome is an exact classification of the game and a precise identification of the missing arithmetic ingredient.

---

## 1. The exact 2-adic critical set

Use the shortcut Collatz map

\[
T(x)=
\begin{cases}
x/2,&x\equiv0\pmod 2,\\[2mm]
(3x+1)/2,&x\equiv1\pmod2.
\end{cases}
\]

For \(x\in\mathbb Z_2\), put

\[
\varepsilon_j(x)=T^j(x)\pmod2,\qquad
s_k(x)=\sum_{j=0}^{k-1}\varepsilon_j(x).
\]

The parity-code map is

\[
Q(x)=\sum_{j=0}^{\infty}\varepsilon_j(x)2^j.
\]

It is a bijective 2-adic isometry and conjugates \(T\) to the one-sided binary shift. Moreover, a length-\(k\) parity word determines exactly one residue class modulo \(2^k\). citeturn557195view2

Set

\[
\theta=\frac{\log 2}{\log 3}
      =0.6309297535\ldots
\]

and define the drift-critical set in parity space by

\[
\mathcal D
=
\left\{
y=\sum_{j\ge0}\varepsilon_j2^j:
\liminf_{k\to\infty}\frac{s_k}{k}\ge\theta
\right\}.
\]

Equivalently,

\[
\mathcal D
=
\left\{
y:
\liminf_{k\to\infty}
\frac{s_k\log3-k\log2}{k}\ge0
\right\}.
\]

This normalized lower drift is the correct pure-parity condition forced by divergence.

---

## 2. Divergent orbits are exactly the positive-integer points in \(\mathcal D\)

Let \(n\) be a positive integer and \(x_j=T^j(n)\). At each step,

\[
\log x_{j+1}-\log x_j
=
\varepsilon_j\log3-\log2
+
\varepsilon_j\log\left(1+\frac1{3x_j}\right).
\]

Summing gives

\[
\log x_k-\log n
=
s_k\log3-k\log2+E_k,
\tag{1}
\]

where

\[
E_k=
\sum_{\substack{0\le j<k\\ \varepsilon_j=1}}
\log\left(1+\frac1{3x_j}\right)\ge0.
\]

### Proposition 1

If the orbit of \(n\) is nonperiodic, then \(x_j\to\infty\), and consequently

\[
Q(n)\in\mathcal D.
\]

### Proof

A nonperiodic orbit contains no repeated value. Since only finitely many positive integers lie below any fixed bound, it eventually leaves every bounded set. Hence \(x_j\to\infty\).

The summands defining \(E_k\) therefore tend to zero, so by Cesàro averaging,

\[
\frac{E_k}{k}\longrightarrow0.
\]

From (1),

\[
\frac{s_k\log3-k\log2}{k}
=
\frac{\log x_k-\log n-E_k}{k}.
\]

Because \(x_k\ge1\),

\[
\liminf_{k\to\infty}
\frac{s_k\log3-k\log2}{k}\ge0.
\]

Thus \(Q(n)\in\mathcal D\). ∎

Now suppose \(n\) belongs to a positive cycle of period \(p\), containing \(s\) odd steps. Applying (1) over one period gives

\[
0=s\log3-p\log2+E_p.
\]

Every positive cycle has an odd step, so \(E_p>0\). Therefore

\[
s\log3-p\log2<0,
\qquad
\frac{s}{p}<\theta.
\tag{2}
\]

Thus **no positive periodic orbit belongs to \(\mathcal D\)**.

Let

\[
P=Q(\mathbb N_{>0})\subset\mathbb Z_2.
\]

We have proved the exact equivalence

\[
\boxed{
P\cap\mathcal D=\varnothing
\quad\Longleftrightarrow\quad
\text{there is no divergent positive Collatz orbit}.
}
\tag{3}
\]

So the proposed drift set captures the divergent-orbits conjecture exactly. It does **not** capture the nontrivial-cycles conjecture.

---

## 3. Size of the critical set

Write

\[
H_2(t)=-t\log_2t-(1-t)\log_2(1-t).
\]

### Theorem 2

The set \(\mathcal D\) has the following properties:

\[
\mu(\mathcal D)=0,
\]

\[
\dim_{\mathrm H}\mathcal D
=
H_2(\theta)
=
0.9499555271\ldots,
\]

and

\[
\overline{\mathcal D}
=
\overline{\mathcal D^{\,c}}
=
\mathbb Z_2.
\]

It is also meagre.

### Proof of density

Every finite binary word can be followed by an all-ones tail, producing a point of \(\mathcal D\). It can also be followed by an all-zeros tail, producing a point of \(\mathcal D^c\). Therefore both sets meet every cylinder.

In particular, although \(\mathcal D\) is shift-invariant, it is not a closed subshift: its closure is the full binary shift.

### Proof of Haar nullity

Under Haar measure on \(\mathbb Z_2\), the binary digits are independent fair bits, so almost surely

\[
\frac{s_k}{k}\longrightarrow\frac12<\theta.
\]

Hence \(\mu(\mathcal D)=0\).

### Proof of the dimension formula

Fix \(\delta>0\). A point of \(\mathcal D\) eventually has

\[
s_k\ge(\theta-\delta)k.
\]

The number of length-\(k\) words with at least \((\theta-\delta)k\) ones is

\[
2^{\,kH_2(\theta-\delta)+o(k)}.
\]

Since a length-\(k\) cylinder has diameter \(2^{-k}\),

\[
\dim_{\mathrm H}\mathcal D
\le H_2(\theta-\delta).
\]

Letting \(\delta\downarrow0\) gives the upper bound \(H_2(\theta)\).

For the reverse inequality, put Bernoulli measure of weight \(\theta\) on the digits. Almost every sequence then has limiting one-frequency \(\theta\), and its local dimension is

\[
-\theta\log_2\theta-(1-\theta)\log_2(1-\theta)
=H_2(\theta).
\]

The mass-distribution principle gives the lower bound. ∎

Thus the critical set is probabilistically negligible but has only about

\[
1-H_2(\theta)=0.0500444728\ldots
\]

of Hausdorff codimension.

At depth \(k\), there are roughly

\[
2^{0.9499555\,k}
\]

critical-looking words. This explains why long finite growth-compatible prefixes are abundant without implying that one fixed positive integer realizes an infinite one.

---

## 4. Exact Schmidt-game classification

On \(\mathbb Z_2\), balls are binary cylinders. It is therefore natural first to use dyadic Schmidt parameters.

In the game \(G(a,b)\):

- Alice appends \(a\) binary digits on each turn.
- Bob then appends \(b\) binary digits.
- Their nested cylinders determine one infinite sequence.

Recent work on ordinary real binary expansions also finds parameter-dependent winning and losing regions for digit-frequency targets. In the ultrametric setting, the cylinder structure makes the classification exact. citeturn444467view0turn444467view1

### Theorem 3

For positive integers \(a,b\),

\[
\boxed{
\mathcal D\text{ is Alice-winning in }G(a,b)
\iff
\frac{a}{a+b}\ge\theta.
}
\tag{4}
\]

Moreover,

\[
\boxed{
\mathcal D^c\text{ is Alice-winning in }G(a,b)
\iff
\frac{b}{a+b}<\theta.
}
\tag{5}
\]

### Proof

Suppose first that

\[
\frac{a}{a+b}\ge\theta.
\]

Alice writes \(1\) in all of her positions. Whatever Bob does, after \(N\) complete rounds at least \(aN\) among approximately \((a+b)N\) digits are ones. The finitely many fluctuations within a block disappear asymptotically, so

\[
\liminf\frac{s_k}{k}\ge\frac{a}{a+b}\ge\theta.
\]

Hence Alice forces \(\mathcal D\).

Conversely, if

\[
\frac{a}{a+b}<\theta,
\]

Bob writes \(0\) in all his positions. Even if every Alice digit is \(1\),

\[
\limsup\frac{s_k}{k}
\le\frac{a}{a+b}<\theta.
\]

Thus Bob prevents \(\mathcal D\). This proves (4).

For (5), Alice writes only zeros. Even if Bob writes only ones,

\[
\limsup\frac{s_k}{k}\le\frac{b}{a+b}.
\]

She therefore forces \(\mathcal D^c\) when this number is strictly below \(\theta\).

Conversely, if

\[
\frac{b}{a+b}\ge\theta,
\]

Bob writes only ones. Alice's positions can contribute zeros, but the lower one-frequency is still at least \(b/(a+b)\), so Bob forces the outcome into \(\mathcal D\). ∎

### Corollary 4

Neither \(\mathcal D\) nor \(\mathcal D^c\) is Schmidt-winning in the usual sense of being \(\alpha\)-winning for one fixed \(\alpha\) and every \(\beta\).

### Proof

Fix Alice’s contraction \(\alpha\), and set

\[
A=\left\lceil-\log_2\alpha\right\rceil.
\]

On each turn Alice fixes at most \(A\) new binary digits. Choose

\[
\beta=2^{-b}
\]

with \(b\) arbitrarily large. Bob then fixes exactly \(b\) digits per turn.

To defeat the target \(\mathcal D\), Bob writes zeros and chooses \(b\) so that

\[
\frac{A}{A+b}<\theta.
\]

To defeat the target \(\mathcal D^c\), Bob writes ones and chooses \(b\) so that

\[
\frac{b}{A+b}\ge\theta.
\]

Thus no fixed \(\alpha\) works against every \(\beta\). ∎

So the proposed dichotomy—

> either the critical set is avoidable, or it is winning—

is false for ordinary Schmidt winning. The answer depends on the game parameters.

---

## 5. The positive integers are invisible to the game

The set

\[
P=Q(\mathbb N_{>0})
\]

is countable and dense in \(\mathbb Z_2\). Density follows because every finite parity word is realized by exactly one residue class modulo \(2^k\), and hence by infinitely many positive integers. citeturn557195view2

This creates a decisive quantifier mismatch.

A Schmidt-winning statement has the form

\[
\exists\text{ Alice strategy }\sigma\;
\forall\text{ Bob plays }\tau,\qquad
z(\sigma,\tau)\in\mathcal D^c.
\tag{6}
\]

The desired Collatz-divergence statement is

\[
\forall p\in P,\qquad p\in\mathcal D^c.
\tag{7}
\]

Statement (6) does not imply (7). To make the implication, one would need

\[
\forall p\in P\quad
\exists\tau_p
\quad
z(\sigma,\tau_p)=p.
\tag{8}
\]

But Alice may exclude \(p\) on her first move.

In fact, avoiding all embedded positive integers is game-theoretically trivial.

### Proposition 5

The set

\[
\mathbb Z_2\setminus P
\]

is \(1/2\)-winning.

### Proof

Enumerate

\[
P=\{p_1,p_2,p_3,\ldots\}.
\]

Every 2-adic ball has exactly two child balls of half its radius. On Alice’s \(j\)-th move:

- if the current ball does not contain \(p_j\), play arbitrarily;
- if it contains \(p_j\), choose the child that does not contain \(p_j\).

Once \(p_j\) has been excluded, all later balls remain disjoint from it. The final outcome avoids every \(p_j\). ∎

Therefore, under the natural interpretation that the “forbidden set contains every embedded positive integer,” such a winning strategy exists **without using Collatz at all**.

It proves only that Alice can steer the game to a noninteger 2-adic point.

---

## 6. The finite-prefix shadowing obstruction

There is an even more concrete failure.

Let

\[
y\in\mathbb Z_2
\]

be any parity sequence—critical or otherwise—and put

\[
x=Q^{-1}(y)\in\mathbb Z_2.
\]

For every \(k\), choose a positive integer \(n_k\) with

\[
n_k\equiv x\pmod{2^k}.
\]

Since \(Q\) is an isometry,

\[
Q(n_k)\equiv Q(x)=y\pmod{2^k}.
\]

Thus \(n_k\) has the same first \(k\) Collatz parities as \(y\).

Consequently:

> Every infinite critical game path is shadowed to arbitrary finite depth by positive integers.

But the integer \(n_k\) may change with \(k\), usually escaping to infinity. Nothing in the compact space \(\mathbb Z_2\) forces the witnesses to stabilize to one fixed ordinary integer.

This is why playing the game directly on \(P\) does not repair the argument. The subspace \(P\) is not complete; its completion is all of \(\mathbb Z_2\). Nested integer cylinders can converge 2-adically to a noninteger “ghost” point.

The game supplies

\[
\forall k\;\exists n_k,
\]

whereas a Collatz counterexample requires

\[
\exists n\;\forall k.
\]

No Schmidt-game compactness principle interchanges these quantifiers.

---

## 7. Cycles are on the wrong side of the game

For completeness, there is an exact affine version of (2).

For a parity prefix \(\varepsilon_0,\ldots,\varepsilon_{k-1}\), define

\[
C_0=0
\]

and

\[
C_{j+1}=
\begin{cases}
C_j,&\varepsilon_j=0,\\
3C_j+2^j,&\varepsilon_j=1.
\end{cases}
\]

Then

\[
2^kT^k(n)=3^{s_k}n+C_k.
\tag{9}
\]

For a positive cycle of period \(p\),

\[
(2^p-3^s)n=C_p.
\tag{10}
\]

Since \(C_p>0\),

\[
2^p>3^s,
\]

which again gives

\[
\frac{s}{p}<\theta.
\]

Thus even a perfect proof of

\[
P\cap\mathcal D=\varnothing
\]

would leave every possible nontrivial cycle untouched.

The known \(1\leftrightarrow2\) shortcut cycle has parity density \(1/2\), and any hypothetical nontrivial positive cycle would lie on the same, negative-drift side of the game.

---

## 8. What a repaired game would have to retain

A nonconvergent positive orbit has a least element. Start the orbit from that least element \(n\). Then

\[
T^k(n)\ge n
\qquad\text{for every }k.
\]

Using (9), this is equivalent to

\[
\bigl(3^{s_k}-2^k\bigr)n+C_k\ge0
\qquad\text{for every }k.
\tag{11}
\]

A valid arithmetic game would therefore have to retain simultaneously:

1. the parity cylinder;
2. the exact carry \(C_k\);
3. a **single common positive integer** \(n\);
4. all inequalities (11).

Ordinary Schmidt play retains only the residue of \(n\) modulo \(2^k\). It permits a different positive representative at every depth.

To express the missing condition explicitly, for a parity sequence \(y\), let

\[
r_k(y)\in\{0,1,\ldots,2^k-1\}
\]

be the least representative of

\[
Q^{-1}(y)\pmod{2^k}.
\]

Then

\[
y\in P
\quad\Longleftrightarrow\quad
r_k(y)\text{ is eventually constant and positive}.
\tag{12}
\]

Consequently the exact missing theorem is

\[
\boxed{
y\in\mathcal D
\quad\Longrightarrow\quad
r_k(y)\text{ is not eventually constant}.
}
\tag{13}
\]

By (3), statement (13) is precisely the divergent-orbits conjecture.

For the full Collatz conjecture one must additionally prove that no nontrivial periodic parity word satisfies the divisibility condition arising from (10):

\[
2^p-3^s\mid C_p.
\tag{14}
\]

Neither (13) nor (14) follows from Schmidt winning, Hausdorff dimension, entropy, density, category, or ordinary 2-adic compactness.

---

# Final conclusion

Approach 44 can be resolved rigorously, but negatively:

\[
\boxed{
\begin{aligned}
&\dim_{\mathrm H}\mathcal D
   =H_2(\log_3 2)
   \approx0.9499555,\\
&\mathcal D\text{ is Haar-null, meagre, and dense},\\
&\mathcal D\text{ is winning or losing according to the players' digit shares},\\
&\text{neither }\mathcal D\text{ nor }\mathcal D^c
  \text{ is Schmidt-winning uniformly},\\
&P\cap\mathcal D=\varnothing
  \text{ is exactly the divergent-orbits conjecture},\\
&\text{all positive cycles lie in }\mathcal D^c.
\end{aligned}
}
\]

The pure \(\mathbb Z_2\) Schmidt game therefore cannot complete Collatz. Its compactness creates abundant infinite critical **ghost paths**, while allowing the positive-integer witnesses at finite depths to escape archimedeanly.

A viable descendant would need to be a height-augmented or adelic arithmetic game preserving one fixed integer and the exact affine carry. Once that common-witness condition is imposed, the problem is no longer a Schmidt-game avoidance problem; it becomes the substantive Collatz arithmetic encoded in (11)–(14).