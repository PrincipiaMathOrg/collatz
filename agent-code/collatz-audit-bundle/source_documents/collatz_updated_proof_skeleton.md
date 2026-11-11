# Updated Collatz proof skeleton and new exact reductions

## 1. Accelerated odd map

For an odd positive integer \(x\), put
\[
U(x)=\frac{3x+1}{2^{a(x)}},\qquad a(x)=v_2(3x+1)\ge 1.
\]
For an odd orbit \(x_0=n, x_{i+1}=U(x_i)\), write
\[
A_j=\sum_{i<j}a_i,\qquad q_j=\frac{3^j}{2^{A_j}},
\]
and define \(C_0=0\), \(C_{j+1}=3C_j+2^{A_j}\). Then
\[
2^{A_j}x_j=3^j n+C_j,
\qquad
C_j=\sum_{i=0}^{j-1}3^{j-1-i}2^{A_i}.
\]
Set
\[
\beta_j=\frac{C_j}{2^{A_j}},\qquad h_j=\frac{x_j}{q_j}.
\]
The basic identities are
\[
x_j=q_jn+\beta_j,
\qquad
\beta_j=\frac13\sum_{i=0}^{j-1}\frac{q_j}{q_i},
\qquad
h_{j+1}=h_j\left(1+\frac1{3x_j}\right).
\]

## 2. Exact threshold and record lemmas

When \(q_j<1\), define the prefix numen/threshold
\[
R_j=\frac{C_j}{2^{A_j}-3^j}=\frac{\beta_j}{1-q_j}.
\]
Then
\[
x_j-n=(1-q_j)(R_j-n).
\]
Consequently, an orbit whose odd iterates never fall below \(n\) must satisfy \(R_j\ge n\) at every negative-coefficient prefix \(q_j<1\).

If \(j\) is a strict lower record of \(q\), meaning \(q_j<q_i\) for every \(i<j\), then
\[
0<\beta_j<\frac j3,
\qquad
x_j<q_jn+\frac j3\le n+\frac j3.
\]
The same bound is suffix-local: for every \(r\le j\), the last \(r\) exponents have multiplier \(q_j/q_{j-r}<1\) and normalized carry less than \(r/3\).

## 3. Block-threshold convexity

Let a prefix \(u\) have coefficient/carry pair \((t,y)\), and append a block \(v\) with multiplier \(Q\) and normalized carry \(\gamma\). Then
\[
(t,y)\longmapsto(Qt,Qy+\gamma).
\]
If \(t<1\) and \(Q<1\), write
\[
R(u)=\frac y{1-t},\qquad R(v)=\frac\gamma{1-Q}.
\]
Then
\[
R(uv)=\lambda R(u)+(1-\lambda)R(v),
\qquad
\lambda=\frac{Q(1-t)}{1-Qt}\in(0,1).
\]
Equivalently,
\[
R(uv)-R(u)=\frac{(1-Q)(R(v)-R(u))}{1-Qt}.
\]
Thus successive coefficient-record blocks update the obstruction threshold by an exact convex averaging law. A proof can focus on showing that the block numens cannot keep these averages above the least counterexample.

## 4. Full terminal-residue locality

If a word factors as \(w=uv\), where the terminal word \(v\) has length \(r\), total exponent \(B\), carry numerator \(C_v\), and the endpoint of \(w\) is \(X\), then
\[
2^B X\equiv C_v\pmod{3^r}.
\]
Hence for every integer \(c\),
\[
X\equiv c\pmod{3^r}
\quad\Longleftrightarrow\quad
C_v-2^Bc\equiv0\pmod{3^r}.
\]
The previously used \(-1\) suffix-locality theorem is the specialization \(c=-1\). This stronger form says that the complete terminal base-\(3\) cylinder, not merely \(v_3(X+1)\), is determined by the last \(r\) exponents.

## 5. A new carry-growth bound for divergent orbits

