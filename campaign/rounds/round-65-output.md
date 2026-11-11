model: GPT-5.6 Pro (Chat mode)
round: 65 -- approach 60, Dirichlet series of exceptional seeds
front: proof
sent: 2026-08-16T06:40Z
worked: 87m 51s

---

# Outcome

I did **not** obtain a valid full proof. The Dirichlet-series program produces an exact functional equation and several useful rigidity theorems, but the required analytic-continuation step does not follow from the equation. In its stated form, the proposed final claim is also false: nonzero nonnegative Collatz-invariant coefficients can have excellent meromorphic Dirichlet series.

A correction to my earlier progress update is important. I claimed that every nonempty exceptional component would force the abscissa of convergence to equal \(1\). That argument was wrong: odd exceptional multiples of \(3\) are leaves in the accelerated inverse tree, and they invalidate the branching estimate. I retract that claim below and give the corrected identity.

What follows is the exact reduction, the strongest rigidity conclusion I could prove, and the precise missing theorem.

---

## 1. The exceptional indicator and its exact inverse equation

Use the shortcut map

\[
T(n)=
\begin{cases}
n/2,&n\equiv0\pmod 2,\\[2mm]
(3n+1)/2,&n\equiv1\pmod 2.
\end{cases}
\]

Let

\[
E=\{n\ge1:T^j(n)\neq1\ \text{for every }j\ge0\},
\qquad
a_n=\mathbf 1_E(n).
\]

Because reaching \(1\) is unchanged by applying or undoing one Collatz step,

\[
n\in E\quad\Longleftrightarrow\quad T(n)\in E.
\]

Consequently,

\[
a_{2m}=a_m,\qquad a_{2m+1}=a_{3m+2}. \tag{1}
\]

The preimages of an integer \(m\) are

\[
2m
\]

and, only when \(m\equiv2\pmod3\),

\[
\frac{2m-1}{3}.
\]

The latter is automatically odd. Therefore there is a disjoint decomposition

\[
E
=
2E\ \dot\cup\
\left\{\frac{2m-1}{3}:
m\in E,\ m\equiv2\pmod3
\right\}. \tag{2}
\]

Define

\[
D_E(s)=\sum_{n\in E}n^{-s},
\qquad
D_{E,2}(s)=
\sum_{\substack{m\in E\\m\equiv2\pmod3}}m^{-s}.
\]

For \(\Re s>1\), (2) gives

\[
(1-2^{-s})D_E(s)
=
3^s
\sum_{\substack{m\in E\\m\equiv2\pmod3}}
(2m-1)^{-s}. \tag{3}
\]

Using

\[
(2m-1)^{-s}
=
(2m)^{-s}
\left(1-\frac1{2m}\right)^{-s}
=
(2m)^{-s}
\sum_{k=0}^{\infty}
\frac{(s)_k}{k!\,(2m)^k},
\]

where \((s)_k=s(s+1)\cdots(s+k-1)\), we obtain the exact shifted equation

\[
\boxed{
(1-2^{-s})D_E(s)
=
\left(\frac32\right)^s
\sum_{k=0}^{\infty}
\frac{(s)_k}{k!\,2^k}
D_{E,2}(s+k).
} \tag{4}
\]

This is the desired inverse-branch Dirichlet equation.

The problem is that it is not a scalar equation for \(D_E\): it introduces the residue-restricted series \(D_{E,2}\).

---

## 2. The full \(3\)-adic hierarchy

For a locally constant function \(\phi:\mathbb Z_3\to\mathbb C\), set

\[
\mathscr D_s(\phi)
=
\sum_{n\in E}\frac{\phi(n)}{n^s}.
\]

Let

\[
h(x)=\frac{2x-1}{3},
\qquad x\equiv2\pmod3.
\]

The same calculation gives

\[
\begin{aligned}
\mathscr D_s(\phi)
={}&
2^{-s}\mathscr D_s\bigl(\phi(2\,\cdot)\bigr)\\
&+
\left(\frac32\right)^s
\sum_{k=0}^{\infty}
\frac{(s)_k}{k!\,2^k}
\mathscr D_{s+k}
\left(
\mathbf 1_{x\equiv2(3)}\,
\phi\!\left(\frac{2x-1}{3}\right)
\right).
\end{aligned} \tag{5}
\]

The leading transfer operator is therefore

\[
(\mathcal L_s\phi)(x)
=
2^{-s}\phi(2x)
+
\left(\frac32\right)^s
\mathbf 1_{x\equiv2(3)}
\phi\!\left(\frac{2x-1}{3}\right). \tag{6}
\]

