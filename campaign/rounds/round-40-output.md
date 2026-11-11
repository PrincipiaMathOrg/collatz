model: GPT-5.6 Pro (Chat mode)
round: 40 -- approach 35, Dependent percolation domination
front: proof
sent: 2026-08-15T00:53Z
worked: 48m 54s

---
# Outcome

I do not obtain a full proof of the Collatz conjecture from this approach. More decisively, the proposed subcritical domination statement is **false as written** under the natural forward-tree interpretation.

There is, however, a genuine subcritical calculation hiding in the idea. It gives an exponentially decaying **average density** of surviving branches. The obstruction is converting that annealed decay into a statement about every individual positive integer. I will make that distinction precise and formulate the exact strengthened estimate that would complete the proof.

## 1. The forward candidate tree

Use the shortcut Collatz map

\[
T(n)=
\begin{cases}
n/2,&n\equiv0\pmod 2,\\[1mm]
(3n+1)/2,&n\equiv1\pmod 2.
\end{cases}
\]

For a binary word

\[
w=(\varepsilon _0,\ldots,\varepsilon _{k-1})\in\{0,1\}^k,
\qquad
S_j(w)=\sum_{i<j}\varepsilon_i,
\]

the corresponding affine iterate is

\[
T^j(n)=\frac{3^{S_j(w)}n+C_j(w)}{2^j},
\qquad C_j(w)\geq0.
\]

Its multiplicative coefficient is

\[
q_j(w)=\frac{3^{S_j(w)}}{2^j}.
\]

Call \(w\) growth-compatible when

\[
q_j(w)\geq1
\quad\text{for every }1\leq j\leq k.
\tag{1}
\]

Writing

\[
\beta=\log_3 2=0.6309297535\ldots,
\]

condition (1) is equivalent to

\[
S_j(w)\geq \beta j
\quad(1\leq j\leq k).
\tag{2}
\]

### Finite integrality does not prune this tree

Every binary word of length \(k\) is the parity vector of exactly one residue class modulo \(2^k\), and hence of infinitely many positive integers. Thus every finite word satisfying (2) is already positively and integrally realizable. citeturn631843view0

So, with this definition, “integrally realizable” supplies no additional thinning at finite depth.

## 2. A rigorous obstruction to subcritical domination

### The all-ones ray

Consider

\[
w_k=1^k.
\]

Every prefix satisfies

\[
q_j(w_k)=\left(\frac32\right)^j>1.
\]

Moreover, \(w_k\) is realized by the positive integer

\[
r_k=2^k-1.
\]

Indeed,

\[
T^j(2^k-1)=3^j2^{k-j}-1
\qquad(0\leq j\leq k),
\]

so its first \(k\) iterates are odd.

Consequently, the deterministic open tree contains the infinite ray

\[
1,\quad 11,\quad 111,\quad\ldots.
\tag{3}
\]

The nested representatives \(2^k-1\) do not stabilize at a positive integer. They converge 2-adically to \(-1\); equivalently, the unique 2-adic integer with parity sequence \(111\ldots\) is \(-1\). citeturn631843view1

### No pathwise subcritical coupling

Suppose the open arithmetic tree were contained, under a coupling, in a percolation cluster which is subcritical and therefore has no infinite ray almost surely. The deterministic ray (3) would then have to belong to that cluster almost surely, a contradiction.

This remains true after grouping any fixed number \(L\) of levels.

There is an even stronger local obstruction. Define the barrier surplus

\[
D_j(w)=S_j(w)-\beta j.
\]

If an open prefix \(w\) has

\[
D_k(w)\geq \beta L,
\]

then **every one** of its \(2^L\) binary continuations of length \(L\) remains open: even the all-zero continuation has

\[
D_{k+t}\geq D_k-\beta t\geq0
\qquad(0\leq t\leq L).
\]

For the prefix \(1^m\),

\[
D_m=(1-\beta)m,
\]

so for every fixed \(L\), sufficiently large all-one prefixes have a complete open binary cone of depth \(L\).

Therefore:

\[
\boxed{\text{No fixed block size admits a uniform conditional open probability }p<1.}
\]

