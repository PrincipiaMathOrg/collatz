model: GPT-5.6 Pro (Chat mode)
round: 41 -- approach 36, An algorithmic Lovasz local lemma
front: proof
sent: 2026-08-15T01:47Z
worked: 35m 33s

---
## Verdict

I did not obtain a valid unconditional proof of the Collatz conjecture from this approach. The literal Lovász-local-lemma step has the **opposite logical direction** from the one required. After repairing that defect, the approach becomes a precise and potentially computer-verifiable **ranked covering certificate**, but constructing that certificate requires exactly the local–global synchronization theorem that remains unproved.

The analysis does, however, yield several rigorous conclusions:

1. A direct Moser–Tardos or Shearer argument cannot prove that the death events cover every critical word.
2. Purely suffix-local death events are insufficient: the sign deciding descent depends on the entire prefix.
3. The symbolic critical-word space contains exact infinite survivors that correspond to negative or genuinely \(2\)-adic seeds rather than positive integers.
4. There is a corrected “dual witness-tree” certificate which, if found, would prove the conjecture after separately handling coefficient crossings.

What follows is the complete derivation.

---

## 1. Exact formulation of a death event

Use the accelerated map on positive odd integers

\[
U(x)=\frac{3x+1}{2^{\nu_2(3x+1)}}.
\]

For a valuation word

\[
w=(a_0,\ldots ,a_{j-1}),\qquad a_i\ge 1,
\]

put

\[
A_t=\sum_{i<t}a_i,
\qquad
C(w)=\sum_{i=0}^{j-1}3^{j-1-i}2^{A_i}.
\]

If \(w\) is followed from \(n\), ending at \(X\), then

\[
2^{A_j}X=3^j n+C(w).
\tag{1}
\]

Moreover, \(w\) is realized by exactly one odd residue class modulo \(2^{A_j+1}\). Denote its least positive representative by \(R(w)\). These affine and realization statements are exact. fileciteturn2file0L83-L135

Call \(w\) **critical** when

\[
2^{A_t}\le 3^t
\qquad (1\le t\le j).
\tag{2}
\]

The strict version uses \(<\). These are precisely the finite words whose multiplicative coefficient has not yet become contractive.

Now split

\[
w=u\tau,
\]

where \(\tau\) has length \(k\). Let \(Z\) be the state after following the prefix \(u\) from \(R=R(w)\). Consider a competing inverse word \(b\) of length \(k\), with

\[
c=A(\tau)-A(b)>0.
\]

Compatibility of \(b\) with the same endpoint is equivalent to

\[
C(b)\equiv 2^{-c}C(\tau)\pmod {3^k}.
\tag{3}
\]

When this holds, define

\[
h(\tau,b)=
\frac{C(\tau)-2^cC(b)}{3^k}\in\mathbb Z.
\tag{4}
\]

If \(Y\) is the ancestor obtained through \(b\), then

\[
2^cY=Z+h(\tau,b).
\tag{5}
\]

Defining the prefix surplus

\[
\Sigma(u,\tau,c)=Z-2^cR,
\tag{6}
\]

we obtain the exact comparison

\[
Y-R=\frac{\Sigma(u,\tau,c)+h(\tau,b)}{2^c}.
\tag{7}
\]

Thus a genuine death certificate consists of a compatible \(b\) for which

\[
0<Y<R.
\tag{8}
\]

For a least counterexample, such a \(Y\) is impossible: \(Y\) merges into the nonterminating orbit while being smaller than the least counterexample. The compatibility term \(h\) is terminal and \(3\)-adic, while \(\Sigma\) depends on the entire prefix. fileciteturn2file0L289-L377

---

## 2. The polarity obstruction for the Lovász local lemma

Let \(\Omega\) be a space of infinite word assignments, and let \(D_i\) be the proposed death events. The required covering statement is

\[
\Omega=\bigcup_iD_i,
\]

or equivalently

\[
\bigcap_i D_i^{\,c}=\varnothing.
\tag{9}
\]

Under any full-support probability measure, one would need

\[
\mathbb P\!\left(\bigcap_iD_i^{\,c}\right)=0.
\tag{10}
\]

But the Lovász local lemma is designed to prove the reverse conclusion. Under its probability and dependency hypotheses, it gives

\[
\mathbb P\!\left(\bigcap_iD_i^{\,c}\right)>0,
\tag{11}
\]

and algorithmic versions construct an assignment avoiding every \(D_i\). citeturn993955search5turn993955search2

Consequently:

> **Polarity proposition.**  
> Applying the algorithmic Lovász local lemma directly to the Collatz death events, with the death events treated as bad events, would construct a symbolic word that survives all of them. It cannot prove that no survivor exists.

