# Computational stress test of \(2d\le m_0-1\)

## Question

Let
\[
 U_-(m)=\frac{3m-1}{2^{v_2(3m-1)}}
\]
on positive odd integers.  Suppose a finite exact trajectory
\[
 m_0\longmapsto m_1\longmapsto\cdots\longmapsto m_r=1
\]
has exponents \(a_i=v_2(3m_i-1)\), and put
\[
 d=\#\{i:a_i>1\}.
\]
The conjectured inequality is
\[
 2d\le m_0-1.                                    \tag{1}
\]

This would immediately exclude the manuscript's hypothetical shortest
nontrivial terminal/barrier word: its proved grouped identity gives
\(0<m_0-1<d\), whereas (1) would give \(m_0-1\ge2d\).

## Exact computation

The program [`d_bound_search.cpp`](d_bound_search.cpp) follows every odd
seed in a prescribed interval under exact unsigned-integer arithmetic.  A
path stops only when it

1. reaches \(1\);
2. reaches a previously classified state;
3. repeats a state, thereby entering a non-\(1\) cycle;
4. exceeds the explicit step cap; or
5. would overflow 64-bit arithmetic.

States in the seed interval are memoized together with their exact number
of remaining nonunit exponents and their exact remaining length.  Overflow
is checked using a 128-bit temporary before evaluating \(3m-1\).  Thus, when
the reported unresolved count is zero, every seed in the interval has been
classified without a height cutoff.

The main run used
\[
 1\le m_0\le99{,}999{,}999,\qquad m_0\text{ odd},
\]
with a cap of \(100{,}000\) accelerated steps.  Its exact output was:

| quantity | value |
|---|---:|
| odd seeds tested | 50,000,000 |
| trajectories reaching \(1\) | 16,341,560 |
| trajectories entering another detected cycle | 33,658,440 |
| unresolved by step cap or overflow | 0 |
| violations of (1) | **0** |
| largest intermediate value encountered | 734,264,182,467,163 |
| longest terminating seed | 43,765,317 |
| length of that trajectory | 249 |
| \(d\) for that trajectory | 101 |

Two smaller complete runs gave the same conclusion:

| largest odd seed | terminating seeds | non-\(1\)-cycle seeds | unresolved | violations |
|---:|---:|---:|---:|---:|
| 999,999 | 163,486 | 336,514 | 0 | 0 |
| 9,999,999 | 1,636,054 | 3,363,946 | 0 | 0 |
| 99,999,999 | 16,341,560 | 33,658,440 | 0 | 0 |

A separate undefined-behavior-sanitizer run through seed \(99{,}999\)
reported no arithmetic or memory error.  These checks are computational
evidence, not a proof beyond the stated seed interval.

## Extremizers

Equality in (1) occurs at
\[
 m_0=3,qquad 3\xrightarrow{a=3}1,qquad d=1.
\]
No other equality was found.  The twenty largest observed values of
\(2d/(m_0-1)\) begin as follows:

| \(m_0\) | \(d\) | steps | \(2d/(m_0-1)\) |
|---:|---:|---:|---:|
| 3 | 1 | 1 | 1 |
| 15 | 2 | 2 | 0.2857142857 |
| 57 | 6 | 9 | 0.2142857143 |
| 11 | 1 | 1 | 0.2 |
| 65 | 5 | 12 | 0.15625 |
| 85 | 6 | 8 | 0.1428571429 |
| 87 | 6 | 13 | 0.1395348837 |
| 101 | 6 | 11 | 0.12 |
| 53 | 3 | 4 | 0.1153846154 |
| 71 | 4 | 5 | 0.1142857143 |

The two most informative small trajectories are
\[
15\xrightarrow{2}11\xrightarrow{5}1,
\]
for which \(m_0-1=14\) and \(d=2\), and
\[
57\xrightarrow{1}85\xrightarrow{1}127\xrightarrow{2}95
\xrightarrow{2}71\xrightarrow{2}53\xrightarrow{1}79
\xrightarrow{2}59\xrightarrow{4}11\xrightarrow{5}1,
\]
for which \(m_0-1=56\) and \(d=6\).

