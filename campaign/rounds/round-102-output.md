model: GPT-5.6 Pro (gpt-5-6-pro)
round: 102
approach: 97 -- Extreme-trajectory anomaly detection
front: disproof
sent: 2026-08-18T02:07:33Z
worked: Worked for 57m 53s
sha256: 2e8514793f6f9930da78c1945258e2eddc0250672789c55407dced3864cf27b1
chars: 13319

---# Outcome

I did **not** obtain a valid disproof of the Collatz conjecture. No divergent positive-integer orbit, nontrivial positive cycle, or finite invariant proving nontermination was found. The anomaly-detection program instead produced a negative result: every completed extreme-trajectory test remains compatible with stochastic predictions once exact arithmetic dependencies—especially orbit mergers—are accounted for.

The strongest new finite conclusion is:

\[
\boxed{
\text{For every }1<n<2^{37},
\text{ some }1\le k\le547\text{ satisfies }3^{s_k(n)}<2^k.
}
\]

Here \(s_k(n)\) denotes the number of odd shortcut iterates among the first \(k\) steps of

\[
T(x)=
\begin{cases}
x/2,&x\equiv0\pmod2,\\[1mm]
(3x+1)/2,&x\equiv1\pmod2.
\end{cases}
\]

Thus no integer below

\[
2^{37}=137{,}438{,}953{,}472
\]

satisfies the all-prefix coefficient barrier

\[
3^{s_k(n)}\ge 2^k\qquad(k\ge0).
\]

The record remains

\[
n=12{,}235{,}060{,}455,
\]

which survives through depth \(546\), fails at depth \(547\), reaches its maximum at shortcut step \(346\), and eventually reaches \(1\).

## 1. Exact \(2^{37}\) computation

The branch-and-bound search enumerated

\[
967{,}378{,}591
\]

admissible depth-\(37\) coefficient-barrier cylinders and then performed

\[
17{,}783{,}400{,}722
\]

deterministic continuation steps. It found:

| Statistic | Exact result |
|---|---:|
| Maximum barrier survival | \(546\) |
| Coefficient stopping time | \(547\) |
| Least maximizing seed | \(12{,}235{,}060{,}455\) |
| Survivors through depth \(546\) | \(2\) |
| Survivors through depth \(547\) | \(0\) |
| 64-to-128-bit transitions | \(1{,}543\) |
| Arbitrary-precision transitions | \(0\) |

Two complete runs used different splitting depths and thread counts. They agreed on the leaf count, tail-step count, complete long-survivor file, minimum-seed staircase, and record seed. A separate parity-word recurrence independently reproduced the depth-\(37\) leaf count. The inherited certificate also contains an independent direct scan below \(2^{24}\), agreeing there with the cylinder traversal.

The previous \(2^{36}\) search had already found the same record seed and the same failure depth. fileciteturn11file0L34-L96 Extending the bound by a factor of two produced no longer survivor and strengthened the lower bound to

\[
M_{547}\ge 2^{37},
\]

where \(M_K\) is the least seed surviving every coefficient barrier through depth \(K\). This is upward movement, not the stabilization required for a divergent barrier orbit.

For the record seed,

\[
s_{546}=345,\qquad T^{546}(n)=21{,}481{,}339{,}826,
\]

with

\[
3^{345}>2^{546}.
\]

At the next step,

\[
T^{547}(n)=10{,}740{,}669{,}913,
\qquad
3^{345}<2^{547}.
\]

It reaches a maximum of

\[
518{,}649{,}180{,}546{,}968
\]

and reaches \(1\) after \(739\) shortcut steps. These reproduce the previous exact audit. fileciteturn11file4L212-L256

## 2. Maximum-excursion anomaly test

Ignoring the additive \(+1\) at large scale, the shortcut logarithmic increment is modeled by

\[
X=
\begin{cases}
\log(3/2),&\text{probability }1/2,\\
-\log2,&\text{probability }1/2.
\end{cases}
\]

The positive Cramér root satisfies

\[
\frac12\left(\frac32\right)^\kappa+
\frac12\left(\frac12\right)^\kappa=1.
\]

It is exactly

\[
\kappa=1.
\]

Consequently, the random-walk model predicts a maximum-excursion ratio with a tail of order \(y^{-1}\). Summed over starting values up to \(N\), this gives an absolute maximum on the \(N^2\) scale. Lagarias and Weiss developed the underlying stochastic models, and Barina’s verification paper explicitly compares the newest path records with their \(n^2\)-scale prediction. citeturn474237view3turn907563academia34turn156104view1

The audit recomputed all 98 currently tabulated maximum-excursion record starts. OEIS A006884 defines these as starts whose trajectory maximum exceeds that of every smaller start. citeturn156104view4 The largest is

\[
n=2{,}358{,}909{,}599{,}867{,}980{,}429{,}759,
\]

with exact maximum

\[
494{,}114{,}680{,}693{,}632{,}162{,}318{,}569{,}565{,}806{,}744{,}468{,}898{,}092.
\]

The latest five excursion exponents

