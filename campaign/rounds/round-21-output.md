model: GPT-5 Pro
round: 21 -- approach 16, A quantum-graph trace formula for cycles and escape
front: proof
sent: 2026-08-13T18:45:38Z
worked: 49m 35s

---

# Verdict

After carrying the construction through, it does **not** produce a valid full proof of the Collatz conjecture. It does produce:

1. an exact affine trace formula for positive Collatz cycles;
2. a sharp spectral annulus in which every hypothetical nontrivial cycle must appear;
3. a rigorous obstruction showing that ordinary quantum-graph resonances cannot distinguish a divergent trajectory from harmless convergent branches already present in the Collatz graph.

Thus the central danger in the proposal is real: once the spectral object is made arithmetically exact, it stores the original cycle and escape questions rather than forcing their resolution. Collatz remains open as of August 13, 2026; recent work still describes a pointwise orbit statement as the unresolved step. citeturn424254search2turn424254search6

What follows is the complete construction and the precise point where the hoped-for proof fails.

---

## 1. Affine holonomy of a valuation word

Use the accelerated odd Collatz map

\[
U(n)=\frac{3n+1}{2^{a(n)}},
\qquad
a(n)=v_2(3n+1),
\]

on positive odd integers.

For a formal branch exponent \(a\geq 1\), put

\[
U_a(x)=\frac{3x+1}{2^a}.
\]

Represent this affine map projectively by

\[
M_a=
\begin{pmatrix}
3&1\\
0&2^a
\end{pmatrix}.
\]

For a word

\[
w=(a_0,\ldots ,a_{j-1}),
\]

define

\[
A_k=\sum_{i=0}^{k-1}a_i,\qquad A=A_j,
\]

and

\[
C_w=\sum_{k=0}^{j-1}3^{\,j-1-k}2^{A_k}.
\]

Then direct matrix multiplication gives

\[
M_{a_{j-1}}\cdots M_{a_0}
=
\begin{pmatrix}
3^j&C_w\\
0&2^A
\end{pmatrix},
\]

and hence

\[
U_{a_{j-1}}\circ\cdots\circ U_{a_0}(x)
=
\frac{3^j x+C_w}{2^A}.
\]

The affine holonomy therefore remembers exactly the three quantities

\[
j,\qquad A,\qquad C_w.
\]

Its unique fixed point, provided \(2^A\ne 3^j\), is

\[
x_w=\frac{C_w}{2^A-3^j}.
\]

This is the familiar cycle equation, but here it arises as the fixed-point equation for the affine scattering holonomy.

---

## 2. Exact cycle-realizability theorem

### Theorem 1

Let \(w=(a_0,\ldots ,a_{j-1})\) with every \(a_i\geq1\), and put

\[
d_w=2^A-3^j.
\]

Then \(w\) is the valuation word of a positive odd Collatz cycle if and only if

\[
d_w>0
\qquad\text{and}\qquad
d_w\mid C_w.
\]

In that case the first element of the cycle is

\[
n=\frac{C_w}{d_w}.
\]

### Proof

Suppose first that \(n\) belongs to a cycle with valuation word \(w\). Iterating the affine identity gives

\[
2^A n=3^j n+C_w,
\]

so

\[
(2^A-3^j)n=C_w.
\]

Since \(n,C_w>0\), we have \(d_w>0\), and \(d_w\mid C_w\).

Conversely, suppose \(d_w>0\) and \(d_w\mid C_w\), and define

\[
n=\frac{C_w}{d_w}\in\mathbb N.
\]

For \(0\leq r\leq j\), let

\[
C_r=\sum_{k=0}^{r-1}3^{\,r-1-k}2^{A_k}
\]

and formally define

\[
x_r=\frac{3^r n+C_r}{2^{A_r}}.
\]

We first show that every \(x_r\) is an integer. We have

\[
C_w\equiv 3^{j-r}C_r\pmod{2^{A_r}}
\]

because all terms of \(C_w\) beginning at index \(r\) are divisible by \(2^{A_r}\). Also

\[
d_w=2^A-3^j\equiv -3^j\pmod{2^{A_r}}.
\]

Since \(d_wn=C_w\),

\[
-3^j n\equiv 3^{j-r}C_r\pmod{2^{A_r}}.
\]

