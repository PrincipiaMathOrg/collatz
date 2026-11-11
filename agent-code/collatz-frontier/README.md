# Principia Collatz frontier map

This directory is the organized, nonredundant index over all Collatz material in the repository and the selected external research review: the audited legacy bundle, the reconstructed 100-round research sequence, the later master synthesis, the post-master notes R095-R115, and 30 normalized literature records. It maps the present proof frontier. It does **not** claim a proof of the Collatz conjecture.

## The frontier at a glance

```text
full Collatz
├─ decomposed cycle/divergence routes
│  ├─ SK-TSC       → OPEN-BTS + OPEN-CYCLE-INT
│  └─ SK-FCD-HSCI  → OPEN-FCD + OPEN-HSCI
├─ exact equivalence routes
│  ├─ SK-INV       → OPEN-FIBER-EXT
│  ├─ SK-YAH       → OPEN-REWRITE-RELTERM
│  └─ SK-QPOLY     → OPEN-QPOLY
└─ stronger finite-certificate route
   └─ SK-RDC       → OPEN-DESCENT-COVER
```

The arrows are logical, not estimates of difficulty. The inverse-fiber, rewrite-relative-termination, and q-polynomiality gates are explicitly equivalent to Collatz; the finite descent-cover gate is stronger than Collatz. The decomposed skeletons separately expose the divergence and cycle obstructions.

## Where to start

- [Proof skeletons](proof_skeletons.md) gives the six AntiDrift-style routes—54 steps, 46 closed/implicational and 8 open—with a formal statement, Lean-style pseudocode, and canonical citations for every step.
- [Most promising approaches](most_promising_approaches.md) compares the certificate-oriented, structural, statistical, inverse-tree, q-series, and cycle programs by exact completion gate and known limitation.
- [Result ledger](result_ledger.md) separates closed results, finite certificates, exact open gates, and method ceilings.
- [Round index](round_index.md) maps reconstructed R001-R115 to their current canonical result.
- [Supersession map](supersession.md) explains which earlier branches were absorbed and why they are not separate proof skeletons.
- [Literature catalog](literature.md) records original sources, the exact claim imported, and whether the source is a proof dependency or context only.
- [Coverage audit](coverage_audit.md) states corpus counts, integrity checks, and limitations of this organization pass.

## Machine-readable data

- [`data/skeletons.json`](data/skeletons.json): skeletons, steps, statuses, formal statements, pseudocode, and item citations.
- [`data/items.json`](data/items.json): canonical definitions, theorems, certificates, open gates, and method ceilings.
- [`data/literature.json`](data/literature.json): normalized bibliography and provenance roles.
- [`data/approaches.json`](data/approaches.json): comparative research-program map and exact completion gates.
- [`data/tex_archive.json`](data/tex_archive.json): source/record TeX provenance, SHA-256 hashes, and explicit availability exceptions.
- [`data/rounds.json`](data/rounds.json): reconstructed chronology, hashes, metadata excerpts, branch assignment, and detected evidence references.
- [`data/file_inventory.json`](data/file_inventory.json): SHA-256 inventory of all 477 source-corpus files.
- [`data/manifest_check.json`](data/manifest_check.json): non-executing verification of the three existing hash manifests.

Run [`tools/build_indexes.ps1`](tools/build_indexes.ps1) to regenerate chronology, inventory, and manifest checks.

## Provenance rules

1. A project theorem is marked as project work even when it uses a literature input.
2. A literature input is cited to its original source and, where relevant, to the paper that performs the exact specialization used here.
3. A finite scan remains finite. It is never silently upgraded to an all-depth theorem.
4. An equivalence is labeled as an equivalence, not advertised as a reduction in difficulty.
5. A failed mechanism is preserved as a method ceiling or regression test when it prevents repeated drift into the same dead end.
6. The source files remain authoritative. This directory normalizes dependencies and status; it does not overwrite them.

## Source precedence

For the frontier, use the following order:

1. Post-master notes R095-R115.
2. [`MASTER_PROOF_SKELETON.md`](../collatz-research/MASTER_PROOF_SKELETON.md).
3. Earlier R001–R094 notes for proofs, experiments, and historical lineage.
4. The audit bundle for the negative target-one theorem and its certificate trust boundary.
5. `PROOF_LEDGER.md` and the legacy source documents only as historical provenance where later work supersedes them.
