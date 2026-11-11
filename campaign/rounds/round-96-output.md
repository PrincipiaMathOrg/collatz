model: GPT-5.6 Pro (gpt-5-6-pro)
round: 96
approach: 91 -- Proof-producing exhaustive verification
front: proof
sent: 2026-08-17T19:28:19Z
worked: Worked for 65m 58s
sha256: 7a4782187de660eadfac531023a7d352cb7408cf69f1a88afa87550d3a125b4b
chars: 20741

---# Result of the attack

I did **not** obtain a valid full proof of the Collatz conjecture from approach 91. What the approach does produce is more substantial than another finite verification bound:

1. a rigorous certificate language for descent, merger, subdivision, and ranked scaling;
2. a genuine **all-depth computer-assisted theorem** for the target-\(1\) negative Collatz shadow;
3. an independently reproduced exact certificate for that theorem;
4. a proof that periodic residue-class recurrences can be closed using explicit \(2\)-adic ranks;
5. a precise identification of why those ranks do not yet cover aperiodic survivor paths.

The published and project-reported exhaustive bound remains \(n<2^{71}\). Angeltveit’s 2026 algorithm improves the asymptotic cost of verifying a fixed bound \(2^N\), but does not turn finite verification into an all-integers theorem. The mixed binary–ternary rewriting approach likewise gives an exact termination reformulation and automated proofs of weakenings, not termination of the full system. citeturn851549search0turn851549search4turn385037academia1turn385037academia0

The obstruction is not merely a demand for more computation. The universal closure condition that the certificate would need is itself an exact equivalent of Collatz.

---

## 1. The exact certificate language

Use the shortcut map

\[
T(n)=
\begin{cases}
n/2,&n\equiv0\pmod 2,\\[1mm]
(3n+1)/2,&n\equiv1\pmod 2.
\end{cases}
\]

For a parity word

\[
w=(\varepsilon _0,\ldots,\varepsilon _{k-1})\in\{0,1\}^k,
\qquad
s_j=\sum_{i<j}\varepsilon_i,
\]

define

\[
C_0=0,
\qquad
C_{j+1}=3^{\varepsilon_j}C_j+\varepsilon_j2^j.
\]

Then every integer following \(w\) satisfies

\[
2^jT^j(n)=3^{s_j}n+C_j.
\tag{1}
\]

Every binary word of length \(k\) occurs on exactly one residue class modulo \(2^k\). Thus a proof-producing computation can represent an entire infinite arithmetic progression by the triple

\[
(r_w,\;3^{s_k},\;C_k),
\qquad
n=r_w+2^kq.
\]

On that cylinder,

\[
T^k(n)=T^k(r_w)+3^{s_k}q.
\tag{2}
\]

There are four natural certificate instructions.

### Descent leaf

Record \(j\) and prove, by the affine formula,

\[
T^j(n)<n
\qquad\text{for every }n\text{ in the cylinder outside the verified base range}.
\tag{D}
\]

For instance, if

\[
T^j(n)=a+3^{s_j}q,\qquad n=r+2^jq,
\]

then the inequality is eventually uniform whenever

\[
3^{s_j}<2^j.
\]

The finitely many values below the resulting threshold can be discharged by an exact base-range certificate.

### Merger leaf

Record a smaller integer-valued affine function \(m(n)\), branch words \(u,v\), and prove

\[
1\le m(n)<n,
\qquad
T^{|u|}(n)=T^{|v|}(m(n)).
\tag{M}
\]

By strong induction, \(m(n)\) reaches \(1\); the displayed equality then proves that \(n\) does as well.

### Split node

Replace a cylinder modulo \(2^k\) by its two lifts modulo \(2^{k+1}\), or refine simultaneously by a power of \(3\) when a merger’s integrality depends on an endpoint residue.

### Ranked backedge

A repeated certificate pattern may point back to an earlier abstract state only when it carries a well-founded rank

\[
\rho:\text{concrete certificate states}\longrightarrow W
\]

such that

\[
\rho(\text{successor})<\rho(\text{predecessor})
\]

