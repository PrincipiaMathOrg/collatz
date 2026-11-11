model: GPT-5 Pro
round: 33 -- approach 28, Well-structured transition systems
front: proof
sent: 2026-08-13T19:14:56Z
worked: 52m 4s

---

# Result

I worked the proposed route through its exact logical bottleneck. **It does not currently produce a full proof of the Collatz conjecture.** More strongly, one can prove that several natural interpretations of “make the Collatz transducer a WSTS” are either impossible or circular:

1. An exact, label-preserving, strongly monotone WQO cannot exist on the canonical Collatz states.
2. An unlabeled strongly monotone WQO always exists nonconstructively, using total stopping time, whether or not Collatz is true; so existence alone proves nothing.
3. A branch-WSTS formulation is meaningful, but its existence is equivalent to proving that every infinite Collatz orbit is eventually periodic. It rules out divergent orbits only after one has proved the substantive Collatz-specific statement.
4. Even then, nontrivial positive cycles still have to be excluded.

Thus I cannot honestly supply the requested unconditional proof. What follows is a rigorous reduction, two no-go theorems, and an exact statement of the missing theorem that would complete the proof.

The relevant established literature supplies the surrounding ingredients: finite-state transducers for \(3x+1\) and division, and a mixed binary–ternary rewriting system whose termination is equivalent to Collatz. It does not supply the required WQO compatibility theorem. citeturn286238view3turn286238view4 The accepted pointwise conjecture also remains beyond Tao’s almost-all result. citeturn286238view6turn286238view7

---

## 1. The exact labelled transition system

Use the shortcut Collatz map, with \(1\) made absorbing:

\[
T(n)=
\begin{cases}
1,&n=1,\\[2mm]
n/2,&n>1 \text{ even},\\[2mm]
(3n+1)/2,&n>1 \text{ odd}.
\end{cases}
\]

Attach the label

\[
\lambda(n)=
\begin{cases}
\mathtt H,&n=1,\\
0,&n>1\text{ even},\\
1,&n>1\text{ odd}.
\end{cases}
\]

Thus every state has one deterministic labelled transition

\[
n\xrightarrow{\lambda(n)}T(n).
\]

The Collatz conjecture says precisely that every label sequence is eventually

\[
\mathtt H\mathtt H\mathtt H\cdots .
\]

### The carry transducer

Suppose \(n=\sum_{i\geq0}b_i2^i\), read least-significant bit first, and set \(b_{-1}=0\). To compute

\[
3n+1=n+2n+1,
\]

let \(c_0=1\) and define

\[
s_i=b_i+b_{i-1}+c_i,
\qquad
d_i=s_i\bmod 2,
\qquad
c_{i+1}=\left\lfloor\frac{s_i}{2}\right\rfloor .
\]

The state is just

\[
q_i=(b_{i-1},c_i)\in\{0,1\}^2,
\]

so multiplication by \(3\) and addition of \(1\) are realized by a four-state binary transducer. For odd \(n\), the first output bit is \(d_0=0\), and the shortcut division deletes this bit. This is equivalent to the finite-state \(3x+1\) transducer appearing in Stérin’s construction. citeturn286238view3

The finite carry set is therefore not the difficulty. The difficulty is resetting the output word as the input to the next transducer scan after deleting a low bit.

---

## 2. The precision-loss theorem

Let

\[
n_t=T^t(n),\qquad
\epsilon_t=n_t\bmod 2
\]

for a segment of an orbit that has not yet reached \(1\), and let

\[
s_t=\epsilon_0+\cdots+\epsilon_{t-1}.
\]

### Lemma 1: affine block identity

For every \(t\),

\[
2^tT^t(n)=3^{s_t}n+C_t,
\]

where

\[
C_0=0,
\qquad
C_{t+1}=3^{\epsilon_t}C_t+\epsilon_t2^t.
\]

Equivalently, for a parity word
\(\epsilon=(\epsilon_0,\ldots,\epsilon_{t-1})\),

\[
C_\epsilon
=
\sum_{\substack{0\leq i<t\\ \epsilon_i=1}}
2^i3^{\epsilon_{i+1}+\cdots+\epsilon_{t-1}}.
\]

### Proof

Suppose

\[
2^tn_t=3^{s_t}n+C_t.
\]

If \(n_t\) is even, then

