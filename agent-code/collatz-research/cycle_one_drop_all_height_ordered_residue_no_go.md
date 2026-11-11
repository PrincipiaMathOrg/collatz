# All-height ordered residues freeze to one lift

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** The nonlinear least-representative data at all one-drop heights
do not supply \(U\) ordered constraints. Under the failed polynomial gate
\[
Q<U^{271/10},
\]
the nested dyadic representatives become equal to \(Q\) after
\(O(\log U)\) prefix exponent, and hence are constant at every remaining
height. The reverse ternary representatives are likewise constant on the
long overlap. Thus the all-height ordered system reduces to one possible
late dyadic lift and the original return equality.

This is genuinely denominator-one-sensitive: denominator one identifies
the canonical cylinder representative with the integer least state.
Rational strict-least shadows fail exactly this identification through
their odd denominator multiplier. The result is a sharp no-go for
obtaining \(Q\geq U^{271/10}\) by multiplying or packing ordered
representatives across all levels.

## 1. Nested prefix cylinders

Use the integral half-state coordinate
\[
Z:=\frac{X+1}{2}.
\tag{1}
\]
Along the internal one-drop word, the two maps are
\[
O(Z):=\frac{3Z}{2},
\qquad
S(Z):=\frac{3Z+1}{4}.
\tag{2}
\]
For a prefix of length \(t\), let \(V_t\) be its number of \(S\)-branches
and put
\[
L_t:=t+V_t.
\tag{3}
\]
The exact domain of that prefix is one residue class modulo \(2^{L_t}\).
Let
\[
\bar q_t\in[0,2^{L_t})
\tag{4}
\]
be its least nonnegative representative. We use the nonnegative convention
only to avoid treating the zero class as \(2^{L_t}\).

The prefix domains are nested. Therefore,
\[
\bar q_{t+1}\equiv\bar q_t\pmod {2^{L_t}},
\tag{5}
\]
and there is a unique digit
\[
\varepsilon_t\in
\{0,\ldots,2^{L_{t+1}-L_t}-1\}
\tag{6}
\]
such that
\[
\boxed{
\bar q_{t+1}
=\bar q_t+\varepsilon_t2^{L_t}.}
\tag{7}
\]
In particular, the ordered representative chain is nondecreasing.

More strongly, if \(s<t\), then
\[
\boxed{
\bar q_s
=\bar q_t\bmod 2^{L_s},}
\tag{8}
\]
where the residue is taken in \([0,2^{L_s})\). Thus the entire chain is
only the successive binary truncation of its final member. It is not a
collection of independent residues.

## 2. Denominator one and stabilization

Let \(Q\) be the least half-state of a denominator-one one-drop cycle.
Since \(Q\) realizes the full internal branch word, it belongs to every
prefix cylinder:
\[
Q\equiv\bar q_t\pmod {2^{L_t}}.
\tag{9}
\]

Put
\[
M:=\left\lceil\frac{271}{10}\log_2U\right\rceil.
\tag{10}
\]
If the critical polynomial gate fails, then
\[
0<Q<U^{271/10}\leq2^M.
\tag{11}
\]
Consequently, whenever \(L_t\geq M\),
\[
\boxed{\bar q_t=Q.}
\tag{12}
\]
Since \(L_t\geq t\), this holds for every \(t\geq M\).

Now let \(T_H\) be the first time at which omission height \(H\) is
reached. Height rises by at most one per branch, so
\[
T_H\geq H.
\tag{13}
\]
Equations (12) and (13) give the all-height collapse
\[
\boxed{
\bar q_{T_H}=Q
\qquad(M\leq H\leq U).}
\tag{14}
\]

Thus at least \(U-M+1\) of the proposed height representatives are
literally the same integer. An ordered product of consecutive gaps contains
zeros, and a packing argument has only the first \(M=O(\log U)\) nonconstant
levels available.

## 3. The polynomial target is one late-lift assertion

Equation (7) identifies the exact remaining possibility. Suppose that
\[
\varepsilon_t>0
\quad\text{for some }t\text{ with }\quad
L_t\geq M.
\tag{15}
\]
The final internal representative is at least
\[
\bar q_{r-1}\geq2^{L_t}\geq2^M\geq U^{271/10}.
\tag{16}
\]
In the denominator-one period range, the final internal modulus is much
larger than the established polynomial state bound, so
\[
\bar q_{r-1}=Q.
\tag{17}
\]
Hence (15) would prove the desired polynomial lower bound.

Conversely, a failed gate forces every digit in (15) to vanish. Therefore,
the all-height ordered-residue program is exactly the following single
statement:
\[
\boxed{\text{denominator-one closure forces one nonzero lift after }M.}
\tag{18}
\]
It is not strengthened by recording the same zero lift at each of the
remaining \(U-M\) heights.

The terminal branch makes this reduction especially transparent. The
internal modulus is
\[
2^{r-1+V}=2^{N-U-2}.
\tag{19}
\]
The final large branch enlarges the full cylinder by \(U+2\) binary
digits. If its lift is nonzero, the representative is already exponentially
larger than the target in (16). The hard branch is the zero final lift.
Under denominator one, zero final lift is exactly the canonical return
equation, not an additional inequality.

## 4. Full rotations add only leastness

There is another possible all-height ordering: use the canonical full-word
representative \(\rho_i\) of the cyclic rotation beginning at a height
boundary. Let \(C_i\) be the corresponding full carry, put
\[
D:=2^N-3^r,
\qquad
g:=\gcd(D,C_i),
\qquad
n_i:=\frac{C_i}{g},
\qquad
q:=\frac Dg.
\tag{20}
\]
The denominator multiplier identity is
\[
\boxed{
n_i\equiv q\rho_i\pmod {2^{N+1}}.}
\tag{21}
\]

