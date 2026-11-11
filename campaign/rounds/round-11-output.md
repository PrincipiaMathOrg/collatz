model: GPT-5 Pro
round: 11 -- approach 6, Sheaf cohomology for gluing modular Lyapunov functions
front: proof
sent: 2026-08-13T18:29:32Z
worked: 49m 46s

---

# Verdict

I do not obtain a valid proof of the Collatz conjecture from this approach. More strongly, the proposed mechanism has a rigorous obstruction:

> **Ordinary sheaf \(H^{1}\) on the congruence space vanishes for formal topological reasons, but that vanishing does not glue descent inequalities. Under every natural regularity assumption, a global correction of the form**
> \[
> V(n)=\log n+\phi(n)
> \]
> **is impossible.**

The relevant dynamical cohomology does contain an obstruction, but it is already nonzero because of negative \(2\)-adic periodic points such as \(-1\), regardless of whether a positive-integer counterexample exists. Moreover, any correction that really did decrease along every positive Collatz trajectory would have to be unbounded on every \(2\)-adic congruence neighborhood.

Thus this approach, as stated, cannot complete Collatz. What follows is a full proof of that no-go result and an exact description of the stronger statement a repaired version would need.

---

## 1. Setup

Use the accelerated odd map
\[
U(n)=\frac{3n+1}{2^{a(n)}},
\qquad
a(n)=\nu _2(3n+1),
\]
on the positive odd integers. The Collatz conjecture is equivalent to
\[
\forall n\in 2\mathbb N+1,\qquad U^j(n)=1
\quad\text{for some }j\geq 0.
\]

A bounded modular correction
\[
V_M(n)=\log n+\phi_M(n\bmod M)
\]
would prove Collatz if
\[
V_M(U(n))<V_M(n)\qquad(n>1).
\]
Indeed, \(\phi_M\) is bounded, so a strictly decreasing orbit has bounded \(n\)-values. It would therefore eventually repeat, contradicting strict decrease unless it had already reached \(1\).

The first obstruction is completely elementary.

---

## 2. No fixed modulus can support the proposed potential

### Theorem 1: fixed-modulus obstruction

For every \(M\geq1\) and every function
\[
\phi_M:\mathbb Z/M\mathbb Z\longrightarrow\mathbb R,
\]
there are infinitely many positive odd \(n\) for which
\[
U(n)\equiv n\pmod M
\qquad\text{and}\qquad
U(n)>n.
\]
Consequently,
\[
\log U(n)+\phi_M(U(n)\bmod M)
>
\log n+\phi_M(n\bmod M).
\]

### Proof

Set
\[
n=4Mk-1
\]
for any \(k\geq1\). Then
\[
3n+1=12Mk-2=2(6Mk-1),
\]
and \(6Mk-1\) is odd. Hence
\[
a(n)=1
\]
and
\[
U(n)=6Mk-1.
\]
Moreover,
\[
U(n)-n=2Mk,
\]
so
\[
U(n)\equiv n\equiv -1\pmod M.
\]
But \(U(n)>n\). Therefore the modular correction is unchanged while the logarithmic part increases:
\[
V_M(U(n))-V_M(n)
=
\log\frac{6Mk-1}{4Mk-1}>0.
\]
This proves the theorem. \(\square\)

### Corollary 1

No finite family of residue-dependent local potentials can glue to a global strict Lyapunov function.

Indeed, take the least common multiple \(L\) of all the moduli in the finite family. After passing to the common refinement modulo \(L\), the glued correction is a function of \(n\bmod L\). Theorem 1 applies with \(M=L\).

This also defeats finite-state certificates using a bounded number of accelerated steps.

### Proposition 2: bounded-lookahead obstruction

Suppose that each residue \(r\bmod M\) is assigned some positive number of steps
\[
\tau(r)\leq L
\]
and one asks for
\[
V_M\bigl(U^{\tau(r)}(n)\bigr)<V_M(n)
\qquad(n\equiv r\pmod M).
\]
This is impossible.

### Proof

Let \(\ell=\tau(-1\bmod M)\), and choose \(K\geq\ell+2\). Put
\[
n=2^K M-1.
\]
For the first \(\ell\) accelerated steps the valuation is \(1\), and induction gives
\[
U^j(n)=3^j2^{K-j}M-1,
\qquad 0\leq j\leq\ell.
\]
Therefore
\[
U^\ell(n)\equiv n\equiv-1\pmod M
\]
and
\[
\frac{U^\ell(n)}{n}
=
\frac{3^\ell2^{K-\ell}M-1}{2^K M-1}>1.
\]
Again the correction is unchanged while the logarithmic term grows. \(\square\)

