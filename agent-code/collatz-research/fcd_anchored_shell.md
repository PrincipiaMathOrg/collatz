# Exact anchoring in the FCD shell injection

**Date:** 17 August 2026

**Mode:** SOLVE

**Status:** exact anchoring converts shell membership into a quotient-one
condition. If that condition is dropped, the remaining cylinder bound is
only the factor complexity of the anchored parity word, and this complexity
can be maximal at arbitrarily large canonical starts. Thus anchoring gives
no new uniform shell capacity by itself. Any further gain must estimate the
quotient-one condition, which is an explicit anchored-carry equation.

## 1. The anchored shell quotient

Let \(w=(\epsilon_0,\ldots,\epsilon_{L-1})\) be a binary word. Write

\[
s_i:=\sum_{j<i}\epsilon_j,
\qquad
C_i:=\sum_{\substack{0\leq j<i\\\epsilon_j=1}}
2^j3^{s_i-s_{j+1}}.
\tag{1}
\]

Its canonical parity-cylinder representative is

\[
\rho=\left[-3^{-s_L}C_L\right]_{2^L},
\qquad 0\leq\rho<2^L.
\tag{2}
\]

Put \(x_i:=T_+^i(\rho)\). Then

\[
2^ix_i=3^{s_i}\rho+C_i.
\tag{3}
\]

For a binary block \(b\) of length \(\ell\), let \(r(b)\) be its canonical
representative in \([0,2^\ell)\). If

\[
b_i:=(\epsilon_i,\ldots,\epsilon_{i+\ell-1}),
\qquad 0\leq i\leq L-\ell,
\]

then \(x_i\equiv r(b_i)\pmod {2^\ell}\). Hence the integer

\[
\boxed{
Q_{i,\ell}(w):=
\frac{x_i-r(b_i)}{2^\ell}
=
\frac{3^{s_i}\rho+C_i-2^ir(b_i)}{2^{i+\ell}}
}
\tag{4}
\]

is nonnegative.

**Theorem 1, exact anchored shell test.** For every \(i\leq L-\ell\),

\[
\boxed{
2^\ell\leq x_i<2^{\ell+1}
\quad\Longleftrightarrow\quad
Q_{i,\ell}(w)=1.
}
\tag{5}
\]

If the path is simple, the number of retained odd states in this shell is at
most the number \(p_w^{(1)}(\ell)\) of distinct length-\(\ell\) factors of
\(w\) which begin with \(1\). In particular,

\[
\boxed{
N_{\ell,\mathrm{ret}}^{\mathrm{odd}}
\leq p_w^{(1)}(\ell)\leq2^{\ell-1}.
}
\tag{6}
\]

For a finite path, restoring the final \(\ell\) positions adds at most
\(\ell\), exactly as in the universal shell injection.

**Proof.** The parity-cylinder lemma gives the congruence preceding (4).
Since \(0\leq r(b_i)<2^\ell\), the unique decomposition

\[
x_i=r(b_i)+2^\ell Q_{i,\ell}(w)
\]

places \(x_i\) in the indicated shell exactly when the quotient is one.
If two retained shell positions have the same block, then (5) gives the same
state \(2^\ell+r(b_i)\). Simplicity makes the positions equal. There are
only \(2^{\ell-1}\) binary blocks of length \(\ell\) beginning with \(1\).
This proves (6). \(\square\)

Equation (4) is the complete effect of the global anchor on a local shell
cylinder. It is stronger than a congruence, but its strength lies entirely
in the equality \(Q_{i,\ell}=1\). If one keeps only the set of local factors,
the next theorem shows that no asymptotic capacity gain remains.

## 2. A maximal-complexity anchored family

Put

\[
\alpha:=\log_2 3.
\]

For \(m\geq1\), choose a linear binary de Bruijn word \(D_m\) of order
\(m\). Thus \(D_m\) has length

\[
N_m:=2^m+m-1
\tag{7}
\]

and contains every binary word of length \(m\) as a factor. Such a word
exists by taking an Euler circuit in the directed graph whose vertices are
the binary words of length \(m-1\) and whose edges are the binary words of
length \(m\), then appending the first \(m-1\) symbols.

Let

\[
A_m:=2N_m,
\qquad
r_m:=|D_m|_1,
\qquad
s_m:=A_m+r_m,
\tag{8}
\]

