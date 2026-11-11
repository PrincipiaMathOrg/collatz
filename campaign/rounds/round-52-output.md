model: GPT-5.6 Pro (Chat mode)
round: 52 -- approach 47, Vojta or abc for uniform near-cycle exclusion
front: proof
sent: 2026-08-15T17:47Z
worked: 59m 22s

---

# Result of the abc/Vojta route

I carried the proposed argument through to the strongest form that I can justify. It does **not** currently give a full proof of Collatz, even assuming the classical \(abc\) conjecture or the standard higher-dimensional forms of Vojta’s conjecture.

The obstruction is precise:

1. A first crossing of the critical line really does produce an additive near-cycle.
2. Baker’s theorem makes the associated starting value only polynomially large.
3. Classical \(abc\) would then finish the argument if the affine numerator \(C_j\) had a uniform exponential saving in its radical.
4. That radical estimate is false for general first-crossing words: \(abc\) itself predicts almost maximal radical.
5. Expanding \(C_j\) into its constituent \(2\)-\(3\) units removes \(\operatorname{rad}(C_j)\), but produces a growing-dimensional \(abcde\ldots\) equation. A dimension-uniform inequality is false without exceptional families—the trivial Collatz cycle is already an explicit exception.
6. The corrected target is a **uniform moving-polynomial gcd theorem**, with periodic words as its exceptional set. Such a theorem would rule out all nonperiodic infinite orbits, but exact nontrivial cycles would still require a separate exclusion theorem.

The exact reductions follow.

---

## 1. Affine formulation

Use the odd accelerated map

\[
U(x)=\frac{3x+1}{2^{\nu _2(3x+1)}}.
\]

Let

\[
x_0=n,\qquad x_{i+1}=U(x_i),\qquad
a_i=\nu _2(3x_i+1),
\]

and put

\[
A_0=0,\qquad A_j=\sum_{i=0}^{j-1}a_i.
\]

Define \(C_0=0\) and

\[
C_{j+1}=3C_j+2^{A_j}.
\]

Induction gives the exact affine identity

\[
\boxed{2^{A_j}x_j=3^j n+C_j}
\tag{1}
\]

where

\[
\boxed{
C_j=\sum_{i=0}^{j-1}3^{j-1-i}2^{A_i}.
}
\tag{2}
\]

For \(j\geq 1\), \(C_j\) is odd and \(3\nmid C_j\).

Define

\[
D_j=2^{A_j}-3^j,\qquad d_j=x_j-n.
\]

Subtracting \(2^{A_j}n\) from (1) gives

\[
\boxed{C_j=D_jn+2^{A_j}d_j.}
\tag{3}
\]

An equivalent and particularly useful form is

\[
\boxed{C_j-3^jd_j=D_jx_j.}
\tag{4}
\]

Thus a near-cycle \(x_j=n+d_j\) forces the large number \(D_j\) to divide a word-dependent sparse exponential sum:

\[
D_j\mid C_j-3^jd_j.
\tag{5}
\]

This divisibility, rather than the radical of \(C_j\) alone, is the correct Diophantine target.

---

## 2. First crossings really are uniform near-cycles

Write

\[
\rho=\log_2 3.
\]

Suppose \(j\) is a first crossing of the critical line:

\[
A_i\leq \rho i\quad(0\leq i<j),
\qquad
A_j>\rho j.
\tag{6}
\]

Then \(2^{A_i}\leq 3^i\) for every \(i<j\), so every term in (2) is at most \(3^{j-1}\). Consequently,

\[
C_j\leq j3^{j-1}.
\tag{7}
\]

Assume also that the orbit has not descended at time \(j\), so \(x_j\geq n\), or equivalently \(d_j\geq0\). Since \(D_j>0\), equation (3) gives

\[
0\leq 2^{A_j}d_j=C_j-D_jn\leq C_j.
\]

Using \(2^{A_j}>3^j\) and (7),

\[
\boxed{0\leq d_j<\frac j3.}
\tag{8}
\]

So every surviving first crossing is an additive near-cycle of displacement \(O(j)\). This part of the proposed approach works exactly.

There is also a useful overshoot bound. Since \(n\geq1\) and \(d_j\geq0\),

\[
D_j\leq C_j\leq j3^{j-1},
\]

and hence

\[
2^{A_j}
\leq 3^j\left(1+\frac j3\right).
\]

Therefore

\[
0<A_j-\rho j
\leq \log_2\left(1+\frac j3\right)=O(\log j).
\tag{9}
\]