In vector notation, (5) has the form

\[
(I-\mathcal L_s^*)\mathscr D_s=\mathscr R_s, \tag{7}
\]

where \(\mathscr R_s\) contains the shifted \(k\ge1\) terms.

The essential difficulty is visible here:

> If \(\phi\) depends only on \(x\bmod 3^r\), then  
> \(\phi((2x-1)/3)\), restricted to \(x\equiv2\pmod3\), generally depends on \(x\bmod3^{r+1}\).

Thus the system never closes at any finite residue level. Replacing \(D_{E,2}\) by \(D_E/3\), explicitly or implicitly, would assume precisely the \(3\)-adic equidistribution that needs to be proved.

This infinite hierarchy is closely related to the Berg–Meinardus fixed-point operator. Existing functional-analytic work explicitly notes that hypothetical divergent trajectories produce fixed points, while other unrelated fixed points also occur, and distinguishing the dynamically relevant fixed points remains unresolved. citeturn692596view2turn692596view3turn692596view4

---

## 3. Accelerating to the odd integers

Let

\[
B=E\cap(2\mathbb Z+1).
\]

Every exceptional integer has a unique representation \(2^j b\), with \(b\in B\). Hence

\[
E=\dot\bigcup_{j\ge0}2^jB
\]

and

\[
D_E(s)=\frac{D_B(s)}{1-2^{-s}}. \tag{8}
\]

For the accelerated odd map

\[
U(n)=\frac{3n+1}{2^{v_2(3n+1)}},
\]

the odd inverse branches of an odd target \(m\) are

\[
n_a=\frac{2^a m-1}{3}.
\]

They exist exactly under the following conditions:

\[
\begin{array}{c|c}
m\bmod3&\text{permitted }a\\ \hline
1&a\ge2\text{ even},\\
2&a\ge1\text{ odd},\\
0&\text{none}.
\end{array}
\]

Put

\[
D_{B,r}(s)=
\sum_{\substack{b\in B\\b\equiv r\pmod3}}b^{-s}.
\]

Expanding every inverse branch gives

\[
\boxed{
D_B(s)
=
3^s\sum_{k=0}^{\infty}\frac{(s)_k}{k!}
\left[
\frac{D_{B,1}(s+k)}{2^{2(s+k)}-1}
+
\frac{2^{s+k}D_{B,2}(s+k)}
     {2^{2(s+k)}-1}
\right].
} \tag{9}
\]

Notice that \(D_{B,0}\) occurs only through the left side. Odd exceptional integers divisible by \(3\) have no accelerated odd predecessors.

This is the exact reason my preliminary abscissa-\(1\) argument failed.

### A corrected harmonic identity

Assume temporarily that

\[
D_B(1)=\sum_{b\in B}\frac1b<\infty.
\]

Write

\[
S_r=\sum_{\substack{b\in B\\b\equiv r(3)}}\frac1b.
\]

For \(m\equiv1\pmod3\),

\[
\sum_{\substack{a\ge2\\a\ {\rm even}}}\frac{3}{2^am}
=\frac1m,
\]

whereas for \(m\equiv2\pmod3\),

\[
\sum_{\substack{a\ge1\\a\ {\rm odd}}}\frac{3}{2^am}
=\frac2m.
\]

Using

\[
\frac3{2^am-1}
=
\frac3{2^am}
+
\frac3{2^am(2^am-1)},
\]

and summing the exact inverse branches, one obtains

\[
\begin{aligned}
S_0-S_2
={}&
3\sum_{m\in B_1}
\sum_{\substack{a\ge2\\a\ {\rm even}}}
\frac1{2^am(2^am-1)}
\\
&+
3\sum_{m\in B_2}
\sum_{\substack{a\ge1\\a\ {\rm odd}}}
\frac1{2^am(2^am-1)}
>0. \tag{10}
\end{aligned}
\]

Thus finite harmonic mass would force

\[
S_0>S_2,
\]

but this is not contradictory: the leaf class \(B_0\) absorbs the excess mass created by the more prolific \(B_2\) branches.

---

## 4. What positivity really provides

Let \(\sigma_E\) be the abscissa of convergence of \(D_E\). Since \(0\le a_n\le1\),

\[
\sigma_E\le1.
\]

If \(E\neq\varnothing\), then \(E\) is infinite because \(n\in E\) implies \(2^jn\in E\). Hence

\[
\sigma_E\ge0.
\]

