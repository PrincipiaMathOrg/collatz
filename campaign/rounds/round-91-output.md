model: GPT-5.6 Pro (Chat mode)
round: 91 -- approach 86, Cycle-word enumeration plus LLL
front: proof
sent: 2026-08-17T10:19Z
worked: 39m 55s

---

# Cycle-word enumeration plus LLL: exact outcome

I carried this approach through both its Archimedean and integral components. It gives a rigorous finite procedure for excluding cycles with a prescribed bounded number of local minima, and it exposes two useful structural facts:

1. **All logarithmic block relations collapse to one global relation between powers of \(2\) and \(3\).**
2. **All integral block equations collapse to one congruence modulo \(2^A-3^J\).**

Consequently, splitting a cycle into many blocks does **not** create many independent relations for LLL to exploit. LLL recovers the familiar continued-fraction resonances between \(\log 2\) and \(\log 3\); the remaining word-order information lies in one sparse divisibility condition that LLL does not see.

There is also a logically separate issue: even complete exclusion of positive cycles would not exclude an unbounded orbit. Therefore this cycle-only approach does not produce a full proof of the Collatz conjecture.

What follows is the complete derivation.

---

## 1. Exact block equations

Use the shortcut map

\[
T(n)=
\begin{cases}
n/2,&n\equiv0\pmod 2,\\[1mm]
(3n+1)/2,&n\equiv1\pmod 2.
\end{cases}
\]

Suppose that a positive cycle has \(r\) local minima

\[
x_0,x_1,\ldots,x_{r-1},
\qquad x_r=x_0.
\]

All indices below are interpreted modulo \(r\).

Starting at \(x_i\), let

\[
j_i\geq 1
\]

be the number of consecutive odd shortcut steps, and let

\[
\ell_i\geq 1
\]

be the number of subsequent even shortcut steps before the next local minimum \(x_{i+1}\). Put

\[
a_i=j_i+\ell_i.
\]

Because the first \(j_i\) entries are odd, there is a positive integer \(q_i\) such that

\[
x_i=2^{j_i}q_i-1.
\]

Iteration through the odd run gives

\[
T^{j_i}(x_i)=3^{j_i}q_i-1.
\]

The following \(\ell_i\) even divisions therefore give

\[
3^{j_i}q_i-1=2^{\ell_i}x_{i+1}.
\]

Substituting \(q_i=(x_i+1)/2^{j_i}\) and multiplying by \(2^{j_i}\) yields the exact block equation

\[
\boxed{
2^{a_i}x_{i+1}
=
3^{j_i}x_i+3^{j_i}-2^{j_i}.
}
\tag{1}
\]

Define

\[
c_i=3^{j_i}-2^{j_i}>0,
\]

and the prefix sums

\[
A_i=\sum_{h=0}^{i-1}a_h,
\qquad
J_i=\sum_{h=0}^{i-1}j_h,
\]

with \(A_0=J_0=0\). Finally put

\[
A=\sum_{i=0}^{r-1}a_i,
\qquad
J=\sum_{i=0}^{r-1}j_i.
\]

Thus \(A\) is the total shortcut length and \(J\) is the number of odd members of the cycle.

Multiplying the \(i\)-th equation by

\[
2^{A_i}3^{J-J_{i+1}}
\]

and summing over \(i\) gives a telescoping identity:

\[
(2^A-3^J)x_0
=
\sum_{i=0}^{r-1}
c_i\,2^{A_i}3^{J-J_{i+1}}.
\]

Set

\[
D_w=2^A-3^J
\tag{2}
\]

and

\[
S_w=
\sum_{i=0}^{r-1}
(3^{j_i}-2^{j_i})2^{A_i}3^{J-J_{i+1}}.
\tag{3}
\]

We obtain

\[
\boxed{D_w x_0=S_w.}
\tag{4}
\]

Since \(S_w>0\), a positive cycle requires \(D_w>0\).

The binary parity word associated with the block vector is

\[
w=1^{j_0}0^{\ell_0}\,
  1^{j_1}0^{\ell_1}\cdots
  1^{j_{r-1}}0^{\ell_{r-1}}.
\]

Its usual affine numerator is exactly \(S_w\). Hence the standard parity-word criterion gives:

### Proposition 1 — Exact cycle criterion

The block word \(w\) represents a positive integer cycle if and only if

\[
\boxed{D_w\mid S_w.}
\tag{5}
\]

When the word is rotated to begin at the least member of the cycle,

\[
x_0=\frac{S_w}{D_w}.
\]

