model: GPT-5.6 Pro (gpt-5-6-pro)
round: 97
approach: 92 -- Branch-and-bound search for a divergent exponent word
front: disproof
sent: 2026-08-17T20:49:02Z
worked: Worked for 61m 4s
sha256: a8e66ff36787cd16d7a657ab077702c0b7f74b5b363fd120b78160c6b010daba
chars: 11392

---# Outcome

**The branch-and-bound attack did not produce a disproof of the Collatz conjecture.** It found no positive integer with an indefinitely surviving divergent exponent word. Claiming a disproof from the finite output would therefore be false.

It did produce a stronger exact finite result than the project’s earlier \(2^{28}\) barrier search:

\[
\boxed{\text{Every }1<n<2^{36}\text{ violates the coefficient barrier by step }547.}
\]

Equivalently, for every such \(n\), there is some \(1\le k\le547\) for which

\[
3^{s_k(n)}<2^k,
\]

where \(s_k(n)\) is the number of odd shortcut iterates before time \(k\).

The complete source, outputs, survivor tables, independent verifier, and machine-readable certificate are retained in the bundle linked below.

## 1. Why this is the right divergent-orbit search

Use the shortcut map

\[
T(x)=
\begin{cases}
x/2,&x\equiv0\pmod2,\\[1mm]
(3x+1)/2,&x\equiv1\pmod2.
\end{cases}
\]

For \(x_k=T^k(n)\), define

\[
\varepsilon_k=x_k\bmod2,\qquad
s_k=\sum_{i=0}^{k-1}\varepsilon_i,\qquad
q_k=\frac{3^{s_k}}{2^k}.
\]

The search target is a positive integer \(n>1\) satisfying

\[
q_k\ge1\qquad(k\ge0).
\tag{1}
\]

This is exactly the divergent-orbit alternative. In one direction, the correction-factor identity gives \(x_k\ge n\); repetition is impossible because any positive cycle has multiplicative coefficient below one, so the orbit must tend to infinity. Conversely, the known sparsity estimate for a divergent orbit makes its reciprocal sum finite, forcing the additive correction product to converge and \(q_k\to\infty\). Shifting the orbit to a global minimum of \(q_k\) then gives (1). fileciteturn12file0L28-L83 The external sparsity input originates in the work of Garcia and Tal. citeturn474704search1

Thus a seed satisfying (1) would really be a Collatz counterexample, not merely a long numerical excursion.

## 2. Exact cylinder recursion

For a binary parity word

\[
w=(\varepsilon_0,\ldots,\varepsilon_{k-1}),
\qquad
s_j=\sum_{i<j}\varepsilon_i,
\]

define

\[
C_0=0,\qquad
C_{j+1}=3^{\varepsilon_j}C_j+\varepsilon_j2^j.
\]

The exact affine identity is

\[
2^kT^k(n)=3^{s_k}n+C_k.
\tag{2}
\]

It follows that \(w\) determines one seed residue

\[
n\equiv
-3^{-s_k}C_k\pmod{2^k}.
\tag{3}
\]

Suppose a search node stores

\[
(k,s,\rho,x,p),
\qquad
p=3^s,\qquad
x=T^k(\rho).
\]

Lifting the seed representative by one binary digit gives

\[
T^k(\rho+b2^k)=x+b3^s.
\tag{4}
\]

For a desired next parity \(\varepsilon\), there is exactly one lift bit:

\[
b=(x\bmod2)\mathbin{\mathrm{xor}}\varepsilon.
\tag{5}
\]

The child state is therefore obtained from

\[
\rho'=\rho+b2^k,\qquad y=x+b3^s,
\]

and

\[
x'=
\begin{cases}
y/2,&\varepsilon=0,\\[1mm]
(3y+1)/2,&\varepsilon=1.
\end{cases}
\tag{6}
\]

It is retained precisely when

\[
3^{s+\varepsilon}\ge2^{k+1}.
\tag{7}
\]

Every decision in the implementation uses exact integer arithmetic. The threshold sequence

\[
\min\{s:3^s\ge2^k\}
\]

is computed with arbitrary-precision integers, not logarithmic floating-point comparisons.

### Why the bounded search is exhaustive

Fix \(N=2^B\). At depth \(B\), each parity cylinder has exactly one representative \(\rho\in[0,N)\). Hence the depth-\(B\) frontier contains every seed below \(N\) that can survive the first \(B\) inequalities.

At later depths,

\[
\rho_{k+1}=\rho_k+b_k2^k.
\]

