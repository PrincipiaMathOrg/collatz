# The strict \(q=2\) no-wrap gate at terminal delays \(r\leq 3\)

**Date:** 17 August 2026  
**Mode:** SOLVE  
**Status:** strict failures with terminal delay \(r=1,2,3\) are excluded at
all depths. The terminal delay of any surviving strict failure is at least
\(4\). The case of unbounded \(r\) remains open.

## 1. Result

We consider the exact no-wrap normal form in
[`fcd_q2_zero_lift.md`](fcd_q2_zero_lift.md). Let \(s\) be the odd weight,
put

\[
k:=\lceil s\log _2 3\rceil,\qquad e:=k-s,
\]

\[
M:=2^k,\qquad P:=3^s,\qquad D:=M-P,
\]

and suppose that a zero-lift, no-wrap row has canonical start and endpoint

\[
n,\qquad Z=n+d,
\]

with \(d\geq1\). If the last one occurs at \(A=s-1+r\), then \(r\geq1\)
is its terminal delay. We prove the following statements.

1. If \(j_\ell\) is the first rank whose delay is at least \(\ell\), then

   \[
   C=P+\sum_{\ell=1}^{r}
   2^{j_\ell+\ell-1}3^{s-j_\ell}-2^{s+r}.
   \tag{1}
   \]

2. Positivity of \(C-Pd=D(n+d)\), together with every prefix barrier,
   gives the new universal endpoint bound

   \[
   \boxed{d\leq\left\lceil\frac r2\right\rceil.}
   \tag{2}
   \]

3. No strict failure has \(r=1\), \(r=2\), or \(r=3\). In particular,

   \[
   \boxed{d\geq1\quad\Longrightarrow\quad r\geq4.}
   \tag{3}
   \]

4. For every fixed \(r\), the same cut-remainder construction reduces the
   strict branch to an effectively finite collection of sparse
   divisibilities. This statement is not uniform in \(r\). The number of
   cuts, the powers of \(s\), and the finite cutoff all grow with \(r\).

The determinant input is the weakened form

\[
\boxed{\frac DP>\frac1{459s^{14}}.}
\tag{4}
\]

Indeed, the audited linear-form estimate in the preceding report gives
\(D/P>e^{-6.125581}s^{-13.3}\), and its exact Taylor certificate gives
\(e^{6.125581}<459\). Thus \((4)\) introduces no new analytic assumption.

## 2. The delay-level carry

Let the one positions be

\[
0=A_0<A_1<\cdots<A_{s-1},
\]

and put \(d_i:=A_i-i\). The complete prefix barrier is

\[
0=d_0\leq d_1\leq\cdots\leq d_{s-1}=r,
\qquad 2^{i+d_i}\leq3^i.
\tag{5}
\]

For \(1\leq\ell\leq r\), define

\[
j_\ell:=\min\{i:d_i\geq\ell\}.
\tag{6}
\]

Grouping the anchored carry cells by delay level gives

\[
C=P-2^s+\sum_{\ell=1}^{r}
2^{j_\ell+\ell-1}
\left(3^{s-j_\ell}-2^{s-j_\ell}\right).
\]

The negative binary terms sum to

\[
2^s+\sum_{\ell=1}^{r}2^{s+\ell-1}=2^{s+r}.
\]

This proves \((1)\).

We now use the strict endpoint. Since \(C-Pd=D(n+d)>0\), division of
\((1)\) by \(P\) gives

\[
1-d+\sum_{\ell=1}^{r}
2^{\ell-1}\left(\frac23\right)^{j_\ell}
>0.
\tag{7}
\]

The barrier at rank \(j_\ell\) gives

\[
2^{j_\ell+\ell}<3^{j_\ell}.
\]

Equality is impossible because a positive power of \(2\) is not a positive
power of \(3\). Therefore every summand in \((7)\) is strictly smaller than
\(1/2\). We obtain

\[
d<1+\frac r2,
\]

which proves \((2)\). Note that this replaces the exponential target count
\(d\leq2^r-1\) by a linear target count.

## 3. The initial cut

Put \(j:=j_1\). The parity word begins with \(1^j0\), so there is a positive
odd integer \(a\) such that

\[
n=2^ja-1,
\qquad
Z=2^ja+d-1.
\tag{8}
\]

