# Near factor collisions and the suffix obstruction

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** A Hamming distance of two, three, or four between two local
valuation factors does not produce an exactly two-, three-, or four-term
congruence modulo the full determinant. There are two independent
obstructions. A mismatch changes every later prefix exponent until its
debt is repaid, so even distance two can give a local carry difference
with arbitrarily long support. More decisively, the local carry
difference is not divisible by the determinant. Its residue is cancelled
by a nonzero complementary suffix term.

Consequently, the frozen exact-three and exact-four resultant exclusions
do not apply to near collisions of cyclic factors. This is a structural
no-go, not a missing estimate.

## 1. Local carries and concatenation

For a word of positive valuations

\[
w=(c_0,\ldots,c_{\ell-1}),
\qquad
A_i(w):=\sum_{j<i}c_j,
\qquad
A(w):=A_\ell(w),
\]

put

\[
\Phi(w):=
\sum_{i=0}^{\ell-1}3^{\ell-1-i}2^{A_i(w)}.
\tag{1}
\]

Iteration of \(2^{c_i}y_{i+1}=3y_i+1\) gives

\[
2^{A(w)}y_\ell=3^\ell y_0+\Phi(w).
\tag{2}
\]

If \(u\) and \(v\) have lengths \(L\) and \(M\), respectively, then

\[
\boxed{
\Phi(uv)=3^M\Phi(u)+2^{A(u)}\Phi(v).}
\tag{3}
\]

Now let \(a\) be a denominator-one cyclic valuation word of length \(r\),
total valuation \(N\), and determinant

\[
D:=2^N-3^r.
\]

At a cyclic start \(s\), write the full rotation as

\[
a^{(s)}=u_s v_s,
\qquad |u_s|=L,
\qquad |v_s|=M:=r-L.
\]

Since a full turn returns to the state \(x_s\), equations (2) and (3)
give the exact identity

\[
D x_s
=3^M\Phi(u_s)+2^{A(u_s)}\Phi(v_s).
\tag{4}
\]

Subtracting the identities for starts \(s\) and \(t\), we obtain

\[
\boxed{
\begin{aligned}
D(x_s-x_t)
={}&3^M\bigl(\Phi(u_s)-\Phi(u_t)\bigr)\\
&+2^{A(u_s)}\Phi(v_s)-2^{A(u_t)}\Phi(v_t).
\end{aligned}}
\tag{5}
\]

Thus the local difference is only one summand of a full-determinant
relation.

## 2. Hamming support is not carry support

Let \(u,v\in\{1,2\}^L\), and put

\[
\delta_i:=A_i(u)-A_i(v).
\]

Directly from (1),

\[
\Phi(u)-\Phi(v)
=\sum_{i=0}^{L-1}3^{L-1-i}
 \bigl(2^{A_i(u)}-2^{A_i(v)}\bigr).
\tag{6}
\]

The summand at \(i\) vanishes exactly when the prefix debt \(\delta_i\)
vanishes. A letter mismatch changes \(\delta_i\) at the next prefix, and
that change persists until a later mismatch repays it.

For example, choose \(0\leq p<q<L\), let

\[
(u_p,v_p)=(2,1),
\qquad
(u_q,v_q)=(1,2),
\]

and take \(u_i=v_i\) elsewhere. The two words have Hamming distance two
and the same total valuation, but

\[
\delta_i=
\begin{cases}
1,&p<i\leq q,\\
0,&\text{otherwise}.
\end{cases}
\]

Consequently,

\[
\boxed{
\Phi(u)-\Phi(v)
=\sum_{i=p+1}^{q}3^{L-1-i}2^{A_i(v)}.}
\tag{7}
\]

The natural carry expansion has \(q-p\) nonzero terms. Taking \(p=0\)
and \(q=L-1\) makes this number \(L-1\).

The same defect occurs at distances three and four. With three
mismatches of signs \(+,+,-\), the prefix debt remains nonzero after the
last mismatch. With four mismatches of signs \(+,+,-,-\), placed near
the two endpoints, it is nonzero through \(L-1\) prefix positions. Thus
none of the distances two, three, and four controls the support of (6) by
an absolute constant.

This is already incompatible with an identification of local Hamming
support with a lower-shift set \(T\).

## 3. The local difference is not a determinant congruence

Two elementary facts make the obstruction particularly sharp.

First, \(\Phi\) decodes every letter except the final one. Indeed,

