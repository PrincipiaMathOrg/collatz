# The zero-lift gate: terminal synchronization and small endpoint shadows

**Date:** 17 August 2026  
**Mode:** SOLVE  
**Question:** Can the \(q=4\), zero-lift, no-wrap row be proved FCD from its
terminal \(2\)-adic valuation and the complete prefix barrier?

## 1. Outcome

We do not prove the remaining row gate. We obtain three exact reductions.

First, the terminal-zero valuation determines the lower seed down to all of
its low \(A\) binary digits. However, after this information is inserted, the
proposed row inequality simplifies identically to \(n>Z\). Thus the valuation
formula is exact, but it does not supply a new sign.

Second, a hypothetical \(q=4\) failure has two small ordinary endpoints. If
\(n\) is its canonical start, \(Z=n+d\) is its endpoint, and \(d\geq0\), then

\[
\boxed{n+4d<s.}
\tag{1}
\]

Moreover, its reduced residue is exactly \(\tau=d\), and its row score is
\(-4d\). Hence score zero is precisely the positive-cycle boundary. A fixed
negative score is a fixed endpoint-rise shadow, not a free modular branch.

Third, suppose that the first-crossing path is simple before its endpoint.
The \(s\) odd states are then distinct and start at the strict minimum \(n\).
The exact product formula and the fact that every later odd source is a
nonmultiple of \(3\) give, for \(n\geq5\),

\[
\boxed{
\left(\frac{4(n+d)}{3n}\right)^9
<\frac{n+3s-7/2}{n-7/2}.}
\tag{2}
\]

In particular,

\[
\boxed{
s>\frac{242461}{59049}\left(n-\frac72\right).}
\tag{3}
\]

If the path is not simple, it contains a nontrivial positive cycle above
\(n\). Thus (1)--(3), together with the shell cutoff, give a narrow exact
dichotomy. They do not exclude either branch.

The finite audit also answers the corresponding \(q=2\) question. Genuine
zero-lift, no-wrap \(q=2\) rows occur. Through shortcut length \(30\), the
closest such row has score \(14\), while the wrapped \(q=2\) branch attains
the minimum positive score \(2\). Therefore neither \(q=2\) wrap branch can
be discarded.

## 2. Exact terminal-zero synchronization

We retain the notation of the row-lift report. Put

\[
m:=2^{k_{s-1}},\qquad p:=3^{s-1},\qquad
M:=2^{k_s}=qm,\qquad P:=3^s=3p,
\]

and let the last one occur at \(A=A_{s-1}\). Write

\[
u:=2^A,\qquad b:=k_{s-1}-A.
\]

The prefix barrier gives \(A\leq k_{s-1}-1\), so \(b\geq1\), and
\(m=2^{A+b}\). Define

\[
H:=[uP^{-1}]_m.
\]

**Proposition 1, terminal valuation.** Let

\[
t_b:=[P^{-1}]_{2^b},\qquad 1\leq t_b<2^b.
\]

Then

\[
\boxed{H=2^At_b.}
\tag{4}
\]

**Proof.** Multiplication by \(2^A\) identifies residues modulo \(2^b\)
with the multiples of \(2^A\) modulo \(2^{A+b}\). Since \(P\) is odd, its
inverse modulo \(2^b\) is odd and nonzero. Therefore the least residue of
\(2^AP^{-1}\) modulo \(2^{A+b}\) is exactly \(2^At_b\). \(\square\)

Now suppose towards a contradiction that a \(q=4\) row fails FCD, and use
row induction below it. The positive-lift theorem gives \(\lambda=0\). A
wrapped \(q=4\) zero lift is already safe under the projected FCD
hypothesis, so the failure must be no-wrap. The weight-two row is checked
directly. If \(\rho_-\) is the projected seed, then

\[
\boxed{\rho_-=H+n=2^At_b+n.}
\tag{5}
\]

The previously proved tiny-seed inequality gives \(n<s\). Since the one
positions are strictly increasing, \(A\geq s-1\), and hence

