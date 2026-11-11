# Branch and supersession map

Supersession here means “do not present both as independent full-proof skeletons.” It does not mean the earlier file is wrong or disposable. Earlier notes often contain the proof of a closed subresult, a certificate, or the counterexample that established a method ceiling.

## Chronological authority

| Layer | Role now | Authority rule |
|---|---|---|
| Audit bundle, 17 Aug 2026 | Certified negative (3x-1) target-one theorem and legacy proposals | Authoritative only for its stated certificate trust boundary; not a Collatz proof |
| R001–R094, 17–18 Aug 2026 | Research derivations, finite sectors, certificates, and no-go results | Consult through the round index and canonical item ledger |
| `MASTER_PROOF_SKELETON.md`, 18 Aug 12:20 | Main synthesis of the first 94 rounds | Authoritative unless refined by R095-R115 |
| R095-R115, 18-26 Aug | Post-master cycle, divergence, and FCD refinements | Highest local authority for the affected frontier claims |
| This directory | Dependency/status normalization | Does not replace mathematical proofs in the source files |

The `R001`-`R115` labels are reconstructed from filesystem creation time because the source notes contain no round identifiers. See the [round index](round_index.md).

## Retained full-proof architectures

| Retained skeleton | Lineage | What remains open |
|---|---|---|
| `SK-TSC` | negative target duality → synchronization → fixed-deficit classifications; cycle carry → one-strip/transition/denominator analysis | `OPEN-BTS-01` and `OPEN-CYCLE-INT-01` |
| `SK-INV` | stationary inverse fiber → finite affine envelope → nested Bellman decomposition | `OPEN-FIBER-EXT-01` |
| `SK-FCD-HSCI` | coefficient first crossing → canonical wrap; normalized divergence → carry innovation | `OPEN-FCD-01` and `OPEN-HSCI-01` |
| `SK-YAH` | mixed binary–ternary rewriting → deleted-system normalization → exceptional macrosteps | `OPEN-REWRITE-RELTERM-01` |
| `SK-RDC` | stopping-time descent → affine parity cylinders → finite exact universal cover | `OPEN-DESCENT-COVER-01` |
| `SK-QPOLY` | 2-adic/q-series conjugacy → degree-descending polynomial dynamics | `OPEN-QPOLY-01` |

These are not six mutually disjoint bodies of mathematics. The internal routes share accelerated word calculus and cycle/divergence reductions; the literature-derived routes provide different certificate or coordinate languages. They remain separate because their terminal open statements are genuinely different, even when a gate is known to be equivalent to Collatz.

## Approaches absorbed into the retained skeletons

