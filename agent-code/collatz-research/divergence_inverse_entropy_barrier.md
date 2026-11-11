# The critical entropy barrier for low-excess inverse words

**Date:** 27 August 2026  
**Mode:** CALCULATE, followed by SOLVE on the exact counting statement  
**Status:** the entropy barrier is proved; unconditioned Fourier mixing is ruled out as a predecessor-existence mechanism

## 1. Setup

For a positive exponent word

\[
E=(e_1,\ldots,e_h),
\qquad e_i=1+c_i,
\qquad c_i\geq0,
\]

put

\[
t(E):=\sum_{i=1}^h c_i,
\qquad
B(E):=h+t(E),
\]

and

\[
C(E):=\sum_{i=1}^h3^{h-i}2^{e_1+\cdots+e_{i-1}}.
\tag{1.1}
\]

If \(E\) is an exact accelerated path from \(z\) to \(r\), then

\[
2^{B(E)}r=3^hz+C(E).
\tag{1.2}
\]

For \(T\geq0\), let

\[
\mathcal E_{h,T}
:=\{E:|E|=h,\ t(E)\leq T\}.
\tag{1.3}
\]

We study how many endpoint classes modulo \(3^h\) can be reached by this
low-excess codebook.  This is the first necessary test for a Fourier or
transfer-operator argument which attempts to force a small inverse
predecessor by equidistributing the carry.

## 2. Exact codebook size

### Theorem 2.1 (low-excess entropy barrier)

For every \(h\geq1\) and \(T\geq0\),

\[
\boxed{
|\mathcal E_{h,T}|=\binom{h+T}{T}.}
\tag{2.1}
\]

Let \(\mathcal R_{h,T}\) be the set of unit residue classes
\(r\pmod {3^h}\) for which at least one word in \(\mathcal E_{h,T}\) is an
exact inverse word from a positive odd integer to an endpoint congruent to
\(r\).  Then

\[
\boxed{
|\mathcal R_{h,T}|\leq\binom{h+T}{T}.}
\tag{2.2}
\]

Put

\[
\rho:=\log_2\frac32,
\qquad
T_h:=\lfloor\rho h\rfloor,
\tag{2.3}
\]

and

\[
\Lambda
:=
\frac{(317/200)^{317/200}}{(117/200)^{117/200}}
=2.8396198659\ldots .
\tag{2.4}
\]

Then \(\Lambda<3\) and

\[
\boxed{
\frac{|\mathcal R_{h,T_h}|}{\varphi(3^h)}
\leq
\frac32\left(\frac{\Lambda}{3}\right)^h.}
\tag{2.5}
\]

In particular, the proportion of ternary unit classes covered by the
critical low-excess codebook tends to zero exponentially.

#### Proof

For fixed excess \(t\), the vector

\[
\((c_1,\ldots,c_h)\)
\]

is a weak composition of \(t\) into \(h\) parts.  Hence there are

\[
\binom{h+t-1}{t}
\]

such words.  The hockey-stick identity gives

\[
\sum_{t=0}^T\binom{h+t-1}{t}=\binom{h+T}{T},
\]

which proves (2.1).

For a fixed word \(E\), equation (1.2) gives the necessary congruence

\[
r\equiv 2^{-B(E)}C(E)\pmod {3^h}.
\tag{2.6}
\]

The right side is a unit modulo (3), since the final summand in (1.1) is
a power of (2), while every earlier summand is divisible by (3).
Therefore one word can contribute at most one ternary unit class.  Exactness
at the intermediate inverse states and positivity can only remove classes.
This proves (2.2).

We next use two exact integer comparisons.  First,

\[
3^{200}<2^{317},
\tag{2.7}
\]

so

\[
\rho=\log_2 3-1<\frac{117}{200}.
\tag{2.8}
\]

For \(s>0\), put

\[
H(s):=\frac{(1+s)^{1+s}}{s^s}.
\]

The usual binomial entropy bound gives

\[
\binom{h+T}{T}\leq H(T/h)^h.
\tag{2.9}
\]

The function \(H\) is increasing.  Thus (2.8) gives

\[
\binom{h+T_h}{T_h}\leq H(117/200)^h=\Lambda^h.
\tag{2.10}
\]

Finally,

\[
317^{317}<3^{200}200^{200}117^{117}.
\tag{2.11}
\]

After raising (2.4) to the power (200), equation (2.11) is exactly the
inequality \(\Lambda<3\).  Since

\[
\varphi(3^h)=2\cdot3^{h-1},
\]

substitution of (2.10) into (2.2) proves (2.5).  The conclusion follows.
\(\square\)

### Corollary 2.2 (fixed additive windows remain subcritical)

Fix \(C\geq0\).  Suppose that

\[
T(h)\leq \rho h+C.
\tag{2.12}
\]

There is a constant \(h_0(C)\) such that, for \(h\geq h_0(C)\),

\[
\boxed{
\frac{|\mathcal R_{h,T(h)}|}{\varphi(3^h)}
\leq
\frac32\left(\frac{\Lambda_{3/5}}3\right)^h,}
\tag{2.13}
\]

where

\[
\Lambda_{3/5}
:=\frac{(8/5)^{8/5}}{(3/5)^{3/5}}
=2.8820480821\ldots<3.
\tag{2.14}
\]

#### Proof

We have \(\rho<3/5\), since \(3^5<2^8\).  Hence (2.12) gives
\(T(h)/h\leq3/5\) for all sufficiently large \(h\).  Apply (2.2) and
(2.9) with \(s=3/5\).  The exact inequality

\[
8^8<3^8 5^5
\]

is equivalent to \(\Lambda_{3/5}<3\).  This proves (2.13).
\(\square\)

## 3. Exact small-depth data

The accompanying verifier enumerates every weak composition at the
critical cutoff.  The columns below give the depth, the cutoff, the number
of words, the number of distinct ternary unit classes reached by the
congruence (2.6), the fraction of all unit classes reached, and the largest
observed fiber multiplicity.

\[
\begin{array}{c|c|r|r|c|c}
h&T_h&|\mathcal E_{h,T_h}|&\#\text{ classes}&\text{coverage}&\text{max fiber}\\ \hline
4&2&15&11&0.203704&2\\
6&3&84&57&0.117284&3\\
8&4&495&325&0.074303&4\\
10&5&3003&1915&0.048646&5\\
12&7&50388&27469&0.077532&12\\
13&7&77520&44802&0.042151&12
\end{array}
\tag{3.1}
\]

The oscillation is caused by the floor in \(T_h\).  The relevant feature is
that the codebook is sparse at the full \(3^h\) scale.  The computation is
consistent with the exponential theorem and does not reveal a large hidden
collision multiplicity.

## 4. Consequence for the proposed Fourier attack

An unconditioned Fourier argument cannot prove that every endpoint residue
has a critical low-excess predecessor.  The support itself occupies an
exponentially vanishing fraction of the available unit classes.  Better
Fourier decay would describe this sparse image more accurately, but it
would not create the missing residue classes.

The hypothetical orbit is not a generic target.  Its actual history already
supplies one rare low-excess representation at every relevant scale.  Thus
the next useful question is conditioned:

> Given one nested low-excess representation supplied by a fixed ordinary
> seed, does the relative carry transducer force a second representation
> with a smaller start, or does persistent uniqueness force a rigid
> valuation word?

This is a spine or list-decoding problem.  It is not the distribution of the
whole low-excess codebook.  A future Fourier calculation must therefore be
twisted around the known orbit word and must study relative carries between
representations.  The entropy calculation above rules out the simpler
uniform-mixing formulation.
