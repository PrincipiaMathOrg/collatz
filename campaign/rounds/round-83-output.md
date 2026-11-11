model: GPT-5.6 Pro (Chat mode)
round: 83 -- approach 78, Push difference inequalities to a coverage theorem
front: proof
sent: 2026-08-17T01:31Z
worked: 54m 39s

---

# Outcome

I did **not** obtain a valid unconditional proof of the Collatz conjecture from the Krasikov–Lagarias difference inequalities. What does emerge is a sharp reduction to an exact **marked coverage theorem**, together with a rigorous explanation of why improving the exponent \(0.84\) to \(1-o(1)\)—or even obtaining the endpoint exponent \(1\)—does not by itself prove Collatz.

The missing statement is not another density estimate. It is a fixed-barrier, off-spine inverse-tree theorem stated below. Proving it would complete the conjecture immediately.

---

## 1. The Krasikov–Lagarias framework

Use the shortcut Collatz map

\[
T(n)=
\begin{cases}
n/2,&n\equiv0\pmod 2,\\[2mm]
(3n+1)/2,&n\equiv1\pmod 2.
\end{cases}
\]

For \(a\in\mathbb N\), let \(\pi_a^*(x)\) count those \(n\le x\) whose orbit reaches \(a\) without exceeding \(x\) before reaching \(a\). Krasikov and Lagarias organize these counts by residue classes modulo \(3^k\). Writing

\[
\alpha=\log_2 3
\]

and, schematically,

\[
\phi_k^m(y)
 =
 \inf_{\substack{a\equiv m\!\!\!\pmod{3^k}\\
                 a\text{ not on a cycle}}}
 \pi_a^*(2^y a),
\]

their inverse-tree decomposition gives, for \(y\ge2\),

\[
\phi_k^m(y)
 \ge
 \phi_k^{4m}(y-2)
 +
 \phi_{k-1}^{(4m-2)/3}(y+\alpha-2),
 \qquad m\equiv2\pmod 9,
\tag{1}
\]

\[
\phi_k^m(y)
 \ge
 \phi_k^{4m}(y-2),
 \qquad m\equiv5\pmod 9,
\tag{2}
\]

and

\[
\phi_k^m(y)
 \ge
 \phi_k^{4m}(y-2)
 +
 \phi_{k-1}^{(2m-1)/3}(y+\alpha-1),
 \qquad m\equiv8\pmod 9.
\tag{3}
\]

Residues on the right are interpreted at the indicated powers of \(3\), with the coarser-level quantity obtained by minimizing over its three lifts. These are the Krasikov difference inequalities. citeturn392910view0

A feasible solution of the associated linear program with growth parameter \(\lambda\) gives

\[
\phi_k^m(y)\ge c_m\lambda^y
\]

up to a uniform positive factor, and hence an exponent

\[
\gamma=\log_2\lambda.
\]

At level \(k=11\), Krasikov and Lagarias obtained approximately

\[
\lambda=1.7922310,
\qquad
\gamma=\log_2\lambda\approx0.84175,
\]

yielding the familiar lower bound of order \(x^{0.84}\) for the number of integers below \(x\) known to converge. citeturn392910view2turn320718view2

Their proposed endpoint is \(\lambda_k\to2\), which would imply bounds \(x^{1-\varepsilon}\) for every fixed \(\varepsilon>0\). The papers do not claim that this endpoint would eliminate every exception; it is an almost-all result. citeturn188753view2turn320718view2

---

## 2. Why an exponent \(1-o(1)\) cannot prove Collatz

Let

\[
B=\{n\in\mathbb N:T^j(n)=1\text{ for some }j\}
\]

be the convergent set. A statement of the form

\[
|B\cap[1,x]|\ge x^{1-o(1)}
\tag{4}
\]

is compatible with infinitely many exceptions.

For example, the artificial set

\[
B_0=\mathbb N\setminus\{1,2,4,8,16,\ldots\}
\]

satisfies

\[
|B_0\cap[1,x]|=x-O(\log x)=x^{1-o(1)},
\]

while its complement is infinite.

Thus no conclusion depending only on the exponent in a lower bound for \(|B\cap[1,x]|\) can imply \(B=\mathbb N\). One needs an integer-valued mechanism which forces

\[
|\mathbb N\setminus B|=0,
\]

not merely a mechanism which makes the exceptional set sparse.

