# A sharp shell cutoff for the \(q=4\) FCD branch

**Date:** 17 August 2026

**Mode:** SOLVE

**Status:** the fixed-start reciprocal envelope excludes every simple strict
nonboundary \(q=4\) FCD failure whose canonical start is at least
\(468388920579845024401627507047746\). A nonsimple strict failure contains a
nontrivial positive cycle above its start, so this is an exact dichotomy, not
an unconditional FCD cutoff. The exponent \(109\) is sharp for the envelope
on dyadic starts. The cyclic no-terminal-loss adaptation does not combine
with the known lower bound \(2^{71}\) for a nontrivial cycle.

## 1. The uniform \(q=4\) gap

Put

\[
\alpha:=\log_2 3,
\qquad
k_s:=\lceil s\alpha\rceil,
\qquad
M_s:=2^{k_s}.
\tag{1}
\]

The row multiplier is

\[
q_s:=\frac{M_s}{M_{s-1}}\in\{2,4\}.
\tag{2}
\]

Let \(s\geq2\) and suppose that \(q_s=4\). Write

\[
m:=M_{s-1},
\qquad
p:=3^{s-1}.
\]

Since \((s-1)\alpha\) is not an integer, we have \(m>p\). Therefore the
first-crossing coefficient deficit satisfies

\[
\boxed{
\Lambda_s
:=\log\frac{M_s}{3^s}
=\log\frac{4m}{3p}
>\log\frac43.
}
\tag{3}
\]

The restriction \(s\geq2\) is necessary. At \(s=1\), the boundary word
\(10\) has \(q_1=4\) and \(\Lambda_1=\log(4/3)\); its canonical start is
\(1\), so it is excluded from the nonboundary FCD statement.

## 2. The monotone fixed-start envelope

For \(p\geq1\), define

\[
E_n^{>}(p)
:=\#\{y\in\mathbf Z:p\leq y<2p,\ y>n\}.
\tag{4}
\]

For \(\ell\geq1\), put

\[
H_\ell(n):=
\min\left\{
2^{\ell-1},\
\ell+\sum_{o=1}^{\ell}
\min\left\{
\binom{\ell-1}{o-1},E_n^{>}(3^o)
\right\}
\right\},
\tag{5}
\]

\[
B_\ell:=
\min_{0\leq t\leq\ell}
\left(
\sum_{o=t+1}^{\ell}\binom{\ell}{o}
+\sum_{o=0}^{t}3^o
\right),
\tag{6}
\]

\[
G_\ell(n):=\min\{H_\ell(n),B_\ell+\ell\}.
\tag{7}
\]

The corrected fixed-start envelope is

\[
\boxed{
\mathfrak M(n):=
\sum_{\ell=\lfloor\log_2n\rfloor}^{\infty}
\frac{G_\ell(n)}{3\max(n,2^\ell)}.
}
\tag{8}
\]

The minimum-dependent shell injection and the universal shell theorem give

\[
\sum_{\substack{0\leq i<L\\x_i\ {\rm odd}}}\frac1{3x_i}
\leq\mathfrak M(n)
\tag{9}
\]

for every simple finite shortcut path which starts at its strict minimum
\(n\).

**Lemma 1.** The function \(\mathfrak M(n)\) is nonincreasing on the positive
integers.

**Proof.** For every fixed \(p\), the capacity \(E_n^{>}(p)\) is
nonincreasing in \(n\). Hence \(H_\ell(n)\), and therefore \(G_\ell(n)\),
is nonincreasing in \(n\). The denominator
\(\max(n,2^\ell)\) is nondecreasing. Finally,
\(\lfloor\log_2n\rfloor\) is nondecreasing, and every shell removed when
this lower index increases had a nonnegative contribution. \(\square\)

Thus the worst start in the dyadic range
\([2^a,2^{a+1})\) is \(2^a\).

## 3. Exact certification of the cutoff

For \(a\leq1000\), define the exact finite sum

\[
S_a:=
\sum_{\ell=a}^{1000}
\frac{G_\ell(2^a)}{3\cdot2^\ell}.
\tag{10}
\]

