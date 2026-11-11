model: GPT-5.6 Pro (Chat mode)
round: 77 -- approach 72, Use the Collatz autoconjugacy to pair hard and easy paths
front: proof
sent: 2026-08-16T19:40Z
worked: 105m 9s

---

# Autoconjugacy attack: complete derivation and exact obstruction

I worked the proposed pairing argument through both possible failure modes of Collatz: divergent trajectories and nontrivial cycles. It gives several exact theorems, including a complete classification of when both paired paths are ordinary integers. However, it does **not** yield a full proof of Collatz. The forced-descent partner escapes the ordinary integer lattice into an irrational 2-adic point in precisely the case where the argument would need it to remain arithmetically accessible.

This is not merely a technical loose end. Below I isolate the exact realizability statement that remains unproved and show why silently assuming it would make the argument circular. Current literature still treats Collatz as open; a May 2026 paper continues to formulate it as a conjecture, and a November 2025 Journal of Integer Sequences article explicitly calls it open. citeturn174081view5turn227495view7

---

## 1. The autoconjugacy and its complementary drift

Use the shortcut Collatz map

\[
T(x)=
\begin{cases}
x/2,&x\equiv0\pmod2,\\[2mm]
(3x+1)/2,&x\equiv1\pmod2.
\end{cases}
\]

For \(x\in\mathbb Z_2\), let

\[
\varepsilon_k(x)=T^k(x)\pmod2,
\qquad
Q(x)=\sum_{k\ge0}\varepsilon_k(x)2^k.
\]

The parity map \(Q:\mathbb Z_2\to\mathbb Z_2\) is a bijection and conjugates \(T\) to the binary shift. Let \(\Phi=Q^{-1}\), and let

\[
V(u)=-1-u,
\]

which complements every binary digit. The nontrivial Collatz autoconjugacy is

\[
\Omega=\Phi\circ V\circ Q.
\]

It satisfies

\[
\Omega^2=\operatorname{id},
\qquad
\Omega T=T\Omega,
\qquad
\varepsilon_k(\Omega x)=1-\varepsilon_k(x).
\]

These are the standard defining properties of the unique nontrivial autoconjugacy. citeturn174081view0turn615785search2

Write

\[
s_k(x)=\sum_{i=0}^{k-1}\varepsilon_i(x),
\qquad
q_k(x)=\frac{3^{s_k(x)}}{2^k}.
\]

If \(y=\Omega(x)\), then

\[
s_k(y)=k-s_k(x).
\]

Consequently,

\[
\boxed{\quad q_k(x)q_k(y)=\left(\frac34\right)^k.\quad}
\tag{1}
\]

This is the exact hard/easy pairing identity.

In particular, if

\[
q_j(x)\ge1\qquad(1\le j\le k),
\]

then

\[
q_j(y)\le \left(\frac34\right)^j.
\tag{2}
\]

So the autoconjugate path really does have strongly forced affine descent.

The problem is not the drift estimate. The problem is the domain in which that descending path lives.

---

# 2. Both paths cannot be positive integers, except \(1\leftrightarrow2\)

Here is the strongest possible simultaneous-integer theorem.

## Theorem 1 — Integer-pair classification

Let \(x,y\in\mathbb Z\) have complementary parity sequences:

\[
\varepsilon_k(y)=1-\varepsilon_k(x)
\qquad\text{for every }k\ge0.
\]

Suppose \(x>0\). Then \(y\) is an ordinary integer only in the following case:

\[
\{x,y\}=\{1,2\}.
\]

Equivalently,

\[
\boxed{\quad n\in\mathbb Z_{>0},\ \Omega(n)\in\mathbb Z
       \quad\Longrightarrow\quad n\in\{1,2\}.\quad}
\tag{3}
\]

### Proof: positive partner

Set

\[
x_i=T^i(x),\qquad y_i=T^i(y).
\]

