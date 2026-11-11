# The phase-debt reduction for the anchored Beatty gate

**Date:** 18 August 2026  
**Mode:** SOLVE  
**Status:** We reduce the denominator-one target to a broader clock-stopping
inequality for partial Collatz paths with no three consecutive spike
branches. We do not prove that inequality. The residue-lift induction has
one remaining transition, which we identify exactly.

## 1. The two clocks

Put

\[
\gamma:=\log _2(3/2),\qquad e:=\lceil\gamma r\rceil,
\tag{1}
\]

and write the anchored eligibility clock in reverse time as

\[
b_t:=\left\lfloor\frac{et}{r}\right\rfloor-
\left\lfloor\frac{e(t-1)}{r}\right\rfloor,
\qquad 1\leq t<r.
\tag{2}
\]

Thus a spike at time \(t\) is allowed only if \(b_t=1\). If \(V_t\)
is the number of spikes through time \(t\), then the number of omitted
eligible sites is

\[
H_t:=\left\lfloor\frac{et}{r}\right\rfloor-V_t.
\tag{3}
\]

The homogeneous coefficient of the first \(t\) branches is therefore

\[
C_t:=\frac{3^t}{2^{t+V_t}}
=2^{H_t+\rho_t},
\qquad
\rho_t:=\gamma t-\left\lfloor\frac{et}{r}\right\rfloor.
\tag{3a}
\]

Thus \(H_t\) is the integer debt coordinate, while
\(\rho_t\) is its Beatty phase.

At the leaf \(t=r-1\), we have

\[
H_{r-1}=e-1-V_{r-1}
=\lfloor\gamma r\rfloor-V_{r-1}=:U.
\tag{4}
\]

The last equality uses the irrationality of \(\gamma r\). This suggests
introducing the fixed irrational clock

\[
c_t:=\lfloor\gamma(t+1)\rfloor-\lfloor\gamma t\rfloor,
\qquad t\geq1,
\tag{5}
\]

and its discrepancy along an arbitrary partial path,

\[
D_t:=\lfloor\gamma(t+1)\rfloor-V_t.
\tag{6}
\]

Note that \(D_{r-1}=U\). The rational anchored clock in (2) controls
where spikes may occur, while the irrational clock in (5) controls the
exact terminal threshold. They agree in cumulative count at the leaf, but
they need not agree bit by bit and cannot be substituted for one another.

## 2. The run-two relaxation

We use the partial integer map

\[
F(2k):=3k,
\qquad
F(4k+1):=3k+1,
\tag{7}
\]

with an exit at integers congruent to \(3\pmod4\). We call the second
branch in (7) a spike and encode an ordinary branch by \(O\) and a spike
by \(S\).

The anchored clock has no factor \(111\), and hence an anchored branch word
has no factor \(SSS\). Indeed, if \(r\geq13\), then

\[
\frac er<\gamma+\frac1r<\frac23.
\tag{8}
\]

The sum of any three consecutive clock bits is a difference of two floors
whose arguments differ by \(3e/r<2\), so that sum is at most \(2\).
For \(3\leq r\leq12\), the only slopes above \(2/3\) occur at \(r=4\)
and \(r=7\); their clocks are respectively \(011\) and \(011011\).
The slopes equal to \(2/3\) also have no factor \(111\). Therefore every
anchored path with \(r\geq3\) belongs to the larger class of partial paths
with no three consecutive spikes. The cases \(r=1,2\) have fewer than three
clock positions and are immediate.

This leads to one broader assertion.

**Run-two clock-stopping assertion.** Let \(w\) be a valid path of length
\(t\) under (7), let \(V_t\) be its number of spikes, and suppose that
\(w\) has no factor \(SSS\). If \(q(w)\) is the least positive integer
in its dyadic cylinder, then

\[
q(w)+2\geq 2^{D_t}.
\tag{9}
\]

At an anchored leaf, (9) gives

\[
Q\geq2^U-2.
\tag{10}
\]

For \(U\geq3\), equation (10) implies \(Q>2^{U-1}\). If \(U=2\), the
only remaining boundary value is \(Q=2\), but its orbit begins
\(2\mapsto3\) and cannot complete a path of length at least two. If
\(U=1\) and \(r\geq3\), the first anchored clock bit is zero, so the first
branch is ordinary and \(Q\) is even. In particular, \(Q>1\). The remaining
case \(r=2\) is immediate: its ordinary cylinder has \(Q=2\), while its
spike cylinder has \(U=0\). Finally, if \(U\leq0\), positivity gives
\(Q\geq1>2^{U-1}\). We have therefore proved the following conditional
reduction.

**Proposition 1.** The run-two clock-stopping assertion implies the
denominator-one target

\[
Q>2^{U-1}
\tag{11}
\]

