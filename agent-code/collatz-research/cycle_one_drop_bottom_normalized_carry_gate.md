# The bottom-normalized carry gate

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** We incorporate the exact bottom closure into the \(10\) and
\(110\) renewal maps. The resulting identity determines the exact dyadic
granularity of the affine carry, but its placement-free lower bound has
size \(2^{-U}\), rather than \(2^U\). We also construct anchored rational
countermodels with \(V\to\infty\), exact bottom closure, and strict
leastness. Thus an archimedean block or product argument cannot prove the
integer target. The remaining datum is the growing dyadic domain
congruence, equivalently the global denominator-one divisibility. We
finally derive an exact signed terminal defect on each dyadic cylinder.
This reformulation is correct, but no all-depth sign theorem is proved.

## 1. Omission normalization

Put

\[
\gamma:=\log _2(3/2),\qquad
e:=\lceil\gamma r\rceil,\qquad
N:=r+e,
\tag{1}
\]

and let

\[
b_i:=\left\lfloor\frac{ei}{r}\right\rfloor-
\left\lfloor\frac{e(i-1)}{r}\right\rfloor,
\qquad 1\leq i\leq r.
\tag{2}
\]

The final bit is \(b_r=1\), while the first \(r-1\) bits contain exactly
\(e-1\) ones. We start with \(Z_0:=Q\), apply the internal branches at
the first \(r-1\) clock sites, and denote the final state by \(Z_{r-1}\).
At a zero site we apply

\[
O(Z):=\frac{3Z}{2}.
\tag{3}
\]

At a one site we either apply \(O\), which we call an omission, or apply

\[
S(Z):=\frac{3Z+1}{4}.
\tag{4}
\]

Let \(H_i\) be the number of omissions among the first \(i\) sites, and
put

\[
W_i:=\frac{Z_i}{2^{H_i}}.
\tag{5}
\]

At a zero site, equation (5) gives \(W_i=3W_{i-1}/2\). At a one site,
both choices have the same homogeneous multiplier:

\[
W_i=
\begin{cases}
3W_{i-1}/4,&O,\\[3pt]
3W_{i-1}/4+1/(4\cdot2^{H_{i-1}}),&S.
\end{cases}
\tag{6}
\]

In particular, the branch-independent normalization is exact, not an
inequality.

For completeness, a \(10\) renewal beginning at height \(h\) becomes

\[
\begin{array}{c|c}
SO&\displaystyle W'=\frac98W+\frac{3}{8\cdot2^h}\\[6pt]
OO&\displaystyle W'=\frac98W,
\end{array}
\tag{7}
\]

while a \(110\) renewal becomes

\[
\begin{array}{c|c}
SSO&\displaystyle W'=\frac{27}{32}W+\frac{21}{32\cdot2^h}\\[6pt]
SOO&\displaystyle W'=\frac{27}{32}W+\frac{9}{32\cdot2^h}\\[6pt]
OSO&\displaystyle W'=\frac{27}{32}W+\frac{6}{32\cdot2^h}\\[6pt]
OOO&\displaystyle W'=\frac{27}{32}W.
\end{array}
\tag{8}
\]

These are precisely the normalized forms of the six integer block maps.

## 2. Exact terminal identity

Let \(V\) be the number of spikes and put

\[
U:=e-1-V.
\tag{9}
\]

The total homogeneous exponent of the normalized internal clock is

\[
\sum_{i=1}^{r-1}(1+b_i)=N-2.
\tag{10}
\]

It follows from (6) that

\[
W_{r-1}=P_rQ+E,
\qquad
P_r:=\frac{3^{r-1}}{2^{N-2}},
\qquad E\geq0.
\tag{11}
\]

The bottom closure is

\[
3Z_{r-1}-1=2^{U+1}(2Q-1).
\tag{12}
\]

Since \(Z_{r-1}=2^UW_{r-1}\), equation (12) is equivalent to

\[
Q=\frac34W_{r-1}+\frac12-2^{-U-2}.
\tag{13}
\]

Combining (11) and (13), we obtain

\[
\boxed{
\left(1-\frac{3^r}{2^N}\right)Q
=\frac34E+\frac12-2^{-U-2}.
}
\tag{14}
\]

Thus the terminal closure completes the normalized mechanical clock. It
does not introduce a new archimedean multiplier.

## 3. Carry granularity

We now record the exact arithmetic hidden in \(E\). Let

