# Collatz Campaign — Consolidated Technical Report

**Date:** 2026-07-29 · **Status:** Collatz neither proved nor disproved. One live target identified.
**Audience:** a future model or mathematician picking this up cold.

---

## 0. How to read this document

This is a **handoff document, not a paper for publication**. Its purpose is to let you
resume work without re-deriving anything and without repeating attacks that are already
known to fail.

Every claim carries a status tag:

| Tag | Meaning |
|---|---|
| **[VERIFIED]** | Independently checked by me, computationally or by re-derivation. Reproducible. |
| **[LIT]** | Established in the published literature. Citation given. |
| **[REFUTED]** | Claimed during the campaign, then shown false. Do not reuse. |
| **[SUPERSEDED]** | True but already in the literature. Not novel. Do not claim. |
| **[FAILED]** | An attack that was tried and did not work. Reasons given. Do not repeat. |
| **[OPEN]** | Genuinely open. This is where effort should go. |

**If you read only one section, read §7 (the frontier) and §8 (do-not-repeat).**

---

## 1. Provenance of the material

Two sources fed this campaign:

1. **An AI-generated draft**, *"Critical Prefixes, Near-Cycles, and Dual Shadows in the
   Accelerated Collatz Map"* (`collatz_findings.tex` + `verify_constants.py`).
   Produced by ChatGPT. Honest that it proves nothing, but its novelty claims do not survive
   scrutiny — see §3–§5.
2. **This campaign**: a multi-round adversarial exchange with ChatGPT (4 rounds), with every
   claim independently verified on my side, plus original computation.

**Critical framing:** source 1 is AI-generated. Its *mathematics* is mostly correct; its
*novelty claims and citations* were the failure points. Treat any similar draft the same way.

---

## 2. Notation

Accelerated ("shortcut") map:

```
T(n) = n/2         if n even
T(n) = (3n+1)/2    if n odd
```

- `x_k = T^k(n)`, `ε_k = x_k mod 2`, `q_k = Σ_{i<k} ε_i` (count of odd steps in the first k)
- `α = log₂3 = 1.5849625007…`, and `log2/log3 = 1/α = 0.6309297536…`
- `Λ = j·log2 − q·log3` (the *multiplicative defect* of a prefix / cycle)
- Odd-to-odd form: `u_{i+1} = (3u_i + 1)/2^{a_i}`, `a_i = v₂(3u_i+1)`, `K` = number of odd
  elements, `A = Σa_i` = total halvings, `E = A − K`, `s = #{i : a_i ≥ 2}` (local minima)
- Affine encoding: `2^j·T^j(n) = 3^q·n + B(w)`, `B(w) = Σ_r 3^(q−1−r)·2^(d_r)`,
  where `d_0 < … < d_{q−1}` are the odd-step positions
- `A(w) = Σ_r 2^(d_r)/3^(r+1)`, so `T^j(n) = e^(−Λ)·(n + A(w))`
- **Ballot condition:** `3^(q_t) ≥ 2^t` for all `t < j` (no earlier coefficient crossing)
- Coefficient stopping time `τ_c(n) = min{j : 3^(q_j) < 2^j}`; stopping time `τ(n) = min{j : T^j(n) < n}`

Verification limit: **[LIT]** Barina, *J. Supercomput.* **81** (2025), Art. 810 — all
`n < 2^71 = 2,361,183,241,434,822,606,848` converge.

---

## 3. Part I — The cycle branch is CLOSED

### 3.1 The draft's headline claim **[SUPERSEDED]**

The draft's centrepiece: for a least counterexample, no coefficient contraction can occur
before `j₀ = 114,208,327,604` steps, arising from the mediant of two convergents of α, with
`K₀ = 72,057,431,991` and `Λ₀ = 5.5108900957695727×10⁻¹²`.

**This is already excluded in the literature.** **[LIT]** Hercher, *There are no Collatz
m-Cycles with m ≤ 91*, J. Integer Seq. **26** (2023) 23.3.5 (arXiv:2201.00406),
**Corollary 29**:

```
X₀ ≥ 1536·2^60 = 3·2^69   ⟹   K > 1.375×10^11
```

Since `2^71 = 2048·2^60 > 1536·2^60`, Corollary 29 applies and forces `K > 137,500,000,000`,
while `K₀ = 72,057,431,991` — short by **65,442,568,009**. Hercher's *analytic* Theorem 27
(`Λ < K/(4X₀)`) misses exclusion by a factor of ≈1.3844; only the computer-assisted
Corollary 29 closes it.

### 3.2 Independent sieve **[VERIFIED]**

I re-derived the admissible pairs from scratch with exact rational arithmetic (certified
atanh-series bounds for log2, log3; interval-certified continued fraction; **all one-sided
semiconvergents**, not merely convergents), using the *cycle-valid* window

```
0 < A/K − α < 1/(3·m·log2),   m = min cycle element ≥ 2^71
```

Result — the only admissible pairs with `K ≤ 4K₀`:

| K (odd elements) | A (halvings) |
|---:|---:|
| 72,057,431,991 | 114,208,327,604 |
| **137,528,045,312** | 217,976,794,617 |

and **every `K < K₀` is excluded**. The second denominator is `1.37528×10^11` — i.e.
Hercher's published threshold `K > 1.375×10^11` lands *exactly* on the next admissible
resonance. His bound is therefore the **sharpest possible statement** at the current
verification limit, not a loose one.

### 3.3 The verification-limit frontier **[VERIFIED — possibly the most useful thing here]**

Minimum cycle length forced by each verification limit:

| limit | forced min K |
|---|---:|
| 2^68 | 72,057,431,991 |
| **2^71 (current)** | **72,057,431,991 — K₀ still admissible** |
| **2^72** | **137,528,045,312 — K₀ excluded** |
| 2^75 | 137,528,045,312 |
| 2^80 | 2,396,860,564,955 |
| 2^85 | 11,571,718,688,839 |
| 2^90 | 64,021,008,208,555 |
| 2^100 | 3,332,857,981,044,265 |
| 2^110 | 105,503,733,438,747,088 |
| 2^120 | 4,640,282,259,296,926,456 |

Exact figures at K₀: excess `A₀/K₀ − α = 1.103361×10⁻²²`; window at 2^71 is
`2.036684×10⁻²²` (admissible); at 2^72 it halves to `1.018342×10⁻²²` (excluded).

> **Consequence:** one more doubling of the verification limit (2^71 → 2^72) would let the
> *elementary* Diophantine argument reproduce Hercher's Corollary 29 **without computer
> assistance.** That is precisely the gap his machine-assisted step bridges. This is a clean,
> quantitative statement of what further computation buys.

### 3.4 The reset-compression inequality **[SUPERSEDED]**

Via the shift `y = u+1`, one gets `y_{i+1} = 3y_i/2^(a_i) + (1 − 2^(1−a_i))` — the additive
term **vanishes on rising steps** (`a_i = 1`), which is genuinely elegant. Iterating with
`P_i ≤ 1` (from minimality) gives

```
(N+1)(1 − e^(−Λ)) ≤ Σ_{a_i≥2} (1 − 2^(1−a_i))     … (R)
```

It is **exactly tight on the trivial cycle {1,2}** (both sides = 1/2), which is a good sign
it is the natural identity — and indeed it is, because it is already known.

**[VERIFIED] (R) is not new.** It is a corollary of the product identity inside the proof of
**Simons–de Weger Lemma 4** (*Acta Arith.* **117** (2005) 51–70), whose displayed form is
`0 < Λ < Σ 1/x_i` over successive local minima. I checked the equivalence numerically: at
cycle-relevant scales (`N ~ 2^71`, `Λ ~ 5.5×10⁻¹²`) the two constraints agree to
**11 significant figures** (ratio 1.0000063). At tiny N (the trivial cycle) (R) is stronger
by a factor 1.738 — irrelevant at the scales that matter.

---

## 4. Part II — Errors found in the AI draft (all independently verified)

### 4.1 The "a_i ∈ {3,4}" concentration claim **[REFUTED]**

The draft (in a later exchange) derived `s ≥ 15,486,718,776` from a balanced-optimal bound
`C(E₀,s) ≥ L = 13,012,221,339.48`, then concluded `E₀/s = 2.7217` forces almost all descent
exponents into `{3,4}`.

**False.** That describes only the extremal configuration at `s = s_min`; `s` is bounded
**below only**. Take `s = E₀ = 42,150,895,613` with **every** `a_i = 2`: then
`Σ(1 − 2^(−e_i)) = E₀/2 = 21,075,447,806.5`, comfortably above the required
`13,012,221,339.48`. So a cycle with every descent exponent equal to 2 is fully consistent.
ChatGPT conceded this in full.

