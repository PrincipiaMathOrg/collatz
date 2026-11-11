# Completion of the (21+1) crossing sector

**Mode:** SOLVE.  We close the strip left open in
`cycle_four_shift_31_partial.md` by changing anchors at the two upper
Euclidean boundaries.

**Status:** Under the established coprime, strict-record,
denominator-one hypotheses, no exactly-four two-level candidate of run
type (3+1) can have internal triple word (21).  The earlier report
proved every (A=29) cell except

\[
M\le e<L\le c<B.
\]

The theorem below excludes this last strip at every depth above the
period barrier.  No finite period scan is used.

## Updating proof skeleton

1. **PROVED:** (A=29,c<e) is impossible.
2. **PROVED:** (A=29,L\le e<c) is impossible.
3. **PROVED:** (A=29,e<L\le c,e\le M-1) is impossible.
4. **PROVED HERE:** (A=29,M\le e<L\le c) is impossible.
5. **PROVED, COMBINED:** the complete (A=29), internal-word-(21)
   sector is empty.
6. **CERTIFIED FINITE:** a coefficient certificate verifies all exact
   comparisons and audits every derived normal form on sampled coprime
   cells through (r=200).
7. **REMAINING IN RUN TYPE (3+1):** the two (A=23), internal-word-(12)
   orders.

## 1. Setup and the remaining strip

Retain

\[
\begin{aligned}
N&=\lceil r\log_2 3\rceil,&D&=2^N-3^r,&B&=N-r,\\
L&=r-B,&M&=B-L,&E&=L-2M,\\
F&=M-2E,&G&=E-3F.
\end{aligned}                                      \tag{1.1}
\]

The specific Bezout root satisfies

\[
3z^L=4,\qquad 8z^M=9,\qquad 243z^E=256,\qquad
2^{19}z^F=3^{12},\qquad 3^{41}z^G=2^{65}\pmod D.   \tag{1.2}
\]

We use

\[
M=2E+F,\qquad E=3F+G,                              \tag{1.3}
\]

and the established estimates

\[
M<\frac{171r}{1000},\qquad
F<\frac{21r}{1000},\qquad
G<\frac r{53}.                                    \tag{1.4}
\]

One mild sharpening is convenient.  The exact inequality

\[
2^{1981}<3^{1250}
\]

gives (log_2 3>1981/1250), and hence

\[
E=8r-5N<\frac{19r}{250}.                           \tag{1.5}
\]

Assume now

\[
A=29,\qquad M\le e<L\le c<B.
\]

Put

\[
a:=c-L,\qquad d:=c-e=L+a-e.
\]

Then

\[
0\le a<M,\qquad d>a,\qquad d<L,                    \tag{1.6}
\]

and the (L)-anchored gate is

\[
P(z)=0\pmod D,\qquad
P(X):=(X-1)(29+9X^d)-12X^{a+1}.                   \tag{1.7}
\]

Indeed, (P(z)=z^c) times the grouped gate.  We divide the proof into

\[
d<M,\qquad M\le d<2M,\qquad 2M\le d<L.             \tag{1.8}
\]

Every polynomial used below has degree at most the degree of its
irreducible Euclidean binomial.  If equality occurs, the polynomial is
not a scalar multiple of that binomial.  This is immediate from its
intermediate coefficient.  Thus every resultant below is nonzero.

## 2. A norm convention

For a polynomial whose total positive coefficient mass is (S_+) and
whose total negative coefficient mass is (S_-), aliases can only lower
the coefficient-square sum below

\[
U:=S_+^2+S_-^2.                                    \tag{2.1}
\]

Parseval on the roots of the relevant binomial gives the following two
bounds.  If all exponents are at most (E), then either of the binomials

\[
243X^E-256,\qquad 256X^E-243
\]

gives

\[
|\operatorname{Res}|<(256\sqrt U)^E.               \tag{2.2}
\]

For (2^{19}X^F-3^{12}), the corresponding bound is

\[
|\operatorname{Res}|<(3^{12}\sqrt U)^F.            \tag{2.3}
\]

The identities follow because the root-radius factor cancels the leading
binomial coefficient.  They remain valid when the second polynomial has
degree exactly (E) or (F).

