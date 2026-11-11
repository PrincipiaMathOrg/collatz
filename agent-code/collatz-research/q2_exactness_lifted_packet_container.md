# The exactness-lifted corner-packet container for the \(q=2\) sector

**Date:** 26 August 2026  
**Mode:** THEORIZE, followed by SOLVE and CALCULATE  
**Status:** we give one normal form for every finite corner sector and prove
that every fixed corner sector reduces effectively to a finite check. We
also identify and repair a lost terminal-exactness bit in the earlier parity
compression. The unrestricted \(q_s=2\) sector is not excluded.

## 1. Setup

Put

\[
\alpha:=\log_2 3,
\qquad
N:=\lceil s\alpha\rceil,
\qquad
M:=2^N,
\qquad
P:=3^s,
\qquad
D:=M-P,
\qquad
e:=N-s.
\tag{1}
\]

At a \(q_s=2\) weight, an anchored \(b=1\) profile is a nondecreasing
delay path

\[
0=d_0\leq d_1\leq\cdots\leq d_{s-1}=e-1,
\qquad
d_i\leq m_i:=\lfloor i\alpha\rfloor-i.
\tag{2}
\]

Its carry is

\[
C(d):=P-2^s+
\sum_{i=1}^{s-1}\sum_{r=1}^{d_i}
2^{i+r-1}3^{s-1-i}.
\tag{3}
\]

The purpose of this note is to package the complete staircase, rather than
classify one, two, three, and four corners separately.

## 2. The arbitrary-corner packet normal form

The one-corner case is the previously closed ramp

\[
d_i=0\quad(0\leq i\leq s-2),
\qquad
d_{s-1}=e-1.
\]

Suppose now that the delay path has exactly \(c\geq2\) strict increases. The last
increase is forced at \(s-1\). Therefore there are unique integers

\[
1\leq J_1<\cdots<J_{c-1}\leq s-2,
\qquad
0=:a_0<a_1<\cdots<a_{c-1},
\tag{4}
\]

such that

\[
a_\ell\leq m_{J_\ell}
\qquad(1\leq\ell<c),
\tag{5}
\]

and

\[
d_i=
\begin{cases}
0,&0\leq i<J_1,\\
a_\ell,&J_\ell\leq i<J_{\ell+1}\quad(1\leq\ell<c-1),\\
a_{c-1},&J_{c-1}\leq i\leq s-2,\\
e-1,&i=s-1.
\end{cases}
\tag{6}
\]

Conversely, every parameter sequence satisfying (4) and (5) gives an
anchored delay path with exactly \(c\) corners. Thus (4) through (6) are a
necessary and sufficient container for the complete \(c\)-corner sector.

The accelerated exponent word is

\[
\boxed{
(1^{J_1-1},a_1+1,
1^{J_2-J_1-1},a_2-a_1+1,\ldots,
1^{s-J_{c-1}-2},e-a_{c-1},2).}
\tag{7}
\]

Empty exponent-one runs are allowed. We call each pair
\((J_\ell,a_{\ell-1}\to a_\ell)\) a corner packet.

For \(1\leq i<s\), put

\[
X_i:=2^i3^{s-i}.
\tag{8}
\]

The carry of the packet container has the closed form

\[
\boxed{
C(d)=P+
\sum_{\ell=1}^{c-1}
(2^{a_\ell}-2^{a_{\ell-1}})X_{J_\ell}
-3\cdot2^{s+a_{c-1}-1}+\frac M4.}
\tag{9}
\]

Indeed, a column at level \(r\) which first appears in row \(J\) contributes

\[
\sum_{i=J}^{s-1}2^{i+r-1}3^{s-1-i}
=2^{r-1}(X_J-2^s).
\tag{10}
\]

Summing (10) over the levels born in each packet, followed by the terminal
levels born at row \(s-1\), gives (9). For \(c=2,3,4\), equation (9) is
exactly the carry formula used in the three separate certificates.

## 3. Every fixed packet count is finite

