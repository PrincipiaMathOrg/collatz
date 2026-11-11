model: GPT-5.6 Pro (Chat mode)
round: 47 -- approach 42, Aperiodic tilings of Collatz spacetime
front: proof
sent: 2026-08-15T07:40Z
worked: 41m 58s

---
# Aperiodic tilings of Collatz spacetime: exact construction and obstruction

After making the tiling construction completely local, the proposed final step splits in two:

1. For the unrestricted arithmetic tile set, “every finite-boundary tiling becomes periodic” is **false**. There is an explicit finite-boundary aperiodic tiling whose columns are the ternary expansions of \(1,2,4,8,\ldots\).
2. After imposing the boundary geometry that makes the tiling encode an actual positive-integer Collatz orbit, eventual periodicity is **equivalent to eventual cycling of that orbit**. One must then separately exclude nontrivial positive cycles.

Thus I do not obtain a valid full proof of Collatz. What follows is a complete rigorous reduction, together with several no-go theorems showing why the natural local-periodicity and height-function arguments do not close the remaining gap.

## 1. An honest Wang tile system

Use the shortcut Collatz map

\[
T(n)=
\begin{cases}
n/2,&n\equiv0\pmod2,\\[2mm]
(3n+1)/2,&n\equiv1\pmod2.
\end{cases}
\]

This is equivalent to the usual \(3n+1\) formulation.

For \(x\in\{0,1,2,3,4,5\}\), define a Wang tile with north and south colors in \(\{0,1\}\), and east and west colors in \(\{0,1,2\}\), by

\[
N=\left\lfloor\frac{x}{3}\right\rfloor,\qquad
E=x\bmod 3,\qquad
W=\left\lfloor\frac{x}{2}\right\rfloor,\qquad
S=x\bmod 2.
\]

Explicitly:

\[
\begin{array}{c|cccc}
x&N&E&W&S\\ \hline
0&0&0&0&0\\
1&0&1&0&1\\
2&0&2&1&0\\
3&1&0&1&1\\
4&1&1&2&0\\
5&1&2&2&1
\end{array}
\]

Every tile satisfies the local arithmetic law

\[
\boxed{\,3N+E=2W+S\,}. \tag{1}
\]

Conversely, for every pair \((N,E)\in\{0,1\}\times\{0,1,2\}\), equation (1) determines a unique pair \((W,S)\). Thus the system is northeast-deterministic.

These six tiles are the Collatz tiles of Cook–Stérin–Woods. They simultaneously implement multiplication by \(3\) in binary and division by \(2\) in ternary; the earlier Stérin–Woods quasi-cellular automaton used the same arithmetic rule but required a nonlocal bootstrap operation. citeturn197406view1turn914720view0turn914720view1

### Localizing the nonlocal operation

Introduce one control color \(\sigma\) and two more tiles

\[
D_0=(N,E,W,S)=(0,\sigma,\sigma,0),
\]

\[
D_1=(N,E,W,S)=(1,\sigma,2,0).
\]

The control signal \(\sigma\) moves across trailing binary zeroes using \(D_0\). When it encounters the first binary \(1\), tile \(D_1\) consumes the control signal and emits the ternary carry \(2\). This localizes both deletion of trailing binary zeroes and the bootstrap needed for the \(3n+1\) branch. These are exactly the two control tiles displayed in the published eight-tile construction. citeturn392583view0turn197406view1

Given a finite binary word along the north boundary and a control ray along the east boundary, every interior tile is now determined locally. No nonlocal update rule remains.

---

## 2. A weighted discrete Stokes theorem

Consider a \(w\times h\) rectangular tiled region. Number columns \(i=0,\ldots,w-1\) from east to west and rows \(j=0,\ldots,h-1\) from south to north.

Define the four boundary numbers by

\[
[N]_{2}=\sum_{i=0}^{w-1}N_i2^i,\qquad
[S]_{2}=\sum_{i=0}^{w-1}S_i2^i,
\]

\[
[E]_{3}=\sum_{j=0}^{h-1}E_j3^j,\qquad
[W]_{3}=\sum_{j=0}^{h-1}W_j3^j.
\]

For an arithmetic tile at \((i,j)\), multiply (1) by \(2^i3^j\), then sum over the rectangle. Every interior edge cancels: a north edge receives the same weight as the matching south edge above it, and a west edge receives the same weight as the matching east edge to its west. Therefore

