model: GPT-5.6 Pro (Chat mode)
round: 93 -- approach 88, Uniform local-minimum classification
front: proof
sent: 2026-08-17T13:11Z
worked: 175m 4s

---

# Result of the uniform local-minimum attack

Carrying this approach through produces a **uniform and exact classification of all possible \(m\)-cycles**, together with a sharper bound that no longer deteriorates linearly with \(m\). It does **not**, however, yield a valid proof that every classified possibility is impossible.

The obstruction can be stated precisely:

> A uniform exclusion theorem for the congruence derived below is equivalent to proving that no nontrivial positive Collatz cycle exists.

Thus asserting the final nonvanishing without a new arithmetic argument would merely restate the cycle conjecture. Moreover, even complete cycle exclusion would not rule out an unbounded orbit, so this cycle-only approach cannot by itself prove the full Collatz conjecture.

Hercher’s peer-reviewed result proves that a nontrivial cycle must have at least \(92\) local minima. A June 14, 2026 corrigendum repairs an error in the proof of the principal block estimate while retaining the stated result. citeturn261650view0turn801866view0turn918507view0 A June 2026 preprint claims an extension through \(m=95\), but it should presently be treated as a preprint rather than as part of the established baseline. citeturn153825search0

What follows is the complete derivation and the exact remaining theorem.

---

## 1. Local-minimum blocks

Use the shortcut Collatz map

\[
C(n)=
\begin{cases}
n/2,&n\equiv0\pmod 2,\\[1mm]
(3n+1)/2,&n\equiv1\pmod 2.
\end{cases}
\]

Suppose a positive periodic orbit has \(m\) local minima, written in cyclic order as

\[
n_0,n_1,\ldots,n_{m-1},\qquad n_m=n_0.
\]

Starting from \(n_i\), let

\[
k_i\geq1
\]

be the number of consecutive odd shortcut steps, and let

\[
\ell_i\geq1
\]

be the number of subsequent even shortcut steps before the next local minimum \(n_{i+1}\).

Set

\[
K=\sum_{i=0}^{m-1}k_i,\qquad
L=\sum_{i=0}^{m-1}\ell_i,\qquad
A=K+L.
\]

Thus \(K\) is the number of odd members of the cycle, \(L\) is the number of even members, and \(A\) is the shortcut period.

Because the first \(k_i\) entries beginning at \(n_i\) are odd,

\[
n_i+1=2^{k_i}q_i
\]

for some odd positive integer \(q_i\). After the \(k_i\) odd steps,

\[
C^{k_i}(n_i)=3^{k_i}q_i-1.
\]

Following this by \(\ell_i\) divisions by two gives

\[
3^{k_i}q_i-1=2^{\ell_i}n_{i+1}.
\]

Substituting \(q_i=(n_i+1)/2^{k_i}\) yields the exact block equation

\[
\boxed{
2^{k_i+\ell_i}n_{i+1}
=
3^{k_i}n_i+3^{k_i}-2^{k_i}.
}
\tag{1}
\]

This is the usual local-minimum equation.

---

## 2. Shifting the local minima

The useful simplification is obtained by defining

\[
y_i=n_i+1.
\]

Equation (1) becomes

\[
\boxed{
2^{k_i+\ell_i}y_{i+1}
=
3^{k_i}y_i+2^{k_i}(2^{\ell_i}-1).
}
\tag{2}
\]

After division by \(2^{k_i+\ell_i}\),

\[
\boxed{
y_{i+1}
=
\frac{3^{k_i}}{2^{k_i+\ell_i}}y_i
+
1-2^{-\ell_i}.
}
\tag{3}
\]

This has two advantages.

First, the additive term depends only on the length \(\ell_i\) of the descending part. Second, there is now exactly one additive term for each local minimum, rather than one term for each odd member.

Define the prefix sums

\[
A_i=\sum_{h=0}^{i-1}(k_h+\ell_h),
\qquad
K_i=\sum_{h=0}^{i-1}k_h,
\]

with \(A_0=K_0=0\). Thus \(A_m=A\) and \(K_m=K\).

Also define

\[
D=2^A-3^K.
\tag{4}
\]

Composing the \(m\) equations (2) gives the following identity.

## Theorem 1 — Local-minimum compression

For every cyclic block vector

\[
(k_0,\ell_0),\ldots,(k_{m-1},\ell_{m-1}),
\]

one has

\[
2^A y_m=3^K y_0+E,
\]