Let

\[
H_s:=307s^{15},
\qquad
G_s:=154s^{15}.
\tag{11}
\]

Every strict or equality target satisfies the established seed and state
bounds

\[
n<153s^{14.3},
\qquad
x_i<2^{m_i-d_i}H_s.
\tag{12}
\]

An exponent-one run of length \(L\), beginning and ending at odd selected
states, gives

\[
2^{L+1}\mid x+1.
\tag{13}
\]

Applying (13) to the blocks in (7) gives

\[
2^{J_1}<G_s
\tag{14}
\]

and, with \(J_c:=s-1\),

\[
2^{J_{\ell+1}}
\leq\frac{H_s}{2}(2^{J_\ell})^2
\qquad(1\leq\ell<c).
\tag{15}
\]

Put

\[
q:=2^{c-1}.
\tag{16}
\]

Iterating (15) and using (14) proves the uniform packet inequality

\[
\boxed{
2^{s+q-2}
<307^{q-1}154^q s^{15(2q-1)}.}
\tag{17}
\]

For each fixed \(c\), the right side of (17) is a fixed polynomial in
\(s\), while the left side is exponential. Consequently, every fixed
corner sector is reduced to a finite exact residue check.

The certificate computes the first propagating reverse inequalities:

\[
\begin{array}{c|c|c}
c&q&\text{analytic exclusion begins at}\\ \hline
2&2&415\\
3&4&1115\\
4&8&2672\\
5&16&6071.
\end{array}
\tag{18}
\]

Thus the five-corner sector, although not enumerated, is already reduced to
the finite range \(s\leq6070\). More generally, (17) is a uniform
fixed-parameter reduction with the number of corners as its parameter.

This does not make the whole \(q_s=2\) problem finite. A hypothetical
target has an unbounded number of corners, with the sharp lower bound

\[
c\geq1+\log_\alpha s-\log_\alpha\log s-O(1).
\tag{19}
\]

Therefore, a uniform reduction still needs an operation which decreases
packet complexity while retaining the exact target data.

## 4. Terminal exactness is not downward closed

The earlier parity compression treated every proper terminal-preserving
subideal as though its canonical endpoint remained odd. This is false.

At \(s=8\), put

\[
d=(0,0,0,0,0,0,2,4).
\tag{20}
\]

Its canonical segment is

\[
3903\longmapsto3127,
\tag{21}
\]

so the terminal exponent is exact. Remove the nonterminal corner
\(c=(6,2)\). The child segment is

\[
191\longmapsto154.
\tag{22}
\]

Both profiles have FCD color \(E=1\), but the child endpoint is even. In
exact coordinates,

\[
L_c=4480,
\qquad
V_c=892,
\qquad
\left\lfloor\frac{3903+4480}{8192}\right\rfloor=1.
\tag{23}
\]

Thus terminal-preserving corner deletion does not preserve the exact final
valuation. In particular, odd endpoint parity cannot be imposed on every
proper subideal of an algebraically minimal failure.

## 5. The one-bit lifted container

The missing datum has a canonical form. Define

\[
\rho:=[-CP^{-1}]_M,
\qquad
\widehat\rho:=[-CP^{-1}]_{2M}.
\tag{24}
\]

Since \(\widehat\rho\equiv\rho\pmod M\), there is a unique bit

\[
\xi:=\frac{\widehat\rho-\rho}{M}\in\{0,1\}.
\tag{25}
\]

If

\[
Z:=\frac{P\rho+C}{M},
\tag{26}
\]

then

\[
\boxed{\xi\equiv Z\pmod2.}
\tag{27}
\]

Indeed, \(\widehat\rho=\rho\) precisely when \(P\rho+C\) is divisible by
\(2M\). Since \(P\) is odd, the other lift \(\rho+M\) occurs precisely
when \(Z\) is odd. Thus \(\xi\) is exactly the terminal-exactness bit.

For a nonterminal cell of weight \(\Delta_c\), define

