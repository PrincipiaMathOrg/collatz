model: GPT-5.6 Pro (Chat mode)
round: 36 -- approach 31, Rotor-router inverse branching
front: proof
sent: 2026-08-14T20:43Z
worked: 37m 52s

---
# Rotor-router inverse branching: rigorous outcome

A valid full proof does **not** result from the proposed route as stated. The rotor part can be formalized and does give a deterministic version of the inverse branching model, but two decisive problems remain:

1. The actual Collatz inverse tree is not the natural bounded-discrepancy rotor realization of that model.
2. “Covering all residue classes” is insufficient. In fact, every Collatz inverse tree already intersects every arithmetic progression, unconditionally.

What follows is a complete derivation of the rotor construction, a finite exact obstruction to the proposed sandwich, and a strengthened quantitative statement that really would imply Collatz.

## 1. Exact inverse tree

Use the shortcut map

\[
T(n)=
\begin{cases}
n/2,&n\equiv0\pmod2,\\[2mm]
(3n+1)/2,&n\equiv1\pmod2.
\end{cases}
\]

Let

\[
\mathcal P(a)=\{n\ge1:T^k(n)=a\text{ for some }k\ge0\}.
\]

The Collatz conjecture is precisely

\[
\mathcal P(1)=\mathbb N.
\]

The inverse branches are

\[
E(x)=2x,\qquad O(x)=\frac{2x-1}{3}.
\]

The branch \(O(x)\) is integral exactly when \(x\equiv2\pmod3\). After deleting nodes divisible by \(3\), the pruned inverse rule becomes

\[
\widetilde T^{-1}(x)=
\begin{cases}
\{2x\},&x\equiv1,4,5,7\pmod9,\\[2mm]
\left\{2x,\dfrac{2x-1}{3}\right\},
   &x\equiv2,8\pmod9.
\end{cases}
\tag{1}
\]

This is the standard pruned inverse tree used in the stochastic-tree literature. citeturn639386view2

## 2. Exact inverse-word arithmetic

For a word

\[
w=(\varepsilon _1,\ldots,\varepsilon _k)\in\{0,1\}^k,
\]

interpret \(\varepsilon_i=0\) as applying \(E\) and \(\varepsilon_i=1\) as applying \(O\). Put

\[
s_i=\varepsilon_1+\cdots+\varepsilon_i,\qquad s_0=0,
\]

and

\[
C_w=\sum_{i=1}^k
\varepsilon_i\,2^{k-i}3^{s_{i-1}}.
\]

A direct induction gives

\[
B_{\varepsilon_k}\circ\cdots\circ B_{\varepsilon_1}(a)
=
\frac{2^ka-C_w}{3^{s_k}},
\tag{2}
\]

where \(B_0=E\) and \(B_1=O\).

For \(3\nmid a\), the word is a legal path in the pruned inverse tree exactly when

\[
v_3(2^ka-C_w)=s_k.
\tag{3}
\]

Indeed, divisibility by \(3^{s_k}\) gives integrality of every prefix of the path. Requiring the valuation to be exactly \(s_k\) says that the final node is not divisible by \(3\); this also forces every earlier node to be nonzero modulo \(3\), since a node divisible by \(3\) cannot later accept an \(O\)-step.

### Exact averaged leaf count

Fix \(w\) with \(s=s_k\). As \(a\) ranges over the \(2\cdot3^k\) unit classes modulo \(3^{k+1}\), condition (3) holds for exactly

\[
2\cdot 3^{k-s}
\]

classes:

- modulo \(3^s\), the congruence \(2^ka\equiv C_w\) has one solution;
- among its three lifts modulo \(3^{s+1}\), exactly one has valuation greater than \(s\);
- the other two have valuation exactly \(s\);
- the remaining \(k-s\) ternary digits are unrestricted.

Thus the probability that a uniformly selected unit root admits \(w\) is exactly

\[
3^{-s}.
\]

Summing over all words,

\[
\begin{aligned}
\frac{1}{2\cdot3^k}
\sum_{\substack{a\bmod 3^{k+1}\\3\nmid a}}N_k^*(a)
&=\sum_{w\in\{0,1\}^k}3^{-|w|_1}\\
&=\left(1+\frac13\right)^k\\
&=\left(\frac43\right)^k.
\end{aligned}
\tag{4}
\]