Substitution of \((1)\) and \((8)\) into \(C=Dn+Md\) gives

\[
\boxed{
Da=
\sum_{\ell=1}^{r}
2^{j_\ell-j+\ell-1}3^{s-j_\ell}
-2^{s+r-j}-2^{s+e-j}(d-1).}
\tag{9}
\]

The right side is positive. Its positive part is strictly smaller than

\[
\left(\sum_{\ell=1}^{r}2^{\ell-1}\right)3^{s-j}
=(2^r-1)3^{s-j}.
\]

Combining this observation with \((4)\) gives

\[
\boxed{3^j<459(2^r-1)s^{14}.}
\tag{10}
\]

Thus the first delayed rank is logarithmic in \(s\) whenever \(r\) is
fixed. This is the first step of the general fixed-delay cascade.

## 4. Terminal delay \(r=1\)

Equation \((2)\) forces \(d=1\). Write \(j:=j_1\) and \(t:=s-j\). Equation
\((9)\) becomes

\[
Da=3^t-2^{t+1}.
\tag{11}
\]

Positivity forces \(t\geq4\). In particular,

\[
D\mid 3^t-2^{t+1}.
\tag{12}
\]

Multiplying \((12)\) by \(3^j\) and using \(D=2^{s+e}-3^s\) gives the second
nonzero divisibility

\[
\boxed{D\mid 2^{e+j-1}-3^j.}
\tag{13}
\]

The integer in \((13)\) is odd, so it does not vanish. If \((12)\) holds, then

\[
D<3^{s-j}.
\]

Equations \((4)\) and \((13)\) consequently give

\[
3^j<459s^{14},
\]

and

\[
\left|2^{e+j-1}-3^j\right|
<459s^{14}\left(2^e+1\right).
\]

Since \(q_s=2\), we have \(M/P<4/3\), and hence

\[
2^e<\frac43\left(\frac32\right)^s.
\tag{14}
\]

It follows that the right side in the preceding display is smaller than
\(D\) as soon as

\[
2^s>491589s^{28}.
\tag{15}
\]

The exact certificate verifies \((15)\) at \(s=250\), as well as

\[
(s+1)^{28}<2s^{28}\qquad(s\geq250).
\]

Thus \((15)\) propagates to every \(s\geq250\). For \(s<250\), exact integer
evaluation checks all \(q_s=2\) weights and all \(2\leq j\leq s-4\).
There are \(12{,}444\) candidates and no divisibility hit. We have proved
the following theorem.

**Theorem 1.** No strict \(q=2\), zero-lift, no-wrap FCD failure has terminal
delay \(r=1\).

## 5. Terminal delay \(r=2\)

Equation \((2)\) again forces \(d=1\). Put

\[
j:=j_1,\qquad J:=j_2,\qquad h:=J-j,\qquad t:=s-J.
\]

Equation \((9)\) becomes

\[
Da=F:=3^{s-j}+2^{h+1}3^t-2^{s-j+2}.
\tag{16}
\]

Therefore \(D\mid F\), and \(0<F<3^{s-j+1}\). The determinant estimate
gives

\[
3^{j-1}<459s^{14}.
\tag{17}
\]

We eliminate the two long exponent ranges in complementary ways. Direct
integer combinations of \(F\) and \(D\) give

\[
D\mid H,
\qquad
H:=2^{e+j-2}\left(3^h+2^{h+1}\right)-3^J,
\tag{18}
\]

and

\[
D\mid G,
\qquad
G:=3^{t+j}-2^{t+1}3^j+2^{e+t+j-1}.
\tag{19}
\]

Both \(H\) and \(G\) are odd, so neither one vanishes. Put \(q:=t+j\).
Since

\[
J+q=s+j,
\]

one of \(J,q\) is at most \((s+j)/2\). Moreover,

\[
|H|\leq U(J),\qquad |G|\leq U(q),
\]

where

\[
U(m):=2^e3^m+2^{e+m}+3^m.
\tag{20}
\]

For \(s\geq1200\), equation \((17)\) and an exact ten-residue propagation
give \(j\leq s/10\). Thus one of the nonzero multiples of \(D\) in
\((18)\)-\((19)\) has absolute value at most
\(U(\lfloor11s/20\rfloor)\). An exact
twenty-residue calculation, followed by propagation in jumps of twenty,
proves

