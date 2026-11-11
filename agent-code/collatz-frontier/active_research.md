# Active Collatz research campaign

**Status:** active  
**Current attack:** conditioned inverse transducer  
**Localized gate:** propagation of exact contractions through (B/D) blockers  
**Attack stage:** theorize, then solve  
**Updated:** 27 August 2026

## Objective

We study the accelerated Collatz map on positive odd integers,

\[
U_+(n):=\frac{3n+1}{2^{v_2(3n+1)}}.
\]

Assume that an orbit is unbounded, and let \(n\) be the least positive odd
starting value with this property. It is enough to construct a positive odd
integer \(z<n\) whose orbit later merges into the orbit of \(n\). Such a
\(z\) would also have an unbounded orbit, contradicting the choice of \(n\).

The present work concerns unbounded orbits only. It gives no new
obstruction to nontrivial cycles.

## Closed inverse-predecessor results

Fix a finite segment of the orbit of \(n\), of accelerated length \(L\),
with start \(q\) and endpoint \(y\).

First, the least positive odd \(L\)-step predecessor of \(y\) is known
exactly. It is either \(q\), or the already classified local half-seed
\((q-1)/2\). Thus no same-depth predecessor gives a new smaller unbounded
starting value.

Now allow a competitor \(z\) to take \(h\) additional steps before it
reaches the same endpoint. Every exact \((L+h)\)-step predecessor factors
as an \(h\)-step inverse prefix \(E\), followed by a same-depth suffix.
Put

\[
t:=\operatorname B(E)-h,
\]

where \(\operatorname B(E)\) is the sum of the exponents in \(E\).

The formerly possible suffix start \(q+2\) is now ruled out. The proof
reduces its first record atom to 187 exact transition cases in the
distortion strip, none of which can enter the required state
\((\Delta,c)=(0,2)\). Thus the suffix start is the local half-seed, the
actual start \(q\), or a positive-defect start with \(\delta\geq1\).

The positive-defect lower bound is also sharpened. A new phase-strip
theorem gives

\[
r\geq2^\delta q-J_\delta,
\qquad
J_\delta:=\frac{2^\delta-(-1)^\delta}{3}.
\]

The proof extends the lower distortion strip to the phase immediately
after the first exponent of each nontrivial record atom. Its exceptional
part reduces to 1,030 exact canonical transitions.

The exact prefixes with \(t=0,1,2,3\) are now completely classified by
finite \(3\)-adic valuation ladders. The excess-two layer has two families.
The excess-three layer has four families. In particular, for each fixed
positive odd suffix start \(r\), there is an explicit finite horizon
\(H_{\leq3}(r)\) beyond which every exact prefix has \(t\geq4\).

## Sharp interval for every excess

Let \(E\) be an exact \(h\)-step prefix from \(z\) to \(r\), with excess
\(t\). Then

\[
2^t\left(\left(\frac23\right)^h(r+1)-\frac23\right)-\frac13
\leq z
\leq
\left(\frac23\right)^h(2^t r+1)-1.
\]

Both endpoints are sharp. Consequently every positive prefix satisfies

\[
t\geq
\max\left\{
0,
\left\lceil
\log_2\left(\frac{2(3/2)^h-1}{r}\right)
\right\rceil
\right\}.
\]

Thus the excess along an inverse path of unbounded depth to a fixed
terminal state grows with asymptotic slope at least
\(\log_2(3/2)\).

Let \(q_*\) denote the least start in the relevant suffix channel. If a
prefix has \(t\geq3\) and begins below \(n\), then it must satisfy

\[
h>
\log_{3/2}\left(
\frac{24(q_*+1)}{3n+17}
\right).
\]

Hence the entire shallower range is excluded.

## Exact carry-position squeeze

The total excess is no longer the only information retained. Write

\[
E=(1+c_1,\ldots,1+c_h),
\qquad
p_k:=\sum_{i=1}^k c_i,
\qquad
p_h=t.
\]

Let \(L_{h,t}(r)\) and \(U_{h,t}(r)\) denote the two endpoints of the
sharp interval above. The slack from those endpoints is exactly

\[
U_{h,t}(r)-z
=
\frac13\sum_{k=1}^{h-1}
\left(\frac23\right)^k(2^{p_k}-1),
\]

\[
z-L_{h,t}(r)
=
\frac13\sum_{k=1}^{h-1}
\left(\frac23\right)^k(2^t-2^{p_k}).
\]

For every \(1\leq k<h\), these identities give

\[
\frac23\left(1-\left(\frac23\right)^k\right)
(2^t-2^{p_k})
\leq z-L_{h,t}(r),
\]

\[
\left(\frac23\right)^k
\left(1-\left(\frac23\right)^{h-k}\right)
(2^{p_k}-1)
\leq U_{h,t}(r)-z.
\]

Thus a proposed bounded start must pass an explicit power-of-two screen
for every cumulative excess \(p_k\). This is a genuine refinement of the
total-excess interval, but it does not yet exclude all deep triples
\((h,t,r)\) simultaneously.