Equivalently,

\[
\sum_{\substack{a\bmod3^{k+1}\\3\nmid a}}N_k^*(a)
=2\cdot4^k.
\]

This recovers the exact inverse-tree average in the literature. The associated stochastic model replaces the hidden ternary lift of a node by an independent uniform choice among its three possible lifts. citeturn639386view3turn312898view0

The crucial point is that (4) is an average over roots. It is not a pointwise statement about the fixed root \(a=1\).

## 3. A rigorous rotorization of the stochastic model

Fix \(j\ge1\), and let

\[
R_j=(\mathbb Z/3^j\mathbb Z)^\times
\]

be the set of possible types.

For a type \(r\in R_j\), its three lifts to modulus \(3^{j+1}\) are

\[
\widetilde r_t=r+t3^j,\qquad t=0,1,2.
\]

Let \(v_t(r)\) be the offspring vector in \(\mathbb Z_{\ge0}^{R_j}\) obtained by applying the exact rule (1) to \(\widetilde r_t\) and reducing the resulting child labels modulo \(3^j\).

The stochastic operator is

\[
P_j(r)=\frac13\sum_{t=0}^2v_t(r).
\tag{5}
\]

Now attach to each type \(r\) a rotor cycling through \(t=0,1,2\). If the rotor at \(r\) is fired \(q\) times, let \(n_t\) be the number of times it selects lift \(t\). Then

\[
n_t\in
\left\{
\left\lfloor\frac q3\right\rfloor,
\left\lceil\frac q3\right\rceil
\right\}
\]

and hence

\[
\left|n_t-\frac q3\right|<1.
\tag{6}
\]

The deterministic offspring vector is

\[
R_q(r)=\sum_{t=0}^2n_tv_t(r).
\]

Because each lift has at most two children,

\[
\begin{aligned}
\left\|R_q(r)-qP_j(r)\right\|_1
&\le
\sum_{t=0}^2
\left|n_t-\frac q3\right|
\|v_t(r)\|_1\\
&<6.
\end{aligned}
\tag{7}
\]

So the finite-type stochastic branching process does possess a deterministic rotor analogue with genuinely bounded **local** discrepancy.

That completes the first part of the proposed program.

## 4. Local discrepancy is not global discrepancy

Already in the one-type model, the offspring patterns are

\[
1,\quad 1,\quad 2
\]

in each rotor cycle. If \(Z_k\) is the generation-\(k\) population, then

\[
Z_{k+1}=\frac43 Z_k+e_k,\qquad |e_k|<1.
\tag{8}
\]

But iteration gives

\[
Z_k-\left(\frac43\right)^kZ_0
=
\sum_{\ell=0}^{k-1}
\left(\frac43\right)^{k-1-\ell}e_\ell.
\tag{9}
\]

Consequently, bounded one-step errors can accumulate to order

\[
\left(\frac43\right)^k.
\]

This is a basic difference between a mass-conserving rotor walk and a supercritical branching rotor process. Local rounding errors themselves get copied by later branching.

Thus (7) does not produce an \(O(1)\) discrepancy between the generation populations, much less between the sets of integer labels.

The stochastic models prove almost-sure growth rate \(4/3\) and predict only

\[
I^*(X)=X^{1+o(1)}
\]

for the number of inverse progeny below \(X\). They do not predict that every integer below \(X\) occurs. citeturn680517view1

Classical rotor-router results compare hitting frequencies with Markov-chain probabilities under suitable potential-theoretic assumptions. Such results cannot simply be imported into this branching setting; constant single-vertex discrepancy is known to fail on infinite regular trees in general. citeturn639386view5turn639386view6

## 5. An exact obstruction in the inverse tree of \(1\)

The failure of the natural rotor coupling is already visible at depth \(9\).

Starting with \(L_0=\{1\}\) and applying (1), the depth-eight level is

\[
L_8=
\{1,4,5,16,20,26,64,80,85,256\}.
\]

Applying the inverse rule once gives

\[
L_9=
\{2,8,10,13,17,32,40,52,53,128,160,170,512\}.
\]

The nodes of type \(2\pmod3\) are

