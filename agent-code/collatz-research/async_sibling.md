# Least-counterexample siblings and asynchronous coalescence

**Updated:** 17 August 2026  
**Mode:** SOLVE, followed by CALCULATE for exact regression  
**Status:** the one-step sibling inequalities are exact, but they do not close either the divergent or periodic branch

We consider the accelerated positive Collatz map

\[
U(x):=\frac{3x+1}{2^{v_2(3x+1)}}
\]

on positive odd integers. Suppose that (n) is the least positive odd
integer whose orbit does not reach (1), and index its orbit by

\[
x_0=n,\qquad x_{j+1}=U(x_j),\qquad
a_j:=v_2(3x_j+1).
\tag{1}
\]

The global least-counterexample hypothesis is important. The weaker statement
that (n) is merely the smallest state on one orbit does not imply that an
off-orbit predecessor below (n) terminates.

## 1. The complete sibling fan

Fix (j), put (a:=a_j) and (X:=x_{j+1}), and let

\[
d_j:=\left\lfloor\frac{a_j-1}{2}\right\rfloor.
\]

For every (0\le m\le d_j), define

\[
y_{j,m}:=
\frac{x_j-(4^m-1)/3}{4^m}
=\frac{2^{a_j-2m}X-1}{3}.
\tag{2}
\]

The case (m=0) gives (y_{j,0}=x_j). For (m\ge1), this is the
iterated lower sibling suggested in the question.

**Proposition 1, exact sibling fan.** For every (0\le m\le d_j), the
integer (y_{j,m}) is positive and odd, and

\[
v_2(3y_{j,m}+1)=a_j-2m,
\qquad U(y_{j,m})=x_{j+1}.
\tag{3}
\]

**Proof.** Equation (1) gives (3x_j+1=2^{a_j}X). Iterating
(y\mapsto(y-1)/4) gives the first expression in (2), while direct
substitution gives

\[
3y_{j,m}+1=\frac{3x_j+1}{4^m}=2^{a_j-2m}X.
\]

The exponent (a_j-2m) is positive and (X) is odd, so the displayed
valuation is exact. The conclusion follows. \(\square\)

Every (y_{j,m}) has a nonterminating orbit, since it reaches the
nonterminating state (x_{j+1}) in one step. Strong induction at (n)
therefore gives

\[
\boxed{y_{j,m}\ge n}
\qquad(0\le m\le d_j).
\tag{4}
\]

Equivalently,

\[
\boxed{
3x_j+1\ge4^m(3n+1),
\qquad
x_j\ge4^mn+\frac{4^m-1}{3}.
}
\tag{5}
\]

It is enough to use (m=d_j), since the siblings decrease with (m).
Writing (a_j=2d+1) or (a_j=2d+2), we obtain

\[
\begin{array}{rcll}
a_j=2d+1&\Longrightarrow&
x_{j+1}\ge(3n+1)/2,& d\ge0,\\[3pt]
a_j=2d+2&\Longrightarrow&
x_{j+1}\ge(3n+1)/4,& d\ge0.
\end{array}
\tag{6}
\]

The even inequality is already implied by (x_{j+1}\ge n). Thus the
entire numerical content of the one-step fan is concentrated in odd incoming
exponents. In particular,

\[
a_j\ge3\quad\Longrightarrow\quad x_j\ge4n+1.
\tag{7}
\]

There is a useful equivalent formulation. Every odd (X) not divisible by
(3) has a least positive accelerated predecessor

\[
R(X):=
\begin{cases}
(2X-1)/3,&X\equiv2\pmod3,\\
(4X-1)/3,&X\equiv1\pmod3.
\end{cases}
\tag{8}
\]

All other predecessors are obtained by multiplying the displayed power of
(2) by (4^m). Hence (4) for every sibling is equivalent to

\[
\boxed{R(x_{j+1})\ge n\quad(j\ge0).}
\tag{9}
\]

Since every orbit state after time zero is not divisible by (3), (9) says
precisely that

\[
\boxed{
x_{j+1}\equiv2\pmod3
\quad\Longrightarrow\quad
x_{j+1}\ge\frac{3n+1}{2}.
}
\tag{10}
\]

The residue class (1\pmod3) gives no additional size restriction.

## 2. Equality is a periodic-basin alternative

