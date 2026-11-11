# High-rise gcd and spacing in the one-drop sector

**Date:** 18 August 2026  
**Mode:** CALCULATE, followed by SOLVE  
**Status:** We give an exact omission-coordinate formula and an exact
meet-in-the-middle search for the denominator-one congruence.  In the new
low-quotient range

\[
\frac{U^2}{r}>\frac{2315}{1000},
\]

the residue spacing is at the ordinary counting scale and the largest gcd
is controlled by the factorization of the clock gap, not by \(U\), \(V\),
or transition complexity.  We also prove that, at every fixed square-root
rise ratio, rational strict-least profiles approach every integer
\(m\geq2\) from both sides.  Thus there is no fixed positive-width
forbidden arc about the denominator-one residue in the high-rise range.
These rational profiles have denominator greater than one, so this is a
no-go theorem for real spacing arguments, not a counterexample to the
denominator-one gate.

## 1. Omission coordinates

Fix an integer \(r\geq3\), and put

\[
N:=\lceil r\log _2 3\rceil,
\qquad e:=N-r,
\qquad D:=2^N-3^r.
\tag{1}
\]

Since \(1/2<e/r<1\), the first one-site is \(t_1=2\).  List all internal
one-sites of the anchored mechanical clock as

\[
2\leq t_1<t_2<\cdots<t_n<r,
\qquad n=e-1.
\tag{2}
\]

We use the bottom convention in which a retained one-site is a spike and
an omitted one-site is a rise.  Let

\[
1\leq s_1<s_2<\cdots<s_U\leq n
\tag{3}
\]

be the ordinal positions of the omitted sites.  Thus the spike count is
\(V=n-U\).  Define

\[
w_i:=3^{r-t_i}2^{t_i+i-2},
\qquad
P_i:=\sum_{j=1}^i w_j,
\qquad
b_i:=P_{i-1}-w_i,
\tag{4}
\]

with \(P_0:=0\).

The bottom numerator is

\[
K:=2^{N-1}-2^{r-1+V}+3J,
\tag{5}
\]

where

\[
J:=\sum_{k=1}^{V}3^{r-1-\tau_k}2^{\tau_k+k-2}
\tag{6}
\]

and \(\tau_1<\cdots<\tau_V\) are the retained spike times.  Denominator
one is exactly \(D\mid K\).

**Proposition 1.** For every \(0\leq U\leq n\) and every omission set
as in (3),

\[
\boxed{
2^U K
=2^{N-2}(2^{U+1}-1)+P_n
+\sum_{m=1}^{U}2^{U-m}b_{s_m}.}
\tag{7}
\]

Moreover,

\[
\boxed{b_1<b_2<\cdots<b_n.}
\tag{8}
\]

When \(U=0\), the omission set and the sum in (7) are understood to be
empty.

**Proof.** Put \(\mathcal S:=\{s_1,\ldots,s_U\}\).  If the eligible site
\(i\notin\mathcal S\) is retained, then its spike rank is

\[
i-\#\{m:s_m<i\}.
\]

Its contribution to \(3J\) is therefore \(w_i\) divided by one factor of
\(2\) for every earlier omission.  Put \(s_0:=0\) and
\(s_{U+1}:=n+1\).  Splitting the full sum \(P_n\) at the omissions gives

\[
3J=\sum_{m=0}^{U}2^{-m}
\sum_{s_m<i<s_{m+1}}w_i.
\]

Multiplication by \(2^U\), followed by telescoping at
\(s_1,\ldots,s_U\), gives

\[
2^U(3J)=P_n+\sum_{m=1}^{U}2^{U-m}(P_{s_m-1}-w_{s_m}).
\]

Since \(r-1+V=N-U-2\), equation (7) follows from (5).

It remains to check (8).  We have \(1/2<e/r<1\), so consecutive one-sites
have gap \(d:=t_{i+1}-t_i\in\{1,2\}\).  Hence

\[
\frac{w_{i+1}}{w_i}
=\frac{2^{d+1}}{3^d}
\in\left\{\frac43,\frac89\right\}.
\]

Consequently,

\[
b_{i+1}-b_i=2w_i-w_{i+1}>0.
\]

This proves the proposition. \(\square\)

