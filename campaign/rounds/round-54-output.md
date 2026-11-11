model: GPT-5.6 Pro (Chat mode)
round: 54 -- approach 49, Baker theory for repeated approximate returns
front: proof
sent: 2026-08-15T20:16Z
worked: 51m 53s

---

# Baker rigidity for repeated Collatz returns

After carrying this program through, the honest conclusion is:

> **Baker theory plus nesting yields a strong collective exclusion theorem, but it does not complete the Collatz conjecture.**

The obstruction is precise. Baker theory controls a contractive coefficient block once that block is also a real near-return. Two such blocks satisfy a much stronger determinant identity. However, a hypothetical divergent orbit is not presently known to produce sufficiently short contractive near-returns. In fact, there are arbitrarily long genuine finite Collatz trajectories satisfying every coefficient-barrier condition while producing no such returns. The missing ingredient is therefore an ordinary-integer/2-adic synchronization theorem, not a sharper lower bound for one logarithmic form.

Below is the complete valid argument and the exact theorem that would finish the proof.

---

## 1. Exact logarithmic form of a return

Use the accelerated map on positive odd integers

\[
U(x)=\frac{3x+1}{2^{v_2(3x+1)}}.
\]

Let

\[
x_{i+1}=U(x_i),\qquad
a_i=v_2(3x_i+1).
\]

For a block beginning at \(x_s=X\) and ending at \(x_{s+r}=Y\), put

\[
A=\sum_{i=s}^{s+r-1}a_i,
\qquad
M=\min_{s\leq i<s+r}x_i.
\]

The usual affine identity is

\[
2^A Y=3^rX+C,
\qquad
C>0.
\]

More explicitly, valuation words determine exact affine maps and exact realization classes modulo \(2^{A+1}\). fileciteturn6file0L30-L76

At each step,

\[
\frac{x_{i+1}}{x_i}
=
\frac{3}{2^{a_i}}
\left(1+\frac1{3x_i}\right).
\]

Therefore

\[
\frac YX
=
\frac{3^r}{2^A}
\prod_{i=s}^{s+r-1}
\left(1+\frac1{3x_i}\right).
\]

Define

\[
\Lambda=A\log 2-r\log 3
\]

and

\[
E=\sum_{i=s}^{s+r-1}
\log\left(1+\frac1{3x_i}\right).
\]

Taking logarithms gives the exact return identity

\[
\boxed{\Lambda=E-\log(Y/X).}
\tag{1}
\]

The coefficient \(3^r/2^A\) is contractive precisely when \(\Lambda>0\).

Let

\[
\rho=\log^+\frac XY
=
\max\left(0,\log\frac XY\right).
\]

Since \(\log(1+u)\leq u\),

\[
E\leq \frac r{3M}.
\]

Thus every contractive block satisfies

\[
\boxed{
0<\Lambda
\leq
\frac r{3M}+\rho.
}
\tag{2}
\]

For an **upper return**, meaning \(Y\geq X\), this simplifies to

\[
\boxed{
0< A\log2-r\log3
\leq \frac r{3M}.
}
\tag{3}
\]

More generally, if \(Y\geq X-\Delta\), then

\[
\rho
\leq
\log\left(1+\frac{\Delta}{Y}\right)
\leq \frac{\Delta}{M},
\]

and hence

\[
0<\Lambda\leq\frac{r/3+\Delta}{M}.
\tag{4}
\]

This is the exact point where a real near-return creates a small linear form.

---

## 2. What one application of Baker theory gives

Rozier and Terracol use the following effective form of a theorem of Rhin:

\[
\left|u_0+u_1\log2+u_2\log3\right|
\geq H^{-13.3},
\qquad
H=\max(|u_1|,|u_2|)\geq2.
\tag{5}
\]

citeturn417996search0

Apply this with

\[
u_0=0,\qquad u_1=A,\qquad u_2=-r.
\]

For an upper return, (3) gives \(\Lambda\leq r/3\). Consequently,

\[
A\log2=r\log3+\Lambda
\leq r\left(\log3+\frac13\right),
\]

