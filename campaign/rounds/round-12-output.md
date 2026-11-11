model: GPT-5 Pro
round: 12 -- approach 7, Compute the K-theory of the Collatz orbit groupoid
front: proof
sent: 2026-08-13T18:30:26Z
worked: 29m 38s

---

# Result of the K-theoretic attack

The natural Collatz orbit groupoid can be constructed and its \(K\)-theory can be computed completely. The computation does exactly what the proposal hopes at the **infinite discrete level**:

\[
\boxed{\text{Collatz is true}\quad\Longleftrightarrow\quad
K_{0}\!\left(C^{*}(\mathcal G_T)\right)\cong \mathbb Z.}
\]

More precisely, every divergent orbit component contributes a new \(\mathbb Z\)-summand to \(K_{0}\), and every nontrivial periodic component contributes new \(\mathbb Z\)-summands to both \(K_{0}\) and \(K_{1}\).

However, the suggested final step—deducing this computation from finite modular graphs or from the inverse-tree boundary—does not work. In fact:

1. the natural modular orbit graph is connected for **every modulus \(M\)**, unconditionally;
2. the \(2\)-adic inverse-tree boundary gives the full binary-shift groupoid, whose algebra is \(\mathcal O_{2}\) and whose \(K\)-groups are both zero, unconditionally;
3. these same boundary \(K\)-groups occur for the \(5x+1\) map, which has an explicit nontrivial positive cycle.

Thus the program yields a rigorous \(K\)-theoretic reformulation and a precise no-go theorem for the proposed approximation argument, but not a proof of Collatz.

---

## 1. The discrete Collatz orbit groupoid

It is convenient to use the equivalent shortcut map

\[
T(n)=
\begin{cases}
n/2,&n\equiv0\pmod 2,\\[2mm]
(3n+1)/2,&n\equiv1\pmod 2.
\end{cases}
\]

The usual Collatz conjecture is equivalent to the assertion that every positive integer reaches the cycle

\[
1\longmapsto2\longmapsto1.
\]

Define

\[
\mathcal G_T
=
\left\{
(x,k-\ell,y):
x,y\in\mathbb N,\quad k,\ell\geq0,\quad
T^{k}(x)=T^{\ell}(y)
\right\}.
\]

The operations are

\[
(x,a,y)(y,b,z)=(x,a+b,z),
\qquad
(x,a,y)^{-1}=(y,-a,x).
\]

Giving \(\mathbb N\), and hence \(\mathcal G_T\), the discrete topology makes \(\mathcal G_T\) a countable Hausdorff étale groupoid. It is the discrete special case of a Deaconu–Renault groupoid. General computations for such groupoids also naturally produce kernel-and-cokernel descriptions in degrees \(0\) and \(1\). citeturn305300view2

Define orbit equivalence by

\[
x\sim y
\quad\Longleftrightarrow\quad
T^{k}(x)=T^{\ell}(y)
\quad\text{for some }k,\ell\geq0.
\]

Let

\[
\Omega=\mathbb N/{\sim}
\]

be the set of orbit components, and let \(\Omega_{\mathrm{per}}\subseteq\Omega\) be the components containing a periodic orbit.

---

## 2. Complete computation of \(K_{0}\) and \(K_{1}\)

### Theorem 1

There are natural isomorphisms

\[
\boxed{
K_{0}\!\left(C^{*}(\mathcal G_T)\right)
\cong
\bigoplus_{\omega\in\Omega}\mathbb Z
}
\]

and

\[
\boxed{
K_{1}\!\left(C^{*}(\mathcal G_T)\right)
\cong
\bigoplus_{\omega\in\Omega_{\mathrm{per}}}\mathbb Z.
}
\]

### Proof

Fix an orbit component \(\omega\in\Omega\). The reduction

\[
\mathcal G_T|_{\omega}
\]

is a transitive discrete groupoid.

Choose \(x_{\omega}\in\omega\). Its isotropy group is

\[
H_{\omega}
=
\left\{
a\in\mathbb Z:(x_{\omega},a,x_{\omega})\in\mathcal G_T
\right\}.
\]

There are two cases.

#### Aperiodic component

Suppose \(\omega\) contains no periodic orbit. If

\[
T^{k}(x_{\omega})=T^{\ell}(x_{\omega}),
\]

then \(k=\ell\); otherwise the forward orbit would be eventually periodic. Hence

\[
H_{\omega}=\{0\}.
\]

Choosing one groupoid arrow from \(x_{\omega}\) to every \(x\in\omega\) identifies the transitive groupoid with the pair groupoid

\[
\omega\times\omega.
\]

Consequently,

