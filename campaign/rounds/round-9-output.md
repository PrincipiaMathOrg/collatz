model: GPT-5 Pro
round: 9 -- approach 4, A Cobham trap for counterexample carry streams
front: proof
sent: 2026-08-13T18:26:52Z
worked: 62m 33s

---

# Result of the Cobham program

After carrying the approach through, the strongest valid conclusion is a **conditional cycle theorem**, not yet a full proof of Collatz.

There are two independent gaps:

1. The known base-\(2\) and base-\(3\) transducers act on the digits of the **current orbit value**. Cobham’s theorem requires a finite automaton acting on the base-\(2\) or base-\(3\) digits of the **time index** \(j\). The first property does not imply the second.

2. Even if the required dual automaticity were established, Cobham would force the orbit to become periodic, but it would not exclude a nontrivial positive cycle. Indeed, the carry stream of any cycle is already periodic and therefore automatic in every base.

Current 2026 research continues to treat Collatz as an open conjecture. citeturn889744view6turn444644search2

What follows is the exact theorem that this program does prove, followed by rigorous obstructions to completing the two missing steps.

---

## 1. The accelerated orbit and its carry data

Work with the accelerated odd Collatz map

\[
U(x)=\frac{3x+1}{2^{\nu _2(3x+1)}}
\]

on positive odd integers. Let

\[
x_{j+1}=U(x_j),\qquad
a_j=\nu _2(3x_j+1)\geq 1,
\]

and set

\[
A_0=0,\qquad A_m=\sum_{j=0}^{m-1}a_j.
\]

For a finite valuation word

\[
w=(a_0,\ldots ,a_{m-1}),
\]

define

\[
C_w=\sum_{i=0}^{m-1}3^{m-1-i}2^{A_i}.
\]

Repeated substitution in

\[
2^{a_j}x_{j+1}=3x_j+1
\]

gives the exact affine identity

\[
\boxed{\,2^{A_m}x_m=3^m x_0+C_w.\,} \tag{1}
\]

This identity contains both the \(2\)-adic seed information and the \(3\)-adic endpoint information.

---

## 2. What Cobham’s theorem would actually need

For a finite-alphabet sequence \(z=(z_j)_{j\geq0}\), its base-\(b\) kernel is

\[
\mathcal K_b(z)=
\left\{
(z_{b^e n+r})_{n\geq0}:
e\geq0,\ 0\leq r<b^e
\right\}.
\]

The sequence is \(b\)-automatic precisely when \(\mathcal K_b(z)\) is finite. Equivalently, a finite automaton reads the base-\(b\) representation of the integer \(j\) and outputs \(z_j\). Cobham’s theorem says that a finite-valued sequence which is automatic in two multiplicatively independent bases is eventually periodic. Bell’s regular-sequence extension applies to certain unbounded integer sequences. citeturn359099view0turn296455view0turn296455view1turn296455view2

Because the valuation sequence \(a_j\) need not be bounded, its natural automatic object is its graph

\[
\Gamma_a=\{(j,a_j):j\geq0\}\subseteq\mathbb N^2.
\]

Call \(\Gamma_a\) \(b\)-recognizable when a synchronous finite automaton recognizes the padded base-\(b\) representations of the pairs \((j,a_j)\).

The multidimensional Cobham–Semenov theorem states that a subset of \(\mathbb N^d\) recognizable in two multiplicatively independent bases is Presburger-definable, equivalently semilinear. citeturn158241view1turn296455view3

This gives the central rigorous result.

---

# Theorem 1: the valuation-graph Cobham trap

Let \((x_j)\) be a positive orbit of the accelerated odd Collatz map, and let

\[
a_j=\nu _2(3x_j+1).
\]

Suppose that the graph

\[
\Gamma_a=\{(j,a_j):j\geq0\}
\]

is both \(2\)-recognizable and \(3\)-recognizable. Then \(a_j\) is eventually periodic, and the Collatz orbit \((x_j)\) eventually enters a cycle.

## Proof

First observe that

\[
2^{a_j}x_{j+1}=3x_j+1\leq4x_j,
\]

because \(x_j\geq1\). Multiplying this inequality for \(j=0,\ldots ,n-1\) and cancelling the intermediate orbit values gives

\[
2^{A_n}x_n\leq4^n x_0.
\]

Since \(x_n\geq1\),

\[
\boxed{\,A_n\leq 2n+\log _2x_0.\,} \tag{2}
\]

Thus the cumulative valuation sum has at most linear growth.

