model: GPT-5.6 Pro (Chat mode)
round: 74 -- approach 69, A 2-3 Tauberian decorrelation theorem
front: proof
sent: 2026-08-16T15:46Z
worked: 118m 47s

---

# Round 69 — outcome

I do not have a valid full proof of the Collatz conjecture from this approach. The decisive obstruction is an exact identity, not merely a missing estimate:

> **Conditioned on a valuation word, its long \(2\)-adic seed cylinder and its long \(3\)-adic endpoint cylinder are perfectly correlated.**

The correlation is exactly \(0\) or \(1\), rather than approximately \(3^{-r}\). After subtracting the trivial all-ones ray, one can formulate a corrected, target-specific Tauberian theorem that would indeed make the number of compatible critical prefixes fall below one. But at the strength required, that theorem is equivalent to the unresolved marked-carry exclusion, and it still would not supply the separate synchronization step needed to connect an arbitrary hypothetical counterexample orbit to those prefixes.

What follows is the exact theorem, the strongest valid Tauberian reduction, and the precise point where the proof remains open.

---

## 1. Exact valuation cylinders

Use the accelerated odd Collatz map

\[
U(n)=\frac{3n+1}{2^{v_2(3n+1)}}.
\]

For a valuation word

\[
w=(a_0,\ldots ,a_{r-1}),\qquad a_i\ge 1,
\]

write

\[
A_0=0,\qquad A_k=\sum_{i<k}a_i,
\]

and define

\[
C_0=0,\qquad C_{k+1}=3C_k+2^{A_k}.
\]

Then every realization of the first \(k\) letters satisfies

\[
2^{A_k}U^k(n)=3^k n+C_k. \tag{1}
\]

Put \(A=A_r\), \(C=C_r\), and \(X=U^r(n)\).

### Exact seed cylinder

The condition that all \(r\) valuations are exact is equivalent to

\[
3^r n+C\equiv 2^A\pmod {2^{A+1}}.
\]

Consequently, \(w\) is realized by exactly one odd residue class

\[
n\equiv
\alpha_w:=3^{-r}(2^A-C)
\pmod {2^{A+1}}. \tag{2}
\]

Every sufficiently large positive member of this class realizes \(w\); finite valuation words therefore have no finite-depth integrality defect.

### Exact endpoint cylinder

Reducing (1) modulo \(3^r\) gives

\[
X\equiv
\beta_w:=C\,2^{-A}
\pmod {3^r}. \tag{3}
\]

More strongly, for one realization \(n_0\) with endpoint \(X_0\),

\[
U^r\!\left(n_0+2^{A+1}t\right)
=
X_0+2\cdot3^r t. \tag{4}
\]

Thus the branch maps its exact dyadic seed cylinder bijectively onto one odd endpoint cylinder modulo \(2\cdot3^r\). This exact two-prime transport was already isolated in the project’s macro-bridge analysis. fileciteturn13file4L137-L210

---

## 2. The proposed decorrelation theorem is false

Let

\[
\mathcal C_2(w)=
\alpha_w+2^{A+1}\mathbb Z
\]

be the seed cylinder. Consider the distinguished terminal endpoint condition

\[
X\equiv-1\pmod{3^r}.
\]

By (3), its indicator is constant on the whole seed cylinder:

\[
\mathbf 1_{\{U^r(n)\equiv-1\ (3^r)\}}
=
\mathbf 1_{\{C+2^A\equiv0\ (3^r)\}}
\qquad(n\in\mathcal C_2(w)). \tag{5}
\]

Therefore the conditional density is

\[
\lim_{N\to\infty}
\frac{
\#\{n\le N:n\in\mathcal C_2(w),\
U^r(n)\equiv-1\pmod{3^r}\}
}{
\#\{n\le N:n\in\mathcal C_2(w)\}
}
=
\begin{cases}
1,&3^r\mid C+2^A,\\
0,&3^r\nmid C+2^A.
\end{cases} \tag{6}
\]

It is not \(3^{-r}+o(1)\).

