# Balanced coefficient rounding and reciprocal endpoint duality

**Date:** 27 August 2026  
**Mode:** CALCULATE, followed by THEORIZE  
**Status:** We give an exact one-parameter coefficient model for the
coprime binary denominator-one gate. We also identify a reciprocal endpoint
duality and prove that its positive companion reconstructs a cyclic rotation
of the original word. Thus the duality is an exact conjugacy, not an
independent cycle contradiction. An exhaustive coefficient-orbit calculation
through $r=400$ leaves only two algebraic endpoint shapes, both of which
have a zero accelerated exponent.

## 1. The coefficient quotient

We consider the coprime binary one-strip setup

\[
N:=\lceil r\log _2 3\rceil,
\qquad
e:=N-r,
\qquad
\gcd(e,r)=1.
\tag{1}
\]

Put

\[
B_j:=\left\lfloor\frac{jN}{r}\right\rfloor,
\qquad
c_j:=[je]_r.
\tag{2}
\]

A binary deformation has heights $m_j\in\{0,1\}$, with $m_0=0$, and
accelerated exponents

\[
a_j=B_{j+1}-B_j+m_j-m_{j+1}.
\tag{3}
\]

Let

\[
\mathcal C:=\{c_j:m_j=1\},
\qquad
c_*:=\max\mathcal C,
\qquad
t:=c_*+1,
\tag{4}
\]

and define

\[
S(X):=\sum_{c\in\mathcal C}X^{c_*-c},
\qquad
H(X):=(X-1)S(X)-X^t.
\tag{5}
\]

We work in

\[
\mathcal O:=\mathbf Z[\theta],
\qquad
\theta^r=2,
\tag{6}
\]

and put

\[
\delta:=\theta^N-3=2\theta^e-3.
\tag{7}
\]

The binary resultant quotient theorem shows that denominator one gives

\[
\Omega:=\frac{H(\theta)}{\delta}\in\mathcal O.
\tag{8}
\]

Write

\[
\Omega=\sum_{k=0}^{r-1}u_k\theta^k,
\qquad
H(\theta)=\sum_{k=0}^{r-1}h_k\theta^k.
\tag{9}
\]

Reducing $\theta^r$ to $2$ gives the exact coefficient recurrence

\[
\boxed{
h_k=
\begin{cases}
4u_{k+r-e}-3u_k,&0\leq k<e,\\
2u_{k-e}-3u_k,&e\leq k<r.
\end{cases}}
\tag{10}
\]

In the cyclic order $k\mapsto k+e\pmod r$, equation (10) becomes

\[
u_{\mathrm{new}}
=\frac{w u_{\mathrm{old}}-h_{\mathrm{new}}}{3},
\qquad
w\in\{2,4\}.
\tag{11}
\]

When $t<r$, every $h_k\in\{-1,0,1\}$. Integrality therefore forces
$h_{\mathrm{new}}$ to be the unique balanced ternary remainder of
$w u_{\mathrm{old}}$. In other words, the coefficients form a periodic
orbit of the two maps

\[
u\longmapsto \operatorname{nint}\left(\frac{2u}{3}\right),
\qquad
u\longmapsto \operatorname{nint}\left(\frac{4u}{3}\right),
\tag{12}
\]

in the mechanical order determined by $e/r$. If $t=r$, the reduction of
$-X^r$ changes the distinguished coefficient from $-1$ to $-3$; all
other coefficients remain balanced.

This is a substantial compression. At a fixed $(r,N)$, every binary
denominator-one candidate is determined by one integer, namely one chosen
coefficient $u_0$, rather than by an exponential family of binary paths.

## 2. Endpoint discrepancy

The endpoint form (5) is equivalent to a very restrictive discrepancy
condition. If $t<r$, then

\[
h_0=-1,
\qquad
\sum_{i=0}^k h_i\in\{-1,0\}
\quad(0\leq k<r),
\qquad
\sum_{i=0}^{r-1}h_i=-1.
\tag{13}
\]

