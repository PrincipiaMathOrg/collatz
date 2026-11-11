# The \(q=2\) zero-lift gate: all wrapped rows are safe

**Date:** 17 August 2026  
**Mode:** SOLVE  
**Status:** the wrapped branch is excluded at all depths. The no-wrap branch
remains open.

## 1. Outcome

Let a primitive coefficient first-crossing word have odd weight \(s\), let
its row multiplier be \(q_s=2\), and suppose that its dyadic lift is zero.
Write its canonical start and endpoint as

\[
n,\qquad Z=n+d.
\]

Under a hypothetical FCD failure, \(d\geq0\). We prove the following
all-depth statements.

1. The terminal inverse splits the row exactly into

   \[
   \begin{array}{c|c|c}
   \text{branch}&\text{projected seed}&\text{branch condition}\\ \hline
   \text{no-wrap}&\rho_-=n+H&n<G,\\
   \text{wrap}&\rho_-=n-G&n>G,
   \end{array}
   \]

   where \(H+G=m\) and \(H,G\geq2^{s-1}\).

2. In either branch, all terminal-inverse terms cancel from the row score:

   \[
   \boxed{
   2\rho_- -3Z_- -V+wD=2(n-Z)=-2d.}
   \tag{1}
   \]

   Thus the complete terminal valuation does not decide the sign.

3. Every failure satisfies

   \[
   \boxed{
   (R-1)n+Rd<\frac s3,\qquad
   n<153s^{14.3},\qquad d<\frac{s}{3R}<\frac s3.}
   \tag{2}
   \]

   Its reduced target residue is exactly \(\tau=d\), and

   \[
   \boxed{C-Pd=D(n+d).}
   \tag{3}
   \]

   In particular, \(d=0\) is precisely the positive-cycle integrality
   condition \(D\mid C\).

4. A wrapped failure has \(n>G\geq2^{s-1}\), while the carry bound gives

   \[
   3D2^{s-1}<sP.
   \]

   Exact integer evaluation of the reverse inequality for every \(q=2\)
   weight \(2\leq s\leq104\) leaves only \(s=3,5\), both in the existing
   exact FCD base. For \(s\geq105\), the polynomial bound in (2) contradicts
   \(n>2^{s-1}\). Hence

   \[
   \boxed{\text{no wrapped \(q=2\) zero-lift failure exists.}}
   \tag{4}
   \]

   This includes endpoint equality. Hence no positive cycle can occupy the
   wrapped \(q=2\) branch.

5. In the no-wrap branch, \(\rho_-=n+H\geq n+2^{s-1}\). For \(s\geq105\),
   every possible \(q=2\) failure therefore has

   \[
   \boxed{
   n<153s^{14.3}<2^{s-1}\leq H<\rho_- .}
   \tag{5}
   \]

   This is a genuine two-scale reduction, but not a contradiction. The
   projected \(q=4\) row is a descent, so the existing \(q=4\) failure
   theorem cannot be applied to it.

Consequently the \(q=2\) gate is not closed. The wrapped branch is closed,
while the all-depth obstruction is now entirely the no-wrap branch (5),
together with the possibility of a positive cycle inside a nonsimple
segment.

## 2. Exact notation and branch split

Put

\[
k_j:=\lceil j\log_2 3\rceil,\qquad
m:=2^{k_{s-1}},\qquad p:=3^{s-1},
\]

\[
M:=2^{k_s}=2m,\qquad P:=3^s=3p,\qquad D:=M-P,
\]

and

\[
R:=\frac MP.
\]

Since \(q_s=2\),

\[
\boxed{1<R<\frac43,\qquad 0<\frac DP=R-1<\frac13.}
\tag{6}
\]

Let the last one occur at \(A\), and put

\[
u:=2^A,\qquad b:=k_{s-1}-A.
\]

The prefix barrier gives \(b\geq1\). Distinctness of the one positions gives

\[
\boxed{A\geq s-1,\qquad u\geq2^{s-1}.}
\tag{7}
\]

Define

\[
t:=[P^{-1}]_{2^b},\qquad
H:=ut,\qquad
G:=m-H=u(2^b-t).
\tag{8}
\]

The inverse \(t\) and its complement \(2^b-t\) are positive odd integers.
Thus

\[
\boxed{H\geq u,\qquad G\geq u.}
\tag{9}
\]

