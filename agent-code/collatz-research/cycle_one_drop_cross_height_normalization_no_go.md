# Cross-height normalization does not improve factor capacity

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** Comparing equal mechanical factors at different one-drop
heights does not retain the simultaneous dyadic and ternary separation
used by the equal-height factor argument. More precisely, if the height
difference is \(d>0\), then bare normalization makes the start and
endpoint defects odd, while the endpoint has ternary valuation only

\[
v_3(2^d-1)=
\begin{cases}
0,&d\text{ odd},\\[3pt]
1+v_3(d),&d\text{ even},
\end{cases}
\tag{1}
\]

provided this quantity is smaller than the factor length. The unique
affine correction which restores the full powers \(2^E\) and \(3^L\)
reduces both of them to the same displacement integer. Consequently,
all corrected occurrence vectors are collinear, and the corresponding
Vandermonde determinants vanish.

We also construct, for every rational mechanical factor, two integral
exact cylinders at heights \(0\) and \(E\) whose normalized starts and
endpoints lie in one fixed-multiplicative-width interval. Thus the loss
is sharp for the local data. Finally, the phase-adjusted normalization
turns the orbit into an additive carry ledger whose differences are
independent of the initial state. It therefore cannot distinguish
denominator one from a rational pseudo-cycle.

This is a no-go theorem for the proposed cross-height packing argument.
It does not rule out a theorem using the global placement of the
occurrences together with the full denominator-one congruence.

## 1. The exact factor map

Let

\[
w=(a_0,\ldots,a_{L-1}),
\qquad
A_i:=\sum_{j<i}a_j,
\qquad
E:=A_L,
\tag{2}
\]

and define the carry

\[
c:=c(w):=
\sum_{i=0}^{L-1}3^{L-1-i}2^{A_i}.
\tag{3}
\]