\[
\boxed{\;
3^h[N]_{2}+[E]_{3}
=
2^w[W]_{3}+[S]_{2}.
\;} \tag{2}
\]

This is the rectangular identity appearing in the tile construction, now viewed as a discrete divergence theorem. citeturn197406view1

### Control tiles as point charges

Assign the numerical value \(0\) to \(\sigma\) solely for this calculation, and define the local defect

\[
d=3N+E-2W-S.
\]

Then

\[
d(D_0)=0,\qquad d(D_1)=3-4=-1.
\]

Repeating the Stokes calculation gives

\[
3^h[N]_{2}+[E]_{3}
-
2^w[W]_{3}-[S]_{2}
=
-\sum_{D_1\text{ at }(i,j)}2^i3^j,
\]

or equivalently

\[
\boxed{\;
2^w[W]_{3}+[S]_{2}
=
3^h[N]_{2}+[E]_{3}
+
\sum_{D_1\text{ at }(i,j)}2^i3^j.
\;} \tag{3}
\]

Thus each odd Collatz event is literally a positive point charge of weight \(2^i3^j\).

## 3. Recovering the exact Collatz affine formula

Let

\[
x_t=T^t(n),\qquad
\epsilon_t=x_t\bmod2,\qquad
s_k=\sum_{t=0}^{k-1}\epsilon_t.
\]

The one-step identity is

\[
2x_{t+1}=3^{\epsilon_t}x_t+\epsilon_t.
\]

Iterating gives

\[
\boxed{\;
2^k x_k
=
3^{s_k}n+C_k,
\;} \tag{4}
\]

where

\[
\boxed{\;
C_k=
\sum_{t=0}^{k-1}
\epsilon_t\,2^t\,3^{\,s_k-s_{t+1}}.
\;} \tag{5}
\]

Equation (5) is exactly the sum of the \(D_1\)-charges in (3), after indexing the control staircase by Collatz time.

For example, for \(n=75\), the first seven parities are

\[
(1,1,0,1,0,0,0),
\]

so \(s_7=3\), \(x_7=16\), and

\[
C_7=3^2+2\cdot3+2^3=9+6+8=23.
\]

Consequently

\[
2^7\cdot16=3^3\cdot75+23=2048.
\]

The tiling therefore encodes the complete affine arithmetic of the orbit, not merely its parity pattern.

---

## 4. The unrestricted periodicity claim is false

There is a particularly simple finite-support boundary for the six arithmetic tiles alone:

- all vertical boundary digits are \(0\);
- the horizontal boundary consists of one \(1\), followed by zeroes.

The resulting columns encode, in base \(3\),

\[
1,2,4,8,16,\ldots,2^j,\ldots
\]

The finite square assemblies with this property are explicitly described in Cook–Stérin–Woods. Because the boundary seeds are nested and the tile rule is deterministic, the squares have a compatible infinite-quadrant limit. Its boundary has only one nonzero digit. citeturn197406view2turn392583view0

This limiting tiling is not eventually translation-periodic in the iteration direction.

Indeed, suppose a translation by \((p,q)\), with \(p>0\), eventually preserved the tiling. Comparing sufficiently distant columns would imply that the ternary expansion of \(2^{j+p}\) agrees, after a vertical shift by \(q\), with that of \(2^j\), apart from a bounded number of low ternary digits. Hence

\[
2^{j+p}-3^q2^j
\]

would remain bounded as \(j\to\infty\). But

\[
2^{j+p}-3^q2^j
=
2^j(2^p-3^q).
\]

It can remain bounded only if

\[
2^p=3^q,
\]

which is impossible for nonzero integers \(p,q\). A purely vertical period is also impossible because every nonzero column has a finite, nonperiodic ternary support.

Therefore:

\[
\boxed{\text{Finite-support boundary does not imply periodicity for these Wang tiles.}}
\]

This tiling represents base conversion and repeated multiplication by \(2\), not a Collatz orbit. It refutes the unrestricted rigidity lemma but is not a Collatz counterexample.

---

## 5. Restricting to Collatz-admissible tilings

For \(n\in\mathbb N\), let \(\mathcal A(n)\) be the direct limit of the northeast-seeded square assemblies whose:

- north boundary is the binary expansion of \(n\), least significant bit first, padded by zeroes;
- east boundary is the fixed control color \(\sigma\).

