# Direct attack on strict positive boundary winding

**Date:** 26 August 2026  
**Target:** `OPEN-CYCLE-WIND-01`  
**Mode:** SOLVE  
**Status:** the certificate is valid and the sign problem has been reduced to one exact small-residue branch. No all-depth proof of that branch is obtained here.

## 1. The theorem under attack

Let

\[
a=(a_0,\ldots,a_{r-1}),
\qquad
A_i:=\sum_{j<i}a_j,
\qquad
A:=A_r,
\]

and put

\[
M:=2^A,
\qquad
R:=3^r,
\qquad
D:=M-R,
\qquad
C:=\sum_{j=0}^{r-1}3^{r-1-j}2^{A_j}.
\]

We assume

\[
a_0=1,
\qquad
A=\lceil r\log_2 3\rceil,
\qquad
2^{A-A_i}>3^{r-i}\quad(0<i<r).
\tag{1}
\]

Define

\[
\rho:=[-CR^{-1}]_M,
\qquad
Z:=\frac{R\rho+C}{M},
\qquad
\delta:=\rho-Z.
\tag{2}
\]

The theorem to be proved is

\[
\boxed{\delta>0}
\tag{3}
\]

for every nontrivial primitive word satisfying (1). This is Conjecture 5.1
of `cycle_full_boundary_winding.md`. We do not replace it by a different
Collatz target in this attack.

## 2. Audit of the full boundary certificate

The endpoint argument in the original certificate is correct. Expanding the
valuation word to a shortcut word of length (A), let (x_j) be the
canonical positive shortcut path and let (s_j) count its odd inputs. The
paired states

\[
m_j:=3^{s_j}2^{A-j}-x_j
\]

follow the positive (3m-1) shortcut rule. Since (0<\rho<M), positivity
propagates and gives

\[
0<Z<R.
\]

The endpoint congruence then gives the exact ternary boundary identity

\[
\boxed{Z=[CM^{-1}]_R.}
\tag{4}
\]

Let

\[
g:=\gcd(C,D),
\qquad
q:=D/g,
\qquad
p:=C/g.
\]

The integer

\[
\kappa:=\frac{q\rho-p}{M}
\]

satisfies

\[
\boxed{\delta=g\kappa.}
\tag{5}
\]

For (q>1), reduction modulo (q) also gives

\[
\gcd(\kappa,q)=1.
\tag{6}
\]

Thus the algebraic certificate does retain the full dyadic and ternary
moduli. No lift or sign is hidden in (4) through (6).

## 3. Exact two-lift reduction

We now isolate the only branch which remains.

For (1\le k\le r), write

\[
B_k:=A-A_{r-k}.
\]

The strict records give (2^{B_k}>3^k). Reversing the carry sum gives

\[
\frac CM
=\sum_{k=1}^r\frac{3^{k-1}}{2^{B_k}}
<\frac r3.
\tag{7}
\]

Define

\[
d:=Z-\rho,
\qquad
\tau:=[CM^{-1}]_D,
\qquad 0\le\tau<D.
\tag{8}
\]

The endpoint equation is equivalent to

\[
\boxed{C=D\rho+Md.}
\tag{9}
\]

Consequently

\[
-D<d<\frac r3,
\qquad
d\equiv\tau\pmod D.
\tag{10}
\]

The audited determinant estimate gives (D>r/3). Hence (10) has exactly
two possible lifts:

\[
\boxed{d\in\{\tau-D,\tau\}.}
\tag{11}
\]

We have therefore proved the exact equivalences

\[
\begin{aligned}
\kappa>0
&\Longleftrightarrow d=\tau-D<0,\\
\kappa=0
&\Longleftrightarrow d=\tau=0,\\
\kappa<0
&\Longleftrightarrow d=\tau\in(0,r/3).
\end{aligned}
\tag{12}
\]

In particular, the desired theorem is exactly the exclusion of

\[
\boxed{C=D\rho+M\tau,
\qquad 0\le\tau<r/3.}
\tag{13}
\]

This is stronger and cleaner than a generic noncollision statement. It also
shows why a proof which silently chooses the negative lift is invalid.

## 4. Reduced-denominator consequences of a failure

