# The terminal boundary-coupling collapse

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** We couple the exact (2)-adic valuation at the first spike of the
last positive layer with the exact (3)-adic valuation at its last spike and
with the terminal (3)-adic lock. The coupling is exact, but the full factor
(3^L) supplied by terminal localization cancels. After the natural endpoint
factors are stripped, only a factor (3) or (9) remains, and the result is
the ordinary affine transport of one open orbit block. It contains no second
global congruence and no lower bound for (Q). An infinite family of genuine
(q=1) integer suffixes with (Q=3) realizes the sharp boundary equations.

## 1. The transition layer

We work in the denominator-one, failed-gate range of the one-drop reduction.
Put

\[
D:=2^N-3^r,
\qquad
Q:=\frac{x+1}{2},
\qquad
x:=2Q-1.
\tag{1}
\]

Let (H_*) be the last positive cut and let

\[
H_c:=H_*+1
\tag{2}
\]

be the first negative cut. We assume (H_c\leq U), since the boundary case
(H_c=U+1) has no nontrivial terminal suffix to localize. Put

\[
T_*:=T_{H_*},
\qquad
T:=T_{H_c},
\qquad
L_*:=r-T_*,
\qquad
L:=r-T.
\tag{3}
\]

The terminal theorem gives a parameter (c\in\{1,3\}) such that

\[
3^L\mid2^{U+c}x+1.
\tag{4}
\]

The case (c=1) has no spike after the negative cut. The case (c=3) has
one spike, at (r-1). Define

\[
\mu:=N-U-(c-1).
\tag{5}
\]

Then

\[
E_{H_c}=-2^\mu.
\tag{6}
\]

Let the height-(H_*) transition layer consist of spike ranks
(a,\ldots,b), at times

\[
t_a<\cdots<t_b.
\tag{7}
\]

Its carry is

\[
\Delta
:=\sum_{i=a}^{b}2^{t_i+i}3^{r-t_i}.
\tag{8}
\]

Put

\[
\lambda:=t_a+a,
\qquad
\nu:=r-t_b,
\tag{9}
\]

and

\[
G:=\sum_{i=a}^{b}
2^{t_i+i-\lambda}3^{t_b-t_i}.
\tag{10}
\]

The first summand in (10) is the unique odd summand, and the last summand is
the unique summand not divisible by (3). Hence

\[
\gcd(G,6)=1
\tag{11}
\]

and

\[
\boxed{\Delta=2^\lambda3^\nu G.}
\tag{12}
\]

Since (E_{H_*}-E_{H_c}=\Delta), we obtain the complete boundary-layer
normal form.

**Proposition 1.** Put

\[
W:=\frac{E_{H_*}}{2^\lambda}.
\tag{13}
\]

Then (mu>\lambda), (W) is a positive odd integer, and

\[
\boxed{
W=3^\nu G-2^{\mu-\lambda}.}
\tag{14}
\]

**Proof.** Equation (12) and (6) give

\[
E_{H_*}
=\Delta+E_{H_c}
=2^\lambda3^\nu G-2^\mu.
\]

The exponent (lambda) is smaller than (mu), since every transition
spike precedes the terminal power in both suffix alternatives. Dividing by
(2^\lambda) proves (14). Positivity follows from the definition of
(H_*), and oddness follows from (11). \(\square\)

Thus the first and last spike valuations do couple. The issue is what this
coupling means after denominator one is used.

## 2. The cut congruence is a stripped-state identity

Let (Z_j:=(x_j+1)/2) be the bottom-normalized integer cycle states. For a
height cut (H), let (k_H) be the number of spikes before its cut time
(T_H), and retain the early carry (A_H) from the multicut theorem. Define

\[
P_H:=A_H+4Q3^{T_H}.
\tag{15}
\]

The exact prefix recurrence gives

\[
2^{T_H+k_H}Z_{T_H}
=3^{T_H}Q+\frac{A_H}{4}.
\tag{16}
\]

Consequently,

\[
\boxed{
P_H=2^{T_H+k_H+2}Z_{T_H}.}
\tag{17}
\]

