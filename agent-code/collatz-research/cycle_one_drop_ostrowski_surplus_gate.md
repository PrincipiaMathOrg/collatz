# The Ostrowski surplus gate for the anchored Beatty quotient

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** We split the anchored quotient inequality into a fixed lower
Sturmian coefficient assertion and one explicit upper-approximation
surplus. The split is exact at every depth. We also exclude the \(q=14\)
delayed shadow for every \(r\), not merely in a finite search. The fixed
Sturmian assertion and the general surplus branch remain unproved.

## 1. The lower clock and the surplus token

Fix an integer \(r\geq1\), and put

\[
\gamma:=\log _2(3/2),
\qquad
e:=\lceil\gamma r\rceil,
\qquad
\delta:=e-\gamma r\in(0,1).
\tag{1}
\]

The anchored rational clock and the lower irrational clock are

\[
B_t:=\left\lfloor\frac{et}{r}\right\rfloor,
\qquad
b_t:=B_t-B_{t-1},
\tag{2}
\]

and

\[
A_t:=\lfloor\gamma t\rfloor,
\qquad
c_t:=A_t-A_{t-1},
\tag{3}
\]

respectively. We now define

\[
h_t:=B_t-A_t.
\tag{4}
\]

Since

\[
\frac{et}{r}=\gamma t+\frac{\delta t}{r}
\qquad(0\leq t\leq r)
\tag{5}
\]

and \(0\leq\delta t/r<1\), we have

\[
h_t\in\{0,1\}.
\tag{6}
\]

Taking first differences gives the exact identity

\[
\boxed{b_t=c_t+h_t-h_{t-1}.}
\tag{7}
\]

In other words, the anchored rational clock is the fixed lower Sturmian
clock together with one \(0/1\) surplus token. A site with

\[
(c_t,b_t)=(0,1)
\tag{8}
\]

is a token entry, while a site with

\[
(c_t,b_t)=(1,0)
\tag{9}
\]

is a token deletion.

There is also an exact one-sided approximation description of the token.
For \(1\leq t\leq r\), put

\[
\eta_t:=\frac{\lceil\gamma t\rceil}{t}-\gamma
=\frac{1-\{\gamma t\}}{t}.
\tag{10}
\]

Equation (5) gives

\[
\boxed{
h_t=1
\quad\Longleftrightarrow\quad
\eta_t\leq\frac{\delta}{r}.
}
\tag{11}
\]

Thus the moving token is precisely the sublevel set of the upper rational
approximations to \(\gamma\), at the intercept-specific threshold
\(\delta/r\). This is the useful Ostrowski coordinate. It records the
anchored intercept exactly, rather than replacing it by a cyclically
balanced word.

We record one continued-fraction consequence. Suppose that \(h_t=1\) and
\(r>2t^2\). If

\[
\frac{\lceil\gamma t\rceil}{t}=\frac{p}{q}
\tag{12}
\]

in lowest terms, then (11) gives

\[
0<\frac pq-\gamma<\frac1r<\frac1{2t^2}\leq\frac1{2q^2}.
\tag{13}
\]

Legendre's criterion shows that \(p/q\) is an upper continued-fraction
convergent of \(\gamma\). Therefore, a token which is active very early in
the word must be supported by an upper convergent, possibly repeated
before reduction. Note that this only controls \(t<\sqrt{r/2}\). It does
not control the linearly long terminal suffix in the denominator-one gate.

## 2. Exact split of the quotient inequality

We use the partial integer map

\[
F(2k):=3k,
\qquad
F(4k+1):=3k+1,
\tag{14}
\]

with an exit at \(4k+3\). We call the first branch ordinary and the second
branch a spike. For a path of length \(t\), let \(V_t\) denote its number
of spikes, and let \(q_t\) denote the least positive integer in its dyadic
cylinder. Its homogeneous coefficient is

\[
G_t:=\frac{3^t}{2^{t+V_t}}.
\tag{15}
\]

