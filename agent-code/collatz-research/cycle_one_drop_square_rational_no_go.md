# The rational no-go and forced suffix gate at square scale

**Date:** 18 August 2026  
**Mode:** SOLVE to THEORIZE  
**Status:** We prove that phase, strict leastness, and exact bottom closure
do not imply the square bound over the rationals. We then reduce an integer
failure to one forced inverse-Collatz trajectory. The finite suffix search
finds no exact shadow through \(r=55\). We do not prove the all-depth
integer bound.

## 1. Setup

Put

\[
\gamma:=\log _2(3/2),\qquad
\alpha:=\log _2 3,\qquad
N:=\lceil\alpha r\rceil,\qquad
e:=N-r,
\tag{1}
\]

and write

\[
\delta:=N-\alpha r=e-\gamma r\in(0,1).
\tag{2}
\]

The anchored clock is

\[
b_t:=\left\lfloor\frac{et}{r}\right\rfloor
-\left\lfloor\frac{e(t-1)}{r}\right\rfloor,
\qquad 1\leq t\leq r.
\tag{3}
\]

At an internal ordinary branch we use exponent \(a_t=1\), while at an
internal spike branch we use \(a_t=2\). If \(V_s\) denotes the number of
spikes through time \(s\), then

\[
L_s:=s+V_s.
\tag{4}
\]

For a complete internal word of length \(n:=r-1\), put

\[
U:=e-1-V_n.
\tag{5}
\]

The proposed square bound is

\[
\boxed{q^2\geq2^U,}
\tag{6}
\]

where \(q\) is the least positive representative of the full dyadic
cylinder.

## 2. A rational countermodel to every scalar proof

We begin by recording that (6) cannot follow from the real affine maps,
the anchored phase, strict leastness, and bottom closure alone.

**Proposition 1.** There are infinitely many anchored rational affine
models for which the following statements hold:

1. every spike is placed at an anchored clock-one site;
2. the exact bottom closure holds;
3. every proper state is larger than the initial state \(Q\);
4. \(V\) and \(U\) tend to infinity;
5. \(Q\) remains bounded, and hence \(Q^2<2^U\).

**Proof.** We recall the construction in the bottom-normalized carry
gate. For all sufficiently large \(r\), choose

\[
V_r:=\left\lceil2\log _2r\right\rceil
\tag{7}
\]

and use the last \(V_r\) internal clock-one sites as spikes. All preceding
clock-one sites are omissions. Let \(U_r:=e-1-V_r\).

If \(W_i\) denotes the state divided by \(2^{H_i}\), where \(H_i\) is the
number of omissions through time \(i\), then the complete internal
trajectory has the form

\[
W_{r-1}=P_rQ+E_r,
\qquad
P_r:=\frac{3^{r-1}}{2^{N-2}},
\qquad
E_r\geq0.
\tag{8}
\]

The selected suffix has length at most \(2V_r+2\). Therefore,

\[
0\leq E_r\leq
\frac{V_r}{4}
\left(\frac32\right)^{2V_r+2}2^{-U_r}=o(1).
\tag{9}
\]

There are infinitely many \(r\) for which
\(\{\gamma r\}\leq1/2\). Along this subsequence,

\[
\Delta_r:=1-\frac{3^r}{2^N}
\geq1-2^{-1/2}.
\tag{10}
\]

Define

\[
Q_r:=
\frac{3E_r/4+1/2-2^{-U_r-2}}{\Delta_r}.
\tag{11}
\]

Equation (11) is exactly the bottom-closure identity solved for \(Q\).
Equations (9) and (10) show that \(Q_r\) remains positive and bounded,
while \(U_r\to\infty\). Thus \(Q_r^2<2^{U_r}\) for every sufficiently
large member of the subsequence.

Before the selected suffix, every branch multiplies the state by \(3/2\).
Inside the suffix, each branch is bounded below by multiplication by
\(3/4\). Hence every suffix state is at least

\[
\left(\frac32\right)^{r-2V_r-2}
\left(\frac34\right)^{2V_r+2}Q_r.
\tag{12}
\]

The factor in (12) tends to infinity because \(V_r=O(\log r)\).
Therefore every proper state is larger than \(Q_r\) for all sufficiently
large \(r\). The conclusion follows. \(\square\)

The values \(Q_r\) in Proposition 1 are generally not integers. In
particular, they do not satisfy the growing dyadic block-domain
congruences. This is the exact point of the construction: an all-depth
proof of (6) must use integer cylinder arithmetic.

The certificate
[cycles/bottom_normalized_rational_certificate.js](cycles/bottom_normalized_rational_certificate.js)
checks 482 exact rational rows through \(64\leq r\leq1024\). It verifies
the anchored phase, affine carry, bottom closure, strict leastness, and
both the linear and square target failures.

## 3. The square suffix split

Suppose now that an anchored integer denominator-one return violates
(6). Put

\[
m:=\left\lceil\frac U2\right\rceil,
\qquad
\tau:=\min\{s:L_s\geq m\}.
\tag{13}
\]

Since \(q^2<2^U\), we have \(0<q<2^m\). The nested prefix cylinders
therefore give

\[
q_s=q\qquad(\tau\leq s\leq n).
\tag{14}
\]

Moreover, \(L_s\geq s\), so \(\tau\leq m\). Since each increment of
\(L_s\) is one or two, we may write

\[
L_\tau=m+d,\qquad d\in\{0,1\}.
\tag{15}
\]