\[
\{2,8,17,32,53,128,170,512\}.
\]

Their lift counts modulo \(9\) are

\[
\begin{array}{c|ccc}
\text{residue modulo }9&2&5&8\\ \hline
\text{actual count}&2&1&5.
\end{array}
\tag{10}
\]

There are eight such nodes. Any cyclic three-state rotor fired eight consecutive times uses each state either twice or three times. Its count vector must therefore be a permutation of

\[
(3,3,2).
\tag{11}
\]

It cannot reproduce \((2,1,5)\).

More strongly, two phase-shifted unit-discrepancy rotors cannot sandwich the actual lift counts coordinatewise: every rotor upper count is at most \(3\), whereas the actual count in the \(8\pmod9\) lift is \(5\).

This does not rule out every possible discrepancy bound \(C>1\). It does rule out the natural claim that the actual inverse tree is itself a standard rotor realization, or is trapped between two unit-discrepancy rotor processes.

The hidden ternary digits in the actual tree are arithmetically correlated through the constants \(C_w\) in (2); they are not produced by a balanced rotor stack.

## 6. The fatal endpoint: residue coverage is already known

Suppose “cover all residue classes” means

\[
\forall d\ge1,\ \forall a\bmod d,\qquad
\mathcal P(1)\cap(a+d\mathbb Z)\ne\varnothing.
\tag{12}
\]

Statement (12) is already an unconditional theorem.

More generally, for every \(x\) not divisible by \(3\), every positive modulus \(d\), and every residue \(a\bmod d\), there is a positive integer \(y\equiv a\pmod d\) whose forward orbit reaches \(x\). Taking \(x=1\) proves (12). citeturn639386view0

Therefore, even in a hypothetical world containing a divergent orbit or a nontrivial cycle, the inverse tree of \(1\) would still meet every residue class modulo every integer.

In topological language, \(\mathcal P(1)\) is already dense in the profinite topology. Profinite density does not imply equality with \(\mathbb N\). A proper cofinite set meets every residue class, and many proper density-one sets do as well.

There are consequently only two possible interpretations:

- “At least one member of every residue class occurs.” This is already proved and is insufficient.
- “Every member of every residue class occurs.” This is simply \(\mathcal P(1)=\mathbb N\), the original conjecture.

Thus the proposed final implication is invalid.

## 7. What deterministic branching does prove

There is nevertheless a simple uniform growth theorem.

### Proposition

For every \(a\not\equiv0\pmod3\),

\[
N^*_{k+4}(a)\ge 2N^*_k(a).
\tag{13}
\]

Consequently,

\[
N^*_k(a)\ge 2^{\lfloor k/4\rfloor}.
\tag{14}
\]

### Proof

Under the always-available branch \(E(x)=2x\), the unit residues modulo \(9\) move as

\[
1\to2,\qquad
4\to8,\qquad
5\to1\to2,\qquad
7\to5\to1\to2.
\]

The residues \(2\) and \(8\) are branching residues. Therefore, starting from any unit residue, after at most three \(E\)-moves one reaches a node having two children.

After taking the two children, extend each by \(E\)-moves until exactly four inverse steps have been used. This produces two distinct depth-four descendants.

