# The multicut centered-residue transport theorem

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** We determine the full family of height-cut residues. The residues
form one monotone telescoping chain, with exact \(2\)-adic and \(3\)-adic
valuations. Under denominator one and failure of the critical polynomial gate,
the chain has exactly one sign transition. Terminal divisibility forces the
first negative cut above height
\[
\frac35U-\frac{271}{25}\log _2U-3.
\]
Thus a cut immediately below this barrier gives a positive residue which is
exponentially small in \(U\), relative to the full modulus. However, all cut
congruences are exactly the same class \(4K\bmod D\). Multiple cuts do not
produce a second global divisibility condition.

## 1. Integer late carries

We retain the notation of the height-truncation theorem. Put

\[
D:=2^N-3^r,
\qquad
N:=\lceil r\log _2 3\rceil,
\qquad
U:=N-r-1-V,
\tag{1}
\]

and let \(t_1<\cdots<t_V<r\) be the spike times. We define

\[
\eta_i:=H_{t_i-1},
\qquad
W_i:=2^{t_i+i}3^{r-t_i},
\qquad
p:=2^{N-U}.
\tag{2}
\]

Thus \(\eta_i\) is the omission height immediately before the \(i\)-th
spike. For \(1\leq H\leq U+1\), define

\[
\mathcal C_H:=\sum_{\eta_i\geq H}W_i,
\qquad
E_H:=\mathcal C_H-p.
\tag{3}
\]

No spike has pre-spike height larger than \(U\). Therefore,

\[
E_{U+1}=-p.
\tag{4}
\]

For \(1\leq H\leq U\), let \(T_H\) be the first state index at height
\(H\), and write

\[
C_{<H}=\frac{A_H}{3^{T_H}}.
\tag{5}
\]

At the terminal cut, we use the conventions

\[
T_{U+1}:=r,
\qquad
A_{U+1}:=3^rC.
\tag{6}
\]

Finally, put

\[
F_H:=2^{N+1}+A_H3^{r-T_H}.
\tag{7}
\]

The unnormalized affine carry is

\[
K:=
2^{N-1}-2^{r-1+V}
+3\sum_{i=1}^{V}3^{r-1-t_i}2^{t_i+i-2}.
\tag{8}
\]

The denominator-one condition is \(D\mid K\), in which case
\(Q:=K/D\).

## 2. Exact transport between cuts

For \(1\leq H\leq U\), define the height-layer carry

\[
\Delta_H:=\sum_{\eta_i=H}W_i.
\tag{9}
\]

**Proposition 1.** For every one-drop profile and every
\(1\leq H\leq U\), we have

\[
\boxed{
E_H-E_{H+1}=\Delta_H,
\qquad
F_{H+1}-F_H=\Delta_H.}
\tag{10}
\]

Moreover, for every \(1\leq H\leq U+1\),

\[
\boxed{F_H+E_H=4K.}
\tag{11}
\]

Consequently,

\[
D\mid K
\quad\Longleftrightarrow\quad
F_H+E_H\equiv0\pmod D
\tag{12}
\]

for one cut \(H\), for every cut \(H\), or for any collection of cuts.

**Proof.** Increasing the cut from \(H\) to \(H+1\) removes precisely the
spikes whose pre-spike height is \(H\). Equation (3) gives the first equality
in (10).

The bottom-normalized carry identity, multiplied by \(3^r\), gives

\[
2^{N+1}+A_H3^{r-T_H}+E_H=4K.
\tag{13}
\]

This also holds at the terminal cut by (6). Thus (11) holds. Subtracting
two consecutive instances of (11), and then using the first equality in
(10), gives the second equality. Finally, \(D\) is odd, so (12) follows
from (11). \(\square\)

In other words, the apparent collection of congruences is one congruence
written at several cut positions. More explicitly, for \(H<J\),

\[
E_J=E_H-\sum_{m=H}^{J-1}\Delta_m,
\qquad
F_J=F_H+\sum_{m=H}^{J-1}\Delta_m.
\tag{14}
\]

Thus one cut and the intervening layer carries determine every other cut.

## 3. Exact valuations

The transport chain also determines its local divisibility exactly.

**Proposition 2.** For every \(1\leq H\leq U+1\), we have

