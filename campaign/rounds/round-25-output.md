model: GPT-5 Pro
round: 25 -- approach 20, Ultraproduct rigidity of minimal counterexamples
front: proof
sent: 2026-08-13T18:48:25Z
worked: 51m 28s

---

# Verdict

The ultraproduct program can be carried through rigorously, but it does **not** complete a proof of Collatz. Its decisive proposed implication,

\[
\text{nonstandard survival + asymptotic frequency + normalized carry}
\quad\Longrightarrow\quad
\text{periodicity},
\]

is false. In fact, one can explicitly construct hyperfinite Collatz trajectories having all of those regularity properties whose limiting dynamics is an **aperiodic irrational rotation**.

This is not just the usual objection that Collatz remains open. It is a mathematical obstruction to the proposed proof. Current literature still describes a proof as out of reach, while the published computational verification reaches \(2^{71}\). citeturn172491view4turn171785view4

What follows is a complete proof of that obstruction, followed by the exact additional theorem an ultraproduct approach would need.

---

# 1. Exact affine dynamics

Use the shortcut Collatz map

\[
T(n)=
\begin{cases}
n/2,&n\equiv0\pmod 2,\\[2mm]
(3n+1)/2,&n\equiv1\pmod 2.
\end{cases}
\]

Let

\[
e_i=T^i(n)\pmod 2,\qquad
s_k=\sum_{i=0}^{k-1}e_i.
\]

Since

\[
2T(x)=3^{e(x)}x+e(x),
\]

iteration gives

\[
2^kT^k(n)=3^{s_k}n+B_k,
\tag{1}
\]

where

\[
B_k=\sum_{i=0}^{k-1}e_i2^i3^{\,s_k-s_{i+1}}\geq0.
\tag{2}
\]

Consequently,

\[
\frac{T^k(n)}n
=
\frac{3^{s_k}}{2^k}
\left(1+\frac{B_k}{3^{s_k}n}\right).
\tag{3}
\]

The first factor is the homogeneous multiplicative drift; the second factor is the normalized affine carry.

A standard and crucial fact is that every binary word of length \(k\) is the parity vector of exactly one residue class modulo \(2^k\). Thus every finite parity pattern is realized by infinitely many positive integers. Passing to infinite words gives a bijection between all binary sequences and \(2\)-adic seeds. citeturn171785view1turn171785view2

We also use the accelerated odd map

\[
U(n)=\frac{3n+1}{2^{v_2(3n+1)}}.
\]

For an odd orbit \(x_{j+1}=U(x_j)\), put

\[
a_j=v_2(3x_j+1),\qquad
A_j=\sum_{i=0}^{j-1}a_i.
\]

Then

\[
2^{A_j}U^j(n)=3^jn+C_j,
\tag{4}
\]

with

\[
C_0=0,\qquad C_{j+1}=3C_j+2^{A_j},
\tag{5}
\]

and hence

\[
C_j=\sum_{i=0}^{j-1}3^{j-1-i}2^{A_i}.
\tag{6}
\]

Thus

\[
\frac{U^j(n)}n
=
\frac{3^j}{2^{A_j}}
\left(1+\frac{C_j}{3^jn}\right).
\tag{7}
\]

---

# 2. Finite survival is unconditional

Call \(n\) an \(H\)-survivor when

\[
T^j(n)\geq n\qquad(1\leq j\leq H).
\]

Such survivors exist for every \(H\), independently of whether Collatz is true.

Indeed, take

\[
n_H=2^H-1.
\]

For \(0\leq j\leq H\),

\[
T^j(n_H)=3^j2^{H-j}-1.
\tag{8}
\]

This follows by induction because all the inputs used before the final step are odd. For \(1\leq j\leq H\),

\[
T^j(n_H)-n_H
=
2^{H-j}(3^j-2^j)>0.
\]

Therefore

\[
T^j(n_H)>n_H\qquad(1\leq j\leq H).
\tag{9}
\]