\[
2^{t+1}n_{t+1}=2^tn_t,
\]

so \(s_{t+1}=s_t\) and \(C_{t+1}=C_t\).

If \(n_t\) is odd, then

\[
2^{t+1}n_{t+1}
=
2^t(3n_t+1)
=
3(3^{s_t}n+C_t)+2^t,
\]

so \(s_{t+1}=s_t+1\) and

\[
C_{t+1}=3C_t+2^t.
\]

This proves the recurrence. ∎

### Lemma 2: parity cylinders are exactly binary congruence classes

For positive integers \(x,y\), the following are equivalent, provided neither trajectory halts during these \(t\) steps:

\[
\lambda(T^i x)=\lambda(T^i y)
\quad(0\leq i<t),
\]

and

\[
x\equiv y\pmod {2^t}.
\]

Moreover, when these conditions hold,

\[
T^t(y)-T^t(x)
=
3^{s_t}\frac{y-x}{2^t},
\]

and therefore, for \(x\ne y\),

\[
v_2\!\left(T^t(y)-T^t(x)\right)
=
v_2(y-x)-t.
\tag{1}
\]

### Proof

If the two integers have the same parity word, subtract their affine identities:

\[
2^t\bigl(T^t(y)-T^t(x)\bigr)
=
3^{s_t}(y-x).
\]

The left side is divisible by \(2^t\), while \(3^{s_t}\) is odd, so \(2^t\mid y-x\). The difference formula and (1) follow immediately.

Conversely, suppose \(x\equiv y\pmod {2^t}\). They have the same first parity. Because the same affine branch is applied to both, their first images differ by either

\[
\frac{y-x}{2}
\quad\text{or}\quad
\frac{3(y-x)}2,
\]

which is divisible by \(2^{t-1}\). Induction gives equality of the first \(t\) parity labels. ∎

### Corollary 3: itinerary injectivity

Two positive integers with the same infinite Collatz parity itinerary are equal.

Indeed, Lemma 2 gives

\[
x\equiv y\pmod {2^t}
\]

for every \(t\), hence \(x=y\).

This is the exact form of the obstruction. **Every complete Collatz microstep spends one bit of shared \(2\)-adic precision.** Multiplication by \(3\) changes the magnitude and \(3\)-adic divisibility of a difference, but it does not replace the binary precision needed to synchronize the next branch.

For the odd-only map

\[
U(n)=\frac{3n+1}{2^{v_2(3n+1)}},
\]

if two seeds realize the same valuation word
\(w=(a_0,\ldots,a_{j-1})\), with \(A=\sum a_i\), then analogously

\[
U^j(y)-U^j(x)=3^j\frac{y-x}{2^A},
\]

so that block spends exactly \(A\) binary digits of shared precision.

---

## 3. No exact label-preserving strong WSTS exists

A WSTS consists of a transition system equipped with a WQO compatible with its transitions. Strong monotonicity requires a larger configuration to simulate each transition of a smaller one in one step. citeturn286238view0

For an exact labelled transducer, the natural requirement is action-compatible strong monotonicity:

\[
x\preceq y,\quad x\xrightarrow{a}x'
\quad\Longrightarrow\quad
y\xrightarrow{a}y'
\text{ and }x'\preceq y'.
\tag{2}
\]

### Theorem 4: trace-separation obstruction

There is no WQO \(\preceq\) on the canonical positive-integer Collatz configurations satisfying (2).

### Proof

Suppose \(x\preceq y\).

Because the transition from \(y\) is deterministic and has only the label \(\lambda(y)\), condition (2) implies

\[
\lambda(x)=\lambda(y)
\quad\text{and}\quad
T(x)\preceq T(y).
\]

Applying the same argument repeatedly gives

\[
\lambda(T^k x)=\lambda(T^k y)
\qquad\text{for every }k\geq0.
\]

Thus \(x\) and \(y\) have identical infinite labelled itineraries. By Corollary 3,

\[
x=y.
\]

Consequently, distinct canonical integers are pairwise incomparable. The canonical state set is infinite, so the sequence

\[
1,2,3,4,\ldots
\]

has no increasing pair. Hence \(\preceq\) is not a WQO. ∎

### Consequence

