model: GPT-5 Pro
round: 22 -- approach 17, Tropicalize the cycle and near-cycle equations
front: proof
sent: 2026-08-13T18:45:57Z
worked: 46m 34s

---

# Tropicalizing the Collatz cycle equations

Carrying out the proposed program does **not** produce a valid proof of the Collatz conjecture. It produces something more precise than a generic “remaining gap”: a no-go theorem showing that ordinary tropicalization discards exactly the residue information that distinguishes a positive-integer Collatz orbit from the many rational and \(2\)-adic lifts that always exist.

As of Tao’s July 2026 revision of his Syracuse-orbit work, the full conjecture remains unresolved; his result is an almost-all theorem rather than a pointwise termination theorem. citeturn249030view3turn322555view0

What follows is the complete tropical analysis, including a classification of the possible rays and the exact lifting obstruction.

---

## 1. Exact valuation-word equations

Work with the accelerated odd Collatz map

\[
U(x)=\frac{3x+1}{2^{\nu_2(3x+1)}},
\qquad x\in 2\mathbb Z+1.
\]

For an orbit segment

\[
x_0=n,\qquad x_{t+1}=U(x_t),
\]

write

\[
a_t=\nu_2(3x_t+1)\geq 1,
\qquad
A_t=\sum_{i=0}^{t-1}a_i,
\qquad
A=A_j.
\]

For the word

\[
w=(a_0,\ldots,a_{j-1}),
\]

define

\[
C_w
=
\sum_{t=0}^{j-1}3^{j-1-t}2^{A_t}.
\]

Repeated substitution gives the exact affine identity

\[
\boxed{\,2^A U^j(n)=3^j n+C_w.\,}
\tag{1}
\]

This is the standard affine-word formulation of the Syracuse map. citeturn322555view0

Let

\[
D_w=2^A-3^j.
\]

If the word closes into a cycle, \(U^j(n)=n\), then

\[
\boxed{\,D_w n=C_w.\,}
\tag{2}
\]

Because \(C_w>0\), a positive cycle necessarily has

\[
D_w>0,
\qquad\text{equivalently}\qquad
A>j\log_2 3.
\tag{3}
\]

### Exact cycle criterion

A valuation word \(w\) produces a positive-integer cycle precisely when

\[
\boxed{\,D_w>0\quad\text{and}\quad D_w\mid C_w.\,}
\tag{4}
\]

The sufficiency is worth proving because it identifies the precise lifting problem.

For each cyclic rotation \(w^{(r)}\), let \(C_r=C_{w^{(r)}}\). Directly from the sum defining \(C_w\),

\[
3C_r+D_w=2^{a_r}C_{r+1},
\tag{5}
\]

where indices are cyclic. If \(D_w\mid C_0\), then (5), together with the fact that \(D_w\) is odd, implies successively that \(D_w\mid C_r\) for every \(r\). Put

\[
n_r=\frac{C_r}{D_w}.
\]

Then

\[
3n_r+1=2^{a_r}n_{r+1}.
\tag{6}
\]

Both \(C_r\) and \(D_w\) are odd, so every \(n_r\) is odd. Consequently,

\[
\nu_2(3n_r+1)=a_r,
\]

and the branch word is realized exactly.

Thus the nontrivial-cycle part of Collatz is exactly the assertion

\[
2^A-3^j\nmid C_w
\]

for every nontrivial word with \(2^A>3^j\).

---

## 2. Archimedean tropicalization

Set

\[
\alpha=\log_2 3,
\qquad
h_t=A_t-\alpha t,
\qquad
H=h_j=A-\alpha j.
\]

The quantity \(H\) is the total logarithmic drift of the word.

Since

\[
3^{j-1-t}2^{A_t}
=
3^{j-1}2^{h_t},
\]

we have

\[
C_w=3^{j-1}\sum_{t=0}^{j-1}2^{h_t},
\tag{7}
\]

while

\[
D_w=3^j(2^H-1).
\tag{8}
\]

Therefore every supercritical word \(H>0\) has a positive rational periodic seed

\[
\boxed{\,
n_w
=
\frac{C_w}{D_w}
=
\frac{\displaystyle\sum_{t=0}^{j-1}2^{h_t}}
     {3(2^H-1)}.
\,}
\tag{9}
\]

This is already an important obstruction to the proposed proof: **every supercritical word lifts to a positive rational periodic solution of its branch equations**. The issue is not existence of a lift; it is integrality.

