# Synchronization, terminal shadows, and the exact remaining Collatz obligations

## Status

This is an audit and a collection of exact reductions.  It is **not** a proof
of the Collatz conjecture.  Its main new contribution is a min--plus
formulation which puts the competing-ancestor (G/F) construction and the
terminal (3x-1) shadows into one object.  It also gives a precise quantitative
bridge from a target-(1) terminal/barrier block to a smaller coalescing
ancestor, and records exactly when that bridge contradicts a least
counterexample.

Throughout,

\[
 U_+(n)=\frac{3n+1}{2^{v_2(3n+1)}},\qquad
 U_-(m)=\frac{3m-1}{2^{v_2(3m-1)}}
\]

on positive odd integers.  For a word
(w=(a_0,\ldots,a_{r-1})), put

\[
 A_0=0,\quad A_k=\sum_{i<k}a_i,\qquad
 C_0=0,\quad C_{k+1}=3C_k+2^{A_k}.
\]

Write (A(w)=A_r), (C(w)=C_r), (P_r=3^r), and
(Q_w=2^{A(w)}).  The exact affine identities are

\[
 Q_w U_+^r(n)=P_rn+C(w),\qquad
 Q_w U_-^r(m)=P_rm-C(w).                 \tag{1}
\]

## 1. What the two papers actually establish

### 1.1 The original rewrite paper

Yolcu--Aaronson--Heule encode the shortcut Collatz map by an eleven-rule
mixed binary--ternary string-rewriting system.  On canonical strings,
termination of the full system is equivalent to Collatz convergence.  They
also prove termination of **each** of the eleven systems obtained by deleting
one rule.  Consequently, the precise residual rewrite obligation can already
be expressed as relative termination of any chosen rule in the presence of
the other ten.  Choosing the odd dynamic rule

\[
 E:\mathtt{t.}\longrightarrow\mathtt{2.}
\]

is arithmetically natural.

The original paper therefore did more than show that a few auxiliary rules
terminate.  In particular, deletion of (E) already had a one-dimensional
matrix-interpretation certificate.  Any comparison with the later ordinal
paper must retain this point.

### 1.2 The ordinal-terminal paper

The later manuscript gives the transparent rank

\[
 \Psi=\omega^2q+\omega I+b<\omega^3,       \tag{2}
\]

which decreases under the other ten rules.  Its novelty is the simplicity and
semantic transparency of the certificate, not the bare fact that the
ten-rule deletion terminates.

The manuscript's genuinely new arithmetic component is instead:

1. suffix locality modulo (3^r);
2. exact duality between a target-(1) terminal word and a positive
   (U_-)-trajectory ending at (1);
3. strict-record and activation identities for a shortest nontrivial
   terminal/barrier word;
4. exact structural restrictions and exhaustive finite verification.

The ten-rule subsystem in fact has a unique normal form on canonical strings:
the binary numeral for the odd part of the represented integer.  Thus one
(E)-step followed by any complete ten-rule normalization is exactly one
accelerated (U_+)-step.  Even without complete normalization between two
occurrences of (E), the number of terminal-zero erasures records the exact
valuation.  Hence the remaining semantic graph is already the deterministic
map (U_+).  Rewrite nondeterminism is no longer the obstruction.

### 1.3 The exact logical residue

If (H) is a well-founded macro-rank satisfying

\[
 H(U_+(n))<H(n)\qquad(n>1),               \tag{3}
\]

then (\omega^3H+\Psi) ranks every rewrite.  Conversely, if Collatz is true,
accelerated hitting time is a natural-valued (H).  Thus no taller ordinal is
needed extensionally.  The missing object is a finitely described arithmetic
certificate for (3), or a blockwise substitute for it.

## 2. Target shadows with all parity and positivity conditions

The following theorem is the cleanest common language for terminal duality,
competing ancestors, and input synchronization.

### Theorem 2.1 (target-shadow parametrization)

