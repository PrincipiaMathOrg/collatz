# The square-root phase gate for anchored Beatty cylinders

**Date:** 18 August 2026  
**Mode:** CALCULATE to SOLVE  
**Status:** The weaker target $Q^2\geq2^U$ admits a broader run-two
formulation, an exact first-failure recursion, and a terminal zero-lift
suffix of asymptotic length at least $0.7075r$. Exact searches support
the stronger inequality $q^2\geq2^{D+1}$ through depth $100$ in the
run-two class. We do not prove the reset transition at all depths.

## 1. The shifted phase debt

Put

\[
\gamma:=\log _2(3/2).
\tag{1}
\]

We use the partial integer map

\[
F(2k):=3k,
\qquad
F(4k+1):=3k+1,
\tag{2}
\]

with an exit at $4k+3$. We write $O$ for the first branch and $S$
for the second branch. For a valid word of length $t$, let $V_t$ be
its number of spikes, let $q_t$ be the least positive integer in its
dyadic cylinder, and put

\[
L_t:=t+V_t.
\tag{3}
\]

The phase debt relevant to a word of length $t$ is

\[
\boxed{
D_t:=\lfloor\gamma(t+1)\rfloor-V_t.
}
\tag{4}
\]

This shift by one is forced by the anchored leaf. Indeed, for a leaf of
length $n:=r-1$, we have

\[
e:=\lceil\gamma r\rceil=\lfloor\gamma r\rfloor+1
\tag{5}
\]

and hence

\[
\boxed{D_n=e-1-V_n=U.}
\tag{6}
\]

Every anchored spike word has no factor $SSS$. For $r\geq13$, this
follows from $e/r<2/3$; the smaller rational clocks are checked
directly. Therefore, the following assertion would imply the desired
anchored bound.

**Run-two square assertion.** Let $w$ be a valid word with no factor
$SSS$. If $D_t\geq1$, then

\[
\boxed{q_t^2\geq2^{D_t}.}
\tag{7}
\]

The exact data support the stronger assertion

\[
\boxed{q_t^2\geq2^{D_t+1}.}
\tag{8}
\]

The factor $2$ in (8) is sharp in the broader classes, since the
one-step word $O$ has

\[
q_1=2,
\qquad
D_1=1,
\qquad
q_1^2=2^{D_1+1}.
\tag{9}
\]

## 2. Exact first-failure recursion

We now derive the strongest scalar induction supplied by (8). Define

\[
d_{t+1}:=\lfloor\gamma(t+2)\rfloor-\lfloor\gamma(t+1)\rfloor
\in\{0,1\}.
\tag{10}
\]

At the next branch, the debt satisfies

\[
D_{t+1}=
\begin{cases}
D_t+d_{t+1},&O,\\[3pt]
D_t+d_{t+1}-1,&S.
\end{cases}
\tag{11}
\]

with initial condition $D_0=0$.

Let $M_t:=2^{L_t}$. If the ordinary child has a nonzero lift, then

\[
q_{t+1}=q_t+M_t\geq2q_t,
\tag{12}
\]

because $1\leq q_t\leq M_t$. A spike never increases the debt, and its
least representative is at least $q_t$. An ordinary branch with
$d_{t+1}=0$ also leaves the debt unchanged. Finally, equation (12)
multiplies the square by at least $4$, while an ordinary clock advance
multiplies the threshold by only $2$.

There is one initial case to record. If a first factor-two failure had
new debt $D=1$, then its parent would have debt zero. A zero-lift
ordinary child requires the parent endpoint to be even. However, a valid
path whose least representative is $q=1$ follows the spike branch while
it remains valid, and $S(1)=1$. Its endpoint is therefore odd. Hence a
zero-lift ordinary child has $q\geq2$, which already gives
$q^2\geq4=2^{D+1}$. Thus a first failure has $D\geq2$, and the induction
hypothesis applies to its parent.

We have therefore proved the following lemma.

**Lemma 1.** A first failure of (8) can occur only when

\[
\boxed{
d_{t+1}=1,
\qquad
O\text{ is chosen},
\qquad
q_{t+1}=q_t.
}
\tag{13}
\]

If the new debt is $D$, then the starting value lies in the exact band

\[
\boxed{2^D\leq q_t^2<2^{D+1}.}
\tag{14}
\]

For the weaker target (7), the corresponding band is

\[
2^{D-1}\leq q_t^2<2^D.
\tag{15}
\]

Thus taking a square does not create many new transition types. It moves
the same zero-lift mismatch to a wider dyadic band.

## 3. The square ordinary-run reserve

