# A global state envelope and the remaining critical-rise branch

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** Denominator one improves the state envelope from a polynomial
in the period to a constant multiple of the least state.  Combined with
exact mechanical factor weights, this gives the direct lower bound

\[
Q>\frac18\,2^{\frac{\alpha(r-3U-5)-U(U+1)}{2U+4}},
\qquad \alpha:=\log _2 3.
\]

It proves the desired critical polynomial bound above an explicit
quadratic curve and improves the unconditional one-drop rise barrier to
\(U\geq337{,}419\).  It does not control the complementary high-rise
branch.  An infinite exact rational family at the critical scale, together
with bounded integer endpoint shadows, proves that the first and last
spike constraints cannot supply the missing positive margin.  That margin
must use the global normalization of the common denominator to one.

## 1. A denominator-one state envelope

Let

\[
N:=\lceil r\alpha\rceil,
\qquad D:=2^N-3^r,
\qquad
B_j:=\left\lfloor\frac{jN}{r}\right\rfloor.
\]

Write the actual prefix exponent as

\[
A_j=B_j-m_j.
\]

In the one-drop branch, \(m_j\) starts at zero, rises by one at each of
the \(U\) omitted mechanical two-sites, and returns from \(U\) to zero on
the terminal edge.  We consider a nontrivial candidate, so \(U\geq1\) and
the unique terminal exponent \(U+2\) makes the word primitive.  Suppose
that the word is a denominator-one cycle, let \(x\) be its least odd state,
and write

\[
C=Dx
\]

for its full carry.  If \(C_j\) is the carry of the first \(j\) letters,
then

\[
x_j=2^{m_j}\frac{3^jx+C_j}{2^{B_j}}.
\tag{1}
\]

Put \(\delta:=N-r\alpha\in(0,1)\).  We first have

\[
\frac{3^j}{2^{B_j}}<2.
\tag{2}
\]

The full carry decomposes into the prefix contribution and a positive
suffix contribution.  Hence

\[
3^{r-j}C_j<C=Dx.
\tag{3}
\]

Moreover,

\[
N-B_j-(r-j)\alpha
=\delta\left(1-\frac jr\right)
+\left\{\frac{jN}{r}\right\}<2,
\tag{4}
\]

while

\[
\frac{D}{2^N}=1-2^{-\delta}<\frac12.
\tag{5}
\]

Equations (3) through (5) give

\[
\frac{C_j}{2^{B_j}}
<x(1-2^{-\delta})
 2^{N-B_j-(r-j)\alpha}
<2x.
\tag{6}
\]

Substitution in (1) proves the global envelope

\[
\boxed{x_j<4\cdot2^{m_j}x\qquad(0\leq j<r).}
\tag{7}
\]

Unlike the earlier bound \(2^{m_j}612r^{15}\), equation (7) uses the
full denominator-one identity.  The rational countermodels below show why
this distinction matters.

## 2. Exact mechanical repetition

Consider a constant-height run of \(u\) nontransition edges at height
\(m\).  On this run the exponent word is the rational mechanical word

\[
a_j=B_{j+1}-B_j.
\]

For \(u\geq2\), put

\[
L:=\left\lfloor\frac{u-1}{2}\right\rfloor.
\]

The \(L+2\) factors of length \(L\) beginning at the first \(L+2\)
positions remain inside the run.  A mechanical word has at most \(L+1\)
factors of length \(L\), so two of them agree.  Primitivity makes their
starting cycle states distinct.

Let \(q_L\) be the exponent sum of the common factor.  Every odd integer
realizing that factor belongs to one residue class modulo
\(2^{q_L+1}\).  Therefore the two starting states differ by at least
\(2^{q_L+1}\).  If the factor starts at \(s\), then

\[
q_L=B_{s+L}-B_s,
\qquad
q_L+1>\frac{LN}{r}>\alpha L.
\tag{8}
\]

Using (7) at both starts gives

\[
2^{\alpha L}<4\cdot2^m x.
\]

Since \(L\geq(u-2)/2\), and since the same weaker inequality is immediate
for \(u=0,1\), every run satisfies

\[
\boxed{
2^{\alpha(u-2)/2}<4\cdot2^m x.}
\tag{9}
\]

There are \(U+1\) transition edges and \(U+2\) constant-height runs.
Their internal lengths sum to \(r-U-1\), while their heights are

\[
0,1,2,\ldots,U,0.
\]

Multiplying (9) over the runs and squaring gives the exact necessary
inequality

\[
\boxed{
2^{\alpha(r-3U-5)}
<2^{U(U+1)}(4x)^{2U+4}.}
\tag{10}
\]

## 3. A direct lower bound for the bottom quotient

Put \(Q:=(x+1)/2\).  Since \(4x<8Q\), equation (10) gives the following
theorem.

**Theorem 1.** Every denominator-one one-drop cycle candidate satisfies