where

\[
\boxed{
E=
\sum_{i=0}^{m-1}
(2^{\ell_i}-1)
\,2^{A_i+k_i}
\,3^{K-K_{i+1}}.
}
\tag{5}
\]

Consequently, if the blocks form a cycle, then

\[
\boxed{
D(n_0+1)=E.
}
\tag{6}
\]

### Proof

The recurrence has the form

\[
2^{k_i+\ell_i}y_{i+1}=3^{k_i}y_i+c_i,
\qquad
c_i=2^{k_i}(2^{\ell_i}-1).
\]

When the equations are composed, the contribution \(c_i\) is multiplied by the powers of \(2\) from the preceding blocks and the powers of \(3\) from the following blocks. Hence its contribution is

\[
c_i2^{A_i}3^{K-K_{i+1}}
=
(2^{\ell_i}-1)2^{A_i+k_i}3^{K-K_{i+1}}.
\]

Summing gives (5). For a cycle, \(y_m=y_0\), so

\[
(2^A-3^K)y_0=E.
\]

Since \(y_0=n_0+1\), this is (6). ∎

The original unshifted numerator is

\[
S=
\sum_{i=0}^{m-1}
(3^{k_i}-2^{k_i})
\,2^{A_i}
\,3^{K-K_{i+1}},
\tag{7}
\]

and equation (1) gives

\[
Dn_0=S.
\tag{8}
\]

Comparing (6) and (8) shows the identity

\[
\boxed{E=S+D.}
\tag{9}
\]

Thus \(D\mid E\) and \(D\mid S\) are equivalent.

---

## 3. Exact converse

The divisibility condition is not merely necessary.

## Theorem 2 — Uniform local-minimum classification

Let \(k_i,\ell_i\geq1\), define \(K,L,A,D,E\) by (4) and (5), and form the shortcut parity word

\[
w=
1^{k_0}0^{\ell_0}
1^{k_1}0^{\ell_1}
\cdots
1^{k_{m-1}}0^{\ell_{m-1}}.
\]

Then \(w\) represents a positive Collatz cycle if and only if

\[
\boxed{
D>0
\quad\text{and}\quad
D\mid E.
}
\tag{10}
\]

In that case the first local minimum is

\[
\boxed{
n_0=\frac ED-1=\frac SD.
}
\tag{11}
\]

### Proof

Necessity follows from Theorem 1.

For sufficiency, assume \(D>0\) and \(D\mid E\). By (9), \(D\mid S\), so put

\[
n_0=\frac SD.
\]

Every term in (7) is positive, so \(n_0\) is a positive integer.

For a prescribed shortcut parity word of length \(A\) containing \(K\) odd steps, the formal affine composition is

\[
C^A(x)=\frac{3^Kx+S}{2^A}.
\]

The parity-vector correspondence says that exactly one residue class modulo \(2^A\) realizes the prescribed word; that class is determined by

\[
3^Kx+S\equiv0\pmod{2^A}.
\tag{12}
\]

But \(Dn_0=S\) gives

\[
3^Kn_0+S=2^An_0,
\]

so (12) holds. Therefore \(n_0\) realizes the prescribed parity word and

\[
C^A(n_0)
=
\frac{3^Kn_0+S}{2^A}
=n_0.
\]

Hence it lies on the required positive cycle. ∎

This theorem is uniform in \(m\). It completely classifies the candidates without invoking a separate computation for each value of \(m\).

What it does **not** do is prove that the divisibility in (10) is impossible.

---

## 4. A weighted zero-sum formulation

Because \(D\) is coprime to \(6\), powers of \(2\) and \(3\) are units modulo \(D\). Define

\[
z_i=2^{A_i}3^{-K_i}\pmod D.
\tag{13}
\]

Then

\[
z_0=1,
\qquad
z_m=2^A3^{-K}\equiv1\pmod D,
\]

and

\[
z_{i+1}
=
z_i\,2^{k_i+\ell_i}3^{-k_i}.
\tag{14}
\]

Normalize the \(i\)-th summand in \(E\) by \(3^K\):

\[
\begin{aligned}
&(2^{\ell_i}-1)
2^{A_i+k_i}3^{-K_{i+1}}
\\
&\qquad
=
(1-2^{-\ell_i})
2^{A_i+k_i+\ell_i}3^{-K_{i+1}}
\\
&\qquad
=
(1-2^{-\ell_i})z_{i+1}.
\end{aligned}
\]

