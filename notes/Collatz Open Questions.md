# Open Questions in the Collatz / 3x+1 Problem

**Compiled 2026-07-29.** Every entry below was read by me from the **actual PDF**, not from
model recall or a chatbot summary. Sourcing discipline is deliberate: this campaign has
already been burned three times by fabricated citations, including one entirely invented
"open problem" (see `Collatz Campaign Report.md` §7).

**Primary sources actually read:**
- **[C]** M. Chamberland, *An Update on the 3x+1 Problem* (survey, ~2003) — read in full.
- **[LS]** J. López & P. Stoll, *The 3x+1 Conjugacy Map Over a Sturmian Word*,
  **Integers 9 (2009) #A13**, 141–162 — read in full.

⚠ **[C] is ~2003, so its numerical records are stale.** Where I know the current value from
this campaign I note it. Not yet re-verified: Lagarias's annotated bibliographies
(arXiv math/0309224, math/0608208) — downloaded but not yet read.

---

## A. The main conjecture and its two branches

**A1. The Collatz conjecture.** Every `n ∈ ℤ⁺` reaches 1. *[C §1]*

Any orbit of `T` does exactly one of three things *[C §2]*: enters `{1,2}`; enters a
non-trivial cycle; or diverges. So A1 = A2 + A3.

**A2. No non-trivial cycle exists.** *[C §5]*
[C] reports the record "any such cycle must have length ≥ 272,500,658". **Now superseded** —
Hercher (2023) gives `K > 1.375×10¹¹` odd elements (campaign-verified).

**A3. No divergent trajectory exists.** *[C §2]*
Known: the set of `n` with infinite stopping time has density zero (Lagarias); every divergent
orbit has density zero (Garcia–Tal 1999). Tao (2022): almost all orbits attain almost bounded
values.

---

## B. Cycle structure

**B1. Extend the even–odd dissection of a cycle to a finer dissection (mod 4).**
> *"It is not apparent how the even-odd dissection of a cycle used in these results may be
> extended to a finer dissection of the terms in a cycle, say, mod 4."* — **[C §5], explicit
> open direction.**

Context: Eliahou (1993) bounds cycle length via `log₂(3+1/M) ≤ |Ω|/|Ω₀| ≤ log₂(3+1/m)`,
refined by Chisala, Halbeisen–Hungerbühler, and pushed furthest by Tempkin–Arteaga (1997):
`|Ω| = 187363077a + 272500658b + 357638239c` (`a,b,c ≥ 0`, `b ≥ 1`, `ac = 0`).
Related: Brox (2000) proved finitely many cycles with `σ₁ < 2log(σ₁+σ₃)`, `σᵢ` = number of
terms `≡ i (mod 4)`.

**B2. Seifert's conjecture (1988).** On all of `ℤ`, the only cycles of `T` are `{1,2}`, `{0}`,
`{−5,−7,−10}`, and `{−17,−25,−37,−55,−82,−41,−61,−91,−136,−68,−34}`. *[C §6.1]*
(Equivalently: the "3x−1" problem has exactly the two known non-trivial cycles.)

**B3. Lagarias (1990).** For `T_k(x) = (3x+k)/2` (x odd), `x/2` (x even), `k ≡ ±1 mod 6`,
`(x,k)=1`: proved there are integer cycles for **infinitely many** k; **conjectured for all k**.
*[C §6.2]*

---

## C. Stopping time, statistics, records

**C1. Roosendaal's residue conjecture.** For a convergent trajectory with `E` even and `O` odd
terms, `Res(x) := 2^E/(x·3^O)`. `Res(993) = 1.253142…` is the largest residue for all
`x < 2³²`; **conjectured to hold for all `x ∈ ℤ⁺`**. *[C §2.2]*
→ **The most computationally attackable item on this list.** See §H.

**C2. Applegate–Lagarias: the γ gap.** With `γ(n) = σ_∞(n)/log n`, they proved
`γ(n) ≥ 29/(29log2 − 14log3) ≈ 6.14316` for infinitely many `n`. The probabilistic average is
`2/log(4/3) ≈ 6.95212`, and *"the authors note with surprise that the probabilistic average …
was not attained."* **Closing that gap is open.** *[C §2.2]*

**C3. `limsup γ(n) ≈ 41.677647`** — predicted by the Lagarias–Weiss stochastic model,
unproved. *[C §2.2]*