\[
\boxed{
Q>\frac18\,
2^{\frac{\alpha(r-3U-5)-U(U+1)}{2U+4}}.}
\tag{11}
\]

In particular,

\[
Q>163U^{143/5}
\tag{12}
\]

whenever

\[
\alpha(r-3U-5)-U(U+1)
\geq(2U+4)
\left(3+\log _2 163+\frac{143}{5}\log _2U\right).
\tag{13}
\]

The boundary in (13) is

\[
r=\frac{U^2}{\alpha}
+\frac{286}{5\alpha}U\log _2U+O(U)
=0.6309\ldots U^2+36.08\ldots U\log _2U+O(U).
\tag{14}
\]

More generally, the lower bound \(Q\geq U^a\) asks for an asymptotic
transition surplus of \(2aU\log _2U\).  Thus the exponent \(a=27.1\)
asks for the coefficient \(54.2\) in precisely the way suggested by the
critical polynomial gate.

Equation (11) is not a reformulation of the previous transition estimate.
Its state envelope and its right side use the actual denominator-one state
\(x\), not the external polynomial bound in \(r\).

## 4. An improved unconditional rise barrier

We combine (10) with the established estimate

\[
x<305r^{143/10}
\tag{15}
\]

and the period barrier

\[
r\geq r_0:=72{,}057{,}431{,}991.
\tag{16}
\]

Equations (10) and (15) imply

\[
\alpha(r-3U-5)
<U(U+1)+(2U+4)
\left(\log _2 1220+\frac{143}{10}\log _2r\right).
\tag{17}
\]

At \(r=r_0\), use the exact bounds

\[
\alpha>\frac{1054}{665},
\qquad 1220^{50}<2^{513},
\qquad r_0^{10}<2^{361}.
\tag{18}
\]

For \(U_0:=337{,}418\), the resulting integer comparison is

\[
\begin{aligned}
105400(r_0-3U_0-5)
&=7{,}594{,}746{,}639{,}752{,}800,\\
66500U_0(U_0+1)+35011585(2U_0+4)
&=7{,}594{,}734{,}953{,}464{,}400.
\end{aligned}
\tag{19}
\]

The left side exceeds the right side by \(11{,}686{,}288{,}400\), contrary to
(17).  The contradiction is stronger for every smaller \(U\).

For fixed \(U\leq U_0\), the left side of (17) minus the right side is
increasing with \(r\geq r_0\).  Indeed, \(\log 2>2/3\) and

\[
429(2U_0+4)<20r_0
\]

give a positive derivative.  The base contradiction therefore propagates
to every larger period.  We have proved

\[
\boxed{U\geq337{,}419.}
\tag{20}
\]

This improves the earlier unconditional bound \(U\geq267{,}884\).

## 5. A critical-scale rational no-go

We now test whether Beatty eligibility, bottom closure, and the endpoint
spikes can force the positive surplus missing from (13).  They cannot if
the common denominator is allowed to exceed one.

Put

\[
\gamma:=\log _2(3/2),
\qquad e:=\lceil\gamma r\rceil,
\qquad \delta_r:=e-\gamma r.
\]

There are infinitely many \(r\) for which \(\delta_r\geq1/2\).  Along
this subsequence, put

\[
U:=\left\lfloor\sqrt{\alpha r}\right\rfloor.
\tag{21}
\]

For all sufficiently large \(r\), retain the first internal one-site,
omit the next \(U\) internal one-sites, and retain every remaining
internal one-site.  Since \(e/r>1/2\), the first and last retained spike
times are

\[
t_1=2,
\qquad t_V=r-1.
\tag{22}
\]

Let \(Q_r:=K/D\) be the exact rational bottom fixed point.  Thus
\(DQ_r=K\) and bottom closure holds exactly.  Put

\[
R:=\frac{2^N}{3^r}=2^{\delta_r},
\qquad
\mathcal C:=\sum_{k=1}^V2^k\left(\frac23\right)^{t_k}.
\]

The bottom identity is

\[
4Q_r(R-1)=R(2-2^{-U})+\mathcal C.
\tag{23}
\]

The first term of \(\mathcal C\) is \(8/9\).  Every later spike occurs
at omission height \(U\).  Since its phase error has absolute value less
than one, each later term is smaller than \(2^{1-U}\).  Hence

\[
\mathcal C<\frac89+r2^{1-U}
=\frac89+o(1).
\tag{24}
\]

Since \(R\geq\sqrt2\), equations (23) and (24) give

\[
0<Q_r<4
\tag{25}
\]

throughout a tail of the subsequence.

These rational cycles are strictly least at the displayed anchor.  The
first two maps give

\[
Q_r\longmapsto\frac32Q_r
\longmapsto\frac98Q_r+\frac14>Q_r.
\]