Let

\[
M=\max_{0\leq t<j}h_t.
\]

Since

\[
2^M
\leq
\sum_{t<j}2^{h_t}
\leq
j2^M,
\]

equation (9) gives

\[
\boxed{
\frac{2^M}{3(2^H-1)}
\leq
n_w
\leq
\frac{j2^M}{3(2^H-1)}.
}
\tag{10}
\]

Thus the seed size has exactly two tropical sources:

1. a large interior maximum \(M\), which may be called a **tropical mountain**;
2. a small difference \(2^A-3^j\), or equivalently small \(H>0\), which may be called **Diophantine pinching**.

The tropical maximum detects the first phenomenon. Ordinary max-plus tropicalization does not adequately detect the second, because it occurs through cancellation between \(2^A\) and \(3^j\).

---

## 3. Classification of all archimedean rays

Write

\[
A_t=t+E_t,
\qquad
E_t=\sum_{i<t}(a_i-1).
\]

The sequence \(E_t\) is nondecreasing. For words \(w_k\) of lengths \(j_k\to\infty\), define

\[
e_k(s)=\frac{E_{\lfloor j_ks\rfloor}}{j_k},
\qquad 0\leq s\leq1.
\]

After taking a subsequence, the monotonicity of \(e_k\) gives convergence at continuity points to a nondecreasing function \(e\). Consequently every finite-height tropical path has the form

\[
\boxed{\,
\gamma(s)=(1-\alpha)s+e(s),
\qquad e\text{ nondecreasing}.
\,}
\tag{11}
\]

Conversely, such profiles can be approximated by valuation words by approximating \(je(s)\) with nondecreasing integer sequences.

So this classifies all archimedean valuation-word rays: they are a fixed line of slope \(1-\log_2 3\), plus an arbitrary nondecreasing excess profile.

Let

\[
h=\gamma(1),
\qquad
m=\sup_{0\leq s<1}\gamma(s).
\]

The endpoint \(h\) divides the rays into three fundamental classes.

| Tropical endpoint | Interpretation |
|---|---|
| \(h>0\) | Supercritical word; positive rational periodic branch solution exists |
| \(h=0\) | Critical ray; \(2^A\) and \(3^j\) have equal exponential scale |
| \(h<0\) | Subcritical ray; no positive periodic solution, but compatible with exponential growth |

For \(h>0\), equation (10) gives

\[
\lim_{k\to\infty}\frac{\log_2 n_{w_k}}{j_k}
=
m-h,
\tag{12}
\]

provided the indicated limits exist.

On the critical wall \(h=0\), one needs an additional pinching coordinate

\[
\pi_k
=
-\frac1{j_k}\log_2(2^{H_k}-1).
\tag{13}
\]

Then

\[
\frac{\log_2 n_{w_k}}{j_k}
=
m_k+\pi_k+o(1).
\tag{14}
\]

This coordinate is not determined by the limiting max-plus path \(\gamma\). Two words can have the same tropical path and radically different values of \(2^A-3^j\).

Therefore even at the real place, the ordinary tropical ray is not enough: one must retain a “phase of cancellation” between the two dominant exponentials.

---

## 4. Every large cycle ray is critical

Suppose \(x_0,\ldots,x_{j-1}\) is an actual positive cycle. From

\[
2^{a_t}x_{t+1}=3x_t+1
\]

we obtain

\[
2^{a_t}
=
3\frac{x_t}{x_{t+1}}
\left(1+\frac1{3x_t}\right).
\]

Multiplying around the cycle gives the exact product identity

\[
\boxed{\,
2^A
=
3^j\prod_{t=0}^{j-1}
\left(1+\frac1{3x_t}\right).
\,}
\tag{15}
\]

Taking logarithms,

\[
H\log 2
=
\sum_{t=0}^{j-1}
\log\left(1+\frac1{3x_t}\right)>0.
\tag{16}
\]

In particular, every positive cycle is supercritical.

If a sequence of distinct cycles existed, their minimum elements would tend to infinity: only finitely many integer states lie below any fixed bound, and two cycles cannot share a state. Consequently,

\[
\frac{H}{j}
=
\frac1{j\log2}
\sum_{t<j}
\log\left(1+\frac1{3x_t}\right)
\longrightarrow0.
\tag{17}
\]

Hence:

