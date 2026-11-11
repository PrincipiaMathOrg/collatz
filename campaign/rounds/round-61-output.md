model: GPT-5.6 Pro (Chat mode)
round: 61 -- approach 56, A cross-prime uncertainty principle
front: proof
sent: 2026-08-16T03:44Z
worked: 31m 49s

---

# Outcome

Carrying the proposed uncertainty principle through exactly does **not** complete a proof of Collatz. The obstruction is stronger than a missing estimate:

> **Dyadic seed localization and ternary endpoint localization are not competing localizations. For every fixed Collatz branch, they are exact affine images of one another.**

Consequently, the natural cross-prime localization operator has norm \(1\), not \(<1\). The only valid uncertainty inequality also involving the real place gives **uniqueness or sparsity**, never automatic emptiness.

Below is the exact calculation, a sharp no-go theorem for the proposed principle, and the strongest corrected form that survives.

---

## 1. Exact branch notation

Use the accelerated map on positive odd integers

\[
U(n)=\frac{3n+1}{2^{\nu_2(3n+1)}}.
\]

Let

\[
w=(a_0,\ldots ,a_{r-1}),\qquad a_i\ge 1
\]

be a proposed valuation word, and put

\[
A_0=0,\qquad A_k=\sum_{i<k}a_i,
\]

\[
C_0=0,\qquad C_{k+1}=3C_k+2^{A_k}.
\]

For every exact realization \(n,x_1,\ldots,x_r\) of \(w\),

\[
2^{A_k}x_k=3^k n+C_k. \tag{1}
\]

This is the established affine identity in the existing framework. fileciteturn5file0L19-L30

Write \(A=A_r\) and \(C=C_r\).

---

# 2. The exact cylinder-isomorphism theorem

## Theorem 1

For every word \(w\), there is exactly one odd residue class

\[
\alpha_w\pmod {2^{A+1}}
\]

whose elements realize \(w\), namely

\[
\boxed{\quad
\alpha_w\equiv 3^{-r}(2^A-C)\pmod {2^{A+1}}.
\quad} \tag{2}
\]

There is also exactly one odd endpoint class

\[
\beta_w\pmod {2\cdot 3^r},
\]

characterized by

\[
\boxed{\quad
\beta_w\equiv C\,2^{-A}\pmod {3^r},
\qquad
\beta_w\equiv1\pmod2.
\quad} \tag{3}
\]

If \(n_0\) realizes \(w\) and \(X_0=U^r(n_0)\), then

\[
\boxed{\quad
U^r(n_0+2^{A+1}t)
   =X_0+2\cdot3^r t
\quad} \tag{4}
\]

for every integer \(t\).

Thus the exact branch is a bijection

\[
\alpha_w+2^{A+1}\mathbb Z
\;\longleftrightarrow\;
\beta_w+2\cdot3^r\mathbb Z. \tag{5}
\]

## Proof

If \(n\) realizes \(w\), its endpoint \(X\) is odd. From

\[
2^A X=3^r n+C
\]

we therefore have

\[
3^r n+C\equiv2^A\pmod {2^{A+1}},
\]

which gives (2).

Conversely, suppose \(n\) satisfies (2). We show that all the intermediate quotients in (1) are odd.

For \(k<r\), let \(v\) be the suffix of \(w\) beginning at \(k\). The composition law for affine numerators is

\[
C_r=3^{r-k}C_k+2^{A_k}C_v. \tag{6}
\]

Since \(v\) is nonempty, \(C_v\) is odd. Hence

\[
\begin{aligned}
3^{r-k}(3^k n+C_k)
 &=3^r n+C_r-2^{A_k}C_v\\
 &\equiv -2^{A_k}C_v
    \pmod {2^{A_k+1}}\\
 &\equiv2^{A_k}\pmod {2^{A_k+1}}.
\end{aligned}
\]

Because \(3^{r-k}\) is odd,

