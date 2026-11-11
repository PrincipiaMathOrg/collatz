# Negative shortcut supercriticality audit

## 1. Statement and notation

Let

\[
 S_-(m)=\begin{cases}
 m/2,&m\equiv0\pmod2,\\
 (3m-1)/2,&m\equiv1\pmod2.
 \end{cases}
\]

For a parity word \(w=b_0\cdots b_{k-1}\), with \(b_i=1\) at an
odd step, put \(M=2^k\), \(P=3^s\), where \(s=\sum b_i\), and define
the negative carry by

\[
 C_0=0,\qquad
 (P',M',C')=\begin{cases}
 (3P,2M,3C+M),&b_i=1,\\
 (P,2M,C),&b_i=0.
 \end{cases}
\]

Then every realization satisfies

\[
 M S_-^k(m)=Pm-C.                                      \tag{1}
\]

There is a unique canonical representative \(r\in[0,M)\) with
\(Pr\equiv C\pmod M\).  When \(b_0=1\), it lies in \([1,M)\) and is
odd.  Write

\[
 y=\frac{Pr-C}{M}.
\]

Every other nonnegative realization is \(r+tM\), and its endpoint is
\(y+tP\).  Consequently, when \(P\ge M\), endpoint monotonicity for the
whole cylinder reduces exactly to the canonical case \(y\ge r\).

## 2. The endpoint-only assertion is false

The smallest positive-start counterexample is

\[
 2\longmapsto1\longmapsto1\longmapsto1.
\]

Its parity word is \(011\), so \(P/M=3^2/2^3=9/8>1\), while the endpoint
is \(1<2\).

If the start is required to be odd, the smallest counterexample is

\[
 3\longmapsto4\longmapsto2\longmapsto1
 \longmapsto1\longmapsto1\longmapsto1.
\]

Here \(w=100111\), \(P/M=3^4/2^6=81/64>1\), and again the endpoint is
\(1<3\).  This explains why a final coefficient inequality cannot replace
the prefix barriers.  In both examples the coefficient first falls below
one.

## 3. The genuine surviving candidate

The stronger candidate is

> If every nonempty prefix satisfies \(P_j/M_j\ge1\), then the endpoint
> satisfies \(y\ge r\).

Since no positive powers of \(2\) and \(3\) agree, every nonempty prefix
inequality is strict.  Expanded shortcut words and accelerated negative
valuation words have the same condition: within an accelerated block the
shortcut coefficient decreases, so its minimum occurs at the block end.
Thus the candidate says that every exact positive negative-map barrier path
is nondescending.  It would imply the target-one theorem immediately, and is
strictly stronger than the theorem proved in the audit.  It is not proved
here.

## 4. Exact extension calculus and the unresolved gate

Suppose a canonical prefix has data \((M,P,r,y)\).  On prescribing the next
bit \(b\), the lifted representative is

\[
 r'=r+tM,\qquad z=y+tP,
\]

where \(t\in\{0,1\}\) is uniquely chosen so that \(z\equiv b\pmod2\).
The new endpoint is \((3z-1)/2\) for \(b=1\), and \(z/2\) for \(b=0\).

Assume inductively that \(y\ge r\).

* An odd extension is always safe.  If \(y\) is odd, then \(t=0\) and
  \((3y-1)/2\ge y\ge r\).  If \(y\) is even, then \(t=1\), and
  \[
  \frac{3(y+P)-1}{2}-(r+M)
  \ge \frac{r+M-1}{2}\ge0.
  \]

* A zero extension is permitted by the barrier exactly when \(P\ge2M\).
  Its monotonicity is equivalent to the following parity-sensitive gate:
  \[
  \boxed{
  \begin{array}{ll}
  y\text{ even}:&y\ge2r,\\[2mm]
  y\text{ odd}:&y+P\ge2(r+M).
  \end{array}}                                           \tag{2}
  \]

Indeed, in the even case \(t=0\) and the new endpoint is \(y/2\); in the
odd case \(t=1\) and it is \((y+P)/2\).  Conversely, applying the desired
monotonicity theorem to this zero extension gives exactly (2).  Thus (2),
not the odd branch, is the complete one-step obstruction.

## 5. A failed strengthening retained as a regression

The tempting invariant

\[
 y-1\ge \left\lfloor\frac PM\right\rfloor(r-1)          \tag{3}
\]

is false.  For

\[
 w=1101101101
\]

the exact data are

\[
 M=1024,\quad P=2187,\quad C=3767,\quad r=5,\quad y=7.
\]

Every prefix coefficient exceeds one, but (3) reads \(6\ge8\).  The word is
three laps of the negative cycle word \(110\), followed by an odd step.
Any proposed induction must therefore be tested against powered cycle
prefixes before it is trusted.

## 6. Structure of a shortest counterexample

Assume, only for reduction, that the all-prefix candidate fails, and choose
a word of least length.  Put \(q_j=P_j/M_j\), with \(q_0=1\).  Then:

1. The last bit is zero, because an odd extension is always safe.
2. Every proper trajectory endpoint is at least the initial state.
3. The final coefficient is the strict minimum among the nonempty prefix
   coefficients:
   \[
   1=q_0<q_k<q_j\qquad(1\le j<k).                       \tag{4}
   \]
   To prove this, choose an index \(j\in\{1,\ldots,k\}\) at which
   \(q_j\) is minimal.  If \(j<k\), the prefix ending at \(j\) and the
   suffix beginning at \(j\) are both shorter prefix-supercritical paths.
   Minimality gives \(x_j\ge x_0\) and \(x_k\ge x_j\), contradicting
   \(x_k<x_0\).
4. Since \(q_1=3/2\), (4) gives
   \[
   1<q_k<\frac32,
   \qquad s=\left\lceil k\log_3 2\right\rceil.          \tag{5}
   \]
   Every proper suffix has coefficient below one.  Hence the word is a
   primitive near-critical coefficient excursion; in particular it cannot
   be a proper power.
5. Up to the first descent the trajectory is simple.  A repeated state
   would trap the deterministic orbit in a cycle and prevent the later
   descent.

This reduction removes dense words, long all-one runs, and proper powers
from the hard case.  It does not prove that the remaining primitive words
are safe.

## 7. Rational fixed-point reduction

Let a hypothetical canonical counterexample have \(y=r-\delta<r\), and put

\[
 D=P-M>0,\qquad g=\gcd(D,C),\qquad p=C/g,\qquad q=D/g.
\]

The affine fixed point is

\[
 x_* = \frac{C}{D}
     = r+\frac{M\delta}{D}>r.                           \tag{6}
\]

The prescribed word turns \(p/q\) into a positive rational cycle.  On its
integer numerators the steps are

\[
 p_i\longmapsto
 \begin{cases}
 (3p_i-q)/2,&b_i=1,\\
 p_i/2,&b_i=0.
 \end{cases}                                            \tag{7}
\]

The cycle is positive because at every prefix it lies strictly above the
corresponding positive integer trajectory.  Moreover

\[
 C=Dr+M\delta.
\]

Since \(D\) and \(g\) are odd, \(\gcd(g,M)=1\).  Reduction of (6) therefore
forces

\[
 g\mid\delta;\qquad \delta=gt;\qquad p-qr=Mt            \tag{8}
\]

for some positive integer \(t\).  Conversely, a barrier rational cycle
whose least dyadic cylinder representative satisfies (8) supplies the same
counterexample.  The remaining question is therefore an exact rational-cycle
ordering/divisibility gate, not a real-variable inequality.

## 8. Computation and status

The companion script `negative_supercritical_search.js` contains:

* the two exact counterexamples above;
* canonical-cylinder random searches;
* exhaustive generation of every prefix-supercritical word through depth
  25 (573,162 words at depth 25), with no endpoint descent;
* 100,000 random prefix-supercritical words of length at most 1,024, with no
  descent;
* 100,000 sampled critical-weight words of length 256, with no descent;
* a bounded generalized rational-cycle scan.

Its SHA-256 digest at the time of this report is
`6CD86A190DC60C805B225C2C2F4AAF6D5A557FF2F1FF813D2A38235497ECB2FF`.

The random runs are diagnostic only.  The exhaustive run is a finite
certificate, not an all-depth proof.  The mathematically honest status is:

* final coefficient only: **refuted**;
* all-prefix coefficient barrier: **survives finite attack but unresolved**;
* exact remaining local obstruction: the zero-extension inequalities (2);
* exact minimal obstruction: a primitive near-critical word satisfying
  (4)--(5), equivalently the rational-cycle alignment (6)--(8).
