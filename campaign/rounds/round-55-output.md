model: GPT-5.6 Pro (Chat mode)
round: 55 -- approach 50, Geometry-of-numbers exclusion cones
front: proof
sent: 2026-08-15T21:29Z
worked: 42m 22s

---

## Outcome

Carrying out the geometry-of-numbers construction reveals a rigorous obstruction: **the proposed “lattice-free beyond a finite radius” statement is false, even after imposing exact integrality, exact carry recurrences, and strict growth at every intermediate step**.

In fact, there are valid positive-integer trajectory prefixes of arbitrary length lying in a strip of width \(1\) around the critical line \(A=j\log _2 3\). Thus I cannot honestly present this approach as a completed proof. The Collatz conjecture remains unresolved in the current literature. citeturn720760view0

What the approach does yield is:

1. an exact affine-lattice formulation;
2. an explicit counterexample to the proposed lattice-free lemma;
3. a proof that finitely many carry coordinates provide no independent determinant gain;
4. a corrected **nested-coset cusp criterion** exactly equivalent to Collatz.

---

# 1. Exact trajectory lattices

Work with the odd-only Syracuse map

\[
U(x)=\frac{3x+1}{2^{v_2(3x+1)}},
\qquad x\in 2\mathbb N+1.
\]

Let

\[
a_i=v_2(3U^i(n)+1),\qquad
A_k=\sum_{i=0}^{k-1}a_i,\qquad A_0=0.
\]

For a finite exponent word

\[
w=(a_0,\ldots ,a_{j-1})\in\mathbb Z_{>0}^{j},
\]

define its carries by

\[
C_0=0,\qquad C_{k+1}=3C_k+2^{A_k}.
\]

Equivalently,

\[
C_k=\sum_{i=0}^{k-1}3^{k-1-i}2^{A_i}.
\]

Repeated substitution gives the exact identity

\[
\boxed{\;
2^{A_k}U^k(n)=3^k n+C_k.
\;}
\tag{1}
\]

Thus, for fixed \(w\), its possible trajectory vectors are the integral points of the affine rank-one lattice

\[
\Lambda_w=
\left\{
(x_0,\ldots ,x_j)\in(2\mathbb Z+1)^{j+1}:
2^{a_i}x_{i+1}-3x_i=1
\right\}.
\tag{2}
\]

This is the natural geometry-of-numbers object.

---

## Proposition 1: every finite exponent word is integrally realizable

For every positive exponent word \(w\), there is a unique odd residue class modulo \(2^{A_j+1}\) whose first \(j\) Syracuse exponents are exactly \(w\).

More precisely, let \(r(w)\) be the unique representative with

\[
1\le r(w)<2^{A_j+1}
\]

satisfying

\[
\boxed{\;
r(w)\equiv
3^{-j}\bigl(2^{A_j}-C_j\bigr)
\pmod {2^{A_j+1}}.
\;}
\tag{3}
\]

Then the positive odd integers realizing \(w\) are exactly

\[
\boxed{\;
n=r(w)+t\,2^{A_j+1},
\qquad t\in\mathbb Z_{\ge 0}.
\;}
\tag{4}
\]

### Proof

The final quotient in (1) is odd exactly when

\[
3^j n+C_j\equiv 2^{A_j}\pmod {2^{A_j+1}},
\]

which is equivalent to (3), since \(3\) is invertible modulo every power of \(2\).

It remains to show that this terminal congruence forces every earlier quotient to be odd. For \(k<j\),

\[
C_j
=
3^{j-k}C_k+
\sum_{i=k}^{j-1}3^{j-1-i}2^{A_i}.
\]

Since \(A_i\ge A_k+1\) for \(i>k\), reduction modulo \(2^{A_k+1}\) leaves only the \(i=k\) term:

\[
0\equiv
3^{j-k}(3^k n+C_k)
+
3^{j-1-k}2^{A_k}
\pmod {2^{A_k+1}}.
\]

After dividing by the odd factor \(3^{j-1-k}\), this yields

\[
3(3^k n+C_k)\equiv-2^{A_k}
\equiv2^{A_k}
\pmod {2^{A_k+1}}.
\]

Multiplying by the inverse of \(3\), which is odd, gives

\[
3^k n+C_k\equiv2^{A_k}\pmod {2^{A_k+1}}.
\]

Hence every intermediate quotient in (1) is an odd integer, proving that the exact valuations are \(a_0,\ldots ,a_{j-1}\). ∎

This is the odd-only analogue of the standard parity-vector result: every finite parity word is realized by an entire congruence class of positive integers. citeturn720760view1

---

# 2. The sustained-growth cone is saturated by lattice rays

Let

\[
\alpha=\log_2 3.
\]