Let \(w\in\{0,1\}\) be the subtraction-wrap bit. The upper zero-lift seed
\(n\) and the projected seed \(\rho_-\) satisfy

\[
n=[\rho_--H]_m,
\qquad
\boxed{\rho_-=n+H-wm.}
\tag{10}
\]

Since \(n\) is odd and \(G\) is even, equality \(n=G\) is impossible.
Equation (10) therefore gives the exact split

\[
\boxed{
\begin{array}{c|c|c}
w&\rho_-&\text{equivalent condition}\\ \hline
0&n+H&n<G,\\
1&n-G&n>G.
\end{array}}
\tag{11}
\]

No wrap branch has been discarded.

## 3. Terminal synchronization and exact cancellation

Let

\[
\theta:=t-w2^b
\]

and let \(y:=T_+^A(n)\). Before time \(A\), the upper and projected words
contain the same \(s-1\) odd steps. Equal-time translation and the terminal
zero strings give

\[
\boxed{
y+p\theta=2^bZ_-,
\qquad
3y+1=2^{b+1}Z.}
\tag{12}
\]

Define

\[
K_w:=\frac{P\theta-1}{2^b},
\qquad
K:=K_0,
\]

\[
V:=\frac{DH+u}{m}=2H-K,
\qquad
W:=D-V=\frac{DG-u}{m}.
\tag{13}
\]

The row-threshold lemma gives

\[
\boxed{0<V<D,\qquad 0<W<D.}
\tag{14}
\]

Multiplying the first equation in (12) by \(3\) and using the second gives

\[
\boxed{3Z_-=2Z+K_w.}
\tag{15}
\]

The zero-lift row expression is

\[
2\rho_- -3Z_- -V+wD.
\]

Substitution of (10), (13), and (15) gives

\[
\begin{aligned}
2\rho_- -3Z_- -V+wD
&=2n+2H-2wm-2Z-K+wP-V+wD\\
&=2(n-Z)+w(-2m+P+D)\\
&=2(n-Z).
\end{aligned}
\]

This proves (1). It also proves a method-level no-go: neither the complete
inverse \(t\), the terminal exponent \(A\), nor the wrap correction supplies
an independent sign after the exact identities are imposed.

Let

\[
\delta:=\rho_--Z_-.
\]

Under row induction, \(\delta\geq1\). Equation (1) gives the more granular
branch formulas

\[
\boxed{
\begin{array}{c|c}
\text{no-wrap}&3\delta=\rho_-+V-2d,\\
\text{wrap}&3\delta=\rho_- -W-2d.
\end{array}}
\tag{16}
\]

Hence every wrapped failure necessarily satisfies

\[
\boxed{\rho_-\geq W+2d+3.}
\tag{17}
\]

The projected word has at least one terminal zero. Its penultimate state is
\(2Z_-\), a proper-prefix state strictly larger than \(\rho_-\). Therefore

\[
\boxed{0<\delta<\frac{\rho_-}{2}.}
\tag{18}
\]

For the no-wrap branch, (16) and (18) further imply

\[
\boxed{4d\geq2V-\rho_-+3.}
\tag{19}
\]

These inequalities retain the signed wrap. They do not decide \(d=0\).

## 4. Gap, target, and terminal-exponent inequalities

Let \(C\) be the upper carry. The endpoint equation is

\[
P n+C=M(n+d),
\]

or equivalently

\[
\boxed{C=Dn+Md.}
\tag{20}
\]

The strict ballot estimate \(C<sP/3\) gives

\[
\boxed{(R-1)n+Rd=\frac CP<\frac s3.}
\tag{21}
\]

This proves the exact parts of (2).

The audited linear-form estimate used in the general FCD reduction is

\[
\log R>e^{-6.125581}s^{-13.3}.
\tag{22}
\]

Since \(R-1>\log R\), equations (21)--(22) give

\[
n<\frac{s}{3(R-1)}
<\frac{e^{6.125581}}3s^{14.3}
<153s^{14.3}.
\tag{23}
\]

The last numerical comparison is certified by an exact rational Taylor
upper bound for \(e^{6.125581}<459\) in the accompanying script.

There are useful complementary inequalities which retain \(A\). If the one
positions are

\[
0=A_0<\cdots<A_{s-1}=A,
\]