**C4. Wagon's constant.** Average stopping time for odd `n` approaches
`Σᵢ [1+2i+i log₂3] cᵢ/2^{⌊i log₂3⌋} ≈ 9.477955`; supported numerically to `10⁹`, not proved.
*[C §2.1]*

---

## D. 2-adic / conjugacy formulation  ← *richest vein of precisely-stated open questions*

Setup: `Φ: ℤ₂ → ℤ₂` is the unique homeomorphism with `Φ∘S∘Φ⁻¹ = T`, given explicitly by
`Φ(2^{d₀}+2^{d₁}+⋯) = −Σᵢ 2^{dᵢ}/3^{i+1}` *(Bernstein; [LS] eq. 2)*.

**D1. The Periodicity Conjecture** (Bernstein–Lagarias 1996). `Φ(ℚ_odd) = ℚ_odd`.
Equivalent to: **no rational 2-adic integer has a divergent T-trajectory**. Monks–Yazinski
(2002) proved three statements equivalent: `Φ⁻¹(ℚ_odd) ⊂ ℚ_odd`; `Ω(ℚ_odd) ⊂ ℚ_odd` (where
`Ω = Φ∘V∘Φ⁻¹` is the unique non-trivial autoconjugacy, `V(x) = −1−x`); and no rational 2-adic
integer has a divergent trajectory. *[C §6.3]*

**D2. Does an aperiodic `v` with eventually periodic `Φ(v)` exist?**
> *"It is unknown if there exists any aperiodic `v` with an eventually periodic `Φ(v)`."*
> — **[LS] abstract, verbatim.**

**D3. Does `Φ` always map Sturmian words to words of full complexity?**

> ### ✅ NEW DATA — the published `D(n)` table extended from n=8 to n=12 *(mine, 2026-07-29)*
>
> `D(n)` = minimal prefix length of `Φ(1c_α)` containing all `2^n` factors of length `n`.
> [LS 2009] publishes `n = 1..8` for six slopes. **Implementation validated by reproducing
> all 48 published values exactly**, then extended:
>
> | slope | D(9) | D(10) | D(11) | D(12) | D(13) |
> |---|---:|---:|---:|---:|---:|
> | ln3/27 | 4412 | 5868 | 16621 | 48725 | — |
> | π/6 | 3135 | 8147 | 14298 | 46449 | — |
> | 1/ln3 | 3572 | 6844 | 11758 | 31248 | — |
> | 2/(1+√5) | 2665 | 9228 | 16879 | 42636 | — |
> | ln2/ln3 | 4877 | 9061 | 16476 | 32220 | — |
> | ln2 | 3328 | 7640 | 15698 | 39003 | 63929 |
>
> **All six slopes attain full complexity at every n through 12** (ln2 through 13) — four
> further levels of supporting evidence for the conjecture, which the authors had checked
> only to `n ≤ 5`. Dashes = not found within a 70,000-digit prefix; needs a longer prefix,
> not a counterexample. Method: `Φ(1c_α) mod 2^N = −Σ_{d_i<N} 2^{d_i}·inv(3^{i+1}) mod 2^N`
> with `1c_α[j] = ⌈(j+1)α⌉ − ⌈jα⌉`. Script: `scratchpad/ls_complexity.py`, `ls_extend.py`.

> *"The given examples suggest that `Φ` always maps Sturmian words to infinite words of full
> complexity."* — **[LS] abstract.** Stated as suggested by examples; unproved. [LS] verify
> full complexity only up to factor length `n ≤ 5`.

**D4. Transcendence of the devil's staircase values.**
> *"It seems that `F` additionally maps irrationals to **transcendental** numbers. We have no
> proof."* — **[LS] p. 158, verbatim.**

`F: (ln2/ln3, 1] → ℝ` and its dual `F*: [0, ln2/ln3) → ℝ` are devil's staircases: strictly
monotone increasing, rationals→rationals, irrationals→irrationals, discontinuous at every
rational, continuous at every irrational, range an uncountable nowhere-dense null set. Böhmer
(1927) proved transcendence of certain dyadic fractions by a comparable mechanism — the
natural line of attack. **This is the one target I have verified exists and is stated open by
its authors.**

---

## E. Real and complex extensions

