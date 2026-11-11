# Block excursion no-go for the one-drop cylinder

## Scope

We record the exact information supplied by the `10` and `110` Beatty blocks. This note does not prove the proposed cylinder bound
\[
Q\geq 2^U-2.
\]
Rather, it identifies the global excursion statement that remains after the block calculation.

Let
\[
O(x):=\frac{3x}{2},\qquad S(x):=\frac{3x+1}{4}.
\]
The branch \(O\) is admissible when \(x\) is even, while \(S\) is admissible when \(x\equiv 1\pmod 4\). In a Beatty block, we let \(u\) denote the number of eligible positions at which \(O\), rather than \(S\), is chosen.

## Exact block maps

The admissible maps for a `10` block are
\[
\begin{array}{c|c|c|c}
\text{word}&\text{domain}&\text{map}&u\\ \hline
SO&x\equiv 5\pmod 8&(9x+3)/8&0\\
OO&x\equiv 0\pmod 4&9x/4&1.
\end{array}
\]
Consequently,
\[
x'\geq \frac98\,2^u x.
\]

The admissible maps for a `110` block are
\[
\begin{array}{c|c|c|c}
\text{word}&\text{domain}&\text{map}&u\\ \hline
SSO&x\equiv 17\pmod {32}&(27x+21)/32&0\\
SOO&x\equiv 5\pmod {16}&(27x+9)/16&1\\
OSO&x\equiv 14\pmod {16}&(27x+6)/16&1\\
OOO&x\equiv 0\pmod 8&27x/8&2.
\end{array}
\]
Therefore,
\[
x'\geq \frac{27}{32}\,2^u x.
\]

Suppose a block segment contains \(a\) blocks of type `10`, \(b\) blocks of type `110`, and \(U\) omissions. Iterating the preceding inequalities gives
\[
x_{\mathrm{out}}
\geq 2^U\left(\frac98\right)^a
\left(\frac{27}{32}\right)^b x_{\mathrm{in}}.
\]
The phase factor satisfies
\[
\left(\frac98\right)^a\left(\frac{27}{32}\right)^b
=\frac{3^{2a+3b}}{2^{3a+5b}}.
\]
Since \(2a+3b\) is the block length and \(a+2b\) is the number of eligible positions, Beatty balance keeps the logarithm of this factor bounded. Thus the block calculation says that a violation \(Q+2<2^U\) produces an excursion of quadratic scale in \(Q\), up to a bounded phase factor. It does not provide an upper bound for that excursion.

## The \(Q=14\) shadow

At \(r=16\), the high-to-low Beatty mask decomposes as
\[
0\mid 10\mid 110\mid 110\mid 10\mid 110\mid 1.
\]
The equality cylinder has
\[
Q=14,\qquad U=4,\qquad Q=2^U-2,
\]
with spike set
\[
\{3,6,8,9,14\}.
\]
Its exact block itinerary and state trace are
\[
O\mid SO\mid OOO\mid SSO\mid SO\mid OSO\mid O,
\]
\[
14\longmapsto 21\longmapsto 24\longmapsto 81
\longmapsto 69\longmapsto 78\longmapsto 132
\longmapsto 198.
\]
For example, \(81\equiv17\pmod {32}\) and
\[
SSO(81)=\frac{27\cdot81+21}{32}=69.
\]

The broad shadow continues for two further zero lifts:
\[
198\stackrel{O}{\longmapsto}297
\stackrel{S}{\longmapsto}223.
\]
Now \(223\equiv3\pmod4\). Hence neither zero-lift branch is admissible at the next step. The affine cylinder must acquire a positive dyadic lift, so the representative exits \(Q=14\). This explains the observed transient exactly.

## Collatz conjugacy and the remaining obstruction

Set
\[
m:=2x-1.
\]
Then an \(O\)-step becomes
\[
m' = \frac{3m+1}{2},
\]
while an \(S\)-step becomes
\[
m' = \frac{3m+1}{4}.
\]
Thus the block system is exactly the accelerated Collatz map restricted to exponents \(1\) and \(2\). The `10` and `110` domains merely encode which of these exponents occur at the permitted Beatty positions.

In particular, an all-depth proof of \(Q+2\geq2^U\) would imply the following restricted no-divergence statement. There is no infinite accelerated Collatz trajectory whose exponents lie in \(\{1,2\}\), whose exponent-\(2\) positions lie in the Beatty mask, and whose omission deficiency \(U_n\) tends to infinity. Indeed, the fixed initial value \(Q\) would then satisfy
\[
Q+2\geq2^{U_n}
\]
for every \(n\), which is impossible when \(U_n\to\infty\).

Finally, the block domains do not close under bounded local data. After \(k\) blocks, admissibility depends on the input modulo a power of \(2\) whose exponent grows linearly with \(k\). The quantities \(v_2(x)\), \(v_2(3x+1)\), the dyadic band of \(Q\), and the Beatty phase determine only bounded initial information. Continuing the induction requires the full growing cylinder, or a new global theorem controlling these restricted Collatz excursions.

Therefore, the `10` and `110` calculation isolates the obstruction but does not remove it. The remaining step is an all-depth arithmetic excursion principle, not a finite block inequality.