The inequality in (4) cannot be made strict for an arbitrary nonterminating
orbit. Suppose that (m\ge1) and (y_{j,m}=n). Then

\[
x_{j+1}=U(y_{j,m})=U(n)=x_1.
\tag{11}
\]

The case (j=0) is impossible, since (y_{0,m}<x_0=n). Therefore (j\ge1),
and (11) makes the tail beginning at (x_1) periodic, with period dividing
(j). The seed (n) may lie one step before that cycle.

For an injective divergent orbit, equality is impossible. Since all relevant
integers are odd, (4) then sharpens to

\[
y_{j,m}\ge n+2
\tag{12}
\]

and consequently

\[
3x_j+1\ge4^m(3n+7).
\tag{13}
\]

In particular, an injective divergent orbit satisfies

\[
a_j\ge3\quad\Longrightarrow\quad x_j\ge4n+9,
\tag{14}
\]

and an odd exponent (a_j\ge3) forces

\[
x_{j+1}\ge\frac{3n+7}{2}.
\tag{15}
\]

Thus the exact least-counterexample conclusion is a dichotomy: a strict
sibling inequality on the divergent branch, or a preperiod-one collision
into a positive cycle. Equality is not a contradiction by itself.

## 3. Interaction with the coefficient barrier and stationary height

We now restrict to an injective divergent tail for which the usual
normalization is available. If this requires shifting to a later coefficient
record, then (x_0) in this section denotes the shifted tail start, while
(n) continues to denote the global least counterexample. Put

\[
A_j:=\sum_{i<j}a_i,
\qquad q_j:=\frac{3^j}{2^{A_j}},
\qquad S_j:=\log_2q_j.
\tag{16}
\]

Assume that every prefix is a strict coefficient barrier, so (S_j>0) for
(j\ge1), and let

\[
\mathcal K:=\sup_j\frac{x_j}{q_j}<\infty.
\tag{17}
\]

The normalized height increases to \(\mathcal K\). More precisely, if

\[
\mathcal H_j:=x_j\prod_{i\ge j}
\left(1+\frac1{3x_i}\right),
\]

then

\[
\mathcal H_j=q_j\mathcal K.
\tag{18}
\]

The orbit of (y_{j,m}) joins the orbit of (x_j) after its first step.
Comparing the two first affine factors gives the exact scaling law

\[
\boxed{
\mathcal H(y_{j,m})=4^{-m}\mathcal H_j
=4^{-m}q_j\mathcal K.
}
\tag{19}
\]

Since \(\mathcal H(y)>y\), leastness gives

\[
\boxed{
4^m<\frac{\mathcal K}{n}q_j.
}
\tag{20}
\]

On the injective branch, (n) can be replaced by (n+2). At the deepest
sibling this becomes

\[
\boxed{
2d_j<S_j+\log_2(\mathcal K/n).
}
\tag{21}
\]

This is the strongest direct combination of leastness and finite stationary
height. It is a spike ceiling, not a contradiction. The strict prefix barrier
already gives

\[
a_j<S_j+\log_2 3.
\tag{22}
\]

For even (a_j), (22) is stronger than (21). For odd (a_j=2d_j+1), the
sibling ceiling improves (22) only when

\[
\log_2(\mathcal K/n)<\log_2 3-1,
\qquad\text{equivalently}\qquad
\mathcal K/n<3/2.
\tag{23}
\]

Even under (23), the improvement is less than one exponent unit and does not
force an odd spike. Words using only the exponents (1) and (2) make
(d_j=0) everywhere and evade (21) completely.

When the normalized tail begins at (n), one has

\[
\frac{\mathcal K}{n}
=\prod_{j\ge0}\left(1+\frac1{3x_j}\right),
\qquad
\log\frac{\mathcal K}{n}
\le\frac13\sum_{j\ge0}\frac1{x_j}.
\tag{24}
\]

Orbit sparsity proves only that the sum is finite. It supplies no uniform
upper bound strong enough to force (23), much less an exponent attaining the
upper edge in (21). The certified reciprocal-mass bound (10.789) concerns
finite simple negative shortcut paths. It does not apply to the positive
nonterminating tail in (24), so it cannot be inserted into this argument.

## 4. Interaction with the ternary decoder

Put

\[
b_j:=v_3(x_j+1).
\]

The exact decoder identity is

