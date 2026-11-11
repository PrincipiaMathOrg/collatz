# The fixed-ray low-residue subgate

**Updated:** 17 August 2026  
**Mode:** SOLVE  
**Status:** the available identities do not force a low \(2\pmod 3\)
endpoint. They do give an exact inverse-safety budget, a transported greedy
decoder on every return lattice, and a new harmonic-thinness exclusion for
recurrent factors on one fixed ordinary ray. The deterministic always-live
repair does not close the gate: its score is bounded above for every fixed
endpoint and has arbitrarily negative subsequences on a nonperiodic ray.

## 1. Setup and the reciprocal criterion

Let

\[
x_0=n,\qquad x_{j+1}=\frac{3x_j+1}{2^{a_j}},\qquad
A_j:=\sum_{i<j}a_i,
\]

be an injective accelerated orbit beginning at the least positive odd seed
whose orbit does not terminate. Put

\[
q_j:=\frac{3^j}{2^{A_j}},\qquad h_j:=\frac{x_j}{q_j}.
\tag{1}
\]

We assume the normalized strict barriers \(q_j>1\) for \(j\geq 1\),
\(q_j\to\infty\), and finite stationary height

\[
\mathcal K:=\sup_j h_j<\infty.
\tag{2}
\]

If normalization starts at a later state \(x_0=m\), every statement below
remains valid with \(h_0=m\), while \(n\) continues to denote the global
least seed in all inverse-safety inequalities.

The accelerated affine identity gives

\[
h_j=n+\frac13\sum_{i=0}^{j-1}\frac1{q_i},\qquad
\boxed{\mathcal K=n+\frac13\sum_{i=0}^{\infty}\frac1{q_i}}.
\tag{3}
\]

This is the accelerated sampling of the shortcut identity. Namely, if
\(Q_k=3^{s_k}/2^k\) on the shortcut expansion, then

\[
\frac{y_k}{Q_k}
=n+\frac12+\frac14\sum_{r=1}^{k-1}\frac1{Q_r}
-\frac1{4Q_k}.
\tag{4}
\]

Consequently,

\[
\boxed{
\sup_k\frac{y_k}{Q_k}<\infty
\quad\Longleftrightarrow\quad
\sum_{r\geq1}Q_r^{-1}<\infty,
}
\tag{5}
\]

where the last term in (4) tends to zero. For the hypothetical injective
divergent orbit, the audited orbit-sparsity theorem supplies the bounded
normalized height, and then \(Q_k\to\infty\). Conversely, \(Q_k\to\infty\)
together with (5) gives \(y_k\to\infty\). Thus, within the audited ordinary
ray setting, divergence is equivalent to the pair

\[
Q_k\to\infty,
\qquad
\sum_{r\geq1}Q_r^{-1}<\infty.
\tag{6}
\]

Reciprocal mass convergence is the exact infinite Archimedean condition in
these coordinates. It is not a recurrence theorem: convergence becomes
easier, not harder, when return renewals force \(q_j\) to be large.

## 2. Greedy inverse chains and the exact stationary budget

For an odd integer \(X\) not divisible by \(3\), define its least accelerated
predecessor by

\[
R(X):=
\begin{cases}
(2X-1)/3,&X\equiv2\pmod3,\\
(4X-1)/3,&X\equiv1\pmod3.
\end{cases}
\tag{7}
\]

The map is undefined when \(3\mid X\). Suppose that the chain
\(X,R(X),\ldots,R^s(X)\) is defined. Write

\[
e_r:=
\begin{cases}
1,&R^r(X)\equiv2\pmod3,\\
2,&R^r(X)\equiv1\pmod3,
\end{cases}
\qquad
E_s:=\sum_{r=0}^{s-1}e_r,
\tag{8}
\]

and define \(C_0:=0\) and

\[
C_{r+1}:=2^{e_r}C_r+3^r.
\tag{9}
\]

Iteration of (7) gives

\[
R^s(X)=\frac{2^{E_s}X-C_s}{3^s}.
\tag{10}
\]

We now apply this identity to an orbit endpoint \(X=x_j\). Put

\[
\alpha:=\log_2 3,
\qquad
\Delta(j,s):=A_j-E_s-\alpha(j-s).
\tag{11}
\]

The quantity \(\Delta(j,s)\) measures the coefficient saving obtained by
leaving the forward ray at \(x_j\) and following \(s\) greedy predecessors.