\[
0\leq s_1<\cdots<s_V\leq r-2
\tag{15}
\]

be the numbers of branches preceding the spikes, and put

\[
L:=r-1+V.
\tag{16}
\]

Iteration of the unnormalized recurrence gives

\[
Z_{r-1}=\frac{3^{r-1}Q+J}{2^L},
\tag{17}
\]

where

\[
J:=\sum_{j=1}^{V}
3^{r-2-s_j}2^{s_j+j-1}.
\tag{18}
\]

Since \(L+U=N-2\), equations (11), (17), and (18) give

\[
E=\frac{J}{2^{N-2}},
\qquad
2^UE=\frac{J}{2^L}.
\tag{19}
\]

If \(V\geq1\), the first summand in (18) is the unique summand of least
2-adic valuation, and the last summand is the unique summand of least
3-adic valuation. Therefore,

\[
v_2(J)=s_1,
\qquad
v_3(J)=r-2-s_V.
\tag{20}
\]

In particular, \(2^UE\) has reduced dyadic denominator

\[
2^{L-s_1}.
\tag{21}
\]

Let

\[
D:=2^N-3^r.
\tag{22}
\]

Multiplying (14) by \(2^N\), or substituting (17) directly into (12),
gives the exact integer identity

\[
\boxed{
DQ=3J+2^{N-1}-2^L.
}
\tag{23}
\]

Since \(D\) is odd and \(s_1<L<N-1\), an integral solution of (23)
satisfies

\[
v_2(Q)=s_1.
\tag{24}
\]

Equation (24) is the strongest immediate first-spike consequence. It
proves the desired bound only when \(s_1\geq U-1\), and strict leastness
does not force such an inequality.

The last spike gives a placement-free lower bound for \(E\). If

\[
k:=r-2-s_V,
\tag{25}
\]

then its summand in (18) contributes

\[
\frac{3^k2^{s_V+V-1}}{2^{N-2}}
=\left(\frac32\right)^k2^{-U-2}
\tag{26}
\]

to \(E\). Consequently,

\[
E\geq2^{-U-2}.
\tag{27}
\]

This has the opposite scale from the required lower bound
\(Q>2^{U-1}\). Substitution in (14) changes the terminal constant by
only \(O(2^{-U})\).

## 4. Rational countermodels with growing \(V\)

We next show that strict leastness cannot improve (27) by an
archimedean argument. This extends the all-ordinary rational ramp to a
family in which \(V\to\infty\).

For all sufficiently large \(r\), the clock (2) has no factor \(00\).
Choose

\[
V_r:=\left\lceil2\log _2r\right\rceil,
\qquad
U_r:=e-1-V_r,
\tag{28}
\]

and select the last \(V_r\) internal one sites as spikes. Every earlier
one site is omitted. Thus the omission height equals \(U_r\) at every
selected spike. Since the clock has no \(00\), the selected suffix has
length at most \(2V_r+2\). Equation (6) therefore gives

\[
0\leq E_r\leq
\frac{V_r}{4}
\left(\frac32\right)^{2V_r+2}2^{-U_r}=o(1).
\tag{29}
\]

Let

\[
\delta_r:=e-\gamma r,
\qquad
\Delta_r:=1-\frac{3^r}{2^N}=1-2^{-\delta_r}.
\tag{30}
\]

The irrationality of \(\gamma\) implies that there are infinitely many
\(r\) for which \(\{\gamma r\}\leq1/2\). Along this subsequence,
\(\delta_r\geq1/2\), and hence

\[
\Delta_r\geq1-2^{-1/2}>0.
\tag{31}
\]

Define the positive rational number

\[
Q_r:=
\frac{3E_r/4+1/2-2^{-U_r-2}}{\Delta_r}.
\tag{32}
\]

By construction, the associated affine trajectory satisfies every
anchored block formula and the exact bottom closure (12). Equations
(29) through (32) show that \(Q_r\) remains bounded, while
\(U_r\to\infty\). Therefore,

\[
Q_r<2^{U_r-1}
\tag{33}
\]

for all sufficiently large members of the subsequence.

It remains to check strict leastness. Before the selected suffix, every
branch is ordinary, so the state is multiplied repeatedly by \(3/2\).
The suffix begins after at least \(r-2V_r-2\) branches. Every subsequent
ordinary or spike map is bounded below by multiplication by \(3/4\).
Hence each state in the suffix is at least