\[
C^{*}(\mathcal G_T|_{\omega})
\cong
\mathcal K(\ell^{2}(\omega)),
\]

and therefore

\[
K_{0}\cong\mathbb Z,\qquad K_{1}=0.
\]

#### Periodic component

Suppose \(\omega\) contains a periodic orbit of least period \(p\). Every point in \(\omega\) eventually enters that cycle, and

\[
H_{\omega}=p\mathbb Z\cong\mathbb Z.
\]

The same choice of connecting arrows gives

\[
\mathcal G_T|_{\omega}
\cong
\omega\times p\mathbb Z\times\omega.
\]

Hence

\[
C^{*}(\mathcal G_T|_{\omega})
\cong
\mathcal K(\ell^{2}(\omega))
\otimes C^{*}(\mathbb Z)
\cong
\mathcal K(\ell^{2}(\omega))\otimes C(\mathbb T).
\]

Thus

\[
K_{0}\cong\mathbb Z,\qquad K_{1}\cong\mathbb Z.
\]

The unit space is discrete, so the orbit components are open invariant subsets and

\[
C^{*}(\mathcal G_T)
\cong
\bigoplus_{\omega\in\Omega}^{c_{0}}
C^{*}(\mathcal G_T|_{\omega}).
\]

Taking \(K\)-theory proves the formulas. ∎

---

## 3. The concrete kernel-and-cokernel presentation

Let

\[
F=\bigoplus_{n\geq1}\mathbb Z e_n
\]

and define

\[
\partial:F\longrightarrow F,
\qquad
\partial e_n=e_n-e_{T(n)}.
\]

Equivalently, \(\partial=I-A^{t}\), where \(A\) is the adjacency matrix of the directed graph with one edge

\[
n\longrightarrow T(n)
\]

from every vertex.

Then

\[
K_{0}\!\left(C^{*}(\mathcal G_T)\right)
\cong\operatorname{coker}\partial,
\qquad
K_{1}\!\left(C^{*}(\mathcal G_T)\right)
\cong\ker\partial.
\]

These groups can be read directly.

### Cokernel

The relations in the cokernel are

\[
[e_n]=[e_{T(n)}].
\]

Thus all vertices in one orbit component represent the same class. There are no relations between distinct components. Explicitly, the map

\[
F\longrightarrow\bigoplus_{\omega\in\Omega}\mathbb Z u_{\omega},
\qquad
e_n\longmapsto u_{[n]},
\]

has kernel precisely \(\operatorname{im}\partial\). Therefore

\[
\operatorname{coker}\partial
\cong
\bigoplus_{\omega\in\Omega}\mathbb Z u_\omega.
\]

### Kernel

An element of \(\ker\partial\) is a finitely supported integral circulation on the functional graph. A finite circulation decomposes into directed cycles. Since a functional graph has at most one directed cycle in each component,

\[
\ker\partial
=
\bigoplus_{C}
\mathbb Z
\left(\sum_{v\in C}e_v\right),
\]

where \(C\) ranges over directed cycles.

In particular:

- a divergent component contributes one generator to \(K_{0}\) and nothing to \(K_{1}\);
- a periodic component contributes one generator to both \(K_{0}\) and \(K_{1}\).

---

## 4. Exact equivalence with Collatz

Let \(\omega_{0}\) denote the component containing \(1\) and \(2\).

### Corollary 2

The following are equivalent:

\[
\begin{aligned}
&\text{every positive integer reaches }1;\\
&\Omega=\{\omega_{0}\};\\
&K_{0}\!\left(C^{*}(\mathcal G_T)\right)\cong\mathbb Z;\\
&K_{0}\!\left(C^{*}(\mathcal G_T)\right)/
   \mathbb Z[p_{1}]=0.
\end{aligned}
\]

### Proof

If \(\Omega=\{\omega_{0}\}\), then for every \(n\) there are \(k,\ell\) such that

\[
T^{k}(n)=T^{\ell}(1)\in\{1,2\}.
\]

Hence the orbit of \(n\) reaches \(1\).

Conversely, if every orbit reaches \(1\), all vertices belong to \(\omega_{0}\).

The \(K_{0}\) equivalences follow from Theorem 1. ∎

Thus the proposed obstruction really exists:

\[
\widetilde K_{0}
:=
K_{0}\!\left(C^{*}(\mathcal G_T)\right)/
\mathbb Z[p_{1}]
\cong
\bigoplus_{\omega\neq\omega_{0}}\mathbb Z.
\]

A counterexample component gives a nonzero class in \(\widetilde K_{0}\).