By Cobham–Semenov, the simultaneous \(2\)- and \(3\)-recognizability of \(\Gamma_a\) implies that \(\Gamma_a\) is Presburger-definable. A function whose graph is Presburger-definable is piecewise linear on finitely many arithmetic progressions. citeturn889744view8turn296455view4

Consequently, there exist \(M\geq1\), \(N\), and constants \(\alpha_r,\beta_r\) such that, for every \(0\leq r<M\),

\[
a_{Mt+r}=\alpha_r t+\beta_r \tag{3}
\]

whenever \(Mt+r\geq N\).

Because \(a_j\geq1\), no \(\alpha_r\) can be negative. Suppose that \(\alpha_r>0\) for some residue class \(r\). Then

\[
\sum_{t\leq T}a_{Mt+r}
=
\frac{\alpha_r}{2}T^2+O(T),
\]

so \(A_{MT}\gg T^2\). This contradicts the linear bound (2). Hence

\[
\alpha_r=0
\]

for every \(r\), and therefore

\[
a_{j+M}=a_j
\]

for all sufficiently large \(j\).

Now expand the accelerated valuations into the ordinary shortcut-map parity stream. One accelerated step with valuation \(a_j\) contributes the block

\[
1\,0^{a_j-1}.
\]

Thus the ordinary parity sequence has the form

\[
1\,0^{a_0-1}
1\,0^{a_1-1}
1\,0^{a_2-1}\cdots . \tag{4}
\]

Eventual periodicity of \((a_j)\) implies eventual periodicity of this binary parity stream.

The standard \(2\)-adic parity map \(Q\) is a bijection on \(\mathbb Z_2\) and conjugates the shortcut Collatz map to the binary shift. Hence two orbit points with the same infinite parity tail are equal as \(2\)-adic integers. If the parity tail has period \(L\) beginning at ordinary time \(t_0\), then

\[
Q(T^{t_0+L}x_0)
=
S^{t_0+L}Q(x_0)
=
S^{t_0}Q(x_0)
=
Q(T^{t_0}x_0),
\]

and injectivity of \(Q\) gives

\[
T^{t_0+L}x_0=T^{t_0}x_0.
\]

Thus the positive-integer orbit enters a cycle. ∎

The parity-map bijection, its isometry property, and the conjugacy with the binary shift are standard facts about the \(2\)-adic Collatz extension. citeturn889744view0turn889744view1turn889744view2

---

## 3. A regular-sequence version

There is an alternative formulation that may be more natural for the unbounded sequence \(a_j\).

# Theorem 2: the regular valuation trap

If the integer sequence \((a_j)\) is simultaneously \(2\)-regular and \(3\)-regular, then it is eventually periodic and the orbit enters a cycle.

## Proof

Bell’s generalized Cobham theorem implies that

\[
F(z)=\sum_{j\geq0}a_jz^j
\]

is a rational function whose poles are roots of unity. citeturn359099view0turn296455view2

Therefore there is some \(M\geq1\) such that, on each residue class modulo \(M\),

\[
a_{Mt+r}=P_r(t) \tag{5}
\]

for all sufficiently large \(t\), where \(P_r\) is a polynomial.

If some \(P_r\) had degree \(d\geq1\), then eventual positivity would force its leading coefficient to be positive, and the partial sums of \(a_j\) along this residue class would grow like \(T^{d+1}\). This again contradicts (2). Hence every \(P_r\) is constant, so \(a_j\) is eventually periodic. Theorem 1 then gives a cycle. ∎

Thus either of the following would eliminate divergent Collatz trajectories:

\[
\Gamma_a
\text{ simultaneously \(2\)- and \(3\)-recognizable},
\]

or

\[
(a_j)\text{ simultaneously \(2\)- and \(3\)-regular}.
\]

The problem is establishing either statement.

---

# 4. Arithmetic transducers are not time-index automata

The crucial distinction is between two different kinds of finite-state object.

An **arithmetic transducer** reads the digits of \(x\) and computes the digits of \(f(x)\).

A **time-index automaton** reads the digits of \(j\) and outputs something about the \(j\)-th iterate \(f^j(x_0)\).

The first does not imply the second.

For example, the map

\[
F(x)=2x
\]

is computed by a finite transducer in every positional base. Nevertheless, starting from \(1\), its orbit is

\[
x_j=2^j.
\]

If the graph

\[
\{(j,2^j):j\geq0\}
\]

were recognizable in both bases \(2\) and \(3\), Cobham–Semenov would make it Presburger-definable. But Presburger-definable functions are piecewise linear, whereas \(2^j\) is exponential. Therefore the orbit graph is not simultaneously recognizable.

So even an extremely simple finite-state transition can produce a time-indexed orbit with unbounded automaton complexity.

