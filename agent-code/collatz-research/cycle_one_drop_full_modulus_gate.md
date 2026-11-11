# The full-modulus one-drop gate

**Mode:** SOLVE.

**Status:** The one-drop carry admits exact complement, ternary insertion,
binary insertion, and positive-quotient descriptions. These descriptions
reduce the remaining assertion to one ordered modular interval-avoidance
problem. We do not prove the all-depth separation.

## 1. The exact language

Fix \(r\geq3\), and put

\[
P:=3^r,\qquad N:=\lceil r\log _2 3\rceil,\qquad
M:=2^N,\qquad D:=M-P,\qquad e:=N-r.
\tag{1}
\]

Write

\[
B_i:=\left\lfloor\frac{iN}{r}\right\rfloor,
\qquad g_i:=B_{i+1}-B_i.
\tag{2}
\]

Thus \(g_i\in\{1,2\}\), \(g_0=1\), and \(g_{r-1}=2\). Let

\[
E:=\{0\leq i<r-1:g_i=2\}.
\]

We have \(|E|=e-1\). Choose a nonempty selected set \(S\subseteq E\),
and write

\[
U:=|S|,
\qquad V:=|E\setminus S|=e-1-U.
\tag{3}
\]

The associated one-drop word is

\[
a_i:=g_i-\mathbf 1_S(i)\quad(0\leq i<r-1),
\qquad a_{r-1}:=U+2.
\tag{4}
\]

If \(h_i:=|S\cap[0,i)|\), then its carry is

\[
C:=\sum_{i=0}^{r-1}3^{r-1-i}2^{B_i-h_i}.
\tag{5}
\]

All statements below refer to this exact language. In particular, every
preterminal exponent-two site must belong to the mechanical set \(E\).

## 2. Complement coordinates

List the unselected eligible sites as

\[
E\setminus S=\{j_1<\cdots<j_V\}.
\]

The number of eligible sites below \(i\) is \(B_i-i\). Hence

\[
B_i-h_i=i+|\{\ell:j_\ell<i\}|.
\]

Abel summation in (5) gives

\[
\boxed{
C=P-2^{r+V}+
\sum_{\ell=1}^{V}2^{j_\ell+\ell}3^{r-j_\ell-1}.}
\tag{6}
\]

Reverse the sites by setting

\[
k_m:=r-1-j_{V+1-m},
\qquad 1\leq k_1<\cdots<k_V<r,
\]

and put \(z:=3/2\). Then

\[
\boxed{
C=2^rF(z),
\qquad
F(X):=X^r-2^V+\sum_{m=1}^{V}2^{V-m}X^{k_m}.}
\tag{7}
\]

Since \(F(1)=0\), we have

\[
\boxed{F(X)=(X-1)H(X),}
\tag{8}
\]

where

\[
\boxed{
H(X):=\sum_{d=0}^{r-1}X^d+
\sum_{m=1}^{V}2^{V-m}\sum_{d=0}^{k_m-1}X^d.}
\tag{9}
\]

The coefficients of \(H\) are positive and nonincreasing. They start at
\(2^V\) and end at \(1\). Equations (6) through (9) are identities.

## 3. The denominator-one polynomial

Suppose that \(C=Dx\) for a positive integer \(x\). Since

\[
\frac{D}{2^r}=2^e-z^r,
\]

equation (7) becomes \(F(z)=x(2^e-z^r)\). Therefore the integer
polynomial

\[
J_x(X):=x2^e+2^V-(x+1)X^r-
\sum_{m=1}^{V}2^{V-m}X^{k_m}
\tag{10}
\]

has the rational root \(3/2\). Gauss's lemma gives

\[
J_x(X)=(3-2X)Q(X),
\qquad Q(X)\in\mathbf Z[X].
\tag{11}
\]

Write \(Q(X)=\sum_{d=0}^{r-1}q_dX^d\), and put
\(b_{k_m}:=2^{V-m}\), with \(b_d:=0\) at every other middle degree.
Comparing coefficients in (11) gives

\[
\boxed{
3q_0=2^V(2^{U+1}x+1),\qquad
3q_d-2q_{d-1}=-b_d,\qquad
2q_{r-1}=x+1.}
\tag{12}
\]

Every \(q_d\) is positive. Indeed, we may start from
\(q_{r-1}=(x+1)/2>0\) and use (12) backwards.

When \(V>0\), the endpoint consequences are

\[
\boxed{
v_3(2^{U+1}x+1)=k_1,
\qquad 2^{r-k_V}\mid x+1.}
\tag{13}
\]

The first assertion includes the next ternary digit:

\[
\frac{2^{U+1}x+1}{3^{k_1}}
\equiv(-1)^{k_1+1}\pmod 3.
\tag{14}
\]

Thus (13) is an exact valuation, not divisibility by \(3^{k_1+1}\).
When \(V=0\), the high-degree end instead gives