Because the eight-tile system is northeast-deterministic, these finite assemblies are compatible. The \(m\times m\) assembly computes \(T^m(n)\) on its western boundary in ternary. citeturn197406view1turn392583view0

A parity block of length \(p\), containing \(r\) odd steps, moves the control staircase by the geometric vector

\[
p\,\mathrm{West}+r\,\mathrm{South}.
\]

This is the translation vector used in the cyclic version of the Collatz spacetime construction. citeturn914720view3

### Proposition: orbit periodicity equals time-periodicity

For a positive integer \(n\), the following are equivalent:

\[
T^{K+p}(n)=T^K(n)
\]

for some \(K\geq0,p\geq1\), and

\[
\mathcal A(n)
\]

is eventually periodic under the corresponding time-translation vector.

**Proof.**

If \(T^{K+p}(n)=T^K(n)\), determinism implies that all later iterates, parity decisions, carries and tiles repeat with period \(p\). Hence the spacetime beyond time \(K\) repeats.

Conversely, if two complete time cuts in the tiling agree, then the binary or ternary integers decoded on those cuts agree. Therefore the corresponding Collatz iterates are equal. ∎

So the desired theorem

> every Collatz-admissible finite-boundary tiling becomes time-periodic

is exactly the assertion that every positive Collatz orbit eventually enters some cycle.

That is still weaker than the full Collatz conjecture: it would not exclude a nontrivial positive cycle.

### Periodic words and rational \(2\)-adic cycles

Let \(u=(u_0,\ldots,u_{\ell-1})\) be a parity word with \(r\) ones, and let

\[
C_u=\sum_{t=0}^{\ell-1}
u_t2^t3^{\,r-s_{t+1}}.
\]

A cycle supported by the repeated word \(u^\infty\) must satisfy

\[
2^\ell z=3^r z+C_u,
\]

so

\[
\boxed{\;
z_u=\frac{C_u}{2^\ell-3^r}.
\;} \tag{6}
\]

The denominator is odd, so this always defines a rational \(2\)-adic integer. Thus **every periodic parity word already gives a periodic rational \(2\)-adic tiling**. The difficult question is whether \(z_u\) is a positive ordinary integer. The cyclic Collatz spacetime construction makes precisely this distinction through the appearance of an all-zero finite-support cut. citeturn914720view2turn914720view3

For \(u=(1,0)\),

\[
C_u=1,\qquad 2^2-3=1,
\]

and \(z_u=1\), giving the trivial \(1\leftrightarrow2\) cycle.

Therefore the full conjecture requires both:

\[
\begin{aligned}
&\text{Aperiodic exclusion: every finite-support orbit tiling eventually cycles;}\\
&\text{Cycle rigidity: the only positive finite-support periodic tiling is }1\leftrightarrow2.
\end{aligned}
\]

Their conjunction is precisely Collatz.

---

## 6. Every finite staircase is realizable

Let

\[
\epsilon=(\epsilon_0,\ldots,\epsilon_{k-1})\in\{0,1\}^k
\]

be arbitrary. Define \(s_k\) and \(C_k\) from this word as in (5), without yet assuming that it comes from an orbit.

For an integer to realize this word, equation (4) requires

\[
3^{s_k}n+C_k\equiv0\pmod{2^k}.
\]

Since \(3^{s_k}\) is invertible modulo \(2^k\), there is exactly one solution class

\[
\boxed{\;
n\equiv-3^{-s_k}C_k\pmod{2^k}.
\;} \tag{7}
\]

Choosing a positive representative gives a genuine positive integer whose first \(k\) Collatz parities are exactly \(\epsilon\). Compatibility for every prefix follows by reducing (7) modulo the corresponding lower power of \(2\).

Hence:

\[
\boxed{\text{Every finite binary control staircase occurs in a positive-integer Collatz tiling.}}
\]

This standard parity-vector bijection is also explicit in the Collatz CQCA analysis: all finite parity vectors are feasible, with exactly one realizing residue class modulo \(2^k\). citeturn914720view3

This has an important consequence. No finite forbidden patch can certify that a parity staircase is the beginning of an impossible infinite orbit. Every finite initial patch is arithmetically legitimate.

---

## 7. Compactness loses finite support

Let \(\mathbb Z_2\) denote the \(2\)-adic integers. For an infinite parity sequence

\[
\epsilon=(\epsilon_0,\epsilon_1,\ldots),
\]

the compatible congruences (7) converge \(2\)-adically to

