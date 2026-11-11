# Fixed-complement exclusion for one-drop cycles

**Mode:** SOLVE.

**Status:** Every fixed complement count reduces effectively to a finite
check. The cases \(V=1\) and \(V=2\) are excluded at all depths by a
run-length estimate, sharper endpoint cuts, and exact finite certificates.
The argument is not uniform when \(V\) grows with \(r\).

## 1. Setup

Fix \(r\geq2\), and put

\[
\alpha:=\log _2 3,
\qquad P:=3^r,
\qquad N:=\lceil \alpha r\rceil,
\qquad D:=2^N-P,
\qquad e:=N-r.
\tag{1}
\]

For \(0\leq i\leq r\), put

\[
B_i:=\left\lfloor\frac{iN}{r}\right\rfloor,
\qquad
E:=\{0\leq i<r-1:B_{i+1}-B_i=2\}.
\]

Then \(|E|=e-1\). In the mechanical one-drop language, choose a nonempty
set \(S\subseteq E\), and let

\[
E\setminus S=\{j_1<\cdots<j_V\}
\tag{2}
\]

be the unselected eligible sites. The preterminal word has exponent \(2\)
at these \(V\) sites and exponent \(1\) at every other site. Its terminal
exponent is \(U+2\), where

\[
U=e-1-V.
\tag{3}
\]

The carry is

\[
C=P-2^{r+V}
 +\sum_{\ell=1}^{V}2^{j_\ell+\ell}3^{r-j_\ell-1}.
\tag{4}
\]

Suppose towards a contradiction that this word is a nontrivial positive
denominator-one cycle, and write

\[
x:=\frac CD\in\mathbf Z_{>0}.
\tag{5}
\]

The prefix exponent at length \(i<r\) is
\(A_i=B_i-|S\cap[0,i)|\). Therefore

\[
A_i-i\alpha
\leq \frac{iN}{r}-i\alpha
<N-r\alpha.
\]

Thus the word satisfies the strict terminal-record hypotheses. Also,
\(U=|S|\geq1\), so its terminal exponent is the unique exponent at least
\(3\), which proves primitivity. The independent cycle-size estimate is
therefore applicable and gives

\[
x<305r^{14.3}.
\tag{6}
\]

For later use, put

\[
R_r:=306r^{143/10},
\qquad L_r:=\log _2R_r.
\tag{7}
\]

Thus \(x+1<R_r\). In the \(V=2\) range we also have \(x+2<R_r\),
because then \(r\geq 3\).

## 2. A finite reduction for every fixed \(V\)

We first record a support-independent estimate. Let \(x_i\) denote the odd
cycle value before the \(i\)-th accelerated step, and put

\[
y_i:=x_i+1.
\tag{8}
\]

Across a run of \(L\) consecutive exponent-one steps, we have

\[
y_{i+L}=\left(\frac32\right)^L y_i.
\tag{9}
\]

Both endpoints in (9) are integers. Therefore \(2^L\mid y_i\), and hence

\[
L\leq\log _2y_i,
\qquad
y_{i+L}\leq y_i^\alpha.
\tag{10}
\]

At an exponent-two step, the corresponding identity is

\[
y_{i+1}=\frac{3y_i+2}{4}\leq y_i.
\tag{11}
\]

The \(V\) exponent-two steps divide the preterminal word into \(V+1\)
runs of exponent-one steps, where a run is allowed to have length zero.
Starting from \(y_0=x+1\), equations (10) and (11) show inductively that
the \(m\)-th run has length at most

\[
\alpha^m\log _2y_0
<\alpha^mL_r.
\tag{12}
\]

Since the total length of these runs is \(r-1-V\), we obtain

\[
\boxed{
r-1-V< A_VL_r,
\qquad
A_V:=\sum_{m=0}^{V}\alpha^m.}
\tag{13}
\]

