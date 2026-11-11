# The FCD row lift: positive lifts are safe, zero lift is the exact gate

**Date:** 17 August 2026  
**Mode:** SOLVE  
**Question:** Does deletion of the last Ferrers row give an induction on the
weight \(s\) for First-Crossing Descent?

## 1. Outcome

The row recursion gives a strict reduction, but not an all-weight proof.
Write

\[
k_s=\lceil s\log_2 3\rceil,
\qquad M_s=2^{k_s},
\qquad q_s=\frac{M_s}{M_{s-1}}\in\{2,4\}.
\]

For every weight-\(s\) primitive first-crossing word, its canonical residue
is one of the \(q_s\) lifts of one explicitly computable residue modulo
\(M_{s-1}\).  The lift is selected by one congruence modulo \(q_s\), and the
FCD margin has an exact row formula.

The new theorem is:

> Every positive dyadic lift is automatically on the FCD branch.  Therefore
> every possible FCD failure has lift zero.

Thus the full problem reduces to one exact zero-lift inequality.  The
projected weight-\((s-1)\) word is FCD under the inductive hypothesis, but its
gap does not control the new zero-lift gap monotonically.  Genuine \(q=2\)
and \(q=4\) extensions below decrease both the seed gap and the integer FCD
margin.  Hence the natural monotone row induction is false.

The zero lift does not force the no-wrap case in the old-modulus residue
update.  Under the inductive hypothesis that the projected row is FCD, every
wrapped \(q=4\) zero lift is automatically safe; only its no-wrap branch
remains.  An exact no-wrap example below has
projected bias \(11{,}013{,}024{,}469{,}464{,}147\) and threshold correction
\(11{,}013{,}024{,}469{,}464{,}115\), leaving only \(32\).  Thus projected positivity alone
does not give a usable quantitative separation.

There is also a sharp sign countermodel to the raw recursion.  The projected
word \(1011100\) has positive FCD margin, while the exact extension
\(10111010\) has negative margin.  Its sole missing hypothesis is the full
proper-prefix barrier.  Any successful induction must therefore use more
than the lower FCD sign and the row equations.

No FCD counterexample is obtained.  The zero-lift row inequality remains
equivalent to the unresolved all-weight gate.

## 2. Every row has a valid projection

Let the one positions at weight \(s\) be

\[
0=A_0<A_1<\cdots<A_{s-1}<k_s.
\]

For \(i\le s-2\), the prefix barrier gives

\[
A_i\le\lfloor i\log_2 3\rfloor<k_{s-1}.
\]

Therefore the positions \(A_0,\ldots,A_{s-2}\), placed in a word of length
\(k_{s-1}\), form a valid primitive first-crossing word of weight \(s-1\).
Every proper prefix retains the old barrier, and
\(3^{s-1}<2^{k_{s-1}}\) at the terminal prefix.

Also

\[
A_{s-1}\le\lfloor(s-1)\log_2 3\rfloor=k_{s-1}-1.
\]

Thus the last one occupies a terminal zero of the projected word.  Since
\(1<\log_2 3<2\), the new dyadic modulus is a two- or four-fold lift:

\[
q_s=2^{k_s-k_{s-1}}\in\{2,4\}.
\tag{R1}
\]

## 3. Exact lift selector and margin

Use the following notation for one row extension:

\[
m:=M_{s-1},\qquad p:=3^{s-1},\qquad q:=q_s,
\]

\[
M:=M_s=qm,\qquad P:=3^s=3p,\qquad D:=M-P,
\]

and let \(c\) and \(C\) be the projected and extended carries.  If the last
one is at \(A=A_{s-1}\), put \(u:=2^A\).  The carry recursion is

\[
\boxed{C=3c+u.}
\tag{R2}
\]

Define the old-modulus residue and its quotient by

\[
r_0:=[-CP^{-1}]_m,
\qquad
h:=\frac{Pr_0+C}{m}.
\tag{R3}
\]

Both are ordinary integers with \(0\le r_0<m\).  Every lift of \(r_0\)
modulo \(M=qm\) is \(r_0+\lambda m\), where
\(0\le\lambda<q\).  It is the canonical upper residue precisely when

\[
P(r_0+\lambda m)+C
=m(h+P\lambda)
\]

is divisible by \(qm\).  Hence there is one and only one lift, given by

\[
\boxed{
\rho=r_0+\lambda m,
\qquad
\lambda\equiv-hP^{-1}\pmod q,
\quad 0\le\lambda<q.}
\tag{R4}
\]

The selector is particularly explicit:

