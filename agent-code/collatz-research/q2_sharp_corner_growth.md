# Sharp height growth in the strict \(q=2\) corner cube

**Date:** 26 August 2026  
**Mode:** SOLVE  
**Status:** closed. Every anchored \(q_s=2,b=1\) strict or equality
target has a terminal-preserving flux cube with

\[
2^{|K^\circ(I)|}
>
\left(\frac{s}{O(\log s)}\right)^{\log_{\log_2 3}2}.
\]

The exponent is

\[
\log_{\log_2 3}2=1.5050070664\ldots>\frac32.
\]

This sharpens the earlier linear-over-logarithmic vertex bound. It does
not close the anchored interior-carry gate.

## 1. Setup

Put

\[
\alpha:=\log_2 3,
\qquad
\beta:=\alpha-1=\log_2(3/2).
\tag{1}
\]

For \(i\geq1\), define

\[
k_i:=\lceil i\alpha\rceil,
\qquad
m_i:=\lfloor i\alpha\rfloor-i=\lfloor i\beta\rfloor.
\tag{2}
\]

Let \(s\) be a \(q_s=2\) weight. An anchored \(b=1\) target has a
nondecreasing delay path

\[
0=d_0\leq d_1\leq\cdots\leq d_{s-1}=m_{s-1},
\qquad
d_i\leq m_i.
\tag{3}
\]

We define its height by

\[
h_i:=m_i-d_i.
\tag{4}
\]

Let

\[
J_1<J_2<\cdots<J_c=s-1
\tag{5}
\]

be the rows at which \(d_i\) strictly increases. These are exactly the
removable Ferrers corners. The complete four-corner theorem gives
\(c\geq5\), although only \(c\geq2\) is needed below.

We retain the target estimates

\[
n<153s^{14.3},
\qquad
x_i<2^{h_i}H_s,
\qquad
H_s:=307s^{15}.
\tag{6}
\]

Put

\[
R_s:=\log_2 H_s,
\qquad
G_s:=154s^{15}.
\tag{7}
\]

## 2. The exact height recurrence

The first exponent-one cylinder gives

\[
2^{J_1}\mid n+1.
\]

Consequently,

\[
\boxed{J_1<\log_2G_s.}
\tag{8}
\]

Fix \(1\leq\ell<c\), and put

\[
g_\ell:=J_{\ell+1}-J_\ell.
\tag{9}
\]

The delay is constant between these two corners. The corresponding
exponent-one cylinder and (6) give

\[
2^{g_\ell}\leq2^{h_{J_\ell}}H_s.
\]

Therefore,

\[
\boxed{g_\ell\leq h_{J_\ell}+R_s.}
\tag{10}
\]

The previous corner-growth proof replaced \(h_{J_\ell}\) by the row
index \(J_\ell\). We instead retain the height itself. Since the delay
increases by at least one at the next corner,

\[
\begin{aligned}
h_{J_{\ell+1}}
&=m_{J_{\ell+1}}-d_{J_{\ell+1}}\\
&\leq h_{J_\ell}
+m_{J_{\ell+1}}-m_{J_\ell}-1.
\end{aligned}
\tag{11}
\]

For every positive integer \(g\),

\[
\lfloor(J+g)\beta\rfloor-\lfloor J\beta\rfloor
\leq\lceil g\beta\rceil.
\tag{12}
\]

Moreover, \(g\beta\notin\mathbf Z\). Indeed, rationality of \(\beta\)
would give an equality between a positive power of \(3\) and a positive
power of \(2\). It follows that

\[
\lceil g\beta\rceil-1<g\beta.
\tag{13}
\]

Combining (10)-(13), we obtain

\[
\begin{aligned}
h_{J_{\ell+1}}
&<h_{J_\ell}+\beta g_\ell\\
&\leq h_{J_\ell}+\beta(h_{J_\ell}+R_s)\\
&=\alpha h_{J_\ell}+\beta R_s.
\end{aligned}
\tag{14}
\]

Thus the shifted height

\[
y_\ell:=h_{J_\ell}+R_s
\tag{15}
\]

