# Divergent-orbit synchronization audit

**Scope.**  This ledger concerns only the unbounded-orbit half of Architecture A.  All
maps below are on positive odd integers,
\[
U(x)=\frac{3x+1}{2^{a(x)}},\qquad a(x)=v_2(3x+1).
\]
For an orbit \(x_{i+1}=U(x_i)\), set
\[
A_t=\sum_{i<t}a_i,\quad q_t=\frac{3^t}{2^{A_t}},\quad
H_t=A_t-t\log_2 3=-\log_2q_t.
\]
For a block beginning at \(j\), write \(B_k=A_{j+k}-A_j\).

The synchronization witness sought is a pair \((j,r)\), \(r\ge1\), such that

1. \(2^{B_k}<3^k\) for every \(1\le k\le r\);
2. \(3^r\mid x_{j+r}+1\);
3. \((a_j,\ldots,a_{j+r-1})\ne1^r\).

The all-depth target-one exclusion theorem makes these three conditions
inconsistent.  Thus the unproved content is exactly that a globally least unbounded
orbit must supply them.

## PROVED

### P1. Exact affine and suffix equivalence

For every block \(w=(a_j,\ldots,a_{j+r-1})\), with carry
\(C_0=0\), \(C_{k+1}=3C_k+2^{B_k}\),
\[
2^{B_r}x_{j+r}=3^rx_j+C_r.
\]
Since \(2^{B_r}\) is a unit modulo \(3^r\),
\[
3^r\mid x_{j+r}+1
\iff
3^r\mid C_r+2^{B_r}.
\]
The right side reconstructs an exact positive \(U_-\)-trajectory with word \(w\)
and terminal value \(1\).

### P2. Barrier normalization of a divergent orbit (conditional only on the
audited orbit-sparsity input)

The audited Garcia--Tal consequence says that an injective nonconvergent orbit has
\(\sum_i1/x_i<\infty\).  Hence
\[
h_t:=x_t/q_t=x_0\prod_{i<t}\left(1+\frac1{3x_i}\right)
\]
converges to a finite positive limit.  Since \(x_t\to\infty\), this forces
\(q_t\to\infty\), equivalently \(H_t\to-\infty\).  Therefore \(H_t\) has a
unique global maximum, say at \(j_*\) (uniqueness follows from the irrationality
of \(\log_2 3\)).  For every \(k\ge1\),
\[
H_{j_*+k}<H_{j_*}
\iff 2^{B_k}<3^k.
\]
Thus one fixed tail, not merely arbitrarily many finite blocks, satisfies every
strict prefix barrier.

### P3. Exact structure of the all-ones escape

For a positive block of length \(r\), the following are equivalent:

* its valuation word is \(1^r\);
* \(2^{r+1}\mid x_j+1\).

Writing \(x_j+1=2^rt\), exactness of the last valuation is equivalent to \(t\)
being even, and
\[
x_{j+k}=3^k2^{r-k}t-1\quad(0\le k\le r),\qquad
x_{j+r}=3^rt-1.
\]
In particular every all-ones block automatically satisfies
\(3^r\mid x_{j+r}+1\), and for a *fixed* start \(x_j\) its maximum length is
\(v_2(x_j+1)-1\).  (The extra factor of two is essential; omitting it would
incorrectly treat \(x=1\) as an exponent-one step.)

### P4. What synchronization reduces to after normalization

Let \(j_*\) be as in P2 and put \(L=v_2(x_{j_*}+1)-1\).  The all-depth target-one
theorem and P3 imply
\[
r>L\quad\Longrightarrow\quad v_3(x_{j_*+r}+1)<r.
\]
Consequently, one sufficient (but stronger than Architecture A requires) route is
to prove that this particular normalized tail has some \(r>L\) with
\(v_3(x_{j_*+r}+1)\ge r\).  Such a hit is automatically non-all-ones.

### P5. One-digit target theorem (new; computer-assisted)

Let \(w\) be a strict barrier word of length \(r\ge1\), and put
\[
D(w)=C(w)+2^{A(w)}.
\]
Then
\[
\boxed{3^{r-1}\mid D(w)\quad\Longrightarrow\quad w=1^r.}
\]
Equivalently, every non-all-ones strict barrier word satisfies
\[
v_3(D(w))\le r-2.
\]

**Exact reduction.**  The first barrier inequality forces the first letter to be
\(1\), so write \(w=1v\), where \(|v|=r-1=:\ell\).  The concatenation identity
gives
\[
C(1v)=3^\ell+2C(v),\qquad
D(1v)=3^\ell+2D(v).                         \tag{P5.1}
\]
Thus \(3^\ell\mid D(1v)\) implies \(3^\ell\mid D(v)\).  Targeted terminal
duality reconstructs an exact positive \(U_-\)-path with word \(v\) and endpoint
\(1\).

For every prefix \(v_{<k}\), the barrier inequality for the corresponding prefix
\(1v_{<k}\) is
\[
2^{1+A_k(v)}<3^{k+1},
\quad\text{hence}\quad
2^{A_k(v)}<\frac32\,3^k.                    \tag{P5.2}
\]
Let \(m_0\to\cdots\to m_\tau=1\) be the path truncated at its first hit of
\(1\).  It is simple, and (P5.2) holds through \(\tau\).  The exact product
identity and the universal reciprocal-mass theorem give
\[
\begin{aligned}
\frac1{m_0}
 &=\frac{3^\tau}{2^{A_\tau}}
   \prod_{i<\tau}\left(1-\frac1{3m_i}\right),\\
\log m_0
 &<\log\frac32+
   \sum_{i<\tau}\frac1{3m_i-1}
 <\log\frac32+10.789.
\end{aligned}
\]
Therefore
\[
m_0<\frac32e^{10.789}<\frac32\,3^{11}
=\frac{531441}{2}=265720.5.                  \tag{P5.3}
\]

The exact accelerated checker scans all \(132860\) odd integers
\(1\le m_0<265721\).  It stops only on a hit of \(1\), a repeated state, a
failure of the exact integer inequality
\(2\cdot2^{A_k}<3\cdot3^k\), or the explicit cap.  Its output is

```text
counts={"hit_1":1,"relaxed_barrier_failure":132853,"cycle":6}
hits=[[1,0]]
longest={"steps":101,"seed":249189,"status":"relaxed_barrier_failure"}
certificate_passed=true
```

An independent shortcut-step implementation (it never computes a \(2\)-adic
valuation) returns the same partition, no cap survivors, and a longest resolution
of \(162\) shortcut steps.  Hence \(m_0=1\); determinism of \(U_-\) forces
\(v=1^\ell\), and therefore \(w=1^r\).

The retained artifacts and SHA--256 hashes are:

| File | SHA--256 |
| --- | --- |
| `relaxed_barrier_scan.js` | `AA4DF15DAF4C848A4D6F3A9FB522D2F5C218D88D988EE4A34AD10ACF7F2538DF` |
| `relaxed_barrier_scan.out` | `E58C2E3169B175C02C1B2D889D71F754E00C86E989F8D2D421A2AA4A41304F91` |
| `relaxed_barrier_shortcut_scan.js` | `9FB5BDC3C64F3AB4827964CE0FA708C58DB1A6AAB36D17663E709B48780348E6` |
| `relaxed_barrier_shortcut_scan.out` | `AB44E5BAB0EF219FD4552E782A3036D8A5ABB2A925B4D31CE29B236FAF178EB7` |

### P6. All-ones blocks are unique least ancestors at their own depth

For every positive odd \(x\),
\[
U(x)+1\le\frac32(x+1),                         \tag{P6.1}
\]
because \(U(x)=(3x+1)/2^{a(x)}\le(3x+1)/2\).  Equality in
(P6.1) holds exactly when \(a(x)=1\).  Hence every \(r\)-step path obeys
\[
U^r(z)+1\le\left(\frac32\right)^r(z+1),        \tag{P6.2}
\]
with equality exactly for the word \(1^r\).

If an all-ones block starts at \(x=2^rt-1\) (where \(t\) is positive even),
its endpoint is \(X=3^rt-1\).  Any other positive \(r\)-step ancestor \(z\)
of \(X\) satisfies, by (P6.2),
\[
3^rt=X+1\le(3/2)^r(z+1),
\]
so \(z\ge2^rt-1=x\), with equality only for the same all-ones path.  Thus a
same-depth inverse-fiber argument can never turn an all-ones synchronization hit
into descent.  Any successful exclusion must use the preceding prefix, additional
inverse depth, or a genuinely global constraint.

### P7. Fixed-deficit finite-language theorem (new meta-theorem)

Fix \(d\ge0\).  Let \(w=uv\) be a strict barrier word with \(|u|=d\) and
\(|v|=r-d=:\ell\).  Then
\[
D(uv)=3^\ell C(u)+2^{A(u)}D(v).                 \tag{P7.1}
\]
Consequently
\[
3^{r-d}\mid D(w)\quad\Longrightarrow\quad 3^\ell\mid D(v),
                                                               \tag{P7.2}
\]
so \(v\) is an exact \(U_-\)-trajectory to \(1\).  Moreover, for each prefix
of \(v\), the original barrier gives
\[
\frac{3^k}{2^{A_k(v)}}>
c_u:=\frac{2^{A(u)}}{3^d}>0.                    \tag{P7.3}
\]
If \(m(u,v)\) is the negative-shadow start and the path is truncated at its
first hit of \(1\), the same product/mass calculation as in P5 yields
\[
\boxed{
m(u,v)<c_u^{-1}e^{10.789}<\frac{3^{d+11}}{2^{A(u)}}.
}                                                    \tag{P7.4}
\]

There are only finitely many length-\(d\) strict barrier prefixes \(u\), and
(P7.4) gives finitely many seeds for each.  For any accepted seed \(m\), its
deterministic first-hit word \(t(m)\) is fixed; every longer terminal word from
that seed is exactly
\[
t(m)1^L\qquad(L\ge0),                              \tag{P7.5}
\]
because \(U_-(1)=1\) with exponent \(1\).  Conversely (P7.3) becomes easier
under the appended ones.  Hence, after a finite exact seed classification, the
entire all-depth language at each fixed deficit \(d\) is a finite union
\[
\bigcup_{u,m}u\,t(m)\,1^*.                         \tag{P7.6}
\]
This is a genuine all-depth reduction: the finite computation ranges over seeds,
not over the unbounded length \(r\).