| Historical branch | Canonical destination | Reason it is not another full skeleton |
|---|---|---|
| Marked-carry refinements beyond the YAH core | `SK-YAH`, `THM-REWRITE-MACRO-01`, `NOGO-REWRITE-01` | The exact YAH termination route is retained, but alternate marked-carry presentations are not separate skeletons: after normalization they have the same accelerated Collatz macrograph. |
| Generic q-analog orbit experiments | `SK-QPOLY`, `THM-QCONJUGACY-01`, `NOGO-QANALOG-01` | Polynomial degree descent is retained only with the genuine conjugacy. The natural binary coefficient map is not a conjugacy, and the missing conjugate-polynomiality gate is equivalent to Collatz. |
| Stopping-time residue searches | `SK-RDC`, `THM-PARITY-CYLINDER-01`, `OPEN-DESCENT-COVER-01` | Individual residue classes and finite depths are certificate components, not separate full routes; only a sound universal cover closes Collatz. |
| Inverse-tree density and almost-all/statistical drift | `THM-REVERSE-DENSITY-01`, `THM-TAO-ALMOSTALL-01`, `NOGO-TYPICAL-UNIFORM-01` | These are rigorous global inputs, but without an exceptional-set elimination theorem they do not exclude one sparse bad orbit and therefore are not standalone skeletons. |
| Negative all-prefix supercriticality | `NOGO-NEGATIVE-01`, `CERT-TARGET1-01` | The desired target-one consequence is already certified, while the all-prefix statement does not by itself exclude both divergence and cycles. |
| Local synchronization, bounded windows, finite compactness | `THM-DIV-FIXEDRAY-01`, `OPEN-BTS-01` | Exact finite countermodels show that the missing theorem must couple infinitely many scales on one fixed ordinary ray. |
| (p)-adic HSCI probes and Bernstein parity series | `OPEN-HSCI-01` plus master §6 regressions | Product-formula and return-decoder cancellations show these are reformulations or insufficient local estimates, not separate routes. |
| Fixed-ray transition/entropy work | `THM-DIV-TRANSITION-01`, `THM-DIV-RETURN-01` | It sharply restricts a divergent ray but does not yet force carry innovation or a smaller ancestor. |
| Christoffel and fixed-shift cycle deformations | `THM-CYCLE-COMPLEXITY-01` | All fixed deformation classes treated are closed; an unrestricted candidate has growing transition complexity. |
| (q=2), (q=4), Ferrers-wrap, and ramp FCD sectors | `THM-FCD-FINITE-01`, `THM-FCD-ONECORNER-01`, `THM-FCD-TWOCORNER-01`, `THM-FCD-THREECORNER-01`, `THM-FCD-FOURCORNER-01`, `THM-FCD-CORNERGROWTH-01`, `THM-FCD-SHARP-CORNERGROWTH-01`, `THM-FCD-TERMINAL-FLUX-01`, `NOGO-FCD-TERMINAL-PARITY-01`, `NOGO-FCD-CENTERED-FILTER-01`, `THM-FCD-PACKET-LIFT-01`, `OPEN-FCD-PACKET-CONTRACTION-01` | R104-R112 exclude one through four corners and force a superlinear-over-logarithmic terminal-preserving cube. R113-R114 show that terminal exactness and fixed parity-centered weights are not preserved under canonical deletion. R115 restores the exact lift and fixed-corner packet container, but packet contraction remains open. |
| One-drop cycle program | `THM-ONEDROP-01`, `OPEN-ONEDROP-01` | Even a complete one-drop theorem would leave all other transition patterns and all divergence untouched. |
| Rotation, prime-power, SNF, quadratic-residue, and linear-conjugacy obstruction programs | `THM-CYCLE-SINGLECLASS-01`, `NOGO-CYCLE-UNIVERSAL-01` | R095–R097 and R100 prove that they recover the same single class (C\bmod D), not independent constraints. |
| Universal min/max spacing and product bounds | `THM-CYCLE-SPACING-01` inside TSC-07 | The spacing lemma is genuinely integer-sensitive but numerically too weak; no all-cycle compression theorem follows yet. |
| “One-drop critical polynomial” and resultant/content strategies | `THM-ONEDROP-01` plus method ceilings | Explicit scalable rational-denominator families defeat denominator-blind size/content arguments. |

## Post-master changes to the master synthesis

### R095–R097: one rank-one residue class

Terminal boundary coupling cancels the terminal (3^L) factor and leaves the same open-block affine recurrence. All-height dyadic representatives are truncations of one integer and eventually freeze; ternary representatives freeze as well. The extra crossing digit is local. None supplies a second global congruence. These results consolidate as `THM-CYCLE-SINGLECLASS-01`.

### R098: exact spacing, insufficient magnitude

For a primitive integer cycle, state spacing and coprimality to (6) yield (M\ge m+3r-4) and a reciprocal-packing inequality. This is valid new information, but it is far from contradicting the known exponential/polynomial cycle envelopes. It consolidates as `THM-CYCLE-SPACING-01` rather than a new skeleton.

### R099: cross-depth divergence bridge

A returned stabilized prefix transports decoder, mass, and product constraints through one lift. For nested returns with depth jumps tending to infinity, gap surplus and the logarithm of the prior lift cannot both be sublinear in the jump. This is the strongest later refinement of the divergence branch and is recorded as `THM-DIV-RETURN-01`; it narrows but does not close `OPEN-BTS-01` or `OPEN-HSCI-01`.

### R100: universal cycle obstruction audit