\[
\begin{array}{c|c}
q&\lambda\\ \hline
2&h\pmod2,\\
4,\ s\text{ even}&-h\pmod4,\\
4,\ s\text{ odd}&h\pmod4.
\end{array}
\tag{R5}
\]

The canonical endpoint and FCD margin are therefore

\[
Z=\frac{h+P\lambda}{q},
\tag{R6}
\]

and

\[
\boxed{
J_s:=D\rho-C
=M(\rho-Z)
=m\bigl(qr_0-h+\lambda D\bigr).}
\tag{R7}
\]

These identities track all two or four high dyadic lifts; no lift has been
discarded or chosen by an order heuristic.

## 4. Every positive lift is automatically FCD

We first strengthen the determinant bound used in the existing FCD notes.

**Lemma 1.** For every \(s\ge2\),

\[
\boxed{D_s>\frac{q_s s}{3}.}
\tag{R8}
\]

**Proof.** Exact integer arithmetic verifies
\(3D_s>q_s s\) for \(2\le s\le64\).  This is the finite base in the
certificate accompanying this report.

For \(s\ge65\), use the already-audited logarithmic-form input from the FCD
denominator argument,

\[
D_s>\frac{3^{s-7}}{s^{14}}.
\]

At \(s=65\), the exact inequality

\[
3^{59}>4\cdot65^{15}
\]

gives \(D_s>4s/3\).  It propagates because

\[
3\cdot65^{15}>66^{15},
\]

and \(3s^{15}>(s+1)^{15}\) remains true for all \(s\ge65\).  Since
\(q_s\le4\), this proves (R8).  \(\square\)

The ballot bound on the carry is

\[
C=\sum_{i=0}^{s-1}2^{A_i}3^{s-1-i}
<\frac{sP}{3}.
\tag{R9}
\]

Indeed, each summand is at most \(P/3\), and the inequality is strict for
\(s\ge2\).  Since \(m=M/q>P/q\), Lemma 1 and (R9) give

\[
\boxed{Dm>C.}
\tag{R10}
\]

Now suppose \(\lambda\ge1\).  Equation (R4) gives \(\rho\ge m\), so

\[
D\rho\ge Dm>C.
\]

Thus \(J_s>0\), which is exactly FCD.

**Theorem 2 (positive-lift exclusion).** Every FCD failure must have

\[
\boxed{\lambda=0.}
\tag{R11}
\]

This conclusion is all-depth; only the already-audited logarithmic-form
input and its explicit finite base enter Lemma 1.

## 5. The zero-lift row gate

By (R4), zero lift is equivalent to

\[
q\mid h.
\]

In that case

\[
\rho=r_0,
\qquad Z=\frac hq,
\qquad
J_s=m(qr_0-h).
\]

Consequently all-weight FCD is equivalent to the following row statement:

\[
\boxed{
q\mid h\quad\Longrightarrow\quad qr_0>h
\quad\text{for every valid row extension}.}
\tag{R12}
\]

The projected FCD data can be inserted exactly.  Let \(\rho_-\) and \(Z_-\)
be the projected canonical seed and endpoint, and define

\[
H:=[uP^{-1}]_m.
\]

Subtracting the projected congruence from (R3) gives

\[
\boxed{r_0=[\rho_--H]_m.}
\tag{R13}
\]

Moreover,

\[
\ell:=\frac{P(r_0-\rho_-)+u}{m}\in\mathbf Z
\]

and the carry recursion imply

\[
\boxed{h=3Z_-+\ell.}
\tag{R14}
\]

The inductive hypothesis gives \(\rho_->Z_-\).  It does not determine the
ordinary order after the modular subtraction in (R13), nor the signed wrap
\(\ell\) in (R14).  Proving

\[
qr_0>3Z_-+\ell
\]

is exactly the remaining zero-lift problem.

### 5.1 Exact threshold-wrap decomposition

The subtraction in (R13) has one binary wrap.  Put

\[
w:=\mathbf 1_{\{H>\rho_-\}},
\qquad
r_0=\rho_--H+wm,
\]

and define the row threshold

\[
\boxed{V:=\frac{DH+u}{m}.}
\tag{R15}
\]

This is an integer because \(P\equiv-D\pmod m\) and
\(PH\equiv u\pmod m\).  Moreover,

\[
\boxed{0<V<D.}
\tag{R16}
\]

Indeed, \(0<DH+u<m(D+1)\), so \(V\le D\).  Equality would give
\(u=D(m-H)\).  Since \(D>1\) is odd and \(u\) is a power of two, this is
impossible.

Writing \(K=(PH-u)/m\), one has

\[
h=3Z_- -K+wP,
\qquad
qH-K=V.
\]

Substitution into the zero-lift score gives the exact branch formula

