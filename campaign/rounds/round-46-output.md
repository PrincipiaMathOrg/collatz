model: GPT-5.6 Pro (Chat mode)
round: 46 -- approach 41, Christol-Cobham algebraicity trap
front: proof
sent: 2026-08-15T06:45Z
worked: 52m 57s

---
# Christol–Cobham analysis of a Collatz orbit

Carrying this program through does **not** produce a full proof of the Collatz conjecture. It does produce an exact characterization showing where the approach becomes circular:

> For a fixed positive integer \(n\), algebraicity of its parity series in both characteristics \(2\) and \(3\) is equivalent to eventual periodicity of its Collatz orbit.

Thus the proposed algebraicity statement is not presently a consequence of the affine carry formulas; it is essentially the “no divergent orbit” part of Collatz written in finite-field language. Moreover, a hypothetical nontrivial cycle already has a rational parity series, so Christol–Cobham cannot by itself exclude cycles.

There is, however, a better value-indexed generating series with an exact mixed \(2\)-Cartier/\(3\)-substitution equation. For it one can rigorously exclude infinite ultimately periodic ranges. I give that result below, followed by a proof that the reduced functional equation still leaves an arbitrary Cartier section and therefore does not force algebraicity.

---

## 1. Exact affine identities

Use the shortcut Collatz map

\[
T(x)=
\begin{cases}
x/2,&x\equiv0\pmod 2,\\[2mm]
(3x+1)/2,&x\equiv1\pmod 2.
\end{cases}
\]

Fix \(n\geq1\), and write

\[
x_j=T^j(n),\qquad
\varepsilon_j=x_j\bmod 2\in\{0,1\},
\qquad
s_j=\sum_{i=0}^{j-1}\varepsilon_i .
\]

Then

\[
2x_{j+1}=3^{\varepsilon_j}x_j+\varepsilon_j .
\tag{1}
\]

Iterating (1) gives

\[
2^k x_k=3^{s_k}n+C_k,
\tag{2}
\]

where

\[
C_k
=
\sum_{j=0}^{k-1}
\varepsilon_j\,2^j\,3^{\,s_k-s_{j+1}},
\tag{3}
\]

and equivalently

\[
C_{k+1}=3^{\varepsilon_k}C_k+\varepsilon_k2^k,
\qquad C_0=0.
\tag{4}
\]

These are the exact affine carries one would like to convert into algebraicity.

Define

\[
E_n(z)=\sum_{j\geq0}\varepsilon_jz^j,
\qquad
X_n(z)=\sum_{j\geq0}x_jz^j.
\]

Since \(3^{\varepsilon_j}=1+2\varepsilon_j\), equation (1) gives

\[
\frac{2(X_n(z)-n)}{z}
=
X_n(z)+2\bigl(E_n\odot X_n\bigr)(z)+E_n(z),
\tag{5}
\]

where

\[
(E_n\odot X_n)(z)=\sum_{j\geq0}\varepsilon_jx_jz^j
\]

is the Hadamard product.

Equation (5) is exact, but it is not an algebraic equation for \(E_n\): it contains the independent series \(X_n\) and their coefficientwise product. In characteristic \(2\), it collapses merely to

\[
\overline X_n=\overline E_n,
\]

which says only that \(x_j\bmod2=\varepsilon_j\).

---

## 2. The exact Christol–Cobham criterion

Christol’s theorem says that a power series over a finite field of characteristic \(p\) is algebraic precisely when its coefficient sequence is \(p\)-automatic. A finite-field series is rational precisely when its coefficients are ultimately periodic. Cobham’s theorem says that a sequence automatic in two multiplicatively independent bases is ultimately periodic. Since \(2\) and \(3\) are multiplicatively independent, these theorems apply directly to \(E_n\). citeturn320968view0turn304222view3

### Theorem 1

For every \(n\geq1\), the following conditions are equivalent.

1. The reduction of \(E_n(z)\) modulo \(2\) is algebraic over \(\mathbb F_2(z)\), and its reduction modulo \(3\) is algebraic over \(\mathbb F_3(z)\).
2. The parity sequence \((\varepsilon_j)_{j\geq0}\) is ultimately periodic.
3. The orbit \((T^j(n))_{j\geq0}\) is eventually periodic.

### Proof