This distinction applies directly to the known binary/ternary Collatz transducers. Stérin and Woods construct a two-dimensional system in which one finite-state transducer computes \(x/2\) in ternary columns while another computes \(3x+1\) in binary rows. But these are spatial digit transducers, not automata reading the iteration number. Their infinite \(2\)-adic/\(3\)-adic base conversion remains conjectural, and their cycle construction reformulates positive-cycle exclusion as a reachability problem rather than resolving it. citeturn889744view3turn889744view4turn889744view5turn296455view5turn296455view6turn296455view7

A 2026 preprint also proves that a generalized arbitrary-step Collatz transition relation is not definable in base-\(2\) Büchi arithmetic. That result concerns the full transition relation rather than a specially selected counterexample orbit, but it reinforces the need to distinguish local digit computation from time-index automaticity. citeturn102710view0

---

## 5. The \(2\)-adic conjugacy is not itself a finite transducer

The parity map gives a perfect \(2\)-adic coding, but perfect coding does not mean finite-state coding.

Let \(\Phi=Q^{-1}\) be the inverse parity map. For a binary sequence \(s=(s_k)\), one has

\[
\Phi(s)
=
-\sum_{k\geq0}s_k2^k3^{-\sigma_k},
\qquad
\sigma_k=s_0+\cdots+s_k.
\tag{6}
\]

Consider

\[
s^{(m)}=1^m0^\infty.
\]

Then

\[
\Phi(s^{(m)})
=
-\sum_{k=0}^{m-1}\frac{2^k}{3^{k+1}}
=
-1+\left(\frac23\right)^m. \tag{7}
\]

Modulo \(2^m\), this is \(-1\), so its first \(m\) low-order binary digits are all \(1\). Removing those \(m\) digits leaves the \(2\)-adic tail

\[
\frac{\Phi(s^{(m)})-(2^m-1)}{2^m}
=
3^{-m}-1. \tag{8}
\]

These tails are distinct for distinct \(m\).

Suppose a finite synchronous transducer, reading parity digits from least significant to most significant, computed \(\Phi\). After reading the prefix \(1^m\), it would be in some state \(q_m\). Finitely many states imply \(q_m=q_n\) for some \(m\neq n\). In both cases the remaining input is \(0^\infty\), so the transducer would produce the same remaining output. But (8) says the two output tails are different. Contradiction.

Therefore:

\[
\boxed{\Phi\text{ is not realizable by a finite causal synchronous digit transducer}.}
\]

This does not rule out special finite-state behavior on one extraordinary orbit. It does rule out obtaining the desired base-\(2\) automaton merely by invoking the known \(2\)-adic conjugacy.

---

# 6. Exact finite-depth \(3\)-adic suffix locality

Iterating the accelerated recurrence backwards for \(R\) steps gives, for \(j\geq R\),

\[
\begin{aligned}
x_j={}&
3^R2^{-(a_{j-R}+\cdots+a_{j-1})}x_{j-R}
\\
&+
\sum_{k=1}^{R}
3^{k-1}
2^{-(a_{j-k}+\cdots+a_{j-1})}.
\end{aligned}
\]

Reducing modulo \(3^R\) removes the first term:

\[
\boxed{
x_j\equiv
\sum_{k=1}^{R}
3^{k-1}
2^{-(a_{j-k}+\cdots+a_{j-1})}
\pmod{3^R}.
}
\tag{9}
\]

Thus the endpoint modulo \(3^R\) depends only on the final \(R\) valuations, reduced modulo the multiplicative order of \(2\) modulo \(3^R\).

By the lifting-the-exponent identity,

\[
\nu _3\!\left(2^{2\cdot3^{R-1}}-1\right)=R,
\]

and hence

\[
\lambda_R:=\operatorname{ord}_{3^R}(2)
=
2\cdot3^{R-1}. \tag{10}
\]

In particular, \(2\) is a primitive root modulo \(3^R\).

Formula (9) is a genuine finite-depth suffix theorem. But it is a sliding-block computation on the valuation word. It is not an automaton reading the base-\(3\) digits of \(j\).

There is a more serious problem: fixed-depth carry information is maximally non-rigid.

---

# Theorem 3: fixed-depth endpoint universality

Fix \(R,N\geq1\). Let

\[
r_0\in\mathbb Z/3^R\mathbb Z
\]

be arbitrary, and let

\[
r_1,\ldots ,r_N
\in
(\mathbb Z/3^R\mathbb Z)^\times
\]

be arbitrary units.

Then there exists a positive odd integer \(x_0\) whose first \(N\) accelerated iterates satisfy

\[
x_j\equiv r_j\pmod{3^R}
\qquad (0\leq j\leq N).
\]