\[
v_3(E_H)=0.
\tag{15}
\]

If at least one spike remains above the cut and \(j\) is the first such
spike, then

\[
\boxed{v_2(E_H)=t_j+j.}
\tag{16}
\]

If no spike remains, then

\[
v_2(E_H)=N-U.
\tag{17}
\]

Suppose that the height-\(H\) layer is nonempty, and let \(a\) and \(b\)
be its first and last spike ranks. Then

\[
\boxed{
v_2(\Delta_H)=t_a+a,
\qquad
v_3(\Delta_H)=r-t_b.}
\tag{18}
\]

**Proof.** Every summand in \(\mathcal C_H\) is divisible by \(3\), while
\(p\) is not. This proves (15).

The exponents \(t_i+i\) are strictly increasing. Also,

\[
N-U=r+V+1>t_i+i
\tag{19}
\]

for every spike. Thus the first remaining spike is the unique term of
smallest \(2\)-adic valuation in \(E_H\), which proves (16). Equation
(17) is immediate when the late carry is empty.

For \(\Delta_H\), the first layer spike is the unique summand of smallest
\(2\)-adic valuation. The last layer spike is the unique summand of
smallest \(3\)-adic valuation. This proves (18). \(\square\)

These valuations are complete, but they do not create a new modulus.
Since \(D\) is coprime to \(6\), neither valuation forces an additional
factor of \(D\).

The suffix recurrence also gives an absolute floor for every positive
defect. Let \(k\) be the number of spikes through \(T_H\), let
\(L:=r-T_H\), and let \(w:=V-k\). The suffix factorization gives
\(E_H=2^{T_H+k}\varepsilon_L\). On putting
\(d_L:=\varepsilon_L/2^{L+w}\), we obtain

\[
E_H=2^{N-U-1}d_L.
\tag{19a}
\]

Starting with \(d_0:=-2\), the two suffix maps are

\[
O(d):=\frac32d+1,
\qquad
S(d):=\frac34d+\frac12.
\tag{19b}
\]

The final site is always ordinary.

**Lemma 2.1.** If \(E_H>0\), then

\[
\boxed{E_H\geq2^{N-U-3}.}
\tag{19c}
\]

Equality holds when the only remaining spike is at \(t=r-2\), so the
bound is sharp.

**Proof.** Initial ordinary sites fix \(-2\), and the first spike sends
\(-2\) to \(-1\). Before positivity, the only subsequent negative values
which can occur are

\[
-1,\qquad-\frac12,\qquad-\frac14.
\]

Indeed,

\[
O(-1)=-\frac12,\quad S(-1)=-\frac14,\quad
O\left(-\frac12\right)=\frac14,\quad
S\left(-\frac12\right)=\frac18,
\]

and both maps send \(-1/4\) to a positive number. Once positive, the
spike map has value larger than \(1/2\), and the ordinary map has value
larger than \(1\). Since the final map is ordinary, the smallest positive
final value is \(d_L=1/4\). It is attained by one spike followed by two
ordinary sites. Equation (19a) proves the claim. \(\square\)

## 4. The centered chain in the high-rise range

We now assume

\[
Q<U^{271/10},
\qquad
M:=\left\lceil\frac{271}{10}\log _2U\right\rceil,
\qquad
U\geq408126,
\qquad
\frac{U^2}{r}\geq c_0>\frac{23}{10},
\tag{20}
\]

and we assume denominator one. The height-truncation theorem gives

\[
0<E_M<\frac9{100}D.
\tag{21}
\]

The same centered bound holds at every later cut.

**Proposition 3.** For \(M\leq H\leq U+1\), we have

\[
0<|E_H|<\frac9{100}D.
\tag{22}
\]

There is a unique index \(H_*\in[M,U]\) such that

\[
E_H>0\quad(M\leq H\leq H_*),
\qquad
E_H<0\quad(H_*+1\leq H\leq U+1).
\tag{23}
\]

At the transition,

\[
0<\Delta_{H_*}<\frac{18}{100}D<D,
\tag{24}
\]

and

\[
F_{H_*}<4QD<F_{H_*+1}.
\tag{25}
\]

More generally,

