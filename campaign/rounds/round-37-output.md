model: GPT-5.6 Pro (Chat mode)
round: 37 -- approach 32, Electrical capacity of infinity
front: proof
sent: 2026-08-14T21:36Z
worked: 58m 37s

---
# Result of the electrical-capacity approach

The proposed argument does **not** yield a valid full proof of the Collatz conjecture. The electrical calculation can be completed rigorously—and gives a surprisingly clean zero-capacity theorem—but the intended implication

\[
\text{zero capacity at infinity}
\quad\Longrightarrow\quad
\text{every directed orbit returns to the root}
\]

is false.

There are actually two complementary obstructions:

1. Conductances depending only on the local multiplicative expansion give **positive** capacity because the inverse tree contains a bounded-label binary subtree.
2. A natural cumulative multiplicative conductance does give **zero** capacity, but it does so for essentially every rooted Collatz inverse tree, including inverse trees that could be attached to a hypothetical nontrivial cycle or divergent component.

The second result is still a rigorous and potentially useful theorem.

---

## 1. Odd-only Collatz graph

Work with the Syracuse map on positive odd integers,

\[
U(n)=\frac{3n+1}{2^{a(n)}},
\qquad
a(n)=\nu _2(3n+1).
\]

The Collatz conjecture is equivalent to the assertion that every positive odd integer eventually reaches \(1\) under \(U\).

For an odd integer \(m\), its inverse children have the form

\[
n_a(m)=\frac{2^a m-1}{3}.
\]

This is a positive odd integer precisely when

\[
2^a m\equiv 1\pmod 3.
\]

Thus:

\[
m\equiv1\pmod3\quad\Longrightarrow\quad a\ \text{even},
\]

\[
m\equiv2\pmod3\quad\Longrightarrow\quad a\ \text{odd},
\]

while \(m\equiv0\pmod3\) has no inverse children.

Let \(\mathcal T_1\) be the inverse tree consisting of odd integers already known, by definition, to eventually reach \(1\). The self-loop \(U(1)=1\) is removed.

For a conductance network \((\mathcal T_1,c)\), write

\[
\mathcal E(f)
   =\sum_{\{v,p(v)\}}
      c(v,p(v))\bigl(f(v)-f(p(v))\bigr)^2
\]

and

\[
\operatorname{Cap}(1,\infty)
 =
 \inf\left\{
       \mathcal E(f):
       f(1)=1,\;
       f\text{ finitely supported}
     \right\}.
\]

This is the effective conductance from \(1\) to infinity. Zero capacity corresponds to infinite effective resistance and recurrence of the associated **reversible random walk**. Conversely, a finite-energy unit flow to infinity proves positive capacity and transience. citeturn522255view0turn522255view1

---

# 2. Local multiplicative conductances cannot work

Suppose the conductance of an inverse edge depends only on its exponent:

\[
c\bigl(n_a(m),m\bigr)=\psi(a),
\qquad
\psi(a)>0.
\]

This includes choices such as

\[
\psi(a)=\frac{3}{2^a},
\qquad
\psi(a)=\frac{2^a}{3},
\]

and arbitrary positive functions of the local multiplicative expansion.

## Proposition 1: bounded-label binary subtree

The inverse tree below \(5\) contains a full binary subtree all of whose edge exponents lie in

\[
\{1,2,3,4,5,6\}.
\]

### Proof

Let \(m\not\equiv0\pmod3\). An inverse child \(n_a(m)\) is divisible by \(3\) exactly when

\[
2^a m\equiv1\pmod9.
\]

Since \(2\) generates the unit group \((\mathbb Z/9\mathbb Z)^\times\), which has order \(6\), there is exactly one residue class \(a\pmod6\) satisfying this congruence.

If \(m\equiv1\pmod3\), the allowed exponents are even. Their three classes modulo \(6\) have smallest positive representatives

\[
2,\ 4,\ 6.
\]

