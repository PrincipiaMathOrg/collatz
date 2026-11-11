# Global factor counting and linear transition density

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** Proved. Every primitive denominator-one one-strip cycle in the
binary height branch has more than \(r/193\) cyclic height transitions above
the established period barrier. Consequently its shifted support has more
than \(r/386\) sites. An analogous entropy argument gives a positive linear
transition density on every fixed normalized divergent ray whose coefficient
height is uniformly bounded.

## 1. Binary one-strip cycles

We retain the notation and hypotheses of
cycle_two_level_transition_core.md. Thus \(x_0,\ldots,x_{r-1}\) are the
distinct odd states of a primitive nontrivial accelerated cycle,

\[
B_j:=\left\lfloor\frac{jN}{r}\right\rfloor,
\qquad
A_j=B_j-m_j,
\qquad
m_j\in\{0,1\},
\]

and

\[
a_j=B_{j+1}-B_j+m_j-m_{j+1}.
\tag{1}
\]

We extend \(m_j\), \(a_j\), and \(g_j\) periodically. Equivalently, we use
\(B_{j+r}=B_j+N\), which makes its difference word periodic. Put

\[
g_j:=B_{j+1}-B_j,
\qquad
T:=\#\{0\leq j<r:m_{j+1}\neq m_j\},
\qquad
H_r:=611r^{15}.
\tag{2}
\]

The audited binary state envelope is

\[
x_j<2^{m_j}H_r\leq 2H_r.
\tag{3}
\]

### Lemma 1. Distinct global factors

Let

\[
L:=\left\lceil\log_2 H_r\right\rceil.
\tag{4}
\]

Then the \(r\) cyclic valuation factors

\[
W_j:=(a_j,a_{j+1},\ldots,a_{j+L-1})
\qquad(0\leq j<r)
\tag{5}
\]

are pairwise distinct.

**Proof.** Suppose that \(W_i=W_j\), and let \(Q\) be the total exponent
of this common factor. Since every accelerated exponent is positive, we
have \(Q\geq L\). The exact odd-cylinder congruence gives

\[
x_i\equiv x_j\pmod {2^{Q+1}}.
\tag{6}
\]

Indeed, if \(C\) is the carry determined by the common factor, then

\[
3^Lx_i+C\equiv 2^Q\pmod {2^{Q+1}},
\]

and the same congruence holds with \(x_j\) in place of \(x_i\). On the
other hand, (3) and (4) give

\[
0<|x_i-x_j|<2H_r\leq 2^{L+1}\leq2^{Q+1}
\]

whenever \(i\neq j\). This contradicts (6). The cycle states are distinct
by primitivity, so the conclusion follows. \(\square\)

### Lemma 2. Entropy bound

Let

\[
h_2(p):=-p\log_2p-(1-p)\log_2(1-p)
\qquad(0\leq p\leq1)
\tag{7}
\]

denote binary entropy. Then

\[
\boxed{
\log_2 r
\leq
\log_2\bigl(2(L+1)\bigr)
+Lh_2\left(\frac Tr\right).}
\tag{8}
\]

**Proof.** Choose \(J\) uniformly from \(\mathbf Z/r\mathbf Z\). The random
factor \(W_J\) takes \(r\) values with equal probability by Lemma 1, and
hence

\[
\mathbf H(W_J)=\log_2r.
\tag{9}
\]

Let

\[
G_J:=(g_J,g_{J+1},\ldots,g_{J+L-1})
\]

be the corresponding rational mechanical factor, and put

\[
D_t:=\mathbf 1_{\{m_{J+t+1}\neq m_{J+t}\}}
\qquad(0\leq t<L).
\]

The rational mechanical word has at most \(L+1\) factors of length \(L\),
so

\[
\mathbf H(G_J)\leq\log_2(L+1).
\tag{10}
\]

The data

\[
(G_J,m_J,D_0,\ldots,D_{L-1})
\]

determine \(W_J\). Indeed, the initial bit and the transition indicators
reconstruct the height factor, after which (1) reconstructs the valuation
factor. For each \(t\), cyclic translation gives

\[
\mathbb P(D_t=1)=\frac Tr.
\tag{11}
\]

Subadditivity of entropy, with no independence assumption, now gives

\[
\begin{aligned}
\log_2r
&=\mathbf H(W_J)\\
&\leq \mathbf H(G_J)+\mathbf H(m_J)
  +\sum_{t=0}^{L-1}\mathbf H(D_t)\\
&\leq \log_2(L+1)+1+Lh_2(T/r).
\end{aligned}
\]

This is (8). \(\square\)

### Theorem 3. Explicit linear transition bound