As \(3\) is invertible modulo \(2^{A_r}\),

\[
3^r n+C_r\equiv0\pmod{2^{A_r}},
\]

so \(x_r\in\mathbb Z\).

Now cyclically rotate the word by \(r\) positions. Since \(x_r\) is fixed by the corresponding rotated affine composition, uniqueness of the fixed point gives

\[
x_r=\frac{C_{\sigma^r w}}{d_w}.
\]

Both \(C_{\sigma^r w}\) and \(d_w\) are odd, so \(x_r\) is odd.

Finally,

\[
3x_r+1=2^{a_r}x_{r+1}.
\]

Because \(x_{r+1}\) is odd,

\[
v_2(3x_r+1)=a_r.
\]

Thus the formal branches are the exact accelerated Collatz branches, all intermediate values are positive odd integers, and \(x_j=x_0=n\). ∎

This theorem is important because it removes a possible loophole: divisibility of the final affine fixed point automatically enforces all the intermediate exact valuations.

---

## 3. There are finitely many cycle words of each length

Suppose \(x_0,\ldots ,x_{j-1}\) form a positive odd cycle. Multiplying

\[
2^{a_i}x_{i+1}=3x_i+1
\]

over all \(i\), and using \(\prod x_{i+1}=\prod x_i\), gives

\[
2^A
=
\prod_{i=0}^{j-1}\left(3+\frac1{x_i}\right)
\leq 4^j.
\]

Consequently,

\[
A\leq2j.
\]

Therefore every length-\(j\) cycle word occurs among the finite set

\[
\mathcal W_j
=
\left\{
(a_0,\ldots ,a_{j-1}):
a_i\geq1,\ 
\sum_i a_i\leq2j
\right\}.
\]

Its cardinality is

\[
|\mathcal W_j|
=
\sum_{A=j}^{2j}\binom{A-1}{j-1}
=
\binom{2j}{j}.
\]

So the affine trace sums below are genuinely finite at every depth.

---

## 4. The exact affine-phase trace formula

The divisibility condition can be written as a finite character sum:

\[
\mathbf 1_{d\mid C}
=
\frac1d
\sum_{r=0}^{d-1}
\exp\!\left(\frac{2\pi i rC}{d}\right).
\]

Hence the number of fixed points of \(U^j\) is exactly

\[
N_j
=
\sum_{\substack{w\in\mathcal W_j\\ d_w>0}}
\frac1{d_w}
\sum_{r=0}^{d_w-1}
\exp\!\left(\frac{2\pi i rC_w}{d_w}\right).
\tag{4.1}
\]

A weighted version, using the cycle multiplier

\[
\lambda_w=\frac{3^j}{2^A},
\]

is

\[
F_j
=
\sum_{\substack{w\in\mathcal W_j\\ d_w>0}}
\frac{3^j}{2^A}
\frac1{d_w}
\sum_{r=0}^{d_w-1}
\exp\!\left(\frac{2\pi i rC_w}{d_w}\right).
\tag{4.2}
\]

Equation (4.2) is the exact version of the proposed “affine phase.” The holonomy supplies \(C_w\) and \(d_w\); Fourier orthogonality projects onto those holonomies whose fixed point is an ordinary integer.

The resulting dynamical determinant is formally

\[
D(z)
=
\exp\left(
-\sum_{j\geq1}\frac{F_j}{j}z^j
\right).
\tag{4.3}
\]

If \(\mathcal P\) denotes primitive positive odd cycles modulo cyclic rotation, with length \(\ell(p)\), total valuation \(A(p)\), and multiplier

\[
\lambda_p=\frac{3^{\ell(p)}}{2^{A(p)}},
\]

then the standard fixed-point-to-primitive-orbit calculation gives

\[
D(z)
=
\prod_{p\in\mathcal P}
\left(1-\lambda_p z^{\ell(p)}\right).
\tag{4.4}
\]

Indeed, a primitive cycle of length \(\ell\) contributes its \(\ell\) starting points whenever \(\ell\mid j\), and