Thus any successful congruence construction would need both infinitely increasing refinement depth and unbounded lookahead.

---

## 3. Why ordinary sheaf \(H^1\) does not help

Let
\[
X=\widehat{\mathbb Z}
\quad\text{or}\quad
X=\mathbb Z_2^\times.
\]
The congruence classes are clopen subsets of \(X\). A cover by the classes modulo \(M\) is actually a disjoint partition, so its normalized Čech complex has no positive-degree terms. More generally, profinite spaces have sheaf-theoretic cohomological dimension zero:
\[
H^j(X,\mathcal F)=0
\qquad(j>0)
\]
for every sheaf of abelian groups \(\mathcal F\). citeturn647371view1

Therefore the desired statement
\[
H^1(X,\mathcal F)=0
\]
is automatic. It does not depend on Collatz dynamics and cannot distinguish a universe in which Collatz is true from one containing a counterexample.

There is also a categorical mismatch. The assignment
\[
O\longmapsto
\left\{
\phi:O\to\mathbb R:
\log U(n)+\phi(U(n))<\log n+\phi(n)
\right\}
\]
is not an ordinary sheaf of abelian groups:

1. The condition at \(n\in O\) refers to the value at \(U(n)\), which may lie outside \(O\).
2. The set of strict subsolutions is a convex cone, not an abelian group.
3. The difference of two strict subsolutions need not satisfy a fixed homogeneous equation.
4. Adjusting local sections by a Čech coboundary need not preserve the strict inequalities.

Ordinary sheaf cohomology can glue compatible values. It cannot manufacture compatibility with directed Collatz edges.

---

## 4. No continuous profinite correction can work

The obstruction already appears at the negative \(2\)-adic fixed point \(-1\).

### Proposition 3

There is no continuous function
\[
\phi:\mathbb Z_2^\times\longrightarrow\mathbb R
\]
such that
\[
\log U(n)+\phi(U(n))
<
\log n+\phi(n)
\]
for every positive odd \(n>1\).

### Proof

Take
\[
n_k=2^k-1.
\]
For \(k\geq2\),
\[
3n_k+1=3\cdot2^k-2
=2(3\cdot2^{k-1}-1),
\]
where the second factor is odd. Hence
\[
U(n_k)=3\cdot2^{k-1}-1.
\]
Both sequences converge \(2\)-adically to \(-1\):
\[
n_k\longrightarrow -1,
\qquad
U(n_k)\longrightarrow -1.
\]
Continuity gives
\[
\phi(U(n_k))-\phi(n_k)\longrightarrow0.
\]
On the other hand,
\[
\log\frac{U(n_k)}{n_k}
\longrightarrow
\log\frac32>0.
\]
Therefore
\[
V(U(n_k))-V(n_k)\longrightarrow\log\frac32>0,
\]
contradicting descent. \(\square\)

So a uniformly convergent inverse limit of modular corrections cannot work: such a limit would be continuous.

The obstruction is much stronger than failure at the single point \(-1\).

---

## 5. Every successful correction must be nowhere locally bounded

We now prove that any strict correction \(\phi\), even a discontinuous one defined only on positive odd integers, must have infinite oscillation in every \(2\)-adic open set.

For \(a\geq1\), define the inverse branch
\[
F_a(y)=\frac{2^a y-1}{3}.
\]
For every odd \(2\)-adic integer \(y\),
\[
3F_a(y)+1=2^a y,
\]
so
\[
\nu_2(3F_a(y)+1)=a,
\qquad
U(F_a(y))=y.
\]

For a finite valuation word
\[
w=(a_0,\ldots,a_{q-1}),
\]
put
\[
A(w)=a_0+\cdots+a_{q-1}.
\]
On the cylinder realizing this word, one has the exact affine identity
\[
2^{A(w)}U^q(x)=3^q x+C_w,
\]
where
\[
C_0=0,\qquad
C_{j+1}=3C_j+2^{A_j}.
\]

### Lemma 4: expanding periodic points are \(2\)-adically dense

Every nonempty \(2\)-adic open subset of the odd integers contains a periodic point \(p\) of \(U\) with an expanding real multiplier
\[
\lambda=\frac{3^q}{2^{A(w)}}>1.
\]