\[
\boxed{\;
n_\epsilon
=
-\sum_{t=0}^{\infty}
\epsilon_t2^t3^{-s_{t+1}}
\in\mathbb Z_2.
\;} \tag{8}
\]

The map

\[
Q:\mathbb Z_2\longrightarrow\{0,1\}^{\mathbb N},
\qquad
Q(z)_t=T^t(z)\bmod2,
\]

is bijective, and satisfies

\[
Q(Tz)=\operatorname{shift}(Q(z)).
\]

Thus the \(2\)-adic Collatz system is conjugate to the full one-sided binary shift. Arbitrary aperiodic parity sequences consequently generate valid aperiodic \(2\)-adic Collatz tilings. citeturn914720view3

Ordinary positive integers are dense in \(\mathbb Z_2\). More concretely, for every \(z\in\mathbb Z_2\) and every \(m\), choose a positive integer

\[
n_m\equiv z\pmod{2^m}.
\]

Then \(n_m\) and \(z\) have the same first \(m\) parity decisions, and their spacetime tilings agree on every fixed finite window once \(m\) is large enough. Therefore

\[
\boxed{\;
\overline{\{\mathcal A(n):n\in\mathbb N_{>0}\}}
=
\{\mathcal A(z):z\in\mathbb Z_2\}.
\;} \tag{9}
\]

This is a decisive obstruction to a standard tiling compactness proof:

- finite-support boundaries are not a closed condition;
- limits of finite-support tilings may have infinite \(2\)-adic boundaries;
- such limits may be completely aperiodic, even if every approximating positive-integer orbit were eventually periodic.

Adding finitely many extra tile colors does not repair this by itself. If every positive-integer tiling admitted a lift to a finite local certificate layer, compactness would supply lifts to its \(2\)-adic limit points as well. A successful proof must use the eventual-zero binary tail as a genuinely global hypothesis.

---

## 8. The arithmetic layer has a confluent normal form

The six arithmetic tiles can be interpreted as local commutation relations between binary and ternary digit-appending maps.

Define

\[
B_i(x)=2x+i,\qquad i\in\{0,1\},
\]

and

\[
A_j(x)=3x+j,\qquad j\in\{0,1,2\}.
\]

For a tile \((N,E,W,S)\), equation (1) gives

\[
A_E\!\circ B_N(x)
=
6x+3N+E
=
6x+2W+S
=
B_S\!\circ A_W(x).
\]

Thus every tile is the rewriting relation

\[
\boxed{\;
A_EB_N\longleftrightarrow B_SA_W.
\;} \tag{10}
\]

Orient the relation so that every \(A\)-letter is moved past every \(B\)-letter. The number of inverted \(A,B\) pairs strictly decreases, so rewriting terminates.

A word containing \(r\) binary append maps and \(s\) ternary append maps represents an affine function

\[
x\longmapsto2^r3^s x+c,
\qquad
0\leq c<2^r3^s.
\]

For any fixed ordering of the bases, mixed-radix expansion gives a unique digit word for \(c\). Therefore the sorted normal form is unique, and the rewriting system is confluent.

Consequently, every finite pure arithmetic tiling is exactly a certificate that two mixed-radix expressions represent the same affine map. There is no hidden finite-patch inconsistency analogous to the frustration used by strongly aperiodic Wang tile sets. All difficulty lies in the infinite control path and the finite-support boundary condition.

---

## 9. No additive local Lyapunov height exists

A natural attempt is to assign potentials \(v_0,v_1\) to binary edge colors and \(h_0,h_1,h_2\) to ternary edge colors, and require

\[
v_N+h_E\geq h_W+v_S \tag{11}
\]

on every arithmetic tile.

Suppose these potentials take values in any ordered abelian group. Set

\[
d=v_1-v_0.
\]

From tile \(1=(0,1,0,1)\),

\[
h_1-h_0\geq d.
\]

From tile \(3=(1,0,1,1)\),

\[
h_0\geq h_1.
\]

Hence \(d\leq0\).

From tile \(2=(0,2,1,0)\),

\[
h_2\geq h_1.
\]

From tile \(4=(1,1,2,0)\),

\[
d\geq h_2-h_1.
\]

Hence \(d\geq0\). Therefore

\[
d=0,\qquad h_0=h_1=h_2.
\]

Thus also \(v_0=v_1\).

We have proved:

\[
\boxed{\text{Every one-sided additive edge potential on the six tiles is trivial.}} \tag{12}
\]

