# A closed (3+1) four-shift sector

**Mode:** SOLVE.  We separate the four residue cells in the (3+1)
run type and close all but a sharply localized crossing strip for the
internal word (21).  The proof uses (M)-resultants with exact
(2)-adic and (3)-adic content.

**Status:** Suppose the consecutive triple has internal Christoffel word
(21), so its compressed coefficient is (29/9).  The candidate is
impossible whenever both run-start residues lie in ([L,B)), whenever
the triple's residue (c) is smaller than the isolated residue (e), and
through the lower part (e\le M-1) of the crossing cell
(e<L\le c).  Thus the only remaining (A=29) cell is the narrow strip

\[
M\le e<L\le c<B.
\]

Both (A=23) orders remain open.

## Updating proof skeleton

1. **PROVED:** the (3+1) gate is
   
   \[
   (z-1)(Az^{-c}+9z^{-e})=9z,
   \qquad A\in\{23,29\}.
   \]
2. **PROVED:** (A=23) is equivalent to the internal word (12) and
   (0<c<L).  The value (A=29) is equivalent to the internal word
   (21) and (L\le c<B).
3. **PROVED:** the cell (A=29), (c<e), is impossible at every depth
   above the established period barrier.
4. **PROVED:** the cell (A=29), (L\le e<c), is also impossible.
5. **PROVED:** the crossing subcell (A=29), (e<L\le c), (e\le M-1),
   is impossible, including all three (M)-endpoints.
6. **CERTIFIED FINITE:** the exact certificate checks the normal forms on
   every sampled coprime cell through period (200), together with every
   integer comparison used in the proof.
7. **REMAINING:** (A=23,c<e), (A=23,e<c), and the crossing strip
   (A=29,M\le e<L\le c).

## 1. The four residue cells

Retain

\[
N=\lceil r\log_2 3\rceil,
\qquad
D=2^N-3^r,
\qquad
B=N-r,
\]

and

\[
L:=r-B,
\qquad
M:=B-L.
\]

The specific Bezout root satisfies

\[
3z^L=4,
\qquad
8z^M=9
\pmod D.                                             \tag{1.1}
\]

Let (c) be the run-start residue of the consecutive triple, and let
(e) be the run-start residue of the isolated shift.  Both residues lie
in ((0,B)).  The run compression gives

\[
(z-1)(Az^{-c}+9z^{-e})=9z\pmod D,                  \tag{1.2}
\]

where

\[
\begin{array}{c|c|c}
A&\text{internal word}&\text{run-start interval}\\
\hline
23&12&0<c<L,\\
29&21&L\le c<B.
\end{array}                                         \tag{1.3}
\]

Together with the two possible orders of (c) and (e), equations
(1.2) and (1.3) give four cells.  We now exclude the cell

\[
A=29,
\qquad
L\le c<e<B.                                         \tag{1.4}
\]

## 2. A polynomial of width at most (M)

Put

\[
d:=e-c,
\qquad
h:=e-L.
\]

The inequalities in (1.4) give

\[
1\le d\le h\le M-1.                               \tag{2.1}
\]

The first identity in (1.1) gives

\[
12z^{-u}=9z^{L-u}\pmod D.                          \tag{2.2}
\]

Multiplying (1.2) by (12z^{e-L}), and then dividing by (9), gives

\[
P(z)=0\pmod D,                                     \tag{2.3}
\]

where

\[
\boxed{
P(X):=(X-1)(29X^d+9)-12X^{h+1}.
}                                                   \tag{2.4}
\]

In particular,

\[
P(1)=-12.                                          \tag{2.5}
\]

Let

\[
F(X):=8X^M-9.
\]

The binomial (F) is irreducible over (mathbf Q), since the valuation
vector of (9/8) is primitive.  We first assume (h\le M-2).  Then

\[
\deg P\le M-1,
\]

so

\[
R:=\operatorname{Res}(F,P)
\]

is a nonzero integer.  Equations (1.1) and (2.3) also give

\[
D\mid R.                                           \tag{2.6}
\]

## 3. The interior norm

Let

\[
\rho:=\left(\frac98\right)^{1/M}.
\]

The roots of (F) are (\rho\zeta), where (\zeta^M=1).  The only
possible collisions among the five labeled terms of (P) have opposite
signs.  Therefore, Parseval and the arithmetic-geometric mean inequality
give

\[
|R|
\le
8^{\deg P}
\left\{
29^2(\rho^{2d+2}+\rho^{2d})
+9^2(\rho^2+1)
+12^2\rho^{2h+2}
\right\}^{M/2}.                                    \tag{3.1}
\]

