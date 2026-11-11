model: GPT-5.6 Pro (Chat mode)
round: 78 -- approach 73, A forbidden-lift theorem for de Bruijn paths
front: proof
sent: 2026-08-16T21:35Z
worked: 26m 51s

---

# Verdict

A full proof does **not** follow from this approach as stated. The decisive issue is stronger than an ordinary missing estimate:

> **No finite parity pattern or finite de Bruijn path is incompatible with lifting to a positive integer.**

Every binary word of length \(k\) is the first \(k\)-bit parity vector of an entire positive residue class modulo \(2^k\). Thus the proposed “forbidden pattern” cannot be a finite word in the ordinary de Bruijn graph. The obstruction must involve an **unbounded lift/carry state**.

After adding that state, one obtains an exact forbidden-lift theorem—but the theorem required to finish the argument is equivalent to the divergent-orbit half of Collatz. Moreover, symbolic positive drift does not address nontrivial cycles, which require a separate divisibility theorem.

There is nevertheless a substantive new result below: a **quantitative forbidden-return theorem** showing that positive-drift returns in de Bruijn graphs force exponentially large integer lifts. It completely excludes eventually periodic positive-drift paths and a broad class of strongly repetitive paths.

---

## 1. Parity paths and de Bruijn graphs

Use the shortcut Collatz map

\[
T(x)=
\begin{cases}
x/2,&x\equiv0\pmod2,\\[1mm]
(3x+1)/2,&x\equiv1\pmod2.
\end{cases}
\]

For a \(2\)-adic integer \(x\), define

\[
\epsilon_k(x)=T^k(x)\pmod2,
\qquad
Q(x)=\sum_{k\ge0}\epsilon_k(x)2^k.
\]

The map \(Q:\mathbb Z_2\to\mathbb Z_2\) is a bijective isometry conjugating \(T\) to the binary shift. At every finite level \(k\), the Collatz graph modulo \(2^k\) is isomorphic to the binary de Bruijn graph \(B(2,k)\). citeturn348816view1turn132702view0

Write

\[
s_k=\sum_{j=0}^{k-1}\epsilon_j,
\qquad
q_k=\frac{3^{s_k}}{2^k}.
\]

The logarithmic symbolic drift is

\[
D_k=s_k\log 3-k\log2=\log q_k.
\]

The critical density is

\[
\alpha=\frac{\log2}{\log3}\approx0.6309297536.
\]

Call an infinite parity path a **barrier path** when

\[
q_k\ge1
\quad\Longleftrightarrow\quad
3^{s_k}\ge2^k
\qquad(k\ge0).
\tag{1}
\]

This is the strongest natural interpretation of “sustained positive drift” relevant to the previous barrier reduction.

For a finite word \(w=(\epsilon_0,\ldots,\epsilon_{k-1})\), define

\[
C_0=0,\qquad
C_{j+1}=3^{\epsilon_j}C_j+\epsilon_j2^j.
\tag{2}
\]

Then

\[
2^kT^k(n)=3^{s_k}n+C_k.
\tag{3}
\]

Consequently, the integers producing \(w\) are exactly one residue class modulo \(2^k\):

\[
n\equiv
-\sum_{j=0}^{k-1}
\frac{\epsilon_j2^j}{3^{s_{j+1}}}
\pmod {2^k}.
\tag{4}
\]

This finite inverse formula and the uniqueness of the residue class are standard properties of Collatz parity vectors. citeturn348816view3turn348816view4

---

# 2. No finite forbidden-lift theorem is possible

Let \(\rho_k(w)\) be the least nonnegative representative of the residue in (4).

## Theorem 1 — Finite-path universality

For every binary word \(w\) of length \(k\),

\[
\{n\in\mathbb Z_{>0}:V_k(n)=w\}
=
\{\rho_k(w)+m2^k:m\ge0\},
\tag{5}
\]

apart from possibly \(m=0\) when \(\rho_k=0\).

In particular:

