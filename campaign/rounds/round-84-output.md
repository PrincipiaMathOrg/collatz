model: GPT-5.6 Pro (Chat mode)
round: 84 -- approach 79, An exact self-similarity equation for the exceptional set
front: proof
sent: 2026-08-17T02:41Z
worked: 60m

---

# Approach 79: exact self-similarity of the exceptional set

## Outcome

The proposed argument does **not** presently yield a complete proof of the Collatz conjecture. The exact self-similarity equation is valid and can be iterated without loss, but the final assertion

> no nonempty subset of \(\mathbb N\) can satisfy all the relations

does not follow from well-ordering, congruence restrictions, or presently known inverse-tree growth estimates. In fact, I prove below that the most natural finite version of that final step—covering all integers by finitely many affine congruence-descent certificates—is impossible.

Current 2026 literature continues to describe the Collatz conjecture as open. citeturn438860view2turn438860view3 What this approach does produce is:

1. the exact set equation for \(E\);
2. its complete iterated \(2\)-adic/\(3\)-adic form;
3. sharp consequences for a least exceptional integer;
4. an exact equivalence with component descent;
5. a rigorous adelic obstruction to every finite affine-cylinder proof;
6. a precise remaining synchronization theorem which would complete the proof.

---

## 1. The map and the exceptional set

Use the shortcut Collatz map

\[
T(n)=
\begin{cases}
n/2,&n\equiv0\pmod2,\\[2mm]
(3n+1)/2,&n\equiv1\pmod2.
\end{cases}
\]

Let

\[
B=\{n\ge1:T^j(n)=1\text{ for some }j\ge0\}
\]

be the basin of the cycle \(1\leftrightarrow2\), and let

\[
E=\mathbb N_{>0}\setminus B
\]

be the exceptional set.

For every \(n\ge1\),

\[
n\in E\quad\Longleftrightarrow\quad T(n)\in E.
\tag{1}
\]

Indeed, deleting or adding the first iterate cannot change whether the orbit eventually reaches \(1\). Thus \(E\) is completely invariant:

\[
T^{-1}(E)=E,\qquad T(E)=E.
\tag{2}
\]

---

## 2. The exact self-similarity equation

The preimages of \(m\) under \(T\) are

\[
T^{-1}(m)=
\begin{cases}
\{2m\},&m\not\equiv2\pmod3,\\[2mm]
\left\{2m,\dfrac{2m-1}{3}\right\},&m\equiv2\pmod3.
\end{cases}
\tag{3}
\]

The second preimage, when it exists, is automatically a positive odd integer.

Define

\[
E_2=\{m\in E:m\equiv2\pmod3\},
\qquad
P(m)=\frac{2m-1}{3}.
\]

### Theorem 2.1 — Exact exceptional-set equation

\[
\boxed{
E=2E\;\dot\cup\;P(E_2).
}
\tag{4}
\]

The union is disjoint: \(2E\) consists of even integers and \(P(E_2)\) consists of odd integers.

### Proof

If \(n\in E\) is even, then \(n=2m\) and \(T(n)=m\in E\), so \(n\in2E\).

If \(n\in E\) is odd, write \(n=2q+1\). Then

\[
T(n)=3q+2\equiv2\pmod3.
\]

Putting \(m=T(n)\), we have \(m\in E_2\) and

\[
n=\frac{2m-1}{3}=P(m).
\]

Conversely, \(2m\in E\) whenever \(m\in E\), and \(P(m)\in E\) whenever \(m\in E_2\), by complete invariance. ∎

Equivalently, for the indicator \(\mathbf 1_E\),

\[
\boxed{
\mathbf 1_E(2q)=\mathbf 1_E(q)\quad(q\ge1),
}
\tag{5}
\]

and

\[
\boxed{
\mathbf 1_E(2q+1)=\mathbf 1_E(3q+2)\quad(q\ge0).
}
\tag{6}
\]

A tempting but false replacement is

\[
E=2E\dot\cup(6E+4).
\]

That formula implicitly assumes that \(3q+2\in E\) implies \(q\in E\), which is not a consequence of invariance. It would make every exceptional integer even and would produce an immediate—but invalid—least-element proof.

---

## 3. Exact iteration of the set equation

Let

\[
\varepsilon=(\varepsilon_0,\ldots,\varepsilon_{k-1})\in\{0,1\}^k
\]

be a parity word. Put

\[
s_j=\sum_{i=0}^{j-1}\varepsilon_i,\qquad s=s_k,
\]

and define

\[
C_\varepsilon
=
\sum_{j=0}^{k-1}
\varepsilon_j\,2^j3^{\,s-s_{j+1}}.
\tag{7}
\]

