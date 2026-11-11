# Minimum-dependent shell compression for FCD

**Updated:** 17 August 2026

**Mode:** SOLVE

**Status:** the minimum-dependent shell injection, intersected with the
universal shell bound, gives a length-independent reciprocal-mass envelope
for each fixed start. The envelope tends to zero as the start tends to
infinity, but it does not give an absolute start bound. The first-crossing
coefficient gap has infimum zero and can be smaller than the mandatory
correction from the initial odd step at every prescribed start scale.

## 1. The strict-failure segment

Let \(T_+\) denote the positive shortcut map

\[
T_+(x):=
\begin{cases}
x/2,&x\equiv0\pmod2,\\
(3x+1)/2,&x\equiv1\pmod2.
\end{cases}
\tag{1}
\]

Suppose that a nonboundary First-Crossing Descent failure has canonical
positive path

\[
x_0=n,\ x_1,\ldots,x_L,
\tag{2}
\]

where the path is simple, \(x_i>n\) for every \(i\geq1\), and
\(x_L>n\). The equality case \(x_L=n\) is separated in Section 5.

The coefficient word has length \(L\), weight \(s\), and

\[
2^j\leq3^{s_j}\quad(0\leq j<L),
\qquad
3^s<2^L.
\tag{3}
\]

Put

\[
\alpha:=\log_2 3,\qquad
\Lambda_s:=\lceil s\alpha\rceil\log2-s\log3.
\tag{4}
\]

The first-crossing condition gives \(L=\lceil s\alpha\rceil\), so
\(0<\Lambda_s<\log2\).

## 2. A finite-path shell injection with a strict minimum

For an integer \(p\geq1\), define the endpoint capacity

\[
E_n(p):=
\#\{y\in\mathbf{Z}:p\leq y<2p,\ y>n\}.
\tag{5}
\]

Equivalently,

\[
E_n(p)=
\max\{0,\,2p-\max(p,n+1)\}.
\tag{6}
\]

For \(\ell\geq1\), put

\[
H_\ell(n):=
\min\left\{
2^{\ell-1},\
\ell+\sum_{o=1}^{\ell}
\min\left\{\binom{\ell-1}{o-1},E_n(3^o)\right\}
\right\}.
\tag{7}
\]

The first term is the number of odd integers in the shell
\([2^\ell,2^{\ell+1})\). The second term is the
minimum-dependent equal-time capacity, together with the finite-path
endpoint loss.

**Theorem 1, minimum-dependent finite-path shell injection.** Let
\(N_\ell^{\mathrm{odd}}\) be the number of odd states of (2) in
\([2^\ell,2^{\ell+1})\). Then

\[
\boxed{N_\ell^{\mathrm{odd}}\leq H_\ell(n).}
\tag{8}
\]

**Proof.** Temporarily discard the final \(\ell\) positions of the path.
Write every retained odd shell state uniquely as

\[
x_i=2^\ell+u_i,\qquad0\leq u_i<2^\ell.
\]

Its first \(\ell\) parity bits begin with \(1\). If their weight is \(o\),
there are at most \(\binom{\ell-1}{o-1}\) possible parity cylinders.

Extend \(T_+\) to \(\mathbf{Z}\). Every negative integer remains negative.
The integers \(u_i\) and \(u_i-2^\ell\) have the same first \(\ell\)
parities, so equal-time translation gives

\[
T_+^\ell(u_i)-T_+^\ell(u_i-2^\ell)=3^o.
\]

Put \(z_i:=T_+^\ell(u_i)\). Since \(u_i\geq0\), we have \(z_i\geq0\).
Since \(u_i-2^\ell<0\), we have \(z_i<3^o\). A second use of equal-time
translation gives

\[
x_{i+\ell}=z_i+3^o\in[3^o,2\cdot3^o).
\tag{9}
\]

The future position is noninitial, so strict minimality gives
\(x_{i+\ell}>n\). Thus there are at most \(E_n(3^o)\) possible values of
\(z_i\). At fixed \(o\), two retained shell states with the same \(z_i\)
would have the same future state in (9), contrary to simplicity. Therefore
the retained count of weight \(o\) is at most

\[
\min\left\{\binom{\ell-1}{o-1},E_n(3^o)\right\}.
\]

Summing over \(o\), restoring at most \(\ell\) discarded positions, and
intersecting with the shell cardinality proves (8). \(\square\)

## 3. The fixed-start reciprocal envelope

Let

\[
\ell_0:=\lfloor\log_2n\rfloor.
\]

We consider \(n\geq3\), so \(\ell_0\geq1\). Let \(B_\ell\) be the
universal shell quantity

\[
B_\ell:=
\min_{0\leq t\leq\ell}
\left(
\sum_{o=t+1}^{\ell}\binom{\ell}{o}
+\sum_{o=0}^{t}3^o
\right).
\]

The universal finite-path shell theorem gives at most
\(B_\ell+\ell\) states in shell \(\ell\). Intersecting it with Theorem 1,
define

\[
\boxed{
\mathfrak M(n):=
\sum_{\ell=\ell_0}^{\infty}
\frac{\min\{H_\ell(n),B_\ell+\ell\}}
{3\max(n,2^\ell)}.
}
\tag{10}
\]

This is a length-independent function of the strict minimum alone.

**Theorem 2, fixed-start reciprocal compression.** Every path in Theorem 1
satisfies

\[
\boxed{
\sum_{\substack{0\leq i<L\\x_i\ {\rm odd}}}\frac1{3x_i}
\leq\mathfrak M(n).
}
\tag{11}
\]

Moreover, \(\mathfrak M(n)>0\) for every \(n\geq3\), and

