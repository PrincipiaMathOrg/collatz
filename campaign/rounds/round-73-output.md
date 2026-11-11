model: GPT-5.6 Pro (Chat mode)
round: 73 -- approach 68, Numen-integrality exclusion
front: proof
sent: 2026-08-16T14:33Z
worked: 59m 53s

---

# Numen-integrality exclusion: exact outcome

The proposed argument does **not** give a valid full proof of the Collatz conjecture. Formalizing it leads to one strong and useful theorem, but it also exposes two decisive obstructions:

1. For nonperiodic words, the natural numen is essentially a **backward-orbit invariant**, not a forward-orbit invariant. Positive integer numen values can have many irrational symbolic codes, including codes attached to integers already in the \(1\leftrightarrow2\) basin.
2. For periodic words, “integral at every finite completion” is **exactly equivalent** to being an integer Collatz cycle. Thus the desired local-integrality exclusion is not an easier lemma implying cycle exclusion; it is another formulation of cycle exclusion.

The recent Hydra/numen preprint defines numens from finite affine compositions and then extends them separately to completions in which the corresponding limits converge. It explicitly notes that a fully rigorous adelic formulation remains future work. citeturn959590view0turn959590view1turn247946view0

What follows is a complete proof of the strongest correct theorem obtainable from this approach, followed by explicit counterexamples to the missing correspondence.

---

## 1. The numen attached to a binary word

Use the shortened Collatz map

\[
T(n)=
\begin{cases}
n/2,&n\equiv0\pmod2,\\[1mm]
(3n+1)/2,&n\equiv1\pmod2.
\end{cases}
\]

Write its two affine branches as

\[
H_0(x)=\frac{x}{2},
\qquad
H_1(x)=\frac{3x+1}{2}.
\]

Let

\[
\varepsilon=(\varepsilon_0,\varepsilon_1,\ldots)\in\{0,1\}^{\mathbb N},
\qquad
s_j=\sum_{i=0}^{j-1}\varepsilon_i,
\qquad
s_0=0.
\]

For a prefix of length \(N\), define

\[
M_N(\varepsilon)=\frac{3^{s_N}}{2^N}
\]

and

\[
\chi_N(\varepsilon)
=
\sum_{j=0}^{N-1}
\varepsilon_j\,\frac{3^{s_j}}{2^{j+1}}.
\]

A direct induction gives the fundamental affine identity

\[
H_{\varepsilon_0}\circ H_{\varepsilon_1}\circ\cdots
\circ H_{\varepsilon_{N-1}}(x)
=
\chi_N(\varepsilon)+M_N(\varepsilon)x.
\tag{1}
\]

The order here is important: the least significant symbolic digit describes the **last** branch of an ordinary forward trajectory. Thus the infinite numen code naturally parametrizes backward paths.

Suppose the \(1\)'s of \(\varepsilon\) occur at positions

\[
d_1<d_2<d_3<\cdots.
\]

Then

\[
\chi_N(\varepsilon)\longrightarrow
\chi_3(\varepsilon)
=
\sum_{r=1}^{\infty}
\frac{3^{r-1}}{2^{d_r+1}}
\quad\text{in }\mathbb Q_3.
\tag{2}
\]

Indeed, the \(r\)-th nonzero summand has \(3\)-adic valuation \(r-1\). Consequently,

\[
\boxed{\chi_3(\varepsilon)\in\mathbb Z_3}
\tag{3}
\]

for every infinite binary word; if there are only finitely many \(1\)'s, the sum is finite and is still in \(\mathbb Z_3\).

Thus the natural \(3\)-adic integrality test is not restrictive: **every word passes it**.

---

## 2. Exact integer-fiber theorem

The following is the correct dynamical meaning of an ordinary positive integer numen value.

### Theorem 1 — Integer numen fibers are infinite backward orbits

Let \(\varepsilon\) contain infinitely many \(1\)'s, and let \(n\in\mathbb N\). Then

\[
\chi_3(\varepsilon)=n
\tag{4}
\]

if and only if the recursion

