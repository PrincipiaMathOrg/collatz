# Approach campaign — what each landed round actually produced

One line of bookkeeping per round is in `LEDGER.tsv`; this file is the mathematical content.
The rule for an entry: say what was **proved**, what was **refuted** (including the approach's own
hoped-for step, when the round kills it), and what the round leaves as the open target. A round
that does not prove Collatz is not a failure — a sharp reduction and a named false step are the
deliverable.

No round so far claims a proof, and every landed round says so itself.

---

## Round 6 — approach 1, Adelic two-ended renormalization of valuation words

`round-6-output.md`, 21825 chars, 102m 49s. **Not a proof, and it refutes the approach's own
central hope.**

* **The hoped-for step is false as stated.** "All nontrivial recurrent states vanish as r → ∞"
  fails without an *ordinary-integer lift* condition: there are abundant nontrivial recurrent
  states in `R_{>0} ∩ Z_2 ∩ Z_3` passing every finite 2-adic, 3-adic and archimedean compatibility
  test, which are rational rather than positive integers. The three-test renormalization state
  cannot by itself see the difference.
* **What it does prove.** An exact valuation-cylinder construction for `U(x) = (3x+1)/2^{v_2(3x+1)}`,
  and: once the integer-lift condition *is* imposed, the 2-adic and normalized 3-adic coordinates of
  every ordinary orbit — convergent or hypothetically divergent — eventually collapse to zero.
* **What is left.** The surviving branch is an arbitrarily long zero-carry ordinary orbit segment.
  Excluding it is a stopping-time theorem closely related to the (still open) coefficient
  stopping-time conjecture. So the approach reduces Collatz to a known-hard statement rather than
  to something new.
* **Prior art it surfaced.** Kramer, July 2026 preprint — already combines real drift, a 2-adic
  starting representative and a 3-adic endpoint representative, and states it is not a verification
  method. This round sharpens the starting modulus from `2^{A_k}` (divisibility) to `2^{A_k+1}`
  (the *exact* final valuation).

## Round 7 — approach 2, Furstenberg-style (×2, ×3) measure rigidity

`round-7-output.md`, 20459 chars, 84m 1s. **Not a proof; the failure is located precisely.**

* A divergent orbit *does* generate a probability measure on a compact adelic state space — the
  recurrence worry in the approach text is not what kills it.
* That measure is invariant under **one variable-time skew transformation**
  `(a,z) ↦ (σa, α_3 α_2^{-a_0} z)`, **not** under multiplication by 2 and by 3 separately. So the
  rigidity theorems do not apply to it as it stands.
* The two repairs both fail: thickening the orbit to get genuine (×2,×3)-invariance makes the
  Collatz orbit a zero-density boundary and loses the carry constraint; keeping the positive-integer
  lift or absolute height instead sends all empirical mass to infinity.
* **The proposed dichotomy contains a false step.** "Zero entropy ⇒ algebraic or eventually
  periodic" is false for the ambient skew system and is stronger than available ×2,×3 rigidity:
  Rudolph–Johnson and its solenoid extensions need genuine higher-rank invariance, and the
  zero-entropy case is essentially the unresolved part of Furstenberg's measure problem.
* **The target it isolates.** Not ordinary recurrence but a **boundary-rigidity theorem** that
  converts the variable-time skew orbit into higher-rank algebraic invariance without averaging away
  the positive-integer lift. Existing Furstenberg rigidity begins only after that conversion.

## Round 8 — approach 3, Turn the q-analogue into a polynomialization theorem

`round-8-output.md`, 18069 chars, 48m 19s. **Not a proof, and the reason is circularity, not a gap.**

* **The approach's target is Collatz itself.** "The series attached to every positive integer is
  already a polynomial" is *exactly equivalent* to the Collatz conjecture, coefficient by
  coefficient — and equivalent to the older Bernstein–Lagarias 2-adic parity reformulation. So a
  final argument resting on eventual entry into the polynomial basin would be circular.
* **The "enters the basin" route is dead outright.** For the natural conjugate q-map, a
  nonpolynomial series can **never** enter the polynomial set. The basin has no incoming traffic, so
  the invariant the approach hoped for (support entropy, gap growth, valuation filtration,
  noetherian ideal) has nothing to act on.
* This is the campaign's first round where the approach fails by *restating the problem* rather than
  by losing a structure. Worth distinguishing from the rounds 6/7 seam, which is a genuine
  obstruction; here the machinery is fine and simply says nothing new.

## Round 10 — approach 5, Prove simplicity or irreducibility of the Collatz C*-algebra

`round-10-output.md`, 19450 chars, 37m 33s. **Not a proof, and it kills three of the approach's own
four attack routes by computing the answer.**

* **Abstract simplicity is free and therefore useless.** Mori's abstract Cuntz algebra is already
  isomorphic to `O_2`, hence simple, *without assuming Collatz*. So a simplicity theorem cannot
  carry any Collatz content.
* **The real statement sits one level down.** The *concrete representation* is irreducible exactly
  when Collatz holds — irreducibility of the representation, not simplicity of the algebra, is the
  equivalent statement.
* **The commutant is computable, and says what the obstruction is.** From the local branch relations
  it is the algebra of bounded functions constant on total Collatz-orbit classes. So abstract
  simplicity, gauge/KMS uniqueness and full-shift groupoid simplicity **cannot distinguish** a world
  with one Collatz component from a world with several.
* Of the four routes the approach listed, three (gauge/KMS uniqueness, Cuntz–Pimsner simplicity,
  groupoid minimality) are ruled out as insufficient in principle; only the direct commutant
  computation survives, and it returns orbit-class functions — i.e. it restates connectivity, which
  is what the approach was explicitly warned not to do.

## Round 9 — approach 4, A Cobham trap for counterexample carry streams

`round-9-output.md`, 19796 chars, 62m 33s. **Not a proof. Two independent gaps, and the second is
fatal to the plan as written.**

* **Wrong index for Cobham.** The known base-2 and base-3 transducers act on the digits of the
  *current orbit value*. Cobham's theorem needs a finite automaton acting on the digits of the
  **time index j**. Value-automaticity does not imply index-automaticity — the approach's premise
  quietly substitutes one for the other.
* **Cobham would not exclude what it is aimed at.** Even granted dual automaticity, Cobham forces
  eventual *periodicity* — and the carry stream of any cycle is already periodic, hence automatic in
  every base. So the rigidity theorem is satisfied by exactly the object the argument is trying to
  rule out; it cannot exclude a nontrivial positive cycle.
* **What survives is conditional.** A cycle theorem conditional on the missing index-automaticity,
  not a route to divergence.

## Round 11 — approach 6, Sheaf cohomology for gluing modular Lyapunov functions

`round-11-output.md`, 18474 chars, 49m 46s. **Not a proof, and the cohomological obstruction is
shown to be the wrong instrument twice over.**

* **The H^1 that vanishes is the wrong H^1.** Ordinary sheaf `H^1` on the congruence space vanishes
  for formal topological reasons, and that vanishing does *not* glue descent inequalities. The
  approach's plan — prove H^1 vanishes under refinement, conclude the local certificates glue — does
  not connect to the object it needs.
* **The dynamical cohomology that is relevant is already nonzero for an irrelevant reason.** It
  carries an obstruction coming from negative 2-adic periodic points such as `-1`, *regardless of
  whether a positive-integer counterexample exists*. So a nonzero class is not evidence of a
  counterexample, which is exactly what the approach proposed to read off it.
* **The target object cannot exist anyway.** Under every natural regularity assumption a global
  correction `V(n) = log n + φ(n)` is impossible.
* Failure mode: a **blunt invariant** — the obstruction is real but insensitive, firing on
  `-1` rather than on the property under study. Distinct from round 9's (theorem satisfied by the
  counterexample class) and from the restatement mode of rounds 8 and 10.

## Round 12 — approach 7, Compute the K-theory of the Collatz orbit groupoid

`round-12-output.md`, 18613 chars, 29m 38s. **Not a proof, but it delivers both an exact
reformulation and a no-go theorem for its own approximation step — the sharpest negative result so
far.**

* **The reformulation is exact.** For the shortcut map's orbit groupoid `G_T`:
  `Collatz is true ⟺ K_0(C*(G_T)) ≅ Z`. Every divergent orbit component contributes a new `Z`
  summand to `K_0`; every nontrivial periodic component contributes new `Z` summands to both `K_0`
  and `K_1`. So the approach's hoped-for "persistent class" really does exist at the infinite
  discrete level.
* **The approximation step is dead, with a no-go proof.** Recovering that computation from finite
  modular graphs or from the inverse-tree boundary cannot work:
  1. the natural modular orbit graph is connected for **every modulus M**, unconditionally;
  2. the 2-adic inverse-tree boundary gives the full binary-shift groupoid, algebra `O_2`, both
     K-groups **zero**, unconditionally;
  3. those same boundary K-groups occur for the **5x+1 map, which has an explicit nontrivial
     positive cycle**.
* Point 3 is the decisive one: the invariant the approach proposed to compute takes the same value
  on a map that *does* have a nontrivial cycle, so it cannot detect the absence of one. Failure mode
  (d), blunt invariant — here proved blunt by exhibiting a discriminating example the invariant
  cannot separate.
* **What survives.** The K-theoretic reformulation is genuine and worth keeping; what is refuted is
  every finite-approximation route to it.

## Round 13 — approach 8, Thermodynamic formalism with an arithmetic integrality potential

`round-13-output.md`, 21354 chars, 38m 57s. **Not a proof; it returns a no-go theorem and names the
exact statement that would repair it.**

* **No-go, stated exactly.** On the ordinary countable shift of Collatz valuation words, **no
  continuous or summable-variation "integrality potential" can distinguish valuation sequences
  coming from positive integers from general 2-adic valuation sequences.** The approach's `Phi(w) =
  drift + λ·integrality penalty + μ·carry penalty` cannot be built as specified — the integrality
  penalty is not a function of the kind the formalism admits.
* **The dynamical conclusion is unavailable too.** Uniqueness of an equilibrium or ground state among
  invariant probability measures **cannot by itself exclude a divergent integer orbit**, so even a
  successful zero-temperature analysis would not deliver the wanted contradiction.
* **What repair would cost.** Only a genuinely *nonlocal* arithmetic lifting condition fixes it, and
  the required lifting statement is precisely the unresolved prefix–suffix synchronization theorem —
  i.e. the approach reduces to an open problem, not to a tractable one.
* Same seam as rounds 6 and 7, seen from thermodynamics: the integer lift is exactly what the
  compact/continuous machinery cannot see. Failure mode (a), genuine obstruction, with an explicit
  proof of insufficiency.

## Round 14 — approach 9, An o-minimal rational-point explosion theorem

`round-14-output.md`, 18702 chars, 49m 24s. **Not a proof; the counting the approach needs is off by
an exponential, and the inference it wanted is outright false.**

* **The point count is nowhere near Pila–Wilkie's threshold.** A single Collatz orbit supplies only
  *polynomially many* rational relations in the orbit length, while their heights are *exponential*
  in that length. Pila–Wilkie needs many points of bounded height; this is the opposite regime.
* **Manufacturing more points destroys the information.** Varying the initial integer does produce
  many points, but they lie on rational algebraic lines that exist for **every** finite valuation
  word — including completely aperiodic ones.
* **So the key inference is false.** "Algebraic locus ⟹ repeated valuation block" does not hold for
  the natural Collatz encoding. That implication was the whole mechanism.
* **And the conclusion would be too weak anyway.** Even granted repetition, one gets the usual cycle
  equation and still needs an independent argument excluding every nontrivial positive cycle — the
  same wall round 9 hit.
* Failure mode (d) again in the sharpest form: the algebraic locus is blunt, taking the same value on
  aperiodic words as on periodic ones.

## Round 15 — approach 10, A canonical height on a parity orbifold

`round-15-output.md`, 14196 chars, 41m 4s. **Not a proof; four independent no-go results kill the
canonical height, and each is proved rather than asserted.**

* **Polarization factor is 1, not > 1.** The algebraic correspondence has factor 1, so there is no
  expanding direction for a Call–Silverman/Ingram canonical height to converge along.
* **Northcott fails against the powers-of-two chain.** A Northcott quasi-height with `λ > 1` is ruled
  out by `2^k → 1`: infinitely many points of bounded height, which Northcott forbids.
* **An exact height vanishing on the trivial cycle vanishes on an infinite basin**, so it cannot
  separate the cycle from anything.
* **The local slopes cancel exactly.** The ∞-, 2- and 3-adic derivative contributions cancel by the
  product formula — the height has no net drift to exploit.
* The round states the incompatibility crisply: the desired canonical-height package is *internally
  inconsistent with the known backward tree of the trivial cycle*. Failure mode (a), genuine
  obstruction, established four ways.
* **What survives.** Not a point-height but an **adelic gluing / synchronization theorem for affine
  carry centers** — and the required simultaneous 2-adic, 3-adic and archimedean recurrence is
  exactly what rounds 6, 7 and 13 could not supply.

## Round 16 — approach 11, Arithmetic Conley index at infinity

`round-16-output.md`, 16859 chars, 45m 43s. **Not a proof; the approach's central implication is
false, but the repair is a clean complete invariant.**

* **The false implication.** On the natural end compactification of the Collatz graph **every end is
  fixed by the map** — including ends built entirely from backward-doubling branches whose forward
  trajectories converge to the trivial cycle. So an invariant boundary end does **not** certify a
  divergent trajectory, and a trivial ordinary Conley index does **not** imply an empty invariant
  set. Both arrows the approach relies on are refuted explicitly.
* **The repair, and it is sharp.** The arithmetic Conley module `C_arith = W / gker(A_0)` decomposes
  exactly as
  `⊕_{divergent components} Q[t,t^{-1}]  ⊕  ⊕_{nontrivial cycles} Q[t,t^{-1}]/(t^p − 1)`:
  free Laurent-polynomial part ↔ divergent components, torsion part ↔ nontrivial cycles, and
  **vanishing ⟺ Collatz**.
* **What is left.** A complete topological certificate for every possible counterexample — and the
  vanishing theorem is still pure unresolved arithmetic. Failure mode (b), restatement, but an
  unusually useful one: unlike rounds 8 and 10 it separates the two counterexample types into
  different algebraic pieces (free vs torsion).

## Round 17 — approach 12, Proof-theoretic ordinal descent

`round-17-output.md`, 17594 chars, 62m 32s. **Not a proof, but the most constructive negative round
so far: it reduces the problem to three explicit inequalities and kills the easy ranks by finite
certificates.**

* **The system collapses.** The eleven-rule mixed binary–ternary rewrite system reduces to an exact
  *deterministic rewrite map on pure ternary words*, and **Collatz ⟺ termination of that map**.
* **The remaining task is fully explicit.** An ordinal rank for the whole mixed system can be built
  *automatically* from any rank satisfying **three explicit uniform inequalities** for two carry
  transducers. That is a finite, checkable specification of what is missing — not a vague "find an
  invariant".
* **Partial progress is real.** Several substantial subsystems admit elementary ordinal ranks below
  `ω²`.
* **The obvious candidates are refuted with certificates.** Fixed lexicographic, length-based,
  commutative and local bigram rankings all fail, each by a *finite* certificate — so future rounds
  need not retry them.
* Failure mode (b) in form (termination ⟺ Collatz), but it leaves the sharpest actionable target of
  the campaign: construct a carry-sensitive rank meeting three named inequalities.

## Round 18 — approach 13, Exact arithmetic optimal transport extending Tao

`round-18-output.md`, 20646 chars, 37m 38s. **Not a proof; the contraction the approach needs is
false, not merely unproved — and `-1` is again the culprit.**

* **The gap between Tao and the exact statement is structural.** The *randomized* Syracuse operator
  is uniformly contractive; the *exact integer* Syracuse operator is **not** uniformly contractive on
  all cylinders. So the transport machinery cannot be de-randomized as the approach hoped.
* **Why it fails, concretely.** In every natural fixed-horizon formulation the exact statement is
  **false**: positive integers can shadow the expanding 2-adic fixed point `-1` for arbitrarily long
  periods. The same object that made round 11's cohomology blunt is here the explicit obstruction to
  uniform contraction.
* **What Tao's theorem is and isn't.** It gives approximate transport between first-passage
  distributions of logarithmically random starting values, so its conclusion is an almost-all result
  in logarithmic density — not a statement about every starting integer. The approach's plan
  requires exactly the upgrade that fails.
* Failure mode (a), genuine obstruction, with a named mechanism: `-1`-shadowing defeats
  uniformity over cylinders.

## Round 19 — approach 14, Mixed 2-adic/3-adic Kakeya or decoupling

`round-19-output.md`, 20087 chars, 44m 32s. **Not a proof; the Kakeya theorem it needs cannot hold in
its natural form, for three computed reasons.**

* **The tubes are all parallel.** At fixed length and total valuation, *every* Collatz incidence tube
  is parallel — there is no directional spread, which is precisely what a Kakeya estimate exploits.
* **The 3-adic endpoint cylinders of successive prefixes are not nested**, so the multi-scale
  induction a decoupling argument needs does not even start.
* **Coherence is common; realization is rare.** Even after repairing the construction to a two-sided
  2-adic/3-adic state, critical coherent configurations exist *abundantly*. What is exceptional is
  not coherence but **diagonal realization by one positive ordinary integer** — so counting coherent
  configurations cannot detect counterexamples.
* **Where it lands.** Not on an existing Kakeya/decoupling estimate but on a **new signed,
  height-sensitive synchronization theorem** — the fifth independent arrival at a synchronization
  statement about the integer lift.
* Failure mode (a) plus (d): a genuine obstruction, and the invariant (coherence) is blunt because
  the rare property is integrality, not coherence.

## Round 20 — approach 15, Lee–Yang zeros of a Collatz partition function

`round-20-output.md`, 20324 chars, 32m 6s. **Not a proof; the "integrality penalty" the model needs
is identically zero, and zero-freeness answers a different question.**

* **The defect vanishes at every finite depth.** Every finite accelerated valuation word is already
  exactly realizable by infinitely many positive integers — so a finite-depth "integer realizability
  defect" is **identically zero** and cannot weight anything. (This is the same fact that defeated
  round 13's integrality potential, here in partition-function form.)
* **The obvious repair fails too.** Replacing it by "failure to remain critical" cannot extinguish
  finite critical words: arbitrarily long exactly realizable non-descending words exist.
* **Zero-freeness is the wrong conclusion.** It gives analyticity or correlation decay, not the
  nonexistence of an isolated arithmetic trajectory — **a unique survivor can coexist with a
  completely zero-free partition function.** The physics conclusion and the arithmetic question are
  not in contact.
* **What survives.** A corrected **seed-pinned Lee–Yang formulation** in which a counterexample does
  force zeros pinching the physical point `z = 1`.
* Failure modes (d) and (a): blunt observable (the defect is constant), plus a genuine mismatch
  between what Lee–Yang concludes and what Collatz asks.

## Round 21 — approach 16, A quantum-graph trace formula for cycles and escape

`round-21-output.md`, 20583 chars, 49m 35s. **Not a proof, and the round confirms the danger the
approach text itself flagged: the spectral object stores the question rather than forcing it.**

* **What it does build.** An exact affine trace formula for positive Collatz cycles, and a **sharp
  spectral annulus** in which every hypothetical nontrivial cycle must appear. That part is genuine
  and quantitative.
* **The obstruction, proved.** Ordinary quantum-graph resonances **cannot distinguish a divergent
  trajectory from harmless convergent branches** already present in the Collatz graph — the same
  backward-branch blindness that sank round 16's ends and round 11's cohomology.
* **The self-diagnosis.** Once the spectral object is made arithmetically exact, it *stores* the
  original cycle and escape questions instead of resolving them. The approach's own warning
  ("the essential requirement is that the theorem be established from local relations, not by
  silently restating orbit connectivity") turns out to be exactly what fails.
* Failure modes (b) and (d) together: a restatement whose invariant is also blind to the branches
  that matter.

## Round 22 — approach 17, Tropicalize the cycle and near-cycle equations

`round-22-output.md`, 22347 chars, 46m 34s. **Not a proof; a no-go theorem saying tropicalization
throws away precisely the information that matters.**

* **The no-go.** Ordinary tropicalization **discards exactly the residue information** that
  distinguishes a positive-integer Collatz orbit from the many rational and 2-adic lifts that always
  exist. The tropical picture is therefore identical for genuine integer orbits and for the
  non-integral lifts, and cannot separate them.
* **What it delivers instead.** A complete tropical analysis: a classification of the possible rays
  and an exact statement of the lifting obstruction.
* **Same seam, sixth formalism.** Rounds 6, 7, 13, 15, 19 and now 22: the integer lift is what the
  machinery cannot see, and here the loss is explicit — tropicalization is *defined* by forgetting
  the residues that carry integrality.
* Failure mode (a) with an unusually clean mechanism: the method's defining approximation is exactly
  the deletion of the needed data.

## Round 23 — approach 18, A Kolmogorov-complexity contradiction

`round-23-output.md`, 16443 chars, 35m 56s. **Not a proof; the central implication is refuted by an
exact conservation theorem and an explicit family of counterexamples.**

* **The implication is false.** "Positive drift + finite 2-adic/3-adic compatibility ⟹
  `K(valuation prefix) ≥ cj`" does not hold.
* **Complexity-conservation theorem.** For a length-`j` accelerated valuation word `w`, the word and
  its least positive realizing seed `R(w)` have the **same Kolmogorov complexity up to O(1)**,
  conditional on `j`. Hence for every fixed seed `n`, `K(w_j(n) | j) = O_n(1)` — whether the orbit
  terminates, cycles, or hypothetically diverges. Complexity simply does not distinguish the three
  behaviours.
* **Explicit refuting family.** The seeds `N_j = 2^{j+1} − 1` have strictly growing `j`-step orbits,
  valuation word `1^j`, and maximal terminal 3-adic compatibility — while `K(1^j | j) = O(1)`. Long
  positive drift with maximal compatibility and *minimal* complexity coexist.
* Failure mode (d), blunt invariant, proved by exhibiting the discriminating family the invariant
  cannot separate — the same proof shape as round 12's 5x+1 example.

## Round 24 — approach 19, Terminal-suffix transducer with a vanishing joint spectral radius

`round-24-output.md`, 19853 chars, 60m 40s. **Not a proof; the advertised JSR inequality is shown to
be false or insufficient at four separate points, and a corrected target is proved sufficient.**

* **The coordinate is not suffix-local.** `C_j + 2^{A_j} (mod 3^r)` is *not* terminal-suffix-local;
  only its divisibility by `3^r`, or a normalized residue, is. So the transducer cannot track the
  quantity the argument needs.
* **JSR < 1 is unavailable.** For Boolean transition matrices, joint spectral radius `< 1` is
  equivalent to exact eventual nilpotence, and an explicit retained periodic ray gives arbitrarily
  long survivor paths — so the natural stationary transducer has **JSR ≥ 1**.
* **Contracting weights don't repair it:** an infinite path can carry exponentially decaying weight.
* **Fixed-`r` spectral radius only detects cycles.** Even with an exact finite-height window, a
  divergent orbit could give a finite but increasingly long transient at *every* scale — the
  approach's end state cannot exclude divergence.
* **What it proves instead.** The correct target is a **graded linear nilpotence estimate**
  (equivalently, a uniformly well-conditioned contracting norm), and the round proves that this
  strengthened estimate *would* imply Collatz. So the reduction is real; the advertised lemma is not.
* Failure mode (c)/(a): the stated instrument is provably too weak, but the round supplies the exact
  strengthening that would suffice — the third concrete target of the campaign.

## Round 25 — approach 20, Ultraproduct rigidity of minimal counterexamples

`round-25-output.md`, 19556 chars, 51m 28s. **Not a proof; the decisive implication is refuted by an
explicit construction.**

* **The implication is false.** "Nonstandard survival + asymptotic frequency + normalized carry ⟹
  periodicity" does not hold: the round **explicitly constructs hyperfinite Collatz trajectories**
  with all of those regularity properties whose limiting dynamics is an **aperiodic irrational
  rotation**.
* That is a construction, not an objection — the same standard as round 12's 5x+1 example and round
  23's `N_j = 2^{j+1} − 1` family. Regularity in the ultraproduct is compatible with aperiodicity, so
  transfer cannot force a cycle equation.
* **What is left.** The round states the exact additional theorem an ultraproduct approach would
  need, i.e. the missing rigidity is not "more of the same" but a genuinely stronger statement.
* Failure mode (c): the imported rigidity conclusion is satisfied by objects that are not
  counterexamples — here irrational rotations sitting inside the hyperfinite limit.

## Round 26 — approach 21, Additive-combinatorial inverse theorem for growth words

`round-26-output.md`, 16744 chars, 42m 20s. **Not a proof; the chain of implications is false, and a
known theorem points the wrong way for the whole "low complexity" strategy.**

* **The implication chain fails.** "Many low-drift prefixes ⟹ additive structure ⟹ repeated valuation
  block" is false as stated. The round constructs a valuation word of **maximal factor complexity**
  for which **every prefix** satisfies the critical growth inequality and **every finite prefix is
  exactly realizable by a positive Collatz seed**.
* **Prior art aimed at the same idea.** Dubickas' theorem: a genuinely divergent Collatz parity word
  must have factor complexity at least `(log 2 / log(3/2))·r = 1.7095…·r`. So a divergent orbit is
  *forced to be complex*, which points away from any "low complexity forces periodicity" route —
  the opposite of what the approach assumes.
* **Fourth refutation by construction** (after rounds 12, 23, 25), and this one is doubly strong:
  maximal complexity *and* full realizability at every finite depth, so it defeats both the additive
  and the realizability halves of the argument at once.
* Failure mode (c)/(d), with the extra value that Dubickas supplies an independent literature check
  against the strategy.

## Round 27 — approach 22, Entropy decrement plus arithmetic rigidity

`round-27-output.md`, 20399 chars, 47m 43s. **Not a proof; the closing dichotomy fails in both
directions, but the quantitative half is real.**

* **What it proves.** A rigorous **single-orbit entropy-decrement theorem**, a *sharp entropy deficit*
  for any hypothetical divergent orbit, and a quantitative lower bound on how fast such an orbit
  would have to escape. This is genuine quantitative content about counterexamples, not just a
  reduction.
* **Both arrows of the dichotomy fail.** `decorrelation ⇏ negative drift`, and `low or zero entropy
  ⇏ finite-state or eventually periodic`. The approach's proposed endgame therefore does not close
  from either side.
* **What is missing.** An *orbitwise* arithmetic-rigidity theorem about **positive rational 2-adic
  seeds** — plus a separate exclusion of nontrivial cycles.
* Failure mode (a), and note the two recurring debts appear together here: the integer/rational-lift
  rigidity statement (the seam) and the independent cycle-exclusion requirement (rounds 9, 14).

## Round 28 — approach 23, A pointwise Bellman function

`round-28-output.md`, 13151 chars, 27m 28s. **Not a proof — an impossibility theorem. The approach is
dead in its stated form, for every parameter choice.**

* **The certificate cannot exist.** For the shortcut map, a Bellman certificate
  `V(n) = log n + φ(n mod M)` with a bounded rule `1 ≤ k(n) ≤ K` giving strict decrease is
  obstructed **for every modulus M, every table φ, and every finite horizon K**. Not "not found" —
  ruled out uniformly.
* **The obstruction is explicit**, and the round first shows why such a certificate *would* have
  proved Collatz, so the impossibility is not a technicality about a weak formulation.
* **Consequence for the campaign.** This closes the entire finite-table, bounded-horizon Lyapunov
  family — which is the same family round 11 approached via sheaf gluing (`V(n) = log n + φ(n)`) and
  reached the same negative conclusion by a different route. Two independent proofs that modular
  Lyapunov certificates cannot work.
* Failure mode (a), in its strongest form: not an obstruction to one argument but a no-go for a
  whole method class.

## Round 29 — approach 24, Sum-of-squares Lyapunov certificates

`round-29-output.md`, 17782 chars, 38m 52s. **Not a proof — a second impossibility theorem for the
Lyapunov family, and the same explicit family kills it as killed round 23's complexity bound.**

* **The no-go.** *No proper polynomial Lyapunov function with finitely many residue states and a
  bounded block length can prove Collatz.*
* **The witness.** `n = 2^L − 1`, whose first `L` shortcut-Collatz steps are all **increasing**. It
  defeats direct bounded-block contraction *and* every finite-state polynomial correction, because
  the increase runs longer than any fixed block.
* **The failure is not numerical.** The round is explicit that SOS verification and exact rational
  recovery are legitimate proof technologies — SDP unreliability is not the issue, the certificate
  class is.
* **Third no-go for Lyapunov-type certificates**, with rounds 11 (cohomological) and 28 (finite table,
  bounded horizon). Together they close: modular tables, polynomial SOS with finite residue states,
  and glued local potentials.
* Note the recurrence: `2^L − 1` here, `N_j = 2^{j+1} − 1` in round 23, and the `2^k → 1` chain in
  round 15's Northcott obstruction. The powers-of-two-minus-one family is the campaign's most
  reusable counterexample.

## Round 30 — approach 25, Counterexample-guided abstraction refinement

`round-30-output.md`, 21608 chars, 46m 51s. **Not a proof; the literal target is impossible, but the
repaired framework produces five exact results and isolates a single missing theorem.**

* **The stated target is impossible.** "Refine a finite one-step abstraction until the nonterminal
  abstract graph has no recurrent component" cannot succeed: Collatz has **arbitrarily long finite
  excursions**, so every sound finite one-step abstraction contains recurrent abstract behaviour —
  *whether or not the conjecture is true*. (Same mechanism as rounds 28/29: bounded-horizon methods
  versus unbounded excursions.)
* **The repair: ranked CEGAR.** Recurrent abstract components are allowed, but each must be
  discharged by a well-founded ranking, an exact acceleration, or an arithmetic infeasibility
  certificate.
* **Five exact results delivered**, including an **exact arithmetic oracle** for checking proposed
  counterexample paths, an exact **"top-bit" criterion distinguishing ordinary integers from spurious
  2-adic paths**, and a **universal ranking function that eliminates every exact periodic abstract
  lasso unless it is a genuine Collatz cycle**.
* **What is left is one statement:** a precise finite-rank theorem for **aperiodic** survivor paths.
* Notable: the top-bit criterion is the campaign's first *positive* tool for separating genuine
  integers from 2-adic impostors — the seam that has defeated nine other rounds.

## Round 31 — approach 26, A genuinely new reduction order for mixed binary–ternary rewriting

`round-31-output.md`, 19001 chars, 70m 12s. **Not a proof; two more impossibility theorems, and a
structural theorem about what any successful order must look like.**

* **The structural theorem.** *Any successful reduction order for the mixed binary–ternary system
  must be genuinely context-sensitive and path-dependent.* That is a constraint on all future
  attempts, not just this one.
* **What it rules out.** Direct scalar polynomial interpretations fail *even weakly*; polynomial
  interpretations still fail after adding the exact unbounded label `r = v_2(n+1)`; and **any**
  ordinary context-cancellable monoid order hits an immediate infinite-descent contradiction.
* **What survives.** A precise dependency-pair / semantic-label certificate whose verification would
  prove Collatz — but it needs a **global, carry-sensitive size-change lemma**, which is unproved.
* Pairs with round 17 (same rewriting front, from ordinals): 17 supplies the target rank plus finite
  certificates killing the naive rankings; 31 proves that no context-free, cancellable or polynomial
  order can work at all. Together they say the rewriting route needs a path-dependent, carry-aware
  order and nothing weaker.

## Round 32 — approach 27, Digit-block ordinals below ε₀

`round-32-output.md`, 17538 chars, 50m 34s. **Not a proof; 10 of 11 rules fall, and the round proves
the last one cannot be handled by bookkeeping.**

* **How far it gets.** An explicit ordinal below `ω³` that **decreases under ten of the eleven rules**
  of the exact mixed binary–ternary rewriting system. The sole exception is the rule encoding an odd
  Collatz step — i.e. exactly the arithmetic content.
* **Why the last rule is not a technicality.** Any successful ε₀-ranking of the complete system
  **induces a pointwise ε₀-ranking of the integers themselves**. So the missing "higher ordinal
  component" cannot come from renaming carries or digit blocks; it must embody a genuine new Collatz
  descent theorem.
* That is a *no-cheap-repair* theorem: it forecloses the natural next move (enrich the labels) for
  the whole ordinal-descent family, and it explains why round 17's three inequalities are the real
  content rather than a technical residue.
* Failure mode (b)-adjacent: the remaining gap is provably equivalent in strength to the problem, so
  no reformulation of the ranking can close it.

## Round 33 — approach 28, Well-structured transition systems

`round-33-output.md`, 19414 chars, 52m 4s. **Not a proof; every natural reading of "make the Collatz
transducer a WSTS" is proved impossible, vacuous, or circular.**

* **Impossible:** an exact, label-preserving, strongly monotone WQO **cannot exist** on the canonical
  Collatz states.
* **Vacuous:** an unlabeled strongly monotone WQO **always exists** nonconstructively (via total
  stopping time), *whether or not Collatz is true* — so existence alone proves nothing. A rare
  explicit demonstration that a proposed certificate is uninformative rather than merely unavailable.
* **Circular:** a branch-WSTS formulation is meaningful, but its existence is **equivalent** to
  proving every infinite Collatz orbit is eventually periodic — it excludes divergence only after the
  substantive statement is already proved. And nontrivial positive cycles still need separate
  exclusion (the fourth round to inherit that debt).
* **The new lemma worth keeping.** A *precision-loss identity* for synchronized parity blocks:
  `v_2(T^t(y) − T^t(x)) = v_2(y − x) − t`. The round uses it to explain **why multiplication by 3
  plus right shifting defeats every fixed-window digit or carry WQO**, and to show the missing
  monotonicity theorem cannot be repaired by recording a larger fixed modulus.
* Failure modes (b) and (a) together, with an impossibility proof for the labelled case.

## Round 34 — approach 29, Cellular-automaton nilpotency  *(first round on GPT-5.6 Pro)*

`round-34-output.md`, 16807 chars, 39m 30s. **Not a proof; the nilpotency theorem is exactly
equivalent to Collatz — but the round separates the two counterexample types cleanly.**

* **The restatement, made precise.** Once CQCA update time is distinguished from Collatz iteration
  depth and powers of 2 are normalized away, the proposed "finite-support nilpotency" theorem is
  **exactly equivalent to the Collatz conjecture**.
* **A finite glider or spaceship would encode a cycle, not a divergent orbit.** So the CA objects one
  would naturally hunt for are aimed at the wrong counterexample type.
* **A cycle-free counterexample must generate an ever-widening, aperiodic defect** — a positive
  structural statement about what divergence looks like in this encoding.
* **An explicit 2-adic obstruction to any bounded-window nilpotency argument**, which is the same
  fixed-window barrier rounds 28–33 hit, arriving here from cellular automata.
* **What is left:** an exact **front-speed inequality**, stated explicitly — a fourth concrete target
  alongside the adelic synchronization theorem, R17's ordinal rank, and R24's graded nilpotence
  estimate.
* Failure mode (b), restatement, with unusually useful structure attached.

## Round 35 — approach 30, Base-6 carry particles

`round-35-output.md`, 18765 chars, 45m 29s. **Not a proof; base 6 makes the bulk a *reversible*
carry gas, so all dissipation lives at the two boundaries — and the remaining boundary statement is
again equivalent to Collatz.**

* **The bulk is information-preserving, proved exactly.** Splitting each base-6 digit as
  `d_j = 2c_j + p_j` (ternary carry charge, binary parity particle) makes the interior update a
  *permutation*. Proposition 11 then kills every one-cell additive Lyapunov function outright: if
  `V(x) = Σ v(x_j)` is nonincreasing under every bulk update then `v` is **constant**. Reversibility
  does the work — on a finite ring every orbit is periodic, so a nonincreasing quantity is constant.
  This is the cleanest statement yet of why local particle bookkeeping cannot decrease.
* **So convergence can only come from a source/sink imbalance at the boundaries**, and the round
  makes that quantitative: a *pointwise* (prefix-by-prefix, not asymptotic) source barrier
  `B_t ≥ (βt − 1)/(1 + 1/(3n₀ log 6))` with `β = 0.3868528…`, against the hard ceiling
  `B_t ≤ ⌈t/2⌉` forced by "an odd step is always followed by an even step". A minimal counterexample
  must ride an infinite no-adjacent-1s source word whose *every* prefix stays above that line.
* **Gliders are cycles (Theorem 7), and there is no finite bulk glider (Prop 8).** Same lesson as
  round 34 from a different encoding: the localized objects one would hunt for are aimed at the wrong
  counterexample type.
* **Cycle-or-expanding-cloud dichotomy (Theorem 6):** a finite configuration either enters a cycle or
  has `n_t → ∞` and `ℓ_t → ∞`. Complete as a dichotomy, but it does not exclude the second class.
* **The restatement.** Theorem 12: "every `n` with ≥2 base-6 digits has some `t` with `H_t > B_t`"
  (the *Boundary Overtaking Theorem*, i.e. `ℓ(T^t(n)) < ℓ(n)`) is **equivalent** to Collatz — the
  reduction is a one-line strong induction on base-6 length.
* **Prior art acknowledged in-round:** Korec's base-6 CA (nilpotency equivalent to Collatz) and
  Kari's reversible base-6 multiplication automata, whose orbits contain every finite word — so no
  finite catalogue of gliders, defects or forbidden collisions can suffice.
* Failure modes (b) and (d) together — restatement, plus a *proved* no-go for the blunt-invariant
  family, which is the more useful half.

## Round 36 — approach 31, Rotor-router inverse branching

`round-36-output.md`, 14708 chars, 37m 52s. **Not a proof, and this is the campaign's cleanest
mode-(c) kill: the intended endpoint — "the inverse tree of 1 covers every residue class" — is
already an unconditional theorem, so a divergent orbit or a nontrivial cycle would satisfy it too.**

* **The endpoint is vacuous, not merely unproved.** `P(1)` meets every residue class modulo every
  integer unconditionally — it is already dense in the profinite topology — *whether or not Collatz
  is true*. So the two readings of "cover all residue classes" are: the weak one, already proved and
  insufficient; or the strong one, which **is** `P(1) = N`, the conjecture itself. (Second time the
  campaign has caught a proposed certificate that a counterexample already satisfies — cf. round 33's
  "vacuous" unlabeled WQO.)
* **A finite, checkable obstruction at depth 9** to the rotor coupling itself. Among the eight
  `2 mod 3` nodes of `L_9`, the actual lift counts mod 9 are `(2,1,5)`; any cyclic three-state rotor
  fired eight times must produce a permutation of `(3,3,2)`. So the real tree is **not** a standard
  rotor realization, and cannot be sandwiched between two unit-discrepancy rotors — the upper rotor
  count is ≤3 against an actual 5. The hidden ternary digits are arithmetically correlated through
  the inverse-word constants, not balanced by a rotor stack. Explicit finite refutation, the strongest
  form available, and it costs nothing to re-verify.
* **What survives:** the rotorization is real (finite-type deterministic branching, bounded local
  discrepancy, the 4/3 branching scale), and it gives uniform exponential leaf growth
  `N*_{k+4}(a) ≥ 2 N*_k(a)` for `a ≢ 0 mod 3`. Growth without location, which is exactly the gap.
* **Three new sufficient targets, all sharper than "cover the residues":**
  1. **Height-controlled modular coverage** — for arbitrarily large `m`, every `1 ≤ r < m` has a
     representative `y ∈ P(1)` with `y ≡ r mod m` *and* `y < m`. The size constraint forces `y = r`,
     hence `{1,…,m−1} ⊆ P(1)`. The missing ingredient is archimedean, not modular.
  2. **Power-saving completion lemma** — `E(X) = X − #(P(1) ∩ [1,X]) = o(X^0.84)` implies Collatz,
     because any exception drags a whole inverse tree (≥ `X^0.84` elements) into the exceptional set.
     Note `X^{1+o(1)}` coverage is *not* enough — `X/log X` is `X^{1+o(1)}` and misses almost all
     integers.
  3. **`{n ≡ 2 mod 9} ⊆ P(1)` suffices**, since every positive orbit contains a `2 mod 9` term.
* **Verify before use:** the `X^0.84` inverse-iterate lower bound and the arithmetic-progression
  theorem are both taken from cited literature inside the round, not proved there.
* Failure mode (c), with a finite explicit refutation of the mechanism attached.

## Round 37 — approach 32, Electrical capacity of infinity

`round-37-output.md`, 16051 chars, 58m 37s. **Not a proof. The electrical calculation goes through
and gives a clean zero-capacity theorem — but the bridge "zero capacity ⇒ every orbit returns" is
refuted by a two-line counterexample, and the theorem is componentwise, so a nontrivial cycle
satisfies it too.**

* **A genuine theorem, proved in-round.** With the cumulative derivative conductance `c(v,p) = Q(v)`
  on the Syracuse inverse tree, a telescoping identity along any inverse path gives
  `Q(v)·v = 1 − (1/3)Σ Q(x_i)`, hence `Q(v) ≤ 1/v`, hence `Cap(1,∞) = 0`. Clean, and the mechanism is
  a exact identity rather than an estimate.
* **The bridge is false, by counterexample.** The half-line `0−1−2−3−…` with unit conductances has
  infinite resistance, so zero capacity and a recurrent random walk — yet `D(k) = k+1` escapes from
  every start. *Electrical recurrence is random-walk recurrence, not orbit recurrence: the network
  forgets which direction is the Collatz direction.* This is the round's sharpest object.
* **Componentwise universality kills it a second way.** The same identity holds rooted at any odd
  `m` (`Q(v)v = m − (1/3)ΣQ(x_i)`, so `Q(v) ≤ m/v`), so *every* attached inverse tree has zero
  capacity. Delete a hypothetical cycle's finitely many edges and you get rooted inverse trees, each
  zero-capacity; restoring the cycle does not create positive-capacity ends. So **a nontrivial cycle
  is completely compatible with the theorem** — mode (c) again, and the campaign's second in a row.
* **The disconnection point, stated plainly.** A network built only from Collatz edges cannot see a
  bad component at all: adjoin a disjoint ray `y_0 → y_1 → …` and the capacity from 1 is unchanged
  while the graph now has an escaping orbit. Any repair needs non-Collatz "horizontal" edges or a
  genuinely directed, non-reversible capacity — and then needs a proof that the addition did not
  smuggle in the connectivity being assumed.
* **The other conductance family fails oppositely:** local (multiplicative-expansion-only)
  conductances give *positive* capacity, because the inverse tree contains a bounded-label binary
  subtree. So the two natural weightings bracket the target from both sides.
* **Same archimedean wall as round 36, reached independently.** Congruence density (every component
  meets every AP) cannot join components; what's missing is representatives *smaller than* the
  modulus — which the round notes is comparable in strength to the conjecture itself. Two
  consecutive rounds, from unrelated directions, land on the same missing ingredient.
* Failure mode (c) plus an explicit counterexample to the proposed implication.

## Round 38 — approach 33, Sandpile stabilization

`round-38-output.md`, 17899 chars, 55m 49s. **Not a proof — the surviving stabilization condition is
exactly Collatz — but this is the richest negative round of the block: four separate no-gos, one of
which finally pins down the `−1` blind spot that has haunted the campaign since round 11.**

* **The `−1` obstruction, made exact.** For `n_0 = 2^m − 1` the round proves
  `n_j = 3^j·2^(m−j) − 1` with `a_j = 1` throughout, so for `s ≤ j ≤ m−r`,
  **`n_j ≡ −1 (mod 2^r 3^s)`** — a long central stretch of trajectory that looks *completely
  stationary* to every fixed collection of binary AND ternary residue windows at once. Also kills
  bounded-horizon descent outright: for any `K`, pick `m > K+1` and `n_j > n_0` for all `j ≤ K`. The
  round names the requirement this forces: an effective certificate must record an **unbounded
  distance from the 2-adic state `−1`**. That is the sharpest statement yet of what rounds 11, 18 and
  the whole fixed-window family were missing — the shadow of the all-ones configuration.
* **No nonnegative site-additive potential can decrease under every firing**, with *arbitrary
  position-dependent weights*. Beautifully short: the right-boundary rule forces `δ(0) > 0` where
  `δ(r) = w_t(r) − w_2(r)`, the internal swap `t2 → 2t` forces `δ(r+1) > δ(r)`, so `δ > 0` always —
  but the left-boundary rule `/2 → /ft` forces `δ(m) < 0`. Contradiction. Any proof here must be
  nonlinear, block-based or genuinely multiscale. This is the fourth independent closure of the
  additive-Lyapunov family (rounds 11, 28, 29, now 38 — and round 35 for the reversible-bulk case).
* **Least action is the wrong tool, precisely.** It gives order-independence *after* a complete
  firing vector exists; it does not produce one. And the finite-network halting criterion
  (production-matrix eigenvalues in the unit disk) does not apply — the carrier has an unbounded tape
  and creates sites; countably infinite abelian networks simulate Turing machines. Nor can the tape
  be replaced by a finite processor: finite abelian processors compute *weakly increasing* functions
  of input counts, and the Collatz shortcut map is not increasing.
* **The cycle side gets a genuinely pretty reformulation.** The cyclic toppling matrix
  `(L_a)_ii = 2^(a_{i−1})`, `(L_a)_{i,i−1} = −3` satisfies `L_a·n = 1` and
  **`det L_a = 2^A − 3^k`** — the familiar Collatz cycle denominator *is* a toppling determinant, and
  `2^A > 3^k` (the standard archimedean condition) is exactly when it is a nonsingular M-matrix. What
  remains is lattice integrality: whether `1 ∈ L_a·Z^k` with the solution positive and with the
  prescribed valuations.
* **The restatement.** The *pointwise odometer theorem* — for every odd `n_0 > 1` there is `k` with
  `Σ_{j<k}(a_j − β_j) = ⌊log₂ n_0⌋`, where `β_j` is the leading binary carry — is equivalent to
  Collatz (`ℓ_k = ℓ_0 − Σ(a_j − β_j) = 0` iff `n_k = 1`).
* Failure mode (b), but carrying four reusable impossibility results and the `−1` diagnosis.

## Round 39 — approach 34, Directed-polymer free energy

`round-39-output.md`, 17353 chars, 59m 16s. **Not a proof, and unusually the proposed decisive
statement is not merely unproved but FALSE: negative quenched free energy fails on exactly the
environments a real counterexample selects.**

* **The annealed/quenched sign error, made exact.** The uniform-residue average
  `3^{−j}Σ_ξ N_j(ξ) = e^{−I(α)j+o(j)}` is the tempting "negative free energy" — but it only says
  *most* environments contain no critical polymer. A hypothetical critical trajectory does not draw a
  uniform residue; it selects its own `ξ_j = ρ_j(w_j)`, so `N_j(ξ_j) ≥ 1` and
  `(1/j)·log N_j(ξ_j) ≥ 0` **always**. Same for the weighted partition: `Q_j(ρ_j(w)) > 1` for every
  `w`. This is a cleaner statement of the annealed-to-quenched gap than the campaign has produced
  before — the negative number is real, and it is about the wrong ensemble.
* **The decomposition that survives** is worth keeping: bulk mass (exponentially subcritical, all
  unpinned cylinder mass decays exponentially — Theorem 3) **plus** pinned least-realization atoms.
  The pinned partition `Π_j(s) = Σ_{w∈P_j} R_w^{−s}` has the exact zero-temperature limit
  `Σ_{n odd, τ(n)=∞} n^{−s}` — i.e. **the pinned atoms are literally the counterexamples**, one atom
  of weight `n^{−s}` per divergent `n`. Collatz ⟺ extinction of the pinned partition.
* **A rare "the target is stronger than Collatz" observation.** Strict negative pressure
  (`Π_j(s) ≤ Ce^{−cj}`) implies Collatz but is not implied by it: even with every `τ(n)` finite, the
  descent times could grow fast enough that `Π_j(s) → 0` only subexponentially. Worth remembering
  whenever a future approach proposes an exponential-decay target.
* **A concrete sufficient criterion with a number attached.** With `O_c(n)` the critical-strip
  occupation count, a least counterexample forces `O_c(n) ≥ ⌊3cn log 2⌋ + 1`; so proving
  `O_c(n) = o(n)` uniformly for some `c > 0` finishes the conjecture by strong induction. The
  annealed model even predicts where the last critical visit sits: `j ≈ 12.6074·log₂ N`. Converting
  that prediction to *every* seed is exactly the leap Tao's almost-all result does not make.
* **A three-part repair program** (nonresonant sector via min-plus/joint-spectral-radius certificate;
  resonant sector where blocks go Sturmian/Christoffel along convergents of `log₂ 3`, needing the
  2-adic value `n = −Σ 2^{A_i}/3^{i+1}` to be irrational; and a rigidity dichotomy between them).
  Note the resonant half touches the same Sturmian machinery as round 25.
* Failure mode: the sharpest available — the proposed bridge is **refuted**, not merely unfinished.

## Round 40 — approach 35, Dependent percolation domination

`round-40-output.md`, 14841 chars, 48m 54s. **Not a proof, and — like round 39 — the proposed
statement is FALSE, not merely unproved: the deterministic tree provably cannot be dominated by any
subcritical percolation process, at any block scale.**

* **The refutation is the `2^m − 1` family again, in a third guise.** `w_k = 1^k` has every prefix
  above the barrier (`q_j = (3/2)^j > 1`) and is realized by `r_k = 2^k − 1` with
  `T^j(2^k−1) = 3^j·2^{k−j} − 1`. So the open tree contains the **infinite all-ones ray**, whose
  representatives converge 2-adically to `−1`. A subcritical cluster has no infinite ray a.s. —
  contradiction. Third consecutive block in which `−1` is the object that kills the method (rounds
  38, 39-adjacent, 40).
* **Worse than one bad ray: arbitrarily deep *complete* open cones.** With surplus
  `D_j = S_j − βj`, any prefix with `D_k ≥ βL` has **all** `2^L` continuations open — and `1^m` gives
  `D_m = (1−β)m`. Hence **no fixed block size admits a uniform conditional open probability `p < 1`**,
  which is exactly the hypothesis Liggett–Schonmann–Stacey-type domination theorems require. The
  method is not merely hard to apply here; its hypotheses are provably unavailable.
* **Two real subcritical theorems survive, both annealed.** Forward growth-compatible cylinders have
  Haar mass decaying like `0.9659065^k`; the accelerated integral inverse words decay like
  `0.9465046^j` (rate `Λ = α^α/(α−1)^{α−1} = 2.8395…` against `3^j`, Borel–Cantelli, no independence
  needed). Same annealed/quenched wall as round 39 — a counterexample supplies a *correlated* moving
  endpoint sequence, an "immortal spine" the first-moment bound cannot see.
* **A second, independent gap the campaign had not stated before.** Even killing every stationary
  ray would not finish: **coefficient decline is not descent.** There are segments with
  `3^{S_j}/2^j < 1` yet `T^j(n) ≥ n` — and a nontrivial cycle would necessarily have this property
  over one period. So the coefficient stopping time and the classical stopping time are genuinely
  different notions, and a proof needs both (I) no stationary ray *and* (II) first crossing gives
  actual descent.
* **The repaired criterion, sharply stated:** with `E_k(N) = {1 < n ≤ N : T^i(n) ≥ n, 1 ≤ i ≤ k}`, a
  uniform bound `|E_k(N)| ≤ C·N^a·ρ^k` implies Collatz (integrality forces `|E_k(N)| = 0` eventually,
  then strong induction). Explicitly stronger than density `|E_k(N)|/N → 0`, which permits exactly
  one nested exceptional ray. Equivalent tree form: weights `W` with `Σ_{open children} W ≤ ρW`,
  where `W` must couple canonical-seed stabilization + terminal 3-adic fibre + **prefix archimedean
  surplus** — bounded-suffix weights provably cannot work.
* Failure mode: refutation, plus a new distinction (coefficient vs classical stopping time) worth
  testing every future approach against.

## Round 41 — approach 36, An algorithmic Lovász local lemma

`round-41-output.md`, 17899 chars, 35m 33s. **Not a proof — and the tool points the wrong way. The
LLL proves survivors EXIST; the approach needs that none do. Third consecutive refutation.**

* **The polarity proposition.** The required statement is `⋂ D_i^c = ∅`, i.e.
  `P(⋂ D_i^c) = 0`. The LLL's entire purpose is to prove `P(⋂ D_i^c) > 0`, and its algorithmic
  versions *construct* an assignment avoiding every bad event. Applied here it would **build a
  symbolic survivor**, not exclude one. Applying it to the complements gives one word lying in every
  `D_i`, when what's needed is that *every* word lies in at least one. And failure of an LLL
  criterion (`epd < 1`, Shearer) is not a refutation — those criteria are sufficient conditions for
  avoidance, so their failure proves nothing. A clean, quotable "wrong direction" diagnosis.
* **An exact spurious critical ray, and it's a new one.** `a = (1,2,1,2,…)` is strictly critical
  (`A_{2m} = 3m`, so `2^{A} = 8^m < 9^m = 3^{2m}`). One block gives `U²(x) = (9x+5)/8`, whose fixed
  point is `x = −5`: the cycle `−5 → −7 → −5` with valuations `1,2`. Prefix `(1,2)^m` forces
  `n ≡ −5 (mod 2^{3m+1})`, so `R_{2m} = 2^{3m+1} − 5 → ∞` — never stabilizing at a positive integer.
  So the symbolic critical tree contains infinite rays belonging to **negative** seeds. Note the
  pattern: round 38 and 40's obstruction was `−1`; this one is `−5`. The blind spot is not one
  number, it's the negative/2-adic seeds as a class.
* **Terminal death events provably cannot cover the tree.** The `(1,2)^∞` ray dodges every nontrivial
  terminal-to-1 suffix event: a suffix ending in `2` fails at level one (`1 + 2² ≢ 0 mod 3`), and one
  ending in `1` has final pair `(2,1)`, which the level-two classification excludes. So suffix-local
  events must be supplemented by a global condition detecting whether the nested 2-adic
  representative stabilizes positive.
* **The same `0.9465046^k` sparsity constant as round 39/40**, arriving here from a third direction:
  length-`k` competitors with total exponent `≤ ⌊αk⌋` occupy at most `binom(⌊αk⌋, k) ≈ γ^k` of the
  `3^k` residue classes, `γ = 2.8395137 < 3`. Hence "every word has many independent local killers"
  is **quantitatively unavailable** — the killers are exponentially sparse. Three unrelated
  approaches now converge on this constant.
* **The salvage is well-specified: a ranked covering certificate.** Finite-state label
  `q : T∖D_M → Q` plus a rank into a well-founded set `W`, such that every feasible continuation
  begins with a block from a finite prefix code and each leaf satisfies (D) M-dead, (L) `R(wv)>R(w)`,
  or (R) `ρ` decreases. Then no nondead infinite critical ray is realized by a fixed `n ≥ M`. Closer
  to a cyclic-termination proof than to LLL — and **Moser–Tardos could legitimately be used to
  *discover* such a cover**, after the state space exists.
* Failure mode: (a)-flavoured — a genuine obstruction, with the tool misapplied rather than the
  problem restated. Still needs the same two theorems: stationary-ray synchronization + all-depth
  first-crossing elimination.

## Round 42 — approach 37, Coding-theoretic minimum distance

`round-42-output.md`, 17143 chars, 44m 50s. **Not a proof. Fourth consecutive refutation, and this
one has TWO independent defects — one arithmetic, one definitional.**

* **The code is the whole space (parity saturation).** `Q_K(m) = Q_K(n) ⟺ m ≡ n (mod 2^K)`, so `Q_K`
  is a *bijection* `Z/2^K → {0,1}^K`. Every finite parity/valuation word is realizable, the code has
  zero redundancy, and **every** nonempty finite sustained-growth language meets it — distance zero.
  Generalized: any code whose information is a finite word plus finitely many word-determined carries
  has a codeword above every finite word. A clean finite-local coding no-go.
* **The requested inequality is impossible by definition.** `d(G,C) ≤ R(C)` always, since
  `R(C) = sup_x d(x,C)`. So "distance from the code exceeds the covering radius" cannot hold for any
  code in any metric space — not an arithmetic obstruction at all. Worth noting as a category: the
  campaign's first *definitional* refutation, as opposed to a counterexample.
* **A genuine unconditional pointwise packing bound**, which is the round's keeper. At a
  coefficient-record time `j`, the affine identity `x_j = q_j·x_0 + (1/3)Σ_{r≤j} u_r` with `u_r ≥ 1`
  gives `x_j > j/3`; a fractional-knapsack count of distinct prior states below `x_j` (capacity
  `y/2^{a+1}` for valuation `a`, budget `A_j ≤ αj`) sharpens it to
  **`x_j ≥ 3.0873545439·j − O(log x_j)`**, constant `24(3 − log₂3)/11`. Unconditional and pointwise —
  rare in this campaign. But only *linear* in `j`, where a coding proof needs output length growing
  linearly in input length.
* **Rate deficit `δ = 1 − H₂(log₃2) = 0.0500444728…`** as the common binary/ternary figure — the
  fourth distinct constant of this block (after `0.9659065`, `0.9465046`, `2.8395137`).
* **The completion target is sharp and it covers both failure modes at once.** With
  `B_{L,K} = {1 < n < 2^L : T^t(n) ≥ n for 1 ≤ t ≤ K}`, the *actual-barrier list-decoding* bound
  `|B_{L,K}| ≤ C·2^L·e^{−ηK}` implies Collatz (a least counterexample sits in `B_{L,K}` for every
  `K`, but the bound drops below 1). **Excludes divergent orbits and nontrivial cycles
  simultaneously** — most targets in this campaign handle only one.
* Round 40's "coefficient decline is not descent" recurs independently here (§9.1 additive carry
  rescues a contracting prefix; §9.2 cycles lie outside the sustained-growth cone). Two rounds, two
  routes, same warning.

## Round 43 — approach 38, List decoding of valuation profiles

`round-43-output.md`, 16612 chars, 60m 33s. **Not a proof. But it is the first round of this block
to hand over an explicit numeric object, and I VERIFIED IT INDEPENDENTLY — every claimed number
checks.**

* **The injectivity hope is false, by an exact depth-22 collision.** The two strict-barrier words
  ```
  w1 = (1,1,1,1,1,1,1,1,1,2,1,1,3,3,1,1,2,1,1,5,1,3)
  w2 = (1,2,1,2,1,2,2,1,2,1,1,3,1,2,1,2,1,2,2,1,2,1)
  ```
  both have length 22 and total valuation 34, both satisfy `2^{A_t} < 3^t` at every `t`, and
  `C_{w2} − C_{w1} = 125 524 238 436 = 4·3^22` **exactly**. Hence identical endpoint syndrome, and
  for every common endpoint `n_2 = n_1 − 4` (seeds `22 528 613 375` and `22 528 613 371`).
  *Independently recomputed from the definition `C_w = Σ 3^{j−1−i} 2^{A_i}` — the constants, the
  `4·3^22` identity, both barrier checks, the syndrome equality and both seed representatives all
  reproduce.* First externally-verified concrete object of rounds 35–43.
* **And the collision is a family, not an accident.** For any common suffix `s` of length `t`,
  `C_{w2 s} − C_{w1 s} = 4·3^{22+t}`, and appending `1^t` preserves the barrier since
  `34 + t < (22+t)·log₂3`. So fixed-total strict-barrier collisions exist at **every** depth ≥ 22.
* **The collision is useful, not fatal:** it is an exact descending diamond (`w1` is unconditionally
  dominated by the equal-slope larger-intercept `w2`), hence a genuine pruning certificate. Worth
  keeping as a *tool* rather than filing as a failure.
* **The sharpest statement of this block's recurring wall.** In the recurrent subsystem
  `m_{t+1} = (81 m_t + ε_t)/64` (`ε∈{0,1}`, admissible `m ≡ 0` or `15 mod 64`), the depth-`r` words
  occupy exactly `32^{−r} → 0` density yet their **cardinality is never zero**. Termination is
  equivalent to the least positive representative `M_r → ∞`, *not* to density → 0. Compact way to say
  what defeated rounds 39, 40, 41 and 42: **exponentially sparse lists can still contain an infinite
  nested ray.**
* **Also proved:** endpoint lift index = −(seed representative), and a lift-width ⇒ explicit
  list-size bound.
* **Remaining theorem** (positive stationary list-extinction): if `R_j = m > 1` for all large `j`,
  some finite depth admits a competitor `b` with `E_j ≡ C_b 2^{−B} (mod 3^r)` and
  `0 < (2^B E_j − C_b)/3^r < m`. Same synchronization statement rounds 41 and 42 arrived at —
  in the local-global notation, `Σ(u,τ,c) + h_max(τ,B) < 0`.

## Round 44 — approach 39, An information-capacity bound

`round-44-output.md`, 13150 chars, 52m 20s. **Not a proof. Fifth consecutive refutation, and the
failure is a single identifiable equation — the approach double-counts one message as two.**

* **The additive budget is simply wrong.** The proposed cost was `H(word) + r·log₂3`. But the ternary
  endpoint is a *deterministic function of the parity word*, so `H(Y|E) = 0` and
  **`H(E,Y) = H(E) = k`**, not `k + r log₂3`. The Markov chain is `N → E → Y`, so
  `I(N; E,Y) = I(N; E)` with the conditional term exactly zero. Even with only a coarse profile `G`,
  `H(G,Y) ≤ H(E) ≤ k`. Endpoint data can only consume uncertainty already inside the profile class —
  it cannot create a second independent demand.
* **The entropy-of-a-constant point, stated plainly.** For a fixed hypothetical counterexample `n`
  every entropy in sight is **zero**: `H(n) = H(E_k(n)) = H(T^k(n) mod 3^r) = 0`. You cannot use the
  entropy of a uniform ensemble of `2^k` seeds to exclude one deterministic member of it. This is the
  cleanest one-line statement of the annealed/quenched wall that has now defeated rounds 39–44.
* **A verified positive countermodel to all rate-only reasoning.** The shortcut `5x+1` map has the
  cycle `13 → 33 → 83 → 208 → 104 → 52 → 26 → 13`, parity word `1110000`, multiplicative coefficient
  `5³/2⁷ = 125/128 < 1`, endpoint = start. *I recomputed the orbit: it closes, and the parity word is
  exactly `1110000`.* So a negative asymptotic rate, exact integrality, a contracting coefficient and
  arbitrarily precise endpoint congruences **can all coexist with a surviving positive cycle**. Any
  argument from rates, alphabet sizes, data processing, or generic symbolic dynamics would wrongly
  exclude it — a successful proof must use arithmetic special to the multiplier 3.
* **The carry identity behind "coefficient decline is not descent"** (rounds 40, 42) gets its formula
  here: with `h_j = x_j/q_j`, `h_{j+1} = h_j + 1/(3q_j)`, so `h` is *increasing* and `x_j = q_j h_j`
  can stay above its start even while `q_j < 1`.
* **The exact bottleneck, stated as a clean arithmetic inequality.** With `ρ(e)` the least positive
  representative and `y(e) = (3^q ρ(e) + C(e))/2^k`, a paradoxical seed exists in the class **iff**
  `y(e) ≥ ρ(e)`, i.e. **iff `C(e) ≥ (2^k − 3^q)·ρ(e)`**. So the completion target (ZE) is: for all
  long enough contracting words, `C(e) < (2^k − 3^{|e|₁})·ρ(e)`. Not an entropy inequality — a
  worst-case correlation between the carry and an unusually small start representative.
* **One class fully closed:** a periodic noncontracting valuation block forces
  `n = C_w/(2^A − 3^j) < 0`. Every periodic noncontracting code is a *negative* rational 2-adic
  state, so any positive survivor must be genuinely aperiodic. (Fits rounds 38/40/41: the negative
  seeds keep being the objects that live in these trees.)
* **Sparsity constant:** growth-compatible endpoint residues occupy `≤ 2^{−0.0793186 j + O(log j)}`
  of `3^j`.
* *Unverified:* the round cites a July 2026 Kramer preprint as independent parallel work. Not checked
  — flag before any writeup leans on it.

## Round 45 — approach 40, Mahler-function transcendence of parity series

`round-45-output.md`, 18695 chars, 65m 55s. **Not a proof, but it produces the prettiest object of
the whole block: Collatz for `n` is EXACTLY the statement that a power series has radius of
convergence `√3`.**

* **The radius trichotomy.** For the orbit generating function `G_n`,
  ```
  R_n = √3            ⟺ the orbit reaches 1
  R_n ∈ (√3, 2)       ⟺ it reaches a nontrivial positive cycle
  R_n ∈ [2, 3]        ⟺ the orbit is nonperiodic
  ```
  so **`n` satisfies Collatz ⟺ `R_n = √3`**. And the whole tower collapses to one equivalence class:
  orbit eventually periodic ⟺ `F_n` rational ⟺ `G_n` rational ⟺ `G_n` algebraic ⟺ `G_n` D-finite ⟺
  `G_n` is `q`-Mahler for *one* `q ≥ 2` ⟺ for *every* `q ≥ 2` ⟺ `R_n < 2`. A genuinely elegant
  analytic reformulation, and the three regimes are separated by explicit numbers.
* **Why the recursion cannot supply the missing algebraicity — a real proof, not a gap.** Suppose a
  seed-independent Mahler equation `Σ A_i(z) F_n(z^{q^i}) = B(z)` held for all `n`. Every finite
  binary word is the initial parity word of some positive integer, so it would have to hold for
  *every* infinite binary sequence; the all-zero sequence forces `B = 0`, and a single 1 at position
  `r` forces `Σ A_i(z) z^{r q^i} = 0`, whose supports are disjoint for large `r`, so every `A_i = 0`.
  **No nontrivial finite Mahler equation is derivable from the local Collatz rules.**
* **Finite closure = periodicity.** The tail family `{G_{x_j}}` is finite iff the orbit is eventually
  periodic (parity transform injective). So "eliminate the tails to get a finite functional system"
  succeeds exactly when the orbit already repeats — circularity located precisely.
* **The two counterexample mechanisms sit on opposite sides**, which is why one contradiction cannot
  catch both: a divergent orbit gives `G_n` transcendental, non-D-finite, non-Mahler with `R_n ≥ 2`
  (and `F_n` with the unit circle as natural boundary), while **a nontrivial cycle gives `F_n, G_n`
  perfectly rational and Mahler**. Any "transcendence ⇒ contradiction" argument is aimed only at
  divergence and leaves cycles entirely untouched. Cf. round 42's ABLD, still the only target that
  kills both at once.
* **Where it lands in the literature:** since `F_n(2) = Q(n)` in `Z₂`, deriving rationality of `F_n`
  from `n ∈ Z_{>0}` *is* the assertion that `Q(n)` is a rational 2-adic number — the positive-integer
  half of Lagarias' Periodicity Conjecture. Full Collatz needs the stronger claim that the eventual
  period is the alternating `1,0` tail.
* Failure mode (b), but the restatement is worth keeping for its own sake — `R_n = √3` is the most
  compact encoding of Collatz this campaign has produced.

## Round 46 — approach 41, Christol–Cobham algebraicity trap

`round-46-output.md`, 18461 chars, 52m 57s. **Not a proof — and the diagnosis is unusually precise:
the borrowed machinery in the middle is entirely valid; the approach fails on BOTH sides of it.**

* **The middle step is sound.** Christol (algebraic over `F_p(z)` ⟺ `p`-automatic) plus Cobham (`2`-
  and `3`-automatic ⟹ ultimately periodic, since 2 and 3 are multiplicatively independent) plus the
  parity conjugacy `Q∘T = S∘Q` gives an exact theorem: **dual algebraicity of `E_n` mod 2 and mod 3 ⟺
  the parity sequence is ultimately periodic ⟺ the orbit is eventually periodic.**
* **Failure before Christol:** the affine carry equations *do not force algebraicity*. They act on
  orbit **values**, while Christol's kernels decimate the time/value **index** — and the strongest
  natural value-series equation still retains a **free Cartier section** after reduction. So the
  hypothesis Christol needs is exactly what is missing.
* **Failure after Cobham:** eventual periodicity is compatible with every hypothetical nontrivial
  cycle, whose parity series is *periodic hence rational in every characteristic*. Stated in-round as
  unavoidable: "dual finite-field algebraicity excludes divergent orbits, but cannot distinguish the
  trivial cycle from a nontrivial one." **Third round running (44, 45, 46) where the two
  counterexample types split across the method** — divergence is reachable, cycles are invisible.
* **A real lemma worth keeping:** an infinite *injective* Collatz orbit cannot have an ultimately
  periodic range. Proof by principal parts at `z = 1` in the range equation — for odd period the
  density bookkeeping gives `δ = 4δ/3`, forcing `δ = 0`. Clean, and independent of the rest.
* **What a completed route would still need**, stated as two theorems: **global integer-lifting
  rigidity** (free finite-field Cartier sections cannot come from one positive integral orbit) and
  **cycle classification** (the only positive periodic parity word satisfying its affine cycle
  equation is `10`) — i.e. exactly the no-divergence and no-nontrivial-cycle halves, unchanged.
* Failure mode (b) both ways round: valid tool, but its input is the conjecture and its output misses
  half the problem.

## Round 47 — approach 42, Aperiodic tilings of Collatz spacetime

`round-47-output.md`, 18542 chars, 41m 58s. **Not a proof — but it kills the approach's own key
lemma with an explicit counterexample, and then proves FOUR separate no-gos for repairing it.**

* **"Finite-support boundary ⇒ periodic" is FALSE**, by an explicit tiling. Take all-zero vertical
  boundary and a horizontal boundary of a single `1`: the columns are the base-3 expansions of
  `1, 2, 4, 8, …, 2^j`. If a translation by `(p,q)` eventually preserved it, `2^j(2^p − 3^q)` would
  stay bounded, forcing `2^p = 3^q` — impossible. Not a Collatz counterexample (it encodes doubling,
  not the orbit), but it refutes the unrestricted rigidity lemma outright.
* **Every additive local height is trivial — a four-line proof.** With potentials `v₀,v₁` on binary
  edges and `h₀,h₁,h₂` on ternary edges, requiring `v_N + h_E ≥ h_W + v_S` on all six tiles: tile 1
  gives `h₁ − h₀ ≥ d`, tile 3 gives `h₀ ≥ h₁` (so `d ≤ 0`), tile 2 gives `h₂ ≥ h₁`, tile 4 gives
  `d ≥ h₂ − h₁` (so `d ≥ 0`). Hence `d = 0` and all `h` equal — in *any* ordered abelian group, and
  the same with all inequalities reversed. **Fifth independent closure of the additive-Lyapunov
  family** (rounds 11, 28, 29, 35, 38, now 47).
* **The conservation law is unique too:** any tilewise linear `αN + βE + γW + δS = 0` is a multiple of
  `(3,1,−2,−1)`. So `3N + E = 2W + S` spans everything — no room for a different local invariant. And
  deforming that flux admits no strict critical version either.
* **The restricted statement is exactly Collatz.** With `Ψ(ε) = −Σ ε_t 2^t 3^{−s_{t+1}} ∈ Z₂`, the
  north boundary has finite support iff `Ψ(ε) ∈ N`, and Collatz ⟺
  **`Ψ(ε) ∈ N_{>0} ⇒ ε is eventually (1,0,1,0,…)`** (FBR). Clean, and it makes precise that the
  tiling machinery is complete while its remaining global statement is the conjecture.
* **What the round rules out for a continuation** — worth keeping as a checklist: not a finite
  forbidden-patch rule, not a compactness argument, not an edge-separable height. It must be a
  genuinely nonlocal invariant detecting the eventual-zero binary boundary and coercive against
  unbounded active width.
* Failure mode: (a)+(b) — a real refutation of the method's lemma, plus the residue being Collatz.

## Round 48 — approach 43, A topological-entropy gap

`round-48-output.md`, 17994 chars, 47m 54s. **Not a proof — a clean no-go: the approach's two
subshifts cannot both exist. Both candidate sets have the FULL language, so the entropy gap is
exactly zero where the argument needs it.**

* **`X_int` is not a subshift.** By Terras–Everett, `n mod 2^m -> (ε_0,…,ε_{m-1})` is a bijection
  `Z/2^m -> {0,1}^m`, so every finite parity word (equivalently every finite valuation word, via the
  block `1 0^{a_0−1} … 1`) is realized by infinitely many positive integers. Hence
  `L(X_int)` is the full language and `closure(X_int)` is the full shift.
* **`X_crit` is not a subshift either.** Append `1^∞` to any finite word: limiting drift becomes
  `log(3/2) > 0`, so every cylinder meets the nonnegative-drift set. Also nonclosed —
  `0^r 1^∞ ∈ X_crit` for every `r`, but the limit `0^∞` has drift `−log 2`. Same for the valuation
  version (`limsup A_j/j ≤ α`, extend by `1^∞` with average `1 < α`). So
  `L(X_int) ∩ L(X_crit)` = the full language: **the intersection does not shrink at all.**
* **The compactness step produces a 2-adic ghost, not an integer.** `n_m = 2^m − 1` has
  `T^k(n_m) = 3^k 2^{m−k} − 1`, so every prefix of `1^∞` is realized by a positive integer — yet
  `2^m − 1 -> −1` in `Z_2`, and `1^∞` belongs to `−1`. The missing property is not compactness but
  **eventual stabilization of the canonical binary residue** `r_m(u)`, which entropy cannot see.
  (Verified numerically here: the `3^k 2^{m−k} − 1` identity holds for all `k ≤ m`.)
* **Prefix-replacement lemma — a general impossibility.** If a nonempty closed `K ⊆ {0,1}^N` is
  stable under replacing any finite prefix by an arbitrary word, then `K` is the full shift. Since
  long-term drift is insensitive to finite prefixes, natural heredity + closedness forces the full
  shift rather than extinction. Corollary (Prop 3): no nonempty closed set of parity sequences is
  both backward-hereditary under `T(2n)=n` and inside the uniform nonnegative-drift set — because it
  would have to contain `0^∞`. **Sixth independent closure of the closed/local-invariant family**
  (11, 28, 29, 35, 38, 47, now 48 for the topological version).
* **The gap that IS real, and what it is worth.** Endpoint-critical words number
  `|C_m| = Σ_{s≥ρm} C(m,s) = exp(m·H(ρ) + O(log m))` with `ρ = log2/log3 = 0.6309297536`,
  `H(ρ) = 0.6584589953` (`0.9499555272` bits), so the deficit is
  `g = log2 − H(ρ) = 0.0346881852` nats = **`0.0500444728` bits per shortcut step**, i.e.
  `|C_m|/2^m ≈ 0.9659065532^m`. Absolutely, `|C_m| ≈ 1.9318131065^m` — exponential scarcity, **not
  extinction**. The averaged inverse-pressure version is the sharp form: `E_y N_m(y) =
  Σ_{s≥ρm} C(m,s) 3^{−s} = exp(−gm + O(log m))`, whose tilted transfer factor
  `F(t) = 2^{−t}(1 + 3^{t−1})` has minimum `F(t*) = e^{−g} = 0.9659065532 < 1` at
  `t* = 1.4880771321`. Valuation version: `M_j = C(⌊αj⌋, j)` with base `2.8395137305`, ratio to `3^j`
  equal to `0.9465045768`. **All of these reproduced exactly by independent computation here.**
* **But the average is not uniform** — `x_m = 2^m − 1`, `y_m = 3^m − 1` is an exceptional endpoint
  for `1^m` at every depth, 3-adic limit `−1` again. So Haar measure, entropy, Hausdorff dimension
  and Borel–Cantelli cannot by themselves exclude a trajectory that keeps riding exponentially thin
  exceptional classes. This is the same seam rounds 6, 7, 13, 15, 19, 22 hit, now reached from
  topological dynamics.
* **A separate structural point worth keeping: multiplicative drift excludes cycles automatically.**
  Around a period-`m` cycle with `s` odd steps, `0 = s log3 − m log2 + Σ log(1 + 1/(3x_k))` and the
  correction is strictly positive, so `s log3 − m log2 < 0`. Hence proving
  `X_int ∩ X_crit ∩ Z_{>0} = ∅` would kill **divergence only** — cycles need their own argument, and
  a height-based drift (zero on cycles) is no longer a valuation subshift because it depends on the
  affine carry `log(1 + 1/(3x))`.
* **The exact repair specified**: a *uniform weighted arithmetic-pressure certificate*, not an
  entropy bound. Weighted extinction lemma: if survivor states `T_m` satisfy
  `Z_m = Σ_v e^{tΦ(v)} ≤ C e^{−δm}` while every divergent orbit supplies `v_m` with
  `liminf Φ(v_m)/m ≥ 0`, then no divergent orbit exists (choose `0 < η < δ/t`; the single term gives
  `Z_m ≥ e^{−tηm} > Ce^{−δm}`). Local block form: weights `W`, block length `L`, `θ < 1` with
  `Σ_{L-step survivors} e^{t(Φ(u)−Φ(v))} W(u) ≤ θ W(v)` and `log W(v_m) = o(m)` along genuine orbits.
  The state must carry three components — 2-adic (does the seed residue stabilize), 3-adic (endpoint
  congruences, proximity to `−1`), archimedean (height/affine carry, to separate cycles from escape).
  Round 43's terminal-suffix locality theorem makes only the 3-adic component local.
* Failure mode: (a)+(d) — a genuine structural obstruction, plus the diagnosis that entropy is the
  blunt instrument: it counts residues but cannot detect whether one nested residue sequence
  stabilizes.

## Round 49 — approach 44, Schmidt-game avoidance in Z_2

`round-49-output.md`, 14579 chars, 36m 58s. **Not a proof — an exact classification of the game plus
a quantifier-mismatch no-go. Lands on the same seam as round 48, from game theory instead of
topological dynamics, and adds the sharpest statement yet of what is missing.**

* **Exact Schmidt classification (Theorem 3), both directions.** In the dyadic game `G(a,b)`
  (Alice writes `a` digits, Bob `b`): `D` is Alice-winning **iff** `a/(a+b) ≥ θ`, and `D^c` is
  Alice-winning **iff** `b/(a+b) < θ`, with `θ = log2/log3`. Proofs are one line each (play all
  ones / all zeros and take liminf–limsup). **Corollary 4:** neither `D` nor `D^c` is Schmidt-winning
  in the usual `α`-winning-for-all-`β` sense — fix `α`, set `A = ⌈−log₂α⌉`, and Bob picks `b` large
  enough to defeat either target. So the approach's proposed dichotomy ("either avoidable or
  winning") is **false**; the answer depends on the parameters.
* **The quantifier mismatch, stated exactly.** Schmidt winning gives
  `∃σ ∀τ : z(σ,τ) ∈ D^c`; Collatz needs `∀p ∈ P : p ∈ D^c`. The implication requires
  `∀p ∃τ_p : z(σ,τ_p) = p`, which fails because Alice can exclude `p` on move one. Worse —
  **Prop 5: `Z_2 \ P` is 1/2-winning outright**, by the trivial strategy "if the current ball
  contains `p_j`, step into the child that doesn't." So a winning strategy against "all embedded
  positive integers" exists **without using Collatz at all**; it only proves Alice can steer to a
  non-integer 2-adic point.
* **Finite-prefix shadowing** — the same ghost as round 48, in game form: since `Q` is an isometry,
  every parity sequence is shadowed to depth `k` by some `n_k ≡ x (mod 2^k)`, but `n_k` changes with
  `k` and escapes. `P` is dense and **not complete**; its completion is all of `Z_2`. The game
  supplies `∀k ∃n_k`; a counterexample needs `∃n ∀k`. **No Schmidt-game compactness principle
  interchanges these.**
* **The missing theorem, written down explicitly.** With `r_k(y)` the least representative of
  `Q^{-1}(y) mod 2^k`: `y ∈ P ⟺ r_k(y)` is eventually constant and positive, so the exact gap is
  **`y ∈ D ⇒ r_k(y) is not eventually constant`** — which *is* the divergent-orbits conjecture. This
  is the same "eventual stabilization of the canonical binary residue" that round 48 identified;
  **two consecutive rounds, from unrelated machinery, converge on the identical missing statement.**
* **Cycles are on the wrong side — proved twice.** Analytically `0 = s log3 − p log2 + E_p` with
  `E_p > 0`, and affinely `(2^p − 3^s) n = C_p > 0`, both giving `s/p < θ`. So `P ∩ D = ∅` is
  **exactly** the no-divergence conjecture and says nothing about cycles; the cycle half needs the
  separate divisibility `2^p − 3^s | C_p`. (The `1↔2` shortcut cycle has parity density `1/2 < θ`.)
* **Size of the critical set:** `μ(D) = 0` (digits are fair bits, `s_k/k → 1/2 < θ`), `D` is meagre,
  yet `dim_H D = H_2(θ) = 0.9499555272` — Hausdorff codimension only `0.0500444728`, **the identical
  constant round 48 derived as its entropy deficit per shortcut step.** Independently reproduced
  here, along with the affine-carry identity `2^k T^k(n) = 3^{s_k} n + C_k` (checked for many `n` to
  depth 40).
* Failure mode: (c)+(d) — the game theorem is true but its conclusion is about a *game outcome*, an
  object the counterexample class need never be; and dimension/measure/category are all blunt
  against a countable dense `P`.

**Rounds 48 and 49 are now a matched pair.** Approach 43 (entropy) and approach 44 (Schmidt games)
were designed to be independent, and both die at the same point with the same explicit witness
(`1^∞ ↔ −1`, residues never stabilizing) and the same numerical constant (`0.05004447` bits/step of
codimension). The campaign's strongest structural finding — that every method strong enough to
apply a compactness/rigidity theorem loses the ordinary-integer lift — now has a **ninth and tenth**
independent proof, and for the first time the missing statement has an agreed canonical form:
*eventual constancy of `r_k`*, i.e. the `∃n ∀k` / `∀k ∃n` interchange.

## Round 50 — approach 45, Arithmetic fractal intersection

`round-50-output.md`, 25812 chars, **69m 30s — the longest round of the campaign.** Not a proof, but
**the most constructive round since the early ones**: it kills the fractal-transversality route with
four separate obstructions, then replaces it with an explicit finite-height reduction, a canonical
coordinate pair with a proved bound, and an entropy margin **13.6× larger** than anything the
campaign had found. Two named statements now imply Collatz outright.

* **Three sharp dimension computations.** `dim_H C_α = H₂(log₃2) = 0.9499555272`;
  `log₃2 = 0.6309297536 ≤ dim_H K_β ≤ 0.9499555272` (lower bound by an explicit isometric coding on
  valuation digits `{1,2}`, upper by 1-Lipschitzness of `Ψ(a) = Σ 3^r 2^{−A_r}`, which satisfies the
  self-similar recursion `Ψ(a) = 2^{−a₀}(1 + 3Ψ(σa))`); and the decisive one,
  **`dim_H Q(N) = 0` but `dim_B Q(N) = 1`** — the image of the integers is countable yet meets every
  cylinder. The adelic graph `D₊ = {(Q(n), n)}` in `Z₂ × Z₃` is likewise `dim_H = 0`, `dim_B = 2`
  (density by CRT).
* **Four obstructions, each fatal on its own.** (1) Any intersection with `D₊` is countable, so
  `dim_H = 0` holds whether it is empty, has one counterexample, or infinitely many — the conclusion
  carries **zero** Collatz information. (2) Marstrand-type theorems give a.e. *translation*; Collatz
  is the one fixed placement `t = 0`, which may sit precisely in the null exceptional set. (3) The
  two fractals are not dimensionally transverse — their dimensions sum to `> 1.58`, so the heuristic
  predicts a *large* intersection. (4) **The sign test:** `3x−1` has the positive cycle `5 → 7 → 5`
  with valuation word `(1,2)`, mean `3/2 < β`; negating the affine term is a 3-adic isometry, so
  every contraction-ratio / valuation-frequency / entropy / dimension computation is *identical* for
  `3x+1` and `3x−1`. Any such argument would have to "prove" a false statement. **A fifth explicit
  counterexample-by-construction refuting a whole invariant class** (with rounds 12, 23, 25, 47).
* **An orientation bug in the approach's own setup, and a partial repair.** The endpoint residue at
  time `k` is coded by the *reversed* word, and the new digit is **prepended**, so successive
  truncations are not nested — one divergent orbit does *not* automatically give one point of `K_β`.
  Repair: at a record-minimum time of `D_k = A_k − βk`, the reversed word satisfies the prefix
  barrier `a_{k−1} + … + a_{k−r} ≤ βr` for all `r`, and then `3^r ≥ 2^{A_k−A_{k−r}}` forces
  `x_k > x_{k−r}` — **every record minimum of `D_k` is a record maximum of `x_k`**, a genuine
  synchronization of Archimedean growth with reversed 3-adic carry words. (Honest about the gap:
  a divergent orbit need not have infinitely many such records.)
* **Proposition 4 — canonical finite-height representatives, verified exhaustively here.** For any
  valuation word `w` of length `k` with total `A`, define `r₃(w)` odd in `[1, 2·3^k)` by
  `2^A r₃ ≡ C_w (mod 3^k)` and `r₂(w) = (2^A r₃ − C_w)/3^k`. Then `r₂` is a **positive odd integer
  with `r₂ < 2^{A+1}`**, it realizes exactly `w`, its endpoint is `r₃`, and all positive realizations
  are `r₂ + t·2^{A+1} ↔ r₃ + t·2·3^k`. **I checked all 81 words of length 4 over `{1,2,3}`:
  0 failures on every clause.** The affine identity `2^{A_k} x_k = 3^k x₀ + C_k` with
  `C_k = Σ 3^{k−1−j} 2^{A_j}` also verified for 2000 seeds to depth 25. And crucially, since
  `A_k ≥ k`, eventually `n < 2^{A_k+1}`, so `r₂(w_k) = n` and `r₃(w_k) = x_k` — **the canonical
  coordinates are eventually the actual seed and endpoint, not an artifact.**
* **The reduction: two explicit statements imply Collatz.** (AC) *Adelic small-corner extinction* —
  for some `η > 0`, no infinite valuation sequence has all long prefixes in
  `S_k(η) = {A(w) ≤ (β+η)k, r₂(w) ≤ e^{ηk}, r₃(w) ≤ (3/2)^k e^{ηk}}`; and (CYC) *cycle divisibility*
  — `2^{A(w)} − 3^{|w|} ∤ C_w` except for repetitions of `(2)`. The conditional theorem is proved
  cleanly. Note the two are genuinely independent: cycles satisfy `A/k > β`, the opposite side of
  the threshold, so they are invisible to `E_β` (a third proof of the cycle blind spot, after 48/49).
* **The entropy margin — the campaign's best number so far.** Independent-model survivor rate is
  `g(λ) − λlog2 − log2 + 2η`; at `λ = β` this gives **`log6 − g(β) = 0.7481266534 > 0`**, versus
  only `log3 − g(β) = 0.0549794728` from the seed coordinate alone. And a Borel–Cantelli argument
  makes it a *theorem* for generic independent Haar translations of the two coordinates. What fails
  is only that Collatz uses the fixed correlated translation `2^A r₃ = 3^k r₂ + C_w`.
  **All four constants reproduced exactly by independent computation here.**
* **A cross-round identity I verified:** rounds 48/49's constant is *exactly* this round's seed-only
  margin, rescaled from shortcut steps to Syracuse steps —
  `β·(log2 − H(ρ)) = log3 − g(β) = 0.0549794728` to machine precision. So the campaign's recurring
  `0.05004 bits/step` and this round's `0.0549794728 nats/odd-step` are **one constant**, and round
  50's contribution is that adding the *endpoint* height multiplies the available margin by
  **13.607×**. That is the first genuinely new quantitative gain in ten rounds.
* Failure mode: (a)+(d) — a real structural obstruction (Hausdorff dimension is blind to a single
  point, and blind to the sign of the affine term), with the blunt-invariant diagnosis made concrete
  by the `3x−1` control.

**Why this round matters more than its neighbours.** Rounds 48 and 49 identified the missing
statement (*eventual constancy of the canonical residue*) but left it a restatement of the
conjecture. Round 50 does something different: it keeps the Archimedean height that every previous
approach discarded, proves that the canonical pair `(r₂, r₃)` is computable and eventually equals
`(n, x_k)`, and shows the resulting target has a **large** margin under randomization. The residue
is no longer "prove Collatz" — it is *a deterministic anti-concentration / discrepancy theorem for
the exact affine carries `C_w`*, plus (CYC). Both are finite-height, checkable specifications of the
kind the campaign has been trying to isolate since round 17. **This is the strongest concrete target
the campaign has produced.**

## Round 51 — approach 46, An adelic product-formula Lyapunov height

`round-51-output.md`, 17745 chars, 51m 29s. **Not a proof — but the cleanest impossibility theorem
the campaign has produced, and the only one whose central object I could verify by direct
construction.** It kills the entire fixed-weight adelic-height class with an explicit family of
genuine positive-integer orbit blocks that gain unboundedly at `∞` while becoming arbitrarily
indistinguishable at BOTH `2` and `3` simultaneously.

* **The product formula gives conservation, not descent.** For the branch multiplier `q_a = 3/2^a`,
  `log|q_a|_∞ + log|q_a|_2 + log|q_a|_3 = 0` exactly; with arbitrary fixed weights the total is
  `(λ_∞ − λ_3)log3 + (λ_2 − λ_∞)a log2`, so **any negativity is hand-inserted, not forced**. Worse,
  after one accelerated step every orbit point is a unit at 2 and 3, so the *actual* state satisfies
  `log(T(n)/n) = −Σ_{p≥5} log|T(n)/n|_p` — **the entire archimedean change is balanced by primes
  `p ≥ 5`**, which the three-place system throws away. Similarly
  `log(n+1) − b log2 − r log3 = Σ_{p≥5} v_p(n+1) log p`. The three-place system is simply not closed.
* **Lemma 2, the adelic shadow block — verified here numerically, in full.** For even `A`, `C ≥ 2`
  and any target depths `B, R`, there are arbitrarily large odd `k` with
  `P = (2^A(2^k−1)−1)/3` and `N = (3^{k+1}−1)/2^{C+1}` positive odd, `N` in the accelerated orbit of
  `P`, valuation word exactly **`(A, 1^{k−1}, 2, C)`**, and `P ≡ N (mod 2^B)` *and* `P ≡ N (mod 3^R)`.
  **I ran it**: with `A = C = 2` the word matched exactly at every `k` tested (5, 9, 13, 17, 21, 25, …
  — the `1^{k−1}` run and the terminal `2, C` exponents all as claimed), and simultaneous deep
  agreement really does recur — `k = 145, 1009, 1873, 2737, 3601, 4465, 5329` (an arithmetic
  progression of period 864), e.g. at `k = 145`, `P ≡ N mod 2^6` and `mod 3^3` while
  `N/P ≈ (9/2^{A+C+1})(3/2)^k` is astronomically large. The construction is real.
* **Theorem 3 (the no-go).** If `V = h_∞ + h_2 + h_3` with `h_∞ = γ log n + O(1)`, `γ > 0`, and `h_2`,
  `h_3` locally bounded away from *finite* sets `S_2`, `S_3`, then `V` cannot strictly decrease at
  every accelerated step. Proof is two lines given Lemma 2: pick `A` with `α_A = −(2^A+1)/3 ∉ S_2`
  and `C` with `β_C = −2^{−(C+1)} ∉ S_3` (both families are infinite and pairwise distinct), so the
  finite-place differences are `O(1)` while `h_∞(N_j) − h_∞(P_j) → +∞`. **This holds for arbitrary
  fixed weights.**
* **What that rules out, explicitly**: every conventional Weil-height combination at `{∞,2,3}`; every
  height `γ log n + Σ λ_i v_2(f_i(n)) + Σ μ_j v_3(g_j(n))` with finite lists of rational `f_i, g_j`
  (so `v_2(n+1)`, `v_2(3n+1)`, `v_2(3n+5)`, `v_3(n+1)`, `v_3(2n+1)`, and any finite extension); and
  every bounded finite-state correction `γ log n + Φ(s(n))`. **Recording residues mod fixed `2^B` and
  `3^R` is provably insufficient — Lemma 2 makes the block's two ends identical at any prescribed
  finite resolution.**
* **Adding more poles cannot save it.** The obstruction sets are `A_2 = {−(2^A+1)/3}` (accumulating
  at `−1/3`) and `A_3 = {−2^{−(C+1)}}`, and since 2 generates the units mod every `3^R`, **`A_3` is
  dense in `Z_3^×`**. So a separable `h_2 + h_3` evading all shadow blocks would have to blow up on a
  dense set. The dynamical reading is elegant: `f_A(α_A) = −1`, `f_1(−1) = −1`, `f_2(−1) = −1/2`,
  `f_C(−1/2) = β_C` — the block **shadows the 2-adic fixed point `−1` for `k` steps, then transfers
  that shadowing depth into a 3-adic neighborhood**, while the real value climbs by `(3/2)^k`.
* **Proposition 1** (weaker but sharp): `N_k = 2^k − 1 → M_k = (3^k−1)/2` in `k` steps for odd `k`,
  with `M_k/N_k ~ (1/2)(3/2)^k → ∞`, killing every `V = γ log n + O(1)`. The `2^L − 1` family claims
  another victim — **its sixth** (rounds 15, 23, 29, 47, 48, now 51).
* **The specified repair, and one sharp corollary.** A survivor needs an unbounded state, an
  *adaptive* block time `τ(n)`, finite `V`-sublevel sets, and outside-prime (`p ≥ 5`) information or
  an equivalent exact carry invariant; the missing theorem is a **debt-non-recycling theorem** —
  a long positive-drift block must create arithmetic debt `≥ log(N/P)` that cannot be shuttled
  indefinitely between deeper 2-adic and 3-adic shadows. Corollary aimed straight at round 43's
  terminal-suffix locality: **the 3-adic suffix depth cannot be fixed** — it must grow with the
  excursion length and with `C`, because these blocks defeat every fixed depth.
* Failure mode: (a) — a genuine, constructive obstruction, with no restatement of Collatz anywhere
  in it.

**Read against round 50, this is the campaign's sharpest one-two.** Round 50 said the repair must
retain Archimedean height alongside the 2- and 3-adic data; round 51 proves that height plus *fixed*
2- and 3-adic data is provably not enough, and identifies the missing ingredient as the `p ≥ 5`
leakage that the product formula shows is carrying the entire compensation. Together they say: the
state must be `(height, unbounded carry, outside-prime debt)` with an adaptive block clock — and
they rule out, by explicit construction rather than by argument, every cheaper option.

## Round 52 — approach 47, Vojta or abc for uniform near-cycle exclusion

`round-52-output.md`, 18113 chars, 59m 22s. **Not a proof — but it proves the approach's own central
lemma FALSE under abc, and then rebuilds the route around a better target.** It also contributes two
unconditional theorems that stand independent of any conjecture.

* **The near-cycle reduction works, exactly as hoped.** At a first crossing (`A_i ≤ ρi` for `i < j`,
  `A_j > ρj`) every term of `C_j = Σ 3^{j−1−i} 2^{A_i}` is `≤ 3^{j−1}`, so `C_j ≤ j·3^{j−1}`; with
  `2^{A_j} > 3^j` and no descent this gives **`0 ≤ x_j − n < j/3`**, plus `A_j − ρj = O(log j)` and,
  via Baker's lower bound `Λ_j ≥ c j^{−κ}` (so `D_j ≥ c·3^j j^{−κ}`), **`n, x_j = j^{O(1)}`**. An
  extremely rigid reduction. *(I verified the two supporting lemmas over all 29,999 first crossings
  for odd `n < 60000`: `C_j ≤ j·3^{j−1}` and `2^{A_j} > 3^j` held every time. Note the "surviving"
  hypothesis `x_j ≥ n` never occurred in that range, so the displacement bound is vacuously true
  there — the lemma is sound but empirically untriggered at small heights.)*
* **The proposed radical lemma is false — and abc itself is what refutes it.** The first-crossing
  word `(1^{j−1}, b_j)` has `C_j = 3^j − 2^j` exactly *(verified for j ≤ 24)*. Applying abc to
  `2^j + (3^j − 2^j) = 3^j` (pairwise coprime) predicts `rad(C_j) ≥ 3^{j/(1+ε)}`, i.e.
  `log rad(C_j) = j log3 − o(j)` — **almost maximal**, the exact opposite of the required saving
  `log rad(C_j) ≤ (log3 − δ)j`. So the compressed three-term strategy cannot work, and the round is
  candid that this doesn't logically kill a saving restricted to *surviving* crossings, only that
  such a saving can never come from the shape of `C_j`, from first-crossing alone, or from abc.
  It correctly places Rozier's abc result (one even term, three-term equation) and cites that paper's
  own statement that unboundedly many terms is the obstruction.
* **Two unconditional theorems, both verified here.** (i) *Periodic factorization:*
  `C_{v^m} = C_v·Q_m` with `Q_m = (2^{Bm} − 3^{rm})/(2^B − 3^r)`, and since `Q_m` is odd,
  `Q_m | d` — hence **`|d| < Q_m ⇒ d = 0`**: a long repeated-block near-cycle cannot have a small
  nonzero displacement, it must collapse to an exact cycle, and then one copy of `v` already pins
  `n = C_v/(2^B − 3^r)`. *(Checked for blocks (1,2), (2), (1,1,3), (3,1,2,4) up to m = 6.)*
  (ii) *Eventually periodic ⇒ genuine cycle*, by a clean 2-adic argument: `ν_2(y_k − y_*)` decreases
  by `B` each period and would go negative unless `y_0 = y_*`.
* **The dimension-growing reformulation, and why it dies.** Expanding `C_j` into the staircase tuple
  `P_j` removes `rad(C_j)` entirely — the interior coordinates are pure `2`-`3` units, so
  `R(P_j) = log rad(6 n x_j) ≤ j log2 + 2 log n + O(1)` while `h(P_j) ≥ j log3 + log n`. A
  dimension-uniform `abcde…` inequality with `o(j)` error would then force
  `j(log3 − (1+ε)log2) ≤ (1+2ε)log n + o(j)`, **excluding every nonperiodic orbit**. But: standard
  higher-dimensional Vojta has dimension-dependent constants and exceptional sets, and worse —
  **the trivial orbit `n = 1` is an explicit permanent counterexample**: `3^j + Σ 3^{j−1−i}4^i = 4^j`
  *(verified to j = 29)* has `R(P_j) = log6` while `h(P_j) = j log4`. Exceptional families are not a
  technicality; the trivial cycle forces one, and any hypothetical nontrivial cycle would generate
  its own.
* **The corrected target is sharper than the original.** With `G_w(X,Y) = X^{A_j} − Y^j` and
  `F_{w,d}(X,Y) = Σ X^{A_i}Y^{j−1−i} − Y^j d`, one has `gcd(G_w(2,3), F_{w,d}(2,3)) = |D_j|` while
  Baker gives `log|D_j| = j log3 − O(log j)`. So the needed theorem is a **uniform moving-polynomial
  gcd estimate** `log gcd(2^{A_j} − 3^j, C_j − 3^j d) = o(j)` outside coherent periodic exceptions.
  This is strictly better than a radical bound: it captures the divisibility a near-cycle actually
  forces and it *admits* the periodic exceptions rather than being refuted by them. The round is
  precise about why Corvaja–Zannier does not apply — their gcd theorems are for **fixed** coprime
  polynomials at `S`-unit points, whereas here the point `(2,3)` is fixed and the degrees, exponent
  sets and monomial counts all grow with `j`.
* Failure mode: (a)+(c) — a genuine obstruction (the radical lemma is false in the natural form),
  plus the residue being a theorem about a different object than any existing Vojta statement covers.

**This round pairs with 50 and 51 into a coherent picture of the remaining target.** Round 50 said
keep the Archimedean height; round 51 proved fixed 2- and 3-adic data cannot supply the descent and
pointed at the `p ≥ 5` leakage; round 52 now writes the surviving statement as a **gcd/divisibility**
bound rather than a height or radical bound, and supplies the exceptional-set geometry
(`C_{v^m} = C_v Q_m`) that any such theorem must accommodate. All three agree that cycles need a
separate argument — round 52 makes that concrete too: even a full exceptional-set classification
reduces Collatz to exact cycles without distinguishing the trivial block `(2)` from a hypothetical
nontrivial one, and notes the literature has excluded `m`-cycles only for `m ≤ 91`.

## Round 53 — approach 48, The Subspace Theorem for trajectory identities

`round-53-output.md`, 15444 chars, 62m 49s. **Not a proof — but the most precisely quantified
"just misses" in the campaign: three separate routes each land EXACTLY on the Subspace Theorem's
critical exponent, never past it.** It also contributes a genuine unconditional partial rigidity
theorem and an exact conditional completion.

* **The cleanest S-unit formulation yet.** From `2^{A_j}x_j = 3^j x_0 + C_j`, dividing by `3^j` gives
  `h_j = x_0 + Σ_{i<j} 2^{A_i}/3^{i+1} = 2^{A_j}x_j/3^j`, which `→ 0` in `Q_2` since `A_j ≥ j`. Hence
  every infinite valuation trajectory satisfies the exact 2-adic identity
  **`x_0 = −Σ_{i≥0} 2^{A_i}/3^{i+1}`**, with every summand in the rank-2 group `⟨2,3⟩`.
  *(Verified here: `x_0 + Σ_{i<j} 2^{A_i}·3^{−(i+1)} ≡ 0 mod 2^{A_j}` in all 50,000 cases tested,
  odd `x_0 < 4000`, depth 25.)*
* **The dimension grows — and no fixed-rank theorem can fix it.** The relation has `j+2` summands.
  Crucially the round shows a hoped-for shortcut is *false*: "long S-unit relations in fixed rank must
  be degenerate" fails outright, because the trivial orbit gives the nondegenerate arbitrary-length
  relation `4^j = 3^j + Σ 3^{j−1−i}4^i` (just `4^j − 3^j = (4−3)Σ 4^i 3^{j−1−i}`). What would be
  needed is that every long *trajectory-shaped* relation is generated by short identities like
  `4 = 3+1` — far stronger than the Subspace Theorem.
* **Proposition 1, the compression barrier — verified.** Grouping the `N` carry terms into `m` blocks
  gives `B_r = 2^{A_{s_r}}K_r/3^{t_r+1}` with `gcd(K_r,6) = 1` and `K_r ≥ 3^{t_r−s_r}`, hence
  **`Π K_r ≥ 3^{N−m}`**. *(Checked over 7,996 random block partitions: zero failures on every clause.)*
  All 2- and 3-powers then cancel across the places, leaving the exact identity
  `Π_v Π_i |L_{v,i}(Y)|_v = x_0^{(3)} 2^{−A_N} Π K_r ≥ x_0^{(3)} exp(N log3 − m log3 − A_N log2)`.
* **The critical-drift squeeze.** A minimal counterexample has `x_j ≥ x_0` and `x_j → ∞`, so
  `A_N log2 ≤ N log3 + o(N)`. Substituting kills the gain exactly: the product is `≥ exp(−o(N))`
  while `H(Y) ≥ 3^N`, i.e. **`Π |L| ≥ H(Y)^{−o(1)}`** — the Subspace Theorem needs `H^{−ε}` for
  *fixed* `ε`. Letting `m` grow restores the dimension problem; moving the `K_r` into moving
  hyperplanes fails too, since some block has span `≥ N/m` so `h(K_r) ≳ (N/m)log3`, comparable to the
  point height rather than `o(h(Y))` as moving-target versions require.
* **Even the escaping case sits exactly at the exponent.** Under uniform drift `A_j log2 ≤ j log3 − δj`
  the real series converges to `η`, and the positive omitted tail gives
  `|η − P_N/Q_N|·|P_N|_2·|Q_N|_3 ≥ 1/(3Q_N²)` — precisely `H^{−2}`, where the projective Subspace
  Theorem needs `H^{−2−ε}`. **Plus a second independent gap: nothing shows `η` is algebraic**, which
  is needed even to form the linear form `X − ηY`.
* **A genuine unconditional partial theorem (§8).** If the valuation sequence has periodic
  approximations agreeing to depth `L_r` with description length `d_r` and `L_r/d_r → ∞`, then
  `|x_0 − z_r|_2 ≤ 2^{−L_r}` against the Liouville-type lower bound `≥ 1/((|x_0|+1)H(z_r))` forces
  `z_r = x_0` eventually, so `a` is eventually periodic. **Counterexamples with strong "stammering"
  or low-complexity periodic approximation are rigorously excluded** — what survives is only a
  high-complexity critical word whose new information grows linearly.
* **Exact conditional completion (Theorem 2).** Critical rationality-rigidity (`Φ(a) ∈ Q` plus
  `limsup A_N/N ≤ log₂3` ⇒ eventually periodic — a restricted-drift form of Lagarias' Periodicity
  Conjecture) **plus** weak Collatz ⇒ full Collatz. The proof is clean: eventual periodicity forces
  `(2^B − 3^p)x = C > 0`, so `B/p > log₂3`, contradicting the critical bound. *(I verified the cycle
  equation directly: among tested words only `(2)` and `(2,2,2)` yield a positive odd solution, and
  it is `x = 1` — the trivial cycle, correctly recovered.)*
* Failure mode: (a)+(c) — a genuine quantified obstruction, with the residue (critical rigidity) a
  known open conjecture rather than a new lever.

**What makes this round distinctive.** Most rounds fail because an invariant is blunt or the object
is wrong. This one fails by an exactly measured margin, three times over: `H^{−o(1)}` instead of
`H^{−ε}`, `H^{−2}` instead of `H^{−2−ε}`, and moving-target heights `Θ(h(Y))` instead of `o(h(Y))`.
Together with round 52's gcd reformulation, the campaign now has two independent Diophantine routes
whose surviving statement is a *critical-boundary* rigidity theorem — and both agree the tool would
have to be a new growing-dimension theorem exploiting the staircase `(0,0),(A_1,1),(A_2,2),…`, not
any existing Subspace or Vojta statement. Both also leave nontrivial cycles untouched.

## Round 54 — approach 49, Baker theory for repeated approximate returns

`round-54-output.md`, 18091 chars, 51m 53s. **Not a proof — but it proves two unconditional theorems
and then refutes the approach's own key implication with an explicit realizable construction.** The
strongest feature: the collective bound needs no second Baker invocation at all, just an integer
determinant.

* **Theorem 1 (unconditional, one return).** Every contractive upper return of length `r` with block
  floor `M` satisfies `0 < A log2 − r log3 ≤ r/(3M)`; feeding Rhin's effective bound
  `|u_1 log2 + u_2 log3| ≥ H^{−13.3}` gives **`M ≤ 3^{12.3} r^{14.3}`**, i.e. `r ≫ M^{1/14.3}`. A
  large orbit value cannot take part in a very short paradoxical return. Honest caveat included: even
  an optimal irrationality exponent only moves this to `r ≍ √M` and still excludes nothing by itself.
* **Theorem 2 (the real gain — pure determinant, no Baker).** For two contractive near-returns the
  `log3` terms cancel exactly: `r_2Λ_1 − r_1Λ_2 = (A_1r_2 − A_2r_1) log2`. If the coefficient vectors
  are non-proportional the integer determinant is `≥ 1`, forcing
  **`log2 ≤ (r_1r_2/3)(1/M_1 + 1/M_2)`**, so `r_1r_2 ≫ M` at comparable height. **Two upper returns
  of length `o(√M)` cannot have different ratios `A_i/r_i`.** *(Identity verified over 2,000 random
  parameter quadruples; the exact return identity `Λ = E − log(Y/X)` verified with zero failures over
  1,500 orbits to depth 12.)* This is strictly stronger than applying a one-form Baker bound twice.
* **Corollary 3 — an infinite short-return chain is impossible.** If consecutive returns were
  collectively short, all vectors become proportional to a fixed `(p,q)`, so `Λ_i = m_i(p log2 −
  q log3)` with `Λ_i/r_i = δ/q` a *fixed positive constant* — contradicting `Λ_i/r_i → 0`. Hence no
  divergent orbit has an infinite chain of upper returns with `r_i r_{i+1} = o(min(M_i, M_{i+1}))`.
  **This is exactly the "collectively impossible" part the approach proposed, and it is proved.**
* **Legendre explains the `√M` threshold**: below it, `|A/r − log₂3| < 1/(2r²)`, so `A/r` must be a
  continued-fraction convergent from above — returns shorter than `√M` are forced into a sparse set.
  The round also notes distinct best approximants naturally have determinant 1 with errors at scale
  `1/(r_1r_2)`, so infinitely many related small forms remain arithmetically possible — Theorem 2 is
  near-optimal.
* **The approach's central implication is FALSE in the symbolic relaxation — with an explicit,
  realizable witness.** Take `u = (1,1,2)` and `v = (1,2,1)`: both have length 3, total exponent 4,
  coefficient `27/16 > 1`, and **all prefix coefficients ≥ 1** (`3/2, 9/4, 27/16` and `3/2, 9/8,
  27/16`). So *every* concatenation is a barrier word, with exact affine maps `16U³(x) = 27x + 19`
  and `27x + 23`. Any factor has `Λ = N log(16/27) + β` with `β` in a fixed finite set, so `Λ > 0`
  bounds `N` — **the positive forms form a finite set with a positive minimum, so no contractive
  upper returns at high floor.** Hence there are arbitrarily long genuine positive trajectory
  segments, with arbitrarily large starts, satisfying every barrier condition and containing no such
  return. *(I verified all of it: the prefix coefficients, `C_u = 19`, `C_v = 23`, the fixed point
  `x = −19/11`, and actual realizations — `n = 7` for `u`, `27` for `v`, `167` and `155` for mixed
  6-blocks, `743` for `u³` — each staying above its start with growth exactly `(27/16)^N`.)*
* **Why the existing "infinitely many paradoxical returns" result doesn't close it.** Rozier–Terracol
  build their sequences from `2^k n`, first halving `k` times — so the block minimum is at most `n`,
  **not** `2^k n`. The high-floor hypothesis fails, `M` stays bounded, and their `~1/r` forms are
  entirely compatible with `r^{−13.3}`. A precise diagnosis of how infinitely many individually
  allowed approximations evade Baker theory.
* **Where the method genuinely works**: fixed repeated cores `v^N` and `v^N u` with fixed `u` —
  diagonalize the affine matrix, cyclotomic factors amplify the determinant, Baker bounds `N`.
  The unresolved case is an aperiodic sequence with a *moving* exit and unbounded carry complexity,
  where the affine numerators change dimension with block length so there is no fixed algebraic
  number for a standard estimate.
* **Cycles are structurally invisible here**: repeating a cycle gives `(A_N, r_N) = N(A,r)`, so every
  determinant in Theorem 2 vanishes and `Λ_N = NΛ` grows rather than shrinks. Yet another route that
  cannot touch the cycle half (m ≤ 91 remains the literature bound).
* Failure mode: (a) — genuine obstruction, with the gap named exactly: a **carry-sensitive
  ordinary-integer synchronization theorem** ("a barrier ray whose nested 2-adic realization is one
  fixed positive integer must become periodic or generate collectively short contractive returns").
* Conditional completion (Theorem 4): return-synchronization + no nontrivial cycle ⇒ Collatz.

**This is the fourth consecutive round whose residue is the integer-lift seam** (48, 49, 50, 51, 53,
now 54): the symbolic/analytic machinery is complete and correct, and what remains is precisely the
statement that all depths come from *one fixed ordinary integer*. Round 54 sharpens it into the most
concrete form yet, because it exhibits the counterexample that the symbolic relaxation permits — the
`u/v` rays are legal barrier trajectories with no short returns, and only the demand that a single
positive integer realize every depth can rule them out.

## Round 55 — approach 50, Geometry-of-numbers exclusion cones

`round-55-output.md`, 15414 chars, 42m 22s. **Not a proof — the approach's central geometric
assertion is outright FALSE, and the round proves it with an explicit lattice-point family that
survives every strengthening.** Approach 50 of 100: the campaign's halfway marker.

* **The lemma "the critical cone is lattice-free beyond a finite radius" is false at every scale.**
  Theorem 2: if `A_k < αk` for all `k ≤ j` (i.e. `2^{A_k} < 3^k`), then `U^k(n) − n =
  ((3^k − 2^{A_k})n + C_k)/2^{A_k} > 0` for **every** positive realization — and the realizations form
  an infinite affine ray `y + t·d` with `d_k = 3^k 2^{A_j+1−A_k}`, whose direction sits in the
  interior of the growth cone since `d_k − d_0 = 2^{A_j+1−A_k}(3^k − 2^{A_k}) > 0`. **The opposite of
  lattice-freeness: every such word gives an infinite ray of exact integral trajectories inside the
  cone.**
* **Proposition 1, verified.** Every positive exponent word is realized by exactly one odd class:
  `r(w) ≡ 3^{−j}(2^{A_j} − C_j) mod 2^{A_j+1}`, realizations `n = r(w) + t·2^{A_j+1}`. The proof that
  the *terminal* congruence forces every earlier quotient odd is clean (reduce mod `2^{A_k+1}`; only
  the `i = k` term survives). *(I tested all 27 length-3 words over {1,2,3} plus 60 random length-6
  words, each with `t = 0,1,3,7`: the `r(w)` formula, the realization set, and the ray formula
  `U^k(n) = y_k + t·3^k 2^{A_j+1−A_k}` all held — 87 words, zero failures.)*
* **Closed-form witness**: `r(1^j) = 2^{j+1} − 1` with `U^k = 3^k 2^{j+1−k} − 1`, so the growth is
  `2^{j+1}((3/2)^k − 1) > 0` *(verified to j = 15)*. The `2^L − 1` family strikes for the **seventh**
  time (rounds 15, 23, 29, 47, 48, 51, now 55) — and again the compatible residues converge 2-adically
  to `−1`.
* **The killer strengthening: it still fails in a width-one critical strip.** Take
  `A_k = ⌊αk⌋`, so `a_k ∈ {1,2}` and `0 < αk − A_k < 1` — lattice points hugging the critical line.
  The canonical seed still grows at every prefix, and `(j/2)3^{j−1} < C_j ≤ j·3^{j−1}`. *(Verified
  for j = 2…39: digits in {1,2}, strip bound, carry bounds, and canonical-seed growth — zero
  failures.)* So arbitrary-depth exact positive-integer prefixes satisfy `|A_j − αj| < 1`,
  `C_j ≍ j3^{j−1}`, and `U^k(r_j) > r_j` **simultaneously**.
* **Why extra carry coordinates cannot repair it — two independent reasons.** (i) The prefix
  congruences are **nested, not independent**: `C_ℓ = 3^{ℓ−k}C_k + 2^{A_k}D_{k,ℓ}`, so all `j`
  valuation conditions have total index `2^{A_j}`, *not* `2^{A_1+…+A_j}` — the determinant
  multiplication a geometry-of-numbers exclusion needs simply doesn't happen. (ii) A projection
  argument: for any integer-linear `L`, either `L(d) ≠ 0` and the projected cone still contains an
  unbounded arithmetic progression, or `L(d) = 0` and the projection collapses infinitely many exact
  seeds. Plus the elegant one-liner: `1 + MZ` has covolume `M → ∞` yet always contains `1` — **a
  large determinant says nothing about where an affine translate sits.**
* **The corrected criterion (Theorem 3), exactly equivalent to Collatz.** With
  `μ_j = min{odd n > 1 : U^k(n) ≥ n for k ≤ j}` (nonempty, `2^{j+1} − 1` qualifies), **Collatz ⟺
  `μ_j → ∞`**. Both directions proved cleanly. The dichotomy behind it is the sharp one: `r_j` is
  nondecreasing with `r_{j+1} = r_j + t_j 2^{A_j+1}`, and **`(r_j)` bounded ⟺ eventually constant ⟺
  realized by a positive ordinary integer** — so the positive-integer locus is characterized by
  *eventual vanishing of all lift digits `t_j`*, an infinite-support condition no finite congruence
  system can see.
* **A genuine cone bound survives**: survivors satisfy `A_j ≤ j log₂(3 + 1/n) ≤ 1.73697j`, so each
  finite survivor section has finitely many words; and López–Stoll's parity-density rigidity forces
  `A_j/j → log₂3` along subsequences for a divergent orbit. Critical confinement is right — it just
  isn't sufficient.
* **The entropy gap — the campaign's recurring constant, a third time.** Words with total exponent
  `A = ⌊αj⌋` number `C(A−1, j−1) = 2^{(σ+o(1))j}` with
  `σ = α·H₂(1/α) = 1.5056438879`, against `2^A` residue classes at rate `α = 1.5849625007`, giving
  **`α − σ = 0.0793186128` bits per odd step** *(both reproduced exactly here)*. **I verified this is
  the same constant yet again**: it equals round 50's `log3 − g(β) = 0.0549794728` nats converted to
  bits, which in turn equals `β ×` rounds 48/49's `0.0346881852` nats/shortcut-step — one constant,
  now seen in three unit systems across five rounds. The round is honest that **sparsity ≠ exclusion**:
  an exponentially sparse set of classes can still always contain the class of 27, and lattice
  counting gives a main term plus `O(1)` discrepancy — once the main term drops below 1, the `O(1)`
  can hide exactly the one exceptional seed.
* Failure mode: (a)+(b) — a decisive constructive refutation of the method's own lemma, with the
  corrected criterion being a restatement of the conjecture.

**Halfway assessment (approaches 1–50 done).** The last eight rounds have converged hard: rounds 48,
49, 50, 51, 53, 54 and now 55 all terminate at the same seam, and 55 gives it its cleanest algebraic
form — `r_{j+1} = r_j + t_j 2^{A_j+1}`, with everything hinging on whether the lift digits `t_j`
eventually vanish. Five separate rounds have now independently produced the *same numerical constant*
for the entropy/pressure margin. The campaign's collective finding is sharp and stable: the symbolic,
metric, Diophantine and geometric machineries are all complete and correct at every finite depth, and
each one dies at the passage from "every depth is realizable" to "one fixed positive integer realizes
every depth."

## Round 56 — approach 51, Automorphic dynamics of the affine branch semigroup

`round-56-output.md`, 18926 chars, 47m 57s. **Not a proof — but the obstruction is a single exact
matrix identity, and it is devastating: automorphic reduction deletes precisely the two unipotent
factors that carry the seed and the endpoint.**

* **The collapse identity (the whole round in one line).** With `B_a = [[3,1],[0,2^a]]` and
  `u_n = [[1,n],[0,1]]`, the exact affine identity `2^A U^j(n) = 3^j n + C_w` is *equivalent* to
  **`B_w u_n = u_{n_j} · diag(3^j, 2^A)`** — both sides equal `[[3^j, 3^j n + C_w],[0, 2^A]]`.
  Automorphy under integer translations kills `u_n` and `u_{n_j}`, leaving only the diagonal drift.
  **The quotient sees only `(j, A)` — not `n`, not `n_j`, not `C_w`, not positivity, not the exact
  divisibility.** *(Verified: the matrix form `B_w = [[3^j, C_w],[0,2^A]]` and the collapse identity
  held on all 27 length-3 words over {1,2,3} plus 50 random length-5 words — 77 words, zero failures.)*
* **Three implementations, three distinct deaths.** (i) On the genuine adelic quotient
  `PGL₂(Q)\PGL₂(A)`, every `B_w` and every `u_n` is *rational*, so the entire orbit **is the
  basepoint** — not slow mixing, exact constancy. Same on the `S`-arithmetic quotient for
  `S = {∞,2,3}`, since `det B_a = 3·2^a` is an `S`-unit. (ii) On the real modular quotient,
  `[B_w·(n+i)] = [i·3^j/2^A]` — every Maass/modular observable at the true endpoint depends only on
  `q_w = 3^j/2^A`, because its value at integer real part `n_j` equals its value at 0. (iii) Rational
  conjugacy erases it too: `u_ξ^{-1} B_w u_ξ = diag(3^j, 2^A)` with `ξ_w = C_w/(2^A − 3^j)`, so
  trace, eigenvalues and conjugacy class see only `(j,A)` — **the carry survives only in the
  integrality of the conjugator**, and `w` gives a positive cycle precisely when `ξ_w ∈ Z_{>0}`.
* **The branch group is a solvable Borel — not Zariski-dense.** It is exactly
  `Z[1/6] ⋊ ⟨2,3⟩`, derived from `g_a g_{a+1}^{-1} = d_2` and `d_2 h d_2^{-1} h^{-1} = t_1`. So
  modern random-walk equidistribution theorems don't even have their hypothesis, and every algebraic
  character factors through the diagonal torus (the unipotent radical has none) — which is why all
  character-based cusp heights depend on `(j,A)` alone. The product formula
  `log|q_w|_∞ + log|q_w|_2 + log|q_w|_3 = 0` again gives conservation, not descent (cf. round 51).
* **Sub-square-root Hecke thinness — a sharp new quantitative obstruction.** `gcd` of the entries of
  `B_w` is 1 (`C_w` is odd and `≢ 0 mod 3`), so the Smith form is `diag(1, N)` with `N = 3^j 2^A`,
  putting **every word with the same `(j,A)` in one primitive Hecke double coset of degree
  `ψ(N) = 2N`**. But there are only `M(j,A) = C(A−1, j−1)` such words, and under nonnegative drift
  `2^A ≤ 3^j` this gives `M ≤ 2^{A−1} < 2^A ≤ √N`. **At the critical slope
  `M(j,A) = N^{0.4749777636+o(1)}` against `√N = N^{0.5}`** *(both reproduced exactly here; the base
  `2.8395137305` is the same one round 50 derived).* So even *perfect* equidistribution of the full
  Hecke sphere says nothing pointwise. **And the deficit is the campaign's constant again:
  `0.5 − 0.4749777636 = 0.0250222364` is exactly half of `0.0500444728`** — the fourth unit system
  in which this one number has appeared.
* **Uniform nonescape is explicitly false.** `B_1^j = [[3^j, 3^j−2^j],[0,2^j]]` has multiplier
  `(3/2)^j → ∞` and fixed point `−1` (with `U(−1) = −1`, `a(−1) = 1`): an exact integral, indefinitely
  escaping rational ray. And `n_L = 2^{L+1} − 1` shadows it — `U^i(n_L) = 3^i 2^{L+1−i} − 1`, all
  valuations 1, strictly above `n_L` throughout *(verified to L = 17)*. More sharply, `n = M·2^{L+1} − 1`
  keeps `U^i(n) ≡ −1 (mod M)` through the whole segment, so **no fixed-conductor automorphic form can
  distinguish the positive shadow from the exceptional ray for a uniformly bounded time.** Eighth
  appearance of the `2^L − 1` family.
* **A genuine cusp-Lyapunov inequality, honestly assessed.** With `D_j = C_j + 2^{A_j} − 3^j` one gets
  `D_{j+1} = 3D_j + 2^{A_j}(2^{a_j} − 2)`, hence `D_j ≥ 0` with **equality exactly when all `a_i = 1`**
  *(verified over all 77 test words, including the equality case)* — i.e. `C_w + 2^A ≥ 3^j`. Real
  monotonicity. But the increments are `≈ (2^{a_k} − 2)/(3n_k)`, summable along exponential growth,
  and the shadows `n_L` have `D_j = 0` throughout — so no divergent cumulative loss.
* **The exact repair specified**: an inverse congruence tower `Y = lim← Γ(2^r)\PGL₂(R)` with 3-adic
  carry coordinates and an archimedean height — because a word of total exponent `A_j` needs level
  `≥ 2^{A_j+1}`, so **the conductor must grow exponentially with depth; no fixed automorphic
  representation can follow an orbit**. And mixing controls an `L²` average `Σ p_w R_{B_w}`, whereas
  Collatz needs the worst surviving path — a joint-spectral-radius / sup operator. The sufficient
  new statement is a **marked-cusp contraction theorem** (proper weight `W ≥ 1`, block length `m`,
  `ρ < 1`, `W(xB_{a_{m−1}}⋯B_{a_0}) ≤ ρW(x)` on survivor blocks), with a clean conditional proof via
  a least counterexample.
* Failure mode: (a)+(d) — an exact structural obstruction, plus the diagnosis that automorphic
  invariants are blunt in a very specific way: they are *functions of `(j,A)` only*.

**A notable sharpening of the campaign's central finding.** Earlier rounds said the machinery loses
"the integer lift." Round 56 says exactly *which* algebraic operation loses it and *where*: the
quotient by `Γ` absorbs the unipotent translations `u_n`, `u_{n_j}`, and those two factors **are** the
seed and endpoint. Combined with round 55's `r_{j+1} = r_j + t_j 2^{A_j+1}` and round 51's `p ≥ 5`
leakage, the campaign now has three independent, mutually consistent descriptions of the same
missing ingredient — and this one explains why *every* homogeneous-dynamics method must fail, not
just the ones tried.

## Round 57 — approach 52, Property-tau for Collatz residue graphs

`round-57-output.md`, 17653 chars, 38m 33s. **Not a proof — the required expansion theorem is FALSE
three separate ways, but the round proves an exact spectral theorem far stronger than the one asked
for, and then shows even that is powerless.** The most striking result of the round is a closed-form
characteristic polynomial that I verified symbolically.

* **Exact skew-product structure (Prop 1).** Under CRT coordinates
  `Φ(x) = (ε_0,…,ε_{a−1}; r)` the graph on `Z/2^a3^b` is
  `(ε_0,…,ε_{a−1}; r) → (ε_1,…,ε_{a−1},δ; F_{ε_0}(r))` with `F_0(r) = r/2`,
  `F_1(r) = (3r+1)/2 mod 3^b` — **a de Bruijn shift in the 2-adic coordinate, skewed by two affine
  maps in the 3-adic one.**
* **Theorem 2 — directed expansion fails exactly.** `S = {r ≡ 1 mod 3}` has
  `N⁺(S) = {r ≡ 2 mod 3}`, so `|N⁺(S)| = |S|` — no `η > 0` exists at all. *(Verified: both branches
  map `r ≡ 1` into `r ≡ 2` for every residue, `b ≤ 6`, zero failures.)* Reason: mod 3,
  `F_0(r) ≡ 2r ≡ 2` and `F_1(r) ≡ 1/2 ≡ 2`.
* **Theorem 3 — the Cheeger constants vanish**: `h ≪ a^{−1/2}` uniformly in `b`, by the Hamming-weight
  cut (an edge changes `w` by `δ − ε_0 ∈ {−1,0,1}`, so the boundary sits in two central binomial
  layers). The de Bruijn part even has explicit slow modes: `X_j(ε) = (−1)^{ε_j}` spans a path of
  length `a` with gap `≍ a^{−2}`. **Any family retaining unbounded 2-adic parity memory fails
  property-τ.**
* **Proposition 4 — the group-theoretic route is dead on arrival.** `⟨T_0,T_1⟩ ⊂ Aff(Q) = Q ⋊ Q^×` is
  metabelian, hence **amenable**, so a Følner set pushes forward to give arbitrarily small quotient
  boundary: no separating congruence family can have property-τ, for any fixed generating set. This
  also kills replacing branches by any fixed finite set of accelerated blocks — they stay in the same
  solvable group.
* **Theorem 5 — a genuinely beautiful exact result, and I verified it symbolically.** For
  `(L_{b,t}f)(x) = f(x/2) + t·f((3x+1)/2)` on `(Z/3^b)^×`:
  **`det(zI − L_{b,t}) = (z − (1+t))·(z^{N_b} − 1)/(z − 1)`** with `N_b = 2·3^{b−1}`. So after
  normalizing, the constant eigenvalue is 1 and **every other algebraic eigenvalue has modulus
  exactly `1/(1+t)`** — for `t = 1` the whole nonconstant spectrum sits on the circle of radius `1/2`.
  *(Checked exactly with symbolic determinants for `b = 1,2,3` and `t = 1,2` — all six match. The
  supporting lemma `ord_{3^j}(2) = 2·3^{j−1}` verified to `j = 7`.)* The proof is elegant: the
  filtration `V_0 ⊂ … ⊂ V_b` has `O(V_j) ⊆ V_{j−1}`, so `L` induces just `E` on each quotient, and
  `E` is a single `N_j`-cycle.
* **…and it still cannot work.** `L` is non-normal, so algebraic spectrum ≠ `L²` gap; and decisively,
  `P^k f(x)` **averages over all `2^k` parity continuations while a fixed integer follows exactly
  one**. The round makes this concrete with a sharp observation: the two outgoing edges from
  `x mod M` are the integers `x` and `x + M` — *not* two options available to the orbit of `x`.
  **Iterating graph edges varies the higher binary digits of the seed; the positive representative is
  one distinguished boundary ray in that tree of lifts, and property-τ says nothing about one ray.**
* **An explicit exceptional spine survives the gap.** The negative shortcut cycle
  `−5 → −7 → −10 → −5` has parity word `(110)^∞` with prefix coefficients `3/2, 9/4, 9/8`, each block
  multiplying by `9/8 > 1`, so `3^{s_k}/2^k ≥ 1` for **every** `k` *(orbit and coefficients verified)*.
  An infinite critical-growth path coexisting with exact spectral radius `1/2` off constants —
  **average mixing and a forever-exceptional path are fully compatible**, and what separates this
  path from a hypothetical positive divergent one is *archimedean order*, not modular expansion.
* **Theorem 6 — an exact criterion**: with `B_k = {1 ≤ n < 2^k : T^j(n) ≥ n ∀ j ≤ k}` and
  `m_k = min(B_k \ {1})`, **Collatz ⟺ `m_k → ∞`**. And the precise logical gap is named:
  `|B_k|/2^k → 0` is *not* enough — one fixed integer can sit in every `B_k` at vanishing density.
  The repaired target is an **order-weighted** estimate `Σ_{n ∈ B_k} n^{−s} ≤ Cρ^k`, which by
  Theorem 6 would finish immediately.
* **Theorem 7 — and the campaign's constant returns for the fifth time.** Inverse words of length `r`
  with total exponent `≤ L` number `Σ_{A=r}^{L} C(A−1,r−1) = C(L,r)` *(hockey-stick verified)*, each
  giving at most one endpoint class mod `3^r`, so at the critical `L = ⌊λr⌋` the fraction is
  `exp(−κr + O(log r))` with **`κ = log3 − λH(1/λ) = 0.0549794728`** and `e^{−κ} = 0.9465045768`.
  **Both are exactly round 50's constants** — `log3 − g(β)` and `2.8395137305/3` — reached here from
  inverse-word counting rather than forward drift. And the moral is inverted and sharp:
  **equidistribution says descending competitors are *rare*, not that every endpoint has one.**
* Failure mode: (a)+(d) — three independent structural refutations, plus the exact diagnosis that
  uniform counting measure is the wrong measure.

**The campaign's constant now has five independent derivations** (entropy deficit per shortcut step,
Hausdorff codimension, seed-only pressure margin, geometry-of-numbers residue gap, and now inverse-
word residue sparsity), and the last ten rounds have produced ten different proofs that the surviving
statement is order-sensitive rather than measure- or spectrum-sensitive. Round 57's phrasing is the
most quotable: *the two outgoing edges are `x` and `x + M`, not two choices the orbit has.*

## Round 58 — approach 53, A thin-group affine sieve

`round-58-output.md`, 15183 chars, 42m 41s. **Not a proof — the approach's premise is false, and the
round backs that with an explicit theorem constructing sieve-immune decoys.** The strongest single
object it produces: an exact positive rational Collatz cycle that survives *every prime below half a
million*.

* **The premise fails at the first step.** The branch group is `Γ = ⟨S,T⟩ = Z[1/6] ⋊ ⟨2,3⟩` (derived
  from `U_a = S^aT`, `U_{a+1}U_a^{−1} = S`, and the commutator `STS^{−1}T^{−1}(x) = x − 1/2`), whose
  Zariski closure is `G_a ⋊ G_m` — **solvable, and `[G,G] = G_a ≠ G`, so `G°` is not perfect.** By
  Salehi Golsefidy–Varjú that is *exactly* the criterion for congruence expansion, so **the standard
  affine sieve simply does not apply**. Notably the branch semigroup *is* free (diagonal entries fix
  `j`, `A`; the first differing `A_i` gives a unique minimal 2-adic valuation) — so the orbit is
  combinatorially sparse, and sparseness turns out to be irrelevant.
* **The exact cycle criterion.** `x_w = C_w/D_w` with `D_w = 2^A − 3^j`; rotations satisfy
  `2^{a_i}C_{i+1} = 3C_i + D_w`, and since `gcd(D_w, 6) = 1` every rotation has the same gcd, so
  **`w` gives a positive integer cycle ⟺ `D_w > 0` and `D_w | C_w`** — i.e. `M_w` becomes scalar in
  `PGL₂(Z/D_wZ)`. Worked example verified exactly here: `w = (1,1,3)` has `A = 5`, `C = 19`, `D = 5`
  and the genuine rational cycle **`19/5 → 31/5 → 49/5 → 19/5`**.
* **The main theorem — arbitrarily rough positive rational pseudo-cycles.** For any height `H` and
  *any* finite prime set `S`, there are arbitrarily long primitive words giving an exact positive
  rational cycle with every point `> H`, reduced denominator `q_w > 1`, **no prime of `S` dividing
  `q_w`**, and `A/j = log₂3 + O(1/j)`. The mechanism is elegant: take `M = lcm{p−1}`, use density of
  `{θn}` to pick `j = Mn`, `A = 1 + M⌊θn⌋`, so by Fermat `D = 2^A − 3^j ≡ 2 − 1 ≡ 1 (mod p)` for all
  `p ∈ S`. *(I verified the Fermat core in 19,773 cases — zero failures — and confirmed the
  construction produces valid near-critical pairs, drift gap shrinking `1.8e−3 → 4.8e−5 → 1.4e−7`
  as `S` grows.)* The non-divisibility `q_w > 1` is proved cleanly: `C_w + D = 2^j(2^L − 1)` with `D`
  odd, so `D | C_w` would force `D | 2^L − 1`, contradicted by `D/2^L ≥ 2^j(1 − 2^{−η₁}) > 1`.
* **The concrete survivor, verified end to end.** `j = 13`, `A = 21`, `w = (1^12, 9)`:
  `D = 2^21 − 3^13 = 502829` (**prime**), `C = 3^13 − 2^13 = 1586131`, `gcd = 1`, giving the exact
  13-step positive rational cycle `x = 1586131/502829 ≈ 3.1544143238` with **every point above 3**,
  slope `21/13 ≈ 1.61538` inside the nontrivial-cycle window, and `p`-integral for **every prime
  below 502829**. *(Orbit closure, primality, gcd, slope and minimum all confirmed.)* An affine sieve
  using every prime under half a million would leave this untouched — and the theorem pushes the
  least obstructing prime arbitrarily high.
* **The divergence half fails identically.** The exact prefix cylinder is the single odd class
  `n ≡ 3^{−j}(2^A − C_w) mod 2^{A+1}` — the same formula round 55 proved — so every finite word is
  realized by infinitely many positive integers. For the all-ones word this is `n ≡ −1 mod 2^{j+1}`,
  least representative `2^{j+1} − 1`, growth `≈ (3/2)^j`, nested classes converging 2-adically to
  `−1`. **Ninth appearance of that family.**
* **One genuinely new positive result — a two-place rigidity identity.** If `x_w = p/q` is the reduced
  fixed point and `r_m` realizes the repeated prefix `w^m`, then **`q·r_m ≡ p (mod 2^{mA})`**, so for
  `q > 1` either `qr_m = p` or `|qr_m − p| ≥ 2^{mA}` — hence `r_m → ∞`. **A non-integral rational
  pseudo-cycle cannot be shadowed indefinitely by one fixed positive integer; its cylinder
  representatives escape exponentially.** This is the sharpest statement in the round, and it names
  the repair: track `q_w` (profinite) *and* the archimedean size of the least positive cylinder
  representative — a congruence sieve sees only the first.
* **The two missing theorems, stated exactly**: *integral fixed-point rigidity* (`q_w = 1 ⇒ w = (2)`
  up to rotation/repetition — precisely the nontrivial-cycle exclusion) and *cylinder-height escape*
  (`r_j → ∞` for every infinite critical word). The round is explicit that a moving-modulus sieve
  would have to prove `p^{v_p(D_w)} ∤ C_w` pointwise for some prime possibly comparable to `D_w` —
  "almost exactly the integer-cycle problem itself."
* Failure mode: (a)+(d) — the method's hypothesis is provably absent, and the round exhibits the
  explicit family of surviving local patterns that makes any *finite* local sieve hopeless.

**This round adds a genuinely new failure mode to the campaign's ledger.** Previous rounds died at
the integer-lift seam because compactness produced 2-adic ghosts. Round 58 dies differently and more
concretely: **the decoys are honest positive rationals**, arbitrarily large, arbitrarily near critical
drift, and locally integral at every prescribed prime — so the obstruction is not merely that a sieve
is blunt, but that its entire target class is populated by objects indistinguishable from a
counterexample at any finite level. And its rigidity identity `q r_m ≡ p (mod 2^{mA})` is the first
result in the campaign that *quantitatively* separates rational decoys from integer orbits.

## Round 59 — approach 54, Bourgain-Gamburd flattening for branch products

`round-59-output.md`, 17757 chars, 39m 31s. **Not a proof — but the first round to publish an exact
numerical table, and I reproduced all sixteen entries to eight decimal places.** The verdict is a
sharp inversion of the method: the Bourgain–Gamburd alternative is "flatten unless trapped in a
proper subgroup," and here **all the mass is permanently trapped from the outset**.

* **The mechanism is algebraically unavailable, not merely hard to apply.** With
  `B_a = [[2^a, −1],[0,3]]`, Proposition 1 gives `B_w = [[2^A, −C_w],[0,3^j]]` *(verified over 121
  words)*, so mod `p` every branch product lies in `Aff(F_p) = F_p ⋊ F_p^×` — the solvable Borel.
  Bourgain–Gamburd needs a semisimple Zariski closure. **Proposition 2 classifies the "structured
  subgroup" exactly as `F_p ⋊ H_{p,E}` — and the structured case is the entire branch system**, so
  the dichotomy has no useful exceptional branch.
* **Genuine orbits are diagonal coboundaries — the sharpest statement in the round.**
  `L_{n_i} D_{a_i} L_{−n_{i+1}} = B_{a_i}` telescopes to
  **`B_{a_0}⋯B_{a_{j−1}} = L_{n_0} · diag(2^{A_j}, 3^j) · L_{−n_j}`**. A trajectory doesn't
  *occasionally* enter a structured configuration — it is *always* of that form. And the round closes
  the obvious escape: a state-dependent lift `P_s^{−1}B_aP_t` also telescopes to `P_{s_0}^{−1}B_wP_{s_j}`,
  so extra automaton states can't help (non-composable generators would expand words that aren't
  Collatz paths). This is round 56's collapse identity rediscovered from the inverse-branch side.
* **Fixed-fibre rigidity, quantified.** All words with the same `(j,A)` share the multiplier
  `2^A 3^{−j}`, so they sit in a single translation coset: `‖μ‖₂/‖u_G‖₂ ≥ √(|H|/m)`, and `m = 1` on a
  fibre — **even perfect carry-uniformity leaves an `L²` gap of `√|H|`**.
* **No prime-uniform spectral gap, with the slow mode written down.** For the geometric branch measure,
  `|ν̂(χ)| = 1/√(1 + 8sin²(π/r))` with `r = ord_p(2)` *(identity verified for r = 2…39)*, which
  `→ 1 − 4π²/r² ` as `r → ∞`; and `ord_p(2)` is unbounded since otherwise every prime would divide a
  fixed `Π(2^r − 1)`. Clean and complete.
* **Structured ≠ periodic: the semigroup is free.** `a_0 = v_2(C_w − 3^{j−1})` peels off the first
  exponent, so `w ↦ (j, A, C_w)` is **injective** *(recovery algorithm and injectivity both verified)*.
  Solvability of the ambient group does **not** collapse words to finitely many patterns.
* **The exact table — reproduced entry for entry.** For `(j,A) = (20,32)` with
  `N = C(31,19) = 141,120,525` compositions, the distribution of `C_w mod p`:
  `p = 101` (min 0.99853645, max 1.00170485, `√p‖μ‖₂` 1.00000018); `251` (0.99859281 / 1.00153643 /
  1.00000017); `509` (0.99701519 / 1.00330192 / 1.00000069); `1009` (0.99326643 / 1.00647948 /
  1.00000180). **I recomputed the whole DP independently: all sixteen numbers match to 8 decimals.**
  So the carry really is near-perfectly equidistributed — **but the logical direction is wrong for
  extinction: in every row every residue occurs, many times.** Uniformity says a prescribed congruence
  has `≈ N/p` solutions; it never says zero.
* **Proposition 3 — divisibility *is* the cycle.** From `2^{a_0}C_{w'} = 3C_w + D` *(verified)* and
  `D` odd, `D | C_w` propagates to all rotations, and `n_i = C_{rot^i(w)}/D` is a positive odd integer
  with `2^{a_i}n_{i+1} = 3n_i + 1` — an actual cycle. So "classify the structured case and kill it via
  the cycle equations" *becomes* `2^A − 3^j | C_w ⇒ w = (2,…,2)`, the whole nontrivial-cycle problem.
  *(Verified: `C_{(2^j)} = 4^j − 3^j = D` exactly, and among 121 sampled words the **only** one with
  `D | C_w` giving a positive odd `n` is `(2,2,2,2) → n = 1`.)*
* **Eventual periodicity also yields only a cycle**: `2^{Am}(Dx_m − C) = 3^{rm}(Dx_0 − C)` forces
  `2^{Am} | Dx_0 − C` for all `m`, hence `Dx_0 = C`.
* **Where the obstruction actually lives — and the constants return a sixth time.** The restrictive
  modulus is `3^j`, where `B_a mod 3` is **singular** (products lose information rather than expand),
  and the critical fibre has only `≈ 2.8395137^j` words against `3^j` residues, ratio
  `0.9465045^j` — the campaign's recurring pair, here derived from `g(λ) = 1.043632816` vs
  `log3 = 1.098612289` *(both reproduced)*. **A critical fibre is too small to cover the classes it
  must hit.**
* **The missing theorem, stated precisely and with a real proof sketch**: an *ordered 3-adic
  collision-or-periodicity* statement — every infinite positive critical word either has a prefix
  admitting `v` with `A(v) = A(w_j)` and `C_v − C_{w_j} ∈ {3^j, …, (n_0−1)3^j}` (yielding the smaller
  counterexample `n_0 − q`, contradicting minimality) or is eventually periodic (yielding a cycle).
  Flattening mod auxiliary primes proves neither the *ordered sign* condition nor anything at the
  singular modulus.
* Failure mode: (a)+(d) — the hypothesis is provably absent, and the surviving flattening is strong
  but points the wrong way.

**Two things make this round stand out.** First, it is the only round so far whose central evidence is
a reproducible computation, and it survived exact independent recomputation — a good sign for the
campaign's overall reliability. Second, it states the distributional-to-pointwise gap in its most
quotable form: **near-perfect equidistribution guarantees that every residue is hit `≈ N/p` times,
which is precisely the opposite of what a proof needs.**

## Round 60 — approach 55, Sum-product growth modulo 3^r

`round-60-output.md`, 14052 chars, 45m 26s. **Not a proof — and uniquely among recent rounds, this
one engages our own campaign framework directly (citing the terminal-locality theorem, the minimal-
word audit, and the r=78 reverse enumeration) and then finds a genuine ERROR in the naive picture at
depth 19, which I confirmed to the digit.**

* **The approach's principle is false in a specific, structural way.** "A critical survivor set must
  expand mod `3^r`" fails because **the branch maps are 3-adically *contracting***: normalizing
  `z_k = B_k Q_k^{-1}`, eq (13) gives `z_{k+1} = 2^{−a_k}(3z_k + 2^{a_k} − 2)`, so two states sharing
  a branch satisfy **`v_3(z_{k+1} − z'_{k+1}) = v_3(z_k − z'_k) + 1`** *(verified over 4,000 random
  pairs mod 3^12 — exact, no failures)*. A survivor ray becomes progressively **more** concentrated.
* **Lemma 1 — the conditions are a triangular tower, not independent events.** From
  `B_{uv} = 3^s C_u + 2^{A(u)} B_v`, reduction mod `3^s` gives **every suffix of a terminal word is
  itself terminal at its own depth**. This kills the probabilistic heuristic that `r` rescue
  conditions are `r` roughly-independent `1/3` events.
* **The clean reduction — the best formulation of the approach.** Terminality becomes exactly
  **`C_u + 2^{A(u)} m_v ≡ 0 (mod 3^n)`**, i.e. a genuine affine `a + cb` incidence over `Z/3^nZ`. This
  is a real contribution: it puts the problem in exactly the shape sum-product theorems address.
* **…and then shows the shape is the wrong one, three separate ways.** (i) One bad word gives **one
  incidence**, not a dense graph. (ii) The coefficient set `{2^{A(u)}}` has only `O(r)` elements, so
  at modulus `3^n` with `n ≍ r` its normalized dimension is `O(log r / r) → 0` — Shen's ABC theorem
  needs positive multiscale dimension; dropping to modulus `3^{O(log r)}` controls only `O(log r)`
  ternary digits, and the campaign already has strict-record words of length `≈ 3^q` that mimic
  terminality through exactly `q` digits. (iii) Even the *whole* barrier language has only
  `2.8395^r = 3^{0.94996r}` elements, far below the `≫ 3^{r−1/3}` that finite-valuation-ring
  estimates require.
* **Eq (12) — the rescue set is a graph with outdegree ≤ 1.** Terminality of `ua` means
  `2^a ≡ −1 − 3C_u Q_u^{−1} (mod 3^r)`, and since `ord_{3^r}(2) = 2·3^{r−1}` *(verified)* while the
  barrier permits only `a = O(r)`, **each admissible prefix has at most one admissible terminal
  extension** (at `r = 19` the period is 774,840,978 against `a = O(19)`). That is close to the exact
  opposite of a sum-product hypothesis.
* **The depth-19 collision — I verified every digit.** Naive injectivity of `Φ_r(w) = B_w mod 3^r`
  holds on barrier words through depth 18 **and breaks at 19**:
  `w₁ = (1^15,2,3,1,3)` and `w₂ = (1,2,1,2,1,2,1,2,1,2,2,2,1,1,2,2,1,1,3)` both satisfy
  `A_k ≤ ⌊k log₂3⌋` for all `k ≤ 19`, with `B(w₁) = 1,183,691,739`, `B(w₂) = 5,832,737,607`,
  `B(w₂) − B(w₁) = 4·3^19` exactly, and **both ≡ 21,430,272 (mod 3^19 = 1,162,261,467)**. *(All of it
  reproduced: lengths, both barriers, all three integers, the difference, and the shared residue.)*
  Neither residue is zero, so no terminal counterexample — but **"unique 3-adic coding of barrier
  words" is now definitively false**, and the campaign should stop assuming it.
* **Two structured survivor rays prove any theorem must be component-sensitive.** `1^r` is exactly
  terminal (`C = 3^r − 2^r`, `B = 3^r`) *(verified to r = 24)*; and for the accelerated `3x−1` map,
  `5 →(a=1) 7 →(a=2) 5` gives the periodic ray `(1,2)^∞`, which **satisfies every prefix barrier**
  (`A_{2n} = 3n < 2n log₂3`, `A_{2n+1} = 3n+1 < (2n+1)log₂3`) *(both verified, orbit and barriers,
  n ≤ 400)*. **So "barrier + persistence ⇒ expansion" is outright false** — a nontrivial survivor can
  sit in a two-state component forever.
* **The campaign's constant, seventh appearance.** `λ = α^α/β^β = 2.8395137305` with
  **`log₃λ = 0.9499555272`** *(both reproduced)* — the same number that has now appeared as an entropy
  deficit, a Hausdorff dimension, a pressure margin, a residue-gap, an inverse-word sparsity, a Hecke
  exponent, and now the barrier-language growth rate.
* **The missing piece is named precisely**: a *component-sensitive amplification lemma* turning one
  nested Collatz ray into a large nonconcentrated incidence configuration, with a clean conditional
  proof via Shen's ABC theorem. The round then lists five explicit reasons no *unconditional* version
  can hold — and is candid that even the resulting all-depth exclusion (17) would still leave the
  cycle problem and the synchronization problem untouched.
* Failure mode: (a)+(d) — a real structural obstruction (contraction, not expansion), plus the
  diagnosis that sum-product tools are calibrated for large sets while the target is a single ray.

**Why this round is unusually useful despite proving nothing.** It is the first to *correct* the
campaign's own working assumptions rather than only diagnosing an external method: the depth-19
collision falsifies naive residue injectivity, Lemma 1 falsifies the independence heuristic behind
the `(0.9465)^r` counting intuition, and the `(1,2)^∞` ray falsifies "barrier ⇒ expansion." All three
corrections are verified here. That makes it a net gain for the campaign's internal model even
though approach 55 itself is closed.

## Round 61 — approach 56, A cross-prime uncertainty principle

`round-61-output.md`, 15966 chars, 31m 49s. **Not a proof — a clean no-go with the sharpest one-line
reason yet: the two localizations the approach wanted to play against each other are not competitors
at all, they are exact affine images of one another. Every claim in the round is checkable and I
verified all fourteen.**

* **Theorem 1 — the exact cylinder isomorphism (the whole round in one statement).** A word `w`
  has exactly one seed class **`α_w ≡ 3^{−r}(2^A − C) (mod 2^{A+1})`** and exactly one odd endpoint
  class **`β_w ≡ C·2^{−A} (mod 3^r)`**, and the branch is a *bijection*
  **`U^r(n₀ + 2^{A+1}t) = X₀ + 2·3^r t`**. *(All four verified: the affine identity
  `2^{A_k}x_k = 3^k n + C_k`; that the class mod `2^{A+1}` is exactly the realizing set — including
  the converse, every member of the class realizes `w`; the endpoint congruence; and the shift law,
  over hundreds of random seeds and words.)* The composition law `C_r = 3^{r−k}C_k + 2^{A_k}C_v`
  with `C_v` odd, which drives the proof, also checks out.
* **Hence the proposed inequality is false with norm exactly 1.** `U^r_w(C₂(w)) = C₃(w)`, so
  `‖1_{C₃} U^r_w 1_{C₂}‖ = 1` and no `≤ 1 − η` can hold. The round then generalizes it out of Collatz:
  on `Z/(2^a 3^b)Z ≅ Z/2^a × Z/3^b` a dyadic and a ternary residue projector are `|α⟩⟨α|⊗I` and
  `I⊗|β⟩⟨β|` — **commuting coordinate projectors**, with `‖PQ‖ = 1` by CRT *(verified)*. Donoho–Stark
  needs two bases related by a *Fourier* matrix. This is an impossibility theorem for the whole
  cross-prime-uncertainty method class, not a Collatz-specific miss.
* **An explicit equality family.** `w = 1^r` with `n = 2^{r+1}t − 1` gives `A = r`, `C = 3^r − 2^r`,
  and `x_r = 2·3^r t − 1`, so `3^r | x_r + 1` *(verified to r = 13)*. At every scale there are
  integers sitting simultaneously in the exact dyadic word cylinder **and** the deepest ternary
  terminal cylinder. The all-ones word is the equality case of the principle the approach hoped was
  strict.
* **The `(1,2)^∞` countermodel returns — same object as round 60, different use.** In the `3x−1`
  dual, `5 →(1) 7 →(2) 5` *(verified)*, so `δ₅` is localized in nested dyadic **and** nested ternary
  cylinders at arbitrarily large scales while satisfying the strict barrier `2^{A_k} < 3^k` at every
  prefix *(verified to k = 800)*. Invariance, positivity, arbitrary depth and the barrier together
  still produce no uncertainty loss — any valid theorem must see the *particular component rooted at
  1*.
* **Theorem 2 — the exact conductor-drop, and why it is fatal here.** Endpoint precision `3^s` on
  `x_j` costs the seed only **`(s − j)₊` ternary digits** *(the full case split verified for all
  `s ≤ r+2`)*. The terminal condition is `s = j`, so it costs **zero excess conductor** — and indeed
  `3^j | x_j + 1 ⟺ 3^j | C_j + 2^{A_j}`, a condition on the *word*, with no congruence on `n`
  *(verified)*. Quotably: **the `j` ternary endpoint digits are exactly the `j` digits already
  supplied by the `3^j` in the branch slope; they are not independent information.**
* **Exact adelic conservation.** `|λ|_∞|λ|_2|λ|_3 = 1` for `λ = 3^r/2^A` *(trivially verified)* — the
  branch deletes exactly `A` dyadic digits from a seed difference and inserts exactly `r` ternary
  ones. No volume is lost anywhere for a proof to feed on.
* **What survives, stated sharply.** real height × dyadic conductor × excess ternary conductor gives
  `|n₁ − n₂| ≥ 2^{A+1}3^E`, hence one class mod `M = 2^{A_R+1}3^E` and `#{n ∈ I} ≤ 1 + ⌊H/M⌋`. This
  yields **separation, uniqueness, rigidity — never emptiness**, "and a counterexample only needs
  that one surviving point." It also recovers round 15's dense-recurrence⇒periodicity implication
  (with the explicit condition `ℓ/(3·2^r) + y/2^r + y/3^r < 1`), and names the direction gap: it
  supplies rigidity *after* localization, it does not force localization.
* **The seam, appearance #20 — and unusually explicit about it.** The needed statement is `Δ ≥ h`
  where `Δ = (C + 2^A − 3^r)/3^r`; the activation formula
  **`Δ = Σ_j 2^{B_{j−1}}(2^{c_j} − 1)(2/3)^{s_j}`** and the bound `0 < Δ < h` on strict-barrier words
  *(both verified exactly in rationals — the identity on every generated word, the bound on 526
  strict-barrier terminal words)*. The round's own diagnosis: the real quantity **naturally** lies in
  `(0,h)`; the entire question is whether it lands in `Z`. So no real-variable, positivity, or
  support-uncertainty statement can ever supply it — only a **marked-center anti-concentration**
  theorem that retains exact centers, the ordered 2-adic colors of the activation piles, the changing
  ternary modulus, and the distinguished component containing 1.
* **Candid about the remaining gap.** Even `Δ ≥ h` at all depths would only kill the target-1
  terminal/barrier language; a full proof still needs the synchronization theorem (every orbit that
  never falls below its start has a prefix that is both barrier and target-1 terminal), after which
  the already-proved prefix-diamond finishes by minimality. And the conductor theorem provably cannot
  supply synchronization, because the terminal event costs zero excess conductor.
* Failure mode: (a)+(c)+(d) — a genuine structural obstruction (the two localizations coincide), an
  explicit equality family the counterexample class already satisfies, and an invariant (support size)
  that is blind to the centers where the whole difficulty lives.

**The useful residue.** Theorem 1 is the cleanest statement the campaign has of the branch as an
exact bijection of cylinders, and Theorem 2 quantifies for the first time *how much* ternary
information a terminal condition actually costs: none. Together they explain, in one sentence, why a
long list of earlier rounds (6, 15, 54, 55) kept failing at the same place — the 3-adic side of a
Collatz branch carries no information the 2-adic side has not already fixed.

## Round 62 — approach 57, 2-adic Haar-wavelet diagonalization

`round-62-output.md`, 16232 chars, 32m 54s. **Not a proof — and the rare case where the approach's
own goal is *achieved* in two paragraphs and turns out to be worthless. The spectral gap the approach
was hunting exists, is exact, and is `2^{−α}`. It simply says nothing about any individual integer.**
I verified every operator identity in the round on an explicit finite model.

* **The whole wavelet calculus, exact.** With the parity map `Q(x) = Σ ε_j(x)2^j`, `Q∘T = S∘Q` where
  `S` deletes the low bit, so `T = Q^{-1}SQ` *(verified: `Q` bijective on `Z/2^14`, a genuine 2-adic
  isometry, and the conjugacy exact)*. **Theorem 1**: for `Ψ_w = h_w∘Q`,
  **`U Ψ_w = (Ψ_{0w} + Ψ_{1w})/√2`** and **`L Ψ_{aw} = Ψ_w/√2`**, with `L Ψ_∅ = 0`, `L1 = 1`
  *(all verified twice — for `S` with ordinary Haar wavelets and for the actual Collatz `T` with the
  conjugated ones; also that each `Ψ_w` really is ± a Haar wavelet on a ball)*. On `L²₀` this is a
  unilateral shift and its backward shift, so `ρ(U) = ρ(L) = 1` — **no `L²` gap at all**.
* **…but an exact gap on Haar–Sobolev observables.** `‖Lf‖_{H^α} ≤ 2^{−α}‖f‖_{H^α}` on mean-zero `f`,
  hence `ρ(L|_{H^α_0}) = 2^{−α} < 1`, and the constant is sharp *(both verified — the contraction over
  300 random coefficient vectors at four values of α, the sharpness via `‖U^rΨ_w‖ = 2^{αr}‖Ψ_w‖`)*.
  The round's own line: **"the hoped-for spectral gap is not difficult to find. It is already exact"** —
  because `L` averages the two 2-adic inverse branches, it describes mixing of densities, not one
  integer following its single forward orbit.
* **Why no subspace of integers exists — both sides killed.** On the function side `N₀ ⊂ Z₂` is
  countable, Haar-null and *dense*, so `{f ∈ L² : supp f ⊆ N₀} = {0}`, and restriction to `N₀` is
  injective on `C(Z₂)` — any continuous identity proved for all positive integers automatically holds
  on all of `Z₂`. **That density is the entire obstruction, stated in one line.**
* **Theorem 2 — the Haar-completion dichotomy, and the campaign's cleanest "ghost" theorem.** For any
  radial weight, **`‖δ_x‖²_ω = 1 + Σ_m ω_m 2^m`, independent of `x`** *(verified exactly across random
  weights and points)*. So either *no* point mass is in the space, or *every* `δ_x` is — with equal
  norm and `x ↦ δ_x` 2-adically continuous. Taking `n_J ≡ x (mod 2^J)` then gives
  **`δ_x ∈ closure span{δ_n : n ≥ 1}` for every `x ∈ Z₂`**. The completion of the positive integers
  swallows every 2-adic ghost.
* **And the ghosts carry the whole unit circle.** Every periodic parity word is the parity sequence of
  a unique 2-adic integer — so `T` has 2-adic cycles of *every* period *(verified: for all 254 words of
  length ≤ 7 the solution `x(2^p − 3^k) = C` reproduces its own parity word and is genuinely periodic;
  the all-ones word gives the fixed point `−1`)*. Each cycle contributes eigenvalue `ζ^ℓ` to `T_*`, so
  **no finite-dimensional projection can leave spectral radius < 1**, and quotienting the periodic
  modes out is impossible because they are dense among all point masses.
* **A concrete quasimode from ordinary integers.** `n_m = 2^m − 1` satisfies
  **`T^j(n_m) = 3^j 2^{m−j} − 1`** *(verified to m = 39)*, so it shadows the ghost fixed point `−1`
  for `m` steps while growing by `(3^m−1)/(2^m−1) ~ (3/2)^m` *(verified)*. Any finite Haar truncation
  cannot tell `n_m` from `−1`.
* **Theorem 3 — no continuous Haar correction, killed by a two-family squeeze.** For `W(n) = n^β e^{u(n)}`
  with `u ∈ C(Z₂)`, the family `2^m − 1` forces `(3/2)^{βr}` and the family `3·2^k` (with
  `T^r(3·2^k) = 3·2^{k−r}` *(verified for all `k ≤ 24`)*) forces `2^{−βr}`; one exceeds 1 unless `β = 0`,
  where both equal 1. So `sup_n W(T^r n)/W(n) ≥ 1` always. **A working weight must be violently
  discontinuous exactly where Haar spectral theory needs regularity.**
* **§7 is the sharpest self-assessment in the campaign so far.** `‖F^k‖_{ℓ¹} = 1` for every `k` — even
  a *true* Collatz gives no unweighted gap, since `3·2^k` survives `k` steps without hitting `{1,2}`
  *(verified)*. And `‖F^k‖_{ℓ¹_W} = sup W(T^k n)/W(n)` exactly, so a contracting weight bounded below
  ⟹ Collatz, while `W = ρ^{−τ(n)}` gives `‖F‖ ≤ ρ` assuming Collatz *(verified on all n < 20,000)*.
  **Existence of the contracting atomic weight is essentially equivalent to the conjecture itself** —
  the method's target is a restatement.
* **Where the missing information sits.** The second inverse branch `y ↦ (2y−1)/3` is legal for every
  `y ∈ Z₂` but integral only when `y ≡ 2 (mod 3)` *(verified)* — and every class mod 3 meets every
  2-adic cylinder by CRT *(verified for all `c mod 2^k`, `k ≤ 8`)*, so no continuous 2-adic multiplier
  can express it. Positivity and the order `m < n` are likewise invisible 2-adically.
* Failure mode: (b)+(c)+(d) — §7 proves the sought object is equivalent to Collatz itself, the ghost
  cycles are objects the method's own hypotheses already admit, and a pure 2-adic invariant is
  structurally blind to the 3-adic integrality selector and the archimedean height.

**The transferable lesson.** This is the third distinct formalism (after rounds 13 and 61) to fail on
*density of the integers* rather than on any missing estimate: `N₀` is dense in `Z₂`, so every
topology fine enough to support spectral theory identifies `n` with 2-adic ghosts that have no reason
to obey Collatz. Round 61 showed the 3-adic side carries no information the 2-adic side has not
already fixed; round 62 shows the 2-adic side alone cannot even see which integers are integers. The
two together bound the whole single-prime program from both directions.

## Round 63 — approach 58, Ruelle–Perron–Frobenius theory for exact survivors

`round-63-output.md`, 21377 chars, **86m 14s — the longest and most substantial round of the
campaign.** Not a proof, and unusually honest about exactly where it stops: *"asserting the final
spectral radius < 1 would amount to assuming the missing arithmetic theorem."* But it is the first
round to produce a **new positive theorem of its own** rather than only a diagnosis. I verified all
sixteen checkable claims.

* **An exact survivor operator with no probabilistic step.** The state `(k,s,c,R,H)` is autonomous:
  `T^j(n) = (3^{s_j}n + c_j)/2^j`, the word fixes one class `R_w ≡ −c_k 3^{−s_k} (mod 2^k)`, and the
  archimedean constraint is exactly `H(w) = min_{2^j>3^{s_j}} ⌊c_j/(2^j−3^{s_j})⌋`, so
  `E(w) = {R_w + q2^k : 2 ≤ · ≤ H(w)}` *(verified: the affine identity; the class realizes the whole
  word; `T^j(n) ≥ n ⟺ c_j ≥ (2^j−3^{s_j})n`; and — the real test — **the `E(w)` over `|w| = k`
  partition `{n ≤ 20000 : τ(n) > k}` exactly, for every `k ≤ 11`**, with the closed-form multiplicity
  `M_N(w)` matching term for term)*.
* **Theorem 1 is an exact equivalence, not an analogy.** `Σ_{|w|=k} μ_p(w) = Z_k(p)` and
  `(P_p^k 1)(∅) = Z_k(p)/(ζ(p)−1)`, with `Z_k(p) → 0` for one (equivalently every) `p > 1` **iff**
  Collatz *(mass identity verified numerically at p = 2 for all `k ≤ 11`)*. One object covers both
  divergence and nontrivial cycles.
* **The correction to the approach: the global spectral radius is exactly 1, unconditionally.** After
  the prefix `1^m` the coefficient height is `mβ` with `β = log₂(3/2)`, so if `mβ ≥ L` then *every*
  length-`L` continuation — including `0^L` — keeps `h ≥ 0`, nothing is killed, and
  `(P_p^L 1)(1^m) = 1` *(verified for m ≤ 14 over all admissible tails)*. Hence `‖P_p^L‖_∞ = 1` and
  `r(P_p) = 1` whether or not Collatz is true. **The theorem cannot be "the full operator has radius
  < 1"; it must be an induced cusp statement.**
* **The campaign constant, EIGHTH appearance — and here it is a provable spectral gap.** The killed
  drift operator gives `ρ_bulk = ½(β^{−β/(1+β)} + β^{1/(1+β)}) = 0.9659065532334377` at
  `θ_* = log(1/β)/(1+β)`, equal to `2^{−(1−H₂(log₃2))}` with the deficit
  **`0.05004447281166946`** *(all three reproduced to the last digit; the minimum located
  numerically; and `2^{−k}#B_k ≤ ρ_bulk^k` verified for every `k ≤ 80` by exact DP)*. So
  `0.9659065532` joins the constant's companion list as `e^{−κ}` in the shortcut normalization,
  alongside `0.9465045768` for the Syracuse one. **But it is a Haar-average statement:** barrier
  cylinders have exponentially small 2-adic measure, which never says the shrinking set misses a
  fixed integer.
* **§7 — the first coefficient crossing solved completely.** At a first crossing the last bit is
  forced to 0 and `2^{k−1} ≤ 3^s < 2^k`; with `d = 2^k − 3^s`, `c = Σ_ℓ 3^{s−ℓ}2^{i_ℓ}` and the sharp
  bound **`c/3^s ≤ s/2`**, survival is exactly `c = dn + 2^k y`, giving the closed-form rescue count
  `m(w) = #{y : 0 ≤ y < s/2, c > 2^k y, d | c − 2^k y}` — `y = 0` being an exact return (a cycle),
  `y > 0` an acyclic rescue. *(All verified over the 141 first-crossing words with `k ≤ 14`,
  including the rescue set against brute-force seed search.)*
* **Proposition 2 — the genuinely new result: `F_k = O(k^{15.3})`.** Combining `c/3^s ≤ s/2` with the
  irrationality bound `Λ = k log2 − s log3 ≥ k^{−13.3}` gives `n + y ≤ ½k^{14.3}`, and the numerator
  map `(i_1,…,i_s) ↦ Σ 3^{s−ℓ}2^{i_ℓ}` is injective (`i_1 = v₂(c)`, then peel), so each `(n,y)`
  determines at most one crossing word. **First-crossing carry rescue therefore has zero entropy —
  `2^{−k}F_k = O(k^{15.3}2^{−k})`, not merely entropy below log 2.** *(Verified: the injectivity and
  the digit-recovery rule; and `Λ ≥ k^{−13.3}` holds for all `k < 1200` with ~10³× slack.)* The round
  is candid that this still does not close: a tree with one node per depth can have an infinite path.
* **The cusp dichotomy, made quantitative.** `R_{k+1} = R_k + t_k2^k` *(verified)*: if `t_k = 1`
  infinitely often the ray escapes archimedeanly (`μ_p → 0` via `μ_p(w) ≤ R^{−p} + R^{1−p}/((p−1)2^k)`
  *(verified, tightest ratio 0.954)*); if `t_k = 0` eventually, `μ_p(w_k) → n^{−p} > 0` and the ratio
  `μ_p(w_{k+1})/μ_p(w_k) → 1` — **an exact approximate eigenmode at eigenvalue 1, which is precisely
  what defeats a routine RPF argument.** The all-ones ray with `R_k = 2^k − 1 → −1` *(verified)* shows
  literal extinction of all infinite survivor paths is false.
* **Periodic rays are genuinely eliminated.** A strict-barrier periodic tail has `2^A < 3^r`, so
  `ξ = −C/(3^r − 2^A) < 0`, and inverse branches preserve negativity *(verified across all 1,608
  strict-barrier blocks with `r ≤ 14`)*. The unresolved sector is exactly the **aperiodic** stationary
  cusp.
* **The conditional completion theorem is logically complete**, and its missing hypothesis (61) —
  every positive stationary cusp ray either exits or loses a fixed fraction of carry mass at some
  renewal — is stated by the round itself to be equivalent to the min-plus smaller-positive-ancestor
  criterion, i.e. to Collatz. A gap would also give `τ(n) ≤ 1 + (p log n + log C)/(−log ρ)`, a uniform
  **logarithmic** stopping bound — strictly stronger than bare Collatz, which is why it cannot be
  cheap.
* Failure mode: (a)+(b)+(c) — a proved structural obstruction (`r(P_p) = 1` unconditionally), a final
  hypothesis that is a restatement of the conjecture, and a countermodel (the all-ones 2-adic ray)
  that the method's own hypotheses admit.

**Why this round matters most so far.** Three of its six proved items are new to the campaign: the
exact-partition survivor operator (a genuinely assumption-free RPF setup), the closed-form
first-crossing rescue count, and the zero-entropy bound `F_k = O(k^{15.3})`. It also states the
campaign's recurring seam in its sharpest quantitative form yet — **a stationary counterexample is an
exact eigenvalue-1 approximate eigenmode of the survivor operator**, so no spectral-gap argument can
reach it without first proving the arithmetic separation. Together with rounds 61 and 62 this closes
the single-operator program from a third direction: 61 (no 3-adic information), 62 (no 2-adic
resolution of integers), 63 (no global gap, and the induced gap is Collatz itself).

## Round 64 — approach 59, A coercive Koopman eigenfunction

`round-64-output.md`, 16713 chars, 67m 42s. Not a proof, and the round opens by saying so: the
certificate would work, but it is **exactly equivalent** to Collatz, and the unrestricted solution is
just the unknown stopping time. What makes the round valuable is that it kills four concrete
candidate classes with clean theorems rather than hand-waving. All eighteen checkable claims verified.

* **Theorem 1 — the equivalence, stated crisply.** Collatz ⟺ there is a finite coercive
  `F : N → R` with `F(Tn) ≤ F(n) − δ` off `A = {1,2}` ⟺ the same with a bounded selector
  `r(n) ≤ B`. The forward direction is a telescoping contradiction; the converse takes `F = τ_A`,
  coercive because `T(x) ≥ x/2` forces `τ_A(n) ≥ log₂(n/2)` *(all verified: the recursion
  `τ_A(Tn) = τ_A(n) − 1`, the `x/2` bound, and the coercivity estimate for every `n < 60000`)*.
  Exponentiating gives a genuine weighted Koopman subeigenfunction with `‖K_R‖_w ≤ e^{−αδ} < 1` — so
  the spectral-gap statement is *available*, it just carries no information.
* **And it would give more than Collatz.** Any such `F` forces `τ_A(n) ≤ (F(n) − min_A F)/δ` — a
  pointwise stopping-time bound. As in round 63, the certificate is strictly stronger than the
  conjecture, which is why it cannot be cheap.
* **The canonical construction exists and is exactly circular.** With `F = log n + E`, the Bellman
  envelope `E_δ(n) = sup_k (log(T^k n/n) + δk)` satisfies `E_δ = max{0, log(Tn/n) + δ + E_δ(Tn)}` and
  `F_δ(Tn) ≤ F_δ(n) − δ` — but `E_δ(n) < ∞ ⟺ τ_A(n) < ∞`. *(Verified numerically at δ = 0.05: the
  Bellman identity and the descent inequality hold for every `n < 3000`.)* The arithmetic task is
  precisely to replace the infinite future supremum by a finite carry rule.
* **Proposition 2 — no monotone height, even with bounded returns.** On `n_m = 2^m − 1`,
  `T^j(n_m) − n_m = 2^m((3/2)^j − 1) > 0` *(verified exactly in rationals)*, so an eventually
  nondecreasing `F` can never drop within `B` steps. This kills `log n`, `n^α`, `P(log n)`, and — via
  the `m/B`-many-drops argument — monotone height *plus any bounded correction*.
* **Proposition 3 — no 2-adically continuous potential.** For fixed `j`, `T^j(2^m−1) → −1` in `Z₂`
  *(verified for `j ≤ 5` at every precision up to 2^19)*, so continuity at `−1` forces the descent gap
  to 0. The round then adds the cleaner kill: a continuous real function on the compact `Z₂` is
  bounded, hence never coercive. **This excludes every fixed-modulus or bounded-suffix potential.**
* **§6 is the sharpest part — the natural repair fails, and fails recursively.** `ν₂(Tn+1) = ν₂(n+1)−1`
  for odd `n` *(verified over 20,000 odd n)* makes `F_a = log n + aν₂(n+1)` with `a > log(3/2)` beat
  all-odd runs — but the immediate even predecessors `N_m = 2^{m+1} − 2` have `ν₂(N_m+1) = 0` and
  `T^{1+r}N_m = 3^r2^{m−r} − 1` with `ν₂ = m − r` *(verified)*, so the gap is `a(m−r) + O_B(1) → +∞`
  *(computed: +4.36, +9.42, +14.47, +19.53 at m = 10,20,30,40)*. **Penalizing the −1 shadow just moves
  the obstruction one level upstream, forever** — completing the hierarchy *is* the Bellman envelope.
* **§7 isolates what a potential must see.** For the accelerated `U`, `2^{A_j}U^j(n) = 3^j n + C_j`
  gives `U^j(n) − n = (C_j − (2^{A_j}−3^j)n)/2^{A_j}`, so descent needs the **carry** inequality
  `C_j < (2^{A_j}−3^j)n`, not merely the slope condition `2^{A_j} > 3^j` *(all three verified over
  10,000 odd seeds to depth 12, including the closed form `C_j = Σ 3^{j−1−i}2^{A_i}`)*. The
  logarithmic drift `j log3 − A_j log2` is blind to `C_j` — **that single sentence is the cleanest
  statement yet of why every drift/entropy invariant in this campaign has failed.**
* **The reduction is honest and sharp: Lemma A + Lemma B.** (A) at the *first* crossing
  `2^{A_j} > 3^j`, descent `U^j(n) < n` — i.e. coefficient stopping; (B) every critical ray
  (`2^{A_j} ≤ 3^j` for all `j`) synchronizes with a smaller positive odd `m`. Together they close the
  proof by minimality, and the round shows exactly how. **I verified Lemma A holds for every odd
  `n < 400,000` — no counterexample** — and confirmed the reduction to least realizers (the
  coefficient `d = 2^{A_j} − 3^j > 0`, so the margin only improves with `n`). But this is evidence,
  not an all-depth proof, and the round says so.
* Failure mode: (a)+(b)+(d) — two genuine impossibility theorems (monotone heights, 2-adically
  continuous potentials), a certificate that is a restatement of the conjecture, and the diagnosis
  that every continuous/drift-type invariant is blind to the carry `C_j`.

**What this adds.** Round 63 showed the induced spectral gap *is* Collatz; round 64 shows the same for
the Lyapunov/Koopman formulation and then does the harder work of eliminating the four obvious
constructions by name. The `N_m = 2^{m+1} − 2` cascade is new to the campaign and is the sharpest
demonstration so far that no *bounded-memory* 2-adic correction can exist: each repair is defeated by
the preimages of the set it just penalized. Combined with §7's `C_j`-blindness, the campaign now has a
precise statement of what any surviving invariant must do — carry the exact affine numerator, not a
logarithm of it.

## Round 65 — approach 60, Dirichlet series of exceptional seeds

`round-65-output.md`, 17425 chars, **87m 51s — the campaign's longest round.** Not a proof, and
uniquely among all 60 rounds it **retracts a claim it had made earlier in its own reasoning**: the
abscissa-1 argument fails because odd exceptional multiples of 3 are *leaves* of the accelerated
inverse tree, invalidating the branching estimate. It also shows the approach's stated final claim is
outright **false**. Every one of the seventeen checkable claims verified.

* **The functional equation is exact — and does not close.** From backward invariance,
  `E = 2E ⊍ {(2m−1)/3 : m ∈ E, m ≡ 2 (3)}` *(verified: preimage structure for every m < 100,000, and
  that `m ↦ (2m−1)/3` on `m ≡ 2 (3)` is a bijection onto the odds)*, giving
  `(1−2^{−s})D_E(s) = 3^s Σ (2m−1)^{−s}` and the shifted form
  `(3/2)^s Σ_k (s)_k/(k!2^k) · D_{E,2}(s+k)` *(both verified numerically at s = 1.6, 2.0, 3.5 on the
  backward-invariant surrogate E = N)*. **But it is not a scalar equation:** `D_{E,2}` is
  residue-restricted, and if `φ` depends on `x mod 3^r` then `φ((2x−1)/3)` depends on `x mod 3^{r+1}`
  — the 3-adic hierarchy never closes. Substituting `D_E/3` would assume the equidistribution being
  proved.
* **The retraction, and why it was needed.** In the accelerated form, `m ≡ 0 (3)` admits **no** odd
  predecessors *(verified: the branch table `m≡1 → a≥2 even`, `m≡2 → a≥1 odd`, `m≡0 → none`, checked
  over 2,000 odd m and a ≤ 13)*. The corrected identity is `S_0 − S_2 > 0` — **not** a contradiction,
  because the leaf class `B_0` absorbs the excess mass from the more prolific `B_2` branches. *(The
  two harmonic constants `Σ_{a even≥2} 3·2^{−a} = 1` and `Σ_{a odd≥1} 3·2^{−a} = 2` verified
  exactly.)*
* **The approach's target claim is false, with a one-line counterexample.** `a_n ≡ 1` is nonneg,
  nonzero, Collatz-invariant, and has `D = ζ(s)` — meromorphic on all of `C`. Automatic Dirichlet
  series give nonperiodic examples with whole-plane continuation. So meromorphic continuation +
  positivity + polynomial vertical growth **cannot** suffice; what Landau actually gives is
  `E ≠ ∅ ⟹ D_E` singular *at* `σ_E`, so only **holomorphic** continuation through `σ_E` closes it.
* **Theorem 1 is a real theorem, and I verified its group-theoretic core.** Any finite-valued
  `a_n = a_{T(n)}` that is eventually periodic is constant. The proof reduces to `gcd(q,6) = 1`, where
  invariance under `M(x)=2x` and `F(x)=3x+1` gives `MFM^{−1} = 3x+2` and `(MFM^{−1})F^{−1} = x+1`
  *(both verified as permutation identities)*, forcing constancy — and I confirmed independently that
  `⟨2x, 3x+1⟩` acts **transitively** on `Z/q` for all 133 moduli `q < 400` with `gcd(q,6) = 1`.
* **Corollary 2 — a clean natural-boundary dichotomy.** Via Pólya–Carlson: every bounded
  integer-valued Collatz-invariant sequence is constant, or its generating function has `|z| = 1` as a
  natural boundary. Hence `E ≠ ∅ ⟹ A_E(z)` has the unit circle as a natural boundary — which sets up
  the second completion route through the Mellin bridge `Γ(s)D_E(s) = ∫ t^{s−1}A_E(e^{−t})dt`.
* **§8 is the round's best contribution and the campaign's seam in a new costume.** From
  `h(m)+1 = (2/3)(m+1)` one gets `h^r(3^r q − 1) = 2^r q − 1`, hence the exact equivalence
  **`3^r q − 1 ∈ E ⟺ 2^r q − 1 ∈ E`** *(verified: for every `r ≤ 11` and `q ≤ 400` the chain is a
  genuine `T`-preimage path with the stated endpoints)*. The `(2/3)^{rs}` cusp contraction and the
  all-odd branch's `(3/2)^{rs}` expansion **cancel exactly**: strict for each fixed `q`, but the ratio
  → 1 as `q → ∞` *(computed: 1.1005 → 1.0089 → 1.000009 at r = 3)*. So there is no uniform
  contraction, and `r(L_s) ≥ (3/2)^s > 1` kills any Neumann-series inversion.
* **Proposition 3 — no finite 3-adic obstruction can exist.** If `E ≠ ∅` then `E` meets *every*
  residue class mod `3^r`, for every `r`. *(Verified: 2 is a primitive root mod `3^r` for `r ≤ 8`;
  `T(b) ≡ 2 (3)` for odd `b` divisible by 3; and the explicit lift `m ≡ (3c+1)/2 (mod 3^{r+1})`
  produces `n ≡ c (mod 3^r)` for all `r ≤ 6` and every `c`.)* Any proof must therefore be
  **quantitative** about mass in deep cusp cylinders — the missing estimate (24) is a `ρ^r` strictness
  beyond the cancelling `(2/3)^{rσ}`.
* Failure mode: (a)+(c)+(d) — an exact structural cancellation at the 3-adic cusp, a target property
  (meromorphic continuation) that the counterexample class demonstrably satisfies, and positivity/
  growth invariants too blunt to distinguish holomorphic from merely meromorphic at `σ_E`.

**Where this leaves the campaign.** The round ends where 61 did — needing "a cross-prime
anti-concentration theorem" — but arrives from analytic number theory rather than harmonic analysis,
and it says so explicitly. Its lasting contributions are Theorem 1 (a genuine rigidity result proved
in full) and identity (22), which is the sharpest form yet of the binary–ternary synchronization
obstruction: **the dyadic and ternary localizations of the exceptional set are not merely related,
they are exactly conjugate, and the two exponential factors cancel to the digit.** Rounds 61, 63, 64
and 65 now all terminate at the same inequality, stated four different ways.

## Round 66 — approach 61, Natural boundaries as a disproof detector

`round-66-output.md`, 15845 chars, 40m 8s. Not a proof — but it **proves its half completely** and
then shows the other half is Collatz itself. The standout is §5: the round runs an actual numerical
experiment against its own method and reports the numbers, which I reproduced exactly.

* **Theorem 1 — a clean, complete dichotomy.** With `B` the basin of 1 and `E` its complement,
  `F(z) = Σ_{n∈B} z^n` and `S(z) = Σ_{n∈E} z^n` satisfy `F + S = z/(1−z)`, and: Collatz ⟺ `S` rational
  ⟺ `S` extends through **one** point of `|z| = 1` ⟺ `F` rational ⟺ `F = z/(1−z)`. Otherwise both have
  the unit circle as a natural boundary. This is the single-basin core of Bell–Lagarias, derived
  directly from the survivor set.
* **Lemma 2 is the engine, and it is a real theorem.** Any `{0,1}` sequence with `e_n = e_{T(n)}`,
  `e_1 = 0`, that is eventually periodic is identically zero. After reducing to `gcd(M,6) = 1`, the
  maps `A(r) = 2r` and `B(r) = (3r+1)/2` satisfy **`ABA^{−1}B^{−1}(r) = r + 2^{−1}`** *(verified as an
  exact identity on all 167 moduli `M < 500` coprime to 6)*, and I independently confirmed
  `⟨A,B⟩` acts **transitively** on `Z/M` for all of them — so `f` is constant, and `e_{2^j} = e_1 = 0`
  forces the constant to be 0. *(A structurally different commutator from round 65's, and both
  verified.)*
* **Theorem 3 — the per-orbit version, which lands directly on our own machinery.** A parity series
  `P_n(z)` is rational iff the parity sequence is eventually periodic, else `|z| = 1` is a natural
  boundary. Since the barrier paper already proves a divergent orbit's parity sequence *cannot* be
  eventually periodic, this yields **`q_k(n) ≥ 1` for all `k` ⟹ `P_n` has the unit circle as a natural
  boundary`** — a free corollary for the campaign. The round also notes the limitation honestly: this
  detects divergence but **not** cycles (a cycle's parity sequence is periodic, hence rational), while
  `S(z)` detects both.
* **Why the functional equation gives nothing.** `S(z) = S(z²) + z·R₂S(z²)` *(verified)* is exact but
  only relates values *inside* the disk — and Theorem 1 says its nonzero solution is precisely the one
  with a natural boundary. **The branch relation is compatible with dense singularity rather than
  excluding it.** Likewise the real/2-adic synchronization only rules out periodicity: `L(z) = Σ
  z^{2^j}/2^j` converges absolutely at `z = 1` (to 2) yet has a natural boundary by Fabry — convergence
  at a point and analytic continuation there are independent.
* **§5 — the round tests its own method and finds it can't work.** Exact iteration gives
  `T^70(27) = 1` *(verified, first hit exactly at step 70, tail cycle 1→2→1)*, so `P_27` is **rational**
  with denominator `1 − z²`. Yet the exact `[40/40]` Padé approximant from its first 81 coefficients
  has **39 of its 40 denominator roots in `0.8 < |z| < 1.2`** — *I rebuilt the Padé solve in exact
  rational arithmetic and got 39 of 40, matching to the digit* — with median modulus 1.000054, which
  is exactly `1/0.999946`, the round's figure under the reciprocal (pole-vs-root) convention. **A
  provably rational function produces a convincing fake pole cloud on the unit circle.**
* **Proposition 4 — the finite-data obstruction, in one line.** Any finite binary word extends both to
  a rational series (pad with zeros) and to a natural-boundary one (1s at square indices)
  *(verified)*, and both are genuine parity sequences of unique 2-adic starting values. For the
  survivor series it is worse still: until an exceptional integer is actually found, every computed
  coefficient is the Collatz-true one and any truncation is a polynomial, hence entire. **Numerics can
  never certify a natural boundary here.**
* Failure mode: (b)+(c) — the required continuation statement (7) is proved equivalent to Collatz, so
  deriving it from any reformulation of basin membership is circular; and the inverse-branch equation
  the method leans on is *satisfied* by the natural-boundary solutions it was meant to exclude.

**Why this round is worth keeping despite proving nothing new about Collatz.** It is the campaign's
cleanest example of a method that is *fully successful at its stated task* and still useless: the
natural-boundary prediction is now a theorem in both the survivor and per-orbit forms, and one of them
plugs straight into our barrier results. And §5 is the only place in 61 rounds where a round designed
a falsification test for itself, ran it, and reported a negative result with reproducible numbers —
the 39-of-40 pole cloud around a rational function is a warning worth carrying into any future
numerical-detector proposal.

## Round 67 — approach 62, A dynamical zeta function with only the trivial Euler factor

`round-67-output.md`, 21234 chars, 60m 54s. Not a proof, and the round says exactly where it stops:
the determinant evaluation *is* the cycle problem, and the Green-kernel summability *is* nonescape.
What it builds along the way is a genuine trace-class operator with an exact trace formula — the
cleanest operator statement of the cycle/escape dichotomy the campaign has seen. All seventeen
checkable claims verified.

* **A real trace-class operator, not a formal one.** With `(Cf)(n) = f(Tn)` and `M_t = diag(t^n)`,
  `L_t = M_tC` is trace class (`‖M_t‖₁ = t/(1−t)`, `‖C‖ ≤ √2` since every `m` has at most two
  preimages *(verified for all `m < 100,000`)*), and iteration gives
  **`(L_t^k f)(n) = t^{S_k(n)} f(T^k n)`** with `S_k(n) = Σ_{j<k} T^j(n)`, hence the exact trace
  formula **`tr(L_t^k) = Σ_{T^k n = n} t^{S_k(n)}`** *(both verified entry-by-entry on a 40×40 exact
  rational model for `k ≤ 8`)*. **No symbolic or 2-adic contamination — the trace counts exactly the
  positive-integer periodic points.**
* **Theorem 3.1 — the weighted Euler product.** `D_t(z) = det(I − zL_t) = Π_{O} (1 − z^{ℓ(O)}t^{H(O)})`
  with `H(O) = Σ_{n∈O} n`. The trivial orbit `{1,2}` has `ℓ = 2`, `H = 3`, factor `1 − z²t³`. *I
  reconstructed `det(I − zL_{t,N})` from its traces via Newton's identities in exact rationals at
  `t = 1/2` and got precisely `1 − z²/8`, i.e. `1 − z²t³`, with all other coefficients exactly zero
  through degree 12.* Equivalently `tr(L_t^k) = 0` for odd `k` and `2t^{3k/2}` for even `k`
  *(verified)*.
* **Theorem 4.1 makes the circularity explicit and unavoidable.** `D_t(z) = 1 − z²t³` ⟺ there is no
  nontrivial positive cycle — and the proof of the converse is the sharpest line in the round: **every
  periodic-orbit contribution to every trace is strictly positive, so no cancellation is available.**
  The determinant cannot hide a cycle; it also cannot exclude one. It repackages
  `Δ(w) = 2^K − 3^m ∤ Φ(w)` into "certain positive trace coefficients vanish."
* **§6 kills the obvious shortcut.** Extending to `Z₂` and using the Bernstein–Lagarias shift
  conjugacy gives `2^k` period-`k` points, hence `ζ = 1/(1−2z)`, **not** `1/(1−z²)` *(verified)*.
  Projecting to ordinary integers is the entire arithmetic difficulty — the same seam as rounds 62 and
  65, arriving now from periodic-orbit counting.
* **§7 is a clean impossibility result for the whole method class.** A zeta function is built from
  periodic orbits and **cannot see escape at all**: `F(n) = n+1` has no periodic points, so `ζ ≡ 1`,
  yet every orbit diverges; one may graft arbitrary infinite acyclic rays onto a system without
  changing its zeta function. So even a complete proof of `ζ_T = 1/(1−z²)` settles only half of
  Collatz.
* **Theorem 9.1 is the round's most useful export.** Collatz ⟺ there exists `0 < π ∈ ℓ¹(X)` with
  `Pπ ≤ π`, where `(Pπ)(m) = π(2m) + 1_{m≡2(3)}π((2m−1)/3)`. Both directions verified in the small:
  `π = q^{τ}` works with `q < 1/2` because `#{n : τ_A(n) = r} ≤ 2^{r+1}` *(verified over 300,000
  integers — max ratio 0.25, comfortable)*; and the cycle-exclusion step is exact — for odd `n > 1` in
  a cycle, `m = Tn` has **two distinct** predecessors `n` and `2m = 3n+1`, both in `X` *(verified for
  every odd `n < 200,000`)*, so `(Pπ)(m) > π(m)`. **One positive summable vector would kill cycles and
  escape simultaneously, making the zeta identity redundant.**
* **§10 locates the failure to the digit.** `‖G_b‖₁ = Σ_n b(n)τ_A(n)` exactly *(verified numerically:
  the iterated sum and the closed form agree as exact rationals)*. Hence **if even one `n` has
  `τ_A(n) = ∞`, every strictly positive source diverges** — proving Green summability already proves
  nonescape. The determinant is only the *denominator* of the resolvent; reachability lives in the
  numerators, and an escaping orbit changes those while contributing no periodic factor.
* Failure mode: (b)+(d) — the two targets are restatements of the two halves of Collatz, and the
  zeta/determinant invariant is provably blind to the escape half no matter how it is computed.

**What to keep.** Theorem 9.1 is a better-packaged version of round 64's Koopman certificate: a single
`ℓ¹` positive subeigenvector for the *killed inverse-transfer* operator settles both halves, and
`H = −log π` turns it into a coercive nonincreasing Lyapunov height whose sublevel sets are finite.
Round 64 showed no monotone or 2-adically continuous `H` can exist; round 67 shows what `H` would have
to be. Together they define the target precisely: **an explicitly presented — finite-state, residue,
automaton, or algebraic — `π`, since an unrestricted one is just the unknown hitting time in disguise.**

## Round 68 — approach 63, A uniform determinant involution

`round-68-output.md`, 13001 chars, 23m 40s — the shortest round in a long stretch, and it needed no
more length. Not a proof: the requested involution **cannot exist**, because the determinant expansion
is already cancellation-free. All thirteen checkable claims verified symbolically.

* **Theorem 1 — the determinant is a cycle product, exactly.** For `M_k(x) = I + xA_k`,
  **`det M_k(x) = Π_{C ∈ C_k} (1 − (−x)^{|C|})`** over the directed `T`-cycles inside `{1,…,k}`. The
  proof is a clean functional-digraph argument: a nonzero Leibniz term needs `σ(i) ∈ {i, T(i)}`, so
  every nontrivial permutation cycle *is* a genuine `T`-cycle, and nonzero terms biject with subsets of
  `C_k`. *(Verified symbolically for every `k = 2…60`; the only cycle found is `[1,2]`, giving
  `det = 1 − x²` throughout.)*
* **The multivariate version makes the point unanswerable.** With one variable per row,
  `det M_k(y) = Π_C (1 − Π_{i∈C}(−y_i))`, so **each cycle contributes its own distinct squarefree
  monomial** — there is no collision of terms to exploit before specializing *(verified for
  `k = 2…24`)*. Any apparent cancellation only appears after collapsing all `y_i → x`.
* **Theorem 2 — the no-go, by a one-line degree argument.** If a nontrivial cycle exists, the subset
  `S_* =` *all* nontrivial cycles gives the **unique** highest-degree term of the quotient `Q_k(x)`,
  with coefficient ±1 — so it has no partner of equal degree and opposite sign, and no sign-reversing
  weight-preserving involution can pair it. Hence **the involution exists nontrivially only if there
  are no nontrivial cycles**, in which case there is nothing to pair. The canonical pairing
  `S ↔ S ∪ {(1 2)}` does prove divisibility by `1 − x²` *(verified)* — but the quotient is exactly the
  product over nontrivial cycles, not 1.
* **§5 reduces the induction to the problem itself.** Two cycles of a function cannot share a vertex,
  so at most one new cycle appears at step `k`, giving
  `det M_k/det M_{k−1} = 1` unless `k` is the maximum of a cycle of length `ℓ`, in which case it is
  `1 − (−x)^ℓ` *(verified for all `k ≤ 60`)*. **Proving `det M_k = det M_{k−1}` is literally proving
  `k` is not a cycle maximum.**
* **Proposition 3 — a sharp arithmetic byproduct worth keeping.** The maximum `K > 2` of a positive
  cycle satisfies **`K ≡ 8 (mod 18)`**. Each step verified independently: odd `K > 1` has `T(K) > K`
  so the max is even; the predecessor must be odd since `2K > K`; its predecessor forces
  `a = (2K−1)/3 ≡ 2 (mod 3)`, which is **equivalent** to `K ≡ 8 (mod 9)` *(checked over 100,000
  values)*; combined with evenness this is exactly `K ≡ 8 (mod 18)` *(also checked as an equivalence,
  not just an implication)*. This explains why the exceptional determinant indices sit in that class.
* **§7 — the escape blindness, sharpened past round 67's version.** Round 67 used `F(n) = n+1`
  (`ζ ≡ 1`). Here the countermodel is upgraded: `F(1)=2, F(2)=1, F(n)=n+1` has **exactly** the trivial
  cycle, so `det(I + xA_k^F) = 1 − x²` for *every* `k` *(verified symbolically for `k = 2…39`)* —
  the full family of determinant identities the approach wants — **yet `F^m(3) → ∞`.** So the target
  identity, even proved for all `k`, is compatible with divergence.
* **§8 generalizes it to every Fredholm determinant of this type:** `tr(L_w^m)` sees only periodic
  points, so `det(I − zL_w) = Π_C (1 − z^{|C|}Π_{n∈C}w_n)` and **every infinite acyclic orbit
  contributes exactly 1**.
* **§9 is the constructive part — a determinant-compatible object that *does* see escape.** With
  `C_k` the transition matrix on `{3,…,k}` and `u_k` the exit indicator, `det(I − zC_k) = 1` and
  **`E_{n,k}(z) = z·e_nᵀ(I − zC_k)^{−1}u_k = z^r` if the orbit exits above `k` at time `r`, else `0`**
  — and it equals `z·[λ] det(I − zC_k + λu_ke_nᵀ)` by the matrix determinant lemma. *(All three
  verified symbolically at `k = 30, 60, 120` for every `n`.)* So Collatz ⟺ `det M_k = 1 − x²` for all
  `k` **and** `∀n ∃k : E_{n,k} = 0`. The round then kills the obvious follow-up: `E_{n,k}` is a
  **single positive monomial**, so there is nothing for a second involution to cancel — and
  `z^{r(k)} → 0` for `|z| < 1` even when it never vanishes, so **exact eventual vanishing is needed,
  not an analytic limit**.
* Failure mode: (a)+(b)+(d) — a proved impossibility for the requested mechanism, a target identity
  that is a restatement of cycle exclusion, and a determinant invariant provably blind to the escape
  half.

**The transferable content.** This is the campaign's cleanest "the mechanism cannot exist" result:
not "we couldn't find the involution" but "the terms it would pair are in bijection with actual
cycles, and the top-degree term is unpaired." Together with round 67 it closes the determinant program
from both ends — 67 showed the trace/zeta side is blind to escape, 68 shows the finite-matrix side is
blind for the same reason and additionally has no cancellation to mine. The two useful exports are
`K ≡ 8 (mod 18)` and the `E_{n,k}` escape functional, which is the first determinant-compatible object
in the campaign that is *not* blind to divergence.

## Round 69 — approach 64, Uniform nilpotency after removing the trivial basin

`round-69-output.md`, 16491 chars, 32m 18s. **Not a proof — and the first round in a long stretch to
outright DISPROVE its approach with an explicit construction rather than diagnose it.** It then
replaces the dead lemma with a sharp quantitative target and pins that target between two constants.
All seventeen checkable claims verified.

* **Theorem 2 kills the central lemma explicitly.** For `N_L = 2·3^{L−1} − 1`, the family
  **`x_j = 3^j2^{L−j} − 1`** satisfies `T(x_j) = x_{j+1}` with `x_{j+1} − x_j = 3^j2^{L−j−1} > 0`, so
  `x_0 < ⋯ < x_{L−1} = N_L` while `x_L = 3^L − 1 > N_L` *(all verified for `L = 2…39`)*. The whole
  chain is residual, so `A_{N_L}^{L−1} ≠ 0` and `ν(N_L) ≥ L`. **No `N`-independent nilpotency exponent
  can exist.** *(I recomputed `ν` from the actual residual graph: `ν(N_L) ≥ L` for `L = 2…12`, and the
  worked example `31 → 47 → 71 → 107 → 161 → 242` reproduces exactly, with all five vertices confirmed
  residual and `ν(161) = 10`.)*
* **And the boundary is no help.** The chain ends in a **full-strength** exit: `‖E_{N_L}A^{L−1}‖ ≥ 1`
  in any basis norm, and the partial Green operator has `‖G_{N_L,L}‖ ≥ √L` since the `x_j` are distinct
  *(verified)*. So even with every truncation individually nilpotent, the family carries arbitrarily
  long Jordan transients — eigenvalues see only zero while the direct limit behaves like a shift
  carrying mass to infinity. **Any boundary argument must follow iterated exits across scales, not
  treat the boundary as a vanishing error.**
* **Proposition 3 closes the other reading.** With the *true global* basin removed, uniform nilpotency
  is exactly equivalent to Collatz — the conjecture is smuggled into the definition of the removed
  set. So: local basin ⟹ provably false; global basin ⟹ restatement.
* **Theorem 4 — the genuine replacement.** If `ν(N) ≤ c log₂N + C` with
  **`c < 1/log₂(3/2) = 1.709511…`**, then Collatz follows. The engine is `T(x)+1 ≤ (3/2)(x+1)` with
  equality **iff** `x` is odd *(verified as an equivalence over 200,000 values)*, giving
  `M_k + 1 ≤ (3/2)^k(n+1)` and hence `k+1 ≤ c·k·log₂(3/2) + O(1)`, impossible when `c log₂(3/2) < 1`.
* **Theorem 5 — the matching lower bound, and it's a real construction.** Using `s_j = ⌈j log₃2⌉`, the
  balanced parity word has `ε_j ∈ {0,1}`, `1 ≤ q_j = 3^{s_j}/2^j < 3`, and `2^i/3^{s_{i+1}} ≤ 1/2`
  *(all verified for `m ≤ 400`)*, so `r ≤ T^j(r) < 3(r + j/2)` *(verified on actual realizers of the
  word at `m = 8, 12, 16`)*. Appending an all-odd tail gives `limsup ν(N)/log₂N ≥ 1`. **So the useful
  coefficient window is exactly `1 ≤ c < 1.709511…`** — the naive all-odd family only forces
  `1/log₂3 = 0.630929…` *(both constants reproduced)*.
* **Honest caveat I added by direct computation.** Measuring `ν(N)` exactly at accessible sizes gives
  ratios `ν(N)/log₂N` of **1.05, 3.04, 5.22, 5.80, 2.71** at `N = 100, 300, 1000, 3000, 10000` — well
  *above* the 1.7095 ceiling Theorem 4 needs. The values fluctuate and these `N` are tiny against an
  asymptotic statement with an `O(1)`, so this contradicts nothing; but the target bound is not merely
  unproved, it is nowhere near visible in the accessible range. Worth recording before anyone invests
  in chasing it.
* **§7 — the repair that survives the no-go.** Group `ℓ(n) = ⌊log₂n⌋+1` steps at a time:
  `J(2^L−1) = 3^L−1` *(verified)*, so the entire length-`L` obstruction chain collapses into **one**
  jump. The adaptive extinction conjecture (`min_{j≤B} J^j(n) < n`) would prove Collatz by strong
  induction, and has a clean operator form as uniform nilpotency **on the diagonal** — notably weaker
  than global nilpotency. The round is careful to note Eliahou–Fromentin–Simonetto's four-jump
  statement is evidence and a conjecture, not a theorem.
* **§8 states the remaining arithmetic lemma exactly**, using `T^k(n) = (3^s n + C(w))/2^k` with
  `C(w) = Σ ε_j 2^j 3^{s−s_{j+1}}` *(verified over 6,000 seeds at depth 14)*: no `x_0 > 1` admits `B`
  successive non-descending adaptive blocks. The hard point is named precisely — not average drift,
  but that the unique residue classes realizing several nearly-critical adaptive blocks cannot stay
  compatible with the changing top bits of their endpoints.
* Failure mode: (a)+(b) — an explicit disproof of the stated lemma, plus the alternative reading being
  a restatement.

**Why this is a good round.** It is the campaign's cleanest example of a refutation that *improves*
the question: the approach dies, but what replaces it is a numerical target with both a sufficient
threshold and a proved lower bound, `1 ≤ c < 1.709511…`, plus an adaptive reformulation that provably
survives the counterexample family. Compare round 68, which showed a mechanism cannot exist; here the
mechanism is shown false and then rebuilt. The `3^j2^{L−j} − 1` family should be added to the
campaign's standing countermodel list alongside `2^m − 1` (round 64) and `(1,2)^∞` (rounds 60–61).

## Round 70 — approach 65, Compute the operator commutant directly

`round-70-output.md`, 12188 chars, 21m 9s. Not a proof — but it **completes the computation it was
asked for**, and the answer is an exact classification: the commutant is `ℓ^∞` of the set of Collatz
orbit-components. The off-diagonal half is fully solved; the diagonal half *is* the conjecture. All
thirteen checkable claims verified.

* **The off-diagonal collapse is complete and genuinely proved.** From `T_1^*T_1 = P_odd`,
  `T_2^*T_2 = P_even`, `T_2T_2^* = I` and `T_1T_1^* = P_{m ≡ 4 (6)}` *(all four verified over
  n < 300,000, including that `T_1^* e_m = e_{(m−1)/3}` exactly when `m ≡ 4 (mod 6)`)*, every
  parity-cylinder projection `P_α = V_α^*V_α` lies in the algebra, so `a_{m,n} ≠ 0` forces `m` and `n`
  to share **every** parity decision.
* **Then itinerary injectivity finishes it — a clean theorem worth keeping.** If `m,n` share the first
  `k` branches then `F^k(m) − F^k(n) = (3^{o_k}/2^{e_k})(m−n)`, so `2^{e_k} | m−n`; and since an odd
  value is always followed by an even one, `e_k ≥ ⌊k/2⌋`, forcing `m = n`. *(All three verified: the
  exact difference identity and the divisibility over thousands of pairs, `F(odd)` always even, and
  the itinerary map injective on `n ≤ 8000` to depth 45.)* Hence **every commutant element is
  diagonal** — the sparse matrix equations really do eliminate all off-diagonal freedom.
* **The exact classification.** The surviving equations are just `λ_{F(n)} = λ_n`, and conversely every
  such bounded `λ` gives a commutant element, so
  **`C*(T₁,T₂)' = {M_λ : λ∘F = λ} ≅ ℓ^∞(N/∼)`** where `m ∼ n` iff their forward orbits meet. Since the
  orbit of 1 is `1 → 4 → 2 → 1` *(verified)*, scalarity ⟺ one component ⟺ Collatz.
* **The obstruction is exhibited, not merely asserted.** A hypothetical exceptional component `C`
  gives `P_C` commuting with `T_i` and `T_i^*` — a nonzero non-identity projection **satisfying every
  sparse equation automatically**. Sharper still, *pointwise*: `n ∼ 1` ⟺ all commutant operators agree
  at `n` and `1`. So even the single-seed statement is Collatz for that seed.
* **§7 — the `e₁` anchor, strengthened.** With `W = T_2²T_1`, `We_n = e_{(3n+1)/4}` exactly when
  `n ≡ 1 (mod 4)`, and `We₁ = e₁` *(verified)*. The unique `W`-predecessor of `m` is `(4m−1)/3`, which
  **exceeds** `m` for every `m > 1` *(verified over 300,000)*, so an `ℓ²` fixed vector must vanish off
  `e₁`: `Fix(W) = Ce₁`, hence `Ae₁ ∈ Ce₁` for every commutant `A`. **The scalar propagates through the
  whole component of 1 — and provably no further.**
* **§8 — a real arithmetic byproduct.** The minimum `n` of an exceptional component must be odd (else
  `n/2` is smaller), `n ≢ 1 (mod 4)` (else `(3n+1)/4 < n`), and `n ≢ 2 (mod 3)` (else
  `T_1^*T_2^* e_n = e_{(2n−1)/3}` with `(2n−1)/3 < n` and odd). *(All three descent steps verified,
  including that `(2n−1)/3` is genuinely odd and maps back to `n`.)* Surviving residues:
  **`n ≡ 3 or 7 (mod 12)`** *(the residue computation reproduced exactly)*.
* Failure mode: (b)+(c) — the surviving diagonal sector is a verbatim restatement of Collatz, and the
  counterexample class (an exceptional component) satisfies every equation the method generates.

**Where this sits.** Round 70 is the operator-algebra twin of round 68: both remove *all*
operator-theoretic ambiguity and hand back the untouched arithmetic. The difference is that 68 showed
its mechanism cannot exist, while 70's mechanism works perfectly and simply has nothing left to bite
on — "the commutant machinery removes all operator-theoretic ambiguity and leaves the original
arithmetic problem intact" is the round's own summary and it is accurate. Two things are worth
carrying forward: **itinerary injectivity** (a fully proved lemma, and the same fact that powers
round 66's Lemma 2 and round 62's parity coding), and the **`n ≡ 3 or 7 (mod 12)`** constraint on a
minimal exceptional element, which pairs with round 68's `K ≡ 8 (mod 18)` for cycle maxima.

## Round 71 — approach 66, Exclude peripheral spectrum of a weighted Collatz shift

`round-71-output.md`, 14095 chars, 54m 36s. Not a proof — and like round 69 it **refutes** its own
approach rather than merely diagnosing it. The detector's two halves both work; the gap the approach
needs is **false**, and it is killed by vectors supported on *provably terminating* orbits. All fifteen
checkable claims verified.

* **Both detectors do work.** With `w(n) = ℓ(T(n))/ℓ(n)`, `ℓ(n) = log(n+e)`: the weight telescopes,
  `Π_{j<k} w(T^j n) = ℓ(T^k n)/ℓ(n)` *(verified)*, so any cycle has weight-product 1 and contributes
  **every `p`-th root of unity** as a genuine eigenvalue; and any divergent orbit has `w(n_j) → 1`,
  giving Weyl sequences for every `|λ| = 1`. Hence the exact equivalence
  `Collatz ⟺ r(S_w|_{ℓ²(E)}) < 1` — but `E` is the unknown exceptional set, so this is a reformulation.
* **§5.2 is the round's centrepiece, and it is a beautiful explicit family.** With
  `q_L = (2^{3^L}+1)/3^{L+1}`, `u_L = 2q_L`, `n_j = 3^j2^{L−j}u_L − 1`: lifting-the-exponent gives
  `v₃(2^{3^L}+1) = L+1` so `q_L` is an **odd** integer; every `n_j` is odd; `T(n_j) = n_{j+1}`; and the
  last step lands **exactly** on `T(n_L) = 2^{3^L}`, after which the orbit halves down to 1. *(All
  verified for `L = 1…6`, and the seeds confirmed to terminate.)* The first two members reproduce the
  round's examples exactly: **`3 → 5 → 8`** and **`151 → 227 → 341 → 512`**.
* **So the gap is false, with numbers.** These give arbitrarily long all-odd runs at heights → ∞ on
  orbits that *provably reach 1*, so `‖(A−λ)v_L‖² = (2+o(1))/(L+1) → 0` for every `|λ| = 1`. *I
  recomputed the norm directly from the operator: `0.5116, 0.4030, 0.3341, 0.2859` at `L = 3…6`,
  tracking `2/(L+1) = 0.5, 0.4, 0.333, 0.286` to three digits, with `max_j|w(n_j)−1|` falling
  `2.4e−2 → 8.1e−4`.* Powers of two alone (`2^{2L} → ⋯ → 2^L`) already do it for the even branch.
  **Unit-circle approximate spectrum does not imply a counterexample orbit.**
* **§6 generalizes this into the sharpest anti-locality statement the campaign has.** *Every* finite
  parity word has a terminating realization — proved via the affine `T^k(a+2^kt) = b+3^st` plus the
  fact that 2 generates the units mod `3^s` *(verified exhaustively for all 2046 words of length
  ≤ 10)*. So **no bounded finite-memory or 2-adically local weighting can distinguish an infinite
  orbit from longer and longer terminating shadows**; ordinary approximate spectrum takes a fresh
  seed at each block length and thereby discards the one thing that matters — a fixed seed.
* **§7 — the repaired criterion, clean and exact.** `(K_s x)_n = (T(n)/n)^s x_{T(n)}` is bounded for
  `s > 1/2` (`Σ_{T(n)=m}(m/n)^{2s} ≤ 2^{−2s}+2^{2s}` *verified*), each orbit component `C` gives the
  eigenvector `g_C = n^{−s}1_C`, and `K_s x = x ⟺ y_n = y_{T(n)}` for `y_n = n^s x_n` *(both
  verified)*. Hence **Collatz ⟺ 1 is a simple eigenvalue of `K_s`** — one eigenvector per component,
  detecting cycles and divergence alike. But simplicity *is* connectivity, so it is a restatement,
  and the round explicitly warns that deriving it from positivity or Perron–Frobenius would
  "silently assume the irreducibility that must be proved."
* **§8 — a seed-anchored diagnostic that avoids `E` entirely.** `‖U_ε^k‖ = e^{−εk·m_k}` with
  `m_k = min{n : τ(n) > k}`, so `Collatz ⟺ r(U_ε) = 0 ⟺ U_ε` compact, and a least counterexample
  would be read off spectrally as `m_* = −(1/ε)log r(U_ε)`. *(Computed `m_k` for `k = 0…39`:
  `3,3,3,3,6,7,7,7,7,7,9,9,18,25,25,…` — nondecreasing and growing, as required.)*
* Failure mode: (a)+(b)+(c) — an explicit refutation of the gap, a repaired criterion that restates
  the conjecture, and a detector that fires on the *non*-counterexample class.

**What to carry forward.** Two things. First, the `3^j2^{L−j}u_L − 1` family is a new standing
countermodel and the strongest of the three the campaign now has: round 64's `2^m − 1` shadows `−1`
2-adically, round 69's `3^j2^{L−j} − 1` escapes a truncation, but **this one terminates outright** —
long, high, all-odd, and provably convergent. Second, §6's finite-prefix extension lemma is the
general theorem behind all of them, and it explains in one sentence why rounds 62, 64, 66, 69 and 71
all failed the same way: **finite parity data cannot separate a hypothetical counterexample from a
terminating orbit, so no local or finite-block invariant will ever do it.**

## Round 72 — approach 67, Fredholm determinant and trace cancellation

`round-72-output.md`, 20602 chars, 52m 52s. Not a proof. This is approach 62's determinant (round 67)
built a second time with a different regularization — and it lands in the same place, but adds two
things round 67 lacked: a **proof that no cancellation mechanism can exist**, and a rank-one boundary
device that repairs the escape-blindness. All fourteen checkable claims verified.

* **A genuinely trace-class operator.** `L_{ρ,u}e_n = ρ^n u^{ε(n)}e_{T(n)}` has `‖L‖₁ ≤
  max(1,|u|)ρ/(1−ρ)`, and iterating gives `L^k e_n = ρ^{H_k(n)}u^{S_k(n)}e_{T^k(n)}` with `H_k` the sum
  of values traversed and `S_k` the odd-step count — hence
  `Tr L^k = Σ_{T^k n = n} ρ^{H_k}u^{S_k}` *(both verified entrywise on a 40×40 exact rational model at
  `ρ = 1/2, u = 3`)*. Grouping by primitive cycles gives the Euler product
  `det(I − zL) = Π_C (1 − z^{ℓ(C)}ρ^{H(C)}u^{s(C)})`, with trivial factor `1 − z²ρ³u` from
  `ℓ = 2, H = 3, s = 1`. *I rebuilt the determinant from its traces via Newton's identities and got
  exactly `1 − 3z²/8 = 1 − z²ρ³u`, all other coefficients zero through degree 12.*
* **§6 is the round's real contribution: the cancellation cannot exist, and the proof is airtight.**
  With positive weights the relative traces are `R_k ≥ 0` — sums of positive terms with nothing to
  cancel against *(verified)*. Rotating the starting point around a cycle gives the *same* product
  `ℓ(C)·Π_{n∈C}ρ^n u^{ε(n)}`, not an alternating sum. And the killer generalization: assign an
  independent variable `x_n` per vertex, so each cycle factor is `1 − z^{ℓ}Π_{n∈C}x_n` — **distinct
  cycles carry distinct monomials, so no universal algebraic identity can remove a cycle factor, and
  any specialization that does has blinded the detector to that cycle.** This is strictly stronger
  than round 68's degree argument, which showed only that the top term is unpaired.
* **§7 translates it to arithmetic, with a formula I checked two ways.** `C(ε) = Σ ε_j2^j3^{ε_{j+1}+⋯}`
  gives `x_ε = C(ε)/(2^k − 3^s)`, and parity consistency is automatic *(both verified over all 16,382
  words of length ≤ 13)*. The root-of-unity divisor filter then expresses `N_k` as a character sum —
  *I confirmed the character sum equals the direct count for every `k ≤ 12`, and that
  `N_k = 1 + (−1)^k`, i.e. 0 for odd `k` and 2 for even.* But the filter cancels **word by word**:
  inadmissible words vanish, a genuine cycle word survives with weight `+1`. So "trace cancellation"
  is exactly `2^k − 3^s ∤ C(ε)`.
* **§8 — escape is invisible, and here it is a theorem about the whole class.** Any compact
  `Le_n = a_n e_{F(n)}` has `a_n → 0`, so on a nonrepeating orbit (which must have `n_j → ∞`) the
  restriction is **quasinilpotent**: no diagonal term, no Euler factor, no nonzero eigenvalue.
  Trace-class regularization *necessarily* suppresses exactly the trajectories one wants to detect.
* **§9–10 — the repair, and it is new.** On `V_N = {3,…,N}`, `det(I − zK_N) = 1` (nilpotent), and the
  escape functional `E_{n,N}(z) = zβ_N(I − zK_N)^{−1}e_n` equals `z^r` on an upward exit at time `r`
  and `0` on arrival at `{1,2}`. Adjoining the rank-one edge `K̃ = K_N + e_nβ_N` gives
  `E_{n,N} = 1 − det(I − zK̃)/det(I − zK_N)`, so `det(I − zK̃) = 1 − z^r`. *(All verified symbolically
  at `N = 40, 80, 160` for every `n`, including the equivalence `det(I−zK̃) = det(I−zK) ⟺ E = 0`.)*
  This yields **Theorem 10.1**: Collatz ⟺ the cycle determinant identity **and** the boundary
  determinant identity — the full conjecture in determinant language, both halves.
* **§11 — and a clean no-go for the analytic route.** For `|z| < 1`, `z^{r_N} → 0` as `N → ∞`, so
  **inside the disk a divergent orbit and a convergent one have identical limits**; the distinction
  lives only at `z = 1`, where `E_{n,N}(1)` is 1 versus 0. "Local-uniform Fredholm convergence for
  `|z| < 1` cannot by itself prove nonescape" — exact eventual vanishing is required.
* Failure mode: (a)+(b)+(d) — a proved impossibility for the cancellation mechanism, a target identity
  equal to cycle exclusion, and a determinant invariant provably blind to escape.

**Placement.** Rounds 67, 68 and 72 now form a closed set on determinants: 67 built the zeta/trace
version, 68 showed the finite-matrix expansion has no cancellation to mine, and 72 proves the same for
the trace-class version *by an independent and stronger argument* (per-vertex variables, not degree
counting) while supplying the first determinant object in the campaign that actually sees escape.
Note the two-halves pattern is now universal: every operator-theoretic round since 63 splits into a
cycle half that the method handles cleanly and an escape half it cannot see — and §8 here explains
why that split is forced, not accidental: **compactness, the very property that makes the determinant
exist, is what erases the divergent orbits.**

## Round 73 — approach 68, Numen-integrality exclusion

`round-73-output.md`, 16698 chars, 59m 53s. Not a proof, and the round is unusually decisive: it does not
merely fail to close, it **refutes the central correspondence the approach rests on**, with explicit
counterexamples. Every checkable claim verified.

* **The 3-adic test is vacuous — this is the round's first blow.** With `H_0(x)=x/2`, `H_1(x)=(3x+1)/2`,
  the affine identity `H_{ε_0}∘⋯∘H_{ε_{N-1}}(x) = χ_N(ε) + M_N(ε)x` holds with
  `χ_N = Σ ε_j3^{s_j}/2^{j+1}` and `M_N = 3^{s_N}/2^N` *(verified symbolically on 300 random words)*. The
  `r`-th nonzero summand has 3-adic valuation exactly `r−1` *(verified)*, so the series always converges
  in `ℚ_3` and **`χ_3(ε) ∈ ℤ_3` for every single binary word** *(verified)*. The natural integrality test
  excludes nothing.
* **Theorem 1 relocates the whole object: the numen is a BACKWARD invariant.** `χ_3(ε) = n ∈ ℕ` iff the
  recursion `x_{j+1} = 2x_j` or `(2x_j−1)/3` stays in `ℕ` forever, and then `T(x_{j+1}) = x_j`. The word
  is an infinite *backtracing* parity vector, because the least significant symbolic digit is the *last*
  branch of a forward trajectory. *(Verified on 800 genuine backward walks of length 80: `T(x_{j+1})=x_j`
  throughout, `n = χ_N + M_N x_N` exactly in `ℚ` for every `N`, and `χ_N → n` in `ℚ_3` mod `3^{s_N}`; the
  converse — words that leave `ℕ` have `χ_3 ≠ n` — checked mod `3^20`.)*
* **Theorem 2 is the real theorem, and it is genuinely new value.** If `χ_3(ε) = n ∈ ℕ` then
  `3^{s_N}/2^N → 0`, i.e. `N log2 − s_N log3 → +∞`. The proof is clean: `0 ≤ χ_N < n` bounds an increasing
  real series, its terms at the `1`-positions are exactly `M_{d_r}/2`, so `M_{d_r} → 0`, and between `1`s
  the multiplier only grows by `3/2`. *(All three ingredients verified; `M_N < 10^{−6}` by `N = 120` on
  every integer fiber tested.)* Hence the unconditional exclusion **`limsup 3^{s_N}/2^N > 0 ⟹ χ_3(ε) ∉ ℕ`**.
  Note what it does *not* say: such a word's numen is still a perfectly good element of `ℤ_3` — it is just
  not a *diagonal* integer.
* **§4 kills Correspondence Principle II outright, and this is the sharpest refutation the campaign has
  produced.** The claim "irrational code + integral numen ⟹ divergent trajectory" is **false**: every
  `n` with `3∤n` has *continuum many* irrational codes with `χ_3 = n`. The construction is explicit —
  since `2` generates `(ℤ/9)^×`, pick `a_r` with `2^{a_r}x_r ≡ 2 (mod 9)`, set `t_r = a_r + 6r + 6b_r`
  with `b_r ∈ {0,1}` free, append `0^{t_r}1`. *(Verified for every `n < 60` with `3∤n`: the blocks give a
  genuine positive backward path, `x_{r+1} ≡ 1 mod 3` so the construction never stalls, `t_r → ∞` so the
  word is aperiodic, and `χ_3` of the word equals `n`.)* For `n = 1` the code is `0^7 1 0^{17} 1 0^{19} 1 ⋯`
  with `x_1 = 85`, `x_2 = 7427413`, and the identity `1 = 1/2^8 + 3/2^{26} + (9/2^{26})·7427413` is
  *exact in `ℚ`* — **I confirmed it as an exact rational equality.** So an irrational code with integral
  numen value sits over `1`, the trivial cycle. The same series summed in `ℝ` gives `< 1/128`, not `1`
  *(verified)* — the real and 3-adic numens are different numbers.
* **§5 is the restatement, and it is exact.** For a periodic word, `χ_3(w^∞) = C(w)/(2^k − 3^s)`
  *(verified as a `ℚ_3` limit over all 4083 words with `k ≤ 11`, and exactly in `ℚ` as `χ_k/(1−M_k)`)*.
  Theorem 4: all-place integrality ⟺ `D | C` ⟺ ordinary integer ⟺ **integer Collatz cycle** *(verified
  over all words `k ≤ 14`; the only positive cycles found are `1` and `2`, and `w = 1 ↦ −1`,
  `w = 011 ↦ −5` recover the negative cycle `−5 → −7 → −10 → −5`)*. So "every nontrivial positive
  periodic word is nonintegral somewhere" *is* "there is no nontrivial cycle".
* **And the blindness is structural: `gcd(2^k − 3^s, 6) = 1` always** *(verified, `k ≤ 14`)* — `D` is odd
  and `≡ 2^k mod 3` — so **neither the 2-adic nor the 3-adic completion can ever detect the denominator.**
  A detecting prime must have `p ≥ 5` and `v_p(D) > v_p(C)`, and producing one is the whole problem.
* **§6 — no simultaneous local test can exist for aperiodic words.** The terms `a_r = 3^{r−1}/2^{d_r+1}`
  have `|a_r|_3 → 0`, `|a_r|_2 → ∞`, `|a_r|_p = 1` for `p ≥ 5` *(all verified)*, so the series converges
  in `ℚ_3` and **nowhere else** — there is no tuple `(X_∞, X_2, X_3, X_5, …)` to test. And even total
  local integrality would only give a profinite integer: `N! → 0` in every `ℤ_p` while `N! → +∞` in `ℝ`.
* Failure mode: (b)+(c)+(d) — the periodic half is literally cycle exclusion, the invariant is aimed at
  backward orbits rather than forward ones, and the 3-adic criterion is satisfied by every word including
  the ones over the trivial basin. Plus the integer-lift seam in its purest form: **profinite ≠ diagonal.**

**Placement.** This is the first round in the campaign to attack a *published 2026 preprint's* stated
correspondence and find it broken — the paper's Part I gives only that a periodic point has *some*
rational code, which does not make the fiber over an integer rational, and §4's continuum of irrational
codes over `n = 1` is an explicit counterexample to the inference. Against rounds 67/68/72 (determinants)
the pattern repeats in a new key: the method handles cycles by *restating* them and cannot see escape at
all, and here the reason is named precisely — **finite-place integrality is an archimedean-free condition,
so it can never supply the nonescape bound.** What survives is Theorem 2, a real backward-drift theorem,
and the sharp statement of what a numen proof would still need: an adelic diagonalization and height
theorem producing one positive rational integer compatible at every place with nondecaying multiplier.

## Round 74 — approach 69, A 2-3 Tauberian decorrelation theorem

`round-74-output.md`, 16513 chars, 118m 47s — **the longest round of the campaign**. Not a proof, and like
round 73 it *refutes* its own premise rather than merely failing to close. Every checkable claim verified.

* **The proposed decorrelation theorem is false, by an exact identity.** With the accelerated odd map
  `U(n) = (3n+1)/2^{v₂(3n+1)}` and `C_{k+1} = 3C_k + 2^{A_k}`, the identity `2^{A_k}U^k(n) = 3^k n + C_k`
  holds *(verified for every odd `n < 4000` over 8 steps)*. A valuation word `w` is realized by **exactly
  one** odd class `n ≡ 3^{−r}(2^A − C) mod 2^{A+1}` *(verified by brute force against all 1364 words with
  letters ≤ 4, `r ≤ 5` — the class is exactly the realizing set, and every member of it realizes `w`)*,
  and the branch maps that cylinder bijectively onto one class mod `2·3^r` via
  `U^r(n_0 + 2^{A+1}t) = X_0 + 2·3^r t` *(verified)*. Hence the terminal indicator is **constant on the
  whole seed cylinder**: `1{U^r(n) ≡ −1 mod 3^r} = 1{3^r | C + 2^A}` *(verified)*. The conditional density
  is `0` or `1`, never `3^{−r}` — **and no summation method can manufacture the missing factor, because
  the endpoint predicate is already deterministic once `w` is fixed.**
* **The conductor-drop computation is the sharp form of that blindness.** Endpoint precision `3^s` costs
  only `3^{(s−r)₊}` of extra seed conductor — for `s ≤ r` the condition is true for every seed or false
  for every seed *(verified)*. The terminal condition has `s = r`, so it costs **zero excess ternary
  digits**. That is exactly why a direct 2-vs-3 independence theorem cannot exist.
* **The unavoidable equality ray.** `w = 1^r` has `A = r`, `C = 3^r − 2^r`, so `C + 2^A = 3^r` exactly;
  every `n = 2^{r+1}t − 1` realizes it with `U^r(n) = 2·3^r t − 1`, hence `3^r | U^r(n)+1` at every depth
  *(all verified, `r ≤ 13`)*. And uniformity in the target is impossible even after subtracting it: for
  the accelerated `3x−1` map `5 →(1) 7 →(2) 5` *(verified)*, so `(1,2)^N` gives arbitrarily deep barrier
  words terminal at `5`. The theorem must be specific to the component rooted at `1`.
* **§5 is the round's real contribution and it is complete.** The weighted extinction lemma:
  `M_r = Σ_{B_r} 2^{−A(w)} ≤ ρ^r` with `ρ = α^α/(3β^β) = 0.9465045768…`, `α = log₂3` — *I confirmed the
  minimiser `x_* = 2β/α = 0.7381404929` is the true minimum of `x^{1−α}/(2−x)` on a fine grid and that
  `f(x_*) = ρ` to machine precision, and that `M_r ≤ ρ^r` numerically for `r ≤ 12`*. Since every `w ∈ B_r`
  has `2^{A(w)} < 3^r` *(verified)*, every nonzero term of `Θ_r` exceeds `3^{−r}`, so the hypothesis
  `Θ_r ≤ Cr^K3^{−r}M_r` forces `Θ_r = 0` outright. **The Tauberian conversion below one is rigorous and
  complete; all the difficulty is in the center estimate.** This is the campaign constant `λ = 2.8395137305`
  again (`#B_r ≤ C(⌊αr⌋, r)` by hockey-stick, *verified for `r ≤ 39`*), now carrying an actual lemma.
* **§8 is the honest self-assessment, and it is the sharpest such statement the campaign has seen:**
  because every nonzero term already exceeds `3^{−r}`, the estimate `Θ_r ≪ 3^{−r}ρ^r` is **equivalent** to
  `Θ_r = 0`, not a soft improvement of it. The generating function `F(z) = Σ E_r z^r` would have to be a
  *polynomial*. So the "corrected Tauberian theorem" is target-tree extinction wearing analysis clothes.
* **§7 explains why Fourier cancellation cannot reach it.** `D_{uv} = 3^s C_u + 2^{A(u)}D_v`, so **every
  suffix of a terminal word is terminal at its own depth** *(both verified over all `u,v` with letters ≤ 3,
  lengths ≤ 3)* — a nested carry tower, not `r` independent probability-`1/3` events. And average
  equidistribution is structurally the wrong tool: it cannot separate `ν_r({0}) = 0` from
  `ν_r({0}) = 2^{−A(w)}`, which is precisely the dichotomy the proof needs.
* *I enumerated the barrier language directly:* `E_r = 0` for **every** `r ≤ 14` — only `1^r` is terminal
  (`#B_r` = 1, 2, 3, 7, 12, 30, 85, 173, 476, 961, 2652, 8045, 17637, 51033, always within the
  `C(⌊αr⌋,r)` bound). The reply's much stronger claim of an exact search to `r ≤ 10^10` via 731,209,150
  reverse seeds is cited to a *project file*, not to anything in this chat — **treat it as unverified**;
  it is the one load-bearing assertion here I could not check.
* Failure mode: (a)+(b)+(d) — a proved impossibility for the whole decorrelation method class, a corrected
  target that is literally equivalent to the open problem, and an invariant (average equidistribution)
  provably too blunt for a fixed-residue avoidance question. Plus a **second, logically independent gap**
  the round names precisely: even rooted extinction would not prove Collatz, because nothing forces a
  hypothetical orbit's blocks to satisfy the archimedean record condition `A_{j+k}−A_j < k log₂3` and the
  ternary condition `U^{j+r}(n) ≡ −1 mod 3^r` *simultaneously* — the synchronization problem.

**Placement.** Rounds 73 and 74 are twins: each takes a program that looked like it needed one more
estimate, and proves the estimate is the conjecture. But 74 is the more useful of the two, because it
leaves behind a **complete conditional lemma with the right constant** (`ρ = λ/3 < 1`, §5) and an exact
replacement target (RMC / target-strip avoidance) rather than only a refutation. It also supplies the
cleanest statement yet of why the two-halves pattern keeps recurring: the seed and endpoint cylinders are
*exact affine images of each other*, so any invariant built from one is a deterministic function of the
other — there is no randomness at the 2-3 interface to harvest, at any depth.

## Round 75 — approach 70, Grobner bases for q-series carry ideals

`round-75-output.md`, 17613 chars, 38m 12s. Not a proof. Third refutation-round in a row, and the
cleanest of the three: the obstruction is a **surjectivity theorem**, so the method class is dead by a
one-line mechanism rather than a missing estimate. All claims verified.

* **An explicit conjugacy, and it is genuinely tidy.** With `Q(n;q) = Σ ε_k(n)q^k ∈ F₂[[q]]` and Monks's
  map `U(f) = (f + f(0)(1+q²))/q`, the *single* multiplication `H(n) = (1+q²)Q(n;q)` intertwines them:
  `H(Tn) = U(H(n))` *(verified for every `n < 6000` over 37 coefficients)*. Then `h_j = ε_j + ε_{j−2}`
  *(verified)*, so `H(n)` is a polynomial exactly when the parity sequence is eventually period two —
  i.e. **`H(n) ∈ F₂[q] ⟺ n reaches {1,2}`** *(verified for all `n < 3000` against the actual orbit)*.
  A clean restatement of Collatz in one line of `F₂[[q]]`.
* **And that is exactly why the ideals are empty. `H_r : F₂^r → F₂^r` is a bijection** *(verified for
  `r ≤ 14`: the image has exactly `2^r` elements every time)*, because the length-`r` parity map is a
  bijection mod `2^r` and `1+q²` is a unit mod `q^r`. Hence `A mod q^r` is **all** of `F₂[q]/(q^r)`:
  every finite output prefix is realized by a positive integer, the elimination ideal is exactly
  `⟨z_i² − z_i⟩`, and **at every finite stage the variety is already the entire Boolean cube.** The
  first proposed step cannot produce a proper variety at all. (The first Boolean functions are
  `z₀ = x₀`, `z₁ = x₁`, `z₂ = x₂ + x₀x₁` — *verified on all 8 classes mod 8*.)
* **Iterating cannot help, twice over.** `U(A) = A` since `T(ℕ₊) = ℕ₊` *(verified)*, so the ideal chain
  is constant at zero from the start. And `f = qU(f) + f(0)(1+q²)` gives **backward** invariance:
  `U(f)` is a polynomial iff `f` is *(verified by reconstructing `f` from `U(f)` on 511 series)* — so a
  nonpolynomial image can never be dynamically forced into finite support. Proving some iterate is a
  polynomial is already the original problem.
* **§5 is the sharpest diagnosis: Noetherianity points the wrong way.** `F₂[[q]]`'s ideals `(q^m)` detect
  vanishing of *initial* coefficients; Collatz needs vanishing of all sufficiently *late* ones, and
  finite support is neither an ideal nor `q`-adically closed. `U^{−k}(W) = P_{≤k+1}` for `W = span{1,q}`
  *(verified for all nonzero polys of degree ≤ 11, `k ≤ 12`)* is a strictly **increasing** union, and
  `q^{k+1}` lands in `W` after exactly `k` steps and not `k−1` *(verified, `k ≤ 12`)* — so the kernel
  chain `ker t ⊊ ker t² ⊊ ⋯` is strict and the module is not Noetherian. The killer example is trivial:
  **`H(2^m) = q^m`** *(verified, `m ≤ 19`)*, so images of positive integers already have unbounded
  nilpotence depth, and any Noetherian stabilization would falsely give a uniform stopping bound.
* **What survives is a real encoding.** The local quadratic carry ideal — `c_{t,0}=0`, `c_{t,1}=e_t`,
  `b_{t+1,j−1} = b_{t,j} + e_tb_{t,j−1} + c_{t,j}`, `c_{t,j+1} = e_tb_{t,j}b_{t,j−1} + b_{t,j}c_{t,j} +
  e_tb_{t,j−1}c_{t,j}` — is the exact ANF of the three-summand carry, and **I simulated it against the
  real orbit: it reproduces `T` bit-for-bit** (500 seeds, 12 steps), on the identity
  `2T^{t+1}(n) = T^t(n) + e_t(2T^t(n)+1)` *(verified for `n < 20000`)*. So `Collatz ⟺ ∀D ∃K, 1 ∈ C_{D,K}`
  is an exact Gröbner equivalence — but for fixed `D` the chain stabilizes because `A_D` is Artinian,
  **and nothing says it stabilizes at the unit ideal.** A finite local rule whose termination is Collatz,
  supplying no termination argument.
* The round also reconnects to the campaign's own countermodel list: `(1,1,2)^∞` has seed
  `C/(2^A − 3^r) = −19/11` — *I confirmed the rational, that its 2-adic valuations really are `1,1,2`
  repeating, and that it returns to itself* — a locally valid infinite ray that is not an integer.
* Failure mode: (a)+(b)+(d) — a proved impossibility for the whole coefficient-ideal class (by
  surjectivity), an exact encoding that restates the problem, and an invariant (`q`-adic order) that
  by construction sees only the head of the sequence when the question is entirely about the tail.

**Placement.** Rounds 73, 74, 75 form a run of refutations, and they refute by *three different
mechanisms*: 73 by explicit counterexample (irrational codes over `n=1`), 74 by an exact affine identity
(seed and endpoint cylinders are images of each other), 75 by surjectivity (every finite prefix is
attained). Together they say the same thing in three languages — **the campaign's methods keep building
invariants that are functions of a finite prefix, and Collatz is a statement about tails.** §5's
formulation is the one to keep: `q`-adic ideals detect how many *initial* coefficients vanish; the
conjecture asks whether all sufficiently *late* ones do, and those are opposite ends of the sequence.

## Round 76 — approach 71, Characterize the positive-integer image of the parity conjugacy

`round-76-output.md`, 19809 chars, 45m 27s. Not a proof — **but it is the first round in a long stretch
that actually delivers the thing it was asked for.** The approach's stated subproblem is solved exactly,
and the round is honest that the *next* step is circular. All checkable claims verified.

* **The characterization, and it is genuinely clean.** For a parity prefix `w_k`, define the canonical
  inverse residue `ρ_k = [−Σ_{j<k} ε_j2^j/3^{s_{j+1}}]_{2^k}`. *I verified this is exactly the least
  nonnegative integer realizing `w_k`* (brute-forced against every seed `< 2^k`), and that
  `ρ_{k+1} ≡ ρ_k mod 2^k`, so `ρ_{k+1} = ρ_k + b_k2^k` for a unique bit. **Theorem 1: `Φ(ε) ∈ ℤ_{≥0}` ⟺
  the carry bits `b_k` have finite support ⟺ `ρ_k` is eventually constant ⟺ `ρ_k/2^k → 0`.** *Verified
  for every `n < 800` at depth 60: the machine's `ρ_K` stabilises at `n` and `b_k = 0` once `n`'s bits
  are exhausted.* The signed version too — the all-one word has `b_k = 1` forever, `ρ_K = 2^K − 1`, and
  `Φ = −1` *(verified)*.
* **And it is computable with no reference to `Φ` at all.** The prefix-only carry machine
  `b_k ≡ z_k + ε_k (mod 2)`, `ρ_{k+1} = ρ_k + b_k2^k`,
  `z_{k+1} = (3^{ε_k}z_k + ε_k + b_k3^{s_{k+1}})/2`, with `z_k = (3^{s_k}ρ_k + C_k)/2^k` — *I verified
  `z_k` is always an integer, that the division in the recursion is always exact, that `0 ≤ z_k < 3^{s_k}`,
  and that the machine reproduces `ρ_k` exactly on 1110 words.* Restated: **a parity sequence comes from
  a nonnegative integer exactly when, after finitely many inverse carries, every next parity bit agrees
  with the parity predicted by the previous prefix's canonical endpoint.** The early mismatches *are*
  the binary digits of the seed.
* **Inside the drift barrier it becomes a corner condition.** On barrier words `0 ≤ R_k ≤ s_k/3`, hence
  `0 ≤ z_k/3^{s_k} − ρ_k/2^k = R_k/2^k ≤ k/(3·2^k)` *(verified exactly in rationals on 171 barrier
  words)*, so `Φ(ε) ∈ ℤ_{≥0} ⟺ z_k/3^{s_k} → 0` — the positive-integer image is the set of barrier words
  whose canonical endpoints approach the corner of the mixed dyadic/ternary rectangle
  `0 ≤ ρ_k < 2^k`, `0 ≤ z_k < 3^{s_k}`. This is the cross-prime localization the approach wanted, sharp.
* **Then the round names its own circularity, precisely.** The missing statement (D) — *every infinite
  barrier word has infinitely many inverse carries* — is by its own Theorem 3 **equivalent to the
  nonexistence of divergent positive orbits.** The known drift theorem shifts an *already existing*
  divergent orbit into the barrier; it does not show a barrier word must keep producing carries. "That
  is the precise point where a seemingly natural 'combine with drift' argument becomes circular."
* **§7 is an impossibility theorem for the finite-prefix method class.** Every finite parity word is
  realized by a positive integer (`ρ_K(w) + m2^K`), and `Q(ℤ_{≥0})` is dense in the shift — so no finite
  forbidden-word theorem, compactness argument, or finite-state rule can separate the image. The
  all-one word is the model failure: every prefix is realized by `2^K − 1`, but the limit is `−1`.
* Two further exact identities I checked: the real/2-adic shadow `a_{t+1} = a_t/2` or `(3a_t−1)/2`
  *(exact on truncated suffixes)* — a divergent orbit would run a `3x+1` and a `3x−1` trajectory on the
  *same* labels — and the telescoping `A_K − B_K = 1 − 2^K/3^{s_K}` *(verified on all 1110 words)*,
  giving `A_∞ − B_∞ = 1`.
* **The cycle half is explicitly separate**: `x_w = C_w/(2^ℓ − 3^r)` *(verified to be the periodic point
  for every word tested)*, with `10 ↦ 1` and `01 ↦ 2`, and (C) is the usual divisibility exclusion.
* *I also recomputed the finite extremal `M_K` two ways* — least seed surviving `K` barrier steps, and
  `min ρ_K` over barrier words — **they agree**, giving `M_K = 3,3,7,7,7,27,27,…` for `K = 2..14`.
* Failure mode: (a)+(b)+(d) — the finite-prefix impossibility of §7, a target (D) that is *literally*
  the divergent half of the conjecture, and the density obstruction that makes any prefix invariant
  blunt. Plus the integer-lift seam in its defining form: the whole difficulty is exactly *when the
  2-adic limit is an ordinary nonnegative integer.*

**Placement.** Where 73/74/75 refuted their premises, 76 **fulfils** its premise and shows that doing so
relocates the problem without shrinking it — which is arguably the more informative outcome. It also
gives the campaign its sharpest statement of the integer-lift seam to date: the parity conjugacy is a
perfect isometry, so all of Collatz's difficulty is concentrated in the single archimedean question of
finite support, and §7 proves no finite-scale argument can answer it. Read against round 75 (`q`-adic
ideals see the head, Collatz is about the tail) the two rounds are the same theorem in different
categories, and both name the same fix: an **unbounded-scale carry obstruction**.

## Round 77 — approach 72, Use the Collatz autoconjugacy to pair hard and easy paths

`round-77-output.md`, 22269 chars, 105m 9s — **the longest reply of the campaign and the densest**. Not a
proof. It proves the pairing idea *works*, then proves it works so well it collapses to the trivial cycle,
and locates the escape hatch exactly. Every claim verified in exact rational arithmetic.

* **The pairing identity is exact and free.** With `Ω = Φ∘V∘Q`, `V(u) = −1−u`, the complementation
  `s_k(Ωx) = k − s_k(x)` gives **`q_k(x)·q_k(Ωx) = (3/4)^k`** — *verified for `n < 200` to depth 40*. So a
  path with `q_j ≥ 1` throughout is paired with one obeying `q_j ≤ (3/4)^j`: genuinely forced descent.
  *I confirmed `Ω` from scratch on exact rationals: complementary parities for 60 steps (`n < 260`),
  `Ω∘T = T∘Ω`, and `Ω² = id`.*
* **Theorem 1 is the round's hard result, and it is decisive.** If `x > 0` and `Ω(x) ∈ ℤ` then
  `{x, Ω(x)} = {1,2}` — **nothing else.** The proof is a two-case Lyapunov argument on the product `x_iy_i`:
  exactly one member is odd at each time, so the product scales by `3/4 + 1/(4u_i) ≤ 1` with equality only
  at `u_i = 1` *(verified exactly)*, and for a negative partner the factor `(3c−1)/(4c) < 3/4` strictly
  *(verified)*, forcing an impossible infinite descent of positive integers. **I checked it directly: over
  all `n < 400`, `Ω(n)` is an ordinary integer for exactly `n = 1` and `n = 2`.** So the intended
  contradiction is real but vacuous — for every `n > 2` the "easy" partner simply isn't an integer.
  (`Ω(3) = −4/9`, `Ω(7) = −2344/243`.)
* **Theorem 2 pins down how far one can weaken this.** `Ω(n) ∈ ℚ_odd ⟺ the orbit of `n` is eventually
  periodic` — proved by a danger-set argument on `P_i = x_i|a_i|` with a fixed odd denominator `b`
  *(I verified the paired numerator recursions: `x` odd ⟹ `a` even and `a ↦ a/2`; `x` even ⟹ `a` odd and
  `a ↦ (3a+b)/2`)*. Since every `n` we can compute *is* eventually periodic, `Ω(n)` is always rational —
  *confirmed, denominators always odd* — which is exactly why the theorem has teeth: **for a divergent
  orbit the partner would have to be irrational in `ℤ₂`.** Rational realizability is unavailable precisely
  in the case one needs it.
* **§8 is the sharpest thing here: why `Ω² = id` cannot be used to bounce back.** The exact truncation
  identity **`Ω_k(Ω(n)) = n − (x_k+1)/q_k = n − h_k − 1/q_k`** *(verified for `n < 200`, `k ≤ 44`, exactly)*,
  and since `h_k = n + C_k/3^{s_k} ≥ n` always, **`Ω_k(Ω(n)) < 0` for every `k`** — *verified* — while the
  same sequence converges 2-adically to `+n` *(verified mod 2^20)*. A sequence of negative rationals
  converging 2-adically to a positive integer: no contradiction, and the discrepancy is named exactly as
  the normalized carry height.
* **§7 — the partner is Archimedean nonsense.** Under `q_k(n) ≥ 1`, Bernstein's expansion
  `Ω(n) = −Σ 2^{e_j}/3^{j+1}` has terms bounded below by `3^{−β}(4/3)^{e_j}` *(verified)* with
  `β = 1 − log2/log3 = 0.369070`, so the real series diverges to `−∞`. The partner has excellent
  multiplicative descent, legitimate 2-adic convergence, and catastrophic real behaviour.
* **The cycle half gets its own exact treatment.** A positive integer cycle needs `s ≥ p/2` *(verified over
  all words `p ≤ 14`)*, so the complemented cycle has `3^t ≤ 3^{p/2} < 2^p` and its rational point
  `C_w̄/(2^p − 3^t)` is **positive** *(verified)*. The product argument then forces every odd member to be
  `1` unless the partner **dips below 1** — so any nontrivial integer cycle must have `0 < T^j(Ω x) < 1`
  somewhere. This is precisely why Monks–Yazinski's self-conjugate result doesn't close the cycle case:
  a nontrivial cycle need not be self-conjugate.
* A pretty exactness worth noting: `3^{1−α}/2 = 3/4` **identically** (`α = log2/log3`), so the divergent
  density bound `limsup q_k(y)^{1/k} ≤ 3/4` matches the finite identity (1) with no slack.
* Failure mode: (a)+(b)+(c) — a proved impossibility (both paths integral ⟹ trivial cycle), a missing
  bridge (37) that Theorem 2 makes *literally equivalent* to excluding divergence, and a theorem aimed at
  an object outside `ℤ`. **§6 is honest about the quantitative gap too:** the Lyapunov bounds give shadows
  growing like `(4/3)^k` inside a residue interval of size `2^k`, leaving `(3/2)^k` of slack — the argument
  proves the shadows must escape but not that they escape fast enough.

**Placement.** This is the strongest "the method works, and that's the problem" round yet. Where 76 solved
its subproblem and relocated the difficulty, 77 *executes* its intended contradiction and finds the
contradiction only ever fires on `1 ↔ 2`. Its §5 mechanism — the partner staying non-integral by infinitely
many **top-bit injections**, each shifting the seed by `2^k` and the endpoint by `3^{t_k}` under
`0 ≤ z_k < 3^{t_k}` — is *the same carry machine round 76 built from the other side*, and both rounds end
by asking whether an injection/carry sequence can persist aperiodically under simultaneous 2-adic seed and
3-adic endpoint constraints. Rounds 74, 76 and 77 have now converged on one named target from three
independent directions.

## Round 78 — approach 73, A forbidden-lift theorem for de Bruijn paths

`round-78-output.md`, 20027 chars, 26m 51s. Not a proof — the approach's premise is refuted outright — but
it leaves behind a **genuinely new quantitative theorem** that I verified on a quarter-million real cases.

* **The premise is false, and provably so.** Every binary word of length `k` is the parity prefix of an
  entire positive residue class mod `2^k` — *I brute-forced this: for all words with `k ≤ 11` the realizing
  set is EXACTLY one class, and every member of it realizes the word.* So no finite forbidden pattern can
  exist. The showcase is `n_k = 2^k − 1`, with `T^j(2^k−1) = 3^j2^{k−j} − 1` odd for all `j < k`
  *(verified to `k = 21`)*: parity `1^k` and `q_j = (3/2)^j > 1` — **maximal positive drift, lifted to a
  positive integer at arbitrary depth.** Corollary: `Q(ℤ_{≥0})` is dense, so no finite word set, finite-state
  subshift, or bounded-memory de Bruijn rule can separate the integer image.
* **The correct obstruction is the same carry machine rounds 76/77 converged on** — `b_k ≡ z_k + ε_k (mod 2)`,
  `ρ_{k+1} = ρ_k + b_k2^k`, `0 ≤ z_k < 3^{s_k}`, corner bound `0 ≤ z_k/3^{s_k} − ρ_k/2^k ≤ k/(3·2^k)` — and
  **(FL)** ("every barrier path has infinitely many `b_k = 1`") is proved *equivalent* to excluding
  divergent orbits. Third round running to land on this exact statement.
* **Theorem 6 is the new content, and it is real.** If the length-`L` parity windows at times `i` and `i+p`
  agree and the intervening block has positive drift `3^r > 2^p`, then
  **`x_i + 1 ≥ 2^{p+L}/(3^p − 2^p)`**, hence `L < log₂(n+1) + (i+p)log₂(3/2)`. The proof chains
  `x_{i+p} ≡ x_i (mod 2^L)` *(verified: equal length-`L` parity vectors ⟺ equal residues mod `2^L`)*,
  `C_w ≤ 3^p − 2^p` *(verified over all words `p ≤ 13`)*, and `T(x)+1 ≤ (3/2)(x+1)` *(verified)*.
  **I tested the conclusion against real orbits: 258,216 positive-drift returns over `n < 4000`, all
  satisfying (25) — and the bound is exactly tight (ratio 1) in cases like `n = 3, i = 0, p = 1, L = 1`.**
  The square corollary `p < log_{4/3}(n+1)` held on all 8,177 positive-drift squares with `n < 20000`.
* **Theorem 5 shows what a real forbidden lift looks like:** an eventually periodic tail with `3^r > 2^p`
  cannot lift positive, since `x_w = C_w/(2^p − 3^r) < 0`. For `(110)^∞`: `C_w = 5`, `x_w = −5`, and
  `−5 → −7 → −10 → −5` *(all verified)*. **But it works because the whole tail repeats — the word `110`
  itself is realized by plenty of positive integers.**
* **§7.1 is the round's sharpest single observation.** Under `3x−1`, the *same* word `(110)^∞` lifts to the
  **positive** cycle `5 → 7 → 10 → 5` *(verified, parity `1,1,0`)*. Identical de Bruijn path, identical
  drift data, opposite sign of lift. **So no theorem built from recurrence, parity density, symbolic drift,
  or graph topology alone can ever distinguish positive from negative lifting** — the `+1` carry cocycle is
  doing all the work.
* **§7 is honest about the limits of its own theorem:** i.i.d. symbols with `Pr(ε=1) = θ > α` give barrier
  paths almost surely, while exact long returns have probability `(θ²+(1−θ)²)^p`, so Borel–Cantelli
  produces barrier paths whose late squares have half-length only `O(log i)`. High-complexity paths simply
  avoid the returns Theorem 6 needs.
* Cycles stay separate: every positive integer cycle has `2^p > 3^r` *(verified over all words `p ≤ 14`)* —
  **negative total drift** — so a positive-drift argument cannot touch them by construction.
* Failure mode: (a)+(b)+(d) — the finite-pattern premise disproved by density, (FL) literally equivalent to
  the divergent half, and a return invariant that provably misses the high-complexity regime.

**Placement.** Rounds 76, 77, 78 are now a closed trio that reached the *same* carry/injection machine from
three unrelated starting points (parity-image characterization, autoconjugate pairing, de Bruijn lifting),
and each independently proved its own finite-scale method class insufficient. 78 adds the one thing the
others lacked: a **quantitative, checkable inequality** that actually excludes a nontrivial class of
candidate paths (all eventually periodic positive-drift tails, all strongly repetitive paths). And §7.1
gives the campaign its cleanest negative control to date — the `3x+1` vs `3x−1` sign flip on identical
symbolic data — which retroactively explains why every purely symbolic round since 63 has stalled.

## Round 79 — approach 74, A higher-dimensional sofic certificate

`round-79-output.md`, 20317 chars, 42m 2s. Not a proof, but a **clean conditional theorem with a short,
correct proof** — and an unusually precise account of exactly which hypothesis is missing. All checkable
claims verified.

* **Theorem 4.2 is genuinely proved and genuinely short.** If every member of the divergent bad language
  admits a *spliceable finite cut quotient*, that language is empty. The argument is three lines: `Q` finite
  + `H_k → ∞` gives two cuts `i<j` with the same state and `H_j > H_i`, so the block between them has
  `3^r > 2^p`; splicing repeats it forever; and **Lemma 3.1** says a periodic tail `v^ω` has seed
  `C(v)/(2^p − 3^r) < 0`. *I verified Lemma 3.1 over all words `p ≤ 14`: the seed is always the fixed point
  of `T^p` along `v`, `C(v) > 0` whenever `r > 0`, and `3^r > 2^p` always forces a negative seed. The only
  positive integer periodic seeds that exist are `1` and `2` — both with `3^r < 2^p`.* Empirically every
  `n < 4000` ends in the `(10)^ω` tail, drift `3 < 4` *(verified)*.
* **The synchronized machine is the same one rounds 76/77/78 converged on**, and I confirmed it reproduces
  ordinary Collatz exactly: past the seed's top bit, `ρ_k = n`, `z_k = T^k(n)`, and `b_k = 0` forces
  `ε_k ≡ z_k (mod 2)` *(verified for `n < 600` to depth 44)*. So an infinite locally-valid mixed-base
  diagram with eventually-zero `b`-boundary **is** a real positive-integer trajectory — the four tracks
  (`ε_k` branch, `b_k` seed digit, `z_k` ternary carry, `H_k` height) are exactly the proposed sofic tracks.
* **§5 is the honest part, and its central point is correct: 2D soficity has no lasso theorem.** A
  1-dimensional automaton with nonempty infinite language has an ultimately periodic run; there is no such
  theorem for 2D shifts of finite type, and plane-tiling nonemptiness is undecidable in general. So
  "finite tile alphabet ⟹ repeatable arithmetic rectangle" is invalid without a system-specific theorem.
  The Stérin–Woods quasi-CA and the Yolcu–Aaronson–Heule rewriting system supply the *local* encoding only.
* **A cut is not one finite state.** The relevant data is `(ρ_k mod 2^k, z_k mod 3^{s_k}, inverse-fiber
  order profile)`, and `H_k` determines none of them — two cuts can share height, local neighborhood and
  transducer state while carrying different seed residues and opposite answers to "does a smaller positive
  ancestor exist?"
* **§5.4 names an explicit obstruction, not a hypothetical one:** a four-state recurrent component with two
  distinct equal-cost loops, so arbitrary aperiodic concatenations stay in those four states forever and
  never reach a positive-saving state. **Bounded recurrent state ⇏ eventual periodicity or descent.**
* **§6 reconnects to our own compute, and the numbers line up.** The `81/64` recurrent branch:
  `m ↦ (81m+ε)/64` is integral exactly for `m ≡ 0 (ε=0)` or `m ≡ 15 (ε=1)` mod 64 *(verified)*, with signed
  differences obeying `64d_{j+1} = 81d_j + δ`, `δ ∈ {−1,0,1}` *(verified)*. The target bound
  `ℓ_k ≤ ⌊(k+1)/3⌋` gives **7 at `k = 20`** — **matching the `l_20 = 7` our own interround compute produced**
  (a consistency check across independent work, not a reproof). What is missing there is the overlapping-carry
  synchronization `|W_{k,L}| ≤ 3^{k+1−3L}`.
* Failure mode: (a)+(b)+(d) — an impossibility-flavoured barrier (no 2D lasso theorem; every finite pattern
  occurs on terminating orbits), a replacement target (rectangle-or-descent) of restatement strength, and a
  demonstrably blunt invariant (bounded local recurrence, refuted by the four-state example).

**Placement.** This is the fourth consecutive round to land on the same carry machine, and the first to state
cleanly *what kind of theorem* would convert it into a proof: not a better estimate but a **finiteness result
about splice-equivalence classes of complete cuts**. Its value against 76/77/78 is the conditional
implication — "exact finite control + one unbounded height + sound loop splicing ⟹ no divergent orbit" — which
is a real theorem with a real proof, and which localizes the entire remaining difficulty in a single word:
*spliceable*. And §5.4's four-state aperiodic component is the concrete reason to expect that word is hard:
the campaign now has an explicit example where bounded recurrence persists forever without descent.

## Round 80 — approach 75, Finite residue-class descent induction

`round-80-output.md`, 10817 chars, 19m 28s — **the shortest round of the campaign, and the only one to
settle its approach outright.** Not a proof; the approach is *disproved*. Every claim verified.

* **The requested modulus does not exist, and the proof is two lines of induction.** Lemma 1: for
  `x = 2^L q − 1`, `T^j(x) = 3^j2^{L−j}q − 1` for all `0 ≤ j ≤ L` — the odd branch applies every time
  because `L−j ≥ 1` keeps the value odd. *I verified this for all `L ≤ 25`, `q ≤ 39`, every `j`, including
  that the value really is odd at each step.* Then
  **`T^j(x) − x = 2^{L−j}q(3^j − 2^j) > 0` for `1 ≤ j ≤ L`** *(verified)* — no descent for `L` steps.
  Equivalently `T^j(x) + 1 = (3/2)^j(x+1)` *(verified exactly in ℚ)*, an exact `2^L → 3^L` transport.
  The worked example `31 → 47 → 71 → 107 → 161 → 242` checks out.
* **Hence `σ(2^Lq − 1) > L`, so `sup σ = ∞` unconditionally** — independent of whether Collatz is true
  *(verified for `L ≤ 19`)*. Given any modulus `M` and horizon `K = max k_r`, take `L > K`: the certificate
  claims a descent by step `K`, Lemma 1 forbids one before step `L`. Contradiction.
* **The corollary is much stronger than the approach's own framing:** no finite cover of ℕ by *any* sets
  `A_1,…,A_s` with *any* finite horizons `K_i` can work. Not residue classes specifically — **every finite
  bounded-horizon direct-descent certificate is impossible.** And none of the natural patches help
  (finitely many exceptions per class, "sufficiently large `n`", several candidate times per class,
  `n`-varying but bounded times) — `q` can always be taken larger.
* **Same conclusion for the unshortened map:** `C^{2j}(x) = 3^j2^{L−j}q − 1`, `C^{2j+1}(x) = 3^{j+1}2^{L−j}q − 2`,
  and **no descent in the first `2L` steps** *(all verified, `L ≤ 15`)*. Not an artifact of our convention.
* **§6 is the sharp reformulation.** `S_K = {x > 1 : T^j(x) ≥ x for all j ≤ K}` contains `{2^Kq − 1}` and so
  is **infinite for every finite `K`** *(verified)*, while Collatz ⟺ `⋂_K S_K = ∅`. So a proof must establish
  **pointwise extinction without finite-level extinction** — and a finite modulus would force `S_K = ∅` at
  some finite `K`, which is impossible.
* **§7 names the reason, and it is our seam again:** the nested cylinders `x ≡ −1 mod 2^K` intersect at
  `−1 ∈ ℤ₂`, a fixed point of the 2-adic map (`T(−1) = −1`, verified). Positive integers can shadow a
  **nonpositive 2-adic orbit** for arbitrarily long finite times, and a fixed modulus only ever sees a
  finite shadow. This is the same `2^m − 1` countermodel the campaign booked at round 64, now doing the
  work of a full impossibility proof.
* **§8's replacement target is concrete and worth keeping.** For odd `x`, `T(x)+1 = 3(x+1)/2`, so
  **`v₂(T(x)+1) = v₂(x+1) − 1`** *(verified for all odd `x < 200000`)* — a strictly decreasing counter
  *while the value itself grows*. That is exactly the "finite control with unbounded rank" shape: finitely
  many modes, exact coverage, closure under bounded blocks, and a well-founded rank whose initial value may
  grow with `x`. The open part is fusing this 2-adic counter with even-step resets and the 3-adic carry.
* Failure mode: pure (a) — a proved impossibility for the entire method class, with the premise simply
  false rather than merely unreachable. Plus the integer-lift seam in its cleanest form (`ℤ₂` cylinder vs ℕ)
  and a demonstrably blunt invariant (bounded-horizon magnitude descent).

**Placement.** Every previous round in this stretch ended "the missing statement is equivalent to Collatz."
This one ends differently: **the approach is false and stays false under every weakening**, which makes it
the campaign's cleanest negative result and its cheapest — 19 minutes to close an approach permanently.
It also supplies the counter that rounds 76–79 kept gesturing at: `v₂(x+1)` decreases on every odd step,
so the all-odd blocks that defeat magnitude-descent are *already* ranked by a 2-adic quantity. The
campaign's standing `2^m − 1` countermodel is now not just an obstruction but a proof technique.

## Round 81 — approach 76, Strongly sufficient arithmetic progressions

`round-81-output.md`, 16632 chars, 47m 46s. Not a proof — **the second consecutive approach refuted
outright**, and this one comes with an explicit infinite counterexample family. All claims verified.

* **The proposed implication is invalid on its own terms, and the disproof is embarrassingly small.**
  `S = {even}` is strongly sufficient (an orbit cannot stay odd forever: `n_j + 1 = 3^j(n_0+1)/2^j` would
  need `2^j | n_0+1` for every `j` — *verified*) **and** has the strongest possible one-step descent
  `T(x) = x/2`. If "strongly sufficient + uniform descent ⟹ Collatz" were valid, those two lines would
  prove it. The gap shows in `6 → 3 → 5 → 8` *(verified)*: descent after the visit, but the **next visit
  to `S` is larger**. Strong sufficiency never says `S` contains the orbit's global minimum.
* **The natural repair — first-return descent — is impossible for every finite union of progressions.**
  Theorem 2: any such `S` meeting the coprime-to-3 part has infinitely many `x ∈ S` whose first return is
  *larger*, and for every `N` some `x` whose first `N` returns are all above it. The mechanism is a red
  self-loop at `−1` (`R(−1) = −1`) inflating the multiplier `λ_L = (3^{q₀}/2^{ℓ₀})(3/2)^L → ∞`, spliced
  into a first-return path by strong connectivity, then lifted by CRT to a whole progression mod `2^{a+L}d`.
* **The explicit family is the round's best artifact.** For the canonical `S₉ = 2 mod 9`: the residue cycle
  `R(2)=8, R(8)=8, B(8)=4, R(4)=2` *(verified)* makes `R^mBR` a first-return word with
  `F_m(x) = (3^{m+1}(x+1) − 2^m)/2^{m+2}` *(verified on 320 seeds, `m = 1..8`)* and `3^{m+1} > 2^{m+2}`,
  so **every return expands**. Then `x_{N,j} = 9^{j+1}8^{N−j} − 7` gives **`N` strictly increasing returns
  to `2 mod 9`** — *I verified this by actually running `T`, not just the affine formula*: `4601 → 5177 →
  5825 → 6554`, `569 → 641 → 722`, `65 → 98 → 49 → 74`.
* **And the reason is our seam again, in a new guise:** `F_1(x) + 7 = (9/8)(x+7)` *(verified)*, so the
  `x_N = 9·8^N − 7` are arbitrarily long **2-adic shadows of the negative cycle `−7 → −10 → −5 → −7`**
  *(verified)*. A **new standing countermodel** for the campaign, alongside `2^m − 1` (round 64) and
  `3^j2^{L−j} − 1` (round 69).
* **Even the purpose-built class fails.** `20 mod 27` meets every divergent orbit and every nontrivial
  cycle, yet `R^mBR` is a first-return word there too: `20 → 17 → 26 → 26 → 26 → 13 → 20` *(verified mod 27)*,
  realized by `47 → 71 → 107 → 161 → 242 → 121 → 182` with `47 ≡ 182 ≡ 20 (mod 27)` and **no intermediate
  visit** *(verified)*.
* **What survives is a clean equivalence.** Proposition 1 (the return-descent criterion) is correct, so the
  `S₉`-return descent lemma — every `x ≡ 2 (mod 9)` either reaches `1` or has `T^k(x) ≡ 2 (mod 9)` with
  `T^k(x) < x` — **is equivalent to Collatz**. *I confirmed it holds pointwise for every `x ≡ 2 mod 9`
  below 30000.* Theorem 2 then says exactly what cannot be bounded: `k`, the number of intervening
  returns, and any fixed congruence automaton's ability to force the descent.
* Failure mode: (a)+(b)+(d) — a proved impossibility for every finite-progression certificate, a surviving
  target that is literally equivalent to the conjecture, and an invalid local-descent step. Plus the
  integer-lift seam: the finite congruence graph **sees the negative and 2-adic shadows and cannot tell
  them from an ordinary integer**.

**Placement.** Rounds 80 and 81 are a matched pair of clean refutations, and they fail the *same* way from
opposite directions: 80's `2^Lq − 1` shadows the 2-adic fixed point `−1`, 81's `9·8^N − 7` shadows the
negative cycle `−7 → −10 → −5`. In both, arbitrarily deep positive-integer prefixes imitate a
non-positive orbit, and every finite modular test is satisfied. The campaign now has three such families,
and they explain in one sentence why every congruence/automaton-flavoured approach since round 63 has
stalled: **finite congruence information cannot distinguish an ordinary integer from its shadow.** The
useful residue is 81's replacement requirement — either prove a sufficient set contains the orbit's global
minimum, or supply an unbounded history-dependent rank that decreases at returns.

## Round 82 — approach 77, Uniform inverse-tree coverage

`round-82-output.md`, 15272 chars, 48m 32s. Not a proof — third consecutive refutation — and **the first
round in the campaign to report its own exact computation, which I reproduced independently**.

* **Coverage cannot distinguish the 1-component, because every component has it.** Every arithmetic
  progression is a sufficient set, so any two positive integers in the same component merge; hence
  **every** connected component of the Collatz graph meets **every** residue class mod `d`. Several
  disjoint components can all be dense in the 2-adic and profinite topologies. `D_k(r) < ∞` is therefore
  true and useless — it holds equally for any hypothetical divergent or cyclic component.
* **Theorem 4 is the round's real content and it is sharp.** If `y ≡ n (mod 2^k)` and `y ≠ n`, then
  `τ(y) > k + s_k(n)log₂3`. The proof is two lemmas: `T^k(n+q2^k) − T^k(n) = 3^{s_k(n)}q`
  *(verified for `n < 800`, `k ≤ 12`, `q ≤ 5`)* and `τ(z) = h ⟹ z ≤ 2^h` *(verified for `z < 30000`)*.
  **I tested the conclusion on 159,237 (n, k, q) triples — no violations.** So a coverage witness is
  useless unless it falls *below* the trajectory-dependent forcing boundary `k + s_k(n)log₂3`.
* **And that boundary is provably unreachable by uniform coverage.** Applegate–Lagarias give
  `N_h(a) ≤ 1.359^h`, so covering all `2^k` classes needs `D(k) ≥ (log2/log1.359)k = 2.25965k`
  *(constant verified)* — killing `D(k) ≤ k+O(1)`, `≤ (2−δ)k`, and `≤ 2k+O(1)` **even assuming Collatz**.
  Restricting to near-critical prefixes doesn't help: there are `2^{H₂(α)k}` of them with
  `H₂(log₃2) = 0.949956`, against only `2^{2log₂(1.359)k} = 2^{0.885091k}` shallow tree nodes
  *(both verified; `0.885 < 0.950`)*. **`H₂(log₃2)` is our own campaign constant `log₃λ = 0.9499555272`
  — confirmed equal to 9 decimals.** A third independent appearance.
* **§9's computation is real. I rebuilt the inverse tree from scratch — 19,980,506 nodes to depth 54 —
  and reproduced the `D(k)` table exactly for every `k = 5..12`: 25, 29, 30, 33, 40, 42, 51, 54.** The
  witnesses check too: all eight (`30559`, `54335`, `36223`, `9375`, `1535`, `5042971`, `350207`, `106111`)
  land precisely on the `{1,2}` cycle at the claimed depth. *(My first pass flagged an off-by-one because
  I measured steps-to-1 while the round states the `{1,2}`-collapsed convention; under its own stated
  convention every value is right.)*
* **The table is also the round's own best illustration of the failure:** `30559 ≡ 31 (mod 32)` certifies
  that class meets the 1-tree, but `q = (30559−31)/32 = 954` *(verified)* — the tree covers the cylinder
  through a **high lift**, never through its least representative.
* **§8 quantifies how close the miss is.** A least counterexample has `s_k(n) ≥ k·log2/log(3+1/n)`
  *(verified along genuinely minimal prefixes)*, so its forcing scale is `(1 + log3/log(3+1/n))k → 2k`,
  while uniform coverage cannot occur before `2.25965k`. **The gap is `0.25965k` and the entropy count
  shows it is structural, not an artifact of current bounds.**
* Failure mode: (a)+(b)+(d) — a proved impossibility (congruence-density of *every* component, plus a
  counting barrier), two surviving targets (`UIC♯` and the inverse-fiber descent `M_r(n) < n`) that are
  each *equivalent* to Collatz, and a blunt invariant: **residue coverage discards exactly the
  Archimedean information `y < n` that the argument needs.**

**Placement.** Rounds 80, 81 and 82 are three refutations in a row, and 82 is the most quantitative: it
does not merely say the method fails, it computes *by how much* (`2.25965k` vs `2k`) and proves the gap
survives every restriction. It also lands on the same replacement target as round 79's `M_r(n)` and round
76's carry machine — `∀n ∃r: M_r(n) < n` — which is now the campaign's most-converged-upon statement.
And the third independent derivation of `H₂(log₃2) = log₃λ` from an entirely different direction
(counting near-critical prefixes against inverse-tree growth) is worth noting: the constant is not an
artifact of any one framing.

## Round 83 — approach 78, Push difference inequalities to a coverage theorem

`round-83-output.md`, 17831 chars, 54m 39s. Not a proof — fourth consecutive refutation — and it kills
the Krasikov–Lagarias exponent program in a way I had not seen stated before. All claims verified.

* **An exponent bound can never do this, and the counterexample is one line.**
  `B₀ = ℕ ∖ {2^k}` has `|B₀ ∩ [1,x]| = x − O(log x) = x^{1−o(1)}` with an **infinite** complement
  *(verified at `x = 10⁶`: 999,980 = 10⁶ − 20)*. So even the program's stated endpoint `x^{1−ε}` is
  logically incapable of forcing `E = ∅`. This is not a gap to be closed by a better constant.
* **The complement recursion is exact — and exactly critical.** I verified the underlying bijection
  completely: odd `n ≤ X` ↔ `m = (3n+1)/2` with `m ≡ 2 (mod 3)`, `m ≤ ⌊(3X+1)/2⌋`, both directions, for
  all `X < 4000`. So `E(X) = E(⌊X/2⌋) + E_2^{(1)}(⌊(3X+1)/2⌋)` is an identity, with the 3-adic refinement
  `2s_k(r) ≡ 3r+1 (mod 3^{k+1})` *(verified for `k ≤ 5` against actual integers)*. Scalarizing gives the
  branching factor `F(β) = 2^{−β} + (1/3)(3/2)^β`, and **`F(1) = 1/2 + 1/2 = 1` exactly** — *verified in
  exact rationals*. There is no `q < 1`, so no strong-induction extinction at the endpoint.
* **And `λ = 2` is a hard ceiling, not a target.** `π*_a(2^y a) ≤ 2^y a` caps any bound `c·λ^y`, so
  `λ > 2` is impossible. **The program's best conceivable endpoint sits exactly at the critical point
  where extinction still does not follow.** That is a sharp statement about the whole method.
* **§10 names a domain mismatch I think is the round's most useful observation.** Krasikov–Lagarias
  evaluate at cutoffs `X = 2^y a ≥ a`. A minimal counterexample needs root `a = x_j` and cutoff `X = N < x_j`,
  i.e. `y = log₂(N/x_j) < 0` — and `π*_a(N) = 0` automatically once `a > N`. **The needed region is on the
  other side of the root**, so optimizing the same LP to `λ = 2` never reaches it.
* **What survives is a clean sufficient statement.** The *Marked Coverage Theorem* — if `T^j(N) ≥ N` for
  all `j`, some inverse tree rooted on `N`'s forward orbit crosses below `N` — **implies Collatz outright**
  (both failure modes at once). Its rigidity input is exact: for a minimal exception `Π_{x_j}(N) = 1` for
  every `j`, hence every off-spine sibling has `Π_{s_j}(N) = 0`. I verified the sibling structure:
  `preds(a) = {2a} ∪ {(2a−1)/3 if a ≡ 2 mod 3}` is complete *(a < 20000)*, and for odd `x`,
  `T(x) ≡ 2 (mod 3)` with sibling `s = 2T(x) = 3x+1` *(verified)*.
* **§9 shows why size alone can't force it:** disjoint sibling basins with `s_i ≍ q^i` give convergent
  `Σ1/s_i` *(verified: 2.0, 1.0, 0.5 for `q` = 1.5, 2, 3)*, so "inverse trees are large ⟹ one crosses
  below `N`" is invalid. **Large disjoint sets can all stay above a fixed barrier.**
* **§11 states the right shape of the replacement:** `μ(a) = min(a, μ(preds))` — *I verified this on the
  real inverse tree up to 200,000* — a **min-plus/Boolean** recursion, not an additive one. Krasikov counts
  *how many* branches exist; the missing theorem needs *at least one* branch to land in a prescribed
  interval, simultaneously satisfying `3^{s(w)} | 2^r x_j − C_w` and `0 < 2^r x_j − C_w < 3^{s(w)}N`.
* Failure mode: (a)+(b)+(c)+(d) — a proved impossibility (exponent bounds cannot eliminate exceptions;
  `λ ≤ 2` capacity ceiling; domain mismatch), a sufficient target that is essentially the conjecture, an
  additive theorem aimed at a min-plus question, and a blunt invariant that discards the barrier.

**Placement.** Four refutations in a row (80–83), and this is the one that closes a *named, published
research program* rather than a campaign-invented approach. The finding that `F(1) = 1` exactly, combined
with the capacity ceiling `λ ≤ 2`, means the Krasikov–Lagarias exponent can at best reach the critical
point — the program is not merely unfinished but **provably cannot conclude**, independent of any future
numerical improvement. Its §11 min-plus recursion is also the same shape as round 79's "unbounded rank"
and round 80's `v₂(x+1)` counter: the campaign has now identified, from four unrelated directions, that
the missing object is a **well-founded rank on marked states**, not a counting estimate.

## Round 84 — approach 79, An exact self-similarity equation for the exceptional set

`round-84-output.md`, 18795 chars, 60m. Not a proof — **fifth consecutive refutation** — and it produces
a genuinely elegant impossibility theorem plus a **fourth independent derivation of the campaign constant**.

* **The set equation is exact, and the round is careful about a trap.** `E = 2E ⊍ P(E₂)` with
  `P(m) = (2m−1)/3`, equivalently `1_E(2q) = 1_E(q)` and `1_E(2q+1) = 1_E(3q+2)` *(both verified for
  `q < 30000`, along with the full preimage structure)*. It then explicitly flags the **tempting but false**
  replacement `E = 2E ⊍ (6E+4)`, which would need "`3q+2 ∈ E ⟹ q ∈ E`" — not a consequence of invariance —
  and which would give an immediate but bogus least-element proof. Naming the trap is worth as much as the
  identity.
* **Iterated form is exact and I checked it end to end.** `C_ε = Σ ε_j2^j3^{s−s_{j+1}}` with
  `2^kT^k(n) = 3^s n + C_ε` *(verified, `n < 3000`, `k ≤ 13`)*, and the inverse branch
  `L_ε(y) = (2^k y − C_ε)/3^s` is integral **exactly** when `y ≡ 2^{−k}C_ε (mod 3^s)` *(verified)*. This is
  the campaign's three-way split stated cleanly: **2-adic start cylinder, 3-adic endpoint cylinder,
  Archimedean descent.**
* **Theorem 7.1 is the round's best result — an adelic obstruction, and the proof is pretty.** In
  `𝔸 = ℤ₂ × ℤ₃`, the point `g = (−1, 0)` lies in **no** eventual-descent affine cylinder. At the 2-adic
  coordinate `−1` every forward step is odd (`T(−1) = −1`), giving `α₀ = (3/2)^a`, `β₀ = α₀ − 1`; then two
  invariants survive every admissible inverse word: `M_j ≥ 2^j3^{a−j}` (so `β ≥ 0`) and `h = α − β ≥ 1`,
  whence `α ≥ 1` always — **no strict descent is possible**. *I verified all of this in exact rationals:
  `a ≤ 11`, 300 random admissible `D`/`P` words each, `β ≥ 0`, `h ≥ 1`, `α ≥ 1` throughout, plus the key
  inequality `3^d − 2^{d−1} ≥ 3^{d−1}`.* Since finitely many clopen cylinders covering the integers would
  have to contain all of `𝔸`, **no finite family of affine congruence-descent rules can work.**
* **§10 rederives our constant from a completely new angle.** Contraction needs `s/k > ρ = log2/log3`, but
  the 3-adic admissibility measure is `3^{−s}`, so the exponential rate is `H(p) − p·log3`, whose positive
  root is `p* = 0.6090897679` — *strictly below* `ρ` — and at `p = ρ` the rate is
  **`−0.0346881852`** *(all three constants verified to 10 decimals)*. **That is exactly the campaign
  constant `0.0346881852` nats/shortcut-step, now obtained a fourth independent way** (entropy of inverse
  words against 3-adic measure). Inverse-tree counting is provably working past its own entropy threshold.
* **The `20 mod 27` chain is verified concretely:** `27q+20 →P 18q+13 →D 36q+26 →P 24q+17 = (8y−7)/9 < y`,
  a genuine `T`-preimage chain for all `q < 5000`. But minimality only gives `y ≥ (9e+7)/8` — **descent
  relative to the hit value, not to the global minimum `e`.** That one sentence is the cleanest statement
  of why sufficient-set theorems don't close.
* Failure mode: (a)+(b)+(d) — a proved impossibility for every finite affine-cylinder program, a
  replacement (two-ended synchronization) that is essentially the conjecture, and blunt invariants
  (`X^{0.84}` growth is compatible with a sparse `E`; inverse-only contraction is past the entropy wall).
* **One claim I could not check:** §8's depth-20 enumeration (8,132,953 states, 2,148,716 cylinders,
  uncovered cell `n ≡ 27 mod 2^20`, `n ≡ 0 mod 3^20`). The cited sandbox files are unreachable and the
  search is far beyond a quick reproduction — **recorded as unconfirmed.** It is not load-bearing: Theorem
  7.1 already proves finite coverage impossible.

**Placement.** Five refutations in a row (80–84), and this one is the most structurally satisfying: the
obstruction is a *single adelic point*, `(−1, 0)`, which is the same `2^Lq − 1 → −1` shadow that killed
round 80 and the same negative-orbit shadow that killed round 81 — now promoted from countermodel to
proof device. Together with round 83's `F(1) = 1` criticality and round 82's `2.25965k` counting barrier,
the campaign now has **four different proofs that finite/counting methods cannot close**, and the constant
`0.0346881852` has surfaced from four unrelated derivations. The surviving target is unchanged:
two-ended synchronization of a forward 2-adic cylinder, an inverse 3-adic integrality cylinder, and a
strict Archimedean inequality for one fixed record-minimal integer.

## Round 85 — approach 80, Uniformize Tao's transport theorem over every cylinder

`round-85-output.md`, 18740 chars, 41m 5s. Not a proof — **sixth consecutive refutation** — but it is the
cleanest *positive* round in a while: two of its three advertised advances are **exact identities, not
approximations**, and I verified both. It then locates the failure at an information-theoretic frontier and
proves the requested upgrade is *false* in one form and *equivalent to Collatz* in the other.

* **Lemma 1 is exact and verified.** For the Syracuse map `S(N) = (3N+1)/2^{v₂(3N+1)}`, every valuation
  cylinder `C(b)` is **exactly one odd residue class mod `2^{B+1}`**, cut out by `3^r N + K_b ≡ 2^B
  (mod 2^{B+1})` with `K_b = Σ 3^{r−j}2^{B_{j−1}}`. *Verified for all odd `N < 200000`, `r ≤ 4`: the
  congruence holds, the class is unique and odd, and the converse holds — every odd `N` in the class really
  has prefix `b`.*
* **Theorem 2 — exact regeneration.** `N = N_b + 2^{B+1}t ⟹ S^r(N) = M_b + 2·3^r t`. *Verified over 4000
  random base points, `r ≤ 6`, `t` from −3 to 39.* Since `3^r` is a `ℤ₂`-automorphism, conditioning on **any**
  finite cylinder carries Haar to Haar: the future valuations are geometric and **exactly independent** of
  the prefix. Not approximate mixing — an identity.
* **§3 — exact prefix erasure.** `S^{r+n}(N) = 3^n2^{−C}S^r(N) + F_n(c)` with `F_n(c) = Σ 3^{n−j}2^{−(c_j+⋯+c_n)}`,
  hence `S^{r+n}(N) ≡ F_n(c) (mod 3^n)`: **the terminal 3-adic residue depends only on the last `n`
  valuations** — not on the prefix, not on `N`, not on `S^r(N)`. *Verified in exact rationals (3000 random
  cases), and separately by grouping: 3516 distinct tail words, each giving one and only one residue
  mod `3^n` no matter which prefix produced it.*
* **The entropy frontier is the real content.** Transport survives exactly while
  `B + (2+c₀)n ≤ (1−η)log₂Y` — prefix bits consumed plus future valuation bits must fit inside the initial
  randomness. *I checked the underlying harmonic-sum estimate (4.2) numerically: `|Σ_{N≡u (Q)} 1/N − L/Q|·Y
  ≈ 0.51` uniformly in `u`, for `Q` up to 8192 — the claimed `O(1/Y)`.* When `B ≈ log₂Y` there are **no fresh
  bits left**, and on a cylinder holding one integer everything is deterministic.
* **§6 kills the distributional upgrade outright, with explicit atoms.** `U_j = (4^j−1)/3` has `3U_j+1 = 4^j`
  so `S(U_j) = 1`; `V_j = (5·2^{2j+1}−1)/3` has `S(V_j) = 5`. *Verified `j ≤ 39` (both integral, both odd),
  and the first-passage claim re-checked for every `x > 5` up to `10^12`: passage is `1` for `U_j` and `5`
  for `V_j`.* Deep cylinders isolate them, so the conditional passage laws are `δ₁` and `δ₅` — TV distance 2.
  **No single passage distribution can be uniform over all deep cylinders.**
* **§7 is the trap, stated exactly.** Weakening to "escape probability `≥ δ` on every cylinder meeting
  `[Y,2Y]`" **already proves Collatz**: take the least nonconvergent `N` and a cylinder of modulus `> N`;
  it meets `[N,2N]` only at `N`, so the probability is 0. *Verified concretely for `N = 27, 703, 9663,
  77671, 837799` — in each case the deep cylinder's only hit in `[N,2N]` is `N` itself.* So "uniform over
  every cylinder" **conceals the entire pointwise problem** — the single sharpest sentence of the round.
* **§8 is the FIFTH independent appearance of the campaign constant, and it lands on λ directly.**
  `h_* = γlogγ − (γ−1)log(γ−1) = 1.0436328158` with `γ = log₂3`, so **`e^{h_*} = 2.839513730`** — that *is*
  our `λ = 2.8395137305`, here as the growth rate of non-contracting valuation words. The deficit is
  `I_* = log3 − h_* = 0.0549794728`, and **`I_*/γ = 0.0346881852`** — *the campaign constant exactly, to 10
  decimals* (verified; also `#{words} = C(A−1,n−1)`, and the rate `(1/n)log K_n → h_*` checked to
  `n = 1600`). The barrier is then arithmetic: averaged estimates decay like `e^{−0.05498n}` but a **single**
  critical word has mass `2^{−γn} = 3^{−n} = e^{−1.09861n}`. *Verified `2^{−γn} = 3^{−n}` identically.*
  An average theorem must beat one atom by a factor `e^{1.04363n}` — i.e. by `λ^n`. **The gap is λ itself.**
* Failure mode: (a)+(b)+(d) — a genuine information-theoretic obstruction, a proposed strengthening that is
  a restatement of Collatz (§7), and blunt invariants (TV/Fourier averages against single-atom mass).
* §9's proposed finish is honest but circular-adjacent: (9.3) `Σ_{c∈E_L(s)} 2^{−|c|} < 2^{−K(s)}3^{−L}`
  forces `E_L(s) = ∅` **trivially** (*verified: one retained word already exceeds the RHS*), so the entire
  content is hidden in proving that inequality — which is exactly the `Σ + h_max < 0` synchronization the
  campaign has been unable to reach for 20 rounds.

**Placement.** Six refutations in a row (80–85). The value here is that it converts our empirical constant
into a *statement about Tao's method*: `λ = e^{h_*}` is precisely the factor by which any average
equidistribution estimate falls short of excluding one critical continuation. Combined with round 84's
adelic Theorem 7.1 and round 83's `F(1) = 1` criticality, the campaign now has **five derivations of
`0.0346881852`** — geometric, entropic, 3-adic, adelic, and now as Tao's own aggregate-vs-atom gap — and
**five proofs that averaging/counting methods cannot close.** The surviving target is unchanged and this
round names it in Tao's language: a **support-level (max-norm) theorem on the exact carry-and-surplus
survivor fibers**, not another `L¹`/TV/Fourier improvement.

## Round 86 — approach 81, Replicate one counterexample into many

`round-86-output.md`, 12387 chars, 33m 2s. Not a proof — **seventh consecutive refutation** — and this one
is the campaign's cleanest example of a *category error* being caught: the approach's final implication is
not merely unproved, it is **false**.

* **The killing observation, and it is one sentence.** Tao's exceptional set is defined by the **orbit
  minimum** `Col_min`, not by "reaches 1". If `n` is the least counterexample, then **every** integer whose
  orbit reaches `n` has `Col_min = m` exactly `n` — so every inverse ancestor of `n` is counted among Tao's
  *good* integers as soon as `f(m) > n`. *I verified the mechanism on real basins: **28.3 million ancestors**
  across roots 7, 11, 41, 97 (6.78M / 15.32M / 4.36M / 1.88M), every one of them attaining its root.*
  Therefore `A(n) ∩ {Col_min ≥ f}` is **finite**, and this stays true even if `d_log A(n) = 1`. The proposed
  implication "many nonconvergent starts ⟹ many exceptions to Tao" is simply invalid.
* **The cycle case is worse: absolutely compatible.** If `n` sits in a nontrivial cycle, the whole basin has
  `Col_min = n`, so **Tao's theorem is compatible with a nontrivial cycle whose basin has logarithmic
  density 1.** Inverse replication can therefore never exclude a cycle; a separate cycle-exclusion theorem
  is indispensable. This is the sharpest statement of Tao's limits the campaign has produced.
* **§5 is a genuine new computation, and it checks out exactly.** For the accelerated odd map
  `U(y) = (3y+1)/2^{v₂(3y+1)}`, upward inverse branches are `φ_a(x) = (2^a x−1)/3` with `a ≥ 2`; branches
  landing on a multiple of 3 are terminal (`3 ∤ U(z)` always — *verified*). Since `ord₉(2) = 6`, the
  branching mass `σ_r = Σ 3/2^a` depends only on `r = x mod 9`, giving

  | `r` | 1 | 2 | 4 | 5 | 7 | 8 |
  |---|---|---|---|---|---|---|
  | `σ_r` | `20/21` | `17/42` | `17/21` | `10/21` | `5/21` | `5/42` |

  *All six entries reproduced exactly in closed form (summing the `a mod 6` classes with the `64/63` factor),
  and cross-checked on real `x` by bracketing partial sums against a rational tail bound.* Hence
  **`max_r σ_r = 20/21 < 1`**.
* **The `C ≥ 6` threshold is sharp — I checked, and it is not an arbitrary constant.** With
  `q_C = (1−1/(4C))^{−1}` and `ρ_C = (20/21)q_C`: `ρ_4 = 64/63 > 1`, **`ρ_5 = 400/399 > 1`**,
  `ρ_6 = 160/161 < 1`. So the monotone-tree contraction begins *exactly* at 6. *The per-generation
  contraction `W_{k+1} ≤ ρ_C W_k` also holds on the real tree (roots 7, 11, 25, 1001; observed ratios
  0.24–0.86 against `ρ_C ≈ 0.95–0.99`), with total mass well under the closed-form bound
  `(1/x)(1 + q_C/(1−ρ_C))`.*
* **Monotone inverse-replication theorem.** The upward-only inverse tree from any odd `x ≥ 6`, `3∤x`, has
  **finite harmonic mass**, hence logarithmic density zero (even starts only multiply by 2). So the natural
  construction — grow a big inverse tree never descending below the merge point — is **provably too thin**.
  This is a real theorem and it is ours to keep.
* Failure mode: (a)+(c) — a genuine obstruction plus a theorem aimed at the wrong object; the round's own
  verdict is that the approach "confuses two different sets", `{starts not reaching 1}` vs
  `{starts with Col_min > f(N)}`.
* The salvage is honest but is another restatement: `Collatz ⟸ cycle exclusion + uniform high-tail
  inverse-basin amplification`, where the amplification must beat Tao's `(log C)^{−c}` **uniformly along the
  moving tail of one exceptional orbit**. Krasikov–Lagarias `X^{0.84}` does not touch it: it counts the full
  inverse tree, is root-dependent, and `X^{0.84}` sets can have logarithmic density 0.

**Placement.** Seven refutations in a row (80–86). Its distinct value: every previous round failed on a
*missing estimate*; this one fails on a **misidentified target set**, and the round proves it rather than
guessing. It also hands us `max_r σ_r = 20/21` — a second sharp sub-critical branching constant alongside
round 83's `F(1) = 1` criticality, and the first one that is *strictly* below 1, which is exactly why the
monotone tree dies. Note the contrast with round 82: inverse-tree coverage is too thin under the
*logarithmic* measure even when it is `X^{0.84}` under counting measure. The surviving target is unchanged.

## Round 87 — approach 82, Uniform large deviations for realizable paths

`round-87-output.md`, 17405 chars, 38m 26s. Not a proof — **eighth consecutive refutation** — and it is the
round that finally **unifies the campaign's two constants**: they are the same Chernoff exponent written in
the two encodings.

* **Theorem 1 — exact conditional parity uniformity, and it is exact.** Every length-`L` parity word is
  realized by exactly **one** residue class mod `2^L`; and conditional on **any** `r mod 2^m`, the `2^k`
  extensions hit every future block exactly once. *Verified exhaustively: all `2^L` words for `L ≤ 12`, and
  the conditional form for every `r mod 2^m`, `m ≤ 4`, `k ≤ 5`.* The mechanism is
  `T^L(r+2^L) − T^L(r) = 3^{s_L}`, which is **odd**, so the two lifts always split the next bit — *checked
  for every `r`, `L ≤ 12`, no exceptions.*
* **So there is no "realizable path" restriction at all.** `{finite realizable parity words} = {0,1}^k`,
  even after conditioning. The approach's premise — that realizable paths are a thin subset — is **empty**;
  they are the full binary shift. That is the round's killing observation and it is a one-liner.
* **THE UNIFICATION — the campaign's two constants are one.** `I₀ = D(log2/log3 ‖ ½) = 0.03468818523201744`
  (matched to **17 decimals**), and the Syracuse rate `J(β₀) = 0.05497947281` at `β₀ = log₂3`. I verified
  three exact identities:
  - `I₀ = log2 − H(α₀)` — the **exact negative** of round 84's `H(ρ) − ρ·log3`;
  - `J(β₀) = log3 − h_*` — **exactly** round 85's `I_*`;
  - **`J(β₀)/log₂3 = I₀`** — so the shortcut and accelerated-odd constants are the *same* exponent, related
    by the mean shortcut-steps-per-odd-step `log₂3`.

  Also `1 − I₀/log2 = 0.9499555272` (our `log₃λ`) and `2e^{−I₀} = 1.9318131065`. **Five earlier "independent
  derivations" are now revealed as one constant in five costumes** — a real piece of campaign bookkeeping.
* **The gap is quantified brutally.** To empty a union of length-`k` cylinders from measure alone one needs
  an exponent above `log2 = 0.693147`; the sharp exponent is `I₀ = 0.034688`, **twenty times too small**.
  The bound still permits `1.9318^k` bad words (dimension `0.94996`). *Exact binomial tails confirm the rate
  converges to `I₀` (`k` to 2000), so no Chernoff improvement exists.*
* **§6's model of the failure is exactly our standing countermodel.** `C_k = {first k bits all 1}` has Haar
  measure `2^{−k} → 0` but `⋂C_k = {−1}`, the 2-adic fixed point `T(−1) = −1`. *Verified.* And the integer
  witnesses are `n_k = 2^k−1` with **`T^j(n_k) = 3^j2^{k−j} − 1`** and `T^j(n_k) − n_k = 2^{k−j}(3^j−2^j) > 0`
  *(verified `k ≤ 59`)* — the same `2^m − 1` family from round 64, now in its sharpest role.
* **§7 adds a second, independent obstruction I had not seen stated this cleanly:** a *contracting*
  coefficient `3^{s_j} < 2^j` still permits `T^j(n) ≥ n` when the affine carry satisfies `c_j ≥ (2^j−3^{s_j})n`.
  *I found real witnesses:* `(n,j) = (7,8), (9,8), (19,8), (25,8), (165,27)` — all with `3^{s_j} < 2^j` yet
  `T^j(n) ≥ n`. So **negative drift does not imply descent**, and the cylinder identity
  `T^j(n)−n = T^j(r_w)−r_w − (2^j−3^q)ℓ` *(verified)* shows only the *large* representatives descend.
* **Theorem 3 is a clean exact equivalence and it is checkable.** With `τ(n) = inf{j ≥ 1 : T^j(n) < n}` and
  `M_k = min{n ≥ 2 : τ(n) > k}`, **Collatz ⟺ `M_k → ∞`**. *I computed it: `M_k = 3,3,3,7,7,7,27,…`, stalling
  at 27 for `k = 7..58` because `τ(27) = 59`, then jumping to `M_59 = 703`.* Nondecreasing throughout, and
  `M_k ≤ 2^k−1` for `k ≥ 2`. This is the campaign's most concrete restatement of the target so far.
* Failure mode: (a)+(b)+(d) — a genuine measure-vs-support obstruction, a final criterion (`M_k → ∞`) that
  the round itself calls equivalent to Collatz, and blunt invariants (density estimates against one atom).

**Placement.** Eight refutations in a row (80–87). Its lasting value is bookkeeping plus a new obstruction:
the constant unification means we should stop counting `0.0346881852` sightings as independent evidence —
it is **one** Chernoff exponent, and every method that produces it is measuring the same thing. Meanwhile
§7's carry-rescue witnesses are new and show the target is genuinely two-dimensional: even a proof
controlling the drift exponent would not control descent. The surviving target is unchanged, now stated as
`M_k → ∞`, or equivalently `min_{w ∈ W_k} r_w → ∞`.

## Round 88 — approach 83, Deterministic renewal discrepancy

`round-88-output.md`, 20303 chars, **92m 26s — the longest round of the campaign.** Not a proof — ninth
consecutive refutation — but it produces the campaign's **first genuinely new unconditional theorem about
hypothetical divergent orbits**, and every checkable claim passed on the first pass (no FALSEs).

* **Theorem 83.1 is a clean exact Lyapunov identity, and it is ours to keep.** With `D_j = 2j − A_j` and
  `Y_j = 2^{A_j−2j}n_j`:
  `Y_{j+1} = Y_j(3/4 + 1/(4n_j))` and `Y_j − Y_{j+1} = (n_j−1)/(4·2^{D_j})`.
  *Verified in exact rationals for all odd `n < 4000`, `j ≤ 29`:* `Y_j` is **monotonically nonincreasing**,
  strictly so whenever `n_j > 1`. One line, and it immediately gives **Corollary 83.2:
  `A_j − 2j ≤ log₂ n` unconditionally** *(verified)* — the discrepancy is automatically bounded on one side.
* **Theorem 83.3 — the dichotomy is sharp, with an explicit rate.** Bounded discrepancy `|A_j − 2j| = O_n(1)`
  is **equivalent to Collatz**; and an orbit avoiding 1 satisfies `D_j ≥ γj − log₂(n/3)` with
  **`γ = log₂(6/5) = 0.263034405833794`** *(verified, along with `λ(x) ≥ λ(3) = γ` and the exact identity
  `D_j = log₂(n_j/n) + Σλ(n_i)`)*. **There is no intermediate behavior** — bounded, or linear growth at rate
  `γ`. The quantitative corollary is nice too: a bound `D_j ≤ C` caps the nontrivial steps at `2^{C+1}n`.
* **No uniform constant exists, and the witness is our standing family again.** `n = 2^{r+1}−1` gives
  `n_i = 3^i2^{r+1−i} − 1`, all valuations 1, so `A_r = r` and `D_r = r`. *Verified `r ≤ 59`.* So
  `C(n) ≥ log₂(n+1) − 1` — even **under** Collatz there is no absolute discrepancy constant.
* **THE NEW RESULT — Theorem 83.7, summable critical escape.** For a hypothetical divergent orbit,
  **`Σ_j 2^{−(αj−A_j)} < ∞`**, hence `R_j = αj − A_j → +∞`, and in shortcut time `Σ_k 3^{−e_k} < ∞`. The
  mechanism is `H_j = 2^{A_j}n_j/3^j`, which satisfies `H_{j+1} = H_j(1 + 1/(3n_j))` and therefore converges;
  the summands are exactly `H_j/n_j`. *I verified the whole chain in exact rationals: `H` recursion, the
  closed form `H_j = n + Σ2^{A_i}/3^{i+1}`, and the key identity `2^{−R_j} = 2^{A_j}/3^j = H_j/n_j`.*
  This is **strictly stronger than `R_j → ∞`** and yields **Corollary 83.8: no divergent orbit can have
  `|A_j − αj| = O(1)`** — so a critical **Sturmian/Christoffel ray `A_j = ⌊αj + φ⌋` is impossible**. Also
  Corollary 83.9: `#{j : R_j ≤ L} ≤ 2^L S(n)` — a divergent orbit visits each critical strip finitely often.
* **Caveat, and it is the load-bearing one:** Theorem 83.7 rests entirely on the cited **Garcia–Tal uniform
  sublinear orbit-counting bound** `#(O ∩ [x,x+X)) ≪ X^{1−η}log(2X)` (83.21), which I could not verify here.
  The summability is exactly as strong as that citation. **Recorded as a literature dependency.**
* **Prop 83.5 restates round 87's finding in the accelerated encoding:** each valuation word is exactly one
  odd class mod `2^{A_r+1}`, via `U^r(n_0 + t2^{A+1}) = U^r(n_0) + 2·3^r t` *(both verified)*. So no finite
  list of forbidden blocks can work — the proof must use that all prefixes come from **one** seed.
* **§9 states the remaining gap more precisely than any prior round.** With `ρ_{k+1} = ρ_k + b_k2^k`, a fixed
  positive seed forces `b_k = 0` eventually; Missing Lemma 83.11 asks that summable escape force infinitely
  many `b_k = 1`. The obstruction is displayed exactly: `n + Ξ_k = 2^k x_k/3^{s_k}` *(verified in exact
  rationals)* converges to a **finite positive real** while converging **2-adically to `−n`** — and nothing
  couples the two completions. That is the synchronization gap, now with a name and an identity.
* §10 closes the cycle branch by the same discrepancy: `2^A = Π(3 + 1/n_i)` with `n_i ≥ 3` forces
  `αr < A < 2r` *(verified)*, so `D_j → ∞` on any nontrivial cycle too.
* Failure mode: (a)+(b) — a genuine cross-completion obstruction plus a criterion the round itself proves
  **equivalent** to Collatz. Note the honesty: the round's own verdict is that bounded renewal discrepancy
  "is not an intermediate lemma; it is an exact reformulation."

**Placement.** Nine refutations in a row (80–88), but this is the **most valuable refutation so far**.
Everything before either restated the problem or proved a method class impossible; this one *adds theorems*:
the exact `Y_j` Lyapunov monotonicity, the sharp `γ = log₂(6/5)` dichotomy, and — conditional on Garcia–Tal
— an unconditional constraint on any divergent orbit strong enough to **kill the critical Sturmian ray**,
a countermodel class we had not previously excluded. The constant `I(α) = 0.054979472810817` appears yet
again, consistent with round 87's unification (it is `J(β₀)`, not a new sighting). The target is unchanged
but now sharpest as Lemma 83.11.

## Round 89 — approach 84, Benford rigidity for every infinite orbit

`round-89-output.md`, 20096 chars, 54m 50s. Not a proof — tenth consecutive refutation — but like round 88
it **adds a theorem**, and every checkable claim passed on the first pass. Its slogan is the sharpest
one-line diagnosis the campaign has produced: **Benford controls the top bits; descent is decided by the
bottom bits.**

* **Theorem 1 is a real pointwise result.** Every non-eventually-periodic positive orbit of the accelerated
  map is **strongly binary Benford** — `{log₂ n_j}` is u.d. mod 1 — *for every such orbit*, not almost all
  seeds. The mechanism: `log₂n_{j+1} = log₂n_j + α − a_j + δ_j` with `δ_j = log₂(1 + 1/(3n_j)) → 0`
  *(verified)*, so mod 1 the integer `a_j` **vanishes** and the phase is an asymptotic irrational rotation
  by `α = log₂3`. Weyl + a ratio lemma finish it. This beats Lagarias–Soundararajan (finite horizon,
  almost every seed) and Kontorovich–Miller (double limit) in *pointwise-ness*.
* **And this is exactly why the approach dies.** Benford is not a randomness property a divergent orbit
  would struggle to satisfy — it is an **automatic consequence of the recurrence**. Theorem 2 makes it
  worse: the finite-lag joining is supported on the rotation curve `(x, x+α, …, x+rα)`, so consecutive
  significands are **rigid, not mixing** — treating Benford digits as independent randomness is invalid.
* **The exact carries *cause* the Benford law.** With `2^{A_j}n_j = 3^jn_0 + C_j`, `C_{j+1} = 3C_j + 2^{A_j}`
  and `H_j = n_0 + C_j/3^j`: **`log₂H_{j+1} − log₂H_j = δ_j → 0`** *(all verified in exact rationals)*. So
  `θ_j = {jα + log₂H_j}` — the carry is the slowly varying phase correction, not an obstruction. When
  `Σ1/q_j < ∞`, `H_j → H_∞` and `θ_j = {jα + log₂H_∞ + o(1)}`: **the canonical Benford form.** Sustained
  growth and Benford behavior are *naturally compatible*.
* **Theorem 3 — the killer family, fully verified, `K ≤ 39`.** `N_K = 2^{3K+1} − 5` has valuation word
  exactly `(1,2)^K`, with `n_{2t} = 2^{3(K−t)+1}9^t − 5` and `n_{2t+1} = 3·2^{3(K−t)}9^t − 7`;
  `q_{2t} = (9/8)^t`, `q_{2t+1} = (3/2)(9/8)^t`, so **`q_j ≥ 1` at every prefix**, and **every iterate after
  `n_0` exceeds `n_0`**. Terminal `n_{2K} = 2·9^K − 5 ≡ 5 mod 8` with `v₂ ≥ 3` — that is what finally breaks
  the growth. Worked example verified: **`123 → 185 → 139 → 209 → 157`**, valuations `1,2,1,2`, all above
  123. So arbitrarily long exact positive-integer segments are simultaneously growing, carry-compatible,
  **and asymptotically Benford**. The proposed contradiction simply does not exist.
* **This is our `(1,2)^∞` countermodel (rounds 60–61), now with the seed formula and the exact shadow.**
  `N_K ≡ −5 mod 2^{3K+1}` *(verified)*, so the family converges 2-adically to `−5`, and `(1,2)^∞` is the
  **negative cycle `−5 → −7 → −5`** *(verified)*. The two-step map is `x ↦ (9x+5)/8` with
  `x_{2t} + 5 = (9/8)^t(x_0+5)` *(verified)* — real growth at rate `log₂(9/8)`, irrational, hence Benford.
  Same shape as round 81's `9^{j+1}8^{N−j} − 7` shadowing `−7 → −10 → −5`.
* **§8's three-bit criterion (BR8) is a genuinely new narrow target.** Since
  `a(n) ≥ 1 + 1{n≡1 mod 4} + 1{n≡5 mod 8}` *(verified for odd `n < 200000`, along with the exact indicator
  expansion)*, `A_N/N ≥ 1 + p₁ + 2p₅`. So **`liminf(p₁ + 2p₅) > log₂(3/2)` excludes every divergent orbit.**
  Uniformity mod 8 would give `3/4 > 0.5850` and mean valuation `≥ 7/4 > log₂3`, margin
  `7/4 − log₂3 = 0.16503749…`. **Mod 4 alone gives only `3/2 < log₂3` — so mod 8 is the first level that
  works** *(verified)*, a sharp and useful fact.
* **And the family shows precisely how (BR8) is evaded.** *I measured it:* on the `N_K` prefix,
  **`p₁ = 0.5000`, `p₅ = 0.0000`, so `p₁ + 2p₅ = 0.5000 < 0.5850`** — at `K = 10, 20, 40` alike. The orbit
  lives in `3 mod 8` and `1 mod 8` and **never enters `5 mod 8`** until the terminal step. That is the
  obstruction, exhibited numerically.
* Failure mode: (c)+(d) — a theorem aimed at the wrong object (top bits vs bottom bits) and a blunt
  invariant (Benford frequencies are neutral: `(1/N)Σb_j → α` exactly, the neutral multiplicative rate).
* §9 is honest about the remaining debt: (BR8) would kill divergence only; cycles need a separate theorem
  since a cycle satisfies `A_m > mα` with `A_m − mα = Σlog₂(1 + 1/(3n_j)) > 0` *(verified)* and needs no
  equidistribution at all.
* **Literature dependency flagged:** Rhin's `‖hα‖ ≫ h^{−7.616}`, which yields the every-orbit discrepancy
  bound `D_N ≪ (log 2N / N)^{1/9.616}`. Theorem 1 itself is independent of it.

**Placement.** Ten refutations in a row (80–89). Rounds 88 and 89 form a matched pair and are the two best
of the streak: 88 constrains a divergent orbit's *renewal surplus*, 89 proves its *significand law* — and
both conclude that the decisive information sits where their method cannot see. The new assets are
Theorem 1 (pointwise Benford, ours), the fully explicit `(1,2)^K` seed family `2^{3K+1} − 5` with its `−5`
2-adic shadow, and the **mod-8 criterion with the sharp observation that mod 4 is too weak**. The target is
unchanged; (BR8) is now the narrowest published form of the divergence half.

## Round 90 — approach 85, Rigorous renormalization of stopping-time distributions

`round-90-output.md`, 18199 chars, 31m 48s. Not a proof — eleventh consecutive refutation — and it names
the campaign's recurring fallacy in four words: **zero density ⇏ empty set.** Every checkable claim passed,
and two of my own checks turned up things the round did not state.

* **The renormalization is exact and the density law is not heuristic.** With the killed operator `K` on
  `[0,∞)`, `d_k = ‖K^kδ₀‖` is *exactly* the coefficient-survival probability
  `2^{−k}#{words : 3^{S_j} ≥ 2^j ∀j ≤ k}`. *I checked it against the real density over 200,000 integers,
  `k = 1..14`: agreement to `2×10^{−5}` at every `k` (`d₇ = 0.1015625` vs `0.1015555`, etc.).* Negative drift
  `½log(3/4) < 0` then gives `d_k → 0`, i.e. the infinite-stopping set has **natural density zero**.
* **MY CHECK FOUND SOMETHING STRONGER THAN THE ROUND CLAIMED.** Lemma 2 only asserts that
  `{σ > k} △ {κ > k}` is *finite*. *I searched every `n < 10^5` and found **zero** carry-rescued integers —
  `κ(n) = σ(n) exactly`, with no exceptions.* That is Terras's **coefficient stopping time conjecture**,
  still open; the round's weaker finiteness claim is what it can actually prove, and it was right not to
  assume more. Worth recording as a campaign asset: the rescue phenomenon of round 87 §7 is *empirically
  absent* at the first-stopping-time level below `10^5`.
* **Theorem 5 is the whole refutation, and it is three lines.** If `μ_N(E) → 0` and `f, g` agree off `E`,
  then `‖f_#μ_N − g_#μ_N‖_TV ≤ μ_N(E) → 0`. With `μ_N` uniform on `[1,N]` and `E = {n₀}` a **singleton**,
  `μ_N(E) = 1/N`. So the limiting stopping-time law, **every** weak limit, and every continuous
  renormalization of them are *identical* whether `E_∞ = ∅` or `E_∞ = {n₀}`. The proposed final implication
  is not merely unproved — it is **false**.
* **The fixed-point classification kills the intended argument from the other side.** For the killed
  operator the only finite fixed point is `0` (Prop 3); compactifying gives stationary laws
  `qδ_† + (1−q)δ_∞` — **every mixture of stopped and escaping is permitted**. Same for the carry-aware
  affine operator: Theorem 4 gives *exactly* `(1−p)π + pδ_∞`, where `π` is the perpetuity
  `X_∞ = Σ3^{j−1}/2^{A_1+⋯+A_j}` *(verified to converge; contraction verified via
  `E M^α = 3^α/(2^{1+α}−1) < 1` for all `0 < α < 1`, which I confirmed reduces to `t^r < 2t−1` on `1<t<2`)*.
  **An attracting distribution and an escape component coexist perfectly well.**
* **The all-odd path is the cleanest illustration:** `Y_k = k·log(3/2) > 0` forever, yet Bernoulli
  probability zero — a symbolic survivor invisible to every distributional statement *(verified)*.
* **§9's repair is the right shape: full support.** Replace uniform-on-`[1,N]` with `w_n = 2^{−n}` and use
  the exact Perron–Frobenius operator `(Lp)(m) = p(2m) + 1{m≡2 mod 3}p((2m−1)/3)` — *verified to be exactly
  the two `T`-preimages of `m` for all `m < 30000`*. Then **Collatz ⟺ `Z_k → 0`**, a stopping-distribution
  criterion that genuinely detects a singleton. The generating-function form (9.5) is verified to be the
  honest pushforward (exponents are exactly `T(n)`).
* **CROSS-ROUND CONSISTENCY CHECK — and it passes exactly.** §11's criterion `min E_k → ∞` is the *same
  sequence* as round 87's `M_k`. *I recomputed it independently from this round's definition:
  `3,3,3,7,7,7,27,27,…`, stalling at 27 through `k = 58` (since `σ(27) = 59`), then jumping to `703`.*
  **Two different rounds, two different framings, identical sequence** — a real check on both.
* Failure mode: (b)+(d) — the final criterion is proved equivalent to Collatz, and the invariant (a
  density-limit law) is blind to the object it must see.

**Placement.** Eleven refutations in a row (80–90). This one's contribution is *diagnostic precision*: it
supplies the general theorem (Theorem 5) explaining why **every** density/almost-all method in the campaign
failed the same way, including rounds 85, 87 and 89 — the invariant is a limit of measures that assign
`O(1/N)` to any fixed integer. The prescription — full-support weights, atomic iterates, support-edge
control — is the same conclusion rounds 85 and 88 reached from transport and renewal. The target is
unchanged and now has a third equivalent form: `min E_k → ∞`, matching round 87's `M_k → ∞`.

## Round 91 — approach 86, Cycle-word enumeration plus LLL

`round-91-output.md`, 19279 chars, 39m 55s. Not a proof — twelfth consecutive refutation — but it is the
**most precisely diagnosed** of the streak: two collapse theorems that say exactly what LLL can and cannot
see, and it engages our own cycle manuscript directly. Every checkable claim passed.

* **Two collapse theorems, and together they are the whole diagnosis.**
  - **Theorem 2 (Archimedean).** Eliminating the endpoint potentials `log x_i` from any combination of the
    `r` block relations forces **all coefficients equal** — the block graph is one directed cycle, so it has
    one independent closed direction. **Splitting a cycle into `r` blocks creates NO new logarithmic
    relations.** Everything projects to the single pair `(A, J)`; two different words with the same totals
    give LLL *identical* input.
  - **Theorem 3 (integral).** `SNF(M_w) = diag(1,…,1,D_w)` with `D_w = 2^A − 3^J`. *I verified this on 60
    random words (`r ≤ 5`) by exact Bareiss determinants: `|det M_w| = |2^A − 3^J|` and the gcd of all
    `(r−1)`-minors is `1`.* So `ℤ^r/M_wℤ^r ≅ ℤ/D_wℤ` — **one** cyclic obstruction, not `r`. And it is
    explicitly `S_w`: *verified `λᵀM_w = D_w e_0ᵀ` for 200 random words.*
  
  **Conclusion: Archimedean info = one linear form `A log2 − J log3`; integral info = one residue
  `S_w mod (2^A − 3^J)`. LLL sees only the first. All word-order information lives in the second.**
* **The exact cycle criterion is confirmed end to end.** The block equation
  `2^{a_i}x_{i+1} = 3^{j_i}x_i + 3^{j_i} − 2^{j_i}` *(verified on real orbits, odd `n < 40000`)* telescopes
  to `D_w x_0 = S_w`, and `D_w | S_w` ⟺ the word closes. *I verified the converse constructively: for 4000
  random words with `D_w | S_w`, `x_0 = S_w/D_w` really does run the word and return to itself.* Exhaustive
  search over `j, ℓ ∈ [1,5]`, `r ≤ 3` yields **`x_0 = 1` and nothing else.**
* **The arithmetic in §2 and §8 is exact — I checked it at 80-digit precision.**
  - Interval width at `B = 2^71`: computed `2.036683720788903354635671…e−22` vs the round's
    `2.0366837207889033546e−22` — **agrees to all 20 digits quoted.**
  - **`(A₀, J₀) = (114208327604, 72057431991)` really is the least-denominator rational in
    `(δ, δ+width)`** — I ran an independent Stern–Brocot "simplest fraction in an interval" search and it
    returned exactly that pair.
  - LLL basis (12): `u₂ = 69314718055994530941723`, `u₃ = 109861228866810969139525` both reproduce
    `round(Q·ln 2)`, `round(Q·ln 3)` at `Q = 10^23`, and **both rows satisfy `−A·u₂ + J·u₃ = z`** exactly.
    Row 2 *is* `(A₀, J₀)`; row 1 gives a closer upper approximation. **LLL recovers the candidates rather
    than excluding them** — as it must, since rank-2 reduction *is* continued fractions and `log₂3` is
    irrational, so there are infinitely many one-sided convergents.
  - `1/(2^{A₀/J₀} − 3) = 4.3584872097954309532e21 < 2^72` ✓; the parity-class count
    `log₂[C(A₀,J₀)/A₀] = 108492832002.98157` ✓ (I reproduced it to 3 decimals via lgamma); our own sieve's
    `2483007077973438304 < 2^62` ✓.
* **§10 is the structural sentence worth keeping: "cycle closure creates the near-relation; divergence does
  not."** In `A_n log2 − J_n log3 + log x_n − log x_0 = Σε_i`, a cycle kills the endpoint term; an unbounded
  orbit lets `log x_n − log x_0` **absorb the entire discrepancy**. So the LLL input is *absent* for the
  divergence half — this method cannot even be aimed at it.
* Failure mode: (a)+(c) — a proved structural collapse (LLL is blind to `P_w` after projection) plus a
  method aimed at only half the problem. The round is explicit that a full proof needs **two** unproved
  inserts: the uniform sparse-carry gcd bound and "every positive orbit is bounded."
* **The named remaining target is sharp:** `gcd(2^A − 3^J, P_w(2,3)) ≤ (2^A − 3^J)^{1−η}` uniformly over
  primitive words — a *moving-sparsity* `S`-unit statement, since the number of terms `r` grows. Fixed-`r`
  methods (Simons–de Weger) are effective; nothing here is uniform in `r`. The proper-power reduction
  `S_{v^q}/(2^{qa} − 3^{qj}) = S_v/(2^a − 3^j)` *(verified)* correctly restricts attention to primitive words.
* **Literature dependencies flagged, not verified:** Simons–de Weger `J < 1.4784·r·δ^r`; the published
  `r ≤ 91` exclusion; and a June 2026 preprint claiming `r ≤ 95` — the round itself notes that preprint's
  record shows no acceptance date, which is the right caution.

**Placement.** Twelve refutations in a row (80–91). This is the first of the streak to engage our **own**
cycle manuscript, and it validates that work's numbers (`(A₀,J₀)`, the `2^62` sieve) while explaining why
they cannot be pushed further by lattice methods: **the sieve lives in the one place LLL provably cannot
look.** Also note the honest methodological point the round makes and that we should adopt: *an LLL-reduced
basis is not an exclusion certificate* — complete short-vector enumeration or the exact rank-2
continued-fraction description is required. The campaign's target is unchanged; the cycle half now has a
crisp named obstruction (uniform sparse-carry gcd), and the divergence half is untouched by this method
**by construction**.

## Round 92 — approach 87, Continued fractions for log_2 3

`round-92-output.md`, 15921 chars, **110m 34s — a new campaign record**. Not a proof — thirteenth
consecutive refutation — but it delivers **the best new mathematics of the streak**: a short, clean,
apparently novel coprimality theorem that kills the entire extremal cycle family outright. Every checkable
claim passed.

* **THEOREM 3 (Christoffel coprimality) — the round's real contribution.** For coprime `p, q` with
  `αq < p < 2q`, the Christoffel carry `C*_{p,q} = Σ 3^{q−1−r}2^{⌊pr/q⌋}` satisfies
  **`gcd(C*_{p,q}, 2^p − 3^q) = 1`.**
  *I verified this exhaustively on **3,239 coprime pairs** (`q ≤ 160`) — **zero counterexamples**.* The proof
  is four lines and pretty: pick `uq + vp = 1`, set `t = 2^u3^v mod ℓ`, so `t^q ≡ 2` and `t^p ≡ 3`; the
  residues `s_r = pr − q⌊pr/q⌋` **permute `0…q−1`** *(verified for all coprime `p,q`, `q < 200`)*, so the
  normalized carry collapses to the geometric sum `S = Σt^{−s}`, and `(1−t^{−1})S = 1 − t^{−q} = 2^{−1} ≢ 0`.
  **The extremal carry is a unit mod the denominator, not merely non-divisible.**
* **Corollary 4 kills the whole family.** Non-primitive slopes reduce exactly:
  `C*_{dp₀,dq₀}/(2^{dp₀} − 3^{dq₀}) = C*_{p₀,q₀}/(2^{p₀} − 3^{q₀})` *(verified)*, so integrality would force
  `2^{p₀} − 3^{q₀} = 1` — impossible mod 8 for `q₀ ≥ 2`, and `q₀ = 1` gives the trivial orbit. *I also
  searched every Christoffel word (primitive or not) with `q ≤ 160` for `D | C*`: **none**.*
  **No nontrivial Christoffel valuation word is an integer cycle.**
* **Proposition 2 is the sharp converse, and it is why this is hard.** `D | C₀` ⟹ `x_i = C_i/D` *is* a
  genuine positive odd `U`-cycle with exactly that valuation word. *I verified this constructively on 3000
  random words.* So (DCND) is not a routine congruence check — **any violation is instantly a real cycle**.
* **Proposition 5 extends the kill one step further:** every sufficiently long primitive **one-transposition**
  neighbour of a Christoffel word is excluded, via `t^{s+1} − t + 1 ≡ 0 (mod D)` forcing `D | Res(X^q−2,
  X^{s+1}−X+1)`, then Landau's `M(g) ≤ √3` against a Baker-type `Λ > cq^{−K}`. *I verified the combinatorial
  inputs: increments lie in `{1,2}`, `c_i = 1` forces `s+1 ≤ 2q−p`, and `5/2 − α = 0.915037`.*
* **§6 is an honest and important limitation, and the bound is real.** Extremality bounds the carry from
  above but says nothing about its **residue**: `C(B) = D, 2D, 3D, …` all remain open. And
  `C*/D ≥ q/(6(2^{qδ}−1))` *(verified)* — at convergent scale `δ ≍ q^{−2}` that's **order `q²` positive
  multiples of `D` below the extremal carry.** Excluding the largest numerator excludes one of quadratically
  many.
* **All the numerics check out.** Verification limit `2075·2^60 ≈ 2^{71.02}` ✓; `A/j − α < 2.0102×10^{−22}`
  ✓ (paper: `2.011e−22`); Legendre applies only for `q < 4.9873×10^{10}` ✓ (paper: `4.99e10`) — **a precise
  new limitation: beyond that denominator the interval doesn't even force `A/j` to be a convergent**;
  and `log₂3 = [1;1,1,2,2,3,1,5,2,23]` ✓ exactly.
* **§7's paradoxical segment reproduced exactly:** `7 → 11 → 17 → 26 → 13 → 20 → 10 → 5 → 8`, coefficient
  `3^5/2^8 = 243/256 < 1`, yet it **ends above its start** *(verified)* — the same carry-rescue phenomenon
  round 87 §7 found, now with a named witness.
* Failure mode: (a)+(b) — genuine partial results plus a residual criterion (DCND) that Proposition 2 proves
  **equivalent** to cycle nonexistence, and which anyway leaves the divergence half untouched (§7's (NE)).

**Placement.** Thirteen refutations in a row (80–92), but this one **adds a theorem we did not have**.
Rounds 91 and 92 are a matched pair on the cycle half: 91 proved that lattice methods see only `(A,J)` and
are blind to the carry residue; 92 then attacks that exact residue and **wins on the extremal slice** —
Christoffel words and their one-transposition neighbours are now closed. That is real progress on a
sub-problem, and the `gcd = 1` proof is short enough to be worth keeping in our own manuscript. What
remains is the distributed-defect case, where the `q²`-multiples bound shows why the extremal argument
cannot simply be pushed down. The divergence half is untouched, as in 91, **by construction**.

## Round 93 — approach 88, Uniform local-minimum classification

`round-93-output.md`, 17432 chars, **175m 4s — a new campaign record by a wide margin**. Not a proof —
fourteenth consecutive refutation — and its most valuable content is a **counterexample that bounds
yesterday's round 92 theorem**. Every checkable claim passed.

* **THE CROSS-ROUND FINDING — §8 kills the universal version of round 92's Theorem 3.** Round 92 proved
  `gcd(C*, 2^p − 3^q) = 1` for **Christoffel** words. This round exhibits an explicit primitive word where
  coprimality **fails**: `k = (3,1,1,1)`, `ℓ = (1,1,1,1)` gives `K=6, L=4, A=10`, `D = 2^10 − 3^6 = 295`, and
  `E = 216+288+384+512 = 1400`, so **`gcd(295, 1400) = 5 ≠ 1`**. *All verified exactly, term by term.*
  The word is **primitive** *(verified)* but **not Christoffel** — *I checked its odd-prefix profile against
  the balanced `⌊Kr/A⌋` profile and they differ* (parity word `1110101010`, a run of three at the front) —
  **so it does not contradict round 92, it delimits it.** And this is not a freak: *I measured
  `gcd(D,E) > 1` for **2291 of 17731** random block words — **12.9%**.* Any successful theorem must prove
  only `gcd(D,E) < D`, never `= 1`. That is exactly the "distributed-defect" gap I flagged in round 92.
* **Theorem 1 is a genuine compression and it is exact.** The standard `K`-term cycle numerator collapses to
  an **`m`-term** numerator via the shift `y = n+1`: `E = Σ(2^{ℓ_i}−1)2^{A_i+k_i}3^{K−K_{i+1}}`, with one
  term per **local minimum** instead of one per odd member. The bridge identity is beautiful and I verified
  it on 6000 random block vectors: **`E = S + D`** — so `D | E` and `D | S` are equivalent, and the shifted
  and unshifted formulations agree exactly.
* **Theorem 2 is a clean uniform classification with a constructive converse.** `w` is a positive cycle
  **iff** `D > 0` and `D | E`, with `n₀ = E/D − 1 = S/D`. *Verified constructively over 20,000 random words:
  every divisible case really closes into a cycle with exactly the prescribed blocks — and the only solution
  found was `n₀ = 1`.* Uniform in `m`: no separate computation per `m`.
* **Theorem 4 repeats round 91's collapse in this encoding** — `SNF(M) = diag(1,…,1,D)`, *verified by exact
  Bareiss determinants and full `(m−1)`-minor gcds*. **More local minima do not accumulate obstructions;
  there is exactly one congruence.** That is the structural reason `m → ∞` doesn't self-defeat.
* **Theorem 5 is a real analytic improvement — the `m`-dependence is gone.** Using distinctness of the local
  minima and `X = 2^71`, `0 < A/K − log₂3 = O(log K / K)` with an explicit constant. *I evaluated it: at
  `K = 10^6` the window is `6.4×10^{−22}`.* But the round is honest about why it's not enough, and my numbers
  confirm it starkly: **convergents give errors `~K^{−2}`, which at `K = 10^6` is `10^{−12}` — ten orders of
  magnitude *tighter* than the window.** Infinitely many slopes survive.
* **§6 explains why "find one long block" can never be made uniform.** Setting every `ℓ_i = 1` gives the
  cyclic system `3^{k_i}q_i + 1 = 2^{k_{i+1}+1}q_{i+1}` *(verified on real orbits)* — in accelerated terms
  all valuations lie in `{1,2}`, so arbitrarily long words exist with **no block forced to grow**. This is
  our `(1,2)`-type regime again, now as the obstruction to uniformity.
* **The local congruences are exact:** `v₂(n_i + 1) = k_i` and `n_{i+1} ≡ −2^{−ℓ_i} (mod 3^{k_i})` *(both
  verified)* — each minimum constrained by a power of 2 from the future and a power of 3 from the past,
  always locally CRT-compatible; global synchronization *is* the divisibility.
* Failure mode: (b) — the round proves its own residual criterion (ULMN) **equivalent** to cycle
  nonexistence, and §10 notes the divergence half is untouched since `D | E` exists only because the endpoint
  equals the start.
* **Named target:** a **uniform gcd gap** `gcd(D,E) ≤ C·exp((log3 − η)K)`, which against `D = exp((log3 −
  o(1))K)` would force `gcd < D`. Nothing in continued fractions, sparse resultants, or block classification
  supplies it.

**Placement.** Fourteen refutations in a row (80–93). Rounds 91–93 now form a complete arc on the cycle half:
**91** proved lattice methods see only `(A,K)`; **92** won the extremal slice by coprimality; **93** proves
that win **cannot be universalized** — with an explicit primitive counterexample and a 12.9% empirical rate.
Taken together they pin the cycle problem precisely: the target is `gcd(D,E) < D` uniformly, not `= 1`, and
the `ℓ_i ≡ 1` short-block regime is where any uniform argument must survive. The three rounds also agree on
the divergence half being structurally out of reach for all of them. New assets: the `m`-term compression
`E`, the identity `E = S + D`, and the `O(log K/K)` slope window.

## Round 94 — approach 89, Conditional abc-assisted cycle bounds

`round-94-output.md`, 20783 chars, 42m 46s. Not a proof — fifteenth consecutive refutation — and the
diagnosis is the sharpest one-liner of the cycle arc: **`abc` forces `D_w` to be radical-rich, but a cycle
requires `D_w | C_w`, and `abc` cannot see the second.** All checkable algebra passed.

* **The structural reason `abc` is blind, stated exactly.** The global triple `3^k + (2^A − 3^k) = 2^A`
  depends **only on the totals `(A, k)`** — it is completely insensitive to the *order* of the valuations.
  But `C_w = Σ3^{k−1−t}2^{A_t}` depends on **every prefix sum**. So `abc` constrains the size/radical of the
  gap and nothing about the word. This is the same `(A,K)`-projection blindness round 91 proved for LLL,
  now for a completely different tool — **two independent methods, same blind spot.**
* **§9's tables are exact and I reproduced them cell by cell.** For `A = 5, k = 3`, `D = 5`, the six
  compositions give carries **19, 23, 31, 29, 37, 49** — matching the paper exactly, and **none divisible
  by 5** (residues 4,3,1,4,2,4). Yet `27 + 5 = 32` is a perfectly ordinary `abc` triple: **the arithmetic
  that rules out these words is invisible to it.** For `A = 4, k = 2`, `D = 7`, carries **5, 7, 11**; only
  `(2,2)` divides, giving `x₀ = 1`. *All verified.*
* **The `(2,2,…,2)` family is a genuine infinite `abc`-compatible obstruction.** `C_w = Σ3^{k−1−t}4^t =
  4^k − 3^k = D_w` exactly, so `x₀ = 1` always. *Verified for `k ≤ 39`.* An infinite family of exact closed
  equations fully consistent with `abc` — so primitivity and valuation order must enter somewhere else.
* **The conditional theorems are real, and their inputs check out.** Theorem 2 needs `3^k, D, 2^A` pairwise
  coprime: *verified that `D` is odd, `3 ∤ D`, `gcd(3^k, D) = 1` for all `A < 400`, and
  `rad(3^k·D·2^A) = 6·rad(D)` by exact factorisation for `A < 34`.* Under `abc` this gives
  `rad(D) ≥ κ_ε2^{A/(1+ε)}`, hence `D/rad(D) = D^{o(1)}` — **the cycle gap must be almost squarefree on a
  log scale.** Conditionally kills: perfect-power gaps, gaps with fixed repeated-prime proportion, and
  `P⁺(D) = o(A)` smooth gaps.
* **§6–§8 coprimality machinery all verified on real orbits:** every element coprime to 3; `C_r` odd and
  coprime to 3; `gcd(x₀,C_r) = gcd(x₀,x_r) = g_r`; `u_r,v_r,c_r` pairwise coprime with
  `3^ru_r + c_r = 2^{A_r}v_r`; `gcd(C_r,C_{r+1}) = 1`; and the cut identity
  `C_k = 3^{k−r}C_r + 2^{A_r}S_r`. The analytic chain `Λ ≤ k/(3M)`, `D/2^A = 1 − e^{−Λ} ≤ Λ`,
  `M ≤ k2^A/(3D)` also verified.
* **The round is candid that its own bound is weaker than existing tools.** `abc` yields only
  `Λ ≥ κ_ε2^{−Aε/(1+ε)}` — *exponentially* small — whereas Baker-type linear forms already give
  **polynomial** lower bounds. And `ε = ε(A) → 0` is unavailable since ordinary `abc` gives no control over
  `K_ε`. So this is a **strictly weaker** input than what cycle work already uses.
* **§8 makes a genuinely useful negative observation:** the partial-sum/cut applications are *formally
  weaker* than the global one — the global equation has one uncontrolled radical `rad(D)`, while the cut
  equation introduces **three** (`P_r, Q_r, R_r`). Splitting the carry loses ground.
* **Named target (RGD):** `rad(gcd(D_w, C_w)) ≤ D_w^{1−δ}` — weaker than `gcd < D_w`, since it permits a
  large common divisor from high prime powers and asks only that the *distinct* common primes not account
  for almost all of `D_w`. With `abc` this bounds `A`, giving finitely many cycles (Theorem 9). The
  congruence to be analyzed is explicit: every `p | D_w` has `2^A ≡ 3^k (mod p)`, and a cycle needs each
  such `p` to also satisfy the word-dependent zero-sum `Σ3^{k−1−t}2^{A_t} ≡ 0 (mod p)`.
* **My own independent check:** exhaustive search over the admissible window `αk < A ≤ 2k` for `A ≤ 22`
  (**1,954,208 words**) found **only `x₀ = 1`** — consistent with everything, and a clean sanity check on
  the whole `D | C_w` apparatus.
* Failure mode: (c)+(d) — a theorem aimed at the wrong object (size/radical vs. divisibility) and an
  invariant blind to word order. §12 again separates the divergence half as untouched.

**Placement.** Fifteen refutations in a row (80–94). The cycle arc is now four rounds deep (91–94) and
strikingly coherent: **91** LLL sees only `(A,K)`; **92** wins the extremal slice; **93** shows that win
can't be universalized; **94** shows `abc` — a completely different tool — has *the same* `(A,k)`-projection
blindness. Three separate machineries, one shared blind spot: **the word-order-dependent residue**. The
campaign's cycle target is now unambiguous and has three equivalent namings (uniform sparse-carry gcd gap,
uniform gcd gap for `E`, and RGD), all asking for decorrelation between the power gap and the sparse carry.


## Round 95 — approach 90, Verification through 2^75 or 2^77

`round-95-output.md`, 8,362 chars, 62m 11s. **Not a disproof — sixteenth consecutive refutation — and the
round declares it in its own first line:** the recursive-suffix computation found no counterexample, and
the proposed `2^75` / `2^77` campaigns **were not executed**. This is the campaign's first purely
*computational* approach, and it fails in a genuinely new way: not at a structural seam, but at **honest
resource accounting**.

* **The round states the logical ceiling of its own method, correctly.** A completed run through `2^N`
  establishes only the finite `V_N: ∀ 3 ≤ n < 2^N ∃ k ≥ 1, T^k(n) < n`, and `V_N` is *compatible both with
  Collatz and with a least counterexample ≥ 2^N*. So even a flawless `2^77` run is a **finite verification,
  never a disproof**. Approach 90's own text conceded this ("It would remain finite evidence, not a
  proof"); the round confirms it rather than discovering it.
* **It fixes the only two outputs that would actually disprove:** an exact nontrivial cycle replayable in
  integer arithmetic, or a certificate that a particular orbit never enters the trivial cycle. A timeout,
  an arithmetic cutoff or a large excursion is *only an unresolved case* — and the implementation carries a
  **distinct `unresolved` status** rather than folding it into "counterexample". That discipline is the
  main reason this round produces no false claim.
* **The survivor-count reconciliation is the round's real content, and it checks out.** The independent
  implementation first produced `31,261,175` survivors at `N=35`, exceeding the published `31,109,345` by
  `151,830`. The missing operation was the **endpoint form of the odd-even-even sieve** — a pattern may
  *begin before* the `B`-step look-ahead window and *finish inside* it. Adding that boundary condition
  rejected exactly `151,830` candidates. *Arithmetic verified:* `31,261,175 − 151,830 = 31,109,345`. This
  is a real implementation insight, not a restatement.
* **My own independent checks — the load-bearing identity holds.** The whole recursive-suffix method rests
  on the affine lifting identity `T^k(n₀ + a·2^k) = T^k(n₀) + 3^{f_k(n₀)}·a`. *I verified it exhaustively
  over `327,600` cases* (all `k ≤ 12`, all `n₀ < 2^k`, `a < 40`): **zero mismatches**. *I also verified
  `2^75 = 37,778,931,862,957,161,709,568` exactly*, and *independently confirmed the descent claim below
  `2^20`* — every `3 ≤ n < 2^20` has some `k` with `T^k(n) < n`, no failures, longest descent `183` steps.
* **What I did NOT verify, and the entry should not pretend otherwise:** the published survivor counts at
  `N = 35, 36, 37` (`31,109,345` / `56,414,851` / `106,551,583`), the shard decompositions (`1,168` and
  `278,699`), the claimed `2^32` reference sweep (`4,629,755` continuations, `206,747,016` steps), the
  SHA-256 source/binary/certificate digests, and the cycle-length bound `2,302,268,119,908`. All are
  quoted from the round's own run or its cited sources. **The two citations themselves are unchecked:**
  Barina via Springer for the `2^71` record, and "Angeltveit 2026" (arXiv 2602.10466) for `2^75`/`2^77` as
  future targets — the latter should be confirmed to exist before any of its numbers are reused.
* **The round refuses to overclaim, explicitly.** It cites `2^60` at 24.4 h on an RTX 3060 and roughly
  **one to eight GPU-years for `2^72`**, concludes that `2^75`/`2^77` needs a sustained distributed
  campaign with independent replication, and therefore reports manifests generated but **shards not
  executed**. Its closing self-description — "a fully documented disproof attempt with a reproducible
  finite-verification framework, but not a disproof" — is accurate.
* **Failure mode: none of (a)–(d).** This is a new category for the ledger: an approach that is **sound,
  correctly executed, and simply out of scope** — the method cannot disprove even in principle, and the
  resources bind long before the frontier. Worth distinguishing from the fifteen preceding refutations,
  all of which failed on mathematics rather than on compute.

**Placement.** Sixteenth refutation in a row (80–95), and the first that is *not* a mathematical no-go.
The cycle arc (91–94) closed on a shared blind spot; 95 steps outside it entirely and confirms the
boundary the approach list already suspected — **finite verification is not a disproof front**, and the
`2^75`/`2^77` targets are engineering campaigns, not research leads. Any future computational approach
should be gated on that distinction before it is dispatched.

**Cross-round observation (76 landed: 32 hit the integer-lift seam, 37 restate the problem, 20 aim a theorem at the wrong object, 41 use a blunt invariant, 41 impossibility theorems for whole method classes).** Rounds 6 and 7 fail at the same seam: every construction that is
strong enough to apply a rigidity/vanishing theorem has to drop the ordinary-integer lift, and
every construction that keeps the lift loses the compactness or the invariance the theorem needs.
Round 13 lands on that same seam from thermodynamics, and proves it: no continuous or
summable-variation potential on the shift can separate integer-realizable valuation words from
general 2-adic ones. Six independent formalisms — adelic renormalization (6), ergodic rigidity (7), thermodynamic
formalism (13), arithmetic-dynamical heights (15, asking for "an adelic gluing or synchronization
theorem for affine carry centers"), harmonic analysis (19, asking for "a signed, height-sensitive
synchronization theorem") and tropical geometry (22, which proves its own defining approximation
deletes the residue data) — now fail at the identical point, each with its own proof that the failure
is structural rather than technical. That is the campaign's most robust finding so far.

Rounds 8, 10 and 16 fail the other way: the machinery works and simply reproduces Collatz.
Round 16's restatement is the most informative of the three — its module splits divergent orbits
(free part) from nontrivial cycles (torsion part), so unlike round 10's commutant it at least tells
the two counterexample types apart. Round 8's
polynomial condition IS Collatz coefficient by coefficient; round 10's commutant IS the orbit-class
algebra. Two distinct failure modes are now visible — a genuine obstruction (6, 7) and a hidden
restatement (8, 10) — and the second is the one an unwary round would report as progress. Round 9 adds a third: the
imported theorem is real and applicable, but its conclusion (eventual periodicity) is *satisfied by*
the counterexample class it was meant to exclude, since a cycle's carry stream is automatic in every
base. Worth checking future rounds for the same shape — a rigidity theorem whose conclusion a cycle
already meets cannot rule out cycles. Round 11 adds a fourth: an invariant that is genuinely
nonzero, but for a reason unrelated to the question (negative 2-adic periodic points like `-1`), so
its value carries no information about positive counterexamples.

A second recurrence is now visible alongside the seam: **rounds 9 and 14 both end at the same
place** — even if their machinery worked, it would deliver eventual periodicity or a repeated block,
which yields the cycle equation and still requires an independent exclusion of nontrivial positive
cycles. Any approach whose end state is 'therefore periodic' inherits that debt. Round 27 states it
explicitly as a separate requirement alongside its missing rigidity theorem, which makes three
rounds now carrying the cycle-exclusion debt.

**Backward branches blind three different invariants.** The trivial cycle's backward tree —
doubling chains and other convergent branches — is what makes round 11's cohomology nonzero for
irrelevant reasons, makes every end in round 16 fixed, and in round 21 makes quantum-graph
resonances unable to separate divergence from harmless convergent structure. An invariant computed
on the whole Collatz graph sees that tree first; only invariants that quotient it out can say
anything about counterexamples.

**Finite-depth realizability is free — this keeps killing "integrality" observables.** Round 13
proved no summable-variation potential can see integrality; round 20 shows why in the cleanest form:
every finite accelerated valuation word is *already* realizable by infinitely many positive
integers, so any finite-depth integrality defect is identically zero. Integrality is a property of
infinite words only, which is exactly why finite-window methods cannot detect it.

**`-1` keeps appearing as the obstruction.** Round 11: the dynamical cohomology is nonzero because
of negative 2-adic periodic points such as `-1`, independent of any positive counterexample. Round
18: positive integers shadow the expanding 2-adic fixed point `-1` for arbitrarily long stretches,
which is what destroys uniform contraction of the exact Syracuse operator. Two unrelated formalisms
are being blinded by the same point of the 2-adic completion — worth treating as a structural fact
about 2-adic methods rather than a coincidence.

**The rewriting front is unusually well mapped now.** Three rounds attacked it independently and
their results compose: round 17 collapses the eleven rules to a deterministic ternary map and names
three explicit inequalities that would finish it; round 31 proves any workable order must be
context-sensitive and path-dependent, killing polynomial and cancellable orders; round 32 gets an
explicit sub-ω³ ordinal decreasing on ten of eleven rules and proves the eleventh cannot be fixed by
relabelling, since any full ε₀-ranking induces a pointwise ε₀-ranking of the integers. The residual
difficulty is isolated to a single rule — the odd step — and shown to be irreducible.

**Round 33 supplies the mechanism behind the fixed-window no-gos.** Its precision-loss identity
`v_2(T^t(y) − T^t(x)) = v_2(y − x) − t` shows that multiplying by 3 and right-shifting burns exactly
one 2-adic digit of agreement per step, so any certificate reading a fixed window of digits or
carries runs out of information at a fixed rate — and recording a larger fixed modulus only delays
it. That is one identity explaining rounds 28, 29, 30 and 33 at once.

**Every "carry-blind" certificate class is now closed.** Rounds 28, 29 and 30 kill fixed-window
certificates; round 31 kills polynomial interpretations, labelled polynomial interpretations and all
context-cancellable monoid orders, and proves any workable order must be context-sensitive and
path-dependent. The campaign's negative results converge on a single design rule: **a certificate
that cannot see the carry, along the whole path, cannot work.**

**Arbitrarily long finite excursions are the common killer of bounded-horizon methods.** Round 28
(finite table, bounded horizon K), round 29 (bounded block length, witness `2^L − 1`) and round 30
(finite one-step abstraction, arbitrarily long excursions) are three separate impossibility proofs
with the same root cause. Any method whose certificate is checked over a fixed window is refuted in
advance by this family of results.

**Lyapunov certificates are now closed off three ways**, and one family does most of the work:
`2^L − 1` (all-increasing for L steps) kills the SOS class in round 29, `N_j = 2^{j+1} − 1` kills the
complexity bound in round 23, and the `2^k → 1` chain kills Northcott in round 15. Any future
approach proposing a bounded-horizon decrease should be tested against that family first.

**Modular Lyapunov certificates are closed off twice.** Round 11 killed `V(n) = log n + φ(n)` via the
cohomological route (the gluing H^1 is the wrong one, and the correction cannot exist under any
natural regularity); round 28 kills the same shape directly, proving no finite table φ on Z/MZ with
a bounded horizon K can give strict decrease — for EVERY M, φ and K. Two independent no-gos for the
most-attempted elementary strategy in the whole subject.

**GPT is now refuting approaches by construction, not by argument.** Round 12 exhibits the 5x+1 map
(same boundary K-groups, but it HAS a nontrivial cycle); round 23 exhibits `N_j = 2^{j+1} − 1` (long
positive drift, maximal 3-adic compatibility, O(1) complexity); round 25 constructs hyperfinite
trajectories that are regular in every requested sense yet limit to an aperiodic irrational
rotation. Four approaches are killed by explicit objects rather than by "the gap remains open" —
the strongest form of negative result available, and reusable against any future approach with the
same shape.

**Two targets are now concrete enough to attack directly**, and both came out of rounds that failed:
the adelic gluing/synchronization theorem for affine carry centers (rounds 6, 7, 13, 15, 19, 22
converge on it), round 17's carry-sensitive ordinal rank satisfying three explicit uniform
inequalities for two carry transducers, and round 24's graded linear nilpotence estimate — a
uniformly well-conditioned contracting norm, which that round proves would imply Collatz. Unlike the approaches themselves, these are finite, checkable specifications.

The four modes are worth stating as a checklist for reading any future round: (a) a genuine
obstruction, (b) a hidden restatement of Collatz, (c) a theorem whose conclusion the counterexample
class already satisfies, (d) an invariant blunt enough to fire on irrelevant objects. Only (a) is
progress.

## Round 96 — approach 91, Proof-producing exhaustive verification

`round-96-output.md`, 20,741 chars, 65m 58s. **Not a proof — seventeenth consecutive refutation — and
again the round says so in its own first line** ("I did **not** obtain a valid full proof"). But this is
the strongest *negative* round in a long while, because it does three things the previous sixteen did
not: it states the exact soundness theorem a "repeating finite certificate" must satisfy, it exhibits a
real all-depth computer-assisted theorem in that format, and it then proves that the certificate's
universal closure condition **is an exact equivalent of Collatz**. Failure mode **(b)**, a hidden
restatement — but arrived at by proof rather than by hand-waving.

* **The certificate soundness theorem is correct and is the round's most reusable output.** Five
  conditions — root covers every `n>1`, splits are exact partitions, terminals certified by descent
  `(D)` or merger `(M)`, backedges preserve counterexample-hood, and **every directed cycle strictly
  decreases a well-founded rank** — imply Collatz, by least-counterexample descent. The load-bearing
  clause is the fifth, and the round's own gloss is the lesson: *"Merely recognizing the same
  residue-state again is not enough."* Every "the computation starts repeating, so induct" proposal in
  the approach list is now measured against this.
* **The affine machinery checks out exhaustively.** *I verified identity (1)* — `2^j T^j(n) = 3^{s_j} n
  + C_j` with `C_{j+1} = 3^{e_j}C_j + e_j 2^j` — over **99,975 cases** (all `n < 4000`, `j <= 25`):
  **zero mismatches**. *I verified the all-odd cylinder formula (14)*, `T^j(2^L q - 1) = 3^j 2^{L-j} q -
  1`, over **6,136 cases** (`L <= 13`, `q < 60`, `j <= L`): zero mismatches. *I verified the rank*
  `rho(n) = v2(n+1)` drops by exactly 1 on the odd branch for **all 10,000 odd `n < 20,000`**.
* **The scaling-rank identity (18)-(20) is exact, and I confirmed it symbolically.** For an accelerated
  block `w` of length `r`, exponent `A`, carry `C_w`, with `D_w = 2^A - 3^r`: `Delta_w(F_w(x)) =
  (3^r/2^A)*Delta_w(x)`, so `v2(Delta_w)` falls by `A` per exact repetition and the block can recur
  forever only at `Delta_w(x) = 0`, i.e. an actual cycle. *Checked over exact rationals for `w=(1,1,2)`*
  — `A=4, r=3, C_w=19, F_w(x)=(27x+19)/16, D_w=-11`, formal periodic point `x = -19/11`, all as stated;
  *I also re-derived `C_w=19` from the composition itself*. This is a genuinely compact rank certificate
  for every periodic lasso, and it is the one part of approach 91 that fully works.
* **The all-depth target-1 theorem is real, and its finite arithmetic reproduces bit-for-bit — but it
  is not this round's work and not about Collatz.** *I independently recomputed the exact mass
  certificate*: `sum_{k=0}^{1000} u_k = 10,788,901,977,820,654` — **exact match** — and with the stated
  rational tail `1000/(7*2^30) + 1002/2^1001` the total is `10.788902110866736... < 10.789`, **exactly
  the figure the round reports**, in rationals with no float in the proof path. *I reproduced the seed
  partition over all 100,000 odd `m0 < 200,000`*: **target-1 = 1, cycles = 2, barrier failures = 99,997,
  step-cap survivors = 0**, summing to 100,000 — every count matching, and *the two cycle seeds are
  exactly 5 and 17*, with orbits `5->7->5` and `17->25->37->55->41->61->91->17`. *I brute-forced the
  barrier theorem itself* — conditions (4) `3^r | C_r + 2^{A_r}` and (5) `2^{A_k} < 3^k` forcing all
  `a_i = 1` — over **1,708 qualifying words** (`r <= 10`, exponents <= 4): **zero counterexamples**.
  *Auxiliary claims verified*: `3^61 < 2^97`, `100^100 < 2^97*61^61*39^39` (tight: 664.39 vs 664.91 in
  log2), and `e^10.789 ~ 48,485 < 3^11 = 177,147`.
* **Two caveats that matter more than any of the arithmetic.** (i) The theorem is about the
  **negative / `3x-1` shadow with target 1**, i.e. a *different map* — granting it in full says nothing
  directly about Collatz, and the round is honest that this "proves the all-depth target-1
  negative-shadow theorem, not the Collatz conjecture." (ii) Section 3 is cited to a retained
  ChatGPT-side project file (`fileciteturn23file0`), and **that document is not in this repo** — I
  grepped every round output and every top-level `.tex`/`.md` for the mass bound `10.789` and its exact
  certificate value and found them **only in round 96 itself**. So the round is re-auditing prior
  ChatGPT-workspace work, not repo state; what makes it trustworthy here is that its finite arithmetic
  reproduced independently, above. Serial-mode rounds are supposed to carry nothing between them — GPT's
  own retained project files are a channel the campaign rule does not control, and this is the first
  round where that channel is load-bearing.
* **Section 5 is where approach 91 actually dies, and both no-gos are proved, not asserted.** *5.1*:
  the cylinders `n = -1 (mod 2^K)` survive direct descent at **every** depth, since `T^j(2^L q - 1) -
  (2^L q - 1) = 2^L q[(3/2)^j - 1] > 0` — so **no bounded-depth direct-descent certificate can exist**
  (though the infinite all-odd path is the 2-adic `-1`, not a positive integer, and the rank `v2(n+1)`
  discharges it). *5.2*: for every fixed `K` there are **infinitely many** odd `n` with `M_j(n) = n` for
  all `j <= K`, so bounded equal-depth merger certificates cannot cover the integers either. *I checked
  the two ingredients*: `M_r` is nonincreasing in `r` (the depth-`r` fiber is contained in the
  depth-`r+1` fiber) and `M_0(n) = n`, which is exactly what collapses `M_K(n)=n` down to all `j <= K`.
  *I also verified the unequal-time merger example*: `2^20 - 1 = 1,048,575 -> 1,572,863` in one
  accelerated step, and the **smaller** `m = 736,447` reaches the same endpoint under word
  `(1,1,1,1,1,2,3)` — confirming that "smaller direct predecessor" is strictly weaker than general
  orbit coalescence.
* **5.4 is the real obstruction, and it is a new statement of the seam.** With blocks `P=(1)` and
  `Q=(1,1,2)`, *every* prefix of *every* concatenation — including aperiodic ones — stays inside the
  barrier `2^{A_k} < 3^k`, and every finite prefix is realized by infinitely many positive odd
  integers. So finite unrolling cannot reject the path, the path need not settle into one exact block,
  and the periodic rank `rho_w` **resets whenever the block changes**. The periodic machinery of 5.3 is
  therefore exactly as strong as the path is eventually periodic — and no stronger.
* **The closure condition is an exact restatement, and I confirmed the equivalence both ways.** The
  round's boxed target is `for all n>1 odd, exists r >= 1 : M_r(n) < n` where `M_r(n) = min{m>0 odd :
  U^r(m) = U^r(n)}`. *Forward*: under Collatz, `U^r(n)=1` for some `r` and `M_r(n)=1<n`. *Backward*:
  `M_r(n)=m<n` plus strong induction gives `n -> 1`. So (21) **is** Collatz, and the round's closing
  sentence is precisely right: "Claiming a full proof from the present certificate would amount to
  assuming precisely that missing statement."
* **Unchecked, and flagged as such:** the CSV digest `7cb01f7a...0592a8fa`, the round's three sandbox
  artifacts (not retrievable from here), the `n < 2^71` published bound, and the `citeturn...search`
  references to "Angeltveit 2026" and to mixed binary-ternary rewriting. Same standing caveat as round
  95 — confirm those exist before reusing their numbers.

**Placement.** Seventeenth refutation in a row (80-96). Round 95 showed finite verification is not a
*disproof* front for resource reasons; round 96 shows the *proof* form of the same family fails for a
mathematical reason instead — the certificate is sound, the periodic components genuinely close with
compact ranks, and the residue is precisely the aperiodic integer-lift synchronization that rounds 6,
7, 13, 15, 19 and 22 keep hitting. **The certificate framework converts "verify further" into a
well-posed question and then proves that question is Collatz.** Any future certificate/automated-proof
approach should be dispatched only with a candidate rank for *aperiodic* block sequences already in
hand; without one it will reproduce 96.

**Cross-round observation (77 landed: 32 hit the integer-lift seam, 38 restate the problem, 20 aim a
theorem at the wrong object, 41 use a blunt invariant, 42 impossibility theorems for whole method
classes).** Round 96 lands on both of the campaign's two dominant modes at once, in different
components — the periodic part is a clean impossibility-plus-rank result, the universal part is a
verbatim restatement — which is why it is worth more than its "no proof" headline. It also sharpens
the seam statement: the obstruction is not integer-realizability of a *word* (round 20: finite-depth
realizability is free), but **synchronization of the binary seed, the ternary endpoint, and the
Archimedean order constraint along an aperiodic block sequence**. That is the same object rounds 15
and 19 asked for by other names, now stated in certificate language with a proof that the periodic
case — and only the periodic case — is discharged.

## Round 97 — approach 92, Branch-and-bound search for a divergent exponent word

`round-97-output.md`, 11,392 chars, 61m 4s. **Not a disproof — eighteenth consecutive refutation — and
the round opens by saying so**: the search "found no positive integer with an indefinitely surviving
divergent exponent word," and "claiming a disproof from the finite output would therefore be false."
What it did produce is the campaign's **best-verified computational round to date**: a sharper finite
exclusion, a certified minimum-seed staircase, and — unlike round 95 — a genuine no-go theorem on the
side.

* **The headline finite result.** Every `1 < n < 2^36` violates the all-prefix coefficient barrier by
  step 547: `max_{1<n<2^36} (tau(n) - 1) = 546`, least record seed `n = 12,235,060,455`, exactly two
  seeds surviving to depth 546 and none to 547. Here `tau(n)` is the first `k` with `3^{s_k(n)} <
  2^k`. Equivalently `M_547 >= 2^36`, where `M_K` is the least `n > 1` surviving the barrier through
  depth `K`. This is **not** an extension of the `2^71` convergence verification and the round says so
  — it is the much sharper barrier condition, which is the one actually tied to the divergent-orbit
  alternative.
* **I reproduced the two frontier counts by a completely different method, and both match exactly.**
  The round runs an explicit branch-and-bound tree over seed cylinders; *I instead counted surviving
  parity words by dynamic programming over `(depth, odd-count)`* — no tree, no seed arithmetic. Results:
  **depth-28 barrier cylinders = 3,524,586** and **depth-36 = 527,682,754**, both **exact matches** to
  the round's numbers. Two unrelated algorithms agreeing to the unit on a half-billion-item count is
  the strongest single check any round in this campaign has passed.
* **The record seed's audit is exact in every digit I could test.** *I verified independently*:
  `tau(12,235,060,455) = 547`; `s_546 = 345`; `T^546(n) = 21,481,339,826`; `T^547(n) =
  10,740,669,913` with the odd count still 345; `3^345 > 2^546` and `3^345 < 2^547`. **Both 165-digit
  coefficient gaps reproduce character for character** — `3^345 - 2^546 = 1740758497…9564738979` and
  `2^547 - 3^345 = 5626853655…9818158685`. *Also verified*: the orbit maximum `518,649,180,546,968`
  occurring at shortcut step 346, arrival at 1 after **739** steps, and first descent below the seed at
  step **547**. Every one as stated.
* **The `2^24` cross-check is verified by exhaustion.** *I scanned all 8,388,607 odd seeds `1 < n <
  2^24`*: `max(tau - 1) = 286` at `n = 13,421,671` — the round's number exactly. (Even seeds are
  trivially `tau = 1`, which I confirmed, so restricting to odd loses nothing.) The round's claim that
  its two independent implementations agree over this range is therefore checkable and correct.
* **The minimum-seed staircase holds, and is internally consistent in a way that is hard to fake.**
  *I verified all 21 table entries survive to their stated depth*, and more tellingly: for each entry,
  `tau(M_K) - 1` equals **exactly one less than the next row's `K`** — so the table's jump points are
  the real ones, not a sampling. *I brute-forced minimality* for the ten entries below `2^21`
  (`27, 703, 10,087, 35,655, 270,271, 362,343, 381,727, 626,331, 1,027,431, 1,126,015`): **every one is
  genuinely the least such seed**. *Also verified* the `2^28` record `tau(217,740,015) = 395`.
* **The search machinery is sound, and I checked its two load-bearing lemmas.** *(4) the lift law*
  `T^k(rho + b·2^k) = T^k(rho) + b·3^s` and *(5) the unique lift bit* `b = (x mod 2) XOR eps` — 6,622
  cases, **zero mismatches**. *(10) the accelerated affine identity* `2^{A_t} U^t(n) = 3^t n + C_t`
  with `C_{j+1} = 3C_j + 2^{A_j}`, and *(11) the endpoint residue* `U^t(n) = 2^{-A_t} C_t (mod 3^t)` —
  58,000 cases each, **zero mismatches**. The exhaustiveness argument is also correct as stated: at
  depth `B` each cylinder has one representative in `[0, 2^B)`, and any later lift bit `b = 1` pushes
  the seed above `2^B`, so the depth-`B` frontier plus deterministic continuations really does cover
  every `n < 2^B`. This is a search, not a sample.
* **Section 7 is a real no-go, and the argument is right.** An eventually periodic barrier word with
  period length `t`, total exponent `A`, positive carry `C` has periodic seed `xi = C/(2^A - 3^t)`; the
  barrier forces `2^A < 3^t`, hence **`xi < 0`**. So a periodic survivor is a *negative 2-adic shadow,
  not a positive ordinary integer* — any genuine divergent certificate must be **nonperiodic and carry
  an all-depth invariant**. That is an impossibility theorem for the entire "find a repeating divergent
  word" family, and it lands on the campaign's central seam from the disproof side.
* **Section 6 is the round refusing an unsound shortcut, which is worth as much as a theorem.** The
  3-adic endpoint condition `3^r | U^t(n) + 1` is controlled entirely by the last `r` valuations, so
  pruning branches that lack a synchronized target-1 congruence would be **logically unsound** — a
  hypothetical divergent orbit is not known to satisfy one. The round declines the prune. It also
  correctly notes that the project's all-depth negative-shadow theorem (round 96's section 3) closes
  only the constrained target-1 subproblem and does **not** supply the synchronization.
* **The record demonstrates the seam concretely.** `n = 12,235,060,455` passes the finite 2-adic start
  test and the 3-adic endpoint test *perfectly* — both least representatives are the actual positive
  start and endpoint — and still fails the real drift inequality at step 547. **Finite 2-adic/3-adic
  compatibility is necessary but not sufficient**, exhibited on an explicit integer rather than argued.
* **Naming collision worth flagging.** Round 96's `M_r(n)` (least odd `m` with `U^r(m) = U^r(n)`) and
  round 97's `M_K` (least `n > 1` surviving the barrier to depth `K`) are **different objects sharing a
  symbol**. Both rounds box a statement about "M". Do not conflate them when reading the two entries
  together.
* **Unchecked, and flagged as such:** the claim that *no other* seed below `2^36` beats 546 (I verified
  its two pillars — the exact frontier count and the record's `tau` — but not the 527M deterministic
  continuations); the `9,419,649,459` post-frontier steps; the 271 64-to-128-bit transitions; the
  23-second/5-core runtime (the round itself says runtime is not part of the theorem); the bundle
  digest `2ec768f2…fc70c0f`; the six sandbox artifacts; and the citations — Garcia-Tal sparsity, the
  published `2^71` limit, and the "exponent-code diagnostic" reference. The interrupted `2^37`
  exploratory run is **excluded from all certified claims by the round itself**, which is the right
  call.
* **Failure mode: the round-95 category, upgraded.** Sound, correctly executed, and out of scope — no
  finite search can disprove — but unlike 95 it converts its own failure into two durable objects: a
  certified staircase with `M_547 >= 2^36`, and the periodic-survivor no-go. Round 95 produced a
  resource wall; round 97 produces mathematics.

**Placement.** Eighteenth refutation in a row (80-97), and the campaign's cleanest demonstration that
**the disproof front's difficulty is not compute**. Approach 92 reduces a disproof to constructing a
bounded (equivalently eventually constant) sequence `(M_K)`, and the computation instead drove `M_K`
*up* by another factor of ~5.6 (`2,788,008,987` at `K=433` to `>= 2^36` at `K=547`). Combined with
section 7, any future disproof-by-search approach must supply a **nonperiodic all-depth invariant**
before dispatch; without one it will reproduce 97 at greater cost. Rounds 95 and 97 together retire
the computational disproof front on both ends — resources (95) and logic (97).

**Cross-round observation (78 landed: 33 hit the integer-lift seam, 38 restate the problem, 20 aim a
theorem at the wrong object, 41 use a blunt invariant, 43 impossibility theorems for whole method
classes).** Rounds 96 and 97 are the proof and disproof faces of one object and should be read as a
pair. 96 proved the *proof* side needs a rank for aperiodic block sequences; 97 proved the *disproof*
side needs a nonperiodic all-depth invariant — and both identify the failure as **synchronization
between the 2-adic seed, the 3-adic endpoint, and the Archimedean order constraint**, the same seam
rounds 6, 7, 13, 15, 19 and 22 reached from six other formalisms. 97's contribution is that it exhibits
the seam on a **named positive integer** whose 2-adic and 3-adic tests both pass, which is the most
concrete form this obstruction has taken in the whole campaign.

## Round 98 — approach 93, SAT/SMT search for exact barrier survivors

`round-98-output.md`, 14,446 chars, 55m 55s. **Not a proof — nineteenth consecutive refutation — and
the round states it plainly** ("I did not obtain a valid full proof of the Collatz conjecture"). But
this is the **third round in a row that converts its own failure into a theorem**, and 98's theorem is
the sharpest of the three: it proves that the *entire method class* it was asked to run cannot succeed,
by exhibiting a single explicit family.

* **The decisive result: unrestricted finite-horizon SAT can never go UNSAT.** For every `R`, take the
  Mersenne seed `N_R = 2^{R+1} - 1`. Then `U^t(N_R) = 3^t·2^{R+1-t} - 1` for `0 <= t <= R`, all of its
  first `R` accelerated valuations are 1, `U^t(N_R) > N_R` for `t >= 1`, and `3^R | U^R(N_R) + 1` — in
  fact `U^R(N_R) + 1 = 2·3^R` exactly. So the full conjunction (exact transitions + strict barrier + no
  descent + **target-1 endpoint congruence**) is **SAT over positive ordinary integers at every finite
  horizon**. *I verified all four properties for every `R <= 59`: zero mismatches*, including the sharp
  form `U^R(N_R)+1 = 2·3^R` and that the first `R` valuations are all 1. Neither longer unrolling nor
  adding suffix congruences can ever produce global UNSAT. That is a complete no-go for approach 93 as
  literally specified, proved rather than asserted.
* **The `2^18` target-1 scan reproduces exactly, by exhaustion.** *I enumerated every accelerated
  valuation word of length 18 satisfying `2^{A_j} < 3^j` for all `1 <= j <= 18`*: **1,900,470 words** —
  the round's number to the unit — and *exactly one* satisfies `3^18 | C_18 + 2^{A_18}`, namely
  `1^18`. **No non-all-ones target-1 word exists**, confirming the round's independent agreement with
  the all-depth classification round 96 leaned on.
* **The bounded certificate checks out by exhaustion too.** *I scanned all `2 <= n < 2^20`*:
  **27,328** seeds survive through depth 20 (exact match), and the record is `n = 1,027,431` surviving
  through depth **182**, failing at **183** — all three of the round's numbers. Its staircase table also
  reconciles with what I verified last round: `2^24 -> 286/287/13,421,671` and `2^28 ->
  394/395/217,740,015` are the same values I confirmed independently in the round-97 entry, and
  `1,027,431` is the same seed the round-97 staircase lists at `K = 176`.
* **The negative-shadow cycle scan is exactly right, and I found the same three.** *Enumerating
  primitive integral solutions of `xi = C/(2^A - 3^r)` over barrier words up to length 14*, I get
  **exactly three**: `|xi| = 1`, `|xi| = 5` (word `(1,2)`, and `xi = 5/(8-9) = -5` as stated), and
  `|xi| = 17` (word `(1,1,1,2,1,1,4)`). *On absolute values these are the negative `3x-1` cycles* `1`,
  `5 <-> 7`, and `17 -> 25 -> 37 -> 55 -> 41 -> 61 -> 91 -> 17` — the same two nontrivial cycles round
  96's seed partition turned up from a completely different direction. Three rounds, three methods, same
  three objects.
* **Section 6 names the obstruction in the right language, and it is the campaign's seam again.** The
  start representative is `rho_k = sum_{i<k} b_i 2^i`, and the infinite branch is an ordinary
  nonnegative integer **exactly when `b_k = 0` for all large `k`** — a **co-Büchi liveness condition**,
  not a safety property. It cannot be certified by ruling out bad finite prefixes because *there are no
  bad finite prefixes*. The all-ones ray is the witness: every finite prefix comes from a positive
  Mersenne integer, but the ray's 2-adic start is `-1` and its lift digits are eventually **1**, not 0.
  (*Trivially checkable and checked*: the all-ones cylinder has `rho_k = 2^k - 1`, so every `b_i = 1`.)
* **Section 7's no-go for coercive ranks is sound.** No `H` with two-sided linear bounds `cn - D <=
  H(n) <= Cn + D` can satisfy "every `n>1` descends within `K` steps." *I verified the ingredient*:
  under the shortcut map `T^t(2^m - 1) = 3^t 2^{m-t} - 1` (zero mismatches, `m <= 25`), and the ratio
  `x_t/n_m` tracks `(3/2)^t` to four decimals at `m = 40` — reaching `1.9e5` by `t = 30`. Repeated
  bounded-block descent forces `H(x_t) < H(n_m)` while coercivity forces `H(x_t) > H(n_m)` once the
  ratio exceeds `C/c`. **Every affine rank on finitely many residue classes with positive slopes dies
  here** — which is a *fourth* independent kill of the modular-Lyapunov family (rounds 11, 28, and now
  98 by a different mechanism). The round's own prescription is right: a working rank must be unbounded
  but **noncoercive**, e.g. using `v_2(n+1)` as a phase counter — precisely the rank round 96 found for
  the same all-odd loop.
* **The conditional completion theorem is correctly stated.** Barrier-lift extinction — "no infinite
  barrier path has eventually zero lift digits" — plus UNSAT for every positive nontrivial cycle
  equation `(2^A - 3^r)n = C_r` gives Collatz, by the standard dichotomy. The round is careful that
  cycles are **not** absorbed by the extinction statement, since positive cycles need `2^A > 3^r`,
  the *opposite* sign from the strict divergent barrier. That sign observation is the same one round
  97 used to kill periodic barrier words, now deployed to show what extinction does *not* cover.
* **Unchecked, and flagged as such:** the SMT-LIB instances and the claim that the `B=20, K=183`
  instance is UNSAT *as a solver artifact* (I verified the mathematical content by exhaustion, not the
  SMT encoding); the certificate SHA-256 and ZIP digest; the nine sandbox artifacts; and the citations —
  Yolcu-Aaronson-Heule rewriting, the `2^71` record, Angeltveit 2026, the LRAT/Lean certification
  references. The `1,048,574`-integer independent checker is plausible but is the round's own run.
* **Failure mode: (a), a genuine obstruction — the strongest form.** Not a resource wall (95), not a
  restatement (96); an explicit family proving the method class is structurally incapable. The one thing
  to watch is that its positive content is *entirely* negative-space: every certified object it produced
  (27,328 seeds, 1,900,470 words, three shadow cycles) is a finite fact already implied by prior rounds.

**Placement.** Nineteenth refutation in a row (80-98) and the **cleanest method-class kill in the
campaign**. Rounds 96-98 now form a closed argument from three directions: 96 showed a ranked
certificate's universal closure condition *is* Collatz; 97 showed the disproof search drives `M_K`
upward and that periodic barrier words are negative shadows; 98 shows no finite-horizon solver run can
ever refute, because the Mersenne family satisfies every finite constraint set including the target-1
congruence. **The campaign can now state a dispatch gate**: any future automated/certificate/solver
approach must arrive with a candidate *noncoercive, unbounded* rank for aperiodic barrier paths, plus a
separate cycle exclusion — or it will reproduce 96, 97, or 98 exactly.

**Cross-round observation (79 landed: 34 hit the integer-lift seam, 38 restate the problem, 20 aim a
theorem at the wrong object, 41 use a blunt invariant, 44 impossibility theorems for whole method
classes).** The 2-adic ghost `-1` is now the campaign's single most productive object. It made round
11's cohomology nonzero for irrelevant reasons; it is round 96's `n = -1 (mod 2^K)` cylinder surviving
every depth; it is round 97's negative periodic seed; and it is round 98's all-ones ray whose lift
digits never vanish. Four rounds, four formalisms, one obstruction — **every finite abstraction of the
Collatz transition system silently admits `-1` (and `-5`, `-17`) as a survivor, and the missing
ingredient is always the same: a condition distinguishing an ordinary positive integer from its 2-adic
shadow.** Rounds 15 and 19 asked for that as a "synchronization theorem"; 98 restates it as a co-Büchi
liveness property, which is the most precise form the campaign has produced and the first stated in a
vocabulary with existing proof technology (Büchi ranking, disjunctive well-foundedness, PDR).

## Round 99 — approach 94, MILP or CP-SAT cycle search

`round-99-output.md`, 10,482 chars, 42m 33s. **Not a disproof — twentieth consecutive refutation — and
the round leads with it**: no positive nontrivial cycle, no counterexample, and an explicit statement
that "presenting this work as a completed Collatz disproof would be incorrect." It also states the
right epistemics unprompted: a cycle search disproves Collatz only by emitting an explicit `n_0`, a
finite cycle, and an exact certificate; infeasibility over a finite range excludes only that range;
and **even a full no-nontrivial-cycles theorem would not exclude a divergent orbit**.

* **The exact cycle criterion is correct, and I confirmed it is *sufficient*, not just necessary.**
  For a valuation word `a` with `A = sum a_i`, `C(a) = sum_i 3^{K-1-i} 2^{A_i}`, the word is realized
  by a positive odd cycle **iff** `D := 2^A - 3^K > 0` and `D | C(a)`, with the start forced to
  `n_0 = C(a)/D`. *I brute-forced every admissible word for `K <= 8` across all admissible totals*:
  every word passing `D > 0` and `D | C(a)` **replays as a genuine cycle under exact valuations**, and
  the only ones that pass are `(2,2,...,2) -> n_0 = 1` — the trivial cycle. So the criterion is sound
  and there are **no nontrivial cycles for `K <= 8`**, independently.
* **The `K <= 20` exact enumeration reproduces to the unit.** The round reports **586,739,450 words
  tested, 0 with `(2^A - 3^K) | C(a)`, 0 positive nontrivial cycles**, and checks its per-`(K,A)` word
  count against `C(A-3, K-2)`. *I verified that identity twice* — by substitution (`a_0 = 1`,
  `a_{K-1} >= 2`, rest `>= 1` gives `A-K-1` units over `K-1` slots) and by brute force for `K <= 7` —
  then *summed it over every admissible `(K, A)` with `K <= 20`*: **586,739,450**, exact match.
* **The frontier-pair arithmetic is right in every digit I could check.** For `(K, A) =
  (137,528,045,312, 217,976,794,617)`: *`gcd(K, A) = 1`* ✓; *`A + K = 355,504,839,929`* ✓ (the
  unshortened period); *`A ln2 - K ln3 = 8.98654870861792...e-13`* ✓ to all 11 quoted digits;
  *`A/K - log2(3) = 9.42705847903078...e-24`* ✓ to all 11; *`D = 2^A - 3^K` has exactly
  **217,976,794,577** binary digits* ✓; *`3,405,887,416` 64-bit limbs* ✓; *`25.38` GiB* ✓. I also
  confirmed the narrow-window bound `0 < A/K - log2 3 < 1/(3(N+1) ln 2)` holds at `N = 2^71`
  (`9.43e-24 < 2.04e-22`).
* **The small-prime scan is real, and I reran it from scratch.** *Sieving to 2,000,000 gives
  `pi = 148,933` primes, minus 2 and 3 = **148,931*** — the round's count exactly. *Testing
  `pow(2,A,p) == pow(3,K,p)` for every one of them*: **no prime `p <= 2e6` divides `2^A - 3^K`**,
  confirming the round's finding that the cheapest modular-cut layer is empty for the frontier pair.
* **A float trap I walked into, worth recording.** My first range check said `A` was *outside* the
  admissible band `[floor(K log2 3) + 1, ceil(K log2(10/3)) - 1]` — because in double precision
  `K*log2(3)` evaluates to exactly `217976794617.0`. *In 80-digit arithmetic it is
  `217976794616.99999999999870...`*, so `floor(...) + 1 = 217,976,794,617` and the round's `A` is
  precisely the **minimal** exponent with `2^A > 3^K`. *I confirmed both directions*: `A ln2 - K ln3 >
  0` and `(A-1) ln2 - K ln3 < 0`. The round is right and the float is wrong by one — a live instance
  of the campaign's own "exact arithmetic, never float output" rule, on the very quantity the approach
  is about.
* **The scaling wall is the round's real content, and it is a new kind of obstruction.** Segment
  compression by local-minimum blocks (`m >= 92` blocks, `Q_{j+1} = 3^{k_j} Q_j + 2^{A_j}(3^{k_j} -
  2^{k_j})`, closure `Q_m = (2^A - 3^K) x_0`) reduces the variable count from `~1.4e11` exponents to as
  few as 92 block pairs — but **it does not compress the exact arithmetic in the divisibility**. Writing
  `D` down at all needs ~25 GiB; a limb-linearized CP-SAT equality would need billions of integer
  variables *just for the denominator*. So the binding constraint is the **global exponential
  divisibility**, not the approximate logarithmic balance that the classical continued-fraction analysis
  handles.
* **It refuses to launder float solver output as proof.** The HiGHS MILP prototype reported every
  admissible fixed-total model infeasible through `K = 12`, and the round explicitly declines to treat
  those statuses as formal certificates because the internal arithmetic is floating point — running a
  separate exact C++ enumerator instead. That is the right discipline and the same one round 95 showed.
* **Sign structure links it to 97 and 98.** Positive cycles need `2^A > 3^K`; the strict divergent
  barrier needs `2^A < 3^K`. Round 97 used that sign flip to prove periodic barrier words are negative
  2-adic shadows; round 98 used it to show cycle exclusion is *not* absorbed by barrier-lift extinction;
  99 now works the `2^A > 3^K` side directly and hits a resource wall there. The three rounds partition
  the same equation by sign and fail on opposite sides for opposite reasons.
* **Unchecked, and flagged as such:** Hercher's `>= 92` local-minima theorem and the derived
  `K >= 137,528,045,312` / `A >= 217,976,794,617` bounds (cited, not re-derived here — I verified the
  *arithmetic consequences* of that pair, not the theorem producing it); the `2075 * 2^60 ~ 2^71.02`
  project figure and the published `2^71` record; the `~1.375e11` odd-member bound; the HiGHS runs; and
  the six sandbox artifacts with their SHA256SUMS.

**Placement.** Twentieth refutation in a row (80-99), and the second pure **resource** wall after round
95 — but a much better-diagnosed one. Round 95 hit "the compute doesn't exist"; round 99 hits "the
*encoding* doesn't exist", and localizes it precisely: every solver-friendly compression handles the
length variables, and none of them compresses `2^A - 3^K | Q_m`. Any future MILP/CP-SAT/solver cycle
approach must arrive with a way to certify that divisibility without materializing `D` — otherwise it
reproduces 99 at 25 GiB per instance. Combined with 95, the campaign can now say that **both
computational fronts are closed for encoding reasons rather than mathematical ones**: verification (95)
and cycle search (99).

**Cross-round observation (80 landed: 34 hit the integer-lift seam, 38 restate the problem, 20 aim a
theorem at the wrong object, 41 use a blunt invariant, 44 impossibility theorems for whole method
classes).** With 99 the ledger has a clean four-way split of the *computational* quadrant: 95
(verification, resource wall), 97 (divergence search, mathematical no-go plus rising `M_K`), 98
(solver proof search, structural no-go via the Mersenne family), 99 (cycle search, encoding wall). None
produced a counterexample; all four produced exact certificates that reproduce independently. The
pattern across them is that **the automated fronts fail at the point where an unbounded exact quantity
must enter a bounded formalism** — `D` in 99, the co-Büchi lift condition in 98, the aperiodic rank in
96. That is the same seam stated three ways, and it is now the campaign's most reliable prediction
about what a new approach will hit.

## Round 100 — approach 95, Meet-in-the-middle affine composition

`round-100-output.md`, 8,984 chars, 40m 29s. **Not a disproof — twenty-first consecutive refutation —
and the round opens with it**: no positive nontrivial cycle, and "claiming a full disproof from this
would therefore be false." Its finite result is **no nontrivial positive cycle with at most 34 odd
members**, from 2,041,661,603 enumerated half-states and zero divisibility matches. The round then
does the thing that makes it worth more than its result: it computes exactly how far the method is
from mattering, and the answer is `10^(3.1e10)` states.

* **The algorithmic content is real and it checks out.** *I verified the concatenation law*
  `C_uv = 3^q C_u + 2^{A(u)} C_v` over **14,400 prefix/suffix pairs**: zero mismatches. *I verified the
  carry decoder* — `a_0 = v2(C_w - 3^{r-1})`, then recurse on `(C_w - 3^{r-1})/2^{a_0}` — over **87,376
  words** (`r <= 8`, exponents <= 4): it recovers the originating word every time, **zero failures**.
  That decoder is the round's genuine engineering idea: because a carry uniquely determines its word,
  the *second* meet-in-the-middle table never has to be materialized — you decode candidates in the
  target residue class instead of storing them. *I also verified the carry interval*
  `C_min(r,S) = 3^r - 2^r`, `C_max(r,S) = 3^{r-1} + 2^{S-r+1}(3^{r-1} - 2^{r-1})` over **11,430**
  `(r,S)` words: every carry lands inside, **zero violations**. So the "only test `R + kD` inside the
  interval" pruning is sound.
* **The sufficiency argument is correct, and it is the same one round 99 gave.** A divisibility match
  is automatically a genuine cycle: splitting `w = u_t v_t` and using `gcd(2,3)=1` forces
  `2^{A_t} | 3^t n + C_{u_t}`, making every `n_t` an integer, odd, with `v_2(3n_t+1) = a_t` exactly. So
  the search cannot produce a spurious hit that fails step-by-step admissibility. Rounds 99 and 100
  arrived at this independently, in different chats, with the same proof — a useful cross-check on both.
* **I reran the cycle search myself and found nothing either.** *Independent DFS over the same
  admissible region* (`3^j < 2^A <= (10/3)^j`, canonical `a_0 = 1`, `a_{j-1} >= 2`), enumerating
  compositions with a running carry rather than the round's meet-in-the-middle join: **no nontrivial
  positive cycle for `j <= 14`**, every candidate replayed exactly. *I also confirmed the `j = 1` case*:
  `(2^a - 3)n = 1` has the single positive solution `a = 2, n = 1`, the trivial cycle. My range is well
  short of the round's `j <= 34`, but it is a genuinely different algorithm agreeing on the overlap.
* **The asymptotic constants are right to every digit quoted.** Near the critical balance
  `A ~ (log2 3) j`, the composition count is `binom(A-1, j-1) = (2.8395137...)^j`. *I computed the
  limit in closed form*: `lam^lam / (lam-1)^(lam-1)` with `lam = log2 3` gives
  **2.8395137304977522** — matching to all 7 quoted digits — and *numerically confirmed convergence
  from below* (2.7899 at `j=200`, 2.8361 at `j=4000`). *The square-root exponent*
  `log2(2.8395137)/2 = 0.7528219439...` matches the round's **0.75282194**. *And the frontier estimate
  checks*: `0.75282194 x 1.375e11 = 1.03513e11` and `x log10(2) = 3.11605e10`, both exactly as stated.
* **The honesty about scope is the round's best feature.** It states plainly that its `j <= 34`
  exclusion is **not a new record** — Hercher's threshold combined with verification past
  `1536 * 2^60` already forces any hypothetical cycle to `>= 1.375e11` odd members, so the literature is
  nine orders of magnitude ahead. It also notes that **cycle search covers only one way Collatz could be
  false**: a divergent nonperiodic orbit is untouched by an affine closure equation. Both caveats are
  correct and neither was forced out of it.
* **The verification discipline is the strongest of any computational round so far.** The round reports
  an independent Python verifier that tested the encoder/decoder on 3,432 complete words, compared the
  pivot join against literal full-word enumeration on all 65 tested `(j,A)` instances through `j = 10`,
  recovered exactly the ten repeated trivial all-2 words and nothing else, and checked every aggregate
  identity in the JSON certificate — plus an ASan/UBSan rebuild rerunning the search through `j = 25`.
  Cross-checking a fast join against brute force on small instances is exactly the right structure, and
  it is what my own independent DFS does at larger `j`.
* **Unchecked, and flagged as such:** the headline `j <= 34` exclusion itself and its component counts
  (2,041,661,603 half-states, 86,594 parameter blocks, 7,346 in-range residues, 1,033,566,792
  half-states at `j = 34` with 2,140 candidates) — I verified the *machinery* exhaustively and the
  *result* only to `j = 14`; the two certificate checksums `0xb5f7e1a4385866df` and
  `0x4dd6c346363b89e0`; the seven sandbox artifacts; the Barina `2075 * 2^60` figure; and Hercher's
  threshold and `1.375e11` bound (cited, not re-derived).
* **Failure mode: the round-99 category, sharpened into a number.** Sound, correctly executed, out of
  scope — but where 99 measured the wall in bytes (25.38 GiB to write `D` down), 100 measures it in
  states: even a *perfect* square-root meet-in-the-middle needs `2^(1.035e11)` operations at the known
  cycle-length frontier. The round draws the right conclusion: closing this needs "a theorem compressing
  or excluding entire infinite families of affine words, not merely a faster join."

**Placement.** Twenty-first refutation in a row (80-100), and the **third computational wall in four
rounds**, each measured in a different currency: 95 in GPU-years, 99 in bytes of `D`, 100 in states of
the search space. All three are now quantified rather than asserted, which is what makes them a usable
gate: a future computational approach has to say which of the three walls it beats and by what factor.
None of them is beaten by hardware. Note also that 99 and 100 attacked the *same* object — the cycle
equation `(2^A - 3^j)n = C_w` — from opposite algorithmic directions (solver encoding vs. meet-in-the-
middle enumeration) and hit walls of the same order, which is decent evidence the obstruction is in the
problem rather than the method.

**Cross-round observation (81 landed: 34 hit the integer-lift seam, 38 restate the problem, 20 aim a
theorem at the wrong object, 41 use a blunt invariant, 44 impossibility theorems for whole method
classes).** With round 100 the computational quadrant is complete and consistent: **95** (verification,
resource wall), **97** (divergence search, no-go plus rising `M_K`), **98** (solver proof search,
structural no-go via Mersenne), **99** (cycle search by encoding, byte wall), **100** (cycle search by
enumeration, state wall). Five rounds, five exact certificates, zero counterexamples, and — this is the
part worth carrying forward — **every one of them reproduced independently when I checked it**. The
computational fronts are not failing from sloppiness; they are failing because the quantities that must
enter a finite formalism (`D`, the composition count, the co-Büchi lift condition, the aperiodic rank)
are each unbounded in a way no amount of engineering compresses.

## Round 101 — approach 96, Distributed inverse-tree enumeration

`round-101-output.md`, 20,081 chars, 70m 34s — the longest round since 96 and the largest output since
96. **Not a proof — twenty-second consecutive refutation — stated in the first line** ("A claim of
completion would be false"). But this is the **best round of the 96-101 block** and arguably the most
useful single document the campaign has produced: it proves the approach's own reformulation is
equivalent to Collatz, then proves by *counting* that the reformulation cannot be established the way
the approach proposes, and every number in it reproduced independently.

* **It kills its own premise first, correctly.** Theorem 1: every connected component of the positive
  Collatz graph meets every congruence class (from the Monks-Monks-Monks-Monks sufficiency theorem). So
  the inverse tree of 1 covers every residue class — **and so would the inverse tree of a hypothetical
  divergent or cyclic component**. Congruence coverage is component-blind, and CRT means tracking
  finitely many moduli changes nothing. That is the right opening move and it disposes of the naive
  reading of approach 96 immediately.
* **The repair is exact and I verified both of its lemmas.** *Lemma 2* — `T^k(n + q·2^k) = T^k(n) +
  3^{s_k(n)}·q` — **25,116 cases, zero mismatches**. *Lemma 3* — `tau(z) = h` implies `z <= 2^h`,
  since each inverse step at most doubles — **39,999 cases, zero violations**. Together they give
  Theorem 4: a congruent witness shallower than `k + s_k(n)·log2 3` *must be n itself*. Hence **Theorem
  5 (TSIC)**: Collatz is equivalent to "for every n there is k with `2^k > n` and `D_k(n mod 2^k) <=
  k + s_k(n) log2 3`". The distinction it draws is the whole point — *"the class intersects B_1"* vs.
  *"the represented integer belongs to B_1"*.
* **The impossibility argument is a genuine counting theorem, and its constants are exact.** Using
  Applegate-Lagarias (`<= 1.359^h` depth-h preimages), covering `2^k` classes forces `D(k) >=
  (log2/log 1.359)·k`. *I computed that constant*: **2.259654881...**, matching the round's
  `2.25965488...`. Sharper: at the critical drift `alpha = log_3 2 = 0.6309297535...` (verified), the
  number of near-critical parity classes is `2^{H_2(alpha)k}` with *H_2(alpha) = **0.9499555271...***
  (verified), while the tree through depth `2k+O(1)` holds only `2^{2 log2(1.359) k}` =
  `2^{**0.8850909122...**k}` (verified). Since `0.885… < 0.950…`, **there are asymptotically too few
  shallow inverse-tree nodes to cover the near-critical classes**. TSIC cannot be proved by a blanket
  all-class depth bound — it must be proved along the nested classes of one fixed integer.
* **The enumeration reproduces exactly — every cell of the table.** *I ran my own BFS of the inverse
  tree of 1 to shortcut depth 50*: **4,741,320 distinct nodes**, the round's number to the unit. *Then
  I recomputed `D(k)` and the forcing-class counts for `k = 1..10`* and got **1|1|2/2, 2|5|4/4,
  3|11|7/8, 4|13|11/16, 5|26|17/32, 6|30|27/64, 7|31|44/128, 8|34|69/256, 9|41|106/512, 10|43|160/1024**
  — **all ten rows identical**, including the punchline that every class mod `2^10` meets `B_1` but only
  `160/1024 = 15.625%` has a witness shallow enough for Theorem 4 to bite.
* **The `2 mod 9` compression is real and checks out.** Theorem 6 gives a complete first-return grammar:
  `01`, `0001`, or `0^{2j} 1^m 0 e` with `(j=0,m>=1)`, `(j=1,m>=1)`, `(j=2,m>=0)`. *I tested every
  `x = 2 mod 9` below `2^20` — 116,509 values*: **zero grammar failures**, **zero failures of the exact
  affine formula (5.3)** `P(x) = (3^{m+e}(x+4^j) - 2^{m+2j}) / 2^{m+2j+2}` (and its two exceptional
  branches `(3x+2)/4`, `(3x+8)/16`), and **zero failures of the sign rule (6.2)** `P(x) > x` iff
  `3^{m+e} > 2^{m+2j+2}`. *I also confirmed the round's population count*: `x = 2 mod 9` below `2^24`
  numbers exactly **1,864,135**.
* **The persistent family is the campaign's `-1` ghost again, in a new disguise — and it is exact.**
  The return word `W = 101` has `P_W(x) = (9x+7)/8` with fixed point **-7**. Setting `x_N = 9·8^N - 7`:
  *I verified for `N = 1..11`* that `x_N = 2 mod 9`, that `P_W^t(x_N) + 7 = 9^{t+1} 8^{N-t}` for all
  `0 <= t <= N`, and that `P_W^t(x_N) > x_N` throughout. **So no fixed number of returns can guarantee
  descent on `2 mod 9`** — and the nested congruences converge 2-adically to `-7`, not to a positive
  integer. Theorem 7 generalizes it: any expanding block (`3^S > 2^L`) has fixed point
  `xi_W = -C_W/(3^S - 2^L) < 0`, a positive integer can shadow it only `r <= log2((3^S-2^L)x + C_W)/L`
  times, and **finite positive shadows have a negative 2-adic limit**. This is why naive finite-state
  pumping is unsound.
* **Theorem 8 is the round's best output: a certificate specification with a named missing hypothesis.**
  Four conditions — exact coverage, exact transition closure, **ordinary-integer spliceability**, and
  loop exclusion by sign — imply Collatz, by least-counterexample on `S_9`. The proof is correct as
  written (equality `3^S = 2^L` impossible; expanding loops negative by Theorem 7; contracting loops
  handled by loop exclusion). And it isolates the gap precisely: **spliceability**. Residue equality,
  bounded carries, and automaton-state equality all permit pumping only in `Z_2`, where `-7` is a
  legitimate point.
* **It correctly places the prior all-depth theorem rather than overclaiming it.** Section 8 restates
  round 96's target-1 barrier theorem, credits it with closing one infinite family of negative shadows,
  and then says exactly why it does not close this approach: a positive orbit is not known to produce
  the synchronized terminal condition `3^r | C_r + 2^{A_r}` for the same blocks satisfying the
  coefficient barrier. That is the **cross-prime synchronization problem**, and the residue is named as
  *"aperiodic switching among finite negative shadows, while one fixed seed remains an ordinary positive
  integer."*
* **Unchecked, and flagged as such:** the `2^24` exhaustive scan results (0 grammar failures, 0 sign
  failures, max 54 returns before descent, record at `x = 13,920,959`) — I verified the same properties
  to `2^20` and the population count exactly, but not the `2^24` run itself; the Applegate-Lagarias
  `1.359^h` bound and the Monks et al. sufficiency theorem (cited, not re-derived); the `2^71`
  verification figure; and the downloadable audit bundle.
* **Failure mode: (a) a genuine obstruction, arrived at twice.** Once by counting (shallow nodes are too
  few) and once by construction (the `-7` shadow family). Neither is a restatement and neither is a
  resource wall — this is the first round in the computational block whose *negative* results are both
  proved and independently reproducible end to end.

**Placement.** Twenty-second refutation in a row (80-101), and the one I would hand to someone asking
what the campaign has actually learned. Rounds 96-101 now form a closed set of six proofs that the same
object blocks every automated route: 96 (ranked certificate closure ≡ Collatz), 97 (periodic barrier
words are negative shadows), 98 (finite-horizon SAT can never go UNSAT; the all-ones ray is `-1`), 99
(encoding `D` costs 25 GiB), 100 (the join costs `2^(1.035e11)` states), and now **101 — which supplies
the missing counting argument: even granting unlimited enumeration, the shallow inverse tree is
exponentially too small (`2^0.885k` nodes against `2^0.950k` critical classes) to certify what it must.**

**Cross-round observation (82 landed: 35 hit the integer-lift seam, 38 restate the problem, 20 aim a
theorem at the wrong object, 41 use a blunt invariant, 45 impossibility theorems for whole method
classes).** The negative 2-adic shadow now has five independent incarnations across the campaign, each
found by a different formalism and each verified here from scratch: `-1` (round 96's surviving
cylinders, round 98's all-ones ray), `-5` and `-17` (round 97's seed partition, round 98's cycle scan),
and now **`-7`** (round 101's `W = 101` return block, with the explicit family `x_N = 9·8^N - 7`). The
campaign's single most transferable finding is this: **every finite abstraction of the Collatz map — 
residue, carry, automaton state, certificate node — admits the negative 2-adic points as legitimate
survivors, and no approach has yet produced the predicate that separates an ordinary positive integer
from its 2-adic shadow.** Round 101 gives that predicate a name (ordinary-integer spliceability) and a
proof that finite bounded-horizon ranks cannot supply it.

## Round 102 — approach 97, Extreme-trajectory anomaly detection

`round-102-output.md`, 13,319 chars, 57m 53s. **Not a disproof — twenty-third consecutive refutation —
and the round opens with it**: no divergent orbit, no nontrivial cycle, no nontermination invariant.
Every extreme-trajectory test came back **compatible with the stochastic prediction** once exact
arithmetic dependencies were accounted for. Its real contribution is a **methodological correction**
that invalidates the one apparent anomaly it found — and it is the round that found that anomaly and
then killed it itself.

* **The finite result extends round 97 by a factor of two, and the count reproduces exactly.** Every
  `1 < n < 2^37` violates the coefficient barrier by depth 547, so `M_547 >= 2^37 = 137,438,953,472`.
  *I recomputed the depth-37 admissible-cylinder count by the same independent DP over `(depth,
  odd-count)` I used on round 97*: **967,378,591**, the round's number to the unit — and the same
  method still gives **527,682,754** at depth 36, matching round 97. Same record seed
  `12,235,060,455`, same failure depth, no longer survivor: **upward movement of `M_K`, not the
  stabilization a divergent barrier orbit would require.**
* **The Lagarias-Weiss constants are right to every digit quoted.** *I solved the large-deviation
  equation `D(p||1/2) = log2 - p·log3` from scratch*: `p_* = **0.609089767923818**` (claim
  `0.6090897679238185`), `gamma_sh = 1/(log2 - p_* log3) = **41.6776476556544**` (claim
  `41.677647655654`), and `gamma_std = (1+p_*)·gamma_sh = **67.0630763938476**` (claim
  `67.063076393847`). *I also confirmed the Cramér root is exactly `kappa = 1`* — `½(3/2)^1 + ½(1/2)^1
  = 1` identically — which is what makes the maximum-excursion tail `y^{-1}` and puts the record scale
  at `n^2`. Both stochastic scales are therefore correctly derived, not quoted.
* **The carry-suppression lemma is exact and I verified both sides.** `C_j/(3^j n) = (1/3n) Σ_{i<j}
  2^{A_i}/3^i`, so under the barrier `2^{A_i} <= 3^i` it is bounded by `j/(3n)`. *For the record seed
  through `j = 345`*: observed maximum `**4.0493318746657963e-10**` (claim `4.0493318747e-10`) against
  the elementary bound `345/(3n) = **9.39921796242567e-9**` (claim `9.3992179624e-9`), bound satisfied.
  So the extreme survival is driven by **valuation balance, not an anomalous additive carry** — a real
  finding, cleanly established.
* **The barrier-conditioned valuation test is the round's sharpest piece, and it checks out to ten
  digits.** *I extracted the record's accelerated word myself*: `A_344 = **545**`, `Z = #{a_i = 1} =
  **219**`, longest run of 1-valuations `= **10**` — all three as claimed. Then *I rebuilt the exact
  conditional ensemble by dynamic programming* — every positive composition of 545 into 344 parts
  satisfying the same prefix barriers `2^{A_r} <= 3^r`, an ensemble with a **152-digit** cardinality —
  and got `E[Z] = **216.83892395660243**` against the round's `216.8389239566`. With the observed 219
  that is `z ≈ 0.4`: **the most extreme word in the whole search is statistically ordinary once you
  condition on its own length, total valuation, and barrier.**
* **The apparent anomaly, and why the round is right to reject it.** The late-depth seed counts sit
  well above the naive Poisson mean (8 seeds at depth 530 against 1.18 expected). The round diagnoses
  it correctly: **the surviving seeds are not independent — they have merged.** *I verified the
  specific witness*: `T^5(12,235,060,455) = T^10(14,500,812,391) = **30,969,996,779**`, exactly as
  stated. So 128 seeds at depth 400 are only 42 orbit components, and by depth 535 they are all **one
  component** — one exceptional future trunk inherited by many starts, which then dies at 547. The
  anomaly is a rejection of the independent-cylinder model, not evidence of a counterexample mechanism.
* **The methodological lesson is the transferable output.** *"Extreme starts must be clustered by
  shared future orbit before anomaly testing"* — the statistical unit is an unmerged trunk plus its
  coefficient margin, not a raw starting integer. This is a genuine trap: any future round that scans
  records for outliers and treats seeds as independent samples will manufacture the same false signal.
  It also retroactively explains why record tables look "clumpy" at depth without anything being wrong.
* **It states its own scope limits without prompting.** A finite statistical deviation cannot disprove
  Collatz; a valid disproof still needs an explicit cycle, a proved-nonterminating seed, or an all-depth
  invariant. It reuses the round-97/99 sign argument correctly (an eventually periodic barrier word has
  `xi = C/(2^A - 3^j) < 0`, a negative 2-adic shadow). And it notes that the entire `2^37` range sits
  far inside the independently verified `~2^71` convergence range — so the search adds no new
  convergence information, only barrier information. **It also reports that a `2^38` extension did not
  finish and explicitly refuses to use partial output as evidence**, which is the right call.
* **Unchecked, and flagged as such:** the 17,783,400,722 deterministic continuation steps and the 1,543
  64-to-128-bit transitions; the two independent runs' agreement; the OEIS A006884 / A006877 / A006878
  record tables and the specific large records quoted (`2,358,909,599,867,980,429,759` and
  `14,727,207,461,063,895,711` with their exact maxima and step counts); the KS diagnostic
  (`D = 0.08777`, `p = 0.446`), the log-gap rate `1.9998092126`, the coefficient of variation `1.04077`,
  and the regression slope `0.02186` — these depend on the record tables I did not re-derive; the
  `Var(Z) = 29.5125418437` and run-length probability `0.7365792649`; and the bundle artifacts.
* **Failure mode: (c)-adjacent, self-caught.** The approach's premise — that an outlier betrays a
  counterexample — produced exactly one candidate signal, and the round traced it to orbit merging
  rather than to the phenomenon it was hunting. That is the healthiest possible outcome for a
  statistical falsification program, and notably different from the campaign's other refutations: this
  one fails because **the data are ordinary**, not because the method hits a wall.

**Placement.** Twenty-third refutation in a row (80-102), and the campaign's only *statistical* front.
It closes cleanly: maximum excursions hold the `n^2` scale (`kappa = 1` exactly), stopping times stay
below the `41.68` / `67.06` extremal constants, valuation words are ordinary under exact conditioning,
carries are suppressed to one part in 2.4 billion, and the sole naive anomaly dissolves into a single
merged trunk. Combined with 95/99/100 (resource, byte and state walls) and 97/98/101 (structural
no-gos), the computational quadrant now has **no remaining untested angle**: search, solve, enumerate,
and now measure have all been run and all returned negative for the same underlying reason.

**Cross-round observation (83 landed: 35 hit the integer-lift seam, 39 restate the problem, 20 aim a
theorem at the wrong object, 42 use a blunt invariant, 45 impossibility theorems for whole method
classes).** Round 102 adds a distinct and useful category: **an approach whose failure is that the
object is genuinely unremarkable.** Every other computational round failed against a structural or
resource obstruction; this one ran to completion, measured what it set out to measure, and found the
extreme trajectories to be exactly what the random model predicts — including the single most extreme
word in a `2^37` search, which sits `0.4` standard deviations from its conditional mean. That is
evidence of a different kind from an impossibility theorem, and it is worth keeping distinct in the
ledger: **the Collatz map's extremes are not hiding a counterexample signature; they are boringly
typical, and the merging structure is what makes them look otherwise.**
