# The terminal complement in the strict \(q=2\) no-wrap gate

**Date:** 17 August 2026  
**Mode:** SOLVE  
**Status:** the no-wrap inequality and the terminal sparse congruence do not
give a lower bound \(b\geq c\log s\). They give a lower bound in terms of
the final consecutive-one suffix, but that suffix collapses to length one
when \(b=1\). Any further argument must use interactions among the earlier
delay levels.

## 1. Notation

Put

\[
\alpha:=\log_2 3,
\qquad
k:=\lceil\alpha s\rceil=s+e.
\]

Let the last one occur at \(A=s-1+r\), and let

\[
b:=e-r\geq1.
\]

Thus \(b\) is the terminal zero count. For the strict branch, write the
endpoint as

\[
Z=n+d,
\qquad
d\geq1.
\]

If \(j_r\) is the first rank whose delay is \(r\), put

\[
t:=s-j_r.
\tag{1}
\]

The integer \(t\) is the number of consecutive odd steps in the terminal
run.

## 2. No-wrap is independent of \(b\) at large weight

The exact terminal complement is

\[
G=2^{s-1+r}
\left(
2^b-[P^{-1}]_{2^b}
\right),
\qquad
P=3^s.
\tag{2}
\]

The parenthesized integer is positive and odd. Therefore

\[
G\geq2^{s-1+r}\geq2^{s-1}.
\tag{3}
\]

Every hypothetical failure already satisfies

\[
n<153s^{14.3}<2^{s-1}
\qquad(s\geq105).
\tag{4}
\]

Equations \((3)\)-\((4)\) show that

\[
\boxed{n<G\quad(s\geq105)}
\tag{5}
\]

for every admissible value of \(b\), including \(b=1\). Thus the no-wrap
inequality itself cannot force any growth of \(b\).

## 3. What the terminal sparse target actually gives

Once the delay reaches \(r\), it cannot increase further. Hence

\[
A_i=i+r
\qquad(j_r\leq i\leq s-1).
\]

The last \(t=s-j_r\) odd steps are consecutive. If \(x\) is the state at
the beginning of this run, their exact affine iterate is

\[
T_+^t(x)=\frac{3^t(x+1)}{2^t}-1.
\]

The remaining \(b\) steps are even. Consequently there is a positive
integer \(w\) such that

\[
\boxed{2^bZ+1=3^t w.}
\tag{6}
\]

In particular,

\[
3^t\mid2^b(n+d)+1.
\tag{7}
\]

The strict target bound \(d\leq\lceil r/2\rceil<s\), together with \((4)\),
therefore gives only

\[
\boxed{
b>
\alpha t-
\log_2\left(153s^{14.3}+s+1\right).}
\tag{8}
\]

This is a bound in terms of the terminal suffix length \(t\), not the full
weight \(s\).

The proper-prefix barrier at \(j_r\) explains why this distinction is
decisive. Let

\[
\delta_s:=k-\alpha s,
\qquad
0<\delta_s<1.
\]

The strict barrier \(2^{j_r+r}<3^{j_r}\), after substituting
\(j_r=s-t\) and \(r=e-b\), is exactly

\[
\boxed{b>\delta_s+(\alpha-1)t.}
\tag{9}
\]

For \(b=1\), equation \((9)\) forces \(t=1\). Equation \((7)\) then
reduces to

\[
3\mid2Z+1,
\qquad
Z\equiv1\pmod3.
\tag{10}
\]

The growing terminal modulus has disappeared. This is the exact
obstruction to a symmetric size argument.

## 4. An infinite barrier family at \(b=1\)

For every weight, consider the maximal prefix-barrier profile

\[
A_i:=\lfloor\alpha i\rfloor
\qquad(0\leq i\leq s-1).
\tag{11}
\]

It satisfies all proper-prefix barriers. At every \(q_s=2\) weight,

\[
k_s-k_{s-1}=1,
\]

and therefore

\[
A_{s-1}=k_{s-1}-1=k_s-2.
\]

Thus

\[
\boxed{b=1,
\qquad
r=e-1,
\qquad
j_r=s-1.}
\tag{12}
\]

There are infinitely many \(q_s=2\) weights. Otherwise the increments of
\(k_s\) would eventually all equal two, contradicting
\(k_s/s\to\alpha<2\). Hence \((11)\)-\((12)\) form an infinite family
satisfying the complete anchored barrier structure with the smallest
possible terminal complement.

This family is not a family of failures. Exact canonical evaluation does,
however, show that \(b=1\) is compatible with zero lift, no-wrap, and row
validity at substantial weights. Three fixed descending witnesses are

\[
\begin{array}{c|r|r|r|r}
s&n&Z&G&n-Z\\ \hline
15&4086779&3495268&4194304&591511\\
25&188068289531&144926270443&274877906944&43142019088\\
61&5149367558190029606251027451&4132766334266486607016617688&
39614081257132168796771975168&1016601223923542999234409763
\end{array}
\tag{13}
\]

The targeted certificate checks only the maximal profile \((11)\). Through
weight \(1000\), it finds \(415\) \(q_s=2\) weights, \(198\) zero-lift
rows, and \(89\) zero-lift no-wrap rows. All \(89\) are descents. The last
occurs at \(s=998\), with \(r=583\), \(b=1\), and \(n/G=0.144498\ldots\).
These computations are witnesses against a row-level \(b\)-growth claim,
not evidence for a Collatz counterexample.

## 5. Proof ledger

The following items are closed.

1. For every hypothetical failure of weight at least \(105\), no-wrap is
   automatic independently of \(b\).
2. The terminal sparse target gives the exact divisibility \((7)\) and the
   size bound \((8)\).
3. The terminal prefix barrier gives \((9)\).
4. At \(b=1\), the final suffix has length one and the terminal modulus is
   only three.
5. Infinitely many complete prefix-barrier profiles have \(b=1\).

The following item remains open.

1. Exclude the full sparse target divisibility when \(b\) is small and
   \(r=e-b\) grows linearly with \(s\). This requires a global interaction
   among the earlier delay levels. Neither no-wrap nor the terminal cut
   supplies it.

## 6. Assessment

The terminal complement does not produce a second logarithmic barrier.
Small \(b\) forces a short terminal odd run, which removes precisely the
large power of three needed by the size argument. In the extreme case
\(b=1\), the problem returns to a sparse congruence with linearly many
delay levels. This is the same unbounded-delay hard core seen from the
opposite end, rather than a shrinking residue class amenable to an
independent closure.

The accompanying exact arithmetic certificate is
[`inverse/q2_terminal_complement_probe.js`](inverse/q2_terminal_complement_probe.js).
