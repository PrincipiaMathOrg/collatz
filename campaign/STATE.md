# STATE — Collatz campaign

**Round 5's target: primitive-wrap descent.** For a least positive critical pinned pair with
first-wrap remainder `Y = 0`, the old words are `0^k` and `0^L` and the wrap begins at
`z = lambda_{k+L}(a,d)`; derive the phase-shifted dynamics on `z` from the remaining upper no-wrap
blocks and seek a descent turning the positive top common lift `64^k 81^L z` into a smaller positive
pinned object. The parallel open branch is the **high-carry escape** `c >= 64^3`.

**COMPUTE POLICY CHANGE — round 4 said our numbers fed none of its proofs.** Eleven exact cells were
computed and used in no mathematics. The round-5 prompt says so plainly, asks GPT to attack the
descent WITHOUT waiting on compute, and asks it to name the shortest list of strip-profile /
local-code numbers that would actually change its next step -- then compute exactly those and
nothing else. Do not queue speculative cells again. `(25,9)` is still running (>2h, `3^19` heads)
and its value is already implied to be 0 by `l_25 = 8`; the prompt offers to kill it and awaits
GPT's preference. Not implemented, deliberately: `zt_strip_profile.py`, `zt_local_code.py`,
`(28,10)`.

**COUNT-ALL TABLE — 11 of 12 cells exact** (`compute/counts_table.json`), format `(k,L): N / C(0)`:
`(20,7): 1/2`, `(20,8): 0/1`, `(21,7): 1/2`, `(21,8): 0/1`, `(22,7): 5/6`, `(22,8): 0/1`,
`(23,7): 7/8`, `(23,8): 0/1`, `(24,7): 23/24`, `(24,8): 0/1`, `(25,8): 3/4`. Only `(25,9)` remains
(m=34, h=19, the multi-hour one; its value is already implied to be 0 by `l_25 = 8`). Every positive
cell carries a witness confirmed by direct iteration of `F`.

**Round-3 compute status.** Done: (a) count-all mode in `zt_mitm_deep.py`
(`--count`, `--validate-counts`), validated **0 disagreements** against the complete traversal for
every `k <= 12` and every `L <= l_k+1`, independently confirming `C_{k,L}(0) = N(k,L)+1` on every
cell. In progress: (b) the twelve-cell exact count table, `compute/run_counts.py` -> `counts_table.txt`
and `counts_table.json`, cheapest-first. Landed so far: `N(20,7)=1`, `N(20,8)=0`, `N(21,7)=1`,
`N(21,8)=0`, `N(22,7)=5`, `N(22,8)=0`, `N(23,7)=7`, `N(23,8)=0`; `(24,7),(24,8),(25,8),(25,9)`
still running, `(25,9)` being the multi-hour one. **NOT done:** `zt_carry_small.py` (item c, re-verifying round 2's `5^L`/`19^L`/
second-moment theorems) was written but deliberately NOT run, and round 3's prompt says so plainly
rather than implying those are confirmed. Item (d), `(28,10)` at `h=22`, is `3^22` on the streaming
side, ~80x the `(25,9)` run: not started, and the prompt asks GPT whether it is worth a long
background job at all.

Round 1 COMPLETE: `rounds/round-1.tex` (36448 chars, gate PASS, 14 statements / 14 proofs),
independently verified through depth 17, mapped as branch P3-ZT-RESIDENCE, pushed.

**Interround compute already done (all pushed, all in `compute/`):**
* `zt_independent.py` -- our own traversal from the definitions; agrees with R1 for every `k <= 17`.
* `zt_pathspectrum.py` -- survivor counts follow `3^k (3/64)^L`, which is why R1's `3^(k+L)`
  enumeration is the wrong algorithm.
* `zt_mitm.py` -- meet-in-the-middle at `~3^((k+L)/2)`, validated at every `k <= 14` and every `L`.
  **Gives `l_20 = l_21 = l_22 = 7`**, four depths past R1, each witness confirmed by direct
  iteration of `F`.
* Structure, **CORRECTED 2026-08-12 by `l_23`**: through `k <= 22` the bound was attained at 16 of
  22 depths with every slack case at `k <= 14`, i.e. depths 15..22 eight consecutive tight ones,
  and we recorded that a `k -> k+3` induction "has no room in the upper range". **That is refuted.**
  `l_23 = l_24 = 7` while `floor((k+1)/3) = 8` at both, so `k = 23` is the first slack case since `k = 14`,
  the tight run was bounded, and the induction DOES have room. `l_k` looks like it grows strictly
  slower than `k/3` (`6,6,6` at `k=17,18,19`, then `7,7,7,7` at `k=20..23`), which reframes the
  branch: the target is now the true growth rate of `l_k` / a strictly better bound, not sharpness.
* `verify_resultant_correction.py` -- R1's correction of the prior paper is confirmed by exact
  determinant and Smith normal form, and is stronger than R1 stated: the old claim fails in all 27
  tested cases with `gcd(K,m) > 1`.