\[
x_0=n,
\qquad
x_{j+1}=
\begin{cases}
2x_j,&\varepsilon_j=0,\\[2mm]
\dfrac{2x_j-1}{3},&\varepsilon_j=1
\end{cases}
\tag{5}
\]

produces positive integers for every \(j\).

In that case,

\[
T(x_{j+1})=x_j
\tag{6}
\]

for every \(j\). Hence \(\varepsilon\) is precisely an infinite backtracing parity vector starting at \(n\).

### Proof

Let \(\sigma\) denote the left shift, and put

\[
x_j=\chi_3(\sigma^j\varepsilon).
\]

Splitting off the first numen digit gives the functional equations

\[
x_j=
\begin{cases}
x_{j+1}/2,&\varepsilon_j=0,\\[1mm]
(3x_{j+1}+1)/2,&\varepsilon_j=1.
\end{cases}
\tag{7}
\]

Assume first that \(x_0=n\in\mathbb N\).

If \(\varepsilon_j=0\), then \(x_{j+1}=2x_j\), so \(x_{j+1}\) is a positive integer.

If \(\varepsilon_j=1\), then

\[
x_{j+1}=\frac{2x_j-1}{3}.
\]

But \(x_{j+1}\in\mathbb Z_3\), because every shifted numen lies in \(\mathbb Z_3\). Therefore \(2x_j-1\) is divisible by \(3\) as an ordinary integer. It follows that \(x_{j+1}\) is an ordinary positive integer. Induction proves (5), and the parity of the two displayed preimages proves (6).

Conversely, suppose (5) always produces positive integers. Iterating (7), or applying (1), gives

\[
n=\chi_N(\varepsilon)+M_N(\varepsilon)x_N.
\tag{8}
\]

Because \(\varepsilon\) has infinitely many \(1\)'s,

\[
s_N\longrightarrow\infty.
\]

Since \(x_N\) is an integer,

\[
v_3\!\left(M_Nx_N\right)
=
s_N+v_3(x_N)
\geq s_N
\longrightarrow\infty.
\]

Hence \(M_Nx_N\to0\) in \(\mathbb Q_3\). Passing to the \(3\)-adic limit in (8) gives

\[
\chi_3(\varepsilon)=n.
\]

This proves the theorem. \(\square\)

This interpretation agrees with the established theory of infinite backtracing parity vectors in the \(3x+1\) graph. In particular, previous work distinguishes finite, immediately periodic, and irrational backtracing codes and explicitly constructs irrational examples. citeturn191681view0turn191681view1turn696963view0

---

## 3. The genuine nondecay-exclusion theorem

We now obtain the strongest successful part of Approach 68.

### Theorem 2 — Positive integer fibers have strictly decaying multiplier

If

\[
\chi_3(\varepsilon)=n\in\mathbb N,
\]

then

\[
\boxed{\frac{3^{s_N}}{2^N}\longrightarrow0.}
\tag{9}
\]

Equivalently,

\[
N\log 2-s_N\log 3\longrightarrow+\infty.
\tag{10}
\]

### Proof

By Theorem 1, there are positive integers \(x_N\) satisfying (8):

\[
n=\chi_N+M_Nx_N.
\]

Therefore

\[
0\leq\chi_N<n
\tag{11}
\]

for every \(N\).

At a position \(d_r\) occupied by a \(1\),

\[
\chi_{d_r+1}-\chi_{d_r}
=
\frac{3^{r-1}}{2^{d_r+1}}
=
\frac{M_{d_r}}{2}.
\tag{12}
\]

The left side consists of terms of a bounded increasing real series, by (11). Hence

\[
\frac{M_{d_r}}{2}\longrightarrow0,
\qquad\text{so}\qquad
M_{d_r}\longrightarrow0.
\tag{13}
\]

Between consecutive \(1\)'s, the multiplier is first multiplied by \(3/2\) and then repeatedly divided by \(2\). More explicitly, if

\[
d_r<N\leq d_{r+1},
\]

then

\[
M_N
=
\frac32\,M_{d_r}\,2^{-(N-d_r-1)}
\leq
\frac32 M_{d_r}.
\tag{14}
\]

