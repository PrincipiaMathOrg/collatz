# Full-strength frontier attack on Collatz

**Date:** 16 August 2026  
**Status:** The argument below derives two new unconditional consequences of the existing
least-counterexample/terminal-shadow framework. It does **not** complete the Collatz proof.
The exact surviving implications are isolated at the end.

## 1. The terminal \(3x-1\) shadow

Write
\[
U_-(m)=\frac{3m-1}{2^{v_2(3m-1)}}.
\]
Suppose that a nontrivial finite trajectory
\[
m_0\longmapsto m_1\longmapsto\cdots\longmapsto m_r=1
\]
has valuation word \(a_0,\dots,a_{r-1}\), with
\[
A_j=\sum_{i<j}a_i,
\qquad
2^{A_j}<3^j\quad(1\le j\le r).
\]
Choose such a word of least possible length. Put
\[
\alpha=\log_2 3,\qquad \beta=\alpha-1=\log_2(3/2),
\qquad \eta_j=A_j-\alpha j.
\]
The strict terminal-record theorem already established in the project gives
\[
\eta_i<\eta_r<0\quad(i<r),\qquad
A_r=\lfloor\alpha r\rfloor,\qquad
-\beta<\eta_r<0.
\]
Let
\[
\Delta=m_0-1
\]
and let \(h\) be the number of nonunit valuations \(a_i>1\). The marked activation
identity gives
\[
0<\Delta<h. \tag{1.1}
\]

The objective on this branch is to prove the reverse inequality \(\Delta\ge h\).

## 2. Reverse charged blocks

Read the trajectory backward from \(1\). Thus
\[
M_0=1,\qquad
M_{t+1}=\frac{2^{b_{t+1}}M_t+1}{3},
\]
where \(b_1,\dots,b_r\) is the reversal of \(a_0,\dots,a_{r-1}\).

The first reverse exponent is nonunit and the final reverse exponent is \(1\).
Partition the reversed word into \(h\) blocks. Block \(i\) begins with one exponent
\[
1+c_i,\qquad c_i\ge1,
\]
and contains the \(g_i-1\) following unit exponents before the next nonunit exponent
or the end of the word. Thus its total length is \(g_i\).

Let \(D_i\) be one less than the reverse state at the end of block \(i\). Then
\[
D_0=0,\qquad D_h=\Delta.
\]

Put
\[
\gamma_i=1-2^{-c_i},
\qquad
\lambda_i=\frac{2^{g_i+c_i}}{3^{g_i}}
          =2^{c_i-\beta g_i}.
\]

### Theorem 2.1 — exact charged-block cocycle

For every \(1\le i\le h\),
\[
\boxed{\quad D_i=\lambda_i(D_{i-1}+\gamma_i).\quad} \tag{2.1}
\]

Moreover,
\[
v_2(D_i)=g_i. \tag{2.2}
\]

#### Proof

A charged reverse step sends \(1+D\) to
\[
\frac{2^{1+c}(1+D)+1}{3}.
\]
Subtracting \(1\) gives
\[
\frac{2}{3}\bigl(2^c(1+D)-1\bigr).
\]
Every following unit reverse step multiplies the difference from \(1\) by \(2/3\).
After \(g-1\) such steps,
\[
D'=\left(\frac23\right)^g\bigl(2^c(1+D)-1\bigr)
   =\frac{2^{g+c}}{3^g}\bigl(D+1-2^{-c}\bigr).
\]
This is (2.1). The parenthesized integer \(2^c(1+D)-1\) is odd, so exact
integrality gives (2.2). \(\square\)

Let
\[
P_i=\lambda_1\cdots\lambda_i.
\]
The strict terminal-record property implies
\[
P_i>1\quad(i<h),\qquad \frac23<P_h<1. \tag{2.3}
\]

Iterating (2.1) multiplicatively gives a second exact identity.

### Theorem 2.2 — logarithmic charged potential

\[
\boxed{
\Delta
=
\gamma_1P_h
\prod_{i=1}^{h-1}
\left(1+\frac{\gamma_{i+1}}{D_i}\right).
} \tag{2.4}
\]

Equivalently, for
\[
\Phi_i=\log_2D_i-\log_2P_i,
\]
unit portions of the reverse path leave \(\Phi\) unchanged, while a charged block adds
\[
\log_2\left(1+\frac{\gamma_i}{D_{i-1}}\right).
\]

#### Proof

The first block gives \(D_1=\lambda_1\gamma_1\). For \(i\ge2\),
\[
D_i
=\lambda_iD_{i-1}
 \left(1+\frac{\gamma_i}{D_{i-1}}\right).
\]
Multiplication over \(i\) proves (2.4). \(\square\)

## 3. Cubic compression of a terminal shadow

The intermediate states \(D_1,\dots,D_{h-1}\) have three arithmetic properties.

1. They are positive and even.
2. They are pairwise distinct. A repeated state on a deterministic forward
   \(U_-\)-trajectory reaching \(1\) would create a nontrivial cycle from which the
   trajectory could not escape.
