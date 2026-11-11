model: GPT-5 Pro
round: 14 -- approach 9, An o-minimal rational-point explosion theorem
front: proof
sent: 2026-08-13T18:40:51Z
worked: 49m 24s

---

# Verdict

The proposed o-minimal argument does **not** yield a proof of the Collatz conjecture. Formalizing it reveals a decisive obstruction rather than merely a missing technical estimate:

1. A single Collatz orbit supplies only polynomially many rational relations in the orbit length, while their ordinary heights are exponential in that length. This is far below the threshold needed for a Pila–Wilkie contradiction.
2. Producing many points by varying the initial integer places them on rational algebraic lines that exist for **every** finite valuation word, including completely aperiodic words.
3. Consequently, the proposed inference

\[
\text{“algebraic locus”}\quad\Longrightarrow\quad
\text{“repeated valuation block”}
\]

is false for the natural Collatz encoding.
4. Even if repetition were established, it would only give the usual cycle equation; one would still need an independent proof excluding every nontrivial positive cycle.

What follows is a rigorous derivation of these obstructions and a precise statement of the genuinely new theorem that would be required to repair the approach.

---

# 1. Exact affine relations along an accelerated orbit

Work with the accelerated odd Collatz map

\[
U(x)=\frac{3x+1}{2^{v_2(3x+1)}}
\]

on positive odd integers. Let

\[
x_0=n,\qquad
a_j=v_2(3x_j+1),\qquad
x_{j+1}=\frac{3x_j+1}{2^{a_j}}.
\]

Define

\[
A_0=0,\qquad A_j=\sum_{i=0}^{j-1}a_i
\]

and

\[
C_0=0,\qquad C_{j+1}=3C_j+2^{A_j}.
\]

Induction gives the exact iterate identity

\[
\boxed{\,2^{A_j}x_j=3^j n+C_j\,}
\tag{1}
\]

with

\[
\boxed{\,
C_j=\sum_{i=0}^{j-1}3^{j-1-i}2^{A_i}.
\,}
\tag{2}
\]

For \(j\geq1\), \(C_j\) is odd: \(C_1=1\), and thereafter \(3C_j\) is odd while \(2^{A_j}\) is even.

It is useful to write (1) as

\[
x_j=p_jn+q_j,
\qquad
p_j=\frac{3^j}{2^{A_j}},
\qquad
q_j=\frac{C_j}{2^{A_j}}.
\tag{3}
\]

Let

\[
\alpha=\log_2 3,\qquad
\Delta_j=A_j-\alpha j.
\]

Then

\[
p_j=2^{-\Delta_j}.
\tag{4}
\]

Thus a near-critical prefix, meaning \(\Delta_j=O(1)\), has a bounded multiplicative part. Its growth is then governed principally by the positive affine term \(q_j\).

---

# 2. The natural o-minimal surface

The canonical rational point associated with a prefix is

\[
P_j=(j,A_j,p_j,q_j,n,x_j).
\]

These points lie in the \(\mathbb R_{\exp}\)-definable set

\[
\mathcal X=
\left\{
(u,v,p,q,x,y):
p=\exp(u\log3-v\log2),\quad y=px+q
\right\}.
\tag{5}
\]

Pila–Wilkie counting removes the **algebraic part** of a definable set: the union of its connected positive-dimensional semialgebraic subsets. Outside that part, the number of rational points of height at most \(H\) is \(O_{\varepsilon}(H^\varepsilon)\). citeturn430754view0turn184672view0

The 2024 theorem of Binyamini, Novikov and Zak strengthens this in \(\mathbb R_{\exp}\): the rational-point count in the transcendental part is bounded by a power of \(\log H\), with the exponent and constants depending on the definable complexity. citeturn184672view1

Unfortunately, both the geometry and the height scale of (5) work against the Collatz application.

---

# 3. Height explosion without point explosion

For a reduced rational number \(r/s\), write

\[
H(r/s)=\max(|r|,s).
\]

Because \(3^j\) and \(2^{A_j}\) are coprime,

\[
H(p_j)=\max(3^j,2^{A_j})\geq 3^j.
\tag{6}
\]

Because \(C_j\) is odd,

\[
H(q_j)=\max(C_j,2^{A_j})\geq 2^{A_j}.
\tag{7}
\]

Suppose a length-\(L\) word is near-critical at its endpoint:

