# The one-drop cyclotomic gcd gate

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** We prove an exact gcd identity and an exact block projection for
every homogeneous cyclotomic factor of \(2^N-3^r\). At
\((r,N)=(30,48)\), every cyclotomic factor and every prime-power factor is
annihilated by some anchored strict-least one-drop profile. Thus there is
no profile-independent surviving prime or cyclotomic factor. The factors
must be controlled simultaneously for one fixed profile. No all-depth
proof of denominator nonvanishing is claimed.

## 1. The gcd bridge between the two coordinates

Fix \(r\geq3\), and put

\[
P:=3^r,
\qquad N:=\lceil r\log _2 3\rceil,
\qquad D:=2^N-P.
\tag{1}
\]

Let

\[
B_i:=\left\lfloor\frac{iN}{r}\right\rfloor,
\qquad g_i:=B_{i+1}-B_i,
\tag{2}
\]

and let \(E:=\{i<r-1:g_i=2\}\). Choose a nonempty set
\(S\subseteq E\), put \(U:=|S|\), and define the anchored one-drop word

\[
a_i:=g_i-\mathbf 1_S(i)\quad(i<r-1),
\qquad a_{r-1}:=U+2.
\tag{3}
\]

If \(A_i:=\sum_{j<i}a_j\), its carry is

\[
C:=\sum_{i=0}^{r-1}3^{r-1-i}2^{A_i}.
\tag{4}
\]

List the unselected sites as

\[
E\setminus S=\{j_1<\cdots<j_V\}.
\]

Since \(U+V=N-r-1\), the complement formula gives

\[
C=P-2^{r+V}
+\sum_{k=1}^{V}2^{j_k+k}3^{r-j_k-1}.
\tag{5}
\]

Put \(t_k:=j_k+1\), and define

\[
M:=2^{r-1+V},
\qquad
J:=\sum_{k=1}^{V}3^{r-1-t_k}2^{t_k+k-2},
\tag{6}
\]

\[
K:=2^{N-1}-M+3J.
\tag{7}
\]

Equations (5) through (7) give the exact identity

\[
\boxed{2K=C+D.}
\tag{8}
\]

In other words, if \(x:=C/D\) and \(Q:=(x+1)/2\), then \(Q=K/D\).
Since \(D\) is odd, equation (8) gives

\[
\boxed{
\gcd(D,K)=\gcd(D,C),
\qquad
\frac{D}{\gcd(D,K)}=\frac{D}{\gcd(D,C)}.
}
\tag{9}
\]

Thus the reduced denominator is identical in the full-modulus and
bottom-normalized coordinates.

There is also an exact rotational form. Let \(C_i\) be the carry of the
cyclic rotation beginning at \(a_i\), with indices taken modulo \(r\). We
have

\[
2^{a_i}C_{i+1}=3C_i+D.
\tag{10}
\]

If \(G:=\gcd(C_0,\ldots,C_{r-1})\), equation (10) shows that \(G\mid D\).
Conversely, \(\gcd(C_0,D)\) divides every \(C_i\), since it is odd and we
may apply (10) successively. Since both \(C_i\) and \(D\) are odd, put
\(K_i:=(C_i+D)/2\). Therefore,

\[
\boxed{
\gcd(C_0,\ldots,C_{r-1})
=\gcd(D,C_i)
=\gcd(D,K_i)
}
\tag{11}
\]

for every rotation \(i\). Prime divisibility at different rotations is
therefore one gcd condition, not a family of independent conditions.

## 2. Exact cyclotomic block projection

We now suppose that

\[
d:=\gcd(r,N),
\qquad r=dr_0,
\qquad N=dN_0,
\tag{12}
\]

and put

\[
\alpha:=2^{N_0},
\qquad \beta:=3^{r_0}.
\tag{13}
\]

The gap has the homogeneous factorization

\[
D=\alpha^d-\beta^d
=\prod_{m\mid d}\Phi_m(\alpha,\beta).
\tag{14}
\]