\[
\boxed{
qr_0-h=q\rho_- -3Z_- -V+wD.}
\tag{R17}
\]

This answers the two natural subcases sharply.

1. **Wrapped subtraction is not excluded.**  The valid extension
   \(1100\mapsto11010\) has

   \[
   q=2,\quad \lambda=0,\quad
   (\rho_-,Z_-)=(3,2),\quad H=8>3,\quad r_0=11,
   \]

   and \((D,V)=(5,3)\).  Formula (R17) gives

   \[
   qr_0-h=0-3+5=2,
   \qquad \rho-Z=1.
   \]

   Thus zero lift does not force \(H\le\rho_-\), even for a genuine
   primitive first crossing.  This witness lies at the smallest possible
   positive endpoint gap.  In the wrapped branch, (R10) becomes

   \[
   Dr_0-C=(Dm-C)-D(H-\rho_-).
   \]

   The positivity of \(Dm-C\) alone supplies no bound on the subtraction
   term; bounding it is exactly the remaining wrapped \(q=2\) gate.

2. **Every wrapped \(q=4\) zero lift is safe under the row-induction
   hypothesis.**  If \(q=4\) and the projected word is FCD, then

   \[
   4\rho_- -3Z_-=\rho_-+3(\rho_--Z_-)>0.
   \]

   When \(w=1\), (R16)--(R17) therefore imply

   \[
   4r_0-h=(4\rho_- -3Z_-)+(D-V)>0.
   \]

   Hence a \(q=4\) zero-lift failure must be in the no-wrap branch
   \(H\le\rho_-\), where the exact residual condition is

   \[
   \boxed{4\rho_- -3Z_->V.}
   \tag{R18}
   \]

   Independently of the wrap branch and independently of projected FCD,
   there is a further exact tiny-seed consequence for any upper \(q=4\)
   failure.  Since \(m>p\),

   \[
   D=4m-3p>p=\frac P3.
   \]

   Such a failure satisfies \(D\rho\le C\).  Using (R9),

   \[
   p\rho<D\rho\le C<\frac{sP}{3}=sp,
   \]

   and hence

   \[
   \boxed{1\le \rho<s.}
   \tag{R19}
   \]

   The positive-lift exclusion also gives \(\rho=r_0\).  Thus every
   hypothetical \(q=4\) failure is zero lift with a canonical seed smaller
   than its weight.  The no-wrap conclusion requires the projected-FCD
   hypothesis above and is not used here.  All inequalities are strict; no
   endpoint case is lost.

   Projected positivity says only that the left side is positive; it does
   not control \(V\).  For the valid extension

   \[
   111110101101110111101001110110111111001111000101010000
   \longmapsto
   11111010110111011110100111011011111100111100010101000100,
   \]

   one has

   \[
   (\rho_-,Z_-)=(9007199254741023,8338590849833315),
   \quad H=9007199254740992,
   \quad r_0=31,
   \]

   and

   \[
   4\rho_- -3Z_-=11013024469464147,
   \qquad V=11013024469464115.
   \]

   The two sides differ by only \(32\), giving the upper data
   \((s,\rho,Z)=(35,31,23)\).  In particular, \(\rho=31<s=35\), so the
   strict tiny-seed range (R19) is genuinely populated and cannot itself be
   contradicted by a universal bound \(\rho\ge s\).  This is not an FCD
   counterexample, but it is an exact near-cancellation obstruction to any
   coarse bound derived only from the positive projected bias.

### 5.2 Cycle-period corollary

Assume the audited cycle inputs used elsewhere in this project.  Rotate a
nontrivial integer cycle to its least odd state \(x\).  Then

\[
x>2^{71}.
\]

At its first coefficient crossing, cyclic minimality makes the observed
endpoint at least \(x\).  The existing canonical-lift lemma gives

\[
x=\rho,
\qquad Z\ge x;
\]

equality is allowed when the first crossing is the full cycle.  Hence this
block is a non-descent and satisfies \(D\rho\le C\).

If its row multiplier is \(q_s=4\), apply the strict tiny-seed bound (R19)
directly to this non-descent.  It gives

\[
x=r_0<s.
\]

If \(r\) is the total odd length of the cycle, the first-crossing block uses
at most the whole cycle, so \(r\ge s\).  Therefore

\[
\boxed{q_s=4\quad\Longrightarrow\quad r\ge s>x>2^{71}.}
\]

Thus every hypothetical nontrivial cycle satisfies the exact dichotomy

\[
\boxed{q_s=2\quad\text{or}\quad r>2^{71}.}
\]

The conclusion is conditional only on the already-audited minimum-state and
canonical-first-crossing inputs.  No strict inequality \(r>s\) is used.