This is the same divisibility criterion already used in your cycle manuscript. fileciteturn2file0L16-L37

---

## 2. The global near-relation

Divide (1) by \(3^{j_i}x_i\). This gives

\[
\frac{2^{a_i}x_{i+1}}{3^{j_i}x_i}
=
1+\frac{3^{j_i}-2^{j_i}}{3^{j_i}x_i}.
\]

Define

\[
\varepsilon_i
=
\log\left(
1+\frac{3^{j_i}-2^{j_i}}{3^{j_i}x_i}
\right).
\]

Then

\[
0<\varepsilon_i<\frac1{x_i},
\]

and

\[
a_i\log2-j_i\log3+\log x_{i+1}-\log x_i
=
\varepsilon_i.
\tag{6}
\]

Summing around the cycle cancels all the \(\log x_i\) terms:

\[
\boxed{
A\log2-J\log3
=
\sum_{i=0}^{r-1}\varepsilon_i>0.
}
\tag{7}
\]

Thus

\[
\frac AJ>\delta,
\qquad
\delta:=\log_2 3.
\]

This is the near-relation on which continued fractions and LLL operate.

There is also the product form. If \(b_1,\ldots,b_J\) are all the odd cycle members, multiplication of the ratios \(T(n)/n\) around the cycle gives

\[
\frac{2^A}{3^J}
=
\prod_{s=1}^{J}
\left(1+\frac1{3b_s}\right).
\tag{8}
\]

If \(N\) is the least cycle member, then \(b_s\geq N\), and therefore

\[
\frac{2^{A/J}}3
<
1+\frac1{3N}
\]

for a nontrivial cycle. Hence

\[
\boxed{
N<
\frac1{2^{A/J}-3}.
}
\tag{9}
\]

If all starting values below \(B\) have been verified, then \(N\geq B\), so

\[
\boxed{
0<
\frac AJ-\delta
<
\log_2(3+B^{-1})-\log_2 3.
}
\tag{10}
\]

Taking the published verification value \(B=2^{71}\) gives the interval width

\[
2.0366837207889033546\ldots\times10^{-22}.
\]

Your existing computation identifies the least-denominator rational in this interval as

\[
\boxed{
(A_0,J_0)
=
(114208327604,\;72057431991).
}
\tag{11}
\]

The proof uses the relevant convergents and the intermediate convergent of \(\log_2 3\). fileciteturn4file0L7-L12 fileciteturn2file0L48-L90

---

## 3. First structural theorem: logarithmic block relations have rank one

One might hope that the individual equations (6) give \(r\) separate near-relations and that an \(r\)-dimensional LLL calculation can contradict their simultaneous existence. This does not happen.

### Theorem 2 — Archimedean cycle-space collapse

Let \(\alpha_0,\ldots,\alpha_{r-1}\in\mathbb R\). Consider the linear combination of the block relations (6) with coefficients \(\alpha_i\).

If all the quantities

\[
\log x_0,\ldots,\log x_{r-1}
\]

are eliminated from that combination, then

\[
\alpha_0=\alpha_1=\cdots=\alpha_{r-1}.
\]

Consequently, every logarithmic relation involving only \(\log2\) and \(\log3\) is a scalar multiple of the global relation (7).

#### Proof

In the sum of the \(\alpha_i\)-weighted equations, the coefficient of \(\log x_k\) is

\[
\alpha_{k-1}-\alpha_k.
\]

Eliminating every \(\log x_k\) therefore requires

\[
\alpha_{k-1}-\alpha_k=0
\]

for every \(k\). Since the block graph is a single directed cycle, all the coefficients are equal. Substituting a common value \(\alpha\) gives precisely \(\alpha\) times (7). ∎

This theorem has a direct consequence:

\[
\boxed{
\text{The block decomposition creates no new independent closed logarithmic forms.}
}
\]

The individual blocks contain endpoint potentials \(\log x_i\). Closing the cycle removes those potentials, but the cycle graph has only one independent closed direction. Thus the natural higher-dimensional logarithmic LLL calculation projects to the single pair

\[
(A,J).
\]

In particular, two completely different block words with the same totals \(A,J\) give the same LLL input.

---

## 4. What LLL actually returns

For example, take

\[
Q=10^{23},
\]

and the nearest integers

\[
u_2=\left\lfloor Q\log2\right\rceil
=69314718055994530941723,
\]

\[
u_3=\left\lfloor Q\log3\right\rceil
=109861228866810969139525.
\]

Consider the rank-two lattice with row basis

\[
B_Q=
\begin{pmatrix}
1&0&u_2\\
0&1&u_3
\end{pmatrix}.
\]

