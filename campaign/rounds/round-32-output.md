model: GPT-5 Pro
round: 32 -- approach 27, Digit-block ordinals below epsilon_0
front: proof
sent: 2026-08-13T18:59:16Z
worked: 50m 34s

---

# Verdict

Carrying the digit-block ordinal approach through produces a **substantial but incomplete termination argument**. There is an explicit ordinal below \(\omega^3\) that decreases under **ten of the eleven** rules in the exact mixed binary–ternary Collatz rewriting system. The sole exception is the rule encoding an odd Collatz step.

More importantly, one can prove that any successful \(\varepsilon_0\)-ranking of the complete rewriting system induces a pointwise \(\varepsilon_0\)-ranking of the integers themselves. Thus, the missing “higher ordinal component” cannot be supplied merely by renaming carries or digit blocks: it must embody a genuine new Collatz descent theorem.

The conjecture is still treated as open in the current literature; a 2026 verification paper explicitly describes a proof as beyond present techniques. citeturn290739search20turn290739search22

What follows is the strongest rigorous completion of this approach that I can obtain without inserting an unproved descent lemma.

---

## 1. The exact mixed binary–ternary rewriting system

Use the shortcut Collatz map

\[
T(n)=
\begin{cases}
n/2,&n\equiv0\pmod 2,\\[2mm]
(3n+1)/2,&n\equiv1\pmod 2.
\end{cases}
\]

Write canonical strings as

\[
/\,u\,.
\]

where \(u\) is a word in

\[
\{f,t,0,1,2\}.
\]

The symbols act as affine maps

\[
f(x)=2x,\qquad t(x)=2x+1,
\]

\[
0(x)=3x,\qquad 1(x)=3x+1,\qquad 2(x)=3x+2,
\]

while \(/(x)=1\) initializes the representation and \(.(x)=x\) terminates it. Thus \(f,t\) are binary digits and \(0,1,2\) are ternary digits.

The eleven rules are