For every fixed \(V\), the right side of (13) is \(O_V(\log r)\).
Consequently, (13) fails beyond an effectively computable cutoff. In
other words, every fixed-\(V\) denominator-one branch reduces to a finite
exact check.

The same estimate quantifies how the surviving complexity must grow. Since

\[
A_V=\frac{\alpha^{V+1}-1}{\alpha-1}
<\frac{\alpha^{V+1}}{\alpha-1},
\]

every candidate with \(V\leq(r-1)/2\) satisfies

\[
\boxed{
V>
\log_{\alpha}\!\left(
\frac{(\alpha-1)(r-1)}{2L_r}
\right)-1.}
\tag{13a}
\]

If \(V>(r-1)/2\), the following lower bound is automatic. Combining this
observation with (13a), every candidate satisfies, as \(r\to\infty\),

\[
V\geq
\frac{1}{\log_2\alpha}\log_2 r-O(\log\log r)
=1.505007\ldots\log_2 r-O(\log\log r).
\tag{13b}
\]

The existing period bound makes this quantitative without an asymptotic
qualification. Every nontrivial positive cycle has

\[
r\geq72{,}057{,}431{,}991.
\]

At this endpoint, \(r<2^{37}\), so \(L_r<9+15\cdot37=564\). If
\(V\leq37\), then \(A_V\leq A_{37}<8^{38}/(3\cdot5^{37})\). Moreover,

\[
564\cdot8^{38}
<3\cdot5^{37}\bigl(72{,}057{,}431{,}991-38\bigr).
\tag{13c}
\]

The required monotonicity is elementary. Indeed,

\[
\frac{d}{dr}\frac{r-38}{L_r}
=\frac{L_r-\dfrac{143}{10\log 2}\left(1-\dfrac{38}{r}\right)}{L_r^2}
>0
\]

throughout this range, since \(\log 2>2/3\) and \(L_r>143/5\).
Therefore equations (13) and (13c) exclude every \(V\leq37\). Hence every
surviving one-drop cycle candidate satisfies

\[
\boxed{V\geq38.}
\tag{13d}
\]

In particular, any unbounded sequence of candidates must have \(V\to\infty\).
This statement does not give a uniform cutoff over all \(V\). Indeed,
\(A_V\) grows exponentially with \(V\), and \(V\) is unbounded in the full
one-drop family.

## 3. The case \(V=1\)

Let \(j:=j_1\). Equation (4) becomes

\[
C=P-2^{r+1}+2^{j+1}3^{r-j-1}.
\tag{14}
\]

Reducing \(Dx=C\) first modulo \(2^{j+1}\), and then modulo
\(3^{r-j-1}\), gives

\[
2^{j+1}\mid x+1,
\qquad
3^{r-j-1}\mid 2^{e-1}x+1.
\tag{15}
\]

Therefore

\[
j+1<L_r,
\qquad
\alpha(r-j-1)<(\alpha-1)r+L_r.
\tag{16}
\]

Here we used

\[
e-1<(\alpha-1)r,
\tag{17}
\]

which follows from \(e=\lceil\alpha r\rceil-r\) and the fact that
\(\alpha r\) is not an integer. Equations (16) imply

\[
r<(\alpha+1)L_r<\frac{13}{5}L_r,
\tag{18}
\]

since \(3^5<2^8\), and hence \(\alpha<8/5\). Thus every candidate must
satisfy

\[
2^{50r}<306^{130}r^{1859}.
\tag{19}
\]

The reverse strict inequality holds at \(r=334\). This is an exact integer
comparison. Moreover, for \(r\geq334\),

\[
\frac{2^{50(r+1)}/(r+1)^{1859}}
     {2^{50r}/r^{1859}}
=\frac{2^{50}}{(1+1/r)^{1859}}>1,
\tag{20}
\]

because \(1859<6r\), \((1+1/r)^r<3\), and \(3^6<2^{50}\).
Therefore no \(V=1\) candidate exists for \(r\geq334\).