Consider the following fixed-clock assertion.

**Lower Sturmian coefficient assertion.** If every spike at a time
\(s\leq t\) satisfies \(c_s=1\), then

\[
\boxed{q_t>G_t.}
\tag{16}
\]

We do not prove (16). Its role is that it removes every anchored path
which never uses the rational surplus.

Indeed, let \(n:=r-1\), let \(Q:=q_n\), and suppose that no spike occurs
at a token entry. Every spike then belongs to the lower clock. Put

\[
H:=A_n-V_n.
\tag{17}
\]

Since \(B_n=e-1\), equations (4) and (17) give

\[
U:=e-1-V_n=H+h_n.
\tag{18}
\]

On the other hand,

\[
G_n
=2^{\gamma n-V_n}
=2^{H+\{\gamma n\}}
>2^H.
\tag{19}
\]

If \(h_n=0\), assertion (16) gives \(Q>2^H>2^{U-1}\). If \(h_n=1\), it
gives \(Q>2^H=2^{U-1}\). We have proved the following exact dichotomy.

**Proposition 1.** A counterexample to

\[
Q>2^{U-1}
\tag{20}
\]

must satisfy at least one of the following conditions:

1. it gives a counterexample to the fixed lower Sturmian coefficient
   assertion (16);
2. it uses a spike at a token-entry site, where (11) holds.

This is not a disjunction over many rational Beatty masks. The first term
is one fixed irrational-clock problem. The second term is one explicit
one-sided approximation surplus.

## 3. The ordinary-run reserve

We next incorporate the zero-lift stabilization into the fixed-clock
problem. After \(t\) branches, write

\[
L:=t+V_t,
\tag{21}
\]

and let \(z_t\) be the endpoint belonging to \(q_t\). Put

\[
k:=v_2(z_t)
\tag{22}
\]

and define the ordinary-run reserve by

\[
\boxed{
\mathscr R_t:=q_t2^{L+k}-3^{t+k}.
}
\tag{23}
\]

The next \(k\) ordinary branches are zero lifts. After \(j\) of them, the
representative is still \(q_t\), the modulus exponent is \(L+j\), and the
homogeneous coefficient is \(3^{t+j}/2^{L+j}\). Since this coefficient
increases by a factor of \(3/2\) at each step, all \(k\) descendants
satisfy (16) if and only if the last one does. Therefore,

\[
\mathscr R_t>0
\quad\Longleftrightarrow\quad
q_t>\frac{3^{t+j}}{2^{L+j}}
\quad(0\leq j\leq k).
\tag{24}
\]

Moreover, one zero-lift ordinary branch replaces

\[
(t,L,k)
\quad\text{by}\quad
(t+1,L+1,k-1).
\]

Consequently,

\[
\mathscr R_{t+1}=\mathscr R_t.
\tag{25}
\]

Thus an arbitrarily long all-ordinary part of the stabilized suffix does
not create independent cases. Its reserve is constant. The unresolved
transitions are the reset nodes at which the endpoint is odd, or at which
a spike changes the affine carry. Those resets still expose unbounded new
dyadic digits.

