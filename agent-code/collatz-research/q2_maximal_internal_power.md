# The fixed-start power gate for the maximal \(q=2\) profile

**Date:** 17 August 2026  
**Mode:** SOLVE  
**Status:** the maximal lower-mechanical profile is excluded at every depth
in the \(q=2\) target gate. This includes every strict target in the no-wrap
range and the equality target for this one profile. The result does not
exclude a general \(q=2\) profile.

## 1. Statement

Put

\[
\alpha:=\log _2 3,
\qquad
k_t:=\lceil t\alpha\rceil .
\]

Let \(s\geq2\) satisfy

\[
k_s-k_{s-1}=1,
\tag{1}
\]

which is the row-multiplier-\(2\) condition. Consider the maximal
prefix-barrier positions

\[
A_i:=\lfloor i\alpha\rfloor,
\qquad 0\leq i<s,
\tag{2}
\]

and their carry

\[
C_s:=\sum_{i=0}^{s-1}3^{s-1-i}2^{A_i}.
\tag{3}
\]

Write

\[
M:=2^{k_s},
\qquad
P:=3^s,
\qquad
D:=M-P,
\qquad
e:=k_s-s.
\]

We prove the following theorem.

**Theorem 1.** There are no positive odd integers \(n\) and integers \(d\)
with

\[
0\leq d\leq\left\lceil\frac{e-1}{2}\right\rceil
\tag{4}
\]

such that

\[
Pn+C_s=M(n+d).
\tag{5}
\]

In particular, the mandatory deformation

\[
m_i=
\left\lfloor\frac{ik_s}{s}\right\rfloor
-\lfloor i\alpha\rfloor
\]

cannot satisfy a strict \(q=2\), \(b=1\), no-wrap target. The equality
target \(d=0\) is excluded for this profile as well.

The proof uses three previously established inputs: the polynomial height
bound for a first-crossing failure, the moving-start block-power divisibility
lemma P17, and the Christoffel integrality theorem. We record every use
below.

## 2. The exact characteristic tail

Put

\[
\beta:=\alpha-1=\log _2(3/2).
\]

For \(0\leq i\leq s-2\), the accelerated exponents determined by (2) are

\[
a_i=A_{i+1}-A_i
=1+b_i,
\qquad
b_i:=\lfloor(i+1)\beta\rfloor-\lfloor i\beta\rfloor.
\tag{6}
\]

Since \(1/2<\beta<1\), we have \(b_0=0\). Define

\[
c_j:=\lfloor(j+2)\beta\rfloor-\lfloor(j+1)\beta\rfloor.
\tag{7}
\]

Then

\[
(b_0,b_1,b_2,\ldots)=(0,c_0,c_1,\ldots).
\tag{8}
\]

Thus the characteristic word \(c:=c_0c_1\cdots\) occurs at the fixed
accelerated start \(j=1\). There are exactly

\[
m:=s-2
\tag{9}
\]

characteristic letters available before the terminal exponent. This index
is important. Indeed, (1) gives

\[
A_{s-1}=k_s-2,
\]

so the terminal exponent is \(a_{s-1}=2\). It replaces the next
lower-mechanical exponent, and therefore cannot be added to the
characteristic prefix in (9).

The starting state does not migrate with \(s\). Since \(a_0=1\), it is

\[
x_1=\frac{3n+1}{2},
\qquad
2x_1+1=3n+2.
\tag{10}
\]

## 3. A quantitative standard-power lemma

We now prove the combinatorial lemma needed for (8). Let

\[
\beta=[0;\eta _1,\eta _2,\ldots],
\qquad
\eta _1=1.
\]

For the present value of \(\beta\), the first four partial quotients are
\((1,1,2,2)\), so \(Q_4=12\). Define the standard words by

\[
S_0:=0,
\qquad
S_1:=1,
\qquad
S_t:=S_{t-1}^{\eta_t}S_{t-2}\quad(t\geq2),
\tag{11}
\]

with lengths

