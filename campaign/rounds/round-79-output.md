model: GPT-5.6 Pro (Chat mode)
round: 79 -- approach 74, A higher-dimensional sofic certificate
front: proof
sent: 2026-08-16T22:13Z
worked: 42m 2s

---

# Outcome

The proposed approach leads to a **complete conditional proof**, but not yet to an unconditional proof of Collatz. The unresolved point is precise:

> The finite tile alphabet does not by itself give a finite, pumpable state space for complete horizontal cuts of the mixed binary–ternary computation.

I prove below that **any exact finite spliceable quotient with one height coordinate has empty divergent bad language**. The proof is short once that quotient exists: an unbounded-height path forces a positive-drift loop, pumping the loop gives an eventually periodic parity sequence, and its affine fixed point is negative.

What remains unproved is that the unbounded binary seed profile, ternary carry profile, and inverse-fiber order data admit such a quotient. Existing exact computations instead show that weaker finite-state pumping assertions are false. There is also a separate negative-drift language corresponding to possible positive cycles.

As of August 16, 2026, the Collatz conjecture remains listed as open. citeturn942672search5

---

# 1. The exact synchronized language

Use the shortcut map

\[
T(x)=
\begin{cases}
x/2,&x\equiv0\pmod2,\\[1mm]
(3x+1)/2,&x\equiv1\pmod2.
\end{cases}
\]

For an infinite parity sequence

\[
\epsilon=(\epsilon_0,\epsilon_1,\ldots)\in\{0,1\}^{\mathbb N},
\qquad
s_k=\sum_{j=0}^{k-1}\epsilon_j,
\]

define the affine carry by

\[
C_0=0,\qquad
C_{k+1}=3^{\epsilon_k}C_k+\epsilon_k2^k.
\]

Induction gives the exact affine identity

\[
2^kT^k(n)=3^{s_k}n+C_k. \tag{1}
\]

For every prefix, let

\[
\rho_k
=
\left[-3^{-s_k}C_k\right]_{2^k}
=
\left[
-\sum_{j=0}^{k-1}
\frac{\epsilon_j2^j}{3^{s_{j+1}}}
\right]_{2^k},
\qquad 0\le \rho_k<2^k. \tag{2}
\]

Compatibility of the nested residues gives a unique binary digit \(b_k\) such that

\[
\rho_{k+1}=\rho_k+b_k2^k,
\qquad b_k\in\{0,1\}. \tag{3}
\]

Thus

\[
\rho_k=\sum_{j=0}^{k-1}b_j2^j. \tag{4}
\]

Introduce the canonical ternary-side endpoint

\[
z_k=\frac{3^{s_k}\rho_k+C_k}{2^k}. \tag{5}
\]

The exact synchronized recurrence is

\[
b_k\equiv z_k+\epsilon_k\pmod2, \tag{6}
\]

and

\[
z_{k+1}
=
\frac{
3^{\epsilon_k}z_k+\epsilon_k+b_k3^{s_{k+1}}
}{2},
\qquad
0\le z_k<3^{s_k}. \tag{7}
\]

These formulas provide precisely the proposed synchronized tracks:

\[
\boxed{
\begin{array}{c}
\epsilon_k:\text{ parity/branch digit},\\
b_k:\text{ binary seed digit},\\
z_k:\text{ ternary-side carry state},\\
s_k\log3-k\log2:\text{ Archimedean height}.
\end{array}}
\]

The recurrences and range statement are exact. fileciteturn13file0L12-L60

## Proposition 1.1 — Finite binary boundary

The \(2\)-adic integer having parity sequence \(\epsilon\) is a nonnegative ordinary integer if and only if

\[
b_k=0
\quad\text{for all sufficiently large }k. \tag{8}
\]

### Proof

Equation (4) says that the \(b_j\) are exactly the binary digits of the associated \(2\)-adic seed. That seed is an ordinary nonnegative integer precisely when its binary expansion has finite support. ∎

Equivalent formulations are that \(\rho_k\) is eventually constant, that it is bounded, or that \(\rho_k/2^k\to0\). fileciteturn13file0L63-L90

After \(k\) exceeds the largest nonzero binary digit of the seed \(n\), we have \(\rho_k=n\). Equation (5) then becomes

\[
z_k=\frac{3^{s_k}n+C_k}{2^k}=T^k(n). \tag{9}
\]

Moreover, \(b_k=0\) makes (6) say

