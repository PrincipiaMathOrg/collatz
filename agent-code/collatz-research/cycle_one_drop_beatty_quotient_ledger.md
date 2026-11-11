# The exact Beatty quotient ledger

**Mode:** SOLVE.

**Status:** We reduce the proposed quotient bound to one deterministic
Beatty-restricted parity trajectory. The reduction is exact in both
directions. An exhaustive residue-tree certificate finds no counterexample
through \(r=84\), but the final trajectory is conjugate to accelerated
Collatz. Thus the reduction does not prove the all-depth bound.

## 1. The quotient polynomial

Fix \(r\geq 3\), and put

\[
N:=\left\lceil r\log _2 3\right\rceil,
\qquad e:=N-r,
\qquad
K:=\left\{\left\lfloor\frac{\ell r}{e}\right\rfloor:
1\leq \ell<e\right\}.
\]

Choose

\[
S:=\{k_1<\cdots<k_V\}\subseteq K,
\qquad U:=e-1-V\geq 1.
\]

Suppose that \(s,\tau\) are positive integers, \(s\) is even, and

\[
G(X):=sX^r+
\sum_{m=1}^{V}2^{V-m}X^{k_m}
-(2^e\tau+2^V)
\tag{1}
\]

is divisible by \(2X-3\), with positive integral quotient

\[
Q(X):=\sum_{d=0}^{r-1}q_dX^d.
\]

Writing \(b_{k_m}:=2^{V-m}\), and \(b_d:=0\) at every other middle
degree, coefficient comparison gives

\[
3q_0=2^e\tau+2^V,
\qquad
q_d=\frac{2q_{d-1}-b_d}{3},
\qquad
2q_{r-1}=s.
\tag{2}
\]

This is the exact polynomial in the one-drop full-modulus gate. In that
application, \(s=t+1\).

## 2. The deterministic reverse recursion

After \(m\) spikes have been passed, divide \(q_d\) by the remaining
power of \(2\). This gives positive integers \(z_d\) satisfying

\[
z_0=\frac{2^{U+1}\tau+1}{3},
\tag{3}
\]

and

\[
z_d=
\begin{cases}
2z_{d-1}/3,&d\notin S,\\[3pt]
(4z_{d-1}-1)/3,&d\in S,
\end{cases}
\qquad 1\leq d<r,
\tag{4}
\]

with terminal value

\[
z_{r-1}=q_{r-1}=\frac{s}{2}.
\tag{5}
\]

We now reverse (4). Starting with \(q:=s/2\), define \(z_{r-1}:=q\)
and read the degrees \(d=r-1,r-2,\ldots,1\). Integrality forces

\[
z_{d-1}=
\begin{cases}
3z_d/2,&z_d\equiv0\pmod 2,\\[3pt]
(3z_d+1)/4,&z_d\equiv1\pmod 4.
\end{cases}
\tag{6}
\]

The state \(z_d\equiv3\pmod4\) is inadmissible. Moreover, the second
branch in (6) must occur at a degree in \(K\). Thus \(q\) determines its
spike set uniquely.

The constant coefficient in (1) is equivalent to

\[
v_2(3z_0-1)\geq U+1,
\qquad U=e-1-|S|.
\tag{7}
\]

Indeed, if (7) holds, then

\[
\tau:=\frac{3z_0-1}{2^{U+1}}
\]

is a positive integer, and reversing the normalization reconstructs the
positive integral quotient in (2). We have therefore proved the following
exact equivalence.

**Proposition 1.** The inequality \(s\geq2^e\) holds for every polynomial
in (1) if and only if there is no integer \(q\) with

\[
0<q<2^{e-1}
\]

whose trajectory under (6) has all spike degrees in \(K\) and satisfies
(7).

In other words, the subset search is unnecessary. A subthreshold terminal
coefficient determines the only subset which could produce it.

## 3. The accelerated Collatz conjugacy

Put

\[
y_d:=2z_d-1.
\]

Equation (6) becomes

\[
3y_d+1=2^{a_d}y_{d-1},
\qquad
a_d=
\begin{cases}
1,&d\notin S,\\
2,&d\in S.
\end{cases}
\tag{8}
\]

Thus (6) is exactly an accelerated Collatz segment. Its initial odd value
is

\[
y_{r-1}=2q-1=s-1=t.
\tag{9}
\]

If \(w:=v_2(3z_0-1)\), then

\[
v_2(3y_0+1)=w+1.
\tag{10}
\]

The first \(r-1\) exponents in (8) have sum \(r-1+V\). Consequently,