A direct induction gives

\[
\boxed{
2^kT^k(n)=3^s n+C_\varepsilon
}
\tag{8}
\]

whenever the first \(k\) parities of \(n\) are \(\varepsilon\).

The parity word determines a unique residue

\[
a_\varepsilon\pmod{2^k},
\qquad
a_\varepsilon\equiv-3^{-s}C_\varepsilon\pmod{2^k}.
\tag{9}
\]

Conversely, solving (8) for \(n\) gives the inverse affine branch

\[
L_\varepsilon(y)
=
\frac{2^k y-C_\varepsilon}{3^s}.
\tag{10}
\]

Integrality requires the unique endpoint congruence

\[
y\equiv b_\varepsilon
:=2^{-k}C_\varepsilon
\pmod{3^s}.
\tag{11}
\]

Thus the one-step equation (4) iterates exactly to

\[
\boxed{
E\cap(a_\varepsilon+2^k\mathbb Z)
=
\left\{
L_\varepsilon(y):
\begin{array}{l}
y\in E,\\
y\equiv b_\varepsilon\pmod{3^s},\\
L_\varepsilon(y)>0
\end{array}
\right\}.
}
\tag{12}
\]

Taking the disjoint union over all \(2^k\) parity words gives the full depth-\(k\) self-similarity of \(E\).

This formulation exposes the central difficulty:

- the starting cylinder is determined \(2\)-adically;
- the endpoint integrality condition is determined \(3\)-adically;
- descent is an ordinary Archimedean inequality.

A proof must synchronize all three.

---

## 4. Consequences of well-ordering

Assume \(E\neq\varnothing\), and let

\[
e=\min E.
\tag{13}
\]

Then \(e>1\).

### Proposition 4.1

The following statements hold.

\[
e\ \text{is odd},
\tag{14}
\]

\[
e\not\equiv2\pmod3,
\tag{15}
\]

and

\[
T^j(e)\ge e\qquad(j\ge0).
\tag{16}
\]

### Proof

If \(e\) were even, then \(e/2\in E\), contradicting minimality.

If \(e\equiv2\pmod3\), then

\[
P(e)=\frac{2e-1}{3}<e
\]

would be a positive element of \(E\), again a contradiction.

Every forward iterate lies in \(E\), hence cannot be below its least element. ∎

Thus

\[
e\equiv0\ \text{or}\ 1\pmod3.
\tag{17}
\]

There is also an exact formula for the least exceptional integer in the branching residue class.

### Proposition 4.2

\[
\boxed{
\min E_2=\frac{3e+1}{2}.
}
\tag{18}
\]

### Proof

Since \(e\) is odd,

\[
T(e)=\frac{3e+1}{2}\in E,
\]

and this integer is congruent to \(2\pmod3\).

Conversely, if \(m\in E_2\), then \(P(m)\in E\), so

\[
\frac{2m-1}{3}\ge e,
\]

which gives

\[
m\ge\frac{3e+1}{2}.
\]

Equality is attained at \(T(e)\). ∎

Consequently,

\[
E\cap\left[e,\frac{3e+1}{2}\right)
\]

contains no even integers and no integers congruent to \(2\pmod3\).

These are genuine restrictions, but they do not yet contradict the existence of \(e\).

---

## 5. The entire connected component is exceptional

Two integers \(x,y\) merge when

\[
T^a(x)=T^b(y)
\]

for some \(a,b\ge0\). Equivalently, they lie in the same undirected connected component of the Collatz graph. The Collatz conjecture is equivalent to connectedness of this graph. citeturn438860view0

Complete invariance gives:

### Proposition 5.1

If \(e=\min E\), then every integer in the undirected component of \(e\) belongs to \(E\), and hence is at least \(e\).

In particular, a least counterexample must resist not only forward descent but **every mixture of forward and inverse moves**.

There is a useful exact equivalence.

### Theorem 5.2 — Component-descent formulation

The Collatz conjecture is equivalent to:

> For every \(n>1\), there exist \(x<n\) and \(a,b\ge0\) such that
> \[
> T^a(n)=T^b(x).
> \tag{19}
> \]

### Proof

If Collatz holds, take \(x=1\).

Conversely, suppose (19) holds for every \(n>1\). By strong induction, assume every integer below \(n\) reaches \(1\). Choose \(x<n\) merging with \(n\). Since \(x\) reaches \(1\), the common descendant of \(x\) and \(n\) also reaches \(1\), so \(n\) reaches \(1\). ∎

Any simple path between \(n\) and \(x\) has the normal form