Every exponent in braces is at most (2M), and hence

\[
\rho^{2j}\le\left(\frac98\right)^2=\frac{81}{64}.
\]

Since

\[
(2\cdot29^2+2\cdot9^2+12^2)\frac{81}{64}
<2517<51^2,
\]

equation (3.1) gives

\[
0<|R|<408^M.                                       \tag{3.2}
\]

The established rational estimate (M<171r/1000), together with the
exact comparison

\[
408^{171}5^{1000}<14^{1000},
\]

now gives

\[
0<|R|<\left(\frac{14}{5}\right)^r.                \tag{3.3}
\]

## 4. The endpoint (h=M-1)

It remains to consider (e=B-1).  Using (8z^M=9) in (2.4), and
multiplying by (2), gives the unit-equivalent polynomial

\[
Q(X):=58X^{d+1}-58X^d+18X-45.                     \tag{4.1}
\]

### 4.1 The range (d\le M-2)

In this range, (deg Q<M), (Q(1)=-27), and the resultant

\[
R_Q:=\operatorname{Res}(F,Q)
\]

is nonzero and divisible by (D).  At every (3)-adic root of (F),
the root valuation is (2/M).  Consequently,

\[
v_3(R_Q)
\ge
\min_j\{Mv_3([X^j]Q)+2j\}
=2d.                                                \tag{4.2}
\]

Thus

\[
S_Q:=\frac{R_Q}{9^d}
\]

is a nonzero integer divisible by (D).  Note that this is full-modulus
divisibility, since (3\nmid D).

The labeled coefficient-square sum satisfies

\[
(2\cdot58^2+18^2+45^2)\frac{81}{64}
<11489<108^2.
\]

It follows that

\[
0<|S_Q|
<8^{d+1}9^{-d}108^M
<8\cdot108^M.                                      \tag{4.3}
\]

The exact comparisons

\[
108^{171}2^{1000}<5^{1000},
\qquad
8\cdot25^{100}<28^{100},
\]

and (r>100) put the last quantity in (4.3) below
((14/5)^r).

### 4.2 The corner (d=M-1)

Here (c=L).  Reducing the leading (X^M) term in (4.1) gives

\[
Q_*(X):=-232X^{M-1}+72X+81,                        \tag{4.4}
\]

with (Q_*(z)=0\pmod D).  The same (3)-adic root valuation gives

\[
v_3\operatorname{Res}(F,Q_*)\ge2M-2.              \tag{4.5}
\]

Here (Q_*(1)=-79), so irreducibility of (F) makes the resultant
nonzero.

After division by (9^{M-1}), the remaining norm is less than

\[
\left{
(232^2+72^2+81^2)\frac{81}{64}
\right\}^{M/2}
<289^M.                                             \tag{4.6}
\]

Finally,

\[
289^{171}5^{1000}<14^{1000},
\]

so the quantity in (4.6) is also less than ((14/5)^r).

## 5. Contradiction

The established determinant estimate implies

\[
243\left(\frac{14}{5}\right)^r<D                  \tag{5.1}
\]

above the period barrier.  In each of Sections 3 and 4, we have produced
a nonzero integer divisible by (D) whose absolute value is less than
((14/5)^r).  This is impossible.  Therefore,

\[
\boxed{
\begin{gathered}
\text{No coprime denominator-one two-level candidate has run type }3+1\\
\text{with internal triple word }21\text{ and }c<e.
\end{gathered}
}                                                   \tag{5.2}
\]

## 6. The reverse order inside ([L,B))

We now assume

\[
A=29,
\qquad
L\le e<c<B.
\]

Put

\[
d:=c-e,
\qquad
h:=c-L.
\]

Then (1\le d\le h\le M-1).  The same (L)-anchor used in Section 2
gives

\[
P_-(z)=0\pmod D,
\qquad
P_-(X):=(X-1)(29+9X^d)-12X^{h+1}.                 \tag{6.1}
\]

If (h\le M-2), the argument in Section 3 applies without change.  The
labeled coefficient squares are again (2\cdot29^2+2\cdot9^2+12^2),
and all exponents are less than (M).  Hence

\[
0<|\operatorname{Res}(F,P_-)|<408^M
<\left(\frac{14}{5}\right)^r.                     \tag{6.2}
\]

Suppose now that (h=M-1), so (c=B-1).  Reducing the (X^M) term in
(6.1), and multiplying by (2), gives

\[
Q_-(X):=18X^{d+1}-18X^d+58X-85.                   \tag{6.3}
\]