\[
\boxed{\text{Every asymptotic ray of distinct nontrivial cycles lies on }
A/j\to\log_2 3\text{ from above}.}
\tag{18}
\]

So the cycle-ray classification is very sharp:

- isolated finite cycles correspond to finite supercritical words;
- any hypothetical unbounded family of cycles accumulates on the critical wall;
- their sizes are produced by tropical mountains, denominator pinching, or both.

This is useful structural information, but it does not exclude the rays.

Existing cycle-exclusion methods already rule out many bounded-complexity rays. In the standard \(m\)-cycle decomposition by monotone blocks or local minima, Simons and de Weger excluded \(m\leq68\), and Hercher’s later computation and analysis extends the exclusion to \(m\leq91\). citeturn249030view1turn249030view2

---

## 5. Tropicalization at finite primes is vacuous

For a fixed word, write the cycle equation as the polynomial relation

\[
F_w(n)
=
2^A n-3^j n-
\sum_{t=0}^{j-1}3^{j-1-t}2^{A_t}
=0.
\tag{19}
\]

In ordinary nonarchimedean tropical geometry, a necessary condition for a sum to vanish is that the minimum valuation among its terms be attained at least twice. This is the usual bend-locus condition. citeturn337911view0turn249030view4

For the Collatz cycle equation, that condition holds automatically at every prime.

### At \(p=2\)

For a cycle seed \(n\), \(n\) is odd. The terms

\[
-3^j n
\quad\text{and}\quad
-3^{j-1}2^{A_0}=-3^{j-1}
\]

both have \(2\)-adic valuation zero. Thus the minimum is already attained twice.

### At \(p=3\)

We have

\[
D_w=2^A-3^j\not\equiv0\pmod3
\]

and

\[
C_w\equiv2^{A_{j-1}}\not\equiv0\pmod3.
\]

Therefore a possible integer seed \(n=C_w/D_w\) is a \(3\)-adic unit. The terms

\[
2^A n
\quad\text{and}\quad
-2^{A_{j-1}}
\]

both have \(3\)-adic valuation zero.

### At \(p\geq5\)

Every coefficient \(2^{A_t}3^{j-1-t}\) is a \(p\)-adic unit.

- If \(p\nmid n\), all terms have valuation zero.
- If \(p\mid n\), the \(j\) summands comprising \(C_w\) still all have valuation zero.

Again, the tropical minimum is attained many times.

Thus:

\[
\boxed{\text{Every valuation word satisfies every ordinary finite-place tropical bend condition.}}
\tag{20}
\]

There is no finite-prime tropical ray to exclude.

---

## 6. What the finite-place tropicalization loses

For a positive cycle, the actual condition is

\[
v_p(C_w)\geq v_p(D_w)
\qquad
\text{for every }p\mid D_w.
\tag{21}
\]

For \(p\geq5\), all the individual summands in \(C_w\) are \(p\)-adic units. A positive value of \(v_p(C_w)\) is produced entirely by cancellation among their residue classes.

Tropicalization retains the valuations

\[
v_p\!\left(3^{j-1-t}2^{A_t}\right)=0
\]

but discards the unit phases

\[
3^{j-1-t}2^{A_t}\pmod {p^r}.
\]

Those phases are exactly what determine whether

\[
C_w\equiv0\pmod {p^r}.
\]

If one enriches the tropicalization by retaining enough initial forms or residue data to determine these cancellations, the lifting condition becomes

\[
C_w\equiv0\pmod{D_w},
\tag{22}
\]

which is just the original cycle equation.

So there is a precise dichotomy:

\[
\begin{array}{ll}
\text{ordinary tropicalization} &
\text{is too weak and accepts every word},\\[2mm]
\text{full phase-enriched tropicalization} &
\text{contains }D_w\mid C_w\text{ and restates the hard problem}.
\end{array}
\tag{23}
\]

---

## 7. Every finite tropical ray has positive integral lifts

There is an even stronger obstruction.

For every finite word \(w\), the set of integer seeds realizing \(w\) is one residue class modulo \(2^{A+1}\):

\[
\boxed{\,
n\equiv
3^{-j}(2^A-C_w)
\pmod {2^{A+1}}.
\,}
\tag{24}
\]

Indeed, if \(w\) is realized, then (1) and the oddness of \(U^j(n)\) give

\[
3^j n+C_w\equiv2^A\pmod {2^{A+1}},
\]

which yields (24).

Conversely, suppose (24) holds. For \(j=1\), it says

