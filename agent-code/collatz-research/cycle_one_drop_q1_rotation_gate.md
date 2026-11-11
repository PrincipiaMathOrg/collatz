# The denominator-one one-drop rotation gate

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** Denominator one is equivalent, in the audited cycle range, to
simultaneous zero exposure at every cyclic rotation. After this
equivalence is imposed, the one-drop branch reduces to the sharper
Beatty inequality

\[
Q>2^{U-1}.
\tag{1}
\]

An exact branch-and-bound certificate proves (1) for
\(3\leq r\leq94\). We do not prove (1) at all depths.

## 1. Denominator one at every rotation

Put

\[
P:=3^r,\qquad N:=\lceil r\log _2 3\rceil,\qquad
M:=2^N,\qquad D:=M-P.
\tag{2}
\]

Let \(a=(a_0,\ldots,a_{r-1})\) be a one-drop word of total weight
\(N\), and let \(C_i\) be the carry of the cyclic rotation beginning at
\(a_i\). The carry rotation identity is

\[
2^{a_i}C_{i+1}=3C_i+D.
\tag{3}
\]

Since \(\gcd(D,6)=1\), equation (3) gives

\[
D\mid C_i\quad\Longleftrightarrow\quad D\mid C_{i+1}.
\tag{4}
\]

Thus one rotated divisibility is equivalent to all rotated
divisibilities. If \(D\mid C_0\), put \(x_i:=C_i/D\). These are positive
odd integers and

\[
2^{a_i}x_{i+1}=3x_i+1
\tag{5}
\]

at every edge.

For completeness, the period-range bounds place every \(x_i\) inside the
canonical full cylinder. Write

\[
B_i:=\left\lfloor\frac{iN}{r}\right\rfloor,\qquad
b_i:=B_{i+1}-B_i,
\]

and write the one-drop deformation as

\[
a_i=b_i+h_i-h_{i+1},\qquad 0\leq h_i\leq U,\qquad h_r=h_0=0.
\]

With \(w_i:=2^{-h_i}x_i\), equation (5) becomes

\[
2^{b_i}w_{i+1}=3w_i+2^{-h_i}.
\tag{6}
\]

The mechanical prefix inequalities give

\[
\frac{3^i}{2^{B_i}}<2,\qquad
\frac{3^{i-1-j}}{2^{B_i-B_j}}<\frac23.
\]

Iteration of (6) therefore yields

\[
w_i<2x_0+\frac{2i}{3},\qquad
x_i<2^U\left(2x_0+\frac{2r}{3}\right).
\tag{7}
\]

Using \(x_0<305r^{14.3}\), \(U\leq e-1\), where \(e:=N-r\), and the
established period-range estimate \(2^r>1830r^{15}\), we obtain

\[
0<x_i<\frac M2<2M.
\tag{8}
\]

Let \(\rho_i\) be the least positive odd solution of

\[
P\rho_i+C_i\equiv M\pmod {2M}.
\tag{9}
\]

If \(D\mid C_i\), then

\[
P x_i+C_i=Mx_i\equiv M\pmod {2M}.
\]

Equations (8) and (9) imply \(\rho_i=x_i\) for every \(i\). Hence every
rotation exposure

\[
s_i:=\frac{2^{a_i}\rho_{i+1}-3\rho_i-1}{2M}
\tag{10}
\]

vanishes. Conversely, if every \(s_i\) vanishes, composition of the exact
recurrences gives \(D\rho_0=C_0\). We have proved, in the candidate range,

\[
\boxed{
D\mid C_0
\ \Longleftrightarrow\
D\mid C_i\text{ for every }i
\ \Longleftrightarrow\
s_i=0\text{ for every }i.
}
\tag{11}
\]

Thus cyclic rotations do not provide a second independent congruence.
They are exact reformulations of denominator one.

## 2. The direct Beatty trajectory

In the complementary one-drop notation, the \(r-1\) preterminal
exponents are \(1\), except for \(V\) exponents equal to \(2\), and the
terminal exponent is \(U+2\), where

\[
U+V=e-1,\qquad U\geq1.
\tag{12}
\]

The allowed doubled degrees form the Beatty set

\[
K:=\left\{
\left\lfloor\frac{\ell r}{e}\right\rfloor:
1\leq\ell<e
\right\}.
\tag{13}
\]

Under denominator one, set

\[
Q:=\frac{x+1}{2}.
\tag{14}
\]

Starting from \(z_{r-1}:=Q\), read
\(d=r-1,r-2,\ldots,1\). Exact integrality forces

\[
z_{d-1}=
\begin{cases}
3z_d/2,&z_d\equiv0\pmod2,\\[3pt]
(3z_d+1)/4,&z_d\equiv1\pmod4\text{ and }d\in K.
\end{cases}
\tag{15}
\]

A state \(z_d\equiv3\pmod4\) is inadmissible. The number of second
branches is \(V\), so \(U=e-1-V\). The final closure is

\[
3z_0-1=2^{U+1}(2Q-1),
\tag{16}
\]

or, with \(y_0:=2z_0-1\),

\[
3y_0+1=2^{U+2}x.
\tag{17}
\]

Strict least-state normalization says

\[
z_d>Q\qquad(0\leq d<r-1).
\tag{18}
\]

Conversely, a valid path (15) satisfying (16) reconstructs the exact
denominator-one word, and (18) is precisely strict leastness at the
chosen rotation.

Because \(x=2Q-1\), the cylinder separation needed in the one-drop
argument is exactly