The same conclusion survives every ordinary Tauberian smoothing. For any compactly supported test function \(\phi\),

\[
\begin{aligned}
&\sum_n
\phi(n/N)\,
\mathbf 1_{\mathcal C_2(w)}(n)\,
\mathbf 1_{\{U^r(n)\equiv-1\ (3^r)\}}
\\
&\qquad =
\mathbf 1_{\{3^r\mid C+2^A\}}
\sum_n
\phi(n/N)\,
\mathbf 1_{\mathcal C_2(w)}(n).
\end{aligned} \tag{7}
\]

No summation method can manufacture a factor \(3^{-r}\), because the endpoint predicate is already deterministic after \(w\) is fixed.

### Exact conductor drop

More generally, impose

\[
X\equiv b\pmod{3^s}.
\]

From (1),

\[
3^r n\equiv 2^A b-C\pmod{3^s}. \tag{8}
\]

There are two cases.

When \(s\le r\), this condition is either true for every seed in \(\mathcal C_2(w)\) or false for every seed. It costs no additional seed congruence.

When \(s>r\), compatibility first requires

\[
3^r\mid 2^A b-C,
\]

and then the seed must satisfy only

\[
n\equiv
\frac{2^A b-C}{3^r}
\pmod{3^{s-r}}. \tag{9}
\]

Thus endpoint precision \(3^s\) costs only

\[
3^{(s-r)_+}
\]

of additional seed conductor. In particular, the terminal condition has \(s=r\), so it costs **zero excess ternary digits**.

This is the exact reason a direct \(2\)-versus-\(3\) independence theorem cannot work.

---

## 3. The unavoidable equality ray

For

\[
w=1^r,
\]

one has

\[
A=r,\qquad
C=3^r-2^r,
\]

and hence

\[
C+2^A=3^r. \tag{10}
\]

Every seed

\[
n=2^{r+1}t-1
\]

realizes \(1^r\), and

\[
U^r(n)=2\cdot3^r t-1. \tag{11}
\]

Therefore

\[
3^r\mid U^r(n)+1
\]

for every \(r\). There are integers maximally localized in the dyadic word cylinder and in the deepest terminal ternary cylinder at every scale.

Any viable theorem must first subtract this ray.

A theorem uniform in the endpoint target is still impossible after that subtraction. For the accelerated \(3x-1\) map,

\[
5\xrightarrow{\,1\,}7\xrightarrow{\,2\,}5,
\]

so \((1,2)^N\) gives arbitrarily deep barrier words terminal at target \(5\). The theorem must therefore be specific not merely to the prime pair \((2,3)\), but to the particular component rooted at target \(1\).

---

## 4. The corrected Tauberian formulation

Let

\[
\alpha=\log_2 3,\qquad
\beta=\alpha-1.
\]

Define the critical or barrier language

\[
\mathcal B_r
=
\left\{
w=(a_0,\ldots,a_{r-1}):
A_k<\alpha k\quad(1\le k\le r)
\right\}. \tag{12}
\]

For each word put

\[
D_w=C_w+2^{A(w)}.
\]

The number relevant to the proposal is

\[
E_r=
\#\left\{
w\in\mathcal B_r\setminus\{1^r\}:
D_w\equiv0\pmod{3^r}
\right\}. \tag{13}
\]

The intended heuristic is that the centers \(D_w\bmod3^r\) should behave randomly, giving

