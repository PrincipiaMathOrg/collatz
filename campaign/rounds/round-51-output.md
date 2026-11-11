model: GPT-5.6 Pro (Chat mode)
round: 51 -- approach 46, An adelic product-formula Lyapunov height
front: proof
sent: 2026-08-15T16:37Z
worked: 51m 29s

---

# Result

Carrying the adelic calculation through does **not** produce a proof of Collatz. It produces a rigorous obstruction:

> **A fixed one-step Lyapunov height assembled from standard local height functions at \(\infty,2,3\), with fixed weights, cannot prove the Collatz conjecture.**

This is stronger than the failure of one particular weighting. There are explicit positive-integer orbit segments that gain an arbitrarily large archimedean factor while becoming arbitrarily indistinguishable at both the \(2\)-adic and \(3\)-adic places. Any successful repair must therefore use an unbounded itinerary/carry state, an adaptive block time, or information from primes \(p\ge 5\).

Below is a complete proof of that obstruction.

---

## 1. The accelerated map and its exact local changes

Work with the Syracuse map on positive odd integers,

\[
T(n)=\frac{3n+1}{2^{a(n)}},
\qquad
a(n):=v_2(3n+1).
\]

The Collatz conjecture is equivalent to the assertion that every positive odd integer eventually reaches the fixed point \(1\).

The archimedean change is exactly

\[
\Delta_\infty(n)
=
\log T(n)-\log n
=
\log\left(3+\frac1n\right)-a(n)\log 2.
\tag{1}
\]

Two natural shifted local quantities are

\[
b(n):=v_2(n+1),
\qquad
r(n):=v_3(n+1).
\]

Since

\[
T(n)+1
=
\frac{3n+1+2^{a(n)}}{2^{a(n)}},
\]

their changes are

\[
b(Tn)
=
v_2\!\left(3n+1+2^{a(n)}\right)-a(n),
\tag{2}
\]

and

\[
r(Tn)
=
v_3\!\left(3n+1+2^{a(n)}\right).
\tag{3}
\]

In particular, whenever \(a(n)=1\),

\[
T(n)+1=\frac{3(n+1)}2.
\]

Consequently,

\[
b(Tn)=b(n)-1,
\qquad
r(Tn)=r(n)+1.
\tag{4}
\]

Writing

\[
n+1=2^{b(n)}3^{r(n)}u(n),
\qquad \gcd(u(n),6)=1,
\]

we also get

\[
u(Tn)=u(n)
\qquad\text{whenever }a(n)=1.
\tag{5}
\]

Thus a long \(a=1\) excursion simply transports one unit of valuation at each step from the \(2\)-adic side to the \(3\)-adic side while multiplying \(n+1\) by \(3/2\).

---

## 2. What the product formula actually says

Normalize the finite absolute values by \(|p|_p=p^{-1}\). For the formal branch multiplier

\[
q_a=\frac{3}{2^a},
\]

one has

\[
\log |q_a|_\infty=\log 3-a\log 2,
\]

\[
\log |q_a|_2=a\log 2,
\]

\[
\log |q_a|_3=-\log 3,
\]

and hence

\[
\log |q_a|_\infty+\log |q_a|_2+\log |q_a|_3=0.
\tag{6}
\]

So equal product-formula weights give **conservation**, not descent. With arbitrary fixed weights,

\[
\lambda_\infty\log |q_a|_\infty
+\lambda_2\log |q_a|_2
+\lambda_3\log |q_a|_3
\]

equals

\[
(\lambda_\infty-\lambda_3)\log 3
+
(\lambda_2-\lambda_\infty)a\log 2.
\tag{7}
\]

Any negativity in (7) comes from manually biasing the places; it is not forced by the product formula.

More seriously, \(q_a\) is only the linear part of the branch. The actual multiplicative change is

\[
\frac{T(n)}n=\frac{3n+1}{2^{a(n)}n}.
\]

