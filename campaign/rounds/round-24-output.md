model: GPT-5 Pro
round: 24 -- approach 19, Terminal-suffix transducer with a vanishing joint spectral radius
front: proof
sent: 2026-08-13T18:48:10Z
worked: 60m 40s

---

# Outcome

The proposed proof does **not** close as stated. The obstruction is specific and rigorous:

1. The coordinate \(C_j+2^{A_j}\pmod{3^r}\) is not itself terminal-suffix-local; only its divisibility by \(3^r\), or a normalized version of the residue, is local.
2. For Boolean transition matrices, joint spectral radius \(<1\) is equivalent to exact eventual nilpotence. An explicit retained periodic ray produces arbitrarily long survivor paths, so the natural stationary transducer has joint spectral radius at least \(1\).
3. Assigning contracting real weights does not repair the implication: an infinite path can have exponentially decaying weight.
4. Even after replacing the coarse barrier state by an exact finite-height window, fixed-\(r\) spectral radius only detects cycles. A divergent orbit could give a finite but increasingly long transient at every scale.
5. The correct target is a **graded linear nilpotence estimate**, or equivalently a uniformly well-conditioned contracting norm. I prove below that this strengthened estimate would imply Collatz.

Thus a claimed full proof using only the advertised fixed-state JSR inequality would contain a false or insufficient lemma. What can be completed is an exact obstruction theorem and a corrected spectral reduction.

Current rigorous benchmarks remain pointwise-incomplete: Tao proves an almost-all result using \(3\)-adic transport, while Barina’s exhaustive verification reaches \(2^{71}\). citeturn344682view0turn344682view1

---

## 1. The exact terminal coordinate

Work with the accelerated odd map

\[
U(x)=\frac{3x+1}{2^{v_2(3x+1)}}.
\]

For a valuation word

\[
w=(a_0,\ldots ,a_{j-1}),
\qquad
A_t=\sum_{i<t}a_i,
\]

define

\[
C_0=0,
\qquad
C_{t+1}=3C_t+2^{A_t}.
\]

Then an orbit segment with this word satisfies

\[
2^{A_j}U^j(n)=3^j n+C_j.
\tag{1}
\]

If \(w=uv\), where the terminal suffix \(v\) has length \(r\), and if

\[
P=A(u),\qquad B=A(v),
\]

then

\[
C(uv)=3^rC(u)+2^P C(v).
\tag{2}
\]

This is the source of terminal locality. If \(X=U^j(n)\), then reduction of (1) modulo \(3^r\) gives

\[
X\equiv 2^{-B}C(v)\pmod{3^r},
\tag{3}
\]

and therefore

\[
3^r\mid X+1
\quad\Longleftrightarrow\quad
3^r\mid C(v)+2^B.
\tag{4}
\]

This is exactly your terminal-suffix locality theorem. fileciteturn18file0L75-L107

### The proposed residue needs normalization

Set

\[
Q(w):=C(w)+2^{A(w)}.
\]

Equation (2) gives

\[
Q(uv)
\equiv
2^P\bigl(C(v)+2^B\bigr)
\pmod{3^r}.
\tag{5}
\]

Thus:

- the condition \(Q(uv)\equiv0\pmod{3^r}\) is suffix-local, because \(2^P\) is invertible modulo \(3^r\);
- the full residue \(Q(uv)\pmod{3^r}\) is **not** suffix-local, because it retains the prefix phase \(2^P\).

The exact terminal coordinate should instead be

\[
z_j
:=
2^{-A_j}\bigl(C_j+2^{A_j}\bigr)
\pmod{3^r}.
\tag{6}
\]

For \(j\ge r\), (1) shows that

\[
z_j\equiv U^j(n)+1\pmod{3^r}.
\tag{7}
\]

For \(w=uv\), this becomes

\[
z_j\equiv
2^{-B}\bigl(C(v)+2^B\bigr)
\pmod{3^r},
\tag{8}
\]

which is genuinely terminal-\(r\)-local.

There is also an exact forward transition. If the next valuation is \(a\), then

