# Variable-length cylinder packing does not move the high-rise constant

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** The full collection of rotated cylinders does not yield a
Kraft improvement beyond the fixed-length factor theorem. There are two
exact reasons.

First, a globally prefix-free family of variable valuation factors
extends injectively to its largest length. Its cardinality is therefore
already bounded by the fixed-length actual factor complexity at that
length. Second, the extra Kraft weights are too small. Forward dyadic
packing gives only \(\mathcal O\leq8x\), while even an ideal disjoint
reverse ternary packing gives only \(\mathcal O\leq4x\). The established
occupation theorem already gives

\[
\mathcal O<4x
\]

for every nontrivial candidate.

A quadratic height profile makes the obstruction sharp at the factor
scale. Every positive proportion of its height cutoffs asymptotically
saturates the same mean-cost capacity when

\[
\frac{U^2}{r}
=c_0:=
\frac{2(\log _2 3)^2}{2\log _2 3-1}.
\]

Thus height stratification can change lower-order terms, but it cannot
raise the uniform leading constant \(c_0=2.3153852110\ldots\). Any
improvement must use arithmetic correlations among representatives which
are not expressed by prefix-free cylinder packing.

## 1. Setup

Put

\[
\alpha:=\log _2 3,
\qquad
\gamma:=\alpha-1,
\qquad
h:=\log _2(4x).
\tag{1}
\]

The one-drop height path has one block at each level
\(m=0,\ldots,U\). Let \(n_m\) be the number of state indices at height
\(m\), and put

\[
\mathcal O:=\sum_{m=0}^{U}n_m2^{-m}.
\tag{2}
\]

The cycle-specific state envelope is

\[
x_j<4x\,2^{m_j}=2^{h+m_j}.
\tag{3}
\]

The refined occupation theorem gives

\[
\mathcal O
<\frac4\beta(h+1)+6,
\qquad
\beta:=\frac Nr>\frac32.
\tag{4}
\]

We will compare (4) with the strongest inequalities supplied by forward
and reverse Kraft packing.

## 2. The extension lemma

Let \(a^{(s)}\) be the infinite periodic valuation word beginning at the
cyclic start \(s\). Suppose that for every \(s\) we choose a finite prefix
\(w_s\) of length \(L_s\), and suppose that the \(r\) words \(w_s\) form
a prefix-free family. Put

\[
L_{\max}:=\max_s L_s.
\]

Extend each \(w_s\) along its own rotation to length \(L_{\max}\). These
extensions are distinct. Indeed, if two extensions agreed, then the
shorter of the original codewords would be a prefix of the longer one,
contrary to prefix-freeness.

We have proved the exact implication

\[
\boxed{
\text{variable prefix code with maximum }L_{\max}
\quad\Longrightarrow\quad
r\leq p_a(L_{\max}).}
\tag{5}
\]

Conversely, if all length-\(L_{\max}\) factors are distinct, the shortest
unique prefix of each rotation gives a prefix-free family. Thus variable
prefix uniqueness and fixed-depth uniqueness contain the same
cardinality information.

Applying the actual-factor theorem to (5) gives

\[
2r\leq
4L_{\max}+2+UL_{\max}
+(L_{\max}+1)
 \left\lceil\frac{eL_{\max}}r\right\rceil.
\tag{6}
\]

Consequently, variable lengths can help only through their Kraft weights.
They cannot improve the factor count itself.

If codewords are prefix-free only within individual height strata, then
(5) applies only within those strata. To combine them into one code, one
must also encode the height. This adds code length and weakens every
Kraft sum. The ideal globally prefix-free case is therefore the strongest
case to test.

## 3. Forward dyadic Kraft is occupation-trivial

For a positive valuation word \(w=(a_0,\ldots,a_{L-1})\), put

\[
A(w):=\sum_{i=0}^{L-1}a_i.
\]

The set of odd 2-adic integers realizing \(w\) is one residue class
modulo \(2^{A(w)+1}\). Its normalized Haar measure inside the odd
2-adic units is

\[
\mu_2(w)=2^{-A(w)}.
\tag{7}
\]

Hence every prefix-free family of exact valuation cylinders satisfies

\[
\sum_s2^{-A(w_s)}\leq1.
\tag{8}
\]

At height \(m\), consider the natural adaptive stopping rule

\[
A(w_s)+1>h+m.
\tag{9}
\]

This is precisely the exponent threshold at which two odd states below
the height envelope (3) cannot occupy the same dyadic cylinder. If the
last letter is nonterminal, it is at most two. Minimality in (9) then
gives

