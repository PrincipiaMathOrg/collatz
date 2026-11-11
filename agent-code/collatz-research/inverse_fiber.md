# Architecture B/C research ledger

**Updated:** 17 August 2026  
**Mode:** CALCULATE, followed by SOLVE on the finite-envelope and cyclic-denominator lemmas  
**Scope:** stationary inverse fibers, first-crossing descent, high-surplus carry innovation, and the one-strip cycle obstruction

We use the shortcut map
\[
T(x):=\begin{cases}
x/2,&2\mid x,\\
(3x+1)/2,&2\nmid x,
\end{cases}
\]
and the accelerated map on positive odd integers
\[
U(x):=\frac{3x+1}{2^{v_2(3x+1)}}.
\]
The present file distinguishes theorem, computation, conditional implication, and open target. No computation below is promoted to an all-depth theorem.

## PROVED

### 1. A finite affine-envelope formula for `inverseFiberMin`

Let (n\ge 1) be odd, let (r\ge 0), and put (X:=U^r(n)). For a word
\[
a=(a_0,\ldots,a_{r-1})\in\mathbf N_{\ge 1}^r
\]
define
\[
A_0:=0,\qquad A_i:=\sum_{j<i}a_j,
\qquad
C(a):=\sum_{i=0}^{r-1}3^{r-1-i}2^{A_i}.
\]
Its affine ancestor score is
\[
L_a(X):=\frac{2^{A_r}X-C(a)}{3^r}.
\]

**Lemma 1, positive reconstruction.** If
\[
3^r\mid 2^{A_r}X-C(a),
\]
then (L_a(X)) is a positive odd integer, the word (a) is its exact accelerated valuation word, and (U^r(L_a(X))=X).

**Proof.** For the suffix beginning at (i), let
\[
E_i:=2^{a_i+\cdots+a_{r-1}}X-C(a_i,\ldots,a_{r-1}).
\]
The identity
\[
E_i=2^{a_i}E_{i+1}-3^{r-i-1}
\]
propagates (3^{r-i}\mid E_i) to (3^{r-i-1}\mid E_{i+1}). Put
\[
x_i:=E_i/3^{r-i}.
\]
Then (x_r=X) and
\[
3x_i+1=2^{a_i}x_{i+1}.
\]
Backward induction shows that every (x_i) is a positive odd integer. Since (x_{i+1}) is odd, the displayed power of (2) is exact. Finally, (x_0=L_a(X)). \(\square\)

For (0\le i<r), define
\[
K_i(n):=\left\lfloor\log_2\bigl(3\cdot 2^i n+1\bigr)\right\rfloor.
\]
Then the infinite inverse tree has the following finite-depth envelope:
\[
\boxed{
M_r(n)=
\min_{\substack{
1\le a_i\le K_i(n)\\
3^r\mid 2^{A_r}X-C(a)\\
L_a(X)\le n}}
L_a(X).
}
\tag{1}
\]

Indeed, the actual word of (n) makes the displayed set nonempty. A global minimizer (z=M_r(n)) satisfies (z\le n). Along its orbit,
\[
U^i(z)\le 2^i z\le2^i n.
\]
Consequently,
\[
2^{a_i}\le 3U^i(z)+1\le3\cdot2^i n+1,
\]
which gives the finite exponent cap. In other words, (1) replaces the noncomputable `sInf` in the supplied Lean blueprint by a finite minimum with a proved, seed-dependent box.

The script `inverse/FormulaCheck.cs` compared (1) with direct iteration for all odd (n\le199) and (0\le r\le4), giving 500 exact matching cases.

### 2. Exact target-shadow min-plus form

Choose the unique odd integer (Y_r) with
\[
1\le Y_r<2\cdot3^r,
\qquad
Y_r\equiv-X\pmod{2\cdot3^r},
\]
and put
\[
S_r:=\frac{X+Y_r}{3^r}.
\]
Then (S_r) is a positive even integer. For every word (a) satisfying the congruence in Lemma 1, put
\[
m_a:=\frac{C(a)+2^{A_r}Y_r}{3^r}.
\]
Targeted terminal duality makes (m_a) the start of an exact positive (3x-1) trajectory ending at (Y_r). Direct algebra gives
\[
L_a(X)=2^{A_r}S_r-m_a.
\]
Therefore (1) is exactly the positive lower envelope
\[
\boxed{
M_r(n)=\min_a^+\bigl(2^{A(a)}S_r-m_a\bigr),
}
\tag{2}
\]
with the finite caps from (1). This proves the finite-depth min-plus formula requested by Architecture B.

There is also an exact Bellman recursion. If
\[
B_0(X):=X
\]
and (B_d(X):=+\infty) when no depth-(d) ancestor exists, then
\[
B_{d+1}(X)=
\min_{\substack{a\ge1\\3\mid 2^aX-1}}
B_d\left(\frac{2^aX-1}{3}\right),
\qquad
M_r(n)=B_r(U^r(n)).
\tag{3}
\]
The recursion is not greedy. For example, the smallest predecessor of (5) is (3), which is divisible by (3) and has no predecessor, while the exponent (3) predecessor is (13), which continues to depth two.

### 3. Tropical concavity on each endpoint progression

Fix (r) and an odd residue (X_0\pmod{2\cdot3^r}). The set of feasible words in Lemma 1 is unchanged when
\[
X_t:=X_0+2\cdot3^r t.
\]
For each such word,
\[
L_a(X_t)=L_a(X_0)+2^{A(a)+1}t.
\]
It follows that (B_r(X_t)), as a function of (t\ge0), is nondecreasing, discretely concave, and eventually affine. The eventual active slope is the least feasible value of (2^{A(a)+1}).

We can make the exposure-loss threshold explicit. Let
\[
A_*:=\min\{A(a):a\text{ is feasible at }X_0\},
\]
and let (z_*) be the least (L_a(X_0)) among feasible words with total exponent (A_*). Since every base score is a positive integer, every word with (A(a)>A_*) satisfies
\[
L_a(X_t)\ge1+2^{A_*+2}t.
\]
The chosen minimum-slope word has score
\[
z_*+2^{A_*+1}t.
\]
Therefore
\[
\boxed{
B_r(X_t)=z_*+2^{A_*+1}t
\quad\text{whenever}\quad
2^{A_*+1}t\ge z_*-1.
}
\tag{E1}
\]
Moreover, if an actual word (w) has (A(w)>A_*), then it cannot be exposed once
\[
t>\frac{z_*-1}{2^{A_*+1}}.
\tag{E2}
\]
This is a checkable, non-equivalent sufficient condition for inverse-fiber descent. More generally, a particular lower-slope competitor (v) defeats an exposed word (w) as soon as
\[
t>
\frac{L_v(X_0)-L_w(X_0)}
{2^{A(w)+1}-2^{A(v)+1}}.
\tag{E3}
\]

The nested actual parameter has a decisive special form. Write
\[
X=U^r(n)=X_0+2\cdot3^r t_r,
\qquad
1\le X_0<2\cdot3^r.
\]
For the canonical target in Section 2,
\[
Y_r=2\cdot3^r-X_0,
\qquad
S_r=2(t_r+1).
\tag{E4}
\]
The sequence (S_r) is nonincreasing. Indeed, if (a_r=v_2(3X_r+1)), then
\[
\frac{X_{r+1}}{3^{r+1}}
=
\frac{X_r+1/3}{2^{a_r}3^r}
<
\frac{X_r}{3^r}.
\]
Since (S_r) is the least positive even integer strictly larger than (X_r/3^r), the claim follows. Note that (S_0=n+1).

On the other hand,
\[
U^r(n)\le2^r n.
\]
Consequently,
\[
t_r=0,\qquad S_r=2
\]
for every
\[
r>\log_{3/2}(n/2).
\tag{E5}
\]
Thus (3) is a genuine tropical-envelope theorem, but its large-parameter mechanism cannot prove stationary extinction along a fixed orbit. The actual nested envelopes eventually sit at the leftmost parameter (S=2), while their target (Y_r) and feasible line family change with (r).

Changing the gauge does not repair this. Replacing (Y_r) by (Y_r+2\cdot3^r h) sends (S_r) to (S_r+2h) and sends every shadow intercept (m_a) to (m_a+2^{A(a)+1}h). Every cost (2^{A(a)}S_r-m_a) is unchanged. Therefore an argument which makes (S_r) artificially large while holding the intercepts fixed is invalid.

### 3A. Exact dependence of the finite caps on `score <= n`

The finite bounds in (1) do not apply to the whole inverse tree. Their logical order is:

1. The actual word proves (M_r(n)\le n).
2. We choose a global minimizer (z=M_r(n)), so (z\le n).
3. Only then do we infer (U^i(z)\le2^i n) and (a_i\le K_i(n)).
4. We may therefore restrict the minimum to candidates whose score is at most (n).

In particular, removing the condition (L_a(X)\le n) from the finite box is unjustified. Large ancestors can have arbitrarily large exponents. The target-shadow Bellman recursion (3) is still infinitely branching before a comparison bound is supplied. There is no circularity in (1), since (M_r(n)\le n) follows independently from the actual trajectory, but the comparison step must appear before the exponent cap in a formal proof.

### 3B. Exact strict-barrier cylinder entropy and separation

Let $\alpha=\log_2 3$, and let $a_1,\ldots,a_L$ be a positive accelerated
valuation word satisfying the strict coefficient barrier at every prefix.
Its total exponent satisfies
\[
A_L\leq\lfloor\alpha L\rfloor.
\]
Even after discarding all proper-prefix restrictions, the number of such
positive compositions is at most
\[
\binom{\lfloor\alpha L\rfloor}{L}.
\tag{E6}
\]
Stirling's formula gives the count exponent
\[
h=\alpha\log\alpha-(\alpha-1)\log(\alpha-1)
=1.043632815857\ldots,
\]
whereas a terminal boundary cylinder has exponent
$\alpha\log2=\log3=1.098612288668\ldots$.