\[
U(\lfloor11s/20\rfloor)
<\frac{3^s}{459s^{14}}<D
\qquad(s\geq1200).
\tag{21}
\]

This is a contradiction. The finite certificate checks every remaining
profile. It processes \(496\) \(q_s=2\) weights, \(765\) possible first
cuts, and \(456{,}579\) pairs \((j,J)\), with no divisibility hit.

**Theorem 2.** No strict \(q=2\), zero-lift, no-wrap FCD failure has terminal
delay \(r=2\).

The point of the complementary pair is important. The first divisibility
controls \(j\), while \(H\) and \(G\) control opposite sides of the second
cut. Neither side alone gives a uniform estimate.

## 6. Terminal delay \(r=3\)

Equation \((2)\) leaves \(d\in\{1,2\}\). The value \(d=2\) is the first case in
which the endpoint loses the initial dyadic factor:

\[
d=1:\quad Z=2^ja,
\qquad
d=2:\quad Z=2^ja+1.
\tag{22}
\]

This is a genuine qualitative threshold. It is not fatal at fixed terminal
delay.

Put

\[
j:=j_1,\qquad
g:=j_2-j_1,\qquad
h:=j_3-j_2,\qquad
t:=s-j_3.
\tag{23}
\]

Thus \(s=j+g+h+t\). Equation \((9)\) reads

\[
\begin{aligned}
Da={}&3^{s-j}+2^{g+1}3^{s-j-g}
+2^{g+h+2}3^t\\
&-2^{s+3-j}-2^{s+e-j}(d-1).
\end{aligned}
\tag{24}
\]

The positive part is smaller than \(7\cdot3^{s-j}\), so \((4)\) gives

\[
3^j<3213s^{14}.
\tag{25}
\]

We now record the three cut remainders. Each one is divisible by \(D\).
They are obtained by writing \(X:=3/2\pmod D\), using

\[
X^s\equiv2^e\pmod D,
\]

and clearing the remaining powers of \(2\). The first cut gives

\[
\begin{aligned}
A_d:={}&2^{e+s-g-1}+3^{s-g}
+2^{h+1}3^{j+t}-2^{h+t+2}3^j\\
&-(d-1)2^{e+h+t-1}3^j.
\end{aligned}
\tag{26}
\]

The second cut gives

\[
\begin{aligned}
B_d:={}&2^{e+s-h-g-2}3^g+2^{e+s-h-1}+3^{s-h}\\
&-2^{t+1}3^{j+g}-(d-1)2^{e+t-2}3^{j+g}.
\end{aligned}
\tag{27}
\]

Finally, the terminal cut gives

\[
\begin{aligned}
C_d:={}&2^{e+j-3}3^{g+h}
+2^{e+j+g-2}3^h+2^{e+j+g+h-1}\\
&-3^{j+g+h}-(d-1)2^{e-3}3^{j+g+h}.
\end{aligned}
\tag{28}
\]

In each display, exactly one term is odd. Therefore

\[
A_d\neq0,\qquad B_d\neq0,\qquad C_d\neq0.
\tag{29}
\]

Termwise comparison with \(P=3^s\), followed by \((4)\), now gives the gap
cascade

\[
2^g<1970181s^{28},
\tag{30}
\]

\[
2^h<11448950027906443374s^{84},
\tag{31}
\]

and

\[
2^t<
3751776752421294850188912503533463994663885935438233794060
s^{252}.
\tag{32}
\]

For completeness, the constants are obtained as follows. Put

\[
J_0:=3213,\qquad A_0:=1970181,
\]

\[
H_0:=459\cdot2J_0A_0^2,
\qquad
T_0:=459\cdot5J_0A_0^2H_0^2.
\]

Equation \((25)\) gives \(2^j<J_0s^{14}\). Dividing \((26)\) by \(P\) bounds its
absolute value by

\[
\frac{1}{2^g}
\left(\frac{25}{3}+\frac43\left(\frac32\right)^j\right)P,
\]

which gives \((30)\). We use \(3^g<4^g\) in \((27)\), and then \(3^h<4^h\) in
\((28)\). This gives \((31)\)-\((32)\), with no decimal evaluation.

Multiplying \((25)\) and \((30)\)-\((32)\) yields

\[
2^s<K_0s^{378},
\tag{33}
\]

