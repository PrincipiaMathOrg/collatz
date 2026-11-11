# Coverage and integrity audit

This is an organizational audit. It checks corpus coverage, internal references, dependency completeness, and recorded hashes. It does not rerun every certificate or independently referee every mathematical proof.

## Corpus coverage

| Corpus | Files covered | Notes |
|---|---:|---|
| `agent-code/collatz-research` | 448 | Full recursive SHA-256 inventory |
| `agent-code/collatz-audit-bundle` | 29 | Full recursive SHA-256 inventory |
| Total source corpus | 477 | Recorded in `data/file_inventory.json` |

The research tree contains 118 Markdown files recursively and 117 at its root. Excluding `MASTER_PROOF_SKELETON.md` and `PROOF_LEDGER.md` leaves 115 substantive root notes. Those notes contain no embedded round IDs, so R001-R115 are reconstructed by increasing filesystem `CreationTime`, with filename as a deterministic tie-breaker. This limitation is recorded in every round object and at the head of the [round index](round_index.md).

The audit bundle contains nine legacy source documents, one TeX/PDF audit report pair, one Lean blueprint, the current certificate trust boundary, and prior certificates retained as history. All are present in the file inventory.

The preexisting repository-wide text sweep outside these two source trees found only the website's generic Collatz problem-card seed (`site/scripts/migrate-revisions.sql`) and an AntiDrift smoke-test search string. Neither contains mathematical results to add to the frontier ledger.

## Coverage of the 115 notes

- All 115 notes have a reconstructed ID, source path, local timestamp, title, branch, disposition, canonical destination, and SHA-256 hash.
- The extraction found 173 local code/formal/output references; all 173 resolve to an existing file after unique-filename fallback across the two source corpora.
- R095-R115 are explicitly marked post-master because their timestamps follow `MASTER_PROOF_SKELETON.md`.
- Every note maps to a canonical item in `data/items.json`. This mapping is organizational: it does not claim that every note proves the destination item.

## Skeleton sufficiency audit

| Skeleton | Steps | Open steps | Completion condition |
|---|---:|---:|---|
| `SK-TSC` | 9 | 2 | Binary–ternary stabilization plus cycle integrality obstruction |
| `SK-INV` | 4 | 1 | Stationary inverse-fiber extinction |
| `SK-FCD-HSCI` | 8 | 2 | First-Crossing Descent plus High-Surplus Carry Innovation |
| `SK-YAH` | 7 | 1 | Relative termination of the exceptional rewrite rule |
| `SK-RDC` | 5 | 1 | A finite universal residue-cylinder descent cover |
| `SK-QPOLY` | 6 | 1 | Polynomiality of every conjugate positive integer |
| Total | 54 | 8 | Each route ends in the ordinary Collatz statement |

Every step in `data/skeletons.json` has at least one canonical citation, and every cited canonical ID exists in `data/items.json`. The final step of each skeleton depends on every obstruction type required for a full proof: either a direct strong-induction extinction theorem, or both no divergence and no nontrivial cycles.

The following were deliberately rejected as standalone skeletons because completing them would not prove full Collatz: one-drop cycles, Christoffel/fixed-deformation sectors, \(q=2/q=4\) FCD sectors, negative all-prefix supercriticality, statistical/almost-all drift without uniformization, inverse-tree density alone, and universal spacing without a compression theorem. Rewrite termination, finite residue descent, and q-series polynomiality are retained only with their exact full-problem gates and equivalence/strength warnings.

## Literature coverage

`data/literature.json` contains 30 normalized records. Each supplies authors, title, year, venue, an original DOI/arXiv/journal URL, its role in this corpus, the exact imported claim or context, and a metadata-verification note. The expanded research-program review adds Applegate–Lagarias, Monks et al., Kontorovich–Sinai, and Lagarias–Weiss.

Important provenance repairs include:

- The exponent-(13.3) logarithmic-form estimate is traced from Rhin’s original 1987 chapter to the exact specialization in Simons–de Weger, Lemma 12.
- The Yolcu–Aaronson–Heule paper is normalized as Journal of Automated Reasoning 67 (2023), **Article 15**, not “Paper No. 28.”
- Hercher’s (m\ge92) result is linked with the official June 14, 2026 corrigendum; the corrigendum repairs the proof while preserving the theorem stated in the catalog.
- Rozier–Terracol is recorded as arXiv v5 and Discrete Mathematics 349 (2026), 115167.
- Niu’s arXiv note is marked withdrawn in v2 and retained only as context; no proof gate depends on it.
- Wang’s claimed (m\le95) extension is labeled an unaudited preprint/certificate claim and is not a dependency of any retained skeleton.
- Analogy papers on Cobham theory, fractal uncertainty, substitution cocycles, and moving targets are explicitly `analogy_only`; the Monks q-analog paper is now a checked input to `SK-QPOLY`.

## Literature TeX archive

The per-paper TeX records and the original arXiv source snapshots gathered during this pass are other authors' work and are not included in this public repository. [`data/tex_archive.json`](data/tex_archive.json) keeps their SHA-256 hashes and upstream URLs.

## Existing manifest checks

The non-executing manifest checker produced the following result:

| Manifest | Verified | Mismatch | Missing |
|---|---:|---:|---:|
| `collatz-audit-bundle/certificates/SHA256SUMS` | 10 | 0 | 0 |
| `collatz-research/cycles/certificate_hashes.sha256` | 55 | 0 | 0 |
| `collatz-research/RESEARCH_MANIFEST.sha256` | 17 | 3 | 0 |

The three research-manifest mismatches are:

| File | Manifest hash | Current hash |
|---|---|---|
| `MASTER_PROOF_SKELETON.md` | `eb072187…b6e2b9` | `7500c46f…c0f35` |
| `sync_divergence.md` | `c04e25b5…cb16f` | `0e462e8d…322d6` |
| `inverse_fiber.md` | `f92d886f…e55f11` | `87720b82…947cf` |

The full hashes are in `data/manifest_check.json`. These mismatches are reported, not repaired: the current files appear to have evolved after that manifest was written, and silently rewriting a historical integrity record would destroy provenance.

## Certificate trust boundary

For the all-depth target-one theorem, the final audit bundle declares the following live dependencies:

1. symbolic shell sparsity/injection and analytic tail proof;
2. exact reciprocal-mass table through shell (1000) and its verifier;
3. two exact finite seed scans below the stated cutoff.

The files under `prior_certificates/`—barrier-order, charged/compressed excursion, and (d)-bound programs—are historical and are not promoted back into the theorem’s trust boundary.

For later round certificates, this pass verifies manifest hashes and source existence. The R110 30-vertex full-lattice checker, all three R111 production certificates, and the R112 sharp-growth regression were rerun with their frozen totals. The R113 terminal-deletion probe supplies the exact counterexample to inherited endpoint parity; the older parity probes and the R114 centered-filter program are retained only as conditional-model diagnostics. The R115 packet-container regression checks 207 carries and 492 lifted cells. Its follow-up probes freeze the exactness-only packet and block ceilings and the seven translated top-exact lattice countermodels. These checks were rerun on 26-27 August 2026. This does not claim reproducibility across compilers or runtimes unless a source note and environment record already establish it.

## Known limitations

- Filesystem timestamps recover a plausible exact 114-note order, not authorial round metadata.
- “Closed” reflects the project’s source status unless a separate certificate/audit label is shown; this pass is not an independent mathematical referee report.
- Remote metadata checks establish bibliographic identity and the source’s stated result, not correctness of every imported theorem.
- No attempt was made to solve any open gate.

## Reproduction

From the repository root:

```powershell
& 'agent-code\collatz-frontier\tools\build_indexes.ps1'
```

This regenerates chronology, inventory, and historical hash checks.