The Smith normal form is (operatorname{diag}(1,\ldots,1,D)), so the cokernel is (mathbf Z/Dmathbf Z) and the order of the carry class is (q). Local reciprocity tests also collapse. The canonical rational orbit already has the positive, least-state, and strict-record geometry. This establishes `NOGO-CYCLE-UNIVERSAL-01`: a future proof must use information genuinely special to integer lifting, not another word-independent linear residue test.

### R101: full binary--ternary boundary winding

The full dyadic boundary representative \(\rho\) and full ternary endpoint \(Z\) satisfy \(\rho-Z=g\kappa\), where \(g=\gcd(C,D)\) and \(\gcd(\kappa,q)=1\) for \(q>1\). In the audited cycle range, the denominator-one obstruction is exactly the collision \(\kappa=0\). This consolidates as `THM-CYCLE-BOUNDARY-WIND-01`. The observed sign law \(\kappa>0\) is retained separately as `OPEN-CYCLE-WIND-01`; finite checks do not close it.

### R102: fixed dual-tail companion

Every normalized divergent ray has a fixed positive real \(3x-1\) companion driven by the same valuation word. Its reciprocal mass diverges, while the paired positive integer \(3x+1\) orbit has finite reciprocal mass. This consolidates as `THM-DIV-DUAL-TAIL-01`. The integer shell certificate does not apply directly because the companion need not be integral; the synchronized-shell extension is now isolated as `OPEN-HSCI-SYNC-SHELL-01` inside `OPEN-HSCI-01`.

### R103: centered charge and rounding defects

The companion is strictly above \(1\). After centering at \(x+1\) and \(e-1\), every nonunit exponent transfers the nonnegative charge \(2^a-2\) from the real side to the integer side. Ceiling the companion gives an integer defect cocycle, and a divergent portion of its reciprocal mass is forced onto defects \(-2,-1,0\). This consolidates as `THM-DIV-CHARGE-01`. A simple logarithmic stabilization potential and a local floor-or-ceiling shadow transfer are both refuted and recorded as `NOGO-DIV-ROUND-LOCAL-01`. The active task is to prove a summable shell bound on those three defect classes while retaining the paired integer orbit.

### R104: complete one-corner FCD sector

At a \(q_s=2\) weight, the preceding ceiling increment is two. Therefore
the terminal delay first becomes available at the last vertex. A
nondecreasing delay path with exactly one strict increase is forced to be
the ramp-plus-one-drop profile, already proved descending at every depth.
This consolidates as `THM-FCD-ONECORNER-01`: every hypothetical
\(q_s=2,b=1\) strict or equality target has at least two removable Ferrers
corners. The result removes the sharp one-corner obstruction but does not
yet control the anchored interior carry on the remaining punctured cube.

### R105: complete two-corner FCD sector

A two-corner delay path has one interior level and two exponent-one
cylinders. Exact divisibility in those cylinders, together with the target
seed and state envelopes, forces

\[
2^s<7{,}280{,}812s^{45}.
\]

The reverse inequality begins at \(s=415\). An exact certificate excludes
all 2,816,721 two-corner profiles at smaller \(q_s=2\) weights, including
strict targets and denominator-one equality. This consolidates as
`THM-FCD-TWOCORNER-01`: every hypothetical \(q_s=2,b=1\) target has at
least three removable corners.

### R106: logarithmic corner growth

If \(J_1<\cdots<J_c=s-1\) are the corner rows, exact exponent-one
cylinder divisibility gives

\[
2^{J_1}<154s^{15},
\qquad
2^{J_{i+1}}\leq\frac{307s^{15}}2\,2^{2J_i}.
\]

Iteration proves

\[
2^c>\frac{s-1}{\log_2(307s^{15})}.
\]

This consolidates as `THM-FCD-CORNERGROWTH-01`. It repairs the earlier
transition-to-corner no-go in the target class: formal ramp profiles can
have many transitions and one corner, but an actual target has a growing
corner-flux cube. The bound need not survive deletion of the terminal row,
so the minimalization bridge remains open.

### R107: terminal-preserving flux minimalization

Minimizing only among failures whose terminal row remains
\(d_{s-1}=e-1\) preserves the \(q_s=2,b=1\) class. Every nonempty subset
of the nonterminal corners then lies on the FCD branch and satisfies the
exact all-subset flux identity. R106 gives more than