First let (d\le M-2), and put (m:=d+1).  At every (2)-adic root of
(F), the root valuation is (-3/M).  The leading factor
(8^m) in the resultant is included in the following standard bound:

\[
v_2\operatorname{Res}(F,Q_-)
\ge
\min_j\{Mv_2([X^j]Q_-)+3(m-j)\}
=\min(M,3m).                                       \tag{6.4}
\]

After removing this power of (2), the residual leading factor is at
most (4^M).  Indeed, it is (1) when (3m\le M), while otherwise it
is

\[
\frac{8^m}{2^M}<4^M.
\]

Moreover,

\[
(2\cdot18^2+58^2+85^2)\frac{81}{64}
<120^2.
\]

The resulting nonzero integer, which remains divisible by (D), has
absolute value less than

\[
480^M<\left(\frac{299}{100}\right)^r.              \tag{6.5}
\]

The last comparison is certified by

\[
480^{171}100^{1000}<299^{1000}.
\]

Finally, if (d=M-1), then (e=L).  A second endpoint reduction gives

\[
Q_{-*}(X):=-72X^{M-1}+232X-259.                    \tag{6.6}
\]

Here (Q_{-*}(1)=-99), and

\[
v_2\operatorname{Res}(F,Q_{-*})\ge3M-3.            \tag{6.7}
\]

This cancels the complete leading factor (8^{M-1}).  Since

\[
(72^2+232^2+259^2)\frac{81}{64}<400^2,
\]

the remaining norm is less than

\[
400^M<\left(\frac{299}{100}\right)^r.              \tag{6.8}
\]

The determinant comparison established in the run-(4) theorem gives

\[
\left(\frac{299}{100}\right)^r<D.
\]

Equations (6.2), (6.5), and (6.8) exclude every reverse-order cell with
(L\le e<c<B).

## 7. The lower part of the crossing cell

We next assume

\[
A=29,
\qquad
0<e<L\le c<B,
\qquad
e\le M-1.                                         \tag{7.1}
\]

Put

\[
a:=c-L,
\qquad
h:=\max(a,e).
\]

Thus (0\le a\le M-1) and (1\le e\le M-1).  We use the
(L)-anchor for the run term and the zero anchor for the isolated term.
Equation (1.2) becomes

\[
P_\times(z)=0\pmod D,                              \tag{7.2}
\]

where

\[
\boxed{
P_\times(X):=(X-1)
 \bigl(29X^{h-a}+12X^{h-e}\bigr)-12X^{h+1}.
}                                                   \tag{7.3}
\]

As before, (3P_\times(z)) is (4z^h) times the left side of
(1.2).  In particular, no division modulo (D) has been hidden in
(7.2).

### 7.1 Interior

Suppose (a,e\le M-2).  Then (h\le M-2) and
(\deg P_\times<M).  The only same-sign collision among the five
labeled monomials in (7.3) occurs when (a=e).  In that event the two
positive coefficients, and separately the two negative coefficients,
merge to (41) and (-41).  Every other collision has opposite signs.
Consequently, the coefficient-square sum is at most

\[
2\cdot41^2+12^2=3506.
\]

The argument of Section 3 therefore gives

\[
0<\left|\operatorname{Res}(F,P_\times)\right|
 <(8\cdot67)^M=536^M
 <\left(\frac{299}{100}\right)^r,                 \tag{7.4}
\]

where the exact comparisons are

\[
3506\cdot81<67^2\cdot64,
\qquad
536^{171}100^{1000}<299^{1000}.                   \tag{7.5}
\]

### 7.2 Endpoint (a=M-1>e)

Let (d:=M-1-e), so (1\le d\le M-2).  Reducing the
(X^M)-term in (2P_\times) gives

\[
Q_a(X):=24X^{d+1}-24X^d+58X-85.                  \tag{7.6}
\]

Its degree is (m=d+1<M), and (Q_a(1)=-27).  At a
(2)-adic root of (F), the root valuation is (-3/M), whence

\[
\begin{aligned}
v_2\operatorname{Res}(F,Q_a)
&\ge\min_j\{Mv_2([X^j]Q_a)+3(m-j)\}\\
&=3m.                                               \tag{7.7}
\end{aligned}
\]

The four candidates in the minimum are
(3M,3M+3,M+3d,3m); here (M>3).  Division by (2^{3m})
cancels the complete leading factor (8^m).  Moreover,

\[
(2\cdot24^2+58^2+85^2)\frac{81}{64}<122^2.
\]

We obtain a nonzero integer divisible by (D) whose absolute value is
less than

\[
122^M<\left(\frac{299}{100}\right)^r.             \tag{7.8}
\]