Reversing all inequalities gives the same conclusion. In particular, there is no translation-invariant local height whose curl has one sign and which could force finite-boundary stabilization.

Indeed, even the exact linear conservation law is unique: if

\[
\alpha N+\beta E+\gamma W+\delta S=0
\]

on all six tiles, direct substitution gives

\[
(\alpha,\beta,\gamma,\delta)
=
\lambda(3,1,-2,-1).
\]

So equation (1) spans the entire space of linear tilewise conservation laws.

---

## 10. Perturbing the \(2\)-\(3\) flux also fails

Another natural idea is to deform the exact equality \(3N+E=2W+S\). For \(a,b>1\), define

\[
\Delta_{a,b}=bN+E-aW-S.
\]

On tiles \(0,\ldots,5\), the six values are

\[
0,\quad
0,\quad
2-a,\quad
b-a-1,\quad
b+1-2a,\quad
b+1-2a.
\]

Therefore

\[
\Delta_{a,b}\geq0\quad\text{on all tiles}
\]

holds exactly when

\[
a\leq2,\qquad b\geq a+1,
\]

and

\[
\Delta_{a,b}\leq0\quad\text{on all tiles}
\]

holds exactly when

\[
a\geq2,\qquad b\leq a+1.
\]

To preserve the critical binary–ternary scaling, one must keep

\[
\frac{\log b}{\log a}=\frac{\log3}{\log2}.
\]

Write

\[
p=\log_2 3,\qquad b=a^p.
\]

The function

\[
f(a)=a^p-a-1
\]

is strictly increasing for \(a\geq1\), because

\[
f'(a)=pa^{p-1}-1>0,
\]

and \(f(2)=0\). Hence

\[
a<2\implies a^p<a+1,
\]

while

\[
a>2\implies a^p>a+1.
\]

Both one-sided sign conditions consequently fail away from \(a=2\). At \(a=2,b=3\), every residual is exactly zero.

Thus:

\[
\boxed{\text{There is no strict base-compatible exponential Stokes inequality.}} \tag{13}
\]

The exact \(2\)-\(3\) conservation law cannot be perturbed into a Lyapunov inequality at the critical Collatz slope.

---

## 11. The precise missing rigidity theorem

Equation (8) turns the entire tiling problem into one explicit statement.

For every infinite binary word \(\epsilon\), define

\[
s_t=\epsilon_0+\cdots+\epsilon_{t-1}
\]

and

\[
\Psi(\epsilon)
=
-\sum_{t=0}^{\infty}
\epsilon_t2^t3^{-s_{t+1}}
\in\mathbb Z_2.
\]

The north boundary of the associated tiling has finite binary support exactly when

\[
\Psi(\epsilon)\in\mathbb N.
\]

The Collatz conjecture is therefore equivalent to

\[
\boxed{
\Psi(\epsilon)\in\mathbb N_{>0}
\quad\Longrightarrow\quad
\epsilon\text{ is eventually }(1,0,1,0,\ldots).
} \tag{FBR}
\]

Indeed:

- given \(n>0\), its parity sequence \(\epsilon=Q(n)\) satisfies \(\Psi(\epsilon)=n\);
- eventual parity \((1,0)^\infty\) means that the orbit has reached the unique \(2\)-cycle \(1\leftrightarrow2\);
- conversely, reaching \(1\) produces that eventual parity sequence.

So \((\mathrm{FBR})\) is the exact finite-boundary rigidity theorem required by the proposed approach.

None of the preceding tiling arguments proves \((\mathrm{FBR})\). In particular:

- unrestricted finite-boundary periodicity is disproved by the powers-of-two tiling;
- every finite parity staircase is realizable;
- ordinary-integer tilings are dense among all \(2\)-adic tilings;
- every periodic parity word already gives a periodic rational \(2\)-adic tiling;
- additive edge heights are necessarily trivial;
- the exact \(2\)-\(3\) flux admits no strict critical deformation.

Therefore no valid full proof, and no aperiodic **Collatz-admissible** finite-boundary counterexample, emerges from this approach. The tiling construction itself is complete, but its remaining global statement is precisely Collatz in the form \((\mathrm{FBR})\). A successful continuation would need a genuinely nonlocal invariant that detects the eventual-zero binary boundary and is coercive against unbounded active width; it cannot be a finite forbidden-patch rule, a compactness argument, or an edge-separable height of the forms above.