Now choose a nonprincipal ultrafilter and form the ultrapower. Set

\[
N=[\,2^H-1\,],\qquad \mathcal H=[\,H\,].
\]

Then \(N\) and \(\mathcal H\) are infinite hyperintegers, and Łoś’s theorem gives

\[
T^j(N)\geq N
\qquad
\text{for every internal }1\leq j\leq\mathcal H.
\tag{10}
\]

Compactness and Łoś’s theorem do exactly this: finite satisfiability produces a nonstandard realization, and first-order statements transfer coordinatewise. citeturn975064view0turn975064view1

But the sequence \(2^H-1\) converges \(2\)-adically to

\[
-1=\cdots111111_2.
\]

The all-ones parity sequence corresponds to the \(2\)-adic fixed point \(-1\), not to a positive-integer counterexample. citeturn171785view2

So even the very strong-looking assertion

\[
\exists N,\mathcal H\text{ infinite}:
\quad T^j(N)\geq N\text{ for all }j\leq\mathcal H
\]

is true unconditionally. It cannot distinguish the truth or falsity of Collatz.

This already shows that compactness is solving the wrong existence problem: it produces a nonstandard or \(2\)-adic seed, whereas Collatz concerns one fixed ordinary positive integer.

---

# 3. A critical aperiodic ultraproduct

The preceding example has excessive upward drift. Perhaps one could hope that imposing the exact critical valuation frequency and controlling the carry creates rigidity.

It does not.

## Theorem 1: Sturmian obstruction

Let

\[
\beta=\log_2 3.
\]

For every \(H\geq2\), there is a positive odd integer \(n_H\) whose first \(H\) accelerated valuations \(a_0,\ldots,a_{H-1}\) satisfy all of the following:

\[
\left|
\sum_{i=r}^{s-1}a_i-\beta(s-r)
\right|<1
\qquad(0\leq r<s\leq H),
\tag{11}
\]

\[
n_H<U^j(n_H)
<
2\left(1+\frac1{3H}\right)n_H
\qquad(1\leq j\leq H),
\tag{12}
\]

and

\[
0\leq
\frac{C_j}{3^jn_H}
\leq\frac1{3H}
\qquad(0\leq j\leq H).
\tag{13}
\]

Moreover, the infinite valuation word from which these prefixes are taken is aperiodic and is a coding of an irrational rotation.

### Proof

Define

\[
A_j=\lfloor\beta j\rfloor,\qquad
a_j=A_{j+1}-A_j.
\tag{14}
\]

Because \(1<\beta<2\),

\[
a_j\in\{1,2\}.
\]

For any \(0\leq r<s\),

\[
\sum_{i=r}^{s-1}a_i=A_s-A_r.
\]

Therefore

\[
\begin{aligned}
(A_s-A_r)-\beta(s-r)
&=
(\lfloor\beta s\rfloor-\beta s)
-
(\lfloor\beta r\rfloor-\beta r),
\end{aligned}
\]

which lies strictly between \(-1\) and \(1\). This proves (11).

To realize the valuation prefix \(a_0,\ldots,a_{H-1}\), prescribe the shortcut parity word

\[
1\,0^{a_0-1}\,
1\,0^{a_1-1}\cdots
1\,0^{a_{H-1}-1}\,1.
\tag{15}
\]

It has length \(A_H+1\). By the parity-cylinder bijection, it is realized by one residue class modulo \(2^{A_H+1}\), hence by infinitely many positive odd integers. Choose a representative \(n_H\) large enough that

\[
n_H\geq H^2.
\tag{16}
\]

For the resulting accelerated orbit, equation (4) holds. Since

\[
A_i=\lfloor\beta i\rfloor\leq\beta i,
\]

we have

\[
2^{A_i}\leq2^{\beta i}=3^i.
\]

Using (6),

\[
\frac{C_j}{3^j}
=
\sum_{i=0}^{j-1}\frac{2^{A_i}}{3^{i+1}}
\leq
\sum_{i=0}^{j-1}\frac13
=
\frac j3.
\tag{17}
\]