\[
A_L=\alpha L+O(1).
\]

Since \(A_j\leq A_L\) for \(j\leq L\), equation (2) gives

\[
C_j
 \leq
 \sum_{i<j}3^{j-1-i}2^{A_L}
 \leq
 j3^j2^{A_L}
 =
 \exp(O(L)).
\]

For a fixed seed \(n\), all coordinates of \(P_j\), \(j\leq L\), therefore have height at most

\[
H_L=\exp(O(L)).
\tag{8}
\]

But there are only \(L\) prefix points:

\[
\#\{P_1,\ldots,P_L\}=O(L)=O(\log H_L).
\tag{9}
\]

Even using every contiguous block \([i,j)\) gives only

\[
O(L^2)=O((\log H_L)^2)
\]

relations. Fixed-arity tuples of blocks give at most \(O(L^r)\), still a power of \(\log H_L\).

This is entirely compatible not only with ordinary Pila–Wilkie but also with the sharp polylogarithmic theorem for \(\mathbb R_{\exp}\).

A simple model shows why no general improvement can fix this. The transcendental graph

\[
y=2^x
\]

contains the rational points

\[
(k,2^k),\qquad 1\leq k\leq \log_2 H,
\]

of height at most \(H\). Thus \(\Theta(\log H)\) points are natural even on a genuinely transcendental exponential curve.

The Collatz orbit produces a **height explosion**, not a rational-point explosion.

---

# 4. The natural surface is entirely algebraic in the Pila–Wilkie sense

There is a second, more direct problem.

Fix a point

\[
z=(u,v,p,q,x,y)\in\mathcal X.
\]

Keeping \(u,v,p,q\) fixed and varying \(x\), one obtains the line

\[
\left\{
(u,v,p,q,t,pt+q):t\in\mathbb R
\right\}\subseteq\mathcal X.
\]

This is a connected positive-dimensional semialgebraic subset. Therefore every point of \(\mathcal X\) lies in its algebraic part:

\[
\boxed{\mathcal X^{\mathrm{alg}}=\mathcal X.}
\tag{10}
\]

So Pila–Wilkie counts no relevant points at all.

Dropping the affine coordinates does not immediately help. Consider

\[
\mathcal S=
\left\{
(u,v,p):p=\exp(u\log3-v\log2)
\right\}.
\tag{11}
\]

Through every point of \(\mathcal S\) passes the affine line

\[
t\longmapsto
\bigl(u+t\log2,\ v+t\log3,\ p\bigr),
\]

because

\[
(u+t\log2)\log3-(v+t\log3)\log2
=
u\log3-v\log2.
\]

Hence

\[
\mathcal S^{\mathrm{alg}}=\mathcal S.
\tag{12}
\]

One could try to eliminate the ruling by imposing that \(u\) and \(v\) are integers satisfying the Collatz recurrence. But an infinite discrete set such as \(\mathbb Z\) is not definable in an o-minimal structure. Unrolling \(L\) steps instead produces a different definable set \(\mathcal X_L\) whose dimension and definable complexity grow with \(L\); the point-counting constants then grow as well. The effective polylogarithmic theorem explicitly depends on this complexity. citeturn184672view1

---

# 5. Exact cylinder lemma

The most important obstruction comes from the precise arithmetic of finite valuation words.

Let

\[
w=(a_0,\ldots,a_{m-1}),\qquad a_i\geq1,
\]

and put

\[
A=\sum_{i=0}^{m-1}a_i,
\qquad
C=C_w=
\sum_{i=0}^{m-1}3^{m-1-i}2^{A_i}.
\]

## Lemma

There is a unique odd residue \(r_w\pmod {2^{A+1}}\) such that the positive odd integers realizing the exact valuation word \(w\) are precisely

\[
n\equiv r_w\pmod {2^{A+1}}.
\tag{13}
\]

For \(n=r_w+2^{A+1}k\), the endpoint is

\[
U^m(n)=s_w+2\cdot3^m k,
\tag{14}
\]

where

\[
s_w=\frac{3^m r_w+C}{2^A}
\]

is odd. Consequently every start–endpoint pair lies on the rational algebraic line

\[
\boxed{\,2^A y=3^m x+C.\,}
\tag{15}
\]

### Proof

The word is realized exactly when

\[
x_m=\frac{3^m n+C}{2^A}
\]

