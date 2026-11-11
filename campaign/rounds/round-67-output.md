model: GPT-5.6 Pro (Chat mode)
round: 67 -- approach 62, A dynamical zeta function with only the trivial Euler factor
front: proof
sent: 2026-08-16T09:11Z
worked: 60m 54s

---

# Dynamical zeta route: exact determinant formula and the remaining obstruction

Carrying this program through produces a rigorous dynamical zeta function, a genuine trace-class Fredholm determinant, and an exact operator-theoretic criterion for the full Collatz conjecture. It does **not**, however, produce the requested determinant evaluation: proving that evaluation is precisely equivalent to excluding all nontrivial positive cycles. The natural Green-kernel supplement similarly reduces nonescape to the summability of an explicit positive potential, but establishing that summability already requires an all-depth escape theorem.

I will separate what is proved from the two places where the argument would otherwise become circular.

Throughout, use the shortcut map

\[
T(n)=
\begin{cases}
n/2,&n\equiv0\pmod2,\\[1mm]
(3n+1)/2,&n\equiv1\pmod2.
\end{cases}
\]

Thus the trivial periodic orbit is

\[
1\longmapsto2\longmapsto1.
\]

---

## 1. The positive-integer Artin–Mazur zeta function

Let

\[
a_k:=\#\operatorname{Fix}(T^k)
=\#\{n\ge1:T^k(n)=n\}.
\]

A parity word \(w=(w_0,\ldots,w_{k-1})\in\{0,1\}^k\), with weight

\[
m=w_0+\cdots+w_{k-1},
\]

determines an affine composition

\[
T_w(x)=\frac{3^m x+\Phi(w)}{2^k},
\]

where

\[
\Phi(w)
=
\sum_{\substack{0\le j<k\\w_j=1}}
2^j3^{w_{j+1}+\cdots+w_{k-1}}.
\tag{1.1}
\]

Consequently, a fixed point with parity word \(w\) must be

\[
x_w=\frac{\Phi(w)}{2^k-3^m}.
\tag{1.2}
\]

Since \(2^k\neq3^m\) for \(k>0\), every parity word produces at most one rational fixed point. Therefore

\[
a_k\le 2^k.
\tag{1.3}
\]

The same affine formula and the corresponding exact integer-cycle criterion appear in the existing parity-word framework. fileciteturn3file0L23-L55 fileciteturn3file0L73-L83

### Definition 1.1

The positive-integer dynamical zeta function is

\[
\boxed{
\zeta_T(z)
:=
\exp\left(
\sum_{k=1}^{\infty}\frac{a_k}{k}z^k
\right).
}
\tag{1.4}
\]

By (1.3), this converges at least for \(|z|<1/2\).

Here the Euler product must be taken over **primitive periodic orbits**, not over all repetitions of cycles. Let \(\mathscr P\) denote the set of primitive positive-integer periodic orbits, and let \(\ell(\mathcal O)\) be the primitive period of \(\mathcal O\).

### Proposition 1.2

For \(|z|<1/2\),

\[
\boxed{
\zeta_T(z)
=
\prod_{\mathcal O\in\mathscr P}
\left(1-z^{\ell(\mathcal O)}\right)^{-1}.
}
\tag{1.5}
\]

#### Proof

Every primitive orbit of length \(\ell\) contributes all its \(\ell\) points to \(\operatorname{Fix}(T^k)\) precisely when \(\ell\mid k\). Hence

\[
a_k
=
\sum_{\substack{\mathcal O\in\mathscr P\\
\ell(\mathcal O)\mid k}}
\ell(\mathcal O).
\]

Therefore

\[
\begin{aligned}
\log \zeta_T(z)
&=
\sum_{k\ge1}\frac{z^k}{k}
\sum_{\ell(\mathcal O)\mid k}\ell(\mathcal O)\\
&=
\sum_{\mathcal O\in\mathscr P}
\sum_{r\ge1}
\frac{z^{r\ell(\mathcal O)}}{r}\\
&=
-\sum_{\mathcal O\in\mathscr P}
\log\left(1-z^{\ell(\mathcal O)}\right).
\end{aligned}
\]