The certified Chernoff estimate

\[
B_\ell<\frac52\,2^{97\ell/100}
\]

gives, by grouping the shells \(\ell\geq1001\) into blocks of one hundred,

\[
\sum_{\ell=1001}^{\infty}\frac{B_\ell}{3\cdot2^\ell}
<
\frac{2000}{21\cdot2^{30}}.
\tag{11}
\]

Also,

\[
\sum_{\ell=1001}^{\infty}\frac{\ell}{3\cdot2^\ell}
=\frac{1002}{3\cdot2^{1000}}.
\tag{12}
\]

Consequently

\[
\boxed{
\mathfrak M(2^a)
<
U_a:=
S_a+
\frac{2000}{21\cdot2^{30}}
+\frac{1002}{3\cdot2^{1000}}.
}
\tag{13}
\]

For the logarithm, the positive atanh series at \(1/7\) gives

\[
L_{20}:=
2\sum_{j=0}^{19}\frac1{(2j+1)7^{2j+1}}
<\log\frac43
\tag{14}
\]

and

\[
\log\frac43
<
L_{20}+
\frac{98}{48\cdot41\cdot7^{41}}.
\tag{15}
\]

The exact certificate evaluates every binomial coefficient, endpoint
capacity, minimum, and rational cross-product using arbitrary-precision
integers. It proves

\[
\boxed{U_{109}<L_{20}<\log\frac43.}
\tag{16}
\]

For readability, the corresponding downward decimal truncations are

\[
U_{109}=0.279365198281648912286022\ldots,
\]

\[
L_{20}=0.287682072451780927439219\ldots.
\]

The preceding dyadic shell cannot be recovered by evaluating the same
envelope more accurately. The exact partial sum alone satisfies

\[
\boxed{
S_{108}>
L_{20}+\frac{98}{48\cdot41\cdot7^{41}}
>\log\frac43.
}
\tag{17}
\]

The computed upper value is

\[
U_{108}=0.290662095522386058575261\ldots.
\]

Thus \(109\) is the least dyadic exponent at which the envelope
\(\mathfrak M\) falls below \(\log(4/3)\).

The same exact computation can retain the ordinary start \(n\), rather than
replacing it by the left endpoint of its dyadic shell. Put

\[
S(n):=
\sum_{\ell=\lfloor\log_2n\rfloor}^{1000}
\frac{G_\ell(n)}{3\max(n,2^\ell)}
\tag{18}
\]

and define

\[
\mathcal U(n):=
S(n)+
\frac{2000}{21\cdot2^{30}}
+\frac{1002}{3\cdot2^{1000}}.
\tag{19}
\]

The same proof as Lemma 1 shows that \(\mathcal U(n)\) is nonincreasing on
\([2^{108},2^{109}]\). On this interval every summand and both tail terms
have the common denominator

\[
21n2^{1000}.
\tag{20}
\]

Thus binary search uses integer cross-products only. The least ordinary
integer certified by this particular upper bound is

\[
\boxed{
N_*:=468388920579845024401627507047746.
}
\tag{21}
\]

More precisely, exact cross-multiplication proves

\[
\boxed{
\mathcal U(N_*)<L_{20},
\qquad
\mathcal U(N_*-1)\geq L_{20}.
}
\tag{22}
\]

This does not assert that \(N_*\) is the exact crossing point of the infinite
envelope, because the analytic tail is an upper estimate. It is the sharp
ordinary-start cutoff delivered by this certificate. Its dyadic location is

\[
\frac{N_*}{2^{108}}
=1.443334796422301373755536\ldots.
\tag{23}
\]

## 4. The strict \(q=4\) dichotomy

Let a nonboundary \(q=4\) first-crossing segment start at its strict minimum
\(n\), and suppose that its endpoint satisfies \(x_L>n\). Every proper path
state is also strictly larger than \(n\). If two path states repeat, the
earlier one cannot be \(x_0=n\); the repeated segment is a nontrivial
positive cycle all of whose states exceed \(n\).

Suppose instead that the path is simple. The exact product formula gives