\[
2^r\mid x+1.
\tag{15}
\]

The full-selection case is therefore impossible under \(x\leq2^U\),
since then \(U=e-1<r\). If \(V>0\) and \(x\leq2^U\), equations (13)
also imply

\[
j_1+1=r-k_V\leq U,
\qquad
3^{r-1-j_V}\leq2^{2U+1}+1.
\tag{16}
\]

These endpoint restrictions do not determine the middle recurrences.

## 4. The ternary cylinder and positive recurrence

Let

\[
\tau:=[CM^{-1}]_P\in\{1,\ldots,P-1\}.
\tag{17}
\]

If \(C/D=p/q\) is in lowest terms, then

\[
p\equiv q\tau\pmod P.
\tag{18}
\]

In particular, if \(q=1\) and the independent cycle-size bound gives
\(0<x=C/D<P\), then \(x=\tau\). Consequently either inequality

\[
\tau>2^U,
\qquad
\tau\geq\left\lfloor(3/2)^r\right\rfloor
\tag{19}
\]

would exclude the denominator-one candidate. Neither is proved at all
depths.

For an arbitrary one-drop profile, define

\[
t:=\frac{M\tau-C}{P}.
\tag{20}
\]

The exact mechanical profiles satisfy \(0\leq t<M\). Synthetic division
of \(J_\tau(X)-(t-\tau)X^r\) gives the recurrence in (12), with

\[
2q_{r-1}=t+1.
\tag{21}
\]

After \(m\) spikes have been passed, write \(q_d=2^{V-m}z_d\). Then
every \(z_d\) is a positive integer,

\[
z_0=\frac{2^{U+1}\tau+1}{3},
\]

and

\[
\boxed{
z_d=
\begin{cases}
2z_{d-1}/3,&d\notin\{k_1,\ldots,k_V\},\\[3pt]
(4z_{d-1}-1)/3,&d\in\{k_1,\ldots,k_V\}.
\end{cases}}
\tag{22}
\]

At the terminal degree,

\[
z_{r-1}=q_{r-1}=\frac{t+1}{2}.
\tag{23}
\]

Thus the observed bound

\[
\boxed{t\geq2^e-1}
\tag{24}
\]

is equivalent to

\[
z_{r-1}\geq2^{e-1}.
\tag{25}
\]

Since \(U\leq e-1\), equation (24) would imply the desired binary
cylinder separation. Positivity alone does not prove (25); the exact
mechanical spike positions are essential.

### 4.1. Exact conjugacy with accelerated Collatz

We now record what the positive recurrence represents dynamically. Put

\[
q:=z_{r-1}=\frac{t+1}{2},
\qquad y_d:=2z_d-1.
\tag{25a}
\]

Reconstruct the recurrence from degree \(r-1\) down to degree \(0\). At a
nonspike degree, integrality forces \(z_d\) to be even, and at a spike
degree it forces \(z_d\equiv1\pmod 4\). In these two cases, respectively,

\[
y_{d-1}=\frac{3y_d+1}{2},
\qquad
y_{d-1}=\frac{3y_d+1}{4}.
\tag{25b}
\]

The exponent-two steps are allowed only at

\[
K:=\left\{\left\lfloor\frac{\ell r}{e}\right\rfloor:
1\leq\ell<e\right\}.
\tag{25c}
\]

Thus (22) is exactly an accelerated Collatz segment starting at

\[
y_{r-1}=2q-1=t.
\tag{25d}
\]

The bottom condition has the equally exact form

\[
3y_0+1=2^{U+2}\tau.
\tag{25e}
\]

In particular, when the denominator is one, we have \(t=\tau=x\), the
integer \(\tau\) is odd, and equations (25b) and (25e) are precisely the
original one-drop cycle. Therefore, the conjugacy is a faithful
reformulation of the cycle gate, not an independent dynamical estimate.

There is also no unused bounded congruence in this reformulation. A path
with \(V\) spikes consumes

\[
(r-1-V)+2V=r-1+V
\]

binary lift bits. The bottom divisibility in (25e) consumes another
\(U+1\) bits, and

\[
(r-1+V)+(U+1)=r+e-1=N-1.
\tag{25f}
\]

The exact residue tree therefore uses all available information. The
finite data support the stronger relative inequality

\[
0<q<2^{e-1}
\quad\Longrightarrow\quad
v_2(3z_0-1)\leq U-1,
\tag{25g}
\]

provided every spike belongs to \(K\). This is verified through \(r=84\),
but it is not proved at all depths. Moreover, a uniform absolute bound on
the valuation is false. The remaining content of (25g) is the global
ordering of the full mechanically constrained parity cylinder.

## 5. Ordered insertion and the bad interval

Starting from a configuration, add an unselected site earlier than all
present unselected sites. In reversed coordinates this appends a largest
exponent \(k\). If primes denote the new configuration, then