### P8. Complete deficit-two classification (new; computer-assisted)

At depth two the strict barrier prefixes are exactly
\[
u=(1,1),\qquad u=(1,2),
\]
with coefficient floors \(c_u=4/9\) and \(8/9\), respectively.  P7 bounds the
corresponding negative seeds by
\[
m<\frac94\,3^{11}=398580.75,
\qquad
m<\frac98\,3^{11}=199290.375.                    \tag{P8.1}
\]
Independent accelerated and shortcut-step scans return only \(m=1\) as a hit
of \(1\) before coefficient-floor failure.  The accelerated output is

```text
case=prefix_1_1 floor=4/9 cap=398581 step_cap=100000
counts={"hit_1":1,"coefficient_floor_failure":199279,"cycle":10}
hits=[[1,0]]
longest={"steps":125,"seed":304901,"status":"coefficient_floor_failure"}
certificate_passed=true
case=prefix_1_2 floor=8/9 cap=199291 step_cap=100000
counts={"hit_1":1,"coefficient_floor_failure":99642,"cycle":2}
hits=[[1,0]]
longest={"steps":83,"seed":149345,"status":"coefficient_floor_failure"}
certificate_passed=true
```

The shortcut checker gives the same partitions, no cap survivors, and longest
resolutions of \(202\) and \(132\) shortcut steps.  Therefore
\[
\boxed{
3^{r-2}\mid D(w)
\iff
w=1^r\ \text{or}\ w=(1,2,1^{r-2})
}                                                    \tag{P8.2}
\]
for every strict barrier word of length \(r\ge2\).  The reverse implication is
exact: \(D(1^r)=3^r\), while
\(D(1,2,1^{r-2})=13\cdot3^{r-2}\).

Retained artifact hashes:

| File | SHA--256 |
| --- | --- |
| `deficit_two_scan.js` | `27805373B5FF28FE8BA77BA9C73A87D323C50A693780D5CD6D2E0C304CC46F6A` |
| `deficit_two_scan.out` | `BF30B059AAE2445C704907A4C8E27B2D9C41E128AD0CB9D26FDEA307380B0ACB` |
| `deficit_two_shortcut_scan.js` | `AE0AE33BA7E78187FE09A6B605CCECB33711F3B4322FDF47C4AF2AE3F848993D` |
| `deficit_two_shortcut_scan.out` | `44CD5C84C884FDB8F767CCFB859973BBB2FA36E2A2E6655F86A0829FFD8F2521` |

### P9. The sharp family is finite at one fixed ordinary start

Fix a positive block start \(x_j\).  The all-ones prefixes have length at most
\(v_2(x_j+1)-1\).  The sharp family in P8 can occur only if the first two
exponents are \((1,2)\); after those steps it requires a run of \(r-2\) ones.
Writing \(y=U^2(x_j)\), this run has length at most \(v_2(y+1)-1\).
Therefore define
\[
R_2(x_j)=\max\left\{v_2(x_j+1)-1,
\;\mathbf1_{(a_j,a_{j+1})=(1,2)}
\bigl(v_2(U^2(x_j)+1)+1\bigr)
\right\}.                                           \tag{P9.1}
\]
For every barrier prefix from this fixed start and every \(r>R_2(x_j)\),
\[
\boxed{v_3(x_{j+r}+1)\le r-3.}                     \tag{P9.2}
\]
Thus the family \((1,2,1^{r-2})\) cannot be the escape for unboundedly many
nested prefix lengths of the normalized barrier tail.  An infinite exponent-one
tail is impossible directly: \(k\) consecutive ones require
\(2^{k+1}\mid y+1\), which a fixed positive \(y\) cannot satisfy for all \(k\).

### P10. Archimedean length constraint and the need to vary block starts

The growth inequality (P6.2) also imposes a necessary size condition on every
near-terminal block.  If
\[
3^{r-d}\mid U^r(z)+1,
\]
then the quotient is even (both terms are odd), so
\[
U^r(z)+1\ge2\cdot3^{r-d}.
\]
Together with (P6.2), this gives
\[
\boxed{z+1\ge\frac{2^{r+1}}{3^d}},
\qquad
r\le\log_2(z+1)+d\log_2 3-1.                 \tag{P10.1}
\]
In particular, rate-matched hits of any fixed deficit are automatically bounded
in length at one fixed start.  A synchronization proof seeking unbounded lengths
must vary the starts \(j\), with \(x_j\) growing at least exponentially in the
chosen block length.

This is compatible with barrier abundance.  Since \(H_t\to-\infty\), for every
\(J\) the tail \(\{H_t:t\ge J\}\) has a unique maximum at some \(j(J)\ge J\).
Taking \(J\to\infty\) produces unboundedly many starts, each of which begins an
infinite strict-barrier ray.  Architecture A must synchronize at one of these
moving starts (or find one hit in the finite window at the first normalized start).

### P11. Complete deficit-three classification (new; computer-assisted)

The length-three barrier prefixes are exactly
\[
111,\qquad112,\qquad121.
\]
The first has coefficient floor \(8/27\); the other two have floor \(16/27\).
P7 gives seed bounds
\[
m<\frac{27}{8}3^{11}=597871.125,
\qquad
m<\frac{27}{16}3^{11}=298935.5625.             \tag{P11.1}
\]
At floor \(8/27\), the independent scans find exactly the first-hit seeds
\[
1\quad(\text{empty word}),
\qquad3\xrightarrow{3}1.
\]
At floor \(16/27\), they find only \(1\).  There are no cap survivors.  Hence,
for every strict barrier word \(w\) of length \(r\ge3\),
\[
\boxed{
3^{r-3}\mid D(w)
\iff
\begin{cases}
w=1^r,\ \text{or}\\
w=(1,1,2,1^{r-3}),\ \text{or}\\
w=(1,2,1^{r-2}),\ \text{or}\\
w=(1,1,1,3,1^{r-4})\quad(r\ge4).
\end{cases}
}                                                     \tag{P11.2}
\]
The reverse implications follow directly from (P7.1), or from
\[
D(112)=35,\quad D(121)=39,\quad D(1113)=129,
\]
and the identity \(D(v1)=3D(v)\).

The accelerated partitions are

```text
floor=8/27:  hit_1=2, floor_failure=298919, cycle=15
             hits=(1, empty), (3, [3]); longest=128 steps
floor=16/27: hit_1=1, floor_failure=149460, cycle=7
             hit=(1, empty); longest=101 steps
```

The shortcut implementation returns the same partitions and longest resolutions
of \(207\) and \(162\) shortcut steps.  Artifact hashes:

| File | SHA--256 |
| --- | --- |
| `deficit_three_scan.js` | `A6E843F02F72DFE85709EB0E8DA7D55C3D0647B2AA44F7F41ADBCFFDA83C3F75` |
| `deficit_three_scan.out` | `2D4781495CC99AACD77162EE5FEC5E793C382B0DC183767B84725307B046CC25` |
| `deficit_three_shortcut_scan.js` | `61D7894CAC25C749661759542649572FB342CC8B2F6BCBA94C4132B90F60AD54` |
| `deficit_three_shortcut_scan.out` | `3E2ECF19BFCD605AD8626E7483092D8DFFCDBB4BD90367D58E74C81F4356750A` |

### P12. Exact binary coherence and ordinary-seed stabilization

For a finite valuation word \(w\) of length \(t\) and total exponent \(A\), its
exact positive seed cylinder is the unique odd residue
\[
\rho(w)\equiv 3^{-t}\bigl(2^A-C(w)\bigr)
          \pmod {2^{A+1}},
\qquad0<\rho(w)<2^{A+1}.                            \tag{P12.1}
\]
Indeed, the affine numerator \(3^tn+C(w)\) has exact valuation \(A\) precisely
when it is congruent to \(2^A\) modulo \(2^{A+1}\).  If \(w\) is a prefix of
\(wv\), uniqueness gives
\[
\rho(wv)\equiv\rho(w)\pmod {2^{A(w)+1}}.             \tag{P12.2}
\]

Thus every infinite positive-letter word defines a compatible inverse-limit seed
\(\xi\in\mathbb Z_2\).  It is the valuation word of a positive ordinary integer
\(n\) if and only if its least positive representatives eventually stabilize:
\[
\boxed{\rho(w_{<t})=n\quad\text{for all sufficiently large }t.} \tag{P12.3}
\]
The forward implication follows once \(2^{A_t+1}>n\); the unique representative
of \(n\) is then literally \(n\).  The reverse implication follows from cylinder
compatibility.  This is the precise coherence datum that finite parity compactness
loses.

### P13. Arbitrarily long coherent bad-block chains (new no-go construction)

Let
\[
b_r=(1^{r-1},2)\qquad(r\ge2).
\]
Every \(b_r\) is a strict barrier word and
\[
C(b_r)=3^r-2^r,\qquad D(b_r)=3^r+2^r,\qquad v_3(D(b_r))=0. \tag{P13.1}
\]
Concatenations of these words remain strict barrier words.  Moreover, every block
boundary is a tail-record start for the infinite concatenation: every nonempty
prefix of every later concatenation has coefficient \(q>1\).

There is an explicit recursive choice of increasing lengths
\(r_1<r_2<\cdots\) for which the compatible representatives of
\[
W_K=b_{r_1}b_{r_2}\cdots b_{r_K}
\]
strictly acquire new high binary lifts and hence diverge.

Assume \(W_K\) and \(n_K=\rho(W_K)\) have been chosen.  Follow \(n_K\) to the
current block boundary.  From this fixed positive state, at most one length \(r\)
can have next word \(b_r\): it is determined by the initial run of exponent-one
steps and the following exponent (which must be \(2\)).  Choose any larger \(r\)
different from that one and append \(b_r\).  The new representative \(n_{K+1}\)
is compatible with \(n_K\) by (P12.2), but it cannot equal \(n_K\), because
\(n_K\) does not realize the selected extension.  Hence
\[
n_{K+1}=n_K+c_K2^{A(W_K)+1},\qquad c_K\ge1,          \tag{P13.2}
\]
so \(n_K\to\infty\).  The inverse-limit seed exists in \(\mathbb Z_2\) but is
not a nonnegative ordinary integer by P12.