Assume first that \(y>0\). At every time \(i\), exactly one of \(x_i,y_i\) is odd. Call the odd member \(u_i\), and the even member \(v_i\). Then

\[
u_{i+1}=\frac{3u_i+1}{2},
\qquad
v_{i+1}=\frac{v_i}{2},
\]

up to interchanging the two coordinates. Therefore

\[
x_{i+1}y_{i+1}
=
x_i y_i
\frac{3u_i+1}{4u_i}
=
x_i y_i
\left(\frac34+\frac{1}{4u_i}\right).
\tag{4}
\]

Because \(u_i\) is a positive odd integer,

\[
\frac34+\frac{1}{4u_i}\le1,
\]

with equality exactly when \(u_i=1\).

Thus \(x_i y_i\) is a nonincreasing sequence of positive integers. It can strictly decrease only finitely many times. Hence, from some time onward, the odd member must always equal \(1\).

If the pair is \((1,v)\), then after one step it is

\[
(2,v/2).
\]

For the next odd member also to equal \(1\), one needs \(v/2=1\), so \(v=2\). Thus the pair has entered

\[
(1,2)\longleftrightarrow(2,1).
\]

There are no other complementary positive-integer preimages of this pair:

\[
T^{-1}(1)\cap\mathbb Z_{>0}=\{2\},
\]

while the preimages of \(2\) are \(1\) and \(4\), and only \(1\) has parity complementary to \(2\). Hence the original pair was already on the \(1\leftrightarrow2\) cycle.

### Proof: negative partner

Now suppose \(y<0\). Negative integers remain negative under \(T\). Put

\[
P_i=x_i|y_i|.
\]

If \(x_i\) is odd and \(y_i\) is even, then

\[
\frac{P_{i+1}}{P_i}
=
\frac{3x_i+1}{4x_i}\le1,
\]

with equality only at \(x_i=1\).

If \(x_i\) is even and \(y_i=-c_i\) is odd, where \(c_i\ge1\), then

\[
T(y_i)=-\frac{3c_i-1}{2}
\]

and therefore

\[
\frac{P_{i+1}}{P_i}
=
\frac{3c_i-1}{4c_i}
<
\frac34.
\tag{5}
\]

So \(P_i\) strictly decreases at least once every two steps: even if \(x_i=1\), the next value is \(2\), producing the strict second case. This is impossible for a positive-integer sequence \(P_i\).

Finally, \(\Omega(x)=0\) would imply \(x=\Omega(0)=-1\), since \(\Omega\) is an involution. Therefore \(y=0\) is also impossible for positive \(x\).

This proves the theorem. ∎

---

## Meaning of Theorem 1

The suggested contradiction

> “a hard positive-integer path is paired with an easy positive-integer path”

does work—but only conditionally on the partner being an ordinary integer. In fact, it works so decisively that the only such pair is the trivial cycle.

Thus every nontrivial \(n>2\) satisfies

\[
\Omega(n)\notin\mathbb Z.
\]

The autoconjugate does not provide another positive-integer trajectory to which ordinary descent arguments can be applied.

---

# 3. Rational partners: an exact criterion

Perhaps ordinary integrality is too strong. One might hope it is enough that \(\Omega(n)\) be a rational 2-adic.

Let

\[
\mathbb Q_{\mathrm{odd}}
=
\left\{\frac ab:a,b\in\mathbb Z,\ b\text{ odd}\right\}
\subset\mathbb Z_2.
\]

These are exactly the 2-adic numbers with eventually periodic binary expansions.

## Theorem 2 — Pointwise rationality criterion

For every positive integer \(n\),

\[
\boxed{\quad
\Omega(n)\in\mathbb Q_{\mathrm{odd}}
\quad\Longleftrightarrow\quad
\{T^k(n)\}_{k\ge0}\text{ is eventually periodic}.
\quad}
\tag{6}
\]

### Proof of the nontrivial direction

Assume

\[
\Omega(n)=\frac{a_0}{b},
\]

