model: GPT-5 Pro
round: 6 -- approach 1, Adelic two-ended renormalization of valuation words
front: proof
sent: 2026-08-13T17:07Z
worked: 102m 49s
finished: 2026-08-13T18:50:21Z (sent + worked)

---

# Verdict

I pushed the proposed adelic program to an exact renormalization theorem, but it does **not** currently produce a valid full proof of Collatz. Two things happen:

1. The hoped-for statement that “all nontrivial recurrent states disappear as the precision tends to infinity” is false unless one inserts an **ordinary-integer lift condition**. There are abundant nontrivial recurrent states in  
   \[
   \mathbb R_{>0}\cap\mathbb Z_2\cap\mathbb Z_3
   \]
   that satisfy every finite \(2\)-adic, \(3\)-adic, and archimedean compatibility test but are rational rather than positive integers.

2. Once the integer-lift condition is imposed, the \(2\)-adic and normalized \(3\)-adic coordinates of **every ordinary orbit**—convergent or hypothetically divergent—eventually collapse to zero. The remaining branch is an arbitrarily long zero-carry ordinary orbit segment. Excluding that branch is a stopping-time theorem closely related to the still-unproved coefficient stopping-time conjecture.

The closest recent paper I found is Oliver Kramer’s July 2026 preprint, which already combines real drift, a \(2\)-adic starting representative, and a \(3\)-adic endpoint representative. It proves necessary vanishing conditions for genuine integer orbits and explicitly says the construction is not a verification method. citeturn593659view0 The exact valuation-cylinder construction below sharpens its starting modulus from \(2^{A_k}\), which records divisibility, to \(2^{A_k+1}\), which records the **exact** final valuation.

What follows is the exact mathematics obtained from the approach, including the strongest reduction I could prove.

---

## 1. Exact valuation cylinders

Let

\[
U(x)=\frac{3x+1}{2^{\nu_2(3x+1)}}
\]

act on positive odd integers. For a finite valuation word

\[
w=(a_1,\ldots,a_k),\qquad a_i\geq 1,
\]

write

\[
A_0=0,\qquad A_i=\sum_{j=1}^{i}a_j,
\]

and define

\[
C_0=0,\qquad C_i=3C_{i-1}+2^{A_{i-1}}.
\]

Equivalently,

\[
C_i=\sum_{j=0}^{i-1}3^{i-1-j}2^{A_j}.
\]

Repeated substitution gives the affine identity

\[
2^{A_i}U^i(n)=3^i n+C_i.
\tag{1}
\]

Finite parity or valuation words determining residue cylinders is standard in the \(2\)-adic formulation of Collatz. citeturn593659view1 The following exact version is what the renormalization needs.

### Exact cylinder theorem

Define \(R_w\) to be the unique integer satisfying

\[
1\leq R_w<2^{A_k+1}
\]

and

\[
3^kR_w+C_k\equiv 2^{A_k}\pmod{2^{A_k+1}}.
\tag{2}
\]

Equivalently,

\[
R_w\equiv
3^{-k}\bigl(2^{A_k}-C_k\bigr)
\pmod{2^{A_k+1}}.
\tag{3}
\]

Then the positive odd integers having **exactly** the first \(k\) valuations \(a_1,\ldots,a_k\) are

\[
n=R_w+2^{A_k+1}t,\qquad t\geq0.
\tag{4}
\]

If

\[
M_w:=\frac{3^kR_w+C_k}{2^{A_k}},
\tag{5}
\]

then \(M_w\) is odd,

\[
1\leq M_w<2\cdot 3^k,
\tag{6}
\]

and the corresponding endpoint is

\[
U^k(n)=M_w+2\cdot3^k t.
\tag{7}
\]

Thus every word determines an exact two-ended arithmetic progression

\[
\boxed{
(n,U^k(n))
=
\bigl(R_w+2^{A_k+1}t,\;
      M_w+2\cdot3^k t\bigr).
}
\tag{8}
\]

### Why the extra factor \(2\) is necessary

