model: GPT-5 Pro
round: 27 -- approach 22, Entropy decrement plus arithmetic rigidity
front: proof
sent: 2026-08-13T18:49:11Z
worked: 47m 43s

---

## Verdict

Carrying this program through produces a rigorous **single-orbit entropy-decrement theorem**, a sharp entropy deficit for any hypothetical divergent orbit, and a quantitative lower bound on how rapidly such an orbit would have to escape.

It does **not** produce a complete proof of Collatz. The proposed closing dichotomy fails in both directions:

\[
\text{decorrelation}\;\not\Rightarrow\;\text{negative drift},
\]

and

\[
\text{low or zero entropy}\;\not\Rightarrow\;\text{finite-state or eventually periodic}.
\]

The missing step is an orbitwise arithmetic-rigidity theorem about positive rational \(2\)-adic seeds. A separate exclusion of nontrivial cycles is also required. Tao’s July 2026 revision likewise states that the full conjecture remains beyond current methods. citeturn597428view0

What follows is the complete argument up to that precise obstruction.

---

# 1. Accelerated Collatz dynamics

Work with the odd-to-odd Syracuse map

\[
U(n)=\frac{3n+1}{2^{v_2(3n+1)}},
\qquad n\in 2\mathbb Z+1.
\]

Write

\[
n_{t+1}=U(n_t),\qquad
a_t=v_2(3n_t+1)\ge 1,
\]

and define

\[
A_{s,H}=\sum_{i=0}^{H-1}a_{s+i}.
\]

For a finite word

\[
w=(a_0,\ldots ,a_{H-1}),
\]

put

\[
A(w)=a_0+\cdots+a_{H-1}
\]

and

\[
C(w)=\sum_{i=0}^{H-1}3^{H-1-i}2^{a_0+\cdots+a_{i-1}},
\]

where the exponent in the \(i=0\) term is \(0\).

Induction on \(H\) gives the exact affine identity

\[
\boxed{
2^{A(w)}n_H=3^Hn_0+C(w).
}
\tag{1}
\]

This is the integer version of Tao’s Syracuse affine formula. citeturn611244view2

For a block ending at time \(t\),

\[
v=(a_{t-r},\ldots ,a_{t-1}),
\]

equation (1) gives

\[
2^{A(v)}n_t=3^rn_{t-r}+C(v).
\]

Reducing modulo \(3^r\),

\[
\boxed{
n_t\equiv 2^{-A(v)}C(v)\pmod{3^r}.
}
\tag{2}
\]

Thus the final \(r\) valuation symbols determine the endpoint modulo \(3^r\). In particular,

\[
3^r\mid n_t+1
\quad\Longleftrightarrow\quad
3^r\mid C(v)+2^{A(v)}.
\]

This is the terminal-suffix locality mechanism needed below.

---

# 2. What a divergent orbit would force

Suppose an orbit never reaches \(1\).

If it is bounded, it repeats a state and hence enters a cycle. Therefore, to study divergent counterexamples, we may assume the \(n_t\) are all distinct. In that case \(n_t\to\infty\), because only finitely many positive integers lie below any fixed bound.

From

\[
n_{t+1}
=
\frac{3n_t}{2^{a_t}}
\left(1+\frac1{3n_t}\right)
\]

we obtain

\[
\log n_{t+1}-\log n_t
=
\log3-a_t\log2+
\log\left(1+\frac1{3n_t}\right).
\]

Summing from \(t=0\) to \(N-1\),

\[
A_N\log2
=
N\log3+\log n_0-\log n_N
+
\sum_{t=0}^{N-1}
\log\left(1+\frac1{3n_t}\right),
\tag{3}
\]

where \(A_N=a_0+\cdots+a_{N-1}\).

Since the \(n_t\) are distinct positive integers,

\[
\sum_{t<N}\frac1{n_t}
\leq 1+\log N.
\]

Using \(\log(1+x)\leq x\) and discarding the negative term \(-\log n_N\), equation (3) gives

\[
\boxed{
A_N\leq \lambda N+O_{n_0}(\log N),
\qquad
\lambda=\log_2 3=1.5849625007\ldots .
}
\tag{4}
\]

Consequently,

\[
\limsup_{N\to\infty}\frac{A_N}{N}\leq\lambda.
\tag{5}
\]