1. every finite de Bruijn path is realized by infinitely many positive integers;
2. every finite barrier path is realized by infinitely many positive integers;
3. every finite word occurs at any prescribed time in some positive-integer orbit.

### Proof

Equation (3) shows that the prescribed parity branches are valid precisely when

\[
3^{s_k}n+C_k\equiv0\pmod{2^k}.
\]

Because \(3^{s_k}\) is odd, it has a unique inverse modulo \(2^k\), giving exactly one residue class. All sufficiently large members of that class are positive.

For the third assertion, choose a positive \(m\) realizing \(w\), and set

\[
n=2^j m.
\]

The first \(j\) parity bits of \(n\) are zero and \(T^j(n)=m\), so \(w\) appears starting at time \(j\). ∎

There is an especially strong explicit example. For every \(k\),

\[
n_k=2^k-1
\]

has parity prefix

\[
1^k=11\cdots1.
\]

Indeed, for \(0\le j\le k\),

\[
T^j(2^k-1)=3^j2^{k-j}-1,
\]

which is odd for \(j<k\). Thus

\[
q_j=\left(\frac32\right)^j>1
\qquad(1\le j\le k).
\tag{6}
\]

So even a maximally positive-drift finite path can be lifted to a positive integer at arbitrarily great depth.

## Corollary 2 — Topological no-go

The image \(Q(\mathbb Z_{\ge0})\) is dense in the full binary shift. Therefore:

> No nonempty cylinder set—equivalently, no condition depending on finitely many parity symbols—is disjoint from the positive-integer image.

Hence a theorem of the form

\[
\text{“Every barrier path eventually contains a finite forbidden word”}
\]

cannot work when “forbidden” means incompatible with positive-integer lifting.

The same conclusion applies to:

- any finite collection of forbidden words;
- any fixed finite-state subshift;
- any bounded-memory de Bruijn rule;
- any finite prefix condition, even when all drift inequalities up to that depth are included.

The distinction between ordinary integers and general \(2\)-adic integers exists only in the **infinite compatibility of the nested lifts**.

---

# 3. The exact nonlocal lift obstruction

For an infinite path \(\epsilon=(\epsilon_0,\epsilon_1,\ldots)\), let \(\rho_k\) be the canonical residue of its first \(k\) bits. Compatibility gives

\[
\rho_{k+1}\equiv\rho_k\pmod{2^k}.
\]

Therefore there is a unique bit \(b_k\in\{0,1\}\) such that

\[
\boxed{\rho_{k+1}=\rho_k+b_k2^k.}
\tag{7}
\]

Thus

\[
\rho_k=\sum_{j=0}^{k-1}b_j2^j,
\]

and the \(b_j\) are precisely the binary digits of the inverse \(2\)-adic integer

\[
\Phi(\epsilon)=Q^{-1}(\epsilon).
\]

## Theorem 3 — Exact positive-integer lift criterion

The following are equivalent:

\[
\begin{aligned}
&\Phi(\epsilon)\in\mathbb Z_{\ge0},\\
&b_k=0\quad\text{for all sufficiently large }k,\\
&\rho_k\quad\text{is eventually constant},\\
&\sup_k\rho_k<\infty,\\
&\rho_k/2^k\longrightarrow0.
\end{aligned}
\tag{8}
\]

### Proof

The sequence \(\rho_k\) is nondecreasing, and it increases exactly when \(b_k=1\). Thus boundedness, eventual constancy and finite support of \(b\) are equivalent.

If the eventual value is \(n\), then

\[
\Phi(\epsilon)\equiv n\pmod{2^k}
\]

for arbitrarily large \(k\), so \(\Phi(\epsilon)=n\) in \(\mathbb Z_2\).

Conversely, if \(\Phi(\epsilon)=n\ge0\), then for every \(k\) with \(2^k>n\), the least nonnegative representative of \(n\bmod2^k\) is \(n\), so \(\rho_k=n\).

Finally, if \(b_k=1\), then

\[
\frac{\rho_{k+1}}{2^{k+1}}\ge\frac12.
\]

Hence \(\rho_k/2^k\to0\) exactly when only finitely many \(b_k\) equal \(1\). ∎

