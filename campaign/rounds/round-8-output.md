model: GPT-5 Pro
round: 8 -- approach 3, Turn the q-analogue into a polynomialization theorem
front: proof
sent: 2026-08-13T18:25:49Z
worked: 48m 19s
finished: 2026-08-13T19:14:08Z

---

# Rigorous outcome

The formal-series program can be pushed to a very clean endpoint, but that endpoint exposes a decisive obstruction:

\[
\boxed{\text{For the natural conjugate \(q\)-map, a nonpolynomial series can never enter the polynomial set.}}
\]

Moreover, the statement that the series attached to every positive integer is already a polynomial is **exactly equivalent to the Collatz conjecture**, coefficient by coefficient. It is also equivalent to the older Bernstein–Lagarias reformulation using the \(2\)-adic parity conjugacy.

Thus this approach does not presently supply a full proof. A purported final argument based only on eventual entry into the polynomial basin would be circular. What follows is the complete reduction, including an explicit formula for the conjugacy, a classification of the natural degree-decreasing maps, and precise obstructions to the suggested invariants.

Monks introduced the relevant family \(T_{A,B}\) and singled out \(T_{1,1+q^2}\), proving that all polynomial inputs terminate in its two-cycle or fixed points. He then stated polynomiality of the images of positive integers as Conjecture 6, explicitly noting its equivalence to Collatz. citeturn988950view2turn988950view3turn988950view4

---

## 1. The exact formal-series conjugacy

Use the shortcut Collatz map

\[
T(x)=
\begin{cases}
x/2,&x\equiv0\pmod2,\\[2mm]
(3x+1)/2,&x\equiv1\pmod2,
\end{cases}
\qquad x\in\mathbb Z_2.
\]

For \(x\in\mathbb Z_2\), write

\[
\varepsilon_k(x)=T^k(x)\pmod2\in\mathbb F_2
\]

and form its parity series

\[
\mathcal Q(x)=\sum_{k\geq0}\varepsilon_k(x)q^k
       \in\mathbb F_2[[q]].
\]

Let

\[
\sigma(g)=\frac{g+g(0)}q
\]

be the left shift on formal power series. Then

\[
\mathcal Q(Tx)=\sigma(\mathcal Q(x)).
\]

The parity sequence determines a unique \(2\)-adic integer, so \(\mathcal Q\) is a bijective isometry. This is the formal-series version of the Bernstein–Lagarias parity-vector conjugacy. citeturn587594view0turn587594view1

Now put

\[
B(q)=1+q^2
\]

and define

\[
R(f)=
\begin{cases}
f/q,&f(0)=0,\\[2mm]
(f+B)/q,&f(0)=1.
\end{cases}
\tag{1}
\]

This is Monks’s \(T_{1,1+q^2}\).

### Lemma 1

For every \(g\in\mathbb F_2[[q]]\),

\[
R(Bg)=B\sigma(g).
\tag{2}
\]

### Proof

Since \(B(0)=1\), the constant coefficient of \(Bg\) is \(g(0)\). Therefore

\[
R(Bg)
 =\frac{Bg+g(0)B}{q}
 =B\frac{g+g(0)}q
 =B\sigma(g).
\qquad\square
\]

Consequently the map

\[
\boxed{H(x)=(1+q^2)\mathcal Q(x)}
\tag{3}
\]

is an explicit conjugacy:

\[
H(Tx)=R(H(x)).
\tag{4}
\]

So there is no need to leave the relevant conjugacy implicit.

---

## 2. Polynomial dynamics is completely understood

### Proposition 2

For \(f\in\mathbb F_2[[q]]\),

\[
R(f)\in\mathbb F_2[q]
\quad\Longleftrightarrow\quad
f\in\mathbb F_2[q].
\tag{5}
\]

Moreover, every polynomial orbit reaches

\[
0,\qquad 1+q,\qquad\text{or}\qquad\{1,q\}.
\]

### Proof

From (1),

\[
f=qR(f)+f(0)(1+q^2).
\tag{6}
\]

Hence \(R(f)\) polynomial implies \(f\) polynomial. The converse follows immediately from the definition of \(R\).

Now suppose \(f\) is a polynomial of degree \(d>1\).

If \(f(0)=0\), then

\[
R(f)=f/q,
\]

which has degree \(d-1\).

If \(f(0)=1\), write

\[
f=P+q^d,
\qquad \deg P<d,
\qquad P(0)=1.
\]

Then

\[
R(f)
 =\frac{P+q^d+1+q^2}{q}
 =\frac{P+1}{q}+q+q^{d-1},
\]