\[
A(w_s)\leq h+m+1
\]

and therefore

\[
2^{-A(w_s)}
\geq2^{-h-m-1}.
\tag{10}
\]

Even if we grant that all such height-adaptive cylinders are globally
prefix-free, equations (8) and (10) give only

\[
\sum_m n_m2^{-m}\leq2^{h+1}=8x.
\tag{11}
\]

A codeword which stops at the terminal exponent can overshoot (9) by
\(U+2\). Its Kraft weight is smaller, so terminal stopping can only
weaken (11). Likewise, applying Kraft separately at each height is
weaker than the globally disjoint case granted above.

## 4. Reverse ternary Kraft reaches only \(\mathcal O\leq4x\)

There is a slightly stronger reverse packing. A length-\(L\) factor
ending at an odd state \(y\) fixes one residue class for \(y\) modulo
\(3^L\). Every cycle state is a 3-adic unit, since

\[
2^{a_{j-1}}x_j=3x_{j-1}+1
\]

is nonzero modulo three. Thus a disjoint family of reverse endpoint
cylinders satisfies the unit-normalized Kraft bound

\[
\sum_s3^{-L_s}\leq\frac23.
\tag{12}
\]

We again grant the most favorable case in which all endpoint cylinders
are disjoint. Choose \(L_s\) minimally so that endpoint spacing exceeds
the height envelope:

\[
2\cdot3^{L_s}>2^{h+m_s},
\qquad\text{or equivalently}\qquad
\alpha L_s+1>h+m_s.
\tag{13}
\]

Minimality gives

\[
\alpha L_s\leq h+m_s+\alpha-1.
\]

Since \(2^{\alpha-1}=3/2\),

\[
3^{-L_s}
=2^{-\alpha L_s}
\geq\frac23\,2^{-h-m_s}.
\tag{14}
\]

Equations (12) and (14) yield exactly

\[
\boxed{\mathcal O\leq2^h=4x.}
\tag{15}
\]

This is already a consequence of the established occupation theorem.
A nontrivial positive cycle has \(x\geq7\): the values \(1,3,5\) belong
to the trivial trajectory. For \(x\geq7\), the elementary inequality
\(4x<2^x\) gives \(h<x\). Equations (4) and \(\beta>3/2\) now imply

\[
\mathcal O
<\frac83(x+1)+6
=\frac{8x+26}{3}
<4x.
\tag{16}
\]

Thus even ideal reverse packing adds no inequality. Actual endpoint
cylinders can overlap across height strata, in which case the available
packing statement is weaker still.

Taking a product of forward and reverse cylinders does not repair the
loss. Multiplying the lower weights in (10) and (14) gives, even under
ideal disjointness,

\[
\sum_s2^{-m_s-m_{s+L_s}}
\leq 2^{2h+1}=32x^2.
\]

The left side is at most \(\mathcal O\), while (16) gives
\(\mathcal O<4x\). Thus the two-adic by three-adic product packing has
still more slack.

## 5. The sharp quadratic height profile

One might try to recover a gain by applying factor capacity at every
height cutoff, rather than using a single global Kraft sum. We now show
that this also has no larger leading constant.

Fix \(z>0\), let \(U\) tend to infinity, and take

\[
r=\frac{U^2}{z}+o(U^2).
\tag{17}
\]

There are legitimate one-drop words whose omission sites
\(p_0<\cdots<p_{U-1}\) satisfy

\[
p_q=
r\frac{(q+1)^2}{(U+1)^2}+O(1).
\tag{18}
\]

To see this, recall that the eligible preterminal two-sites of the
rational mechanical clock have gaps one or two, because
\(e/r>1/2\). Choose the eligible site nearest each target in (18).
Only a bounded number of initial targets need to be separated by hand,
and the last target is at distance asymptotic to \(2r/U\) from the
terminal. Hence the \(O(1)\) error is uniform.

Let

\[
N_m:=\sum_{k=0}^{m}n_k
\]

be the number of starts at heights at most \(m\). Equation (18) gives,
uniformly when \(m=tU+o(U)\) and \(0<t\leq1\),

\[
\boxed{
N_m=t^2r+o(r).}
\tag{19}
\]

This profile respects the refined per-height occupation bound. Indeed,

\[
n_m=\frac{2m+1}{z}+O(1),
\]

while the established upper bound has leading term \(2m/\alpha\).
Every \(z\geq c_0>\alpha\) therefore leaves a fixed linear margin.

## 6. Exact omission incidence at every scale

Take

\[
L_m=\frac{m}{\alpha}+o(m)
\tag{20}
\]