Exactly one produces a child divisible by \(3\), so the other two produce children not divisible by \(3\).

If \(m\equiv2\pmod3\), the allowed exponents are odd, with representatives

\[
1,\ 3,\ 5.
\]

Again, exactly one produces a multiple of \(3\), and the other two produce nonmultiples of \(3\).

A child divisible by \(3\) has no inverse descendants, while either of the other two can be continued. Starting at

\[
5=\frac{2^4\cdot1-1}{3},
\]

and repeatedly retaining the two nonmultiples of \(3\), gives a full binary subtree with exponents at most \(6\). ∎

Set

\[
c_*=\min_{1\leq a\leq6}\psi(a)>0.
\]

Send one unit of current through the edge \(1\!-\!5\), and then split it equally at every vertex of the binary subtree. At binary level \(j\), each of the \(2^j\) edges carries current \(2^{-j}\), so its total energy is at most

\[
2^j\left(2^{-j}\right)^2\frac1{c_*}
   =\frac{2^{-j}}{c_*}.
\]

Therefore the whole binary subtree has energy at most

\[
\sum_{j=1}^{\infty}\frac{2^{-j}}{c_*}
 =\frac1{c_*}.
\]

Including the edge \(1\!-\!5\), whose exponent is \(4\),

\[
R_{\mathrm{eff}}(1,\infty)
\leq
\frac1{\psi(4)}+\frac1{c_*}<\infty.
\]

Thus

\[
\boxed{\operatorname{Cap}(1,\infty)>0}
\]

for every strictly positive conductance depending only on the local exponent.

For the especially natural choice

\[
\psi(a)=\frac{3}{2^a},
\]

we have

\[
c_*=\frac3{64},
\qquad
\frac1{\psi(4)}=\frac{16}{3},
\]

and hence

\[
R_{\mathrm{eff}}\leq\frac{80}{3},
\qquad
\operatorname{Cap}(1,\infty)\geq\frac3{80}.
\]

So the naïve expansion-weighted network is definitely transient.

---

# 3. A cumulative derivative conductance has zero capacity

The local rule fails because it resets the expansion factor at every edge. A more natural nonlocal choice is to use the cumulative multiplicative derivative.

Let

\[
1=x_0\leftarrow x_1\leftarrow\cdots\leftarrow x_d=v
\]

be the unique inverse path in \(\mathcal T_1\), with

\[
x_i=\frac{2^{a_i}x_{i-1}-1}{3}.
\]

Set

\[
A_i=a_1+\cdots+a_i
\]

and define

\[
Q(x_i)=\frac{3^i}{2^{A_i}},
\qquad
Q(1)=1.
\]

Thus

\[
\frac{Q(x_i)}{Q(x_{i-1})}
   =\frac{3}{2^{a_i}}.
\]

Assign the edge \(x_i-x_{i-1}\) the conductance

\[
\boxed{c(x_i,x_{i-1})=Q(x_i)}.
\]

This conductance remembers the whole inverse path.

## The fundamental telescoping identity

From

\[
x_i=\frac{2^{a_i}x_{i-1}-1}{3}
\]

we obtain

\[
\begin{aligned}
Q(x_i)x_i
&=
Q(x_{i-1})\frac{3}{2^{a_i}}
  \frac{2^{a_i}x_{i-1}-1}{3} \\[2mm]
&=
Q(x_{i-1})x_{i-1}
 -
\frac{Q(x_{i-1})}{2^{a_i}} \\[2mm]
&=
Q(x_{i-1})x_{i-1}
 -
\frac{Q(x_i)}{3}.
\end{aligned}
\]

Telescoping along the path gives

\[
\boxed{
Q(v)v
=
1-\frac13\sum_{i=1}^{d}Q(x_i).
}
\tag{1}
\]

In particular,

\[
0<Q(v)v\leq1,
\]

and therefore