We shall repeatedly use the exact uniform (E)-comparison

\[
256^2\cdot28{,}275{,}538<1{,}400{,}000^2,\qquad
1{,}400{,}000^{19}100^{250}<299^{250}.             \tag{2.4}
\]

Together with (1.5), it puts every (E)-resultant below
(((299/100)^r)) whenever (U\le28{,}275{,}538).

## 3. The branch (d<M)

If (d\le M-2), then (a\le M-2).  The only same-sign collision not
already present in the labeled square sum occurs when (d=a+1), where
the coefficients (-9) and (-12) merge.  Hence

\[
U\le29^2+9^2+29^2+21^2=2204.
\]

Since

\[
2204\cdot81<53^2\cdot64,
\]

the (8X^M-9) resultant is less than

\[
424^M<\left(\frac{299}{100}\right)^r.             \tag{3.1}
\]

The last comparison is certified exactly from (M<171r/1000).

It remains to take (d=M-1).  The condition (e<L) forces
(a\le M-2).  Reducing the (X^M)-term in (8P) gives

\[
Q(X):=-72X^{M-1}-96X^{a+1}+232X-151.              \tag{3.2}
\]

At a (2)-adic root of (8X^M-9),

\[
v_2\operatorname{Res}(8X^M-9,Q)\ge3M-3.           \tag{3.3}
\]

This cancels the complete leading factor (8^{M-1}).  The only
same-sign variable collision is (-72-96), so

\[
(168^2+232^2+151^2)\frac{81}{64}<365^2.
\]

After division by (2^{3M-3}), the normalized resultant is less than

\[
365^M<\left(\frac{299}{100}\right)^r.             \tag{3.4}
\]

## 4. The branch (d\ge2M)

Write

\[
d=2M+v,\qquad 0\le v<E,\qquad f:=M-a.
\]

The inequality (e\ge M) is equivalent to

\[
1\le f\le E-v.                                    \tag{4.1}
\]

Fold (1.7) twice at (M), multiply by (X^{f-1}), and fold the final
(X^M)-term.  We obtain

\[
Q(X)=1856(X^f-X^{f-1})
     +729(X^{v+f}-X^{v+f-1})-864.                 \tag{4.2}
\]

All exponents are at most (E).  Its signed energy is at most

\[
(1856+729)^2+(1856+729+864)^2=18{,}577{,}826,
\]

which is below the uniform threshold in (2.4).  The (E)-resultant
therefore excludes the complete branch, including (v+f=E).

## 5. The middle branch and its upper half

Suppose

\[
d=M+u,\qquad 0\le u<M.
\]

The condition (e\ge M) gives

\[
u\le a+E.                                         \tag{5.1}
\]

One (M)-fold turns (1.7) into

\[
W(X):=(X-1)(232+81X^u)-96X^{a+1}.                 \tag{5.2}
\]

First assume (a\ge2E).  Write

\[
a=2E+b,\qquad 0\le b<F,\qquad f:=M-a=F-b.
\]

Multiplication by (X^{f-1}) and one (M)-fold give

\[
Q(X)=232(X^f-X^{f-1})+81(X^k-X^{k-1})-108,
\qquad k:=u+f<3E.                                  \tag{5.3}
\]

Write (k=qE+w), with (q\in\{0,1,2\}).

If (q=0), equation (5.3) is an (E)-polynomial with coefficient
triple ((232,81,108)).  If (q=1,w\ge1), one (E)-fold gives

\[
696(X^f-X^{f-1})+256(X^w-X^{w-1})-324.            \tag{5.4}
\]

Both signed energies are smaller than the threshold in (2.4).  The
endpoint (q=1,w=0) is handled directly from (5.3), whose degree is
(E).

Suppose (q=2,w\ge1).  Two (E)-folds give

\[
169128(X^f-X^{f-1})
+65536(X^w-X^{w-1})-78732.                         \tag{5.5}
\]

Here (w<2F).  If (w\le F), use the (F)-resultant directly.  If
(w>F), one (F)-fold gives

\[
1353024(X^f-X^{f-1})
+531441(X^{w-F}-X^{w-F-1})-629856.                 \tag{5.6}
\]

