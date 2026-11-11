model: GPT-5.6 Pro (Chat mode)
round: 70 -- approach 65, Compute the operator commutant directly
front: proof
sent: 2026-08-16T11:40Z
worked: 21m 9s

---

## Result of the direct computation

The commutant can be computed completely. The computation eliminates **all off-diagonal operators**, but the remaining diagonal equations are precisely the original Collatz reachability problem.

Thus this approach gives an exact structural theorem,

\[
C^*(T_1,T_2)'
   \cong \ell^\infty(\{\text{Collatz orbit-components}\}),
\]

but it does **not** prove that the commutant is scalar without separately proving that there is only one orbit-component. Claiming scalarity after the calculation below would therefore be circular.

Mori works on \(H=\ell^2(\mathbb N)\), with standard basis \((e_n)_{n\ge1}\), and defines

\[
T_1e_n=
\begin{cases}
e_{3n+1},&n\text{ odd},\\
0,&n\text{ even},
\end{cases}
\qquad
T_2e_n=
\begin{cases}
0,&n\text{ odd},\\
e_{n/2},&n\text{ even}.
\end{cases}
\]

He proves that irreducibility of the generated \(C^*\)-algebra, equivalently
\(C^*(T_1,T_2)'=\mathbb CI\), is equivalent to the Collatz conjecture. citeturn177415view0

Let

\[
F(n)=
\begin{cases}
3n+1,& n\text{ odd},\\
n/2,&n\text{ even}.
\end{cases}
\]

---

# 1. The elementary operator relations

The adjoints are

\[
T_2^*e_n=e_{2n},
\]

and

\[
T_1^*e_m=
\begin{cases}
e_{(m-1)/3},&m\equiv4\pmod 6,\\
0,&m\not\equiv4\pmod6.
\end{cases}
\]

Consequently,

\[
T_1^*T_1=P_{\mathrm{odd}},
\qquad
T_2^*T_2=P_{\mathrm{even}},
\]

while

\[
T_1T_1^*=P_{\{m:m\equiv4\pmod6\}},
\qquad
T_2T_2^*=I.
\]

Suppose

\[
A\in C^*(T_1,T_2)',
\qquad
a_{m,n}:=\langle Ae_n,e_m\rangle.
\]

Since \(A\) commutes with \(P_{\mathrm{odd}}\) and \(P_{\mathrm{even}}\),

\[
a_{m,n}=0
\quad\text{whenever }m\not\equiv n\pmod2.
\tag{1}
\]

Commutation with \(T_2^*\) gives

\[
A e_{2n}=T_2^*Ae_n,
\]

hence

\[
a_{2m,2n}=a_{m,n}.
\tag{2}
\]

In particular, iterating (1)–(2),

\[
a_{m,n}\ne0
\quad\Longrightarrow\quad
v_2(m)=v_2(n),
\tag{3}
\]

and, after removing the common power of \(2\),

\[
a_{m,n}
=
a_{m/2^r,n/2^r},
\qquad r=v_2(m)=v_2(n).
\tag{4}
\]

For odd \(m,n\), commutation with \(T_1\) gives

\[
a_{3m+1,\,3n+1}=a_{m,n}.
\tag{5}
\]

There are also the corresponding range-block vanishing conditions; for example,

\[
a_{m,n}=0
\]

whenever exactly one of \(m,n\) is congruent to \(4\bmod6\).

Equations (1)–(5) are the first sparse matrix-coefficient equations. To solve all of them simultaneously, it is useful to pass to finite parity cylinders.

---

# 2. Every finite parity cylinder is a commutant projection

For a word

\[
\alpha=(i_0,\ldots,i_{k-1})\in\{1,2\}^k,
\]

put

\[
V_\alpha=T_{i_{k-1}}\cdots T_{i_1}T_{i_0}.
\]

On a basis vector \(e_n\), the operator \(V_\alpha\) is nonzero exactly when the first \(k\) Collatz branches of \(n\) are the prescribed branches:

\[
i_j=
\begin{cases}
1,&F^j(n)\text{ odd},\\
2,&F^j(n)\text{ even}.
\end{cases}
\]

In that case,

\[
V_\alpha e_n=e_{F^k(n)}.
\]

Thus \(V_\alpha\) is a partial permutation, and

\[
P_\alpha:=V_\alpha^*V_\alpha
\]

is the diagonal projection onto the set

\[
E_\alpha
 =
 \left\{
 n:
 \text{the first \(k\) branches of \(n\) equal }\alpha
 \right\}.
\]

Because \(A\) commutes with the whole generated \(C^*\)-algebra,

\[
AP_\alpha=P_\alpha A.
\tag{6}
\]

Suppose \(m\in E_\alpha\) and \(n\notin E_\alpha\). Then

\[
\begin{aligned}
a_{m,n}
 &=\langle Ae_n,e_m\rangle\\
 &=\langle P_\alpha Ae_n,e_m\rangle\\
 &=\langle AP_\alpha e_n,e_m\rangle\\
 &=0.
\end{aligned}
\]

Therefore

\[
a_{m,n}\ne0
\quad\Longrightarrow\quad
m,n\text{ have the same first \(k\) parity decisions}
\tag{7}
\]

for every \(k\).

So a nonzero off-diagonal coefficient could exist only between two distinct positive integers with exactly the same infinite Collatz parity itinerary.

---

# 3. Two positive integers cannot have the same infinite itinerary

Assume \(m,n\) have the same first \(k\) parity decisions. Let

\[
o_k=\#\{0\le j<k:F^j(m)\text{ is odd}\},
\]

and

\[
e_k=\#\{0\le j<k:F^j(m)\text{ is even}\}.
\]

These counts are the same for \(m\) and \(n\). Since the additive \(+1\) terms cancel when the two trajectories follow the same branches,

\[
F^k(m)-F^k(n)
 =
 \frac{3^{o_k}}{2^{e_k}}(m-n).
\tag{8}
\]

The left side is an integer. Since \(3^{o_k}\) is odd, (8) implies

\[
2^{e_k}\mid m-n.
\tag{9}
\]

But an odd Collatz value is always followed by an even value. Hence there cannot be two consecutive odd steps, and consequently

\[
e_k\ge \left\lfloor\frac{k}{2}\right\rfloor.
\tag{10}
\]

Letting \(k\to\infty\), equation (9) says that \(m-n\) is divisible by arbitrarily large powers of \(2\). Therefore

\[
m-n=0.
\]

We have proved:

\[
\boxed{
\text{The infinite parity-itinerary map }
n\longmapsto
\bigl(F^j(n)\bmod2\bigr)_{j\ge0}
\text{ is injective on }\mathbb N.
}
\tag{11}
\]

Mori’s later “total uniqueness” framework likewise identifies itinerary injectivity as the mechanism that turns reducing subspaces into invariant subsets; for the affine Collatz branches he proves this uniqueness property directly. citeturn659391view1turn659391view2

Combining (7) with (11),

\[
m\ne n\quad\Longrightarrow\quad a_{m,n}=0.
\]

Thus:

\[
\boxed{\text{Every operator in }C^*(T_1,T_2)'\text{ is diagonal.}}
\tag{12}
\]

This completely solves the off-diagonal portion of the commutant problem.

---

# 4. The remaining diagonal equations

Write

\[
Ae_n=\lambda_n e_n,
\qquad
(\lambda_n)\in\ell^\infty(\mathbb N).
\]

From \(AT_2=T_2A\), for every even \(n\),

\[
\lambda_{n/2}=\lambda_n.
\tag{13}
\]

From \(AT_1=T_1A\), for every odd \(n\),

\[
\lambda_{3n+1}=\lambda_n.
\tag{14}
\]

Together,

\[
\boxed{\lambda_{F(n)}=\lambda_n\qquad(n\ge1).}
\tag{15}
\]

Conversely, suppose \(\lambda\in\ell^\infty(\mathbb N)\) satisfies (15), and define

\[
M_\lambda e_n=\lambda_n e_n.
\]

Then for even \(n\),

\[
M_\lambda T_2e_n
  =\lambda_{n/2}e_{n/2}
  =\lambda_ne_{n/2}
  =T_2M_\lambda e_n,
\]

and for odd \(n\),

\[
M_\lambda T_1e_n
 =\lambda_{3n+1}e_{3n+1}
 =\lambda_ne_{3n+1}
 =T_1M_\lambda e_n.
\]

The same relation along the reverse edges shows directly that \(M_\lambda\) commutes with \(T_1^*\) and \(T_2^*\) as well. Therefore \(M_\lambda\in C^*(T_1,T_2)'\).

This proves the exact classification.

## Exact commutant theorem

Define \(m\sim n\) when their forward trajectories eventually meet:

\[
m\sim n
\quad\Longleftrightarrow\quad
\exists r,s\ge0\quad F^r(m)=F^s(n).
\tag{16}
\]

Then

\[
\boxed{
C^*(T_1,T_2)'
 =
 \left\{
 M_\lambda:
 \lambda\in\ell^\infty(\mathbb N),\
 \lambda_{F(n)}=\lambda_n
 \right\}
}
\tag{17}
\]

and hence

\[
\boxed{
C^*(T_1,T_2)'
 \cong
 \ell^\infty(\mathbb N/{\sim}).
}
\tag{18}
\]

In words: **the commutant consists exactly of bounded functions on the set of Collatz orbit-components.**

---

# 5. Scalarity is exactly the Collatz conjecture

A diagonal invariant sequence \(\lambda\) is constant precisely on each \(\sim\)-component. Therefore

\[
C^*(T_1,T_2)'=\mathbb CI
\]

if and only if \(\mathbb N/{\sim}\) has exactly one element.

The forward orbit of \(1\) is

\[
1\longmapsto4\longmapsto2\longmapsto1.
\]

Thus an integer belongs to the component of \(1\) exactly when its forward orbit reaches \(1\), \(2\), or \(4\), equivalently when it eventually reaches \(1\). Hence

\[
\mathbb N/{\sim}\text{ has one component}
\quad\Longleftrightarrow\quad
\text{every positive integer reaches }1.
\tag{19}
\]

So the direct calculation reproduces Mori’s equivalence in the strongest possible coefficient-level form:

\[
\boxed{
C^*(T_1,T_2)'=\mathbb CI
\quad\Longleftrightarrow\quad
\text{Collatz}.
}
\tag{20}
\]

But it does not make the right-hand side easier: it identifies it exactly with the surviving diagonal sector.

---

# 6. The explicit obstruction to finishing the argument

Suppose there is an orbit-component \(C\) that does not contain \(1\). Define

\[
P_Ce_n=
\begin{cases}
e_n,&n\in C,\\
0,&n\notin C.
\end{cases}
\]

Because \(C\) is closed under both forward and reverse Collatz edges,

\[
P_CT_i=T_iP_C,
\qquad
P_CT_i^*=T_i^*P_C
\]

for \(i=1,2\). Thus

\[
P_C\in C^*(T_1,T_2)'.
\]

It is a nonzero, nonidentity projection. Every one of the sparse matrix equations is satisfied automatically.

Conversely, every nonconstant commutant element distinguishes at least two such components.

Therefore an attempted final argument of the form

> “The sparse recurrence equations force all \(\lambda_n\) to equal \(\lambda_1\)”

must establish that every \(n\) is connected to \(1\). That is already the Collatz conjecture.

More sharply, for every fixed \(n\),

\[
n\sim1
\quad\Longleftrightarrow\quad
\lambda_n=\lambda_1
\text{ for every }M_\lambda\in C^*(T_1,T_2)'.
\tag{21}
\]

Indeed, if \(n\not\sim1\), the component projection \(P_{[n]}\) has diagonal value \(1\) at \(n\) and \(0\) at \(1\).

Thus even the pointwise statement “all commutant operators agree at \(n\) and \(1\)” is equivalent to proving Collatz for that particular seed \(n\).

---

# 7. What the sparse structure proves around \(e_1\)

There is a useful strengthening of the usual \(e_1\)-anchor.

Set

\[
W=T_2^2T_1.
\]

Then

\[
We_n=
\begin{cases}
e_{(3n+1)/4},&n\equiv1\pmod4,\\
0,&n\not\equiv1\pmod4.
\end{cases}
\tag{22}
\]

In particular,

\[
We_1=e_1.
\]

Moreover,

\[
\operatorname{Fix}(W)=\mathbb Ce_1.
\tag{23}
\]

To see this, write \(x=\sum c_ne_n\) and suppose \(Wx=x\). For \(m>1\), the coefficient of \(e_m\) in \(Wx\) can come from at most one index,

\[
n=\frac{4m-1}{3}.
\]

When this is an integer, \(n>m\), and the fixed-vector equation gives \(c_m=c_n\). Repeating either eventually reaches an index with no predecessor, forcing the coefficient to vanish, or produces infinitely many distinct indices carrying the same nonzero coefficient, contradicting \(x\in\ell^2\). Hence \(c_m=0\) for every \(m>1\), while \(c_1\) is unrestricted.

Consequently, for every \(A\in C^*(T_1,T_2)'\),

\[
W(Ae_1)=A(We_1)=Ae_1,
\]

so

\[
Ae_1\in\mathbb Ce_1.
\tag{24}
\]

The sparse relations therefore anchor every commutant operator at \(e_1\), and the equations propagate the same scalar throughout the entire component of \(1\). They cannot propagate it into a separate component without proving that the separate component does not exist.

---

# 8. A direct arithmetic sieve for a hypothetical exceptional component

The operator words do impose nontrivial restrictions on a hypothetical exceptional component.

Assume \(C\) is a component not containing \(1\), and let

\[
n=\min C.
\]

Then:

First, \(n\) must be odd. Otherwise \(T_2e_n=e_{n/2}\) places the smaller integer \(n/2\) in \(C\).

Second,

\[
n\not\equiv1\pmod4,
\]

because in that case

\[
T_2^2T_1e_n=e_{(3n+1)/4},
\]

and

\[
\frac{3n+1}{4}<n
\qquad(n>1),
\]

again contradicting minimality. Since \(n\) is odd,

\[
n\equiv3\pmod4.
\tag{25}
\]

Third,

\[
n\not\equiv2\pmod3.
\]

Indeed, when \(n\) is odd and \(n\equiv2\pmod3\),

\[
T_1^*T_2^*e_n
 =
 e_{(2n-1)/3},
\]

and

\[
\frac{2n-1}{3}<n.
\]

Combining these restrictions,

\[
\boxed{n\equiv3\text{ or }7\pmod{12}.}
\tag{26}
\]

Longer operator words give increasingly refined residue exclusions. But extinction of all residue classes at all depths would mean that every component contains a descending path to \(1\); this is another exact encoding of Collatz, not a consequence yet obtained from the commutant formalism.

---

# Final assessment

The direct commutant computation succeeds completely as an operator classification:

\[
\boxed{
C^*(T_1,T_2)'
=
\operatorname{diag}
\left\{
\lambda\in\ell^\infty(\mathbb N):
\lambda\circ F=\lambda
\right\}
\cong
\ell^\infty(\mathbb N/{\sim}).
}
\]

It proves:

1. Every off-diagonal matrix coefficient vanishes.
2. Every commutant operator is diagonal.
3. Its diagonal is constant exactly on Collatz orbit-components.
4. Every hypothetical exceptional component produces an explicit nontrivial commutant projection.
5. Scalarity is equivalent, component by component and globally, to Collatz convergence.

Therefore this approach does **not** presently yield a full proof. Its exact terminal obstruction is not an unresolved analytic estimate or operator lemma; it is the existence or nonexistence of an exceptional Collatz component itself. The commutant machinery removes all operator-theoretic ambiguity and leaves the original arithmetic problem intact.