Every odd integer \(y\) which realizes \(w\) has an odd endpoint \(y'\)
satisfying

\[
2^Ey'=3^Ly+c.
\tag{4}
\]

Put \(M:=2^{E+1}\). The exact cylinder is the unique odd residue class

\[
q_w\equiv(2^E-c)3^{-L}\pmod M.
\tag{5}
\]

Indeed, equation (5) is equivalent to

\[
3^Ly+c\equiv2^E\pmod {2^{E+1}},
\]

which says precisely that the endpoint in (4) is odd. Thus, if \(y,z\)
are two realizations of \(w\), then

\[
z-y=k2^{E+1},
\qquad
z'-y'=2k3^L
\tag{6}
\]

for some integer \(k\). This is the ordinary equal-factor separation.

## 2. Bare height normalization loses both depths

Suppose that the occurrence beginning at \(y\) has constant height \(m\),
while the occurrence beginning at \(z\) has constant height
\(n=m+d\), where \(d\geq1\). Define the cross-height defects

\[
H:=z-2^dy,
\qquad
H':=z'-2^dy'.
\tag{7}
\]

Both \(H\) and \(H'\) are odd. Subtracting \(2^d\) times equation (4)
for \(y\) from the same equation for \(z\) gives

\[
\boxed{
2^EH'=3^LH+(1-2^d)c.}
\tag{8}
\]

The carry \(c\) is a 3-adic unit. Indeed, the last summand in (3) is
\(2^{A_{L-1}}\), while every earlier summand is divisible by three.
It follows from (8) that, whenever \(v_3(2^d-1)<L\),

\[
\boxed{v_3(H')=v_3(2^d-1).}
\tag{9}
\]

The value on the right is exactly (1). For odd \(d\), this follows by
reduction modulo three. For even \(d\), the lifting-the-exponent lemma
gives

\[
v_3(2^d-1)=v_3(4^{d/2}-1)=1+v_3(d).
\tag{10}
\]

The exceptional condition \(v_3(2^d-1)\geq L\) forces

\[
2\cdot3^{L-1}\mid d,
\tag{11}
\]

because \(2\) has order \(2\cdot3^{L-1}\) modulo \(3^L\). In particular,
(9) applies throughout the factor-capacity scale, where \(d\leq U\) and
\(L\asymp U\).

Put

\[
u_y:=\frac{y}{2^m},
\qquad
u_z:=\frac{z}{2^n},
\]

and define \(u_y',u_z'\) in the same way. Equation (7) gives

\[
u_z-u_y=\frac{H}{2^n},
\qquad
u_z'-u_y'=\frac{H'}{2^n}.
\tag{12}
\]

Both fractions in (12) are reduced at the prime two. Thus the normalized
start separation is only the ordinary mesh \(2^{-n}\). At the endpoint,
the full factor separation \(2\cdot3^L\) has been replaced by the
logarithmic valuation in (9). There is no simultaneous \(2^E\) by
\(3^L\) separation left to multiply.

For example, the mechanical factor (w=12) has

\[
\((L,E,c,M,q_w)=(2,3,5,16,11)\).
\]

The two exact starts (y=11) and (z=43), placed at heights zero and
two, have endpoints (y'=13) and (z'=49). Hence

\[
z-4y=-1,
\qquad
z'-4y'=-3.
\tag{13}
\]

The normalized start difference is the smallest possible dyadic mesh,
and the endpoint retains one factor of three rather than \(3^2\).

## 3. The affine correction is rank one

There is one natural way to remove the inhomogeneous term in (8). Put

\[
\Delta:=2^E-3^L,
\qquad
\Phi_w(t):=\Delta t-c.
\tag{14}
\]

Since no positive powers of two and three agree, \(\Delta\neq0\).
Equation (4) gives the two exact identities

\[
\Phi_w(y)=2^E(y-y'),
\qquad
\Phi_w(y')=3^L(y-y').
\tag{15}
\]

Consequently,

\[
\begin{aligned}
\Phi_w(z)-2^d\Phi_w(y)&=2^EG,\\
\Phi_w(z')-2^d\Phi_w(y')&=3^LG,
\end{aligned}
\qquad
G:=(z-z')-2^d(y-y').
\tag{16}
\]

The integer \(G\) is even. Thus (16) formally restores both the dyadic
and ternary factors, but they multiply the same integer. If \(G\neq0\),
the resulting lower bounds are only the statement \(|G|\geq2\). If
\(G=0\), there is no separation at all.

This collapse persists for arbitrarily many occurrences. For every exact
start \(y_i\),

\[
\Phi_w(y_i')=\frac{3^L}{2^E}\Phi_w(y_i).
\tag{17}
\]

Therefore, all vectors

\[
\((\Phi_w(y_i),\Phi_w(y_i'))\)
\]

lie on one line. Every \(2\) by \(2\) determinant made from two such
vectors is zero.

There is an equivalent normalized statement. Let the occurrence \(i\)
have height \(m_i\), and put

\[
u_i:=2^{-m_i}y_i,
\qquad
s_i:=2^{-m_i},
\qquad
\lambda:=\frac{3^L}{2^E},
\qquad
\mu:=\frac{c}{2^E}.
\tag{18}
\]

Then

\[
u_i'=\lambda u_i+\mu s_i.
\tag{19}
\]

Thus the columns (u,u',s) have rank at most two. For three
occurrences, one also has the exact determinant reduction

\[
\boxed{
\det(1,u,u')=\mu\det(1,u,s).}
\tag{20}
\]

The homogeneous multiplier \(3^L\) disappears from (20). More generally,
after repeatedly applying the same factor at constant height, every
iterate column belongs to the span of \(u\) and \(s\). Hence every
three-column Vandermonde-type determinant vanishes. The affine correction
does not provide an independent lattice direction.

### 3.1. Arbitrary collections and products

The obstruction is not limited to a pair or a triple. Let

\[
\mathcal I:=\{1,\ldots,k\}
\]

index any collection of occurrences of \(w\). The \(k\) by \(3\) matrix
with columns \(u,u',s\) has rank at most two by (19). If we record any
number of successive applications of the same factor, every new column
still lies in the span of \(u\) and \(s\). Thus every minor of order at
least three is zero, for every \(k\).

The nonzero \(2\) by \(2\) minors also collapse exactly. For every
\(i,j\in\mathcal I\), equation (19) gives

\[
\boxed{
u_i u_j'-u_j u_i'
=\mu(u_i s_j-u_j s_i).}
\tag{20a}
\]

Consequently, for any finite set of pairs \(\mathcal E\),

\[
\prod_{(i,j)\in\mathcal E}
(u_i u_j'-u_j u_i')
=\mu^{|\mathcal E|}
\prod_{(i,j)\in\mathcal E}
(u_i s_j-u_j s_i).
\tag{20b}
\]

The factor \(3^L\) cancels from every member of the product. The right
side is only a dyadic height determinant multiplied by the local carry.

The fixed-point correction gives an even sharper collapse. For any set
of oriented pairs, put

\[
G_{ij}:=(y_j-y_j')-2^{m_j-m_i}(y_i-y_i').
\]

Equations (16) give

\[
\begin{aligned}
\prod_{(i,j)\in\mathcal E}
\bigl(\Phi_w(y_j)-2^{m_j-m_i}\Phi_w(y_i)\bigr)
&=2^{E|\mathcal E|}\prod_{(i,j)\in\mathcal E}G_{ij},\\
\prod_{(i,j)\in\mathcal E}
\bigl(\Phi_w(y_j')-2^{m_j-m_i}\Phi_w(y_i')\bigr)
&=3^{L|\mathcal E|}\prod_{(i,j)\in\mathcal E}G_{ij}.
\end{aligned}
\tag{20c}
\]

Both products contain the same unknown integer product. It may vanish,
and when it does not, its only automatic lower bound comes from the
parity of the \(G_{ij}\). There is no independent product divisor.

Finally, bare normalization behaves in the same way. If every positive
height difference \(d_{ij}:=m_j-m_i\) satisfies
\(v_3(2^{d_{ij}}-1)<L\), put
\(H_{ij}':=y_j'-2^{d_{ij}}y_i'\). Then (9) gives

\[
v_2\left(\prod_{(i,j)\in\mathcal E}H_{ij}'\right)=0,
\qquad
v_3\left(\prod_{(i,j)\in\mathcal E}H_{ij}'\right)
=\sum_{(i,j)\in\mathcal E}v_3(2^{d_{ij}}-1).
\tag{20d}
\]

When all heights lie between zero and \(U\), the last sum is at most

\[
|\mathcal E|\bigl(1+\lfloor\log _3U\rfloor\bigr).
\tag{20e}
\]

Thus taking a product over many repetitions multiplies the logarithmic
loss. It does not recover one factor \(3^L\) per comparison.

## 4. An arbitrary-length integral shadow

We now show that the preceding losses are sharp for the local hypotheses.
Suppose that \(w\) is a length-\(L\) factor of the cyclic rational
mechanical word of slope

\[
\beta:=\frac Nr,
\qquad
N:=\lceil r\log _2 3\rceil,
\qquad
1\leq L\leq r.
\tag{21}
\]

Every suffix of \(w\) of length \(k\) has exponent sum equal to either
\(\lfloor\beta k\rfloor\) or \(\lceil\beta k\rceil\). If

\[
\alpha:=\log _2 3,
\]

then \(\beta>\alpha\), and equations (2) and (3) give

\[
\frac14<\lambda<2,
\qquad
0<\mu<\frac{2L}{3}.
\tag{22}
\]

For the second inequality, write \(S_k\) for the exponent sum of the
length-\(k\) suffix. Then

\[
\mu
=\sum_{k=1}^{L}\frac{3^{k-1}}{2^{S_k}},
\]

and \(S_k>\beta k-1>\alpha k-1\), so each summand is smaller than
\(2/3\). The first inequality in (22) follows in the same way from

\[
\alpha L-1<E<\alpha L+2.
\]

Choose an exact cylinder start

\[
y=q_w+KM
\]

so large that \(y\geq24(L+1)\). Let \(z\) be the element of the same
residue class \(q_w+M\mathbf Z\) nearest to \(2^Ey\). Since the lattice
spacing is \(M=2^{E+1}\),

\[
\left|\frac{z}{2^E}-y\right|\leq1.
\tag{23}
\]

Both \(y\) and \(z\) are odd integral starts realizing exactly \(w\).
Their endpoints satisfy

\[
\left|\frac{z'}{2^E}-y'\right|
\leq\lambda+\mu
<2+\frac{2L}{3}.
\tag{24}
\]

Equations (22) through (24) imply

\[
\boxed{
\frac y6
<y,\frac{z}{2^E},y',\frac{z'}{2^E}
<3y.}
\tag{25}
\]

We may therefore place the first cylinder at height zero and the second
at height \(E\). For mechanical factors of arbitrary length, all four
normalized integral states remain in an interval of fixed multiplicative
width. In particular, neither their starts nor their endpoints have a
separation which grows exponentially with \(L\).

The construction in this section consists of two exact local cylinders.
It does not assert that they occur in one closed Collatz orbit. Its role
is precise: integrality, the mechanical factor, the height gap, and a
common normalized state envelope do not imply a stronger separation.
Any improvement must use how the occurrences are placed in the complete
cycle.

## 5. Phase adjustment is denominator-blind

We finally incorporate the rational mechanical phase. Let

\[
B_j:=\left\lfloor\frac{jN}{r}\right\rfloor,
\qquad
A_j:=B_j-m_j,
\qquad
\omega_j:=\frac{2^{B_j}}{3^j}.
\tag{26}
\]

For a full orbit, define

\[
v_j:=\omega_j\frac{x_j}{2^{m_j}}
=\frac{2^{A_j}x_j}{3^j}.
\tag{27}
\]

The accelerated recurrence gives

\[
\boxed{
v_{j+1}=v_j+\frac{2^{A_j}}{3^{j+1}},}
\tag{28}
\]

and hence

\[
v_j=x_0+\sum_{i=0}^{j-1}\frac{2^{A_i}}{3^{i+1}}.
\tag{29}
\]

In particular, for \(s<t\),

\[
v_t-v_s
=\sum_{i=s}^{t-1}\frac{2^{A_i}}{3^{i+1}}.
\tag{30}
\]

The right side of (30) depends only on the word. It is unchanged if the
positive rational fixed point has denominator greater than one. Every
Vandermonde product made from the \(v_j\) is translation-invariant, so it
also depends only on the word and cannot detect whether \(x_0\) is an
integer.

At the full period, equation (29) gives

\[
x_0\left(\frac{2^N}{3^r}-1\right)
=\sum_{i=0}^{r-1}\frac{2^{A_i}}{3^{i+1}}.
\tag{31}
\]

This is exactly the full carry identity. Thus the phase-adjusted packing
does not add a second global equation. It repackages the identity already
used to obtain the occupation bound.

## 6. Near factors

The same obstruction appears before exact equality. Suppose that \(w\)
and \(\widetilde w\) have the same length \(L\) and exponent sum \(E\),
with carries \(c\) and \(\widetilde c\). A cross-height comparison gives

\[
2^EH'=3^LH+\widetilde c-2^dc.
\tag{32}
\]

There is no uniform ternary depth in the final term. For the two
mechanical factors \(12\) and \(21\), the carries are \(5\) and \(7\).
At \(d=2\), the carry defect equals

\[
7-4\cdot5=-13,
\]

which is a 3-adic unit. Thus passing from equal to near-equal factors
does not repair (9). It merely replaces the explicit unit
\((1-2^d)c\) by another local carry defect.

## 7. Exact audit

The checker
[one_drop_cross_height_normalization_certificate.js](cycles/one_drop_cross_height_normalization_certificate.js)
uses exact integer arithmetic. It exhausts every rational mechanical
factor through \(r=24\) and verifies:

- the exact cylinder residue (5) and endpoint spacing (6);
- the odd normalized defects and the cross-height identity (8);
- the valuation formula (9) whenever its stated hypothesis holds;
- the affine correction (15), the common quotient (16), and the
  determinant reduction (20), including the arbitrary-product identity
  (20b);
- the mechanical estimates (22) and the integral shadow (23) through
  (25);
- the explicit factors \(12\) and \(21\).

It returns \(\texttt{status=PASS}\).

## Conclusion

Equal factors at one height have a powerful simultaneous separation:
their starts differ by \(2^{E+1}\), and their endpoints differ by
\(2\cdot3^L\). Across different heights, division by \(2^m\) changes the
relevant difference from \(z-y\) to \(z-2^dy\). This new difference is
odd. Its endpoint retains only the valuation of \(2^d-1\), which is
logarithmic in the height gap.

The affine fixed-point correction and the mechanical phase correction
do not recover the loss. The first produces a rank-one identity, while
the second produces the denominator-blind carry ledger. Therefore this
cross-height normalization does not improve the high-rise constant
\(c_0=2.3153852110\ldots\).

A viable cross-height theorem would need an additional global input which
is absent here, such as a restriction on the joint placement of the
cylinder lifts imposed by \(D\mid C\). Merely normalizing states and
forming determinants does not supply that input.