where \(b>0\) is odd. Keep the same denominator \(b\) throughout the orbit and write

\[
T^i(\Omega(n))=\frac{a_i}{b},
\qquad a_i\in\mathbb Z.
\]

Let \(x_i=T^i(n)\). Their parities are complementary.

If \(x_i\) is odd, then \(a_i\) is even, and

\[
x_{i+1}=\frac{3x_i+1}{2},
\qquad
a_{i+1}=\frac{a_i}{2}.
\tag{7}
\]

If \(x_i\) is even, then \(a_i\) is odd, and

\[
x_{i+1}=\frac{x_i}{2},
\qquad
a_{i+1}=\frac{3a_i+b}{2}.
\tag{8}
\]

Assume \(a_i\ne0\), and define the positive integer

\[
P_i=x_i|a_i|.
\]

In the first case,

\[
P_{i+1}
=
P_i\frac{3x_i+1}{4x_i}
\le P_i.
\tag{9}
\]

In the second case,

\[
P_{i+1}
=
P_i\frac{|3a_i+b|}{4|a_i|}.
\tag{10}
\]

Whenever \(|a_i|\ge b\),

\[
|3a_i+b|\le4|a_i|,
\]

so once again \(P_{i+1}\le P_i\).

Consequently \(P_i\) can increase only when

\[
0<|a_i|<b.
\tag{11}
\]

There are only finitely many possible integers in this danger set.

There are now two cases.

### Case A: the danger set is visited only finitely many times

Eventually \(P_i\) is nonincreasing. Hence \(P_i\) is bounded, and because \(|a_i|\ge1\),

\[
x_i\le P_i.
\]

The positive-integer trajectory \(x_i\) is bounded and therefore eventually repeats.

### Case B: the danger set is visited infinitely many times

Some numerator \(a\) repeats. But the map

\[
a\longmapsto
\begin{cases}
a/2,&a\text{ even},\\
(3a+b)/2,&a\text{ odd}
\end{cases}
\]

is deterministic. Thus the rational orbit \(a_i/b\) is eventually periodic. Its parity sequence is eventually periodic, so the complementary parity sequence of \(x_i\) is eventually periodic. Since the parity map \(Q\) is injective, \(x_i\) itself is eventually periodic.

If some \(a_i=0\), then the rational orbit is thereafter \(0\), whose parity sequence is all zeros. The complementary parity sequence is all ones, corresponding uniquely to the 2-adic fixed point \(-1\), not to a positive integer. Thus this case cannot occur.

This proves

\[
\Omega(n)\in\mathbb Q_{\mathrm{odd}}
\Longrightarrow
n\text{ eventually periodic}.
\]

Conversely, if the orbit of \(n\) is eventually periodic, its parity sequence and its complement are eventually periodic. The unique 2-adic point represented by that complementary sequence is rational. The parity bijection and the relation between rational parity vectors and eventual periodicity are standard consequences of the conjugacy \(Q\). citeturn174081view3turn174081view4

∎

---

## Consequence

For a divergent positive-integer orbit,

\[
\boxed{\quad \Omega(n)\in\mathbb Z_2\setminus\mathbb Q_{\mathrm{odd}}.\quad}
\tag{12}
\]

So even rational realizability is unavailable precisely in the divergent case.

This sharpens the usual global statement that

\[
\Omega(\mathbb Z_{>0})\subseteq\mathbb Q_{\mathrm{odd}}
\]

would imply that every positive-integer orbit is eventually periodic. citeturn174081view0

---

# 4. What happens to a genuinely high-growth path?

Suppose

\[
q_k(n)=\frac{3^{s_k(n)}}{2^k}\ge1
\qquad\text{for every }k.
\tag{13}
\]

For \(y=\Omega(n)\), identity (1) gives

\[
q_k(y)\le\left(\frac34\right)^k.
\tag{14}
\]