\[
3^k n+C_k\equiv2^{A_k}\pmod {2^{A_k+1}}.
\]

Consequently

\[
x_k=\frac{3^k n+C_k}{2^{A_k}}
\]

is an odd integer. Moreover,

\[
2^{A_{k+1}}x_{k+1}
 =3^{k+1}n+C_{k+1}
 =3(3^k n+C_k)+2^{A_k},
\]

so

\[
2^{a_k}x_{k+1}=3x_k+1.
\]

Since \(x_{k+1}\) is odd, this forces

\[
\nu_2(3x_k+1)=a_k.
\]

Thus \(w\) is exact.

Reducing the endpoint formula modulo \(3^r\) gives (3). Finally,

\[
\begin{aligned}
U^r(n_0+2^{A+1}t)
 &=\frac{3^r(n_0+2^{A+1}t)+C}{2^A}\\
 &=X_0+2\cdot3^rt,
\end{aligned}
\]

which proves (4). ∎

---

# 3. Why the proposed uncertainty inequality is false

Let

\[
\mathcal C_2(w)=\alpha_w+2^{A+1}\mathbb Z
\]

be the exact dyadic seed cylinder, and let

\[
\mathcal C_3(w)=\beta_w+2\cdot3^r\mathbb Z
\]

be the exact ternary endpoint cylinder.

Theorem 1 says

\[
U^r_w(\mathcal C_2(w))=\mathcal C_3(w)
\]

bijectively.

Therefore, for **every** nonzero measure \(\mu\) supported on \(\mathcal C_2(w)\),

\[
\operatorname{supp}\bigl((U^r_w)_*\mu\bigr)
 \subseteq \mathcal C_3(w). \tag{7}
\]

Both localization probabilities equal \(1\). On \(\ell^2\) with counting measure, branch transport is a permutation unitary, so

\[
\left\|
1_{\mathcal C_3(w)}
U^r_w
1_{\mathcal C_2(w)}
\right\|_{2\to2}=1. \tag{8}
\]

There can be no uniform estimate of the form

\[
\left\|
1_{\mathcal C_3(w)}
U^r_w
1_{\mathcal C_2(w)}
\right\|
\le 1-\eta
\]

with \(\eta>0\).

This is not merely a Collatz-specific counterexample. On

\[
G=\mathbb Z/(2^a3^b)\mathbb Z
 \cong\mathbb Z/2^a\mathbb Z
 \times\mathbb Z/3^b\mathbb Z,
\]

a dyadic residue projection and a ternary residue projection have the tensor forms

\[
P_\alpha
 =|\alpha\rangle\langle\alpha|\otimes I,
\qquad
Q_\beta
 =I\otimes|\beta\rangle\langle\beta|.
\]

They commute, and

\[
P_\alpha Q_\beta
 =|\alpha,\beta\rangle\langle\alpha,\beta|,
\qquad
\|P_\alpha Q_\beta\|=1. \tag{9}
\]

The Chinese remainder theorem supplies a common localized vector.

This differs fundamentally from a genuine Fourier uncertainty principle. The Donoho–Stark theorem compares a function with its **Fourier transform** and proves

\[
|\operatorname{supp}f|\,
|\operatorname{supp}\widehat f|
\ge |G|.
\]

Its two localization bases are related by a Fourier matrix; the dyadic and ternary residue projectors above are instead commuting coordinate projectors. citeturn278527view0

---

# 4. An explicit equality family

Take

\[
w=1^r.
\]

Then

\[
A=r,\qquad C=3^r-2^r.
\]

For every \(t\ge1\), set

\[
n=2^{r+1}t-1.
\]

Its first \(r\) valuations are all \(1\). Indeed, if \(x_k=U^k(n)\), then

\[
x_k+1=\frac{3^k(n+1)}{2^k}
      =2^{r+1-k}3^kt,
\]

so, for \(k<r\),

\[
3x_k+1
 =2\left(2^{r-k}3^{k+1}t-1\right),
\]

