model: GPT-5.6 Pro (Chat mode) -- first round of era 2; rounds 6-33 ran on the older GPT-5 Pro
round: 34 -- approach 29, Cellular-automaton nilpotency
front: proof
sent: 2026-08-13T22:39Z
worked: 39m 30s

---

# Result of the proof attempt

The cellular-automaton route does **not** presently give a valid full proof. The obstruction is precise: after distinguishing CQCA update time from Collatz iteration depth and normalizing away powers of \(2\), the proposed “finite-support nilpotency” theorem is **exactly equivalent to the Collatz conjecture**.

What the approach does yield is a rigorous package of reductions:

1. an exact erosion formulation of Collatz;
2. a proof that a finite glider or spaceship would encode a cycle, not a divergent orbit;
3. a proof that any cycle-free counterexample must generate an ever-widening, aperiodic defect;
4. an explicit \(2\)-adic obstruction to any bounded-window nilpotency argument;
5. the exact front-speed inequality that remains to be proved.

I will establish each of these statements.

---

## 1. The exact CQCA and the correct notion of “time”

Use the shortcut Collatz map

\[
T(n)=
\begin{cases}
n/2,&n\equiv0\pmod 2,\\[2mm]
(3n+1)/2,&n\equiv1\pmod 2.
\end{cases}
\]

For odd \(x\), define the odd-to-odd map

\[
U(x)=\frac{3x+1}{2^{\nu_2(3x+1)}}.
\]

The Stérin–Woods CQCA places a finite binary word on an infinite half-defined zero ray. Its cells carry a sum bit and a carry bit. The nonlocal part of the rule initiates the \(+1\) carry at the least significant end, while the local full-adder rule computes \(3x+1\). Successive horizontal rows encode successive **odd** Collatz iterates, and the trailing zero cells record the intervening divisions by \(2\). Simultaneously, vertical columns encode the full shortcut orbit in a modified ternary representation. citeturn354100view0turn771128view3turn771128view4

There are two different dynamics here:

- **CQCA update time:** cells gradually become defined;
- **Collatz time:** successive odd iterates occur on successively lower spatial rows of the eventual limit configuration.

This distinction is essential. The CQCA is freezing: once a sum or carry bit is set, it never changes, and every cell changes state at most twice. Thus every valid input has a pointwise limit configuration, regardless of whether its Collatz orbit converges. citeturn771128view1

Consequently, ordinary temporal stabilization of the CQCA cannot prove Collatz. The entire hypothetical divergent orbit would simply be written into an infinite, static, frozen tableau.

### Normalized row extraction

Let \(w(n)\) be the standard finite binary word for \(n>0\). On every completed CQCA row, discard

- the infinite leading zero background, and
- the finite trailing zeros representing powers of \(2\).

Let \(\mathcal R_k(n)\) denote the resulting canonical odd binary word on row \(y=-k\), and let \([\mathcal R_k(n)]_2\) be its integer value.

Set

\[
x_0=\frac{n}{2^{\nu_2(n)}},
\qquad
x_{k+1}=U(x_k).
\]

Then the row-simulation lemma is

\[
\boxed{[\mathcal R_k(n)]_2=x_k=U^k(x_0).}
\tag{1}
\]

### Proof

The initial row represents \(n\); deleting its terminal zeros gives \(x_0\).

Suppose the normalized \(k\)-th row represents the odd number \(x_k\). The bootstrap rule supplies the initial \(+1\) carry. The full-adder relation

\[
s_{\rm out}+2c_{\rm out}
  =s_{\rm current}+s_{\rm shifted}+c_{\rm in}
\]

computes the binary expansion of \(3x_k+1\) on the row below. Since \(x_k\) is odd, that expansion ends in at least one zero. Deleting all of those terminal zeros divides by \(2^{\nu_2(3x_k+1)}\), leaving \(U(x_k)\). Induction proves (1). This is precisely the content of the paper’s row-simulation lemma. citeturn771128view3turn771128view4

---

## 2. Exact equivalence between erosion and Collatz

The normalized trivial background is the constant odd-row pattern

\[
1,1,1,\ldots,
\]

because

\[
U(1)=\frac{3+1}{4}=1.
\]

Before odd normalization, this is the usual full-map cycle

\[
1\longmapsto2\longmapsto1.
\]

Define the normalized defect on row \(k\) to be nontrivial when

\[
\mathcal R_k(n)\neq 1.
\]

### Theorem 1 — CQCA erosion equivalence

For \(n>0\), the following are equivalent:

1. the Collatz orbit of \(n\) reaches \(1\);
2. \(U^k(x_0)=1\) for some \(k\);
3. \(\mathcal R_k(n)=1\) for some \(k\);
4. every sufficiently deep normalized row is the trivial background \(1\);
5. the finite defect from the \(1\leftrightarrow2\) CQCA background eventually disappears.