\[
\mathcal D=
\left\{
\begin{aligned}
f.&\longrightarrow .,\\
t.&\longrightarrow 2.,
\end{aligned}
\right.
\]

\[
\mathcal A=
\left\{
\begin{aligned}
f0&\longrightarrow0f,&
f1&\longrightarrow0t,&
f2&\longrightarrow1f,\\
t0&\longrightarrow1t,&
t1&\longrightarrow2f,&
t2&\longrightarrow2t,
\end{aligned}
\right.
\]

and

\[
\mathcal B=
\left\{
\begin{aligned}
/0&\longrightarrow/t,\\
/1&\longrightarrow/ff,\\
/2&\longrightarrow/ft.
\end{aligned}
\right.
\]

The \(\mathcal A\)- and \(\mathcal B\)-rules preserve the represented integer. The two \(\mathcal D\)-rules apply \(T\). Yolcu, Aaronson, and Heule prove that this string-rewriting system terminates exactly when the Collatz conjecture holds. citeturn288388view0turn288388view1

This is an ideal setting for the proposed ordinal strategy: the \(\mathcal B\)-rules can increase ordinary word length, but they might still decrease a higher Cantor-normal-form component.

---

## 2. An exact ordinal descent for ten rules

Let

\[
B=\{f,t\},\qquad Q=\{0,1,2\}.
\]

For a canonical string \(s=/u.\), define

\[
q(s)=\#\{i:u_i\in Q\},
\]

\[
b(s)=\#\{i:u_i\in B\},
\]

and let

\[
I(s)=\#\{(i,j):i<j,\ u_i\in B,\ u_j\in Q\}.
\]

Thus \(I(s)\) counts how many binary digits occur to the left of ternary digits. These are precisely the binary–ternary inversions that the \(\mathcal A\)-rules eliminate.

Define

\[
\boxed{\displaystyle
\Psi(s)=\omega^2 q(s)+\omega I(s)+b(s).
}
\]

Since all three coefficients are finite,

\[
\Psi(s)<\omega^3<\varepsilon_0.
\]

### Proposition 1

Every rule except

\[
t.\longrightarrow2.
\]

strictly decreases \(\Psi\).

### Proof

Every \(\mathcal A\)-rule has type

\[
BQ\longrightarrow QB.
\]

The numbers \(q\) and \(b\) are unchanged. Because the two exchanged symbols are adjacent, exactly one binary-before-ternary inversion disappears, while every inversion involving another position is preserved. Therefore

\[
I(s')=I(s)-1
\]

and hence

\[
\Psi(s')<\Psi(s).
\]

Now consider a boundary rule in \(\mathcal B\). It consumes one ternary digit and produces either one or two binary digits. Thus

\[
q(s')=q(s)-1.
\]

The quantities \(I\) and \(b\) may increase substantially, but they remain finite. Consequently

\[
\Psi(s')
<
\omega^2(q(s)-1)+\omega^2
=
\omega^2q(s)
\leq \Psi(s).
\]

This is the desired Goodstein-like phenomenon: for example,

\[
/1\longrightarrow/ff
\]

increases ordinary length, but it removes one unit of the \(\omega^2\)-coefficient, and no finite increase in the lower components can compensate.

Finally,

\[
f.\longrightarrow .
\]

removes the final binary digit. Since that digit has no ternary digit to its right, removing it does not change \(I\). It decreases \(b\) by one, so \(\Psi\) decreases. ∎

This gives a complete ordinal proof of termination for

\[
\mathcal T\setminus\{t.\longrightarrow2.\}.
\]

It is stronger than merely proving that carry normalization terminates: the boundary expansions and all even Collatz steps may be freely interleaved.

---

## 3. The exact failure at an odd step

Suppose \(s=/ut.\). Replacing the final \(t\) by \(2\) gives

\[
s'=/u2.
\]

Then

\[
q(s')=q(s)+1,\qquad b(s')=b(s)-1.
\]

Furthermore, the new terminal ternary digit lies to the right of every preceding binary digit. If \(b(s)\) includes the terminal \(t\), then

\[
I(s')=I(s)+b(s)-1.
\]

Therefore

\[
\Psi(s')
=
\omega^2(q(s)+1)
+\omega\bigl(I(s)+b(s)-1\bigr)
+b(s)-1,
\]

which is strictly greater than

\[
\Psi(s)=\omega^2q(s)+\omega I(s)+b(s).
\]

So the obstruction is completely localized:

\[
\boxed{\text{The odd rule converts one low-level binary object into a high-level ternary object.}}
\]

One might try reversing the hierarchy and making binary blocks higher than ternary blocks. But then the boundary rules

\[
/0\to/t,\qquad /1\to/ff,\qquad /2\to/ft
\]

convert ternary digits back into one or two binary digits, producing the opposite difficulty.

The base conversion forms a loop:

\[
\text{terminal binary}
\longrightarrow
\text{ternary}
\longrightarrow
\text{new binary digits}
\longrightarrow
\text{terminal binary}.
\]

A fixed hierarchy of binary versus ternary blocks therefore cannot work.

---

## 4. Three rigorous no-go results

These do not eliminate all possible \(\varepsilon_0\)-interpretations. They eliminate the most natural versions of the proposed construction.

### 4.1 No fixed digit precedence

Suppose a word is compared lexicographically using a fixed strict precedence \(\succ\) on the digit symbols. Four rewrite rules force

\[
f0\to0f
\quad\Longrightarrow\quad
f\succ0,
\]

\[
/0\to/t
\quad\Longrightarrow\quad
0\succ t,
\]

\[
t0\to1t
\quad\Longrightarrow\quad
t\succ1,
\]

and

\[
/1\to/ff
\quad\Longrightarrow\quad
1\succ f.
\]

Together,

\[
f\succ0\succ t\succ1\succ f,
\]

which is impossible.

Thus one cannot simply assign a fixed ordinal to each digit and read the string as a left-to-right Cantor normal form.

---

### 4.2 No ranking depending only on alternating block lengths

Ignore digit values and retain only whether each symbol is binary or ternary. Let \(B\) denote a binary digit and \(Q\) a ternary digit.

The rewrite sequence representing the odd step \(3\mapsto5\) is

\[
/t.
\longrightarrow
/2.
\longrightarrow
/ft.
\]

A strict rank based only on type patterns would therefore require

\[
B>Q>BB,
\]

and hence

\[
B>BB.
\]

But the even step \(6\mapsto3\) is

\[
/tf.\longrightarrow/t.,
\]

which requires

\[
BB>B.
\]

Contradiction.

Therefore maximal binary and ternary block lengths—even with a sophisticated fixed ordering of those lengths—do not contain enough information. The actual digit values and their carry context are essential.

---

### 4.3 No positive-slope scalar affine interpretation

Consider the common termination ansatz

\[
F_a(x)=p_ax+q_a,\qquad p_a\in\mathbb N_{\geq1},
\]

for every symbol \(a\), with strings interpreted by composition. Strict orientation of a rule implies that its left-hand slope is at least its right-hand slope.

From

\[
t.\to2.
\]

we obtain

\[
p_t\geq p_2.
\]

From

\[
/2\to/ft
\]

we obtain

\[
p_2\geq p_fp_t.
\]

Since \(p_f\geq1\), these imply

\[
p_f=1,\qquad p_t=p_2.
\]

The rule

\[
f2\to1f
\]

gives

\[
p_2\geq p_1.
\]

The rule

\[
f1\to0t
\]

gives

\[
p_1\geq p_0p_t,
\]

and

\[
/0\to/t
\]

gives

\[
p_0\geq p_t.
\]

Consequently,

\[
p_t\geq p_1\geq p_0p_t\geq p_t^2.
\]

Because \(p_t\geq1\), this forces

\[
p_f=p_t=p_0=p_1=p_2=1.
\]

All digit maps are now translations. But translations commute, so

\[
F_{f0}=F_{0f},
\]

making it impossible to orient

\[
f0\to0f
\]

strictly.

Thus no positive-slope scalar affine interpretation proves termination. A successful ordinal interpretation must be genuinely nonlinear or context-sensitive.

---

## 5. The representation-minimum theorem

The following theorem identifies the exact logical content of an ordinal proof.

### Theorem 2

The following are equivalent.

1. There is a function
   \[
   \Phi:\{\text{canonical mixed-base strings}\}\longrightarrow\varepsilon_0
   \]
   that strictly decreases under every one of the eleven rewrite rules.

2. There is a function
   \[
   r:\mathbb N_{>0}\longrightarrow\varepsilon_0
   \]
   such that
   \[
   r(T(n))<r(n)
   \qquad\text{for every }n>1.
   \]

### Proof: \(1\Rightarrow2\)

For each \(n\), let \(\mathcal C_n\) be the nonempty collection of canonical strings representing \(n\). Define

\[
r(n)=\min_{s\in\mathcal C_n}\Phi(s).
\]

The minimum exists because the ordinals are well ordered.

Choose \(s\in\mathcal C_n\) attaining this minimum. The exact simulation theorem for the rewriting system says that from every representation of \(n>1\), some finite rewrite sequence reaches a representation \(s'\) of \(T(n)\). citeturn288388view1turn288388view2

At least one rewrite occurs, so strict descent gives

\[
\Phi(s')<\Phi(s)=r(n).
\]

Therefore

\[
r(T(n))
\leq\Phi(s')
<r(n).
\]

---

### Proof: \(2\Rightarrow1\)

Assume \(r(T(n))<r(n)\) for all \(n>1\). Define

\[
\Phi(s)
=
\omega^{\,r(\operatorname{Val}(s))+4}
+
\Psi(s).
\]

Because \(r(\operatorname{Val}(s))<\varepsilon_0\), closure of \(\varepsilon_0\) under exponentiation by \(\omega\) shows that

\[
\Phi(s)<\varepsilon_0.
\]

Under an auxiliary rule in \(\mathcal A\cup\mathcal B\), the represented integer is unchanged, while \(\Psi\) decreases. Hence \(\Phi\) decreases.

Under either dynamic rule, the represented value changes from \(n\) to \(T(n)\). The exponent in the leading term strictly decreases:

\[
r(T(n))+4<r(n)+4.
\]

That decrease dominates any possible change in the lower term \(\Psi<\omega^3\). Hence \(\Phi\) again decreases. ∎

### Consequence

An ordinal ranking on the mixed-base strings is not merely an ingenious way of proving that carries terminate. After minimizing over all representations, it becomes a pointwise ordinal Lyapunov function for the integers:

\[
n\longmapsto r(n),
\qquad
r(T(n))<r(n).
\]

Conversely, any such integer rank immediately yields the requested digit-string rank.

Of course, assuming Collatz, one may take \(r(n)\) to be the total stopping time of \(n\), which even lies below \(\omega\). But that definition is circular unless finiteness of the stopping time has already been proved.

This theorem does not make the ordinal approach useless. It tells us exactly what the approach must deliver: a **computable, present-state-defined ordinal rank whose decrease is established without referring to the future orbit**.

---

## 6. The viable hydra-style version

There is one form of the proposal that could genuinely work.

Assign each digit-block atom in a string a **generation label**

\[
\lambda<\varepsilon_0.
\]

For a string \(s\), let \(\mathcal L(s)\) be the finite multiset of all its labels and define the Cantor-normal-form ordinal

\[
H(s)
=
\bigoplus_{\alpha\in\mathcal L(s)}\omega^\alpha.
\]

Here \(\oplus\) is natural ordinal addition; equivalently, collect equal exponents and write the result in descending Cantor normal form.

The central hydra principle is

\[
\omega^\alpha
>
\omega^{\beta_1}+\cdots+\omega^{\beta_k}
\qquad
(\beta_i<\alpha).
\]

Thus a high-generation block may be replaced by arbitrarily many lower-generation blocks while the ordinal decreases.

### Digit-generation criterion

Suppose the labels can be assigned from the current block word so that:

1. Every \(\mathcal A\)-rule preserves the multiset \(\mathcal L(s)\). It merely rearranges the corresponding atoms and decreases \(I(s)\).

2. The rule \(f.\to.\) removes at least one label.

3. The rule \(t.\to2.\) replaces one label \(\alpha\) by finitely many labels all strictly below \(\alpha\).

4. Every boundary rule
   \[
   /0\to/t,\qquad /1\to/ff,\qquad /2\to/ft
   \]
   replaces one label \(\alpha\) by finitely many labels all strictly below \(\alpha\).

Then define

\[
\boxed{\displaystyle
\Omega(s)=
\omega^{H(s)+3}
+\omega I(s)+b(s).
}
\]

If a rule strictly decreases \(H\), the first term decreases and dominates everything below it. If an \(\mathcal A\)-rule preserves \(H\), then \(I\) decreases. Therefore every rewrite strictly decreases \(\Omega\), proving termination and hence Collatz.

So this criterion is a complete conditional proof.

### The missing theorem

What remains is the following.

> **Digit-generation lemma.** Construct \(\mathcal L(s)\), solely from the present alternating binary–ternary block structure and digit values, such that conditions 1–4 hold for every reachable canonical string.

The labels cannot be context-free. Indeed, the pair of rules

\[
t.\to2.,
\qquad
/2\to/ft
\]

would require, for fixed symbol labels,

\[
\lambda(t)>\lambda(2)>\lambda(t).
\]

The newly created \(t\) must therefore be recognized as a **lower-generation descendant** of the old terminal \(t\), despite having the same visible symbol. This generation must either be reconstructible from the present digit configuration or carried by an invariant annotation whose consistency is proved for every possible derivation.

That is precisely the hydra-like mechanism one would need.

Ordinal interpretations have successfully handled rewrite encodings of Goodstein and hydra processes, where growth in ordinary size accompanies descent in a hereditary ordinal. citeturn800059search1 The Collatz-specific difference is that Goodstein has an external monotonically increasing base or stage parameter. Collatz repeatedly converts binary information to ternary information and then back again, with no evident monotone stage variable.

---

## 7. Why the natural \(3\)-adic generation label fails

A tempting candidate is to use the depth of the ternary endpoint carry.

For the accelerated odd map

\[
U(n)=\frac{3n+1}{2^{v_2(3n+1)}},
\]

a valuation word \(a_0,\ldots,a_{j-1}\) satisfies

\[
2^{A_j}U^j(n)=3^jn+C_j,
\qquad
A_j=\sum_{i<j}a_i,
\]

where

\[
C_0=0,\qquad
C_{k+1}=3C_k+2^{A_k}.
\]

Consider the all-ones word

\[
a_0=\cdots=a_{j-1}=1.
\]

Then \(A_k=k\), and induction gives

\[
C_j=3^j-2^j.
\]

Indeed,

\[
C_{j+1}
=
3(3^j-2^j)+2^j
=
3^{j+1}-2^{j+1}.
\]

Therefore

\[
C_j+2^{A_j}
=
C_j+2^j
=
3^j,
\]

and hence

\[
v_3(C_j+2^{A_j})=j.
\]

These words are not merely formal. For every \(j\), the positive seed

\[
n=2^{j+1}-1
\]

has at least its first \(j\) accelerated valuations equal to \(1\).

Thus the most obvious carry depth grows through arbitrarily long realizable prefixes.

If larger \(3\)-adic depth is assigned a larger ordinal generation, the proposed rank increases. If larger depth is assigned a smaller ordinal generation, one would require an infinite descending sequence

\[
\gamma_0>\gamma_1>\gamma_2>\cdots,
\]

which no ordinal system permits.

Therefore raw \(3\)-adic carry depth cannot be the missing generation label. It would have to be combined with another component that falls sufficiently strongly along the all-ones branches.

---

## 8. Why simply replacing \(2\) and \(3\) by \(\omega\) fails

For an ordinary binary numeral

\[
n=\sum_i b_i2^i,
\]

the natural ordinal replacement is

\[
H_2(n)=\sum_i b_i\omega^i.
\]

This map is strictly order-preserving: the highest differing binary digit determines both the integer order and the ordinal order.

But for every odd \(n>1\),

\[
T(n)=\frac{3n+1}{2}>n.
\]

Consequently,

\[
H_2(T(n))>H_2(n)
\]

at every odd step.

A hereditary version does not fix the underlying problem unless it introduces a stage or generation that falls during \(2\)-to-\(3\)-to-\(2\) conversion. In Goodstein’s process, that stage is supplied externally by the changing base. In Collatz, manufacturing such a stage from the current digits is exactly the unresolved problem.

---

# Final conclusion

The digit-block ordinal programme yields four rigorous results:

\[
\boxed{\Psi(s)=\omega^2q(s)+\omega I(s)+b(s)}
\]

proves termination of ten of the eleven exact Collatz rewrite rules.

Fixed digit precedence, alternating-block-length rankings, context-free generation labels, and positive-slope scalar affine interpretations cannot orient the complete system.

Any complete \(\varepsilon_0\)-ranking of the strings induces a pointwise integer rank

\[
r(T(n))<r(n),
\]

so a successful ordinal construction necessarily contains the full Collatz descent mechanism rather than merely resolving carry normalization.

Finally, the hydra-style digit-generation criterion gives an exact sufficient theorem: one high-generation block must always be replaced by finitely many lower-generation descendants. The unresolved task is to define those generations from the present mixed-base word and verify the decrease for both

\[
t.\to2.
\]

and

\[
/2\to/ft
\]

without using eventual convergence in the definition.

Accordingly, this approach does **not yet furnish a valid full proof**. Its precise frontier is the Digit-Generation Lemma above. Claiming that the regenerated binary blocks “obviously have lower generation” would be exactly the missing theorem—and, by the representation-minimum theorem, essentially the Collatz conjecture itself.