## Uniform two-atom rewrites

An exact affine-program search has produced a new local theorem. Every
two-atom record block containing

\[
C=1113
\]

has a shorter exact word which reaches the same endpoint from a uniformly
smaller start on the complete dyadic cylinder. For example,

\[
BC=121113\longmapsto1.
\]

In shifted coordinates \(X=x+1\) and \(Z=z+1\), this rewrite is

\[
Z=\frac{243}{256}X+\frac{59}{64}.
\]

The source cylinder lift is \(1024\), while the alternative lift is
\(972\). Hence descent persists for every positive lift, not only at the
least representative. There are seven cases in total:

\[
AC,\ BC,\ CA,\ CB,\ CC,\ CD,\ DC.
\]

The exact theorem and certificate are
`divergence_record_atom_pair_rewrites.tex` and
`verify_divergence_record_atom_pair_rewrites.py`.

This closes every local two-atom occurrence of \(C\). At a later record
state the new start is smaller than that record state, but it need not be
smaller than the original seed \(n\). The remaining task is to transport a
contraction through an arbitrary earlier atom prefix without losing exact
integrality.

## Cross-field audit

The critical low-excess inverse codebook has exact size

\[
\binom{h+T}{T}.
\]

At \(T=\lfloor h\log_2(3/2)\rfloor\), its exponential growth base is

\[
2.8395\ldots<3.
\]

Thus unconditioned Fourier mixing cannot cover all endpoint residues
modulo \(3^h\). It predicts exponential sparsity instead. A conditioned
canonical-spine experiment also retains positive exponential growth, so
fiber extremality alone does not force periodicity.

Modern \(\times2,\times3\) fractal-intersection theorems bound dimension,
but they do not exclude one isolated ordinary integer. Non-Archimedean
spectral theory gives a useful \(2\)-adic to \(3\)-adic reformulation, but
the converse correspondence from an arbitrary divergent integer orbit to
an irrational spectral code is itself unproved. Neither theory currently
supplies the fixed-point exclusion needed here.

The detailed audit is `divergence_cross_field_audit.md`. Its conclusion is
that the next operator must be conditioned on the stabilized ordinary
spine. The proposed state retains the dyadic lift, the \(3\)-adic decoder
depth, and the affine contraction factor. The atom-pair theorem supplies
its first exact contracting transitions.

## Remaining theorem

The sharp interval does not exclude the deep range. To finish the
inverse-predecessor attack, we must prove that none of the following can
start below \(n\), or else construct such a start and obtain the desired
contradiction:

1. a deep prefix in the minimum suffix channel;
2. a prefix over the actual \(q\)-suffix when the local half-seed is
   smaller;
3. a prefix over a positive-defect suffix
   \[
   r\geq2^\delta q-\frac{2^\delta-(-1)^\delta}{3};
   \]
4. the alternative record branch in which the word \(1113\) occurs only
   finitely often;
5. the separate horizon-exit branch.

The carry-position theorem is now closed. The current local target is to
couple its simultaneous constraints across depths and renewal scales.
A successful argument must either show that no deep triple passing every
cumulative-excess screen can occur in a remaining suffix channel, or turn
such a survivor into a new block start to which the reset or horizon
theorems apply.

## Independent companion route

A second divergence-only route remains open. On a normalized hypothetical
unbounded orbit, a positive real companion \((e_j)\) satisfies

\[
2^{a_j}e_{j+1}=3e_j-1.
\]

For

\[
m_j:=\lceil e_j\rceil,
\qquad
d_j:=2^{a_j}m_{j+1}-3m_j+1,
\]

it is proved that

\[
\sum_{\substack{j\geq0\\d_j\in\{-2,-1,0\}}}\frac1{m_j}=\infty.
\]

The remaining companion theorem is to use the paired integer orbit to
prove that this same sum is finite. That contradiction would also exclude
unbounded positive orbits, but it is logically separate from the current
inverse-predecessor attack.

For a finite strict word \(w\), let \(\rho(w)\) be its least positive
ordinary representative and let

\[
e_L^{(w)}=1,
\qquad
e_j^{(w)}=\frac{1+2^{a_j}e_{j+1}^{(w)}}3,
\qquad
\mathcal S(w)=\sum_{j<L}\frac1{e_j^{(w)}}.
\]

The Bellman candidate

\[
\mathcal S(w)\leq\rho(w)
\]

is now certified for every strict word through depth \(20{,}000{,}000\).
Since \(e_j^{(w)}\geq1\), a failure at length \(L\) can occur only when
\(\rho(w)<L\). This reduces the finite certificate to ordinary seeds below
the depth bound. Only seeds \(27\) and \(31\) enter the nontrivial regime;
the largest observed ratio is \(0.5439836955\ldots\), at seed \(27\) and
length \(32\).

The all-depth inequality would exclude divergent orbits, but it is not
proved. Its only possible failure is precisely a fixed small seed with
arbitrarily long strict prefixes, so the candidate remains a sharp
sufficient gate rather than an independent solution.