### Proof

The equivalence of 2 and 3 is equation (1).

If the full Collatz orbit reaches \(1\), then its odd subsequence reaches \(1\), proving \(1\Rightarrow2\). Conversely, if an odd iterate reaches \(1\), the full orbit reaches \(1\), proving \(2\Rightarrow1\).

Finally \(U(1)=1\), so one normalized row equal to \(1\) implies all subsequent normalized rows equal \(1\). Hence \(3\Leftrightarrow4\Leftrightarrow5\). ∎

Therefore the desired global statement

\[
\text{“Every nonzero finite binary input is eventually eroded”}
\]

is not a consequence of the representation theorem. It is a new statement **equivalent to Collatz itself**.

Also, “nilpotency” is slightly misleading. Standard CA nilpotency usually requires one common time after which every configuration is in the null state. Here the required time depends on the input and is necessarily unbounded. The correct terms are closer to **finite-defect mortality** or **erosion modulo a periodic background**.

---

## 3. What would a glider or spaceship actually encode?

The historical binary quasi-CA paper already described a failure of Collatz in CA language as either chaotic growth or the emergence of a stable “vehicle.” It also observed that unbounded carry propagation is what prevents the original binary description from being an ordinary finite-radius CA. citeturn898480view4turn360652view3

For the exact normalized CQCA, however, fixed gliders have a very specific meaning.

### Theorem 2 — Bounded persistent defects are cycles

Let

\[
x_k=U^k(x_0)
\]

and let

\[
L_k=\lfloor\log_2x_k\rfloor+1
\]

be the width of the normalized \(k\)-th row.

If the widths \(L_k\) remain bounded and the orbit never reaches \(1\), then the orbit enters a nontrivial positive cycle.

### Proof

If \(L_k\le B\), then every \(x_k\) belongs to the finite set of odd positive integers below \(2^B\). Therefore two iterates repeat:

\[
x_i=x_j,\qquad i<j.
\]

Since \(U\) is deterministic,

\[
x_i,x_{i+1},\ldots,x_{j-1}
\]

is a cycle. It cannot contain \(1\), by assumption. ∎

### Corollary 2.1 — A fixed spaceship is a cycle

Suppose a finite CQCA row pattern reappears after \(p\) odd rows, perhaps translated horizontally. Normalize by deleting trailing zeros and aligning the least significant \(1\). Translation then disappears, so

\[
\mathcal R_{k+p}=\mathcal R_k.
\]

Thus

\[
U^p(x_k)=x_k,
\]

which is a positive cycle.

So the statement in the proposed approach needs refinement:

- a **finite oscillator or spaceship** encodes a nontrivial cycle;
- a **divergent orbit** requires an expanding or otherwise unbounded defect—a puffer-like structure, not a fixed finite vehicle.

### Theorem 3 — A cycle-free counterexample grows without bound

If a positive orbit neither reaches \(1\) nor enters a cycle, then

\[
x_k\longrightarrow\infty
\]

and hence

\[
L_k\longrightarrow\infty.
\]

### Proof

Suppose \(x_k\not\to\infty\). Then there is an \(M\) such that \(x_k\le M\) for infinitely many \(k\). Only finitely many positive odd integers are at most \(M\), so one of them occurs twice. Determinism then gives a cycle, contrary to the assumption. ∎

This gives an exact CA trichotomy:

\[
\boxed{
\begin{array}{c}
\text{background erosion}\\
\text{or}\\
\text{bounded periodic defect}\\
\text{or}\\
\text{ever-widening aperiodic defect}.
\end{array}}
\]

The second case is a nontrivial cycle. The third is a divergent Collatz orbit.

---

## 4. Why bounded-depth erosion arguments fail

There are finite positive seeds that shadow a genuinely persistent \(2\)-adic CQCA phase for arbitrarily long times.

### Theorem 4 — Arbitrarily long expanding all-ones phases

For every \(r\ge1\), set

\[
x_0=2^{r+1}-1.
\]

Then, for \(0\le i\le r\),

\[
\boxed{x_i=3^i2^{r+1-i}-1,}
\tag{2}
\]

and for every \(0\le i<r\),

\[
\nu_2(3x_i+1)=1.
\]

Consequently the first \(r\) odd transitions are all expanding:

\[
x_{i+1}=\frac{3x_i+1}{2}>x_i.
\]

### Proof

The claim is clear for \(i=0\). Assuming (2),

\[
\begin{aligned}
3x_i+1
 &=3\left(3^i2^{r+1-i}-1\right)+1\\
 &=3^{i+1}2^{r+1-i}-2\\
 &=2\left(3^{i+1}2^{r-i}-1\right).
\end{aligned}
\]