Let (X,y) be positive odd integers, let (r\ge1), and suppose

\[
 P_r\mid X+y.
\]

Put

\[
 s=\frac{X+y}{P_r}.                           \tag{4}
\]

Then (s) is a positive **even** integer.  For every exact (U_-)-path

\[
 \mu_0\xrightarrow{b_0}\mu_1\xrightarrow{b_1}\cdots
 \xrightarrow{b_{r-1}}\mu_r=y,               \tag{5}
\]

put (B=\sum b_i) and

\[
 z=2^Bs-\mu_0.                                 \tag{6}
\]

Then (z) is odd.  Moreover,

\[
 z>0
 \quad\Longleftrightarrow\quad
 z\xrightarrow{b_0}\cdots\xrightarrow{b_{r-1}}X
 \text{ is an exact positive }U_+\text{-path}.       \tag{7}
\]

Every positive odd length-(r) ancestor of (X) arises uniquely in this
way.

#### Proof

The numerator (X+y) is even and (P_r) is odd, so (s) is even.  Iterating
the (U_-) identities in (5) gives

\[
 P_r\mu_0=C(v)+2^By,                           \tag{8}
\]

where (v=(b_0,\ldots,b_{r-1})).  Hence

\[
 \begin{aligned}
 P_rz+C(v)
 &=P_r(2^Bs-\mu_0)+C(v)\\
 &=2^B(P_rs-y)=2^BX.
 \end{aligned}                                  \tag{9}
\]

Since (2^Bs) is even and (mu_0) is odd, (z) is odd.  If (z>0),
equation (9), together with the suffix recursions in (5), gives positive odd
intermediate values satisfying

\[
 3z_i+1=2^{b_i}z_{i+1}.
\]

Oddness of (z_{i+1}) makes every exponent exact.  Conversely, if a positive
path with word (v) ends at (X), then (1) and (P_rs=X+y) force (6), while
(8) is precisely targeted terminal duality.  This also proves uniqueness.
\(\square\)

### Canonical target and gauge invariance

There is a unique odd (y\in\{1,3,\ldots,2P_r-1\}) satisfying

\[
 y\equiv-X\pmod {P_r}.                         \tag{10}
\]

It may be used as a canonical target.  Replacing it by

\[
 y'=y+2P_rt,qquad s'=s+2t
\]

replaces the shadow start belonging to a word (v) by

\[
 \mu'_0=\mu_0+2^{B+1}t.
\]

Therefore

\[
 2^Bs'-\mu'_0=2^Bs-\mu_0.                     \tag{11}
\]

All positive costs are unchanged.  Varying the positive target inside the
same residue class is thus a gauge choice, not new arithmetic freedom.

## 3. The min--plus theorem

For fixed (r,y,s), let (\mathcal V_r(y)) be the set of exact positive
(U_-)-paths of length (r) ending at (y).  Give
(v\in\mathcal V_r(y)) the cost

\[
 \mathcal C_s(v)=2^{A(v)}s-\mu_0(v).            \tag{12}
\]

Theorem 2.1 says that the positive costs are exactly the positive
length-(r) (U_+)-ancestors of (X=P_rs-y).

### Theorem 3.1 (least-counterexample variational principle)

Suppose (n) is the globally least positive odd integer whose (U_+)-orbit
does not reach (1), and put (X=U_+^r(n)).  Choose (y,s) by (4).  Then

\[
 n=\min\{\mathcal C_s(v)>0:v\in\mathcal V_r(y)\}.     \tag{13}
\]

For a later block beginning at (x_j=U_+^j(n)) and ending at
(x_{j+r}), the corresponding assertion is only

\[
 \min\{\mathcal C_s(v)>0:v\in\mathcal V_r(y)\}\ge n. \tag{14}
\]

The later block start (x_j) need not minimize the costs.

#### Proof