For every finite \(K\), however, the single positive seed \(n_K\) realizes all
\(K\) blocks coherently; suffix locality and (P13.1) give
\[
v_3(x_{j_i+r_i}+1)=0
\]
at every selected block endpoint.  The first twelve constructed lengths are
\[
2,3,5,6,7,8,9,10,11,12,13,14,
\]
and the exact checker verifies compatibility, every prescribed word, and every
zero valuation.  Its source/output hashes are

| File | SHA--256 |
| --- | --- |
| `adaptive_coherent_countermodel.js` | `70F76ED32F7460FFC554C6B5410BD0F02C1F026248A2779CB708DCF21EB21C7A` |
| `adaptive_coherent_countermodel.out` | `41CD9B6892092F9D65F8212C566C67C9B0F24670890FA000A444F73C6C204769` |

### P14. Exact binary-innovation / ternary-endpoint identities

Let \(w\) have length \(t\), total exponent \(A\), canonical cylinder seed
\(n=\rho(w)\), and canonical endpoint

\[
y=\frac{3^tn+C(w)}{2^A}.
\]

Let \(v\) have length \(s\), total exponent \(B\).  Cylinder compatibility
gives a unique innovation digit block

\[
\rho(wv)=n+2^{A+1}\kappa,\qquad 0\le\kappa<2^B.       \tag{P14.1}
\]

After the prefix \(w\), this lifted seed has state

\[
\widetilde y=y+2\,3^t\kappa.                         \tag{P14.2}
\]

It realizes \(v\) exactly iff
\(\widetilde y\equiv\rho(v)\pmod {2^{B+1}}\).  Dividing the odd-residue
difference by two gives the explicit lift formula

\[
\boxed{
\kappa\equiv3^{-t}\frac{\rho(v)-y}{2}\pmod {2^B}.
}                                                     \tag{P14.3}
\]

If \(z\) is the endpoint after \(wv\), the two useful cross-prime identities
are

\[
2^B(z+1)=3^sy+D(v)+2\,3^{t+s}\kappa,                 \tag{P14.4}
\]
\[
2^{A+B}(z+1)=D(wv)+3^{t+s}\rho(wv).                  \tag{P14.5}
\]

Consequently

\[
\boxed{
\min\{v_3(D(wv)),t+s\}
=\min\{v_3(z+1),t+s\}
=\min\{v_3(3^sy+D(v)),t+s\}.
}                                                     \tag{P14.6}
\]

The innovation term in (P14.4) is already divisible by the *full* terminal
modulus \(3^{t+s}\).  Thus no valuation below full depth can see the size or
even the vanishing of \(\kappa\) directly.  Any cross-prime tradeoff has to
use recurrence along one stationary ray, not a one-extension valuation
inequality.

### P15. Stabilized-suffix embedding theorem (new exact no-go)

Let \(v\) be any nonempty finite valuation word whose first letter is at
least \(2\), and write \(B=A(v)\).  There are arbitrarily large odd integers
\(r\) such that the positive seed

\[
n_r=2^r-1
\]

has exact valuation prefix

\[
W_r=(1^{r-1},2,v).                                   \tag{P15.1}
\]

Moreover \(r\) can be chosen so that \(W_r\) is a strict barrier word, and
the cylinder representatives are already stabilized at \(n_r\) before the
last \(2\) in (P15.1).  Thus all \(1+|v|\) subsequent innovation blocks are
zero; equivalently, all \(B+2\) newly exposed individual binary lift bits
are zero.

**Proof.**  Exactness of the first letter of \(v\) gives
\(\rho(v)\equiv1\pmod4\), hence

\[
2\rho(v)+1\equiv3\pmod8.                             \tag{P15.2}
\]

For \(m\ge3\), the powers of \(3\) modulo \(2^m\) are exactly the odd residue
classes congruent to \(1\) or \(3\) modulo \(8\).  Indeed LTE gives
\(\operatorname{ord}_{2^m}(3)=2^{m-2}\); all powers lie in that set, which
also has \(2^{m-2}\) elements.  Taking \(m=B+2\), (P15.2) therefore has an
odd solution

\[
3^r\equiv2\rho(v)+1\pmod {2^{B+2}},                  \tag{P15.3}
\]

and adding arbitrary multiples of \(2^B\) gives arbitrarily large odd
solutions.

For odd \(r\), \(n_r\) first has \(r-1\) exponent-one steps and then one
exponent-two step, with endpoint

\[
X_r=\frac{3^r-1}{2}.
\]

Equation (P15.3) says exactly
\(X_r\equiv\rho(v)\pmod {2^{B+1}}\), so \(X_r\) realizes \(v\).  Also

\[
\rho(1^{r-1})=2^r-1=n_r.
\]

Since \(n_r\) realizes every remaining letter and all later cylinder moduli
are larger than \(2^r\), every later representative remains literally
\(n_r\).  Finally, for a prefix \(v_{<k}\) with exponent sum \(B_k\), the
remaining barrier inequality is

\[
\frac{3^r}{2^{r+1}}>\frac{2^{B_k}}{3^k}.
\]

There are finitely many right-hand sides, while the left side tends to
infinity along the arithmetic progression of solutions \(r\), proving the
strict barrier assertion.

In particular take

\[
v_L=(2,1^L,2).
\]

It begins at \(2\), ends at an even exponent, and has multiplier

\[
\frac{3^{L+2}}{2^{L+4}}\longrightarrow\infty.
\]

P15 supplies strict barrier words with \(L+3\) consecutive zero accelerated
innovation blocks (equivalently \(L+6\) consecutive zero binary lift bits)
after stabilization and with arbitrarily large *new* multiplier surplus over
the stabilized suffix.  Since the last exponent is even, its endpoint is
\(1\pmod3\), so

\[
\boxed{v_3(D(W_r))=0.}                               \tag{P15.4}
\]

More generally, for an arbitrary finite word \(u\), apply P15 to
\(v=(2,u,2)\).  Then \(u\) occurs wholly after representative stabilization
inside a strict barrier prefix, and the completed prefix still has terminal
valuation zero.  Thus the language of finite factors occurring after binary
stabilization under a global strict barrier is the full finite valuation
language.  There is no finite forbidden-pattern version of binary--ternary
synchronization.

The exact construction was independently checked for \(1\le L\le10\) by
stabilized_suffix_embedding.js; the largest checked word has length \(7352\)
and every asserted valuation and strict barrier inequality was evaluated as
an exact BigInt comparison.

### P16. Complete exclusion of eventually periodic valuation tails

Let a nonempty word \(v\) have length \(s\), exponent total \(B\), carry
\(C=C(v)\), and put \(P=3^s,\ Q=2^B\).  If a positive orbit repeated \(v\)
forever from a state \(x_0\), its block-boundary states would obey

\[
Qx_{k+1}=Px_k+C.                                    \tag{P16.1}
\]

For the integer affine form

\[
L(x)=(Q-P)x-C
\]

one has \(L(x_{k+1})=(P/Q)L(x_k)\).  Hence

\[
Q^K L(x_K)=P^K L(x_0).
\]

As \(\gcd(P,Q)=1\), \(Q^K\mid L(x_0)\) for every \(K\), forcing
\(L(x_0)=0\).  Thus an infinite exact periodic tail is necessarily the
positive cycle

\[
x_0=\frac{C}{Q-P},
\]

which requires \(Q>P\); if \(P>Q\), no positive ordinary seed realizes the
periodic ray.  In particular no divergent positive orbit has an eventually
periodic accelerated valuation word.

There is also an exact ternary formula for the finite countermodels.  For
\(D_K=D(v^K)\),

\[
C(v^K)=C\frac{P^K-Q^K}{P-Q},
\qquad
(P-Q)D_K=CP^K+(P-D(v))Q^K.                         \tag{P16.2}
\]

If \(P\ne D(v)\), then for all sufficiently large \(K\),

\[
v_3(D_K)=v_3(P-D(v));                               \tag{P16.3}
\]

whereas if \(P=D(v)\), then \(D_K=P^K\).  In the expanding case \(P>Q\),
the cylinder representative satisfies

\[
\rho(v^K)\equiv-\frac{C}{P-Q}\pmod {2^{KB+1}},
\qquad
\rho(v^K)\ge\frac{2^{KB+1}-C}{P-Q}.                \tag{P16.4}
\]

Thus an expanding periodic sector has exponentially forced binary
innovation; except for the exact algebraic sector \(D(v)=P\), it also has
only bounded terminal \(3\)-adic valuation.  By the elementary
Morse--Hedlund criterion, bounded subword complexity implies eventual
periodicity.  Therefore no divergent positive orbit can have bounded
subword complexity (more generally, complexity \(p(m)\le m\) at any scale).

### P17. Exact block-power divisibility at a moving start

Let \(v\) be a nonempty word of length \(s\), total exponent \(B\), and carry
\(C\).  Put

\[
P=3^s,\qquad Q=2^B,\qquad
\Lambda_v(y)=(Q-P)y-C.                              \tag{P17.1}
\]

If one fixed ordinary orbit, at any position \(j\), has state \(y=x_j\) and
the next \(Ks\) valuations are \(v^K\), then its block-boundary states satisfy
\[
Qy_{i+1}=Py_i+C
\]
and hence

\[
\boxed{Q^K\mid\Lambda_v(y).}                        \tag{P17.2}
\]

Indeed
\[
Q^K\Lambda_v(y_K)=P^K\Lambda_v(y),
\]
and \(P\) is coprime to \(Q\).  If \(\Lambda_v(y)=0\), then the first block
already returns \(y\) to itself; determinism makes the subsequent orbit
periodic with block \(v\).  Thus on an injective divergent orbit
\(\Lambda_v(y)\ne0\).

There is a uniform size consequence which does not assume that \(v\) is
itself a barrier word.  Writing \(A_i\) for the exponent sum through the first
\(i\) letters of \(v\), the remaining \(s-i\) positive exponents give
\[
A_i\le B-s+i.
\]
Therefore
\[
\begin{aligned}
C
&=\sum_{i=0}^{s-1}3^{s-1-i}2^{A_i}\\
&\le2^{B-s}(3^s-2^s)
< Q\left(\frac32\right)^s.                          \tag{P17.3}
\end{aligned}
\]
Since \(Q\ge2^s\) and \(P/Q\le(3/2)^s\), (P17.2)--(P17.3) imply, whenever
the orbit is not already cyclic,
\[
\begin{aligned}
Q^K
&\le|\Lambda_v(y)|\\
&\le(P+Q)y+C\\
&\le Q(2y+1)\left(\frac32\right)^s.
\end{aligned}
\]
Thus
\[
\boxed{
\left(\frac{2^K}{3}\right)^s\le2y+1.
}                                                     \tag{P17.4}
\]