A vector with first two coordinates \((-A,J)\) has third coordinate

\[
-Au_2+Ju_3,
\]

which is small when \(A\log2-J\log3\) is small.

Using the usual Lovász parameter \(3/4\), one exact LLL reduction gives

\[
\begin{pmatrix}
-217976794617&
137528045312&
21883051709\\[1mm]
-114208327604&
72057431991&
-492538677417
\end{pmatrix}.
\tag{12}
\]

The second row recovers precisely the first surviving pair (11). The first row gives the next much closer upper approximation

\[
\frac{217976794617}{137528045312}
>
\log_2 3.
\]

Thus LLL does not produce a contradiction. It correctly discovers the resonances that a hypothetical cycle would need.

This is not an accident. In rank two, lattice reduction is the geometric form of continued-fraction reduction. Changing the scale \(Q\) produces later convergents or intermediate convergents. Since \(\log_2 3\) is irrational, there are infinitely many increasingly accurate one-sided rational approximations.

LLL is therefore an excellent **candidate generator**, but it cannot remove the candidates using the logarithmic relation alone.

---

## 5. Second structural theorem: the exact integer system also has one obstruction

It remains possible that the \(r\) exact block equations impose many independent congruence conditions. Their Smith normal form shows that this also fails.

Let \(M_w\) be the \(r\times r\) cyclic matrix defined by

\[
(M_wx)_i
=
-3^{j_i}x_i+2^{a_i}x_{i+1}.
\]

The block equations are

\[
M_wx=c,
\qquad
c=(c_0,\ldots,c_{r-1})^{\mathsf T}.
\tag{13}
\]

### Theorem 3 — Cyclic Smith collapse

For \(r\geq2\), the Smith normal form of \(M_w\) is

\[
\boxed{
\operatorname{SNF}(M_w)
=
\operatorname{diag}(1,\ldots,1,D_w),
}
\tag{14}
\]

where \(D_w=2^A-3^J>0\).

For \(r=1\), the matrix itself is the one-by-one matrix \((D_w)\).

#### Proof

The determinant expansion of this cyclic bidiagonal matrix has two terms, giving

\[
|\det M_w|=|2^A-3^J|=D_w.
\]

Let \(\Delta_{r-1}\) denote the greatest common divisor of all \((r-1)\)-rowed minors.

Deleting the last row and last column produces a triangular minor whose absolute value is

\[
3^{j_0+\cdots+j_{r-2}}.
\]

Deleting the last row and first column produces a triangular minor whose absolute value is

\[
2^{a_0+\cdots+a_{r-2}}.
\]

These two integers are coprime. Hence

\[
\Delta_{r-1}=1.
\]

If \(d_1,\ldots,d_r\) are the Smith invariant factors, then

\[
d_1\cdots d_{r-1}=\Delta_{r-1}=1,
\]

so

\[
d_1=\cdots=d_{r-1}=1.
\]

Their full product is \(|\det M_w|=D_w\), giving \(d_r=D_w\). ∎

Thus

\[
\mathbb Z^r/M_w\mathbb Z^r
\cong
\mathbb Z/D_w\mathbb Z.
\]

There are not \(r\) independent integral obstructions. There is exactly one cyclic obstruction.

It is explicitly the numerator \(S_w\). Indeed, define

\[
\lambda_i=2^{A_i}3^{J-J_{i+1}}.
\]

Direct cancellation gives

\[
\lambda^{\mathsf T}M_w
=
D_w e_0^{\mathsf T}.
\]

Therefore any solution of \(M_wx=c\) satisfies

\[
D_wx_0
=
\lambda^{\mathsf T}c
=
S_w.
\]

So the unique Smith obstruction is precisely

\[
S_w\equiv0\pmod{D_w}.
\]

Combining Theorems 2 and 3 gives the central diagnosis:

\[
\boxed{
\begin{aligned}
&\text{Archimedean information: one linear form }
A\log2-J\log3;\\
&\text{integral information: one residue }
S_w\bmod(2^A-3^J).
\end{aligned}
}
\tag{15}
\]

The first depends only on the totals \((A,J)\). The second contains all the word-order information.

---

## 6. The exact sparse polynomial left after LLL

Define

\[
P_w(X,Y)
=
\sum_{i=0}^{r-1}
\bigl(Y^{j_i}-X^{j_i}\bigr)
X^{A_i}Y^{J-J_{i+1}}.
\tag{16}
\]

Then

\[
P_w(2,3)=S_w.
\]

Consequently, cycle exclusion is the following sparse divisibility problem:

\[
\boxed{
2^A-3^J
\nmid
P_w(2,3)
}
\tag{17}
\]

for every primitive nontrivial admissible block word \(w\).

This is substantially different from controlling

\[
A\log2-J\log3.
\]

The latter determines how close \(2^A\) and \(3^J\) are. It does not determine whether their difference divides the sparse carry numerator \(P_w(2,3)\).

A useful proper-power reduction is available. If \(w=v^q\) is the \(q\)-fold concatenation of a shorter word \(v\), and \(v\) has totals \(a,j\), then

\[
S_{v^q}
=
S_v
\sum_{t=0}^{q-1}
2^{ta}3^{(q-1-t)j}
=
S_v\frac{2^{qa}-3^{qj}}{2^a-3^j}.
\]

Hence

\[
\frac{S_{v^q}}{2^{qa}-3^{qj}}
=
\frac{S_v}{2^a-3^j}.
\tag{18}
\]

Traversing a word repeatedly therefore creates no new rational fixed point. It is enough to study primitive cyclic words. Nevertheless, there remain infinitely many primitive words.

---

## 7. What can be proved in every finite parameter range

Suppose the number \(r\) of local minima is fixed.

Classical linear-form estimates provide an explicit upper bound for the number \(J\) of odd cycle members in terms of \(r\). Simons and de Weger used transcendence estimates, continued fractions, and lattice basis reduction to prove that there are only finitely many \(r\)-cycles to consider for each fixed \(r\). In the relevant finite ranges, their upper bound has the form

\[
J<1.4784\,r\,\delta^r.
\]

Their computations explicitly use continued fractions and lattice basis reduction. citeturn430813view2

Once an upper bound \(J\leq U(r)\) is supplied, the following algorithm is exhaustive.

### Certified finite-range cycle algorithm

For every \(1\leq r\leq R\):

1. Use a rational interval enclosure of \(\delta=\log_2 3\), together with LLL and complete short-vector enumeration, to list all pairs \((A,J)\) satisfying
   \[
   J\leq U(r),
   \qquad
   0<\frac AJ-\delta<\eta,
   \]
   where \(\eta\) is the rigorous cycle-width bound.

2. For every surviving pair, enumerate all positive compositions
   \[
   J=j_0+\cdots+j_{r-1},
   \qquad
   A-J=\ell_0+\cdots+\ell_{r-1}.
   \]

   Before cyclic identification, the number of block vectors is exactly
   \[
   \binom{J-1}{r-1}
   \binom{A-J-1}{r-1}.
   \tag{19}
   \]

3. Remove cyclic repetitions and proper powers.

4. For each remaining block word, calculate the integers
   \[
   D_w=2^A-3^J,
   \qquad
   S_w=P_w(2,3)
   \]
   exactly.

5. Reject the word when
   \[
   S_w\bmod D_w\neq0.
   \]

6. For any divisible word, reconstruct
   \[
   x_0=S_w/D_w
   \]
   and verify its full parity word with exact integer iteration.

Every \(r\)-cycle would appear in this enumeration, so an empty output is a complete proof for the chosen finite range.

An important technical qualification is that **an LLL-reduced basis alone is not an exclusion certificate**. LLL returns some short vectors. To prove that none have been missed, one must perform complete enumeration in the reduced lattice or use the exact continued-fraction description available in rank two.

The strongest journal result I found proves that a nontrivial cycle must have at least \(92\) local minima, equivalently that no \(r\)-cycle exists for \(r\leq91\). citeturn865347view2turn944405view0turn944405view1 A June 2026 preprint claims the extension through \(r=95\), conditional on its stated certified computational inputs; its displayed manuscript record does not show acceptance or publication dates. citeturn430813view0turn432762view0

---

## 8. The first surviving total pair illustrates the obstruction

At

\[
(A_0,J_0)
=
(114208327604,72057431991),
\]

the minimum bound is

\[
\frac1{2^{A_0/J_0}-3}
=
4.3584872097954309532\ldots\times10^{21}
<
2^{72}.
\]

Nevertheless, the total number of cyclic parity classes at this weight has binary logarithm approximately

\[
108492832002.98157.
\]

Thus continued fractions or LLL have reduced the possible totals to one extraordinarily resonant pair without making the parity-word problem small. fileciteturn2file0L93-L103

Your exact minimum-prefix sieve reduces this first ratio to

\[
2483007077973438304<2^{62}
\]

possible minima. This is a major finite reduction, but it is not an empty set. fileciteturn2file0L300-L343