The density statement must be stratified by total exponent.  At fixed $A$,
there are at most $\binom{A-1}{L-1}$ words, and each exact valuation cylinder
is one odd residue modulo $2^{A+1}$.  Consequently the union of all strict
length-$L$ cylinders has dyadic density at most
\[
\frac12\sum_{A=L}^{\lfloor\alpha L\rfloor}
\binom{A-1}{L-1}2^{-A}
=\exp\{-(0.054979472810\ldots+o(1))L\}.
\tag{E7}
\]
This is a rigorous almost-everywhere sparsity mechanism, not a pointwise
exclusion theorem.

Cylinder compatibility also gives an exact ultrametric separation.  If two
valuation words agree through a prefix of exponent total $B$, their ordinary
representatives are congruent modulo $2^{B+1}$.  Once the words split, their
least representatives are either the same realized orbit prefix or differ by
at least $2^{B+1}$.  The estimate separates different branches but places no
lower bound on the one representative which follows a nested branch forever.

### 4. Formal first-crossing descent statement

For a binary word (w=(\epsilon_0,\ldots,\epsilon_{k-1})), put
\[
s_j(w):=\sum_{i<j}\epsilon_i.
\]
We call (w) a primitive first-crossing word when
\[
2^j\le3^{s_j(w)}\quad(0\le j<k),
\qquad
3^{s_k(w)}<2^k.
\]
Let
\[
C(w):=\sum_{\epsilon_j=1}2^j3^{s_k-s_{j+1}},
\qquad
\rho(w):=[-3^{-s_k}C(w)]_{2^k},
\]
and
\[
Z(w):=\frac{3^{s_k}\rho(w)+C(w)}{2^k}.
\]
Every positive integer with prefix (w) has the form
\[
n=\rho(w)+t2^k,
\qquad
T^k(n)=Z(w)+t3^{s_k}.
\]
Hence
\[
n-T^k(n)=\rho(w)-Z(w)+t(2^k-3^{s_k}).
\tag{4}
\]

Apart from the boundary words (0) and (10), first-crossing descent is exactly
\[
\boxed{J(w):=2^k(\rho(w)-Z(w))>0.}
\tag{5}
\]
For (w=0), the canonical residue is (0), but the least positive realization is (2) and descends. For (w=10), the canonical realization is (1), which is excluded by (n>1), and every later realization descends. Thus the exact formal statement is
\[
\forall n>1\ \forall k\ge1,
\quad
\left(
\begin{array}{c}
3^{s_k(n)}<2^k,\\
2^j\le3^{s_j(n)}\ (j<k)
\end{array}
\right)
\Longrightarrow T^k(n)<n.
\tag{FCD}
\]

### 4A. Reduced-modulus form of first-crossing descent

Fix a nonboundary primitive first-crossing word and abbreviate
\[
M:=2^k,\qquad P:=3^s,\qquad D:=M-P>0.
\]
Let
\[
\tau:=\bigl[C P^{-1}\bigr]_D
       =\bigl[C M^{-1}\bigr]_D,
\qquad 0\leq\tau<D,
\tag{R1}
\]
where the equality follows from $M\equiv P\pmod D$.  If
$d:=Z-\rho$, then
\[
C=D\rho+Md,
\qquad d\equiv\tau\pmod D.
\tag{R2}
\]

Write the one positions as
\[
0=A_0<A_1<\cdots<A_{s-1}.
\]
The prefix barrier gives $2^{A_i}\leq3^i$.  Consequently every
summand in
\[
C=\sum_{i=0}^{s-1}2^{A_i}3^{s-1-i}
\]
is at most $P/3$, and hence
\[
d=\frac{C-D\rho}{M}<\frac CM\leq\frac{sP}{3M}<\frac s3.
\tag{R3}
\]
Also $d>-D$, since $C>0$ and $0\leq\rho<M$.

These bounds give the exact sign criterion
\[
\boxed{
d<0
\quad\Longleftrightarrow\quad
d=\tau-D
\quad\Longleftrightarrow\quad
C<M\tau.}
\tag{R4}
\]
For the reverse implication in the last equivalence, (R2) and
$C<M\tau$ give $d<\tau$; the congruence in (R2), together with
$d>-D$, then forces $d=\tau-D$.  Thus FCD is exactly the positivity of
the ordinary-integer margin
\[
\boxed{M\tau-C>0.}
\tag{R5}
\]

In particular, the purely modular estimate
\[
\boxed{3\tau\geq s}
\tag{R6}
\]
is sufficient for FCD, because (R3) gives $d<\tau$.  It is only a
sufficient target.  A word with $3\tau<s$ could still satisfy (R5).

There is one quantifier trap here.  From $-D<d$ alone we know only that a
negative lift is uniquely $\tau-D$.  Without a separate proof that $d<D$,
a nonnegative lift could be $\tau+nD$ for an allowed $n\geq0$.  The carry
estimate (R3) does not itself supply that comparison.  Section 4C gives the
required independent denominator bound from the audited logarithmic-form
input and an exact finite base certificate.

For the cumulative-wrap form, put
\[
r_i:=\bigl[2^{A_i}3^{s-1-i}M^{-1}\bigr]_D
       \in\{1,\ldots,D-1\}.
\]
Then there is a unique integer $W\geq0$ such that
\[
\sum_{i=0}^{s-1}r_i=\tau+WD.
\tag{R7}
\]
If $a_i=A_{i+1}-A_i$, the individual residues obey
\[
r_{i+1}\equiv r_i2^{a_i}3^{-1}\pmod D.
\tag{R8}
\]
Equations (R7) and (R8) isolate the cumulative wrap cocycle.  They do
not make its local increments monotone.

### 4B. Rational cycle and signed shadow lift

Let $g:=\gcd(D,C)$, $q:=D/g$, and $p:=C/g$.  Applying the prescribed
shortcut branches to
\[
x_0:=\frac CD=\frac pq
\]
returns to $x_0$ after the full word.  If $x_j$ is the state after a
proper prefix, then
\[
2^j x_j=3^{s_j}x_0+C_j.
\]
The prefix barrier and $C_j>0$ give $x_j>x_0$ for every $0<j<k$.
Thus a primitive first-crossing word is a positive rational shortcut cycle
whose displayed starting state is its strict least rational state.

The canonical integer realization satisfies
\[
q\rho\equiv p\pmod M.
\]
Indeed, $M$ divides $D\rho-C=g(q\rho-p)$ and $g$ is odd.  Hence
\[
\ell:=\frac{q\rho-p}{M}\in\mathbf Z,
\qquad
\rho-Z=g\ell.
\tag{R9}
\]
FCD is exactly the assertion $\ell>0$.

There is also an ordinary signed lift for the map with odd branch
$(3x-1)/2$.  Define
\[
a:=\frac{M\tau-C}{D}\in\mathbf Z.
\tag{R10}
\]
The full branch identity is
\[
P a-C=M(a-\tau).
\tag{R11}
\]
The triangular carry congruences make every intermediate state integral
with the prescribed parity bit.  Therefore (R5) says exactly that this
shadow lift starts positive.  If $a>0$, it is a positive negative-shortcut
trajectory from $a$ to $a-\tau$.  If $a<0$, negation turns it into a
positive ordinary shortcut trajectory which rises by $\tau$.  This sign
split keeps the ordinary-integer lift visible; a rational or $2$-adic
replacement loses precisely the distinction required by FCD.

### 4C. Independent denominator bound and the two-lift corollary

Put
\[
\Lambda:=k\log2-s\log3>0.
\]
The audited logarithmic-form input P7.1 states
\[
\Lambda>
\exp\{-13.3(0.46057+\log s)\}
=e^{-6.125581}s^{-13.3}.
\tag{R12}
\]
Since $D=3^s(e^\Lambda-1)>3^s\Lambda$, for $s\geq63$ we obtain
\[
D>\frac{3^{s-7}}{s^{14}}>\frac s3.
\tag{R13}
\]
The last comparison is equivalent to $3^{s-6}>s^{15}$.  Its base case is
$3^{57}>63^{15}$, and it propagates because
$3\cdot63^{15}>64^{15}$.

The script `cycles/fcd_gap_certificate.js` independently checks
$2^{\lceil s\log_2 3\rceil}-3^s>s/3$ by exact integer arithmetic for
$1\leq s\leq62$.  Thus (R13) holds at every weight.  The infinite tail is
a symbolic consequence of P7.1; the range through $62$ is a finite exact
computer certificate.

Combining $D>s/3$ with (R3) gives $-D<d<D$.  Therefore the convenient
two-lift statement is now justified:
\[
\boxed{d\in\{\tau,\tau-D\}.}
\tag{R14}
\]
This conclusion depends on the independent denominator argument above,
not on the carry estimate by itself.

### 4D. Dual ternary representative and the bi-canonical obstruction

We now give a second exact form of (R5).  Fix a positive-weight
first-crossing word, and retain the notation

\[
M=2^k,\qquad P=3^s,\qquad D=M-P,\qquad
C=\sum_{i=0}^{s-1}2^{A_i}3^{s-1-i}.
\]

Put

\[
t_i:=2^{A_i}3^{s-1-i},\qquad
r_i:=\bigl[t_iM^{-1}\bigr]_D,
\]

where we use the unique residue $r_i=0$ when $D=1$.  Define

\[
h_i:=\frac{Mr_i-t_i}{D},\qquad
v_i:=h_i-r_i,\qquad
V_i:=\frac{v_i}{3^{s-1-i}}.
\tag{T1}
\]

These are integers.  Indeed,

\[
DV_i=3^{i+1}r_i-2^{A_i}.
\tag{T2}
\]

Since $D\equiv M=2^k\pmod {3^{i+1}}$, we obtain

\[
V_i\equiv-2^{A_i-k}\pmod {3^{i+1}},
\tag{T3}
\]

where a negative exponent denotes the inverse of the corresponding power
of $2$.  There is a boundary qualification in (T3).  If $D>1$, then
$1\le r_i<D$, and the ballot inequality $2^{A_i}\le3^i$ gives

\[
0<3^{i+1}r_i-2^{A_i}<3^{i+1}D.
\]

