# The cyclic-quotient modular-interval no-go

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** We prove that exact Beatty eligibility, strict leastness, and
asymptotically full omission density do not leave a fixed modular interval
around zero. There are primitive rational one-drop profiles for which

\[
\frac{K}{D}
\]

approaches any prescribed integer from either side. Their residues modulo
\(D\) therefore approach both endpoints of the normalized residue interval.
The exact denominator does not disappear: a long ordinary block gives an
exponential lower bound for it. This excludes the displayed counterfamily
at denominator one, but it does not exclude an arbitrary one-drop profile.
We also record why ordinary resultant nonvanishing and fixed-factor additive
arguments cannot supply the missing theorem.

## 1. The single cyclic class

Put

\[
\alpha:=\log _2 3,\qquad
N:=\lceil\alpha r\rceil,\qquad
e:=N-r,\qquad
D:=2^N-3^r.
\tag{1}
\]

Let

\[
b_t:=\left\lfloor\frac{et}{r}\right\rfloor-
\left\lfloor\frac{e(t-1)}{r}\right\rfloor
\qquad(1\leq t<r)
\tag{2}
\]

be the anchored excess clock. If

\[
T=\{t_1<\cdots<t_V\}\subseteq\{t:b_t=1\}
\tag{3}
\]

is the set of internal exponent-two times, put

\[
U:=e-1-V.
\tag{4}
\]

The bottom numerator is

\[
K:=2^{N-1}-2^{r-1+V}
 +3\sum_{k=1}^{V}2^{t_k+k-2}3^{r-1-t_k}.
\tag{5}
\]

If \(C\) is the usual cyclic carry, then

\[
2K=C+D.
\tag{6}
\]

We write

\[
Q:=\frac KD=\frac{C/D+1}{2},\qquad
h:=\frac{D}{\gcd(D,K)}=\frac{D}{\gcd(D,C)}.
\tag{7}
\]

Thus \(h\) is the reduced odd denominator of the rational orbit. The
denominator-one condition is

\[
h=1\quad\Longleftrightarrow\quad Q\in\mathbf Z.
\tag{8}
\]

It is important that (8) does not mean \(Q=1\). In fact, the first anchored
branch has exponent one. If \(h=1\), exact valuation gives
\(C/D\equiv3\pmod4\), so \(Q\) is even.

Suppose now that \(\gcd(N,r)=1\). Choose \(u,v\in\mathbf Z\) with
\(ur+vN=1\), and put

\[
g:=2^u3^v\pmod D.
\tag{9}
\]

Then \(g^r=2\) and \(g^N=3\) modulo \(D\). The sparse Laurent polynomial

\[
P_T(X):=X^{r(U+1)}+
\sum_{k=1}^{V}X^{r(U+k)-et_k}-1
\tag{10}
\]

satisfies

\[
P_T(g)\equiv u_TK\pmod D
\tag{11}
\]

for a unit \(u_T\). Consequently,

\[
\boxed{
\operatorname{ord}_{\mathbf Z/D\mathbf Z}(P_T(g))=h.}
\tag{12}
\]

In particular, \(P_T(g)=0\) is exactly the assertion \(h=1\). There is no
second quotient coordinate hidden in (10).

## 2. The ordered sum is not a fixed subset sum

