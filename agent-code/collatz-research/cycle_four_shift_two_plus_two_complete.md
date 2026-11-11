# Complete exclusion of the four-shift $2+2$ sector

**Mode:** SOLVE.  We close the two-run four-shift gate by an exact
$M$-folded interval cover and one explicit $F$-rung calculation at the
unique near-$M$ resonance.

**Status:** Under the established coprime denominator-one two-level
hypotheses, no four shifted sites can form two runs of length two.  The
three coefficient sectors $5/5$, $5/7$, and $7/7$ are excluded
uniformly above the proven period barrier.  The proof does not use a scan
over periods.

## Updating proof skeleton

1. **PROVED:** after ordering the two run-start residues $c<e$, the exact
   coefficient sectors are
   \[
   \begin{array}{c|c}
   e<L&5/5\\
   c<L\le e&5/7\\
   L\le c&7/7.
   \end{array}
   \]
2. **PROVED:** two exact logarithmic convergents and the period barrier
   confine $\ell=L/M$ to the rational interval (2.6).
3. **PROVED:** the four anchors $0,M,L,B$ give primitive integer
   polynomials for all three gates.
4. **PROVED:** every full $M$-folded resultant used by the cover is
   nonzero and satisfies the sign-separated alias bound (4.5).
5. **EXACT FINITE COVER:** 531 rational interval nodes cover all three
   coefficient sectors.  There are no residual boxes.
6. **PROVED:** the only boxes not closed directly at the $M$-rung lie in
   the near-$M$ cell (6.1).  On that cell, both sides of the resonance
   reduce to the same primitive coefficient triple at the $F$-rung.
7. **PROVED:** every resultant is a nonzero multiple of $D$ and is
   strictly smaller than $D$.  Hence the $2+2$ sector is empty.

## 1. Exact gates and residue sectors

We retain

\[
N=\lceil r\log_2 3\rceil,
\qquad
D=2^N-3^r,
\qquad
B=N-r,
\tag{1.1}
\]

and

\[
L=r-B,
\qquad
M=B-L.
\tag{1.2}
\]

The specific Bezout root satisfies

\[
2z^B=3,
\qquad
3z^L=4,
\qquad
8z^M=9
\pmod D.
\tag{1.3}
\]

Suppose that the four level-$1$ indices form two runs of length two.
Let $c$ and $e$ be their run-start residues, ordered so that

\[
0<c<e<B.
\tag{1.4}
\]

At a run start $x$, an internal Christoffel gap of one occurs exactly
when $x<L$.  The second inverse monomial is then

\[
z^{-(x+B)}=\frac23z^{-x},
\]

so the run contributes $5z^{-x}/3$.  An internal gap of two occurs
exactly when $x\ge L$.  In that case the second residue is $x-L$, and

\[
z^{-(x-L)}=\frac43z^{-x},
\]

so the run contributes $7z^{-x}/3$.  Therefore the exact grouped gate is