\[
\boxed{\mathfrak M(n)\longrightarrow0\qquad(n\to\infty).}
\tag{12}
\]

**Proof.** There are no path states below shell \(\ell_0\). In shell
\(\ell\), every state is at least \(\max(n,2^\ell)\). Theorem 1 and the
universal shell theorem give

\[
N_\ell^{\mathrm{odd}}
\leq\min\{H_\ell(n),B_\ell+\ell\}.
\tag{13}
\]

Equation (10) therefore gives (11).

The term with \(\ell=\ell_0\) is positive, since
\(H_{\ell_0}(n)\geq1\) and \(B_{\ell_0}+\ell_0\geq1\). Thus
\(\mathfrak M(n)>0\). The series

\[
\sum_{\ell\geq0}
\frac{\min\{2^\ell,B_\ell+\ell\}}{3\cdot2^\ell}
\]

converges by the same Chernoff tail used in the universal reciprocal-mass
theorem. Equation (12) follows by taking its tail from \(\ell_0\).
\(\square\)

There is an explicit coarse form. The certified Chernoff estimate

\[
B_\ell<\frac52\,2^{97\ell/100}
\]

gives, for \(\ell_0\geq1001\),

\[
\boxed{
\mathfrak M(n)
<
\frac56\frac{2^{-3\ell_0/100}}{1-2^{-3/100}}
+\frac{2(\ell_0+1)}{3\cdot2^{\ell_0}}.
}
\tag{14}
\]

Thus the shell method gives genuine decay in the start. The point of the
next section is that the coefficient deficit has no positive
length-independent lower bound with which to compare this decay.

## 4. Exact product formula and the scalar no-go

Multiplying the shortcut steps in (2) gives

\[
\frac{x_L}{n}
=e^{-\Lambda_s}
\prod_{\substack{0\leq i<L\\x_i\ {\rm odd}}}
\left(1+\frac1{3x_i}\right).
\tag{15}
\]

Since a strict FCD failure has \(x_L>n\), equations (11) and (15) imply

\[
\boxed{
0<\Lambda_s
<
\sum_{\substack{0\leq i<L\\x_i\ {\rm odd}}}
\log\left(1+\frac1{3x_i}\right)
<
\mathfrak M(n).
}
\tag{16}
\]

This is the strongest direct shell/product compression. It is
length-independent after \(n\) is fixed, but it does not bound \(n\)
uniformly.

**Proposition 3, parametric scalar no-go.** For every odd \(n\geq3\) and
every \(S\geq1\), there exists \(s>S\) such that, with
\(L=\lceil s\alpha\rceil\),

\[
\boxed{
0<\Lambda_s
<\log\left(1+\frac1{3n}\right)
<\frac1{3n}
\leq\mathfrak M(n).
}
\tag{17}
\]

The coefficient pair \((L,s)\) is realized by the genuine first-crossing
word

\[
1^s0^{L-s}.
\tag{18}
\]

**Proof.** Since \(\alpha\) is irrational, the fractional parts
\(\{s\alpha\}\) are dense in \([0,1]\). Hence

\[
\lceil s\alpha\rceil-s\alpha
\]

is positive and arbitrarily small for arbitrarily large \(s\). This proves
the first two inequalities in (17). The logarithmic inequality is standard.
Finally, \(H_{\ell_0}(n)\geq1\), so the first term of (10) is at least
\(1/(3n)\).

It remains to check (18). During its initial \(s\) letters, its coefficient
is \((3/2)^j>1\). After the last \(1\), the inequality
\(2^j\leq3^s\) holds through \(j=L-1\), while \(2^L>3^s\).
Thus (18) is a coefficient first crossing. \(\square\)

Proposition 3 is not an FCD counterexample. It does not assert that the
prescribed integer \(n\) is the canonical parity-cylinder representative of
(18). It proves a method-level statement: minimum-dependent shell counting,
the exact product formula, the strict-minimum condition, and the
first-crossing coefficient geometry are scalarly compatible at arbitrarily
large start scales. Any absolute start bound must use the coupling between
the anchored carry and the canonical residue. That coupling is exactly what
the shell/product comparison omits.

If one also inserts the available lower bound

\[
\Lambda_s>e^{-6.125581}s^{-13.3},
\]

then (14) gives only a polynomial upper bound for \(n\) in terms of \(s\).
It does not remove the unbounded length parameter. This is weaker than the
existing direct carry reduction \(n<305s^{14.3}\).

## 5. Equality and cycles

If \(x_L=n\), then (15) gives equality between the coefficient deficit and
the logarithmic correction. The terminal state repeats the initial state,
so the path in (2) is no longer simple when both endpoints are included.
This is the positive-cycle boundary, not a strict FCD failure.

The cyclic shell injection has no terminal \(\ell\)-position loss and should
be used on that branch. Nothing in Theorems 1 and 2 excludes denominator-one
equality, and Proposition 3 makes no claim about it. Thus the strict
non-descent branch and the cycle/equality branch remain logically separate.

## 6. Conclusion

The minimum-dependent shell injection does improve the universal constant:
for a fixed strict minimum \(n\), it gives the explicit envelope
\(\mathfrak M(n)\to0\). Nevertheless, first-crossing gaps
\(\Lambda_s\) approach zero along unbounded weights. The initial odd step
alone contributes more than \(\Lambda_s\) for a suitable weight at every
prescribed start scale.

Therefore this route does not reduce all-depth FCD to a finite scan. Its
sharp output is the conditional inequality \(\Lambda_s<\mathfrak M(n)\).
The remaining input is arithmetic, not analytic: one must correlate the
small coefficient gap with the anchored carry that chooses the canonical
seed.
