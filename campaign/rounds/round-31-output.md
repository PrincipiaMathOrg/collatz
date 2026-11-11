model: GPT-5 Pro
round: 31 -- approach 26, A genuinely new reduction order for mixed binary-ternary rewriting
front: proof
sent: 2026-08-13T18:56:47Z
worked: 70m 12s

---

# Outcome

I do **not** obtain a complete proof of the Collatz conjecture from this approach. The attempt produces several rigorous reductions and two fairly strong impossibility theorems, but the genuinely decisive statement—a global, carry-sensitive size-change lemma—remains unproved. Presenting the construction without that lemma as a completed proof would be incorrect.

The strongest rigorous result is:

> **Any successful reduction order for the mixed binary–ternary system must be genuinely context-sensitive and path-dependent.**
>
> Direct scalar polynomial interpretations fail even weakly; polynomial interpretations still fail after adding the exact unbounded label \(r=v_2(n+1)\); and any ordinary context-cancellable monoid order runs into an immediate infinite-descent contradiction.

What survives is a precise dependency-pair/semantic-label certificate whose verification would prove Collatz.

---

## 1. The exact mixed binary–ternary rewriting problem

Use the alphabet

\[
\Sigma=\{\lhd,\rhd,f,t,0,1,2\}.
\]

The digit symbols act on positive integers by

\[
f(x)=2x,\qquad t(x)=2x+1,
\]

\[
0(x)=3x,\qquad 1(x)=3x+1,\qquad 2(x)=3x+2.
\]

Thus a canonical word

\[
\lhd s_1s_2\cdots s_k\rhd
\]

represents the integer obtained by starting with \(1\) and applying \(s_1,\ldots,s_k\) successively.

The rewriting system \(\mathcal T\) consists of the following eleven rules.

### Dynamic rules

\[
f\rhd\longrightarrow\rhd ,
\qquad
t\rhd\longrightarrow2\rhd .
\tag{D}
\]

These implement the shortcut Collatz map

\[
T(n)=
\begin{cases}
n/2,&n\equiv0\pmod2,\\[2mm]
(3n+1)/2,&n\equiv1\pmod2.
\end{cases}
\]

### Interior base-conversion rules

\[
\begin{array}{lll}
f0\longrightarrow0f,&
f1\longrightarrow0t,&
f2\longrightarrow1f,\\[1mm]
t0\longrightarrow1t,&
t1\longrightarrow2f,&
t2\longrightarrow2t.
\end{array}
\tag{A}
\]

### Left-boundary rules

\[
\lhd0\longrightarrow\lhd t,\qquad
\lhd1\longrightarrow\lhd ff,\qquad
\lhd2\longrightarrow\lhd ft.
\tag{B}
\]

Every rule in \(A\cup B\) preserves the represented integer. The two rules in \(D\) perform one shortcut Collatz step. Yolcu, Aaronson, and Heule proved that termination of this system is equivalent to the Collatz conjecture. citeturn721591view3turn599120search0

There is also a direct proof that the auxiliary subsystem \(A\cup B\) terminates. For a word \(w\), let

\[
N_3(w)=\#\{\text{symbols }0,1,2\text{ in }w\}
\]

and let \(I(w)\) count pairs consisting of a binary digit \(f\) or \(t\) lying to the left of a ternary digit \(0,1,2\).

Every \(A\)-rule preserves \(N_3\) and decreases \(I\) by exactly one. Every \(B\)-rule decreases \(N_3\). Hence

\[
\bigl(N_3(w),I(w)\bigr)
\]

strictly decreases in lexicographic order under every auxiliary rewrite.

Consequently, an infinite \(\mathcal T\)-derivation would have to use the dynamic rules infinitely many times. Between two dynamic rules only finitely many value-preserving conversions can occur, so the values at successive dynamic steps form a Collatz trajectory.

---

## 2. Why an ordinary reduction order cannot work

Here is an obstruction independent of polynomial or matrix interpretations.

Suppose \(\succ\) were a total, context-monotone, well-founded word order orienting all rules. From

\[
t\rhd\succ2\rhd
\]

one obtains, by order reflection through the common right context,

\[
t\succ2.
\]

From

\[
\lhd2\succ\lhd ft
\]

one similarly obtains

\[
2\succ ft.
\]

Therefore