## Proof

For each \(0\leq j<N\), the desired recurrence modulo \(3^R\) is

\[
r_{j+1}
\equiv
2^{-a_j}(3r_j+1)
\pmod{3^R},
\]

equivalently

\[
2^{a_j}
\equiv
(3r_j+1)r_{j+1}^{-1}
\pmod{3^R}. \tag{11}
\]

The right-hand side is a unit modulo \(3^R\). Since \(2\) generates the full unit group, an exponent \(a_j\geq1\) satisfying (11) always exists.

We have therefore constructed a finite valuation word

\[
(a_0,\ldots ,a_{N-1}).
\]

Consider the corresponding ordinary parity prefix

\[
1\,0^{a_0-1}
1\,0^{a_1-1}
\cdots
1\,0^{a_{N-1}-1}1.
\tag{12}
\]

Let

\[
L=1+\sum_{j=0}^{N-1}a_j.
\]

The bijectivity and isometry of the \(2\)-adic parity map imply that the prefix (12) determines one residue class

\[
x_0\equiv c\pmod{2^L}
\]

of odd integers whose first \(N\) accelerated valuations are exactly the prescribed \(a_j\).

Now combine

\[
x_0\equiv c\pmod{2^L},
\qquad
x_0\equiv r_0\pmod{3^R}
\]

using the Chinese remainder theorem. Choose a positive representative. Its valuation word is the required one, and induction using (11) gives

\[
x_j\equiv r_j\pmod{3^R}
\]

for every \(j\leq N\). ∎

---

## Consequences

At any fixed \(3\)-adic depth, there are **no forbidden finite endpoint words** after the initial position: every finite word over the unit residues modulo \(3^R\) occurs along some positive-integer Collatz segment.

In particular, every finite binary pattern of carry events

\[
\mathbf 1_{\{3^R\mid x_j+1\}}
\]

can occur. To realize a desired \(1\), choose \(r_j=-1\pmod{3^R}\); to realize a desired \(0\), choose any other unit.

This does not prove that the carry stream of one hypothetical divergent orbit is nonautomatic. It proves that automaticity cannot follow from finite-depth local transition constraints or from the absence of certain carry blocks: no such blocks are absent.

---

## 7. Fixed-depth carries do not determine the valuation word

Equation (11) determines \(a_j\) only modulo

\[
\lambda_R=2\cdot3^{R-1}.
\]

Thus

\[
a_j
\quad\text{and}\quad
a_j+t\lambda_R
\]

produce the same transition modulo \(3^R\).

Fix any residue \(r_0\pmod{3^R}\). Starting from the same residue, replace arbitrarily many valuations by

\[
a_j'=a_j+\varepsilon_j\lambda_R,
\qquad
\varepsilon_j\in\{0,1\}.
\]

The two residue paths remain identical modulo \(3^R\), while their exact valuation words may encode an arbitrary binary string. Every finite altered valuation word is realized by a positive integer through the parity-cylinder and Chinese-remainder argument above.

Therefore no fixed \(R\) gives a faithful finite-alphabet encoding of the valuation stream.

Only the entire unbounded tower

\[
x_j\bmod3,\quad
x_j\bmod9,\quad
x_j\bmod27,\quad\ldots
\]

could recover all the valuation information. But that tower has no uniform finite state space.

---

## 8. Periodicity at every fixed depth is still insufficient

One might try to prove that the carry stream modulo \(3^R\) is eventually periodic separately for each \(R\), and then pass to the inverse limit.

Without uniform bounds on the automata, periods, and starting points, this implication is false.

For example, define

\[
u_n=
\begin{cases}
1+k!,&n=(k!)^2,\\[2mm]
1,&\text{otherwise}.
\end{cases}
\]

For every modulus \(M\), once \(k\geq M\),

\[
k!\equiv0\pmod M,
\]

so

\[
u_n\equiv1\pmod M
\]

for all sufficiently large \(n\). Thus every finite reduction \(u_n\bmod M\) is eventually constant.

Nevertheless, \((u_n)\) is unbounded and not eventually periodic. Moreover,

\[
\sum_{n<N}u_n=N+O(\sqrt N),
\]

so it satisfies the same type of linear cumulative-growth restriction as (2).

Hence even simultaneous eventual periodicity of every finite quotient would not suffice. A successful inverse-limit argument needs a **uniform finite-state theorem**.

---

# 9. A repaired finite-depth theorem

There is one setting in which fixed-depth carries do become faithful.

# Theorem 4

Fix \(R\), and suppose that for all sufficiently large \(j\),