\[
3n+1\equiv2^{a_0}\pmod {2^{a_0+1}},
\]

so \(\nu_2(3n+1)=a_0\). For a longer word, use

\[
C_w=3^{j-1}+2^{a_0}C_{\mathrm{tail}}
\]

and divide the congruence after the first exact branch; induction gives the entire word.

Therefore:

\[
\boxed{\text{Every finite valuation word is realized by infinitely many positive integers.}}
\tag{25}
\]

No finite-depth tropical obstruction can eliminate even one valuation word.

This also shows why a compactness argument is dangerous: compatible positive seeds may escape to infinity while converging to a nonpositive \(2\)-adic integer.

---

## 8. Every infinite ray has a unique \(2\)-adic lift

For an infinite word

\[
a=(a_0,a_1,\ldots),
\]

the residue classes (24) for its successive prefixes are nested. Since \(A_j\to\infty\), they determine a unique

\[
n_a\in\mathbb Z_2.
\]

Thus:

\[
\boxed{\text{Every infinite valuation ray has a unique exact }2\text{-adic Collatz seed}.}
\tag{26}
\]

This is closely related to the known conjugacy between the \(3x+1\) transformation on \(\mathbb Z_2\) and the binary shift. citeturn867756search1

The positive-integer problem is therefore not a question of whether a symbolic ray lifts. All rays lift. It is the much narrower question

\[
n_a\in\mathbb Z_{>0}\;?
\tag{27}
\]

### Two illustrative rays

The constant word

\[
(2,2,2,\ldots)
\]

lifts to

\[
n_a=1,
\]

the trivial fixed point.

The constant word

\[
(1,1,1,\ldots)
\]

lifts to

\[
n_a=-1\in\mathbb Z_2.
\]

Its length-\(j\) prefix is realized by the positive integer

\[
n_j=2^{j+1}-1.
\]

Indeed, for \(0\leq t\leq j\),

\[
U^t(n_j)=3^t2^{j+1-t}-1,
\]

and every one of the first \(j\) valuations equals \(1\).

Hence this single tropical ray has:

- positive integral lifts at every finite depth;
- a perfectly valid infinite \(2\)-adic lift;
- no fixed positive-integer infinite lift.

The distinction is completely invisible to ordinary tropical geometry.

---

## 9. Every supercritical periodic ray also lifts rationally

For a periodic word \(w\) with \(D_w>0\), equation (9) gives

\[
n_w=\frac{C_w}{D_w}>0.
\]

Because \(C_w\) and \(D_w\) are odd, this is a \(2\)-adic unit. The rotated values

\[
n_r=\frac{C_r}{D_w}
\]

satisfy

\[
3n_r+1=2^{a_r}n_{r+1}.
\]

Thus every supercritical word has a positive rational periodic branch orbit. It is integral exactly when

\[
D_w\mid C_w.
\]

So the full hierarchy of lifts is

\[
\begin{array}{c|c}
\text{object} & \text{existence}\\ \hline
\text{finite positive-integer orbit segment} & \text{always}\\
\text{infinite }2\text{-adic orbit} & \text{always}\\
\text{positive rational periodic branch orbit} & H>0\\
\text{positive-integer periodic orbit} & H>0\text{ and }D_w\mid C_w.
\end{array}
\tag{28}
\]

Only the last line is difficult, and tropical valuations do not distinguish it from the preceding lines.

---

## 10. A genuine theorem: eventually periodic rays cannot diverge

The tropical/adic framework does prove a useful exact result.

### Theorem

A positive-integer Collatz orbit with an eventually periodic valuation word is eventually periodic as an integer orbit. In particular, no divergent positive orbit can have an eventually periodic valuation word.

### Proof

Suppose that after some initial segment, the valuation word repeats a block

\[
v=(b_0,\ldots,b_{r-1})
\]

with total valuation

\[
B=\sum_{i=0}^{r-1}b_i.
\]

Let \(x\in\mathbb Z_2\) be the seed at the start of the repeating tail. Both \(x\) and \(U^r(x)\) have the same infinite valuation word. By uniqueness of the \(2\)-adic seed associated with an infinite word,

\[
U^r(x)=x.
\]

Therefore

\[
(2^B-3^r)x=C_v.
\tag{29}
\]

If \(B<r\log_2 3\), the right-hand side is positive and the denominator is negative, so \(x<0\).