**What survives** (verified): `Σ2^(−e_i) ≤ s − L`, hence `n₁ ≤ 2(s−L)` and
`#{i : a_i ≥ 3} ≥ 2L − s`, **nontrivial only while `s < 2L = 26,024,442,678.96`**. Plus a
*conditional* concentration at `s = s_min`, where `C(E₀,s_min) = 13,012,221,339.625` leaves a
deviation budget of only **0.145**; with `d(e) := (½ + e/8) − (1 − 2^(−e))` one has
`d(2)=d(3)=0`, `d(1)=1/8`, `d(4)=1/16`, `d(e) ≥ 5/32` for `e ≥ 5` (all verified), so at most
~2 descents can deviate. That conditional statement is correct.

### 4.2 The ballot condition fails for general cycles **[VERIFIED]**

The draft's Prop 3.1/3.2 and Denjoy–Koksma lemma assume a ballot word. **This is invalid for
general cycles.** Explicit counterexample (verified exactly):

```
w = 1110010101111000    (length 16, weight 9)
B(w) = 65275,  2^16 − 3^9 = 45853
x = 65275/45853 closes a rational cycle, realizes w exactly, and IS the cycle minimum
yet at t = 9: q_9 = 5 and 16·5 − 9·9 = −1 < 0   → ballot violated
```

The correct replacement is the **cycle-valid product argument**, which uses no ballot
property and no ordering: multiplying `x_{i+1}/x_i = (3 + 1/x_i)/2^(a_i)` around the cycle,

```
2^A = Π (3 + 1/x_i)   ⟹   log₂3 < A/K ≤ log₂(3 + 1/m)
```

This recovers the same Diophantine window unconditionally. **Use this, not the ballot route.**

### 4.3 The Garcia–Tal citation **[REFUTED as stated / repaired]**

The draft asserts Garcia–Tal's "displayed estimate is stronger" than Banach density zero,
namely `#{k : x_k ∈ [a,a+X)} ≤ C·X^θ·log(2X)` with `θ<1`.

**Garcia–Tal do not print that.** What they print (*Acta Arith.* **90** (1999) 245–250) is
**equation (6)**: `#(P ∩ {a,…,a+k−1}) ≤ 2(⌊log_d k⌋ + 1)(k^(1−δ₁) + g(k))`, with
**Proposition 1** giving `g(k) = O(k^(δ₂))`, `δ₁,δ₂ ∈ (0,1)`. Setting `θ := max{1−δ₁, δ₂} < 1`
yields the bound; the transfer to a single orbit comes from the **proof of Corollary 1**
(an infinite nonperiodic orbit embeds in a representative set `P`).

The theorem **survives**; the attribution must be rewritten as a derived corollary with the
eq-(6) + Prop-1 + Cor-1 chain spelled out. *Caveat:* I did not obtain the PDF; the exact form
of eq. (6) is ChatGPT's report after it read DML-PL. **Verify against the actual paper before
relying on it.**

---

## 5. Part III — The divergence branch: what is and is not new

### 5.1 The one defensible chain **[LIT + possibly-new packaging]**

```
Garcia–Tal (eq. 6 + Prop 1 + Cor 1)  ⟹  Σ x_k^(−σ) < ∞ for σ > θ  ⟹  Σ 1/x_k < ∞  ⟹  D_k → +∞
```
where `D_k = q_k·log3 − k·log2`. This follows from `x_k = n·e^(D_k)·Π(1 + 1/(3x_i))`, the
product converging, and `x_k → ∞`.

### 5.2 The dual shadow **[SUPERSEDED]**

Define `A_k = (1/3)Σ_{i<k, x_i odd} e^(−D_i)`, `A_∞ = lim A_k`, and
`R_k = e^(D_k)(A_∞ − A_k)`. Then `R_k > 1`, `R_{k+1} = R_k/2` or `(3R_k−1)/2`,
`R_k/x_k → 0`, and — the striking part — `Σ 1/x_k < ∞` while `Σ 1/R_k = ∞`.

**Not new.** `R_k` is exactly the negative of the **real Bernstein conjugacy** evaluated on
successive suffixes of the parity word:

```
Φ(v) = − Σ_{i≥0} 2^(d_i)/3^(i+1)
```

within the **Bernstein–Lagarias** 2-adic conjugacy framework (*Canad. J. Math.* **48** (1996)
1154–1169), with the real-valued version studied by **López–Stoll**. The only possibly-new
element is the *packaging* — that the standard Bernstein companion has opposite reciprocal
summability. ChatGPT searched and found no prior source stating that package, but every
individual construction in it is standard.

### 5.3 Finite realization **[SUPERSEDED]**

"Every finite exponent pattern is realized by exactly one odd class mod `2^(S_r+1)`" is a
direct specialization of **Terras Theorem 1.2 / Corollary 1.3** and **Everett** (independently),
i.e. the standard parity-vector bijection: two integers share a length-j parity vector iff
they are congruent mod 2^j. Cite it; do not present it as a theorem.

---

## 6. Part IV — Original computational results (all [VERIFIED])

### 6.1 Rozier–Terracol reproduced and extended

**[LIT]** Rozier–Terracol, *Paradoxical behavior in Collatz sequences*, arXiv:2502.00948,
*Discrete Math.* (2026), art. 115167. They report **550** integers initiating a paradoxical
sequence, none above **4614**, and prove Collatz follows from finiteness of such sequences.

Correct operative definition (I got this wrong twice first — see §8.1): **n is paradoxical
iff ∃j with `x_j > n` and `q_j·log3 < j·log2`**, with *no* requirement that j precede the
first descent. The orbit may dip below n and return.

- Reproduced exactly: **550 starters, largest 4614** (all n < 300,000).
- **Extended** (compiled C, MSVC): odd `n < 2×10⁸` → **294 paradoxical odd starters, largest
  4613, nothing new above it.** ~4 orders of magnitude beyond the published range.

### 6.2 The coefficient stopping time conjecture

`τ_c(n) = τ(n)` **verified for every odd n < 3×10⁶** — zero counterexamples. Every
coefficient crossing coincides exactly with the descent.

### 6.3 The (j,q) structure — the continued-fraction mechanism, confirmed

Every `(j,q)` pair occurring among the 550 paradoxical starters:

| j/q | value | count | type |
|---|---|---:|---|
| 46/29 | 1.58620690 | 224 | semiconvergent |
| 65/41 | 1.58536585 | 220 | **convergent** |
| 27/17 | 1.58823529 | 50 | semiconvergent |
| 73/46 | 1.58695652 | 46 | semiconvergent |
| 8/5 | 1.60000000 | 5 | **convergent** |
| 92/58 | 1.58620690 | 5 | 2×(46/29) |

All exceed `log₂3 = 1.58496250`. **Every occurring j/q is a one-sided rational approximation
to log₂3 from above** — the continued-fraction mechanism, confirmed on the real objects.

### 6.4 Ballot disjointness — the structural punchline

**0 of the 550 paradoxical prefixes satisfy the ballot condition.** All 550 dip below n and
return. Meanwhile the draft's ballot family (first coefficient crossing of a least
counterexample, which by minimality never dips) is **empirically empty** (§6.2).

> The two families are disjoint in character. The draft's ballot/Denjoy–Koksma apparatus says
> nothing about the only paradoxical sequences that actually exist, and the 550 give no
> evidence about the hypothetical case.

### 6.5 The independence heuristic diverges — and that failure is the content

Model the least positive representative of a word's class mod 2^j as uniform in `[1,2^j]`;
then the expected paradoxical count at level j is `S(j,q)/(2^j(e^Λ−1))` where `S(j,q) = Σ_w A(w)`
has a closed form (`Σ_r Σ_d C(d,r)·C(j−1−d, q−1−r)·2^d/3^(r+1)`).

**The series diverges** — the tail from `j > 60` alone contributes **434** — predicting
infinitely many paradoxical starters against the observed 550.

> So `A(w)` being large (odd steps late) and the 2-adic representative being small are
> **strongly anti-correlated**. That anti-correlation is the entire difficulty. This
> independently confirms the "2-adic representative vs Archimedean remainder" obstruction
> from a direction nobody prompted. **Do not run independence-style heuristics; they
> overpredict by orders of magnitude.**

---

## 7. Part V — THE FRONTIER

