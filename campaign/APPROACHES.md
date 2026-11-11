# Collatz — 100 ranked research programs (verbatim source)

Supplied by Anton Shakov on 2026-08-13. This file is the campaign's source of truth. **Each
approach is sent to GPT-5 Pro character for character from this file.** No paraphrase, no
tidying, no expansion, no merging or splitting — a reformulated approach is a different
experiment and the round is wasted.

Ranking criterion: how surprising it would be if the approach worked, while it still has a
recognizable mathematical mechanism by which it could work — **not** a ranking by probability
of success. Tags: **Established** / **Hybrid** / **Speculative**, and
**P** (proof), **D** (disproof), **B** (either).

Each round's prompt is exactly:

```
Complete a full [proof or disproof] of the [problem] using the following approach:

[the approach, word for word]

Take as long as you need.
```

The front (proof/disproof) is whatever the approach itself says; **P**→proof, **D**→disproof,
**B**→proof unless the entry says otherwise.

NOTE ON SCOPE: this file carries the **100 numbered approaches** verbatim (section 3 of the
source document). The surrounding survey — the algebra in section 1, the literature review in
section 2, the mechanism taxonomy in section 4, and the effort allocation in section 5 — is
context rather than approach text and is not reproduced here.

---

## Tier I: moonshots that attack the actual bottleneck

### 1. Adelic two-ended renormalization of valuation words

**Hybrid · B**

A counterexample word must pass three tests at every scale:

archimedean growth, 2-adic seed realizability, 3-adic endpoint/carry compatibility.

Construct a renormalization state combining a normalized height such as

h_j = A_j - j log_2 3,

a 2^r-residue representing the admissible seed cylinder, and a 3^r-residue representing the
endpoint carry. Your terminal-suffix locality result suggests that part of the 3-adic state can
be updated using only the last r valuations.

The proof route is to show that all nontrivial recurrent states vanish as r -> infinity. The
disproof route is to find a compatible projective fixed point whose inverse limit lifts to one
ordinary positive integer. Recent multi-place preprints are adjacent to this idea, but I did not
find this exact finite-state renormalization.

### 2. Furstenberg-style (x2, x3) measure rigidity

**Speculative · B**

Assume a divergent orbit exists and form empirical measures from its logarithmic height, binary
cylinder, and ternary carry state on an adelic solenoid. Try to derive an invariant joining with
actions related to multiplication by 2 and 3.

A rigidity dichotomy might say:

* positive entropy forces a Haar-like measure, contradicting the exact carry identities or
  positivity;
* zero entropy forces algebraic or eventually periodic structure, reducing the orbit to a
  forbidden cycle equation.

The difficulty is establishing enough recurrence to produce a probability measure rather than
losing all mass at infinity.

### 3. Turn the q-analogue into a polynomialization theorem

**Established/Hybrid · P**

Under the known conjugacy Z_2 <-> F_2[[q]], positive integers become a special family of formal
power series. Prove that every series in this family eventually becomes a polynomial, or enters
the polynomial basin, under a carefully chosen conjugate q-map. Polynomial inputs already have
terminating behavior in the natural analogue.

The hoped-for invariant could be support entropy, gap growth, a valuation filtration, or a
noetherian ideal attached to the coefficient sequence. This would be an astonishing proof:
ordinary integer termination would follow from eventual finite support in a formal series.

### 4. A Cobham trap for counterexample carry streams

**Hybrid · P**

Base 2 determines the parity/seed side, while base 3 controls endpoint carries. Try to prove that
the carry sequence of any infinite positive-integer counterexample is simultaneously describable
by finite transducers in multiplicatively independent bases 2 and 3.

A Cobham-Semenov-type rigidity theorem would then force eventual periodicity. Eventual
periodicity should lead to a rational 2-adic point and, after imposing positivity and the affine
identity, to a cycle equation.

The whole Collatz transition relation is not base-2 automatic, so the target must be the highly
restricted stream associated with a hypothetical counterexample, not the full relation.

### 5. Prove simplicity or irreducibility of the Collatz C*-algebra

**Established/Hybrid · P**

Mori's operator-algebraic encoding says that Collatz is equivalent to the absence of nontrivial
reducing subspaces for a natural algebra. Attack this through:

* a gauge action and KMS-state uniqueness;
* direct computation of the commutant;
* Cuntz-Pimsner simplicity criteria;
* groupoid minimality plus topological principality.