For a word \(w\), consider the growth cone

\[
\mathcal K_j=
\{(x_0,\ldots ,x_j):x_k\ge x_0\text{ for }1\le k\le j\}.
\]

From (1),

\[
U^k(n)-n
=
\frac{(3^k-2^{A_k})n+C_k}{2^{A_k}}.
\tag{5}
\]

Consequently:

## Theorem 2: affine-ray obstruction

Suppose

\[
A_k<\alpha k
\qquad(1\le k\le j).
\tag{6}
\]

Then **every positive integer realizing \(w\) grows strictly above its starting value through all \(j\) steps**:

\[
U^k(n)>n
\qquad(1\le k\le j).
\tag{7}
\]

Moreover, \(\Lambda_w\cap\operatorname{int}\mathcal K_j\) contains an infinite arithmetic ray.

### Proof

Condition (6) means

\[
2^{A_k}<3^k.
\]

Since \(n>0\) and \(C_k>0\), equation (5) is strictly positive.

For the explicit ray, put \(r=r(w)\) and

\[
y_k=U^k(r).
\]

For

\[
n=r+t\,2^{A_j+1},
\]

equation (1) gives

\[
U^k(n)
=
y_k+t\,3^k2^{A_j+1-A_k}.
\tag{8}
\]

Thus the integral trajectory vectors form the ray

\[
\mathbf y+t\mathbf d,
\qquad
d_k=3^k2^{A_j+1-A_k},
\qquad t\ge0.
\]

Furthermore,

\[
d_k-d_0
=
2^{A_j+1-A_k}\bigl(3^k-2^{A_k}\bigr)>0,
\]

so its direction lies in the interior of the growth cone. ∎

This is the opposite of lattice-freeness: every such exponent word produces an **infinite affine ray of exact integral trajectories inside the cone**.

---

## A completely explicit family

Take

\[
w=1^j=(1,\ldots ,1).
\]

Then \(A_k=k\) and

\[
C_k=3^k-2^k.
\]

Formula (3) gives

\[
r(1^j)=2^{j+1}-1.
\]

For \(1\le k\le j\),

\[
\boxed{\;
U^k(2^{j+1}-1)
=
3^k2^{j+1-k}-1.
\;}
\tag{9}
\]

Therefore

\[
U^k(2^{j+1}-1)-(2^{j+1}-1)
=
2^{j+1}\left(\left(\frac32\right)^k-1\right)>0.
\]

So arbitrary-length strictly growing exact prefixes exist even in closed form.

These prefixes do not combine into one positive orbit: their compatible residues converge \(2\)-adically to \(-1\). Indeed, the all-one infinite parity sequence corresponds to the \(2\)-adic integer \(-1\). citeturn720760view2

That distinction—varying positive representatives versus one fixed positive seed—is exactly what a finite-dimensional cone fails to detect.

---

# 3. The obstruction remains in a width-one critical strip

The preceding example lies well inside the expanding cone. The stronger obstruction is obtained by putting the exponent path immediately next to the critical boundary.

Define

\[
A_k=\lfloor \alpha k\rfloor,
\qquad
a_k=A_{k+1}-A_k.
\tag{10}
\]

Because \(1<\alpha<2\),

\[
a_k\in\{1,2\}.
\]

For every \(k\ge1\),

\[
0<\alpha k-A_k<1.
\tag{11}
\]

Thus the lattice points lie in a strip of width \(1\) around the critical line.

For each \(j\), let \(r_j\) be the canonical positive seed realizing the first \(j\) exponents from (10). Since

\[
2^{A_k}<3^k,
\]

Theorem 2 gives

\[
U^k(r_j)>r_j
\qquad(1\le k\le j).
\tag{12}
\]

The carry coordinate is also narrowly controlled. From

\[
\frac{3^i}{2}<2^{A_i}\le3^i
\]

we obtain

\[
\boxed{\;
\frac j2\,3^{j-1}
<
C_j
\le
j\,3^{j-1}.
\;}
\tag{13}
\]

Hence

\[
\log C_j
=
(j-1)\log3+\log j+O(1).
\]

We therefore have exact positive-integer trajectory prefixes of arbitrary depth satisfying simultaneously

\[
\left|A_j-\alpha j\right|<1,
\qquad
C_j\asymp j3^{j-1},
\qquad
U^k(r_j)>r_j\quad(k\le j).
\]

This directly disproves the proposed central statement:

> “The remaining critical cone is lattice-free beyond a finite radius.”

It is not lattice-free at any scale.

---

# 4. Why adding finitely many carry coordinates does not repair it

The prefix congruences are **nested**, not independent.

For \(k<\ell\),