\[
\frac{\log M(n)}{\log n}
\]

are

\[
1.993995,\quad
1.933091,\quad
1.927906,\quad
1.957724,\quad
1.950797.
\]

More revealingly, under the \(\kappa=1\) model, record locations should occur with logarithmic rate approximately \(2\). For the 93 logarithmic gaps after the small-seed transient:

\[
\text{mean log gap}=0.5000477014,
\]

giving the estimated rate

\[
1.9998092126.
\]

The coefficient of variation is \(1.04077\), close to the exponential benchmark \(1\). A diagnostic Kolmogorov–Smirnov comparison gives \(D=0.08777\) and nominal \(p=0.446\). These are not rigorous independent-sample \(p\)-values, but there is plainly no systematic record-density excess.

For the latest 20 records, regression of

\[
\log M(n)-2\log n
\]

against \(\log n\) gives slope \(0.02186\) with nominal \(p=0.814\). No persistent departure from the \(n^2\) scale appears.

**Maximum-excursion verdict:** no anomaly indicating a counterexample.

## 3. Extreme stopping times

Lagarias and Weiss’s shortcut-map stochastic models predict

\[
\limsup_{n\to\infty}
\frac{\sigma_\infty(n)}{\log n}
\approx
41.677647.
\]

Their two different stochastic constructions yield the same constant. citeturn474237view3

It is recovered from the large-deviation equation

\[
D(p\Vert1/2)=\log2-p\log3,
\]

where

\[
D(p\Vert1/2)
=p\log(2p)+(1-p)\log(2(1-p)).
\]

The solution is

\[
p_*=0.6090897679238185\ldots,
\]

giving the shortcut constant

\[
\gamma_{\rm sh}
=
\frac1{\log2-p_*\log3}
=
41.677647655654\ldots
\]

and, after restoring the additional standard halving step following each odd step,

\[
\gamma_{\rm std}
=(1+p_*)\gamma_{\rm sh}
=
67.063076393847\ldots.
\]

The audit recomputed all 148 starts and values in OEIS A006877/A006878; A006878 counts both \(3x+1\) and halving steps. citeturn156104view5 The latest record is

\[
n=14{,}727{,}207{,}461{,}063{,}895{,}711,
\]

with

\[
2442\text{ standard steps}
=
1522\text{ shortcut steps}
+
920\text{ odd shortcut steps}.
\]

Its normalized values are

\[
\frac{2442}{\log n}=55.32870,
\qquad
\frac{1522}{\log n}=34.48414.
\]

Across all 148 records, the largest observed normalized values are

\[
57.51206\quad\text{and}\quad35.82384,
\]

both below the corresponding stochastic extremal constants.

**Stopping-time verdict:** no persistent upward excess or anomalous change of scale.

## 4. Valuation frequencies

For accelerated odd dynamics

\[
U(x)=\frac{3x+1}{2^{v_2(3x+1)}},
\]

the standard random model has

\[
\Pr(a_i=r)=2^{-r},\qquad r\ge1.
\]

Conditional on a word having length \(j\) and valuation sum \(A\), all positive compositions of \(A\) into \(j\) parts have equal probability. If

\[
Z=\#\{i:a_i=1\},
\]

then

\[
\mathbb E(Z\mid j,A)=\frac{j(j-1)}{A-1}.
\]

For the 86 sufficiently long premaximum words among the path records, the standardized counts of \(a_i=1\) have

\[
\text{mean}=0.0862,\qquad
\text{standard deviation}=0.9540,
\]

and range

\[
[-2.2858,\,2.5992].
\]

The particularly important test is the \(2^{37}\) coefficient-barrier record. Its first \(344\) accelerated valuations have

\[
A_{344}=545.
\]

I exactly enumerated, by dynamic programming, the entire ensemble of positive compositions of \(545\) into \(344\) parts satisfying the same prefix barriers

\[
2^{A_r}\le3^r.
\]

Within this exact conditional ensemble:

\[
\mathbb E Z=216.8389239566,
\qquad
\operatorname{Var}(Z)=29.5125418437.
\]

The observed value is

\[
Z=219,
\]

so

\[
z=0.39780.
\]

Its longest run of consecutive \(1\)-valuations is \(10\). The exact barrier-conditioned probability of a run at least that long is

\[
0.7365792649.
\]

**Valuation verdict:** the extreme word is ordinary after conditioning on its length, total valuation, and complete coefficient barrier.

## 5. Carry anomaly test

For an accelerated word,

\[
2^{A_j}U^j(n)=3^jn+C_j,
\qquad
C_{j+1}=3C_j+2^{A_j}.
\]

Expanding the recurrence gives

\[
\frac{C_j}{3^jn}
=
\frac1{3n}
\sum_{i=0}^{j-1}\frac{2^{A_i}}{3^i}.
\]

Therefore:

> **Carry-suppression lemma.** If \(2^{A_i}\le3^i\) for all \(i<j\), then
> \[
> 0\le\frac{C_j}{3^jn}\le\frac{j}{3n}.
> \]

For the record seed through accelerated failure at \(j=345\),