After one accelerated step, every orbit point is coprime to \(3\). Hence, on the invariant set \(\gcd(n,6)=1\), both \(n\) and \(T(n)\) are units in \(\mathbb Z_2\) and \(\mathbb Z_3\). Therefore

\[
\log\left|\frac{T(n)}n\right|_2
=
\log\left|\frac{T(n)}n\right|_3
=
0.
\]

The full product formula becomes

\[
\boxed{
\log\frac{T(n)}n
=
-\sum_{p\ge5}
\log\left|\frac{T(n)}n\right|_p
}.
\tag{8}
\]

Thus the entire archimedean change of the actual integer state is balanced by primes \(p\ge5\), not by \(2\) and \(3\).

Likewise,

\[
\log(n+1)-b(n)\log2-r(n)\log3
=
\sum_{p\ge5}v_p(n+1)\log p.
\tag{9}
\]

The right side is an independent “outside-prime” state. Removing it does not leave a closed three-place system.

---

## 3. A first no-go theorem: ordinary heights cannot decrease

Suppose that \(V\) is a logarithmic height of the usual kind:

\[
V(n)=\gamma\log n+O(1),
\qquad \gamma>0.
\tag{10}
\]

This includes, on positive integers, conventional positive-degree Weil heights up to bounded error.

### Proposition 1

No function satisfying (10) can obey

\[
V(T(n))<V(n)
\qquad\text{for every odd }n>1.
\tag{11}
\]

### Proof

Let \(k\ge3\) be odd and set

\[
N_k=2^k-1.
\]

Define

\[
n_i=2^{k-i}3^i-1,
\qquad 0\le i\le k-1.
\]

For \(0\le i\le k-2\),

\[
3n_i+1
=
2\left(2^{k-i-1}3^{i+1}-1\right)
=
2n_{i+1},
\]

and \(n_{i+1}\) is odd. Hence \(a(n_i)=1\) and

\[
T(n_i)=n_{i+1}.
\]

At the final point,

\[
n_{k-1}=2\cdot3^{k-1}-1,
\]

and

\[
3n_{k-1}+1=2(3^k-1).
\]

Since \(k\) is odd, \(v_2(3^k-1)=1\). Therefore the last exponent is \(2\), and

\[
T^k(N_k)=M_k:=\frac{3^k-1}{2}.
\]

But

\[
\frac{M_k}{N_k}
=
\frac{3^k-1}{2(2^k-1)}
\sim
\frac12\left(\frac32\right)^k
\longrightarrow\infty.
\tag{12}
\]

If (11) held at every step, then \(V(M_k)<V(N_k)\). On the other hand,

\[
V(M_k)-V(N_k)
=
\gamma\log\frac{M_k}{N_k}+O(1)
\longrightarrow+\infty,
\]

a contradiction. ∎

This already rules out every one-step Lyapunov function that differs from a positive multiple of \(\log n\) by a bounded finite-place correction.

The next result also permits unbounded local corrections with finitely many \(p\)-adic poles.

---

# 4. Arbitrarily fine adelic shadow returns

The key construction has two freely selectable branch exponents:

- an entry exponent \(A\), controlling the \(2\)-adic limiting point;
- an exit exponent \(C\), controlling the \(3\)-adic limiting point.

For even \(A\ge2\) and \(C\ge2\), define

\[
\alpha_A:=-\frac{2^A+1}{3}\in\mathbb Z_2,
\qquad
\beta_C:=-\frac{1}{2^{C+1}}\in\mathbb Z_3.
\tag{13}
\]

### Lemma 2: adelic shadow block

Fix even \(A\ge2\), \(C\ge2\), and integers \(B,R\ge1\). There are arbitrarily large odd integers \(k\) for which

\[
P_{A,k}:=\frac{2^A(2^k-1)-1}{3}
\tag{14}
\]

and

\[
N_{C,k}:=\frac{3^{k+1}-1}{2^{C+1}}
\tag{15}
\]