Since \(2^k\ge N\), the same seed can remain below \(N\) only when \(b_k=0\). Its continuation is therefore deterministic. This proves that the search covers every \(n<N\); it is not sampling exponent words.

## 3. Certified computation

The direct and branch-based implementations agree on all \(8{,}388{,}607\) odd seeds below \(2^{24}\):

\[
\max_{n<2^{24}}\bigl(\tau(n)-1\bigr)=286,
\qquad
n=13{,}421{,}671.
\]

The implementation also reproduces the project’s previous \(2^{28}\) result exactly:

\[
3{,}524{,}586
\]

depth-\(28\) barrier cylinders, with record

\[
n=217{,}740{,}015,\qquad \tau(n)=395.
\]

For the new \(B=36\) run:

\[
N=2^{36}=68{,}719{,}476{,}736,
\]

\[
\#\{\text{depth-36 barrier cylinders}\}
=
527{,}682{,}754.
\]

The deterministic continuations performed

\[
9{,}419{,}649{,}459
\]

post-frontier shortcut steps. There were 271 transitions from 64-bit to 128-bit arithmetic and no transition beyond 128 bits. The retained run used five cores and completed in about 23 seconds; runtime is not part of the theorem.

The result is

\[
\boxed{
\max_{1<n<2^{36}}\bigl(\tau(n)-1\bigr)=546
}
\]

and the least record seed is

\[
\boxed{n=12{,}235{,}060{,}455}.
\]

Exactly two seeds below \(2^{36}\) survive through depth \(546\), and none survives through depth \(547\).

This search does not extend the ordinary Collatz verification limit: published convergence verification already reaches \(2^{71}\). Its significance is that it tests the much sharper all-prefix coefficient barrier, which is exactly tied to the divergent-orbit alternative. citeturn474704search0

## 4. Minimum-seed staircase

Define

\[
M_K=
\min\left\{
n>1:
3^{s_j(n)}\ge2^j
\text{ for every }0\le j\le K
\right\}.
\tag{8}
\]

The sequence \(M_K\) is nondecreasing, and a divergent barrier orbit exists exactly when \((M_K)\) is bounded, equivalently eventually constant. fileciteturn13file0L45-L57

The new computation determines these global jump points over \(36\le K\le546\):

| First depth \(K\) | \(M_K\) |
|---:|---:|
| 36 | 27 |
| 59 | 703 |
| 81 | 10,087 |
| 105 | 35,655 |
| 135 | 270,271 |
| 164 | 362,343 |
| 165 | 381,727 |
| 173 | 626,331 |
| 176 | 1,027,431 |
| 183 | 1,126,015 |
| 224 | 8,088,063 |
| 246 | 13,421,671 |
| 287 | 20,638,335 |
| 292 | 26,716,671 |
| 298 | 56,924,955 |
| 308 | 63,728,127 |
| 376 | 217,740,015 |
| 395 | 1,200,991,791 |
| 398 | 1,827,397,567 |
| 433 | 2,788,008,987 |
| 447 | 12,235,060,455 |

At the next depth,

\[
\boxed{M_{547}\ge2^{36}=68{,}719{,}476{,}736.}
\tag{9}
\]

This is the opposite of the stabilization needed for a disproof. It does not prove that \(M_K\to\infty\), but it establishes another substantial upward jump.

## 5. Exact audit of the record

For

\[
n=12{,}235{,}060{,}455,
\]

the barrier holds through step \(546\). At that time,

\[
s_{546}=345,
\qquad
T^{546}(n)=21{,}481{,}339{,}826,
\]

and

\[
3^{345}>2^{546}.
\]

The next iterate is

\[
T^{547}(n)=10{,}740{,}669{,}913,
\]

while the odd count remains \(345\), so

\[
3^{345}<2^{547}.
\]

Thus

\[
\tau(n)=547.
\]

The exact coefficient gaps retained in the certificate are

\[
3^{345}-2^{546}
=
174075849720713342537733271731674014848685475069675301100890245774612056273356147068220910679532159520635770549780943615839121318150617116142115070863916669564738979,
\]

and

\[
2^{547}-3^{345}
=
56268536559898312262166299861848256325443017387382830513868439543114027857024031892113972448987052365440180074655326214469141903890691027935120906396379719818158685.
\]

The first numerical descent below the seed is also at step \(547\). The orbit’s maximum is

\[
518{,}649{,}180{,}546{,}968
\]

at shortcut step \(346\), and it reaches \(1\) after \(739\) shortcut steps.

### Accelerated exponent data

For

\[
U(x)=\frac{3x+1}{2^{v_2(3x+1)}},
\]