then

\[
i\leq A_i\leq A-(s-1-i).
\]

Termwise comparison in the carry sum gives

\[
\boxed{
P-2^s
\leq C
\leq
\frac{u}{2^{s-1}}(P-2^s).}
\tag{24}
\]

Combining (20) and (24),

\[
\boxed{
1-\left(\frac23\right)^s
\leq (R-1)n+Rd
\leq
\frac{u}{2^{s-1}}
\left[1-\left(\frac23\right)^s\right].}
\tag{25}
\]

For endpoint equality \(d=0\), this becomes the explicit seed window

\[
\boxed{
\frac{1-(2/3)^s}{R-1}
\leq n\leq
\frac{u}{2^{s-1}}\,
\frac{1-(2/3)^s}{R-1}.}
\tag{26}
\]

The reduced target residue is

\[
\tau:=[CM^{-1}]_D.
\]

The determinant estimate from the row-lift theorem gives \(D>2s/3\), while
(21) gives \(d<s/3\). Reducing (20) modulo \(D\) therefore yields

\[
\boxed{\tau=d.}
\tag{27}
\]

Since \(M=P+D\), equation (20) is also

\[
\boxed{C-Pd=D(n+d).}
\tag{28}
\]

Thus score zero, \(d=0\), is exactly \(D\mid C\). A negative score
\(-2d\) is a fixed endpoint-rise shadow with \(d<D\), not a free residue
class.

## 5. The wrapped branch is impossible

Suppose \(w=1\). Equations (7), (9), and (11) give

\[
\boxed{n>G\geq u\geq2^{s-1}.}
\tag{29}
\]

On the other hand, every failure satisfies (23). Hence

\[
2^{s-1}<153s^{14.3}.
\tag{30}
\]

Raising both sides to the tenth power removes the decimal exponent. The
exact certificate verifies

\[
\boxed{2^{1040}>153^{10}\,105^{143}.}
\tag{31}
\]

It also verifies

\[
\boxed{106^{143}<2^{10}\,105^{143}.}
\tag{32}
\]

Since \(((s+1)/s)^{143}\) decreases with \(s\), equations (31)--(32)
propagate the reverse of the tenth power of (30) from \(s=105\) to every
larger weight. Thus no wrapped failure has \(s\geq105\).

There is a much sharper exact test for the remaining weights. Equations
(21) and (29) show that a wrapped failure necessarily satisfies

\[
\frac{D}{P}\,2^{s-1}
<
\frac{D}{P}\,n
<
\frac s3.
\]

Equivalently,

\[
\boxed{3D2^{s-1}<sP.}
\tag{W1}
\]

The certificate evaluates (W1) using only integers at every \(q=2\) weight
\(2\leq s\leq104\). The only weights at which (W1) is arithmetically
possible are

\[
\boxed{(s,D)=(3,5),(5,13).}
\tag{W2}
\]

The certificate then enumerates the two primitive words at weight \(3\)
and the seven primitive words at weight \(5\). There is one wrapped
zero-lift row at weight \(3\), four at weight \(5\), and every one descends.
The least endpoint gap is \(1\). Therefore neither candidate is a failure.
We have proved

**Theorem 3, wrapped q2 exclusion.** No primitive first-crossing word in the
\(q=2\), zero-lift, wrapped branch can fail FCD. This includes \(d=0\), so
no positive cycle can occur in this branch.

The proof uses neither simplicity nor strict endpoint rise. It applies
unchanged to a path containing a repeated state. Apart from the explicit
word-and-seed checks at \(s=3,5\), the finite certificate checks coefficient
pairs rather than performing a broad word scan.

## 6. Simple-path reciprocal mass

Suppose that the source states before the endpoint are pairwise distinct.
Every proper path state is larger than \(n\). Every odd source after the
initial one is an accelerated output, hence an odd nonmultiple of \(3\).
After sorting the \(s\) odd sources as

\[
y_0<\cdots<y_{s-1},
\]

we have \(y_0=n\) and

\[
y_i\geq n+3i-2\qquad(i\geq1).
\tag{34}
\]

The exact product formula is

\[
\boxed{
\prod_{i=0}^{s-1}\left(1+\frac1{3y_i}\right)
=R\left(1+\frac dn\right).}
\tag{35}
\]