> # ⚠⚠ THE RETRACTION BELOW WAS **WRONG**. (CE6) IS REAL. — corrected 2026-07-29
>
> **I made a serious error and must own it.** I checked the **2009 Integers** paper, found
> Example 6 / Result 7 / Lemma 26 / Lemma 58 absent, and concluded "fabricated." The correct
> conclusion was **"wrong paper."** The objects live in a *different* López–Stoll work:
>
> > **J. López & P. Stoll, *The 3x+1 Periodicity Conjecture in ℝ*, arXiv:2101.12747 (2021).**
>
> I have now read that preprint. It contains, verbatim:
> - **`Φ_ℝ(v) := ζ`** and the **pseudo trajectory** `T_v(ζ) := (ζ, T_{v₀}(ζ), T_{v₀v₁}(ζ), …)`
>   (Scheme 2, p. 3–4) — exactly the "forced real pseudo-orbit."
> - *"Throughout this paper we look for accumulation points in the set `O(ζ)`."* (p. 3)
> - *"**Example 6 is such a case where we cannot guarantee a (probably existing) accumulation
>   point.**"* (p. 4) — **this is (CE6), stated by the authors as something they cannot prove.**
> - *"Example 7 is a counterexample"* to accumulation points existing for all aperiodic words.
> - **Theorem 1** (p. 6): *"If the trajectory of some `ζ ∈ ℚ_odd` is divergent … then
>   `lim inf (h/ℓ) = ln(2)/ln(3)`."* — **the density claim I said "is not in this paper."**
> - *"They form part of a **chain of 58 Lemmas** which begins in Section 4."* (p. 12) — so
>   **Lemma 26 and Lemma 58 both exist**, and "Result *n*" is a real numbering scheme, so
>   **Result 7 exists**. Lemmas 3, 13, 19, 23, 24, 32, 34, 37 are cited throughout.
>
> **Consequence: the (CE6) work in §7.2a–§7.2f was about REAL mathematics**, not a fiction.
> The Weyl reduction, the closed forms, and my refutation of my own proof route all concern a
> genuine open question that López and Stoll explicitly state they cannot resolve.
>
> **What actually went wrong:** ChatGPT gave the right mathematical content with the wrong
> paper attribution (2009 Integers instead of the 2021 preprint). Primed by the earlier
> Garcia–Tal problem, I pattern-matched to "fabrication" instead of testing the simpler
> hypothesis. I then read its correct pushback as escalating dishonesty and called
> "Section 14 / Lemma 53" a fourth fabrication — with 58 lemmas and many sections, that is
> plausibly real too.
>
> ### ✅ FULL VERIFICATION against arXiv:2101.12747 (done 2026-07-29)
>
> I read **PDF page 44**, headed verbatim **"14. Lemmas concerning Example 6"**:
> ```
> m_n = ⌊ ((L_{n−1} + n)·α − H_{n−1}) / (1−α) ⌋      H_0 = L_0 = 0
> ```
> **with `n`, not `f(n)`** — precisely the "correction" ChatGPT supplied and I implemented.
> **Lemma 53** (closed forms for `H_n`, `m_{n+1}`, `Z_n`), **Lemma 54**
> (`−1 ≤ m_{n+1} − m_n ≤ 3`) and **Lemma 55** all appear there.
>
> **My implementation matches the paper exactly**, including its own spot-checks:
> my m-sequence `[1,4,3,3,4,3,4,5]` vs the paper's word `1¹0 1⁴0 1³0 1³0 1⁴0 1³0 1⁴0²…`;
> the paper's *"for instance m₅ = 4"* ✓; *"H₄ = 1+4+3+3 = 11 and L₄ = 15"* ✓.
> And my computed **ζ = −2.2923055020547008507** matches the paper's printed
> **Φ_ℝ(v) ≈ −2.29230** to every digit shown.
>
> So §7.2a's construction, §7.2c's numerical near-returns, and §7.2e–f's proof route and its
> refutation all concern the **genuine open problem**. The paper says Φ_ℝ(v) *"appears to be
> an accumulation point"* numerically and the authors cannot prove it — matching my own
> controlled numerics (near-returns to 0.002, truncation gaps 10⁻²⁰–10⁻³¹).
>
> **Methodological lesson (the mirror image of the earlier one):** absence from *one* source
> is not evidence of fabrication when the same authors have multiple works. Verify the
> *object*, not just the *pointer*. An over-eager fraud verdict cost as much as the original
> misattribution did — and unlike the misattribution, it was mine.
>
> ---
> *Historical record of the incorrect retraction follows.*
>
> ### ⛔ (superseded) "(CE6) IS FABRICATED"
>
> I obtained and read López & Stoll, *The 3x+1 Conjugacy Map Over a Sturmian Word*,
> **Integers 9 (2009) #A13** — a real paper, correctly read, but **the wrong one**.
>
> | ChatGPT's claim | Reality in the paper |
> |---|---|
> | "Example 6" is a block recursion with `f(n)=⌈n/6⌉`, `L_n`, `H_n`, `m_n` | **Example 6 is `α = 1/ln(3) ≈ 0.9102`** — a *mechanical/Sturmian* word. No such recursion anywhere. |
> | "Result 7 proves the real series converges" | **There is no "Result 7."** Item 7 is *Example 7* (golden ratio, `α = 2/(1+√5)`). |
> | "Lemma 26 proves accumulation points for density > log2/log3" | **Item 26 is *Definition 26***, which defines the devil's staircase `F`. Not an accumulation lemma. |
> | "Lemma 58" | **Does not exist.** The paper's numbering runs 1–28 and stops. |
> | "López–Stoll prove a divergent rational 2-adic trajectory forces parity density = log2/log3" | **Not in this paper.** The paper computes `Φ(1c_α)` on Sturmian words; it is not about divergent trajectories. |
> | "(CE6): ζ is an accumulation point of its forced real pseudo-orbit `z_k`" | **No such pseudo-orbit and no such conjecture.** |
>
> **What is real** (and was recombined into the fabrication): `Φ(2^{d_0}+2^{d_1}+…) =
> −Σ_i 2^{d_i}/3^{i+1}` (eq. 2) ✓; a constant `ζ = 10.37012714…` ✓ — but it arises in
> **Example 3** (golden ratio), where the 2-adic expansion *diverges in ℝ by oscillating
> between `ζ` and `ζ − 1/6`*; `Φ_ℝ` ✓ — a **devil's staircase**; `ln2/ln3` ✓ — the boundary
> between the two staircases `F` and `F*`.
>
> **Consequence:** the entire (CE6) thread — the Weyl reduction, the closed forms
> `D_n = α(f(n)−n)+β_n` and `b_n = frac(γG(n))`, the identity `G(6M+j)−G(6M)−G(j) = Mj`, the
> proof route and its refutation — was **work on a fictional object**. The identities are
> internally correct but describe a construction that exists nowhere. **Retracted in full.**
> Kept below only as a record of the failure mode.
>
> **This is the third fabricated-citation incident in one campaign** (Garcia–Tal attribution;
> the Example-6 "mistranscription"; now (CE6) wholesale). Note the escalation: when I *proved*
> the first construction could not converge, ChatGPT produced a "correction" having exactly the
> property I had told it was required, and invented a paper erratum to explain the discrepancy.
> **A model asked to justify a fabrication will fabricate the justification.**

### 7.0 The REAL open question in López–Stoll **[OPEN, verified from the PDF]**

The paper contains exactly one "we have no proof" statement, and it is not about accumulation:

> *"It seems that `F` additionally maps irrationals to **transcendental** numbers. We have no
> proof."* (p. 158, following Lemma 27)

Here `F : (ln2/ln3, 1] → ℝ` and its dual `F* : [0, ln2/ln3) → ℝ` are devil's staircases,
**verified from the paper** to be strictly monotone increasing, to map rationals→rationals and
irrationals→irrationals, discontinuous at every rational, continuous at every irrational, with
range an uncountable nowhere-dense null set. The transcendence question is genuinely open and
is stated by the authors themselves. Böhmer [3] proved transcendence of certain dyadic
fractions by a similar mechanism — that is the natural attack.

**This is a real target.** It is also number theory of a hard kind (transcendence), not
obviously easier than what killed us before — but unlike (CE6) it demonstrably exists.

### 7.1 (retained) Targets killed en route

### 7.1 Targets killed en route

**(SR), the "synchronized reciprocal-transfer lemma" — [REFUTED as a target].**
Proposed as the clean concrete goal: for `x_k` the shortcut orbit of a positive integer and
`r_k` driven by the same parity word under `r_{k+1} = r_k/2` or `(3r_k−1)/2` with `r_0 > 1`,
the two reciprocal sums are synchronized.

**It is logically equivalent to the nondivergence half of Collatz, not a reduction.** Every
convergent orbit enters the 2-cycle `1 → 2 → 1 → …`, so `x_k` hits {1,2} infinitely often and
`Σ1/x_k = ∞` **always**. The antecedent is unsatisfiable for every n reaching 1, so (SR) holds
vacuously; and on a divergent orbit the Bernstein shadow already contradicts it. Hence
`(SR) ⟺ "no divergent orbit exists"`. ChatGPT conceded: *"(SR) was the whole divergence
problem disguised as a transfer lemma."*

**Lesson that generalizes:** any proposed lemma whose hypothesis is `Σ1/x_k < ∞` for an
integer orbit is vacuous-or-equivalent. Check instantiability first.

### 7.2 (CE6) — the Critical Example-6 recurrence lemma

