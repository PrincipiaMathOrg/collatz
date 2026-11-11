# Audit of the parity-centered filter model

**Date:** 26 August 2026  
**Mode:** SOLVE, corrected by CALCULATE  
**Status:** retracted as an unconditional reduction. The fixed centered
cell weights below linearize only the stronger model in which every cover
preserves an odd terminal endpoint. Canonical FCD corner deletion does not
preserve that property.

## 1. The proposed centering

For a nonterminal cell \(c\), let

\[
L_c:=[\Delta_cP^{-1}]_M,
\qquad
MV_c=DL_c+\Delta_c.
\tag{1}
\]

The proposed fixed parity center was

\[
\varepsilon_c:=V_c\bmod2,
\tag{2}
\]

\[
\ell_c:=L_c-\varepsilon_cM,
\qquad
\nu_c:=V_c-\varepsilon_cD.
\tag{3}
\]

For a cover \(J':=J\setminus\{c\}\), the actual dyadic wrap is

\[
a_c(J):=
\left\lfloor\frac{\rho(J)+L_c}{M}\right\rfloor.
\tag{4}
\]

If both canonical endpoints were odd, the coordinate parity calculation
would give

\[
a_c(J)=\varepsilon_c.
\tag{5}
\]

Under (5), the cover updates would become

\[
\rho(J')=\rho(J)+\ell_c,
\tag{6}
\]

\[
\delta(J')=\delta(J)-\nu_c,
\qquad
\delta(J):=Z(J)-\rho(J).
\tag{7}
\]

Complete minimality would then reduce to a minimum-weight removable filter.
This is a valid conditional model, but (5) is false for canonical FCD
profiles.

## 2. Direct failure of the cover law

Use the \(s=8\) profile

\[
\mathbf d=(0,0,0,0,0,0,2,4)
\]

and its nonterminal corner \(c=(6,2)\). The exact values are

\[
M=8192,
\qquad
\rho(J)=3903,
\qquad
L_c=4480,
\qquad
V_c=892.
\]

Therefore,

\[
\varepsilon_c=0,
\]

but

\[
a_c(J)
=\left\lfloor\frac{3903+4480}{8192}\right\rfloor
=1.
\tag{8}
\]

The top canonical endpoint is \(3127\), while the child endpoint is
\(154\). The loss of odd terminal parity is exactly what permits
\(a_c(J)\neq\varepsilon_c\).

Thus (6) and (7) do not hold with profile-independent cell weights on the
unconditional anchored lattice.

## 3. Scope of the dynamic program

The checker
[inverse/q2_centered_filter_probe.js](inverse/q2_centered_filter_probe.js)
evaluates the conditional fixed-weight model. Through \(s=20\), it finds
\(395\) formal boards with positive conditional filter minimum among
\(51{,}978\) boards whose top corners have even \(V_c\).

Those counts remain exact for the conditional model. They do not certify
terminal-preserving minimality in FCD, because the actual wrap
\(a_c(J)\) can change with \(J\) and need not equal \(V_c\bmod2\).

The checker is retained as a regression and as a warning against treating
endpoint oddness as automatic. It is not a proof certificate for an
unconditional theorem.

## 4. Correct remaining gate

Without a terminal-exactness theorem, the exact cover update remains

\[
\rho(J')=\rho(J)+L_c-a_c(J)M,
\]

\[
\tau(J')=\tau(J)-V_c+b_c(J)D,
\]

\[
E(J')-E(J)=b_c(J)-a_c(J).
\tag{9}
\]

The wraps in (9) are state-dependent. A valid continuation must retain
them, or introduce an additional terminal-lift coordinate and prove that
the lifted system still controls the canonical FCD color. The fixed
parity-centered filter minimum cannot replace this missing argument.

The additional coordinate and its exact cell-translation law are now
constructed in
[q2_exactness_lifted_packet_container.md](q2_exactness_lifted_packet_container.md).
It records endpoint exactness by lifting the canonical dyadic residue from
modulus \(M\) to modulus \(2M\). It does not by itself prove the remaining
packet-contraction theorem.