So a divergent orbit must use substantially fewer powers of \(2\) than a typical random orbit, whose average valuation is \(2\). In Tao’s random \(2\)-adic model the valuations are independent copies of the geometric law

\[
\Pr(a=k)=2^{-k},
\]

which has mean \(2\), giving the familiar negative drift

\[
\log3-2\log2=\log(3/4)<0.
\]

That random law is rigorously valid for Haar-random \(2\)-adic seeds and approximately valid for suitably randomized large integers. citeturn597428view1turn597428view2

---

# 3. A stationary measure from one exceptional orbit

Choose a random time \(T_N\), uniformly from a long initial portion of the orbit, and inspect the shifted valuation sequence

\[
(\ldots,a_{T_N-1},a_{T_N},a_{T_N+1},\ldots).
\]

Passing to a subsequence gives a shift-invariant empirical limit \(\mu\) on valuation sequences. The first-moment estimate (4) gives

\[
\boxed{
\mathbb E_\mu a_0\leq\lambda.
}
\tag{6}
\]

This construction is legitimate despite the countable alphabet because the uniform first-moment bound gives tightness.

Let

\[
H_\mu(a_0)
\]

denote Shannon entropy in natural logarithms.

For a positive-integer-valued random variable with mean \(m\), entropy is maximized by the geometric distribution of mean \(m\). Its entropy is

\[
g(m)=m\log m-(m-1)\log(m-1).
\tag{7}
\]

Indeed, compare any law \(p\) of mean \(m\) with

\[
q_k=\frac1m\left(1-\frac1m\right)^{k-1}.
\]

The nonnegativity of \(D(p\Vert q)\) gives

\[
H(p)
\leq
-\sum_kp_k\log q_k
=
g(m).
\]

Since \(g\) is increasing and \(\mathbb E_\mu a_0\leq\lambda\),

\[
H_\mu(a_0)\leq g(\lambda).
\]

The entropy rate

\[
h(\mu)=
\lim_{H\to\infty}
\frac1H H_\mu(a_0,\ldots,a_{H-1})
\]

therefore satisfies

\[
\boxed{
h(\mu)\leq g(\lambda)
=1.0436328159\ldots .
}
\tag{8}
\]

But

\[
\log3=1.0986122887\ldots,
\]

so there is a strict entropy gap

\[
\boxed{
\delta
=
\log3-g(\lambda)
=
0.0549794728\ldots\text{ nats}
=
0.0793186128\ldots\text{ bits}.
}
\tag{9}
\]

For comparison, Tao’s geometric valuation law has entropy \(\log4\), which exceeds the \(\log3\) capacity of one ternary digit; that surplus underlies his fine-scale \(3\)-adic mixing heuristic and theorem. citeturn723765view0

---

# 4. Terminal locality gives a strict \(3\)-adic entropy deficit

Let

\[
R_t^{(r)}=n_t\bmod 3^r.
\]

By equation (2), \(R_t^{(r)}\) is a deterministic function of

\[
(a_{t-r},\ldots,a_{t-1}).
\]

Therefore, in the stationary empirical limit,

\[
\begin{aligned}
H_\mu(R_0^{(r)})
&\leq
H_\mu(a_{-r},\ldots,a_{-1})\\
&\leq
rH_\mu(a_0)\\
&\leq
r g(\lambda).
\end{aligned}
\tag{10}
\]

Thus

\[
\boxed{
\frac{H_\mu(R_0^{(r)})}{r\log3}
\leq
\frac{g(\lambda)}{\log3}
=
0.9499555272\ldots .
}
\tag{11}
\]

More sharply, using the entropy rate,

\[
\limsup_{r\to\infty}
\frac{H_\mu(R_0^{(r)})}{r\log3}
\leq
\frac{h(\mu)}{\log3}
\leq0.9499555272\ldots .
\tag{12}
\]

So any divergent Collatz orbit would generate a \(3\)-adic state distribution with at least a \(5.004\%\) entropy-dimension deficit.

If \(u_r\) denotes the uniform distribution on \(\mathbb Z/3^r\mathbb Z\), then

\[
D\!\left(\operatorname{law}(R_0^{(r)})\middle\Vert u_r\right)
=
r\log3-H_\mu(R_0^{(r)}),
\]

and hence

