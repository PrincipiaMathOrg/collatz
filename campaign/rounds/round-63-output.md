model: GPT-5.6 Pro (Chat mode)
round: 63 -- approach 58, Ruelle-Perron-Frobenius theory for exact survivors
front: proof
sent: 2026-08-16T03:21Z
worked: 86m 14s

---

# Exact Ruelle–Perron–Frobenius reduction for Collatz survivors

I carried the proposed construction through to an exact operator. It produces:

1. an exact transfer operator incorporating **both multiplicative drift and affine carry**;
2. a rigorous equivalence between decay of its root mass and the Collatz conjecture;
3. a provable strict RPF gap for the bulk, Haar-distributed sector;
4. an exact formula for carry-rescued branches at their first coefficient crossing;
5. a polynomial, rather than exponential, bound for the number of such rescued branches.

The final stationary-cusp contraction does **not** follow. It is essentially a sharpened coefficient-stopping/high-bit synchronization theorem. Thus the derivation below is not a completed proof of Collatz: asserting the final spectral radius \(<1\) would amount to assuming the missing arithmetic theorem.

## 1. Exact survivor cylinders

Use the shortcut map

\[
T(n)=
\begin{cases}
n/2,&n\equiv0\pmod2,\\[1mm]
(3n+1)/2,&n\equiv1\pmod2.
\end{cases}
\]

For a binary word

\[
w=(\varepsilon _0,\ldots,\varepsilon _{k-1})\in\{0,1\}^{k},
\]

put

\[
s_0=c_0=0,
\qquad
s_{j+1}=s_j+\varepsilon_j,
\qquad
c_{j+1}=3^{\varepsilon_j}c_j+\varepsilon_j2^j.
\]

Then every seed realizing \(w\) satisfies

\[
T^j(n)=\frac{3^{s_j}n+c_j}{2^j},
\qquad 0\le j\le k.                                    \tag{1}
\]

These are the same affine word identities used in the accelerated valuation framework. fileciteturn10file0L31-L45

Because \(3^{s_k}\) is invertible modulo \(2^k\), the word \(w\) determines one residue class

\[
n\equiv r_w:=-c_k3^{-s_k}\pmod {2^k}.                   \tag{2}
\]

Let \(R_w\in\{1,\ldots,2^k\}\) denote its least positive representative, with residue \(0\) represented by \(2^k\). The usual parity-vector induction shows that every integer in this residue class realizes all of \(w\), not merely its final divisibility condition.

Now impose the exact survivor condition

\[
T^j(n)\ge n\qquad(1\le j\le k).                         \tag{3}
\]

From (1),

\[
T^j(n)\ge n
\iff
c_j\ge\bigl(2^j-3^{s_j}\bigr)n.                         \tag{4}
\]

This is automatic whenever \(3^{s_j}\ge2^j\). Define

\[
H(w):=
\min_{\substack{1\le j\le k\\2^j>3^{s_j}}}
\left\lfloor
\frac{c_j}{\,2^j-3^{s_j}\,}
\right\rfloor,                                         \tag{5}
\]

with \(H(w)=+\infty\) if the indexing set is empty. The exact set of seeds represented by \(w\) which have not yet descended is therefore

\[
E(w)=
\left\{
R_w+q2^k:
q\ge0,\quad
2\le R_w+q2^k\le H(w)
\right\}.                                               \tag{6}
\]

Thus no probabilistic approximation has been made: \(R_w\) is the full \(2\)-adic carry condition and \(H(w)\) is the full archimedean drift-plus-carry constraint.

The child state can also be updated exactly. For \(\varepsilon\in\{0,1\}\),

\[
s'=s+\varepsilon,\qquad
c'=3^\varepsilon c+\varepsilon2^k,                     \tag{7}
\]

\[
R'=\operatorname{lpr}\!\left(
-c'3^{-s'}\pmod {2^{k+1}}
\right),                                                \tag{8}
\]

and