### Proof

Choose a finite valuation cylinder \(C_u\) contained in the given open set. Append sufficiently many symbols \(1\) to the word \(u\), obtaining
\[
w=u\,1\,1\cdots1.
\]
Since
\[
\frac{A(w)}{|w|}\longrightarrow1
\]
as the number of appended \(1\)'s tends to infinity, eventually
\[
A(w)<|w|\log_2 3.
\]
Thus
\[
\frac{3^{|w|}}{2^{A(w)}}>1.
\]

The inverse composition \(F_w\) is a strict \(2\)-adic contraction, with contraction factor \(2^{-A(w)}\). It therefore has a unique fixed point \(p_w\), which lies in the cylinder \(C_w\subset C_u\). Equivalently,
\[
U^{|w|}(p_w)=p_w.
\]
From the affine identity,
\[
p_w=\frac{C_w}{2^{A(w)}-3^{|w|}}.
\]
Because \(C_w>0\) and \(2^{A(w)}<3^{|w|}\), this rational number is negative in the ordinary real ordering. \(\square\)

This is the accelerated-map version of the familiar fact that the \(2\)-adic Collatz system contains abundant periodic points. For the shortcut map, Bernstein and Lagarias proved a topological conjugacy with the one-sided \(2\)-adic shift. citeturn647371view0turn895592view0

### Theorem 5: nowhere-local-boundedness theorem

Suppose
\[
\phi:2\mathbb N+1\longrightarrow\mathbb R
\]
satisfies
\[
\log U(n)+\phi(U(n))
<
\log n+\phi(n)
\qquad(n>1).
\]
Then for every nonempty \(2\)-adic open set \(O\),
\[
\sup_{x,y\in O\cap(2\mathbb N+1)}
|\phi(x)-\phi(y)|=\infty.
\]

### Proof

Choose an expanding periodic point \(p=p_w\in O\) as in Lemma 4. Write
\[
q=|w|,
\qquad
A=A(w),
\qquad
\lambda=\frac{3^q}{2^A}>1.
\]
Choose \(K\) so that
\[
p+2^K\mathbb Z_2\subset O.
\]

For each \(N\geq1\), choose a sufficiently large positive odd integer \(x_N\) which

- realizes the repeated valuation word \(w^N\), and
- satisfies
  \[
  x_N-p\in2^{AN+K}\mathbb Z_2.
  \]

Such integers exist because the corresponding \(2\)-adic residue class contains arbitrarily large positive representatives.

Put
\[
y_N=U^{qN}(x_N).
\]
On the repeated affine branch,
\[
y_N-p=\lambda^N(x_N-p).
\]
Since division by \(2^{AN}\) removes exactly \(AN\) powers of \(2\),
\[
y_N-p\in2^K\mathbb Z_2.
\]
Thus
\[
x_N,y_N\in O.
\]

In the ordinary real ordering, \(p<0\). Therefore
\[
y_N
=
p+\lambda^N(x_N-p)
=
\lambda^N x_N+(\lambda^N-1)(-p)
>
\lambda^N x_N.
\]
Consequently,
\[
\log\frac{y_N}{x_N}>N\log\lambda.
\]

Strict descent at every intermediate step gives
\[
\log y_N+\phi(y_N)
<
\log x_N+\phi(x_N).
\]
Hence
\[
\phi(x_N)-\phi(y_N)
>
\log\frac{y_N}{x_N}
>
N\log\lambda.
\]
Letting \(N\to\infty\) proves infinite oscillation on \(O\). \(\square\)

### Consequences

A successful correction cannot be

- periodic modulo a fixed modulus;
- locally constant;
- continuous on the profinite completion;
- locally bounded in the \(2\)-adic topology;
- a locally uniformly convergent limit of finite-level corrections;
- a section of any ordinary sheaf whose sections are locally bounded real functions.

The required singularities cannot be confined to \(-1\). Expanding periodic points are dense, so the correction must be singular, in the sense of unbounded oscillation, in every congruence neighborhood.

---

## 6. The correct cohomology is dynamical—and it does not vanish

The asymptotic logarithmic drift is the function
\[
g(x)=\log3-a(x)\log2.
\]
For a positive integer,
\[
\log U(n)-\log n
=
g(n)+\log\left(1+\frac1{3n}\right).
\]
The final term is positive and tends to zero.