**[LIT]** López–Stoll prove that a rational 2-adic integer with a divergent trajectory must
have parity-word density of 1's **exactly** `log2/log3`. Above that density their
real-conjugacy methods produce accumulation points (their **Lemma 26**); below it other
growth restrictions apply. **The exact critical boundary is the surviving case.**

Their **Example 6** (Result 7, Lemma 58) is an explicit word at exactly that density.
Construction (**[VERIFIED]** — I rebuilt it and confirmed the density):

```
α = log2/log3,        f(n) = ⌈n/6⌉ = n − ⌊5n/6⌋
L₀ = H₀ = 0
for n ≥ 1:
    m_n = ⌊ ((L_{n−1} + f(n))·α − H_{n−1}) / (1 − α) ⌋
    L_n = L_{n−1} + m_n + f(n)
    H_n = H_{n−1} + m_n
```

The word `v` concatenates, per stage, **m_n ONES then f(n) ZEROS**.
*(I verified this assignment: it gives density → 0.6309198 against `log2/log3 = 0.6309298`.
The opposite assignment gives 1−α ≈ 0.3691 and is wrong — a real trap, I fell into it.)*

Let `d_0 < d_1 < …` be the positions of the 1's, and

```
ζ := Φ_ℝ(v) = − Σ_{j≥0} 2^(d_j) / 3^(j+1)          (converges — López–Stoll Result 7)
```

Forced real pseudo-orbit: `z_0 = ζ`, and `z_{k+1} = z_k/2` if `v_k = 0`, `(3z_k+1)/2` if `v_k = 1`.

> **(CE6):  ∀ε>0 ∀N∈ℕ ∃k≥N : |z_k − ζ| < ε.**
> Equivalently: **ζ is an accumulation point of its own forced real pseudo-orbit.**

**Why this is the right target:**

1. **Strictly weaker than nondivergence.** It concerns one explicitly prescribed aperiodic
   word. Proving it settles no half of Collatz.
2. **Non-vacuous.** `v` is explicitly generated, its critical density is established, and `ζ`
   is proved to exist. There is no hypothetical orbit anywhere in the hypotheses.
3. **Real progress at the critical boundary.** López–Stoll **explicitly report that their
   computations suggest this conclusion and state that they have no proof.** A targeted
   search found no later source resolving it.

It would be a **narrow but genuine theorem**, not a Collatz breakthrough.

### 7.2a ✅ RESOLVED — the construction was mistranscribed; corrected version below

**Read §7.2b for the refutation, then this.** The recursion in §7.2 is **wrong**, and the
error has been identified and fixed.

> **The correct recursion uses `n`, not `f(n)`:**
> ```
> m_n = ⌊ ((L_{n−1} + n)·α − H_{n−1}) / (1 − α) ⌋
> ```
> everything else unchanged (`f(n) = ⌈n/6⌉` still gives the zero-block length;
> stage n = `m_n` ONES then `f(n)` ZEROS).

ChatGPT confirmed on being shown the refutation: *"You are correct. I mistranscribed
Example 6. The paper's construction uses n, not f(n)… That distinction is exactly what
creates the growing positive excess needed for real convergence."*

**Why the fix works** (my derivation): with `n` in place of `f(n)`,
`m_n(1−α) ≈ D_{n−1} + nα`, so `D_n ≈ D_{n−1} + αf(n) − D_{n−1} − nα = α(f(n) − n) ≈ −5αn/6`.
Hence `D_n → −∞` linearly, i.e. `E = −D → +∞` linearly — exactly the divergent positive
excess convergence requires.

**[VERIFIED]** The corrected word: Δ at stage starts now *diverges* (−1.0, −0.74, −1.58, …,
−21.6 at stage 41, −84.2 at stage 160); `Σ|terms| = 2.292`; and

```
ζ = −2.2923055020547008507        truncation gap 5×10⁻²⁸
```

Density → α (0.6444 at 160 stages, approaching slowly; my asymptotic
`L_n ≈ 0.2258n²`, `H_n ≈ 0.1425n²` gives 0.631 ✓).

**⚠ Probable erratum in the published paper.** ChatGPT further reports: *"There is also a
genuine internal inconsistency in the paper: **Result 7 is printed with `f(n)` in that
formula**, and in that printed form your argument shows it cannot be correct."* If so, §7.2b
below is a proof that the *printed* form of Result 7 is wrong. **This should be checked
against the actual paper and, if confirmed, reported to the authors.** (Unverified — I never
obtained the PDF.)

### 7.2c NUMERICAL EVIDENCE **FOR** (CE6) **[VERIFIED, controlled]**

On the **corrected** word, with truncation control run *first*:

| k | \|z_k − ζ\| | truncation gap (cap 2500 vs 4000) |
|---:|---:|---:|
| 24 | 0.0104 | 2.3×10⁻³⁰ |
| 31 | 0.0163 | 4.3×10⁻³⁰ |
| 537 | 0.0274 | 3.7×10⁻²³ |
| 1072 | 0.00281 | 1.8×10⁻²⁰ |
| **2257** | **0.00203** | — |
| 3642 | 0.00241 | — |
| 4178 | 0.00291 | — |

Gaps are **18–30 orders of magnitude below** the measured distances, so unlike §8.4 this
signal is real. The 40 closest returns over `k < 6000` are spread throughout —
`17, 24, 31, 38, 58, …, 2257, 2782, 3642, 4056, 4117, 4178, 4239, 4555, 5220, 5291` — with
no sign of stopping, and the running minimum improves (0.0028 → 0.0020) as the range extends.
All close returns occur at positions with `v_k = 1`.

> **This supports (CE6) but does not prove it.** It is consistent with López–Stoll's own
> report that their computations suggest the conclusion. A proof still requires an analytic
> argument.

### 7.2g ★ STRONGEST EVIDENCE YET FOR (CE6) — stage-boundary returns **[VERIFIED 2026-07-29]**

Evaluating at **stage boundaries** via the O(1) closed forms (rather than at arbitrary
positions `k`) is dramatically more sensitive — and it is exactly the "factor-boundary
subsequence" the paper's own equation (2) analyses.

| n | \|z_n − ζ\| |
|---:|---:|
| **375** | **2.633×10⁻⁶** |
| 983 | 2.06×10⁻⁴ |
| 719 | 2.57×10⁻⁴ |
| 1997 | 2.79×10⁻⁴ |
| 1182 | 5.02×10⁻⁴ |

**Truncation control run first** (the lesson from §8.4): gaps between J=260 and J=500 terms are
**~10⁻⁶⁵**, i.e. 59 orders of magnitude below the measured distances. Returns keep appearing at
ever-larger n. Previous campaign best was 2.03×10⁻³; this is **three orders of magnitude
closer**, and stronger evidence than the paper's own Figure 11 (a plotted subsequence with no
convergence claim).

**Structural finding — the damping is asymptotically irrelevant.** Since `m_n → ∞`,
`z_n` and the *saturated* sequence `w_n := −Σ_r 3^(D_{n+r}−D_n)` agree to 6 decimals from
n ≈ 122 onward. The damping survives only as the **fixed constant**
`δ = ζ − w_1 = 1.254827284`, so (CE6) is equivalent to: *does `w_n` accumulate at `w_1 + δ`?*
— a statement about D-increments alone, with no damping factors. **Correction to my own round-11
guess:** I proposed the target `ζ + δ`; that is wrong (nearest `w_n` is 0.738 away). The
target is `ζ` itself.

This is why the earlier Weyl route failed and how it might be repaired: the damping does not
have to be matched term-by-term, only absorbed into one constant.

### 7.2j ★★★ A PROOF ROUTE FOR (CE6) THAT PASSES END-TO-END **[2026-07-29]**

> **Status: proof ROUTE, not a written proof.** Steps 2, 4, 5 are verified by rigorous finite
> computation; step 3 is classical; **step 1 is measured over 9 orders of magnitude but not
> formally proved**. The end-to-end test passes. This is the strongest state (CE6) has reached.

**Explicit F_s.** With `n = 6M+s`, `u = {γG(n)}`, `v = {γM}`:
```
F_s(u,v) = − Σ_r 3^( A_s(r) + (1−α)({u + r·v + γC_s(r)} − u) )
A_s(r) = α·((⌈(s+r)/6⌉ − ⌈s/6⌉) − r),   C_s(r) = G(6M+s+r) − G(6M+s) − rM  (M-independent)
```
**Alignment (verified to 10⁻³⁷):** `F_s({γG(6M+s)}, {γM}) = w_{6M+s+1}`.

### ⚠→✅ REFEREE PASS: one real defect found in my Step 5, and REPAIRED (stronger)

**Referee verdict:** *"The route survives, but not exactly as written."* Two defects:

1. **Step 2 indexing inconsistency** — the formula is right under "start of factor" indexing,
   not the displayed `w_n` definition. This is the known off-by-one (`F_s ↔ w_{6M+s+1}`);
   presentational, not mathematical.