\[
\Phi(c_0,\ldots,c_{L-1})
=3^{L-1}+2^{c_0}\Phi(c_1,\ldots,c_{L-1}),
\tag{8}
\]

and the carry of every nonempty positive word is odd. Hence, when
\(L\geq2\),

\[
c_0=\operatorname{ord}_2\bigl(\Phi(w)-3^{L-1}\bigr),
\]

after which (8) recovers the tail recursively down to
\(c_{L-2}\). The final valuation \(c_{L-1}\) does not occur in
\(\Phi(w)\). Equivalently,

\[
\Phi(u)=\Phi(v)
\quad\Longleftrightarrow\quad
u_i=v_i\quad(0\leq i<L-1).
\tag{9}
\]

Second, for a binary word,

\[
0<\Phi(w)
\leq\sum_{i=0}^{L-1}3^{L-1-i}4^i
=4^L-3^L<4^L.
\tag{10}
\]

It follows that binary factors at Hamming distance at least two satisfy

\[
0<|\Phi(u)-\Phi(v)|<4^L.
\tag{11}
\]

In particular, whenever \(4^L<D\),

\[
\boxed{
\Phi(u)-\Phi(v)\not\equiv0\pmod D.}
\tag{12}
\]

Thus, in any short-factor range satisfying the exact size condition
\(4^L<D\), equation (12) rules out a standalone local
full-determinant congruence before any resultant estimate is attempted.

There is also an exact state-space form of the same boundary defect. If
the two factors have the same total valuation \(A\), then (2) gives

\[
\Phi(u_s)-\Phi(u_t)
=2^A(x_{s+L}-x_{t+L})-3^L(x_s-x_t).
\tag{13}
\]

The right side contains both boundary differences. Neither one is
removed by knowing that the local words are close.

If the local exponent totals are different, aligning the endpoint
coefficients does not restore determinant divisibility. Put
\(A=A(u_s)\), \(B=A(u_t)\), and

\[
R(u_s,u_t):=
2^B\Phi(u_s)-2^A\Phi(u_t).
\]

The two local affine identities give

\[
\begin{aligned}
2^{A+B}(x_{s+L}-x_{t+L})
={}&3^L(2^Bx_s-2^Ax_t)+R(u_s,u_t).
\end{aligned}
\tag{13a}
\]

Writing the full rotation carry as
\(\mathcal C_j=Dx_j\) and multiplying (13a) by \(D\), we obtain

\[
\begin{aligned}
2^{A+B}(\mathcal C_{s+L}-\mathcal C_{t+L})
={}&3^L(2^B\mathcal C_s-2^A\mathcal C_t)\\
&+D R(u_s,u_t).
\end{aligned}
\tag{13b}
\]

Every full carry on the left and in the first term on the right already
contains the one known factor \(D\). Cancelling it recovers (13a).
Therefore (13b) does not imply \(D\mid R(u_s,u_t)\). Such a conclusion
would require a new factor \(D^2\), or an independent equality among the
four state quotients. Hamming closeness supplies neither.

In fact there is an exact short-factor exclusion. Since every carry is
odd, \(R(u,v)=0\) would first force \(A(u)=A(v)\). Equation (9) would
then give equality of the first \(L-1\) letters, and equality of the
totals would give equality of the final letters. Thus

\[
u\ne v\quad\Longrightarrow\quad R(u,v)\ne0.
\]

For binary words, equations (10) and \(A(u),A(v)\leq2L\) give

\[
\boxed{
0<|R(u,v)|<16^L.}
\tag{13c}
\]

Consequently,

\[
16^L<D
\quad\Longrightarrow\quad
D\nmid R(u,v).
\tag{13d}
\]

This conclusion applies to the naturally aligned local integer, not only
to the unaligned difference in (12).

## 4. The suffix term cannot be discarded

Suppose that \(u_s\) and \(u_t\) are nonterminal length-\(L\) factors of
the one-drop actual word. Then each complement \(v_s,v_t\) contains the
unique terminal valuation \(U+2\). Its relative position in \(v_s\) is

\[
k_s\equiv r-1-(s+L)\pmod r,
\qquad 0\leq k_s<M.
\]

If \(k_s=k_t\), then \(s=t\pmod r\). Therefore distinct starts have

\[
v_s\ne v_t.
\tag{14}
\]

For two distinct nonterminal starts one necessarily has \(M\geq2\).

Since every carry \(\Phi(v)\) is odd,