Equation (7) is useful because the selected set now has size \(U\), not
\(V\asymp r\).  In the critical high-rise range, \(U\asymp\sqrt r\).

## 2. Exact meet-in-the-middle search

Split the eligible indices into a left half and a right half.  If exactly
\(u\) omissions lie in the left half, equation (7) separates as

\[
\sum_{m=1}^{u}2^{U-m}b_{s_m}
+\sum_{j=1}^{U-u}2^{U-u-j}b_{s_{u+j}}.
\tag{9}
\]

The two sums in (9) are independent.  Since \(D\) is odd, we multiply by
\(2^{-U}\pmod D\), sort the right residues, and binary-search the additive
inverse of every left residue.  The predecessor and successor in the
sorted cyclic list give the exact least value of

\[
\min_{q\in\mathbf Z}|K-qD|.
\tag{10}
\]

In particular, a positive minimum certifies that \(D\nmid K\) for the
complete fixed-\((r,U)\) stratum.  The number of stored objects is a sum of
half-binomial coefficients, rather than
\(\binom{e-1}{U}\).

The monotonicity (8) gives an independent algorithm.  At any ordered
prefix, the least completion uses the first available indices and the
greatest completion uses the last available indices.  This gives an exact
interval of possible values in (7).  A branch is discarded when this
interval is farther from the lattice \(2^UD\mathbf Z\) than the current
best value.  The two algorithms and exhaustive enumeration agree at
\((r,U)=(18,7)\).

The checker
[one_drop_critical_gcd_mitm_probe.js](cycles/one_drop_critical_gcd_mitm_probe.js)
also verifies (7) against the original spike formula for every profile
through \(r=22\).

## 3. The high-rise spacing audit

For each row below, we take

\[
U:=\left\lceil\sqrt{\frac{2315}{1000}r}\right\rceil.
\tag{11}
\]

Put

\[
\mathcal N:=\binom{e-1}{U},
\qquad
\eta:=\log _2\left(
\frac{\mathcal N\min_q|K-qD|}{D}
\right).
\tag{12}
\]

The quantity \(\eta\) compares the exact gap with the elementary counting
scale \(D/\mathcal N\).

\[
\begin{array}{c|c|c|r|r|r|r}
r&U&V&\mathcal N&\min_q|K-qD|&q&\eta\\ \hline
48&11&17&21{,}474{,}180&968{,}891{,}605{,}940{,}612&2&-1.778\\
54&12&19&141{,}120{,}525&17{,}939{,}103{,}398{,}374{,}931&3&-2.925\\
60&12&23&834{,}451{,}800&5{,}975{,}391{,}093{,}203{,}492{,}284&2&-2.885\\
66&13&25&5{,}414{,}950{,}296&57{,}316{,}780{,}831{,}840{,}130{,}138&8&-4.960\\
72&13&29&25{,}518{,}731{,}280&918{,}229{,}710{,}763{,}096{,}281{,}548{,}236&2&0.302\\
78&14&31&166{,}871{,}334{,}960&11{,}482{,}037{,}000{,}105{,}653{,}408{,}811{,}137&5&-1.338
\end{array}
\tag{13}
\]

There are no denominator-one hits in (13).  More importantly for the
proof strategy, every value of \(\eta\) is within five bits of zero.  The
residues behave at the ordinary counting scale, not at a visibly enlarged
spacing scale.  The closest points also occur at the bounded quotients
\(q=2,3,5,8\).  At \(r=41\), the same search gives \(U=10\) and a closest
quotient \(q=72\), with absolute defect \(10{,}681{,}767{,}376\).

These are exact finite statements.  The counting-scale interpretation is
a diagnostic observation, not an asymptotic theorem.

## 4. Reduced denominators and transition complexity

For the smaller rows we exhaust every profile and compute

\[
h:=\frac{D}{\gcd(D,K)}.
\tag{14}
\]