\[
\epsilon_k\equiv z_k\pmod2,
\]

and (7) reduces exactly to the ordinary Collatz recurrence.

Thus an infinite locally valid mixed-base diagram with eventually zero \(b\)-boundary is not merely symbolic: sufficiently far along it is an actual positive-integer Collatz trajectory.

---

# 2. The height language of divergent counterexamples

Define the logarithmic coefficient height

\[
H_k=s_k\log3-k\log2
=
\log\frac{3^{s_k}}{2^k}. \tag{10}
\]

A divergent positive orbit can be shifted to a time at which its multiplicative coefficient attains its global minimum. For the shifted orbit,

\[
H_k\ge0\qquad(k\ge0), \tag{11}
\]

and in fact

\[
H_k\longrightarrow+\infty. \tag{12}
\]

Equivalently, with

\[
\theta=\log_3 2,
\qquad
e_k=s_k-\lceil\theta k\rceil,
\]

one has \(e_k\to+\infty\). At the same time, because the orbit begins at one ordinary integer, its inverse-carry digits satisfy \(b_k=0\) eventually. This is the previously established reduction of the divergent branch. fileciteturn7file0L151-L226

Define the divergent bad language \(\mathcal B_{\mathrm{div}}\) to consist of all synchronized infinite traces satisfying:

\[
\begin{aligned}
&\text{the local recurrences (2)--(7)},\\
&\rho_\infty:=\sum_{j\ge0}b_j2^j\in\mathbb N_{>0},\\
&b_k=0\quad\text{eventually},\\
&H_k\ge0\quad\text{for every }k,\\
&H_k\to+\infty.
\end{aligned} \tag{13}
\]

The previous reduction gives

\[
\boxed{
\text{a divergent positive Collatz counterexample exists}
\iff
\mathcal B_{\mathrm{div}}\ne\varnothing.
} \tag{14}
\]

The forward implication uses the minimum-coefficient shift. Conversely, a member of \(\mathcal B_{\mathrm{div}}\) has an ordinary positive seed by Proposition 1.1, and after the seed boundary stabilizes, its \(z_k\) track is the actual orbit. Since \(3^{s_k}/2^k\to\infty\), equation (1) implies \(T^k(n)\to\infty\).

---

# 3. Positive-drift periodic words are impossible

This is the decisive algebraic fact behind the sofic strategy.

## Lemma 3.1 — Periodic-drift sign lemma

Let

\[
v=(v_0,\ldots,v_{p-1})\in\{0,1\}^p
\]

contain \(r\) ones. Let \(C(v)\) be its affine carry, so that whenever \(v\) occurs as a \(p\)-step parity block,

\[
T^p(x)=\frac{3^r x+C(v)}{2^p}. \tag{15}
\]

If the infinite parity sequence of \(x\in\mathbb Z_2\) is \(v^\omega\), then

\[
x=\frac{C(v)}{2^p-3^r}. \tag{16}
\]

Consequently,

\[
3^r>2^p
\quad\Longrightarrow\quad
x<0. \tag{17}
\]

### Proof

The parity sequence of \(T^p(x)\) is obtained by deleting the first \(p\) parity symbols. For \(v^\omega\), this is again \(v^\omega\).

Nested parity cylinders determine a unique \(2\)-adic integer. Hence

\[
T^p(x)=x.
\]

Substituting in (15) gives

\[
2^px=3^rx+C(v),
\]

which is (16).

If \(3^r>2^p\), the denominator in (16) is negative. Since positive drift requires \(r>0\), the carry \(C(v)\) is strictly positive. Therefore \(x<0\). ∎

This proves more generally:

\[
\boxed{
\text{No positive ordinary integer has an eventually periodic
positive-drift parity tail.}
} \tag{18}
\]

The corresponding accelerated valuation-word statement is identical. If a period word \(w\) has total exponent \(A(w)\) and length \(|w|\), its fixed seed satisfies

\[
\bigl(2^{A(w)}-3^{|w|}\bigr)\xi=C(w). \tag{19}
\]

A strict coefficient barrier gives \(2^{A(w)}<3^{|w|}\), forcing \(\xi<0\). This already excludes periodic strict-barrier survivors, but not aperiodic ones. fileciteturn13file2L206-L218

---

# 4. The one-counter sofic theorem

We now isolate exactly what “a richer automaton” would have to mean.

