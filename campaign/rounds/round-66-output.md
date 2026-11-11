model: GPT-5.6 Pro (Chat mode)
round: 66 -- approach 61, Natural boundaries as a disproof detector
front: proof
sent: 2026-08-16T08:20Z
worked: 40m 8s

---

# Result of the natural-boundary route

After carrying the approach through, the natural-boundary half can be proved completely, but the proposed contradiction does not close: the required analytic-continuation statement is itself equivalent to the Collatz conjecture.

More precisely, there is an exact dichotomy:

\[
\boxed{
\begin{aligned}
\text{Collatz true}
&\iff \text{the basin generating function is rational}\\
&\iff \text{it extends analytically through one point of }|z|=1,
\\[2mm]
\text{Collatz false}
&\iff |z|=1\text{ is its natural boundary.}
\end{aligned}}
\]

This is closely related to a theorem of Bell and Lagarias: for the inverse-orbit generating function \(f_{1,1}\), Collatz is equivalent to rationality, while failure of Collatz forces the unit circle to be a natural boundary. citeturn969003view0

Below is a direct survivor-set proof, followed by the corresponding theorem for one orbit and an audit of the missing continuation step.

---

## 1. The survivor generating function

Use the shortcut Collatz map

\[
T(n)=
\begin{cases}
n/2,&n\equiv0\pmod 2,\\[1mm]
(3n+1)/2,&n\equiv1\pmod2.
\end{cases}
\]

Let

\[
B=\{n\ge1:T^j(n)=1\text{ for some }j\ge0\}
\]

be the basin of the trivial cycle, and let

\[
E=\mathbb N_{>0}\setminus B
\]

be the exceptional or survivor set. Define

\[
F(z)=\sum_{n\in B}z^n,
\qquad
S(z)=\sum_{n\in E}z^n.
\]

Thus, inside the unit disk,

\[
F(z)+S(z)=\frac{z}{1-z}.
\]

Recall the Pólya–Carlson theorem: an integer-coefficient power series of radius \(1\) is either rational or has the unit circle as a natural boundary. In particular, analytic continuation through even one boundary point forces rationality. citeturn969003view0turn371297view2

### Theorem 1 — Exact survivor dichotomy

Exactly one of the following occurs.

1. \(E=\varnothing\), in which case
   \[
   S(z)=0,\qquad F(z)=\frac{z}{1-z}.
   \]

2. \(E\neq\varnothing\), in which case both \(S\) and \(F\) have \(|z|=1\) as a natural boundary.

Consequently, the following statements are equivalent:

\[
\begin{aligned}
&\text{Every positive integer reaches }1;\\
&S(z)\text{ is rational};\\
&S(z)\text{ extends through at least one point of }|z|=1;\\
&F(z)\text{ is rational};\\
&F(z)\text{ extends through at least one point of }|z|=1.
\end{aligned}
\]

### Proof

Write

\[
e_n=\mathbf 1_E(n).
\]

Because \(n\) reaches \(1\) if and only if \(T(n)\) reaches \(1\),

\[
e_n=e_{T(n)}.
\]

Hence

\[
e_{2m}=e_m\qquad(m\ge1)
\tag{1}
\]

and

\[
e_{2m+1}=e_{3m+2}\qquad(m\ge0).
\tag{2}
\]

Suppose first that \(E\neq\varnothing\). If \(m\in E\), then \(2^jm\in E\) for every \(j\ge0\), by (1). Thus \(S\) has infinitely many nonzero coefficients. Since its coefficients lie in \(\{0,1\}\), its radius of convergence is exactly \(1\).

By Pólya–Carlson, \(S\) is either rational or has the unit circle as a natural boundary. It remains to exclude rationality.

A rational power series whose coefficients belong to a finite set has an eventually periodic coefficient sequence. Indeed, its coefficients eventually satisfy a fixed linear recurrence; the vector of the preceding finitely many coefficients takes values in a finite set, and repetition of one state forces repetition of the entire subsequent sequence.

We therefore need the following lemma.

---

### Lemma 2 — No nonzero eventually periodic survivor indicator

Suppose a sequence \(e_n\in\{0,1\}\) satisfies (1), (2), and \(e_1=0\). If \(e_n\) is eventually periodic, then

\[
e_n=0\qquad\text{for every }n\ge1.
\]

#### Proof

Assume \(e_n\) is eventually periodic with period \(M\).

