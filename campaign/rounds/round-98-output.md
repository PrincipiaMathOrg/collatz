model: GPT-5.6 Pro (gpt-5-6-pro)
round: 98
approach: 93 -- SAT/SMT search for exact barrier survivors
front: proof
sent: 2026-08-17T22:01:09Z
worked: Worked for 55m 55s
sha256: 9aa28963bd3c7166067d034d905ee08c2b920fc4dfec2e1df794eb626f40d5c0
chars: 14446

---# Result

After carrying the SAT/SMT program through exact encodings, bounded certificate generation, recursive-closure analysis, and independent verification, **I did not obtain a valid full proof of the Collatz conjecture**.

The attack did produce a sharp mathematical conclusion:

> **An unrestricted finite-horizon SAT/SMT search for barrier survivors can never become UNSAT.**  
> Every finite horizon has an explicit positive-integer satisfying assignment—even after imposing exact valuation constraints, strict barrier inequalities, no descent, and the target-\(1\) endpoint congruence.

Thus the solver must prove an **infinite-state liveness statement**, not merely refute longer finite words. The precise missing statement is now:

\[
\boxed{\text{No infinite exact barrier-cylinder path has eventually zero binary lift digits.}}
\]

Together with a uniform exclusion of positive cycles, this statement proves Collatz.

This fits the status of the broader automated program: the mixed binary–ternary rewriting system of Yolcu, Aaronson, and Heule is equivalent to Collatz and supports automated proofs of weakenings, but does not presently yield termination of the full system. citeturn377723academia2 Current exponent-code searches likewise provide finite symbolic diagnostics rather than verification. citeturn377723academia0

## 1. Exact SMT encoding

For the shortcut map

\[
T(x)=
\begin{cases}
x/2,&x\equiv0\pmod2,\\[1mm]
(3x+1)/2,&x\equiv1\pmod2,
\end{cases}
\]

write

\[
x_k=T^k(n),\qquad
s_k=\#\{0\le i<k:x_i\text{ is odd}\}.
\]

The exact transition from \(x_k\) to \(x_{k+1}\) can be encoded without an explicit parity predicate:

\[
\begin{aligned}
&\bigl(x_k=2x_{k+1}\ \wedge\ s_{k+1}=s_k\bigr)\\
&\qquad\lor
\bigl(2x_{k+1}=3x_k+1\ \wedge\ s_{k+1}=s_k+1\bigr).
\end{aligned}
\tag{1}
\]

In the first branch, \(x_k\) is automatically even. In the second, integrality forces \(x_k\) to be odd.

The coefficient barrier is

\[
3^{s_k}\ge 2^k.
\tag{2}
\]

Define the exact integer threshold

\[
\eta_k=\min\{s\ge0:3^s\ge2^k\}.
\]

Since \(s_k\) is an integer, (2) is exactly equivalent to the linear constraint

\[
s_k\ge\eta_k.
\tag{3}
\]

Consequently the entire bounded problem belongs to **quantifier-free linear integer arithmetic**. There is no floating-point logarithm, nonlinear exponentiation, or heuristic parity assumption in the generated SMT instance.

The affine identity behind the encoding is

\[
2^kT^k(n)=3^{s_k}n+C_k,
\]

where

\[
C_0=0,\qquad
C_{k+1}=3^{\varepsilon_k}C_k+\varepsilon_k2^k,
\qquad
\varepsilon_k=x_k\bmod2.
\]

The barrier automatically implies no descent:

\[
T^k(n)
=\frac{3^{s_k}}{2^k}n+\frac{C_k}{2^k}
\ge n.
\]

## 2. The decisive finite-horizon obstruction

### Theorem

For every \(R\ge1\), put

\[
N_R=2^{R+1}-1.
\]

Then, for every \(0\le t\le R\),

\[
U^t(N_R)=3^t2^{R+1-t}-1,
\tag{4}
\]

where \(U\) is the accelerated odd Collatz map. Its first \(R\) valuation exponents are all equal to \(1\). Moreover,

\[
2^t<3^t,
\qquad
U^t(N_R)>N_R
\quad(1\le t\le R),
\tag{5}
\]

