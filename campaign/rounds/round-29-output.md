model: GPT-5 Pro
round: 29 -- approach 24, Sum-of-squares Lyapunov certificates
front: proof
sent: 2026-08-13T18:49:42Z
worked: 38m 52s

---

# Outcome

I pursued the SOS program in its natural finite form. It does **not** produce a valid proof of Collatz. More strongly, the proposed certificate class has a rigorous obstruction:

> **No proper polynomial Lyapunov function with finitely many residue states and a bounded block length can prove the Collatz conjecture.**

The obstruction is the realizable family \(n=2^L-1\), whose first \(L\) shortcut-Collatz steps are all increasing. This defeats both direct bounded-block contraction and every finite-state polynomial correction.

Current 2026 literature still describes the full conjecture as open. Tao’s published theorem is an almost-all result in logarithmic density, not a pointwise theorem. citeturn107430search2turn250353search0 SOS Lyapunov verification and exact rational recovery are legitimate proof technologies, so the issue is not that SDP is numerically unreliable; the issue is that the desired finite certificate does not exist. citeturn970944search0turn114051search1

What follows is the exact reduction, the impossibility theorem, and the stronger scale-dependent SOS target that would actually suffice.

---

## 1. Exact affine polynomialization of every block

Use the shortcut Collatz map

\[
T(n)=
\begin{cases}
n/2,&n\equiv 0\pmod 2,\\[2mm]
(3n+1)/2,&n\equiv 1\pmod 2.
\end{cases}
\]

Convergence under \(T\) is equivalent to convergence under the usual Collatz map.

Fix a parity word

\[
\omega=(\epsilon_0,\ldots,\epsilon_{L-1})\in\{0,1\}^{L},
\]

where \(\epsilon_j\) records the parity before step \(j\). Put

\[
s_j=\sum_{i=0}^{j-1}\epsilon_i
\]

and define integers \(c_j\) recursively by

\[
c_0=0,\qquad
c_{j+1}=3^{\epsilon_j}c_j+\epsilon_j2^j.
\]

A direct induction gives

\[
2^jT^j(n)=3^{s_j}n+c_j
\]

whenever the first \(j\) parities are \(\epsilon_0,\ldots,\epsilon_{j-1}\). In particular,

\[
T^L(n)=\frac{3^{s_L}n+c_L}{2^L}. \tag{1}
\]

The offset can also be written explicitly as

\[
c_L=\sum_{i=0}^{L-1}
\epsilon_i\,2^i\,3^{\,s_L-s_{i+1}}. \tag{2}
\]

Because \(3^{s_L}\) is invertible modulo \(2^L\), there is a unique residue

\[
r_\omega\equiv -3^{-s_L}c_L\pmod{2^L},
\qquad 0\le r_\omega<2^L. \tag{3}
\]

This residue realizes precisely the parity word \(\omega\).

To see that the final congruence really enforces all intermediate parities, write

\[
N_j=3^{s_j}r_\omega+c_j.
\]

Then

\[
N_{j+1}=3^{\epsilon_j}N_j+\epsilon_j2^j.
\]

Starting from \(2^L\mid N_L\) and working backwards, one obtains \(2^j\mid N_j\). Furthermore,

\[
\frac{N_{j+1}}{2^j}
=
3^{\epsilon_j}\frac{N_j}{2^j}+\epsilon_j
\]

is even, which forces \(N_j/2^j\) to be even when \(\epsilon_j=0\) and odd when \(\epsilon_j=1\).

Define the endpoint of the minimal representative by

\[
d_\omega
=
\frac{3^{s_L}r_\omega+c_L}{2^L}
=
T^L(r_\omega).
\]

Every integer in this parity cylinder has the form

\[
n=r_\omega+2^Lm,\qquad m\in\mathbb Z_{\ge0},
\]

and equation (1) becomes the particularly simple affine formula

\[
T^L(n)=d_\omega+3^{s_L}m. \tag{4}
\]

Therefore

\[
n-T^L(n)
=
\bigl(2^L-3^{s_L}\bigr)m+r_\omega-d_\omega. \tag{5}
\]

This is the complete block polynomialization. Once the parity cylinder is fixed, the alleged high-dimensional Collatz inequality is just a **linear polynomial in one nonnegative integer variable**.