\[
n\xrightarrow{\,T^a\,}y
\quad\longleftarrow\quad
x,
\tag{20}
\]

where the second portion is an inverse branch from \(y\) to \(x\). Once a simple path changes from inverse motion back to forward motion, it would immediately retrace the edge just traversed.

Thus all possible component-descent certificates are covered by (10).

---

## 6. What strong congruence restrictions actually provide

It is known that every forward orbit contains an integer congruent to \(2\pmod9\). citeturn336089view0 If

\[
y=9q+2\in E,
\]

then

\[
P(y)=6q+1=\frac{2y-1}{3}\in E
\]

and \(P(y)<y\). Minimality only implies

\[
P(y)\ge e,
\qquad\text{hence}\qquad
y\ge\frac{3e+1}{2}.
\tag{21}
\]

There is no contradiction because the first such \(y\) may be much larger than \(e\).

A stronger known result says that every divergent orbit and every nontrivial cycle contains an integer congruent to \(20\pmod{27}\). citeturn438860view1 Let

\[
y=27q+20.
\]

Starting at \(y\), apply the three inverse branches \(P,D,P\), where \(D(z)=2z\):

\[
y
\stackrel{P}{\longmapsto}
18q+13
\stackrel{D}{\longmapsto}
36q+26
\stackrel{P}{\longmapsto}
24q+17.
\]

Thus the same exceptional component contains

\[
z=24q+17=\frac{8y-7}{9}<y.
\tag{22}
\]

But minimality gives only

\[
z\ge e,
\qquad\text{or}\qquad
y\ge\frac{9e+7}{8}.
\tag{23}
\]

Again, the congruence theorem forces descent relative to the **hit value** \(y\), not relative to the global component minimum \(e\). What is missing is a quantitative bound on the height of the hit.

---

# 7. A rigorous obstruction to finite affine coverage

The preceding discussion suggests looking for finitely many paths whose congruence cylinders cover every integer and whose affine formulas give descent. That strategy cannot work.

Let

\[
D(y)=2y,\qquad
P(y)=\frac{2y-1}{3},
\]

where \(P\) is allowed when \(y\equiv2\pmod3\).

Every finite merge path has an affine formula

\[
W(n)=\alpha n+\beta,
\qquad \alpha>0,
\tag{24}
\]

on a congruence cylinder determined by finitely many \(2\)-adic and \(3\)-adic digits.

A path gives uniform descent for all sufficiently large integers in its cylinder precisely when

\[
\alpha<1,
\tag{25}
\]

or

\[
\alpha=1,\qquad \beta<0.
\tag{26}
\]

## Theorem 7.1 — Adelic obstruction

No finite collection of affine merge-path cylinders giving eventual strict descent can cover all sufficiently large positive integers.

### Proof

Consider

\[
\mathbb A=\mathbb Z_2\times\mathbb Z_3.
\]

The diagonal positive integers are dense in \(\mathbb A\): every pair of congruences modulo \(2^a\) and \(3^b\) has arbitrarily large positive solutions by the Chinese remainder theorem.

Each finite path domain is clopen in \(\mathbb A\). We prove that the point

\[
g=(-1,0)\in\mathbb Z_2\times\mathbb Z_3
\tag{27}
\]

belongs to no eventual-descent path cylinder.

Suppose a path is admissible at \(g\). At the \(2\)-adic coordinate \(-1\), every forward iterate is odd because

\[
\frac{3(-1)+1}{2}=-1.
\]

Therefore its forward portion consists of \(a\) odd branches. After these branches its affine formula is

\[
n\longmapsto
\alpha_0 n+\beta_0,
\qquad
\alpha_0=\left(\frac32\right)^a,
\qquad
\beta_0=\alpha_0-1.
\tag{28}
\]

Now follow any admissible inverse word in \(D\) and \(P\).

### Nonnegativity of the intercept

Evaluate the affine expression at the \(3\)-adic coordinate \(n=0\). Write

\[
\beta+1=\frac{M}{2^a}.
\tag{29}
\]

Initially,

\[
M_0=3^a.
\]

Under \(D\),

\[
\beta\mapsto2\beta,
\qquad
M\mapsto2M-2^a.
\tag{30}
\]

Under \(P\),

\[
\beta\mapsto\frac{2\beta-1}{3},
\qquad
M\mapsto\frac{2M}{3}.
\tag{31}
\]

The branch \(P\) is admissible exactly when \(3\mid M\).

After \(j\le a\) inverse steps, we claim

\[
M_j\ge 2^j3^{a-j}.
\tag{32}
\]

This is true at \(j=0\). If the next operation is \(P\), then