\[
\boxed{
F'(X)=2F(X)-X^r+X^k,
\qquad
C'=2C-P+2^{r-k}3^k.}
\tag{26}
\]

Let \(u_k\) be the least positive inverse of \(2^{e+k}\) modulo
\(3^{r-k}\), and set \(s_k:=3^ku_k\). Then

\[
\boxed{\tau'=[2\tau+s_k]_P.}
\tag{27}
\]

The unreduced quantity lies between \(0\) and \(3P\), and all three wrap
counts occur. Thus a no-wrap induction in the ternary coordinate is false.

Now let

\[
\rho:=[CD^{-1}]_{2M}
\tag{28}
\]

be the least positive odd representative. Equivalently,
\(P\rho+C\equiv M\pmod{2M}\). For the insertion in (26), put

\[
n:=r-k,
\qquad R_n:=2^nv_n,
\qquad 3^nv_n\equiv1\pmod{2^{N+1-n}},
\qquad 0<v_n<2^{N+1-n}.
\tag{29}
\]

Since \(D=M-P\equiv-P\pmod{2^{N+1-n}}\), we obtain

\[
2^n3^{r-n}D^{-1}\equiv-R_n\pmod{2M},
\]

and therefore

\[
\boxed{\rho'=[2\rho+1-M-R_n]_{2M}.}
\tag{30}
\]

Suppose the parent has \(U+1\) selected sites, so that the child has
\(U\). Put

\[
\alpha_n:=\left[\frac{M+R_n}{2}\right]_M.
\]

Rearranging (30) gives the exact preimage criterion

\[
\boxed{
\rho'\leq2^U
\quad\Longleftrightarrow\quad
[\rho]_M\in
[\alpha_n,\alpha_n+2^{U-1}-1]\pmod M.}
\tag{31}
\]

Thus every bad insertion has one preimage interval of length \(2^{U-1}\).
The scaled representative is not monotone: at \(r=28\), one certified
insertion sends

\[
32{,}795{,}323{,}335{,}295
\quad\text{to}\quad
27{,}097{,}583.
\]

The image remains above its required threshold, but the collapse rules out
a monotone lower envelope for \(\rho/2^U\).

## 6. Why exact eligibility matters

Positive nonincreasing coefficients in (9), and even the broader strict
ballot condition, do not imply the stronger bounds. Take

\[
r=23,
\qquad N=37,
\qquad e=14,
\qquad J=\{2,4,6,10,15,16,18,19,21\}.
\]

Give every site in \(J\) exponent \(2\), every other preterminal site
exponent \(1\), and the terminal site exponent \(6\). Its cumulative
prefixes satisfy

\[
A_i\leq B_i=\left\lfloor\frac{37i}{23}\right\rfloor
\]

for every \(i\). Nevertheless,

\[
C=188{,}198{,}344{,}979,
\qquad
\tau=4{,}675<11{,}222=\left\lfloor(3/2)^{23}\right\rfloor,
\]

and

\[
t=6{,}823<16{,}383=2^{14}-1.
\]

Some sites of \(J\) do not belong to \(E\). Any proof of (19) or (24)
must therefore use coordinatewise mechanical eligibility.

## 7. Exact finite certificate

The script
[`cycles/cycle_one_drop_full_modulus_certificate.js`](cycles/cycle_one_drop_full_modulus_certificate.js)
checks all identities above with integer arithmetic. At its default cutoff
\(r\leq28\), it exhausts \(187{,}288\) nonempty profiles and
\(187{,}262\) canonical ordered insertion edges. It finds

\[
\#\{D\mid C\}=0,
\qquad
\#\{\tau<\lfloor(3/2)^r\rfloor\}=0,
\]

\[
\#\{\tau\leq2^U\}=0,
\qquad
\#\{\rho\leq2^U\}=0,
\qquad
\#\{t<2^e-1\}=0.
\]

The least certified ratios are

\[
\frac{\tau}{2^U}=\frac52,
\qquad
\frac{\rho}{2^U}=\frac72,
\]

both at \(a=(1,1,2,3)\). The same word gives

\[
\tau=\left\lfloor(3/2)^r\right\rfloor=5,
\qquad t=2^e-1=7.
\]

Through \(r=28\), the ternary insertion wrap counts \(0,1,2\) occur
respectively

\[
50{,}737,
\qquad 94{,}163,
\qquad 42{,}362
\]

times. These are finite computations, not an all-depth proof.

## Conclusion

The one-drop branch has one exact unbounded core. In ternary form it is the
ordered multiwrap recurrence (27). In binary form it is avoidance of the
single interval in (31). In synthetic form it is the terminal lower bound
(25) for the mechanically constrained recurrence (22).

These formulations retain the same missing lift information. The
factorization, positivity, endpoint congruences, and finite checks narrow
the problem to that datum, but none determines it.