The mechanical clock repeats in blocks of length \(r_0\). Namely, if

\[
\mathcal B_s:=\left\lfloor\frac{sN_0}{r_0}\right\rfloor,
\qquad 0\leq s\leq r_0,
\tag{15}
\]

then \(B_{jr_0+s}=jN_0+\mathcal B_s\). For the \(j\)-th block, define

\[
H_j:=|S\cap[0,jr_0)|,
\qquad
h_{j,s}:=|S\cap[jr_0,jr_0+s)|,
\tag{16}
\]

and

\[
R_j:=\sum_{s=0}^{r_0-1}
3^{r_0-1-s}2^{\mathcal B_s-h_{j,s}}.
\tag{17}
\]

The displayed powers of \(2\) are integral. Indeed,
\(0\leq h_{j,s}\leq s\leq\mathcal B_s\), since
\(N_0/r_0=N/r>1\). Also,
\(0\leq H_j\leq jr_0\leq jN_0\), and hence

\[
\alpha^j2^{-H_j}=2^{jN_0-H_j}\in\mathbf{Z}.
\tag{17a}
\]

Grouping (4) by blocks gives

\[
\boxed{
C=\sum_{j=0}^{d-1}
\beta^{d-1-j}\alpha^j2^{-H_j}R_j.
}
\tag{18}
\]

Thus every summand in (18) is an integer. The negative powers are only a
convenient way to display the cumulative omission height.

Fix \(m\mid d\), put

\[
\Delta_m:=\Phi_m(\alpha,\beta),
\qquad
\zeta:=\alpha\beta^{-1}\pmod {\Delta_m}.
\tag{19}
\]

Both \(2\) and \(\beta\) are units modulo \(\Delta_m\). Indeed,
\(\Delta_m\) is odd, and the monicity of the homogeneous cyclotomic
polynomial gives
\(\Delta_m\equiv\alpha^{\varphi(m)}\pmod\beta\). Since
\(\gcd(\alpha,\beta)=1\), the claim follows. Dividing (18) by
\(\beta^{d-1}\) gives the exact projection

\[
\boxed{
\Delta_m\mid C
\quad\Longleftrightarrow\quad
\sum_{j=0}^{d-1}\zeta^j2^{-H_j}R_j
\equiv0\pmod {\Delta_m}.
}
\tag{20}
\]

Moreover, \(\zeta^m=1\) modulo \(\Delta_m\). Hence (20) may be grouped
into \(m\) residue classes:

\[
\sum_{c=0}^{m-1}\zeta^c
\sum_{\substack{0\leq j<d\\j\equiv c\pmod m}}
2^{-H_j}R_j
\equiv0\pmod {\Delta_m}.
\tag{21}
\]

This is a genuine block reduction, but the coefficients remain coupled.
Both \(H_j\) and \(R_j\) depend on the same globally ordered selected set.
When \(d=1\), equation (20) is the original full-modulus congruence and
there is no cyclotomic splitting at all.

## 3. Every factor is locally attainable at one clock

We now give an exact obstruction to a profile-independent factor argument.
Take

\[
(r,N)=(30,48),
\qquad (r_0,N_0,d)=(5,8,6).
\tag{22}
\]

The mechanical word is \((1,2,1,2,2)^6\), before the terminal one-drop
modification. We have

\[
\alpha=256,
\qquad \beta=243,
\]

and

\[
\begin{aligned}
D&=75{,}583{,}844{,}616{,}007\\
 &=\Phi_1(\alpha,\beta)
   \Phi_2(\alpha,\beta)
   \Phi_3(\alpha,\beta)
   \Phi_6(\alpha,\beta)\\
 &=13\cdot499\cdot186{,}793\cdot62{,}377,
\end{aligned}
\tag{23}
\]

where

\[
62{,}377=7^2\cdot19\cdot67.
\tag{24}
\]