\[
x_{j+1}+1
=
\frac{3(x_j+1)+2^a-2}{2^a},
\]

so

\[
z_{j+1}
\equiv
2^{-a}\bigl(3z_j+2^a-2\bigr)
\pmod{3^r}.
\tag{9}
\]

This gives the correct finite \(3\)-adic part of the transducer.

The remaining problem is archimedean: the exact exponents \(a_j\) and the height deficit are unbounded. Terminal locality makes compatibility finite-state, but it does not make descent finite-state.

---

## 2. What joint spectral radius \(<1\) means for an automaton

Let \(\mathcal M\) be a finite family of nonnegative integer matrices, for example the \(0\)-\(1\) transition matrices corresponding to possible next valuation symbols. Its joint spectral radius is

\[
\widehat\rho(\mathcal M)
=
\limsup_{L\to\infty}
\max_{M_1,\ldots,M_L\in\mathcal M}
\left\|M_L\cdots M_1\right\|^{1/L}.
\tag{10}
\]

This measures maximal asymptotic product growth. citeturn344682view2

### Lemma 1 — Integer-matrix dichotomy

For a finite family of nonnegative integer matrices,

\[
\widehat\rho(\mathcal M)<1
\]

if and only if there is an \(L_0\) such that every product of \(L_0\) matrices from \(\mathcal M\) is zero. Consequently, in this case

\[
\widehat\rho(\mathcal M)=0.
\]

#### Proof

Use the maximum-entry norm. Every nonzero nonnegative integer matrix has norm at least \(1\).

If there are nonzero products of arbitrarily large lengths \(L\), then

\[
\max_{M_1,\ldots,M_L}
\|M_L\cdots M_1\|\ge1
\]

for arbitrarily large \(L\), giving

\[
\widehat\rho(\mathcal M)\ge1.
\]

Therefore \(\widehat\rho<1\) implies that the lengths of nonzero products are bounded. Hence all products of some common length \(L_0\) are zero. The reverse implication is immediate. ∎

So for an ordinary finite automaton, “JSR \(<1\)” is not a probabilistic contraction. It means:

\[
\boxed{\text{There are no admissible paths beyond one fixed finite length.}}
\]

A directed cycle immediately gives JSR at least \(1\).

### Weighted paths behave differently

For real weighted matrices, JSR \(<1\) does not imply path extinction. The one-state automaton

\[
M=[1/2]
\]

has

\[
\widehat\rho(M)=1/2,
\]

but its loop can be followed forever.

Moreover, replacing every transition weight by one half of its previous value halves the JSR without changing a single accepted word. Therefore a weighted spectral radius is arithmetically meaningful only when accompanied by a lower bound saying that every genuine integer survivor has a non-negligible weight.

---

## 3. An explicit retained recurrent obstruction

The decisive test word is

\[
v=(1,1,2).
\]

Your compression framework already proves that

\[
v^\infty=(1,1,2)^\infty
\]

is a retained Bellman ray, that every finite prefix is retained, and that its associated \(2\)-adic point is

\[
-\frac{19}{11}.
\tag{11}
\]

It also proves that an infinite valuation ray comes from a nonnegative ordinary integer precisely when its nested least \(2\)-adic representatives eventually stabilize. fileciteturn20file0L12-L56

Here is the full arithmetic of this obstruction.

### Proposition 2 — The \(-19/11\) survivor ray

The block \(v=(1,1,2)\) has

\[
A(v)=4,\qquad C(v)=19,
\]

and its affine map is

\[
F_v(x)=\frac{27x+19}{16}.
\tag{12}
\]

Its fixed point is

\[
\xi=-\frac{19}{11}.
\tag{13}
\]

Indeed,

\[
-\frac{19}{11}
\xrightarrow{\,1\,}
-\frac{23}{11}
\xrightarrow{\,1\,}
-\frac{29}{11}
\xrightarrow{\,2\,}
-\frac{19}{11}.
\tag{14}
\]

Every prefix of \(v^\infty\) satisfies the strict multiplicative barrier

