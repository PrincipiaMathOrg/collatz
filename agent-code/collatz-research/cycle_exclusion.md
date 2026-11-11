# Positive-cycle exclusion ledger

**Updated:** 17 August 2026  
**Target:** exclude every primitive positive accelerated Collatz cycle other
than the fixed point `1`.

This file uses the accelerated odd map

\[
U(x)=\frac{3x+1}{2^{v_2(3x+1)}}.
\]

For a word \(w=(a_0,\ldots,a_{r-1})\), put

\[
A_i=\sum_{j<i}a_j,\qquad
C_w=\sum_{i=0}^{r-1}3^{r-1-i}2^{A_i},\qquad
D=2^A-3^r,\quad A=A_r.
\]

## Scope and dependencies

We work with a primitive nontrivial positive accelerated cycle.  Thus every
letter \(a_i\) is a positive integer, every cycle state is a positive odd
integer, and the \(r\) accelerated states are distinct.  The one-strip
theorem and every consequence through P6 use one external input: the
published computation quoted in the audit verifies convergence for every
ordinary seed below \(2^{71}\).  Therefore the least state of a nontrivial
cycle is greater than \(2^{71}\), and we may use the weaker closed bound
\(M:=2^{71}\).

The finite certificates use only exact integer arithmetic for proof
comparisons.  Floating-point values, when printed, are diagnostic.  P7
separately imports the stated Simons--de Weger linear-form estimate and is
not needed for P1--P6.

## Updating proof skeleton

1. **PROVED:** A positive cycle with word \(w\) is equivalent to
   \(D>0\) and \(D\mid C_w\).  Divisibility alone reconstructs all exact
   valuations; it is not merely a necessary terminal congruence.
2. **PROVED:** Rotating a primitive cycle to its least odd state gives the
   strict suffix-record inequalities
   \(2^{A-A_i}>3^{r-i}\) for every \(i<r\).
3. **PROVED, computer-assisted:** using the verified lower bound
   \(x_{\min}>2^{71}\), cyclic shell injection gives
   \(0<A\log 2-r\log 3<0.685<\log 2\).  Consequently
   \[
   A=\lceil r\log_2 3\rceil.
   \]
   This improves the audit's twelve-strip theorem to one strip.
4. **PROVED, computer-assisted:** the carry bound plus exact continued-
   fraction/Farey arithmetic gives
   \[
   r\ge72{,}057{,}431{,}991.
   \]
5. **PROVED:** on the admissible deficit lattice, a denominator-one word
   has maximal-denominator unit neighbors, and every one-coordinate line
   contains at most one denominator-one word.
6. **PROVED:** the integer lift produces a positive simple ordinary
   \(3m-1\) shortcut shadow whose endpoints differ by exactly \(D\).
   A denominator-\(q\) rational word instead produces a \(3m-q\) shadow.
7. **PROVED, with the linear-form input in P7:** every nonzero binary
   coefficient first crossing of weight \(s\) has gap \(D>s/3\).  Its
   canonical displacement therefore has exactly two possible lifts modulo
   \(D\), and First-Crossing Descent is the sign of one explicit integer
   margin.
8. **PROVED:** every unit-letter cyclic rotation of a denominator-one word
   produces a positive Ferrers-cell sum divisible by the full determinant.
   There are at least \(2r-A\) such wraps.  For denominator \(q>1\), each
   corresponding sum has gcd exactly \(D/q\) with \(D\), so the \(q=5\)
   countermodel fails all of them at precisely its missing factor.
9. **PROVED:** the Ferrers size bounds are sharp, and even the tighter
   strict-record interval has width at least \(D\) for every \(r\ge5\).
   It therefore always contains a full-determinant multiple, and explicit
   primitive witnesses bracket such a multiple even when the mechanical
   upper endpoint is imprimitive.  Furthermore, one full wrap is already
   equivalent to \(q=1\), so the linearly many wraps are perfectly
   correlated and give no independent congruences.
10. **REMAINING:** for every \(r\) above that barrier, exclude
   \[
   2^{\lceil r\log_2 3\rceil}-3^r\mid C_w
   \]
   for every primitive strict-record word whose quotient is at least
   \(2^{71}\).  This is the exact surviving integer-lift obstruction.

The skeleton is deliberately not marked complete: item 10 is a uniform
Diophantine problem and is exactly where the attempted proof currently stops.

## PROVED

### P1. Divisibility is sufficient for an exact positive cycle

