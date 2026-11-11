model: GPT-5.6 Pro (Chat mode)
round: 38 -- approach 33, Sandpile stabilization
front: proof
sent: 2026-08-14T22:44Z
worked: 55m 49s

---
# Outcome

I worked the sandpile construction through in an exact form. It gives a genuinely useful reformulation, including an abelian carrier system, an exact odometer identity, and a critical-group formulation of possible cycles.

It does **not**, however, yield a completed Collatz proof. After all ordinary binary and ternary carries have been eliminated, the remaining stabilization assertion is

\[
\sum_{j<k}\bigl(v_2(3n_j+1)-\beta_j\bigr)
   =\lfloor \log_2 n_0\rfloor
\]

for some \(k\), where \(\beta_j\in\{1,2\}\) is the leading binary carry. This statement is exactly equivalent to the Collatz conjecture. I do not have a valid proof of it, and treating ordinary sandpile stabilization as though it implied this identity would be circular.

What follows is the complete derivation and the precise obstruction.

---

## 1. The exact carrier sandpile

Use the shortcut Collatz map

\[
T(n)=
\begin{cases}
n/2,&n\equiv0\pmod 2,\\[2mm]
(3n+1)/2,&n\equiv1\pmod 2.
\end{cases}
\]

Consider a finite ordered path whose sites have radix \(2\) or radix \(3\). A radix-\(2\) site carries a stable digit \(b\in\{0,1\}\), and a radix-\(3\) site carries a stable digit \(q\in\{0,1,2\}\). Starting from an implicit leading digit \(1\), the path represents the corresponding mixed-radix integer.

Write

\[
\mathtt f=0_2,\qquad \mathtt t=1_2,
\]

and write \(\mathtt0,\mathtt1,\mathtt2\) for the ternary digits.

### Internal firing

Whenever a binary site lies immediately to the left of a ternary site, fire the edge by exchanging their radices. The new digits are uniquely defined by

\[
3b+q=2q'+b',
\qquad q'\in\{0,1,2\},\quad b'\in\{0,1\}.
\]

This gives

\[
\begin{array}{lll}
\mathtt{f0}\longrightarrow\mathtt{0f},&
\mathtt{f1}\longrightarrow\mathtt{0t},&
\mathtt{f2}\longrightarrow\mathtt{1f},\\[1mm]
\mathtt{t0}\longrightarrow\mathtt{1t},&
\mathtt{t1}\longrightarrow\mathtt{2f},&
\mathtt{t2}\longrightarrow\mathtt{2t}.
\end{array}
\]

Each firing preserves the represented integer.

The swap is a canonical radix-conversion map. More generally, for radices \(p,q\), the relation

\[
qa+b=pc+d
\]

uniquely converts a \(p\)-digit followed by a \(q\)-digit into a \(q\)-digit followed by a \(p\)-digit. Consequently, different orders of adjacent radix swaps leading to the same final radix order give the same final digits: this is a Yang–Baxter-type consistency law following from uniqueness of mixed-radix expansion.

### Right-boundary firing

Let `/` denote the implicit leading \(1\), and let `.` mark the least-significant end. At the right boundary,

\[
\mathtt{f.}\longrightarrow\mathtt{.},
\qquad
\mathtt{t.}\longrightarrow\mathtt{2.}.
\]

Indeed, if the preceding prefix represents \(x\), then

\[
T(2x)=x,\qquad T(2x+1)=3x+2.
\]

Thus the first rule absorbs an even binary site, while the second reflects a terminal binary \(1\) as a left-moving ternary carrier.

### Left-boundary firing

When a ternary carrier reaches the leading boundary,

\[
\mathtt{/0}\longrightarrow\mathtt{/t},\qquad
\mathtt{/1}\longrightarrow\mathtt{/ff},\qquad
\mathtt{/2}\longrightarrow\mathtt{/ft}.
\]

These are simply

\[
3=(11)_2,\qquad 4=(100)_2,\qquad 5=(101)_2.
\]

The carrier is therefore absorbed at the left boundary and emits either one or two binary sites.