and sum, over the starts of height at most \(m\), the number of omission
sites in the following \(L_m\) positions. Call this exact incidence
\(K_m\).

For the quadratic profile (18),

\[
\boxed{
K_m=mL_m+o(m^2).}
\tag{21}
\]

Indeed, interchange the sums over starts and omissions. Every omission
at distance at least \(L_m\) from the initial boundary and before the
height-\(m\) boundary is covered by exactly \(L_m\) selected starts.
The initial exceptions satisfy \(p_q<L_m\), hence
\(q=O(\sqrt m)\), and cost only
\(O(L_m\sqrt m)=o(m^2)\). Since
\(p_{q+1}-p_q\asymp m\) near \(q=m\), only \(O(1)\) omissions lie in
the final or forward boundary strip. They also contribute \(o(m^2)\).
This proves (21). At \(m=U\), cyclic incidence gives the exact identity
\(K_U=UL_U\).

The one-deletion encoding capacity at length \(L_m\) is

\[
E_{L_m}
=(L_m+1)\left\lceil\frac{eL_m}{r}\right\rceil
=\gamma L_m^2+o(m^2).
\tag{22}
\]

Grant the strongest useful stratified conclusion, namely that all
\(N_m\) selected starts already have distinct factors at this scale.
The representative mean-cost argument then gives

\[
2N_m
\leq4L_m+2+K_m+E_{L_m}.
\tag{23}
\]

Using (19) through (22), equation (23) becomes

\[
\frac{2m^2}{z}
\leq
m^2\left(\frac1\alpha+\frac{\gamma}{\alpha^2}\right)
+o(m^2).
\]

Since

\[
\frac1\alpha+\frac{\gamma}{\alpha^2}
=\frac{2\alpha-1}{\alpha^2}
=\frac2{c_0},
\]

we obtain only

\[
z\geq c_0.
\tag{24}
\]

At \(z=c_0\), every fixed positive height proportion \(t\) saturates
(23) to leading order. Thus a continuum of variable cutoffs does not
create a constant gap.

Even if one ignores the exact local incidence (21) and uses the global
budget \(K_m\leq UL_m\), the conclusion is the same. Equations (19),
(20), and (23) would require

\[
z\geq
g(t):=
\frac{2\alpha^2t}{\alpha+\gamma t}.
\tag{25}
\]

But

\[
g'(t)=
\frac{2\alpha^3}{(\alpha+\gamma t)^2}>0,
\qquad
g(1)=c_0.
\tag{26}
\]

Hence the strongest member of the entire stratified family is the
endpoint \(t=1\), which is exactly the fixed-\(L\) theorem.

The construction (18) is a rational one-drop profile, not a
denominator-one cycle. Its role is precise: it proves that the height
path, mechanical eligibility, exact omission incidence, and
variable-length capacity are jointly compatible with asymptotic equality
at \(c_0\). Denominator one could still supply additional arithmetic
information, but that information is not a Kraft or packing consequence.

## 7. Exact audit

The companion script
[cycles/one_drop_variable_length_kraft_no_go_certificate.js](cycles/one_drop_variable_length_kraft_no_go_certificate.js)
uses exact rational clocks at

\[
z=\frac{579}{250}=2.316>c_0.
\]

For \(U=128,256,512\), it chooses eligible omission sites at the
quadratic targets, verifies that eligible gaps and target errors are at
most two, and audits the cutoffs

\[
t=\frac14,\frac12,\frac34,1.
\]

At \(U=512\), the cumulative profile differs from \(t^2\) by less than
\(1.2\cdot10^{-5}\) in every displayed row. The exact incidence ratios
range from \(0.9337\) to \(1\), and all four mean-cost capacity ratios
lie between \(0.9832\) and \(1.0114\). These finite boundary deficits
converge to zero as proved in Section 6. The script also checks the exact
algebraic sign behind (26) and returns

\[
\texttt{one\_drop\_variable\_length\_kraft\_no\_go\_certificate=PASS}.
\]

## Conclusion

There is no variable-length Kraft improvement of the high-rise constant.
Global prefix-free cardinality extends to one fixed depth, forward and
reverse Kraft weights reduce to occupation inequalities already known,
and a realizable quadratic height profile saturates every positive
height scale at \(c_0\).

The surviving route must therefore use a genuinely new correlation among
the \(r\) denominator-one representatives. Examples would include an
arithmetic restriction coupling different height strata or a global
normalization identity stronger than disjoint 2-adic and 3-adic cylinder
packing. Variable lengths by themselves do not provide such a
correlation.