Hence, for \(j\leq H\),

\[
0\leq\frac{C_j}{3^jn_H}
\leq
\frac{j}{3n_H}
\leq
\frac{1}{3H}.
\]

This proves (13).

The homogeneous multiplier is

\[
q_j=\frac{3^j}{2^{A_j}}
=
2^{\beta j-\lfloor\beta j\rfloor}
=
2^{\{\beta j\}}.
\tag{18}
\]

The number \(\beta\) is irrational: otherwise \(2^p=3^q\) for some positive integers \(p,q\), contradicting unique factorization. Thus, for every \(j>0\),

\[
1<q_j<2.
\tag{19}
\]

Substituting (13) and (19) into (7) gives

\[
1<
\frac{U^j(n_H)}{n_H}
<
2\left(1+\frac1{3H}\right),
\]

which is (12).

Finally, put

\[
\alpha=\beta-1\in(0,1).
\]

Since

\[
\lfloor\beta j\rfloor
=
j+\lfloor\alpha j\rfloor,
\]

we obtain

\[
a_j
=
1+\lfloor\alpha(j+1)\rfloor-\lfloor\alpha j\rfloor.
\tag{20}
\]

This is a mechanical, or Sturmian, coding of the irrational rotation

\[
\theta\longmapsto\theta+\alpha\pmod1.
\]

It cannot be eventually periodic: an eventually periodic integer sequence has rational limiting average, whereas

\[
\frac{A_H}{H}\longrightarrow\beta
\]

is irrational.

Moreover,

\[
\log_2\frac{U^j(n_H)}{n_H}
=
\{\beta j\}
+
\log_2\left(1+\frac{C_j}{3^jn_H}\right),
\]

so uniformly for \(j\leq H\),

\[
\log_2\frac{U^j(n_H)}{n_H}
=
\{\beta j\}+O(H^{-1}).
\tag{21}
\]

Thus the normalized height shadows an irrational rotation. ∎

---

## Ultraproduct consequence

Take the ultrapower of these \(n_H\). Then there are infinite hyperintegers \(N,\mathcal H\) such that, internally for every \(1\leq j\leq\mathcal H\),

\[
N<U^j(N)<(2+\varepsilon)N,
\tag{22}
\]

where \(\varepsilon\) is infinitesimal,

\[
\frac{C_j}{3^jN}\simeq0,
\tag{23}
\]

and every valuation interval has discrepancy less than \(1\) from the critical mean \(\beta\):

\[
\left|
A_s-A_r-\beta(s-r)
\right|<1.
\tag{24}
\]

Nevertheless, no standard integer \(p>0\) is a period of the valuation word on its hyperfinite domain. Its limiting normalized-height system is an irrational rotation.

This directly disproves the proposed rigidity principle. The object has:

- nonstandard survival;
- an exact asymptotic valuation frequency;
- zero normalized carry in standard part;
- bounded normalized height;
- a strong translation symmetry;

but it is aperiodic.

A recent 2026 preprint on Christoffel extremizers also singles out Sturmian words—the irrational-slope, aperiodic analogues of Christoffel words—as natural objects to investigate in connection with unbounded Collatz behavior. citeturn171785view0

---

# 4. What happens when one imposes minimality?

Define the least \(H\)-survivor

\[
m_H=
\min\left\{
n>1:
T^j(n)\geq n
\text{ for }1\leq j\leq H
\right\}.
\tag{25}
\]

The set is nonempty by the example \(2^H-1\), and \(m_H\) is nondecreasing.

## Proposition 2

The Collatz conjecture is true if and only if

\[
m_H\longrightarrow\infty.
\tag{26}
\]

Equivalently, Collatz is false if and only if \((m_H)\) is bounded.

### Proof

Suppose Collatz is false, and let \(n_0\) be the least positive counterexample. It must be odd, since an even counterexample would map immediately to the smaller counterexample \(n_0/2\).