This is the same logical distinction visible in stronger almost-all results: controlling almost every orbit, even very strongly, need not rule out a single exceptional component. Tao explicitly notes this distinction when discussing why descent to a fixed bounded set is much closer to the full conjecture than descent to a threshold tending slowly to infinity. citeturn596337view3

---

## 3. The exact recursion for the exceptional set

Let

\[
E=\mathbb N\setminus B.
\]

Since an integer reaches \(1\) exactly when its next iterate reaches \(1\),

\[
n\in E\quad\Longleftrightarrow\quad T(n)\in E.
\tag{5}
\]

In particular, \(E\) is both forward invariant and backward invariant.

For an integer \(X\ge1\), define

\[
E(X)=|\{n\le X:n\in E\}|.
\]

Also define the residue-class counts

\[
E_r^{(k)}(X)
 =
 |\{n\le X:n\in E,\ n\equiv r\pmod{3^k}\}|.
\]

### Proposition 1. Exact total recursion

For every \(X\ge1\),

\[
\boxed{
E(X)
=
E\!\left(\left\lfloor\frac X2\right\rfloor\right)
+
E_2^{(1)}
\!\left(
\left\lfloor\frac{3X+1}{2}\right\rfloor
\right).
}
\tag{6}
\]

### Proof

Partition the exceptional integers \(n\le X\) according to parity.

If \(n=2m\), then \(T(n)=m\), and by (5),

\[
n\in E\iff m\in E.
\]

The condition \(n\le X\) becomes \(m\le\lfloor X/2\rfloor\). This gives the first term.

If \(n\) is odd, put

\[
m=T(n)=\frac{3n+1}{2}.
\]

Then

\[
n=\frac{2m-1}{3}.
\]

This is a positive odd integer precisely when \(m\equiv2\pmod3\). Moreover,

\[
n\le X
\iff
2m-1\le3X
\iff
m\le\left\lfloor\frac{3X+1}{2}\right\rfloor.
\]

Again \(n\in E\iff m\in E\), proving (6). ∎

There is also an exact residue-level recursion.

### Proposition 2. Exact \(3\)-adic recursion

Let \(2^{-1}\) denote the inverse of \(2\) modulo the relevant power of \(3\). For \(r\pmod{3^k}\), let \(s_k(r)\pmod{3^{k+1}}\) be the unique residue satisfying

\[
2s_k(r)\equiv3r+1\pmod{3^{k+1}}.
\tag{7}
\]

Then

\[
\boxed{
E_r^{(k)}(X)
=
E_{2^{-1}r}^{(k)}
\!\left(\left\lfloor\frac X2\right\rfloor\right)
+
E_{s_k(r)}^{(k+1)}
\!\left(
\left\lfloor\frac{3X+1}{2}\right\rfloor
\right).
}
\tag{8}
\]

### Proof

For even \(n=2m\),

\[
n\equiv r\pmod{3^k}
\iff
m\equiv2^{-1}r\pmod{3^k}.
\]

For odd \(n\), writing \(m=(3n+1)/2\), the condition \(n\equiv r\pmod{3^k}\) is equivalent to

\[
2m=3n+1\equiv3r+1\pmod{3^{k+1}},
\]

which is exactly \(m\equiv s_k(r)\pmod{3^{k+1}}\). The size transformations are the same as in Proposition 1. ∎

Equation (8) is the natural complement-side analogue of the Krasikov recursions. It is exact, but its second argument is approximately \(3X/2\), larger than \(X\). Therefore it is not a strong-induction recurrence.

---

## 4. Criticality at exponent \(1\)

Suppose, only as a scalar model, that exceptional integers were evenly distributed among the three residue classes modulo \(3\), and that

\[
E(X)\asymp X^\beta.
\]

Then (6) would formally become

\[
X^\beta
\approx
\left(\frac X2\right)^\beta
+
\frac13\left(\frac{3X}{2}\right)^\beta.
\]

After dividing by \(X^\beta\), the branching factor is

\[
F(\beta)
 =
 2^{-\beta}
 +
 \frac13\left(\frac32\right)^\beta.
\tag{9}
\]

At the linear exponent,

\[
F(1)
 =
 \frac12+\frac13\cdot\frac32
 =
 1.
\tag{10}
\]

Thus the complement recursion is **exactly critical at exponent \(1\)**. There is no factor \(q<1\) which would yield an inequality such as