Moreover, \(y\) must be irrational in \(\mathbb Z_2\). Indeed, if \(y\) were rational, Theorem 2 would make \(n\) eventually periodic. But if an integer trajectory eventually enters a cycle of length \(p\) containing \(s\) odd steps, its cycle equation is

\[
x=\frac{3^s x+C}{2^p},
\qquad C>0,
\]

so

\[
\frac{3^s}{2^p}<1.
\tag{15}
\]

Repeating the period would force \(q_k(n)\) eventually below \(1\), contradicting (13).

Therefore

\[
\boxed{
q_k(n)\ge1\ \forall k
\quad\Longrightarrow\quad
\begin{cases}
q_k(\Omega n)\le(3/4)^k,\\
\Omega(n)\text{ is irrational in }\mathbb Z_2.
\end{cases}}
\tag{16}
\]

The hard path is paired with an exponentially easy path, but that easy path exists only as an irrational 2-adic trajectory.

---

## More generally: any divergent counterexample

Suppose \(n\) has a nonperiodic Collatz orbit. Since an injective sequence of positive integers eventually leaves every finite set, necessarily

\[
T^k(n)\longrightarrow\infty.
\]

Write \(x_i=T^i(n)\). The exact multiplicative identity is

\[
\log x_k-\log n
=
s_k\log3-k\log2
+
\sum_{\substack{0\le i<k\\x_i\text{ odd}}}
\log\left(1+\frac1{3x_i}\right).
\tag{17}
\]

Because \(x_i\to\infty\), the final sum is \(o(k)\). Since \(\log x_k\ge0\) eventually,

\[
\liminf_{k\to\infty}\frac{s_k}{k}
\ge
\alpha,
\qquad
\alpha=\frac{\log2}{\log3}.
\tag{18}
\]

For the autoconjugate \(y\),

\[
\frac{s_k(y)}k
=
1-\frac{s_k(n)}k,
\]

so

\[
\limsup_{k\to\infty}\frac{s_k(y)}k
\le
1-\alpha.
\]

It follows that

\[
\begin{aligned}
\limsup_{k\to\infty}q_k(y)^{1/k}
&\le
\frac{3^{\,1-\alpha}}2\\
&=
\frac{3/2}{2}\\
&=
\frac34.
\end{aligned}
\tag{19}
\]

Thus every divergent integer path would be paired with a path whose affine multiplier decays at an asymptotic exponential rate no larger than \(3/4\).

Again, Theorem 2 says this partner must be irrational.

---

# 5. How the partner escapes: finite integer shadows

Although \(\Omega(n)\) is generally not an ordinary integer, each finite segment of its parity path is realized by an integer.

Let \(m_k\) be the unique integer

\[
0\le m_k<2^k,
\qquad
m_k\equiv\Omega(n)\pmod{2^k}.
\]

Thus \(m_k\) follows the complemented parity word for its first \(k\) steps.

Let that word contain \(t_k=k-s_k(n)\) odd steps. For a fixed parity word \(v\) of length \(k\), there is an affine identity

\[
2^kT^k(r)=3^{t_k}r+C_v
\tag{20}
\]

for every \(r\) having that prefix.

Set

\[
z_k=T^k(m_k).
\]

The integer \(m_k-2^k\) has the same first \(k\) parity bits, so

\[
T^k(m_k-2^k)=z_k-3^{t_k}.
\]

The first starting value is nonnegative and the second is negative. Both signs are preserved under \(T\). Hence

\[
\boxed{\quad 0\le z_k<3^{t_k}.\quad}
\tag{21}
\]

Equivalently, \(z_k\) is the distinguished residue satisfying

\[
2^k z_k\equiv C_v\pmod{3^{t_k}},
\qquad
0\le z_k<3^{t_k}.
\tag{22}
\]

This is exactly a 3-adic endpoint-carry condition.

When the prefix is extended by one digit,

\[
m_{k+1}=m_k+\delta_k2^k,
\qquad
\delta_k\in\{0,1\},
\tag{23}
\]

and adding the new top bit shifts the time-\(k\) endpoint by

