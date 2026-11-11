model: GPT-5.6 Pro (Chat mode)
round: 92 -- approach 87, Continued fractions for log_2 3
front: proof
sent: 2026-08-17T11:08Z
worked: 110m 34s

---

# Result of the continued-fraction attack

Carrying this approach through does **not** produce a valid proof of the full Collatz conjecture. It does produce three rigorous results:

1. every nontrivial cycle is reduced to an exact carry-divisibility problem;
2. the extremal Christoffel family is excluded completely by a coprimality theorem;
3. every sufficiently long primitive word obtained from the Christoffel word by one adjacent transposition is excluded by a resultant estimate and a linear-form bound.

The remaining divisibility statement for words with arbitrarily distributed defects is equivalent to excluding all nontrivial cycles, rather than a consequence of continued fractions. Moreover, cycle exclusion alone does not rule out an unbounded orbit.

Here is the complete derivation.

---

## 1. The exact cycle equation

Let \(\mathbb O\) denote the positive odd integers, and define the accelerated Collatz map

\[
U(x)=\frac{3x+1}{2^{v_2(3x+1)}}\qquad(x\in\mathbb O).
\]

Suppose that

\[
x_0,x_1,\ldots,x_{j-1},x_j=x_0
\]

is a periodic orbit of \(U\). Define

\[
a_i=v_2(3x_i+1)\geq 1,
\qquad
A_r=\sum_{i=0}^{r-1}a_i,
\qquad
A=A_j.
\]

Thus

\[
2^{a_i}x_{i+1}=3x_i+1.
\]

Define the carry

\[
C_r=\sum_{i=0}^{r-1}3^{r-1-i}2^{A_i}.
\]

### Lemma 1

For every \(0\leq r\leq j\),

\[
2^{A_r}x_r=3^r x_0+C_r.
\]

### Proof

The claim is immediate for \(r=0\). If it holds for \(r\), then

\[
\begin{aligned}
2^{A_{r+1}}x_{r+1}
 &=2^{A_r}(3x_r+1)\\
 &=3\bigl(3^r x_0+C_r\bigr)+2^{A_r}\\
 &=3^{r+1}x_0+\bigl(3C_r+2^{A_r}\bigr),
\end{aligned}
\]

and \(C_{r+1}=3C_r+2^{A_r}\). ∎

Putting \(r=j\) and using \(x_j=x_0\) gives the exact cycle equation

\[
\boxed{
(2^A-3^j)x_0=C_w,
}
\tag{1}
\]

where

\[
C_w=\sum_{i=0}^{j-1}3^{j-1-i}2^{A_i}.
\tag{2}
\]

Consequently, with

\[
D_w=2^A-3^j,
\]

a necessary condition for an integer cycle is

\[
\boxed{D_w\mid C_w.}
\tag{3}
\]

It is this divisibility condition—not merely the approximation \(A/j\approx\log_2 3\)—that contains the integer-cycle problem.

---

## 2. The continued-fraction constraint

Multiplying

\[
2^{a_i}x_{i+1}=x_i\left(3+\frac1{x_i}\right)
\]

over one period gives

\[
2^A
 =\prod_{i=0}^{j-1}\left(3+\frac1{x_i}\right)
 =3^j\prod_{i=0}^{j-1}\left(1+\frac1{3x_i}\right).
\tag{4}
\]

Let

\[
\alpha=\log_2 3,
\qquad
m=\min_{0\leq i<j}x_i.
\]

Taking logarithms in (4),

\[
A-j\alpha
 =
\sum_{i=0}^{j-1}
\log_2\left(1+\frac1{3x_i}\right).
\]

Therefore

\[
0<
\frac Aj-\alpha
\leq
\log_2\left(1+\frac1{3m}\right)
<
\frac{1}{3m\log 2}.
\tag{5}
\]

For a nontrivial cycle every odd member is at least \(3\), so every factor \(3+1/x_i\) is strictly less than \(4\). Hence

\[
\alpha<\frac Aj<2.
\tag{6}
\]

The continued fraction begins

\[
\alpha=[1;1,1,2,2,3,1,5,2,23,\ldots].
\]

