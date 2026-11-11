# Most promising Collatz research programs

This is a criterion-based research map, not a prediction or a community poll. “Promising” here means at least one of the following: the program has an exact gate whose proof yields full Collatz, it has accumulated substantial rigorous leverage toward that gate, or a successful output would be a finite independently checkable certificate. Equivalence gates are labeled as such; repackaging Collatz is not counted as a reduction in difficulty.

The machine-readable version is [`data/approaches.json`](data/approaches.json). The exact proof obligations are expanded in [the proof skeletons](proof_skeletons.md), and original-source metadata plus archived TeX are indexed in [the literature catalog](literature.md).

## Comparative map

| Program | Role | Exact completion gate | Why it remains live | Hard boundary |
|---|---|---|---|---|
| Finite residue-cylinder descent | Finite certificate, stronger than Collatz | `OPEN-DESCENT-COVER-01` | A proposed finite cover is checkable by exact arithmetic; parity cylinders, strong sufficiency, and computation supply pruning | No finite universal cover is known to exist; long stopping times defeat shallow searches |
| String-rewrite termination | Automated equivalence route | `OPEN-REWRITE-RELTERM-01` | Ten of eleven rules are already jointly terminating; proof tools can emit certificates | The normalized exceptional macrograph is accelerated Collatz, so the gate is equivalent |
| Same-orbit synchronization and carry rigidity | Decomposed full route | `OPEN-BTS-01` plus `OPEN-CYCLE-INT-01` | This is the deepest internal branch, with certified finite sectors, exact divergence/cycle reductions, the dual-tail reciprocal-mass dichotomy, nonpositive rounding-defect localization, and the full-boundary coordinate \(\rho-Z=g\kappa\) | The divergence side still needs a coherent shell bound for defects \(-2,-1,0\); the sufficient cycle strengthening \(\kappa>0\) still needs an all-depth strict-record argument |
| Stationary inverse-fiber extinction | Strong-induction equivalence | `OPEN-FIBER-EXT-01` | Every fixed depth has a finite exact affine envelope and Bellman decomposition | The moving exposed minimum is uncontrolled, and extinction is equivalent to Collatz |
| q-series polynomiality | Algebraic conjugacy equivalence | `OPEN-QPOLY-01` | The chosen q-map is carry-free and every polynomial orbit descends in degree | Polynomiality of the true conjugate image of every integer is itself equivalent to Collatz |
| Inverse trees/difference inequalities | Quantitative input | Uniformize inverse-tree density into all-seed descent | Exact recurrences, density bounds, and modular hitting constraints can guide certificates | Density cannot exclude a sparse exceptional orbit |
| Statistical/ergodic drift | Typical-behavior input | Eliminate the deterministic exceptional set | Strong almost-all theorems reveal the correct average drift mechanism | Almost all is not all; random models do not control one fixed exceptional orbit |
| Cycle Diophantine/combinatorial bounds | Mature half-problem | `OPEN-CYCLE-INT-01`, its sufficient strengthening `OPEN-CYCLE-WIND-01`, or `OPEN-FCD-01` | Huge length/minimum bounds and rigid word reductions sharply constrain cycles; R104-R112 close one through four corners, and R115 gives an exact lifted packet container with finite fixed-corner sectors | R113-R114 show that canonical deletion can lose terminal exactness; R115 restores the bit but does not prove packet contraction, and cycle exclusion alone does not address divergence |

## Band A: finite-certificate and decomposed structural frontiers

### Finite residue-cylinder descent

The strongest classical completion criterion is finite descent:

\[
\forall n>1\;\exists k:\ T^k(n)<n.
\]

By strong induction this is equivalent to Collatz. A parity word determines a residue cylinder and an affine iterate, so any proposed cylinder-level descent certificate is decidable by exact integer arithmetic. Terras’s parity/stopping-time framework, the strongly sufficient sets of Monks et al., Applegate–Lagarias’s long-stopping-time lower bounds, and Barina’s verified range provide real constraints and search tools. The retained `SK-RDC` asks for a *finite universal* cover. That extra finiteness is stronger than Collatz, so failure at a given depth has no negative implication.

### Proof-producing rewrite termination

Yolcu, Aaronson, and Heule encode the shortcut map as an eleven-rule mixed binary–ternary string-rewrite system and prove that full termination is equivalent to Collatz. Every one-rule-deleted subsystem terminates. The project continuation selects one exceptional odd rule, proves that the remaining ten-rule system has canonical normalization, and identifies an exceptional macrostep with one accelerated odd Collatz step. `SK-YAH` therefore isolates one exact target: termination of that exceptional rule relative to the other ten. This is attractive as an automated-certificate architecture, but it is not logically weaker than Collatz after quotienting.

### Same-orbit synchronization and carry rigidity

`SK-TSC` and `SK-FCD-HSCI` are the most developed descendants of the repository’s 100-round program. They split a hypothetical counterexample into divergence and cycle obligations. The closed side includes the affine word calculus, a certified target-one theorem in the negative shadow, fixed-deficit classifications, normalized strict-barrier rays, cross-depth return laws, a fixed real \(3x-1\) companion whose reciprocal mass diverges while that of the paired integer \(3x+1\) orbit converges, and a ceiling cocycle which forces divergent mass onto defects \(-2,-1,0\). The frontier is no longer “find another local inequality”: exact countermodels show that a successful theorem must synchronize infinitely many scales on one actual orbit, control coherence across those rounding defects, and detect the denominator-one integer lift missed by rational and 2-adic shadows.