Let \(V_{\mathrm{pre}}:=V_\tau\). Equations (4) and (15) give

\[
m+d=\tau+V_{\mathrm{pre}}.
\tag{16}
\]

We pass to odd coordinates \(x_i:=2z_i-1\), and put \(x:=2q-1\).
The suffix after time \(\tau\), followed by the bottom exponent \(U+2\),
has

\[
k:=r-\tau
\tag{17}
\]

steps and total exponent

\[
A=N-L_\tau=N-m-d.
\tag{18}
\]

If \(C\) is its accelerated Collatz carry and \(Y:=x_\tau\), then exact
bottom return is

\[
\boxed{2^Ax-C=3^kY.}
\tag{19}
\]

Let \(R\) be the least nonnegative residue satisfying

\[
2^AR\equiv C\pmod {3^k}.
\tag{20}
\]

For \(U\leq2\), the first anchored ordinary branch and \(q^2<2^U\)
are incompatible. Thus \(U\geq3\). The standard exponent comparison
gives

\[
3^{r-U}>2^U.
\tag{21}
\]

Indeed, \(3^5<2^8\) gives
\(\gamma<\alpha/(1+\alpha)\). Since \(U<\gamma r\), we obtain
\(\alpha(r-U)>U\), which is equivalent to (21).

Since \(\tau\leq m\leq U\), equations (17) and (21) give

\[
3^k\geq3^{r-U}>2^U>x.
\tag{22}
\]

Equations (19), (20), and (22) now imply the ordinary integer equality

\[
\boxed{x=R.}
\tag{23}
\]

In other words, the long suffix exposes enough ternary digits to determine
the complete square-low starting value.

## 4. What strictness contributes

Suppose that the return is strictly least, so that \(Y>x\). Since
\(C>0\), equation (19) gives

\[
2^A>3^k.
\tag{24}
\]

The logarithmic gap in (24) is

\[
\begin{aligned}
A-\alpha k
&=N-m-d-\alpha(r-\tau)\\
&=\delta+\alpha\tau-m-d\\
&=\delta+\gamma\tau-V_{\mathrm{pre}}.
\end{aligned}
\tag{25}
\]

On the other hand, anchored eligibility gives

\[
V_{\mathrm{pre}}
\leq\left\lfloor\frac{e\tau}{r}\right\rfloor
=\left\lfloor\gamma\tau+\frac{\delta\tau}{r}\right\rfloor
<\gamma\tau+\delta.
\tag{26}
\]

Thus the positivity required in (24) is already implied by the anchored
prefix count. It supplies no additional phase contradiction. The carry
inequality in (19) still contains arithmetic information, but that
information is precisely the mixed dyadic and ternary collision.

## 5. The forced inverse formulation

Equation (23) removes the suffix word as an independent choice. Given
\((r,U,q)\), put \(x:=2q-1\) and begin with the bottom inverse

\[
y_0:=\frac{2^{U+2}x-1}{3}.
\tag{27}
\]

If (27) is not integral, the candidate exits. Otherwise, every preceding
internal exponent is forced:

\[
y_{j+1}:=
\begin{cases}
(2y_j-1)/3,&y_j\equiv2\pmod3,\\[3pt]
(4y_j-1)/3,&y_j\equiv1\pmod3,
\end{cases}
\tag{28}
\]

with an exit when \(y_j\equiv0\pmod3\). Let \(a_{j+1}\in\{1,2\}\)
denote the exponent selected in (28), and put

\[
A_\ell:=a_1+\cdots+a_\ell.
\tag{29}
\]

A qualifying square split can occur only when

\[
\boxed{
A_\ell=N-2-U-m-d,
\qquad d\in\{0,1\},
}
\tag{30}
\]

in which case

\[
\tau=r-1-\ell.
\tag{31}
\]

The remaining checks are exact: an exponent two must occur at the
corresponding anchored clock-one site, the prefix must contain the
required number of spikes, every proper suffix state must exceed \(x\),
and the forced middle state \(y_\ell\) must equal the dyadic prefix state.
The last equality is the original denominator-one collision at the split.

Thus the square target does not produce many independent suffix cases.
It produces one deterministic inverse-Collatz trajectory for each
square-low \(q\). Excluding all such trajectories is a restricted
coefficient-excursion statement, not a bounded finite-state calculation.

## 6. Reproducible finite scope

The checker
[cycles/renewal_dual_square_suffix_probe.js](cycles/renewal_dual_square_suffix_probe.js)
implements (27) through (31) with exact integer arithmetic. The command

    node cycles/renewal_dual_square_suffix_probe.js 55 20

checks every \(3\leq r\leq55\), every admissible \(U\), and every even
integer \(q\) with \(q^2<2^U\). It audits 873 parameter rows and
566,034 values of \(q\). It finds

\[
\boxed{
\text{exact suffixes}=0,\qquad
\text{strict suffixes}=0.
}
\tag{32}
\]

Equation (32) is a finite statement only. No exact square-low suffix
shadow is presently known, but the search does not exclude one at larger
depth.

## Conclusion

The square threshold improves the localization, but it does not make the
remaining argument scalar. A hypothetical failure has a fixed-integer
suffix, and the bottom return locks its starting value to one ternary
residue. The rational family proves that phase, growth, strict leastness,
and bottom closure cannot exclude that residue. The remaining input is
the collision between the prefix dyadic cylinder and the forced ternary
inverse trajectory.