\[
\begin{aligned}
\sum_{j\geq1}\frac{F_j}{j}z^j
&=
\sum_{p\in\mathcal P}
\sum_{m\geq1}
\frac{\lambda_p^m z^{m\ell(p)}}{m}\\
&=
-\sum_{p\in\mathcal P}
\log\left(1-\lambda_p z^{\ell(p)}\right).
\end{aligned}
\]

This is exactly the same structural phenomenon as the Roth–Kottos–Smilansky quantum-graph determinant: a secular determinant expands into an Euler product over primitive closed paths, and logarithmic differentiation yields the periodic-orbit trace formula. For finite quantum graphs this identity is exact, not semiclassical. citeturn346121view0

---

## 5. A sharp resonance annulus for every nontrivial cycle

The weighted determinant has a useful feature not present in the ordinary unweighted adjacency matrix.

For a cycle \(p=(x_0,\ldots ,x_{\ell-1})\),

\[
2^{A(p)}
=
3^\ell
\prod_{i=0}^{\ell-1}
\left(1+\frac1{3x_i}\right).
\]

Therefore

\[
\lambda_p
=
\frac{3^\ell}{2^{A(p)}}
=
\prod_{i=0}^{\ell-1}
\left(1+\frac1{3x_i}\right)^{-1}.
\tag{5.1}
\]

For the trivial fixed point \(x=1\),

\[
\lambda_{\mathrm{triv}}=\frac34,
\]

so its determinant factor is

\[
1-\frac34z,
\]

with zero at

\[
z=\frac43.
\]

For any nontrivial positive odd cycle, every \(x_i\geq3\). Hence

\[
\frac{9}{10}
\leq
\left(1+\frac1{3x_i}\right)^{-1}
<1.
\]

It follows that

\[
\frac{9}{10}
\leq
\lambda_p^{1/\ell(p)}
<1.
\]

The zeros of its factor

\[
1-\lambda_p z^{\ell(p)}
\]

therefore satisfy

\[
1<|z|
=
\lambda_p^{-1/\ell(p)}
\leq\frac{10}{9}.
\tag{5.2}
\]

### Cycle-annulus criterion

Every nontrivial positive Collatz cycle forces determinant zeros in the fixed annulus

\[
\boxed{1<|z|\leq\frac{10}{9}},
\]

whereas the trivial fixed point produces its zero at \(4/3\), outside that annulus.

This is the cleanest successful output of the proposed approach.

It turns cycle exclusion into the statement that, after dividing off the trivial factor,

\[
\frac{D(z)}{1-\frac34z}
\]

has no zeros in \(1<|z|\leq10/9\).

But this is a **criterion**, not yet a proof: nothing in general quantum-graph positivity implies that zero-free region.

---

## 6. A completely finite version

To avoid any analytic-continuation issue, fix \(R\) and let

\[
V_R=\{n\leq R:n\text{ odd}\}.
\]

Define the weighted truncated Collatz matrix \(B_R\) by

\[
B_Re_n=
\begin{cases}
\dfrac{3}{2^{a(n)}}e_{U(n)},&U(n)\leq R,\\[2mm]
0,&U(n)>R.
\end{cases}
\]

Because this is a finite functional digraph, every component consists of a directed cycle with incoming trees, or a tree ending at the boundary. Tree blocks are nilpotent. Consequently,

\[
\det(I-zB_R)
=
\prod_{\substack{p\text{ primitive cycle}\\p\subseteq V_R}}
\left(1-\lambda_p z^{\ell(p)}\right).
\tag{6.1}
\]

In particular,

\[
\det(I-zB_R)
=
\left(1-\frac34z\right)
\prod_{\substack{p\ne\{1\}\\p\subseteq V_R}}
\left(1-\lambda_p z^{\ell(p)}\right).
\tag{6.2}
\]

Therefore the aperiodic part of Collatz is exactly equivalent to

\[
\boxed{
\frac{\det(I-zB_R)}{1-\frac34z}
\ne0
\quad
\text{for every }R
\text{ and every }1<|z|\leq\frac{10}{9}.
}
\tag{6.3}
\]

The corresponding trace identity is

\[
-\frac{d}{dz}\log\det(I-zB_R)
=
\sum_{j\geq1}\operatorname{tr}(B_R^j)z^{j-1},
\]

where

\[
\operatorname{tr}(B_R^j)
=
\sum_{\substack{n\in V_R\\U^j(n)=n}}
\frac{3^j}{2^{A_j(n)}}.
\]

