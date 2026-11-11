# Logarithmic corner growth in the strict \(q=2\) gate

**Date:** 26 August 2026  
**Mode:** SOLVE  
**Status:** every anchored \(q_s=2,b=1\) strict or equality target has an
unbounded removable-corner set. Quantitatively, if \(c:=|K(I)|\), then

\[
2^c>
\frac{s-1}{\log_2(307s^{15})}.
\]

Thus \(c\geq\log_2s-\log_2\log s-O(1)\). Equivalently, the target has more
than \((s-1)/\log_2(307s^{15})\) distinct corner subsets and hence that
many distinct dyadic subset sums.

## 1. Setup

Put

\[
\alpha:=\log_2 3,
\qquad
k_i:=\lceil i\alpha\rceil,
\qquad
B_i:=\lfloor i\alpha\rfloor=k_i-1
\quad(i\geq1).
\tag{1}
\]

Let \(s\geq3\) be a \(q_s=2\) weight and write

\[
N:=k_s,
\qquad
e:=N-s.
\tag{2}
\]

An anchored \(b=1\) target has positions

\[
0=A_0<A_1<\cdots<A_{s-1}=N-2,
\qquad
A_i\leq B_i.
\tag{3}
\]

Define the delay and height paths by

\[
d_i:=A_i-i,
\qquad
m_i:=B_i-i,
\qquad
h_i:=m_i-d_i.
\tag{4}
\]

The delay path is nondecreasing, \(d_i\leq m_i\), and

\[
d_0=0,
\qquad
d_{s-1}=m_{s-1}=e-1.
\tag{5}
\]

Its strict increases are exactly the removable Ferrers corners. Let

\[
J_1<J_2<\cdots<J_c
\tag{6}
\]

be their row indices.

The \(q_s=2\) predecessor identity gives

\[
k_{s-1}-k_{s-2}=2,
\qquad
m_{s-2}=e-2.
\tag{7}
\]

Therefore the terminal delay \(e-1\) first becomes available at \(s-1\),
and

\[
\boxed{J_c=s-1.}
\tag{8}
\]

## 2. Cylinder growth between successive corners

Suppose that the target has positive odd start \(n\), and write \(x_i\)
for its exact accelerated states. Every proper valuation exponent is
realized exactly. We use the established estimates

\[
n<153s^{14.3},
\qquad
x_i<2^{h_i}H_s,
\qquad
H_s:=307s^{15}.
\tag{9}
\]

Between two successive delay jumps, the delay is constant. Hence every
accelerated exponent on the intervening edges is one. We use the elementary
cylinder fact

\[
\boxed{
\text{\(L\) consecutive exponent-one steps from \(x\)}
\quad\Longrightarrow\quad
2^{L+1}\mid x+1.}
\tag{10}
\]

Indeed,

\[
x_L+1=\frac{3^L(x+1)}{2^L},
\]

and both \(x\) and \(x_L\) are odd.

The first corner occurs after \(J_1-1\) exponent-one steps. Equations
\((9)\) and \((10)\) give

\[
2^{J_1}\mid n+1
\]

and therefore

\[
\boxed{2^{J_1}<154s^{15}.}
\tag{11}
\]

Now fix \(1\leq\ell<c\). After the jump at \(J_\ell\), the next
\(J_{\ell+1}-J_\ell-1\) exponents are one. Equation \((10)\) gives

\[
2^{J_{\ell+1}-J_\ell}\mid x_{J_\ell}+1.
\tag{12}
\]

Since the right side of the state estimate in \((9)\) is an integer,

\[
x_{J_\ell}+1
\leq2^{h_{J_\ell}}H_s
\leq2^{m_{J_\ell}}H_s.
\tag{13}
\]

For every \(J_\ell\geq1\),

\[
m_{J_\ell}
=\lfloor J_\ell(\alpha-1)\rfloor
\leq J_\ell-1.
\tag{14}
\]

Combining \((12)\) through \((14)\) yields

\[
2^{J_{\ell+1}-J_\ell}
\leq2^{J_\ell-1}H_s.
\tag{15}
\]

Put

\[
Y_\ell:=2^{J_\ell}.
\tag{16}
\]

Then \((15)\) becomes the corner-to-corner cylinder recurrence

\[
\boxed{
Y_{\ell+1}\leq\frac{H_s}{2}Y_\ell^2.}
\tag{17}
\]

## 3. The corner-growth theorem

Iterating \((17)\) gives

\[
Y_c
\leq
\left(\frac{H_s}{2}\right)^{2^{c-1}-1}
Y_1^{2^{c-1}}.
\tag{18}
\]

By \((8)\),

\[
Y_c=2^{s-1}.
\tag{19}
\]

Equation \((11)\) gives \(Y_1<154s^{15}<H_s\), while
\(H_s/2<H_s\). Hence \((18)\) and \((19)\) imply

\[
2^{s-1}
<
H_s^{\,2^{c-1}-1}
\cdot H_s^{\,2^{c-1}}
<
H_s^{\,2^c}.
\tag{20}
\]

Taking base-two logarithms proves the main theorem.

**Theorem 1.** Every anchored \(q_s=2,b=1\) strict or equality target
satisfies

\[
\boxed{
s-1<2^{|K(I)|}\log_2(307s^{15}).}
\tag{21}
\]

Equivalently,

\[
\boxed{
2^{|K(I)|}>
\frac{s-1}{\log_2(307s^{15})}.}
\tag{22}
\]

In particular,

\[
\boxed{
|K(I)|
>
\log_2(s-1)
-\log_2\log_2(307s^{15}).}
\tag{23}
\]

Thus every unbounded sequence of targets has

\[
|K(I)|\geq\log_2s-\log_2\log s-O(1).
\tag{24}
\]

## 4. Boundary-flux consequence

Distinct corner subsets have distinct dyadic threshold sums modulo \(M\).
Indeed, the corner valuations \(A_i-1\) strictly increase, so the term of
least two-adic valuation in the symmetric difference of two subsets occurs
exactly once. Therefore a target of weight \(s\) has more than

\[
\boxed{
\frac{s-1}{\log_2(307s^{15})}}
\tag{25}
\]

distinct corner-subset directions in the exact flux cube.

This is the missing target-sensitive conclusion which transition count
alone could not supply. The ramp-plus-one-drop profiles have
\(T=\Theta(s)\) and only one corner, but they are not targets. Once the
target congruence gives the polynomial state envelope, long exponent-one
cylinders force the corner set to grow.

## 5. Scope and next gate

The theorem applies directly to the original anchored target. Passing to an
inclusion-minimal failing subideal may remove the terminal row and need not
preserve \(b=1\) or the corner bound. Thus \((22)\) cannot simply be inserted
into the all-subset minimal-failure identity.

Nor does a near-linear number of distinct subset directions by itself
contradict a modulus of exponential size. The next theorem must retain the
anchored carry while using the growing flux cube. Two possible localized
forms are:

1. prove that the corner-growth bound survives a target-preserving
   minimalization;
2. prove directly that the anchored interior cells force incompatible
   binary and reduced wraps on two corner subsets.

The theorem does not prove First-Crossing Descent, exclude every cycle, or
address divergent orbits.