Applying the LLL to the complementary events \(D_i^c\) does not repair matters. It would produce one assignment lying in every \(D_i\), whereas the required statement is that **every** assignment lies in at least one \(D_i\).

Nor can one take the contrapositive of an LLL numerical condition. The failure of an inequality such as \(epd<1\) does not imply that the corresponding constraint system is unsatisfiable. Even Shearer-type criteria concern positivity of avoidance probabilities based on prescribed dependency information; failure of those criteria is not a refutation of a particular arithmetic event system.

For computable infinite event systems, effective versions of the LLL can even produce computable infinite avoiders under suitable slack. Thus satisfying an infinite algorithmic-LLL hypothesis here would certify a symbolic survivor rather than eliminate one. citeturn993955search1

This does not make probabilistic ideas useless, but the random object must be changed. One could randomize the **choice of certificates** and use the LLL to select a family covering all finite states. The eventual proof would then be a deterministic covering certificate, not an LLL avoidance conclusion about Collatz words.

---

## 3. Why the death events are not genuinely local

Equation (3) is terminal-local. Equation (7) is not.

The exact terminal-locality theorem says that, for a suffix \(v\) of length \(r\),

\[
3^r\mid X+1
\quad\Longleftrightarrow\quad
3^r\mid C(v)+2^{A(v)}.
\tag{12}
\]

The prefix and starting value disappear completely from this congruence. There is also an exact right-to-left carry recursion deciding it. fileciteturn2file0L202-L287

However, descent requires the sign of

\[
\Sigma+h,
\]

not merely the existence or value of \(h\). Two strict-barrier words of length \(23\) were found with the same final suffix

\[
(3,1,1,2,1,2),
\]

and the same local length, exponent, and slope data, but their prefix surpluses are

\[
Z_1-16R_1=13,
\qquad
Z_2-16R_2=-6\,228\,506\,163.
\tag{13}
\]

Thus the part of the score omitted by terminal locality can move by billions while the entire terminal compatibility problem remains unchanged. fileciteturn3file0L260-L280

This produces a dependency dilemma.

If an event is allowed to inspect only the final \(r\) valuations, it has a bounded dependency neighborhood, but it cannot decide the sign of the descent score.

If an event includes the prefix information required to calculate \(\Sigma\), then an event at depth \(j\) depends on

\[
a_0,\ldots ,a_{j-1}.
\]

Events at two different depths therefore share almost all their variables. In the natural variable-dependency graph, the degree is unbounded and the events are nested rather than weakly dependent.

Grouping levels into blocks does not remove this problem: the prefix surplus is propagated through every preceding block. A successful block construction would need a finite state summarizing the prefix strongly enough to control \(\Sigma\). Producing such a finite summary is already the missing synchronization theorem.

The obstruction is not merely hypothetical. An explicit strict-barrier word of length \(42\) has optimal competing-ancestor cutoff exactly \(814\): no compatible competitor kills every realization beginning at \(813\), while one does kill every realization beginning at \(814\). This rules out the simplest bounded-small-cutoff version of the approach. fileciteturn3file0L310-L424

---

## 4. Positive-integral realizability is a global tail condition

There is a second locality obstruction that is independent of the descent score.

For an infinite valuation word \(a=(a_0,a_1,\ldots)\), let \(w_j\) be its prefix of length \(j\), and let

\[
R_j=R(w_j)
\]

be the least positive representative of its realization class. Because the realization classes are nested,

\[
R_{j+1}\equiv R_j\pmod {2^{A_j+1}}.
\tag{14}
\]

Since \(A_j\to\infty\), these congruences determine a unique \(2\)-adic integer

\[
\xi(a)\in\mathbb Z_2.
\]

### Proposition

The infinite word \(a\) is the valuation word of one fixed positive odd integer \(n\) if and only if

\[
R_j=n
\]

for all sufficiently large \(j\).

### Proof

If \(n\) realizes every prefix, then

\[
n\equiv R_j\pmod {2^{A_j+1}}.
\]

For sufficiently large \(j\), the modulus \(2^{A_j+1}\) exceeds \(n\). Since both \(n\) and \(R_j\) are positive representatives smaller than the modulus, they must be equal.

Conversely, if \(R_j=n\) eventually, then \(n\) lies in every sufficiently long realization class and therefore realizes every finite prefix. ∎

Thus ordinary positive realizability is equivalent to **eventual stabilization** of a sequence of prefix representatives. It cannot be detected from any bounded window of valuation letters.

Every finite word has positive realizations, so no finite prefix can distinguish between:

* a word ultimately generated by one fixed positive integer, and
* a word whose positive representatives continually lift to larger residue-class representatives and converge only \(2\)-adically.