**Theorem 1, exact inverse-safety budget.** If the greedy chain from \(x_j\)
is defined through depth \(s\), then

\[
\boxed{
R^s(x_j)=2^{-\Delta(j,s)}h_j-\frac{C_s}{3^s}.
}
\tag{12}
\]

Since \(R^s(x_j)\) enters the nonterminating orbit after \(s\) steps,
leastness of \(n\) implies

\[
\boxed{
\Delta(j,s)
\leq
\log_2\!\left(\frac{h_j}{n+C_s/3^s}\right)
<\log_2\!\left(\frac{\mathcal K}{n}\right).
}
\tag{13}
\]

**Proof.** Substituting \(x_j=3^jh_j/2^{A_j}\) into (10) gives

\[
R^s(x_j)
=2^{E_s-A_j}3^{j-s}h_j-\frac{C_s}{3^s},
\]

which is (12). Every value \(R^s(x_j)\) is a positive odd seed whose orbit
reaches \(x_j\), so it is also nonterminating. Therefore \(R^s(x_j)\geq n\).
Solving this inequality for \(\Delta(j,s)\) gives the first inequality in
(13). The second follows from \(h_j<\mathcal K\) and \(C_s>0\). \(\square\)

The one-step sibling strip is the case \(s=1\). The accelerated recurrence
gives

\[
x_j\equiv2\pmod3
\quad\Longleftrightarrow\quad
a_{j-1}\text{ is odd}.
\tag{14}
\]

When this occurs, \(E_1=1\), \(C_1=1\), and (12) is

\[
R(x_j)=\frac{2x_j-1}{3}.
\]

Therefore

\[
\boxed{
x_j\equiv2\pmod3
\quad\Longrightarrow\quad
x_j\geq\frac{3n+1}{2}.
}
\tag{15}
\]

In other words, the requested low-residue endpoint is exactly a depth-one
violation of (13).

Theorem 1 gives a genuine subclass exclusion beyond the one-step fan.

**Corollary 2, unbounded greedy-saving exclusion.** No least divergent ray
can have defined pairs \((j_\nu,s_\nu)\) for which

\[
\Delta(j_\nu,s_\nu)\longrightarrow\infty.
\tag{16}
\]

More sharply, a single defined pair satisfying

\[
\Delta(j,s)\geq\log_2(\mathcal K/n)
\tag{17}
\]

already gives \(R^s(x_j)<n\), which is a contradiction. In the full-depth
case \(s=j\), every surviving endpoint satisfies

\[
\boxed{A_j-E_j<\log_2(\mathcal K/n).}
\tag{18}
\]

Thus a defined greedy shadow may save only a fixed number of powers of \(2\)
against the actual prefix. It must otherwise hit a multiple of \(3\) and
stop. This is an infinite fixed-seed restriction, since the budget
\(\log_2(\mathcal K/n)\) is fixed for the whole ray.

## 3. What a returned factor transports