The actual word supplies the cost (n) in the prefix case.  Every other
positive cost is a positive ancestor which merges into the nonterminating
orbit at (X), and is therefore itself nonterminating.  Global minimality
forces it to be at least (n).  The same argument for a later block gives
only (14), because the actual cost there is (x_j\ge n). \(\square\)

### Exact Bellman recursion

Let (\mathscr S_r(y;s)) denote the set of all integer costs, before
restricting to positive ones.  Peeling the final exponent gives

\[
 \mathscr S_0(y;s)=\{s-y\},                    \tag{15}
\]

and

\[
 \mathscr S_r(y;s)
 =\bigcup_{\substack{b\ge1\\3\mid2^by+1}}
 \mathscr S_{r-1}\!\left(\frac{2^by+1}{3};\,2^bs\right). \tag{16}
\]

Indeed, the last (U_-)-step has predecessor
(t_b=(2^by+1)/3), and a prefix ending at (t_b) has the same root cost
when its scale parameter is changed from (s) to (2^bs).

This is an exact min--plus dynamic program on the reverse (U_-)-tree.  The
remaining theorem is not the recursion but the exclusion of an infinite
nested sequence in which the actual prefix realizes the least positive cost
at every depth.

### Nested coalescence minima

For any positive orbit (x_r=U_+^r(n)), define

\[
 M_r(n)=\min\{z>0:U_+^r(z)=x_r\}.               \tag{17}
\]

Appending the actual next exponent to every competing word gives

\[
 M_{r+1}(n)\le M_r(n)\le n.                     \tag{18}
\]

Thus (M_r(n)) is a nonincreasing sequence of positive integers and
eventually stabilizes.  A globally least counterexample satisfies

\[
 M_r(n)=n\qquad(r\ge0).                          \tag{19}
\]

This is the exact finite-input version of a stationary Bellman code.  It is
stronger and safer than asymptotic slope optimization.

## 4. Equal-length shadow comparison and marked carries

Let (w,v\in\mathcal V_r(y)), with totals (A\ge B), shadow starts
(\mu,\nu), and put (c=A-B).  Their plus ancestors at the same endpoint
are

\[
 n_w=2^As-\mu,\qquad n_v=2^Bs-\nu.              \tag{20}
\]

Targeted divisibility gives the exact paired compatibility identity

\[
 C(w)-2^cC(v)=P_r(\mu-2^c\nu).                  \tag{21}
\]

Define the marked center

\[
 h=\mu-2^c\nu.                                  \tag{22}
\]

Then

\[
 \boxed{\ n_w+h=2^c n_v\ }.                    \tag{23}
\]

Consequently (v) is a positive strict descent from (n_w) exactly when

\[
 -n_w<h<(2^c-1)n_w.                              \tag{24}
\]

It descends below a global least counterexample (n\le n_w) exactly when

\[
 -n_w<h<2^cn-n_w.                                \tag{25}
\]

For (A=B), equation (20) gives the clean rule

\[
 n_v<n_w\quad\Longleftrightarrow\quad \nu>\mu. \tag{26}
\]

For (A>B), the exact rule is

\[
 n_v<n_w
 \quad\Longleftrightarrow\quad
 (2^A-2^B)s>\mu-\nu,                             \tag{27}
\]

together with (2^Bs>\nu) for positivity.  Smaller total exponent wins only
asymptotically in (s); it need not win at a fixed endpoint.

### Counterexample to unconditional exponent ordering

At endpoint (X=1) and depth (r=4),

\[
 (6,2,2,2):21\longmapsto1,qquad A=12,
\]

while

\[
 (1,1,5,4):23\longmapsto1,qquad B=11.
\]

Take (y=161), so (X+y=3^4\cdot2).  The shadow starts are

\[
 \mu=2^{12}\cdot2-21=8171,qquad
 \nu=2^{11}\cdot2-23=4073.
\]