\[
t\succ ft.
\]

Context monotonicity now gives

\[
t\succ ft\succ f^2t\succ f^3t\succ\cdots,
\]

an infinite descending chain.

Thus:

> **Proposition 1.** No total context-cancellable reduction order can strictly orient the mixed-base system.

Even a relative order that makes \(t\rhd\to2\rhd\) strict and \(\lhd2\to\lhd ft\) merely weak encounters the same contradiction:

\[
t\succ2\succeq ft
\quad\Longrightarrow\quad
t\succ ft\succ f^2t\succ\cdots.
\]

This explains why context sensitivity is not an optional refinement. The left and right boundary contexts must materially affect comparisons.

The published general impossibility theorem in the Yolcu–Aaronson–Heule paper concerns the older unary Collatz rewriting system, including dependency-pair variants. For the mixed-base system, their automated searches established many subsystem results but did not prove a universal impossibility theorem for matrix interpretations. citeturn852583view0

---

## 3. Direct scalar polynomial interpretations collapse completely

The following gives a direct impossibility theorem for the mixed system itself.

### Theorem 2

Let every symbol \(s\in\Sigma\) be interpreted by a strictly increasing polynomial

\[
P_s(x)\in\mathbb N[x],
\]

with nonnegative coefficients. Interpret concatenation by composition:

\[
[P_{ab}]=P_b\circ P_a.
\]

Suppose every rule of \(\mathcal T\) is oriented weakly:

\[
[\ell](x)\ge [r](x)
\qquad\text{for every rule }\ell\to r
\]

and every \(x\in\mathbb N\). Then

\[
P_f(x)=P_t(x)=P_0(x)=P_1(x)=P_2(x)=x.
\]

In particular, no rule can be oriented strictly.

### Proof

Write

\[
d_s=\deg P_s\ge1.
\]

Degree comparison in the relevant rules gives

\[
d_t\ge d_2
\tag{1}
\]

from \(t\rhd\to2\rhd\), and

\[
d_0\ge d_t,\qquad
d_1\ge d_f^2,\qquad
d_2\ge d_fd_t
\tag{2}
\]

from the three boundary rules.

The rules \(f2\to1f\), \(t0\to1t\), and \(f1\to0t\) give

\[
d_2\ge d_1,\qquad
d_0\ge d_1,\qquad
d_1d_f\ge d_td_0.
\tag{3}
\]

From (1) and the last inequality in (2),

\[
d_t\ge d_2\ge d_fd_t.
\]

All degrees are positive integers, so

\[
d_f=1,\qquad d_2=d_t.
\]

The last inequality in (3) now becomes

\[
d_1\ge d_td_0.
\]

Since \(d_0\ge d_t\),

\[
d_1\ge d_t^2.
\]

But \(d_t=d_2\ge d_1\). Hence

\[
d_t\ge d_t^2,
\]

so \(d_t=1\). It follows successively that

\[
d_0=d_1=d_2=d_f=d_t=1.
\]

All five digit interpretations are therefore affine. Write

\[
P_s(x)=a_sx+b_s,\qquad a_s\ge1,\quad b_s\ge0.
\]

Comparing leading coefficients in exactly the same rules gives

\[
a_t\ge a_2\ge a_fa_t,
\]

\[
a_0\ge a_t,\qquad
a_1\ge a_f^2,\qquad
a_2\ge a_1,
\]

\[
a_1a_f\ge a_ta_0.
\]

The same argument as for the degrees yields

\[
a_f=a_t=a_0=a_1=a_2=1.
\]

Thus each digit is interpreted as a translation:

\[
P_s(x)=x+b_s.
\]

Let the constants be denoted by

\[
b_f=F,\quad b_t=G,\quad b_0=B_0,\quad b_1=B_1,\quad b_2=B_2.
\]

The dynamic odd rule and the third boundary rule imply

\[
G\ge B_2,
\qquad
B_2\ge F+G.
\]

Therefore \(F=0\) and \(B_2=G\).

The rules \(f1\to0t\), \(f2\to1f\), and \(\lhd0\to\lhd t\) give

\[
B_1\ge B_0+G,
\qquad
B_2\ge B_1,
\qquad
B_0\ge G.
\]

Consequently,

\[
G=B_2\ge B_1\ge B_0+G\ge2G.
\]

Hence \(G=0\), and then

