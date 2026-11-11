model: GPT-5 Pro
round: 20 -- approach 15, Lee-Yang zeros of a Collatz partition function
front: proof
sent: 2026-08-13T18:43:41Z
worked: 32m 6s

---

# Outcome

After making the proposed statistical-mechanical model exact, **it does not produce a proof of Collatz**. The obstruction is concrete, rather than merely that Collatz is open:

1. Every finite accelerated valuation word is already exactly realizable by infinitely many positive integers. Therefore a finite-depth “integer realizability defect” is identically zero.
2. Even replacing that defect by “failure to remain critical” cannot yield extinction of finite critical words: arbitrarily long exactly realizable non-descending words exist.
3. Zero-freeness gives analyticity or correlation decay, not the nonexistence of an isolated arithmetic trajectory. A unique survivor can coexist with a completely zero-free partition function.

There is, however, a corrected **seed-pinned Lee–Yang formulation** in which a counterexample necessarily creates zeros pinching the physical point \(z=1\). A uniform zero-free region for that corrected partition function would prove Collatz. I derive the exact criterion below. The missing zero-free estimate turns out to be equivalent to a quantitative first-descent theorem stronger than Collatz itself.

Recent 2026 work continues to describe the conjecture as open, with Tao’s almost-all theorem remaining the strongest general analytic result. citeturn333960search5turn309707search0

---

## 1. Accelerated words and their natural drift

Work on the odd positive integers with the accelerated Syracuse map

\[
U(n)=\frac{3n+1}{2^{v_2(3n+1)}}.
\]

For an odd starting value \(n\), put

\[
a_k(n)=v_2\!\left(3U^k(n)+1\right)\ge 1.
\]

A finite valuation word is

\[
w=(a_0,\ldots ,a_{j-1})\in \mathbb N_{\ge 1}^{j}.
\]

Write

\[
A_k=\sum_{i=0}^{k-1}a_i,\qquad A_0=0,
\]

so that

\[
2^{A_j}U^j(n)=3^j n+C_w
\]

for an explicitly determined positive integer \(C_w\). The natural signed archimedean drift is

\[
D(w)=\log\frac{2^{A_j}}{3^j}
    =A_j\log 2-j\log 3.
\]

Negative \(D(w)\) means that the multiplicative part \(3^j/2^{A_j}\) grows; positive \(D(w)\) means contraction.

The proposed partition function is therefore naturally of the form

\[
Z_j(\beta,\gamma)
 =\sum_{w}
   e^{-\beta D(w)}
   e^{-\gamma\,\operatorname{def}(w)}.
\]

The first question is whether \(\operatorname{def}(w)\) can measure failure of a finite word to be realized by an actual positive integer.

It cannot.

---

## 2. Every finite valuation word is exactly realizable

### Theorem 1 — finite realizability is automatic

For every word

\[
w=(a_0,\ldots ,a_{j-1})\in\mathbb N_{\ge1}^{j},
\]

there are infinitely many positive odd integers \(n\) satisfying

\[
v_2\!\left(3U^k(n)+1\right)=a_k,
\qquad 0\le k<j.
\]

More precisely, these integers form one residue class modulo

\[
2^{A_j+1}.
\]

### Proof

Introduce the shortcut Collatz map on all integers,

\[
T(m)=
\begin{cases}
m/2,&m\equiv0\pmod2,\\[2mm]
(3m+1)/2,&m\equiv1\pmod2.
\end{cases}
\]

An accelerated step of valuation \(a_i\) corresponds to the parity block

\[
1\,0^{a_i-1}.
\]

To ensure that the result after the final block is again odd, append one final \(1\). Thus \(w\) determines the binary parity string

\[
b(w)=
1\,0^{a_0-1}\,
1\,0^{a_1-1}\cdots
1\,0^{a_{j-1}-1}\,1,
\]

whose total length is

\[
A_j+1.
\]