Conversely, every balanced coefficient vector satisfying (13) recovers a
unique binary endpoint polynomial. Equivalently, the nonzero signs in
$(h_k)$ alternate, beginning and ending with $-1$.

Thus the coprime binary gate has the following one-line form:

\[
\boxed{
\text{Find a periodic balanced-rounding orbit whose ordinary-order
remainder discrepancy is one and whose recovered path has }a_j>0.}
\tag{14}
\]

The rounding order in (11) is the $e$-step order, while the discrepancy
in (13) is measured in ordinary coefficient order. This order mismatch is
the exact surviving obstruction.

## 3. A reciprocal endpoint involution

The element $\theta-1$ is a unit in $\mathcal O$. Indeed,

\[
G:=1+\theta+\cdots+\theta^{r-1}
\tag{15}
\]

satisfies

\[
(\theta-1)G=\theta^r-1=1.
\tag{16}
\]

Multiplying the endpoint by this unit removes its alternating signs. Put

\[
d:=-GH=\theta^tG-S.
\tag{17}
\]

Writing $d=\sum d_k\theta^k$, we obtain

\[
\boxed{
d_k=
\begin{cases}
2-[X^k]S,&0\leq k<t,\\
1,&t\leq k<r.
\end{cases}}
\tag{18}
\]

In particular,

\[
d_k\in\{1,2\},
\qquad
d_0=1,
\qquad
d_{t-1}=2.
\tag{19}
\]

Let $b_k:=v_2(d_k)\in\{0,1\}$. The support of $b$ is the reflected
complement of the support of $S$ in the interval $[0,t-1]$. More
precisely, if $S^*$ is the endpoint support polynomial associated with
$b$, then

\[
[X^k]S^*=1-[X^{t-1-k}]S
\qquad(0\leq k<t).
\tag{20}
\]

Therefore this operation is an involution. The corresponding endpoint
polynomial is the reciprocal polynomial

\[
\boxed{H^*(X)=X^tH(X^{-1}).}
\tag{21}
\]

The positivity condition is preserved. To see this, put

\[
L:=r-e=2r-N.
\tag{22}
\]

The baseline exponent is one precisely when $c<L$. Hence positivity of
(3) is equivalent to

\[
c<L,\quad c\notin\mathcal C
\quad\Longrightarrow\quad
c+e\notin\mathcal C.
\tag{23}
\]

The reflected complement in (20) satisfies the same implication. Indeed,
if the reflected point $c$ lies in $\mathcal C$ and $c\geq e$, then
(23), applied contrapositively to $c-e<L$, gives $c-e\in\mathcal C$.
This is exactly the transformed condition.

## 4. Why the positive companion is not a second cycle

Assume denominator one and define

\[
v:=-G\Omega.
\tag{24}
\]

Equations (8) and (17) give

\[
\delta v=d.
\tag{25}
\]

The cofactor identity $\delta\Delta=D$ has a coefficientwise positive
cofactor $\Delta$. Consequently every coefficient $v_k$ is positive.
The coefficient recurrence is

\[
d_k=
\begin{cases}
4v_{k+r-e}-3v_k,&0\leq k<e,\\
2v_{k-e}-3v_k,&e\leq k<r.
\end{cases}
\tag{26}
\]

Modulo two, equation (26) gives $v_k\equiv d_k\pmod2$. Hence

\[
x_k:=\frac{v_k}{d_k}
\tag{27}
\]

is a positive integer. Put $k_j:=[je]_r$ and

\[
g_j:=B_{j+1}-B_j.
\tag{28}
\]

Then (26) becomes

\[
2^{g_j+b_{k_j}-b_{k_{j+1}}}x_{k_j}
=3x_{k_{j+1}}+1.
\tag{29}
\]

At first sight, equation (29) appears to produce a second positive integer
cycle. It does not. If $j_*$ is the unique index for which
$c_{j_*}=c_*$, then a direct substitution in (3), (18), and (29) gives

