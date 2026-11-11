model: GPT-5 Pro
round: 18 -- approach 13, Exact arithmetic optimal transport extending Tao
front: proof
sent: 2026-08-13T18:43:08Z
worked: 37m 38s

---

# Outcome of the program

Carrying this approach through produces a strong exact transport theorem, but **not a proof of Collatz**. The decisive distinction is:

\[
\boxed{\text{the randomized Syracuse operator is uniformly contractive}}
\]

whereas

\[
\boxed{\text{the exact integer Syracuse operator is not uniformly contractive on all cylinders}.}
\]

The second statement is not merely unproved. In every natural fixed-horizon formulation, it is false: positive integers can shadow the expanding \(2\)-adic fixed point \(-1\) for arbitrarily long periods.

Tao’s theorem obtains approximate transport between first-passage distributions of logarithmically random starting values. Its conclusion is correspondingly an almost-all result in logarithmic density, not a statement about every starting integer. citeturn515498view0

What follows is a complete derivation of:

1. an exact Wasserstein contraction extending Tao’s stochastic model;
2. exact regeneration uniformly over every finite \(2\)-adic valuation cylinder;
3. a rigorous obstruction showing why neither statement implies pointwise Collatz;
4. a sharp entropy identity explaining the obstruction quantitatively;
5. the exact arithmetic optimal-transport theorem that would still be sufficient to prove Collatz.

---

## 1. The exact random transport operator

Let

\[
U(n)=\frac{3n+1}{2^{a(n)}},
\qquad
a(n)=\nu _2(3n+1),
\]

be the accelerated Collatz—or Syracuse—map on positive odd integers.

For every positive integer \(a\), introduce the affine branch

\[
f_a(x)=\frac{3x+1}{2^a}.
\]

The actual map is \(U(n)=f_{a(n)}(n)\). Tao replaces the deterministic valuation \(a(n)\), for typical starting values and suitable time ranges, by a geometric random variable

\[
\mathbb P(A=a)=2^{-a},
\qquad a\geq 1.
\]

For a word \(\mathbf a=(a_1,\ldots ,a_k)\), this gives probability

\[
\mathbb P((A_1,\ldots ,A_k)=\mathbf a)
   =2^{-(a_1+\cdots +a_k)}.
\]

This is exactly the geometric valuation law appearing in Tao’s construction. citeturn664973view0

Define the Markov operator

