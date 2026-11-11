# COLLATZ_MAP — the branch tree

The campaign's memory. Every branch GPT opens gets a node here; every branch that dies gets its cause
of death recorded in the same node rather than being deleted. Nodes are written from the round `.tex`
files, which are the primary record — this file is the index over them, not a replacement.

Node format:

```
## Branch <id> — <name>            [OPEN | DEAD | SUPERSEDED | FROZEN]
opened R<n> (front) · last touched R<m>
WHAT IT CLAIMS: one sentence.
STATUS: what is proved, what is conditional, what is only numerical.
IF DEAD: the exact obstruction, and the scope of the obstruction — what it rules out and what it
leaves untouched.
ARTIFACTS: rounds/round-<n>.tex §<sec>, compute/<file>.
```

## Problem

For `n` a positive integer let `T(n) = n/2` if `n` is even and `T(n) = 3n+1` if `n` is odd; let
`T_odd(n) = (3n+1)/2^{v_2(3n+1)}` be the accelerated map on odd integers. The Collatz conjecture
asserts that every positive integer reaches 1 under iteration of `T`. Equivalently: `T_odd` has no
nontrivial cycle on the odd integers and no divergent trajectory.

## Prior work in this folder

Three single-shot writeups predate the campaign. They are a **resource, not a track**. None has been
independently verified; what follows is a structural audit only (`scripts/audit_statements.py`), not
a check of any argument.

* **Affine compression / rational-base traces** — `collatz_compression_framework.tex`, 23 statements.
  Four carry no adjacent `proof` environment:
  * `thm:intro-chain` (l.106, conditional termination of the recurrent subsystem) — an intro theorem,
    discharged at l.1055 and **conditional on `conj:ZT`**, so the paper's headline result is
    conditional by construction.
  * `prop:1911` (l.354, the retained ray `(1,1,2)^inf` giving `-19/11`) — proof deferred to
    Appendix `app:1911` (l.1188), which exists.
  * `prop:diamond` (l.241, descending-diamond criterion) — **no proof and no pointer.**
  * `lem:quotient` (l.923, quotient-error transform) — **no proof and no pointer.**

  The last two are load-bearing-looking and unproved; any round that uses them must restate and
  prove what it uses.
* **Arithmetic rigidity for transfer operators** — `arithmetic_rigidity_transfer_operators.tex`,
  every statement carries a proof environment. Structurally complete; contents unverified.
* **Accumulation points** — `collatz_accumulation_points.pdf`, PDF only, no source in the repo, so
  *we* cannot audit or diff it textually. GPT can: in round 1 it fetched and decoded the PDF through
  the GitHub Contents API, so the file is available to it as prior work even though we hold no
  `.tex` for it. If a round builds on it, get the statement restated in the round's own LaTeX.

## Branches

## Branch P3-ZT-RESIDENCE — the zero-trace graph as an integer dynamical system   [OPEN]
opened R1 (PROOF) · last touched R1

WHAT IT CLAIMS: the zero-trace graph of the rational-base ($81/64$) compression subsystem is
*isomorphic* to a transparent partial dynamical system on the nonnegative integers, so its
conjecture becomes a scalar statement about how long an integer orbit can reside below a power
of $64$.

The partial map is
`F(x) = 81x/64` if `x = 0 mod 64`, `(81x+1)/64` if `x = 15 mod 64`, `(81x-1)/64` if `x = 49 mod 64`,
undefined otherwise; `S_k` is the set of `x` in `[0,64^k)` whose first `k` steps are defined, and
`l_k` is the longest path in the nonzero part.

STATUS — **proved this round** (`rounds/round-1.tex`):
* Thm 3.7 the graph isomorphism `Z_k = (S_k, x -> F(x))`;
* Cor 3.8 every in/out-degree is at most one, `F` is strictly increasing on positives, so the
  nonzero part is a disjoint union of finite paths and no nonzero cycle exists;
* Prop 3.10 the residence-time formula, and Cor 3.11 the scalar equivalent
  `l_k <= floor((k+1)/3)` iff `mu_{k,b_k+1} >= 64^k`;
* Prop 4.1 the one-digit lifting, Prop 4.2 correctness of a constant-memory enumeration.