No iterate of \(n_0\) can lie below \(n_0\). Indeed, if

\[
T^j(n_0)<n_0,
\]

then by minimality \(T^j(n_0)\) reaches \(1\), so \(n_0\) also reaches \(1\), a contradiction. Therefore

\[
m_H\leq n_0
\qquad\text{for every }H.
\]

Thus \((m_H)\) is bounded.

Conversely, if \((m_H)\) is bounded, then because it is nondecreasing and integer-valued, it eventually stabilizes at some \(m\). For every \(j\), choose \(H\) beyond both the stabilization point and \(j\). Then

\[
T^j(m)\geq m.
\]

Thus the orbit of \(m>1\) never reaches \(1\), and Collatz is false. ∎

Now form

\[
M=[m_H],\qquad\mathcal H=[H].
\]

Internally, \(M\) is the least \(\mathcal H\)-survivor:

\[
M=
\min\left\{
X>1:
T^j(X)\geq X
\text{ for }1\leq j\leq\mathcal H
\right\}.
\tag{27}
\]

But Proposition 2 says

\[
M\text{ is standard}
\quad\Longleftrightarrow\quad
\text{Collatz is false},
\tag{28}
\]

while

\[
M\text{ is infinite}
\quad\Longleftrightarrow\quad
\text{Collatz is true}.
\tag{29}
\]

Thus the question “is the internally minimal hyper-survivor standard?” is exactly the original Collatz conjecture in another form. Saturation has not simplified it.

In particular, if Collatz is true, an infinite internally minimal hyper-survivor necessarily exists. Its existence cannot be used as a contradiction.

---

# 5. Minimality disappears at the standard-time boundary

There is an even sharper obstruction.

Let

\[
\mathcal S_{\mathrm{std}}
=
\left\{
X\in{}^\ast\mathbb N:
X\text{ is infinite and }
T^j(X)\geq X
\text{ for every standard }j
\right\}.
\tag{30}
\]

## Proposition 3

The set \(\mathcal S_{\mathrm{std}}\) has no least element. More precisely, every \(X\in\mathcal S_{\mathrm{std}}\) has an infinite \(Y<X\) with \(Y\in\mathcal S_{\mathrm{std}}\).

### Proof

Fix \(X\in\mathcal S_{\mathrm{std}}\). Since \(T(X)\geq X\), \(X\) is odd.

Fix a standard \(j\). Its first \(j\) parity bits form a standard finite word, so by (1)

\[
T^j(X)=q_jX+r_j,
\tag{31}
\]

where

\[
q_j=\frac{3^{s_j}}{2^j}
\]

is a standard positive rational and \(r_j=B_j/2^j\) is finite.

Because \(X\) is infinite and \(T^j(X)\geq X\), we cannot have \(q_j<1\): in that case

\[
(q_j-1)X+r_j<0.
\]

We also cannot have \(q_j=1\), since

\[
3^{s_j}=2^j
\]

has no solution for \(j>0\). Therefore

\[
q_j>1
\qquad\text{for every standard }j>0.
\tag{32}
\]

Choose an infinite hyperinteger \(K\) such that

\[
2^K<X
\qquad\text{and}\qquad
\frac{2^K}{X}\simeq0.
\]

Set

\[
Y=X-2^K.
\]

Then \(Y\) is positive, odd, infinite, and \(Y<X\). Moreover,

\[
Y\equiv X\pmod{2^K}.
\]

Since \(K\) exceeds every standard integer, \(X\) and \(Y\) have the same first \(j\) parity bits for every standard \(j\). Consequently,

\[
T^j(Y)=q_jY+r_j.
\]

By (32),

\[
T^j(Y)-Y=(q_j-1)Y+r_j>0.
\]

This holds for every standard \(j\), so \(Y\in\mathcal S_{\mathrm{std}}\). ∎

