# The critical polynomial gate for the one-drop quotient

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** We sharpen the transition theorem in two ways. The exact
mechanical exponent of a repeated factor replaces the crude factor length,
and the full-cycle carry identity replaces the state envelope
\(612r^{15}\) by \(4x\). For the one-drop path this gives

\[
Q<6200(\log _2r)r^{133/10}.
\]

Consequently, the all-depth lower bound

\[
Q\geq U^{271/10}
\]

would exclude the complete one-drop cycle sector. Any exponent strictly
larger than \(133/5=26.6\) is asymptotically sufficient. We do not prove
this lower bound. We reduce its failure to one long mixed-radix collision,
and construct a rational counterfamily at the same square-root-rise scale
which shows that Beatty renewal and strict leastness cannot prove it
without denominator one.

## 1. The exact mechanical exponent in a repeated factor

Put

\[
\alpha:=\log _2 3,
\qquad
N:=\lceil\alpha r\rceil,
\qquad
\beta:=\frac Nr.
\tag{1}
\]

We retain the mechanical prefixes and deformation heights

\[
B_j:=\left\lfloor\frac{jN}{r}\right\rfloor,
\qquad
A_j:=B_j-m_j.
\tag{2}
\]

Consider a constant-height run with \(u\) internal edges. For \(u\geq2\),
put

\[
L:=\left\lfloor\frac{u-1}{2}\right\rfloor.
\tag{3}
\]

The \(L+2\) length-\(L\) factors beginning at the first \(L+2\) offsets
remain in the run. The rational mechanical word has factor complexity at
most \(L+1\), so two of these factors agree. If the common factor begins
at \(a\), its exact exponent sum is

\[
E=B_{a+L}-B_a.
\tag{4}
\]

The elementary floor inequality gives

\[
\boxed{E+1>L\beta.}
\tag{5}
\]

This is stronger than the previously used inequality \(E\geq L\). If all
states at height \(m\) are smaller than \(2^mH\), the odd-cylinder spacing
of the two distinct integer states gives

\[
2^{E+1}<2^mH.
\tag{6}
\]

Combining (5) and (6), we obtain the refined run inequality

\[
\boxed{\beta L<m+\log _2H.}
\tag{7}
\]

We record the general transition consequence. Suppose that \(T\) transition
edges cut the cycle into \(T+1\) constant-height runs with internal lengths
\(u_0,\ldots,u_T\). Put \(L_j=0\) for \(u_j=0,1\), and use (3) otherwise.
Then

\[
2\sum_{j=0}^{T}L_j
\geq\sum_{j=0}^{T}(u_j-2)
=r-3T-2.
\tag{8}
\]

If the run heights are \(\lambda_j\), positivity gives

\[
\sum_{j=0}^{T}\lambda_j\leq\frac{T(T-1)}2.
\tag{9}
\]

Multiplying (7) over the runs therefore proves

\[
\boxed{
\beta(r-3T-2)
<T(T-1)+2(T+1)\log _2H.}
\tag{10}
\]

For the one-drop height path, the levels are \(0,1,\ldots,U\), each in one
contiguous block, followed by one terminal drop. Thus \(T=U+1\), and (10)
becomes

\[
\boxed{
\beta(r-3U-5)
<U(U+1)+2(U+2)\log _2H.}
\tag{11}
\]

In particular, its leading term is

\[
U^2\geq(\log _2 3)r-O(U\log r),
\tag{12}
\]

rather than \(U^2\geq r-O(U\log r)\).

## 2. The cycle-specific state envelope

Let \(x=x_0\) be the least odd cycle state and let

\[
R:=\frac{2^N}{3^r}=2^\delta,
\qquad
\delta:=N-r\alpha.
\tag{13}
\]

Put

\[
\omega_j:=2^{B_j-j\alpha},
\qquad
W_j:=\sum_{i=0}^{j-1}\omega_i2^{-m_i},
\qquad
W:=W_r.
\tag{14}
\]

The exact affine recurrence gives

\[
x_j=\frac{2^{m_j}}{\omega_j}
\left(x+\frac{W_j}{3}\right),
\qquad
W=3x(R-1).
\tag{15}
\]