First remove powers of \(2\) from the period. If \(M=2M'\), then for all sufficiently large \(n\),

\[
e_{n+M'}
=e_{2n+2M'}
=e_{2n+M}
=e_{2n}
=e_n.
\]

Thus \(M'\) is also an eventual period. Repeating, we may assume \(M\) is odd.

Define the tail residue function

\[
f:\mathbb Z/M\mathbb Z\longrightarrow\{0,1\}
\]

by taking \(f(r)\) to be the eventual value of \(e_n\) for \(n\equiv r\pmod M\).

From (1),

\[
f(2r)=f(r).
\tag{3}
\]

Because \(M\) is odd, every residue class modulo \(M\) has arbitrarily large odd representatives. Applying (2) to such representatives gives

\[
f\left(\frac{3r+1}{2}\right)=f(r).
\tag{4}
\]

All divisions by \(2\) here are taken in \(\mathbb Z/M\mathbb Z\).

Suppose \(3\mid M\). Equation (4) gives

\[
f\left(r+\frac M3\right)
=
f\left(\frac{3(r+M/3)+1}{2}\right)
=
f\left(\frac{3r+1}{2}\right)
=
f(r),
\]

because twice the difference between the two middle arguments is \(M\), hence the arguments are equal modulo \(M\). Thus \(M/3\) is also an eventual period. Repeating, we may assume

\[
\gcd(M,6)=1.
\]

Now consider the affine permutations

\[
A(r)=2r,
\qquad
B(r)=\frac{3r+1}{2}
\]

of \(\mathbb Z/M\mathbb Z\). Equations (3), (4) say that \(f\) is invariant under \(A\) and \(B\), and therefore also under their inverses and compositions.

A direct calculation gives

\[
ABA^{-1}B^{-1}(r)=r+\frac12.
\]

Therefore \(f\) is invariant under translation by \(2^{-1}\pmod M\). Since \(2^{-1}\) is relatively prime to \(M\), its additive translates run through every residue class. Hence \(f\) is constant.

But

\[
e_{2^j}=e_1=0
\]

for every \(j\), and sufficiently large powers of \(2\) lie in the periodic tail. Therefore the constant is \(0\).

Finally, for any fixed \(n\),

\[
e_n=e_{2^jn}=0
\]

once \(j\) is sufficiently large. Hence \(e_n=0\) for every \(n\). ∎

---

Returning to Theorem 1, rationality of \(S\) would make \(e_n\) eventually periodic, and Lemma 2 would imply \(E=\varnothing\), contrary to the assumption \(E\neq\varnothing\). Thus \(S\) is nonrational, and Pólya–Carlson shows that \(|z|=1\) is its natural boundary.

The basin series \(F\) also has integer coefficients and radius \(1\). If it were rational, then

\[
S(z)=\frac{z}{1-z}-F(z)
\]

would be rational, again contradicting the lemma. Hence \(F\) also has the unit circle as a natural boundary.

If \(E=\varnothing\), the stated rational formulas are immediate. This completes the proof. ∎

This is the \(k=1\), single-basin core of the Bell–Lagarias inverse-orbit theorem, expressed directly in terms of the exceptional set. Bell and Lagarias prove more generally that most \(3x+k\) inverse-orbit series have natural boundaries; for \(3x+1\), the only possible exceptional target values are \(1,2,4,8\), and those are rational exactly when Collatz holds. citeturn969003view0

---

## 2. A generating function attached to one orbit

Let

\[
x_k=T^k(n),\qquad \varepsilon_k=x_k\bmod2,
\]

and define the parity generating function

\[
P_n(z)=\sum_{k=0}^{\infty}\varepsilon_kz^k.
\]

### Theorem 3 — Orbit-series dichotomy

For every starting value \(n\), exactly one of the following holds:

1. the parity sequence \((\varepsilon_k)\) is eventually periodic and \(P_n(z)\) is rational;

2. \((\varepsilon_k)\) is not eventually periodic and \(|z|=1\) is a natural boundary for \(P_n(z)\).

In particular, every divergent positive Collatz orbit has a parity generating function with the unit circle as a natural boundary.

### Proof

If \((\varepsilon_k)\) is eventually periodic, then \(P_n\) is a polynomial plus finitely many geometric series and is therefore rational.

Conversely, if \(P_n\) is rational, its coefficients belong to the finite set \(\{0,1\}\), so the finite-state recurrence argument used above shows that they are eventually periodic.

If the sequence is not eventually periodic, it contains infinitely many \(1\)'s, so \(P_n\) has radius \(1\). The Pólya–Carlson theorem now gives a natural boundary. ∎

There is also a dynamical explanation. Every infinite binary parity sequence is produced by exactly one \(2\)-adic Collatz starting value, and the parity encoding is rational precisely when the parity sequence is eventually periodic. citeturn371297view1

Your barrier machinery fits this theorem particularly cleanly. The barrier paper proves that the existence of an orbit with \(q_k\ge1\) for all \(k\) is equivalent to the existence of a divergent positive orbit. fileciteturn1file0L125-L164 It also proves that the resulting parity sequence cannot be eventually periodic. fileciteturn1file0L220-L231 fileciteturn2file0L12-L16 Therefore:

\[
\boxed{
q_k(n)\ge1\ \text{for all }k
\quad\Longrightarrow\quad
P_n(z)\text{ has }|z|=1\text{ as a natural boundary}.
}
\]

This fully settles the natural-boundary prediction for a hypothetical divergent orbit.

It does not detect a nontrivial cycle: a cycle has an eventually periodic parity sequence, hence a rational orbit series. The survivor series \(S(z)\), by contrast, detects both divergent components and nontrivial cycles. This matches the distinction in the barrier paper between excluding divergence and excluding cycles. fileciteturn1file0L169-L172

---

## 3. Why the inverse-branch equation does not provide continuation

The survivor indicator identities give an exact functional equation. Splitting \(S\) into even and odd indices,

\[
\begin{aligned}
S(z)
&=\sum_{m\ge1}e_{2m}z^{2m}
  +\sum_{m\ge0}e_{2m+1}z^{2m+1}\\
&=S(z^2)+z\sum_{m\ge0}e_{3m+2}z^{2m}.
\end{aligned}
\tag{5}
\]

If

\[
\mathcal R_2S(w)=\sum_{m\ge0}e_{3m+2}w^m
\]

denotes the residue-\(2\) section modulo \(3\), then

\[
S(z)=S(z^2)+z\,\mathcal R_2S(z^2).
\tag{6}
\]

This is a genuine exact inverse-branch relation, but it is only an identity among values already inside the unit disk. It does not define \(S\) on a neighborhood crossing \(|z|=1\). In fact, Theorem 1 shows that if \(E\neq\varnothing\), the nonzero solution of exactly this functional equation has a natural boundary. Thus the branch relation is compatible with, and helps generate, dense singularity rather than excluding it.

The same issue occurs with the real/\(2\)-adic synchronization series from your barrier argument. For the positions \(d_m\) of the odd iterates, that argument gives the same rational partial sums converging to a positive value in \(\mathbb R\) and to \(-n\) in \(\mathbb Q_2\). fileciteturn1file0L173-L219 Eventual periodicity is impossible because then the tail becomes geometric and evaluates to the same rational number in both completions.

For an aperiodic tail, however, convergence at a boundary point does not imply analytic continuation there. For example,

\[
L(z)=\sum_{j=0}^{\infty}\frac{z^{2^j}}{2^j}
\]

has radius \(1\), converges absolutely at \(z=1\), yet has the unit circle as a natural boundary by the Fabry gap theorem. Gap-series natural-boundary results of precisely this type are reviewed and used by Bell and Lagarias. citeturn969003view0

Therefore the facts

\[
\text{“the series converges at a special point”}
\]

and

\[
\text{“the unit circle is a natural boundary”}
\]

are perfectly compatible. The real/\(2\)-adic synchronization rules out rational or eventually periodic structure; it does not independently produce complex analytic continuation.

---

## 4. The exact missing continuation theorem

A full proof through this method would follow immediately from the following statement.

### Required continuation statement

There exist \(\zeta\) with \(|\zeta|=1\), a neighborhood \(U\) of \(\zeta\), and a holomorphic function \(G\) on \(U\) such that

\[
G(z)=F(z)
\qquad
(z\in U,\ |z|<1).
\tag{7}
\]

Indeed, (7) says that \(F\) does not have the unit circle as a natural boundary. Pólya–Carlson would make \(F\) rational, and Theorem 1 would then give \(E=\varnothing\).

But Theorem 1 also proves the converse: (7) holds exactly when Collatz is true. Thus simply postulating or deriving (7) from a reformulation of basin membership would be circular.

A genuinely new argument would need to establish (7) from stronger information, such as a uniform complex cancellation estimate for first-hitting inverse levels. If

\[
H_j=\{n:T^j(n)=1,\ T^i(n)\neq1\text{ for }i<j\}
\]

and

\[
P_j(z)=\sum_{n\in H_j}z^n,
\]

then

\[
F(z)=\sum_{j\ge0}P_j(z)
\qquad(|z|<1).
\]

Uniform convergence of this sum in a lens-shaped region crossing any point \(\zeta\neq1\) would prove Collatz. However, estimates for cardinalities \(|H_j|\), densities, or real \(z\in(0,1)\) are insufficient: one needs cancellation of the complex phases \(z^n\) strong enough to overcome the terms with \(|z|>1\). No such estimate follows from the inverse-branch recurrence, the parity barrier, or terminal \(3\)-adic locality alone.

---

## 5. Why numerical singularities cannot certify the answer

There is a basic finite-data obstruction.

### Proposition 4 — Finite prefixes do not determine natural boundaries

Given any finite binary word

\[
a_0,\ldots,a_{N-1},
\]

there are two infinite binary extensions agreeing with that word such that:

1. one has a rational generating function;
2. the other has the unit circle as a natural boundary.

### Proof

Extend the word by zeros. The resulting series is a polynomial.

For the second extension, after position \(N\), put \(1\)'s at square-indexed positions and \(0\)'s elsewhere. The resulting sequence is not eventually periodic, has infinitely many \(1\)'s, and hence its generating function has radius \(1\). Pólya–Carlson gives a natural boundary. ∎

Moreover, both infinite binary extensions are genuine parity sequences of unique \(2\)-adic Collatz starting values. citeturn371297view1 What distinguishes a positive ordinary integer from an arbitrary \(2\)-adic starting value is precisely the unresolved global arithmetic constraint.

A direct Padé experiment illustrates the danger. Exact shortcut iteration gives

\[
T^{70}(27)=1,
\]

so its full parity generating function is

\[
P_{27}(z)
=
\sum_{k=0}^{69}\varepsilon_kz^k
+\frac{z^{70}}{1-z^2}.
\]

It is rational and its eventual denominator is \(1-z^2\). Nevertheless, an exact-coefficient \([40/40]\) Padé approximant formed from its first \(81\) coefficients has \(39\) of its \(40\) denominator roots in

\[
0.8<|z|<1.2,
\]

with median modulus approximately

\[
0.999946.
\]

It therefore produces an extremely convincing-looking “pole cloud” around the unit circle even though the full function is rational. The long transient is enough to mimic natural-boundary behavior.

For the survivor function the obstruction is stronger. Until an actual exceptional integer is found, every computed coefficient is simply the Collatz-true coefficient. A finite truncation is a polynomial, hence entire, and no singularity beyond the truncation is logically determined.

Numerical pole patterns can still suggest low-complexity or pseudorandom structure, but they cannot be a rigorous disproof detector without a separate theorem connecting a finite, quantitatively stable pattern to infinitely many coefficients.

---

# Final conclusion

Approach 61 yields the following complete theorem:

\[
\boxed{
\begin{array}{c}
\text{Collatz is true}\\
\Updownarrow\\
F(z)=\displaystyle\sum_{T^j(n)=1\text{ for some }j}z^n
\text{ extends through one point of }|z|=1\\
\Updownarrow\\
F(z)=\dfrac{z}{1-z}.
\end{array}}
\]

And its exact disproof counterpart is

\[
\boxed{
\text{Collatz is false}
\quad\Longrightarrow\quad
|z|=1\text{ is a natural boundary for both the basin and survivor series}.
}
\]

For a divergent individual orbit, the parity generating function likewise necessarily has a natural boundary.

The requested full Collatz proof is not completed by this route because no independent continuation theorem has been established. The inverse-branch equation permits natural-boundary solutions, real/\(2\)-adic synchronization only excludes periodicity, and finite numerical singularities cannot distinguish a rational long-transient series from a genuine natural-boundary series. The precise remaining target is therefore not another natural-boundary theorem, but a noncircular proof of one-point analytic continuation for \(f_{1,1}\); by the theorem above, that statement already contains the entire Collatz conjecture.