are positive odd integers satisfying:

1. \(N_{C,k}\) lies in the accelerated Collatz orbit of \(P_{A,k}\);
2. the valuation word of this orbit segment is

\[
\left(
A,
\underbrace{1,\ldots,1}_{k-1\text{ times}},
2,
C
\right);
\tag{16}
\]

3. the endpoints are simultaneously close at both finite places:

\[
P_{A,k}\equiv N_{C,k}\pmod{2^B},
\qquad
P_{A,k}\equiv N_{C,k}\pmod{3^R}.
\tag{17}
\]

### Proof

We first impose the \(2\)-adic congruence

\[
3^{k+2}
\equiv
3-2^{C+1}(2^A+1)
\pmod{2^{B+C+1}}.
\tag{18}
\]

The right side is congruent to \(3\pmod8\). For every \(m\ge3\), the subgroup generated by \(3\) modulo \(2^m\) consists precisely of the odd residue classes congruent to \(1\) or \(3\pmod8\). Indeed,

\[
\operatorname{ord}_{2^m}(3)=2^{m-2}.
\]

Thus (18) has a solution for \(k+2\), and every such solution has \(k\) odd.

Next impose

\[
2^{k+A+C+1}
\equiv
2^{A+C+1}+2^{C+1}-3
\pmod{3^{R+1}}.
\tag{19}
\]

The right side is a unit modulo \(3\). Since \(2\) is a primitive root modulo every \(3^m\), equation (19) has a solution modulo \(2\cdot3^R\).

The parity forced by (19) is again that \(k\) is odd. The solution class from (18) has modulus a power of \(2\), while the solution class from (19) has modulus \(2\cdot3^R\). Their residues agree modulo \(2\), so the Chinese remainder theorem gives arbitrarily large simultaneous solutions \(k\).

Now verify the dynamics.

Because \(A\) is even and \(k\) is odd,

\[
2^A(2^k-1)\equiv1\pmod3,
\]

so \(P_{A,k}\) is an integer. Moreover,

\[
3P_{A,k}+1
=
2^A(2^k-1),
\]

and \(2^k-1\) is odd. Hence

\[
P_{A,k}
\stackrel{A}{\longmapsto}
2^k-1.
\tag{20}
\]

For

\[
q_i=2^{k-i}3^i-1,
\qquad 0\le i\le k-1,
\]

we have, for \(i\le k-2\),

\[
3q_i+1
=
2\left(2^{k-i-1}3^{i+1}-1\right)
=
2q_{i+1},
\]

so the next \(k-1\) exponents are all \(1\).

At \(q_{k-1}=2\cdot3^{k-1}-1\),

\[
3q_{k-1}+1=2(3^k-1).
\]

Since \(k\) is odd, this has exact \(2\)-adic valuation \(2\), giving

\[
q_{k-1}
\stackrel{2}{\longmapsto}
M_k:=\frac{3^k-1}{2}.
\tag{21}
\]

From (18),

\[
3^{k+1}-1
\equiv
-\frac{2^{C+1}(2^A+1)}3
\pmod{2^{B+C+1}}.
\tag{22}
\]

The odd factor \((2^A+1)/3\) shows that

\[
v_2(3^{k+1}-1)=C+1.
\]

Therefore

\[
M_k
\stackrel{C}{\longmapsto}
\frac{3^{k+1}-1}{2^{C+1}}
=
N_{C,k}.
\tag{23}
\]

Dividing (22) by \(2^{C+1}\) gives

\[
N_{C,k}
\equiv
-\frac{2^A+1}{3}
\pmod{2^B}.
\]

For sufficiently large \(k\), equation (14) gives the same congruence for \(P_{A,k}\). Thus the first congruence in (17) holds.

Finally,

\[
3\left(2^{C+1}P_{A,k}+1\right)
=
2^{k+A+C+1}
-
2^{A+C+1}
-
2^{C+1}
+
3.
\]