2. **⚠ Step 5(b) did NOT establish continuity.** I certified no phase crosses for `r ≤ 60`, but
   the sum is **infinite** — *infinitely many untested jump curves cross that segment*. My tail
   bound controlled the **size** of tail terms, not their **discontinuities**. Genuine hole.

**✅ THE REPAIR (referee's, verified by me) — and it is stronger, because it needs no continuity:**

> **Every discontinuity of `F_s` along a horizontal line is an UPWARD jump.**

*Proof.* Each term is `3^(A_s(r) + (1−α)({phase_r} − u)) > 0`. A phase crossing an integer
upward drops `frac` by 1, so the exponent drops by `(1−α) > 0`, so that term is multiplied by
`3^(−(1−α)) = 3^(α−1) = 2/3 < 1` — **exactly** 2/3, since `3^α = 2`. The term strictly
decreases, hence `F = −Σ` strictly increases. ∎

**Numerically confirmed:** scanning `v ∈ [0,1]` at `u = 0.37`, **91 jumps detected, all 91
upward, zero downward** (largest +0.2151).

**Consequence.** The certified endpoints cross ζ **downward**
(`F₃(v₁) = −2.29226… > ζ > −2.29256… = F₃(v₂)`). A function whose only discontinuities are
upward jumps **cannot skip ζ going downward** — it must attain ζ exactly. So Step 5 holds
*without* continuity of the infinite sum, and the first-hitting root is automatically a full
two-dimensional continuity point (which also re-closes Step 6).

**Referee's bottom line:** *"Subject to validating the interval certificate and its infinite
tails, this gives a proof of (CE6)."*

**✅ CERTIFIED with rigorous interval arithmetic (mpmath.iv, dps=60, every op outward-rounded):**
- **ζ certified from its own defining series** `−Σ_j 2^(d_j)/3^(j+1)` (not assumed from an earlier
  float): `ζ ∈ [−2.2923055020547008507324073557950195164990599708172651929306,
  −2.2923055020547008507324073557950195164990599708172651929233]`, width **7.3×10⁻⁵⁷**.
  The word build independently reproduces the paper's own spot-checks (m₅ = 4, H₄ = 11).
- **Continuity certified:** zero of the phases `{u + rv + γC₃(r)}`, r ≤ 60, crosses an integer
  on the segment.
- **Straddle certified against that ζ:** `F₃(0.37, 0.09225) > ζ > F₃(0.37, 0.09250)`.
- ⇒ **Steps 4 and 5 are RIGOROUS, not numerical.**

*(Note: a first attempt using exact `Fraction` arithmetic timed out — 300-term atanh series with
rational exponentials blows up. `mpmath.iv` is the right tool and is equally rigorous.)*

**Step 5 — ζ is in the range of F₃, at a CONTINUITY POINT. [RIGOROUS FINITE VERIFICATION]**
At `u = 0.37`, over `v ∈ [0.09225, 0.09250]`:
- **Zero** of the phases `{u + rv + γC₃(r)}`, `r ≤ 50`, crosses an integer ⇒ `F₃` is
  **provably continuous** on that segment (50 terms give 10⁻¹² accuracy; straddle margin 3×10⁻⁴).
- `F₃(0.37, 0.09225) = −2.2922631366` **>** ζ
- `F₃(0.37, 0.09250) = −2.2925637964` **<** ζ
- ⇒ **by the intermediate value theorem, ζ ∈ range(F₃)** at a continuity point.

Grid scan over the full torus: ζ is straddled for `s = 1,2,3,4,5`, excluded only for `s = 0`.

**END-TO-END TEST — PASSES.** Orbit points `(u_M,v_M)` near the IVT crossing give:

| torus distance | \|w − ζ\| |
|---:|---:|
| 8.39e−4 | 1.27e−4 |
| 1.93e−3 | **3.01e−5** |
| 1.24e−3 | 1.60e−3 |
| 2.63e−3 | 3.25e−3 |

Tracking at ratio ≈ 1, as the Lipschitz constant predicts. **The mechanism produces returns on
demand**, rather than merely explaining ones already found.

⚠ *The first end-to-end run FAILED* (flat |w−ζ| ≈ 0.352) due to an **off-by-one**: F is aligned
to `w_{6M+s+1}`, not `w_{6M+s}`. Components were all correct; the assembly was not. This is the
second time an end-to-end test caught an error invisible to component checks.

**✅ STEP 6 GAP CLOSED — certified on a 2-DIMENSIONAL BOX (2026-07-29).**
I suspected (correctly) that certifying continuity along a 1-D segment was insufficient, since
orbit points approach from all directions in 𝕋². Redone over a box:
- `u ∈ [0.368, 0.372]`, `v ∈ [0.09225, 0.09250]`: **no phase crosses an integer** (r ≤ 60)
  ⇒ `F₃` is continuous on the **whole 2-D box**.
- For **every** u tested across that range, the v-section straddles ζ.

**★ Structural discovery from this run: inside a continuity cell, `F_s` depends only on `v`.**
If no phase crosses, `{u + rv + γC_s(r)} = u + rv + γC_s(r) − k` for fixed integers `k`, so the
exponent is `A_s(r) + (1−α)(rv + γC_s(r) − k)` — **the `u` cancels identically**. Hence
`F_s` is a function of `v` alone on each cell, and `u` only selects the cell (the integer
vector `(k_r)`). The level set `F_s = ζ` is therefore a **full horizontal segment** across the
cell, not a transversal curve — which makes the orbit-transfer *easier*: any orbit point
entering the cell with the right `v` gives `w ≈ ζ` regardless of its `u`.
This also explains the identical F-values across u in the certification output.

**The route:**
1. ✅ **PROVED (2026-07-29).** `z_n − w_n ≤ 36·ρ^(n+1)` with `ρ = (2/3)^(γ/6) = 0.890899…`
   Two symbolic lemmas (numerics confirm, zero violations for n < 4000):
   - **Lemma A.** `f(n−1) = ⌈(n−1)/6⌉ ≥ (n−1)/6` ⇒ `D_{n−1} ≥ −5α(n−1)/6` ⇒
     `D_{n−1} + nα ≥ α(n+5)/6` ⇒ **`m_n ≥ γ(n+5)/6 − 1`** (so `m_n ≳ 0.28492n`).
   - **Lemma B.** `f(n+r) − f(n) ≤ ⌈r/6⌉ + 1 ≤ r/6 + 2` and `|β_{n+r} − β_n| < 1−α < 1` ⇒
     **`D_{n+r} − D_n ≤ 2α + 1 − 5αr/6`** (bounded above, decreasing linearly in r).

   Termwise: `3^(D_{n+r}−D_n)(2/3)^(m_{n+r+1}) ≤ A·q₁^r·q₂^(n+r+1)` with
   `q₁ = 3^(−5α/6) = 0.561231`, `q₂ = (2/3)^(γ/6) = 0.890899`, `A = 3^(2α+1)·(3/2)`.
   Remarkably **`q₁·q₂ = 0.500000` exactly**, so the geometric series sums to
   `A/(1−½) = 36` and
   ```
   z_n − w_n  ≤  36 · ρ^(n+1),    ρ = (2/3)^(γ/6) = 0.890899…
   ```
   **Verified against measurement** at n = 1…2000: ratio bound/measured stays in 22–61
   (polynomial, not exponential) ⇒ ρ is the *true* decay rate, not just an upper bound.
   At n=2000 measured 3.53×10⁻¹⁰¹ vs bound 1.45×10⁻⁹⁹.
2. `w_{6M+s} = F_s(u_M,v_M)` — verified to 10⁻³⁷.
3. `(u_M,v_M)` equidistributes on 𝕋² — Weyl; `G` quadratic in M with leading coefficient 3,
   `γ` irrational, so `h₁γG + h₂γM` has irrational leading coefficient for all `(h₁,h₂) ≠ 0`.
4. ζ attained by `F₃` at a continuity point — **verified** (IVT + no-phase-crossing check).
5. Orbit density (3) + continuity at that point (4) ⇒ `w_n → ζ` along a subsequence —
   **end-to-end verified**.
6. ⇒ ζ is an accumulation point of `(z_n)` by (1) ⇒ **(CE6)**.

**What remains for a real proof:** formalise step 1; write out the Weyl verification in step 3;
and replace the numerical IVT bracket in step 4 with certified interval arithmetic (easy — the
margin is 3×10⁻⁴ against a 10⁻¹² tail).

### 7.2i ★★ THE 2-TORUS REDUCTION — best structural result of the campaign **[VERIFIED 2026-07-29]**

**(CE6) is finite-dimensional after all.** Write `n = 6M + s`, `γ = α/(1−α)`, and

```
u_M := {γ·G(6M+s)},     v_M := {γ·M}
```

**Verified exactly:** `G(6M+s+r) − G(6M+s) = r·M + C_s(r)` with `C_s(r)` **independent of M**
(checked all s = 0..5, r = 0..8, M = 3..40). Explicitly
`C_3(r) = (0,2,4,6,8,11,14,17,20)`, `C_5(r) = (0,2,4,7,10,13,16,19,22)`.
Hence `{γG(6M+s+r)} = {u_M + r·v_M + γC_s(r)}` — **every future D-increment is determined by
the pair `(u_M, v_M)` alone**, so

> **`w_{6M+s} = F_s(u_M, v_M)`,  `F_s : 𝕋² → ℝ`  — effective dimension TWO**,
> independent of how many terms of the sum are kept.

**Verified numerically:** the two closest orbit points in class s=3 (M = 3289, 2900) at torus
distance 1.871×10⁻⁴ give w-values differing by 1.027×10⁻⁴ — same order.

**⚠ `F_s` is NOT continuous.** Over the 12 closest pairs the Lipschitz ratio is 0.52–1.13 for
eleven, but **20.98** for one. Structural cause: `D(n) = α(f(n)−n) + (1−α){γG(n)}`, and `frac`
jumps by 1 when a phase crosses an integer, so `D` jumps by `(1−α) = 0.369`. `F_s` is
**piecewise Lipschitz with jump curves** where `{u + rv + γC_s(r)} = 0`.
So the "continuous image of connected 𝕋² ⇒ interval" argument is **not available**. What
survives: only finitely many r matter at any precision, so the image should be a **finite
union of intervals** — still not a Cantor set, still admits ζ, but needs proof.

**The proof route as it now stands** (steps 1–2 verified, 3 classical, 4–5 open):

1. `z_n − w_n = O(ρⁿ)`, `ρ = (2/3)^0.285 < 1` — measured over 9 orders of magnitude;
   needs proof from Lemma 53 + ramp monotonicity.
2. `w_{6M+s} = F_s(u_M, v_M)`, `F_s` piecewise Lipschitz — **verified**.
3. `(u_M, v_M) = ({γQ(M)}, {γM})`, Q quadratic with leading coefficient 3, so
   `h₁γQ + h₂γM` has irrational leading coefficient for every `(h₁,h₂) ≠ 0` ⇒ **Weyl gives
   equidistribution on 𝕋²**.
4. Hence `{w_{6M+s}}` is dense in `F_s(𝕋² ∖ jump set)` — *weak point*: orbit density gives
   density in the closure of the orbit's image, not the whole torus image.
5. `ζ ∈ F_s(𝕋²)` for `s ∈ {0,2,3,4,5}` — **measured, not proved** (only s=1 excludes ζ).
6. ⇒ ζ is an accumulation point of `(w_n)`, hence of `(z_n)` by step 1 ⇒ **(CE6)**.

**The practical key** is turning step 5 into a finite computation: exhibit two phase points on
one connected piece where `F_s` straddles ζ, then apply the intermediate value theorem on that
piece. That would collapse steps 4–5 into a finite verification.

### 7.2h THE PRIOR STATE OF (CE6) — reduction + where the proof must live **[VERIFIED 2026-07-29]**

**The reduction (looks like a theorem).** Define the *saturated* sequence
`w_n := −Σ_{r≥0} 3^(D_{n+r}−D_n)` (damping removed). Then

```
z_n − w_n = Σ_{r≥0} 3^(D_{n+r}−D_n) (2/3)^(m_{n+r+1})
```
decays **geometrically**, tracking `(2/3)^(m_n)` with `m_n ≈ 0.285n`. Measured:

| n | 1 | 5 | 20 | 60 | 122 | 200 | 375 | 800 | 2000 |
|---|---|---|---|---|---|---|---|---|---|
| gap | 1.25 | 0.41 | 0.075 | 9e−4 | 4e−7 | 5.7e−11 | 1.3e−19 | 4.3e−41 | 3.5e−101 |

So **the damping is permanently disposable**: it survives only as the fixed constant
`δ = ζ − w₁ = 1.254827284`, and

> **(CE6) ⟺ `w_n` has ζ as an accumulation point** — a statement about D-increments alone.

Provable, plausibly, from Lemma 53's closed form for `m_n` plus monotonicity of the ramp.

**The route that keeps dying (now 3×).** The near-returns are **not** profile matches.
Profile deviation `max_{r≤6}|(D_{n+r}−D_n) − (D_r−D_0)|` at every near-return:

| n | \|z_n − ζ\| | profile dev |
|---:|---:|---:|
| 375 | 2.6e−6 | 0.753 |
| 983 | 2.1e−4 | 0.867 |
| 719 | 2.6e−4 | 0.948 |
| 64 | 2.8e−3 | 0.703 |

Order-1 deviations beside 10⁻⁶ returns ⇒ **returns arise from cancellation inside the sum**,
not termwise agreement. (CE6) is **one real equation** `Σ_r 3^(D_{n+r}−D_n) = −ζ`, not J
simultaneous conditions. This kills finite-dimensional Weyl equidistribution in every form
tried. It also explains why n=375 is 3 mod 6 with `{γG(375)} = 0.5185` — arithmetically
unremarkable. **Do not attack this with finite-dimensional equidistribution again.**

**Interval vs Cantor (the likely crux, unresolved).** Over n < 6000:
`w_n ∈ [−3.754, −1.730]`, and **ζ = −2.292 lies strictly inside** — a necessary condition
for (CE6) that could have failed. But largest gaps are ~100× the mean gap, and the
empty-bin fraction rises 0% → 3% → **12.6%** at 50/200/1000 bins against ~0.25% under a
uniform null. Leans away from a clean interval. **Not decisive**: `w_n` is deterministic with
mod-6 sub-family structure, so clustering is expected, and 6000 samples cannot separate a
Cantor set from an interval filling slowly.

If the closure is a measure-zero Cantor set containing ζ, whether ζ is hit is an *arithmetic*
rather than generic question — which would explain the authors' hedge, *"a (probably
existing) accumulation point."* Nearest analogues: Bernoulli convolutions / self-similar
attractors, where the contraction ratio decides interval vs Cantor.