\[
0<n<s\leq2^{s-1}\leq2^A.
\tag{6}
\]

Thus the low \(A\) binary digits of \(\rho_-\) are literally the ordinary
seed \(n\). In other words, the upper and projected seeds follow the same
first \(A\) parity bits.

Let

\[
y:=T_+^A(n).
\]

The state \(y\) is odd because the new last one occurs at position \(A\).
Equal-time translation through the first \(A\) bits, which contain \(s-1\)
ones, gives

\[
T_+^A(\rho_-)=y+pt_b.
\]

The projected word has \(b\) terminal zeros, while the upper word applies
the odd step at \(A\) and then has \(b+1\) zeros. Therefore

\[
\boxed{
y+pt_b=2^bZ_-,\qquad
3y+1=2^{b+2}Z.}
\tag{7}
\]

Put

\[
K:=\frac{Pt_b-1}{2^b}.
\]

Equation (4) and the row-threshold definition give

\[
\boxed{3Z_-=4Z+K,\qquad V=4H-K.}
\tag{8}
\]

Substituting (5) and (8) into the remaining row inequality gives

\[
4\rho_--3Z_--V=4(n-Z).
\tag{9}
\]

Thus

\[
4\rho_--3Z_->V\quad\Longleftrightarrow\quad n>Z.
\]

This calculation retains the complete terminal inverse \(t_b\), including
all of its \(b\) binary digits. It shows precisely why terminal valuation by
itself does not close the row: every \(t_b\)-dependent term cancels.

## 3. Fixed score is a small endpoint shadow

Let a hypothetical \(q=4\) failure have

\[
Z=n+d,\qquad d\geq0.
\]

The endpoint identity is

\[
\boxed{C=Dn+Md.}
\tag{10}
\]

The ballot bound on the carry is strict:

\[
C<\frac{sP}{3}.
\tag{11}
\]

For \(q=4\), we have \(M/P>4/3\) and \(D/P=M/P-1>1/3\). Equations
(10)--(11) therefore give

\[
\frac{n+4d}{3}
<\frac{Dn+Md}{P}
=\frac CP
<\frac s3.
\]

This proves (1). In particular,

\[
\boxed{0<n<s,\qquad 0<Z=n+d<s.}
\tag{12}
\]

If \(d\geq1\), integer strictness improves this to

\[
n\leq s-5,\qquad Z\leq s-4.
\tag{13}
\]

Let

\[
\tau:=[CM^{-1}]_D.
\]

Here \(D>P/3>s/3\), while the general carry estimate gives \(d<s/3\).
Reducing (10) modulo \(D\) now yields

\[
\boxed{\tau=d.}
\tag{14}
\]

Consequently the zero-lift row score is

\[
\boxed{4(n-Z)=-4d.}
\tag{15}
\]

There is also a useful target form. Since \(M=P+D\), equation (10) becomes

\[
\boxed{C-Pd=D(n+d).}
\tag{16}
\]

Thus score \(0\) is exactly \(D\mid C\), which is the positive-cycle
integrality gate. For fixed \(d\geq1\), a score of \(-4d\) is equivalent to
the small positive endpoint

\[
n+d=\frac{C-Pd}{D}<s.
\tag{17}
\]

This is the exact fixed-score target shadow. It retains the anchored carry,
and it does not reduce to a free congruence.

## 4. A simple-path weight barrier

We now use the full strict-minimum consequence of the prefix barrier. Let

\[
x_0=n,x_1,\ldots,x_k=Z
\]

be the canonical shortcut path. For every \(0<j<k\), the prefix coefficient
is strictly larger than one, and the prefix carry is positive. Hence

\[
x_j>n.
\tag{18}
\]

Suppose first that \(x_0,\ldots,x_{k-1}\) are pairwise distinct. The \(s\)
states at which an odd branch is applied are distinct odd integers. After
putting them in increasing order, say \(y_0<\cdots<y_{s-1}\), we have
\(y_0=n\). Every later odd source is an accelerated output