Continued fractions and linear forms in \(\log 2,\log 3\) are precisely the ingredients in the established \(m\)-cycle literature. Simons and de Weger formulate the relevant positive linear form and use Baker-type lower bounds; Hercher later strengthened the resulting finite-block exclusion to cycles with at most \(91\) local minima. Here an “\(m\)-cycle” counts local minima, not the number \(j\) of odd members. citeturn499461view0turn499461view1turn499461view2turn499461view3

As of August 17, 2026, convergence has been verified for every starting value below

\[
M=2075\cdot 2^{60}\approx 2^{71.02}.
\]

Thus the minimum of a hypothetical nontrivial cycle must be at least \(M\), and (5) gives

\[
0<\frac Aj-\alpha<2.011\times 10^{-22}.
\tag{7}
\]

citeturn499461view5

Let \(p/q\) be \(A/j\) in lowest terms. Legendre’s criterion says that \(p/q\) must be a continued-fraction convergent whenever

\[
\left|\alpha-\frac pq\right|<\frac1{2q^2}.
\]

The bound (7) guarantees this only when

\[
q<
\sqrt{\frac{3M\log 2}{2}}
\approx 4.99\times 10^{10}.
\tag{8}
\]

For larger reduced denominators, (7) alone does not even force \(A/j\) to be a convergent. This is the first precise limitation of the continued-fraction step.

---

## 3. Rational-Dyck rotation

Let \(a_0,\ldots,a_{j-1}\) be any positive word of sum \(A\), and write

\[
P_r=\sum_{i=0}^{r-1}a_i.
\]

Consider

\[
h_r=P_r-\frac{rA}{j},
\qquad 0\leq r\leq j.
\]

Choose \(k\) at which \(h_k\) is maximal and rotate the word so that it begins at \(k\). Let \(B_r\) be the prefix sums of the rotated word. Then

\[
B_r-\frac{rA}{j}\leq 0
\]

for every \(0\leq r\leq j\), including prefixes that wrap around the end of the original word. Hence

\[
\boxed{
B_r\leq \left\lfloor\frac{rA}{j}\right\rfloor.
}
\tag{9}
\]

Thus every cyclic word admits a rational-Dyck rotation.

For a rotation beginning at \(i\), let \(C_i\) denote its carry. Directly from the definition,

\[
\boxed{
2^{a_i}C_{i+1}=3C_i+D_w.
}
\tag{10}
\]

Since \(D_w\) is odd, \(D_w\mid C_i\) implies \(D_w\mid C_{i+1}\). Therefore divisibility is invariant under rotation.

The converse is equally important.

### Proposition 2: exact converse

Let \(a_0,\ldots,a_{j-1}\geq1\), let \(A=\sum a_i\), and suppose

\[
D=2^A-3^j>0,
\qquad
D\mid C_0.
\]

Then the word is the valuation word of a positive odd Collatz cycle.

### Proof

By (10), \(D\mid C_i\) for every rotation. Put

\[
x_i=\frac{C_i}{D}.
\]

Every \(C_i\) is positive and odd, so every \(x_i\) is a positive odd integer. Dividing (10) by \(D\) gives

\[
2^{a_i}x_{i+1}=3x_i+1.
\]

Since \(x_{i+1}\) is odd,

\[
v_2(3x_i+1)=a_i,
\]

and hence \(U(x_i)=x_{i+1}\). ∎

Consequently, the following statement is **equivalent** to the nonexistence of nontrivial Collatz cycles.

### Dyck–carry nondivisibility

For every pair of integers \(j,A\) satisfying

\[
\alpha j<A<2j,
\]

and every positive word with sum \(A\) whose prefix sums satisfy (9),

\[
\boxed{
2^A-3^j
\nmid
\sum_{r=0}^{j-1}3^{j-1-r}2^{B_r}.
}
\tag{DCND}
\]

This is the exact modular statement that the approach must establish.

---

## 4. The Christoffel carry

Fix integers \(p,q\) with

\[
\alpha q<p<2q.
\]

Define the mechanical, or Christoffel, prefix sequence

\[
B_r^*=\left\lfloor\frac{pr}{q}\right\rfloor
\qquad(0\leq r\leq q)
\]

and its carry

\[
C_{p,q}^*
 =
\sum_{r=0}^{q-1}
3^{q-1-r}2^{\lfloor pr/q\rfloor}.
\tag{11}
\]