on every traversal of the loop.

Merely recognizing the same residue-state again is not enough.

---

## 2. Soundness of a ranked exhaustive certificate

### Certificate theorem

Suppose a finite certificate graph satisfies all of the following.

1. Its root covers every \(n>1\).
2. Every split node is an exact partition of its parent arithmetic set.
3. Every terminal node is certified by either \((D)\) or \((M)\).
4. Every nonterminal backedge preserves the assertion that the represented integer is a counterexample.
5. Every directed cycle strictly decreases a rank in a well-founded order.

Then the Collatz conjecture holds.

### Proof

Assume otherwise and let \(n>1\) be the least integer whose orbit does not reach \(1\).

Traverse the certificate using the branch containing \(n\). A descent leaf is impossible: if \(T^j(n)<n\), then the smaller iterate reaches \(1\) by minimality, so \(n\) reaches \(1\).

A merger leaf is also impossible. Its witness \(m(n)<n\) reaches \(1\) by minimality, and the certified orbit equality implies that the orbit of \(n\) joins the orbit of \(m(n)\).

Hence the traversal never reaches a terminal leaf. Since the graph is finite, it must traverse directed cycles infinitely often. Every such traversal strictly decreases a well-founded rank, which is impossible. Therefore no least counterexample exists. ∎

This is the precise theorem that “a repeating finite certificate” must satisfy. Repetition without rank decrease is only a finite-state over-approximation.

---

# 3. The all-depth certificate that does close

The strongest successful instance of approach 91 is the all-depth target-\(1\) theorem already developed in the project.

For a positive accelerated valuation word

\[
a=(a_0,\ldots,a_{r-1}),\qquad
A_k=\sum_{i<k}a_i,
\]

put

\[
C_0=0,\qquad C_{k+1}=3C_k+2^{A_k}.
\tag{3}
\]

## All-depth target-\(1\) barrier theorem

If

\[
3^r\mid C_r+2^{A_r}
\tag{4}
\]

and

\[
2^{A_k}<3^k
\qquad(1\le k\le r),
\tag{5}
\]

then

\[
a_0=a_1=\cdots=a_{r-1}=1.
\tag{6}
\]

Unlike verification through a maximum word length, this theorem has no bound on \(r\). fileciteturn23file0L20-L38

This is a genuine proof-producing exhaustive result. The infinite word-length quantifier is compressed into a finite seed computation.

## 3.1 Terminal divisibility reconstructs an ordinary trajectory

Define the accelerated negative map

\[
U_-(m)=\frac{3m-1}{2^{v_2(3m-1)}}.
\]

Condition (4) is equivalent to the existence of positive odd integers

\[
m_0\longmapsto m_1\longmapsto\cdots\longmapsto m_r=1
\]

such that

\[
3m_i-1=2^{a_i}m_{i+1}.
\tag{7}
\]

Thus the congruence does not merely produce a formal \(3\)-adic object; it reconstructs an exact positive-integer \(3x-1\) trajectory. fileciteturn23file0L159-L205

## 3.2 Equal-time translation gives shell sparsity

For the negative shortcut map

\[
S_-(x)=
\begin{cases}
x/2,&x\text{ even},\\
(3x-1)/2,&x\text{ odd},
\end{cases}
\]

one has the exact translation law

\[
S_-^k(x+q2^k)
=
S_-^k(x)+q3^{s_k(x)}.
\tag{8}
\]

This turns a collision of finite “base endpoints” into an actual repeated orbit state.

For a finite simple trajectory \(x_0,\ldots,x_L\), let

\[
N_k=\#\{i:2^k\le x_i<2^{k+1}\}.
\]

The shell-injection argument proves

\[
N_k\le
\min\left\{
2^k,\,
k+
\min_{0\le t\le k}
\left(
\sum_{o=t+1}^k\binom{k}{o}
+
\sum_{o=0}^t3^o
\right)
\right\}.
\tag{9}
\]

The essential point is the use of equal time: two shell points with the same odd-step count and the same base endpoint would collide after exactly \(k\) further shortcut steps, contradicting simplicity. fileciteturn23file0L207-L330