and

\[
3^R\mid U^R(N_R)+1.
\tag{6}
\]

### Proof

Suppose

\[
U^t(N_R)=3^t2^{R+1-t}-1
\]

for some \(t<R\). Then

\[
\begin{aligned}
3U^t(N_R)+1
&=3^{t+1}2^{R+1-t}-2\\
&=2\left(3^{t+1}2^{R-t}-1\right).
\end{aligned}
\]

Since \(R-t\ge1\), the factor in parentheses is odd. Hence

\[
v_2(3U^t(N_R)+1)=1,
\]

and division by \(2\) gives (4) at \(t+1\).

Furthermore,

\[
U^t(N_R)-N_R
=2^{R+1-t}(3^t-2^t)>0
\]

for \(t\ge1\). At \(t=R\),

\[
U^R(N_R)+1=2\cdot3^R.
\]

This proves every assertion. ∎

### Consequence

For every finite horizon \(R\), the following conjunction is SAT over positive ordinary integers:

\[
\begin{gathered}
\text{exact Collatz transitions},\\
2^{A_t}<3^t\quad(1\le t\le R),\\
U^t(n)\ge n\quad(1\le t\le R),\\
3^R\mid U^R(n)+1.
\end{gathered}
\]

So neither a longer bounded unrolling nor the addition of target-\(1\) suffix constraints can eventually produce the desired global UNSAT result.

This also explains why your all-depth target-\(1\) theorem, although genuinely structural, does not itself prove Collatz: it classifies the target-\(1\) negative-shadow language, not arbitrary positive trajectories. Your retained audit explicitly records that distinction. fileciteturn20file17L482-L488

## 3. Proof-producing finite UNSAT certificate

A seed bound changes the logic. At depth \(B\), every parity cylinder contains exactly one representative in \([0,2^B)\). Beyond depth \(B\), a seed below \(2^B\) can remain in the cylinder only when every subsequent high binary lift digit is zero. Its continuation is therefore deterministic.

I generated a complete certificate for

\[
1<n<2^{20},\qquad K=183.
\]

The exact result is

\[
\boxed{\text{No }1<n<2^{20}\text{ remains in the coefficient barrier through depth }183.}
\]

The certificate contains all \(27{,}328\) seeds that survive through depth \(20\), together with their exact endpoint, odd count, first barrier failure, and failure endpoint. The longest survivor is

\[
n=1{,}027{,}431,
\]

which survives through depth \(182\) and fails at depth \(183\).

An independent checker does not reuse the cylinder traversal. It directly iterates all

\[
1{,}048{,}574
\]

integers \(2\le n<2^{20}\), reconstructs the complete leaf table, verifies its SHA-256 digest, and obtains the same result.

Local exact reruns produced:

| Bound | Last surviving depth | First forced failure | Record seed |
|---:|---:|---:|---:|
| \(2^{20}\) | \(182\) | \(183\) | \(1{,}027{,}431\) |
| \(2^{24}\) | \(286\) | \(287\) | \(13{,}421{,}671\) |
| \(2^{28}\) | \(394\) | \(395\) | \(217{,}740{,}015\) |

Your earlier project certificate extends this staircase to

\[
M_{547}\ge2^{36},
\]

with record seed \(12{,}235{,}060{,}455\). These results are stronger than ordinary numerical-descent checks because they exclude permanent coefficient-barrier behavior throughout the bounded ranges. They remain finite results. The independently published convergence verification record is currently \(2^{71}\). citeturn670456search1 Angeltveit’s 2026 recursive-suffix work supplies a more efficient framework for increasing such finite verification bounds. citeturn670456academia12

## 4. Exact target-\(1\) scan

I enumerated every accelerated valuation word of length \(18\) satisfying

\[
2^{A_j}<3^j
\qquad(1\le j\le18).
\]

There are exactly

\[
1{,}900{,}470
\]

such words.

Among them, exactly one satisfies

\[
3^{18}\mid C_{18}+2^{A_{18}}.
\]

It is

\[
(1,1,\ldots,1)=1^{18}.
\]