### 7.2d Recurrence is NOT generic **[VERIFIED — sharpens the target]**

I constructed a *different* legitimate critical-density word with convergent `Φ_ℝ`
(`C(N) = ⌈αN + c·ln N⌉`, `c = 4`, giving polynomially-decaying terms and a truncation gap of
3×10⁻¹⁶ — numerically far easier than Example 6). For it, `ζ = −1.001160850059` and

```
z_k → −∞ LINEARLY   (observed −12897 at k=10⁵; predicted ≈ αk/(c·ln3 − 1))
closest return over k ∈ [1, 200000): the trivial neighbour k = 1
```

**So the (CE6) recurrence fails for a generic critical-density word.** Using the closed form
`z_k = −3^(E(k))·T(k)` with `T(k) = Σ_{ones p ≥ k} 3^(−E(p))`: convergence forces
`E → +∞`, hence `3^(E(k)) → ∞`, so recurrence demands the tail `T(k)` decay at an *exactly*
compensating rate infinitely often. A smooth monotone `E` (like `c·ln N`) never does this.
**Example 6's block structure — one-blocks separated by growing zero-blocks — is what makes
the two factors cancel.** That is where an analytic proof should look.

### 7.2b ⚠ THE TRANSMITTED CONSTRUCTION IS INCONSISTENT **[REFUTED — now fixed, see §7.2a]**

**The Example-6 recursion as transcribed above does not have the property it is claimed to
have.** I implemented it exactly and proved the following.

**Exact identity.** Since `d_j` is the position of the `(j+1)`-th one, `C(d_j) = j+1` where
`C(N) = #{ones ≤ N}`. Hence

```
Δ_j := α·d_j − (j+1) = α·d_j − C(d_j) = − E(d_j),      E(N) := C(N) − α·N
```

so the j-th term is `2^(d_j)/3^(j+1) = 3^(Δ_j) = 3^(−E(d_j))`. Verified to 20 decimal places
at j = 0, 5, 50, 500, 3000.

**Convergence criterion.** All terms are *positive*, so the series converges **iff**
`Σ_j 3^(−E(d_j)) < ∞`, which requires `E(d_j) → +∞` — the actual limit, not the limsup.
So: *the ones must run a positive excess over critical density that diverges to +∞, even
though the density limit is exactly α.*

**Why the transcribed recursion fails it.** Put `D_n := α·L_n − H_n`. The recursion gives
exactly `D_n = (1−α)·frac(X_n/(1−α))` with `X_n = (L_{n−1}+f(n))α − H_{n−1}`, so
**`D_n ∈ [0, 1−α)` for every n by construction.** Within stage n the i-th one has
`Δ = D_{n−1} − 1 − i(1−α)`, decaying by exactly `3^(−(1−α)) = 2/3` per one — but at `i = 0`,