\[
2^{a_j}(x_{j+1}+1)=3(x_j+1)+2^{a_j}-2.
\tag{25}
\]

Reduction modulo (3) gives the equivalence

\[
\boxed{
b_{j+1}>0\quad\Longleftrightarrow\quad a_j\text{ is odd}.
}
\tag{26}
\]

Thus (10) can also be written as

\[
b_{j+1}>0
\quad\Longrightarrow\quad
x_{j+1}\ge\frac{3n+1}{2}.
\tag{27}
\]

For an odd incoming exponent, the least predecessor (z=R(x_{j+1}))
satisfies

\[
z+1=\frac{2(x_{j+1}+1)}3,
\qquad b(z)=b_{j+1}-1.
\tag{28}
\]

This transports the decoder one level backward, but it does not force size
descent. A large decoder makes (x_{j+1}) large, which is compatible with
(27). An even exponent resets the endpoint decoder to zero, and exponent-(2)
steps can occur arbitrarily often without creating any lower sibling.

## 5. The denominator-five regression

For the generalized map

\[
U_q(x):=\frac{3x+q}{2^{v_2(3x+q)}},
\]

the sibling calculation becomes

\[
y_{m}=\frac{x-q(4^m-1)/3}{4^m},
\qquad
3y_m+q=\frac{3x+q}{4^m}.
\tag{29}
\]

Hence leastness would force

\[
3x+q\ge4^m(3n+q).
\tag{30}
\]

Consider the exact (q=5) numerator cycle

\[
\begin{split}
187,283,427,643,967,1453,1091,1639,2461,1847,2773,2081,\\
781,587,883,1327,1993,
\end{split}
\]

with valuation word

\[
(1,1,1,1,1,2,1,1,2,1,2,3,2,1,1,1,5).
\tag{31}
\]

At the last state,

\[
3\cdot1993+5=2^5\cdot187.
\]

Lowering the exponent twice gives

\[
1993\longmapsto497\longmapsto123,
\qquad
3\cdot123+5=2\cdot187.
\tag{32}
\]

Relative to the cycle minimum (187), the sibling (123) is a strict
violation. However,

\[
123\xrightarrow{1}187,
\]

so the orbit beginning at (123) has global minimum (123), enters the
cycle after one step, and realizes equality in (30). Every other sibling on
this orbit is at least (123). This is the exact regression for Section 2:
equality is a basin-minimal preperiodic loop, not an immediate contradiction.
It also shows that real coefficient inequalities do not replace the special
denominator-one condition in positive-cycle exclusion.

## 6. Exact finite countermodels

The sibling route has an elementary all-length finite obstruction. For
(K\ge1), put

\[
n_K:=2^{3K+1}-5.
\tag{33}
\]

The first (2K) accelerated exponents of (n_K) are exactly

\[
(1,2)^K.
\tag{34}
\]

Indeed, at pair boundaries and intermediate states one has

\[
z_i=2\cdot8^{K-i}9^i-5,
\qquad
o_i=3\cdot8^{K-i}9^i-7,
\tag{35}
\]

and

\[
z_i\xrightarrow{1}o_i\xrightarrow{2}z_{i+1}.
\tag{36}
\]

Every prefix is a strict barrier, since

\[
2^{A_{2i}}=8^i<9^i=3^{2i},
\qquad
2^{A_{2i+1}}=2\cdot8^i<3\cdot9^i=3^{2i+1}.
\tag{37}
\]

Also (z_i,o_i\ge n_K), so (n_K) is the strict minimum of the finite
orbit segment. There are no nontrivial one-step lower siblings because all
exponents are (1) or (2).

This family also passes the finite versions of the stationary and decoder
constraints with considerable room. For every (0\le t\le2K),

\[
\frac{x_t2^{A_t}}{3^t}<n_K+5=2^{3K+1}.
\tag{38}
\]

After the first exponent-(2) reset, every decoder value is at most (1).
Finally,

\[
\sum_{t=0}^{2K}\frac1{x_t}
\le\frac{2K+1}{n_K}\longrightarrow0.
\tag{39}
\]

For even (K), one has (3\mid n_K). Moreover, the greedy predecessor
map (R) reverses (36) exactly and then stops at (n_K), since a multiple
of (3) has no positive accelerated predecessor. Thus additional greedy
inverse depth does not find an asynchronous seed below (n_K) anywhere in
this finite block.