---

## 2. The exact local SOS certificate

Set

\[
A_\omega=2^L-3^{s_L}.
\]

If \(A_\omega>0\), define

\[
m_{0,\omega}
=
\max\left(
0,\,
\left\lfloor
\frac{d_\omega-r_\omega}{A_\omega}
\right\rfloor+1
\right).
\]

Then

\[
B_\omega
=
A_\omega m_{0,\omega}+r_\omega-d_\omega
\]

is a positive integer. Writing \(z=m-m_{0,\omega}\ge0\), equation (5) becomes

\[
n-T^L(n)=A_\omega z+B_\omega. \tag{6}
\]

This is already an exact weighted SOS certificate on the half-line \(z\ge0\):

\[
A_\omega z+B_\omega
=
\underbrace{B_\omega}_{\text{constant SOS}}
+
z\underbrace{A_\omega}_{\text{constant SOS}}. \tag{7}
\]

In Gram-matrix form, the two SOS matrices are simply the rational positive semidefinite \(1\times1\) matrices

\[
[B_\omega]\succeq0,\qquad [A_\omega]\succeq0.
\]

Thus every cylinder with \(3^{s_L}<2^L\) has an exact contraction certificate after finitely many exceptional values of \(m\), and those exceptions can be checked individually.

### Example: a successful certificate

Take the time-ordered parity word

\[
\omega=(1,0,0).
\]

It corresponds to \(r_\omega=5\), and

\[
T^3(5+8m)=2+3m.
\]

Hence

\[
(5+8m)-T^3(5+8m)=3+5m.
\]

An explicit weighted SOS decomposition is

\[
3+5m
=
1^2+1^2+1^2
+
m(1^2+2^2).
\]

### Example: an unavoidable expanding cylinder

For

\[
\omega=(1,1,1),
\]

we have \(r_\omega=7\) and

\[
T^3(7+8m)=26+27m.
\]

Thus

\[
(7+8m)-T^3(7+8m)
=
-19(1+m). \tag{8}
\]

No SOS solver can certify this expression as positive on \(m\ge0\), because it is strictly negative.

This is not numerical failure. It is a genuine expanding branch.

---

## 3. Why no bounded block contraction proof exists

The preceding bad branch is not an isolated low-depth accident.

### Theorem 1: bounded stopping-time descent is false

For every \(K\ge1\), there is an integer \(n>1\) such that

\[
T^j(n)>n
\qquad\text{for every }1\le j\le K.
\]

### Proof

Choose

\[
n=2^L-1
\]

with \(L\ge K\). Since

\[
T(x)+1=\frac32(x+1)
\]

whenever \(x\) is odd, induction gives

\[
T^j(2^L-1)=3^j2^{L-j}-1,
\qquad 0\le j\le L. \tag{9}
\]

For \(1\le j\le L\),

\[
T^j(2^L-1)-(2^L-1)
=
2^{L-j}(3^j-2^j)>0.
\]

Therefore the first \(L\) iterates all exceed the starting value. ∎

Consequently, the statement

\[
\exists K\ \forall n>1\ \exists\,1\le j\le K:
T^j(n)<n \tag{10}
\]

is false.

The descent statement actually equivalent to Collatz is

\[
\forall n>1\ \exists j=j(n):
T^j(n)<n, \tag{11}
\]

where \(j(n)\) must be allowed to be unbounded.

A finite block SDP naturally tries to prove (10), not (11).

---

## 4. Finite residue potentials do not repair the problem

One might hope to compensate for an expanding size branch by letting the Lyapunov function depend on a finite residue state. The following theorem rules that out for polynomial SOS potentials.

### Theorem 2: finite-state polynomial Lyapunov obstruction

Let \(S\) be a finite set of states. For every \(s\in S\), let

\[
V_s(x)\in\mathbb R[x]
\]

satisfy

\[
V_s(x)\longrightarrow+\infty
\qquad (x\to+\infty). \tag{12}
\]

Suppose a macro-step rule assigns to every current state and every integer \(n>1\)