When \(q=1\), the state envelope and the period barrier put every cycle
state below \(2^{N+1}\). Hence
\[
\rho_i=x_i.
\tag{22}
\]
The ordered assertion
\[
\rho_i>\rho_0\qquad(i\neq0)
\tag{23}
\]
is then exactly strict leastness of the original cycle. The full-rotation
representatives do not give a new order theorem beside the dynamical one
we started with.

For \(q>1\), multiplication by the odd unit \(q\) modulo \(2^{N+1}\)
does not preserve ordinary order. Thus strict order of the rational states
\(n_i/q\) says nothing comparable about the order of the \(\rho_i\).
This is precisely where denominator one enters, and it cannot be replaced
by a denominator-blind packing inequality.

## 5. The reverse representatives freeze as well

Put
\[
x:=2Q-1.
\tag{24}
\]
At a suffix cut \(t\), the terminal word determines a residue class for
\(x\) modulo \(3^{r-t}\). Let \(R_t\) be its least nonnegative
representative. Whenever
\[
3^{r-t}>x,
\tag{25}
\]
we have
\[
R_t=x.
\tag{26}
\]

Under (11), condition (25) holds away from the final \(O(\log U)\)
branches. Thus the forward dyadic representatives and backward ternary
representatives are both constant on an interval of length
\[
r-O(\log U).
\tag{27}
\]
At two cuts in this overlap, the forward and backward middle-state defects
have the exact form
\[
\Delta_s=2^{L_t-L_s}j,
\qquad
\Delta_t=3^{t-s}j
\tag{28}
\]
for one integer \(j\). The condition \(j=0\) is the original full return.
Passing to least representatives does not alter (28): both residue chains
already equal their small integer representatives throughout the overlap.

Therefore simultaneous binary and ternary ordering does not create a
second nonzero gap. It freezes both sides of the same mixed-radix collision.

## 6. Rational-shadow audit

The smallest transparent shadow is the primitive word
\[
(1,3).
\tag{29}
\]
It has
\[
D=2^4-3^2=7,
\qquad
C=5,
\qquad
(x_0,x_1)=\left(\frac57,\frac{11}7\right).
\tag{30}
\]
The rational orbit is positive and strict least. Its canonical odd
cylinder representative modulo \(2^{N+1}=32\) is
\[
\rho_0=19.
\tag{31}
\]
Indeed,
\[
5\equiv7\cdot19\pmod {32},
\tag{32}
\]
as required by (21). The least rational state is \(5/7\), while the
ordered cylinder representative is \(19\). State order has been scrambled
by the denominator multiplier.

The infinite anchored square-root-rise rational one-drop family is a
stronger test. It has unbounded \(U\), fixed Beatty phase, exact bottom
closure, strict leastness, and
\[
1<Q<2.
\tag{33}
\]
After clearing its common odd denominator, every numerator recurrence and
every height-block order remains exact. Its prefix representatives cannot
stabilize at the nonintegral number \(Q\). The only missing hypothesis in
(12) is denominator one.

These shadows show both sides of the obstruction. Order and leastness do
not control the final representative when \(q>1\). When \(q=1\), they
identify that representative with \(Q\), but then the all-height chain
freezes and contributes no further gaps.

## 7. Consequence

The nonlinear all-height order data are sharper than the linear block
matrix, but they still do not prove
\[
Q\geq U^{271/10}.
\tag{34}
\]
They reduce (34) to one late-lift or no-wrap theorem, namely (18). This is
the canonical cylinder gate in a different form.

A successful continuation must force a nonzero lift after exponent
\((271/10)\log_2U\), or prove that the zero-lift branch has nonzero signed
terminal defect. Counting all height levels, multiplying their ordered
gaps, or combining their least representatives cannot do this, because
those representatives are equal on all but \(O(\log U)\) levels in the
only case that needs exclusion.

## 8. Exact audit

The checker
[one_drop_all_height_ordered_residue_certificate.js](cycles/one_drop_all_height_ordered_residue_certificate.js)
uses integer arithmetic. It exhausts all \(8190\) half-state \(O/S\) words
of length at most twelve and verifies \(90114\) nested-residue and lift-digit
identities, together with \(13091\) instances of exact stabilization once
the modulus exceeds the final representative.

It also audits every odd-coordinate exponent word of length at most six
with positive \(D\). For \(970\) words it verifies binary truncation of the
full cylinder representative and the denominator multiplier (21). Finally,
it verifies the rational shadow
\[
\frac57\longmapsto\frac{11}7\longmapsto\frac57,
\qquad
\rho_0=19,
\]
and returns \(\texttt{status=PASS}\). These finite checks audit the formulas;
the nesting and stabilization proofs are all-depth.

The frozen SHA-256 digest of the certificate source is
\[
\texttt{ab94b5b11da87db4ff2d5e10f955937217dd81787e5ed946676db0cc0d9dd7b0}.
\]

## Conclusion

Across all \(U\) height levels, the least-representative chain is not a
large ordered configuration. It is the binary digit expansion of one
integer, and under the failed polynomial gate it becomes the constant
sequence \(Q\) after \(O(\log U)\) digits. The reverse ternary chain freezes
to \(2Q-1\) on the same long middle interval. Denominator one is used
exactly in making these representatives actual states; rational shadows
show that no weaker order hypothesis suffices.

The remaining problem is one global late-lift or signed-return assertion.
All-height ordered-residue packing does not provide it.