\[
M_{j+1}
=\frac{2M_j}{3}
\ge2^{j+1}3^{a-j-1}.
\]

If the next operation is \(D\), put \(d=a-j\ge1\). Then

\[
\begin{aligned}
M_{j+1}
&=2M_j-2^a\\
&\ge 2^{j+1}3^d-2^{j+1}2^{d-1}\\
&=2^{j+1}\bigl(3^d-2^{d-1}\bigr)\\
&\ge2^{j+1}3^{d-1},
\end{aligned}
\]

because

\[
3^d-2^{d-1}\ge3^{d-1}.
\]

Hence (32) holds.

In particular,

\[
M_j\ge2^a
\]

for every \(j\le a\), so \(\beta\ge0\). After \(a\) inverse steps, \(\beta\) is a nonnegative integer. Thereafter:

- \(D\) clearly preserves nonnegativity;
- if \(P\) is admissible, then \(\beta\equiv2\pmod3\), so \(\beta\ge2\), and
  \[
  \frac{2\beta-1}{3}\ge1.
  \]

Thus

\[
\boxed{\beta\ge0}
\tag{33}
\]

throughout every path admissible at \(g\).

### Lower bound for the slope

Set

\[
h=\alpha-\beta.
\]

Initially \(h=1\). Under \(D\),

\[
h\mapsto2h,
\]

while under \(P\),

\[
h\mapsto\frac{2h+1}{3}.
\]

Both transformations preserve \(h\ge1\). Therefore

\[
h\ge1.
\tag{34}
\]

Combining (33) and (34),

\[
\alpha=\beta+h\ge1.
\]

If \(\alpha=1\), then necessarily \(\beta=0\) and \(h=1\), so the path is not a strict descent. Therefore no path cylinder containing \(g\) satisfies (25) or (26).

If finitely many descent cylinders covered all sufficiently large positive integers, their union—being a finite union of closed subsets of \(\mathbb A\)—would contain the closure of those integers, namely all of \(\mathbb A\). But it does not contain \(g\). Contradiction. ∎

### Meaning of the theorem

This does **not** disprove every possible use of the exceptional-set equation. It proves that the following particularly natural program cannot succeed:

1. iterate the exact set equation finitely many times;
2. obtain finitely many congruence classes;
3. attach a fixed affine descent path to each class;
4. finish by strong induction.

Some genuinely infinite synchronization or Archimedean argument is unavoidable.

---

## 8. Exact computational test

I also enumerated, with exact integer arithmetic, all reduced symbolic paths generated by

\[
F_0(y)=y/2,\quad
F_1(y)=\frac{3y+1}{2},\quad
D(y)=2y,\quad
P(y)=\frac{2y-1}{3}
\]

through total path length \(20\). Congruence conditions were imposed symbolically, not by sampling.

The search produced:

\[
8\,132\,953
\]

deduplicated affine states and

\[
2\,148\,716
\]

distinct eventual-descent congruence cylinders.

One uncovered product cell was

\[
\boxed{
n\equiv27\pmod{2^{20}},
\qquad
n\equiv0\pmod{3^{20}}.
}
\tag{35}
\]

This is not a counterexample. It means only that no merge path of length at most \(20\) gives uniform eventual descent on that entire cylinder. Its shape is informative: the \(2\)-adic side shadows the unusually long initial behavior of \(27\), while the \(3\)-adic side suppresses useful inverse branching.

The exact search implementation and recorded output are here:

[Exact affine-cylinder search source](sandbox:/mnt/data/collatz_affine_cylinder_search.cpp)

[Depth-20 output summary](sandbox:/mnt/data/collatz_affine_cylinder_depth20.txt)

---

## 9. Why inverse-tree growth does not force emptiness

Assume again that \(e=\min E\). The integer

\[
u=T(e)=\frac{3e+1}{2}
\]

is congruent to \(2\pmod3\). Every positive inverse iterate of \(u\) lies in \(E\).

For every root \(u\not\equiv0\pmod3\), known inverse-tree estimates give, for sufficiently large \(X\),

\[
\#\{n\le X:T^j(n)=u\text{ for some }j\}
\ge X^{0.84}.
\tag{36}
\]

This is the Krasikov–Lagarias inverse-iterate bound. citeturn961575view0 Therefore a nonempty exceptional component would satisfy

\[
|E\cap[1,X]|\ge X^{0.84}
\]

for sufficiently large \(X\).

But this is still compatible with \(E\neq\varnothing\): \(X^{0.84}=o(X)\).

Tao’s theorem says that, for every \(f(N)\to\infty\), almost every orbit in logarithmic density reaches a value at most \(f(N)\). citeturn438860view2 It does not eliminate an exceptional component with minimum \(e\). Every inverse iterate of \(e\) already reaches the fixed value \(e\), and therefore satisfies the “almost bounded” conclusion once \(f(N)>e\).