\[
\boxed{
D\!\left(\operatorname{law}(R_0^{(r)})\middle\Vert u_r\right)
\geq
\delta r.
}
\tag{13}
\]

This is a rigorous and fairly strong conclusion:

> A divergent orbit cannot be even entropy-dimensionally equidistributed in the \(3\)-adics. It must live on a ternary fractal of entropy dimension at most \(0.949956\).

---

# 5. The exact single-orbit entropy decrement

Let

\[
H_H=H_\mu(a_0,\ldots,a_{H-1}),
\qquad
\eta_H=\frac{H_H}{H}.
\]

Define adjacent past and future blocks

\[
P_H=(a_{-H},\ldots,a_{-1}),
\qquad
F_H=(a_0,\ldots,a_{H-1}).
\]

By stationarity,

\[
H(P_H)=H(F_H)=H_H,
\]

while their joint variable is a block of length \(2H\). Therefore

\[
\begin{aligned}
I_\mu(P_H;F_H)
&=H(P_H)+H(F_H)-H(P_H,F_H)\\
&=2H_H-H_{2H}\\
&=2H(\eta_H-\eta_{2H}).
\end{aligned}
\tag{14}
\]

Take dyadic scales

\[
H_j=2^jH_0.
\]

Then

\[
\sum_{j=0}^{J-1}
\frac{I_\mu(P_{H_j};F_{H_j})}{2H_j}
=
\eta_{H_0}-\eta_{H_J}
\leq g(\lambda).
\tag{15}
\]

Consequently, for some \(0\leq j<J\),

\[
\boxed{
I_\mu(P_{H_j};F_{H_j})
\leq
\frac{2g(\lambda)}{J}H_j.
}
\tag{16}
\]

Letting \(J\to\infty\), one obtains a sequence of scales \(H\to\infty\) such that

\[
\boxed{
I_\mu(P_H;F_H)=o(H).
}
\tag{17}
\]

This is exactly the entropy-decrement phenomenon: if normalized mutual information stayed bounded below at every scale, then the normalized block entropy would repeatedly decrease and eventually become negative.

Tao introduced this mechanism to choose a scale where an arithmetic random variable and a local block become weakly dependent; equations (14)–(17) are its particularly clean stationary single-orbit analogue. citeturn611244view1turn611244view0

Furthermore, \(R_0^{(r)}\) is a function of \(P_H\) whenever \(r\leq H\). By data processing,

\[
I_\mu(F_H;R_0^{(r)})
\leq I_\mu(F_H;P_H).
\tag{18}
\]

In particular, along selected scales,

\[
\boxed{
I_\mu(F_H;R_0^{(H)})=o(H).
}
\tag{19}
\]

So the hoped-for weak independence between a future valuation block and the current \(3\)-adic carry state really can be obtained for a single hypothetical orbit.

This completes the entropy-decrement half of the proposed program.

---

# 6. Why decorrelation does not imply negative drift

Here is an exact obstruction.

Take an independent valuation process with

\[
\Pr(a_t=1)=\Pr(a_t=2)=\frac12.
\]

Then disjoint blocks are exactly independent, so their mutual information is zero. But

\[
\mathbb E a_t=\frac32<\lambda,
\]

and the corresponding affine logarithmic drift is

\[
\log3-\frac32\log2
=
0.0588915178\ldots>0.
\]

Thus

\[
\boxed{
\text{perfect decorrelation can coexist with positive Collatz drift.}
}
\]

The problem is that independence says nothing about the one-symbol marginal. Tao’s negative-drift model requires not merely independence, but the specific geometric law of mean \(2\).

This example is not an artificial violation of the local Collatz rules. Convert the valuation sequence to a parity sequence

\[
1\,0^{a_0-1}\,
1\,0^{a_1-1}\,
1\,0^{a_2-1}\cdots .
\]

Every infinite binary parity sequence is realized by exactly one \(2\)-adic Collatz seed. citeturn597428view4

Hence a deterministic Bernoulli-generic realization of the above process gives a genuine \(2\)-adic Collatz orbit satisfying all finite valuation congruences, all affine identities, and all terminal-suffix identities. What generally fails is that the \(2\)-adic seed is an **ordinary positive integer**.

Therefore the missing ingredient cannot be another Shannon inequality. It must use the global condition