Thus

\[
\boxed{V_i=\bigl[-2^{A_i-k}\bigr]_{3^{i+1}}}
\qquad(D>1),
\tag{T4}
\]

with the least positive representative on the right.  The positive-weight
case $D=1$ is the boundary word $10$: if $k\ge3$, then
$2^k-3^s=1$ is impossible modulo $8$, and the remaining case is
$(k,s)=(2,1)$.  For $10$ one has $r_0=0$ and $V_0=-1$, not the least
residue $2$ modulo $3$.  Consequently (T4) must not be stated at $D=1$.

Let

\[
S:=\frac CP,\qquad
X:=\sum_{i=0}^{s-1}\frac{V_i}{3^{i+1}},\qquad
N:=PX=\sum_{i=0}^{s-1}V_i3^{s-1-i}\in\mathbf Z,
\]

and put $R:=\sum_i r_i$.  Equation (T2), before division by
$3^{s-1-i}$, gives $Pr_i=t_i+Dv_i$.  Summing gives the exact identity

\[
PR=C+DN,
\qquad
\boxed{R=S+DX.}
\tag{T5}
\]

Write $R=\tau+WD$, where $0\le\tau<D$.  Then

\[
\boxed{W=\left\lfloor X+\frac SD\right\rfloor.}
\tag{T6}
\]

Substitution into the FCD margin gives

\[
\boxed{
\frac{M\tau-C}{D}=S+M(X-W).}
\tag{T7}
\]

The endpoints in the resulting interval are closed.  To see this, note
from (R3) and (R13) that

\[
0<C\le\frac{sP}{3}<PD,
\qquad
0<\frac SM<\frac SD<1.
\tag{T8}
\]

If $u:=\{X\}$, then (T6) says that
$W-\lfloor X\rfloor$ is $0$ for $u<1-S/D$ and is $1$ for
$u\ge1-S/D$.  Therefore

\[
\boxed{
M\tau-C\le0
\quad\Longleftrightarrow\quad
1-\frac SD\le\{X\}\le1-\frac SM.}
\tag{T9}
\]

There is also an integral ternary form.  Let $z:=[N]_P$.  We have
$z\ne0$, since (T5) would otherwise give $P\mid C$, whereas the last
summand of $C$ is nonzero modulo $3$.  Put

\[
Y:=P-z.
\]

Reducing (T5) modulo $P$ gives $DN\equiv-C\pmod P$.  Hence

\[
\boxed{Y=\bigl[CD^{-1}\bigr]_P
=\bigl[CM^{-1}\bigr]_P,\qquad 1\le Y<P.}
\tag{T10}
\]

Since $\{X\}=z/P$ and $Y/P=1-\{X\}$, (T9) is equivalent to the
two-prime forbidden interval

\[
\boxed{
M\tau-C\le0
\quad\Longleftrightarrow\quad
\frac CM\le Y\le\frac CD.}
\tag{T11}
\]

We next record the reduced-denominator and coordinate-line content of
(T11).  Put

\[
g:=\gcd(D,C),\qquad D=gq,\qquad C=gp,
\]

so that $(p,q)=1$ and $0<p<qP$.  Let $d:=Z-\rho$.  The identity
$C=D\rho+Md$ and $(g,M)=1$ imply $g\mid d$; write $d=g\delta$.
Furthermore, (T10) and the endpoint equation imply $Y\equiv Z\pmod P$.
Thus there is a unique integer $n\ge0$ such that

\[
Z=Y+nP.
\]

Finally, define the integral $q$-shadow coordinate

\[
e:=\frac{p-qY}{P}.
\]

Using $DZ-C=-Pd$, one obtains

\[
\boxed{
e=\delta+qn,
\qquad
\rho=Y-ge+nM.}
\tag{T12}
\]

The two inequalities in (T11) become

\[
Y\le\frac pq\quad\Longleftrightarrow\quad e\ge0,
\qquad
Y\ge\frac{gp}{P+gq}\quad\Longleftrightarrow\quad Y\ge ge.
\tag{T13}
\]

If both hold, (T12) and $0\le\rho<M$ force $n=0$.  Since $\rho$ is odd,
it is positive.  Consequently every nonintegral failure of the canonical
margin would have the
normal form

\[
\boxed{
q>1,\quad 1\le e\le q-1,\quad ge<Y<P,
\quad
(\rho,d,Z)=(Y-ge,ge,Y).}
\tag{T14}
\]

The case $q=1$ is qualitatively different.  It is equivalent to exact
contact with the upper endpoint in (T11), and then

\[
\boxed{
Y=\frac CD,\qquad e=0,\qquad d=0,
\qquad \rho=Z=Y.}
\tag{T15}
\]

Thus the integrality gate is not an interior interval problem.  It is the
exact upper-boundary case of the dual ternary representative.

There is a useful dynamical restatement.  Put $x_*:=C/D$, the rational
fixed point of the affine word map.  We have

\[
x_*-\rho=\frac{Md}{D},
\qquad
x_*-Z=\frac{Pd}{D}.
\tag{T16}
\]

Combining (R4), (T10), and $x_*<P$, failure of the canonical margin is
equivalent to

\[
\boxed{0<\rho\le Z=Y\le x_*<P.}
\tag{T17}
\]

In other words, the binary canonical start and the ternary canonical
endpoint lie on the same side of the rational fixed point.  If $d>0$,
then the two middle inequalities in (T17) are strict.  If $d=0$, all
three entries $\rho,Z,x_*$ are equal, which is exactly (T15).
For a nonboundary word, failure of the canonical margin is exactly an FCD
failure.  The word $10$ is retained here only to audit the endpoints; its
canonical realization is $1$, which is excluded from (FCD).

The exact-integer program `inverse/dual_ternary_fcd.js` verifies
(T1)--(T17) for every first-crossing word of length at most $27$, a total
of $502{,}524$ words.  Among the $502{,}523$ positive-weight words, the
only forbidden-interval hit and the only case $q=1$ is $10$.  The same
program checks the following regressions.

1. For $10$, one has
   $V_0=-1$, $X=-1/3$, $W=0$, $Y=1$, and $M\tau-C=-1$.
   Here $\{X\}=2/3$ is the left endpoint of the wrap region, while
   $Y=C/D=1$ is the upper endpoint of (T11).
2. For the exact $q=5$ rational cycle model, one has
   $(g,q,p)=(1{,}015{,}513,5,187)$,
   $Y=Z=25{,}828{,}070$, $d=-g$, and $e=-1$.
   In particular, $Y=Z$ alone does not imply failure: here
   $Y>x_*=187/5$.
3. For the counterexample to the stronger half-residue bound, one has
   $\tau=14$, $d=-D+14$, $Y=Z=P-467$, and again $Y>x_*$.

The most immediate digit induction does not close (T11).  From (T3),

\[
V_{i+1}-2^{A_{i+1}-A_i}V_i\in3^{i+1}\mathbf Z,
\]

but the quotient need not be a nonnegative ternary digit.  Already the
word $1100$ has $(V_0,V_1)=(2,1)$, for which the quotient is
$(1-2\cdot2)/3=-1$.  Thus neither the ternary representatives nor the
$q$-shadow coordinate currently supplies an induction excluding the
closed interval (T11).  Equations (T11), (T14), and (T15) are exact
reformulations of the remaining FCD and cycle-integrality gates, not a
proof that the gates are empty.

### 5. Formal high-surplus carry innovation statement

For an infinite binary sequence \(\epsilon\), let
\(s_k:=\sum_{j<k}\epsilon_j\). Define \(\rho_0=z_0=0\), and recursively
\[
b_k:=(z_k+\epsilon_k)\bmod2,
\]
\[
\rho_{k+1}:=\rho_k+b_k2^k,
\]
\[
z_{k+1}:=
\frac{3^{\epsilon_k}z_k+\epsilon_k+b_k3^{s_{k+1}}}{2}.
\]
An integer-only formulation of high surplus is
\[
\forall E\ \exists K\ \forall k\ge K,
\qquad
3^E2^k\le3^{s_k}.
\tag{6}
\]
This is equivalent, under the barrier (2^k\le3^{s_k}), to
\[
s_k-\lceil k\log_3 2\rceil\longrightarrow\infty.
\]
The precise statement is
\[
\boxed{
\left[
2^k\le3^{s_k}\ \text{for all }k
\quad\text{and}\quad (6)
\right]
\Longrightarrow
\forall K\ \exists k\ge K:\ b_k=1.
}
\tag{HSCI}
\]

### 6. HSCI is equivalent to exclusion of divergent orbits

The finite-support theorem gives
\[
b_k=0\text{ eventually}
\quad\Longleftrightarrow\quad
\epsilon\text{ is the parity sequence of a nonnegative ordinary integer}.
\]
If HSCI fails, the corresponding ordinary integer (n>0) satisfies (q_k:=3^{s_k}/2^k\to\infty). The affine identity gives
\[
T^k(n)=q_k\left(n+\frac{C_k}{3^{s_k}}\right)\ge nq_k,
\]
so its orbit diverges to infinity.

Conversely, the audited orbit-sparsity input implies that a divergent orbit has (q_k\to\infty). Shift to a global minimum of (q_k). The shifted sequence satisfies the barrier and (6), while its ordinary start makes (b_k=0) eventually. Therefore HSCI fails.

Thus, subject only to the orbit-sparsity normalization already used in the supplied paper,
\[
\boxed{\text{HSCI}\quad\Longleftrightarrow\quad\text{there are no divergent Collatz orbits}.}
\tag{7}
\]
This identifies HSCI as an exact reformulation of the requested partial theorem, not as an easier local carry lemma.

### 7. Audit of the two-frontier-lemma reduction

The reduction from FCD and HSCI to Collatz is logically correct after the definitions above are substituted for the two placeholder constants in the Lean skeleton.

