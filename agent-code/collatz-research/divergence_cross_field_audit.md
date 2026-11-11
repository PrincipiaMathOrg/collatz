# Cross-field audit of the divergent-orbit obstruction

**Date:** 27 August 2026  
**Mode:** CALCULATE, then THEORIZE  
**Status:** two exact finite obstructions and one uniform atom-pair theorem are proved; divergent orbits are not excluded

## 1. The standard that an outside method must meet

We work with the accelerated map on positive odd integers,

\[
U_+(n):=\frac{3n+1}{2^{v_2(3n+1)}}.
\]

Assume that (n) is the least positive odd seed with an unbounded orbit.
An average statement is not enough.  A valid argument must force a smaller
positive odd integer to merge into this one fixed orbit.  Equivalently, it
must exclude one exceptional nested sequence of ordinary dyadic cylinder
representatives.

This criterion separates useful imports from methods which only prove that
the exceptional set has measure zero or small dimension.

## 2. Fourier analysis and additive combinatorics

For an inverse word (E=(e_1,\ldots,e_h)), put

\[
t(E):=\sum_{j=1}^h(e_j-1).
\]

The critical slope for a start smaller than the original suffix start is

\[
\rho:=\log_2(3/2).
\]

The exact number of inverse words satisfying (t(E)\leq T) is

\[
\binom{h+T}{T}.
\]

Each such word represents at most one admissible endpoint residue modulo
(3^h).  At (T=\lfloor\rho h\rfloor), the exponential word-count base is

\[
\Lambda
=\frac{(1+\rho)^{1+\rho}}{\rho^\rho}
=2.8395\ldots<3.
\]

Thus the proportion of endpoint residues represented by a critical inverse
word decays exponentially.  The exact rational certificate in
`verify_divergence_inverse_entropy_barrier.py` replaces the decimal
comparison by integer inequalities.