Therefore Theorem 2 is equivalent to the following statement.

## Corollary 3 — Local-minimum zero-sum criterion

The block word represents a positive cycle if and only if \(D>0\) and

\[
\boxed{
\sum_{i=0}^{m-1}
(1-2^{-\ell_i})z_{i+1}
\equiv0\pmod D.
}
\tag{15}
\]

Thus the uniform cycle problem is an \(m\)-term weighted zero-sum problem on the closed multiplicative polygon

\[
z_0,z_1,\ldots,z_m=z_0
\]

in the unit group \((\mathbb Z/D\mathbb Z)^\times\).

This is a substantially cleaner formulation than the original \(K\)-term carry: there is now exactly one term for each local minimum.

---

## 5. There remains only one global congruence

One might hope that the \(m\) block equations impose \(m\) independent divisibility conditions, so that increasing \(m\) eventually overdetermines the cycle. They do not.

Consider the cyclic matrix \(M\) defined by

\[
(M y)_i
=
-3^{k_i}y_i+2^{k_i+\ell_i}y_{i+1},
\]

where indices are taken modulo \(m\). Equation (2) is

\[
My=c,
\qquad
c_i=2^{k_i}(2^{\ell_i}-1).
\]

## Theorem 4 — Smith-normal-form collapse

For \(m\geq2\),

\[
\boxed{
\operatorname{SNF}(M)
=
\operatorname{diag}(1,\ldots,1,D).
}
\tag{16}
\]

### Proof

The determinant has only the two cyclic permutation contributions, so

\[
|\det M|=|2^A-3^K|=D.
\]

Deleting the last row and the last column gives a triangular minor whose absolute value is

\[
3^{K-k_{m-1}}.
\]

Deleting the last row and the first column gives a triangular minor whose absolute value is

\[
2^{A-k_{m-1}-\ell_{m-1}}.
\]

These two minors are coprime. Hence the greatest common divisor of all \((m-1)\)-rowed minors is \(1\). Therefore the first \(m-1\) Smith invariant factors are all \(1\), while their full product is \(D\). This gives (16). ∎

Consequently,

\[
\mathbb Z^m/M\mathbb Z^m
\cong
\mathbb Z/D\mathbb Z.
\]

There are not \(m\) accumulating integral obstructions. There is exactly one: the congruence (15).

This explains structurally why increasing the number of local minima does not automatically make the block system inconsistent.

---

## 6. The hardest short-block regime

The long-block arguments become strongest when some \(k_i\) or \(\ell_i\) is large. A uniform proof must also handle the opposite case, in which the blocks remain short while their number tends to infinity.

The extremal version is

\[
\ell_i=1
\qquad\text{for every }i.
\tag{17}
\]

Then every decreasing passage consists of exactly one even step. Equation (2) becomes

\[
2^{k_i+1}y_{i+1}
=
3^{k_i}y_i+2^{k_i}.
\]

Write

\[
y_i=2^{k_i}q_i,
\]

where \(q_i\) is odd. The equation simplifies to

\[
\boxed{
3^{k_i}q_i+1
=
2^{k_{i+1}+1}q_{i+1}.
}
\tag{18}
\]

Thus the all-short-descents problem is the cyclic exponential Diophantine system

\[
\begin{aligned}
3^{k_0}q_0+1&=2^{k_1+1}q_1,\\
3^{k_1}q_1+1&=2^{k_2+1}q_2,\\
&\ \vdots\\
3^{k_{m-1}}q_{m-1}+1&=2^{k_0+1}q_0.
\end{aligned}
\tag{19}
\]

In accelerated odd-to-odd notation, condition (17) says that every valuation belongs to

\[
\{1,2\}.
\]

The local minimum occurs at each valuation \(2\). Hence this already contains arbitrarily long binary valuation words with near-critical frequencies. No \(k_i\) or \(\ell_i\) is forced to grow with \(m\).

This is the precise reason a “choose one long block” argument cannot be uniform.

There are also exact local congruences. From the definition of \(k_i\),

\[
v_2(n_i+1)=k_i.
\tag{20}
\]

Reducing (1) modulo \(3^{k_i}\) gives

\[
2^{\ell_i}n_{i+1}\equiv-1\pmod{3^{k_i}},
\]

or

\[
\boxed{
n_{i+1}\equiv-2^{-\ell_i}\pmod{3^{k_i}}.
}
\tag{21}
\]