A finite alphabet of local tiles is not enough. What is needed is a finite state attached to an entire cut of the computation, with the property that equality of cut states permits exact splicing.

## Definition 4.1 — Spliceable finite cut quotient

Let \(\Gamma_k\) denote the complete mixed-base profile at the \(k\)-th temporal cut of a valid configuration. It includes whatever boundary information is necessary to continue the tiling.

A **spliceable finite cut quotient** consists of:

1. a finite set \(Q\);
2. a map
   \[
   \tau:\Gamma_k\longmapsto q_k\in Q;
   \]
3. a finite directed transition graph on \(Q\);
4. the following loop-lifting property:

Whenever \(i<j\), all seed-injection digits satisfy \(b_k=0\) for \(k\ge i\), and

\[
\tau(\Gamma_i)=\tau(\Gamma_j), \tag{20}
\]

the mixed-base rectangle between cuts \(i\) and \(j\) may be repeated arbitrarily many times. The resulting infinite configuration must still:

- satisfy every local binary–ternary carry rule;
- have a finite binary seed boundary;
- represent an ordinary positive integer;
- preserve the exact parity labels of the repeated rectangle.

The last condition is much stronger than equality of one tile or one bounded neighborhood. It says that \(q_i=q_j\) captures the complete interface needed for arithmetic splicing.

## Theorem 4.2 — Finite-quotient extinction

If every member of \(\mathcal B_{\mathrm{div}}\) admits a spliceable finite cut quotient, then

\[
\mathcal B_{\mathrm{div}}=\varnothing. \tag{21}
\]

### Proof

Suppose instead that a bad trace exists. Let

\[
q_k=\tau(\Gamma_k)\in Q.
\]

Choose \(K\) such that \(b_k=0\) for every \(k\ge K\).

Because \(Q\) is finite, some state \(q\in Q\) occurs infinitely often after \(K\). Since

\[
H_k\to+\infty,
\]

there are occurrences \(i<j\), both at least \(K\), such that

\[
q_i=q_j=q
\qquad\text{and}\qquad
H_j-H_i>0. \tag{22}
\]

Let \(v\) be the parity block from \(i\) to \(j-1\). Put

\[
p=j-i,
\qquad
r=s_j-s_i.
\]

Then

\[
H_j-H_i=r\log3-p\log2>0,
\]

so

\[
3^r>2^p. \tag{23}
\]

By spliceability, the rectangle between the equal cut states can be repeated forever. Hence there is a valid mixed-base configuration representing a positive ordinary integer whose parity sequence is eventually

\[
v^\omega.
\]

Lemma 3.1 says that the \(2\)-adic seed at the beginning of this periodic tail is

\[
\frac{C(v)}{2^p-3^r}<0.
\]

But every iterate of a positive ordinary integer is positive. This is a contradiction. Therefore the bad language is empty. ∎

This establishes the central automata-theoretic implication:

\[
\boxed{
\begin{array}{c}
\text{exact finite control}\\
+\ \text{one unbounded coefficient height}\\
+\ \text{sound loop splicing}
\end{array}
\quad\Longrightarrow\quad
\text{no divergent Collatz orbit}.
} \tag{24}
\]

The same proof applies to an exact one-counter Büchi automaton. Once the finite seed boundary has ended, an accepted run with height tending to infinity contains two occurrences of the same control state with a positive counter displacement. Pumping that loop produces the forbidden positive-drift periodic tail.

---

# 5. Why a two-dimensional sofic encoding does not yet satisfy the theorem

There are exact finite-alphabet mixed-base encodings of Collatz. Stérin and Woods constructed a two-dimensional quasi-cellular automaton in which horizontal rows encode binary Collatz iterates and vertical columns simultaneously implement the dynamics in ternary. Its local part consists of dual finite-state transducers: one computes \(3x+1\) in binary and the other computes division by \(2\) in ternary. citeturn479175view0

Yolcu, Aaronson, and Heule similarly constructed a finite mixed binary–ternary rewriting system whose termination on canonical inputs is equivalent to Collatz. Their work obtained automated certificates for weakened systems, but not termination of the full system. citeturn522102academia1

These results supply the **local encoding**, but not Definition 4.1.

## 5.1 A cut is not one finite state

A temporal cut through the two-dimensional tiling contains an entire word of growing length. Its relevant arithmetic data include at least

\[
\left(
\rho_k\bmod 2^k,\;
z_k\bmod 3^{s_k},\;
\text{inverse-fiber order profile}
\right). \tag{25}
\]