For \(n\geq5\), midpoint convexity on the terms \(i\geq1\) gives

\[
\boxed{
\log\left[R\left(1+\frac dn\right)\right]
<
\frac1{3n}
+\frac19
\log\left(\frac{n+3s-7/2}{n-1/2}\right).}
\tag{36}
\]

Equivalently,

\[
\boxed{
\left[R\left(1+\frac dn\right)\right]^9
<
e^{3/n}\frac{n+3s-7/2}{n-1/2}.}
\tag{37}
\]

A slightly weaker rational form, obtained by also weakening \(y_0=n\), is

\[
\boxed{
\left[R\left(1+\frac dn\right)\right]^9
<
\frac{n+3s-7/2}{n-7/2}.}
\tag{38}
\]

Unlike the \(q=4\) case, \(R\) has infimum \(1\). Therefore (36)--(38) do
not give an absolute length or seed cutoff in the no-wrap branch.

If the segment is not simple, determinism produces a nontrivial positive
cycle strictly above \(n\). For a primitive equality cycle, the terminal
copy of \(n\) is omitted and the same source-state estimate applies
cyclically.

## 7. The isolated-row fact and the surviving obstruction

Put \(\alpha:=\log_2 3\). Two consecutive \(q=2\) rows are impossible. If
both increments were one, then

\[
\lceil s\alpha\rceil-\lceil(s-2)\alpha\rceil=2.
\]

For arbitrary real \(x,y\),

\[
\lceil x\rceil-\lceil y\rceil>x-y-1.
\]

Since \(2\alpha>3\), the preceding displayed difference would be strictly
larger than \(2\), a contradiction. Hence

\[
\boxed{q_s=2\Longrightarrow q_{s-1}=4.}
\tag{39}
\]

There is also a fixed penultimate coefficient. At shortcut time
\(k_{s-1}=k_s-1\), the upper word has already used all \(s\) odd steps and
has one final zero remaining. Thus its state is \(2Z\), and its coefficient
is

\[
\boxed{
\frac Pm=\frac2R>\frac32.}
\tag{40}
\]

These facts do not close the induction. The projected \(q=4\) word is FCD,
not a \(q=4\) failure. In the surviving no-wrap branch its seed is

\[
\rho_-=n+H\geq n+2^{s-1}.
\]

For \(s\geq105\), (23) and (31)--(32) give the two-scale statement (5).
The exact projected-gap identity is still

\[
3\delta=\rho_-+V-2d,
\]

and all terms of exponential scale cancel when it is substituted back into
the upper score. Thus isolation of the \(q=2\) row does not by itself turn
the projected \(q=4\) descent into a contradiction.

## 8. Exact no-wrap normal form and second-row no-go

We now state the surviving branch without any modular ambiguity. Put

\[
r:=A-(s-1).
\tag{41}
\]

Thus \(r\geq0\) is the terminal delay of the last one, and

\[
\frac{u}{2^{s-1}}=2^r.
\]

Suppose that the row is no-wrap and fails FCD. Equations (20), (24), and
the positivity of \(n\) give

\[
Md<C\leq2^r(P-2^s)<2^rM.
\]

Consequently

\[
\boxed{
0\leq d\leq
\min\left\{
\left\lfloor\frac{s-1}{3}\right\rfloor,\,
2^r-1
\right\}.}
\tag{42}
\]

In particular, a strict failure with \(d\geq1\) must have \(r\geq1\).
When \(r=0\), all one positions are forced to be \(A_i=i\), so the word is
the already-proved front-loaded vertex. Hence an equality failure with
\(r=0\) is also excluded.

Since \(G\) is even and \(n\) is odd, no-wrap is exactly
\(1\leq n\leq G-1\). Substitution of

\[
n=\frac{C-Md}{D}
\]

gives the following exact interval form.

**Proposition 4, no-wrap target intervals.** A valid \(q=2\) row is a
zero-lift, no-wrap non-descent if and only if there is an integer \(d\) in
the range (42) such that

\[
\boxed{
C\equiv Pd\pmod D,
\qquad
Md+D\leq C\leq Md+D(G-1).}
\tag{43}
\]

For such a solution,

\[
n=\frac{C-Md}{D},
\qquad
Z=n+d,
\qquad
\tau=d.
\tag{44}
\]