\[
Q_0=Q_1=1,
\qquad
Q_t=\eta_tQ_{t-1}+Q_{t-2}.
\tag{12}
\]

The continued-fraction coding of an irrational rotation gives

\[
c=\lim_{t\to\infty}S_t.
\tag{13}
\]

**Lemma 2.** For every \(m\geq12\), the length-\(m\) prefix of \(c\)
begins with a power

\[
V^K,
\qquad
K\geq2,
\qquad
L:=K|V|,
\]

such that

\[
\boxed{4L>m.}
\tag{14}
\]

Moreover, \(V\) can be chosen to be one of the standard words \(S_t\).

**Proof.** Choose \(t\) such that

\[
Q_t\leq m<Q_{t+1}
\]

and put \(r:=\lfloor m/Q_t\rfloor\). Suppose first that \(r\geq2\). Since

\[
Q_{t+1}=\eta_{t+1}Q_t+Q_{t-1},
\]

we have \(r\leq\eta_{t+1}\). Hence \(S_t^r\) is a prefix of \(c\). Also,

\[
m<(r+1)Q_t,
\]

so the choice \(V=S_t\), \(K=r\) satisfies (14).

It remains to consider \(r=1\), in which case \(m<2Q_t\). There are three
possibilities.

1. If \(\eta_t\geq2\), then \(S_t\) begins with
   \(S_{t-1}^{\eta_t}\). We choose

   \[
   V=S_{t-1},
   \qquad
   K=\eta_t.
   \]

   Since \(Q_t<(\eta_t+1)Q_{t-1}\), equation (14) follows.

2. If \(\eta_t=1\) and \(\eta_{t-1}\geq2\), then \(S_t\) begins with
   \(S_{t-2}^{\eta_{t-1}}\). We choose

   \[
   V=S_{t-2},
   \qquad
   K=\eta_{t-1}.
   \]

   Writing \(a:=\eta_{t-1}\), we have

   \[
   Q_t=(a+1)Q_{t-2}+Q_{t-3}<(a+2)Q_{t-2}.
   \]

   Since \(a\geq2\) and both displayed inequalities are strict, we again
   obtain \(4K|V|>m\), including the boundary case \(a=2\).

3. Suppose \(\eta_t=\eta_{t-1}=1\). Then

   \[
   S_t=S_{t-1}S_{t-2}
       =S_{t-2}S_{t-3}S_{t-2}.
   \tag{15}
   \]

   We claim that \(S_{t-2}\) is a prefix of
   \(S_{t-3}S_{t-2}\). To see this, write

   \[
   S_{t-2}=S_{t-3}^{\eta_{t-2}}S_{t-4}.
   \]

   The word \(S_{t-4}\) is a prefix of \(S_{t-3}\). Therefore the first
   \(Q_{t-2}\) letters of \(S_{t-3}S_{t-2}\) are exactly \(S_{t-2}\).
   It follows from (15) that \(S_{t-2}^2\) is a prefix of \(S_t\). We take

   \[
   V=S_{t-2},
   \qquad
   K=2.
   \]

   Finally,

   \[
   Q_t=2Q_{t-2}+Q_{t-3}<3Q_{t-2},
   \]

   which is stronger than (14).

These cases prove the lemma. \(\square\)

The proof covers large continued-fraction coefficients directly. A large
\(\eta_t\) produces a long power rather than a loss in the bound. Thus no
upper estimate for a denominator jump is needed.

## 4. Why the displayed block is not cyclic

The nonvanishing condition in P17 must be checked. Let \(V=S_u\) be the
base word supplied by Lemma 2, let \(q:=|V|\), and let \(p\) be the number
of ones in \(V\). Under the map

\[
0\longmapsto1,
\qquad
1\longmapsto2,
\tag{16}
\]

the block has length \(q\) and total exponent \(q+p\).

We first justify the Christoffel identification. The word \(S_u\) has
\(p_u\) ones and \(q_u\) letters, where \(p_u/q_u\) is the \(u\)-th
continued-fraction convergent of \(\beta\). The standard-word recursion
(11) is the Euclidean concatenation recursion for finite Christoffel
words. Induction on \(u\) therefore shows that \(S_u\) is a cyclic
conjugate of the rational lower-mechanical word