This was the central characterization obtained in the preceding parity-conjugacy round. fileciteturn14file0L2-L2

The required “forbidden pattern” is therefore not a word. It is an **unbounded sequence of top-bit injections**

\[
b_k=1.
\]

A single injection is compatible with a positive integer; every nonzero binary digit of the starting integer produces one. Only infinitely many injections are forbidden.

---

## 3.1 A prefix-only carry machine

Define the canonical endpoint

\[
z_k=\frac{3^{s_k}\rho_k+C_k}{2^k}.
\tag{9}
\]

Then the lift can be computed without explicitly mentioning \(\Phi\):

\[
\boxed{b_k\equiv z_k+\epsilon_k\pmod2,}
\tag{10}
\]

\[
\boxed{
z_{k+1}
=
\frac{
3^{\epsilon_k}z_k+\epsilon_k+
b_k3^{s_{k+1}}
}{2}.
}
\tag{11}
\]

Moreover,

\[
0\le z_k<3^{s_k}.
\tag{12}
\]

Thus \(b_k=1\) says that the next desired parity bit disagrees with the parity predicted by the canonical endpoint of the preceding prefix.

On the barrier language, put

\[
R_k=\frac{C_k}{3^{s_k}}
=
\sum_{j<k}\frac{\epsilon_j2^j}{3^{s_{j+1}}}.
\]

Then

\[
\frac{z_k}{3^{s_k}}
=
\frac{\rho_k+R_k}{2^k}.
\tag{13}
\]

Since \(3^{s_j}\ge2^j\), every nonzero summand in \(R_k\) is at most \(1/3\). Hence

\[
0\le R_k\le\frac{k}{3},
\]

and

\[
\boxed{
0\le
\frac{z_k}{3^{s_k}}-\frac{\rho_k}{2^k}
\le\frac{k}{3\cdot2^k}.
}
\tag{14}
\]

Therefore, for a barrier path,

\[
\Phi(\epsilon)\in\mathbb Z_{\ge0}
\quad\Longleftrightarrow\quad
\frac{z_k}{3^{s_k}}\longrightarrow0.
\tag{15}
\]

This is a sharp “corner localization” formulation: an integer-lifted barrier path would have canonical endpoints approaching the lower corner of an exponentially expanding ternary interval.

---

# 4. The desired theorem is the divergent half of Collatz

The corrected forbidden-lift statement is

\[
\boxed{
\begin{minipage}{0.88\linewidth}
For every infinite binary path satisfying \(3^{s_k}\ge2^k\) for all \(k\), the inverse-carry sequence \(b_k\) contains infinitely many \(1\)'s.
\end{minipage}}
\tag{FL}
\]

Equivalently,

\[
\sup_k\rho_k=\infty.
\tag{16}
\]

Or, by (14),

\[
\limsup_{k\to\infty}\frac{z_k}{3^{s_k}}\ge\frac12.
\tag{17}
\]

## Proposition 4 — A positive integer barrier lift diverges

Suppose \(\epsilon\) is a barrier path and

\[
\Phi(\epsilon)=n>1.
\]

Then the orbit of \(n\) tends to infinity.

### Proof

From (3),

\[
T^k(n)
=
q_k\left(n+R_k\right).
\]

Since \(q_k\ge1\) and \(R_k\ge0\),

\[
T^k(n)\ge n
\qquad(k\ge0).
\tag{18}
\]

The orbit cannot repeat. If \(T^i(n)=T^j(n)\), with period \(p=j-i\) containing \(r\) odd steps, then

\[
T^i(n)=\frac{3^rT^i(n)+C}{2^p},
\qquad C>0.
\]

Consequently,

\[
3^r<2^p.
\]

Repeating the cycle would multiply subsequent \(q\)-values by \(3^r/2^p<1\), eventually contradicting \(q_k\ge1\).

Thus the orbit is injective. An injective sequence of positive integers eventually leaves every finite interval, so it tends to infinity. ∎