\[
\begin{array}{c|c|c|r|r|r|r}
r&U&V&\mathcal N&\max\gcd(D,K)&\min h&\min_q|K-qD|\\ \hline
20&7&4&330&499&1{,}619{,}605&331{,}478\\
24&8&6&3{,}003&2{,}113&126{,}515{,}039&174{,}221{,}372\\
28&9&7&11{,}440&727&16{,}929{,}270{,}473&857{,}195{,}830\\
32&9&9&48{,}620&73&5{,}462{,}734{,}586{,}759&2{,}859{,}097{,}226\\
36&10&11&352{,}716&1{,}507&91{,}662{,}734{,}475{,}589&586{,}807{,}577{,}212\\
40&10&13&1{,}144{,}066&1{,}918{,}655&3{,}277{,}857{,}986{,}273&6{,}451{,}107{,}158{,}778\\
44&11&14&4{,}457{,}400&46{,}781&4{,}185{,}902{,}792{,}454{,}203&27{,}613{,}994{,}927{,}180
\end{array}
\tag{15}
\]

The minimum denominator is already large in this range, but it fluctuates
with the clock.  At \(r=36\), increasing \(U\) from \(10\) to \(11\)
changes the maximum gcd from \(1{,}507\) to \(1{,}090{,}879\).  At
\(r=42\), both \(U=10\) and \(U=11\) have maximum gcd \(17\).  In the
\(U=10\) row, the factor \(17\) occurs at every decision-transition count
from \(2\) through \(20\).  Thus the attainable gcd is controlled
primarily by the arithmetic factorization of \(D\).

The profiles maximizing the gcd are also different from those minimizing
the residue distance.  For example, at \((r,U)=(30,10)\), the maximum gcd
\(186{,}793\) occurs at decision-transition count \(14\), while the least
residue occurs at count \(7\).  Neither statistic is monotone in the
maximum constant-height block or in the repeated-factor depth.

Consequently, the scan does not suggest a bound of the form

\[
h\geq f(U),
\qquad
h\geq f(V),
\qquad\text{or}\qquad
h\geq f(\text{transition complexity})
\tag{16}
\]

which is sharp enough to detect denominator one.  A successful gcd theorem
would have to control several prime-power projections simultaneously for
one profile.

## 5. A high-rise modular-arc no-go

We now show that the absence of a visible real gap is structural.

Put

\[
\alpha:=\log _2 3,
\qquad
\delta_r:=\lceil\alpha r\rceil-\alpha r.
\tag{17}
\]

Fix \(c>0\), and set \(U:=\lceil c\sqrt r\rceil\).  For all sufficiently
large \(r\), there are at least \(U+2\) one-sites.  Choose the first
one-site \(t_1=2\) as a spike, omit the next \(U\) one-sites, and choose
every remaining one-site as a spike.  Writing the ordered spike times as
\(\tau_1<\cdots<\tau_V\), define

\[
E_r:=\sum_{j=1}^{V}
\frac{3^{r-1-\tau_j}}{2^{N-\tau_j-j}}.
\tag{18}
\]

The first spike contributes

\[
\frac8{27}2^{-\delta_r}.
\tag{19}
\]

Every later spike occurs after all \(U\) omissions.  If
\(h:=r-\tau_j\), the
mechanical clock identity gives

\[
N-\tau_j-j=h+U+\left\lceil\frac{eh}{r}\right\rceil.
\]

Since \(N/r>\alpha\), each later term in (18) is less than
\(1/(3\cdot2^U)\).  Therefore,

\[
E_r=\frac8{27}2^{-\delta_r}+O(r2^{-U}).
\tag{20}
\]

The exact bottom identity gives the rational fixed point

\[
Q_r=
\frac{3E_r/4+1/2-2^{-U-2}}
{1-2^{-\delta_r}}.
\tag{21}
\]

For \(0<\delta<1\), put

\[
F(\delta):=
\frac{1/2+(2/9)2^{-\delta}}
{1-2^{-\delta}}.
\tag{22}
\]

**Theorem 2.** Fix \(c>0\) and an integer \(m\geq2\).  There are two
strictly increasing sequences of positive integers
\(r_k^-,r_k^+\to\infty\) and associated exact rational strict-least
profiles of the form above such that

\[
\frac{U^2}{r}\longrightarrow c^2,
\qquad
Q_r\longrightarrow m,
\tag{23}
\]

with \(Q_{r_k^-}>m\) and \(Q_{r_k^+}<m\).  Every sufficiently large
profile on these sequences has reduced denominator greater than one.

**Proof.** Define