However, computing that this group vanishes is exactly equivalent to proving that there is only one orbit component. No information has yet been gained unless \(K_{0}\) can be computed by an independent approximation.

---

# 5. The inverse-tree boundary loses the arithmetic information

Extend \(T\) to the \(2\)-adic integers:

\[
T:\mathbb Z_{2}\longrightarrow\mathbb Z_{2}.
\]

Each \(y\in\mathbb Z_{2}\) has exactly two inverse images,

\[
g_{0}(y)=2y,
\qquad
g_{1}(y)=\frac{2y-1}{3}.
\]

The second expression is always defined in \(\mathbb Z_{2}\), because \(3\) is a \(2\)-adic unit. Thus the completed inverse tree is the full binary tree.

For \(x\in\mathbb Z_{2}\), define its parity sequence

\[
Q(x)=\bigl(x\bmod2,T(x)\bmod2,T^{2}(x)\bmod2,\ldots\bigr).
\]

The parity map is a homeomorphism

\[
Q:\mathbb Z_{2}\longrightarrow\{0,1\}^{\mathbb N}
\]

and satisfies

\[
Q\circ T=\sigma\circ Q,
\]

where \(\sigma\) is the one-sided binary shift. In particular, every infinite binary sequence is the parity sequence of exactly one \(2\)-adic integer. citeturn305300view1turn980539view4

Consequently, the Deaconu–Renault groupoid of the \(2\)-adic Collatz map is the full two-shift groupoid, whose \(C^{*}\)-algebra is

\[
\mathcal O_{2}.
\]

For the one-vertex graph with two loops, the graph \(K\)-theory matrix is

\[
I-A^{t}=[1]-[2]=[-1].
\]

It is invertible over \(\mathbb Z\), so

\[
\boxed{
K_{0}(\mathcal O_{2})=0,
\qquad
K_{1}(\mathcal O_{2})=0.
}
\]

This computation holds independently of what positive integer orbits do.

The reason is precise: for an ordinary integer \(y\), the odd inverse branch

\[
\frac{2y-1}{3}
\]

is an integer only when \(y\equiv2\pmod3\). Passing to \(\mathbb Z_{2}\) makes this branch available for every \(y\), erasing the ordinary divisibility-by-\(3\) condition.

---

## 6. A concrete counterexample to any boundary-\(K\)-theory implication

For any odd \(q\), consider

\[
T_q(n)=
\begin{cases}
n/2,&n\text{ even},\\
(qn+1)/2,&n\text{ odd}.
\end{cases}
\]

Exactly the same parity-prefix argument shows that \(T_q\) on \(\mathbb Z_{2}\) is conjugate to the full binary shift. Hence its boundary groupoid algebra is also \(\mathcal O_{2}\), with

\[
K_{0}=K_{1}=0.
\]

But for \(q=5\), there are at least two distinct positive cycles:

\[
1\to3\to8\to4\to2\to1
\]

and

\[
13\to33\to83\to208\to104\to52\to26\to13.
\]

Therefore the implication

\[
K_{*}(\text{inverse-tree boundary})=K_{*}(\mathcal O_{2})
\quad\Longrightarrow\quad
\text{unique positive orbit component}
\]

is false even within the \(qn+1\) family.

This same distinction appears in Mori’s operator-algebraic formulation: the concrete isometries generate an abstract algebra isomorphic to \(\mathcal O_{2}\) unconditionally, while cyclicity or irreducibility of the particular representation carries the Collatz information. The abstract algebra—and hence its ordinary \(K\)-theory—does not. citeturn980539view2

---

# 7. Finite modular graphs are always connected

There is an even stronger obstruction to the proposed modular approximation.

For \(M\geq1\), define the undirected modular Collatz graph \(\Gamma_M\) by

\[
\Gamma_M^{0}=\mathbb Z/M\mathbb Z,
\]

and put an edge between

\[
\overline n
\quad\text{and}\quad
\overline{T(n)}
\]

for every positive integer \(n\). This is the natural finite graph obtained after adjoining forward and inverse Collatz edges and reducing vertices modulo \(M\).

### Theorem 3: Modular collapse

For every \(M\geq1\),

\[
\boxed{\Gamma_M\text{ is connected}.}
\]

### Proof

We first use a lifting observation. If \(d\mid M\), reduction gives a map

\[
\pi:\Gamma_M\longrightarrow\Gamma_d.
\]

Every edge downstairs is the image of an edge upstairs. Therefore, if \(\Gamma_d\) is connected and every fiber of \(\pi\) lies in one connected component of \(\Gamma_M\), then \(\Gamma_M\) is connected.

We remove factors of \(2\) and \(3\).

