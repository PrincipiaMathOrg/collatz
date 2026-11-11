model: GPT-5.6 Pro (Chat mode)
round: 68 -- approach 63, A uniform determinant involution
front: proof
sent: 2026-08-16T10:23Z
worked: 23m 40s

---

# Outcome

The proposed sign-reversing involution does **not** yield a full proof. More strongly, it cannot exist as a nontrivial cancellation mechanism: the determinant expansion is already cancellation-free. Every nonzero determinant permutation is exactly a disjoint union of genuine Collatz cycles. Consequently, an involution pairing away hypothetical nontrivial-cycle terms exists only after one has already proved that those terms do not exist.

This gives a rigorous resolution of Approach 63, including an exact determinant factorization, a no-go theorem for the proposed involution, and a precise matrix expression for the still-missing nonescape statement.

The matrices below are the Collatz matrices introduced by Alves–Graça–Dias–Sousa Ramos and restated by Kauffman–Lopes; their determinant criterion concerns uniqueness of the finite periodic orbit, not exclusion of divergent trajectories. citeturn305709view2

## 1. The exact determinant expansion

Use the shortcut map

\[
T(n)=
\begin{cases}
n/2,&n\equiv0\pmod 2,\\[2mm]
(3n+1)/2,&n\equiv1\pmod 2.
\end{cases}
\]

For \(k\ge2\), let

\[
A_k(i,j)=
\begin{cases}
1,&T(i)=j\le k,\\
0,&\text{otherwise},
\end{cases}
\qquad
M_k(x)=I_k+xA_k.
\]

Thus row \(i\) of \(M_k\) has its diagonal \(1\), together with an \(x\) in column \(T(i)\) whenever \(T(i)\le k\).

Let \(\mathcal C_k\) denote the set of directed \(T\)-cycles contained in \(\{1,\ldots ,k\}\).

### Theorem 1 — Functional-digraph determinant formula

For every \(k\ge2\),

\[
\boxed{
\det M_k(x)
=
\prod_{C\in\mathcal C_k}
\left(1-(-x)^{|C|}\right).
}
\tag{1}
\]

### Proof

Write the Leibniz expansion

\[
\det M_k(x)
=
\sum_{\sigma\in S_k}
\operatorname{sgn}(\sigma)
\prod_{i=1}^k M_k(i,\sigma(i)).
\]

A term indexed by \(\sigma\) is nonzero only when

\[
\sigma(i)\in\{i,T(i)\}
\qquad (1\le i\le k).
\tag{2}
\]

Consider a nontrivial cycle

\[
(i_1\,i_2\,\cdots\,i_\ell)
\]

in the disjoint-cycle decomposition of \(\sigma\). Because its length is at least two,

\[
\sigma(i_j)\ne i_j,
\]

so condition (2) forces

\[
\sigma(i_j)=T(i_j)=i_{j+1},
\]

with indices interpreted cyclically. Therefore every nontrivial permutation cycle appearing in a nonzero determinant term is an actual \(T\)-cycle.

Conversely, given any collection \(S\subseteq\mathcal C_k\), define \(\sigma_S\) by applying \(T\) on the vertices belonging to cycles in \(S\), and fixing all other vertices. Distinct cycles of a function are disjoint, so \(\sigma_S\) is a permutation and its determinant term is nonzero.

This gives a bijection

\[
\{\text{nonzero determinant permutations}\}
\longleftrightarrow
\mathcal P(\mathcal C_k).
\]

If

\[
L(S)=\sum_{C\in S}|C|,
\]

then

\[
\operatorname{sgn}(\sigma_S)
=
\prod_{C\in S}(-1)^{|C|-1}
=
(-1)^{L(S)-|S|}
\]

and the product of matrix entries is \(x^{L(S)}\). Hence

\[
\det M_k(x)
=
\sum_{S\subseteq\mathcal C_k}
\prod_{C\in S}
\left((-1)^{|C|-1}x^{|C|}\right),
\]

which factors as