Since \(W_j<W\), the bracket in (15) is smaller than \(Rx\). Moreover,

\[
\frac R{\omega_j}
=2^{N-B_j-(r-j)\alpha}<4.
\tag{16}
\]

Indeed, \(N-B_j=\lceil(r-j)N/r\rceil\), so the exponent in (16) is less
than \(1+\delta(r-j)/r<2\). We have proved the exact state envelope

\[
\boxed{x_j<2^{m_j}4x.}
\tag{17}
\]

Thus we may use

\[
h:=\log _2(4x)
\tag{18}
\]

in (7) and (11).

There is a second consequence which is special to the one-drop path. Let
\(n_m\) be the number of state indices in the unique block at height
\(m\). That block has \(u=n_m-1\) internal edges. Equations (3) and (7)
give

\[
\boxed{
n_m<\frac{2}{\beta}(m+h)+3.}
\tag{19}
\]

This also holds for blocks with zero or one internal edge. Define the
reciprocal occupation

\[
\mathcal O:=\sum_{j=0}^{r-1}2^{-m_j}
=\sum_{m=0}^{U}n_m2^{-m}.
\tag{20}
\]

Using

\[
\sum_{m\geq0}2^{-m}=2,
\qquad
\sum_{m\geq0}m2^{-m}=2,
\]

equation (19) gives

\[
\boxed{
\mathcal O<\frac4\beta(h+1)+6.}
\tag{21}
\]

The weights in (14) satisfy

\[
\omega_j\leq2^{j\delta/r}\leq R,
\]

and hence \(W\leq R\mathcal O\). The established two-logarithm estimate
gives

\[
R-1>\frac{1}{459r^{133/10}}.
\tag{22}
\]

Therefore,

\[
x=\frac{W}{3(R-1)}
<\frac{460}{3}\mathcal O\,r^{133/10}.
\tag{23}
\]

We now use \(\beta>3/2\). Equations (21) and (23) give

\[
x<\frac{460}{9}(8h+26)r^{133/10}.
\tag{24}
\]

Put \(X:=\log _2r\). P7 gives \(x<305r^{143/10}\), so at the established
period barrier \(X\geq36\),

\[
h=\log _2(4x)<15X.
\tag{25}
\]

Substituting (25) in (24), we obtain the refined one-drop quotient bound

\[
\boxed{
Q=\frac{x+1}{2}\leq x
<6200Xr^{133/10}.}
\tag{26}
\]

This saves one full power of \(r\) relative to the direct use of P7.

## 3. The new completion threshold

Equation (11), with \(H=4x\), shows that a relation \(U=o(\sqrt r)\)
still gives an immediate contradiction. Equation (26) lowers the critical
power needed to obtain that relation. In particular, every bound

\[
Q\geq U^{133/5+\varepsilon}
\tag{27}
\]

with fixed \(\varepsilon>0\) is asymptotically sufficient.

For comparison, combining the leading relation \(r\sim U^2/\alpha\) with
(26) gives the asymptotic completion scale

\[
12400\alpha^{-133/10}
U^{133/5}\log _2U.
\tag{28}
\]

The coefficient in (28) is \(27.1124\ldots\). This is a diagnostic
description of the scale, not the uniform theorem below.

**Theorem 1.** If every denominator-one one-drop candidate satisfies

\[
\boxed{Q\geq U^{271/10},}
\tag{29}
\]

then the one-drop sector is empty.

**Proof.** Recall the period barrier

\[
r\geq r_0:=72{,}057{,}431{,}991.
\tag{30}
\]

Suppose towards a contradiction that a candidate exists. Equations (26)
and (29), raised to the tenth power, give

\[
U^{271}<6200^{10}X^{10}r^{133}.
\]

After squaring and dividing by \(r^{271}\), we obtain

\[
\left(\frac{U^2}{r}\right)^{271}
<\frac{(6200X)^{20}}{r^5}.
\tag{31}
\]

The right side of (31) decreases for \(r\geq r_0\). At the base point,
the exact inequality \(r_0^{10}<2^{361}\) gives \(6200X<223{,}820\), and
the integer comparison