Together with (13), this proves \(M_N\to0\). \(\square\)

Thus we obtain the unconditional exclusion

\[
\boxed{
\limsup_{N\to\infty}\frac{3^{s_N}}{2^N}>0
\quad\Longrightarrow\quad
\chi_3(\varepsilon)\notin\mathbb N.
}
\tag{15}
\]

This is a real theorem. It rules out every multiplier-nondecaying word as an ordinary positive integer numen fiber.

It does **not**, however, say that such a word is nonintegral in \(\mathbb Q_3\): equation (3) says the opposite. Its numen is still a perfectly integral \(3\)-adic integer; it is merely not a positive **diagonal** integer.

---

## 4. Irrational integer-valued numens are abundant

A central claim in the recent numen correspondence is that an irrational symbolic code with an integral numen value should give a divergent trajectory. That implication is false for the Collatz numen.

In fact, every positive integer not divisible by \(3\) has continuum many irrational numen codes.

### Theorem 3 — Continuum-sized irrational fibers

For every \(n\in\mathbb N\) with \(3\nmid n\), there are continuum many irrational

\[
z\in\mathbb Z_2\setminus\mathbb Q
\]

such that

\[
\chi_3(z)=n.
\tag{16}
\]

### Proof

Start with \(x_0=n\). Suppose \(3\nmid x_r\).

Because \(2\) generates the unit group modulo \(9\), there is an

\[
a_r\in\{0,1,\ldots,5\}
\]

such that

\[
2^{a_r}x_r\equiv2\pmod9.
\]

Choose

\[
t_r=a_r+6r+6b_r,
\qquad b_r\in\{0,1\}.
\tag{17}
\]

Then also

\[
2^{t_r}x_r\equiv2\pmod9.
\]

Append to the symbolic word a block \(0^{t_r}1\), and define

\[
x_{r+1}
=
\frac{2^{t_r+1}x_r-1}{3}.
\tag{18}
\]

The numerator in (18) is \(3\pmod9\), so \(x_{r+1}\) is a positive integer satisfying

\[
x_{r+1}\equiv1\pmod3.
\]

The construction may therefore be repeated indefinitely.

The concatenated word

\[
\varepsilon
=
0^{t_1}1\,0^{t_2}1\,0^{t_3}1\cdots
\tag{19}
\]

is an infinite backtracing word from \(n\). By Theorem 1,

\[
\chi_3(\varepsilon)=n.
\]

Because \(t_r\to\infty\), the binary word has infinitely many \(1\)'s and unbounded gaps between them. It cannot be eventually periodic, so the associated \(2\)-adic integer is irrational.

Finally, each independent binary choice \(b_r\in\{0,1\}\) gives a different word, producing continuum many such codes. \(\square\)

### Explicit example over the trivial basin

Take \(n=1\). Choose

\[
t_1=7,
\qquad
x_1=\frac{2^8-1}{3}=85,
\]

and then

\[
t_2=17,
\qquad
x_2=\frac{2^{18}\cdot85-1}{3}=7\,427\,413.
\]

The code begins

\[
0^7\,1\,0^{17}\,1\cdots.
\]

After the first two \(1\)'s, identity (8) is

\[
1
=
\frac1{2^8}
+
\frac3{2^{26}}
+
\frac{3^2}{2^{26}}\cdot7\,427\,413.
\tag{20}
\]

At the \(r\)-th completed block, the residual term has \(3\)-adic valuation \(r\), so it tends to zero in \(\mathbb Q_3\). Hence

\[
\chi_3(\varepsilon)=1.
\]

Yet \(1\) is periodic under Collatz, not divergent.

Moreover, for the choices above the same formal series converges in \(\mathbb R\) to

\[
\frac1{2^8}
+
\frac3{2^{26}}
+
\frac9{2^{46}}+\cdots
<\frac1{128},
\tag{21}
\]

not to \(1\). Thus even when a word has both a real and a \(3\)-adic numen sum, those sums need not be the same global number.

There is also an independently known example: the greedy backtracing vector \(V_4\) is irrational, while its numen value is \(4\); nevertheless