This also shows why a Liggett–Schonmann–Stacey-type theorem cannot be applied directly. Such domination results concern genuine random fields satisfying uniform conditional-probability or finite-dependence hypotheses. Here the candidate tree is deterministic, its prefix events have unbounded dependence, and some states have deterministic full open cones. citeturn167226search6

## 3. What the probabilistic calculation really proves

Let \(B_k\) be the number of binary words satisfying (2). Then

\[
B_k
\leq
\sum_{m\geq\beta k}\binom{k}{m}
\leq
(k+1)2^{H_2(\beta)k},
\]

where

\[
H_2(x)=-x\log_2x-(1-x)\log_2(1-x).
\]

Conversely, fix \(p>\beta\). Under Bernoulli-\(p\) bits, the walk

\[
S_j-\beta j
\]

has positive drift and has a positive probability of never becoming negative. Intersecting with its typical set \(S_k=pk+o(k)\) gives

\[
B_k\geq 2^{(H_2(p)-o(1))k}.
\]

Letting \(p\downarrow\beta\) yields

\[
\lim_{k\to\infty}B_k^{1/k}
=
2^{H_2(\beta)}
=
1.9318131064\ldots.
\tag{4}
\]

Thus the number of open nodes grows exponentially. The tree is not combinatorially subcritical.

On the other hand, under a Haar-random 2-adic seed, all \(2^k\) parity words are equally likely. Therefore

\[
\mathbb P(\text{open through depth }k)
=
\frac{B_k}{2^k}
=
\bigl(0.9659065532\ldots\bigr)^{k+o(k)}.
\tag{5}
\]

This is the attractive “subcritical” number in the proposal. But it is a decay of **measure**, not of the number of candidate branches:

\[
1.931813\ldots>1,
\qquad
\frac{1.931813\ldots}{2}=0.965906\ldots<1.
\]

Equation (5) proves that a Haar-random 2-adic integer has finite coefficient stopping time almost surely. It does not exclude a single exceptional positive integer. The parity map is a bijection and 2-adic isometry, so the probabilistic model genuinely describes Haar-random 2-adic seeds; positive ordinary integers form a countable Haar-null subset. citeturn631843view1

## 4. The exact ordinary-integer condition

For a parity word \(w\) of length \(k\), let

\[
r(w)\in\{0,\ldots,2^k-1\}
\]

be its unique canonical realizing residue.

Consider a nested ray

\[
w_1\prec w_2\prec\cdots
\]

and write \(r_k=r(w_k)\).

### Stationarity lemma

The ray is the parity sequence of a positive ordinary integer \(n\) if and only if

\[
r_k=n
\quad\text{for all sufficiently large }k.
\tag{6}
\]

Indeed, if the ray belongs to \(n\), then \(r_k\equiv n\pmod{2^k}\). Once \(2^k>n\), the canonical representative is exactly \(n\). The converse is immediate.

Thus Collatz requires excluding not all infinite open rays—there are uncountably many 2-adic ones—but only the **eventually stationary positive rays**.

That is a tail property. No finite prefix, fixed suffix, or fixed block knows whether the canonical representatives will eventually stop changing. In particular, the all-ones ray is open forever but nonstationary:

\[
r_k=2^k-1\longrightarrow-1
\quad\text{2-adically}.
\]

This is the precise point at which the percolation analogy loses pointwise dynamical meaning.

## 5. A genuine subcritical theorem in the inverse formulation

There is another interpretation of “integrally realizable” under which an exact subcritical calculation does occur.

Use the accelerated odd map

\[
U(x)=\frac{3x+1}{2^{\nu_2(3x+1)}}.
\]

A valuation word

\[
a=(a_1,\ldots,a_j),\qquad a_i\geq1,
\]

has cumulative sums

\[
A_t=a_1+\cdots+a_t.
\]

The growth barrier is

\[
2^{A_t}\leq3^t,
\qquad\text{hence}\qquad
A_t\leq \alpha t,
\quad
\alpha=\log_2 3.
\tag{7}
\]

Ignoring the prefix restrictions can only increase the number of words. The number of positive compositions of total \(A\) into \(j\) entries is \(\binom{A-1}{j-1}\), so