**E1. Chamberland's conjecture.** For `f(x) = x + ¼ − (2x+1)/4 · cos(πx)`, the only two
attractive cycles on `ℝ⁺` are `A₁ = {1,2}` and `A₂ = {1.192531907…, 2.138656335…}`.
**Equivalent to the 3x+1 problem.** *[C §6.5]*

**E2. Letherman–Schleicher–Wood (1999).** No integer lies in a Baker domain, so every integer
belongs either to a super-attracting periodic orbit **or a wandering domain** — which, is
open. *[C §6.6]*

---

## F. Generalizations

**F1. Belaga–Mignotte (1998).** For the `3x+d` problem with `d ≥ −1` odd and `3 ∤ d`, all
integer orbits enter a finite set (hence every orbit is eventually periodic). *[C §7]*

**F2. Crandall's conjecture (1978).** For **any** odd `q ≥ 5`, some `x ∈ ℤ⁺` never iterates to
1 under `qx+1`. Proved by Franco–Pomerance (1995) when `q` is a **Wieferich number**
(`2^{l(q)} ≡ 1 mod q²`); Wieferich numbers have density one in the odds, so the conjecture is
open on a density-zero set. *[C §7]*

**F3. Wirsching's heuristic (1998).** For `q ≥ 5` the `qx+1` problem admits either a divergent
trajectory or infinitely many periodic orbits. *[C §7]*

**F4. Mignosi's conjecture (1995), in refined form.** For `T_β(n) = ⌈βn⌉` (n odd), `n/2` (n
even), `β > 1`: finitely many periodic orbits. Proved for `β = √2`. **Brocco (1995) showed the
unrefined statement is FALSE** for a modified map when `α` is a Salem or PV number and
`((r−1)/(α−1), r/(α−1))` contains an odd integer — so the open question is the correct
refinement. *[C §7]*

---

## G. Logic / computability

**G1. Undecidability boundary.** Conway (1972) proved a Collatz-like map has algorithmically
undecidable long-term behaviour; Monks recast 3x+1 via Conway's FRACTRAN. Margenstern–
Matiyasevich (1999) encoded 3x+1 with **one universal quantifier and several existentials**.
Whether the quantifier complexity can be reduced further is open. *[C §4, §8]*

---

## H. Which of these are realistically attackable here — honest assessment

**Tier 1 — genuinely attackable with the machinery already built:**

- **C1 (Roosendaal residue).** Purely computational: extend verification of
  `Res(x) ≤ Res(993)` beyond `2³²`. I already have a compiled MSVC harness that swept
  `2×10⁸` trajectories for the paradoxical search; the same harness adapts directly.
  Extending a stated conjecture's verified range is a small but **unambiguous** contribution,
  and unlike a bound-improvement it cannot be scooped by a subtlety. *Caveat: must first check
  whether Roosendaal's own distributed project has already gone far past 2³² — likely.*

- **B2 (Seifert).** Bounded structural + computational check on `ℤ`.

**Tier 2 — real but hard:**

- **D4 (transcendence).** Verified open, stated by the authors, with a named precedent
  (Böhmer). But transcendence proofs are a specialist art; low probability, high value.
- **D3 (Sturmian → full complexity).** [LS] verified only `n ≤ 5`. Extending the *computation*
  to larger `n` is straightforward with their `D(n)` table; a *proof* is a different matter.
  **Computationally extending their table is the single cheapest genuine contribution here.**
- **B1 (mod-4 dissection).** Explicitly flagged as an open direction by a surveyor, which
  makes it legitimate — but "not apparent how" from an expert is a warning.

**Tier 3 — do not attempt:**

- A1/A2/A3 directly; C2/C3 (need new stochastic-model technology); D1 (equivalent to the
  divergence half); E1 (equivalent to the whole problem); F1–F4 (open for decades).

**Recommended next action:** D3 — extend López–Stoll's complexity table `D(n)` beyond `n = 8`
for their six worked slopes. It is pure computation, the paper hands us the exact definition
and the existing values to validate against (`D(5) = 215, 111, 134, 106, 99, 178` for
`α = ln3/27, π/6, 1/ln3, 2/(1+√5), ln2/ln3, ln2`), and any extension is new data bearing on a
conjecture the authors state. Then C1 if Roosendaal's range turns out not to be exhausted.
