model: GPT-5 Pro
round: 17 -- approach 12, Proof-theoretic ordinal descent
front: proof
sent: 2026-08-13T18:42:41Z
worked: 62m 32s

---

## Verdict

After carrying the ordinal-descent program through the mixed binary–ternary rewrite system, **a complete proof of the Collatz conjecture is not established**. What does emerge is a sharper result than the original proposal:

1. the eleven-rule system can be collapsed to an exact deterministic rewrite map on pure ternary words;
2. Collatz is equivalent to termination of that map;
3. an ordinal rank for the entire mixed system can be constructed automatically from a rank satisfying **three explicit uniform inequalities** for two carry transducers;
4. several substantial subsystems admit elementary ordinal ranks below \(\omega^2\);
5. fixed lexicographic, length-based, commutative, and local bigram rankings fail by finite certificates.

The unresolved part is precisely the construction of the carry-sensitive rank satisfying those three inequalities. Merely postulating it would assume essentially the whole Collatz conjecture.

---

# 1. The mixed binary–ternary rewrite system

Work with the shortcut Collatz map

\[
T(n)=
\begin{cases}
n/2,&n\equiv0\pmod2,\\[2mm]
(3n+1)/2,&n\equiv1\pmod2.
\end{cases}
\]

Reaching \(1\) under this map is equivalent to reaching \(1\) under the usual Collatz map.

Let

\[
f(x)=2x,\qquad t(x)=2x+1
\]

be the binary digits, and

\[
0(x)=3x,\qquad 1(x)=3x+1,\qquad 2(x)=3x+2
\]

be the ternary digits. Write \(\lhd\) and \(\rhd\) for the left and right delimiters. The mixed-base system of Yolcu, Aaronson, and Heule has the following eleven rules:

\[
\begin{aligned}
D:\qquad
&f\rhd\longrightarrow\rhd,
&
&t\rhd\longrightarrow2\rhd,
\\[1mm]
A:\qquad
&f0\longrightarrow0f,
&
&f1\longrightarrow0t,
&
&f2\longrightarrow1f,
\\
&t0\longrightarrow1t,
&
&t1\longrightarrow2f,
&
&t2\longrightarrow2t,
\\[1mm]
B:\qquad
&\lhd0\longrightarrow\lhd t,
&
&\lhd1\longrightarrow\lhd ff,
&
&\lhd2\longrightarrow\lhd ft .
\end{aligned}
\]

The \(A\)-rules exchange adjacent binary and ternary positions while preserving the represented integer. The \(B\)-rules convert the leading ternary digit into binary, and each \(D\)-rule performs one shortcut Collatz step. The source paper proves that termination of the full rewriting system is equivalent to the Collatz conjecture. citeturn962870view2turn962870view3turn796082view0

---

# 2. Collapse to two ternary carry transducers

The first simplification is to stop looking for a rank on arbitrary mixed strings. A canonical computation consists of repeatedly taking the rightmost binary symbol, moving it through the ternary suffix using the \(A\)-rules, and finally applying a \(D\)-rule.

Define two maps

\[
E,O:\{0,1,2\}^{*}\longrightarrow\{0,1,2\}^{*}.
\]

Here \(E(u)\) is the pure ternary output obtained by completely processing \(fu\rhd\), and \(O(u)\) is the output obtained from \(tu\rhd\).

The rewrite rules give the exact recursions

\[
E(\epsilon)=\epsilon,\qquad O(\epsilon)=2,
\]

and

\[
\begin{aligned}
E(0u)&=0E(u),&
E(1u)&=0O(u),&
E(2u)&=1E(u),\\
O(0u)&=1O(u),&
O(1u)&=2E(u),&
O(2u)&=2O(u).
\end{aligned}
\tag{1}
\]

For example,

\[
fu\rhd=f0v\rhd\longrightarrow0fv\rhd
\]

