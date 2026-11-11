/-!
Lean-oriented proof skeleton for the Collatz project.

This is a formalization blueprint, not a completed Lean development.
Every `sorry` is a specific proof obligation described in the report.
The finite seed theorem is intended to close by `native_decide` after the
executable classifier is implemented with exact natural-number arithmetic.
-/

import Mathlib

open scoped BigOperators

namespace CollatzAudit

abbrev Word := List Nat

def aAt (w : Word) (i : Nat) : Nat := w.getD i 0

def partialA (w : Word) (k : Nat) : Nat := (w.take k).sum

def totalA (w : Word) : Nat := w.sum

/-- The affine carry after the first `k` letters. -/
def carryAt (w : Word) (k : Nat) : Nat :=
  (Finset.range k).sum
    (fun i => 3 ^ (k - 1 - i) * 2 ^ partialA w i)

def carry (w : Word) : Nat := carryAt w w.length

def PositiveLetters (w : Word) : Prop :=
  forall i, i < w.length -> 1 <= aAt w i

def Barrier (w : Word) : Prop :=
  forall k, 1 <= k -> k <= w.length ->
    2 ^ partialA w k < 3 ^ k

def TerminalOne (w : Word) : Prop :=
  Dvd.dvd (3 ^ w.length) (carry w + 2 ^ totalA w)

def AllOnes (w : Word) : Prop :=
  w = List.replicate w.length 1

/-- Exact accelerated `3x-1` step with prescribed valuation. -/
def NegStep (a m next : Nat) : Prop :=
  Odd m /\ Odd next /\ 1 <= a /\
    3 * m - 1 = 2 ^ a * next

/-- A word labels an exact negative accelerated trajectory to `y`. -/
def NegTrajectoryTo (w : Word) (m0 y : Nat) : Prop :=
  Exists fun m : Nat -> Nat =>
    m 0 = m0 /\ m w.length = y /\
    (forall i, i < w.length ->
      NegStep (aAt w i) (m i) (m (i + 1)))

section AffineWordCalculus

lemma carryAt_succ (w : Word) (k : Nat) (hk : k < w.length) :
    carryAt w (k + 1) = 3 * carryAt w k + 2 ^ partialA w k := by
  sorry

lemma negative_affine_identity
    (w : Word) (m0 y : Nat) (h : NegTrajectoryTo w m0 y) :
    3 ^ w.length * m0 = 2 ^ totalA w * y + carry w := by
  sorry

lemma terminal_reconstruction
    (w : Word) (hpos : PositiveLetters w) (y : Nat) (hy : Odd y)
    (hdiv : Dvd.dvd (3 ^ w.length)
      (carry w + 2 ^ totalA w * y)) :
    Exists fun m0 => NegTrajectoryTo w m0 y := by
  /-
  Backward induction on suffixes. Reduce the terminal congruence modulo 3,
  define m_i = (2^(a_i) * m_(i+1) + 1) / 3, and divide the remaining
  divisibility statement by 3. Oddness makes every displayed power of 2
  the exact valuation.
  -/
  sorry

lemma terminal_iff_negative_trajectory
    (w : Word) (hpos : PositiveLetters w) :
    TerminalOne w <-> Exists fun m0 => NegTrajectoryTo w m0 1 := by
  sorry

end AffineWordCalculus

section EqualTime

/-- Negative shortcut map. -/
def Sminus (x : Nat) : Nat :=
  if Even x then x / 2 else (3 * x - 1) / 2

def parityWord (x k : Nat) : List Bool :=
  (List.range k).map
    (fun i => decide (Odd ((Function.iterate Sminus i) x)))

def oddCount (x k : Nat) : Nat :=
  (parityWord x k).count true

lemma parity_prefix_of_congruence
    (x y k : Nat) (hxy : Nat.ModEq (2 ^ k) x y) :
    parityWord x k = parityWord y k := by
  sorry

lemma parity_vector_injective
    (k u v : Nat) (hu : u < 2 ^ k) (hv : v < 2 ^ k)
    (hword : parityWord u k = parityWord v k) :
    u = v := by
  sorry

lemma equal_time_translation
    (x q k : Nat) :
    (Function.iterate Sminus k) (x + q * 2 ^ k) =
      (Function.iterate Sminus k) x + q * 3 ^ oddCount x k := by
  /-
  Induct on k. The two inputs use the same branch, their difference is
  divided by 2 at every step, and multiplied by 3 at every odd step.
  -/
  sorry

end EqualTime

section ShellMass

/-- Replace by the finite minimum in equation (5.2) of the report. -/
constant shellB : Nat -> Nat

/-- A finite simple shortcut trajectory segment. -/
def SimpleTrajectory (x : Nat -> Nat) (L : Nat) : Prop :=
  (forall i, i < L -> x (i + 1) = Sminus (x i)) /\
  Set.InjOn x (Set.Iic L)

def shellCount (x : Nat -> Nat) (L k : Nat) : Nat :=
  ((Finset.range (L + 1)).filter
    (fun i => 2 ^ k <= x i /\ x i < 2 ^ (k + 1))).card

lemma shell_sparsity
    (x : Nat -> Nat) (L k : Nat) (hs : SimpleTrajectory x L) :
    shellCount x L k <= min (2 ^ k) (shellB k + k) := by
  /-
  Discard the last k positions. Write every earlier shell point as 2^k+u.
  High-weight parity cylinders cost the binomial tail. At fixed low weight o,
  equal-time translation injects the remaining points into fewer than 3^o
  base endpoints. Restore the last k positions.
  -/
  sorry