\[
\left\lfloor\frac{F_H}{D}\right\rfloor
=
\begin{cases}
4Q-1,&E_H>0,\\[3pt]
4Q,&E_H<0.
\end{cases}
\tag{26}
\]

**Proof.** The late-carry estimate is

\[
C_{\geq H}<
\left(\frac{32}{3\beta}(H+h+1)+16\right)2^{-H}.
\tag{27}
\]

The expression on the right is decreasing in \(H\geq1\). The proof of
the \(9D/100\) bound at \(H=M\) therefore applies unchanged at every
later cut. Equation (15) shows that no \(E_H\) vanishes.

By (10), the sequence \(E_H\) is nonincreasing. It begins positive by
(21), and it ends at \(-p\) by (4). This proves (23). Equations (22) and
(10) give (24). Finally, (11) becomes \(F_H=4QD-E_H\), which proves
(25) and (26). \(\square\)

The suffix sign recurrence gives more information at the first negative
cut. Above height \(H_*+1\), either no spike remains, or the only remaining
spike occurs at \(t=r-1\). Hence

\[
E_{H_*+1}\in
\left\{-2^{N-U},-2^{N-U-2}\right\}.
\tag{28}
\]

Thus the transition is completely explicit. It is nevertheless an ordinary
crossing of the already known multiple \(4QD\), rather than a new
divisibility statement.

## 5. Terminal divisibility and the transition height

Put

\[
H_c:=H_*+1.
\tag{29}
\]

The negative suffix has one further global consequence.

**Proposition 4.** If \(H_c\leq U\), then one of the two divisibilities

\[
\boxed{
3^{r-T_{H_c}}\mid 2^{U+1}(2Q-1)+1,
\qquad
3^{r-T_{H_c}}\mid 2^{U+3}(2Q-1)+1}
\tag{30}
\]

holds. The first case occurs when no suffix spike remains. The second case
occurs when the sole remaining spike is at \(t=r-1\). In either case,
including \(H_c=U+1\), we have

\[
\boxed{
H_c>\frac35U-\frac{271}{25}\log _2U-3.}
\tag{31}
\]

**Proof.** Suppose first that \(H_c\leq U\), and put

\[
T:=T_{H_c},
\qquad
L:=r-T.
\]

If no suffix spike remains, then \(E_{H_c}=-2^{N-U}\). Reducing (11)
modulo \(3^L\), and using \(D\equiv2^N\pmod {3^L}\), gives

\[
3^L\mid 2^{U+1}(2Q-1)+1.
\]

If the sole suffix spike is at \(r-1\), then
\(E_{H_c}=-2^{N-U-2}\), and the same calculation gives the second
divisibility in (30).

Put \(x:=2Q-1\). Since \(x<2U^{271/10}\), either terminal integer in
(30) is smaller than

\[
2^{U+5}U^{271/10}.
\]

It follows that

\[
(\log _2 3)L
<U+5+\frac{271}{10}\log _2U.
\tag{32}
\]

The height can increase only when the mechanical clock increases. Hence

\[
U-H_c
\leq B_{r-1}-B_T
<\frac erL+1.
\tag{33}
\]

We have \(e/r<3/5\) and \(\log _2 3>3/2\). Combining (32) and (33)
gives

\[
U-H_c
<
\frac25
\left(U+5+\frac{271}{10}\log _2U\right)+1,
\]

which is equivalent to (31). If \(H_c=U+1\), equation (31) is
immediate. \(\square\)

Before assuming denominator one, the exact denominator-cleared form of
(30) is

\[
3^{r-T_{H_c}}\mid
D+2^{U+c}(2K-D),
\qquad
c\in\{1,3\}.
\tag{34}
\]

When \(K=QD\), we have \(2K-D=D(2Q-1)\), and \(D\) is a \(3\)-adic
unit. Thus (34) becomes (30). In particular, terminal divisibility is
another projection of the same identity \(F_H+E_H=4K\).

Equation (30) isolates a possible continuation. A uniform estimate of the
form

\[
v_3\!\left(2^nx+1\right)=O((\log U)^A)
\tag{35}
\]