If \(B>r\log_2 3\), then \(x\) is the positive rational periodic solution. When \(x\) is a positive integer, it is an actual cycle.

Equality \(2^B=3^r\) is impossible.

Thus a positive-integer orbit with an eventually periodic valuation tail must enter an integer cycle. ∎

Consequently, a hypothetical divergent Collatz orbit must have a genuinely aperiodic symbolic ray.

This excludes one natural class of tropical lifts, but not the general class.

---

## 11. Tropical rays of divergent orbits

Suppose a positive-integer orbit is unbounded and does not enter a cycle. Then necessarily

\[
x_k\longrightarrow\infty.
\tag{30}
\]

Otherwise some finite set of integers would be visited infinitely often, forcing a repeated state and hence a cycle.

At every step,

\[
\log x_{t+1}-\log x_t
=
\log3-a_t\log2
+
\log\left(1+\frac1{3x_t}\right).
\]

Summing gives

\[
\log x_k-\log x_0
=
k\log3-A_k\log2
+
\sum_{t=0}^{k-1}
\log\left(1+\frac1{3x_t}\right).
\tag{31}
\]

Because \(x_t\to\infty\), the final summand has Cesàro average tending to zero. Hence

\[
\boxed{\,
\frac{A_k}{k}
=
\log_2 3
-
\frac{\log_2 x_k}{k}
+o(1).
\,}
\tag{32}
\]

It follows that

\[
\limsup_{k\to\infty}\frac{A_k}{k}
\leq \log_2 3.
\tag{33}
\]

There are two possible tropical divergence classes.

### Exponential escape

If

\[
\frac{\log_2 x_k}{k}\longrightarrow\lambda>0,
\]

then

\[
\frac{A_k}{k}
\longrightarrow
\log_2 3-\lambda,
\]

so the ray is strictly subcritical.

### Subexponential escape

If

\[
\log x_k=o(k),
\]

then

\[
\frac{A_k}{k}\longrightarrow\log_2 3,
\]

so the ray lies on the critical wall, now approached from the nonpositive-drift side.

Thus the asymptotic classification is

\[
\boxed{
\begin{aligned}
\text{large cycles} &:\quad H_k/k\to0^+,\\
\text{subexponential divergence} &:\quad H_k/k\to0,\\
\text{exponential divergence} &:\quad H_k/k\to-\lambda<0.
\end{aligned}}
\tag{34}
\]

---

## 12. The near-cycle extraction step is not valid

The proposed approach assumes that a divergent orbit should generate arbitrarily long near-cycles. That does not follow from divergence.

For a block beginning at \(x_r\), with word \(v\), total \(B\), length \(j\), and drift

\[
H_v=B-j\log_2 3,
\]

the exact block identity is

\[
\frac{x_{r+j}}{x_r}
=
2^{-H_v}
+
\frac{C_v}{2^B x_r}.
\tag{35}
\]

A near-cycle \(x_{r+j}/x_r\approx1\) can arise in two ways:

1. **drift balance:** \(H_v\approx0\) and the affine correction is small;
2. **mountain balance:** the affine correction compensates a nonzero drift.

But a strictly subcritical exponentially escaping ray need not contain blocks with ratio close to \(1\). It may have persistent positive real growth. Tropical compactness produces a limiting symbolic profile, not recurrence in real height.

Therefore a proof based only on near-cycle equations would first need a new theorem:

> Every divergent positive-integer Collatz orbit contains arbitrarily long blocks whose endpoint heights nearly recur, or whose affine offsets satisfy an equally restrictive compensating relation.

That theorem is not supplied by tropicalization, and equation (32) alone does not imply it.

---

## 13. The \(3\)-adic suffix phase is real information, but not enough

There is an exact \(3\)-adic phase relation that ordinary tropicalization omits.

Suppose a suffix word \(v\) of length \(r\) maps \(y\) to \(x\). Then

\[
2^{A(v)}x=3^r y+C_v.
\]

Modulo \(3^r\),

\[
\boxed{\,
x\equiv2^{-A(v)}C_v\pmod {3^r}.
\,}
\tag{36}
\]

In particular,

\[
\boxed{\,
\nu_3(x+1)\geq r
\iff
3^r\mid C_v+2^{A(v)}.
\,}
\tag{37}
\]

This is the terminal-suffix locality phenomenon: the endpoint modulo \(3^r\) depends only on the last \(r\) valuations, not on the earlier prefix.