and the factor in parentheses is odd.

At time \(r\),

\[
\boxed{\quad
x_r=2\cdot3^rt-1,
\qquad
3^r\mid x_r+1.
\quad} \tag{10}
\]

Thus at every scale \(r\) there are positive integers lying simultaneously in the exact dyadic word cylinder and the deepest natural ternary terminal cylinder.

The all-ones word is the equality configuration, not an uncertainty-forbidden configuration.

---

# 5. A fixed all-scale barrier countermodel

There is an even stronger obstruction in the terminal dual \(3x-1\) system

\[
U_-(m)=\frac{3m-1}{2^{\nu_2(3m-1)}}.
\]

One has

\[
5\xrightarrow{\,1\,}7
 \xrightarrow{\,2\,}5.
\]

Hence \(w_N=(1,2)^N\) is exact from \(5\) back to \(5\) for every \(N\).

It also satisfies the strict barrier at every prefix:

\[
2^{A_k}<3^k.
\]

Indeed,

\[
2^{A_{2j}}=2^{3j}=8^j<9^j=3^{2j},
\]

and

\[
2^{A_{2j+1}}
 =2^{3j+1}
 =2\cdot8^j
 <3\cdot9^j
 =3^{2j+1}.
\]

Therefore the fixed measure

\[
\mu=\delta_5
\]

is localized in nested dyadic seed cylinders and nested ternary endpoint cylinders at arbitrarily large scales, while satisfying the strict barrier. This recurrent component and its repetitions were already identified as an exact obstruction to target-independent synchronization. fileciteturn5file0L25-L29

So even adding invariance, positivity, arbitrarily deep scales, and the barrier does not create a generic uncertainty principle. A valid result has to recognize the **particular component rooted at \(1\)**.

---

# 6. The exact conductor-drop theorem

Although ordinary cross-prime localization gives no loss, there is one sharp statement that survives.

## Theorem 2 — Excess endpoint precision

Suppose a length-\(j\) branch has affine formula

\[
2^{A_j}x_j=3^j n+C_j.
\]

Fix an endpoint residue \(b\) and a precision \(s\ge0\). Then

\[
x_j\equiv b\pmod {3^s} \tag{11}
\]

is equivalent to

\[
3^j n\equiv2^{A_j}b-C_j\pmod {3^s}. \tag{12}
\]

Consequently:

### Case \(s\le j\)

Condition (11) is either impossible or automatic throughout the whole dyadic branch cylinder. Its compatibility condition is simply

\[
\boxed{\quad
C_j\equiv2^{A_j}b\pmod {3^s}.
\quad} \tag{13}
\]

It imposes **no additional congruence on the seed \(n\)**.

### Case \(s>j\)

Compatibility first requires

\[
3^j\mid2^{A_j}b-C_j.
\]

Once that holds, the seed must satisfy exactly one extra congruence,

\[
\boxed{\quad
n\equiv
\frac{2^{A_j}b-C_j}{3^j}
\pmod {3^{s-j}}.
\quad} \tag{14}
\]

Thus endpoint precision \(3^s\) consumes only

\[
\boxed{\quad (s-j)_+\quad} \tag{15}
\]

ternary digits of seed information.

## Proof

Equation (12) follows by multiplying (11) by the unit \(2^{A_j}\). If \(s\le j\), the term \(3^jn\) vanishes modulo \(3^s\), giving (13). If \(s>j\), divide the compatible congruence by \(3^j\), obtaining (14). ∎

---

## Multiple endpoint conditions

Suppose an exact word is prescribed through time \(R\), and at various times \(j_\nu\le R\) we require

\[
x_{j_\nu}\equiv b_\nu\pmod {3^{s_\nu}}.
\]

Put

\[
E=\max_\nu (s_\nu-j_\nu)_+.
\]

If the conditions are compatible, their pullbacks intersect in one ternary seed class modulo \(3^E\). Combining this with the exact dyadic word class gives one residue class modulo

