# Actual-factor capacity in the one-drop sector

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** Equal actual valuation factors give an endpoint separation of
\(2\cdot3^L\). Combining this separation with the zero-cost and one-cost
capacities of the rational mechanical language proves the exact
obstruction

\[
2r\leq
4L+2+UL+(L+1)\left\lceil\frac{eL}{r}\right\rceil
\tag{1}
\]

whenever

\[
\alpha L+1>U+\log _2(4x).
\tag{2}
\]

Together with P7, this excludes every \(U\leq408125\). Thus every
denominator-one one-drop candidate satisfies

\[
\boxed{U\geq408126.}
\tag{3}
\]

Asymptotically, the same theorem moves the surviving high-rise boundary
from \(\log _2 3\) to

\[
\frac{2(\log _2 3)^2}{2\log _2 3-1}
=2.3153852110\ldots .
\tag{4}
\]

It does not close the high-rise branch.

## 1. Indexing of the actual word

Put

\[
\alpha:=\log _2 3,\qquad
N:=\lceil\alpha r\rceil,\qquad
e:=N-r,\qquad
B_j:=\left\lfloor\frac{jN}{r}\right\rfloor .
\tag{5}
\]

The cyclic rational mechanical word is

\[
b_j:=B_{j+1}-B_j\in\{1,2\},
\qquad 0\leq j<r.
\tag{6}
\]

Its terminal letter is \(b_{r-1}=2\). Let \(S\) be the set of the \(U\)
eligible preterminal two-sites which are omitted. The actual accelerated
valuation word is

\[
a_j=b_j-\mathbf 1_S(j)\quad(0\leq j<r-1),
\qquad
a_{r-1}=U+2.
\tag{7}
\]

Thus every preterminal letter is one or two, while the unique terminal
letter is at least three. For \(1\leq L\leq r\), exactly \(L\) cyclic
length-\(L\) occurrences contain the terminal index. The location of the
unique terminal letter shows that these \(L\) factors are pairwise
distinct and cannot equal a nonterminal factor.

All indices below are cyclic modulo \(r\). In particular, the affine
iterate identity remains valid for a factor which crosses the terminal
index.

## 2. Exact endpoint separation

Let \(w=(c_0,\ldots,c_{L-1})\) be one actual valuation factor and put

\[
A:=c_0+\cdots+c_{L-1}.
\]

There is an integer \(C_w\), depending only on \(w\), such that every odd
start \(y\) realizing this exact factor satisfies

\[
2^Ay_L=3^Ly+C_w.
\tag{8}
\]

If two distinct cycle starts \(y,z\) realize \(w\), subtraction gives

\[
2^A(y_L-z_L)=3^L(y-z).
\tag{9}
\]

Both endpoints are odd. Hence \(2\mid y_L-z_L\), and coprimality in
(9) gives

\[
2^{A+1}\mid y-z,
\qquad
2\cdot3^L\mid y_L-z_L.
\tag{10}
\]

The differences are nonzero. Indeed, the common affine map (8) is
injective. Equivalently, a repeated cycle state would give a shorter
period, which is also impossible from the unique terminal letter.

The exact one-drop carry envelope gives

\[
x_j<4x\,2^{m_j}\leq4x\,2^U
\qquad(0\leq j<r).
\tag{11}
\]

Consequently, two equal length-\(L\) factors are impossible as soon as

\[
2\cdot3^L>4x\,2^U,
\]

which is exactly (2). This applies to all cyclic starts. The least
positive integer satisfying (2) is

\[
\boxed{
L^\dagger
:=
\left\lfloor
\frac{U+\log _2(4x)-1}{\alpha}
\right\rfloor+1.}
\tag{12}
\]

Under (2), all \(r\) cyclic factors are distinct.

## 3. Mean omission cost

Let \(\mathcal F_L\) be the cyclic length-\(L\) language of the baseline
word (6). Rational mechanical complexity and balance give

\[
|\mathcal F_L|\leq L+1,
\qquad
E_L:=\sum_{w\in\mathcal F_L}|w|_2
\leq
(L+1)\left\lceil\frac{eL}{r}\right\rceil .
\tag{13}
\]

Here \(E_L\) is the number of one-deletion encodings, not merely the
number of their images.