STATUS — **exactly computed**: the table of vertices, edges and `l_k` for `1 <= k <= 19`, extending
the repository's previous record which stopped at `k=12`. Source digest
`8c44c887…6d17`, output digest `d93792b5…917f` (GPT's own C++; digests unverified by us).

STATUS — **independently verified by us**: `compute/zt_independent.py`, written from the
definitions rather than from GPT's C++ — different language, arbitrary-precision integers
throughout, lifting re-derived. It **agrees on every depth `1 <= k <= 17`** (vertices, edges and
`l_k`), and a definition-level brute force over all of `[0,64^k)` agrees at `k <= 3`. That covers
five of the seven rows round 1 added (`k = 13..17`). A full run to `k = 19` was launched detached
on 2026-08-12 and will close the last two rows; until it reports, **`k = 18,19` remain unconfirmed
by us** and must not be cited as verified. Read `compute/zt_independent_k19.txt` on resume -- the
last line states the number of disagreements, and a nonzero count is a finding, not a nuisance.

STATUS — **extended past round 1 by us (R1 interround compute)**: `compute/zt_mitm.py` decides
`l_k` in about `3^((k+L)/2)` instead of the directive's `3^(k+L)`. The size condition
`F^L(x) < 64^k` becomes an *interval* condition after multiplying by `81^(-h)`, so one sorted array
of tail values plus one binary search per head word replaces the full traversal; exact integers
throughout. It reproduces the known table at every `k <= 14` **and every `L`**, including correctly
refusing every `L` above `l_k`.

With it: **`l_20 = l_21 = l_22 = 7`**, depths round 1 attempted and could not finish. Both `L = 7`
witnesses were checked independently by direct iteration of `F` —
`x = 216248304090500958628365007274291313` at `k=20` (survives all 27 steps, `F^7(x) < 64^20`) and
`x = 10776693605531277921265079567364898929` at `k=21` (survives all 28 steps, `F^7(x) < 64^21`) and
`x = 568601755133692684109341228923275182080` at `k=22` (survives all 29 steps, `F^7(x) < 64^22`) —
so the lower bounds do not rest on the new procedure at all; only the upper bounds do.

**The bound stops being attained at `k = 23`, and the "no slack" constraint we recorded is WRONG.**
Through `k <= 22` the evidence pointed the other way: `l_k` equals `floor((k+1)/3)` at sixteen of the
first twenty-two depths, is never exceeded, and all six slack cases (`k = 2,3,6,8,12,14`) sit at
`k <= 14`, making depths 15–22 eight consecutive tight ones. On that basis this file previously
asserted that any inductive proof "must be exactly tight across that whole run" and that a `k -> k+3`
induction "has no room to spend anywhere in it". **That is now refuted by computation**, and the
refutation is recorded here rather than quietly edited away.

`k = 23` is the depth that decides the question, because it is where the bound steps up: it goes from
7 at `k = 22` to 8 at `k = 23`, and `l_k` does **not** follow. **`l_23 = 7`.** Lower bound: the
witness `x = 2270900874280742359172602454127745503232`, confirmed by direct iteration of `F`
independently of the search (survives all 30 steps, `F^7(x) < 64^23`). Upper bound: exhaustive
refutation of `L = 8` at `k = 23` by `compute/zt_mitm_deep.py`. So `l_k = 7` at all four depths
`k = 20,21,22,23`, `k = 23` is the first slack case since `k = 14`, and the eight-depth tight run was
a bounded accident, not the onset of sharpness.

`k = 24` does the same: **`l_24 = 7`** against a bound of 8, witness
`x = 1424800203566559394756282840425944669417472` confirmed by direct iteration (31 steps,
`F^7(x) < 64^24`), `L = 8` exhaustively refuted. So `l_k = 7` at **five consecutive depths**
`k = 20..24` while the bound climbs to 8, and `k = 23, 24` are two consecutive slack cases.

Two consequences. (i) The induction from `k` to `k+3` **does** have room in the upper range; an
argument spending one step of slack per three base-64 digits is not excluded by the data. (ii) `l_k`
appears to grow strictly slower than `k/3` — increments run `6,6,6` at `k = 17,18,19` then `7,7,7,7`
at `k = 20,21,22,23`, a run of four where the bound runs in threes. So the live question is no longer
whether Conjecture 3.12 is sharp (it is not, at `k = 23`) but what the true growth rate of `l_k` is,
and whether a **strictly better bound** than `floor((k+1)/3)` is provable. A conjecture true with
room is a much easier target than a tight one.

**OUR OWN HEURISTIC WAS WRONG, AND THE CORRECTED ONE PREDICTS CONJECTURE 3.12 IS FALSE.**
`compute/zt_pathspectrum.py` records the model `N(k,L) ~ 3^k (3/64)^L` for the number of nonzero
vertices of `Z_k` with a path of length `>= L`, and reports its ratio as "between 0.4 and 1.9 with
no drift". Both the model and that reading are wrong. The ratios do not scatter about a constant —
at fixed `k` they decay systematically in `L` (at `k=12`: 0.79, 0.66, 0.53). The cause is that the
model counts words surviving `L` more steps but **drops the size condition `F^L(x) < 64^k`**. Since
`F` expands by exactly `81/64`, the states `F^L(x)` spread over `(81/64)^L` times the range, so only
a fraction `(64/81)^L` land back under `64^k`. Hence the per-step factor is not `3/64` but

    (3/64) * (64/81) = 3/81 = 1/27   exactly,      so      N(k,L) = 3^(k-3L).

The measured per-step correction is `0.790` at every depth measurable, against `64/81 = 0.790123` —
not a fitted parameter but the map's own expansion factor. The law is accurate: `N(14,1) = 177144`
against `3^11 = 177147`; `N(15,1) = 531730` against `3^12 = 531441`; worst discrepancy over all
well-populated cells a factor of `1.26`. (`compute/zt_growthrate.py`; counts exact, law heuristic.)

**CORRECTED BY ROUND 2 — the scale is right, the probabilistic reading was WRONG.** This file
previously concluded from the above that the law "predicts Conjecture 3.12 fails", via: a violation
at depth `k` needs `L = floor((k+1)/3)+1` with expected count `3^(k-3L)` = `1/27`, `1/9`, `1/81` for
`k = 0,1,2 mod 3`, each `< 1` but summing to `13/81` per three depths, hence a divergent sum and
infinitely many violations. **That inference does not hold**, and round 2 says exactly why.

`3^(k-3L)` is the **exact average of the carry spectrum `C_{k,L}(c)` over all `81^L` carry phases
`c`** — an identity, not a fitted or equidistribution-based estimate, which is why the measured
constant was so clean. But the zero-trace problem does not live at an average phase. It lives at the
single **pinned phase `c = 0`**, where `C_{k,L}(0) = N(k,L) + 1`, a fibre pinned by the trivial pair
`(0,0)` whose occupancy is already `>= 1` at every first-forbidden length even while the all-phase
mean is `1/27`. A mean over `81^L` phases therefore says nothing about this one distinguished phase,
and Round 2 Prop. 4.1 records the exact logical failure: **divergent first moments are compatible
with both perpetual absence and perpetual presence in a distinguished fibre.** The Poisson
arithmetic built on those means (expectation `1.25` over `k <= 23`) is meaningless for the same
reason and is withdrawn.

**The corrected law was tested prospectively and is 3 for 3.** At `L = 8` it predicts
`3^(k-24)` paths — `1/3` at `k=23`, `1` at `k=24`, `3` at `k=25`: none, borderline, some.
Observed: `l_23 < 8`, `l_24 < 8`, and **`l_25 >= 8`** with witness
`x = 172652492455397099708603514704555883523303360` confirmed by direct iteration (33 steps,
`F^8(x) < 64^25`). It called the two slack depths *and* the return to tightness at `k=25` — a
pattern no "eventually tight" or "eventually slack" story predicts. Note `l_25 >= 8` is what is
proved; `l_25 = 8` exactly needs `L=9` refuted at `m=34`, past this node's memory, and the law puts
that expected count at `3^(25-27) = 1/9`. So **`k=25` is simultaneously a `1 mod 3` depth (the
likeliest violation site) and currently undecided** — the best available target.

### Sub-branch P3-ZT-PINNED-CARRY — what round 2 proved, and the live target   [OPEN]

Proved in `rounds/round-2.tex` (gate PASS, 12 statements / 12 proofs, 219 displays; not compiled):

* the **exact partial inverse** `G` of `F`, and a **midpoint intersection formula**;
* the **exact carry-spectrum law**, giving `3^(k-3L)` as the exact all-phase mean, with
  `C_{k,L}(0) = N(k,L) + 1` tying the pinned fibre to our path counts;
* the difference set of the backward cylinder has support of size exactly **`5^L`**, multiplicities
  `prod_j (3 - |delta_j|)` (i.e. `1,2,3,2,1` per coordinate), and additive energy exactly **`19^L`**
  — *not* the `9^L` an independent-residue model gives, which is the quantitative form of the
  dependence our counting model ignored;
* a **carry second-moment identity**, controlling fluctuations by a cross-correlation of the
  structured `81`-adic difference system against the `64`-adic start system.

**DEAD — global carry injectivity.** An explicit **threefold collision at `(k,L) = (4,2)`** shows no
theorem bounding *every* carry fibre by 1 can hold. Do not pursue that shape.

**FINAL FINITE TARGET — pinned carry repulsion:** `C_{k,L}(0) = 1` for `k <= 3L-2`. The branch is
neither an equidistribution problem nor a global injectivity problem; it is a statement about one
pinned phase, and the carry phase must be tracked through the four-symbol block rather than replaced
by any averaged or translation-invariant statistic.

### Round 3 — the renormalization is exact, and the pinned target is NOT inductively closed

Proved in `rounds/round-3.tex` (gate PASS, 12 statements / 12 proofs, 164 displays; not compiled):

* an **exact two-carry block recursion**, `64^3 c_i = c_{i-1} - t_i + 81^(L_{i-1}) z_i` and
  `81 h_i = h_{i-1} - s_i + 64^(k_{i-1}) z_i`, as the basic state evolution;
* **pinned one-block synchronization**: for `L >= 3` the pinned fibre at `(k+3, L+1)` is exactly the
  accepted part of the fixed old carry window `0 <= c < 64^3`, cut out by one explicit three-step
  forward mask and one one-step backward mask, and **every old pair has at most one pinned
  extension** — so the critical renormalization `(k,L) -> (k+3,L+1)` is exact, not a heuristic
  transfer;
* the **decorated-profile formula**, the low-carry inequality, and **periodic local masks**;
* a **multi-block no-wrap theorem**: the local injections multiply without loss until the first
  modular wrap, so a positive fraction approaching **`0.260472...`** of the critical blocks of any
  pinned trace is synchronized by ordinary positional expansions — the strongest unconditional
  synchronization statement in this branch so far.

**THE OLD ZERO FIBRE IS NOT A CLOSED INDUCTION STATE.** Proposition 11 exhibits an explicit pinned
extension arising from **carry `257792`**: a new pinned solution can come from a *nonzero* old carry
near the top of the fixed `64^3` window. So `C_{k,L}(0) = 1` cannot be pushed by induction on its
own — round 2 set that target and round 3 refuted its closure.

### Round 4 — the preferred first-wrap exclusion is HALF true, and two escapes remain   [OPEN]

Proved in `rounds/round-4.tex` (gate PASS, 12 statements / 12 proofs, 286 displays):

* the **common-lift interpretation of `z`**, the **exact rerouting criterion**, the **least-lift
  first-wrap trichotomy**, the primitive **81-element local code**, the **local-code difference
  law**, and a **2-adic/3-adic valuation sieve**;
* **the preferred incompatibility, in the positive low-carry case**: for a nontrivial critical
  pinned pair of *least positive common lift*, if the first-wrap remainder is positive and
  `c < 64^3`, the right and left masks cannot both pass — else rerouting yields a *smaller*
  positive critical pinned pair, contradicting minimality.

**DEAD — the unconditional one-block mask incompatibility.** Prop 10 gives an explicit positive
critical wrap `(1,3)` with **both** old masks passing at the smallest relevant parameter pair.
**DEAD — uniform local-code spacing.** Prop 12 gives an exact **unit gap at phase `2087`**, so the
local code has gap 1 and no uniform spacing estimate can close the branch.

**The three surviving first-wrap alternatives** for a least critical pinned pair: high old carry
`c >= 64^3`; failure of at least one local mask; or **primitive zero remainder `Y = 0`** (classified
by the 81-element local code, not excluded).

**OBSTRUCTION RENAMED — `primitive-wrap descent`**, with the **high-carry escape** retained as a
parallel open branch. Target: for a least positive critical pinned pair with `Y = 0`, the old words
are `0^k` and `0^L` and the wrap begins at `z = lambda_{k+L}(a,d)`; seek a descent turning the
positive top common lift `64^k 81^L z` into a smaller positive pinned object.

**Note on our compute:** round 4 states plainly that the count-all values through `(25,8)` are used
in **no** proof it gives, and that the unfinished `(25,9)` has no bearing on its conclusions.

**SUPERSEDED — the round-3 obstruction name `first-wrap exclusion`.** After enough blocks are stripped the
no-wrap inequality fails, a nonzero wrap integer `z` appears, and the base-`64^3`/base-`81` digit
synchronization can change discontinuously. The first wrap — not the all-carry average, not global
carry injectivity — is the exact live obstruction. Preferred target: in the critical region
`k <= 3L-2`, the first wrap cannot simultaneously satisfy the right set `R_3` and the left domain
`{0, 19, 62}`.

Round 2 proves neither Conjecture 3.12 nor its failure, and says so; the exact computations through
`k = 25` remain compatible with both. Even the pinned statement would settle only the recurrent
`81/64` subsystem — the global synchronization theorem is still absent.

STATUS — **open**: Conjecture 3.12 (`l_k <= floor((k+1)/3)` for all `k`) is unproved, and is the
branch's whole difficulty. Round 1 states plainly that even proving it settles only the recurrent
$81/64$ compression branch: the global synchronization step tying every hypothetical least
counterexample to that branch is missing, so no cycle and no divergent trajectory is excluded.

ARTIFACTS: `rounds/round-1.tex` §3–§5 and Appendix A; `compute/zt_independent.py`,
`compute/zt_independent_k14.txt`, `compute/zt_independent_k16.txt`, `compute/zt_independent_k17.txt`, `compute/zt_mitm.py`, `compute/zt_mitm_k20.txt`, `compute/zt_pathspectrum.py`.

## Corrections recorded in R1

* **Our brief was wrong twice.** The exhaustive verification limit is Barina's published $2^{71}$
  (2025), not $2^{68}$. And the Bernstein–Lagarias conjugacy is stated for the halved parity map
  `C(x) = x/2` or `(3x+1)/2`; the accelerated odd map is the *first-return map* of `C` on the odd
  integers, not itself the conjugated map. Both are corrected here and in future prompts.
* **`arithmetic_rigidity_transfer_operators.tex` contains a false claim.** It asserts that for
  `d = gcd(K,m) > 1` the quotient `Z[X]/(X^m-2, X^K-3)` is cyclic of order `2^K - 3^m`. R1's
  Prop 2.2 proves the order is `|2^{K/d} - 3^{m/d}|^d` and exhibits `(K,m) = (6,2)`, where the
  quotient is the field of 25 elements — additive group `(Z/5)^2`, not cyclic, and 25 is not
  `2^6-3^2 = 55`. That file had passed the structural audit (every statement carried a proof),
  which is exactly the limit of a structural audit.

  **We verified this correction rather than believing it** (`compute/verify_resultant_correction.py`)
  — it is a claim that a paper already in the repo is false, so it earns a check. Two routes, neither
  using R1's formula as input: the exact Bareiss determinant of multiplication by `X^K-3` on the free
  basis `1..X^{m-1}`, which is the cokernel order, and the Smith normal form, which settles cyclicity
  outright. Over 84 pairs `(K,m)` the order agrees with `|2^{K/d}-3^{m/d}|^d` in **every** case, and
  at `(6,2)` the Smith diagonal is `5,5` — the field of 25 elements, additive group `(Z/5)^2`, exactly
  as R1 says. The correction is in fact **stronger than R1 states**: across all 27 tested pairs with
  `d > 1`, the old claim fails every single time, so it is not a sporadic counterexample but a
  systematic error for every `d > 1`.

## Compute integrity log

Every exactness failure, vacuous check, and mislabelled artifact found anywhere in the campaign is
collected here, once, with its root cause — not repeated inside theorem nodes.

* **R1, our own brief:** the campaign brief given to GPT stated the exhaustive verification limit
  as `2^68` and attributed the Bernstein-Lagarias conjugacy to the accelerated odd map. Both were
  wrong; GPT corrected them (R1 Prop 2.1). Root cause: the brief was written from memory of the
  literature rather than checked against it. Fixed for all later prompts.
* **R1, prior artifact:** the false group-ring claim in
  `arithmetic_rigidity_transfer_operators.tex` (R1 Prop 2.2). Root cause: a resultant computed as
  if `gcd(K,m)=1` in general.
* **R1, GPT's compute:** the depth table through `k=19` rests on GPT's own C++ and its two SHA-256
  digests, none of which we can reproduce (no C++ compiler and no outbound network on this node).
  Depths `1..17` are independently confirmed by `compute/zt_independent.py`; depths `18,19` are
  **recorded but unconfirmed**, and must not be cited as verified.