No non-all-ones target-\(1\) word occurs. This independently agrees with the existing all-depth target-\(1\) classification. It does not supply the missing theorem that a hypothetical divergent positive orbit must enter a nontrivial target-\(1\) cylinder.

## 5. Why recurrent finite abstractions give false survivors

For a valuation word \(w\) of length \(r\), total exponent \(A\), and carry \(C\), a periodic realization must satisfy

\[
2^A\xi=3^r\xi+C,
\]

so

\[
\xi=\frac{C}{2^A-3^r}.
\tag{7}
\]

If the period satisfies the strict barrier, then

\[
2^A<3^r,
\]

and therefore

\[
\xi<0.
\]

Thus a periodic strict-barrier SCC is not a positive Collatz orbit. It is a negative \(2\)-adic shadow.

For example, \(w=(1,2)\) has

\[
A=3,\qquad C=5,
\]

and hence

\[
\xi=\frac5{8-9}=-5.
\]

On absolute values this is the negative \(3x-1\) cycle

\[
5\longrightarrow7\longrightarrow5.
\]

Exact enumeration through valuation-word length \(14\) found three primitive integral negative-shadow cycles:

\[
1,
\]

\[
5\leftrightarrow7,
\]

and

\[
17\to25\to37\to55\to41\to61\to91\to17.
\]

Every finite prefix of these rays has positive ordinary realizations in a suitable residue class. Hence a solver that remembers only finite valuation suffixes, affine carries, barriers, and modular endpoints will regard these components as legitimate recurrent survivors.

The abstraction must also preserve the fact that one **fixed positive ordinary integer** realizes every depth.

## 6. The exact ordinary-integer condition

Let \(\rho_k\) be the unique start representative modulo \(2^k\). Its extension has the form

\[
\rho_{k+1}=\rho_k+b_k2^k,
\qquad b_k\in\{0,1\}.
\]

Thus

\[
\rho_k=\sum_{i<k}b_i2^i.
\]

The infinite branch corresponds to a nonnegative ordinary integer precisely when

\[
b_k=0
\quad\text{for all sufficiently large }k.
\tag{8}
\]

That is a **co-Büchi liveness condition**. It cannot be certified by merely showing that every bad finite prefix is absent, because there are no bad finite prefixes: every finite word is realized by positive integers.

The all-ones ray illustrates the distinction:

- every finite prefix comes from a positive Mersenne integer;
- the infinite ray itself has \(2\)-adic start \(-1\);
- its lift digits are eventually \(1\), not eventually \(0\).

## 7. A no-go theorem for finite-residue affine ranking

Another natural SMT strategy is to synthesize a bounded-block rank \(H\) that decreases within at most \(K\) steps. The Mersenne family excludes every linearly coercive version of this strategy.

### Theorem

Fix \(K\ge1\). There is no function \(H:\mathbb N_{>0}\to\mathbb R\) and constants \(c,C>0\), \(D\ge0\), such that

\[
cn-D\le H(n)\le Cn+D
\]

for every \(n\), while every \(n>1\) has some \(1\le j\le K\) satisfying

\[
H(T^j(n))<H(n).
\]

### Reason

For \(n_m=2^m-1\), the initial orbit is

\[
x_t=3^t2^{m-t}-1.
\]

Repeatedly applying the presumed bounded-block descent rule while \(t<m/2\) produces a later \(x_t\) with

\[
H(x_t)<H(n_m).
\]

But

\[
\frac{x_t}{n_m}\asymp\left(\frac32\right)^t,
\]

and for \(t\ge m/2\) this ratio becomes arbitrarily large. The two-sided linear bounds on \(H\) then force \(H(x_t)>H(n_m)\), a contradiction.

Every affine rank on finitely many residue classes with positive slopes is linearly coercive in this sense. Thus a successful rank must be unbounded but **noncoercive**—for example, it may use \(v_2(n+1)\) as a phase counter during all-ones runs—and must prove progress when that phase resets.

Property-directed reachability is designed to synthesize inductive invariants rather than merely enumerate reachable states, but its success still depends on an abstract domain capable of expressing the needed invariant. citeturn377723academia3

## 8. Exact completion theorem for this approach

Define the exact barrier-cylinder transition system using the state

