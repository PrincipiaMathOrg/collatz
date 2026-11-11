# A \(2\)-adic and Archimedean audit of HSCI

## Status

We do not obtain a contradiction from the Bernstein series, the product
formula, or the terminal decoder.  We do obtain three exact reductions.

1. Summation by parts rewrites the Bernstein correction as a reciprocal-surplus
   sum.
2. Relative to its reduced denominator, the resulting \(2\)-adic
   approximation has exponent at most \(1\) at later odd orbit states.
   In particular, high surplus makes the rational
   approximation weaker rather than stronger.
3. Factoring a transported terminal decoder out of a return lattice gives no
   new Archimedean room.  The factor \(3^b\) cancels exactly, including when
   \(b\) is unbounded but \(b=o(L)\).

We also give an exact symbolic construction with strict barriers,
\(q_k\to\infty\), sublinear logarithmic surplus, and decoder depth at most one.
Every finite part has a post-stabilization positive realization by P15.  A
sparse modification makes the decoder unbounded but sublinear.  Thus the
remaining estimate must correlate infinitely many scales on one fixed
ordinary seed.

## 1. Exact reciprocal-surplus identities

Let \(T\) denote the shortcut Collatz map, let \(n\) be a positive odd
integer, and write

\[
y_j:=T^j(n),\qquad \epsilon_j:=y_j\pmod 2,\qquad
s_k:=\sum_{j<k}\epsilon_j,\qquad
q_k:=\frac{3^{s_k}}{2^k},\qquad r_k:=q_k^{-1}.
\]

We assume that \(q_k\geq1\) for every \(k\) and \(q_k\to\infty\).  Put

\[
h_k:=\frac{y_k}{q_k}.
\]

The exact Bernstein identity is

\[
h_k=n+A_k,\qquad
A_k:=\sum_{j<k}\epsilon_j\frac{2^j}{3^{s_{j+1}}}
=\sum_{j<k}\frac{\epsilon_j}{3q_j}.                 \tag{1.1}
\]

The reciprocal surplus satisfies

\[
r_{j+1}=\frac{2r_j}{3^{\epsilon_j}},
\qquad
\frac{\epsilon_jr_j}{3}=\frac{2r_j-r_{j+1}}4.
\]

Summing gives the exact formula

\[
\boxed{
A_k=\frac14\left(2+\sum_{j=1}^{k-1}\frac1{q_j}
-\frac1{q_k}\right).}                               \tag{1.2}
\]

Consequently,

\[
\boxed{
\frac{y_k}{q_k}
=n+\frac12+\frac14\sum_{j=1}^{k-1}\frac1{q_j}
-\frac1{4q_k}.}                                      \tag{1.3}
\]

In particular, the normalized orbit is bounded if and only if
\(\sum_jq_j^{-1}<\infty\).  High surplus \(q_k\to\infty\) alone does not imply
this summability.  Since \(q_j\geq1\), (1.2) also gives the useful universal
bound, for \(k\geq1\),

\[
n<h_k<n+\frac{k+1}{4}.                               \tag{1.4}
\]

There are two exact product forms.  A direct division of one shortcut step by
its coefficient gives

\[
h_k=n\prod_{\substack{j<k\\ \epsilon_j=1}}
\left(1+\frac1{3y_j}\right),                         \tag{1.5}
\]

while the same calculation with \(g_k:=(y_k+1)/q_k\) gives

\[
g_k=(n+1)\prod_{\substack{j<k\\ \epsilon_j=0}}
\left(1+\frac1{y_j+1}\right).                       \tag{1.6}
\]

Since \(g_k-h_k=q_k^{-1}\), we obtain

\[
\boxed{
 (n+1)\prod_{\substack{j<k\\ \epsilon_j=0}}\left(1+\frac1{y_j+1}\right)
-n\prod_{\substack{j<k\\ \epsilon_j=1}}\left(1+\frac1{3y_j}\right)
=\frac1{q_k}.}                                       \tag{1.7}
\]

Thus \(q_k\to\infty\) forces an exact balance between two positive products,
not a sign contradiction.  The balance is simply another form of the orbit
recurrence.

## 2. What ordinary \(2\)-adic stabilization supplies

Equation (1.1) also gives

\[
n+A_k=\frac{2^ky_k}{3^{s_k}},
\qquad
v_2(n+A_k)=k+v_2(y_k).                               \tag{2.1}
\]

Therefore \(A_k\to-n\) in \(\mathbf Z_2\).  Taking the \(2\)-adic limit in
(1.2), where \(v_2(r_k)=k\), gives the exact reciprocal-series identity

\[
\boxed{
\sum_{j=1}^{\infty}\frac{2^j}{3^{s_j}}=-4n-2
\quad\hbox{in }\mathbf Z_2.}                         \tag{2.2}
\]