A surviving first crossing is not merely on the contracting side; it lies logarithmically close to the critical line.

---

## 3. Baker reduces the starting value to polynomial size

Let

\[
\Lambda_j=A_j\log 2-j\log 3>0.
\]

When \(A_j=O(j)\), a lower bound for a nonzero linear form in \(\log 2,\log 3\) gives constants \(c>0\) and \(\kappa>0\) such that

\[
\Lambda_j\geq c j^{-\kappa}.
\]

Since

\[
D_j=3^j(e^{\Lambda_j}-1),
\]

we obtain

\[
\boxed{
D_j\geq c\,3^j j^{-\kappa}.
}
\tag{10}
\]

If \(A_j\) is much larger than \(j\), this estimate is trivial because \(D_j\) is even larger; condition (9) already restricts a surviving first crossing to the relevant range. Linear-form estimates of this kind are the standard input in the work on possible Collatz cycles. citeturn324824search6turn324824search9

Combining (7), (10), and \(D_jn\leq C_j\),

\[
n\leq \frac{C_j}{D_j}
\ll j^{\kappa+1}.
\tag{11}
\]

Together with (8),

\[
x_j=n+d_j\ll j^{\kappa+1}.
\tag{12}
\]

Thus a surviving first crossing would have all the following properties simultaneously:

\[
A_j=\rho j+O(\log j),\qquad
n,x_j=j^{O(1)},\qquad
0\leq x_j-n<\frac j3.
\tag{13}
\]

This is an extremely rigid near-cycle reduction.

---

## 4. What classical \(abc\) would need

Let

\[
g=\gcd(n,C_j).
\]

Because \(3\nmid C_j\), dividing (1) by \(g\) produces a primitive \(abc\)-triple:

\[
3^j\frac ng+\frac{C_j}{g}
=
2^{A_j}\frac{x_j}{g}.
\tag{14}
\]

Classical \(abc\) would give, for every \(\varepsilon>0\),

\[
2^{A_j}\frac{x_j}{g}
\ll_\varepsilon
\operatorname{rad}(6n x_j C_j)^{1+\varepsilon}.
\tag{15}
\]

At a surviving first crossing, \(n\) and \(x_j\) are polynomial in \(j\). Therefore their radicals contribute only \(e^{O(\log j)}\). Consequently, (15) would contradict the exponential size \(3^j\) provided one could prove, for some fixed \(\delta>0\),

\[
\boxed{
\log\operatorname{rad}(C_j)
\leq (\log 3-\delta)j+O(\log j).
}
\tag{16}
\]

So the proposed radical strategy has a mathematically correct conditional core:

> **A uniform exponential radical saving for every surviving first-crossing numerator would, together with \(abc\) and Baker’s theorem, exclude all sufficiently long surviving first crossings.**

The problem is that such a radical saving is not true for general first-crossing words.

---

## 5. A first-crossing family for which \(abc\) predicts maximal radical

For \(j\geq2\), consider the valuation word

\[
w_j=(\underbrace{1,\ldots,1}_{j-1\text{ entries}},b_j),
\qquad
b_j=\lceil \rho j\rceil-j+1.
\tag{17}
\]

Then

\[
A_i=i\quad(0\leq i<j),
\qquad
A_j=\lceil\rho j\rceil.
\]

It is therefore a genuine first-crossing word. Its affine numerator is

\[
\begin{aligned}
C_j
&=\sum_{i=0}^{j-1}3^{j-1-i}2^i\\
&=\frac{3^j-2^j}{3-2}\\
&=\boxed{3^j-2^j}.
\end{aligned}
\tag{18}
\]

Apply \(abc\) to

\[
2^j+(3^j-2^j)=3^j.
\tag{19}
\]

The three terms are pairwise coprime, so \(abc\) predicts

\[
3^j
\ll_\varepsilon
\bigl(6\operatorname{rad}(3^j-2^j)\bigr)^{1+\varepsilon}.
\]

Hence

\[
\boxed{
\log\operatorname{rad}(C_j)
\geq
\frac{j\log3}{1+\varepsilon}-O_\varepsilon(1).
}
\tag{20}
\]

Because \(C_j<3^j\), allowing \(\varepsilon\to0\) says heuristically—and conditionally under \(abc\)—that

\[
\log\operatorname{rad}(C_j)
=
j\log3-o(j).
\tag{21}
\]

This is almost the largest possible radical. It is exactly the opposite of (16).

The associated finite orbit segment descends, so this does not logically disprove a radical saving restricted only to **surviving** first crossings. But it proves that such a saving cannot come from the shape of \(C_j\), from first crossing alone, or from \(abc\). It would have to use the full integrality and no-descent condition in an essentially new way.