Descendant sets from two different nodes at the same level are disjoint: if a number were a four-step descendant of both \(x\) and \(x'\), applying \(T^4\) would give both \(x\) and \(x'\). Hence \(x=x'\).

This proves (13), and iteration proves (14). ∎

Much stronger universal exponential leaf-growth estimates are known—for sufficiently large \(k\), every pruned tree has at least \(1.302053^k\) leaves—but even those do not prove that the integer labels cover \(\mathbb N\). citeturn923363view0

The issue is not producing enough branches. It is placing those branches at the right integer labels.

## 8. The archimedean condition missing from residue coverage

A sufficient strengthening of (12) would be:

> For arbitrarily large \(m\), every nonzero residue \(1\le r<m\) has a representative  
> \[
> y\in\mathcal P(1),\qquad
> y\equiv r\pmod m,\qquad
> 1\le y<m.
> \tag{15}
> \]

But (15) immediately gives \(y=r\), since two positive numbers below \(m\) that are congruent modulo \(m\) are equal. Hence

\[
\{1,\ldots,m-1\}\subseteq\mathcal P(1).
\]

An unbounded sequence of such moduli would prove Collatz.

So the missing statement is not modular coverage but **height-controlled modular coverage**. The rotor model records branch frequencies and residues, whereas (15) couples the residue to the ordinary size of its representative.

The known arithmetic-progression theorem gives a bounded path length depending on the modulus, but it does not give \(y<m\); the resulting representative may be vastly larger than the modulus. citeturn397116view1

## 9. A quantitative rotor target that really would prove Collatz

There is a more plausible completion criterion.

Set

\[
A(X)=\#\bigl(\mathcal P(1)\cap[1,X]\bigr),\qquad
E(X)=X-A(X).
\]

Thus \(E(X)\) counts the possible exceptions up to \(X\).

### Power-saving completion lemma

If

\[
E(X)=o(X^{0.84}),
\tag{16}
\]

then the Collatz conjecture holds.

In particular, a bound

\[
E(X)=O(X^\theta)
\qquad\text{for some }\theta<0.84
\tag{17}
\]

would be a complete proof.

### Proof

Assume there is an exception \(b\notin\mathcal P(1)\). Its forward orbit remains outside \(\mathcal P(1)\).

After finitely many steps the orbit reaches some positive \(a\not\equiv0\pmod3\). Indeed, repeated halving eventually turns a multiple of \(3\) into an odd multiple of \(3\), after which

\[
T(a)=\frac{3a+1}{2}\not\equiv0\pmod3.
\]

Every inverse iterate of this new \(a\) is also an exception: if \(T^k(n)=a\) and \(n\) reached \(1\), then \(a\) would reach \(1\) as well.

The established inverse-iterate lower bound says that, for every fixed \(a\not\equiv0\pmod3\),

\[
\#\{n\le X:T^k(n)=a\text{ for some }k\}
\ge X^{0.84}
\]

for all sufficiently large \(X\). citeturn680517view3

All these inverse iterates lie in the exceptional set. Hence

\[
E(X)\ge X^{0.84}
\]

for sufficiently large \(X\), contradicting (16). ∎

This gives a precise goal for a repaired rotor-router program:

\[
\boxed{
X-\#\bigl(\mathcal P(1)\cap[1,X]\bigr)
=O(X^\theta)
\quad\text{for some }\theta<0.84.
}
\tag{18}
\]

A rotor comparison proving only

\[
\#\bigl(\mathcal P(1)\cap[1,X]\bigr)=X^{1+o(1)}
\]

does not imply (18). For example, \(X/\log X=X^{1+o(1)}\), while it misses almost all integers.

## 10. A smaller strongly sufficient target

There is also an exact residue-class reduction that is stronger than merely hitting every class.

Every positive Collatz orbit contains a number congruent to \(2\pmod9\). Consequently, it would suffice to prove

\[
\{n\ge1:n\equiv2\pmod9\}\subseteq\mathcal P(1).
\tag{19}
\]

This is an entire progression inclusion, not merely one inverse-tree hit in that progression. citeturn639386view1

Again, the distinction is decisive:

\[
\mathcal P(1)\cap(2+9\mathbb Z)\ne\varnothing
\]

is trivial and already known, while (19) would settle the conjecture.

# Conclusion

The rotor-router proposal has a rigorous core:

- the stochastic inverse-tree model can be replaced by a finite-type deterministic branching network;
- each rotor has uniformly bounded local discrepancy;
- the resulting process reproduces the \(4/3\) branching scale;
- deterministic inverse branching guarantees uniform exponential leaf growth.

But the intended completion fails at two exact places:

\[
\text{local rotor balance}
\;\not\Longrightarrow\;
\text{actual Collatz lift balance},
\]

as witnessed by the depth-nine count \((2,1,5)\), and

\[
\text{all residue classes are hit}
\;\not\Longrightarrow\;
\mathcal P(1)=\mathbb N,
\]

because universal residue-class hitting is already unconditional.

A successful rotor-router proof would therefore need a substantially stronger discrepancy theorem—one controlling **ordinary interval occupancy or representative height**, not merely branching frequencies or modular distributions. The concrete quantitative threshold is (18): a power-saving exceptional-set bound with exponent below \(0.84\) would turn the rotor comparison into a complete proof.