\[
\frac{3x+1}{2^{v_2(3x+1)}},
\]

and is therefore not divisible by \(3\). Counting the two admissible odd
classes modulo \(6\), equation (18) gives the uniform weakened spacing

\[
y_i\geq n+3i-2\qquad(0\leq i<s).
\tag{19}
\]

The exact product formula is

\[
\prod_{i=0}^{s-1}\left(1+\frac1{3y_i}\right)
=\frac MP\frac Zn.
\tag{20}
\]

For \(q=4\) and \(Z=n+d\), equations (19)--(20) imply

\[
\log\left(\frac43\frac{n+d}{n}\right)
<\frac13\sum_{i=0}^{s-1}\frac1{n+3i-2}.
\tag{21}
\]

For \(n\geq5\), the function \(f(x):=(n+3x-2)^{-1}\) is convex on
\([-1/2,s-1/2]\). Jensen's inequality on each unit interval gives

\[
\sum_{i=0}^{s-1}\frac1{n+3i-2}
\leq
\int_{-1/2}^{s-1/2}\frac{dx}{n+3x-2}
=\frac13\log\left(\frac{n+3s-7/2}{n-7/2}\right).
\tag{22}
\]

Combining (21)--(22) and exponentiating proves (2). Equivalently,

\[
\boxed{
s>
\frac{n-7/2}{3}
\left[
\left(\frac{4(n+d)}{3n}\right)^9-1
\right].}
\tag{23}
\]

Dropping \(d\) from the right side gives

\[
s>
\frac{n-7/2}{3}
\left[\left(\frac43\right)^9-1\right]
=\frac{242461}{59049}\left(n-\frac72\right),
\]

which is (3). The remaining odd starts \(n=1,3\) are direct: \(n=1\) is
the boundary orbit and \(n=3\) first crosses as \(1100\), with endpoint
\(2<3\).

If two states before the endpoint repeat, determinism gives a positive
cycle. The repeated state cannot be \(n\), by (18), so this cycle lies
strictly above \(n\). We have therefore proved the following dichotomy.

**Theorem 2, zero-lift simple-path dichotomy.** Every strict \(q=4\) FCD
failure either contains a nontrivial positive cycle above its canonical
start, or it satisfies (1), (2), and (23).

For endpoint equality, the same proof applies to a primitive simple cycle,
with the repeated terminal copy of \(n\) omitted from the list of branch
states. Thus a \(q=4\) equality cycle also satisfies (3).

The shell certificate gives the independent bound

\[
n<N_*:=468388920579845024401627507047746
\]

on the simple strict branch. Therefore a simple strict \(q=4\) failure must
simultaneously satisfy

\[
\boxed{
n<N_*,\qquad n+4d<s,\qquad
s>
\frac{n-7/2}{3}
\left[
\left(\frac{4(n+d)}{3n}\right)^9-1
\right].}
\tag{24}
\]

This intersection is still infinite. The external computation of Rozier
and Terracol verifies coefficient stopping through \(2.8\cdot10^{19}\), so
even when that external input is accepted, a large finite interval remains.
No all-depth conclusion is inferred from it.

## 5. The \(q=2\) branches are both genuine

The row identities do not force \(q=2\) zero lifts into one wrap branch.
The word

\[
110110111111001111000101010
\]

is a primitive first crossing with

\[
(s,k,A)=(17,27,25),\qquad q=2,\qquad\lambda=0.
\]

It is no-wrap, and its exact data are

\[
(\rho_-,Z_-)=(33554683,21523523),
\qquad H=33554432,
\]

\[
(\rho,Z)=(251,244),
\qquad 2\rho-h=14.
\tag{25}
\]

Thus the \(q=2\), zero-lift, no-wrap branch is nonempty and can approach the
sign boundary closely.

The exact finite enumeration through shortcut length \(30\) contains
\(1{,}166{,}059\) primitive first crossings, of which \(384{,}572\) are zero
lifts. The least positive score found in each branch is

