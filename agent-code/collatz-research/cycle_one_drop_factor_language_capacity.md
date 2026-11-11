# Factor-language capacity in the one-drop sector

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** The proposed overlap saving does not exist at leading order.
The downward radius-one union has the same asymptotic size as the number
of exact deletion encodings. However, the mean omission budget gives a
stronger deterministic factor-complexity theorem. At the critical scale
its limiting constant is

\[
1-\frac{1}{2\log _2 3}=0.6845351232\ldots .
\]

This excludes the critical layer \(U^2/r\to\alpha\) under denominator
one whenever the least state has subexponential size in the rise \(U\).

## 1. The mechanical factor language

Put

\[
\alpha:=\log _2 3,
\qquad
\gamma:=\alpha-1,
\qquad
e:=N-r.
\tag{1}
\]

The anchored binary clock has slope

\[
\theta:=\frac er=\gamma+\frac{\delta}{r},
\qquad 0<\delta<1.
\tag{2}
\]

Let \(\mathcal F_L\) be its cyclic factor language of length \(L\).
The rational mechanical factor-complexity theorem gives

\[
|\mathcal F_L|\leq L+1.
\tag{3}
\]

Every factor in \(\mathcal F_L\) contains either
\(\lfloor\theta L\rfloor\) or \(\lceil\theta L\rceil\) eligible
two-symbols. Define the exact number of one-deletion encodings by

\[
E_L:=\sum_{w\in\mathcal F_L}|w|_2.
\tag{4}
\]

It follows immediately that

\[
E_L\leq (L+1)\left\lceil\frac{eL}{r}\right\rceil.
\tag{5}
\]

When \(|\mathcal F_L|=L+1\), equation (4) also gives

\[
E_L=\theta L^2+O(L).
\tag{6}
\]

## 2. Exact downward unions

Replace the symbols \(1,2\) by \(0,1\), respectively. For a binary word
\(w\), let \(w^{(i)}\) be the word obtained by changing its one at
position \(i\) to zero. Define

\[
\mathcal D_L:=
\mathcal F_L\mathbin{\cup}
\{w^{(i)}:w\in\mathcal F_L,\ w_i=1\}.
\tag{7}
\]

The distinction between encodings and words is essential. The pair
\((w,i)\) is an encoding, while \(w^{(i)}\) is the resulting word.

**Lemma 1.** Suppose that

\[
\frac12<\theta<\frac23
\tag{8}
\]

and that \(|\mathcal F_L|=L+1\). Then

\[
\boxed{
E_L-3L-1\leq |\mathcal D_L|\leq E_L+L+1.}
\tag{9}
\]

**Proof.** The upper bound counts all base factors and all deletion
encodings.

We prove the lower bound. Mechanical balance and (8) show that every base
factor avoids both \(00\) and \(111\). Discard the deletion encodings at
the two boundary positions. This removes at most \(2(L+1)\) encodings.

Suppose that two remaining encodings have the same image. Their base
factors differ at exactly two positions, say \(i\) and \(j\). Since one
factor avoids \(111\), one of the neighbors of its deleted one is zero.
Since the other factor avoids \(00\), that zero must be the symbol changed
at the other position. Therefore, \(|i-j|=1\).

It remains to count adjacent transfers. Write a mechanical factor with
intercept \(\rho\) in the form

\[
w_j(\rho)
:=
\lfloor(j+1)\theta+\rho\rfloor
-\lfloor j\theta+\rho\rfloor.
\tag{10}
\]

Its prefix count of length \(k\) is \(\lfloor k\theta+\rho\rfloor\).
Two factors which differ only by the transfer \(10\leftrightarrow01\)
at a fixed split have equal prefix counts at every length except that
split. Thus their intercept cells are the two cells adjacent to the
single partition point belonging to that split. There is at most one
colliding pair for each of the \(L-1\) internal splits.

Consequently, the internal deletion encodings have at least

\[
E_L-2(L+1)-(L-1)=E_L-3L-1
\]

distinct images. The conclusion follows. \(\square\)

Combining (6) and (9), we obtain

\[
\boxed{
|\mathcal D_L|=\theta L^2+O(L),
\qquad
\frac{|\mathcal D_L|}{E_L}\longrightarrow1.}
\tag{11}
\]

Thus there is no uniform overlap multiplier \(c<1\). In particular, the
desired multiplier

\[
c<\frac{\alpha}{\mathrm e\,\gamma}
=0.9967734997\ldots
\tag{12}
\]

cannot hold for the exact deletion count. If one compares (11) with the
crude entropy expression \(\mathrm e E_L\), the ratio tends to
\(1/\mathrm e\). This is
the loss in the inequality \(\binom n1\leq en\), not an overlap saving.

The exact checker records the following rational-clock rows.