\[
\max_{r\le345}\frac{C_r}{3^rn}
=
4.0493318747\times10^{-10}.
\]

The elementary rigorous upper bound is

\[
\frac{345}{3n}
=
9.3992179624\times10^{-9}.
\]

Thus the additive correction is less than one part in approximately \(2.4\) billion relative to the multiplicative term.

**Carry verdict:** extreme survival is caused by the valuation balance, not an anomalously large additive carry.

## 6. The one apparent anomaly—and why it fails

At depth \(K\), let \(A_K\) be the number of formal parity words satisfying every coefficient prefix barrier. Treating their residue classes as independently and uniformly placed predicts

\[
\lambda_K=2^{37}\frac{A_K}{2^K}
\]

surviving seeds below \(2^{37}\).

The raw late tail appears anomalous:

| Depth | Seeds | Merged future trunks | Naive mean |
|---:|---:|---:|---:|
| 400 | 128 | 42 | 159.25 |
| 450 | 31 | 7 | 24.34 |
| 500 | 10 | 3 | 3.65 |
| 520 | 8 | 2 | 1.66 |
| 530 | 8 | 2 | 1.18 |
| 535 | 6 | 1 | 0.99 |
| 541 | 4 | 1 | 0.77 |
| 546 | 2 | 1 | 0.66 |
| 547 | 0 | 0 | 0.61 |

At depths around \(520\)–\(536\), the raw seed count has a very small naive Poisson upper tail. But this model is invalid because the selected trajectories are heavily merged.

The 128 depth-\(400\) seeds represent only 42 ordinary-orbit components. By depth \(535\), every remaining seed lies on one component. In particular,

\[
12{,}235{,}060{,}455
\quad\text{and}\quad
14{,}500{,}812{,}391
\]

reach the same state

\[
30{,}969{,}996{,}779
\]

after \(5\) and \(10\) shortcut steps respectively.

So the apparent anomaly is real only as a rejection of the **independent-cylinder model**. It is not evidence for several independent counterexample mechanisms. It is one exceptional future trunk inherited by many starting values—and that trunk dies at depth \(547\).

This yields the main methodological lesson:

\[
\boxed{
\text{Extreme starts must be clustered by shared future orbit before anomaly testing.}
}
\]

The correct statistical unit is an unmerged orbit trunk together with its accumulated coefficient margin, not a raw starting integer.

## 7. Why no disproof follows

A finite statistical deviation cannot disprove Collatz. A valid disproof still requires one of:

1. an explicit positive nontrivial cycle;
2. a positive seed whose exact orbit is proved never to reach \(1\);
3. a finite invariant proving all future coefficient inequalities or another nontermination condition for one fixed seed.

A finite valuation or parity prefix, however long, is insufficient. The prior exact reduction states the same remaining alternatives: a positive all-depth barrier seed, bounded or eventually constant \(M_K\), or an infinite cylinder branch whose representatives stabilize to one finite integer. fileciteturn11file4L258-L282

An eventually periodic barrier word cannot provide the missing certificate. If a period has length \(j\), total valuation \(A\), and positive carry \(C\), then its periodic value must satisfy

\[
(2^A-3^j)\xi=C.
\]

The barrier inequality \(2^A<3^j\) forces

\[
\xi<0,
\]

so the periodic object is a negative \(2\)-adic shadow rather than a positive integer counterexample.

The current public convergence project reports ordinary Collatz verification below

\[
2075\cdot2^{60}\approx2^{71.02},
\]

with no counterexample. citeturn156104view0 That finite verification does not prove the conjecture, but it also means the present \(2^{37}\) search range lies far inside an independently verified convergence range.

I attempted to extend the coefficient-barrier traversal to \(2^{38}\), but the complete run did not finish within the available execution window. No partial \(2^{38}\) output is used as evidence.

## Final conclusion

Approach 97 was executed as a serious falsification program. Its result is:

\[
\boxed{\text{No disproof and no systematic counterexample anomaly found.}}
\]

The strongest positive outputs are:

- exact coefficient-barrier exclusion for every \(1<n<2^{37}\) by depth \(547\);
- an exact carry-suppression lemma;
- an exact barrier-conditioned valuation test for the longest survivor;
- identification of orbit merger as the source of the only strong naive statistical anomaly;
- confirmation that maximum excursions and stopping times retain their predicted stochastic scaling.

A successful disproof by this route would require a succession of genuinely new, nonmerging future trunks whose least positive representatives eventually stabilize and whose coefficient margin admits an exact all-depth invariant. The completed data instead show a finite collection of increasingly merged trunks followed by total extinction.

## Files

[Detailed mathematical report](sandbox:/mnt/data/collatz97/collatz97_report.md)

[Complete reproducibility bundle](sandbox:/mnt/data/collatz97_extreme_trajectory_audit.zip)

[Machine-readable anomaly summary](sandbox:/mnt/data/collatz97/anomaly_summary.json)

[SHA-256 checksum for the bundle](sandbox:/mnt/data/collatz97_extreme_trajectory_audit.zip.sha256)