\[
4\mapsto2\mapsto1\mapsto2
\]

is preperiodic rather than divergent. citeturn696963view0

The 2026 preprint’s Correspondence Principle II states that an irrational code with an integral numen value gives a divergent point. Its proof sketch excludes preperiodicity by invoking Part I, but Part I establishes only that a periodic point has **some** rational numen code. It does not imply that every code in the same numen fiber is rational. Theorem 3 supplies explicit noninjective fibers, so that inference cannot be used. citeturn423697view0turn423697view1

---

## 5. Periodic words and local integrality

Now let

\[
w=(\varepsilon_0,\ldots,\varepsilon_{k-1})
\]

be a finite block containing \(s\geq1\) ones, and consider the purely periodic word \(w^\infty\).

Define

\[
C(w)
=
\sum_{j=0}^{k-1}
\varepsilon_j\,3^{s_j}2^{k-j-1},
\qquad
D(w)=2^k-3^s.
\tag{22}
\]

Then

\[
\chi_k(w)=\frac{C(w)}{2^k},
\qquad
M_k(w)=\frac{3^s}{2^k}.
\]

In \(\mathbb Q_3\), the repeated-block series is geometric, because

\[
\left|M_k(w)\right|_3=3^{-s}<1.
\]

Therefore

\[
\chi_3(w^\infty)
=
\frac{\chi_k(w)}{1-M_k(w)}
=
\boxed{\frac{C(w)}{2^k-3^s}}.
\tag{23}
\]

The same rational expression gives the natural algebraic continuation at every completion.

Observe that

\[
\gcd(D(w),6)=1:
\tag{24}
\]

\(D(w)\) is odd, and modulo \(3\) it equals \(2^k\).

### Theorem 4 — Periodic local integrality is exactly cycle integrality

For a periodic word \(w^\infty\) containing a \(1\), the following are equivalent:

1. \(C(w)/D(w)\in\mathbb Z_p\) for every finite prime \(p\);
2. \(D(w)\mid C(w)\);
3. \(C(w)/D(w)\) is an ordinary integer;
4. the branches encoded by \(w\) form an integer Collatz cycle.

If additionally \(D(w)>0\), the cycle is positive.

### Proof

For any rational number \(a/b\) in lowest terms,

\[
a/b\in\mathbb Z_p\quad\text{for every prime }p
\]

if and only if \(b=1\). This proves the equivalence of 1–3.

Assume now that

\[
x_0=\frac{C(w)}{D(w)}
\]

is an integer. Let

\[
x_j=\chi_3(\sigma^j w^\infty).
\]

Each \(x_j\) is rational, because the corresponding code is periodic, and each lies in \(\mathbb Z_3\). The functional equations give

\[
x_{j+1}=
\begin{cases}
2x_j,&\varepsilon_j=0,\\[2mm]
\dfrac{2x_j-1}{3},&\varepsilon_j=1.
\end{cases}
\tag{25}
\]

Starting from the integer \(x_0\), induction shows that every \(x_j\) is an ordinary integer: in the second case, membership of \(x_{j+1}\) in \(\mathbb Z_3\) forces divisibility by \(3\).

Since \(w^\infty\) is \(k\)-periodic,

\[
x_{j+k}=x_j.
\]

Furthermore,

\[
T(x_{j+1})=x_j.
\]

Thus the \(x_j\)'s form an integer Collatz cycle. If \(D(w)>0\), then \(C(w)>0\) implies \(x_0>0\), and every member of the cycle is positive.

Conversely, reversing the parity block of any integer Collatz cycle gives a periodic word whose value (23) is the corresponding cycle element, hence an integer. \(\square\)

Consequently, the desired assertion

\[
\text{“Every nontrivial positive periodic word is nonintegral somewhere”}
\tag{26}
\]

is precisely the assertion

\[
\text{“There is no nontrivial positive Collatz cycle.”}
\tag{27}
\]

No simplification has occurred. The unknown divisibility

\[
2^k-3^s\nmid C(w)
\tag{28}
\]

is the usual cycle-exclusion problem in numen notation.