If the occurrence begins at a relative strict-barrier start, then \(P>Q\)
and
\[
\frac CP
=\sum_{i=0}^{s-1}\frac{2^{A_i}}{3^{i+1}}
\le\frac s3.
\]
Now \(\Lambda_v(y)<0\), so the sharper estimate is
\[
\boxed{
\left(\frac{2^K}{3}\right)^s\le y+\frac s3.
}                                                     \tag{P17.5}
\]

These estimates audit the moving-start quantifier.  A power is not forbidden
merely because \(K\) is large; its starting state must grow exponentially in
\(Ks\).  For example, on a normalized divergent ray with
\(x_j\le H(3/2)^j\), an occurrence \(v^K\) beginning at \(j\) must satisfy
\[
j\ge
\frac{s(K\log2-\log3)-\log(2H+1)}{\log(3/2)}.        \tag{P17.6}
\]
For a fixed block, the starts of its \(K\)-th powers therefore migrate at
least linearly in \(K\), with asymptotic slope
\[
\frac{s\log2}{\log(3/2)}=1.7095\ldots\,s.
\]

At a strict lower coefficient record \(j\), the audited bound
\(x_j<n+j/3\) instead yields
\[
j>
\frac32\left[
\left(\frac{2^K}{3}\right)^s-(2n+1)
\right].                                             \tag{P17.7}
\]
Thus powers at record-renewal starts must migrate exponentially in \(K\).

An exact scan of \(200000\) odd seeds, 96 steps per seed, checked
\(2248583\) noncyclic moving-start powers and \(1637950\) cases where the
base block was a relative strict barrier.  It verified (P17.2), (P17.4), and
(P17.5) by integer arithmetic; \(6260328\) further cases were correctly
identified as repetitions after entry into a cycle.  The checker
block_power_scan.js has SHA--256
0B4A73A00A498697DCFB86CACAA7DFFE6D118106A639CEB48E7599B042ED7100;
its retained output has SHA--256
8B64B6C18F6CB50EF899B3B851D4CB88A7B6D57A1E2596791A306A334A47A275.

### P18. Short-return rigidity on one fixed ordinary ray

Suppose two length-\(\ell\) factors on one nonperiodic positive orbit agree
at positions \(j\) and \(j+d\), with \(1\le d\le\ell\):
\[
(a_j,\ldots,a_{j+\ell-1})
=(a_{j+d},\ldots,a_{j+d+\ell-1}).                   \tag{P18.1}
\]
The segment of length \(\ell+d\) beginning at \(j\) has period \(d\).
Consequently it begins with \(v^K\), where \(v\) is its first \(d\) letters
and
\[
K=\left\lfloor\frac{\ell}{d}\right\rfloor+1,
\qquad Kd>\ell.
\]
Applying P17.4 at \(y=x_j\) gives the exact logarithmic return obstruction
\[
\boxed{
\ell\log2-d\log3<\log(2x_j+1).
}                                                     \tag{P18.2}
\]

In particular, let \(\tau_n(\ell)\) be the first return position of the
length-\(\ell\) prefix of the valuation word of a fixed positive nonperiodic
seed \(n\), with \(\tau_n(\ell)=\infty\) if it never returns.  If the return
does not overlap, \(\tau_n(\ell)>\ell\), the following bound is automatic;
if it overlaps, it follows from (P18.2):
\[
\boxed{
\tau_n(\ell)>
\frac{\ell\log2-\log(2n+1)}{\log3}.
}                                                     \tag{P18.3}
\]
Hence
\[
\boxed{
\liminf_{\ell\to\infty}
\frac{\tau_n(\ell)}{\ell}\ge\log_3 2
=0.630929\ldots .
}                                                     \tag{P18.4}
\]

This is strictly stronger than eventual-periodic exclusion.  It rules out
every nonperiodic symbolic ray whose prefixes have arbitrarily long returns
overlapping by more than the \(1-\log_3 2\) proportion, even though such a
ray need not be eventually periodic.

The moving-record form is also explicit.  At a lower coefficient record
\(j\), any equality (P18.1) must satisfy
\[
d>
\frac{\ell\log2-\log(2n+2j/3+1)}{\log3}.             \tag{P18.5}
\]
Thus, once \(\ell\gg\log j\), two copies of a future record factor cannot
overlap at shift less than
\((\log_3 2-o(1))\ell\).  This is a concrete arithmetic branching-loss
condition at renewal starts.

### P19. Uniform recurrence plus unbounded powers of one block

Let an infinite word be uniformly recurrent and suppose that, at positions
which may vary with \(K\), it contains \(v^K\) for arbitrarily large \(K\),
where \(v\) is one fixed nonempty block.  Then the word is periodic.

To see this, take any factor \(u\).  Uniform recurrence gives \(R(u)\) such
that every factor of length \(R(u)\) contains \(u\).  A sufficiently long
copy of \(v^K\) contains an \(R(u)\)-window away from its ends, so \(u\) is a
factor of the bi-infinite periodic word \(v^\mathbb Z\).  This holds for
every \(u\).  Passing to the primitive root of \(v\), its length-\((|v|+1)\)
factors have a unique continuation, forcing the original one-sided word to
be periodic.

Combining this elementary lemma with P16 gives:
\[
\boxed{
\begin{minipage}{0.86\linewidth}
A uniformly recurrent positive Collatz valuation ray which contains
arbitrarily high powers of one fixed block is a positive cycle, and hence
cannot be divergent.
\end{minipage}
}                                                     \tag{P19.1}
\]
The occurrence positions are completely unrestricted.  Likewise,
Morse--Hedlund upgrades the last statement of P16: any sublinear factor
complexity \(p(m)=o(m)\), or merely \(p(m)\le m\) at one scale, forces
eventual periodicity and is excluded for divergence.

### P20. Characteristic Sturmian valuation rays are excluded

P18 excludes a concrete minimal-complexity aperiodic class, not merely
eventually periodic words.  Let \(a,b\) be two distinct positive valuations,
let
\[
s_{-1}=b,\qquad s_0=a,\qquad
s_{m+1}=s_m^{d_{m+1}}s_{m-1}\quad(d_{m+1}\ge1),
                                                               \tag{P20.1}
\]
and let \(\mathbf s\) be the characteristic Sturmian limit of these standard
words.  Then \(\mathbf s\) has square prefixes with unbounded base length.

Indeed, for each sufficiently large \(m\):

* if \(d_{m+1}\ge2\), then \(s_m^2\) is a prefix;
* if \(d_{m+1}=1\) and \(d_{m+2}\ge2\), then \(s_{m+1}^2\) is a prefix;
* if \(d_{m+1}=d_{m+2}=1\), then
  \[
  s_{m+2}=(s_ms_{m-1})s_m.
  \]
  Since \(s_m=s_{m-1}^{d_m}s_{m-2}\), the word following the first
  \(s_m\), through the first \(|s_m|\) further letters, is again \(s_m\).
  Hence \(s_m^2\) is a prefix in this case as well.

The lengths \(|s_m|\) tend to infinity.  But P17.4 says that a nonperiodic
positive seed \(n\) with a square prefix \(v^2\), \(|v|=s\), must satisfy
\[
\left(\frac43\right)^s\le2n+1,
\]
which bounds \(s\).  Therefore
\[
\boxed{\text{No nonperiodic positive Collatz valuation ray is
characteristic Sturmian under any two-letter valuation coding.}}       \tag{P20.2}
\]
This includes the Fibonacci characteristic word and supplies a
minimal-linear-complexity exclusion strictly beyond P16.

### P21. Fixed-seed dyadic return lattice and a strengthened growth obstruction

The ordinary-seed condition gives substantially more than the block-power
divisibility in P17.  Suppose that two accelerated valuation factors of
length \(L\) agree at positions \(j<k\), put \(d=k-j\), and let \(B\) be
their common total exponent.  By the exact cylinder formula P12, both
starting states lie in the same odd residue class modulo \(2^{B+1}\).  Thus

\[
2^{B+1}\mid x_k-x_j.                                  \tag{P21.1}
\]

The common affine block also gives

\[
2^B(x_{k+L}-x_{j+L})=3^L(x_k-x_j).                   \tag{P21.2}
\]

Consequently

\[
2\cdot3^L\mid x_{k+L}-x_{j+L}.                       \tag{P21.3}
\]

On a nonperiodic positive orbit the starting states in (P21.1) are
distinct.  The universal growth estimate P6.2, applied over the intervening
\(d\) accelerated steps, gives

\[
|x_k-x_j|<\left(\frac32\right)^d(x_j+1).
\]

Combining this with (P21.1) yields the exact integer obstruction

\[
\boxed{2^{B+d+1}<3^d(x_j+1).}                         \tag{P21.4}
\]

In particular, if \(\tau_n(L)\) is the first return of the length-\(L\)
accelerated valuation prefix of a fixed nonperiodic seed \(n\), then

\[
\boxed{
\tau_n(L)>
\frac{(L+1)\log2-\log(n+1)}{\log(3/2)}.}              \tag{P21.5}
\]

Here we used only \(B\ge L\).  Therefore

\[
\boxed{
\liminf_{L\to\infty}\frac{\tau_n(L)}L
\ge\frac{\log2}{\log(3/2)}
=1.709511\ldots .}                                    \tag{P21.6}
\]

This supersedes the \(\log_3 2=0.630929\ldots\) prefix-return constant in
P18.  P17 remains useful for powers of a displayed block and for estimates in
which no second occurrence is separately selected.  P21 uses exactly the
common ordinary cylinder on one fixed ray that the finite countermodels lack.

### P22. Surplus versus factor-complexity law on one ordinary ray

Continue with the normalized divergent tail from P2.  Put

\[
q_t=\frac{3^t}{2^{A_t}},\qquad
S_t=\log_2 q_t=t\log_2 3-A_t,
\]

and let

\[
\mathcal K:=\sup_t\frac{x_t}{q_t}<\infty.             \tag{P22.1}
\]

Finiteness follows from the convergent product in P2.  If the equal factors
in P21 occur at \(j<k\), then (P21.1) gives

\[
2^{B+1}\le |x_k-x_j|\le
\mathcal K(q_j+q_k).
\]