## 3.3 Universal reciprocal-mass bound

Summing the shell estimate gives

\[
\sum_i\frac1{3x_i-1}<10.789
\tag{10}
\]

for every finite simple positive trajectory of \(S_-\).

The finite part through shell \(1000\) is certified by

\[
\sum_{k=0}^{1000}u_k
=
10{,}788{,}901{,}977{,}820{,}654,
\tag{11}
\]

where

\[
u_k=
\left\lceil
10^{15}
\frac{\min\{2^k,B_k+k\}}{3\cdot2^k-1}
\right\rceil.
\]

The analytic tail satisfies

\[
\sum_{k=1001}^{\infty}
\frac{\min\{2^k,B_k+k\}}{3\cdot2^k-1}
<
\frac{1000}{7\cdot2^{30}}
+
\frac{1002}{2^{1001}}.
\tag{12}
\]

Together these give the exact rational inequality

\[
\sum_i\frac1{3x_i-1}
<
10.788902110866736\ldots
<
10.789.
\]

No floating-point comparison is used in the proof-relevant calculation. fileciteturn23file0L332-L466

## 3.4 Arbitrary depth is compressed to a finite seed range

Along an accelerated negative trajectory,

\[
\frac{m_{j+1}}{m_j}
=
\frac3{2^{a_j}}
\left(1-\frac1{3m_j}\right).
\]

Multiplication gives

\[
\frac{1}{m_0}
=
\frac{3^r}{2^{A_r}}
\prod_{j=0}^{r-1}
\left(1-\frac1{3m_j}\right).
\]

Under the full barrier (5),

\[
\frac{3^r}{2^{A_r}}>1.
\]

Hence

\[
\log m_0
<
-\sum_{j=0}^{r-1}
\log\left(1-\frac1{3m_j}\right)
\le
\sum_{j=0}^{r-1}\frac1{3m_j-1}
<
10.789.
\]

Therefore

\[
m_0<e^{10.789}<3^{11}=177147.
\tag{13}
\]

All possible word lengths have now been reduced to a fixed finite seed interval.

An exact scan of all odd \(m_0<200000\) produces

\[
\begin{array}{lr}
\text{target }1&1,\\
\text{negative cycles}&2,\\
\text{barrier failures}&99997,\\
\text{step-cap survivors}&0.
\end{array}
\]

The unique target hit is the seed \(m_0=1\). It follows that any trajectory satisfying (4)–(5) begins at \(1\), after which every exact valuation is \(1\). This proves (6). fileciteturn23file0L468-L571

---

## 4. Independent certificate reproduction

I wrote a new arbitrary-precision Python verifier rather than relying only on the retained outputs. It independently checked:

\[
\sum_{k=0}^{1000}u_k
=
10{,}788{,}901{,}977{,}820{,}654;
\]

\[
3^{61}<2^{97};
\]

\[
100^{100}<2^{97}61^{61}39^{39};
\]

the exact rational tail inequality giving total mass \(<10.789\); and the complete negative-map seed partition

\[
1+2+99997+0=100000.
\]

It also recovered the two negative accelerated cycles beginning at \(5\) and \(17\).

Artifacts:

- [Exact certificate-audit script](sandbox:/mnt/data/collatz_approach91_certificate_audit.py)
- [Mass-certificate CSV, shells \(0\) through \(1000\)](sandbox:/mnt/data/collatz_all_depth_mass_certificate.csv)
- [Exact JSON audit summary](sandbox:/mnt/data/collatz_all_depth_certificate_summary.json)

The CSV SHA–256 digest is

```text
7cb01f7af50c62667592de89213b4e796fce9f2605bc14fa8bcce28c0592a8fa
```

This independently reproduces the finite arithmetic. A Lean formalization would still be needed to move the analytic shell argument and the finite decisions entirely inside a proof kernel.

---

# 5. Does the certificate repeat under scaling?

It does in some components, but not yet in all of them.

## 5.1 Direct-descent certificates cannot have bounded depth