The essential requirement is that the operator-algebra theorem be established from local
algebraic relations, not by silently restating orbit connectivity.

### 6. Sheaf cohomology for gluing modular Lyapunov functions

**Speculative · P**

For many moduli M, one can hope to construct local descent potentials

V_M(n) = log n + phi_M(n mod M)

that work on most residue classes. Regard these potentials as local sections on a system of
congruence covers.

Failure to glue them into one global potential would define a cohomological obstruction. Prove
that the relevant H^1 vanishes under refinement, and the local certificates glue into a global
Lyapunov function. A counterexample would instead produce a persistent nonzero class.

### 7. Compute the K-theory of the Collatz orbit groupoid

**Speculative · B**

Construct the etale groupoid generated by forward and inverse Collatz branches, with a boundary
recording ends of the inverse tree. A nontrivial cycle or divergent component may create a K_0,
K_1, or index class absent from the trivial component.

Approximate the groupoid by finite modular graphs and compute the induced maps on K-groups.
Stabilization to the trivial class would prove connectivity; a persistent class would identify a
structured obstruction or candidate counterexample.

### 8. Thermodynamic formalism with an arithmetic integrality potential

**Hybrid · B**

Place a potential on valuation words,

Phi(w) = archimedean drift + lambda * integrality penalty + mu * carry penalty.

Study pressure, equilibrium states, and zero-temperature limits for the resulting countable
symbolic system.

A proof would show that the only ground state compatible with zero arithmetic penalty is the
trivial cycle. A nontrivial equilibrium state concentrated on exactly realizable critical words
would provide a statistical blueprint for a counterexample.

### 9. An o-minimal rational-point explosion theorem

**Speculative · P**

A long near-critical word produces exponential relations among 2^{A_j}, 3^j, C_j, n, U^j(n).
Encode families of such relations as rational points near a definable exponential surface. A
divergent orbit would supply arbitrarily many coherent rational points of unusually small height.

Apply a Pila-Wilkie-type dichotomy: either there are few such points, contradicting the orbit, or
the points lie on a hidden algebraic locus. The latter should force a repeated block and
therefore a cycle equation.

### 10. A canonical height on a parity orbifold

**Speculative · P**

Resolve the piecewise definition of T by enlarging the space with a parity label, making Collatz
an algebraic correspondence rather than a discontinuous map. Seek a canonical height

hhat(Tx) = lambda * hhat(x) + O(1)

with local contributions at infinity, 2, and 3.

Northcott-type finiteness and the product formula might imply that every integral orbit either
enters a finite height-zero set or violates a local-height inequality. The trivial cycle would be
the only height-zero integral orbit.

### 11. Arithmetic Conley index at infinity

**Speculative · B**

Compactify the directed Collatz graph by adding its possible ends. A divergent orbit becomes an
invariant set on the boundary. Define an isolating neighborhood and calculate a discrete Conley
index.

A trivial index at infinity would exclude divergent trajectories. A nontrivial index could force
an invariant end and give a topologically certified route toward a counterexample.

### 12. Proof-theoretic ordinal descent

**Hybrid · P**

The mixed binary-ternary rewriting formulation suggests assigning an ordinal, rather than an
ordinary numerical weight, to each digit string. Find an ordinal-valued rank that strictly
decreases under every complete rewrite block.

A rank below a familiar proof-theoretic ordinal would prove termination. Failure patterns could
also calibrate why standard matrix orders and low-complexity termination methods fail.
Generalized Collatz undecidability makes this route less absurd than it first sounds, although it
says nothing directly about the original map.

### 13. Exact arithmetic optimal transport extending Tao

**Hybrid · P**

Tao obtains approximate transport for probability distributions. Enrich the state by enough
residue and carry data that the transport operator becomes an exact or uniformly contracting map
in Wasserstein distance.

The decisive theorem would be contraction **uniformly over every starting cylinder**, rather than
after averaging over starts. That would convert a law-of-large-numbers result into a pointwise
theorem and close the precise gap in the almost-all approach.

### 14. Mixed 2-adic/3-adic Kakeya or decoupling

**Speculative · P**

A length-j critical word defines both a thin 2-adic seed tube and a thin 3-adic endpoint tube. An
infinite counterexample is a nested intersection of such tubes, together with a real drift
restriction.

Develop a multi-place incidence theorem showing that tubes with the necessary directions cannot
have an infinite coherent intersection. This would be an arithmetic analogue of ruling out a
Kakeya configuration by dimension or decoupling estimates.

