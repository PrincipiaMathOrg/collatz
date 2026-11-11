model: GPT-5.6 Pro (gpt-5-6-pro)
round: 100
approach: 95 -- Meet-in-the-middle affine composition
front: disproof
sent: 2026-08-17T23:58:06Z
worked: Worked for 40m 29s
sha256: 79ba1cf2fe633aa85082e5b1c9635e029d8a1532c561445be3bf7ea3cd079eee
chars: 8984

---# Result

I did **not** obtain a disproof of the Collatz conjecture. The meet-in-the-middle method was converted into an exact, certificate-producing cycle search, but it found **no positive nontrivial cycle**.

The completed computation exhausts every possible nontrivial positive cycle having at most **34 odd members**. It examined **2,041,661,603 half-states** and obtained zero affine divisibility matches. Claiming a full disproof from this would therefore be false.

What the attack did produce is:

1. an exact meet-in-the-middle reduction;
2. a useful balanced-pivot decomposition;
3. a deterministic carry decoder that eliminates one of the two stored tables;
4. a complete finite exclusion certificate through odd-cycle length \(34\); and
5. a precise explanation of why this approach remains exponentially far from a full counterexample search.

## 1. Exact cycle equation

For a valuation word

\[
w=(a_0,\ldots,a_{j-1}),\qquad a_i\geq1,
\]

put

\[
A_t=\sum_{i<t}a_i,\qquad A=A_j,
\]

and define

\[
C_w=\sum_{i=0}^{j-1}3^{j-1-i}2^{A_i}.
\]

The corresponding affine branch satisfies

\[
2^A U_w(n)=3^j n+C_w.
\]

This is the affine-word framework and concatenation law already established in the preceding work. fileciteturn0file7L329-L350

For a cycle, \(U_w(n)=n\), so

\[
(2^A-3^j)n=C_w.
\]

Writing

\[
D=2^A-3^j,
\]

the unique possible starting value is therefore

\[
n=\frac{C_w}{D}.
\]

Hence the exact positive-cycle criterion is

\[
D>0,\qquad D\mid C_w,\qquad \frac{C_w}{D}>1.
\]

### Exact valuations follow automatically

A possible concern is that divisibility of the composite affine transformation might produce an integer \(n\) without realizing the proposed valuations one step at a time. It does not.

Let \(w=u_t v_t\), where \(u_t\) is the first \(t\) symbols. Concatenation and the cycle equation give

\[
2^{A_t}\bigl(2^{A-A_t}n-C_{v_t}\bigr)
 =
3^{j-t}\bigl(3^t n+C_{u_t}\bigr).
\]

Since \(2\) and \(3\) are coprime,

\[
2^{A_t}\mid 3^t n+C_{u_t}.
\]

Thus

\[
n_t=\frac{3^t n+C_{u_t}}{2^{A_t}}
\]

is an integer for every \(t\). The remaining-suffix identity shows \(n_t\) is odd, and

\[
2^{a_t}n_{t+1}=3n_t+1.
\]

Because \(n_{t+1}\) is odd,

\[
\nu_2(3n_t+1)=a_t
\]

exactly. Therefore every affine divisibility match is automatically a genuine Collatz cycle; the final orbit reconstruction is an additional verification rather than an unproved admissibility assumption.

## 2. Exhaustive bounds on \(A\)

If \(x_0,\ldots,x_{j-1}\) are the odd members of a nontrivial cycle, multiplication of

\[
2^{a_i}x_{i+1}=3x_i+1
\]

around the cycle yields

\[
2^A=\prod_{i=0}^{j-1}\left(3+\frac1{x_i}\right).
\]

Every \(x_i\) is an odd integer at least \(3\), so

\[
3^j<2^A\leq\left(\frac{10}{3}\right)^j.
\]

Equivalently, the program searches exactly the finite interval

\[
2^A>3^j,\qquad 2^A3^j\leq10^j.
\]

No possible total valuation is omitted.

A nontrivial cycle contains increasing and decreasing accelerated steps. For \(x>1\),

\[
U(x)>x\iff a=1,
\qquad
U(x)<x\iff a\geq2.
\]

Rotating a hypothetical cycle to a local minimum therefore permits the canonical conditions

\[
a_0=1,\qquad a_{j-1}\geq2.
\]

Every nontrivial cycle has such a rotation. The case \(j=1\) is elementary:

\[
(2^a-3)n=1
\]

has only the positive solution \(a=2,n=1\), the trivial cycle.

## 3. Meet-in-the-middle composition

For \(w=uv\), with \(|v|=q\) and \(A(u)=B\),

\[
C_{uv}=3^qC_u+2^B C_v.
\]

Thus, for fixed \(j,A,B\),

\[
3^qC_u+2^B C_v\equiv0\pmod{D}.
\]

A conventional implementation stores prefix carries in one table and suffix carries in another and joins matching residues.

### Balanced-pivot refinement

A length split can be highly unbalanced in denominator exponent. Instead, put

\[
H=\left\lfloor\frac A2\right\rfloor
\]

and split the word at the unique exponent that first carries its cumulative sum above \(H\):

\[
w=u\,(a)\,v.
\]

Write

\[
B=A(u),\qquad C=A(v),\qquad |u|=p,\qquad |v|=q.
\]

Then

\[
B\leq\left\lfloor\frac A2\right\rfloor,\qquad
C<\left\lceil\frac A2\right\rceil,\qquad
a=A-B-C.
\]

The full carry is