\[
\left(\frac32\right)^{r-2V_r-2}
\left(\frac34\right)^{2V_r+2}Q_r.
\tag{34}
\]

The factor in (34) tends to infinity because \(V_r=O(\log r)\).
Thus every proper state is larger than \(Q_r\) for all sufficiently large
\(r\). Note also that \(V_r\to\infty\), and it eventually exceeds both
38 and \(1.505\log _2r-O(\log\log r)\).

The numbers \(Q_r\) are generally not integers. In particular, they do
not satisfy the block domain congruences. This is exactly the point of
the construction: the anchored phase, the exact affine maps, bottom
closure, unbounded spike count, and strict leastness all permit the wrong
side of (33). The integer congruences are the essential remaining input.

The checker
[cycles/bottom_normalized_rational_certificate.js](cycles/bottom_normalized_rational_certificate.js)
uses integer arithmetic for every comparison. It constructs the rational
fixed point from (23), checks (17) and (20), iterates every proper state,
and verifies (12), strict leastness, and (33). An exact run through
\(64\leq r\leq1024\) certifies 482 separated-phase rows. This computation
is an audit of the formulas, while the preceding argument proves the
infinite rational family.

## 5. The signed terminal defect

We now give a cylinder form of the same denominator-one obstruction. This
also fixes the conversion between the zero-based spike indices in (15) and
the one-based clock indices. Put

\[
\ell:=r-1,
\qquad
B_t:=\left\lfloor\frac{et}{r}\right\rfloor,
\qquad
b_t:=B_t-B_{t-1},
\tag{35a}
\]

for \(1\leq t\leq\ell\). Suppose that the spikes occur at the one-based
times

\[
1\leq t_1<\cdots<t_V\leq\ell.
\tag{35b}
\]

Thus \(t_k=s_k+1\), where \(s_k\) is the index in (15). If \(V_t\)
denotes the number of spikes through time \(t\), then the omission height
is \(H_t=B_t-V_t\), and \(H_\ell=U\).

Let

\[
R:=\frac{2^N}{3^r}.
\]

Writing the nonnegative normalized carry from (11) explicitly gives

\[
W_\ell
=\frac{4Q}{3R}
+\sum_{k=1}^{V}
 \frac{3^{r-1-t_k}}{2^{N-t_k-k}}.
\tag{36}
\]

Indeed, the spike at time \(t_k\) contributes \(1/4\), after which there
are \(\ell-t_k\) branches and \(V-k\) further spikes. Division by
\(2^U\) gives the denominator in (36). If

\[
C:=\sum_{k=1}^{V}2^k\left(\frac23\right)^{t_k},
\tag{37}
\]

then the bottom equation (12) is equivalent to

\[
4Q(R-1)=R(2-2^{-U})+C.
\tag{38}
\]

We next put

\[
D:=2^N-3^r,
\qquad
A:=\ell+V=N-U-2,
\qquad
M:=2^A,
\tag{39}
\]

and

\[
J:=\sum_{k=1}^{V}3^{\ell-t_k}2^{t_k+k-2},
\qquad
K:=2^{N-1}-M+3J.
\tag{40}
\]

Notice that the \(J\) in (40) is exactly the \(J\) in (18), after the
change of variables \(t_k=s_k+1\). Consequently,

\[
Z_\ell=\frac{3^\ell Q+J}{M},
\qquad
DQ=K
\tag{41}
\]

under exact bottom closure.

Fix a branch word, and let \(q\) be the least positive integer in its
dyadic domain modulo \(M\). Denote its integral endpoint by \(z_\ell\),
and define the signed terminal defect by

\[
\mathcal E(q):=
2^{U+1}(2q-1)-(3z_\ell-1).
\tag{42}
\]

Since \(Mz_\ell=3^\ell q+J\), direct substitution gives

\[
\boxed{Dq-K=M\mathcal E(q).}
\tag{43}
\]

Every integer in the same cylinder has the form \(q+jM\). The endpoint
changes by \(j3^\ell\), and therefore

\[
\mathcal E(q+jM)=\mathcal E(q)+jD.
\tag{44}
\]

Since \(D\) is odd and \(M\) is a power of two, (43) yields the exact
equivalence

\[
D\mid K
\quad\Longleftrightarrow\quad
D\mid\mathcal E(q).
\tag{45}
\]