for every complete anchored cylinder.

The constant in (9) is sharp. Starting from \(q=14\), the valid branch
word through time \(17\) is

\[
OSOOOOSSOSOOSOOOS,
\tag{12}
\]

More plainly, the spike times are

\[
\{2,7,8,10,13,17\}.
\tag{13}
\]

For \(t=15,16,17\), one has

\[
D_t=4,
\qquad
q+2=16=2^{D_t}.
\tag{14}
\]

The next value is \(223\equiv3\pmod4\), so the path exits at time \(18\).
At \(r=16\), its first five spikes form an anchored leaf and give
\(Q=14\), \(U=4\), and equality in (10).

## 3. Normalized anchored renewals

The omission count in (3) gives an exact branch-independent
normalization. Put

\[
W_t:=\frac{z_t}{2^{H_t}}.
\tag{14a}
\]

At a zero clock bit, the only valid branch is ordinary and
\(W_{t+1}=3W_t/2\). At a one clock bit, an ordinary branch increments
\(H_t\), while a spike does not. Therefore

\[
W_{t+1}=
\begin{cases}
3W_t/4,&O\text{ at }b_{t+1}=1,\\[3pt]
3W_t/4+1/(4\cdot2^{H_t}),&S\text{ at }b_{t+1}=1.
\end{cases}
\tag{14b}
\]

For \(r\geq13\), the clock has neither \(00\) nor \(111\), since
\(1/2<e/r<2/3\). Apart from its two boundary pieces, it therefore
decomposes into renewal blocks \(10\) and \(110\). On a \(10\) block,
the valid patterns \(SO\) and \(OO\) give respectively

\[
W'=\frac98W+\frac{3}{8\cdot2^h},
\qquad
W'=\frac98W.
\tag{14c}
\]

On a \(110\) block, the patterns \(SSO,SOO,OSO,OOO\) give

\[
W'=\frac{27}{32}W+\frac{c}{32\cdot2^h},
\qquad
c\in\{21,9,6,0\},
\tag{14d}
\]

in the same order. Thus the anchored phase fixes the homogeneous
multiplier of every renewal. Omissions only determine which nonnegative
dyadic carry is present. These formulas explain why the phase is useful,
but they do not bound \(H_t\): the carry denominator itself is
\(2^{H_t}\). The exact residue lift is still needed.

The orbit in (12) explains the observed one-node coefficient debt. For
the anchored clocks at \(r=19\) and \(r=24\), its prefix through time
\(16\) is admissible and

\[
q=14<\frac{3^{16}}{2^{21}},
\qquad
z_{16}=297.
\tag{14e}
\]

In both clocks the next bit is zero. The next branch must therefore be
ordinary, but \(297\) is odd. The exact residue lift is nonzero and gives

\[
q'=14+2^{21}.
\tag{14f}
\]

Thus the debt does not persist to the next cylinder and cannot reach a
leaf in either case.

## 4. Exact residue-lift induction

Let \(w\) have length \(t\), spike count \(V\), least positive cylinder
representative \(q\), and endpoint \(z:=F^t(q)\). Its modulus is

\[
M:=2^{t+V}.
\tag{15}
\]

Changing the representative from \(q\) to \(q+jM\) changes the endpoint
before the next branch from \(z\) to

\[
z+j3^t.
\tag{16}
\]

Consequently, an ordinary child has

\[
j\in\{0,1\},
\qquad
j\equiv z\pmod2,
\tag{17}
\]

while a spike child has a unique \(j\in\{0,1,2,3\}\) satisfying

\[
z+j3^t\equiv1\pmod4.
\tag{18}
\]

These formulas avoid any ambiguity about the least positive lift.

Suppose that (9) holds for the parent word. A spike changes the discrepancy
by

\[
D_{t+1}-D_t=c_{t+1}-1\leq0,
\tag{19}
\]

so every spike child is safe. An ordinary branch on a zero clock bit
leaves the discrepancy unchanged, so it is also safe. If the ordinary
lift in (17) is nonzero, then it is safe even when the clock advances.
Indeed, for \(t\geq2\),

\[
\lfloor\gamma(t+1)\rfloor-V+1\leq t+V,
\tag{20}
\]

and hence

\[
q+M+2>2^{D_t+1}.
\tag{21}
\]

The smaller initial cases can be checked directly.

It follows that a first failure of (9) can arise only in the following
transition:

\[
\boxed{
c_{t+1}=1,
\qquad O\text{ is chosen},
\qquad j=0.
}
\tag{22}
\]

At that transition the previous endpoint is even, the least cylinder
representative does not change, and the discrepancy increases by one.
If the new discrepancy is \(D\), then the first failure lies in the exact
band

\[
2^{D-1}-2\leq q\leq2^D-3.
\tag{23}
\]