\[
\boxed{x>2^U\quad\Longleftrightarrow\quad Q>2^{U-1}.}
\tag{19}
\]

This is much weaker than the universal quotient target
\(Q\geq2^{e-1}\). It is also stronger as a reduction: a proof that every
valid Beatty path (15) satisfies (19) would not need the bottom equation
(16) or leastness (18).

## 3. Exact finite certificate

The checker
[cycles/beatty_direct_bound_fast.js](cycles/beatty_direct_bound_fast.js)
proves (19) exactly for

\[
3\leq r\leq94.
\tag{20}
\]

For a partial reverse path, it writes

\[
z=\frac{AQ+B}{2^L}.
\]

Each ordinary branch uniquely lifts \(Q\) by one binary digit; each spike
branch uniquely lifts it by two. If the partial path has \(s\) spikes,
every descendant has \(V\geq s\). A violating descendant would therefore
satisfy

\[
Q\leq2^{e-2-V}\leq2^{e-2-s}.
\tag{21}
\]

The least positive affine residue cannot decrease under a lift. Thus a
node is discarded exactly when its least positive residue exceeds the
right side of (21). The search retains only spike degrees in \(K\), uses
integer arithmetic throughout, and finds no violating leaf through
\(r=94\).

The independent enumeration
[cycles/beatty_minimal_path_probe.js](cycles/beatty_minimal_path_probe.js)
agrees through \(r=40\), while also tracking (18) and the bottom
valuation prerequisite for (16). Among its valid paths, the closest
observed ratio in (19) is

\[
\frac{Q}{2^{U-1}}=\frac{14}{8}=\frac74
\]

at

\[
r=16,\qquad U=4,\qquad V=5,\qquad
S=\{3,6,8,9,14\}.
\tag{22}
\]

This path begins at \(x=27\) and is strictly least, but it does not
satisfy the bottom closure (16). It is evidence about the sharp local
boundary, not a cycle candidate.

## 4. Rotation and minimum no-go

There is an exact rational family showing why cyclic order and leastness
alone do not prove (19). For every \(r\), take

\[
a=(1,\ldots,1,e+1),\qquad
\xi:=\frac{3^r-2^r}{2^N-3^r}.
\tag{23}
\]

Its rotated rational states satisfy

\[
\xi_j=\left(\frac32\right)^j(\xi+1)-1>\xi
\qquad(1\leq j<r).
\tag{24}
\]

Thus the displayed rotation is strictly least at arbitrary depth and has
the same exact predecessor and lexicographic geometry as the integer
problem. The same established linear-form estimate used for cycle states
applies directly to this rational fixed point. Namely, if \(R:=M/P\), then

\[
\xi<\frac{1}{R-1}<e^{6.125581}r^{13.3}<305r^{14.3}.
\tag{24a}
\]

For this family, \(V=0\), \(U=e-1\), and the rational analogue of (14) is
\(Q_\xi:=(\xi+1)/2\). Since \(e>r/2\), the established lower bound
\(r\geq72{,}057{,}431{,}991\) is more than sufficient to give
\(305r^{14.3}+1<2^{e-1}\). Indeed, the weaker inequality already holds at
\(r=300\) with \(2^{r/2-1}\) on the right, and the ratio
\(2^{r/2-1}/(305r^{14.3}+1)\) is increasing thereafter. Consequently,

\[
Q_\xi<2^{e-2}=2^{U-1}
\tag{24b}
\]

throughout the candidate range. Thus the family lies on the wrong side of
(19) while preserving strict leastness at arbitrary depth.

Its reduced denominator is not one in the candidate range. Indeed, if
\(\xi\) were an integer, the \(r-1\) successive exponent-one steps and
closure would force

\[
2^r\mid \xi+1.
\]

Equation (24a) and the period-range inequality give
\(0<\xi+1<2^r\), which is a contradiction. Hence (23) gives
arbitrary-depth rational countermodels to any order-only proof of (19).
At \(r=4\), for example,

\[
a=(1,1,1,4),\qquad D=47,
\]

and the rotated numerators are

\[
(65,121,205,331).
\]

The strict least rational states are these numerators divided by \(47\).
The full-cylinder representatives are

\[
(143,215,195,165),
\]

with exposures

\[
(0,-1,-1,7).
\]

The example identifies the missing datum exactly: denominator one removes
all exposures simultaneously. Once they vanish, the rotations are the
states of the hypothetical integer cycle itself, so minimum rotation gives
no further descent. Likewise, a smaller inverse sibling of the terminal
state need not lie on the cycle and does not contradict leastness.

This obstruction is consistent with the wider theory of paradoxical
sequences. [Rozier and Terracol](https://arxiv.org/html/2502.00948v5)
note that the assertion that the first term of a paradoxical sequence is
never its smallest term is equivalent to Terras's coefficient stopping-time
conjecture, which implies the absence of nontrivial cycles. Separately, they
prove that finiteness of all paradoxical sequences would imply the full
Collatz conjecture. The Beatty condition here is sharper, but their results
do not prove (19).

## Conclusion

The denominator-one hypothesis does narrow the one-drop problem. All
cyclic divisibility and no-exposure statements collapse to one condition,
and the needed cylinder bound becomes the deterministic Beatty inequality
\(Q>2^{U-1}\). The finite certificate proves that inequality through
\(r=94\).

There is no all-depth proof. Cyclic rotations, lexicographic minimality,
strict leastness, and synchronous predecessors add no independent
arithmetic beyond the deterministic parity cylinder. A uniform proof must
use the Beatty restriction together with denominator-one closure in a way
not captured by those order arguments.