is odd. Equivalently,

\[
3^m n+C\equiv2^A\pmod {2^{A+1}}.
\tag{16}
\]

Since \(3^m\) is invertible modulo \(2^{A+1}\), there is exactly one residue class \(r_w\) satisfying (16).

It remains to verify that the final congruence forces all preceding valuations. Write

\[
C_{t+1}=3C_t+2^{A_t}.
\]

Suppose

\[
3^{t+1}n+C_{t+1}
\equiv2^{A_{t+1}}
\pmod {2^{A_{t+1}+1}}.
\]

Reducing modulo \(2^{A_t+1}\), noting \(A_{t+1}\geq A_t+1\), gives

\[
3(3^t n+C_t)+2^{A_t}\equiv0
\pmod {2^{A_t+1}}.
\]

Thus

\[
3(3^t n+C_t)\equiv2^{A_t}
\pmod {2^{A_t+1}}.
\]

Multiplication by the inverse of the odd number \(3\) does not change the residue \(2^{A_t}\) modulo \(2^{A_t+1}\), so

\[
3^t n+C_t\equiv2^{A_t}
\pmod {2^{A_t+1}}.
\]

Iterating backward proves every exact valuation condition.

Finally, substituting \(n=r_w+2^{A+1}k\) into the endpoint formula yields

\[
U^m(n)
=
\frac{3^m r_w+C}{2^A}
+
2\cdot3^m k,
\]

which is (14). ∎

---

# 6. Why the algebraic-locus conclusion is false

The cylinder lemma shows that the algebraic line (15) occurs for **every finite valuation word**.

No periodicity is required. The word could be chosen randomly, could have maximal combinatorial complexity, or could be the prefix of an aperiodic infinite sequence. It still generates infinitely many rational start–endpoint points on the line

\[
2^A y=3^m x+C.
\]

Therefore the proposed implication

\[
\text{many points lie on an algebraic locus}
\quad\Longrightarrow\quad
\text{the valuation word repeats}
\]

is false.

The algebraic locus records only the elementary fact that a fixed finite Collatz word defines an affine transformation and a \(2\)-adic residue cylinder. It does not record repetition.

Indeed, the relevant lines are defined over \(\mathbb Q\), not merely over \(\mathbb R\). Thus replacing the ordinary Pila–Wilkie algebraic part by a more arithmetic notion would not remove this obstruction.

---

# 7. An aperiodic, exactly near-critical counter-blueprint

There is an especially sharp way to see the problem.

Let

\[
A_j=\left\lfloor \alpha j+\frac12\right\rfloor,
\qquad
\alpha=\log_2 3,
\]

and define

\[
a_j=A_{j+1}-A_j.
\]

Since \(1<\alpha<2\),

\[
a_j\in\{1,2\}.
\]

Moreover,

\[
\left|A_j-\alpha j\right|\leq\frac12.
\tag{17}
\]

The sequence \((a_j)\) is not eventually periodic. Otherwise its average would eventually equal a rational number \(B/m\), whereas

\[
\lim_{j\to\infty}\frac{A_j}{j}=\alpha
\]

is irrational.

Every finite prefix of this aperiodic near-critical sequence is realized by infinitely many positive integers, by the cylinder lemma. The corresponding residue cylinders are nested and therefore define a unique \(2\)-adic integer

\[
n_\ast\in\mathbb Z_2
\]

realizing the entire infinite word.

Now write

\[
\Delta_j=A_j-\alpha j.
\]

From (4),

\[
2^{-1/2}\leq p_j\leq2^{1/2}.
\tag{18}
\]

Furthermore,

\[
\begin{aligned}
q_j
&=
\sum_{i=0}^{j-1}
3^{j-1-i}2^{A_i-A_j} \\
&=
\frac13
\sum_{i=0}^{j-1}2^{\Delta_i-\Delta_j}.
\end{aligned}
\tag{19}
\]

Since \(-1<\Delta_i-\Delta_j<1\),

\[
\boxed{\frac{j}{6}<q_j<\frac{2j}{3}.}
\tag{20}
\]

Consequently, if the \(2\)-adic seed \(n_\ast\) happened to be an ordinary positive integer, its orbit would satisfy

\[
\frac{n_\ast}{\sqrt2}+\frac{j}{6}
<
x_j
<
\sqrt2\,n_\ast+\frac{2j}{3}
\tag{21}
\]

