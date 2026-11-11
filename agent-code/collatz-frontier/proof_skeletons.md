# Nonredundant full-Collatz proof skeletons

These are the six nonredundant proof architectures found in the repository and the selected external-source review that survive the following test: if every displayed open step were proved, the ordinary Collatz conjecture would follow. A specialized sector is not listed as a skeleton when its completion would still leave unrestricted cycles or divergence. The canonical claims and evidence paths cited below are defined in the [result ledger](result_ledger.md); the complete structured form is [`data/skeletons.json`](data/skeletons.json).

The internal word-based routes use the accelerated odd map

\[
U(x)=\frac{3x+1}{2^{v_2(3x+1)}}
\qquad (x>0\text{ odd}).
\]

`Collatz` means \(\forall n>0\) odd, \(\exists k\ge 0\), \(U^k(n)=1\). This is equivalent to the ordinary even/odd formulation and to the shortcut-map formulations used in `SK-YAH`, `SK-RDC`, and `SK-QPOLY` (`DEF-U-01`; [Lagarias 1985](https://doi.org/10.2307/2322189)).

## SK-TSC: terminal synchronization plus cycle integrality

**Completion certificate.** The only open steps are TSC-04 and TSC-07. TSC-04 eliminates the unbounded-orbit alternative; TSC-07 eliminates the nontrivial-cycle alternative. TSC-09 then proves full Collatz.

### TSC-01 — affine and target-dual language (closed)

For a valuation word \(a\), with \(A_k\) and \(C_k\) as in `DEF-WORD-01`, prove

\[
2^{A_k}x_k=3^kx_0+C_k,
\]

together with carry concatenation, suffix divisibility, and the strict-barrier target duality.

```lean
theorem affine_iterate
    (x : OddPos) (a : ValuationWord) (k : Nat) (hk : k ≤ a.length) :
    2 ^ partialA a k * orbit x k = 3 ^ k * x + carryAt a k := by
  ...
```

Citations: `DEF-U-01`, `DEF-WORD-01`, `THM-AFFINE-01`, `THM-BARRIER-DUALITY-01`.

### TSC-02 — counterexample dichotomy (closed)

If Collatz is false, choose the least positive odd \(n\) not reaching \(1\). Its orbit never falls below \(n\). A bounded infinite orbit of a deterministic map on the integers repeats, hence enters a nontrivial cycle; otherwise it is unbounded. Therefore

\[
\neg\mathrm{Collatz}
\Longrightarrow
\exists n\,[\operatorname{Unbounded}(U,n)\lor
\operatorname{NontrivialCycle}(U,n)].
\]

```lean
theorem least_counterexample_dichotomy (h : ¬ Collatz) :
    ∃ n : OddPos, MinimalBad n ∧
      (UnboundedOrbit U n ∨ EntersNontrivialCycle U n) := by
  ...
```

Citation: `DEF-U-01`.

### TSC-03 — normalize the divergent alternative (closed)

Every unbounded positive orbit has a tail whose valuation word is an infinite strict barrier and whose surplus tends to infinity. Because this is the parity-cylinder chain of one ordinary integer, its least positive dyadic representative eventually stabilizes to that integer.

```lean
theorem normalize_unbounded (n : OddPos) (h : UnboundedOrbit U n) :
    ∃ w : BarrierRay,
      SurplusTendsToInfinity w ∧ EventuallyConstantLeastLift w := by
  ...
```

Citations: `THM-DIV-NORM-01`, `THM-DIV-FIXEDRAY-01`, `THM-DIV-RETURN-01`.

### TSC-04 — binary–ternary stabilization (open)

Prove that an infinite strict-barrier word with eventually constant least dyadic representative has a moving subblock whose deficit-two or deficit-three terminal congruence lies outside the certified lists, or else directly has a smaller positive coalescing ancestor:

\[
\operatorname{BarrierRay}(w)\wedge
\operatorname{EventuallyConstantLeastLift}(w)
\Longrightarrow
\operatorname{BadDeficit}_{2,3}(w)
\lor
\operatorname{SmallerCoalescingAncestor}(w).
\]

```lean
theorem binary_ternary_stabilization
    (w : BarrierRay) (h : EventuallyConstantLeastLift w) :
    BadDeficitTwoOrThree w ∨ ExistsSmallerCoalescingAncestor w := by
  -- OPEN
```

Citations: `OPEN-BTS-01`, `CERT-DEFICIT23-01`, `THM-DIV-RETURN-01`.

This must be an infinite, same-ray statement. The archive contains exact countermodels to fixed-window, finite-factor, compactness, simple entropy, and bounded-synchronization substitutes.

### TSC-05 — no unbounded orbit (closed implication)

Apply TSC-04 to TSC-03. The first conclusion contradicts the complete deficit-two/three classifications; the second contradicts minimality of the counterexample. Thus TSC-04 implies that no positive orbit is unbounded.

```lean
theorem no_unbounded_of_stabilization
    (hBTS : BinaryTernaryStabilization) :
    ∀ n : OddPos, ¬ UnboundedOrbit U n := by
  ...
```

Citations: `CERT-TARGET1-01`, `CERT-DEFICIT23-01`, `THM-DIV-NORM-01`, `OPEN-BTS-01`.

### TSC-06 — normalize the cycle alternative (closed/certified)

Every nontrivial positive cycle yields a primitive strict-record word \(a\) of length \(r\) with

\[
A=\lceil r\log_2 3\rceil,
\qquad D=2^A-3^r>0,
\qquad D\mid C(a).
\]

The imported verification bound and the certified shell argument also give \(\min_i x_i>2^{71}\) and \(r\ge 72{,}057{,}431{,}991\).

```lean
theorem cycle_to_integral_word (c : NontrivialCycle U) :
    ∃ a : ValuationWord,
      PrimitiveStrictRecordOneStrip a ∧ determinant a ∣ carry a := by
  ...
```

Citations: `THM-CYCLE-REDUCE-01`, `THM-CYCLE-COMPLEXITY-01`.

### TSC-07 — cycle integrality obstruction (open)

Prove, except for the trivial cycle word,

\[
(2^A-3^r)\nmid C(a)
\]

for every primitive strict-record word satisfying \(A=\lceil r\log_2 3\rceil\). Equivalently, if

\[
q=\frac{D}{\gcd(D,C(a))},
\]

prove \(q>1\).

```lean
theorem cycle_integrality_obstruction
    (a : ValuationWord) (h : PrimitiveStrictRecordOneStrip a)
    (hnontrivial : ¬ TrivialWord a) :
    ¬ determinant a ∣ carry a := by
  -- OPEN
```

Citations: `OPEN-CYCLE-INT-01`, `THM-CYCLE-SINGLECLASS-01`, `THM-CYCLE-BOUNDARY-WIND-01`, `THM-CYCLE-WIND-CST-01`, `THM-CYCLE-SHADOW-01`, `OPEN-CYCLE-WIND-01`, `NOGO-CYCLE-UNIVERSAL-01`, `NOGO-CYCLE-LATTICE-01`.

The post-master audit is decisive about the frontier: rotation congruences, all-height residues, prime-power tests, block Smith normal form, and linear conjugacies all recover this same class \(C\bmod D\). A successful proof must introduce information genuinely sensitive to \(q=1\), such as a new integer-spacing or paired-shadow compression law.

The current full-modulus formulation supplies such a coordinate. If

\[
\rho=[-C(3^r)^{-1}]_{2^A},
\qquad
Z=[C(2^A)^{-1}]_{3^r},
\]

then `THM-CYCLE-BOUNDARY-WIND-01` gives

\[
\rho-Z=\gcd(C,D)\,\kappa.
\]

In the audited cycle range, \(q=1\) is exactly \(\kappa=0\). The active sufficient strengthening `OPEN-CYCLE-WIND-01` asks for \(\kappa>0\) on every nontrivial primitive strict-record word. It is exact through \(r=20\) and survives 22,000 longer deterministic random tests, but this finite evidence is not an all-depth proof and the stronger sign law is not substituted for the original gate. Moreover, `THM-CYCLE-WIND-CST-01` proves that negative winding at the least rational rotation would produce a coefficient-contractive integer segment whose first term is its strict minimum. `THM-CYCLE-SHADOW-01` gives the absolute reformulation \(\rho>Z\Longleftrightarrow T<D\) for the paired shadow. `NOGO-CYCLE-LATTICE-01` shows that even every proper terminal-preserving subideal and every relative wrap can support an isolated translated failure; the missing estimate must retain the unshifted front carry. The sign gate is therefore a cycle-specialized coefficient-stopping problem, not a routine residue estimate.

### TSC-08 — no nontrivial cycle (closed implication)

TSC-06 supplies a word with \(D\mid C(a)\); TSC-07 forbids it. Hence there is no nontrivial positive cycle.

```lean
theorem no_nontrivial_cycles
    (hInt : CycleIntegralityObstruction) :
    ∀ c, ¬ NontrivialCycle U c := by
  ...
```

Citations: `THM-CYCLE-REDUCE-01`, `OPEN-CYCLE-INT-01`.

### TSC-09 — full conclusion (closed implication)

TSC-05 and TSC-08 eliminate both alternatives in TSC-02. Therefore Collatz holds.

```lean
theorem collatz_of_BTS_and_integrality
    (hBTS : BinaryTernaryStabilization)
    (hInt : CycleIntegralityObstruction) : Collatz := by
  ...
```

Citations: `OPEN-BTS-01`, `OPEN-CYCLE-INT-01`, `DEF-U-01`.

## SK-INV: stationary inverse-fiber extinction

**Completion certificate.** The only open step is INV-03. INV-04 proves full Collatz from it. This is the cleanest logical skeleton, but its gate is known to be equivalent to Collatz rather than a weaker lemma.

### INV-01 — stationary fiber minimum (closed)

For odd \(n>0\), define

\[
M_r(n)=\min\{z>0\text{ odd}:U^r(z)=U^r(n)\}.
\]

The set is nonempty because \(n\) belongs to it.

```lean
noncomputable def fiberMin (n : OddPos) (r : Nat) : OddPos :=
  sInf {z | Function.iterate U r z = Function.iterate U r n}
```

Citations: `DEF-U-01`, `THM-FIBER-EQUIV-01`.

### INV-02 — finite envelope and Bellman law (closed)

At fixed \(r\), \(M_r(n)\) is the minimum of a finite exact family

\[
L_a(X)=\frac{2^{A_r}X-C(a)}{3^r},
\qquad X=U^r(n),
\]

after imposing the precise congruence, positivity, and exact-valuation conditions. If \(\Theta_j(n)\) is the least ancestor whose last deviation from the actual word is at \(j\), then

\[
M_R(n)=\min\{n,\Theta_0(n),\ldots,\Theta_{R-1}(n)\},
\qquad
M_{R+1}(n)=\min\{M_R(n),\Theta_R(n)\}.
\]

```lean
theorem fiberMin_finite_envelope (n : OddPos) (r : Nat) :
    fiberMin n r =
      Finset.min' (feasibleScores n r) (feasibleScores_nonempty n r) := by
  ...
```

Citations: `THM-AFFINE-01`, `THM-FIBER-ENV-01`.

### INV-03 — stationary inverse-fiber extinction (open)

Prove

\[
\forall n>1\text{ odd}\quad\exists r\ge0\quad M_r(n)<n.
\]

```lean
theorem stationary_inverse_fiber_extinction :
    ∀ n : OddPos, 1 < n → ∃ r : Nat, fiberMin n r < n := by
  -- OPEN
```

Citation: `OPEN-FIBER-EXT-01`.

Fixed-progression concavity does not prove this moving-endpoint claim. The Bellman decomposition identifies the exposed line exactly, but an indefinitely exposed aperiodic seed is precisely what a least divergent coalescence class would supply.

### INV-04 — strong-induction conclusion (closed implication)

Assume INV-03 and use strong induction on odd \(n\). Choose \(r\) and \(z=M_r(n)<n\). Since \(U^r(z)=U^r(n)\) and \(z\) reaches \(1\) by induction, \(n\) reaches the same endpoint and then reaches \(1\).

```lean
theorem collatz_of_fiber_extinction
    (hExt : StationaryInverseFiberExtinction) : Collatz := by
  intro n
  induction n using Nat.strong_induction_on with
  | h n ih =>
      obtain ⟨r, z, hz, hcoalesce⟩ := hExt n
      exact reachesOne_of_coalesces hcoalesce (ih z hz)
```

Citations: `THM-FIBER-EQUIV-01`, `OPEN-FIBER-EXT-01`.

## SK-FCD-HSCI: first-crossing descent plus carry innovation

**Completion certificate.** FCD excludes all nontrivial cycles; HSCI excludes all unbounded orbits. Both open steps are necessary for this skeleton.

### FH-01 — counterexample dichotomy (closed)

The least-counterexample argument of TSC-02 gives

\[
\neg\mathrm{Collatz}\Longrightarrow
\operatorname{UnboundedOrbit}\lor\operatorname{NontrivialCycle}.
\]

```lean
theorem least_counterexample_dichotomy (h : ¬ Collatz) :
    ∃ n : OddPos, MinimalBad n ∧
      (UnboundedOrbit U n ∨ EntersNontrivialCycle U n) := by
  ...
```

Citation: `DEF-U-01`.

### FH-02 — localize a cycle at its first crossing (closed)

At the first shortcut-coefficient crossing of a least-state nontrivial integer cycle, its least state is the canonical dyadic representative \(\rho(w)\), while its endpoint satisfies \(Z(w)\ge\rho(w)\).

```lean
theorem cycle_first_crossing_localization (c : NontrivialCycle U) :
    ∃ w, NonboundaryFirstCrossing w ∧
      canonicalStart w = leastState c ∧
      canonicalEndpoint w ≥ canonicalStart w := by
  ...
```

Citations: `THM-CYCLE-REDUCE-01`, `THM-FCD-REDUCE-01`.

### FH-03 — First-Crossing Descent (open)

For every nonboundary first crossing, prove

\[
\rho(w)>Z(w).
\]

One sufficient arithmetic form is

\[
\tau=[CM^{-1}]_D\ge \frac{s}{3},
\qquad M=2^k,\quad D=M-3^s.
\]

```lean
theorem first_crossing_descent
    (w : ShortcutWord) (h : NonboundaryFirstCrossing w) :
    canonicalStart w > canonicalEndpoint w := by
  -- OPEN
```

Citations: `OPEN-FCD-01`, `THM-FCD-REDUCE-01`, `THM-FCD-FINITE-01`, `THM-FCD-ONECORNER-01`, `THM-FCD-TWOCORNER-01`, `THM-FCD-THREECORNER-01`, `THM-FCD-FOURCORNER-01`, `THM-FCD-CORNERGROWTH-01`, `THM-FCD-SHARP-CORNERGROWTH-01`, `THM-FCD-TERMINAL-FLUX-01`, `NOGO-FCD-TERMINAL-PARITY-01`, `NOGO-FCD-CENTERED-FILTER-01`, `THM-FCD-PACKET-LIFT-01`, `NOGO-FCD-EXACTNESS-CONTRACTION-01`, `NOGO-FCD-LIFTED-LATTICE-01`, `OPEN-FCD-PACKET-CONTRACTION-01`.

The complete \(q_s=2,b=1\) one-, two-, three-, and four-corner sectors are closed. A \(q_s=2\)
row is preceded by a \(q_{s-1}=4\) row, so its terminal mechanical delay
first becomes available at the last vertex. Hence a delay path with one
strict increase is forced to be the ramp-plus-one-drop profile, which
descends at every depth. A two-corner target would satisfy
\(2^s<7{,}280{,}812s^{45}\), giving the analytic cutoff \(s<415\);
an exact certificate excludes all 2,816,721 profiles below it. Any residual
three-corner target would satisfy
\(2^s<4{,}068{,}534{,}644{,}364{,}652s^{105}\), giving the analytic
cutoff \(s<1115\). An exact fixed-\(a\) residue certificate covers all
4,749,737,770 cylinder-admissible profiles below it and finds no target
bucket intersection. Any residual target therefore has at least four
removable Ferrers corners. A four-corner target would satisfy
\(2^s<C_4s^{225}\), where
\(C_4=307^7 154^8/64\), giving the analytic cutoff \(s<2672\).
Exact dyadic-prefix and reduced-residue certificates cover every smaller
\(q_s=2\) row and find no strict or equality target. Any residual target
therefore has at least five removable Ferrers corners. More generally, R106
proves a logarithmic corner lower bound. R112 sharpens its mechanical
multiplier from \(2\) to \(\log_2 3\), so the terminal-preserving cube has
more than

\[
\left(\frac{s}{O(\log s)}\right)^{1.505007\ldots}
\]

vertices. R107 shows that this growth survives minimalization when the
terminal row is fixed: every nonempty subset of the nonterminal corners
obeys the exact synchronized flux identity.

R113-R114 audit and retract a tempting strengthening. Fixing the terminal
delay row does not make the terminal valuation exact for every canonical
child. At \(s=8\), the profile

\[
(0,0,0,0,0,0,2,4)
\]

has odd canonical point \((3903,3127)\), but deleting corner \((6,2)\)
gives \((191,154)\). In the same cover, \(V_c=892\) is even while the
dyadic wrap is one. Therefore neither the zero next-inverse-bit condition
nor the fixed parity-centered filter minimum is an unconditional FCD
constraint.

R115 records the missing bit exactly. If

\[
\widehat\rho:=[-CP^{-1}]_{2M},
\qquad
\xi:=\frac{\widehat\rho-\rho}{M},
\]

then \(\xi\equiv Z\pmod2\), and corner deletion is translation modulo
\(2M\). The same note gives a unique packet normal form for every fixed
corner count and reduces the five-corner sector to the finite range
\(s<6071\). The resulting exact open gate is packet contraction: an exact
non-descent with at least five corners must contract to a proper exact
non-descent. This statement is not proved, and it only concerns the
\(q_s=2\) branch. Exactness alone cannot prove it: through \(s=20\),
\(21{,}839\) odd-endpoint profiles have no exact nonterminal packet
deletion, and even consecutive-block deletion fails for \(19\) profiles
through \(s=18\). The first such profiles are descending, so they do not
refute the color-sensitive contraction gate. A separate translated-lattice
probe shows that top exactness plus all proper-subideal colors still does
not recover the absolute carry.

### FH-04 — no cycles from FCD (closed implication)

FH-02 gives \(Z\ge\rho\); FH-03 gives \(\rho>Z\). Therefore no nontrivial positive cycle exists.

```lean
theorem no_cycles_of_FCD (hFCD : FirstCrossingDescent) :
    ∀ c, ¬ NontrivialCycle U c := by
  ...
```

Citations: `THM-FCD-REDUCE-01`, `OPEN-FCD-01`.

### FH-05 — normalize divergence (closed)

Every unbounded orbit yields an infinite strict-barrier ray with unbounded surplus and an eventually constant ordinary lift.

```lean
theorem unbounded_to_HSCI_counterexample
    (n : OddPos) (h : UnboundedOrbit U n) :
    ∃ w : BarrierRay,
      UnboundedSurplus w ∧ EventuallyConstantOrdinaryLift w := by
  ...
```

Citations: `THM-DIV-NORM-01`, `THM-DIV-FIXEDRAY-01`.

### Closed inverse-predecessor reductions inside FH-06

Assume that \(n\) is the least positive odd integer with an unbounded
accelerated orbit. Fix a finite segment from \(q\) to \(y\), of length
\(L\).

The unique least positive odd \(L\)-step predecessor of \(y\) is \(q\), or
the already classified local half-seed \((q-1)/2\). Thus no same-depth
predecessor gives a new start below \(n\).

Every exact \((L+h)\)-step predecessor factors as an \(h\)-step prefix
\(E\), followed by a same-depth suffix. The formerly possible suffix
start \(q+2\) is impossible. The remaining suffix is the local
half-seed, the actual start \(q\), or a positive-defect start
\(r\). In the last case, the phase-strip theorem gives

\[
r\geq2^\delta q-\frac{2^\delta-(-1)^\delta}{3}.
\]

If

\[
t:=\operatorname B(E)-h,
\]

then all exact prefixes with \(t=0,1,2,3\) are classified by finite
\(3\)-adic valuation ladders. The excess-two layer has two families, and
the excess-three layer has four.

For every exact prefix from \(z\) to \(r\), the carry rearrangement theorem
gives the sharp interval

\[
2^t\left(\left(\frac23\right)^h(r+1)-\frac23\right)-\frac13
\leq z
\leq
\left(\frac23\right)^h(2^t r+1)-1.
\]

Writing \(E=(1+c_1,\ldots,1+c_h)\) and
\(p_k=\sum_{i\leq k}c_i\), the endpoint slacks are exactly

\[
U_{h,t}(r)-z
=
\frac13\sum_{k=1}^{h-1}
\left(\frac23\right)^k(2^{p_k}-1),
\]

\[
z-L_{h,t}(r)
=
\frac13\sum_{k=1}^{h-1}
\left(\frac23\right)^k(2^t-2^{p_k}).
\]

These identities impose a simultaneous finite power-of-two screen on
every cumulative excess \(p_k\) for a proposed bounded start.

In particular, if \(q_*\) is the least start in the suffix channel, then a
competitor with \(t\geq3\) and \(z<n\) must satisfy

\[
h>
\log_{3/2}\left(\frac{24(q_*+1)}{3n+17}\right).
\]

Citations: `THM-DIV-RECORD-ARBITRARY-PREFIX-MIN-01`,
`THM-DIV-RECORD-VARDEPTH-REDUCTION-01`,
`THM-DIV-RECORD-EXCESS2-DECODER-01`,
`THM-DIV-RECORD-EXCESS3-DECODER-01`,
`THM-DIV-RECORD-SHARP-PREFIX-01`,
`THM-DIV-RECORD-QPLUS2-EXCLUSION-01`,
`THM-DIV-RECORD-JACOBSTHAL-SUFFIX-01`,
`THM-DIV-RECORD-CARRY-POSITION-01`.

### FH-06: exclude unbounded orbits (open)

It remains to exclude the deep minimum-channel prefixes that pass every
cumulative-excess screen, the actual \(q\)-suffix when the local half-seed
is smaller, and the positive-defect suffixes, or to construct from one of
them a positive odd start below \(n\). The branch with only finitely many
occurrences of \(1113\), and the separate horizon-exit branch, also remain
open.

An independent companion route has an equally explicit target. For the
positive real companion \((e_j)\), put

\[
m_j:=\lceil e_j\rceil,
\qquad
d_j:=2^{a_j}m_{j+1}-3m_j+1.
\]

It is proved that

\[
\sum_{\substack{j\geq0\\d_j\in\{-2,-1,0\}}}\frac1{m_j}=\infty.
\]

The missing theorem is to use the paired integer orbit to prove that this
same sum is finite.

```lean
theorem no_unbounded_positive_orbit :
    ∀ n : OddPos, ¬ UnboundedOrbit U n := by
  -- OPEN
```

Citations: `OPEN-BTS-01`, `OPEN-HSCI-01`,
`OPEN-HSCI-SYNC-SHELL-01`, `THM-DIV-DUAL-TAIL-01`,
`THM-DIV-CHARGE-01`, `NOGO-DIV-ROUND-LOCAL-01`.

### FH-07 — no divergence from HSCI (closed implication)

FH-05 and FH-06 are contradictory; hence no positive orbit is unbounded.

```lean
theorem no_unbounded_of_HSCI (hHSCI : HighSurplusCarryInnovation) :
    ∀ n : OddPos, ¬ UnboundedOrbit U n := by
  ...
```

Citations: `THM-DIV-NORM-01`, `OPEN-HSCI-01`.

### FH-08 — full conclusion (closed implication)

FH-04 and FH-07 eliminate both alternatives in FH-01, proving Collatz.

```lean
theorem collatz_of_FCD_HSCI
    (hFCD : FirstCrossingDescent)
    (hHSCI : HighSurplusCarryInnovation) : Collatz := by
  ...
```

Citations: `OPEN-FCD-01`, `OPEN-HSCI-01`, `DEF-U-01`.

## SK-YAH: mixed binary–ternary rewrite termination

**Completion certificate.** The only open step is YAH-06. Relative termination of the exceptional odd rule, combined with the already proved termination of the other ten rules, makes the full rewrite system terminating. The published simulation theorem then proves ordinary Collatz.

**Equivalence warning.** YAH-06 is equivalent to Collatz. This is retained as an operationally distinct automated-reasoning architecture, not presented as a weaker conjecture. The original source is [Yolcu–Aaronson–Heule](https://arxiv.org/abs/2105.14697); the repository’s exact macrosemantic continuation is in [`collatz_continuation_report.md`](../collatz-audit-bundle/source_documents/collatz_continuation_report.md).

### YAH-01 — define the mixed-base rewrite system (closed)

Let

\[
T(n)=\begin{cases}
n/2,&n\equiv0\pmod2,\\
(3n+1)/2,&n\equiv1\pmod2.
\end{cases}
\]

Define the Yolcu–Aaronson–Heule 11-rule system \(\mathcal R_T=\mathcal D_T\cup\mathcal X\) on mixed binary–ternary numerals. The nine rules in \(\mathcal X\) exchange adjacent bases without changing the represented integer; the two terminal rules in \(\mathcal D_T\) implement the even and odd cases of \(T\).

```lean
def yahSystem : StringRewriteSystem MixedDigit :=
  dynamicRules ∪ auxiliaryRules
```

Citation: `DEF-REWRITE-YAH-01`.

### YAH-02 — prove exact step semantics (closed)

For every rewrite \(N\to N'\),

\[
N\to_{\mathcal X}N'\Longrightarrow \operatorname{Val}(N')=\operatorname{Val}(N),
\qquad
N\to_{\mathcal D_T}N'\Longrightarrow \operatorname{Val}(N')=T(\operatorname{Val}(N)).
\]

The unique canonical string of value \(1\) is irreducible.

```lean
theorem yah_step_semantics (h : Rewrite yahSystem N N') :
    (AuxiliaryStep h → value N' = value N) ∧
    (DynamicStep h → value N' = shortcutT (value N)) := by
  ...
```

Citations: `DEF-REWRITE-YAH-01`, `THM-REWRITE-SIM-01`.

### YAH-03 — eliminate syntactic stuttering (closed)

Auxiliary-only rewriting terminates, and termination on canonical delimiter strings implies termination on all strings. Consequently, every infinite full derivation would contain infinitely many dynamic steps; it cannot be an artifact of endlessly rearranging one mixed-base numeral.

```lean
theorem yah_auxiliary_normalization :
    StronglyNormalizing auxiliaryRules ∧
    (TerminatesOnCanonical yahSystem → StronglyNormalizing yahSystem) := by
  ...
```

Citation: `THM-REWRITE-SIM-01`.

### YAH-04 — simulation equivalence (closed)

The full system terminates if and only if every positive integer reaches \(1\) under \(T\):

\[
\operatorname{SN}(\mathcal R_T)\quad\Longleftrightarrow\quad\mathrm{Collatz}.
\]

```lean
theorem yah_simulation_equivalence :
    StronglyNormalizing yahSystem ↔ Collatz := by
  ...
```

Citations: `THM-REWRITE-SIM-01`, `DEF-U-01`.

### YAH-05 — isolate the exceptional rule (closed)

Let \(E\) be the odd terminal rule and \(R_0=\mathcal R_T\setminus\{E\}\). Yolcu–Aaronson–Heule prove \(R_0\) terminating—in fact, every one-rule-deleted subsystem terminates. The later project audit proves that, on canonical strings, \(R_0\) has a unique normal form and that one \(E\)-step followed by maximal \(R_0\)-normalization is exactly one accelerated odd Collatz step, independent of normalization order.

```lean
theorem yah_deleted_system_and_macrostep :
    StronglyNormalizing R0 ∧
    UniqueCanonicalNormalForm R0 ∧
    ExceptionalMacrostep R0 E = acceleratedOddMap := by
  ...
```

Citations: `THM-REWRITE-MACRO-01`, `NOGO-REWRITE-01`.

### YAH-06 — exceptional-rule relative termination (open)

Prove

\[
\operatorname{SN}(E\mathbin{/}R_0),
\]

meaning that no infinite \(\mathcal R_T\)-derivation applies \(E\) infinitely often. An admissible proof could be a checked matrix/ordinal interpretation, a finite union of well-founded transition invariants covering the transitive closure, or another sound relative-termination certificate.

```lean
theorem exceptional_rule_relative_termination :
    RelativelyStronglyNormalizing E R0 := by
  -- OPEN
```

Citations: `OPEN-REWRITE-RELTERM-01`, `THM-REWRITE-MACRO-01`.

The exact macrograph after quotienting by \(R_0\)-normalization is the accelerated Collatz graph. Thus merely choosing a taller ordinal or a different presentation is not progress unless it supplies a finitely described decrease across every exceptional macrostep.

### YAH-07 — full conclusion (closed implication)

Rule removal combines YAH-05 and YAH-06 to give \(\operatorname{SN}(\mathcal R_T)\). YAH-04 then gives Collatz.

```lean
theorem collatz_of_exceptional_relative_termination
    (hE : RelativelyStronglyNormalizing E R0) : Collatz :=
  yah_simulation_equivalence.mp
    (ruleRemoval hE yah_deleted_system_and_macrostep.1)
```

Citations: `OPEN-REWRITE-RELTERM-01`, `THM-REWRITE-SIM-01`, `THM-REWRITE-MACRO-01`.

## SK-RDC: finite residue-cylinder descent cover

**Completion certificate.** The only open step is RDC-04. A finite exact cover proving descent below every starting value gives the stopping-time property, and strong induction proves Collatz.

**Strength warning.** The requested finite cover is stronger than Collatz and is not known to exist. Failure to find one at a chosen modulus or depth is therefore a search failure, not evidence against Collatz. Its advantage is that a successful certificate would be finite and independently checkable.

### RDC-01 — stopping-time equivalence (closed)

For the shortcut map \(T\),

\[
\mathrm{Collatz}
\quad\Longleftrightarrow\quad
\forall n>1\;\exists k\ge1:\ T^k(n)<n.
\]

The reverse implication is strong induction on \(n\).

```lean
theorem collatz_iff_eventual_descent :
    Collatz ↔ ∀ n > 1, ∃ k, iterate shortcutT k n < n := by
  ...
```

Citation: `THM-STOPPING-DESCENT-01`.

### RDC-02 — exact parity cylinders (closed)

A length-\(k\) shortcut-parity word specifies one residue class modulo \(2^k\). On that cylinder, \(T^k\) is affine:

\[
2^kT^k(n)=3^s n+c.
\]

Thus a proposed uniform descent inequality is reducible to exact integer arithmetic, together with an explicit finite check of any small exceptions.

```lean
theorem parity_cylinder_affine (w : ParityWord) :
    ∃ r c s, ∀ n ∈ cylinder w,
      2^w.length * iterate shortcutT w.length n = 3^s * n + c := by
  ...
```

Citations: `THM-PARITY-CYLINDER-01`, `THM-AFFINE-01`.

### RDC-03 — known pruning information (closed/certified)

Strongly sufficient residue sets force every bad orbit through specified congruence classes, while exhaustive verification discharges all seeds below \(2^{71}\). These facts can prune or anchor a finite cover; neither is itself a universal descent proof.

```lean
theorem known_descent_cover_constraints :
    StronglySufficient (residue 2 9) ∧
    BadOrbitHits (residue 20 27) ∧
    VerifiedBelow (2^71) := by
  ...
```

Citations: `THM-STRONG-SUFFICIENT-01`, `THM-CYCLE-REDUCE-01`.

### RDC-04 — finite universal descent cover (open)

Construct a finite family \(\mathcal C\) of parity/residue cylinders such that

\[
\bigcup_{C\in\mathcal C}C=\{n>1\}
\]

and each \(C\) carries a prescribed iterate \(k_C\) satisfying \(T^{k_C}(n)<n\) for every \(n\in C\), after explicitly checking all bounded exceptional representatives.

```lean
theorem finite_universal_descent_cover :
    ∃ C : Finset DescentCylinder,
      CoversPositiveAboveOne C ∧
      ∀ c ∈ C, CheckedUniformDescent c := by
  -- OPEN
```

Citations: `OPEN-DESCENT-COVER-01`, `THM-PARITY-CYLINDER-01`.

Applegate–Lagarias prove the existence of convergent trajectories with unusually large total stopping time, so a shallow fixed-depth search is not an adequate surrogate for RDC-04.

### RDC-05 — full conclusion (closed implication)

RDC-04 implies the right side of RDC-01. Strong induction then yields Collatz.

```lean
theorem collatz_of_finite_descent_cover
    (h : FiniteUniversalDescentCover) : Collatz :=
  collatz_iff_eventual_descent.mpr (descent_of_cover h)
```

Citations: `OPEN-DESCENT-COVER-01`, `THM-STOPPING-DESCENT-01`.

## SK-QPOLY: q-series conjugacy and polynomiality

**Completion certificate.** The only open step is QPOLY-05. If a genuine conjugacy sends every positive integer to a polynomial, the classified polynomial dynamics and conjugacy force every positive integer to reach the \(\{1,2\}\) cycle, hence to reach \(1\).

**Equivalence warning.** Monks’s Conjecture 2 is equivalent to Collatz. The no-carry q-series system is a distinct algebraic representation, not a proven reduction in difficulty. The statements below were checked against the archived v5 source TeX for [Monks’s paper](https://arxiv.org/abs/2508.10153).

### QPOLY-01 — define the q-series systems (closed)

Let \(T\) be the shortcut Collatz map on \(\mathbf Z_2\). For odd \(A,B\in\mathbf F_2[[q]]\), define

\[
T_{A,B}(f)=
\begin{cases}
f/q,&f(0)=0,\\
(Af+B)/q,&f(0)=1.
\end{cases}
\]

```lean
def qAnalog (A B : F2PowerSeries)
    (hA : Odd A) (hB : Odd B) : F2PowerSeries → F2PowerSeries :=
  fun f => if Even f then f / q else (A * f + B) / q
```

Citation: `DEF-QSERIES-01`.

### QPOLY-02 — conjugacy to the 2-adic Collatz map (closed)

For every odd \(A,B\), there is a dynamical conjugacy

\[
H\circ T=T_{A,B}\circ H
\]

between \(\mathbf Z_2\) and \(\mathbf F_2[[q]]\).

```lean
theorem monks_q_conjugacy (hA : Odd A) (hB : Odd B) :
    ∃ H : Z2 ≃ F2PowerSeries,
      H ∘ shortcutT = qAnalog A B ∘ H := by
  ...
```

Citation: `THM-QCONJUGACY-01`.

### QPOLY-03 — classify polynomial dynamics for the selected map (closed)

Set \(Q=T_{1,1+q^2}\). Monks proves

\[
f\in\mathbf F_2[q]
\quad\Longleftrightarrow\quad
Q(f)\in\mathbf F_2[q].
\]

If a polynomial has degree greater than \(1\), one application of \(Q\) strictly lowers its degree. Thus every polynomial orbit reaches the 2-cycle \(\{1,q\}\) or one of the fixed points \(0,1+q\).

```lean
theorem selected_q_polynomial_dynamics :
    (Polynomial f ↔ Polynomial (Q f)) ∧
    (Polynomial f →
      EventuallyIn (orbit Q f) ({1, q} ∪ {0, 1 + q})) := by
  ...
```

Citation: `THM-QCONJUGACY-01`.

### QPOLY-04 — identify the integer-relevant polynomial sector (closed)

For any conjugacy \(H\) between \(T\) and \(Q\), a positive integer \(n\) reaches \(1\) under \(T\) if and only if \(H(n)\) is a polynomial. The fixed points \(0\) and \(1+q\) cannot correspond to a positive-integer orbit; the polynomial 2-cycle corresponds to \(\{1,2\}\).

```lean
theorem reaches_one_iff_conjugate_polynomial
    (H : Conjugacy shortcutT Q) (n : PositiveInt) :
    Reaches shortcutT n 1 ↔ Polynomial (H n) := by
  ...
```

Citations: `THM-QCONJUGACY-01`, `LIT-MONKS-2025`.

### QPOLY-05 — polynomiality of conjugate positive integers (open)

Prove

\[
\forall n\in\mathbf N^+,\qquad H(n)\in\mathbf F_2[q].
\]

```lean
theorem positive_integers_have_polynomial_q_images
    (H : Conjugacy shortcutT Q) :
    ∀ n : PositiveInt, Polynomial (H n) := by
  -- OPEN
```

Citations: `OPEN-QPOLY-01`, `NOGO-QANALOG-01`.

The natural map that reads a polynomial’s coefficients as the binary digits of an integer is not the required conjugacy. Consequently, the degree-descent theorem for arbitrary polynomial inputs does not touch ordinary integer orbits without QPOLY-05.

### QPOLY-06 — full conclusion (closed implication)

QPOLY-05 supplies the right side of QPOLY-04 for every positive integer, so every positive integer reaches \(1\).

```lean
theorem collatz_of_q_polynomiality
    (hPoly : ∀ n : PositiveInt, Polynomial (H n)) : Collatz :=
  fun n => (reaches_one_iff_conjugate_polynomial H n).mpr (hPoly n)
```

Citations: `OPEN-QPOLY-01`, `THM-QCONJUGACY-01`.

## Why these are the retained skeletons

- SK-RDC is retained because a successful finite descent cover would be a finite exact certificate for all starting values. Its open gate is deliberately labeled stronger than Collatz; no existence claim is smuggled into the skeleton.
- SK-YAH is retained because automated relative termination is an operationally distinct proof technology with a finite-certificate target. Logically, however, its quotient macrograph is \(U\), and its open gate remains equivalent to Collatz until a new invariant is supplied.
- SK-QPOLY is retained because its carry-free q-series dynamics and strict polynomial-degree descent are an algebraically distinct coordinate system. Its sole open polynomiality gate is explicitly equivalent to Collatz.
- One-drop, Christoffel, fixed deformation, bounded support, fixed transition, \(q=2\), \(q=4\), and formal ramp results are cycle sub-sectors. They feed `THM-CYCLE-COMPLEXITY-01`, `THM-FCD-FINITE-01`, and `THM-ONEDROP-01`, but none alone excludes every cycle.
- Negative all-prefix supercriticality is not retained as a skeleton: even its desired target-one consequence would not eliminate divergence and cycles, and that target-one theorem is already certified.
- Integer-spacing compression is retained as a frontier mechanism inside TSC-07, not a skeleton, because the corpus contains no standalone statement whose proof would exclude all cycles.