For \(L\ge1\) and \(q\ge1\), set

\[
n_{L,q}=2^Lq-1.
\]

For \(0\le j\le L\),

\[
T^j(n_{L,q})
=
3^j2^{L-j}q-1.
\tag{14}
\]

Indeed, every state before time \(L\) is odd, and

\[
T\!\left(3^j2^{L-j}q-1\right)
=
3^{j+1}2^{L-j-1}q-1.
\]

For \(1\le j\le L\),

\[
T^j(n_{L,q})-n_{L,q}
=
2^Lq
\left[
\left(\frac32\right)^j-1
\right]
>0.
\tag{15}
\]

Thus no fixed depth \(K\) can give direct descent for every residue class. The nested survivor cylinders

\[
n\equiv-1\pmod{2^K}
\]

exist at every depth.

This does not by itself threaten Collatz: the infinite all-odd path represents the \(2\)-adic integer \(-1\), not a positive ordinary integer. But it proves that a successful finite certificate must contain a rank or another nonlocal integer-lifting condition.

For the all-odd loop the correct rank is immediate:

\[
\rho(n)=v_2(n+1).
\]

While the odd branch applies,

\[
T(n)+1=\frac{3(n+1)}2,
\]

so

\[
v_2(T(n)+1)=v_2(n+1)-1.
\]

This is a valid scaling backedge: the residue pattern repeats, but a well-founded rank decreases.

---

## 5.2 Bounded equal-depth merger certificates are also insufficient

Let

\[
U(n)=\frac{3n+1}{2^{v_2(3n+1)}}
\]

on positive odd integers, and define

\[
M_r(n)=
\min\{m>0:m\text{ odd and }U^r(m)=U^r(n)\}.
\tag{16}
\]

### Theorem

For every fixed \(K\), there are infinitely many odd \(n\) such that

\[
M_j(n)=n
\qquad(0\le j\le K).
\tag{17}
\]

### Proof

The image of \(U^K\) is infinite. For example, take the exact valuation word

\[
(2,2,\ldots,2)
\]

of length \(K\). Its seed cylinder is an infinite arithmetic progression

\[
n_q=r+2^{2K+1}q,
\]

and the affine identity gives

\[
U^K(n_q)=U^K(r)+2\cdot3^Kq.
\]

These endpoints are all distinct.

For each endpoint \(x\) in this infinite image, let

\[
\mu(x)=\min\{m>0:m\text{ odd and }U^K(m)=x\}.
\]

Distinct endpoints have distinct minima, so the collection of values \(\mu(x)\) is infinite.

Put \(n=\mu(x)\). Then \(M_K(n)=n\). Since

\[
M_{j+1}(n)\le M_j(n)\le n,
\]

for every \(j\le K\) we obtain

\[
n=M_K(n)\le M_j(n)\le n,
\]

and hence \(M_j(n)=n\). ∎

Therefore a finite certificate whose only merger leaves compare equal-depth inverse fibers up to some globally bounded depth cannot cover all positive integers.

General unequal-time merger witnesses are stronger. For example,

\[
n=2^{20}-1=1048575
\]

reaches

\[
1572863
\]

in one accelerated step, while the smaller integer

\[
m=736447
\]

reaches the same endpoint with valuation word

\[
(1,1,1,1,1,2,3).
\]

So one must not replace general orbit coalescence by only “a smaller direct predecessor of the starting value.”

---

## 5.3 Exact periodic loops do admit compact ranks

Let an accelerated valuation block \(w\) have length \(r\), total exponent \(A\), and carry \(C_w\). Its affine map is

\[
F_w(x)=\frac{3^rx+C_w}{2^A}.
\]

Put

\[
D_w=2^A-3^r,
\qquad
\Delta_w(x)=D_wx-C_w.
\]

Then

\[
\Delta_w(F_w(x))
=
\frac{3^r}{2^A}\Delta_w(x).
\tag{18}
\]

If both \(x\) and \(F_w(x)\) are integers and \(\Delta_w(x)\ne0\), then

