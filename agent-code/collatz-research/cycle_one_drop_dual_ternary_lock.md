# The dual ternary lock for a stabilized renewal suffix

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** We prove that the stabilized suffix and the bottom return lock
the low initial value to one explicit residue modulo a power of $3$.  The
power of $3$ is larger than the entire low interval.  We then give an
exact anchored countershadow showing that suffix growth, strict leastness,
and the bottom return do not by themselves give a contradiction.  The
remaining condition is a collision between the prefix dyadic cylinder and
the suffix ternary cylinder.  We do not exclude that collision at all
depths.

## 1. Accelerated odd coordinates

We retain the notation

\[
\gamma:=\log _2(3/2),\qquad
\alpha:=\log _2 3=1+\gamma,
\qquad e:=\lceil\gamma r\rceil,
\qquad N:=r+e.
\tag{1}
\]

Let $n:=r-1$.  At an internal ordinary branch we put $a_i:=1$, and
at an internal spike branch we put $a_i:=2$.  If $z_i$ denotes the
integer state and

\[
x_i:=2z_i-1,
\tag{2}
\]

then both branches become

\[
T_a(x):=\frac{3x+1}{2^a},
\qquad a\in\{1,2\}.
\tag{3}
\]

The bottom equation is exactly one further accelerated branch of exponent
$U+2$.  Thus a denominator-one return has exponent word

\[
(a_1,\ldots,a_n,U+2),
\qquad
\sum_{i=1}^n a_i+U+2=N.
\tag{4}
\]

Put

\[
L_s:=\sum_{i=1}^s a_i=s+V_s,
\qquad
\tau:=\min\{s:L_s\geq U\}.
\tag{5}
\]

Since every $a_i$ is one or two, we have

\[
L_\tau=U+d,
\qquad d\in\{0,1\}.
\tag{6}
\]

The stabilization lemma in the phase-debt reduction gives this same
$\tau$ for every low cylinder failure.  In particular, all cylinder lifts
after time $\tau$ are zero.

## 2. The suffix carry

We now isolate the suffix followed by the bottom branch.  Write

\[
(c_1,\ldots,c_k)
:=(a_{\tau+1},\ldots,a_n,U+2),
\qquad k:=r-\tau,
\tag{7}
\]

and define

\[
A_0:=0,\qquad C_0:=0,
\tag{8}
\]

\[
A_j:=A_{j-1}+c_j,
\qquad
C_j:=3C_{j-1}+2^{A_{j-1}}
\qquad(1\leq j\leq k).
\tag{9}
\]

Repeated substitution in (3) gives

\[
T_{c_k}\circ\cdots\circ T_{c_1}(Y)
=\frac{3^kY+C_k}{2^{A_k}}.
\tag{10}
\]

Note that (4) and (6) give

\[
A_k=N-U-d.
\tag{11}
\]

We let $R_\tau$ denote the least nonnegative residue satisfying

\[
2^{A_k}R_\tau\equiv C_k\pmod {3^k}.
\tag{12}
\]

The inverse in (12) exists because $3^k$ is odd.

## 3. Dual locking theorem

**Theorem 1.** Suppose that a complete anchored integer path satisfies the
bottom return and

\[
q\leq2^{U-1}.
\tag{13}
\]

Put $x:=2q-1$, and define $R_\tau$ by (5) through (12).  Then

\[
\boxed{x=R_\tau.}
\tag{14}
\]

Moreover,

\[
3^k>2^U,
\tag{15}
\]

so (14) is equality of ordinary integers, rather than equality inside a
residue ring.

**Proof.** Let $Y:=x_\tau$.  The suffix and the bottom return send $Y$
back to $x$.  Equation (10) therefore gives

\[
2^{A_k}x-C_k=3^kY.
\tag{16}
\]

Hence $x\equiv R_\tau\pmod {3^k}$.

It remains to prove (15).  Since $L_U\geq U$, equation (5) gives
$\tau\leq U$, and therefore $k=r-\tau\geq r-U$.  Also,

\[
U\leq e-1<\gamma r.
\tag{17}
\]

The elementary inequality $3^5<2^8$ gives $\alpha<8/5$.  Consequently,

\[
\alpha^2-\alpha-1<0,
\qquad
\gamma=\alpha-1<\frac{\alpha}{1+\alpha}.
\tag{18}
\]

Equations (17) and (18) imply

\[
\alpha(r-U)>U.
\tag{19}
\]

Thus $3^k\geq3^{r-U}>2^U$.  Finally, (13) gives
$0<x<2^U$.  Both $x$ and $R_\tau$ lie in the complete residue
interval $[0,3^k)$, so their congruence is the equality (14).  The
conclusion follows.  $\square$