so \(A<3r\). Therefore \(H\leq3r\), and Rhin’s bound gives

\[
(3r)^{-13.3}\leq \Lambda\leq\frac r{3M}.
\]

Hence:

### Theorem 1 — isolated-return Baker bound

Every contractive upper return of length \(r\) and block floor \(M\) satisfies

\[
\boxed{
M\leq 3^{12.3}r^{14.3}.
}
\tag{6}
\]

Equivalently,

\[
r\gg M^{1/14.3}.
\tag{7}
\]

This is unconditional.

It says that a large orbit value cannot participate in a very short paradoxical return. But a polynomial lower bound on \(r\) does not itself exclude a divergent orbit: the orbit may wait an arbitrarily long time before returning.

Even replacing \(13.3\) by an essentially optimal irrationality exponent would only move the natural threshold toward \(r\asymp\sqrt M\). It would not by itself force nonexistence.

---

## 3. Two small forms are much more rigid than one

The main collective gain does not actually require a second invocation of Baker theory.

Consider two contractive near-return blocks with data

\[
(A_i,r_i,M_i,\rho_i),\qquad i=1,2,
\]

and put

\[
\Lambda_i=A_i\log2-r_i\log3,
\qquad
\varepsilon_i=\frac{r_i}{3M_i}+\rho_i.
\]

Then

\[
0<\Lambda_i\leq\varepsilon_i.
\]

Form the integer determinant

\[
D=A_1r_2-A_2r_1.
\]

The \(\log3\)-terms cancel exactly:

\[
r_2\Lambda_1-r_1\Lambda_2
=
D\log2.
\tag{8}
\]

If \(D\neq0\), then \(|D|\geq1\), and therefore

\[
\log2
\leq |D|\log2
=
|r_2\Lambda_1-r_1\Lambda_2|
\leq r_2\varepsilon_1+r_1\varepsilon_2.
\]

Thus:

### Theorem 2 — collective determinant rigidity

Two contractive near-return blocks with nonproportional coefficient vectors satisfy

\[
\boxed{
\log2
\leq
r_2\left(\frac{r_1}{3M_1}+\rho_1\right)
+
r_1\left(\frac{r_2}{3M_2}+\rho_2\right).
}
\tag{9}
\]

For two upper returns,

\[
\boxed{
\log2
\leq
\frac{r_1r_2}{3}
\left(\frac1{M_1}+\frac1{M_2}\right),
}
\tag{10}
\]

unless

\[
A_1r_2=A_2r_1.
\]

At comparable height \(M\), two genuinely different coefficient directions therefore require

\[
r_1r_2\gg M.
\tag{11}
\]

In particular, two upper returns of lengths \(o(\sqrt M)\) cannot have different ratios \(A_i/r_i\).

This is stronger than applying a one-form Baker bound twice.

---

## 4. An infinite short-return chain is impossible

Suppose there were an infinite sequence of contractive near-return blocks \(I_i\) such that

\[
\frac{\varepsilon_i}{r_i}\longrightarrow0
\tag{12}
\]

and

\[
r_{i+1}\varepsilon_i+r_i\varepsilon_{i+1}
\longrightarrow0.
\tag{13}
\]

By Theorem 2, for all sufficiently large \(i\),

\[
A_ir_{i+1}=A_{i+1}r_i.
\]

Because consecutive vectors are proportional, there are fixed coprime positive integers \(p,q\) and integers \(m_i\geq1\) such that

\[
(A_i,r_i)=m_i(p,q)
\]

for every sufficiently large \(i\). Hence

\[
\Lambda_i
=
m_i(p\log2-q\log3).
\]

Since \(\Lambda_i>0\),

\[
\delta:=p\log2-q\log3>0.
\]

But

\[
\frac{\Lambda_i}{r_i}
=
\frac{\delta}{q}
\leq
\frac{\varepsilon_i}{r_i}
\longrightarrow0,
\]

which is impossible.

Therefore:

### Corollary 3 — exclusion of collectively short returns

There is no infinite chain of contractive near-returns satisfying (12)–(13).

For upper returns, it is enough that

\[
M_i\longrightarrow\infty
\]