\[
\frac{x_L}{n}
=e^{-\Lambda_s}
\prod_{\substack{0\leq i<L\\x_i\ {\rm odd}}}
\left(1+\frac1{3x_i}\right).
\tag{24}
\]

Equations (3), (9), and (24) imply

\[
\log\frac43
<\Lambda_s
<
\sum_{\substack{0\leq i<L\\x_i\ {\rm odd}}}
\log\left(1+\frac1{3x_i}\right)
<
\mathfrak M(n).
\tag{25}
\]

If \(n\geq N_*\), the exact ordinary-start certificate and Lemma 1 give the
opposite inequality. We have proved the following statement.

**Theorem 2, strict \(q=4\) shell dichotomy.** Every strict nonboundary
\(q=4\) FCD failure satisfies exactly one of the following alternatives.

1. Its first-crossing segment is simple and

   \[
   \boxed{n<N_*.}
   \tag{26}
   \]

2. Its first-crossing segment contains a nontrivial positive cycle whose
   states are all strictly larger than \(n\).

Consequently (26) is unconditional on the simple branch and is conditional
on the nonexistence of nontrivial positive cycles for the full strict
branch. Since the canonical start is odd and \(N_*\) is even, the simple
branch satisfies \(n\leq N_*-1\).

This is a genuine all-length reduction, but the remaining finite scan is not
currently feasible. There are more than \(2^{107}\) odd positive starts
below this threshold. The
coefficient-specific computation in Rozier and Terracol, version 5,
Corollary 5.4, certifies the relevant coefficient stopping assertion only
through \(2.8\cdot10^{19}\), approximately \(2^{64.6}\). Their Theorem 5.3
excludes paradoxical starts from \(4615\) through the same bound. This is an
external computational input, not part of the present certificate; see
[Rozier and Terracol, version 5](https://arxiv.org/html/2502.00948v5).
It lies far below \(2^{109}\) and does not close (26).

The exact word audit through shortcut length \(28\), the weight-\(40\)
audit, and the target-\(1\) negative-map scan below \(200000\) also do not
cover this range. Hence (26) does not yet reduce the simple strict
\(q=4\) branch to an existing certificate.

## 5. Endpoint equality and the cyclic envelope

Suppose now that \(x_L=n\). The endpoint repeats the start, so the finite
simple-path injection with a terminal loss is not the appropriate theorem.
For a primitive simple cycle, define

\[
E_n^{\circ}(p)
:=\#\{y\in\mathbf Z:p\leq y<2p,\ y\geq n\},
\tag{27}
\]

\[
H_\ell^{\circ}(n):=
\min\left\{
2^{\ell-1},\
\sum_{o=1}^{\ell}
\min\left\{
\binom{\ell-1}{o-1},E_n^{\circ}(3^o)
\right\}
\right\},
\tag{28}
\]

\[
G_\ell^{\circ}(n)
:=\min\{H_\ell^{\circ}(n),B_\ell\},
\tag{29}
\]

\[
\boxed{
\mathfrak M^\circ(n):=
\sum_{\ell=\lfloor\log_2n\rfloor}^{\infty}
\frac{G_\ell^\circ(n)}{3\max(n,2^\ell)}.
}
\tag{30}
\]

There is no terminal \(\ell\)-position loss. Every shell state can be
advanced cyclically by \(\ell\) steps. Equal-time translation sends a
weight-\(o\) odd shell state injectively into
\([3^o,2\cdot3^o)\cap[n,\infty)\), which gives (28). The universal
weight split gives \(B_\ell\), rather than \(B_\ell+\ell\), for the same
reason. Therefore

\[
\sum_{\substack{x\ {\rm odd}\\x\ {\rm in\ the\ cycle}}}\frac1{3x}
\leq\mathfrak M^\circ(n).
\tag{31}
\]

For each \(p\), passing from \(y>n\) to \(y\geq n\) adds at most one
endpoint. Thus each summand in (28) exceeds its strict analogue by at most
one. The absence of the terminal \(\ell\)-position loss then gives

\[
H_\ell^\circ(n)\leq H_\ell(n),
\qquad
G_\ell^\circ(n)\leq G_\ell(n),
\qquad
\boxed{\mathfrak M^\circ(n)\leq\mathfrak M(n).}
\tag{32}
\]

The cyclic envelope is also nonincreasing. Its exact tail omits (12):

\[
\mathfrak M^\circ(2^a)
<
\sum_{\ell=a}^{1000}
\frac{G_\ell^\circ(2^a)}{3\cdot2^\ell}
+\frac{2000}{21\cdot2^{30}}.
\tag{33}
\]

The exact certificate again finds the first dyadic cutoff at \(a=109\).
At the known cycle-minimum scale it gives only

\[
\boxed{
\mathfrak M^\circ(2^{71})
<0.795101767077907676987783\ldots,
}
\tag{34}
\]

which is larger than \(\log(4/3)\). The sharper existing cyclic
odd-part capacity certificate gives \(0.685\), but this also exceeds
\(\log(4/3)\).

This is not merely a failure of the analytic tail estimate. The exact
cyclic partial sum through shell \(1000\) at \(2^{71}\) already exceeds the
rigorous upper bound (15) for \(\log(4/3)\). Thus the envelope
\(\mathfrak M^\circ\) itself cannot make the desired comparison at the known
minimum scale.

For endpoint equality, (24) gives

\[
\Lambda_s
=
\sum_{\substack{x\ {\rm odd}\\x\ {\rm in\ the\ cycle}}}
\log\left(1+\frac1{3x}\right)
<
\mathfrak M^\circ(n).
\tag{35}
\]

Thus a \(q=4\) equality cycle with \(n\geq N_*\) is excluded. The known
bound \(n>2^{71}\) is insufficient, so the interval

\[
2^{71}<n<N_*
\]

remains open to this comparison.

The logical split is exact. If the coefficient first crosses before the
cycle returns to its least state, the endpoint is strictly larger than the
minimum and Theorem 2 applies. If the first crossing occurs at the return,
the cyclic equality argument applies. No cyclic conclusion is inferred
from the finite-path theorem.

## 6. Certificate

The script
[inverse/fcd_q4_shell_certificate.js](inverse/fcd_q4_shell_certificate.js)
performs the following exact checks.

1. It constructs every \(B_\ell\) for \(\ell\leq1000\) from Pascal rows.
2. It constructs \(H_\ell(2^a)\) and \(H_\ell^\circ(2^a)\) from the exact
   endpoint capacities.
3. It proves the rational tail bounds (11), (12), and (33).
4. It compares \(U_{109}\) with the lower logarithm bound by integer
   cross-multiplication.
5. It compares \(S_{108}\) with the upper logarithm bound, proving sharpness
   for the envelope.
6. It finds the least ordinary start \(N_*\) certified by the same rational
   upper bound.
7. It evaluates the cyclic bound at \(2^{71}\) and verifies that the desired
   comparison fails there.

The script prints

~~~text
first_certified_dyadic_exponent=109
upper_at_2^109=0.279365198281648912286022
upper_at_2^108=0.290662095522386058575261
partial_mass_at_2^108_exceeds_log_upper=true
first_certified_start=468388920579845024401627507047746
first_certified_start_over_2^108=1.443334796422301373755536
ordinary_start_cutoff_passed=true
first_cyclic_dyadic_exponent=109
cyclic_upper_at_2^71=0.795101767077907676987783
cyclic_exclusion_from_2^71=false
cyclic_partial_at_2^71_exceeds_log_upper=true
q4_shell_certificate_passed=true
~~~

The remaining gate has two parts. To close the simple strict \(q=4\) branch
by computation, one needs a certified coefficient-stopping scan through
\(N_*\), or a stronger anchored estimate which lowers the cutoff to an
available scan. To make the strict statement unconditional, one must also
exclude the nonsimple positive-cycle alternative. To close the cycle
equality branch from the current minimum \(2^{71}\), one needs to reduce the
cyclic reciprocal-mass bound below \(\log(4/3)\).