\[
1\leq a_j<\lambda_R.
\]

Let

\[
r_j=x_j\bmod3^R.
\]

If the finite-valued sequence \((r_j)\) is both \(2\)-automatic and \(3\)-automatic as a function of the time index \(j\), then the orbit eventually enters a cycle.

## Proof

Cobham gives eventual periodicity of \(r_j\).

For \(j\geq1\), \(r_j\) is a unit modulo \(3^R\), and

\[
2^{a_j}
\equiv
(3r_j+1)r_{j+1}^{-1}
\pmod{3^R}. \tag{13}
\]

Since \(2\) has order \(\lambda_R\), the pair \((r_j,r_{j+1})\) determines \(a_j\bmod\lambda_R\). The assumed bound \(1\leq a_j<\lambda_R\) then determines \(a_j\) exactly.

An eventually periodic residue-pair sequence therefore gives an eventually periodic valuation sequence. Theorem 1 gives a cycle. ∎

This identifies the exact missing uniformity: one would need both time-index automaticity of a sufficiently deep residue stream and an a priori bound on the valuations. Neither is known for a hypothetical counterexample, and arbitrary long finite segments can contain arbitrarily large prescribed valuations.

---

# 10. The cycle equation

Suppose the eventual valuation period is

\[
w=(a_0,\ldots ,a_{m-1})
\]

and put

\[
A=\sum_{i=0}^{m-1}a_i,
\qquad
C_w=\sum_{i=0}^{m-1}3^{m-1-i}2^{A_i}.
\]

At the cycle state \(x\), identity (1) becomes

\[
2^Ax=3^mx+C_w.
\]

Thus

\[
\boxed{
x=\frac{C_w}{2^A-3^m}.
}
\tag{14}
\]

A positive cycle requires

\[
2^A>3^m, \tag{15}
\]

\[
2^A-3^m\mid C_w, \tag{16}
\]

and the resulting orbit must have exactly the valuations \(a_0,\ldots ,a_{m-1}\).

For the trivial accelerated cycle,

\[
w=(2),\qquad A=2,\qquad C_w=1,
\]

and (14) gives

\[
x=\frac1{4-3}=1.
\]

But automaticity provides no reason that another word \(w\) cannot satisfy (14)–(16). In fact, any hypothetical nontrivial cycle would have a periodic valuation and carry stream, and every periodic stream is automatic in every base. A finite automaton can simply track the index modulo the period.

Therefore a nontrivial Collatz cycle would already satisfy the proposed Cobham hypothesis. Cobham rigidity cannot contradict it.

This is not a technical defect in the formulation; it is a logical limitation of the method:

\[
\text{dual automaticity}
\Longrightarrow
\text{periodicity},
\]

but

\[
\text{periodicity}
\not\Longrightarrow
\text{the trivial cycle}.
\]

Excluding all nontrivial integral solutions of (14) with the exact valuation conditions is precisely the remaining positive-cycle problem.

---

# Final status

The Cobham approach yields the rigorous reduction

\[
\boxed{
\begin{array}{c}
\text{time–valuation graph simultaneously recognizable}\\
\text{in bases \(2\) and \(3\)}
\\[1mm]
\Downarrow
\\[1mm]
\text{valuation sequence eventually periodic}
\\[1mm]
\Downarrow
\\[1mm]
\text{positive orbit eventually cyclic}.
\end{array}}
\]

The proof uses two substantive ingredients:

\[
A_n\leq2n+O(1),
\]

which collapses Presburger piecewise linearity to periodicity, and the \(2\)-adic parity conjugacy, which converts a periodic valuation tail into equality of orbit states.

But the proposed full proof breaks at two precise points.

**First gap: uniform time-index recognizability.**  
Known binary and ternary transducers compute local arithmetic on orbit values. They do not provide finite \(2\)- and \(3\)-kernels for the sequence indexed by \(j\). Fixed \(3\)-adic depth is non-faithful, and Theorem 3 shows that its finite language is completely unrestricted.

**Second gap: cycle exclusion.**  
Even a perfect Cobham theorem for every counterexample stream would at most eliminate divergent trajectories. A nontrivial cycle already has a simultaneously automatic stream. It must be excluded by additional arithmetic beyond Cobham rigidity.

Consequently, the valid achievement of this program is

\[
\boxed{
\text{a sharp automaticity-to-cycle theorem, not a full Collatz proof}.
}
\]

A genuine completion would require a uniform theorem proving simultaneous base-\(2\)/base-\(3\) recognizability or regularity of a faithful encoding of every divergent positive orbit, together with an independent argument showing that the only positive integral solution of the cycle equations with exact valuations is \(x=1\).