\[
x\in\mathbb Z_{>0}\subset\mathbb Z_2.
\]

---

# 7. Why entropy collapse does not imply periodicity

The other branch of the proposed dichotomy also fails.

Let

\[
\alpha=\frac{\sqrt5-1}{2}
\]

and define the Sturmian sequence

\[
b_t=\lfloor(t+1)\alpha\rfloor-\lfloor t\alpha\rfloor\in\{0,1\},
\]

followed by

\[
a_t=2-b_t\in\{1,2\}.
\]

The frequency of \(b_t=1\) is \(\alpha\), so

\[
\lim_{N\to\infty}\frac1N\sum_{t<N}a_t
=
2-\alpha
=
1.381966011\ldots
<
\lambda.
\]

This word is aperiodic: eventual periodicity would force its symbol frequency to be rational, whereas \(\alpha\) is irrational.

It has exactly \(H+1\) distinct factors of length \(H\), so its entropy rate is zero:

\[
h=0.
\]

It is also uniformly recurrent, which is a strong form of combinatorial almost periodicity.

Again, its associated parity sequence determines a valid \(2\)-adic Collatz seed.

Thus

\[
\boxed{
\text{zero entropy + subcritical mean + almost periodicity}
\not\Rightarrow
\text{eventual periodicity}.
}
\]

Entropy decrement only controls average Shannon information. It does not produce a finite deterministic state space. Even

\[
H(a_0,\ldots,a_{H-1})=O(\log H)
\]

is compatible with a genuinely aperiodic word.

To invoke a theorem such as Morse–Hedlund, one would need an exact bound of the form

\[
p(H)\leq H
\]

for the number of length-\(H\) factors at some finite \(H\). An \(o(H)\) Shannon-entropy estimate is vastly weaker.

---

# 8. What eventual periodicity would give

There is nevertheless a clean arithmetic endgame if eventual periodicity could be proved.

## Proposition

If the valuation sequence of a positive-integer Syracuse orbit is eventually periodic, then the orbit itself eventually enters a positive integer cycle.

### Proof

Suppose that after some time the valuation block

\[
w=(a_0,\ldots,a_{p-1})
\]

repeats forever. Let

\[
A=A(w),\qquad C=C(w),
\]

and sample the orbit once per period:

\[
x_k=n_{t_0+kp}.
\]

Equation (1) gives

\[
2^Ax_{k+1}=3^px_k+C.
\tag{20}
\]

Set

\[
D=2^A-3^p\neq0.
\]

The fixed point of this affine recurrence is \(C/D\), and subtraction gives

\[
Dx_{k+1}-C
=
\frac{3^p}{2^A}(Dx_k-C).
\]

After \(k\) iterations,

\[
2^{Ak}(Dx_k-C)
=
3^{pk}(Dx_0-C).
\tag{21}
\]

The left side is divisible by \(2^{Ak}\). Since \(3\) is odd, equation (21) implies

\[
2^{Ak}\mid Dx_0-C
\]

for every \(k\). Therefore

\[
Dx_0-C=0.
\]

Hence

\[
x_0=\frac{C}{D}.
\]

Because \(x_0,C>0\), necessarily \(D>0\), and \(x_k=x_0\) for every \(k\). The intermediate \(p-1\) values also repeat. ∎

Thus an eventually periodic valuation sequence cannot describe a divergent positive-integer orbit.

However, it may describe a nontrivial positive cycle. The cycle equation is

\[
\boxed{
n=\frac{C(w)}{2^{A(w)}-3^{|w|}},
}
\tag{22}
\]

together with the requirement that all valuations in \(w\) be exact.

The trivial odd cycle has

\[
w=(2),\qquad C(w)=1,\qquad
n=\frac1{4-3}=1.
\]

Nothing in entropy theory excludes other periodic words: every periodic word has entropy zero. Excluding all other admissible positive integral solutions of (22) is the nontrivial-cycle problem itself.

---

# 9. The exact rigidity theorem that would complete the divergent-orbit half

The needed statement can now be isolated precisely.

## Subcritical rationality rigidity

Let \(n_0\) be a positive odd integer with valuation sequence \(a_0,a_1,\ldots\). If

\[
\limsup_{N\to\infty}\frac1N\sum_{t<N}a_t
\leq\log_2 3,
\tag{23}
\]