Hence

\[
\boxed{
\max\{S_j,S_k\}\ge B+1-\log_2(2\mathcal K).}         \tag{P22.2}
\]

This is an infinite-only recurrence law: a repeated factor of weight \(B\)
can occur on the fixed ordinary ray only after the multiplicative surplus
has reached essentially \(B\).

There is a finite-alphabet version with no bounded-valuation assumption.
Expand the orbit into shortcut states \(y_t=T^t(n)\), let \(s_t\) count its
odd shortcut inputs, and put

\[
Q_t=\frac{3^{s_t}}{2^t},\qquad R_t=\log_2Q_t.
\]

The normalized heights \(y_t/Q_t\) have the same finite supremum
\(\mathcal K\).  Equal binary parity factors of length \(L\) force their
starting states to be congruent modulo \(2^L\).  Therefore their occurrence
positions \(j<k\) satisfy

\[
\max\{R_j,R_k\}\ge L-\log_2(2\mathcal K).             \tag{P22.3}
\]

Let \(p_2(L)\) be the binary parity-factor complexity.  Among the first
\(p_2(L)+1\) starting positions, two length-\(L\) factors agree.  Since
\(R_t\le(\log_2 3-1)t\), (P22.3) gives

\[
\boxed{
p_2(L)\ge
\frac{L-\log_2(2\mathcal K)}{\log_2 3-1}.}            \tag{P22.4}
\]

Thus every divergent ordinary Collatz ray satisfies

\[
\boxed{
\liminf_{L\to\infty}\frac{p_2(L)}L
\ge\frac1{\log_2 3-1}
=1.709511\ldots .}                                    \tag{P22.5}
\]

The same proof applies to accelerated valuation complexity whenever that
complexity is finite at length \(L\), using modulus \(2^{B+1}\) and
\(B\ge L\):

\[
p_a(L)\ge
\frac{L+1-\log_2(2\mathcal K)}{\log_2 3-1}.           \tag{P22.6}
\]

In particular, P22 excludes every Sturmian or quasi-Sturmian
ray both for the binary shortcut coding and for any finite-alphabet
accelerated valuation coding, not only the characteristic Sturmian rays
treated in P20.  A surviving divergent word must have genuinely larger
linear complexity, or infinite accelerated-letter complexity.

### P23. Cross-prime return decoder and forced surplus renewal

Equation (P21.2) transfers the dyadic cylinder coincidence to the opposite
prime.  Every repeated accelerated factor satisfies

\[
\boxed{
\min\{v_3(x_{j+L}+1),L\}
=\min\{v_3(x_{k+L}+1),L\}.}                           \tag{P23.1}
\]

Indeed, (P21.3) makes the two endpoints congruent modulo \(3^L\).  Thus a
return of a factor carries its entire terminal ternary decoder, truncated at
the factor length.  This is a cross-prime recurrence identity, not a
finite-window estimate.

For a returned prefix, it also pins the next surplus renewal.  Let the
length-\(L\) prefix, of total exponent \(B\), return at shift \(d\).  Once
\(2^B>\mathcal K\),

\[
x_L\le\mathcal K\frac{3^L}{2^B}<3^L.
\]

The distinct returned endpoint is congruent to \(x_L\) modulo
\(2\cdot3^L\), so positivity forces

\[
x_{d+L}>2\cdot3^L,
\qquad
S_{d+L}>1+L\log_2 3-\log_2\mathcal K.                \tag{P23.2}
\]

Using \(S_t\le(\log_2 3-1)t\) recovers the fixed-seed return obstruction in
the form

\[
\boxed{
d>
\frac{L+1-\log_2\mathcal K}{\log_2 3-1}.}             \tag{P23.3}
\]

Unlike a generic complexity estimate, (P23.2) specifies where the large
surplus must occur: at the endpoint of the returned factor.  What remains
missing is a theorem turning the shared truncated decoder (P23.1) into a
large decoder value, rather than merely transporting whatever value was
already present.

### P24. Stabilized prefix lifts and the return-time/surplus-rate dichotomy

For all sufficiently large \(L\), the least cylinder representative of the
length-\(L\) prefix is literally the fixed seed \(n\).  Let \(B_L=A_L\), and
suppose this prefix returns at position \(d\).  The returned state is a
noncanonical lift of the same cylinder.  The normalized strict barrier gives
\(x_d>n\), so there is one integer \(t_L\ge1\)
such that

\[
\boxed{
x_d=n+t_L2^{B_L+1},
\qquad
x_{d+L}=x_L+2t_L3^L.}                                \tag{P24.1}
\]

The second identity follows either from (P21.2) or by applying the common
affine block to the first.  Thus representative stabilization does not merely
give a congruence: it transfers the same positive lift integer from the
dyadic start lattice to the ternary endpoint lattice.

Write \(\alpha=\log_2 3\).  Since

\[
B_L=\alpha L-S_L,
\]

the full-weight form of (P21.5) gives

\[
\tau_n(L)>
\frac{\alpha L-S_L+1-\log_2(n+1)}{\alpha-1}.          \tag{P24.2}
\]

Consequently, with

\[
\overline\delta:=\limsup_{L\to\infty}\frac{S_L}{L},
\]

we have the exact asymptotic tradeoff

\[
\boxed{
\liminf_{L\to\infty}\frac{\tau_n(L)}L
\ge\frac{\alpha-\overline\delta}{\alpha-1}.}          \tag{P24.3}
\]

The universal bound \(0\le\overline\delta\le\alpha-1\) recovers P21.6.
At the opposite extreme, if the critical surplus is sublinear, then

\[
\boxed{
S_L=o(L)\quad\Longrightarrow\quad
\liminf_{L\to\infty}\frac{\tau_n(L)}L
\ge\frac{\alpha}{\alpha-1}
=2.709511\ldots .}                                    \tag{P24.4}
\]

Conversely, any infinite family of prefix returns with
\(\tau_n(L)\le K L+o(L)\) forces

\[
\limsup_{L\to\infty}\frac{S_L}{L}
\ge\alpha-K(\alpha-1).                                \tag{P24.5}
\]

Hence a low-return uniformly recurrent survivor cannot remain near the
critical coefficient line: its recurrence would itself force exponential
coefficient growth.  The unresolved alternative is now explicit.  Either
prefix returns are extremely late, or the ray has positive linear surplus;
neither alternative alone forces a ternary target hit.

The exact regression `stationary_return_lattice.js` checked (P21.1)--
(P21.4) on \(682757\) equal factors from the first \(19999\) odd seeds,
through 90 accelerated steps and factor length 12.  All \(682757\) tested
pairs had distinct states.  The retained source and output hashes are

| File | SHA--256 |
| --- | --- |
| `stationary_return_lattice.js` | `E79BCA0932E5EBFBD97C461EABDAFAB34E40EAF2BFEB4B942C1D8D1AC451D062` |
| `stationary_return_lattice.out` | `1272CC24CD295B238D02103F1CD1487E5580DB6F98275AA27E0F82D6D8BC9CE6` |

### P25. Multi-return rank-one theorem and exact occurrence packing

We now compare any number of occurrences of one accelerated factor.  Fix a
valuation word \(v\) of length \(L\) and total exponent \(B\).  Let

\[
F_v(X):=\frac{3^LX+C(v)}{2^B},\qquad
\rho:=\rho(v),\qquad Z:=F_v(\rho),
\]

and put \(M:=2^{B+1}\) and \(D:=2\cdot3^L\).  If \(v\) occurs at time \(t\),
the exact cylinder formula gives one integer \(u_t\ge0\) such that

\[
\boxed{
x_t=\rho+Mu_t,\qquad x_{t+L}=Z+Du_t.}               \tag{P25.1}
\]

In particular, for any two occurrence times \(s,t\),

\[
\boxed{
\frac{x_t-x_s}{2^{B+1}}
=\frac{x_{t+L}-x_{s+L}}{2\cdot3^L}
=u_t-u_s\in\mathbf Z.}                              \tag{P25.2}
\]

For three occurrence times \(t_0<t_1<t_2\), eliminating the common affine
carry therefore gives

\[
\boxed{
(x_{t_1}-x_{t_0})(x_{t_2+L}-x_{t_0+L})
-(x_{t_2}-x_{t_0})(x_{t_1+L}-x_{t_0+L})=0.}         \tag{P25.3}
\]

Thus the multi-return determinant has rank one.  The dyadic start lattice
and the ternary endpoint lattice are two coordinates of the same lift
integer, not independent congruences.  In particular, adding a third or a
fourth occurrence gives no further divisibility of \(u_t-u_s\).

There is nevertheless an exact multiplicity bound.  Let \(I\) be a finite
set of occurrence times of \(v\), and put \(q_I^*:=\max_{t\in I}q_t\).  On a
divergent ordinary ray the states, and hence the lifts, are distinct.
Consequently

\[
\max_{t\in I}u_t-\min_{t\in I}u_t\ge |I|-1.
\]

In the stabilized-prefix case, if \(0\in I\), then \(u_0=0\), so \(R:=|I|\)
occurrences force

\[
\max_{t\in I}x_t\ge n+(R-1)2^{B+1},\qquad
\max_{t\in I}x_{t+L}\ge x_L+2(R-1)3^L.
\]

This is the exact lift growth supplied by occurrence multiplicity.  Applying
(P22.1) gives the equivalent packing bound

\[
\boxed{
|I|\le 1+\left\lfloor
\frac{\max_{t\in I}x_t-\min_{t\in I}x_t}{2^{B+1}}
\right\rfloor
\le 1+\left\lfloor\frac{\mathcal Kq_I^*}{2^{B+1}}\right\rfloor.}       \tag{P25.4}
\]

The endpoint coordinate gives the same scale, since

\[
q_{t+L}=q_t\frac{3^L}{2^B},\qquad
\frac{D}{M}=\frac{3^L}{2^B}.
\]

Indeed, the two normalized ranges in (P25.2) are exactly equal.  Thus the
factor \(3^L\) cancels rather than compounding the factor \(2^{B+1}\).

For completeness, this gives the following finite-window complexity law
with no hidden recurrence hypothesis.  Among the \(N\) accelerated starting
positions \(0\le t<N\), let \(\mathcal F_{N,L}\) be the set of observed
length-\(L\) factors, let \(p_{a,N}(L):=|\mathcal F_{N,L}|\), and put
\(q_N^*:=\max_{0\le t<N}q_t\).  Summing (P25.4) one factor class at a time
gives