and

\[
\boxed{
r_ir_{i+1}
=
o\!\left(\min(M_i,M_{i+1})\right).
}
\tag{14}
\]

So an infinite chain of upper returns at height \(M_i\) cannot have consecutive lengths \(o(\sqrt{M_i})\).

This proves exactly the “collectively impossible” part proposed in the approach.

---

## 5. Continued fractions explain the \(\sqrt M\) threshold

Let

\[
\alpha=\frac{\log3}{\log2}.
\]

For an upper return,

\[
0<
\frac Ar-\alpha
=
\frac{\Lambda}{r\log2}
\leq
\frac1{3M\log2}.
\tag{15}
\]

If

\[
2r^2<3M\log2,
\tag{16}
\]

then

\[
\left|\frac Ar-\alpha\right|<\frac1{2r^2}.
\]

By Legendre’s theorem, the reduced fraction \(A/r\) must be a continued-fraction convergent of \(\alpha\), from above.

Thus returns shorter than roughly \(\sqrt M\) are forced into the sparse set of best rational approximants to \(\log_2 3\). This is consistent with recent computations: the coefficient ratios in the currently known paradoxical examples are convergents, semiconvergents, or one nearby Stern–Brocot mediant. That observation is numerical rather than an all-length theorem, and the authors explicitly do not claim progress on Collatz or the coefficient-stopping-time conjecture. citeturn513292view0

Continued fractions also show why the determinant theorem is close to optimal. Distinct best approximants naturally have determinant \(1\), and their errors occur at the reciprocal-product scale \(1/(r_1r_2)\). Merely having infinitely many related small forms is therefore arithmetically possible.

---

## 6. Consequences for a hypothetical divergent orbit

For the shortcut map, write

\[
q_k=\frac{3^{s_k}}{2^k},
\qquad
h_k=\frac{x_k}{q_k}.
\]

Along a divergent orbit, the reciprocal correction sum converges, \(h_k\) approaches a finite positive limit, and after rebasing at a global minimum of \(q_k\), one obtains

\[
q_k\geq1\quad\text{for all }k,
\qquad
q_k\longrightarrow\infty.
\]

This barrier condition is equivalent to the divergent-orbit alternative, but it does not address nontrivial cycles. fileciteturn6file2L248-L323

At accelerated odd times the global coefficient form is

\[
A_k\log2-k\log3=-\log q_k.
\]

Hence, on the normalized divergent orbit,

\[
A_k\log2-k\log3\longrightarrow-\infty.
\tag{17}
\]

This is crucial:

> The global prefix forms of a divergent barrier orbit are not small positive forms. They eventually become large negative forms.

Therefore Baker theory can be used only after one proves the existence of suitable **local** blocks on which the coefficient contracts while the integer value approximately returns.

There is also a useful tail formulation. Along a divergent orbit let

\[
H=\lim h_k
\]

and define

\[
\eta_s=\log\frac{H}{h_s}.
\]

For every upper return beginning at time \(s\),

\[
0<\Lambda\leq\eta_s,
\tag{18}
\]

because the correction accumulated over the block is at most the entire remaining correction tail.

Consequently every such return of length \(r\) obeys

\[
r\geq \frac13\,\eta_s^{-1/13.3},
\tag{19}
\]

and two nonproportional returns beginning at \(s_1,s_2\) satisfy

\[
\log2\leq r_2\eta_{s_1}+r_1\eta_{s_2}.
\tag{20}
\]

Thus any divergent counterexample must exhibit a severe “return desert”: either contractive upper returns cease to occur, or their lengths grow at least at the scales dictated by (19)–(20).

That is a meaningful structural restriction, but not yet a contradiction.

---

## 7. The recurrence implication is false in the symbolic relaxation

The central missing implication would be:

> A long barrier trajectory arising from one positive integer must contain short contractive approximate returns.

This is not a consequence of coefficient inequalities, nesting, or finite realizability.

Consider the two valuation blocks

\[
u=(1,1,2),
\qquad
v=(1,2,1).
\]

Both have length \(3\), total exponent \(4\), and coefficient