All terms are nonnegative.

This demonstrates why positivity does not solve the problem. Positivity says that a nontrivial cycle adds positive spectral mass; it supplies no reason that the extra mass must vanish. Closely related unweighted finite-matrix formulations already characterize nontrivial-cycle exclusion by trace vanishing or nilpotency. citeturn921605view0

---

## 7. Why a branch-space quantum graph overcounts

Suppose instead of putting the positive integers into the vertex set, we use a small symbolic graph with one edge for each exponent \(a\).

Then every word \(w\) is a closed symbolic path. Its affine map has fixed point

\[
x_w=\frac{C_w}{2^A-3^j}.
\]

Whenever \(d_w=2^A-3^j>0\), this fixed point passes the three most natural local tests automatically:

\[
x_w>0,
\]

\[
x_w\in\mathbb Z_2,
\]

and

\[
x_w\in\mathbb Z_3.
\]

The last two statements follow because

\[
d_w=2^A-3^j
\]

is odd and is not divisible by \(3\). Thus \(d_w\) is a unit in both \(\mathbb Z_2\) and \(\mathbb Z_3\).

For example, take

\[
w=(1,3).
\]

Then

\[
A=4,\qquad C_w=3+2=5,\qquad d_w=16-9=7,
\]

so

\[
x_w=\frac57.
\]

It is positive, \(2\)-adically integral, and \(3\)-adically integral, and it has the periodic affine orbit

\[
\frac57\longmapsto\frac{11}{7}\longmapsto\frac57.
\]

But it is not an integer Collatz cycle.

The actual obstruction is at the varying primes dividing \(d_w\), here \(7\). In general,

\[
x_w\in\mathbb Z
\quad\Longleftrightarrow\quad
v_p(C_w)\geq v_p(d_w)
\ \text{for every prime }p.
\]

Thus a fixed real/\(2\)-adic/\(3\)-adic trace formula accepts essentially every positive-drift word. To obtain the correct cycle set, one must insert the all-prime integrality projector

\[
\frac1{d_w}
\sum_{r\bmod d_w}
e^{2\pi i rC_w/d_w}.
\]

But \(d_w\) depends on the entire path. An edge-local quantum graph can evaluate this only by carrying enough internal state to reconstruct

\[
3^j,\quad 2^A,\quad C_w,
\]

which is precisely the original affine arithmetic.

This is the first tautology obstruction:

\[
\begin{array}{c}
\text{small symbolic graph}\\
\Downarrow\\
\text{many false closed paths}\\
\Downarrow\\
\text{must restore }d_w\mid C_w
\end{array}
\]

whereas

\[
\begin{array}{c}
\text{integer Collatz graph}\\
\Downarrow\\
\text{closed paths are genuine cycles}\\
\Downarrow\\
\text{spectral determinant merely counts them}.
\end{array}
\]

---

## 8. A genuine unitary quantum graph cannot realize Collatz propagation

There is a more basic obstruction.

For the shortcut map

\[
T(n)=
\begin{cases}
n/2,&n\text{ even},\\[1mm]
(3n+1)/2,&n\text{ odd},
\end{cases}
\]

we have

\[
T(3)=5,\qquad T(10)=5,\qquad T(5)=8.
\]

An exact deterministic quantum routing rule would have to send both orthogonal incoming channels

\[
3\longrightarrow5
\quad\text{and}\quad
10\longrightarrow5
\]

onto the same outgoing channel

\[
5\longrightarrow8.
\]

No unitary matrix can do this: unitary maps preserve inner products, while two orthogonal vectors cannot both be sent to scalar multiples of one vector.

Equivalently, if

\[
P_{m,n}=\mathbf1_{\{m=T(n)\}},
\]

then every column of \(P\) sums to \(1\), but a row sums to the number of preimages of \(m\), which can be \(2\). Hence \(P\) is not bistochastic.

For an ordinary closed quantum graph, the quantum evolution matrix is unitary, and taking absolute squares produces a bistochastic classical transition matrix. citeturn648822view1turn648822view3

One can restore unitarity only by:

- adding auxiliary channels that remember which predecessor was used;
- allowing information to leak into leads;
- or replacing unitary scattering by a nonunitary transfer operator.