The exact checker
[`cycles/beatty_ostrowski_prefix_probe.js`](cycles/beatty_ostrowski_prefix_probe.js)
enumerates every lower-clock cylinder through \(t=100\). At a node of
depth \(t\), every descendant \(s\) steps later has \(q'\geq q_t\) and
\(L'\geq L+s\). Hence the subtree is permanently safe through a horizon
\(T\) once

\[
q_t2^{L+T-t}>3^T.
\tag{26}
\]

This proves the pruning rule used by the checker. The exact run through
\(T=100\) visits \(34{,}869{,}787\) nodes and finds no coefficient debt.
This is a finite statement only.

## 4. The \(q=14\) shadow at every depth

We now dispose of the delayed \(q=14\) shadow without a cutoff in \(r\).
Its intrinsic path through time \(16\) is

\[
\begin{aligned}
14,&21,16,24,36,54,81,61,46,69,52,78,117,88,132,198,297,
\end{aligned}
\tag{27}
\]

with spike times

\[
\{2,7,8,10,13\}.
\tag{28}
\]

At time \(16\), it has \(V=5\), \(L=21\), and

\[
14\cdot2^{21}<3^{16}.
\tag{29}
\]

Thus it is a genuine coefficient-debt prefix.

The spike at time \(8\) is not available in the lower clock. Indeed,

\[
\lfloor7\gamma\rfloor=\lfloor8\gamma\rfloor=4,
\qquad c_8=0.
\tag{30}
\]

Therefore, compatibility with an anchored rational clock requires
\(h_8=1\). Since \(\lceil8\gamma\rceil=5\), equation (10) gives

\[
\eta_8=\frac58-\gamma.
\tag{31}
\]

The exact integer inequality

\[
3^{200}<2^{317}
\tag{32}
\]

gives \(\gamma<117/200\), and hence

\[
\eta_8>\frac58-\frac{117}{200}=\frac1{25}.
\tag{33}
\]

Equations (11) and (33) now imply

\[
\frac1{25}<\eta_8\leq\frac{\delta}{r}<\frac1r.
\tag{34}
\]

Consequently, \(r<25\). Since the prefix has length \(16\), it remains
only to check \(17\leq r\leq24\). Exact floor arithmetic gives

\[
\begin{array}{c|cccccccc}
r&17&18&19&20&21&22&23&24\\ \hline
e&10&11&12&12&13&13&14&15\\
\text{first missing spike}&8&8&-&8&8&8&8&-
\end{array}
\tag{35}
\]

Thus only \(r=19\) and \(r=24\) support the prefix. In both rows,

\[
b_{17}=0.
\tag{36}
\]

The state at time \(16\) is \(297\), which is odd. The next ordinary
branch therefore has a nonzero lift. Since the current cylinder modulus is
\(2^{21}\), its least representative is

\[
q'=14+2^{21}=2{,}097{,}166.
\tag{37}
\]

Every later cylinder representative \(Q\) is at least \(q'\). Moreover,
\(V_n\geq5\), while \(e\leq15\) in the two compatible rows. Therefore,

\[
U=e-1-V_n\leq9,
\qquad
2^{U-1}\leq256<q'\leq Q.
\]

We have proved that the \(q=14\) debt prefix cannot produce a
counterexample at an anchored leaf for any \(r\).

## 5. A token deletion is not a general descent

The preceding argument uses the exact \(q=14\) endpoint. A token used by a
spike does not generally force a lift at its paired deletion. A
smallest-depth countermodel occurs at

\[
r=8,
\qquad e=5,
\qquad q=24.
\tag{38}
\]

The rational and lower clocks begin

\[
b_1\cdots b_7=0101101,
\qquad
c_1\cdots c_7=0101011.
\tag{39}
\]

The path

\[
24\xmapsto{O}36\xmapsto{O}54\xmapsto{O}81
\xmapsto{S}61\xmapsto{S}46\xmapsto{O}69
\tag{40}
\]

uses the surplus spike at time \(5\). The token is deleted at time \(6\),
but the input \(46\) is even, so the ordinary branch is a zero lift. Thus
token pairing alone cannot close the surplus case.

## Conclusion

The anchored intercept has now been separated exactly from the fixed
Sturmian geometry. A low quotient must either violate one fixed
lower-clock coefficient assertion or use a site supported by the upper
approximation sublevel set (11). The ordinary-run reserve removes the
apparent multiplicity of zero-lift chains, and the only observed delayed
debt, \(q=14\), is excluded at every depth.

The remaining problem is still global. Continued fractions classify only
the very early surplus sites automatically, while a token in the terminal
region can interact with arbitrarily many new residue digits. Equations
(11), (23), and the exact dichotomy in Proposition 1 sharpen the gate, but
they do not prove \(Q>2^{U-1}\) at all depths.