where

\[
K_0=
271906443778204005694962381604918500275093084624863858601633912013501219206566721857320.
\]

The exact certificate verifies

\[
2^{5000}>K_0\,5000^{378},
\qquad
5001^{378}<2\cdot5000^{378}.
\]

The second inequality propagates the contradiction to every \(s\geq5000\).

It remains to check \(s<5000\). Multiplying \((24)\) by \(2^j\) separates the
two free cuts:

\[
2^{j_2+1}3^{s-j_2}+2^{j_3+2}3^{s-j_3}
\equiv
2^{s+3}+M(d-1)-2^j3^{s-j}\pmod D.
\tag{34}
\]

Thus one exact lookup table for the \(j_3\)-terms checks every compatible
\(j_2\leq j_3\). The certificate processes \(2072\) \(q_s=2\) weights,
\(4626\) possible first cuts, \(9252\) target rows, and \(23{,}140{,}702\)
second-cut lookups. It finds no modular pair. In particular, it finds no
exact divisibility hit before the no-wrap inequality is even needed.

**Theorem 3.** No strict \(q=2\), zero-lift, no-wrap FCD failure has terminal
delay \(r=3\).

## 7. The fixed-delay template

The preceding proof has a general form. For fixed \(r\), define

\[
t_\ell:=s-j_\ell,
\qquad
X:=\frac32\pmod D.
\]

Equation \((9)\) gives the sparse congruence

\[
\boxed{
\sum_{\ell=1}^{r}2^{\ell-1}X^{t_\ell}
-2^r-2^e(d-1)\equiv0\pmod D.}
\tag{35}
\]

At a cut \(j_p\), multiplication by \(X^{j_p}\) replaces every exponent on
the left of the cut by \(2^eX^{j_p-j_\ell}\), while the first exponent on
the right becomes \(s-(j_{p+1}-j_p)\). After clearing powers of \(2\), the
right-leading term is the unique odd term. Hence the resulting integer is a
nonzero multiple of \(D\).

The determinant lower bound then controls the next gap. The first cut is
controlled by \((10)\). Inductively, every subsequent gap is bounded by a
constant, depending on \(r\), times a power of \(s\). The terminal cut
controls \(s-j_r\). Therefore, for every fixed \(r\), all parts of

\[
s=j_1+(j_2-j_1)+\cdots+(j_r-j_{r-1})+(s-j_r)
\]

are logarithmic in \(s\). This leaves an effectively finite set of weights.

This does not give a uniform finite check. If \(r\) is allowed to grow, the
number of cut remainders grows, the polynomial exponents compound, and the
constants acquire new factors at every cut. In other words, the fixed-delay
theorem proves that a surviving strict failure must escape every bounded
terminal-delay class. It does not bound the terminal delay itself.

There is nevertheless a uniform quantitative consequence. Put

\[
\alpha:=\log_2 3,
\qquad
L:=\log_2 s,
\]

and define

\[
B:=r+\log_2(r+1)+14L+11.
\tag{36}
\]

Suppose that \(1\leq p<r\), put \(J:=j_p\), and let

\[
g:=j_{p+1}-j_p,
\qquad
m:=s-g.
\]

Multiplying \((35)\) by \(X^{j_p}\), clearing \(2^m\), and dividing by
\(2^p\) gives a nonzero odd multiple \(R_p\) of \(D\). The term at the
first rank to the right of the cut becomes \(3^m\), and it is the unique
odd term. A direct termwise estimate gives

\[
\frac{|R_p|}{P}
<
\frac1{2^g}
\left[
2^{r-p+1}
+\frac43\left(1+(d-1)2^{-p}\right)
\left(\frac32\right)^J
\right].
\tag{37}
\]

\[
\boxed{
\frac{|R_p|}{P}
<
\frac{4\cdot2^r(r+1)(3/2)^J}{2^g}.}
\tag{38}
\]

Combining \((4)\) and \((38)\) yields

\[
\boxed{g<(\alpha-1)J+B.}
\tag{39}
\]

The initial estimate \((10)\) gives \(j_1<B\). Therefore

\[
j_p<B\frac{\alpha^p-1}{\alpha-1}
\qquad(1\leq p\leq r).
\tag{40}
\]

At the terminal cut, the same calculation has no right sum and gives