and would diverge at linear speed.

This construction has all of the proposed finite-level features:

- exact near-criticality;
- exact finite Collatz realizability;
- nested \(2\)-adic coherence;
- rational algebraic lines for every prefix;
- no repeated block.

The only unresolved issue is whether the inverse-limit seed \(n_\ast\) is an ordinary positive integer rather than a genuinely non-Archimedean \(2\)-adic integer. That is exactly the arithmetic distinction a Collatz proof must detect.

Ordinary real o-minimal geometry does not see this distinction.

---

# 8. Divergence need not initially be near-critical

There is also a missing reduction at the beginning of the proposed argument.

From (3) and positivity of \(q_j\),

\[
x_j\geq n\frac{3^j}{2^{A_j}}
=n\,2^{-\Delta_j}.
\tag{22}
\]

If, for example,

\[
A_j\leq(\alpha-\eta)j
\]

along an infinite sequence of times, then

\[
x_j\geq n2^{\eta j}.
\]

Thus a hypothetical divergent trajectory might have a persistent low valuation average and grow exponentially. It need not provide arbitrarily long segments with bounded \(\Delta_j\).

This is visible even at the finite level. The word

\[
a_0=\cdots=a_{L-1}=1
\]

has

\[
A_L=L,\qquad
C_L=3^L-2^L,
\]

and is realized exactly by

\[
n\equiv-1\pmod {2^{L+1}}.
\]

Hence ordinary positive integers exhibit arbitrarily long exponentially expanding all-\(1\) segments. The nested infinite word corresponds to the \(2\)-adic seed \(-1\), not to a positive integer.

A full argument based only on near-critical words would first need a new theorem reducing every unbounded counterexample either to a near-critical tail or to some other configuration that can be excluded. That reduction is not automatic.

---

# 9. Approximate rational points do not repair the count

Perhaps one could count points **near** the exponential surface rather than exactly on it. The exact cylinder arithmetic again gives the critical obstruction.

Fix a word \(w\), and write

\[
p=\frac{3^m}{2^A},
\qquad
q=\frac{C}{2^A}.
\]

For every seed \(n\) in its cylinder, with endpoint \(y=U^m(n)\),

\[
\frac yn=p+\frac qn.
\tag{23}
\]

Take seeds in the cylinder with \(n\asymp T\). There are \(\asymp_w T\) such seeds. The corresponding rational numbers \(y/n\) are distinct and satisfy

\[
H(y/n)=O_w(T),
\qquad
\left|\frac yn-p\right|\asymp_w \frac1T.
\tag{24}
\]

Thus at height \(H\) there can be \(\asymp H\) rational points lying at distance \(\asymp H^{-1}\) from the relevant exponential value.

So a near-point theorem giving a sublinear count at the natural \(H^{-1}\) scale would simply be false. One would require an approximation of order

\[
H^{-1-\delta}
\]

or stronger. The positive Collatz offset \(C\) naturally produces only the critical \(H^{-1}\) scale.

There are Pila–Wilkie-type results for rational points exceptionally close to definable sets, but Habegger’s general result is formulated for **polynomially bounded** o-minimal structures. The unrestricted exponential structure needed here is not polynomially bounded. citeturn506945view0 More importantly, the elementary family (23) already demonstrates that the required estimate cannot hold at the approximation strength furnished by the Collatz identity.

---

# 10. Repeated blocks only produce the cycle equation

Suppose, despite the preceding obstructions, that one somehow proves eventual periodicity of the valuation sequence.

Let

\[
w=(a_0,\ldots,a_{m-1})
\]

be a repeating block, with total valuation

\[
B=\sum_{i=0}^{m-1}a_i
\]

and affine offset \(D=C_w\). Its block map is

\[
F_w(x)=\frac{3^m x+D}{2^B}.
\tag{25}
\]

The infinite periodic word \(www\cdots\) determines a unique point of \(\mathbb Z_2\), because its successive cylinders have moduli \(2^{kB+1}\) tending to infinity. Applying \(F_w\) shifts the word by one period, so uniqueness gives

\[
F_w(x)=x.
\]

Hence any ordinary positive integer with that periodic word satisfies

\[
\boxed{\,(2^B-3^m)x=D.\,}
\tag{26}
\]

Since \(D>0\) and \(x>0\),

