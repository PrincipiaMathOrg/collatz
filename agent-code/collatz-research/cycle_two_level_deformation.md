# Two-level deformation of the Christoffel carry

**Mode:** SOLVE.  We classify the strict-record \(q=1\) gate when the
deformation levels from the Bezout-base reduction occupy at most two adjacent
values.

**Status:** The levels \(\{-1,0\}\) are excluded completely.  The levels
\(\{0,1\}\) are excluded when there are at most two level-\(1\) indices.
Thus any surviving coprime two-level integer-cycle candidate has at least
three level-\(1\) indices.  Primitive exact rational countermodels show that
the one-shift and two-shift congruences can vanish modulo proper factors of
the determinant, so a proof must control the full determinant.

## Updating proof skeleton

1. **PROVED:** for a coprime one-strip pair \((N,r)\), strict records write
   every one position as
   \[
   n_j=\left\lfloor\frac{jN}{r}\right\rfloor-m_j,
   \qquad m_j\ge-1,\qquad m_0=0.
   \]
2. **PROVED:** if all levels lie in \(\{-1,0\}\), then a denominator-one
   least rotation is trivial.  Any level \(-1\) makes its carry larger than
   the Christoffel carry, contradicting the universal Christoffel envelope.
3. **PROVED:** if all levels lie in \(\{0,1\}\) and exactly one level equals
   \(1\), then \(D\nmid C\).  The proof converts integer lifting into a
   trinomial resultant and bounds that resultant strictly below \(D\).
4. **PROVED:** if all levels lie in \(\{0,1\}\) and exactly two levels equal
   \(1\), then \(D\nmid C\).  Separate sparse norm arguments handle two
   residues below \(N-r\).  The remaining adjacent pair is excluded by the
   extra specific-root identity \(3z^{2r-N}=4\).
5. **PROVED, COUNTERMODEL:** the primitive strict-record word
   \((1,2,1,2,1,2,2,2)\) has the singleton level sequence
   \((0,0,0,0,0,1,0,0)\).  Its carry and determinant have gcd \(7\), which
   is exactly the relevant trinomial resultant, while its reduced denominator
   is \(233\).
6. **PROVED, COUNTERMODEL:** the primitive strict-record word
   \((1,1,2,2,2,1,2,1,2,2,2)\) has two nonadjacent shifted indices.  Its
   carry and determinant have gcd \(11\), while its reduced denominator is
   \(7727\).
7. **CERTIFIED FINITE AUDIT:** through \(r=17\), all \(8{,}064\) primitive
   strict-record coprime words with levels in \(\{0,1\}\), and all \(59\)
   with levels in \(\{-1,0\}\), have \(D\nmid C\).
8. **REMAINING:** exclude the \(\{0,1\}\) case with at least three shifted
   positions.  Equivalently, prove that its constrained subset resultant is
   nonzero and smaller than \(D\), or find another full-modulus obstruction.

## 1. The two subset congruences

Assume

\[
N=\lceil r\log_2 3\rceil,\qquad
D=2^N-3^r,\qquad
\gcd(N,r)=1.
\]

Let \(n_j\) be the shortcut position of the \(j\)-th one, and put

\[
\kappa_j:=jN-rn_j,\qquad
c_j:=[jN]_r.
\]

The strict suffix records give \(\kappa_j>-r\).  Therefore

\[
\kappa_j=c_j+m_jr,\qquad m_j\ge-1,
\]

and

\[
n_j=\left\lfloor\frac{jN}{r}\right\rfloor-m_j.        \tag{1.1}
\]

Choose the Bezout unit \(z\pmod D\) from the Christoffel integrality report,
so that

\[
z^r\equiv2,\qquad z^N\equiv3\pmod D.
\]

The exact integer-lift condition is

\[
\sum_{j=0}^{r-1}z^{-c_j}2^{-m_j}\equiv0\pmod D.       \tag{1.2}
\]

Since the \(c_j\) permute \(0,\ldots,r-1\), the full geometric sum is

\[
G:=\sum_{j=0}^{r-1}z^{-c_j}
\equiv\frac{z}{2(z-1)}\pmod D.                        \tag{1.3}
\]

If \(m_j\in\{0,1\}\) and

\[
T:=\{j:m_j=1\},
\]

then (1.2) is equivalent to

\[
\boxed{
(z-1)\sum_{j\in T}z^{-c_j}\equiv z\pmod D.
}                                                       \tag{1.4}
\]