This is the full content of stabilization in the present series coordinates.
It does not compare the \(2\)-adic sum with the positive real sum.

The rational-approximation route has the wrong exponent.  At every odd state
\(y_k\) with \(k\geq1\), we have
\(\gcd(y_k,6)=1\).  Hence the denominator \(3^{s_k}\) in (2.1) is reduced and

\[
\left|A_k-(-n)\right|_2=2^{-k}
=\frac{q_k}{3^{s_k}}.                                \tag{2.3}
\]

More precisely, if
\[
\mu_k:=\frac{-\log|A_k+n|_2}{\log(3^{s_k})}
=\frac{k\log2}{s_k\log3},
\]
then the barrier \(3^{s_k}\geq2^k\) gives \(\mu_k\leq1\).  Moreover,
the factor \(q_k\to\infty\) in (2.3) makes the
approximation worse.  No Liouville-type or Roth-type contradiction is present.

The product formula is equally exact but empty of extra information.  For an
odd state,

\[
X_k:=n+A_k=\frac{2^ky_k}{3^{s_k}}
\]

satisfies

\[
|X_k|_\infty |X_k|_2 |X_k|_3
\prod_{p\ne2,3}|X_k|_p
=\frac{y_k}{q_k}\,2^{-k}3^{s_k}\,\frac1{y_k}=1.     \tag{2.4}
\]

All apparent gain at \(2\) is paid for by the denominator at \(3\), while the
unrestricted prime-to-\(6\) part of \(y_k\) closes the formula.  Applying the
same calculation to \(y_k+1\) merely replaces this unrestricted cofactor by

\[
u_k:=\frac{y_k+1}{3^{b_k}},\qquad b_k:=v_3(y_k+1).
\]

Neither the Bernstein identity nor stabilization controls \(u_k\).

## 3. The decoder cannot be forced to linear depth

From (1.3) and \(q_k\geq1\),

\[
y_k+1=q_k\left(h_k+\frac1{q_k}\right)
\leq q_k\left(n+\frac{k+5}{4}\right).
\]

It follows that

\[
\boxed{
b_k\leq \log_3q_k+
\log_3\left(n+\frac{k+5}{4}\right).}                \tag{3.1}
\]

In particular,

\[
\log q_k=o(k)\quad\Longrightarrow\quad b_k=o(k).     \tag{3.2}
\]

Thus sublinear decoder depth is forced by the elementary size bound in the
near-critical, sublinear-surplus regime.  A proof cannot expect the fixed-start
decoder itself to reach linear depth there.

There is also an exact no-gain statement for returned factors.  Suppose the
same accelerated factor of length \(L\) occurs twice.  Label the two
occurrences so that the second starting state is larger.  P21 gives

\[
x'_{\rm end}-x_{\rm end}=2t3^L,\qquad t\geq1.
\]

If the transported decoder has common depth \(b<L\), put

\[
u:=\frac{x_{\rm end}+1}{3^b},\qquad
u':=\frac{x'_{\rm end}+1}{3^b}.
\]

Then