for \(n\in\{U+1,U+3\}\) and \(1\leq x<2U^{271/10}\) would force the
transition into the final polylogarithmic height layers. We do not prove such
an estimate here. The elementary size bound (32) is only linear in \(U\).

### 5.1. The terminal quotient is not a cycle state

It is tempting to divide in (30) and apply leastness to the quotient. This
does not work. We record its exact dynamic meaning.

Suppose first that no suffix spike remains, and put

\[
y:=\frac{2^{U+1}x+1}{3^L},
\qquad
x:=2Q-1,
\qquad
L:=r-T_{H_c}.
\tag{35a}
\]

In the normalized integer coordinate \(Z:=(X+1)/2\), the cut state and
the suffix states are

\[
Z_{T_{H_c}}=2^{L-1}y,
\qquad
Z_{T_{H_c}+j}=2^{L-1-j}3^jy
\quad(0\leq j\leq L-1).
\tag{35b}
\]

Thus \(y\) is the cut state after the forced factor \(2^{L-1}\) has been
removed. It is not one of the cycle states. Leastness gives only

\[
2^{L-1}y=Z_{T_{H_c}}\geq Q.
\tag{35c}
\]

If the sole suffix spike occurs at \(r-1\), define instead

\[
y:=\frac{2^{U+3}x+1}{3^L}.
\tag{35d}
\]

Then

\[
Z_{T_{H_c}}=2^{L-2}y,
\qquad
Z_{r-2}=3^{L-2}y,
\qquad
Z_{r-1}=\frac{3^{L-1}y+1}{4}.
\tag{35e}
\]

Again, \(y\) is a stripped common factor, not a cycle state. In particular,
leastness gives \(2^{L-2}y\geq Q\), rather than \(y\geq Q\).

The quotient can be smaller than \(x\). In the no-spike case,

\[
y<x
\quad\Longleftrightarrow\quad
3^L>2^{U+1}+\frac1x,
\tag{35f}
\]

with the exponent \(U+1\) replaced by \(U+3\) in the last-spike case.
The mechanical phase relation is

\[
B_{r-1}-B_{T_{H_c}}
=U-H_c+w,
\qquad
w\in\{0,1\},
\tag{35g}
\]

where \(w\) is the number of remaining spikes. This relation does not
by itself force either side of (35f), and the bounds proved here do not
decide that inequality.

There is also no automatic coalescence. For example,

\[
3^3\cdot7=2^2\cdot47+1.
\]

The corresponding exact suffix in odd coordinates is

\[
55\longmapsto83\longmapsto125\longmapsto47.
\]

Every displayed suffix state is at least \(47\), but the stripped quotient
is \(y=7<47\), and the associated odd integer \(2y-1=13\) follows
\(13\mapsto5\mapsto1\), rather than coalescing with \(47\). Similarly,

\[
3^4\cdot1=2^4\cdot5+1
\]

gives a valid last-spike suffix

\[
7\longmapsto11\longmapsto17\longmapsto13\longmapsto5,
\]

while the stripped quotient is \(y=1\). These are local suffix examples,
not cycle countermodels. They prove that a descent argument cannot treat
\(y\) as an actual smaller cycle state without an additional global
construction.

## 6. An exponentially small positive residue

Define

\[
H_1:=
\left\lfloor
\frac35U-\frac{271}{25}\log _2U-3
\right\rfloor.
\tag{36}
\]

For \(U\geq408126\), we have \(M\leq H_1<H_c\). Indeed, this follows
at the left endpoint from \(\log _2U<19\), and the difference between
the two sides is increasing. Therefore, \(E_{H_1}>0\).

**Corollary 5.** We have

\[
\boxed{
0<\frac{E_{H_1}}D
<66096\,U^{961/25}2^{-3U/5}.}
\tag{37}
\]

**Proof.** Equations (27), (31), and (36), together with
\(\beta>3/2\), give

\[
C_{\geq H_1}<9U2^{-H_1}
<144U^{296/25}2^{-3U/5}.
\tag{38}
\]

Since \(E_{H_1}>0\), we have \(E_{H_1}<3^rC_{\geq H_1}\). The available
Diophantine estimate gives

\[
\frac1{R-1}<459r^{133/10}.
\tag{39}
\]

