model: GPT-5.6 Pro (gpt-5-6-pro)
round: 99
approach: 94 -- MILP or CP-SAT cycle search
front: disproof
sent: 2026-08-17T23:06:47Z
worked: Worked for 42m 33s
sha256: e5fa1538a289ba09be8add2522cff002c572c481c450ec647cd54863d491bdbc
chars: 10482

---# Outcome

The MILP/CP-SAT attack did **not** produce a full disproof of the Collatz conjecture. In particular, it found no positive nontrivial cycle and therefore no counterexample.

A cycle-search computation disproves Collatz only when it outputs an explicit positive integer \(n_0\), a finite cycle, and an exact arithmetic certificate verifying every transition. An infeasibility result over any finite search range merely excludes cycles in that range. Moreover, even a proof that no nontrivial cycle exists would not exclude a divergent nonperiodic orbit.

The current computational project reports convergence for every starting value below \(2075\cdot2^{60}\approx2^{71.02}\); no counterexample is reported. The published 2025 result established the earlier \(2^{71}\) threshold. citeturn525892view2turn573307view0

What the attack produced is an exact formulation, a hierarchy of valid solver cuts, and a reproducible exact bounded computation.

## 1. Exact reduction to divisibility

Use the fully accelerated map on positive odd integers,

\[
U(n)=\frac{3n+1}{2^{v_2(3n+1)}}.
\]

Let

\[
a=(a_0,\ldots,a_{K-1}),\qquad a_i\ge 1,
\]

be a proposed valuation word. Define

\[
A_0=0,\qquad A_i=\sum_{j<i}a_j,\qquad A=A_K,
\]

and

\[
C_0=0,\qquad C_{i+1}=3C_i+2^{A_i}.
\]

Thus

\[
C_K=C(a)=\sum_{i=0}^{K-1}3^{K-1-i}2^{A_i}.
\]

### Exact cycle criterion

The word \(a\) is realized by a positive odd Collatz cycle precisely when

\[
D:=2^A-3^K>0
\]

and

\[
D\mid C(a).
\]

In that case the starting value is forced:

\[
\boxed{n_0=\frac{C(a)}{2^A-3^K}}.
\]

This criterion is not merely necessary. It is sufficient.

To see that, suppose \(D\mid C(a)\) and put \(n_0=C(a)/D\). Splitting the carry after \(i\) positions gives

\[
C_K=3^{K-i}C_i+2^{A_i}R_i
\]

for an integer \(R_i\). Reduction of \(Dn_0=C_K\) modulo \(2^{A_i}\) gives

\[
3^i n_0+C_i\equiv0\pmod{2^{A_i}},
\]

so

\[
n_i:=\frac{3^i n_0+C_i}{2^{A_i}}
\]

is an integer. Reduction modulo \(2^{A_i+1}\) retains the first term of the suffix and gives

\[
3(3^i n_0+C_i)\equiv2^{A_i}\pmod{2^{A_i+1}},
\]

so \(n_i\) is odd. Finally,

\[
\begin{aligned}
2^{A_{i+1}}n_{i+1}
 &=3^{i+1}n_0+C_{i+1}\\
 &=3(3^i n_0+C_i)+2^{A_i}\\
 &=2^{A_i}(3n_i+1),
\end{aligned}
\]

and hence

\[
3n_i+1=2^{a_i}n_{i+1}.
\]

Because \(n_{i+1}\) is odd, this proves

\[
a_i=v_2(3n_i+1).
\]

At the endpoint, \(n_K=n_0\). Therefore the divisibility test already contains all intermediate integrality and exact-valuation conditions.

## 2. Exact fixed-\((K,A)\) MILP

Fix the number \(K\) of odd states and total valuation \(A\). Let

\[
s_i=A_i.
\]

Introduce one-hot variables

\[
p_{i,t}=1\quad\Longleftrightarrow\quad s_i=t,
\]

where

\[
i\le t\le A-(K-i).
\]

Impose

\[
\sum_t p_{i,t}=1,
\qquad
s_i=\sum_t t\,p_{i,t},
\qquad
s_{i+1}\ge s_i+1,
\qquad
s_0=0.
\]

If the cycle is rotated so that \(n_0\) is a global minimum, then necessarily

\[
a_0=1,\qquad a_{K-1}\ge2,
\]

which become

\[
s_1=1,\qquad s_{K-1}\le A-2.
\]

Introduce the positive integer \(n\). Since \(K\) and \(A\) are fixed, every exponential coefficient is constant, and the exact affine cycle equation becomes the single linear equality