Rozier’s \(abc\)-based result succeeds for the much more special shortcut parity patterns having exactly one even term; there the orbit equation reduces to a controlled three-term equation such as \(1+3^kA=2^{j-k}B\). The paper explicitly identifies the unbounded number of terms in a general Collatz iterate as the obstacle to extending the argument. citeturn617796view3turn324824search14

---

## 6. Expanding \(C_j\): the natural Vojta formulation

Instead of treating \(C_j\) as one term, expand it using (2):

\[
3^jn+
3^{j-1}
+3^{j-2}2^{A_1}
+\cdots+
2^{A_{j-1}}
=
2^{A_j}x_j.
\tag{22}
\]

Consider the primitive projective tuple

\[
P_j=
\left[
3^jn:
3^{j-1}:
3^{j-2}2^{A_1}:
\cdots:
2^{A_{j-1}}:
-2^{A_j}x_j
\right].
\tag{23}
\]

Its logarithmic height satisfies

\[
h(P_j)\geq j\log3+\log n.
\tag{24}
\]

All the interior coordinates have prime factors only \(2\) and \(3\). Therefore the logarithmic projective radical is exactly

\[
R(P_j)
=
\log\operatorname{rad}(6n x_j).
\tag{25}
\]

This is the major advantage: \(\operatorname{rad}(C_j)\) has disappeared.

Moreover,

\[
U(x)=\frac{3x+1}{2^{a}}
\leq \frac{3x+1}{2}\leq2x
\]

for every positive odd \(x\). Hence

\[
x_j\leq2^j n
\tag{26}
\]

and

\[
R(P_j)
\leq j\log2+2\log n+\log6.
\tag{27}
\]

Suppose one had a dimension-uniform \(abcde\ldots\) inequality

\[
h(P_j)
\leq
(1+\varepsilon)R(P_j)+o(j)
\tag{28}
\]

for infinitely many prefixes of every nonperiodic orbit. Combining (24) and (27),

\[
j\log3+\log n
\leq
(1+\varepsilon)
\bigl(j\log2+2\log n+\log6\bigr)+o(j).
\]

Thus

\[
j\bigl(\log3-(1+\varepsilon)\log2\bigr)
\leq
(1+2\varepsilon)\log n+O(1)+o(j).
\tag{29}
\]

Choose

\[
0<\varepsilon<\log_2 3-1.
\]

Then the coefficient on the left is positive. For a fixed starting value \(n\), (29) is impossible as \(j\to\infty\).

This proves the following conditional result.

### Conditional Vojta reduction

Assume that every infinite accelerated Collatz orbit whose valuation sequence is not eventually periodic has infinitely many prefixes satisfying the uniform inequality (28), with an error \(o(j)\). Then every positive accelerated Collatz orbit has eventually periodic valuation sequence.

This is a genuine full exclusion of nonperiodic divergent orbits under the proposed uniform Vojta statement.

For a finite prefix, the same calculation gives an exponential seed lower bound:

\[
\log n
\geq
\frac{\log3-(1+\varepsilon)\log2}{1+2\varepsilon}\,j-o(j).
\tag{30}
\]

This is precisely the kind of lower-bound hypothesis that Collatz parity-vector approaches seek.

---

## 7. Why standard Vojta does not supply (28)

There are two fundamental problems.

### 7.1 The dimension grows

The tuple \(P_j\) lies in a hyperplane of dimension \(j\). Standard higher-dimensional \(abcd\) statements give

\[
h(P)\leq(1+\varepsilon)R(P)+C_{\varepsilon,j}
\]

outside a proper Zariski-closed subset, but both the constant and the exceptional subset depend on the dimension. Nothing in the standard formulation gives

\[
C_{\varepsilon,j}=o(j)
\]

or coherent exceptional sets as \(j\to\infty\).

Vojta’s original higher-dimensional formulation is known to require modification; the surviving formulations explicitly allow proper Zariski-closed exceptional subsets, and the constants depend on the dimension. citeturn904164view0

### 7.2 The trivial Collatz orbit is an explicit exception

For \(n=1\),

\[
a_i=2,\qquad A_i=2i,\qquad x_i=1.
\]

Equation (22) becomes

\[
\boxed{
3^j+
\sum_{i=0}^{j-1}3^{j-1-i}4^i
=
4^j.
}
\tag{31}
\]

Every coordinate has prime factors only \(2\) and \(3\), so