The full denominator-one cut identity is

\[
2^{N+1}+A_H3^{r-T_H}+E_H=4QD.
\tag{18}
\]

Using (4Q=2(x+1)) and (D=2^N-3^r), equation (18) becomes

\[
\boxed{
2^{N+1}x-E_H=3^{r-T_H}P_H.}
\tag{19}
\]

At the terminal cut, define

\[
y:=\frac{2^{U+c}x+1}{3^L}.
\tag{20}
\]

Equations (5), (6), and (19) give

\[
\boxed{P_{H_c}=2^\mu y.}
\tag{21}
\]

This is the stripped-state interpretation already visible in the terminal
lock. If

\[
\ell_c:=\frac{c+1}{2},
\tag{22}
\]

then

\[
Z_T=2^{L-\ell_c}y.
\tag{23}
\]

There is an exactly parallel interpretation at the positive cut. Let

\[
\sigma:=t_a-T_*.
\tag{24}
\]

Since the mechanical slope (e/r) is larger than (1/2), consecutive
eligible sites are separated by at most two steps. The first layer spike is
the first selected eligible site after the omission which created height
(H_*). Therefore,

\[
\sigma\in\{1,2\}.
\tag{25}
\]

Put

\[
z:=\frac{Z_{T_*}}{2^{\sigma-1}}.
\tag{26}
\]

The intervening ordinary branch, when (sigma=2), proves that (z) is an
integer. Since (k_{H_*}=a-1), equations (9), (17), and (26) give

\[
\boxed{P_{H_*}=2^\lambda z.}
\tag{27}

\]

Equivalently, equation (19) gives

\[
z=
\frac{2^{N+1-\lambda}x-W}{3^{L_*}}.
\tag{28}

\]

Thus the apparent second congruence

\[
W\equiv2^{N+1-\lambda}x\pmod{3^{L_*}}
\tag{29}

\]

is exactly the assertion that a forced power of two has been stripped from
the actual cut state. It is not a new closed-orbit condition.

## 3. The terminal power (3^L) cancels

Put

\[
d:=T-T_*,
\qquad
\tau:=T-t_b.
\tag{30}

\]

The first omitted eligible site after the last transition-layer spike is the
site which creates height (H_c). The same mechanical-gap argument gives

\[
\tau\in\{1,2\}.
\tag{31}

\]

In particular,

\[
\nu=L+\tau.
\tag{32}

\]

Subtract equation (19) at the two cuts. Since (L_*=L+d), we obtain

\[
\Delta
=3^L\left(P_{H_c}-3^dP_{H_*}\right).
\tag{33}

\]

Substitute (12), (21), (27), and (32), and divide by
(2^\lambda3^L). This gives the exact endpoint coupling.

**Proposition 2.** We have

\[
\boxed{
2^{\mu-\lambda}y
=3^dz+3^\tau G,
\qquad
\tau\in\{1,2\}.}
\tag{34}

\]

The terminal factor (3^L) has disappeared completely.

This is not a loss caused by an estimate. Equation (34) is the exact affine
transport of the open block from the stripped start (z) to the stripped
end (y). The cofactor (G) is its carry. The first and last spike
valuations therefore reduce the proposed simultaneous binary and ternary
condition to one ordinary block recurrence.

The same collapse is visible directly in congruences. Equations (4) and
(29), reduced modulo (3^L), give

\[
W\equiv-2^{\mu-\lambda}\pmod{3^L}.
\tag{35}

\]

But Proposition 1 gives the stronger identity

\[
W+2^{\mu-\lambda}=3^{L+\tau}G.
\tag{36}

\]

Thus (35) is merely the reduction of the transition-layer factorization.
It is not independent of the terminal congruence.

Terminal (3)-adic localization proves

\[
L=O((\log U)^2).
\tag{37}

\]

Equation (34) shows why this does not combine with the first-spike valuation:
the whole localized modulus cancels, leaving at most (3^2). The remaining
variables (y,z,G) belong to an open orbit block and have no second global
divisibility.

Leastness yields only