\[
223{,}820^{20}200^{271}
<313^{271}r_0^5
\tag{32}
\]

therefore proves

\[
\boxed{U^2<\frac{313}{200}r.}
\tag{33}
\]

Since \(313\cdot200<251^2\), it follows that

\[
U<\frac{251}{200}\sqrt r.
\tag{34}
\]

The function \(r-(753/200)\sqrt r-5\) increases on the stated range, and
the exact base-point comparison

\[
200r_0>753\cdot268{,}436+1000
\]

together with (34) proves

\[
r-3U-5>0.
\]

We use the exact lower bounds

\[
\alpha>\frac{19}{12},
\qquad
\beta>\alpha,
\tag{35}
\]

where the first is equivalent to \(3^{12}>2^{19}\). Equations (11),
(18), (25), and (35) imply

\[
\frac{19}{12}(r-3U-5)
<U^2+U+2(U+2)16X.
\tag{36}
\]

Substituting (33) and (34) in (36), we obtain

\[
\frac{19}{12}r
<\frac{313}{200}r+\mathcal R(r),
\tag{37}
\]

where

\[
\mathcal R(r):=
\left(3\cdot\frac{19}{12}+1\right)
\frac{251}{200}\sqrt r
+5\cdot\frac{19}{12}
+2\left(\frac{251}{200}\sqrt r+2\right)16\log _2r.
\tag{38}
\]

The quotient \(\mathcal R(r)/r\) decreases for \(r\geq r_0\). At the base
point, use

\[
r_0<268{,}436^2,
\qquad
\log _2r_0<\frac{361}{10}.
\]

An exact rational comparison then gives

\[
\mathcal R(r_0)<\frac{11}{600}r_0.
\tag{39}
\]

Since

\[
\frac{19}{12}-\frac{313}{200}=\frac{11}{600},
\]

equations (37) and (39) give a contradiction. \(\square\)

The [integer checker](cycles/one_drop_critical_polynomial_gate_certificate.js)
verifies (32), (34), (35), and (39). The monotonicity assertions follow
term by term: \(r^{-1/2}\), \(r^{-1}\),
\((\log r)r^{-1/2}\), and \((\log r)r^{-1}\) all decrease in the stated
range. Likewise, the logarithmic derivative of the right side of (31) is

\[
\frac{20}{\log r}-5<0.
\tag{40}
\]

## 4. Exact localization of a failed gate

Put

\[
M(U):=\left\lceil\frac{271}{10}\log _2U\right\rceil.
\tag{41}
\]

Suppose that a denominator-one candidate fails (29). Then

\[
0<Q<2^{M(U)}.
\tag{42}
\]

For a prefix of length \(t\), let \(V_t\) be its spike count, put

\[
L_t:=t+V_t,
\]

and let \(q_t\) be the least positive representative of its dyadic
cylinder. Since the complete integer \(Q\) belongs to every prefix
cylinder and \(L_t\geq t\), equation (42) gives

\[
\boxed{q_t=Q\qquad(t\geq M(U)).}
\tag{43}
\]

Thus all but \(O(\log U)\) of the word is one fixed-integer trajectory.
If \(t_1\) is the first one-based spike time, the exact first-spike identity
gives

\[
v_2(Q)=t_1-1,
\]

and hence

\[
\boxed{t_1\leq M(U).}
\tag{44}
\]

Let \(j_*\) be the last zero-based spike time and put

\[
T_*:=r-1-j_*.
\]

The exact terminal quotient coordinate satisfies

\[
3^{T_*}\mathrel{\|}
\left(2^{U+2}Q-(2^{U+1}-1)\right).
\]

Equation (42) therefore gives

\[
\boxed{
T_*\log _2 3<U+M(U)+2.}
\tag{45}
\]

Put

\[
M_3:=\left\lfloor\frac{M(U)+1}{\log _2 3}\right\rfloor+1.
\]

If \(M(U)\leq s\leq r-M_3\), the forward dyadic modulus exceeds \(Q\),
while