\[
W_{p,q}(j):=
\left\lfloor\frac{(j+1)p}{q}\right\rfloor
-\left\lfloor\frac{jp}{q}\right\rfloor,
\qquad 0\leq j<q.
\tag{17}
\]

For the accelerated Christoffel word with \(q\) odd steps and shortcut
length \(q+p\), the one positions are

\[
\left\lfloor\frac{j(q+p)}q\right\rfloor
=j+\left\lfloor\frac{jp}q\right\rfloor.
\]

Its cyclic exponent gaps are therefore \(1+W_{p,q}(j)\). Thus the map
(16) sends \(S_u\) to a cyclic conjugate of this accelerated Christoffel
word.

If

\[
2^{q+p}\leq3^q,
\]

the affine fixed-point equation has no positive solution. Suppose instead
that

\[
2^{q+p}>3^q.
\]

If the standard block fixed an integer state, we could begin the same
integer orbit at the boundary which rotates the block to the lower
Christoffel word. This would give an integer fixed point for that
Christoffel word. The Christoffel integrality theorem excludes it, since
its carry is a unit modulo \(2^{q+p}-3^q\). Lemma 2 uses \(m\geq12\), so
its selected base has \(q>1\); the exceptional one-letter block \((2)\)
does not arise.

Consequently, for the state \(x_1\) in (10),

\[
\Lambda_V(x_1)\neq0.
\tag{18}
\]

This verifies the noncyclic hypothesis in P17 without assuming that the
Collatz conjecture has no nontrivial cycles.

## 5. The exponential contradiction

Let \(d_V:=|V|\). Applying P17.4 to the occurrence \(V^K\) at the fixed
start \(j=1\) gives

\[
\left(\frac{2^K}{3}\right)^{d_V}
\leq2x_1+1
=3n+2.
\tag{19}
\]

Put \(L:=Kd_V\). Since \(K\geq2\),

\[
\left(\frac{2^K}{3}\right)^{d_V}
=\frac{2^L}{3^{d_V}}
\geq\left(\frac43\right)^{L/2}.
\tag{20}
\]

Equations (9), (14), (19), and (20) give

\[
\boxed{
\left(\frac43\right)^{(s-2)/8}<3n+2.}
\tag{21}
\]

In the score requested by the moving-start formulation, the same statement
is

\[
\begin{aligned}
\mathcal S
&:=(K\log2-\log3)d_V-\log(3/2)\\
&>\frac{s-2}{8}\log(4/3)-\log(3/2).
\end{aligned}
\tag{22}
\]

Thus the arithmetic score grows linearly in \(s\), while the start remains
fixed.

We now use the height bound. Equation (5) gives

\[
\frac{C_s}{P}=(R-1)n+Rd,
\qquad
R:=\frac MP.
\]

The prefix barrier gives \(C_s/P<s/3\). The established linear-form
estimate

\[
\log R>e^{-6.125581}s^{-13.3}
\]

therefore implies

\[
n<153s^{14.3}.
\tag{23}
\]

For \(s\geq1\), equation (23) gives

\[
3n+2<459s^{14.3}+2<461s^{15}.
\tag{24}
\]

The exact certificate verifies

\[
4^{4999}>3^{4999}\,461^8\,5001^{120}
\tag{25}
\]

and

\[
4\cdot5001^{120}>3\cdot5002^{120}.
\tag{26}
\]

Equation (26), together with the fact that
\((1+1/s)^{120}\) decreases with \(s\), propagates (25). Hence

\[
\left(\frac43\right)^{(s-2)/8}>461s^{15}
\qquad(s\geq5001).
\tag{27}
\]

Equations (21), (24), and (27) are contradictory. This excludes every
\(s\geq5001\).

## 6. Exact finite certificate

It remains to check \(s\leq5000\). For each \(s\), the certificate
constructs

\[
A_i=\lfloor i\log_2 3\rfloor
\]