\[
\boxed{Q(v)\leq\frac1v.}
\tag{2}
\]

Identity (1) is the main arithmetic fact behind the capacity calculation.

Notice also that the weighted degree is finite. For a parent \(m\equiv1\pmod3\),

\[
\sum_{\substack{a\geq2\\a\ {\rm even}}}
  \frac{3}{2^a}
=1,
\]

and for \(m\equiv2\pmod3\),

\[
\sum_{\substack{a\geq1\\a\ {\rm odd}}}
  \frac{3}{2^a}
=2.
\]

Thus the sum of child conductances is at most \(2Q(m)\).

---

## Theorem 2: exact zero-capacity theorem

For the conductance

\[
c(v,p(v))=Q(v),
\]

one has

\[
\boxed{\operatorname{Cap}_{\mathcal T_1}(1,\infty)=0.}
\]

### Proof

Fix

\[
0<\beta\leq\frac12
\]

and define

\[
f_\beta(v)=Q(v)^\beta.
\]

Then \(f_\beta(1)=1\). Let \(p=p(v)\), and write

\[
t=\frac{Q(v)}{Q(p)}
  =\frac{3}{2^{a(v)}}.
\]

The energy of the edge \(v-p\) is

\[
\begin{aligned}
Q(v)\bigl(f_\beta(v)-f_\beta(p)\bigr)^2
&=
Q(p)t
 \left(
 Q(p)^\beta t^\beta-Q(p)^\beta
 \right)^2\\
&=
Q(p)^{1+2\beta}
 t(t^\beta-1)^2.
\end{aligned}
\tag{3}
\]

For \(0<\beta\leq1/2\),

\[
t^\beta-1
=
\int_0^\beta t^s\log t\,ds.
\]

Since \(0<t\leq3/2\),

\[
|t^s|\leq\sqrt{\frac32}
\]

for \(0\leq s\leq1/2\). Also, when \(t=3/2^a\),

\[
|\log t|
 \leq C_0(1+a)
\]

for an absolute constant \(C_0\). Hence

\[
|t^\beta-1|
 \leq C_1\beta(1+a).
\]

Consequently,

\[
t(t^\beta-1)^2
\leq
C_2\beta^2\,2^{-a}(1+a^2).
\]

Summing over all possible exponents gives a constant \(K<\infty\), independent of the parent and of \(\beta\), such that

\[
\sum_{v:p(v)=p}
t(v)\bigl(t(v)^\beta-1\bigr)^2
\leq K\beta^2.
\]

Using (3),

\[
\mathcal E(f_\beta)
\leq
K\beta^2
\sum_{p\in\mathcal T_1}Q(p)^{1+2\beta}.
\]

By (2),

\[
\sum_{p\in\mathcal T_1}Q(p)^{1+2\beta}
\leq
\sum_{n=1}^{\infty}\frac1{n^{1+2\beta}}
=
\zeta(1+2\beta).
\]

The integral estimate gives

\[
\zeta(1+2\beta)
\leq
1+\frac1{2\beta},
\]

so

\[
\mathcal E(f_\beta)
\leq
K\beta^2\left(1+\frac1{2\beta}\right)
=
K\left(\beta^2+\frac{\beta}{2}\right).
\]

Therefore

\[
\mathcal E(f_\beta)\longrightarrow0
\qquad(\beta\downarrow0).
\]

The function \(f_\beta\) is not finitely supported, so introduce the truncation

\[
g_\beta(v)
=
2\left(f_\beta(v)-\frac12\right)_+.
\]

Then \(g_\beta(1)=1\). Moreover, \(g_\beta(v)>0\) implies

\[
Q(v)^\beta>\frac12,
\]

hence

\[
Q(v)>2^{-1/\beta}.
\]

Using \(Q(v)\leq1/v\), this forces

\[
v<2^{1/\beta}.
\]

Thus \(g_\beta\) has finite support.

The map

\[
s\longmapsto2(s-\tfrac12)_+
\]

