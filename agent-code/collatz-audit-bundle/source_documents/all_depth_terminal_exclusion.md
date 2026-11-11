# Equal-time sparsity closes the target-1 terminal obstruction

**Date:** 17 August 2026  
**Status:** all-depth computer-assisted theorem; not a full proof of Collatz.

## 1. Statement

For the accelerated negative Collatz map

\[
U_-(m)=\frac{3m-1}{2^{v_2(3m-1)}}
\]

and a valuation word \(a=(a_0,\ldots,a_{r-1})\), put

\[
A_k=\sum_{i<k}a_i,
\qquad C_0=0,
\qquad C_{k+1}=3C_k+2^{A_k}.
\]

Then

\[
\boxed{
3^r\mid C_r+2^{A_r},
\qquad
2^{A_k}<3^k\quad(1\le k\le r)
\Longrightarrow
 a_0=\cdots=a_{r-1}=1.
}
\]

Equivalently, the only target-\(1\) terminal/barrier words are the all-ones
words \(1^r\). This replaces the preceding finite exclusion through length
\(10^{10}\) by an all-depth result.

## 2. Equal-time translation

Define the negative shortcut map

\[
S_-(x)=
\begin{cases}
x/2,&x\text{ even},\\
(3x-1)/2,&x\text{ odd}.
\end{cases}
\]

Let \(s_k(x)\) be the number of odd inputs in the first \(k\) shortcut
steps. Congruence modulo \(2^k\) fixes the first \(k\) parity bits, and

\[
S_-^k(x+q2^k)=S_-^k(x)+q3^{s_k(x)}. \tag{2.1}
\]

The proof is immediate by following the common branch word: the difference is
divided by \(2\) at each step and multiplied by \(3\) at each odd step.

## 3. Finite-orbit shell sparsity

Let

\[
x_0,x_1,\ldots,x_L
\]

be a positive \(S_-\)-trajectory with no repeated state. Put

\[
N_k=\#\{i:2^k\le x_i<2^{k+1}\}
\]

and

\[
B_k=
\min_{0\le t\le k}
\left(
\sum_{o=t+1}^{k}\binom{k}{o}
+
\sum_{o=0}^{t}3^o
\right). \tag{3.1}
\]

### Theorem 3.1

\[
\boxed{N_k\le\min\{2^k,B_k+k\}.} \tag{3.2}
\]

### Proof

Discard the last \(k\) positions of the finite trajectory. For every earlier
point in the shell write

\[
x_i=2^k+u_i,
\qquad0\le u_i<2^k.
\]

There are exactly \(\binom{k}{o}\) residues modulo \(2^k\) whose first
\(k\) parity bits contain \(o\) odd inputs. Treat the words with \(o>t\)
as exceptional.

For a word of weight \(o\le t\), the affine formula is

\[
2^kS_-^k(u)=3^ou-C,
\qquad C\ge0.
\]

Thus

\[
0\le S_-^k(u)<3^o.
\]

For a fixed \(o\), there are at most \(3^o\) possible base endpoints. If two
earlier shell points had both the same weight and the same base endpoint,
(2.1) would give equal \(k\)-step orbit endpoints, contradicting
nonrepetition. Adding the exceptional binomial tail and the final \(k\)
positions proves (3.2). \(\square\)

## 4. Universal reciprocal mass

Every point in the \(k\)-th shell contributes at most

\[
\frac1{3\cdot2^k-1}.
\]

Therefore

\[
\sum_{i=0}^{L}\frac1{3x_i-1}
\le
\sum_{k=0}^{\infty}
\frac{\min(2^k,B_k+k)}{3\cdot2^k-1}. \tag{4.1}
\]

The exact checker evaluates every \(B_k\) for \(0\le k\le1000\) and rounds
each rational summand upward to a multiple of \(10^{-15}\). The resulting
rigorous partial upper bound is

\[
10\,788\,901\,977\,820\,654\cdot10^{-15}. \tag{4.2}
\]

For \(k\ge1001\), take \(t=\lfloor0.61k\rfloor\). The exact integer
inequalities

\[
3^{61}<2^{97},
\qquad
100^{100}<2^{97}61^{61}39^{39}
\]

