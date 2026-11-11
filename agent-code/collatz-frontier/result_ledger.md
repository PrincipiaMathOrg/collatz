# Canonical result and frontier ledger

This ledger is the nonredundant mathematical layer above the 100-round archive. It distinguishes what the project treats as closed, what is computer-assisted, what remains open, and what was learned only as a limitation of a method. Machine-readable records, including dependencies and evidence paths, are in [`data/items.json`](data/items.json).

## Status discipline

- **Closed** means the project supplies a mathematical proof. This organization pass checks statement/dependency flow; it is not a new line-by-line referee report.
- **Certified** means the claim has a stated finite/computational trust boundary. The audit-bundle hashes all verify, but hash agreement proves artifact identity—not mathematics or faithful execution.
- **Open** means the statement is still unproved. No finite scan is promoted to an all-depth theorem.
- **Method ceiling** means a counterexample, equivalence result, or rank-collapse theorem explains why a proposed mechanism cannot by itself finish the proof.

The source archive must remain the authority for full proofs and hypotheses. The starting points are [`MASTER_PROOF_SKELETON.md`](../collatz-research/MASTER_PROOF_SKELETON.md) and the post-master notes R095–R107 in the [round index](round_index.md).

## Normalized language

For a positive odd integer \(x\),

\[
U(x)=\frac{3x+1}{2^{v_2(3x+1)}}.
\]

For a valuation word \(a=(a_0,\ldots,a_{r-1})\), write

\[
A_k=\sum_{i<k}a_i,
\qquad C_0=0,
\qquad C_{k+1}=3C_k+2^{A_k},
\qquad D_k=C_k+2^{A_k}.
\]

The affine identity is

\[
2^{A_k}x_k=3^kx_0+C_k.
\]

A strict barrier has \(2^{A_k}<3^k\) at every nonempty prefix. These definitions are `DEF-U-01`, `DEF-WORD-01`, and `THM-AFFINE-01`.

## Closed and certified spine

