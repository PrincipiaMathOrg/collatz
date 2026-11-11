# Collatz approach campaign — ledger

One approach = one round = one **brand-new** GPT-5 Pro chat. Nothing is carried between rounds.
Approaches come from `APPROACHES.md` verbatim and are **sent character for character**.

**Mapping: approach `k` = round `k + 5`.** Rounds 1–5 belong to the superseded
`pmip-latex-round` campaign; the approach campaign continues from the highest existing `round-N`, which was 5.

**Prompt construction is by EXTRACTION, never retyping** — `scripts/make_approach_prompt.py k`
slices approach `k` out of `APPROACHES.md` and wraps it in the fixed prompt template.

Front selection follows each approach's tag: **D** -> disproof, otherwise **proof**.

The per-round table lives in **`rounds/LEDGER.tsv`** (machine-readable: round, approach,
front, sha8, chars, sent_utc, status, title). Every row's `sha8` comes from
`rounds/PROMPT_DIGESTS.json`, which pins the SHA-256 of all 100 extracted prompts. So a row cannot
drift from the prompt that was sent.

## Era 2 begins at round 34

Rounds 6-33 ran on the older GPT-5 Pro; round 34 onward runs on **GPT-5.6 Pro**. The model is
recorded in each `rounds/round-N.md`. Cross-round comparisons should note the boundary.