\[
E(X)\le q\max_{Y<X}E(Y)
\]

and hence extinction by strong induction.

This calculation also explains the special role of \(\lambda=2\) in the Krasikov–Lagarias program. It is the endpoint corresponding to linear inverse-tree growth, but linear growth is a critical mass balance, not a strict contraction.

Moreover, \(\lambda>2\) is impossible for a bound of the form

\[
\pi_a^*(2^ya)\ge c\lambda^y,
\]

because the left side counts at most \(2^ya\) integers. For fixed \(a\) and \(c>0\), a value \(\lambda>2\) would eventually exceed this elementary capacity bound.

So the exponent program has a genuine ceiling at precisely the value where extinction would still not follow.

---

## 5. Minimal exceptional orbit

Assume for contradiction that \(E\ne\varnothing\), and let

\[
N=\min E.
\tag{11}
\]

Set

\[
x_j=T^j(N).
\]

Then:

1. \(N\) is odd. Otherwise \(T(N)=N/2<N\) would lie in \(E\).
2. Every \(x_j\) belongs to \(E\).
3. Consequently,
   \[
   x_j\ge N
   \qquad(j\ge0).
   \tag{12}
   \]
4. The orbit is either eventually periodic, producing a nontrivial cycle, or it is injective. In the injective case it tends to infinity, since an injective sequence of positive integers eventually leaves every finite interval.

For \(a\in\mathbb N\), define its full inverse basin

\[
\mathcal A(a)
 =
 \{u\in\mathbb N:T^r(u)=a
   \text{ for some }r\ge0\},
\]

and

\[
\Pi_a(X)=|\mathcal A(a)\cap[1,X]|.
\]

### Proposition 3. Minimal-counterexample rigidity

For every \(j\ge0\),

\[
\boxed{\Pi_{x_j}(N)=1.}
\tag{13}
\]

### Proof

The integer \(N\) itself belongs to \(\mathcal A(x_j)\), since \(T^j(N)=x_j\).

Suppose \(u<N\) also belonged to \(\mathcal A(x_j)\). Then the orbit of \(u\) would eventually enter the orbit of \(N\). Since the latter never reaches \(1\), neither would \(u\). Hence \(u\in E\), contradicting the minimality of \(N\). ∎

Thus every inverse tree rooted anywhere on the exceptional orbit has exactly one vertex at or below the barrier \(N\): the distinguished starting point \(N\).

That is far stronger information than a density estimate.

---

## 6. Off-spine inverse branches

Every \(a\) has the even predecessor \(2a\). It also has an odd predecessor precisely when \(a\equiv2\pmod3\), in which case that predecessor is

\[
\frac{2a-1}{3}.
\]

At a transition

\[
x_j\longmapsto x_{j+1},
\]

one of the direct predecessors of \(x_{j+1}\) is the distinguished predecessor \(x_j\). When a second predecessor exists, call it \(s_j\).

In particular, whenever \(x_j\) is odd,

\[
x_{j+1}=\frac{3x_j+1}{2}\equiv2\pmod3
\]

and the second, even predecessor is

\[
s_j=2x_{j+1}=3x_j+1.
\tag{14}
\]

For a nonperiodic orbit, the inverse basins of the two distinct direct predecessors of \(x_{j+1}\) are disjoint. Indeed, if an integer reached both predecessors, its deterministic forward orbit would pass through \(x_{j+1}\) and later return to another predecessor of \(x_{j+1}\), forcing a cycle through \(x_{j+1}\).

Consequently, whenever \(s_j\) exists and the distinguished orbit is injective,

\[
\Pi_{x_{j+1}}(N)
 =
 \Pi_{x_j}(N)+\Pi_{s_j}(N),
\tag{15}
\]

because \(x_{j+1}>N\) contributes no additional root at the cutoff \(N\).

Using (13),

\[
1=1+\Pi_{s_j}(N),
\]

so

\[
\boxed{\Pi_{s_j}(N)=0.}
\tag{16}
\]

Every off-spine inverse tree must therefore avoid the whole interval \([1,N]\).

This is the structure that a coverage theorem has to contradict.

---

## 7. The exact coverage theorem that would prove Collatz

The required statement can be isolated without any asymptotic notation.

### Marked Coverage Theorem

Let \(N>1\) satisfy