\[
H'=
\begin{cases}
H,&2^{k+1}\le3^{s'},\\[1mm]
\displaystyle
\min\!\left(
H,\left\lfloor\frac{c'}{2^{k+1}-3^{s'}}\right\rfloor
\right),&2^{k+1}>3^{s'}.
\end{cases}                                             \tag{9}
\]

So \((k,s,c,R,H)\) is an autonomous exact survivor state.

## 2. Exact multiplicity and the transfer operator

For a finite cutoff \(N\), define

\[
M_N(w)=\#\bigl(E(w)\cap[2,N]\bigr).                     \tag{10}
\]

Let

\[
q_0(w)=
\begin{cases}
1,&R_w=1,\\
0,&R_w>1,
\end{cases}
\]

and

\[
Q_N(w)=
\left\lfloor
\frac{\min\{N,H(w)\}-R_w}{2^k}
\right\rfloor .
\]

Then

\[
M_N(w)=\max\bigl(0,Q_N(w)-q_0(w)+1\bigr).               \tag{11}
\]

This is the requested exact multiplicity of seed classes.

To remove the artificial cutoff while retaining positive mass on every fixed integer, introduce, for \(p>1\),

\[
\mu_p(w)=\sum_{n\in E(w)}\frac1{n^p}.                   \tag{12}
\]

It is an explicitly computable finite or infinite arithmetic-progression sum:

\[
\mu_p(w)
=
2^{-kp}
\sum_{q=q_0(w)}^{Q_H(w)}
\left(q+\frac{R_w}{2^k}\right)^{-p},                   \tag{13}
\]

where \(Q_H\) may be \(+\infty\). In the latter case this is a Hurwitz zeta value.

The children partition precisely those parent seeds which survive one additional step, so

\[
E(w0)\,\dot\cup\,E(w1)\subseteq E(w)                   \tag{14}
\]

and consequently

\[
\mu_p(w0)+\mu_p(w1)\le\mu_p(w).                         \tag{15}
\]

Define the exact Ruelle transfer operator

\[
(\mathcal P_pf)(w)
=
\sum_{\substack{\varepsilon\in\{0,1\}\\
                 \mu_p(w\varepsilon)>0}}
\frac{\mu_p(w\varepsilon)}{\mu_p(w)}
f(w\varepsilon).                                       \tag{16}
\]

Its potential is

\[
\varphi_p(w,\varepsilon)
=
\log\mu_p(w\varepsilon)-\log\mu_p(w),                  \tag{17}
\]

so products of branch weights telescope exactly.

## 3. The exact RPF equivalence theorem

Let

\[
\tau(n)=\min\{j\ge1:T^j(n)<n\},                         \tag{18}
\]

with \(\tau(n)=+\infty\) when no such \(j\) exists, and put

\[
Z_k(p)=
\sum_{\substack{n\ge2\\\tau(n)>k}}\frac1{n^p}.          \tag{19}
\]

### Theorem 1

For every \(p>1\),

\[
(\mathcal P_p^k\mathbf1)(\varnothing)
=
\frac{Z_k(p)}{\zeta(p)-1}.                              \tag{20}
\]

Moreover, the following are equivalent:

\[
\text{every positive Collatz orbit reaches }1;          \tag{21}
\]

\[
\tau(n)<\infty\quad\text{for every }n>1;                \tag{22}
\]

\[
Z_k(p)\longrightarrow0
\quad\text{for one, equivalently every, }p>1.           \tag{23}
\]

#### Proof

At depth \(k\), the sets \(E(w)\), \(|w|=k\), are disjoint, and their union is exactly

\[
\{n\ge2:\tau(n)>k\}.
\]

Therefore

\[
\sum_{|w|=k}\mu_p(w)=Z_k(p).
\]

Telescoping the branch weights in (16) gives (20), since

\[
\mu_p(\varnothing)=\sum_{n\ge2}n^{-p}=\zeta(p)-1.
\]

If every \(n>1\) has finite \(\tau(n)\), strong induction proves Collatz: after finitely many steps \(n\) reaches some \(m<n\), and \(m\) reaches \(1\) by induction.

Conversely, suppose Collatz fails and let \(n_0\) be the least counterexample. Its orbit can never fall below \(n_0\), since every smaller integer converges. Hence

\[
\tau(n_0)=+\infty
\]

and

\[
Z_k(p)\ge n_0^{-p}>0
\qquad(k\ge0).
\]

Finally, if every \(\tau(n)\) is finite, then

\[
\mathbf1_{\{\tau(n)>k\}}\longrightarrow0
\]

pointwise, and dominated convergence applies because \(\sum n^{-p}<\infty\). ∎

This operator therefore handles both possible failures—unbounded orbits and nontrivial positive cycles—in one object.

## 4. What a strict root spectral gap would give

Define the root pressure

\[
r_{\mathrm{root}}(p)
=
\limsup_{k\to\infty}
\left(
\frac{Z_k(p)}{\zeta(p)-1}
\right)^{1/k}.                                         \tag{24}
\]

Then

\[
r_{\mathrm{root}}(p)<1                                 \tag{25}
\]

would prove Collatz immediately.

More generally, a Collatz–Wielandt certificate consisting of \(K\ge1\), \(0<\rho<1\), and \(V\ge1\) with

\[
\mathcal P_p^K V\le\rho V                              \tag{26}
\]

would give

\[
Z_{mK}(p)
\le
(\zeta(p)-1)V(\varnothing)\rho^m.                       \tag{27}
\]

There is, however, an important quantitative warning. If

\[
Z_k(p)\le C\rho^k,
\]

then every \(n\) surviving through depth \(k\) satisfies

\[
n^{-p}\le C\rho^k,
\]

and therefore

\[
\tau(n)
\le
1+\frac{p\log n+\log C}{-\log\rho}.                    \tag{28}
\]

So a stationary root spectral gap proves a **uniform logarithmic stopping-time bound**, considerably more quantitative than bare Collatz.

Conversely, a bound

\[
\tau(n)\le A\log n+B
\]

implies

\[
Z_k(p)
\ll
\exp\!\left(-\frac{p-1}{A}k\right).                    \tag{29}
\]

Thus the strict root-gap formulation is essentially equivalent to a uniform logarithmic stopping estimate. Current work on coefficient stopping explicitly treats comparable logarithmic delay estimates as conjectural rather than established. citeturn456426view0

## 5. Why the ordinary global spectral radius is exactly \(1\)

A global RPF gap cannot hold on the whole exact survivor tree.

Put

\[
\alpha=\log_2 3,\qquad
\beta=\alpha-1=\log_2(3/2).
\]

The logarithmic coefficient height is

\[
h_j=\alpha s_j-j.                                      \tag{30}
\]

An odd bit changes \(h\) by \(+\beta\), while an even bit changes it by \(-1\).

Take the prefix \(1^m\). Its height is \(m\beta\), and no descent constraint has yet been activated. Given any \(L\), choose

\[
m\beta\ge L.
\]

Then **every** continuation of length \(L\) keeps the coefficient height nonnegative, even the continuation \(0^L\). Hence there is no killing during those \(L\) steps, and all descendants partition the entire parent cylinder:

\[
(\mathcal P_p^L\mathbf1)(1^m)=1.
\]

Therefore

\[
\|\mathcal P_p^L\|_{\infty}=1
\qquad(L\ge1),
\]

and

\[
r(\mathcal P_p)=1.                                     \tag{31}
\]

This is independent of whether Collatz is true.

A similar distinction already occurs in the related exact \(3\)-adic transfer-operator formulation of the Krasikov–Lagarias programs: the ordinary \(L^1\) radius is elementary and equals \(1\) at the critical endpoint, while the relevant lower Collatz–Wielandt quantity remains unresolved. fileciteturn15file0L79-L104

So the desired theorem cannot be “the full transfer operator has radius \(<1\).” It must concern a carefully defined cusp or induced sector.

## 6. The bulk RPF gap is provable

Discard the exact residue and carry temporarily, retaining only the coefficient barrier \(h_j\ge0\). The killed drift operator is

\[
(\mathcal Rf)(h)
=
\frac12f(h+\beta)
+
\frac12\mathbf1_{\{h\ge1\}}f(h-1).                     \tag{32}
\]

For \(g_\theta(h)=e^{\theta h}\),

\[
\mathcal Rg_\theta(h)
\le
m(\theta)g_\theta(h),
\]

where

\[
m(\theta)
=
\frac12\left(e^{\beta\theta}+e^{-\theta}\right).        \tag{33}
\]

The minimum occurs at

\[
\theta_*=
\frac{\log(1/\beta)}{1+\beta},
\]

and gives

\[
\rho_{\mathrm{bulk}}
=
\frac12
\left(
\beta^{-\beta/(1+\beta)}
+
\beta^{1/(1+\beta)}
\right)
=
0.9659065532334377\ldots<1.                             \tag{34}
\]

Therefore, if \(\mathcal B_k\) is the set of words satisfying every coefficient barrier,

\[
2^{-k}\#\mathcal B_k
\le
\rho_{\mathrm{bulk}}^k.                                \tag{35}
\]

This is a genuine RPF spectral gap. Equivalently, the binary-entropy deficit is

\[
1-H_2(\log_3 2)
=
0.05004447281166946\ldots.                              \tag{36}
\]

But this is a Haar-average statement. It says that barrier cylinders occupy exponentially shrinking \(2\)-adic measure; it does not say that the shrinking set misses every fixed positive integer.

## 7. Exact carry multiplicity at the first coefficient crossing

The carry can be analyzed completely at the first time the coefficient falls below \(1\).

Let \(w\) have length \(k\), with

\[
3^{s_j}\ge2^j\quad(0\le j<k),
\qquad
3^s<2^k,\quad s=s_k.                                   \tag{37}
\]

The final bit must be \(0\), and

\[
2^{k-1}\le3^s<2^k.                                     \tag{38}
\]

Put

\[
d=2^k-3^s>0,\qquad c=c_k.
\]

Let the odd positions be

\[
0\le i_1<\cdots<i_s<k.
\]

Then

\[
c=\sum_{\ell=1}^{s}3^{s-\ell}2^{i_\ell},
\]

so

\[
\frac{c}{3^s}
=
\sum_{\ell=1}^{s}\frac{2^{i_\ell}}{3^\ell}.             \tag{39}
\]

At the prefix ending just after the \(\ell\)-th odd bit,

\[
2^{i_\ell+1}\le3^\ell.
\]

Consequently,

\[
\frac{2^{i_\ell}}{3^\ell}\le\frac12
\]

and hence

\[
\boxed{\frac{c}{3^s}\le\frac{s}{2}.}                    \tag{40}
\]

Now suppose \(n\) survives this crossing. Write

\[
T^k(n)=n+y,\qquad y\in\mathbb Z_{\ge0}.
\]

The affine identity gives

\[
c=dn+2^ky.                                              \tag{41}
\]

In particular,

\[
0\le y<\frac{c}{2^k}<\frac{s}{2}.                       \tag{42}
\]

Conversely, every integer \(y\) satisfying

\[
0\le y<\frac{s}{2},
\qquad
c-2^ky>0,
\qquad
d\mid c-2^ky,                                           \tag{43}
\]

produces the unique positive seed

\[
n=\frac{c-2^ky}{d}.                                     \tag{44}
\]

Because (41) implies

\[
3^sn+c=2^k(n+y),
\]

this seed realizes the exact parity word. Earlier prefixes are automatically non-descending by (37).

Thus the exact carry-rescue multiplicity of the crossing word is

\[
\boxed{
m(w)=
\#\left\{
y\in\mathbb Z:
0\le y<s/2,\;
c>2^ky,\;
d\mid c-2^ky
\right\}.
}                                                       \tag{45}
\]