Because of (24), neither the \(2\)-adic nor the \(3\)-adic completion can detect such a denominator. Any detecting prime must satisfy

\[
p\geq5,
\qquad
v_p(2^k-3^s)>v_p(C(w)).
\tag{29}
\]

Showing that such a prime always exists is exactly what must still be proved.

The unrestricted version is false even more directly. For example,

\[
w=1
\]

has

\[
\frac{C(w)}{D(w)}=\frac1{2-3}=-1,
\]

and

\[
w=011
\]

has

\[
\frac{C(w)}{D(w)}=\frac5{8-9}=-5,
\]

corresponding to the negative cycle

\[
-5\mapsto-7\mapsto-10\mapsto-5.
\]

Thus positivity is essential.

---

## 6. Why there is no simultaneous local test for aperiodic words

For an infinite word with \(1\)'s at \(d_r\), its nonzero numen terms are

\[
a_r=\frac{3^{r-1}}{2^{d_r+1}}.
\]

Their behavior at the finite completions is:

\[
|a_r|_3=3^{-(r-1)}\longrightarrow0;
\]

\[
|a_r|_2=2^{d_r+1}\longrightarrow\infty;
\]

and, for every prime \(p\geq5\),

\[
|a_r|_p=1.
\]

Therefore the raw numen series

\[
\sum_r a_r
\]

converges in \(\mathbb Q_3\), but does not converge in \(\mathbb Q_2\) or in any \(\mathbb Q_p\) with \(p\geq5\).

If the word is multiplier-nondecaying,

\[
\limsup M_N>0,
\]

its real terms also fail to tend to zero along a subsequence, so the real numen series diverges as well.

Thus a nondecaying aperiodic word does not possess a family of values

\[
(X_\infty,X_2,X_3,X_5,\ldots)
\]

whose local integrality can be checked. It normally has only the \(3\)-adic value, and that value is automatically in \(\mathbb Z_3\).

One could try to introduce separate regularizations at the other places, but they would not automatically form the embeddings of one common rational or algebraic number. This is exactly the compatibility issue that a genuinely adelic numen would have to solve; the current formalism acknowledges that such a fully rigorous adelic construction has not yet been supplied. citeturn247946view0

Even membership in every finite local integer ring would not by itself be enough. The profinite ring

\[
\widehat{\mathbb Z}=\prod_p\mathbb Z_p
\]

contains many non-diagonal elements, and the ordinary integers are dense in it. For example,

\[
N!\longrightarrow0
\quad\text{in every }\mathbb Z_p,
\]

while

\[
N!\longrightarrow+\infty
\quad\text{in }\mathbb R.
\]

Finite-place integrality therefore cannot supply the missing archimedean nonescape bound.

---

## 7. Final status of Approach 68

The approach yields the rigorous theorem

\[
\boxed{
\chi_3(\varepsilon)\in\mathbb N
\quad\Longrightarrow\quad
\varepsilon\text{ is a positive backward Collatz path and }
\frac{3^{s_N}}{2^N}\to0.
}
\tag{30}
\]

This completely excludes multiplier-nondecaying words from the positive integer fibers of the \(3\)-adic numen.

But it does not complete Collatz, because:

- an irrational positive integer numen value does **not** imply a divergent forward trajectory;
- periodic all-place integrality is exactly equivalent to the existence of an integer cycle;
- aperiodic words do not naturally define one common value at all completions;
- local integrality gives a profinite integer, not necessarily a diagonal ordinary integer;
- there is no proved bridge taking a divergent forward orbit to a nondecaying word whose numen is a fixed positive ordinary integer.

A numen proof would therefore require an additional **adelic diagonalization and height theorem**: every exceptional forward orbit would have to produce a compatible multi-place numen value coming from one positive rational integer, while retaining nondecaying multiplier. Theorem 2 would then give a contradiction. The explicit irrational fibers above show that this diagonalization cannot follow merely from symbolic irrationality or local integrality.

Accordingly, Approach 68 provides a genuine backward-drift theorem and a precise local-global reformulation of cycles, but the proposed central correspondence is false and the remaining periodic condition is equivalent to the conjecture it was meant to prove.