Assume condition 1. By Christol’s theorem, \((\varepsilon_j)\) is simultaneously \(2\)-automatic and \(3\)-automatic. Cobham’s theorem therefore makes it ultimately periodic. Thus \(1\Rightarrow2\).

If \((\varepsilon_j)\) is ultimately periodic, then

\[
E_n(z)=P(z)+\frac{z^NQ(z)}{1-z^L}
\]

for suitable polynomials \(P,Q\) and integers \(N,L\). Hence \(E_n\) is rational in every characteristic. Thus \(2\Rightarrow1\).

It remains to relate parity periodicity to orbit periodicity. The \(2\)-adic parity map

\[
Q(x)=\sum_{j\geq0}\bigl(T^j(x)\bmod2\bigr)2^j
\]

is a bijection \(\mathbb Z_2\to\mathbb Z_2\) and conjugates \(T\) with the binary shift:

\[
Q\circ T=\mathcal S\circ Q.
\tag{6}
\]

Every binary sequence is the parity sequence of exactly one \(2\)-adic integer. In particular, an ultimately periodic parity tail is fixed by some power of the shift. By the injectivity of \(Q\), the corresponding Collatz iterate is fixed by the same power of \(T\). Hence the ordinary integer orbit is eventually periodic. The converse is immediate. citeturn304222view1turn304222view2

This proves the theorem. ∎

### Immediate consequences

If the orbit of \(n\) is not eventually periodic, then

\[
E_n(z)\bmod2
\quad\text{or}\quad
E_n(z)\bmod3
\]

must be transcendental over its corresponding rational function field.

On the other hand, if \(n\) lies in a hypothetical nontrivial cycle, then \(E_n(z)\) is periodic and therefore rational over every finite field. Consequently:

> Dual finite-field algebraicity excludes divergent orbits, but it cannot distinguish the trivial cycle from a nontrivial cycle.

This is an unavoidable obstruction, not merely a weakness of the proof technique.

---

## 3. Why periodicity does not finish Collatz

Suppose a periodic parity word has length \(L\), contains \(q\) ones, and its ones occur at

\[
0\leq d_0<d_1<\cdots<d_{q-1}<L.
\]

Iterating one period gives

\[
T^L(x)=\frac{3^q x+C_w}{2^L},
\tag{7}
\]

where

\[
C_w=\sum_{i=0}^{q-1}3^{q-1-i}2^{d_i}.
\tag{8}
\]

A positive cycle therefore requires

\[
(2^L-3^q)x=C_w.
\tag{9}
\]

Christol–Cobham gives only that some word \(w\) repeats. It provides no reason that (9) cannot have a positive integral solution. Indeed every periodic word is automatic in every base, regardless of whether its cycle equation is integrally realizable.

Thus the proposed route would still need an independent theorem saying that the only positive integral realization of (9) compatible with its own parity word is the word \(10\), corresponding to

\[
1\longmapsto2\longmapsto1.
\]

That is precisely the nontrivial-cycle problem.

---

## 4. The index mismatch in the algebraicity step

For a sequence \(a=(a_j)\), Christol’s theorem concerns finiteness of its \(p\)-kernel

\[
\mathcal K_p(a)=
\left\{
(a_{p^e m+r})_{m\geq0}:
e\geq0,\ 0\leq r<p^e
\right\}.
\tag{10}
\]

Thus algebraicity in characteristic \(p\) requires control of the sequence at the decimated times

\[
p^e m+r.
\]

The Collatz carry identities (1)–(4), however, connect adjacent times \(j\) and \(j+1\), while the factors \(2\) and \(3\) act on the **values** \(x_j\), not on the time index \(j\).

There is no identity in (1)–(4) relating, for example,

\[
(\varepsilon_{3m})_{m\geq0},
\qquad
(\varepsilon_{3m+1})_{m\geq0},
\qquad
(\varepsilon_{3m+2})_{m\geq0}
\]

to finitely many transforms of the original sequence. The occurrence of the integer \(3\) in \(3x+1\) does not create base-\(3\) automaticity in the orbit-time variable.

This distinction is easy to overlook:

\[
\boxed{\text{arithmetic base acting on values}}
\quad\neq\quad
\boxed{\text{automatic base acting on coefficient indices}}.
\]

---

## 5. Local affine carries permit arbitrary parity data

The obstruction is stronger than the absence of an evident functional equation.

