# Binary transition density does not force resultant content

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** exact method-level no-go. The binary endpoint resultant has no
forced \(2\)-content. Linear transition density also does not force
\(3\)-content or a norm below the determinant. A primitive least exact
rational cycle realizes the failure at \((r,N)=(59,94)\). An independent
scaled family realizes it above the period barrier at the strict-record
path/resultant level, but is not asserted to be least or to satisfy
\(D\mid C\).

## 1. The order mismatch

Assume \(\gcd(N,r)=1\), and put

\[
B=N-r,\quad L=2r-N,\quad c_j=[jN]_r=[jB]_r,\quad
\mathcal C=\{c_j:m_j=1\}.
\]

Here \(0\notin\mathcal C\). The index successor is
\(c\mapsto c+B\pmod r\), and

\[
g_j=B_{j+1}-B_j=2\iff c_j\ge L. \tag{1}
\]

Thus the entropy transition count is a boundary in the \(B\)-step order.
The endpoint polynomial instead sees ordinary residue order. If
\(c_*=\max\mathcal C\), set

\[
S_{\mathcal C}(X)=\sum_{c\in\mathcal C}X^{c_*-c},\qquad
H_{\mathcal C}(X)=(X-1)S_{\mathcal C}(X)-X^{c_*+1}. \tag{2}
\]

The denominator-one subset gate implies

\[
D\mid\operatorname{Res}(X^r-2,H_{\mathcal C}). \tag{3}
\]

If \(\nu(\mathcal C)\) is the number of ordinary linear residue runs, the
coefficients in \((X-1)S_{\mathcal C}\) are the signed run endpoints.
The final term is isolated because \(0\notin\mathcal C\). Hence

\[
\boxed{\sum_e [X^eH_{\mathcal C}]^2=2\nu(\mathcal C)+1.} \tag{4}
\]

There is no useful comparison between \(T\) and \(\nu\). In particular, if
\(\mathcal C\subset[1,L)\), then \(L<B\); every \(c\in\mathcal C\) has
predecessor \(c+L\in[L,r)\) and successor \(c+B\in[B,r)\), both outside
\(\mathcal C\). Thus every shifted site is isolated in index order and

\[
\boxed{T=2|\mathcal C|,} \tag{5}
\]

while \(\nu(\mathcal C)\) remains arbitrary.

## 2. Universal absence of \(2\)-content

Equation (2) gives \(H_{\mathcal C}(0)=-1\). Therefore

\[
\operatorname{Res}(X^r-2,H_{\mathcal C})
\equiv\operatorname{Res}(X^r,H_{\mathcal C})
=H_{\mathcal C}(0)^r\equiv1\pmod2. \tag{6}
\]

The direct endpoint resultant is always odd. Transition density cannot
force even one factor of \(2\). Modulo three, content is equivalent to a
common factor of \(X^r+1\) and \(H_{\mathcal C}\) over \(\mathbf F_3\);
the \(B\)-step boundary does not control that gcd.

## 3. Least exact rational witness

Take

\[
r=59,\quad N=94,\quad
D=2^{94}-3^{59}=5676654536827349893621176517
\]

and

\[
\begin{split}
\mathcal C=\{&2,6,8,9,11,14,17,19,20,22,23,24,26,27,31,32,34,37,\\
&41,43,49,54,55,57\}.
\end{split} \tag{7}
\]

Define \(m_j=1\) iff \([94j]_{59}\in\mathcal C\), and

\[
a_j=\left\lfloor\frac{(j+1)94}{59}\right\rfloor
-\left\lfloor\frac{j94}{59}\right\rfloor+m_j-m_{j+1}. \tag{8}
\]

Exact arithmetic gives \(k=T=24\). Every \(0\to1\) entry crosses a
baseline gap two, so every \(a_j\ge1\). The word is primitive, satisfies
all strict suffix records, and its associated rational cycle has its strict
least state at \(j=0\). Its carry is

\[
C=189239112907578841335971743427,\qquad \gcd(C,D)=1. \tag{9}
\]

Thus the reduced denominator is exactly \(D\), and \(33<C/D<34\).
The support has \(17\) ordinary residue runs, so the endpoint energy is
\(35\). Its exact resultant is

