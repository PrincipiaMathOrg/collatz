model: GPT-5.6 Pro (Chat mode)
round: 35 -- approach 30, Base-6 carry particles
front: proof
sent: 2026-08-14T19:52Z
worked: 45m 29s

---
## Verdict

I did **not** obtain a valid full proof of the Collatz conjecture from the base‑6 particle model. What the approach does produce is an exact and unusually transparent formulation of the remaining obstruction:

> The base‑6 bulk is a reversible carry gas. Convergence can therefore come only from an imbalance between a source at the least-significant boundary and a sink at the most-significant boundary.

A localized periodic “glider” is not a divergent counterexample: once the moving boundary is included, it is exactly a Collatz cycle. Any divergent counterexample would instead be an **unbounded, aperiodic particle cloud** whose source rate remains critically synchronized with the rate at which leading cells disappear.

This limitation is substantive. Base‑6 cellular representations were already developed by Korec, who observed the absence of carry propagation and constructed an eight-state system whose nilpotency is equivalent to the Collatz conjecture. Later work likewise notes that base \(6\) makes the process local. citeturn107048view0turn107048view2turn865898view1 Recent technical work in 2026 continues to treat a general proof as unavailable. citeturn865898view0

What follows is the exact reduction, the classification that can be proved, and the precise theorem still missing.

---

# 1. The exact base‑6 particle rule

Let

\[
T(n)=
\begin{cases}
n/2,&n\equiv0\pmod 2,\\[2mm]
3n+1,&n\equiv1\pmod 2.
\end{cases}
\]

Write

\[
n=\sum_{j=0}^{m}d_j6^j,\qquad d_j\in\{0,1,2,3,4,5\},
\]

with \(d_m\ne0\). Split every digit uniquely as

\[
d_j=2c_j+p_j,
\qquad
c_j\in\{0,1,2\},
\qquad
p_j\in\{0,1\}.
\]

Thus \(c_j\) is a ternary carry charge and \(p_j\) is a binary parity particle.

## Lemma 1: quotient-and-feedback form

Write \(n=2q+r\), \(r\in\{0,1\}\). Then

\[
T(n)=
\begin{cases}
q,&r=0,\\
6q+4,&r=1.
\end{cases}
\tag{1}
\]

### Proof

The even case is immediate. If \(n=2q+1\), then

\[
3n+1=3(2q+1)+1=6q+4.
\]

\(\square\)

Thus one Collatz step does the following:

1. divide the base‑6 word by \(2\);
2. inspect the discarded remainder bit;
3. if it is \(1\), feed it back by appending a terminal digit \(4\).

This is the cleanest form of the base‑6 mechanism.

Set \(p_{m+1}=0\). The base‑6 digits of \(q=\lfloor n/2\rfloor\) are

\[
e_j=c_j+3p_{j+1},
\qquad 0\le j\le m.
\tag{2}
\]

Indeed,

\[
\left\lfloor\frac n2\right\rfloor
=
\sum_{j=0}^{m}c_j6^j
+
\sum_{j=1}^{m}3p_j6^{j-1}.
\]

Equation (2) shows that the binary particle \(p_{j+1}\) moves one place toward the least-significant boundary and interacts with the stationary ternary charge \(c_j\).

Split \(e_j=2c'_j+p'_j\). The collision gate is

\[
\Phi(c,p)
=
\left(
\left\lfloor\frac{c+3p}{2}\right\rfloor,
(c+3p)\bmod2
\right).
\tag{3}
\]

Its complete table is

\[
\begin{array}{c|c|c}
(c,p)&c+3p&\Phi(c,p)\\
\hline
(0,0)&0&(0,0)\\
(0,1)&3&(1,1)\\
(1,0)&1&(0,1)\\
(1,1)&4&(2,0)\\
(2,0)&2&(1,0)\\
(2,1)&5&(2,1).
\end{array}
\tag{4}
\]

If the pair \((c,p)\) is encoded by \(x=2c+p\), then the collision is the permutation

\[
0\mapsto0,\qquad
5\mapsto5,\qquad
1\mapsto3\mapsto4\mapsto2\mapsto1.
\tag{5}
\]

In particular, the interior collision is bijective.

There is a dual multiplication picture. Since

\[
3d_j=6c_j+3p_j,
\]

the \(j\)-th digit of \(3n\) is

\[
3p_j+c_{j-1},
\tag{6}
\]

where \(c_{-1}=0\). Thus multiplication by \(3\) streams the \(c\)-particles toward more significant positions and applies exactly the same collision gate \(\Phi\). The division and multiplication pictures are rotations of the same reversible lattice gas.

