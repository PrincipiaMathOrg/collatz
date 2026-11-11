# The termwise transition and ordered-residue gate

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** We refine the unique multicut sign transition one spike at a
time. In the nonboundary terminal case, the crossing term is always the last
spike of the transition layer. The gap immediately before crossing has a
universal two-term form. Denominator one places the corresponding prefix in
an explicit top interval modulo \(D\), but the only additional ternary digit
is exactly the local \(3\)-adic digit created by the last spike. Thus
termwise order does not produce a second global congruence. It reduces the
problem to one ordered-residue equation involving the complete earlier
prefix carry.

## 1. Refining the height layer

We use the last positive cut \(H_*\) and the first negative cut
\(H_c:=H_*+1\). We assume \(H_c\leq U\). Let the transition layer contain
the chronological spike terms

\[
S_i:=2^{t_i+i}3^{r-t_i},
\qquad
a\leq i\leq b.
\tag{1}
\]

Put

\[
F_j:=F_{H_*}+\sum_{i=a}^{j}S_i,
\qquad
R_j:=E_{H_*}-\sum_{i=a}^{j}S_i.
\tag{2}
\]

Then

\[
F_j+R_j=4QD.
\tag{3}
\]

Before any term is removed, the residual is positive. After the whole layer
is removed, it is negative. Hence one term crosses the multiple \(4QD\).

**Proposition 1.** If \(H_c\leq U\), the crossing term is \(S_b\), the last
term of the transition layer.

**Proof.** Suppose that the residual became negative while a later
transition-layer spike remained. The remaining defect would then contain a
spike other than the possible terminal spike at \(r-1\). The exact suffix
sign classification says that a negative defect has no remaining spike, or
has the sole remaining spike \(r-1\). Since \(H_c\leq U\), the transition
layer ends before \(r-1\). Thus a later layer spike would force the residual
to be positive, a contradiction. \(\square\)

Let

\[
\lambda_b:=t_b+b,
\qquad
\nu:=r-t_b.
\tag{4}
\]

As in the terminal boundary theorem, write \(c=1\) when no suffix spike
remains and \(c=3\) when the sole remaining spike is \(r-1\). Put

\[
\mu:=N-U-(c-1),
\qquad
E_{H_c}=-2^\mu.
\tag{5}
\]

The positive gap immediately before the crossing is

\[
R:=4QD-F_{b-1}=S_b+E_{H_c}.
\tag{6}
\]

Therefore,

\[
\boxed{
R=2^{\lambda_b}\left(3^\nu-2^s\right),
\qquad
s:=\mu-\lambda_b.}
\tag{7}
\]

The exponent \(s\) is not profile-dependent.

**Proposition 2.** We have

\[
\boxed{
s=
\begin{cases}
\nu+1,&c=1,\\
\nu,&c=3.
\end{cases}}
\tag{8}
\]

**Proof.** In the first case, \(b=V\),
\(\mu=N-U=r+V+1\), and
\(\lambda_b=t_b+V=r-\nu+V\). Hence \(s=\nu+1\).

In the second case, the remaining spike \(r-1\) has rank \(V\), so
\(b=V-1\). Also \(\mu=N-U-2=r+V-1\) and
\(\lambda_b=t_b+V-1=r-\nu+V-1\). Hence \(s=\nu\).
\(\square\)

Thus the crossing gap is exactly

\[
\boxed{
R=
\begin{cases}
2^{\lambda_b}(3^\nu-2^{\nu+1}),&c=1,\\[3pt]
2^{\lambda_b}(3^\nu-2^\nu),&c=3.
\end{cases}}
\tag{9}
\]

No estimate has entered this formula.

## 2. The top interval modulo \(D\)

Under the failed critical gate, the centered multicut theorem gives

\[
0<\Delta_{H_*}<\frac{18}{100}D.
\tag{10}
\]

Hence \(0<R<S_b<D\). Since \(4QD\) is a multiple of \(D\),

\[
\boxed{
F_{b-1}
=(4Q-1)D+(D-R),}
\tag{11}
\]

with

\[
\boxed{
D-S_b<D-R<D.}
\tag{12}
\]

This is the exact ordered-residue statement suggested by the termwise
crossing.

Every spike term preceding \(S_b\) is divisible by
\(3^{\nu+1}\). Therefore, for an explicit integer \(B\geq0\),

\[
F_{b-1}=2^{N+1}+B3^{\nu+1}.
\tag{13}
\]

Combining (7), (11), and (13), we obtain the residual gate

\[
\boxed{
2^{N+1}+B3^{\nu+1}
=4QD
-2^{\lambda_b}\left(3^\nu-2^s\right).}
\tag{14}
\]

All termwise order and endpoint valuation information is contained in
(14). The remaining question is whether its extra power
\(3^{\nu+1}\) is independent of the terminal lock.

## 3. The apparent extra digit is local

Put

\[
T:=T_{H_c},
\qquad
L:=r-T,
\qquad
\tau:=T-t_b.
\tag{15}
\]

The mechanical slope is larger than \(1/2\), so consecutive eligible sites
are separated by at most two steps. The first omitted eligible site after
the last layer spike creates \(H_c\). Consequently,

\[
\tau\in\{1,2\},
\qquad
\nu=L+\tau.
\tag{16}
\]

Let

\[
y:=\frac{2^{U+c}x+1}{3^L},
\qquad
x:=2Q-1.
\tag{17}
\]

Reducing (13) and (11) modulo \(3^{\nu+1}\) gives

\[
R\equiv2^{N+1}x\pmod{3^{\nu+1}}.
\tag{18}
\]