Suppose that the established period barrier

\[
r\geq72{,}057{,}431{,}991
\tag{12}
\]

holds. Then

\[
\boxed{T>\frac r{193}.}
\tag{13}
\]

**Proof.** The barrier in (12) is larger than \(2^{36}\). Suppose towards
a contradiction that \(T/r\leq1/193\). Binary entropy is increasing on
\([0,1/2]\), and the exact integer comparison recorded below gives

\[
h_2(1/193)<\frac{117}{2500}.
\tag{14}
\]

Put \(x:=\log_2r\). Since \(611<2^{10}\), equation (4) gives

\[
L<15x+11,
\qquad
L+1<15x+12.
\tag{15}
\]

Equations (8), (14), and (15) would imply

\[
x<\log_2\bigl(2(15x+12)\bigr)
+\frac{117}{2500}(15x+11).
\tag{16}
\]

We show that the reverse strict inequality holds for every \(x\geq36\).
Define

\[
\Phi(x):=x-\log_2\bigl(2(15x+12)\bigr)
-\frac{117}{2500}(15x+11).
\]

The elementary bound \(\log 2>2/3\) gives, for \(x\geq36\),

\[
\Phi'(x)
>1-\frac{351}{500}-\frac{15}{368}>0.
\tag{17}
\]

For completeness, the tangent-line inequality
\(1/t\geq4/3-4t/9\) on \([1,2]\), with strict inequality away from
\(t=3/2\), proves this logarithm bound after integration.

Also \(1104^8<2^{81}\), and hence

\[
\Phi(36)
>36-\frac{81}{8}-\frac{117\cdot551}{2500}
=\frac{441}{5000}>0.
\tag{18}
\]

Thus (16) is impossible. This proves (13). \(\square\)

The entropy estimate (14) is equivalent to the exact integer inequality

\[
193^{482500}
<2^{22581}192^{480000}.
\tag{19}
\]

Indeed,

\[
h_2(1/193)
=\frac1{193}\log_2\left(\frac{193^{193}}{192^{192}}\right).
\]

The certificate accompanying this report checks (12), (14), (17), and
(18) using exact integer arithmetic.

### Corollary 4. Linear shifted support

Let

\[
k:=\#\{0\leq j<r:m_j=1\}.
\]

Every height-one run contains at least one shifted site, and a cyclic binary
profile with \(T>0\) has \(T/2\) height-one runs. Therefore \(T\leq2k\),
and Theorem 3 gives

\[
\boxed{k>\frac r{386}.}
\tag{20}
\]

Equation (8) also records a sharper variable bound. Namely, either
\(T/r\geq1/2\), or

\[
\frac Tr\geq
h_2^{-1}\left(
\frac{\log_2r-\log_2(2(L+1))}{L}
\right),
\tag{21}
\]

where the inverse is taken on \([0,1/2]\). Along any sequence of such
candidates with \(r\to\infty\), this gives

\[
\liminf\frac Tr
\geq h_2^{-1}(1/15)
=0.00792029\ldots.
\tag{22}
\]

## 2. A fixed bounded-height divergent ray

We now give the analogous statement for one fixed normalized ray. Let \(n\)
be a positive odd seed with injective accelerated orbit
\((x_j)_{j\geq0}\), where

\[
x_{j+1}=\frac{3x_j+1}{2^{a_j}},
\qquad
A_j:=\sum_{i<j}a_i.
\]

Assume

\[
A_j<j\log_2 3\qquad(j\geq1),
\qquad
B_j:=\lfloor j\log_2 3\rfloor,
\qquad
h_j:=B_j-A_j,
\tag{23}
\]

and suppose that, for one fixed integer \(M\geq1\),

\[
0\leq h_j\leq M
\qquad(j\geq0).
\tag{24}
\]

Put

\[
T_s:=\#\{0\leq j<s:h_{j+1}\neq h_j\},
\qquad
K_s:=2n+\frac{2s}{3}.
\tag{25}
\]

The normalized state envelope gives

\[
x_j<2^{h_j}K_s\leq2^M K_s
\qquad(0\leq j\leq s).
\tag{26}
\]

For \(s\) large enough, define

\[
L_s:=\left\lceil\log_2(2^M K_s)\right\rceil-1,
\qquad
q_s:=s-L_s+1>0.
\tag{27}
\]

Finally, put

\[
F_M(p):=h_2(p)+p\log_2M.
\tag{28}
\]

### Theorem 5. Finite-prefix entropy inequality

If

\[
\frac{T_s}{q_s}\leq\frac{M}{M+1},
\tag{29}
\]

then