Finally, if (q=2,w=0), multiply (5.3) by (X) before folding twice:

\[
169128(X^{f+1}-X^f)-13196X-65536.                 \tag{5.7}
\]

For (f<F), this is again an (F)-polynomial.  For (f=F), the last
(F)-fold leaves the linear polynomial with coefficients

\[
\begin{aligned}
C_1&=169128\cdot3^{12}-13196\cdot2^{19},\\
C_0&=-169128\cdot3^{12}-65536\cdot2^{19}.
\end{aligned}                                      \tag{5.8}
\]

For every polynomial in (5.5)--(5.8), the certificate verifies

\[
3^{12}\sqrt U<10^{17},\qquad
10^{357}100^{1000}<299^{1000}.                    \tag{5.9}
\]

Equations (1.4), (2.3), and (5.9) close the entire upper half
(a\ge2E).

## 6. The three lower (E)-cells

We now have (a<2E).  Write

\[
a=q_aE+b,\qquad u=q_uE+v,\qquad 0\le b,v<E.
\]

By (5.1), (q_u\le q_a+1).  Direct (E)-folding gives the following
three primitive coefficient triples:

\[
\begin{array}{c|c|c}
q_a&q_u&(A,B,C)\\
\hline
0&0&(232,81,96)\\
0&1&(87,32,36)\\
1&1&(2349,864,1024).
\end{array}                                        \tag{6.1}
\]

The polynomial is

\[
A(X-1)+B(X^{v+1}-X^v)-CX^{b+1}.                   \tag{6.2}
\]

In every row,

\[
(A+B)^2+(A+B+C)^2\le28{,}275{,}538.               \tag{6.3}
\]

Thus (2.4) closes all three cells.

## 7. The lower-left cell ((q_a,q_u)=(1,0))

Here

\[
a=E+b,\qquad u<E.
\]

If (b<u), put (k=a-u<E), pass to (X=z^{-1}), and fold (a)
once with (256X^E=243).  After division by (24), the reciprocal
polynomial is

\[
2349(X^b-X^{b+1})+864(X^k-X^{k+1})-1024.          \tag{7.1}
\]

Its signed energy is the maximum in (6.3), so (2.4) applies.

Assume (b\ge u).  Write

\[
b=pF+s,\qquad u=qF+t,\qquad 0\le s,t<F.
\]

Then (0\le q\le p\le3), and (s\ge t) when (p=q).  Define

\[
\begin{array}{c|ccc}
&C_0&C_u&C_a\\
\hline
v_2&3&-19q&13-19p\\
v_3&0&4+12q&-4+12p\\
\text{odd part}&29&1&1.
\end{array}                                        \tag{7.2}
\]

Subtract the minimum in each valuation row and call the resulting
positive integer coefficients (A_{p,q},B_{p,q},C_{p,q}).  The exact
normal form is

\[
R_{p,q}(X)=A_{p,q}(X-1)
+B_{p,q}(X^{t+1}-X^t)-C_{p,q}X^{s+1}.             \tag{7.3}
\]

For the nine pairs

\[
(p,q)\in\{(0,0),(1,0),(1,1),(2,0),(2,1),(2,2),
                 (3,0),(3,1),(3,2)\},             \tag{7.4}
\]

put

\[
U_{p,q}:=(A_{p,q}+B_{p,q})^2
 +(A_{p,q}+B_{p,q}+C_{p,q})^2.
\]

The exact coefficient certificate proves uniformly that

\[
3^{24}U_{p,q}<10^{44},\qquad
10^{462}100^{1000}<299^{1000}.                    \tag{7.5}
\]

Consequently, (2.3), (1.4), and (7.5) close all nine (F)-branches.

The remaining pair is (p=q=3).  Now (0\le t\le s<G), and the
primitive coefficients are

\[
A=29\cdot2^{60},\qquad B=3^{40},\qquad
C=2^{13}3^{32}.                                    \tag{7.6}
\]

Use the (G)-binomial (3^{41}X^G-2^{65}).  The coefficient (C)
cannot collide with a same-sign (A)- or (B)-term because its exponent
is (s+1>t).  Hence

\[
U_G=2(A+B)^2+C^2.                                  \tag{7.7}
\]

