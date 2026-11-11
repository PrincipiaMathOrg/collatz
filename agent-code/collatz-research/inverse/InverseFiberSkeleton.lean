import Mathlib

/-!
Corrected Lean-oriented skeleton for Architectures B and C.

This file is a blueprint. Every `sorry` is an explicit theorem debt. Unlike
the supplied skeleton, FCD and HSCI are definitions rather than opaque
propositional constants. The accelerated map is kept relational in the
finite-envelope section, so no theorem is asserted about an unconstrained
function constant.
-/

open scoped BigOperators

namespace CollatzInverse

abbrev Word := List Nat

def aAt (w : Word) (i : Nat) : Nat := w.getD i 0

def partialA (w : Word) (k : Nat) : Nat := (w.take k).sum

def totalA (w : Word) : Nat := w.sum

def carry (w : Word) : Nat :=
  (Finset.range w.length).sum
    (fun i => 3 ^ (w.length - 1 - i) * 2 ^ partialA w i)

def PositiveLetters (w : Word) : Prop :=
  forall i, i < w.length -> 1 <= aAt w i

/-- One exact accelerated positive step, expressed without a `v2` API. -/
def PosStep (a x y : Nat) : Prop :=
  Odd x /\ Odd y /\ 1 <= a /\ 3 * x + 1 = 2 ^ a * y

def PosTrajectoryTo (w : Word) (x0 X : Nat) : Prop :=
  Exists fun x : Nat -> Nat =>
    x 0 = x0 /\ x w.length = X /\
    (forall i, i < w.length ->
      PosStep (aAt w i) (x i) (x (i + 1)))

/-- The affine equation defining a candidate ancestor. -/
def AffineAncestor (w : Word) (X z : Nat) : Prop :=
  3 ^ w.length * z + carry w = 2 ^ totalA w * X

/-- The finite exponent box from equation (1) of `inverse_fiber.md`. -/
def ExponentCapped (n : Nat) (w : Word) : Prop :=
  forall i, i < w.length ->
    2 ^ aAt w i <= 3 * 2 ^ i * n + 1

def FiniteEnvelopeWitness (n r X z : Nat) : Prop :=
  Exists fun w : Word =>
    w.length = r /\ PositiveLetters w /\ ExponentCapped n w /\
    AffineAncestor w X z /\ z <= n

def HasTrajectoryLength (r z X : Nat) : Prop :=
  Exists fun w : Word => w.length = r /\ PosTrajectoryTo w z X

section FiniteEnvelope

lemma positive_reconstruction
    (w : Word) (X : Nat) (hX : Odd X) (hpos : PositiveLetters w)
    (hdiv : ((3 : Int) ^ w.length) ∣
      ((2 : Int) ^ totalA w * X - carry w)) :
    Exists fun z : Nat => PosTrajectoryTo w z X := by
  /-
  Propagate divisibility through the suffix quantities
    E_i = 2^(suffix sum) * X - carry(suffix).
  Then set x_i = E_i / 3^(remaining length). Positivity, oddness, and exact
  valuation follow by backward induction from X.
  -/
  sorry

lemma orbit_two_power_bound
    (w : Word) (z X : Nat) (hz : 1 <= z)
    (htraj : PosTrajectoryTo w z X) :
    Exists fun x : Nat -> Nat =>
      x 0 = z /\ x w.length = X /\
      (forall i, i < w.length ->
        PosStep (aAt w i) (x i) (x (i + 1))) /\
      (forall i, i <= w.length -> x i <= 2 ^ i * z) := by
  /-
  Select the actual trajectory from `htraj`, then induct using
  U(x) <= (3*x+1)/2 <= 2*x.
  -/
  sorry

lemma minimizing_word_is_capped
    (w : Word) (n z X : Nat) (hz : z <= n)
    (htraj : PosTrajectoryTo w z X) :
    ExponentCapped n w := by
  /-
  At time i, x_i <= 2^i*n and
    2^(a_i) * x_(i+1) = 3*x_i+1.
  Since x_(i+1) >= 1, the cap follows.
  -/
  sorry

/-- Finite replacement for the `sInf` definition of the inverse-fiber min. -/
lemma finite_envelope_formula
    (n r X m : Nat) (hn : Odd n) (hX : Odd X)
    (hntraj : HasTrajectoryLength r n X) :
    (FiniteEnvelopeWitness n r X m /\
      (forall z, FiniteEnvelopeWitness n r X z -> m <= z)) <->
    (HasTrajectoryLength r m X /\ m <= n /\
      forall z, HasTrajectoryLength r z X -> z <= n -> m <= z) := by
  sorry