### 15. Lee-Yang zeros of a Collatz partition function

**Speculative · B**

Define a finite-depth partition function

Z_j(beta, gamma) = sum over w of exp(-beta * drift(w)) * exp(-gamma * defect(w)),

where the defect measures failure of exact integer realizability.

A uniform zero-free region could give analyticity of the limiting pressure and exponential
extinction of realizable critical words. Conversely, zeros pinching the physical axis could
indicate a genuine phase transition associated with a nontrivial infinite survivor set.

### 16. A quantum-graph trace formula for cycles and escape

**Speculative · B**

Turn each inverse branch into a scattering edge carrying its affine phase. Primitive closed paths
are then Collatz cycle words, while resonances near the unit circle encode long-lived or escaping
trajectories.

An exact trace formula might reduce cycle exclusion to positivity or cancellation in a spectral
density. The main danger is that the spectral object merely stores the original cycles without
introducing any new rigidity.

### 17. Tropicalize the cycle and near-cycle equations

**Speculative · B**

The cycle relation (2^A - 3^j) n = C_w contains competing exponential scales and large sums.
Tropicalization records which terms dominate at every place.

Classify all possible tropical rays representing infinite near-cycles and prove that none lift to
integral solutions. A lift of a nontrivial tropical ray would instead give a sharply structured
family in which to search for a cycle or divergent orbit.

### 18. A Kolmogorov-complexity contradiction

**Speculative · P**

To grow, an orbit's valuation word must be atypical enough to have deficient powers of two. To
remain integrally realizable, its long prefix is nevertheless determined by a finite binary seed
residue.

Try to prove that these two requirements force contradictory complexity estimates: positive drift
requires a high-complexity sequence, while simultaneous 2-adic and 3-adic compatibility makes it
compressible. This must be an effective theorem, not the informal claim that Collatz "looks
random."

### 19. Terminal-suffix transducer with a vanishing joint spectral radius

**Hybrid · B**

This is the most concrete version of the multi-place idea. For each r, build a finite or finitely
weighted automaton whose state records:

(a_{j-r}, ..., a_{j-1}), C_j + 2^{A_j} mod 3^r, and a discretized archimedean barrier state.

Your terminal-suffix locality theorem makes the 3^r-condition genuinely local. Prove that the
joint spectral radius of the nontrivial survivor transitions is < 1, uniformly or increasingly
strongly with r. A persistent recurrent component would be a precise disproof-search target
rather than a vague long trajectory.

### 20. Ultraproduct rigidity of minimal counterexamples

**Speculative · B**

Assume there are arbitrarily long counterexample-like trajectories and pass to a nonstandard
model. Saturation produces an orbit surviving for a nonstandard number of steps, potentially with
a well-defined asymptotic valuation frequency and normalized affine carry.

Show that such an object acquires a scaling or translation symmetry. If that symmetry forces
periodicity, transfer it back to a forbidden finite cycle; if it instead yields a standard
initial segment with a uniform escape invariant, it could lead toward a divergent counterexample.

---

## Tier II: cross-field hybrids with crisp possible win conditions

### 21. Additive-combinatorial inverse theorem for growth words

**Hybrid · P**

Show that a valuation word with many prefixes satisfying A_t <~ t log_2 3 must have additive
structure: approximate periodicity, small doubling among partial sums, or concentration in a
generalized arithmetic progression. Convert that structure into a repeated valuation block and
then into an impossible cycle or carry congruence.

### 22. Entropy decrement plus arithmetic rigidity

**Hybrid · P**

Adapt Tao's entropy-decrement philosophy to a single exceptional orbit. Either distant valuation
blocks decorrelate, giving negative drift, or mutual information remains large and repeatedly
lowers entropy. Eventually the word should become finite-state or almost periodic, where exact
integrality can rule it out.

### 23. A pointwise Bellman function

**Hybrid · P**

Search for a function V(n) = log n + phi(n mod M) and a bounded stopping rule k(n) <= K such that
V(T^{k(n)} n) < V(n) for every n > 1. A successful finite table for phi, together with exact
inequalities for every residue class, would be a complete proof.

### 24. Sum-of-squares Lyapunov certificates

**Speculative · P**

Normalize each affine branch and encode a block of Collatz steps as polynomial inequalities on a
real size variable and finitely many residue indicators. Use semidefinite programming to discover
a sum-of-squares certificate of contraction, then rationalize and verify it exactly.