For every rational-Dyck word of the same length and sum,

\[
B_r\leq B_r^*
\]

term by term, and therefore

\[
C(B)\leq C_{p,q}^*.
\tag{12}
\]

Recent work proves a corresponding unique-extremality theorem for Collatz parity words: up to rotation, the Christoffel word uniquely maximizes the relevant minimum carry and yields

\[
x_{\min}\leq\frac{1}{2^{p/q}-3}.
\]

It also explains why extremal or “high” rational cycles are the most favourable candidates without proving nondivisibility for every lower word. citeturn499461view6turn203491view0turn203491view2turn279238view2

The Christoffel carry itself admits a complete arithmetic exclusion.

### Theorem 3: Christoffel coprimality

Suppose

\[
\gcd(p,q)=1.
\]

Then

\[
\boxed{
\gcd\!\left(C_{p,q}^*,\,2^p-3^q\right)=1.
}
\tag{13}
\]

### Proof

Let

\[
D=2^p-3^q
\]

and suppose that a prime \(\ell\) divides both \(D\) and \(C_{p,q}^*\). Since \(D\) is coprime to \(6\), one has \(\ell\nmid6\).

Choose integers \(u,v\) satisfying

\[
uq+vp=1
\]

and put, modulo \(\ell\),

\[
t=2^u3^v.
\]

Negative powers are interpreted using inverses. Since

\[
2^p\equiv3^q\pmod\ell,
\]

we have

\[
t^q\equiv2,
\qquad
t^p\equiv3
\pmod\ell.
\tag{14}
\]

Normalize the carry:

\[
3^{-(q-1)}C_{p,q}^*
\equiv
\sum_{r=0}^{q-1}
3^{-r}2^{\lfloor pr/q\rfloor}
\equiv
\sum_{r=0}^{q-1}
t^{q\lfloor pr/q\rfloor-pr}.
\]

Set

\[
s_r=pr-q\left\lfloor\frac{pr}{q}\right\rfloor.
\]

Because \(\gcd(p,q)=1\), the residues \(s_r\) are a permutation of

\[
0,1,\ldots,q-1.
\]

Therefore

\[
3^{-(q-1)}C_{p,q}^*
\equiv
S:=\sum_{s=0}^{q-1}t^{-s}.
\]

But

\[
(1-t^{-1})S
 =
1-t^{-q}
 =
1-2^{-1}
 =
2^{-1}
\not\equiv0\pmod\ell.
\]

It follows that \(S\not\equiv0\pmod\ell\), contradicting \(\ell\mid C_{p,q}^*\). ∎

### Corollary 4

No nontrivial Christoffel valuation word represents an integer Collatz cycle.

### Proof

If \(d=\gcd(p,q)\), write \(p=dp_0\), \(q=dq_0\). The mechanical word is the \(d\)-fold repetition of its primitive block, and

\[
C_{p,q}^*
 =
C_{p_0,q_0}^*
\frac{2^{dp_0}-3^{dq_0}}{2^{p_0}-3^{q_0}}.
\]

Consequently,

\[
\frac{C_{p,q}^*}{2^p-3^q}
 =
\frac{C_{p_0,q_0}^*}{2^{p_0}-3^{q_0}}.
\]

By Theorem 3, this quotient can be an integer only if

\[
2^{p_0}-3^{q_0}=1.
\]

If \(q_0\geq2\), this equation is impossible modulo \(8\). If \(q_0=1\), it gives \(p_0=2\), which is the trivial orbit \(1\mapsto1\) under \(U\). ∎

Thus the extremal word is not merely nonintegral: in primitive slope its carry is a unit modulo the denominator.

---

## 5. One adjacent transposition

The coprimality argument can be pushed one step beyond the Christoffel word.

Assume now that \(\gcd(p,q)=1\). The Christoffel increments are

\[
c_i=
\left\lfloor\frac{p(i+1)}q\right\rfloor
-
\left\lfloor\frac{pi}q\right\rfloor
\in\{1,2\}.
\]

Suppose a neighbouring pattern

\[
(2,1)
\]

is replaced by

\[
(1,2).
\]