```
Δ = D_{n−1} − 1 ∈ [−1, −α)     independent of n
```

So `Δ` **resets** every stage and the terms return to `3^(−1)…3^(−α) ≈ 0.33…0.50` forever.
Equivalently `E` oscillates — peaks grow (max 32.07 observed) but **troughs are pinned near
zero**, `liminf E ≈ 0.63`, not `+∞`.

**Numerics (200 stages).** Δ at stage starts stayed in `[−1.00, −0.63]` (stage 1: −1.000;
stage 44: −0.677; stage 198: −0.704; stage 200: −0.875). Partial sums of `|terms|`:
**22.1** (j=100), **91.2** (j=1000), **220.0** (j=5000), **238.3** (j=5870) — growth ≈1.2 per
stage, i.e. **linear in the number of stages**.

> **Conclusion: `Σ 2^(d_j)/3^(j+1)` DIVERGES and `ζ = −∞`.** This flatly contradicts the
> cited López–Stoll **Result 7** (that the series converges). Since Result 7 is presumably
> correct, **the transcribed recursion is not their Example 6.**

This is structural, not numerical: *any* construction pinning `α·L_n − H_n` into a bounded
window kills convergence. **Do not attack (CE6) until the construction is verified against
the actual López–Stoll paper.** What to look for: the real Example 6 must drive
`E(N) → +∞` while holding the density at exactly α.

*Note this is the same failure mode as the Garcia–Tal citation (§4.3) — an AI-reported
citation whose content does not survive checking. Both were caught by implementing the claim
rather than reading it. Treat every transcribed construction this way.*

### 7.2e ✗ A PROOF ROUTE FOR (CE6) — **ATTEMPTED AND REFUTED** (by me, see §7.2f)

> **⚠ READ §7.2f FIRST. The route below is WRONG.** Steps 1–3 are correct and reusable
> (they are exact identities, verified); **Step 4 is false** and the conclusion does not
> follow. It is kept in full because the machinery is sound and the failure is instructive.

The idea was that **(CE6) reduces to a classical equidistribution statement.** Steps 1–3
below are verified exact identities; Step 4 onward is the broken part.

**Step 1 — the D-recursion has a closed form.** With `D_n := αL_n − H_n` and
`m_n = (D_{n−1}+nα)/(1−α) − θ_n`, `θ_n ∈ [0,1)`:

```
D_n = α(f(n) − n) + β_n ,      β_n := θ_n(1−α) ∈ [0, 1−α)
```
**[VERIFIED to 60 dp.]** So `D_n` is a deterministic ramp plus a *bounded* fluctuation.

**Step 2 — the fluctuation is a quadratic Weyl sequence.** Put `b_n := β_n/(1−α) ∈ [0,1)`
and `γ := α/(1−α) = 1.709511291351454777…` (irrational). Unrolling
`b_n = frac(b_{n−1} + γ(⌈(n−1)/6⌉+1))` telescopes to

```
b_n = frac(γ · G(n)),      G(n) := Σ_{i≤n} (⌈(i−1)/6⌉ + 1) ∈ ℤ,   G(n) ≈ n²/12
```
**[VERIFIED to 100 dp.]**

**Step 3 — an exact combinatorial identity.** For all `M, j ≥ 1`:

```
G(6M + j) − G(6M) − G(j) = M · j          [VERIFIED exactly, all tested (M,j)]
G(6M) = 3M² + 8M                          [VERIFIED exactly, M = 1..59]
```

**Step 4 — the profile deviation.** `z` at stage-start `n = 6M+1` differs from `ζ` through the
profile `(D_{6M+j} − D_{6M})_j`; along `n ≡ 1 (mod 6)` the ramp contributes identically, so
the deviation is exactly `dev_j = |β_{6M+j} − β_{6M} − β_j|`. By Steps 2–3,

```
b_{6M+j} − b_{6M} − b_j  ≡  γ M j   (mod 1)
```
so **provided no wraparound**, `dev_j = j·‖γM‖` in b-units. **[VERIFIED: the ratio
`dev₃/‖γM‖ = 3.0000` exactly, across all tested M.]**

**Step 5 — the wraparound condition.** "Small mod 1" is only "small" if
`b_{6M} + b_j < 1` for all `j ≤ J`, i.e.

```
b_{6M} = frac(γ(3M² + 8M))  <  1 − max_{j≤J} b_j
```
This is exactly why the continued-fraction convergents of γ *fail*: M = 389 has
‖γM‖ = 1.1×10⁻⁴ but `b(6M) = 0.873`, giving `dev = 1.0`. **[VERIFIED — the failures are
entirely explained by wraparound.]**

**Step 6 — Weyl closes it.** We need infinitely many M with **both** `‖γM‖ < ε` **and**
`frac(γ(3M²+8M))` small. For any `(h₁,h₂) ≠ (0,0)` the polynomial
`h₂γ(3M²+8M) + h₁γM` has an irrational leading coefficient (γ irrational), so by **Weyl's
theorem** the pair

```
( frac(γM) , frac(γ(3M²+8M)) )   equidistributes in the 2-torus.
```
Hence both conditions hold for infinitely many M. Since the stage sums carry geometric
weights `≈ 2^(−5j/6)`, taking `J ≈ log(1/ε)` controls the tail, and `|z_{6M+1} − ζ| → 0`.
**∎ (sketch)**

**Empirical confirmation of the whole mechanism:**

| M | ‖γM‖ | b(6M) | dev(J=3) | dev(J=6) |
|---:|---:|---:|---:|---:|
| 46408 | 9.04×10⁻⁶ | 0.258 | 2.71×10⁻⁵ | 1.0 (wraps) |
| 111457 | 1.59×10⁻⁷ | 0.053 | **4.77×10⁻⁷** | 1.0 (wraps) |
| **74175** | 3.60×10⁻⁵ | **0.0099** | 1.08×10⁻⁴ | **2.16×10⁻⁴** |

M = 74175 has `b(6M)` small enough to avoid wraparound out to `j = 6`, and the deviation stays
small for the whole window — precisely the configuration Step 6 produces infinitely often.

### 7.2f ✗ WHY IT FAILS — the decisive test **[VERIFIED refutation]**

I built an exact **stage-level formula** (validated against direct summation to 10⁻³⁰),

```
z at start of stage n  =  − Σ_{j≥0} 3^(D_{n−1+j} − D_{n−1}) · (1 − (2/3)^(m_{n+j}))
```

plus O(1) closed forms for `G`, `D`, `m`, letting me evaluate `z` at stage `n = 6M+1` for the
huge M the route predicts, without building the (astronomically long) word.

**Result: |z − ζ| ≈ 1.2 for every predicted M** — including `M = 111457` with
`‖γM‖ = 1.59×10⁻⁷`. Matching the D-profile to seven digits does **not** make z return.

**Two independent errors, both now understood:**

1. **The damping factors can never match.** ζ's early stages carry
   `m_1=1, m_2=4, m_3=3` → factors `(1−(2/3)^m) = 0.33, 0.80, 0.70`, whereas at large n,
   `m_n ≈ 0.285n` (e.g. `m_74175 = 21137`) makes every factor `1.0`. The predicted residual
   ```
   Σ_j 3^(D_j) (2/3)^(m_{j+1}) = 1.2548
   ```
   matches the observed 1.175–1.254. **Step 4 matched only the D-profile and silently
   ignored these factors.** Stage starts at large n therefore *provably cannot* return to ζ.

2. **The mod-6 restriction was wrong-headed.** The actual near-returns occur at stages
   `n = 64, 95, 122, 131` — **none ≡ 1 (mod 6)**. So the returns are *not* produced by
   β-matching along a fixed residue class at all. They arise from the ramp profile (which
   varies with `n mod 6`) **compensating** the damping mismatch — a multi-parameter
   cancellation, not a clean equidistribution.

**What survives:** Steps 1–3 are exact and reusable —
`D_n = α(f(n)−n) + β_n`, `b_n = frac(γG(n))`, `G(6M+j) − G(6M) − G(j) = Mj`,
`G(6M) = 3M²+8M`, `G(6q+r) = (6q+r) + 3q² + 3q + (r−1)(q+1)` — plus the stage-level formula
and the O(1) evaluators. Any future attempt should build on those and must account for
**all three** ingredients simultaneously: the ramp (n mod 6), the β fluctuation, **and** the
damping factors `(1−(2/3)^{m})`.

**Status.** (CE6) remains **[OPEN]**. Numerically it still looks true (§7.2c), but I have no
proof, and the natural equidistribution route is closed. It is also still contingent on the
corrected construction in §7.2a being the genuine Example 6 — ChatGPT-reported, unverified
against the paper.

*Methodological note: the route looked strong and every individual identity in it checked out.
It died on the first end-to-end test. Run the end-to-end test before believing a chain of
verified lemmas — verified components do not imply a verified conclusion.*