The finite parity-vector bijection says that every binary string of length \(L\) is realized on exactly one residue class modulo \(2^L\). In particular, that residue class contains infinitely many positive integers. Applying this with \(L=A_j+1\) gives the result. The parity-vector bijection and its extension to a bijection between infinite parity sequences and \(2\)-adic integers are classical; a modern exposition gives precisely these statements. citeturn200196view0

\(\square\)

### Immediate consequence

Suppose the defect has the intended meaning

\[
\operatorname{def}(w)=0
\quad\Longleftrightarrow\quad
w\text{ is realized by some positive integer}.
\]

Then

\[
\boxed{\operatorname{def}(w)=0\text{ for every finite }w.}
\]

The arithmetic part of the proposed partition function disappears.

For the natural drift,

\[
\begin{aligned}
Z_j(\beta,\gamma)
&=\sum_{a_0,\ldots ,a_{j-1}\ge1}
  \exp\!\left(
   -\beta\left[
      \left(\sum_i a_i\right)\log2-j\log3
   \right]\right)\\
&=\left(
   3^\beta\sum_{a\ge1}2^{-\beta a}
  \right)^j\\
&=\boxed{
 \left(\frac{3^\beta}{2^\beta-1}\right)^j
 },
\qquad \Re\beta>0.
\end{aligned}
\]

It is independent of \(\gamma\). It is meromorphic and has no nontrivial zeros. Its zero-freeness is simply the zero-freeness of a geometric series, not a theorem about Collatz.

If one truncates the alphabet to \(1\le a\le M\), one obtains

\[
Z_{j,M}(\beta)
 =
 \left[
  3^\beta
  \frac{2^{-\beta}(1-2^{-M\beta})}
       {1-2^{-\beta}}
 \right]^j.
\]

The new zeros come from

\[
2^{-M\beta}=1.
\]

They are artifacts of the artificial valuation cutoff \(M\), not arithmetic obstructions.

This is the first decisive failure of the proposed model.

---

## 3. Critical finite words never become extinct

Perhaps “defect” should instead measure failure of a word to remain above its starting seed. That also cannot produce finite-depth extinction.

### Theorem 2 — arbitrarily long exact non-descending words

For every \(j\ge1\), let

\[
n_j=2^{j+1}-1.
\]

Then the first \(j\) accelerated valuations of \(n_j\) are all equal to \(1\), and

\[
U^k(n_j)=3^k2^{j+1-k}-1,
\qquad 0\le k\le j.
\]

In particular,

\[
U^k(n_j)\ge n_j
\qquad 0\le k\le j.
\]

### Proof

Set

\[
x_k=3^k2^{j+1-k}-1.
\]

For \(0\le k<j\),

\[
\begin{aligned}
3x_k+1
&=3^{k+1}2^{j+1-k}-2\\
&=2\left(3^{k+1}2^{j-k}-1\right).
\end{aligned}
\]

Since \(j-k\ge1\), the quantity in parentheses is odd. Hence

\[
v_2(3x_k+1)=1
\]

and

\[
U(x_k)=3^{k+1}2^{j-k}-1=x_{k+1}.
\]

Also,

\[
x_k+1
 =3^k2^{j+1-k}
 =\left(\frac32\right)^k(n_j+1),
\]

so \(x_k\ge n_j\).

\(\square\)

Thus the all-ones word

\[
1^j=(1,\ldots ,1)
\]

is an exactly realizable critical word at every depth.

Moreover,

\[
n_j=2^{j+1}-1\longrightarrow -1
\qquad\text{in }\mathbb Z_2.
\]

The corresponding infinite valuation sequence \(1^\infty\) is realized by the \(2\)-adic fixed point

\[
U(-1)=-1.
\]

The all-one parity sequence corresponding to the \(2\)-adic integer \(-1\) is also explicit in the parity-sequence literature. citeturn200196view0

This reveals the fundamental compactness problem:

- archimedeanly, \(n_j\to+\infty\);
- \(2\)-adically, \(n_j\to-1\);
- every finite prefix looks perfectly realizable;
- the infinite limit is not a positive integer counterexample.

