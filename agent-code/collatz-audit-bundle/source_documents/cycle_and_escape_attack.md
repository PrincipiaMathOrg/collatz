# Direct attack on the two remaining Collatz debts

**Date:** 17 August 2026

## Outcome

The target-1 terminal theorem does not absorb positive cycles by periodic pumping. An exact affine calculation proves this obstruction. On the divergent side, however, the previously open critical at-most-linear escape alternative is eliminated: every divergent accelerated odd orbit contains coefficient-barrier blocks of every prescribed length.

No full elimination of positive cycles or of nonperiodic synchronization is claimed.

## 1. The local target-7 branch is a lasso

For the shortcut map
\[
T(x)=\begin{cases}x/2,&2\mid x,\\(3x+1)/2,&2\nmid x,\end{cases}
\]
let \(x=27t+20\), and put \(z=16t+11=(16x-23)/27\). Then
\[
z\xrightarrow{1}24t+17\xrightarrow{1}36t+26
 \xrightarrow{0}18t+13\xrightarrow{1}x.
\]
Thus the parity word is \(1101\), and \(z<x\). If \(x\) lies on a positive cycle, appending any number of laps of that cycle leaves the starting value \(z\) unchanged. The replacement therefore creates one exact preperiodic lasso, not a descending family.

## 2. Positive cycles cannot be pumped into target 1

Let a shortcut cycle word \(w\) have length \(p\), weight \(s\), affine data
\[
Q=2^p,\qquad P=3^s,\qquad Qx=Px+C,
\]
so \(C=(Q-P)x\). For its \(N\)-th power,
\[
C_N=x(Q^N-P^N).
\]
Let \(1^L\) be the all-odd word, whose carry is \(3^L-2^L\). Concatenation gives
\[
C_{w^N1^L}+Q^N2^L
 =3^L\bigl((x+1)Q^N-xP^N\bigr).
\]
Hence the word \(w^N1^L\) is target-1 terminal exactly when
\[
P^N\mid x+1.
\]
Consequently this can occur only for
\[
N\le \frac{v_3(x+1)}s.
\]
No arbitrarily deep target-1 word can be manufactured by repeating a positive cycle and attaching an all-ones tail.

## 3. Elimination of critical linear escape

Let \(Y_j=U_+^j(n)\) be a divergent accelerated odd orbit, and let
\[
H_j=A_j-j\log_2 3.
\]
A block beginning at \(j\) has every coefficient prefix above one exactly when
\[
H_{j+k}<H_j\qquad(1\le k\le R).
\]
The established record-time dichotomy states that if a fixed length \(R\) never occurs, then
\[
Y_j<(3/2)^R\left(Y_0+\frac j3\right)
\qquad(j\ge0).
\]
This would imply
\[
\sum_{j\ge0}\frac1{Y_j}=\infty.
\]
But every divergent positive orbit has a convergent reciprocal sum. Therefore:

> **Barrier-block abundance theorem.** Every divergent accelerated odd orbit contains coefficient-barrier blocks of every prescribed finite length.

This closes the critical at-most-linear escape alternative.

## 4. Consequence of all-depth target-1 exclusion

Let a barrier block of length \(R\) end at \(X\). Terminal locality gives
\[
3^R\mid X+1
\]
if and only if its valuation word is target-1 terminal. The all-depth target-1 theorem therefore implies:

* if the block is nontrivial, then \(v_3(X+1)<R\);
* if \(v_3(X+1)\ge R\), the word is exactly \(1^R\).

Thus a divergent counterexample must contain arbitrarily long barrier blocks while every rate-matched target-1 hit is forced into the pure all-ones shadow of the 2-adic fixed point \(-1\).

## 5. Twelve-strip theorem for positive cycles

The equal-time reciprocal-mass estimate gives, for every positive accelerated cycle with total exponent \(A\) and odd length \(r\),
\[
0<A\log2-r\log3<7.873.
\]
Rotate the cycle to its least odd point and put \(\eta_j=A_j-j\log_2 3\). Every prefix endpoint is at least the initial point, while the multiplicative correction product along any prefix is below \(e^{7.873}<2^{12}\). Hence
\[
\eta_j<12\qquad(1\le j\le r).
\]
The complementary suffix ends at the least point, so its coefficient is strictly below one. Therefore
\[
\eta_j<\eta_r\qquad(j<r).
\]
In particular,
\[
0<\eta_r<12,
\qquad
A=\lfloor r\log_2 3\rfloor+d,
\quad 1\le d\le12.
\]
Every positive cycle is therefore represented, at its minimum, by a strict-record valuation word confined to a universal twelve-unit upper strip.

## 6. Revised frontier

The cycle debt is reduced to excluding primitive strict-record words satisfying
\[
\eta_j<\eta_r<12,
\qquad
(2^A-3^r)x=C_w.
\]
The divergent debt is reduced to excluding an orbit that has barrier blocks of every length but whose only rate-matched target-1 blocks are arbitrarily long all-ones shadows.

The direct target-7 replacement and target-1 pumping routes do not close either statement. Their failure is exact rather than computational.