\[
\begin{split}
R={}&23281735951464258499426253587550606011986727,\\
R&>D,\quad R\equiv1\pmod2,\quad R\equiv1\pmod3,\quad
\gcd(R,D)=1.
\end{split} \tag{10}
\]

This is not a denominator-one counterexample: (9) is precisely the failure
of \(D\mid C\), and (10) also misses the necessary divisibility (3). It
disproves only the proposed intermediate implication from leastness,
binary height, strict records, primitivity, coprimality, and dense
transitions to enough \(2/3\)-content or a resultant below \(D\).

## 4. Above-barrier scalable path witness

Let

\[
\begin{split}
\mathcal C_0=\{&2,5,7,8,9,11,13,14,15,18,19,20,21,22,23,25,27,29,30,31,\\
&37,40,42,43,44,48,49,53,56,57,58\},
\end{split}
\]

\[
S_0(Y)=\sum_{c\in\mathcal C_0}Y^{58-c},\qquad
H_0(Y)=(Y-1)S_0(Y)-Y^{59}.
\]

For \(m\ge1\), put

\[
r=256m,\qquad
\mathcal C_m=\bigcup_{c\in\mathcal C_0}[mc,m(c+1)-1]. \tag{11}
\]

Then \(|\mathcal C_m|=31m\), \(c_*=59m-1\), and

\[
S_m(X)=(1+\cdots+X^{m-1})S_0(X^m),\qquad H_m(X)=H_0(X^m). \tag{12}
\]

The bound \(\log_2 3<8/5\) gives \(59m-1<L\), so (5) yields

\[
k=31m,\quad T=62m,\quad k/r=31/256,\quad T/r=31/128. \tag{13}
\]

This is a binary positive path satisfying every strict suffix record.
The base support has \(15\) ordinary runs, so every \(H_m\) has energy
\(31\), independent of \(m\). Exact norm computation gives

\[
\begin{split}
R_0={}&|\operatorname{Res}(Y^{256}-2,H_0(Y))|\\
={}&4708365355653563911081866377359552639044012876572741956888992577677170101967645821582276774074740448260858568939770910008307867657574825679517635063,
\end{split} \tag{14}
\]

with

\[
R_0>3^{256},\qquad R_0\equiv1\pmod2,\qquad R_0\equiv2\pmod3. \tag{15}
\]

The substitution \(Y=X^m\) gives exactly

\[
\boxed{|\operatorname{Res}(X^{256m}-2,H_m(X))|=R_0^m.} \tag{16}
\]

Hence the content-reduced resultant is coprime to \(6\) and exceeds
\(3^r>D\) at every scale. The certificate gives the explicit coprime
one-strip scale

\[
m=2^{30},\quad r=2^{38}=274877906944,\quad
N=435671174783,\quad \gcd(N,r)=1, \tag{17}
\]

above the established period barrier.

This scaled construction is only an algebraic path/resultant witness.
It is not asserted that \(j=0\) is the least rational state, and it does
not satisfy or purport to satisfy \(D\mid C\). Its role is to show that
large period does not repair the density-to-content implication.

## 5. Rotations

If \(C_i\) is the carry of the rotation beginning at edge \(i\), then

\[
2^{a_i}C_{i+1}=3C_i+D. \tag{18}
\]

Since \(\gcd(6,D)=1\),

\[
\gcd(C_{i+1},D)=\gcd(C_i,D),\qquad
D\mid C_{i+1}\iff D\mid C_i. \tag{19}
\]

Rotations are unit-equivalent copies of one full-modulus congruence, not
independent conditions. Every rotation of (7) has carry gcd \(1\) with
\(D\).

## Conclusion

The entropy theorem controls the \(B\)-step boundary; endpoint energy and
Sylvester content live in ordinary residue order. Those orders decouple.
The resultant is universally odd, dense transitions force no
\(3\)-content, content-reduced resultants can exceed \(D\), and rotations
repeat the same congruence. Thus transition density plus coefficient energy
plus \(2/3\)-content cannot give a support-independent contradiction.
Any continuation must use genuinely \(D\)-specific information absent from
exact rational cycles.

Exact checks are in
[binary_dense_integrality_no_go_certificate.js](cycles/binary_dense_integrality_no_go_certificate.js).