### 25. Counterexample-guided abstraction refinement

**Hybrid · P**

Begin with a coarse finite abstraction recording a modulus and height band. Ask a model checker
for a nonterminating abstract path. If the path is spurious, add the residue or carry information
responsible for the failure.

Termination of the refinement process with no recurrent bad component would produce a finite
proof certificate. Nontermination might reveal the exact state variables missing from present
approaches.

### 26. A genuinely new reduction order for mixed binary-ternary rewriting

**Established/Hybrid · P**

The rewriting formulation is equivalent to Collatz, but standard natural and arctic matrix
interpretations do not suffice. Search for context-sensitive polynomial orders, dependency-pair
orders with semantic labels, or orders taking values in ordered noncommutative series.

### 27. Digit-block ordinals below epsilon_0

**Speculative · P**

Interpret alternating binary and ternary blocks as coefficients in a Cantor normal form. Arrange
the representation so that carries may temporarily increase ordinary length while decreasing a
higher ordinal component.

### 28. Well-structured transition systems

**Speculative · P**

Find a well-quasi-order on carry configurations under which the Collatz transducer is monotone.
Then nontermination or reachability may reduce to finitely many minimal bad configurations. The
major issue is that multiplication by 3 and right shifting do not respect obvious digitwise
orders.

### 29. Cellular-automaton nilpotency

**Established/Hybrid · B**

Use the exact quasi-cellular automaton representation. Prove that every finite-support initial row
eventually loses all nontrivial information and enters the periodic background. A persistent
glider or spaceship compatible with finite binary support could instead encode a divergent orbit.

### 30. Base-6 carry particles

**Speculative · B**

Because 6 simultaneously contains the primes 2 and 3, represent the orbit in base 6 and model
carries as interacting particles. Classify all persistent particle configurations. A nontrivial
glider would be a counterexample mechanism; extinction of every finite configuration would prove
convergence.

### 31. Rotor-router inverse branching

**Speculative · P**

Replace the probabilistic inverse-tree model by a rotor-router or deterministic branching process
with provably bounded discrepancy from the random model. Then show the actual Collatz inverse tree
is sandwiched by such a process and must cover all residue classes.

### 32. Electrical capacity of infinity

**Speculative · P**

Assign conductances to inverse-tree edges based on their multiplicative expansion. Prove that
infinity has zero effective capacity relative to the component of 1, forcing recurrence toward the
root. The challenge is converting a directed arithmetic graph into a network whose recurrence has
pointwise dynamical meaning.

### 33. Sandpile stabilization

**Speculative · P**

Encode binary carries, ternary carries, and valuation deficits as chips on a graph. A Collatz step
becomes a legal firing sequence. Prove that every finite configuration stabilizes to the trivial
recurrent state.

### 34. Directed-polymer free energy

**Speculative · P**

Treat critical valuation words as polymers in a deterministic arithmetic environment. Establish a
strictly negative quenched free energy after incorporating exact residue constraints — not merely
the negative annealed drift seen by random words.

### 35. Dependent percolation domination

**Hybrid · P**

At each depth, call a branch "open" if it remains growth-compatible and integrally realizable.
Prove that the resulting highly dependent tree is dominated by a subcritical percolation process,
perhaps after grouping levels into blocks.

### 36. An algorithmic Lovasz local lemma

**Speculative · P**

Construct local "death events" that cover every infinite critical word. A dependency-graph
argument or resampling certificate could show that no assignment avoids all death events, even
though each individual condition is local.

### 37. Coding-theoretic minimum distance

**Speculative · P**

View the valuation/carry words generated by different seed classes as a code. Prove that
sustained-growth words lie in a region whose distance from the realizable code exceeds the
covering radius.

### 38. List decoding of valuation profiles

**Speculative · B**

Given a coarse growth profile, bound how many residue classes modulo 2^k can realize it while also
satisfying specified endpoint conditions modulo 3^r. Show that the list size eventually becomes
zero — or find a uniquely surviving nested sequence that could encode a counterexample.

### 39. An information-capacity bound

**Speculative · P**

A seed supplies k low binary bits to determine a length-k parity prefix. Simultaneously satisfying
increasingly precise ternary endpoint conditions consumes additional information. Formalize this
as a communication or data-processing inequality and prove the combined demands exceed the
information available from one seed.

### 40. Mahler-function transcendence of parity series

**Speculative · P**