## 6. Sharp no-go examples for naive row induction

### 6.1 Positive lower sign plus the raw recursion is insufficient

The almost-barrier extension

\[
1011100\longmapsto10111010
\]

has \(q=2\), \(A=6\), and the exact carry recursion

\[
373=3\cdot103+2^6.
\]

It lies in the zero-lift, no-wrap branch:

\[
r_0=9,\qquad h=20,\qquad\lambda=0,\qquad H=64<73.
\]

Nevertheless,

\[
\begin{array}{c|r|r|r|r}
&\rho&Z&\rho-Z&J\\ \hline
\text{projected }1011100&73&47&26&3328\\
\text{extended }10111010&9&10&-1&-256.
\end{array}
\tag{R20}
\]

Thus lower FCD sign plus all the row-lift identities does not imply upper
FCD sign.  This is not an FCD counterexample: both words contain the
forbidden proper prefix \(10\).  The omitted hypothesis is exactly the full
proper-prefix barrier of the projected word.

### 6.2 The lower row does not select the high lift

For \(q=2\), the single projected word \(1100\) has two valid extensions:

\[
\begin{array}{c|c|c|c|c}
\text{upper word}&A&r_0&h&\lambda\\ \hline
11100&2&7&13&1\\
11010&3&11&20&0.
\end{array}
\]

Thus both two-fold lifts occur over the same lower row.

For \(q=4\), take the projected word

\[
1111111110010000.
\]

It has four valid extensions, all primitive first crossing:

\[
\begin{array}{c|c|r|r|c}
\text{upper word}&A&r_0&h&\lambda\\ \hline
111111111001100000&12&40447&109333&1\\
111111111001010000&13&28159&76118&2\\
111111111001001000&14&3583&9688&0\\
111111111001000100&15&19967&53975&3.
\end{array}
\]

Hence every one of the four high lifts occurs over one fixed lower word.
The exponent \(A\), through (R3)--(R5), is indispensable.

### 6.3 Gap and margin both decrease in the zero-lift branch

For \(q=2\), consider

\[
1101100\longmapsto11011010.
\]

The last one is inserted at \(A=6\), and \(\lambda=0\).  The exact data are

\[
\begin{array}{c|r|r|r|r}
&\rho&Z&\rho-Z&J\\ \hline
\text{projected}&59&38&21&2688\\
\text{extended}&123&118&5&1280.
\end{array}
\tag{R21}
\]

For \(q=4\), use the third extension in the preceding table, with
\(A=14\) and \(\lambda=0\):

\[
\begin{array}{c|r|r|r|r}
&\rho&Z&\rho-Z&J\\ \hline
\text{projected}&52735&47516&5219&342032384\\
\text{extended}&3583&2422&1161&304349184.
\end{array}
\tag{R22}
\]

Both rows remain FCD, but in both dyadic cases the seed gap and the integer
margin strictly decrease.  Therefore neither

\[
\rho_s-Z_s\ge\rho_{s-1}-Z_{s-1}
\]

nor

\[
J_s\ge J_{s-1}
\]

can support an induction.  These are exact counterexamples inside the
valid anchored first-crossing class, and they occur in the only lift branch
where a failure remains possible.

## 7. Irreducible remaining gap

The row recursion has removed all positive high lifts.  A hypothetical
minimal failure must satisfy the simultaneous conditions

\[
q\mid h,
\qquad
r_0=[\rho_--H]_m,
\qquad
h=3Z_-+\ell,
\qquad
qr_0\le h.
\tag{R23}
\]

The projected word is a genuine smaller-weight FCD word, but (R21)--(R22)
show that positivity of its margin supplies no monotone lower bound for the
new margin.  Closing (R12) requires a new constraint coupling the last-one
exponent \(A\) to the signed modular wrap \(\ell\).  Merely knowing the
projected FCD sign, the two- or four-fold lift size, or the previous margin
does not provide that constraint.

The exact certificate is
[`inverse/fcd_row_lift_audit.js`](inverse/fcd_row_lift_audit.js).  It verifies
the lift identities, both \(q=2\) branches, all four \(q=4\) branches, the two
zero-lift monotonicity counterexamples, the almost-barrier sign countermodel,
the wrapped witnesses, the \(q=4\) near-cancellation, and the determinant
finite base.  It performs no exploratory all-depth scan.

## 8. What was learned

Row deletion is useful: it confines every possible failure to the least of
the dyadic lifts.  It is not yet an induction, because the least lift can
lose most of a positive lower-row gap.  The next SOLVE target is precisely
(R12), with (R13)--(R19) retaining the signed wrap; further arguments based
only on monotonicity of the previous FCD margin are ruled out.