Equation (9), together with the oddness of (g) and the coprimality of
(g) and (M), gives (g\mid d). If the winding is negative, write

\[
d=gh,
\qquad h\ge1.
\]

Then (10) yields

\[
\boxed{g<\frac r3,
\qquad
q=\frac Dg>\frac{3D}{r}.}
\tag{14}
\]

This strengthens the earlier bound (h<r/3): both the common factor and
the winding index are small.

There is a useful reduced residue form. Put

\[
h_0:=[pM^{-1}]_q,
\qquad
K:=\frac{Mh_0-p}{q}.
\tag{15}
\]

On the negative branch, (h_0=h) and

\[
\boxed{K=-\rho.}
\tag{16}
\]

On the positive branch, (h_0=q-\kappa) and

\[
\boxed{K=M-\rho.}
\tag{17}
\]

Thus (K) has only the two canonical lifts in the noncollision case. The
theorem is exactly (K>0).

For the rotation beginning at (a_i), let (p_i=C_i/g). If (y_i) is the
canonical integer state at that boundary and

\[
H_i:=3^i2^{A-A_i},
\]

then a hypothetical negative branch satisfies

\[
\boxed{p_i=qy_i+hH_i.}
\tag{18}
\]

Since the distinguished rotation is the strict rational minimum, (18)
gives the simultaneous inequalities

\[
\boxed{
p_i-p_0
=q(y_i-\rho)+h(H_i-M)>0
\quad(0<i<r).}
\tag{19}
\]

The strict suffix records say (H_i>R). Geometrically, (19) says that every
proper canonical point lies strictly above the chord joining
((M,\rho)) to ((R,\rho+gh)). This retains every cyclic minimum inequality,
but its signed area identity is compatible with both lifts. We found no
noncircular summation of (19) which determines the sign of (K).

## 5. Exact small-start localization

If the winding is nonpositive, (7) and (9) force

\[
\boxed{3D\rho<rM.}
\tag{20}
\]

This makes a direct seed certificate much smaller than an enumeration of all
strict-record words. The program

```text
cycles/full_boundary_small_start_scan.js
```

enumerates every odd seed below the exact maximum of

\[
\left\lfloor\frac{rM-1}{3D}\right\rfloor
\]

over the requested depths. It follows the actual accelerated trajectory,
allows only the final even run to be truncated, and checks every strict
record with integer powers. Stopping after the first state below the seed is
safe: Proposition 6.1 of the original certificate proves that a negative
winding candidate cannot have such an earlier state, while equality is the
cycle branch.

The completed run through (r=15601) has the following frozen counts:

\[
\begin{array}{c|r}
\text{largest forced start}&285{,}820{,}186\\
\text{odd seeds tested}&142{,}910{,}092\\
a_0=1\text{ seeds}&71{,}455{,}046\\
\text{accelerated odd steps}&356{,}216{,}187\\
\text{strict candidate depths}&71{,}455{,}046
\end{array}
\]

Exactly four strict words enter their depth-specific interval (20):

\[
\begin{array}{c|r|r}
r&\rho&Z\\ \hline
37&27&23\\
35&31&23\\
34&47&46\\
34&63&61
\end{array}
\]

All four descend. There is no nonpositive winding. The longest no-descent
excursion in the scanned seed interval begins at (217{,}740{,}015), lasts
249 accelerated odd steps, and then reaches (171{,}507{,}217).

The source now contains assertions freezing all of these values. This is a
finite theorem through (r=15601), not an all-depth proof.

## 6. Falsified stronger claims

Several attractive inequalities do not prove (3).

First, the sufficient scalar estimate

\[
\rho>\frac{rM}{3D}
\]

is false. The four rows in Section 5 are exact counterexamples to that
estimate, even though all four have positive winding.

Second, the sufficient modular estimate

\[
3\tau\ge r
\tag{21}
\]

cannot be deduced from only (a_0=1) and a strong terminal block. The first
exact regression is

\[
(1,2,2,1,1,1,2,1,1,4,1,1,1,2,1,1,4),
\]

at (r=17). It has six valid terminal suffix records and

\[
\tau=4,
\qquad
3\tau-r=-5.
\]

Nevertheless