The \(2\)-adic parity map is onto: every infinite binary sequence \(S=(s_j)\) occurs as the parity sequence of a unique \(2\)-adic seed. Its inverse is

\[
x
=
-\sum_{j\geq0}
s_j\,2^j\,3^{-\sigma_j(S)}
\qquad\text{in }\mathbb Z_2,
\tag{11}
\]

where

\[
\sigma_j(S)=\sum_{i=0}^j s_i.
\]

Furthermore, every finite binary word of length \(k\) is realized by exactly one residue class modulo \(2^k\), and hence by infinitely many positive integers. citeturn304222view0turn304222view1

There are uncountably many binary sequences but only countably many algebraic series over \(\mathbb F_p(z)\). Therefore identities valid for all \(2\)-adic Collatz seeds—including the affine carry formulas—cannot by themselves imply algebraicity.

A successful argument would have to use the genuinely global restriction that one fixed \(2\)-adic seed is an ordinary positive integer. No bounded carry window or finite parity-prefix calculation can see that distinction: every such finite prefix already occurs for positive integers.

---

## 6. An explicit carry exhibiting the wrong automatic base

There is a concrete finite-word manifestation of the same problem.

Let

\[
m=\sum_{j=0}^{L-1}\eta_j2^j,
\qquad \eta_{L-1}=1,
\]

encode a binary word, and let \(q=\sum_j\eta_j\). Define its affine carry

\[
\mathcal C(m)
=
\sum_{j=0}^{L-1}
\eta_j2^j3^{\,q-\sum_{i=0}^{j}\eta_i}.
\tag{12}
\]

Modulo \(3\), every summand vanishes except the one corresponding to the last \(1\). Hence

\[
\mathcal C(m)\equiv 2^{L-1}
=
2^{\lfloor\log_2m\rfloor}
\pmod3.
\tag{13}
\]

The sequence on the right is constant on each dyadic interval

\[
[2^r,2^{r+1})
\]

and alternates between \(1\) and \(2\) modulo \(3\). It is \(2\)-automatic: an automaton only needs to record the parity of the binary length. It is not ultimately periodic, because its alternating constant blocks have unbounded lengths. Therefore Cobham implies that it is not \(3\)-automatic, and Christol implies that its generating series over \(\mathbb F_3\) is transcendental.

So even after reduction modulo \(3\), the exact affine carry naturally remembers **base \(2\)**, not base \(3\). This is the opposite of what the proposed algebraicity step needs.

---

# 7. Repair: index the series by orbit values

The time-indexed parity series misaligns with multiplication by \(2\) and \(3\). A better object is the indicator series of the orbit’s range.

Assume temporarily that the orbit of \(n\) is not eventually periodic. It is then injective. Put

\[
a_m=
\begin{cases}
1,&m=T^j(n)\text{ for some }j\geq0,\\
0,&\text{otherwise},
\end{cases}
\]

and

\[
A_n(z)=\sum_{m\geq0}a_mz^m.
\tag{14}
\]

Every visited \(m\neq n\) has exactly one visited predecessor. Its possible predecessors are

\[
2m
\]

and, when \(m\equiv2\pmod3\),

\[
\frac{2m-1}{3}.
\]

The two alternatives cannot both occur in an injective orbit. Consequently,

\[
a_m-\mathbf 1_{\{m=n\}}
=
a_{2m}
+
\mathbf 1_{\{m\equiv2\pmod3\}}
a_{(2m-1)/3}.
\tag{15}
\]

Introduce the binary Cartier sections

\[
\Lambda_0 A(z)=\sum_{m\geq0}a_{2m}z^m,
\qquad
\Lambda_1 A(z)=\sum_{m\geq0}a_{2m+1}z^m.
\]

Summing (15) gives the exact functional equation

\[
\boxed{
A_n(z)-z^n
=
\Lambda_0A_n(z)
+
z^2\bigl(\Lambda_1A_n\bigr)(z^3).
}
\tag{16}
\]

This is much closer to the intended Christol–Cobham structure: division by \(2\) becomes a Cartier section, while multiplication by \(3\) becomes substitution by \(z^3\).

Replacing \(z\) by \(z^2\) and eliminating the sections yields, over characteristic zero,

\[
\boxed{
2A_n(z^2)-2z^{2n}
=
A_n(z)+A_n(-z)
+
zA_n(z^3)-zA_n(-z^3).
}
\tag{17}
\]