Exactly one prefix, say the \(r\)-th, is lowered by \(1\); all other prefixes remain unchanged.

Let

\[
s=pr-q\left\lfloor\frac{pr}{q}\right\rfloor.
\]

Because the second Christoffel increment is \(1\),

\[
s+p<2q,
\]

and hence

\[
s+1\leq2q-p.
\tag{15}
\]

### Proposition 5: eventual one-transposition exclusion

There exists an effectively computable \(q_0\) such that no primitive one-transposition word of length \(q\geq q_0\) can represent an integer Collatz cycle.

### Proof

Work modulo

\[
D=2^p-3^q.
\]

Define \(t\) as in (14). For the Christoffel word, the normalized carry is

\[
S_0=\sum_{u=0}^{q-1}t^{-u}.
\]

Lowering the \(r\)-th prefix by one halves the corresponding term, so divisibility of the perturbed carry would imply

\[
S_0-\frac12t^{-s}\equiv0\pmod D.
\tag{16}
\]

The geometric identity gives

\[
(1-t^{-1})S_0=1-t^{-q}=\frac12.
\]

Substituting (16),

\[
(1-t^{-1})t^{-s}\equiv1\pmod D.
\]

Multiplying by \(t^{s+1}\),

\[
t^{s+1}-t+1\equiv0\pmod D.
\tag{17}
\]

Hence \(t\) is a common root modulo \(D\) of

\[
f(X)=X^q-2
\]

and

\[
g(X)=X^{s+1}-X+1.
\]

It follows that

\[
D\mid R_{q,s},
\qquad
R_{q,s}=\operatorname{Res}(f,g).
\tag{18}
\]

The polynomial \(X^q-2\) is irreducible by Eisenstein’s criterion and \(\deg g=s+1<q\), so

\[
R_{q,s}\neq0.
\]

Let \(h=s+1\). For every complex root \(\beta\) of \(g\),

\[
|\beta^q-2|
 \leq
3\max(1,|\beta|)^q.
\]

Therefore

\[
|R_{q,s}|
 \leq
3^h M(g)^q,
\]

where \(M(g)\) is the Mahler measure of \(g\). Landau’s inequality gives

\[
M(g)\leq\sqrt{1^2+(-1)^2+1^2}=\sqrt3.
\]

Using (15),

\[
\begin{aligned}
|R_{q,s}|
 &\leq 3^{h+q/2}\\
 &\leq 3^{(5/2-p/q)q}\\
 &<3^{(5/2-\alpha)q}\\
 &=3^{0.915037\ldots q}.
\end{aligned}
\tag{19}
\]

On the other hand, put

\[
\Lambda=p\log2-q\log3>0.
\]

A standard lower bound for linear forms in the fixed logarithms \(\log2,\log3\) supplies effective constants \(c,K>0\) such that

\[
\Lambda>cq^{-K}.
\]

This is the same linear form used in the classical cycle arguments. citeturn499461view1turn499461view2

Consequently,

\[
D
 =3^q(e^\Lambda-1)
 >c\,3^q q^{-K}.
\tag{20}
\]

For sufficiently large \(q\), the right side of (20) is larger than the upper bound (19). This contradicts the nonzero divisibility \(D\mid R_{q,s}\). ∎

This proves that a hypothetical long cycle cannot be the Christoffel word or an immediate one-transposition neighbour. Its carry defects must be genuinely distributed.

---

## 6. Why extremality does not finish the cycle proof

For a rational-Dyck word write

\[
d_r=
\left\lfloor\frac{pr}{q}\right\rfloor-B_r\geq0.
\]

Then

\[
C(B)
 =
\sum_{r=0}^{q-1}
3^{q-1-r}
2^{\lfloor pr/q\rfloor-d_r}.
\]

Equivalently,

\[
C_{p,q}^*-C(B)
 =
\sum_{r=0}^{q-1}
3^{q-1-r}2^{\lfloor pr/q\rfloor}
\bigl(1-2^{-d_r}\bigr).
\tag{21}
\]

Extremality proves only that this loss is positive when some \(d_r>0\). It does not determine the residue of the loss modulo

\[
D=2^p-3^q.
\]

In particular, knowing

\[
0<C(B)<C_{p,q}^*
\]

does not exclude

