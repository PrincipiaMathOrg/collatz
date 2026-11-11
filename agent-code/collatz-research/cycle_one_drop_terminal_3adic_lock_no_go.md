# The terminal \(3\)-adic lock

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** An explicit two-logarithm estimate proves that the terminal suffix
has length \(O((\log U)^2)\). More precisely,
\[
L<4.599\cdot 10^{12}(\log U)^2,
\qquad
H_c>U-2.76\cdot 10^{12}(\log U)^2-1,
\]
where \(\log\) denotes the natural logarithm. This is an unconditional
localization of the first negative cut, but it is not a contradiction and it
does not iterate to an all-depth descent. The terminal quotient is a stripped
factor of a cycle state, except in the boundary cases \(L=1\) and \(L=2\),
rather than a new cycle state to which leastness applies.

## 1. Terminal alternatives

We work under the denominator-one and failed-gate assumptions

\[
Q<U^{271/10},
\qquad
U\geq 408126,
\qquad
\frac er<\frac35.
\tag{1}
\]

At the first negative height cut, put

\[
H_c:=H_*+1,
\qquad
T:=T_{H_c},
\qquad
L:=r-T,
\qquad
x:=2Q-1.
\tag{2}
\]

If \(H_c\leq U\), the terminal-cut theorem gives one of

\[
3^L\mid 2^{U+1}x+1,
\qquad
3^L\mid 2^{U+3}x+1.
\tag{3}
\]

If \(H_c=U+1\), every localization claimed below is immediate. We therefore
assume \(H_c\leq U\) from now on.

The first alternative has no suffix spike. The second has exactly one suffix
spike, at \(r-1\). We write

\[
a:=U+c,
\qquad c\in\{1,3\},
\qquad
\lambda:=v_3(2^ax+1).
\tag{4}
\]

Thus \(L\leq\lambda\). In particular, \(3\nmid x\), since otherwise the
integer in (4) is congruent to \(1\pmod 3\).

## 2. A completely explicit two-logarithm bound