end FiniteEnvelope

section FirstCrossing

def shortcut (x : Nat) : Nat :=
  if Even x then x / 2 else (3 * x + 1) / 2

def parityAt (n k : Nat) : Nat :=
  if Odd ((Function.iterate shortcut k) n) then 1 else 0

def oddCount (n k : Nat) : Nat :=
  (Finset.range k).sum (fun i => parityAt n i)

def FirstCrossingAt (n k : Nat) : Prop :=
  1 <= k /\
  3 ^ oddCount n k < 2 ^ k /\
  forall j, j < k -> 2 ^ j <= 3 ^ oddCount n j

def FirstCrossingDescent : Prop :=
  forall n k, 1 < n -> FirstCrossingAt n k ->
    (Function.iterate shortcut k) n < n

end FirstCrossing

section FirstCrossingWordArithmetic

/-!
The declarations in this section are the word-level arithmetic blueprint for
the reduced-modulus First-Crossing route.  The `audited_*` declarations are
slots for results already proved in the research ledger from affine algebra,
P7.1, and the exact finite denominator certificate.  Only the two final
all-weight assertions are open mathematical debts.
-/

abbrev ShortcutWord := List Bool

def bitAt (w : ShortcutWord) (i : Nat) : Nat :=
  if w.getD i false then 1 else 0

def bitPrefixOnes (w : ShortcutWord) (j : Nat) : Nat :=
  (Finset.range j).sum (fun i => bitAt w i)

def fcS (w : ShortcutWord) : Nat := bitPrefixOnes w w.length

def fcM (w : ShortcutWord) : Nat := 2 ^ w.length

def fcP (w : ShortcutWord) : Nat := 3 ^ fcS w

def fcD (w : ShortcutWord) : Nat := fcM w - fcP w

def fcC (w : ShortcutWord) : Nat :=
  (Finset.range w.length).sum (fun j =>
    if bitAt w j = 1 then
      2 ^ j * 3 ^ (fcS w - bitPrefixOnes w (j + 1))
    else 0)

def PrimitiveFirstCrossingWord (w : ShortcutWord) : Prop :=
  1 <= w.length /\
  fcP w < fcM w /\
  forall j, j < w.length -> 2 ^ j <= 3 ^ bitPrefixOnes w j

def NonBoundaryFirstCrossingWord (w : ShortcutWord) : Prop :=
  PrimitiveFirstCrossingWord w /\
  Not (w = [false]) /\ Not (w = [true, false])

/-- The unique residue `tau` is selected inside `[0,D)`. -/
noncomputable def fcTau (w : ShortcutWord) : Nat :=
  Nat.findGreatest
    (fun t => Nat.ModEq (fcD w) (fcM w * t) (fcC w))
    (fcD w - 1)

/-- Canonical ordinary seed for the shortcut parity cylinder. -/
noncomputable def fcRho (w : ShortcutWord) : Nat :=
  Nat.findGreatest
    (fun r => Nat.ModEq (fcM w) (fcP w * r + fcC w) 0)
    (fcM w - 1)

noncomputable def fcZ (w : ShortcutWord) : Nat :=
  (fcP w * fcRho w + fcC w) / fcM w

noncomputable def fcDelta (w : ShortcutWord) : Int :=
  (fcZ w : Int) - fcRho w

noncomputable def fcMargin (w : ShortcutWord) : Int :=
  (fcM w : Int) * fcTau w - fcC w

def AllWeightTauBound : Prop :=
  forall w, NonBoundaryFirstCrossingWord w -> fcS w <= 3 * fcTau w

def AllWeightExactMargin : Prop :=
  forall w, NonBoundaryFirstCrossingWord w -> 0 < fcMargin w

/-- Imported proved slot: existence, uniqueness, and range of the residue. -/
axiom audited_fcTau_spec (w : ShortcutWord)
    (hw : NonBoundaryFirstCrossingWord w) :
    fcTau w < fcD w /\
    Nat.ModEq (fcD w) (fcM w * fcTau w) (fcC w)

/--
Imported proved slot.  P7.1 handles all `s >= 63`; the exact integer
certificate handles `s <= 62`.  This is `D > s/3` without division.
-/
axiom audited_fc_denominator_gap (w : ShortcutWord)
    (hw : NonBoundaryFirstCrossingWord w) :
    fcS w < 3 * fcD w

/-- Imported proved slot: the canonical displacement has exactly two lifts. -/
axiom audited_fc_two_lift (w : ShortcutWord)
    (hw : NonBoundaryFirstCrossingWord w) :
    fcDelta w = (fcTau w : Int) \/
    fcDelta w = (fcTau w : Int) - fcD w