\[
T^k(m_{k+1})
=
z_k+\delta_k3^{t_k}.
\tag{24}
\]

Thus the easy path avoids becoming one fixed nonnegative integer by repeated **top-bit injections**. Each injection changes the starting integer by \(2^k\) and the corresponding endpoint by \(3^{t_k}\).

If the injections eventually stopped, then \(m_k\) would stabilize to an ordinary nonnegative integer with the full complemented parity sequence. By Theorem 1, that could happen only for \(n=1\) or \(2\).

Therefore every nontrivial positive integer has an autoconjugate whose finite integer shadows require infinitely many such corrections.

---

# 6. Why the product contraction does not bound those shadows

Suppose \(n\) is a least positive counterexample. Then

\[
x_i=T^i(n)\ge n
\qquad\text{for every }i.
\]

Let

\[
r_n=\frac{3n+1}{4n}.
\]

For the positive shadow \(m_k\), whenever \(x_i\) is odd the paired product contracts by at most \(r_n\), while on the other steps it does not increase. Hence, when \(m_k>0\),

\[
m_k\ge r_n^{-s_k}.
\tag{25}
\]

Apply the same argument to the negative representative \(m_k-2^k\). Whenever the complemented path is odd and negative, the magnitude-product factor is strictly below \(3/4\). This gives

\[
2^k-m_k
\ge
r_n^{-s_k}\left(\frac43\right)^{t_k}.
\tag{26}
\]

Consequently,

\[
2^k
\ge
r_n^{-s_k}
\left[
1+\left(\frac43\right)^{t_k}
\right].
\tag{27}
\]

This looks promising but leaves too much room. Since

\[
r_n>\frac34,
\]

both lower bounds grow no faster than approximately \((4/3)^k\), whereas the available interval has length \(2^k\). The exponential slack is roughly

\[
\left(\frac32\right)^k.
\]

Thus the paired-product Lyapunov argument proves that the finite shadows must escape, but it does not make them escape faster than the available \(2^k\)-sized residue interval.

---

# 7. The Archimedean partner goes in the wrong direction

Let

\[
e_0<e_1<e_2<\cdots
\]

be the positions at which \(n\)'s trajectory is even. These are the one-positions in the parity sequence of \(\Omega(n)\). Bernstein’s inverse formula gives the 2-adically convergent expansion

\[
\Omega(n)
=
-\sum_{j\ge0}\frac{2^{e_j}}{3^{j+1}}.
\tag{28}
\]

The inverse formula and the fact that every infinite parity sequence represents a unique 2-adic integer are standard. citeturn174081view0turn174081view3

Under the uniformly hard condition \(q_k(n)\ge1\), put

\[
\beta=1-\frac{\log2}{\log3}.
\]

Then the number of even iterates among the first \(k\) steps is at most \(\beta k\). Since \(e_j\) is the position of the \((j+1)\)-st even iterate,

\[
j+1\le\beta(e_j+1).
\]

Therefore

\[
\begin{aligned}
\frac{2^{e_j}}{3^{j+1}}
&\ge
\frac{2^{e_j}}{3^{\beta(e_j+1)}}\\
&=
3^{-\beta}
\left(\frac{2}{3^\beta}\right)^{e_j}\\
&=
3^{-\beta}
\left(\frac43\right)^{e_j}.
\end{aligned}
\tag{29}
\]

So the terms do not even tend to zero in the real metric. The real partial sums satisfy

\[
-\sum_{j<J}\frac{2^{e_j}}{3^{j+1}}
\longrightarrow-\infty.
\tag{30}
\]

Thus the “easy” autoconjugate has:

- excellent multiplicative descent;
- legitimate 2-adic convergence;
- catastrophic Archimedean behavior.

Edgington’s real-convergence theorem for autoconjugacy truncations applies when the relevant density of even iterates is greater than \(\log2/\log3\). The hard-path complement lies in the opposite sparse-density regime. citeturn174081view2