\[
\boxed{
(z-1)(Az^{-c}+A'z^{-e})=3z\pmod D,
}
\tag{1.5}
\]

where

\[
(A,A')=
\begin{cases}
(5,5),&e<L,\\
(5,7),&c<L\le e,\\
(7,7),&L\le c.
\end{cases}
\tag{1.6}
\]

These are the only coefficient orders.  In particular, after sorting the
residues, a $7/5$ row cannot occur.

We prove

\[
\boxed{
\text{No gate in (1.5) and (1.6) can hold under the inherited hypotheses.}
}
\tag{1.7}
\]

## 2. The actual interval for $L/M$

The earlier interval covers used a deliberately broad range for $L/M$.
At the present threshold it is useful to retain the information that
$N$ is the ceiling of $r\log_2 3$.

The certificate verifies the exact integer inequalities

\[
2^{176251}<3^{111202},
\qquad
3^{190537}<2^{301994}.
\tag{2.1}
\]

Consequently,

\[
\frac{176251}{111202}
<\log_2 3
<\frac{301994}{190537}.
\tag{2.2}
\]

Put $x=N/r$.  Since $N=\lceil r\log_2 3\rceil$ and

\[
r\ge R:=72{,}057{,}431{,}991,
\tag{2.3}
\]

we have

\[
\frac{176251}{111202}<x<
\frac{301994}{190537}+\frac1R.
\tag{2.4}
\]

Now

\[
\ell:=\frac LM=\frac{2-x}{2x-3}.
\tag{2.5}
\]

The function on the right is decreasing for $x>3/2$.  Thus

\[
\boxed{
\ell_-<\ell<\ell_+,
\qquad
\ell_-:=\frac{5698301721657743}{2333003475953681},
\qquad
\ell_+:=\frac{46153}{18896}.
}
\tag{2.6}
\]

We also retain

\[
\eta:=\frac1M<\frac1{10^{10}},
\qquad
\frac Mr<\frac{171}{1000},
\qquad
F:=12N-19r<\frac{21r}{1000}.
\tag{2.7}
\]

The first inequality follows from $M/r>1/6$ and (2.3).

## 3. Four exact anchors

Set

\[
(q_0,q_1,q_2,q_3):=(0,M,L,B)
\tag{3.1}
\]

and

\[
(\kappa_0,\kappa_1,\kappa_2,\kappa_3):=(36,32,27,24).
\tag{3.2}
\]

Equation (1.3) gives

\[
36z^{-u}=\kappa_jz^{q_j-u}\pmod D,
\qquad 0\le j\le3.
\tag{3.3}
\]

Choose a monotone anchor word

\[
\boldsymbol a=(a,b),
\qquad 0\le a\le b\le3.
\tag{3.4}
\]

Put

\[
t_1:=q_a-c,
\qquad
t_2:=q_b-e,
\qquad
h:=-\min(0,t_1,t_2),
\tag{3.5}
\]

and

\[
g:=\gcd(108,A\kappa_a,A'\kappa_b).
\tag{3.6}
\]

Since $108$ is supported on $2$ and $3$, the integer $g$ is a unit
modulo $D$.  Multiplying (1.5) by $36z^h$ and dividing by $g$ gives

\[
P_{\boldsymbol a}(z)=0\pmod D,
\tag{3.7}
\]

where

\[
P_{\boldsymbol a}(X)
:=\frac1g\left\{
(X-1)\left(
A\kappa_aX^{h+t_1}+A'\kappa_bX^{h+t_2}
\right)-108X^{h+1}
\right\}.
\tag{3.8}
\]

In particular,

\[
P_{\boldsymbol a}(1)=-\frac{108}{g}\ne0.
\tag{3.9}
\]

Define the nominal degree

\[
m^\sharp
:=\max(0,t_1,t_2)-\min(0,t_1,t_2)+1.
\tag{3.10}
\]

Then $\deg P_{\boldsymbol a}\le m^\sharp$.

## 4. The full $M$-fold

Let

\[
\Phi_M(X):=8X^M-9.
\tag{4.1}
\]

For every anchor selected by the certificate,

\[
m^\sharp=QM+d,
\qquad
Q\in\{0,1\},
\qquad
0\le d<M.
\tag{4.2}
\]

Define the full folded polynomial

\[
W(X):=8^QP_{\boldsymbol a}(X)\pmod{\Phi_M(X)},
\qquad
\deg W<M.
\tag{4.3}
\]

We do not divide any content from $W$.  Separate the positive and
negative folded amplitudes in each residue class.  If $U$ is the sum of
the five amplitude squares, together with twice the product of every
same-sign pair that can alias, then

\[
\sum_{v=0}^{M-1}\bigl([X^v]W\bigr)^2\le U.
\tag{4.4}
\]

Every alias decision is made by exact rational interval arithmetic.  At
the roots of $\Phi_M$, Parseval and the arithmetic-geometric mean
inequality give

\[
\boxed{
0<|\operatorname{Res}(\Phi_M,P_{\boldsymbol a})|
<8^d\left(\frac{81}{64}U\right)^{M/2}.
}
\tag{4.5}
\]

We record the nonvanishing argument.  The binomial $\Phi_M$ is
irreducible over $\mathbf Q$, since the valuation vector of $9/8$ is
primitive.  If $Q=0$, then $\deg P_{\boldsymbol a}<M$, and (3.9)
shows that $P_{\boldsymbol a}\ne0$.

Suppose that $Q=1$, and write

\[
P_{\boldsymbol a}=P_0+X^MP_1,
\qquad
\deg P_0,\deg P_1<M.
\tag{4.6}
\]

Put $f_0:=108/g$.  If $W=8P_0+9P_1=0$, then evaluation at $1$,
together with (3.9), gives

\[
P_1(1)=8f_0=\frac{864}{g}.
\tag{4.7}
\]

Only derivative pairs crossing the $M$-boundary can contribute
positively to $P_1(1)$.  Their total is at most

\[
\frac{A\kappa_a+A'\kappa_b}{g}
\le\frac{504}{g}
<\frac{864}{g}.
\tag{4.8}
\]

The final term can only decrease this total.  This contradicts (4.7), so
$W\ne0$.  Therefore the resultant in (4.5) is nonzero in every branch.

For

\[
J:=\left\lceil100\frac dM\right\rceil,
\tag{4.9}
\]

the exact acceptance comparison is

\[
8^{342J}(81U)^{17100}125^{200000}
<64^{17100}374^{200000}.
\tag{4.10}
\]

Equations (2.7), (4.5), and (4.10) imply

\[
0<|\operatorname{Res}(\Phi_M,P_{\boldsymbol a})|
<\left(\frac{374}{125}\right)^r.
\tag{4.11}
\]

## 5. The exact interval cover

Put

\[
y_0:=\frac cM,
\qquad
y_1:=\frac{e-c}{M}.
\tag{5.1}
\]

The three coefficient sectors become

\[
\begin{array}{c|c}
5/5&y_0+y_1<\ell,\\
5/7&y_0<\ell\le y_0+y_1,\\
7/7&\ell\le y_0.
\end{array}
\tag{5.2}
\]

In every row, $y_0,y_1>0$ and $y_0+y_1<\ell+1$.  It is enough to
cover the feasible parts of

\[
[\ell_-,\ell_+]\times[0,7/2]^2.
\tag{5.3}
\]

The script
[cycles/four_shift_22_interval_certificate.js](cycles/four_shift_22_interval_certificate.js)
implements the following deterministic procedure.

1. It tests all ten monotone anchor words from (3.4).
2. It computes outward rational intervals for $t_1/M,t_2/M$, their
   minimum, maximum, nominal span, possible quotient $Q$, folding bands,
   and every possible same-sign alias.
3. It accepts an $M$-rung branch only when the exact integer comparison
   (4.10) holds for every possible quotient.
4. It bisects the widest gap coordinate, counting the $\ell$-width with
   weight $4$, whenever no anchor certifies the box.
5. In the $5/5$ sector, it also accepts the explicit $F$-rung terminal
   cell proved in Section 6.

All endpoints, subdivisions, band tests, alias tests, ceiling operations,
and power comparisons use reduced BigInt rationals or exact integers.  The
cover terminates with

\[
\begin{array}{c|r|r|r|r}
\text{sector}&\text{nodes}&\text{discarded}&\text{certified}&
\text{maximum depth}\\
\hline
5/5&301&9&142&19\\
5/7&203&22&80&14\\
7/7&27&9&5&8.
\end{array}
\tag{5.4}
\]

There are no residual boxes.  The $5/5$ row uses 11 terminal
$F$-cells.  The other 216 certified boxes use the $M$-resultant
bound (4.11).

## 6. The near-$M$ terminal cell

It remains to justify the additional $5/5$ acceptance rule.  Put

\[
a:=e-c.
\]

The terminal cell is

\[
\boxed{
\frac7{10}\le\frac cM\le\frac34,
\qquad
\frac{99}{100}\le\frac aM\le\frac{101}{100}.
}
\tag{6.1}
\]

After multiplication by $z^e$, the $5/5$ gate is

\[
5(z-1)(z^a+1)-3z^{e+1}=0\pmod D.
\tag{6.2}
\]

Suppose first that $a=M+d$, where $d\ge0$.  Multiplying (6.2) by
$8$ and using $8z^M=9$ gives

\[
45(z-1)z^d+40(z-1)-24z^{e+1}=0\pmod D.
\tag{6.3}
\]

Suppose next that $a=M-d$, where $d\ge0$.  Multiplication by
$8z^d$ gives

\[
40(z-1)z^d+45(z-1)-24z^{c+M+1}=0\pmod D.
\tag{6.4}
\]

Let $s=e+1$ in (6.3), and let $s=c+M+1$ in (6.4).  The exact rational
inequalities certified from (2.6), (2.7), and (6.1) imply

\[
s=M+E+2F+w,
\qquad
0\le d<d+1<w<F.
\tag{6.5}
\]

Here $E=8r-5N$, and the Euclidean identities are

\[
M=2E+F,
\qquad
E=3F+G.
\tag{6.6}
\]

For clarity, the normalized residual in (6.3) is

\[
\frac wM=\frac cM+\frac dM+\eta+3\ell-8,
\tag{6.7}
\]

while the residual in (6.4) is

\[
\frac wM=\frac cM+\eta+3\ell-8.
\tag{6.8}
\]

The lower bounds in (6.5) follow from

\[
\frac7{10}+3\ell_--8-\frac1{100}>0,
\tag{6.9}
\]

and the upper $F$-band follows from

\[
\frac34+\frac1{100}+\frac1{10^{10}}+5\ell_+-13<0.
\tag{6.10}
\]

The certificate checks these comparisons as exact rational inequalities.

The $F$-rung relation gives

\[
2^{19}z^F=3^{12}\pmod D.
\tag{6.11}
\]

Using (1.3), (6.5), and (6.11), we obtain

\[
z^s
=\frac98\cdot\frac{256}{243}\cdot
\frac{3^{24}}{2^{38}}z^w
=\frac{3^{21}}{2^{33}}z^w
\pmod D.
\tag{6.12}
\]

After multiplying (6.3) or (6.4) by $2^{33}$ and removing the common
factor $8$, we obtain a primitive polynomial of the form

\[
P_\pm(X)
=C(X-1)X^d+Q(X-1)-HX^w,
\tag{6.13}
\]

where $C$ and $Q$ may be interchanged, and

\[
C=45\cdot2^{30},
\qquad
Q=5\cdot2^{33},
\qquad
H=3^{22}.
\tag{6.14}
\]

Put

\[
\Phi_F(X):=2^{19}X^F-3^{12}.
\tag{6.15}
\]

The polynomial $\Phi_F$ is irreducible, since the valuation vector
$(12,-19)$ is primitive.  Equation (6.5) gives
$\deg P_\pm<F$, while $P_\pm(1)=-H\ne0$.  Hence

\[
\operatorname{Res}(\Phi_F,P_\pm)\ne0.
\tag{6.16}
\]

If $d=0$, the two positive derivative coefficients combine, as do the
two negative derivative coefficients.  If $d\ge1$, equation (6.5) shows
that no same-sign alias occurs.  Thus the uniform coefficient-square bound
is

\[
U_F:=2(C+Q)^2+H^2
=17{,}644{,}486{,}643{,}752{,}550{,}036{,}081.
\tag{6.17}
\]

At the roots of $\Phi_F$,

\[
\rho^{2F}=\frac{3^{24}}{2^{38}}<\frac{65}{63}.
\tag{6.18}
\]

Parseval and the arithmetic-geometric mean inequality therefore give

\[
|\operatorname{Res}(\Phi_F,P_\pm)|^2
<\left(2^{38}\frac{65}{63}U_F\right)^F.
\tag{6.19}
\]

The certificate verifies the exact integer comparison

\[
(2^{38}\cdot65U_F)^{21}100^{2000}
<63^{21}299^{2000}.
\tag{6.20}
\]

Since $F<21r/1000$, equations (6.19) and (6.20) imply

\[
0<|\operatorname{Res}(\Phi_F,P_\pm)|
<\left(\frac{299}{100}\right)^r.
\tag{6.21}
\]

This closes the full near-$M$ cell, including the equality $a=M$.

## 7. Comparison with the determinant

Both polynomials in every selected resultant vanish at $z\pmod D$.
The Sylvester identity therefore gives

\[
D\mid\operatorname{Res}(\Phi_M,P_{\boldsymbol a})
\tag{7.1}
\]

in the $M$-boxes, and

\[
D\mid\operatorname{Res}(\Phi_F,P_\pm)
\tag{7.2}
\]

in the near-$M$ boxes.

The established logarithmic-form estimate is

\[
D>3^re^{-6.125581}r^{-13.3}.
\tag{7.3}
\]

For every $r\ge R$, the period-barrier endpoint checks give

\[
\left(\frac{374}{125}\right)^r<D,
\qquad
\left(\frac{299}{100}\right)^r<D.
\tag{7.4}
\]

The first inequality uses
$\log(375/374)>1/375$, and the second uses
$\log(300/299)>1/300$.  Their left sides dominate
$6.125581+13.3\log r$ at $R$, and the differences are increasing
thereafter.

Equations (4.11), (6.21), and (7.4) make every resultant a nonzero
multiple of $D$ with absolute value less than $D$.  This is impossible.
We have proved

\[
\boxed{
\begin{gathered}
\text{No coprime denominator-one two-level candidate has exactly four}\\
\text{shifted indices arranged as two runs of length two.}
\end{gathered}
}
\tag{7.5}
\]

## 8. Certificate

The exact certificate is
[cycles/four_shift_22_interval_certificate.js](cycles/four_shift_22_interval_certificate.js).
Its terminal output is

    sector=55
    visited=301 discarded=9 certified=142 residual=0 depth=19
    anchors=00:80,02:29,22:22,F-near-M:11
    sector=57
    visited=203 discarded=22 certified=80 residual=0 depth=14
    anchors=02:17,03:4,13:25,22:34
    sector=77
    visited=27 discarded=9 certified=5 residual=0 depth=8
    anchors=22:5
    total_interval_nodes=531
    total_boxes_discarded=40
    total_boxes_certified=227
    logarithm_convergent_checks=true
    near_M_F_resultant_check=true
    folded_content_divisions=0
    four_shift_22_interval_certificate_passed=true

## Conclusion

The $2+2$ sector is closed at every depth above the established period
barrier.  The mixed and $7/7$ gates succumb directly to the exact
$M$-folded cover.  The $5/5$ gate has one genuine near-$M$ resonance,
but borrowing $8z^M=9$ from the appropriate side turns both halves into
the same $F$-rung coefficient calculation.  No period scan is used.

Together with the consecutive run-$4$ theorem, this leaves the
four-shift run types $3+1$, $2+1+1$, and $1+1+1+1$.
