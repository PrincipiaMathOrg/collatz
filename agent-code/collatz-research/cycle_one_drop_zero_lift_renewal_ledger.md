# The zero-lift renewal ledger

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** Exact local obstruction. This note does not prove the strengthened
bound $Q\geq 2^U-2$.

## 1. Setup

Put

\[
e=\lceil r\log _2(3/2)\rceil,
\qquad
b_t=\left\lfloor\frac{et}{r}\right\rfloor-
\left\lfloor\frac{e(t-1)}{r}\right\rfloor.
\tag{1}
\]

For $r\geq13$, one has

\[
\frac12<\frac er<\frac23.
\tag{2}
\]

Consequently, the interior of the anchored clock has neither $00$ nor
$111$. Apart from its boundary pieces, it is a concatenation of the
renewal blocks $10$ and $110$.

Let a block start after $s$ branches. Write its input as

\[
x=\frac{3^s q+B}{2^L},
\qquad L=s+V,
\tag{3}
\]

where $V$ is the number of preceding spike branches, and put

\[
h=\left\lfloor\frac{es}{r}\right\rfloor-V.
\tag{4}
\]

The integer $h$ is the number of preceding omissions. An ordinary
branch at a clock-one position increments $h$; a spike does not.

## 2. Exact block domains

The partial map is

\[
O(x)=\frac{3x}{2},
\qquad
S(x)=\frac{3x+1}{4}.
\tag{5}
\]

The complete valid patterns on a $10$ block are exactly

\[
\begin{array}{c|c|c}
\text{pattern}&\text{input domain}&\text{output}\\ \hline
SO&x\equiv5\pmod 8&(9x+3)/8\\
OO&x\equiv0\pmod 4&9x/4.
\end{array}
\tag{6}
\]

The complete valid patterns on a $110$ block are exactly

\[
\begin{array}{c|c|c}
\text{pattern}&\text{input domain}&\text{output}\\ \hline
SSO&x\equiv17\pmod {32}&(27x+21)/32\\
SOO&x\equiv5\pmod {16}&(27x+9)/16\\
OSO&x\equiv14\pmod {16}&(27x+6)/16\\
OOO&x\equiv0\pmod 8&27x/8.
\end{array}
\tag{7}
\]

These congruences are both necessary and sufficient. In the affine
cylinder (3), a domain $x\equiv a\pmod {2^m}$ is equivalently

\[
\boxed{
q\equiv3^{-s}\bigl(a2^L-B\bigr)
\pmod {2^{L+m}}.
}
\tag{8}
\]

Thus each surviving renewal exposes an explicit new dyadic window of
the initial value $q$.

## 3. The first bad crossing

Suppose the scalar barrier $q\geq2^h-2$ holds at the block input and
fails for the first time at an omitted clock-one site in the block. A
nonzero residue lift cannot remain below the barrier once $s\geq4$.
Indeed, (2) gives

\[
L-h=s+2V-\left\lfloor\frac{es}{r}\right\rfloor
\geq \left\lceil\frac s3\right\rceil+2V\geq2.
\tag{9}
\]

A block creates at most two new omissions. Hence every nonzero lift is
at least $2^L\geq2^{h+2}$, which clears the largest possible
post-block threshold.

It follows that a first bad crossing either exits, lifts above the
barrier within the same renewal, or persists with $q$ unchanged in
one of exactly four cases:

\[
\boxed{
OO:\ x\equiv0\pmod4,
\quad
SOO:\ x\equiv5\pmod{16},
\quad
OSO:\ x\equiv14\pmod{16},
\quad
OOO:\ x\equiv0\pmod8.
}
\tag{10}
\]

The statement above is restricted to mature block starts $s\geq4$; the
finite initial starts are separate boundary cases.

## 4. The $q=14$ shadow

For $r=19$ and $r=24$, the anchored clocks agree through time $17$.
Starting from $q=14$, the path remains valid through time $16$, has
five omissions, and enters the final $110$ renewal at

\[
x=132.
\tag{11}
\]

The first two branches are ordinary:

\[
132\longmapsto198\longmapsto297.
\tag{12}
\]

The last clock bit is zero, but $297$ is odd. Equivalently,
$132\equiv4\pmod8$, whereas an $OOO$ continuation requires
$x\equiv0\pmod8$. The shadow therefore exits at the forced zero.

