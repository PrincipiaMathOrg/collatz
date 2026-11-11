# The one-drop run-divisibility dichotomy

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** We prove an exact denominator-sensitive bound for every
exponent-one run. Under denominator one and failure of the critical
polynomial bound, the first run has length \(O(\log U)\), but a general
run is bounded only by

\[
\frac rN\left(U+O(\log U)\right).
\]

Beatty counting recovers the existing geometric run recursion and only a
logarithmic lower bound for the number of spikes. Moreover, all run
congruences are nested lifts of one dyadic cylinder. They do not form
independent CRT conditions. Thus the proposed run dichotomy does not close
the one-drop gate.

## 1. Exact divisibility along one run

Put

\[
N:=\lceil r\log _2 3\rceil,
\qquad e:=N-r,
\tag{1}
\]

and let \(U\) be the number of omitted mechanical two-sites. Write the
reduced rational cycle states as

\[
x_i=\frac{n_i}{d},
\qquad \gcd(n_i,d)=1,
\qquad d\text{ odd}.
\tag{2}
\]

Thus \(d=1\) is the denominator-one case. The numerator recurrence is

\[
2^{a_i}n_{i+1}=3n_i+d.
\tag{3}
\]

Suppose that \(a_s,\ldots,a_{s+L-1}\) are all equal to one. Adding \(d\)
to (3) and iterating gives

\[
n_{s+j}+d=\left(\frac32\right)^j(n_s+d)
\qquad(0\leq j\leq L).
\tag{4}
\]

Both endpoint numerators are integers. Therefore,

\[
\boxed{2^L\mid n_s+d.}
\tag{5}
\]

Let \(H_s\) be the number of omissions before time \(s\). The standard
one-drop normalization gives the state envelope

\[
x_s<2^{H_s}\left(2x_0+\frac{2s}{3}\right).
\tag{6}
\]

Define

\[
\Lambda_r:=
\log _2\left(2x_0+\frac{2r}{3}+1\right).
\tag{7}
\]

Since \(n_s+d=d(x_s+1)>0\), equations (5) through (7) give

\[
\boxed{
L<\log _2d+H_s+\Lambda_r.}
\tag{8}
\]

This is the exact place where denominator one enters. A large common odd
denominator contributes \(\log _2d\) additional run bits.

## 2. Beatty counting within the same run

Every mechanical two-site inside an exponent-one run is an omission. The
number \(W(s,L)\) of such sites satisfies

\[
W(s,L)=
\left\lfloor\frac{e(s+L)}r\right\rfloor-
\left\lfloor\frac{es}r\right\rfloor
\geq\frac{eL}{r}-1.
\tag{9}
\]

There are only \(U-H_s\) omissions left at time \(s\). Hence

\[
H_s\leq U-W(s,L)
\leq U-\frac{eL}{r}+1.
\tag{10}
\]

Combining (8) and (10), and recalling that \(N=r+e\), gives the global
run bound

\[
\boxed{
L<\frac rN
\left(U+1+\log _2d+\Lambda_r\right).}
\tag{11}
\]

For the first run, \(H_s=0\), so the sharper equation (8) gives

\[
L<\log _2d+\Lambda_r.
\tag{12}
\]

Thus denominator one makes the first run short. It does not make every
run short, because later runs may begin after many omissions.

## 3. Consequence under a failed critical polynomial gate

Suppose now that \(d=1\) and

\[
Q:=\frac{x_0+1}{2}<163U^{143/5}.
\tag{13}
\]

The transition inequality from the critical polynomial gate gives

\[
r<R(U),
\tag{14}
\]

where \(R(U)\) is the largest positive solution of

\[
R=U^2+3U+3+(2U+4)\log _2(612R^{15}).
\tag{15}
\]

Put

\[
C(U):=
\log _2\left(
652U^{143/5}+\frac{2R(U)}3+1
\right).
\tag{16}
\]

Equations (7), (13), and (14) give \(\Lambda_r<C(U)\). Also,

\[
R(U)=U^2+60U\log _2U+O(U),
\]

so

\[
C(U)=\frac{143}{5}\log _2U+O(1).
\tag{17}
\]

We have therefore proved

\[
\boxed{
L<C(U)\quad\text{for the first run},}
\tag{18}
\]

but only

\[
\boxed{
L<\frac rN\bigl(U+1+C(U)\bigr)
<\frac23\bigl(U+1+C(U)\bigr)}
\tag{19}
\]

for an arbitrary run. The last inequality uses
\(N/r>\log _2 3>3/2\).