\[
\operatorname{ord}_2\bigl(2^{A(u)}\Phi(v)\bigr)=A(u).
\]

If the two weighted suffix terms in (5) were equal, their 2-adic
valuations would first give \(A(u_s)=A(u_t)\). Cancelling that power of
two and using (9) would then show that the first \(M-1\) letters of
\(v_s\) and \(v_t\) agree. This is impossible: their terminal positions
are different, so at least one of those two positions lies among the
first \(M-1\) letters. Hence

\[
\boxed{
2^{A(u_s)}\Phi(v_s)
\ne2^{A(u_t)}\Phi(v_t)}
\tag{15}
\]

for distinct nonterminal starts.

The aligned version is especially transparent. Multiplying (4) at
\(s\) by \(2^{A(u_t)}\), multiplying it at \(t\) by
\(2^{A(u_s)}\), and subtracting gives

\[
\boxed{
\begin{aligned}
D\bigl(2^{A(u_t)}x_s-2^{A(u_s)}x_t\bigr)
={}&3^M R(u_s,u_t)\\
&+2^{A(u_s)+A(u_t)}
  \bigl(\Phi(v_s)-\Phi(v_t)\bigr).
\end{aligned}}
\tag{16}
\]

Equation (9) and the distinct terminal positions show directly that
\(\Phi(v_s)\ne\Phi(v_t)\). Thus the aligned suffix difference in (16)
is also a nonzero integer.

For completeness, reducing the unaligned identity (5) modulo \(D\)
gives

\[
3^M\bigl(\Phi(u_s)-\Phi(u_t)\bigr)
\equiv
-\bigl(2^{A(u_s)}\Phi(v_s)-2^{A(u_t)}\Phi(v_t)\bigr)
\pmod D.
\tag{17}
\]

If the local Hamming distance is at least two and \(4^L<D\), then \(3\)
is a unit modulo \(D\), and equations (11) and (12) show that both
residues in (17) are nonzero. The suffix is not an error term. It is
exactly what cancels the nonzero local residue.

Likewise, if \(16^L<D\), equation (13d) and (16) show that the two
terms on the right of (16) are nonzero opposite residues modulo \(D\).
This is the exact suffix obstruction for the natural aligned carry.

## 5. Why the frozen resultants do not transfer

The exact-three and exact-four deformation reports begin with a global,
one-sign lower Christoffel deformation set \(T\). That global hypothesis
produces the subset gate

\[
(z-1)\sum_{j\in T}z^{-c_j}=z\pmod D
\tag{18}
\]

and hence a specific integer polynomial \(H_T(z)\equiv0\pmod D\). The
resultant exclusions use the exact run geometry and coefficients of that
polynomial. The frozen three- and four-shift theorems therefore apply to
the globally anchored, one-sign run sectors covered by those reports,
not to arbitrary signed sparse polynomials. This distinction remains
even when every run type at a given global support size has been closed.

A near collision of two local factors has none of these inputs:

1. its Hamming support is not the prefix support in (6);
2. it compares two rotations, rather than one globally anchored
   deformation against its Christoffel baseline;
3. the signs are mixed;
4. the complementary rotations differ and contribute the nonzero term
   in (17);
5. moving the cyclic start also moves the unique terminal valuation.

Thus no polynomial of the form (18) follows from a local Hamming distance
of three or four. Even an exceptional cancellation of complementary
binary factors would not repair the first three defects.

The \(L\) cyclic factors which contain the terminal are already separated
and charged independently in the actual-factor capacity theorem. For
them the binary bound (10) is unavailable, and the high valuation \(U+2\)
places their carry differences outside the two-level lower-shift
hypotheses. They therefore do not provide a terminal exception to the
resultant transfer.

## Conclusion

Near collisions remain useful for metric endpoint separation, but they do
not create sparse full-determinant carry congruences. Small local Hamming
distance neither controls the support of the local carry difference nor
removes the complementary suffix. The exact-three and exact-four
resultant machinery cannot be applied to these factor pairs without a new
global identity that first eliminates the suffix.

The companion certificate
[cycles/one_drop_near_factor_suffix_certificate.js](cycles/one_drop_near_factor_suffix_certificate.js)
checks the carry decoder, the binary size bound, the concatenation and
prefix-debt identities, the aligned \(16^L\) bound, the distance-two, distance-three, and
distance-four long-support families, and the noncancellation of weighted
suffixes for exhaustive small unique-terminal words.