The case \(y=0\) represents an exact return and hence a possible cycle; \(y>0\) represents an acyclic carry rescue.

This is exactly the point at which Terras’s coefficient-stopping conjecture enters. That conjecture says the first coefficient crossing already gives a true descent. Rozier and Terracol define the ordinary and coefficient stopping times, state the equality conjecture, and exhibit finite “paradoxical” intervals in which coefficient \(<1\) can coexist with an endpoint above the starting value. citeturn730775view0

The existing exact computation found only the trivial live first crossing through depth \(31\), but no all-depth induction or carry theorem is known. fileciteturn14file3L21-L35

## 8. A new zero-entropy bound for exact rescued crossings

The exact formula above can be combined with a linear-form estimate.

At a first crossing, set

\[
\Lambda=k\log2-s\log3>0.
\]

The explicit irrationality bound quoted by Rozier–Terracol gives

\[
\Lambda\ge k^{-13.3}.                                  \tag{46}
\]

Therefore

\[
d
=
3^s(e^\Lambda-1)
\ge
3^s\Lambda
\ge
3^s k^{-13.3}.                                         \tag{47}
\]

From (40) and (41),

\[
n+y
=
\frac{c-3^sy}{d}
\le
\frac{c}{d}
\le
\frac{s3^s/2}{3^sk^{-13.3}}
\le
\frac12k^{14.3}.                                       \tag{48}
\]