A correction \(\phi\) changes the asymptotic cocycle by a coboundary:
\[
g\longmapsto g+\phi\circ U-\phi.
\]
On a periodic orbit \(p,U(p),\ldots,U^{q-1}(p)\), the coboundary telescopes:
\[
\sum_{j=0}^{q-1}
\bigl(\phi(U^{j+1}p)-\phi(U^jp)\bigr)=0.
\]
Thus
\[
\sum_{j=0}^{q-1}
\bigl(g+\phi\circ U-\phi\bigr)(U^jp)
=
q\log3-A(w)\log2.
\]
Periodic orbit sums are standard obstructions to solving cohomological equations; this is the basic obstruction underlying Livšic theory. citeturn647371view2turn895592view1

For the fixed point
\[
p=-1,
\qquad a(p)=1,
\qquad U(p)=-1,
\]
the periodic sum is
\[
g(-1)=\log\frac32>0.
\]
Therefore \(g\) cannot be cohomologous, by any continuous correction, to a strictly negative cocycle.

This obstruction is present whether or not all positive integers reach \(1\).

There is a sharp contrast with the average behavior. Under normalized Haar measure on the odd \(2\)-adic integers,
\[
\mathbb P(a=k)=2^{-k},
\qquad k\geq1,
\]
and hence
\[
\mathbb E[a]=\sum_{k\geq1}\frac{k}{2^k}=2.
\]
Thus
\[
\mathbb E[g]
=
\log3-2\log2
=
\log\frac34<0.
\]
So the local drift is negative on average, while the invariant point mass at \(-1\) has positive drift. This is exactly why “most residue classes descend” is not enough to produce a uniform Lyapunov function.

---

## 7. The finite-state obstruction is an ordered cohomology class

At a finite congruence level, let \(G=(V,E)\) be the directed transition graph and let \(w(e)\) be the logarithmic edge weight. A residue potential is a \(0\)-cochain
\[
\phi:V\to\mathbb R,
\]
and it modifies the edge weights to
\[
w_\phi(e)
=
w(e)+\phi(t(e))-\phi(s(e)).
\]

The exact finite-graph duality is
\[
\boxed{
\inf_{\phi:V\to\mathbb R}
\max_{e\in E}
\bigl(w(e)+\phi(t(e))-\phi(s(e))\bigr)
=
\max_C\frac1{|C|}\sum_{e\in C}w(e),
}
\]
where \(C\) ranges over directed cycles.

The necessity follows by summing around a cycle. For sufficiency, choose any number \(\alpha\) strictly larger than the maximum cycle mean. The difference constraints
\[
\phi(t)-\phi(s)\leq\alpha-w(e)
\]
have no negative-cost directed cycle, so shortest-path potentials solve all the inequalities.

Thus the obstruction is not ordinary \(H^1\)-vanishing. It is the **positive cycle cone**, or equivalently the maximum cycle mean.

At every modulus \(M\), the residue \(-1\bmod M\) carries a positive self-transition realized by
\[
4Mk-1\longmapsto6Mk-1.
\]
Its asymptotic weight is
\[
\log\frac32.
\]
Therefore every finite transition graph has maximum cycle mean at least \(\log(3/2)\). Refinement does not remove this class.

This gives the precise dichotomy:

- Ordinary sheaf \(H^1\) vanishes automatically and is irrelevant.
- Dynamical or graph \(H^1\) is relevant, but has persistent positive classes even without positive counterexamples.

---

## 8. Unrestricted gluing merely restates Collatz

Suppose one replaces continuous or locally bounded functions by arbitrary functions. Then all local functions glue pointwise; the sheaf of arbitrary real-valued functions is flabby, so its higher cohomology vanishes.

But existence of the desired global section is then equivalent to Collatz itself.

### Proposition 6

The Collatz conjecture is equivalent to the existence of a function
\[
h:2\mathbb N+1\longrightarrow\mathbb N_0
\]
such that
\[
h(1)=0,
\qquad
h(U(n))=h(n)-1
\quad(n>1).
\]

### Proof

If Collatz is true, define
\[
h(n)=\min\{j\geq0:U^j(n)=1\}.
\]
Then the displayed identity is immediate.

Conversely, if such an \(h\) exists, repeated application decreases a nonnegative integer by \(1\). After exactly \(h(n)\) steps the orbit must reach \(1\). \(\square\)