Equation (19) therefore gives

\[
2^{C+1}P_{A,k}+1\equiv0\pmod{3^R}.
\]

Also,

\[
2^{C+1}N_{C,k}+1=3^{k+1}\equiv0\pmod{3^R}
\]

for large \(k\). Since \(2^{C+1}\) is invertible modulo \(3^R\),

\[
P_{A,k}\equiv N_{C,k}\pmod{3^R}.
\]

This proves all three assertions. ∎

---

## 5. The archimedean gain of the shadow block

For fixed \(A,C\),

\[
P_{A,k}\sim\frac{2^{A+k}}3,
\qquad
N_{C,k}\sim\frac{3^{k+1}}{2^{C+1}}.
\]

Hence

\[
\frac{N_{C,k}}{P_{A,k}}
\sim
\frac{3^{k+2}}{2^{A+C+k+1}}
=
\frac{9}{2^{A+C+1}}
\left(\frac32\right)^k.
\tag{24}
\]

In particular,

\[
\frac{N_{C,k}}{P_{A,k}}\longrightarrow\infty.
\tag{25}
\]

Now choose \(B=R=j\) and an increasing sequence of the corresponding integers \(k_j\). The endpoint congruences imply

\[
P_{A,k_j},N_{C,k_j}\longrightarrow\alpha_A
\qquad\text{in }\mathbb Q_2,
\tag{26}
\]

because

\[
P_{A,k_j}
=
\frac{2^{A+k_j}-2^A-1}{3}
\longrightarrow
-\frac{2^A+1}{3}.
\]

Similarly,

\[
P_{A,k_j},N_{C,k_j}\longrightarrow\beta_C
\qquad\text{in }\mathbb Q_3,
\tag{27}
\]

because

\[
N_{C,k_j}
=
\frac{3^{k_j+1}-1}{2^{C+1}}
\longrightarrow
-\frac1{2^{C+1}}.
\]

Thus the same genuine positive-integer orbit block has the following behavior:

\[
\begin{array}{c|c}
\text{place} & \text{endpoint behavior}\\
\hline
\infty & N_{C,k}/P_{A,k}\to\infty\\[2mm]
2 & P_{A,k},N_{C,k}\to\alpha_A\\[2mm]
3 & P_{A,k},N_{C,k}\to\beta_C.
\end{array}
\tag{28}
\]

This is the central obstruction.

---

# 6. No-go theorem for standard adelic local heights

### Theorem 3

Let

\[
V(n)=h_\infty(n)+h_2(n)+h_3(n)
\tag{29}
\]

on positive odd integers. Suppose:

1. for some \(\gamma>0\),

\[
h_\infty(n)=\gamma\log n+O(1)
\qquad(n\to\infty);
\tag{30}
\]

2. \(h_2\) is locally bounded on \(\mathbb Q_2\) away from a finite set \(S_2\);
3. \(h_3\) is locally bounded on \(\mathbb Q_3\) away from a finite set \(S_3\).

Then \(V\) cannot satisfy

\[
V(T(n))<V(n)
\qquad\text{for every positive odd }n>1.
\tag{31}
\]

This remains true with arbitrary fixed real or positive weights absorbed into the \(h_v\).

### Proof

The points

\[
\alpha_A=-\frac{2^A+1}{3},
\qquad A\ge2\text{ even},
\]

are pairwise distinct. Since \(S_2\) is finite, choose an even \(A\) such that

\[
\alpha_A\notin S_2.
\]

Similarly, the points

\[
\beta_C=-2^{-(C+1)},
\qquad C\ge2,
\]

are pairwise distinct. Choose \(C\) such that

\[
\beta_C\notin S_3.
\]

Apply Lemma 2 with \(B=R=j\), obtaining orbit segments

\[
P_j\longmapsto\cdots\longmapsto N_j
\]

such that

\[
P_j,N_j\to\alpha_A\quad\text{in }\mathbb Q_2,
\]