We divide (38) by \(R-1\), and use \(r<10U^2/23<U^2\). Since

\[
\frac{133}{5}+\frac{296}{25}=\frac{961}{25},
\]

we obtain (37). \(\square\)

Thus the multicut chain contains a positive residue which is exponentially
small in \(U\), relative to \(D\). This is substantially stronger than the
original polynomial saving. It still does not give an absolute contradiction,
since \(D\) can have exponential size in \(r\), with \(r\) as large as a
constant multiple of \(U^2\).

Lemma 2.1 and Corollary 5 combine to give

\[
2^{N-U-3}
\leq E_{H_1}
<66096\,D\,U^{961/25}2^{-3U/5}.
\tag{39a}
\]

This sharp absolute floor still leaves exponential room. Indeed,
\(D/2^{N-U}\) can have order \(2^U\) up to the Diophantine gap factor, while
the cut in (36) saves only about \(2^{3U/5}\).

## 7. Why the multicut family does not close the gate

At first sight, (25) appears stronger than one centered residue: two
explicit prefix integers lie on opposite sides of a multiple of \(D\),
and their difference is smaller than \(D\). But (11) identifies that
multiple in advance. Namely,

\[
F_{H_*}+E_{H_*}
=F_{H_*+1}+E_{H_*+1}
=4QD.
\tag{40}
\]

The jump \(\Delta_{H_*}\) moves a known quantity from one side of its own
decomposition to the other. Neither endpoint is asserted to be a multiple
of \(D\).

The same issue persists for arbitrarily many cuts. By (14), every new
residue is obtained by subtracting an explicitly known layer carry from
the preceding residue. All equations have the same invariant sum \(4K\).
Therefore, the multicut system has one global congruence class, not two.

A successful continuation would need an absolute restriction on the
positive integer \(E_{H_1}\), or an orbit-specific restriction on its
odd quotient after the exact power of \(2\) in (16) is removed. Merely
adding more heights cannot provide such a restriction.

## 8. Exact audit

The checker
[one_drop_multicut_centered_residue_certificate.js](cycles/one_drop_multicut_centered_residue_certificate.js)
uses integer arithmetic throughout. Through \(r=28\), it audits all
\(187288\) nontrivial one-drop profiles, \(1570509\) cuts, and \(1383221\)
adjacent cut pairs. It verifies (10), (11), the denominator-one
equivalence (12), every defect valuation in (15) to (17), and every
nonempty-layer valuation in (18). It verifies the positive defect floor
(19c), including sharp equality cases. It also verifies the unique sign
transition, the two negative suffix values in (28), and the
denominator-cleared terminal divisibility (34). Two exact dynamic witnesses
verify the state interpretations in Section 5.1. The output includes

\[
\texttt{transportChecks=1383221},
\qquad
\texttt{invariantChecks=1570509},
\qquad
\texttt{terminalDivisibilityShadowChecks=186868},
\qquad
\texttt{positiveDefectFloorChecks=1102302},
\qquad
\texttt{sharpPositiveDefectFloors=3},
\qquad
\texttt{terminalQuotientDynamicWitnesses=2},
\qquad
\texttt{status=PASS}.
\]

There is no nontrivial denominator-one profile in this finite range.
The audit therefore verifies the unconditional transport identities on
rational profiles, while Propositions 3 to 4 and Corollary 5 use the
proved unbounded denominator-one consequences.

The frozen SHA-256 digest of the certificate source is

\[
\texttt{22f66e1cb3008dd9d8560ef2db2d110aa08573c0aac73c66623d7d118562ce14}.
\]

## Conclusion

Varying the height cut produces a monotone family with exact arithmetic
structure. In the remaining high-rise candidate, the family starts with
a small positive centered residue, crosses zero exactly once, and ends at
the power of two \(-2^{N-U}\). Terminal divisibility places this crossing
above height \(3U/5-O(\log U)\), which yields the exponentially small
positive residue (37).

This does not close the denominator-one gate. Every cut decomposes the
same integer \(4K\), and the layer recurrences telescope exactly. Thus the
multicut strategy proves alternative (c): the entire family reduces to the
one original \(D\)-class. Any further global argument must use special
information about the integer orbit represented by that class, rather than
another height cut.