Thus the scalar bound on \(Q\) gives a uniform \(\Theta(U)\) cap, not an
\(O(\log U)\) cap. Equation (19) agrees with the last-spike estimate in
the critical polynomial gate, whose main term is
\(U/\log _2 3\).

## 4. Beatty geometry reproduces the fixed-complement recursion

Let

\[
\ell_0,\ldots,\ell_V
\tag{20}
\]

be the exponent-one run lengths, and let \(H_j\) be the omission count at
the beginning of the \(j\)-th run. Put

\[
\beta:=\frac er,
\qquad
C_d:=\Lambda_r+\log _2d.
\tag{21}
\]

Equation (8) gives

\[
\ell_j<H_j+C_d.
\tag{22}
\]

The Beatty count in the run is at most \(\beta\ell_j+1\). Consequently,

\[
H_{j+1}
\leq(1+\beta)H_j+\beta C_d+1.
\tag{23}
\]

If \(C_d':=C_d+1/\beta\), then (23) becomes

\[
H_{j+1}+C_d'
\leq(1+\beta)(H_j+C_d').
\tag{24}
\]

Since \(H_0=0\), equations (22) through (24) give

\[
\boxed{
\ell_j<(1+\beta)^jC_d'.}
\tag{25}
\]

Here

\[
1+\beta=\frac Nr=\log _2 3+O(1/r).
\tag{26}
\]

Thus Beatty geometry gives the same geometric growth of successive run
bounds as the fixed-complement argument. Summing (25) yields

\[
r-1-V
<\frac{C_d'}{\beta}
\left((1+\beta)^{V+1}-1\right).
\tag{27}
\]

When \(d=1\) and (13) holds, \(C_d'=O(\log U)\). Equation (27) forces
only

\[
V\geq
\log_{N/r}r-O(\log\log U).
\tag{28}
\]

This is logarithmic, and it is already compatible with the unbounded
one-drop candidate range.

Even the hypothetical stronger assertion

\[
\ell_j=O(\log U)\quad(0\leq j\leq V)
\tag{29}
\]

would give only \(V\gg r/\log U\) by summing the runs. This does not
contradict

\[
U+V=e-1=(\log _2(3/2)+o(1))r.
\tag{30}
\]

For example, \(V\asymp r/\log r\) and
\(U=e-1-V\) satisfy both this count and the transition inequality. There
are more than enough mechanical two-sites to place spikes at this spacing.

## 5. The run congruences are nested

We finally check whether many runs supply independent congruences. For an
integer initial state \(x\), let

\[
A_t:=a_0+\cdots+a_{t-1},
\qquad
\mathcal C_t:=
\sum_{j=0}^{t-1}3^{t-1-j}2^{A_j}.
\tag{31}
\]

The state after \(t\) branches is

\[
x_t=\frac{3^tx+\mathcal C_t}{2^{A_t}}.
\tag{32}
\]

Exact integrality through time \(t\) is the single congruence

\[
\boxed{
3^tx+\mathcal C_t\equiv0\pmod {2^{A_t}}.}
\tag{33}
\]

Since \(3^t\) is odd, equation (33) selects one residue class modulo
\(2^{A_t}\). When \(t\) increases by one, the next branch selects one
unique lift if \(a_t=1\), or one unique lift among four if \(a_t=2\).
Therefore the solution classes form a nested chain.

In particular, the run condition

\[
2^L\mid x_s+1
\tag{34}
\]

is precisely the unique lift from the prefix cylinder at time \(s\) to
the prefix cylinder at time \(s+L\). Congruences from different runs do
not occupy independent CRT factors. They expose consecutive blocks of the
same growing dyadic residue.

The internal branches consume

\[
r-1+V=N-U-2
\tag{35}
\]

binary lift bits, and the terminal branch consumes the remaining \(U+2\)
bits. Thus the run and spike domains use exactly the \(N\) bits of the
full cylinder. There is no excess congruence. The return equation is still

\[
(2^N-3^r)x=C,
\tag{36}
\]

which is the original denominator-one condition.

## Conclusion

The run-divisibility idea gives a useful exact formula, namely (11). It
also identifies the role of the missing rational denominator through the
term \(\log _2d\). Under denominator one and a failed critical polynomial
bound, the first run is logarithmic, but later runs may have length
proportional to \(U\).

Beatty geometry turns these bounds into the same geometric recursion used
in the fixed-complement gate. If one postulates logarithmic bounds for all
runs, the resulting spike count remains compatible with the global
parameters. Finally, the run congruences are nested dyadic lifts, not
independent modular conditions. A completion theorem must therefore use
the full return class in a way which is not contained in the run domains.