\[
\boxed{u'-u=2t3^{L-b}.}                              \tag{3.3}
\]

Dividing by the decoder has reduced both the return modulus and the
Archimedean endpoint size by exactly \(3^b\).  For example, a size-versus-modulus
contradiction from (3.3) requires

\[
\frac{\max(x_{\rm end},x'_{\rm end})+1}{3^b}
<2\,3^{L-b},
\]

which is precisely the original condition

\[
\max(x_{\rm end},x'_{\rm end})+1<2\,3^L.             \tag{3.4}
\]

The decoder cancels.  This remains true when \(b\to\infty\) with \(b=o(L)\).
Consequently, factoring the transported decoder cannot improve P21, P23, or
P25.  New information would have to control the prime-to-\(3\) cofactors across
different return scales.

## 4. Exact finite and symbolic countermodels

P15 already defeats every finite series or product inequality after
stabilization.  Take

\[
v_L=(2,1^L,2).
\]

For arbitrarily large admissible \(r\), the seed \(n_r=2^r-1\) realizes

\[
W_r=(1^{r-1},2,v_L).
\]

Its shortcut parity word is

\[
1^{r-1}10\,10\,1^L10.
\]

Every shortcut prefix satisfies the strict barrier.  The least binary
representative has already stabilized at \(n_r\) before the last displayed
accelerated suffix, all \(L+6\) newly exposed binary lift bits are zero, and
the fresh suffix multiplier contains the factor

\[
\frac{3^{L+2}}{2^{L+4}}\longrightarrow\infty.
\]

Nevertheless the terminal decoder is zero.  Equations (1.1), (1.2), (1.7),
and (2.2) all hold on this segment.  The only moving datum is the seed \(n_r\),
and hence the stabilization threshold and stationary height.

P28 defeats a complexity repair.  Its two equal-length codewords have decoder
depth at most one, arbitrarily small positive linear surplus rate, and
exponential accelerated and shortcut factor complexity.  Every finite driver
again has a post-stabilization positive realization by P15.  Thus bounded
decoder depth does not imply periodicity, low complexity, or a forbidden
finite factor.

There is a complementary symbolic no-go with genuinely sublinear surplus.
Put

\[
\alpha:=\log_2 3,\qquad \beta:=\alpha-1,
\qquad g(t):=\beta t-\sqrt t,qquad c_t:=\lfloor g(t)\rfloor.
\]

For \(t\geq36\), define accelerated letters

\[
a_{t-35}:=1+c_t-c_{t-1}.
\]

Since

\[
\frac12<g'(x)<1\qquad(x\geq35),
\]

we have \(a_j\in\{1,2\}\).  Two consecutive letters \(1\) are impossible,
since they would give
\(\lfloor g(t+1)\rfloor=\lfloor g(t-1)\rfloor\), whereas
\(g(t+1)-g(t-1)>1\).  The length-\(m\) tail surplus is

\[
\begin{aligned}
\Sigma_m
&:=m\alpha-\sum_{j=1}^m a_j\\
&=\sqrt{35+m}-\sqrt{35}
+\{g(35+m)\}-\{g(35)\}.
\end{aligned}                                        \tag{4.1}
\]

Hence \(\Sigma_m>-1\), \(\Sigma_m\to\infty\), and
\(\Sigma_m=o(m)\).  Prepend the buffer

\[
p:=(1,2)^6.
\]

Every prefix of \(p\) has positive surplus, and its full surplus is

\[
6(2\alpha-3)=1.01955\ldots>1.
\]

Therefore every prefix of the infinite accelerated word \(pa_1a_2\cdots\)
is a strict barrier, and its shortcut expansion satisfies

\[
q_k\longrightarrow\infty,\qquad \log_2q_k=o(k).      \tag{4.2}
\]

The buffer ends in \(2\), and the tail has no adjacent letters \(1\).
The exact decoder recursion P27 therefore gives \(b\leq1\) at all subsequent
accelerated endpoints.  For each finite truncation, P15 applied to

\[
(2,p,a_1,\ldots,a_m,2)
\]

places the entire truncation after representative stabilization in one
positive ordinary strict-barrier prefix.  Its fresh surplus tends to infinity
with \(m\), while its terminal decoder is zero.

Finally, at sparse tail indices \(N_j:=2^{j^2}\), insert

\[
(2,1^j,2).
\]

These insertions have positive net surplus for \(j\geq2\), their total length
and surplus through stage \(j\) are \(O(j^2)\), and the background surplus at
\(N_j\) is of order \(\sqrt{N_j}\).  The strict barrier and (4.2) remain true.
The decoder now reaches \(j\), resets to zero, and satisfies \(b_t=o(t)\).
Thus even the condition that the decoder is unbounded but sublinear has
arbitrarily long post-stabilization positive countermodels with moving seeds.

## 5. The genuinely infinite missing estimate

The preceding identities isolate the missing input.  On a returned factor,
low decoder depth gives the cofactor separation (3.3), but the forced surplus
renewal makes the later endpoint large enough to pay for that separation.
The factor \(3^b\) gives no discount.  P15 and P28 can pay for every finite
collection of such renewals because their seed, stationary height, and last
nonzero lift position move with the tested window.

A useful fixed-seed target would therefore be a uniform cofactor-diameter or
early-renewal theorem: on one fixed ordinary ray, prove that there is an
unbounded sequence \(L_\nu\to\infty\) such that, for each \(\nu\), two
length-\(L_\nu\) occurrences have endpoint decoder depths
\(v_3(x_{\rm end}+1)=v_3(x'_{\rm end}+1)=b_\nu<L_\nu\) and prime-to-\(3\)
endpoint cofactors in an interval of diameter less than
\(2\cdot3^{L_\nu-b_\nu}\).  Equation (3.3) would then give an immediate contradiction.
Equivalently, one may prove that some required return occurs before its
endpoint surplus reaches the \(3^L\) scale forced by P23.

No identity in this note supplies that estimate.  The product formula leaves
the cofactors unrestricted, rational approximation has exponent at most one,
and summation by parts gives only the positive reciprocal mass (1.2).  What is
missing is a restriction on the sequence of prime-to-\(3\) cofactors or return
renewals across unbounded lengths with one fixed \(n\) and one fixed stationary
height.  This is the precise infinite quantifier that the P15 and P28
countermodels do not possess.