Suppose \(D>0\).  If \(D\mid C_w\), put \(x=C_w/D\).  Both \(C_w\) and
\(D\) are odd, so \(x\) is a positive odd integer.  If \(w'=\operatorname{rot}(w)\)
is the one-letter left rotation, direct affine composition gives

\[
2^{a_0}C_{w'}=3C_w+D. \tag{P1.1}
\]

Thus \(D\mid C_{w'}\) and

\[
\frac{C_{w'}}D=\frac{3x+1}{2^{a_0}}.
\]

The quotient \(C_{w'}/D\) is again odd.  Hence
\(v_2(3x+1)=a_0\), not merely \(v_2(3x+1)\ge a_0\).  Iterating rotations
reconstructs a positive exact cycle.  The converse is equation (11.4) of the
audit:

\[
(2^A-3^r)x=C_w.
\]

The same identity proves

\[
\gcd(D,C_{\operatorname{rot}(w)})=\gcd(D,C_w). \tag{P1.2}
\]

Consequently the reduced denominator

\[
q(w)=\frac{D}{\gcd(D,C_w)} \tag{P1.3}
\]

is invariant under cyclic rotation.  The desired integer case is exactly
\(q(w)=1\).  If \(w=B^N\), the usual geometric-series formula shows that
\(q(w)=q(B)\), so a primitive cycle is the only case that needs exclusion.

### P2. Strict record at the least state

Let \(x=x_0\) be the least state of a primitive cycle.  The suffix of length
\(r-i\) maps \(x_i\ge x\) back to \(x\) and has positive affine carry.  Its
multiplicative coefficient must therefore be strictly below one:

\[
\frac{3^{r-i}}{2^{A-A_i}}<1.
\]

Equivalently, with \(\eta_i=A_i-i\log_2 3\),

\[
\eta_i<\eta_r\qquad(i<r). \tag{P2.1}
\]

This is the cycle analogue of the strict terminal-record equation in the
marked-carry paper.

### P3. Cyclic shell injection with a minimum constraint

Let \(T\) be the shortcut map and expand a primitive accelerated cycle into
its simple shortcut cycle.  Fix a shell \([2^k,2^{k+1})\), and count only its
odd cycle states.  Write such a state as \(x=2^k+u\), \(0\le u<2^k\), and
let \(o\) be the number of odd inputs in the next \(k\) shortcut steps.
Equal-time translation gives

\[
T^k(x)=T^k(u)+3^o. \tag{P3.1}
\]

The signed comparison with \(u-2^k<0\) shows

\[
0\le z:=T^k(u)<3^o. \tag{P3.2}
\]

Here we extend the shortcut formula to \(\mathbf{Z}\).  Every negative
integer remains negative under this extension.  Since \(u\) and
\(u-2^k\) have the same first \(k\) parities,

\[
T^k(u)-T^k(u-2^k)=3^o.
\]

This proves the strict upper bound in (P3.2).  The endpoint \(u=0\) is also
valid: \(T^k(-2^k)=-1\), \(T^k(0)=0\), and \(o=0\).  Actual shell points in
the present count are odd, so their \(u\) is odd and nonzero.

At fixed \(o\), two shell points with the same \(z\) have the same future
cycle state and hence are equal.  Therefore this is an injection, with no
`+k` endpoint loss (the trajectory is cyclic).

There are at most \(\binom{k-1}{o-1}\) parity words because the shell point
is odd.  Put \(p=3^o\) and let \(M\) be the least accelerated odd state.
The future shortcut state is \(y=z+p\in[p,2p)\).  Writing uniquely
\(y=2^t v\), its odd part \(v\) is an accelerated cycle state, so

\[
v\ge M,\qquad v\equiv1,5\pmod6.
\]

Define the exact endpoint capacity

\[
E_M(p)=\#\{y\in[p,2p):\operatorname{oddpart}(y)\ge M,
\ 3\nmid\operatorname{oddpart}(y)\}. \tag{P3.3}
\]

Then the number \(N_k\) of accelerated odd states in the shell satisfies

\[
N_k\le
\sum_{o=1}^k\min\left\{\binom{k-1}{o-1},E_M(3^o)\right\}. \tag{P3.4}
\]

This is a strictly sharper cyclic/minimum-dependent version of the audit's
finite-path shell bound.

### P4. One-strip theorem

Use the verified ordinary-seed result quoted in the audit: a nontrivial
cycle has \(M>2^{71}\).  The exact script
[`cycles/cyclic_shell_one_strip.js`](cycles/cyclic_shell_one_strip.js)
evaluates (P3.4) for \(71\le k\le1000\).

If \(N\) eligible odd nonmultiples of three lie in the \(k\)-th shell, their
increasing ordering is bounded below by \(2^k+3j\), \(0\le j<N\).  With
\(a=2^k\), \(n=N-1\), integral comparison and
\(\log(1+t)\le t-t^2/2+t^3/3\) for \(0\le t\le1\) give

\[
\sum_{j=0}^{N-1}\frac1{3(a+3j)}
\le \frac{N}{3a}-\frac{n^2}{2a^2}+\frac{n^3}{a^3}. \tag{P4.1}
\]

Every finite comparison is upward-rounded at scale \(10^{18}\).  The exact
outputs are

```text
scaled_prefix_upper=684998756684814033
scale=1000000000000000000
tail_upper=1600/22548578304
certified_total_lt_0_685=true
one_strip_certificate_passed=true
```

For the tail, take \(t=\lfloor61k/100\rfloor\).  For \(k\ge1001\), we have
\(t\ge609(k-1)/1000\).  Chernoff and the exact integer inequalities

\[
3^{61}<2^{97},\qquad
  1000^{1000}<2^{970}609^{609}391^{391}
\]

give \(N_k<2\,2^{97k/100}\).  Blocks of one hundred shells give the stated
tail \(1600/(21\,2^{30})\).

The cycle product is

\[
\Lambda:=A\log 2-r\log 3
=\sum_{i=0}^{r-1}\log\left(1+\frac1{3x_i}\right)
<\sum_i\frac1{3x_i}<0.685. \tag{P4.2}
\]

Also

\[
\log 2>2\left(\frac13+\frac{(1/3)^3}{3}\right)
=\frac{56}{81}>0.69.
\]

Thus \(0<A-r\log_2 3<1\), proving

\[
\boxed{A=\lceil r\log_2 3\rceil}. \tag{P4.3}
\]

### P5. A 72,057,431,991 odd-step barrier

Put \(\alpha=\log_2 3\) and
\(\theta=A-r\alpha\in(0,1)\).  From the strict-record inequalities,
every carry summand obeys

\[
\frac{3^{r-1-i}2^{A_i}}{2^A}<\frac13.
\]

Hence \(C_w/2^A<r/3\).  Since \(D x=C_w\) and \(x\ge M=2^{71}\),

\[
1-2^{-\theta}=\frac{D}{2^A}<\frac{r}{3M}. \tag{P5.1}
\]

Concavity gives \(1-2^{-\theta}\ge\theta/2\), so

\[
0<\frac Ar-\alpha=\frac\theta r<\frac{2}{3M}. \tag{P5.2}
\]

The exact script
[`cycles/continued_fraction_barrier.js`](cycles/continued_fraction_barrier.js)
uses rigorous atanh-series intervals for \(\log 2\) and \(\log 3\) and verifies

\[
\frac{103768467013}{65470613321}
<\alpha<
\frac{10439860591}{6586818670}, \tag{P5.3}
\]

the determinant-one identity

\[
10439860591\cdot65470613321
-103768467013\cdot6586818670=1, \tag{P5.4}
\]

and that the upper neighbor in (P5.3) lies more than \(2/(3M)\) above
\(\alpha\).  Reduce \(A/r=p/q\).  By (P5.2), \(p/q\) lies strictly between
\(\alpha\) and that upper neighbor.  A rational strictly between Farey
neighbors has denominator at least the sum of their denominators.  Therefore

\[
q\ge65470613321+6586818670=72057431991,
\]

and \(r\ge q\), proving

\[
\boxed{r\ge72{,}057{,}431{,}991}. \tag{P5.5}
\]

The strict-record carry admits a sharper mechanical bound.  Indeed, put

\[
s_j:=2^{\alpha j-\lceil\alpha j\rceil}\qquad(j\ge1).
\]

Then

\[
\frac{C_w}{2^A}<\frac13\sum_{j=1}^r s_j. \tag{P5.6}
\]

Let \(\beta:=\log_2(3/2)\) and \(f(t):=2^{t-1}\).  We have
\(s_j=f(\{j\beta\})\).  On every interval between its discontinuities, the
function

\[
F(t):=\sum_{j=0}^{99}f(\{t+j\beta\})
\]

is strictly increasing.  Its one-sided suprema at the discontinuities are
rational because \(2^\beta=3/2\).  The exact certificate
[mechanical_carry_block.js](cycles/mechanical_carry_block.js)
checks all one hundred possibilities and proves

\[
\sup_tF(t)
=\frac{
13888672239254370027253087389412840783740797166485
}{
190665273466065440514406208404995600985652133888
}
<72.9. \tag{P5.7}
\]

Consequently,

\[
\sum_{j=1}^r s_j
<72.9\left\lfloor\frac r{100}\right\rfloor+(r\bmod100), \tag{P5.8}
\]

and

\[
0<\frac Ar-\alpha
<\frac{2}{3Mr}\left(
72.9\left\lfloor\frac r{100}\right\rfloor+(r\bmod100)
\right). \tag{P5.9}
\]

This refinement does not increase the denominator barrier.  The first
Farey mediant is

\[
\frac{114208327604}{72057431991}.
\]

The continued-fraction certificate proves that this rational is above
\(\alpha\), but still lies inside the refined window in (P5.9), even after
using \(r\ge72057431991\).  In other words, the strict-record scalar carry
bound is exhausted at this first mediant.  Any further exclusion must use
the residue \(D\mid C_w\), rather than only the size of \(C_w/D\).

### P6. Mechanical carry envelope and exact residue target

In the one strip, (P2.1) is equivalent to

\[
A_i\le P_i:=A-\lceil\alpha(r-i)\rceil. \tag{P6.1}
\]

Thus the carry is bounded by the reversed mechanical envelope

\[
C_w\le C_{\max}(r):=
\sum_{i=0}^{r-1}3^{r-1-i}2^{P_i}. \tag{P6.2}
\]

A necessary scalar condition is

\[
M(2^A-3^r)\le C_{\max}(r). \tag{P6.3}
\]

More exactly, put \(d_i=P_i-A_i\).  Then \(d_0=d_r=0\),
\(0\le d_i\le P_i\), and positivity of the letters is the nearest-neighbor
constraint

\[
d_{i+1}-d_i\le P_{i+1}-P_i-1. \tag{P6.4}
\]

The surviving carry-residue problem is

\[
\boxed{
\sum_{i=0}^{r-1}3^{r-1-i}2^{P_i-d_i}
\equiv0\pmod{2^{\lceil\alpha r\rceil}-3^r}.
} \tag{P6.5}
\]

This is a precise uniform target.  The strip and record inequalities alone
do not force a contradiction in (P6.5).

### P7. What a rigorous linear-form bound actually gives

Simons--de Weger's updated cycle paper derives from Rhin's estimate

\[
\Lambda>
\exp\{-13.3(0.46057+\log r)\}
=e^{-6.125581}r^{-13.3}. \tag{P7.1}
\]

On the other hand, (P2.1) and (P4.3) give

\[
C_w<2r3^{r-1},\qquad
D=3^r(e^\Lambda-1)>3^r\Lambda.
\]

Therefore

\[
x=\frac{C_w}{D}
<\frac{2r}{3\Lambda}
<\frac23e^{6.125581}r^{14.3}
<305r^{14.3}. \tag{P7.2}
\]

This is a polynomial upper bound, not a contradiction.  The verified
minimum only yields \(r>(2^{71}/305)^{1/14.3}>20\), far weaker than (P5.5).

The minimum-dependent shell estimate also cannot close this gap.  Without
using the special value \(M=2^{71}\), the same Chernoff argument gives the
uniform coarse bound

\[
\Lambda<153\,x^{-3/100}. \tag{P7.3}
\]

Combining (P7.3) with (P7.1) gives only

\[
x<\bigl(153e^{6.125581}\bigr)^{100/3}r^{443\frac13}, \tag{P7.4}
\]

which is much weaker than (P7.2).  Even optimizing the entropy threshold
solves
\(H(p)=p\log_2 3\), giving decay exponent about \(0.0346156\) and hence a
power about \(13.3/0.0346156=384.22\), still far worse than \(14.3\).

This quantifies the obstruction: the shell method is strong enough to cross
the discrete threshold \(\Lambda<\log 2\), but its power-saving decay is far
too weak to oppose the available two-logarithm lower bound uniformly.

### P8. Elementary deficit moves and the denominator cliff

Fix \(r\) and \(A\).  Increasing one internal prefix \(A_i\) by one, while
leaving every other prefix fixed, is the admissible local transfer

\[
(a_{i-1},a_i)\longmapsto(a_{i-1}+1,a_i-1).
\]

Equivalently, \(d_i\) decreases by one.  Directly from the carry sum,

\[
C(d-e_i)-C(d)
=3^{r-1-i}2^{P_i-d_i}. \tag{P8.1}
\]

The right side is a unit modulo \(D\).  More generally, if
\(g:=\gcd(D,C(d))\), then

\[
\gcd\bigl(g,C(d-e_i)\bigr)=1. \tag{P8.2}
\]

Indeed, every prime divisor of \(g\) divides \(C(d)\), while (P8.1) is
nonzero modulo that prime.  In particular, if \(q(d)=1\), every admissible
unit neighbor has

\[
\gcd(D,C(d-e_i))=1,\qquad q(d-e_i)=D. \tag{P8.3}
\]

Thus a denominator-one word is surrounded by maximal-denominator words.
We call (P8.3) the denominator cliff.

There is also uniqueness along an entire coordinate line.  If two words
with the same \(r,A\) differ only by changing \(A_i\) by \(h>0\), then

\[
C'-C
=3^{r-1-i}2^{\min(A_i,A_i')}(2^h-1). \tag{P8.4}
\]

If both words had denominator one, then \(D\mid 2^h-1\).  Positivity of all
letters gives \(h\le A-r\).  On the other hand, P7, P5, and the first carry
summand give

\[
D=\frac{C}{x}>
\frac{3^{r-1}}{305r^{14.3}}>2^{A-r}. \tag{P8.5}
\]

For completeness, the last comparison follows from
\(2^A<2\cdot3^r\) and \(2^r>1830r^{14.3}\).  The stronger integer inequality
\(2^r>1830r^{15}\) holds for every \(r\ge200\): it holds at \(r=200\), and
the quotient \(2^r/r^{15}\) is increasing thereafter.  Since P5 gives
\(r>200\), (P8.5) applies.  We obtain

\[
0<2^h-1<D,
\]

which is impossible.  Therefore:

\[
\boxed{\text{Every admissible one-coordinate line contains at most one
denominator-one word.}} \tag{P8.6}
\]

This is a genuine order-rigidity statement, but it is not yet a descent.
Cyclic rotations of a cycle all have denominator one and normally differ
in many deficit coordinates at once.

The obstruction for a longer excursion can be localized exactly.  If
\(w=uv\), affine composition gives

\[
C_w=3^{|v|}C_u+2^{A(u)}C_v. \tag{P8.7}
\]

Hence, for every prime \(p\mid D\) with \(p\mid C_w\),

\[
p\mid C_u\quad\Longleftrightarrow\quad p\mid C_v. \tag{P8.8}
\]

Thus a modulus factor that survives a plateau excursion must occur in both
complementary block carries.  This paired-factor phenomenon is real, as R4
below shows, so (P8.6) cannot be extended by simply declaring all proper
block carries to be units.

The exact regression certificate
[deficit_residue_moves.js](cycles/deficit_residue_moves.js) checks (P8.1)
and (P8.2) on every admissible unit move from the trivial words
\((2)^r\), \(1\le r\le20\), and on the primitive denominator-five word.
The same certificate checks the paired shadows, every local-minimum block,
and the binary/ternary boundary representatives used below.

### P9. The denominator-specific paired shadow

Let \(n/q\) be the least state of the exact rational cycle associated to a
word, written in lowest terms.  Expand the word to \(A\) shortcut bits, and
let \(n_j/q\) be the state after \(j\) shortcut steps.  If \(s_j\) odd
inputs have occurred, put

\[
m_j:=q\,3^{s_j}2^{A-j}-n_j. \tag{P9.1}
\]

Equal-time parity translation shows that the \(m_j\) are integers and obey
the generalized negative shortcut recurrence

\[
m\longmapsto
\begin{cases}
m/2,&m\ \text{even},\\
(3m-q)/2,&m\ \text{odd}.
\end{cases} \tag{P9.2}
\]

Its endpoints satisfy

\[
m_0=q2^A-n,\qquad
m_A=q3^r-n,\qquad
m_0-m_A=qD. \tag{P9.3}
\]

This gives a precise denominator-one distinction.  The case \(q=1\) is
exactly an ordinary integer \(3m-1\) shortcut path, for which positivity of
\(m_0\) propagates automatically.  For \(q>1\), positivity is an additional
condition.  The primitive
denominator-five countermodel instead produces a \(3m-5\) path, with

\[
m_0=671088453,\quad m_A=645700628,\quad m_0-m_A=25387825=5D.
\]

For a hypothetical integer cycle, P7 and P5 give

\[
x<305r^{14.3}<2^r\le2^A,
\]

so \(m_0=2^A-x>0\).  The signed shortcut extension preserves negativity,
and therefore every \(m_j\) in (P9.1) is positive.  Moreover, the strict
suffix-record inequalities imply

\[
2^{A-j}>3^{r-s_j}\qquad(0\le j<A). \tag{P9.4}
\]

Applying the remaining negative affine suffix to \(m_j\) now gives
\(m_j>m_A\).  Thus \(m_A=3^r-x\) is strictly smaller than every prior
shortcut state.  A repeated state would trap the deterministic path in a
periodic component and force the endpoint to equal an earlier state.
Consequently:

\[
\boxed{\text{The paired ordinary \(3m-1\) path is positive and simple,
and it descends by exactly \(D\).}} \tag{P9.5}
\]

This construction is specific to the integer lift.  It does not, however,
close by reciprocal-mass compression.  Multiplying its odd shortcut steps
gives the exact identity

\[
\begin{aligned}
R
&:=\sum_{\substack{0\le j<A\\m_j\ {\rm odd}}}
-\log\left(1-\frac1{3m_j}\right)\\
&=\log\frac{2^A-x}{3^r-x}-\Lambda\\
&=\log\left(1-\frac{x}{2^A}\right)
-\log\left(1-\frac{x}{3^r}\right). \tag{P9.6}
\end{aligned}
\]

In fact, \(x<2^r<3^r/2\), so the carry bound in P7 gives

\[
0<R\le
\frac{xD}{2^A(3^r-x)}
<\frac{4r}{3\cdot2^A}. \tag{P9.7}
\]

The shadow correction is exponentially small.  The universal bound
\(R<10.789\) is therefore compatible by an enormous margin.  A successful
use of (P9.5) needs a new endpoint-gap or first-crossing theorem, rather
than another scalar reciprocal estimate.

### P10. Local-minimum equations with the denominator retained

The denominator can also be retained in the local-minimum decomposition.
Let \(u_j/q\) be consecutive local minima, represented by coprime positive
numerators \(u_j\), and write the block as

\[
1^{\ell_j-1}(c_j+1).
\]

Then

\[
\ell_j=v_2(u_j+q),\qquad
3^{\ell_j}(u_j+q)
=2^{\ell_j}\bigl(q+2^{c_j}u_{j+1}\bigr). \tag{P10.1}
\]

In particular,

\[
u_j\equiv-q\pmod{2^{\ell_j}},\qquad
2^{c_j}u_{j+1}\equiv-q\pmod{3^{\ell_j}}. \tag{P10.2}
\]

For \(q=1\), the same unit \(-1\) occurs in both coprime directions.  For
the rational countermodel it is \(-5\).  Equation (P10.2) is an exact
\(q=1\)-only CRT gate, but the moduli vary with the blocks and currently do
not yield a uniform contradiction.

### P11. Short binary and ternary representatives of the least state

There is a second exact consequence of \(q=1\).  Choose \(L,k\) with

\[
2^L>x,\qquad 3^k>x.
\]

Let \(h\) be the first index with \(A_h\ge L\), and let \(C_h\) be the
length-\(h\) prefix carry.  Reducing the full cycle equation modulo \(2^L\)
gives

\[
x\equiv-C_h3^{-h}\pmod{2^L}. \tag{P11.1}
\]

Since \(0<x<2^L\), \(x\) is the least positive representative in (P11.1).
For the last \(k\) accelerated letters, put \(s:=r-k\),
\(B:=A-A_s\), and

\[
C_{\rm suf}:=
\sum_{j=0}^{k-1}3^{k-1-j}2^{A_{s+j}-A_s}.
\]

Reduction modulo \(3^k\) gives

\[
x\equiv2^{-B}C_{\rm suf}\pmod{3^k}. \tag{P11.2}
\]

Again, \(x\) is the least positive representative.  Using P7, we may choose
\(2^L,3^k>305r^{15}\), so \(h,L,k=O(\log r)\).  Thus a denominator-one
cycle forces a common small integer representative determined
independently by a logarithmic prefix and a logarithmic suffix.

This is a precise cross-prime synchronization condition.  It does not yet
replace (P6.5): deficit moves supported in the long interior can leave both
boundary representatives unchanged while changing the full carry by a
unit modulo \(D\).

### P12. Exact cumulative-wrap reduction for a first crossing

Let \(\epsilon=(\epsilon_0,\ldots,\epsilon_{k-1})\) be a binary shortcut
word, put

\[
s_j=\sum_{t<j}\epsilon_t,\qquad s=s_k,\qquad
M=2^k,\quad P=3^s,\quad D=M-P,
\]

and assume that it is a coefficient first crossing:

\[
2^j\le 3^{s_j}\quad(0\le j<k),\qquad P<M. \tag{P12.1}
\]

Its carry is

\[
C=\sum_{\epsilon_j=1}2^j3^{s-s_{j+1}}.
\]

The last letter is zero and \(P\ge M/2\), so
\(k=\lceil s\log_2 3\rceil\).  Every carry summand is at most \(P/3\),
and therefore

\[
C\le\frac{sP}{3}<\frac{sM}{3}. \tag{P12.2}
\]

We first record the gap estimate needed to control lifts.  The linear-form
bound (P7.1), applied with \(r=s\), gives

\[
D=3^s(e^\Lambda-1),\qquad
\Lambda=k\log2-s\log3>e^{-6.125581}s^{-13.3}.
\]

For \(s\ge63\), the elementary inequalities \(e<3\) and
\(s^{-13.3}>s^{-14}\) yield

\[
D>\frac{3^{s-7}}{s^{14}}>\frac{s}{3}. \tag{P12.3}
\]

The last comparison holds at \(s=63\) because

\[
3^{57}=1{,}570{,}042{,}899{,}082{,}081{,}611{,}640{,}534{,}563
>63^{15}=977{,}480{,}813{,}971{,}145{,}474{,}830{,}595{,}007,
\]

and its quotient is increasing because

\[
3\cdot63^{15}>64^{15}.
\]

The exact [gap certificate](cycles/fcd_gap_certificate.js) checks
\(D>s/3\) for \(1\le s\le62\), as well as both displayed tail
comparisons.  Consequently (P12.3) holds for every nonzero first crossing.
This argument uses the published linear-form estimate in P7; the finite
part uses only integer arithmetic.

Let

\[
\rho=[-P^{-1}C]_M\in[0,M),\qquad
Z=\frac{P\rho+C}{M},\qquad d=Z-\rho,
\]

and define the cumulative-wrap residue

\[
\tau=[CM^{-1}]_D\in[0,D). \tag{P12.4}
\]

The affine equation gives

\[
C=D\rho+Md,\qquad -D<d<\frac{s}{3},\qquad d\equiv\tau\pmod D. \tag{P12.5}
\]

The strict lower bound follows from \(\rho<M\), and the upper bound follows
from (P12.2).  Combining (P12.3) and (P12.5) now justifies, without a
hidden lift assumption, the exact dichotomy

\[
\boxed{d\in\{\tau-D,\tau\}.} \tag{P12.6}
\]

In particular, the exact First-Crossing Descent gate is

\[
\boxed{\rho>Z\iff d=\tau-D\iff C<M\tau.} \tag{P12.7}
\]

Thus \(\tau\ge s/3\) is sufficient, but it is stronger than the exact
inequality needed in (P12.7).

The reduced denominator makes the arithmetic obstruction especially
transparent.  Put

\[
h=\gcd(D,C),\qquad q=D/h,\qquad n=C/h,\qquad
r=[nM^{-1}]_q.
\]

Then

\[
\boxed{\tau=hr,\qquad
K:=\frac{M\tau-C}{D}=\frac{Mr-n}{q}.} \tag{P12.8}
\]

For \(q>1\), \(r\) is a nonzero unit modulo \(q\), so
\(\tau\ge h=D/q\).  Moreover, \(K>0\) is exactly (P12.7).  It follows at
once that every word with \(q>1\) and \(n<M\) descends.  Any rational
counterexample must instead satisfy

\[
n\ge M,\qquad r\le n/M. \tag{P12.9}
\]

When \(q=1\), we have \(r=\tau=0\).  Equations (P12.5)--(P12.6) force
\(d=0\), since the other possible value \(-D\) violates the strict lower
bound.  Hence the denominator-one case is not hidden inside a generic
wrap estimate: it is exactly a positive integer cycle for the canonical
representative.  In this case \(K=-n<0\).

The denominator-five regression word in R2 expands to

\[
111111011101101001011110000.
\]

For this word

\[
h=1{,}015{,}513,\quad q=5,\quad n=187,\quad r=4,\quad
\tau=4{,}062{,}052.
\]

Thus (P12.8) also distinguishes the known rational countermodel exactly.

### P13. Negative shadow and the local wrap cocycle

Let \(x_j\) be the canonical positive shortcut path starting at \(\rho\),
and define

\[
m_j=3^{s_j}2^{k-j}-x_j.
\]

Then \(m_0=M-\rho>0\), and the same word drives the positive negative-
shortcut path

\[
m_{j+1}=
\begin{cases}
(3m_j-1)/2,&\epsilon_j=1,\\
m_j/2,&\epsilon_j=0.
\end{cases} \tag{P13.1}
\]

At the endpoint, \(m_k=P-Z\).  Its total drop is therefore

\[
G:=m_0-m_k=D+d=
\begin{cases}
\tau,&d=\tau-D,\\
D+\tau,&d=\tau.
\end{cases} \tag{P13.2}
\]

If

\[
E=\sum_{\epsilon_j=0}m_j,\qquad
O=\sum_{\epsilon_j=1}m_j,
\]

stepwise telescoping gives the exact identity

\[
\boxed{2G=E-O+s.} \tag{P13.3}
\]

Consequently the sufficient cumulative-wrap statement
\(\tau\ge s/3\) is equivalent to the two-sided shadow condition

\[
-\frac{s}{3}\le E-O<2D-s. \tag{P13.4}
\]

The upper inequality is essential: it selects \(G<D\), which is precisely
First-Crossing Descent.  A lower estimate on \(E-O\) alone cannot exclude
the integer-cycle branch.  A hypothetical denominator-one cycle lies on
the exact forbidden boundary \(E-O=2D-s\).

There is also an exact adjacent-move formula.  Write
\(\epsilon=u10v\), let \(t=|u|\), let \(a\) and \(b\) be the weights of
\(u\) and \(v\), and replace \(10\) by \(01\).  Then

\[
\Delta=C'-C=2^t3^b,\qquad
L=[\Delta P^{-1}]_M,\qquad
\chi=\mathbf{1}_{\rho<L},\qquad
V=\frac{DL+\Delta}{M}. \tag{P13.5}
\]

For \(D>1\), the first-crossing barrier gives \(\Delta<M/3\), and
divisibility excludes \(V=D\).  Hence \(1\le V\le D-1\).  Direct
substitution gives

\[
\begin{aligned}
\rho'&=[\rho-L]_M,\\
G'&=G+V-\chi D,\\
\tau'&=[\tau+V]_D.
\end{aligned} \tag{P13.6}
\]

Thus an admissible right move changes the unwrapped shadow gap by \(+V\)
unless the canonical \(M\)-lift wraps, in which case it changes the gap by
\(-(D-V)\).  This isolates the exact obstruction to a transposition
descent: the lift indicator \(\chi\) has both values on admissible moves.

### P14. The exact one-third area identity

Compress the negative shadow at its odd inputs.  Write
\(a_i\) for the number of shortcut steps from the \(i\)-th odd input to
the next selected endpoint, put

\[
A_i=\sum_{t<i}a_t,\qquad
R_i=\frac{2^{A_i}}{3^i},
\]

and let \(u_i\) be the corresponding shadow state.  First crossing gives
\(R_i\le1\) for \(i<s\), whereas \(R_s=M/P>1\).  The negative accelerated
equation is

\[
2^{a_i}u_{i+1}=3u_i-1.
\]

After multiplication by \(R_i/3\), it telescopes to

\[
R_su_s=u_0-\frac13\sum_{i=0}^{s-1}R_i. \tag{P14.1}
\]

Define the terminal coefficient deficits

\[
H_i:=M-2^{A_i}3^{s-i}=M-PR_i.
\]

Each \(H_i\ge D\).  Substituting
\(\sum_iPR_i=sM-\sum_iH_i\) into (P14.1) gives the exact integer identity

\[
\boxed{M(3G-s)=3Du_0-\sum_{i=0}^{s-1}H_i,} \tag{P14.2}
\]

where \(G=u_0-u_s\).  This explains the surviving constant \(1/3\):
on the descent lift, \(G=\tau\), and \(3\tau\ge s\) is exactly

\[
\sum_{i=0}^{s-1}H_i\le3Du_0. \tag{P14.3}
\]

The suffix from any proper boundary has coefficient below one, so its
negative affine carry also gives \(u_i>u_s\) for every \(i<s\).  This
endpoint-minimum fact is strict, but it does not by itself sum the
coefficient deficits in (P14.3).

Combining the branch selection \(G<D\) with (P14.2) shows that the full
sufficient residue statement is equivalent to the exact two-sided area
window

\[
\boxed{sM-3D\rho<\sum_{i=0}^{s-1}H_i\le3D(M-\rho).} \tag{P14.4}
\]

The left inequality is precisely the exact margin \(K>0\); the right
inequality is the one-third lower bound after descent has been selected.
A denominator-one cycle has \(G=D\) and lies at equality in the left side
of (P14.4).  Thus the area identity sharpens the target, but it does not
silently prove the missing branch inequality.

### P15. Dual polynomial-seed reduction

The exact two-lift dichotomy also localizes any failure of the one-third
residue bound.  Suppose \(\tau<s/3\).  If \(d=\tau\), then

\[
C=D\rho+M\tau,\qquad
\rho<\frac{sM}{3D}. \tag{P15.1}
\]

If \(d=\tau-D\), then the negative-shadow drop is \(G=\tau\), and

\[
MG=D(M-\rho)+C,\qquad
M-\rho<\frac{sM}{3D}. \tag{P15.2}
\]

Since \(0<\Lambda<\log2\),
\(D/M=1-e^{-\Lambda}>\Lambda/2\).  Combining this with (P7.1) gives

\[
\boxed{\min\{\rho,M-\rho\}<305s^{14.3}} \tag{P15.3}
\]

for every counterexample to \(\tau\ge s/3\), with the side selected as in
(P15.1)--(P15.2).  In particular, every exact failure of
First-Crossing Descent produces an ordinary \(3x+1\) first-crossing
excursion with canonical start \(\rho<305s^{14.3}\).  A failure on the
descent branch instead produces a \(3x-1\) first-crossing path, starting
at \(M-\rho<305s^{14.3}\), whose drop is less than \(s/3\).

This is an all-depth polynomial seed reduction, not a finite proof.  The
exponent \(14.3\) grows with \(s\), so exhaustive verification at any fixed
seed ceiling cannot close it.

### P16. Cycle-specific audit of the area margin

Let \(x\) be the least state of a hypothetical denominator-one cycle, and
stop its binary orbit at the first coefficient crossing.  Write
\(\delta\) for the actual endpoint minus \(x\).  Cyclic minimality gives
\(\delta\ge0\).  If \(x=\rho+tM\), then the lift formula is

\[
\delta=d-tD.
\]

Since \(d<s/3<D\), nonnegativity forces \(t=0\).  Therefore

\[
x=\rho<M,\qquad \delta=d=\tau,\qquad
C=Dx+M\delta. \tag{P16.1}
\]

There is a direct form of the area sum:

\[
\sum_{i=0}^{s-1}H_i=sM-3C. \tag{P16.2}
\]

Substitution of (P16.1) gives

\[
\begin{aligned}
\sum_iH_i-(sM-3Dx)&=-3M\delta\le0,\\
3D(M-x)-\sum_iH_i&=M(3D-s+3\delta)>0.
\end{aligned} \tag{P16.3}
\]

Thus the upper side of the area window is automatic for the least-cycle
prefix.  The lower side is violated when \(\delta>0\), and is attained at
equality when \(\delta=0\).  In the latter case the prefix already returns
to \(x\), so primitivity makes it the full cycle.  The shadow start
\(u_0=M-x\) is therefore not bounded by \(x\) in a useful direction:
indeed P15 makes \(x\) polynomial in \(s\), while \(u_0\) is close to the
exponential modulus \(M\).  The automatic area inequality selects no new
branch.

A cyclic summation has the same exact obstruction.  From each shortcut
phase, send the phase to its next coefficient crossing.  Such a crossing
occurs within one full period, and the resulting map on the finite phase
set has a directed cycle.  Consider the associated closed sequence of
first-crossing blocks.  For block
\(j\), let \(x_j\) be its start, let
\(\delta_j=x_{j+1}-x_j\), and use the corresponding
\(s_j,M_j,D_j,H_{j,i}\).  Define its normalized area margin by

\[
\mathcal A_j=
\sum_iH_{j,i}-s_jM_j+3D_jx_j.
\]

Equation (P16.2) and the block affine equation give

\[
\mathcal A_j=-3M_j\delta_j,\qquad
\boxed{\sum_j\frac{\mathcal A_j}{M_j}
=-3\sum_j\delta_j=0.} \tag{P16.4}
\]

Hence summing the exact margins around the cycle telescopes to zero.  It
guarantees a nonnegative-displacement block, but proving that such a block
cannot exist is precisely First-Crossing Descent.  No sign contradiction
is gained merely by cutting at every coefficient crossing.

The primary modular margins \(K_j\) do not themselves telescope.  If

\[
w_j=\frac{\tau_j-\delta_j}{D_j},
\]

then the lift dichotomy gives \(w_j\in\mathbf Z_{\ge0}\) and

\[
K_j=M_jw_j-x_j. \tag{P16.5}
\]

The lift integers and moduli vary from block to block.  Even the trivial
cycle has the single nonzero first-crossing block \(10\), for which
\(K=-1\).  Thus neither the unweighted nor a modulus-weighted sum of the
\(K_j\) has a favorable sign without first proving the missing descent
statement.

### P17. A linear family of denominator-one Ferrers wraps

The denominator cliff has a cyclic form which isolates (q=1) at every
unit letter.  Let (w_i) be the rotation beginning with (a_i), let
(C_i) be its carry, and retain

\[
g=\gcd(D,C_i),\qquad q=D/g,\qquad p_i=C_i/g.
\]

Suppose (a_i=1).  Write (E_j) for the length-(j) prefix exponent of
(w_i), and (E'_j) for that of (w_{i+1}).  For
(1\le j<r), direct cyclic indexing gives

\[
E'_j-E_j=a_{i+j}-1\ge0.                                \tag{P17.1}
\]

Thus the passage from (w_i) to (w_{i+1}) is coordinatewise monotone.
Expanding each coordinate increase into unit cells gives the positive
Ferrers sum

\[
\begin{aligned}
S_i:=C_{i+1}-C_i
 &=\sum_{j=1}^{r-1}\sum_{h=0}^{a_{i+j}-2}
 3^{r-1-j}2^{E_j+h}.                                  \tag{P17.2}
\end{aligned}
\]

The rotation recurrence (2C_{i+1}=3C_i+D) and the reduced rational
recurrence (2p_{i+1}=3p_i+q) give

\[
S_i=\frac{C_i+D}{2}=g\frac{p_i+q}{2}.                 \tag{P17.3}
\]

Since (q) is odd and \(\gcd(p_i,q)=1\),

\[
\boxed{\gcd(S_i,D)=g,\qquad D\mid S_i\iff q=1.}        \tag{P17.4}
\]

Consequently a hypothetical nontrivial integer cycle supplies a full
modulus wrap of the positive cell sum (P17.2) at every unit letter:

\[
S_i=D\frac{x_i+1}{2}.                                  \tag{P17.5}
\]

There are linearly many such identities.  Indeed, if (u) is the number
of unit letters, then

\[
A-r=\sum_j(a_j-1)\ge r-u,
\qquad
u\ge2r-A=2r-\lceil r\log_2 3\rceil.                  \tag{P17.6}
\]

Every sum (P17.2) has exactly (A-r) cells, supported on the nonunit
coordinates.  A one-coordinate support is impossible by P8.6.  The exact
surviving cycle obstruction can therefore be sharpened as follows:

Exclude a primitive strict-record deficit path for which at least

\[
2r-A                                                       \tag{P17.7}
\]

cyclic Ferrers sums, each supported on the same cyclic family of at least
two nonunit coordinates, wrap to zero modulo the full determinant (D).

This is genuinely denominator-specific.  For the (q=5) regression each
of its eleven unit-letter sums has gcd exactly (D/5=1{,}015{,}513) with
(D), and none wraps modulo (D).  It is nevertheless an equivalent
repackaging of integrality, not yet a contradiction.  The exact script
[`cycles/q1_integrality_gate.js`](cycles/q1_integrality_gate.js) checks
(P17.1)--(P17.6), the (q=5) word, the smaller (q=13) word, and all
trivial cycle powers through length (20).

### P18. Sharp Ferrers bounds and correlation collapse

We now test whether the Ferrers sums in P17 can be excluded by size.  Let
\(x_0>1\) be the least state of a hypothetical nontrivial integer cycle.
Since \(x_1\ge x_0\),

\[
2^{a_0}\le 3+\frac1{x_0}<4,
\]

and hence \(a_0=1\).  Put

\[
B:=A-r,
\qquad
R:=\frac{2^A}{3^r}\in(1,2).
\]

For later use, let \(C_i\) be the carry of the rotation beginning at
\(a_i\), and let \(A_i=\sum_{t<i}a_t\).  The positive prefix and suffix
carries give, for \(0<i<r\),

\[
\frac{3^i}{2^{A_i}}C_0<C_i<
\frac{2^{A-A_i}}{3^{r-i}}C_0.                         \tag{P18.1}
\]

The quotient of the upper multiplicative coefficient by the lower one is
exactly \(R\).  At a unit letter with \(0<i<r\), (P17.3) therefore gives
the corresponding termwise interval

\[
\frac{D+(3^i/2^{A_i})C_0}{2}<S_i<
\frac{D+(2^{A-A_i}/3^{r-i})C_0}{2}.                  \tag{P18.2}
\]

These inequalities retain every strict suffix record.  They do not force
\(S_i<D\), since their scale is the rational cycle state rather than the
determinant.

There are also sharp word-independent bounds.  Rotate to a unit letter and
write \(E_j\) for the new prefix exponents.  Summing each vertical stack in
(P17.2) gives

\[
S_i=\sum_{j=1}^{r-1}3^{r-1-j}2^{E_j}
\left(2^{a_{i+j}-1}-1\right).                         \tag{P18.3}
\]

P8.6 shows that a denominator-one primitive word must have at least two
nonunit letters.  Since \(E_0=0\), \(E_1=1\), and the total excess is
\(B\), two-support positivity gives the coordinatewise bounds

\[
\begin{array}{ll}
E_j\ge j &(1\le j\le r-2),\\
E_{r-1}\ge r,&
\end{array}
\qquad
\begin{array}{ll}
E_2\le B+1,&\\
E_j\le B+j &(3\le j<r).
\end{array}                                           \tag{P18.4}
\]

Both profiles are attainable.  The lower profile is attained by

\[
v_-=(1^{r-2},2,B),
\]

and the upper profile is attained by

\[
v_+=(1,B,2,1^{r-3}).
\]

The word \(v_-\) is itself strict-record and one-strip.  Also \(v_+\) is a
unit rotation of the strict-record one-strip word
\((1^{r-2},B,2)\).  Thus the global strict-record hypothesis cannot improve
either profile for an arbitrary unit rotation.

Put

\[
C_{-,2}:=3^r-2^{r-1}
\]

and

\[
C_{+,2}:=
3^{r-1}+2\cdot3^{r-2}+2^{B+1}3^{r-3}
+\sum_{j=3}^{r-1}3^{r-1-j}2^{B+j}.                   \tag{P18.5}
\]

Equations (P17.3)--(P18.5) prove the sharp bounds

\[
\boxed{
L_2:=\frac{2^A-2^{r-1}}2
\le S_i\le
U_{\mathrm{cyc},2}:=\frac{D+C_{+,2}}2.}              \tag{P18.6}
\]

We can sharpen the upper bound at the distinguished strict-record
rotation.  Define

\[
P_j:=A-\left\lceil (r-j)\log_2 3\right\rceil.
\]

Here \(A_1=1\), while strict suffix records give \(A_j\le P_j\) for
\(2\le j<r\).  Therefore

\[
C_0\le C_{\mathrm{rec}}^*:=
3^{r-1}+2\cdot3^{r-2}
+\sum_{j=2}^{r-1}3^{r-1-j}2^{P_j},                  \tag{P18.7}
\]

and

\[
\boxed{L_2\le S_0\le
U_{\mathrm{rec}}:=\frac{D+C_{\mathrm{rec}}^*}{2}.}  \tag{P18.8}
\]

This is again sharp.  The lower endpoint is attained by \(v_-\), while the
upper endpoint is attained by the word whose prefix exponents are

\[
0,1,P_2,P_3,\ldots,P_{r-1},A.
\]

The mechanical upper word can be imprimitive.  This primitivity issue has
an exact repair which will be used below.  Its final two letters are always
\(2,2\), because

\[
P_{r-2}=A-4,
\qquad
P_{r-1}=A-2.
\]

If the word is imprimitive, then all of its letters are \(1\) or \(2\):
the only other possible letter is a single exceptional initial \(3\),
which cannot occur in a proper power.  Replace the final pair \(2,2\) by
\(1,3\).  The new word remains strict-record and one-strip, and its unique
letter \(3\) makes it primitive.  Only \(A_{r-1}\) changes, so its carry is

\[
C_{\mathrm{prim}}^*=C_{\mathrm{rec}}^*-\frac{2^A}{8}. \tag{P18.8a}
\]

If the mechanical word is already primitive, define
\(C_{\mathrm{prim}}^*:=C_{\mathrm{rec}}^*\).  Thus
\((D+C_{\mathrm{prim}}^*)/2\) is always attained by an explicit primitive
strict-record one-strip word.

The sharp interval (P18.8) is too wide to exclude a full wrap.  Indeed, put
\(c_j:=P_j-j\) and \(\beta:=\log_2(3/2)\).  The elementary ceiling
inequality gives \(c_j\ge\lfloor\beta j\rfloor\), and hence

\[
C_{\mathrm{rec}}^*-(3^r-2^{r-1})
\ge
3^r\sum_{j=2}^{r-1}
\frac{2^j(2^{\lfloor\beta j\rfloor}-1)}{3^{j+1}}
-2^{r-1}.                                             \tag{P18.9}
\]

For \(r\ge13\), the first eleven terms give the exact rational bound

\[
\sum_{j=2}^{12}
\frac{2^j(2^{\lfloor\beta j\rfloor}-1)}{3^{j+1}}
=\frac{3{,}644{,}236}{1{,}594{,}323}
=2+\frac{455{,}590}{1{,}594{,}323}.                  \tag{P18.10}
\]

The excess dominates \(2^{r-1}\).  At \(r=13\), this is the exact integer
comparison

\[
455{,}590\cdot3^{13}=726{,}357{,}615{,}570
>6{,}530{,}347{,}008
=1{,}594{,}323\cdot2^{12},
\]

and the comparison propagates because the two sides are multiplied by
\(3\) and \(2\), respectively.  Since \(D<3^r\), (P18.9)--(P18.10) give

\[
C_{\mathrm{rec}}^*-(3^r-2^{r-1})>2D
\qquad(r\ge13).
\]

For \(5\le r\le12\), the exact values of the left side minus \(2D\) are

\[
\begin{array}{c|rrrrrrrr}
r&5&6&7&8&9&10&11&12\\ \hline
&66&70&378&6102&19778&87670&310290&1278478.
\end{array}
\]

Consequently

\[
\boxed{U_{\mathrm{rec}}-L_2>D\qquad(r\ge5).}         \tag{P18.11}
\]

Every closed interval of length greater than \(D\) contains a multiple of
\(D\).  Thus even the sharp strict-record and two-support bounds leave at
least one scalar candidate for a full wrap at every relevant length.
Proving that none of those multiples is realized is exactly the carry
residue problem (P6.5).

Primitivity does not rescue the scalar argument.  If the correction in
(P18.8a) is needed, it lowers the Ferrers sum by only \(2^A/16\).  For
\(r\ge13\), (P18.10) still leaves the positive excess

\[
\left(\frac{455{,}590}{1{,}594{,}323}-\frac14\right)3^r-2^{r-1}
=\frac{228{,}037}{6{,}377{,}292}3^r-2^{r-1}>0.       \tag{P18.11a}
\]

The last inequality holds at \(r=13\), since

\[
228{,}037\cdot3^{13}=363{,}564{,}633{,}951
>26{,}121{,}388{,}032
=6{,}377{,}292\cdot2^{12},
\]

and then propagates.  Hence the interval from \(L_2\) to the explicit
primitive witness has length greater than \(D\) for every \(r\ge13\).
For \(5\le r\le12\), the exact triples
\((L_2,(D+C_{\mathrm{prim}}^*)/2,mD)\), with the displayed multiple lying
between the first two entries, are

\[
\begin{array}{c|rrrrrrrr}
r&5&6&7&8&9&10&11&12\\ \hline
L_2&120&496&2016&4032&16256&32512&130560&523264\\
(D+C_{\mathrm{prim}}^*)/2
&166&762&4114&8714&39230&78738&370702&1679638\\
mD&130&590&3818&4893&26170&38922&169994&1034270.
\end{array}                                           \tag{P18.11b}
\]

Thus primitive admissible words realize scalar values on both sides of a
full-determinant multiple at every \(r\ge5\).  This does not realize the
multiple itself.  It proves that size and primitivity alone do not decide
the residue.

Finally, the linear wrap count contains no independent congruences.  By
(P17.4), for every unit index \(i\),

\[
D\mid S_i\quad\Longleftrightarrow\quad q=1.           \tag{P18.12}
\]

For \(r\ge3\), the exact inequality \(3^3<2^5\) gives
\(2r-A\ge1\).  Combining (P17.6) and (P18.12),

\[
\boxed{
q=1
\Longleftrightarrow
\#\{i:a_i=1,\ D\mid S_i\}=u
\Longleftrightarrow
\#\{i:a_i=1,\ D\mid S_i\}\ge2r-A.}                \tag{P18.13}
\]

In other words, the proposed family of at least \(2r-A\) wraps is a
repetition of one condition.  Excluding that family is logically
equivalent to excluding \(q=1\).

The exact-integer certificate
[`cycles/ferrers_wrap_bounds.js`](cycles/ferrers_wrap_bounds.js) checks
(P18.1)--(P18.13), the sharp extremizers, and the width certificate.  It
also gives the following regressions.

1. The \(q=5\) word has \(B=10\), six nonunit coordinates, eleven unit
   letters, and \(2r-A=7\).  Its Ferrers sums range from
   \(97{,}489{,}248\) to \(940{,}365{,}038\), all inside (P18.6).
   Every one of the eleven sums is divisible by
   \(g=D/5=1{,}015{,}513\), while none is divisible by \(D\).
2. The \(q=13\) word \((1,2,1,2,2)\) attains the sharp distinguished
   upper endpoint \(U_{\mathrm{rec}}=166\).  Here
   \(L_2=120\), so the interval has length \(46>D=13\).
3. Every trivial power \((2)^N\), \(1\le N\le20\), has \(q=1\) but no
   unit letters.  Its guaranteed count \(2r-A\) is zero, so the Ferrers
   condition is correctly vacuous on this boundary family.

The same certificate exhaustively checks all \(12{,}078\) strict-record
one-strip words beginning with \(1\) through \(r=12\), including
\(12{,}044\) primitive words.  It finds no denominator-one case.  This is
finite evidence only.  The rigorous conclusion of this section is the
negative one: sharp size bounds and linear wrap multiplicity do not reduce
the denominator-one gate.

## REFUTED

### R1. `Strict record + one strip` does not give a small affine quotient

The word

\[
w=(1,2,1,2,2),\quad r=5,\quad A=8,
\]

is strict-record and one-strip, but

\[
D=2^8-3^5=13,\qquad C_w=319,\qquad C_w/D=319/13>24.
\]

In particular, claims such as \(C<3D\) are false before integrality is used.

### R2. Positivity, exact valuations, primitivity, and one strip do not
replace integer lifting

The primitive word

\[
(1,1,1,1,1,2,1,1,2,1,2,3,2,1,1,1,5)
\]

has \(r=17\), \(A=27=\lceil17\alpha\rceil\), is strict-record, and gives

\[
D=5{,}077{,}565,\qquad
C=189{,}900{,}931,\qquad
\gcd(D,C)=1{,}015{,}513.
\]

It is an exact positive rational cycle for the \(3n+q\) map with invariant
denominator

\[
q=D/\gcd(D,C)=5
\]

and least state \(187/5\).  All prescribed valuations are exact.  Thus every
Archimedean, record, and local-valuation condition survives; the sole missing
condition is \(q=1\), equivalently \(D\mid C\).

### R3. Primitive rational denominators need not grow with length

The same length-17 example has reduced denominator 5.  Hence a proposed
proof that merely forces the denominator to be "small" or subexponential
cannot isolate integer cycles.

The exhaustive falsification harness
[`cycles/enumerate_cycle_words.js`](cycles/enumerate_cycle_words.js)
checks strict-record one-strip words through the requested small lengths,
checks the exact affine/valuation recurrence, and separately regresses every
rotation/repetition of the trivial accelerated cycle \((2)^N\).

### R4. Primitive words can share a modulus factor with proper block carries

The primitive strict-record one-strip word

\[
w=(1,1,1,1,1,5)
\]

has

\[
r=6,\quad A=10,\quad D=295,\quad C_w=665,\quad
\gcd(D,C_w)=5.
\]

Its proper initial block \((1,1)\) has carry \(5\), which is divisible by
the same prime.  Thus one cannot strengthen P8 by asserting that every
proper block carry is a unit modulo the old common divisor.  Multidimensional
excursions must retain the possible factorization of their block carries.

### R5. The stronger half-weight residue bound is false

The primitive first-crossing word

\[
\epsilon=
1111101010111111111101101010100010100111011000
\]

has

\[
\begin{aligned}
k&=46,&s&=29,\\
M&=70{,}368{,}744{,}177{,}664,&
P&=68{,}630{,}377{,}364{,}883,\\
D&=1{,}738{,}366{,}812{,}781,&
C&=149{,}007{,}981{,}539{,}635.
\end{aligned}
\]

Every proper prefix satisfies (P12.1), and exact residue reconstruction
gives

\[
\rho=M-481,\qquad Z=P-467,\qquad
d=\tau-D,\qquad \tau=14.
\]

Thus

\[
2\tau=28<29=s,
\]

although \(3\tau=42>s\).  Its negative shadow starts at \(481\), ends at
\(467\), and has

\[
E=291{,}164,\qquad O=291{,}165.
\]

Hence \(E-O=-1\), which also disproves the proposed inequality \(E\ge O\)
even after the descent branch has been selected.  The constant \(1/2\)
cannot replace the surviving target \(1/3\).

The exact [residue harness](cycles/fcd_tau_attack.js) independently
reconstructs these values.  It exhaustively checked \(9{,}003{,}202\)
first-crossing words through length \(32\); the only violation of
\(3\tau\ge s\) was the excluded boundary word \(10\).

### R6. A primitive common prime does not obstruct the affine cycle

Let \(p\mid D\), and put

\[
z_i=2^{A_i}3^{-i}\pmod p.
\]

Then \(z_r=1\), and the carry identity becomes

\[
\frac{3C}{P}\equiv\sum_{i=0}^{r-1}z_i\pmod p. \tag{R6.1}
\]

Thus \(p\mid C\) is exactly a zero-sum condition for a closed
multiplicative prefix walk.  In the denominator-one case the actual state
residues satisfy

\[
2^{a_i}x_{i+1}\equiv3x_i+1\pmod p. \tag{R6.2}
\]

Neither primitivity nor large multiplicative order contradicts
(R6.1)--(R6.2).  In the denominator-five word from R2,

\[
D=5\cdot71\cdot14303,\qquad
\gcd(D,C)=71\cdot14303.
\]

Take the common prime \(p=14303\).  Both \(2\) and \(3\) have order
\(7151\), which is prime, and

\[
3\equiv2^{5470}\pmod {14303}.
\]

For \(1\le b\le17\), the only solution
\(1\le a\le27\) of \(2^a\equiv3^b\pmod p\) is
\((a,b)=(27,17)\).  Hence \(p\) is primitive for the entire exponent
rectangle, not merely a small accidental factor.  Nevertheless, the
seventeen residues \(z_i\) are distinct and nonzero, close at \(z_{17}=1\),
and satisfy

\[
\sum_{i=0}^{16}z_i\equiv0\pmod {14303}.
\]

The seventeen rational-cycle states, reduced modulo \(p\) using
\(5^{-1}\), are likewise distinct and nonzero and satisfy the ordinary
recurrence (R6.2).  The exact
[prime audit](cycles/prime_obstruction_audit.js) certifies the
factorizations, orders, unique rectangle relation, zero sum, and all local
recurrences.

Therefore a contradiction at one common primitive prime cannot distinguish
\(q=1\) from \(q=5\).  A successful prime-divisor argument must prove that
some prime power dividing \(D\) is missing from \(C\).  Without an
additional structural input, that assertion is exactly the original
condition \(D\nmid C\), so the bare prime recurrence is circular.

### R7. Linearly many monotone wraps modulo a large common factor do not
force integrality

It is tempting to weaken P17.4 by arguing that many cyclic Ferrers sums
which vanish modulo one large factor of \(D\) must also vanish modulo all of
\(D\).  The denominator-five word refutes this.  It has eleven unit letters,
and hence eleven positive monotone sums (P17.2).  Every one has

\[
\gcd(S_i,D)=1{,}015{,}513=71\cdot14303=D/5,
\]

while none is divisible by \(D\).  The factor \(14303\) is the primitive
large-order prime audited in R6.  Thus linear multiplicity, positivity,
overlapping cyclic support, and a primitive common prime still do not recover
the missing factor \(5\).  A completion must control every prime-power
component of \(D/g\), not merely produce many wraps modulo \(g\).

### R8. Sharp Ferrers size bounds do not exclude a determinant multiple

The proposed contradiction \(0<S_i<D\) is false by a large margin.  P18.6
gives the exact two-support range, and the \(q=5\) word has

\[
S_i\ge97{,}489{,}248>19D
\]

at every unit index.  Even at the distinguished strict-record rotation,
the sharp interval (P18.8) has length greater than \(D\) for every
\(r\ge5\).  When its upper mechanical endpoint is imprimitive, (P18.8a)
constructs a primitive witness only \(2^A/16\) lower, and (P18.11a)--
(P18.11b) show that primitive witnesses still bracket a determinant
multiple.  Therefore no stronger scalar inequality follows from only
positivity, two-coordinate support, one-strip geometry, primitivity, and the
strict suffix records used in P18.  Any further restriction must use the
residue of the actual carry inside that interval, which is (P6.5).

## CONDITIONAL

### C1. Exact remaining residue theorem

If (P6.5) has no primitive solution satisfying (P6.3) for every
\(r\ge72{,}057{,}431{,}991\), then no nontrivial positive cycle exists.
This is just the remaining implication written without hidden dynamical
language; it is not yet proved.

### C2. Local-minimum alternative

Writing the cycle in local-minimum blocks

\[
w=\prod_{j=0}^{m-1}1^{\ell_j-1}(c_j+1),
\]

with local minima \(u_j\), the exact equations are

\[
\ell_j=v_2(u_j+1),\qquad
3^{\ell_j}(u_j+1)
=2^{\ell_j}\bigl(1+2^{c_j}u_{j+1}\bigr), \tag{C2.1}
\]

and

\[
\sum_j\ell_j=r,\qquad
\sum_jc_j=A-r=\lceil(\log_2(3/2))r\rceil. \tag{C2.2}
\]

A uniform contradiction from (C2.1)--(C2.2) would also finish the cycle
track.  Existing fixed-\(m\) arguments do not make this uniform.

### C3. Exact first-crossing alternative

If every nonboundary first-crossing word satisfies

\[
K=\frac{M\tau-C}{D}>0, \tag{C3.1}
\]

then no nontrivial positive cycle exists.  Indeed, start at the least state
of such a cycle and stop at the first coefficient crossing.  The actual
start is a nonnegative \(M\)-lift of the canonical representative.
Equation (C3.1) makes the canonical endpoint smaller, and every higher lift
descends by an additional multiple of \(D\).  This contradicts cyclic
minimality.

The stronger estimate \(\tau\ge s/3\), or equivalently (P14.4), would prove
(C3.1).  The exact gate is only \(C<M\tau\); future attacks should target
that margin first.

## REMAINING

1. Prove the exact first-crossing margin \(K>0\) in (C3.1), or the
   sufficient cumulative-wrap inequality \(\tau\ge s/3\).  In the shadow
   formulation this means proving the strict lower side of (P14.4), and
   the one-third target also requires its upper side.
2. Prove that the modulus in (P6.5) cannot divide the carry of a primitive
   admissible deficit path.  A successful lemma must use the denominator-one
   condition; R2 shows that positivity and exact valuations are insufficient.
3. Upgrade the one-coordinate rigidity (P8.6) to a genuinely
   multidimensional invariant.  P17 shows that an integer cycle would force
   at least (2r-A) full-determinant Ferrers wraps, but each wrap is
   supported on two or more changed carry coordinates.  The unresolved case
   is precisely cancellation among those coordinates.  P18 proves that the
   sharp scalar interval already has width greater than \(D\), and that all
   wrap indicators are equivalent to the single condition \(q=1\).  Thus
   neither size nor multiplicity can supply the missing invariant.
4. Exploit the unit-winding paired shadow in (P9.5): it is a positive simple
   \(3m-1\) path from \(2^A-x\) to \(3^r-x\), with endpoint gap \(D\).
   Scalar reciprocal mass provably stalls by (P9.7), so the missing input is
   an endpoint-gap or first-crossing theorem.
5. Alternatively, prove a uniform local-minimum theorem from (C2.1) that
   does not have constants exponential in the number of minima.
6. Any new carry inequality must be checked against both:
   - every trivial-cycle word \((2)^N\) and its rotations;
   - the primitive denominator-five rational cycle in R2.
7. The present strongest cycle-specific conclusion is the one-strip theorem
   (P4.3); the strongest explicit length consequence is (P5.5).  The exact
   first-crossing advances are the margin formula (P12.8), the wrap cocycle
   (P13.6), and the area window (P14.4).  None proves positive-cycle
   exclusion.
8. Any prime-divisor proof must produce a prime power dividing \(D\) to a
   higher order than it divides \(C\).  R6 shows that even a large common
   prime with a unique exponent relation, distinct states, and a distinct
   zero-sum prefix walk gives no contradiction.

### Ferrers certificate hashes

The exact source hashes for the Ferrers-wrap certificates are

\[
\begin{array}{c|c}
\texttt{cycles/q1\_integrality\_gate.js}&
\texttt{186C3E5B1918FD86B0808C819AE6AAC1FA31B4AEB94DEDAA0EB7AD13832B7383}\\
\texttt{cycles/ferrers\_wrap\_bounds.js}&
\texttt{143F48F6B98828E0332DBC7CCD8639D2DDB9605916B3DDCB1872151AC7FEC964}
\end{array}
\]