Thus the known forward and backward growth results do not contradict the exact exceptional-set equation.

---

## 10. An entropy barrier for inverse-only coverage

There is also a quantitative reason why inverse branches alone are inadequate.

An inverse word of length \(k\) containing \(s\) applications of \(P\) has leading multiplier

\[
\lambda=\frac{2^k}{3^s}.
\tag{37}
\]

For contraction one needs

\[
\frac{s}{k}>
\rho:=\frac{\log2}{\log3}
=0.6309297535\ldots
\tag{38}
\]

For a fixed word with \(s\) occurrences of \(P\), admissibility imposes one \(3\)-adic cylinder modulo \(3^s\), of Haar measure \(3^{-s}\). Therefore the measure of endpoints admitting some word of length \(k\) with \(s\ge pk\) is at most

\[
\sum_{s\ge pk}\binom{k}{s}3^{-s}.
\tag{39}
\]

Writing

\[
H(p)=-p\log p-(1-p)\log(1-p),
\]

the exponential rate is

\[
H(p)-p\log3.
\tag{40}
\]

The positive root of

\[
H(p)=p\log3
\]

is

\[
p_*=0.6090897679\ldots,
\tag{41}
\]

strictly below the contraction threshold \(\rho\). At \(p=\rho\),

\[
H(\rho)-\rho\log3
=
-0.0346881852\ldots<0.
\tag{42}
\]

Hence the \(3\)-adic measure of endpoints possessing a length-\(k\) contracting inverse word decays exponentially with \(k\).

This does not exclude specially synchronized integer endpoints, but it proves that exhaustive inverse-tree counting is working beyond its generic entropy threshold. A forward orbit must first transport the endpoint into an exceptionally favorable \(3\)-adic cylinder.

---

# 11. The exact remaining theorem

The preceding work isolates the missing statement.

Call \(n\) **record-minimal** if

\[
T^j(n)\ge n\qquad\text{for every }j\ge0.
\tag{43}
\]

For a parity word \(\varepsilon\), recall

\[
L_\varepsilon(y)=
\frac{2^{|\varepsilon|}y-C_\varepsilon}
     {3^{s(\varepsilon)}}.
\]

## Two-ended synchronization statement

For every record-minimal \(n>1\), there should exist \(j\ge0\) and a parity word \(\varepsilon\) such that

\[
2^{|\varepsilon|}T^j(n)
\equiv C_\varepsilon
\pmod{3^{s(\varepsilon)}},
\tag{44}
\]

and

\[
\boxed{
0<
L_\varepsilon(T^j(n))
<n.
}
\tag{45}
\]

Condition (44) is the exact \(3\)-adic integrality condition. Condition (45) is the Archimedean descent condition.

### Conditional completion of the Collatz proof

Assume the two-ended synchronization statement. If \(E\neq\varnothing\), let \(e=\min E\). Then \(e\) is record-minimal. By the statement, there exist \(j,\varepsilon\) and

\[
x=L_\varepsilon(T^j(e))
\]

with \(0<x<e\). By construction,

\[
T^{|\varepsilon|}(x)=T^j(e).
\]

Since \(T^j(e)\in E\) and \(E\) is backward invariant, \(x\in E\), contradicting \(e=\min E\). Therefore \(E=\varnothing\), proving Collatz. ∎

---

# Conclusion

The exact self-similarity program reaches the following rigorous endpoint:

\[
E
=
2E\;\dot\cup\;
\left\{
\frac{2m-1}{3}:
m\in E,\ m\equiv2\pmod3
\right\},
\]

and its iterates give exact coupled \(2\)-adic starting cylinders and \(3\)-adic endpoint cylinders. Well-ordering turns a hypothetical exceptional set into a connected component with a global least vertex.

However:

- strong sufficient residue classes descend only relative to a later orbit value, not relative to the least exceptional integer;
- inverse-tree growth as strong as \(X^{0.84}\) is compatible with a sparse exceptional component;
- inverse-only contraction lies beyond the natural \(3\)-adic entropy threshold;
- most decisively, the adelic point \((-1,0)\) proves that no finite family of affine congruence-descent rules can cover all positive integers.

Therefore the requested unconditional proof has **not** emerged from approach 79. The remaining issue is not another manipulation of the set equation: it is the two-ended synchronization of a forward \(2\)-adic parity cylinder, an inverse \(3\)-adic integrality cylinder, and a strict Archimedean descent inequality for one fixed record-minimal integer.