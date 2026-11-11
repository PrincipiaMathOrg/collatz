# The cycle first-crossing/complement gate

**Mode:** SOLVE.  We isolate the arithmetic compatibility of the first
coefficient crossing with the complementary return block.

**Status:** The exact common-state compatibility is equivalent to the original
integer-cycle divisibility.  The complementary block nevertheless gives a
new all-depth period-versus-complement-depth bound.  It does not exclude the
case of an arbitrarily deep complement.

## Setup

Let a primitive positive accelerated cycle be rotated to its least odd state
\(n\), and expand it into a shortcut word.  Stop at the first coefficient
crossing and write the full word as \(uv\).  Put

\[
M=2^k,\quad P=3^s,\quad D_u=M-P,
\]

and, for the complementary block \(v\), put

\[
M_v=2^\ell,\quad P_v=3^h,\quad D_v=M_v-P_v,
\qquad h=r-s.
\]

We consider the proper-split case from the question, so \(v\) is nonempty
and \(M_v>P_v\).  If the first endpoint is \(n+t\), then

\[
0\le t<\frac{s}{3},                                      \tag{1}
\]

and the two block equations are

\[
C_u=D_un+Mt,\qquad C_v=D_vn-P_vt.                       \tag{2}
\]

Both blocks are one-strip.  Indeed, the first-crossing property gives
\(1<M/P<2\).  Also

\[
1<\frac{M_v}{P_v}<\frac{MM_v}{PP_v}<2.
\]

Consequently

\[
k=\lceil s\log_2 3\rceil,\qquad
\ell=\lceil h\log_2 3\rceil,                           \tag{3}
\]

and the ceiling defects add exactly.  In logarithmic form,

\[
\Lambda_r=\Lambda_s+\Lambda_h,
\qquad
\Lambda_m:=\lceil m\log_2 3\rceil\log 2-m\log 3.       \tag{4}
\]

This is a genuine cycle-specific restriction.  It is not available for an
arbitrary first-crossing word.

## Exact congruence gate

The first determinant satisfies \(D_u>s/3\).  Therefore (1) and the first
equation in (2) give the exact least residue

\[
t=\tau_u:=\left[C_uM^{-1}\right]_{D_u}.                 \tag{5}
\]

The complementary equation always gives

\[
D_v\mid(C_v+P_vt).                                      \tag{6}
\]

When \(D_v>1\), this is equivalently
\(t\equiv-C_vP_v^{-1}\pmod {D_v}\).

It is important not to replace (6) by equality with the least residue.  We
only know \(D_v>h/3\), while \(t<s/3\), and \(h\) can be smaller than \(s\).
If \(h\ge s\) and \(D_v>1\), then \(t<D_v\), and in that special case
(6) becomes

\[
t=\left[-C_vP_v^{-1}\right]_{D_v}.                      \tag{7}
\]

Equations (2) also give the exact gcd identities

\[
\gcd(D_u,C_u)=\gcd(D_u,t),\qquad
\gcd(D_v,C_v)=\gcd(D_v,t).                              \tag{8}
\]

If \(t=0\), then the proper prefix \(u\) already returns \(n\) to itself.
Determinism then gives a shorter period, contrary to primitivity.  Hence a
proper split must satisfy

\[
1\le t<\frac{s}{3}.                                     \tag{9}
\]

In particular, each common factor of a block determinant and its carry
divides \(t\), and each gcd in (8) is at most \(t\).

There is a precise limitation.  From (5), define

\[
a:=\frac{C_u-Mt}{D_u}.
\]

The positivity condition \(a>0\) is exactly \(C_u>Mt\).  Thus \(u\) is a
positive integer first-crossing path from \(a\) to \(a+t\ge a\).  In other
words, even before the complement is used, this is exactly the unresolved
First-Crossing Descent failure branch.

If (6) holds, also define

\[
b:=\frac{C_v+P_vt}{D_v}.
\]

The residue conditions make \(a\) and \(b\) integers, but they do not say
that they are equal.  Affine composition gives

\[
\begin{aligned}
D_r&:=MM_v-PP_v=M D_v+P_vD_u,\\
C_w&=P_vC_u+MC_v,\\
n&=\frac{P_vC_u+MC_v}{D_r},\\
t&=\frac{D_vC_u-D_uC_v}{D_r}.                           \tag{10}
\end{aligned}
\]

Equivalently, the rational fixed point of the concatenated word is

\[
\frac{C_w}{D_r}
=\frac{P_vD_u\,a+MD_v\,b}{P_vD_u+MD_v}.               \tag{11}
\]

Requiring the same integer \(n\) in both equations (2) is precisely
\(a=b=n\).  Substitution in (11) then gives \(D_r\mid C_w\).  Conversely,
an integer cycle satisfying (1) has \(a=b=n\).  Therefore the exact
common-state version of the complement reduction is equivalent to the
original denominator-one condition.  It is circular as an attempted proof.

The congruence-only condition (5)--(6) is formally weaker because it drops
\(a=b\).  We do not know that it is strictly weaker inside the positive
first-crossing word class.  Producing a positive witness already requires a
counterexample to First-Crossing Descent.  Thus no strictness claim is made.