\[
C_\ell
=
3^{\ell-k}C_k+
2^{A_k}D_{k,\ell}
\tag{14}
\]

for an integer \(D_{k,\ell}\) determined by the suffix \(a_k,\ldots ,a_{\ell-1}\).

Consequently, the combined exact-integrality conditions at times

\[
1,2,\ldots ,j
\]

do not define a lattice of index roughly

\[
2^{A_1+A_2+\cdots+A_j}.
\]

They define just one congruence class modulo

\[
2^{A_j+1}.
\]

Equivalently, all \(j\) valuation conditions have total index

\[
2^{A_j}
\]

inside the odd integers. The earlier conditions are already encoded by the terminal one.

This destroys the determinant multiplication that a geometry-of-numbers exclusion would require.

There is also a general projection obstruction. Let

\[
L:\mathbb Z^{j+1}\longrightarrow\mathbb Z^m
\]

be any integer-linear collection of trajectory or carry coordinates. Applied to the ray from Theorem 2,

\[
L(\mathbf y+t\mathbf d)
=
L(\mathbf y)+tL(\mathbf d).
\]

Either:

- \(L(\mathbf d)\ne0\), in which case the projected cone still contains an unbounded arithmetic progression of lattice points; or
- \(L(\mathbf d)=0\), in which case the projection collapses infinitely many distinct exact seeds and cannot determine whether one fixed positive seed persists.

Thus finitely many affine carry coordinates cannot convert the valid finite-prefix set into an eventually lattice-free set.

A large lattice determinant also says nothing about the location of an affine translate. The one-dimensional coset

\[
1+M\mathbb Z
\]

has covolume \(M\to\infty\) but always contains the bounded point \(1\). A hypothetical Collatz counterexample would manifest in exactly this way: a nested sequence of expanding-modulus affine lattices whose translates all contain one fixed small positive integer.

---

# 5. The correct object is a nested \(2\)-adic cusp

For an infinite exponent word, let \(r_j\) be the canonical residue associated with its first \(j\) exponents.

Because every extension realizing \(j+1\) exponents also realizes the first \(j\),

\[
r_{j+1}\equiv r_j\pmod {2^{A_j+1}}.
\]

Consequently,

\[
\boxed{\;
r_{j+1}
=
r_j+t_j2^{A_j+1},
\qquad
0\le t_j<2^{a_j}.
\;}
\tag{15}
\]

In particular, \(r_j\) is nondecreasing.

Every infinite exponent word determines exactly one \(2\)-adic integer through these nested residue classes; equivalently, every infinite parity sequence corresponds to exactly one \(2\)-adic seed. citeturn720760view2

The crucial elementary dichotomy is:

\[
\boxed{\;
(r_j)\text{ is bounded}
\iff
(r_j)\text{ is eventually constant}
\iff
\text{the infinite word is realized by a positive ordinary integer}.
\;}
\tag{16}
\]

Indeed, bounded nondecreasing integers eventually stabilize. Conversely, if a positive integer \(n\) realizes the infinite word, then once

\[
2^{A_j+1}>n,
\]

its least positive representative modulo \(2^{A_j+1}\) is exactly \(n\).

So the positive-integer locus is not characterized by finite integrality. It is characterized by the **eventual vanishing of all lift digits \(t_j\)** in (15).

That is an infinite-support condition. No fixed collection of congruences or carry coordinates can see it.

---

# 6. An exact corrected criterion equivalent to Collatz

Define the finite survivor minimum

\[
\mu_j
=
\min\left\{
n>1:
n\text{ odd and }U^k(n)\ge n
\text{ for }1\le k\le j
\right\}.
\tag{17}
\]

The set is nonempty: the seed \(2^{j+1}-1\) from (9) is one candidate.

The sequence \(\mu_j\) is nondecreasing.

## Theorem 3: cusp criterion

The Collatz conjecture is equivalent to

\[
\boxed{\;
\lim_{j\to\infty}\mu_j=\infty.
\;}
\tag{18}
\]

### Proof

Assume first that (18) holds. Let \(n>1\) be odd. Choose \(j\) such that

\[
\mu_j>n.
\]

Then \(n\) cannot remain above itself through its first \(j\) odd iterates. Hence

\[
U^k(n)<n
\]

for some \(k\le j\). Strong induction on \(n\) now shows that every odd \(n\) reaches \(1\), and therefore every positive integer reaches \(1\).

Conversely, suppose Collatz holds. For every fixed odd \(n>1\), some iterate is \(1<n\), so it has a finite first descent below \(n\). For any fixed \(N\), there are only finitely many odd \(n\le N\); take the maximum of their first-descent times. Beyond that depth, no \(n\le N\) contributes to (17). Therefore \(\mu_j>N\) for all sufficiently large \(j\). Since \(N\) was arbitrary, \(\mu_j\to\infty\). ∎