Thus every local minimum is constrained from the future by a power of \(2\) and from the past by a power of \(3\). These congruences are always locally compatible by the Chinese remainder theorem; their global synchronization is exactly the divisibility condition (15).

---

## 7. A genuinely uniform Archimedean bound

There is one further improvement that removes the linear dependence on \(m\).

From (1),

\[
\frac{n_{i+1}}{n_i}
=
\frac{3^{k_i}}{2^{k_i+\ell_i}}
\left(
1+
\frac{1-(2/3)^{k_i}}{n_i}
\right).
\]

Multiplying around the cycle gives

\[
\boxed{
\frac{2^A}{3^K}
=
\prod_{i=0}^{m-1}
\left(
1+
\frac{1-(2/3)^{k_i}}{n_i}
\right).
}
\tag{22}
\]

Let

\[
\alpha=\log_2 3,
\qquad
\Lambda=A\log2-K\log3.
\]

Taking logarithms and using \(\log(1+x)<x\),

\[
0<\Lambda
<
\sum_{i=0}^{m-1}\frac1{n_i}.
\tag{23}
\]

Current certified computation verifies convergence through \(2^{71}\). Therefore every member of a hypothetical nontrivial cycle must exceed

\[
X=2^{71}.
\]

citeturn729511search0

The local minima are distinct odd integers. After arranging them increasingly,

\[
n_{(r)}\geq X+1+2r,
\qquad
0\leq r<m.
\]

Consequently,

\[
\sum_{i=0}^{m-1}\frac1{n_i}
\leq
\sum_{r=0}^{m-1}\frac1{X+1+2r}.
\]

The integral estimate gives

\[
\sum_{r=0}^{m-1}\frac1{X+1+2r}
\leq
\frac1{X+1}
+
\frac12
\log\left(1+\frac{2m}{X+1}\right).
\tag{24}
\]

Because each \(\ell_i\geq1\),

\[
m\leq L.
\]

Moreover, every nontrivial odd cycle member is at least \(3\), so multiplication over all odd steps gives \(A<2K\). Hence \(L=A-K<K\), and therefore \(m<K\).

Combining these facts gives a bound independent of the specified value of \(m\):

## Theorem 5 — Uniform rational-slope window

Every nontrivial positive Collatz cycle would satisfy

\[
\boxed{
0<
\frac AK-\log_2 3
<
\frac{1}{K\log2}
\left[
\frac1{X+1}
+
\frac12
\log\left(1+\frac{2K}{X+1}\right)
\right].
}
\tag{25}
\]

As \(K\to\infty\), the right-hand side is

\[
O\!\left(\frac{\log K}{K}\right).
\]

This is a genuine uniform replacement for a bound proportional to \(m/X\).

It is nevertheless not enough. Rational approximations \(A/K\) to \(\log_2 3\) can have errors of order \(K^{-2}\), far smaller than \((\log K)/K\). Thus (25) admits infinitely many potential rational slopes and cannot produce a contradiction by continued fractions alone.

Hercher’s fixed-\(m\) proof instead iterates much sharper intervals until its lower bound for \(K\) exceeds the Simons–de Weger upper bound

\[
K<1.4784\,m\,\alpha^m.
\]

The final comparison is explicitly the step that proves \(m\leq91\) impossible. citeturn801866view1 The paper also gives an \(m\)-independent slope estimate, but uses it to improve successive lower bounds on \(K\), not to exclude every \(m\). citeturn801866view2

---

## 8. Why a universal coprimality theorem fails

The Christoffel extremal word has a strong coprimality property, but that property does not extend to all local-minimum words.

Take

\[
(k_0,k_1,k_2,k_3)=(3,1,1,1),
\qquad
(\ell_0,\ell_1,\ell_2,\ell_3)=(1,1,1,1).
\]

Then

\[
K=6,\qquad L=4,\qquad A=10,
\]

so

\[
D=2^{10}-3^6=1024-729=295.
\]

The compressed numerator is

\[
\begin{aligned}
E
&=
2^3 3^3
+
2^5 3^2
+
2^7 3
+
2^9\\
&=216+288+384+512\\
&=1400.
\end{aligned}
\]

Hence

\[
\gcd(D,E)=\gcd(295,1400)=5.
\]

The word is primitive, but its numerator is not coprime to its denominator. Nevertheless,

\[
295\nmid1400,
\]

so it is not a cycle.

Therefore the tempting universal statement