\[
\frac{3^3}{2^4}=\frac{27}{16}>1.
\]

Their prefix coefficients are

\[
u:\quad \frac32,\ \frac94,\ \frac{27}{16},
\]

and

\[
v:\quad \frac32,\ \frac98,\ \frac{27}{16}.
\]

Every prefix coefficient is at least \(1\). Therefore **every concatenation of \(u\) and \(v\) is a barrier word**, and its coefficient grows by \(27/16\) per macroblock.

The exact affine maps are

\[
16U^3(x)=27x+19
\qquad\text{for }u,
\tag{21}
\]

and

\[
16U^3(x)=27x+23
\qquad\text{for }v.
\tag{22}
\]

Every finite valuation word is realized by infinitely many positive odd integers. fileciteturn6file1L160-L183

Because every prefix coefficient is at least \(1\) and every affine intercept is positive, each finite realization remains strictly above its starting value throughout the prescribed word.

Now inspect an arbitrary factor of an infinite \(u/v\)-concatenation. It consists of

- a suffix of one macroblock,
- some number \(N\) of complete macroblocks,
- a prefix of one macroblock.

Its logarithmic coefficient form is

\[
\Lambda
=
N\log\frac{16}{27}+\beta,
\tag{23}
\]

where \(\beta\) belongs to a fixed finite set determined by the two boundary fragments. Since

\[
\log\frac{16}{27}<0,
\]

the condition \(\Lambda>0\) forces \(N\) to be bounded. Consequently:

\[
\{\Lambda>0:\Lambda\text{ occurs in a factor}\}
\]

is a finite set and therefore has a positive minimum.

It follows that these arbitrarily long barrier trajectories have **no logarithmic forms tending to zero from above**. By choosing their positive realization sufficiently large, none of their contractive factors can be an upper return, because (3) would require a fixed positive \(\Lambda\) to be at most \(r/(3M)\).

So there are:

> Arbitrarily long genuine positive Collatz trajectory segments, with arbitrarily large starting values, satisfying every prefix barrier and containing no high-level contractive upper return.

The periodic ray \(u^\infty\) corresponds to the negative rational fixed point

\[
16x=27x+19,
\qquad
x=-\frac{19}{11}.
\]

An aperiodic \(u/v\)-ray produces a nested \(2\)-adic realization. The issue is whether such a nested realization can stabilize to one positive ordinary integer. A \(2\)-adic ray represents a nonnegative ordinary integer precisely when its least residue representatives eventually stabilize. fileciteturn3file4L183-L192

Thus the symbolic example does not disprove Collatz. It proves something more targeted:

> **No argument using only coefficient forms, finite nesting, and arbitrarily long positive realizations can force the required repeated approximate returns.**

One must exploit the fact that all depths arise from one fixed ordinary integer.

---

## 8. Why existing “infinitely many paradoxical returns” do not close the gap

Rozier and Terracol proved that if an integer \(n\) has infinite stopping time, then continued-fraction approximations to \(\log 2/\log 3\) produce infinitely many paradoxical sequences starting from integers of the form

\[
2^k n.
\]

Their construction first performs \(k\) halving steps and then follows the orbit of \(n\). citeturn494327view0

This gives infinitely many small forms, but it does not satisfy the high-floor hypothesis needed above:

\[
2^kn,\ 2^{k-1}n,\ldots,n,\ldots
\]

has block minimum at most \(n\), not \(2^kn\).

Therefore one cannot insert the growing first term \(2^kn\) into the bound

\[
\Lambda\leq\frac r{3M}.
\]

The correct \(M\) remains bounded by \(n\). The continued-fraction forms, typically of order \(1/r\), are entirely compatible with Rhin’s lower bound \(r^{-13.3}\).

This is exactly how infinitely many individually allowed approximations evade Baker theory.

---

## 9. Repeated cores are the part Baker theory does solve

When recurrence has bounded symbolic complexity, the method becomes effective.