\[
\boxed{\quad
M=2^{A_R+1}3^E.
\quad} \tag{16}
\]

So, in any real interval \(I\) of length \(H\),

\[
\boxed{\quad
\#\{n\in I:\text{all conditions hold}\}
 \le 1+\left\lfloor\frac{H}{M}\right\rfloor.
\quad} \tag{17}
\]

This is the sharp adelic height–localization inequality.

It gives:

- many points when \(H\gg M\);
- at most one point when \(H<M\);
- but never emptiness without using the actual center of the CRT class.

A counterexample only needs that one surviving point.

---

# 7. Terminal cylinders lie entirely in the free range

For the terminal condition

\[
3^j\mid x_j+1,
\]

take \(b=-1\) and \(s=j\). Theorem 2 reduces it to

\[
\boxed{\quad
3^j\mid C_j+2^{A_j}.
\quad} \tag{18}
\]

There is no additional ternary condition on \(n\).

Moreover, for a terminal suffix of length \(s\le j\), the existing locality theorem shows that this divisibility depends only on the last \(s\) valuations. fileciteturn5file0L33-L48

This is the decisive point:

> **The \(j\) ternary endpoint digits are exactly the \(j\) digits already supplied by the factor \(3^j\) in the branch slope. They are not independent information competing with the dyadic word.**

Only endpoint precision beyond \(3^j\) would incur a cross-prime information cost.

---

# 8. Exact adelic conservation

The linear part of a length-\(r\) branch is

\[
\lambda=\frac{3^r}{2^A}.
\]

Its normalized local absolute values are

\[
|\lambda|_\infty=\frac{3^r}{2^A},
\qquad
|\lambda|_2=2^A,
\qquad
|\lambda|_3=3^{-r}.
\]

Therefore

\[
\boxed{\quad
|\lambda|_\infty|\lambda|_2|\lambda|_3=1.
\quad} \tag{19}
\]

The real expansion, dyadic expansion, and ternary contraction balance exactly. There is no strict adelic volume loss to exploit.

For two seeds in one branch,

\[
n'-n=2^{A+1}t
\]

and

\[
x_r'-x_r=2\cdot3^rt.
\]

The branch removes exactly \(A\) dyadic digits from the difference and inserts exactly \(r\) ternary digits, while multiplying its real magnitude by \(3^r/2^A\). Equation (19) records this exact conservation.

---

# 9. What height-enhanced uncertainty can prove

There is a useful but limited consequence.

If two distinct integers satisfy the same exact word and \(E\) excess ternary endpoint digits, then their difference is divisible by

\[
2^{A+1}3^E.
\]

Hence

\[
|n_1-n_2|\ge2^{A+1}3^E. \tag{20}
\]

This can prove:

- uniqueness of a seed inside a bounded interval;
- separation of competing branches;
- rigidity when two deep terminal occurrences are too close;
- periodicity when a branch nearly returns to its starting center.

Indeed, the previous continuation established that two target-\(y\) terminal prefixes at lengths \(r\) and \(r+\ell\) force the intervening word to be a \(U_-\)-cycle whenever

\[
\frac{\ell}{3\,2^r}
+\frac{y}{2^r}
+\frac{y}{3^r}<1. \tag{21}
\]

The proof combines the two divisibilities with an archimedean bound; the resulting nonzero integer would have absolute value smaller than the modulus, so it must vanish. Thus nonperiodic terminal recurrences eventually need gaps of order at least \(2^r\). fileciteturn5file0L202-L220

This is a genuine adelic uncertainty phenomenon, but it says:

\[
\text{dense recurrence}\Longrightarrow\text{periodicity},
\]

not

\[
\text{every counterexample must exhibit recurrence}.
\]

It supplies rigidity after localization occurs; it does not force localization.

---

# 10. The center-sensitive theorem that would actually be needed

For a shortest nontrivial target-\(1\) terminal/barrier word, define