\[
\gcd(D,E)=1
\]

is false. A successful theorem must prove only that the common divisor is **strictly smaller than \(D\)**, not that it is always \(1\).

---

## 9. The exact missing theorem

The uniform cycle theorem required by this approach can now be stated without ambiguity.

## Uniform local-minimum nonvanishing

For every \(m\geq1\) and every two vectors of positive integers

\[
\mathbf k=(k_0,\ldots,k_{m-1}),
\qquad
\boldsymbol\ell=(\ell_0,\ldots,\ell_{m-1}),
\]

put

\[
K=\sum k_i,\qquad
L=\sum\ell_i,\qquad
D=2^{K+L}-3^K
\]

and define \(E\) by (5).

If the associated cyclic block word is primitive and is not the trivial block

\[
(k_0,\ell_0)=(1,1),
\]

then

\[
\boxed{
D>0
\quad\Longrightarrow\quad
E\not\equiv0\pmod D.
}
\tag{ULMN}
\]

By Theorem 2:

\[
\boxed{
\text{\((\mathrm{ULMN})\) is equivalent to the nonexistence of nontrivial positive Collatz cycles.}
}
\]

Hercher proves this statement for \(m\leq91\). The recent preprint claims it through \(m\leq95\). Neither supplies an argument uniform over unbounded \(m\). citeturn261650view0turn153825search0

A non-circular sufficient strengthening would be a **uniform gcd gap**: prove that there exist constants \(\eta>0\) and \(C>0\) such that

\[
\boxed{
\gcd(D,E)
\leq
C\exp\bigl((\log3-\eta)K\bigr)
}
\tag{26}
\]

for every primitive nontrivial block word.

A lower bound for the linear form

\[
A\log2-K\log3
\]

gives, effectively,

\[
D
=
3^K\left(e^{A\log2-K\log3}-1\right)
\geq
3^K K^{-C_0}
=
\exp\bigl((\log3-o(1))K\bigr).
\tag{27}
\]

Thus (26) and (27) would imply

\[
\gcd(D,E)<D
\]

for all sufficiently large \(K\), excluding divisibility; the finite remainder could then be checked exactly.

No estimate of the strength (26), uniform in the number and placement of the local-minimum blocks, follows from the present continued-fraction, sparse-resultant, or block-classification arguments.

---

## 10. The independent unbounded-orbit problem

Even a proof of \((\mathrm{ULMN})\) would establish only that no nontrivial cycle exists.

A Collatz counterexample could instead have an unbounded trajectory. Hercher explicitly separates these two possible failure modes and states that the \(m\)-cycle analysis concerns only the periodic case. citeturn261650view0

A sufficient no-escape theorem would be

\[
\boxed{
\forall n>1\quad
\exists r\geq1
\quad
C^r(n)<n.
}
\tag{NE}
\]

Strong induction would then imply that every positive integer reaches \(1\).

Nothing in the local-minimum cycle equation proves \((\mathrm{NE})\). The key divisibility

\[
2^A-3^K\mid E
\]

arises only because the endpoint equals the starting point. It has no analogue for an arbitrary unbounded orbit segment.

---

# Final status

The uniform local-minimum approach yields three rigorous advances:

1. The usual \(K\)-term cycle numerator compresses exactly to the \(m\)-term numerator

   \[
   E=
   \sum_i
   (2^{\ell_i}-1)2^{A_i+k_i}3^{K-K_{i+1}}.
   \]

2. Positive \(m\)-cycles are classified uniformly by the single condition

   \[
   2^{K+L}-3^K\mid E.
   \]

3. Distinctness of the local minima gives the uniform slope estimate

   \[
   \frac AK-\log_2 3
   =
   O\!\left(\frac{\log K}{K}\right),
   \]

   with the explicit bound (25).

The remaining nonvanishing statement \((\mathrm{ULMN})\) is not a routine final lemma: it is exactly the assertion that no nontrivial positive cycle exists. The short-block system (19), in which all descending runs have length \(1\), prevents the fixed-\(m\) arguments from becoming uniform through a forced long block.

Accordingly, **a valid full proof of the Collatz conjecture has not been completed by Approach 88**. The approach has instead produced an exact uniform classification, a sharper \(m\)-free analytic bound, and a precise arithmetic frontier: a uniform gcd gap for the compressed local-minimum numerator. Even after that frontier is crossed, a separate proof of no escape to infinity remains necessary.