\[
\frac{s-1}{2\log_2(307s^{15})}
\]

distinct vertices in this synchronized cube. This consolidates as
`THM-FCD-TERMINAL-FLUX-01`. The remaining obstruction is no longer loss of
the terminal row under minimalization, but anchored interior-carry
noncancellation across the growing cube.

### R108: direct positive-winding attack

The direct follow-up to the full boundary-winding theorem audits its
endpoint certificate and preserves the exact target \(\rho>Z\). It reduces
the unresolved sign problem to one explicit small-residue branch, but it
does not prove that branch. This note therefore consolidates into the open
gate `OPEN-CYCLE-WIND-01`, not a new closed theorem. The active campaign
subsequently returned to `OPEN-FCD-01` because its full-boundary
\(3\tau\geq s\) probe was the existing First-Crossing Descent condition.

### R109: complete three-corner FCD sector

A three-corner delay path has exactly two interior levels. Its complete
normal form has delays \(0,a,b,e-1\) on four successive blocks, with jump
rows \(J<K<s-1\) and \(1\leq a<b\). The three exponent-one cylinders
force

\[
2^s<4{,}068{,}534{,}644{,}364{,}652s^{105},
\]

whose reverse begins at \(s=1115\). An exact fixed-\(a\)
meet-in-the-middle certificate covers all \(4{,}749{,}737{,}770\)
cylinder-admissible profiles below the cutoff. Across \(1{,}527{,}065\)
circular interval queries and \(120{,}702{,}889\) right-half records, not
even one coarse residue bucket intersects the strict or equality target
interval. This consolidates as `THM-FCD-THREECORNER-01`: every
hypothetical \(q_s=2,b=1\) target has at least four removable corners.
The all-weight gate remains anchored interior-carry noncancellation on the
growing terminal-preserving flux cube.

### R110: absolute paired-shadow loss and full-lattice ceiling

For the paired \(3x-1\) shadow, the absolute endpoint loss satisfies
\(T=D+Z-\rho\). Hence strict positive winding is exactly \(T<D\), or
equivalently a signed shadow-defect inequality. An exact 30-vertex
translated example has a unique failing top above 29 descending proper
terminal-preserving subideals. Thus the complete relative lattice and all
wrap differences cannot determine the sign when absolute endpoint parity
is omitted; the unshifted front term or absolute shadow loss must enter.
The translated example is incompatible with imposing odd endpoints at
every vertex, but R113 shows that canonical deletion does not preserve that
extra condition. Therefore the example remains a valid ceiling for
relative-lattice arguments. This consolidates as `THM-CYCLE-SHADOW-01`
and the qualified `NOGO-CYCLE-LATTICE-01`.

### R111: complete four-corner FCD sector

A four-corner delay path has exactly three interior levels and normal form
\(0,a,b,c,e-1\) on five successive blocks. Its four exponent-one
cylinders force

\[
2^s<\frac{307^7 154^8}{64}s^{225},
\]

whose reverse begins at \(s=2672\). Exact monotone dyadic-prefix pruning
leaves no necessary profile above row \(759\). The remaining rows are
partitioned between a direct reduced-residue certificate through row
\(73\) and an exact projected terminal-seed meet-in-the-middle certificate
from rows \(75\) through \(759\); row \(74\) is not a \(q_s=2\) row.
Full-modulus refinement checks every projected collision and finds no
strict or equality target. This consolidates as
`THM-FCD-FOURCORNER-01`: every hypothetical \(q_s=2,b=1\) target has at
least five removable corners. The full FCD gate still requires anchored
interior-carry noncancellation on the unbounded-corner sector.

### R112: sharp corner-height growth

Put \(\alpha:=\log_2 3\), \(\beta:=\alpha-1\), and
\(R_s:=\log_2(307s^{15})\). If \(h_\ell\) is the height at the \(\ell\)-th
corner and \(g_\ell\) is the next corner gap, exact cylinder divisibility
gives

\[
g_\ell\leq h_\ell+R_s.
\]

The mechanical delay increase then gives the shifted recurrence