\[
B_0=B_1=B_2=F=0.
\]

All five interpretations are the identity. Therefore every rule has equal interpretations on both sides, and none can be strict. ∎

This rules out not only a direct scalar polynomial termination proof, but also a scalar polynomial **reduction pair** intended to make just one dependency-pair rule strict while orienting all others weakly.

---

## 4. Exact semantic labeling by \(v_2(n+1)\) still does not rescue polynomials

One might hope that Theorem 2 merely reflects the absence of semantic labels. There is, however, a stronger obstruction.

Write uniquely

\[
n+1=2^r m,
\qquad m\text{ odd}.
\]

The shortcut Collatz map becomes the following two-counter system.

If \(r>0\), then \(n\) is odd and

\[
T(n)+1=\frac{3(n+1)}2=2^{r-1}(3m).
\]

Thus

\[
(m,r)\longrightarrow(3m,r-1).
\tag{4}
\]

If \(r=0\), write

\[
m+1=2^s q,
\qquad q\text{ odd},\quad s\ge1.
\]

Then

\[
T(n)+1=\frac{m+1}{2}=2^{s-1}q,
\]

so

\[
(2^sq-1,0)\longrightarrow(q,s-1).
\tag{5}
\]

The target \(n=1\) corresponds to \((m,r)=(1,1)\), where iteration stops.

Now allow an entirely different scalar polynomial for every exact semantic label \(r\).

### Theorem 3

There is no family of polynomials

\[
P_r(m)\in\mathbb R[m],
\qquad r=0,1,2,\ldots,
\]

with positive leading coefficients, such that every nonterminal transition satisfies

\[
P_r(m)>P_{r-1}(3m)
\qquad(r\ge1)
\tag{6}
\]

and

\[
P_0(2^sq-1)>P_{s-1}(q)
\qquad(s\ge1).
\tag{7}
\]

### Proof

Let \(d_r=\deg P_r\).

From (6), by letting \(m\to\infty\),

\[
d_r\ge d_{r-1}.
\]

From (7), by letting \(q\to\infty\),

\[
d_0\ge d_{s-1}
\qquad\text{for every }s.
\]

Therefore all degrees are equal to one common degree \(d\).

If \(d=0\), then (6) says the constants \(P_r\) strictly increase with \(r\), while (7) says \(P_0>P_{s-1}\). This is already contradictory.

Suppose \(d\ge1\), and let \(a_r>0\) be the leading coefficient of \(P_r\). Inequality (6) gives

\[
a_r\ge3^d a_{r-1}.
\]

Iterating,

\[
a_{s-1}\ge3^{d(s-1)}a_0.
\tag{8}
\]

Inequality (7) gives

\[
2^{sd}a_0\ge a_{s-1}.
\tag{9}
\]

Taking \(s=3\), equations (8) and (9) imply

\[
3^{2d}a_0\le a_2\le2^{3d}a_0,
\]

hence

\[
9^d\le8^d,
\]

which is impossible. ∎

This theorem rules out a broad form of context-sensitive polynomial order even after supplying the exact unbounded odd-run label \(v_2(n+1)\).

The obstruction is precisely the competition between the two scales:

\[
3^{s-1}\qquad\text{and}\qquad2^s.
\]

The “consume one unit of \(r\), multiply by \(3\)” branch forces polynomial coefficients to grow like \(3^{dr}\). The reset branch forces them to be bounded by \(2^{d(r+1)}\). These requirements collide already at \(r=2\).

A commutative Hahn-series or asymptotically polynomial interpretation with leading term

\[
a_r m^d
\]

has the same obstruction. Merely replacing real coefficients by a more exotic ordered commutative field does not help. Any successful series order must use noncommutativity or path dependence in an essential way.

---

## 5. The exact three-phase size-change system

Factor the remaining odd part further:

\[
n+1=2^r3^v q,
\qquad \gcd(q,6)=1.
\]

Associate to \(n\) the state

\[
\Psi(n)=(q,r,v).
\]

The transition law is unusually clean.

### Odd phase

When \(r>0\),

\[
(q,r,v)\longrightarrow(q,r-1,v+1).
\tag{10}
\]

Thus \(r\) strictly decreases, while one factor of \(2\) is converted into a factor of \(3\).

### Even reset with \(v>0\)

