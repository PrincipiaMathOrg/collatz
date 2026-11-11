import Mathlib.NumberTheory.Padics.PadicVal.Basic
import Mathlib.Analysis.SpecialFunctions.Log.Base
import Mathlib.Analysis.SpecialFunctions.Pow.Real
import Mathlib.Data.ZMod.Basic
import Mathlib.SetTheory.Ordinal.Arithmetic
import Mathlib.Order.Filter.AtTopBot.Basic

/-!
# Collatz skeletons — shared core

Nothing in this project is proved. Every declaration is a `sorry` carrying a status label:

* `PROVED-IN-PAPER` : the source (GPT round / marked-carry paper) claims a proof of the statement.
* `OPEN`            : the source names this as the missing statement.
* `REFUTED`         : the source refutes the *hoped-for* statement; we record the negation.
* `IFF`             : the source proves the statement is *equivalent* to Collatz (a restatement).
* `STANDARD`        : textbook / folklore, not the paper's contribution.

The rounds paper: `C:\Users\anton\Desktop\collatz_rounds_paper\collatz_rounds.tex`.
The marked-carry paper: `C:\Users\anton\Downloads\collatz_marked_carry_paper.pdf`.
-/

namespace Collatz

/-- The shortcut Collatz map `T(n) = n/2` (even), `(3n+1)/2` (odd). -/
def T (n : ℕ) : ℕ := if n % 2 = 0 then n / 2 else (3 * n + 1) / 2

/-- The unshortened map `n/2` or `3n+1`. -/
def C0 (n : ℕ) : ℕ := if n % 2 = 0 then n / 2 else 3 * n + 1

/-- Accelerated odd map `U₊(n) = (3n+1)/2^{v₂(3n+1)}` (`padicValNat 2`). -/
def Uplus (n : ℕ) : ℕ := (3 * n + 1) / 2 ^ (padicValNat 2 (3 * n + 1))

/-- Accelerated `3x-1` map on odd `m ≥ 1`: `U₋(m) = (3m-1)/2^{v₂(3m-1)}`. -/
def Uminus (m : ℕ) : ℕ := (3 * m - 1) / 2 ^ (padicValNat 2 (3 * m - 1))

/-- The Collatz conjecture: every positive integer reaches `1` under `T`. -/
def CollatzConjecture : Prop := ∀ n : ℕ, 0 < n → ∃ k : ℕ, T^[k] n = 1

/-- Odd version: every positive odd integer reaches `1` under `U₊`. -/
def CollatzOdd : Prop := ∀ n : ℕ, 0 < n → n % 2 = 1 → ∃ k : ℕ, Uplus^[k] n = 1

/-- No nontrivial cycle of `T` on the positive integers (only `1 ↦ 2 ↦ 1`). -/
def NoNontrivialCycle : Prop :=
  ∀ n : ℕ, 0 < n → ∀ k : ℕ, 0 < k → T^[k] n = n → n = 1 ∨ n = 2

/-- No divergent orbit: every forward `T`-orbit is bounded. -/
def NoDivergentOrbit : Prop := ∀ n : ℕ, 0 < n → ∃ B : ℕ, ∀ k : ℕ, T^[k] n ≤ B

/-- STANDARD: the two formulations agree. -/
theorem collatz_iff_odd : CollatzConjecture ↔ CollatzOdd := by sorry

/-- STANDARD: Collatz ⟺ no nontrivial cycle ∧ no divergent orbit. -/
theorem collatz_iff_noCycle_noDivergence :
    CollatzConjecture ↔ NoNontrivialCycle ∧ NoDivergentOrbit := by sorry

/-- STANDARD: if Collatz fails there is a least counterexample, whose whole orbit stays `≥ n`. -/
theorem exists_least_counterexample (h : ¬ CollatzConjecture) :
    ∃ n : ℕ, 0 < n ∧ (∀ k, T^[k] n ≠ 1) ∧ ∀ k, n ≤ T^[k] n := by sorry

/-! ## Valuation (exponent) words -/

/-- A valuation word `w = (a₀,…,a_{r-1})`, each `aᵢ ≥ 1`, as a list of naturals. -/
abbrev Word := List ℕ

/-- Partial sums `A_k = a₀ + ⋯ + a_{k-1}`. -/
def A (w : Word) (k : ℕ) : ℕ := (w.take k).sum

/-- Total exponent `A_r`. -/
def Atot (w : Word) : ℕ := w.sum

/-- Carries `C₀ = 0`, `C_{k+1} = 3 C_k + 2^{A_k}`. -/
def C (w : Word) : ℕ → ℕ
  | 0 => 0
  | k + 1 => 3 * C w k + 2 ^ A w k

/-- Total carry `C_r`. -/
def Ctot (w : Word) : ℕ := C w w.length

/-- `w` is the exact `U₊`-valuation word of the odd start `n`:
`w[i] = v₂(3·U₊^i(n)+1)`. -/
def IsExactWord (w : Word) (n : ℕ) : Prop :=
  ∀ i (hi : i < w.length), w[i] = padicValNat 2 (3 * Uplus^[i] n + 1)

/-- Coefficient barrier `2^{A_k} < 3^k` for `1 ≤ k ≤ r`. -/
def Barrier (w : Word) : Prop := ∀ k, 1 ≤ k → k ≤ w.length → 2 ^ A w k < 3 ^ k

/-- `y`-terminal: `3^r ∣ C_r + 2^{A_r} y`. -/
def Terminal (w : Word) (y : ℕ) : Prop := 3 ^ w.length ∣ Ctot w + 2 ^ Atot w * y

/-- The all-ones word of length `r`. -/
def allOnes (r : ℕ) : Word := List.replicate r 1

/-- STANDARD (marked-carry (3.2), rounds paper (1)): the affine identity
`2^{A_k} U₊^k(n) = 3^k n + C_k` for the exact word. -/
theorem affine_identity (w : Word) (n : ℕ) (hn : n % 2 = 1) (hw : IsExactWord w n)
    (k : ℕ) (hk : k ≤ w.length) :
    2 ^ A w k * Uplus^[k] n = 3 ^ k * n + C w k := by sorry

/-- STANDARD (marked-carry (3.2), minus sign): `2^{A_r} U₋^r(m) = 3^r m − C_r`. -/
theorem affine_identity_minus (w : Word) (m : ℕ) (hw : ∀ i (hi : i < w.length),
    w[i] = padicValNat 2 (3 * Uminus^[i] m - 1)) (k : ℕ) (hk : k ≤ w.length) :
    2 ^ A w k * Uminus^[k] m + C w k = 3 ^ k * m := by sorry

/-- PROVED-IN-PAPER (marked-carry Lemma 4.1): `C_r + 2^{A_r} ≥ 3^r`, equality iff all-ones. -/
theorem terminal_carry_min (w : Word) (hw : ∀ a ∈ w, 1 ≤ a) :
    3 ^ w.length ≤ Ctot w + 2 ^ Atot w ∧
      (Ctot w + 2 ^ Atot w = 3 ^ w.length ↔ w = allOnes w.length) := by sorry

end Collatz