A congruence modulo \(2^{A_k}\) forces

\[
2^{A_k}\mid3^kn+C_k,
\]

but it does not force the quotient to be odd. Exact valuation requires

\[
3^kn+C_k\equiv2^{A_k}\pmod{2^{A_k+1}}.
\]

For example, the one-letter word \(w=(1)\) is realized exactly by

\[
n\equiv3\pmod4,
\]

not by every odd number modulo \(2\).

### Proof of exactness

Put

\[
N_i=3^in+C_i.
\]

For \(i<k\),

\[
N_k
=
3^{k-i}N_i+
\sum_{j=i}^{k-1}3^{k-1-j}2^{A_j}.
\tag{9}
\]

The congruence (2) implies \(2^{A_k}\mid N_k\). Reducing (9) modulo \(2^{A_i}\) shows that \(2^{A_i}\mid N_i\).

Divide (9) by \(2^{A_i}\) and reduce modulo \(2\). Because \(A_j>A_i\) for \(j>i\), only the term \(j=i\) survives from the sum. Since \(N_k/2^{A_i}\) is even,

\[
0\equiv
\frac{N_i}{2^{A_i}}+1\pmod2.
\]

Therefore \(N_i/2^{A_i}\) is odd. Hence every prescribed valuation is exact.

Conversely, an exact realization has \(N_k/2^{A_k}\) odd, which gives (2).

The endpoint bound (6) follows inductively. If a prefix has canonical endpoint \(M<2\cdot3^j\), appending \(a\) requires the unique \(t\in\{0,\ldots,2^a-1\}\) satisfying

\[
\frac{3M+1}{2}+3^{j+1}t
\equiv2^{a-1}\pmod{2^a}.
\]

The new endpoint is

\[
M'=\frac{3(M+2\cdot3^jt)+1}{2^a},
\]

