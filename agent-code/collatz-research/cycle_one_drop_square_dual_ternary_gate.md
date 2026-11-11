# The square-scale dual ternary gate

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** We prove that a failure of the square-root bound has a
dual-locked suffix of length at least \(0.7075r-O(1)\). The low return is
an ordinary integer in its ternary cylinder, and its inverse suffix is
uniquely forced. We also prove that the dyadic and ternary
stabilizations overlap for more than \(0.52r-O(1)\) branches. The
resulting two-cut divisibility is exactly one rescaled copy of the full
middle-state defect. It does not give an independent contradiction.

## 1. The square stabilization

Put

\[
\alpha:=\log _2 3,\qquad
\gamma:=\log _2(3/2)=\alpha-1,
\tag{1}
\]

\[
N:=\lceil\alpha r\rceil,\qquad
e:=N-r=\lceil\gamma r\rceil,\qquad
n:=r-1.
\tag{2}
\]

Let

\[
b_t:=\left\lfloor\frac{et}{r}\right\rfloor-
\left\lfloor\frac{e(t-1)}{r}\right\rfloor
\qquad(1\leq t\leq n)
\tag{3}
\]

be the anchored clock. An internal exponent \(a_t=2\) is allowed only
when \(b_t=1\), while every other internal exponent is \(1\). If \(V\)
is the number of internal exponents equal to \(2\), we put

\[
U:=e-1-V.
\tag{4}
\]

The complete accelerated exponent word is

\[
(a_1,\ldots,a_n,U+2),
\qquad
\sum_{t=1}^{n}a_t+U+2=N.
\tag{5}
\]

Let \(q_s\) be the least positive representative of the prefix cylinder
of length \(s\), and put

\[
L_s:=\sum_{t=1}^{s}a_t.
\tag{6}
\]

Suppose that the complete cylinder has least representative \(q\) and
violates the square-root bound:

\[
q^2<2^U.
\tag{7}
\]

We define

\[
m:=\left\lceil\frac U2\right\rceil,
\qquad
\tau:=\min\{s:L_s\geq m\}.
\tag{8}
\]

Since \(0<q<2^m\) and the prefix cylinders are nested, we have

\[
q_s=q
\qquad(\tau\leq s\leq n).
\tag{9}
\]

Also, \(L_s\geq s\), so

\[
\tau\leq m,
\qquad
n-\tau\geq r-1-\left\lceil\frac U2\right\rceil.
\tag{10}
\]

Thus more than seventy percent of a square failure is an orbit of one
fixed integer.

## 2. The square dual-locking theorem

We now pass to odd accelerated coordinates. Put

\[
x:=2q-1,
\qquad
T_a(x):=\frac{3x+1}{2^a}.
\tag{11}
\]

Write

\[
L_\tau=m+d,
\qquad d\in\{0,1\},
\tag{12}
\]

and let

\[
(c_1,\ldots,c_k)
:=(a_{\tau+1},\ldots,a_n,U+2),
\qquad k:=r-\tau.
\tag{13}
\]

We define the suffix carry by

\[
A_0:=0,\qquad C_0:=0,
\tag{14}
\]

\[
A_j:=A_{j-1}+c_j,\qquad
C_j:=3C_{j-1}+2^{A_{j-1}}
\qquad(1\leq j\leq k).
\tag{15}
\]

Then

\[
A_k=N-m-d.
\tag{16}
\]

Let \(R_\tau\) be the least nonnegative residue satisfying

\[
2^{A_k}R_\tau\equiv C_k\pmod {3^k}.
\tag{17}
\]

**Theorem 1.** Suppose that a complete anchored integer path satisfies
the bottom return and (7). Then

\[
\boxed{x=R_\tau.}
\tag{18}
\]

Moreover,

\[
\boxed{3^k>2^{m+1}>x.}
\tag{19}
\]

**Proof.** Since the first anchored clock bit is zero, \(q\) is even.
Therefore, (7) implies \(U\geq3\). The suffix sends the state
\(Y:=x_\tau\) back to \(x\), so

\[
2^{A_k}x-C_k=3^kY.
\tag{20}
\]

It follows that \(x\equiv R_\tau\pmod {3^k}\).

It remains to compare the modulus with the square interval. The
inequality \(3^5<2^8\) gives \(\alpha<8/5\), and hence

\[
\alpha^2-\alpha-1<0.
\tag{21}
\]

Since \(U\leq e-1<\gamma r\), equation (21) gives

\[
\alpha(r-U)>U.
\tag{22}
\]

Also, \(m\leq U\) and \(k\geq r-m\geq r-U\). Consequently,

