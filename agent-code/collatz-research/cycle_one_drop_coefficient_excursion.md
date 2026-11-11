# The anchored Beatty coefficient-excursion gate

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** The denominator-one target follows from one sharper anchored
coefficient inequality. An exact branch-and-bound certificate proves this
inequality through every \(r\leq94\), with independent checks at
\(r=95,100,105,110,115\). We do not prove it at all depths. Two exact
countermodels show that arbitrary spike positions, cyclic Christoffel
structure, and strict leastness do not suffice.

## 1. The partial Collatz map

Put

\[
\gamma:=\log _2(3/2),\qquad
N:=\lceil r\log _2 3\rceil,\qquad
e:=N-r=\lceil\gamma r\rceil,
\tag{1}
\]

and let

\[
K_r:=\left\{
\left\lfloor\frac{\ell r}{e}\right\rfloor:
1\leq\ell<e
\right\}.
\tag{2}
\]

Starting from \(z_{r-1}:=Q\), read the degrees
\(d=r-1,r-2,\ldots,1\). The reverse one-drop recurrence is

\[
z_{d-1}=
\begin{cases}
3z_d/2,&z_d\equiv0\pmod2,\\[3pt]
(3z_d+1)/4,&z_d\equiv1\pmod4\text{ and }d\in K_r.
\end{cases}
\tag{3}
\]

The residue class \(z_d\equiv3\pmod4\) is inadmissible. Thus (3) is the
iteration of the partial integer map

\[
F(2k):=3k,\qquad F(4k+1):=3k+1,
\tag{4}
\]

with an exit at \(4k+3\), together with the anchored restriction (2) on
the second branch. Under \(y:=2z-1\), equation (4) is exactly the
accelerated Collatz map as long as every exponent belongs to
\(\{1,2\}\).

Let \(V\) be the number of second branches and put

\[
U:=e-1-V.
\tag{5}
\]

The linear coefficient after the \(r-1\) steps is

\[
G_{r,V}:=\frac{3^{r-1}}{2^{r-1+V}}.
\tag{6}
\]

If

\[
\delta_r:=e-\gamma r\in(0,1),
\tag{7}
\]

then direct substitution in (5) and (6) gives

\[
\frac{G_{r,V}}{2^{U-1}}
=2^{2-\gamma-\delta_r}.
\tag{8}
\]

In particular,

\[
\frac43<\frac{G_{r,V}}{2^{U-1}}<\frac83.
\tag{9}
\]

We have therefore proved the following implication.

**Proposition 1.** Every complete anchored path satisfying

\[
\boxed{G_{r,V}<Q}
\tag{10}
\]

also satisfies the denominator-one target

\[
Q>2^{U-1}.
\tag{11}
\]

Thus (10) is a stronger and cleaner remaining assertion. In other words,
the linear coefficient of the complete preterminal excursion must remain
below the integer which initiates that excursion.

## 2. Bottom closure and strict leastness

The denominator-one bottom equation is

\[
3z_0-1=2^{U+1}(2Q-1).
\tag{12}
\]

Let

\[
R_r:=\frac{2^N}{3^r}>1.
\tag{13}
\]

Since \(r-1+V+U+1=N-1\), equation (12) can be written as

\[
z_0=R_rG_{r,V}Q-\frac{2^{U+1}-1}{3}.
\tag{14}
\]

On the other hand, iteration of (4) gives

\[
z_0=G_{r,V}Q+E,
\qquad E>0.
\tag{15}
\]

Dividing the exact affine remainder by \(G_{r,V}\) gives the identity

\[
\frac{E}{G_{r,V}}
=\sum_{\text{second branches at }t}\frac{1}{3G_{t-1}},
\tag{16}
\]

where \(G_{t-1}\) is the linear coefficient immediately before that
branch. Combining (14) through (16) gives

\[
\sum_{\text{second branches at }t}\frac{1}{3G_{t-1}}
=(R_r-1)Q-\frac{R_r}{2}+\frac{1}{3G_{r,V}}.
\tag{17}
\]

Equation (17) is the strongest exact bottom-closure coupling presently
available: its left side records every affine carry with its precise prefix
coefficient. It is nevertheless the cycle closure identity in coefficient
coordinates. Positivity gives the usual size restrictions and does not
imply (10).

Strict leastness is likewise insufficient. It says

\[
F^t(Q)>Q\qquad(1\leq t<r),
\tag{18}
\]

but it places no upper bound on the coefficient excursion. An upper bound
of the form

\[
F^t(Q)<2Q^2
\tag{19}
\]

would be enough when (12) holds and \(Q\leq2^{U-1}\), since then

\[
z_0
\geq\frac{4Q(2Q-1)+1}{3}>2Q^2
\qquad(Q\geq2).
\tag{20}
\]

No all-depth proof of (19) is known here. Consequently, bottom closure and
leastness sharpen the formulation, but they do not presently furnish a
noncircular invariant.

## 3. Exact certificate