* `zt_growthrate.py` (new, 2026-08-12 second session) -- **the most consequential result of the
  session.** Our own recorded heuristic in `zt_pathspectrum.py` (`N(k,L) ~ 3^k (3/64)^L`, "ratio
  0.4 to 1.9 with no drift") is WRONG: it drops the size condition `F^L(x) < 64^k`, which costs a
  further `(64/81)^L` because `F` expands by `81/64`. Corrected, the per-step factor is
  `(3/64)(64/81) = 1/27` exactly and `N(k,L) = 3^(k-3L)` -- verified against exact counts
  (`N(14,1)=177144` vs `3^11=177147`; `N(15,1)=531730` vs `3^12=531441`; worst cell off by 1.26x).
  **The corrected law predicts Conjecture 3.12 is false**: a violation at depth `k` has expected
  count `1/27, 1/9, 1/81` for `k = 0,1,2 mod 3`, each `< 1` but summing to `13/81` per three depths,
  so the sum diverges. Expected violations for `k <= 23` is 1.25 against 0 observed (Poisson
  P = 0.29 -- consistent, not refuting). Heuristic, not a theorem; the counts are exact.
  **Tested prospectively, 3 for 3**: at `L=8` the law predicts `3^(k-24)` paths, i.e. `1/3`, `1`,
  `3` at `k = 23,24,25` (none, borderline, some) -- and `l_23 < 8`, `l_24 < 8`, `l_25 >= 8` all
  hold, the last with a direct-iteration-confirmed witness. It called both slack depths AND the
  return to tightness at `k=25`.
  Hunt violations at `k = 1 mod 3`; the standout is `k = 25` itself -- `l_25 >= 8` is proved but
  `l_25 = 8` needs `L = 9` refuted at `m = 34`, currently undecided, and the law puts its expected
  count at `1/9`, the highest of any residue. That needs a chunked/disk-backed tail (this node's
  memory caps the tail at `3^15`); building it is the single highest-value compute step available.
* `zt_mitm_deep.py` (new, 2026-08-12 second session) -- a second, faster decision procedure for
  `l_k`, written to reach **k=23, the depth that decides the sharpness question**, since that is
  where `floor((k+1)/3)` jumps to 8: `l_23 = 8` extends the tight run across a jump of the bound,
  `l_23 = 7` is the first slack case since k=14 and breaks the run. Two changes over `zt_mitm.py`,
  same mathematics: the head half is a streaming generator fused with the interval test (so only
  the tail's `3^15` integers are held), and the three legal base-64 digits at each node are
  computed by `t = (r - Q) 81^(-i) mod 64` for `r` in `{0,15,49}` rather than found by filtering
  all 64 -- about a 21x cut in node expansion, which is what makes `m = k+L = 31` reachable.
  **Validated: 0 disagreements over depths 1..14, every k and every L, and it independently
  redecides `l_20 = 7` with the same L=7 witness `zt_mitm.py` found.** So `l_20` now rests on two
  independent implementations plus direct iteration.

**THE CONJECTURE 3.12 VIOLATION TEST -- DONE, AND THE CONJECTURE SURVIVED.** `deep_k25_L9.txt`
(`zt_mitm_deep.py 25 --L 9 --h 19`) decided `l_25 >= 9`, which would have **violated** Conjecture
3.12 (the bound at `k=25` is 8). This was the likeliest violation site known: `k = 1 mod 3`,
expected count `1/9` by the corrected law, the highest of any residue. **Result: FALSE**, so with
the `L=8` witness already in hand, **`l_25 = 8` exactly**. The trick that made `m = 34` reachable
is that the split need not be balanced -- `h = 19` holds the tail at `3^15` (~780 MB) while
streaming a `3^19` head, and `3^19` is the true floor for `m = 34` however the split is chosen.
So the finite case against the conjecture is now checked and clean; what survives is only the
divergent-sum argument, which is about infinitely many `k` and no finite computation can touch it.
Next 1-mod-3 targets if wanted: `k = 28` (`3^22`, ~a day here) and `k = 31` (`3^25`, out of reach
without a rewrite).

**The k=19 traversal FINISHED, and R1's table is now fully confirmed through k=19.** Earlier in
this session it was recorded as dead (empty output, gone from the process table) with the
prediction that `3^19 = 1.16e9` vertices would never complete in Python -- **that call was wrong**;
it completed and flushed its buffered output. `zt_independent_k19.txt` reports **0 disagreements
with round 1 over depths 1..19**, including the `k=18` and `k=19` rows that had been carried as
"GPT's, unconfirmed". Those two rows are now independently confirmed from our own traversal, built
from the definitions rather than from R1's C++, so nothing in the R1 table rests on GPT alone.

## What exists before round 1

Two single-shot writeups from an earlier session sit in this folder and are a **resource, not a
track** — GPT is free to build on them, correct them, or abandon them entirely:

* `collatz_compression_framework.tex` / `.pdf` — affine compression and rational-base traces.
* `arithmetic_rigidity_transfer_operators.tex` / `.pdf` — arithmetic rigidity for transfer operators.
* `collatz_accumulation_points.pdf` — accumulation points (no source in repo).

Neither has been independently verified. `scripts/check_tex.py` reports 23 statements against 19
proofs in the compression framework — the four uncovered statements are unaudited, and any round
that leans on them must restate and prove what it uses.

## The campaign shape

100 rounds, one GPT-5 Pro chat at a time, GPT choosing its own target each round. Fronts alternate by
10-round block: 50 proof, 50 disproof. The branch tree lives in
`COLLATZ_MAP.md`; every round's raw LaTeX lives in `rounds/round-N.tex`.

## Standing rules

* Never hint to GPT that the problem is open or that no known approach works.
* A claimed solve is a restated question until an independent hostile verifier passes on a
  from-scratch regeneration. Nothing is booked from a single round.
* Every claim that rests on computation needs exact/interval arithmetic, never float output.

## Toolchain note

No TeX toolchain is installed on this node and the sandbox has no outbound network to fetch one, so
the round gate is `scripts/check_tex.py` (structure, delimiters, proof coverage, balance, truncation)
and **not** a pdflatex compile. Round ledger entries say "not compiled" rather than claiming the
document builds.