Thus the entire scalar induction reduces to one zero-lift clock mismatch.
The phase and omission count identify when it can occur, but they do not
rule it out.

There is an exact stabilization behind this mismatch. For a word of length
\(n\), let \(q_s\) be the least positive representative of its prefix of
length \(s\), and put \(L_s:=s+V_s\). Let \(q:=q_n\), and suppose that the
word violates (9), with terminal discrepancy \(D:=D_n\). Define

\[
\tau:=\min\{s:L_s\geq D\}.
\tag{23a}
\]

A failure has \(D\geq2\), and (20) gives \(D<L_n\). Thus \(\tau\) is
well-defined.

The prefix cylinders are nested, so

\[
q\equiv q_s\pmod {2^{L_s}}.
\tag{23b}
\]

Since \(q+2<2^D\leq2^{L_\tau}\), we have \(0<q<2^{L_\tau}\).
Therefore \(q_s=q\) for every \(s\geq\tau\). In other words, every
residue lift in the final suffix is zero. Moreover,

\[
D\leq\lfloor\gamma(n+1)\rfloor\leq n.
\]

Since \(L_s\geq s\), this gives \(L_D\geq D\). Therefore

\[
n-\tau\geq n-D.
\tag{23c}
\]

Thus a failure cannot be produced by isolated zero lifts separated by
arbitrary new representatives. It contains a terminal zero-lift segment
of length at least \(n-D\). This statement does not exclude the segment:
it says that the remaining obstruction is an actual orbit of the fixed
integer \(q\), rather than a sequence of unrelated cylinder residues.

## 5. A least counterexample is a strict-minimum excursion

There is one further exact reduction. Suppose that (9) is false, and
choose a counterexample with minimal starting value \(q\), then with
minimal length \(t\). Write \(z_m:=F^m(q)\) and let \(V_m\) be the number
of spikes through time \(m\).

We claim that

\[
z_m>q
\qquad(1\leq m<t).
\tag{24}
\]

Indeed, the affine coefficient of the first \(m\) steps is

\[
C_m:=2^{\gamma m-V_m}.
\tag{25}
\]

Since the affine correction is nonnegative, \(z_m\leq q\) implies
\(C_m\leq1\). Equality is impossible because \(\gamma m\) is not an
integer. Therefore \(C_m<1\), and hence

\[
V_m>\gamma m.
\tag{26}
\]

Let the tail have length \(t-m\). The elementary floor inequality

\[
\lfloor x-y\rfloor\geq\lfloor x\rfloor-\lceil y\rceil
\tag{27}
\]

together with (26) gives

\[
\begin{aligned}
\lfloor\gamma(t-m+1)\rfloor-(V_t-V_m)
&\geq \lfloor\gamma(t+1)\rfloor-V_t.
\end{aligned}
\tag{28}
\]

Let \(q'\) be the least positive representative of the tail cylinder.
Then \(q'\leq z_m\). If \(z_m<q\), the tail is therefore a
counterexample with a smaller starting value. If \(z_m=q\), then either
\(q'<q\), or it is a counterexample with the same starting value and
shorter length. Every conclusion contradicts the choice of \(q\) and
\(t\), which proves (24).

In other words, any failure of the run-two assertion is a strict-minimum
clock excursion born at the single transition (22), followed eventually
by the stabilized suffix in (23a) through (23c). This is the precise
delayed-debt obstruction.

## 6. What the relaxation does and does not capture

The no-three-spike hypothesis is genuinely doing work. If it is removed,
the unrestricted path at

\[
r=72,
\qquad
Q=159{,}902{,}416,
\qquad
U=28,
\qquad
V=14
\tag{29}
\]

violates (10), since

\[
159{,}902{,}416<2^{28}-2=268{,}435{,}454.
\tag{30}
\]

That path contains four consecutive spikes. Thus spike count alone does
not imply (9), while the anchored clock excludes the known exact
countermodel.

The checker
[`cycles/run2_strengthened_endpoint_fast.js`](cycles/run2_strengthened_endpoint_fast.js)
implements (17) and (18) directly. Exact runs find no violation through
every \(r\leq77\). Its node count at \(r=73\) agrees with the independent
affine-residue checker. These are finite statements only.

The remaining assertion is not a collection of independent residue
cases. It is one global clock-stopping statement: before the first exit or
the first factor \(SSS\), the discrepancy

\[
\lfloor\gamma(t+1)\rfloor-V_t
\tag{31}
\]

must never exceed \(\lfloor\log _2(q+2)\rfloor\). Equations (22) through
(24) show exactly why a scalar phase potential stalls. Ruling out that
single transition at all depths requires control of a strict-minimum
partial Collatz excursion, not another finite list of Beatty cases.