\[
h_{\ell+1}+R_s<\alpha(h_\ell+R_s).
\]

Consequently, with

\[
X_s:=
\frac{s-1+R_s/\beta}
{\log_2(154s^{15})+R_s/\beta},
\]

every target with \(c\) corners satisfies

\[
\alpha^{c-1}>X_s,
\qquad
2^{c-1}>X_s^{\log_\alpha2}.
\]

The exponent is \(1.505007\ldots>3/2\), with the last inequality certified
by exact integer comparisons. This consolidates as
`THM-FCD-SHARP-CORNERGROWTH-01` and sharpens the R107
terminal-preserving cube to more than
\((s/O(\log s))^{1.505007\ldots}\) vertices.

### R113: terminal exactness is not deletion-stable

The attempted parity compression assumed that every canonical child of an
odd-endpoint profile also has odd endpoint. The \(s=8\) delay vector

\[
(0,0,0,0,0,0,2,4)
\]

refutes this. Its canonical point is \((3903,3127)\). Deleting corner
\((6,2)\) gives \((191,154)\), so the child endpoint is even. The cell has
\(L_c=4480\) and \(V_c=892\), yet

\[
V_c\bmod2=0,
\qquad
\left\lfloor\frac{3903+4480}{8192}\right\rfloor=1.
\]

Thus terminal-row preservation does not imply terminal exactness, and the
zero next-inverse-bit condition is unavailable. This consolidates as
`NOGO-FCD-TERMINAL-PARITY-01`.

### R114: the centered-filter reduction is conditional only

R114 attempted to center each cell by \(V_c\bmod2\) and thereby replace
the complete lattice by a fixed-weight filter minimum. The R113 witness
directly refutes the required cover identity. The actual wrap depends on
the current canonical start, so the fixed centered weights do not
linearize unconditional FCD deletion.

The dynamic program and its finite counts remain exact for the stronger
odd-endpoint model, but they are not FCD minimality certificates. This
consolidates as `NOGO-FCD-CENTERED-FILTER-01`. A valid continuation must
retain state-dependent wraps or prove a new terminal-lift theorem.

### R115: exactness-lifted packet container

R115 restores the terminal bit without reinstating the retracted parity
shortcut. The lifted residue

\[
\widehat\rho=[-CP^{-1}]_{2M}
\]

projects to the canonical start modulo \(M\), records endpoint parity, and
translates exactly under cell deletion. The same note gives a unique
corner-packet normal form and proves that every fixed corner count is an
effective finite problem. The five-corner sector is localized to
\(s<6071\), but has not been enumerated.

Exact enumeration through \(s=20\) also shows that endpoint exactness alone
does not force a packet deletion: \(21{,}839\) odd-endpoint profiles have no
exact single-packet contraction. Even consecutive-block deletion fails for
\(19\) profiles through \(s=18\). The first witnesses are descending, so
this does not refute the color-sensitive target. It consolidates as
`NOGO-FCD-EXACTNESS-CONTRACTION-01`.

For one \(s=8\) shape, seven translated virtual carries have an odd top
endpoint and all \(29\) proper terminal-preserving subideals descending,
but none is the anchored carry. Thus exactness and full relative color data
still do not determine the absolute anchor. This consolidates as
`NOGO-FCD-LIFTED-LATTICE-01`.

The lifted container consolidates as `THM-FCD-PACKET-LIFT-01`. The new localized gate
`OPEN-FCD-PACKET-CONTRACTION-01` asks whether every exact non-descent with
at least five corners has a proper exact non-descent after packet deletion.
It is open and only addresses the \(q_s=2\) branch.

## Historical files retained only for provenance

- [`PROOF_LEDGER.md`](../collatz-research/PROOF_LEDGER.md) is an early ledger superseded by the master and post-master audit.
- The nine files in [`source_documents`](../collatz-audit-bundle/source_documents) preserve the route history and bibliographies. Their frontier claims are normalized here against later results.
- `prior_certificates/` in the audit bundle records earlier barrier-order, charged-excursion, and (d)-bound programs. The bundle README explicitly excludes them from the final target-one theorem’s trust boundary.