Conversely, the earlier barrier theorem in the project shows that a divergent orbit can be shifted to a global minimum of \(q_k\), producing a positive integer barrier lift. Consequently, (FL) is equivalent to excluding divergent positive Collatz orbits. fileciteturn15file0L2-L2

This is the exact circularity:

\[
\boxed{
\text{forbidden-lift theorem (FL)}
\quad\Longleftrightarrow\quad
\text{no divergent Collatz orbit}.
}
\tag{19}
\]

The conjugacy has not made the missing assertion weaker. It has represented it exactly as the statement that critical-drift paths cannot have finite-support inverse carries.

---

# 5. A genuine forbidden-lift theorem: periodic positive drift

Although arbitrary finite patterns cannot be forbidden, infinite repetition can be.

Let \(w=(\epsilon_0,\ldots,\epsilon_{p-1})\), let

\[
r=\sum_{j=0}^{p-1}\epsilon_j,
\]

and let \(C_w\) be defined by (2). The branch composition determined by \(w\) is

\[
T_w(x)=\frac{3^r x+C_w}{2^p}.
\tag{20}
\]

## Theorem 5 — Positive-drift periodic tails are forbidden

Suppose an infinite parity path is eventually periodic with period \(w\). If

\[
3^r>2^p,
\tag{21}
\]

then the path cannot lift to a positive integer.

### Proof

The value at the beginning of the periodic tail must be the fixed point of \(T_w\):

\[
x_w=\frac{C_w}{2^p-3^r}.
\tag{22}
\]

Since \(r>0\), we have \(C_w>0\). Under (21), the denominator is negative, hence

\[
x_w<0.
\]

But every forward iterate of a positive integer is positive. Therefore no positive orbit can enter this periodic tail. ∎

For example, the sustained-positive-drift path

\[
(110)^\infty
\]

has \(p=3,r=2\), so \(3^r/2^p=9/8>1\). Here \(C_w=5\), and

\[
x_w=\frac{5}{8-9}=-5.
\]

Indeed,

\[
-5\longmapsto-7\longmapsto-10\longmapsto-5.
\]

This is exactly the type of forbidden lift envisioned by the proposal—but it works because the **entire tail repeats**, not because the finite word \(110\) is forbidden. The word \(110\) itself is realized by many positive integers.

---

# 6. Quantitative forbidden returns in de Bruijn graphs

The periodic result admits a useful finite quantitative strengthening.

Let

\[
x_i=T^i(n).
\]

Suppose the length-\(L\) parity windows at times \(i\) and \(i+p\) agree:

\[
(\epsilon_i,\ldots,\epsilon_{i+L-1})
=
(\epsilon_{i+p},\ldots,\epsilon_{i+p+L-1}).
\tag{23}
\]

This says that the path has returned to the same vertex of \(B(2,L)\).

Let the intervening block

\[
w=(\epsilon_i,\ldots,\epsilon_{i+p-1})
\]

contain \(r\) ones.

## Theorem 6 — De Bruijn positive-return inequality

If

\[
3^r>2^p,
\tag{24}
\]

then

\[
\boxed{
x_i+1
\ge
\frac{2^{p+L}}{3^p-2^p}
>
2^L\left(\frac23\right)^p.
}
\tag{25}
\]

Consequently,

\[
\boxed{
L<
\log_2(n+1)
+
(i+p)\log_2\!\left(\frac32\right).
}
\tag{26}
\]

### Proof

Because equal length-\(L\) parity vectors correspond to equal residues modulo \(2^L\),

\[
x_{i+p}\equiv x_i\pmod{2^L}.
\tag{27}
\]

The branch formula gives

\[
x_{i+p}
=
\frac{3^r x_i+C_w}{2^p}.
\tag{28}
\]

Under (24),

\[
x_{i+p}-x_i
=
\frac{(3^r-2^p)x_i+C_w}{2^p}>0.
\]

Together with (27), this implies

\[
x_{i+p}-x_i\ge2^L,
\]

and hence

\[
(3^r-2^p)x_i+C_w\ge2^{p+L}.
\tag{29}
\]