Consequently,

\[
\boxed{
\text{Finite critical words cannot become extinct, even if Collatz is true.}
}
\]

What must become extinct is not finite critical words in aggregate. It is the possibility that **one fixed positive seed** remains critical at every depth.

---

## 4. The correct pointwise event

For an odd \(n>1\), define its first-descent time

\[
\tau(n)=
\inf\{k\ge1:U^k(n)<n\},
\]

with \(\tau(n)=\infty\) if no such \(k\) exists.

### Proposition 3 — first descent is equivalent to Collatz

The Collatz conjecture is equivalent to

\[
\tau(n)<\infty
\qquad
\text{for every odd }n>1.
\]

### Proof

If Collatz holds, then every \(n>1\) eventually reaches \(1<n\), so \(\tau(n)<\infty\).

Conversely, suppose every odd \(n>1\) eventually reaches a smaller odd positive integer. Use strong induction on \(n\). Given \(n>1\), choose \(k\) such that

\[
m=U^k(n)<n.
\]

By induction, \(m\) reaches \(1\), and hence so does \(n\).

\(\square\)

This formulation simultaneously excludes divergent trajectories and nontrivial cycles. If any counterexample exists, its least odd element \(n_*\) satisfies

\[
U^k(n_*)\ge n_*
\qquad
\text{for all }k,
\]

so \(\tau(n_*)=\infty\).

Define the depth-\(j\) survivor set

\[
\mathcal S_j
 =
 \{n\ge3:n\text{ odd and }\tau(n)>j\},
\]

and its smallest element

\[
m_j=\min\mathcal S_j.
\]

Theorem 2 guarantees that \(\mathcal S_j\neq\varnothing\), since

\[
2^{j+1}-1\in\mathcal S_j.
\]

The correct compactness criterion is

\[
\boxed{
\text{Collatz holds}
\quad\Longleftrightarrow\quad
m_j\longrightarrow\infty.
}
\]

Indeed, a counterexample \(n_*\) gives \(m_j\le n_*\) for every \(j\). Conversely, if every fixed integer has finite first-descent time, then for each finite \(M\), all \(n\le M\) are absent from \(\mathcal S_j\) once \(j\) is sufficiently large.

---

## 5. A seed-pinned Lee–Yang partition function

The word-only partition function loses the distinction between a fixed seed and seeds escaping to infinity. The necessary correction is an archimedean chemical potential.

Fix \(\eta>0\). Define the grand partition function

\[
\boxed{
\Xi_j(z;\eta)
 =
 \prod_{n\in\mathcal S_j}
 \left(1+e^{-\eta n}z^j\right).
}
\]

This can be interpreted as a gas of independently occupiable depth-\(j\) survivor seeds. Expanding the product gives

\[
\Xi_j(z;\eta)
 =
 \sum_{\substack{F\subset\mathcal S_j\\F\text{ finite}}}
 e^{-\eta\sum_{n\in F}n}
 z^{j|F|}.
\]

For each fixed \(j\), the product converges uniformly on compact subsets of \(\mathbb C\), because

\[
\sum_{\substack{n\ge3\\n\text{ odd}}}e^{-\eta n}<\infty.
\]

It is therefore an entire function.

### Theorem 4 — exact location of the survivor zeros

The zeros of \(\Xi_j\) are exactly

\[
z_{j,n,\ell}
 =
 \exp\!\left(\frac{\eta n}{j}\right)
 \exp\!\left(\frac{(2\ell+1)\pi i}{j}\right),
\]

where \(n\in\mathcal S_j\) and \(\ell\in\mathbb Z\).

In particular, the zero generated by the smallest survivor \(m_j\) and closest to the positive real axis is

\[
\boxed{
z_j^*
 =
 \exp\!\left(\frac{\eta m_j}{j}\right)
 \exp\!\left(\frac{\pi i}{j}\right).
}
\]

### Proof

Each factor vanishes precisely when

\[
1+e^{-\eta n}z^j=0,
\]

or equivalently