For every distinct nonterminal actual factor, choose one occurrence.
Let \(p_k\) be the number of chosen occurrences containing exactly \(k\)
omissions. Since every omission belongs to exactly \(L\) cyclic windows,
and deleting the terminal-containing windows only lowers this incidence,

\[
\sum_{k\geq0}kp_k\leq UL.
\tag{14}
\]

A zero-cost factor belongs to \(\mathcal F_L\), so \(p_0\leq L+1\). A
one-cost factor is the image of a baseline factor together with one
marked two-symbol. Distinct actual factors require distinct encodings,
and therefore \(p_1\leq E_L\). It follows that

\[
\begin{aligned}
\sum_{k\geq0}p_k
&\leq p_0+p_1+\frac{UL-p_1}{2}\\
&\leq L+1+\frac{UL}{2}+\frac{E_L}{2}.
\end{aligned}
\tag{15}
\]

Adding the at most \(L\) terminal factors proves

\[
\boxed{
2p_a(L)\leq
4L+2+UL+(L+1)\left\lceil\frac{eL}{r}\right\rceil .}
\tag{16}
\]

If (2) holds, then \(p_a(L)=r\). Equations (1) and (16) follow.

This representative argument is occurrence-wise. It does not assume
that one omission creates only one new factor type. That distinction is
essential.

## 4. A direct quotient lower bound

Define the exact language capacity

\[
\mathcal C(L):=
4L+2+UL+(L+1)\left\lceil\frac{eL}{r}\right\rceil .
\tag{17}
\]

If \(1\leq L\leq r\) and \(\mathcal C(L)<2r\), condition (2) must fail.
Since \(x=2Q-1\), its failure gives the global denominator-one bound

\[
\boxed{
Q\geq
\frac12+\frac{3^L}{2^{U+2}}.}
\tag{18}
\]

Thus one may take the largest \(L\) for which (17) is smaller than
\(2r\). This is the sharp inverse form of the factor argument.

At the critical scale \(U^2/r\to\alpha\), the positive root of the
leading capacity equation is

\[
\frac LU\longrightarrow
t_*:=
\frac{-1+\sqrt{1+8(\alpha-1)/\alpha}}
     {2(\alpha-1)}
=0.8445884305\ldots .
\tag{19}
\]

Equation (18) then gives

\[
\log _2Q\geq
(\alpha t_*-1)U-o(U)
=0.3386409909\ldots\,U-o(U).
\tag{20}
\]

Thus the exact-factor theorem is exponentially strong on the old
critical layer.

## 5. The exact P7 barrier

P7 and (11) give

\[
h:=\log _2(4x)
<
H(r):=\log _2 1220+\frac{143}{10}\log _2r.
\tag{21}
\]

There is no range problem in using \(L^\dagger\). Since
\(U\leq e-1<(\alpha-1)r\), while \(H(r)<15\log _2r<r\) at the period
barrier, we have \(U+h<\alpha r\), and hence \(L^\dagger\leq r\).

We use the exact rational bounds

\[
\frac{1584962}{10^6}<\alpha<
\frac{1584963}{10^6},
\tag{22}
\]

equivalent to

\[
2^{1584962}<3^{10^6}<2^{1584963}.
\]

Thus, with \(\theta:=e/r\),

\[
\theta<\frac{584963}{10^6}+\frac1r.
\tag{23}
\]

At

\[
r_0:=72057431991,
\]

the exact comparisons

\[
1220^{1000}<2^{10253},
\qquad
r_0^{2000}<2^{72137}
\]

give

\[
H(r_0)<\frac{10520651}{20000}.
\tag{24}
\]

Put \(U_0:=408125\). Equations (12), (22), and (24) give

\[
L^\dagger\leq
\left\lfloor
\frac{10^6((U_0-1)20000+10520651)}
     {1584962\cdot20000}
\right\rfloor+1
=257830.
\tag{25}
\]

Using (23), the upper capacity at this integer length is strictly below
\(2r_0\). After clearing the denominator
\(10^6r_0\), the positive gap is

\[
26962017302734278048910.
\tag{26}
\]

For completeness, we propagate this strict comparison rather than
checking only the base point. Put \(r_1:=r_0+10000\). The elementary
bound \(\log _2(1+t)<2t\) gives