/-- Imported proved slot: descent is exactly positivity of `M*tau-C`. -/
axiom audited_fc_exact_margin (w : ShortcutWord)
    (hw : NonBoundaryFirstCrossingWord w) :
    fcZ w < fcRho w <-> 0 < fcMargin w

/-- Imported proved slot: the one-third residue estimate is sufficient. -/
axiom audited_fc_margin_of_tau (w : ShortcutWord)
    (hw : NonBoundaryFirstCrossingWord w)
    (htau : fcS w <= 3 * fcTau w) :
    0 < fcMargin w

theorem all_weight_exact_margin_of_tau
    (h : AllWeightTauBound) : AllWeightExactMargin := by
  intro w hw
  exact audited_fc_margin_of_tau w hw (h w hw)

/-- Genuine open debt, stronger than necessary but sufficient for FCD. -/
theorem all_weight_tau_bound_debt : AllWeightTauBound := by
  sorry

/-- Genuine open debt in its exact, weakest word-level form. -/
theorem all_weight_exact_margin_debt : AllWeightExactMargin := by
  sorry

end FirstCrossingWordArithmetic

section HighSurplus

abbrev ParitySeq := Nat -> Bool

def epsNat (eps : ParitySeq) (k : Nat) : Nat :=
  if eps k then 1 else 0

def prefixOnes (eps : ParitySeq) (k : Nat) : Nat :=
  (Finset.range k).sum (fun i => epsNat eps i)

/-- Canonical endpoint in the intrinsic inverse-carry recursion. -/
def invZ (eps : ParitySeq) : Nat -> Nat
  | 0 => 0
  | k + 1 =>
      let e := epsNat eps k
      let b := (invZ eps k + e) % 2
      (3 ^ e * invZ eps k + e + b * 3 ^ prefixOnes eps (k + 1)) / 2

def inverseCarryBit (eps : ParitySeq) (k : Nat) : Nat :=
  (invZ eps k + epsNat eps k) % 2

def CoefficientBarrier (eps : ParitySeq) : Prop :=
  forall k, 2 ^ k <= 3 ^ prefixOnes eps k

/-- Integer-only form of surplus tending to infinity. -/
def UnboundedCriticalSurplus (eps : ParitySeq) : Prop :=
  forall E, Exists fun K => forall k, K <= k ->
    3 ^ E * 2 ^ k <= 3 ^ prefixOnes eps k

def InfinitelyManyCarryInnovations (eps : ParitySeq) : Prop :=
  forall K, Exists fun k => K <= k /\ inverseCarryBit eps k = 1

def HighSurplusCarryInnovation : Prop :=
  forall eps,
    CoefficientBarrier eps ->
    UnboundedCriticalSurplus eps ->
    InfinitelyManyCarryInnovations eps

/-- Ordinary lifting is the indispensable nonlocal input. -/
def EventuallyZeroCarry (eps : ParitySeq) : Prop :=
  Exists fun K => forall k, K <= k -> inverseCarryBit eps k = 0

constant IsParitySequenceOf : Nat -> ParitySeq -> Prop

lemma finite_support_ordinary_lift (eps : ParitySeq) :
    EventuallyZeroCarry eps <->
      Exists fun n : Nat => IsParitySequenceOf n eps := by
  sorry

end HighSurplus

section Completion

constant Collatz : Prop
constant NoDivergentOrbit : Prop

lemma hsci_iff_no_divergence
    (hNormalization : True) :
    HighSurplusCarryInnovation <-> NoDivergentOrbit := by
  /-
  Forward: a divergent orbit, shifted to a global coefficient minimum, has
  the barrier and unbounded surplus, while ordinary lifting makes its carry
  bits eventually zero.

  Reverse: failure of HSCI gives an ordinary integer by finite support. Its
  coefficient tends to infinity, and the affine identity forces its orbit to
  tend to infinity.

  Replace `hNormalization : True` by the formal Garcia-Tal orbit-sparsity
  theorem used to prove existence of the global coefficient minimum.
  -/
  sorry

lemma collatz_of_fcd_and_hsci
    (hFCD : FirstCrossingDescent)
    (hHSCI : HighSurplusCarryInnovation) :
    Collatz := by
  /-
  Use a least counterexample. FCD eliminates the first coefficient crossing,
  including the periodic case. The remaining orbit is divergent and stays in
  the barrier. Barrier normalization gives unbounded surplus, while ordinary
  lifting gives eventual zero carry, contradicting HSCI.
  -/
  sorry

end Completion

end CollatzInverse