| ID | Status | Canonical content | Principal evidence |
|---|---|---|---|
| `THM-AFFINE-01` | closed | Affine word calculus, concatenation, and suffix divisibility | master §2; Lean blueprint |
| `THM-BARRIER-DUALITY-01` | closed | Exact target duality with the positive \(3x-1\) shadow | master §2; audit paper |
| `CERT-SHELL-01` | certified | Reciprocal mass \(<10.789\) for every finite positive simple negative path | audited shell table/verifier/tail |
| `THM-FIXED-TARGET-01` | closed | A strict-barrier negative path ending at \(y\) starts below \(3^{11}y\) | master §2 |
| `CERT-TARGET1-01` | certified | Strict barrier plus \(3^r\mid D_r\) forces \(1^r\) | two exact seed implementations |
| `CERT-DEFICIT23-01` | certified | Complete deficit-two and deficit-three word lists | master §2 and audit bundle |
| `THM-DIV-NORM-01` | closed | A divergent orbit normalizes to an infinite strict barrier with surplus tending to \(\infty\) | master §3 |
| `THM-DIV-FIXEDRAY-01` | closed family | Return lattice, decoder transport, complexity lower bounds, periodic/Sturmian exclusions | master §§2–3 |
| `THM-DIV-TRANSITION-01` | closed | General \(\Omega(\sqrt{s})\) transition growth; stronger bounded-height bounds | master §3 |
| `THM-DIV-RETURN-01` | closed | Post-master cross-depth return/mass/product collapse and gap dichotomy | R099 |
| `THM-DIV-DUAL-TAIL-01` | closed | A normalized divergent ray has a fixed real \(3x-1\) companion with divergent reciprocal mass, paired with finite reciprocal mass on the integer \(3x+1\) side | R102 |
| `THM-DIV-CHARGE-01` | closed family | Companion floor, centered charge transfer, ceiling defect cocycle, and divergent mass localization to defects \(-2,-1,0\) | R103 |
| `THM-DIV-RECORD-ARBITRARY-PREFIX-MIN-01` | closed | For every fixed orbit segment, the unique least same-depth predecessor of its endpoint is the original start or the already classified local half-seed | arbitrary-prefix inverse-rigidity proof |
| `THM-DIV-RECORD-VARDEPTH-REDUCTION-01` | closed | Every longer predecessor factors into an inverse prefix and one of three exact same-depth suffix cases | variable-depth reduction proof |
| `THM-DIV-RECORD-EXCESS2-DECODER-01` | closed | Every exact excess-two prefix belongs to one of two explicit finite \(3\)-adic families | excess-two decoder proof |
| `THM-DIV-RECORD-EXCESS3-DECODER-01` | closed | Every exact excess-three prefix belongs to one of four explicit finite \(3\)-adic families | excess-three decoder proof and exhaustive verifier |
| `THM-DIV-RECORD-SHARP-PREFIX-01` | closed | Every exact inverse prefix satisfies a sharp two-sided interval; at fixed endpoint, its excess grows with asymptotic slope at least \(\log_2(3/2)\) | carry-rearrangement proof and exhaustive composition verifier |
| `THM-DIV-RECORD-QPLUS2-EXCLUSION-01` | closed | The zero-defect same-depth suffix start \(q+2\) is impossible for every finite record-atom word | first-atom distortion proof and 187-case exact transition certificate |
| `THM-DIV-RECORD-JACOBSTHAL-SUFFIX-01` | closed | Every positive-defect suffix satisfies \(r\geq2^\delta q-(2^\delta-(-1)^\delta)/3\) | phase-strip proof and 1,030-case canonical transition certificate |
| `THM-DIV-RECORD-CARRY-POSITION-01` | closed | The slack from both sharp prefix endpoints is an exact weighted sum of the cumulative excesses \(p_k\), giving a simultaneous finite screen at every position | carry-position proof and 1,217,711 exact squeeze checks |
| `THM-FIBER-EQUIV-01` | closed | Stationary inverse-fiber extinction is equivalent to Collatz | master §5; inverse Lean skeleton |
| `THM-FIBER-ENV-01` | closed family | Finite affine envelope, nested Bellman decomposition, fixed-progression exposure | master §§2,5 |
| `DEF-REWRITE-YAH-01` | closed imported definition | Eleven-rule mixed binary–ternary rewrite system for the shortcut Collatz map | Yolcu–Aaronson–Heule |
| `THM-REWRITE-SIM-01` | closed imported equivalence | Full rewrite termination is equivalent to ordinary Collatz convergence | Yolcu–Aaronson–Heule, simulation theorem |
| `THM-REWRITE-MACRO-01` | closed family | Every one-rule deletion terminates; the selected ten-rule subsystem has a unique canonical normal form, and exceptional macrosteps are exactly accelerated odd Collatz steps | Yolcu–Aaronson–Heule; continuation report |
| `THM-STOPPING-DESCENT-01` | closed equivalence | Collatz iff every \(n>1\) has a finite iterate below \(n\) | Terras; strong induction |
| `THM-PARITY-CYLINDER-01` | closed family | Finite parity vectors are exact residue cylinders on which the shortcut iterate is affine | Terras; affine word calculus |
| `THM-STRONG-SUFFICIENT-01` | closed imported family | Every orbit hits \(2\bmod9\); every divergent orbit or nontrivial cycle hits \(20\bmod27\) | Monks et al. |
| `THM-REVERSE-DENSITY-01` | closed computer-assisted theorem | At least \(x^{0.84}\) integers below \(x\) have 1 in their forward orbit | Krasikov–Lagarias |
| `THM-TAO-ALMOSTALL-01` | closed imported theorem | Almost every orbit in logarithmic density has an almost-bounded minimum | Tao |
| `DEF-QSERIES-01` | closed imported definition | The family \(T_{A,B}\) on \(\mathbf F_2[[q]]\) and its conjugacy language | Monks |
| `THM-QCONJUGACY-01` | closed imported family | All odd-parameter q-maps are conjugate to \(T\); the selected map has completely descending polynomial dynamics | Monks, Theorems 1 and 3 |
| `THM-CYCLE-REDUCE-01` | certified reduction | A nontrivial cycle yields a strict-record one-strip word, minimum \(>2^{71}\), and \(r\ge72{,}057{,}431{,}991\) | master §4 and imported bounds |
| `THM-CYCLE-COMPLEXITY-01` | closed family | Fixed support/transitions/deformations closed; every survivor is transition-complex | master §4 |
| `THM-CYCLE-SINGLECLASS-01` | closed family | All audited rotation/all-height/SNF constraints reduce to \(C\bmod D\), with \(q=D/\gcd(D,C)\) | R095–R097, R100 |
| `THM-CYCLE-SPACING-01` | closed | Integer spacing \(M\ge m+3r-4\) and reciprocal packing | R098 |
| `THM-CYCLE-BOUNDARY-WIND-01` | closed | The full dyadic start \(\rho\) and ternary endpoint \(Z\) satisfy \(\rho-Z=g\kappa\), with \(\gcd(\kappa,q)=1\) for \(q>1\); in the audited cycle range, denominator one is exactly \(\kappa=0\) | full boundary-winding note and exact probes |
| `THM-CYCLE-WIND-CST-01` | closed | Negative winding at the least rational rotation produces a coefficient-contractive integer segment whose start is its strict minimum | boundary-winding note; Terras/Rozier–Terracol terminology |
| `THM-CYCLE-SHADOW-01` | closed | The absolute paired-shadow loss satisfies \(T=D+Z-\rho\); hence positive winding is exactly \(T<D\), equivalently a signed shadow-defect inequality | R110; exact affine identity |
| `THM-CYCLE-BALROUND-01` | closed reduction | In the coprime binary branch, denominator one makes the endpoint quotient an integral periodic orbit of the balanced maps \(u\mapsto\operatorname{nint}(2u/3)\) and \(u\mapsto\operatorname{nint}(4u/3)\); endpoint admissibility is exactly discrepancy one in ordinary coefficient order | balanced-rounding duality note and exact coefficient recurrence |
| `NOGO-CYCLE-RECIPDUAL-01` | method ceiling | Multiplication by the explicit unit \((\theta-1)^{-1}\) turns the endpoint into positive digits \(1,2\), but parity normalization reconstructs only a cyclic rotation of the original word, not an independent integer cycle | reciprocal endpoint theorem and 43,045-profile regression |
| `CERT-CYCLE-BALROUND-400-01` | certified finite family | Every coprime binary coefficient orbit through \(r=400\) is excluded; among 727,190 rigorously bounded coefficient seeds, only two endpoint shapes occur, and both force \(a_0=0\) | `binary_coefficient_rounding_probe.js`; 244 coprime rows |
| `NOGO-CYCLE-LATTICE-01` | method ceiling | A translated 30-vertex complete terminal-preserving subideal lattice has one failing top and 29 descending proper vertices; the attempted endpoint-parity repair is not inherited by canonical corner deletion | R110 and corrected R113; exact probes |
| `THM-FCD-REDUCE-01` | closed reduction | First-crossing descent reduces to a canonical wrap inequality, with \(\tau\ge s/3\) sufficient | master §5 |
| `THM-FCD-FINITE-01` | certified family | All weights through 40 plus several \(q=2\), \(q=4\), and ramp layers | master §6; certificate manifests |
| `THM-FCD-ONECORNER-01` | closed | The ramp-plus-one-drop word is the complete \(q_s=2,b=1\) one-corner sector; every residual target has at least two removable corners | R104; exact classification audit |
| `THM-FCD-TWOCORNER-01` | certified | Every \(q_s=2,b=1\) target has at least three corners; two corners have cutoff \(s<415\), and 2,816,721 smaller profiles are excluded exactly | R105; exact certificate |
| `THM-FCD-THREECORNER-01` | certified | Every \(q_s=2,b=1\) target has at least four corners; three corners have cutoff \(s<1115\), and an exact fixed-\(a\) certificate covers all 4,749,737,770 cylinder-admissible profiles below it | R109; exact meet-in-the-middle certificate |
| `THM-FCD-FOURCORNER-01` | certified | Every \(q_s=2,b=1\) target has at least five corners; four corners have cutoff \(s<2672\), and exact dyadic-prefix plus reduced-residue certificates cover every smaller row | R111; exact projected meet-in-the-middle certificates |
| `THM-FCD-CORNERGROWTH-01` | closed | Target-sensitive cylinder recurrence gives \(2^{|K(I)|}>(s-1)/\log_2(307s^{15})\), so the removable-corner count grows logarithmically | R106 |
| `THM-FCD-SHARP-CORNERGROWTH-01` | closed | Retaining the actual height gives corner multiplier \(\log_2 3\), so the terminal-preserving cube has more than \((s/O(\log s))^{1.505007\ldots}\) vertices; the exponent is exactly greater than \(3/2\) | R112; analytic proof and exact regression |
| `THM-FCD-TERMINAL-FLUX-01` | closed | Fixed-terminal minimalization preserves \(b=1\) and yields a synchronized all-subset flux cube on the nonterminal corners, now with the R112 superlinear-over-logarithmic vertex bound | R107, sharpened by R112 |
| `NOGO-FCD-TERMINAL-PARITY-01` | method ceiling | Canonical corner deletion can change an odd endpoint to an even endpoint; therefore terminal-row preservation does not justify parity compression or a zero next-inverse-bit condition | corrected R113; exact \(s=8\) witness |
| `NOGO-FCD-CENTERED-FILTER-01` | method ceiling | The fixed parity-centered cell weights do not linearize unconditional covers because \(V_c\bmod2\) need not equal the actual dyadic wrap; the filter dynamic program is conditional only | corrected R114; same exact witness |
| `THM-FCD-PACKET-LIFT-01` | closed family | Every fixed corner count has a unique packet normal form and an effective finite cutoff; the lifted residue modulo \(2M\) exactly records terminal parity and obeys corner-deletion translation | R115; analytic proof and exact regression |
| `THM-FCD-DENUM-MOBIUS-01` | closed reduction | Below \(MD\), the FCD color is the gap indicator of the numerical semigroup \(\langle M,D\rangle\); a terminal-preserving minimal failure has lattice Möbius charge \(-1\), equivalently one anchored coefficient of \(\prod_c(1-z^{\Delta_c})/((1-z^M)(1-z^D))\) equals \(1\) | numerical-semigroup Möbius note; exact generating-function proof |
| `CERT-FCD-MOBIUS-20-01` | certified finite family | Every anchored \(q_s=2\) corner cube through \(s=20\) has zero top Möbius charge: 2,029,916 profiles and 211,157,316 cube vertices; 8,300 deterministic large-row samples through \(s=1000\) also have zero charge | `q2_boolean_mobius_probe.js`; large-row falsification probe |
| `NOGO-FCD-ANCHORFREE-DEGREE-39-01` | method ceiling | A genuine \(q_s=2\) Ferrers geometry at \(s=1000\) has 39 nonterminal corners and a translated carry \(C_*=5D\) whose top is representable while all \(2^{39}-1\) proper corner vertices are gaps; high dimension, all Frobenius scales, and the complete cube do not force cancellation without the absolute anchor | `q2_translated_high_dimension_puncture.js`; exact aggregate inequalities |
| `THM-CYCLE-CRITICAL-CLASS-01` | closed reduction | The accelerated cycle equations are \(L_ax=\mathbf1\) for an irreducible nonsingular cyclic \(M\)-matrix with determinant \(D\) and cyclic cokernel; denominator one is exactly \([\mathbf1]_a=0\), and the \(q_s=2\) ballot rotation supplies an explicit root-minimal burning script | critical-group note; exact matrix and Smith-minor proof |
| `NOGO-CYCLE-ONES-SUPERSTABLE-01` | method ceiling | The distinguished all-ones class need not be represented by a superstable all-ones configuration: the strict \(q_s=2\) word \((1,2,2)\) has \(\mathbf1-L_a\mathbf1=(0,2,0)\geq0\) | critical-group note; exact three-state witness |
| `NOGO-FCD-EXACTNESS-CONTRACTION-01` | method ceiling | Exactness alone does not force packet contraction; 21,839 odd-endpoint profiles through \(s=20\) have no exact single-packet deletion, and 19 through \(s=18\) have no exact consecutive-block deletion | post-R115 exact probes; the first witnesses descend, so the full color-sensitive gate remains open |
| `NOGO-FCD-LIFTED-LATTICE-01` | method ceiling | Top exactness plus all 29 proper-subideal colors still does not recover the absolute anchor; seven translated virtual carries realize that data without being Collatz carries | post-R115 exact translated-lattice probe |
| `THM-ONEDROP-01` | closed/certified family | Deep one-drop restrictions; exact profiles through \(r=34\); a survivor has rise \(U\ge408{,}126\) | R053–R097 |