\[
\prod_{C\in\mathcal C_k}
\left(1+(-1)^{|C|-1}x^{|C|}\right)
=
\prod_{C\in\mathcal C_k}
\left(1-(-x)^{|C|}\right).
\]

This proves (1). \(\square\)

## 2. The multivariate strengthening

The lack of cancellation becomes even clearer if every row-edge receives an independent variable. Put

\[
M_k(\mathbf y)_{ij}
=
\delta_{ij}+y_i\mathbf 1_{\{T(i)=j\le k\}}.
\]

The same proof gives

\[
\boxed{
\det M_k(\mathbf y)
=
\prod_{C\in\mathcal C_k}
\left(
1-\prod_{i\in C}(-y_i)
\right).
}
\tag{3}
\]

Thus each cycle contributes its own distinct squarefree monomial

\[
\prod_{i\in C}y_i.
\]

There is no hidden collision of determinant terms before specializing all \(y_i\) to the same variable \(x\).

## 3. The trivial-cycle factor and the actual pairing

The cycle

\[
C_0=(1\,2)
\]

is always present. Its factor in (1) is

\[
1-(-x)^2=1-x^2.
\]

Consequently,

\[
\boxed{
\det M_k(x)
=
(1-x^2)\,
Q_k(x),
}
\tag{4}
\]

where

\[
Q_k(x)
=
\prod_{\substack{C\in\mathcal C_k\\ C\ne C_0}}
\left(1-(-x)^{|C|}\right).
\tag{5}
\]

There is a canonical two-term pairing that extracts the factor \(1-x^2\): pair a cycle collection \(S\) not containing \(C_0\) with \(S\cup\{C_0\}\). Their contributions are

\[
w(S)
\quad\text{and}\quad
-x^2w(S),
\]

so their sum is

\[
(1-x^2)w(S).
\]

This pairing proves divisibility by \(1-x^2\). It does **not** prove that the quotient is \(1\); the quotient is exactly the product (5) over nontrivial cycles.

## 4. No-go theorem for the requested involution

A sign-reversing involution proving a polynomial identity must pair terms of exactly opposite polynomial weight:

\[
w(\iota(\sigma))=-w(\sigma).
\tag{6}
\]

Merely reversing the sign of the permutation while changing the power of \(x\) does not cancel the terms.

### Theorem 2 — Involution obstruction

Suppose that \(\mathcal C_k\) contains at least one nontrivial cycle. Then the nonconstant terms of \(Q_k(x)\) cannot be partitioned into weight-preserving, sign-reversing pairs.

### Proof

Let

\[
\mathcal C_k^*=\mathcal C_k\setminus\{C_0\}
\]

and assume \(\mathcal C_k^*\ne\varnothing\). In the subset expansion of \(Q_k\), consider the subset containing **all** nontrivial cycles:

\[
S_*=\mathcal C_k^*.
\]

Its degree is

\[
D_*=\sum_{C\in\mathcal C_k^*}|C|.
\]

Every other subset omits at least one cycle of positive length, and therefore has degree strictly smaller than \(D_*\). Thus the term indexed by \(S_*\) is the unique term of highest degree in \(Q_k\). Its coefficient is \(+1\) or \(-1\).

It has no term of the same degree with the opposite coefficient, so it cannot be paired under (6). \(\square\)

Therefore:

\[
\boxed{
\text{The requested involution exists nontrivially only if }
\mathcal C_k^*=\varnothing.
}
\]

But when \(\mathcal C_k^*=\varnothing\), there is nothing left to pair. In that case the quotient \(Q_k\) is already \(1\).

So the proposed involution is equivalent to cycle exclusion in the following vacuous sense:

\[
\begin{aligned}
&\text{there is a cancellation involution leaving only }
1-x^2\\
&\qquad\Longleftrightarrow
\text{there are no nontrivial determinant terms}\\
&\qquad\Longleftrightarrow
\text{there are no nontrivial Collatz cycles}.
\end{aligned}
\]

It does not supply an independent mechanism for proving the last statement.

## 5. Exact interpretation of the recurrence in \(k\)

Formula (1) also completely explains the attempted induction

\[
\det M_k=\det M_{k-1}.
\]