\[
2^{A_t}<3^t.
\tag{15}
\]

For every \(K\equiv3\pmod5\), the positive odd integer

\[
n_K=\frac{2^{4K+1}-19}{11}
\tag{16}
\]

has initial valuation word \(v^K\), and every orbit value through those \(3K\) accelerated steps is smaller than \(3^{3K}\).

#### Proof

Applying the three branches gives

\[
x
\longmapsto
\frac{3x+1}{2}
\longmapsto
\frac{9x+5}{4}
\longmapsto
\frac{27x+19}{16},
\]

which proves (12). Solving \(F_v(\xi)=\xi\) gives (13), and direct substitution gives (14).

At times \(t=3m,3m+1,3m+2\), the cumulative exponent is respectively

\[
4m,\qquad 4m+1,\qquad 4m+2.
\]

Thus

\[
\frac{2^{A_t}}{3^t}
=
\left(\frac{16}{27}\right)^m
\begin{cases}
1,&t=3m,\\[1mm]
2/3,&t=3m+1,\\[1mm]
4/9,&t=3m+2,
\end{cases}
\]

which is less than \(1\) for every \(t\ge1\).

Now suppose \(K\equiv3\pmod5\). Since \(4K+1\equiv3\pmod{10}\), and \(2\) has order \(10\) modulo \(11\),

\[
2^{4K+1}\equiv2^3\equiv8\equiv19\pmod{11}.
\]

Hence \(n_K\) is a positive odd integer. Moreover,

\[
11n_K+19=2^{4K+1},
\]

so

\[
n_K\equiv-\frac{19}{11}\pmod{2^{4K+1}}.
\tag{17}
\]

A word of total exponent \(4K\) is determined by one residue class modulo \(2^{4K+1}\). Therefore \(n_K\) has first \(3K\) valuations \(v^K\).

Let \(x_m=F_v^m(n_K)\) be the point after \(m\) complete blocks. From the fixed-point identity,

\[
F_v^m(x)-\xi
=
\left(\frac{27}{16}\right)^m(x-\xi).
\]

Using (16),

\[
x_m
=
\frac{2^{4(K-m)+1}27^m-19}{11},
\qquad 0\le m\le K.
\tag{18}
\]

Block endpoints increase, because

\[
F_v(x)-x=\frac{11x+19}{16}>0
\]

for \(x>0\). Within each block, the first two \(a=1\) steps increase the value. Hence the largest value in the entire segment occurs immediately before the final \(a=2\) division.

The last block starts at

\[
x_{K-1}
=
\frac{32\cdot27^{K-1}-19}{11}.
\]

The next two points are

\[
\frac{48\cdot27^{K-1}-23}{11},
\qquad
\frac{72\cdot27^{K-1}-29}{11}.
\]

But

\[
\frac{72\cdot27^{K-1}-29}{11}
<
27^K=3^{3K},
\]

because \(72<11\cdot27=297\). All earlier points are smaller. ∎

### Consequences

This one ray defeats several possible interpretations of the proposed spectral step.

First, every finite prefix is not merely formally compatible: it is retained in the Bellman survivor tree. Thus a sound automaton accepting the retained frontier must admit paths labeled by

\[
(1,1,2)^K
\]

for arbitrarily large \(K\).

Second, with the natural forward-slope weight \(3/2^a\), one block has weight

\[
\frac32\cdot\frac32\cdot\frac34
=
\frac{27}{16}>1.
\]

Therefore the constrained weighted spectral radius satisfies

\[
\widehat\rho_{\mathrm{slope}}
\ge
\left(\frac{27}{16}\right)^{1/3}
>1.
\tag{19}
\]

Using the reciprocal weights \(2^a/3\) would make the block contract, but the infinite path would still be present. It would merely be assigned a weight tending to zero.

Third, Proposition 2 is stronger than a purely \(2\)-adic objection. Along the infinite subsequence \(K\equiv3\pmod5\), the finite positive realization satisfies the exact full-depth no-wrap condition