\[
z^j=-e^{\eta n}.
\]

Taking the \(j\)-th roots gives the displayed formula. The convergent product has no other zeros.

\(\square\)

---

## 6. Counterexamples force Lee–Yang zeros to pinch \(z=1\)

Suppose \(n_*\) is a Collatz counterexample. Then

\[
n_*\in\mathcal S_j
\qquad\text{for every }j.
\]

Consequently, \(\Xi_j\) has the zero

\[
z_{j,n_*,0}
 =
 \exp\!\left(\frac{\eta n_*}{j}\right)
 \exp\!\left(\frac{\pi i}{j}\right).
\]

As \(j\to\infty\),

\[
z_{j,n_*,0}\longrightarrow1.
\]

Thus

\[
\boxed{
\text{A positive-integer counterexample forces zeros to pinch the physical point }z=1.
}
\]

This direction is fully rigorous.

The converse is not valid. Since

\[
z_j^*\to1
\quad\Longleftrightarrow\quad
\frac{m_j}{j}\to0
\]

along the relevant subsequence, zeros can pinch \(1\) even when

\[
m_j\to\infty
\]

and Collatz is true. Pinching may therefore indicate seeds with longer and longer finite excursions whose size grows sublinearly in their first-descent time. It does not, by itself, certify a fixed infinite survivor.

That corrects the proposed physical interpretation:

\[
\text{counterexample}\Longrightarrow\text{pinching},
\]

but not necessarily

\[
\text{pinching}\Longrightarrow\text{counterexample}.
\]

Lee–Yang theory associates accumulating zeros with thermodynamic singularities or competing phases, but an isolated arithmetic trajectory is not automatically a macroscopic phase. citeturn991325search3

---

## 7. The zero-free theorem that would prove Collatz

For \(R>1\) and \(\theta>0\), define the sector around the physical axis

\[
\Omega(R,\theta)
 =
 \left\{
 z\in\mathbb C:
 1\le |z|\le R,\quad |\arg z|\le\theta
 \right\}.
\]

### Theorem 5 — uniform zero-free sector implies Collatz

Suppose there exist constants

\[
\eta>0,\qquad R>1,\qquad \theta>0,\qquad J\ge1
\]

such that

\[
\Xi_j(z;\eta)\neq0
\]

for every \(j\ge J\) and every \(z\in\Omega(R,\theta)\).

Then

\[
m_j>\frac{\log R}{\eta}\,j
\]

for all sufficiently large \(j\), and consequently every positive integer reaches \(1\).

### Proof

Choose \(j\) large enough that

\[
\frac{\pi}{j}<\theta.
\]

Suppose some \(n\in\mathcal S_j\) satisfies

\[
n\le\frac{\log R}{\eta}\,j.
\]

Then

\[
\left|z_{j,n,0}\right|
 =
 e^{\eta n/j}
 \le R
\]

and

\[
\arg z_{j,n,0}=\frac{\pi}{j}<\theta.
\]

Thus \(z_{j,n,0}\in\Omega(R,\theta)\), contradicting zero-freeness. Hence every \(n\in\mathcal S_j\) obeys

\[
n>\frac{\log R}{\eta}\,j.
\]

Now fix any odd \(n>1\). Choose \(j\) with

\[
j>\frac{\eta}{\log R}\,n.
\]

Then \(n<m_j\), so \(n\notin\mathcal S_j\). Therefore \(\tau(n)\le j\). Proposition 3 finishes the proof.

\(\square\)

This is a genuine complete conditional proof:

\[
\boxed{
\text{Uniform Lee–Yang zero-freeness beyond }|z|=1
\Longrightarrow
\text{Collatz}.
}
\]

But the zero-free assertion is equivalent to a strong quantitative form of Collatz.

Indeed, the theorem gives

\[
\tau(n)
 \le
 \frac{\eta}{\log R}\,n+O(1).
\]

So it proves not merely eventual descent, but a linear upper bound for the first-descent time.

Conversely, if one could prove