Assume the odd orbit is nonperiodic and has a least value \(n\). Its odd iterates are distinct. Apart from the initial value, every accelerated endpoint is odd and not divisible by \(3\), hence belongs to the two residue classes \(1,5\pmod 6\). Therefore
\[
\sum_{i<j}\frac1{x_i}\le \frac13\log j+O_n(1).
\]
Using
\[
\log\frac{h_j}{n}
=\sum_{i<j}\log\left(1+\frac1{3x_i}\right)
\le\frac13\sum_{i<j}\frac1{x_i},
\]
one obtains
\[
\boxed{\ h_j\le K_n j^{1/9}\ }
\]
for a constant \(K_n\) depending only on the least orbit value. Since \(x_j\ge n\),
\[
\boxed{\ q_j\ge c_n j^{-1/9}\ },
\qquad
\boxed{\ A_j\log2-j\log3\le\frac19\log j+O_n(1)\ }.
\]
Thus a divergent counterexample cannot make an exponentially deep excursion below the critical coefficient line. Its entire valuation path lies below a logarithmic ceiling.

There is also the counting consequence
\[
\#\{i<j:q_i\le Q\}
\le 3Q(h_j-n)
=O_n(Qj^{1/9}).
\]
Low-coefficient returns have zero density and at most ninth-root growth.

## 6. Record-endpoint compression

At every coefficient-record time \(j\),
\[
x_j\le h_j\le K_nj^{1/9},
\qquad
2^{A_j}\le K_n'j^{1/9}3^j,
\qquad
0<C_j< K_n''j^{2/9}3^j.
\]
Moreover
\[
C_j\equiv2^{A_j}x_j\pmod{3^j}.
\]
For fixed \((j,A_j,C_j)\), the valuation word is unique: recursively,
\[
C_j=3^{j-1}+2^{a_0}C_{\mathrm{tail}},
\qquad
 a_0=v_2(C_j-3^{j-1}),
\]
which recovers all exponents except the last; the total \(A_j\) recovers the last.

Consequently the set of possible record words satisfying only these necessary endpoint bounds has polynomial, rather than exponential, width. For fixed least seed \(n\), a record prefix is described by \(j\), an \(O(\log j)\)-sized choice of \(A_j-\lceil j\log_2 3\rceil\), and an endpoint \(x_j=O_n(j^{1/9})\).

## 7. Two-ended synchronization target

A positive starting integer also imposes a binary finite-support condition. For an exact word of total exponent \(A\) with odd endpoint,
\[
3^j n+C_w\equiv2^A\pmod{2^{A+1}}.
\]
Once \(2^{A+1}>n\), the canonical starting residue is literally \(n\), so every subsequent high binary lift digit is zero.

At a record time, full terminal-residue locality and \(x_j=O_n(j^{1/9})\) imply that, for any \(r\) much larger than \(\log_3 j\), the last \(r\) exponents decode to a residue modulo \(3^r\) whose upper \(r-O(\log j)\) ternary digits are zero.

Thus a counterexample must synchronize two finite-support phenomena across the same affine product:

1. an eventually zero binary lift at the starting end;
2. arbitrarily long zero blocks in terminal ternary decoders at coefficient records;
3. a valuation path confined to the logarithmic critical strip.

The precise missing theorem is a uniform synchronization exclusion: apart from the \(1\)-cycle, no arbitrarily long positive valuation word can satisfy all three conditions while all intermediate odd values stay at least the start.

## 8. Complete proof architecture

A complete proof can now be organized as follows.

**Step A — reduction.** Choose the least odd integer \(n>1\) whose orbit does not reach \(1\). Either its accelerated odd orbit is periodic or it is injective and tends to infinity.

**Step B — coefficient-record dichotomy.** If \(q_j\) has finitely many lower records, shift to its last global minimum; the resulting tail has every relative coefficient product at least one. If it has infinitely many records, use the record-endpoint compression and terminal decoder.

**Step C1 — critical-tail exclusion.** Prove that no positive integer can generate an infinite exact valuation word whose every relative prefix multiplier is at least one and whose binary starting residue is eventually constant.

**Step C2 — infinite-record exclusion.** Prove the two-ended synchronization theorem above. The new \(j^{1/9}\) carry bound reduces the endpoint and coefficient windows to polynomial size and forces long terminal zero cylinders.

**Step D — cycle exclusion.** A cycle belongs to the infinite-record side because its period multiplier is less than one. The synchronization theorem should include equality at a repeated endpoint; alternatively prove that every nontrivial cyclic word has a nonintegral numen at one rotation/completion.

Steps A and B, the affine/threshold identities, block convexity, terminal-residue locality, and the \(j^{1/9}\) compression are rigorous. Steps C1/C2 remain the decisive uniform theorem; operator, entropy, coding, and numen methods should be judged by whether they prove this exact statement rather than by whether they merely restate it.
