# The denominator-parameter no-go for the square reset

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** We construct infinitely many anchored rational one-drop cycles
with exact integer numerator recurrences, exact bottom closure, strict
leastness, an odd-endpoint reset of unbounded valuation, and

\[
Q^2<2^U.
\]

We also give one exact row for which the canonical quotient vector is a
primitive integral vector and every reset-coordinate identity holds. The
common odd denominator is greater than one. Thus the fixed Beatty intercept,
the local reset divisibilities, primitivity of the quotient, and bottom
closure do not prove the square gate unless the normalization of the common
denominator to one is used. No denominator-one counterexample is claimed.

## 1. The exact reset loss

Put

\[
\alpha:=\log _2 3,
\qquad
\gamma:=\alpha-1.
\tag{1}
\]

Suppose that a cylinder state of length $t$, modulus exponent $L$,
least representative $q$, and odd endpoint $z\equiv1\pmod4$ takes a
zero-lift spike. Write

\[
k:=v_2\left(\frac{3z+1}{4}\right).
\tag{2}
\]

The spike is followed by $k$ zero-lift ordinary branches. If

\[
D_t:=\lfloor\gamma(t+1)\rfloor-V_t,
\tag{3}
\]

then the debt increase across the complete reset is

\[
\boxed{
D_{t+k+1}-D_t
=\lfloor\gamma(t+k+2)\rfloor
 -\lfloor\gamma(t+1)\rfloor-1.}
\tag{4}
\]

In particular, the square ratio is multiplied by

\[
2^{-\Delta(t,k)},
\qquad
\Delta(t,k):=
\lfloor\gamma(t+k+2)\rfloor
 -\lfloor\gamma(t+1)\rfloor-1.
\tag{5}
\]

The quantity in (5) is unbounded with $k$. Therefore a reset inequality
must use arithmetic which distinguishes denominator one. We now show that
all of the local integer recurrences survive when the common odd denominator
is retained as a parameter, while the square inequality fails.

## 2. An infinite anchored family

For an integer $r\geq3$, put

\[
N:=\lceil\alpha r\rceil,
\qquad
e:=N-r,
\qquad
\delta_r:=N-\alpha r,
\tag{6}
\]

and define the anchored clock

\[
b_t:=\left\lfloor\frac{et}{r}\right\rfloor
 -\left\lfloor\frac{e(t-1)}{r}\right\rfloor
\qquad(1\leq t<r).
\tag{7}
\]

We restrict to the infinite set of $r$ satisfying

\[
\frac34\leq\delta_r<1.
\tag{8}
\]

This set is infinite because $\alpha$ is irrational and the fractional
parts of $r\alpha$ are dense in $[0,1]$. For all sufficiently large
members of this set, put

\[
V:=\left\lceil2\log _2r\right\rceil,
\qquad
U:=e-1-V.
\tag{9}
\]

The clock has no factor $00$, and its first one site is $t=2$. We choose
the site $2$ and the last $V-1$ internal one sites as spikes. Every other
internal branch is ordinary, and the bottom exponent is $U+2$.

Let the spike times be

\[
2=t_1<t_2<\cdots<t_V<r.
\tag{10}
\]

The normalized carry of the internal word is

\[
E_r:=\sum_{j=1}^{V}
 \frac{3^{r-1-t_j}}{2^{N-t_j-j}}.
\tag{11}
\]

The exact bottom identity gives the unique positive rational fixed point

\[
\boxed{
Q_r=
\frac{3E_r/4+1/2-2^{-U-2}}
     {1-2^{-\delta_r}}.}
\tag{12}
\]

We next estimate (11). The contribution of the first spike is

\[
\frac{3^{r-3}}{2^{N-3}}
=\frac8{27}2^{-\delta_r}.
\tag{13}
\]

The last $V-1$ one sites lie in a suffix of length at most $2V+2$.
For $j\geq2$, put $h_j:=r-t_j$. Since $e=U+V+1$ and $j\leq V$,

\[
\frac{3^{h_j-1}}{2^{e+h_j-j}}
\leq
2^{-U}\left(\frac32\right)^{h_j}.
\tag{14}
\]

Consequently,

\[
0\leq
E_r-\frac8{27}2^{-\delta_r}
\leq
V2^{-U}\left(\frac32\right)^{2V+2}
=o(1).
\tag{15}
\]

Write $a_r:=2^{-\delta_r}$. Equations (12) through (15) give

\[
Q_r=
\frac{1/2+(2/9)a_r+o(1)}{1-a_r}.
\tag{16}
\]

Under (8), we have

\[
\frac12<a_r\leq2^{-3/4}<\frac{27}{40}.
\tag{17}
\]

The right side of (16) is therefore bounded away from both $1$ and $2$.
It follows that

\[
\boxed{1<Q_r<2}
\tag{18}
\]

for every sufficiently large member of the subsequence. Also $U\to\infty$,
so

\[
\boxed{Q_r^2<4<2^U.}
\tag{19}
\]

We now verify strict leastness. The first two states are

\[
Q_r\longmapsto\frac32Q_r
\longmapsto\frac98Q_r+\frac14,
\tag{20}
\]

and both are larger than $Q_r$. Before the second spike, the latter state
is multiplied by $3/2$ at every branch. The second spike occurs at

\[
t_2\geq r-2V-2.
\tag{21}
\]

