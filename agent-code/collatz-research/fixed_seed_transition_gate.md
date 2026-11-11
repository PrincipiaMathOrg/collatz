# Transition relocation and the remaining fixed-seed datum

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** We do not obtain descent from transition density. We prove that
finite reciprocal mass relocates abundant transitions to increasing
coefficient heights. We also construct a transition-dense, high-complexity
inverse-limit word with convergent reciprocal mass whose every finite
ordinary realization has decoder depth one after the first reset, and whose
dyadic representatives are forced not to stabilize. Every finite part
has an exact post-stabilization positive realization. Thus transition density
does not bridge HSCI. The remaining datum is uniform ordinary stabilization,
equivalently one fixed positive representative and one fixed stationary
constant at every scale.

## 1. Fixed-ray transition relocation

Let

\[
x_{j+1}=\frac{3x_j+1}{2^{a_j}},\qquad
A_j:=\sum_{i<j}a_i,\qquad
\alpha:=\log_2 3,
\]

be one normalized injective ray beginning at the positive odd seed \(n\).
Put

\[
q_j:=\frac{3^j}{2^{A_j}},\qquad
c_j:=\lfloor j\alpha\rfloor-A_j,
\qquad
H_j:=\frac{x_j}{q_j}.
\tag{1.1}
\]

We assume the strict barriers \(q_j>1\), the stationary bound

\[
\mathcal K:=\sup_j H_j<\infty,
\tag{1.2}
\]

and the reciprocal identity

\[
R:=\sum_{j=0}^{\infty}\frac1{q_j}
=3(\mathcal K-n)<\infty.
\tag{1.3}
\]

The purpose of this section is to determine what transition abundance does
when it is combined with the fixed-ray condition (1.3).

### Theorem 1. Low-height occupation bound

For every integer \(C\geq0\),