\[
T^j(N)\ge N
\qquad\text{for every }j\ge0.
\tag{17}
\]

Then there exist integers \(j,r\ge0\) and \(u<N\) such that

\[
T^r(u)=T^j(N).
\tag{18}
\]

Equivalently, some inverse tree rooted on the forward orbit of \(N\) crosses strictly below the barrier \(N\).

An off-spine version says that one may choose \(u\) in the inverse basin of a sibling \(s_j\).

### Theorem 4. The Marked Coverage Theorem implies Collatz

Assume the Marked Coverage Theorem. Then every positive integer reaches \(1\).

### Proof

Suppose not. Let \(N\) be the least exceptional integer. As established above,

\[
T^j(N)\ge N
\]

for all \(j\). The Marked Coverage Theorem therefore gives \(u<N\) whose orbit reaches \(T^j(N)\).

Since \(T^j(N)\) never reaches \(1\), neither does \(u\). Thus \(u\) is exceptional, contradicting the definition of \(N\). ∎

This argument treats both possible failure modes:

- If the orbit of \(N\) is injective and divergent, the lower ancestor joins that orbit.
- If the orbit is periodic, the lower ancestor enters the nontrivial cycle.

Hence the coverage theorem is sufficient for the full Collatz conjecture, not merely for cycle exclusion.

---

## 8. Parity-word formulation of the missing theorem

For a parity word

\[
w=(\varepsilon_0,\ldots,\varepsilon_{r-1}),
\qquad
\varepsilon_i\in\{0,1\},
\]

put

\[
s(w)=\sum_{i=0}^{r-1}\varepsilon_i.
\]

There is an integer \(C_w\ge0\), determined by \(w\), such that every orbit segment with parity word \(w\) satisfies

\[
2^rT^r(u)=3^{s(w)}u+C_w.
\tag{19}
\]

Therefore, if \(T^r(u)=a\),

\[
u=\frac{2^ra-C_w}{3^{s(w)}}.
\tag{20}
\]

For the marked orbit \(x_j=T^j(N)\), the desired lower ancestor exists exactly when some admissible off-spine parity word \(w\) satisfies

\[
3^{s(w)}\mid 2^r x_j-C_w
\tag{21}
\]

and

\[
0<2^r x_j-C_w<3^{s(w)}N.
\tag{22}
\]

Thus the coverage problem is the simultaneous assertion of:

1. admissibility of the parity word;
2. the exact divisibility condition (21);
3. the strict size inequality (22);
4. exclusion of the distinguished word representing \(N\) itself.

This is the most concrete arithmetic form of the missing step.

The Krasikov inequalities count large collections of admissible inverse words. They do not force one word to satisfy the fixed-barrier inequality (22) while simultaneously meeting the divisibility condition (21).

---

## 9. Why even linear inverse-tree growth does not suffice

Consider the sibling roots \(s_1,s_2,\ldots\) arising at odd steps of an injective exceptional orbit. Their inverse basins are pairwise disjoint.

Suppose one had the idealized endpoint estimate

\[
\Pi_s(X)\ge c\frac{X}{s}
\tag{23}
\]

for all sufficiently large \(X/s\), with a universal \(c>0\). Summing over sibling roots \(s_i\le X\) would give

\[
X
\ge
\sum_{s_i\le X}\Pi_{s_i}(X)
\ge
cX\sum_{s_i\le X}\frac1{s_i},
\]

and hence

\[
\sum_{s_i\le X}\frac1{s_i}\le\frac1c.
\tag{24}
\]

But (24) is fully compatible with an exponentially growing orbit. For example, if

\[
s_i\asymp q^i,\qquad q>1,
\]

then \(\sum_i1/s_i\) converges.

More generally, an exponent-\(\gamma\) estimate of the Krasikov type gives only

\[
X
\gtrsim
X^\gamma
\sum_{s_i\le X}s_i^{-\gamma},
\]

or

\[
\sum_{s_i\le X}s_i^{-\gamma}
\lesssim
X^{1-\gamma}.
\tag{25}
\]

Again there is no contradiction for geometrically growing \(s_i\).

Therefore the following chain is invalid:

\[
\text{inverse trees are large}
\quad\Longrightarrow\quad
\text{one inverse tree crosses below }N.
\]

Large disjoint sets can all remain above the fixed barrier.

---

## 10. The domain mismatch in the existing inequalities