The first option makes the channel space grow into the full space of histories. The second inserts spectral features unrelated to Collatz. The third abandons the self-adjoint quantum-graph positivity that was supposed to provide the rigidity.

Moreover, standard metric-graph edges support propagation in both directions. The choice of an initial orientation does not make the Schrödinger propagation one-way; each bond has two directed wave channels. citeturn392110view0 Consequently, turning inverse Collatz branches into ordinary bonds introduces reverse paths and immediate backtracking paths that are not Collatz trajectories.

---

## 9. Affine phases are gauge-trivial on a tree

Let a cycle-free graph have edge phases \(\omega_e\in U(1)\). Choose a root \(o\). For every vertex \(v\), define \(g_v\) as the product of the phases along the unique path from \(o\) to \(v\).

Conjugating by the diagonal unitary

\[
e_v\longmapsto g_v e_v
\]

removes every edge phase.

Thus:

\[
\boxed{\text{All scalar edge phases on a tree are gauge-trivial.}}
\]

The same statement holds for a nonabelian connection on a finite tree: choose vertex gauges recursively and every edge holonomy becomes the identity.

Only products around cycles survive gauge transformation.

Therefore an affine phase can carry gauge-invariant information about a Collatz **cycle**, but not about an acyclic escaping ray. On a ray, the phases can be removed.

This is the second tautology obstruction: the only gauge-invariant affine data are precisely the closed-path holonomies whose existence is already the cycle question.

---

## 10. The resonance-at-infinity proposal fails on the powers-of-two chain

The most serious problem concerns divergent trajectories.

Remove the trivial shortcut cycle \(\{1,2\}\), and define the transient forward operator \(Q\) on

\[
\ell^2(\mathbb N\setminus\{1,2\})
\]

by

\[
Qe_n=
\begin{cases}
e_{T(n)},&T(n)\notin\{1,2\},\\
0,&T(n)\in\{1,2\}.
\end{cases}
\tag{10.1}
\]

Every integer has at most two shortcut preimages, so \(Q\) is bounded.

Now consider

\[
4,8,16,32,\ldots .
\]

Put

\[
h_k=e_{2^{k+2}},\qquad k\geq0.
\]

Then

\[
Qh_0=0,\qquad Qh_k=h_{k-1}\quad(k\geq1).
\]

Thus \(Q\) contains the unilateral backward shift.

For every \(|\lambda|<1\),

\[
f_\lambda=\sum_{k=0}^{\infty}\lambda^k h_k
\]

belongs to \(\ell^2\), and

\[
Qf_\lambda=\lambda f_\lambda.
\]

Consequently,

\[
\boxed{\overline{\mathbb D}\subseteq\sigma(Q).}
\tag{10.2}
\]

This conclusion is unconditional. Every number \(2^{k+2}\) reaches the trivial cycle after finitely many steps, yet those entirely harmless finite trajectories already force spectrum all the way to the unit circle.

Adding unit-modulus phases does not help. A weighted chain

\[
Q_\theta h_k=e^{i\theta_k}h_{k-1}
\]

is diagonally unitarily equivalent to the ordinary backward shift.

A hypothetical divergent orbit would also generate a unilateral-shift-type channel, with essentially the same spectral set. Therefore:

\[
\boxed{
\text{Spectrum or resonances near }|z|=1
\text{ do not distinguish divergence from long convergent branches.}
}
\]

This is especially damaging to the proposed interpretation of “resonances near the unit circle.” Open quantum-graph scattering matrices are built from an internal resolvent of the form

\[
(I-U_{\mathrm{int}}(k))^{-1},
\]

so poles and large resolvent responses reflect trapping or long internal propagation. citeturn648822view2 But the Collatz graph already contains an infinite family of arbitrarily long, certainly terminating paths.

There is also a finite-dimensional version of the problem. The length-\(L\) powers-of-two chain is a nilpotent Jordan block. Its determinant is identically

\[
\det(I-zJ_L)=1,
\]

so its trace formula sees no periodic orbit at all, even though its resolvent becomes very large near the unit circle as \(L\) increases. Long finite survival is therefore pseudospectral rather than periodic-orbit spectral.

---

## 11. Local nilpotence is the actual escape statement