We have the universal estimates

\[
3^r-2^p\le3^p-2^p
\tag{30}
\]

and

\[
C_w\le3^p-2^p.
\tag{31}
\]

The latter follows inductively from (2): if \(C_j\le3^j-2^j\), then an even extension leaves \(C_j\) unchanged, while an odd extension gives

\[
3C_j+2^j
\le
3(3^j-2^j)+2^j
=
3^{j+1}-2^{j+1}.
\]

Therefore

\[
(3^p-2^p)(x_i+1)\ge2^{p+L},
\]

which proves (25).

For every positive \(x\),

\[
T(x)+1\le\frac32(x+1).
\]

Iterating gives

\[
x_i+1\le\left(\frac32\right)^i(n+1).
\tag{32}
\]

Combining (25) and (32),

\[
2^L\left(\frac23\right)^p
<
\left(\frac32\right)^i(n+1),
\]

which is equivalent to (26). ∎

---

## 6.1 Positive-drift squares

If the path contains a square \(ww\), with \(|w|=p\), then the two occurrences of \(w\) give \(L=p\). When \(w\) has positive drift,

\[
\boxed{
p\log_2\!\left(\frac43\right)
<
\log_2(n+1)
+
i\log_2\!\left(\frac32\right).
}
\tag{33}
\]

At \(i=0\), this becomes

\[
p<\log_{4/3}(n+1).
\tag{34}
\]

Thus the parity sequence of a fixed positive integer cannot begin with arbitrarily long positive-drift squares.

More generally, a counterexample path would have to obey the height-sensitive complexity restriction (26) at **every** positive-drift return in **every** de Bruijn graph \(B(2,L)\).

This is a genuine forbidden-lift theorem: a return violating (26) is incompatible with lifting to the given positive seed \(n\).

---

# 7. Why the return theorem does not force extinction

To finish through Theorem 6, one would need a combinatorial statement resembling:

> Every infinite barrier path has a positive-drift return whose matching length \(L\) violates (26).

That statement is false for arbitrary barrier paths.

Choose independent binary symbols with

\[
\Pr(\epsilon_j=1)=\theta
\qquad\text{for some }\theta>\alpha.
\]

Almost surely,

\[
\frac{s_k}{k}\longrightarrow\theta,
\]

so

\[
s_k\log3-k\log2\longrightarrow+\infty.
\]

The weighted walk therefore has a finite global minimum. Shifting the sequence to the position of that minimum produces a barrier path.

On the other hand, exact long returns are exponentially unlikely. For example, the probability that two adjacent length-\(p\) blocks agree is

\[
\left(\theta^2+(1-\theta)^2\right)^p.
\]

A union bound followed by Borel–Cantelli shows that one can choose such a barrier path for which every sufficiently late square has half-length only \(O(\log i)\), where \(i\) is its position. The same argument bounds long matching windows between separated suffixes.

Thus positive drift alone does not force the periodic-scale recurrences needed by Theorem 6. High-complexity barrier paths can avoid them.

Almost every such symbolic path has a noninteger \(2\)-adic lift. The remaining challenge is precisely to show that a path whose inverse lift has **finite binary support** cannot share this high-complexity behavior. No such complexity theorem is currently obtained from the conjugacy.

---

## 7.1 The arithmetic carry, not the de Bruijn graph, is decisive

Consider the companion map

\[
T_-(x)=
\begin{cases}
x/2,&x\text{ even},\\
(3x-1)/2,&x\text{ odd}.
\end{cases}
\]

The same parity word

\[
(110)^\infty
\]

now lifts to the positive cycle

\[
5\longmapsto7\longmapsto10\longmapsto5.
\]

Its symbolic multiplier is still \(9/8>1\).

For the \(3x+1\) map the lift is \(-5\); for the \(3x-1\) map it is \(+5\). The de Bruijn path and its drift data are identical. Only the sign of the affine carry changes.

Therefore no theorem based solely on:

- de Bruijn recurrence,
- parity density,
- symbolic drift, or
- graph topology