We use J. M. Rojas and Y. Zhu,
[*Root Repulsion and Faster Solving for Very Sparse Polynomials Over
\(p\)-adic Fields*](https://doi.org/10.1016/j.jnt.2022.01.013),
**Journal of Number Theory 241 (2022), 655--699, Theorem 3.1**; the
[author manuscript is arXiv:2107.09173](https://arxiv.org/abs/2107.09173).
That theorem records the following explicit form of Yu's theorem. If
\(p\) is prime, \(n\geq2\),
\(\alpha_i=r_i/s_i\in\mathbb Q\) are reduced, the integers \(b_i\) are not
all zero, and \(\prod_i\alpha_i^{b_i}\neq1\), then

\[
v_p\!\left(\prod_{i=1}^n\alpha_i^{b_i}-1\right)
<
(\log2)\log_p(2n)n^{5/2}(256e^2)^{n+1}p\log_p B
\prod_{i=1}^n
\max\!\left\{\log|r_i|,\log|s_i|,\frac1{16e^2}\right\},
\tag{5}
\]

where \(B:=\max\{|b_1|,\ldots,|b_n|,3\}\). The same source records

\[
(\log2)256e^2<1312,
\qquad
256e^2<1892,
\qquad
\frac1{16e^2}<0.0085.
\tag{6}
\]

For a nontrivial cycle, \(Q\geq2\), and hence \(x\geq3\). Apply (5) with

\[
p=3,\qquad n=2,\qquad
\alpha_1=2,\quad \alpha_2=-x,\qquad
b_1=a,\quad b_2=1.
\tag{7}
\]

The linear form in (5) is

\[
-2^ax-1,
\]

so its \(3\)-adic valuation is exactly \(\lambda\). Both height factors in
(5) simplify:

\[
\max\!\left\{\log2,\frac1{16e^2}\right\}=\log2,
\qquad
\max\!\left\{\log x,\frac1{16e^2}\right\}=\log x.
\tag{8}
\]

Also \(B=a\). Therefore,

\[
\lambda
<
(\log2)\log_3(4)2^{5/2}(256e^2)^3
\cdot3\log_3(a)\cdot(\log2)(\log x).
\tag{9}
\]

Equivalently,

\[
\lambda
<C_{\rm Yu}(\log x)\log_3(a),
\quad
C_{\rm Yu}:=(\log2)^2\log_3(4)2^{5/2}(256e^2)^3\cdot3.
\tag{10}
\]

Using (6), together with \(\log_3 4<2\), \(2^{5/2}<6\), and
\(\log2<1\), gives the rational upper bound

\[
C_{\rm Yu}
<1312\cdot1892^2\cdot2\cdot6\cdot3
=169074690048.
\tag{11}
\]

Consequently,

\[
\boxed{
L<169074690048\,(\log x)\log_3(a).}
\tag{12}
\]

The edge case \(x=1\) is even simpler. By the lifting-the-exponent lemma,

\[
v_3(2^a+1)=
\begin{cases}
1+v_3(a),&a\text{ odd},\\
0,&a\text{ even}.
\end{cases}
\tag{13}
\]

It corresponds to the known trivial least state and is irrelevant to a
nontrivial cycle.

## 3. Substitution of the failed-gate bound

From (1),

\[
x=2Q-1<2U^{271/10}.
\tag{14}
\]

Since \(U>2^{10}\),

\[
\log x<\log2+\frac{271}{10}\log U
<\frac{272}{10}\log U.
\tag{15}
\]

Also \(a\leq U+3<2U\). For \(U\geq408126\),

\[
\frac{\log(2U)}{\log3}<\log U.
\tag{16}
\]

Indeed, this is equivalent to
\(\log2<(\log3-1)\log U\); the right side is already larger than
\(0.09\cdot12>\log2\). Thus \(\log_3(a)<\log U\). Combining (12),
(15), and (16), we obtain

\[
\boxed{
L<4.599\cdot10^{12}(\log U)^2.}
\tag{17}
\]

This proves the polylogarithmic terminal-valuation estimate anticipated by
the multicut theorem.

The exact mechanical phase inequality is

\[
U-H_c
\leq B_{r-1}-B_T
<\frac erL+1.
\tag{18}
\]

Equations (1) and (17) therefore give

\[
\boxed{
H_c>U-2.76\cdot10^{12}(\log U)^2-1.}
\tag{19}
\]

This is an all-\(U\) theorem, but its explicit constant is large. At the
current endpoint \(U=408126\), (19) is numerically vacuous. For
\(U\geq10^{16}\), the function \((\log U)^2/U\) is decreasing and the
bound gives

\[
H_c>0.625U-1.
\tag{20}
\]

It then improves the elementary \(3U/5-O(\log U)\) localization, and
asymptotically it gives \(H_c/U\to1\).

## 4. Exact meaning of the quotient

Let \(Z:=(X+1)/2\) be the normalized integer coordinate.

In the no-suffix-spike case, define

\[
y:=\frac{2^{U+1}x+1}{3^L}.
\tag{21}
\]

Then the exact suffix is

\[
Z_T=2^{L-1}y,
\qquad
Z_{T+j}=2^{L-1-j}3^jy
\quad(0\leq j\leq L-1).
\tag{22}
\]

Thus the construction identifies \(y\) with a cycle state only in the
boundary case \(L=1\). For \(L>1\), \(y\) is obtained by stripping the
forced factor \(2^{L-1}\) from the actual cut state. Leastness gives only

\[
2^{L-1}y=Z_T\geq Q.
\tag{23}
\]

In the last-spike case, define

\[
y:=\frac{2^{U+3}x+1}{3^L}.
\tag{24}
\]

Then

\[
Z_T=2^{L-2}y,
\qquad
Z_{r-2}=3^{L-2}y,
\qquad
Z_{r-1}=\frac{3^{L-1}y+1}{4}.
\tag{25}
\]

Here the construction identifies \(y\) with the cut state only when
\(L=2\). In general, leastness yields only

\[
2^{L-2}y=Z_T\geq Q.
\tag{26}
\]

There is no affine semiconjugacy which turns the removal of the power of two
in (22) or (25) into removal of an orbit prefix. Indeed, \(y\) is odd. The
putative odd state \(2y-1\) therefore has

\[
v_2(3(2y-1)+1)=1+v_2(3y-1)\geq2,
\tag{27}
\]

whereas the cut state in (22) begins with the prescribed ordinary suffix
when \(L>1\). Hence \(2y-1\) does not even begin with the same symbolic
suffix. Accidental later coalescence is possible in principle, but no such
coalescence follows from (3). Outside the two boundary cases, \(y\) is
therefore neither a certified cycle state nor a certified ancestor.

The logarithmic estimate makes the lack of descent still clearer. For
\(U\geq10^{16}\), (17) and the elementary inequalities
\(\log10<2.303\), \(\log2/\log3>0.63\) give

\[
L<(U+1)\log_3 2.
\tag{28}
\]

The right side is smaller still than \((U+3)\log_3 2\). Therefore, in
either terminal alternative,

\[
3^L<2^a,
\qquad
y=\frac{2^ax+1}{3^L}>x=2Q-1\geq Q.
\tag{29}
\]

Thus, precisely in the asymptotic range where the \(3\)-adic estimate
localizes the suffix, the stripped quotient points upward rather than
downward.

## 5. Infinite terminal shadows

The terminal information is arithmetically compatible with leastness for
infinitely many \(U\). This rules out a contradiction based only on (1),
(3), (18), and the local suffix dynamics.

Take \(Q=3\), so \(x=5\). In the no-spike case, let

\[
a=U+1\equiv0\text{ or }2\pmod6.
\tag{30}
\]

Then

\[
v_3(5\cdot2^a+1)=1.
\tag{31}
\]

Putting \(L=1\) and \(y:=(5\cdot2^a+1)/3\), the odd state
\(X:=2y-1\) satisfies

\[
3X+1=5\cdot2^{a+1}.
\tag{32}
\]

It therefore maps in one accelerated Collatz step to \(5\), and both the
local state inequality and \(Q<U^{271/10}\) hold.

For the last-spike case, let

\[
a=U+3\equiv10\text{ or }16\pmod{18}.
\tag{33}
\]

Then

\[
v_3(5\cdot2^a+1)=2.
\tag{34}
\]

Put \(L=2\) and \(y:=(5\cdot2^a+1)/9\). We have \(y\equiv1\pmod4\),
and the exact two-state suffix is

\[
2y-1
\longmapsto
\frac{3y-1}{2}
\longmapsto5.
\tag{35}
\]

The first arrow has exact exponent two, and the second has exact exponent
\(a-1=U+2\). Again every displayed local state is at least \(5\). These
families are local integer shadows, not cycle counterexamples. They show
that the terminal equation, polynomial bound for \(Q\), generic mechanical
tail inequality, and leastness inequalities have no internal numerical
conflict: for (18), one may take \(H_c=U\), so its left side is zero.

## 6. Why the estimate does not iterate

The bound (17) is a useful one-shot reduction: the final suffix length is
polylogarithmic, and the first negative cut lies in the final
polylogarithmic height layers. It does not give an all-depth reduction for
three independent reasons.

1. Removing that suffix leaves an open orbit segment, not a new closed
   denominator-one cycle.
2. Its natural quotient \(y\) is a stripped factor, not a new least state,
   except in the harmless boundary cases described above.
3. Earlier height cuts still satisfy the same telescoping invariant
   \(F_H+E_H=4K\). They do not supply a fresh terminal linear form to which
   (5) can be applied independently.

Accordingly, one cannot peel an \(O((\log U)^2)\)-suffix and restart the
same argument on the prefix. A genuine continuation would require either a
new orbit endpoint after the cut or an independent global divisibility
condition.

## 7. Exact audit

The checker
[one_drop_terminal_3adic_lock_certificate.js](cycles/one_drop_terminal_3adic_lock_certificate.js)
uses integer and rational arithmetic. It verifies the coefficient
\[
1312\cdot1892^2\cdot2\cdot6\cdot3=169074690048,
\]
the rounded constants in (17) and (19), and the four residue classes in
(30) and (33). It also verifies the two exact local suffixes.

For the threshold \(U=10^{16}\), it certifies the logarithm intervals from
the positive series
\[
\log\frac{1+z}{1-z}
=2\sum_{k\geq0}\frac{z^{2k+1}}{2k+1}
\]
and its geometric tail bound. In particular, it proves
\[
\log2>0.693,\qquad \log3<1.1,\qquad \log10<2.303,
\]
then checks after clearing denominators that
\[
4.599\cdot10^{12}(16\cdot2.303)^2<0.63\cdot10^{16}
\]
and
\[
2.76\cdot10^{12}(16\cdot2.303)^2<\frac38\cdot10^{16}.
\]
Since \((\log U)^2/U\) is decreasing for \(U>e^2\), these checks prove
(20), (28), and hence \(3^L<2^a\), for every \(U\geq10^{16}\).
The checker output ends in \(\texttt{status=PASS}\).

The frozen SHA-256 digest of the certificate source is
\[
\texttt{ead9d2c8c3d0e3be23a864b4031ba6879d3dfc1b40f4f605543ca5e584aeb54b}.
\]

## Conclusion

The explicit \(3\)-adic-logarithm route succeeds exactly at localization.
It replaces the elementary linear bound on \(L\) by
\(L=O((\log U)^2)\), with the fully explicit constants (17) and (19). It
does not close the one-drop gate. The quotient supplied by the divisibility
is generally not a state or ancestor, leastness yields only (23) or (26),
and in the effective asymptotic range the quotient is larger than the least
state. The obstruction is therefore structural rather than a weakness of
the numerical constant in Yu's theorem.