then the valuation sequence is eventually periodic.

Call this statement **SRR**.

The drift calculation proves that every nonperiodic counterexample would satisfy (23). SRR would then make its valuation sequence eventually periodic, and the proposition above would turn it into a cycle, contradicting nonperiodicity.

SRR is a restricted form of a known \(2\)-adic rigidity problem. Every valuation sequence determines a parity code and therefore a unique \(2\)-adic seed. Lagarias’s Periodicity Conjecture asserts, in effect, that rational \(2\)-adic seeds have eventually periodic parity codes. Positive integers are rational \(2\)-adics, so that conjecture would imply SRR without even requiring the subcritical-average assumption. The general Periodicity Conjecture remains open. citeturn597428view5

What entropy decrement would need to prove is an inverse theorem of the following form:

\[
\begin{gathered}
x\in\mathbb Z_{>0},\\
\mathbb E_\mu a_0\leq\lambda,\\
I_\mu(P_H;F_H)=o(H)
\end{gathered}
\quad\Longrightarrow\quad
\text{the valuation word is eventually periodic}.
\tag{24}
\]

Without the condition \(x\in\mathbb Z_{>0}\), implication (24) is false by both the Bernoulli and Sturmian examples.

The arithmetic content must therefore show that a low-information symbolic process cannot simultaneously satisfy the infinite family of \(2\)-adic rationality conditions defining the positive integer seed and the \(3\)-adic endpoint conditions supplied by terminal locality.

That is the precise unsolved “arithmetic rigidity” theorem.

---

# 10. A conditional full proof

The proposed approach becomes a complete proof under two sharply stated arithmetic results.

### Rigidity hypothesis

Every positive-integer accelerated orbit satisfying

\[
\limsup A_N/N\leq\log_2 3
\]

has an eventually periodic valuation sequence.

### Cycle hypothesis

For every admissible finite valuation word \(w\),

\[
\frac{C(w)}{2^{A(w)}-3^{|w|}}\in\mathbb Z_{>0}
\]

only when \(w\) is a repetition of the trivial word \((2)\).

## Conditional theorem

The Rigidity and Cycle hypotheses imply the Collatz conjecture.

### Proof

Take a positive odd integer \(n_0\).

If its orbit repeats, it enters a positive cycle. The Cycle hypothesis says this is the cycle containing \(1\).

Suppose instead that the orbit does not repeat. Then its values are distinct, and equation (4) gives

\[
\limsup_{N\to\infty}\frac{A_N}{N}\leq\log_2 3.
\]

The Rigidity hypothesis makes the valuation word eventually periodic. By the proposition in Section 8, the orbit then enters a positive cycle, contradicting the assumption that it never repeats.

Thus every odd starting value reaches \(1\). Removing the initial powers of \(2\) proves the result for every positive integer. ∎

This is logically complete, but the two displayed hypotheses are not presently proved. The first is the pointwise adelic-rigidity step; the second is nontrivial-cycle exclusion.

---

# 11. A genuine unconditional consequence: superlinear escape

Although the full proof does not close, the entropy calculation and terminal-suffix theorem yield a quantitative result for every hypothetical nonperiodic orbit.

Define

\[
M_N=\max_{0\leq t\leq N} n_t
\]

and

\[
d_*=\frac{g(\lambda)}{\log3}
=
0.949955527188\ldots .
\]

## Theorem

Every nonperiodic positive-integer Syracuse orbit satisfies

\[
\boxed{
\liminf_{N\to\infty}
\frac{\log M_N}{\log N}
\geq
\frac1{d_*}
=
1.0526808586\ldots .
}
\tag{25}
\]

Equivalently,

\[
M_N\geq N^{\,1.0526808586-o(1)}.
\tag{26}
\]

### Proof

Fix

\[
\rho>\lambda
\]

so close to \(\lambda\) that

\[
g(\rho)<\log3.
\]

Let

\[
H=\lfloor\log_3 M_N\rfloor,
\qquad
q=\lfloor N/H\rfloor.
\]

Partition the first \(qH\) valuation symbols into \(q\) disjoint blocks \(w_0,\ldots,w_{q-1}\) of length \(H\), and write

\[
s_j=A(w_j).
\]

From equation (4),