Any cycle contained in \(\{1,\ldots ,k\}\) but not in \(\{1,\ldots ,k-1\}\) must contain \(k\). Since two cycles of a function cannot share a vertex, at most one new cycle can occur. Therefore

\[
\boxed{
\frac{\det M_k(x)}{\det M_{k-1}(x)}
=
\begin{cases}
1,&k\text{ is not the maximum of a Collatz cycle},\\[2mm]
1-(-x)^\ell,
 &k\text{ is the maximum of a cycle of length }\ell.
\end{cases}
}
\tag{7}
\]

Thus proving \(\det M_k=\det M_{k-1}\) is exactly the same as proving that \(k\) is not the maximum of a nontrivial cycle. The Laplace-expansion difficulties found in the earlier matrix work are not artifacts of the chosen calculation; they are the cycle problem itself. Kauffman–Lopes similarly identify the remaining minor with a closed inverse Collatz orbit. citeturn779723view1turn779723view2

## 6. Arithmetic information from the maximum

Although it does not finish cycle exclusion, the determinant-change interpretation immediately recovers the sharp first congruence restriction.

### Proposition 3

If \(K>2\) is the maximum element of a positive Collatz cycle, then

\[
\boxed{K\equiv8\pmod{18}.}
\tag{8}
\]

### Proof

The maximum \(K\) cannot be odd, because for odd \(K>1\),

\[
T(K)=\frac{3K+1}{2}>K.
\]

Hence \(K\) is even and

\[
T(K)=K/2.
\]

Let \(a\) be the predecessor of \(K\) in the cycle. An even predecessor would be \(2K>K\), impossible. Therefore \(a\) is odd and

\[
a=\frac{2K-1}{3}.
\tag{9}
\]

Let \(b\) be the predecessor of \(a\). The even candidate is

\[
2a=\frac{4K-2}{3}>K
\]

because \(K>2\). It is therefore also impossible, so

\[
b=\frac{2a-1}{3}
\]

must be an integer. This requires

\[
a\equiv2\pmod3.
\]

Using (9),

\[
\frac{2K-1}{3}\equiv2\pmod3,
\]

so

\[
2K-1\equiv6\pmod9,
\qquad
2K\equiv7\pmod9,
\]

and hence

\[
K\equiv8\pmod9.
\]

Since \(K\) is even,

\[
K\equiv8\pmod{18}.
\]

\(\square\)

This explains why the exceptional determinant indices occur in the residue class \(8\bmod18\). Further inverse branching is precisely where the unrestricted cycle problem reappears.

## 7. Why the determinant identity is not the full Collatz conjecture

The full conjecture has two logically separate obstructions:

1. a nontrivial finite cycle;
2. an unbounded nonperiodic orbit.

The determinant identity sees only the first. Paparella’s corrected matrix formulation explicitly distinguishes convergent trajectories, nontrivial cycles, and divergent trajectories, and calls the assertion excluding nontrivial cycles the **aperiodic Collatz conjecture**. citeturn472150view0

Here is a decisive countermodel to any inference from the determinant identity to convergence. Define a different map \(F:\mathbb N\to\mathbb N\) by

\[
F(1)=2,\qquad F(2)=1,\qquad F(n)=n+1\quad(n\ge3).
\]

Its only finite cycle is \(1\leftrightarrow2\). Therefore its corresponding matrices satisfy

\[
\det(I+xA_k^F)=1-x^2
\qquad\text{for every }k.
\]

Nevertheless,

\[
F^m(3)=3+m\longrightarrow\infty.
\]

Thus even the complete family of determinant identities is compatible with divergence.

## 8. The blindness extends to Fredholm determinants

The limitation is not peculiar to finite truncations.

Let \(L_w\) be a weighted transition operator

\[
L_we_n=w_ne_{T(n)}
\]

with weights chosen so that \(L_w\) is trace class. Then

\[
L_w^me_n
=
\left(\prod_{j=0}^{m-1}w_{T^j(n)}\right)e_{T^m(n)},
\]

and therefore