---

# 2. The only dissipation occurs at the two boundaries

Let \(n_t=T^t(n_0)\). Define

\[
b_t=
\begin{cases}
1,&n_t\text{ odd},\\
0,&n_t\text{ even},
\end{cases}
\]

so \(b_t\) records whether a new digit \(4\) is injected at the low-order boundary.

Let

\[
h_t=
\begin{cases}
1,&\text{the leading base-6 digit of }n_t\text{ is }1,\\
0,&\text{the leading digit is }2,3,4,\text{ or }5.
\end{cases}
\]

If the leading digit is \(1\), division by \(2\) turns that leading position into \(0\), so the high-order cell disappears.

Finally, let

\[
\ell_t=1+\lfloor \log_6 n_t\rfloor
\]

be the number of base‑6 digits.

## Proposition 2: exact source-sink balance

For every \(t\),

\[
\boxed{\ell_{t+1}-\ell_t=b_t-h_t.}
\tag{7}
\]

Consequently, if

\[
B_t=\sum_{k=0}^{t-1}b_k,
\qquad
H_t=\sum_{k=0}^{t-1}h_k,
\]

then

\[
\boxed{\ell_t=\ell_0+B_t-H_t.}
\tag{8}
\]

### Proof

The quotient \(q=\lfloor n_t/2\rfloor\) loses one leading digit precisely when the leading digit of \(n_t\) is \(1\). Hence its length is \(\ell_t-h_t\), with the convention that \(0\) has length \(0\).

If \(b_t=0\), the output is \(q\). If \(b_t=1\), equation (1) says that the output is \(6q+4\), which appends one digit. Therefore

\[
\ell_{t+1}=\ell_t-h_t+b_t.
\]

\(\square\)

The particle system is therefore a deterministic queue:

- \(b_t=1\) injects one cell at the low-order end;
- \(h_t=1\) removes one cell at the high-order end;
- all interior evolution is reversible.

---

# 3. The high-order sink is an almost Sturmian clock

Set

\[
\beta=\log_6 2=0.3868528072\ldots
\]

and write

\[
\log_6 n_t=(\ell_t-1)+\theta_t,
\qquad 0\le\theta_t<1.
\]

The condition that the leading digit is \(1\) is exactly

\[
h_t=\mathbf 1_{\{\theta_t<\beta\}}.
\tag{9}
\]

Define

\[
\delta_t
=
b_t\log_6\left(1+\frac{1}{3n_t}\right).
\tag{10}
\]

## Proposition 3: phase evolution

One has

\[
\log_6 n_{t+1}-\log_6 n_t
=
-\beta+b_t+\delta_t
\tag{11}
\]

and

\[
\boxed{\theta_{t+1}
=
\theta_t+h_t-\beta+\delta_t.}
\tag{12}
\]

Consequently,

\[
\boxed{
H_t
=
\beta t+\theta_t-\theta_0-\Delta_t,
}
\qquad
\Delta_t=\sum_{k=0}^{t-1}\delta_k,
\tag{13}
\]

and

\[
\boxed{
\ell_t
=
\ell_0+B_t-\beta t-\theta_t+\theta_0+\Delta_t.
}
\tag{14}
\]

### Proof

If \(n_t\) is even, then \(n_{t+1}=n_t/2\), giving a logarithmic increment \(-\beta\).

If \(n_t\) is odd, then

\[
3n_t+1
=
3n_t\left(1+\frac1{3n_t}\right),
\]

so

\[
\log_6\frac{n_{t+1}}{n_t}
=
\log_6 3+
\log_6\left(1+\frac1{3n_t}\right)
=
1-\beta+\delta_t.
\]

This proves (11). Subtracting the integer length increment \(b_t-h_t\) from (11) gives (12). Summation gives (13), and substitution into (8) gives (14). \(\square\)

If the \(+1\) perturbations were absent, equation (12) would be the irrational rotation

\[
\theta\longmapsto \theta-\beta\pmod1.
\]

Thus the top-cell loss sequence has average density \(\beta\), up to the accumulated positive perturbation \(\Delta_t\).

For a nonperiodic orbit, all \(n_t\) are distinct. Therefore

\[
0\le\Delta_t
\le
\frac{1}{3\log 6}
\sum_{k<t}\frac1{n_k}
\le
\frac{\mathcal H_t}{3\log6},
\tag{15}
\]

where

\[
\mathcal H_t=1+\frac12+\cdots+\frac1t.
\]

Hence

\[
H_t=\beta t+O(\log t)
\tag{16}
\]

on every nonperiodic orbit.

This identifies the exact critical source rate:

\[
\boxed{\text{critical odd-step density}=\log_6 2.}
\]

A divergent orbit would have to inject new terminal cells at essentially the same rate at which the rotation clock deletes leading cells.

---

# 4. A strong necessary condition for a minimal counterexample

Assume \(n_0\) is the least positive integer that does not reach \(1\). Then

\[
n_t\ge n_0
\qquad\text{for all }t,
\tag{17}
\]

because any smaller iterate would converge by minimality.

In particular,

\[
\ell_t\ge\ell_0,
\]

so (8) gives

\[
B_t\ge H_t
\qquad\text{for every }t.
\tag{18}
\]

Moreover,

\[
\Delta_t
\le
\frac{B_t}{3n_0\log6}.
\tag{19}
\]

Combining (13), (18), and \(\theta_t-\theta_0>-1\) yields

\[
B_t
\ge
\beta t-1-\frac{B_t}{3n_0\log6}.
\]

Therefore:

## Corollary 4: pointwise source barrier

Every minimal counterexample would satisfy, for every \(t\ge1\),

\[
\boxed{
B_t
\ge
\frac{\beta t-1}
{1+\dfrac{1}{3n_0\log6}}.
}
\tag{20}
\]

This is a prefix-by-prefix condition, not merely an asymptotic density condition.

Since an odd standard Collatz step is always followed by an even step,

\[
B_t\le \left\lceil\frac t2\right\rceil.
\tag{21}
\]

Thus a minimal counterexample would have to produce an infinite binary source word with no adjacent \(1\)'s whose every prefix lies almost entirely above the line of slope

\[
\beta=0.3868528072\ldots.
\]

This is the exact source/sink barrier seen by the base‑6 particle model.

---

# 5. Fixed-lattice particle waves

There is another useful representation in which the moving low-order boundary becomes an explicit marker.

Let

\[
E_t=t-B_t
\]

be the number of even steps before time \(t\), and put

\[
N_t=6^{E_t}n_t.
\tag{22}
\]

The base‑6 digits of \(N_t\) occupy a fixed lattice, while the least-significant marker sits at coordinate \(E_t\).

## Proposition 5: source-wave equation

The fixed-frame variable satisfies

\[
\boxed{
N_{t+1}=3N_t+b_t6^{E_t}.
}
\tag{23}
\]

Consequently,

\[
\boxed{
N_t
=
3^tn_0+
\sum_{k=0}^{t-1}
b_k\,3^{t-1-k}6^{E_k}.
}
\tag{24}
\]

### Proof

If \(n_t\) is even, then \(E_{t+1}=E_t+1\), and

\[
N_{t+1}
=
6^{E_t+1}\frac{n_t}{2}
=
3N_t.
\]

If \(n_t\) is odd, then \(E_{t+1}=E_t\), and

\[
N_{t+1}
=
6^{E_t}(3n_t+1)
=
3N_t+6^{E_t}.
\]

Iteration gives (24). \(\square\)

Every odd step injects a unit source at the current marker. That source then evolves under multiplication by \(3\), whose carries propagate locally by the reversible gate (3).

Let

\[
\alpha=\log_6 3=1-\beta
\]

and define the marker-front discrepancy

\[
D_t=E_t-\alpha t=\beta t-B_t.
\tag{25}
\]

Dividing (24) by \(6^{E_t}\) gives

\[
\boxed{
n_t
=
6^{-D_t}
\left(
n_0+
\frac13
\sum_{k=0}^{t-1}b_k6^{D_k}
\right).
}
\tag{26}
\]

Moreover,

\[
\boxed{
6^{D_t}
=
\frac{2^{E_t}}{3^{B_t}}.
}
\tag{27}
\]

Thus the scalar marker-front displacement is precisely the usual multiplicative Collatz coefficient:

\[
6^{-D_t}=\frac{3^{B_t}}{2^{E_t}}.
\]

This is an important negative conclusion. At the scalar level, the base‑6 particle model does not create a new drift invariant; it geometrizes the familiar competition between powers of \(2\) and \(3\).

A successful particle proof would therefore have to use correlations in the collision field that are invisible to \(D_t\), not merely its average velocity.

---

# 6. Classification of persistent configurations

The following classification is complete as a dynamical dichotomy, although it does not exclude the second class.

## Theorem 6: cycle-or-expanding-cloud dichotomy

For a finite positive initial configuration, exactly one of the following occurs:

1. the orbit eventually enters a periodic cycle;
2. the orbit is nonperiodic, all iterates are distinct, and
   \[
   n_t\longrightarrow\infty,
   \qquad
   \ell_t\longrightarrow\infty.
   \]