\[
\boxed{
(2^A-3^K)n
=
\sum_{i=0}^{K-1}\sum_t
3^{K-1-i}2^t p_{i,t}.
}
\]

Thus an integer feasible point of this MILP is an exact cycle candidate, not an approximation.

### Exact minimum cuts

For each prefix,

\[
n_i=\frac{3^i n+C_i}{2^{s_i}}.
\]

Global minimality \(n_i\ge n\) gives

\[
C_i\ge(2^{s_i}-3^i)n.
\]

Suppose independent convergence verification gives \(n>N\). A purely word-dependent valid cut is then

\[
\boxed{
\sum_{r<i}\sum_t3^{i-1-r}2^t p_{r,t}
-(N+1)\sum_t2^t p_{i,t}
+3^i(N+1)\ge0.
}
\]

The exact form can also be linearized by introducing \(v_{i,t}=np_{i,t}\).

Other valid cuts include:

\[
\sum_i \mathbf 1_{\{a_i\ge2\}}\ge92,
\]

primitivity constraints excluding repeated shorter words, cyclic lexicographic symmetry breaking, and the logarithmic balance constraints below.

Hercher proved that a nontrivial cycle must have at least \(92\) local minima. The same work explains how sufficient convergence verification raises the lower bound for the number of odd members to approximately \(1.375\times10^{11}\). citeturn247783search1turn525892view1

## 3. Logarithmic balance

Multiplying

\[
2^{a_i}n_{i+1}=3n_i+1
\]

around a cycle yields

\[
2^A=\prod_{i=0}^{K-1}\left(3+\frac1{n_i}\right).
\]

A positive nontrivial cycle contains no \(1\), so every odd state is at least \(3\). Hence

\[
3^K<2^A<\left(\frac{10}{3}\right)^K.
\]

Therefore only

\[
\left\lfloor K\log_2 3\right\rfloor+1
\le A\le
\left\lceil K\log_2(10/3)\right\rceil-1
\]

must be searched.

If \(n_0>N\) is the global minimum, then

\[
0<
\frac AK-\log_2 3
<
\frac{1}{3(N+1)\log 2}.
\]

This is the extremely narrow continued-fraction window used in existing cycle-length estimates.

Published verification through \(2^{71}\), combined with the local-minimum analysis, gives the quoted lower bound

\[
K\ge137\,528\,045\,312
\]

for the odd members and shortcut period

\[
A\ge217\,976\,794\,617.
\]

The corresponding period for the unshortened \(3n+1,n/2\) map is

\[
A+K=355\,504\,839\,929,
\]

which is the value stated in Barina’s 2025 paper. citeturn573307view0

## 4. Segment-compressed CP-SAT model

A per-odd-state model cannot be instantiated at \(K\approx1.38\times10^{11}\). The appropriate compression uses local-minimum blocks.

Let block \(j\) contain

\[
k_j\ge1
\]

consecutive odd shortcut steps followed by

\[
\ell_j\ge1
\]

even shortcut steps. Its accelerated valuation word is

\[
1^{k_j-1},\ \ell_j+1.
\]

The totals are

\[
K=\sum_{j=0}^{m-1}k_j,
\qquad
A=\sum_{j=0}^{m-1}(k_j+\ell_j),
\qquad
m\ge92.
\]

A block satisfies

\[
2^{k_j+\ell_j}x_{j+1}
=
3^{k_j}x_j+(3^{k_j}-2^{k_j}).
\]

If

\[
2^{A_j}x_j=3^{K_j}x_0+Q_j,
\]

then the exact carry recurrence is

\[
\begin{aligned}
K_{j+1}&=K_j+k_j,\\
A_{j+1}&=A_j+k_j+\ell_j,\\
Q_{j+1}
&=3^{k_j}Q_j+
  2^{A_j}(3^{k_j}-2^{k_j}).
\end{aligned}
\]

Closure requires

\[
\boxed{
Q_m=(2^A-3^K)x_0.
}
\]

This formulation has as few as \(92\) block pairs rather than \(10^{11}\) individual exponents. The obstacle is that the final divisibility remains exact and global.

### Modular CP-SAT cuts

For fixed \((K,A)\), suppose \(q\) is a known factor of

\[
D=2^A-3^K.
\]

Then necessarily

\[
C(a)\equiv0\pmod q.
\]

At word level, this can be encoded through finite-state residues

