# Terminal exactness audit for the \(q=2\) flux cube

**Date:** 26 August 2026  
**Mode:** SOLVE, corrected by CALCULATE  
**Status:** retracted as an unconditional FCD reduction. The canonical
endpoint need not remain odd after a nonterminal corner deletion. The
earlier parity compression is valid only under an extra terminal-exactness
hypothesis which terminal-preserving minimalization does not supply.

## 1. The attempted parity step

Fix a \(q_s=2\) weight and put

\[
M:=2^N,
\qquad
P:=3^s,
\qquad
D:=M-P.
\tag{1}
\]

For a terminal-preserving minimal failure \(I\), write

\[
a_S:=
\left\lfloor\frac{\rho+L_S}{M}\right\rfloor,
\qquad
b_S:=
\left\lceil\frac{V_S-\tau}{D}\right\rceil.
\tag{2}
\]

The exact flux theorem gives

\[
b_S-a_S=1
\tag{3}
\]

for every nonempty subset of the nonterminal top corners.

The attempted strengthening used the displacement identity

\[
Z-\rho=\tau-ED.
\tag{4}
\]

If both the top and every corner-deleted child had odd start and odd
endpoint, then the top coordinate \(\tau\) would be even and every proper
child coordinate \(\tau_S\) would be odd. Reducing the coordinate update
modulo \(2\) would then give

\[
V_S\equiv a_S\pmod2.
\tag{5}
\]

Singleton minimality would force \(a_{\{c\}}=0\), hence every \(V_c\)
even. Along a chain of corner subsets, the floors \(a_S\) could increase
only by zero or one while remaining even, so every \(a_S\) would vanish.

This argument is correct under the displayed odd-endpoint hypothesis. That
hypothesis is not inherited by the canonical length-\(N\) cylinder.

## 2. Exact counterexample to endpoint-parity preservation

Take

\[
s=8,
\qquad
N=13,
\qquad
M=8192,
\qquad
P=6561,
\qquad
D=1631,
\tag{6}
\]

and the anchored delay vector

\[
\mathbf d=(0,0,0,0,0,0,2,4).
\tag{7}
\]

Its carry and canonical point are

\[
C=8801,
\qquad
\rho=3903,
\qquad
Z=3127.
\tag{8}
\]

Thus the top start and endpoint are both odd. Remove the nonterminal corner

\[
c=(6,2),
\qquad
\Delta_c=384.
\]

The child carry and canonical point are

\[
C'=8417,
\qquad
\rho'=191,
\qquad
Z'=154.
\tag{9}
\]

The child endpoint is even. Both profiles are on the descending branch:

\[
Z-\rho=-776,
\qquad
Z'-\rho'=-37.
\]

For this cell,

\[
L_c=4480,
\qquad
V_c=892.
\tag{10}
\]

Hence \(V_c\) is even, but

\[
\left\lfloor\frac{\rho+L_c}{M}\right\rfloor
=\left\lfloor\frac{8383}{8192}\right\rfloor
=1.
\tag{11}
\]

Equation (11) directly refutes the unconditional wrap-parity law used in
the attempted proof.

The checker
[inverse/q2_terminal_deletion_parity_probe.js](inverse/q2_terminal_deletion_parity_probe.js)
reconstructs (6)-(11) from the anchored carry formulas with exact integer
arithmetic.

## 3. Why the endpoint can become even

The length-\(N\) cylinder fixes the prescribed powers of \(2\) through the
segment, but its canonical representative in \([0,M)\) need not make the
terminal valuation exact. It may encode the final exponent only as a lower
bound. An additional lift \(\rho\mapsto\rho+M\) can restore the desired
terminal parity, as in the ramp audit, but that lifted start is no longer
the canonical representative used in the FCD color.

Fixing the terminal delay row therefore does not fix terminal exactness.
Corner deletion can change the endpoint parity even though the formal
terminal row remains unchanged.

## 4. Surviving algebra

The cell-parity formula itself remains valid. For \(c=(i,r)\), put

\[
t:=i+r-1,
\qquad
q:=N-t,
\qquad
\lambda:=[3^{-i-1}]_{2^q}.
\]

Then

\[
V_c\equiv
\frac{1-3^{i+1}\lambda}{2^q}
\pmod2.
\tag{12}
\]

Equivalently, \(V_c\bmod2\) is the next binary digit of the truncated
inverse \([3^{-i-1}]_{2^q}\). What fails is the claim that minimality forces
this bit to be zero.

The earlier translated-cube probes remain exact tests of the stronger
odd-endpoint model. They are not necessary conditions for an FCD minimal
failure and cannot be used to close the gate.

## 5. Correct frontier

The unconditional closed statement remains the all-subset flux identity

\[
\left\lceil\frac{V_S-\tau}{D}\right\rceil
-\left\lfloor\frac{\rho+L_S}{M}\right\rfloor
=1.
\tag{13}
\]

Any future parity argument must either prove terminal exactness for the
canonical representatives under the required deletions, or track the
extra terminal lift explicitly. Until then, neither parity compression nor
the zero next-inverse-bit condition is available for First-Crossing
Descent.

The explicit modulus-\(2M\) lift is constructed in
[q2_exactness_lifted_packet_container.md](q2_exactness_lifted_packet_container.md).
There the congruence (5) becomes the exact criterion selecting the
terminal-exact subideals, rather than an unconditional law on the full
cube.