\[
3^{r-s}\geq3^{M_3}>2^{M(U)+1}>2Q-1.
\]

Thus there is a double-stabilization interval of length
\(r-O(\log U)\). It is nonempty in the candidate range because
\(U<r\), \(M(U)<28\log _2r\), \(M_3<19\log _2r\), and
\(47\log _2r<r\) for \(\log _2r\geq36\). On this interval, any two cuts
\(s<t\) have forward and backward defects

\[
\Delta_s=2^{L_t-L_s}j,
\qquad
\Delta_t=3^{t-s}j
\tag{46}
\]

for the same integer \(j\). The condition \(j=0\) is precisely the full
return equation. Thus the polynomial improvement lengthens the frozen
overlap, but it does not produce a second congruence.

## 5. A square-root-rise rational no-go

We now address the long-run and short-run alternatives directly. The
following rational family has the same square-root height scale forced by
(12), a rise phase of length \(O(U)\), a terminal constant-height run of
length \(r-O(U)\), bounded \(Q\), and strict leastness.

Restrict to the infinite set of \(r\) for which

\[
\frac34\leq\delta<1.
\tag{47}
\]

Put

\[
e:=N-r,
\qquad
U:=\left\lceil\frac43\sqrt r\right\rceil,
\tag{48}
\]

and order the internal one-sites of the anchored clock as

\[
\tau_1<\tau_2<\cdots<\tau_{e-1}.
\]

For all sufficiently large \(r\), \(\tau_1=2\). Choose spikes at

\[
\tau_1,\tau_{U+2},\tau_{U+3},\ldots,\tau_{e-1},
\tag{49}
\]

and choose ordinary branches at the \(U\) sites
\(\tau_2,\ldots,\tau_{U+1}\). Thus the height rises from \(0\) to \(U\)
in \(O(U)\) branches, after which it remains equal to \(U\) until the
terminal drop.

Let the spike times be \(t_1<\cdots<t_V\). The normalized carry is

\[
E_r:=\sum_{j=1}^{V}
\frac{3^{r-1-t_j}}{2^{N-t_j-j}}.
\tag{50}
\]

The first spike contributes

\[
\frac{3^{r-3}}{2^{N-3}}
=\frac8{27}2^{-\delta}.
\tag{51}
\]

For every later spike, all \(U\) omissions have already occurred. If
\(h:=r-t_j\), then the clock identity gives

\[
N-t_j-j=h+U+\left\lceil\frac{eh}{r}\right\rceil.
\]

Since \(N/r>\alpha\), its contribution to (50) is smaller than

\[
\frac{1}{3\cdot2^U}.
\]

There are fewer than \(r\) such terms, so

\[
\boxed{
E_r=\frac8{27}2^{-\delta}+O(r2^{-U}).}
\tag{52}
\]

The exact bottom identity gives the unique rational fixed point

\[
Q_r=
\frac{3E_r/4+1/2-2^{-U-2}}
     {1-2^{-\delta}}.
\tag{53}
\]

Since \(U\asymp\sqrt r\), the error in (52) tends to zero. Put
\(a:=2^{-\delta}\). Under (47), one has

\[
\frac12<a\leq2^{-3/4}<\frac{27}{40}.
\]

Equations (52) and (53) now give

\[
Q_r=\frac{1/2+2a/9+o(1)}{1-a},
\]

and therefore

\[
\boxed{1<Q_r<2}
\tag{54}
\]

for all sufficiently large members of the subsequence.

It remains to check strict leastness. The first two states are

\[
Q_r\longmapsto\frac32Q_r
\longmapsto\frac98Q_r+\frac14>Q_r.
\]

Every branch before \(\tau_{U+2}\) is then ordinary, so the state grows
by a factor \(3/2\) at each step. After \(\tau_{U+2}\), every one-site is
a spike. In any suffix of length \(\ell\), the number \(w\) of spikes
satisfies

\[
w\leq\left\lceil\frac{e\ell}{r}\right\rceil.
\]

Hence its homogeneous multiplier obeys

\[
\frac{3^\ell}{2^{\ell+w}}
=2^{(\alpha-1)\ell-w}
>2^{-2}.
\tag{55}
\]