\[
C(B)=D,\,2D,\,3D,\ldots.
\]

Indeed, put

\[
\delta=\frac pq-\alpha>0.
\]

Because

\[
2^{\lfloor pr/q\rfloor}\geq\frac12\,2^{pr/q},
\]

one obtains

\[
C_{p,q}^*
 \geq
\frac q2\,3^{q-1}.
\]

Since

\[
D=3^q(2^{q\delta}-1),
\]

it follows that

\[
\boxed{
\frac{C_{p,q}^*}{D}
\geq
\frac{q}{6(2^{q\delta}-1)}.
}
\tag{22}
\]

At the ordinary convergent scale \(\delta\asymp q^{-2}\), the right side is of order \(q^2\). Thus there can be quadratically many positive multiples of \(D\) below the extremal carry. Excluding the largest numerator does not exclude the lower multiples.

The exact unresolved cycle statement is therefore (DCND), or equivalently:

> For every nontrivial rational-Dyck defect profile \((d_r)\), the loss in (21) is not congruent to \(C_{p,q}^*\) modulo \(2^p-3^q\).

Theorem 3 handles the zero-defect profile. Proposition 5 handles one local defect asymptotically. No uniform resultant estimate below \(2^p-3^q\) has been obtained for an arbitrary number of distributed defects. Existing continued-fraction and linear-form methods likewise become conclusive after bounding the number of monotone blocks; the strongest cited result excludes \(m\)-cycles only for \(m\leq91\). citeturn499461view3

Because Proposition 2 converts any violation of (DCND) directly into a positive integer cycle, proving (DCND) is not a routine final congruence check. It is exactly the remaining nontrivial-cycle problem.

---

## 7. The separate unbounded-orbit obstruction

Even a complete proof of (DCND) would exclude only nontrivial cycles.

For a nonperiodic orbit segment beginning at an odd integer \(n\), the affine identity is

\[
2^{A_k}U^k(n)=3^k n+C_k.
\tag{23}
\]

Unlike the cycle equation, there is no equality \(U^k(n)=n\), so there is no divisibility condition

\[
2^{A_k}-3^k\mid C_k.
\]

The two possible modes of failure of the Collatz conjecture are a nontrivial periodic orbit and an unbounded orbit; cycle papers explicitly separate these cases. citeturn499461view4

Nor is negative multiplicative drift by itself enough. For the shortcut map, the segment

\[
7,11,17,26,13,20,10,5,8
\]

has multiplicative coefficient

\[
\frac{3^5}{2^8}=\frac{243}{256}<1
\]

but ends above its starting value because the affine carry is positive. Such segments are called paradoxical in recent work, and an infinite stopping-time orbit would generate infinitely many of them. citeturn499461view7turn598865view3

A full proof would therefore require, in addition to (DCND), a no-escape theorem such as

\[
\boxed{
\forall n>1\quad\exists k\geq1\quad U^k(n)<n.
}
\tag{NE}
\]

Statement (NE), followed by strong induction, proves convergence. Alternatively, boundedness of every orbit together with cycle exclusion would suffice, because a bounded orbit in the positive integers eventually repeats.

The continued-fraction/divisibility argument above supplies neither statement.

---

# Final status

The approach establishes the following rigorous frontier:

\[
\begin{array}{ll}
\textbf{Complete:}
&
\text{exact cycle equation and rational-Dyck reduction};\\[2mm]
\textbf{Complete:}
&
\gcd(C_{p,q}^*,2^p-3^q)=1
\text{ for primitive Christoffel words};\\[2mm]
\textbf{Complete:}
&
\text{all sufficiently long primitive one-transposition words are excluded};\\[2mm]
\textbf{Open in this attack:}
&
\text{uniform nondivisibility for arbitrary distributed defects};\\[2mm]
\textbf{Open in this attack:}
&
\text{the no-escape statement for nonperiodic orbits}.
\end{array}
\]

Thus a full proof of the Collatz conjecture has **not** emerged from approach 87. The strongest exact new target is (DCND), while a full Collatz proof additionally requires (NE) or an equivalent boundedness theorem. Claiming that continued fractions plus Christoffel extremality already settle either statement would omit precisely the modular and dynamical difficulties on which the conjecture remains balanced.