We next package every consecutive zero-lift ordinary run into one exact
quantity. Suppose that the endpoint belonging to $q_t$ is $z_t$, and
put

\[
k:=v_2(z_t).
\tag{16}
\]

The next $k$ ordinary branches are zero lifts. Define

\[
\boxed{
\mathscr S_t
:=q_t^2 2^{L_t+k}
-2^{\lfloor(t+k+1)\log _2 3\rfloor}.
}
\tag{17}
\]

Let $T:=t+k$. Since $V_T=V_t$ and $L_T=L_t+k$, equations (1) and
(4) give

\[
L_T+D_T+1
=\lfloor(T+1)\log _2 3\rfloor.
\tag{18}
\]

Consequently,

\[
\mathscr S_t\geq0
\quad\Longleftrightarrow\quad
q_t^2\geq2^{D_T+1}.
\tag{19}
\]

After one zero-lift ordinary branch, the triple $(t,L_t,k)$ becomes
$(t+1,L_t+1,k-1)$. Both terms in (17) remain unchanged. Therefore,

\[
\boxed{\mathscr S_{t+1}=\mathscr S_t.}
\tag{20}
\]

In other words, an arbitrarily long ordinary run is one invariant case.
The unresolved events are the odd-endpoint resets which begin the next
run. Replacing the second term in (17) by half of itself gives the reserve
for the weaker target (7).

## 4. A square failure has a $70.7\%$ fixed-integer suffix

The square target makes the residue stabilization substantially longer.
Let a complete word of length $n$ violate (7), write $q:=q_n$, and put

\[
m:=\left\lceil\frac{D_n}{2}\right\rceil.
\tag{21}
\]

Then $q^2<2^{D_n}$ gives

\[
0<q<2^m.
\tag{22}
\]

For each prefix, let $q_s$ be its least positive representative. Define

\[
\tau:=\min\{s:L_s\geq m\}.
\tag{23}
\]

The set in (23) is nonempty, since $D_n\leq n\leq L_n$. The prefix
cylinders are nested, so

\[
q\equiv q_s\pmod {2^{L_s}}.
\tag{24}
\]

Equations (22) through (24) imply

\[
\boxed{q_s=q\qquad(\tau\leq s\leq n).}
\tag{25}
\]

Moreover, $L_s\geq s$, and hence

\[
\boxed{
n-\tau\geq n-\left\lceil\frac{D_n}{2}\right\rceil.
}
\tag{26}
\]

At an anchored leaf, $D_n=U$, so a failure contains a terminal
zero-lift suffix of length at least

\[
\boxed{
r-1-\left\lceil\frac U2\right\rceil
\geq
r-1-\left\lceil\frac{e-1}{2}\right\rceil.
}
\tag{27}
\]

Since $e=\gamma r+O(1)$, the right side of (27) is

\[
\left(1-\frac\gamma2\right)r-O(1)
=0.7075\ldots r-O(1).
\tag{28}
\]

This is longer than the $r-e+V$ suffix obtained from the original
linear threshold. More than seventy percent of a hypothetical square
failure is an actual orbit of one fixed integer.

There is also a strict-minimum reduction. Choose a counterexample to (7)
with minimal $q$, then with minimal length $n$. Let $z_j:=F^j(q)$.
If $z_j\leq q$ for some $0<j<n$, the nonnegative affine carry gives

\[
\frac{3^j}{2^{j+V_j}}<1,
\qquad
V_j>\gamma j.
\tag{29}
\]

The tail debt satisfies

\[
\begin{aligned}
\lfloor\gamma(n-j+1)\rfloor-(V_n-V_j)
&\geq \lfloor\gamma(n+1)\rfloor-\lceil\gamma j\rceil
   -V_n+V_j\\
&\geq D_n.
\end{aligned}
\tag{30}
\]

The least representative of the tail cylinder is at most $z_j\leq q$.
Thus the tail is a shorter counterexample, or one with a smaller starting
value. This is impossible. We have proved

\[
\boxed{z_j>q\qquad(0<j<n).}
\tag{31}
\]

Therefore, a minimal square failure is a strict-minimum excursion followed
by the long fixed-integer suffix in (25).

## 5. Exact comparison of the four classes

The checker
[`cycles/beatty_square_root_gate_probe.js`](cycles/beatty_square_root_gate_probe.js)
uses only integer arithmetic. It computes

\[
\lfloor\gamma t\rfloor
=\operatorname{bitlength}(3^t)-1-t,
\tag{32}
\]

and performs every ratio comparison by cross multiplication.

The sharp finite minima are as follows.