For \(i<r\), the quantity in parentheses is odd, so the \(2\)-adic valuation is exactly \(1\). Therefore

\[
x_{i+1}=3^{i+1}2^{r-i}-1,
\]

which is (2) with \(i+1\). ∎

Thus there is no fixed number \(K\) such that every nonbackground row contracts, or even stops expanding, within \(K\) odd rows.

### The \(2\)-adic meaning

The binary words

\[
1,\quad11,\quad111,\quad1111,\ldots
\]

converge \(2\)-adically to

\[
\cdots111=-1.
\]

And \(-1\) is an exact fixed point:

\[
U(-1)=\frac{3(-1)+1}{2}=-1.
\]

The CQCA framework extends naturally to infinite binary inputs in \(\mathbb Z_2\), and the paper explicitly depicts the negative fixed cycle at \(-1\). citeturn354100view0turn541322view1

So \(2^{r+1}-1\) is a finite-support approximation to the persistent all-ones phase \(-1\). It follows that the positive finite seed shadows that immortal phase for \(r\) odd rows before its distant high-order zero boundary becomes visible.

This is the central CA obstruction:

> The local bulk can look exactly like a persistent glider for arbitrarily long periods. Any proof must use the eventual zero boundary of the finite binary input, not merely the local transition rule.

### A stronger finite-window shadowing lemma

Let \(x,y\in\mathbb Z_2\). If

\[
x\equiv y\pmod{2^q},
\]

then \(x\) and \(y\) have the same parity and

\[
T(x)\equiv T(y)\pmod{2^{q-1}}.
\]

Indeed, on the even branch,

\[
T(x)-T(y)=\frac{x-y}{2},
\]

and on the odd branch,

\[
T(x)-T(y)=\frac{3(x-y)}2.
\]

Inductively,

\[
x\equiv y\pmod{2^{M+t}}
\quad\Longrightarrow\quad
T^j(x)\equiv T^j(y)\pmod{2^M}
\]

for every \(0\le j\le t\).

Every \(2\)-adic input has a positive finite binary representative modulo \(2^{M+t}\). Therefore:

\[
\boxed{\text{Every bounded spacetime window of a persistent \(2\)-adic orbit
is reproduced by some positive finite input.}}
\]

This defeats a tempting compactness argument. Arbitrarily long nonbackground finite tableaux certainly have infinite local limits, but those limits can simply be infinite-support \(2\)-adic configurations such as \(-1\). Finite binary support is not a closed local condition.

It also means that no finite collection of forbidden CQCA patches can prove Collatz.

---

## 5. The exact front-speed equation

Let \(x=x_0\) be odd and define

\[
x_{i+1}=U(x_i),\qquad
a_i=\nu_2(3x_i+1).
\]

Set

\[
A_j=\sum_{i=0}^{j-1}a_i,
\qquad
S_r=A_r=\sum_{i=0}^{r-1}a_i.
\]

The exact affine identity is

\[
\boxed{
2^{S_r}x_r=3^r x+C_r,
}
\tag{3}
\]

where

\[
\boxed{
C_r=\sum_{j=0}^{r-1}3^{r-1-j}2^{A_j}.
}
\tag{4}
\]

### Proof

For \(r=1\),

\[
2^{a_0}x_1=3x+1.
\]

If (3) holds at \(r\), then

\[
\begin{aligned}
2^{S_{r+1}}x_{r+1}
 &=2^{S_r}(3x_r+1)\\
 &=3\left(3^rx+C_r\right)+2^{S_r}\\
 &=3^{r+1}x+\left(3C_r+2^{S_r}\right),
\end{aligned}
\]

and the expression in parentheses is exactly \(C_{r+1}\). ∎

In CQCA language:

- \(r\log_2 3\) is the ideal outward motion caused by \(r\) multiplications by \(3\);
- \(S_r\) is the total inward translation from deleting trailing-zero blocks;
- \(C_r\) is the accumulated flux from all \(+1\) carry injections.

Taking logarithms gives the exact front displacement:

\[
\boxed{
\log_2\frac{x_r}{x}
=
r\log_2 3-S_r
+
\log_2\left(1+\frac{C_r}{3^r x}\right).
}
\tag{5}
\]

The final term is positive. Therefore merely proving

\[
S_r>r\log_2 3
\]

is not always sufficient; the carry surplus must also be beaten.

The CQCA’s base-\(3\)-to-base-\(2\) duality geometrically represents these same arithmetic quantities, but it is an exact conversion identity rather than a dissipative inequality. citeturn771128view5

---

## 6. The precise missing nilpotency lemma

There is an elementary equivalent descent formulation of Collatz.