exactly from the bit length of \(3^i\). It constructs \(C_s\) by the
recursion

\[
C_s=3C_{s-1}+2^{A_{s-1}}
\]

and retains precisely the weights satisfying (1). The endpoint congruence
is

\[
d\equiv C_sM^{-1}\pmod D.
\tag{28}
\]

The allowed target interval is shorter than \(D\), so (28) decides all
targets at once. The exact output is

~~~text
finite_cutoff=5000
q2_weights=2075
tested_strict_targets=1517842
strict_target_hits=0
equality_target_hits=0
analytic_start=5001
cutoff_base=true
propagation=true
~~~

The checker is
[inverse/q2_maximal_internal_power_certificate.js](inverse/q2_maximal_internal_power_certificate.js).
The diagnostic
[sync/q2_maximal_internal_power_probe.js](sync/q2_maximal_internal_power_probe.js)
certifies the continued-fraction cylinder

\[
\left(
\frac{6195184}{10590737},
\frac{6306641}{10781274}
\right)
\]

for \(\beta\), constructs the corresponding standard prefix, and verifies
all \(84\) distinct powers selected through ten million characteristic
letters. Its exact worst retained coverage is

\[
\frac{63734}{190536}>0.334,
\]

while the proof only uses \(L/m>1/4\). The large partial quotients \(23\)
and \(55\) increase the score by producing long standard-word powers.

## 7. Logarithmic departure for every \(b=1\) survivor

The same argument gives an immediate restriction on a general profile. Let

\[
h_i:=\lfloor i\alpha\rfloor-A_i\geq0
\]

and let \(J\) be the first index for which \(h_J>0\). If there is no such
index, Theorem 1 applies. Suppose that \(J\) exists.

For every \(i\leq J-2\), both \(A_i\) and \(A_{i+1}\) agree with the
maximal profile. Thus the accelerated exponents

\[
a_0,a_1,\ldots,a_{J-2}
\]

give a lower-mechanical prefix of length \(J-1\). Its first binary letter
is zero, so a characteristic prefix of length

\[
m=J-2
\]

begins at the same fixed state \(x_1=(3n+1)/2\). If \(m\geq12\), equations
(19) and (20) give

\[
\left(\frac43\right)^{(J-2)/8}<3n+2<461s^{15}.
\tag{29}
\]

If \(m<12\), then \(J<14\), which satisfies the following conclusion
trivially for \(s\geq2\). We have therefore proved:

**Corollary 3.** Every surviving \(q=2\), \(b=1\) target leaves the maximal
prefix barrier by

\[
\boxed{
J<8\log_{4/3}(461s^{15})+2.}
\tag{30}
\]

In particular, every general survivor has a nonzero deformation within
\(O(\log s)\) odd steps. This is not a closure of the general \(b=1\)
branch, but it reduces its free maximal prefix from length \(s\) to
logarithmic length.

## 8. Scope and proof ledger

The following items are closed.

1. The lower mechanical word is \(0c_\beta\), with the characteristic word
   beginning at the fixed accelerated position \(j=1\).
2. The available characteristic prefix has length \(s-2\), not \(s-1\).
3. Every characteristic prefix of length at least \(12\) begins with a
   standard power \(V^K\) whose total length is greater than one quarter of
   the prefix length.
4. The block \(V\) is noncyclic, by contraction or by the Christoffel
   integrality theorem.
5. P17 gives an exponential lower bound at the exact state
   \(x_1=(3n+1)/2\).
6. The analytic comparison closes every \(s\geq5001\), and the exact
   residue certificate closes every smaller \(s\).
7. Every general \(b=1\) survivor departs from the maximal profile within
   the explicit logarithmic bound (30).

The following items remain open.

1. A general \(q=2\) no-wrap profile need not be maximal mechanical. Its
   deformation levels can destroy the fixed characteristic tail.
2. The argument does not bound the terminal delay for an arbitrary profile.
3. No conclusion about all divergent orbits or all nontrivial cycles follows
   from this one-profile theorem.