Landau’s theorem says that an ordinary Dirichlet series with nonnegative coefficients must have a singularity at the real point equal to its abscissa of convergence. citeturn722516search0 Therefore

\[
E\neq\varnothing
\quad\Longrightarrow\quad
D_E(s)\text{ is singular at }s=\sigma_E. \tag{11}
\]

This gives a beautifully sharp completion criterion:

\[
\boxed{
\text{If the hierarchy (5) implies that \(D_E\) is holomorphic
near \(s=\sigma_E\), then \(E=\varnothing\).}
} \tag{12}
\]

Meromorphic continuation by itself is insufficient. A pole at \(\sigma_E\) is perfectly compatible with nonnegative coefficients.

There is an immediate counterexample to the proposed broader assertion. The sequence

\[
a_n\equiv1
\]

satisfies \(a_n=a_{T(n)}\), is nonzero and nonnegative, and has

\[
D(s)=\zeta(s),
\]

which has meromorphic continuation to the whole plane.

Even nonperiodic finite-alphabet sequences can have whole-plane meromorphic Dirichlet series: this is a general phenomenon for automatic Dirichlet series. Their possible poles lie on leftward lattices, which is precisely the kind of growth and pole structure that prevents meromorphic continuation from forcing rationality of the coefficient sequence. citeturn868819search0turn868819search3

Thus the final theorem must use much more than:

- nonnegative coefficients;
- the existence of a meromorphic continuation;
- ordinary polynomial growth in vertical strips.

---

## 5. A strong rigidity theorem for Collatz-fixed sequences

The following can be proved completely.

### Theorem 1 — eventual-periodicity rigidity

Let \((a_n)_{n\ge1}\) be a finite-valued sequence satisfying

\[
a_n=a_{T(n)}
\qquad(n\ge1).
\]

If \((a_n)\) is eventually periodic, then it is constant.

### Proof

Suppose \(q\) is an eventual period.

If \(q\) is even, then for all sufficiently large \(m\),

\[
a_m=a_{2m}=a_{2m+q}=a_{m+q/2}.
\]

Hence \(q/2\) is also an eventual period. Dividing repeatedly, we may assume \(q\) is odd.

Let

\[
b:\mathbb Z/q\mathbb Z\longrightarrow\{a_n:n\ge1\}
\]

be the stable periodic residue function. From \(a_m=a_{2m}\),

\[
b(x)=b(2x). \tag{13}
\]

Because \(q\) is odd, \(2m+q\) is odd. Therefore, for sufficiently large \(m\),

\[
\begin{aligned}
b(2m)
&=a_{2m+q}\\
&=a_{T(2m+q)}\\
&=b\!\left(3m+\frac{3q+1}{2}\right)\\
&=b\!\left(3m+\frac{q+1}{2}\right).
\end{aligned}
\]

Together with (13), and replacing \(m\) by \(2^{-1}x\bmod q\), this gives

\[
b(x)=b(3x+1). \tag{14}
\]

If \(3\mid q\), then

\[
\begin{aligned}
b(x+q/3)
&=b(3(x+q/3)+1)\\
&=b(3x+q+1)\\
&=b(3x+1)\\
&=b(x).
\end{aligned}
\]

Thus \(q/3\) is also a period. Dividing repeatedly, we reduce to

\[
\gcd(q,6)=1.
\]

On \(\mathbb Z/q\mathbb Z\), both maps

\[
M(x)=2x,\qquad F(x)=3x+1
\]

are permutations, and \(b\) is invariant under both. Hence it is invariant under

\[
MFM^{-1}(x)=3x+2.
\]

It is consequently invariant under

\[
(MFM^{-1})F^{-1}(x)=x+1.
\]

Therefore \(b\) is constant modulo \(q\), so \(a_n\) is eventually constant.

Finally, for every fixed \(n\),

\[
a_n=a_{2n}=a_{2^2n}=\cdots.
\]

Taking \(2^kn\) into the eventual range proves that \(a_n\) equals the same constant for every \(n\). ∎

---

## 6. Natural-boundary consequence

Let

\[
A_a(z)=\sum_{n\ge1}a_nz^n.
\]

Suppose \(a_n\) is bounded, integer-valued, Collatz-invariant and nonconstant.

Because any nonzero value repeats along \(n,2n,4n,\ldots\), the radius of convergence of \(A_a\) is exactly \(1\).

If \(A_a\) were rational, its finite-valued coefficient sequence would be eventually periodic. Theorem 1 would then make it constant, contrary to assumption.