The checker
[`cycles/beatty_coefficient_bound_fast.js`](cycles/beatty_coefficient_bound_fast.js)
tests (10) with integer arithmetic. At a partial residue cylinder, let
\(q_*\) be its least positive representative and let \(s\) be the number
of second branches already used. Every descendant has \(Q\geq q_*\) and
\(V\geq s\). Hence the node is permanently safe once

\[
q_*2^{r-1+s}>3^{r-1}.
\tag{21}
\]

To justify the monotonicity, suppose that the current cylinder has modulus
\(2^L\) and residue \(a\), with \(0\leq a<2^L\). A descendant residue has
the form \(a+j2^L\) modulo a larger power of two. If \(a>0\), its least
positive representative is at least \(a\). If \(a=0\), it is either a
positive multiple of \(2^L\), or zero modulo the larger modulus and hence
represented by that modulus. In both cases it is at least \(2^L=q_*\).
Each descendant also has at least \(s\) second branches. Therefore

\[
Q2^{r-1+V}\geq q_*2^{r-1+s}.
\tag{21a}
\]

This proves the pruning rule (21). The ordinary branch lifts the cylinder
by one binary digit and the second branch lifts it by two. The affine
coefficient is odd, so each lift is unique. Thus the recursion exhausts
all anchored cylinders with \(U\geq1\).

A full exact run proves (10) for every

\[
3\leq r\leq94.
\tag{22}
\]

Independent exact rows at \(r=95,100,105,110,115\) also contain no
violation. The rows at \(r=110\) and \(r=115\) visit respectively

\[
167{,}881{,}186,
\qquad
367{,}880{,}475
\tag{23}
\]

symbolic nodes. These are finite statements only: neither the pruning rule
nor the completed runs prove (10) beyond the listed depths.

## 4. Exact obstructions to broader arguments

The coefficient bound is false if the anchored Beatty restriction is
removed. At

\[
r=72,\qquad e=43,
\tag{24}
\]

there is a complete unrestricted path with

\[
Q=159{,}902{,}416,\qquad U=28,\qquad V=14,
\tag{25}
\]

and second-branch degrees

\[
\{4,7,11,32,39,40,43,46,54,55,56,57,65,67\}.
\tag{26}
\]

It satisfies

\[
G_{72,14}=194{,}115{,}159.743\ldots>Q.
\tag{27}
\]

Seven degrees in (26), namely

\[
\{4,7,32,39,54,57,67\},
\tag{28}
\]

do not belong to \(K_{72}\). Thus spike count alone cannot prove (10).

There is a sharper rotation obstruction. Take

\[
r=15,\qquad e=9,\qquad Q=16,\qquad U=4,\qquad V=4.
\tag{29}
\]

The complete path has second-branch degrees

\[
\{4,7,9,10\},
\tag{30}
\]

ends at

\[
F^{14}(16)=297,
\tag{31}
\]

and is strictly least at its first term. Moreover,

\[
G_{15,4}=\frac{3^{14}}{2^{18}}=18.2455\ldots>16.
\tag{32}
\]

The set (30) is contained in a cyclic shift of the same rational
Christoffel mask, but it is not contained in the anchored set

\[
K_{15}=\{1,3,5,6,8,10,11,13\}.
\tag{33}
\]

It also fails bottom closure: equation (12) would require \(z_0=331\),
not \(297\). Therefore the Christoffel gap word, cyclic balance, and strict
leastness do not imply (10). Any proof must use the anchored intercept in
(2), or use bottom closure in a genuinely arithmetic way.

This also explains why rotation-invariant Christoffel extremality does not
settle the gate. The functional studied by
[Fernandez and Ibanez](https://arxiv.org/abs/2607.24844) controls the
minimum carry over cyclic rotations. The present problem asks for the
archimedean size of the least positive representative of one anchored
dyadic cylinder. The example (29) through (33) separates these two data
exactly.

## 5. Relation with coefficient stopping time

If (12) holds, the preterminal path together with its final exponent
\(U+2\) is the original one-drop cycle. Its full coefficient is

\[
\frac{3^r}{2^N}<1,
\tag{34}
\]

while its first term is the strict minimum and the final term equals the
first. Hence it is a paradoxical cycle whose first term is smallest.
By the equivalence recorded by
[Rozier and Terracol](https://arxiv.org/html/2502.00948v5), such a cycle
would contradict Terras's coefficient stopping-time conjecture.

This is a precise one-way reduction, not a proof of (10). The coefficient
stopping-time conjecture rules out the completed cycle itself, whereas
(10) is a stronger assertion about every anchored preterminal cylinder,
including paths which do not satisfy (12).

## Conclusion

The strongest surviving arithmetic target is the anchored coefficient
inequality (10). It implies the required bound with a uniform factor of at
least \(4/3\), and exact computation supports it substantially beyond the
previous direct range.

The remaining difficulty is not Christoffel balance by itself. A cyclic
shift already defeats the inequality while preserving the same gap
structure and strict leastness. The unproved datum is the interaction
between the fixed Beatty intercept, the least positive dyadic lift, and,
for an actual cycle, the bottom equation (12).