Equations (33) to (39) give arbitrarily long exact ordinary-integer windows
with a global prefix minimum, every strict prefix barrier, normalized height
within (5/n_K) of its minimum possible ratio, vanishing reciprocal mass,
bounded decoder depth, and no sibling opportunity. The seed changes with
(K). Therefore this does not construct one infinite Collatz counterexample.
It proves that no bounded-window combination of the stated ingredients can
close the argument.

## 7. Long-orbit regression

The exact script checks three previously retained long finite orbits. Depths
count accelerated steps, and a sibling event is recorded at its source index
(j).

| Seed | First state below seed | First barrier failure | First sibling below seed |
| ---: | ---: | ---: | --- |
| (27) | depth (37), state (23) | depth (37) | (61\xrightarrow{a=3}23), sibling (15) |
| (1126015) | depth (141), state (98137) | depth (141) | (33497429\xrightarrow{a=10}98137), (m=3) sibling (523397) |
| (150015) | depth (57), state (23783) | depth (57) | at (j=46), (2252405\xrightarrow{a=5}211163), (m=2) sibling (140775) |

The seed (150015) shows that asynchronous sibling descent can be detected
before the actual orbit falls below its start. The seed (1126015) shows the
opposite limitation: a strict-barrier, sibling-safe prefix can survive for
(140) accelerated steps before both mechanisms fail at the next step.

The retained checker is `async_sibling_probe.js`, and its exact output is
`async_sibling_probe.out`. It uses only integer arithmetic and verifies every
displayed valuation, endpoint equality, barrier inequality, height inequality,
decoder bound, and minimal-predecessor reversal.

| File | SHA-256 |
| --- | --- |
| `async_sibling_probe.js` | `2D0CBA27E29A93FB585666A0124EC0D0B516558930F1939BC22E9778734E2E2D` |
| `async_sibling_probe.out` | `A3312957FAAA82FB0794F466193475109D901E31E3741A03DD7E210C31C5D844` |

## 8. Exact obstruction and the missing estimate

The route does not close. Its strongest one-step target is now explicit:

\[
\boxed{
\text{force some }j\text{ with }
x_{j+1}\equiv2\pmod3
\text{ and }
x_{j+1}<\frac{3n+1}{2}.
}
\tag{40}
\]

Such a state has the smaller asynchronous seed

\[
R(x_{j+1})=\frac{2x_{j+1}-1}{3}<n.
\]

In stationary variables, a sufficient high-spike target is

\[
\boxed{
2d_j\ge S_j+\log_2(\mathcal K/n)
}
\tag{41}
\]

for some (j). Equation (19) would then put the stationary height of the
deepest sibling at most (n), forcing the sibling itself below (n).
Neither the strict barrier nor finite \(\mathcal K\) proves (41). The barrier
only controls (a_j) from above, and it permits infinite symbolic words over
(\{1,2\}) with positive surplus. Decoder control does not help, since the
letter (2) resets the decoder and produces no sibling.

A genuinely asynchronous extension is to iterate (R). Every defined value
(R^s(x_j)) coalesces into the orbit after (s) steps, so leastness forces

\[
R^s(x_j)\ge n
\tag{42}
\]

until the reverse chain reaches a multiple of (3). A proof could close the
divergent branch by showing that some orbit endpoint has a reverse chain which
crosses below (n) before that stopping event. The family (33), with even
(K), shows that no finite-depth version is valid.

Therefore the missing input is a global estimate on one fixed ordinary ray.
It must force at least one of the following:

1. a low return in the residue class (2\pmod3), as in (40);
2. an odd valuation spike which reaches the stationary budget in (41); or
3. an unbounded minimal-predecessor chain which crosses below (n) before
   reaching a multiple of (3).

Finite stationary height, scalar reciprocal convergence, strict barriers,
and bounded decoder values do not provide any of these conclusions. In the
eventually periodic branch, equality in (4) merely exposes a positive cycle,
so an independent denominator-one cycle argument is still required.

In other words, the sibling observation gives a clean local forbidden strip
and a useful early descent detector. The remaining step is not another local
inequality. It is a fixed-seed recurrence theorem forcing the orbit, or one
of its minimal inverse chains, into that strip.