Therefore an \(H\)-minimal hyper-survivor can remain minimal only because every smaller candidate eventually fails at some **nonstandard** time. As soon as one discards that nonstandard tail and keeps only all standard initial segments, minimality vanishes.

This is the precise model-theoretic failure:

\[
\text{least survivor through one nonstandard horizon}
\]

does not become

\[
\text{least survivor through all standard times}.
\]

---

# 6. The minimality–scaling incompatibility

Suppose Collatz is false and \(n_0\) is the least counterexample.

Keeping \(n_0\) preserves genuine minimality, but \(n_0\) is a fixed finite integer. The affine \(+1\) term is not infinitesimal, so there is no homogeneous scaling limit.

To obtain a scaling limit, one must move far out along a divergent orbit and normalize by very large orbit values. But those large orbit values are not minimal counterexamples: \(n_0\) is already a smaller counterexample on the same orbit.

Alternatively, one can use the horizon minima \(m_H\), which are internally minimal and may tend to infinity. But their infinitude is equivalent to Collatz being true, and their standardness is equivalent to Collatz being false.

Thus the proposed argument cannot simultaneously retain all three of:

\[
\text{genuine minimality},\qquad
\text{infinite scaling},\qquad
\text{one fixed standard seed}.
\]

One of them is always lost.

---

# 7. Why the symmetry does not transfer to a positive cycle

Let \(w\) be a standard parity block of length \(p\), with \(s\) odd steps and affine carry \(B_w>0\). Then

\[
T^p(x)=\frac{3^sx+B_w}{2^p}.
\tag{33}
\]

A fixed point would satisfy

\[
(2^p-3^s)x=B_w,
\]

so

\[
x=\frac{B_w}{2^p-3^s}.
\tag{34}
\]

A positive fixed point therefore requires

\[
2^p>3^s.
\tag{35}
\]

Equivalently, if

\[
\rho=\log_3 2,
\]

then a positive cycle block must have

\[
\frac{s}{p}<\rho.
\tag{36}
\]

But Proposition 3 shows that every standard prefix of an infinite barrier shadow satisfies

\[
\frac{3^s}{2^p}>1,
\]

hence

\[
\frac{s}{p}>\rho.
\tag{37}
\]

Repeating such a standard prefix periodically gives

\[
2^p-3^s<0,
\]

so the formal fixed point in (34) is negative.

The simplest example is the all-odd word, which gives the \(2\)-adic and integer fixed point

\[
x=-1.
\]

Thus the periodic object naturally produced by the upward nonstandard shadow has the **wrong sign** for a positive Collatz cycle.

There is a second obstruction. Suppose for a fixed standard \(p\),

\[
T^p(X)=X+d
\]

for an infinite \(X\) and a finite translation \(d\). Equation (33) gives

\[
(2^p-3^s)X=B_w-2^pd.
\tag{38}
\]

The right side is finite, while \(2^p-3^s\neq0\) is a nonzero standard integer. Hence \(X\) would be finite, a contradiction.

Therefore an infinite Collatz shadow admits neither an exact standard period nor an exact bounded standard translation. Any recurrence must be either:

1. approximate rather than exact, or
2. located at a nonstandard period \(P\).

Approximate equality in a standard-part quotient is not transferred by Łoś to exact integer equality. A nonstandard period corresponds to periods tending to infinity and does not produce a fixed standard finite cycle.

Also, periodicity by itself would not finish Collatz: nontrivial positive cycles are another unresolved possibility, not something already excluded.

---

# 8. The finite-state quantifier error

Suppose one records a finite state at resolution \(r\): seed modulo \(2^r\), carry modulo \(3^r\), a valuation suffix, and a discretized real height.

For each fixed \(r\), the state space is finite. A hyperfinite trajectory therefore has repeated \(r\)-states. This gives a statement of the form

\[
\forall r\ \exists\,t_r,p_r:
\qquad
S_r(t_r+p_r)=S_r(t_r).
\tag{39}
\]

Exact periodicity would require

