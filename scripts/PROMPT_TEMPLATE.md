# Round prompt template (rounds 2–100)

Every prompt is **one paragraph** — the composer submits on newline. Assemble four parts in order,
then save the assembled text as `rounds/round-N-prompt.txt` before sending, so the archive records
exactly what was sent.

**1. Report (2–4 sentences).** What actually landed from the last round: what was recorded in
`COLLATZ_MAP.md`, what the integrity gate said, anything GPT asked for that was or was not done, and
any error we found in GPT's own work. Factual, no flattery, no restating of the mathematics — it is
all in the repo.

**2. Front line.** Exactly one of:

> THIS ROUND BELONGS TO THE PROOF FRONT: work toward convergence itself.

> THIS ROUND BELONGS TO THE DISPROOF FRONT: attempt a counterexample -- a nontrivial cycle or a
> divergent trajectory. Structure theory of a hypothetical counterexample, obstructions to the
> standard no-counterexample arguments, and Collatz-like systems where the analogue genuinely fails
> with the exact property of 3n+1 that excludes the failure isolated, all count.

On the first round of a new block the front flips and the chat is new, so add: *the campaign map and
every prior round are in the repo; read them, the front has changed, and you are not bound by the
previous block's line of attack.*

**3. GPT's own directive**, carried **verbatim** from the previous round's `Next-round directive`
section. Do not paraphrase it, do not trim it, do not fix its mathematics — it is GPT driving
itself, and editing it silently takes the wheel back. If we could not do something it asked for
(a computation, a lookup), say so plainly in part 1 rather than dropping it here.

**4. The output contract**, appended verbatim every single round — the block in the
`pmip-latex-round` skill, flattened to one paragraph. It is what makes the round harvestable at all;
a round sent without it produces rendered markdown and the mathematics is lost.

## Standing wording rules

* Never say the problem is open, unsolved, hard, or that no known approach works.
* Never restate the mathematics of prior rounds — point at the repo.
* Always keep the offer of exact computation between rounds, and always keep the invitation to
  correct our own work, including this prompt.
* Always keep the honesty clause: a direction that dies with its reason recorded exactly is a good
  round; an inflated re-derivation is not.