| \(L\) | \(r\) | \(E_L\) | one-deletion shadow | \(|\mathcal D_L|\) |
|---:|---:|---:|---:|---:|
| 50 | 3,964 | 1,492 | 1,443 | 1,492 |
| 100 | 15,853 | 5,908 | 5,809 | 5,908 |
| 200 | 63,399 | 23,516 | 23,316 | 23,516 |
| 300 | 142,647 | 52,822 | 52,523 | 52,822 |
| 400 | 253,594 | 93,828 | 93,429 | 93,828 |

The union equals the encoding count in every displayed row. The shadow
collisions are real, but the base factors added in (7) replace them at the
same order.

## 3. The deterministic mean-cost theorem

We now use the fact that a one-drop word has one fixed set of omissions.
Let \(S\) be the \(U\) eligible two-sites changed to one. There is also
one terminal exponent, where the height drops from \(U\) to zero. Let
\(p_a(L)\) denote the number of distinct cyclic length-\(L\) factors of
the actual exponent word.

**Theorem 2.** For every \(1\leq L\leq r\),

\[
\boxed{
p_a(L)
\leq
2L+1+\frac{UL}{2}
+\frac{L+1}{2}
\left\lceil\frac{eL}{r}\right\rceil.}
\tag{13}
\]

**Proof.** At most \(L\) cyclic factors contain the terminal exponent.
Consider the remaining factors. For every distinct factor, choose one
occurrence and let \(k\) be the number of omissions in that occurrence.
Write \(p_k\) for the number chosen with cost \(k\).

Every omission belongs to exactly \(L\) cyclic windows. Removing the
terminal-containing windows can only decrease this incidence count.
Therefore,

\[
\sum_{k\geq0}kp_k\leq UL.
\tag{14}
\]

The zero-cost factors belong to \(\mathcal F_L\), so \(p_0\leq L+1\).
Every one-cost factor has an encoding counted by (4), and hence

\[
p_1\leq E_L
\leq (L+1)\left\lceil\frac{eL}{r}\right\rceil.
\tag{15}
\]

Finally,

\[
\begin{aligned}
\sum_{k\geq0}p_k
&\leq p_0+p_1+\frac{UL-p_1}{2}\\
&\leq L+1+\frac{UL}{2}
+\frac{L+1}{2}\left\lceil\frac{eL}{r}\right\rceil.
\end{aligned}
\]

Adding the at most \(L\) terminal factors proves (13). \(\square\)

This argument counts distinct actual factors. It does not replace them by
independent omission encodings.

## 4. Denominator-one spacing

Let \(x=x_0\) be the least integer cycle state. The exact one-drop state
envelope gives

\[
x_j<4x2^{m_j}\leq4x2^U.
\tag{16}
\]

Suppose that two distinct starts have the same actual exponent factor of
length \(L\), with exponent sum \(A\). Subtracting their affine iterate
identities gives

\[
2^A(x_{s+L}-x_{t+L})=3^L(x_s-x_t).
\tag{17}
\]

The endpoint difference is nonzero: equality of the endpoints in (17)
would give equality of the starting states, contrary to primitivity. It
is even because both endpoints are odd, and (17) shows that it is
divisible by \(3^L\). Therefore,

\[
|x_{s+L}-x_{t+L}|\geq2\cdot3^L.
\tag{18}
\]

Equations (16) and (18) are incompatible whenever

\[
\boxed{
\alpha L+1>U+\log _2(4x).}
\tag{19}
\]

Under (19), all \(r\) cyclic factors are distinct, including those which
contain the terminal exponent. Hence \(p_a(L)=r\), and Theorem 2 gives

\[
\boxed{
2r\leq
4L+2+UL+(L+1)\left\lceil\frac{eL}{r}\right\rceil.}
\tag{20}
\]

This is the exact all-depth obstruction.

## 5. An explicit exclusion curve

Put

\[
h:=\log _2(4x),
\qquad
L_*:=\left\lceil\frac{U+h}{\alpha}\right\rceil.
\tag{21}
\]

Indeed, \(\alpha L_*\geq U+h\), and therefore
\(\alpha L_*+1>U+h\). Thus (19) is strict without an additional parity
argument.

The length condition is also automatic in the failed polynomial-gate
range. Suppose that

\[
Q<U^{271/10},
\qquad
r\geq r_0:=72{,}057{,}431{,}991.
\tag{21a}
\]

The exact inequalities \(\alpha<8/5\), \(U\leq e-1\), and
\(x<2Q\) give

\[
U<\frac35r,
\qquad
h<3+\frac{271}{10}\log _2U.
\tag{21b}
\]

Put \(X:=\log _2r\). We have \(X<r/100\) for \(r\geq r_0\): it holds
at \(r_0\) because \(X<361/10\), and the difference
\(r/100-\log _2r\) is increasing there. Using \(\alpha>3/2\), we obtain