\[
M=134{,}217{,}728,
\quad
D=5{,}077{,}565,
\quad
C=430{,}242{,}047,
\quad
\frac{M\tau-C}{D}=21>0.
\]

Thus (21) is strictly stronger than the needed margin and fails before the
margin does. The exact regression is frozen in
`cycles/full_boundary_tau_probe.js`.

Third, bounds such as (p<M), (p<M+q), and (p<M+3q) all fail already at
(r=5) for strict least rotations with positive winding. The reduced
numerator alone cannot select the lift in (15).

Finally, the unit-move formula

\[
\delta'=\delta-V+\chi D
\]

is correct, but the proposed wrap law

\[
\chi={\bf1}_{\delta<V}
\]

is equivalent to positivity at the neighboring word once the two-lift
interval is imposed. It cannot be used as an independent induction
hypothesis.

## 7. Equivalence with First-Crossing Descent

The sign theorem is not only related to Terras's coefficient-stopping
problem. It is equivalent to the exact First-Crossing Descent statement.

Let (\epsilon=(\epsilon_0,\ldots,\epsilon_{k-1})) be a shortcut word,
let (s_j) be its prefix weight, and let (s=s_k). We call it a coefficient
first crossing if

\[
2^j\le3^{s_j}\quad(0\le j<k),
\qquad
2^k>3^s.
\]

First-Crossing Descent says that, apart from the boundary word (10), the
canonical positive realization of every such word ends strictly below its
start.

**Theorem 7.1.** First-Crossing Descent holds for every nontrivial
coefficient first crossing if and only if strict positive boundary winding
holds for every nontrivial primitive word satisfying (1).

**Proof.** Suppose first that (\epsilon) is a nontrivial coefficient first
crossing. A word beginning with (0) descends at its first step. If its
first two bits are (10), its first crossing is already the boundary word
(10). Thus every unresolved nontrivial word begins with (11). Compress
the gaps between its ones into a valuation word (a). We then have
(a_0=1) and

\[
A=k=\lceil s\log_2 3\rceil.
\]

At every proper valuation boundary, the prefix barrier gives

\[
2^{A_i}\le3^i.
\]

Since (2^A>3^s), division gives

\[
2^{A-A_i}>3^{s-i}.
\]

Thus the compressed word satisfies all the strict-record hypotheses in
(1). It is primitive. Indeed, if it were a proper power, the coefficient at
the end of the first repeated block would be at least one, while its power
at the full endpoint would be less than one, which is impossible. The
canonical shortcut start and endpoint are exactly (\rho) and (Z) from
(2). Therefore strict positive winding implies First-Crossing Descent.

Conversely, suppose that a word satisfying (1) has (Z\ge\rho). Expand it
to its length-(A) shortcut word and stop at the first coefficient crossing,
of length (k) and weight (s). Let (\widehat\rhoin[0,2^k)) and
(\widehat Z) be the canonical start and endpoint of this prefix. Since the
full canonical start belongs to the same prefix cylinder, there is an
integer (t\ge0) such that

\[
\rho=\widehat\rho+2^kt.
\]

Equal-time affine translation gives the actual prefix endpoint (x_k) as

\[
x_k=\widehat Z+3^st.
\]

If the full winding is negative, Proposition 6.1 of the original
certificate gives (x_j>\rho) at every selected odd boundary. Every
intermediate even shortcut state is a positive power of two times the next
selected boundary state, so it is also greater than (\rho). Hence
(x_k>\rho).

If the full winding is zero, then (\rho) is the integral fixed point of
the full word. The strict rational minimum gives the same strict inequality
at every proper time, while the full endpoint equals (\rho). Thus in both
cases

\[
\widehat Z-\widehat\rho
=(x_k-\rho)+(2^k-3^s)t\ge0.
\]

The prefix cannot be (10), because (a_0=1) makes the expanded word begin
with (11). We have produced a nontrivial canonical first-crossing segment
which does not descend. This contradicts First-Crossing Descent and proves
the converse. \(\square\)

Theorem 7.1 explains why the final sign did not follow from the boundary
identities. Proving it at all depths would settle the full coefficient
first-crossing conjecture, not only a formally smaller cycle lemma.

**Corollary 7.2.** Conjecture 5.1 is equivalent to Terras's Coefficient
Stopping Time conjecture.