### Step 1: removing a factor of \(2\)

Suppose \(M=2d\). The two elements in a fiber of

\[
\mathbb Z/M\mathbb Z\longrightarrow\mathbb Z/d\mathbb Z
\]

are \(x\) and \(x+d\).

Choose a positive integer \(y\equiv x\pmod M\). The two even integers

\[
2y,\qquad 2y+M
\]

are congruent modulo \(M\), while

\[
T(2y)=y,
\qquad
T(2y+M)=y+\frac M2=y+d.
\]

Thus \(x\) and \(x+d\) have a common neighbor in \(\Gamma_M\). Every fiber modulo \(d\) is connected.

### Step 2: removing a factor of \(3\)

Suppose \(M=3d\) is odd.

For every residue \(x\pmod M\), choose an odd positive integer \(n\equiv x\pmod M\). Then

\[
x
\sim
\frac{3x+1}{2}
\sim
3x+1
\]

in \(\Gamma_M\), where the second edge comes from halving the even number \(3n+1\).

The three elements in a fiber modulo \(d\) are

\[
x,\qquad x+d,\qquad x+2d.
\]

But

\[
3(x+jd)+1
=
3x+jM+1
\equiv3x+1\pmod M.
\]

Hence all three fiber elements connect to the same residue \(3x+1\). Every fiber modulo \(d\) is connected.

### Step 3: the case \(\gcd(M,6)=1\)

We have already shown

\[
x\sim3x+1.
\]

Since \(2\) is invertible modulo \(M\), choose \(u\) satisfying

\[
2u=x.
\]

The halving edge gives \(u\sim x\). Also

\[
u\sim3u+1
\]

and doubling gives

\[
3u+1
\sim
2(3u+1)
=
3x+2.
\]

Therefore

\[
x\sim3x+2.
\]

It follows that

\[
3x+1\sim3x+2.
\]

Since \(3\) is invertible modulo \(M\), every residue \(a\) can be written as

\[
a=3x+1.
\]

Thus

\[
a\sim a+1
\]

for every \(a\). Therefore \(\Gamma_M\) is connected.

Starting from the coprime-to-\(6\) case and successively restoring the removed factors of \(3\) and \(2\), the fiber argument proves connectivity for every \(M\). ∎

---

## 8. Consequence for modular \(K\)-theory

If one forms the finite equivalence-relation groupoid generated by \(\Gamma_M\), Theorem 3 says it is the full pair groupoid

\[
(\mathbb Z/M\mathbb Z)\times(\mathbb Z/M\mathbb Z).
\]

Therefore its algebra is

\[
M_M(\mathbb C),
\]

and

\[
K_{0}\cong\mathbb Z,\qquad K_{1}=0
\]

for every \(M\).

So the hoped-for stabilization

\[
K_{0}(\Gamma_M)\longrightarrow\mathbb Z
\]

occurs at every level without using Collatz. Every genuine orbit component is merged with every other component modulo every \(M\).

If one retains path lag and orientation instead, another problem occurs: \(T\) is not a map on \(\mathbb Z/M\mathbb Z\). For example, integers congruent modulo \(M\) can have different images modulo \(M\), because division by \(2\) requires one additional binary digit. Thus there is no canonical finite dynamical quotient

\[
(\mathbb N,T)\longrightarrow(\mathbb Z/M\mathbb Z,T_M)
\]

and hence no canonical system of groupoid \(C^{*}\)-homomorphisms inducing the proposed \(K\)-theory maps. Replacing the map by a multivalued relation introduces modular cycles that need not lift to integer cycles.

---

# 9. The canonical \(2\)-power approximants also have trivial \(K\)-theory

The exact symbolic approximants are the binary de Bruijn graphs.

Let \(D_r\) have as vertices all binary words of length \(r\), with edges

\[
b_0b_1\cdots b_{r-1}
\longrightarrow
b_1\cdots b_{r-1}c,
\qquad c\in\{0,1\}.
\]

Finite parity words are in bijection with residues modulo \(2^r\), so these are the genuine finite \(2\)-adic approximants.

Let \(A_r\) be the adjacency matrix of \(D_r\). There are rectangular incidence matrices \(R_r,S_r\) such that

\[
A_{r+1}=R_rS_r,
\qquad
A_r=S_rR_r.
\]

Sylvester’s determinant identity gives

\[
\det(I-A_{r+1})
=
\det(I-A_r).
\]

At level \(0\), \(A_0=[2]\), so

\[
\det(I-A_0)=-1.
\]

Therefore

\[
\det(I-A_r)=-1
\]