---

# 8. Why the involution \(\Omega^2=1\) does not repair this

One might try:

1. \(y=\Omega(n)\) is easy;
2. apply \(\Omega\) again;
3. obtain \(n=\Omega(y)>0\);
4. derive a contradiction from the real descent of \(y\).

There is an exact formula showing why this interchange fails.

Let \(Q_k(z)\) denote the first \(k\) parity bits, and define the canonical rational truncation

\[
\Omega_k(z)=\Phi\!\left(-1-Q_k(z)\right).
\]

These truncations converge 2-adically to \(\Omega(z)\). citeturn174081view2

Let

\[
x_k=T^k(n),\qquad
q_k=\frac{3^{s_k}}{2^k},\qquad
h_k=\frac{x_k}{q_k}.
\]

For \(y=\Omega(n)\), the parity sequence used to construct \(\Omega_k(y)\) consists of the first \(k\) parity bits of \(n\), followed by all ones. Therefore

\[
T^k(\Omega_k(y))=-1.
\]

For the first \(k\) parity bits of \(n\), write

\[
2^kT^k(z)=3^{s_k}z+C_k.
\]

Apply this once to \(z=n\) and once to \(z=\Omega_k(y)\):

\[
2^kx_k=3^{s_k}n+C_k,
\]

\[
-2^k=3^{s_k}\Omega_k(y)+C_k.
\]

Subtracting gives

\[
\boxed{\quad
\Omega_k(\Omega(n))
=
n-\frac{x_k+1}{q_k}
=
n-h_k-\frac1{q_k}.
\quad}
\tag{31}
\]

Since \(h_k\ge n\),

\[
\Omega_k(\Omega(n))<0
\qquad\text{for every }k.
\tag{32}
\]

Nevertheless,

\[
\Omega_k(\Omega(n))
\longrightarrow n
\]

in the 2-adic metric.

So a sequence of negative rational numbers converges 2-adically to the positive integer \(n\). There is no contradiction: the Archimedean and 2-adic limits are different.

Equation (31) identifies the discrepancy exactly. It is the normalized carry height

\[
h_k+\frac1{q_k}.
\]

Whenever \(q_k\to\infty\) and \(h_k\to H\), the real limit is

\[
n-H\le0,
\]

not \(n\). Thus even the involutive structure does not eliminate the carry term.

---

# 9. What the pairing says about hypothetical cycles

Suppose \(x_0,\ldots,x_{p-1}\) is a positive-integer cycle, with \(s\) odd members.

The product of the stepwise ratios is \(1\). Each odd step has ratio

\[
\frac{3x+1}{2x}\le2,
\]

and each even step has ratio \(1/2\). Therefore

\[
1\le 2^s2^{-(p-s)}=2^{2s-p},
\]

so

\[
s\ge\frac p2.
\tag{33}
\]

The complemented cycle has \(t=p-s\le p/2\) odd steps. Its periodic point has the form

\[
y=\frac{C_{\bar w}}{2^p-3^t},
\qquad C_{\bar w}>0.
\tag{34}
\]

Since

\[
3^t\le3^{p/2}<2^p,
\]

the denominator is positive. Hence:

\[
\boxed{\text{Every positive-integer cycle is paired by }\Omega
       \text{ with a positive rational cycle.}}
\tag{35}
\]

But the rational partner need not be integral.

Moreover, a nontrivial integer cycle forces the rational partner to dip below \(1\). Indeed, if every partner value \(y_i\ge1\), then at each paired step the odd member \(u_i\) satisfies \(u_i\ge1\), and

\[
\frac{x_{i+1}y_{i+1}}{x_i y_i}
=
\frac34+\frac{1}{4u_i}
\le1.
\]

Over a cycle the product must return to its original value, so equality must hold at every step. Thus every odd member equals \(1\), which gives only the \(1\leftrightarrow2\) cycle.

Therefore any hypothetical nontrivial positive cycle must have