The rank \(k\) in (10) is essential. Let \(t\) be inserted after exactly
\(j\) members of \(T\), and write \(T':=T\cup\{t\}\). Define

\[
L_T(X):=X^{r(U+1)}+
\sum_{k=1}^{j}X^{r(U+k)-et_k},
\tag{13}
\]

\[
R_T(X):=
\sum_{k=j+1}^{V}X^{r(U+k)-et_k}.
\tag{14}
\]

Since the new omission count is \(U-1\), direct comparison of exponents
gives

\[
\boxed{
P_{T'}(X)+1
=X^{-r}L_T(X)+X^{r(U+j)-et}+R_T(X).}
\tag{15}
\]

At \(X=g\), the factor \(X^{-r}\) is \(2^{-1}\). Thus inserting one site
adds one term and simultaneously halves the entire earlier block. Standard
subset-sum estimates for a fixed sequence do not apply to this ranked
insertion law.

There is also no profile-independent prime projection. At
\((r,N)=(30,48)\),

\[
D=13\cdot499\cdot186{,}793\cdot62{,}377,
\qquad62{,}377=7^2\cdot19\cdot67.
\tag{16}
\]

The exhaustive exact audit in the cyclotomic gcd gate proves that every
prime-power factor and every homogeneous cyclotomic factor in (16) divides
\(K\) for some anchored strict-least profile. No profile has \(D\mid K\),
and at most two of the four cyclotomic factors vanish for the same profile.
Therefore a factorwise additive argument cannot choose one surviving
factor. It must control the simultaneous CRT vector for one fixed ordered
set \(T\).

## 3. A dense family which crowds every integer

We now test whether positivity and Beatty order leave a global forbidden
arc in \(\mathbf Z/D\mathbf Z\). Put

\[
\delta_r:=N-\alpha r\in(0,1),
\qquad
V_r:=\lceil2\log _2r\rceil,
\qquad
U_r:=e-1-V_r.
\tag{17}
\]

For all sufficiently large \(r\), choose \(t_1=2\), followed by the last
\(V_r-1\) internal one-sites of the clock. Every remaining one-site is an
omission. In particular,

\[
\frac{U_r}{e-1}\longrightarrow1.
\tag{18}
\]

Thus the selected omission set is asymptotically dense in the mechanical
one-sites. The support of the Laurent sum has the opposite size:
\(V_r+1=O(\log r)\). This distinction matters. The current all-depth
candidate restrictions give only a logarithmic lower bound for \(V\), not
\(V\geq cr\). Consequently, an additive theorem which assumes linearly
dense Laurent support would not cover the remaining one-drop gate.

The clock has no factor \(00\), since \(2e/r>1\). Hence, if \(t_2\) is
the second selected site, then

\[
t_2\geq r-2V_r-2.
\tag{19}
\]

Direct affine summation gives the exact rational fixed point

\[
Q_r=
\frac{3E_r/4+1/2-2^{-U_r-2}}
     {1-2^{-\delta_r}},
\tag{20}
\]

where

\[
E_r:=\sum_{j=1}^{V_r}
\frac{3^{r-1-t_j}}{2^{N-t_j-j}}.
\tag{21}
\]

The first summand is

\[
\frac{3^{r-3}}{2^{N-3}}
=\frac8{27}2^{-\delta_r}.
\tag{22}
\]

Every remaining site lies in a suffix of length at most \(2V_r+2\), and
therefore

\[
0\leq E_r-\frac8{27}2^{-\delta_r}
\leq V_r2^{-U_r}\left(\frac32\right)^{2V_r+2}=o(1).
\tag{23}
\]

It follows, uniformly when \(\delta_r\) stays in a compact subinterval of
\((0,1)\), that

\[
\boxed{
Q_r=f(\delta_r)+o(1),
\qquad
f(\delta):=
\frac{1/2+(2/9)2^{-\delta}}
     {1-2^{-\delta}}.}
\tag{24}
\]

The function \(f\) is continuous and strictly decreasing, with

\[
f((0,1))=(11/9,\infty).
\tag{25}
\]

For every integer \(m\geq2\), the unique solution of \(f(\delta)=m\) is

\[
\boxed{
\delta_m=
\log _2\left(\frac{18m+4}{18m-9}\right).}
\tag{26}
\]

We can now state the modular-interval obstruction.

**Theorem 1, two-sided modular crowding.** For every integer \(m\geq2\)
and every \(\varepsilon>0\), there are arbitrarily large exact anchored
one-drop profiles of the form above satisfying

\[
0<\frac KD-m<\varepsilon,
\tag{27}
\]

and there are arbitrarily large such profiles satisfying

\[
0<m-\frac KD<\varepsilon.
\tag{28}
\]

Every profile is an exact positive rational cycle, has omission density
tending to one, and is strictly least at the displayed anchor. The lengths
may also be chosen so that \(\gcd(N,r)=1\), in which case the positive
integral clearing of the canonical quotient is primitive.

**Proof.** Since \(\alpha\) is irrational, the numbers

\[
\delta_r=1-\{\alpha r\}
\]

are dense in \((0,1)\). We may approach \(\delta_m\) through intervals on
either side whose widths tend to zero slowly enough that the error in
(24) is smaller than the change in \(f\). Equations (24) through (26) then
give (27) and (28).

It remains to check strict leastness. The first two maps are

\[
Q_r\longmapsto\frac32Q_r
\longmapsto\frac98Q_r+\frac14>Q_r.
\tag{29}
\]

Every branch before \(t_2\) is then ordinary. After \(t_2\), every
ordinary or spike map is bounded below by multiplication by \(3/4\).
Equations (19) and (29) show that every state in the final suffix is at
least

\[
\left(\frac32\right)^{r-2V_r-O(1)}
\left(\frac34\right)^{2V_r+O(1)}Q_r.
\tag{30}
\]

This tends to infinity, while \(Q_r\to m\). Thus every proper state is
larger than \(Q_r\).

For the coprime strengthening, the classical equidistribution theorem for
\(\{p\alpha\}\), with \(p\) restricted to the primes, permits the same
two-sided choice with \(r=p\). Since \(r<N<2r\), we have
\(\gcd(N,r)=1\). There is at least one genuine reset. If the reduced odd
state is \(n_0/h\), the cleared quotient has positive coefficients

\[
2^{U_r+1}n_0+h,
\qquad
2^{U_r-m_j}(n_j+h).
\tag{31}
\]

If an integer \(c\) divides every coefficient, the content-one endpoint
equation gives \(c\mid h\), while the first coefficient gives
\(c\mid2^{U_r+1}n_0\). Since \(h\) is odd and
\(\gcd(n_0,h)=1\), we obtain \(c=1\). The clearing is primitive. \(\square\)

Let \([K]_D\in\{0,\ldots,D-1\}\) be the least residue. The theorem gives

\[
0<[K]_D<\varepsilon D
\tag{32}
\]

along one family and

\[
(1-\varepsilon)D<[K]_D<D
\tag{33}
\]

along another. Thus positivity, exact Beatty order, strict leastness, and
dense omission support do not place the cyclic class in a fixed closed
subinterval of \((0,D)\). Taking \(m\) even shows that the crowding occurs
at the integer quotients compatible with the first-branch parity condition.

Two frozen coprime rows make the two sides concrete:

\[
\begin{array}{c|c|c|c|c|c|c}
r&N&U&V&t_2&10^6(K/D-2)&\text{digits of }h\\ \hline
317&503&168&17&290&490.\ldots&151\\
623&988&345&19&593&-4217.\ldots&297
\end{array}
\tag{33a}
\]

The displayed parts per million are truncated only for readability. The
certificate checks the exact inequalities

\[
0<K-2D<D/100,
\qquad
-D/100<K-2D<0,
\tag{33b}
\]

respectively, as well as strict leastness and primitive quotient content.

This is a normalized no-go. Equations (27) and (28) do not assert equality.
Indeed, the common denominator becomes very large.

## 4. The exact denominator remains exponential

We now quantify the distinction between approaching an integer and being
an integer. Write the reduced rational starting value as

\[
Q=\frac{p_0}{h},
\qquad \gcd(p_0,h)=1,
\qquad h\text{ odd}.
\tag{34}
\]

The first ordinary branch and the spike at time two give integer numerator
states

\[
p_1=\frac{3p_0}{2},
\qquad
p_2=\frac{3p_1+h}{4}
=\frac{9p_0+2h}{8}.
\tag{35}
\]

If the next spike is at time \(t_2\), there are \(t_2-3\) ordinary
branches after \(p_2\). Exact integrality forces

\[
2^{t_2-3}\mid p_2.
\tag{36}
\]

Since \(p_2>0\), equations (34) through (36) give the exact lower bound

\[
\boxed{
h\geq\frac{2^{t_2}}{9Q+2}.}
\tag{37}
\]

For the family in Theorem 1, equations (19) and (37) imply

\[
h\geq
\frac{2^{r-2V_r-2}}{9Q_r+2}.
\tag{38}
\]

In particular, along a subsequence with \(|Q_r-m|<\varepsilon\),

\[
\boxed{
h>
\frac{2^r}
{16r^4\bigl(9(m+\varepsilon)+2\bigr)}}
\tag{39}
\]

for all sufficiently large \(r\). The normalized residue may approach
zero, but the exact missing denominator grows exponentially.

The same conclusion holds uniformly across the whole structured family,
without restricting \(\delta_r\) near \(\delta_m\). Put

\[
R_r:=\frac{2^N}{3^r}=2^{\delta_r}.
\]

The established linear-form estimate is

\[
\frac1{R_r-1}<e^{6.125581}r^{13.3}.
\tag{39a}
\]

Since \(V_r\leq3\log _2r\) and
\(2V_r+2\leq4\log _2r+4\), equation (23) gives

\[
E_r<\frac3{10}+18r^{2.34}\log _2r.
\tag{39b}
\]

Equations (20), (39a), and (39b) now give

\[
Q_r<28e^{6.125581}r^{15.64}\log _2r.
\tag{39c}
\]

Combining this with (19) and (37), we obtain the unconditional reduced
denominator estimate

\[
\boxed{
h>
\frac{2^r}
{4064e^{6.125581}r^{19.64}\log _2r}.}
\tag{39d}
\]

Thus the full family has exponentially large reduced denominator, up to a
fixed polynomial factor. The sharper estimate (39) applies near any fixed
integer target.

There is also an all-depth exclusion for this particular structured
family. Under the assumption \(h=1\), the established cycle-state estimate
gives

\[
Q<153r^{14.3}.
\tag{40}
\]

Using \(V_r\leq2\log _2r+1\), equations (37) through (40) would give

\[
2^r<22{,}064r^{18.3}.
\tag{41}
\]

The reverse inequality holds at \(r=147\), equivalently

\[
2^{1470}>22{,}064^{10}147^{183},
\tag{42}
\]

and the ratio \(2^r/r^{18.3}\) is increasing thereafter. Hence \(h>1\)
for every member with \(r\geq147\). The exact certificate checks the 133
remaining defined rows \(14\leq r\leq146\) and also finds \(h>1\).

This all-depth exclusion is a long-run divisibility lemma. It closes the
counterfamily, not the full one-drop sector. A general candidate may place
its second spike within \(O(\log r)\) of the first and avoid (37).

## 5. The resultant verdict

Suppose again that \(\gcd(N,r)=1\), let \(\theta^r=2\), and put

\[
\mathcal O:=\mathbf Z[\theta],
\qquad
\Delta:=\theta^N-3.
\tag{43}
\]

We have

\[
\mathcal O/\Delta\mathcal O\simeq\mathbf Z/D\mathbf Z,
\qquad
|\operatorname{Norm}(\Delta)|=D.
\tag{44}
\]

Multiply \(P_T\) by a monomial so that it becomes an ordinary polynomial
\(\widetilde P_T\). The monomial is a unit modulo \(\Delta\). Therefore,

\[
P_T(g)=0
\quad\Longleftrightarrow\quad
\widetilde P_T(\theta)\in\Delta\mathcal O.
\tag{45}
\]

At the positive real embedding \(\rho=2^{1/r}\), we have

\[
P_T(\rho)>2^{U+1}-1>0.
\tag{46}
\]

Thus \(\widetilde P_T(\theta)\neq0\), and the ordinary characteristic-zero
resultant

\[
\operatorname{Res}(X^r-2,\widetilde P_T)
=\pm\operatorname{Norm}(\widetilde P_T(\theta))
\tag{47}
\]

is nonzero for every profile. If the denominator-one condition in (45)
held, then

\[
\widetilde P_T(\theta)=\Delta\Xi
\tag{48}
\]

for a nonzero algebraic integer \(\Xi\), and hence

\[
\operatorname{Res}(X^r-2,\widetilde P_T)
=\pm D\operatorname{Norm}(\Xi)\neq0.
\tag{49}
\]

Therefore ordinary resultant nonvanishing is compatible with the unwanted
congruence. The relevant assertion would be nondivisibility by \(D\), or
the ideal nonmembership in (45). By (12) and (44), that assertion is the
original cyclic-class problem.

## Conclusion

The exact one-drop obstruction is one element of one cyclic group. Three
coarser exits are now unavailable:

1. the \(r=30\) audit rules out a profile-independent prime-power or
   cyclotomic factor;
2. Theorem 1 rules out a fixed normalized modular interval obtained from
   positivity, Beatty order, strict leastness, or dense omission support;
3. equations (45) through (49) show that characteristic-zero resultant
   nonvanishing is the wrong predicate, while ideal nonmembership is the
   original congruence.

The exponential denominator bound (37) explains why the rational shadows
do not produce denominator-one examples. What remains is a simultaneous
full-modulus nonvanishing theorem for the exact ranked Beatty class. No
such all-depth theorem is proved here.

The frozen exact checks are in
[cycles/one_drop_cyclic_quotient_interval_certificate.js](cycles/one_drop_cyclic_quotient_interval_certificate.js).