Empirically, the data satisfy the much stronger statement
\[
 d\ge2\quad\Longrightarrow\quad 7d\le m_0-1,              \tag{2}
\]
with equality at \(m_0=15,d=2\).  Within the tested range, the only ratio
larger than \(2/7\) is the exceptional one-step trajectory \(3\to1\).
Statement (2) is an observed pattern only; no proof is presently supplied.

The exact smallest starting seeds found for the first several values of
\(d\) are:

| \(d\) | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| minimum \(m_0\) | 1 | 3 | 15 | 53 | 71 | 65 | 57 | 135 | 303 | 273 | 485 |

The nonmonotonicity is real: a trajectory with six nonunit steps begins at
\(57\), below the smallest starts found for four and five nonunit steps.
Thus a proof based only on monotonicity of the minimum seed as a function of
\(d\) is unlikely to be natural.

## A useful exact reformulation

Put
\[
 z_i=\frac{m_i-1}{2}.
\]
Then direct calculation gives the integer map
\[
 G(z)=
 \begin{cases}
  3z/2,&z\text{ even},\\[2mm]
  \bigl(\operatorname{odd}(3z+1)-1\bigr)/2,&z\text{ odd},
 \end{cases}                                      \tag{3}
\]
where \(\operatorname{odd}(n)=n/2^{v_2(n)}\).  Moreover,
\[
 a_i>1\quad\Longleftrightarrow\quad z_i\text{ is odd}.    \tag{4}
\]
Therefore (1) is equivalent to the following purely integral statement:

> Every finite \(G\)-trajectory from \(z_0\) to \(0\) contains at most
> \(z_0\) odd states before its endpoint.

This formulation exposes both the possible induction and its obstruction.
At an odd state,
\[
 G(z)\le\frac{3z-1}{4}<z,                         \tag{5}
\]
and one unit is added to the count.  Hence, if the conjecture is already
known below \(z\), it follows immediately at every odd \(z\).  A least
counterexample would necessarily be even.  At an even state, however,
\[
 G(z)=\frac32z>z,                                 \tag{6}
\]
while the odd-state count does not change.  Thus ordinary strong induction
fails precisely on the uncharged expanding steps.

More strongly, write \(z=2^ku\) with \(u\) odd.  The first \(k\) steps are
uncharged and lead to the odd value \(3^ku\).  If the following charged
step lands below the original \(z\), induction proves the conjecture at
\(z\).  Consequently, a least counterexample would have to make a genuine
excursion above its initial value across one or more charged steps before
eventually descending.  This is a significantly narrower target than an
arbitrary terminal trajectory, but it is not yet a proof.

## Relation to the activation identity

For any terminal word, not only a shortest barrier word, grouping the exact
activation identity by the \(d\) nonunit exponents gives
\[
 m_0-1=\sum_{j=1}^{d}2^{P_j}(1-2^{-c_j}).         \tag{7}
\]
The desired inequality says that this arithmetically constrained sum is at
least \(2d\).  Individual summands need not be at least \(2\): for the word
\((2,5)\) of the trajectory \(15\to11\to1\), the first contribution is
\(2/3\), while the second is \(40/3\).  Any proof must therefore exploit
global integrality or the chained congruences, rather than bound the
summands separately.

For a shortest nontrivial barrier/terminal word, all \(P_j<0\), making
every summand in (7) less than \(1\).  This explains why (1), if proved for
all finite \(U_-\)-trajectories ending at \(1\), would close the all-depth
terminal-word gap immediately.

## Status

- **Theorem:** reformulation (3)--(4), odd-step contraction (5), and the
  least-counterexample restrictions above.
- **Exact computation:** no counterexample for any odd
  \(m_0<10^8\); all 50 million seeds were fully classified.
- **Empirical strengthening:** (2), with equality only at \(m_0=15\) in
  the tested range.
- **Open:** a global argument controlling the even expanding steps, or an
  integrality argument proving (1) directly from (7).