\[
\begin{array}{c|c|c|c}
\text{class}&\text{range}&\min q^2/2^{\text{debt}}&\text{witness}\\ \hline
\text{anchored leaves}&r\leq100&8&(r,Q,U)=(3,4,1)\\
\text{anchored partial states}&r\leq100&49/8&(r,t,q,H)=(19,16,14,5)\\
\text{lower Sturmian}&t\leq100&2&(t,q,D)=(1,2,1)\\
\text{lower Sturmian},\ D\geq2&t\leq100&16&(t,q,D)=(3,8,2)\\
\text{no }SSS&t\leq100&2&(t,q,D)=(1,2,1)\\
\text{no }SSS,\ D\geq2&t\leq100&49/4&(t,q,D)=(15,14,4)\\
\text{unrestricted}&t\leq60&2&(t,q,D)=(1,2,1)
\end{array}
\tag{33}
\]

Here the anchored partial debt is

\[
H_t:=\left\lfloor\frac{et}{r}\right\rfloor-V_t.
\tag{34}
\]

The $q=14$ partial witnesses in (33) are the same delayed shadow found
in the linear gate. They are still far above the square threshold.

The searches visit $493{,}941$ anchored nodes, $2{,}566{,}129$
run-two nodes for the $D\geq1$ minimum, and
$67{,}954{,}723$ fully unrestricted nodes. No class contains a failure of
the stronger factor-two inequality (8) in the stated range. The equality
in (9) establishes that the factor $2$ cannot be increased uniformly in
the broad classes.

The pruning is exact. In a partial search with horizon $T$, every
descendant satisfies

\[
q'\geq q_t,
\qquad
D_s\leq\lfloor\gamma(T+1)\rfloor-V_t.
\tag{35}
\]

For an anchored rational clock, both a future partial debt and the leaf
debt are at most $e-1-V_t$. Once these lower ratio bounds cannot improve
the recorded minimum, the corresponding subtree is permanently safe.

The comparison shows that no Beatty or Ostrowski dependence is visible at
the square scale through the audited range. Even removing the no-$SSS$
condition through depth $60$ leaves the same sharp witness.

## 6. Exact remaining gate

The square formulation is weaker, but it is not merely a finite-state
statement. Equation (4) gives

\[
D_t+1
=\lfloor(t+1)\log _2 3\rfloor-L_t.
\tag{36}
\]

Therefore, the factor-two assertion (8) is equivalent to

\[
\boxed{
q_t^2 2^{L_t}
\geq2^{\lfloor(t+1)\log _2 3\rfloor}.
}
\tag{37}
\]

The weaker target (7) replaces the right side of (37) by half of itself.
Thus the remaining question is a quadratic coefficient-stopping bound for
the least dyadic representative. Lemma 1 and the reserve (17) show that a
failure can only be born at an odd-endpoint reset and then persist through
the long stabilized suffix.

Neither the reserve nor the phase data retained here controls that reset.
The value of $v_2(3z+1)$ exposes arbitrarily many new dyadic digits,
exactly as in the linear gate. The square threshold supplies substantially
more room and a longer fixed-integer suffix, but the all-depth sign remains
unproved.

### Scope of the result

The identities (6), (11), (17) through (20), and (36) through (37),
Lemma 1, the stabilization bound (26) through (28), and the strict-minimum
reduction (31) hold at every depth. The minimum ratios in (33), including
all anchored partial, lower-Sturmian, no-$SSS$, and unrestricted claims,
are finite certificate statements only. They assert nothing beyond
$r\leq100$, $t\leq100$, and $t\leq60$, respectively.

The exact all-depth obstruction is the odd-endpoint reset following a
zero-lift run. At such a reset, an exponent $v_2(3z+1)$ of unbounded size
can be exposed while the least representative remains unchanged. Neither
the square reserve nor a fixed phase window determines the sign after this
reset. Proving that every such reset preserves the nonnegativity of (17),
or proving the weaker half-reserve needed for (7), would close the
square-root gate.

## Conclusion

The square-root target does not split into many anchored Beatty cases. It
reduces to one broader run-two assertion, and every first failure occurs at
the single transition in (13). A hypothetical anchored failure would be a
strict-minimum excursion with a fixed-integer suffix occupying more than
seventy percent of the word.

The exact data support the sharp stronger inequality
$q^2\geq2^{D+1}$, even beyond the run-two class. The surviving obstacle
is one unbounded odd-endpoint residue reset. This is a stronger
localization than the linear threshold, but it is not yet an all-depth
proof of $Q^2\geq2^U$.