Substitute (7), use

\[
N+1-\lambda_b=U+c+s,
\tag{19}
\]

and then use (17). We obtain

\[
3^\nu
\equiv
2^s\left(2^{U+c}x+1\right)
=2^s3^Ly
\pmod{3^{\nu+1}}.
\tag{20}
\]

After division by \(3^L\),

\[
\boxed{
2^sy\equiv3^\tau\pmod{3^{\tau+1}}.}
\tag{21}
\]

In particular,

\[
\boxed{v_3(y)=\tau.}
\tag{22}
\]

Equation (21) is exactly the local decoder after the last spike. Indeed,
the bottom-normalized state immediately after that spike is

\[
Z_{t_b}=\frac{3Z_{t_b-1}+1}{4}
\equiv1\pmod3.
\tag{23}
\]

The next \(\tau\) branches are ordinary, so

\[
Z_T=\frac{3^\tau}{2^\tau}Z_{t_b}.
\tag{24}
\]

If \(\ell_c:=(c+1)/2\), terminal stripping gives

\[
Z_T=2^{L-\ell_c}y.
\tag{25}
\]

Therefore,

\[
2^{\tau+L-\ell_c}\frac{y}{3^\tau}
\equiv1\pmod3.
\tag{26}
\]

In both terminal alternatives,

\[
s-(\tau+L-\ell_c)=2.
\tag{27}
\]

Since \(2^2\equiv1\pmod3\), equations (21) and (26) are the same unit
congruence. The extra digit in the ordered residue is not global. It is the
single local ternary digit already forced by the last spike.

## 4. Sharp shadows

The integer suffix shadow from the terminal boundary theorem realizes the
ordered residue at arbitrarily large \(U\). Let

\[
U\equiv39\pmod{54},
\qquad
Q=3,
\qquad
e=U+2.
\tag{28}
\]

Put

\[
y:=\frac{5\cdot2^{U+1}+1}{3},
\qquad
z:=\frac{5\cdot2^{U+5}-11}{81}.
\tag{29}
\]

Then the exact bottom-normalized suffix

\[
z
\xrightarrow{\,2\,}
\frac{3z+1}{4}
\xrightarrow{\,1\,}
\frac32\left(\frac{3z+1}{4}\right)
\xrightarrow{\,1\,}
y
\xrightarrow{\,U+2\,}
3
\tag{30}
\]

has every preterminal state larger than \(3\). Its parameters are

\[
c=1,
\quad
L=1,
\quad
\tau=2,
\quad
\nu=3,
\quad
s=4,
\tag{31}
\]

and

\[
R=2^{\lambda_b}(27-16)=11\cdot2^{\lambda_b}.
\tag{32}
\]

Moreover,

\[
16y\equiv9\pmod{27},
\tag{33}
\]

which is precisely (21). Thus exact \(q=1\) integrality, leastness, terminal
divisibility, and the ordered unit digit are mutually compatible with fixed
\(Q=3\).

There is also a full rational-cycle shadow. At every \(r\geq128\), retain
only the eligible spike \(t=r-3\). Then

\[
F_{b-1}=2^{N+1},
\qquad
4K-F_{b-1}=11\cdot2^{r-2},
\tag{34}
\]

and the termwise crossing has the exact form (9). This primitive rational
cycle is strict least, high rise, and below the critical polynomial gate,
but its reduced denominator is larger than one. Hence term order itself is
denominator-blind.

The two shadows isolate the residual issue. Local \(q=1\) arithmetic does
not contradict (14), and complete rational closure realizes it at every
depth. Only the simultaneous global requirements \(K=QD\) and the actual
prefix value \(B\) remain.

## 5. Exact audit

The checker
[one_drop_terminal_boundary_coupling_no_go_certificate.js](cycles/one_drop_terminal_boundary_coupling_no_go_certificate.js)
audits the termwise refinement together with the boundary coupling. Through
\(r=28\), it verifies all \(140065\) nonboundary positive-to-negative
transitions. In every case, it confirms that the crossing term is the last
layer spike, that (8) and (9) hold, that the preceding prefix has the form
(13), and that the apparent lift reduces to the terminal unit congruence
(21).

The checker also verifies \(101\) exact \(q=1\) shadows with
\(39\leq U\leq5439\). Its output includes

\[
\texttt{termwiseCrossingChecks=140065},
\qquad
\texttt{orderedResidueChecks=140065},
\qquad
\texttt{terminalUnitDigitChecks=140065},
\qquad
\texttt{status=PASS}.
\tag{35}
\]

The frozen SHA-256 digest of the certificate source is

\[
\texttt{f0ed434ab9c97d1ba8e7aae79e31c050b3076016c6021bdcc45dc0107976e6ff}.
\tag{36}
\]

## Conclusion

The termwise transition produces a clean ordered-residue gate, but no
contradiction. The crossing term is forced to be the last layer spike, and
the gap before crossing is the universal quantity in (9). The corresponding
prefix lies in the top interval \((D-S_b,D)\).

The extra divisibility of that prefix by \(3^{\nu+1}\) supplies only the
unit congruence \(v_3(y)=\tau\), which is already forced by the local spike
followed by \(\tau\) ordinary branches. Thus exact valuations and order do
not create a second \(q=1\)-specific condition.

The remaining one-drop statement is the ordered-residue gate (14) with
\(B\) equal to the complete actual prefix carry and \(K=QD\). Proving that
this equation has no nontrivial solution would require genuinely new control
of the global prefix. Neither the sign transition, its term order, nor its
endpoint valuations provide that control.