Also \(y<k/2\).

For fixed \(k\), the value of \(s\) is determined by (38). Moreover, the numerator map

\[
(i_1,\ldots,i_s)
\longmapsto
\sum_{\ell=1}^{s}3^{s-\ell}2^{i_\ell}                  \tag{49}
\]

is injective: \(i_1=v_2(c)\), after subtracting its term \(i_2\) is recovered from the next \(2\)-adic valuation, and so on.

Each pair \((n,y)\) therefore determines at most one crossing word. Hence:

### Proposition 2

The number \(F_k\) of length-\(k\) first-crossing words admitting any positive carry-rescued seed satisfies

\[
\boxed{F_k=O(k^{15.3}).}                               \tag{50}
\]

The explicit logarithmic-form estimate used here is recorded in the current paradoxical-sequence analysis. citeturn456426view0

This is a substantial RPF conclusion:

\[
2^{-k}F_k=O(k^{15.3}2^{-k}),                            \tag{51}
\]

so exact carry rescue at the first crossing has **zero entropy**, not merely entropy below \(\log2\).

It still does not prove extinction. A tree may have one node at every depth and still contain an infinite path. The remaining issue is precisely whether one such sparse path can stay aligned with the binary expansion of one fixed positive integer.

## 9. The stationary cusp versus the escaping \(2\)-adic boundary