\[
m_j\ge c j
\]

for some \(c>0\), then every zero of \(\Xi_j\) would have modulus at least

\[
e^{\eta c},
\]

and any disk

\[
|z|<R<e^{\eta c}
\]

would be uniformly zero-free.

Thus, up to the values of the constants,

\[
\boxed{
\text{Uniform zero-free region}
\quad\Longleftrightarrow\quad
m_j\gg j.
}
\]

The zero-free theorem has not reduced the arithmetic problem; it has encoded a quantitative version of it.

---

## 8. Equivalent exponential-extinction formulation

Define the weighted survivor mass

\[
S_j(\eta)
 =
 \sum_{n\in\mathcal S_j}e^{-\eta n}.
\]

Since \(m_j\) is the smallest odd survivor,

\[
e^{-\eta m_j}
 \le S_j(\eta)
 \le
 \sum_{\ell\ge0}e^{-\eta(m_j+2\ell)}
 =
 \frac{e^{-\eta m_j}}{1-e^{-2\eta}}.
\]

Therefore

\[
m_j\gg j
\]

is equivalent to

\[
\boxed{
S_j(\eta)\le C e^{-c j}
}
\]

for some \(C,c>0\).

This weighted estimate by itself proves Collatz. If \(n_*\) were a counterexample, then

\[
e^{-\eta n_*}
 \le S_j(\eta)
 \le Ce^{-cj}
\]

for every \(j\), which is impossible as \(j\to\infty\).

Hence the exact decisive theorem for this program is:

> **Pinned exponential-extinction theorem.**  
> There exist \(\eta,c,C>0\) such that
> \[
> \sum_{\substack{n\ge3,\ n\text{ odd}\\
> U^k(n)\ge n\ \forall\,1\le k\le j}}
> e^{-\eta n}
> \le Ce^{-cj}
> \]
> for every \(j\ge1\).

Proving this theorem would finish Collatz immediately.

It remains unproved.

---

## 9. Why ordinary Lee–Yang analyticity does not supply the theorem

There is a logical gap between zero-freeness and extinction.

Suppose a finite system has a unique zero-defect configuration of weight \(1\). Its partition function can simply be

\[
Z_j=1.
\]

This function is entire and zero-free everywhere, but the survivor exists.

More generally, a uniform zero-free region implies that

\[
\log Z_j
\]

can be chosen analytically. It does not imply that a particular coefficient vanishes, that the zero-defect sector is empty, or that the pressure has the sign needed for extinction.

If the zero-defect partition function is an integer count \(N_j\), then

\[
N_j>0\Longrightarrow \frac1j\log N_j\ge0.
\]

Proving strictly negative pressure would already prove \(N_j=0\) for all sufficiently large \(j\). In that normalization, the pressure estimate is simply extinction restated.

If configurations have weights smaller than \(1\), then negative pressure no longer implies emptiness: one surviving configuration may have exponentially small weight. One then needs a seed-dependent lower bound, which is exactly why the chemical potential \(e^{-\eta n}\) and the individual-factor product were introduced.

So the inference

\[
\text{zero-free region}
\Longrightarrow
\text{analytic pressure}
\Longrightarrow
\text{no survivor}
\]

is invalid without a separate quantitative coefficient or spectral estimate.

---

## 10. Why an unpinned model would recover only “almost all”

Under Haar measure on the odd \(2\)-adic integers, an exact valuation cylinder \(w\) has conditional measure

\[
2^{-A_j}
 =
 \prod_{i=0}^{j-1}2^{-a_i}.
\]

Thus the accelerated valuations are exactly independent geometric variables with

\[
\mathbb P(a_i=a)=2^{-a}.
\]

This is the natural random Syracuse model. It has negative mean logarithmic drift because

\[
\mathbb E a_i=2,
\qquad
\mathbb E\log\frac{3}{2^{a_i}}
 =\log\frac34<0.
\]

A partition function averaged over these cylinders is therefore extremely well suited to density statements. It is not automatically suited to excluding one exceptional cylinder or one fixed positive seed.