The Pólya–Carlson theorem now gives:

### Corollary 2 — natural-boundary dichotomy

Every bounded integer-valued Collatz-invariant sequence is either constant, or its ordinary generating function has the unit circle as a natural boundary. The relevant Pólya–Carlson principle says that a radius-\(1\), integer-coefficient power series that extends through the unit circle must be rational. citeturn555236view3

In particular, if \(E\neq\varnothing\), then \(a_1=0\) while \(a_e=1\) for some \(e\), so \(a\) is nonconstant. Hence

\[
\boxed{
E\neq\varnothing
\quad\Longrightarrow\quad
A_E(z)=\sum_{n\in E}z^n
\text{ has }|z|=1\text{ as a natural boundary}.
} \tag{15}
\]

Related natural-boundary phenomena are already known for individual Collatz inverse-orbit generating functions; Bell and Lagarias proved that almost all such inverse-orbit series have the unit circle as a natural boundary, with the remaining rationality cases tied directly to Collatz. citeturn692596view0

---

## 7. The Mellin bridge from \(D_E\) to \(A_E\)

For \(\Re s>1\),

\[
\begin{aligned}
\Gamma(s)D_E(s)
&=
\sum_{n\in E}
\int_0^\infty t^{s-1}e^{-nt}\,dt\\
&=
\int_0^\infty t^{s-1}A_E(e^{-t})\,dt.
\end{aligned} \tag{16}
\]

Thus \(\Gamma(s)D_E(s)\) is the Mellin transform of \(A_E(e^{-t})\).

This supplies a second exact completion criterion:

> Prove continuation and left-half-plane growth for \(D_E\) strong enough that Mellin inversion gives a meromorphic continuation of \(A_E(e^{-t})\) through \(t=0\).

Then \(A_E(z)\) continues meromorphically through \(z=1\), contradicting (15).

One sufficient analytic package would be:

1. \(D_E\) extends meromorphically to \(\mathbb C\);
2. every pole of \(\Gamma(s)D_E(s)\) is an integer and is simple;
3. on lines \(\Re s=-N-\tfrac12\),

   \[
   |D_E(s)|\le C B^N(1+|\Im s|)^C, \tag{17}
   \]

   with corresponding exponential bounds on the residues.

Indeed, Mellin inversion gives

\[
A_E(e^{-t})
=
\frac1{2\pi i}
\int_{c-i\infty}^{c+i\infty}
\Gamma(s)D_E(s)t^{-s}\,ds.
\]

Shifting the contour to \(\Re s=-N-\tfrac12\), the factorial decay of \(\Gamma(s)\) in the left half-plane makes the remaining integral tend locally uniformly to zero. The residues then give a convergent Laurent series in integer powers of \(t\). Therefore \(A_E(e^{-t})\) is meromorphic near \(t=0\).

This would finish Collatz through Corollary 2.

But ordinary whole-plane meromorphic continuation does **not** imply (17), integer-only poles, or convergence of the inverse-Mellin residue expansion. Automatic Dirichlet series are concrete counterexamples to such an implication.

---

## 8. The exact \(3\)-adic cusp obstruction

The leading operator (6) has a distinguished \(3\)-adic point:

\[
h(-1)=\frac{2(-1)-1}{3}=-1.
\]

At \(x=-1\),

\[
(\mathcal L_s\phi)(-1)
=
2^{-s}\phi(-2)
+
\left(\frac32\right)^s\phi(-1). \tag{18}
\]

For real \(s>0\), repeatedly selecting the second branch gives

\[
r(\mathcal L_s)\ge \left(\frac32\right)^s>1 \tag{19}
\]

on the ordinary supremum space. Hence no naive Neumann-series contraction of \(I-\mathcal L_s^*\) is possible.

The corresponding exact arithmetic identity is especially revealing. Since

\[
h(m)+1=\frac23(m+1),
\]

we have

\[
h^r(m)+1
=
\left(\frac23\right)^r(m+1). \tag{20}
\]

Thus, writing

\[
m=3^rq-1,
\]

one gets

\[
h^r(m)=2^rq-1. \tag{21}
\]

Backward invariance of \(E\) yields the exact equivalence

\[
\boxed{
3^rq-1\in E
\quad\Longleftrightarrow\quad
2^rq-1\in E.
} \tag{22}
\]

Consequently,