\[
0<T^j(\Omega(x))<1
\tag{36}
\]

at some step where the rational partner is odd.

Monks and Yazinski proved that the only **self-conjugate** integer cycle is \(\{1,2\}\). But a hypothetical nontrivial integer cycle need not be self-conjugate: it can be paired with a distinct positive rational cycle containing values below \(1\). citeturn801008search0turn790528search4

This is why the known self-conjugacy theorem does not exclude all integer cycles.

---

# 10. The resulting proof skeleton

The approach produces the following rigorous skeleton.

### Completed: symbolic pairing

\[
Q(\Omega n)=-1-Q(n),
\qquad
\Omega T=T\Omega.
\]

### Completed: complementary drift

\[
q_k(n)q_k(\Omega n)=\left(\frac34\right)^k.
\]

### Completed: simultaneous integer exclusion

\[
n>0,\ \Omega(n)\in\mathbb Z
\quad\Longrightarrow\quad
n\in\{1,2\}.
\]

### Completed: rationality criterion

\[
\Omega(n)\in\mathbb Q_{\mathrm{odd}}
\quad\Longleftrightarrow\quad
n\text{ is eventually periodic}.
\]

### Completed: divergent-path diagnosis

A divergent integer trajectory is paired with an exponentially descending but irrational 2-adic trajectory.

### Completed: cycle diagnosis

A nontrivial positive-integer cycle would be paired with a distinct positive rational cycle that necessarily dips below \(1\).

### Missing divergence bridge

One would need to prove that the low-drift autoconjugate of a divergent integer-realizable path is rational:

\[
n\in\mathbb Z_{>0},\quad T^k(n)\to\infty
\quad\Longrightarrow\quad
\Omega(n)\in\mathbb Q_{\mathrm{odd}}.
\tag{37}
\]

But by Theorem 2, (37) immediately says that \(n\) is eventually periodic. Thus it is already equivalent to excluding divergent positive-integer orbits. Drift alone does not prove it.

In finite-prefix language, the required new theorem would be:

> If the residues \(m_k\) and endpoints \(z_k\) satisfy the exact complement-carry recursion  
> \[
> 0\le z_k<3^{t_k},
> \qquad
> m_{k+1}=m_k+\delta_k2^k,
> \]
> and arise as complements of one fixed positive-integer path having divergent density, then the top-bit sequence \((\delta_k)\) is eventually periodic.

Eventual periodicity of \((\delta_k)\) is exactly rationality of \(\Omega(n)\).

### Missing cycle bridge

For a cyclic parity word \(w\), write

\[
x=\frac{C_w}{2^p-3^s},
\qquad
y=\frac{C_{\bar w}}{2^p-3^{p-s}}.
\]

A sufficient arithmetic lemma would be:

\[
2^p-3^s\mid C_w,\quad x>0
\quad\Longrightarrow\quad
T^j(y)\ge1\ \text{for every }j.
\tag{38}
\]

Then the product argument would force the trivial cycle. But (38) has not been established; a hypothetical nontrivial cycle would violate it by producing a complementary rational value in \((0,1)\).

---

# Verdict

Approach 72 does not presently furnish a complete proof of Collatz.

It does prove the following strong and exact statement:

\[
\boxed{
\begin{minipage}{0.87\linewidth}
A hard positive-integer path is paired with a path having exponentially forced affine descent.  
Both paths can be ordinary integers only for \(1\leftrightarrow2\).  
If the original path is divergent, its descending partner is necessarily an irrational 2-adic, maintained by infinitely many top-bit/carry injections.
\end{minipage}}
\]

Thus the autoconjugacy does not eliminate the exceptional path; it transports the central difficulty from **drift** to **integer-image characterization**. The remaining divergence problem is to prove that the top-bit injections cannot persist aperiodically under the simultaneous 2-adic seed and 3-adic endpoint constraints. That is precisely where the terminal-suffix locality and carry machinery from the preceding rounds would have to enter.