\[
\operatorname{tr}(L_w^m)
=
\sum_{T^m(n)=n}
\prod_{j=0}^{m-1}w_{T^j(n)}.
\]

Only periodic points occur in this trace. Inserting this into the Fredholm determinant formula gives

\[
\boxed{
\det(I-zL_w)
=
\prod_{C\text{ finite cycle}}
\left(
1-z^{|C|}
\prod_{n\in C}w_n
\right).
}
\tag{10}
\]

Every infinite acyclic orbit contributes exactly \(1\). Thus every ordinary trace/Fredholm determinant of this transition type is intrinsically blind to nonperiodic escape.

## 9. The correct matrix quantity for detecting escape

There is, however, a determinant-compatible object that records escape.

Remove the trivial vertices and let

\[
V_k=\{3,\ldots ,k\},
\qquad
C_k(i,j)=\mathbf 1_{\{T(i)=j\}},
\quad i,j\in V_k.
\]

Define the upper-boundary vector

\[
u_k(i)=
\begin{cases}
1,&T(i)>k,\\
0,&\text{otherwise}.
\end{cases}
\]

Assuming cycle exclusion, \(C_k\) is nilpotent. For \(n\in V_k\), define

\[
E_{n,k}(z)
=
z\,e_n^{\mathsf T}(I-zC_k)^{-1}u_k.
\tag{11}
\]

Since

\[
(I-zC_k)^{-1}
=
\sum_{m\ge0}z^mC_k^m,
\]

we obtain

\[
E_{n,k}(z)
=
\sum_{m\ge0}
z^{m+1}e_n^{\mathsf T}C_k^mu_k.
\]

Because the dynamics is deterministic, this polynomial has an especially simple form. Let \(r\) be the first time \(T^r(n)\) leaves \(V_k\). Then

\[
\boxed{
E_{n,k}(z)=
\begin{cases}
z^r,&T^r(n)>k,\\
0,&T^r(n)\in\{1,2\}.
\end{cases}
}
\tag{12}
\]

It is itself a determinant coefficient. By the matrix determinant lemma and \(\det(I-zC_k)=1\),

\[
\boxed{
E_{n,k}(z)
=
z[\lambda]\,
\det\!\left(
I-zC_k+\lambda u_ke_n^{\mathsf T}
\right).
}
\tag{13}
\]

Consequently, the full Collatz conjecture is exactly equivalent to the conjunction

\[
\boxed{
\begin{aligned}
&\det M_k(x)=1-x^2
&&\text{for every }k,\\
&\forall n\ge3\ \exists k\ge n:
E_{n,k}(z)=0.
\end{aligned}
}
\tag{14}
\]

The first line excludes cycles. The second says that each orbit reaches \(\{1,2\}\) before escaping some sufficiently large finite interval.

But (12) also shows why another sign-reversing involution will not prove the second line: when \(E_{n,k}\ne0\), it consists of a **single positive monomial**. There are no competing path terms to cancel.

Moreover, analytic convergence is insufficient. For an unbounded orbit, the first-exit exponent \(r=r(k)\) tends to infinity, so

\[
E_{n,k}(z)=z^{r(k)}\longrightarrow0
\qquad (|z|<1),
\]

even though \(E_{n,k}\) is never eventually zero. What is needed is exact eventual vanishing, not a determinant limit or analytic continuation statement.

# Final assessment

Approach 63 can be completed, but its completed conclusion is a no-go theorem rather than a Collatz proof:

\[
\boxed{
\det M_k(x)
=
(1-x^2)
\prod_{\substack{C\ne(1\,2)\\ \max C\le k}}
\left(1-(-x)^{|C|}\right).
}
\]

The determinant permutations do not possess hidden cancellations. They are already in bijection with subsets of genuine cycles. A sign-reversing involution eliminating nontrivial-cycle terms would therefore be either impossible—if a nontrivial cycle exists—or empty—if none exists.

The remaining full-conjecture statement is the exact nonescape condition in (14). Neither the original determinants nor any trace/Fredholm determinant of the transition operator can establish it, because infinite acyclic trajectories make no closed-walk contribution.