## A new complement-depth bound

The complement does give one unconditional quantitative consequence.  Let
\(y_j\) be the shortcut state after \(j\) steps of \(v\), and let \(h_j\) be
the number of odd inputs among those steps.  Every \(y_j\ge n\), since the
odd part of a smaller positive shortcut state would be a cycle state below
\(n\).  At every phase \(j\) which is an odd input, the remaining suffix
contains that odd step and maps \(y_j\) to \(n\) with positive carry, so

\[
\frac{2^{\ell-j}}{3^{h-h_j}}>1.
\]

Writing \(R_j:=2^j/3^{h_j}\) and \(R_v:=M_v/P_v\), we obtain
\(R_j<R_v\) at every proper phase.  Hence every odd carry summand of \(v\),
after division by \(P_v\), is less than \(R_v/3\).  Therefore

\[
C_v<\frac{hM_v}{3}.                                    \tag{12}
\]

Combining (1), (2), and (12) gives

\[
D_vn<P_v\frac{s}{3}+\frac{hM_v}{3}
=\frac{P_vr+hD_v}{3}.
\]

Thus every proper-split cycle satisfies

\[
\boxed{
r>\frac{D_v}{P_v}(3n-h)
=\frac{2^{\lceil h\log_2 3\rceil}-3^h}{3^h}(3n-h).
}                                                       \tag{13}
\]

This is an all-depth alternative, not a global exclusion.  For example,
\(h=1\) gives \(r>n-1/3\), hence \(r\ge n\).  More generally, for
\(1\le h\le12\), the smallest exact ratio in (13) is

\[
\min_{1\le h\le12}\frac{D_h}{3^h}=\frac{13}{243},
\]

attained at \(h=5\).  Since a nontrivial cycle has odd
\(n>2^{71}\), equation (13) proves the explicit dichotomy

\[
\boxed{
h\ge13
\quad\text{or}\quad
r\ge378{,}955{,}335{,}045{,}094{,}986{,}284.
}                                                       \tag{14}
\]

This is much stronger than the current period bound when the complement has
at most twelve odd inputs.  It does not improve the unrestricted bound,
because \(D_h/3^h\) can be very small at deeper rational approximations.

## The denominator-five regression

For the primitive rational regression word

\[
(1,1,1,1,1,2,1,1,2,1,2,3,2,1,1,1,5),
\]

the reduced denominator is \(5\), and the least rational state is \(187/5\).
Its expanded word is

```text
111111011101101001011110000
```

The first coefficient crossing occurs at step \(27\), with weight \(17\),
which is the end of the full word.  Thus \(v\) is empty and the hypothesis
\(M_v>P_v\) fails.  The example neither satisfies nor refutes the proper
complement gate.  It does show that an argument for all cycles cannot assume
that the first crossing is proper merely from primitivity, positivity,
one-strip geometry, and strict records.

## Small strict-record audit

The exact script
[`cycles/cycle_first_crossing.js`](cycles/cycle_first_crossing.js) enumerates
every strict-record one-strip accelerated word beginning with \(1\) through
\(r=12\).  It verifies affine composition, exact rational valuations,
least-start status, the crossing split, both one-strip block identities, the
congruences, and the denominator-five regression.

\[
\begin{array}{c|r|r|r|r|r|r}
r&\text{words}&\text{primitive}&\text{least starts}&
\text{least proper}&t\in\mathbf Z&\text{primitive }t\in\mathbf Z\\ \hline
3&2&2&2&0&0&0\\
4&5&5&5&2&0&0\\
5&7&7&7&0&0&0\\
6&23&21&22&10&2&0\\
7&83&83&66&36&0&0\\
8&113&113&99&14&0&0\\
9&412&410&335&162&2&0\\
10&525&518&504&28&7&0\\
11&2127&2127&1768&807&0&0\\
12&8781&8758&6310&3658&14&0
\end{array}
\]

In total, there are \(12{,}078\) words, \(12{,}044\) primitive words,
\(9{,}118\) least starts, and \(4{,}717\) least-start proper splits.  Exactly
twenty-five proper splits have integral rational displacement.  Every one is
an imprimitive repetition with \(t=0\).  No word passes the necessary
positive congruence gate

\[
1\le\tau_u<s/3,\qquad C_u>M\tau_u,\qquad
D_v\mid(C_v+P_v\tau_u).                                \tag{15}
\]

There is no denominator-one word in the enumeration.  These statements are
finite evidence only.  In particular, the absence of (15) is consistent
with all existing First-Crossing Descent computations and is not an
all-depth proof.

## Conclusion

The small displacement produces exact two-sided residue and gcd conditions,
but the exact demand that the two reconstructed integer states coincide is
the original full-cycle divisibility in another form.  The noncircular gain
is (13), which forces an enormous period whenever the complementary odd
depth is controlled.  A completion would need either a uniform lower bound
for \(D_h/3^h\) along the actual complementary depths, or a new reason that
the congruence in (6) cannot coexist with the positive first-crossing branch.

The SHA-256 hash of the exact certificate source is

```text
E7E765731E5DE004887A1453DA0F373B092F45276429F88A2557CDB78D4884EA  cycles/cycle_first_crossing.js
```