\[
\mathsf P\mu
   =\sum_{a=1}^{\infty}2^{-a}(f_a)_{\#}\mu.
\]

Thus \(\mathsf P\delta_x\) is the law of

\[
\frac{3x+1}{2^A}.
\]

This is generally not supported on integers, but it is a perfectly exact stochastic operator on the positive reals, the \(3\)-adics, or an adelic product.

### Theorem 1: Archimedean Wasserstein contraction

For \(0<\theta<1\), put

\[
d_\theta(x,y)=|x-y|^\theta .
\]

Because \(t\mapsto t^\theta\) is subadditive, \(d_\theta\) is a metric. Let \(W_\theta\) denote the corresponding \(1\)-Wasserstein distance. Then

\[
W_\theta(\mathsf P\mu,\mathsf P\nu)
   \leq \rho_\theta W_\theta(\mu,\nu),
\]

where

\[
\boxed{
\rho_\theta
 =\sum_{a=1}^{\infty}
      2^{-a}\left(\frac{3}{2^a}\right)^\theta
 =\frac{3^\theta}{2^{1+\theta}-1}
 <1.
}
\]

#### Proof

Take any coupling \((X,Y)\) of \(\mu\) and \(\nu\), and independently sample \(A\) with \(\mathbb P(A=a)=2^{-a}\). Couple the two images using the same \(A\). Then

\[
f_A(X)-f_A(Y)=\frac{3}{2^A}(X-Y),
\]

so

\[
\begin{aligned}
\mathbb E\,d_\theta(f_A(X),f_A(Y))
 &=\mathbb E\left[
       \left(\frac{3}{2^A}\right)^\theta
       |X-Y|^\theta
     \right]\\
 &=\left(
       \sum_{a=1}^{\infty}
       2^{-a}\left(\frac{3}{2^a}\right)^\theta
   \right)
   \mathbb E|X-Y|^\theta\\
 &=\rho_\theta\mathbb E\,d_\theta(X,Y).
\end{aligned}
\]

Taking the infimum over all couplings proves the Wasserstein inequality.

It remains to show \(\rho_\theta<1\). Since \(t^\theta\) is strictly concave and \(2=(1+3)/2\),

\[
2^\theta>\frac{1+3^\theta}{2}.
\]

Therefore

\[
2^{1+\theta}>1+3^\theta,
\]

and hence

\[
2^{1+\theta}-1>3^\theta.
\]

Thus \(\rho_\theta<1\). ∎

The best exponent is

\[
\theta_*
 =\log_2\left(\frac{\log 3}{\log(3/2)}\right)-1
 \approx 0.4380326593,
\]

and the optimal contraction factor is

\[
\boxed{
\rho_*=\rho_{\theta_*}
       \approx 0.9465045768.
}
\]

At the ordinary Wasserstein exponent \(\theta=1\),

\[
\rho_1=\frac{3}{4-1}=1.
\]

Thus the stochastic Syracuse map is only nonexpansive in ordinary \(W_1\); the strict contraction appears after snowflaking the metric.

---

## 2. Exact \(3\)-adic contraction

On \(\mathbb Z_3\), use

\[
d_3(x,y)=|x-y|_3=3^{-\nu_3(x-y)}.
\]

Since \(2\) is a \(3\)-adic unit,

\[
\begin{aligned}
d_3(f_a(x),f_a(y))
 &=\left|\frac{3(x-y)}{2^a}\right|_3\\
 &=\frac13d_3(x,y).
\end{aligned}
\]

Consequently,

\[
\boxed{
W_{d_3}(\mathsf P\mu,\mathsf P\nu)
   \leq \frac13W_{d_3}(\mu,\nu).
}
\]

This contraction does not merely hold on average over \(a\); every individual branch contracts by exactly \(1/3\) in the \(3\)-adic metric.

Tao’s Syracuse random variables satisfy precisely the recursion

\[
\mathbf S_{k+1}
   =\frac{3\mathbf S_k+1}{2^{A_{k+1}}},
\qquad A_{k+1}\sim\operatorname{Geom}(2),
\]

and their inverse-limit law is the stationary distribution of this \(3\)-adic Markov chain. citeturn664973view0turn664973view2

On the product state space \(\mathbb R_{\geq0}\times\mathbb Z_3\), set

\[
D_\theta((x,z),(y,w))
   =|x-y|^\theta+\lambda |z-w|_3.
\]

The same synchronous coupling gives

\[
W_{D_\theta}(\mathsf P\mu,\mathsf P\nu)
 \leq
 \max\{\rho_\theta,1/3\}
 W_{D_\theta}(\mu,\nu).
\]

Since \(\rho_\theta>1/3\), the optimal factor remains approximately \(0.9465\).

This is an **exact arithmetic optimal-transport theorem**. The problem is that it governs a randomized affine map, not the deterministic orbit of one integer.

---

## 3. Exact transport uniformly over every valuation cylinder

There is an even stronger exact result on the source side.

For a valuation word

\[
w=(a_1,\ldots ,a_k),
\qquad
A_j=a_1+\cdots +a_j,
\qquad
A=A_k,
\]

define

\[
C_w
 =\sum_{j=0}^{k-1}3^{k-1-j}2^{A_j},
\qquad A_0=0.
\]

Then every realization satisfies

\[
\boxed{
U^k(n)=\frac{3^kn+C_w}{2^A}.
}
\]

Let

\[
\mathcal C_w
 =\{n\in 2\mathbb Z_2+1:
       (a(n),a(U(n)),\ldots ,a(U^{k-1}(n)))=w\}
\]

be the \(2\)-adic valuation cylinder determined by \(w\).

### Theorem 2: Exact cylinder regeneration

For every valuation word \(w\):

1. \(\mathcal C_w\) is one odd residue class modulo \(2^{A+1}\);
2. its normalized Haar measure is \(2^{-A}\);
3. conditional Haar measure on \(\mathcal C_w\) is pushed by \(U^k\) exactly to Haar measure on \(2\mathbb Z_2+1\);
4. conditioned on any finite past valuation word, all future valuations are independent copies of \(\operatorname{Geom}(2)\).

#### Proof

For one valuation \(a_1\),

\[
\nu_2(3n+1)=a_1
\]

is equivalent to

\[
3n+1\equiv 2^{a_1}\pmod{2^{a_1+1}},
\]

which determines one odd residue class modulo \(2^{a_1+1}\), because \(3\) is invertible modulo powers of \(2\).

Inductively, suppose the first \(j\) valuations determine one class

\[
n=n_j+2^{A_j+1}t.
\]

The affine formula gives

\[
U^j(n)=x_j+2\cdot3^jt.
\]

Requiring

\[
\nu_2(3U^j(n)+1)=a_{j+1}
\]

determines one residue class for \(t\) modulo \(2^{a_{j+1}}\). Hence it refines the original cylinder to one class modulo

\[
2^{A_j+1+a_{j+1}}=2^{A_{j+1}+1}.
\]

This proves the first statement.

There are \(2^A\) odd residue classes modulo \(2^{A+1}\), so normalized Haar measure gives \(\mathcal C_w\) mass \(2^{-A}\).

Now write

\[
n=n_w+2^{A+1}t,
\qquad t\in\mathbb Z_2.
\]

Then

\[
\begin{aligned}
U^k(n)
 &=\frac{3^kn_w+C_w}{2^A}
     +2\cdot3^kt\\
 &=x_w+2\cdot3^kt.
\end{aligned}
\]

Multiplication by the odd \(2\)-adic unit \(3^k\) preserves Haar measure on \(\mathbb Z_2\). Therefore \(U^k\) maps conditional Haar on \(\mathcal C_w\) exactly to Haar on the odd \(2\)-adics.

The future valuation sequence is consequently fresh i.i.d. geometric data, independent of the specified prefix. ∎

Tao notes this Haar invariance and the exact i.i.d. geometric valuation law on odd \(2\)-adic integers. citeturn664973view0turn664973view1

Thus the requested statement

> “transport uniformly over every starting cylinder”

is already true in the strongest possible **conditional-measure sense**.

But it does not imply a pointwise theorem. A single ordinary integer has Haar measure zero. Uniform probabilistic regeneration after every finite prefix does not prevent one exceptional infinite ray from lying in the exceptional part of every nested cylinder.

The Bernoulli sequence

\[
1,1,1,1,\ldots
\]

is the fundamental exceptional ray.

---

## 4. The exact deterministic obstruction

For every \(k\geq1\), define the all-\(1\) cylinder

\[
\mathcal E_k
 =\{n>0\text{ odd}:n\equiv-1\pmod{2^{k+1}}\}.
\]

### Theorem 3: Arbitrarily long expanding cylinders

Every \(n\in\mathcal E_k\) has first \(k\) Syracuse valuations equal to \(1\), and

\[
\boxed{
U^j(n)+1
  =\left(\frac32\right)^j(n+1)
  \qquad(0\leq j\leq k).
}
\]

In particular,

\[
U^j(n)>n
\qquad(1\leq j\leq k).
\]

#### Proof

Write

\[
n+1=2^{k+1}t.
\]

Suppose the formula holds at step \(j<k\). Then

\[
U^j(n)+1=3^j2^{k+1-j}t,
\]

and therefore

\[
\begin{aligned}
3U^j(n)+1
 &=3(U^j(n)+1)-2\\
 &=3^{j+1}2^{k+1-j}t-2\\
 &=2\left(3^{j+1}2^{k-j}t-1\right).
\end{aligned}
\]

Since \(k-j\geq1\), the expression in parentheses is odd. Thus

\[
\nu_2(3U^j(n)+1)=1,
\]

and

\[
U^{j+1}(n)+1
 =\frac32\bigl(U^j(n)+1\bigr).
\]

Induction proves the formula. ∎

### Consequence for Wasserstein contraction

For two numbers \(n,m\in\mathcal E_k\),

\[
U^k(n)-U^k(m)
   =\left(\frac32\right)^k(n-m).
\]

Hence for every \(0<\theta\leq1\),

\[
d_\theta(U^k(n),U^k(m))
  =\left(\frac32\right)^{k\theta}d_\theta(n,m).
\]

Thus the deterministic operator expands the snowflake metric by an arbitrarily large factor.

For the shifted logarithmic metric

\[
d_{\log}(n,m)
 =|\log(n+1)-\log(m+1)|,
\]

we instead obtain exact preservation:

\[
d_{\log}(U^k(n),U^k(m))
 =d_{\log}(n,m).
\]

So even logarithmic renormalization cannot produce a strict factor \(q<1\).

More generally, every distance from \(1\) which is strictly increasing with the ordinary size satisfies

\[
d(U^j(n),1)>d(n,1)
\qquad(1\leq j\leq k).
\]

Because \(k\) is arbitrary, no deterministic transport rule with a uniformly bounded positive stopping time can contract on every starting cylinder.

### Why finite residue and carry enrichment does not help

Suppose the enriched state contains residues modulo fixed powers of \(2\) and \(3\), together with finitely many carry symbols. Choose two distinct positive integers \(n,m\) satisfying simultaneously

\[
n\equiv m\equiv-1\pmod{2^{k+1}}
\]

and

\[
n\equiv m\pmod{2^r3^s}
\]

for moduli large enough to determine all the stored coordinates and their evolution through the chosen horizon. Such \(n,m\) exist by the Chinese remainder theorem.

Their residue and carry components agree, while their archimedean separation is multiplied by \((3/2)^k\). Therefore finite arithmetic enrichment cannot convert this cylinder into a contraction.

The obstruction is not missing carry information. It is a genuine expanding orbit segment.

---

## 5. The \(-1\) fixed point and terminal locality

The all-\(1\) cylinders converge \(2\)-adically to

\[
-1.
\]

The Syracuse map extends to odd \(2\)-adic integers, and

\[
U(-1)=\frac{3(-1)+1}{2}=-1.
\]

At the same time,

\[
U(1)=\frac{3+1}{4}=1.
\]

Thus the natural \(2\)-adic completion contains two distinct fixed points, \(1\) and \(-1\). A strict contraction on a metric space separating these points is impossible, since it would imply

\[
d(1,-1)
 =d(U(1),U(-1))
 \leq q\,d(1,-1),
\qquad q<1.
\]

The carry data does not exclude the \(-1\) ray. For the all-\(1\) word \(1^k\),

\[
C_{1^k}=3^k-2^k,
\]

and hence

\[
C_{1^k}+2^k=3^k.
\]

So the all-\(1\) ray has the strongest possible terminal \(3\)-adic compatibility.

Your terminal-locality theorem states that, for a word ending in a suffix \(v\) of length \(r\),

\[
3^r\mid X+1
\iff
3^r\mid C_v+2^{A(v)},
\]

so endpoint divisibility is determined entirely by that suffix. fileciteturn3file1L204-L227

For \(v=1^r\), the right-hand side vanishes modulo \(3^r\) exactly. Thus terminal carry locality recognizes the \(-1\) shadow as a perfectly coherent state. It cannot distinguish the genuine positive integers that merely shadow \(-1\) for a finite time from the infinite \(2\)-adic ray itself.

That distinction is global and archimedean.

---

## 6. The adelic product-formula obstruction

The tension between exactness and contraction can be expressed in one identity.

For a fixed branch \(f_a\),

\[
f_a(x)-f_a(y)=\frac{3}{2^a}(x-y).
\]

The scale factors at the three relevant places are

\[
\left|\frac3{2^a}\right|_\infty=\frac3{2^a},
\]

\[
\left|\frac3{2^a}\right|_2=2^a,
\]

and

\[
\left|\frac3{2^a}\right|_3=\frac13.
\]

Therefore

\[
\boxed{
\left|\frac3{2^a}\right|_\infty
\left|\frac3{2^a}\right|_2
\left|\frac3{2^a}\right|_3
=1.
}
\]

The \(3\)-adic coordinate contracts by \(1/3\). The archimedean coordinate contracts on average. But the \(2\)-adic coordinate—the coordinate that determines which valuation \(a\) is legally available—expands by \(2^a\).

Tao’s stochastic model averages away this expanding source coordinate and replaces it by geometric noise. Restoring enough \(2\)-adic information to make the branch exact restores precisely the expansion that the random operator omitted.

In this sense, the failure of exact uniform contraction is enforced by the product formula.

---

## 7. A sharp entropy obstruction

There is also a quantitative counting version of the same phenomenon.

Consider a length-\(k\) inverse valuation word

\[
b=(b_1,\ldots ,b_k),
\qquad
B=b_1+\cdots +b_k.
\]

If \(Y\) is the ancestor and \(X\) the endpoint, then

\[
2^BX=3^kY+C_b,
\]

so

\[
Y=\frac{2^BX-C_b}{3^k}.
\]

The inverse slope is

\[
\frac{2^B}{3^k}.
\]

It is nonexpanding precisely when

\[
2^B\leq3^k,
\qquad
B\leq \beta k,
\qquad
\beta=\log_2 3.
\]

For a fixed word \(b\), integrality of \(Y\) requires

\[
2^BX\equiv C_b\pmod{3^k}.
\]

Since \(2\) is invertible modulo \(3^k\), each word is compatible with exactly one endpoint residue class modulo \(3^k\).

### Theorem 4: Nonexpanding inverse words cannot cover all residues

Let

\[
M_k=\lfloor\beta k\rfloor.
\]

The number of length-\(k\) positive valuation words with \(B\leq M_k\) is

\[
N_k
 =\sum_{B=k}^{M_k}\binom{B-1}{k-1}
 =\binom{M_k}{k}.
\]

Consequently, these words can cover at most \(N_k\) of the \(3^k\) endpoint residue classes. Moreover,

\[
\frac{N_k}{3^k}
 =q_*^{\,k+o(k)},
\]

where

\[
\boxed{
q_*
 =\frac{\beta^\beta}
        {3(\beta-1)^{\beta-1}}
 \approx0.9465045768<1.
}
\]

#### Proof

The number of positive compositions of \(B\) into \(k\) parts is

\[
\binom{B-1}{k-1}.
\]

The hockey-stick identity gives

\[
\sum_{B=k}^{M_k}\binom{B-1}{k-1}
 =\binom{M_k}{k}.
\]

Because each word covers at most one residue class modulo \(3^k\), at most \(N_k\) classes are covered.

Stirling’s formula gives

\[
\binom{\beta k+o(k)}{k}
 =
 \left(
 \frac{\beta^\beta}
      {(\beta-1)^{\beta-1}}
 \right)^{k+o(k)}.
\]

Dividing by \(3^k\) proves the result. ∎

Thus an exponentially large proportion of endpoint residues have no nonexpanding inverse word at a fixed depth.

A branch with slope \(>1\) might still produce a smaller ancestor for one particular small endpoint because of its affine constant. But it cannot provide uniform descent for arbitrarily large values. Therefore no fixed-depth, slope-only inverse transport can cover all arithmetic cylinders.

### Exact duality with stochastic Wasserstein contraction

Remarkably,

\[
\boxed{
q_*=\min_{0<\theta<1}\rho_\theta.
}
\]

Indeed,

\[
\rho_\theta=\frac{3^\theta}{2^{1+\theta}-1},
\]

and its minimizer satisfies

\[
2^{1+\theta_*}
   =\frac{\log3}{\log(3/2)}
   =\frac{\beta}{\beta-1}.
\]

Substitution gives

\[
\rho_{\theta_*}
 =\frac{\beta^\beta}
        {3(\beta-1)^{\beta-1}}
 =q_*.
\]

This equality is not a numerical accident. It is a Chernoff–entropy duality:

- \(\rho_*\) is the best possible contraction rate after averaging over geometric valuation words;
- the same number \(q_*\) is the exponential density of the low-exponent inverse words that could possibly give uniform nonexpanding coverage.

The stochastic contraction rate is exactly the deterministic coverage deficit.

That is the quantitative form of the averaging-to-pointwise gap.

---

## 8. An exact optimal-transport criterion that would prove Collatz

There is nevertheless a clean pointwise transport theorem.

Call a positive odd integer \(y\) a **coalescing ancestor** of \(n\) if their Syracuse orbits eventually meet.

### Theorem 5: Pointwise coalescing-transport criterion

Fix \(0<\theta<1\). Suppose that for every positive odd \(n>1\), one can construct a probability measure \(K_n\) supported on positive coalescing ancestors of \(n\) such that

\[
\boxed{
W_{d_\theta}(K_n,\delta_1)
 <
d_\theta(n,1).
}
\]

Then the Collatz conjecture is true.

#### Proof

Suppose Collatz is false, and let \(m\) be the least positive odd counterexample.

Every positive coalescing ancestor \(y\) of \(m\) is itself a counterexample. Otherwise \(y\) would reach \(1\), and once its orbit merged with the orbit of \(m\), the orbit of \(m\) would also reach \(1\). Minimality therefore gives

\[
y\geq m
\]

for every \(y\) in the support of \(K_m\).

Since \(d_\theta(y,1)=(y-1)^\theta\) is increasing,

\[
\begin{aligned}
W_{d_\theta}(K_m,\delta_1)
 &=\int (y-1)^\theta\,dK_m(y)\\
 &\geq(m-1)^\theta\\
 &=d_\theta(m,1),
\end{aligned}
\]

contradicting the assumed strict contraction. ∎

A uniform factor

\[
W_{d_\theta}(K_n,\delta_1)
 \leq q\,d_\theta(n,1),
\qquad q<1,
\]

would be more than sufficient, but strict pointwise decrease is already enough.

---

## 9. The exact transport inequality in your local–global coordinates

Your existing competitor construction supplies the right support for \(K_n\).

For a word split as

\[
w=u\tau,
\]

a compatible competing suffix \(b\) produces an ancestor \(Y_b\) satisfying

\[
\boxed{
Y_b-R
 =\frac{\Sigma(u,\tau,c)+h(\tau,b)}{2^c}.
}
\]

Here:

- the compatible fibre and \(h(\tau,b)\) are terminal and \(3\)-adic;
- \(\Sigma(u,\tau,c)\) is the prefix-dependent archimedean surplus.

This exact decomposition is already established in your framework. fileciteturn3file0L44-L100

Put a probability distribution \(p_b\) on a nonempty compatible fibre, supported only on positive ancestors. Then

\[
K_R=\sum_b p_b\delta_{Y_b}.
\]

Since \(t^\theta\) is concave,

\[
\begin{aligned}
W_{d_\theta}(K_R,\delta_1)
 &=\sum_b p_b(Y_b-1)^\theta\\
 &=
 \sum_b p_b
 \left(
 R-1+
 \frac{\Sigma+h(\tau,b)}{2^c}
 \right)^\theta\\
 &\leq
 \left(
 R-1+
 \frac{\Sigma+\sum_b p_b h(\tau,b)}{2^c}
 \right)^\theta.
\end{aligned}
\]

Therefore the exact arithmetic transport condition

\[
\boxed{
\Sigma(u,\tau,c)
   +\sum_b p_bh(\tau,b)<0
}
\]

implies

\[
W_{d_\theta}(K_R,\delta_1)
 <d_\theta(R,1).
\]

This is the optimal-transport form of the missing pointwise synchronization theorem.

Your current stronger target is

\[
\Sigma(u,\tau,c)+h_{\max}(\tau,B)<0,
\]

which forces even the largest compatible ancestor below \(R\). The established analysis shows that the terminal state determines \(h_{\max}\), while the prefix controls \(\Sigma\); no suffix-local rule currently synchronizes their signs along every positive stationary ray. fileciteturn3file0L164-L178

---

# Final conclusion

The proposed route does **not** presently give a valid full proof of Collatz. Instead, it gives the following sharp diagnosis:

\[
\begin{array}{c}
\text{Random geometric valuations}\\
\Downarrow\\
\text{exact Wasserstein contraction}
\end{array}
\qquad\text{but}\qquad
\begin{array}{c}
\text{exact \(2\)-adic branch legality}\\
\Downarrow\\
\text{arbitrarily long expanding cylinders}.
\end{array}
\]

Uniform conditional transport over every finite valuation cylinder is already exact, but it remains measure-theoretic. Uniform deterministic contraction over every cylinder is false because of the all-\(1\) cylinders shadowing \(-1\). The best stochastic contraction rate, approximately \(0.9465045768\), exactly equals the exponential deficit of low-slope inverse words available to cover all \(3\)-adic residues.

A viable optimal-transport proof would therefore have to abandon fixed-horizon uniform contraction. It would require a **nonuniform, unbounded stopping-time transport**, defined specifically on rays whose nested \(2\)-adic representatives stabilize at a positive ordinary integer, and it would have to establish

\[
\Sigma+\mathbb E h<0
\]

at some finite stage of every such ray. That is not a consequence of Tao’s mixing or of terminal carry locality; it is precisely the remaining global synchronization problem. Claiming a Collatz proof without that theorem would leave the central pointwise gap unresolved.