\[
3^k\geq3^{r-U}>2^U\geq2^{m+1}.
\tag{23}
\]

The last inequality uses \(U\geq3\). Finally, (7) gives
\(x<2^{m+1}\). Both \(x\) and \(R_\tau\) lie in
\([0,3^k)\), so their congruence is the equality (18). The conclusion
follows. \(\square\)

In other words, the long suffix exposes every ternary digit of the low
return. The remaining intersection is

\[
[0,2^{m+1})\cap
\{\text{the anchored inverse ternary cylinder}\}.
\tag{24}
\]

## 3. The forced inverse path

The intersection in (24) is deterministic once \(x\) and \(U\) are
fixed. Starting from the return \(x\), the bottom predecessor is

\[
x_n=\frac{2^{U+2}x-1}{3}.
\tag{25}
\]

At an internal reverse step we have

\[
x_{t-1}=\frac{2^{a_t}x_t-1}{3}.
\tag{26}
\]

Since \(a_t\in\{1,2\}\), integrality forces

\[
\boxed{
a_t=
\begin{cases}
1,&x_t\equiv2\pmod3,\\[3pt]
2,&x_t\equiv1\pmod3.
\end{cases}}
\tag{27}
\]

If \(x_t\equiv0\pmod3\), no inverse branch exists. A forced exponent
\(2\) must also occur at a clock-one site. Thus each triple \((r,U,q)\)
determines at most one reverse trajectory; the suffix cut still has to
be located on that trajectory.

There are at most two possible split points. Indeed, the internal suffix
exponent sum must be

\[
\sum_{t=\tau+1}^{n}a_t
=N-U-2-m-d.
\tag{28}
\]

If

\[
H:=N-U-2-m,
\tag{29}
\]

then the cumulative exponent of the forced reverse path must hit
\(H\) or \(H-1\). Since that exponent increases strictly, each value
can be hit at most once.

We also obtain exact endpoint locks. Let \(t_1\) and \(t_V\) denote the
first and last internal exponent-two sites. Every square collision has
at least one exponent-two site among the first \(\tau\) branches, and

\[
\boxed{v_2(x+1)=t_1.}
\tag{30}
\]

Indeed, if the first \(\tau\) branches were all ordinary, then
\(\tau=m\) and exact integrality would give \(2^m\mid q\), contrary to
\(0<q<2^m\). Before the first spike, exact ordinary branches give
\(2^{t_1-1}\mid q\). The spike domain makes
\(q/2^{t_1-1}\) odd, which proves (30).

The last spike gives the dual valuation

\[
\boxed{
v_3(2^{U+1}x+1)=r-t_V.
}
\tag{31}
\]

To see this, put \(\ell:=r-t_V\), and let \(y\) be the state immediately
after the last spike. The ordinary tail and the bottom return give

\[
3^\ell(y+1)=2^\ell(2^{U+1}x+1).
\tag{32}
\]

Since \(y\equiv1\pmod3\) after an exponent-two branch, we have
\(3\nmid y+1\). Equation (31) follows.

## 4. The doubly stabilized overlap

The ternary lock itself stabilizes before the entire suffix has been
read. Define

\[
h:=\min\{j:3^j>x\}.
\tag{33}
\]

At any split \(s\leq r-h\), the final \(r-s\) branches determine \(x\)
modulo \(3^{r-s}\). Since the modulus is larger than \(x\), the least
ternary representative is already the ordinary integer \(x\). On the
other hand, (9) fixes the dyadic representative \(q\) at every split
\(s\geq\tau\). Hence the two canonical representatives are both fixed
through the interval

\[
\tau\leq s\leq r-h.
\tag{34}
\]

This overlap is linearly long. Since \(x<2^{m+1}\), we have

\[
h<\frac{m+1}{\alpha}+1.
\tag{35}
\]

Using \(m\leq(U+1)/2\) and \(\alpha>3/2\), equations (10) and (35)
give

\[
r-\tau-h
>
r-\left(\frac12+\frac1{2\alpha}\right)U-\frac52.
\tag{36}
\]

Also, \(3^{17}<2^{27}\), so \(\alpha<27/17\). The function

\[
1+\frac1{2\alpha}-\frac\alpha2
\tag{37}
\]

is decreasing. Since \(U<\gamma r\), equation (36) gives the explicit
bound

\[
\boxed{
r-\tau-h>\frac{239}{459}r-\frac52.
}
\tag{38}
\]

Thus the dyadic and ternary canonicalizations overlap for more than
\(0.5206r-O(1)\) branches.