Take a least positive counterexample (n). It is odd. If its coefficient first crosses below (1), FCD produces a smaller state on the same nonterminating orbit, contradicting minimality. If it never crosses, then (q_k\ge1) for all (k). A bounded orbit is periodic, and every positive nontrivial shortcut cycle has full-period coefficient below (1), so the bounded case returns to FCD. The remaining orbit diverges. Barrier normalization gives high surplus, while ordinary-integer lifting gives eventual vanishing of (b_k), contradicting HSCI.

The supplied Lean declaration `constant Uplus : Nat -> Nat` is too abstract for its stated equivalence theorem. The proof also needs at least the actual accelerated-map definition, (U(1)=1), preservation of positive odd integers, and determinism. Likewise, `FirstCrossingDescent : Prop` and `HighSurplusCarryInnovation : Prop` are placeholders, not formalizations. A corrected blueprint is retained in `inverse/InverseFiberSkeleton.lean`.

### 8. HSCI for every eventually periodic parity sequence

Suppose that a positive ordinary orbit eventually repeats a shortcut parity block (w) of length (p) and weight (s). Write
\[
P:=3^s,\qquad Q:=2^p,\qquad C:=C(w).
\]
If the repeated tail has unbounded critical surplus, then (P>Q). Let (x>0) be the state at the beginning of the periodic tail. Repeating the affine block (m) times gives
\[
Q^mT^{mp}(x)
=P^mx+C\frac{P^m-Q^m}{P-Q}.
\]
Multiplication by (P-Q) yields
\[
(P-Q)Q^mT^{mp}(x)
=P^m\bigl((P-Q)x+C\bigr)-CQ^m.
\]
Since the left side is divisible by (Q^m) and (gcd(P,Q)=1), we obtain
\[
Q^m\mid (P-Q)x+C
\qquad(m\ge1).
\]
The fixed positive integer on the right must be (0), which is impossible because (P>Q), (x>0), and (C>0).

Therefore no positive ordinary integer can have an eventually periodic parity tail satisfying the HSCI hypotheses. In particular, every hypothetical divergent counterexample has an aperiodic parity sequence. By the Morse-Hedlund theorem, its subword complexity satisfies (p(L)\ge L+1) for every (L\ge1).

### 9. The exact cyclic denominator invariant

Let $a=(a_0,\ldots,a_{r-1})$ be a positive exponent word, let
\[
A=\sum_i a_i,\qquad D=2^A-3^r>0,
\]
and let $C_j$ be the carry of the cyclic rotation which begins with $a_j$.
The carries obey the exact local identity
\[
\boxed{2^{a_j}C_{j+1}=3C_j+D.}
\tag{C1}
\]
Consequently
\[
g:=\gcd(D,C_j)
\]
is independent of $j$.  Indeed, $D$ is coprime to both $2$ and $3$, so
(C1) transfers the common divisor in both directions.

Put
\[
q:=D/g,\qquad p_j:=C_j/g.
\]
Then
\[
\boxed{2^{a_j}p_{j+1}=3p_j+q,\qquad \gcd(p_j,q)=1.}
\tag{C2}
\]
Thus every exponent word determines a positive rational accelerated cycle
$p_j/q$ in lowest terms, and $q$ is its rotation-invariant denominator.
Since $D$ and every $C_j$ are odd and $3\nmid D$, the denominator $q$ is odd
and coprime to $3$.  Therefore
\[
q=1\quad\hbox{or}\quad q\ge5.
\tag{C3}
\]
Moreover, $q=1$ if and only if $D\mid C_0$.  In that case (C2), together
with the oddness of the $p_j$, shows that each displayed power of $2$ is
the exact valuation.  Hence $q=1$ is exactly an ordinary positive
accelerated Collatz cycle, not merely a congruence relaxation.

The denominator is also invariant under taking powers of a word.  If a
block $v$ has length $s$, total exponent $B$, carry $c$, and
$d=2^B-3^s$, then for $m\ge1$
\[
H_m:=\sum_{k=0}^{m-1}2^{Bk}3^{s(m-1-k)}
     =\frac{2^{Bm}-3^{sm}}{2^B-3^s},
\]
and concatenation gives
\[
D(v^m)=dH_m,\qquad C(v^m)=cH_m.
\tag{C4}
\]
It follows that
\[
\frac{D(v^m)}{\gcd(D(v^m),C(v^m))}
=\frac{d}{\gcd(d,c)}.
\tag{C5}
\]
Large common divisors caused by an imprimitive repeated word therefore
carry no new information: integrality is invariant under repetition.

The lower alternative $q\ge5$ in (C3) is sharp even after imposing every
one-strip and least-state order condition.  Consider
\[
a=(1,1,1,1,1,2,1,1,2,1,2,3,2,1,1,1,5).
\tag{C6}
\]
Here $r=17$, $A=27=\lceil17\log_2 3\rceil$, and
\[
D=5{,}077{,}565,\qquad
C=189{,}900{,}931,\qquad
\gcd(D,C)=1{,}015{,}513=D/5.
\]
The numerator cycle for $q=5$ is
\[
\begin{split}
187,283,427,643,967,1453,1091,1639,2461,1847,2773,2081,\\
781,587,883,1327,1993,
\end{split}
\]
and then returns to $187$.  These states are distinct, $187$ is their
strict minimum, and every proper prefix satisfies $2^{A_i}<3^i$.
Thus (C6) is a primitive, strict-record, first-crossing, one-strip rational
cycle with the largest possible proper gcd.  Any cycle exclusion must use
the special condition $q=1$; real inequalities, cyclic minimality, local
exact valuations, and a claim that the gcd is bounded away from $D$ do not
suffice.

### 10. Exact split identity at a cyclic crossing

Suppose a one-strip word is cut after $i$ exponents, and both pieces have
positive coefficient gaps.  Write
\[
d=2^{A_i}-3^i>0,\qquad
e=2^{A-A_i}-3^{r-i}>0,
\]
and let $c$ and $f$ be the carries of the prefix and suffix, respectively.
Put $p=c/d$ and $s=f/e$.  Direct concatenation gives
\[
D=3^{r-i}d+2^{A_i}e,\qquad
C=3^{r-i}c+2^{A_i}f,
\]
and hence the exact weighted-mediant formula
\[
\boxed{
\frac CD=
\frac{3^{r-i}d\,p+2^{A_i}e\,s}
     {3^{r-i}d+2^{A_i}e}.}
\tag{C7}
\]

If $C/D=n$ is an integer cycle state and the word is rotated so that $n$
is its strict minimum, then $p>s$ and
\[
s<n<p.
\tag{C8}
\]
More precisely, if $x_i=n+t$ is the state at the cut, then $t$ is a
positive integer and cyclic integrality turns the two carry errors into
\[
\boxed{
c=dn+2^{A_i}t,\qquad
f=en-3^{r-i}t.}
\tag{C9}
\]
This is the cumulative wrap-cocycle identity available only after imposing
ordinary integrality and cyclic minimality.  It is stronger than the bare
strict-record inequality, but it is not yet contradictory: it restates the
positive integer gap $x_i-n$.  The remaining task is to force one of the
two errors in (C9) outside its allowed range.

### 11. The sharp one-strip carry envelope

Assume the audited cycle inputs: a primitive nontrivial positive cycle is
rotated to its least odd state $n>2^{71}$, and its cyclic-shell estimate
gives
\[
A=\lceil r\log_2 3\rceil.
\tag{C10}
\]
Let $A_i=\sum_{j<i}a_j$.  The suffix from $x_i$ back to $n$ gives
\[
2^{A-A_i}n=3^{r-i}x_i+C_{i,r},
\]
so $x_i\ge n$ implies the strict terminal-record inequality
\[
A_i\log 2-i\log3<A\log2-r\log3.
\tag{C11}
\]
Equivalently, for $i<r$,
\[
A_i\le A-\lceil(r-i)\log_2 3\rceil.
\tag{C12}
\]
Also $a_0=1$: if $a_0\ge2$ and $n>1$, then
$(3n+1)/2^{a_0}<n$, contrary to minimality.

Every summand of the full carry now satisfies
\[
3^{r-1-i}2^{A_i}<\frac{2^A}{3}.
\]
Therefore
\[
\boxed{C<\frac{r2^A}{3}.}
\tag{C13}
\]
This estimate is all-depth and symbolic once (C10) and the least-state
rotation are supplied.  It also has an explicit extremal word.  Since the
carry is coordinatewise increasing in the proper prefix sums, the largest
admissible carry is obtained from
\[
A_0=0,\quad A_1=1,\quad
A_i=A-\lceil(r-i)\log_2 3\rceil\quad(2\le i<r).
\tag{C14}
\]

Combining $n=C/D>2^{71}$ with (C13) gives
\[
\frac{D}{2^A}<\frac{r}{3\cdot2^{71}}.
\]
If $\delta_2=A-r\log_2 3\in(0,1)$, then
$D/2^A=1-2^{-\delta_2}\ge\delta_2/2$.  Consequently every such cycle must
satisfy the exceptional upper-approximation condition
\[
\boxed{
0<\frac Ar-\log_2 3<\frac1{3\cdot2^{70}}.}
\tag{C15}
\]

### 12. A rigorous front-loaded reference word for the transposition lattice

Fix $s\geq1$, put
\[
k=\lceil s\log_2 3\rceil,
\qquad e=k-s,
\]
and consider the front-loaded word
\[
w_0=1^s0^e.
\tag{F1}
\]
It is primitive first crossing.  Its carry is
\[
C_0=P-2^s.
\]
If
\[
r=[P^{-1}]_{2^e}\in\{1,\ldots,2^e-1\},
\]
then direct reconstruction gives
\[
\rho_0=2^sr-1,
\qquad
Z_0=\frac{Pr-1}{2^e}.
\tag{F2}
\]
Since $P<2^{s+e}$, we have $Z_0<\rho_0+1$.  Thus $Z_0\leq\rho_0$
by integrality.  Equality would force
\[
Dr=2^e-1.
\tag{F3}
\]

