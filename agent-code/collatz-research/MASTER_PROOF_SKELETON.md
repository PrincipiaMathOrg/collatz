# Master Collatz proof skeleton

Updated 18 August 2026.  This is the controlling dependency graph for the
research run.  A checked box means that the stated quantifiers are closed.
A computer-assisted item is marked `CERTIFIED` and names its finite input.
Nothing labelled `OPEN` is used as if it were proved.

## 1. Notation

For a positive odd integer \(x\), write

\[
U(x)=\frac{3x+1}{2^{v_2(3x+1)}}.
\]

For \(a=(a_0,\ldots,a_{r-1})\in\mathbf N_{\geq1}^r\), put

\[
A_k=\sum_{i<k}a_i,
\qquad C_0=0,
\qquad C_{k+1}=3C_k+2^{A_k},
\qquad D_k=C_k+2^{A_k}.
\]

An exact positive block \(x_0,\ldots,x_r\) satisfies

\[
2^{A_k}x_k=3^k x_0+C_k.                                      \tag{1.1}
\]

The word is a strict barrier if \(2^{A_k}<3^k\) for every
\(1\leq k\leq r\).  Terminal locality gives

\[
v_3(D_r)=v_3(x_r+1)\quad\hbox{whenever either side is less than }r. \tag{1.2}
\]

## 2. Closed spine

- [x] **Affine calculus.**  Equation (1.1), the analogous \(3x-1\)
  identity, carry concatenation, and suffix divisibility are proved.

- [x] **Target duality.**  If
  \(3^r\mid C_r+2^{A_r}y\), where \(y\) is positive and odd, then the word
  reconstructs an exact positive \(3x-1\) trajectory ending at \(y\).

- [x] **Finite shell injection.**  Equal-time parity cylinders inject every
  simple negative shortcut path into finite endpoint shells.

- [x] **Universal reciprocal mass, CERTIFIED.**  Every finite positive
  simple negative shortcut path has reciprocal mass below \(10.789\).  The
  proof consists of the symbolic shell injection, an exact table through
  shell \(1000\), and an analytic tail.

- [x] **Fixed-target compression.**  A negative barrier path ending at
  \(y\) starts below \(3^{11}y\).  This uses the reciprocal-mass theorem.

- [x] **All-depth target-one theorem, CERTIFIED.**  If \(a\) is a strict
  barrier and \(3^r\mid D_r\), then \(a=1^r\).

- [x] **Fixed-deficit reduction.**  Write \(w=uv\), with \(|u|=d\).  If
  \(w\) is a strict barrier and \(3^{r-d}\mid D(w)\), then \(v\) is an exact
  target-one negative path whose every prefix coefficient is greater than
  \(2^{A(u)}/3^d\).  Its first-hit seed is below
  \(3^{d+11}/2^{A(u)}\).  Thus every fixed deficit reduces to finitely many
  stems and finitely many exact seeds.

- [x] **Deficit two, CERTIFIED.**  For \(r\geq2\),

  \[
  3^{r-2}\mid D(w)
  \quad\Longleftrightarrow\quad
  w=1^r\ \hbox{or}\ w=(1,2,1^{r-2})                         \tag{2.1}
  \]

  among strict barriers.  The second family is sharp because
  \(D=13\cdot3^{r-2}\).  Independent accelerated and shortcut scans close
  the two finite seed ranges.

- [x] **Deficit three, CERTIFIED.**  For \(r\geq3\), the complete list is

  \[
  1^r,
  \qquad1121^{r-3},
  \qquad121^{r-2},
  \qquad11131^{r-4}\quad(r\geq4).                            \tag{2.2}
  \]

  Two independent exact implementations agree on every finite partition.

- [x] **Finite inverse-fiber envelope.**  For \(X=U^r(n)\), every ancestor
  score has the form

  \[
  L_a(X)=\frac{2^{A_r}X-C(a)}{3^r}.
  \]

  The minimum \(M_r(n)\) is obtained by a finite search over
  \(1\leq a_i\leq\lfloor\log_2(3\cdot2^i n+1)\rfloor\), subject to the
  exact congruence and \(0<L_a(X)\leq n\).  Positivity and exact valuations
  follow from suffix propagation.  The score restriction must precede the
  exponent cap.

- [x] **Fixed-progression exposure loss.**  On
  \(X_t=X_0+2\cdot3^r t\), the inverse-fiber minimum is a nondecreasing,
  discretely concave, eventually affine lower envelope.  If \(A_*\) is the
  least feasible total exponent and \(z_*\) its least intercept, then the
  least-slope line is exposed once

  \[
  2^{A_*+1}t\geq z_*-1.                                  \tag{2.3}
  \]

- [x] **HSCI equivalence.**  After the audited divergence normalization,
  High-Surplus Carry Innovation is equivalent to the assertion that no
  positive Collatz orbit diverges.  It is not a weaker local lemma.

- [x] **Eventually periodic high-surplus tails are impossible.**  If a
  positive ordinary orbit repeats a shortcut word of length \(p\), weight
  \(s\), and carry \(C\), with \(P=3^s>Q=2^p\), then repetition \(m\) times
  implies

  \[
  Q^m\mid (P-Q)x+C
  \]

  for every \(m\), an impossibility.  Hence a divergent counterexample
  would have an aperiodic parity word and subword complexity at least
  \(L+1\) at length \(L\).

- [x] **Fixed-ray return lattice.**  If the same accelerated factor of
  length \(L\) and total exponent \(B\) occurs at positions \(j<k\) on one
  ordinary injective orbit, then

  \[
  2^{B+1}\mid x_k-x_j,
  \qquad
  2^B(x_{k+L}-x_{j+L})=3^L(x_k-x_j).                 \tag{2.4}
  \]

  Thus \(2\cdot3^L\) divides the endpoint difference.  The occurrence pairs
  lie on one affine rank-one lattice, so a third occurrence gives no new
  product divisibility.

- [x] **Fixed-ray complexity lower bound.**  On a normalized divergent ray
  expand the trajectory into shortcut states \(y_t\), let \(s_t\) count
  the odd shortcut inputs, and put

  \[
  Q_t=\frac{3^{s_t}}{2^t},\qquad
  R_t=\log_2Q_t,\qquad
  \mathcal K=\sup_t\frac{y_t}{Q_t}<\infty.
  \]

  Equal binary factors of length \(L\) at positions \(j<k\) force

  \[
  \max\{R_j,R_k\}\ge L-\log_2(2\mathcal K).
  \]

  Consequently

  \[
  p_2(L)\ge
  \frac{L-\log_2(2\mathcal K)}{\log_2 3-1},
  \qquad
  \liminf_{L\to\infty}\frac{p_2(L)}L
  \ge\frac1{\log_2 3-1}
  =1.709511\ldots .                                    \tag{2.5}
  \]

  This excludes every Sturmian and quasi-Sturmian binary parity ray.

## 3. Divergence branch

### Closed reductions

- [x] A divergent orbit can be shifted to a coefficient record so that its
  whole future valuation word is a strict barrier and its coefficient
  surplus tends to infinity.

- [x] A bounded deficit cannot recur to arbitrary depth from one fixed
  start.  Every positive block satisfies

  \[
  U^r(z)+1\leq(3/2)^r(z+1).
  \]

  If \(3^{r-d}\mid U^r(z)+1\), then
  \(z+1\geq2^{r+1}/3^d\).  Synchronization must therefore use moving block
  starts.

- [x] **Local synchronization no-go.**  For every \(r\geq2\), the word
  \(1^{r-1}2\) is a strict barrier and is realized from a positive start of
  order \(2^r\), yet its endpoint has \(v_3(x+1)=0\).

- [x] **Finite-coherence no-go.**  Arbitrarily long such bad blocks can be
  nested at tail-record boundaries.  Every finite concatenation is
  realized by a positive integer.  The least dyadic cylinder
  representatives nevertheless increase without bound, so the infinite
  branch is \(2\)-adic but not an ordinary nonnegative integer.  Finite
  compactness cannot supply the missing step.

- [x] **Post-stabilization finite-factor universality.**  Given any finite
  valuation word \(u\), there is a positive integer whose strict-barrier word
  contains \(u\) wholly after its least dyadic cylinder representative has
  stabilized.  The containing block can have arbitrarily many zero binary
  innovations and arbitrarily large fresh multiplicative surplus while its
  terminal value still satisfies \(v_3(x+1)=0\).  Consequently no forbidden
  finite factor, finite automaton, bounded synchronization window, or finite
  uncertainty-versus-surplus estimate can close the divergence branch.

- [x] **Finite-scope warning.**  None of the finite certificates in this
  ledger reduces global divergence to a finite check.  The fixed-deficit
  theorem is finite only after one deficit \(d\) is fixed, with no uniform
  bound on the deficits along a divergent ray.  The fourfold seed and shell
  cutoffs concern a local FCD branch and, for the shell argument, a simple
  finite segment; their nonsimple alternative is already a positive cycle.
  A divergent orbit may instead have moving block starts and unbounded
  deficit.  High-Surplus Carry Innovation therefore remains an infinitary
  gate.

- [x] **Low-complexity exclusion.**  An eventually periodic accelerated
  valuation tail is an actual positive cycle: iteration of the repeated
  affine block forces arbitrarily high powers of its odd denominator to
  divide one fixed nonzero affine form.  In particular, a divergent orbit
  has an aperiodic valuation word and factor complexity at least \(L+1\) at
  length \(L\).

- [x] **Power and return-time rigidity.**  If a block \(v\) with length \(s\),
  total valuation \(B\), and affine form
  \(\Lambda_v(y)=(2^B-3^s)y-C(v)\) occurs \(K\) consecutive times from \(y\), then

  \[
  2^{KB}\mid\Lambda_v(y).
  \]

  Unless the block already closes a cycle, this yields
  \((2^K/3)^s\leq2y+1\).  Equality of length-\(L\) factors at positions \(j\) and
  \(j+d\), with \(d\leq L\), gives the analogous overlap bound.  Consequently a
  fixed positive nonperiodic ray has prefix return times
  \(\liminf\tau(L)/L\geq\log_3 2\), cannot have arbitrarily long square
  prefixes, and cannot be a characteristic Sturmian valuation word.  More
  generally, a uniformly recurrent ray containing unbounded powers of one
  fixed block is periodic and hence cannot be divergent.

- [x] **Transported ternary decoder.**  Equal accelerated factors satisfy

  \[
  \min\{v_3(x_{j+L}+1),L\}
  =\min\{v_3(x_{k+L}+1),L\}.                           \tag{3.1}
  \]

  For a returned stabilized prefix, the same positive lift integer is
  transferred from its dyadic starting cylinder to its ternary endpoint
  cylinder.  Let \(\tau_n(L)\) be the first return position of the
  length-\(L\) prefix, with \(\tau_n(L)=\infty\) when it never returns.
  If its accelerated surplus satisfies \(S_L=o(L)\), then

  \[
  \liminf_{L\to\infty}\frac{\tau_n(L)}L
  \ge\frac{\log_2 3}{\log_2 3-1}
  =2.709511\ldots .
  \]

- [x] **Decoder recursion and symbolic no-go.**  With
  \(b_t=v_3(x_t+1)\),

  \[
  2^{a_t}(x_{t+1}+1)=3(x_t+1)+2^{a_t}-2.              \tag{3.2}
  \]

  Hence \(a_t=1\) raises \(b_t\) by one and every positive even \(a_t\)
  resets it to zero.  Nevertheless, for every \(\epsilon>0\) there are
  near-critical strict-barrier symbolic words with positive surplus rate
  below \(\epsilon\) and exponential factor complexity.  After a displayed
  exponent-\(2\) reset, every exact finite realization has decoder depth at
  most one throughout the coded segment.  Every finite such segment has a
  stabilized positive ordinary realization by P15, but the realizing seed
  moves with the segment.  Thus no finite-window or purely symbolic
  complexity-collapse theorem follows from bounded decoder depth.

- [x] **Asynchronous sibling fan.**  Let \(n\) be the least positive odd seed
  whose orbit does not terminate, and write
  \(2^{a_j}x_{j+1}=3x_j+1\).  For
  \(1\le m\le\lfloor(a_j-1)/2\rfloor\), the lower-exponent seed

  \[
  y_{j,m}=\frac{x_j-(4^m-1)/3}{4^m}
          =\frac{2^{a_j-2m}x_{j+1}-1}{3}
  \]

  reaches \(x_{j+1}\) in one accelerated step, so \(y_{j,m}\ge n\).
  The entire fan is equivalent to the least-predecessor condition

  \[
  x_{j+1}\equiv2\pmod3
  \quad\Longrightarrow\quad
  x_{j+1}\ge\frac{3n+1}{2}.                          \tag{3.2a}
  \]

  On an injective divergent ray equality is impossible, but in a periodic
  basin it can describe a preperiod-one entry into the cycle.  The exact
  family \(n_K=2^{3K+1}-5\), with initial accelerated word \((1,2)^K\),
  gives arbitrarily long strict-barrier ordinary windows with a global
  prefix minimum, no lower siblings, finite normalized height below \(n_K+5\),
  decoder depth at most one after the first reset, and reciprocal mass
  tending to zero.  Thus a sibling proof still needs a fixed-ray theorem
  forcing a low \(2\bmod3\) return or a deeper inverse chain below \(n\).

- [x] **Fixed-ray greedy inverse budget and harmonic thinness.**  Let
  \(R(X)=(2X-1)/3\) for \(X\equiv2\pmod3\), let
  \(R(X)=(4X-1)/3\) for \(X\equiv1\pmod3\), and leave \(R\) undefined
  on multiples of \(3\).  If the greedy chain from an orbit endpoint
  \(x_j\) survives for \(s\) steps, with exponent sum \(E_s\), carry
  \(C_s\), \(h_j=x_j/q_j\), and \(\alpha=\log_2 3\), then

  \[
  R^s(x_j)=2^{-\Delta(j,s)}h_j-\frac{C_s}{3^s},
  \qquad
  \Delta(j,s):=A_j-E_s-\alpha(j-s).                  \tag{3.2b}
  \]

  Leastness of \(n\) and the stationary bound \(h_j<\mathcal K\) therefore
  give the exact safety budget

  \[
  \Delta(j,s)
  \leq\log_2\!\left(\frac{h_j}{n+C_s/3^s}\right)
  <\log_2(\mathcal K/n).                              \tag{3.2c}
  \]

  Hence unbounded greedy coefficient saving is impossible on one least
  divergent ray.  Moreover, equal returned factors transport their complete
  greedy residue signatures.  If a fixed factor has occurrence lifts
  \(x_t=\rho+2^{B+1}u_t\), then reciprocal-mass convergence implies

  \[
  \sum_{t:\,v\text{ occurs at }t}\frac1{1+u_t}<\infty. \tag{3.2d}
  \]

  Thus every infinite factor class is harmonically thin.  These are genuine
  fixed-seed restrictions, but they do not force a chain to survive long
  enough to violate (3.2c), nor do they force a harmonically dense return
  class.

- [x] **Transition complexity on one normalized ray.**  Put

  \[
  B_j:=\lfloor j\log_2 3\rfloor,
  \qquad h_j:=B_j-A_j\geq0,
  \qquad
  T_s:=\#\{0\leq j<s:h_{j+1}\neq h_j\}.               \tag{3.2e}
  \]

  For one fixed normalized divergent seed (n), every state in the first
  (s) accelerated steps satisfies

  \[
  x_j<2^{h_j}K_s,
  \qquad K_s:=2n+\frac{2s}{3}.                         \tag{3.2f}
  \]

  On a constant-height run of (u) internal edges, the valuation word is
  mechanical.  Its length-(L) factor complexity is (L+1); combining a
  repeated factor with the exact (2^{Q+1}) cylinder modulus gives

  \[
  2^{\lfloor u/2\rfloor}<2^hK_s.                      \tag{3.2g}
  \]

  Upward height jumps have size at most one.  Multiplying (3.2g) over the
  (T_s+1) runs therefore yields

  \[
  2^{s-2T_s-1}
  <2^{T_s(T_s+1)}K_s^{2T_s+2}.                         \tag{3.2h}
  \]

  In particular (T_s=\Omega(\sqrt s)).  If the heights are uniformly
  bounded by (H), then instead

  \[
  T_s>
  \frac{s-1-2H-2\log_2K_s}
       {2+2H+2\log_2K_s}
  =\Omega\!\left(\frac{s}{\log s}\right).             \tag{3.2i}
  \]

  Global factor entropy sharpens the bounded-height conclusion.  If
  \(0\leq h_j\leq H\) on the whole ray for one fixed integer \(H\geq1\),
  and

  \[
  F_H(p):=h_2(p)+p\log_2H,
  \]

  then, with \(c_H\) the unique root in
  \((0,H/(H+1)]\) of

  \[
  F_H(c_H)=1,                                         \tag{3.2j}
  \]

  one has

  \[
  \boxed{\displaystyle
  \liminf_{s\to\infty}\frac{T_s}{s}\geq c_H>0.}        \tag{3.2k}
  \]

  The proof chooses logarithmic-length factors whose dyadic cylinder
  modulus exceeds the complete state range, so all such factors are
  distinct.  Entropy subadditivity then counts the mechanical phase,
  initial height, and transition indicators without assuming independence.
  For \(H=1\), this gives \(c_1=1/2\).

  Thus every divergent obstruction is transition-dense: it cannot be a
  bounded-transition perturbation of the characteristic mechanical word.
  This still permits unbounded height with at least square-root transition
  growth and does not by itself force convergence.

- [x] **Fixed dual-tail companion and reciprocal-mass dichotomy.**  On one
  normalized divergent ray, put

  \[
  q_j:=\frac{3^j}{2^{A_j}},
  \qquad
  h_j:=\frac{x_j}{q_j},
  \qquad
  \mathcal K:=\lim_jh_j,
  \qquad
  e_j:=q_j(\mathcal K-h_j).
  \]

  Then the same valuation word drives the paired recurrences

  \[
  2^{a_j}x_{j+1}=3x_j+1,
  \qquad
  2^{a_j}e_{j+1}=3e_j-1,
  \]

  with (x_j+e_j=q_j\mathcal K) and (e_j>1/3).  If
  (R_j:=\sum_{t\geq j}q_t^{-1}), then

  \[
  \frac1{3e_j}=\frac{q_j^{-1}}{R_j},
  \qquad
  \prod_{j<L}\left(1-\frac1{3e_j}\right)=\frac{R_L}{R_0}.
  \]

  Consequently

  \[
  \boxed{\sum_j\frac1{e_j}=\infty,
  \qquad
  \sum_j\frac1{x_j}<\infty.}                         \tag{3.2l}
  \]

  This is a fixed-seed, all-depth companion, not a moving-window shadow.
  The audited shell bound does not yet apply because (e_j) need not be
  integral.  The remaining synchronized-shell target must use the
  integrality and injectivity of the (x_j) side to bound the reciprocal
  mass of its real companion.  See
  [divergence_dual_tail_companion.md](divergence_dual_tail_companion.md).