\[
\boxed{
N\le\sum_{v\in\mathcal F_{N,L}}
\left(1+\left\lfloor\frac{\mathcal Kq_N^*}{2^{A(v)+1}}\right\rfloor\right)
\le p_{a,N}(L)
\left(1+\left\lfloor\frac{\mathcal Kq_N^*}{2^{L+1}}\right\rfloor\right).} \tag{P25.5}
\]

For the binary shortcut coding, define \(p_{2,N}(L)\) and
\(Q_N^*:=\max_{0\le t<N}Q_t\) in the same way.  The corresponding exact
bound is

\[
\boxed{
p_{2,N}(L)\ge
\frac{N}{1+\lfloor\mathcal KQ_N^*/2^L\rfloor}.}       \tag{P25.6}
\]

These inequalities are genuine stationary restrictions, but they do not
force a block power.  When \(q_N^*/2^L\) or \(Q_N^*/2^L\) is large, one
factor class can contain many occurrences with distinct lift integers.
Moreover, computability alone gives no useful upper bound on factor
complexity: a computable binary Champernowne word contains every binary
word and has \(p_2(L)=2^L\).  Thus a recurrence argument must use more than
computability or a general factor pigeonhole.  This is only a symbolic
stress test, not a claim that such a word is one ordinary Collatz itinerary.

### P26. Gap recurrences do not couple distinct returns

We next retain the dynamics between consecutive selected occurrences.  Let
\(t_i<t_{i+1}\) be occurrence times of the factor \(v\).  Write
\(d_i:=t_{i+1}-t_i\), and let \(g_i\) be the actual length-\(d_i\) valuation
word between them, with total exponent \(E_i\) and affine carry \(C_i\).
Substitution of (P25.1) into the transition across \(g_i\) gives

\[
\boxed{
2^{E_i}u_{i+1}-3^{d_i}u_i=h_i,\qquad
h_i:=\frac{(3^{d_i}-2^{E_i})\rho+C_i}{2^{B+1}}\in\mathbf Z.}            \tag{P26.1}
\]

For three occurrences, the two relations combine to

\[
\boxed{
2^{E_0+E_1}u_2-3^{d_0+d_1}u_0
=2^{E_0}h_1+3^{d_1}h_0.}                            \tag{P26.2}
\]

This is exactly the affine transition across the concatenated gap.  Its
right side is not a common carry eliminated by the three factor
occurrences: \(h_i\) depends on the complete word \(g_i\), and equality of
the displayed factor supplies no relation between \(h_0\) and \(h_1\).  If
\(g_0=g_1\), then the orbit word
from \(t_0\) to \(t_2\) already contains the block power \(g_0^2\), which is
the P17 situation.  If the gap words differ, even when \(d_0=d_1\), neither
(P26.1) nor (P26.2) produces a repeated affine map.  Three returns of \(v\)
therefore do not imply a forbidden power.  More generally, the pigeonhole
condition \(N>2p_{a,N}(L)\) forces some length-\(L\) factor to occur three
times, but it gives no equality between its two return words.

The finite P15 regression `multi_return_p15_stress.js` tests this exact
failure mode.  After stabilization it embeds

\[
(2,1,3,\ 2,1,4,\ 2,1,2),
\]

so \(v=(2,1)\), with \(L=2\) and \(B=3\), occurs at the equally spaced
positions \(0,3,6\).  The two length-three gap words are distinct.  The
ordinary seed is \(2^{189045}-1\), every complete prefix is a strict
barrier, the determinant (P25.3) is zero, and the terminal decoder is zero.
The two consecutive lift differences have

\[
(v_2,v_3)=(2,0)\quad\hbox{and}\quad(1,0),
\]

respectively.  Hence neither difference is divisible by the full dyadic
modulus \(2^{B+1}=16\), and neither is divisible by \(3^L=9\).  This rules
out the hoped-for finite multi-return divisibility in the strongest relevant
setting: one positive ordinary seed, stabilized representatives, strict
barriers, three occurrences, and two distinct return words.  The retained
gap inhomogeneities are \(h_0=-19\) and \(h_1=-55\), and the script checks
both instances of (P26.1) and their composition (P26.2).  The retained
certificate hashes are

| File | SHA--256 |
| --- | --- |
| `multi_return_p15_stress.js` | `F2863262728F0C2E32C1D00DF7AE0681415B7845CE170067F64EE492E49A9402` |
| `multi_return_p15_stress.out` | `E6E91346718DAC97CA0E81925E45C35A4E7A010D48DAA075ECB790D03227F9EF` |

### P27. Exact decoder recursion and the bounded-depth symbolic consequence

Put \(b_t:=v_3(x_t+1)\).  The accelerated recurrence gives the exact identity

\[
\boxed{
2^{a_t}(x_{t+1}+1)=3(x_t+1)+2^{a_t}-2.}             \tag{P27.1}
\]

Since powers of \(2\) are units at \(3\), this has two particularly rigid
consequences:

\[
a_t=1\quad\Longrightarrow\quad b_{t+1}=b_t+1,
\qquad
a_t\equiv0\pmod2\quad\Longrightarrow\quad b_{t+1}=0.                 \tag{P27.2}
\]

Also, every odd \(a_t\) gives \(b_{t+1}\ge1\).  Therefore, if
\(b_t\le D\) on a tail, then that tail contains no run \(1^{D+1}\).  The case
\(D=0\) is impossible on a strict-barrier ray: every subsequent exponent
would have to be even, hence at least \(2\), and eventually
\(A_t\ge2t-O(1)>t\log_2 3\).

This is the immediate word-local consequence of bounded decoder depth
without analyzing odd exponents at higher powers of \(3\).  In
particular, \(D=1\) still permits any word over \(\{1,2\}\) with isolated
letters \(1\), and this language has positive entropy.

### P28. Near-critical high-complexity words with decoder depth one

The preceding symbolic freedom persists arbitrarily close to the critical
coefficient line.  Put \(\beta:=\log_2 3-1\).  For every \(\epsilon>0\), choose
large integers \(\ell,c\) such that

\[
\frac12<\frac c\ell<\beta,\qquad
0<\beta-\frac c\ell<\epsilon.                       \tag{P28.1}
\]

There are two distinct words \(w_0,w_1\in\{1,2\}^{\ell}\), each beginning
and ending in \(2\), having no adjacent letters \(1\), and containing exactly
\(c\) letters \(2\).  Indeed, one may take \(c=\lfloor\beta\ell\rfloor\).
For all sufficiently large \(\ell\), the \(\ell-c\) isolated letters \(1\)
can be placed in the \(\ell-2\) interior positions in at least two ways.
Both codewords have total exponent \(\ell+c\) and satisfy

\[
\frac{3^\ell}{2^{\ell+c}}>1.                        \tag{P28.2}
\]

Choose \(K\) so that the buffer \(p:=(1,2)^K\) absorbs the largest negative
surplus of a proper prefix of either codeword.  Every prefix of \(p\) is a
strict barrier, every complete codeword has the positive multiplier
(P28.2), and hence every prefix of

\[
p\,\varphi(z),\qquad \varphi(0):=w_0,\qquad
\varphi(1):=w_1,                                    \tag{P28.3}
\]

is a strict barrier for every finite or infinite binary driver \(z\).
Moreover,

\[
\lim_{t\to\infty}\frac{S_t}{t}
=\beta-\frac c\ell\in(0,\epsilon)                  \tag{P28.4}
\]

for every infinite driver.  If an exponent \(2\) occurs immediately before
(P28.3), then (P27.2) shows that every subsequent decoder depth is at most
\(1\).

The construction also preserves high complexity.  If the driver contains
every binary word, then aligned factors give

\[
\boxed{
p_a(\ell m)\ge2^m,\qquad
p_2((\ell+c)m)\ge2^m\quad(m\ge1).}                  \tag{P28.5}
\]

The second inequality uses the shortcut encoding \(a\mapsto10^{a-1}\).
Its two codewords have the same length \(\ell+c\) and remain distinct.
Thus strict barriers, unbounded arbitrarily small linear surplus, decoder
depth one, and exponential factor complexity are mutually compatible at
the symbolic level.

This symbolic construction has an exact finite ordinary realization.  For
a finite driver \(z\), apply P15 to

\[
v=(2,p,\varphi(z),2).                                \tag{P28.6}
\]

The resulting positive seed has a global strict-barrier prefix, its cylinder
representative has stabilized before \(v\), and every endpoint after the
first displayed \(2\) in (P28.6) has decoder depth at most \(1\).  A de
Bruijn driver of order \(m\) realizes all \(2^m\) aligned factors in (P28.5).
The terminal decoder is zero.  As in P15, the ordinary seed and the stationary
constant \(\mathcal K\) depend on the finite driver, so this does not construct
one infinite ordinary counterexample.

The regression `bounded_decoder_complexity.js` uses

\[
\begin{aligned}
w_0&=(2,1,2,1,2,1,2,1,2,1,2,2),\\
w_1&=(2,1,2,1,2,1,2,1,2,2,1,2),
\end{aligned}
\]

with \((\ell,c)=(12,7)\).  Here
\(3^{12}-2^{19}=7153\) and
\(\beta-7/12=0.001629167\ldots\).  An order-\(10\) de Bruijn driver produces
an encoded accelerated word of length \(12396\).  The exact scan finds
\(12277\) distinct length-\(120\) accelerated factors and \(19438\) distinct
length-\(190\) shortcut factors, the maximum possible in the respective
finite windows.  It also checks the universal buffer barrier, decoder bound,
exact suffix cylinder, and P15 residue-class hypothesis.  The retained hashes
are

| File | SHA--256 |
| --- | --- |
| `bounded_decoder_complexity.js` | `56960B9E93D0430B49923C71A88C005D08ACFD1B878F99F81EC20B60A9A3C0FC` |
| `bounded_decoder_complexity.out` | `9DBC90ED2E7FB3070DFD971A99CB47229BBB310F755676982691BF3B7087EFAF` |

## REFUTED (explicit counterexample)

### R1. A bounded-rate defect cannot be patched locally

