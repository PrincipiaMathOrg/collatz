model: GPT-5.6 Pro (Chat mode)
round: 76 -- approach 71, Characterize the positive-integer image of the parity conjugacy
front: proof
sent: 2026-08-16T18:43Z
worked: 45m 27s

---

# Verdict

This approach **does completely solve the characterization subproblem**, but it does **not yet give a valid full proof of Collatz**. The precise obstruction is now transparent:

1. A parity sequence is the image of a nonnegative ordinary integer exactly when a certain intrinsically defined binary carry sequence has finite support.
2. Combining this with the strongest available drift reduction shows that excluding divergent Collatz orbits is equivalent to proving that every critical-drift parity sequence creates infinitely many inverse carries.
3. That carry–drift statement is not presently proved; in fact, it is equivalent to the divergent-orbit half of Collatz.
4. Nontrivial cycles remain a separate periodic divisibility problem.

Claiming a complete proof at the carry–drift step would therefore be circular. What follows is the exact characterization, its proof, the strongest resulting reduction, and a complete conditional proof skeleton.

---

## 1. The parity conjugacy

Use the shortcut map

\[
T(x)=
\begin{cases}
x/2,&x\equiv0\pmod2,\\[1mm]
(3x+1)/2,&x\equiv1\pmod2.
\end{cases}
\]

For \(x\in\mathbb Z_2\), write

\[
\epsilon_k=T^k(x)\pmod2,
\qquad
Q(x)=\sum_{k\ge0}\epsilon_k2^k.
\]

The map \(Q:\mathbb Z_2\to\mathbb Z_2\) is a bijective isometry, and its inverse \(\Phi=Q^{-1}\) conjugates the binary shift to \(T\). Every infinite binary sequence is therefore the parity sequence of a unique \(2\)-adic integer. citeturn758468view0turn758468view1

Let

\[
s_k=\sum_{j=0}^{k-1}\epsilon_j,\qquad s_0=0.
\]

The inverse formula is

\[
\boxed{\displaystyle
\Phi\!\left(\sum_{j\ge0}\epsilon_j2^j\right)
=
-\sum_{j\ge0}
\frac{\epsilon_j2^j}{3^{s_{j+1}}}
}
\qquad\text{in }\mathbb Z_2 .
\tag{1}
\]

This is the standard \(2\)-adically convergent inverse expansion. citeturn758468view0turn758468view1

The symbolic dynamics is thus completely understood. The remaining issue is ordinary, archimedean finiteness: when is the \(2\)-adic number in (1) a nonnegative integer?

---

# 2. Exact characterization of the positive-integer image

For a finite parity prefix

\[
w_k=(\epsilon_0,\ldots,\epsilon_{k-1}),
\]

define its **canonical inverse residue**

\[
\boxed{\displaystyle
\rho_k(\epsilon)
=
\left[
-\sum_{j=0}^{k-1}
\frac{\epsilon_j2^j}{3^{s_{j+1}}}
\right]_{2^k}
}
\tag{2}
\]

where \([a]_{2^k}\) means the unique representative of the \(2\)-adic residue \(a\bmod 2^k\) lying in

\[
0\le [a]_{2^k}<2^k.
\]

Equivalently, \(\rho_k\) is the least nonnegative integer whose first \(k\) Collatz parity bits are \(w_k\).

Because the inverse residues are compatible,

\[
\rho_{k+1}\equiv \rho_k\pmod{2^k},
\]

and because both are canonical representatives, there is a unique bit \(b_k\in\{0,1\}\) such that

\[
\boxed{\rho_{k+1}=\rho_k+b_k2^k.}
\tag{3}
\]

Thus

\[
\rho_k=\sum_{j=0}^{k-1}b_j2^j,
\qquad
\Phi(Q)=\sum_{j\ge0}b_j2^j
\quad\text{in }\mathbb Z_2.
\tag{4}
\]

The \(b_j\) are simply the ordinary binary digits of the inverse \(2\)-adic integer, but importantly they are computed intrinsically from successive parity prefixes.

## Theorem 1 — Finite-support carry characterization

For an infinite parity sequence \(\epsilon\), the following are equivalent:

\[
\begin{aligned}
\text{(i)}\quad&
\Phi(\epsilon)\in\mathbb Z_{\ge0},\\
\text{(ii)}\quad&
b_k=0\quad\text{for all sufficiently large }k,\\
\text{(iii)}\quad&
\rho_k\quad\text{is eventually constant},\\
\text{(iv)}\quad&
\sup_k\rho_k<\infty,\\
\text{(v)}\quad&
\frac{\rho_k}{2^k}\longrightarrow0.
\end{aligned}
\tag{5}
\]

### Proof

From (3), \(\rho_k\) is nondecreasing, and it changes at stage \(k\) precisely when \(b_k=1\). Consequently,

\[
b_k=0\text{ eventually}
\quad\Longleftrightarrow\quad
\rho_k\text{ is eventually constant}
\quad\Longleftrightarrow\quad
(\rho_k)\text{ is bounded}.
\]

If the eventual value is \(n\), then

\[
\Phi(\epsilon)\equiv n\pmod{2^k}
\]

for every sufficiently large \(k\), and hence \(\Phi(\epsilon)=n\) in \(\mathbb Z_2\). Since \(n\ge0\), this proves (ii) \(\Rightarrow\) (i).

Conversely, suppose \(\Phi(\epsilon)=n\in\mathbb Z_{\ge0}\). Once \(2^k>n\), the least nonnegative representative of \(n\bmod2^k\) is \(n\) itself. Hence \(\rho_k=n\) for every sufficiently large \(k\).

Eventual constancy clearly implies \(\rho_k/2^k\to0\). Conversely, if infinitely many \(b_k\) equal \(1\), then at every such stage

\[
\frac{\rho_{k+1}}{2^{k+1}}
\ge \frac{2^k}{2^{k+1}}
=\frac12.
\]

Thus \(\rho_k/2^k\) cannot tend to zero. This proves all the equivalences. ∎

There is also a signed version:

\[
\boxed{
\Phi(\epsilon)\in\mathbb Z
\quad\Longleftrightarrow\quad
(b_k)\text{ is eventually constant}.
}
\tag{6}
\]

Eventual zero output gives a nonnegative integer; eventual one output gives a negative integer. For example, the all-one parity sequence has \(b_k=1\) for every \(k\) and inverse \(-1\).

This is an exact intrinsic characterization of the desired image:

\[
\boxed{\displaystyle
Q(\mathbb Z_{\ge0})
=
\left\{
\epsilon:
\sup_k
\left[
-\sum_{j<k}
\frac{\epsilon_j2^j}{3^{s_{j+1}}}
\right]_{2^k}
<\infty
\right\}.
}
\tag{7}
\]

---

# 3. A prefix-only carry machine

The characterization can be put into a more dynamical form that does not explicitly mention \(\Phi\).

Define the affine carry

\[
C_0=0,\qquad
C_{k+1}=3^{\epsilon_k}C_k+\epsilon_k2^k.
\tag{8}
\]

Thus

\[
C_k
=
\sum_{j=0}^{k-1}
\epsilon_j2^j3^{s_k-s_{j+1}},
\tag{9}
\]

and for any integer realizing the prefix,

\[
2^kT^k(n)=3^{s_k}n+C_k.
\tag{10}
\]

For the canonical seed \(\rho_k\), define its canonical endpoint

\[
\boxed{\displaystyle
z_k=\frac{3^{s_k}\rho_k+C_k}{2^k}.
}
\tag{11}
\]

This is an integer because of the defining congruence for \(\rho_k\).

## Proposition 2 — Intrinsic carry recursion

Starting from

\[
s_0=0,\qquad \rho_0=0,\qquad z_0=0,
\]

the complete inverse process is

\[
\boxed{\displaystyle
b_k\equiv z_k+\epsilon_k\pmod2,
\qquad b_k\in\{0,1\},
}
\tag{12}
\]

\[
\boxed{\displaystyle
\rho_{k+1}=\rho_k+b_k2^k,
}
\tag{13}
\]

\[
\boxed{\displaystyle
z_{k+1}
=
\frac{
3^{\epsilon_k}z_k+\epsilon_k+
b_k3^{s_{k+1}}
}{2}.
}
\tag{14}
\]

Moreover,