We now check whether this overlap creates a second divisibility. At a
split \(s\), let \(P_s\) be the prefix carry and let \(C_s\) be the
suffix carry. Put

\[
Y_s^+:=\frac{3^sx+P_s}{2^{L_s}},
\qquad
Y_s^-:=\frac{2^{N-L_s}x-C_s}{3^{r-s}},
\tag{39}
\]

and define

\[
\Delta_s:=Y_s^--Y_s^+.
\tag{40}
\]

If \(C_{\rm full}\) is the carry of the complete word, then

\[
\boxed{
\Delta_s=
\frac{(2^N-3^r)x-C_{\rm full}}
     {2^{L_s}3^{r-s}}.
}
\tag{41}
\]

For two splits \(s<t\) in (34), both middle states are integers. The
same branch recurrence on the two sides gives

\[
\boxed{
2^{L_t-L_s}\Delta_t=3^{t-s}\Delta_s.
}
\tag{42}
\]

Since the two coefficients are coprime, there is an integer \(j\) such
that

\[
\boxed{
\Delta_s=2^{L_t-L_s}j,
\qquad
\Delta_t=3^{t-s}j.
}
\tag{43}
\]

This is the sharp two-cut identity. It also gives a clean verdict on the
double-stabilization idea:

\[
Y_s^+=Y_s^-
\quad\Longleftrightarrow\quad
j=0
\quad\Longleftrightarrow\quad
(2^N-3^r)x=C_{\rm full}.
\tag{44}
\]

Therefore, adjacent split identities telescope to the original
middle-state collision. The long overlap quantizes every nonzero defect,
but it does not prove that the defect is nonzero and it does not determine
its sign. No new joint divisibility or range contradiction is obtained
without an additional sign or nonvanishing theorem.

## 5. The \(r=37\) countershadow

The suffix countershadow from the linear dual lock has

\[
(r,U,q,x)=(37,19,92{,}850,185{,}699).
\tag{45}
\]

It does not survive the square interval:

\[
q^2=8{,}621{,}122{,}500
>524{,}288=2^{19}.
\tag{46}
\]

Indeed, a square failure at \(U=19\) would have \(q\leq724\).
There is also an exact prefix obstruction:

\[
v_2(x+1)=2,
\tag{47}
\]

while the first prescribed spike in the countershadow is at time \(26\)
and its prefix contains no spike. Equation (30) detects the failure
immediately.

This use of the countershadow is essential. The square theorem does not
claim that suffix growth or strict leastness alone is contradictory. It
says that the old shadow lies outside the square interval, and that any
new shadow must also pass the forced inverse path and the first-spike
lock.

## 6. Exact finite certificate

The exact worker
[renewal_dual_square_suffix_probe.js](cycles/renewal_dual_square_suffix_probe.js)
enumerates every

\[
3\leq r\leq80,\qquad
1\leq U\leq e-1,\qquad
q\geq2\text{ even},\qquad
q^2<2^U.
\tag{48}
\]

For each triple \((r,U,q)\), it applies the bottom inverse, forces every
internal inverse exponent using (27), checks anchored eligibility, and
tests the two possible exponent targets in (28). The frozen default run
checks

\[
1{,}855\text{ parameter rows},
\qquad
87{,}149{,}756\text{ values of }q,
\tag{49}
\]

and finds

\[
\#\{\text{exact stabilized suffixes}\}=0.
\tag{50}
\]

In particular, no strict suffix and no first-spike-locked suffix occurs
in this range. The wrapper
[renewal_dual_square_certificate.js](cycles/renewal_dual_square_certificate.js)
runs the frozen audit and fails if any regression count changes.

The finite result in (50) is not an all-depth theorem. The all-depth
content is Theorem 1, the forced inverse rule (27), the endpoint locks
(30) and (31), the overlap bound (38), and the exact two-cut identity
(43). The remaining problem is the same ordered mixed-radix
nonintersection, now restricted to a much shorter interval and one
deterministic inverse path.

## Conclusion

The square-root reduction materially strengthens the dual ternary gate.
A hypothetical failure has a fixed-integer suffix of length at least
\(0.7075r-O(1)\), and the dyadic and ternary representatives are
simultaneously fixed across more than \(0.52r-O(1)\) branches. However,
the two-cut relation is a rescaling of one full defect. It does not
separate \(Y_+\) from \(Y_-\).

The active gate is therefore one exact question: can the short interval
\(x<2^{\lceil U/2\rceil+1}\) meet the uniquely forced anchored ternary
cylinder? The certificate finds no meeting through \(r=80\), but an
all-depth exclusion remains open.