Associate to an orbit a generating series F(z) = sum over j >= 0 of epsilon_j z^j, or a
carry-weighted variant. Derive functional equations from the Collatz recursion. Show that a
counterexample would force F to be both highly transcendental and algebraic or meromorphic of a
prohibited type.

### 41. Christol-Cobham algebraicity trap

**Speculative · P**

Reduce an orbit-generating series modulo suitable primes. Algebraicity over a finite field would
imply automaticity; automaticity in two independent bases would force periodic structure. The real
work is deriving algebraicity from exact affine carries rather than assuming it.

### 42. Aperiodic tilings of Collatz spacetime

**Speculative · B**

Build local Wang tiles whose horizontal direction performs binary iteration and whose vertical
direction performs ternary conversion. Prove that every tiling with a finite-support boundary
becomes periodic, or find an aperiodic finite-boundary tiling corresponding to an infinite orbit.

### 43. A topological-entropy gap

**Hybrid · P**

Let X_int be the subshift of valuation words realized by positive integers and X_crit the subshift
with nonnegative long-term drift. Prove that their finite-word intersection has exponentially
shrinking branching and no infinite path.

Entropy alone cannot prove emptiness, so this needs a hereditary or compactness property turning
exponential scarcity into extinction.

### 44. Schmidt-game avoidance in Z_2

**Speculative · P**

Define the 2-adic set of infinite parity sequences with nonnegative archimedean drift. Prove that
it is avoidable by a winning strategy whose forbidden set contains every embedded positive integer
— or conversely that it is winning and therefore large enough to motivate disproof searches.

### 45. Arithmetic fractal intersection

**Speculative · B**

Estimate the Hausdorff dimensions of the critical-drift set, the 3-adic carry-compatible set, and
the image of positive integers under parity conjugacy. A sufficiently strong transversality
theorem could show their triple intersection is empty.

---

## Tier III: advanced arithmetic and spectral attacks

### 46. An adelic product-formula Lyapunov height

**Hybrid · P**

Define local escape energies H_infinity, H_2, H_3 whose changes under one accelerated step can be
calculated exactly. Seek positive weights such that the product formula forces their total to
decrease outside the trivial cycle.

### 47. Vojta or abc for uniform near-cycle exclusion

**Hybrid · P**

Applications of linear forms in logarithms already constrain exact cycles, and possible
relationships with abc-type inequalities have been studied. The stronger target is to rule out
arbitrarily long **near-cycles**, with uniform control of the radical of the affine numerator C_j.

### 48. The Subspace Theorem for trajectory identities

**Speculative · P**

Long trajectories create many relations involving powers of 2, powers of 3, and partial carry
sums. Recast these as families of S-unit inequalities. If too many unusually close cancellations
occur, the Subspace Theorem should force a fixed linear dependence and hence repetitive dynamics.

### 49. Baker theory for repeated approximate returns

**Hybrid · P**

Cycle work controls one exceptionally small quantity |A log 2 - j log 3|. A divergent orbit with
recurrent near-descents may create infinitely many related small forms. Prove that their shared
coefficients or nesting make them collectively impossible, even when each individual approximation
is allowed.

### 50. Geometry-of-numbers exclusion cones

**Speculative · B**

Embed exponent words as lattice points involving j, A_j, and selected carry coordinates. Sustained
growth confines them to a narrow cone, while integrality removes periodic sublattices. Show the
remaining cone is lattice-free beyond a finite radius.

### 51. Automorphic dynamics of the affine branch semigroup

**Speculative · P**

Represent accelerated branches by matrices such as [[3, 1], [0, 2^a]] inside an adelic affine
group. Use automorphic mixing, height recurrence, or nonescape of mass to control all integral
products.

### 52. Property-tau for Collatz residue graphs

**Speculative · P**

Study transition graphs modulo a family of moduli involving both powers of 2 and powers of 3.
Prove uniform expansion. Combine expansion with the order structure of positive integers to show
that an exceptional orbit cannot stay trapped in a shrinking family of bad residues.

### 53. A thin-group affine sieve

**Speculative · B**

The semigroup of branch matrices may form a thin orbit in an algebraic group. Sieve its orbit for
the divisibility properties required by a cycle or critical trajectory. An unexpectedly surviving
local pattern could identify a counterexample family.

### 54. Bourgain-Gamburd flattening for branch products

**Speculative · P**

Show that products of admissible inverse branches become equidistributed modulo suitable primes
unless they lie in a structured subgroup. Then classify the structured case and rule it out by
positivity or cycle equations.