\[
\boxed{0\le z_k<3^{s_k}.}
\tag{15}
\]

### Proof

Lifting \(\rho_k\) to \(\rho_k+b2^k\) changes its endpoint after the first \(k\) prescribed steps from \(z_k\) to

\[
z_k+b3^{s_k}.
\]

That endpoint must have parity \(\epsilon_k\). Since \(3^{s_k}\) is odd,

\[
z_k+b3^{s_k}\equiv\epsilon_k\pmod2
\]

is equivalent to (12). Applying the branch with parity \(\epsilon_k\) gives (14).

The bound (15) follows inductively from the four possibilities for \((\epsilon_k,z_k\bmod2)\). For example, when \(\epsilon_k=0\),

\[
z_{k+1}=
\begin{cases}
z_k/2,&z_k\text{ even},\\[1mm]
(z_k+3^{s_k})/2,&z_k\text{ odd},
\end{cases}
\]

and both values remain below \(3^{s_k}\). The two odd-branch cases are analogous. ∎

This gives another exact form of Theorem 1:

\[
\boxed{\displaystyle
\Phi(\epsilon)\in\mathbb Z_{\ge0}
\iff
z_k\equiv\epsilon_k\pmod2
\quad\text{for all sufficiently large }k.
}
\tag{16}
\]

In words:

> A parity sequence comes from a nonnegative ordinary integer exactly when, after finitely many inverse carries, every next parity bit agrees with the parity predicted by the canonical endpoint of the preceding prefix.

The finite initial mismatches \(b_k=1\) reveal the binary digits of the starting integer. Once the starting integer has been completely revealed, no further lift by \(2^k\) is needed.

---

# 4. What drift does to the canonical endpoints

Define

\[
q_k=\frac{3^{s_k}}{2^k}
\]

and let the **barrier language** be

\[
\mathcal B=
\left\{
\epsilon:
3^{s_k}\ge2^k\text{ for every }k
\right\}.
\tag{17}
\]

Put

\[
R_k=\frac{C_k}{3^{s_k}}
=
\sum_{j=0}^{k-1}
\frac{\epsilon_j2^j}{3^{s_{j+1}}}.
\tag{18}
\]

From (11),

\[
\frac{z_k}{3^{s_k}}
=
\frac{\rho_k+R_k}{2^k}.
\tag{19}
\]

If \(\epsilon\in\mathcal B\), then whenever \(\epsilon_j=1\),

\[
\frac{2^j}{3^{s_{j+1}}}
=
\frac{1}{3}\frac{2^j}{3^{s_j}}
\le\frac13.
\]

Consequently,

\[
0\le R_k\le \frac{s_k}{3}\le\frac{k}{3},
\]

and therefore

\[
\boxed{\displaystyle
0\le
\frac{z_k}{3^{s_k}}-\frac{\rho_k}{2^k}
\le
\frac{k}{3\cdot2^k}.
}
\tag{20}
\]

Hence, on the critical-drift language,

\[
\boxed{\displaystyle
\Phi(\epsilon)\in\mathbb Z_{\ge0}
\iff
\frac{z_k}{3^{s_k}}\longrightarrow0.
}
\tag{21}
\]

So the positive-integer image is equivalently the set of barrier words whose canonical endpoints approach the lower-left corner of the mixed dyadic/ternary rectangle

\[
0\le \rho_k<2^k,\qquad 0\le z_k<3^{s_k}.
\]

This is the desired cross-prime localization statement in a particularly sharp form.

---

# 5. Exact combination with the drift theorem

The previous barrier work established the following equivalence:

\[
\boxed{\begin{aligned}
&\text{There is a divergent positive Collatz orbit}\\
&\qquad\Longleftrightarrow\\
&\text{there is an }n>1\text{ such that }q_k(n)\ge1
\text{ for every }k.
\end{aligned}}
\tag{22}
\]

The difficult converse uses orbit sparsity to prove convergence of the reciprocal sum, convergence of the multiplicative correction product, and therefore \(q_k\to\infty\) along an orbit tending to infinity. One then shifts the orbit to a global minimum of \(q_k\). fileciteturn2file0L13-L53 fileciteturn2file0L56-L86

The characterization above turns (22) into the following exact statement.