If (m=s+1), the (3)-adic root valuation gives

\[
v_3\operatorname{Res}\ge\min(41s,32G).
\]

Since (s+1\le G) and (G>128), the residual leading factor is at most
(3^{9G}).  Also

\[
\left(\frac{2^{65}}{3^{41}}\right)^2<\frac{65}{63}.
\]

After removing the forced (3)-power, the norm is less than

\[
\left(3^9\sqrt{\frac{65U_G}{63}}\right)^G
 <\left(\frac{299}{100}\right)^{53G}
 <\left(\frac{299}{100}\right)^r.                 \tag{7.8}
\]

The middle comparison in (7.8) is the exact integer inequality

\[
3^{18}\cdot65U_G\cdot100^{106}
 <63\cdot299^{106}.                                \tag{7.9}
\]

## 8. The lower-right cell ((q_a,q_u)=(1,2))

Write

\[
a=E+b,\qquad u=2E+v.
\]

Equation (5.1) gives (0\le v\le b<E), while (u<M=2E+F) gives
(v<F).  Put

\[
f:=M-u=F-v,\qquad k:=u-a=E+v-b,\qquad
p:=f+k=E+F-b.                                      \tag{8.1}
\]

Multiplying (5.2) by (8X^{f+k-1}) and folding at (M) gives

\[
R(X)=1856(X^p-X^{p-1})+729(X^k-X^{k-1})-864.      \tag{8.2}
\]

If (p\le E), this is exactly the fourth coefficient triple covered by
(2.4).  Suppose (p>E).  Then (b<F).  Put
(delta:=b-v), multiply (8.2) by (X^\delta), and fold at (E).
The result is

\[
\begin{split}
Q(X)={}&475136(X^f-X^{f-1})-177147X^{E-1}\\
      &-209952X^\delta+186624.                     \tag{8.3}
\end{split}
\]

At an (E)-binomial root,

\[
v_2\operatorname{Res}\ge5E,\qquad
v_3\operatorname{Res}\ge5(E-1-f).                 \tag{8.4}
\]

The signed coefficient energy is at most

\[
U_*=(475136+186624)^2
 +(475136+177147+209952)^2
=1{,}181{,}375{,}492{,}825.                        \tag{8.5}
\]

Since (f\le F<E/3) and (3^{5/3}<7), the normalized resultant is
less than

\[
\left(\frac{56\sqrt{U_*}}{243}\right)^E
 <251000^E
 <\left(\frac{299}{100}\right)^r.                 \tag{8.6}
\]

The two exact comparisons used here are

\[
56^2U_*<251000^2\cdot243^2,\qquad
251000^{19}100^{250}<299^{250}.                    \tag{8.7}
\]

This completes every subcase of (M\le d<2M).

## 9. Contradiction and combined theorem

Every normalized resultant constructed above is a nonzero integer
divisible by (D).  Dividing by powers of (2) or (3) preserves the
full (D)-divisibility because (gcd(D,6)=1).  On the other hand, each
has absolute value less than

\[
\left(\frac{299}{100}\right)^r<D.
\]

This contradiction proves

\[
\boxed{
A=29,\quad M\le e<L\le c<B
\quad\Longrightarrow\quad\text{impossible}.
}                                                   \tag{9.1}
\]

Together with `cycle_four_shift_31_partial.md`, we obtain

\[
\boxed{
\begin{gathered}
\text{No coprime denominator-one two-level candidate of run type }3+1\\
\text{has internal triple word }21\text{, at any permitted depth.}
\end{gathered}
}                                                   \tag{9.2}
\]

## 10. Exact certificate

The script
[cycles/four_shift_31_A29_crossing_complete_certificate.js](cycles/four_shift_31_A29_crossing_complete_certificate.js)
verifies every integer comparison, all nine (F)-coefficient branches,
the terminal (G)-cell, and every endpoint reduction above.  It also
audits the normal forms on sampled coprime (21+1) crossing cells through
(r=200).  The finite loop is an audit only.  The proof is the all-depth
resultant argument in Sections 1--9.

The terminal line is

    four_shift_31_A29_crossing_complete_certificate_passed=true