Indeed, at a first crossing with determinant (D_k=2^k-3^s>0), every
ordinary start in the canonical parity cylinder has the form
(n=\widehat\rho+2^kt), and its displacement is

\[
(\widehat Z-\widehat\rho)-D_kt.
\]

Thus descent of the canonical representative implies descent of every
higher lift. Conversely, a canonical non-descent is itself an ordinary
integer counterexample. This is the standard equivalence between
First-Crossing Descent and the Coefficient Stopping Time conjecture. Theorem
7.1 completes the equivalence with strict positive boundary winding.

The loose regression (7\mapsto8) checks the exact point at which the proof
uses strict records. Its length-eight parity word first crosses the
coefficient boundary after seven steps, at the state (5<7). Thus its
negative full winding does not produce a First-Crossing Descent failure, in
agreement with Theorem 7.1.

## 8. A suffix-depth invariant which survived the attack

For an arbitrary one-strip composition beginning with (a_0=1), let
(\ell) be the largest integer such that

\[
2^{a_{r-k}+\cdots+a_{r-1}}>3^k
\qquad(1\le k\le\ell).
\tag{22}
\]

The exact loose-word enumeration now also tests

\[
\boxed{3\tau>\ell.}
\tag{23}
\]

It finds no failure through (r=20). At (r=20), this includes all
(86{,}493{,}225) positive compositions with the prescribed total exponent
and (a_0=1). The smallest observed margin (3\tau-\ell) is (3). The
(r=17) regression in Section 6 has ((\tau,\ell)=(4,6)), so it does not
refute (23).

If (23) held at all depths, a fully strict word would have
(\ell=r-1). Since (3\tau) is an integer, (23) would imply
(3\tau\ge r), and (12) would prove positive winding.

There is an essential warning. At (\ell=0), equation (23) already asserts
(\tau>0). The equality (\tau=0) is the denominator-one cycle gate for
this broader word class. Thus a suffix induction whose base case merely
assumes (\tau>0) is circular. We record (23) as a sharply tested invariant,
not as a proof.

The final exact reruns were

```text
node cycles/full_boundary_small_start_scan.js 15601
node cycles/full_boundary_tau_probe.js 20 20
node cycles/full_boundary_theorem_probe.js 20
```

All three completed without an assertion failure. Their SHA-256 hashes are
recorded in `cycles/certificate_hashes.sha256`.

## 9. Remaining implication

After retaining the full carry, all cyclic minimum inequalities, the reduced
denominator, and both canonical boundary points, the unresolved assertion is
still the following single implication:

\[
\boxed{
\begin{gathered}
a_0=1,
\quad A=\lceil r\log_2 3\rceil,
\quad 2^{A-A_i}>3^{r-i},\\
\rho=[-CR^{-1}]_M,
\quad \tau=[CM^{-1}]_D
\end{gathered}
\quad\Longrightarrow\quad
C<M\tau.}
\tag{24}
\]

Equality in the opposite direction includes the exact cycle collision
(q=1), while strict reversal produces a minimum-start paradoxical Collatz
segment. This is why the last step does not follow from the proved boundary
identities alone.

We did not prove (24). The concrete advance of this attack is the exact
two-lift theorem (11), the stronger common-factor restriction (14), the
all-rotation form (19), the frozen depth-(15601) certificate, the exact
equivalence with the Coefficient Stopping Time conjecture, the suffix-depth
audit through (r=20), and the elimination of several tempting but false
strengthenings.

## 10. Subsequent absolute-shadow localization

The continuation
[`cycle_boundary_anchored_lattice_attack_2026-08-26.md`](cycle_boundary_anchored_lattice_attack_2026-08-26.md)
proves that the paired \(3m-1\) shadow has absolute loss

\[
T=m_0-m_r=D+Z-\rho
\]

and hence

\[
\rho>Z\Longleftrightarrow T<D.
\]

It also strengthens the four-corner virtual no-go: the translated top is
the unique failure in its complete 30-vertex terminal-preserving subideal
interval. Thus complete lattice minimality still cannot determine the sign
without the unshifted anchored front term. The remaining gate is the
absolute signed-shadow inequality recorded there, not another
boundary-difference identity.