The following table uses zero-based selected sites. In the final column,
\(\delta\) is the least value of \(C_i-C_0\) over the 29 nontrivial
rotations.

\[
\begin{array}{c|c|r|r|r|r}
\text{factor}&S&C&\gcd(C,D)&D/\gcd(C,D)&\delta\\ \hline
\Phi_1&\{3,4\}
&639{,}278{,}380{,}316{,}797
&13&5{,}814{,}141{,}893{,}539
&127{,}149{,}700{,}424{,}604\\
\Phi_2&\{9\}
&1{,}204{,}870{,}545{,}887{,}261
&499&151{,}470{,}630{,}493
&32{,}999{,}723{,}968{,}640\\
\Phi_3&\{14\}
&1{,}354{,}859{,}555{,}967{,}005
&186{,}793&404{,}639{,}599
&25{,}383{,}094{,}550{,}528\\
\Phi_6&\{9,11,16,18,19,24\}
&729{,}904{,}608{,}530{,}461
&810{,}901&93{,}209{,}707
&57{,}119{,}087{,}975{,}040
\end{array}
\tag{25}
\]

In the last row,

\[
810{,}901=13\cdot62{,}377.
\tag{26}
\]

Thus the displayed carry is divisible by the entire \(\Phi_6\) factor,
as well as by \(\Phi_1\). Every value of \(\delta\) in (25) is positive,
so each rational orbit is strictly least at the displayed anchor. By
(9), the same factor divides the corresponding bottom numerator \(K\).

Consequently, every homogeneous cyclotomic factor in (23) divides \(K\)
for some exact anchored strict-least profile. The same is true of every
prime-power factor

\[
49,\ 13,\ 19,\ 67,\ 499,\ 186{,}793.
\tag{27}
\]

These are countermodels to universal survival of an individual factor.
They are not denominator-one counterexamples, since the reduced
denominators in (25) are all greater than one.

## 4. Exhaustive audit at the countermodel clock

The checker
[cycles/one_drop_cyclotomic_gcd_certificate.js](cycles/one_drop_cyclotomic_gcd_certificate.js)
uses `BigInt` for every carry, factor, gcd, and divisibility computation.
Only the bounded clock indices are ordinary integers. It verifies (8),
(9), (10), and (11) for the four displayed profiles, audits the bottom
formula (6) and (7), and checks strict leastness at every rotation. It
independently reconstructs the block identity (18) and every cyclotomic
projection (20) and (21).

It also exhausts all

\[
2^{17}-1=131{,}071
\]

nonempty anchored profiles at \(r=30\). The exact results are

\[
\max_S\gcd(C(S),D)=810{,}901,
\qquad
\min_S\frac{D}{\gcd(C(S),D)}=93{,}209{,}707.
\tag{28}
\]

The maximizing profile is unique. No profile has denominator one. Every
factor in (27), and every cyclotomic factor in (23), occurs in at least
one gcd. At most two of the four cyclotomic factors occur simultaneously
for any one profile.

Equation (28) is a finite theorem at one depth. It does not imply an
all-depth lower bound for the reduced denominator.

## 5. Consequence for the arithmetic route

The gcd route has two exact simplifications. First, the full carry and the
bottom numerator have precisely the same common divisor with \(D\).
Second, a homogeneous cyclotomic factor sees only the grouped block sum
in (21).

The example (25) shows the limitation sharply. No prime-power factor and
no homogeneous cyclotomic factor survives uniformly, even after anchored
eligibility and strict leastness are imposed. The missing assertion is a
simultaneous nonvanishing theorem for all prime-power projections of one
fixed selected set. For coprime \((r,N)\), even the block decomposition is
absent.

Therefore, the cyclotomic and prime-factor route does not yet prove
\(D\nmid K\). It relocates the denominator-one obstruction from one large
congruence to a coupled family of smaller congruences, but none of those
congruences is individually forbidden.