and define

\[
L_m:=\lceil\alpha s_m\rceil,
\qquad
c_m:=L_m-(A_m+N_m),
\tag{9}
\]

\[
\boxed{
W_m:=1^{A_m}D_m0^{c_m}.
}
\tag{10}
\]

**Theorem 2, maximal local complexity under an exact anchor.** For every
\(m\geq1\), the following statements hold.

1. The integer \(c_m\) is positive, and \(W_m\) is a primitive
   first-crossing word of length \(L_m\) and weight \(s_m\).
2. Its canonical representative

   \[
   \rho_m=\left[-3^{-s_m}C(W_m)\right]_{2^{L_m}}
   \tag{11}
   \]

   satisfies

   \[
   \boxed{\rho_m\geq2^{A_m}-1.}
   \tag{12}
   \]

3. Its length-\(m\) factor complexity is maximal. In particular,

   \[
   \boxed{p_{W_m}^{(1)}(m)=2^{m-1}.}
   \tag{13}
   \]

4. The canonical path from \(\rho_m\) has \(\rho_m\) as a strict minimum
   at every proper positive time \(j<L_m\).

**Proof.** The exact inequality \(\alpha>3/2\) follows from \(3^2>2^3\).
Since \(s_m\geq2N_m\), we have

\[
\alpha s_m>3N_m=A_m+N_m.
\]

Thus \(c_m\geq1\).

During the initial run of ones, the logarithmic coefficient surplus is
positive. After this run, consider a prefix of \(t\leq N_m\) symbols from
\(D_m\), containing \(u_t\) ones. Its surplus is

\[
\alpha(A_m+u_t)-(A_m+t)
\geq A_m(\alpha-1)-N_m
=N_m(2\alpha-3)>0.
\tag{14}
\]

During the final zero run, every proper prefix has length \(j<L_m\) and
weight \(s_m\), so its surplus is

\[
\alpha s_m-j>\alpha s_m-(L_m-1)>0.
\]

At length \(L_m\), the surplus is negative. Therefore \(W_m\) is a
primitive first crossing.

The first \(A_m\) parity bits are all one. Repeated use of the odd branch
gives

\[
T_+^{A_m}(x)=\frac{3^{A_m}(x+1)}{2^{A_m}}-1,
\]

so the cylinder condition is \(x\equiv-1\pmod {2^{A_m}}\). Equation (12)
follows because \(0<\rho_m<2^{L_m}\). Equation (13) follows from the defining
property of \(D_m\).

Finally, at every \(0<j<L_m\), the prefix barrier is strict because no
positive power of \(2\) equals a positive power of \(3\). The affine carry
is positive, since the first bit is one. Equation (3) therefore gives
\(x_j>\rho_m\). \(\square\)

## 3. Consequence for shell compression

The parity-cylinder map is a bijection from length-\(L\) binary words to
residues modulo \(2^L\). Thus every word \(W_m\) in Theorem 2 is fully
anchored: its carry fixes one canonical ordinary integer, and the lower
bound (12) sends these starts to infinity. Nevertheless, its local cylinder
set attains the full odd-shell cardinality in (6).

Consequently there is no function \(g(m)=o(2^m)\) such that

\[
p_w^{(1)}(m)\leq g(m)
\]

for all anchored primitive first-crossing words. Exact anchoring gives no
uniform improvement at the local-factor layer of the shell argument.

This is a moving-seed no-go, not an FCD counterexample. The theorem does not
assert that \(Q_{i,m}(W_m)=1\) for all factors, that the full path is simple,
or that its endpoint is nondescending. Those are separate arithmetic
conditions. In particular, repetitions belong to the cycle branch and are
not used here.

The exact remaining gate is now visible. A stronger anchored shell bound
must control the number of solutions of

\[
\boxed{
3^{s_i}\rho+C_i
=2^i\bigl(2^\ell+r(b_i)\bigr),
}
\tag{15}
\]

uniformly along a primitive first-crossing word. Equation (15) is
equivalent to \(Q_{i,\ell}=1\). It retains the ordinary representative of
the global anchored carry, not merely its residue class or its collection
of local parity cylinders. Establishing a length-independent saving in the
number of solutions of (15) would be new arithmetic input. Neither the
universal shell injection nor exact cylinder anchoring supplies such a
saving on its own.