On the algebraic space \(c_{00}\) of finitely supported sequences,

\[
Q^k e_n=0
\]

exactly when the orbit of \(n\) has entered the trivial cycle by time \(k\).

Thus the full Collatz conjecture is equivalent to

\[
\boxed{
Q\text{ is locally nilpotent on }c_{00}.
}
\tag{11.1}
\]

“Locally nilpotent” means that every vector is killed by some power depending on that vector.

It is not equivalent to:

\[
Q^K=0\quad\text{for one uniform }K,
\]

nor to

\[
r(Q)=0,
\]

nor to a spectral gap at the unit circle.

The powers-of-two chain proves this sharply:

\[
Q\text{ is locally nilpotent on each }h_k,
\]

while

\[
\overline{\mathbb D}\subseteq\sigma(Q).
\]

Hilbert-space spectral theory takes a completion over all starting points and therefore replaces pointwise finite stopping by uniform/asymptotic information. That completion loses exactly the quantifier distinction central to Collatz:

\[
\forall n\ \exists k(n)
\qquad\text{versus}\qquad
\exists K\ \forall n.
\]

A trace formula is naturally suited to the second type of assertion, not the first.

---

## 12. Why spectral positivity cannot finish the proof

For the finite weighted matrix \(B_R\),

\[
\operatorname{tr}(B_R^j)
=
\left(\frac34\right)^j
+
\sum_{\substack{p\ne\{1\}\\\ell(p)\mid j}}
\ell(p)\lambda_p^{\,j/\ell(p)}.
\tag{12.1}
\]

Every hypothetical nontrivial cycle contributes a strictly positive term.

Therefore positivity gives the implication

\[
\text{nontrivial cycle}
\Longrightarrow
\operatorname{tr}(B_R^j)>
\left(\frac34\right)^j
\]

for appropriate \(j\).

But proving the reverse equality

\[
\operatorname{tr}(B_R^j)=
\left(\frac34\right)^j
\quad\text{for every }R,j
\tag{12.2}
\]

is exactly proving that no nontrivial cycle exists.

Likewise, proving

\[
\frac{\det(I-zB_R)}{1-\frac34z}
\ne0
\qquad
\left(1<|z|\leq\frac{10}{9}\right)
\tag{12.3}
\]

is exactly the cycle-exclusion problem.

There is no general positivity theorem that implies (12.2) or (12.3). Quantum graphs with one loop, ten loops, or arbitrarily complicated cycle structures all have legitimate positive spectral densities. The periodic-orbit terms explain their spectra; positivity does not eliminate them.

---

# Final assessment

The quantum-graph program yields a rigorous and fairly elegant **cycle detector**:

\[
\det(I-zB_R)
=
\left(1-\frac34z\right)
\prod_{p\ne\{1\}}
\left(1-\frac{3^{\ell(p)}}{2^{A(p)}}z^{\ell(p)}\right),
\]

and every hypothetical nontrivial positive cycle forces zeros in

\[
1<|z|\leq\frac{10}{9}.
\]

It also yields an exact affine character formula

\[
\mathbf1_{2^A-3^j\mid C_w}
=
\frac1{2^A-3^j}
\sum_{r\bmod(2^A-3^j)}
e^{2\pi i rC_w/(2^A-3^j)}.
\]

Those are substantive, exact reductions.

But the proposed proof does not close:

- On the integer graph, the trace formula simply enumerates the cycles already present.
- On a compressed word graph, the all-prime integrality projector is exactly the original Diophantine obstruction.
- Unitary quantum scattering cannot realize the noninjective Collatz map without extra memory or leakage.
- Affine phases are gauge-trivial on acyclic branches.
- Unit-circle spectrum is already forced by the convergent chain \(2^k\to2^{k-1}\to\cdots\to1\).
- Full convergence is local nilpotence, which ordinary global spectral data do not detect.

A genuinely new completion would need an arithmetic construction that simultaneously removes the universal inverse-tree shift and proves cancellation of the word-dependent modulus-\((2^A-3^j)\) character sums **without first knowing which integers lie in the basin of \(1\)**. That would be closer to an adelic transfer-operator or exact arithmetic-renormalization theorem than to a conventional quantum-graph trace formula.