The height

\[
H_k=s_k\log3-k\log2
\]

does not determine any of these three coordinates.

Two cuts can have:

- the same height;
- the same bounded neighborhood near the moving frontier;
- the same finite transducer state;

while carrying different seed residues, different terminal carry debts, and opposite answers to the question “does a smaller positive ancestor exist?”

Accordingly, equality of local states does not justify repeating the region between them.

## 5.2 Two-dimensional soficity has no lasso theorem

For an ordinary one-dimensional finite automaton, a nonempty infinite language has an ultimately periodic run. This is the familiar lasso argument.

There is no analogous theorem saying that a nonempty two-dimensional shift of finite type has a periodic configuration. Indeed, plane-tiling nonemptiness is undecidable in general, so finite local rules alone cannot supply a generic pumping or emptiness algorithm. citeturn522102academia2

This does not show that the particular Collatz tile set is undecidable. It shows that the inference

\[
\text{finite tile alphabet}
\Longrightarrow
\text{repeatable arithmetic rectangle}
\]

is invalid without an additional system-specific theorem.

## 5.3 Finite prefixes cannot distinguish the bad path

Every finite parity word and every finite valuation word is realized by infinitely many positive integers. fileciteturn15file0L181-L200

Thus every bounded window of a hypothetical divergent path also occurs in terminating computations. No forbidden finite pattern can distinguish the two. The distinction is that one fixed seed must realize all the nested prefixes.

This is why the exact synchronization invariant must retain simultaneously:

\[
\boxed{
\begin{array}{c}
\text{left-end }2\text{-adic seed stabilization},\\
\text{right-end }3\text{-adic endpoint compatibility},\\
\text{Archimedean order of competing starts}.
\end{array}}
\tag{26}
\]

The existing synchronization analysis identifies precisely these three necessary components. fileciteturn14file7L325-L369

## 5.4 Bounded local recurrence can be genuinely aperiodic

The normalized signed-state automaton already contains a four-state recurrent component with two distinct equal-cost loops. Arbitrary aperiodic concatenations of the two loops stay forever in those four states and never reach a positive-saving state. Therefore:

\[
\text{bounded recurrent state}
\not\Longrightarrow
\text{eventual periodicity or descent}.
\]

This is an explicit obstruction, not merely a warning about a possible pathology. fileciteturn10file10L801-L841

The missing information is which loop choices are synchronized with the one fixed positive input.

---

# 6. The strongest concrete finite certificate currently available

A useful recurrent branch has already been reduced to the partial rational-base map

\[
m\longmapsto\frac{81m+\varepsilon}{64},
\qquad
\varepsilon\in\{0,1\}, \tag{27}
\]

with integrality requiring

\[
m\equiv0\pmod{64}
\quad\text{or}\quad
m\equiv15\pmod{64}.
\]

For its signed difference trajectories, one obtains

\[
64d_{j+1}=81d_j+\delta_j,
\qquad
\delta_j\in\{-1,0,1\}. \tag{28}
\]

Repeated quotienting defines finite zero-trace graphs \(\mathcal Z_k\). They have:

- in-degree and out-degree at most one;
- a zero vertex with no nonzero exit;
- no nonzero directed cycle.

Thus their nonzero portions are finite directed paths. fileciteturn15file1L563-L684

Let \(\ell_k\) be the longest such path. The desired estimate is

\[
\ell_k\le
\left\lfloor\frac{k+1}{3}\right\rfloor. \tag{29}
\]

This would imply signed-code separation, product spacing, finite-difference positivity, and termination of the \(81/64\) recurrent subsystem.

There is an exact four-trit injectivity theorem that explains the coefficient \(1/3\). However, its local injections overlap. The remaining statement is that their carries synchronize so that the local injections multiply globally:

\[
\left|\mathcal W_{k,L}\right|
\le 3^{k+1-3L},
\qquad
\mathcal W_{k,L}=\varnothing
\ \text{when }3L>k+1. \tag{30}
\]

This overlapping-carry synchronization has not been proved. fileciteturn15file2L741-L796

Even a proof of (29) would close only that recurrent component. A separate theorem would still have to force every positive stationary Collatz ray into a compressible component. fileciteturn15file2L853-L868

---

# 7. The exact higher-dimensional certificate needed

The following is the narrow automata-specific statement that would complete the strategy.

## Rectangle-or-descent theorem