## Theorem 3 — Divergence as finite-support carry inside the barrier

The following are equivalent:

\[
\begin{aligned}
\text{(i)}\quad&
\text{A positive Collatz orbit diverges};\\[1mm]
\text{(ii)}\quad&
\exists\,\epsilon\in\mathcal B
\text{ with }\Phi(\epsilon)\in\mathbb Z_{>1};\\[1mm]
\text{(iii)}\quad&
\exists\,\epsilon\in\mathcal B
\text{ for which }b_k=0\text{ eventually};\\[1mm]
\text{(iv)}\quad&
\exists\,\epsilon\in\mathcal B
\text{ for which }\rho_k\text{ is bounded};\\[1mm]
\text{(v)}\quad&
\exists\,\epsilon\in\mathcal B
\text{ for which }z_k/3^{s_k}\to0.
\end{aligned}
\tag{23}
\]

### Direct proof of the forward implication from a barrier point

Suppose \(\epsilon\in\mathcal B\) and \(\Phi(\epsilon)=n>1\). Its actual orbit satisfies

\[
x_k
=
q_k(n+R_k)
\ge n.
\tag{24}
\]

It cannot repeat. If \(x_i=x_j\), \(i<j\), the corresponding repeated block has

\[
x_i=\frac{3^m x_i+C}{2^\ell},\qquad C>0,
\]

so \(3^m/2^\ell<1\). Repetition of that cycle would force the later \(q\)-values to tend to zero, contradicting \(q_k\ge1\).

Thus the orbit is injective. An injective sequence of positive integers eventually leaves every finite interval, so \(x_k\to\infty\).

The reverse implication is precisely the global-minimum shift furnished by (22).

---

## The missing drift theorem

The theorem needed to finish the divergent-orbit half is now a completely intrinsic statement:

\[
\boxed{\begin{minipage}{0.88\linewidth}
For every binary sequence \(\epsilon\) satisfying
\[
3^{s_k}\ge2^k\qquad(k\ge0),
\]
the inverse-carry sequence \(b_k\) contains infinitely many \(1\)'s.
\end{minipage}}
\tag{D}
\]

Equivalent formulations are

\[
\sup_k\rho_k=\infty,
\tag{25}
\]

\[
\limsup_{k\to\infty}\frac{\rho_k}{2^k}\ge\frac12,
\tag{26}
\]

or, using (20),

\[
\limsup_{k\to\infty}
\frac{z_k}{3^{s_k}}
\ge\frac12.
\tag{27}
\]

But Theorem 3 shows that **(D) is equivalent to the nonexistence of divergent positive Collatz orbits**. It is not a consequence of the currently known drift theorem: the known result says that an already-existing divergent integer orbit can be shifted into the barrier. It does not prove that a barrier word must keep producing new inverse carries.

That is the precise point where a seemingly natural “combine with drift” argument becomes circular.

---

# 6. The finite extremal formulation

For \(K\ge1\), define

\[
M_K
=
\min\left\{
n>1:
q_j(n)\ge1\text{ for }0\le j\le K
\right\}.
\tag{28}
\]

Equivalently, for \(K\ge2\),

\[
M_K
=
\min_{\substack{w\in\mathcal B_K\\ \rho_K(w)>1}}
\rho_K(w),
\tag{29}
\]

where \(\mathcal B_K\) is the set of length-\(K\) barrier words.

Since a seed surviving \(K+1\) also survives \(K\), \(M_K\) is nondecreasing. The exact compactness statement is

\[
\boxed{\displaystyle
\text{a divergent barrier orbit exists}
\iff
(M_K)\text{ is bounded}
\iff
(M_K)\text{ is eventually constant}.
}
\tag{30}
\]

Thus

\[
\boxed{\displaystyle
\text{no divergent positive orbit}
\iff M_K\longrightarrow\infty.
}
\tag{31}
\]

This finite criterion was already isolated in the barrier manuscript. fileciteturn1file2L132-L144

The exact search below \(2^{28}\) found no seed surviving through depth \(1024\); the longest observed seed survived the coefficient barrier through depth \(394\). This supports growth of \(M_K\), but it supplies no all-\(K\) lower bound. fileciteturn4file0L20-L45