When \(r=0\), write

\[
3^vq+1=2^s3^{v'}q'.
\]

If \(v>0\), then

\[
3^vq+1\equiv1\pmod3,
\]

so \(v'=0\). Therefore the reset strictly decreases \(v\).

### Even reset with \(v=0\)

If \(r=v=0\), then \(n+1=q\), and

\[
q+1=2^s3^{v'}q'.
\]

For a positive even \(n\), one has \(q>1\), and hence

\[
q'\le\frac{q+1}{2}<q.
\]

Thus this reset strictly decreases \(q\).

We have proved:

> **Proposition 4.** Every shortcut Collatz step strictly decreases at least one of the three natural-number coordinates \(r,v,q\).

This looks tantalizingly close to a size-change termination proof. The difficulty is that the priorities form a cycle:

\[
r\longrightarrow v\longrightarrow q\longrightarrow r.
\]

An \(r\)-decrease may increase \(v\); a \(v\)-decrease may greatly increase \(q\) and reset \(r\); a \(q\)-decrease may reset both \(r\) and \(v\).

Knowing that every **adjacent** pair decreases in one coordinate does not imply termination. A finite union of well-founded relations need not itself be well-founded.

There are even comparable nonadjacent states on ordinary terminating trajectories. For example,

\[
27\mapsto41\mapsto62\mapsto31\mapsto47\mapsto71
\mapsto107\mapsto161\mapsto242\mapsto121\mapsto182\mapsto91.
\]

But

\[
\Psi(27)=(7,2,0),\qquad
\Psi(91)=(23,2,0).
\]

All three coordinates are nondecreasing between these two points. Therefore the transitive closure of the Collatz relation is not covered by the three simple coordinate-decrease relations.

This is the exact point where semantic carry labels must enter.

---

## 6. The viable dependency-pair order

The published automated work proves termination of each subsystem obtained by deleting any one of the eleven rules. Consequently, for any chosen rule \(e\), proving that \(e\) is terminating relative to the whole system would settle termination of \(\mathcal T\), and hence Collatz. citeturn599120search2

Semantic labeling is appropriate here because it can introduce finitely or infinitely many labeled copies of symbols while preserving termination equivalence. citeturn315252search0

A natural label at precision \(R\) should record:

\[
\lambda_R=
\left(
\text{phase},
\text{last }R\text{ accelerated valuations},
\text{\(2\)-adic seed residue},
\text{\(3\)-adic terminal carry residue}
\right).
\]

The terminal carry component can be represented using your suffix-local expression

\[
C_v+2^{A(v)}\pmod{3^R},
\]

where \(v\) is the terminal suffix of length \(R\). Powers of \(2\) modulo \(3^R\) can be reduced modulo

\[
\varphi(3^R)=2\cdot3^{R-1},
\]

so this component is finite-state at each fixed \(R\).

Each normalized dependency-pair transition then has:

1. a finite label transition
   \[
   \lambda\longrightarrow\lambda';
   \]

2. exact affine or semilinear relations among unbounded numerical variables such as
   \[
   q,\ r,\ v;
   \]

3. possibly a polynomial quotient relation
   \[
   x'=a_{\lambda,\lambda'}x+b_{\lambda,\lambda'}.
   \]

The correct proof object is not one scalar polynomial. It is a **semantic size-change dependency graph**.

### Certificate theorem

Fix a precision \(R\), and suppose the resulting semantic dependency graph is finite. Attach to each edge a size-change graph on a fixed tuple of natural-number variables

\[
z=(z_1,\ldots,z_d),
\]

where the variables may include \(q,r,v\), quotient variables, height bands, and carry-lift counters.

An edge records relations of the form

\[
z'_j\le z_i
\qquad\text{or}\qquad
z'_j<z_i.
\]

Compose these graphs along paths in the usual way: a composite edge is strict if at least one edge in the composed thread is strict.

Assume:

> Every idempotent graph in the finite composition closure has a strict self-loop
> \[
> z_i'<z_i
> \]
> for some \(i\).

Then the Collatz conjecture follows.

### Proof

Assume an infinite Collatz orbit exists. Normalizing the mixed-base representation between dynamic rewrites produces an infinite dependency-pair chain.

Because the semantic label graph and its size-change closure are finite, some idempotent composite graph occurs infinitely often along a subsequence of the chain. By hypothesis, that graph contains a strict self-loop on some natural-valued variable \(z_i\).

Repeating the corresponding path gives

\[
z_i^{(0)}>z_i^{(1)}>z_i^{(2)}>\cdots,
\]

an infinite strictly descending sequence of natural numbers, which is impossible.

Therefore there is no infinite dependency-pair chain. Since the auxiliary rules terminate, there is no infinite mixed-base rewrite sequence. By the equivalence theorem, every positive Collatz orbit reaches \(1\). ∎

This is a genuine finite proof certificate: once the labeled graph, edge relations, and composition closure are written down, every assertion can be verified exactly.

Matrix interpretations can be viewed as weighted finite automata; the proposed certificate goes beyond them by attaching path-dependent semantic and size-change information rather than a fixed finite-dimensional linear weight. citeturn786964search7

---

## 7. The missing theorem

The current three-variable abstraction fails the certificate condition because its closure contains the priority cycle

\[
r\downarrow,\ v\uparrow
\quad\leadsto\quad
v\downarrow,\ q\uparrow
\quad\leadsto\quad
q\downarrow,\ r\uparrow,
\]

with no single variable surviving as a strictly descending thread.

The exact theorem needed to complete the proof is therefore:

> **Global carry-synchronization lemma.**  
> There exists a finite precision \(R\) and a finite collection of additional natural-valued carry/height variables such that every arithmetically realizable idempotent element of the semantic size-change closure at precision \(R\) has a strict self-loop.

Equivalently, every recurrent semantic dependency component must satisfy one of two alternatives:

\[
\text{a natural-valued thread descends around the component},
\]

or

\[
\text{the component has no lift to a positive integral Collatz trajectory}.
\]

Your terminal-suffix locality theorem makes the \(3\)-adic half of this statement genuinely local. It allows exact finite updates of the terminal carry condition. What it does **not** yet prove is that a recurrent suffix/carry component cannot remain compatible with all earlier \(2\)-adic seed conditions and the archimedean height constraints simultaneously.

That is the global synchronization gap.

---

## 8. What ordered noncommutative series can and cannot add

Ordinal and elementary interpretations are powerful enough to prove termination of systems encoding Goodstein sequences and hydra battles, so moving beyond ordinary polynomials is a legitimate possibility rather than decorative language. citeturn315252search9

For the present system, one could encode a labeled dependency path

\[
e_1e_2\cdots e_k
\]

as a noncommutative monomial

\[
X_{e_1}X_{e_2}\cdots X_{e_k}
\]

and attach polynomial or ordinal coefficients recording \(q,r,v\) and carry data. The leading monomial would indicate the persistent size-change thread. Concatenation of paths becomes noncommutative multiplication.

But the ordered series is well-founded only when recurrent monomials are excluded or contain a persistent descent thread. In other words, the series construction still requires the global carry-synchronization lemma. Without it, one obtains recurrent monomials corresponding to the unresolved \(r\to v\to q\to r\) cycle.

Theorem 3 also shows that a series whose leading behavior is merely

\[
a_r m^d
\]

cannot work. The leading monomials must remember the **order of phase changes and carry resets**, not just their aggregate counts.

---

# Final assessment

This approach does not currently furnish a full proof. It does, however, sharpen the problem substantially:

1. The auxiliary mixed-base conversion already has an elementary terminating order.

2. No ordinary context-cancellable reduction order can orient the crucial odd and boundary rules.

3. Every direct scalar natural polynomial reduction pair collapses to the identity interpretation.

4. Even infinitely many exact labels \(r=v_2(n+1)\) cannot support scalar polynomial rankings of any degree.

5. The exact dynamics form a cyclic three-phase size-change system in which every individual step decreases \(r\), \(v\), or \(q\).

6. A finite carry-refined semantic size-change certificate would prove Collatz rigorously.

7. The only unresolved assertion is that sufficiently precise simultaneous \(2\)-adic, \(3\)-adic, and archimedean labels eliminate every recurrent size-change component without a descending thread.

So the reduction-order program has not been completed, but it has been narrowed to a concrete theorem rather than a vague request for a “more powerful ordering.” A successful proof must break the cyclic reset pattern through exact arithmetic synchronization; no scalar polynomial, finite-dimensional commutative weight, or context-independent monoid order can do that.