For every \(r\ge2\),
\[
w_r=(1,2,1^{r-2})
\]
is a non-all-ones strict barrier word and
\[
D(w_r)=13\cdot3^{r-2},
\qquad v_3(D(w_r))=r-2.                        \tag{R1.1}
\]
The barrier is immediate at depth two (\(2^3<3^2\)) and becomes strictly
easier after each appended \(1\).  Also, appending a \(1\) sends \(D\) to
\(3D\), proving (R1.1) from \(D(1,2)=13\).

Every finite positive valuation word has an ordinary positive realization, and
suffix locality then gives \(v_3(x_{j+r}+1)=r-2\) for every realization of
\(w_r\).  Consequently a proposed theorem of the form
"a barrier block with \(v_3(x_{j+r}+1)\ge r-O(1)\) can be completed locally to
a target-one block" is false already with constant defect \(2\).  P5 is sharp.

### R2. Endpoint valuation is not bounded by the terminal run of ones

The ordinary orbit segment
\[
7\xrightarrow{1}11\xrightarrow{1}17
\]
has \(v_3(17+1)=2\), while the final exponent-one run inside the last one-step
block has length only \(1\).  Thus high endpoint valuation need not have been
created solely by the displayed trailing run of ones.  Any recurrence argument
must retain the incoming \(3\)-adic state.

### R3. Barrier, largeness, and logarithmic length do not force recurrence

For every \(N\ge1\), the positive seed
\[
Y_N=2^{3N+1}-5
\]
has exact first \(2N\) exponents \((1,2)^N\), every prefix is a strict barrier,
and
\[
U^{2N}(Y_N)=2\cdot3^{2N}-5,
\qquad
v_3\bigl(U^{2N}(Y_N)+1\bigr)=0.                \tag{R3.1}
\]
Thus even blocks whose starts grow exponentially with their length can stay as far
as possible from the target residue.  Any claim using only an isolated barrier
block, its length, and an Archimedean lower bound on its start is false.  The seed
changes with \(N\), so the unresolved input is precisely coherence along one fixed
ordinary orbit.

### R4. Even the minimal Archimedean scale does not force bounded deficit

For every \(r\ge2\), choose
\[
u_r=\begin{cases}1,&r\text{ odd},\\3,&r\text{ even},\end{cases}
\qquad
Y_r=2^ru_r-1.
\]
Then \(Y_r\) has exact valuation word
\[
w_r=(1^{r-1},2).                                    \tag{R4.1}
\]
Indeed, after the first \(r-1\) exponent-one steps the state \(y\) satisfies
\[
y+1=2\cdot3^{r-1}u_r,
\]
and
\[
3y+1=2(3^ru_r-1).
\]
The definition of \(u_r\) makes \(3^ru_r\equiv3\pmod4\), so the last displayed
factor has exact valuation \(2\).  The endpoint is
\[
X_r=\frac{3^ru_r-1}{2},
\qquad
X_r+1=\frac{3^ru_r+1}{2},
\]
and therefore
\[
\boxed{v_3(X_r+1)=0.}                               \tag{R4.2}
\]

Every prefix is a strict barrier; at full length this is
\(2^{r+1}<3^r\), true for \(r\ge2\), and earlier prefixes are all ones.
But the starts are already at the smallest possible exponential scale allowed by
P10: \(Y_r=2^r-1\) or \(3\cdot2^r-1\).  Hence bounded-deficit recurrence cannot be
deduced from positivity, the complete prefix barrier, and even a two-sided
Archimedean condition \(x_j\asymp2^r\).  A proof must use coherence across many
blocks of one fixed ordinary orbit (and ultimately global leastness or the binary
finite-support constraint).

### R5. Finite coherent compactness cannot force synchronization

P13 refutes every proposed principle of the following form: "after a sufficiently
large finite number of coherent tail-record barrier blocks, positivity and cylinder
compatibility force a bounded-deficit endpoint."  For every prescribed finite
number of blocks, one positive ordinary seed realizes all of them and every chosen
endpoint has valuation zero.  The compatible cylinders even have an infinite
\(2\)-adic branch.

What fails in the limit is not compatibility but ordinary lifting: the least
positive representatives acquire nonzero high binary lifts forever instead of
stabilizing.  Therefore a valid pigeonhole, entropy, automata, or compactness proof
must quantitatively use eventual stabilization in (P12.3).  Merely retaining all
finite congruences, even together with positivity at every finite stage and
tail-record barriers, is insufficient.

### R6. Binary innovation and ternary deficit admit no pointwise inequality

Both directions fail in sharp parametric families.

* If \(r\) is odd, then
  \(w=1^{r-1}\), \(v=(2)\) has
  \[
  \rho(w)=\rho(wv)=2^r-1,
  \]
  so the extension innovation is exactly zero.  Nevertheless
  \(wv=(1^{r-1},2)\) is a strict barrier and
  \(v_3(D(wv))=0\), giving the maximum possible deficit \(r\).
* For \(w=1^t\), \(v=1^s\),
  \[
  \rho(wv)-\rho(w)=2^{t+1}(2^s-1).
  \]
  Thus the innovation block is the maximum value
  \(\kappa=2^s-1\), while \(D(wv)=3^{t+s}\) is an exact full-depth
  ternary hit.

So neither a zero/small binary innovation forces a ternary hit nor a long
ternary hit forces a zero/small innovation.

### R7. No finite stabilized-window uncertainty principle

P15 refutes the stronger assertion that a *long run* of zero innovations,
strict barrier control, and new multiplier surplus must eventually force a
nontrivial ternary hit.  For every \(L\), one positive seed supplies a strict
barrier word with \(L+3\) consecutive zero accelerated innovations
(\(L+6\) zero binary lift bits), a stabilized suffix whose own multiplier
tends to infinity with \(L\), and terminal valuation zero.

This does not produce one positive seed with an infinite such tail: both the
seed \(2^r-1\) and the location of its final nonzero binary digit move with
\(L\).  It proves that the irreducible input is uniform coherence on one
infinite ordinary ray.  No theorem based on a bounded window after
stabilization, even if the window length and its fresh surplus tend to
infinity across finite examples, can establish synchronization.

As non-parametric stress tests, an exact scan of the first \(10{,}000{,}000\)
odd seeds found the following.

* For \(n=1126015\), the first \(140\) accelerated prefixes are strict
  barriers.  Its representative stabilizes at depth \(16\)
  (\(A_{16}=20\)); at depth \(131\), after \(115\) consecutive zero
  accelerated innovations (and \(178\) zero binary lift bits), the endpoint
  is \(892257277\) and has ternary valuation zero.
* The seed \(n=150015\) gives a near-critical example.  At depth \(53\),
  \[
  A_{53}=84,\qquad
  q_{53}=\frac{3^{53}}{2^{84}}=1.002090314\ldots,
  \qquad x_{53}=150331,
  \]
  while every prefix is a strict barrier and hence every intermediate value
  exceeds \(n\).  Its representative stabilized at depth \(15\); the next
  \(38\) accelerated innovations (64 binary lift bits) are zero, yet
  \(v_3(x_{53}+1)=0\).

No cap was hit.  Thus barrier height almost on the critical line, endpoint
near the starting seed, finite leastness, and long binary stabilization can
coexist with the worst ternary deficit.  The retained source hashes are

| File | SHA--256 |
| --- | --- |
| stabilized_suffix_embedding.js | 4F4B6B6378F83DC5222E09029A0D74300D75F4A7FB6FFF5CC96AC25B8ABB6C5E |
| binary_ternary_scan.js | F478B5832789FDC488E7E01B6AAFB0EDD74AD887A75E648B266F19D1911DE667 |
| stationary_barrier_probe.js | 0C72CDE8F22BF4F661A4ACB261F9DF378625B0380910B39F32F73F6747206C17 |

### R8. Repeated blocks are not forbidden at unrestricted moving starts

The dependence on the actual start value in P17 cannot be removed.  For
every \(K\), the positive seed
\[
y_K=2^{K+1}-1
\]
has exact word \(1^K\).  Here the fixed block is \(v=(1)\),
\[
\Lambda_v(y_K)=-(y_K+1)=-2^{K+1},
\]
and the exponentially growing start supplies precisely the binary
divisibility required by P17.2.

More strongly, fix any finite list of desired block powers.  Apply P15 with
a suffix beginning in \(2\), containing that entire list, and ending in an
even exponent.  One positive seed then realizes all listed powers after its
binary representative has stabilized, every global prefix can be made a
strict barrier, and the terminal ternary valuation is zero.  Thus no finite
number of repeated-block observations forces a contradiction.  P17 becomes
an infinite theorem only when the occurrences belong to the same fixed
ordinary ray and their start values or positions obey a quantitative
recurrence bound.

### R9. Why finite-factor universality does not refute the return lattice

P21--P24 deliberately retain the fixed-seed constant \(\mathcal K\).  In the
P15 construction the seed is \(n_r=2^r-1\), so

\[
\log_2(2\mathcal K)\ge\log_2(2n_r)>r.
\]

The construction is free to take \(r\) larger than the entire prescribed
finite suffix.  The right sides of (P21.5), (P22.2), and (P22.4) are then
vacuous on that suffix.  Thus P15 can still embed any finite factor, any
finite list of returns, and arbitrarily much finite multiplier surplus.  It
cannot keep \(\mathcal K\) fixed while the tested factor length tends to
infinity.

The coherent branch in P13 evades the new lemmas in the complementary way.
Its least representatives \(n_K\) tend to infinity, and the inverse-limit
seed is not a nonnegative ordinary integer.  There is no one positive real
orbit and no finite fixed \(\mathcal K\) to which (P22.1) applies.  Every
finite truncation separately satisfies the lattice inequalities with its own
growing constant.

Consequently P21--P24 pass both established regression families.  They are
genuinely stationary, infinite-ray restrictions, not forbidden-factor or
bounded-window assertions.  They still do not prove synchronization: a
binary word can have complexity above \(1.709511L\), long return times, no
large powers, and low transported decoder values in (P23.1).

### R10. Three returns do not create cross-prime independence

P25 refutes the proposed determinant amplification.  For every number of
occurrences of one factor, all start-endpoint pairs lie on the same affine
line parametrized by a single integer lift.  Therefore the factors
\(2^{B+1}\) and \(3^L\) cannot be multiplied to obtain a smaller occurrence
capacity.  P26 further shows that the transitions between successive lifts
have inhomogeneous terms which depend on the complete return words; equality
of the repeated factor imposes no relation between them.  If the complete
return words agree, the orbit already displays a block power, so the argument
has returned to P17 rather than produced a new multi-return mechanism.