### Proof

If two iterates agree, the deterministic orbit is eventually periodic.

Otherwise all \(n_t\) are distinct. For every fixed \(M\), only finitely many positive integers are at most \(M\). Hence only finitely many \(n_t\) can be at most \(M\). Therefore \(n_t\to\infty\), and consequently \(\ell_t\to\infty\). \(\square\)

Thus a divergent counterexample cannot remain a localized finite particle object. Its occupied interval must grow without bound.

---

# 7. Gliders are cycles

A marked fixed-lattice state consists of

\[
\mathcal X_t=(E_t,\text{the base-6 digit configuration of }N_t).
\]

Let \(\sigma\) denote translation by one base‑6 cell.

## Theorem 7: marked glider theorem

Suppose that for some \(q>0\) and integer \(s\),

\[
\mathcal X_{t+q}=\sigma^s\mathcal X_t.
\tag{28}
\]

Then

\[
n_{t+q}=n_t.
\]

Conversely, every Collatz cycle gives such a marked glider.

### Proof

Translation by \(s\) moves the marker and multiplies the represented fixed-frame integer by \(6^s\). Therefore (28) implies

\[
E_{t+q}=E_t+s,
\qquad
N_{t+q}=6^sN_t.
\]

Hence

\[
n_{t+q}
=
\frac{N_{t+q}}{6^{E_{t+q}}}
=
\frac{6^sN_t}{6^{E_t+s}}
=
n_t.
\]

The converse follows by reversing the calculation. \(\square\)

So a nontrivial marked glider would be a **nontrivial Collatz cycle**, not a divergent trajectory.

There are also no nonzero finite gliders in the source-free bulk.

## Proposition 8: no finite bulk glider

Let \(F_{\times3}\) be the base‑6 multiplication-by-\(3\) automaton. If a nonzero finite configuration \(x\) satisfies

\[
F_{\times3}^{\,q}(x)=\sigma^s x,
\tag{29}
\]

then \(q=s=0\).

### Proof

If \(x\) represents the nonzero rational number \(N\), then (29) implies

\[
3^qN=6^sN,
\]

and hence

\[
3^q=6^s.
\]

Unique factorization forces \(s=0\) from the exponent of \(2\), and then \(q=0\). \(\square\)

Thus a localized carry packet cannot perpetually travel through the empty bulk.

---

# 8. Periodic boundary streams are also cycles

A divergent counterexample cannot hide behind a periodic source schedule.

## Lemma 9: parity itineraries are injective

Two positive integers having the same infinite parity itinerary under \(T\) are equal.

### Proof

Suppose \(x\) and \(y\) follow the same branch word for \(t\) steps. Let \(B_t\) and \(E_t\) be the numbers of odd and even branches in that word. The additive constants cancel when the two affine iterates are subtracted, giving

\[
T^t(x)-T^t(y)
=
\frac{3^{B_t}}{2^{E_t}}(x-y).
\]

The left side is an integer, and \(3^{B_t}\) is odd. Hence

\[
2^{E_t}\mid x-y.
\]

Every odd step is followed by an even step, so \(E_t\to\infty\). Therefore \(x-y\) is divisible by every power of \(2\), and hence \(x=y\). \(\square\)

## Corollary 10

If the parity/source sequence \(b_t\) is eventually periodic, then the numerical orbit is eventually periodic.

### Proof

Suppose the parity sequence is periodic with period \(q\) after time \(r\). Then \(T^r(n)\) and \(T^{r+q}(n)\) have the same infinite parity itinerary. Lemma 9 gives

\[
T^r(n)=T^{r+q}(n).
\]

\(\square\)

Therefore a divergent counterexample must have an aperiodic boundary trace.

For a genuine cycle of period \(q\), equation (24) gives the base‑6 glider equation

\[
\boxed{
(6^E-3^q)n
=
\sum_{k=0}^{q-1}
b_k3^{q-1-k}6^{E_k},
}
\tag{30}
\]

where \(E\) is the number of even steps in the period. The right side is positive, so

\[
6^E>3^q.
\tag{31}
\]

If \(B=q-E\) is the number of odd steps, this is equivalent to

\[
2^E>3^B,
\]

and hence

\[
\boxed{\frac{B}{q}<\log_6 2.}
\tag{32}
\]

Thus the particle system separates the two counterexample mechanisms sharply:

- a periodic glider/cycle has source density strictly **below** \(\beta\);
- a minimal divergent counterexample must have source density essentially **at least** \(\beta\) in every prefix.

---

# 9. Why elementary particle Lyapunov functions fail