This identifies the precise theorem a repaired geometry-of-numbers approach would need:

\[
\boxed{
\begin{aligned}
&2^{a_i}x_{i+1}=3x_i+1,\qquad
x_i\in2\mathbb N+1,\\
&x_i\ge x_0>1\quad(1\le i\le j)
\end{aligned}
\quad\Longrightarrow\quad
x_0\ge g(j)
}
\tag{19}
\]

for some function \(g(j)\to\infty\).

But (19) is equivalent to Collatz; it is not a consequence of ordinary cone volume or lattice determinant estimates.

---

## The survivor points do lie in a genuine cone

There is still a useful cone bound. If

\[
x_i\ge x_0=n\ge3
\qquad(0\le i\le j),
\]

then

\[
\frac{x_j}{n}
=
\frac1{2^{A_j}}
\prod_{i=0}^{j-1}\left(3+\frac1{x_i}\right).
\]

Since \(x_j/n\ge1\),

\[
2^{A_j}
\le
\prod_{i=0}^{j-1}\left(3+\frac1{x_i}\right)
\le
\left(3+\frac1n\right)^j.
\]

Therefore

\[
\boxed{\;
A_j\le j\log_2\left(3+\frac1n\right)
\le
j\log_2\frac{10}{3}
\approx1.73697j.
\;}
\tag{20}
\]

Thus each finite survivor section has only finitely many exponent words.

For a divergent fixed orbit, \(x_i\to\infty\), so the average contribution of \(\log(1+1/(3x_i))\) vanishes and the upper slope approaches \(\log_2 3\). There is also a known parity-density rigidity result: López and Stoll prove that a divergent rational \(2\)-adic orbit must have lower parity density exactly \(\log 2/\log 3\). In odd-only coordinates, this forces \(A_j/j\) to approach \(\log_2 3\) along subsequences. citeturn720760view3

This validates the idea of studying a critical cone for a divergent counterexample—but the width-one mechanical construction proves that **critical angular confinement plus finite integrality is still insufficient**.

---

# 7. What remains of the geometry-of-numbers heuristic

There is a genuine entropy gap.

Fix

\[
A=\lfloor \alpha j\rfloor.
\]

The number of positive exponent words with total exponent \(A\) is

\[
\binom{A-1}{j-1}.
\]

Stirling’s formula gives

\[
\binom{A-1}{j-1}
=
2^{(\sigma+o(1))j},
\]

where

\[
\sigma
=
\alpha H_2(1/\alpha)
=
\alpha\log_2\alpha
-
(\alpha-1)\log_2(\alpha-1)
\approx1.5056438879.
\]

The number of odd residue classes modulo \(2^{A+1}\) is \(2^A\), with exponential rate

\[
\alpha=\log_2 3\approx1.5849625007.
\]

Thus the exponent gap is

\[
\alpha-\sigma
\approx0.0793186128.
\tag{21}
\]

So critical words occupy an exponentially sparse set of residue classes. Heuristically, their least positive representatives should grow like roughly

\[
2^{0.0793186j}.
\]

That would be more than enough to prove escape from every fixed seed.

But sparsity does not imply exclusion. An exponentially sparse subset of residue classes can still always contain the class of \(27\), or of some other fixed integer. Ordinary lattice counting produces a main volume term plus an \(O(1)\) boundary or discrepancy error. Once the main term is below \(1\), the \(O(1)\) error can hide exactly the one exceptional seed that matters.

A successful repair would therefore require an unusually strong **inhomogeneous discrepancy theorem with no additive \(O(1)\) loss**, or an arithmetic theorem proving that the lift digits \(t_j\) in (15) are nonzero infinitely often on every nontrivial survivor path. That is substantially stronger than showing the cone has small volume.

---

# Final verdict

The proposed approach does not yield a full proof because its central geometric assertion is explicitly false:

\[
\boxed{\text{The sustained-growth critical cone contains exact lattice points at every depth.}}
\]

This remains true:

- inside a width-one strip around \(A=j\log_2 3\);
- with exact affine carry identities;
- with exact positive-integer realizability;
- with strict growth at every prefix;
- and after adding any fixed finite collection of affine carry coordinates.

The correct replacement is not an eventually lattice-free cone. It is the nested-coset cusp statement

\[
\mu_j\longrightarrow\infty,
\]

or equivalently the assertion that every nontrivial infinite growth-compatible branch has canonical representatives \(r_j\to\infty\). Proving that escape requires control of the infinite nesting—or eventual binary support—of one fixed seed. Finite-dimensional geometry of numbers, determinant growth, and deletion of periodic sublattices do not supply that missing control.