The larger-exponent word has the **smaller** positive ancestor.  Thus the
lexicographic order by total exponent and shadow start is an asymptotic
Bellman order, not a finite-input theorem.

### Line-envelope interpretation

Every shadow word gives the affine line

\[
 \ell_v(s)=2^{A(v)}s-\mu_0(v).                   \tag{28}
\]

At the actual even (s), the lower positive envelope is the least positive
ancestor.  Intersections of these lines are precisely the archimedean
cutoffs in the (G/F) framework.  The slope (2^{A(v)}) is dyadic; the
intercept is the marked (U_-)-shadow start.  This is the promised exact
unification of terminal (3)-adic compatibility with prefix-dependent
archimedean comparison.

## 5. Target (1), the all-ones competitor, and a quantitative bridge

Suppose (w) is target-(1) terminal and satisfies the strict prefix
barriers

\[
 2^{A_k}<3^k\qquad(1\le k\le r).                \tag{29}
\]

Write

\[
 A(w)=r+E,qquad E\ge1,qquad
 \mu=\frac{C(w)+2^{A(w)}}{3^r}.                 \tag{30}
\]

The activation identity, which does not require global shortest-word
minimality, gives

\[
 \mu-1=\sum_{j=1}^{E}2^{j-1}\left(\frac23\right)^{t_j}, \tag{31}
\]

where (t_j) is the first prefix at which the (j)-th unit of excess has
appeared.  Since the barrier gives (j<\beta t_j),
(\beta=\log_2(3/2)), every summand is (<1/2).  Hence

\[
 0<\mu-1<\frac E2,qquad \mu<2^E.               \tag{32}
\]

The all-ones word (v=1^r) is also target-(1) terminal, has total exponent
(r), and has shadow start (1).  If (w) occurs on a positive plus block,
Theorem 2.1 writes its endpoint and start as

\[
 X=3^rs-1,qquad x=2^{r+E}s-\mu,                \tag{33}
\]

where (s\ge2) is even.  The all-ones word reaches the same endpoint from

\[
 z=2^rs-1.                                      \tag{34}
\]

It is always positive, and

\[
 x-z=2^r(2^E-1)s-(\mu-1)>0.                    \tag{35}
\]

Thus every positive realization of a nontrivial target-(1)
terminal/barrier word has a smaller positive coalescing ancestor.

### Corollary 5.1 (prefix synchronization is enough)

If (n) is a globally least Collatz counterexample, no nontrivial
target-(1) terminal/barrier word can occur as a prefix beginning at (n).

Indeed, (35) gives (0<z<n) and (z) merges into the nonterminating orbit.

### Corollary 5.2 (exact later-block condition)

Suppose the same block begins later, at (x_j\ge n).  Its all-ones ancestor
is

\[
 z=\frac{x_j+\mu-2^E}{2^E}.                    \tag{36}
\]

It contradicts global minimality exactly when

\[
 x_j<2^E(n+1)-\mu.                              \tag{37}
\]

The simple sufficient condition

\[
 x_j\le2^En                                     \tag{38}
\]

implies (37), because (\mu<2^E).

This prefix/later-block distinction is essential.  The inequality (z<x_j)
alone does **not** contradict minimality: a later coalescing ancestor may lie
between (n) and (x_j).

### Consequence for proof architecture

There are now two different ways a target-(1) synchronization theorem could
be used.

1. **Local-exclusion route.**  Prove that the only terminal/barrier word is
   (1^r), and prove that a counterexample must generate a non-all-ones one.
2. **Direct-compression route.**  Do not prove all-depth word exclusion.
   Instead force a nontrivial terminal/barrier prefix from the least
   counterexample, or a later block satisfying (37).  The all-ones competitor
   then gives the contradiction directly.

The second route removes the pure residue theorem from the dependency graph,
but asks for a quantitatively stronger input-synchronization statement.

## 6. The (G/F) framework: what must not be conflated

