# Endpoint and cyclic-domain audit for the (A=29) theorem

This file is deliberately separate from the proof.  It records every
domain convention and every equality boundary that an adversarial audit
should recheck.

## Theorem domain

The upstream run-start lemma supplies least residues

\[
1\le c,e\le B-1,qquad c\ne e.
\]

For internal word (21), it also supplies (L\le c<B).  The complete
crossing proof assumes (e<L\le c).  It does not prove the upstream
claims that residues (0) and (B) are absent.  Those two exclusions are
therefore dependencies, not hidden cases of the resultant argument.

The two crossing reports meet without overlap or gap at

\[
e=M-1\quad\hbox{and}\quad e=M.
\]

The first report includes (e=M-1); the completion report includes
(e=M).

## Exhaustive algebraic boundaries

In the completion report, (a=c-L) and (d=c-e).  The three principal
branches are

\[
d<M,qquad M\le d<2M,qquad 2M\le d<L.
\]

The following equality cases are explicit in the proof or certificate:

1. (d=M-1): the polynomial (3.2) and its full (2)-adic leading-factor
   cancellation.
2. (d=M): the first value in the middle branch (d=M+u).
3. (d=2M-1): the last value in the middle branch.
4. (d=2M): the first value in the upper branch (d=2M+v).
5. (v+f=E): degree equality in the (E)-resultant (4.2).
6. (a=2E-1) and (a=2E): the lower and upper halves of the middle
   branch meet here.
7. (k=E,w=0): (5.3) is used directly, without applying an invalid
   two-term fold to (X^{E-1}).
8. (k=2E,w=0): multiply by (X) first, producing (5.7).
9. (w=F): the degree-(F) polynomial (5.5) is used directly.
10. (f=F) in (5.7): the extra (F)-fold gives the linear polynomial
    (5.8).
11. (b=u): it belongs to the (b\ge u) (F)-ledger, not to the
    reciprocal cell.
12. (p=q=3): both residuals are strictly below (G), and the separate
    (G)-resultant is used.
13. (v=b) in the cell ((q_a,q_u)=(1,2)): here (delta=0), which is
    allowed in (8.3).
14. (p=E) in (8.2): degree equality is included in the direct
    (E)-resultant.

Whenever the second polynomial has degree equal to the binomial degree,
it has a nonzero intermediate coefficient and is not a scalar multiple
of the binomial.  Thus irreducibility still makes the resultant nonzero.

## Cyclic representatives

The theorem begins after run compression, from

\[
(z-1)(29z^{-c}+9z^{-e})=9z.
\]

Every subsequent argument uses only this congruence and the displayed
residue inequalities.  It does not use the distance between the isolated
index and the triple on the cyclic index set.  In fact, the algebraic
proof treats a rectangular superset of the realizable cyclic patterns.
Consequently, cyclic adjacency restrictions can delete cells but cannot
create an unproved cell.

The finite certificate makes a different, weaker assertion.  It chooses
a nonwrapping representative (s,s+1,s+2) and omits nearby isolated
indices by an ordinary integer comparison.  It does not separately sample
every wraparound representation of a run.  This is a limitation of the
finite audit only.  No theorem step relies on that sampling convention.

## Certificate-domain caveats

The certificate computes (N) with floating-point `Math.log2` only for
the sampled periods, and immediately checks the ceiling by the exact
integer inequalities

\[
2^{N-1}<3^r<2^N.
\]

It therefore fails rather than silently accepting a misrounded sampled
period.  The all-depth proof itself uses no floating-point calculation.

The completion certificate has sampled every named endpoint family in the
completion report through (r=500), including the (G)-terminal cell, the
zero (E)-residual, the extra (F)-fold, and the final linear endpoint.
Three algebraic corner families from the partial report have no realized
sample through (r=500): its forward corner, crossing (e)-corner, and
simultaneous crossing endpoint.  Their displayed reductions are therefore
verified symbolically, not by a realized finite sample.  This distinction
does not affect the all-depth proof.

## Audit ledger

- **PROVED:** all algebraic cells satisfying the grouped gate with
  (A=29) and the upstream residue domain.
- **CERTIFIED FINITE:** all realized normal forms through (r=500), and
  every endpoint family in the completion report, in the extended audit
  run.  The three partial-report corner families named above remain
  symbolic-only at this scan depth.
- **DEPENDENCY TO RECHECK:** the upstream exclusion of run-start residues
  (0) and (B), and the derivation of the grouped (21+1) gate.
- **CERTIFICATE EXCEPTION:** wraparound run representatives are not
  separately enumerated.
- **REMAINING:** no (A=29) algebraic cell; both (A=23) orders remain.
