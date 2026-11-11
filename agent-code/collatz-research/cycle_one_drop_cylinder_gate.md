# The one-drop cylinder gate

**Mode:** SOLVE.

**Status:** The one-drop branch reduces to one sharp cylinder-separation
inequality.  That inequality is certified through \(r=40\), but we do not
obtain an all-depth proof.  The exact normalization below shows why the
terminal-level decomposition alone cannot prove it.

## 1. The exact one-drop language

Put

\[
P=3^r,\qquad N=\lceil r\log _2 3\rceil,\qquad
M=2^N,\qquad D=M-P,
\]

and let

\[
B_j=\left\lfloor\frac{jN}{r}\right\rfloor,
\qquad b_j=B_{j+1}-B_j\in\{1,2\}.
\]

Choose a nonempty set \(S\) of preterminal indices at which \(b_j=2\).
For \(0\leq j<r\), write

\[
m_j=\#\{i\in S:i<j\},\qquad U=|S|,
\]

and set \(m_r:=0\).  The last assignment records the terminal drop and is
not part of the counting definition of \(m_j\).

The one-drop word is

\[
a_j=b_j-(m_{j+1}-m_j)\quad(0\leq j<r).
\tag{1}
\]

Here \(m_0=m_r=0\), \(m_j\) is nondecreasing for \(0\leq j<r\), and
\(m_{r-1}=U\).  Thus every preterminal letter belongs to
\(\{1,2\}\), while

\[
a_{r-1}=U+2.
\tag{2}
\]

The height path has \(U\) upward transitions and one final downward
transition.  Consequently its transition count is exactly

\[
\boxed{T=U+1.}
\tag{3}
\]

The carry is

\[
C=\sum_{j=0}^{r-1}3^{r-1-j}2^{B_j-m_j}.
\tag{4}
\]

The unique terminal letter in (2) also proves primitivity.  The mechanical
strict-record inequalities prove strictness independently of the selected
set \(S\).

## 2. The corrected cylinder sign

Let \(\rho\) be the least positive representative modulo \(2M\) satisfying

\[
P\rho+C\equiv M\pmod {2M}.
\tag{5}
\]

The corresponding endpoint is the odd positive integer

\[
Z=\frac{P\rho+C}{M}.
\tag{6}
\]

Since \(P=M-D\), equations (5) and (6) give

\[
\boxed{
\rho-Z=\frac{D\rho-C}{M}\in2\mathbf Z.
}
\tag{7}
\]

Thus canonical descent is the ordered inequality \(D\rho>C\), while
denominator one is the boundary \(D\rho=C\).  For a hypothetical positive
cycle, the existing period and size bounds give

\[
x=\frac CD<305r^{14.3}<2M.
\]

The cylinder multiplier congruence then identifies \(x=\rho\).  Hence,
on the cycle range,

\[
\boxed{D\mid C\quad\Longleftrightarrow\quad Z=\rho.}
\tag{8}
\]

This is stronger than checking \(D\nmid C\) numerically because (7) records
the exact side of the forbidden boundary.

## 3. The terminal-level decomposition closes tautologically

Let \(x_j\) be any exact rational path with word (1), and put

\[
w_j=2^{-m_j}x_j.
\]

Using \(a_j=b_j+m_j-m_{j+1}\), every accelerated step becomes

\[
\boxed{
2^{b_j}w_{j+1}=3w_j+2^{-m_j}.
}
\tag{9}
\]

Equation (9) also holds at the terminal step, where \(m_{r-1}=U\) and
\(m_r=0\).  Multiplication by \(2^U\) gives an integer Christoffel skeleton
whose forcing terms are the nonincreasing powers

\[
2^{U-m_0},2^{U-m_1},\ldots,2^{U-m_{r-1}}.
\tag{10}
\]

Telescoping (9) around a putative cycle gives

\[
D(2^Ux)=2^UC.
\tag{11}
\]

After division by \(2^U\), equation (11) is exactly \(Dx=C\).  Hence the
nested terminal levels, the full carry, and the actual final discharge do
not produce a proper factor or a second independent congruence.  They
recover the original integrality gate.

## 4. The sharp remaining separation lemma

The finite data suggest the following statement.

\[
\boxed{\rho>2^U.}
\tag{12}
\]

If (12) holds at all depths, then the dense one-drop branch is excluded.
We use the support-independent transition theorem rather than the binary
height entropy theorem, since the present height path takes every value
from \(0\) to \(U\).  Put

\[
L_r:=\log _2(612r^{15}).
\]

For every primitive positive denominator-one strict-record word in the
period range, the general transition theorem gives

\[
r<T^2+(2L_r+1)T+2L_r+1.
\tag{13}
\]

Under \(q=1\), equations (8) and (12) give

\[
2^U<\rho=x<305r^{14.3}.
\tag{14}
\]

Let \(X:=\log _2 r\).  Since \(305<2^9\) and \(612<2^{10}\), equations
(3), (13), and (14) imply

\[
U<15X+9,\qquad T<15X+10,
\qquad L_r<15X+10,
\]

and therefore

\[
2^X=r<675X^2+945X+331.
\tag{15}
\]

The reverse inequality holds for every real \(X\geq36\).  Indeed, it
holds directly at \(X=36\), and the logarithmic derivative of the left
side exceeds that of the quadratic throughout this range.  The established
period barrier is much larger than \(2^{36}\).  Thus (12) supplies the
intended all-depth contradiction, with no binary-height hypothesis and no
enumeration of fixed \(T\).

We do not prove (12).  It is not a low-bit consequence of the long final
letter.  For example, at

\[
a=(1,2,1,1,1,4),\qquad r=6,\qquad U=2,
\]

the exact representative is \(\rho=1947\), but

\[
\rho\equiv3\pmod {2^{U+1}}.
\tag{15}
\]

Thus the residue modulo \(2^{U+1}\) can lie below \(2^U\).  The inequality
in (12) is supplied entirely by the higher lift inside
\([1,2^{N+1}]\).  Under a carry deformation, that lift can wrap through
zero.  Neither the order of the heights nor the complete terminal-level
identity determines the wrap indicator.

## 5. Exact certificate

The recursive checker
[`cycles/cycle_one_drop_extended_probe.js`](cycles/cycle_one_drop_extended_probe.js)
compresses each interval between eligible upward steps into one exact
affine carry update.  Through \(r=40\), it checks

\[
23{,}976{,}844
\]

nonempty one-drop subsets and finds

\[
\#\{D\mid C\}=0,\qquad
\#\{\rho\leq2^U\}=0.
\]

The least ratio is

\[
\frac{\rho}{2^U}=\frac72
\]

at \(a=(1,1,2,3)\).  The row digest is

```
7f59ddc2e32e4c2be33603cfb255535592c75d5436bfaa7a3e25147cddbd44df
```

The direct checker
[`cycles/cycle_one_drop_probe.js`](cycles/cycle_one_drop_probe.js)
also verifies the endpoint sign through \(r=30\): all \(383{,}894\)
primitive strict words descend, none rises or is stationary, and the least
gap is \(2\) at \(a=(1,1,2,3)\).

## Conclusion

The one-drop branch has a sharper exact gate than bare divisibility.  Its
canonical gap is the even integer in (7), and the conjectural separation
\(\rho>2^U\) would combine with the general transition bound and the
polynomial cycle bound to close the branch uniformly.  The complete level
decomposition does not prove that separation: it telescopes back to
\(Dx=C\).  The irreducible missing datum is the no-wrap location of the
canonical \(2^{N+1}\)-cylinder representative.