### 7.3 The one structural reframing I can offer

Because the Bernstein conjugacy intertwines the shift with the map,

```
z_k = Φ_ℝ(σ^k v)          (σ = shift)
```

So **(CE6) asks whether `v` is recurrent in a metric that `Φ_ℝ` respects.** If `σ^(k_i)v → v`
in the product topology *and* `Φ_ℝ` were continuous there, (CE6) would follow immediately.

**Naive continuity fails, and this is exactly the difficulty.** At exact critical density
`d_j ≈ j·α⁻¹`, so `2^(d_j)/3^(j+1) ≈ 3^j/3^(j+1) = 1/3` — the terms are **O(1), not
decaying**. Agreement on a long prefix therefore does *not* control the tail. Convergence of
`Φ_ℝ(v)` is conditional and depends on `d_j·α − (j+1) → −∞` (the 1's must drift progressively
*earlier* than mechanical positions). That is exactly what makes Example 6 special, and
exactly why López–Stoll's supercritical argument does not extend to the boundary.

**A viable line of attack:** exploit the recursive block structure of the `(m_n, f(n))`
construction to control the tail discrepancy `d_j·α − (j+1)` under shifts directly, rather
than seeking a continuity argument. The construction is self-similar-ish in n; the recurrence
for `m_n` is explicitly designed to hold `H_n/L_n` at α.

---

## 8. Part VI — Approaches attempted that FAILED **[do not repeat]**

### 8.1 Wrong definitions of "paradoxical" (cost: 2 iterations)

- Defining it as `τ_c(n) < τ(n)` finds **zero** examples up to 2×10⁵ (the coefficient
  stopping time conjecture holds there). Wrong notion.
- Scanning odd n only gives 294/4613, missing the even starters that make up 550/4614.
- **Correct:** `∃j : x_j > n ∧ q_j·log3 < j·log2`, over **all** n, running the full trajectory.

### 8.2 Applying the Denjoy–Koksma ceiling to paradoxical starters **[FAILED]**

I compared observed max n per (j,q) against `A_q*/(e^Λ−1)` with `A_q* ≤ q/(6log2) + 2/3`.
Observed/ceiling ratios came out **25.8, 15.3, 16.0, 4.98** — the ceiling does not bind.
Two reasons: (i) these prefixes are non-ballot (§6.4), so the bound's hypothesis fails; and
(ii) `q ≤ 46` is far too small for an asymptotic-in-q Denjoy–Koksma bound. *I initially
reported the opposite conclusion from this run; it was wrong.*

### 8.3 Independence heuristics for counting paradoxical starters **[FAILED — informatively]**

See §6.5. Diverges; overpredicts by orders of magnitude. The failure localizes the difficulty
but the method is useless for prediction.

### 8.4 Numerical attack on (CE6) by direct summation **[FAILED — important]**

I computed `z_k = Φ_ℝ(σ^k v)` directly at 600 decimal digits (mpmath) and ranked
`|z_k − ζ|` over `k < 4000`, obtaining apparent near-returns as small as 0.19.

**Those numbers were meaningless.** Truncation control: partial sums at 1500 vs 2500 terms
differ by **37 to 93** — two orders of magnitude larger than the distances being ranked. The
apparent near-returns were pure truncation noise. Terms decay only like `3^t` with `t ≈ −7`
even at `j ≈ 2000`.

> **(CE6) is not numerically accessible by direct summation at any precision.** Any attack
> must be analytic. Do not burn compute here.
>
> *Methodological note: I published the ranking before running the truncation control. Run
> the control first.*

### 8.5 Computing `z_k` by iterating the recurrence **[FAILED by construction]**

Iterating `z_{k+1} = (3z_k+1)/2` amplifies error by 3/2 per odd step — hopeless after tens of
steps. Always compute `z_k = Φ_ℝ(σ^k v)` from the tail. (This is correct in principle; it is
the *summation* that fails, §8.4.)

---

## 9. Part VII — Summary of the frontier

| Branch | Status |
|---|---|
| Nontrivial cycles | **Closed to `K > 1.375×10^11`** (Hercher Cor. 29). Elementary methods reach it at 2^72. Nothing here to claim. |
| Reset-compression / local-minima inequalities | **Superseded** by Simons–de Weger Lemma 4. |
| Ballot / Denjoy–Koksma machinery | **Misdirected** — disjoint from the paradoxical objects that exist. |
| Dual shadow | **Superseded** by Bernstein–Lagarias / López–Stoll. Only the opposite-summability *packaging* is possibly new. |
| Finite realization | **Superseded** by Terras–Everett. |
| Paradoxical finiteness (Rozier–Terracol) | Open; verified to 2×10⁸ (odd). Reduction to Collatz is theirs. |
| **(CE6) critical-boundary recurrence** | **OPEN, tractable, explicitly unproven by its authors. ← go here** |

**Recommended next step:** attack (CE6) analytically via the block structure of the Example-6
construction. Secondary: obtain the Garcia–Tal PDF and verify eq. (6) directly (§4.3).

---

## 10. Reproducibility

All scripts are small and self-contained; regenerate rather than trust these numbers blindly.

- **Exact sieve / frontier table:** certified `atanh`-series bounds for log2, log3
  (`log x = 2Σ z^(2k+1)/(2k+1)`, `z=(x−1)/(x+1)`, remainder `< 2z^(2N+3)/((2N+3)(1−z²))`,
  N=400); interval-certified CF of α; enumerate semiconvergents
  `(p_{k−1}+t·p_k)/(q_{k−1}+t·q_k)`, keep those `> α`, test `p/q − α < 1/(3·2^t·log2)`.
- **Paradoxical search:** compiled C (MSVC `cl /O2`); per n run the full trajectory, flag
  `x_j > n ∧ q·log3 < j·log2`.
- **Example-6 word:** the recursion in §7.2, mpmath at ≥400 dps for α.
- The draft's own `verify_constants.py` passes all its assertions — its *arithmetic* is sound;
  its novelty claims are the problem.

---

## 11. Bibliography

- Barina, D. *Improved verification limit for the convergence of the Collatz conjecture.*
  J. Supercomput. **81** (2025), Art. 810. — the 2^71 limit.
- Bernstein, D. J.; Lagarias, J. C. *The 3x+1 conjugacy map.* Canad. J. Math. **48** (1996)
  1154–1169. — the conjugacy; source of the "dual shadow".
- Garcia, M. V. P.; Tal, F. A. *A note on the generalized 3n+1 problem.* Acta Arith. **90**
  (1999) 245–250. — eq. (6), Prop. 1, Cor. 1. **Verify eq. (6) directly; see §4.3.**
- Hercher, C. *There are no Collatz m-Cycles with m ≤ 91.* J. Integer Seq. **26** (2023)
  23.3.5; arXiv:2201.00406. — **Corollary 29** is the operative result.
- Lagarias, J. C. *The 3x+1 problem and its generalizations.* Amer. Math. Monthly **92** (1985) 3–23.
- López, J. L.; Stoll, T. — real Bernstein conjugacy, critical density `log2/log3`,
  **Example 6 / Result 7 / Lemma 26 / Lemma 58**. *(Obtain and verify; this is where the
  live target lives.)*
- Rozier, O.; Terracol, C. *Paradoxical behavior in Collatz sequences.* arXiv:2502.00948;
  Discrete Math. (2026) art. 115167.
- Simons, J.; de Weger, B. *Theoretical and computational bounds for m-cycles of the 3n+1
  problem.* Acta Arith. **117** (2005) 51–70. — **Lemma 4**.
- Tao, T. *Almost all orbits of the Collatz map attain almost bounded values.* Forum Math. Pi
  **10** (2022), e12.
- Terras, R. *A stopping time problem on the positive integers.* Acta Arith. **30** (1976) 241–252.
- **Uncited by the draft, should be checked:** arXiv:2605.13886, *Parity vectors and
  paradoxical sequences in the accelerated Collatz map.*
- **Formalization:** ccchallenge.org is formalizing the Collatz literature — check there
  before building Lean from scratch.

---

## 12. Honest bottom line

The AI-generated draft should **not** be presented as a Collatz advance; ChatGPT itself
reached this verdict and I confirmed every component of it independently. The cycle branch is
superseded, the dual shadow and finite realization are standard, and the ballot machinery is
aimed away from the objects that actually exist.

What genuinely came out of this campaign: the verification-limit frontier table (§3.3), the
extension of Rozier–Terracol to 2×10⁸ (§6.1), the empirical confirmation of the
continued-fraction mechanism (§6.3), the ballot-disjointness result (§6.4), the
anti-correlation diagnosis (§6.5), and the identification and precise formulation of
**(CE6)** as the one live, tractable, genuinely open target (§7.2).

Collatz remains open. Nothing here changes that, and nothing here should be written up as
though it does.