\[
\#\{\text{growth-compatible words of length }j\}
\leq
\sum_{A=j}^{\lfloor\alpha j\rfloor}
\binom{A-1}{j-1}
=
\binom{\lfloor\alpha j\rfloor}{j}.
\tag{8}
\]

Stirling's formula gives the exponential rate

\[
\Lambda
=
\frac{\alpha^\alpha}
     {(\alpha-1)^{\alpha-1}}
=
2.8395137305\ldots.
\tag{9}
\]

For a fixed word \(a\), its inverse path to an endpoint \(X\) is integral precisely when

\[
2^{A_j}X\equiv C_a\pmod{3^j}.
\tag{10}
\]

Because \(2\) is invertible modulo \(3^j\), equation (10) selects exactly one endpoint residue modulo \(3^j\). Hence, for a Haar-random \(X\in\mathbb Z_3\),

\[
\mathbb E\bigl[
\#\{\text{integral growth-compatible inverse words of length }j\}
\bigr]
\leq
\frac{\binom{\lfloor\alpha j\rfloor}{j}}{3^j}
=
\left(0.9465045768\ldots\right)^{j+o(j)}.
\tag{11}
\]

Since the right side is summable, Borel–Cantelli gives:

> For Haar-almost every 3-adic endpoint \(X\), there are growth-compatible integral inverse paths at only finitely many depths.

This is a rigorous subcritical first-moment theorem. It requires no independence.

But once again it is annealed over \(X\). A hypothetical exceptional Collatz orbit supplies a correlated sequence of moving endpoints \(X_j\), chosen precisely so that one exceptional path exists at depth \(j\). Conditioning a subcritical branching model on such survival creates an “immortal spine”; the annealed estimate (11) does not control that spine.

## 6. The fixed-endpoint version actually terminates

The fixed-endpoint problem can be settled without probability.

### Proposition

For every fixed positive integer \(X\), there are only finitely many pairs \((Y,j)\) such that

\[
T^j(Y)=X
\]

and the multiplicative coefficient of this segment is at least \(1\).

### Proof

Write

\[
X=q_jY+E_j,
\qquad q_j\geq1,\quad E_j\geq0.
\]

If \(E_j=0\), the segment contains only even steps, in which case \(q_j=2^{-j}<1\). Hence \(E_j>0\), and therefore

\[
Y<X.
\]

There are only finitely many possible starting values \(Y\).

For a fixed \(Y<X\), the deterministic orbit of \(Y\) can hit \(X\) at most once unless \(X\) lies on a cycle. If \(X\) lies on a positive cycle of period \(p\), then its period identity has the form

\[
X=q_pX+E_p,
\qquad E_p>0,
\]

and consequently \(q_p<1\). Each additional turn around the cycle multiplies the coefficient by \(q_p\), so after finitely many turns the total coefficient is below \(1\). Therefore only finitely many lengths \(j\) qualify. ∎

So the real problem is not extinction above a fixed root. It is obtaining an extinction bound **uniform enough for the endpoint to move with the orbit**.

## 7. The second gap: coefficient decline is not actual descent

Even eliminating every positive stationary ray satisfying \(q_j\geq1\) forever would not yet prove Collatz.

The additive remainder can keep an iterate above its starting value after the coefficient has fallen below \(1\). For example, there are finite “paradoxical” segments with

\[
\frac{3^{S_j}}{2^j}<1
\qquad\text{but}\qquad
T^j(n)\geq n.
\]

Nontrivial cycles would necessarily have this property over one period. citeturn753536view0

Thus the coefficient stopping time and the ordinary stopping time are distinct notions; current finite coefficient-tree descriptions do not prove either that every coefficient stopping time is finite or that the coefficient and classical stopping times agree. citeturn100079view2

A complete proof using the proposed tree would need both:

\[
\begin{aligned}
&\text{(I) no positive stationary coefficient-barrier ray;}\\
&\text{(II) every least counterexample produces such a ray,}\\
&\hspace{1.4cm}\text{or else its first coefficient crossing gives actual descent.}
\end{aligned}
\]