The existing (F_j,G_j,\Theta(j)) computations concern words with compatible
competitors and the cutoffs beyond which those competitors become positive
descents.  Three notions should be separated.

1. **Structural/asymptotic elimination.**  A competitor has better slope (or
   equal slope and better intercept), so it wins beyond some cutoff.
2. **Finite-input elimination at (M).**  The actual value of the competing
   line at the relevant parameter is positive and (<M).
3. **Stationary realization.**  The nested dyadic representatives of one ray
   eventually stabilize at one positive ordinary integer.

An asymptotically eliminated word can remain viable below its cutoff.  The
exact length-(42) cutoff (814) demonstrates that no very small uniform
cutoff follows from suffix compatibility.  Conversely, an infinite Bellman
ray can represent a negative rational or a nonintegral (2)-adic value rather
than a positive input.

For a fixed (M), the relevant survivor tree is therefore

\[
 \mathcal G_r(M)=
 \{w:\text{no positive length-}r\text{ competitor into its endpoint is }<M\},
                                                        \tag{39}
\]

evaluated at the actual endpoint parameter, not merely in the limit
(s\to\infty).  A least counterexample determines a ray in every
(\mathcal G_r(n)).  Proving extinction of positive stationary rays in these
finite-input trees is a complete global target; proving extinction of all
abstract (2)-adic rays is false and unnecessary.

## 7. Marked-carry routes and precise stress tests

### Route A: the finite-input lower envelope

Attack (19) directly.  The shadow lines (28) form a min--plus envelope, and
prefix extension embeds the old ancestor set into the new one.  The desired
statement is that a positive stationary minimum cannot persist forever
outside (1).

This route is not blocked by the nonintegral retained ray
((1,1,2)^\infty): its nested seed representatives do not stabilize at a
positive ordinary integer.

**Missing lemma.**  Eventual zero high-bit injection on the actual dyadic seed
must force a strict drop of the positive shadow envelope.

### Route B: marked paired carries

Use the exact state ((c,h)) from (22)--(23), rather than a fixed modulus.
For a prefix from a least counterexample, the target region is the open cone

\[
 -n<h<(2^c-1)n.                                  \tag{40}
\]

For a later block beginning at (x_j), it is

\[
 -x_j<h<2^cn-x_j.                               \tag{41}
\]

A pushdown or Euclidean state may store the unbounded adic debt created by
long negative-cycle shadows.  This survives the fixed-modulus and
finite-state pumping no-go results.

### Route C: target-(1) direct compression

Prove a rate-matched recurrence theorem producing a terminal/barrier block
whose start satisfies (37).  The reverse-shadow arithmetic needed after that
point is already complete by Section 5.

This route needs only one suitable block, not terminal words at all depths.
It is nevertheless stronger than ordinary (3)-adic compactness, which does
not match the modulus (3^r) to the block length.

### Route D: minimal reverse branch with dead-state markers

For (t\not\equiv0\pmod3), define the smallest positive (U_+)-preimage

\[
 R(t)=
 \begin{cases}
 (2t-1)/3,&t\equiv2\pmod3,\\
 (4t-1)/3,&t\equiv1\pmod3.
 \end{cases}                                      \tag{42}
\]

All other one-step preimages are

\[
 4^kR(t)+\frac{4^k-1}{3}\qquad(k\ge0).          \tag{43}
\]

The smallest immediate branch is not a complete greedy algorithm: for
(X=5), it gives (R(5)=3), after which no further inverse exists, whereas

\[
 17\xrightarrow{2}13\xrightarrow{3}5
\]

is a valid two-step inverse path.  Thus a greedy proof must mark the times at
which the smallest branch hits a multiple of (3), and carry alternative
adic information past those deaths.

There is computational evidence for the narrower statement that, whenever
(R^r(X)) is defined, it is the least positive length-(r) ancestor.  It is
elementary for (r\le2), but no all-depth proof is supplied here.  Its hard
case is exactly the discharge of the carry in (43) across a long string of
small inverse steps.