This equation has a nontrivial consequence.

---

## 8. An injective orbit cannot have an ultimately periodic range

### Lemma 2

Suppose \(A(z)=\sum a_mz^m\), with \(a_m\in\{0,1\}\), satisfies (17). If \((a_m)\) is ultimately periodic, then it has finite support.

In particular, the range of an infinite injective Collatz orbit is not ultimately periodic as a subset of the positive integers.

### Proof

Suppose instead that \((a_m)\) is ultimately periodic and contains infinitely many ones. Let \(M\) be its least eventual period. Then \(A(z)\) is rational, with poles at roots of unity whose orders divide \(M\).

Fourier decomposition of the period-\(M\) tail shows that the least common multiple of the orders of these poles is \(M\).

### Case 1: \(M\) is odd

Let

\[
\delta>0
\]

be the mean number of ones per period. As \(z\to1^{-}\),

\[
A(z)\sim\frac{\delta}{1-z},
\qquad
A(z^2)\sim\frac{\delta}{2(1-z)},
\qquad
A(z^3)\sim\frac{\delta}{3(1-z)}.
\]

Because \(M\) is odd, \(-1\) is not a pole of \(A\), so \(A(-z)\) and \(A(-z^3)\) remain bounded as \(z\to1\).

Taking the principal parts at \(z=1\) in (17), its left side has coefficient

\[
2\cdot\frac{\delta}{2}=\delta,
\]

while the right side has coefficient

\[
\delta+\frac{\delta}{3}=\frac{4\delta}{3}.
\]

Thus

\[
\delta=\frac{4\delta}{3},
\]

contradicting \(\delta>0\).

### Case 2: \(M\) is even

Put

\[
t=v_2(M)\geq1.
\]

Since the least common multiple of the pole orders is \(M\), there is a pole \(\alpha\) whose order \(d\) satisfies

\[
v_2(d)=t.
\]

Choose a square root \(\beta\) of \(\alpha\) having order \(2d\). Then \(A(z^2)\) has a pole at \(z=\beta\).

On the other hand, each of

\[
\beta,\quad -\beta,\quad \beta^3,\quad -\beta^3
\]

has order whose \(2\)-adic valuation is \(t+1\). None can therefore be a pole of \(A\), since every pole order divides \(M\) and hence has \(2\)-adic valuation at most \(t\).

Thus at \(z=\beta\), the left side of (17) has a pole, while every term on the right side is analytic. This is impossible.

Both cases give contradictions. Hence an ultimately periodic solution must have finite support. ∎

---

## 9. A second exact algebraicity criterion

Combining Lemma 2 with Christol and Cobham gives another characterization.

### Theorem 3

For each \(n\geq1\), define \(A_n(z)\) by the range indicator (14), whether or not the orbit is finite. Then the following are equivalent:

1. \(A_n(z)\bmod2\) is algebraic over \(\mathbb F_2(z)\) and \(A_n(z)\bmod3\) is algebraic over \(\mathbb F_3(z)\).
2. The orbit of \(n\) is eventually periodic.
3. \(A_n(z)\) is a polynomial.

### Proof

If the orbit is eventually periodic, its range is finite, so \(A_n\) is a polynomial.

Conversely, suppose both reductions are algebraic. Christol makes \((a_m)\) both \(2\)-automatic and \(3\)-automatic; Cobham makes it ultimately periodic. If the orbit were infinite, it would be injective, and Lemma 2 would force \(A_n\) to have finite support, a contradiction. Therefore the orbit is eventually periodic. ∎

Thus changing from the parity series to the range series produces a stronger exact functional equation, but dual algebraicity is again equivalent to eventual cycling rather than a separately established fact.

---

# 10. The reduced equation still does not force algebraicity

Equation (16) might appear sufficiently rigid to imply algebraicity in characteristic \(2\). It does not.

Work over \(\mathbb F_2[[z]]\), and write

\[
E=\Lambda_0A,
\qquad
O=\Lambda_1A.
\]

Reconstruction from the even and odd sections gives

\[
A(z)=E(z^2)+zO(z^2).
\]

In characteristic \(2\),

\[
E(z^2)=E(z)^2,
\qquad
O(z^2)=O(z)^2,
\]

so