\[
0<U^t(n_K)<3^{3K},
\qquad 0\le t\le3K.
\tag{20}
\]

So positivity, strict barrier, terminal congruence, and full-depth no-wrap can all hold for arbitrarily long prefixes while the starting integer changes with the depth.

The failure is precisely that

\[
n_K\longrightarrow-\frac{19}{11}
\qquad\text{in }\mathbb Z_2,
\]

rather than stabilizing at one positive ordinary integer.

Thus:

\[
\boxed{
\text{A persistent local component is not yet a Collatz counterexample.}
}
\]

It may simply be a rational \(2\)-adic ghost.

---

## 4. Why the archimedean state cannot be a harmless finite bin

Suppose an actual word is decomposed as \(w=u\tau\), and a terminal competitor \(b\) is chosen using the \(3\)-adic suffix data. Your exact local-global formula is

\[
Y-R
=
\frac{\Sigma(u,\tau,c)+h(\tau,b)}{2^c}.
\tag{21}
\]

Here \(h(\tau,b)\) is determined by the terminal suffix and its compatible fibre, but

\[
\Sigma(u,\tau,c)
\]

depends on the entire prefix and on its least positive realization. Therefore terminal compatibility and pointwise descent are mathematically distinct. fileciteturn18file0L162-L250

A finite barrier bin can be used only after proving that every exact prefix represented by that bin gives the same sign in (21). Without such a uniform domination theorem, the bin is an overapproximation and may introduce spurious cycles—or unsoundly delete genuine paths.

Your explicit strict-barrier word of length \(42\) has optimal competing-ancestor cutoff exactly \(814\). This proves that even within the present finite data, very small universal cutoff rules fail; it does not prove the cutoffs unbounded. fileciteturn19file0L75-L158

This is why the archimedean part cannot simply be appended as a fixed number of coarse states and then forgotten.

---

## 5. The exact finite transducer that is safe

The safe repair is to replace a discretized barrier by an exact finite-height box.

For \(r\ge1\), let

\[
\mathcal H_r
=
\{x\in\mathbb Z_{>0}:x\text{ odd},\ 1<x<3^r\}.
\]

An \(r\)-window is a tuple

\[
(x_0,x_1,\ldots,x_r)
\]

such that

\[
x_i\in\mathcal H_r,
\qquad
x_{i+1}=U(x_i).
\]

Let \(\mathcal S_r\) be the set of all such windows. It is finite; in fact a window is determined by \(x_0\), so

\[
|\mathcal S_r|<3^r.
\tag{22}
\]

There is a directed edge

\[
(x_0,\ldots,x_r)
\longrightarrow
(x_1,\ldots,x_r,x_{r+1})
\]

whenever \(x_{r+1}=U(x_r)\) also lies in \(\mathcal H_r\).

### Terminal-suffix encoding of the exact window

Let

\[
v=(a_0,\ldots,a_{r-1})
\]

be the valuations in an \(r\)-window, and let \(B=A(v)\). Terminal locality gives

\[
x_r\equiv2^{-B}C(v)\pmod{3^r}.
\tag{23}
\]

Because \(1<x_r<3^r\), this congruence identifies \(x_r\) exactly. Reading backward through

\[
x_i=\frac{2^{a_i}x_{i+1}-1}{3}
\]

reconstructs the entire window. Therefore the finite box graph is genuinely equivalent to a terminal-suffix transducer.

The possible exponents are also bounded inside the box. Since

\[
2^{a_i}x_{i+1}=3x_i+1
\]

and \(x_i<3^r\),

\[
2^{a_i}<3^{r+1}+1.
\]

Thus only finitely many exponent symbols occur at each scale \(r\).

This is the exact version of the construction: no coarse real-height bin and no spurious \(2\)-adic path.

---

## 6. Fixed-scale JSR is still insufficient

Let \(\mathcal M_r\) be the family of \(0\)-\(1\) transition matrices of the exact scale-\(r\) transducer. Define its post-warm-up residence length

