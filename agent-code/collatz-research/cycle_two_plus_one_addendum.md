# A closed \(2+1\) three-shift subcase

**Mode:** SOLVE.  This is a bounded continuation of the exactly-three
analysis.  The consecutive run-\(3\) theorem is left unchanged.

**Status:** The \(2+1\) run type is excluded when the adjacent pair has
internal Christoffel gap one and the isolated run-start residue lies below
the pair's run-start residue.  The complementary residue order and every
internal-gap-two pair remain open.

Throughout, retain the lower two-level hypotheses of the preceding reports:
the candidate is nontrivial, least-state, strict-record, and denominator
one, its deformation levels lie in \(\{0,1\}\), exactly three levels equal
one, and \(\gcd(N,r)=1\).

## 1. Exact two-run gate

Let \(c\) be the run-start residue of the adjacent pair and \(e\) the
run-start residue of the isolated shift.  Both lie in \([1,B-1]\).  Grouping
the two adjacent inverse monomials gives

\[
(z-1)\left(Az^{-c}+3z^{-e}\right)=3z\pmod D,          \tag{1.1}
\]

where

\[
A=
\begin{cases}
5,&\text{the pair's internal Christoffel gap is }1,\\
7,&\text{the pair's internal Christoffel gap is }2.
\end{cases}                                           \tag{1.2}
\]

For gap one, \(1\le c<L=2r-N\).  For gap two,
\(L\le c<B=N-r\).

## 2. Exclusion when the internal gap is one and \(e<c\)

Assume

\[
A=5,\qquad 1\le e<c<L,
\qquad \delta:=c-e.
\]

Multiplying (1.1) by \(z^c\) gives

\[
P(z)=0\pmod D,
\qquad
P(X):=5(X-1)+3(X-1)X^\delta-3X^{c+1}.                \tag{2.1}
\]

Recall the specific-root identity

\[
3z^L=4\pmod D.                                       \tag{2.2}
\]

First suppose \(c+1<L\), and put

\[
R:=\operatorname{Res}(3X^L-4,P).
\]

The binomial \(3X^L-4\) is irreducible, while
\(\deg P=c+1<L\), so \(R\ne0\).  Moreover,

\[
D\mid R.                                              \tag{2.3}
\]

Modulo \(3\), the polynomial \(P\) has degree one:

\[
P(X)\equiv2(X-1)\pmod3.
\]

The Sylvester matrix has size \(L+c+1\) and rank \(L+1\) modulo \(3\).
Consequently

\[
3^c\mid R.
\]

Since \(3\nmid D\), the nonzero integer

\[
S:=R/3^c
\]

still satisfies \(D\mid S\).

Let \(\rho=(4/3)^{1/L}\).  Parseval on the roots
\(\rho\zeta\) of \(3X^L-4\), followed by the
arithmetic-geometric mean inequality, gives

\[
|S|
\le
3\left(
25(1+\rho^2)
+9(\rho^{2\delta}+\rho^{2\delta+2}+\rho^{2c+2})
\right)^{L/2}.                                       \tag{2.4}
\]

The period barrier gives \(\rho^2<64/63\).  All three exponents in the
second group are at most \(2L\), so

\[
0<|S|<3\cdot99^{L/2}.                                \tag{2.5}
\]

At the endpoint \(c=L-1\), replace \(-3z^L\) in (2.1) by \(-4\), and put

\[
Q(X):=5(X-1)+3(X-1)X^\delta-4,
\qquad
R_{\rm end}:=\operatorname{Res}(3X^L-4,Q).
\]

Here \(\deg Q=\delta+1<L\) and \(Q(X)\equiv2X\pmod3\).  Thus
\(R_{\rm end}\ne0\), \(D\mid R_{\rm end}\), and the Sylvester nullity
modulo \(3\) is \(\delta\).  Consequently the nonzero integer

\[
S_{\rm end}:=R_{\rm end}/3^\delta
\]

is still divisible by \(D\).  Its weighted coefficient-square bound is
below \(139\), so the same norm argument gives

\[
0<|S_{\rm end}|<3\cdot139^{L/2}.                     \tag{2.6}
\]

Since \(L<5r/12\), the exact comparisons

\[
99^5 3^{24}<8^{24},
\qquad
139^5 5^{24}<14^{24}
\]

put (2.5) and (2.6) below \(3(14/5)^r\).  The established
logarithmic-form bound and \(r>3^{16}\) give

\[
3\left(\frac{14}{5}\right)^r<D.
\]

This contradicts \(D\mid S\).  We have proved

\[
\boxed{
\begin{gathered}
\text{No coprime denominator-one two-level candidate has run type }2+1\\
\text{with pair gap }1\text{ and isolated residue }e<c.
\end{gathered}
}                                                       \tag{2.7}
\]

The equality \(e=c\) cannot occur because multiplication by \(N\) permutes
the nonzero residues modulo \(r\).

## 3. Sharp residual forms

If the pair gap is one but \(e>c\), multiplication of (1.1) by \(z^e\)
gives

\[
5(z-1)z^{e-c}+3(z-1)-3z^{e+1}=0\pmod D.              \tag{3.1}
\]

Modulo \(3\), its surviving degree is \(e-c+1\), rather than one.  The
Sylvester-content argument therefore leaves an exponential factor
\(3^{e-c+1}\).  The norm proof in Section 2 does not close this order.

If the pair gap is two, write \(c'=c-L\), so \(0\le c'<M\).  Using
\(3z^L=4\), equation (1.1) becomes

\[
(z-1)\left(7z^{-c'}+4z^{-e}\right)=4z\pmod D.         \tag{3.2}
\]

This is the exact gap-two residual.  Its coefficients do not yield the
degree-one modulo-\(3\) drop used in Section 2.

Thus the remaining \(2+1\) target is precisely the union of (3.1) and
(3.2).

## 4. Finite audit and proper-factor obstruction

The certificate
[cycles/two_plus_one_probe.js](cycles/two_plus_one_probe.js) checks every
admissible \(2+1\) deformation through \(r=30\).  Among \(1234\) patterns,
it finds

\[
\begin{array}{c|r}
\text{subcase}&\text{count}\\
\hline
\text{pair gap }1,\ e<c&283\\
\text{pair gap }1,\ e>c&543\\
\text{pair gap }2&408.
\end{array}
\]

No finite carry is divisible by \(D\).

A smallest-period residual proper-factor example is

\[
a=(1,2,1,2,1,2,2,1,1,3,2),
\qquad
T=\{5,8,9\}.
\]

It has pair gap one, pair residue \(c=1\), isolated residue \(e=2\), and

\[
D=84997,\qquad C=487399,\qquad \gcd(D,C)=11.
\]

Its reduced denominator is \(7727\), and its numerator states are

\[
(44309,70327,54677,85879,66341,103375,
79463,61529,96157,148099,56503).
\]

All valuations are exact and the first state is least.  This confirms that
the residual congruence can vanish modulo a proper factor, so full-modulus
control remains necessary.

## Conclusion

One definite \(2+1\) sector is removed by the same
specific-root/content mechanism that closed the hard adjacent two-shift
case.  The proof works exactly when the pair term can be placed at degrees
zero and one before taking the \(3X^L-4\) norm.  Reversing the residue order
leaves the explicit exponential factor in (3.1), while a gap-two pair gives
the distinct ladder-normal form (3.2).
