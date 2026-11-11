model: GPT-5.6 Pro (Chat mode)
round: 57 -- approach 52, Property-tau for Collatz residue graphs
front: proof
sent: 2026-08-15T23:34Z
worked: 38m 33s

---

# Outcome of the property-\(\tau\) program

After carrying this approach through, I cannot truthfully claim a full proof of Collatz. The obstruction is not merely that one difficult estimate remains: **the natural mixed Collatz residue graphs do not form a property-\(\tau\) family**, and the strongest genuine spectral gap that survives after quotienting out the \(2\)-adic memory averages over the wrong objects.

Below is a complete proof of those statements, together with an exact order-sensitive criterion that would repair the approach. As of August 2026, Collatz remains open; the current published computational frontier cited in recent work is convergence for every \(n<2^{71}\). citeturn596684view0turn521129view0

---

## 1. The natural mixed residue graph

Use the shortcut map

\[
T(n)=
\begin{cases}
n/2,&n\equiv0\pmod2,\\[1mm]
(3n+1)/2,&n\equiv1\pmod2.
\end{cases}
\]

For

\[
M=2^a3^b,\qquad a,b\geq1,
\]

define \(G_{a,b}\) on \(\mathbb Z/M\mathbb Z\) by putting an edge \(x\to y\) when there is an integer \(n\equiv x\pmod M\) with

\[
T(n)\equiv y\pmod M.
\]

There are two outgoing edges from each vertex, corresponding to the two lifts \(n\) and \(n+M\) modulo \(2M\).

For \(x\bmod 2^a\), let

\[
Q_a(x)=\bigl(\varepsilon_0(x),\ldots,\varepsilon_{a-1}(x)\bigr)
\]

be the first \(a\) parity bits of its orbit. The map

\[
Q_a:\mathbb Z/2^a\mathbb Z\longrightarrow\{0,1\}^a
\]

is a bijection. Indeed, for a prescribed word \(\varepsilon\), the usual affine identity

\[
2^aT^a(n)=3^{s_a}n+C_\varepsilon,
\qquad
s_a=\sum_{i<a}\varepsilon_i,
\]

determines one and only one \(n\bmod2^a\), since \(3^{s_a}\) is odd.

The Chinese remainder theorem therefore gives coordinates

\[
\Phi_{a,b}(x)
 =
(\varepsilon_0,\ldots,\varepsilon_{a-1};r),
\qquad r=x\bmod3^b.
\]

### Proposition 1. Exact skew-product form

In these coordinates the edges are

\[
(\varepsilon_0,\ldots,\varepsilon_{a-1};r)
\longrightarrow
(\varepsilon_1,\ldots,\varepsilon_{a-1},\delta;
 F_{\varepsilon_0}(r)),
\qquad \delta\in\{0,1\},
\]

where

\[
F_0(r)=2^{-1}r,
\qquad
F_1(r)=2^{-1}(3r+1)
\pmod {3^b}.
\]

#### Proof

Applying \(T\) deletes the first parity bit. The two lifts modulo \(2M\) have the same first \(a-1\) subsequent parity bits and opposite next parity bits, producing the free bit \(\delta\).

Modulo \(3^b\), division by \(2\) is invertible, and the residue update is exactly \(F_0\) or \(F_1\), according to \(\varepsilon_0\). ∎

Thus \(G_{a,b}\) is a de Bruijn shift in the \(2\)-adic coordinate, skewed by two affine maps in the \(3\)-adic coordinate. The pure \(2^a\) modular Collatz graphs are known to be precisely binary de Bruijn graphs. citeturn494958academia12

---

## 2. Uniform expansion already fails

There are two relevant meanings of “expansion”: directed out-neighborhood growth and the Cheeger/spectral expansion of an undirected regularization. Both fail naturally.

### Theorem 2. No directed vertex expansion

Let

\[
S_{a,b}
 =
\{(\varepsilon;r):r\equiv1\pmod3\}.
\]

Then

\[
N^+(S_{a,b})
 =
\{(\varepsilon;r):r\equiv2\pmod3\}
\]

and consequently

\[
|N^+(S_{a,b})|=|S_{a,b}|.
\]

#### Proof

If \(r\equiv1\pmod3\), then

\[
F_0(r)\equiv 2r\equiv2\pmod3,
\]

while

\[
F_1(r)\equiv\frac12\equiv2\pmod3.
\]