and

\[
P_j,N_j\to\beta_C\quad\text{in }\mathbb Q_3.
\]

Because \(h_2\) and \(h_3\) are locally bounded at these points,

\[
h_2(N_j)-h_2(P_j)=O(1),
\qquad
h_3(N_j)-h_3(P_j)=O(1).
\tag{32}
\]

On the other hand, by (24),

\[
h_\infty(N_j)-h_\infty(P_j)
=
\gamma\log\frac{N_j}{P_j}+O(1)
\longrightarrow+\infty.
\tag{33}
\]

Therefore

\[
V(N_j)-V(P_j)\longrightarrow+\infty.
\tag{34}
\]

But strict descent at each intermediate accelerated step would imply

\[
V(N_j)<V(P_j),
\]

a contradiction. ∎

---

## 7. What this theorem rules out

The theorem covers all of the following.

### Conventional Weil-height constructions

A standard local Weil function has only finitely many singular points and is locally bounded away from them. Thus no fixed positive combination of standard local heights at \(2\), \(3\), and \(\infty\) can decrease at every accelerated step.

### Finite lists of valuation expressions

No height of the form

\[
\gamma\log n
+
\sum_{i=1}^{I}\lambda_i v_2(f_i(n))
+
\sum_{j=1}^{J}\mu_j v_3(g_j(n)),
\tag{35}
\]

where the \(f_i,g_j\) are fixed nonzero rational functions and the lists are finite, can work. Such functions have only finitely many \(2\)-adic and \(3\)-adic zeros and poles.

This includes arbitrary combinations involving quantities such as

\[
v_2(n+1),\quad
v_2(3n+1),\quad
v_2(3n+5),\quad
v_3(n+1),\quad
v_3(2n+1),
\]

and any finite extension of this list.

### Bounded finite-state corrections

No function

\[
V(n)=\gamma\log n+\Phi(s(n)),
\tag{36}
\]

with \(s(n)\) taking only finitely many values, can work. The correction \(\Phi(s(n))\) is bounded, so Proposition 1 already applies.

Likewise, recording residues modulo fixed powers \(2^B\) and \(3^R\) is insufficient: Lemma 2 makes the beginning and end of a growing orbit block identical at any prescribed finite resolution.

---

## 8. Why adding more fixed poles does not solve it

The obstruction points form the sets

\[
\mathcal A_2
=
\left\{
-\frac{2^A+1}{3}:A\ge2,\ A\text{ even}
\right\},
\tag{37}
\]

and

\[
\mathcal A_3
=
\left\{
-2^{-(C+1)}:C\ge2
\right\}.
\tag{38}
\]

The \(2\)-adic points in \(\mathcal A_2\) accumulate at

\[
-\frac13.
\]

More strongly, because \(2\) generates the unit groups modulo \(3^R\) for every \(R\), the set \(\mathcal A_3\) is dense in \(\mathbb Z_3^\times\).

Therefore, a separable local correction \(h_2+h_3\) capable of evading all the shadow blocks would have to satisfy at least one of the following pathological requirements:

- \(h_2\) fails to be locally bounded at every point of \(\mathcal A_2\); or
- \(h_3\) fails to be locally bounded at every point of the dense set \(\mathcal A_3\).

Neither behavior occurs for a usual adelic local height, a finite sum of valuation terms, or a \(p\)-adic analytic potential.

The shadow points also have a simple dynamical interpretation. For the branch

\[
f_a(x)=\frac{3x+1}{2^a},
\]

one has

\[
f_A(\alpha_A)=-1,
\qquad
f_1(-1)=-1,
\qquad
f_2(-1)=-\frac12,
\qquad
f_C\!\left(-\frac12\right)=\beta_C.
\tag{39}
\]

Thus the word

\[
A,1,\ldots,1,2,C
\]