\[
H(r)<\frac{10520671}{20000}
\qquad(r_0\leq r\leq r_1).
\]

The integer upper bound in (25) therefore remains \(257830\) throughout
this interval. Its capacity decreases relative to \(2r\).

For \(r\geq r_1\), use the continuous upper length

\[
\Lambda(r):=
1+\frac{
U_0-1+10520671/20000+
(143/10)\log _2(r/r_1)}
{1584962/10^6}.
\tag{27}
\]

At \(r_1\), the upper capacity

\[
U_0\Lambda+
\left(\frac{584963}{10^6}+\frac1{r_1}\right)
\Lambda(\Lambda+1)+5\Lambda+3
\]

is smaller than \(2r_1\). After clearing its exact rational denominator,
the positive gap is

\[
459142264538367153378268421605158400000000.
\tag{28}
\]

The normalized upper capacity decreases for \(r\geq r_1\). Indeed, with
\(X=\log _2(r/r_1)\), one has
\(\Lambda=A+BX\), where \(A>250000\) and \(B<10\). The logarithmic
derivative of

\[
P(\Lambda):=
U_0\Lambda+\frac{584963}{10^6}\Lambda(\Lambda+1)
+5\Lambda+3
\]

is smaller than \(10(3/A+6/(U_0A))<1/2<\log 2\). The logarithmic
derivative of \(\Lambda(\Lambda+1)\) is also smaller than \(1/2\).
Therefore both

\[
\frac{P(\Lambda)}{r},
\qquad
\frac{\Lambda(\Lambda+1)}{r^2}
\]

decrease. This proves propagation to every \(r\geq r_1\). Monotonicity in
\(U\) excludes every \(U\leq U_0\), proving (3).

## 6. The asymptotic surviving region

When \(h=o(U)\), put

\[
z:=\frac{U^2}{r}.
\]

Taking \(L=L^\dagger\) in (1) gives, in the limit,

\[
2\leq z\left(\frac1\alpha+
\frac{\alpha-1}{\alpha^2}\right).
\]

Hence every surviving family satisfies

\[
\boxed{
\liminf\frac{U^2}{r}\geq
c_0:=
\frac{2\alpha^2}{2\alpha-1}
=2.3153852110\ldots .}
\tag{29}
\]

P7 gives \(h=O(\log r)\). In every bounded-\(z\) candidate family, the
existing transition theorem gives \(U\asymp\sqrt r\), so \(h=o(U)\) and
(29) applies.

Higher omission layers do not improve the leading constant by the same
budget argument. Once the zero-cost and one-cost layers are filled, the
remaining representatives cost at least two. The two-deletion encoding
capacity is of order \(L^3\), whereas the available omission incidence
is only \(UL=O(L^2)\) at the relevant scale. Thus the \(k=2\) capacity is
not binding. Moreover, the one-deletion shadow has no uniform
constant-factor overlap saving. Any further improvement must use the
fixed global placement of the omissions or arithmetic information beyond
exact equality of factors.

## 7. Exact audit

The checker
[one_drop_actual_factor_complexity_certificate.js](cycles/one_drop_actual_factor_complexity_certificate.js)
exhausts every nonempty omission profile through \(r=20\). It verifies:

- the \(L\) terminal-containing factors and their disjointness;
- mechanical complexity and one-deletion capacity;
- the representative omission budget;
- the zero-cost and one-cost bounds;
- the exact endpoint difference \(2\cdot3^L\) on every new factor word;
- the crude and mean-cost cyclic complexity bounds;
- the rational comparisons (22), (24), (26), and (28).

The run covers \(7072\) profiles, \(120187\) profile-length rows, and
\(28354\) distinct affine factor words. It returns

\[
\texttt{status=PASS}.
\]

## Conclusion

The equal-factor method is not a collection of local reset estimates. It
uses the denominator-one cycle states globally: exact repeated valuation
words force endpoint gaps of size \(2\cdot3^L\), while the fixed omission
set limits how many distinct words the mechanical language can carry.

The gain is substantial but not final. It excludes the entire old
critical layer and certifies \(U\geq408126\). The unresolved branch is now
the genuinely higher-rise region \(U^2/r\gtrsim2.315385\), where exact
factor capacity alone can accommodate all \(r\) cyclic starts.