satisfies the sharp multiplicative recurrence

\[
\boxed{y_{\ell+1}<\alpha y_\ell.}
\tag{16}
\]

In other words, the correct corner multiplier is \(\log_2 3\), not \(2\).

## 3. Sharp corner growth

Since the first delay level is positive, we have

\[
h_{J_1}<\beta J_1-1.
\tag{17}
\]

Equations (9), (10), and (16) now give

\[
\begin{aligned}
s-1
&=J_1+\sum_{\ell=1}^{c-1}g_\ell\\
&<J_1+(\beta J_1+R_s)
\sum_{j=0}^{c-2}\alpha^j\\
&=\left(J_1+\frac{R_s}{\beta}\right)\alpha^{c-1}
-\frac{R_s}{\beta}.
\end{aligned}
\tag{18}
\]

Using (8), define

\[
X_s:=
\frac{s-1+R_s/\beta}
{\log_2G_s+R_s/\beta}.
\tag{19}
\]

We have proved the following theorem.

**Theorem 1.** Every anchored \(q_s=2,b=1\) strict or equality target
with \(c:=|K(I)|\) satisfies

\[
\boxed{\alpha^{c-1}>X_s.}
\tag{20}
\]

Put

\[
\gamma:=\log_\alpha2.
\tag{21}
\]

Raising (20) to the power \(\gamma\) gives

\[
\boxed{2^{c-1}>X_s^\gamma.}
\tag{22}
\]

Since both \(R_s\) and \(\log_2G_s\) are \(15\log_2s+O(1)\), we obtain

\[
\boxed{
c\geq
1+\log_\alpha s-\log_\alpha\log s-O(1).}
\tag{23}
\]

This improves the previous coefficient \(1/\log 2\) in the logarithmic
corner estimate to \(1/\log\alpha\).

## 4. A rational exponent bound

We can prove \(\gamma>3/2\) without decimal approximations. Exact integer
arithmetic gives

\[
3^{200}<2^{317}.
\tag{24}
\]

Therefore,

\[
\alpha<\frac{317}{200}.
\tag{25}
\]

Also,

\[
317^3=31{,}855{,}013
<32{,}000{,}000=4\cdot200^3.
\tag{26}
\]

It follows that \(\alpha^3<4\), hence \(\alpha^{3/2}<2\). Therefore,

\[
\boxed{\gamma=\log_\alpha2>\frac32.}
\tag{27}
\]

Whenever \(X_s\geq1\), equation (22) has the simpler consequence

\[
\boxed{2^{c-1}>X_s^{3/2}.}
\tag{28}
\]

## 5. Terminal-preserving flux consequence

Let \(I\) be a terminal-preserving minimal failure. Its nonterminal corner
set is

\[
K^\circ(I):=K(I)\setminus\{(s-1,e-1)\}.
\tag{29}
\]

The complete all-subset flux identity holds for every nonempty subset of
\(K^\circ(I)\), and

\[
|K^\circ(I)|=c-1.
\]

Equation (22) therefore proves

\[
\boxed{
2^{|K^\circ(I)|}>X_s^\gamma.}
\tag{30}
\]

In particular, the synchronized terminal-preserving cube has

\[
\left(\frac{s}{O(\log s)}\right)^{1.5050070664\ldots}
\]

distinct vertices. The earlier theorem gave only \(s/O(\log s)\).

## 6. Audit and scope

The checker
[`inverse/q2_sharp_corner_growth_certificate.js`](inverse/q2_sharp_corner_growth_certificate.js)
verifies the rational comparisons (24) and (26). It also enumerates 2,859
small anchored profiles and checks (14) on 10,216 consecutive-corner pairs.
The all-depth result is the analytic proof above; the enumeration is a
regression only.

Theorem 1 strengthens the geometry of every hypothetical target and of the
terminal-preserving minimal-failure cube. It does not prove that the cube
is impossible. The R110 translation countermodel still shows that any
final contradiction must use the absolute anchored carry, not only the
number or relative wrap data of the vertices.