Thus every outgoing neighbor has residue \(2\pmod3\).

Conversely, given any target \((\varepsilon';r')\) with \(r'\equiv2\pmod3\), choose the predecessor branch \(\varepsilon_0=0\) and put

\[
r=2r'\pmod{3^b}.
\]

Then \(r\equiv1\pmod3\) and \(F_0(r)=r'\). The predecessor parity coordinates can be chosen to produce the prescribed shifted word \(\varepsilon'\). ∎

So there is no constant \(\eta>0\) such that

\[
|N^+(S)|\geq(1+\eta)|S|
\]

for all sets of size at most a fixed positive proportion of the graph.

### Theorem 3. The undirected Cheeger constants tend to zero as \(a\to\infty\)

Let \(\widetilde G_{a,b}\) be the natural undirected symmetrization. Then, uniformly in \(b\),

\[
h(\widetilde G_{a,b})\ll a^{-1/2}.
\]

#### Proof

Let

\[
w(\varepsilon)=\varepsilon_0+\cdots+\varepsilon_{a-1}
\]

and put

\[
m=\left\lfloor\frac{a-1}{2}\right\rfloor,
\qquad
S=\{(\varepsilon;r):w(\varepsilon)\leq m\}.
\]

Along an edge, the parity word is shifted and one bit is appended, so

\[
w(\varepsilon')-w(\varepsilon)=\delta-\varepsilon_0\in\{-1,0,1\}.
\]

Therefore a boundary vertex must lie in one of the two central layers

\[
w(\varepsilon)=m
\quad\text{or}\quad
w(\varepsilon)=m+1.
\]

Hence

\[
|\partial S|
 \leq
3^b\left(
\binom am+\binom a{m+1}
\right)
\ll
\frac{2^a3^b}{\sqrt a}.
\]

On the other hand,

\[
|S|
 =
3^b\sum_{j=0}^{m}\binom aj
\gg 2^a3^b.
\]

The symmetrized graphs have uniformly bounded degree, so the edge-boundary and vertex-boundary versions of the Cheeger constant differ only by an absolute factor. Thus

\[
h(\widetilde G_{a,b})\ll a^{-1/2}.
\]

∎

In fact, the de Bruijn component has explicit slowly varying modes. If \(X_j(\varepsilon)=(-1)^{\varepsilon_j}\), then the symmetrized shift acts on the span of \(X_0,\ldots,X_{a-1}\) like a path of length \(a\), whose spectral gap is of order \(a^{-2}\).

Thus any family that retains an unbounded amount of \(2\)-adic parity memory fails property-\(\tau\).

---

## 3. Passing to coprime moduli does not repair property-\(\tau\)

One might try to use moduli \(m\) coprime to \(6\), so that both branches

\[
T_0(x)=x/2,
\qquad
T_1(x)=(3x+1)/2
\]

are permutations modulo \(m\). But the generated group is affine and solvable.

Indeed,

\[
\Gamma=\langle T_0,T_1\rangle
   \subset \operatorname{Aff}(\mathbb Q)
   =\mathbb Q\rtimes\mathbb Q^\times.
\]

The translation subgroup is abelian and the multiplier quotient is abelian, so \(\Gamma\) is metabelian and hence amenable. Monks’ exact finite classification is

\[
G_m\cong C_m\rtimes M
\]

for \(m\) coprime to \(6\), with \(M\) generated by multiplication by \(2\) and \(3\). citeturn596684view1

### Proposition 4. No separating affine congruence family has property-\(\tau\)

Let \(\pi_i:\Gamma\to\Gamma_i\) be finite congruence quotients whose injectivity radii tend to infinity. Then the Cayley graphs

\[
\operatorname{Cay}(\Gamma_i,\pi_i(S))
\]

cannot have a uniform positive Cheeger constant for any fixed finite generating set \(S\).

#### Proof

Since \(\Gamma\) is amenable, for every \(\epsilon>0\) there is a finite nonempty Følner set \(F\subset\Gamma\) satisfying

\[
|SF\setminus F|<\epsilon |F|.
\]

For sufficiently large \(i\), the quotient map is injective on \(F\cup SF\), and \(|\pi_i(F)|\leq|\Gamma_i|/2\). Therefore

\[
\frac{
|\partial\pi_i(F)|
}{
|\pi_i(F)|
}
=
\frac{|SF\setminus F|}{|F|}
<\epsilon.
\]

Since \(\epsilon\) is arbitrary, no uniform expansion constant exists. ∎

This also rules out replacing one-step branches by any fixed finite collection of accelerated affine blocks: they remain inside the same solvable affine group. Letting the generator set grow with the modulus is no longer property-\(\tau\), and any resulting expansion constants do not automatically transfer to a fixed integer orbit.

---

## 4. A surprisingly strong \(3\)-adic spectral theorem

There is nevertheless a genuine positive result after forgetting the \(2\)-adic memory.

Let

\[
U_b=(\mathbb Z/3^b\mathbb Z)^\times,
\qquad
N_b=|U_b|=2\cdot3^{b-1},
\]

and define on functions \(f:U_b\to\mathbb C\)

\[
(\mathcal L_{b,t}f)(x)
 =
f(x/2)+t\,f((3x+1)/2),
\qquad t\geq0.
\]

The parameter \(t\) weights odd branches.

### Theorem 5. Exact weighted characteristic polynomial

For every \(b\geq1\),

\[
\boxed{
\det(zI-\mathcal L_{b,t})
 =
\bigl(z-(1+t)\bigr)
\frac{z^{N_b}-1}{z-1}.
}
\]

Consequently, for

\[
P_{b,t}=\frac{\mathcal L_{b,t}}{1+t},
\]

the constant eigenvalue is \(1\), while every other algebraic eigenvalue has modulus

\[
\frac1{1+t}.
\]

In particular, for equal branch weights \(t=1\), the entire nonconstant algebraic spectrum lies on the circle of radius \(1/2\).

#### Proof

For \(0\leq j\leq b\), let \(V_j\) be the space of functions depending only on \(x\bmod3^j\), with \(V_0\) the constants. Then

\[
V_0\subset V_1\subset\cdots\subset V_b.
\]

Let

\[
Ef(x)=f(x/2),
\qquad
Of(x)=f((3x+1)/2).
\]

Clearly \(E(V_j)\subseteq V_j\). Moreover,

\[
(3x+1)/2\bmod3^j
\]

depends only on \(x\bmod3^{j-1}\); hence

\[
O(V_j)\subseteq V_{j-1}.
\]

Therefore, on the quotient \(V_j/V_{j-1}\), the operator \(\mathcal L_{b,t}=E+tO\) induces simply \(E\).

Multiplication by \(2^{-1}\) is one cycle on \(U_j\), because

\[
\operatorname{ord}_{3^j}(2)=2\cdot3^{j-1}=N_j.
\]

The order assertion follows from the lifting-the-exponent identity

\[
v_3\!\left(4^{3^{j-1}}-1\right)
 =
v_3(4-1)+v_3(3^{j-1})=j.
\]

Thus \(E\) on \(V_j\) has characteristic polynomial \(z^{N_j}-1\), and on \(V_j/V_{j-1}\) it has characteristic polynomial

\[
\frac{z^{N_j}-1}{z^{N_{j-1}}-1}.
\]

Multiplying these quotient factors telescopes to

\[
\frac{z^{N_b}-1}{z-1}.
\]

Finally, on constants,

\[
\mathcal L_{b,t}1=(1+t)1.
\]

This proves the formula. ∎

This looks considerably stronger than the expansion originally requested. But it does **not** solve the pointwise problem.

First, \(\mathcal L_{b,t}\) is non-normal, so its algebraic spectrum is not by itself a uniform \(L^2\) property-\(\tau\) statement.

More importantly,

\[
P_{b,1}^k f(x)
 =
2^{-k}
\sum_{\varepsilon\in\{0,1\}^k}
f\!\left(
F_{\varepsilon_{k-1}}\circ\cdots\circ F_{\varepsilon_0}(x)
\right).
\]

It averages over all \(2^k\) parity continuations. A fixed integer follows exactly **one** continuation.

---

## 5. An explicit exceptional spine survives the spectral gap

Consider the negative shortcut orbit

\[
-5\longmapsto-7\longmapsto-10\longmapsto-5.
\]

Its parity word is

\[
(110)^\infty.
\]

The leading multiplicative coefficient along the first three prefixes is

\[
\frac32,\qquad \frac94,\qquad \frac98,
\]

and each further block multiplies it by \(9/8>1\). Thus

\[
\frac{3^{s_k}}{2^k}\geq1
\qquad\text{for every }k.
\]

This gives an infinite critical-growth path in every finite \(3\)-adic residue graph, despite the exact algebraic spectral radius \(1/2\) off constants.

This is not a positive Collatz counterexample. Its role is to show that **average residue mixing and the existence of one forever-exceptional path are completely compatible**. The distinction between this path and a hypothetical positive divergent path is archimedean order, not modular expansion.

More generally, every infinite parity sequence is realized by exactly one \(2\)-adic integer. citeturn596684view3 Uniform branch averaging therefore averages over all \(2\)-adic points, while the positive integers form a highly exceptional countable subset.

There is an even more concrete interpretation. The two outgoing edges from \(x\bmod M\) correspond to the actual integers

\[
x\quad\text{and}\quad x+M,
\]

not to two choices available to the orbit of \(x\). Iterating all graph edges varies the higher binary digits of the initial integer. The positive representative \(x\in[0,M)\) is one distinguished boundary ray in that tree of lifts. Property-\(\tau\) gives no control over that one ray.

---

## 6. The exact order statement that would prove Collatz

For \(k\geq1\), define

\[
\mathcal B_k
 =
\left\{
1\leq n<2^k:
T^j(n)\geq n\ \text{for every }1\leq j\leq k
\right\}.
\]

Let

\[
m_k=\min(\mathcal B_k\setminus\{1\}),
\]

with \(m_k=\infty\) if the set is empty.

### Theorem 6. Exact minimum-escape criterion

The Collatz conjecture is equivalent to

\[
\boxed{m_k\longrightarrow\infty.}
\]

#### Proof

Suppose Collatz is false and let \(n>1\) be its least counterexample. If some iterate satisfied

\[
T^j(n)<n,
\]

then \(T^j(n)\) would converge by minimality, forcing \(n\) to converge. Hence

\[
T^j(n)\geq n
\qquad\text{for every }j.
\]

For every sufficiently large \(k\), \(n<2^k\), so \(n\in\mathcal B_k\). Thus \(m_k\leq n\) infinitely often.

Conversely, suppose \(m_k\to\infty\). Fix \(n>1\). Choose \(k\) with \(2^k>n\) and \(m_k>n\). Then \(n\notin\mathcal B_k\), so some iterate \(T^j(n)<n\). Strong induction on \(n\) now proves that every positive integer reaches \(1\). ∎

This exposes the precise logical gap:

\[
\frac{|\mathcal B_k|}{2^k}\longrightarrow0
\]

is not enough. A fixed integer \(n\) could remain in every \(\mathcal B_k\) while contributing vanishing density. Even an exponentially small bad set can contain one coherent nested spine.

A sufficient order-sensitive replacement for property-\(\tau\) would be, for example,

\[
|\mathcal B_k\cap[2,N]|
 \leq
C N^\theta\rho^k,
\qquad
\rho<1,
\]

uniformly for \(N<2^k\). For fixed \(N\), the right-hand side eventually becomes \(<1\).

An equivalent type of target is a height-weighted survivor estimate. For \(s>0\), put

\[
Z_k(s)
 =
\sum_{\substack{n\in\mathcal B_k\\n>1}}n^{-s}.
\]

Then

\[
\boxed{
Z_k(s)\longrightarrow0
\quad\Longrightarrow\quad
\text{Collatz}.
}
\]

Indeed, a least counterexample \(n\) would contribute the fixed positive amount \(n^{-s}\) to \(Z_k(s)\) for all sufficiently large \(k\).

This is the natural “property-\(\tau\) with order” statement. Ordinary property-\(\tau\) uses uniform counting measure and cannot see it.

---

## 7. An entropy–height obstruction to the inverse-expansion bridge

There is a second exact obstruction. It shows that even perfect residue equidistribution would not automatically supply smaller competing ancestors.

Use the odd accelerated map

\[
U(x)=\frac{3x+1}{2^{v_2(3x+1)}}.
\]

For a valuation word

\[
a=(a_1,\ldots,a_r),\qquad a_i\geq1,
\]

write

\[
A(a)=a_1+\cdots+a_r.
\]

Reversing this word from an endpoint \(X\) gives an affine expression

\[
z_a(X)
 =
\frac{2^{A(a)}X-C_a}{3^r}.
\]

For each fixed word \(a\), exact integrality at every reverse step selects at most one residue class

\[
X\bmod3^r.
\]

Let \(\mathcal R_r(L)\) be the endpoint residue classes that admit at least one reverse word of length \(r\) and total exponent at most \(L\).

### Theorem 7. Contracting inverse words occupy exponentially few residues

For \(L\geq r\),

\[
\boxed{
|\mathcal R_r(L)|\leq\binom Lr.
}
\]

In particular, with

\[
\lambda=\log_2 3,
\qquad
L_r=\lfloor\lambda r\rfloor,
\]

one has

\[
\frac{|\mathcal R_r(L_r)|}{3^r}
\leq
\exp\bigl(-\kappa r+O(\log r)\bigr),
\]

where

\[
\kappa
 =
\log3-\lambda H(1/\lambda)
 =
0.0549794728\ldots>0
\]

and

\[
H(p)=-p\log p-(1-p)\log(1-p).
\]

Numerically, the exponential factor is approximately

\[
e^{-\kappa}=0.9465046.
\]

#### Proof

The number of positive compositions of \(A\) into \(r\) parts is

\[
\binom{A-1}{r-1}.
\]

Therefore the number of words with \(A\leq L\) is

\[
\sum_{A=r}^{L}\binom{A-1}{r-1}
 =
\binom Lr.
\]

Each word contributes at most one endpoint class modulo \(3^r\), proving the first assertion.

Stirling’s formula gives

\[
\log\binom{\lambda r+O(1)}r
 =
\lambda r\,H(1/\lambda)+O(\log r).
\]

After division by \(3^r\), the exponent is

\[
-\bigl(\log3-\lambda H(1/\lambda)\bigr)r+O(\log r).
\]

Finally,

\[
H(1/\lambda)<\log2
\]

because \(1/\lambda\neq1/2\), so

\[
\lambda H(1/\lambda)
<
\lambda\log2
=
\log3.
\]

Hence \(\kappa>0\). ∎

The significance is that

\[
A(a)\leq\lambda r
\quad\Longleftrightarrow\quad
\frac{2^{A(a)}}{3^r}\leq1.
\]

So the endpoint residues admitting even a nonexpanding inverse affine slope form an exponentially small subset of \(\mathbb Z/3^r\mathbb Z\). To descend from a large orbit value \(X\) all the way below the original least counterexample \(n\), one needs

\[
\frac{2^{A(a)}}{3^r}\lesssim\frac nX,
\]

which is much stronger and gives an even smaller residue set.

Thus ideal equidistribution has the wrong implication: it says that robustly descending competitors are **rare**, not that every endpoint must possess one.

This aligns exactly with your earlier local-global decomposition. Terminal \(3\)-adic compatibility is genuinely suffix-local, as your terminal-locality theorem proves. fileciteturn1file0L29-L56 But whether a compatible competitor is positive and below the original input depends on an archimedean affine cutoff. fileciteturn1file0L60-L94 Property-\(\tau\) controls the first datum, while the required contradiction lives in the second.

---

## 8. Final verdict

The proposed proof cannot be completed as stated for three independent reasons:

1. The natural mixed graphs have exact directed nonexpanding sets and de Bruijn bottlenecks, so the required uniform expansion theorem is false.

2. The only literal group-quotient version lies in a solvable affine group, and every separating congruence family fails property-\(\tau\).

3. Even the surviving exact \(3\)-adic algebraic spectral gap averages over all parity continuations. It does not control the single continuation corresponding to a fixed positive integer, and compatible shrinking inverse paths are themselves exponentially sparse.

A recent independent reduction reaches the same conceptual boundary from another direction: it proves almost perfect map-level residue balance but leaves a deterministic, pointwise orbit-visitation statement as the unresolved step. citeturn521129view0

The repaired version of approach 52 is therefore not ordinary property-\(\tau\), but the following order-weighted contraction estimate:

\[
\boxed{
\exists\,s>0,\ C<\infty,\ \rho<1
\quad\text{such that}\quad
\sum_{\substack{2\leq n<2^k\\
T^j(n)\geq n\ \forall\,1\leq j\leq k}}
n^{-s}
\leq C\rho^k.
}
\]

This estimate would give a complete proof immediately by Theorem 6. Establishing it would require a genuinely pointwise height-residue mechanism—stronger than expansion, and capable of distinguishing the distinguished positive lift from the exponentially many other \(2\)-adic continuations.