Tao’s result obtains approximate transport for Syracuse random variables and proves that almost all Collatz orbits attain almost bounded values in logarithmic density. Its conclusion remains averaged rather than pointwise. citeturn309707search0

There is a parallel issue in rigorous Lee–Yang theory. In representative zero-free-to-mixing results, the zero-free hypothesis must hold uniformly for systems with boundary conditions before one obtains strong spatial mixing. Even then, the conclusion is decay of boundary influence in a probability distribution, not the emptiness of the configuration space. citeturn421558view3turn607614view2

For Collatz, the necessary boundary conditions include at least:

\[
\text{starting }2\text{-adic cylinder},
\qquad
\text{archimedean seed height},
\qquad
\text{drift or height gap},
\qquad
\text{terminal }3\text{-adic carry state}.
\]

Zero-freeness only after averaging over starting cylinders would leave precisely the same pointwise gap as an almost-all theorem.

---

## 11. How the suffix-locality result could enter

Your terminal-suffix locality theorem can make part of the \(3\)-adic endpoint constraint into a finite-range interaction: modulo \(3^r\), the relevant terminal compatibility is determined by the final \(r\) valuations.

At fixed precision \(r\), one could therefore construct a transfer or polymer model whose state records

\[
\bigl(
\text{seed residue},
\text{height/drift state},
\text{last }r\text{ valuations},
\text{endpoint carry mod }3^r
\bigr).
\]

A maximal interval during which negative multiplicative drift is rescued by the affine carry could be treated as a polymer. The desired cluster-expansion estimate would resemble a Kotecký–Preiss condition uniform in:

\[
r,\qquad
\text{the initial seed cylinder},\qquad
\text{the endpoint boundary state}.
\]

Such uniformity could produce boundary-conditioned zero-freeness and a weighted contraction estimate.

But the crucial activity bound would have to show that a fixed small seed cannot support rescue polymers of arbitrary length. A hypothetical counterexample is exactly a fixed seed supporting such polymers forever. Consequently, the missing polymer estimate is not presently derivable from finite-word realizability or suffix locality alone.

The suffix theorem localizes the \(3\)-adic side. It does not localize the condition that the nested \(2\)-adic seed representatives eventually stabilize to one ordinary positive integer. That is an archimedean, non-shift-invariant boundary condition.

---

# Final assessment

The proposed partition function

\[
Z_j(\beta,\gamma)
 =
 \sum_w
 e^{-\beta\,\mathrm{drift}(w)}
 e^{-\gamma\,\mathrm{defect}(w)}
\]

cannot prove Collatz when the defect measures finite exact integer realizability:

\[
\operatorname{defect}(w)\equiv0.
\]

Its partition function factorizes explicitly and its zeros contain no Collatz information.

Replacing realizability by finite criticality also does not work, because exact critical words exist at every depth:

\[
w=1^j,\qquad n=2^{j+1}-1.
\]

A corrected seed-pinned grand partition function is

\[
\Xi_j(z;\eta)
 =
 \prod_{\tau(n)>j}
 \left(1+e^{-\eta n}z^j\right).
\]

For this model:

\[
\text{counterexample}
\Longrightarrow
\text{zeros pinch }z=1,
\]

and

\[
\text{uniform zero-free sector beyond }|z|=1
\Longrightarrow
m_j\gg j
\Longrightarrow
\text{Collatz}.
\]

The missing statement is equivalently

\[
\sum_{\tau(n)>j}e^{-\eta n}\le Ce^{-cj}.
\]

That is a precise and useful quantitative target, but it has not been proved here. Calling it a Lee–Yang zero-free theorem does not yet make it easier: for the corrected partition function, the location of the zeros shows that the desired zero-free region is essentially equivalent to that exponential first-descent estimate.

Thus approach 15 presently yields a rigorous **no-go theorem for the naive construction** and an exact **Lee–Yang reformulation of the decisive pointwise estimate**, rather than a completed proof of Collatz.