\[
\begin{aligned}
\sum_{\substack{m\in E\\m\equiv-1(3^r)}}m^{-s}
&=
\sum_{\substack{q\ge1\\3^rq-1\in E}}
(3^rq-1)^{-s}\\
&<
\left(\frac23\right)^{rs}
\sum_{\substack{q\ge1\\2^rq-1\in E}}
(2^rq-1)^{-s}.
\end{aligned} \tag{23}
\]

The all-odd branch contributes the opposite factor

\[
\left(\frac32\right)^{rs}.
\]

The two exponential factors cancel exactly. There is a strict inequality for every fixed \(q\), but its ratio approaches equality as \(q\to\infty\). Hence there is no uniform contraction.

This is the precise analytic manifestation of the binary–ternary carry problem: exceptional mass could move to larger and larger archimedean representatives while concentrating closer and closer to the \(3\)-adic cusp.

---

## 9. Exceptional sets cannot avoid any finite \(3\)-adic obstruction

There is also an exact density statement.

### Proposition 3

If \(E\neq\varnothing\), then for every \(r\ge1\) and every residue \(c\bmod3^r\),

\[
E\cap(c+3^r\mathbb Z)\neq\varnothing.
\]

### Proof

Start with \(e\in E\). Apply \(T\) until an odd exceptional integer \(b\) is reached. If \(3\nmid b\), it is already a \(3\)-adic unit. If \(3\mid b\), then

\[
T(b)=\frac{3b+1}{2}\equiv2\pmod3,
\]

so \(E\) contains a unit \(u\).

The integer \(2\) is a primitive root modulo \(3^r\). Since \(2^ku\in E\) for all \(k\), \(E\) meets every unit residue class modulo \(3^r\).

Now take arbitrary \(c\bmod3^r\). Choose an exceptional unit \(m\) satisfying

\[
m\equiv \frac{3c+1}{2}\pmod{3^{r+1}}.
\]

This class is \(2\bmod3\), so

\[
n=\frac{2m-1}{3}\in E,
\]

and

\[
n\equiv c\pmod{3^r}.
\]

∎

Therefore no argument involving only finitely many residues modulo powers of \(3\) can remove the cusp. What is needed is a **quantitative** assertion about how much Dirichlet mass can occupy increasingly deep cusp cylinders.

---

## 10. The missing theorem

A sufficient estimate would resemble the following. Define, near the abscissa,

\[
\mu_\varepsilon(C)
=
\frac{\displaystyle
\sum_{n\in E\cap C}n^{-(\sigma_E+\varepsilon)}
}{
D_E(\sigma_E+\varepsilon)
}.
\]

One needs constants \(C<\infty\) and \(\rho<1\), uniform as \(\varepsilon\downarrow0\), such that

\[
\mu_\varepsilon
\bigl(-1+3^r\mathbb Z_3\bigr)
\le
C
\left(\frac23\right)^{r\sigma_E}
\rho^r, \tag{24}
\]

together with analogous estimates for the dyadic translates of the cusp created by intervening even branches.

The factor \((2/3)^{r\sigma_E}\) merely cancels the branch expansion. The new factor \(\rho^r\) is the genuinely missing strictness. It would give a spectral gap or quasi-compactness for the arithmetic realization of \(\mathcal L_s^*\), allowing continuation through the Landau singularity.

Nothing in the scalar equation (4), finite residue data, or positivity proves (24). Equation (22) explains why: the two localizations are exactly synchronized, and only a cross-prime anti-concentration theorem can prevent mass from escaping to larger \(q\).

---

# Final assessment

Approach 60 yields two exact proof routes:

\[
\boxed{
\text{holomorphic continuation of \(D_E\) through \(\sigma_E\)}
\ \Longrightarrow\ E=\varnothing
}
\]

by Landau’s theorem, or

\[
\boxed{
\text{strong whole-plane continuation and left growth}
\ \Longrightarrow\
A_E\text{ continues across }|z|=1
\ \Longrightarrow\ E=\varnothing
}
\]

by Mellin inversion, Pólya–Carlson, and Theorem 1.

The part that remains unproved is not a routine analytic-continuation calculation. It is the quantitative exclusion of concentration near the \(3\)-adic fixed cusp and all its dyadic shadows. The exact identity

\[
3^rq-1\in E
\iff
2^rq-1\in E
\]

shows that this missing estimate is essentially the same binary–ternary synchronization obstruction appearing in the carry and terminal-suffix approaches.

Accordingly, presenting (4) as though it automatically supplied analytic continuation would hide the decisive Collatz step. The rigorous result is an exact reduction to a cusp-escape/resolvent theorem, together with the natural-boundary rigidity theorem above—not a completed proof of the conjecture.