The Krasikov–Lagarias quantity is evaluated at a cutoff of the form

\[
X=2^y a,\qquad y\ge0.
\]

Thus the cutoff is at least the root \(a\).

For the minimal exceptional orbit, however, the required root is \(a=x_j\) and the required cutoff is

\[
X=N<x_j
\]

for \(j>0\). In their logarithmic variable this would be

\[
y=\log_2\frac{N}{x_j}<0.
\]

Moreover, the truncated quantity \(\pi_a^*(N)\) is automatically zero when \(a>N\), because the endpoint \(a\) itself exceeds the permitted trajectory height.

Consequently, optimizing the same linear program all the way to \(\lambda=2\) does not reach the region needed for minimal-counterexample coverage. The issue is not merely that the present numerical exponent is too small. The relevant cutoff lies on the other side of the root.

There are three pieces of information absent from the existing state vector:

- the distinguished inverse path corresponding to \(N\);
- the absolute barrier \(N\), rather than a cutoff proportional to the current root;
- the exact affine numerator \(2^rx_j-C_w\), needed to combine size and divisibility.

---

## 11. The appropriate replacement: a Boolean or min-plus recursion

For a fixed barrier \(N\), define

\[
D_N(a)=
\begin{cases}
1,&\mathcal A(a)\cap[1,N-1]\ne\varnothing,\\
0,&\mathcal A(a)\cap[1,N-1]=\varnothing.
\end{cases}
\tag{26}
\]

Then \(D_N\) satisfies the exact Boolean recursion

\[
D_N(a)
 =
 [a<N]\ \lor\
 \bigvee_{p\in T^{-1}(a)}D_N(p),
\tag{27}
\]

where \([a<N]\) is the truth value of \(a<N\).

Equivalently, define

\[
\mu(a)=\min\mathcal A(a).
\]

Then

\[
\mu(a)
 =
 \min\left(
 a,\,
 \{\mu(p):p\in T^{-1}(a)\}
 \right).
\tag{28}
\]

Along a marked orbit,

\[
\mu(x_{j+1})
 =
 \min\bigl(
 x_{j+1},\,
 \mu(x_j),\,
 \mu(s_j)
 \bigr)
\tag{29}
\]

whenever a sibling \(s_j\) exists.

For a minimal exception, one has

\[
\mu(x_j)=N
\]

for every \(j\). The desired contradiction is

\[
\mu(s_j)<N
\]

for at least one \(j\).

Equations (27)–(29) are the correct extinction recursions. They use \(\lor\) or \(\min\), rather than addition. The Krasikov inequalities estimate how many inverse branches exist; the new recursion must prove that at least one branch enters a prescribed interval.

A finite certificate would therefore need to assign a well-founded rank to every possible **uncovered marked state**, with the property that:

- either an off-spine branch immediately yields an integer below \(N\); or
- the next marked state has strictly smaller rank.

An exceptional orbit would then produce an infinite strictly descending sequence of ranks, which is impossible.

No such rank or finite certificate has been established here. Residue information modulo \(3^k\) alone does not control the inequality (22); an effective state must also retain enough affine carry and size information.

---

## 12. Final status of approach 78

The approach produces the following rigorous conclusions.

1. The exceptional set satisfies the exact recursive system (6) and (8).

2. The scalarized system is critical at exponent \(1\), so there is no exponent-level contraction at the endpoint.

3. A bound \(x^{1-o(1)}\) cannot logically eliminate infinitely many exceptions.

4. Even uniform linear inverse-tree growth proportional to \(X/a\) does not rule out an exceptional orbit whose sibling roots grow geometrically.

5. The full conjecture follows from the precise Marked Coverage Theorem.

6. In parity-word language, the only remaining assertion is that some off-spine word satisfies simultaneously

\[
3^{s(w)}\mid2^rx_j-C_w
\]

and

\[
0<2^rx_j-C_w<3^{s(w)}N.
\]

7. The Krasikov–Lagarias functions do not encode this assertion because they are additive, unmarked, and restricted to cutoffs at or above the target root.

Accordingly, a claimed full proof obtained merely by sending the Krasikov–Lagarias exponent to \(1\) would contain a genuine logical gap. The correct frontier is a **marked, fixed-barrier, min-plus extinction inequality** proving that an off-spine inverse branch must cross below the least exceptional integer. That coverage statement remains unproved in this attack.