is \(2\)-Lipschitz, so

\[
\mathcal E(g_\beta)
\leq4\mathcal E(f_\beta)
\longrightarrow0.
\]

Therefore the infimum defining the capacity is zero:

\[
\operatorname{Cap}_{\mathcal T_1}(1,\infty)=0.
\qquad\Box
\]

---

# 4. Why this is not a Collatz proof

## The capacity only sees the component already attached to \(1\)

The network \(\mathcal T_1\) contains exactly those odd integers whose orbits are already in the component of \(1\). A hypothetical divergent orbit or nontrivial cycle would belong to another connected component and would contribute no edge whatsoever to the effective capacity measured from \(1\).

In the ordinary Collatz graph, two integers merge exactly when they lie in the same connected component, and the Collatz conjecture is equivalent to the assertion that this graph is connected. citeturn522255view3

Thus proving

\[
\operatorname{Cap}_{\mathcal T_1}(1,\infty)=0
\]

does not prove

\[
\mathcal T_1=\{\text{all positive odd integers}\}.
\]

Abstractly, one can adjoin a completely disjoint directed ray

\[
y_0\longrightarrow y_1\longrightarrow y_2\longrightarrow\cdots
\]

to \(\mathcal T_1\). The effective capacity from \(1\) remains unchanged, although the new directed graph has an escaping orbit.

The same logical blindness occurs for any network constructed only from Collatz edges.

---

## Electrical recurrence is random-walk recurrence, not orbit recurrence

Consider the half-line

\[
0-1-2-3-\cdots
\]

with unit conductances. Its resistance to infinity is

\[
1+1+1+\cdots=\infty,
\]

so its effective capacity is zero and the associated symmetric random walk is recurrent.

But the deterministic map

\[
D(k)=k+1
\]

escapes to infinity from every starting point.

Hence even on one connected graph,

\[
\text{zero electrical capacity}
\]

does not imply that a prescribed orientation or deterministic path moves toward the root. The electrical network forgets which direction is the Collatz direction.

This is not a technical gap; it is a counterexample to the proposed bridge.

---

# 5. The zero-capacity theorem is componentwise universal

The preceding proof was not special to \(1\).

Let \(m\) be any odd integer and consider an acyclic first-entry inverse tree rooted at \(m\). Set \(Q(m)=1\), and define \(Q\) by the same multiplicative recursion. Along

\[
m=x_0\leftarrow x_1\leftarrow\cdots\leftarrow x_d=v
\]

the same calculation gives

\[
\boxed{
Q(v)v
=
m-\frac13\sum_{i=1}^{d}Q(x_i).
}
\tag{4}
\]

Consequently,

\[
Q(v)\leq\frac{m}{v}.
\]

Repeating the energy argument gives

\[
\operatorname{Cap}_{\mathcal T_m}(m,\infty)=0.
\]

Thus the zero-capacity result applies to every attached inverse tree, not just the inverse tree of \(1\).

In particular, suppose hypothetically that there were a nontrivial finite cycle. Delete the finitely many cycle edges. The component becomes a finite collection of rooted inverse trees attached to the cycle vertices. Each such inverse tree has zero capacity by (4). Restoring the finite cycle does not turn those zero-capacity ends into positive-capacity ends.

Therefore:

\[
\boxed{\text{A nontrivial Collatz cycle is completely compatible with this zero-capacity theorem.}}
\]

This is unavoidable: a capacity-at-infinity argument has no direct way to detect a finite cycle. The classical decomposition of the Collatz problem likewise requires excluding both divergent orbits and nontrivial cycles. citeturn522255view3

---

# 6. What happens on a hypothetical divergent component?

The cumulative conductance can also be extended over a cycle-free component.

Let

\[
x_{k+1}=U(x_k),
\qquad
a_k=\nu_2(3x_k+1),
\qquad
A_k=\sum_{j=0}^{k-1}a_j,
\]