\[
a_m:=\frac{m-1/2}{m+2/9},
\qquad
\delta_m:=-\log _2a_m.
\tag{24}
\]

Then \(0<\delta_m<1\) and \(F(\delta_m)=m\).  The number \(\alpha\) is
irrational, so the phases \(\delta_r\) are dense in \((0,1)\).  On a
compact neighborhood of \(\delta_m\), equations (20) and (21) give

\[
Q_r=F(\delta_r)+O(r2^{-U}),
\tag{24a}
\]

and \(|F'|\) is bounded below there by some \(\lambda>0\).  For every
sufficiently large \(k\), each of the one-sided intervals

\[
\left(\delta_m-\frac1k,\delta_m-\frac1{2k}\right),
\qquad
\left(\delta_m+\frac1{2k},\delta_m+\frac1k\right)
\tag{24b}
\]

contains infinitely many phases.  We choose \(r_k^-\) and \(r_k^+\) in
the left and right intervals, respectively, larger than the preceding
choices and large enough that

\[
r_k^\pm2^{-\lceil c\sqrt{r_k^\pm}\rceil}<\frac1{k^2}.
\tag{24c}
\]

Moreover, \(F'(\delta)<0\) on \((0,1)\).  At either chosen phase, the
mean-value theorem gives

\[
|F(\delta_{r_k^\pm})-m|\geq\frac{\lambda}{2k}.
\tag{24d}
\]

The error in (24a) is \(O(k^{-2})\) by (24c), so it cannot change the
sign in (24d) once \(k\) is large.  This proves (23), with
\(Q_{r_k^-}>m\) and \(Q_{r_k^+}<m\).

It remains to check strict leastness.  The first two proper states are

\[
Q_r\longmapsto\frac32Q_r
\longmapsto\frac98Q_r+\frac14>Q_r.
\tag{25}
\]

Every branch until the second spike is ordinary.  Let \(Z_r\) be the state
immediately before that spike.  There are at least \(U-1\) ordinary steps
after (25), so

\[
Z_r\geq\left(\frac98Q_r+\frac14\right)
\left(\frac32\right)^{U-1}.
\tag{25a}
\]

After the second spike, every one-site is a spike.  In any nonempty
segment of length \(1\leq\ell<r\) beginning at that spike and ending at a
proper state, the number \(w\) of spikes satisfies

\[
w\leq\left\lceil\frac{e\ell}{r}\right\rceil.
\]

The mechanical balance bound gives

\[
\frac{3^\ell}{2^{\ell+w}}
=2^{(\alpha-1)\ell-w}
>2^{-\delta_r\ell/r-1}>2^{-2}.
\tag{25b}
\]

The affine terms are positive.  Thus every state at or after the second
spike is greater than \(Z_r/4\).  Since \(Q_r\) remains bounded and
\((3/2)^U\to\infty\), every proper state is greater than \(Q_r\) for all
sufficiently large rows.  Finally, convergence and the one-sided
inequalities give \(m<Q_r<m+1\) on the first sequence and
\(m-1<Q_r<m\) on the second, once \(r\) is sufficiently large.  Hence the
reduced denominator is greater than one. \(\square\)

If \(Q_r>m\), then

\[
\frac{[K]_D}{D}\longrightarrow0.
\]

If \(Q_r<m\), the same normalized residue tends to \(1\).  Taking
\(c^2>2315/1000\) proves that no fixed positive-width modular arc about
\(0\pmod D\) can separate the high-rise language from denominator one.
It also shows that no lower bound \(Q\geq U^p\), for any fixed \(p>0\),
follows from the mechanical phase, strict leastness, local divisibility,
and bottom closure without using the normalization of the common
denominator to one.

## Conclusion

The high-rise scan does not reveal a polynomial quotient law.  Residue
spacing is at the counting scale, low quotients remain the closest points,
and gcd attainment follows the factors of \(D\) rather than transition
complexity.  Theorem 2 makes the real-spacing obstruction exact at every
fixed square-root rise ratio, including the new range
\(U^2/r>2.315\).

Thus the viable target is narrower than a modular interval theorem.  One
must prove an integrality-specific simultaneous nonvanishing result for
the prime-power projections of \(K\), or an equivalent theorem which uses
that the common denominator is exactly one.  No such all-depth theorem is
proved here.