\[
v_2(\Delta_w(F_w(x)))
=
v_2(\Delta_w(x))-A.
\tag{19}
\]

Thus the exact block \(w\) cannot repeat forever unless

\[
\Delta_w(x)=0.
\]

In that exceptional case,

\[
F_w(x)=x,
\]

so the repeated block is an actual cycle.

This gives a compact proof certificate:

\[
\rho_w(x)=
v_2\!\left((2^A-3^r)x-C_w\right).
\tag{20}
\]

### Example: \(w=(1,1,2)\)

Here

\[
A=4,\qquad r=3,\qquad C_w=19,
\]

so

\[
F_w(x)=\frac{27x+19}{16}
\]

and

\[
\Delta_w(x)=-11x-19.
\]

Each exact repetition lowers

\[
v_2(11x+19)
\]

by \(4\). The formal periodic point is

\[
x=-\frac{19}{11},
\]

so no positive integer can realize the block forever.

This is exactly the kind of repeated certificate envisioned in approach 91: a finite loop plus a well-founded arithmetic rank.

---

## 5.4 Periodic ranks do not cover the aperiodic survivor language

Consider the accelerated blocks

\[
P=(1),
\qquad
Q=(1,1,2).
\]

Every nonempty prefix of either block satisfies

\[
2^{A_k}<3^k.
\]

Therefore every concatenation of \(P\) and \(Q\), including an aperiodic infinite concatenation, remains strictly inside the coefficient barrier at every prefix.

Every finite prefix of such an aperiodic word is realized by infinitely many positive odd integers, because it determines one nonempty residue class modulo a power of \(2\).

Consequently:

- finite unrolling cannot reject the path;
- the path need not eventually repeat one exact block;
- the rank \(\rho_w\) for one periodic lasso may reset when the next block changes;
- the infinite \(2\)-adic seed need not be an ordinary positive integer.

This is the central scaling obstruction. The computation can recognize and rank each periodic loop while an aperiodic path continually changes the relevant affine defect.

---

# 6. The exact universal merger statement

The narrowest residue-independent certificate target is (16).

## Stationary inverse-fiber extinction

The Collatz conjecture is equivalent to

\[
\boxed{
\forall n>1\text{ odd}\quad
\exists r\ge1\quad
M_r(n)<n.
}
\tag{21}
\]

### Proof

If \(n\) reaches \(1\) after \(r\) accelerated steps, then \(1\) belongs to the same \(r\)-step inverse fiber, so

\[
M_r(n)=1<n.
\]

Conversely, suppose (21). Use strong induction on odd \(n\). Choose

\[
m=M_r(n)<n.
\]

By induction, \(m\) reaches \(1\). Since

\[
U^r(m)=U^r(n),
\]

the orbit of \(n\) joins the orbit of \(m\), and therefore also reaches \(1\). ∎

This equivalence was already isolated in the project as the stationary inverse-fiber theorem. fileciteturn25file0L189-L212

Thus a universal proof-producing merger certificate would indeed prove Collatz. But proving that its search always terminates is not an independent consequence of finite verification: it is statement (21).

---

# 7. Why the all-depth theorem does not establish (21)

The all-depth theorem gives the following positive-orbit corollary.

Let a consecutive positive accelerated block of length \(r\) have valuation word \(v\). If

\[
2^{A_k(v)}<3^k
\qquad(1\le k\le r)
\]

and its endpoint \(X\) satisfies

\[
3^r\mid X+1,
\tag{22}
\]

then

\[
v=1^r.
\tag{23}
\]

Equivalently, every non-all-ones barrier block satisfies

\[
v_3(X+1)<r.
\tag{24}
\]

This is exact, but it classifies a target congruence only **after that congruence occurs**. It does not prove that an arbitrary hypothetical divergent orbit must produce a block satisfying (22). fileciteturn25file0L59-L75

The missing synchronization implication is:

> A globally least divergent counterexample must possess a non-all-ones block whose relative coefficient prefixes satisfy the barrier and whose endpoint satisfies \(3^r\mid X+1\).

That statement has not been derived from the finite certificate. The project’s audited frontier records exactly this gap. fileciteturn26file8L374-L398