\[
\Delta
 =\frac{C+2^A-3^r}{3^r}.
\]

Terminality makes \(\Delta\) a positive integer.

If the nonunit exponents occur at endpoints

\[
1\le s_1<\cdots<s_h=r,
\qquad
a_{s_j-1}=1+c_j,
\]

and

\[
B_j=c_1+\cdots+c_j,
\]

the exact activation formula is

\[
\boxed{\quad
\Delta
 =\sum_{j=1}^h
 2^{B_{j-1}}(2^{c_j}-1)
 \left(\frac23\right)^{s_j}.
\quad} \tag{22}
\]

The strict record/barrier inequalities imply

\[
\boxed{\quad
0<\Delta<h.
\quad} \tag{23}
\]

These identities are already established in the marked-carry framework. fileciteturn5file1L295-L327

A theorem sufficient to exclude such words would be

\[
\boxed{\quad
\Delta\ge h.
\quad} \tag{24}
\]

But (24) cannot be a real-variable or support-uncertainty statement. For every full-barrier word, the corresponding real quantity

\[
\Delta_*=\frac{C+2^A-3^r}{3^r}
\]

naturally lies in \((0,h)\); the entire issue is whether it lands exactly in \(\mathbb Z\). Positivity, real spectral estimates, and variation diminution therefore cannot supply (24). fileciteturn7file2L603-L617

The needed result is instead a **marked-center anti-concentration theorem**:

> The carry sum associated with a strict-record word cannot hit one of the specific integers \(1,\ldots,h-1\) while remaining in the inverse-tree component rooted at \(1\).

That theorem must retain:

1. the exact centers, not merely cylinder sizes;
2. the ordered \(2\)-adic colors of the activation piles;
3. the changing ternary modulus;
4. the distinguished inverse component containing \(1\).

This is precisely the unresolved component-specific collision theorem identified by the carry analysis. Bare local collision states also occur in nontrivial recurrent components, so local congruence information alone is insufficient. fileciteturn5file3L960-L978

---

# 11. Why this still would not finish Collatz by itself

Even an all-depth proof of (24) would only eliminate the special target-\(1\) terminal/barrier language.

A complete proof also needs to show that a hypothetical positive counterexample orbit is forced into such a language.

A particularly clean sufficient statement would be:

> **Synchronization theorem.**  
> Every positive orbit that never falls below its initial value contains a nontrivial prefix satisfying both the strict prefix barrier and the target-\(1\) terminal congruence.

Suppose that theorem were proved. Choose the least nonterminating positive integer \(n\). Its orbit never falls below \(n\). Synchronization would produce the special prefix. But the all-ones competing branch to the same endpoint gives a positive ancestor smaller than \(n\), contradicting minimality. That exact prefix-diamond implication is already proved. fileciteturn5file0L106-L116

The cross-prime conductor theorem does not prove synchronization because the desired terminal condition has \(s=j\) and therefore costs no excess ternary conductor. It is a special word-center event, not an independent seed-localization event.

---

# Final verdict

The proposed route has been resolved negatively in its stated form:

\[
\boxed{
\text{Dyadic seed localization}
+
\text{natural ternary endpoint localization}
\;\not\Rightarrow\;
\text{uncertainty loss}.
}
\]

Instead,

\[
\boxed{
\text{each exact Collatz branch maps the first cylinder bijectively onto the second}.
}
\]

The sharp surviving principle is

\[
\boxed{
\text{real height}
\times
\text{dyadic conductor}
\times
\text{excess ternary conductor}
}
\]

and it gives separation or uniqueness. Terminal conditions occur at zero excess conductor, so this principle cannot make their fibers empty.

Accordingly, this approach does **not** furnish a full proof of the Collatz conjecture. It yields a rigorous no-go theorem and identifies the necessary repair: a center-sensitive, component-specific marked-carry inequality together with a nonperiodic synchronization theorem. No accepted full proof of Collatz is presently known. citeturn650293search1turn650293search5