### Route E: periodic-code exclusion

If a valuation ray is periodic with period word (w), its (2)-adic seed
(\xi) satisfies

\[
 (2^{A(w)}-3^{|w|})\xi=C(w).                   \tag{44}
\]

If every period prefix satisfies the strict barrier, then
(2^{A(w)}<3^{|w|}), so (\xi<0).  Therefore a positive ordinary input
cannot have an eventually periodic infinite strict-barrier word.  This
rigorously removes periodic finite-state survivors, but not aperiodic ones.

### Route F: two-terminal-prefix rigidity

If a barrier word has target-(y) terminal prefixes at lengths (r) and
(r+\ell), the known divisibility comparison forces the intervening word to
be a positive (U_-)-cycle whenever

\[
 \frac{\ell}{3\,2^r}+\frac{y}{2^r}+\frac{y}{3^r}<1. \tag{45}
\]

Thus subexponentially spaced terminal recurrence produces precisely a
periodic negative shadow.  A synchronization proof must either change starts,
use the quantitative cone (41), or carry enough stack data to quotient these
periodic shadows.

### Route G: critical linear escape and close returns

If no arbitrarily long barrier block occurs, the coefficient-height lemma
gives at-most-linear orbit growth.  A linearly bounded injective orbit has
many bounded additive gaps by pigeonhole.  The signed charge theorem would
become applicable if one could align one of these close returns with a
proper coefficient-barrier block and show that its number of marked
activations exceeds the gap.

Neither alignment follows from pigeonhole alone.  Moving the start to a
coefficient record changes the two numerical endpoints, and sparse large
exponents can concentrate many units of excess into few marked positions.
This route therefore isolates a real lemma rather than completing it.

### Route H: cycle-specific min--plus resultants

A positive (U_+)-cycle has

\[
 (2^A-3^r)n=C(w)>0,                              \tag{46}
\]

so its complete word has the opposite total inequality from a barrier word.
The terminal/barrier program cannot exclude it.  In min--plus language, a
least positive cycle point would generate a stationary minimum (19) around
every repetition.  Cycle exclusion is therefore equivalent to finding a
strictly cheaper compatible shadow line for some repeated cycle endpoint, or
to excluding (46) by independent cycle arithmetic.

This obligation is automatically included in a proof of finite-input
stationary-envelope extinction, but must be added separately to any proof
using only long barrier blocks.

## 8. A clean conditional completion theorem

### Theorem 8.1 (quantitative synchronization criterion)

Assume:

1. (U_+) has no positive periodic orbit other than (1);
2. if (n) is a globally least unbounded nonconvergent orbit, then its orbit
   contains a nontrivial target-(1) terminal/barrier block of excess (E),
   beginning at (x_j), such that
   
   \[
   x_j\le2^En.                                    \tag{47}
   \]

Then every positive Collatz orbit reaches (1).

#### Proof

A bounded nonterminating orbit is periodic and is excluded by (1).  An
unbounded counterexample has a globally least starting value (n).  By (2)
and Corollary 5.2, the all-ones word supplies a positive ancestor
(z<n) which coalesces into the nonterminating orbit, contradicting the
choice of (n). \(\square\)

The theorem makes the tradeoff exact.  It replaces the all-depth pure residue
theorem by the growth-matched condition (47).  If one cannot force (47), the
older architecture remains available:

\[
 \text{cycle exclusion}
 +\text{all-depth terminal-word exclusion}
 +\text{nonperiodic synchronization}.
\]

### Theorem 8.2 (stationary min--plus criterion)

The Collatz conjecture is equivalent to the assertion that, for every odd
(n>1), there is an (r\ge1) such that

\[
 M_r(n)<n.                                         \tag{48}
\]

#### Proof