The audit bundle's theorem is deliberately named `CERT-TARGET1-01`: it concerns the negative accelerated \(3x-1\) target-one barrier language. It is not itself a theorem that all positive Collatz orbits reach \(1\).

## Exact open gates

| ID | Gate | What closing it buys | Current boundary |
|---|---|---|---|
| `OPEN-BTS-01` | Exclude every smaller variable-depth predecessor, or construct one | Excludes the record-renewal branch of an unbounded orbit by minimality | Same-depth predecessors and excess \(0,1,2,3\) are classified, \(q+2\) is impossible, positive-defect suffixes satisfy the Jacobsthal bound, and every deep prefix must pass exact cumulative-excess screens at all positions; the coupled deep branches remain open |
| `OPEN-CYCLE-INT-01` | \(D\nmid C(a)\) for every nontrivial primitive strict-record one-strip word | Excludes every nontrivial positive cycle | All word-independent linear/residue tests audited so far see only the same class \(C\bmod D\) |
| `OPEN-CYCLE-BALDISCREP-01` | Exclude discrepancy-one periodic balanced-rounding orbits in every coprime binary row | Excludes the complete coprime binary denominator-one branch | Exact reduction and all rows through \(r=400\) are closed; an all-depth Euclidean induction in the transverse ordinary and \(e\)-step orders is missing |
| `OPEN-CYCLE-WIND-01` | \(\kappa>0\), equivalently \(\rho>Z\), for every nontrivial primitive strict-record one-strip word | Sufficiently strengthens `OPEN-CYCLE-INT-01` and excludes every nontrivial positive cycle | R110 rewrites the gate as \(T<D\); R113 shows that canonical deletions do not preserve the terminal parity needed for the attempted repair, so the absolute front term and state-dependent wraps remain uncontrolled |
| `OPEN-FIBER-EXT-01` | \(\forall n>1\) odd, \(\exists r: M_r(n)<n\) | Proves full Collatz directly by strong induction | Exact reformulation/equivalent statement; the moving exposed minimum is uncontrolled |
| `OPEN-FCD-01` | \(\rho(w)>Z(w)\) for every nonboundary first crossing | Excludes every nontrivial cycle | R104-R112 exclude one through four corners, R113-R114 retract the parity-centered shortcut, and R115 supplies the exact terminal lift; packet contraction is still open in the \(q_s=2\) branch, while all other weights and the absolute carry remain uncontrolled |
| `OPEN-FCD-PACKET-CONTRACTION-01` | Every exact \(q_s=2,b=1\) non-descent with at least five corners contracts to a proper exact non-descent with fewer packets | Closes the residual \(q_s=2\) branch by descent to the excluded four-corner sector | R115 supplies the exact lifted container; the exactness-only version is false, so any proof must use FCD color; this would not close other FCD weights or divergence |
| `OPEN-FCD-MOBIUS-PARITY-01` | Exclude the odd anchored denumerant coefficient forced by a terminal-preserving minimal \(q_s=2,b=1\) failure | Closes the residual \(q_s=2\) branch without choosing a particular packet contraction | The coefficient is a coupled Fourier-Dedekind sum with distinct characteristic-two Frobenius scales; translated carries realize coefficient one, so the absolute Ferrers anchor must enter the proof |
| `OPEN-HSCI-01` | Prove that no positive accelerated Collatz orbit is unbounded | Excludes divergent orbits | After normalization, the companion argument reduces this to the explicit summability contradiction in `OPEN-HSCI-SYNC-SHELL-01` |
| `OPEN-HSCI-SYNC-SHELL-01` | Use the paired integer orbit to prove \(\sum_{d_j\in\{-2,-1,0\}}1/m_j<\infty\) | Contradicts the proved divergence of the same sum and excludes unbounded orbits | Local shadows and simple logarithmic potentials do not suffice; the estimate must retain one fixed paired orbit across all scales |
| `OPEN-REWRITE-RELTERM-01` | The exceptional odd rule terminates relative to the other ten rules | Proves termination of the complete rewrite system and hence Collatz | Equivalent to Collatz after exact macrosemantic quotienting; requires a genuinely new finite rank or transition certificate |
| `OPEN-DESCENT-COVER-01` | A finite exact residue/parity-cylinder cover supplies descent below every \(n>1\) | Proves full Collatz by the stopping-time equivalence and strong induction | Stronger than Collatz; no theorem guarantees a finite cover or a bounded search depth |
| `OPEN-QPOLY-01` | A conjugacy \(H\) to \(T_{1,1+q^2}\) maps every positive integer to a polynomial | Places every integer in the classified degree-descending q-dynamics, hence proves Collatz | Explicitly equivalent to Collatz; the natural coefficient-reading map is not a conjugacy |
| `OPEN-ONEDROP-01` | A genuinely \(q=1\)-sensitive late-lift/compression theorem in the one-drop family | Closes only the one-drop cycle sector | Not a full-cycle or full-Collatz gate |