These are exactly the eleven mixed binary–ternary rewriting rules introduced by Yolcu, Aaronson, and Heule, who proved that termination of the resulting system is equivalent to Collatz convergence. citeturn287599view2turn287599view3

---

## 2. Why this system is abelian

There is a particularly strong local commutation property.

Every left side has length two. Its first character lies in

\[
\{\mathtt{/},\mathtt f,\mathtt t\},
\]

while its second character lies in

\[
\{\mathtt{.},\mathtt0,\mathtt1,\mathtt2\}.
\]

These sets are disjoint. Therefore two legal redexes can never overlap in one site. Distinct simultaneously legal firings act on disjoint substrings, and applying them in either order produces exactly the same word.

Hence the system has the strong diamond property

\[
x\longrightarrow y,\quad x\longrightarrow z
\quad\Longrightarrow\quad
y\longrightarrow w,\quad z\longrightarrow w
\]

whenever \(y\ne z\). This is the appropriate abelianity statement for the carrier system.

It is nevertheless important to distinguish it from a classical sandpile on a fixed finite graph:

* the sites are ordered;
* their radix labels are part of the state;
* the left boundary may create a new site;
* the path length is unbounded.

Thus it is an abelian local rewriting system, or a generalized carrier sandpile, rather than a fixed-Laplacian chip-firing game.

### Auxiliary firings always terminate

Call a binary-before-ternary pair an inversion. Let

\[
N_3=\text{number of ternary sites},
\]

and

\[
I=\#\{(i,j):i<j,\ r_i=2,\ r_j=3\}.
\]

An internal swap preserves \(N_3\) and reduces \(I\) by one. A left-boundary firing reduces \(N_3\) by one. Hence the auxiliary firings terminate by lexicographic descent of

\[
(N_3,I)\in\mathbb N^2.
\]

Consequently, an infinite firing sequence would have to contain infinitely many right-boundary firings.

### The only stable admissible state is \(1\)

Suppose a canonical word has a nonempty interior.

If it has no ternary sites, its final site is binary, so a right-boundary rule applies. If it has a ternary site, consider the leftmost one. It is either adjacent to `/`, in which case a left-boundary rule applies, or it is preceded by a binary site, in which case an internal swap applies.

Therefore the only stable canonical word is

\[
\mathtt{/.},
\]

representing \(1\).

Since auxiliary firings preserve the integer and every right-boundary firing applies \(T\), an infinite firing execution exists exactly when the corresponding Collatz trajectory never reaches \(1\). Thus abelianity proves order independence, but not the existence of a finite complete execution.

---

## 3. The exact sandpile odometer

It is most informative to group the firings between successive odd integers.

Let

\[
n_{j+1}=U(n_j)
       :=\frac{3n_j+1}{2^{a_j}},
\qquad
a_j=v_2(3n_j+1),
\]

where every \(n_j\) is odd. Define the binary path length

\[
\ell_j=\lfloor\log_2 n_j\rfloor.
\]

This is exactly the number of binary sites following the implicit leading \(1\).

Define the most-significant carry

\[
\beta_j
  =\lfloor\log_2(3n_j+1)\rfloor-\lfloor\log_2 n_j\rfloor.
\]

Because

\[
2^{\ell_j}\le n_j<2^{\ell_j+1},
\]

we have

\[
2^{\ell_j+1}<3n_j+1<2^{\ell_j+3},
\]

and hence

\[
\beta_j\in\{1,2\}.
\]

Arithmetic now gives the exact odometer relation

\[
\begin{aligned}
\ell_{j+1}
&=\left\lfloor
  \log_2\frac{3n_j+1}{2^{a_j}}
  \right\rfloor\\
&=\lfloor\log_2(3n_j+1)\rfloor-a_j\\
&=\ell_j+\beta_j-a_j.
\end{aligned}
\]

Equivalently, put

\[
g_j=\beta_j-1\in\{0,1\},
\qquad
d_j=a_j-1\in\mathbb N.
\]

Then

\[
\boxed{\ell_{j+1}=\ell_j+g_j-d_j.}
\]

This has a literal chip interpretation.