**Proof.** Necessity follows from (20), \(M\equiv P\pmod D\), and
\(1\leq n\leq G-1\). Conversely, (43) makes the integer in (44) lie in
\([1,G-1]\). The affine identity

\[
Pn+C=M(n+d)
\]

then shows that \(n\) is the canonical seed of the word. It lies below
\(G\leq m\), so the high lift is zero, and (11) puts the projected
subtraction in the no-wrap branch. The endpoint is \(n+d\), completing the
equivalence.

Proposition 4 is sharper than a free low-residue search. For each terminal
exponent \(A\), it restricts the anchored carry to at most \(2^r\) target
strips, whose exact upper edge is \(Md+D(G-1)\).
It does not make the number of anchored ideals finite as \(s\) varies.

There is also no forced branch at the next row deletion. For \(s\geq105\),
(5) gives \(0<n<u\). Let \(\lambda_-\in\{0,1,2,3\}\) be the lift digit of
the projected \(q=4\) row. Since its seed is \(\rho_-=H+n=ut+n\), direct
division by \(m/4\) gives

\[
\boxed{
\lambda_-=
\begin{cases}
2+\lfloor2n/u\rfloor,&b=1,\\
t,&b=2,\\
\lfloor t/2^{b-2}\rfloor,&b\geq3.
\end{cases}}
\tag{45}
\]

Thus \(b=1,2\) force a positive lower lift, but \(b\geq3\) allows every
digit. The lower row's own subtraction wrap is not determined by (45).
The exact certificate contains eight fixed primitive witnesses. Beneath a
valid upper \(q=2\), zero-lift, no-wrap descent, they realize every pair

\[
(\lambda_-,w_-)\in\{0,1,2,3\}\times\{0,1\}.
\tag{46}
\]

These witnesses do not refute a theorem specific to a hypothetical failure.
They do refute any claim that validity, q2 no-wrap, or row isolation alone
forces the second row into one lift or wrap branch. A further deletion
therefore reproduces the original signed-carry problem rather than closing
it.

The lower-sibling estimate from the divergence track is not used here. Its
bound by \(n+2\) requires \(n\) to be the global least nonterminating
counterexample. A canonical FCD word, or even a least state on a cycle, does
not satisfy that hypothesis because an off-orbit sibling may terminate.
Accordingly, that estimate is a conditional no-divergence reduction, not a
universal FCD or cycle lemma.

## 9. Equality is exactly the cycle denominator-one gate

We now specialize Proposition 4 to \(d=0\). There is no formal equality
branch larger than the cycle branch.

**Proposition 5, equality-cycle equivalence.** If a valid first-crossing
word has \(Z=n\), then its actual shortcut trajectory is a primitive
positive cycle. The start \(n\) is strictly smaller than every proper path
state. Conversely, a q2 zero-lift no-wrap equality is exactly such a cycle
with

\[
\boxed{C=Dn,\qquad D\mid C,\qquad 1\leq n<G.}
\tag{47}
\]

**Proof.** At every proper prefix \(j\), the coefficient is at least one
and the prefix carry is positive. Hence

\[
T_+^j(n)>n.
\]

At the endpoint, \(T_+^{k_s}(n)=Z=n\), so the segment is a positive cycle.
It cannot contain a repeated proper state: determinism would trap the
trajectory in that repeated segment and prevent its later return to \(n\).
Thus the cycle is primitive and \(n\) is its strict least state. Equation
(47) is (20) with \(d=0\), together with the exact no-wrap condition
\(1\leq n<G\). The converse follows from the affine identity exactly as in
Proposition 4.

This equivalence permits a sparse parametrization of the remaining
divisibility. Put

\[
e:=k_s-s.
\]

The terminal delay \(r\) in (41) and the terminal zero count satisfy

\[
\boxed{b=e-r,\qquad 1\leq r\leq e-1.}
\tag{48}
\]

The lower bound uses the exclusion of the front-loaded case \(r=0\).

Write

\[
d_i:=A_i-i.
\]

For \(1\leq\ell\leq r\), let \(j_\ell\) be the first rank whose delay is at
least \(\ell\). Define

\[
h_\ell:=
\min\left\{
i\geq1:
\lfloor i\log_2 3\rfloor-i\geq\ell
\right\}.
\tag{49}
\]

The complete prefix barrier is equivalent to