`OPEN-FIBER-EXT-01` and `OPEN-HSCI-01` are honest equivalence gates, not claims of reduced difficulty. They remain useful because they localize the exact object a future theorem would have to control.

## Method ceilings and regressions

- `NOGO-CYCLE-UNIVERSAL-01`: rotations, prime powers, block SNF, quadratic residues, and linear conjugacies recover one cyclic obstruction class, not independent congruences. The rational \(3x+q\) orbit already supplies the same positivity/record geometry.
- `NOGO-REWRITE-01`: the exact rewrite quotient is the accelerated Collatz graph. SK-YAH is retained as a distinct automated-certificate architecture, but its residual gate is not a reduction in mathematical difficulty.
- `NOGO-QANALOG-01`: polynomial q-orbits are easy only in the selected q-dynamics. Ordinary positive integers enter that sector through a true conjugacy exactly when Collatz holds; binary coefficient reading does not bridge the systems.
- `NOGO-TYPICAL-UNIFORM-01`: random-model drift, power-law inverse-tree density, and logarithmic-density almost-all descent cannot exclude one sparse exceptional orbit without a deterministic uniformization theorem.
- `NOGO-NEGATIVE-01`: all-prefix negative supercriticality remains open, while its intended target-one consequence is already certified; it therefore is not a full skeleton.
- `NOGO-DIV-ROUND-LOCAL-01`: a simple logarithmic finite-companion potential is false, and many local floor-or-ceiling exact edges need not contain a long coherent integer negative shadow.
- Local synchronization, finite compactness, finite forbidden factors, bounded windows, simple entropy counts, primitive-prime order arguments, denominator-blind resultants, and several \(p\)-adic/product-formula attacks have explicit counterexamples or exact cancellation identities in master §6.
- The one-drop branch, bounded-shift classifications, Christoffel cases, and \(q=2\)/\(q=4\) layers are substantial closed sectors. They are not promoted to proof skeletons because completing any one of them would still leave unrestricted cycles, divergence, or both.

## Frontier in one sentence

All surviving branches demand a global uniformity law that singles out actual positive-integer orbits from abundant rational, \(2\)-adic, q-series, local, or typical shadows: cross-prime synchronization on one infinite ray, extinction of a moving inverse-fiber minimum, a finite all-residue descent certificate, relative rewrite termination, q-conjugacy polynomiality, or a positive full-boundary winding law for an unbounded-transition cycle word.