can distinguish positive and negative lifting. The \(+1\) carry cocycle and its unbounded cross-scale synchronization are essential.

---

# 8. Nontrivial cycles are a separate obstruction

Even a proof of (FL) would exclude only divergent orbits.

For a periodic word \(w\) of length \(p\), with \(r\) ones, the periodic point is

\[
x_w=\frac{C_w}{2^p-3^r}.
\tag{35}
\]

A positive cycle must have

\[
2^p>3^r,
\tag{36}
\]

because \(C_w>0\). Thus every positive cycle has **negative symbolic drift over its full period**.

The integrality condition is

\[
\boxed{
2^p-3^r\mid C_w.
}
\tag{37}
\]

The trivial word \(10\), and its rotation \(01\), gives the cycle \(1\leftrightarrow2\). A full cycle theorem would have to prove:

\[
\boxed{
\frac{C_w}{2^p-3^r}\notin\mathbb Z_{>0}
}
\tag{CL}
\]

for every primitive word \(w\) not equivalent to \(10\).

The sustained-positive-drift de Bruijn argument cannot prove (CL), since the cycle words it must exclude have negative total drift. The contemporary literature still treats both divergent behavior and nontrivial positive cycles as unresolved; recent symbolic work explicitly presents its methods as diagnostics rather than a verification of Collatz. citeturn348816view3turn132702view2

---

# 9. Exact conditional full proof

The narrowest clean completion produced by this approach is the following.

## Conditional Theorem 7

Assume:

1. **Unbounded-carry theorem.** Every barrier path has infinitely many inverse carries \(b_k=1\).
2. **Cycle-lift theorem.** The only primitive periodic parity word whose point (35) is a positive integer is \(10\), up to cyclic rotation.

Then every positive integer reaches \(1\).

### Proof

Suppose some positive integer \(n\) does not reach \(1\).

If its orbit is bounded, then because the map is deterministic on the positive integers, some value repeats. The orbit therefore enters a positive cycle. Assumption 2 says that this cycle is \(1\leftrightarrow2\), contradicting the supposition that \(n\) does not reach \(1\).

Hence the orbit is unbounded. Since it is nonperiodic, it is injective. An injective positive-integer orbit eventually leaves every finite interval, so it tends to infinity.

The previously established global-minimum drift reduction then supplies a shifted orbit whose parity path satisfies

\[
3^{s_k}\ge2^k
\qquad(k\ge0).
\]

Because this path comes from a fixed positive integer, Theorem 3 says that its inverse-carry sequence is eventually zero. This contradicts Assumption 1.

Therefore every positive integer reaches \(1\). ∎

---

# Final assessment

Approach 73 produces three rigorous conclusions.

First, its original finite-pattern premise is false:

\[
\boxed{\text{Every finite de Bruijn path lifts to positive integers.}}
\]

Second, the correct forbidden-lift condition is completely explicit:

\[
\boxed{
\text{a barrier path is nonintegral exactly when it creates infinitely many top-bit carries.}
}
\]

But proving that every barrier path does so is equivalent to excluding divergent Collatz orbits.

Third, de Bruijn recurrence does yield the new quantitative obstruction

\[
\boxed{
x_i+1\ge\frac{2^{p+L}}{3^p-2^p}
}
\]

for every positive-drift return of separation \(p\) and matching length \(L\). This excludes eventually periodic positive-drift paths and strongly repetitive counterexample candidates. It does not exclude high-complexity critical paths, and positive cycles remain a separate divisibility problem.

Accordingly, I cannot label the argument a full proof. The precise unresolved statements are now:

\[
\textbf{(FL)}\quad
3^{s_k}\ge2^k\ \forall k
\ \Longrightarrow\
b_k=1\ \text{infinitely often},
\]

and

\[
\textbf{(CL)}\quad
2^p-3^r\nmid C_w
\]

for every nontrivial primitive positive-cycle word. These are respectively the divergent-orbit and cycle halves of the conjecture, expressed in the sharpest de Bruijn/conjugacy language obtained here.