\[
s-j_r<(\alpha-1)j_r+B.
\]

Consequently every strict failure satisfies the uniform inequality

\[
\boxed{
s<B\frac{\alpha^{r+1}-1}{\alpha-1}.}
\tag{41}
\]

We now remove the occurrence of \(r\) inside \(B\). If \(r>2L\), the
following lower bound is immediate. If \(r\leq2L\), put

\[
B_L:=16L+\log_2(2L+1)+11.
\]

Then \(B\leq B_L\). Since \(\alpha<2\) and \(\alpha-1>1/2\), equation
\((41)\) first gives the sharper direct consequence

\[
\boxed{
r>
\log_{\alpha}
\left(
\frac{s(\alpha-1)}
{16\log_2s+\log_2(2\log_2s+1)+11}
\right)-1.}
\tag{42}
\]

Indeed, when \(r\leq2L\), this follows from

\[
\frac{s(\alpha-1)}{B_L}<\alpha^{r+1}-1<\alpha^{r+1}.
\]

When \(r>2L\), it follows as well because \(\alpha>\sqrt2\), whence
\(\log_{\alpha}s<2L\), while \((\alpha-1)/B_L<1\). In particular, \((42)\)
has the asymptotic form

\[
r\geq
\frac{1}{\log_2\alpha}\log_2s-O(\log\log s)
=1.505\ldots\log_2s-O(\log\log s).
\]

For a simpler but weaker base-two form, \((41)\) gives

\[
s<B_L2^{r+2}.
\]

Thus, in both cases,

\[
\boxed{
r>
\log_2 s
-\log_2\left(
16\log_2s+\log_2(2\log_2s+1)+11
\right)-2.}
\tag{43}
\]

In particular,

\[
r\geq\log_2s-O(\log\log s).
\]

The sharper estimate \((42)\) is stronger still, and in particular is
stronger than \(r\geq\log_3s-O(\log\log s)\). This is a uniform
restriction on the surviving branch. It does not make the branch finite,
because terminal delays of logarithmic size and larger remain.

## 8. Exact certificates and regression

The script
[`inverse/q2_nowrap_strict_certificate.js`](inverse/q2_nowrap_strict_certificate.js)
proves the \(r=1,2\) finite parts and every large-range base and propagation
inequality. Its exact output contains

\[
12444\quad(r=1),
\qquad
456579\quad(r=2)
\]

finite candidates, with no divisibility hit.

The script
[`inverse/q2_r3_strict_certificate.js`](inverse/q2_r3_strict_certificate.js)
proves the \(r=3\) cutoff and performs the exact meet-in-the-middle scan in
\((34)\). It finds no modular pair in \(23{,}140{,}702\) lookups.

There is a useful regression against a false shortcut. It is not true that

\[
D>3^{s-j}-2^{s-j+1}
\]

for every \(q_s=2\) pair. At \((s,j)=(17,2)\), the reverse inequality holds,
although divisibility fails. Thus the \(r=1\) proof genuinely needs the
second eliminated remainder \((13)\).

## 9. Proof ledger

The following items are closed.

1. The delay-level carry is \((1)\).
2. Every strict target satisfies \(d\leq\lceil r/2\rceil\).
3. The initial delayed rank satisfies \((10)\).
4. Terminal delay \(r=1\) is excluded at all depths.
5. Terminal delay \(r=2\) is excluded at all depths.
6. Both \(d=1\) and \(d=2\) are excluded at terminal delay \(r=3\).
7. Every fixed terminal delay reduces effectively to a finite sparse
   divisibility problem.

The following items remain open.

1. Prove a terminal-delay bound which is uniform in \(s\), or make the cut
   cascade uniform as \(r\to\infty\).
2. Exclude strict no-wrap solutions with \(r\geq4\).
3. Exclude the equality branch \(d=0\), which remains exactly the positive
   cycle denominator-one gate.

## 10. Conclusion

The strict \(q=2\) no-wrap branch is not reduced to one finite computation.
It is reduced to an infinite sequence of finite terminal-delay classes, and
the first three classes are now closed. The new linear target bound \((2)\) and
the cut cascade show why fixed delay is tractable. They also identify the
remaining obstruction precisely: a hypothetical failure must send its
terminal delay to infinity with the weight, fast enough to outrun every
fixed collection of sparse cut remainders.