If \(m_j\in\{-1,0\}\) and

\[
T_-:=\{j:m_j=-1\},
\]

then the corresponding equation is

\[
\boxed{
2(z-1)\sum_{j\in T_-}z^{-c_j}\equiv-z\pmod D.
}                                                       \tag{1.5}
\]

These are exact subset conditions, not estimates.

## 2. Exclusion of the levels \(\{-1,0\}\)

Let \(C_{\rm chr}\) denote the carry of the lower Christoffel word with the
same \((N,r)\).  Equation (1.1) gives, term by term,

\[
C=C_{\rm chr}
+\sum_{j\in T_-}2^{\lfloor jN/r\rfloor}3^{r-1-j}.     \tag{2.1}
\]

We now invoke the Christoffel extremal theorem of
[Fernandez and Ibanez](https://arxiv.org/html/2607.24844v1): for every binary
word of length \(N\) and weight \(r\), its minimum rotated carry is at most
\(C_{\rm chr}\).  This imported theorem is exactly the rotation-minimum
inequality needed here.

For an integer cycle rotated to its least shortcut state, the displayed carry
is its minimum rotated carry.  Hence \(C\le C_{\rm chr}\).  Equation (2.1)
shows that \(T_-\) must be empty.  The word is then Christoffel, and the exact
denominator theorem from the preceding report leaves only \((10)^g\).  In
the present coprime case this is \(10\), the trivial cycle.  We have proved

\[
\boxed{
\text{No nontrivial coprime denominator-one cycle has levels contained in }
\{-1,0\}.
}                                                       \tag{2.2}
\]

## 3. Exclusion of a singleton level-\(1\) deformation

Suppose now that \(m_j\in\{0,1\}\), and assume that

\[
T=\{s\}.
\]

Put

\[
B:=N-r,\qquad c:=[sN]_r.
\]

The positions in (1.1) must be strictly increasing.  The transition into the
single shifted position therefore crosses a gap of two in the Christoffel
word:

\[
\left\lfloor\frac{sN}{r}\right\rfloor
-\left\lfloor\frac{(s-1)N}{r}\right\rfloor=2.
\]

Since \(N=r+B\), reduction of this equality modulo \(r\) gives

\[
1\le c<B.                                              \tag{3.1}
\]

Set \(k:=c+1\).  Then \(2\le k\le B<r\).  Equation (1.4) reduces to

\[
z-1\equiv z^{c+1}\pmod D,
\]

or

\[
h_k(z)\equiv0\pmod D,\qquad
h_k(X):=X^k-X+1.                                      \tag{3.2}
\]

We already have \(z^r\equiv2\pmod D\).  The defining property of the
resultant gives

\[
D\mid R_{r,k},\qquad
R_{r,k}:=\operatorname{Res}(X^r-2,X^k-X+1).           \tag{3.3}
\]

The polynomial \(X^r-2\) is irreducible by Eisenstein's criterion at \(2\).
Since \(k<r\), it cannot divide \(h_k\), and hence

\[
R_{r,k}\ne0.                                          \tag{3.4}
\]

It remains to bound this nonzero integer.  Let \(Z\) be the matrix of
multiplication by \(X\) in
\(\mathbf Q[X]/(X^r-2)\), in the basis
\(1,X,\ldots,X^{r-1}\).  Then

\[
|R_{r,k}|=|\det(Z^k-Z+I)|.
\]

For \(k\ge2\), the three monomial matrices \(Z^k\), \(Z\), and \(I\) occupy
distinct columns in each row.  The matrix \(Z\) has one wrap coefficient
\(2\), while \(Z^k\) has \(k\) wrap coefficients \(2\).  Hadamard's
inequality therefore gives

\[
|R_{r,k}|^2
\le3^{r-k-1}6^{k+1},
\]

where overlap of the two wrap rows only decreases the right side.  Thus

\[
|R_{r,k}|
\le3^{r/2}2^{(k+1)/2}
\le3^{r/2}2^{(B+1)/2}
<2\cdot3^r2^{-r/2}.                                  \tag{3.5}
\]

For the last inequality, use

\[
B+1<(\log_2 3-1)r+2.
\]

On the other hand, the linear-form estimate already used in the cycle
ledger gives, with \(\Lambda=N\log2-r\log3\),

\[
D=3^r(e^\Lambda-1)
>3^r e^{-6.125581}r^{-13.3}.                          \tag{3.6}
\]

The established cycle barrier gives

\[
r\ge72{,}057{,}431{,}991>3^{16}.
\]

For completeness, the elementary estimate
\(2^t>1830t^{15}\) for \(t\ge200\), already checked in the cycle ledger,
applied to \(t=\lfloor r/2\rfloor\), gives

\[
2^{r/2}>4374r^{14}>2e^{6.125581}r^{13.3}.             \tag{3.7}
\]

Equations (3.5) to (3.7) prove

\[
0<|R_{r,k}|<D,
\]

contradicting (3.3).  Therefore

\[
\boxed{
\text{No coprime denominator-one cycle has levels in }\{0,1\}
\text{ with exactly one level }1.
}                                                       \tag{3.8}
\]

Combining (2.2), (3.8), and the Christoffel denominator theorem gives the
classification

\[
\boxed{
\begin{gathered}
\text{If a nontrivial coprime denominator-one cycle has deformation levels}\\
\text{in at most two adjacent values, then those values are }\{0,1\},\text{ and}\\
\text{at least two indices have level }1.
\end{gathered}
}                                                       \tag{3.9}
\]

## 4. The singleton proper-factor countermodel

The full-determinant conclusion in (3.8) is sharp.  Consider

\[
a=(1,2,1,2,1,2,2,2).
\]

It is primitive, strict-record, and one-strip, with

\[
N=13,\qquad r=8,\qquad
(m_0,\ldots,m_7)=(0,0,0,0,0,1,0,0).
\]

Here

\[
D=2^{13}-3^8=1631=7\cdot233,\qquad
C=13349,\qquad
\gcd(D,C)=7.                                          \tag{4.1}
\]

The shifted residue is

\[
c=[5N]_r=1,
\]

so \(k=2\), and an exact determinant calculation gives

\[
\left|\operatorname{Res}(X^8-2,X^2-X+1)\right|=7.     \tag{4.2}
\]

Thus the singleton polynomial vanishes modulo the proper determinant factor
\(7\), but not modulo all of \(D\).  The corresponding exact rational cycle
has denominator \(233\) and numerator states

\[
\frac1{233}(1907,2977,2291,3553,2723,4201,3209,2465).
                                                               \tag{4.3}
\]

All eight valuations are exact, and \(1907/233\) is the least state.  This
countermodel proves that one cannot strengthen (3.8) by claiming that the
singleton carry is a unit modulo every factor of \(D\).  The resultant-size
comparison is essential.

## 5. Two shifted indices: the easy residue case

Assume that

\[
T=\{s,t\},\qquad s<t.
\]

Every run of level \(1\) begins after a gap of two in the Christoffel
positions.  Its landing residue therefore lies in \([1,B-1]\), where

\[
B:=N-r.
\]

If \(s,t\) are not adjacent, both are run starts, so both residues lie in
this interval.  The same conclusion holds when \(t=s+1\) and the internal
Christoffel gap is two.  Indeed, the second residue then wraps once and is
again in \([1,B-1]\).

Write the two residues in increasing order as

\[
1\le c<d<B,
\qquad a:=d-c.
\]

Multiplication of (1.4) by \(z^d\) gives

\[
H(z)\equiv0\pmod D,
\qquad
H(X):=-X^{d+1}+X^{a+1}-X^a+X-1.                     \tag{5.1}
\]

Consequently

\[
D\mid R,
\qquad
R:=\operatorname{Res}(X^r-2,H).                     \tag{5.2}
\]

The degree of \(H\) is at most \(B<r\).  Since \(X^r-2\) is irreducible,
\(R\ne0\).

Let \(\rho=2^{1/r}\), and evaluate \(H\) on
\(\rho\zeta\), where \(\zeta\) runs through the \(r\)-th roots of unity.
When \(a>1\), Fourier orthogonality and the arithmetic-geometric mean
inequality give

\[
|R|^{2/r}
\le
 \rho^{2(d+1)}+\rho^{2(a+1)}+\rho^{2a}+\rho^2+1.
                                                               \tag{5.3}
\]

When \(a=1\), the two linear monomials cancel, and the resulting bound is
smaller.  Since the first three exponents in (5.3) are at most \(B\),

\[
|R|^{2/r}
<\frac{31}{4}2^{2/r}+1.
\]

The established period barrier gives \(r>3^{16}>128\).  Bernoulli's
inequality gives

\[
2^{2/r}<2^{1/64}<\frac{64}{63},
\]

and therefore

\[
|R|<\left(\frac{559}{63}\right)^{r/2}
=3^r\left(\frac{559}{567}\right)^{r/2}
<3^r e^{-4r/567}.                                    \tag{5.4}
\]

For \(r>3^{16}\),

\[
\frac{4r}{567}>6.125581+13.3\log r.
\]

Combining (5.4) with the lower bound (3.6) yields

\[
0<|R|<D,
\]

contradicting (5.2).  This excludes every two-shift configuration except an
adjacent pair whose internal Christoffel gap is one.

## 6. Two shifted indices: the hard adjacent pair

Let the adjacent shifted indices be \(s,s+1\), and assume that their internal
Christoffel gap is one.  Put

\[
c:=[sN]_r,
\qquad L:=r-B=2r-N,
\qquad k:=c+1.
\]

The first index is a run start, so its preceding gap is two and \(c<B\).
The internal gap is one precisely when \(c+B<r\).  Hence

\[
1\le c<L,
\qquad 2\le k\le L.                                  \tag{6.1}
\]

The second shifted residue is \(c+B\).  Equation (1.4), together with
\(2z^B=3\), now becomes

\[
3z^k-5z+5\equiv0\pmod D.                             \tag{6.2}
\]

The important point is that this is the specific Bezout root.  Its two power
relations give the additional identity

\[
3z^L=4\pmod D,                                       \tag{6.3}
\]

because \(L=r-B\), \(z^r=2\), and \(2z^B=3\).

### 6.1 The case \(k<L\)

Equations (6.2) and (6.3) force

\[
D\mid R_{L,k}:=
\operatorname{Res}(3X^L-4,3X^k-5X+5).               \tag{6.4}
\]

The reciprocal of the first polynomial is \(4X^L-3\), which is Eisenstein
at \(3\).  Thus \(3X^L-4\) is irreducible.  Since \(k<L\),

\[
R_{L,k}\ne0.                                         \tag{6.5}
\]

There is also a useful exact content gain.  Modulo \(3\), the Sylvester
matrix in (6.4) has rank \(L+1\) and size \(L+k\).  One sees this directly:
the shifted rows from \(3X^L-4\) become coordinate rows, while the shifted
rows from \(3X^k-5X+5\) become consecutive differences.  Hence its nullity
is \(k-1\).  The Smith normal form therefore gives

\[
3^{k-1}\mid R_{L,k}.                                  \tag{6.6}
\]

Write \(S_{L,k}=R_{L,k}/3^{k-1}\).  Since \(3\nmid D\), (6.4) and (6.6)
give

\[
D\mid S_{L,k}.                                       \tag{6.7}
\]

Let \(\rho=(4/3)^{1/L}\).  The roots of \(3X^L-4\) are
\(\rho\zeta\), with \(\zeta^L=1\).  Since \(0,1,k\) are distinct modulo
\(L\), Parseval and the arithmetic-geometric mean inequality give

\[
|S_{L,k}|
\le3\left(9\rho^{2k}+25\rho^2+25\right)^{L/2}.       \tag{6.8}
\]

The period barrier and \(\log_2 3<8/5\) give \(L>2r/5-1>128\).  Hence

\[
9\rho^{2k}<16,
\qquad
\rho^2<\frac{64}{63},
\]

and (6.8) yields

\[
|S_{L,k}|<3\cdot67^{L/2}.                             \tag{6.9}
\]

The exact inequality \(2^{19}<3^{12}\) gives
\(\log_2 3>19/12\), and therefore

\[
L<\frac{5r}{12}.
\]

Since

\[
67^5 2^{24}<5^{24},
\]

equation (6.9) implies

\[
0<|S_{L,k}|<3\left(\frac52\right)^r.                 \tag{6.10}
\]

Finally, \(\log(6/5)>1/6\) and \(r>3^{16}\) imply

\[
r\log(6/5)>\log3+6.125581+13.3\log r.
\]

Together with (3.6), this proves \(|S_{L,k}|<D\), contradicting (6.7).

### 6.2 The endpoint \(k=L\)

Subtracting (6.3) from (6.2) gives

\[
5z\equiv9\pmod D.
\]

Raising to the \(L\)-th power and using (6.3) gives

\[
D\mid J_L:=3\cdot9^L-4\cdot5^L.                     \tag{6.11}
\]

This integer is positive.  Moreover,

\[
0<J_L<3\cdot9^L<3\cdot3^{5r/6}<D,                   \tag{6.12}
\]

where the final comparison again uses (3.6), \(r>3^{16}\), and the same
elementary logarithmic estimate as in (6.10).  Equations (6.11) and (6.12)
are contradictory.

We have proved the exact two-shift theorem

\[
\boxed{
\text{No coprime denominator-one cycle has levels in }\{0,1\}
\text{ with exactly two levels }1.
}                                                       \tag{6.13}
\]

The use of (6.3) is essential.  For \(r=8,N=13,c=2\), the original
two-residue polynomial has resultant exactly
\(D=1631\) against \(X^8-2\), although the specific Bezout root does not
annihilate it.  The second power relation removes this false obstruction.

## 7. A two-shift proper-factor countermodel

The primitive strict-record word

\[
a=(1,1,2,2,2,1,2,1,2,2,2)
\]

has

\[
r=11,\qquad N=18,\qquad T=\{2,8\},
\]

and is a two-shift deformation with nonadjacent shifted indices.  Its exact
arithmetic data are

\[
D=84997,\qquad C=516835,\qquad \gcd(D,C)=11.       \tag{7.1}
\]

The corresponding rational cycle has denominator \(7727\) and numerator
states

\[
\begin{split}
(&46985,74341,115375,88463,68279,53141,\\
 &83575,64613,100783,77519,60071).
\end{split}                                           \tag{7.2}
\]

All valuations are exact, and the first state is least.  Thus two-shift
congruences, like singleton congruences, can vanish modulo a proper factor of
\(D\).  The theorem above genuinely uses the full determinant.

## 8. The exact remaining multi-shift gate

For a nonempty set \(T\) of level-\(1\) indices, put

\[
c_*:=\max_{j\in T}c_j,\qquad
H_T(X):=(X-1)\sum_{j\in T}X^{c_*-c_j}-X^{c_*+1}.      \tag{8.1}
\]

Equation (1.4) gives

\[
H_T(z)\equiv0\pmod D.                                 \tag{8.2}
\]

Reduce \(H_T\) modulo \(X^r-2\) if its degree is \(r\), and call the
resulting polynomial \(\overline H_T\).  Every surviving two-level cycle
must satisfy

\[
\boxed{
D\mid\operatorname{Res}(X^r-2,\overline H_T),
\qquad |T|\ge3.
}                                                       \tag{8.3}
\]

The path constraint in (1.1) says that every run of level \(1\) begins after
a Christoffel gap of two.  The next target is to combine that run structure
with the complementary identity \(3z^{2r-N}=4\).  Equation (8.3) is the
exact remaining two-level target.

## 9. Certificates

The exact enumeration
[cycles/two_level_deformation_audit.js](cycles/two_level_deformation_audit.js)
checks every primitive strict-record coprime word through \(r=17\).  It
finds \(8{,}064\) words with levels in \(\{0,1\}\), \(59\) words with levels
in \(\{-1,0\}\), and no full-determinant carry.  It also verifies every
valuation and the least-state assertion in (4.3).

The exact determinant certificate
[cycles/singleton_resultant_probe.js](cycles/singleton_resultant_probe.js)
checks \(499\) resultants through \(r=40\), the Hadamard bound in (3.5), and
the value \(7\) in (4.2).  Its terminal output is

    resultants_checked=499
    finite_size_checks=489
    singleton_r8_k2_resultant=7
    period_barrier_gt_3_pow_16=true
    singleton_resultant_certificate_passed=true

The two-shift certificate
[cycles/two_shift_resultant_probe.js](cycles/two_shift_resultant_probe.js)
checks the sparse resultant identity, the adjacent specific-root reduction,
the divisibility \(3^{k-1}\mid R_{L,k}\), both countermodels, and every admissible
two-shift pattern through \(r=30\).

## Conclusion

The two-level hypothesis yields more than a scalar carry estimate.  The
upper pair \(\{-1,0\}\) is impossible, and every lower deformation with one
or two left shifts is excluded by a full-determinant resultant.  The hard
adjacent pair requires both power relations of the specific Bezout root, not
only \(z^r=2\).  The remaining family consists exactly of lower deformations
with at least three shifts.  Its obstruction is the explicit constrained
resultant (8.3), which is not yet bounded uniformly.