\[
\boxed{
\#\{j\geq0:c_j\leq C\}<2^{C+1}R.}
\tag{1.4}
\]

**Proof.** Write \(\theta_j:=\{j\alpha\}\). Equation (1.1) gives

\[
q_j=2^{c_j+\theta_j},
\qquad
2^{c_j}\leq q_j<2^{c_j+1}.
\tag{1.5}
\]

Every index counted on the left side of (1.4) therefore contributes more
than \(2^{-C-1}\) to the sum in (1.3). The conclusion follows. \(\square\)

In particular, every fixed coefficient height occurs only finitely often.
This conclusion uses the stationary constant on one ray. It is not a
finite-word statement.

For \(s\geq1\), define

\[
T_s:=\#\{0\leq j<s:c_{j+1}\neq c_j\}.
\tag{1.6}
\]

### Theorem 2. Transition relocation

Suppose \(T_s\geq4R\), and put

\[
C_s:=\left\lfloor\log_2\left(\frac{T_s}{4R}\right)\right\rfloor.
\tag{1.7}
\]

Then more than \(T_s/2\) transition starts \(j<s\) satisfy

\[
\boxed{
c_j>C_s,
\qquad
x_j>\frac{nT_s}{4R}.}
\tag{1.8}
\]

**Proof.** By Theorem 1, the number of all indices with \(c_j\leq C_s\)
is less than

\[
2^{C_s+1}R\leq\frac{T_s}{2}.
\]

Thus more than half of the transition starts have \(c_j>C_s\). Also
\(H_j\geq n\), since the affine identity gives

\[
H_j=n+\frac13\sum_{i<j}\frac1{q_i}.
\tag{1.9}
\]

For every selected start, equations (1.5) and (1.7) give

\[
x_j=q_jH_j
\geq n2^{c_j}
\geq n2^{C_s+1}
>\frac{nT_s}{4R}.
\]

This proves (1.8). \(\square\)

If \(T_s\geq\gamma s\) on a tail, Theorem 2 places at least
\(\gamma s/2\) of the first \(s\) transition starts above a state of order
\(s\). If only the unconditional bound \(T_s\gg\sqrt s\) is used, it places
\(\gg\sqrt s\) transition starts above states of order \(\sqrt s\).
Therefore, transition density does not force a return to a bounded descent
interval. In the presence of reciprocal-mass convergence, the transitions
move outward.

## 2. A transition-dense inverse-limit countermodel

We now show that all of the scalar and symbolic conclusions used above are
compatible with failure of ordinary stabilization. Put

\[
\beta:=\alpha-1,
\qquad
\delta:=\beta-\frac7{12}
=\alpha-\frac{19}{12}>0.
\tag{2.1}
\]

Consider the two words

\[
\begin{aligned}
w_0&:=(2,1,2,1,2,1,2,1,2,1,2,2),\\
w_1&:=(2,1,2,1,2,1,2,1,2,2,1,2).
\end{aligned}
\tag{2.2}
\]

Both words have length (12), total exponent (19), begin and end in
(2), and contain no adjacent letters (1). Also

\[
3^{12}-2^{19}=7153>0.
\tag{2.3}
\]

Let \(\varphi(0):=w_0\), \(\varphi(1):=w_1\), and prepend the buffer

\[
p:=(1,2)^3.
\tag{2.4}
\]

A direct check of the prefixes in (2.2) shows that every prefix of
\(p\varphi(z)\) is a strict barrier for every finite or infinite binary word
\(z\). The closest initial inequality is \(3^7>2^{11}\), and every complete
codeword then contributes the positive surplus (2.3).

We next choose the driver recursively. Let \(d_m\) be a finite binary de
Bruijn word containing every binary word of length \(m\). Suppose that a
finite valuation prefix \(W_{m-1}\) and its least positive cylinder
representative \(n_{m-1}:=\rho(W_{m-1})\) have been chosen. Consider

\[
W_m^{(\epsilon)}
:=W_{m-1}\varphi(d_m\epsilon),
\qquad \epsilon\in\{0,1\}.
\tag{2.5}
\]

The two extensions in (2.5) are distinct and have the same length and total
exponent. Their exact dyadic cylinders are therefore disjoint. In
particular, at most one of their representatives can equal \(n_{m-1}\).
Choose \(\epsilon_m\) so that

\[
n_m:=\rho(W_m^{(\epsilon_m)})\neq n_{m-1},
\qquad
W_m:=W_m^{(\epsilon_m)}.
\tag{2.6}
\]

Cylinder compatibility gives

\[
n_m=n_{m-1}+k_m2^{A(W_{m-1})+1},
\qquad k_m\geq1.
\tag{2.7}
\]

Hence \(n_m\to\infty\). The compatible infinite word defines one element of
\(\mathbf Z_2\), but it is not the valuation word of a nonnegative ordinary
integer.

### Theorem 3. Properties of the countermodel

The infinite word produced by (2.4) to (2.7) has the following properties.

1. Every prefix is a strict barrier.
2. Its logarithmic surplus satisfies
   \[
   \log_2q_s=\delta s+O(1).
   \tag{2.8}
   \]
   Consequently \(q_s\to\infty\) and
   \(\sum_s q_s^{-1}<\infty\).
3. If \(c_s:=\lfloor s\alpha\rfloor-A_s\), then
   \[
   c_s=\delta s+O(1),
   \qquad
   \liminf_{s\to\infty}\frac{T_s}{s}\geq\delta>0.
   \tag{2.9}
   \]
4. After the first displayed exponent (2), every exact finite realization
   has decoder depth \(v_3(x_s+1)\leq1\).
5. Its accelerated and shortcut factor complexities satisfy
   \[
   p_a(12m)\geq2^m,
   \qquad
   p_2(19m)\geq2^m
   \quad(m\geq1).
   \tag{2.10}
   \]
6. Its least positive dyadic representatives do not stabilize.

**Proof.** The barrier statement was checked immediately after (2.4).
Every complete codeword has length (12) and exponent (19), so (2.8)
holds uniformly over every driver. The bounded error comes from the fixed
buffer and one incomplete codeword.

Every letter is (1) or (2). Thus each coefficient-height increment has
absolute value at most one. The total number of nonzero increments is at
least the final height, and (2.8) gives

\[
c_s=\log_2q_s-\{s\alpha\}=\delta s+O(1).
\]

This proves (2.9). The words in (2.2) have no adjacent letters (1), while
every \(2\) resets the exact decoder to zero. Equation (P27.2) therefore
gives the decoder bound.

The driver contains \(d_m\), and hence every binary word of length \(m\).
The morphism \(\varphi\) has two distinct equal-length codewords, which
gives the first inequality in (2.10). The shortcut encodings of the two
codewords are also distinct and have the common length (19), which gives
the second inequality. Finally, (2.7) proves the failure of stabilization.
\(\square\)

Theorem 3 is a genuine infinite no-go rather than a collection of unrelated
finite words. On one coherent \(2\)-adic branch it satisfies strict barriers,
linear transition density, exponential factor complexity, and the exact
reciprocal-mass condition. Its finite ordinary realizations have uniformly
bounded decoder depth after the first reset. The branch fails at precisely
one place: its binary lift has infinite support.

## 3. Exact positive finite realizations

The preceding failure cannot be detected on any bounded collection of
scales. Let \(u\) be an arbitrary finite prefix of the word in Theorem 3.
Apply the stabilized-suffix embedding theorem P15 to

\[
v:=(2,u,2).
\tag{3.1}
\]

There is a positive ordinary seed whose strict-barrier prefix contains \(u\)
entirely after the least dyadic representative has stabilized. The leading
(2) in (3.1) resets the decoder, so its depth is at most one throughout
\(u\), and the final \(2\) makes the terminal decoder zero. Since the whole
prefix is a strict barrier, every displayed forward state is larger than the
seed.

Moreover, the height increase across \(u\) is

\[
\lfloor(t+|u|)\alpha\rfloor-\lfloor t\alpha\rfloor-A(u)
=\delta|u|+O(1),
\tag{3.2}
\]

independently of the embedding phase \(t\). Since the height increments have
absolute value at most one, the embedded segment has at least
\(\delta|u|+O(1)\) transitions. The exact algebraic return identities
\(\mathrm{(P21.1)}\)--\(\mathrm{(P21.3)}\), \(\mathrm{(P23.1)}\),
\(\mathrm{(P25.1)}\)--\(\mathrm{(P25.3)}\), and \(\mathrm{(P26.1)}\) hold automatically
whenever the relevant factors occur on this ordinary segment.

Thus no finite theorem combining strict barriers, post-stabilization zero
innovations, transition density, bounded decoder depth, high factor
complexity, or finitely many returned factors can prove descent. The seeds
move with \(u\), so the fixed-seed constants needed by P22 are not uniform.

## 4. The exact remaining datum

The transition route leaves the following dichotomy.

1. On one actual fixed ray, Theorem 2 forces abundant transitions to occur
   at increasingly large states. Density alone supplies no bounded endpoint
   or small inverse ancestor.
2. Without ordinary stabilization, Theorem 3 realizes every scalar and
   symbolic condition at once. Section 3 realizes every finite part after
   stabilization inside a positive strict-barrier segment.

Consequently, the missing fixed-seed datum is not another lower bound for
\(T_s\). It is a uniform restriction on the high binary lift integers. In
the notation of P14, one must use the fact that all sufficiently late
innovation blocks satisfy

\[
\kappa=0
\tag{4.1}
\]

for one fixed representative \(n\), while simultaneously retaining the same
finite stationary constant \(\mathcal K\) at unbounded return scales. An
equivalent target is a recurrence theorem forcing either

\[
\Delta(j,s)>
\log_2\left(\frac{H_j}{n+C_s^{\rm inv}/3^s}\right)
\tag{4.2}
\]

for one surviving greedy inverse chain, or a factor class whose lift
integers violate harmonic thinness. Transition density does not imply either
alternative.

The exact certificate `sync/fixed_seed_transition_gate.js` checks the two
codewords, the universal barrier, decoder depth, de Bruijn factor counts,
height transitions, cylinder compatibility, and strict representative
growth through de Bruijn order (6). It is a regression for the proof, not
the proof of its all-depth statements.

| File | SHA-256 |
| --- | --- |
| `sync/fixed_seed_transition_gate.js` | `5CDBE2397DAD7FCDDE8BFF7592939750243A5AF7EB7EDBC09C36BD3AC35AC73E` |
| `sync/fixed_seed_transition_gate.out` | `D47D34C55CCC482C5E3A6A1F56CFF4BA4CD4673619151A1B762632DB5AE2CBE1` |

## 5. Proof ledger

The following statements are proved.

1. Finite reciprocal mass gives the fixed-ray low-height occupation bound
   (1.4).
2. At least half of sufficiently many transition starts lie above the
   explicit state scale in (1.8).
3. There is one coherent transition-dense, high-complexity strict-barrier
   \(2\)-adic branch with convergent reciprocal mass whose finite ordinary
   realizations have decoder depth one after the first reset, and whose least
   representatives diverge.
4. Every finite part of this branch has an exact post-stabilization positive
   realization satisfying the listed exact algebraic return-lattice
   identities.

No contradiction or descent theorem is proved. The open fixed-seed problem
is to control the innovation or return-lift sequence uniformly at unbounded
scales with one fixed \(n\) and one fixed \(\mathcal K\).

To reiterate, Theorems 1 and 2 are statements about an actual fixed ordinary
ray. Theorem 3 is an explicitly nonordinary \(2\)-adic no-go construction,
not a divergent Collatz orbit.