The characterization in this answer explains exactly what such a lower bound must prove: a long drift-compatible parity prefix must eventually reveal a new high binary digit of its inverse seed.

---

# 7. Why no finite-prefix argument can finish the proof

Every finite parity word occurs for a positive integer.

Indeed, given a length-\(K\) word \(w\), its canonical residue \(\rho_K(w)\) realizes it; so do all positive integers

\[
\rho_K(w)+m2^K.
\]

Thus every finite barrier word has positive-integer realizations. The obstruction can only be that the realizations drift to infinity as \(K\) increases instead of stabilizing to one fixed integer.

The simplest example is the all-one word. Its length-\(K\) prefix is realized by

\[
\rho_K=2^K-1,
\]

and satisfies the barrier very strongly. But the infinite all-one sequence has inverse

\[
\Phi(111\ldots)=-1,
\]

not a positive integer. Its canonical residues never stabilize.

Topologically, \(Q(\mathbb Z_{\ge0})\) is countable but dense in the full parity shift, since \(\mathbb Z_{\ge0}\) is dense in \(\mathbb Z_2\) and \(Q\) is an isometry. Consequently, no finite forbidden-word theorem, ordinary compactness argument, or finite-state local rule can separate the positive-integer image from the rest of the shift. The proof has to establish an unbounded-scale carry obstruction. citeturn758468view1

---

# 8. A stronger real/\(2\)-adic consequence

The characterization can be combined with the earlier synchronization identity to derive a useful two-shadow description.

Suppose hypothetically that a positive barrier orbit exists. Let

\[
x_k=T^k(n),\qquad
h_k=\frac{x_k}{q_k},
\qquad
h_k\longrightarrow H.
\]

The previous work proves that if \(d_m\) are the positions of the odd iterates, then

\[
\sum_{m\ge0}\frac{2^{d_m}}{3^{m+1}}
=
H-n>0
\quad\text{in }\mathbb R,
\tag{32}
\]

whereas the same partial sums converge to

\[
-n
\quad\text{in }\mathbb Q_2.
\tag{33}
\]

It also gives \(3^m/2^{d_m}\to\infty\). fileciteturn2file0L95-L129

For every time \(t\), define the real suffix sum

\[
a_t
=
\sum_{j\ge0}
\frac{\epsilon_{t+j}2^j}
{3^{\epsilon_t+\cdots+\epsilon_{t+j}}}.
\tag{34}
\]

Then

\[
a_t=-x_t\quad\text{in }\mathbb Q_2,
\tag{35}
\]

but

\[
a_t=q_t(H-h_t)>1
\quad\text{in }\mathbb R.
\tag{36}
\]

Moreover,

\[
a_{t+1}
=
\begin{cases}
a_t/2,&\epsilon_t=0,\\[1mm]
(3a_t-1)/2,&\epsilon_t=1.
\end{cases}
\tag{37}
\]

Thus a divergent positive Collatz orbit would produce, with the same labels, two simultaneous trajectories:

\[
x_{t+1}
=
\begin{cases}
x_t/2,&\epsilon_t=0,\\
(3x_t+1)/2,&\epsilon_t=1,
\end{cases}
\]

and

\[
a_{t+1}
=
\begin{cases}
a_t/2,&\epsilon_t=0,\\
(3a_t-1)/2,&\epsilon_t=1.
\end{cases}
\]

They satisfy

\[
a_t>1,\qquad
\frac{a_t}{x_t}
=
\frac{H-h_t}{h_t}
\longrightarrow0.
\tag{38}
\]

There is also an exact telescoping identity. Let

\[
A_K=\sum_{\substack{0\le k<K\\\epsilon_k=1}}
\frac{2^k}{3^{s_{k+1}}},
\qquad
B_K=\sum_{\substack{0\le k<K\\\epsilon_k=0}}
\frac{2^k}{3^{s_{k+1}}}.
\]

Then

\[
A_K-B_K
=
1-\frac{2^K}{3^{s_K}}.
\tag{39}
\]

Since \(q_K\to\infty\),

\[
A_\infty-B_\infty=1.
\tag{40}
\]

