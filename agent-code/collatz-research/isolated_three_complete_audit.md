# Independent audit of the complete three-isolated cover

**Mode:** SOLVE.  This note independently audits the exact interval theorem
in `cycle_isolated_three_complete.md` and its BigInt certificate.

**Verdict:** The continuous cover and the resultant estimate are sound.  No
period is sampled, no folded content is divided out, and the certificate
covers the entire normalized gap domain.  Conditional on the upstream
two-level gate and period barrier, the three-isolated sector is closed.

## 1. Domain coverage

Write

\[
y_0=\frac{c_1}{M},\qquad
y_1=\frac{c_2-c_1}{M},\qquad
y_2=\frac{c_3-c_2}{M},\qquad
\ell=\frac LM.
\]

The fourth gap is positive and

\[
y_0+y_1+y_2<\frac BM=\ell+1.
\]

Since \(M/r<171/1000\) and \(r=2L+M\),

\[
\ell>\frac{829}{342}.
\]

Since \(M/r>1/6\), one has \(\ell<5/2\).  Thus the initial certificate box

\[
\left[\frac{829}{342},\frac52\right]
\times\left[0,\frac72\right]^3
\]

contains every admissible point.  The feasibility discard is one-sided: a
box is removed only if its lower gap sum exceeds its upper value of
\(\ell+1\).  Hence no admissible point is discarded.

## 2. Anchored polynomial and interval enclosure

For an anchor word \(a_1a_2a_3\), put

\[
t_i=q_{a_i}-c_i,qquad
h=-\min(0,t_1,t_2,t_3).
\]

After division by

\[
g=\gcd(12,\kappa_{a_1},\kappa_{a_2},\kappa_{a_3}),
\]

the polynomial is integral and still vanishes modulo \(D\), because every
prime divisor of \(g\) is 2 or 3 and \(\gcd(D,6)=1\).  This is the only
content division in the argument.

The interval operations for the minimum and maximum are outward.  If
\(T_i\) encloses \(t_i/M\), then

\[
\left[
\min(0,T_{1,-},T_{2,-},T_{3,-}),
\min(0,T_{1,+},T_{2,+},T_{3,+})
\right]
\]

contains the true minimum, and the analogous maximum interval contains the
true maximum.  Subtracting these intervals therefore gives an upper bound
for the nominal support span.  Replacing \(1/M\) by \(10^{-10}\) is also
outward, since \(M>r/6>10^{10}\) above the period barrier.

## 3. Quotient branches and aliases

Every accepted anchor box has nominal degree below \(2M\).  The only possible
quotients are consequently \(Q=0,1\), and the certificate retains both when
a box crosses the boundary at degree \(M\).

For \(Q=1\), a labeled term below \(M\) is multiplied by 8 and a term above
\(M\) by 9.  A term whose interval straddles the boundary is assigned 9.
This is an upper bound, since \(9>8\).  For each pair of equal signs, the
certificate adds the cross term whenever the exact interval for its exponent
difference contains an integer.  This is precisely the possible-alias
condition modulo \(M\).  Incompatible pairwise aliases may be counted
simultaneously, which only enlarges the bound.

Opposite-sign cross terms are omitted.  This is valid because at each folded
residue

\[
(A^+-A^-)^2\le (A^+)^2+(A^-)^2.
\]

It follows that the integer \(U\) computed by the certificate satisfies

\[
\sum_v w_v^2\le U
\]

throughout the whole certified box.

## 4. Resultant factor and top cancellation

Let the nominal degree be \(QM+d\), with \(0\le d<M\), and let

\[
W=8^Q P\pmod{8X^M-9}.
\]

If the actual degree is \(n\le QM+d\), then at the roots of the binomial

\[
|\operatorname{Res}(8X^M-9,P)|
=8^{n-QM}\prod|W(\alpha)|.
\]

When \(n\ge QM\), the leading factor is at most \(8^d\).  When top
cancellation gives \(n<QM\), it is smaller than 1, and is again at most
\(8^d\).  Thus nominal top cancellation cannot invalidate the bound.
Parseval gives

\[
|\operatorname{Res}(8X^M-9,P)|
<8^d\left(\frac{81}{64}U\right)^{M/2}.
\]

No gcd or content of \(W\) is removed.  In particular, there is no hidden
division by a factor 2 belonging to the leading coefficient 8.

## 5. Nonvanishing

The binomial \(8X^M-9\) is irreducible.  The valuations of \(9/8\) at 2
and 3 are \(-3\) and 2, so \(9/8\) is not a proper \(p\)-th power for any
prime \(p\mid M\).  The exceptional fourth-power clause in the rational
binomial criterion is impossible because \(9/8>0\).

For \(Q=0\), nonvanishing follows from \(\deg P<M\) and
\(P(1)=-12/g\ne0\).  For \(Q=1\), write

\[
P=P_0+X^MP_1,qquad W=8P_0+9P_1.
\]

If \(W=0\), evaluation at 1 gives

\[
P_1(1)=8\frac{12}{g}.
\]

A derivative pair contributes to \(P_1(1)\) only when it crosses the fold
boundary, in which case its contribution is at most
\(\kappa_{a_i}/g\).  The final term is nonpositive.  Hence

\[
P_1(1)\le\sum_i\frac{\kappa_{a_i}}g
\le3\frac{12}{g},
\]

a contradiction.  This proves nonvanishing without a Sylvester-content
claim.

## 6. Exact determinant comparison

If \(d/M\le A/100\) and \(M/r<171/1000\), the certificate checks

\[
8^{342A}(81U)^{17100}125^{200000}
<64^{17100}374^{200000}.
\]

This integer inequality is exactly the two-hundred-thousandth power of the
required normalized bound.  It implies

\[
0<|\operatorname{Res}|<\left(\frac{374}{125}\right)^r<D.
\]

Since both polynomials vanish at \(z\pmod D\), the integral Sylvester
identity gives \(D\mid\operatorname{Res}\), which is the contradiction.

## 7. Certificate integrity

The independent rerun produced

\[
\begin{array}{c|r}
\text{visited nodes}&8417\\
\text{discarded leaves}&633\\
\text{certified leaves}&3576\\
\text{residual leaves}&0\\
\text{maximum depth}&27.
\end{array}
\]

The full-binary partition identity

\[
8417=2(633+3576)-1
\]

holds exactly.  All ten monotone anchor words occur.  The accepted cover
uses 2,824 distinct exact resultant comparisons and 883 accepted
\((U,A)\)-pairs.  The certificate contains no floating-point arithmetic in
any interval, alias, quotient, or determinant decision.

## 8. Meta-assessment

This closes a qualitatively complete sector by finite structural casework;
it does not merely move the integrality gate.  A cruder independent cover
left a stable box near
\((c_1,c_2,c_3)/r=(0.175,0.275,0.465)\), but the sign-separated located
alias estimate closes that box and the rest of the simplex.

The success is special to three shifts.  Before favorable cancellations,
three shifts have the strict coefficient-energy margin \(\sqrt7<3\).
At four shifts the corresponding baseline reaches \(\sqrt9=3\), exactly the
determinant base, so the same support-independent cover has no uniform slack.
The theorem is therefore a real advance on the exactly-three track, but not
evidence that the four-shift or arbitrary-shift sectors will close by the
same norm alone.