| Branch | Least score | Witness | Upper gap |
| --- | ---: | --- | ---: |
| \(q=2\), wrap | \(2\) | \(11010\) | \(1\) |
| \(q=4\), wrap | \(4\) | \(1100\) | \(1\) |
| \(q=4\), no-wrap | \(8\) | \(1110100\) | \(2\) |
| \(q=2\), no-wrap | \(14\) | the word in (25) | \(7\) |

These are finite minima, not all-depth lower bounds. In particular, the
wrapped \(q=2\) branch is empirically closest in absolute score.

The long \(q=4\) example from the row report remains the sharp relative
cancellation:

\[
(s,n,Z)=(35,31,23),\qquad 4(n-Z)=32,
\]

while the two terms \(4\rho_- -3Z_-\) and \(V\) are both approximately
\(1.1\cdot10^{16}\). It has \(b=1\), \(H=2^{53}\), so even the simplest
terminal inverse already exhibits the cancellation in (9).

Finally, the nonprimitive word \(10111010\) lies in the \(q=2\), zero-lift,
no-wrap branch and has score \(-2\), namely \(9\mapsto10\). Its only missing
hypothesis is the proper-prefix barrier at the initial word \(10\). This
confirms that the row equations and the wrap branch alone do not determine
the sign.

## 6. Exact certificate and remaining gate

The script
[inverse/fcd_zero_lift_audit.js](inverse/fcd_zero_lift_audit.js) performs
the following exact checks with arbitrary-precision integers.

1. It verifies the terminal formula (4) and every row identity on all
   enumerated words.
2. It enumerates every primitive first crossing through shortcut length
   \(30\), checks FCD in that finite box, and reproduces the four branch
   minima above.
3. It verifies the genuine \(q=2\) no-wrap witness, the \(q=4\) absolute and
   relative near-boundary witnesses, and the nonprimitive score-\(-2\)
   countermodel.
4. With the extended invocation
   `node .\inverse\fcd_zero_lift_audit.js 4 10000000`, it scans every odd
   start through \(10^7\) to its first coefficient crossing. The default
   invocation scans through \(10^6\). The only starts in the extended range
   with \(s>n\) are
   \(27\mapsto23\) at \((s,q)=(37,2)\) and
   \(31\mapsto23\) at \((s,q)=(35,4)\).

The fourth check has an immediate word-level consequence. If a \(q=4\)
failure had weight \(s\leq10^7\), equation (1) would give
\(n<s\leq10^7\). Its deterministic first crossing is therefore included in
the scan. Consequently the scan certifies the \(q=4\) FCD branch through
weight \(10^7\). This does not certify the \(q=2\) branch at those weights,
because its failures do not satisfy the tiny-seed estimate (1).

The computation is finite evidence only. The exact remaining \(q=4\) gate
is to exclude the integer solutions of (7), (10), and the full prefix
barrier which satisfy \(d\geq0\). Equivalently, one must exclude the
small-endpoint shadows (16)--(17), subject to (23). The case \(d=0\) is
exactly the nontrivial-cycle integrality problem. The case \(d\geq1\) is the
strict simple-path problem unless a nontrivial cycle occurs inside the
segment.

For \(q=2\), both wrap branches remain. The no-wrap witness (25) rules out a
branch-elimination argument, while the score-\(2\) wrapped witness rules out
any universal positive separation larger than the divisibility forced by
the row multiplier.

## 7. What was learned

The terminal-zero inverse is fully rigid, but its contribution cancels from
the desired sign. The useful new information appears only after the row is
interpreted dynamically: a \(q=4\) failure would be a very long
strict-minimum path between two integers smaller than its odd weight. A
simple survivor with \(n\geq5\) must have more than
\(4.1061(n-7/2)\) odd steps, while a
nonsimple survivor already contains a nontrivial positive cycle. This is a
strict reduction of the zero-lift gate, but not its closure.