- [x] **Centered charge and rounding-defect localization.**  In fact,
  (e_j\geq1), with equality forcing the impossible tail
  (a_j=a_{j+1}=\cdots=1).  Put

  \[
  X_j:=x_j+1,
  \qquad E_j:=e_j-1,
  \qquad c(a):=2^a-2.
  \]

  Then

  \[
  2^{a_j}X_{j+1}=3X_j+c(a_j),
  \qquad
  2^{a_j}E_{j+1}=3E_j-c(a_j),
  \]

  and the complete future charge is

  \[
  \frac{E_j}{q_j}
  =\sum_{t\geq j}\frac{c(a_t)}{3q_t}.
  \]

  If (m_j:=\lceil e_j\rceil) and

  \[
  d_j:=2^{a_j}m_{j+1}-3m_j+1,
  \]

  then (-2\leq d_j\leq2^{a_j}-1), and

  \[
  \boxed{
  \sum_{\substack{j\geq0\\d_j\leq0}}\frac1{m_j}=\infty.} \tag{3.2m}
  \]

  Thus the synchronized-shell problem localizes to defects
  (-2,-1,0).  Exact probes also show the limit of this reduction: local
  floor-or-ceiling exact edges need not assemble into a long integer
  trajectory, and a proposed (3\log(\rho+1)) stabilization potential is
  already false on a strict prefix of seed (27).  See
  [divergence_companion_charge_rounding.md](divergence_companion_charge_rounding.md).

### Exact open gate

- [ ] **Binary-ternary stabilization.**  Let an infinite strict-barrier
  word have eventually constant least dyadic cylinder representative.
  Prove that some moving subblock has a deficit-two or deficit-three
  terminal congruence outside the lists (2.1) and (2.2), or derive a smaller
  positive coalescing ancestor directly.

This gate is the only unproved implication in the present terminal route to
the theorem that no orbit diverges.  The preceding no-go constructions show
that eventual constancy of the ordinary binary lift must be used across
infinitely many renewal scales on the same ray.  Eventual constancy plus any
fixed finite amount of subsequent information is insufficient.

A sharpened bounded-decoder subgate is now explicit.  Let \(n\) be one fixed
positive ordinary seed whose normalized accelerated ray has every strict
prefix barrier, \(S_t\to\infty\), and finite stationary height
\(\mathcal K\).  Prove that

\[
\exists D,T\quad\forall t\ge T:\quad v_3(x_t+1)\le D
\]

forces

\[
\liminf_{L\to\infty}\frac{p_2(L)}L
<\frac1{\log_2 3-1}.                                  \tag{3.3}
\]

This would contradict (2.5).  It remains unproved and does not cover decoder
depths which are unbounded but sublinear in the synchronization scale.

## 4. Cycle branch

Let \(x_0,\ldots,x_{r-1}\) be the distinct odd states of a primitive
positive accelerated cycle, let \(a_i=v_2(3x_i+1)\), and put
\(A=\sum a_i\).  Then

\[
(2^A-3^r)x_0=C(a).                                      \tag{4.1}
\]

### Closed reductions

- [x] **One-strip theorem, CERTIFIED.**  Using the audited verification
  bound \(\min x_i>2^{71}\), cyclic shell injection gives

  \[
  0<A\log2-r\log3<0.685<\log2.
  \]

  Consequently

  \[
  A=\lceil r\log_2 3\rceil.                              \tag{4.2}
  \]

  The shell sum through \(1000\), all endpoint capacities, and the analytic
  tail are checked with exact integer arithmetic.

- [x] Rotate to a least odd state.  If \(A_i=\sum_{j<i}a_j\), then every
  proper suffix back to the least state gives

  \[
  2^{A-A_i}>3^{r-i},
  \qquad
  A_i\log2-i\log3<A\log2-r\log3.                        \tag{4.3}
  \]

  In particular \(a_0=1\) for a nontrivial cycle.

- [x] **Length barrier, CERTIFIED.**  Equations (4.1) to (4.3) give

  \[
  0<\frac Ar-\log_2 3<\frac1{3\cdot2^{70}}.
  \]

  Exact rational intervals for \(\log_2 3\), followed by a Farey-neighbor
  certificate, imply

  \[
  r\geq72{,}057{,}431{,}991.                             \tag{4.4}
  \]

- [x] **Rotation-invariant denominator.**  Put
  \(D=2^A-3^r\), let \(C_j\) be the carry of the \(j\)-th cyclic rotation,
  and let \(g=\gcd(D,C_j)\).  Then \(g\) is rotation-invariant and, with
  \(q=D/g\), \(p_j=C_j/g\),

  \[
  2^{a_j}p_{j+1}=3p_j+q,
  \qquad\gcd(p_j,q)=1.                                  \tag{4.5}
  \]

  Thus every word defines a positive rational \(3x+q\) cycle.  Integer
  lifting is exactly \(q=1\).  Otherwise \(q\geq5\), and \(q=5\) occurs for
  a primitive strict-record one-strip word.  Positivity, primitivity,
  strict records, and (4.2) alone therefore cannot prove integrality.

- [x] **Denominator cliff and paired shadow.**  In deficit coordinates, an
  admissible unit change of one carry digit changes \(C\) by a unit modulo
  \(D\).  Hence a word with \(q=1\) has only maximal-denominator unit neighbors:
  the integer condition is isolated rather than perturbatively stable.
  Every reduced rational \(3x+q\) cycle also has an exact positive integer
  companion following the shortcut rule \(m\mapsto3m-q\).  For \(q=1\) this is
  the \(3m-1\) shadow, a simple path from \(2^A-x\) to \(3^r-x\) whose endpoint is
  smaller than all preceding shadow states.  A contradiction from this
  endpoint-adjacent shadow would close (4.6).

- [x] **Full boundary-winding reduction.**  Put \(M=2^A\), \(R=3^r\),
  \(D=M-R\), and define the full canonical boundary points

  \[
  \rho=[-CR^{-1}]_M,
  \qquad
  Z=[CM^{-1}]_R.
  \]

  The positive ordinary \(3m-1\) shadow proves that the endpoint of the
  canonical dyadic lift lies in \((0,R)\), so it is exactly \(Z\).  If
  \(g=\gcd(C,D)\), \(q=D/g\), and \(n=C/g\), then

  \[
  \kappa:=\frac{q\rho-n}{M}\in\mathbf Z,
  \qquad
  \rho-Z=g\kappa,
  \qquad
  \gcd(\kappa,q)=1\quad(q>1).                         \tag{4.5a}
  \]

  In the audited cycle range \(x=C/D<M\), denominator one is therefore
  exactly the boundary collision \(\kappa=0\).  Exhaustive search through
  \(r=20\) and 22,000 longer strict-record samples gives \(\kappa>0\), but
  the all-depth strict positive-winding statement remains open.  It is a
  sufficient strengthening of the original cycle-integrality gate, not a
  proved replacement.  Loose anchored words can have negative winding;
  \((1,1,2,3,1)\) has \(\rho=7<8=Z\).  If the rational cycle is rotated
  to its strict least numerator, negative winding would make the canonical
  integer segment coefficient-contractive while its start is strictly
  smaller than every later odd state.  Thus the missing sign law is an
  instance of the minimum-start formulation of Terras's coefficient-stopping
  problem.

  The direct continuation audit proves the converse as well.  Every
  nonpositive strict winding, cut at its first shortcut coefficient crossing,
  gives a canonical First-Crossing Descent counterexample.  Conversely, every
  nontrivial coefficient first-crossing shortcut word compresses to a
  primitive strict-record valuation word with (a_0=1).  Therefore strict
  positive boundary winding and First-Crossing Descent are equivalent as
  all-depth statements.  Since First-Crossing Descent is equivalent to
  Terras's Coefficient Stopping Time conjecture by the canonical-lift
  formula, the proposed sign theorem has exactly that strength.  This does
  not prove any of these equivalent statements.

- [x] **Absolute paired-shadow loss and complete-lattice no-go.**  For the
  canonical accelerated states \(y_i\), put

  \[
  H_i:=3^i2^{A-A_i},
  \qquad m_i:=H_i-y_i,
  \qquad T:=m_0-m_r.
  \]

  The positive shadow satisfies

  \[
  2^{a_i}m_{i+1}=3m_i-1,
  \qquad
  T=D+Z-\rho.
  \]

  Combining this identity with the two-lift theorem gives

  \[
  T\in\{\tau,D+\tau\},
  \qquad
  \boxed{\rho>Z\Longleftrightarrow T<D.}              \tag{4.5b}
  \]

  Telescoping the shadow recurrence yields the equivalent signed-defect
  gate

  \[
  \boxed{
  \sum_{i=0}^{r-1}(2^{a_i}-3)m_{i+1}<3D-r.}          \tag{4.5c}
  \]

  This is the exact absolute inequality missing from boundary-flux
  arguments.  In fact, the four-corner virtual carry from (5.11) gives a
  stronger no-go than previously recorded.  Translating every carry below
  the ideal \(d=(0,0,1,1,2,2,3,4)\) by \(-264\) makes its top the unique
  failure among all 30 terminal-preserving subideals, while all 29 proper
  vertices descend.  Thus even the complete proper subideal lattice, all
  carry differences, and all wrap data do not determine the top sign under
  a common translation.  A proof must use the unshifted front term, or
  equivalently the absolute loss in (4.5b).  See
  [cycle_boundary_anchored_lattice_attack_2026-08-26.md](cycle_boundary_anchored_lattice_attack_2026-08-26.md)
  and
  [inverse/q2_full_subideal_virtual_probe.js](inverse/q2_full_subideal_virtual_probe.js).

- [x] **Cycle first-crossing localization.**  Stop a least-state integer
  cycle at its first shortcut coefficient crossing.  If the least state is
  written as \(x=\rho+t2^k\) in the corresponding parity cylinder, cyclic
  minimality and the bound \(Z-\rho<s/3<2^k-3^s\) force \(t=0\).  Hence every
  hypothetical integer cycle supplies a canonical first-crossing excursion

  \[
  x=\rho<2^k,
  \qquad Z-x=\tau\geq0.                                \tag{4.6a}
  \]

  Thus the cycle-specific problem cannot evade First-Crossing Descent by
  using a higher dyadic lift.  Splitting the cycle into successive
  coefficient crossings makes the normalized displacement margins
  telescope; it does not determine their individual signs.

- [x] **Proper first-crossing complement bound.**  Suppose that the first
  shortcut coefficient crossing is proper.  Give it dyadic coefficient
  \(M_u\), odd weight \(s\), displacement \(t\), and determinant \(D_u\),
  and give the complementary return block odd weight \(h=r-s\geq1\) and
  determinant \(D_h=2^{\lceil h\log_2 3\rceil}-3^h\).  Both blocks are one-strip and
  their ceiling defects add.  Moreover,

  \[
  1\le t<s/3,\qquad
  t=[C_uM_u^{-1}]_{D_u},\qquad
  D_h\mid(t3^h+C_v).
  \]

  Equality of the two reconstructed starting states is exactly the original
  full-cycle divisibility, so that part of the reduction is circular.  The
  complementary carry envelope does give the noncircular inequality

  \[
  r>\frac{D_h}{3^h}(3n-h).                            \tag{4.6c}
  \]

  Hence either \(h\ge13\), or
  \(r\ge378{,}955{,}335{,}045{,}094{,}986{,}284\).  For \(h=1\), it gives
  \(r\ge n\).  This is a strong bounded-complement theorem, not a uniform
  cycle exclusion; a complement at a deeper near-convergent can make
  \(D_h/3^h\) arbitrarily small.

- [x] **Unit-letter Ferrers wraps.**  If \(a_i=1\), the difference between the
  carries of two adjacent cyclic rotations is a positive Ferrers-cell sum
  \(S_i\).  With \(D=2^A-3^r\) and the invariant reduced denominator \(q\)
  from (4.5),

  \[
  \gcd(S_i,D)=D/q,
  \qquad D\mid S_i\Longleftrightarrow q=1.             \tag{4.6b}
  \]

  A denominator-one candidate has at least \(2r-A\) such full-modulus sums.
  They are correlated copies of the same integrality condition, not
  independent congruences; the denominator-five regression has the same
  linear family, with every unit-letter sum having gcd exactly \(D/5\)
  with \(D\).  

- [x] **Christoffel integrality is completely classified.**  Write the
  shortcut length as \(N=A\), and let \(c_{N,r}\) be the lower Christoffel
  word with one positions \(\lfloor jN/r\rfloor\).  If
  \(g=\gcd(N,r)\), its carry has the exact reduced denominator

  \[
  \frac{2^N-3^r}{\gcd(2^N-3^r,C(c_{N,r}))}
  =2^{N/g}-3^{r/g}.                                   \tag{4.6d}
  \]

  Hence a Christoffel word lifts to an integer cycle only when it is
  \((10)^g\), the trivial cycle at \(1\).  At a coprime slope, choose the
  Bezout unit \(z\pmod D\) with \(z^r=2\) and \(z^N=3\).  Every strict-record
  candidate has the exact spectral gate

  \[
  \sum_{j=0}^{r-1}z^{-c_j}2^{-m_j}\equiv0\pmod D,
  \qquad c_j=[jN]_r,\qquad m_j\ge-1.                  \tag{4.6e}
  \]

  The Christoffel case is \(m_j=0\), where the geometric sum is a unit.
  Thus every nontrivial coprime candidate must be a genuine dyadic
  deformation.  When \(g=2\), integrality splits into one congruence modulo
  \(2^{N/2}-3^{r/2}\) and a signed complementary congruence modulo
  \(2^{N/2}+3^{r/2}\).  The primitive strict-record word
  \((1,2,1,2,1,3)\) passes the first factor \(5\) but misses the second
  factor \(59\).  Consequently neither primitivity nor base-factor
  divisibility removes the common-divisor case.

- [x] **First-crossing row dichotomy for a cycle.**  Let the least-state
  cycle first cross the shortcut coefficient barrier at odd weight \(s\),
  and put

  \[
  q_s=2^{\lceil s\log_2 3\rceil-
             \lceil(s-1)\log_2 3\rceil}\in\{2,4\}.
  \]

  The canonical first-crossing lemma gives \(x=\rho\) and
  \(D\rho\le C<s\,3^s/3\).  If \(q_s=4\), then
  \(D>3^s/3\), so \(x=\rho<s\).  The first-crossing prefix is simple because
  the cycle is primitive.  Apart from its initial odd source, every odd
  source is nonzero modulo \(3\).  Sorting these sources and applying the
  exact shortcut product gives, with \(d:=Z-x\geq0\),

  \[
  \left(\frac{4(x+d)}{3x}\right)^9
  <\frac{x+3s-7/2}{x-7/2},
  \qquad
  s>\frac{242461}{59049}\left(x-\frac72\right).
  \]

  The audited minimum \(x>2^{71}\) is an odd integer, so
  \(x\geq2^{71}+1\).  Since the first-crossing block uses at most the full
  cycle, and

  \[
  \left\lfloor
  \frac{242461(2^{72}-5)}{118098}
  \right\rfloor+1
  =9{,}695{,}250{,}552{,}956{,}502{,}634{,}734,
  \]

  exact integer division strengthens the row dichotomy to

  \[
  \boxed{
  q_s=2\quad\text{or}\quad
  r\geq s\geq9{,}695{,}250{,}552{,}956{,}502{,}634{,}734.
  }                                                     \tag{4.6f}
  \]

  This is an unconditional dichotomy under the same audited cycle inputs;
  it does not assume First-Crossing Descent for the projected row.