### 55. Sum-product growth modulo 3^r

**Hybrid · P**

The possible carry residues generated by many prefixes should expand rapidly under additions and
multiplication by powers of 2 and 3. Prove that a critical survivor set cannot remain inside the
small collection of residues needed for repeated 3-adic rescue.

### 56. A cross-prime uncertainty principle

**Speculative · P**

A counterexample prefix is sharply localized in a 2-adic seed cylinder and a 3-adic endpoint
cylinder. Develop an uncertainty inequality saying a nonzero arithmetic measure cannot remain
simultaneously localized at both primes over arbitrarily many scales.

### 57. 2-adic Haar-wavelet diagonalization

**Hybrid · P**

Express the Collatz transfer operator in a 2-adic wavelet basis. Seek a spectral gap on the
subspace corresponding to ordinary positive integers or finitely supported binary expansions,
rather than on all of Z_2.

### 58. Ruelle-Perron-Frobenius theory for exact survivors

**Hybrid · P**

Construct a transfer operator whose branches are weighted by the exact multiplicity of seed
classes surviving both drift and carry constraints. A spectral radius < 1 for the nontrivial
sector would imply extinction of all infinite survivors.

### 59. A coercive Koopman eigenfunction

**Hybrid · P**

Find a function F(n) -> infinity satisfying a strict superharmonic relation such as
F(Tn) <= F(n) - delta after a bounded induced return time. Functional-analysis formulations
already connect orbit structures to fixed points and invariant subspaces; the new ingredient would
be coercivity on the integer lattice.

### 60. Dirichlet series of exceptional seeds

**Hybrid · P**

Let E be the set of seeds that do not reach 1, and study D_E(s) = sum over n in E of n^{-s}.
Derive an exact functional equation from inverse branches. Prove analytic continuation and growth
properties incompatible with any nonzero nonnegative coefficient sequence.

### 61. Natural boundaries as a disproof detector

**Speculative · B**

Associate a generating function to one orbit or to the survivor set. A divergent orbit may force a
dense set of singularities on the unit circle. Either prove such a natural boundary contradicts an
independently derived continuation theorem, or use numerical singularities to detect hidden
long-range structure.

### 62. A dynamical zeta function with only the trivial Euler factor

**Hybrid · P**

Formally define zeta_T(z) = product over finite Collatz cycles O of (1 - z^{|O|})^{-1}. Obtain a
determinant or trace representation and prove it equals the factor contributed by 1 <-> 2.

This settles cycles only unless supplemented by a nonescape theorem.

### 63. A uniform determinant involution

**Established/Hybrid · P for cycles**

The determinant formulation asks for det M_k = 1 - x^2 for every k. Find a sign-reversing
involution on all determinant permutations except those representing the trivial two-cycle. That
would provide an elegant cycle-exclusion theorem.

### 64. Uniform nilpotency after removing the trivial basin

**Speculative · P**

Truncate the Collatz adjacency operator at height N, remove vertices already connected to 1, and
study the remainder. Prove a nilpotency bound independent of N, together with control of edges
crossing the truncation boundary.

### 65. Compute the operator commutant directly

**Established/Hybrid · P**

Mori's equivalence reduces the conjecture to C*(T_1, T_2)' = C I. Try to solve the
matrix-coefficient equations for an operator commuting with both generators and show every
solution is scalar, using only their sparse arithmetic structure.

### 66. Exclude peripheral spectrum of a weighted Collatz shift

**Hybrid · B**

Choose weights so that a cycle produces a unit-modulus eigenvalue and a divergent orbit produces
approximate eigenvectors on the unit circle. Prove the nontrivial spectral radius is strictly below
one — or detect approximate eigenvectors computationally as counterexample signatures.

### 67. Fredholm determinant and trace cancellation

**Speculative · P for cycles**

Construct a trace-class regularization whose k-th trace counts admissible closed parity words with
arithmetic weights. Prove exact cancellation of all nontrivial traces and identify the resulting
Fredholm determinant.

### 68. Numen-integrality exclusion

**Established/Hybrid · B**

Recent "numen" formalisms assign multi-place values to symbolic Collatz sequences. Prove that
every nontrivial periodic or nondecaying symbolic word has a nonintegral value at at least one
completion. A symbolic sequence passing all local integrality tests would be a counterexample
candidate.

### 69. A 2-3 Tauberian decorrelation theorem

**Speculative · P**