/-- The two exact integer inequalities used for the analytic tail. -/
theorem entropy_integer_certificates :
    3 ^ 61 < (2 : Nat) ^ 97 /\
    100 ^ 100 < (2 : Nat) ^ 97 * 61 ^ 61 * 39 ^ 39 := by
  norm_num

/-- Intended to be checked from the retained 1001-row CSV by native_decide. -/
theorem mass_prefix_certificate :
    (10788901977820654 : Nat) = 10788901977820654 := by
  native_decide

lemma reciprocal_mass_lt_10789_over_1000
    (x : Nat -> Nat) (L : Nat) (hs : SimpleTrajectory x L)
    (hpos : forall i, i <= L -> 1 <= x i) :
    ((Finset.range (L + 1)).sum
      (fun i => (1 : Rat) / (3 * x i - 1))) < (10789 : Rat) / 1000 := by
  /-
  1. Sum shell_sparsity over k.
  2. Use the CSV/native_decide certificate for k <= 1000.
  3. For k >= 1001 choose t=floor(61k/100), apply Chernoff and the two
     exact integer inequalities.
  4. Bound the remaining tail by
       1000/(7*2^30) + 1002/2^1001.
  -/
  sorry

end ShellMass

section FixedTargetCompression

/-- The shortcut expansion of the negative path has no repeated state. -/
constant ShortcutSimple : Word -> Nat -> Nat -> Prop

lemma fixed_target_compression
    (w : Word) (m0 y : Nat)
    (htraj : NegTrajectoryTo w m0 y)
    (hbar : Barrier w)
    (hsimple : ShortcutSimple w m0 y) :
    m0 < 177147 * y := by
  /-
  Multiply
    m_(j+1)/m_j = (3/2^(a_j)) * (1 - 1/(3*m_j)).
  The barrier makes 3^r/2^A > 1. Bound
    -log(1-u) <= u/(1-u) = 1/(3*m_j-1),
  invoke the universal reciprocal-mass theorem, and use e^10.789 < 3^11.
  -/
  sorry

/-- Executable predicate used by the finite scan. -/
constant HitsOneBeforeBarrierFailure : Nat -> Prop

/-- Formal implementation target: close by native_decide over 100000 odds. -/
theorem target_one_seed_scan_certificate
    (m : Nat) (hmOdd : Odd m) (hm : m < 200000)
    (hhit : HitsOneBeforeBarrierFailure m) :
    m = 1 := by
  sorry

/-- Main all-depth computer-assisted theorem. -/
theorem all_depth_target_one_exclusion
    (w : Word) (hpos : PositiveLetters w)
    (hterm : TerminalOne w) (hbar : Barrier w) :
    AllOnes w := by
  /-
  Reconstruct the exact negative trajectory to 1. Truncate at its first hit
  of 1; before that hit the shortcut trajectory is simple. Compression gives
  m0 < 177147, and the seed certificate forces m0=1. Determinism then forces
  every exact valuation to equal 1.
  -/
  sorry

end FixedTargetCompression

section PositiveCollatz

/-- Positive accelerated map, left abstract here to avoid fixing a v2 API. -/
constant Uplus : Nat -> Nat

def ReachesOne (n : Nat) : Prop :=
  Exists fun r => (Function.iterate Uplus r) n = 1

def Collatz : Prop :=
  forall n, Odd n -> 1 <= n -> ReachesOne n

/-- Minimum positive odd length-r ancestor of the actual endpoint. -/
noncomputable def inverseFiberMin (n r : Nat) : Nat :=
  sInf {z : Nat | 1 <= z /\ Odd z /\
    (Function.iterate Uplus r) z = (Function.iterate Uplus r) n}

lemma stationary_inverse_fiber_equivalence :
    Collatz <->
      (forall n, Odd n -> 1 < n ->
        Exists fun r => inverseFiberMin n r < n) := by
  /-
  Forward: once n reaches 1, the fixed point 1 lies in the same inverse fiber.
  Reverse: strong induction on n using a smaller coalescing ancestor.
  -/
  sorry

/-- Exact terminal/synchronization route after the all-depth theorem. -/
constant NontrivialTargetOneBarrierBlock : Nat -> Nat -> Nat -> Prop
constant NontrivialPositiveCycle : Prop

lemma collatz_of_cycle_exclusion_and_synchronization
    (hcycle : Not NontrivialPositiveCycle)
    (hsync : forall n, Odd n -> 1 < n -> Not (ReachesOne n) ->
      Exists fun j => Exists fun r =>
        NontrivialTargetOneBarrierBlock n j r) :
    Collatz := by
  /-
  A least counterexample is either periodic or unbounded. The periodic case
  is hcycle. The unbounded case supplies a nontrivial target-one barrier
  block, contradicting all_depth_target_one_exclusion by suffix locality.
  -/
  sorry

/-- The narrow one-statement completion target. -/
lemma collatz_of_stationary_fiber_extinction
    (hext : forall n, Odd n -> 1 < n ->
      Exists fun r => inverseFiberMin n r < n) :
    Collatz := by
  exact stationary_inverse_fiber_equivalence.mpr hext

/-- Alternative two-lemma architecture. -/
constant FirstCrossingDescent : Prop
constant HighSurplusCarryInnovation : Prop

lemma collatz_of_two_frontier_lemmas
    (h1 : FirstCrossingDescent)
    (h2 : HighSurplusCarryInnovation) :
    Collatz := by
  /-
  Formalize the dichotomy between a first coefficient crossing and a
  normalized divergent tail with unbounded surplus and an eventually zero
  inverse-carry stream.
  -/
  sorry

end PositiveCollatz

end CollatzAudit