the corresponding valuation word first fails its coefficient barrier at accelerated time \(345\). Its cumulative exponents satisfy

\[
A_{344}=545,
\qquad
A_{345}=547,
\]

with

\[
\frac{3^{344}}{2^{545}}>1,
\qquad
\frac{3^{345}}{2^{547}}<1.
\]

The exact endpoint is

\[
U^{345}(n)=10{,}740{,}669{,}913.
\]

For an accelerated word with carry recurrence

\[
C_{j+1}=3C_j+2^{A_j},
\]

the affine identity is

\[
2^{A_t}U^t(n)=3^tn+C_t.
\tag{10}
\]

The record’s exact start and endpoint congruences are

\[
n\equiv12{,}235{,}060{,}455\pmod{2^{548}},
\]

and

\[
U^{345}(n)
\equiv10{,}740{,}669{,}913
\pmod{3^{345}}.
\]

Thus this candidate passes the finite \(2\)-adic start test and \(3\)-adic endpoint test perfectly: both least representatives are the actual positive start and endpoint. It still fails the real drift inequality. This is a concrete demonstration that finite \(2\)-adic/\(3\)-adic compatibility is necessary but not sufficient.

That distinction agrees with the recent exponent-code diagnostic literature, which explicitly treats the \(2\)-adic, \(3\)-adic, and real conditions as search diagnostics rather than a verification or proof method. citeturn770447view0

## 6. Why the \(3\)-adic condition cannot close the search

For a valuation word \(a_0,\ldots,a_{t-1}\), the exact endpoint residue is

\[
U^t(n)\equiv2^{-A_t}C_t\pmod{3^t}.
\tag{11}
\]

A condition such as

\[
3^r\mid U^t(n)+1
\]

is completely controlled by the final \(r\) valuations; the project’s suffix-locality theorem proves this at every level. fileciteturn13file0L89-L137

But a hypothetical divergent orbit is not known to satisfy a synchronized target-\(1\) congruence. Therefore, pruning every branch that lacks such a congruence would be logically unsound.

The project’s all-depth negative-shadow theorem closes the constrained target-\(1\) subproblem, leaving only all-ones words, but it explicitly does not establish the required synchronization with a positive divergent orbit. fileciteturn10file10L841-L889

## 7. Why no finite surviving word is a disproof

Every finite exponent word has positive realizations. A word of length \(10^6\) would still be only finite evidence unless one fixed seed were proved to continue forever.

An eventually periodic barrier word also cannot provide the missing closure. If a period has length \(t\), total exponent \(A\), and positive carry \(C\), its periodic seed would satisfy

\[
(2^A-3^t)\xi=C.
\tag{12}
\]

The barrier condition gives \(2^A<3^t\), hence

\[
\xi<0.
\]

Such a periodic survivor is a negative \(2\)-adic shadow, not a positive ordinary starting integer. A genuine divergent certificate must therefore be nonperiodic and accompanied by an all-depth invariant.

## 8. Exact remaining condition for a disproof

A disproof by Approach 92 now reduces to constructing any one of the following equivalent objects:

\[
\exists n>1\quad
3^{s_k(n)}\ge2^k
\quad\text{for every }k;
\]

a bounded sequence \((M_K)\);

an eventually constant sequence \((M_K)\); or

an infinite cylinder branch whose lift bits are eventually zero and whose coefficient inequalities hold at every depth.

The computation produced none of them. The certified evidence instead gives the growing lower bound (9).

A separate \(2^{37}\) exploratory run was interrupted by the much larger cost of trajectories leaving 64-bit range. It is deliberately excluded from all certified claims.

# Files

- [Complete Approach 92 certificate bundle](sandbox:/mnt/data/collatz_approach92_bundle.zip)
- [Full mathematical report](sandbox:/mnt/data/collatz_approach92_report.md)
- [Exact C++ branch-and-bound source](sandbox:/mnt/data/collatz_branch_bound.cpp)
- [Independent Python verifier](sandbox:/mnt/data/verify_collatz_branch_bound.py)
- [Machine-readable certificate](sandbox:/mnt/data/collatz_branch_bound_certificate.json)
- [Complete \(B=36\) survivor table](sandbox:/mnt/data/collatz_branch_bound_B36_survivors.csv)

The bundle SHA-256 is

```text
2ec768f28971ec4955f69eeee94ac385829fc7eff651091456cde7826fc70c0f
```

**Final verdict:** Approach 92 yields a rigorous finite exclusion and a sharper minimum-seed lower bound, but not a divergent exponent word and therefore not a disproof of the Collatz conjecture.