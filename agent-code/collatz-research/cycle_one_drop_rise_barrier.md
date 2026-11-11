# A \(267{,}884\)-rise barrier for one-drop cycles

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** Conditional only on the audited period barrier and transition
inequality already recorded in the master proof skeleton. The result does not
exclude the one-drop sector, but it removes every bounded-rise profile at the
actual cycle scale.

## 1. Statement

We retain the one-drop notation. Thus \(r\) is the number of odd states and
\(U\) is the number of unit rises before the terminal drop. The height path has

\[
T=U+1
\tag{1}
\]

transitions. We use the established inequalities

\[
r\geq r_0:=72{,}057{,}431{,}991
\tag{2}
\]

and

\[
2^{r-2T-1}
<2^{T(T-1)}(612r^{15})^{2T+2}.
\tag{3}
\]

**Theorem.** Every nontrivial denominator-one one-drop cycle satisfying the
strict-record hypotheses obeys

\[
\boxed{U\geq267{,}884.}
\tag{4}
\]

In other words, no candidate at the known period scale can have at most
\(267{,}883\) rises.

## 2. The base comparison

Substituting \(T=U+1\) into (3) gives

\[
2^{r-2U-3}
<2^{U(U+1)}(612r^{15})^{2U+4}.
\tag{5}
\]

We use the exact rational logarithmic bounds

\[
612^{50}<2^{463},
\qquad
r_0^{10}<2^{361}.
\tag{6}
\]

Consequently,

\[
\log_2(612r_0^{15})
<\frac{463}{50}+15\frac{361}{10}
=\frac{13769}{25}.
\tag{7}
\]

Put \(U_0:=267{,}883\). Exact integer arithmetic gives

\[
\begin{split}
25(r_0-2U_0-3)
&-25U_0(U_0+1)\\
&-(2U_0+4)13769
=6{,}149{,}120>0.
\end{split}
\tag{8}
\]

It follows from (7) and (8) that (5) is false at \(r=r_0\) and
\(U=U_0\). The logarithmic gap in (5) decreases as \(U\) increases.
Therefore, (5) is also false at \(r=r_0\) for every \(U\leq U_0\).

## 3. Propagation in the period

For a fixed \(U\leq U_0\), let

\[
R_U(r):=
\frac{2^{U(U+1)}(612r^{15})^{2U+4}}
     {2^{r-2U-3}}.
\tag{9}
\]

The necessary inequality (5) is \(R_U(r)>1\). We have already proved that
\(R_U(r_0)<1\). Moreover,

\[
\frac{R_U(r+1)}{R_U(r)}
=\frac12\left(1+\frac1r\right)^{15(2U+4)}.
\tag{10}
\]

Put \(k:=15(2U+4)\). Since

\[
k\leq8{,}036{,}550<\frac{r_0}{2},
\tag{11}
\]

the binomial theorem gives, for \(r\geq r_0\),

\[
\left(1+\frac1r\right)^k
\leq\sum_{j=0}^{k}\left(\frac{k}{r}\right)^j
<\frac1{1-k/r}<2.
\tag{12}
\]

Hence \(R_U(r+1)<R_U(r)\). Thus \(R_U(r)<1\) for every
\(r\geq r_0\), contradicting (5). This proves (4).

## 4. Scope

The theorem is an all-depth exclusion of a large initial rise range, not a
uniform exclusion of the one-drop family. The number \(U\) remains unbounded.
The exact denominator-one return gate is therefore unchanged, but every
hypothetical survivor must now carry at least \(267{,}884\) successive height
levels before its terminal discharge.

The certificate
[cycles/one_drop_rise_barrier_certificate.js](cycles/one_drop_rise_barrier_certificate.js)
checks every integer comparison in (6), (8), and (11).