* Every odd avalanche necessarily replaces one right-moving binary site by one left-moving ternary carrier.
* When that carrier reaches the left boundary, it emits at least one binary site. That baseline one-for-one replacement does not change the population.
* If \(\beta_j=2\), it emits one additional **growth chip**.
* After the odd firing, the right boundary absorbs \(a_j-1\) additional zero sites. These are the **valuation-deficit chips**.

Thus the path length is a deterministic queue whose arrivals are \(g_j\) and whose services are \(d_j\).

After \(k\) odd avalanches,

\[
\boxed{
\ell_k
=
\ell_0+
\sum_{j=0}^{k-1}(\beta_j-1)
-
\sum_{j=0}^{k-1}(a_j-1).
}
\]

Since an odd positive integer has \(\ell=0\) exactly when it is \(1\), stabilization is equivalent to the following statement.

### Sandpile stabilization lemma

For every odd \(n_0>1\), there exists \(k\ge1\) such that

\[
\boxed{
\sum_{j=0}^{k-1}(a_j-1)
\ge
\ell_0+
\sum_{j=0}^{k-1}(\beta_j-1).
}
\tag{S}
\]

Because \(\ell_k\ge0\), equality necessarily holds at the first such \(k\). An equivalent form is

\[
\boxed{
\sum_{j=0}^{k-1}(a_j-\beta_j)=\ell_0.
}
\tag{S'}
\]

Condition (S) is not a consequence of ordinary sandpile stabilization. It is precisely the Collatz conjecture written as extinction of the binary-site queue.

---

## 4. The leading carry is almost a rotation

The left-boundary production is highly structured rather than arbitrary.

Write

\[
\theta_j=\log_2 n_j-\ell_j\in[0,1),
\qquad
\lambda=\log_2 3,
\]

and

\[
\varepsilon_j
=
\log_2\left(1+\frac1{3n_j}\right)>0.
\]

Then

\[
\log_2 n_{j+1}
=
\log_2 n_j+\lambda-a_j+\varepsilon_j.
\]

Subtracting the odometer relation gives

\[
\boxed{
\theta_{j+1}
=
\theta_j+\lambda-\beta_j+\varepsilon_j.
}
\]

Therefore

\[
\boxed{
\sum_{j=0}^{k-1}\beta_j
=
k\lambda+\theta_0-\theta_k
+\sum_{j=0}^{k-1}\varepsilon_j.
}
\]

In chip language, the cumulative number of sites emitted at the left boundary is an irrational-rotation count, up to a bounded phase discrepancy and the small affine corrections \(\varepsilon_j\).

Consequently,

\[
\sum_{j<k}g_j
=
k(\log_2 3-1)
+\theta_0-\theta_k
+\sum_{j<k}\varepsilon_j.
\]

The unresolved problem is therefore entirely on the right boundary: proving that the cumulative excess valuation

\[
\sum_{j<k}(a_j-1)
\]

eventually beats this deterministic arrival count by the initial queue length \(\ell_0\).

---

## 5. What least action does—and does not—give

For a genuine abelian network, the least-action principle says that a legal execution performs no more work than any finite complete execution, even when the comparison execution is illegal. Hence the existence of one finite complete execution would prove that every legal firing schedule terminates. citeturn960348view0turn960348view2

In the present carrier system, however, constructing such a complete execution means specifying enough right-boundary absorptions to remove

\[
\ell_0+\sum g_j
\]

sites. That is exactly condition (S). Least action gives order independence **after** a complete firing vector has been found; it does not produce that firing vector.

This distinction is the central gap in the proposed proof.

A finite irreducible abelian network has a powerful all-input criterion: it halts on all inputs precisely when the eigenvalues of its production matrix lie inside the unit disk. But the Collatz carrier has an unbounded ordered tape and can create new sites, so it is not a finite network to which that theorem applies. Countably infinite abelian networks can even simulate Turing machines, so abelianity alone does not imply decidable or automatic stabilization. citeturn287599view1

There is also no way to replace the tape by a fixed finite unary-input processor while retaining an ordinary output encoding of \(T(n)\): finite abelian processors compute weakly increasing functions of their input counts, whereas the Collatz shortcut map is not increasing. An ordered digit tape or an equivalent unbounded state is unavoidable. citeturn287599view4

---

## 6. No nonnegative additive sandpile energy can work

One might try to assign a positive weight to every chip or site so that every firing strictly decreases total energy. This entire class of proofs is impossible.

Allow the weight of a symbol to depend arbitrarily on its distance \(r\) from the right boundary. Write

\[
w_{\mathtt f}(r),\quad
w_{\mathtt t}(r),\quad
w_{\mathtt0}(r),\quad
w_{\mathtt1}(r),\quad
w_{\mathtt2}(r)\ge0.
\]

Suppose

\[
V(W)=\sum_{\text{sites }x}w_x(r_x)
\]

strictly decreases under every firing.

From the right-boundary rule

\[
\mathtt{t.}\longrightarrow\mathtt{2.}
\]

we obtain

\[
w_{\mathtt t}(0)>w_{\mathtt2}(0).
\]

Set

\[
\delta(r)=w_{\mathtt t}(r)-w_{\mathtt2}(r).
\]

The internal rule

\[
\mathtt{t2}\longrightarrow\mathtt{2t}
\]

at positions \(r+1,r\) requires

\[
w_{\mathtt t}(r+1)+w_{\mathtt2}(r)
>
w_{\mathtt2}(r+1)+w_{\mathtt t}(r),
\]

so

\[
\delta(r+1)>\delta(r).
\]

Hence \(\delta(r)>0\) for every \(r\).

But when a ternary \(2\) reaches the left boundary at distance \(m\), the rule

\[
\mathtt{/2}\longrightarrow\mathtt{/ft}
\]

requires

\[
w_{\mathtt2}(m)
>
w_{\mathtt f}(m+1)+w_{\mathtt t}(m)
\ge w_{\mathtt t}(m),
\]

which says

\[
\delta(m)<0.
\]

This is a contradiction.

Therefore:

\[
\boxed{\text{No nonnegative site-additive potential can decrease under every firing.}}
\]

The obstruction persists even with completely arbitrary position-dependent weights. Any successful stabilization proof must be nonlinear, block-based, or genuinely multiscale.

---

## 7. The critical all-ones glider

There is an exact family showing why no fixed local carry window can provide uniform contraction.

Let

\[
n_0=2^m-1.
\]

For \(0\le j\le m-1\), as long as the displayed iteration is defined,

\[
\boxed{
n_j=3^j2^{m-j}-1.
}
\]

Indeed, for \(j\le m-2\),

\[
3n_j+1
=
2\left(3^{j+1}2^{m-j-1}-1\right),
\]

and the factor in parentheses is odd. Hence

\[
a_j=1
\]

and the formula follows by induction.

Two important consequences follow.

### No bounded-horizon descent

For every fixed \(K\), choose \(m>K+1\). Then for \(1\le j\le K\),

\[
n_j=3^j2^{m-j}-1>2^m-1=n_0.
\]

Thus there is no universal bounded number of odd avalanches within which ordinary size must decrease.

In the carrier picture, the word consisting of a long block of binary \(1\)'s shadows the infinite all-ones configuration, which represents the \(2\)-adic fixed point \(-1\). The finite left boundary can remain invisible for arbitrarily long.

### Fixed binary and ternary windows both become blind

For fixed \(r,s\), whenever

\[
s\le j\le m-r,
\]

we have

\[
n_j+1=3^j2^{m-j}
\]

divisible by \(3^s2^r\). Hence

\[
\boxed{
n_j\equiv-1\pmod{2^r3^s}.
}
\]

A long central part of the trajectory therefore appears completely stationary to every fixed collection of binary and ternary residue windows.

This is a particularly sharp obstruction to a finite-state sandpile certificate: any fixed amount of low-end binary carry data and terminal ternary carry data admits an arbitrarily long critical glider. An effective proof has to record an **unbounded distance from the \(2\)-adic state \(-1\)**, or use some other genuinely global quantity.

---

## 8. What the sandpile critical group sees about cycles

The sandpile formulation gives a clean matrix for a putative odd cycle.

Suppose a cycle has odd values

\[
n_0,n_1,\ldots,n_{k-1}
\]

and valuations \(a_0,\ldots,a_{k-1}\), with indices taken modulo \(k\). Then

\[
2^{a_i}n_{i+1}-3n_i=1.
\]

Define the cyclic toppling matrix \(L_{\boldsymbol a}\) by

\[
(L_{\boldsymbol a})_{ii}=2^{a_{i-1}},
\qquad
(L_{\boldsymbol a})_{i,i-1}=-3
\]

with cyclic indices and all other entries zero. The cycle equations are

\[
L_{\boldsymbol a}
\begin{pmatrix}
n_0\\ \vdots\\ n_{k-1}
\end{pmatrix}
=
\begin{pmatrix}
1\\ \vdots\\1
\end{pmatrix}.
\]

Its determinant is

\[
\boxed{
\det L_{\boldsymbol a}=2^A-3^k,
\qquad
A=\sum_{i=0}^{k-1}a_i.
}
\]

Thus the familiar Collatz cycle denominator is exactly the determinant of a cyclic toppling matrix.

The matrix is a nonsingular \(M\)-matrix precisely when

\[
2^A>3^k.
\]

This condition is already necessary for a positive cycle. Sandpile theory therefore recovers the correct archimedean inequality, but a cycle exists only when

\[
\mathbf1\in L_{\boldsymbol a}\mathbb Z^k
\]

and the resulting integer solution is positive and has exactly the prescribed valuations. That lattice-integrality condition is the unresolved arithmetic part.

For the trivial cycle \(n=1\), \(k=1,a_0=2\), and

\[
L=[4-3]=[1].
\]

For a nontrivial valuation word, the critical group records the denominator \(2^A-3^k\), but it does not by itself prove that the source vector \(\mathbf1\) represents a nonzero class.

Likewise, on a divergent trajectory every finite prefix produces a perfectly stabilizable finite toppling system. The possible failure occurs only in the limit, through escape to newly created sites at infinity.

---

## 9. The exact missing theorem

The proposed sandpile proof would be complete if one could prove the following, without assuming any form of Collatz convergence.

> **Pointwise odometer theorem.**  
> For every odd \(n_0>1\), let
> \[
> n_{j+1}=\frac{3n_j+1}{2^{a_j}},
> \qquad
> a_j=v_2(3n_j+1),
> \]
> and
> \[
> \beta_j
> =
> \lfloor\log_2(3n_j+1)\rfloor
> -
> \lfloor\log_2 n_j\rfloor.
> \]
> Then for some \(k\),
> \[
> \sum_{j<k}(a_j-\beta_j)
> =
> \lfloor\log_2 n_0\rfloor.
> \]

The proof would then be immediate:

\[
\ell_k
=
\ell_0-\sum_{j<k}(a_j-\beta_j)=0,
\]

so \(n_k=1\).

Conversely, if \(n_k=1\), the same equation shows that the claimed odometer identity holds. Hence the pointwise odometer theorem and the Collatz conjecture are equivalent.

---

# Verdict

The sandpile approach succeeds in producing:

1. an exact mixed binary–ternary carrier network;
2. a strong local abelian/diamond property;
3. termination of every internal carry avalanche;
4. an exact growth-versus-deficit chip balance;
5. a cyclic toppling matrix with determinant \(2^A-3^k\);
6. rigorous obstructions to additive potentials, finite production matrices, bounded stopping horizons, and fixed residue-window certificates.

It does **not** presently prove that every admissible finite configuration reaches the absorbing state `/.`. That assertion is exactly condition (S), hence exactly Collatz.

The central unresolved object is a critical one-dimensional queue:

\[
\ell_{j+1}
=
\ell_j
+\underbrace{(\beta_j-1)}_{\text{one possible birth}}
-\underbrace{(a_j-1)}_{\text{valuation absorption}}.
\]

A genuine completion would need a nonlinear multiscale burning argument that matches every initial and newly created binary site to a later valuation absorption while remaining sensitive to arbitrarily long approximations of the \(2\)-adic all-ones state. No such matching or burning certificate has been established here, so presenting this reduction as a full proof would be incorrect.