Setting
\[
\phi(n)=h(n)-\log n
\]
gives
\[
V(n)=\log n+\phi(n)=h(n),
\]
a perfect Lyapunov function. But \(h\) is exactly the total stopping time whose finiteness is the conjecture.

There is another important issue: a real-valued descent function need not prove termination unless it is bounded below or proper. On a divergent ray
\[
n_0\to n_1\to n_2\to\cdots
\]
one can simply put
\[
V(n_j)=-j.
\]
It strictly decreases forever.

A divergent trajectory is topologically a ray, whose ordinary first cohomology is zero. Hence ordinary \(H^1\) is naturally suited to detecting cycles, not failure of well-foundedness at infinity. Excluding divergent trajectories requires a coercivity or properness theorem, not merely a gluing theorem.

---

## 9. What a viable repaired program would require

A sheaf-flavored approach could survive only after three major changes.

### 9.1 Add the archimedean height

Pure congruence topology cannot distinguish a large positive integer shadowing \(-1\) from the negative \(2\)-adic point itself. Positivity is not a \(2\)-adic local property.

The local state must therefore include something like
\[
\bigl(\lfloor\log n\rfloor,\ n\bmod2^r,\ U^j(n)\bmod3^r\bigr),
\]
not merely \(n\bmod M\).

### 9.2 Replace ordinary sheaves by filtered dynamical cochains

The correction must be allowed to acquire increasingly large oscillation near every expanding \(2\)-adic periodic cylinder. Theorem 5 shows that the polar or singular set is dense.

One would need finite-level corrections \(\phi_r\) for which

\[
\operatorname{osc}_{C_w}\phi_r
\gtrsim
N\left(q\log3-A(w)\log2\right)
\]
whenever the level resolves \(N\) repetitions of an expanding word \(w\).

Thus no compactness theorem in the uniform norm can apply.

### 9.3 Prove coercive convergence on positive integers

The actual missing theorem would have to say that, despite the forced dense singularities,

1. the renormalized values \(\phi_r(n)\) converge for every positive integer \(n\);
2. the resulting
   \[
   V(n)=\log n+\phi(n)
   \]
   has finite sublevel sets;
3. \(V(U(n))<V(n)\) for \(n>1\).

The difficult point is the second condition. Sheaf \(H^1\)-vanishing addresses none of it.

Your terminal-suffix locality identity suggests a possible hybrid way to control the singularities. If a valuation word decomposes as \(w=uv\), with \(|v|=r\), \(B=A(v)\), and endpoint \(X\), then
\[
X\equiv2^{-B}C_v\pmod{3^r},
\]
and hence
\[
3^r\mid X+1
\quad\Longleftrightarrow\quad
3^r\mid C_v+2^B.
\]
Thus the \(3\)-adic endpoint obstruction attached to a long \(2\)-adic shadow can be read from its terminal valuation suffix.

A potentially viable replacement for the proposed theorem would therefore be an **adelic pole-avoidance theorem**:

> The singular corrections forced by all expanding \(2\)-adic periodic cylinders can be normalized so that their total contribution is finite and coercive on ordinary positive integers, because the required \(3\)-adic endpoint conditions cannot remain compatible indefinitely.

That would be a genuinely new theorem. Ordinary \(H^1\)-vanishing does not imply it, and the dense-periodic-point argument shows why it would have to use the archimedean and \(3\)-adic information essentially.

---

## Final assessment

The proposed proof cannot be completed in its stated form.

The exact conclusions are:

1. **Every fixed-modulus potential fails**, even with bounded class-dependent lookahead.
2. **Ordinary sheaf \(H^1\) vanishes automatically** on the profinite congruence space, independently of Collatz.
3. **The relevant dynamical cohomology does not vanish**: the fixed point \(-1\) and dense expanding \(2\)-adic periodic points give persistent positive cycle classes.
4. **Any global strict correction must be nowhere locally bounded** in the \(2\)-adic topology.
5. **Allowing arbitrary singular functions makes the construction equivalent to defining the total stopping time**, hence merely restates the conjecture.
6. **A divergent orbit need not create an \(H^1\) class at all**; the missing obstruction is properness at infinity.

So approach 6 should be reclassified as:

> **No-go as a purely modular sheaf argument; potentially viable only as a singular, filtered, adelic dynamical-cohomology program.**

The main new mathematical output is Theorem 5: every global correction producing pointwise Collatz descent must have unbounded oscillation in every \(2\)-adic congruence neighborhood. This identifies precisely why regular modular Lyapunov functions cannot glue.