The second statement is precisely the all-depth first-crossing problem that the previous exact computation verified only finitely far.

## 8. Why terminal locality does not create finite dependence

Your existing terminal-locality framework gives an exact identity for a compatible competing ancestor:

\[
Y-R=\frac{\Sigma(u,\tau,c)+h(\tau,b)}{2^c}.
\tag{12}
\]

Here \(h\) is determined by the terminal \(3\)-adic compatibility fibre, but the surplus \(\Sigma\) depends on the entire prefix. Thus even perfect suffix mixing does not determine whether the competitor lies below the original seed. fileciteturn2file1L227-L260

The required qualitative statement is exactly that every positive stationary retained ray eventually has a compatible competitor with negative total score. That synchronization theorem remains the stated all-depth gap. fileciteturn2file1L324-L338

The explicit length-\(42\) strict-barrier word with optimal competitor cutoff \(814\) also shows that a small fixed cutoff or bounded suffix-only compression cannot supply the missing block domination. fileciteturn2file0L43-L94 The conclusion of that computation is explicitly that the terminal congruence data must be coupled to unbounded prefix height information. fileciteturn2file0L172-L181

## 9. A repaired percolation criterion that really would prove Collatz

The correct pointwise analogue of subcritical domination is the following.

For \(N,k\geq1\), define

\[
E_k(N)=
\left\{
1<n\leq N:
T^i(n)\geq n\text{ for every }1\leq i\leq k
\right\}.
\]

### Uniform quenched extinction criterion

Suppose there exist constants

\[
C<\infty,\qquad a<\infty,\qquad 0<\rho<1
\]

such that

\[
|E_k(N)|\leq C N^a\rho^k
\qquad
\text{for every }N,k.
\tag{13}
\]

Then the Collatz conjecture follows.

### Proof

Fix \(N\). The right side of (13) tends to zero as \(k\to\infty\). Since \(|E_k(N)|\) is an integer, it must eventually equal zero. Therefore every \(n\leq N\) eventually reaches a value below itself.

As \(N\) is arbitrary, every \(n>1\) has finite stopping time. Strong induction now proves that every positive integer reaches \(1\): once \(n\) reaches \(m<n\), the induction hypothesis applies to \(m\). ∎

Estimate (13) is a genuine pointwise, subcritical-percolation theorem. It is much stronger than

\[
\frac{|E_k(N)|}{N}\longrightarrow0
\]

in a density sense. Density estimates permit a single nested exceptional ray; (13) does not.

An equivalent tree formulation would be to construct positive weights \(W(w)\), a block length \(L\), and \(\rho<1\) such that

\[
\sum_{\substack{u\succeq w\\|u|-|w|=L\\u\text{ open}}}
W(u)
\leq
\rho W(w)
\tag{14}
\]

for every open node, while \(W(w_k)\) stays bounded below along every eventually stationary positive ray. Iterating (14) would make such a ray impossible.

The weight cannot depend only on a bounded suffix or on the multiplicative surplus. It must detect at least:

\[
\text{canonical-seed stabilization}
\;+\;
\text{terminal }3\text{-adic fibre}
\;+\;
\text{prefix archimedean surplus}.
\]

Constructing that weight is exactly the unresolved synchronization problem, rather than a consequence of ordinary dependent-percolation domination.

# Final assessment

The approach yields two rigorous results:

\[
\boxed{
\begin{aligned}
&\text{Haar mass of forward growth-compatible cylinders decays like }
0.9659065^k,\\
&\text{the annealed number of accelerated integral inverse words decays like }
0.9465046^j.
\end{aligned}}
\]

But neither is pointwise. Meanwhile, the deterministic forward tree contains the infinite all-ones ray and arbitrarily deep complete open cones, so it cannot be dominated pathwise by any subcritical percolation process, at any fixed block scale.

Therefore Approach 35, in its stated form, does not complete a Collatz proof. Its viable repaired form is the uniform quenched estimate (13), or the stationary-ray weighted certificate (14). Proving either would indeed give a full proof, but the needed estimate is precisely the global arithmetic synchronization step not supplied by percolation or finite integrality alone.