- [x] **Two-level Christoffel deformations are sharply reduced.**  At a
  coprime slope, write the one positions as

  \[
  n_j=\left\lfloor\frac{jN}{r}\right\rfloor-m_j,
  \qquad m_j\ge-1,
  \]

  using the deformation levels in (4.6e).  The Christoffel extremal theorem
  excludes every nontrivial least-state denominator-one word whose levels
  lie in \(\{-1,0\}\).  If the levels lie in \(\{0,1\}\) and exactly one
  index has level \(1\), integrality would force

  \[
  2^N-3^r\mid
  \operatorname{Res}(X^r-2,X^k-X+1),
  \qquad 2\le k\le N-r.                              \tag{4.6g}
  \]

  Eisenstein nonvanishing, a sparse companion-matrix Hadamard bound, the
  audited logarithmic-form estimate, and (4.4) make the nonzero resultant
  strictly smaller than \(2^N-3^r\), a contradiction.  Exactly two shifted
  indices are also excluded.  When their Christoffel residues both lie below
  \(N-r\), a five-term resultant has absolute value smaller than \(D\).  The
  remaining adjacent pair satisfies the additional specific-root identity

  \[
  3z^{2r-N}=4,
  \]

  which yields either a smaller content-reduced resultant or a positive
  integer strictly between \(0\) and \(D\).  Consequently every surviving
  coprime two-adjacent-level candidate must use levels \(\{0,1\}\) with at
  least three shifted indices.  Primitive rational countermodels show why
  full-determinant control is essential: a singleton resultant can equal the
  proper factor \(7\) of \(D\), leaving reduced denominator \(233\), and a
  two-shift resultant can equal the proper factor \(11\), leaving reduced
  denominator \(7727\).

  Exactly three shifted indices split into run types \(3\), \(2+1\), and
  \(1+1+1\).  All three run types are now excluded uniformly above the
  period barrier.  A consecutive run of three has internal Christoffel
  gaps \(12\) or \(21\).  The corresponding subset gates are

  \[
  9z^{c+1}-23z+23=0,
  \qquad
  9z^{c+1}-29z+29=0\pmod D.
  \]

  Successive specific-root identities at the Euclidean exponents
  \(L=2r-N\), \(M=2N-3r\), \(E=8r-5N\), and
  \(F=12N-19r\) give nonzero resultants strictly smaller than \(D\), so run
  type \(3\) is impossible.  For a \(2+1\) pattern, let \(c\) be the
  pair's run-start residue and \(e\) the isolated run-start residue.  Its
  exact gate is

  \[
  (z-1)\left(Az^{-c}+3z^{-e}\right)=3z\pmod D,
  \qquad
  A=5\ \text{or}\ 7,
  \]

  according as the internal pair gap is one or two.  A content-reduced
  resultant excludes the sector \(A=5\), \(e<c\).  For \(A=7\), the
  identity \(3z^L=4\) rewrites the gate as the three-isolated equation

  \[
  (z-1)\left(z^{-c_1}+z^{-c_2}+z^{-c_3}\right)=z\pmod D,
  \qquad 0\le c_1<c_2<c_3<B.
  \]

  We put \(M=2N-3r\) and use the ten monotone anchors in
  \(\{0,L,B\}\).  Full reduction modulo \(8X^M-9\), without dividing any
  folded content, gives a nonzero resultant whose norm is bounded by an
  exact rational interval cover of the complete normalized gap simplex.
  The cover has \(8417\) nodes, \(3576\) certified boxes, and no residual
  box.  Hence it excludes both three isolated shifts and every
  internal-gap-two \(2+1\) pattern.

  The final order \(A=5\), \(e>c\), satisfies

  \[
  (z-1)\left(5z^{-c}+3z^{-e}\right)=3z\pmod D,
  \qquad 0<c<e<B,\quad c<L.
  \]

  A second exact cover uses the same full \(M\)-fold and proves that the
  associated nonzero resultant is smaller than \((374/125)^r<D\).  It has
  \(297\) nodes, \(139\) certified boxes, and no residual box.  Thus no
  coprime denominator-one two-level candidate has exactly three shifted
  sites.

  For exactly four shifted sites, the consecutive run type is also excluded
  uniformly above the period barrier.  A run of four has internal gap word
  \(121\), \(122\), or \(212\), and its subset gate compresses to

  \[
  27z^{c+1}=A(z-1)\pmod D,
  \qquad A\in\{85,101,119\}.
  \]

  The first three Euclidean rungs reduce every branch except the terminal
  \(F\)-quotient \(3\).  In that branch the residual exponent lies below

  \[
  G:=E-3F=65r-41N,
  \qquad 3^{41}z^G=2^{65}\pmod D.
  \]

  A \(3\)-adic Sylvester-column factor then produces a nonzero integer
  multiple of \(D\) whose absolute value is smaller than
  \((299/100)^r<D\), which is impossible.  Thus the entire run-\(4\) sector
  is excluded.

  The run type \(2+2\) is now excluded as well.  If the two run-start
  residues are \(0<c<e<B\), then their exact grouped gate is

  \[
  (z-1)(Az^{-c}+A'z^{-e})=3z\pmod D,
  \]

  where

  \[
  (A,A')=
  \begin{cases}
  (5,5),&e<L,\\
  (5,7),&c<L\leq e,\\
  (7,7),&L\leq c.
  \end{cases}
  \]

  Exact convergent bounds and the period barrier give

  \[
  \frac{5698301721657743}{2333003475953681}
  <\frac LM<
  \frac{46153}{18896}.
  \]

  The anchors \(0,M,L,B\) and the full \(M\)-fold close the \(5/7\) and
  \(7/7\) sectors.  The \(5/5\) sector has one near-\(M\) resonance.  Both
  sides, including equality, reduce at the \(F\)-rung to the primitive
  coefficient triple

  \[
  45\cdot2^{30},\qquad 5\cdot2^{33},\qquad 3^{22}.
  \]

  The worst same-sign alias still gives a nonzero resultant smaller than
  \((299/100)^r<D\).  An exact rational cover has \(531\) nodes,
  \(227\) certified boxes, and no residual box.  Consequently, the
  run type \(2+2\) is empty.

  The \(3+1\) gate is

  \[
  (z-1)(Az^{-c}+9z^{-e})=9z\pmod D,
  \qquad A\in\{23,29\}.
  \]

  Here \(A=23\) is the internal triple word \(12\), with \(0<c<L\),
  whereas \(A=29\) is the internal triple word \(21\), with
  \(L\leq c<B\).  Exact \(M,E,F,G\)-rung resultants exclude the complete
  \(A=29\) domain: both orders \(c<e\) and \(e<c\), including the crossing
  strip

  \[
  M\leq e<L\leq c<B.
  \]

  The terminal branches use forced \(2\)- or \(3\)-adic Sylvester content;
  after removing that content, each nonzero multiple of \(D\) is smaller
  than \((299/100)^r<D\).  This all-depth theorem was independently audited,
  including every endpoint and degree-equality branch.  The explicit
  resultant ledger still leaves the two \(A=23\), internal-word-\(12\)
  residue orders and the run types \(2+1+1\) and \(1+1+1+1\).  They are
  all removed simultaneously by the transition theorem below; no further
  four-site resultant is needed.

- [x] **Support-independent transition theorem.**  For an arbitrary
  one-strip cycle deformation put

  \[
  B_j:=\left\lfloor\frac{jN}{r}\right\rfloor,
  \qquad A_j=B_j-m_j,
  \qquad m_0=m_r=0,                                   \tag{4.6h}
  \]

  and let

  \[
  T:=\#\{0\leq j<r:m_{j+1}\neq m_j\}.                \tag{4.6i}
  \]

  Strict suffix records give \(m_j\geq-1\).  The audited linear-form bound
  \(x<305r^{14.3}\), the affine carry formula, and \(A_j\leq B_j+1\)
  give the state envelope

  \[
  x_j<2^{m_j}H_r,
  \qquad H_r:=612r^{15}.                              \tag{4.6j}
  \]

  On a constant-height run of \(u\) internal edges, the valuation word is
  rational mechanical.  Its length-\(L\) factor complexity is at most
  \(L+1\).  A repeated factor and the exact \(2^{Q+1}\) odd-cylinder
  modulus therefore imply

  \[
  2^{\lfloor u/2\rfloor}<2^mH_r.                     \tag{4.6k}
  \]

  Positivity permits every upward height jump to have size at most one.
  Multiplying (4.6k) over the \(T+1\) linear runs gives the all-depth bound

  \[
  \boxed{
  2^{r-2T-1}<2^{T(T-1)}(612r^{15})^{2T+2}.}           \tag{4.6l}
  \]

  Hence every hypothetical integer cycle has \(T=\Omega(\sqrt r)\).  In
  the binary branch \(m_j\in\{0,1\}\), the carry envelope sharpens to
  \(611r^{15}\), exactly \(T/2\) linear runs have height one, and

  \[
  \boxed{
  2^{r-2T-1}<2^T(611r^{15})^{2T+2}.}                  \tag{4.6m}
  \]

  Thus \(T=\Omega(r/\log r)\).  Global factor entropy makes this linear.
  At

  \[
  L:=\left\lceil\log_2(611r^{15})\right\rceil,
  \]

  the \(r\) cyclic valuation factors are all distinct.  Encoding each by
  its rational-mechanical factor, initial height bit, and transition
  indicators gives

  \[
  \log_2r\leq
  \log_2(2(L+1))+Lh_2(T/r).                            \tag{4.6n}
  \]

  Exact rational bounds for \(h_2(1/193)\), together with the period
  barrier, then yield

  \[
  \boxed{T>\frac r{193}.}                              \tag{4.6o}
  \]

  If \(k\) is the number of shifted sites, then \(T\leq2k\), so

  \[
  \boxed{k>\frac r{386}.}                              \tag{4.6p}
  \]

  Independently, exact integer arithmetic at
  \(r=10000\), followed by a monotone propagation inequality and the period
  barrier (4.4), excludes every fixed \(k\).  In particular all exactly-four
  configurations, including both \(A=23\) orders and the \(2+1+1\) and
  \(1+1+1+1\) run types, are impossible.  The surviving cycle obstruction
  is therefore a growing transition-cancellation problem, not a finite
  list of deformation patterns.

- [x] **Archimedean occupation no-go.**  With

  \[
  R:=\frac{2^N}{3^r},
  \qquad
  W:=\sum_{j<r}2^{B_j-j\log_2 3}2^{-m_j},
  \]

  the normalized carry and putative least state satisfy the exact identities

  \[
  \frac{C}{2^N}=\frac{W}{3R},
  \qquad
  x=\frac{W}{3(R-1)}.                                  \tag{4.6q}
  \]

  These real identities cannot oppose the transition lower bounds.  The
  primitive strict-record word

  \[
  a=(1^{r-1},N-r+1)                                   \tag{4.6r}
  \]

  is an exact least positive rational \(3p+q\) cycle with
  \(T=N-r\), maximum height \(N-r-1\), bounded \(W<3\), and at most
  \(2(H+1)\) sites below any fixed height \(H\).  It also obeys the same
  polynomial least-state scale as an integer candidate.  Its sole missing
  property is denominator one: its reduced denominator is larger than
  \(\tfrac12e^{-6.125581}2^r/r^{13.3}\).  Thus neither normalized carry,
  height occupation, variation, leastness, nor linear transition density
  can close the cycle branch without using the full congruence \(D\mid C\).

- [x] **Cylinder alignment and the exact resultant quotient.**  Write the
  reduced rational fixed point as \(C/D=n/q\), and let \(\rho_w\) be the
  least positive odd solution of

  \[
  3^r\rho_w+C\equiv2^N\pmod {2^{N+1}}.
  \]

  Then

  \[
  \boxed{n\equiv q\rho_w\pmod {2^{N+1}}.}             \tag{4.6s}
  \]

  Hence denominator one, together with the state bound and the period
  barrier, identifies the putative least cycle state with the ordinary
  cylinder representative: \(x=\rho_w\).  This is the exact arithmetic
  datum absent from the transition-dense rational counterfamilies.

  In the coprime binary deformation model, let \(\theta^r=2\),
  \(\delta=\theta^N-3\), and let \(H\) be the endpoint polynomial.  If
  \(R_H=\operatorname{Res}(X^r-2,H)\), then an explicit algebraic integer
  \(\Omega\in\mathbf Z[\theta]\), built from all numerator states, satisfies

  \[
  \boxed{
  |\operatorname{Norm}(\Omega)|
  =q^r\frac{|R_H|}{D}.}                               \tag{4.6t}
  \]

  Thus \(q=1\) strengthens \(D\mid R_H\) to the exact norm identity
  \(|R_H|/D=|\operatorname{Norm}(\Omega)|\).  The positive real conjugate
  is comparable with \(x\), but the other conjugates retain the complete
  prefix-carry vector.  Present state bounds control them only
  exponentially, so (4.6t) is an exact reformulation rather than a size
  contradiction.

- [x] **Dense determinant and noncoprime-slope no-gos.**  For a binary
  support endpoint polynomial

  \[
  H_T(X)=(X-1)\sum_{c\in T}X^{c_*-c}-X^{c_*+1},
  \]

  one has \(H_T(0)=-1\).  Therefore its direct resultant is always odd;
  dense support cannot force any power of two into it.  An exact scalable
  family has linear support and transition densities, resultant larger
  than \(3^r\), and no factor of two or three.  This family is not
  denominator one, but it rules out a uniform density-to-content or
  Mahler-size closure.

  Likewise, if \(g=\gcd(N,r)>1\) and the word is split into \(g\) blocks,
  the base factor \(2^{N/g}-3^{r/g}\) telescopes through the integer block
  states.  Its divisibility is automatic under \(q=1\) and does not force
  a repeated boundary state or a shorter cycle.  Exact enumeration through
  \(r=20\) finds many primitive base-factor hits and no full-determinant
  hit.  Consequently neither dense endpoint content nor the base factor of
  a noncoprime slope replaces the complementary global divisibility.

### Exact open gate

- [ ] **Cycle integrality obstruction.**  Prove that for every primitive
  strict-record word satisfying (4.2),

  \[
  (2^A-3^r)\nmid C(a),                                  \tag{4.6}
  \]

  except for the trivial cycle word.  Equivalently, prove \(q>1\) in
  (4.5).  Closing (4.6) proves that there are no nontrivial positive cycles,
  which is one of the requested partial outcomes.

- [ ] **One-drop specialization.**  A particularly sharp surviving
  subproblem has a rational-mechanical height path which rises by \(U\)
  unit steps and makes one terminal drop.  Every preterminal accelerated
  exponent is one or two.  Exact enumeration through \(r=34\) covers
  \(1{,}956{,}754\) primitive strict-record profiles and finds no
  denominator-one word, no canonical equality, and no canonical rise.
  In every case \(\rho_w>2^U\), with minimum ratio \(7/2\).
  The height path here is not binary: it visits every level from \(0\) to
  \(U\).  We therefore use the support-independent bound (4.6l), with
  \(T=U+1\), rather than (4.6o).  An all-depth proof of

  \[
  \rho_w>2^U                                                    \tag{4.6u}
  \]

  for this family would give

  \[
  U<\log_2(305r^{14.3})<15\log_2r+9.
  \]

  Substitution in (4.6l) yields, with \(X=\log_2r\),

  \[
  2^X=r<675X^2+945X+331,
  \]

  which is false for every \(X\geq36\).  This lies below the period
  barrier and would exclude the entire one-drop cycle sector.  The
  separation (4.6u) is a localized active gate, not yet a theorem.

- [x] **Global state envelope and refined rise barrier.**  Let \(x\) be the
  least odd cycle state, put \(Q:=(x+1)/2\), and write

  \[
  \beta:=\frac Nr,
  \qquad
  h:=\log _2(4x).
  \]

  Positivity of the unused suffix of the full carry gives the
  denominator-one estimate

  \[
  \boxed{x_j<4\cdot2^{m_j}x\qquad(0\leq j<r).}     \tag{4.6ua}
  \]

  We apply the exact rational-mechanical exponent to every repeated factor
  in a constant-height run.  Multiplying the resulting inequalities over
  the levels \(0,1,\ldots,U,0\) gives

  \[
  \boxed{
  \beta(r-3U-5)
  <U(U+1)+2(U+2)h.}                               \tag{4.6ub}
  \]

  In particular,

  \[
  Q>\frac18\,
  2^{\frac{(\log _2 3)(r-3U-5)-U(U+1)}{2U+4}}.   \tag{4.6uc}
  \]

  Combining (4.6ub) with the cycle-size estimate and the period barrier
  proves the unconditional restriction

  \[
  \boxed{U\geq337{,}419.}                         \tag{4.6ud}
  \]

  This supersedes the earlier bound \(U\geq267{,}884\).  The exact
  argument and certificate are recorded in
  [cycle_one_drop_global_envelope_gate.md](cycle_one_drop_global_envelope_gate.md).

- [x] **Critical polynomial reduction.**  Let

  \[
  \omega_j:=2^{B_j-j\log _2 3},
  \qquad
  W:=\sum_{j<r}\omega_j2^{-m_j}.
  \]

  The identity \(W=3x(2^N/3^r-1)\), the occupation estimate obtained from
  (4.6ua), and the explicit two-logarithm bound give

  \[
  \boxed{
  Q<6200(\log _2r)r^{133/10}.}                    \tag{4.6ue}
  \]

  Therefore, a uniform denominator-one estimate

  \[
  \boxed{Q\geq U^{271/10}}                        \tag{4.6uf}
  \]

  would exclude the complete one-drop sector.  Indeed, (4.6ue) and
  (4.6uf) imply \(U^2<313r/200\), while (4.6ub) gives the reverse
  inequality with an explicit margin above the period barrier.  More
  generally, every exponent strictly larger than \(133/5\) is
  asymptotically sufficient.

  A failure of (4.6uf) stabilizes the least dyadic representative after
  \(O(\log U)\) bits.  The forward and backward descriptions then reduce
  to the same unbounded mixed-radix return defect.  Exact rational families
  with denominator greater than one have bounded \(Q\), strict leastness,
  exact bottom closure, and either one long run or uniformly short runs.
  Thus Beatty phase, run length, and endpoint valuations cannot prove
  (4.6uf) without using denominator one.  The reduction and these no-go
  families are recorded in
  [cycle_one_drop_critical_polynomial_gate.md](cycle_one_drop_critical_polynomial_gate.md)
  and
  [cycle_one_drop_global_envelope_gate.md](cycle_one_drop_global_envelope_gate.md).

- [x] **Actual-factor capacity.**  Let \(e:=N-r\), and let \(p_a(L)\)
  denote the number of distinct cyclic factors of length \(L\) in the
  actual one-drop valuation word.  The \(U\) omissions have total incidence
  \(UL\) among the cyclic windows.  Rational-mechanical balance bounds the
  zero-cost and one-cost factor layers, while the unique terminal exponent
  contributes at most \(L\) additional factors.  Therefore,

  \[
  \boxed{
  2p_a(L)\leq
  4L+2+UL+(L+1)\left\lceil\frac{eL}{r}\right\rceil.}
                                                              \tag{4.6ug}
  \]

  If two distinct starts realize the same factor, their odd endpoints
  differ by a nonzero multiple of \(2\cdot3^L\).  Equation (4.6ua) makes
  this impossible whenever

  \[
  (\log _2 3)L+1>U+\log _2(4x).                    \tag{4.6uh}
  \]

  Hence (4.6uh) forces \(p_a(L)=r\).  Conversely, if the right side of
  (4.6ug) is smaller than \(2r\), then

  \[
  \boxed{
  Q\geq\frac12+\frac{3^L}{2^{U+2}}.}              \tag{4.6ui}
  \]

  Taking the least collision length and combining (4.6ug) with P7 gives
  the improved all-depth restriction

  \[
  \boxed{U\geq408{,}126.}                         \tag{4.6uj}
  \]

  If \(\log x=o(U)\), every surviving bounded-ratio family also satisfies

  \[
  \liminf\frac{U^2}{r}
  \geq
  \frac{2(\log _2 3)^2}{2\log _2 3-1}
  =2.3153852110\ldots .                            \tag{4.6uk}
  \]

  Thus the old critical layer \(U^2/r\to\log _2 3\) is excluded.  Exact
  off-critical constructions reach full factor complexity once the ratio
  is moderately larger, so equality-of-factors alone does not close the
  surviving high-rise branch.  The theorem, independent audit, and exact
  certificate are recorded in
  [cycle_one_drop_actual_factor_complexity_gate.md](cycle_one_drop_actual_factor_complexity_gate.md).

- [x] **Height-truncated full-carry residue.**  Suppose that the critical
  polynomial gate fails, so that \(Q<U^{271/10}\), and put

  \[
  M:=\left\lceil\frac{271}{10}\log _2U\right\rceil .
  \]

  Cut the bottom-normalized carry when the omission height first reaches
  \(M\).  If \(T:=T_M\), then the actual-factor theorem gives

  \[
  T<\frac65M^2+8M+12.                                \tag{4.6ula}
  \]

  There are integers \(A\geq0\) and \(E\) for which the complete
  denominator-one equation is

  \[
  \boxed{
  2^{N+1}+A3^{r-T}+E=4QD.}                           \tag{4.6ulb}
  \]

  The suffix recurrence, together with actual-factor separation, proves

  \[
  \boxed{0<E<\frac9{100}D,\qquad
  E\equiv-2^{N-U}\not\equiv0\pmod3.}                 \tag{4.6ulc}
  \]

  Thus \(E\) is the least positive representative of the explicit
  short-prefix residue

  \[
  -\left(2^{N+1}+A3^{r-T}\right)\pmod D,
  \]

  and

  \[
  \left\lfloor
  \frac{2^{N+1}+A3^{r-T}}D
  \right\rfloor=4Q-1.                                \tag{4.6uld}
  \]

  This is a new one-sided global condition.  It does not by itself close
  the gate: the residue is nonzero rather than a second multiple of \(D\),
  generic rational spacing retains the full denominator \(3^r\), and all
  cyclic rotations carry the same divisibility class through

  \[
  2^{a_i}\Phi_{i+1}=3\Phi_i+D.
  \]

  A continuation must prove special noncancellation for the positive
  residue in (4.6ulc), not merely reapply a generic approximation theorem.
  The exact identities, sign classification, and certificate are recorded
  in
  [cycle_one_drop_height_truncation_gate.md](cycle_one_drop_height_truncation_gate.md).

- [x] **Multicut transport and the terminal ternary lock.**  For every
  height cut, let (E_H) be the late-carry defect, let (Delta_H) be the
  carry in the height-(H) layer, and let (F_H) be the complementary
  prefix integer.  Then

  \[
  E_H-E_{H+1}=\Delta_H=F_{H+1}-F_H,
  \qquad F_H+E_H=4K.                                  \tag{4.6ulda}
  \]

  Thus all height-cut congruences are transports of the same class modulo
  (D), rather than independent divisibility conditions.  The defects
  have exact valuations (v_3(E_H)=0) and
  (v_2(E_H)=t_j+j), where (j) is the first remaining spike.  The
  normalized suffix recursion also gives the sharp absolute floor

  \[
  E_H>0\quad\Longrightarrow\quad E_H\geq2^{N-U-3}.     \tag{4.6uldb}
  \]

  There is one sign transition.  If (H_c) is its first negative cut,
  then

  \[
  H_c>\frac35U-\frac{271}{25}\log _2U-3.              \tag{4.6uldc}
  \]

  At that cut, with (L:=r-T_{H_c}), one of the two terminal conditions

  \[
  3^L\mid2^{U+1}(2Q-1)+1,
  \qquad
  3^L\mid2^{U+3}(2Q-1)+1                             \tag{4.6uldd}
  \]

  holds.  Consequently, for

  \[
  H_1:=\left\lfloor
  \frac35U-\frac{271}{25}\log _2U-3
  \right\rfloor,
  \]

  one has

  \[
  0<\frac{E_{H_1}}D
  <66096\,U^{961/25}2^{-3U/5}.                         \tag{4.6ulde}
  \]

  The stripped quotient in (4.6uldd) is not itself a cycle state or a
  coalescing ancestor, so leastness does not turn it into a descent.
  Moreover, (4.6ulda) proves that adding further cuts cannot supply a
  second (D)-class.  The remaining possibility is a special simultaneous
  binary and ternary noncancellation theorem for the one orbit.  See
  [cycle_one_drop_multicut_centered_residue_no_go.md](cycle_one_drop_multicut_centered_residue_no_go.md).

- [x] **Explicit terminal (3)-adic localization.**  At the first negative
  cut in (4.6uldc), put (x:=2Q-1), (L:=r-T_{H_c}), and
  (a\in\{U+1,U+3\}) according to the two alternatives in (4.6uldd).
  The explicit two-logarithm estimate of Rojas and Zhu gives

  \[
  L\leq v_3(2^ax+1)
  <169074690048\,(\log x)\log _3a.                    \tag{4.6uldf}
  \]

  Under the failed polynomial gate (Q<U^{271/10}), this becomes

  \[
  L<4.599\cdot10^{12}(\log U)^2,
  \qquad
  H_c>U-2.76\cdot10^{12}(\log U)^2-1.                \tag{4.6uldg}
  \]

  Thus the sign transition lies in the final polylogarithmically many
  height layers.  This is a genuine all-depth localization, but it does not
  yield descent.  In the no-spike alternative the natural quotient satisfies

  \[
  y=\frac{2^{U+1}x+1}{3^L},
  \qquad Z_{T_{H_c}}=2^{L-1}y,                        \tag{4.6uldh}
  \]

  while in the last-spike alternative the second exponent is (L-2).
  Except when (L=1), respectively (L=2), (y) is a stripped factor
  rather than a cycle state or an ancestor.  For (U\geq10^{16}), the same
  explicit estimate gives (3^L<2^a), and hence (y>x).  Infinite local
  integer shadows with (Q=3) show that terminal divisibility, leastness,
  and the mechanical tail inequality remain compatible.  Therefore the
  surviving step must retain the full prefix and denominator-one class
  across all height blocks.  See
  [cycle_one_drop_terminal_3adic_lock_no_go.md](cycle_one_drop_terminal_3adic_lock_no_go.md).

- [x] **All-height block Smith-form collapse.**  Partition an arbitrary
  cyclic exponent word at any collection of boundaries, including every
  first passage through a one-drop height.  If block (i) has length
  \(\ell_i\), exponent sum (E_i), and carry (c_i), its boundary states
  satisfy

  \[
  2^{E_i}x_{i+1}-3^{\ell_i}x_i=c_i.
  \]

  The cyclic bidiagonal coefficient matrix (A) has

  \[
  \det A=\pm(2^N-3^r),
  \qquad
  \operatorname {SNF}(A)=\operatorname {diag}(1,\ldots,1,D).  \tag{4.6uldi}
  \]

  Indeed, two proper maximal minors are respectively a power of two and a
  power of three, so their determinantal divisor is one.  Consequently the
  complete all-height cokernel is the single cyclic group
  \(\mathbf Z/D\mathbf Z\), and every rotated block class is a unit multiple
  of the original carry class.  Scaling individual heights by powers of two
  or three does not change this odd torsion.  Thus no linear all-height
  renormalization can provide the second global modulus needed for the
  polynomial quotient gate.  See
  [cycle_one_drop_all_height_block_snf_no_go.md](cycle_one_drop_all_height_block_snf_no_go.md).

- [x] **Last-positive odd quotient is not a descent state.**  If (H_*) is
  the last positive cut and \(\lambda:=v_2(E_{H_*})\), then

  \[
  W_*:=\frac{E_{H_*}}{2^\lambda}
  \]

  is a positive odd integer not divisible by three.  After the first
  remaining spike, its suffix is conjugate to the ordinary affine maps
  (2^ay'=3y+1), but it starts at (y=-1/2), and every intermediate
  numerator remains odd over its exact dyadic denominator.  Hence (W_*)
  is neither a cycle state, an ancestor, a shorter fixed-point numerator,
  nor a return displacement.  In the candidate slope range one has the
  sharp bound

  \[
  W_*\geq11,                                             \tag{4.6uldj}
  \]

  while strict-least rational profiles of arbitrary depth attain equality.
  The normalization therefore cannot transfer leastness or denominator one
  to a shorter tail.  See
  [cycle_one_drop_last_positive_odd_quotient_no_go.md](cycle_one_drop_last_positive_odd_quotient_no_go.md).

- [x] **Integral conjugacy and normalized-resultant collapse.**  For the
  branch matrices

  \[
  A_i:=\begin{pmatrix}3&1\\0&2^{a_i}\end{pmatrix},
  \qquad
  B:=A_{r-1}\cdots A_0
   =\begin{pmatrix}3^r&C\\0&2^N\end{pmatrix},
  \]

  put \(g:=\gcd(C,D)\) and \(q:=D/g\).  The primitive eigendirections of
  \(B\) span a sublattice of index exactly \(q\).  Consequently,

  \[
  \boxed{q=1
  \quad\Longleftrightarrow\quad
  B\text{ is }\mathrm {GL}_2(\mathbf Z)\text{-conjugate to }
  \operatorname {diag}(3^r,2^N).}                    \tag{4.6ule}
  \]

  The integral extension class is \([C]\in\mathbf Z/D\mathbf Z\).
  Trace and determinant are profile-independent, and all prime-power
  projections are projections of this one class.  The algebraic quotient
  gives the same conclusion.  If \(d:=\gcd(r,N)\) and
  \(b:=2^{N/d}-3^{r/d}\), multiplication by
  \(\delta:=\theta^N-3\) in \(\mathbf Z[\theta]\), with
  \(\theta^r=2\), has Smith form

  \[
  \operatorname {diag}(1^{\,r-d},b^d).               \tag{4.6ulf}
  \]

  Hence the coprime case contains one cyclic \(D\)-class, while the
  noncoprime case supplies only the weaker factor \(b\).  Resultant norms
  do not create a second condition: there is an exact one-drop profile
  with \(D=1631\) and \(\gcd(D,C)=1\) whose endpoint norm is nevertheless
  divisible by all of \(D\).  Therefore a successful global argument must
  use the fact that the class is represented by one small positive integer
  orbit.  It cannot depend only on trace, determinant, norm, or separate
  CRT factors.  See
  [cycle_one_drop_global_integral_conjugacy_no_go.md](cycle_one_drop_global_integral_conjugacy_no_go.md)
  and
  [cycle_one_drop_normalized_resultant_no_go.md](cycle_one_drop_normalized_resultant_no_go.md).

- [x] **Global-product, discriminant, and cross-height collapse.**  The
  exact cycle product

  \[
  \frac{2^N}{3^r}
  =\prod_{j=0}^{r-1}\left(1+\frac1{3x_j}\right)       \tag{4.6ulg}
  \]

  does not strengthen the high-rise gate by order or reciprocal-mass
  arguments.  Sharp greedy majorization under distinct oddness and all
  individual state envelopes admits an infinite high-rise packing with
  least state \(9\) and product below the required ratio.  If two rational
  numerator states have forward and backward common-factor lengths
  \(F\) and \(B\), their difference has the exact divisor supplied by the
  strongest single common factor; the common denominator cancels.  A
  Vandermonde product merely averages these pair bounds and cannot exceed
  the best one.

  Nor can equal factors at different heights be multiplied into a stronger
  constraint.  If the height gap is \(d>0\), the common word has length
  \(L\), exponent sum \(S\), and carry \(c\), then the normalized start and
  endpoint defects satisfy

  \[
  2^S H'=3^LH+(1-2^d)c.                               \tag{4.6ulh}
  \]

  Since \(3\nmid c\), the endpoint depth collapses to
  \(v_3(H')=v_3(2^d-1)\), except for the explicit full-period case.  For
  any finite collection, the occurrence matrix has rank at most two, so
  all higher minors vanish and every product of pair minors loses the
  same factor \(3^L\).  Exact integer local shadows show that this is not
  merely a weakness of the estimates.  Thus state products,
  discriminants, and cross-height packing still lose denominator one
  before the decisive comparison.  See
  [cycle_one_drop_global_product_discriminant_no_go.md](cycle_one_drop_global_product_discriminant_no_go.md)
  and
  [cycle_one_drop_cross_height_normalization_no_go.md](cycle_one_drop_cross_height_normalization_no_go.md).

- [x] **Fixed-complement layers.**  Let \(V\) be the number of unselected
  mechanical two-sites, equivalently the number of preterminal accelerated
  exponents equal to two.  The remaining preterminal exponents are one and
  split into \(V+1\) runs.  Put \(\alpha:=\log_2 3\) and
  \(L_r:=\log_2(306r^{14.3})\).  If \(x\) is a denominator-one cycle state,
  then an exponent-one run of length \(L\) sends
  \(y=x_i+1\) to \((3/2)^Ly\), while exact integrality gives \(2^L\mid y\).
  An exponent-two step does not increase \(y\).  Consequently

  \[
  r-1-V<A_VL_r,
  \qquad
  A_V:=\sum_{m=0}^{V}\alpha^m.                 \tag{4.6v}
  \]

  Thus every fixed \(V\) reduces effectively to a finite check.  Exact
  endpoint cuts and exhaustive integer certificates exclude \(V=1\) and
  \(V=2\) at all depths; the only \(V=1\) denominator-one hit is the
  trivial state \(1\).  More generally, (4.6v) gives

  \[
  V\geq1.505007\ldots\log_2r-O(\log\log r).     \tag{4.6w}
  \]

  Combining the exact comparison at the period lower bound (P5.5) with
  (4.6v) gives the unconditional candidate restriction \(V\geq38\).  This
  closes every fixed-complexity layer, but it does not make the one-drop
  problem a uniform finite computation because \(V\) remains unbounded.

- [x] **Denominator-one rotation reduction.**  Let \(C_i\) be the carry of
  the cyclic rotation beginning at \(a_i\).  The exact identity

  \[
  2^{a_i}C_{i+1}=3C_i+D,
  \qquad \gcd(D,6)=1,
  \]

  shows that \(D\mid C_i\) at one rotation if and only if it holds at every
  rotation.  In the candidate range, the normalized state bound places all
  rotated integer states below half of the full cylinder.  Consequently,
  denominator one is equivalent to zero cylinder exposure at every
  rotation.  Thus rotation does not supply an independent congruence.

- [x] **One-drop gcd and cyclotomic-factor no-go.**  In the bottom-normalized
  coordinates of (4.6zg), the half-state numerator \(K\) satisfies

  \[
  \boxed{2K=C+D.}                                      \tag{4.6xg}
  \]

  Hence

  \[
  \boxed{
  \gcd(D,K)=\gcd(D,C)
  =\gcd(C_0,\ldots,C_{r-1}),}                          \tag{4.6xh}
  \]

  so the bottom quotient, the full carry, and every cyclic rotation have
  exactly the same reduced denominator.  If
  \(d=\gcd(N,r)\), \(N=dN_0\), and \(r=dr_0\), grouping the carry into
  \(d\) mechanical blocks gives an exact projection modulo every
  homogeneous factor
  \(\Phi_m(2^{N_0},3^{r_0})\), \(m\mid d\).

  This factorization does not leave a universal factor available for a
  contradiction.  At \((r,N)=(30,48)\), an exhaustive exact audit of all
  \(131{,}071\) nonempty anchored profiles finds no denominator-one word,
  but every entire cyclotomic factor and every prime-power factor of \(D\)
  divides the carry of some profile.  At most two of the four cyclotomic
  factors vanish simultaneously, and the least reduced denominator is
  \(93{,}209{,}707\).  Thus factorwise nonvanishing cannot be proved by
  selecting one profile-independent prime: the remaining theorem must
  couple all factors for the same profile.  For \(\gcd(N,r)=1\), there is
  no cyclotomic split at all.  The identities and certificate are recorded
  in
  [cycle_one_drop_cyclotomic_gcd_gate.md](cycle_one_drop_cyclotomic_gcd_gate.md).

  We can state the remaining one-drop condition without a subset search.
  Put \(e:=N-r\), and let

  \[
  K:=\left\{\left\lfloor\frac{\ell r}{e}\right\rfloor:
  1\leq\ell<e\right\}.
  \]

  Under denominator one, write \(Q:=(x+1)/2\) and start with
  \(z_{r-1}:=Q\).  Reading \(d=r-1,\ldots,1\), exact integrality forces

  \[
  z_{d-1}:=
  \begin{cases}
  3z_d/2,&z_d\equiv0\pmod2,\\[3pt]
  (3z_d+1)/4,&z_d\equiv1\pmod4\text{ and }d\in K.
  \end{cases}                                          \tag{4.6x}
  \]

  The residue class \(z_d\equiv3\pmod4\) is inadmissible.  If the second
  branch occurs \(V\) times, put \(U:=e-1-V\).  The terminal closure and
  strict least-state condition are

  \[
  3z_0-1=2^{U+1}(2Q-1),
  \qquad z_d>Q\quad(0\leq d<r-1).                       \tag{4.6y}
  \]

  Since \(x=2Q-1\), the separation (4.6u) is exactly

  \[
  \boxed{Q>2^{U-1}.}                                    \tag{4.6z}
  \]

  An exact branch-and-bound certificate proves (4.6z) for every
  \(3\leq r\leq94\), even before imposing (4.6y).  This is a finite theorem
  only.  There is a sharper coefficient target.  Put

  \[
  G_{r,V}:=\frac{3^{r-1}}{2^{r-1+V}},
  \qquad \delta_r:=e-r\log_2(3/2)\in(0,1).
  \]

  Since

  \[
  \frac{G_{r,V}}{2^{U-1}}
  =2^{2-\log_2(3/2)-\delta_r}\in(4/3,8/3),
  \]

  the all-depth inequality

  \[
  \boxed{G_{r,V}<Q}                                     \tag{4.6za}
  \]

  would imply (4.6z) with a uniform margin.  Exact integer branch and bound
  proves (4.6za) for all \(r\leq94\), and separately for
  \(r=95,100,105,110,115\).  These remain finite statements.

  If \(G_t\) denotes the linear coefficient before a second branch, exact
  affine summation and (4.6y) give the coupled closure identity

  \[
  \sum_{\text{second branches }t}\frac1{3G_t}
  =(R_r-1)Q-\frac{R_r}{2}+\frac1{3G_{r,V}},
  \qquad R_r:=\frac{2^N}{3^r}.                           \tag{4.6zb}
  \]

  Positivity in (4.6zb) does not prove (4.6za).  In fact, if (4.6z) failed
  under bottom closure, then \(Q\) would be even and at least two, and

  \[
  z_0\geq\frac{8Q^2-4Q+1}{3}>2Q^2.                     \tag{4.6zc}
  \]

  Thus a sufficient upper-excursion lemma would already be a global
  Collatz-type assertion, not a finite coefficient estimate.  Under
  \(y_d:=2z_d-1\), recursion (4.6x) is exactly accelerated Collatz with
  exponents one and two.  Arbitrary second-branch placement violates
  (4.6za) at \(r=72\); even a cyclic shift of the same Christoffel mask
  violates it at \(r=15\) while retaining strict leastness.  The fixed
  Beatty intercept in \(K\), together with bottom closure, is therefore an
  essential remaining datum.  Likewise, the rational family
  \(a=(1^{r-1},e+1)\) is strictly least at arbitrary depth and lies on the
  wrong side of (4.6z), while its reduced denominator is not one.  Hence a
  proof of (4.6z) cannot use cyclic order, leastness, or a bounded prefix
  invariant alone.

  The anchored clock itself has an exact fixed-phase decomposition.  Put
  \[
  B_t:=\left\lfloor\frac{et}{r}\right\rfloor,\qquad
  A_t:=\lfloor\gamma t\rfloor,\qquad h_t:=B_t-A_t.
  \]
  Then \(h_t\in\{0,1\}\), and for \(1\leq t\leq r\),

  \[
  \boxed{
  (B_t-B_{t-1})=(A_t-A_{t-1})+h_t-h_{t-1}.}            \tag{4.6zba}
  \]

  Moreover,

  \[
  h_t=1
  \quad\Longleftrightarrow\quad
  \frac{\lceil\gamma t\rceil}{t}-\gamma
  \leq\frac{e-\gamma r}{r}.                            \tag{4.6zbb}
  \]

  Thus the moving rational clock is one fixed lower Sturmian clock plus a
  single \(0/1\) surplus token, whose entries are explicit upper
  approximation sites.  If \(q_t\) is the least representative of a
  length-\(t\) cylinder with \(V_t\) second branches, set
  \(G_t:=3^t/2^{t+V_t}\).  Any counterexample to (4.6z) either violates
  \(q_t>G_t\) for a path whose second branches all lie in the fixed lower
  clock, or uses a second branch at a token entry.

  Along a zero-lift ordinary run, if \(L=t+V_t\),
  \(k=v_2(z_t)\), then the exact reserve

  \[
  \mathscr R_t:=q_t2^{L+k}-3^{t+k}                     \tag{4.6zbc}
  \]

  is invariant.  Hence a long ordinary part of the stabilized suffix is
  one case, not a succession of new cases; the unresolved events are
  odd-endpoint resets and surplus-token entries.  Exact enumeration proves
  the fixed lower-clock coefficient inequality through \(t=100\).
  The sole persistent small shadow \(q=14\) is excluded at every anchored
  depth: its required token at time \(8\) forces \(r<25\), and the only
  compatible rows \(r=19,24\) both force the next lift to
  \(14+2^{21}\).  A separate \(r=8,q=24\) example shows that using a token
  and later reaching its deletion does not itself force a lift.  The exact
  decomposition and certificate are recorded in
  [cycle_one_drop_ostrowski_surplus_gate.md](cycle_one_drop_ostrowski_surplus_gate.md).

- [ ] **Square-root phase gate.**  The linear cylinder separation in
  (4.6z) can be weakened substantially.  For a valid partial path of
  length \(t\), put

  \[
  D_t:=\lfloor(t+1)\log_2(3/2)\rfloor-V_t,
  \qquad L_t:=t+V_t.                                  \tag{4.6zbd}
  \]

  At an anchored leaf \(t=r-1\), one has \(D_t=U\).  Therefore the
  all-depth bound

  \[
  \boxed{q_t^2\geq2^{D_t}}                            \tag{4.6zbe}
  \]

  would already exclude the complete one-drop sector.  Indeed, under
  denominator one the least odd cycle state is \(x=2Q-1\), and P7 gives
  \(Q<153r^{14.3}\).  If (4.6zbe) holds at the leaf, then, for
  \(X:=\log_2r\geq36\),

  \[
  U<31X,
  \qquad \log_2(612r^{15})<16X.
  \]

  Taking logarithms in (4.6ua) would then give

  \[
  r<2000X^2.                                           \tag{4.6zbf}
  \]

  This is impossible: \(2^{36}>2000\cdot36^2\), and
  \(2^X/X^2\) is increasing for \(X\geq36\).  The period barrier lies
  above this range.  Thus (4.6zbe), although weaker than (4.6z), is a
  genuine completion gate rather than another bounded-complexity lemma.

  The stronger inequality \(q_t^2\geq2^{D_t+1}\) has an exact
  first-failure reduction.  A first failure can occur only at an
  irrational-clock advance where an ordinary branch is chosen and its
  dyadic lift is zero.  If the new debt is \(D\), the old representative
  lies in the band

  \[
  2^D\leq q_t^2<2^{D+1}.                              \tag{4.6zbg}
  \]

  Along the ensuing zero-lift ordinary run, with
  \(k:=v_2(z_t)\), the square reserve

  \[
  \mathscr S_t
  :=q_t^2 2^{L_t+k}
    -2^{\lfloor(t+k+1)\log_2 3\rfloor}                 \tag{4.6zbh}
  \]

  is invariant.  A failure of the weaker bound (4.6zbe) stabilizes one
  fixed integer on a terminal suffix of length at least

  \[
  r-1-\left\lceil\frac U2\right\rceil
  =\left(1-\frac{\log_2(3/2)}2\right)r-O(1),           \tag{4.6zbi}
  \]

  and a least failure is a strict-minimum excursion.  Exact integer
  searches prove the stronger factor-two inequality for anchored paths
  through \(r=100\), for the lower-Sturmian and no-\(SSS\) classes through
  depth \(100\), and without a word restriction through depth \(60\).
  These ranges are finite only.  The sole all-depth obstruction is the
  odd-endpoint reset following a zero-lift run: it exposes an unbounded
  value of \(v_2(3z+1)\) while \(q_t\) remains fixed.  The theorem,
  certificate, and precise finite scopes are recorded in
  [cycle_one_drop_square_root_phase_gate.md](cycle_one_drop_square_root_phase_gate.md).

  The square scale also admits an exact dual ternary lock.  Put
  \(m:=\lceil U/2\rceil\) and let
  \(\tau:=\min\{s:L_s\geq m\}\).  If \(x:=2q-1\), the terminal suffix
  determines a least residue \(R_\tau\) modulo \(3^{r-\tau}\), and every
  square-low return satisfies

  \[
  \boxed{x=R_\tau,\qquad 3^{r-\tau}>2^{m+1}>x.}       \tag{4.6zbj}
  \]

  Reading backward, each suffix exponent is therefore forced: it is one
  when the current state is \(2\pmod3\), two when it is \(1\pmod3\), and
  the path dies when it is \(0\pmod3\).  The dyadic and ternary
  stabilizations overlap for more than

  \[
  \frac{239}{459}r-\frac52
  \]

  branches.  This long overlap does not supply two independent
  congruences.  If \(s<t\) are two cuts in it and
  \(\Delta_u:=Y_u^- -Y_u^+\) is the middle-state defect, then

  \[
  \boxed{
  \Delta_s=2^{L_t-L_s}j,
  \qquad
  \Delta_t=3^{t-s}j}                                  \tag{4.6zbk}
  \]

  for one integer \(j\).  The condition \(j=0\) is exactly the original
  full return equation.  Thus double stabilization telescopes rather than
  determining a sign or a nonzero divisor.  The frozen certificate checks
  \(87{,}149{,}756\) square-low candidates through \(r=80\) and finds no
  stabilized suffix, but this remains finite evidence.  See
  [cycle_one_drop_square_dual_ternary_gate.md](cycle_one_drop_square_dual_ternary_gate.md).

  Finally, there are infinitely many anchored rational affine models with
  exact bottom closure, strict leastness, \(U,V\to\infty\), bounded initial
  value, and hence failure of (4.6zbe).  Their growing dyadic cylinder
  congruences fail.  Consequently phase, real growth, bottom closure, and
  leastness cannot prove the square bound; integer cylinder arithmetic is
  indispensable.  This no-go is recorded in
  [cycle_one_drop_square_rational_no_go.md](cycle_one_drop_square_rational_no_go.md).

  The integral quotient coordinates do not split this last obstruction.
  In the coprime case, with \(\theta^r=2\) and
  \(\delta:=\theta^N-3\), one has

  \[
  \mathbf Z[\theta]/\delta\mathbf Z[\theta]
  \simeq\mathbf Z/D\mathbf Z,
  \qquad
  \operatorname {SNF}(m_\delta)=\operatorname {diag}(1,\ldots,1,D).
                                                               \tag{4.6zbl}
  \]

  Hence every prime-power integrality condition on the endpoint quotient is
  merely a projection of the original cyclic denominator class.  More
  precisely, the additive order of the endpoint class is the reduced orbit
  denominator \(h=D/\gcd(D,C)\); integrality is equivalent to \(h=1\).
  After an explicit positive diagonal-affine change of variables, the
  quotient-coordinate recurrences are exactly the ordinary state
  recurrences.  Even positivity, integrality after clearing by \(h\), and
  primitive coefficient content do not distinguish \(h=1\).  The exact
  lattice theorem and a primitive strict-least rational square countermodel
  are recorded in
  [cycle_one_drop_square_integral_quotient_no_go.md](cycle_one_drop_square_integral_quotient_no_go.md).

  Nor does an arbitrarily deep odd-endpoint reset separate denominator one.
  There is an infinite fixed-phase family of anchored rational one-drop
  cycles with strict leastness, exact integer numerator recurrences, exact
  bottom closure, \(1<Q<2\), \(Q^2<2^U\), and reset valuation

  \[
  v_2\!\left(\frac{3p+d}{4}\right)
  \geq r-2\lceil2\log_2r\rceil-5.                    \tag{4.6zbm}
  \]

  Here \(d>1\) is the common odd denominator.  A certified row at
  \((r,N,U,V)=(67,107,26,13)\) has reset valuation \(44\) and a positive
  primitive integral cleared quotient.  Thus fixed Beatty phase, local
  reset divisibility, bottom closure, and quotient primitivity can all hold
  on the wrong side of (4.6zbe); only the global normalization \(d=1\)
  remains unavailable to the rational family.  See
  [cycle_one_drop_square_reset_denominator_no_go.md](cycle_one_drop_square_reset_denominator_no_go.md).

  There is an exact phase-debt reduction of the pure cylinder target.  Put
  \(\gamma:=\log_2(3/2)\).  For a valid partial path \(w\) of length \(t\),
  let \(q(w)\) be the least positive integer in its dyadic cylinder.  If
  \(V_t\) is the number of second branches and \(w\) has no factor \(SSS\),
  define

  \[
  D_t:=\lfloor\gamma(t+1)\rfloor-V_t.
  \]

  The anchored Beatty path has no factor \(SSS\), and at its leaf
  \(D_{r-1}=U\).  Hence the broader clock-stopping assertion

  \[
  q(w)+2\geq2^{D_t}                                      \tag{4.6zd}
  \]

  would imply (4.6z), with the cases \(U\leq2\) checked directly from the
  initial branches.  Exact residue-lift induction proves (4.6zd) across
  every second branch, every ordinary branch on a zero clock bit, and every
  nonzero ordinary lift.  A first failure can occur only when the irrational
  clock advances, an ordinary branch is taken, and its dyadic lift is zero.
  If the new clock debt is \(D\), then necessarily

  \[
  2^{D-1}-2\leq q\leq2^D-3,                              \tag{4.6ze}
  \]

  and a least counterexample may be chosen so that every proper state is
  strictly larger than \(q\).  Thus the residual is one strict-minimum
  clock excursion, not several independent residue cases.

  A failure also forces a long stabilized suffix.  Let \(q_s\) be the
  least representative of the prefix of length \(s\), put
  \(L_s:=s+V_s\), and let \(q:=q_n\) for a failing word of length \(n\).
  The exponent bound used above gives \(D_n<L_n\), so we may put

  \[
  \tau:=\min\{s:L_s\geq D_n\},
  \]

  Nested cylinders and \(q+2<2^{D_n}\) give

  \[
  q_s=q\quad(\tau\leq s\leq n),
  \qquad n-\tau\geq n-D_n.                              \tag{4.6zea}
  \]

  where the second inequality follows from \(D_n\leq n\) and
  \(L_s\geq s\).  Thus every lift in this terminal suffix is zero.  At an anchored leaf,
  where \(n=r-1\) and \(D_n=U=e-1-V\), its length is at least
  \(r-e+V\).

  The stabilized suffix also locks the low seed ternarily.  In accelerated
  odd coordinates put \(x:=2q-1\), \(k:=r-\tau\), and let
  \(A_k,C_k\) be the exponent and carry of the suffix together with the
  terminal exponent \(U+2\).  If \(R_\tau\) is the least nonnegative
  solution of

  \[
  2^{A_k}R_\tau\equiv C_k\pmod {3^k},
  \]

  then every low return satisfies

  \[
  \boxed{x=R_\tau,\qquad 3^k>2^U.}                     \tag{4.6zeb}
  \]

  Thus the suffix congruence is equality in the ordinary interval, not
  merely a residue condition.  If \(P_\tau\) is the prefix carry, define

  \[
  Y_+(x):=\frac{3^\tau x+P_\tau}{2^{L_\tau}},
  \qquad
  Y_-(x):=\frac{2^{A_k}x-C_k}{3^k}.                    \tag{4.6zec}
  \]

  Full denominator-one closure is exactly

  \[
  \boxed{Y_+(x)=Y_-(x).}                               \tag{4.6zed}
  \]

  The separation is sharp.  At
  \((r,N,U,V)=(37,59,19,2)\), the anchored suffix at spike times
  \(26,32\) has \(R_\tau=185{,}699<2^{19}\), exact bottom return, and
  strict leastness throughout the full guaranteed suffix.  It fails only
  at the dyadic prefix.  Therefore suffix growth, order, or ternary
  locking alone cannot close the gate; one must exclude the mixed-radix
  collision (4.6zed).  The theorem and countershadow are recorded in
  [cycle_one_drop_dual_ternary_lock.md](cycle_one_drop_dual_ternary_lock.md).

  The exact Beatty clock decomposes, away from its boundary pieces, into
  \(10\) and \(110\) renewals.  Their valid state maps are

  \[
  \begin{array}{c|c|c}
  \text{block word}&\text{input class}&\text{output}\\ \hline
  SO&5\pmod8&(9x+3)/8\\
  OO&0\pmod4&9x/4\\
  SSO&17\pmod{32}&(27x+21)/32\\
  SOO&5\pmod{16}&(27x+9)/16\\
  OSO&14\pmod{16}&(27x+6)/16\\
  OOO&0\pmod8&27x/8.
  \end{array}                                             \tag{4.6zf}
  \]

  These formulas resolve the observed \(q=14\) debt exactly: at the
  anchored depths \(r=19,24\), the next forced branch lifts the cylinder to
  \(14+2^{21}\).  They do not give a finite-state closure.  The four
  omission-bearing survivor classes in (4.6zf) expose fresh higher binary
  digits at every renewal.  Indeed, for any renewal
  \(T(x)=(ax+c)/2^m\), any input \(x\) in its domain, and any
  \(k\geq m\), the inputs \(x\) and \(x+2^k\) have the same domain and
  the same residue modulo \(2^k\), while

  \[
  T(x+2^k)-T(x)=a2^{k-m}\not\equiv0\pmod {2^k}.          \tag{4.6zfa}
  \]

  Thus no fixed window of low endpoint bits propagates the renewal chain.
  Exact certificates verify (4.6zd) through
  \(r=77\) and the six renewal formulas, but no all-depth clock-stopping
  theorem is known.

  Bottom closure gives an exact signed form of the same obstruction.  Let
  \(1\leq t_1<\cdots<t_V\leq r-1\) be the one-based second-branch times and
  put

  \[
  A:=r-1+V=N-U-2,
  \qquad M:=2^A,
  \]

  \[
  J:=\sum_{k=1}^{V}3^{r-1-t_k}2^{t_k+k-2},
  \qquad K:=2^{N-1}-M+3J.                              \tag{4.6zg}
  \]

  Let \(q\) be the least positive integer in the corresponding internal
  dyadic cylinder, and let \(z\) be its endpoint after the \(r-1\)
  internal branches.  With \(D:=2^N-3^r\), define

  \[
  \mathcal E(q):=2^{U+1}(2q-1)-(3z-1).
  \]

  Direct substitution gives

  \[
  \boxed{Dq-K=M\mathcal E(q)},
  \qquad
  \mathcal E(q+jM)=\mathcal E(q)+jD.                  \tag{4.6zh}
  \]

  Thus \(D\mid K\) if and only if \(D\mid\mathcal E(q)\).  More
  specifically, if the fixed point \(Q:=K/D\) is an integer satisfying
  \(Q\leq2^{U-1}<M\), then \(Q\equiv q\pmod M\) forces \(Q=q\).  The low
  denominator-one problem is therefore exactly

  \[
  q\leq2^{U-1},
  \qquad \mathcal E(q)=0.                              \tag{4.6zi}
  \]

  Every solution of (4.6zi) with \(U\geq3\) also satisfies the hypothesis
  of (4.6zea); the smaller values of \(U\) were excluded directly above.
  It therefore has a terminal zero-lift suffix of length at least
  \(r-e+V\), which follows the renewal domains in (4.6zf) after at most two
  boundary branches.  Consequently, the original low denominator-one gate
  is exactly the conjunction of this unbounded renewal chain and the return
  equation \(\mathcal E(q)=0\).  The stabilization does not remove the
  return equation.

  This qualification is essential: a low cylinder representative may
  have an integral fixed point elsewhere in its congruence class.  If

  \[
  q_{\rm ret}:=
  \frac{3z-1+2^{U+1}}{2^{U+2}},
  \]

  then

  \[
  \mathcal E(q)=2^{U+2}(q-q_{\rm ret}).                \tag{4.6zj}
  \]

  Hence a theorem \(\mathcal E(q)>0\) is exactly a canonical return-descent
  theorem, rather than an independent carry estimate.  When \(V=0\),
  equation (4.6zi) forces \(2^{r-1}\mid q\) and contradicts the low bound,
  so the all-ordinary sector is closed.  For \(V\geq1\), the exact endpoint
  valuations are compatible with (4.6zi).  Strict leastness alone does not
  fix the sign: without anchored Beatty eligibility there are strict-least
  integer cylinders with \(\mathcal E(q)<0\).  Conversely, anchored
  rational families with \(V\to\infty\) satisfy the affine maps, exact
  bottom closure, strict leastness, \(q<2^{U-1}\), and zero defect; only the
  integer cylinder congruences fail.  Thus phase products, scalar carry
  bounds, and strict leastness cannot close (4.6zi).  The remaining datum is
  the full growing residue lift.  An exact search through \(r=84\) finds no
  anchored valid low cylinder at all, so the finite sign test in that range
  is vacuous rather than positive evidence for an all-depth theorem.

## 5. Inverse-fiber and first-crossing branches

- [ ] **Stationary inverse-fiber extinction.**  For every odd \(n>1\),
  prove \(M_r(n)<n\) at some depth.  This statement is equivalent to the
  full Collatz conjecture by strong induction.

- [ ] **Nested exposure loss.**  Show that the actual affine line cannot
  remain the positive exposed minimum while the endpoint progression and
  feasible line family both change with \(r\).  Fixed-progression
  concavity does not do this: along an actual orbit the canonical
  progression parameter eventually equals \(0\).

- [x] **Exact nested Bellman decomposition and equivalence barrier.**  If
  \(\Theta_j(n)\) is the least positive ancestor whose last deviation
  from the actual valuation word occurs at position \(j\), then

  \[
  M_R(n)=\min\{n,\Theta_0(n),\ldots,\Theta_{R-1}(n)\},
  \qquad
  M_{R+1}(n)=\min\{M_R(n),\Theta_R(n)\}.                 \tag{5.1a}
  \]

  The proposed lemma that an indefinitely exposed seed must have an
  eventually periodic valuation tail is equivalent to the assertion that
  no accelerated orbit is unbounded.  Indeed, a seed is indefinitely
  exposed exactly when it is the least member of its synchronous-coalescence
  class.  The least member of any divergent class is therefore an exposed
  aperiodic seed.  Exact enumeration gives the finite regression
  \(M_r(837799)=837799\) through \(r=194\), followed by
  \(M_{195}(837799)=1\); the exposed valuation word has least period \(194\)
  and no square suffix.  Thus this route isolates, but does not weaken, the
  no-divergence gate.

- [ ] **First-Crossing Descent.**  For every nonboundary coefficient
  first-crossing shortcut word \(w\), with \(3^{s_j}\geq2^j\) for \(j<k\) and
  \(3^{s_k}<2^k\), prove

  \[
  \rho(w)>Z(w).                                         \tag{5.1}
  \]

  This would exclude every positive cycle at its least state.  Exact scans
  through length \(30\) support (5.1), but adjacent transpositions change
  its wrap-cocycle margin in both directions.

  The present sharp arithmetic form is as follows.  Put
  \(M=2^k\), \(P=3^{s_k}\), \(D=M-P\), let \(C\) be the shortcut carry, and set

  \[
  \tau=[CM^{-1}]_D\in[0,D).
  \]

  If \(d=Z-\rho\), then

  \[
  C=D\rho+Md,
  \qquad -D<d<s_k/3,
  \qquad d\equiv\tau\pmod D.                           \tag{5.2}
  \]

  A certified linear-form estimate, followed by an exact check for
  \(s_k\leq62\), gives \(D>s_k/3\).  Hence
  \(d\in\{\tau-D,\tau\}\) after this additional lemma, and every
  noncanonical lift of the parity cylinder descends automatically.
  Descent is exactly the cumulative-wrap inequality \(C<M\tau\).  In
  particular, the reduced-modulus inequality

  \[
  \tau\geq s_k/3                                        \tag{5.3}
  \]

  implies (5.1).  Equation (5.3), not the size of \(\rho\), is now the
  narrowest First-Crossing gate.  The initially suggested stronger bound
  \(\tau\geq\lceil s_k/2\rceil\) is false: an exact weight-\(29\), length-\(46\)
  first-crossing word has \(\tau=14\).  It remains above the required
  threshold \(29/3\).

  There is also an exact shadow form.  Let \(m_0=M-\rho\), let \(m_k=P-Z\)
  be the endpoint under the same parity word for the shortcut map
  \(m\mapsto(3m-1)/2\), and put \(G=m_0-m_k=D+d\).  If \(A_i\) are the
  positions of the odd shortcut steps and

  \[
  H_i=M-2^{A_i}3^{s_k-i},
  \]

  then

  \[
  M(3G-s_k)=3Dm_0-\sum_{i=0}^{s_k-1}H_i.               \tag{5.4}
  \]

  A violation of (5.3) is confined to one of two polynomial-size
  canonical seeds:

  \[
  \min\{\rho,M-\rho\}<305s_k^{14.3},                   \tag{5.5}
  \]

  with the applicable side selected by the two-lift branch.  This is an
  all-depth reduction, not a finite proof: its ceiling grows with \(s_k\).

  This statement is exactly Terras's coefficient-stopping-time conjecture at
  the first coefficient crossing, in the terminology of
  [Rozier and Terracol](https://arxiv.org/html/2502.00948v5).  The classical
  real-remainder order under adjacent swaps does not control the canonical
  dyadic representative, which is the missing arithmetic here.

  There is an exact dual ternary form.  Put

  \[
  Y=[CM^{-1}]_P\in\{1,\ldots,P-1\}.
  \]

  Then canonical non-descent is equivalent to the closed bi-canonical
  interval

  \[
  \boxed{\frac CM\le Y\le\frac CD}.                   \tag{5.6}
  \]

  Put

  \[
  g:=\gcd(D,C),\qquad D=gq,\qquad C=gp,\qquad \gcd(p,q)=1,
  \qquad
  e:=\frac{p-qY}{P}.
  \]

  Every nonintegral failure has \(q>1\) and an integer
  \(1\le e<q\) with

  \[
  g e<Y<P,
  \qquad(\rho,Z)=(Y-g e,Y).                            \tag{5.7}
  \]

  The integral case \(q=1\) is exactly upper-endpoint equality in (5.6), with
  \(\rho=Z=Y=C/D\).  Thus the dual form separates the interior FCD obstruction
  from the exact cycle-integrality boundary, but does not exclude either.

  Let \(w=u10v\) and \(w'=u01v\) be nonboundary primitive
  first-crossing words with the same \((k,s)\).  Their adjacent
  transposition has an exact paired-wrap cocycle.  Put

  \[
  t:=|u|,\qquad b:=|v|_1,\qquad
  \Delta:=C(w')-C(w)=2^t3^b,
  \]

  and define

  \[
  L=[\Delta P^{-1}]_M,
  \qquad
  V=\frac{DL+\Delta}{M},
  \qquad 1\le V<D.
  \]

  The binary and reduced-modulus representatives wrap with indicators
  \(\chi:={\bf1}_{\rho<L}\) and
  \(\eta:={\bf1}_{\tau+V\ge D}\).  More precisely, put

  \[
  E(w):=\frac{\tau-(Z-\rho)}D\in\{0,1\},
  \]

  where \(E(w)=1\) if and only if \(w\) satisfies FCD.  Then

  \[
  E(w')-E(w)=\chi-\eta.                                \tag{5.8}
  \]

  The front-loaded word \(1^s0^{k-s}\) lies on the FCD branch for every
  nonboundary weight.  Hence a noncircular proof that \(\chi=\eta\) on every
  admissible edge would prove all-weight FCD.  An exact audit of
  \(373{,}278\) admissible edges through shortcut length \(25\) finds no
  mismatch, but this is a finite certificate.  Square-curl identities alone
  admit failure islands; an all-depth proof must use that \(C\) is the actual
  order-ideal carry and must not assume the target margin.

  The anchored order-ideal form makes that remaining structure explicit.
  If \(d_i=A_i-i\), the ballot word is a Ferrers ideal \(I\), and

  \[
  C(I)=3^s-2^s+\sum_{(i,r)\in I}2^{i+r-1}3^{s-1-i}.
  \]

  For a cell \(c\), let \((L_c,V_c)\) be its binary and reduced-modulus wrap
  thresholds.  Every pair is order-coupled:

  \[
  (L_c-L_{c'})(V_c-V_{c'})\ge0.                       \tag{5.9}
  \]

  If an ideal \(I\) is inclusion-minimal on the failure branch, and \(K(I)\)
  is its removable-corner set, then every nonempty \(S\subseteq K(I)\) must
  satisfy the stronger all-subset flux identity

  \[
  \left\lceil\frac{V_S-\tau}{D}\right\rceil
  -\left\lfloor\frac{\rho+L_S}{M}\right\rfloor=1.     \tag{5.10}
  \]

  An exact audit checks (5.9), (5.10), and the paired-wrap identities on
  \(12{,}449\) primitive words, \(48{,}264\) admissible edges, and
  \(233{,}037\) nonempty corner subsets.  This is a genuinely stronger
  necessary condition on a minimal failure, but no all-depth contradiction
  with the anchored sum is known.

  The complete boundary condition is now known to be insufficient by itself.
  At \((s,k)=(8,13)\), the genuine ideal
  \(d=(0,0,1,1,2,2,3,4)\) has four removable corners.  Their actual
  multiplicative weights and consistently ordered \((L,V)\)-thresholds
  admit a virtual carry \(C_*=13085\) for which the top has \(E=0\) and all
  fifteen proper Boolean-cube vertices have \(E=1\).  The genuine anchored
  carry is instead \(C(I)=13349\).  Thus the sole surviving datum is the
  interior offset \(264\).  In fact, for every corner subset \(S\), (5.10)
  is exactly the proper-subideal margin

  \[
  D[\rho+L_S]_M>C(I)-\Delta_S.                        \tag{5.11}
  \]

  Consequently, threshold sorting, complementary subsets, and complete
  boundary flux cannot close FCD.  A proof must couple the noncorner terms
  in the anchored sum to at least one proper-subideal margin.

  Deleting the last Ferrers row gives a second exact reduction.  Put

  \[
  k_s=\lceil s\log_2 3\rceil,
  \qquad q_s=2^{k_s-k_{s-1}}\in\{2,4\},
  \]

  and write \(m=2^{k_{s-1}}\), \(P=3^s\), and \(D=2^{k_s}-P\).  If \(C\) is
  the upper carry, define

  \[
  r_0=[-CP^{-1}]_m,
  \qquad h=\frac{Pr_0+C}{m}.
  \]

  The canonical upper seed and its exact FCD margin are

  \[
  \rho=r_0+\lambda m,
  \qquad \lambda\equiv-hP^{-1}\pmod {q_s},
  \qquad
  D\rho-C=m(q_s r_0-h+\lambda D).                   \tag{5.12}
  \]

  An all-depth determinant bound gives \(D>q_s s/3\), while the ballot
  carry satisfies \(C<sP/3\).  Consequently \(Dm>C\), so every
  \(\lambda\ge1\) descends automatically.  Every possible FCD failure is
  the unique zero lift \(\lambda=0\).

  More precisely, let \((\rho_-,Z_-)\) be the projected row, let
  \(H=[uP^{-1}]_m\) for the inserted last-one monomial \(u\), put
  \(w={\bf1}_{H>\rho_-}\), and set \(V=(DH+u)/m\in(0,D)\).  Then the zero
  lift has the exact score

  \[
  q_s r_0-h=q_s\rho_- -3Z_- -V+wD.                  \tag{5.13}
  \]

  Under an inductive projected-FCD hypothesis, every wrapped \(q_s=4\)
  zero lift is safe.  Independently of that hypothesis, any \(q_s=4\)
  failure satisfies the strict tiny-seed bound \(1\le\rho<s\).  The
  remaining induction branches are the \(q_s=2\) zero lifts and the
  \(q_s=4\) no-wrap inequality \(4\rho_- -3Z_->V\).  Genuine examples show
  that both the seed gap and the integer margin can decrease in these
  branches, so (5.12) is a localization, not yet an induction.

  The fourfold zero lift has a further exact dynamic reduction.  Write its
  canonical start and endpoint as

  \[
  n:=\rho,\qquad Z=n+d,\qquad d\geq0.
  \]

  Every hypothetical \(q_s=4\) failure then satisfies

  \[
  \boxed{
  n+4d<s,\qquad
  \tau=d,\qquad
  C-Pd=D(n+d),
  }
  \qquad
  q_s r_0-h=-4d.                                      \tag{5.13a}
  \]

  Thus \(d=0\) is exactly the cycle-integrality boundary.  If the states
  before the endpoint are pairwise distinct, then the odd branch sources are
  distinct; all except the initial source are nonzero modulo \(3\).  For
  \(n\geq5\), sorting the two admissible odd residue classes modulo \(6\) and
  applying the shortcut product gives

  \[
  \boxed{
  \left(\frac{4(n+d)}{3n}\right)^9
  <\frac{n+3s-7/2}{n-7/2},
  \qquad
  s>\frac{242461}{59049}\left(n-\frac72\right).
  }                                                     \tag{5.13b}
  \]

  The starts \(n=1,3\) are direct descents or the boundary orbit.  If the
  pre-endpoint path is not simple, it already contains a nontrivial positive
  cycle above \(n\).  Finally, the exact extended invocation
  `node .\inverse\fcd_zero_lift_audit.js 4 10000000` certifies the
  \(q_s=4\) FCD branch through weight \(10^7\).  This is a finite theorem
  only; it supplies no all-weight cutoff.

  The twofold zero lift now has an exact branch reduction as well.  Put
  \(M=2m\), \(P=3^s\), \(D=M-P\), and \(R=M/P\).  The terminal inverse
  gives complementary shifts \(H+G=m\), with
  \(H,G\geq2^{s-1}\), and splits the projected seed as

  \[
  \rho_-=n+H\quad(n<G),
  \qquad
  \rho_-=n-G\quad(n>G).                               \tag{5.13c}
  \]

  These are respectively the no-wrap and wrap branches; equality is
  impossible by parity.  All terminal terms cancel exactly:

  \[
  2\rho_- -3Z_- -V+wD=2(n-Z)=-2d.
  \]

  Every hypothetical \(q_s=2\) failure satisfies

  \[
  (R-1)n+Rd<\frac{s}{3},
  \qquad
  n<153s^{14.3},
  \qquad
  \tau=d,
  \qquad
  C-Pd=D(n+d).                                        \tag{5.13d}
  \]

  A wrapped failure would have \(n>G\geq2^{s-1}\), and hence the exact
  necessary condition \(3D2^{s-1}<sP\).  Integer evaluation at every
  \(q_s=2\) weight through \(104\) leaves only \(s=3,5\); direct enumeration
  of their nine primitive words finds five wrapped zero lifts, all strict
  descents.  For \(s\geq105\), the inequality
  \(153s^{14.3}<2^{s-1}\) closes the branch analytically.  Therefore no
  wrapped \(q_s=2\) zero lift can fail FCD, including endpoint equality and
  nonsimple paths.

  The general no-wrap branch remains open.  There
  \(\rho_-=n+H\geq n+2^{s-1}\), and for \(s\geq105\) every possible failure
  has

  \[
  n<153s^{14.3}<2^{s-1}\leq H<\rho_-.
  \]

  The preceding projected row has multiplier four but is already a descent,
  so the fourfold failure theorem does not apply to it.  The remaining
  \(q_s=2\) gate is exactly this no-wrap branch, including \(d=0\) and the
  positive-cycle alternative in a nonsimple segment.

  There is an exact anchored normal form for this residual gate.  If
  \(r=A-(s-1)\), every no-wrap
  non-descent satisfies

  \[
  0\leq d\leq
  \min\left\{\left\lfloor\frac{s-1}{3}\right\rfloor,\,2^r-1\right\},
  \qquad
  C\equiv Pd\pmod D,
  \qquad
  Md+D\leq C\leq Md+D(G-1).                           \tag{5.13e}
  \]

  Conversely, for a valid \(q_s=2\) row these conditions recover
  \(n=(C-Md)/D\in[1,G-1]\), \(Z=n+d\), and the zero-lift no-wrap
  non-descent.  This restricts each terminal exponent to finitely many
  target strips but does not make the anchored ideals finite as \(s\)
  varies.  Writing \(b=k_{s-1}-A\) and
  \(t=[P^{-1}]_{2^b}\), the next-row lift digit is exactly

  \[
  \lambda_-=
  \begin{cases}
  2+\lfloor2n/2^A\rfloor,&b=1,\\
  t,&b=2,\\
  \lfloor t/2^{b-2}\rfloor,&b\geq3.
  \end{cases}                                         \tag{5.13f}
  \]

  Eight fixed valid descent witnesses realize every pair of next-row lift
  digit and wrap bit.  They show that the universal row hypotheses do not
  force a second-row branch; they do not exhibit an FCD failure or a cycle.

  The equality subcase is exactly, not merely analogous to, a primitive
  positive cycle: every proper prefix state is strictly larger than \(n\),
  while the endpoint is \(n\).  It has a sparse anchored parametrization.
  Put \(e=k_s-s\), so \(1\leq r\leq e-1\), and let \(j_\ell\) be the first
  rank at which the position delay reaches \(\ell\).  The prefix barriers
  are exactly

  \[
  h_\ell\leq j_\ell\leq s-1,
  \qquad
  j_1\leq\cdots\leq j_r,
  \qquad
  h_\ell:=\min\{i\geq1:\lfloor i\log_2 3\rfloor-i\geq\ell\}.
  \]

  For these cut indices the carry is

  \[
  C=P-2^s+
  \sum_{\ell=1}^{r}
  2^{j_\ell+\ell-1}
  \left(3^{s-j_\ell}-2^{s-j_\ell}\right).             \tag{5.13g}
  \]

  The remaining equality gate is precisely

  \[
  D\mid C,
  \qquad
  1\leq\frac{C}{D}<
  2^{s-1+r}\left(
  2^{e-r}-[P^{-1}]_{2^{e-r}}
  \right).                                             \tag{5.13h}
  \]

  When \(r=1\), this is already the sparse three-term divisibility
  \(D\mid P+2^j3^{s-j}-2^{s+1}\), with \(j\geq2\).  No all-depth exclusion
  of this equality divisibility is known outside the maximal profile.

  We now have two all-depth restrictions on this residual gate.  First, the
  exact delay-level carry and the prefix barriers give

  \[
  d\leq\left\lceil\frac r2\right\rceil,
  \qquad
  d\geq1\Longrightarrow r\geq4.                       \tag{5.13i}
  \]

  Indeed, complementary sparse remainders exclude \(r=1,2,3\) at every
  depth.  For every fixed \(r\), the same cut-remainder construction reduces
  the strict branch to an effective finite computation.  The reduction is
  not uniform in \(r\).  More precisely, every surviving strict failure
  satisfies

  \[
  r>
  \log_{\log_2 3}
  \left(
  \frac{s(\log_2 3-1)}
  {16\log_2s+\log_2(2\log_2s+1)+11}
  \right)-1,
                                                               \tag{5.13j}
  \]

  and hence
  \(r\geq1.505\ldots\log_2s-O(\log\log s)\).  Thus a strict survivor must
  escape every bounded terminal-delay class.

  Second, the maximal \(b=1\) profile is excluded.  Put
  \(\alpha:=\log_2 3\), \(A_i:=\lfloor i\alpha\rfloor\),
  \(M:=2^{\lceil s\alpha\rceil}\), \(P:=3^s\), and let \(C_s\) be its
  carry.  If \(q_s=2\), then there are no positive odd \(n\) and integers
  \(d\) with

  \[
  0\leq d\leq
  \left\lceil\frac{\lceil s\alpha\rceil-s-1}{2}\right\rceil,
  \qquad
  Pn+C_s=M(n+d).                                      \tag{5.13k}
  \]

  The lower mechanical valuation tail begins at the fixed state
  \(x_1=(3n+1)/2\).  Every sufficiently long characteristic prefix begins
  with a standard-word power occupying more than one quarter of the
  prefix.  The block-power divisibility theorem and the Christoffel
  integrality theorem then give

  \[
  \left(\frac43\right)^{(s-2)/8}<3n+2<461s^{15},
  \]

  which is impossible for \(s\geq5001\); an exact residue certificate
  excludes the remaining \(s\leq5000\), including \(d=0\).

  This fixed-start argument also constrains every general \(b=1\) profile.
  Define \(h_i:=\lfloor i\alpha\rfloor-A_i\geq0\), and let \(J\) be the
  first index for which \(h_J>0\).  Every survivor satisfies

  \[
  J<8\log_{4/3}(461s^{15})+2.                         \tag{5.13l}
  \]

  The first nonmaximal sector is also excluded.  At terminal complement
  \(b=1\), put \(B_i:=\lfloor i\alpha\rfloor\) and
  \(h_i:=B_i-A_i\).  The first defect is necessarily a single left
  transposition:

  \[
  h_J=1,\qquad B_J-B_{J-1}=2.
  \]

  If this is the only defect, then

  \[
  A_J=B_J-1,\qquad A_i=B_i\ (i\neq J),\qquad
  C(A)=C_0-2^{B_J-1}3^{s-1-J}.                        \tag{5.13m}
  \]

  No positive odd \(n\) and no
  \(0\leq d\leq\lceil(\lceil s\alpha\rceil-s-1)/2\rceil\) satisfy

  \[
  3^sn+C(A)=2^{\lceil s\alpha\rceil}(n+d).             \tag{5.13n}
  \]

  Indeed, the defect leaves an undamaged Sturmian valuation tail of length
  \(s-J-2\).  Put \(L:=\lfloor(s-J-4)/2\rfloor\).  Sturmian factor
  complexity produces two equal length-\(L\) factors.
  Coincident starting states would give a square cycle word, which is a
  Christoffel power and hence only the trivial fixed point; distinct states
  lie in one dyadic return lattice and force

  \[
  2^{L+1}<307s^{15}.
  \]

  Combining this with (5.13l) contradicts

  \[
  2^s<96\cdot307^2\cdot461^{24}s^{390}
  \]

  for \(s\geq5032\).  An exact certificate checks all
  \(3{,}070{,}699\) eligible singleton profiles below this cutoff and finds
  neither a strict nor an equality target.

  The exactly-two-defect sector is likewise empty.  Let
  \(\mathcal D(A):=\{i:h_i>0\}\) and put \(H_s:=307s^{15}\).  Every
  undamaged mechanical interval of \(m\) exponent edges satisfies

  \[
  2^{\lfloor m/2\rfloor}<H_s.                        \tag{5.13o}
  \]

  Indeed, Sturmian factor collision again gives either two distinct states
  in one dyadic cylinder or a square cycle word; the latter is a
  Christoffel power and hence trivial.  Two defect positions damage at most
  four of the \(s-1\) proper edges.  The remaining edges form at most three
  mechanical intervals with total length at least \(s-5\).  Consequently

  \[
  2^s<256\,H_s^6=256\cdot307^6s^{90}.                \tag{5.13p}
  \]

  The last inequality fails for every \(s\geq948\).  An exact exhaustive
  residue certificate covers the remaining \(393\) admissible \(q_s=2\)
  weights and all \(20{,}063{,}657\) anchored two-defect profiles, including
  adjacent height-two defects and \(d=0\), and finds no strict or equality
  target.

  More generally, if a survivor has \(r_d:=|\mathcal D(A)|\) defect
  positions, then

  \[
  2^{s-3r_d-2}<H_s^{2r_d+2}.                         \tag{5.13q}
  \]

  Hence \(r_d=\Omega(s/\log s)\).  If \(J\) and \(K\) are the first and
  last defects, respectively, then both boundary tails are logarithmic:

  \[
  J<2\log_2H_s+2,
  \qquad
  s-K<2\log_2H_s+3.                                 \tag{5.13r}
  \]

  Therefore a surviving profile must depart from the maximal barrier within
  \(O(\log s)\) odd steps, return to it only within \(O(\log s)\) odd steps
  of the endpoint, contain a growing interior defect core, and accumulate an
  unbounded terminal delay.  For an arbitrary later tail the exact
  perturbation is

  \[
  C(A)=C_0-E_J-R_J,\qquad
  R_J:=\sum_{i>J}(2^{B_i}-2^{A_i})3^{s-1-i}>0.
  \]

  After the two-defect exclusion, the unresolved sector is the interior
  residual

  \[
  U_{J,K}:=
  \sum_{\substack{J<i<K\\h_i>0}}\Delta_i(h_i)>0.      \tag{5.13s}
  \]

  Raw support is not the correct complexity by itself.  The exact
  twelve-cell rotation bound gives

  \[
  \frac{C_0}{3^s}<\frac{s}{4}+\frac{11}{12},
  \qquad
  \frac{C_0-C(A)}{3^s}>\frac{r_d}{12},
  \qquad
  d<\frac{3s+11-r_d}{12}.                            \tag{5.13t}
  \]

  There are profiles with \(r_d=s-3\) for which the carry remains positive
  of order \(s\), so no scalar support estimate can finish the argument.
  Instead define the height-transition count

  \[
  T:=\#\{0\leq i\leq s-2:h_{i+1}\neq h_i\}.           \tag{5.13u}
  \]

  On a constant-height run of level \(\lambda\) and internal edge length
  \(m\), the exact mechanical-factor argument strengthens (5.13o) to

  \[
  2^{\lfloor m/2\rfloor}<2^\lambda H_s.              \tag{5.13v}
  \]

  Strict anchoring permits each upward height transition to increase the
  level by at most one.  Since the height begins and ends at zero, multiplying
  (5.13v) over the \(T+1\) constant-height runs yields

  \[
  \boxed{
  2^{s-2T-2}<2^{T(T-1)}H_s^{2T+2}.}                  \tag{5.13w}
  \]

  Thus every survivor has the explicit lower bound

  \[
  T>
  \frac{-(2\log_2H_s+1)+
  \sqrt{(2\log_2H_s+1)^2+4(s-2\log_2H_s-2)}}{2},    \tag{5.13x}
  \]

  whenever \(s>2\log_2H_s+2\); in particular
  \(T=\Omega(\sqrt{s})\).

  The complete \(T=2\) sector is exactly one height-one plateau, of arbitrary
  support length.  For this sector (5.13w) sharpens to

  \[
  2^s<256H_s^6=256\cdot307^6s^{90}.                  \tag{5.13y}
  \]

  The reverse inequality holds from \(s=948\) onward.  An exact exhaustive
  residue certificate checks all \(34{,}283{,}711\) anchored one-plateau
  profiles below the cutoff, including \(8{,}547{,}821\) profiles whose
  support is at least half the weight, and finds no strict or equality
  target.

  The complete \(T=3\) sector is also empty.  Anchoring forces its unique
  run-level sequence to be

  \[
  0,1,2,0.                                            \tag{5.13z}
  \]

  More explicitly, there are unique \(2\leq J<L\leq K\leq s-2\) such that
  the height is one on \([J,L)\), two on \([L,K]\), and zero elsewhere;
  both rises occur across a mechanical gap of two.  The exact carry is

  \[
  C=C_0-
  \sum_{i=J}^{K}2^{B_i-1}3^{s-1-i}
  -\sum_{i=L}^{K}2^{B_i-2}3^{s-1-i}.                 \tag{5.13aa}
  \]

  Applying (5.13v) to the four levels in (5.13z) gives

  \[
  2^s<2^{14}H_s^8=2^{14}\cdot307^8s^{120}.           \tag{5.13ab}
  \]

  The reverse inequality holds from \(s=1325\) onward.  Below that cutoff,
  an exact circular-residue certificate represents all
  \(18{,}033{,}915{,}158\) anchored profiles by \(8{,}300{,}712\) exact
  BigInt queries after the four proved return bounds are imposed.  It finds
  no strict or equality target.

  The complete \(T=4\) sector is empty as well.  The one-sided unit-rise
  rule and the return to height zero leave exactly three run-level shapes:

  \[
  0,1,0,1,0,
  \qquad
  0,1,2,1,0,
  \qquad
  0,1,2,3,0.                                         \tag{5.13ac}
  \]

  If \(\Lambda\) is the sum of the five run levels, the five mechanical
  return bounds imply

  \[
  2^s<2^{10+2\Lambda}307^{10}s^{150},
  \qquad
  \Lambda\in\{2,4,6\}.                                \tag{5.13ad}
  \]

  Exact integer reversal starts at \(s=1708,1712,1717\), respectively.
  Below those cutoffs, a meet-in-the-middle circular-residue certificate
  covers all \(44{,}466{,}513{,}075{,}781\) classified profiles.  After
  the five return inequalities, \(1{,}141{,}762{,}760{,}310\) profiles
  remain in its compressed ledgers; none yields a strict or equality
  residue.  An independent audit re-derived the three shapes, all endpoint
  cases, the exact cutoffs, and every compressed count.

  Consequently the surviving obstruction is not a finite list of local
  defects: it has logarithmic mechanical boundary tails, support
  \(\Omega(s/\log s)\), at least five height transitions, and
  asymptotically unbounded transition complexity satisfying (5.13x).
  Every fixed value of \(T\) is effectively decidable by the same
  analytic-cutoff plus finite-residue architecture, but its dimension grows
  with \(T\); this is not a uniform finite reduction.

  In the binary-height subbranch \(h_i\in\{0,1\}\), every target either
  already contains a nontrivial positive cycle, or its proper states are
  distinct.  In the latter case finite-prefix entropy gives, for
  \(s\geq2^{42}\),

  \[
  \boxed{T>\frac{s}{386}.}                            \tag{5.13ae}
  \]

  Binary alternation and the forced mechanical gap at every entry into
  height one also give the strict carry loss

  \[
  \boxed{
  \frac{C_0-C}{3^s}>\frac{k}{12}+\frac{T}{72}
  \geq\frac{T}{18}.}                                 \tag{5.13af}
  \]

  These two linear estimates still do not decide the target residue.
  Isolated height-one spikes on a positive-density set of admissible entry
  vertices satisfy both estimates while retaining carry of order \(s\).
  At \(s=150\), one such profile has \(T=86\) and
  \(\gcd(D,C)=5\), exhibiting exact proper-factor cancellation.

  Transition density also does not create a dense removable boundary.
  If \(d_i=A_i-i\), \(m_i=\lfloor i\alpha\rfloor-i\), and
  \(h_i=m_i-d_i\), then

  \[
  d_i-d_{i-1}
  =(m_i-m_{i-1})-(h_i-h_{i-1}).                       \tag{5.13ag}
  \]

  Thus an upward height transition creates no Ferrers corner, while one
  terminal downward jump may discharge all previous rises.  The sharp
  ramp-plus-one-drop profile has \(T=\Theta(s)\) but exactly one removable
  corner, so the complete corner-flux condition cannot be fed by \(T\)
  alone.

  That formal obstruction family itself is nevertheless FCD at every
  depth.  At a \(q_s=2\) weight put \(e=N-s\) and take

  \[
  a=(1^{s-2},e,2).
  \]

  If

  \[
  u=[(6-2^e)P^{-1}]_{2^{e+2}},
  \qquad \rho=2^{s-2}u-1,
  \]

  then its canonical endpoint is

  \[
  Z=\frac{3^su+2^e-6}{2^{e+2}},
  \qquad
  2^{e+2}(\rho-Z)=Du-(5\cdot2^e-6).                  \tag{5.13ah}
  \]

  The determinant inequality \(D>5\cdot2^e-6\) is exact through
  \(s=127\) and follows for the tail from the audited logarithmic-form
  bound.  The two earlier weights \(s=3,5\) descend directly.  Hence this
  entire linear-transition, one-corner family is closed, although the
  general \(T\geq5\) binary core remains open.

  In fact this family is the complete one-corner sector.  Put
  \(k_i=\lceil i\log_2 3\rceil\), \(d_i=A_i-i\), and
  \(m_i=\lfloor i\log_2 3\rfloor-i\).  At a \(q_s=2\) weight,
  \(k_s-k_{s-1}=1\).  Since \(2\log_2 3>3\), the preceding ceiling
  increment cannot also be one, and hence

  \[
  k_{s-1}-k_{s-2}=2,
  \qquad
  m_{s-2}=e-2<m_{s-1}=e-1.                           \tag{5.13ai}
  \]

  A removable Ferrers corner is exactly a strict increase of the
  nondecreasing delay path \(d_i\).  If there is only one, that path must
  jump directly from \(0\) to \(e-1\).  Equation (5.13ai) forces the jump
  to occur at the final vertex.  Thus

  \[
  |K(I)|=1
  \quad\Longrightarrow\quad
  A_i=i\ (i\leq s-2),\quad A_{s-1}=N-2,               \tag{5.13aj}
  \]

  which is precisely the ramp word in (5.13ah).  Its all-depth descent
  therefore proves

  \[
  \boxed{\text{every hypothetical \(q_s=2,b=1\) target has }
  |K(I)|\geq2.}                                      \tag{5.13ak}
  \]

  This does not yet close the corner-flux gate.  It removes the exact
  one-corner obstruction, but the anchored interior carry may still
  realize the punctured-cube pattern on two or more corners.  See
  [q2_one_corner_complete.md](q2_one_corner_complete.md).

  The complete two-corner sector is also closed.  Since the terminal delay
  \(e-1\) is unavailable before \(s-1\), a delay path with exactly two
  strict increases has the necessary and sufficient form

  \[
  d_i=
  \begin{cases}
  0,&i<J,\\
  a,&J\leq i\leq s-2,\\
  e-1,&i=s-1,
  \end{cases}
  \qquad
  1\leq J\leq s-2,\quad1\leq a\leq m_J.              \tag{5.13al}
  \]

  Its exponent word and carry are

  \[
  (1^{J-1},a+1,1^{s-J-2},e-a,2),
  \]

  \[
  C(J,a)
  =P+(2^a-1)2^J3^{s-J}-3\cdot2^{s+a-1}+\frac M4.     \tag{5.13am}
  \]

  If this profile were a strict or equality target with start \(n\), the
  first exponent-one run would give \(2^J\mid n+1\), while the middle run
  at state \(x_J\) would give \(2^{s-J-1}\mid x_J+1\).  Using
  \(n<153s^{14.3}\), \(x_J<2^{m_J-a}H_s\), and
  \(m_J\leq J-1\), these divisibilities imply

  \[
  2^J<154s^{15},
  \qquad
  2^{s-2J}\leq307s^{15},
  \]

  and hence

  \[
  \boxed{2^s<7{,}280{,}812s^{45}.}                   \tag{5.13an}
  \]

  The reverse inequality begins at \(s=415\) and propagates.  Exact
  enumeration of all \(2{,}816{,}721\) two-corner profiles at the
  \(171\) \(q_s=2\) weights through \(414\) finds no strict residue,
  equality residue, FCD failure, or failure of \(3\tau\geq s\).  Therefore

  \[
  \boxed{\text{every hypothetical \(q_s=2,b=1\) target has }
  |K(I)|\geq3.}                                      \tag{5.13ao}
  \]

  See [q2_two_corner_complete.md](q2_two_corner_complete.md).  At this
  stage the next finite sector begins at three corners.  It is closed by
  the post-master result recorded below.

  More generally, the target itself forces logarithmic corner growth.  Let
  \(J_1<\cdots<J_c=s-1\) be its delay-jump rows and put
  \(Y_\ell=2^{J_\ell}\).  The first exponent-one cylinder and the seed
  estimate give

  \[
  Y_1<154s^{15}.                                      \tag{5.13ap}
  \]

  Between successive corners the delay is constant, so all intervening
  exponents are one.  Exact cylinder divisibility and the state envelope
  give

  \[
  2^{J_{\ell+1}-J_\ell}\mid x_{J_\ell}+1,
  \qquad
  x_{J_\ell}+1\leq2^{J_\ell-1}H_s,
  \]

  and hence

  \[
  Y_{\ell+1}\leq\frac{H_s}{2}Y_\ell^2.                \tag{5.13aq}
  \]

  Iterating to \(Y_c=2^{s-1}\) proves

  \[
  \boxed{
  2^{|K(I)|}>
  \frac{s-1}{\log_2(307s^{15})}.}                    \tag{5.13ar}
  \]

  Thus every unbounded sequence of \(q_s=2,b=1\) targets has
  \(|K(I)|\geq\log_2s-\log_2\log s-O(1)\), and its flux cube has more
  than \((s-1)/\log_2(307s^{15})\) distinct dyadic subset sums.  This is
  target-sensitive: the formal ramp has linearly many height transitions
  and one corner, but it is not a target.  The remaining issue is that
  descent to an inclusion-minimal failing subideal need not preserve the
  terminal row or this corner bound.  See
  [q2_corner_growth.md](q2_corner_growth.md).

  The minimalization loss can be repaired by minimizing only among
  failures with the terminal row \(d_{s-1}=e-1\) fixed.  Every such ideal
  has the terminal corner \(c_*=(s-1,e-1)\).  Put
  \(K^\circ(I)=K(I)\setminus\{c_*\}\).  Removing a subset of
  \(K^\circ(I)\) preserves the terminal row, so fixed-terminal minimality
  and the exact flux update give, for every nonempty
  \(S\subseteq K^\circ(I)\),

  \[
  \boxed{
  \left\lceil\frac{V_S-\tau}{D}\right\rceil
  -\left\lfloor\frac{\rho+L_S}{M}\right\rfloor=1.}    \tag{5.13as}
  \]

  Equation (5.13ar) applies to this minimal failure itself.  Therefore

  \[
  \boxed{
  2^{|K^\circ(I)|}>
  \frac{s-1}{2\log_2(307s^{15})}.}                   \tag{5.13at}
  \]

  All these dyadic subset sums are distinct modulo \(M\).  Thus the
  remaining obstruction is a growing terminal-preserving flux cube, not a
  loss of \(b=1\) under global minimalization.  Distinctness alone is still
  too weak against the exponential modulus; the missing input is anchored
  noncancellation among the interior cells.  See
  [q2_terminal_preserving_flux.md](q2_terminal_preserving_flux.md).

  The complete three-corner sector is also closed.  Its delay path has the
  necessary and sufficient normal form

  \[
  d_i=
  \begin{cases}
  0,&i<J,\\
  a,&J\leq i<K,\\
  b,&K\leq i\leq s-2,\\
  e-1,&i=s-1,
  \end{cases}
  \quad
  1\leq J<K\leq s-2,
  \quad1\leq a<b,
  \quad a\leq m_J,
  \quad b\leq m_K.                                  \tag{5.13au}
  \]

  Put \(X_i=2^i3^{s-i}\).  The exact carry is

  \[
  C(J,a,K,b)
  =P+(2^a-1)X_J+(2^b-2^a)X_K
   -3\cdot2^{s+b-1}+\frac M4.                       \tag{5.13av}
  \]

  The three exponent-one cylinders force

  \[
  2^J<154s^{15},
  \qquad
  2^{K-J}\leq2^{m_J-a}H_s,
  \qquad
  2^{s-1-K}\leq2^{m_K-b}H_s.
  \]

  Since \(m_i\leq i-1\), every target in this sector satisfies

  \[
  \boxed{
  2^s<4{,}068{,}534{,}644{,}364{,}652s^{105}.}       \tag{5.13aw}
  \]

  The reverse inequality begins at \(s=1115\) and propagates.  Below that
  cutoff there are \(4{,}021{,}454{,}334{,}444\) classified profiles, of
  which \(4{,}749{,}737{,}770\) survive all three necessary cylinder
  bounds.  For fixed \(a\), the target residue splits into a left half
  \((J,a)\) and a right half \((K,b)\).  An exact dyadic-bucket certificate
  makes \(1{,}527{,}065\) circular interval queries against
  \(120{,}702{,}889\) right-half records.  No queried bucket intersects
  the strict or equality target interval.  Consequently,

  \[
  \boxed{\text{every hypothetical \(q_s=2,b=1\) target has }
  |K(I)|\geq4.}                                      \tag{5.13ax}
  \]

  The finite computation is audited by direct classification, carry,
  residue-split, count, and circular-query regressions.  See
  [q2_three_corner_complete.md](q2_three_corner_complete.md) and
  [inverse/q2_three_corner_certificate.js](inverse/q2_three_corner_certificate.js).
  The unbounded residual remains the anchored noncancellation problem on
  the growing terminal-preserving cube from (5.13as)-(5.13at).

  The complete four-corner sector is now closed as well.  Its delay path
  has the necessary and sufficient normal form

  \[
  d_i=
  \begin{cases}
  0,&i<J,\\
  a,&J\leq i<K,\\
  b,&K\leq i<L,\\
  c,&L\leq i\leq s-2,\\
  e-1,&i=s-1,
  \end{cases}
  \quad
  1\leq J<K<L\leq s-2,
  \quad1\leq a<b<c,                                 \tag{5.13ay}
  \]

  with \(a\leq m_J\), \(b\leq m_K\), and \(c\leq m_L\).  Its exact
  carry is

  \[
  \boxed{
  C=P+(2^a-1)X_J+(2^b-2^a)X_K+(2^c-2^b)X_L
  -3\cdot2^{s+c-1}+\frac M4.}                       \tag{5.13az}
  \]

  The four exponent-one cylinders give

  \[
  2^J<154s^{15},\quad
  2^{K-J}\leq2^{m_J-a}H_s,\quad
  2^{L-K}\leq2^{m_K-b}H_s,\quad
  2^{s-1-L}\leq2^{m_L-c}H_s.                       \tag{5.13ba}
  \]

  Iterating the weak recurrence
  \(2^{J_{t+1}}\leq(H_s/2)(2^{J_t})^2\) proves

  \[
  \boxed{
  2^s<\frac{307^7 154^8}{64}s^{225}.}               \tag{5.13bb}
  \]

  The reverse begins at \(s=2672\) and propagates.  Below the cutoff, the
  integer seed bound is

  \[
  n<B_s:=\left\lceil(153^{10}s^{143})^{1/10}\right\rceil. \tag{5.13bc}
  \]

  Monotone dyadic-prefix pruning together with (5.13ba) leaves no
  necessary profile above row \(759\).  Exact reduced-residue checking
  covers the \(q_s=2\) rows through \(73\); exact projected
  terminal-seed meet-in-the-middle checking covers rows \(75\) through
  \(759\), while \(74\) is not a \(q_s=2\) row.  Among
  \(1{,}490{,}054{,}292\) high-row split records and queries, only
  \(582\) projected bucket intersections occur.  Full-modulus refinement
  leaves \(130\) cylinder-compatible seeds, and none lies in the strict
  or equality reduced-displacement interval.  Therefore,

  \[
  \boxed{\text{every hypothetical \(q_s=2,b=1\) target has }
  |K(I)|\geq5.}                                      \tag{5.13bd}
  \]

  The production totals are frozen, the compressed profile count is
  compared with direct enumeration on \(7{,}124{,}419\) small-board
  profiles, and the carry and terminal seed split are independently
  checked cell by cell.  See
  [q2_four_corner_complete.md](q2_four_corner_complete.md),
  [inverse/q2_four_corner_count_probe.js](inverse/q2_four_corner_count_probe.js),
  [inverse/q2_four_corner_low_residue_certificate.js](inverse/q2_four_corner_low_residue_certificate.js),
  and
  [inverse/q2_four_corner_terminal_seed_driver.js](inverse/q2_four_corner_terminal_seed_driver.js).
  The residual FCD gate is still anchored interior-carry noncancellation
  on the five-or-more-corner sector.

  The corner-growth estimate can be sharpened by retaining the actual
  Ferrers height. Put

  \[
  \alpha:=\log_2 3,
  \qquad
  \beta:=\alpha-1,
  \qquad
  R_s:=\log_2(307s^{15}).
  \]

  If \(g_\ell:=J_{\ell+1}-J_\ell\) and
  \(h_\ell:=m_{J_\ell}-d_{J_\ell}\), exact exponent-one cylinder
  divisibility gives

  \[
  g_\ell\leq h_\ell+R_s.                              \tag{5.13be}
  \]

  Since the delay increases at \(J_{\ell+1}\), the mechanical height
  increment gives

  \[
  h_{\ell+1}+R_s<\alpha(h_\ell+R_s).                  \tag{5.13bf}
  \]

  Therefore, if

  \[
  X_s:=
  \frac{s-1+R_s/\beta}
  {\log_2(154s^{15})+R_s/\beta},
  \]

  every target with \(c\) corners satisfies

  \[
  \boxed{
  \alpha^{c-1}>X_s,
  \qquad
  2^{c-1}>X_s^{\log_\alpha2}.}                       \tag{5.13bg}
  \]

  Here

  \[
  \log_\alpha2=1.5050070664\ldots>\frac32.
  \]

  The last strict inequality follows exactly from
  \(3^{200}<2^{317}\) and \(317^3<4\cdot200^3\). Applying (5.13bg) to
  the fixed-terminal minimal failure gives more than
  \((s/O(\log s))^{1.505007\ldots}\) vertices in its nonterminal flux
  cube. See
  [q2_sharp_corner_growth.md](q2_sharp_corner_growth.md).

  The separate fixed-corner certificates admit one uniform packet
  formulation. If a profile has \(c\geq2\) corners, let
  \((J_\ell,a_\ell)\), \(1\leq\ell<c\), be its nonterminal delay-jump
  rows and levels, and put \(a_0:=0\). Then

  \[
  \boxed{
  C=P+\sum_{\ell=1}^{c-1}
  (2^{a_\ell}-2^{a_{\ell-1}})2^{J_\ell}3^{s-J_\ell}
  -3\cdot2^{s+a_{c-1}-1}+\frac M4.}                 \tag{5.13bh}
  \]

  Put \(q:=2^{c-1}\). Iterating the exponent-one cylinder inequalities
  gives the general fixed-parameter bound

  \[
  \boxed{
  2^{s+q-2}<307^{q-1}154^q s^{15(2q-1)}.}            \tag{5.13bi}
  \]

  Thus every fixed \(c\)-corner sector is an effective finite check. The
  first propagating cutoffs for \(c=2,3,4,5\) are respectively
  \(415,1115,2672,6071\). In particular, the complete five-corner sector
  is finite below \(s=6071\), although that finite enumeration has not
  been carried out.

  A terminal-exactness audit retracts the subsequent unconditional parity
  compression. At \(s=8\), the anchored profile

  \[
  d=(0,0,0,0,0,0,2,4)
  \]

  has the odd canonical segment \(3903\mapsto3127\). Deleting the
  nonterminal corner \((6,2)\) gives \(191\mapsto154\). Both profiles have
  FCD color one, but the child endpoint is even. Therefore terminal-row
  preservation does not preserve exactness of the final valuation.

  The missing bit has a canonical lift. Define

  \[
  \widehat\rho:=[-CP^{-1}]_{2M},
  \qquad
  \xi:=\frac{\widehat\rho-\rho}{M}\in\{0,1\}.
  \]

  If \(Z=(P\rho+C)/M\), then

  \[
  \boxed{\xi\equiv Z\pmod2.}                         \tag{5.13bj}
  \]

  For a nonterminal cell, let

  \[
  \widehat L_c:=[\Delta_cP^{-1}]_{2M}.
  \]

  Since \(L_c\) is even and \(MV_c=DL_c+\Delta_c\),

  \[
  \boxed{
  \widehat L_c=L_c+(V_c\bmod2)M,
  \qquad
  \widehat\rho(I\setminus\{c\})
  =[\widehat\rho(I)+\widehat L_c]_{2M}.}             \tag{5.13bk}
  \]

  For a removable subset \(S\), put

  \[
  a_S:=\left\lfloor\frac{\rho+L_S}{M}\right\rfloor.
  \]

  The exactness bit satisfies

  \[
  \boxed{
  \xi(I\setminus S)\equiv\xi(I)+V_S+a_S\pmod2.}     \tag{5.13bl}
  \]

  Consequently, when the top endpoint is odd, the old congruence
  \(V_S\equiv a_S\pmod2\) is the criterion selecting those subideals whose
  endpoint remains odd. It is not an identity on the complete cube.
  Therefore the claims that every corner \(V_c\) is even, that all dyadic
  subset wraps vanish, and that the complete lattice has fixed centered
  cell weights are unavailable. The centered-filter dynamic program is a
  valid conditional model only.

  The corrected object is the exactness-lifted packet container

  \[
  \mathcal C(I):=
  (s;(J_\ell,a_\ell)_{\ell<c};C,\rho,\widehat\rho,\tau,E).
  \]

  It contains every previously closed finite-corner shape and retains the
  bit lost under canonical projection. Put \(J_c:=s-1\). Flattening the
  consecutive plateaux from \(J_p\) through \(J_{q+1}-1\) to level
  \(a_{p-1}\) removes the exact carry

  \[
  \boxed{
  \Delta_{p,q}=\sum_{\ell=p}^{q}
  (2^{a_\ell}-2^{a_{p-1}})
  (X_{J_\ell}-X_{J_{\ell+1}}).}                    \tag{5.13bm}
  \]

  This interval contraction preserves the terminal row and removes at
  least one corner. The remaining uniform target is an anchored lifted
  interval-contraction theorem which lowers the corner count while
  preserving both \(E=0\) and \(\xi=1\). Exactness alone is insufficient:
  through
  \(s=20\), exact enumeration finds \(21{,}839\) odd-endpoint profiles with
  at least five corners and no exact nonterminal packet deletion. The first
  such profile is descending, so it does not refute the color-sensitive
  target. Allowing consecutive blocks still leaves \(43\) parity-isolated
  profiles through \(s=20\). Moreover, a translated \(s=8\) virtual lattice
  has an odd top endpoint and all \(29\) proper subideals descending for
  seven different absolute carries, none anchored. Thus exactness and the
  relative lattice do not replace the absolute front term. The
  anchored lifted interval-contraction theorem is not proved. See
  [q2_exactness_lifted_packet_container.md](q2_exactness_lifted_packet_container.md),
  [inverse/q2_lifted_packet_contraction_probe.js](inverse/q2_lifted_packet_contraction_probe.js),
  [inverse/q2_lifted_block_contraction_probe.js](inverse/q2_lifted_block_contraction_probe.js),
  [inverse/q2_lifted_full_lattice_virtual_probe.js](inverse/q2_lifted_full_lattice_virtual_probe.js),
  [q2_parity_flux_compression.md](q2_parity_flux_compression.md), and
  [q2_centered_filter_reduction.md](q2_centered_filter_reduction.md).

  The \(q_s=4\) branch also has a uniform analytic cutoff.  Its coefficient
  deficit satisfies \(\Lambda_s>\log(4/3)\).  Exact shell capacities through
  \(1000\), a certified tail, and rational bounds for \(\log(4/3)\) give

  \[
  N_*:=468388920579845024401627507047746.              \tag{5.14}
  \]

  Every strict nonboundary \(q_s=4\) failure obeys the exact dichotomy:
  either its first-crossing segment is simple and \(n<N_*\), or the segment
  already contains a nontrivial positive cycle entirely above \(n\).  The
  dyadic cutoff \(2^{109}\) is sharp for this shell envelope.  A cyclic
  no-terminal-loss version excludes equality cycles only above the same
  scale; at the audited minimum \(2^{71}\) its exact partial mass already
  exceeds \(\log(4/3)\).  Thus the result is a finite localization of the
  simple fourfold branch, not a cycle exclusion.  The independent
  coefficient-stopping computation of Rozier and Terracol excludes starts
  through \(2.8\cdot10^{19}\), leaving a still enormous uncertified interval
  below \(N_*\).

  A minimum-dependent shell argument gives a complementary analytic
  restriction.  For a **simple** strict failure path with minimum \(n\),
  exact equal-time injection bounds its odd reciprocal mass by an explicit
  length-independent envelope \(\mathfrak M(n)\), where

  \[
  \mathfrak M(n)\longrightarrow0\qquad(n\to\infty).
  \]

  If \(L=\lceil s\log_2 3\rceil\) and
  \(\Lambda_s=L\log2-s\log3\), the shortcut product therefore forces

  \[
  0<\Lambda_s<\mathfrak M(n).                         \tag{5.15}
  \]

  This does not yield an absolute seed bound: the irrational-rotation gaps
  \(\Lambda_s\) are arbitrarily small, and the front-loaded coefficient
  words \(1^s0^{L-s}\) realize the required first-crossing geometry at
  every such weight.  The missing information is again the anchored
  congruence selecting the canonical seed, not a scalar mass estimate.
  A nonsimple strict path has already entered a positive cycle and belongs
  to the separate cycle branch; the finite-path shell theorem does not
  silently exclude that case.

  Exact anchoring makes the residual shell gate explicit.  For a
  length-\(\ell\) factor \(b_i\) beginning at time \(i\), with local cylinder
  representative \(r(b_i)\), define

  \[
  Q_{i,\ell}:=\frac{x_i-r(b_i)}{2^\ell}.
  \]

  Then

  \[
  2^\ell\le x_i<2^{\ell+1}
  \quad\Longleftrightarrow\quad Q_{i,\ell}=1.         \tag{5.16}
  \]

  The quotient-one equation retains the global anchored carry.  If it is
  discarded, no subexponential local-factor bound is possible: fully
  anchored primitive first-crossing words obtained by placing a binary de
  Bruijn driver after a long initial run of ones have canonical starts
  tending to infinity and attain all \(2^{\ell-1}\) odd length-\(\ell\)
  factors.  Consequently any stronger shell theorem must bound the actual
  solutions of \(Q_{i,\ell}=1\), not merely the anchored word's factor
  complexity.

- [ ] **High-Surplus Carry Innovation.**  Prove that an infinite barrier
  parity sequence with unbounded surplus cannot have an eventually constant
  ordinary binary lift.  By the closed equivalence above, this is precisely
  the theorem that no positive orbit diverges.

## 6. Refuted shortcuts retained as regression tests

- [x] Arbitrary fixed-target exclusion fails because the negative cycle
  \(5\leftrightarrow7\) produces \((1,2)^N\) at every depth.

- [x] Pumping a positive cycle into target \(1\) fails: for a cycle point
  \(x\), the pumped word is target-one only while \(3^{sN}\mid x+1\).

- [x] A final coefficient inequality cannot replace all prefix barriers.
  The smallest positive-start counterexample for the negative shortcut map
  is the word \(011\), sending \(2\) to \(1\) with final multiplier \(9/8\); the
  smallest odd-start example is \(100111\), sending \(3\) to \(1\) with final
  multiplier \(81/64\).  In both cases an earlier prefix coefficient is below
  one.

- [ ] The corresponding all-prefix negative-map statement remains open:
  if every nonempty prefix multiplier is greater than one, must the endpoint
  be at least the canonical starting representative?  Odd extensions preserve
  the desired inequality.  A zero extension, permitted only when \(P\geq2M\),
  reduces exactly to

  \[
  y\text{ even}:\ y\geq2r,
  \qquad
  y\text{ odd}:\ y+P\geq2(r+M).
  \]

  Any shortest counterexample is a simple primitive near-critical excursion:
  its last bit is zero, its final coefficient is the strict minimum among
  nonempty prefix coefficients, \(1<P/M<3/2\), and every proper suffix is
  subcritical.  Exhaustive enumeration of all \(573{,}162\)
  prefix-supercritical words at depth \(25\) found no such word.
  The longer targeted searches are diagnostic only, and neither computation
  is an all-depth proof.

- [x] Greedy inverse descent fails at endpoint \(5\): the least predecessor
  \(3\) is dead, while the larger predecessor \(13\) continues.

- [x] Ancestor size is not monotone in total exponent.  At endpoint \(1\)
  and depth \(4\), total exponents \(11\) and \(12\) give ancestors \(23\)
  and \(21\), respectively.

- [x] Real carry order does not control the dyadic winding margin.  Both
  signs occur under barrier-preserving \(10\mapsto01\) moves.

- [x] An almost-barrier estimate cannot replace every proper-prefix
  inequality.  The word \(10111010\) has only one subcritical proper prefix,
  whose multiplier is exactly \(3/4\), yet its canonical realization rises
  from \(9\) to \(10\).  Its unique primitive first-crossing rotation is
  \(11101010\), which descends from \(199\) to \(190\).  Thus the discontinuity is
  precisely at the omitted ballot inequality, not at the final coefficient.
  The accompanying exhaustive scan through length \(25\) finds this as the
  sole nontrivial canonical non-descent minimizing both the number and depth
  of proper-prefix barrier violations.  This is a finite extremal
  certificate, not evidence against exact FCD.

- [x] The experimental half-weight winding bound is false.  There is a
  primitive first-crossing word of weight \(29\) and length \(46\) with
  \(\tau=14<29/2\); only the sufficient one-third threshold in (5.3) remains
  viable.

  Exact exhaustive and meet-in-the-middle certificates establish (5.3),
  hence First-Crossing Descent, for every weight \(2\leq s_k\leq40\).  This is
  a finite theorem only; the all-weight wrap inequality remains open.

- [x] The first-crossing area identity does not become stronger inside a
  hypothetical cycle.  At the first crossing of a least-state cycle, with
  displacement \(\delta\geq0\), its potentially useful side is exactly

  \[
  \sum_iH_i-(sM-3D\rho)=-3M\delta\leq0.
  \]

  Equality is a closed subcycle; otherwise the desired inequality has the
  wrong sign.  Cyclic summation only restates that the displacements
  telescope to zero.

- [x] A primitive-prime divisor of \(D\) need not obstruct the carry.  In the
  denominator-five regression, \(p=14303\) divides both \(D\) and \(C\), the
  orders of \(2\) and \(3\) modulo \(p\) are both the prime \(7151\), the full
  exponent pair is the only relation in the relevant rectangle, and yet
  the distinct prefix multipliers sum to zero modulo \(p\).  A prime-wise
  proof therefore needs genuinely new structure beyond order and
  zero-sum distinctness.

- [x] Positive rational one-strip cycles do not force integer cycles.  The
  primitive word
  \((1,1,1,1,1,2,1,1,2,1,2,3,2,1,1,1,5)\) gives a strict-record
  \(3x+5\) cycle with least numerator \(187\).

- [x] The entropy gap between barrier words and dyadic cylinders is not a
  pointwise stabilization theorem.  Even the coarse barrier-word exponent
  \(1.0436328\ldots\) lies below the cylinder exponent
  \(\log3=1.0986122\ldots\), but injectivity only gives ultrametric
  separation.  One isolated branch may retain a fixed small representative:
  seed \(27\) is the least strict-barrier representative at every accelerated
  length \(4\) through \(19\), while there are already \(5{,}936{,}673\) strict
  cylinders at length \(19\).  Counting cannot replace the missing
  ordinary-lift stabilization theorem.

- [x] The Bernstein parity series does not turn high surplus into a strong
  \(2\)-adic approximation.  If \(q_k=3^{s_k}/2^k\) and
  \(A_k=\sum_{j<k}\epsilon_j/(3q_j)\), then summation by parts gives

  \[
  A_k=\frac14\left(2+\sum_{j=1}^{k-1}\frac1{q_j}-\frac1{q_k}\right),
  \qquad
  \sum_{j\geq1}\frac{2^j}{3^{s_j}}=-4n-2\quad\hbox{in }\mathbf Z_2.
  \]

  At every later odd state,
  \(\lvert A_k+n\rvert_2=2^{-k}=q_k/3^{s_k}\).  Thus the approximation
  exponent relative to the reduced denominator \(3^{s_k}\) is at most one,
  and increasing surplus makes it
  weaker.  The product formula balances exactly, with the unrestricted
  prime-to-six part of the orbit state paying for both distinguished primes.
  Likewise, dividing two returned endpoints by a common decoder
  \(3^b\) reduces their separation modulus and their Archimedean range by
  the same factor.  This cancellation persists for unbounded
  \(b=o(L)\).  Any HSCI proof must instead control prime-to-three cofactors
  or renewal times across infinitely many scales of one fixed ordinary ray.

- [x] Repairing every dead greedy inverse branch does not create positive
  saving drift.  If the least exponent \(e\in\{1,2\}\) lands on a multiple
  of \(3\), replacing it by \(e+2\) gives the always-live predecessor
  \(4R(X)+1\).  For the resulting inverse states \(z_s\), exponent sum
  \(F_s\), and score \(G_s=\alpha s-F_s\), one has the exact product law

  \[
  G_s=\log_2\!\left(\frac{X}{z_s}\right)
      +\sum_{r<s}\log_2\!\left(1-\frac1{2^{f_r}z_r}\right)
  <\log_2\!\left(\frac{X}{z_s}\right).                \tag{6.1}
  \]

  For a fixed nonperiodic endpoint, the inverse states are distinct and
  unbounded, so \(\liminf G_s=-\infty\).  At a normalized endpoint \(x_j\),
  the relevant defect is \(G_s-S_j\); crossing the stationary budget is
  already equivalent to producing a predecessor below \(n\).  The exact
  moving cylinders \(X_m=2\cdot9^m-1\) have \(2m\) unrepaired exponent-one
  steps and score \(2m\log_2(3/2)\), but their forward surplus is identical,
  so the net defect is zero.  Thus the always-live repair is an exact
  reformulation/no-go, not an independent route to HSCI.

## 7. Completion map

A full proof would follow by closing any one of the following routes, each
of which still contains an open gate:

1. Binary-ternary stabilization, followed by the fixed-deficit
   classifications, plus the cycle integrality obstruction.
2. Stationary inverse-fiber extinction.
3. First-Crossing Descent together with High-Surplus Carry Innovation.

The accepted partial result "no divergent orbits" is exactly the
High-Surplus Carry Innovation gate.  The accepted partial result "no
nontrivial cycles" is exactly the cycle integrality gate (4.6).  Neither
gate is presently closed.  The transition theorems sharpen both open gates:
a divergent counterexample and an integer-cycle counterexample must each
have growing height-transition complexity.  Fixed support and fixed
transition count are effectively closed, the formal ramp obstruction is
closed, and denominator-blind scalar or resultant estimates have explicit
countermodels.  The active obstruction is therefore a global
denominator-one or fixed-seed cancellation law in an unbounded-transition
core, not a remaining finite computation.