give a geometric and binomial exponent below \(0.97k\). The remaining tail
is less than \(1.3\cdot10^{-7}\). Hence

\[
\boxed{
\sum_{i=0}^{L}\frac1{3x_i-1}<10.789.
} \tag{4.3}
\]

## 5. Fixed-target seed compression

Suppose a simple exact accelerated trajectory

\[
m_0\longmapsto\cdots\longmapsto m_r=y
\]

satisfies \(2^{A_j}<3^j\) at every accelerated prefix. Expanding to shortcut
steps and multiplying the exact ratios gives

\[
\frac{y}{m_0}
=
\frac{3^r}{2^{A_r}}
\prod_{j=0}^{r-1}
\left(1-\frac1{3m_j}\right). \tag{5.1}
\]

Since \(3^r/2^{A_r}>1\),

\[
\log\frac{m_0}{y}
<
-\sum_j\log\left(1-\frac1{3m_j}\right)
\le
\sum_j\frac1{3m_j-1}
<10.789. \tag{5.2}
\]

Consequently

\[
\boxed{m_0<e^{10.789}y<3^{11}y=177\,147y.} \tag{5.3}
\]

This is a length-independent finite reduction for every fixed target \(y\).

## 6. Target 1

For \(y=1\), every candidate seed is below \(177\,147\). The exact
accelerated checker searches every positive odd seed below \(200\,000\) and
stops only at a first hit of \(1\), a repeated state, or a barrier failure.
Its certified output is

```text
seed cap: 200000
status counts: {'hit_1': 1, 'cycle': 2, 'barrier_failure': 99997}
terminal hits: [(1, 0)]
longest resolved prefix: (83, 149345)
CERTIFICATE PASSED
```

An independent shortcut-step implementation gives the same partition and a
longest resolved shortcut prefix of \(132\) steps.

The only seed is therefore \(m_0=1\). Since \(U_-(1)=1\) with exact
valuation \(1\), the word is \(1^r\), proving the theorem.

## 7. Target 7

The same finite-target theorem gives \(m_0<3^{11}\cdot7\). Exact search finds
only

\[
5\xrightarrow{1}7.
\]

Because \(5\leftrightarrow7\) is the negative-map cycle with valuation word
\((1,2)\), every longer barrier word ending at \(7\) is exactly

\[
(1,2)^N1.
\]

Thus the target-\(7\) periodic shadow language is also classified at all
depths.

## 8. Uniform positive-orbit distortion

For an infinite injective orbit of the positive shortcut Collatz map, the
same equal-time argument has no final-position loss. Restricting to odd orbit
points gives

\[
\sum_{x_i\text{ odd}}\frac1{3x_i}<7.873. \tag{8.1}
\]

If

\[
q_k=\frac{3^{s_k}}{2^k},
\qquad
H_k=\frac{x_k}{q_k},
\]

then

\[
\frac{H}{n}
=
\prod_{x_i\text{ odd}}
\left(1+\frac1{3x_i}\right)
<e^{7.873}<e^8<2^{12}.
\]

Hence every hypothetical divergent orbit satisfies

\[
\boxed{H<4096n.} \tag{8.2}
\]

Let \(E_r(X_r)\) be the least total accelerated exponent of a positive
\(r\)-step inverse path to the actual endpoint \(X_r\), while \(A_r\) is the
total exponent of the actual path. For a globally least divergent
counterexample, (8.2) implies

\[
\boxed{E_r(X_r)\ge A_r-11\qquad(r\ge0).} \tag{8.3}
\]

Indeed, a positive inverse path saving at least twelve exponent units would
start below \(H/2^{12}<n\), contradicting coalescence minimality.

## 9. Revised proof frontier

The target-\(1\) all-depth exclusion problem is now closed. The remaining
unbounded-orbit obstruction is a positive ordinary integer whose actual path
stays within eleven exponent units of the least positive inverse slope at
every depth. After minimizing real height in its coalescence class, the
hypothetical path is an exact slope-geodesic in every finite inverse fiber.

A sufficient next theorem is

\[
\boxed{
\text{Every infinite positive ordinary slope-geodesic either reaches }1
\text{ or eventually admits a 12-unit inverse saving.}
}
\]

Positive cycles remain separate because their complete-period coefficient is
on the opposite side of the barrier.