\[
(k,s,\rho,x,p),
\qquad p=3^s,
\]

and the exact lift recursion. Then the following would complete the divergence half.

### Barrier-lift extinction theorem

Every infinite path satisfying

\[
p_k\ge2^k
\]

at every depth has infinitely many nonzero lift digits.

Equivalently,

\[
\boxed{
\text{there is no infinite barrier path whose lift digits are eventually zero.}
}
\tag{9}
\]

A divergent ordinary Collatz orbit can be shifted to a permanent barrier tail, while an ordinary positive start has eventually zero lift digits. Thus (9) excludes divergence.

A full Collatz proof additionally needs the cycle theorem

\[
(2^A-3^r)n=C_r
\]

to have no positive solution \(n>1\) satisfying all cyclic valuation constraints. Positive cycles satisfy

\[
2^A>3^r,
\]

the opposite sign from the strict divergent barrier, so they do not disappear automatically from (9).

Therefore:

> **Conditional completion theorem.**  
> If barrier-lift extinction holds and every positive nontrivial cycle equation is UNSAT, then every positive integer reaches \(1\).

The proof is immediate from the standard dichotomy: a nonconvergent orbit is either eventually periodic or unbounded.

## 9. What the missing solver certificate should look like

A credible all-depth solver result must emit one of these exact objects:

1. **A Büchi/ranking certificate:** an inductive invariant for the eventual-zero monitor and a well-founded rank that decreases over certified macrosteps.

2. **A disjunctively well-founded transition invariant:** finitely many well-founded relations whose union covers the transitive closure of every stable barrier transition.

3. **A recursive minimum-survivor bound:** a proof for every sufficiently large \(B\) that
   \[
   M_{F(B)}\ge2^B
   \]
   for an explicitly finite function \(F(B)\).

4. **A recursively closed symbolic grammar:** exact state subsumption retaining the unbounded binary lift, ternary endpoint carry, Archimedean surplus, and positivity.

A bare abstract SCC elimination is not enough. A fixed-modulus abstraction can silently merge an ordinary positive branch with \(-1\), \(-5\), or another negative \(2\)-adic cycle.

For future certification, LRAT permits independently checked SAT refutations, and certified LRAT checkers have been implemented in proof assistants. citeturn554097academia35 A 2026 Lean workflow can import large LRAT and cube-and-conquer certificates by reflection, provided the semantic encoding from Collatz arithmetic to CNF is itself verified. citeturn554097academia33

# Artifacts

The report contains the full derivations, the exact certificate schema, the no-go theorem for coercive ranks, reproduction commands, and the detailed trust boundary.

- [Full research report](sandbox:/mnt/data/collatz93/collatz93_report.md)
- [Complete ZIP bundle](sandbox:/mnt/data/collatz93_bundle.zip)
- [ZIP SHA-256](sandbox:/mnt/data/collatz93_bundle.zip.sha256)
- [Bounded \(B=20,\ K=183\) certificate](sandbox:/mnt/data/collatz93/bounded_B20_K183_certificate.json.gz)
- [Independent certificate checker](sandbox:/mnt/data/collatz93/collatz93_certificate_checker.py)
- [Exact UNSAT SMT-LIB instance](sandbox:/mnt/data/collatz93/bounded_B20_K183_unsat.smt2)
- [Unrestricted target-\(1\) SAT instance](sandbox:/mnt/data/collatz93/unbounded_K64_target1_sat.smt2)
- [Exact search and certificate generator](sandbox:/mnt/data/collatz93/collatz93_exact_search.py)
- [Negative-shadow cycle scan](sandbox:/mnt/data/collatz93/negative_shadow_cycles_L14.json)

## Bottom line

Approach 93 produces rigorous finite UNSAT certificates and exposes the correct infinite-state proof target, but it does **not** presently complete a proof of Collatz. Its most important conclusion is that ordinary bounded SAT search is structurally incapable of closing the problem: every finite horizon remains satisfiable. The remaining frontier is the construction of an unbounded symbolic rank or recursively closed grammar proving barrier-lift extinction while preserving ordinary-integer lifting, followed by uniform cycle exclusion.