## Band B: exact structural equivalences

### Stationary inverse-fiber extinction

At depth \(r\), let \(M_r(n)\) be the least positive odd integer sharing the same \(r\)-step endpoint as \(n\). Proving \(M_r(n)<n\) for some depth for every \(n>1\) gives Collatz by strong induction. The repository has a finite affine envelope and a nested Bellman decomposition for each fixed depth. The unresolved issue is uniform control of a minimum whose exposed branch changes with depth. `SK-INV` is exact and conceptually clean, but its gate is equivalent to Collatz.

### q-series conjugacy and polynomiality

Monks constructs maps \(T_{A,B}\) on \(\mathbf F_2[[q]]\) conjugate to the shortcut map on \(\mathbf Z_2\). For \(T_{1,1+q^2}\), every polynomial orbit stays polynomial and strictly decreases in degree until it reaches \(\{1,q\}\) or one of two fixed points. The full problem is therefore localized to whether an actual conjugacy \(H\) maps every positive integer to a polynomial. The paper explicitly proves this polynomiality conjecture equivalent to Collatz. `SK-QPOLY` preserves the approach because its carry-free algebra may suggest new invariants, while `NOGO-QANALOG-01` prevents the common mistake of using the natural coefficient correspondence, which is not a conjugacy.

## Band C: rigorous enabling programs

### Inverse trees and difference inequalities

Krasikov and Lagarias use difference inequalities to prove a power-law lower bound on the set of integers known to reach 1. Modular inverse graphs and strongly sufficient sets give exact orbit-hitting constraints. These results can strengthen `SK-RDC` or `SK-INV`, but density by itself cannot exclude one sparse exceptional orbit. A terminal version needs a deterministic uniformization theorem.

### Statistical and ergodic drift

Terras, Lagarias–Weiss, Kontorovich–Sinai, and Tao make the heuristic negative drift mathematically precise in increasingly strong ways; Tao proves almost-bounded minima for logarithmic-density almost every starting value. This is among the strongest global evidence about typical trajectories. Its exact boundary is equally important: a density-zero exceptional set may contain a divergent orbit or cycle. The program becomes a full-proof route only after a deterministic exceptional-set elimination mechanism is added.

### Cycle Diophantine bounds and combinatorics

Verification bounds, logarithmic forms, local-minimum counts, valuation words, Christoffel extremality, first crossings, and denominator divisibility give a mature attack on nontrivial cycles. The repository consolidates these inputs inside `SK-TSC` and `SK-FCD-HSCI`; it does not create a cycle-only full skeleton, because even perfect cycle exclusion leaves divergence untouched.

The newest FCD refinement is exact but incomplete. The sharp height
recurrence forces a superlinear-over-logarithmic terminal-preserving corner
cube. An attempted next step imposed odd endpoint parity on every vertex,
which would force every corner threshold \(V_c\) even and every dyadic
subset wrap to vanish. R113-R114 correct that attempted step. Canonical
corner deletion can
change an odd terminal endpoint to an even one. Consequently,
\(V_c\bmod2\) does not determine the actual dyadic wrap, and the proposed
fixed centered-filter minimum is conditional only. R115 introduces the
exact lift modulo \(2M\), packages arbitrary corner sets, and proves every
fixed-corner sector finite. The localized residual is packet contraction
inside the \(q_s=2\) branch. An exact scan through \(s=20\) refutes
exactness-only contraction, so any valid argument must also use FCD color.
Full FCD still requires an all-weight treatment
of the state-dependent wraps together with the absolute anchored carry.

## Research-order recommendation

For the cycle branch, the most sharply localized theorem target is now
`OPEN-FCD-PACKET-CONTRACTION-01`. The lift coordinate is exact, but no
argument yet finds a proper deletion that preserves both terminal exactness
and non-descent. Exactness by itself is insufficient. This remains a
cycle-only advance.

For a full Collatz route, the requested research priority is now the
divergence side: first `OPEN-HSCI-SYNC-SHELL-01`, which asks for a
summable shell bound on the ceiling defects \(-2,-1,0\) along one infinite
ray and thereby closes `OPEN-HSCI-01`, and then
`OPEN-BTS-01`, which asks for binary-ternary stabilization across infinitely
many renewal scales.

For proof engineering, the best near-term targets are the certificate interfaces: attempt machine-checkable relative-termination invariants for `SK-YAH`, and search for exact residue-cylinder descent certificates for `SK-RDC` while proving soundness independently of the search. For theorem development, the most informative internal gates are the same-orbit synchronization and denominator-one obstructions, because the 100-round audit has already eliminated many tempting local substitutes. The inverse-fiber and q-polynomiality routes should be treated as clean coordinate systems in which to discover a genuinely new invariant—not as evidence that the main difficulty has disappeared.

No approach in this document is reported as a proof of Collatz.