\[
r_0=0,\qquad
r_{i+1}\equiv3r_i+2^{s_i}\pmod q,
\qquad
r_K=0.
\]

At block level,

\[
Q_{j+1}\equiv
3^{k_j}Q_j+
2^{A_j}(3^{k_j}-2^{k_j})
\pmod q.
\]

Powers modulo \(q\) depend only on exponent classes modulo multiplicative orders, so these are exact table or automaton constraints.

The condition \(q\mid D\) matters. For a modulus not dividing \(D\), the congruence

\[
Dn\equiv C(a)\pmod q
\]

usually only determines \(n\bmod q\) and gives no exclusion.

For the first frontier pair,

\[
(K,A)=
(137\,528\,045\,312,\ 217\,976\,794\,617),
\]

the supplied computation found

\[
\gcd(K,A)=1
\]

and no prime factor of \(2^A-3^K\) among the \(148\,931\) primes up to \(2\,000\,000\), excluding \(2\) and \(3\). This does not rule out larger factors, but it means the cheapest modular-cut layer is empty for that pair.

## 5. Scale of the exact equality

For this frontier pair,

\[
\frac AK-\log_2 3
\approx9.4270584790\times10^{-24},
\]

and

\[
A\log2-K\log3
\approx8.9865487086\times10^{-13}.
\]

It follows that

\[
D=2^A-3^K
\]

has exactly

\[
217\,976\,794\,577
\]

binary digits.

Representing \(D\) explicitly in 64-bit limbs requires

\[
3\,405\,887\,416
\]

limbs, occupying about \(25.38\) GiB before representing the carry, quotient, constraints, and solver metadata. A limb-linearized CP-SAT equality would therefore require billions of integer variables merely to encode the denominator.

This is the concrete scaling wall: segment compression controls the number of length variables, but it does not compress the exact arithmetic information in

\[
2^A-3^K\mid Q_m.
\]

## 6. Computations completed

The floating-point MILP prototype instantiated every admissible fixed-total model through \(K=12\). HiGHS reported all of them infeasible. Those solver statuses are not treated as formal certificates because the internal optimization arithmetic is floating point.

A separate C++ enumerator used exact integer arithmetic and independently reconstructed any putative candidate. For every \(K\le20\), it searched all admissible totals \(A\) and all globally-minimal words satisfying

\[
a_0=1,\qquad a_{K-1}\ge2,\qquad \sum_i a_i=A.
\]

For fixed \((K,A)\), the number of searched words was checked against

\[
\binom{A-3}{K-2}.
\]

The aggregate result was

\[
\boxed{
586\,739\,450\text{ words tested},
\quad
0\text{ with }(2^A-3^K)\mid C(a),
\quad
0\text{ positive nontrivial cycles}.
}
\]

This exact bounded search is useful as a validation of the model and implementation. It is not competitive with the much stronger known cycle-length theorems.

Automated methods have previously encoded Collatz-related termination questions as string-rewriting and SAT problems and have proved nontrivial weakenings, but not the full conjecture. citeturn525892view3

## Final assessment

The proposed approach successfully isolates the exact cycle-search problem:

\[
\begin{gathered}
m\ge92,\qquad
k_j,\ell_j\ge1,\\
K=\sum k_j,\qquad
A=\sum(k_j+\ell_j),\\
\frac AK-\log_2 3\text{ extremely small and positive},\\
Q_m=(2^A-3^K)x_0,
\end{gathered}
\]

with all reconstructed states positive and \(x_0\) globally minimal.

No assignment satisfying these conditions was found. Consequently, presenting this work as a completed Collatz disproof would be incorrect. The genuine output is an exact solver formulation, reproducible bounded exclusions, and a precise diagnosis that the global exponential divisibility condition—not approximate logarithmic balance—is the unresolved computational obstruction.

### Files

[Full mathematical and computational report](sandbox:/mnt/data/collatz_milp_cp_sat/REPORT.md)

[Complete source-and-results bundle](sandbox:/mnt/data/collatz_milp_cp_sat_bundle.zip)

[Exact C++ cycle enumerator](sandbox:/mnt/data/collatz_milp_cp_sat/collatz_cycle_exact.cpp)

[MILP prototype](sandbox:/mnt/data/collatz_milp_cp_sat/collatz_cycle_milp.py)

[Exact \(K\le20\) search results](sandbox:/mnt/data/collatz_milp_cp_sat/exact_search_K20.csv)

[Reproducibility checksums](sandbox:/mnt/data/collatz_milp_cp_sat/SHA256SUMS.txt)