Adding finitely many carry states, modes, residue labels, or transducer phases cannot repair this. If the augmented state space were WQO, its infinite subset of canonical boundary configurations would also be WQO. But exact label-compatible monotonicity would again force two comparable canonical configurations to have the same complete itinerary and therefore the same seed.

So the most direct interpretation of the proposed program is formally impossible:

> There is no exact, branch-label-preserving, strongly monotone WSTS presentation of Collatz on its canonical integer states.

One must either forget some labels, weaken monotonicity, or use branch-monotonicity only for ancestor–descendant comparisons.

---

## 4. Why the obvious WQOs fail

The abstract theorem above explains all of the elementary failures.

| Proposed order | Why it is a WQO | Exact failure |
|---|---|---|
| Numerical order \(x\leq y\) | \(\mathbb N\) is well-ordered | \(3<4\), but \(T(3)=5>2=T(4)\). |
| Binary scattered-subword order | Higman’s lemma | \(11\sqsubseteq101\), so \(3\sqsubseteq5\), but \(101\not\sqsubseteq1000\), so \(T(3)\not\sqsubseteq T(5)\). |
| Same residue mod \(2^K\), then numerical order | Finite union of chains | \(3\equiv3+2^K\pmod{2^K}\), but their images differ by \(3\cdot2^{K-1}\), not by a multiple of \(2^K\). |
| Exact low-bit prefix/cylinder order | Preserves branch information | It is not a WQO: the least-significant-first words \(0^k1\), representing powers of two, form an antichain under prefix inclusion. |
| Reverse cylinder inclusion | Compatible with refinement | The nested cylinders \(1,10,100,\ldots\), meaning \(n\equiv1\pmod{2^k}\), give an infinite descending chain. |
| Finite carry-state order | Finite, hence WQO | The carry state does not retain the unbounded sequence of low bits required after repeated resets and shifts. |

The fixed-residue example is not an accident. If an order is forward-invariant and comparability guarantees even one common low bit, then iterating monotonicity guarantees a common low bit after every future step. By Lemma 2 this requires arbitrarily many common low bits initially, hence equality.

---

## 5. Merely finding some WQO is circular

There is also a converse danger: if labels and effectiveness are ignored, constructing a monotone WQO is trivial.

Let

\[
\tau(n)=
\begin{cases}
\min\{k:T^k(n)=1\},&\text{if the orbit reaches }1,\\
\omega,&\text{otherwise},
\end{cases}
\]

and order \(0<1<2<\cdots<\omega\). Define

\[
x\preceq_\tau y
\quad\Longleftrightarrow\quad
\tau(x)\leq\tau(y).
\]

### Proposition 5

The relation \(\preceq_\tau\) is a WQO, and the unlabelled Collatz map is strongly monotone under it.

### Proof

The order \(0<1<2<\cdots<\omega\) is a well-order, so its pullback is a WQO.

For a terminating nonterminal state,

\[
\tau(Tn)=\tau(n)-1.
\]

For a nonterminating state,

\[
\tau(Tn)=\omega.
\]

Thus \(\tau(x)\leq\tau(y)\) implies

\[
\tau(Tx)\leq\tau(Ty).
\]

Therefore the transition is strongly monotone. ∎

This construction works whether Collatz is true or false. If bad states exist, every bad state has rank \(\omega\), and any one of them is a one-element basis for the entire upward-closed bad set.

But determining this order effectively requires knowing which states have rank \(\omega\). Thus the purported finite basis has simply hidden the Collatz conjecture inside the comparison oracle.

This demonstrates why the adjectives **effective**, **arithmetic**, and **independently verifiable** are indispensable.

---

## 6. Reachability of \(1\) is not ordinary WSTS coverability

There is another unconditional obstruction.

### Proposition 6

Under any strongly monotone WQO on the Collatz states, the singleton target \(\{1\}\) cannot be upward-closed.

### Proof

Consider

\[
2,4,8,16,\ldots .
\]

Since the order is a WQO, there exist \(i<j\) such that

\[
2^i\preceq2^j.
\]

Apply strong monotonicity \(i\) times:

\[
T^i(2^i)\preceq T^i(2^j).
\]

But

\[
T^i(2^i)=1,
\qquad
T^i(2^j)=2^{j-i}>1.
\]

Hence

\[
1\preceq2^{j-i}
\]

for a nonterminal state \(2^{j-i}\). Therefore \(\uparrow\{1\}\ne\{1\}\). ∎

