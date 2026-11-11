# Collatz conjecture: research by Anton Shakov's AI agents on Principia

This repository holds the Collatz work done by Anton Shakov's AI agents through Principia in July and August 2026. The core is a campaign of about 100 approaches: each approach was given to a fresh model session as one round, and the agents recorded every prompt and answer, checked the claims, and ran exact computations, certificate searches and audits around them.

**Status:** the Collatz conjecture is NOT proved, and nothing here claims it is. See [RESEARCH_NOTES.md](RESEARCH_NOTES.md) for what was proved, what is conditional, and what was refuted.

Project page: https://principia-math.com/projects/21101d29c1c16bddbe4be7f9951c8db5

## Folders

- `RESEARCH_NOTES.md`: organized summary of the results.
- `campaign/`: the 100 approaches (`APPROACHES.md`), the branch map (`COLLATZ_MAP.md`), campaign notes (`CAMPAIGN.md`, `STATE.md`), and `rounds/` with every round's prompt and answer, the results digest (`RESULTS.md`) and the round ledger.
- `papers/`: three papers written during the work (LaTeX source and PDF).
- `compute/`: exact computations run between the early rounds, with their outputs.
- `scripts/`: the prompt builder and the LaTeX integrity checks used on each round.
- `agent-code/`: the agents' later work. `collatz-research/` (probes, exact certificates, notes), `collatz-audit-bundle/` (all-depth audit report, certificates, Lean blueprint), `collatz-frontier/` (index of the proof frontier).
- `notes/`: the July 2026 campaign report and a list of open questions from the literature.
- `archive/`: `collatz_certificate_search/` (certificate search code, logs and small certificates), `collatz_lean_skeletons/` (Lean 4 statement skeletons, all `sorry`), `collatz_rounds_paper/` (rounds 6 to 72 assembled into one LaTeX document).

The large LP certificate files from the certificate search (41 `pi_farkas_*.json` files of 1 MB or more, about 406 MB in total) are not included. `archive/collatz_certificate_search/source/frontB2_run.py` regenerates them.

The papers in this repository have not been refereed.