The P15 certificate in P26 makes this a finite no-go theorem, not merely an
absence of proof.  It has three equally spaced occurrences after
stabilization, distinct return words, no additional dyadic or ternary
divisibility in either lift difference, strict barriers, and terminal
ternary valuation zero.  Thus any valid infinite argument must control the
sequence of complete return words, or the inhomogeneous integers \(h_i\) in
(P26.1), uniformly on one fixed ordinary ray.

### R11. Bounded decoder depth does not collapse finite complexity

P28 refutes every finite or purely symbolic assertion that bounded decoder
depth must force low factor complexity, bounded surplus, or a forbidden
power.  Its code family has decoder depth at most \(1\), surplus rate as
small and positive as desired, and exponential accelerated and shortcut
complexity.  Every finite part can occur after cylinder stabilization inside
one ordinary strict-barrier prefix by P15.

The quantifier which P28 does not supply is one fixed ordinary seed for all
driver lengths.  Its P15 seeds and constants \(\mathcal K\) move with the
de Bruijn order.  Likewise, an infinite high-complexity driver defines a
coherent \(2\)-adic valuation branch, but P12 gives no reason for its least
positive representatives to stabilize.  Hence the only remaining route
from bounded decoder depth to a contradiction must use ordinary
stabilization uniformly at unbounded factor lengths.  Neither the decoder
automaton, factor complexity, surplus rate, nor any bounded collection of
return words can do so separately.

## CONDITIONAL

### C1. Normalized endpoint synchronization

If every globally least unbounded orbit, normalized at the global maximum of \(H\),
satisfies
\[
\exists r>v_2(x_{j_*}+1)-1:\quad v_3(x_{j_*+r}+1)\ge r,
\]
then no divergent Collatz orbit exists.

This is only a restatement of the irreducible rate-matched endpoint problem, not a
proof of it.

### C2. Improved normalized endpoint synchronization

By P5, C1 can be weakened by one digit.  It suffices to prove
\[
\boxed{
\exists r>v_2(x_{j_*}+1)-1:\quad
v_3(x_{j_*+r}+1)\ge r-1.
}                                                    \tag{C2.1}
\]
The length restriction only ensures the prefix is not all ones.  The sharp family
R1 shows that \(r-2\) cannot replace \(r-1\) by any word-local argument.

### C3. Deficit-two synchronization at a fixed normalized start

P8--P9 permit the further, global weakening
\[
\boxed{
\exists r>R_2(x_{j_*}):\quad
v_3(x_{j_*+r}+1)\ge r-2.
}                                                    \tag{C3.1}
\]
Indeed, P8 would put the prefix in one of two classified languages, and P9
excludes both at that length.  P10 shows that this criterion concerns only a finite
window and cannot be forced by an unbounded-recurrence argument at the fixed start.

### C4. Deficit-two synchronization with moving starts (current sharp target)

It is enough to produce a tail-record start \(j\) and a length \(r\) such that
\[
\boxed{
r>R_2(x_j),\qquad v_3(x_{j+r}+1)\ge r-2.
}                                                    \tag{C4.1}
\]
The tail-record condition supplies every prefix barrier; P8--P9 then give the
contradiction.  More generally the start need only be a strict maximum of \(H\)
over the finite interval \([j,j+r]\).

### C5. Deficit-three synchronization with moving starts (weakest certified target)

Let
\[
\mathcal S_3=\{\varnothing,112,121,1113\}.
\]
For a block start \(j\), retain only those stems \(s\in\mathcal S_3\) that match
the first \(|s|\) exponents, and set
\[
R_3(x_j)=
\max_s\left(|s|+v_2(x_{j+|s|}+1)-1\right).          \tag{C5.1}
\]
This is exactly the largest length to which any P11 template can match at that
fixed start.  Therefore it suffices to find a finite barrier block satisfying
\[
\boxed{
r>R_3(x_j),\qquad v_3(x_{j+r}+1)\ge r-3.
}                                                    \tag{C5.2}
\]
The start may again be any tail-record time, or any finite-window strict maximum
of \(H\).  This is the weakest endpoint synchronization statement backed by a
completed finite-language certificate in this report.

### C6. Return-lattice HSCI (equivalent infinite-only gate)

Under the audited normalization, HSCI is equivalent to the nonexistence of a
single positive ordinary seed whose normalized future simultaneously has:

1. the strict coefficient barrier and \(S_t\to\infty\);
2. one finite stationary height \(\mathcal K\) as in (P22.1);
3. binary parity complexity satisfying (P22.4) at every length;
4. the dyadic/ternary return lattice (P21.1)--(P21.3), including the
   transported decoder (P23.1) and the forced renewal (P23.2) at every
   sufficiently long returned accelerated prefix, with stabilized lift
   transfer (P24.1); and
5. the rank-one multi-return and occurrence-packing laws (P25.1)--(P25.6),
   together with the nonautonomous return-word recurrence (P26.1).

Indeed, an HSCI failure gives one ordinary seed by finite-support lifting;
P2 and P21--P26 prove all five additional properties.  Conversely, the
ordinary seed together with the barrier and \(S_t\to\infty\) is already an
HSCI counterexample because its inverse-carry innovations eventually vanish.
Thus this formulation is logically equivalent to the old gate, but strictly
narrows the symbolic survivors: finite-factor countermodels, nonordinary
\(2\)-adic branches, parity words of complexity slope below
\(1.709511\ldots\), and returns without the cross-prime decoder have all been
removed.

A proof of HSCI may therefore start from this complete return-lattice package.
The remaining implication is to force one transported value in (P23.1) to
reach depth \(L-O(1)\), or to turn the forced surplus renewals (P23.2) into a
C5 endpoint.  No finite-window version of that implication is valid by R9.

### C7. Fixed-seed bounded-decoder complexity collapse (missing lemma)

The sharp localized statement left by P27--P28 is the following.  Let \(n\)
be one fixed positive ordinary seed whose normalized accelerated ray has all
strict prefix barriers, \(S_t\to\infty\), and finite stationary height
\(\mathcal K\).  If

\[
\exists D,T\quad\forall t\ge T:\quad v_3(x_t+1)\le D,                 \tag{C7.1}
\]

then prove

\[
\boxed{
\liminf_{L\to\infty}\frac{p_2(L)}L
<\frac1{\log_2 3-1}.}                              \tag{C7.2}
\]

Equations (C7.1)--(C7.2), if established, immediately contradict P22.5 and
rule out every divergent ray with globally bounded decoder depth.  The
ordinary fixed-seed hypothesis in this lemma is essential: P28 satisfies all
listed symbolic conclusions, with exponential rather than linear
complexity, on arbitrarily long stabilized finite windows with moving
seeds.  This lemma is not yet proved, and it would still leave the case in
which \(v_3(x_t+1)\) is unbounded but remains far below the rate required by
C5.

## REMAINING

1. Find a mechanism using global leastness/stationary inverse fibers that forces C5;
   isolated barrier blocks cannot do this because periodic negative-shadow cylinders
   furnish arbitrarily long countermodels with changing seeds.
2. P6 rules out same-depth descent from an all-ones block.  Determine whether extra
   inverse depth or the preceding actual prefix can force a smaller ancestor.
3. Stress-test proposed local statements about (i) minimal inverse ancestors of
   \(3^rt-1\), (ii) long all-ones runs, and (iii) endpoint \(3\)-adic valuations.
4. P9 excludes the sharp family at unbounded nested lengths from the fixed normalized
   start.  At *varying* starts, arbitrarily long occurrences are equivalent to
   arbitrarily long runs of exponent \(1\) preceded by \((1,2)\); no global theorem
   presently excludes those runs on a divergent orbit.
5. If rate-\((r-2)\) synchronization is inaccessible, seek a quantitatively weaker
   endpoint recurrence plus a rigorous *global* completion lemma.  R1 rules out a
   purely word-local completion from defect two.
6. P14--P15 show that neither eventual-zero binary lifting nor arbitrarily long
   finite stabilized windows interact pointwise with terminal ternary valuation.
   A viable theorem must use infinitely many surplus renewals on one fixed
   ordinary ray; the location of the last nonzero binary digit cannot be allowed
   to move with the test word.
7. P22 excludes every binary parity stream with asymptotic factor-complexity
   slope below \(1/(\log_2 3-1)=1.709511\ldots\).  In particular all Sturmian
   and quasi-Sturmian parity tails are now excluded, whether or not they are
   characteristic.  The surviving low-complexity case must already have slope
   at least this constant; finite recurrence alone remains insufficient by P13,
   P15, and R9.
8. P17 and P21 exclude fixed-block powers which recur too early and raise the
   fixed-prefix return quotient from \(\log_3 2\) to
   \(\log2/\log(3/2)=1.709511\ldots\).  P23 further transports the endpoint
   ternary decoder and pins a large surplus renewal at every sufficiently long
   prefix return.  P24 raises the return quotient to \(2.709511\ldots\) when
   the surplus is sublinear, and otherwise forces positive linear surplus.  A
   surviving ray is aperiodic, power-poor, has high linear or superlinear
   complexity, and keeps all returned decoder values below their factor
   lengths.
9. The sharpened infinite-only gate is to show that the return lattice in P23
   cannot transport low truncated decoders forever.  It would suffice to prove
   that the high-complexity return graph forces one prefix return with
   \(v_3(x_L+1)\ge L-O(1)\), or directly forces a C5 block at one renewal.
   R9 shows that this cannot follow from any bounded collection of factors: the
   argument must keep the one fixed \(\mathcal K\) across unbounded lengths.
10. P25--P26 exhaust the divisibility available from several occurrences of
    one factor.  The two endpoint lattices have rank one, and factor equality
    imposes no relation on the return-word affine terms \(h_i\).  A further
    recurrence attack must prove a uniform restriction on the complete return
    words or on the sequence \((h_i)\); factor pigeonhole and three-return
    determinants alone cannot supply it.
11. P27 reduces bounded decoder depth to a run-length restriction, but P28
    shows that this restriction supports near-critical positive surplus and
    exponential complexity.  Prove C7 by exploiting eventual stabilization
    of the least cylinder representative for one fixed seed.  Any proof that
    applies only to a finite driver, a finite-state decoder automaton, or a
    nonordinary coherent \(2\)-adic branch is ruled out by R11.