\[
C_w
=
3^{q+1}C_u+3^q2^B+2^{A-C}C_v.
\]

Consequently, after enumerating \(u\), the required suffix residue is

\[
C_v\equiv
-2^{-(A-C)}
\left(3^{q+1}C_u+3^q2^B\right)
\pmod D.
\]

The reverse join is used when suffix enumeration is cheaper.

This pivot is exhaustive and unique: its left cumulative exponent is at most \(A/2\), while adding the pivot crosses \(A/2\).

## 4. The second table can be decoded

For fixed length \(r\) and total exponent \(S\), the carry uniquely determines the valuation word.

Indeed, for \(w=(a_0,w')\),

\[
C_w=3^{r-1}+2^{a_0}C_{w'},
\]

where \(C_{w'}\) is odd. Therefore

\[
a_0=\nu_2\!\left(C_w-3^{r-1}\right),
\qquad
C_{w'}=
\frac{C_w-3^{r-1}}{2^{a_0}}.
\]

Repeating this operation decodes the entire word.

Moreover, all carries of length \(r\) and sum \(S\) lie in an exact interval. For \(r\geq2\),

\[
C_{\min}(r,S)=3^r-2^r,
\]

and

\[
C_{\max}(r,S)
=
3^{r-1}
+
2^{S-r+1}\bigl(3^{r-1}-2^{r-1}\bigr).
\]

Given a required residue \(R\bmod D\), the search examines only

\[
R+kD\in[C_{\min},C_{\max}]
\]

and attempts to decode each such number. Thus there is no need to materialize the complementary half-table.

## 5. Completed computation

The exact length-\(34\) run produced:

\[
\begin{array}{lr}
\text{parameter blocks} & 86{,}594\\
\text{enumerated half-states} & 2{,}041{,}661{,}603\\
\text{residues inside the carry interval} & 7{,}346\\
\text{successfully decoded complementary halves} & 0\\
\text{exact divisibility matches} & 0\\
\text{positive nontrivial cycles} & 0
\end{array}
\]

At \(j=34\) alone, the run processed

\[
1{,}033{,}566{,}792
\]

half-states and \(2{,}140\) in-range residue candidates, again with no decodable complement.

The certificate checksums are

\[
\mathtt{0xb5f7e1a4385866df}
\]

and

\[
\mathtt{0x4dd6c346363b89e0}.
\]

An independent Python verifier:

- tested the carry encoder/decoder on \(3{,}432\) complete words;
- compared the pivot join with literal full-word enumeration on all \(65\) tested \((j,A)\) instances through \(j=10\);
- recovered exactly the ten repeated trivial all-\(2\) words and no additional integral word;
- checked every aggregate identity in the JSON certificate.

An AddressSanitizer and UndefinedBehaviorSanitizer build independently reran the search through \(j=25\) without reporting a memory or arithmetic implementation error.

The resulting finite statement is:

> **Computational exclusion.** There is no nontrivial positive Collatz cycle containing at most \(34\) odd members.

## 6. Why this does not approach the current cycle frontier

Barina’s live verification project currently reports convergence of every starting value below

\[
2075\cdot2^{60}\approx2^{71.02}.
\]

citeturn733128search0

Hercher proved that verification through

\[
1536\cdot2^{60}
\]

is sufficient to force a hypothetical nontrivial cycle to contain at least

\[
1.375\cdot10^{11}
\]

odd members; the journal page also records the \(m\geq92\) local-minimum theorem and its corrigendum. Since the current verified range exceeds Hercher’s threshold, the existing literature already places a hypothetical cycle enormously beyond \(j=34\). citeturn158678search0

Thus the finite exclusion here is **not a new record cycle bound**. Its contribution is the exact algorithm and certificate architecture.

Near the critical balance

\[
A\sim(\log_2 3)j,
\]

the number of valuation compositions is asymptotically

\[
\binom{A-1}{j-1}
=
\bigl(2.8395137\ldots+o(1)\bigr)^j.
\]

Even an ideal square-root meet-in-the-middle algorithm has the optimistic scale

\[
2^{0.75282194\ldots j}.
\]

At \(j=1.375\cdot10^{11}\), this is approximately

\[
2^{1.03513\cdot10^{11}}
\approx
10^{3.11605\cdot10^{10}}
\]

states. No ordinary increase in computing power bridges that gap. A successful extension would need a theorem compressing or excluding entire infinite families of affine words, not merely a faster join.

Finally, cycle search covers only one way Collatz could be false. A disproof could instead be a divergent nonperiodic positive orbit, which this affine closure equation does not search.

## Artifacts

[Complete mathematical and computational report](sandbox:/mnt/data/collatz_mitm_report.md)

[Reproducible source, certificate, verifier, log, and manifest bundle](sandbox:/mnt/data/collatz_mitm_bundle_j34.zip)

[C++20 meet-in-the-middle implementation](sandbox:/mnt/data/collatz_mitm_affine.cpp)

[Length-34 JSON certificate](sandbox:/mnt/data/collatz_mitm_certificate_j34.json)

[Independent Python verifier](sandbox:/mnt/data/verify_collatz_mitm.py)

[Independent verification output](sandbox:/mnt/data/collatz_mitm_verification_j34.json)

[SHA-256 manifest](sandbox:/mnt/data/collatz_mitm_manifest_j34.sha256)

**Final status:** approach 95 is a valid and fairly sharp finite search mechanism, but this execution found no counterexample and therefore does not disprove the Collatz conjecture.