The exact certificate checks \(2\leq r\leq333\). The only denominator-one
hit is

\[
r=2,
\qquad j=0,
\qquad U=0,
\qquad x=1.
\tag{21}
\]

This is the trivial \(1\)-cycle, and its selected set is empty. It does not
belong to the nonempty-selection one-drop branch. Hence \(V=1\) is
excluded at all depths.

## 4. The case \(V=2\)

Let \(j_1<j_2\). We have

\[
C=P-2^{r+2}
 +2^{j_1+1}3^{r-j_1-1}
 +2^{j_2+2}3^{r-j_2-1}.
\tag{22}
\]

The endpoint cuts give

\[
2^{j_1+1}\mid x+1,
\qquad
3^{r-j_2-1}\mid2^{e-2}x+1.
\tag{23}
\]

Put

\[
h:=\frac{x+1}{2^{j_1+1}}.
\tag{24}
\]

Reducing \(Dx=C\) modulo \(2^{j_2+2}\), and then dividing by the known
factor \(2^{j_1+1}\), gives the intermediate cut

\[
\boxed{
2^{j_2-j_1+1}\mid3^{j_1+1}h+1.}
\tag{25}
\]

Since every quantity in (25) is positive, we may use

\[
3^{j_1+1}h+1
=\left(\frac32\right)^{j_1+1}(x+1)+1
\leq\left(\frac32\right)^{j_1+1}(x+2)
<\left(\frac32\right)^{j_1+1}R_r.
\]

Together with (23), this gives

\[
j_1+1<L_r,
\tag{26}
\]

\[
j_2-j_1<(\alpha-1)(j_1+1)+L_r,
\tag{27}
\]

and

\[
\alpha(r-j_2-1)<(\alpha-1)r+L_r.
\tag{28}
\]

It follows that

\[
j_2+1<(\alpha+1)L_r
\tag{29}
\]

and therefore

\[
r<(\alpha^2+\alpha+1)L_r
<\frac{129}{25}L_r.
\tag{30}
\]

Consequently every candidate must satisfy

\[
2^{250r}<306^{1290}r^{18447}.
\tag{31}
\]

The reverse strict inequality holds at \(r=747\), again by an exact
integer comparison. It persists for every larger \(r\), since

\[
18447<25r,
\qquad
(1+1/r)^{18447}<3^{25}<2^{250}.
\tag{32}
\]

Thus no \(V=2\) candidate exists for \(r\geq747\). The exact certificate
checks \(2\leq r\leq746\) and finds no denominator-one hit. Hence \(V=2\)
is excluded at all depths.

## 5. Exact certificate

The script
[`cycles/one_drop_fixed_complement_certificate.js`](cycles/one_drop_fixed_complement_certificate.js)
uses integer arithmetic throughout. It verifies the analytic base
comparisons, reconstructs the exact mechanical eligible set, and checks
every one-site or two-site complement in the remaining finite ranges.
Its output is as follows.

| Complement count | Finite range | Profiles | Nontrivial profiles | Denominator-one hits | Row digest |
|---:|---:|---:|---:|---:|:---|
| \(V=1\) | \(r\leq333\) | \(32{,}364\) | \(32{,}362\) | one trivial hit (21) | `39c57fca448c00d76aa1b8aa89e97ad89a216281d0bde64690b1fc3cef577b1e` |
| \(V=2\) | \(r\leq746\) | \(23{,}562{,}030\) | \(23{,}562{,}028\) | none | `9a87aebb4cadea606af9a8e7f65ff1496282351e88e4ceb3d2f163d5dcfeec35` |

## Conclusion

The fixed-complement layers are not the unbounded core of the one-drop
problem. Every fixed value of \(V\) reduces to a finite check, and the
first two layers are now closed completely. What remains is a genuinely
uniform problem in which \(V\) grows with the period. The finite cutoffs
obtained here deteriorate with \(V\), so they do not turn the full
one-drop family into one finite computation.