For a fixed repeated core \(v^N\), the affine matrix can be diagonalized explicitly. Cyclotomic factors amplify the changing determinant, and a fixed or height-limited exit produces an exponentially small nonzero form in \(\log2,\log3\). Baker theory then gives an effective bound on \(N\). The same framework proves rational-center \(2\)-adic height growth and excludes pure powers and fixed-tail, bounded-defect exits. fileciteturn2file1L339-L414

So the approach succeeds for:

\[
v^N,
\qquad
v^Nu
\quad\text{with fixed }u,
\]

and related bounded-grammar families.

The unresolved case is an aperiodic sequence with a moving exit and unbounded carry complexity. There, the affine numerators change dimension with the block length, so one no longer has a fixed algebraic number to which a standard Baker estimate applies.

---

## 10. Cycles remain logically separate

For a positive accelerated cycle, \(Y=X\), and (1) gives

\[
\Lambda=E>0.
\]

Repeating the cycle \(N\) times produces

\[
(A_N,r_N)=N(A,r),
\qquad
\Lambda_N=N\Lambda.
\]

All coefficient vectors are proportional, so every determinant in Theorem 2 is zero. Moreover, the form becomes larger rather than smaller.

Thus collective near-return theory does not eliminate positive cycles.

Baker and continued-fraction methods have been very effective for cycles of bounded structural complexity; Simons and de Weger developed the general \(m\)-cycle framework, and later work excludes \(m\)-cycles through \(m=91\). It still does not constitute an all-cycle exclusion theorem. citeturn675823search4turn675823search1

---

## 11. The exact conditional completion theorem

The Baker-return route would become a full proof with the following additional result.

### Return-synchronization hypothesis

Every divergent positive Collatz orbit contains contractive upper-return blocks \(I_i\) with lengths \(r_i\) and floors \(M_i\) such that

\[
M_i\longrightarrow\infty
\]

and

\[
r_ir_{i+1}
\left(
\frac1{M_i}+\frac1{M_{i+1}}
\right)
\longrightarrow0.
\tag{24}
\]

### Theorem 4 — conditional Collatz completion

Assume:

1. the return-synchronization hypothesis;
2. there is no nontrivial positive Collatz cycle.

Then every positive integer reaches \(1\).

### Proof

A nonterminating positive orbit is either bounded or unbounded.

If bounded, determinism forces repetition, hence a positive cycle, contradicting assumption 2.

If unbounded and nonperiodic, every bounded set is eventually left permanently, so the orbit tends to infinity. Assumption 1 supplies upper returns satisfying (24). But Corollary 3 excludes exactly such a sequence. Therefore no unbounded nonterminating orbit exists.

Hence every orbit terminates in the trivial cycle. \(\square\)

---

## 12. Final verdict

Approach 49 produces the following rigorous advances:

\[
\boxed{
M\leq3^{12.3}r^{14.3}
}
\]

for one contractive upper return, and the substantially stronger collective relation

\[
\boxed{
\log2
\leq
\frac{r_1r_2}{3}
\left(\frac1{M_1}+\frac1{M_2}\right)
}
\]

for two nonproportional upper returns.

It follows that no divergent orbit can possess an infinite chain of contractive upper returns with consecutive lengths \(o(\sqrt M)\). Repeated fixed cores and bounded exits are also effectively finite by Baker theory.

But this is not a full proof of Collatz. The proposed final inference—

\[
\text{divergence}
\Longrightarrow
\text{infinitely many collectively short contractive near-returns}
\]

—is neither presently proved nor a consequence of coefficients and nesting. The explicit \(u/v\) construction shows that the relaxed symbolic system supports arbitrarily long positive barrier trajectories with no such returns.

The precise missing theorem is therefore:

\[
\boxed{
\begin{minipage}{0.86\linewidth}
A barrier valuation ray whose nested \(2\)-adic realization is one fixed
positive ordinary integer must either become periodic or generate
contractive upper returns satisfying the collective shortness condition.
\end{minipage}
}
\]

Proving that carry-sensitive ordinary-integer synchronization theorem, together with all-cycle exclusion, would complete the Baker-return route. Recent work on paradoxical sequences likewise treats the coefficient-stopping-time and Collatz conclusions as unresolved, rather than supplying this synchronization step. citeturn513292view0