After this point there are at most $2V+2$ branches, and each ordinary or
spike map is bounded below by multiplication by $3/4$. Thus every state
in the final suffix is at least

\[
\left(\frac32\right)^{t_2-3}
\left(\frac34\right)^{2V+2}
\left(\frac98Q_r+\frac14\right).
\tag{22}
\]

The expression in (22) tends to infinity, while $Q_r<2$. Hence every
proper state is larger than $Q_r$ for all sufficiently large $r$.

## 3. Integer numerator closure and the long reset

Write the reduced odd-coordinate fixed point as

\[
x_0:=2Q_r-1=\frac{n_0}{d},
\qquad
\gcd(n_0,d)=1.
\tag{23}
\]

The gap $2^N-3^r$ is odd, so $d$ is odd. The standard cyclic carry
identity gives odd integers $n_i$ satisfying

\[
\boxed{
2^{a_i}n_{i+1}=3n_i+d
\qquad(0\leq i<r),}
\tag{24}
\]

with $n_r=n_0$. Here the internal exponents are one or two, and
$a_{r-1}=U+2$. The valuation in (24) is exactly $a_i$, not merely at
least $a_i$. Indeed, expanding the cyclic carry after the $i$-th
rotation leaves an odd first summand after division by $2^{a_i}$.

Put

\[
p_i:=\frac{n_i+d}{2}.
\tag{25}
\]

These are integers. In the original $z$-coordinate, but with the common
denominator retained, equation (24) becomes

\[
\boxed{
2p_{i+1}=3p_i\quad(a_i=1),
\qquad
4p_{i+1}=3p_i+d\quad(a_i=2).}
\tag{26}
\]

The bottom closure is the exact integer identity

\[
\boxed{
3p_{r-1}-d
=2^{U+1}(2p_0-d).}
\tag{27}
\]

Since $1<Q_r=p_0/d<2$, we have $d>1$. Thus (26) and (27) are exact
integer recurrences, but they are not denominator-one recurrences.

There is also an unbounded odd-endpoint reset. The spike at time $2$ is
followed only by ordinary branches until time $t_2$. The input at time
$t_2$ is odd, and every intervening ordinary branch removes exactly one
factor of two. Therefore,

\[
\boxed{v_2(p_2)=t_2-3\geq r-2V-5\longrightarrow\infty.}
\tag{28}
\]

In other words, this family passes through precisely the reset which changes
the square reserve. The fixed Beatty intercept, strict leastness, and the
integer numerator bottom closure allow the wrong side of (19).

## 4. A primitive integral quotient at $r=67$

The preceding family is an all-depth no-go for denominator-free reset
arguments. We now record one exact row which also addresses primitivity of
the canonical quotient. Take

\[
(r,N,e,U,V)=(67,107,40,26,13)
\tag{29}
\]

and the spike times

\[
\{2,47,49,51,52,54,56,57,59,61,62,64,66\}.
\tag{30}
\]

The reduced denominator and the $q$-coordinate numerator are

\[
d=69{,}549{,}813{,}681{,}315{,}526{,}305{,}816{,}084{,}877{,}541,
\tag{31}
\]

\[
p_0=101{,}731{,}746{,}427{,}729{,}741{,}711{,}697{,}618{,}955{,}782.
\tag{32}
\]

Thus $1<p_0/d<2$, the square gate fails, every proper state is larger
than $p_0/d$, and the first reset has valuation $44$.

Since $\gcd(107,67)=1$, let $\theta^{67}=2$ and put

\[
\delta:=2\theta^{40}-3.
\tag{33}
\]

If $K_U$ is the sparse endpoint polynomial and $\Xi_d$ is the cleared
canonical quotient, then

\[
\boxed{\delta\Xi_d=dK_U(\theta).}
\tag{34}
\]

Writing $c_j:=[107j]_{67}$ and letting $m_j$ count the zero-based
omission sites $i<j$, equivalently the one-based omission times
$t\leq j$, its coefficients are

\[
(\Xi_d)_0=2^{U+1}n_0+d,
\qquad
(\Xi_d)_{67-c_j}=2^{U-m_j}(n_j+d).
\tag{35}
\]

Every coefficient in (35) is a positive integer. More strongly,

\[
\boxed{\operatorname{content}(\Xi_d)=1.}
\tag{36}
\]

Thus positivity, coefficient integrality at every reset, and primitivity do
not force denominator one. The factor $d$ on the right side of (34) is the
remaining global datum. Setting $d=1$ is not a local divisibility
consequence.

The exact certificate
[`cycles/square_reset_denominator_no_go_certificate.js`](cycles/square_reset_denominator_no_go_certificate.js)
constructs the row from the mechanical clock. It verifies the exact
valuation at every branch, strict leastness, (27), the square failure, the
valuation $44$, the coefficient identity (34), and the content statement
(36), all with integer arithmetic.

## 5. Consequence for the square gate

The construction does not disprove the desired denominator-one inequality.
It proves a method-level obstruction. No reset argument using only the fixed
Beatty phase, the affine maps, strict leastness, exact integer numerator
closure, positivity of the quotient, local reset-coordinate integrality, or
primitivity can establish

\[
Q^2\geq2^U.
\]

Such an argument must use the normalization $d=1$ in a way which is not
preserved by (24) through (36). Equivalently, it must use the global
mixed-radix collision or the full denominator-one divisibility. The local
odd-endpoint reset itself has now been exhausted as a denominator-free
source of the square inequality.