whose degree is strictly less than \(d\), possibly after cancellation.

Thus the degree decreases until it is at most one. Direct calculation gives

\[
R(0)=0,\qquad R(1+q)=1+q,\qquad R(1)=q,\qquad R(q)=1.
\]

This proves the result. \(\square\)

In particular,

\[
\boxed{\bigcup_{j\geq0}R^{-j}\bigl(\mathbb F_2[q]\bigr)
      =\mathbb F_2[q].}
\tag{7}
\]

The “polynomial basin” contains no nonpolynomial series.

There is also a useful conceptual explanation. Since

\[
R(f)=\sigma(f)+f(0)q,
\tag{8}
\]

the action of \(R\) on the tail is just a shift, with only one low coefficient modified. In the additive quotient

\[
\mathbb F_2[[q]]/\mathbb F_2[q],
\]

\(R\) induces the shift, and the shift is invertible on this quotient. Therefore a nonzero tail class cannot be mapped to zero.

---

## 3. Polynomiality is exactly Collatz termination

Write

\[
H(x)=\sum_{k\geq0}c_k(x)q^k.
\]

From (3),

\[
c_k(x)=\varepsilon_k(x)+\varepsilon_{k-2}(x),
\tag{9}
\]

where \(\varepsilon_{-1}=\varepsilon_{-2}=0\).

Thus

\[
H(x)\in\mathbb F_2[q]
\]

if and only if

\[
\varepsilon_k(x)=\varepsilon_{k-2}(x)
\qquad\text{for all sufficiently large }k.
\tag{10}
\]

In words, \(H(x)\) is polynomial exactly when the Collatz parity sequence is eventually periodic with period dividing two.

There are only four possible period-two tails:

\[
00\,00\,00\cdots,\qquad
11\,11\,11\cdots,\qquad
10\,10\,10\cdots,\qquad
01\,01\,01\cdots.
\]

By injectivity of the parity-vector map, these are respectively the parity sequences of

\[
0,\qquad -1,\qquad 1,\qquad 2.
\]

The first two points are the \(2\)-adic fixed points \(0,-1\); the last two form the positive cycle \(1\leftrightarrow2\).

Since \(T\) preserves positive integers, a positive orbit cannot reach \(0\) or \(-1\). We therefore obtain the exact theorem.

### Theorem 3: polynomialization equivalence

For every \(n\in\mathbb N_+\), the following are equivalent:

\[
\begin{aligned}
&\text{\(T^j(n)=1\) for some \(j\);}\\
&\text{\(H(n)\) is a polynomial;}\\
&\text{\(R^j(H(n))\) is a polynomial for some \(j\);}\\
&\text{the parity sequence of \(n\) is eventually \(10\)- or \(01\)-periodic.}
\end{aligned}
\tag{11}
\]

### Proof

The first, second and fourth conditions are equivalent by (9)–(10) and the classification of the four period-two tails. The second and third conditions are equivalent by complete invariance (5). \(\square\)

Consequently,

\[
\boxed{
\text{Collatz}
\quad\Longleftrightarrow\quad
H(\mathbb N_+)\subseteq\mathbb F_2[q].
}
\tag{12}
\]

This is precisely Monks’s Conjecture 6.

---

## 4. Polynomial degree is exactly total stopping time

The reformulation is even tighter than merely detecting termination.

Let

\[
\tau(n)=\min\{k\geq0:T^k(n)=1\}
\]

when this quantity exists.

### Proposition 4

For every terminating positive integer \(n\),

\[
\boxed{\deg H(n)=\tau(n).}
\tag{13}
\]

### Proof

Once \(T^{\tau(n)}(n)=1\), the parity tail alternates \(1,0,1,0,\ldots\). Hence (9) gives

\[
c_k(n)=0\qquad(k>\tau(n)).
\]

For \(\tau(n)\geq2\), minimality gives

\[
T^{\tau(n)-1}(n)=2,\qquad
T^{\tau(n)-2}(n)=4.
\]

Therefore

\[
\varepsilon_{\tau(n)}=1,
\qquad
\varepsilon_{\tau(n)-2}=0,
\]

and hence

\[
c_{\tau(n)}=1.
\]

The cases \(n=1,2\) are immediate:

\[
H(1)=1,\qquad H(2)=q.
\]

Thus the degree is exactly \(\tau(n)\). \(\square\)

For example,

\[
3\longmapsto5\longmapsto8\longmapsto4
 \longmapsto2\longmapsto1,
\]