\[
\nu_r
=
\sup\left\{
L:
\begin{array}{c}
\text{there exist }x_0,\ldots,x_{r+L}\in\mathcal H_r,\\
x_{i+1}=U(x_i)
\end{array}
\right\}.
\tag{24}
\]

Equivalently, \(\nu_r\) is the largest length of a nonzero matrix product from \(\mathcal M_r\). It is infinite when the box contains a nontrivial cycle.

By Lemma 1,

\[
\widehat\rho(\mathcal M_r)<1
\quad\Longleftrightarrow\quad
\nu_r<\infty.
\tag{25}
\]

This only says that the orbit cannot remain in the **fixed** box forever.

A divergent orbit can exit every finite box. It is entirely compatible with

\[
\widehat\rho(\mathcal M_r)=0
\qquad\text{for every fixed }r,
\]

while \(\nu_r\) grows rapidly with \(r\).

The rate of growth of \(\nu_r\), not the fixed-scale JSR, is the decisive quantity.

---

## 7. The corrected graded criterion

Set

\[
\kappa
=
\log_{3/2}2
=
\frac{\log 2}{\log(3/2)}
=
1.709511291\ldots.
\tag{26}
\]

### Theorem 3 — Linear residence criterion

If a positive Collatz orbit avoids \(1\), then

\[
\liminf_{r\to\infty}\frac{\nu_r}{r}
\ge\kappa.
\tag{27}
\]

Consequently, any proof that

\[
\liminf_{r\to\infty}\frac{\nu_r}{r}<\kappa
\tag{28}
\]

would prove the Collatz conjecture. In particular, the stronger estimate

\[
\nu_r\le(\kappa-\varepsilon)r
\tag{29}
\]

for all sufficiently large \(r\) would be a complete proof.

#### Proof

For every accelerated step,

\[
x_{t+1}+1
=
\frac{3x_t+1}{2^{a_t}}+1
\le
\frac{3x_t+1}{2}+1
=
\frac32(x_t+1).
\]

Therefore

\[
x_t+1
\le
\left(\frac32\right)^t(n+1).
\tag{30}
\]

Fix \(c<\kappa\). Then

\[
(1+c)\log(3/2)<\log3.
\]

Hence, for all sufficiently large \(r\),

\[
\left(\frac32\right)^{r+\lfloor cr\rfloor}(n+1)
<
3^r.
\tag{31}
\]

It follows from (30) that

\[
1<x_t<3^r
\qquad
0\le t\le r+\lfloor cr\rfloor.
\]

Thus the first \(r\) steps form a state of the terminal transducer, followed by at least \(\lfloor cr\rfloor\) legal transitions. Hence

\[
\nu_r\ge\lfloor cr\rfloor
\]

for every sufficiently large \(r\). Letting \(c\uparrow\kappa\) proves (27). ∎

This is the correct replacement for “JSR \(<1\), increasingly strongly with \(r\)”:

\[
\boxed{
\text{The normalized nilpotence length must be strictly below }
\log_{3/2}2.
}
\]

A fixed-\(r\) JSR does not retain this nilpotence-length information: every finite nilpotent automaton has JSR exactly zero, whether its longest path has length \(10\), \(10^{10}\), or \(3^r\).

---

## 8. A genuine weighted-JSR theorem

There is a way to formulate the needed estimate spectrally, but it requires control of the norm’s conditioning across scales.

Let \(\|\cdot\|_r\) be a norm on the scale-\(r\) state space, and define its distortion relative to the standard maximum norm by

\[
D_r
=
\left(
\sup_{v\ne0}\frac{\|v\|_r}{\|v\|_\infty}
\right)
\left(
\sup_{v\ne0}\frac{\|v\|_\infty}{\|v\|_r}
\right).
\tag{32}
\]

Suppose there is a fixed \(\theta<1\) such that every survivor-transition matrix satisfies

\[
\|M\|_r\le\theta.
\tag{33}
\]

Then every product \(P=M_L\cdots M_1\) satisfies

\[
\|P\|_\infty
\le
D_r\theta^L.
\tag{34}
\]

If \(P\) is a nonzero \(0\)-\(1\) product, then