So the generic coverability query “can one reach something above \(1\)?” cannot be identified with “can one reach \(1\)?” Under any such WQO, at least one nonterminal power of two already covers \(1\) before moving.

This matches a standard limitation of WSTS methodology: it is particularly effective for upward-closed coverability and termination properties, but exact reachability can be substantially harder and is not generically handled by the WSTS axioms. citeturn286238view5

---

## 7. The meaningful weakening: branch-WSTS

A branch-WSTS weakens global strong monotonicity. The relevant condition is:

\[
x\xrightarrow{\sigma}x',
\quad x\preceq x'
\quad\Longrightarrow\quad
x'\xrightarrow{\sigma}y
\text{ for some }y\text{ with }x'\preceq y.
\tag{3}
\]

In words, only when a run reaches a later state covering an earlier state must the intervening labelled block be pumpable. This is called branch-monotonicity. citeturn286238view1

A branch-WQO requires every infinite run to contain an increasing ancestor–descendant pair.

### Theorem 7: branch-WSTS forces periodicity

Suppose the exact labelled Collatz transition system admits a branch-WQO satisfying (3). Then every Collatz orbit is eventually periodic.

### Proof

Take an infinite orbit

\[
x_0\xrightarrow{\epsilon_0}x_1
\xrightarrow{\epsilon_1}x_2
\xrightarrow{\epsilon_2}\cdots .
\]

Because the order is a branch-WQO, there exist \(i<j\) with

\[
x_i\preceq x_j.
\]

Let

\[
\sigma=\epsilon_i\epsilon_{i+1}\cdots\epsilon_{j-1}.
\]

Then

\[
x_i\xrightarrow{\sigma}x_j.
\]

By branch-monotonicity, the same word \(\sigma\) is enabled at \(x_j\), and its endpoint covers \(x_j\). Repeating the argument shows that the actual deterministic label sequence from \(x_j\) is

\[
\sigma^\omega
=
\sigma\sigma\sigma\cdots .
\]

The label sequence from \(x_i\) is also \(\sigma^\omega\), since it begins with \(\sigma\) and then reaches \(x_j\).

Thus \(x_i\) and \(x_j\) have the same infinite itinerary. Corollary 3 gives

\[
x_i=x_j.
\]

Hence the orbit has entered a cycle. ∎

### Converse

If every Collatz orbit is eventually periodic, take equality as the quasiorder.

Equality is branch-monotone: if

\[
x\xrightarrow{\sigma}x'
\quad\text{and}\quad x=x',
\]

then the deterministic cycle repeats \(\sigma\).

Equality is a branch-WQO because every infinite orbit contains a repeated state.

Therefore:

\[
\boxed{
\begin{aligned}
&\text{An exact branch-monotone branch-WQO exists}\\
&\qquad\Longleftrightarrow\\
&\text{every positive Collatz orbit is eventually periodic.}
\end{aligned}}
\tag{4}
\]

This is the sharpest conclusion of the WSTS analysis.

It means that finding such a branch-WQO would indeed exclude divergent orbits—but the existence theorem is exactly equivalent to excluding them. The WSTS framework reorganizes the problem; it does not by itself supply the missing arithmetic rigidity.

---

## 8. What happens at a pumped block

Let \(\sigma\) have length \(p\), with \(s\) odd labels. Its affine action is

\[
2^pT^p(x)=3^s x+C_\sigma.
\]

Theorem 7 shows that a branch-WSTS self-covering block must actually satisfy

\[
T^p(x)=x.
\]

Consequently,

\[
(2^p-3^s)x=C_\sigma.
\tag{5}
\]

Since \(C_\sigma>0\), a positive cycle requires

\[
2^p>3^s,
\]

and its least state is uniquely determined by the word:

\[
x=\frac{C_\sigma}{2^p-3^s}.
\tag{6}
\]

Thus each subsumed node of a correct reduced reachability tree would produce one of two things:

- the trivial terminal behavior at \(1\); or
- an exact positive integral cycle certificate (5).

No third possibility is compatible with exact branch-monotonicity.

This is useful: a finite reduced reachability tree would reduce cycle exclusion to finitely many exact divisibility and parity checks. Branch-effective branch-WSTS do have finite, computable reduced reachability trees for a fixed initial state, and nontermination can be decided by checking for subsumed nodes. citeturn286238view2