\[
E_r\approx \frac{\#\mathcal B_r}{3^r}. \tag{14}
\]

This heuristic has the correct exponential scale.

Ignoring the prefix constraints and only retaining \(A_r\le\lfloor\alpha r\rfloor\),

\[
\#\mathcal B_r
\le
\sum_{A=r}^{\lfloor\alpha r\rfloor}
\binom{A-1}{r-1}
=
\binom{\lfloor\alpha r\rfloor}{r}. \tag{15}
\]

Stirling’s formula gives

\[
\#\mathcal B_r
\le
r^{O(1)}\lambda^r,
\]

where

\[
\lambda
=
\frac{\alpha^\alpha}{\beta^\beta}
=
2.839513730497\ldots . \tag{16}
\]

Since

\[
\rho:=\frac{\lambda}{3}
=
0.9465045768\ldots<1, \tag{17}
\]

a genuine equidistribution estimate of the form

\[
E_r
\le
C r^K\frac{\#\mathcal B_r}{3^r} \tag{18}
\]

would give

\[
E_r\le C'r^{K'}\rho^r<1
\]

for sufficiently large \(r\). Since \(E_r\) is a nonnegative integer, this would imply

\[
E_r=0 \tag{19}
\]

eventually.

That is the exact “falls below one” conversion requested in the approach.

---

## 5. A sharper weighted extinction lemma

There is a natural version using the Haar weights of the exact dyadic cylinders:

\[
M_r=
\sum_{w\in\mathcal B_r}2^{-A(w)}. \tag{20}
\]

For any \(0<x<1\),

\[
\mathbf 1_{\{A\le\alpha r\}}
\le x^{A-\alpha r},
\]

so

\[
\begin{aligned}
M_r
&\le
x^{-\alpha r}
\left(
\sum_{a\ge1}2^{-a}x^a
\right)^r\\
&=
\left(
\frac{x^{1-\alpha}}{2-x}
\right)^r. \tag{21}
\end{aligned}
\]

The minimum occurs at

\[
x_*=\frac{2\beta}{\alpha},
\]

and yields

\[
M_r\le \rho^r,\qquad
\rho=\frac{\alpha^\alpha}{3\beta^\beta}
=0.9465045768\ldots . \tag{22}
\]

Now define the nontrivial terminal mass

\[
\Theta_r
=
\sum_{w\in\mathcal B_r\setminus\{1^r\}}
2^{-A(w)}
\mathbf 1_{\{3^r\mid D_w\}}. \tag{23}
\]

Every \(w\in\mathcal B_r\) satisfies

\[
2^{A(w)}<3^r,
\]

and therefore

\[
2^{-A(w)}>3^{-r}. \tag{24}
\]

Consequently, every nonzero summand in \(\Theta_r\) is larger than \(3^{-r}\).

### Conditional Tauberian extinction theorem

Suppose that for some constants \(C,K\),

\[
\boxed{
\Theta_r
\le
C r^K\,3^{-r}M_r
} \tag{25}
\]

for all sufficiently large \(r\). Then

\[
\Theta_r
\le
C r^K\,3^{-r}\rho^r
<
3^{-r}
\]

for all sufficiently large \(r\). By (24), this forces

\[
\Theta_r=0.
\]

Hence

\[
\mathcal B_r
\cap
\{w:3^r\mid D_w\}
=
\{1^r\} \tag{26}
\]

eventually.

This theorem is complete and rigorous.

The problem is proving (25).

---

## 6. Why ordinary Fourier cancellation is insufficient

Introduce the center measure on \(\mathbb Z/3^r\mathbb Z\),

\[
\nu_r
=
\sum_{w\in\mathcal B_r\setminus\{1^r\}}
2^{-A(w)}
\delta_{D_w\bmod3^r}. \tag{27}
\]

Then Fourier inversion gives

\[
\Theta_r
=
\nu_r(\{0\})
=
\frac1{3^r}
\sum_{\xi\bmod3^r}
\widehat{\nu_r}(\xi). \tag{28}
\]

The zero frequency is harmless:

\[
\frac{\widehat{\nu_r}(0)}{3^r}
=
\frac{M_r-2^{-r}}{3^r}
\le
\frac{\rho^r}{3^r}. \tag{29}
\]

The entire problem lies in the nonzero frequencies.

An \(L^2\) or square-root cancellation theorem averaged over endpoint residues does not suffice. To see this, suppose \(N<3^r\) centers are all distinct. That is the most evenly distributed configuration possible at this sparsity: every occupied residue has multiplicity one. Nevertheless, the distinguished residue \(0\) may still be occupied once. Average equidistribution cannot distinguish

\[
\nu_r(\{0\})=0
\]

from

\[
\nu_r(\{0\})=2^{-A(w)}.
\]

But those are exactly the two cases the proof must separate.

This is the sparse regime in which “almost uniform” means many residues are missed, while each occupied residue can still contain a single exceptional point. The target is not a density statement; it is a fixed-residue avoidance theorem.

Tao’s rigorous \(3\)-adic Fourier analysis for the Syracuse process obtains almost-all conclusions under logarithmic averaging, through high-frequency control of a random affine walk. It does not provide a pointwise theorem for one fixed seed or a fixed distinguished residue at every depth. citeturn315965academia0

---

## 7. The ternary conditions are triangular, not independent

For a concatenation \(w=uv\), with \(|v|=s\),

\[
C_{uv}=3^s C_u+2^{A(u)}C_v.
\]

Therefore

\[
D_{uv}
=
3^s C_u+2^{A(u)}D_v. \tag{30}
\]

If \(w\) is terminal at its full length, then reducing (30) modulo \(3^s\) gives

\[
3^s\mid D_v. \tag{31}
\]

Thus:

> **Every suffix of a terminal word is terminal at its own depth.**

The successive congruences are therefore a nested carry tower. They are not \(r\) approximately independent events, each of probability \(1/3\).

This also explains why the naive entropy ratio

\[
\left(\frac{2.8395\ldots}{3}\right)^r
\]

is suggestive but not a proof. One terminal word does not survive \(r\) unrelated ternary tests; it follows one deterministic reverse \(3x-1\) trajectory whose divisibilities are inherited suffix by suffix.

---

## 8. What the desired estimate actually says

Because every nonzero term of \(\Theta_r\) is larger than \(3^{-r}\), the estimate

\[
\Theta_r
\ll
3^{-r}\rho^r
\]

is not merely a soft quantitative improvement. It is equivalent, for all large \(r\), to the exact statement

\[
\Theta_r=0.
\]

Conversely, once \(\Theta_r=0\) eventually, the bound is trivially true.

Thus the corrected “Tauberian decorrelation theorem” is essentially equivalent to eventual target-tree extinction. The Tauberian conversion below one is elementary; all of the Collatz difficulty is concentrated in the center estimate itself.

Equivalently, for the integer sequence \(E_r\), any estimate

\[
E_r=O(r^K\rho^r),
\qquad \rho<1,
\]

forces \(E_r\) to be eventually zero. Hence its generating function

\[
F(z)=\sum_{r\ge1}E_rz^r
\]

would actually be a polynomial. Proving sufficiently strong analytic continuation or coefficient decay for \(F\) is therefore another formulation of the extinction theorem, rather than an easier independent route to it.

---

## 9. The exact residual theorem

The viable replacement for ordinary decorrelation is the following.

### Rooted marked-center theorem

For every sufficiently large \(r\),

\[
\boxed{
\sum_{w\in\mathcal B_r\setminus\{1^r\}}
2^{-A(w)}
\mathbf 1_{\{C_w+2^{A(w)}\equiv0\ (3^r)\}}
\le
C r^K\,3^{-r}
\sum_{w\in\mathcal B_r}2^{-A(w)}.
} \tag{RMC}
\]

This theorem must retain all of the following:

- the exact centers \(C_w+2^{A(w)}\), not merely support sizes;
- the order of the valuation letters;
- the nested terminal suffixes;
- the changing modulus \(3^r\);
- the distinguished component rooted at \(1\);
- removal of the all-ones ray.

Generic \(2\)-\(3\) harmonic analysis does not supply these features. In the marked-carry language, (RMC) is a reformulation of the assertion that the exact activation sum cannot land at an integer smaller than its number of marked carries.

The project has exceptionally strong finite evidence: a compressed exact search shows that for every

\[
1\le r\le 10^{10},
\]

the only word satisfying all strict prefix barriers and the target-\(1\) terminal condition is \(1^r\). The computation reduced the exponential word search to \(731{,}209{,}150\) deterministic reverse seeds; all but two failed the barrier, and the remaining two entered known non-\(1\) negative-map cycles. This is a finite theorem, not an all-depth argument. fileciteturn14file0L22-L87

There is also an exact all-depth reformulation. A shortest hypothetical nontrivial terminal/barrier word corresponds, after reversal from terminal \(1\), to a trajectory

\[
M_{t+1}=\frac{2^{b_{t+1}}M_t+1}{3},
\qquad
E_{t+1}=E_t+b_{t+1}-\alpha,
\]

starting at

\[
(M_0,E_0)=(1,0),
\]

remaining in

\[
E_t>0,
\]

and eventually hitting the strip

\[
0<E_t<\beta,
\qquad M_t\equiv1\pmod3. \tag{32}
\]

Conversely, such a target-strip hit constructs a nontrivial terminal/barrier word. Thus the rooted marked-center theorem is equivalent to an exact target-strip avoidance theorem for this deterministic reverse excursion. fileciteturn14file7L343-L380

No proof of that avoidance theorem has emerged from the Tauberian analysis.

---

## 10. Even rooted extinction would not yet prove Collatz

There is a second, logically independent gap.

A hypothetical nonterminating positive orbit provides its own consecutive valuation blocks. To use the terminal-tree theorem, one must prove that the **same** block simultaneously satisfies

\[
A_{j+k}-A_j<k\log_2 3
\qquad(1\le k\le r) \tag{33}
\]

and

\[
U^{j+r}(n)\equiv-1\pmod{3^r}. \tag{34}
\]

Record-time arguments can produce long blocks satisfying (33). They do not produce (34). Ordinary \(3\)-adic recurrence can produce fixed-depth congruences, but the required modulus grows as \(3^r\), and the recurring blocks must remain aligned with the archimedean record condition.

The project’s audit identifies this as the unresolved synchronization problem: the real record subsequence and the endpoint-congruence subsequence cannot simply be chosen separately. fileciteturn14file5L253-L290

Accordingly, a complete proof through this program would need:

\[
\boxed{\text{Rooted marked-center extinction}}
\]

together with

\[
\boxed{\text{Nonperiodic barrier/terminal synchronization}}.
\]

Positive cycles must either be covered by that synchronization theorem or excluded separately, because the full word of a positive cycle has \(2^A>3^r\), opposite to the critical barrier inequality used here.

---

## 11. Final proof skeleton

The strongest valid skeleton is now:

1. Assume Collatz is false and choose a least positive counterexample \(n\).

2. Its orbit never falls below \(n\), since any smaller value converges by minimality.

3. Prove a synchronization theorem producing, on this one orbit, a nontrivial block \(w\) satisfying all prefix barriers and the target-\(1\) terminal congruence.

4. Apply the all-ones diamond: the terminal shadow \(1^r\) produces a smaller positive ancestor which coalesces with the orbit of \(n\).

5. That smaller ancestor reaches \(1\), so the common endpoint and then \(n\) reach \(1\), a contradiction.

Approach 69 was intended to supply step 3 indirectly by counting. The analysis shows that it can, at most, supply a global exclusion theorem for the terminal language—and the estimate needed for even that is equivalent to the still-unproved marked-center/carry theorem. It does not force a hypothetical orbit to enter the language.

---

# Verdict

The proposed theorem in its original form is **false**:

\[
\text{dyadic seed indicator}
\quad\text{and}\quad
\text{ternary endpoint indicator}
\]

are exact affine images on every valuation branch, with correlation \(0\) or \(1\).

The corrected theorem

\[
E_r\ll r^K(0.9465045768\ldots)^r
\]

would indeed force \(E_r=0\) eventually. But at this sparse, integer-valued threshold it is equivalent to the unresolved rooted terminal-tree exclusion. Moreover, terminal-tree exclusion alone still leaves the synchronization problem.

So Round 69 produces a sharp no-go theorem, a complete conditional extinction lemma with the correct constant, and a precise replacement target—but not a full proof of the Collatz conjecture.