\[
\|P\|_\infty\ge1.
\]

Therefore

\[
D_r\theta^L\ge1
\]

for every admissible path of length \(L\), and hence

\[
\nu_r
\le
\frac{\log D_r}{\log(1/\theta)}.
\tag{35}
\]

Combining this with Theorem 3 gives the following exact spectral win condition.

### Corollary 4 — Balanced common-norm criterion

The Collatz conjecture follows if there exist \(\theta<1\) and norms \(\|\cdot\|_r\) satisfying (33) and

\[
\liminf_{r\to\infty}
\frac{\log D_r}
     {r\log(1/\theta)}
<
\log_{3/2}2.
\tag{36}
\]

For example, subexponential distortion

\[
D_r=e^{o(r)}
\]

together with any uniform contraction \(\theta<1\) would prove Collatz.

If the available norm has distortion of approximately the state-space size,

\[
D_r\le e^{o(r)}3^r,
\]

then (36) requires

\[
\theta
<
3^{-1/\kappa}
=
0.5258985309\ldots.
\tag{37}
\]

This is the mathematically meaningful “vanishing weighted JSR” target. It contains both ingredients absent from a bare JSR statement:

\[
\text{exponential contraction}
\quad+\quad
\text{controlled norm distortion}.
\]

For a nilpotent graph one can always invent a very strongly contracting norm by assigning exponentially different weights to successive levels. But then \(D_r\) is exponentially large in the longest path length, and inequality (36) records exactly that hidden cost.

---

## 9. What would constitute a real disproof target

Let \(R_j\) be the least nonnegative representative of the starting-value class of an infinite valuation ray modulo \(2^{A_j+1}\). These representatives are nested:

\[
R_{j+1}\equiv R_j\pmod{2^{A_j+1}}.
\]

The ray comes from one positive ordinary integer \(n\) exactly when

\[
R_j=n
\]

for all sufficiently large \(j\). fileciteturn20file0L12-L40

Therefore a persistent collection of recurrent transducer states is a genuine counterexample candidate only when it comes with a projectively compatible tower satisfying all of the following simultaneously:

\[
\begin{aligned}
&\text{the suffix and \(3\)-adic states project consistently as }r\to\infty,\\
&\text{the nested \(2\)-adic seed representatives eventually stabilize at one }n>0,\\
&\text{the resulting exact orbit avoids }1,\\
&\text{the archimedean comparisons never produce a smaller coalescing ancestor.}
\end{aligned}
\]

The ray \((1,1,2)^\infty\) fails the second condition: its representatives converge to \(-19/11\), rather than stabilizing.

Your existing framework identifies the same missing theorem as a synchronization between eventual positive \(2\)-adic stabilization and \(3\)-adic endpoint compressibility. It also notes that proving the finite \(81/64\) subsystem would still leave this global synchronization step unresolved. fileciteturn20file3L306-L321

---

# Final verdict

Approach 19, in its literal stationary form, does not prove Collatz.

The proposed state must first be corrected by normalizing the carry residue. After that correction:

\[
\begin{array}{c}
\text{Boolean JSR}<1
\end{array}
\]

means only fixed-scale nilpotence, which cannot exclude escape to infinity; and the retained ray

\[
(1,1,2)^\infty\longleftrightarrow-\frac{19}{11}
\]

prevents a coarse stationary survivor automaton from having such a spectral gap in the first place.

The strongest correct theorem obtained from the approach is:

\[
\boxed{
\text{Collatz follows if }
\liminf_{r\to\infty}\frac{\nu_r}{r}
<
\log_{3/2}2.
}
\]

A genuine JSR implementation would need to prove the balanced norm estimate

\[
\boxed{
\frac{\log D_r}{r\log(1/\theta)}
<
\log_{3/2}2
}
\]

along an unbounded sequence of scales.

That estimate is not presently established. Proving it requires exactly the missing local-global synchronization: terminal \(3\)-adic locality must be coupled to the prefix-dependent archimedean score for one fixed, eventually stabilized positive seed.