The bulk collision is not dissipative.

For example,

\[
(0,1)\longmapsto(1,1)
\]

increases the naive particle number \(c+p\) from \(1\) to \(2\), while

\[
(2,0)\longmapsto(1,0)
\]

decreases it from \(2\) to \(1\).

More generally, there is no nonconstant one-cell additive bulk energy.

## Proposition 11: no one-cell additive bulk Lyapunov function

Let \(v:\{0,1,2,3,4,5\}\to\mathbb R\), and on a periodic ring define

\[
V(x)=\sum_jv(x_j).
\]

If \(V\) is nonincreasing under every bulk update, then \(v\) is constant.

### Proof

The bulk map on a finite ring is reversible. Every orbit on that finite state space is periodic. A quantity that is nonincreasing along a periodic orbit must therefore be constant at every step.

On a ring of length \(1\), the collision permutation (5) implies

\[
v(1)=v(3)=v(4)=v(2).
\tag{33}
\]

On a ring of length \(2\), the configuration with encoded states \((0,3)\) updates to \((1,3)\), so

\[
v(0)+v(3)=v(1)+v(3),
\]

and hence \(v(0)=v(1)\).

Similarly, \((2,5)\) updates to \((2,4)\), giving \(v(5)=v(4)\). Together with (33), all six values are equal. \(\square\)

Consequently, no proof can come from assigning a positive mass to each local particle type and showing that interior collisions consume mass. The bulk is information-preserving.

This is consistent with the known symbolic dynamics. Kari proved that the related reversible base‑6 multiplication automata are extremely pattern-rich: the orbit of every nonuniform finite configuration contains every finite word over the digit alphabet. citeturn865898view2 Related fractional-multiplication trace systems are nonsofic, and finite-configuration traces need not become eventually periodic. citeturn865898view3turn865898view4

Therefore a finite catalogue of local gliders, defects, and forbidden collision blocks cannot by itself establish convergence.

---

# 10. The exact missing theorem

The particle formulation isolates one statement whose proof would finish Collatz.

## Boundary Overtaking Theorem

For every \(n\) with at least two base‑6 digits, there exists \(t\ge1\) such that

\[
\boxed{H_t>B_t.}
\tag{34}
\]

By (8), this is equivalent to

\[
\ell(T^t(n))<\ell(n).
\tag{35}
\]

## Theorem 12: boundary overtaking is equivalent to Collatz

The following are equivalent:

1. every positive integer reaches \(1\);
2. every finite base‑6 particle configuration reaches the \(1\to4\to2\to1\) oscillator;
3. the Boundary Overtaking Theorem holds.

### Proof

The equivalence of (1) and (2) follows from the exact simulation.

Assume (1). If \(\ell(n)\ge2\), the orbit eventually reaches \(1\), whose base‑6 length is \(1\). Hence (35) holds.

Conversely, suppose (3). The integers \(1,2,3,4,5\) are checked directly. Let \(n\ge6\), and assume by strong induction that every positive integer below \(n\) reaches \(1\). By (35), there is \(t\) such that

\[
\ell(T^t(n))<\ell(n).
\]

Since

\[
6^{\ell(n)-1}\le n
\]

and any integer of smaller base‑6 length is less than \(6^{\ell(n)-1}\), one has

\[
T^t(n)<n.
\]

The induction hypothesis now implies that \(T^t(n)\), and hence \(n\), reaches \(1\). \(\square\)

So the desired extinction proof has been reduced to a particularly concrete queue statement:

> In every finite reversible carry cloud, the high-order sink must eventually remove strictly more cells than the low-order boundary has injected.

The results above show exactly what a counterexample to that statement would have to look like. It would be an infinite binary source word \(b_0b_1\ldots\) such that

\[
b_tb_{t+1}=0,
\]

\[
B_t\ge H_t
\quad\text{for every }t,
\]

\[
n_t
=
6^{-D_t}
\left(
n_0+\frac13\sum_{k<t}b_k6^{D_k}
\right)
\in\mathbb N,
\]

\[
n_t\equiv b_t\pmod2,
\]

with \(b_t\) non-eventually-periodic and \(\ell_t\to\infty\).

I do not have a valid argument excluding all such aperiodic expanding configurations. Average source density, the absence of localized gliders, reversibility, and the scalar front displacement \(D_t\) do not exclude them. Claiming otherwise would leave precisely the divergence part of Collatz unproved.

The base‑6 programme therefore produces a rigorous and useful reduction, but not a completed proof: **nontrivial gliders reduce to cycles, while the real unresolved object is an aperiodic critical source-sink cloud.**