\[
2^B>3^m.
\]

Thus eventual periodicity does indeed give a positive Collatz cycle.

But (26) is not a contradiction. To finish Collatz one must prove that its only positive integral solution satisfying the exact valuation conditions is the trivial cycle

\[
x=1,\qquad w=(2),
\]

or repetitions of that block.

Pila–Wilkie is unlikely to supply this final step: cycle points lie on the most algebraic part of the construction, exactly the part removed from transcendental point counting.

---

# 11. Would the newest algebraic-relation counting theory help?

A recent August 2026 paper by Binyamini, Hirata-Kohno, Kawashima and Salant develops a proposed extension of Pila–Wilkie from points to intersections with algebraic varieties. The full polynomial-in-degree-and-log-height statement is conjectural; a weaker version is proved for certain trajectories of polynomial differential equations. citeturn184672view3

Even granting the full conjecture would not create the needed contradiction here.

A length-\(L\) Collatz orbit has only

\[
\binom{L+1}{2}=O(L^2)
\]

contiguous blocks. Each block gives a line

\[
2^B y=3^m x+D
\]

of degree \(1\) and logarithmic height \(O(L)\), in a near-critical regime. Thus the orbit supplies only polynomially many algebraic relations as a function of their logarithmic height. That is exactly the amount the conjectural relation-counting theorem is designed to allow.

---

# 12. Precise no-go theorem

The preceding calculations can be summarized as follows.

## Theorem: obstruction to the canonical o-minimal Collatz program

For the accelerated Collatz map:

1. The rational point associated with the \(j\)-th prefix has height at least \(3^j\).
2. A fixed length-\(L\) orbit segment supplies only \(O(L)\) prefix points and \(O(L^2)\) contiguous-block relations.
3. For a near-critical length-\(L\) segment, all these objects have height \(\exp(O(L))\), so their number is only polylogarithmic in their height.
4. Varying the seed over all integers realizing a fixed word produces infinitely many points on the rational line
   \[
   2^A y=3^m x+C.
   \]
5. Such a line occurs for every finite word, whether periodic or aperiodic.
6. There exist aperiodic near-critical infinite valuation sequences whose every finite prefix is exactly realizable and whose cylinder system is projectively coherent in \(\mathbb Z_2\).
7. Near-point normalization naturally gives approximation only at order \(H^{-1}\), at which linearly many rational points may occur.

Therefore neither ordinary Pila–Wilkie counting, its sharp polylogarithmic \(\mathbb R_{\exp}\) form, nor the presently conjectured algebraic-relation extensions imply eventual periodicity or contradict a hypothetical Collatz counterexample under the natural encoding.

---

# 13. What would actually be needed

A repaired o-minimal strategy would require three genuinely new ingredients.

### A single-orbit exponential amplifier

From one nonperiodic orbit segment of length \(L\), one would have to construct, in a **fixed-dimensional and fixed-complexity** definable set, at least

\[
\exp(cL)
\]

distinct rational points of height at most

\[
\exp(CL).
\]

Then ordinary Pila–Wilkie, with \(\varepsilon<c/C\), could force algebraic concentration. Prefixes and contiguous blocks produce only \(L\) and \(L^2\) points, respectively.

### Same-seed algebraic-block rigidity

One would need a theorem saying that an algebraic block containing many points arising from the **same ordinary seed** forces two infinite valuation tails to coincide.

This must distinguish the same-seed condition from the universal cylinder lines supplied by arbitrary finite words. Standard o-minimal algebraic-part theory has no such arithmetic memory.

### Positive-cycle exclusion

Finally, one must prove that

\[
(2^B-3^m)x=D_w
\]

has no positive integral exact-word solutions except the \(1\)-cycle.

Without this third ingredient, algebraic rigidity merely converts a divergent counterexample into a cyclic one.

The most plausible corrected framework would therefore be mixed Archimedean–\(2\)-adic rather than purely o-minimal. Its central theorem would need to distinguish a projectively coherent \(2\)-adic seed from a seed lying on the diagonal copy of \(\mathbb N\). That diagonal inverse-limit problem is precisely what the balanced aperiodic construction exposes.

Accordingly, approach 9 does not currently complete a proof of Collatz. Its natural “rational-point explosion theorem” is false: one fixed orbit has too few points, while the available explosion obtained by varying seeds is universally algebraic and carries no periodicity information.