It is exactly the kind of phase information an enriched tropical theory would have to preserve. But it still does not decide cycles, because

\[
\gcd(D_w,6)=1.
\]

The primes controlling

\[
D_w\mid C_w
\]

are the varying primes \(p\geq5\) dividing \(2^A-3^j\). Complete cycle lifting requires simultaneous phase control at all of those primes.

---

## 14. The no-go theorem for bare tropicalization

The preceding arguments can be collected into one precise statement.

### Tropical no-go theorem

For the Collatz valuation-word equations:

1. every finite archimedean tropical ray has the form
   \[
   \gamma(s)=(1-\log_2 3)s+e(s)
   \]
   with \(e\) nondecreasing;

2. every finite-place ordinary tropical bend condition is automatically satisfied;

3. every finite valuation word has infinitely many positive-integer lifts;

4. every infinite valuation ray has a unique \(2\)-adic lift;

5. every supercritical periodic word has a positive rational periodic lift;

6. a supercritical periodic word has a positive-integer lift precisely when
   \[
   2^A-3^j\mid C_w.
   \]

Therefore no argument depending only on the ordinary tropical valuations of the cycle or near-cycle equations can prove that nontrivial rays fail to lift integrally.

### Proof

Statements 1–5 were proved above. Statement 6 is the exact cycle criterion (4). Ordinary tropicalization knows the valuations of the individual summands but not the residue cancellations determining \(v_p(C_w)\) and \(v_p(D_w)\). Hence it cannot decide statement 6. ∎

---

## 15. What a successful replacement theorem would need to say

The approach can be repaired only by replacing ordinary tropicalization with a **phase-enriched adelic tropicalization**. Such a theory would need two genuinely new theorems.

### Cycle phase-rigidity theorem

For every nontrivial supercritical word \(w\),

\[
\boxed{\,
C_w\not\equiv0\pmod {2^{A(w)}-3^{|w|}}.
\,}
\tag{38}
\]

A useful proof would need to derive this from a uniform restriction on the initial forms of the summands of \(C_w\), rather than merely computing the congruence itself.

### Aperiodic positive-lift exclusion theorem

Let \(a=(a_0,a_1,\ldots)\) be an aperiodic critical or subcritical ray, and let \(n_a\in\mathbb Z_2\) be its unique \(2\)-adic lift. Prove that

\[
\boxed{\,
n_a\notin\mathbb Z_{>0}.
\,}
\tag{39}
\]

Equivalently, prove that for a fixed positive integer \(n\), the nested cylinder congruences

\[
n\equiv
3^{-j}(2^{A_j}-C_j)
\pmod {2^{A_j+1}}
\tag{40}
\]

cannot hold indefinitely along a critical or subcritical aperiodic word unless the orbit eventually descends into the trivial cycle.

This is a pointwise synchronization theorem between:

- the fixed archimedean integer \(n\);
- its increasingly precise \(2\)-adic seed cylinders;
- the \(3\)-adic endpoint/carry phases;
- the varying \(p\)-adic phases for primes dividing \(2^{A_j}-3^j\).

Tao’s work obtains strong almost-all orbit descent through probabilistic and \(3\)-adic mixing methods, but it does not provide this uniform pointwise synchronization over every starting cylinder. citeturn322555view0

---

# Conclusion

The tropical program yields several rigorous deductions:

\[
\begin{gathered}
\text{all archimedean rays are classified by monotone excess profiles},\\
\text{all large cycle rays approach the critical wall from above},\\
\text{divergent rays are critical or subcritical},\\
\text{eventually periodic divergent rays are impossible},\\
\text{every finite ray has positive integral realizations},\\
\text{every infinite ray has a unique }2\text{-adic realization}.
\end{gathered}
\]

But the requested final statement—

> classify the tropical rays and prove that none except the trivial one lifts to a positive integer—

is false as a consequence of ordinary tropical data. Tropicalization accepts every word locally and every ray \(2\)-adically. The distinction between the trivial lift \(1\), the nonpositive lift \(-1\), a positive rational periodic lift, and a positive integral cycle is carried by residue phases that tropical valuations erase.

Accordingly, this approach does **not** complete a proof of Collatz. Its decisive missing result is an adelic phase-rigidity theorem excluding positive-integer lifts of all nontrivial critical, subcritical, and supercritical rays. Proving that theorem would indeed prove Collatz, but it does not follow from the tropical classification itself.