Along an infinite word, the least representatives satisfy

\[
R_{k+1}=R_k+t_k2^k,
\qquad t_k\in\{0,1\}.                                  \tag{52}
\]

There are two possibilities.

If \(t_k=1\) infinitely often, then

\[
R_k\longrightarrow+\infty
\]

archimedeanly. The path converges \(2\)-adically, but not to an ordinary positive integer.

If \(t_k=0\) eventually, then \(R_k\) stabilizes at an ordinary integer \(n\). Such a path is the stationary cusp corresponding to the actual forward orbit of \(n\).

For example, the infinite all-ones parity word has

\[
R_k=2^k-1,
\]

which converges \(2\)-adically to \(-1\). Every finite prefix has positive seed representatives and satisfies the coefficient barrier, but there is no single positive integer lying in all cylinders. Therefore literal extinction of all infinite survivor paths is false.

The Dirichlet mass separates the two cases exactly. Since

\[
\mu_p(w)
\le
R_w^{-p}
+
\int_0^\infty(R_w+2^kx)^{-p}\,dx,
\]

we have

\[
\mu_p(w)
\le
R_w^{-p}
+
\frac{R_w^{1-p}}{(p-1)2^k}.                            \tag{53}
\]

Thus an escaping ray has

\[
\mu_p(w_k)\longrightarrow0.                            \tag{54}
\]

If instead \(R_{w_k}=n\) eventually and \(n\) survives forever, then

\[
\mu_p(w_k)
=
n^{-p}+O_p(2^{-kp}),                                   \tag{55}
\]

so

\[
\mu_p(w_k)\longrightarrow n^{-p}>0.                    \tag{56}
\]

In particular, along a hypothetical counterexample,

\[
\frac{\mu_p(w_{k+1})}{\mu_p(w_k)}
\longrightarrow1.                                     \tag{57}
\]

That is the exact cusp approximate eigenmode which prevents a routine RPF argument.

There is also a topological obstruction: ordinary nonnegative integers—finite binary expansions—are dense in \(\mathbb Z_2\). Consequently, there is no nontrivial closed subspace of \(C(\mathbb Z_2)\) which isolates precisely the ordinary positive integers from the other \(2\)-adic rays. A successful sector must therefore use a noncompact archimedean cusp variable, an induced renewal operator, or an adelic norm; it cannot be an ordinary continuous \(2\)-adic quotient.