\[
\boxed{
h_\ell\leq j_\ell\leq s-1,
\qquad
j_1\leq\cdots\leq j_r.}
\tag{50}
\]

Conversely, every sequence in (50) defines the delays by

\[
d_i=\#\{\ell:j_\ell\leq i\}.
\]

Grouping the anchored carry cells by delay level gives the exact sparse
formula

\[
\boxed{
C=
P-2^s+
\sum_{\ell=1}^{r}
2^{j_\ell+\ell-1}
\left(3^{s-j_\ell}-2^{s-j_\ell}\right).}
\tag{51}
\]

Let

\[
t:=[P^{-1}]_{2^{e-r}}.
\]

Then the terminal complement is

\[
\boxed{
G=2^{s-1+r}\left(2^{e-r}-t\right).}
\tag{52}
\]

Combining (47)--(52) gives an equality-only normal form.

**Theorem 6, sparse no-wrap cycle gate.** A q2 zero-lift no-wrap equality
exists if and only if there are \(s,r,j_1,\ldots,j_r\) satisfying
\(q_s=2\), (48), and (50), for which the integer \(C\) in (51) satisfies

\[
\boxed{
D\mid C,
\qquad
1\leq\frac CD<
2^{s-1+r}
\left(2^{e-r}-[P^{-1}]_{2^{e-r}}\right).}
\tag{53}
\]

For terminal delay \(r=1\), this reduces to one cut index \(j\geq h_1=2\):

\[
\boxed{
C=P+2^j3^{s-j}-2^{s+1},
\qquad
D\mid C.}
\tag{54}
\]

The remaining inequality in (53) supplies the no-wrap condition. Formula
(54) is a three-term divisibility problem, but no all-depth exclusion of it
is proved here.

Theorem 6 distinguishes the logical objects precisely. An arbitrary valid
FCD word need not be cyclic. Once \(d=0\) is imposed, however, the affine
endpoint is the start itself, so the word is a genuine integer cycle and
\(D\mid C\) is the denominator-one gate. Any proof excluding (53) would be
a nontrivial cycle exclusion, not merely an improvement of the row
inequality.

## 10. Proof ledger

The following items are closed.

1. Positive dyadic lifts are safe by the existing row-lift theorem.
2. The q2 zero-lift wrap split is exactly (11).
3. Terminal synchronization is (12)--(16), with no omitted signed branch.
4. Every failure has the gap and target form (20)--(28).
5. No wrapped q2 zero-lift failure exists.
6. Every simple branch satisfies the reciprocal-mass bounds (36)--(38).
7. Every q2 row is preceded by a q4 row.
8. Every no-wrap failure has the exact interval form (42)--(44).
9. A second row deletion is not forced into one lift or wrap branch by the
   universal row hypotheses.
10. Equality is exactly the primitive positive-cycle gate (47), with the
    sparse anchored normal form (48)--(53).

The following items remain open.

1. Exclude a no-wrap solution of (12), (16), (20), and the full prefix
   barriers with \(d\geq1\).
2. Exclude the no-wrap equality \(d=0\), equivalently \(D\mid C\).
3. Exclude the positive-cycle alternative inside a nonsimple strict
   segment.

The accompanying exact arithmetic certificate is
[inverse/fcd_q2_zero_lift_certificate.js](inverse/fcd_q2_zero_lift_certificate.js).
It verifies the exponential constant used in (23), the threshold and
propagation inequalities (31)--(32), every finite determinant comparison
(W1) through weight \(104\), the five exceptional small rows, and the q2
isolation pattern in a finite sanity range. It also verifies the eight fixed
second-row type witnesses in (46). It performs no broad word or seed scan.

## 11. Conclusion

The q2 terminal inverse behaves exactly like the q4 inverse at the decisive
point: after all signed corrections are retained, the row inequality
reduces identically to \(n>Z\). The useful new fact is branch asymmetry.
Wrap forces the upper seed above \(2^{s-1}\). The exact determinant
comparison closes the finite range, and the polynomial failure bound closes
all weights from \(105\) onward. No-wrap instead forces the
projected seed above \(2^{s-1}\), and the projected row is already a
descent. Its equality subcase is exactly the primitive cycle divisibility
(53), while its strict subcase is the target-strip problem (43). These
remain the exact all-depth gates.