3. They satisfy
   \[
   D_i\equiv0\ \text{or}\ 4\pmod6.
   \]
   Indeed, a further reverse predecessor exists after block \(i\), so
   \(M_i=D_i+1\not\equiv0\pmod3\).

The \(j\)-th smallest positive integer in the two classes \(0,4\pmod6\) is at least \(3j\).
Since \(0<\gamma_i<1\) and \(\gamma_1P_h<1\), (2.4) yields
\[
\Delta
<
\prod_{i=1}^{h-1}\left(1+\frac1{D_i}\right)
\le
\prod_{j=1}^{h-1}\left(1+\frac1{3j}\right). \tag{3.1}
\]

The product has the exact gamma-function form
\[
\prod_{j=1}^{n}\left(1+\frac1{3j}\right)
=
\frac{\Gamma(n+4/3)}
     {\Gamma(4/3)\Gamma(n+1)}.
\]
Wendel's inequality gives
\[
\frac{\Gamma(n+4/3)}{\Gamma(n+1)}
\le(n+1)^{1/3}.
\]

### Theorem 3.1 — cubic activation bound

Every globally shortest nontrivial terminal/barrier word satisfies
\[
\boxed{
\Delta<
\frac{h^{1/3}}{\Gamma(4/3)}.
} \tag{3.2}
\]
Consequently,
\[
\boxed{
h>\Gamma(4/3)^3\Delta^3
=0.712072942688729\ldots\,\Delta^3.
} \tag{3.3}
\]

This is substantially stronger than the previously known inequality \(\Delta<h\).
It says that a failed marked-carry capacity injection cannot be marginal: it requires
a number of nonunit charges cubic in the starting defect.

A useful equivalent form is
\[
\sum_{i=1}^{h-1}\frac1{D_i}>\log\Delta. \tag{3.4}
\]
Thus a candidate must accumulate logarithmic harmonic mass among pairwise distinct
activation-boundary states in the distinguished inverse component of \(1\).

## 4. Ninth-power compression in the full trajectory length

For every forward step,
\[
\frac{m_{i+1}}{m_i}
=
\frac{3}{2^{a_i}}
\left(1-\frac1{3m_i}\right).
\]
Multiplying from \(m_0\) to \(m_r=1\) gives
\[
\frac1{m_0}
=
\frac{3^r}{2^{A_r}}
\prod_{i=0}^{r-1}
\left(1-\frac1{3m_i}\right).
\]
Because \(3^r/2^{A_r}>1\),
\[
\log m_0
<
\sum_{i=0}^{r-1}\frac1{3m_i-1}. \tag{4.1}
\]

The states are pairwise distinct. For \(i\ge1\), \(m_i\) is odd, is not divisible by \(3\),
and is not \(1\). Hence, after sorting, the \(j\)-th possible such state is at least
\(3j+1\). The shortest terminal word also has \(m_0\equiv1\pmod4\), so \(m_0\ge5\).
Therefore
\[
\log m_0
<
\frac1{14}
+
\sum_{j=1}^{r-1}\frac1{9j+2}
\le
\frac1{14}+\frac19H_{r-1}.
\]
Using \(H_n\le1+\log n\) gives
\[
\log m_0
<
\frac{23}{126}+\frac19\log(r-1).
\]

### Theorem 4.1 — ninth-power length bound

\[
\boxed{
r-1>e^{-23/14}m_0^9.
} \tag{4.2}
\]

Thus a terminal/barrier candidate with a moderately large seed must have an enormously
long exact negative-map trajectory. This estimate uses the complete path, not merely
the activation subsequence.

## 5. Consequence of the audited finite seed computation

The existing exact seed audit verified, for every odd \(m_0\le99\,999\,999\) reaching \(1\),
the stronger capacity inequality
\[
2h\le m_0-1.
\]
A terminal/barrier candidate violates this because \(m_0-1=\Delta<h\). Hence such a
candidate must satisfy
\[
m_0\ge100\,000\,001,\qquad \Delta\ge100\,000\,000.
\]

Theorems 3.1 and 4.1 then imply the computer-assisted lower bounds
\[
h\ge
712\,072\,942\,688\,729\,395\,977\,216, \tag{5.1}
\]
and
\[
r\ge
193\,426\,622\,008\,787\,635\,310\,870\,694\,107\,315\,090\,708\,329\,369\,758\,404\,804\,037\,222\,736\,714\,265\,561.
\tag{5.2}
\]

The first bound follows from the cubic theorem; the second is the stronger direct
ninth-power length bound.

These numbers are not a proof by scale. They show that the exact terminal obstruction,
if it exists, must begin beyond a drastically larger structural threshold than the previous
linear marked-carry estimate.

## 6. The divergent stationary branch

Now use the shortcut map
\[
T(x)=
\begin{cases}
x/2,&x\text{ even},\\
(3x+1)/2,&x\text{ odd}.
\end{cases}
\]
Let \(x_k=T^k(n)\), let \(\epsilon_k=x_k\bmod2\), put
\[
s_k=\sum_{j<k}\epsilon_j,\qquad
q_k=\frac{3^{s_k}}{2^k},
\]
and write the affine identity as
\[
2^kx_k=3^{s_k}n+C_k.
\]
Define
\[
H_k=\frac{x_k}{q_k}
=n+\frac{C_k}{3^{s_k}}.
\]