\[
A=E^2+zO^2.
\tag{18}
\]

Reducing (16) modulo \(2\) and substituting (18) gives

\[
\boxed{
E^2+E
=
z^n+zO^2+z^2O(z^3).
}
\tag{19}
\]

Now choose **any**

\[
O(z)\in\mathbb F_2[[z]].
\]

The right side \(R(z)\) of (19) has zero constant coefficient. Writing

\[
E(z)=\sum_{m\geq0}e_mz^m,
\qquad e_0=0,
\]

the Artin–Schreier equation \(E^2+E=R\) is solved recursively by

\[
e_m=R_m \quad(m\text{ odd}),
\tag{20}
\]

and

\[
e_{2k}=R_{2k}+e_k
\quad(k\geq1).
\tag{21}
\]

Thus every choice of the odd Cartier section \(O\) gives a solution \(E\), and hence a solution \(A\), of the finite-field reduction of (16).

There are uncountably many choices of \(O\), while only countably many series are algebraic over \(\mathbb F_2(z)\). Therefore:

> The exact reduced orbit-set equation has uncountably many transcendental solutions. It does not force algebraicity.

These solutions need not lift to genuine collision-free positive Collatz orbits. That is precisely the missing global information. The mod-\(2\) equation has forgotten the nonnegative integer equality and the condition that the set is one single forward orbit.

In characteristic \(3\), substitution by \(z^3\) becomes Frobenius, but the binary Cartier sections \(\Lambda_0,\Lambda_1\) remain uncontrolled. Thus each characteristic simplifies one side of the mixed \(2/3\) equation while leaving the other side open:

\[
\begin{array}{c|c|c}
\text{characteristic}&\text{simplified operation}&\text{uncontrolled operation}\\ \hline
2&z\mapsto z^2&z\mapsto z^3\\
3&z\mapsto z^3&\text{binary Cartier sections}.
\end{array}
\]

This is the finite-field form of the carry obstruction.

---

## 11. Why a two-Mahler repair also stops here

There is a characteristic-zero analogue: a power series satisfying both a finite-order \(2\)-Mahler equation and a finite-order \(3\)-Mahler equation must be rational. citeturn253926view5

Equation (17), however, is not a pair of independent Mahler equations. It mixes

\[
A(z^2),\quad A(z^3),\quad A(-z),\quad A(-z^3)
\]

in one relation. Repeatedly substituting \(z^2\) and \(z^3\) creates an expanding family of mixed arguments rather than a finite-dimensional \(2\)- or \(3\)-Mahler module. Equation (19) identifies the underlying reason: one Cartier section remains free.

---

# 12. Exact endpoint of approach 41

The proposed proof chain was

\[
\text{exact affine carries}
\Longrightarrow
\text{algebraicity modulo two primes}
\Longrightarrow
\text{automaticity in two bases}
\Longrightarrow
\text{periodicity}
\Longrightarrow
\text{Collatz}.
\]

The rigorous outcome is instead

\[
\text{dual algebraicity of }E_n
\iff
\text{eventual periodicity of the orbit},
\tag{22}
\]

and also

\[
\text{dual algebraicity of }A_n
\iff
\text{eventual periodicity of the orbit}.
\tag{23}
\]

The middle Christol–Cobham step is completely valid. The failure occurs on both sides:

1. **Before Christol:** the affine carry equations do not force algebraicity. They act on orbit values, while Christol’s kernels decimate the time or value index. The strongest natural value-series equation retains a free Cartier section after reduction.
2. **After Cobham:** eventual periodicity allows every hypothetical nontrivial positive cycle. Periodic series are rational in every characteristic, so algebraicity cannot exclude them.

Consequently, a full proof along this route would still require two genuinely new theorems:

\[
\boxed{\text{Global integer-lifting rigidity}}
\]

showing that the free finite-field Cartier sections cannot arise from one positive integral orbit, and

\[
\boxed{\text{Cycle classification}}
\]

showing that the only positive periodic parity word satisfying its affine cycle equation is \(10\).

The first statement is essentially the no-divergent-orbit component of Collatz; the second is the no-nontrivial-cycle component. The Christol–Cobham formulation gives a clean and rigorous restatement of those obstacles, together with the exact range equation (16) and the periodic-range exclusion lemma, but it does not supply the missing global rigidity needed for a complete proof.