and define

\[
q_k=\frac{3^k}{2^{A_k}}.
\]

Normalize \(Q(x_0)=1\). Since moving forward reverses the inverse-cocycle relation,

\[
Q(x_k)=\frac{2^{A_k}}{3^k}
      =\frac1{q_k}.
\]

The conductance of the forward-spine edge \(x_k-x_{k+1}\) is therefore

\[
c_k=\frac1{q_k},
\]

so its resistance is

\[
r_k=q_k.
\]

All inverse bushes attached to the spine are electrically dangling: they connect to the spine at only one vertex and carry no current toward the forward end. Hence the resistance to the forward end is exactly

\[
\boxed{
R_{\mathrm{forward}}
=
\sum_{k=0}^{\infty}q_k.
}
\tag{5}
\]

Thus this weighting would assign **positive** capacity to a divergent orbit only after proving

\[
\sum_{k=0}^{\infty}
\frac{3^k}{2^{A_k}}
<\infty.
\tag{6}
\]

But divergence of \(x_k\) does not provide (6). Indeed, the exact affine identity is

\[
\boxed{
x_k
=
q_k
\left(
x_0+\frac13\sum_{j=0}^{k-1}\frac1{q_j}
\right).
}
\tag{7}
\]

Equation (7) allows growth to arise through \(q_k\), through the accumulated affine term, or through an interaction between them. It gives no implication that \(\sum q_k\) converges. In the expansion-dominated regime \(q_k\) becomes large, making the resistance sum in (5) even more divergent.

So the cumulative conductance that makes the inverse tree recurrent has the wrong orientation for detecting a forward-growing trajectory.

---

# 7. Congruence density does not repair the bridge

There is a strong known backtracing theorem: every arithmetic progression is a sufficient set. Equivalently, each Collatz component meets every arithmetic progression; more quantitatively, one can backtrace from a node into any prescribed congruence class. citeturn522255view4turn468309view0

This means that distinct hypothetical components would each intersect every residue class modulo every integer. Nevertheless, it does not connect those components.

Two disjoint sets can both intersect every congruence class. Electrically, if there is no actual edge between them, no current passes between them. Congruence density supplies finite approximations to another component, but not an actual finite Collatz path joining the components.

To turn congruence approximation into equality, one would need an additional archimedean tightness theorem—for example, representatives congruent to a fixed \(n\) modulo arbitrarily large moduli whose sizes remain below those moduli. Such a bound would itself essentially force the representative eventually to equal \(n\), and is comparable in strength to the missing Collatz assertion.

---

# 8. Exact verdict

The approach produces the following rigorous conclusions:

\[
\boxed{
\begin{array}{l}
\text{Every strictly positive local expansion conductance gives positive capacity;}\\[1mm]
\text{the cumulative derivative conductance }c(v,p)=Q(v)\text{ gives zero capacity;}\\[1mm]
\text{but this zero-capacity theorem holds componentwise and has no}\\
\text{pointwise implication for the directed Collatz orbit.}
\end{array}}
\]

A genuine electrical proof would require a new theorem of the form

\[
\boxed{
\text{divergent orbit or nontrivial cycle}
\quad\Longrightarrow\quad
\text{positive-capacity structure electrically connected to }1.
}
\tag{8}
\]

For a network containing only Collatz edges, (8) is impossible as stated: a bad component is disconnected from \(1\), and a finite cycle does not meet infinity. One would have to add non-Collatz “horizontal” arithmetic edges or use a genuinely directed, non-reversible notion of capacity. One would then need to prove that the added structure preserves exact dynamical meaning rather than merely replacing the conjecture with a hidden connectivity assumption.

Therefore the electrical-capacity proposal, in its stated form, cannot be completed into a full Collatz proof. Its strongest valid output is the exact cumulative-conductance zero-capacity theorem above, together with the local-conductance and pointwise-bridge no-go results.