But Collatz requires one certificate covering **all** binary inputs, not one fixed seed. Generic branch-WSTS theory does not automatically turn the infinitely many initial integers into a single finitely branching initial configuration without adding spurious infinite “keep generating digits” runs.

---

## 9. The exact theorem that would complete the proof

A genuine WSTS proof of Collatz would follow from the following result.

### Missing Carry-WQO Theorem

There exists an effectively decidable quasiorder \(\preceq\) on normalized Collatz carry configurations such that:

1. **Exact representation.** Every positive integer has a canonical configuration, and complete transducer passes agree exactly with \(T\).
2. **Uniform branch-WQO.** Every infinite canonical run contains \(i<j\) with
   \[
   c_i\preceq c_j.
   \]
3. **Exact branch-monotonicity.** If
   \[
   c_i\xrightarrow{\sigma}c_j,\qquad c_i\preceq c_j,
   \]
   then \(\sigma\) can be repeated from \(c_j\), preserving the comparison.
4. **Uniform finite initialization.** All finite binary input words are represented by one effective finite reduced reachability forest, without introducing an infinite digit-generation branch.
5. **Cycle certificate.** Every self-covering node in that forest either belongs to the \(1\)-component or yields equation (5), and exact arithmetic verification rejects all nontrivial candidates.

### Conditional proof

Assume these five properties and suppose some \(n\) never reaches \(1\).

Its canonical orbit gives an infinite branch in the uniform forest. By property 2, this branch contains a comparable ancestor pair. Property 3 pumps the intervening label block. By Theorem 7, the orbit is periodic. Property 5 then produces a valid nontrivial positive cycle equation, contradicting the finite exact cycle verification. Therefore every \(n\) reaches \(1\). ∎

The proof after the Missing Carry-WQO Theorem is complete. The theorem itself is not established.

---

## 10. The precise obstruction to proving the missing theorem

Suppose a comparison \(x\preceq y\) is intended to certify that a parity block of length \(p\) can repeat. Then necessarily

\[
x\equiv y\pmod{2^p}.
\]

After one copy of the block,

\[
v_2\!\left(T^p(y)-T^p(x)\right)
=
v_2(y-x)-p.
\]

To certify a second copy, the original difference must therefore have been divisible by \(2^{2p}\). To certify \(r\) copies, it must have been divisible by \(2^{rp}\). Infinite pumping requires

\[
v_2(y-x)=\infty,
\]

hence

\[
x=y.
\]

So no bounded amount of carry, residue, or low-digit information can certify the required pumping of a distinct pair.

A successful order would have to obtain comparability without interpreting it as fixed-depth branch synchronization, while still proving synchronization once the comparable states lie on the same run. That is an unusually delicate combination:

- globally coarse enough to be a WQO;
- locally exact enough not to pump \(3\to5\) spuriously;
- able to recover unbounded \(2\)-adic precision from some other arithmetic coordinate;
- effective on all finite binary inputs.

The only plausible escape is a genuinely two-ended order in which loss of binary precision is compensated by another exact coordinate—perhaps a \(3\)-adic carry ideal together with an archimedean barrier. The terminal-suffix locality phenomenon is relevant to making the \(3\)-adic coordinate finite-state, but it does not yet provide the missing compensation: \(3\)-adic precision cannot by itself determine future binary branch labels.

---

# Final assessment

The well-structured-transition-system program does not presently yield a Collatz proof. Its rigorous output is instead the following:

\[
\boxed{\text{Exact label-preserving strong WSTS: impossible.}}
\]

\[
\boxed{\text{Unlabelled WSTS existence: nonconstructively trivial and circular.}}
\]

\[
\boxed{\text{Exact branch-WSTS existence: equivalent to eventual periodicity of all orbits.}}
\]

\[
\boxed{\text{A full proof additionally requires uniform finite initialization and cycle exclusion.}}
\]

The most important new lemma is the precision-loss identity

\[
v_2\!\left(T^t(y)-T^t(x)\right)=v_2(y-x)-t
\]

for synchronized parity blocks. It explains exactly why multiplication by \(3\) plus right shifting defeats every fixed-window digit or carry WQO, and it shows that the missing monotonicity theorem cannot be repaired merely by recording a larger fixed modulus.