Every infinite mixed binary–ternary Collatz configuration arising from a positive stationary inverse-fiber minimum \(n>1\) contains cuts \(i<j\) with the same finite marked type such that one of the following holds.

### Positive-height rectangle

\[
H_j-H_i>0, \tag{31}
\]

and the intervening rectangle is exactly repeatable while preserving:

\[
\begin{array}{c}
\text{finite binary seed support},\\
\text{all ternary carry constraints},\\
\text{positivity of the represented input}.
\end{array}
\]

### Descending rectangle

The rectangle determines a competing positive inverse path from some

\[
0<y<n
\]

to the same later orbit point as \(n\).

The trivial \(1\leftrightarrow2\) rectangle is the only allowed exception.

## Theorem 7.1 — Conditional full Collatz proof

The rectangle-or-descent theorem implies the Collatz conjecture.

### Proof

Suppose Collatz is false and let \(n>1\) be the least odd counterexample.

The least-counterexample property says that \(n\) is the least positive member of every finite inverse fiber over its own forward orbit. Equivalently,

\[
M_r(n)=n
\qquad(r\ge0), \tag{32}
\]

where

\[
M_r(n)=\min\{y>0\text{ odd}:U^r(y)=U^r(n)\}.
\]

This stationary inverse-fiber formulation is equivalent to Collatz by strong induction. fileciteturn13file1L125-L151

Apply the rectangle-or-descent theorem to the synchronized configuration of \(n\).

If the first alternative occurs, repeating the rectangle gives an eventually periodic positive-drift parity tail. Lemma 3.1 says its seed is negative, contradicting positivity.

If the second alternative occurs, there is \(0<y<n\) entering the same forward orbit. Minimality of \(n\) says \(y\) reaches \(1\), hence their common endpoint and therefore \(n\) reach \(1\), again a contradiction.

If the exceptional trivial rectangle occurs, the orbit has already entered the trivial cycle, also a contradiction.

Therefore no least counterexample exists. ∎

This gives the complete proof skeleton:

\[
\boxed{
\begin{aligned}
&\text{finite marked cut types}\\
&+\text{ exact rectangle splicing}\\
&+\text{ cycle-or-descent classification}\\
&\quad\Longrightarrow\quad\text{Collatz}.
\end{aligned}}
\tag{33}
\]

---

# 8. Why the final rectangle theorem is still missing

The current local machinery proves all of the following:

1. Binary seed digits are tracked exactly by \(b_k\).
2. Ordinary positive seeds are exactly the finite-support \(b\)-streams.
3. Ternary endpoint compatibility is tracked exactly by \(z_k\).
4. Divergence forces unbounded coefficient height.
5. Positive-drift periodic rectangles are impossible.
6. Several finite recurrent components have strong no-cycle or injectivity properties.

But it does not prove that the complete cut profile has finitely many splice-equivalence classes.

The unresolved state is not merely

\[
(\text{local tile},H_k).
\]

It includes an unbounded **adic debt**: how the currently visible binary prefix is attached to the fixed left seed, how the ternary suffix is attached to the actual right endpoint, and whether the resulting alternative start lies in the interval \((0,n)\).

The four-state aperiodic example shows that bounded signed-state recurrence is insufficient. The zero-trace graphs show that even within one especially rigid recurrent component, overlapping carry synchronization remains an all-depth theorem. And every finite parity pattern occurs on terminating orbits, so no bounded-window refinement alone can solve the fixed-seed problem.

---

# Final verdict

The higher-dimensional sofic approach yields a rigorous and useful theorem:

\[
\boxed{
\text{Any exact finite spliceable one-height recognizer
has empty divergent bad language.}
}
\]

The proof is the positive-height loop argument of Theorem 4.2.

However, I did **not** obtain the required finite spliceable quotient. The precise remaining statement is the rectangle-or-descent theorem. It must prove that a single positive stationary arithmetic ray cannot maintain an unbounded binary–ternary interface without either:

\[
\text{forming a repeatable positive-drift rectangle}
\]

or

\[
\text{exposing a smaller positive coalescing ancestor}.
\]

The first outcome is now rigorously impossible by the affine fixed-point sign lemma; the second would directly contradict least-counterexample minimality. What remains is to prove that one of those two outcomes is forced. Treating two-dimensional soficity itself as that proof would conflate local tile recurrence with equality of an unbounded arithmetic boundary, and the known aperiodic recurrent components show that this step is not valid.