\[
R(P_j)=\log6,
\qquad
h(P_j)=j\log4.
\]

Thus no inequality of the form

\[
h(P_j)\leq(1+\varepsilon)R(P_j)+o(j)
\]

can hold for all Collatz staircase tuples. This remains true even though (31) has no proper zero subsum: all terms on the left are positive.

Therefore exceptional families are not a removable technicality. The trivial cycle forces one. Every hypothetical nontrivial Collatz cycle would generate an analogous exceptional family by repeating its valuation block.

---

## 8. Periodic exceptions can be analyzed exactly

Let \(v\) be a valuation block of length \(r\), total valuation

\[
B=A(v),
\]

and affine numerator \(C_v\). The concatenation identity is

\[
C_{uv}=3^{|v|}C_u+2^{A(u)}C_v.
\tag{32}
\]

For the repeated word \(v^m\),

\[
\boxed{
C_{v^m}=C_vQ_m
}
\tag{33}
\]

where

\[
\boxed{
Q_m=
\sum_{k=0}^{m-1}2^{Bk}3^{r(m-1-k)}
=
\frac{2^{Bm}-3^{rm}}{2^B-3^r}.
}
\tag{34}
\]

Also,

\[
2^{Bm}-3^{rm}=(2^B-3^r)Q_m.
\tag{35}
\]

Suppose \(v^m\) carries \(n\) to \(n+d\). Equation (3) becomes

\[
C_vQ_m
=
(2^B-3^r)Q_m n+2^{Bm}d.
\]

Hence

\[
Q_m\mid 2^{Bm}d.
\]

But \(Q_m\) is odd, so

\[
\boxed{Q_m\mid d.}
\tag{36}
\]

Consequently,

\[
\boxed{|d|<Q_m\quad\Longrightarrow\quad d=0.}
\tag{37}
\]

Thus a long repeated-block near-cycle cannot have a small nonzero displacement. It must collapse to an exact cycle.

Moreover, when \(d=0\), dividing by \(Q_m\) gives

\[
C_v=(2^B-3^r)n.
\tag{38}
\]

So even if the near-cycle was initially observed only after \(m\) repetitions, one copy of \(v\) already fixes \(n\).

This is an unconditional and useful near-cycle exclusion theorem.

---

## 9. Eventually periodic valuations imply an actual cycle

Suppose the valuation sequence is eventually periodic with block \(v\). Starting at the beginning of the periodic tail, let \(y_k\) be the orbit value after \(k\) copies of \(v\). Then

\[
2^B y_{k+1}=3^r y_k+C_v.
\tag{39}
\]

Set

\[
y_*=\frac{C_v}{2^B-3^r}.
\]

Since \(2^B-3^r\) is odd, \(y_*\in\mathbb Z_2\). Equation (39) gives

\[
y_{k+1}-y_*
=
\frac{3^r}{2^B}(y_k-y_*).
\tag{40}
\]

If \(y_0-y_*\neq0\), then

\[
\nu_2(y_k-y_*)
=
\nu_2(y_0-y_*)-Bk,
\]

which eventually becomes negative. But \(y_k\) and \(y_*\) are both \(2\)-adic integers, so their difference must remain \(2\)-adically integral. This is impossible.

Therefore

\[
y_0=y_*,
\]

and (39) gives \(y_{k+1}=y_k\). Hence:

\[
\boxed{\text{An eventually periodic valuation sequence on a positive integer orbit is a genuine cycle.}}
\tag{41}
\]

Combining this with the conditional Vojta reduction:

> A dimension-uniform Vojta inequality outside coherent periodic exceptions would prove that every positive orbit eventually enters a cycle.

It would not yet prove that this cycle is the trivial one.

---

## 10. The correct gcd target

For a valuation word \(w\) of length \(j\), define the two moving polynomials

\[
G_w(X,Y)=X^{A_j}-Y^j
\tag{42}
\]

and

\[
F_{w,d}(X,Y)
=
\sum_{i=0}^{j-1}X^{A_i}Y^{j-1-i}
-
Y^jd.
\tag{43}
\]

At \((X,Y)=(2,3)\),

\[
G_w(2,3)=D_j
\]

and, using (4),

\[
F_{w,d_j}(2,3)
=
C_j-3^jd_j
=
D_jx_j.
\]

Therefore

\[
\boxed{
\gcd\bigl(G_w(2,3),F_{w,d_j}(2,3)\bigr)=|D_j|.
}
\tag{44}
\]

For a first-crossing near-cycle, Baker gives

\[
\log |D_j|=j\log3-O(\log j).
\tag{45}
\]