This is a sharper version of the real/\(2\)-adic synchronization: every suffix represents a positive real \(3x-1\) shadow and simultaneously the negative integer \(-x_t\) in \(\mathbb Q_2\).

It is a strong necessary condition, but not yet a contradiction. The missing assertion is that such a real shadow cannot remain parity-locked to one positive integer orbit indefinitely. That parity-locking statement is another form of (D).

---

# 9. The cycle obstruction is separate

Even a proof of (D) would rule out only divergent orbits.

Let \(w=(\epsilon_0,\ldots,\epsilon_{\ell-1})\) be a periodic binary word, let

\[
r=\sum_{j=0}^{\ell-1}\epsilon_j,
\]

and define \(C_w\) by

\[
2^\ell T^\ell(x)=3^r x+C_w
\]

along the prescribed branches. The unique \(2\)-adic point with parity sequence \(www\cdots\) is

\[
\boxed{\displaystyle
x_w=\frac{C_w}{2^\ell-3^r}.
}
\tag{41}
\]

It is a positive integer cycle exactly when

\[
2^\ell>3^r
\quad\text{and}\quad
2^\ell-3^r\mid C_w.
\tag{42}
\]

The trivial primitive words \(10\) and \(01\) give \(x=1\) and \(x=2\).

Therefore the second missing theorem is

\[
\boxed{\begin{minipage}{0.88\linewidth}
For every primitive binary period \(w\) other than \(10\) and \(01\), the rational number
\[
\frac{C_w}{2^{|w|}-3^{|w|_1}}
\]
is not a positive integer.
\end{minipage}}
\tag{C}
\]

In the carry language, (C) says that no nontrivial periodic input word has eventually zero inverse carry. Exact cycle decoders identify the candidate quotient, but ruling out the required arithmetic alignment is precisely the remaining cycle problem; previous cycle analysis likewise found that decoding alone reorganizes rather than eliminates the candidates. fileciteturn3file3L127-L142

---

# 10. Complete conditional proof

The two exact missing statements give a concise full proof skeleton.

## Conditional Collatz theorem

Assume:

1. **Barrier carry escape (D):** every infinite barrier word has infinitely many inverse carries;
2. **Periodic anti-alignment (C):** the only positive integral periodic points are the \(1\leftrightarrow2\) cycle.

Then every positive integer reaches \(1\).

### Proof

Let \(n>0\), and suppose its orbit does not reach \(1\).

If the orbit repeats a value, determinism makes it eventually periodic. By (C), its only possible positive cycle is \(1\leftrightarrow2\), contrary to the assumption.

Hence the orbit is injective. An injective sequence of positive integers eventually leaves every finite interval, so it tends to infinity.

By the established barrier theorem, some shifted point \(x_t\) of this orbit has

\[
\frac{3^{s_{t+k}-s_t}}{2^k}\ge1
\qquad(k\ge0).
\]

Its shifted parity sequence therefore belongs to \(\mathcal B\). But \(x_t\) is a positive ordinary integer, so Theorem 1 says that its inverse carry sequence is eventually zero. This contradicts (D).

Therefore no such \(n\) exists, and every positive integer reaches \(1\). ∎

---

# Final status

The first requested task has been completed exactly:

\[
\boxed{\displaystyle
\epsilon\in Q(\mathbb Z_{\ge0})
\iff
\text{the canonical inverse residues }\rho_k(\epsilon)
\text{ eventually stabilize}
}
\]

or equivalently,

\[
\boxed{\displaystyle
\epsilon\in Q(\mathbb Z_{\ge0})
\iff
\text{the intrinsic inverse-carry output }b_k
\text{ has finite support}.
}
\]

Inside the drift barrier this becomes the corner condition

\[
\boxed{\displaystyle
\frac{z_k}{3^{s_k}}\longrightarrow0.
}
\]

The attempted final step reduces to proving that critical drift forces infinitely many new inverse carries. The reduction is exact, but that theorem is equivalent to excluding divergent positive Collatz orbits, rather than a consequence of presently available drift estimates. Nontrivial periodic words additionally require the separate divisibility exclusion (C).

So this route supplies a clean characterization, a new carry/predictor formulation, and a complete two-lemma proof architecture—but not yet an unconditional proof of the Collatz conjecture.