Positive cycles are separate. For a positive accelerated cycle,

\[
(2^A-3^r)x=C_r>0,
\]

so necessarily

\[
2^A>3^r.
\tag{25}
\]

This has the opposite sign from the all-depth barrier assumption. The target-\(1\) negative-shadow theorem therefore does not exclude positive cycles. fileciteturn25file0L77-L106

---

# 8. The unbounded state that a successful certificate must retain

For an infinite parity sequence, let \(\rho_k\) be its canonical seed representative modulo \(2^k\), and write

\[
\rho_{k+1}=\rho_k+b_k2^k,
\qquad b_k\in\{0,1\}.
\tag{26}
\]

The sequence represents a nonnegative ordinary integer exactly when

\[
b_k=0
\qquad\text{for all sufficiently large }k.
\tag{27}
\]

Equivalently, \(\rho_k\) is eventually constant or bounded. fileciteturn27file0L41-L113

After normalizing a hypothetical divergent orbit into the coefficient barrier, its critical surplus must tend to infinity, while the fixed ordinary starting integer forces the inverse-carry stream \(b_k\) to be eventually zero. fileciteturn27file0L119-L137

Hence the missing ranked closure can be stated as:

\[
\boxed{
\text{unbounded critical surplus}
\quad\Longrightarrow\quad
\text{a new nonzero inverse-carry bit or a smaller merger}.
}
\tag{28}
\]

A finite residue state alone cannot express (27) or (28). The certificate needs an unbounded rank measuring at least one of:

\[
\text{high seed bits},\qquad
\text{affine fixed-point defects},\qquad
\text{\(3\)-adic endpoint depth},\qquad
\text{critical surplus}.
\]

No finite rank cover proving (28) for every exactly realizable aperiodic path was obtained.

---

# 9. The precise final certificate that would finish the proof

Approach 91 would become a full proof if the computation produced a finite graph satisfying these four independently checkable obligations:

### C1. Exact arithmetic coverage

Every positive integer outside the verified base range belongs to at least one root cylinder, and every refinement exactly partitions its parent.

### C2. Exact terminal witnesses

Every terminal cylinder has either:

\[
T^k(n)<n,
\]

or explicit \(m(n)<n\) and words \(u,v\) with

\[
T^{|u|}(n)=T^{|v|}(m(n)).
\]

### C3. Ranked recurrent components

Every nonterminal strongly connected component has a well-founded rank that decreases around every possible concrete cycle. Affine-periodic components may use

\[
v_2\!\left((2^A-3^r)x-C_w\right).
\]

All-odd components may use \(v_2(x+1)\). Aperiodic components still require the missing finite rank cover.

### C4. Zero-defect classification

Whenever a rank can vanish, the corresponding exact arithmetic equations must imply the trivial Collatz cycle. No unverified positive cycle may remain in a zero-defect component.

The soundness theorem in Section 2 would then give a complete proof without trusting the search procedure itself: only the finite certificate and its exact checker would enter the proof.

The generated certificate currently satisfies this architecture only for the target-\(1\) negative-shadow language. It does not satisfy C3–C4 over the full positive Collatz transition system.

---

# Conclusion

Approach 91 has yielded a real structural result:

\[
\boxed{
\begin{gathered}
\text{unbounded target-\(1\) barrier-word search}\\
\text{compresses to a finite exact seed certificate}.
\end{gathered}
}
\]

That proves the all-depth target-\(1\) negative-shadow theorem, not the Collatz conjecture.

The universal residue-class certificate still requires

\[
\boxed{
\forall n>1\text{ odd}\quad
\exists r\ge1\quad
M_r(n)<n,
}
\]

or an equivalent finite rank-cover theorem for every aperiodic, ordinary-integer-realizable survivor path. Periodic scaling loops are rigorously discharged by affine-defect ranks; the unresolved component is the aperiodic synchronization of the binary seed, ternary endpoint, and Archimedean order constraints. Claiming a full proof from the present certificate would amount to assuming precisely that missing statement.