\[
2^{\sigma-1}z=Z_{T_*}\geq Q,
\qquad
2^{L-\ell_c}y=Z_T\geq Q.
\tag{38}

\]

It gives no lower bound for either stripped integer. Even when both stripped
integers happen to be actual states, equation (34) is an open segment rather
than a shorter cycle.

## 4. An infinite (q=1) boundary shadow

The collapse is sharp inside the integer Collatz dynamics. Let

\[
U\equiv39\pmod{54},
\qquad
e:=U+2,
\qquad
Q:=3,
\qquad
x:=5.
\tag{39}

\]

The order of (2) modulo (81) is (54), and

\[
5\cdot2^{44}\equiv11\pmod{81}.
\tag{40}

\]

Therefore,

\[
y:=\frac{5\cdot2^{U+1}+1}{3},
\qquad
z:=\frac{5\cdot2^{U+5}-11}{81}
\tag{41}

\]

are positive integers. They satisfy

\[
16y=27z+9.
\tag{42}

\]

Starting from (z), the bottom-normalized exponent word

\[
(2,1,1,e)
\tag{43}

\]

is an exact integer suffix:

\[
z
\longmapsto\frac{3z+1}{4}
\longmapsto\frac32\left(\frac{3z+1}{4}\right)
\longmapsto y
\longmapsto3.
\tag{44}

\]

Every state before the final (3) is larger than (3). The parameters in
Proposition 2 are

\[
L=1,
\quad
\sigma=1,
\quad
\tau=2,
\quad
d=3,
\quad
\mu-\lambda=4,
\quad
G=1.
\tag{45}

\]

The complete centered transition is therefore

\[
(E_{H_*},\Delta,E_{H_c})
=2^\lambda(11,27,-16),
\tag{46}

\]

and

\[
W=27-16=11.
\tag{47}

\]

This family satisfies the terminal divisibility, both endpoint valuations,
the full stripped-state coupling, exact (q=1) branch integrality, and the
leastness inequalities, with fixed (Q=3) and arbitrarily large (U). It is
a local suffix shadow, not a closed cycle counterexample. It proves that no
argument using only these coupled boundary data can force
(Q\geq U^{271/10}). The missing information is precisely the global prefix
which would close the suffix modulo (D).

## 5. Exact audit

The checker
[one_drop_terminal_boundary_coupling_no_go_certificate.js](cycles/one_drop_terminal_boundary_coupling_no_go_certificate.js)
uses integer arithmetic. Through (r=28), it audits all (187288)
nontrivial anchored profiles. It finds (186868) positive-to-negative
transitions, of which (140065) have (H_c\leq U). At every nonboundary
transition, it verifies

\[
\Delta=2^\lambda3^\nu G,
\qquad
\gcd(G,6)=1,
\tag{48}

\]

the two prefix-state identities (21) and (27), the denominator-cleared form
of (19), and the open-block coupling (34). There are (70193) cases with
(G=1). All four boundary-gap pairs in

\[
(\sigma,\tau)\in\{1,2\}^2
\tag{49}

\]

occur.

The checker also verifies (101) exact integer shadows, from (U=39) to
(U=5439), together with the order computation modulo (81). Its output
includes

\[
\texttt{openBlockCouplingChecks=140065},
\qquad
\texttt{shadowRows=101},
\qquad
\texttt{status=PASS}.
\tag{50}
\]

## Conclusion

Coupling the first and last spike valuations does not produce a second global
condition. The exact global cut identity turns both valuations into endpoint
stripping. When the adjacent cuts are subtracted, the terminal power (3^L)
cancels and leaves

\[
2^{\mu-\lambda}y=3^dz+3^\tau G,
\qquad
\tau\leq2,
\]

which is simply the affine recurrence of the intervening open block. The
terminal lock, the full centered residue, and the layer valuations therefore
have rank one.

The infinite integer shadow with (Q=3) shows that this is a structural
obstruction, not a weak constant. A successful continuation must impose a
new condition on the global prefix or on the full modulus (D). No coupling
of the two endpoint valuations of the same transition layer can yield the
critical polynomial lower bound.