The previously established moving-window analysis also shows that ordinary window-uniqueness information is logically compatible with exponentially many words. The exact decoder must still decide membership in the structured numerator set or reject the candidate residue. fileciteturn2file0L215-L269

This is exactly what the two collapse theorems predict:

- LLL has already extracted essentially all the information in the logarithmic relation.
- The unresolved information is the exact sparse residue \(S_w\bmod D_w\).

---

## 9. Why the procedure does not become a proof for all cycles

For each fixed \(r\), the search is finite. But the Collatz problem supplies no a priori upper bound on \(r\).

As \(r\) increases:

\[
U(r)\asymp r\delta^r
\]

in the classical bounds, so the possible total lengths grow exponentially. The lattice calculation then encounters later and later upper convergents of \(\log_2 3\). There are infinitely many such convergents, so no final LLL stage is reached.

At the same time, the exact residue problem has a growing number of sparse terms:

\[
P_w(2,3)
=
\sum_{i=0}^{r-1}
(3^{j_i}-2^{j_i})2^{A_i}3^{J-J_{i+1}}.
\]

Fixed-dimensional \(S\)-unit and lattice-reduction arguments can be effective when \(r\) is fixed. They do not currently give a bound uniform in the moving number of terms \(r\). Your broader work ledger independently isolates the need for a uniform moving-sparse-polynomial gcd theorem. fileciteturn3file9L492-L497

A strong sufficient statement would be the following.

### Uniform sparse-carry theorem

There exist constants \(\eta>0\) and \(A_\ast\) such that, for every primitive minimum-admissible block word \(w\neq10\) with \(A\geq A_\ast\),

\[
\boxed{
\gcd\!\left(
2^A-3^J,\,
P_w(2,3)
\right)
\leq
(2^A-3^J)^{1-\eta}.
}
\tag{20}
\]

This would immediately imply

\[
2^A-3^J\nmid P_w(2,3)
\]

for every sufficiently long primitive word. The finitely many shorter words could then be checked exactly.

No such uniform theorem has been obtained in this attack. The logarithmic LLL calculation cannot prove it because \(P_w\) is invisible after projection to the totals \((A,J)\).

---

## 10. Why cycle exclusion still would not prove Collatz

For an open sequence of blocks from \(x_0\) to \(x_n\), summing (6) gives

\[
A_n\log2-J_n\log3
+\log x_n-\log x_0
=
\sum_{i=0}^{n-1}\varepsilon_i.
\tag{21}
\]

In a cycle, \(x_n=x_0\), so the endpoint term vanishes and produces the \(2\)-\(3\) near-relation.

Along an unbounded orbit, however,

\[
\log x_n-\log x_0
\]

does not vanish. It can absorb the entire discrepancy between \(A_n\log2\) and \(J_n\log3\). Therefore the basic LLL input is absent.

This is a structural, not merely computational, distinction:

\[
\boxed{
\text{Cycle closure creates the near-relation; divergence does not.}
}
\]

Even a complete proof of the uniform sparse-carry theorem would establish only that there are no nontrivial positive cycles.

To obtain the full Collatz conjecture one would additionally need, for example, the statement

\[
\text{every positive Collatz orbit is bounded}.
\tag{22}
\]

Indeed, a bounded orbit in the positive integers eventually repeats. If all nontrivial cycles have been excluded, the eventual cycle must be \(1\leftrightarrow2\).

---

# Final verdict

The proposed approach yields a rigorous and useful **finite cycle-exclusion engine**, but it does not yield a full proof of Collatz.

The exact result of the attack is:

\[
\boxed{
\begin{array}{c}
\text{all blockwise logarithmic relations collapse to }
A\log2-J\log3,\\[1mm]
\text{all blockwise integral conditions collapse to }
P_w(2,3)\equiv0\pmod{2^A-3^J}.
\end{array}
}
\]

LLL handles the first line. It recovers the continued-fraction resonances, including the first surviving pair

\[
(114208327604,72057431991),
\]

rather than excluding them.

The second line is the unresolved arithmetic core: a uniform sparse-polynomial nondivisibility theorem for an unbounded number of blocks. Even resolving that theorem would settle only positive cycles; exclusion of unbounded orbits would remain a separate obligation.

Accordingly, asserting a full proof from approach 86 would require inserting two unproved statements:

\[
\begin{aligned}
&2^A-3^J\nmid P_w(2,3)
&&\text{for every primitive nontrivial admissible word},\\
&\text{every positive orbit is bounded}.
\end{aligned}
\]

Neither statement follows from cycle-word enumeration plus LLL as presently developed.