Establish uniform cancellation between indicators of long 2-adic seed cylinders and long 3-adic
endpoint cylinders. Convert the correlation bound into a statement that the number of compatible
critical prefixes eventually falls below one.

### 70. Grobner bases for q-series carry ideals

**Hybrid · P**

Describe the conjugacy images of positive integers in F_2[[q]] by an inverse system of polynomial
ideals. Show that repeated application of the q-map forces these ideals into the finite-support
locus by noetherianity or Grobner degeneration.

---

## Tier IV: ambitious refinements of established programs

### 71. Characterize the positive-integer image of the parity conjugacy

**Established/Hybrid · P**

The 2-adic conjugacy already solves the symbolic dynamics. Find an intrinsic characterization of
those parity sequences whose inverse image is a nonnegative ordinary integer. Combine that
characterization with a drift theorem.

### 72. Use the Collatz autoconjugacy to pair hard and easy paths

**Established/Hybrid · P**

The nontrivial 2-adic autoconjugacy complements parity data. Study whether a high-growth
integer-realizable path is paired with a path having forced descent, and whether both members can
belong to the positive-integer image simultaneously.

### 73. A forbidden-lift theorem for de Bruijn paths

**Hybrid · P**

Every finite parity path appears in the de Bruijn graph. Prove that every infinite path with
sustained positive drift eventually contains a pattern incompatible with lifting to a positive
integer under the conjugacy.

### 74. A higher-dimensional sofic certificate

**Hybrid · P**

Although the whole transition relation is not regular, a richer automaton reading synchronized
binary seed digits, ternary carry digits, and a height counter might recognize all possible
counterexamples. Prove its bad language is empty.

### 75. Finite residue-class descent induction

**Established · P**

Find M and, for every residue r mod M, a bounded k_r such that T^{k_r}(Mn + r) < Mn + r for every
admissible n. This would be a finite proof by strong induction.

### 76. Strongly sufficient arithmetic progressions

**Established/Hybrid · P**

Find a finite set of congruence classes that every nontrivial cycle or divergent path must visit,
then prove uniform descent whenever it is visited. The literature already studies strongly
sufficient sets in the Collatz graph; the missing step is sufficiency against both failure modes.

### 77. Uniform inverse-tree coverage

**Established · P**

Upgrade inverse-branch counting into a theorem that every residue class eventually intersects the
1-tree below a controlled height. This attacks the conjecture directly rather than through forward
averages.

### 78. Push difference inequalities to a coverage theorem

**Established/Hybrid · P**

Krasikov-Lagarias reach x^{0.84} known convergent starts. Increasing the exponent to 1 - o(1)
still permits infinitely many exceptions; the real target is a recursive inequality that forces
the complement to be empty.

### 79. An exact self-similarity equation for the exceptional set

**Hybrid · P**

If E is a subset of N denotes the nonconvergent set, inverse invariance imposes exact relations
between E, 2E, and selected affine images. Combine these with well-ordering, congruence
restrictions, and growth to prove that no nonempty subset of N can satisfy all relations.

### 80. Uniformize Tao's transport theorem over every cylinder

**Established/Hybrid · P**

Replace an average over starting values by a bound uniform over all sufficiently deep residue
classes. This is perhaps the most direct analytic upgrade of the strongest existing theorem, but
it confronts the possibility that exceptional cylinders become progressively thinner.

### 81. Replicate one counterexample into many

**Hybrid · P**

Assume a least counterexample n. Use inverse branches to generate many distinct larger starts
whose orbits merge into the orbit of n before descending. Prove that this family has enough
logarithmic mass to contradict Tao's almost-all theorem.

### 82. Uniform large deviations for realizable paths

**Hybrid · P**

Random words obey strong negative-drift large deviations. Prove an analogous bound for the subset
of words realized by every individual positive integer, with constants uniform in the initial
residue.

### 83. Deterministic renewal discrepancy

**Hybrid · P**

The accelerated map naturally produces renewal times through the valuations a_i. Establish a
bounded-discrepancy theorem for every orbit, not merely a distributional theorem for random
starts.

### 84. Benford rigidity for every infinite orbit

**Established/Hybrid · P**

Most seeds have initial iterates approximately satisfying Benford's law. Prove an appropriate form
for every nonperiodic infinite integer orbit, then show that exact affine carries make such digit
equidistribution incompatible with sustained growth.

### 85. Rigorous renormalization of stopping-time distributions

**Hybrid · B**