Exponentiating gives (1.5). ∎

The trivial orbit has length \(2\), so its Euler factor is

\[
\boxed{(1-z^2)^{-1}.}
\tag{1.6}
\]

Thus the desired zeta identity is

\[
\boxed{\zeta_T(z)=\frac1{1-z^2}.}
\tag{1.7}
\]

As a formal consequence of Proposition 1.2, (1.7) is already equivalent to saying that \(1\leftrightarrow2\) is the only positive-integer periodic orbit. The determinant construction below makes this equivalence analytic and trace-theoretic, but does not make it easier by itself.

---

## 2. A genuine trace-class Collatz operator

Let

\[
\mathcal H=\ell^2(\mathbb N).
\]

Define the Koopman composition operator

\[
(Cf)(n)=f(Tn).
\tag{2.1}
\]

Every \(m\) has at most two positive predecessors:

\[
2m
\]

and, when it is integral,

\[
\frac{2m-1}{3}.
\]

Therefore, writing \(d(m)=\#T^{-1}(m)\le2\),

\[
\|Cf\|_2^2
=
\sum_{n\ge1}|f(Tn)|^2
=
\sum_{m\ge1}d(m)|f(m)|^2
\le 2\|f\|_2^2.
\tag{2.2}
\]

Thus

\[
\|C\|\le\sqrt2.
\]

For \(0<t<1\), let \(M_t\) be the diagonal operator

\[
(M_tf)(n)=t^n f(n).
\tag{2.3}
\]

It is trace class because

\[
\|M_t\|_1=\sum_{n\ge1}t^n=\frac{t}{1-t}.
\tag{2.4}
\]

Define

\[
\boxed{L_t:=M_tC.}
\tag{2.5}
\]

Then \(L_t\) is trace class.

For \(k\ge1\), put

\[
S_k(n):=\sum_{j=0}^{k-1}T^j(n).
\tag{2.6}
\]

A direct induction gives

\[
(L_t^k f)(n)
=
t^{S_k(n)}f(T^k n).
\tag{2.7}
\]

### Proposition 2.1: exact trace formula

For every \(k\ge1\),

\[
\boxed{
\operatorname{tr}(L_t^k)
=
\sum_{\substack{n\ge1\\T^k n=n}}
t^{S_k(n)}.
}
\tag{2.8}
\]

#### Proof

In the standard basis \(e_n\),

\[
(L_t^k e_n)(n)
=
t^{S_k(n)}
\mathbf 1_{\{T^kn=n\}}.
\]

Since \(L_t^k\) is trace class, its trace is the sum of its diagonal entries. ∎

Thus there is no symbolic or probabilistic contamination: the trace counts exactly the positive-integer periodic points, with a strictly positive height weight.

---

## 3. Fredholm determinant and weighted Euler product

Define

\[
\boxed{
\mathcal D_t(z):=\det(I-zL_t).
}
\tag{3.1}
\]

Because \(L_t\) is trace class, \(\mathcal D_t(z)\) is an entire function of \(z\). Near \(z=0\),

\[
\log \mathcal D_t(z)
=
-\sum_{k=1}^{\infty}
\frac{z^k}{k}\operatorname{tr}(L_t^k).
\tag{3.2}
\]

For a primitive orbit \(\mathcal O\), define its additive height

\[
H(\mathcal O):=\sum_{n\in\mathcal O}n.
\tag{3.3}
\]

### Theorem 3.1: weighted Collatz determinant formula

As an analytic identity near \(z=0\),

\[
\boxed{
\mathcal D_t(z)
=
\prod_{\mathcal O\in\mathscr P}
\left(
1-z^{\ell(\mathcal O)}t^{H(\mathcal O)}
\right).
}
\tag{3.4}
\]

The Fredholm determinant is the entire continuation of this local Euler product.

#### Proof

Suppose \(\mathcal O\) has primitive length \(\ell\). For \(k=r\ell\), each of its \(\ell\) points contributes

\[
t^{rH(\mathcal O)}
\]

to \(\operatorname{tr}(L_t^{r\ell})\). Its total contribution to (3.2) is therefore

\[
-\sum_{r\ge1}
\frac{z^{r\ell}}{r\ell}
\ell t^{rH(\mathcal O)}
=
-\sum_{r\ge1}
\frac{
(z^\ell t^{H(\mathcal O)})^r
}{r}.
\]

This equals

\[
\log\left(
1-z^\ell t^{H(\mathcal O)}
\right).
\]

Summing over primitive orbits proves (3.4). ∎

For the trivial orbit \(\{1,2\}\),

\[
\ell=2,\qquad H=1+2=3,
\]

so its determinant factor is

\[
\boxed{1-z^2t^3.}
\tag{3.5}
\]

Equivalently, its weighted zeta factor is

\[
(1-z^2t^3)^{-1}.
\]

---

## 4. Exact equivalence with the positive-cycle problem

The Fredholm determinant representation is not merely compatible with the cycle problem; its desired evaluation is exactly equivalent to solving that problem.

### Theorem 4.1

Fix any \(t\in(0,1)\). The following are equivalent:

\[
\mathcal D_t(z)=1-z^2t^3,
\tag{4.1}
\]

and

\[
\text{\(T\) has no positive periodic orbit other than \(1\leftrightarrow2\).}
\tag{4.2}
\]

#### Proof

If the trivial cycle is the only primitive orbit, (3.4) immediately gives (4.1).

Conversely, suppose a nontrivial primitive orbit \(\mathcal O\) exists, with length \(\ell\). Its contribution to

\[
\operatorname{tr}(L_t^\ell)
\]

is

\[
\ell\,t^{H(\mathcal O)}>0.
\]

All trace contributions are nonnegative. Thus this term cannot be canceled by another orbit. Consequently the logarithmic Taylor series of \(\mathcal D_t\) differs from that of \(1-z^2t^3\). ∎

In trace form, the required identity is

\[
\boxed{
\operatorname{tr}(L_t^k)
=
\begin{cases}
0,&k\ \text{odd},\\[1mm]
2t^{3k/2},&k\ \text{even}.
\end{cases}
}
\tag{4.3}
\]

Indeed, for \(k=2r\), the two trivial periodic points each have orbit sum \(3r\).

Taking \(t\uparrow1\) coefficientwise gives

\[
\mathcal D_t(z)
\longrightarrow
\exp\left(
-\sum_{k\ge1}\frac{a_k}{k}z^k
\right)
=
\zeta_T(z)^{-1}.
\tag{4.4}
\]

Therefore

\[
\mathcal D_t(z)=1-z^2t^3
\quad\text{for one, equivalently every, }t\in(0,1)
\]

would imply

\[
\zeta_T(z)=\frac1{1-z^2}.
\]

The obstacle is that trace-classness supplies convergence, not the numerical values (4.3).

---

## 5. What the determinant identity means arithmetically

For a parity word \(w\) of length \(K\) and weight \(m\), put

\[
\Delta(w):=2^K-3^m.
\tag{5.1}
\]

The fixed point is

\[
N(w)=\frac{\Phi(w)}{\Delta(w)}.
\tag{5.2}
\]

A minimal word represents a positive integer cycle exactly when

\[
\Delta(w)>0,
\qquad
\Delta(w)\mid\Phi(w).
\tag{5.3}
\]

Divisibility propagates under cyclic rotation, and the resulting rotated rational points are all integers with the prescribed parities. fileciteturn3file0L56-L83

Hence proving

\[
\mathcal D_t(z)=1-z^2t^3
\]

amounts to proving

\[
\boxed{
\Delta(w)\nmid\Phi(w)
}
\tag{5.4}
\]

for every nontrivial candidate word, apart from repetitions and rotations of \(10\).

The elementary product identity around a positive cycle gives

\[
\frac{2^K}{3^m}
=
\prod_{i=1}^{m}
\left(1+\frac1{3b_i}\right),
\tag{5.5}
\]

where \(b_i\) are the odd cycle values. It follows immediately that

\[
K\le2m,
\]

with equality only for the trivial orbit. Thus every nontrivial candidate lies in the narrow strip

\[
m\log_2 3<K<2m.
\tag{5.6}
\]

These facts, including uniqueness of the trivial boundary case \(K=2m\), are recorded in the parity-word analysis. fileciteturn3file0L84-L120

Recent Christoffel-word work sharpens the extremal structure of these candidate words, but explicitly leaves hypothetical integer cycles in the critical strip as strictly suboptimal parity patterns rather than excluding them altogether. citeturn542179view0 Existing rigorous circuit results also exclude only finite circuit ranges, such as Hercher’s exclusion through 91 circuits. citeturn542179view3

The determinant does not create analytic cancellation capable of overcoming (5.4), because every periodic-point contribution to every trace is positive. It repackages the divisibility problem into the statement that certain positive trace coefficients vanish.

This agrees with the prior arithmetic audit: the exact decoder identifies a possible completion, but the unresolved step is an all-scale modular anti-alignment theorem, not a further uniqueness argument. fileciteturn4file1L1060-L1068

---

## 6. Why the full \(2\)-adic determinant gives the wrong zeta function

There is a tempting alternative: extend \(T\) to \(\mathbb Z_2\) and use the parity-vector conjugacy. Bernstein and Lagarias proved that the \(2\)-adic Collatz map is conjugate to the binary shift. citeturn982505search1

The \(k\)-th iterate of the binary shift has exactly \(2^k\) fixed points, one for every periodic binary block of length \(k\). Consequently its zeta function is

\[
\exp\left(
\sum_{k\ge1}\frac{2^k}{k}z^k
\right)
=
\frac1{1-2z}.
\tag{6.1}
\]

Thus

\[
\boxed{
\zeta_{T:\mathbb Z_2\to\mathbb Z_2}(z)
=
\frac1{1-2z},
}
\tag{6.2}
\]

not \((1-z^2)^{-1}\).

This is not a defect of the \(2\)-adic conjugacy. Every periodic parity word genuinely defines a rational \(2\)-adic periodic point. What distinguishes a positive-integer cycle is exactly the divisibility condition

\[
2^K-3^m\mid\Phi(w).
\]

Therefore any determinant built on the whole \(2\)-adic space counts far too many cycles. Projecting onto ordinary positive integers is the entire arithmetic difficulty.

---

## 7. A zeta function cannot detect escape

Even a complete proof of

\[
\zeta_T(z)=\frac1{1-z^2}
\]

would settle only the cycle half of Collatz.

For example, the map

\[
F(n)=n+1
\]

has no periodic points, so its dynamical zeta function is identically \(1\), yet every orbit escapes to infinity.

More generally, one may attach arbitrarily many acyclic infinite rays or rooted trees to a dynamical system without changing any periodic orbit and hence without changing its zeta function. The periodic-orbit data cannot distinguish a globally terminating system from one containing an escaping ray.

For Collatz, a counterexample avoiding \(1\leftrightarrow2\) is either a nontrivial positive cycle or an injective infinite orbit. The zeta function rules out only the first possibility.

---

## 8. Exact “zeta plus nonescape” theorem

Let

\[
A:=\{1,2\},
\qquad
X:=\mathbb N\setminus A.
\]

The following gives a precise completion of the proposed architecture.

### Theorem 8.1

Fix \(t\in(0,1)\). The Collatz conjecture is equivalent to the conjunction of:

\[
\mathcal D_t(z)=1-z^2t^3,
\tag{8.1}
\]

and the existence of a function

\[
\pi:X\longrightarrow(0,\infty)
\]

such that

\[
\sum_{n\in X}\pi(n)<\infty
\tag{8.2}
\]

and

\[
\pi(n)\le\pi(Tn)
\qquad
(n,Tn\in X).
\tag{8.3}
\]

#### Proof: Collatz implies the two conditions

The determinant identity follows because the trivial cycle is the only cycle.

For \(n\in X\), let

\[
\tau(n):=\min\{k\ge1:T^k n\in A\}
\]

be the hitting time of \(A\). Choose \(q\in(0,1/2)\) and put

\[
\pi(n)=q^{\tau(n)}.
\tag{8.4}
\]

If \(n,Tn\in X\), then

\[
\tau(Tn)=\tau(n)-1,
\]

so

\[
\pi(Tn)=q^{-1}\pi(n)>\pi(n).
\]

It remains to prove summability. Every point has at most two predecessors, so the number of integers with hitting time \(r\) is at most

\[
2\cdot2^r=2^{r+1}.
\]

Hence

\[
\sum_{n\in X}\pi(n)
\le
\sum_{r\ge1}2^{r+1}q^r
=
2\sum_{r\ge1}(2q)^r
<\infty.
\]

#### Proof: the two conditions imply Collatz

Suppose an orbit starting at \(n\) never enters \(A\).

If it repeats, it contains a nontrivial positive cycle, contradicting (8.1).

It must therefore consist of infinitely many distinct integers. By (8.3),

\[
\pi(T^j n)\ge\pi(n)>0
\qquad(j\ge0).
\]

Since these are infinitely many distinct states,

\[
\sum_{m\in X}\pi(m)
\ge
\sum_{j\ge0}\pi(T^j n)
=
\infty,
\]

contradicting (8.2). ∎

Thus the proposed route can be completed to the exact theorem

\[
\boxed{
\text{Collatz}
\iff
\text{trivial zeta factor}
+
\text{positive proper nonescape weight}.
}
\tag{8.5}
\]

The problem is now concentrated in constructing \(\pi\) without using the unknown hitting times.

---

## 9. A stronger single transfer-operator certificate

There is a more economical formulation in which one positive vector excludes both escape and nontrivial cycles.

Define the killed inverse-transfer operator \(P:\ell^1(X)\to\ell^1(X)\) by

\[
(Pu)(m)
=
\sum_{\substack{n\in X\\Tn=m}}u(n).
\tag{9.1}
\]

With the convention that \(u\) is zero outside \(X\),

\[
(Pu)(m)
=
u(2m)
+
\mathbf 1_{m\equiv2\pmod3}
u\left(\frac{2m-1}{3}\right).
\tag{9.2}
\]

Since every \(n\) has exactly one forward image,

\[
\|Pu\|_1\le\|u\|_1.
\]

### Theorem 9.1: exact killed-transfer criterion

The Collatz conjecture is equivalent to the existence of

\[
\pi\in\ell^1(X),
\qquad
\pi(n)>0,
\]

such that

\[
\boxed{P\pi\le\pi.}
\tag{9.3}
\]

#### Proof: Collatz implies the certificate

Again take

\[
\pi(n)=q^{\tau(n)}
\]

with \(0<q<1/2\). If \(Tn=m\in X\), then

\[
\tau(n)=\tau(m)+1,
\]

so every predecessor contributes \(q\pi(m)\). There are at most two predecessors, hence

\[
(P\pi)(m)\le2q\pi(m)<\pi(m).
\]

Summability was proved in Theorem 8.1.

#### Proof: the certificate implies Collatz

For every edge \(n\mapsto m\) within \(X\), \(\pi(n)\) is one of the positive summands in \(P\pi(m)\). Thus

\[
\pi(n)\le(P\pi)(m)\le\pi(m).
\tag{9.4}
\]

An infinite injective orbit would therefore contain infinitely many distinct states of \(\pi\)-mass at least \(\pi(n)>0\), contradicting \(\pi\in\ell^1\).

It remains to exclude a nontrivial cycle. Along a cycle, (9.4) forces all \(\pi\)-values to be equal. Choose an odd cycle value \(n>1\), and put

\[
m=Tn=\frac{3n+1}{2}.
\]

The point \(m\) has both the odd predecessor \(n\) and the even predecessor

\[
2m=3n+1\in X.
\]

Consequently,

\[
(P\pi)(m)
\ge
\pi(n)+\pi(2m)
>
\pi(n)
=
\pi(m),
\]

contradicting \(P\pi\le\pi\). ∎

This theorem is stronger than the requested zeta architecture:

\[
\boxed{
P\pi\le\pi,\quad
0<\pi\in\ell^1(X)
}
\]

would prove both the absence of nontrivial cycles and nonescape, so the separate zeta identity would become redundant.

It also shows why merely asserting that such a vector exists is not a proof. Under Collatz, the vector can be manufactured from the hitting-time function. An independently checkable proof requires a finite-state, residue-class, automaton, algebraic, or otherwise explicit description of \(\pi\). This matches the earlier infinite-matrix diagnosis: an unrestricted positive subeigenvector is equivalent in strength to the unknown totality statement, while a finitely presented one would be a genuine certificate. fileciteturn6file0L12-L22

Writing

\[
H(n):=-\log\pi(n)
\]

turns (9.4) into

\[
H(Tn)\le H(n).
\tag{9.5}
\]

Moreover, \(\pi\in\ell^1\) implies every sublevel set of \(H\) is finite. Thus \(H\) is a coercive nonincreasing Lyapunov height. The branching term in (9.3), not merely the edgewise inequality, is what excludes cycles.

---

## 10. The Green-kernel attempt and its exact failure point

The natural way to construct such a \(\pi\) is to start with a positive source

\[
b\in\ell^1(X),\qquad b(n)>0,
\]

and form the killed Green potential

\[
\boxed{
G_b:=\sum_{j=0}^{\infty}P^j b.
}
\tag{10.1}
\]

Whenever this converges in \(\ell^1\),

\[
PG_b
=
\sum_{j\ge1}P^j b
=
G_b-b
<
G_b,
\tag{10.2}
\]

so Theorem 9.1 proves Collatz.

The summability condition can be calculated exactly. Let

\[
\tau_A(n)
=
\min\{k\ge1:T^k n\in A\},
\]

with \(\tau_A(n)=\infty\) when the orbit never enters \(A\). Since \(P\) transports mass forward and kills it when it reaches \(A\), Tonelli’s theorem gives

\[
\begin{aligned}
\|G_b\|_1
&=
\sum_{j\ge0}\|P^j b\|_1\\
&=
\sum_{n\in X}b(n)\tau_A(n).
\end{aligned}
\tag{10.3}
\]

Thus

\[
\boxed{
G_b\in\ell^1
\iff
\sum_{n\in X}b(n)\tau_A(n)<\infty.
}
\tag{10.4}
\]

This identifies the precise obstruction. If even one \(n\) has \(\tau_A(n)=\infty\), then every strictly positive source \(b\) makes the right-hand side infinite. Therefore proving Green-kernel summability already proves nonescape.

The algebra of the Green construction is complete; the missing theorem is an all-depth bound on its total mass.

This is also visible through the Fredholm resolvent. For sufficiently small \(z\),

\[
(I-zL_t)^{-1}
=
\sum_{k\ge0}z^kL_t^k,
\]

and

\[
\bigl((I-zL_t)^{-1}e_a\bigr)(n)
=
\sum_{\substack{k\ge0\\T^k n=a}}
z^k t^{S_k(n)}.
\tag{10.5}
\]

The determinant \(\mathcal D_t\) is the denominator of this resolvent. Reachability of \(a\) is encoded in individual matrix entries or Fredholm minors—the numerators—not in the determinant alone. An escaping orbit can alter all the relevant hitting entries while contributing no periodic-orbit factor to \(\mathcal D_t\).

---

## 11. Finite determinant approximations

Let \(P_N\) be the projection onto

\[
\operatorname{span}\{e_1,\ldots,e_N\}
\]

and define

\[
L_{t,N}:=P_NL_tP_N.
\]

Then

\[
\mathcal D_{t,N}(z)
:=
\det(I-zL_{t,N})
\tag{11.1}
\]

is an ordinary finite determinant. Because the finite directed graph has out-degree at most one, its trees contribute no determinant factor, while its directed cycles contribute

\[
\mathcal D_{t,N}(z)
=
\prod_{\substack{\mathcal O\in\mathscr P\\
\mathcal O\subseteq[1,N]}}
\left(
1-z^{\ell(\mathcal O)}t^{H(\mathcal O)}
\right).
\tag{11.2}
\]

Since \(L_t\) is trace class,

\[
\|L_{t,N}-L_t\|_1\longrightarrow0,
\]

and hence

\[
\mathcal D_{t,N}(z)\longrightarrow\mathcal D_t(z)
\]

locally uniformly in \(z\).

This gives a rigorous computational approximation scheme. However, showing

\[
\mathcal D_{t,N}(z)=1-z^2t^3
\]

for each finite \(N\) merely says that no nontrivial cycle is contained below \(N\). Passing to all \(N\) requires a theorem excluding new cycles at unbounded heights.

---

## 12. Final status of Approach 62

The following parts of the proposed route are complete:

\[
\zeta_T(z)
=
\exp\left(
\sum_{k\ge1}\frac{\#\operatorname{Fix}(T^k)}{k}z^k
\right),
\]

\[
\zeta_T(z)
=
\prod_{\mathcal O\in\mathscr P}
(1-z^{\ell(\mathcal O)})^{-1},
\]

\[
\mathcal D_t(z)
=
\det(I-zM_tC),
\]

and

\[
\mathcal D_t(z)
=
\prod_{\mathcal O\in\mathscr P}
\left(
1-z^{\ell(\mathcal O)}t^{H(\mathcal O)}
\right).
\]

Moreover,

\[
\boxed{
\mathcal D_t(z)=1-z^2t^3
\iff
\text{there is no nontrivial positive cycle}.
}
\]

The exact nonescape supplement is

\[
\boxed{
\exists\,0<\pi\in\ell^1(X):
\quad
P\pi\le\pi.
}
\]

That condition by itself is equivalent to the full Collatz conjecture.

What remains unproved is therefore not a functional-analytic technicality. It is one of the following equivalent arithmetic constructions:

\[
\operatorname{tr}(L_t^k)
=
\begin{cases}
0,&k\text{ odd},\\
2t^{3k/2},&k\text{ even},
\end{cases}
\quad\text{for every }k,
\tag{12.1}
\]

together with an independent nonescape theorem; or, more efficiently,

\[
\boxed{
\text{construct explicitly }
0<\pi\in\ell^1(X)
\text{ satisfying }
\sum_{Tn=m}\pi(n)\le\pi(m)
\text{ for every }m\in X.
}
\tag{12.2}
\]

The existing compression framework isolates the same infinitary obstruction: finite trace and carry statements can terminate particular recurrent subsystems, but a separate global synchronization theorem is needed to force every positive stationary ray into a descending configuration. fileciteturn4file0L211-L231

Accordingly, the dynamical zeta approach gives an exact and clean reformulation—arguably the sharpest operator formulation of the “cycle plus escape” dichotomy—but the determinant’s trivial-factor evaluation and the summable Green-kernel estimate have not been proved here. Replacing either one by the desired conclusion would amount to assuming the corresponding half of the Collatz conjecture.