for every \(r\). The matrix \(I-A_r^{t}\) is unimodular, and hence

\[
\boxed{
K_{0}(C^{*}(D_r))=0,\qquad
K_{1}(C^{*}(D_r))=0
}
\]

at every finite level.

Their limit is \(\mathcal O_{2}\). Once again, stabilization is automatic and contains no information about positivity.

---

# 10. Why a divergent class can disappear at every finite stage

The basic telescoping identity is

\[
e_n-e_{T^{k}(n)}
=
\sum_{j=0}^{k-1}
\left(e_{T^{j}(n)}-e_{T^{j+1}(n)}\right)
\in\operatorname{im}\partial.
\]

Thus \(e_n\) is \(K_{0}\)-equivalent to every later point of its orbit.

There is an even more severe escape mechanism in the inverse direction. For every \(r\),

\[
T^{r}(2^{r}n)=n,
\]

so

\[
[e_n]=[e_{2^{r}n}].
\]

Every component therefore contains arbitrarily large vertices, including periodic components. Any finite height truncation that collapses all sufficiently large vertices into a common boundary class automatically merges **all** orbit components.

To prevent this, one would need a distinct boundary object for each component or forward end. But for a functional graph:

- each divergent component has one forward end;
- each periodic component has a cycle;
- determining whether two vertices determine the same forward end is exactly determining whether their forward orbits eventually meet.

Thus constructing the required faithful boundary already requires the orbit decomposition that Collatz asks us to prove.

There is also substantial unconditional inverse-tree topology inside the known component. For example, for every \(j\geq0\),

\[
y=2^{2j+1}
\]

has two positive predecessors,

\[
2y
\qquad\text{and}\qquad
\frac{2y-1}{3}
=
\frac{2^{2j+2}-1}{3}.
\]

Both lie in the component of \(1\). Hence the trivial component already contains infinitely many branching vertices and many inverse ends.

Recent work on \(C^{*}\)-algebras of undirected locally finite graphs makes this background problem explicit: their \(K\)-theory records genus, branching, ends, and dead ends; even a full binary tree has a countably infinite graph-valency contribution. These are not signatures of a Collatz counterexample. citeturn723462view0

---

# 11. Final status of the approach

The part that succeeds is exact:

\[
\boxed{
\widetilde K_{0}\!\left(C^{*}(\mathcal G_T)\right)
=
K_{0}\!\left(C^{*}(\mathcal G_T)\right)/
\mathbb Z[p_1]
\cong
\bigoplus_{\substack{\text{nontrivial}\\\text{orbit components}}}\mathbb Z.
}
\]

Furthermore,

\[
\boxed{
K_{1}\!\left(C^{*}(\mathcal G_T)\right)
\cong
\bigoplus_{\text{periodic components}}\mathbb Z.
}
\]

So:

- \(K_{1}\) detects nontrivial cycles;
- reduced \(K_{0}\) detects both cycles and divergent components;
- Collatz is equivalent to reduced \(K_{0}=0\).

But the proposed route for computing these groups fails:

\[
\begin{array}{c|c|c}
\text{model} & K\text{-theoretic outcome} & \text{problem}\\ \hline
\text{discrete orbit groupoid} &
K_0=\mathbb Z^{(\text{components})} &
\text{exactly equivalent to Collatz}\\
\text{\(2\)-adic inverse boundary} &
K_0=K_1=0 &
\text{forgets ordinary integrality}\\
\text{modular equivalence graphs} &
K_0=\mathbb Z,\ K_1=0 &
\text{connected for every }M\\
\text{parity/de Bruijn graphs} &
K_0=K_1=0 &
\text{full-shift data only}\\
\text{undirected end algebra} &
\text{large end contribution} &
\text{counts inverse ends already present}
\end{array}
\]

A viable revision would have to use **controlled or filtered \(K\)-theory**, retaining simultaneously:

\[
\text{orbit lag},\qquad
\text{ordinary \(3\)-divisibility},\qquad
\text{positivity},\qquad
\text{archimedean height}.
\]

The decisive missing theorem would be a component-separation or no-escape result asserting that every nonzero class in

\[
\widetilde K_{0}\!\left(C^{*}(\mathcal G_T)\right)
\]

survives in some finite controlled quotient. Pure residue quotients do not have this property: Theorem 3 shows that they annihilate every component distinction at every modulus.

Accordingly, ordinary \(K_{0}\), \(K_{1}\), and inverse-boundary index classes do not complete a proof of Collatz. The Collatz information lies in the arithmetic embedding of the positive integers—or, equivalently, in the concrete representation and its diagonal/ideal structure—not in the abstract boundary \(K\)-groups.