so \(\tau(3)=5\). Its parity series is

\[
\mathcal Q(3)
 =1+q+\frac{q^5}{1+q^2},
\]

and therefore

\[
H(3)
 =(1+q^2)\mathcal Q(3)
 =1+q+q^2+q^3+q^5,
\]

which indeed has degree \(5\).

Thus “prove finite support” is not merely analogous to proving finite stopping time. Its support endpoint **is** the stopping time.

---

## 5. Relation to the Bernstein–Lagarias formulation

Interpret the parity coefficients as binary digits and write

\[
Q(x)=\sum_{k\geq0}\varepsilon_k(x)2^k\in\mathbb Z_2.
\]

A \(2\)-adic binary expansion is eventually period two precisely when it is a rational number with denominator dividing

\[
2^2-1=3.
\]

Hence

\[
H(n)\in\mathbb F_2[q]
\quad\Longleftrightarrow\quad
Q(n)\in\frac13\mathbb Z.
\tag{14}
\]

Bernstein and Lagarias formulated Collatz as

\[
Q(\mathbb N_+)\subseteq\frac13\mathbb Z,
\]

equivalently

\[
\mathbb N_+\subseteq\Phi\!\left(\frac13\mathbb Z\right),
\]

where \(\Phi=Q^{-1}\). citeturn587594view2

Therefore the proposed polynomialization theorem is exactly the Bernstein–Lagarias rationality formulation written in carryless \(\mathbb F_2[[q]]\) coordinates:

\[
\boxed{
\text{eventual period two}
\;\longleftrightarrow\;
\text{denominator \(3\)}
\;\longleftrightarrow\;
(1+q^2)\mathcal Q(n)\text{ polynomial}.
}
\]

This does not make the reformulation useless, but it identifies precisely how much new content is still required.

---

## 6. A different conjugate \(q\)-map cannot make the theorem logically weaker

There is a general obstruction independent of the particular formula.

### Basin lemma

Let \(h\) conjugate \(T\) to a map \(F\), and let \(\mathcal P\) be a class of “polynomial” points such that:

1. \(h(\{1,2\})\subseteq\mathcal P\);
2. every point of \(\mathcal P\) eventually reaches \(h(\{1,2\})\).

Then

\[
F^j(h(n))\in\mathcal P
\text{ for some }j
\quad\Longleftrightarrow\quad
T^k(n)\in\{1,2\}
\text{ for some }k.
\tag{15}
\]

Indeed, entry into \(\mathcal P\) implies subsequent termination, while reaching the target cycle implies entry into \(\mathcal P\).

Thus whenever polynomial inputs genuinely have terminating behavior, proving that all positive-integer images enter their basin is automatically equivalent to Collatz. A different conjugacy might make the arithmetic easier, but it cannot make the required statement logically weaker.

### The natural \(T_{A,B}\) family

Consider

\[
T_{A,B}(f)=
\begin{cases}
f/q,&f(0)=0,\\[2mm]
(Af+B)/q,&f(0)=1,
\end{cases}
\]

with odd polynomials \(A,B\).

For an odd polynomial \(f\) of sufficiently large degree \(d\),

\[
\deg T_{A,B}(f)=d+\deg A-1.
\]

Therefore a universal degree-descent mechanism forces

\[
\deg A=0,\qquad A=1.
\]

For \(A=1\),

\[
f=qT_{1,B}(f)+f(0)B,
\]

so polynomiality is completely invariant for every polynomial \(B\).

Moreover,

\[
H_B(x)=B\mathcal Q(x)
\]

is the corresponding parity-preserving conjugacy because

\[
T_{1,B}(Bg)=B\sigma(g).
\]

Since

\[
\mathcal Q(1)=\frac1{1+q^2},
\qquad
\mathcal Q(2)=\frac q{1+q^2},
\]

the target cycle maps to polynomials only when \(1+q^2\) divides \(B\). The simplest choice is exactly

\[
B=1+q^2.
\]

Hence, throughout the natural part of Monks’s family where:

- polynomial degree gives termination, and
- the positive target cycle is polynomial,

the polynomial set necessarily has no external basin.

---

## 7. Why the proposed invariants do not presently close the argument

### 7.1 Support entropy is a tail invariant

Equation (8) says

\[
R(f)=\sigma(f)+f(0)q.
\]

Thus \(R\) only shifts the infinite tail and changes one low coefficient. Consequently all quantities unchanged by shifts and finite modifications are invariant along an \(R\)-orbit:

\[
\text{support density},\quad
\text{block entropy},\quad
\text{asymptotic gap statistics},\quad
\text{eventual rationality}.
\]