Suppose the same accelerated factor of length \(L\) and weight \(B\) occurs
at two positions. Its endpoints \(X<X'\) satisfy

\[
X'-X=2t3^L
\qquad(t\geq1).
\tag{19}
\]

The transported ternary decoder can be strengthened to the entire greedy
residue signature.

**Proposition 3, greedy transport on the return lattice.** The greedy chains
from \(X\) and \(X'\) make the same choices \(e_0,e_1,\ldots\) until they
terminate or reach depth \(L\). If both chains reach depth \(s\leq L\), then

\[
\boxed{
R^s(X')-R^s(X)=2^{E_s+1}t3^{L-s}.
}
\tag{20}
\]

**Proof.** At depth \(r<L\), congruence modulo \(3^{L-r}\) makes the two
states equal modulo \(3\). Hence the same branch of (7) is selected, or both
chains terminate. On a common branch, the difference is multiplied by
\(2^{e_r}/3\). Iterating from (19) gives (20). \(\square\)

In particular, if the returned factor ends in an odd exponent, all of its
returned endpoints are congruent to \(2\pmod3\). Their least siblings lie on
the lattice

\[
R(X')-R(X)=4t3^{L-1}.
\tag{21}
\]

This transports a low-residue opportunity, but it does not make the smaller
endpoint small. The return lattice supplies spacing, not recurrence into a
fixed Archimedean interval.

There is one further fixed-ray consequence which uses reciprocal mass and is
not contained in a finite packing bound. Fix a factor \(v\) of length \(L\)
and weight \(B\). Write its occurrence lattice as

\[
x_t=\rho(v)+2^{B+1}u_t,
\qquad u_t\in\mathbf N_0.
\tag{22}
\]

On an injective ray the integers \(u_t\) belonging to distinct occurrences
are distinct.

**Theorem 4, harmonic-thin return lifts.** For every fixed accelerated
factor which occurs infinitely often,

\[
\boxed{
\sum_{t:\,v\text{ occurs at }t}\frac1{1+u_t}<\infty.
}
\tag{23}
\]

**Proof.** At every occurrence, (1) and (22) give

\[
\frac{n}{\rho(v)+2^{B+1}u_t}
\leq\frac1{q_t}
\leq
\frac{\mathcal K}{\rho(v)+2^{B+1}u_t}.
\tag{24}
\]

The series \(\sum_tq_t^{-1}\) converges by (3). Its subseries over the
occurrences of \(v\) therefore converges. Since the denominator on the right
of (22) is comparable to \(1+u_t\), (23) follows. \(\square\)

For example, if the occurrences are enumerated as \(t_1<t_2<\cdots\), then
the subclass

\[
u_{t_r}\leq Cr\qquad(r\geq r_0)
\tag{25}
\]

is excluded for every fixed \(C\), since (23) would dominate a harmonic
series. Thus recurrence along one factor lattice must be reciprocally thin.
This complements the return-complexity bound

\[
p_2(L)\geq
\frac{L-\log_2(2\mathcal K)}{\log_2 3-1}.
\tag{26}
\]

Equations (23) and (26) do not force a return. They say that a surviving ray
must have both sufficiently many distinct factors and sufficiently sparse
lifts inside every factor class. High symbolic complexity is fully
compatible with these two requirements.

## 4. The moving-seed family remains a sharp regression

For \(K\geq1\), put

\[
n_K:=2^{3K+1}-5=2\cdot8^K-5.
\tag{27}
\]

Its first \(2K\) accelerated exponents are exactly \((1,2)^K\), and

\[
x_{2K}=2\cdot9^K-5,\qquad
A_{2K}=3K,qquad
q_{2K}=\left(\frac98\right)^K.
\tag{28}
\]

The normalized endpoint is

\[
h_{2K}=2\cdot8^K-5\left(\frac89\right)^K
<n_K+5.
\tag{29}
\]

Every exponent-one endpoint is \(2\pmod3\). The first one is exactly
\((3n_K+1)/2\), and all later ones are larger, so (15) never fails. Since
all displayed exponents belong to \(\{1,2\}\), the greedy chain from
\(x_{2K}\) retraces the displayed orbit exactly. Hence

\[
E_{2K}=A_{2K}=3K,\qquad
\Delta(2K,2K)=0,\qquad
R^{2K}(x_{2K})=n_K.
\tag{30}
\]

For even \(K\), the seed \(n_K\) is divisible by \(3\), so the greedy chain
then stops. The family therefore saturates the inverse-safety inequality
without producing an asynchronous descent. Also
\(h_{2K}/n_K\to1\), so its finite normalized height is as close as desired
to the minimum possible scale.

This is a moving-seed countermodel only. The seed, stationary height, and
tested factor length all change with \(K\). It does not contradict Theorem 1
or Theorem 4, both of which retain one fixed \(n\) and one fixed
\(\mathcal K\) across unbounded depths.

## 5. The exact remaining gate

For every defined greedy chain from an orbit endpoint, (12) gives

\[
R^s(x_j)<n
\quad\Longleftrightarrow\quad
\boxed{
\Delta(j,s)>
\log_2\!\left(\frac{h_j}{n+C_s/3^s}\right).
}
\tag{31}
\]

The case \(s=1\), \(x_j\equiv2\pmod3\), is precisely

\[
x_j<\frac{3n+1}{2}.
\]

The cases \(s\geq2\) are precisely the deeper greedy-predecessor route.
Thus (31) combines both proposed conclusions into one exact fixed-ray gate.

The present ingredients do not force (31). Reciprocal convergence fixes the
finite budget \(\mathcal K/n\), but large surplus makes the reciprocal tail
smaller. Return lattices transport the greedy signature by (20), but their
rank-one spacing makes later returned endpoints larger. Complexity gives
many factor classes, not a return into the bounded interval required by
(31). Finally, the family (27) to (30) rules out every bounded-window version
of the claim while leaving the fixed-seed version open.

Therefore the remaining theorem must be genuinely recurrent on one ordinary
ray. It must prove that either some greedy chain survives long enough for its
coefficient saving to cross the exact budget in (31), or that avoidance of
this event forces a factor class whose lift integers violate the
harmonic-thinness law (23). No such implication is obtained here. The new
subclass exclusions are unbounded greedy saving, as in (16), and
harmonically dense return lifts, as in (25).

## 6. The always-live repair and its exact no-go

We now remove the stopping event from the greedy chain. Let \(R\) be the map
in (7). If \(3\mid R(X)\), we replace the least exponent \(e\in\{1,2\}\)
by \(e+2\). The repaired predecessor is

\[
\frac{2^{e+2}X-1}{3}=4R(X)+1,
\tag{32}
\]

which is congruent to \(1\pmod3\). Thus the deterministic map

\[
\widehat R(X):=
\begin{cases}
R(X),&3\nmid R(X),\\
4R(X)+1,&3\mid R(X)
\end{cases}
\tag{33}
\]

is defined on every positive odd \(X\) not divisible by \(3\), and its image
has the same three properties. Also \(U(\widehat R(X))=X\).

The complete residue rule is as follows.

| \(X\pmod9\) | Base exponent | Repair | Live exponent |
| ---: | ---: | :---: | ---: |
| \(1\) | \(2\) | no | \(2\) |
| \(2\) | \(1\) | no | \(1\) |
| \(4\) | \(2\) | no | \(2\) |
| \(5\) | \(1\) | yes | \(3\) |
| \(7\) | \(2\) | yes | \(4\) |
| \(8\) | \(1\) | no | \(1\) |

Indeed, the least predecessor is divisible by \(3\) precisely when
\(X\equiv5\) or \(7\pmod9\). This proves the table without a search.

Fix \(X\), put \(z_0:=X\), and define

\[
z_{r+1}:=\widehat R(z_r)
=\frac{2^{f_r}z_r-1}{3}.
\tag{34}
\]

Let \(D_s\) count repairs among the first \(s\) steps, and let \(N_2(s)\)
count steps whose base exponent is \(2\). If
\(F_s:=\sum_{r<s}f_r\), then

\[
F_s=s+N_2(s)+2D_s.
\tag{35}
\]

Put \(\beta:=\alpha-1\) and define the always-live score by

\[
G_s:=\alpha s-F_s
=\beta s-N_2(s)-2D_s.
\tag{36}
\]

The next theorem gives the exact survival overhead.

**Theorem 5, fixed-seed always-live score law.** For every \(s\geq1\),

\[
\boxed{
G_s
=\log_2\!\left(\frac{X}{z_s}\right)
+\sum_{r=0}^{s-1}
\log_2\!\left(1-\frac1{2^{f_r}z_r}\right)
<\log_2\!\left(\frac{X}{z_s}\right).
}
\tag{37}
\]

Consequently,

\[
\boxed{
N_2(s)+2D_s>\beta s-\log_2X.
}
\tag{38}
\]

In particular,

\[
\boxed{\sup_{s\geq1}G_s<\log_2X.}
\tag{39}
\]

If the forward orbit of \(X\) is not periodic, then the inverse states
\(z_s\) are distinct and unbounded. In that case,

\[
\boxed{\liminf_{s\to\infty}G_s=-\infty.}
\tag{40}
\]

**Proof.** Dividing (34) by \(z_r\) gives

\[
\frac{z_{r+1}}{z_r}
=\frac{2^{f_r}}3
\cdot\left(1-\frac1{2^{f_r}z_r}\right).
\]

Multiplication over \(0\leq r<s\), followed by taking base-\(2\)
logarithms, proves (37). Since \(z_s\geq1\), equations (36) and (37) give
(38).

Suppose that \(z_r=z_s\) for some \(r<s\). Since
\(U(z_{i+1})=z_i\), the state \(z_s\) is periodic under \(U\), and so is
\(X=U^s(z_s)\). Therefore a nonperiodic forward orbit makes the positive
integers \(z_s\) distinct. They are then unbounded. Along a subsequence for
which \(z_s\to\infty\), the upper bound in (37) tends to
\(-\infty\), which proves (40). \(\square\)

There is a sign error to avoid in this argument. The parenthetical factor in
(37) is smaller than \(1\), so the affine correction lowers the score. It
does not provide an additional saving.

For a normalized orbit endpoint \(X=x_j\), recall that
\(S_j=\alpha j-A_j=\log_2q_j\). The same affine calculation as in
Theorem 1, with \(F_s\) in place of the stopped greedy sum \(E_s\), gives

\[
\boxed{
\widehat\Delta(j,s)
:=A_j-F_s-\alpha(j-s)
=G_s-S_j.
}
\tag{41}
\]

If \(n\) is the least divergent seed, every always-live predecessor
\(z_s\) is nonterminating and hence \(z_s\geq n\). Equation (37) then gives

\[
\begin{aligned}
G_s
&<\log_2\!\left(\frac{x_j}{z_s}\right)\\
&\leq S_j+\log_2\!\left(\frac{h_j}{n}\right)\\
&<S_j+\log_2\!\left(\frac{\mathcal K}{n}\right).
\end{aligned}
\tag{42}
\]

Thus the always-live repair does not cross the fixed stationary budget.
More precisely, proving that it crosses the budget in (42) is already
proving that some \(z_s<n\). The repair rule has made the chain infinite, but
it has not supplied the missing descent.

### Residue cylinders and the moving-seed regression

The first \(s\) live exponents are determined by the odd residue class of
\(X\) modulo \(2\cdot3^{s+1}\). Indeed, two such representatives remain
congruent modulo \(2\cdot3^{s+1-r}\) after \(r\) common inverse steps. In
particular, they have the same residue modulo \(9\) before each of the first
\(s\) choices.

No finite residue depth forces a positive repair frequency. For \(m\geq1\),
put

\[
X_m:=2\cdot9^m-1.
\tag{43}
\]

The first \(2m\) live exponents from \(X_m\) are all equal to \(1\), with no
repairs. Namely,

\[
z_r+1=2^{r+1}3^{2m-r}
\qquad(0\leq r\leq2m),
\tag{44}
\]

so every state before the last is \(2\pmod3\), and

\[
z_{2m}=2^{2m+1}-1\not\equiv0\pmod3.
\]

Consequently,

\[
G_{2m}=2m\beta\longrightarrow\infty.
\tag{45}
\]

These examples occupy the cylinders \(X_m\equiv-1\pmod{9^m}\). Read in the
forward direction, they are exact positive strict-barrier segments with
valuation word \(1^{2m}\), beginning at \(2^{2m+1}-1\) and ending at
\(2\cdot9^m-1\). Their forward surplus is

\[
S_{2m}=2m\beta=G_{2m},
\]

so (41) gives \(\widehat\Delta(2m,2m)=0\). The score grows, but the relevant
endpoint budget moves by exactly the same amount.

This is a moving-seed no-go. The cylinders converge to \(-1\) in
\(\mathbf{Z}_3\), while no fixed positive integer lies in all of them.
Therefore they do not construct one infinite ordinary counterexample. They
do prove that no argument based on a bounded modulus \(9^m\), a finite
repair census, or a uniform finite-depth repair density can close the
fixed-ray gate.

For comparison, averaging uniformly over odd unit residue classes modulo
\(2\cdot3^{s+1}\) gives repair frequency \(1/3\) in the exact finite
census. Indeed, at the first position the six unit classes modulo \(9\) are
uniform. After one inverse step, each target class congruent to \(1\pmod3\)
has four branch preimages, while each target class congruent to
\(2\pmod3\) has two. The resulting weight ratio \(2:1\) is invariant under
the same six-branch calculation. At every position, the total weight of the
repair classes \(5\) and \(7\pmod9\) is therefore \(1/3\).

The base-exponent-\(2\) frequency is \(1/2\) at the first position and
\(2/3\) thereafter. Hence the cylinder-averaged live exponent is

\[
\frac1s\mathbf{E}(F_s)
=\frac73-\frac1{6s}.
\tag{46}
\]

This average has no pointwise consequence for one fixed ray. The retained
regression always_live_inverse_probe.js checks the residue table,
the cylinder coherence through depth \(7\), the family (43) through
\(m=10\), and the exact score ceiling on several fixed seeds through depth
\(120\).

| File | SHA-256 |
| --- | --- |
| always_live_inverse_probe.js | 927A34323B972785A7B791D6CC1F8FFCDCBAF46389BB24EF21B83BC7C567B57C |

In other words, the deterministic repair exposes the obstruction rather
than removes it. A fixed nonperiodic inverse chain pays at least the critical
combined overhead in (38), and its score has arbitrarily negative
subsequences by (40). The remaining gate is still to prove an actual state
descent below \(n\), not merely infinite inverse survival.