\[
\boxed{
\operatorname{rev}
\left(g_j+b_{k_j}-b_{k_{j+1}}\right)_{j\bmod r}
=\operatorname{rot}_{j_*}(a_0,\ldots,a_{r-1}).}
\tag{30}
\]

Thus the positive companion is the original cycle read from another state.
In other words, multiplication by $(\theta-1)^{-1}$ reveals an exact
reciprocal conjugacy, but it supplies no independent integrality condition.

This is an important method ceiling. The coefficient recurrence is a new
coordinate system for the cycle, not a second orbit which can be compared
to the first one by minimality.

## 5. Exact finite sweep

The checker
[binary_coefficient_rounding_probe.js](cycles/binary_coefficient_rounding_probe.js)
enumerates the periodic coefficient orbits directly. If the balanced
digits have absolute value at most one, unrolling (11) gives

\[
D|u_0|\leq E_{r,e},
\tag{31}
\]

where $E_{r,e}$ is obtained from the exact recursion

\[
E_{j+1}=w_jE_j+3^j,
\qquad
E_0=0.
\tag{32}
\]

The terminal-wrap branch replaces the final $3^j$ by $3^{j+1}$. Hence
(31) is a rigorous finite search interval for $u_0$.

Through $r=400$, the checker gives the following totals:

\[
\begin{array}{c|r}
\text{coprime rows} & 244\\
\text{coefficient seeds} & 727{,}190\\
\text{centered periodic orbits} & 4{,}890\\
\text{terminal-wrap periodic orbits} & 520\\
\text{endpoint-shaped orbits} & 2\\
\text{admissible endpoint-shaped orbits} & 0.
\end{array}
\tag{33}
\]

The two endpoint-shaped orbits are

\[
\begin{array}{c|c|c|c|c}
r&N&e&(u_k)&\mathcal C\\ \hline
3&5&2&(-3,-3,-2)&\{2\}\\
5&8&3&(-9,-8,-7,-6,-5)&\{2,3\}.
\end{array}
\tag{34}
\]

In both rows, $e\in\mathcal C$. Since $m_0=0$, $m_1=1$, and the
first baseline exponent is one, equation (3) gives $a_0=0$. Therefore
neither algebraic endpoint is an accelerated Collatz word.

The companion checker
[binary_endpoint_duality_probe.js](cycles/binary_endpoint_duality_probe.js)
verifies the reciprocal-complement involution, positivity preservation, and
the rotation identity (30) on every binary profile through $r=20$. The
calculation covers $43{,}045$ primitive profiles. These calculations are
exact finite evidence only.

## 6. The surviving lemma

The finite sweep suggests the following sharp statement.

**Balanced discrepancy lemma.** Let $r\geq7$, let
$N=\lceil r\log_2 3\rceil$, and suppose $\gcd(N,r)=1$. No integral
periodic orbit of (11) has a remainder vector satisfying (13) whose
recovered binary deformation satisfies $a_j>0$ for every $j$.

The calculation supports an even sharper first-entry statement. Namely,
every integral endpoint shape found by the coefficient recurrence satisfies

\[
e\in\mathcal C.
\tag{35}
\]

If (35) holds at every depth, then $m_0=0$, $m_1=1$, and the first
baseline exponent is one. Hence $a_0=0$, which is an immediate
contradiction. In the positive-digit coordinates of Section 4, statement
(35) says that the terminal digit $d_{t-1}=2$ is preceded, in the
$e$-step order, by a digit one. The parity normalization then makes the
corresponding reconstructed state even and forces the same zero exponent.

The balanced discrepancy lemma would exclude the complete coprime binary
denominator-one branch. It is not proved here. Moreover, equation (30)
shows that a proof cannot come from treating the positive companion as an
independent cycle. The useful new feature is narrower: the original
exponential path family has become a one-parameter periodic rounding
problem, and endpoint admissibility has become discrepancy one in an order
transverse to the mechanical rounding order.

The next viable attack is therefore a Euclidean induction on the pair
$(r,e)$, or an equivalent discrepancy theorem for the two orders in
(11) and (13). Another raw Archimedean estimate would not use the new
structure.