\[
\boxed{
\log_2q_s
\leq
\log_2\bigl((L_s+1)(M+1)\bigr)
+L_sF_M\left(\frac{T_s}{q_s}\right).}
\tag{30}
\]

**Proof.** Consider the \(q_s\) valuation factors of length \(L_s\) whose
starts are \(0,1,\ldots,q_s-1\). If two are equal and have total exponent
\(Q\geq L_s\), their starting states are congruent modulo \(2^{Q+1}\).
Equations (26) and (27) give

\[
0<|x_i-x_j|<2^M K_s\leq2^{L_s+1}\leq2^{Q+1},
\]

which is impossible. Thus these \(q_s\) factors are distinct.

Choose their starting index \(J\) uniformly. The characteristic mechanical
factor \(G_J\) takes at most \(L_s+1\) values. Let

\[
Z_t:=h_{J+t}
\qquad(0\leq t\leq L_s)
\]

and let \(p_t:=\mathbb P(Z_{t+1}\neq Z_t)\). Conditional on \(Z_t\), a
nontransition determines \(Z_{t+1}\), while a transition leaves at most
\(M\) possible new heights. Therefore

\[
\mathbf H(Z_{t+1}\mid Z_t)
\leq h_2(p_t)+p_t\log_2M
=F_M(p_t).
\tag{31}
\]

Every transition among the first \(s\) edges is counted in at most \(L_s\)
of the pairs \((J,t)\). Hence

\[
\overline p:=\frac1{L_s}\sum_{t=0}^{L_s-1}p_t
\leq\frac{T_s}{q_s}.
\tag{32}
\]

The function \(F_M\) is concave, and it is increasing on
\([0,M/(M+1)]\). By (29), Jensen's inequality and (32) give

\[
\sum_{t=0}^{L_s-1}F_M(p_t)
\leq L_sF_M(\overline p)
\leq L_sF_M(T_s/q_s).
\tag{33}
\]

The valuation factor is determined by \(G_J\) and
\((Z_0,\ldots,Z_{L_s})\). Its entropy is \(\log_2q_s\), while
\(\mathbf H(Z_0)\leq\log_2(M+1)\). The entropy chain rule, (31), and (33)
now give (30). \(\square\)

### Corollary 6. Positive limiting transition density

Let \(c_M\) be the unique number in

\[
0<c_M\leq\frac{M}{M+1}
\]

such that

\[
\boxed{h_2(c_M)+c_M\log_2M=1.}
\tag{34}
\]

Then

\[
\boxed{
\liminf_{s\to\infty}\frac{T_s}{s}\geq c_M>0.}
\tag{35}
\]

**Proof.** We have

\[
L_s=\log_2s+O_{n,M}(1),
\qquad
q_s=s-O_{n,M}(\log s).
\tag{36}
\]

Consequently the right side obtained by rearranging (30) satisfies

\[
F_M(T_s/q_s)
\geq
\frac{\log_2q_s-
\log_2((L_s+1)(M+1))}{L_s}
=1-o(1),
\tag{37}
\]

unless \(T_s/q_s>M/(M+1)\), in which case the required lower bound is
already stronger. The function \(F_M\) is continuous and strictly
increasing up to \(M/(M+1)\). Also

\[
F_M(0)=0,
\qquad
F_M\left(\frac{M}{M+1}\right)=\log_2(M+1)\geq1.
\]

This proves the existence and uniqueness in (34), as well as
\(\liminf T_s/q_s\geq c_M\). Equation (36) then gives (35). \(\square\)

For example, \(c_1=1/2\), while

\[
c_2=0.22709219\ldots,
\qquad
c_3=0.18928962\ldots.
\]

Thus a binary-height normalized divergent ray must change height on at
least half of its accelerated edges asymptotically. More generally, every
fixed height cap forces a positive transition density. This does not
exclude an unbounded-height ray, and it does not by itself force a bounded
orbit state or a decoder renewal.

## 3. Proof ledger

The following statements are proved.

1. The polynomial state envelope makes all \(r\) cyclic valuation factors
   distinct at logarithmic length.
2. Global entropy counting upgrades the binary cycle estimate from
   \(T=\Omega(r/\log r)\) to the all-depth inequality \(T>r/193\) above
   the period barrier.
3. The binary shifted support satisfies \(k>r/386\).
4. A fixed normalized divergent ray with a fixed height cap \(M\) satisfies
   the finite-prefix inequality (30) and the asymptotic linear bound (35).

The remaining obstruction in both settings is transition-dense. In the
cycle setting, the theorem does not rule out a binary profile with linear
transition density. In the divergent setting, it does not address an
unbounded height sequence.