Derive an exact or asymptotically exact renormalization operator on stopping-time distributions.
Classify its fixed points and show that a nonconvergent component cannot coexist with the observed
attracting distribution.

---

## Tier V: increasingly conventional, computational, or local programs

### 86. Cycle-word enumeration plus LLL

**Established · D/P for cycles**

Enumerate admissible blocks between local minima, translate them into near-relations between 2^A
and 3^j, and use lattice reduction to exclude all words in a parameter range.

### 87. Continued fractions for log_2 3

**Established · P for cycles**

A near-critical cycle requires A/j to be an exceptional rational approximation to log_2 3. Combine
continued-fraction constraints with exact carry bounds and divisibility.

### 88. Uniform local-minimum classification

**Established · P for cycles**

Hercher's result gives at least 92 local minima in a nontrivial cycle. Seek a theorem that
excludes every fixed number m of local minima uniformly, rather than increasing the computational
bound one value at a time.

### 89. Conditional abc-assisted cycle bounds

**Hybrid · P for cycles**

Apply abc-type radical estimates to the affine cycle equation and its partial sums. Even a
conditional theorem eliminating broad cycle families would clarify which arithmetic quantities
matter.

### 90. Verification through 2^75 or 2^77

**Established · D**

Implement the 2026 recursive-suffix algorithm. Verification through 2^75 would substantially
increase the known cycle-length bound; 2^77 is proposed as plausible with resources comparable to
the 2^71 computation. It would remain finite evidence, not a proof.

### 91. Proof-producing exhaustive verification

**Hybrid · P/D**

Instead of outputting only "verified," have the computation produce a compact certificate
assigning each residue class a descent or merger witness. Formal verification might reveal that
the certificate repeats and closes under scaling, turning a finite computation into a theorem.

### 92. Branch-and-bound search for a divergent exponent word

**Established/Hybrid · D**

Search valuation words satisfying 2^{A_t} <~ 3^t for long ranges, together with exact 2-adic seed
residues, 3-adic endpoint conditions, and positivity bounds. Prune as soon as no ordinary seed in
the cylinder can maintain the barrier.

### 93. SAT/SMT search for exact barrier survivors

**Hybrid · B**

Encode valuation constraints, affine carries, suffix congruences, and no-descent conditions in a
solver. An explicit satisfying word may reveal a disproof mechanism; an UNSAT certificate over a
recursively closed state space could contribute to a proof.

### 94. MILP or CP-SAT cycle search

**Established/Hybrid · D**

Represent segment lengths, total valuations, approximate logarithmic balance, and divisibility
conditions as integer constraints. Add exact cuts derived from the affine cycle equation.

### 95. Meet-in-the-middle affine composition

**Established · D**

Split a long valuation word into two halves. Store their affine transformations and match
compatible endpoints, denominators, and residues. This can search cycle lengths far beyond direct
enumeration.

### 96. Distributed inverse-tree enumeration

**Established · P/D**

Enumerate preimages of 1, compress them by congruence classes, and search for a stable covering
law. Failure to cover a persistent family may identify a structured exceptional set.

### 97. Extreme-trajectory anomaly detection

**Established · D**

Continue collecting stopping-time, maximum-excursion, valuation-frequency, and carry statistics.
Search specifically for systematic violations of stochastic predictions rather than merely new
records. Current record data remain broadly consistent with the stochastic n^2-scale prediction
for maximum excursions.

### 98. Classify the qx+1 phase diagram

**Established/Hybrid · B**

Rigorous stochastic models sharply contrast 3x+1 with 5x+1. Develop a theorem explaining the
transition between almost-sure negative and positive logarithmic drift, then prove that q = 3 lies
on a uniformly contracting side even after arithmetic dependencies are included.

### 99. Classify every failure mechanism in neighboring systems

**Established/Hybrid · B**

Study negative integers, rationals with odd denominators, qx+1 maps, polynomial rings, formal
power series, and q-analogues. Identify all mechanisms producing nontrivial cycles or divergence
there, then prove that each mechanism requires a feature absent from positive integers under
3x+1. Polynomial analogues already demonstrate that changing the ambient arithmetic can completely
change the global dynamics.

### 100. Classical modular casework

**Established · P**

Partition the integers into congruence classes, compute several steps symbolically on each class,
and prove eventual descent. This is the least exotic approach and has repeatedly stalled because
the exceptional classes proliferate — but a sufficiently clever finite partition would still be a
complete elementary proof.
