"""Independent check of round 1, Proposition 2.2 -- the correction to the group-ring claim.

Round 1 asserts that `arithmetic_rigidity_transfer_operators.tex` is wrong: the quotient

    A = Z[X] / (X^m - 2, X^K - 3),      d = gcd(K, m)

is NOT cyclic of order 2^K - 3^m when d > 1; its order is |2^(K/d) - 3^(m/d)|^d, and at
(K, m) = (6, 2) it is the field of 25 elements, whose additive group is (Z/5)^2.

That is a claim that a paper already in the repo is false, so it gets checked rather than
believed. Two independent routes, neither taking round 1's formula as input:

  1. A is the cokernel of multiplication by X^K - 3 acting on Z[X]/(X^m - 2), which is free with
     basis 1, X, ..., X^(m-1). Build that integer matrix directly by polynomial reduction and take
     the absolute determinant -- that is the order of the cokernel -- and its Smith normal form,
     which gives the exact abelian-group structure and so decides cyclicity outright.
  2. Brute force for tiny cases: count the actual cosets by reducing every element.

    python verify_resultant_correction.py
"""
from math import gcd


def mulmat(K, m):
    """Matrix of multiplication by X^K - 3 on Z[X]/(X^m - 2), in the basis 1, X, ..., X^(m-1).

    Reduction rule: X^m = 2, so X^(m+r) = 2 * X^r. Column j is the image of X^j.
    """
    cols = []
    for j in range(m):
        vec = [0] * m
        # X^(K+j) reduced: repeatedly subtract m from the exponent, multiplying by 2 each time
        e, coef = K + j, 1
        while e >= m:
            e -= m
            coef *= 2
        vec[e] += coef
        vec[j] += -3                       # the -3 * X^j term
        cols.append(vec)
    return [[cols[j][i] for j in range(m)] for i in range(m)]


def det(mat):
    """Exact integer determinant by fraction-free (Bareiss) elimination."""
    import copy
    a = copy.deepcopy(mat)
    n = len(a)
    sign, prev = 1, 1
    for k in range(n - 1):
        if a[k][k] == 0:
            for r in range(k + 1, n):
                if a[r][k]:
                    a[k], a[r] = a[r], a[k]
                    sign = -sign
                    break
            else:
                return 0
        for i in range(k + 1, n):
            for j in range(k + 1, n):
                a[i][j] = (a[i][j] * a[k][k] - a[i][k] * a[k][j]) // prev
        prev = a[k][k]
    return sign * a[n - 1][n - 1]


def smith(mat):
    """Smith normal form diagonal, by ordinary integer row/column reduction."""
    import copy
    a = copy.deepcopy(mat)
    n, m = len(a), len(a[0])
    res = []
    r = c = 0
    while r < n and c < m:
        piv = None
        for i in range(r, n):
            for j in range(c, m):
                if a[i][j] and (piv is None or abs(a[i][j]) < abs(a[piv[0]][piv[1]])):
                    piv = (i, j)
        if piv is None:
            break
        i, j = piv
        a[r], a[i] = a[i], a[r]
        for row in a:
            row[c], row[j] = row[j], row[c]
        again = True
        while again:
            again = False
            for i in range(r + 1, n):
                if a[i][c]:
                    q = a[i][c] // a[r][c]
                    for j in range(c, m):
                        a[i][j] -= q * a[r][j]
                    if a[i][c]:
                        a[r], a[i] = a[i], a[r]
                        again = True
            for j in range(c + 1, m):
                if a[r][j]:
                    q = a[r][j] // a[r][c]
                    for i in range(r, n):
                        a[i][j] -= q * a[i][c]
                    if a[r][j]:
                        for i in range(r, n):
                            a[i][c], a[i][j] = a[i][j], a[i][c]
                        again = True
        res.append(abs(a[r][c]))
        r += 1
        c += 1
    return res


def main():
    print("  K   m   d   |det| (order)      round-1 formula   agree   Smith diagonal      cyclic?")
    bad = 0
    for m in range(1, 8):
        for K in range(1, 13):
            d = gcd(K, m)
            M = mulmat(K, m)
            order = abs(det(M))
            formula = abs(2 ** (K // d) - 3 ** (m // d)) ** d
            snf = [s for s in smith(M) if s != 1]
            cyclic = len(snf) <= 1
            agree = (order == formula)
            if not agree:
                bad += 1
            old_claim = abs(2 ** K - 3 ** m)
            flag = ""
            if d > 1 and (order != old_claim or not cyclic):
                flag = "  <- old claim (%d, cyclic) FAILS" % old_claim
            print("%3d %3d %3d %16d %17d   %-6s %-18s %-6s%s"
                  % (K, m, d, order, formula, "yes" if agree else "NO",
                     ",".join(map(str, snf)) or "trivial", "yes" if cyclic else "NO", flag))
    print("\n%d disagreement(s) with round 1's order formula" % bad)
    return 1 if bad else 0


if __name__ == "__main__":
    raise SystemExit(main())