We can exclude (F3) at every nonboundary weight.  The exact program
`inverse/FcdFrontLoadedBaseCertificate.cs` verifies
\[
D>2^e-1
\]
for $2\leq s\leq127$; its least excess is $2$, at $s=3$.  The case $s=1$
is exactly the boundary word $10$, for which equality holds.  For $s\geq128$,
the audited logarithmic-form estimate (R12) gives
\[
D>P e^{-6.125581}s^{-13.3},
\]
whereas $M<2P$ gives
\[
2^e=\frac{M}{2^s}<P2^{1-s}.
\]
At $s=128$ we have
\[
(s-1)\log2>6.125581+13.3\log s,
\]
and the difference is increasing because
$\log2-13.3/s>0$.  Hence $D>2^e-1$ for the entire tail.  We have proved
\[
\boxed{Z(w_0)<\rho(w_0)\quad(s\geq2).}
\tag{F4}
\]
Thus every fixed-weight transposition lattice has a rigorously certified
FCD reference vertex.  This uses the audited all-depth input (R12) and a
finite exact base certificate; it does not use the all-weight FCD claim.

### 13. The paired-wrap transposition cocycle

Let
\[
w=u10v,
\qquad
w'=u01v
\]
be nonboundary primitive first-crossing words with the same $(k,s)$, and put
\[
t=|u|,\qquad b=|v|_1,\qquad
\Delta=C(w')-C(w)=2^t3^b.
\tag{F5}
\]
Define
\[
L=[\Delta P^{-1}]_M,
\qquad
\chi={\bf1}_{\rho<L},
\]
and
\[
V=\frac{DL+\Delta}{M},
\qquad
\eta={\bf1}_{\tau+V\geq D}.
\tag{F6}
\]
The admissibility bounds give $1\leq V<D$.  Since
$PL\equiv\Delta\pmod M$, the integer
\[
h:=L-V=\frac{PL-\Delta}{M}
\tag{F7}
\]
is also available.  Direct substitution gives the two canonical updates
\[
\rho'=\rho-L+\chi M,
\qquad
\tau'=\tau+V-\eta D.
\tag{F8}
\]

The symmetric CRT form makes the sign bookkeeping exact.  We have
\[
\rho=[CD^{-1}]_M,
\qquad
\tau=[CM^{-1}]_D.
\]
Moreover, (R13) and the carry bound give $0<C<PD<MD$.  Put
\[
E(w):=\frac{\tau-(Z-\rho)}{D}
=\frac{\rho}{M}+\frac{\tau}{D}-\frac{C}{MD}.
\tag{F9}
\]
The two-lift theorem says $E(w)\in\{0,1\}$, with
\[
E(w)=1\quad\Longleftrightarrow\quad\text{$w$ satisfies FCD}.
\]
Equations (F5)--(F8) give the exact branch cocycle
\[
\boxed{E(w')=E(w)+\chi-\eta.}
\tag{F10}
\]
Therefore the sole sign-losing transition from an FCD predecessor is
\[
\chi=0,\qquad\eta=1,
\]
or, equivalently,
\[
\rho\geq L,\qquad \tau\geq D-V.
\tag{F11}
\]
Proving $\eta=\chi$ for every admissible edge, by an argument independent
of the moved word's margin, would propagate (F4) through the distributive
lattice and prove all-weight FCD.  Invoking the sign of $M\tau'-C'$ to prove
$\eta=\chi$ is circular, since (F10) shows that it is exactly the desired
inductive conclusion.

The structural program `inverse/FcdTranspositionBranchAudit.cs` checks
(F5)--(F10) on $373{,}278$ admissible edges through shortcut length $25$.
It records $208{,}094$ edges with $(\eta,\chi)=(0,0)$ and $165{,}184$ with
$(\eta,\chi)=(1,1)$, and no mismatched edge.  This is a finite exact audit
of the cocycle and the sign data, not an all-depth proof of $\eta=\chi$.

## REFUTED

### 1. Adjacent transpositions do not make the descent margin monotone

The barrier-preserving move
\[
11100\longmapsto11010
\]
changes
\[
(\rho,Z,J)=(23,20,96)
\quad\text{to}\quad
(11,10,32).
\]
Thus a right move can decrease (J). At length (7), other right moves increase (J). Both signs occur already at very small depth.

The exhaustive primitive-word scan through length (30) recorded (2{,}159{,}082) margin-increasing and (1{,}664{,}958) margin-decreasing admissible right moves at length (29) alone. Consequently, no proof may order the words by real carry and silently transfer that order to \(\rho-Z\).

### 2. The latest-one mechanical word is not a universal extremizer for (J)

At length (7) and weight (4), the latest-one word is (1101100), with
\[
(\rho,Z,J)=(59,38,2688).
\]
The word (1110100) has
\[
(\rho,Z,J)=(7,5,256).
\]
Thus the mechanical endpoint of the transposition chain does not minimize the descent margin. The winding bits cannot be discarded.

### 3. Greedy inverse descent is false

For endpoint (5), the least immediate predecessor is (3), but (3) has no accelerated predecessor because an accelerated image is never divisible by (3). The larger predecessor (13) does continue. Therefore the Bellman frontier must retain more than the smallest current reverse state.

### 4. Ancestor size is not monotone in total exponent

At endpoint (X=1) and depth (4), the word
\[
(1,1,5,4)
\]
has total exponent (11) and ancestor (23), while
\[
(6,2,2,2)
\]
has total exponent (12) and the smaller ancestor (21). Both trajectories are exact. Thus a higher dyadic slope can lie below a lower dyadic slope at the canonical parameter. The eventual-slope theorem (E1) requires a sufficiently large progression parameter and cannot be applied at (t=0) by slope order alone.

### 5. Cyclic gcd is not monotone under carry-increasing moves

At $r=6$ and $A=10$, we have $D=2^{10}-3^6=295$.  Moving one unit of
exponent one place to the left increases the carry, but its effect on the
common divisor has both signs.  All four words below satisfy $a_0=1$ and
the strict terminal-record inequalities:
\[
\begin{array}{c|c|c}
\text{word}&C&\gcd(D,C)\\ \hline
(1,1,3,1,1,3)&1121&59\\
(1,2,2,1,1,3)&1229&1\\
(1,1,3,1,2,2)&1249&1\\
(1,2,2,1,2,2)&1357&59.
\end{array}
\]
Thus the same frontloading move decreases the gcd from $59$ to $1$ in the
first pair and increases it from $1$ to $59$ in the second.  Neither carry
order nor the mechanical extremal word controls divisibility by $D$.

### 6. The stronger half-residue bound is false

The literal conjecture
\[
\tau\geq\left\lceil\frac s2\right\rceil
\]
holds through weight $28$ but fails at weight $29$.  The exact word
\[
w={\tt 1111101010111111111101101010100010100111011000}
\]
has
\[
s=29,\qquad k=46,\qquad
C=149{,}007{,}981{,}539{,}635,
\]
and direct modular reconstruction gives
\[
\tau=14,
\qquad 2\tau=28<29.
\tag{X1}
\]
Every proper prefix satisfies the first-crossing barrier, and the terminal
coefficient is below one.  The canonical ASCII record
\[
{\tt s=29;k=46;tau=14;C=149007981539635;}
\]
\[
{\tt margin=836154436947661;word=}w
\]
has SHA-256 digest
\[
{\tt ff33f8a918c41062c23f73af3fbef398615d0ff45b7c081170b635d06fe035bd}.
\]
The counterexample does not threaten the sufficient bound (R6), since
$3\tau=42>29$.

### 7. Reduced residue is not monotone under adjacent moves

For the admissible right move
\[
1110100\longmapsto1101100,
\]
the reduced residue drops from $45$ to $26$.  At weight $3$, the move
\[
11100\longmapsto11010
\]
raises it from $2$ to $4$.  Thus both signs occur even when the move
preserves the first-crossing barrier.

### 8. Canonical first-return cuts do not make $\tau$ additive

Cut a first-crossing word at a least positive coefficient height, so that
the suffix is again first crossing.  The word
\[
{\tt 110110110110101110101010}
\]
has $\tau=257{,}300$, while its canonical suffix
\[
{\tt 110110110101110101010}
\]
has the larger value $479{,}508$.  Therefore neither
$\tau(w)\geq\tau(v)$ nor an additive lower bound by the number of removed
ones can support an induction.

The exact recursion explains the obstruction.  For a split $w=uv$, put
$M_z=2^{k_z}$, $P_z=3^{s_z}$, and let
\[
m_v:=\frac{P_v\tau_v-C_v}{D_v}.
\]
All compatible suffix shadow endpoints have the form
\[
m_{\rm end}=m_v+P_vh,
\qquad
m_{\rm cut}=m_v+\tau_v+M_vh.
\]
Prefix compatibility determines $h$ modulo $P_u$, and the full residue
satisfies
\[
P_u\tau_w
=C_u+(M_u-P_u)m_v+M_u\tau_v+D_wh.
\tag{X2}
\]
The last term is the global wrap.  Controlling its canonical lift is the
same sign problem that the decomposition was meant to solve, so deleting
it would be circular.

### 9. Entropy and cylinder injectivity do not order ordinary representatives

Multiplication by the odd inverse $3^{-L}$ modulo $2^{A+1}$ scrambles the
ordinary order.  At length $10$ and total exponent $11$, lexicographically
successive strict words already give
\[
\begin{array}{c|c}
(1,1,1,1,1,1,1,1,1,2)&\rho=3071,\\
(1,1,1,1,1,1,1,1,2,1)&\rho=2559,\\
(1,1,1,1,1,1,1,2,1,1)&\rho=3839.
\end{array}
\]
Thus both order directions occur in one fixed $(L,A)$ fiber.  More
fundamentally, (E7) bounds the number and total density of cylinders but
does not prevent one isolated nested cylinder from containing a fixed
ordinary integer.  Turning density into eventual growth of the least
representative would require a new deterministic initial-gap theorem.  Such
a theorem is not supplied by injectivity or ultrametric separation.

### 10. Cutting a near-return at its maximum does not bootstrap FCD

Assume a putative canonical FCD failure, so the ordinary plus trajectory is
\[
x_0=\rho\longmapsto Z=\rho+\tau.
\]
Every proper state is strictly above $\rho$, by the prefix coefficient
barrier and the positive prefix carry.  Cut at an interior maximum, and stop
the following block at its own first coefficient crossing.  Write this
block's canonical data as $(\rho_v,Z_v,M_v,P_v,D_v)$ and its actual starting lift as
\[
x_{\rm cut}=\rho_v+tM_v,
\qquad t\geq0.
\]
Its actual endpoint is
\[
y=Z_v+tP_v,
\]
so the observed descent from the maximum is exactly
\[
x_{\rm cut}-y=(\rho_v-Z_v)+tD_v.
\tag{X3}
\]
The nonnegative lift term $tD_v$ can hide either sign of the canonical
suffix margin.  The polynomial bound on the original seed $\rho$ does not
bound $t$: an interior maximum can be exponentially larger than $\rho$,
and the remaining modulus $M_v$ can be small.

The same obstruction appears if we instead cut at a least positive
coefficient height, as required by the first-return recursion (X2).  Denote
this full terminal suffix by $\widehat v$, so its actual endpoint is $Z$, and
write
\[
x_{\rm cut}=\rho_{\widehat v}+tM_{\widehat v},
\qquad Z=Z_{\widehat v}+tP_{\widehat v}.
\]
Put $m_{\widehat v}=P_{\widehat v}-Z_{\widehat v}$.  For a full FCD failure
the signed full shadow endpoint is $m_w=-Z$.  Compatibility gives
\[
m_w=m_{\widehat v}+P_{\widehat v}h.
\]
We therefore obtain the exact wrap
\[
\boxed{h=-(t+1).}
\tag{X4}
\]
Consequently (X2) becomes
\[
P_u\tau_w
=C_u+(M_u-P_u)m_{\widehat v}
 +M_u\tau_{\widehat v}-(t+1)D_w.
\tag{X5}
\]
The final term is not an error estimate.  It is precisely the canonical
wrap whose sign distinguishes the putative failure.  Proving it absent, or
replacing the actual suffix descent in (X3) by canonical descent, would
assume the desired conclusion.  Thus the polynomial-seed dichotomy alone
does not yield a smaller-weight counterexample.

### 11. A least-height cut need not have canonical suffix lift zero

A possible simplification of (X4) would be to prove $t=0$ at the least
positive coefficient-height cut.  This is false at shortcut length $7$.
For
\[
w=1101100
\]
we have
\[
(M,P,D,C,\rho,Z)=(128,81,47,85,59,38).
\]
The least positive height occurs at the cut
\[
110\mid1100.
\]
The actual prefix trajectory is
\[
59\longmapsto89\longmapsto134\longmapsto67.
\]
The suffix $1100$ has $(M_v,\rho_v)=(16,3)$, so
\[
67=3+4\cdot16.
\]
Thus the actual suffix lift is $t=4$, even at the canonical coefficient
cut.  The targeted audit through length $24$ finds lifts as large as
$531{,}302$.  This does not prove that the lifts are unbounded, but it rules
out both the zero-lift induction and any small constant bound.  The updated
program is `inverse/FcdDecompositionSearch.cs`.

### 12. Minimal-failure cell intervals do not close by magnitude

Order a fixed $(k,s)$ ballot lattice by total one-delay, starting from the
front-loaded word (F1).  Suppose that $w$ were a failure of minimal delay.
Every admissible immediate left predecessor is then FCD.  For an incoming
cell use the forward parameters $(L,V,h)$ of (F5)--(F7).  Reversing the
unique sign-losing transition in (F10) gives the necessary inequalities
\[
\boxed{\rho_w<M-L,\qquad \tau_w<V.}
\tag{X6}
\]
Retaining the dual ternary endpoint gives a third inequality.  In a failure
we have $Y=Z=\rho+\tau$.  The predecessor endpoint is $Y+h$, and positivity
of its complementary negative-shortcut path gives
\[
\boxed{Y<P-h.}
\tag{X7}
\]
The exact lower-lift equation is then
\[
\boxed{C=DY+P\tau.}
\tag{X8}
\]

These conditions are sharper than either canonical coordinate alone, but
their real interval hull is still too large.  The exact program
`inverse/FcdMinimalFailureCellAudit.cs` checks all $81{,}103$ nonfront words
through shortcut length $25$.  Neither the $(\rho,\tau)$ rectangle nor the
$(Y,\tau)$ rectangle excludes even one word by magnitude.  The two scalar
conditions also fail separately: for $1101100$ we have
$\tau=26<28=\min V$, whereas for $11010$ we have
$\rho=11<20=\min(M-L)$.  No audited word satisfies both coordinates of
either minimal-failure box, but that last observation is only the existing
finite FCD certificate in new coordinates.  An all-depth proof still needs
the simultaneous modular synchronization in (X6)--(X8).

### 13. Square curl alone does not forbid a failure island

The branch cocycle (F10) has zero total curl on every commuting move square.
That fact alone does not imply a no-island theorem, even when the two move
increments occur in the genuine ballot lattice.  The word
\[
1101101110100
\]
has a commuting pair with
\[
M=8192,\qquad D=1631,\qquad
\Delta_1=768,\qquad\Delta_2=1024.
\]
For the virtual bottom carry $C=11293$, the symmetric-CRT coordinates at
the four corners are
\[
\begin{array}{c|c|c|c}
C&\rho&\tau&E\\ \hline
11293&1795&1275&1\\
12061&1027&1428&1\\
12317&771&1479&1\\
13085&3&1&0.
\end{array}
\tag{X9}
\]
Thus the abstract coloring is $1,1,1,0$ on a genuine cell-parameter square.
The displayed $C$ is not the carry of the displayed bottom word, so (X9) is
not an FCD counterexample.  It proves a precise no-go: commutativity, the
paired wrap thresholds, and zero curl cannot by themselves rule out a
minimal failure.  A successful lattice proof must also use the anchored
order-ideal carry
\[
C=C_0+\sum_{e\in I}\Delta_e,
\]
not an arbitrary CRT coordinate.  The exact witness is generated by
`inverse/FcdCommutingSquareAudit.cs`.

### 14. One omitted ballot inequality already permits non-descent

The full proper-prefix barrier in FCD cannot be weakened to an almost-barrier
estimate.  Consider

\[
w=10111010.
\]

It has length $8$, weight $5$, carry $C=373$, and determinant
$D=2^8-3^5=13$.  Every proper prefix coefficient exceeds one except the
length-two prefix $10$, whose coefficient is exactly $3/4$.  Nevertheless,
the canonical realization is

\[
\rho=9,
\qquad Z=10.
\tag{X10}
\]

The word therefore rises despite missing the ballot cone at only one prefix
and by only the fixed factor (3/4).  Its unique primitive first-crossing
cyclic rotation is

\[
11101010,
\]

with carry $283$, the same determinant $13$, and canonical trajectory
$199\mapsto190$.  Thus cyclic rotation restores the exact ballot condition
and restores descent.  Any continuity argument which tolerates even one
subcritical proper prefix is false.

The exact program `inverse/near_barrier_failure_search.js` checks all binary
words through length $25$.  Among the canonical non-descents it finds this as
the sole nontrivial word minimizing the number and depth of proper-prefix
barrier violations; logarithms are used only to rank the already exact
BigInt classification.  The retained output is
`inverse/near_barrier_failure_search.out`.  This is a regression theorem
about the displayed word and a finite extremal certificate, not evidence
against exact FCD.

## CONDITIONAL

### 1. Finite first-crossing evidence

`inverse/FrontierSearch.cs` exhaustively enumerated every primitive first-crossing word of length at most (30). It found no nontrivial violation of (5). The only zero margins were the boundary words (0) and (10). This is finite evidence for FCD, not a proof.

There is also a directly relevant external computation.  Rozier and Terracol
identify (FCD) with Terras's coefficient-stopping-time conjecture at its first
coefficient crossing and report that conjecture verified for every
$2\le n\le2.8\cdot10^{19}$; see their
[Corollary 5.4](https://arxiv.org/html/2502.00948v5#S5).
Their proof uses independent delay and maximum-excursion record tables.  We
did not re-audit those external tables in this run, so this bound is context
and finite evidence, not an imported all-depth theorem.

`inverse/FcdTauMitm.cs` gives a second exact certificate organized by
weight rather than length.  It uses the equivalent position constraints
\[
0=A_0<\cdots<A_{s-1},
\qquad A_i\leq\lfloor i\log_2 3\rfloor,
\qquad k=\lceil s\log_2 3\rceil.
\]
It splits the positions at $\lfloor k/2\rfloor$, premultiplies every carry
summand by $P^{-1}$ modulo $D$, and uses a sorted nearest-wrap query to find
the exact minimum residue over all compatible pairs.  Combining exhaustive
enumeration through $s=18$ with the split computation certifies
\[
3\tau\geq s
\]
for every primitive first-crossing word of each fixed weight
$2\leq s\leq40$.  This is a finite exact-integer certificate.  It is not an
all-depth proof of (R6), and (R6) remains only a sufficient route to (R5).

The exact minima are highly nonmonotone in $s$.  In particular, the minimum
at $s=27$ is $22$, at $s=29$ it drops to $14$, at $s=31$ it rises to $146$,
at $s=37$ it is $1{,}872$, at $s=38$ it is $2{,}871$, and at $s=39$ it is
$176$, while at $s=40$ it rises to $9{,}419$.  Random sampling does not reliably detect
the rare near-threshold words.

### 2. Stationary-minimum decay in a finite seed window

`inverse/InverseFiberScan.cs` computes the exact first depth at which each odd (n\le N) ceases to be its inverse-fiber minimum. For (N=100000), 49 seeds remained stationary through depth (100). This illustrates why a density or average contraction statement is insufficient: finite survivor sets decay rapidly while retaining long individual rays.

`inverse/CylinderResidueOrdering.cs` gives the corresponding exact cylinder
warning.  The ordinary seed $27$ is the least strict-barrier cylinder
representative at every accelerated length from $4$ through $19$, even
though there are $5{,}936{,}673$ strict cylinders at length $19$.  Direct
iteration shows that its coefficient barrier persists through length $36$
and first crosses at length $37$.  This is finite evidence, not an infinite
counterexample, but it demonstrates how one isolated ordinary residue can
survive while the ambient cylinder density decays exponentially.

### 3. Completion implications

The following implications are rigorous:

1. Stationary inverse-fiber extinction implies Collatz by strong induction.
2. HSCI implies that there are no divergent orbits, using the audited barrier-normalization theorem.
3. FCD excludes the coefficient-crossing branch, including every positive cycle when applied at a least cycle point.
4. FCD and HSCI together imply Collatz.

None of the antecedents in items 1 through 3 has been proved at all depths.

### 4. Exact-integer finite certificate for the one-strip period barrier

The symbolic reduction (C15), together with a finite exact continued-
fraction certificate, gives the conditional numerical bound
\[
r\ge72{,}057{,}431{,}991.
\tag{C16}
\]
The program `inverse/CertifiedLogRatioCF.cs` encloses $\log 2$ and $\log 3$
using only integer arithmetic and the positive series
\[
\log x=2\sum_{k\ge0}\frac{z^{2k+1}}{2k+1},
\qquad z=\frac{x-1}{x+1},
\]
with explicit geometric tail bounds.  It then applies the standard
simplest-rational-in-an-interval continued-fraction algorithm.  In the
slightly broader certified interval
\[
\left(\log_2 3,
\log_2 3+\frac1{3\cdot2^{70}}\right)
\]
the first rational of least denominator is
\[
\frac{114{,}208{,}327{,}604}{72{,}057{,}431{,}991}.
\]
The script independently reproduces the certificate obtained in the cycle
track.  This is a finite, exact-integer computer certificate conditional on
the audited bound $n>2^{71}$ and on the cyclic-shell derivation of (C10).
It is not an all-depth exclusion of cycles: periods beyond (C16), and in
particular the exact denominator case $q=1$, remain untreated.

## REMAINING

### Proof skeleton A, direct inverse-fiber extinction

For each odd $n>1$, prove that there are $r\geq1$ and a word $a$ in the finite box of (1) such that
\[
3^r\mid2^{A_r}U^r(n)-C(a),
\qquad
0<L_a(U^r(n))<n.
\]
Equivalently, prove that the actual affine line cannot remain the positive exposed minimum in every nested envelope.

The unresolved datum is nested exposure. Concavity on one endpoint progression does not compare the different progressions encountered as (r) changes.

### Proof skeleton B, first-crossing descent

For every nontrivial primitive first-crossing word, prove
\[
\rho(w)>Z(w).
\]
The real carry is monotone under the mechanical transposition chain, but (J) is not. The exact remaining sublemma is a bound on the cumulative wrap cocycle which is strong enough to preserve positivity of (J), not monotonicity at each move.

In the reduced-modulus coordinates, the exact target is
\[
M\tau-C>0.
\tag{B1}
\]
Equivalently, for the dual ternary representative in (T10), exclude
\[
\frac CM\le Y\le\frac CD.
\tag{B2}
\]
In the reduced $q$-shadow coordinates, a nonintegral counterexample must
have the normal form (T14).  The integral case $q=1$ is the exact upper
endpoint (T15), so any cycle exclusion must rule out equality there rather
than only the interior of (B2).

The front-loaded vertex (F1) is now proved FCD at every nonboundary weight.
Consequently an equivalent lattice target is the local paired-wrap theorem
\[
\boxed{\eta=\chi}
\tag{B3}
\]
for every admissible edge (F5)--(F8), provided its proof does not invoke the
target margin.  A minimal counterexample to (B3) must satisfy all three
incoming-cell inequalities (X6)--(X8).  Real interval bounds and square curl
do not close them; (X9) shows that the actual anchored carry structure is
essential.

The sharper-looking modular inequality $3\tau\geq s$ is sufficient by
(R3), but it is not known to be necessary.  The next proof attempt must do
one of the following:

1. prove $3\tau\geq s$ from the ballot constraints on the positions
   $A_i$ and the cumulative wrap identity (R7); or
2. for every exceptional residue with $3\tau<s$, prove the exact margin
   (B1) directly.

An induction through a first-return cut must retain the integer $h$ in
(X2).  Adjacent-swap monotonicity, suffix monotonicity, and the stronger
half-residue bound are all false.

The dual polynomial-seed reduction narrows, but does not close, this gate.
Every exact FCD failure has
\[
\rho<305s^{14.3},
\]
and every descent-branch failure of the sufficient one-third bound has the
negative-shadow start $M-\rho<305s^{14.3}$.  Cutting such a near-return at
an orbit maximum introduces the lift term $tD_v$ in (X3).  At the canonical
coefficient cut the same obstruction is exactly
$h=-(t+1)$ in (X4), producing the wrap term in (X5).  A smaller-weight
counterexample does not follow unless this lift is controlled, and
controlling it is the original FCD sign problem.

### Proof skeleton C, no divergent orbits

Prove HSCI in the integer-only form (6). By (7), this is exactly the theorem that no divergent orbit exists. A valid proof must use more than finite support itself, since after the last nonzero (b_k), the recursion for (z_k) is precisely the ordinary shortcut Collatz recursion.

### Proof skeleton D, exclude positive cycles in the one-strip class

Let $a$ be a primitive exponent word with
\[
A=\lceil r\log_2 3\rceil,\qquad a_0=1,\qquad
A_i\log2-i\log3<A\log2-r\log3\quad(i<r).
\]
Prove
\[
2^A-3^r\nmid C(a).
\tag{C17}
\]
Equivalently, prove that the invariant reduced denominator $q$ in (C2) is
not $1$.  The result must use an arithmetic feature that distinguishes
$q=1$ from $q=5$: the explicit cycle (C6) satisfies all currently known
real, record, primitive, first-crossing, and local-valuation constraints.
At a proper positive-height cut, (C9) is the exact integrality-sensitive
subproblem.  When no proper height is positive, (C17) is precisely the
restricted first-crossing descent problem for the terminal one-strip word.

### Exact blockers

1. The min-plus envelope has an infinite nested-geodesic problem. Finite-depth computability does not give a uniform depth of extinction.
2. Carry order and seed order separate through binary wraps. Both signs occur millions of times in finite data.
3. HSCI does not reduce divergence to a weaker combinatorial assertion. It is equivalent to divergence exclusion once ordinary lifting is retained.
4. The ordinary-integer lift cannot be replaced by a (2)-adic compactness limit. Every finite prefix has terminating ordinary realizations, while the limiting (2)-adic object need not be nonnegative.
5. Cyclic minimality and one-strip geometry do not force a useful gcd gap.
   The primitive example (C6) attains the maximal proper gcd $D/5$.
   The only remaining distinction is the exact ordinary denominator $q=1$.
6. Strict-barrier cylinder entropy is smaller than the dyadic scale only in
   density.  An isolated compatible representative can persist, as seed
   $27$ does through $36$ accelerated barrier steps.  Injectivity and
   ultrametric separation do not force the initial cylinder gap to grow.

No full proof, cycle exclusion, or divergence exclusion has been obtained in
this track.  The strongest unconditional results here are the finite
affine-envelope theorem (1), the exact reduced-modulus and signed-shadow
reductions (R1)--(R14), the eventually-periodic HSCI exclusion, the exact
cyclic-denominator invariant (C1)--(C5), and the integrality-sensitive split
identities (C9), (X2), and (X5), together with the dual ternary and
$q$-shadow equivalences (T1)--(T17).  Exact computation proves the sufficient
one-third residue bound, and hence FCD, at every fixed weight $s\leq40$.
The all-weight assertion $M\tau-C>0$ remains the precise unresolved gate.
The numerical period barrier (C16) is an exact finite computer certificate
under the separately audited cycle inputs, not a proof of all-depth cycle
exclusion.

### Source hashes

The final source artifacts used in this track have SHA-256 digests

\[
\begin{array}{c|c}
\texttt{inverse/InverseFiberSkeleton.lean}&
\texttt{575293BB88ECABA43BE525C3C1431BFCCC15DC7A1781C1E107DBEAB918C054C2}\\
\texttt{inverse/FcdTauMitm.cs}&
\texttt{D189875894D621437ADC5DFC8283EE19FDB335401B132B3AF205BC70CA7D2F94}\\
\texttt{inverse/FcdLowTauTargetSearch.cs}&
\texttt{CC48716279E8E86FD08E3799ACDF43BB8F3DB24B919F97F69A4B186AB8788217}\\
\texttt{inverse/CylinderResidueOrdering.cs}&
\texttt{7A20E3C4AB8EFDB9262061D48054E696E7FC1FF813FD4BE7C9F226A9E31DEC20}\\
\texttt{inverse/FcdDecompositionSearch.cs}&
\texttt{DA9C3A3C2B3B57CA7AE27EF145552AF2A64880A6C033B513935134D65274A734}\\
\texttt{inverse/dual\_ternary\_fcd.js}&
\texttt{F2EC00633F6C60A3495EEAA4115D9B56FF49D0659DCDEC3B2F2C9B6BBF946616}\\
\texttt{inverse/FcdFrontLoadedBaseCertificate.cs}&
\texttt{4D5E91B9C159A19D0B645B3281888517840CF0AED28F67465B9FD833A9E42023}\\
\texttt{inverse/FcdTranspositionBranchAudit.cs}&
\texttt{A28144270E845B3748A3076CF64871FC15562DEA3117AA9896A71301F6DFB618}\\
\texttt{inverse/FcdMinimalFailureCellAudit.cs}&
\texttt{E5BC0BC2F81DE759D7186E15D7DDDD2321547D291C2C9DF0BD72C1466CC514A5}\\
\texttt{inverse/FcdCommutingSquareAudit.cs}&
\texttt{6A6B63908038AE3FDEFF5A02FC574164EECB526AF8957DC3F56ACF342E499E89}\\
\texttt{inverse/near\_barrier\_failure\_search.js}&
\texttt{B170F6E1688DE09E7F5CE1F5E2D2D5185FC7FDC77AAB020CB98D828CF4F64AB8}\\
\texttt{inverse/near\_barrier\_failure\_search.out}&
\texttt{94C343A08E56B562E97A2AB3D6E43420DC1F4649E04687DBBF4F6E0CE178178E}
\end{array}
\]

## PROVED ADDENDUM: stationary nested exposure

### 1. Concatenation and the exact Bellman recursion

We now isolate the nested-envelope statement in Proof skeleton A.  Put

\[
X_j:=U^j(n),\qquad a_j:=v_2(3X_j+1).
\]

For an odd integer $x$ not divisible by $3$, define

\[
\mathcal E(x):=\{e\geq1:2^e x\equiv1\pmod3\},
\qquad
P_e(x):=\frac{2^e x-1}{3}.
\tag{A1}
\]

Thus $P_e(x)$ is the positive odd predecessor of $x$ with valuation $e$.
Let

\[
\mathcal A_d(x):=\{z\geq1:z\text{ is odd and }U^d(z)=x\},
\qquad
B_d(x):=\min\mathcal A_d(x),
\tag{A2}
\]

where the minimum is $+\infty$ if the set is empty.  In particular,
$B_0(x)=x$ and $M_d(n)=B_d(X_d)$.

If $p$ and $q$ are exponent words of lengths $r$ and $s$, respectively,
then direct substitution gives

\[
C(pq)=3^sC(p)+2^{A(p)}C(q),
\qquad
L_{pq}(X)=L_p(L_q(X)).
\tag{A3}
\]

Consequently the full, infinitely branching Bellman recursion is

\[
\boxed{
B_{r+s}(X)=\min_{y\in\mathcal A_s(X)}B_r(y).
}
\tag{A4}
\]

This formula is exact and does not make a greedy choice at either level.

For $j\geq0$, define the best line whose last deviation from the actual word
occurs at position $j$ by

\[
\Theta_j(n):=
\min_{\substack{e\in\mathcal E(X_{j+1})\\e\neq a_j}}
B_j(P_e(X_{j+1})).
\tag{A5}
\]

An empty minimum is again $+\infty$.

**Lemma A1, last-deviation decomposition.** For every $R\geq1$,

\[
\boxed{
M_R(n)=\min\{n,\Theta_0(n),\ldots,\Theta_{R-1}(n)\}.
}
\tag{A6}
\]

In particular,

\[
\boxed{M_{R+1}(n)=\min\{M_R(n),\Theta_R(n)\}.}
\tag{A7}
\]

**Proof.** Let $b$ be the valuation word of a depth-$R$ ancestor of $X_R$.
If $b=(a_0,\ldots,a_{R-1})$, deterministic reconstruction gives the start
$n$.  Otherwise, let $j$ be the last index at which $b_j\neq a_j$.
Reversing the common suffix from $X_R$ gives $X_{j+1}$.  The state immediately
before that suffix is $P_{b_j}(X_{j+1})$, and the original ancestor is a
depth-$j$ ancestor of this state.  Its value is therefore at least
$\Theta_j(n)$.  Conversely, a minimizing prefix in (A5), followed by the
letter $e$ and the actual suffix, is a depth-$R$ ancestor of $X_R$.  This
proves (A6), and (A7) follows. $\square$

Thus the actual line is exposed at every depth if and only if

\[
\Theta_j(n)\geq n\qquad(j\geq0).
\tag{A8}
\]

### 2. Exact exposure-loss cutoff and suffix congruence

There are only finitely many sibling exponents which can violate (A8) at a
fixed $j$.  Indeed, if $z<n$ and
$U^j(z)=P_e(X_{j+1})$, then $z\leq n-2$.  For every positive odd $x$,

\[
U(x)+1\leq\frac32(x+1),
\tag{A9}
\]

with equality exactly when $v_2(3x+1)=1$.  Iteration gives the necessary
exposure-loss threshold

\[
\boxed{
2^j\bigl(2^eX_{j+1}+2\bigr)
\leq3^{j+1}(n-1).
}
\tag{A10}
\]

In other words, every exponent above the finite cutoff in (A10) is harmless.
The surviving exponents still face an exact growing-modulus condition.  If
$b$ is the length-$j$ valuation prefix of $z$, $B:=A(b)$, and $C(b)$ is its
carry, then

\[
2^{B+e}X_{j+1}
=3^{j+1}z+3C(b)+2^B.
\tag{A11}
\]

Equivalently,

\[
2^{B+e}X_{j+1}\equiv3C(b)+2^B\pmod{3^{j+1}}.
\tag{A12}
\]

The right side is precisely the carry of the concatenated word $(b,e)$.
Equations (A10) and (A12) give a finite exact test at each depth.  They do not
give a finite-state test as $j$ varies, since both the inverse prefix and the
modulus $3^{j+1}$ grow.

### 3. The periodic-tail proposal is equivalent to divergence exclusion

Define synchronous coalescence on the positive odd integers by

\[
x\sim y
\quad\Longleftrightarrow\quad
U^r(x)=U^r(y)\text{ for some }r\geq0.
\tag{A13}
\]

This is an equivalence relation.  If two equalities occur at different
depths, we apply enough further iterates to both equalities to reach their
maximum depth.

**Lemma A2.** A seed $n$ satisfies $M_r(n)=n$ for every $r\geq0$ if and only
if $n$ is the least element of its synchronous-coalescence class.

**Proof.** Every depth-$r$ ancestor of $X_r$ belongs to the class of $n$.
Thus a smaller ancestor exists at some depth exactly when the class contains
an element smaller than $n$. $\square$

We also need the following elementary integrality fact.

**Lemma A3.** A positive accelerated orbit has an eventually periodic
valuation sequence if and only if its state sequence is bounded.

**Proof.** A bounded integer orbit is eventually periodic, hence so is its
valuation sequence.  Conversely, suppose that a valuation block of length
$p$, total exponent $A$, and carry $C$ repeats forever after some state
$x_0$.  Put $P:=3^p$ and $Q:=2^A$.  The states at successive block boundaries
satisfy

\[
Qx_{m+1}=Px_m+C.
\]

Iteration and multiplication by $P-Q$ give

\[
(P-Q)Q^m x_m
=P^m\bigl((P-Q)x_0+C\bigr)-CQ^m.
\tag{A14}
\]

Since $\gcd(P,Q)=1$, we have

\[
Q^m\mid (P-Q)x_0+C
\qquad(m\geq1).
\]

The fixed integer on the right must be zero.  Hence $Q>P$ and
$x_0=C/(Q-P)$, so the state itself repeats after one block. $\square$

**Theorem A4, equivalence barrier.** The following statements are
equivalent:

1. every positive odd seed whose actual line remains exposed at every depth
   has an eventually periodic valuation tail;
2. there is no unbounded accelerated Collatz orbit.

**Proof.** If every orbit is bounded, Lemma A3 gives statement 1.  Conversely,
suppose that $m$ has an unbounded orbit.  Its synchronous-coalescence class
has a least element $n$.  Lemma A2 says that the actual line of $n$ remains
exposed at every depth.  Since $n\sim m$, the two orbits eventually agree at
the same time and the orbit of $n$ is also unbounded.  Lemma A3 says that its
valuation tail is aperiodic, contradicting statement 1. $\square$

Therefore the proposed infinite exposure lemma is not a weaker compactness
or pumping statement.  It is exactly the assertion that divergent orbits do
not exist.

### 4. Finite persistence and an exact fixed-seed regression

There is no seed-independent finite exposure bound.  For arbitrary
$R,h\geq1$, put

\[
n_{R,h}:=2^{R+h}-1.
\]

Its first $R$ valuations are all $1$, and

\[
U^R(n_{R,h})=2^h3^R-1.
\]

If $U^R(z)=U^R(n_{R,h})$, then (A9) gives

\[
2^h3^R=U^R(z)+1
\leq\left(\frac32\right)^R(z+1).
\]

It follows that $z\geq2^{R+h}-1=n_{R,h}$.  Thus

\[
M_r(n_{R,h})=n_{R,h}\qquad(0\leq r\leq R).
\tag{A15}
\]

The fixed seed $837799$ gives a nonperiodic finite regression.  The exact
program `inverse/StationaryExposureCertificate.cs` iterates every one of the
$418899$ smaller positive odd seeds.  It proves

\[
M_r(837799)=837799\quad(0\leq r\leq194),
\qquad
M_{195}(837799)=1.
\tag{A16}
\]

Here $X_{194}=5$ and $X_{195}=1$.  The exposed length-$194$ valuation word
has least period $194$ and has no square suffix.  Its comma-separated ASCII
encoding has SHA-256 digest

\[
\texttt{F22FAFD8E78BC314A0CBDA2FA5BA58FED3F25D0EE448432CA994288095EDE04E}.
\]

The largest state encountered in the checked scan is $18{,}997{,}161{,}173$,
so checked unsigned $64$-bit arithmetic is exact throughout.  This example
rules out the finite assertion that a long exposed prefix must itself be
periodic, or even end in two copies of a common block.  It does not refute
the infinite statement in Theorem A4.

The source digests for this addendum are

\[
\begin{array}{c|c}
\texttt{inverse/StationaryExposureCertificate.cs}&
\texttt{E3B28C84C4CE36E5F302B16FD27EEB5A7CCC9F9BFFD16C872FA481E7F869539C}\\
\texttt{inverse/run\_stationary\_exposure\_certificate.ps1}&
\texttt{C9F23098006766F8ECA09D55A281AFBF8169302B0C802031618F2B7DE2D3B9E2}
\end{array}
\]

The exact infinite-only missing lemma is now (A8), equivalently: every
aperiodic positive accelerated orbit has some $j\geq0$, some
$e\in\mathcal E(X_{j+1})\setminus\{a_j\}$ satisfying (A10), and some positive
odd $z<n$ satisfying (A11).  By Theorem A4, proving this assertion is already
a proof that no divergent Collatz orbit exists.