* a block length \(k\) with \(1\le k\le K\);
* a new state \(s'\in S\);

and suppose it satisfies

\[
V_{s'}\bigl(T^k(n)\bigr)<V_s(n) \tag{13}
\]

at every macro-step.

Then no such finite collection \(\{V_s\}_{s\in S}\) exists.

### Proof

Every polynomial satisfying (12) is strictly increasing for all sufficiently large \(x\). Since \(S\) is finite, choose \(N_0\) such that every \(V_s\) is strictly increasing on \([N_0,\infty)\).

Choose \(L\) so large that

\[
L>K(|S|+1)
\quad\text{and}\quad
2^L-1>N_0.
\]

Start at

\[
n_0=2^L-1.
\]

Let

\[
0=t_0<t_1<t_2<\cdots
\]

be the macro-step times. Since every macro-step has length at most \(K\),

\[
t_j\le jK.
\]

In particular, the first \(|S|+1\) macro-step endpoints occur before time \(L\). By equation (9), all corresponding orbit values are strictly increasing:

\[
T^{t_0}(n_0)<T^{t_1}(n_0)<\cdots<T^{t_{|S|}}(n_0).
\]

Among the \(|S|+1\) associated states, two must coincide. Thus, for some \(i<j\), the states at times \(t_i,t_j\) are the same state \(s\).

Chaining the strict Lyapunov inequalities gives

\[
V_s\bigl(T^{t_j}(n_0)\bigr)
<
V_s\bigl(T^{t_i}(n_0)\bigr). \tag{14}
\]

But both arguments exceed \(N_0\), and

\[
T^{t_j}(n_0)>T^{t_i}(n_0).
\]

Since \(V_s\) is strictly increasing there,

\[
V_s\bigl(T^{t_j}(n_0)\bigr)
>
V_s\bigl(T^{t_i}(n_0)\bigr), \tag{15}
\]

contradicting (14). ∎

### Consequences

The theorem excludes all of the following proof templates:

\[
V(n)=p_{n\bmod M}(n),
\]

with finitely many polynomial pieces;

\[
V(n)=\log n+\phi(n\bmod M),
\]

with a bounded modular correction;

finite path-complete or multiple-polynomial Lyapunov functions;

finite lexicographic tuples of proper polynomial rankings;

bounded stopping rules combined with finitely many residue indicators.

The reason properness is included is essential. A function that merely decreases but has infinite sublevel sets does not prove termination: it may decrease forever toward a limit while the integer orbit diverges. A genuine termination Lyapunov function must provide some well-foundedness, such as finite sublevel sets, an integer-valued rank, or a uniform multiplicative contradiction.

Therefore:

> **Under the literal interpretation of Approach 24—one finite SDP, one real size variable, finitely many residue modes, and bounded blocks—the required certificate is mathematically impossible.**

---

## 5. What finite-block SOS does accomplish

At depth \(L\), the coefficient-expanding words are those satisfying

\[
3^{s_L}>2^L,
\]

or equivalently

\[
s_L\ge \left\lceil L\log_3 2\right\rceil.
\]

Their number is

\[
B_L
=
\sum_{s=\lceil L\log_3 2\rceil}^{L}
\binom{L}{s}. \tag{16}
\]

Since

\[
\log_3 2\approx0.6309297536,
\]

this is an upper binomial tail. Its proportion tends to zero exponentially. More precisely, if

\[
p=\log_3 2,
\]

then

\[
B_L
=
2^{H_2(p)L+o(L)},
\]

where

\[
H_2(p)
=
-p\log_2p-(1-p)\log_2(1-p)
\approx0.9499555.
\]

Thus the proportion of coefficient-expanding words is approximately

\[
2^{-0.0500445L+o(L)}.
\]

That is meaningful: an exact SOS program can eliminate an exponentially increasing number of residue cylinders and leave an exponentially small proportion of high-drift cylinders.

But “exponentially small proportion” is not “none.” The all-odd word survives for every \(L\), and each of its finite prefixes is realized by \(2^L-1\). This is the same exceptional-orbit gap that separates probabilistic drift arguments from a pointwise Collatz proof. Tao’s theorem controls almost all starting values but deliberately does not eliminate every exceptional orbit. citeturn250353search0

---

## 6. An exact replacement target: the retained prefix tree

Although the finite Lyapunov version fails, SOS can still be used locally inside an unbounded refinement argument.

First recall the elementary descent criterion.

### Lemma

The Collatz conjecture is equivalent to

\[
\forall n>1\ \exists j\ge1:
T^j(n)<n. \tag{17}
\]

### Proof

One direction is immediate because reaching \(1\) gives an iterate below \(n\).

Conversely, assume every \(n>1\) has an iterate below itself. Strong induction on \(n\) proves convergence: choose \(j\) with \(T^j(n)=m<n\); by induction \(m\) reaches \(1\), so \(n\) does as well. ∎

Now construct parity cylinders from the binary digits of the seed.

At depth \(j\), let

\[
P_j=2^j,\qquad Q_j=3^{s_j},
\]

and let

\[
R_j\in[0,P_j)
\]

be the seed residue associated with the current parity prefix. Define

\[
X_j=T^j(R_j).
\]

A child is selected by the next binary seed bit

\[
b_j\in\{0,1\},
\]

so that

\[
R_{j+1}=R_j+b_jP_j. \tag{18}
\]

Because the first \(j\) steps are affine with multiplier \(Q_j/P_j\),

\[
T^j(R_j+b_jP_j)=X_j+b_jQ_j. \tag{19}
\]

Set

\[
Y_j=X_j+b_jQ_j,
\qquad
\epsilon_j\equiv Y_j\pmod2.
\]

Then the exact child recurrences are

\[
P_{j+1}=2P_j, \tag{20}
\]

\[
Q_{j+1}=3^{\epsilon_j}Q_j, \tag{21}
\]

\[
X_{j+1}
=
\frac{3^{\epsilon_j}Y_j+\epsilon_j}{2}. \tag{22}
\]

Since \(b_j,\epsilon_j\) are Boolean,

\[
3^{\epsilon_j}=1+2\epsilon_j,
\]

so these are polynomial equations:

\[
R'=R+bP,\qquad P'=2P,\qquad Q'=(1+2\epsilon)Q, \tag{23}
\]

\[
2X'=(1+2\epsilon)(X+bQ)+\epsilon. \tag{24}
\]

The retained condition is

\[
X_j\ge R_j. \tag{25}
\]

It means that the depth-\(j\) endpoint has not dropped below the depth-\(j\) seed representative.

A positive integer has an eventually-zero binary expansion. Hence along its prefix path,

\[
b_j=0
\]

for all sufficiently large \(j\), after which \(R_j\) is exactly the fixed starting integer.

### Exact survivor criterion

The Collatz conjecture is equivalent to the following assertion:

> There is no nontrivial infinite valid prefix path for which \(b_j=0\) eventually and \(X_j\ge R_j\) for all sufficiently large \(j\).

Indeed, if Collatz is false, choose the least counterexample \(n\). No iterate of \(n\) can be below \(n\), because every smaller integer converges by minimality. Its binary bits are eventually zero, producing such a retained path.

Conversely, an eventually-zero retained path stabilizes at an integer \(n>1\) whose orbit is eventually always at least \(n\), so it cannot reach \(1\).

This is the correct pointwise target.

---

## 7. Compact normalized polynomial dynamics

The prefix equations admit a useful normalization:

\[
\rho_j=\frac{R_j}{P_j},\qquad
y_j=\frac{X_j}{Q_j},\qquad
u_j=\frac1{P_j},\qquad
z_j=\frac1{Q_j}.
\]

Equations (18)–(22) become

\[
\rho'=\frac{\rho+b}{2}, \tag{26}
\]

\[
y'=\frac{y+b}{2}+\frac{\epsilon z}{6}, \tag{27}
\]

\[
u'=\frac u2, \tag{28}
\]

\[
z'=z\left(1-\frac{2\epsilon}{3}\right). \tag{29}
\]

The retained inequality \(X\ge R\) becomes the polynomial inequality

\[
uy-z\rho\ge0. \tag{30}
\]

For actual prefix states,

\[
0\le \rho<1,\qquad 0\le y<1,\qquad 0<u,z\le1.
\]

Thus the normalized continuous variables live in a compact box. The Boolean equations are

\[
b^2-b=0,\qquad \epsilon^2-\epsilon=0. \tag{31}
\]

This is an excellent domain for SOS and Positivstellensatz calculations.

But there is a crucial caveat: equations (26)–(31) alone do not encode full integrality. A finite collection of residue indicators enforces only finitely much \(2\)-adic information. Arbitrarily long all-odd prefixes continue to pass every fixed finite-depth relaxation.

---

## 8. What a genuinely decisive SOS certificate would need

A successful version can no longer be one stationary finite Lyapunov function. It must be a **refinement-compatible family** of arithmetic barrier certificates.

At residue depth \(\ell\), let \(\alpha\) denote the complete finite residue state. Let \(K_{\alpha,\ell}\) be the corresponding compact semialgebraic set, including

\[
0\le\rho,y,u,z\le1,\qquad uy-z\rho\ge0,
\]

the Boolean equations, and the exact residue constraints available at level \(\ell\).

For a transition \(\alpha\to\beta\), an SOS identity would have the form

\[
B_{\alpha,\ell}(\xi)
-
B_{\beta,\ell}\!\left(F_{b,\epsilon}(\xi)\right)
=
\sigma_0(\xi)
+
\sum_i \sigma_i(\xi)g_i(\xi)
+
\sum_j q_j(\xi)h_j(\xi), \tag{32}
\]

where

* \(\xi=(\rho,y,u,z)\);
* \(g_i\ge0\) define the semialgebraic region;
* \(h_j=0\) are Boolean and residue equations;
* each \(\sigma_i\) is SOS;
* every coefficient and Gram matrix is rational.

However, local nonincrease is not enough. The family must also supply a well-founded conclusion such as:

1. a nonnegative integer-valued rank that drops on every retained \(b=0\) transition; or
2. a multiplicative barrier bounded away from zero on retained states but contracting by a rational factor \(<1\); or
3. a discrete LaSalle argument in which the common zero set of all dissipation polynomials contains no valid projective orbit; or
4. a symbolic induction in \(\ell\) proving that every retained projective path injects infinitely many \(b_j=1\).

The fourth formulation is closest to the real arithmetic obstruction:

\[
\boxed{
\text{Every infinite retained valid path has infinitely many nonzero seed bits.}
}
\tag{33}
\]

Because positive integers have eventually zero seed bits, equation (33) would prove Collatz.

The certificate must be compatible as

\[
\ell\longrightarrow\ell+1.
\]

Merely solving larger and larger unrelated SDPs is evidence, not a proof. One needs a uniform symbolic recurrence for the Gram matrices, multipliers, or barrier polynomials and an exact induction verifying it at every refinement.

---

## 9. Why rationalization is not the missing step

Once a strictly feasible numerical SOS solution is found, the usual exact pipeline is sound:

1. solve the SDP at high precision;
2. project the approximate Gram matrices onto the exact affine coefficient constraints;
3. perform rational reconstruction;
4. verify positive semidefiniteness exactly, for example by rational \(LDL^{\mathsf T}\);
5. expand every polynomial identity in exact arithmetic;
6. retain an explicit rational positivity margin.

This symbolic-numeric procedure is well established. citeturn114051search1

For the elementary branch certificates above, even that machinery is unnecessary: equation (7) is already an integer SOS certificate.

The unsolved part is therefore not numerical certification. It is constructing a well-founded, refinement-compatible arithmetic barrier that eliminates the eventually-zero survivor paths.

---

# Conclusion

The proposed approach, interpreted as

\[
\text{finite block}
+
\text{finite residue indicators}
+
\text{proper polynomial Lyapunov function}
+
\text{one finite SDP},
\]

cannot yield a Collatz proof. The obstruction is rigorous and is supplied by the arbitrarily long increasing prefixes beginning at \(2^L-1\).

What has been established here is:

\[
\begin{aligned}
&\text{an exact affine and semialgebraic encoding of every block;}\\
&\text{an exact weighted-SOS certificate for every contracting cylinder;}\\
&\text{a proof that no bounded-horizon direct contraction certificate exists;}\\
&\text{a proof that no finite-state proper polynomial Lyapunov certificate exists;}\\
&\text{an exact projective survivor criterion equivalent to Collatz;}\\
&\text{the normalized polynomial dynamics on which a corrected SOS hierarchy must act.}
\end{aligned}
\]

The decisive missing theorem is the refinement-compatible SOS exclusion of an eventually-zero retained path. No such exact rational certificate has been produced here, so claiming a completed Collatz proof would be incorrect.