The first anchored clock bit is zero.  Hence the first branch is ordinary,
which forces $q$ to be even.  We obtain the following immediate
necessary condition.

**Corollary 2.** Every low denominator-one return satisfies

\[
0<R_\tau<2^U,
\qquad
R_\tau\equiv3\pmod4.
\tag{20}
\]

In other words, the long zero-lift suffix exposes enough ternary digits to
determine the complete low starting value.

## 4. The exact prefix-suffix collision

The ternary lock does not yet include the prefix cylinder.  Let $P_\tau$
be the accelerated carry of the first $\tau$ branches, so that the state
obtained from the prefix is

\[
Y_+(x):=\frac{3^\tau x+P_\tau}{2^{L_\tau}}.
\tag{21}
\]

The state obtained by reversing the suffix return is

\[
Y_-(x):=\frac{2^{A_k}x-C_k}{3^k}.
\tag{22}
\]

The prefix dyadic domain makes $Y_+(x)$ an odd integer, while the suffix
ternary domain makes $Y_-(x)$ an odd integer.  The complete return holds
if and only if

\[
\boxed{Y_+(x)=Y_-(x).}
\tag{23}
\]

Indeed, if $C_{\rm full}$ denotes the carry of the complete accelerated
word, then direct substitution gives

\[
Y_-(x)-Y_+(x)
=\frac{(2^N-3^r)x-C_{\rm full}}
       {2^{L_\tau}3^k}.
\tag{24}
\]

Thus (23) is the original denominator-one numerator, viewed at the middle
state.  The gain is that the two large coprime domains are now separated:
the prefix determines $x$ dyadically, and the stabilized suffix
determines $x$ ternarily.  The remaining obstruction is their exact
integer collision.

## 5. An anchored suffix countershadow

We now show that the suffix conditions in Corollary 2 are not themselves
contradictory.  Take

\[
r=37,\qquad N=59,\qquad e=22,\qquad U=19.
\tag{25}
\]

Choose the two internal spike times $26$ and $32$, both of which are
one sites of the anchored clock.  All other internal exponents equal one.
Then $V=2$, $U=e-1-V$, and

\[
\tau=19,\qquad n-\tau=17=r-e+V,\qquad k=18.
\tag{26}
\]

The internal suffix exponents, from times $20$ through $36$, are

\[
11111121111121111.
\tag{27}
\]

After appending the bottom exponent $21$, equations (8) and (9) give

\[
A_k=40,\qquad C_k=413{,}028{,}041.
\tag{28}
\]

The ternary residue in (12) is

\[
R_\tau=185{,}699<2^{19},
\qquad
R_\tau\equiv3\pmod4.
\tag{29}
\]

More precisely,

\[
2^{40}\cdot185{,}699-413{,}028{,}041
=3^{18}\cdot527{,}019{,}647.
\tag{30}
\]

Starting from $Y=527{,}019{,}647$, the suffix in (27) and the bottom
branch return exactly to $R_\tau$.  Every proper odd state in this suffix
is larger than $185{,}699$.  Therefore the suffix has exact integrality,
the anchored placement, the low return, the required initial parity, and
strict leastness throughout the entire return segment.

The shadow fails only at the prefix.  Here

\[
q=\frac{R_\tau+1}{2}=92{,}850<2^{18}.
\tag{31}
\]

The first ordinary branch sends $q$ to $139{,}275\equiv3\pmod4$, so
the prescribed all-ordinary prefix exits at time two.  Equivalently, an
all-ordinary prefix of length $19$ would require $2^{19}\mid q$, which
is impossible in (31).

This example is a rigorous no-go for a suffix-only growth or projective
order argument.  Such an argument can preserve every condition in
Corollary 2 and still miss the prefix cylinder.

## 6. Consequence for the active gate

The phase-debt stabilization does produce new global information: it
changes the bottom equation into the integer identity (14), because its
ternary modulus is larger than the whole low interval.  However, the
$r=37$ row proves that the stabilized renewal segment and exact bottom
return do not force a contradiction, even after strict leastness and the
initial parity class are imposed.

Therefore an all-depth proof must separate the prefix dyadic residue from
the suffix ternary residue, or prove that the two middle states in (21)
and (22) cannot coincide.  This is a smaller and more symmetric statement
than the unsplit full-cylinder condition, but it remains an unbounded
mixed-radix collision problem.

The exact arithmetic is audited by
[`cycles/renewal_dual_lock_certificate.js`](cycles/renewal_dual_lock_certificate.js).
The compressed diagnostic
[`cycles/renewal_dual_suffix_gate_probe.js`](cycles/renewal_dual_suffix_gate_probe.js)
enumerates every possible stabilized suffix through a chosen finite depth.