This is a reformulation, not a relaxation, of the global divisibility in
(35). In particular, suppose that the rational fixed point \(Q=K/D\)
is a positive integer and satisfies \(Q\leq2^{U-1}\). Equations (43) and
(45) imply \(Q\equiv q\pmod M\). Moreover,

\[
M=2^{r-1+V}>2^{U-1}.
\]

It follows that \(Q=q\), so the low denominator-one problem is exactly

\[
q\leq2^{U-1}
\quad\text{and}\quad
\mathcal E(q)=0.
\tag{46}
\]

We emphasize the quantifiers in (46). For an arbitrary low cylinder
representative \(q\), the divisibility \(D\mid K\) only implies that the
integral fixed point lies somewhere in the same cylinder. The conclusion
\(Q=q\) uses the additional hypothesis that the fixed point itself is low.

If \(\mathcal E(q)=0\), then

\[
3z_\ell-1=2^{U+1}(2q-1).
\]

Thus \(z_\ell\) is odd and, more precisely,

\[
v_2(3z_\ell-1)=U+1.
\tag{47}
\]

This is the frozen terminal valuation gate in signed-defect coordinates.
It does not supply a new sign argument.

### 5.1. The \(q=14\) delayed-carry row

For \(r=16\), we have \((N,e,U,V)=(26,10,4,5)\). Choose the one-based
spike times

\[
(t_1,\ldots,t_5)=(2,7,8,10,13).
\]

Starting with \(q=14\), the exact states are

\[
14,21,16,24,36,54,81,61,46,69,52,78,117,88,132,198.
\tag{48}
\]

Every proper state is larger than 14. The endpoint and defect data are

\[
z_\ell=198,
\qquad
\mathcal E(14)=271,
\qquad
M=2^{20},
\tag{49}
\]

and

\[
D=24{,}062{,}143,
\qquad
K=52{,}705{,}906.
\tag{50}
\]

Indeed,

\[
D\cdot14-K=2^{20}\cdot271.
\]

The endpoint is even and the defect is odd, so this cylinder cannot close.
Note that \(14>2^{U-1}=8\). This row is a delayed-carry diagnostic, not a
low counterexample.

### 5.2. The all-omission rational row

The smallest transparent rational example is

\[
(r,N,U,V)=(8,13,4,0),
\qquad
D=1631,
\qquad
K=3968.
\tag{51}
\]

Thus

\[
Q=\frac{3968}{1631}<8=2^{U-1}.
\tag{52}
\]

Every internal branch is ordinary, so \(z_t=(3/2)^tQ>Q\) for
\(1\leq t\leq7\), and the normalized carry is zero. Also,

\[
z_7=\frac{67{,}797}{1631},
\qquad
3z_7-1=2^5(2Q-1).
\tag{53}
\]

Hence the anchored clock, exact bottom closure, strict leastness, and the
wrong side of the target coexist over the rationals. The missing property
is denominator one.

### 5.3. Exact finite sign audit

One possible strengthening would be

\[
q\leq2^{U-1}
\quad\Longrightarrow\quad
\mathcal E(q)>0
\tag{54}
\]

for every anchored valid strict-least cylinder. Combined with (46), this
would exclude denominator one. We do not have a proof of (54).

The exact residue-tree checker
[cycles/bottom_normalized_defect_certificate.js](cycles/bottom_normalized_defect_certificate.js)
audits (36) through (45), the rows (48) through (53), and the cylinder
translation law. It also searches every anchored cylinder for
\(3\leq r\leq84\). There are no cylinders at all with
\(q\leq2^{U-1}\) in this range, even before strict leastness is imposed.
Consequently, the finite sign test is vacuous: it finds no negative row,
but it also supplies no positive instance of (54). This computation is
finite evidence only.

## 6. Consequence for the proof strategy

For a fixed branch word, equation (23) determines the unique rational
fixed point. Requiring this fixed point to be integral is precisely the
global divisibility

\[
D\mid 3J+2^{N-1}-2^L.
\tag{35}
\]

The successive block domains are the dyadic-cylinder form of the same
condition. Their modulus grows at every renewal, as witnessed by
(21). Thus they do not collapse to a bounded phase state.

We have therefore obtained a rigorous no-go for the proposed scalar
route. The \(10\) and \(110\) products, their nonnegative carries, bottom
closure, and strict leastness do not imply \(Q>2^{U-1}\), even when
\(V\to\infty\). An all-depth proof must use the growing residue lift, or
equivalently obtain a new separation theorem for the divisibility (35).