Since \(\tau_{U+2}\geq U+2\), equations (54) and (55) show that every
proper state is larger than \(Q_r\) for all sufficiently large \(r\).

After reduction to a common odd denominator, this family satisfies every
exact integer numerator recurrence and the exact bottom closure. The first
spike is followed by \(\tau_{U+2}-3\) ordinary branches, so the associated
reset valuation tends to infinity. The common denominator is greater than
one because \(1<Q_r<2\).

Thus even at

\[
\frac{U^2}{r}\longrightarrow\frac{16}{9}>\log _2 3,
\tag{56}
\]

the fixed Beatty phase, a short rise phase, an arbitrarily long terminal
height run, strict leastness, exact local numerator divisibility, and
bottom closure permit bounded \(Q\). The missing property is precisely
denominator one.

The [rational-family checker](cycles/one_drop_sqrt_r_rational_no_go_certificate.js)
constructs every separated-phase row through \(r=512\). It verifies the
branch domains, strict leastness, bottom closure, reduced denominator, and
reset valuation using integer arithmetic. This finite run audits the
formulas, while (47) through (56) prove the infinite family.

## 6. Audit of the specialized irrationality measure

There is a substantially sharper asymptotic estimate in the primary
literature. Theorem 1 of Bondareva, Luchin, and Salikhov,
[Symmetrized polynomials in a problem of estimating of the irrationality
measure of number \(\ln 3\)](https://doi.org/10.22405/2226-8383-2018-19-1-15-25),
states that, for

\[
h_1,h_2,h\in\mathbb Z,\qquad
H=\max(|h_1|,|h_2|)>H_0,
\]

one has

\[
|h_1\ln2+h_2\ln3+h|>H^{-\mu},
\qquad \mu=4.116201.
\tag{57}
\]

Apply (57) with \((h_1,h_2,h)=(N,-r,0)\). Since \(N<2r\), it would give

\[
R-1=e^{N\ln2-r\ln3}-1
>(2r)^{-\mu}
\tag{58}
\]

whenever \(N>H_0\). Equations (20), (21), and (25), together with
\(R<2\), would then imply

\[
Q\leq x<\frac{82}{3}2^\mu Xr^\mu.
\tag{59}
\]

Indeed, (21) and \(\beta>3/2\) give
\(\mathcal O<40X+26/3<41X\), and
\(x=W/[3(R-1)]<2\mathcal O(2r)^\mu/3\).

Consequently, if (57) had a certified threshold, the transition estimate
would close asymptotically under every gate

\[
\boxed{Q\geq U^p\quad\hbox{with}\quad
p>2\mu=8.232402.}
\tag{60}
\]

For such a \(p\), the gate and (59) force
\(U=O((Xr^\mu)^{1/p})=o(\sqrt r)\), contradicting (18).

The published result does not supply that threshold. Its Theorem 1 uses
only the symbol \(H_0\), and the proof invokes an asymptotic lemma with
\(H>H_0(\mu)\), without giving either a numerical value or an explicit
formula for \(H_0\). Thus (57) verifies the asymptotic exponent but cannot
replace the explicit all-range estimate (22). In particular, it does not
turn (60) into a finite, executable completion theorem. The frozen
explicit gate therefore remains \(Q\geq U^{27.1}\).

## Conclusion

The transition argument needs much less than a square or stretched
exponential lower bound. The sharpened Archimedean target is

\[
Q\geq U^{27.1},
\]

and any exponent above \(26.6\) is sufficient asymptotically from the
explicit estimate (22). The sharper published irrationality measure would
lower the asymptotic critical exponent to \(8.232402\), but its unspecified
threshold prevents its use in the explicit theorem.

This is a real quantitative reduction, but the arithmetic core does not
change. A failed gate freezes all residue lifts after \(O(\log U)\) bits,
and the forward and backward locks still carry the same return defect. The
square-root-rise rational family exhausts the alternative based on short
rises and long Beatty renewal runs. Any proof of the polynomial gate must
use the global normalization of the common denominator to one.