### Theorem 5 — Descent equivalence

The Collatz conjecture is equivalent to

\[
\boxed{
\forall x>1\text{ odd},\quad
\exists r\ge1\text{ such that }U^r(x)<x.
}
\tag{6}
\]

### Proof

If Collatz holds, the orbit eventually reaches \(1<x\), so (6) holds.

Conversely, assume (6). Use strong induction over odd positive integers. The case \(x=1\) is immediate. For odd \(x>1\), choose \(r\) with

\[
y=U^r(x)<x.
\]

By the induction hypothesis, \(y\) reaches \(1\), and therefore so does \(x\). Even starting values first reduce to their odd part. ∎

Substituting (3), condition \(x_r<x\) becomes

\[
3^rx+C_r<2^{S_r}x,
\]

or

\[
\boxed{
(2^{S_r}-3^r)x>C_r.
}
\tag{7}
\]

Thus a complete CQCA nilpotency proof must establish:

\[
\boxed{
\forall x>1\text{ odd},\quad
\exists r\ge1:
\quad
(2^{S_r}-3^r)x>C_r.
}
\tag{E}
\]

This is the exact **boundary-capture theorem**: eventually the total inward displacement from zero-block deletion must overtake both multiplication growth and accumulated carry flux.

### Minimal-counterexample formulation

If Collatz is false, choose the least odd counterexample \(x\). Then

\[
x_r\ge x\qquad\text{for every }r,
\]

because an iterate below \(x\) would converge by minimality and would carry \(x\) with it.

Equation (3) then gives

\[
3^rx+C_r=2^{S_r}x_r\ge2^{S_r}x,
\]

so the minimal counterexample satisfies the infinite family of barrier inequalities

\[
\boxed{
(2^{S_r}-3^r)x\le C_r
\qquad\text{for every }r\ge1.
}
\tag{8}
\]

In CA language, a counterexample is therefore a finite-support initial row whose moving information frontier satisfies (8) forever.

This meets the same obstruction exposed by your terminal-suffix locality theorem. Terminal \(3\)-adic divisibility may depend only on a bounded valuation suffix, but \(C_r\) contains the entire valuation prefix. Erosion requires a synchronization between the distant finite-support boundary, the accumulated prefix carries, and the terminal suffix state.

---

## 7. Why the obvious CA proof mechanisms do not close the gap

**Freezing order.**  
The partial order on cell states proves that each cell settles, but it settles while recording either a terminating or nonterminating Collatz tableau. Freezing is not an erasure invariant. More broadly, two-dimensional freezing cellular automata can support universal computation, so freezing alone does not imply simple global behavior. citeturn360652view0

**Counting active cells.**  
The number or width of active cells is not monotone. The inputs \(2^{r+1}-1\) give arbitrarily long intervals of strict growth.

**Fixed-horizon contraction.**  
The same examples rule out a universal \(K\) for which every block of \(K\) odd rows contracts.

**Glider exclusion.**  
Excluding all finite gliders only excludes positive cycles. A divergent counterexample is necessarily an unbounded puffer-like region.

**Compactness.**  
Taking limits of longer and longer survivor tableaux produces an infinite \(2\)-adic input, not necessarily one positive integer. The all-ones limit \(-1\) is already a persistent example.

**Local forbidden-pattern methods.**  
The finite-window shadowing lemma shows that every bounded patch of a persistent \(2\)-adic configuration occurs in a finite positive input.

**Base-conversion conservation laws.**  
Summing the full-adder equations reproduces (3)–(5). What is missing is a sign or well-founded rank; the exact conservation law itself supplies neither.

---

# Final status

The cellular-automaton program yields the following rigorous conclusions.

- The exact CQCA representation is valid.
- Ordinary temporal stabilization is automatic and unrelated to Collatz.
- Tail erosion modulo the \(1\leftrightarrow2\) background is exactly equivalent to Collatz.
- Every bounded persistent normalized pattern is a nontrivial cycle.
- Every cycle-free counterexample must produce an aperiodic defect whose binary width tends to infinity.
- Finite positive inputs can shadow immortal \(2\)-adic CQCA phases for arbitrarily long times.
- Consequently, neither fixed-window analysis, compactness, freezing, nor finite glider enumeration proves erosion.
- The unresolved theorem is precisely the boundary-capture inequality

\[
\forall x>1\text{ odd}\ \exists r:
\qquad
(2^{S_r}-3^r)x>C_r.
\]

Everything up to this boxed statement is proved above. Asserting the boxed statement without a new argument would simply reassert Collatz in the language of cellular-automaton front motion. A genuine completion of approach 29 must exploit the **eventually zero high-bit boundary** to rule out an infinite succession of \(2\)-adic glider shadows while controlling the global carry term \(C_r\).