This reverses the first Fourier heuristic.  Generic equidistribution cannot
force a predecessor for every endpoint, because the critical codebook is too
small even before cancellation is considered.  A successful Fourier
argument must be conditioned on the rare representation already supplied by
the hypothetical orbit.  This is compatible with the philosophy of Tao's
Fourier treatment of logarithmic Collatz statistics, but the quantifiers are
different: an almost-all theorem does not exclude one fixed exceptional
orbit.  See [Tao, *Almost all orbits of the Collatz map attain almost bounded
values*](https://arxiv.org/abs/1909.03562).

## 3. Conditioned spines

For every represented endpoint residue, we selected the inverse word with
minimum excess and then maximum carry.  We retained only words whose every
prefix makes the same canonical choice.  This is the natural conditioned
spine suggested by inverse Littlewood-Offord theory.

The language does not collapse.  At raw depth (14), (2564) of the (3142)
record-atom words remain prefix-canonical, and (1054) survive an exact
reverse search through eight additional levels.  The canonical conditioned
language still has positive exponential growth.

Therefore a large Fourier coefficient or canonical fiber extremality does
not by itself imply periodicity or low complexity.  The missing condition is
ordinary representative stabilization at one fixed seed.

## 4. Fractal intersections and measure rigidity

The low-excess inverse language defines a sparse (3)-adic symbolic set,
while stabilization of an ordinary seed is a nested (2)-adic condition.
This resembles the intersection of invariant fractals for multiplicatively
independent maps.

The resemblance is not yet a theorem that applies.  The
Shmerkin-Wu intersection theorem bounds Hausdorff dimension of intersections
of closed invariant sets.  It permits a zero-dimensional intersection to
contain one point.  That is precisely the case which must be excluded here.
Moreover, the invariant closure of all finite binary expansions is the full
unit interval, so taking closure discards the ordinary-integer condition.
See [Wu, *A proof of Furstenberg's conjecture on the intersections of
\(\times p\) and \(\times q\)-invariant sets*](https://arxiv.org/abs/1609.08053).

Fractal rigidity becomes relevant only after one proves an additional
nonconcentration statement for the fixed spine, such as positive entropy at
the distinguished point.  No such statement is currently available.

## 5. Non-Archimedean spectral theory

Siegel constructs a function from (2)-adic branch codes to (3)-adic
values, called the Numen.  For the shortened Collatz map its formal series is

\[
\chi_3(z)
=-\frac12+\frac14\sum_{k\geq0}
\frac{3^{s_k(z)}}{2^k},
\]

where (s_k(z)) counts the (1)-digits among the first (k) binary digits
of (z).  The theory proves that an irrational (2)-adic input which maps
to an integer produces a divergent trajectory.  It also gives a Wiener-type
spectral criterion in terms of density of translates of the Fourier
transform.  See [Siegel, *\((p,q)\)-adic Analysis and the Collatz
Conjecture*](https://arxiv.org/abs/2412.02902).

The converse needed here is not proved in that work.  Producing an irrational
(2)-adic input from an arbitrary divergent integer orbit is stated there as
a correspondence conjecture.  This is the same reversal and stabilization
problem which appears in the inverse-fiber formulation.  Importing the
Numen without proving this converse would therefore hide the missing step.

The spectral formulation remains valuable because it identifies a possible
isolated-point theorem: prove that no irrational (2)-adic zero of
(\chi_3(z)-n) can have the high-surplus digit geometry of a normalized
divergent ray.  Existing Tauberian results do not prove that assertion.

## 6. A Bellman potential on the synchronized companion

For a finite strict word (w=(a_0,\ldots,a_{L-1})), let (\rho(w)) be its
least positive ordinary representative.  Put

\[
e_L^{(w)}:=1,
\qquad
e_j^{(w)}:=\frac{1+2^{a_j}e_{j+1}^{(w)}}3,
\qquad
\mathcal S(w):=\sum_{j<L}\frac1{e_j^{(w)}}.
\]

Any bound

\[
\mathcal S(w)\leq F(\rho(w)),
\qquad F(n)<\infty,
\]

would exclude divergent orbits.  The most economical candidate is

\[
\mathcal S(w)\leq\rho(w).
\]

Every (e_j^{(w)}\geq1), so (\mathcal S(w)\leq L).  A counterexample can
therefore occur only when (\rho(w)<L).  To certify all words through depth
(H), it is enough to follow the ordinary odd seeds below (H) and inspect
only strict prefixes longer than their seed.

The exact certificate `verify_bellman_representative_bound.py` verifies the
candidate through depth (20{,}000{,}000).  Only seeds (27) and (31)
enter the nontrivial regime.  The largest ratio is attained by seed (27)
at length (32):

\[
\mathcal S(w)=14.6875597789565\ldots,
\qquad
\frac{\mathcal S(w)}{27}=0.5439836955169\ldots.
\]

This is a large exact finite certificate, but it also exposes the limitation.
The only possible all-depth failure is one fixed small seed with arbitrarily
long strict prefixes.  Thus the Bellman inequality is a sharp sufficient
gate, not yet an independently easier theorem.

## 7. Formal rewrite synthesis

We treated inverse words as affine programs and searched for shorter exact
programs with the same endpoint.  This produced a uniform theorem for the
record atoms

\[
A=1,
\qquad B=12,
\qquad C=1113,
\qquad D=1122.
\]

Every two-atom block containing (C) has a shorter coalescing rewrite whose
start is smaller on the complete dyadic cylinder.  For example,

\[
BC=121113\longmapsto1,
\qquad
Z=\frac{243}{256}X+\frac{59}{64},
\]

where (X=x+1) and (Z=z+1).  The source cylinder lift is (1024), while
the alternative lift is (972), so the descent persists under every
positive lift.  The seven cases and their proof are recorded in
`divergence_record_atom_pair_rewrites.tex`; the independent exact certificate
is `verify_divergence_record_atom_pair_rewrites.py`.

This closes every local two-atom occurrence of (C).  It does not yet move a
later local descent through an arbitrary earlier atom prefix and below the
original least seed.  The earlier prefix changes the congruence class of the
alternative start, which is the arithmetic obstruction missed by a purely
affine rewrite system.

## 8. The next non-elementary target

The most concrete next object is a multi-type inverse transducer.  A state
must retain three pieces of information:

1. the ordinary dyadic lift of the current alternative start;
2. the (3)-adic decoder depth controlling which inverse letters exist;
3. the homogeneous contraction factor relating the alternative companion to
   the original companion.

The transition operator is a countable-state version of a Ruelle transfer
operator, while the desired conclusion is a Bellman or Foster-Lyapunov
inequality: every infinite path carrying the fixed ordinary lift must
eventually enter a state whose affine start is below (n).

An unconditioned spectral-radius estimate cannot work because of the entropy
barrier in Section 2.  The operator must be conditioned on the stabilized
ordinary spine.  The new atom-pair rewrites provide the first exact
contracting transitions for this transducer.  The remaining task is to prove
that the (B/D) blocker states cannot absorb all contractions indefinitely.

This is the current sharp research direction.  It imports transfer operators,
branching-process capacity, and program-termination Lyapunov methods while
retaining the fixed arithmetic data which the earlier average arguments lost.