For a divergent orbit, the known orbit-sparsity estimate gives
\(\sum_k1/x_k<\infty\). Consequently \(H_k\) increases to a finite limit \(H\).
Put
\[
\xi=H-n>0,\qquad
\xi_k=\frac{C_k}{3^{s_k}}.
\]
Then
\[
\xi_k\longrightarrow\xi
\quad\text{in }\mathbb R, \tag{6.1}
\]
while
\[
\xi_k+n
=
\frac{2^kx_k}{3^{s_k}}
\longrightarrow0
\quad\text{in }\mathbb Q_2. \tag{6.2}
\]
Thus the same rational sequence converges to \(\xi\) at the real place and to \(-n\)
at the \(2\)-adic place.

### Theorem 6.1 — transcendence of the real minus shadow

If such a divergent positive orbit exists, then
\[
\boxed{\xi=H-n\ \text{is transcendental}.} \tag{6.3}
\]

#### Proof

Suppose that \(\xi\) is algebraic and let \(K\) be a number field containing it.
For
\[
\mathbf X_k=(C_k,3^{s_k}),
\]
use the two independent linear forms
\[
X-\xi Y,\quad Y
\]
at the Archimedean places, and
\[
X+nY,\quad Y
\]
at the places above \(2\).

Because \(\xi_k\) is bounded,
\[
H(\mathbf X_k)\asymp3^{s_k}\le3^k.
\]
The normalized Archimedean factor is \(O(|\xi_k-\xi|)\), while (6.2) gives a
combined \(2\)-adic factor at most \(2^{-k}\). Hence, for every fixed
\[
0<\delta<\log_3 2,
\]
all sufficiently large \(k\) satisfy the Subspace-Theorem inequality
\[
\prod_{v\in S}\prod_{i=1}^{2}
\frac{|L_{v,i}(\mathbf X_k)|_v}{\|\mathbf X_k\|_v}
<
H(\mathbf X_k)^{-\delta}.
\]
The Schmidt Subspace Theorem places all these points in finitely many proper
linear subspaces of \(K^2\). Therefore one line contains infinitely many
\(\mathbf X_k\), forcing the ratio
\[
\frac{C_k}{3^{s_k}}=\xi_k
\]
to take one fixed value infinitely often.

But \(\xi_k\) increases strictly at every odd step, and a divergent orbit has
infinitely many odd steps. Each value can therefore occur only finitely often.
This contradiction proves that \(\xi\) is transcendental. \(\square\)

This theorem is not an exclusion theorem: a counterexample may carry a transcendental
real shadow. It does show that every algebraic or eventually recurrent shadow sector is
impossible on the divergent branch.

## 7. The attempted closure and the exact failure

The cubic argument would become a full terminal-shadow exclusion if one could prove any
upper bound
\[
h=O(\Delta^{3-\varepsilon}) \tag{7.1}
\]
for trajectories in the inverse component rooted at \(1\), or a uniform bound on the
harmonic mass
\[
\sum_{i=1}^{h-1}\frac1{D_i}. \tag{7.2}
\]
No such bound follows from distinctness or congruence classes alone: the component contains
a positive-density supply of admissible charged states, and upward charged excursions occur.

Likewise, Theorem 6.1 would exclude divergence if the real shadow were forced to be
algebraic, automatic, substitutive, or eventually recurrent. The finite-integer origin of
the parity sequence does not presently imply any of those properties.

The remaining full-strength obligations are therefore:

1. **Terminal component theorem.** Prove that no strict-record charged path in the
   \(U_-\)-inverse component of \(1\) can satisfy \(\Delta<h\). In the new coordinates,
   this is equivalent to ruling out an integral path whose logarithmic charged potential
   accumulates more than \(\log\Delta\) while ending at defect \(\Delta\).

2. **Stationary divergence theorem.** Prove that the simultaneous real/\(2\)-adic shadow
   of a finite positive seed cannot be transcendental in the particular way produced by
   a barrier path with \(q_k\to\infty\), or directly force a smaller inverse-fiber ancestor.

3. **Cycle theorem.** Exclude positive periodic words separately, or absorb them into a
   component theorem that classifies every recurrent charged sector.

The derivations above do not prove these final statements. Treating (7.1), algebraicity of
the shadow, or component extinction as automatic would simply hide Collatz inside a renamed
lemma.

## 8. Verdict

The attack produced two nontrivial all-depth restrictions:

\[
m_0-1
<
\frac{h^{1/3}}{\Gamma(4/3)}
\]
for a shortest terminal/barrier shadow, and
\[
r-1>e^{-23/14}m_0^9.
\]

It also proves that a divergent counterexample would generate a transcendental real shadow
which is simultaneously the real limit of its affine carries and the \(2\)-adic limit
\(-n\).

These are genuine consequences at the current frontier. They still do not close the
pointwise component/synchronization theorem, so a valid full proof of Collatz has not
emerged from this attack.