\[
\sum_{j=0}^{q-1}s_j
=
A_{qH}
\leq
\lambda qH+O(\log N).
\tag{27}
\]

Each \(s_j\geq H\). If \(b\) blocks have \(s_j>\rho H\), then

\[
\sum_j s_j
\geq
(q-b)H+b\rho H
=
qH+b(\rho-1)H.
\]

Combining this with (27),

\[
b
\leq
\frac{\lambda-1}{\rho-1}q+o(q).
\]

Therefore a positive proportion

\[
\frac{\rho-\lambda}{\rho-1}+o(1)
\]

of the blocks satisfy

\[
s_j\leq\rho H.
\tag{28}
\]

The number of positive-integer words of length \(H\) with total sum at most \(\rho H\) is

\[
\sum_{s=H}^{\lfloor\rho H\rfloor}
\binom{s-1}{H-1}
=
\binom{\lfloor\rho H\rfloor}{H}.
\tag{29}
\]

Stirling’s estimate gives

\[
\log\binom{\lfloor\rho H\rfloor}{H}
=
g(\rho)H+O_\rho(\log H).
\tag{30}
\]

Now use terminal-suffix locality. A block \(w_j\) determines its endpoint

\[
n_{(j+1)H}\pmod{3^H}.
\]

Since the orbit is nonperiodic, these endpoints are distinct. Also,

\[
3^H\leq M_N<3^{H+1},
\]

so any one residue class modulo \(3^H\) contains at most three positive integers below \(M_N\).

Consequently, the number of good blocks satisfying (28) is at most

\[
3\binom{\lfloor\rho H\rfloor}{H}
=
\exp\big(g(\rho)H+O_\rho(\log H)\big).
\]

Since a positive proportion of all \(q\) blocks are good,

\[
q
\leq
\exp\big(g(\rho)H+O_\rho(\log H)\big).
\]

Thus

\[
N
\leq
(\log M_N)^{O_\rho(1)}
M_N^{g(\rho)/\log3}.
\tag{31}
\]

Letting \(\rho\downarrow\lambda\) and absorbing powers of \(\log M_N\) gives

\[
N
\leq
M_N^{d_*+o(1)}.
\]

Inverting proves (25). ∎

This is strictly stronger than the trivial fact \(M_N\gg N\) coming from distinctness. It says that a divergent orbit would have to become polynomially sparse among the integers, with exponent at least \(1.05268\).

It is still compatible with exponential escape, so it is not a contradiction.

---

# 12. Final assessment of approach 22

The program succeeds up to the following exact point:

\[
\begin{array}{c}
\text{hypothetical divergent positive orbit}\\[2mm]
\Downarrow\\[2mm]
\mathbb E a_0\leq\log_2 3\\[2mm]
\Downarrow\\[2mm]
h(\mu)\leq1.0436328<\log3\\[2mm]
\Downarrow\\[2mm]
\text{\(3\)-adic entropy dimension}\leq0.9499555\\[2mm]
\Downarrow\\[2mm]
\text{dyadic scales with }I(P_H;F_H)=o(H).
\end{array}
\]

The desired next arrow,

\[
\text{low mutual information}
+
\text{ordinary-integer realizability}
\Longrightarrow
\text{eventual periodicity},
\]

is the unsolved arithmetic-rigidity theorem. It is false in the full \(2\)-adic symbolic system and therefore must exploit the positive rational seed condition in an essentially global way.

This diagnosis is consistent with current orbit-mixing work: a 2026 preprint reducing Collatz to a low-dimensional bit-balance problem explicitly leaves the decisive **orbitwise** balance statement open and distinguishes it from map-level or ensemble-level mixing. citeturn723765view2

So approach 22 is not presently a full proof, but it does yield:

\[
\boxed{
\begin{aligned}
&\text{an exact single-orbit entropy decrement;}\\
&\text{a linear \(3\)-adic entropy deficit;}\\
&\text{a \(0.949956\) upper entropy dimension;}\\
&\text{a superlinear escape bound }M_N\geq N^{1.05268-o(1)};\\
&\text{and a precise reduction to subcritical rationality rigidity}\\
&\text{plus nontrivial-cycle exclusion.}
\end{aligned}
}
\]

Claiming a completed Collatz proof from the entropy dichotomy would conceal exactly those two unresolved arithmetic steps.