\[
\exists\,t,p\ \forall r:
\qquad
S_r(t+p)=S_r(t).
\tag{40}
\]

The order of the quantifiers has been reversed.

Nothing in compactness, saturation, or finite-state recurrence allows this reversal. Sturmian sequences demonstrate the failure perfectly: every finite factor recurs, and every finite-resolution system looks recurrent, but there is no global period.

Your terminal-suffix locality theorem helps make the \(3^r\)-endpoint condition genuinely local at each fixed \(r\). It does not provide a recurrence gap \(p\) that is uniform in \(r\). As \(r\) grows sufficiently large to recover exact arithmetic, the state space and possible recurrence time also grow.

That uniformity is the missing theorem.

---

# 9. What a successful ultraproduct theorem would actually need

Assume a divergent counterexample exists. Take its least element \(n_0\). If its orbit is not periodic, it has no repeated values. Since only finitely many integers lie below any fixed bound, an unbounded nonperiodic orbit must in fact tend to infinity.

One may then choose suffix-minimum times \(t_i\) such that

\[
x_{t_i}\leq x_k\qquad(k\geq t_i)
\]

and

\[
x_{t_i}\longrightarrow\infty.
\]

The ultraproduct

\[
X=[x_{t_i}]
\]

satisfies

\[
T^j(X)\geq X
\]

for every hypernatural \(j\), not merely for \(j\leq\mathcal H\). This is the strongest legitimate object supplied by a genuine divergent counterexample.

A usable rigidity theorem would have to exploit the fact that all the \(x_{t_i}\) come from **one fixed standard orbit**. Local frequency, normalized height and carry do not remember that ancestry.

One sufficient form would be a uniform standardization theorem asserting that every such orbit-derived hyperobject produces at least one of the following standard outputs:

- a fixed standard \(p\) and an exact bounded affine recurrence;
- a fixed standard residue cylinder containing a positive-density family of genuine non-descending orbits;
- a standard-time descent certificate.

The first is impossible by equation (38). The third contradicts the suffix-minimum construction. The second would contradict Tao’s theorem: taking, for example, \(f(N)=\sqrt N\), Tao proves that for logarithmic-density-one many integers, the orbit eventually falls below \(f(N)\). A fixed arithmetic progression of genuine no-descent counterexamples would have positive logarithmic density. citeturn161726view0

But shrinking cylinders do not suffice. For example,

\[
n\equiv-1\pmod{2^r}
\qquad(r=1,2,\ldots)
\]

form a compatible nested family. Their \(2\)-adic intersection is \(-1\), while their intersection in the positive ordinary integers is empty.

Consequently, a disproof route would have to prove that the inverse-limit seed is an ordinary positive integer—equivalently, that its binary expansion eventually terminates—not merely that it is a \(2\)-adic or nonstandard point.

---

# 10. Final assessment

The proposed ultraproduct construction succeeds in producing nonstandard long-lived objects. What fails is the rigidity step.

The precise conclusions are:

\[
\boxed{
\text{Arbitrarily long no-descent trajectories exist unconditionally.}
}
\]

\[
\boxed{
\begin{aligned}
&\text{Critical valuation frequency, negligible normalized carry,}\\
&\text{bounded normalized height, and translation symmetry}\\
&\text{do not imply periodicity.}
\end{aligned}
}
\]

\[
\boxed{
\text{Finite-horizon minimality becomes useful only if one can prove standardness,}
}
\]

and that standardness question is equivalent to Collatz itself.

The strongest valid outcome of approach 20 is therefore a no-go theorem: the natural ultraproduct quotient erases the affine \(+1\) term, replaces a positive integer by a general \(2\)-adic/nonstandard seed, and admits critical aperiodic Sturmian dynamics. A successful repair would require a new **uniform seed–carry synchronization theorem**, with a recurrence scale bounded independently of every \(2\)-adic and \(3\)-adic resolution. No such theorem follows from saturation, asymptotic frequency, or normalized affine carry alone.