\[
L_c:=[\Delta_cP^{-1}]_M,
\qquad
MV_c=DL_c+\Delta_c,
\tag{28}
\]

and its lifted threshold

\[
\widehat L_c:=[\Delta_cP^{-1}]_{2M}.
\tag{29}
\]

Since every nonterminal \(L_c\) is even, we have

\[
\boxed{
\widehat L_c=L_c+(V_c\bmod2)M.}
\tag{30}
\]

To see this, note that

\[
PL_c-\Delta_c=M(L_c-V_c).
\tag{31}
\]

The residue \(L_c\) lifts from modulus \(M\) to modulus \(2M\) exactly
when \(L_c-V_c\) is even. Otherwise the lift is \(L_c+M\), which proves
(30).

If \(I':=I\setminus\{c\}\), then the lifted coordinate has the exact
translation law

\[
\boxed{
\widehat\rho(I')=
[\widehat\rho(I)+\widehat L_c]_{2M}.}
\tag{32}
\]

More generally, for a removable subset \(S\), put

\[
L_S:=\sum_{c\in S}L_c,
\qquad
V_S:=\sum_{c\in S}V_c,
\qquad
a_S:=\left\lfloor\frac{\rho+L_S}{M}\right\rfloor.
\tag{33}
\]

The endpoint update gives

\[
\boxed{
\xi(I\setminus S)
\equiv\xi(I)+V_S+a_S\pmod2.}
\tag{34}

Consequently, if the top endpoint is exact, then the subideal endpoint is
exact if and only if

\[
\boxed{V_S\equiv a_S\pmod2.}
\tag{35}

The congruence previously asserted for every subset is therefore the
criterion selecting the exact subsets. It is not an automatic identity on
the full corner cube.

## 6. Operations and the remaining uniform lemma

The corrected container is

\[
\mathcal C(I):=
\left(s;(J_\ell,a_\ell)_{\ell<c};
C,\rho,\widehat\rho,\tau,E\right).
\tag{36}
\]

It supports four exact operations.

1. We can insert or delete an exposed cell by translating
   \((C,\rho,\widehat\rho,\tau,E)\) with
   \((\Delta_c,L_c,\widehat L_c,V_c)\).
2. We can merge all cells born in one corner packet by the closed carry
   formula (9).
3. We can test terminal exactness by asking whether
   \(\widehat\rho\in[M,2M)\).
4. For fixed \(c\), we can enumerate only the packet parameters below the
   finite cutoff (17), then apply exact seed, residue, and lifted-bit
   pruning.

There is also a natural interval contraction. Put

\[
J_c:=s-1,
\qquad
1\leq p\leq q\leq c-1.
\tag{37}
\]

Flatten the consecutive plateaux from \(J_p\) through \(J_{q+1}-1\) to
the preceding level \(a_{p-1}\). The removed carry is

\[
\boxed{
\Delta_{p,q}
=\sum_{\ell=p}^{q}
(2^{a_\ell}-2^{a_{p-1}})
(X_{J_\ell}-X_{J_{\ell+1}}).}
\tag{38}
\]

Indeed, for a fixed level \(r\), the rows in one plateau satisfy

\[
\sum_{i=J_\ell}^{J_{\ell+1}-1}
2^{i+r-1}3^{s-1-i}
=2^{r-1}(X_{J_\ell}-X_{J_{\ell+1}}).
\tag{39}
\]

Thus (38) follows after summing
\(a_{p-1}<r\leq a_\ell\). The contracted container is obtained exactly
from

\[
C'=C-\Delta_{p,q},
\qquad
\widehat\rho'
=\left[\widehat\rho+
\left[\Delta_{p,q}P^{-1}\right]_{2M}\right]_{2M},
\tag{40}
\]

followed by the corresponding modulus-\(M\) and modulus-\(D\) updates.
The operation preserves the terminal row and removes at least one corner.

This object contains the one-, two-, three-, and four-corner certificates
as its first four strata. It also gives a finite five-corner problem below
\(6071\).

Neither exposed-cell deletion nor interval contraction preserves exactness
on shape grounds alone. The first exact profile with no exact
single-plateau contraction occurs at weight thirteen. Through weight
twenty, there are \(21{,}839\) such profiles with at least five corners.
Even allowing every consecutive block is insufficient. Through weight
twenty there are \(43\) exact profiles isolated from all such contractions.
The first occurs at weight fifteen:

\[
d=(0,0,0,0,0,1,1,1,1,4,5,6,6,6,8)
\tag{41}
\]

has

\[
\rho=1{,}934{,}495,
\qquad
Z=1{,}654{,}501,
\qquad
E=1,
\tag{42}
\]

and none of its ten nonempty consecutive nonterminal block contractions
has an odd endpoint. Thus a valid contraction theorem must use the
non-descent color, not only the packet geometry and the lifted bit.

There is a second independent obstruction. On the weight-eight shape

\[
d=(0,0,1,1,2,2,3,4),
\tag{43}
\]

the anchored carry is \(13{,}349\). Replace it virtually by

\[
C_*=8{,}155=D\cdot5+M\cdot0.
\tag{44}
\]

The virtual top has \((\rho,Z,E)=(5,5,0)\), while every one of its
twenty-nine proper terminal-preserving subideals has color one. There are
seven top-exact isolated translations satisfying the same carry-size
bound, and none has zero anchor offset. Therefore top exactness and the
complete subideal coloring still do not determine the absolute carry.
The anchored term in (3), or an equivalent absolute shadow coordinate,
is indispensable.

To exclude the complete \(q_s=2,b=1\) sector, one further theorem would
suffice. In view of (41)-(44), its viable form must be both color-sensitive
and anchor-sensitive.

**Anchored lifted interval-contraction target.** Every exact anchored
\(q_s=2,b=1\) non-descent with at least five corners has indices
\(1\leq p\leq q\leq c-1\) for which the contraction (38) remains exact
and has FCD color zero.

Repeated contraction would reduce a failure to the already excluded
four-corner sector. Equation (35) shows precisely why a proof must use the
lifted coordinate, while (44) shows why it must also use the anchored
carry. An arbitrary packet deletion may leave the exact subspace, and an
arbitrary translation can manufacture an exact isolated failure.

We have not proved anchored lifted interval contraction. Therefore this
note reduces every bounded-corner sector to a finite check and gives the
correct object on which an all-corner reduction must operate, but it does
not exclude the entire \(q_s=2\) sector.

## 7. Certificate

The checker
[inverse/q2_corner_packet_container_certificate.js](inverse/q2_corner_packet_container_certificate.js)
does the following with exact integer arithmetic.

1. It recovers the cutoffs in (18), including the new five-corner cutoff
   \(6071\).
2. It compares (9) with the cell-by-cell carry on every anchored profile at
   the four \(q_s=2\) weights through \(s=12\), giving 207 carry checks.
3. It checks (27), (30), (32), and (34) on 492 exposed cells.
4. It freezes the exactness-loss witness (20) through (23).

The checker
[inverse/q2_lifted_packet_contraction_probe.js](inverse/q2_lifted_packet_contraction_probe.js)
falsifies singleton and one-plateau exactness closure. The checker
[inverse/q2_lifted_block_contraction_probe.js](inverse/q2_lifted_block_contraction_probe.js)
falsifies exactness closure for every consecutive block and freezes
(41)-(42). Finally,
[inverse/q2_lifted_full_lattice_virtual_probe.js](inverse/q2_lifted_full_lattice_virtual_probe.js)
checks all thirty vertices below (43) and freezes the seven top-exact
isolated translations, including (44). These probes test exactness and
translated relative lattices only. They do not assert a non-descent in the
anchored Collatz family.

The computation is a regression for the algebraic identities. The packet
classification, fixed-corner finiteness, and lifted-coordinate formulas are
the all-depth proofs.