### An exact spurious critical ray

Consider

\[
a=(1,2,1,2,\ldots).
\]

It is strictly critical. Indeed,

\[
A_{2m}=3m,
\qquad
A_{2m+1}=3m+1,
\]

and hence

\[
2^{A_{2m}}=8^m<9^m=3^{2m},
\]

while

\[
2^{A_{2m+1}}=2\cdot8^m
   <3\cdot9^m=3^{2m+1}.
\]

For one block \((1,2)\),

\[
U^2(x)=\frac{9x+5}{8}.
\tag{15}
\]

The algebraic fixed point is \(x=-5\). Indeed,

\[
-5\longmapsto -7\longmapsto -5,
\]

with valuations \(1,2\). Therefore the unique \(2\)-adic seed associated with the infinite word is the ordinary negative integer \(-5\).

For the prefix \((1,2)^m\), the realization class is

\[
n\equiv -5\pmod {2^{3m+1}},
\]

so its least positive representative is

\[
R_{2m}=2^{3m+1}-5.
\tag{16}
\]

These representatives tend to infinity rather than stabilizing. Thus this is an exact infinite critical symbolic ray, but not a positive Collatz counterexample.

It also avoids every nontrivial terminal-to-\(1\) suffix event arising from (12). A suffix ending in \(2\) already fails the one-level condition because

\[
1+2^2\not\equiv0\pmod3.
\]

A suffix of length at least \(2\) ending in \(1\) has final pair \((2,1)\). The exact level-two classification says that for an even penultimate exponent, the final exponent must be \(5\bmod 6\), not \(1\bmod6\). fileciteturn2file0L258-L285

Therefore terminal death events alone cannot cover the symbolic critical tree. They must be supplemented by a global condition detecting whether the nested \(2\)-adic representative stabilizes at a positive integer.

---

## 5. A finite-scale entropy obstruction

There is also a quantitative reason not to expect compatible local competitors to be plentiful.

Let

\[
\alpha=\log_2 3.
\]

Suppose a length-\(k\) competitor is allowed to have total exponent at most

\[
M=\lfloor\alpha k\rfloor.
\]

The number of positive exponent words of length \(k\) and total exponent \(B\) is

\[
\binom{B-1}{k-1}.
\]

Hence the total number of candidate words with \(B\le M\) is

\[
\sum_{B=k}^{M}\binom{B-1}{k-1}
=
\binom{M}{k}.
\tag{17}
\]

Each candidate contributes at most one value of \(C(b)\bmod 3^k\). Therefore its image occupies at most

\[
\binom{M}{k}
\]

of the \(3^k\) possible residue classes.

By Stirling’s formula,

\[
\binom{\lfloor\alpha k\rfloor}{k}^{1/k}
\longrightarrow
\gamma:=
\frac{\alpha^\alpha}{(\alpha-1)^{\alpha-1}}
\approx 2.8395137<3.
\tag{18}
\]

Consequently, the proportion of residue classes hit by these candidates is at most

\[
\left(\frac{\gamma}{3}+o(1)\right)^k
=
(0.9465046+o(1))^k.
\tag{19}
\]

Thus, at a fixed near-critical scale, the possible affine constants are exponentially sparse inside the full \(3^k\)-residue space.

This is not a proof that an actual Collatz endpoint avoids them: actual target residues are highly correlated with the prefix. But it shows precisely why a naive “every word has many independent local killers” estimate is unavailable. Any proof must exploit a special correlation between the prefix surplus, the terminal residue, and eventual ordinary stabilization.

That correlation is the synchronization problem.

---

## 6. The corrected replacement: a ranked covering certificate

There is a logically sound version of the proposed strategy. It is closer to a cyclic termination proof or a finite refutation system than to the ordinary LLL.

Let \(\mathcal T\) be the finitely branching tree of critical prefixes. For a fixed finite verification threshold \(M\), call a node \(w\) **\(M\)-dead** when an exact certificate proves that every positive realization \(n\ge M\) of \(w\) has a smaller positive integer whose orbit merges into its orbit.

A certificate may use:

* a direct iterate below \(n\);
* a compatible competing ancestor \(0<Y<n\);
* an exact residue obstruction;
* a previously verified descendant class.

The following is the appropriate dual analogue of a witness-tree theorem.

### Ranked-cover theorem

Suppose the nondead nodes of \(\mathcal T\) admit a finite-state labeling

\[
q:\mathcal T\setminus\mathcal D_M\longrightarrow Q
\]

and a rank

\[
\rho:Q\longrightarrow W
\]

into a well-founded ordered set \(W\). Suppose that for every state \(q\in Q\) there is a finite prefix code \(\mathcal P_q\) of extension blocks such that every feasible infinite continuation from a node \(w\) with label \(q\) begins with some \(v\in\mathcal P_q\), and every such feasible leaf \(wv\) satisfies at least one of:

\[
\begin{array}{ll}
\textup{(D)} & wv\text{ is }M\text{-dead};\\[1mm]
\textup{(L)} & R(wv)>R(w);\\[1mm]
\textup{(R)} & \rho(q(wv))<\rho(q(w)).
\end{array}
\tag{20}
\]

Then no nondead infinite critical ray can be realized by a fixed positive integer \(n\ge M\).

### Proof

Assume such a ray exists, generated by a positive integer \(n\). By the stabilization proposition,

\[
R(w_j)=n
\]

for every sufficiently long prefix \(w_j\).

Begin the ranked-cover decomposition after this stabilization point. Alternative (D) cannot occur because the ray is assumed nondead. Alternative (L) cannot occur because the representatives have stabilized. Therefore every successive covered block must satisfy (R).

This produces an infinite strictly descending sequence

\[
\rho(q_0)>\rho(q_1)>\rho(q_2)>\cdots
\]

in the well-founded order \(W\), a contradiction. ∎

This theorem handles the spurious \(2\)-adic rays correctly. Such a ray may repeatedly take lift transitions (L), whereas a ray coming from one fixed positive integer cannot do so forever.

It is also algorithmic in the relevant sense. A finite certificate would contain:

1. the state abstraction \(Q\);
2. the finite block covers \(\mathcal P_q\);
3. exact arithmetic verifications of every D/L/R leaf;
4. the well-founded rank inequalities.

A small checker could verify the whole object without trusting the search procedure.

---

## 7. Where an algorithmic LLL could legitimately enter

One could use Moser–Tardos as a **certificate-discovery algorithm**.

For each abstract state \(q\), introduce variables selecting candidate extension blocks and candidate arithmetic certificates. Define a flaw to mean that some feasible continuation from \(q\) is not covered by any D/L/R leaf. If these flaws have sufficiently small probabilities and sufficiently sparse dependencies, an algorithmic LLL could select a complete covering table.

But two estimates would first have to be proved:

\[
\Pr(\text{a feasible continuation is uncovered})\ll1,
\]

and

\[
\deg(\text{the certificate-selection dependency graph})<\infty
\]

with adequate quantitative margin.

The local–global score shows why neither estimate is presently available. The validity of a D-leaf depends on \(\Sigma+h\), and \(\Sigma\) carries the entire prefix. The unbounded \(3\)-adic carry runs similarly prevent a fixed-modulus automaton from deciding all relevant transitions; the existing carry analysis identifies the missing object as a finite-basis or synchronization invariant. fileciteturn2file1L942-L972

Thus the LLL could search for a finite ranked cover **after** the correct state space is discovered. It does not supply that state space by itself.

---

## 8. Exact remaining theorem

The arithmetic core can now be stated without probabilistic language.

> **Stationary-ray synchronization theorem.**  
> Let \(a=(a_i)_{i\ge0}\) be an infinite critical valuation ray whose nested realization representatives eventually stabilize at an ordinary positive integer \(n>1\). Then some finite prefix \(w=u\tau\) admits a competing word \(b\) such that
> \[
> c=A(\tau)-A(b)>0,
> \]
> \[
> 3^{|\tau|}
> \mid C(\tau)-2^cC(b),
> \]
> and, with
> \[
> h=\frac{C(\tau)-2^cC(b)}{3^{|\tau|}},
> \]
> \[
> 0<Z+h<2^c n.
> \tag{21}
> \]
> Equivalently, the associated compatible ancestor
> \[
> Y=\frac{Z+h}{2^c}
> \]
> satisfies
> \[
> 0<Y<n.
> \]

This is exactly the sought death event along a fixed positive stationary ray. The existing structural work reduces the missing comparison to the sign of

\[
\Sigma(u,\tau,c)+h_{\max}(\tau,B),
\]

but does not control that sign at all depths. fileciteturn2file0L441-L455

Even this theorem would need to be paired with an all-depth coefficient-crossing result. Current computation supports the claim that every nontrivial first coefficient crossing forces descent, but it has only been checked finitely; it is not presently an induction theorem. fileciteturn2file0L451-L453

Hence a complete proof through this architecture requires two new results:

\[
\boxed{\text{first-crossing elimination}}
\]

and

\[
\boxed{\text{a finite ranked cover proving stationary-ray synchronization}.}
\]

The algorithmic Lovász local lemma may be useful for discovering the second certificate, but the ordinary LLL avoidance conclusion cannot replace it. Until those two boxed statements are proved, the argument is a rigorous reduction and certificate framework rather than a proof of the Collatz conjecture.