After the first $16$ branches its cylinder modulus is $2^{21}$. The
ordinary child at the forced zero has least representative

\[
q'=14+2^{21},
\tag{13}
\]

so the alternative lift clears the omission threshold immediately.
This disposes of the unique delayed shadow seen in the audited partial
invariant search. It is not an all-depth uniqueness statement.

## 5. Why the local recursion stops here

Equations (6) and (7) do not form a closed finite-state forward
recursion. Every renewal has the form

\[
x'=\frac{ax+c}{2^m}.
\tag{14}
\]

The current domain fixes $x\bmod 2^m$, but computing
$x'\bmod2^k$ requires $x\bmod2^{m+k}$. Each successive zero-lift
renewal therefore asks for new, previously unseen high bits of $x$,
or equivalently of $q$ through (8). No bounded residue window around
$2^h$ propagates these four survivor classes.

The strengthened inequality is consequently reduced, but not proved:
one must exclude arbitrarily long chains through the four congruences in
(10). For a minimal counterexample, the usual tail descent makes such a
chain a strict-minimum partial Collatz excursion whose newly exposed
residue digits remain zero at every renewal.

The exact residue audit is implemented in
[`cycles/beatty_zero_lift_renewal_certificate.js`](cycles/beatty_zero_lift_renewal_certificate.js).

## 6. Stabilization and the exact remaining gate

We now record what a genuine endpoint failure would force. For a complete
anchored word of length \(n:=r-1\), let \(q_s\) be the least positive
representative of its prefix of length \(s\), and put

\[
L_s:=s+V_s.
\tag{15}
\]

Let \(q:=q_n\). Since the prefix cylinders are nested, we have

\[
q\equiv q_s\pmod {2^{L_s}}.
\tag{16}
\]

Suppose towards a contradiction that the strengthened endpoint bound
fails, so that \(q+2<2^U\). Put

\[
\tau:=\min\{s:L_s\geq U\}.
\tag{17}
\]

The set in (17) is nonempty, since \(e\leq r\) gives
\(U\leq r-1\leq L_n\).

Then \(0<q<2^U\leq2^{L_\tau}\), and (16) gives

\[
q_s=q\qquad(\tau\leq s\leq n).
\tag{18}
\]

Thus every lift after time \(\tau\) is zero. Since \(L_s\geq s\), we
also have \(\tau\leq U\). Recalling that \(U=e-1-V\), we obtain the
exact lower bound

\[
n-\tau\geq n-U=r-e+V.
\tag{19}
\]

After discarding at most two initial branches to reach a renewal boundary,
this suffix follows the six maps in (6) and (7) with the same fixed initial
representative \(q\). The only blocks that increase the omission count are

\[
OO,\qquad SOO,\qquad OSO,\qquad OOO,
\tag{20}
\]

with increments \(1,1,1,2\), respectively. Consequently, a failure of the
strengthened endpoint bound is equivalent to a complete anchored integer
path whose final zero-lift suffix satisfies the corresponding domains in
(6) and (7), has length at least \(r-e+V\), and ends with
\(q+2<2^U\). The renewal formulation does not weaken this condition. It
rewrites the same cylinder residue one block at a time.

Conversely, suppose that a positive integer \(q\) realizes such a complete
anchored path and satisfies \(q+2<2^U\). Since
\(q<2^U\leq2^{L_n}\), it is the least positive representative of the full
cylinder. Thus the strengthened endpoint bound fails. This proves the
claimed equivalence.

There is also an exact obstruction to closing the argument with a fixed
residue window. Each renewal has the form

\[
T(x)=\frac{ax+c}{2^m},
\qquad a\text{ odd}.
\tag{21}
\]

Fix \(k\geq m\), and take an input \(x\) in the domain of \(T\). The
input \(x+2^k\) lies in the same domain and is congruent to \(x\) modulo
\(2^k\), but

\[
T(x+2^k)-T(x)=a2^{k-m}\not\equiv0\pmod {2^k}.
\tag{22}
\]

Therefore no deterministic forward recursion based only on a fixed number
of low endpoint bits can propagate these renewals. Any successful descent
must use an unbounded residue quantity or an additional global condition,
such as bottom closure. Equations (15) through (22) are an exact
reformulation of the remaining strengthened gate, not an all-depth proof
of it.