This is the same stationary-realization obstruction identified in the finite-input min-plus formulation: abstract \(2\)-adic rays may survive while no positive ordinary integer does, and the missing lemma is that eventual zero high-bit injection forces a strict drop of the positive envelope. fileciteturn11file0L13-L54

## 10. Periodic rays can be removed, but aperiodic cusp rays remain

Suppose a strict-barrier tail repeats a block \(w\) of length \(r\), total exponent \(A\), and affine numerator \(C>0\). Its fixed \(2\)-adic seed satisfies

\[
(2^A-3^r)\xi=C.                                        \tag{58}
\]

Under the strict barrier,

\[
2^A<3^r,
\]

so

\[
\xi=-\frac{C}{3^r-2^A}<0.                              \tag{59}
\]

Inverse Collatz branches preserve negativity, so no eventually periodic strict-barrier ray can represent a positive ordinary input. fileciteturn11file0L120-L132

The existing determinant analysis goes further: proper powers and sufficiently long periodic shadows with a fixed exit satisfy the required charge bound. What remains is a primitive aperiodic path, or a periodic shadow whose exit accumulates unbounded \(2\)-adic debt. fileciteturn12file16L713-L733

Thus ordinary RPF periodic-orbit theory does not finish the problem: the unresolved sector is precisely the nonperiodic stationary cusp.

## 11. The exact conditional completion theorem

The appropriate spectral statement is an **induced cusp theorem**, not a gap for \(\mathcal P_p\) on the entire tree.

Let \(\widehat{\mathcal P}_p\) be an induced transfer operator whose branches are exact finite survivor blocks between chosen renewal events—for example coefficient crossings, carry discharges, or returns to a bounded height strip.

Assume:

1. every eventually stationary infinite survivor encounters infinitely many renewal events, unless it has an eventually barrier-periodic tail already excluded by (59);
2. the induced weights are the exact ratios of \(\mu_p\);
3. there are \(V\ge1\) and \(\rho<1\) such that

\[
\widehat{\mathcal P}_pV\le\rho V.                       \tag{60}
\]

Then Collatz follows.

Indeed, a least counterexample \(n\) gives a stationary infinite survivor whose cylinder masses tend to \(n^{-p}>0\). Repeated application of (60), however, forces its total surviving mass to tend to zero. This contradiction excludes the least counterexample.

This conditional theorem is logically complete and includes cycles. Its missing hypothesis is the arithmetic statement

\[
\boxed{
\text{every positive stationary cusp ray either exits or loses a fixed
fraction of exact carry mass at some renewal.}
}                                                       \tag{61}
\]

Equivalently, in the min-plus zero-temperature version, every \(n>1\) must eventually have a smaller positive ancestor coalescing into its orbit; that criterion is already known to be exactly equivalent to Collatz. fileciteturn11file0L217-L236

## Conclusion

The Ruelle–Perron–Frobenius program produces a sharp architecture, but not yet a full proof:

\[
\boxed{
\begin{aligned}
&\text{Exact drift-and-carry survivor operator} &&\text{proved},\\
&\text{Exact equivalence with Collatz} &&\text{proved},\\
&\text{Bulk RPF spectral gap }0.96590655\ldots &&\text{proved},\\
&\text{Exact first-crossing carry multiplicity} &&\text{proved},\\
&\text{Polynomial first-crossing survivor count} &&\text{proved},\\
&\text{Periodic stationary-ray exclusion} &&\text{proved},\\
&\text{Aperiodic stationary-cusp contraction} &&\text{unproved}.
\end{aligned}}
\]

The essential correction to the original proposal is that the global spectral radius is necessarily \(1\). Collatz corresponds to **critical transience from the root**, or to a strict spectral gap only after an exact induced cusp decomposition. The remaining cusp inequality is the same arithmetic interface appearing as the coefficient-stopping conjecture, high-bit injection exclusion, and stationary min-plus envelope extinction. Any claimed completion must prove that inequality; inserting \(\rho<1\) at that point would be an assumption rather than a proof.