and the stated ranges give \(M'<2\cdot3^{j+1}\).

---

## 2. Terminal-suffix locality in its full form

Let \(v\) be the terminal suffix of \(w\) of length \(r\), with total valuation \(B\) and affine constant \(C_v\). Its canonical endpoint \(M_v\) satisfies

\[
2^B M_v\equiv C_v\pmod{3^r}.
\tag{10}
\]

More strongly,

\[
\boxed{
M_w\equiv M_v\pmod{2\cdot3^r}.
}
\tag{11}
\]

Thus the endpoint residue modulo \(3^r\) depends only on the final \(r\) valuations.

In particular,

\[
\begin{aligned}
3^r\mid M_w+1
&\iff 3^r\mid M_v+1\\
&\iff 3^r\mid C_v+2^B.
\end{aligned}
\tag{12}
\]

This is precisely the terminal-suffix locality theorem, now placed inside the exact two-ended cylinder.

There is a useful strengthening. Since \(M_v\) is odd and

\[
1\leq M_v<2\cdot3^r,
\]

condition (12) forces

\[
M_v=2\cdot3^r-1.
\tag{13}
\]

So a length-\(r\) high-carry suffix does not merely give a congruence: it gives an explicit exponential lower bound for every compatible endpoint.

---

## 3. Exact concatenation: the adelic bridge equation

Let \(u\) and \(v\) be two words, with

\[
|u|=p,\qquad |v|=q.
\]

Write their canonical pairs as

\[
(R_u,M_u),\qquad (R_v,M_v).
\]

There are unique integers

\[
0\leq t<2^{A(v)},\qquad 0\leq s<3^p
\]

such that

\[
\boxed{
M_u+2\cdot3^p t
=
R_v+2^{A(v)+1}s.
}
\tag{14}
\]

Indeed, after division by \(2\), this is

\[
3^pt-2^{A(v)}s=\frac{R_v-M_u}{2},
\tag{15}
\]

and \(3^p\) is invertible modulo \(2^{A(v)}\).

The canonical pair of the concatenation \(uv\) is

\[
\boxed{
R_{uv}=R_u+2^{A(u)+1}t,
\qquad
M_{uv}=M_v+2\cdot3^q s.
}
\tag{16}
\]

Equation (14) is the exact two-ended adelic matching condition:

- the endpoint progression of \(u\) has spacing \(2\cdot3^p\);
- the seed progression of \(v\) has spacing \(2^{A(v)+1}\);
- the bridge value is their unique positive intersection in the fundamental rectangle.

### Normalized renormalization coordinates

Set

\[
\xi_w=\frac{R_w}{2^{A(w)+1}},
\qquad
\eta_w=\frac{M_w}{2\cdot3^{|w|}}.
\tag{17}
\]

Then

\[
0<\xi_w<\eta_w<1
\]

and

\[
\eta_w-\xi_w
=
\frac{C_w}{2^{A(w)+1}3^{|w|}}.
\tag{18}
\]

Since \(A_j-A_k\leq-(k-j)\),

\[
\begin{aligned}
\eta_w-\xi_w
&=
\frac12\sum_{j=0}^{k-1}
  \frac{2^{A_j-A_k}}{3^{j+1}}\\
&\leq
2^{-k-1}\left(1-\left(\frac23\right)^k\right)
<2^{-k-1}.
\end{aligned}
\tag{19}
\]

Thus the two normalized ends synchronize exponentially.

Define the bridge coordinate

\[
z_{u,v}
=
\frac{t+\eta_u}{2^{A(v)}}
=
\frac{s+\xi_v}{3^p}.
\tag{20}
\]

Then

\[
\xi_{uv}=\frac{t+\xi_u}{2^{A(v)}},
\qquad
\eta_{uv}=\frac{s+\eta_v}{3^p},
\tag{21}
\]

and hence

\[
z_{u,v}-\xi_{uv}
=
\frac{\eta_u-\xi_u}{2^{A(v)}},
\tag{22}
\]

\[
\eta_{uv}-z_{u,v}
=
\frac{\eta_v-\xi_v}{3^p}.
\tag{23}
\]

Writing

\[
\delta_w=\eta_w-\xi_w,
\]

we obtain the exact contraction cocycle

\[
\boxed{
\delta_{uv}
=
2^{-A(v)}\delta_u+3^{-p}\delta_v.
}
\tag{24}
\]

This is the desired adelic two-ended renormalization law.

---

## 4. The archimedean height identity

Let

\[
\alpha=\log_2 3,
\qquad
h_i=A_i-\alpha i.
\tag{25}
\]

Since

\[
\frac{2^{A_i}}{3^i}=2^{h_i},
\]

we have

\[
\frac{C_k}{3^k}
=
\frac13\sum_{i=0}^{k-1}2^{h_i}.
\tag{26}
\]

For an actual seed \(n\),

\[
\boxed{
U^k(n)
=
2^{-h_k}
\left(
n+\frac13\sum_{i=0}^{k-1}2^{h_i}
\right).
}
\tag{27}
\]

If \(U^k(n)\geq n\) and \(h_k>0\), then

\[
n\bigl(2^{h_k}-1\bigr)
\leq
\frac13\sum_{i=0}^{k-1}2^{h_i}.
\tag{28}
\]

For a first crossing,

\[
h_i<0\quad(1\leq i<k),
\qquad h_k>0,
\]

so

\[
\frac13\sum_{i=0}^{k-1}2^{h_i}<\frac{k}{3}.
\tag{29}
\]

This gives the fixed-point bound

\[
n<
\frac{k}{3(2^{h_k}-1)}.
\tag{30}
\]

---

## 5. The seed-lift dichotomy

For nested prefixes \(w_k=(a_1,\ldots,a_k)\), the exact cylinders are nested, so

\[
R_{k+1}
=
R_k+2^{A_k+1}t_k,
\qquad
0\leq t_k<2^{a_{k+1}}.
\tag{31}
\]

Thus \(R_k\) is nondecreasing.

If it changes at stage \(k+1\), then

\[
R_{k+1}\geq2^{A_k+1}\geq2^{k+1}.
\tag{32}
\]

Consequently:

### Seed stabilization theorem

For every infinite valuation word, precisely one of the following occurs:

1. \(R_k\) is eventually constant; then the infinite word is realized by one ordinary positive odd integer.

2. \(R_k\) changes infinitely often; then

   \[
   \limsup_{k\to\infty}\frac{\log_2 R_k}{k}\geq1.
   \tag{33}
   \]

In particular, any subexponential canonical seed growth forces **literal eventual constancy**, not merely convergence in \(\mathbb Z_2\).

The dual statement holds for canonical endpoints when a word is extended to the left. If \(M_r\) is the canonical endpoint of a terminal word of length \(r\), then

\[
M_{r+1}=M_r+2\cdot3^r s_r,
\qquad s_r\in\{0,1,2\}.
\tag{34}
\]

If \(M_r\) changes infinitely often, its limsup growth rate is at least \(3^r\); any genuinely sub-\(3^r\) growth forces eventual endpoint constancy.

This is stronger than the necessary residue-rate statement in the adjacent 2026 search framework: once the exact nested cylinders are used, a vanishing starting rate is essentially equivalent to an ordinary integer lift. citeturn593659view0

---

## 6. Why vanishing residues do not prove Collatz

Suppose \(n\) is any fixed positive odd integer, and let \(w_k\) be its actual valuation prefixes.

Once

\[
2^{A_k+1}>n,
\]

the exact seed representative is

\[
R_k=n.
\tag{35}
\]

Therefore

\[
M_k=U^k(n).
\tag{36}
\]

Moreover,

\[
U(x)+1
\leq
\frac32(x+1),
\]

so

\[
U^k(n)+1
\leq
(n+1)\left(\frac32\right)^k.
\tag{37}
\]

Hence

\[
\xi_k
=
\frac{n}{2^{A_k+1}}
\leq
\frac{n}{2^{k+1}},
\tag{38}
\]

and

\[
\eta_k
=
\frac{U^k(n)}{2\cdot3^k}
<
\frac{n+1}{2^{k+1}}.
\tag{39}
\]

Thus

\[
\boxed{
(\xi_k,\eta_k)\longrightarrow(0,0)
}
\tag{40}
\]

exponentially for **every ordinary orbit**, without using convergence.

A hypothetical divergent integer orbit therefore lies in exactly the same asymptotic \(2\)-adic/\(3\)-adic normalized state as a convergent orbit. The dangerous state is not a nonzero recurrent residue state. It is the zero-residue, zero-carry state.

This is the first fundamental obstruction to the proposed proof route.

---

## 7. Exact height cannot be made recurrent without losing information

If the state retains the exact real height \(h_k\), then no two different times have the same height. Indeed,

\[
h_j=h_k
\]

would imply

\[
A_j-A_k=\alpha(j-k).
\]

The left side is an integer, whereas \(\alpha=\log_2 3\) is irrational. Therefore \(j=k\).

So an exact state containing \(h_k\) has **no recurrence at all**, including along the trivial orbit.

To get a finite state, one must bin, quotient, or recenter the height. But then the state no longer retains the exact sign of

\[
U^k(n)-n
=
\frac{C_k-(2^{A_k}-3^k)n}{2^{A_k}},
\tag{41}
\]

because that sign depends on the unbounded ordinary lift \(n\), not merely on its finite residues.

---

## 8. Finite residue states necessarily alias growth and descent

For a contracting word \(w\), set

\[
P_w=2^{A(w)+1},
\qquad
Q_w=2\cdot3^{|w|}.
\]

Then \(P_w>Q_w\). Its realizations satisfy

\[
n_t=R_w+P_wt,
\qquad
m_t=M_w+Q_wt,
\tag{42}
\]

so

\[
m_t-n_t
=
(M_w-R_w)+(Q_w-P_w)t.
\tag{43}
\]

If \(M_w\geq R_w\), the canonical lift is non-descending, but all sufficiently large lifts descend.

This cannot be repaired by increasing finite residue precision. For any prescribed \(r\), choose \(t\) divisible by sufficiently high powers of \(2\) and \(3\). Then

\[
n_t\equiv R_w\pmod{2^r},
\qquad
m_t\equiv M_w\pmod{3^r},
\tag{44}
\]

while the archimedean sign in (43) changes.

A strict numerical certificate is the word

\[
w=(4,1,1,1,1,2,2,1,2,1,1,2,1,1,1,2,3).
\]

It has

\[
|w|=17,\qquad A(w)=27,\qquad C_w=1\,106\,233\,681,
\]

and canonical pair

\[
R_w=165,\qquad M_w=167.
\]

Indeed,

\[
3^{17}\cdot165+C_w=2^{27}\cdot167.
\]

Therefore

\[
n_t=165+2^{28}t,
\qquad
m_t=167+2\cdot3^{17}t.
\]

The \(t=0\) realization rises from \(165\) to \(167\), whereas every \(t\geq1\) realization descends because

\[
2^{28}>2\cdot3^{17}.
\]

Yet for any finite \(2\)-adic and \(3\)-adic precision one can choose a nonzero \(t\) making both endpoint residues identical to those at \(t=0\).

A 2026 logic preprint proves a related limitation: arbitrary-step generalized Collatz transitions cannot be recognized by a finite automaton reading base-\(2\) representations. citeturn108155view0 Here the obstruction is visible directly: the discarded lift parameter is archimedean and unbounded.

---

## 9. Nontrivial adelic fixed points are abundant

For any nonempty block \(w\), the associated affine map is

\[
F_w(x)=\frac{3^{|w|}x+C_w}{2^{A(w)}}.
\tag{45}
\]

Its unique rational fixed point is

\[
\boxed{
x_w^*=\frac{C_w}{2^{A(w)}-3^{|w|}}.
}
\tag{46}
\]

The denominator is odd and not divisible by \(3\). Hence

\[
x_w^*\in\mathbb Z_2\cap\mathbb Z_3.
\]

If

\[
A(w)>|w|\log_2 3,
\]

then \(x_w^*>0\) at the real place. It realizes the word \(w\) exactly in \(\mathbb Z_2\), returns to itself after the block, and therefore realizes \(w^\infty\).

Thus every contracting block gives a positive rational

\[
2\text{-adic}/3\text{-adic}/\infty
\]

projective fixed point.

Moreover, such fixed points exist arbitrarily close to critical drift. Choose \(k\) for which the fractional part of \(k\log_2 3\) is close to \(1\), set

\[
A_i=\lfloor i\log_2 3\rfloor
\quad(0\leq i<k),
\]

and

\[
A_k=\lceil k\log_2 3\rceil.
\]

Then

\[
-1<h_i<0\quad(1\leq i<k),
\qquad
0<h_k\longrightarrow0
\]

along a subsequence. Each resulting first-crossing block has a positive rational adelic fixed point.

It is an ordinary positive integer precisely when

\[
2^{A(w)}-3^{|w|}\mid C_w.
\tag{47}
\]

But that is exactly the positive-cycle divisibility condition. If the quotient is an integer other than \(1\), it is a nontrivial Collatz cycle.

Therefore:

\[
\boxed{
\text{Projective fixed points are plentiful; ordinary integral fixed points are the cycle problem.}
}
\]

The hoped-for disappearance of all nontrivial recurrent states is consequently false before integrality is imposed. And after integrality is imposed, ruling out fixed points is already the nontrivial-cycle part of Collatz.

A divergent counterexample need not yield any periodic fixed point at all: its valuation sequence could be aperiodic. A recurrent component of a finite nondeterministic graph need not contain the particular counterexample path as a periodic orbit.

---

## 10. The strongest positive result: two-ended stabilization

Although this does not close the conjecture, the adelic construction gives a strong theorem about any contracting word that fails to descend.

Let

\[
\Delta_w=2^{A(w)}-3^{|w|}>0
\]

and define the real fixed point

\[
x_w^*=\frac{C_w}{\Delta_w}.
\]

Since

\[
M_w-R_w
=
\left(1-\frac{3^{|w|}}{2^{A(w)}}\right)
(x_w^*-R_w),
\tag{48}
\]

if

\[
M_w\geq R_w,
\tag{49}
\]

then

\[
R_w\leq M_w\leq x_w^*.
\tag{50}
\]

Now let \(u\) range over prefixes of \(w\), and \(v\) over suffixes. Prefix representatives are nondecreasing under extension, while suffix endpoint representatives are nondecreasing under extension to the left. Hence

\[
\boxed{
R_u\leq x_w^*,
\qquad
M_v\leq x_w^*
}
\tag{51}
\]

at **every scale**.

This is the exact three-place obstruction requested in the prompt:

- every prefix \(2\)-adic seed cylinder must have an unusually small canonical representative;
- every suffix \(3\)-adic endpoint cylinder must have an unusually small canonical representative;
- both are bounded by the same archimedean fixed-point threshold.

### Carries are forced into boundary layers

If a prefix representative changes at length \(j\), the new representative is at least \(2^j\). Therefore, once

\[
2^{p+1}>x_w^*,
\tag{52}
\]

all later prefix carries vanish and

\[
R_{w[1:j]}=R_w
\qquad(j\geq p).
\tag{53}
\]

Dually, once

\[
2\cdot3^q>x_w^*,
\tag{54}
\]

all earlier suffix-extension carries vanish and

\[
M_{w[j:k]}=M_w
\qquad(k-j+1\geq q).
\tag{55}
\]

For every split \(w=uv\) satisfying both depth conditions, the bridge equation has

\[
t=s=0,
\]

and therefore

\[
\boxed{
M_u=R_v.
}
\tag{56}
\]

The actual intermediate value is simultaneously

- the canonical \(3\)-adic endpoint of the entire left block, and
- the canonical \(2\)-adic seed of the entire right block.

### First-crossing words have only logarithmic boundary layers

If \(w\) is a first-crossing word, then by (29)

\[
x_w^*
<
\frac{k}{3(2^{h_k}-1)}.
\tag{57}
\]

If \(h_k\geq1\), this is \(<k/3\).

If \(0<h_k<1\), then

\[
A_k=\lceil k\log_2 3\rceil.
\]

A standard lower bound for the nonzero linear form

\[
A_k\log2-k\log3
\]

gives constants \(c,\kappa>0\) such that

\[
A_k\log2-k\log3\geq c k^{-\kappa}.
\tag{58}
\]

Such polynomial lower bounds follow from the theory of linear forms in two logarithms. citeturn655263search5 Consequently,

\[
x_w^*\ll k^{\kappa+1}.
\tag{59}
\]

Therefore every nonzero prefix or suffix carry in a hypothetical first-crossing paradoxical word is confined to

\[
O(\log k)
\]

letters at its two ends. The entire middle—of length

\[
k-O(\log k)
\]

—is an exact zero-carry ordinary orbit segment satisfying (56).

This appears to be the cleanest rigorous output of the adelic approach.

---

## 11. How terminal-suffix locality prunes the state tree

Let \(v\) be a terminal suffix of length \(r\). From (51), a non-descending contracting word must satisfy

\[
M_v\leq x_w^*.
\tag{60}
\]

Therefore the exact suffix test

\[
M_v>x_w^*
\tag{61}
\]

immediately proves descent.

In the special high-carry case,

\[
3^r\mid C_v+2^{A(v)},
\]

terminal-suffix locality gives

\[
M_v=2\cdot3^r-1.
\]

Hence:

### High-carry exclusion

If

\[
3^r\mid C_v+2^{A(v)}
\]

and

\[
2\cdot3^r-1>x_w^*,
\tag{62}
\]

then

\[
M_w<R_w.
\]

So the terminal-suffix theorem genuinely eliminates an infinite and explicitly recognizable family of candidate words.

What it does **not** prove is that every long first-crossing word has such a high-carry suffix. Low-carry suffix states remain, and those are exactly where the zero-carry bulk can live.

---

## 12. The exact remaining theorem

The full conjecture would follow from the following two statements.

### Barrier escape statement

Let \(w_\infty=(a_1,a_2,\ldots)\) satisfy

\[
A_j-j\log_2 3<0
\qquad\text{for every }j\geq1.
\tag{BE}
\]

Then its exact seed representatives \(R_j\) change infinitely often.

By the seed stabilization theorem, this says that no ordinary positive integer can realize an infinite valuation word whose coefficient remains at least \(1\) forever.

### First-crossing separation statement

Let \(w=(a_1,\ldots,a_k)\) satisfy

\[
A_j-j\log_2 3<0\quad(1\leq j<k),
\]

and

\[
A_k-k\log_2 3>0.
\]

Then

\[
M_w<R_w,
\tag{FS}
\]

except for the one-letter word \(w=(2)\), for which

\[
R_w=M_w=1.
\]

These are the exact missing zero-carry assertions.

### Conditional proof of Collatz

Assume (BE) and (FS). Let \(n>1\) be odd, with valuation word \(a_1,a_2,\ldots\).

If its height never becomes positive, then its canonical seed representatives eventually equal \(n\), contradicting (BE).

Hence there is a first crossing \(k\). Let \(w\) be that prefix. Every realization is

\[
n=R_w+2^{A_k+1}t,
\]

with endpoint

\[
U^k(n)=M_w+2\cdot3^kt.
\]

Since the block is contracting,

\[
2^{A_k+1}>2\cdot3^k.
\]

If \(w\neq(2)\), statement (FS) gives \(M_w<R_w\), and therefore

\[
U^k(n)<n.
\]

For \(w=(2)\), \(n>1\) implies \(t\geq1\), and

\[
U(n)=1+6t<1+8t=n.
\]

Thus every odd \(n>1\) has a smaller odd iterate. Strong induction gives convergence to \(1\). Even starting values reduce to odd ones by division by powers of \(2\).

That would be a complete proof.

---

## 13. Why this is still the unresolved core

The first-crossing separation statement says that once the multiplicative coefficient first becomes contracting, the additive term cannot keep the orbit above its initial minimum. This is a compressed odd-to-odd version of the stopping-time problem.

Rozier and Terracol’s 2026 paper formulates Terras’s coefficient stopping-time conjecture and the equivalent assertion that the first term of a paradoxical sequence is never its smallest term. It remains conjectural; their work instead classifies and computationally constrains paradoxical sequences. citeturn425183view0

The adelic renormalization proves substantially more structure around a hypothetical violation:

\[
\text{small two-adic prefixes}
+
\text{small three-adic suffixes}
+
\text{logarithmic carry boundaries}
+
\text{a zero-carry middle}.
\]

But the zero-carry middle is an ordinary Collatz orbit segment. Showing that this middle cannot remain above its initial value is precisely what has not been proved.

## Final status

A full proof has **not** been completed. The exact result of the approach is:

\[
\boxed{
\begin{array}{c}
\text{Every candidate first-crossing counterexample has all nonzero}\\
\text{\(2\)-adic and \(3\)-adic carries confined to logarithmic boundary layers,}\\
\text{and an arbitrarily long exact zero-carry ordinary core.}
\end{array}
}
\]

Terminal-suffix locality eliminates the high-\(3\)-adic-carry part of that state space. Exact seed nesting eliminates nonordinary low-growth \(2\)-adic ghosts. What remains is the frozen zero-carry branch, expressed precisely by (BE) and (FS).

The projective-fixed-point route can find or exclude cycles, but it does not automatically address aperiodic divergence. The proof route is therefore reduced to one sharp task: establish barrier escape and first-crossing separation for the zero-carry ordinary branch. Claiming that recurrence alone supplies those statements would be the missing—and invalid—step.