\[
A_r=r+V+w.
\tag{11}
\]

The weaker condition \(w\geq U\) gives \(A_r\geq N-1\). Note that

\[
N-1<r\log _2 3<N,
\]

so this is still subcritical. The required condition (7) gives

\[
A_r\geq N,
\]

which is the first supercritical exponent sum. If \(\tau\) is odd, then
\(w=U+1\), \(A_r=N\), and the terminal odd value is exactly \(\tau\).

This observation does not by itself imply descent. For example, the
accelerated Collatz orbit starting at \(165\) has exponent vector

\[
(4,1,1,1,1,2,2,1,2,1,1,2,1,1,1,2,3),
\]

whose sum is \(27=\lceil17\log _2 3\rceil\), but its seventeenth odd
iterate is \(167>165\). Therefore the supercritical exponent count is not
a noncircular substitute for the exact Beatty restriction.

In the denominator-one branch, \(\tau=t\). Proving contraction of the
segment would then exclude the branch, but the equality case is precisely
the cycle equation. The conjugacy locates the obstruction; it does not
remove it.

## 4. Exact residue-tree certificate

For a partial reverse trajectory, write

\[
z=\frac{Aq+B}{2^L}.
\]

A no-spike step adds one binary congruence bit, while a spike step adds two.
Since \(A\) is odd, each branch has a unique lift modulo \(2^{L+1}\) or
\(2^{L+2}\), respectively. Once the least positive lifted residue is at
least \(2^{e-1}\), every later lift remains outside the subthreshold
interval. This gives an exact pruning rule.

The script
[cycles/beatty_terminal_residue_dfs.js](cycles/beatty_terminal_residue_dfs.js)
implements this residue tree using integer arithmetic. It agrees with the
direct enumeration through \(r=40\). Separate exact runs cover every
\(3\leq r\leq84\). No trajectory satisfies (7).

The optimized script
[cycles/beatty_terminal_residue_fast.js](cycles/beatty_terminal_residue_fast.js)
agrees with direct enumeration through \(r=25\) and with the first
residue tree through \(r=50\). Exact spot checks give zero complete
subthreshold trajectories at \(r=85\) and \(r=90\). The latter two rows
visit \(15{,}983{,}195\) and \(41{,}622{,}129\) symbolic nodes,
respectively.

Among all subthreshold trajectories whose spike set is contained in \(K\),
the largest observed value of

\[
v_2(3z_0-1)-U
\]

is \(-1\). It occurs only at the following two rows:

\[
\begin{array}{c|c|c|c|c|c}
r&q&U&S&z_0&v_2(3z_0-1)\\ \hline
8&14&2&\{1,6\}&61&1\\
10&24&2&\{3,5,6\}&117&1.
\end{array}
\]

At \(r=54\), one finds a useful warning against a stronger but false
heuristic. The row

\[
q=1{,}134{,}617{,}486,
\qquad
S=\{1,3,5,10,11,20,28,35,52\},
\]

has \(U=22\) and \(v_2(3z_0-1)=6\). Thus there is no uniform bound such
as \(v_2(3z_0-1)\leq2\).

These calculations prove the stated finite range only. The all-depth
claim remains the conditional valuation separation

\[
0<q<2^{e-1}
\quad\Longrightarrow\quad
v_2(3z_0-1)\leq U
\tag{12}
\]

for trajectories whose spike set is contained in \(K\). No proof of (12),
and no exact Beatty counterexample to it, is presently known.

There is also an exact meet-in-the-middle form. If
\(S=\{d_1<\cdots<d_V\}\), put

\[
B(S):=\sum_{i=1}^{V}
2^{r-1-d_i+V-i}3^{d_i-1}.
\]

Then (7) is equivalent to

\[
3^rq+3B(S)-2^{r-1+V}=2^{N-1}\tau.
\tag{13}
\]

For a low-high split \(S=A\sqcup B\), with \(|A|=a\) and \(|B|=b\),
one has

\[
B(S)=2^bL(A)+H(B).
\]

Thus each cardinality pair reduces to a circular interval join modulo
\(2^{N-1}\). This removes the full subset factor from a finite search, but
it does not supply an all-depth separation theorem.

## Conclusion

The proposed quotient lemma is not a collection of independent subset
cases. It is one deterministic parity-trajectory assertion. Exact Beatty
eligibility eliminates the broader \(r=23\) ballot countermodel, while the
substitution \(y=2z-1\) shows that the surviving assertion is a constrained
accelerated Collatz statement. The finite residue tree supports (12), but
it cannot serve as an all-depth proof.