### 7.3 Endpoint (e=M-1>a)

Let (d:=M-1-a), initially with (1\le d\le M-2).  This time
the reduced polynomial is

\[
Q_e(X):=58X^{d+1}-58X^d+24X-51.                  \tag{7.9}
\]

Again (m=d+1<M) and (Q_e(1)=-27).  The two local bounds are

\[
\begin{aligned}
v_2\operatorname{Res}(F,Q_e)&\ge\min(M,3m),\\
v_3\operatorname{Res}(F,Q_e)&\ge\min(2d,M).
\end{aligned}                                      \tag{7.10}
\]

Also

\[
(2\cdot58^2+24^2+51^2)\frac{81}{64}<112^2.        \tag{7.11}
\]

If (3m\le M), the (2)-adic content cancels (8^m).  If
(3m>M) and (2d\le M), the residual leading factor is

\[
\frac{8^m}{2^M3^{2d}}
=8\left(\frac89\right)^d2^{-M}<8.
\]

If (3m>M) and (2d>M), it is at most

\[
\frac{8^m}{2^M3^M}\le8\left(\frac43\right)^M.
\]

In all cases the normalized resultant is less than

\[
8\cdot150^M<\left(\frac{299}{100}\right)^r.       \tag{7.12}
\]

Here we use the exact comparisons

\[
150^{171}2^{1000}<5^{1000},
\qquad
8\cdot250^{100}<299^{100}.                         \tag{7.13}
\]

There remains the corner (d=M-1), equivalently (a=0).  A second
endpoint reduction gives

\[
Q_{e*}(X):=-232X^{M-1}+96X+57.                    \tag{7.14}
\]

Here (Q_{e*}(1)=-79) and

\[
v_2\operatorname{Res}(F,Q_{e*})\ge3M-3.           \tag{7.15}
\]

After division by (2^{3M-3}), the complete leading factor is gone.
The remaining norm is less than

\[
290^M<\left(\frac{299}{100}\right)^r,             \tag{7.16}
\]

since

\[
(232^2+96^2+57^2)81<290^2\cdot64,
\qquad
290^{171}100^{1000}<299^{1000}.                   \tag{7.17}
\]

### 7.4 The simultaneous endpoint

Finally suppose (a=e=M-1).  The two anchored monomials merge and

\[
P_\times(X)=41(X-1)-12X^M.
\]

After the first endpoint reduction,

\[
Q_{ae}(X):=82X-109.                                \tag{7.18}
\]

We have (Q_{ae}(1)=-27) and

\[
v_2\operatorname{Res}(F,Q_{ae})\ge3.
\]

This cancels its leading factor (8).  The normalized norm is less than
(143^M), because

\[
82^2\cdot81+109^2\cdot64<143^2\cdot64.            \tag{7.19}
\]

The comparison

\[
143^{171}100^{1000}<299^{1000}                    \tag{7.20}
\]

finishes this endpoint.  In all four subcases the normalized resultant
is a nonzero integer divisible by (D).  Since
((299/100)^r<D), this proves

\[
\boxed{
A=29,\quad 0<e<L\le c<B,\quad e\le M-1
\quad\Longrightarrow\quad\text{impossible}.       \tag{7.21}
}
\]

## 8. Exact certificate and remaining cells

The script
[cycles/four_shift_31_A29_partial_certificate.js](cycles/four_shift_31_A29_partial_certificate.js)
checks every integer comparison in Sections 3, 4, 6, and 7.  It also
verifies the compression, all three normal forms, and every endpoint
reduction on each sampled coprime (21+1) cell through period (200).

The exact (M)-fold diagnostic shows why this cell is easier than its
three companions.  Both residues lie in ([L,B)), so the same (L)-anchor
places the complete polynomial in one interval of width (M).  In the
other cells, the best elementary anchor can cross an (M)-boundary.  A
forced folded content often removes that boundary cost, but not uniformly.
The remaining targets are exactly

\[
(A,c\mathrel{<}e)=(23,c<e),
\qquad
(A,e\mathrel{<}c)=(23,e<c),
\qquad
(A,e,c)=(29,M\le e<L\le c).                       \tag{8.1}
\]

No finite scan is promoted for these three cells.

For the last (A=29) strip, put (e=M+x).  The identity
(L=2M+E) shows that the first unresolved Euclidean cell is
(0\le x\le E).  After one (M)-fold its polynomial has the form

\[
(X-1)(232+81X^u)-96X^{a+1},
\qquad
u=a+E-x.                                           \tag{8.2}
\]

Thus the obstruction has been reduced to an (E)-width crossing problem,
not to a finite search.