when \(u=0v\), and completing the processing gives \(0E(v)\). The other five recursions are identical applications of the six \(A\)-rules. The terminal equations are precisely the two \(D\)-rules.

These transducers are long division by \(2\) in base \(3\). If \(c\in\{0,1\}\) is the current carry and \(d\in\{0,1,2\}\) is the next ternary digit, then

\[
e=\left\lfloor\frac{3c+d}{2}\right\rfloor,
\qquad
c'\equiv3c+d\pmod2.
\tag{2}
\]

The output digit is \(e\), and the new carry is \(c'\). A terminal carry \(0\) outputs nothing, whereas terminal carry \(1\) produces the final digit \(2\). This is the same binary–ternary base-conversion phenomenon identified independently in the cellular-automaton formulation of Stérin and Woods. citeturn426790view0

---

# 3. A pure ternary Collatz return map

Suppose the current string contains no binary symbols:

\[
\lhd w\rhd,\qquad w\in\{0,1,2\}^{*}.
\]

Apply one boundary rule and then process every binary symbol created by it. This gives the pure ternary return map

\[
R:\{0,1,2\}^{*}\longrightarrow\{0,1,2\}^{*}
\]

defined by

\[
\boxed{
\begin{aligned}
R(0u)&=O(u),\\
R(1u)&=E(E(u)),\\
R(2u)&=E(O(u)),\\
R(\epsilon)&=\epsilon.
\end{aligned}}
\tag{3}
\]

The reason for the double application in the second and third cases is that

\[
\lhd1\longrightarrow\lhd ff,
\qquad
\lhd2\longrightarrow\lhd ft.
\]

The rightmost binary digit is processed first.

A pure ternary word \(w=d_1\cdots d_q\) represents

\[
N(w)=3^q+[w]_3,
\tag{4}
\]

where \([w]_3\) is the ordinary base-\(3\) value of the \(q\)-digit string. The implicit leading ternary digit is \(1\). Thus \(\epsilon\) represents \(1\).

## Proposition 1 — Arithmetic meaning of \(R\)

For every nonempty pure ternary word \(w\),

\[
N(R(w))=
\begin{cases}
T(N(w)),&w=0u,\\
T^2(N(w)),&w=1u\text{ or }w=2u.
\end{cases}
\tag{5}
\]

### Proof

Each \(B\)-rule preserves the represented integer and creates respectively one, two, or two binary symbols. Every subsequent \(A\)-rule preserves the integer. Each time a binary symbol reaches \(\rhd\), one \(D\)-rule is applied, which performs exactly one application of \(T\). Hence the number of \(T\)-steps is the number of binary symbols introduced by the boundary rule. ∎

## Theorem 2 — Pure ternary equivalence

The following statements are equivalent:

1. every positive integer reaches \(1\) under \(T\);
2. every finite ternary word reaches \(\epsilon\) under iteration of \(R\).

### Proof

If Collatz holds, (5) shows that every \(R\)-orbit is a subsequence of a terminating \(T\)-orbit, so it reaches \(\epsilon\).

Conversely, represent an arbitrary positive integer \(n\) by a finite pure binary word. Each complete binary-processing block consumes one binary symbol. Therefore, after finitely many \(T\)-steps, its mixed representation becomes pure ternary. By assumption the resulting pure word reaches \(\epsilon\) under \(R\), and (5) then shows that \(n\) reaches \(1\). ∎

This is the cleanest form of the ordinal problem: the original eleven rules have been reduced to the three schematic transformations in (3).

---

# 4. The exact ordinal-descent theorem

Let \(\alpha\) be any ordinal, and suppose there is a function

\[
\rho:\{0,1,2\}^{*}\longrightarrow\alpha
\]

such that

\[
\rho(\epsilon)=0
\]

and, for every ternary word \(u\),

\[
\boxed{
\begin{aligned}
\rho(O(u))&<\rho(0u),\\
\rho(E(E(u)))&<\rho(1u),\\
\rho(E(O(u)))&<\rho(2u).
\end{aligned}}
\tag{6}
\]

## Theorem 3 — Ordinal criterion for Collatz

Any function \(\rho\) satisfying (6) proves the Collatz conjecture.

### Proof

By (3),

\[
\rho(R(w))<\rho(w)
\]

for every nonempty ternary word \(w\). Consequently an infinite \(R\)-orbit would produce an infinite strictly descending sequence of ordinals,

\[
\rho(w)>\rho(R(w))>\rho(R^2(w))>\cdots,
\]

which is impossible. Therefore every \(R\)-orbit reaches \(\epsilon\). Theorem 2 then gives the Collatz conjecture. ∎

This theorem is elementary, but it isolates the entire substantive requirement: **construct one explicit, noncircular \(\rho\) satisfying the three inequalities (6).**

---

# 5. Lifting the ternary rank to the complete rewrite process

A rank satisfying (6) also gives an ordinal rank for all the intermediate base-conversion steps.

For a mixed configuration \(C\), let

\[
p(C)=\text{number of binary symbols in }C.
\]

Let

\[
I(C)=
\#\{(i,j):i<j,\ C_i\in\{f,t\},\ C_j\in\{0,1,2\}\}
\tag{7}
\]

be the number of binary-before-ternary inversions.

Finally, let \(\Pi(C)\) denote the pure ternary word obtained by processing all binary symbols currently in \(C\), without applying a new boundary rule afterward. This is a finite base-conversion computation: each \(D\)-step removes one binary symbol.

Define

\[
\widehat\rho(C)
=
\omega^2\cdot\rho(\Pi(C))
+\omega\cdot p(C)
+I(C).
\tag{8}
\]

## Proposition 4 — Full canonical rewrite descent

Along the canonical rewrite strategy, every individual \(A\)-, \(D\)-, or \(B\)-step strictly decreases \(\widehat\rho\).

### Proof

For an \(A\)-step, \(\Pi(C)\) and \(p(C)\) are unchanged. A binary symbol passes across exactly one ternary symbol, so \(I(C)\) decreases by exactly one.

For a \(D\)-step, \(\Pi(C)\) remains the eventual pure result, but \(p(C)\) decreases by one. The inversion count may increase by some finite amount, but

\[
\omega(p-1)+I'<\omega p
\]

for every finite \(I'\).

For a \(B\)-step, the old configuration is pure ternary. If it represents the word \(w\), the pure projection after the newly generated binary digits have been processed is \(R(w)\). Therefore

\[
\rho(\Pi(C_{\rm new}))
=
\rho(R(w))
<
\rho(w)
=
\rho(\Pi(C_{\rm old})).
\]

The decrease in the \(\omega^2\)-coefficient dominates the finite reset of \(p\) and \(I\). ∎

Thus the search for an ordinal ranking of a complicated mixed rewrite system really does reduce to the three pure ternary inequalities (6). If \(\rho(w)<\varepsilon_0\), then the lifted rank (8) also remains below \(\varepsilon_0\).

---

# 6. Genuine ordinal descent that can already be proved

The failure occurs only when the boundary and dynamic rules are allowed to refuel each other. The individual phases have very simple ordinal ranks.

## Proposition 5 — Dynamic system without boundary conversion

The subsystem \(A\cup D\) terminates, with rank

\[
\rho_D(C)=\omega\cdot p(C)+I(C)<\omega^2.
\tag{9}
\]

### Proof

Every \(A\)-rule decreases \(I\) by one. Every \(D\)-rule decreases \(p\) by one. Any finite change in \(I\) is dominated by the drop in the coefficient of \(\omega\). ∎

## Proposition 6 — Boundary conversion without Collatz dynamics

The subsystem \(A\cup B\) terminates, with rank

\[
\rho_B(C)=\omega\cdot q(C)+I(C)<\omega^2,
\tag{10}
\]

where \(q(C)\) is the number of ternary symbols.

### Proof

Again every \(A\)-rule decreases \(I\). Every \(B\)-rule consumes one ternary symbol, so \(q\) decreases by one. It can create one or two binary symbols and thereby increase \(I\), but only by a finite amount, dominated by the decrease in \(\omega q\). ∎

This explains the essential feedback loop:

\[
\text{binary}
\ \xrightarrow{D}\
\text{ternary}
\ \xrightarrow{B}\
\text{one or two binary symbols}.
\tag{11}
\]

Without \(B\), the binary supply is exhausted. Without \(D\), the ternary supply is exhausted. Together, they can regenerate one another.

The original automated-termination work proves considerably more: every system obtained by deleting any one of the eleven rules has a matrix-interpretation termination proof. Proving any one deleted rule terminating relative to the full system would therefore settle Collatz. citeturn962870view4

---

# 7. Why the obvious ordinal assignments fail

The pure return map gives very small counterexamples to several large classes of rankings.

## Fixed symbol precedence is impossible

Directly from (1)–(3),

\[
R(0)=2,\qquad R(2)=1,\qquad R(11)=01.
\tag{12}
\]

A left-to-right lexicographic order based on one fixed precedence of the symbols would require

\[
0\succ2,\qquad 2\succ1,\qquad 1\succ0,
\]

which is impossible.

Thus no ordinal code whose leading comparison is governed by a fixed order of \(0,1,2\) can work.

## Length cannot be the leading measure

One has

\[
R(20)=022.
\tag{13}
\]

A complete block can increase the ternary length from \(2\) to \(3\).

There can also be consecutive length increases; for instance,

\[
2220\longmapsto11022\longmapsto002222.
\]

So the increase is not merely an isolated normalization artifact.

## Commutative digit weights cannot work

Another exact transition is

\[
R(120)=012.
\tag{14}
\]

The two words have the same length and the same number of each digit. Therefore no rank depending only on

\[
\bigl(|w|,\#0(w),\#1(w),\#2(w)\bigr)
\]

can decrease on every block. In particular, no additive potential

\[
a_0\#0(w)+a_1\#1(w)+a_2\#2(w)+b|w|
\]

can orient the system.

## Even additive bigram potentials have a finite obstruction

Consider the five exact transitions

\[
\begin{aligned}
212&\longmapsto102,\\
0012&\longmapsto121,\\
0202&\longmapsto2122,\\
1021&\longmapsto00122,\\
1222&\longmapsto0202.
\end{aligned}
\tag{15}
\]

Let \(B(w)\) be the vector counting all adjacent pairs in the padded word \({}^{\wedge}w\$\). Direct counting gives

\[
\sum_{\text{five inputs}} B(w)
=
\sum_{\text{five outputs}} B(R(w)).
\tag{16}
\]

For the internal bigrams, both sides have the counts

\[
\begin{array}{c|cccccccc}
\text{bigram}&00&01&02&10&12&20&21&22\\ \hline
\text{count}&1&1&3&1&3&1&2&2.
\end{array}
\]

The initial- and terminal-marker counts agree as well.

Consequently, if

\[
\Phi(w)=\sum_{a,b}c_{ab}\#_{ab}({}^{\wedge}w\$)
\]

strictly decreased on each of the five transitions, summing the five strict inequalities would contradict (16). The same argument excludes any finite lexicographic stack of additive bigram potentials.

This does not prove that every finite-state or bounded-window ordinal interpretation fails. It shows, however, that one must go beyond several standard termination templates.

The rigorous matrix-impossibility theorem in the source literature concerns the older **unary** Collatz rewriting system, even when dependency pairs are included. It is not a no-go theorem for every matrix or ordinal interpretation of the mixed system. citeturn796082view3

---

# 8. Why simply choosing a large ordinal does not solve the problem

There is a fundamental logical point here.

Suppose Collatz were already known. Then the natural-number function

\[
\tau(w)=\min\{k\geq0:R^k(w)=\epsilon\}
\tag{17}
\]

would satisfy

\[
\tau(R(w))=\tau(w)-1.
\]

So a rank into \(\mathbb N\), far below \(\omega\), would suffice.

Conversely, proving that \(\tau(w)\) is defined for every \(w\) is exactly proving Collatz. Defining an ordinal by

\[
\rho(w)=\rho(R(w))+1
\]

has the same circularity: transfinite recursion is available only after the rewrite relation has been shown well-founded.

More generally, the rewrite system is finitely branching. If it terminates from a fixed word, its derivation tree has finite height by König’s lemma, so that word already has a finite natural-number derivation rank. Therefore:

> The point of \(\varepsilon_0\), \(\Gamma_0\), or another proof-theoretic ordinal is not that Collatz trajectories intrinsically require transfinite heights. The point would be to provide a **structurally defined, locally verifiable certificate** of finite termination.

A larger ordinal does not compensate for the absence of such a structural definition.

---

# 9. The precise missing lemma

A successful proof-theoretic attack must establish the following statement.

## Carry-profile ordinal lemma

There exists an explicitly defined map

\[
\rho:\{0,1,2\}^{*}\to\varepsilon_0
\]

computed by structural recursion on the finite ternary word, possibly carrying finitely or recursively many auxiliary carry states, such that for every \(u\),

\[
\begin{aligned}
\rho(O(u))&<\rho(0u),\\
\rho(E(E(u)))&<\rho(1u),\\
\rho(E(O(u)))&<\rho(2u).
\end{aligned}
\tag{18}
\]

Moreover, the proof of (18) must use only the structural recursions (1), not an assumption that the future \(R\)-orbit terminates.

The hard feature is that \(E\) and \(O\) scan the entire suffix. Every ternary digit \(1\) flips the division carry, and the terminal carry can append a new digit \(2\). A leading ternary digit may generate two successive carry passes. Hence a rank based on a fixed leading-digit order, a bounded collection of symbol counts, or one fixed local matrix cannot see the full dependency.

A credible ordinal rank would therefore have to encode an **unbounded hierarchy of carry profiles**. One possible form would be a Cantor-normal-form sum whose exponents record successively deeper carry-reset locations, but no definition has been found for which all three transformations in (18) uniformly decrease. At present that sentence is a research direction, not a theorem.

---

# 10. What generalized undecidability does and does not imply

Kurtz and Simon proved that a natural generalized Collatz totality problem is \(\Pi^0_2\)-complete. Thus one should not expect a uniform mechanical procedure that takes every generalized residue-class affine map and always synthesizes a terminating ordinal interpretation exactly when the map is total. citeturn426790view1

That result does **not** rule out a bespoke ordinal certificate for the original \(3n+1\) map. It does explain why a generic “all such rewrites decrease below \(\varepsilon_0\)” argument is unlikely: generalized systems are capable of encoding arbitrary computation.

---

# Final status

The proof-theoretic ordinal program can be brought to the following exact point:

\[
\boxed{
\text{Collatz}
\iff
\forall w\;\exists k\ R^k(w)=\epsilon
}
\]

with

\[
R(0u)=O(u),\qquad
R(1u)=E(E(u)),\qquad
R(2u)=E(O(u)).
\]

An explicit ordinal rank satisfying the three inequalities

\[
\rho(O(u))<\rho(0u),\qquad
\rho(E(E(u)))<\rho(1u),\qquad
\rho(E(O(u)))<\rho(2u)
\]

would give a complete proof, and formula (8) would lift it to a descent rank for the entire canonical mixed-base rewrite computation.

What is proved here is the reduction, the lifting theorem, the \(\omega^2\)-ranks for both non-refueling subsystems, and finite obstructions to several low-complexity rank families. **The carry-profile ordinal lemma itself remains unproved.** Treating it as automatic from the existence of a large proof-theoretic ordinal would be circular, so the requested full Collatz proof has not been completed by this approach.