shadows the \(2\)-adic fixed point \(-1\) for a long time and then transfers that shadowing depth into a \(3\)-adic neighborhood. The Chinese-remainder construction closes the local shadow while allowing the real value to increase by \(\asymp(3/2)^k\).

---

# 9. The only viable repair

A real-valued function that merely decreases is not enough; it must also be well-founded on the integer states. A useful block criterion is the following.

### Block-Lyapunov criterion

Suppose there are:

- an adaptive integer \(\tau(n)\ge1\);
- an unbounded state \(s(n)\);
- a function

\[
V(n)=\log n+\Phi(s(n))
\]

whose sublevel sets on positive odd integers are finite;

such that for every \(n>1\),

\[
V\!\left(T^{\tau(n)}(n)\right)<V(n).
\tag{40}
\]

Then every orbit reaches \(1\).

Indeed, repeated block iteration stays inside the finite set

\[
\{m:V(m)\le V(n_0)\},
\]

while taking strictly decreasing \(V\)-values, which cannot continue indefinitely.

The shadow-block theorem imposes severe requirements on such a repair:

1. **The state must be unbounded.**  
   It cannot factor through any fixed modulus, finite valuation list, or fixed suffix length.

2. **The block endpoint must be adaptive.**  
   It must continue beyond arbitrarily long words of the form
   \[
   A,1^{k-1},2,C
   \]
   until the locally hidden archimedean gain has genuinely been repaid.

3. **The state must include outside-prime information or an equivalent carry invariant.**  
   Equation (8) shows that primes \(p\ge5\) carry exactly the multiplicative compensation omitted by the \(2\)- and \(3\)-adic terms.

4. **The required missing result is a debt-non-recycling theorem.**  
   A long positive-drift block must create an arithmetic debt at least as large as
   \[
   \log\frac{N}{P},
   \]
   and that debt must not be transferable indefinitely between deeper \(2\)-adic and \(3\)-adic shadows.

Relative to the terminal-suffix locality framework developed in the earlier approaches, this pinpoints the necessary scaling: the \(3\)-adic suffix depth cannot be fixed. It must grow with the excursion length and with the exit exponent \(C\). The explicit blocks above defeat every fixed depth.

---

## 10. Relation to the probabilistic picture

For a Haar-random odd \(2\)-adic starting point, the successive Syracuse exponents are independent \(\mathrm{Geom}(2)\) variables. Their mean is \(2\), producing average logarithmic drift

\[
\log3-2\log2=\log\frac34<0.
\]

This explains why an averaged Lyapunov principle is convincing. It does not give pointwise control of the exceptional positive integers embedded in \(\mathbb Z_2\). citeturn291036view1

Tao’s theorem proves that almost all Collatz orbits, in logarithmic density, attain values below every function tending to infinity, while explicitly stopping short of a uniform pointwise conclusion. citeturn985209view2 Recent \(2\)-adic/\(3\)-adic exponent-code work similarly describes its score as a finite-prefix diagnostic rather than a proof criterion. citeturn291036view3

---

# Verdict

The literal approach

\[
\boxed{
\text{fixed }H_\infty,H_2,H_3
+\text{ fixed positive weights}
+\text{ one-step descent}
}
\]

is ruled out.

The obstruction is not merely that the first weighting tried fails. Explicit positive-integer orbit blocks have:

\[
\text{arbitrarily large real gain},
\]

while their endpoints are

\[
\text{arbitrarily close at both }2\text{ and }3.
\]

Consequently, no conventional finite-pole adelic height, no finite list of valuation energies, and no fixed finite-state correction can establish Collatz by strict one-step descent.

A surviving adelic strategy must become an **infinite-state, blockwise transversality argument involving the \(p\ge5\) leakage or an equivalent exact carry debt**. Establishing that debt cannot be recycled along one nested integer orbit is the unresolved theorem. Thus no full proof of the Collatz conjecture results from approach 46 as stated; what is complete is the no-go theorem sharply delimiting every viable repair.