Every subsequent branch through the last omission is ordinary.  After the
last omission, every suffix follows the unmodified mechanical clock.  Its
homogeneous multiplier over any prefix is greater than \(1/4\).  The state
at the last omission is greater than \((3/2)^UQ_r\), so every proper
suffix state is greater than \(Q_r\) once \(U\geq4\).

If \(Q_r=p/h\) is reduced, then \(h\) is odd and the cleared endpoint
valuations are exactly

\[
v_2(p)=1,
\qquad
v_3\left(2^{U+1}(2p-h)+h\right)=1.
\tag{26}
\]

Nevertheless, the transition surplus is negative.  Equation (21) gives
\(0\leq\alpha r-U^2<2U+1\), and therefore

\[
\begin{aligned}
\alpha(r-3U-5)-U(U+1)
&< (1-3\alpha)U+1-5\alpha\\
&<-2U-4.
\end{aligned}
\tag{27}
\]

Thus no positive multiple of \(U\log U\), including \(54.2U\log _2U\),
follows from the Beatty support, exact rational bottom equality, strict
leastness, or the cleared endpoint valuations.

There is also a short-run version of the same family.  Instead of
clustering the omissions, omit the internal one-sites of ordinals

\[
2,4,\ldots,2U,
\tag{27a}
\]

and retain every other one-site.  There is then one retained spike at each
height \(0,1,\ldots,U\), followed by the remaining spikes at height \(U\).
The early spike contribution to \(\mathcal C\) is smaller than

\[
\sum_{h=0}^U2^{1-h}<4,
\]

and the remaining contribution is again smaller than \(r2^{1-U}\).
Consequently the exact rational bottom quotient now satisfies

\[
0<Q_r<6
\tag{27b}
\]

throughout a tail.  Since the mechanical clock has no factor \(00\), every
ordinary run in this dispersed family has length at most three.

Strict leastness also persists.  If \(H_t\) is the omission height and
\(V_t\) is the number of retained spikes through time \(t\), then the
homogeneous prefix coefficient is

\[
\frac{3^t}{2^{t+V_t}}
=2^{H_t+\gamma t-\lfloor et/r\rfloor}
>2^{H_t-1}.
\tag{27c}
\]

The height-zero prefix is the same two-branch calculation as before, and
every later state has positive height.  Thus every proper state is larger
than \(Q_r\).  The endpoint valuations and the negative surplus (27) are
unchanged.

This dispersed family rules out a scalar long-run versus short-run
dichotomy.  Both a long ordinary run and uniformly bounded ordinary runs
can occur with exact Beatty placement, exact rational bottom closure,
strict leastness, bounded initial value, and the same negative transition
surplus.  The common denominator remains the only missing property.

## 6. Bounded integer endpoint shadows

The failure is not caused by an incompatibility between the two endpoint
congruences over the integers.  For the same \((r,U)\) and support, choose
an odd integer \(y\) by

\[
y\equiv3\pmod8,
\qquad
y\equiv2\cdot2^{-(U+1)}\pmod9,
\tag{28}
\]

and put \(Q_0:=(y+1)/2\).  The Chinese remainder theorem permits
\(0<y<72\), so \(Q_0<36\).  Moreover,

\[
v_2(Q_0)=1,
\qquad
v_3\left(2^{U+1}(2Q_0-1)+1\right)=1.
\tag{29}
\]

These are exactly the first-spike and last-spike conditions for (22), yet
the surplus remains (27).  This is an endpoint shadow, not a full path:
the middle dyadic cylinder is not asserted to close.  It proves that the
two endpoint constraints cannot add any positive margin to (10).

## 7. Exact audit

The checker
[one_drop_global_envelope_certificate.js](cycles/one_drop_global_envelope_certificate.js)
verifies the integer comparison (19), its propagation inequality, exact
rational bottom closure, every branch-domain division, strict leastness,
the cleared endpoint valuations, the bounded integer shadows, and the
negative-surplus power comparison.  It audits both the clustered family and
the dispersed family with maximum ordinary-run length three.  Its default
run returns eight distinct critical-scale rows and ends with status `PASS`.

The sparse valuation decoder has separately been frozen in
[cycle_one_drop_sparse_uniqueness_no_go.md](cycle_one_drop_sparse_uniqueness_no_go.md).
That theorem confirms that no independent endpoint residue is hidden in
the positive carry expansion.

## Conclusion

Denominator one does yield a stronger global inequality.  The state
envelope (7) and the exact mechanical weight in (8) give the direct bound
(11), prove the critical polynomial target above (14), and raise the
unconditional rise barrier to (20).

The remaining branch is sharply localized: it has at least critical rise,
so the transition surplus need not be positive.  Beatty placement, bottom
closure over the rationals, strict leastness, and both endpoint valuations
all coexist with a negative surplus and bounded initial value.  Therefore
the missing \(54.2U\log _2U\) margin, if true, must come from the full
denominator-one congruence across the middle cylinder.  It cannot be
obtained by adding the first and last spike estimates to the transition
inequality.