If (48) holds, strong induction on (n) applies: a smaller positive ancestor
of (U_+^r(n)) converges, hence the common endpoint and then (n) converge.
Conversely, if (n) reaches (1) after (r) accelerated steps, the fixed
point (1) is a length-(r) ancestor of the same endpoint, so
(M_r(n)=1<n). \(\square\)

This criterion includes positive cycles and divergent orbits in one theorem.
Its content is exactly the missing stationary-envelope extinction, not a
claim that the present min--plus recursion already proves it.

## 9. Dependency graph for a journal paper

The rigorous dependencies should be displayed as follows.

```text
Original eleven-rule simulation
        |
        +--> ten-rule termination / unique normal form --+
        |                                                |
        +--> exceptional phases = exact U_+ steps -------+--> macro Collatz graph
                                                             |
                         affine word identities -------------+
                                  |
                    targeted terminal duality
                                  |
              target-shadow parametrization (Theorem 2.1)
                                  |
                     min-plus costs / marked center
                         /                    \
        finite-input G/F envelope       target-1 all-ones bridge
                  |                              |
       stationary-envelope extinction     quantitative synchronization
                  |                              |
                  +---------- cycle handling ----+
                                  |
                              Collatz
```

The all-depth pure residue/charge theorem is a strong optional branch:

```text
activation identity + changing determinant
                 |
       pure residue/charge theorem
                 |
 all-depth nontrivial terminal-word exclusion
                 |
       nonperiodic synchronization
                 |
  unbounded-orbit exclusion (cycles still separate)
```

It should not be presented as logically necessary once the direct all-ones
compression theorem and condition (47) are available.

## 10. Suggested journal-style paper outline

1. **Introduction and scope.**  State explicitly that the paper gives exact
   reductions and conditional completion criteria, not a Collatz proof.
2. **Rewrite macrosemantics.**  Briefly compare the original deletion
   certificates with the transparent ordinal rank; prove unique normal form
   and schedule-independent accelerated labels.
3. **Affine words and targeted duality.**  Give (1) and the arbitrary-target
   terminal theorem.
4. **Target shadows as a min--plus inverse tree.**  Prove Theorems 2.1 and
   3.1, gauge invariance, recursion (16), and nested minima (18).
5. **Paired carries and finite-input comparison.**  Prove (21)--(27), include
   the endpoint-(1) counterexample to unconditional exponent ordering, and
   identify the (G/F) cutoffs with line intersections.
6. **The all-ones compression theorem.**  Prove the activation bound without
   shortest-word minimality, then Corollaries 5.1--5.2.
7. **Synchronization and no-go results.**  Separate prefixes from later
   blocks, fixed input from abstract (2)-adic rays, and rate-matched
   recurrence from ordinary compactness.
8. **Cycles.**  Explain why positive cycles have (2^A>3^r), why barrier
   extraction misses them, and how the stationary min--plus criterion would
   include them.
9. **Conditional completion theorems.**  State Theorems 8.1--8.2 and the
   alternative all-depth-residue architecture.
10. **Computational appendix.**  Keep exact searches clearly separated from
    proofs; include test vectors for (20)--(27), the greedy-death example,
    and hashes of any checker used.

## 11. Bottom line

The best new bridge is not another ordinal and not a fixed-modulus automaton.
It is the exact min--plus identity

\[
 \boxed{\mathcal C_s(v)=2^{A(v)}s-\mu_0(v)},
\]

which identifies every positive inverse ancestor with a positive
(U_-)-shadow cost.  A least counterexample must remain the least positive
cost at every prefix depth.  The target-(1) all-ones word gives an explicit
cheaper line whenever a nontrivial terminal/barrier block is synchronized
early enough, quantified by (37)--(38).

What remains open is an input theorem forcing a positive stationary code to
leave this lower envelope, or forcing a block into the all-ones compression
cone.  Positive cycles are either handled by that global min--plus theorem or
must be excluded independently.  No stronger foundational system removes
these arithmetic obligations.