They cannot serve as strictly decreasing Lyapunov functions.

There is also an information-theoretic reason. If

\[
c_k=\varepsilon_k+\varepsilon_{k-2},
\]

then a block of \(c\)-coefficients is determined by a parity block only two symbols longer. Conversely, a parity block is determined by its \(c\)-block and two initial bits. Thus their block complexities satisfy, up to harmless shifts,

\[
p_c(m)\leq p_\varepsilon(m+2),
\qquad
p_\varepsilon(m)\leq4p_c(m-2).
\]

Their entropy rates are therefore equal. In particular, replacing the parity sequence by its support-defect sequence does not compress its asymptotic information.

Zero entropy would also be insufficient: many nonperiodic sequences have zero entropy. What is needed is eventual period two, not merely low complexity.

---

### 7.2 A precise gap lemma

Although gap growth does not prove termination, it gives a useful arithmetic restriction.

Suppose that at time \(k\), a parity pair repeats for \(L\) consecutive two-step blocks. Put

\[
x=T^k(n).
\]

The four possibilities give

\[
\begin{array}{c|c|c}
\text{repeated pair}
&
T^{2L}(x)
&
\text{necessary congruence}
\\ \hline
00
&
\dfrac{x}{4^L}
&
x\equiv0\pmod{4^L}
\\[3mm]
10
&
1+\left(\dfrac34\right)^L(x-1)
&
x\equiv1\pmod{4^L}
\\[3mm]
01
&
2+\left(\dfrac34\right)^L(x-2)
&
x\equiv2\pmod{4^L}
\\[3mm]
11
&
-1+\left(\dfrac94\right)^L(x+1)
&
x\equiv-1\pmod{4^L}.
\end{array}
\tag{16}
\]

For example, the \(10\) two-step map is

\[
x\longmapsto\frac{3x+1}{4}
            =1+\frac34(x-1),
\]

and iteration gives the displayed formula. Integrality forces the congruence because \(3\) is invertible modulo \(4^L\).

Consequently, unless \(x\) is already \(1\) or \(2\), a defect-free block of length \(2L\) forces approximately

\[
x\geq4^L.
\tag{17}
\]

So long support gaps force very large orbit values. They do **not** force termination: a hypothetical divergent orbit could compensate for longer gaps with larger heights. A gap argument needs an independent Archimedean upper bound that beats \(4^L\).

---

### 7.3 The \(q\)-valuation is not monotone

For even \(f\),

\[
v_q(Rf)=v_q(f)-1.
\]

For odd \(f\), however,

\[
v_q(Rf)=v_q(f+1+q^2)-1,
\]

and the cancellation can be arbitrarily deep. For instance, with \(N\geq3\),

\[
f=1+q^2+q^N
\]

is odd, but

\[
R(f)=q^{N-1}.
\]

Thus \(v_q\) jumps from \(0\) to \(N-1\). It cannot define a uniformly descending well-founded filtration.

---

### 7.4 Noetherianity does not produce finite support

The ring \(\mathbb F_2[[q]]\) is a Noetherian discrete valuation ring, but this alone gives no polynomialization.

First, \(\mathbb F_2[q]\) is not an ideal in \(\mathbb F_2[[q]]\). Second, the descending filtration

\[
(q)\supset(q^2)\supset(q^3)\supset\cdots
\]

need not stabilize; Noetherianity controls ascending chains, not descending ones. Third, every odd series is a unit, so the principal ideal generated by an odd orbit point is the entire ring.

A more meaningful construction is the polynomial-annihilator ideal

\[
I(g)=
\left\{
P(q)\in\mathbb F_2[q]:
P(q)g(q)\in\mathbb F_2[q]
\right\}.
\tag{18}
\]

Then

\[
I(g)\neq(0)
\quad\Longleftrightarrow\quad
g\in\mathbb F_2(q),
\]

because \(Pg=A\) gives \(g=A/P\). Equivalently, the coefficient sequence of \(g\) is eventually periodic.

But Collatz requires the much more specific conclusion

\[
1+q^2\in I(\mathcal Q(n)).
\tag{19}
\]

Noetherianity says that \(I(g)\), once known to be nonzero, has a finite generator. It does not prove that \(I(g)\neq0\), and it certainly does not force its generator to divide \(1+q^2\).

Even proving \(I(\mathcal Q(n))\neq0\) would only show that every integer orbit is eventually periodic. One would still have to exclude all nontrivial positive cycles.

---