Thus the ideal Vojta-type theorem would be:

### Uniform Collatz gcd theorem

For every \(\eta>0\), outside explicitly classified periodic or algebraic word families,

\[
\log\gcd\bigl(
G_w(2,3),F_{w,d}(2,3)
\bigr)
\leq
\eta j+O_\eta(\log(1+|d|)).
\tag{46}
\]

For \(0\leq d<j/3\), equations (44)–(46) would immediately contradict (45).

This is a substantially better target than a radical upper bound for \(C_j\):

- It directly captures the divisibility forced by a near-cycle.
- It naturally admits periodic exceptional families.
- It resembles established gcd theorems for values of coprime polynomials at \(S\)-unit points.

Corvaja–Zannier prove such small-gcd conclusions for **fixed** coprime polynomials evaluated on points in a finitely generated subgroup of a torus, outside a proper Zariski-closed set. citeturn870361view3 Moving-target variants require conditions such as fixed degree and coefficient height negligible compared with the point height. Here the evaluation point is fixed at \((2,3)\), while the degrees, exponent sets, and number of monomials in \(F_{w,d}\) grow with \(j\); those hypotheses do not apply. citeturn375000search21

Proving (46), including a uniform classification of its exceptional words, is therefore a genuinely new theorem rather than an application of an existing Vojta result.

---

## 11. Exact cycles remain a separate obstruction

Suppose \(v\) is an exact cycle block. Then

\[
2^B-3^r\mid C_v
\]

and

\[
n=\frac{C_v}{2^B-3^r}.
\tag{47}
\]

Repeating the block gives the geometric identities

\[
3^{rm}n+C_vQ_m=2^{Bm}n.
\tag{48}
\]

These are necessarily exceptional to the generic Vojta inequality: their expanded radical is bounded by \(\operatorname{rad}(6n)\), while their height grows exponentially in \(m\).

Compressing (48) into three terms does not help:

\[
3^{rm}+(2^B-3^r)Q_m=2^{Bm},
\tag{49}
\]

because the radical now contains \(Q_m\), which normally introduces exponentially many arithmetic contributions. Classical \(abc\) is entirely compatible with (49).

Thus an exceptional-set theorem saying “all exceptions are periodic” reduces the problem to exact cycles but cannot distinguish the trivial block \((2)\) from a hypothetical nontrivial cycle block.

Linear forms in logarithms give powerful bounds on possible cycles, and established work has excluded Collatz \(m\)-cycles with \(m\leq91\), but these results do not give an all-\(m\) exclusion. citeturn617796view2turn324824search1

---

# Final assessment

The proposed idea splits into three statements:

### 1. First-crossing near-cycle reduction — proved

A surviving first crossing satisfies

\[
0\leq x_j-n<\frac j3,
\qquad
A_j-j\log_2 3=O(\log j),
\qquad
n,x_j=j^{O(1)}.
\]

### 2. Uniform small radical of \(C_j\) — false in the natural unrestricted form

The first-crossing family

\[
C_j=3^j-2^j
\]

has, under \(abc\),

\[
\operatorname{rad}(C_j)=3^{j-o(j)}.
\]

So \(abc\) predicts almost maximal radical rather than the exponential saving required by the compressed three-term argument.

### 3. Correct replacement — a new uniform gcd/Vojta theorem

The right statement is the moving-polynomial estimate

\[
\log\gcd\left(
2^{A_j}-3^j,\,
C_j-3^jd
\right)=o(j)
\]

outside coherent periodic exceptional families. Together with Baker and the first-crossing lemma, this would uniformly exclude long nonperiodic near-cycles. A dimension-uniform staircase \(abcde\ldots\) theorem with the same exceptional-set classification would rule out all nonperiodic infinite orbits.

But periodic exceptional families are unavoidable, and exact nontrivial cycles remain inside them. Their complete exclusion is not supplied by either classical \(abc\), standard Vojta, or existing linear-form estimates.

Therefore the approach does **not** presently yield a valid full proof of Collatz. Its strongest repaired form is:

\[
\boxed{
\begin{array}{c}
\text{uniform moving-gcd estimate}\\
+\ \text{coherent periodic-exception classification}\\
+\ \text{complete positive-cycle exclusion}\\[2mm]
\Longrightarrow\ \text{Collatz}.
\end{array}}
\]

The central proposed radical lemma cannot be used as stated; the genuinely viable research target is the uniform gcd estimate (46), with the periodic factorization lemma (33)–(37) describing the unavoidable exceptional geometry.