\[
\begin{aligned}
L_*
&<\frac{U+h}{\alpha}+1\\
&<\frac25r+\frac{271}{15}X+3\\
&<\frac{871}{1500}r+3<r.
\end{aligned}
\tag{21c}
\]

Thus \(L_*\leq r-1\) in the candidate range. Since

\[
\left\lceil\frac{eL_*}{r}\right\rceil
\leq\frac{eL_*}{r}+1,
\]

equation (20) implies

\[
\boxed{
2r\leq
UL_*+\frac erL_*(L_*+1)+5L_*+3.}
\tag{22}
\]

Thus the strict reverse of (22) is an explicit exclusion test involving
only \((r,U,x)\).

For a normalized version, define

\[
z:=\frac{U^2}{r},
\qquad
\lambda:=\frac{1+h/U}{\alpha}+\frac1U.
\tag{23}
\]

We have \(L_*/U\leq\lambda\). Therefore, a candidate must satisfy

\[
2
\leq
z\left(
\lambda+\theta\lambda^2
+\frac{(\theta+5)\lambda}{U}
\right)
+\frac3r.
\tag{24}
\]

Equivalently, the candidate is excluded whenever

\[
\boxed{
\frac{U^2}{r}
<
\frac{2-3/r}
{\lambda+\theta\lambda^2
+(\theta+5)\lambda/U}.}
\tag{25}
\]

The right side is completely explicit. If \(h=o(U)\), then
\(\lambda\to1/\alpha\) and \(\theta\to\gamma\). Its limit is

\[
\boxed{
c_0:=\frac{2\alpha^2}{2\alpha-1}
=2.3153852110\ldots .}
\tag{26}
\]

In particular, every family with

\[
\log x=o(U),
\qquad
\limsup\frac{U^2}{r}<c_0
\tag{27}
\]

is impossible under denominator one. At the critical value
\(U^2/r\to\alpha\), the right side of (13), divided by \(r\), tends

\[
\boxed{
\frac12+\frac{\gamma}{2\alpha}
=1-\frac{1}{2\alpha}
=0.6845351232\ldots .}
\tag{28}
\]

Thus the critical layer has a fixed gap from full factor complexity.

## 6. Finite optimization

The accompanying checker also performs deterministic random starts and
single-swap hill climbing. It gives the following lower bounds for the
maximum observed factor complexity.

| \(L\) | \(r\) | \(U\) | best \(p_a(L)\) | best \(p_a(L)/r\) |
|---:|---:|---:|---:|---:|
| 20 | 634 | 32 | 425 | 0.670347... |
| 30 | 1,426 | 48 | 952 | 0.667601... |
| 40 | 2,537 | 63 | 1,662 | 0.655104... |
| 50 | 3,964 | 79 | 2,552 | 0.643794... |

These are heuristic lower bounds, while (13) is rigorous. No optimized
row approaches full complexity.

We also tested the off-critical ratios requested in the audit. Here
\(U=120\), \(h=2\), \(L_*=77\), and the actual word contains the genuine
terminal symbol \(U+2=122\).

| target \(U^2/r\) | actual \(U^2/r\) | best \(p_a(L_*)/r\) |
|---:|---:|---:|
| 2.3 | 2.2992176... | 5,577 / 6,263 = 0.890468... |
| 3 | 2.9993751... | 4,798 / 4,801 = 0.999375... |
| 5 | 4.9982645... | 2,881 / 2,881 = 1 |
| 10 | 9.9930604... | 1,441 / 1,441 = 1 |

These are achieved values, not upper bounds. They show that a second
uniform factor-complexity saving does not persist far above \(c_0\):
full complexity already occurs in the displayed rows near ratios five
and ten, while the ratio-three row misses only three factors.

The [exact checker](cycles/one_drop_factor_language_capacity_certificate.js)
constructs the rational clocks using \(N=\operatorname{bitLength}(3^r)\),
stores the actual factors as BigInts, counts the downward union rather
than its encodings, inserts the genuine terminal symbol \(U+2\), removes
terminal windows from the representative-cost ledger, and verifies the
resulting inequalities.

## Conclusion

The overlap proposal has a sharp no-go: its leading multiplier is one,
not a constant smaller than \(0.9968\). The apparent factor
\(\mathrm e\) comes
from a loose entropy inequality.

The fixed-word problem is different. The exact identity
\(\sum_s k_s=UL\), together with the limited capacity of the zero-cost
and one-cost layers, gives the uniform factor-complexity bound (13). With
denominator-one endpoint spacing, it excludes every subexponential-state
family below the explicit curve (25), including the critical layer
\(U^2/r\to\alpha\).