### 7.5 No finite-state Lyapunov invariant can work

Positive integers are dense in \(\mathbb Z_2\), and \(H\) is an isometry. Hence

\[
H(\mathbb N_+)
\]

is dense in \(\mathbb F_2[[q]]\). More concretely, for every \(r\) and every polynomial \(P\) of degree less than \(r\), there are infinitely many positive integers \(n\) such that

\[
H(n)\equiv P\pmod{q^r}.
\tag{20}
\]

Thus every finite coefficient pattern occurs among positive-integer images.

This gives a useful no-go theorem. Suppose

\[
V:\mathbb F_2[[q]]\longrightarrow\mathbb N
\]

were continuous and satisfied

\[
V(RH(n))<V(H(n))
\qquad(n\neq1,2).
\tag{21}
\]

The set

\[
\{f:V(Rf)<V(f)\}
\]

would be clopen and would contain the dense set \(H(\mathbb N_+\setminus\{1,2\})\). It would therefore be the whole space. But then on the cycle \(1\leftrightarrow q\) one would have

\[
V(q)<V(1)<V(q),
\]

a contradiction.

Hence no rank depending continuously on finitely many coefficients—equivalently, no fixed finite-state or finite-jet invariant—can strictly descend on every positive orbit.

Any successful invariant must use genuinely nonlocal information or additional Archimedean arithmetic.

---

## 8. The exact missing theorem

The inverse parity map has an explicit form. Suppose

\[
g(q)=\sum_{j\geq0}q^{d_j},
\qquad
0\leq d_0<d_1<\cdots.
\]

Then the corresponding \(2\)-adic integer is

\[
\Phi(g)
 =
-\sum_{j\geq0}\frac{2^{d_j}}{3^{j+1}}
 \in\mathbb Z_2.
\tag{22}
\]

This is the inverse parity-vector formula. citeturn587594view0

Since \(H=(1+q^2)\mathcal Q\), the positive-integer family can be written exactly as

\[
H(\mathbb N_+)
=
\left\{
(1+q^2)g:
-\sum_{j\geq0}\frac{2^{d_j}}{3^{j+1}}
\in\mathbb N_+
\right\}.
\tag{23}
\]

For each \(r\), let \(N_r(g)\) be the least nonnegative residue modulo \(2^r\) of the truncated \(2\)-adic sum

\[
-\sum_{d_j<r}\frac{2^{d_j}}{3^{j+1}}.
\tag{24}
\]

Then \(\Phi(g)\) is an ordinary nonnegative integer precisely when \(N_r(g)\) eventually stabilizes as an ordinary integer.

The desired polynomialization theorem is therefore:

\[
\boxed{
N_r(g)\text{ eventually stabilizes at a positive integer}
\quad\Longrightarrow\quad
(1+q^2)g\in\mathbb F_2[q].
}
\tag{25}
\]

Equivalently:

> If the inverse parity sum has only finitely many nonzero ordinary binary digits, then the parity sequence has only finitely many departures from period two.

That is the exact missing carry-noncancellation theorem. It is not supplied by the formal-series dynamics because arithmetic in \(\mathbb F_2[[q]]\) deliberately removes carries, while the condition that \(\Phi(g)\) be an ordinary positive integer is entirely about the eventual cancellation of \(2\)-adic carries in (22).

---

# Verdict

The approach produces an elegant exact encoding:

\[
\boxed{
H(n)=(1+q^2)
\sum_{k\geq0}(T^k(n)\bmod2)q^k.
}
\]

It also proves:

\[
\boxed{
\deg H(n)=\text{total stopping time of }n
}
\]

whenever the orbit terminates.

But the hoped-for enlargement of the polynomial basin does not exist:

\[
R^j(f)\text{ polynomial for some }j
\quad\Longleftrightarrow\quad
f\text{ polynomial}.
\]

And the global polynomialization statement is exactly

\[
\Phi(g)\in\mathbb N_+
\quad\Longrightarrow\quad
(1+q^2)g\in\mathbb F_2[q],
\]

which is Collatz itself, equivalently the Bernstein–Lagarias denominator-\(3\) formulation.

The formal-series coordinate system is therefore a useful lens, especially through the defect coefficients

\[
c_k=\varepsilon_k+\varepsilon_{k-2},
\]

but support entropy, asymptotic gaps, \(q\)-valuation, finite-state ranks, and bare Noetherianity do not supply the missing implication. A successful version of this program needs an additional nonlocal theorem coupling the support defects to the Archimedean height or to the \(3\)-adic carry structure in the inverse sum (22).